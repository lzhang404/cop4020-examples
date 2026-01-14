// c_dangling.c
//cc c_dangling.c -O0 -g && ./a.out

#include <stdio.h>

int* bad() {
  int local = 42;
  return &local; // BUG: local dies when bad returns
}

int main() {
  int* p = bad();
  printf("%d\n", *p); // undefined behavior
}
