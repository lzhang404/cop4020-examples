#include <stdio.h>

int main(void) {
  int *p = NULL;
  // Undefined behavior: likely crash, but not guaranteed
  *p = 42;
  printf("wrote to NULL?\n");
  return 0;
}
