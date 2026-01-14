// run with npx ts-node 02_lexer/tiny_lexer.ts "let sum = a + 10;"
// 1. Define token types
const TokenType = {
  LET: "LET",
  IDENT: "IDENT",
  NUMBER: "NUMBER",
  OP: "OP",
  ASSIGN: "ASSIGN",
  SEMI: "SEMI",
} as const;

type TokenType = typeof TokenType[keyof typeof TokenType];


class Token {
  public type: TokenType;
  public lexeme: string;

  constructor(type: TokenType, lexeme: string) {
    this.type = type;
    this.lexeme = lexeme;
  }

  toString(): string {
    return `${this.type}(${this.lexeme})`;
  }
}

// 2. Regex "spec" for each token type
// Each pair is: [regular expression, token type or null if we skip it]
const tokenSpecs: [RegExp, TokenType | null][] = [
  // Whitespace (skip)
  [/^\s+/, null],

  // Single-line comments (skip)
  [/^\/\/.*/, null],

  // Keywords
  [/^let\b/, TokenType.LET],

  // Identifiers and numbers
  [/^[A-Za-z_][A-Za-z0-9_]*/, TokenType.IDENT],
  [/^[0-9]+/, TokenType.NUMBER],

  // Operators and punctuation
  [/^[+\-*\/]/, TokenType.OP],
  [/^=/, TokenType.ASSIGN],
  [/^;/, TokenType.SEMI]
];

// 3. The lexer function
export function lex(input: string): Token[] {
  const tokens: Token[] = [];
  let str: string = input;

  while (str.length > 0) {
    let match: RegExpExecArray | null = null;
    let matchedType: TokenType | null = null;

    for (const [regex, type] of tokenSpecs) {
      match = regex.exec(str);
      if (match) {
        matchedType = type;
        break;
      }
    }

    if (!match) {
      throw new Error(`Unexpected character: '${str[0]}' in: ${JSON.stringify(str)}`);
    }

    const lexeme = match[0];

    if (matchedType !== null) {
      tokens.push(new Token(matchedType, lexeme));
    }

    // Remove the matched part from the front of the string
    str = str.slice(lexeme.length);
  }

  return tokens;
}

// 4. Command-line driver
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: npm run lex -- "let sum = a + 10;"');
    process.exit(1);
  }

  // Join all arguments into one source string
  const src = args.join(" ");

  console.log("Source:", src);
  try {
    const tokens = lex(src);
    for (const t of tokens) {
      console.log("  ", t.toString());
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error("Lexer error:", e.message);
    } else {
      console.error("Unknown error:", e);
    }
    process.exit(1);
  }
}

main();
