# ===== py_deep_vs_shallow.py =====
# python3 py_deep_vs_shallow.py

class Fun:
    # code: a function that needs an environment to resolve free vars
    # def_env: the environment captured at "function value creation time"
    def __init__(self, code, def_env):
        self.code = code
        self.def_env = def_env

    def call_deep(self, y):
        # deep binding: use environment from creation time
        return self.code(self.def_env, y)

    def call_shallow(self, call_env, y):
        # shallow binding: use environment from call site time
        return self.code(call_env, y)

def add_code(env, y):
    # free variable 'x' is resolved via env lookup
    return env["x"] + y

def make_adder(x):
    def_env = {"x": x}            # captured environment
    return Fun(add_code, def_env) # function value + environment

add10 = make_adder(10)

caller_env = {"x": 100}  # imagine caller has its own x at call time

print("deep binding result:", add10.call_deep(5))                 # 15
print("shallow binding result:", add10.call_shallow(caller_env,5))# 105
