#include <stdio.h>

int main(void) {
  int x = 0;
  int y = (x = 5);
  printf("x=%d y=%d\n", x, y);
  return 0;
}
