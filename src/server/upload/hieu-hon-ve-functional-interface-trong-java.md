Một trong các tính năng quan trọng nhất của Java 8 là việc hỗ trợ functional programming nhờ có Stream API. Và Stream API được xây dựng dựa trên một số khái niệm nền tảng hơn, gồm có Functional interface, Lambda expression,....

Do đó, bước đầu tiên để tìm hiểu về Stream API là hiểu rõ các khái niệm đó. Bài hôm nay mình sẽ đi vào khái niệm đầu tiên, cũng là quan trọng nhất, đó là Functional interface.

## 1. Functional interface là gì?

Functional interface là interface có duy nhất 1 abstract method, có thể không có hoặc có nhiều default/static method.

```java
@FunctionalInterface
public interface Flyable {
    void fly();

    default boolean alive() {
        return true;
    }
}
```

Annotation không bắt buộc, tuy nhiên bạn nên có để tránh sai sót (ví dụ có nhiều hơn 1 abstract method chẳng hạn).

Functional interface còn được gọi là **SAM type** (Single abstract method) vì đúng theo trên định nghĩa của nó.

## 2. Tại sao phải dùng Functional interface?

Với một số language như JavaScript, các function là first-class citizen, nghĩa là function là số 1, function có các "khả năng cấp cao" như làm đối số function khác, làm giá trị trả về, hàm lồng trong hàm khác,...

Do đó, hàm trong JavaScript rất linh hoạt, hỗ trợ rất tốt cho functional programming.

Quay lại với Java, thì method trong Java không linh hoạt như vậy, do Java xem class là first-class citizen chứ không phải function. Do đó, chúng ta không thể thực hiện các kĩ thuật nâng cao như JavaScript, điển hình là truyền function vào function khác (rất phổ biến trong functional programming).

```js
function printResult(calculate) {
    console.log('Result is', calculate())
}

printResult(function () {
    return 3.14
})
```

Cách viết như trên, Java không thực hiện được. Method trong Java không thể truyền vào method khác dưới dạng đối số. Do đó, team Java đã nghĩ ra một cách tiếp cận khác để giải quyết vấn đề này.

## 3. Dùng Functional interface để wrap method

Sở dĩ Java không làm được như JavaScript, cũng một phần bởi vì Java khá strict, mọi thứ phải rõ ràng, trong khi JavaScript dynamic hơn. Ví dụ một function A nhận function B làm đối số, Java cần biết:

* Function B trả về kiểu dữ liệu gì?
* Function B có các tham số như thế nào?

Đó là còn chưa kể mọi method của Java phải ở trong class nào đó. Trong khi đó JavaScript chả quan tâm, không cần khai báo kiểu function luôn. Thêm nữa số lượng đối số truyền vào không cần đầy đủ, với JavaScript vẫn chạy ok hết.

> Câu hỏi đặt ra là làm sao để vừa cho phép truyền function vào function, vừa giữ được tính chặt chẽ cho code.
> 
> Team Java đã quyết định sử dụng thứ gọi là Functional interface làm khuôn mẫu cho function, và kèm thêm các cách implementation phù hợp cho nó.

Hãy xem xét code Java sau, có thể thực hiện được việc truyền method (chỗ `@Override`) vào trong method `printResult`.

```java
// Định nghĩa khuôn mẫu cho method truyền vô
@FunctionalInterface
interface Calculable {
    double calculate();
}
...
// Có thể gọi được method trong khuôn mẫu
public void printResult(Calculable func) {
    System.out.println("Result: " + func.calculate());
}
...
// Method thực sự truyền vào, được wrap vô trong khuôn mẫu
printResult(new Calculable() {
    @Override
    public double calculate() {
        return 3.14;
    }
})
```

Hơi dài dòng, nhưng khá dễ hiểu. Method nhận cần biết về "hình dạng" của method truyền vào để gọi cho đúng, và method truyền vào cần có "hình dạng" khớp với method kia. Và cái "hình dạng" đó chính là abstract method trong functional interface.

> Thay vì truyền trực tiếp function B vào function A, thì phải "gói" function B vào một object (có dạng của functional interface).
>
> Sau đó mới truyền object đó vào cho function A. Function A chỉ cần lấy ra và sử dụng thôi.

Đó là cách giúp cho Java thực hiện truyền method vào method khác. Hiểu được nguyên lý hoạt động này thì những kiến thức tiếp theo sẽ đơn giản hơn rất nhiều.

Và cũng nên phân biệt rạch ròi giữa functional interface (hình dạng method) và implementation của nó (code của method thực sự). Hình dạng được chỉ định bởi functional interface, nhưng implementation của nó có thể thực hiện bằng nhiều cách (tạo anonymous class như trên, dùng class riêng biệt, dùng lambda expression, method reference).

---

Bạn có thể thắc mắc, vậy dùng interface thường được không? Tại sao phải dùng functional interface, hay interface chỉ có mỗi một abstract method? Câu trả lời sẽ có trong bài tiếp theo nhé.

Như mọi khi, bài viết cũng được đăng trên blog cá nhân của mình https://tonghoangvu.hashnode.dev/hieu-hon-ve-functional-interface-trong-java.