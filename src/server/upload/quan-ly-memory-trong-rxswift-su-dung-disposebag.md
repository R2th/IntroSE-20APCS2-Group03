Chắc hẳn bạn đã nghe đến/sử dụng DisposeBag khi làm việc với RxSwift, nó không phải là một chuẩn trong iOS development cũng như những implementation khác của Rx. Cơ bản, đó là cách RxSwift xử lý việc quản lý memory trên nền tảng iOS.

Bài viết này sẽ giới thiệu kiến thức cơ bản về DisposeBag, Disposable và quản lý memory với RxSwift, làm sao để tránh memory leak khi sử dụng RxSwift.

### Observable và quản lý memory

Khi ta cần sử dụng một thư viện để xử lý asynchronous event, ta cần chú ý một số điều vì iOS có tính tham chiếu. 

**Huỷ hay không huỷ?**

Giả sử ta có một Observable đại diện cho một lời gọi REST API. Khi gọi subscribe, nó gởi một request lên server và đợi phản hồi. Ví dụ ta subscribe nó trong hàm viewDidLoad của UIViewController. Tuy nhiên, user có thể quay lại màn hình trước đó. Với việc quản lý memory bình thường, khi quay lại màn hình trước, app sẽ giải phóng UIViewController và huỷ Observable vì ta đã mất tham chiếu từ UIViewController.

Vì vậy, request mà ta gởi đi trước đó sẽ không thể hoàn thành. Nhưng trong một số trường hợp, ta cần đợi cho đến khi nhận được response, bất kể người dùng có thoát khỏi màn hình đó hay không, thế nên developer phải quyết định được khi nào thì ngừng Observable.

### Memory là nguồn tài nguyên hữu hạn

Memory là nguồn tài nguyên hữu hạn, đặc biệt trên các thiết bị mobile. Observable có thể lưu trữ một số biến bên trong phần thực thi của nó hoặc nó có thể lưu trữ những giá trị được truyền vào.

Vì thế, observable có thể chiếm một phần bộ nhớ cho nhu cầu của nó. Mặt khác, một trong những bản tính của observable là sau khi nhận được event completed hoặc error, nó sẽ ngừng gởi events. Nếu observable ngừng gởi event, thì việc giữ resources bên trong không còn ý nghĩa nữa. Vậy nên, việc xoá và giải phóng bộ nhớ là điều cần thiết.

### Disposable 
Disposable là một protocol với một phương thức dispose:
```
public protocol Disposable {
    func dispose()
}
```

Khi subscribe một observable, Disposable giữ một tham chiếu đến observable và observable này giữ strong reference đến Disposable (Rx tạo ra một loại retain cycle). Nhờ vậy, khi user quay lại màn hình trước đó, observable sẽ không bị giải phóng cho đến khi ta muốn giải phóng nó.

Để phá retain cycle này, ta cần gọi dispose trên observable. Nếu observable tự kết thúc (khi complete hoặc error) nó sẽ tự động phá vỡ retain cycle này. Trong các trường hợp còn lại, trách nhiệm gọi đến function dispose thuộc về developer.

Cách dễ nhất để gọi dispose là bên trong function deinit:
```
final class ViewController: UIViewController {
    var subscription: Disposable?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        subscription = theObservable().subscribe(onNext: {
            // handle subscription
        })
    }
    
    deinit {
        subscription?.dispose()
    }
}
```

Giải pháp này rất đơn giản, tuy nhiên lại không được linh hoạt. Nếu ta có nhiều trường cần xử lý thì cách này khá manual. Để cải thiện vấn đề đó, ta có một mảng các disposable, và dùng vòng lặp để dispose các disposable này.

```
final class ViewController: UIViewController {
    var subscriptions = [Disposable]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        subscriptions.append(theObservable().subscribe(onNext: {
            // handle subscription
        }))
    }
    
    deinit {
        subscriptions.forEach { $0.dispose() }
    }
}
```

Trông có vẻ tốt hơn phiên bản cũ, nhưng nó vẫn chưa được tối ưu. Ta vẫn cần phải nhớ gọi dispose ở hàm deinit. DisposeBag là một giải pháp hay trong trường hợp này

```
final class ViewController: UIViewController {
    let disposeBag = DisposeBag()

    override func viewDidLoad() {
        super.viewDidLoad()
        theObservable().subscribe(onNext: {
                // handle subscription
        })
        .disposed(by: disposeBag)
    }
}
```

Vậy thì function deinit đã đi đâu? Một điều tuyệt vời của DisposeBag là nó sẽ chịu trách nhiệm cho việc gọi dispose trên mỗi disposable bên trong nó. Việc này sẽ được gọi khi bản thân DisposeBag bị deinit.

### DisposeBag và retain cycle

Việc gọi dispose khi deinit là cách đơn giản nhất để xoá bộ nhớ, tuy nhiên, nó chỉ làm việc nếu deinit được gọi. Với DisposeBag, retain cycle rất dễ xảy ra giữa Observables và UIViewController. DisposeBag sẽ đợi dealloc mãi mãi và không bao giờ dispose được những disposables của nó.

Ta cần ghi nhớ rằng, mỗi operator mặc định sẽ giữ một strong reference tới mỗi biến được sử dụng trong closure của nó.

```
let parsedObject = theObservable
    .map { json in
        return self.parser.parse(json)
    }
```

Trong ví dụ trên, theObservable giữ một trong reference tới self, vì self được sử dụng bên trong map. Những behavior này là cách Swift sử dụng reference counting để đảm bảo mọi thứ sẽ được cung cấp bộ nhớ khi cần đến.

Đoạn code trên không tạo ra retain cycle, tuy nhiên, không may là với một số thay đổi, retain cycle sẽ trở thành rắc rối thật sự:
```
final class ViewController: UIViewController {
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

Dòng code gây ra retain cycle là .disposed(by: disposeBag) và map operator. Việc add Disposable vào DisposableBag sẽ khiến DisposableBag tạo ra strong reference tới Disposable. Disposable lại giữ Observable tồn tại, Observable lại giữ strong reference tới ViewController bởi self được sử dụng bên trong map closure. Và cuối cùng, ViewController lại giữ một reference tới DisposableBag... Đến đây đã đủ đau đầu chưa nhỉ? 

### Làm cách nào để tránh retain cycle

Ta có thể sử dụng capture list để tránh việc tạo ra retain cycle, ta truyền vào một variable và bảo compiler cách thức xử lý biến này trong trường hợp tràn bộ nhớ. Thông thường ta hay sử dụng [weak self]:
```
let parsedObject = theObservable
    .map { [weak self] json in
        return self?.parser.parse(json) //compile-time error. What should be returned if `self` is nil?
    }
```

Tuy nhiên, nếu sử dụng [weak], ta cần báo cho compiler phải trả về giá trị gì nếu self bị nil. Trong trường hợp này, cách tốt nhất là truyền parser trong capture list thay vì dùng self:
```
let parsedObject = theObservable
    .map { [parser] json in
        return parser.parse(json)
    }
```

Swift cho phép ta truyền một biến vào capture list mà không cần bất cứ thuộc tính nào như weak hoặc unowned. Nếu làm như thế, compiler sẽ biết phải giữ reference cho duy nhất parse (với strong reference), chứ không phải cho self.

Một cách nữa là sử dụng [unowned self] thay cho [weak self].

Bây giờ ta đã biết rằng mọi operator giữ strong reference tới mọi variable bên trong closure của nó, kể cả self. Ta không nhất thiết phải tránh sử dụng self ở mọi nơi. Nếu ta có một class trả về một Observable, việc sử dụng self trong operator là chính đáng.

DisposeBag suy cho cùng cũng chỉ là một array chứa nhiều Disposable bên trong. Nó là một helper giúp dispose tất cả các disposable khi deinit. Nếu không ta sẽ phải khá vất vả khi tự xử lý việc này. Tuy nhiên việc sử dụng DisposeBag thỉnh thoảng sẽ dẫn đến memory leaks. Hãy nhớ rằng, mọi operator giữ strong reference tới dependencies sử dụng bên trong closure của nó. Nếu bản thân là self, nó vẫn giữ bởi Observable. Và kết quả là ta có một retain cycle. Tuy nhiên ta có thể tránh retain cycle nếu áp dụng các cách trên.