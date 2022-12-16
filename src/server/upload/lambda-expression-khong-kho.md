Java 8 bổ sung thêm khá nhiều tính năng, trong đó có cú pháp lambda expression. Nói đơn giản, đây là một cách implement một functional interface ngắn gọn hơn so với cách dùng class hoặc anonymous class. Bạn có thể xem lại phần tổng quan ở bài 2 nhé.

Về cú pháp lambda thì trong những bài trước mình có ví dụ sơ sơ rồi. Và bài hôm nay mình sẽ đi sâu hơn về nó nhé.

## 1. Cú pháp chung

Cú pháp lambda khá giống cách viết arrow function trong JavaScript. Cũng gồm có 3 phần như sau:

* Danh sách tham số
* Arrow token (dấu `->`)
* Phần body chứa code

Ví dụ với đoạn code này nhé.

```java
List.of("John", "Mike").stream()
    .forEach((String name) -> {
        System.out.println(name);
    });
```

Thì phần sau chính là một lambda expression (do là expression nên gán cho biến được).

```java
Consumer<String> printName = (String name) -> {
    System.out.println(name);
}
```

Cũng cần chú ý là dạng của lambda phải phù hợp với method của functional interface. Ví dụ operation `filter()` cần một `Predicate<T>` mà bạn đưa lambda dạng `Function<T, R>` là dở rồi 😁

## 2. Rút gọn lambda

Trình biên dịch của Java càng ngày càng thông minh, nên nó có thể suy luận được một số kiểu dữ liệu (type inference). Do đó, chúng ta không cần viết dạng đầy đủ cho lambda như trên mà có thể rút gọn xuống như sau.

Đầu tiên có thể bỏ kiểu dữ liệu của lambda param đi như sau.

```java
Consumer<String> printName = (name) -> {
    System.out.println(name);
}
```

Nhưng làm sao Java biết được `name` có kiểu gì? Ở đoạn code đầu tiên , chúng ta có danh sách là `List<String>`, nên stream lấy ra là `Stream<String>`. Từ đó suy ra được `T` là `String`, như vậy `name` cũng là `String`.

Thứ hai, nếu lambda chỉ có 1 param như trên thì bỏ dấu ngoặc đơn `()` như sau.

```java
// Có đúng 1 param thì bỏ được
Consumer<String> printName = name -> {
    System.out.println(name);
}

// Nhưng có 0 hoặc từ 2 param trở lên thì phải có
Supplier<Integer> five = () -> {
    return 5;
}

BiPredicate<Integer, Integer> isBigger = (a, b) -> {
    return a > b;
}
```

Cuối cùng là xem xét bỏ luôn ngoặc nhọn `{}` đi luôn. Dùng khi body chỉ có một lệnh, nhiều lệnh thì phải có ngoặc nhọn bao lại.

```java
// Nếu chỉ có một lệnh nào đó (không return)
Consumer<Integer> print = num -> System.out.println(num);

// Nếu lệnh duy nhất là return thì không cần ghi return
Function<String, Integer> getLength = str -> str.length(); // Đúng
Function<String, Integer> getLength = str -> return str.length(); // Sai
```

Từ Java 10, có thể dùng `var` thay vì để Java tự suy luận kiểu ngầm định như trên.

```java
Consumer<Integer> print = (var num) -> System.out.println(num);
```

Ơ nhưng tại sao dùng thêm `var` làm chi, để trống nó cũng suy luận ra được vậy? À, lý do bởi vì nếu lambda param có thêm các modifier (như `final`) hoặc annotation thì để trống kiểu không được. Lúc đó thì dùng `var` thế vào, vừa vẫn được suy luận kiểu, vừa không bị lỗi.

```java
// Lỗi do thiếu kiểu dữ liệu
Consumer<Integer> print = (final num) -> System.out.println(num);

// Đúng, do var được xem là kiểu dữ liệu tự suy luận
Consumer<Integer> print = (final var num) -> System.out.println(num);
```

## 3. Capturing lambda?

Bên trong body của lambda bạn có thể khai báo các biến local bình thường (như trong method). Ngoài ra, lambda còn có thể truy cập tới các biến bên ngoài.

```java
// Biến bên ngoài đây
int increment = 1;

Function<Integer, Integer> increase = num -> {
    // Truy cập được biến bên ngoài
    return num + increment;
};
```

Do cách hoạt động của lambda, người ta phân lambda thành 2 loại:

* Non-capturing: lambda không truy cập tới biến nào bên ngoài nó
* Capturing: lambda có truy cập tới biến bên ngoài

Code ví dụ trên là capturing lambda, và biến được capture chính là `increment`.

Và Java có áp dụng quy tắc lên trên biến bên ngoài được lambda capture. Đó là biến capture cần phải là `final` hoặc effectively final (chả biết dịch sao).

> Nói chung nghĩa là lambda không được phép sửa biến mà nó capture.

Trước đây với anonymous class thì bắt buộc có `final`, nhưng lambda đỡ hơn chỗ cho phép cả `effectively final` (không cần `final`, nhưng không được sửa biến đó).

```java
int increment = 1;

Function<Integer, Integer> increase = num -> {
    increment = 2; // Lỗi do sửa biến, làm mất tính effectively final
    return num + increment;
};
```

---

Okay bài đến đây thôi. Tóm lại các bạn đã nắm được cách sử dụng lambda cơ bản rồi. Nếu các bạn có hứng thú tìm hiểu sâu hơn về lambda, cách nó hoạt động, lambda có phải là syntax sugar của anonymous class không,... hãy đón chờ bài viết sau nhé.

Như mọi khi, bài viết cũng được đăng trên blog cá nhân của mình https://tonghoangvu.hashnode.dev/lambda-expression-khong-kho.