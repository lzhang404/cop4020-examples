// javac javareflection.java
// java javareflection
import java.lang.reflect.Method;

class Secret {
  public void greet() { System.out.println("Hello (via reflection)"); }
}

public class java_reflection{
  public static void main(String[] args) throws Exception {
    Object obj = new Secret();

    // Method is chosen by name at runtime:
    Method m = obj.getClass().getMethod("greet");

    // Invoke it dynamically:
    m.invoke(obj); // prints: Hello (via reflection)

    // If you misspell the name, it fails at runtime:
    // obj.getClass().getMethod("grete"); // throws NoSuchMethodException
  }
}