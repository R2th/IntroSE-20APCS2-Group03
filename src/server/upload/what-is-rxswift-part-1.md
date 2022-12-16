Reactive Programming  đã xuất hiện được gần 20 năm, nhưng thực sự chỉ thu hút được sự chú ý trong những năm gần đây. Để lập trình Reactive được sử dụng trên nhiều nền tảng, các tiện ích mở rộng đã được phát triển trên các ngôn ngữ lập trình phổ biến nhất. Tiền tố Rx (như đã thấy trong RxSwift) có nghĩa là  Reactive Extension. Điều quan trọng cần biết về Reactive Extension là cách tiếp cận cơ bản hoàn toàn giống nhau đối với tất cả các ngôn ngữ. Điều này thật tuyệt vì nhiều lý do, nhưng ba điều lập tức xuất hiện trong đầu là:

```
- Bạn có thể có một phương pháp lập trình reactive bằng cách sử dụng nền tảng và ngôn ngữ gốc của bạn.
- Bạn có thể dễ dàng cộng tác trên các ngôn ngữ và nền tảng.
- Khi bạn học lập trình reactive trong một ngôn ngữ, bạn có thể trực tiếp chuyển kiến thức đó sang bất kỳ ngôn ngữ nào khác có Reactive Extension(Rx)
```

### What is it?

```
Reactive programming là một cách tiếp cận liên quan đến các chuỗi dữ liệu không đồng bộ. 
Đó là, các chuỗi có thể quan sát được của các yếu tố emit các sự kiện cho các observers.
```

Trong phần tiếp theo, chúng tôi sẽ bố trí các giai đoạn để creating và observing một chuỗi và sau đó giải thích các thuật ngữ và khái niệm quan trọng cho từng giai đoạn.

### Observable sequence

Hãy tạo 1 đoạn code cơ bản có thể observable sequence  và sau đó đi qua một lời giải thích cho từng bước:

```swift
import RxSwift

let observableSequence = Observable.of("One", "Two", "Three", "Four")

let disposeBag = DisposeBag()

let subscription = observableSquence.subscribe({ (event: Event<String>) in
                print(event)
            })

subscription.disposed(by: disposeBag)

//will print: next(One), next(Two), next(Three), next(Four), completed

```


### Explanation

#####  1. Tạo một chuỗi các yếu tố (line 3)

Trong lập trình Reactive, bạn sử dụng các toán tử, nhưng bạn thực sự nên nghĩ về chúng như một tên khác cho các phương thức. Ở đây, chúng tôi đang tạo một chuỗi loại <String> có thể quan sát bằng cách sử dụng toán tử .of. Như bạn có thể đoán, điều này có nghĩa là chúng ta có bốn phần tử chuỗi có trong chuỗi của chúng ta và trình tự này có thể quan sát được. Nói cách khác, các đối tượng có thể subscribe để nhận các event từ sequence.
    
> Toán tử  .of cho phép bạn tạo chuỗi từ một kiểu biến đổi được suy ra. Bạn cũng có thể sử dụng: .just để tạo một chuỗi phần tử đơn hoặc .from tạo một chuỗi từ một mảng.
 
    
  
    
##### 2. Tạo một dispose bag (line 5)
 Khi subscribe một observable, Disposable giữ một tham chiếu đến observable và observable này giữ strong reference đến Disposable (Rx tạo ra một loại retain cycle). Nhờ vậy, khi user quay lại màn hình trước đó, observable sẽ không bị giải phóng cho đến khi ta muốn giải phóng nó.
 Về cơ bản, dispose bag chứa bất kỳ số lượng đối tượng phù hợp với Disposable protocol. Trong phương pháp deinit của nó, dispose bag đi qua từng vật thể dùng một lần và remove chúng khỏi bộ nhớ.
##### 3. Subscribe to the sequence (line 7–9)
 Khi bạn sử dụng phương thức .subscribe, bạn đang đăng ký một trình xử lý sự kiện cho observable sequence. Trong closure, bạn chỉ định cách bạn muốn xử lý các sự kiện khác nhau được phát theo sequence. Trong trường hợp này, bất kể loại sự kiện, chúng tôi đang in sự kiện đến console. Bạn có thể thấy đầu ra là:
    
    next(One), next(Two), next(Three), next(Four), completed
    
 Sự kiện chỉ đơn giản là một enum với ba trường hợp
    
 **next(Element)**  - Khi sequence lặp qua một phần tử, nó sẽ gửi sự kiện tiếp theo, với phần tử là giá trị liên quan
    
 **error(Swift.Error)** - Khi chuỗi gặp lỗi, nó có thể gửi sự kiện lỗi với loại lỗi dưới dạng giá trị liên quan và chấm dứt chuỗi.
    
   **Completed** - Khi chuỗi đã kết thúc lặp lại trên mọi phần tử thông thường, nó sẽ phát ra sự kiện completed.
    
    
### Further Simplification
    
Như bạn có thể thấy, trong rất ít dòng bạn có thể thiết lập một chuỗi có thể quan sát được, đăng ký chuỗi đó với một trình xử lý sự kiện và loại bỏ đăng ký khi bạn hoàn thành. Điều đáng chú ý là cú pháp có thể được đơn giản hóa từ ví dụ trên vì nhiều toán tử trả về một loại cho phép bạn xâu chuỗi toán tử tiếp theo của mình. Đây là ví dụ ở trên với các toán tử xích:
    
 ```swift
import RxSwift

let disposeBag = DisposeBag()

Observable.of("One", "Two", "Three", "Four")

.subscribe({
  print($0)
})

.disposed(by: disposeBag)

//will print: next(One), next(Two), next(Three), next(Four), completed
    
  ```
    
Ở phần 2 chúng ta sẽ tìm hiểu và làm việc với Subjects trong RxSwift.
    
Referent from Source: [Link](https://medium.com/swift2go/rxswift-made-easy-part-1-primer-2278aa7d66bc)