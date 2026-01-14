# py_legb.py
x = "global"
def outer():
    x = "outer"
    def inner():
        print(x)  # outer
    inner()
outer()
