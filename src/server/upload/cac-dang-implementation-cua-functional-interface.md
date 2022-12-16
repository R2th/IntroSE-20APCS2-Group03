Bài trước mình đã nói qua về Functional interface, và có nhắc một câu là nên phân biệt rạch ròi giữa Functional interface là implementation của nó. Lý do bởi vì functional interface chỉ có một loại đó thôi, lấy ra dùng là được. Còn implementation của nó có nhiều dạng, nào là...

À mà thôi, tiếp tục đọc bài viết để hiểu nó gồm những dạng nào nhé 👌

## 1. Chuẩn bị vài thứ

Ở đây mình sẽ chuẩn bị sẵn đoạn code sample nhé. Đầu tiên sẽ có một functional interface này.

```java
@FunctionalInterface
public interface Flyable {
    void fly();
}
```

Và một method sử dụng functional interface đó, cũng đồng nghĩa với việc method này nhận vào method khác có dạng như `void fly()`.

```java
public void tryFlying(Flyable somethingCanFly) {
    somethingCanFly.fly();
}
```

Okay đã xong, hãy đến với bước tiếp theo là thực hiện "bay". Chúng ta cần truyền "code thực hiện", chính là implementation ở đầu bài, vào trong method `tryFlying()`. Mình sẽ lấy ví dụ 4 cách bay khác nhau, gồm có "gà bay", "chim bay", "máy bay" nhé. Mỗi loại bay chỉ đơn giản là in ra màn hình dòng chữ thôi.

## 2. Implementation bằng class (cách truyền thống)

Hai cách thực hiện implementation truyền thống (mình gọi vậy vì nó đã có từ trước Java 8 rồi) là dùng class và anonymous class.

### 2.1. Dùng class riêng biệt

Chỉ đơn giản là tạo thêm class mới, có implement functional interface `Flyable`. Lúc này object của class hoàn toàn có thể truyền vô được cho `tryFlying()` method.

```java
public class Chicken implements Flyable {
    ...
    @Override
    public void fly() {
        // Code implementation ở đây
        System.out.println("Chicken is flying...");
    }
}
...
tryFlying(new Chicken());
```

### 2.2. Dùng anonymous class

Nếu bạn không muốn tạo thêm class, thì có thể dùng anonymous class như sau.

```java
Flyable chicken = new Flyable() {
    @Override
    public void fly() {
        // Code implementation ở đây
        System.out.println("Chicken is flying...");
    }
}
tryFlying(chicken); // Hoặc khởi tạo chung luôn
```

Tuy nhiên, hai cách này vừa dài dòng, mà dùng nhiều lại làm chậm chương trình (do tạo thêm nhiều class không cần thiết).

## 3. Java 8 rồi, dùng lambda thôi

Java 8 giới thiệu thêm 2 cách mới, để viết implementation cho functional interface được gọn hơn, đẹp hơn và nhanh hơn.

### 3.1. Đầu tiên phải nói tới lambda, đây là ví dụ cho nó.

```java
// Code implementation là nó luôn
Flyable bird = () -> System.out.println("Bird is flying...");
tryFlying(bird);

// Hoặc rút gọn hơn nữa
tryFlying(() -> System.out.println("Bird is flying..."));
```

Nhìn quen hong, giống JavaScript arrow function, hoặc na ná như trên anonymous class. Tuy nhiên lambda không giống anonymous class nhé, syntax như vậy thôi chứ cách hoạt động bên trong khá là khác.

> Bạn đã thấy sự liên quan của lambda với functional interface chưa?

Đơn giản mà nói, lambda giống như 1 function thu nhỏ, có tham số và phần body chứa code. Cấu trúc của lambda trên hoàn toàn giống với method `fly()` bên trong functional interface `Flyable`. Vì thế, lambda trên là implementation hợp lệ cho `Flyable`.

Bạn đã hiểu vì sao dùng functional interface chưa, mà không phải interface thường. Đó là vì functional interface chỉ có 1 abstract method, nếu có nhiều ábstract method thì lambda sẽ là abstract method nào? Còn những abstract method khác thì sao, chưa có được override lại mà bị gọi thì chắc chắn bị lỗi rồi. Do đó, người ta mới dùng functional interface đó.

### 3.2. Method reference

Nếu bạn đã có method có sẵn rồi (có dạng phù hợp với `Flyable`), mà muốn truyền method đó cho `tryFlying()` thì nên dùng method reference.

```java
class Airport {
    // Đây là method có sẵn, dùng làm implementation luôn
    public static void takeOffAPlane() {
        System.out.println("Plane is flying...");
    }
}
...
tryFlying(Airport::takeOffAPlane); // Còn có một vài dạng khác
```

Hai khái niệm lambda và method reference mình không bàn kĩ nhé. Vì bài này chỉ là giới thiệu 4 dạng implementation của functional interface thôi. Những bài sau mình sẽ nói chi tiết hơn nhé.

---

Tóm lại bài viết chỉ đến đây thôi, hi vọng các bạn đã hiểu được các dạng implementation. Nói nôm na hơn là cách đưa code vào trong method khác ý. Okay cảm ơn mọi người vì đã đọc hết bài nhé. Thân.

Như mọi khi, bài viết cũng được đăng trên blog cá nhân của mình https://tonghoangvu.hashnode.dev/cac-dang-implementation-cua-functional-interface.