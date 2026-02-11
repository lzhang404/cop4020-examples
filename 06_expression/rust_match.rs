// rust_match.rs
// Run:
//   rustc rust_match.rs && ./rust_match
// Or with Cargo:
//   cargo new demo && replace src/main.rs with this file, then:
//   cargo run

fn classify_score(score: i32) -> &'static str {
    match score {
        0..=59 => "fail",
        60..=79 => "pass",
        80..=89 => "good",
        90..=100 => "excellent",
        _ => "invalid",
    }
}

fn main() {
    let tests = [55, 75, 85, 95, -1, 120];

    for s in tests {
        println!("score {:>3} => {}", s, classify_score(s));
    }
}

