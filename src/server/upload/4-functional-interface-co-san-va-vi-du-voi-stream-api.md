Như hai bài trước đã giới thiệu, một trong những điều kiện của functional programming là khả năng pass một function vào một function khác. Java đã thực hiện được điều này nhờ khai báo functional interface và pass implementation tương ứng vào.

Tuy nhiên, nếu mỗi lần dùng lại phải định nghĩa functional interface mới thì dài dòng quá. Với những method có "hình dạng" phổ biến, Java đã định nghĩa sẵn kha khá functional interface để giúp bạn khỏi cần viết lại. 4 cái cơ bản gồm có `Consumer`, `Function`, `Predicate` và `Supplier`, hẳn bạn đã nghe qua rồi, hãy cùng tìm hiểu thêm qua bài viết này nhé.

## 1. Bốn functional interface cơ bản

Thực ra khi học về functional interface này, chỉ cần nhớ cấu trúc nó là được. Ví dụ như `Consumer<T>`, nhận vào các tham số nào, trả về kiểu dữ liệu gì thôi.

Với lại những functional interface này hầu hết đều có dùng generics nhé. Cũng không cần nhớ generics param như thế nào, có thể suy ra được từ ý nghĩa.

### 1.1. `Consumer<T>`

Nhận vào một param kiểu `T`, không trả về gì cả. Nói cách dân dã là chỉ thích nhận lại nhưng không thèm cho đi.

```java
Consumer<Integer> print = num -> System.out.println(num);
print.accept(3); // 3
```

Thường có trong các hàm xử lý phần tử, ví dụ như nhận phần tử và thực hiện lệnh gì đó.

### 1.2. `Function<T, R>`

Nhận một tham số `T`, trả về một giá trị tương ứng kiểu `R`.

```java
Function<String, Integer> getLength = str -> str.length();
getLength.apply("John Doe"); // 3
```

Dùng để biến đổi một giá trị thành một giá trị khác (map 1 với 1).

### 1.3. `Predicate<T>`

Nhận một tham số `T` và trả về boolean.

```java
Predicate<Integer> checkAge = age -> age > 18;
checkAge.test(10); // false
```

Dùng để check xem phần tử có thỏa mãn điều kiện hay không.

### 1.4. `Supplier<T>`

> Đích thị ông này nhóm máu O. Chỉ biết cho đi nhưng không cần nhận lại.

Functional interface này không nhận vào param nào, nhưng lại trả ra một giá trị nào đó.

```java
Supplier<Double> generate = () -> Math.random(100);
generate.get(); // Số random nào đó
```

Thường dùng để generate stream vô hạn.

## 2. Ví dụ từng loại trong Stream API

4 functional interface trên khá cơ bản, nhưng bạn sẽ thắc mắc vậy nó được dùng ở đâu? Câu trả lời là dùng trong các operation của Stream API.

Ở đây mình sẽ giải thích cơ bản cách stream hoạt động:

* Lấy ra stream (giống như một luồng liên tục các phần tử) từ array hoặc collection
* Các phần tử của stream sẽ đi qua nhiều operation (giống như bộ lọc ấy)
* Mỗi operation sẽ biến đổi từng phần tử, tùy vào loại operation nào (map, filter,...)
* Kết quả cuối cùng sẽ được xử lý

Code ví dụ cho dễ hiểu nhé.

```java
List.of(2, 3, 5, 7).stream() // Lấy ra stream từ List
    .map(num -> num * 2) // Mỗi phần tử sẽ được nhân đôi
    .filter(num -> num < 10) // Chỉ giữ lại các phần tử nhỏ hơn 10
    .forEach(num -> System.out.println(num)); // In ra các phần tử còn lại
```

Ở đây `map()`, `filter()` và `forEach()` là các stream operation. Mỗi loại sẽ thực hiện chức năng khác nhau, và nó sử dụng các loại functional interface tương ứng:

* `map()` để biến đổi phần tử 1-1, nên nó dùng `Function<T, R>`
* `filter()` để lọc ra các phần tử phù hợp, nên nó dùng `Predicate<T>`
* `forEach()` chỉ dùng in ra thôi, không return gì nữa, nên nó dùng `Consumer<T>`

Thường người ta viết dạng lambda cho ngắn, và viết luôn trong operation. Nếu muốn bạn vẫn có thể tách ra, như trên ví dụ ở phần 1.

> Ơ thế mấy cái `apply()`, `test()`,... bên trong functional interface thì thực hiện ở đâu?

Những method đó sẽ do Stream API thực hiện ngầm định. Bạn chỉ cần đưa lambda vô operation, code bên trong của operation đó sẽ biết và gọi method tương ứng bên trong.

---

Okay bài viết khá dài rồi, mình sẽ tạm dừng ở đây. Ở bài sau chúng ta sẽ tiếp tục đến với các functional interface có sẵn khác, với các dạng "cao cấp" hơn nhé.

Như mọi khi, bài viết cũng được đăng trên blog cá nhân của mình https://tonghoangvu.hashnode.dev/4-functional-interface-co-san-va-vi-du-voi-stream-api.