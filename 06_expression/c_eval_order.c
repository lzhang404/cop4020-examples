#include <stdio.h>

int inc(const char *label, int *p) {
  printf("%s %d\n", label, *p);
  return (*p)++;
}

int main(void) {
  int x = 1;
  int y = inc("first", &x) + inc("second", &x);
  printf("x = %d, y = %d\n", x, y);
  return 0;
}
