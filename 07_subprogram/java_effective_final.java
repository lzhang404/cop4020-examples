//javac DemoJavaEffectiveFinal.java
//java DemoJavaEffectiveFinal
import java.util.function.IntUnaryOperator;

public class DemoJavaEffectiveFinal {
  static IntUnaryOperator makeAdder(int k) {
    // k is effectively final inside this method
    return x -> x + k;
  }

  public static void main(String[] args) {
    IntUnaryOperator add10 = makeAdder(10);
    System.out.println("add10(5) = " + add10.applyAsInt(5));
  }
}
