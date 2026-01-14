x = 10
y = "20"
try:
  z = x + y
except TypeError as e:
  print("runtime TypeError:", e)
