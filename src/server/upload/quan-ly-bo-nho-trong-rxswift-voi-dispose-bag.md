Có rất nhiều người khi mới tiếp xúc với RxSwift sẽ đặt câu hỏi về Dispose Bag. Vậy Dispose Bag là gì?  Sử dụng chúng như thế nào? Chúng ta sẽ tìm hiểu trong bài viết này.
## Khái niệm 
Trước tiên, hãy nói về Disposable. Disposable không phải một khái niệm tiêu chuẩn trong lập trình iOS nói chung, nó được sử dụng trong RxSwift và là cách RxSwift quản lý bộ nhớ của mình. Bài viết này sẽ trả lời một số câu hỏi về Disposable cũng như cơ chế quản lý bộ nhớ ARC và cách tránh Memory Leak trong khi sử dụng Rx.

## Observable và việc quản lý bộ nhớ
RxSwift là một thư viện hỗ trợ chúng ta giải quyết các sự kiện bất đồng bộ, do đó, reference counting (tạm dịch là đếm liên kết, ai đã từng đọc về ARC trong iOS sẽ hiểu khái niệm này)  là việc chúng ta cần lưu tâm tới. Để hiểu hơn chúng ta hãy phân tích ví dụ bên dưới

Huỷ hay KHÔNG huỷ ? :thinking:
Thử tưởng tượng chúng ra đang có một Observable chịu trách nhiệm call API. Khi bạn gọi subcribe (thường đặt trong ViewDidLoad), nó sẽ gửi request tới server và đợi phản hồi. Đây là một trường hợp đơn giản và tiêu biểu, tuy nhiên hãy lưu ý, người dùng có thể back lại màn trước bất kì lúc nào. Với cơ chế quản lý bộ nhớ thông thường, khi back về màn trước đó, UIViewController hiện tại sẽ bị deallocate và cũng sẽ huỷ luôn Observable vì nó đã mất liên kết từ UIViewController. Và tất nhiên, request của chúng ta sẽ không thể hoàn thành trong trường hợp đó. Trong 1 số trường hợp, bạn muốn Observable sẽ tồn tại tới khi thực hiện xong request và nhận đc phản hồi, ngay cả khi người dùng đã back về màn trước. Do đó, lập trình viên nên được quyết định bao giờ thì Observable sẽ bị huỷ đi.

## Bộ nhớ là nguồn tài nguyên giới hạn
Observables có thể nắm giữ một số biến được truyền vào hoặc được khai báo khi định nghĩa chúng.
Điều đó có nghĩa Observable sẽ chỉ định một phần bộ nhớ để lưu trữ những giá trị đó.
Mặt khác, một tính chất của Observable là nó sẽ dừng gửi những events khi nhận một error hoặc completed. Khi đó, việc lưu trữ tài nguyên của Observable là không cần thiết, tốt nhất chúng ta nên giải phóng phần bộ nhớ mà Observable nắm giữ. Để làm được điều đó, chúng t cần có khả năng "clean" Observable khi có yêu cầu. Đó là lí do vì sao Subcribe Method sẽ luôn return Disposable

## Disposable 
Disposable là một protocol với 1 phương thức dispose()
![](https://images.viblo.asia/90dee911-8e6d-41a3-82a2-f7340c7ef14a.png)
Khi subcribe một Observable, Disposable sẽ giữ một liên kết mạnh tới Observable và Observable cũng nắm một liên kết mạnh trỏ ngược lại Disposable (Có thể hiểu đây là một kiểu retain cycle Rx tạo ra).  Nhờ đó mà nếu người dùng có back lại screen trước đó, Observable cũng sẽ không bị deallocated trừ khi bạn muốn nó deallocated.
Để phát vỡ kiểu retain cycle này, bạn phải gọi hàm dispose trong Observable. Nếu Observable tự kết thúc (emit ra completed hoặc error), nó sẽ tự động phát vỡ retain cycle. Còn ở các trường hợp khác, tránh nhiệm gọi hàm dispose là do chúng ta thực hiện.

Cách đơn giản nhất để gọi dispose trong hàm denit của ViewController
```swift
final class MainController: UIViewController {
    var subscription: Disposable?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        subscription = theObservable().subscribe(onNext: {
            // handle your subscription
        })
    }
    
    deinit {
        subscription?.dispose()
    }
}
```


Giải phát này đơn giản nhưng hãy thử tưởng tượng sẽ có bao dòng dispose() cần được thêm vào denit() khi bạn subcribe nhiều Observable. Việc mở rộng trở nên phức tạp hơn khi bạn phải thay đổi code ở nhiều chỗ
Để cải thiện điều đó, bạn có thể sử dụng tới mảng [Disposable]. Cách sử dụng như sau
```swift
final class MainController: UIViewController {
    var subscriptions = [Disposable]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        subscriptions.append(theObservable().subscribe(onNext: {
            print($0)
        }))
    }
    
    deinit {
        subscriptions.forEach { $0.dispose() }
    }
}
```


Trông đã ổn đã hơn rất nhiều, việc mở rộng cũng đơn giản hơn. Tuy nhiên chúng ta vẫn có thể cải thiện code hơn nữa. Chúng ta sẽ sử dụng DisposeBag thay vì [Disposable] 
```swift
final class MainController: UIViewController {
    let disposeBag = DisposeBag()

    override func viewDidLoad() {
        super.viewDidLoad()
        theObservable().subscribe(onNext: {
             // handle your subscription
        })
        .disposed(by: disposeBag)
    }
}
```



Chờ đã. Sao không phải viết gì trong denit nữa. Vậy khi nào nó sẽ gọi tới dispose ??? 
DisposedBag sẽ gọi tới dispose khi viewcontroller chứa nó được denit. DisposeBag sẽ huỷ liên kết từ UIViewController tới nó  => ARC = 0 và nó được dellocated đồng thời gọi tất cả các disposables. 

## DisposeBag và Retain Cycle
Với DisposedBag, nếu không cẩn thận bạn sẽ dễ tạo ra Retain Cycles giữa Observable và UIViewController. Khi đó, DisposeBag sẽ đợi để được dellocate mãi mãi và tất nhiên là không dispose đi bất kì disposables nào của nó.
Việc mà bạn cần lưu ý đó là với mỗi operator nó sẽ mặc định nắm giữ liên kết mạnh tới bất kì biến nào được sử dụng trong closure của nó. Xem ví dụ bên dưới để hiểu hơn nhé
```swift
final class MainController: UIViewController {
    private let disposeBag = DisposeBag()
    private let parser = MyModelParser()

    override func viewDidLoad() {
        super.viewDidLoad()
        
        let parsedObject = theObservable
            .map { json in
                return self.parser.parse(json)
            }
            
        parsedObject.subscribe(onNext:{ _ in 
            //do something
        })
        .disposed(by: disposeBag)
    }
}
```

Đoạn code trên đã gây ra Retain Cycles, lý do là bởi thêm Disposable vào DisposeBag có nghĩa là DisposeBag sẽ nắm giữ một liên kết mạnh tới Disposbale. Disposable giữ cho Observable tồn tại. Observable lại có một liên kết mạnh tới VIewController vì self được sử dụng bên trong map closure. Và cuối cùng ViewController lại có liên kết mạnh tới DisposeBag. BOOM!. Bạn đã có một retain cycle.

![](https://images.viblo.asia/9d643b00-22f9-4f76-ada1-7b035c089f75.png)

Để giải quyết hiện tượng đó, chúng ta có thể sử dụng Capture list hoặc [weak self] và [unowned self]. 1 vài thay đổi nhỏ có thể giải quyết vấn đề cuả bạn
```swift
let parsedObject = theObservable
    .map { [weak self] json in
        return self?.parser.parse(json) 
    }
```
## Sử dụng self != retain cycle
Không phải cứ sử dụng self chúng ta sẽ gây ra retain cycle mà chủ yếu thường xảy ra khi self cũng đồng thời nắm giữ DisposeBag

# Tổng kết
DisposeBag không phải một điều gì đó kì diệu mà đơn giản chỉ là một mảng có chứ nhiều Disposable bên trong. Nó giúp chúng ta tự động dispose các disposables mà không cần viết một cách thủ công. Tuy nhiên hãy chú ý tới hiện tượng Retain Cycle mà nó có thể gây ra.

Nguồn tham khảo: 
http://adamborek.com/memory-managment-rxswift/