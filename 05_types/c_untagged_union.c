#include <stdio.h>

union IntOrFloat {
  int i;
  float f;
};

int main(void) {
  union IntOrFloat x;
  x.i = 42;
  // reading through a different member is not a safe "type error"—it’s undefined/implementation-defined territory
  printf("as int: %d\n", x.i);
  printf("as float: %f\n", x.f);
  return 0;
}
