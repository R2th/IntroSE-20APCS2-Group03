Bạn đã thực sự hiểu hết về các **Iteration methods** như `forEach()`, `map()`, `filter()`,... trong JavaScript hay chưa? Nếu bạn chưa từng đụng tới Java, câu trả lời sẽ là **không**.

![](https://images.viblo.asia/ce50212a-1819-4d14-b975-c403d7fbbe29.jpg)

Bài viết trình bày lý do vì sao lại có chuyện như vậy. Java thì liên quan gì với JavaScript. Ok, hãy bắt đầu khám phá sự ảo diệu ẩn sau những method trên nhé, dưới góc nhìn từ Java.

## 1. Từ vẻ đơn giản bề ngoài của JavaScript

### 1.1. Iteration methods

Chắc hẳn mọi JavaScript developer đều đã từng sử dụng qua các iteration methods như `forEach()`, `map()`,.... Dưới đây là một ví dụ đơn giản.

```js
const primes = [2, 3, 5, 7, 11, 13];

// forEach() nè
primes.forEach(num => console.log(num));

// filter() nè
const primesLessThan10 = primes.filter(num => num < 10);

// reduce() nè
const sum = primes.reduce((prev, curr) => prev + curr, 0);
```

Thực sự phải nói là JavaScript siêu đơn giản, đến mức có thể bạn sẽ tự hỏi đoạn code trên thì phức tạp chỗ nào?

Chỉ đơn giản là:

* Một số method thường dùng của JavaScript
* Các method nhận vào một callback function
* Callback function viết dạng arrow function

Tất cả chỉ có thế, chả có gì gọi là khó, phải không?

### 1.2. So sánh với code thuần

Ai cũng biết thay vì dùng method nào đó, ví dụ `forEach()` thì có thể dùng code thuần để viết.

```js
const primes = [2, 3, 5, 7];

// Dùng forEach()
primes.forEach(num => console.log(num));

// Không dùng forEach()
for (const num of primes)
    console.log(num);
```

Hoặc một method khác là `filter()`.

```js
const primes = [2, 3, 5, 7, 11];

// Dùng filter()
const primesGreaterThan10 = primes.filter(num => num > 10);

// Không dùng filter()
const primesGreaterThan10_2 = [];
for (const num of primes)
    if (num > 10)
        primesGreaterThan10_2.push(num);
```

### 1.3. Vậy thì phức tạp ở đâu?

Nếu bạn đã code JavaScript thành thạo, bạn có thể code những method trên như bay mà không cần nghĩ nhiều. Tuy nhiên, đó chỉ đơn giản là do bạn đã **quen** và đã **code nhiều lần**.

![](https://images.viblo.asia/35eb7875-e471-46d7-a08a-0facf0d7577b.jpg)

Lúc mới bắt đầu học những method trên, có ai từng đặt câu hỏi dạng như thế này?

> Function truyền cho `forEach()` có dạng như thế nào?
> 
> Callback function của `map()` có khác gì so với `forEach()` không?

Điều đó chứng tỏ, `forEach()` hay gì gì đó khác không đơn giản như bạn tưởng. Hiểu cách chạy là một chuyện, code được là một chuyện, nhưng hiểu được vì sao lại như thế lại là chuyện khác....

## 2. Đến sự phức tạp ảo diệu trong Java

### 2.1. Java có `forEach()` hay gì gì đó không?

Java 8 đã bổ sung thêm tính năng **Stream API**, đưa ra khái niệm Stream. Về cơ bản mọi Stream đều có thể sử dụng các hàm `forEach()`,...

Mọi Collection như List, Set,.. của java đều được implements Stream interface. Do đó, chúng ta có thể dễ dàng gọi `forEach()`,... trên đó.

```java
List<Integer> primes = Arrays.asList(2, 3, 5, 7);
primes.stream()
    .map(...)
    .forEach(...)
    // Còn nữa
```

Tuy nhiên, khi sử dụng, chúng ta không thể viết kiểu như JavaScript.

```java
List<Integer> primes = Arrays.asList(2, 3, 5, 7);

// Không truyền trực tiếp được function
primes.stream().forEach(function (int num) {
    System.out.println(num);
});

// Mặc dù dùng lambda được, nhưng nó không giống arrow function
primes.stream().forEach(num -> System.out.println(num));
```

### 2.2. Java đã làm điều đó như thế nào?

Như trên, chúng ta biết Java không thể truyền một function vào làm tham số function khác. Nhưng **cái khó ló cái khôn**, Java đã design ra một cách làm mới, siêu ảo diệu và phù hợp với ngôn ngữ strong typed như Java.

Cụ thể, java đưa ra khái niệm **Functional interface**.

```java
@FunctionalInterface
interface Consumer<T> {
    void accept(T t);
}
```

Code trên là một functional interface có sẵn của java, mình viết lại để làm ví dụ. Functional interface chỉ là interface, có duy nhất một abstract method.

Ơ, thế thì liên quan gì tới JavaScript?

Do Java không thể truyền function vào function khác, do đó thay vì truyền callback function thì java sẽ truyền một **implements của Functional interface**.

```java
primes.stream()
    .forEach(/* Thứ gì đó implements Consumer interface */);
```

Đây là cấu trúc method `forEach()` (ví dụ mẫu thôi).

```java
public void forEach(Consumer c) {
    for (/* Lặp hết từng elements */)
        c.accept(element);
}
```

Ồ, đến đây bạn đã thấy có gì đó liên quan chưa. Code của `forEach()` khá giống với bên JavaScript. Phần `c.accept(element)` chả phải là tương đương với đoạn sau của JavaScript.

```js
function forEach(callback) {
    for (/* Lặp hết từng elements */)
        callback(element);
}
...
forEach(function (e) {
    console.log(e);
});
```

Đấy, thay vì truyền trực tiếp function như JavaScript, thì java bỏ function đó vào trong một functional interface, và truyền **implement của functional interface** cho function.

### 2.3. Lambda là gì?

Chú ý vào đoạn phía trên, mình có in đậm phần **implements của functional interface**. Functional interface chỉ là interface, méo có code để thực thi, do đó phải có thứ gì đó (tạm gọi là X), implements functional interface với code thực thi, và ta sẽ truyền X cho function `forEach()`,...

Vậy làm sao tạo ra X? Thực ra trong java có tận 4 cách:

* Dùng class implements, rồi tạo object từ class, truyền cả object vào function
* Dạng anonymous class để implements functional interfaces
* Dùng lambda
* Dùng method reference

Cách 2 thường dùng trước đây, cụ thể là code anonymous class như vầy.

```java
primes.stream().forEach(new Consumer<Integer>() {
    @Override
    public void accept(Integer t) {
        // Code ở đây
        System.out.println(t);
    }
});
```

So với JavaScript, thì cách trên quá dài dòng.

```js
primes.forEach(functon (t) {
    console.log(t);
});
```

Do đó, người ta dùng lambda thay cho cách trên.

```java
primes.stream().forEach(t -> System.out.println(t));
```

Mặc dù lambda khá giống arrow function của JavaScript, nhưng có sự khác biệt:

* Arrow function là dạng rút gọn của function
* Lambda thực sự trả về một functional interface

Do đó, đoạn lambda `t -> System.out.println(t)` là một functional interface.

Và lambda có thể tự động suy luận kiểu dữ liệu. Vì `forEach()` chấp nhận `Consumer` interface, và `Consumer` chỉ có một method có tham số là Integer (do generics), nên suy ra `t` là kiểu `Integer`.

Cách cuối là rút gọn cho lambda, gọi là method reference. Dùng khi lambda ngắn gọn như trên.

```java
primes.stream().forEach(System.out::println);
```

## 3. Các functional interface có sẵn trong java

### 3.1. Built in functional interfaces

![](https://images.viblo.asia/b8195115-dc22-4c70-bbc5-751cb3de21e2.jpg)

Java xây dựng sẵn nhiều functional interface, mỗi loại tương ứng với một dạng method bên trong nó (dạng method phụ thuộc vào tham số và kiểu trả về):

* `Consumer<T> { void accept(T t); }`: Thằng này chỉ biết ăn (có 1 tham số) nhưng không trả lại gì (không có return)
* `Supplier<T> { T get(); }`: Chỉ có return, không nhận vào tham số nào
* `Function<T, R> { R apply(T t); }`: Nhận vào 1 tham số, trả về một giá trị
* `Predicate<T> { boolean test(T t); }`: Thẩm phán là đây, nhận vào một param và trả về đúng sai

Trên là 4 functional interface cơ bản. Ngoài ra còn có các functional interface dạng `BiABC` thay vì nhận 1 tham số thì sẽ nhận 2 tham số.

Vậy thì liên quan gì tới `forEach()`, `map()`,... này nọ?

### 3.2. Điểm chính của bài viết

Tới đây, các bạn sẽ hiểu được mối liên quan giữa Java và JavaScript.

> Mỗi iteration method sẽ nhận vào một functional interface tương ứng.
> 
> Và đây là điểm chính của bài viết này.

Trong JavaScript không thể hiện rõ điều đó, do tính chất weakly typed của ngôn ngữ cũng áp dụng lên cả function. Tuy nhiên, khi các method như `forEach()` vào Java, nó đã tạo nên sự khác biệt:

* `forEach()` dùng với `Consumer` interface
* `map()` dùng với `Function` interface
* `filter()` dùng với `Predicate` interface
* `find()`, `findValue()` dùng với `Predicate` interface
* `reduce()` dùng với `BiFunction` interface (do có 2 tham số, và return một value)

Lý do vì sao thì có thể suy ra dễ dàng từ ngữ cảnh. Điều này trong Java có thể suy rộng ra cho cả JavaScript.

Ví dụ, với JavaScript khi dùng `filter()` thì code như sau cho kết quả sai.

```js
const primes = [2, 3, 5, 7, 11, 13];
const primesLessThan10 = primes.filter(e => console.log(e));
console.log(primesLessThan10);  // Kết quả sai
```

Do `filter()` không dùng với `Consumer`, phải là `Predicate`, nhận vào `e` và return một `boolean`. Sửa lại như vầy.

```js
primes.filter(e => e > 10);
```

Okay bài viết khá dài rồi, mình dừng tại đây thôi. Cảm ơn các bạn đã bỏ thời gian đọc đến tận đây, mình biết ơn vì điều đó. Hi vọng các JavaScript developer sẽ hiểu hơn về iteration methods, và sử dụng một cách chính xác hơn.

Happy coding <3