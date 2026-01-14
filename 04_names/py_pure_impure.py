# py_pure_impure.py
acc = 0
def square(x): return x*x
def add_to_acc(x):
    global acc
    acc += x
    return acc

print(square(3), square(3))     # 9 9
print(add_to_acc(3), add_to_acc(3))  # 3 6
