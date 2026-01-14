#include <stdio.h>

int main(void) {
  int day = 1;
  switch (day) {
    case 1:
      printf("Monday\n");
      // break; // BUG: fallthrough happens
    case 2:
      printf("Tuesday\n");
      break;
    default:
      printf("Other\n");
  }
  return 0;
}
