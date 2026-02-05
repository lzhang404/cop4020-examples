#include <stdio.h>

enum Kind { IS_INT, IS_FLOAT };

struct Value {
    enum Kind tag;
    union {
        int i;
        float f;
    } u;
};

void print_value(struct Value v) {
    if (v.tag == IS_INT) {
        printf("int: %d\n", v.u.i);
    } else {
        printf("float: %f\n", v.u.f);
    }
}

int main(void) {
    struct Value a;
    a.tag = IS_INT;
    a.u.i = 42;

    struct Value b;
    b.tag = IS_FLOAT;
    b.u.f = 3.14f;

    print_value(a);
    print_value(b);

    return 0;
}
