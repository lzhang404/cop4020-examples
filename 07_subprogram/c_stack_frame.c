// ===== c_stack_frames.c =====
// gcc  c_stack_frames.c -o c_stack_frames
// ./c_stack_frames
#include <stdio.h>

void demo(int n) {
  int local = n * 10;  // a local variable stored in THIS call's frame
  printf("n=%d  local=%d  &local=%p\n", n, local, (void*)&local);

  if (n > 0) demo(n - 1);     // recursive call => NEW activation record
  // after return, THIS call resumes with its own local still intact
  printf("returning n=%d  local=%d  &local=%p\n", n, local, (void*)&local);
}

int main() {
  demo(3);
  return 0;
}
