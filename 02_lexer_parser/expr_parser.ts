// expr_parser.ts
// Tiny expression language: numbers, + - * /, parentheses
// Grammar (EBNF style):
//   Expr   ::= Term (("+"|"-") Term)*
//   Term   ::= Factor (("*"|"/") Factor)*
//   Factor ::= "(" Expr ")" | NUM
//
// Run with:
//   npm run parser -- "1 + 2 * 3"
//   npm run parser -- "(1 + 2) * 3"
//   npm run parser -- "10 - 4 * (2 + 1)"
//


// 1. Token types (same style as tiny_lexer.ts)
const TokenType = {
  NUMBER: "NUMBER",
  PLUS: "PLUS",
  MINUS: "MINUS",
  STAR: "STAR",
  SLASH: "SLASH",
  LPAREN: "LPAREN",
  RPAREN: "RPAREN",
  EOF: "EOF",
} as const;

type TokenType = typeof TokenType[keyof typeof TokenType];

class Token {
  public type: TokenType;
  public lexeme: string;
  public value?: number;

  constructor(type: TokenType, lexeme: string, value?: number) {
    this.type = type;
    this.lexeme = lexeme;
    this.value = value;
  }

  toString(): string {
    if (this.type === TokenType.NUMBER && this.value !== undefined) {
      return `${this.type}(${this.value})`;
    }
    return `${this.type}(${this.lexeme})`;
  }
}

// 2. Simple lexer for expressions (integers + operators)

function lex(input: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < input.length) {
    const ch = input[i];

    // Whitespace
    if (/\s/.test(ch)) {
      i++;
      continue;
    }

    // Number literal (only integers here)
    if (/[0-9]/.test(ch)) {
      let numStr = ch;
      i++;
      while (i < input.length && /[0-9]/.test(input[i])) {
        numStr += input[i];
        i++;
      }
      const value = Number(numStr);
      tokens.push(new Token(TokenType.NUMBER, numStr, value));
      continue;
    }

    // Single-character tokens
    switch (ch) {
      case "+":
        tokens.push(new Token(TokenType.PLUS, ch));
        break;
      case "-":
        tokens.push(new Token(TokenType.MINUS, ch));
        break;
      case "*":
        tokens.push(new Token(TokenType.STAR, ch));
        break;
      case "/":
        tokens.push(new Token(TokenType.SLASH, ch));
        break;
      case "(":
        tokens.push(new Token(TokenType.LPAREN, ch));
        break;
      case ")":
        tokens.push(new Token(TokenType.RPAREN, ch));
        break;
      default:
        throw new Error(`Unexpected character '${ch}' at position ${i}`);
    }

    i++;
  }

  tokens.push(new Token(TokenType.EOF, ""));
  return tokens;
}

// 3. AST node types

interface NumberLiteralNode {
  type: "NumberLiteral";
  value: number;
}

interface BinaryExprNode {
  type: "BinaryExpr";
  op: string; // "+", "-", "*", "/"
  left: ExprNode;
  right: ExprNode;
}

type ExprNode = NumberLiteralNode | BinaryExprNode;

// 4. Recursive-descent parser (same grammar as slides)

class Parser {
  private tokens: Token[];
  private pos: number;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.pos = 0;
  }

  private current(): Token {
    return this.tokens[this.pos];
  }

  private match(type: TokenType): Token | null {
    const tok = this.current();
    if (tok && tok.type === type) {
      this.pos++;
      return tok;
    }
    return null;
  }

  private expect(type: TokenType, message: string): Token {
    const tok = this.match(type);
    if (!tok) {
      const here = JSON.stringify(this.current());
      throw new Error(message + " at token " + here);
    }
    return tok;
  }

  // Factor ::= "(" Expr ")" | NUM
  parseFactor(): ExprNode {
    const tok = this.current();

    if (tok.type === TokenType.LPAREN) {
      this.match(TokenType.LPAREN);
      const expr = this.parseExpr();
      this.expect(TokenType.RPAREN, "Expected ')'");
      // Parentheses do not become their own AST nodes
      return expr;
    }

    if (tok.type === TokenType.NUMBER && tok.value !== undefined) {
      this.match(TokenType.NUMBER);
      return {
        type: "NumberLiteral",
        value: tok.value,
      };
    }

    throw new Error(
      "Expected number or '(' at token " + JSON.stringify(tok)
    );
  }

  // Term ::= Factor (("*"|"/") Factor)*
  parseTerm(): ExprNode {
    let node: ExprNode = this.parseFactor();

    while (true) {
      const tok = this.current();
      if (
        !tok ||
        (tok.type !== TokenType.STAR && tok.type !== TokenType.SLASH)
      ) {
        break;
      }
      // consume * or /
      this.pos++;
      const right = this.parseFactor();
      node = {
        type: "BinaryExpr",
        op: tok.lexeme, // "*" or "/"
        left: node,
        right: right,
      };
    }

    return node;
  }

  // Expr ::= Term (("+"|"-") Term)*
  parseExpr(): ExprNode {
    let node: ExprNode = this.parseTerm();

    while (true) {
      const tok = this.current();
      if (
        !tok ||
        (tok.type !== TokenType.PLUS && tok.type !== TokenType.MINUS)
      ) {
        break;
      }
      // consume + or -
      this.pos++;
      const right = this.parseTerm();
      node = {
        type: "BinaryExpr",
        op: tok.lexeme, // "+" or "-"
        left: node,
        right: right,
      };
    }

    return node;
  }

  // Top-level: parse a full expression and ensure no extra tokens
  parse(): ExprNode {
    const ast = this.parseExpr();
    const tok = this.current();
    if (tok && tok.type !== TokenType.EOF) {
      throw new Error(
        "Unexpected extra input at token " + JSON.stringify(tok)
      );
    }
    return ast;
  }
}

// 5. Simple AST evaluator 

function evalAst(node: ExprNode): number {
  if (node.type === "NumberLiteral") {
    return node.value;
  }

  // node.type === "BinaryExpr"
  const left = evalAst(node.left);
  const right = evalAst(node.right);

  switch (node.op) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return left / right;
    default:
      throw new Error("Unknown operator " + node.op);
  }
}

// 6. Command-line driver (same style as tiny_lexer.ts)

type Env = { [name: string]: number };

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: npx ts-node expr_parser.ts "1 + 2 * 3"');
    console.error('   or: npx ts-node expr_parser.ts "x + 1" \'{"x":5}\'');
    process.exit(1);
  }

  const src = args[0];

  let env: Env = {};
  if (args.length >= 2) {
    try {
      env = JSON.parse(args[1]);
      if (env === null || typeof env !== "object" || Array.isArray(env)) {
        throw new Error("Env must be a JSON object like {\"x\":5}");
      }
    } catch (e) {
      console.error("Bad env JSON:", e instanceof Error ? e.message : e);
      process.exit(1);
    }
  }

  console.log("Source:", src);
  console.log("");

  try {
    const tokens = lex(src);
    console.log("Tokens:");
    for (const t of tokens) console.log("  ", t.toString());
    console.log("");

    const parser = new Parser(tokens);
    const ast = parser.parse();
    console.log("AST:");
    console.log(JSON.stringify(ast, null, 2));
    console.log("");

    // IMPORTANT: your Part C version of evalAst will be evalAst(ast, env)
    const value = (evalAst as any)(ast, env);

    console.log("Evaluated value:", value);

    // Add ONE stable line for autograding:
    console.log(`RESULT ${value}`);
  } catch (e) {
    if (e instanceof Error) console.error("Parser error:", e.message);
    else console.error("Unknown error:", e);
    process.exit(1);
  }
}

main();
