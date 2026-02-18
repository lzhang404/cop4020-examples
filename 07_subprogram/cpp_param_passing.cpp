// ===== cpp_param_passing.cpp =====
// g++ -std=c++17 cpp_param_passing.cpp -o cpp_param_passing
// ./cpp_param_passing
#include <iostream>
using namespace std;

void swap_by_value(int a, int b) {     // copies
  int tmp = a;
  a = b;
  b = tmp;
}

void swap_by_ref(int& a, int& b) {     // aliases caller variables
  int tmp = a;
  a = b;
  b = tmp;
}

void swap_by_ptr(int* a, int* b) {     // explicit addresses/locations
  int tmp = *a;
  *a = *b;
  *b = tmp;
}

int main() {
  int x = 2, y = 9;

  cout << "start: x=" << x << " y=" << y << "\n";

  swap_by_value(x, y);
  cout << "after swap_by_value: x=" << x << " y=" << y << "\n";

  swap_by_ref(x, y);
  cout << "after swap_by_ref:   x=" << x << " y=" << y << "\n";

  swap_by_ptr(&x, &y);
  cout << "after swap_by_ptr:   x=" << x << " y=" << y << "\n";
}
