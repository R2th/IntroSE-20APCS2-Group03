### 1. Publishers
Điều đầu tiên bạn cần hiểu là mọi thứ trong Combine đều là Publishers, hoặc là operates, hoặc đăng ký các giá trị do Publishers phát ra.

Arrays, Strings or Dictionaries có thể được chuyển đổi thành Publishers trong Combine.
Có thể lấy một ví dụ đơn giản như sau.

```
let helloPublisher = "Hello Combine".publisher()
let fibonacciPublisher = [0,1,1,2,3,5].publisher()
let dictPublisher = [1:"Hello",2:"World"].publisher()
```

Bạn đăng ký với các *publishers* bằng cách gọi
*sink(receiveValue: (value -> Void))*
Block được thông qua sẽ nhận được tất cả các giá trị được phát ra bởi *publishers* đó.

```
let fibonacciPublisher = [0,1,1,2,3,5].publisher()
_ = fibonacciPublisher.sink { value in
    print(value)
}

OUTPUT: 
0 1 1 2 3 5
```

Publishers có thể phát ra 0 hoặc nhiều giá trị trong suốt cuộc đời của chúng.
Bên cạnh các giá trị cơ bản, Publishers của bạn cũng phát ra các giá trị đặc biệt được đại diện bởi  **Subscribers.Completion** enum

* .finished sẽ được phát ra nếu đăng ký kết thúc
* .failure (_) sẽ được phát ra nếu có sự cố

Giá trị liên quan cho trường hợp thất bại có thể là Object, Error hoặc **Never** object chỉ ra rằng **Publishers** không bao giờ phát sinh lỗi.


```
let fibonacciPublisher = [0,1,1,2,3,5].publisher()
_ = fibonacciPublisher.sink(receiveCompletion: { completion in
    switch completion {
        case .finished:
            print("finished")
        case .failure(let never):
            print(never)
    }
}, receiveValue: { value in
    print(value)
})

OUTPUT:
0 1 1 2 3 5
finished
```

Nếu bạn muốn huỷ bỏ một đăng ký thì bạn có thể gọi **cancel()** trên đăng ký đó.

```
let subscriber = fibonacciPublisher.sink { value in
    print(value)
}
subscriber.cancel()
```


### 2. Subjects 


**Subjects** là một món quà từ Publisher, bạn có thể đăng ký và tự thêm các element cho nó. Có 2 loại **Subjects** trong Combine.

*  **PassthroughSubject**: Nếu bạn đăng ký nó, bạn sẽ nhận được tất cả các sự kiện sẽ xảy ra sau khi bạn đăng ký.
*   **CurrentValueSubject**:  Sẽ cung cấp cho bất kỳ người đăng ký nào yếu tố gần đây nhất và mọi thứ được phát ra theo trình tự đó sau khi đăng ký xảy ra.

**PassthroughSubject**

Điều đầu tiên chúng ta cần làm là tạo một instance **PassthroughSubject** thực tế.  Điều này là siêu dễ dàng, chúng ta có thể sử dụng trình khởi tạo mặc định cho điều đó.

```
let passthroughObject = PassthroughObject<String,Error>()
```

Bạn có thể thêm mới element bằng cách sử dụng operator  **send(input: String)** . Nếu bạn muốn hoàn thành và kết thúc chuỗi đó, bạn gọi **send(completion:.finished)**

Trong khi đó với **send(completion:someError)** sẽ tiến hành thêm một error trong trường hợp lỗi.

```
passthroughObject.send("Hello")
passthroughObject.send("World")
```

Nếu bạn đăng ký sau khi thêm các element vào subject, bạn sẽ không nhận được các giá trị đó. Bạn chỉ thực sự nhận được giá trị khi bạn đăng ký vào Subject trước khi bắt đầu thêm các element.

```
let passThroughSubject = PassthroughSubject<String, Error>()
passThroughSubject.send("Hello")
passThroughSubject.send("World")
passThroughSubject.sink(receiveValue: { value in
    print(value)
})

OUTPUT:
NO OUTPUT
```


**CurrentValueSubject**

Khác với một *PassthroughSubject*, *CurrentValueSubject* sẽ nhận được "World"- String, đây là giá trị gần đây nhất.
Vì vậy, nó hoạt động nhiều hơn một chút giống như một biến thực tế.


```
let subject = CurrentValueSubject<String, Error>("Initial Value")
subject.send("Hello")
subject.send("World")currentValueSubject.sink(receiveValue: { value in
    print(value)
})

OUTPUT:
World
```

Nếu bạn đọc đến thời điểm này, thì bạn đã biết những điều cơ bản nhất trong **Combine**. Có rất nhiều thứ để tìm hiểu, nhưng mọi thứ đều dựa trên các nguyên tắc đơn giản này.

Chúc các bạn thành công với **Combine**. Bài viết được tham khảo từ [đây](https://medium.com/ios-os-x-development/learn-master-%EF%B8%8F-the-basics-of-combine-in-5-minutes-639421268219)