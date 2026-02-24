interface PaymentMethod {
  // Known at compile time: every PaymentMethod must implement charge(...)
  void charge(int cents);
}

class CreditCard implements PaymentMethod {
  @Override
  public void charge(int cents) {
    System.out.println("Charging credit card: $" + (cents / 100.0));
  }
}

class GiftCard implements PaymentMethod {
  @Override
  public void charge(int cents) {
    System.out.println("Redeeming gift card: $" + (cents / 100.0));
  }
}

class Checkout {
  // Polymorphic call site: method is known, implementation chosen by runtime type.
  static void pay(PaymentMethod method, int cents) {
    method.charge(cents); // dynamic dispatch happens here
  }
}

public class java_subtype {
  public static void main(String[] args) {
    PaymentMethod m1 = new CreditCard();
    PaymentMethod m2 = new GiftCard();

    Checkout.pay(m1, 2599); // CreditCard.charge runs
    Checkout.pay(m2, 2599); // GiftCard.charge runs
  }
}