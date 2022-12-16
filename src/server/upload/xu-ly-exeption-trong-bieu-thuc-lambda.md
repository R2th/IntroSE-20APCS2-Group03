Bắt đầu từ Java 8, Java cung cấp biểu thức Lambda giúp cho code của java đơn giản, rút gọn hơn trước nhiều. Tuy nhiên, thư viện do JDK cung cấp không giải quyết tốt các ngoại lệ - Exception - và khiến cho source code  trở nên dài dòng và rườm rà khi xử lý chúng.

Trong bài này, chúng ta sẽ đề xuất cách để giải quyết exception khi viết biểu thức lambda.

Ví dụ bài toán gặp phải:

Chúng ta có một list integer từ 0 -> 10 và chúng ta muốn lấy ra kết quả của phép chia 10 và các số integer đó.
```
List<Integer> integers = IntStream.rangeClosed(0, 10)
    .boxed().collect(Collectors.toList());
integers.forEach(i -> System.out.println(10 / i));
```

Ở đây, ta gặp một vấn đề là khi i = 0, phép chia 10 / i sẽ ném ra exception ArithmeticException, phép toán không hợp lệ, ko chia được cho 0.

Chúng ta có thể xử lý vấn đề này bằng cách sử dụng try - catch trong biểu thức lambda:
```
integers.forEach(i -> {
    try {
        System.out.println(10 / i);
    } catch (ArithmeticException e) {
        throw new RuntimeException(e);
    }
});
```


Việc sử dụng try-catch có thể giải quyết vấn đề, nhưng sự đồng nhất và ngắn ngọn của một biểu thức Lambda bị mất đi, code trở lên dài hơn và gây nhiễu nội dung chính của biểu thức.

Để giải quyết vấn đề này, ta có thể sử dụng consumer wrapper thay thế cho việc dùng try -catch trong biểu thức lambda.

```
static Consumer<Integer> consumerWrapper(Consumer<Integer> consumer) {
    return i -> {
        try {
            consumer.accept(i);
        } catch (ArithmeticException e) {
            throw new RuntimeException(e);
        }
    };
}

....
integers.forEach(consumerWrapper(i -> System.out.println(10 / i)));
```

Tuy cách viết trên đã giải quyết được vấn đề làm giúp biểu thức lambda được biểu diễn trong sáng, rõ ràng hơn. Tuy nhiên source code của consumer wrapper lại chưa được tổng quát, Exception chưa được customize, chúng ta có thể cải tiến source code như bên dưới:

```
static <T, E extends Exception> Consumer<T>
  consumerWrapper(Consumer<T> consumer, Class<E> clazz) {
  
    return i -> {
        try {
            consumer.accept(i);
        } catch (Exception ex) {
            try {
                E exCast = clazz.cast(ex);
                throw new RuntimeException(e);
            } catch (ClassCastException ccEx) {
                throw ex;
            }
        }
    };
}

...
    integers.forEach(consumerWrapper(i -> System.out.println(10 / i), ArithmeticException.class));
```

Chúng ta cũng có thể áp dụng cách viết trên trong các biểu thức lambda khác để xử lý Exception. Không chỉ vs Consumer, chúng ta cũng có thể viết các lớp wrapper khác cho Function, BiFunction, BiConsumer ...
Hy vọng qua bài này sẽ cung cấp cho các bạn một ý tưởng xử lý ngoại lệ exception khi làm việc vs biểu thức lambda trong java.