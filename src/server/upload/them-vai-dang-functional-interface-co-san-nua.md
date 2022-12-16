Bài trước mình đã nói qua về 4 functional interface mà Java cung cấp sẵn cho chúng ta. Đó là `Consumer<T>`, `Function<T, R>`, `Predicate<T>` và `Supplier<T>`. Và từ 4 loại trên, Java bổ sung thêm một số dạng "nâng cao" hơn nữa để phù hợp với các nhiệm vụ cụ thể. Hãy tiếp tục đọc bài viết để tìm hiểu thêm nhé.

## 1. Dạng `Bi...<T, U>`

Dạng này thay vì nhận một tham số, nó sẽ nhận hai tham số `T` và `U`:

* `BiConsumer<T, U>` nhận 2 param `T`, `U` và không trả về
* `BiFunction<T, U, R>` nhận 2 param `T`, `U` và trả về một `R`
* `BiPredicate<T, U>` nhận 2 param `T`, `U` và trả về boolean

> Chú ý sẽ không có `BiSupplier` nhé, vì nó không nhận tham số, chỉ trả về duy nhất một value thôi (không có 2 value).

Thêm đoạn code ví dụ nữa nè.

```java
// BiConsumer ít thấy dùng trong operation
// Do operation thường chỉ xử lý một element thôi
BiConsumer<String, Integer> printInfo = (name, age) -> {
    System.out.println("Name: " + name);
    System.out.println("Age: " + age);
};

// BiPredicate cũng ít dùng trong stream operation
// Lý do cũng như trên
BiPredicate<Integer, Integer> isBigger = (a, b) -> a > b;

// BiFunction có dùng trong reduce operation
List.of(2, 3, 5, 7).stream()
    .reduce(0, (acc, curr) -> acc + curr);
```

## 2. `UnaryOperator<T>` và `BinaryOperator<T>`

Đây là 2 functional interface đặc biệt, dựa theo `Function<T, R>`:

* `UnaryOperator<T>` tương đương `Function<T, T>`
* `BinaryOperator<T>` tương đương `BiFunction<T, T, T>`

Dễ thấy cả hai đều là `Function` nhưng có kiểu nhận vào và kiểu trả về đều giống nhau.

## 3. Dạng `Primitive...<T>`

Từ bài trước đến nay mình hầu như chỉ lấy ví dụ những functional interface có generics. Mà bạn biết rồi dùng được với generics chỉ có những object hoặc wrapper class như `Integer`, `Double`,...

Vậy, nếu bạn muốn functional interface có method "hình dạng" như thế này thì sao?

```java
R apply(int value); // int chứ không phải Integer
```

Cũng đúng nhỉ, nếu Java không có những primitive thì tốc độ sẽ chậm hơn rất nhiều (dùng wrapper như `Integer` luôn chậm hơn `int`). Với Stream API cũng thế, Java cũng có các functional interface hỗ trợ primitive. Nhờ đó mới có primitive stream, tốc độ được cải thiện đáng kể.

> Cú pháp chung là `Primitive...<T>`, trong đó `Primitive` phải là `Int`, `Long`, `Double`, còn phần `...` là những loại cơ bản như `Consumer`,...

Theo như cách kết hợp trên, chúng ta sẽ có thêm một số functional interface sau (ý nghĩa do bạn suy ra nhé):

* `IntConsumer`, `LongConsumer`, `DoubleConsumer`
* `IntPredicate`, `LongPredicate`, `DoublePredicate`
* `IntSupplier`, `LongSupplier`, `DoubleSupplier`
* `IntFunction<T>`, `LongFunction<T>`, `DoubleFunction<T>`

Chú ý trong trường hợp này chỉ có mấy ông `Function` mới có generics param. Và ý nghĩa của nó là nhận vào `Primitive` nhưng trả về `T`.

## 4. Các dạng khác

Ngoài ra, với `Function<T>` còn gồm các dạng đặc biệt:

* `To...Function<T>` nhận vào một `T`, trả về kiểu `...` (gồm `Int`, `Long`, `Double`)
* `To...BiFunction<T, U>` nhận vào 2 params `T` và `U`, trả về `...` (như trên)
* `...To...Function` (không có generics) nhận vào một `...` và trả về `...`

---

Okay vậy là mình đã giới thiệu đến cho các bạn gần như hết những functional interface mà Java cung cấp sẵn. Nói chung thì những dạng này không cần nhớ hết, có gì quên thì mở Javadoc ra xem là được.

À cũng được kha khá bài rồi, nếu bạn thấy hay và thích cách viết của mình thì đừng ngại nhấn Like hoặc Share cho mình nhé. Thank you ❤️

Như mọi khi, bài viết cũng được đăng lên blog cá nhân của mình https://tonghoangvu.hashnode.dev/them-vai-dang-functional-interface-co-san-nua.