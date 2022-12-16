**Chắc giờ hầu hết các dev iOS đều biết về RxSwift rồi nên bài viết này của mình không có hot. Nhưng mình đang cạn đề tài để viết rồi nên vẫn viết nó, hi vọng giúp được mấy bạn mới tiếp cận với RxSwift và bị khủng hoảng khi không biết lỗi ở đâu và debug như thế nào :smiley:.**

# 1. Debugging Compile Errors
## 1.1. Compile warning

### 1.1.1. Unused disposable (unused-disposable)

- Lỗi: "Result of call to 'bind(to:)' is unused" hay "Result of call to 'subscribe(onNext: onError: onCompleted: onDisposed:)' is unused" 

(là lỗi khi bạn dùng subscribe*, bind* hay drive* mà quên không thêm điều kiện dispose nó)
![](https://images.viblo.asia/ddfc0fc7-f67a-4e1d-b888-a0e845540960.png)

Lỗi này là do bạn chưa thêm điều kiện dispose cho nó, thường thì bạn thêm: .disposed(by: disposeBag) là được nhé. Ngoài ra bạn có thể tham khảo nhiều cách để disposing ở [đây](https://github.com/ReactiveX/RxSwift/blob/master/Documentation/GettingStarted.md#disposing).

Sửa thành:
![](https://images.viblo.asia/cb499571-cf43-4e80-9e71-4114b4b7823a.png)

Trong trường hợp nếu bài toán của bạn bắt buộc không được thêm điều kiện dispose cho observable thì bạn có thể dùng dấu gạch dưới nhé:
VD:
```
let xs: Observable<E> ....

_ = xs // <-- note the underscore. thế này nó sẽ éo warning nữa.
  .filter { ... }
  .map { ... }
  .switchLatest()
  .subscribe(onNext: {
    ...
  }, onError: {
    ...
  })
```

### 1.1.2. Unused observable sequence (unused-observable)

Chắc 1 số bạn cũng đã từng gặp phải lỗi như hình này:
![](https://images.viblo.asia/88b9000d-f753-44fc-9265-60097a250051.png)

Lỗi trong hình là bạn mới chỉ define 1 cái observable sequence chứ không làm gì cả. Để sửa bạn cần subcribe và dispose nó như hình dưới nhé:
![](https://images.viblo.asia/cfb92da9-b511-460c-8141-157c3dfd8fac.png)

## 1.2. Compile errors
### 1.2.1. Lỗi import thư viện

![](https://images.viblo.asia/b6ebed0e-d7f8-4501-bdf9-baabf8b26969.png)
- Khi bị mấy lỗi kiểu này thì bạn nên kiểm tra lại podfile (hoặc cartfile khi dùng carthage) xem có đúng format chưa.
- Kiểm tra xem RxSwift version bạn dùng có phù hợp với version của xcode không?
- Sau đó Clean + xoá Drive Data và build lại

Nếu vẫn bị lỗi thì bạn phải hỏi google tiếp thôi :rofl: 


### 1.2.2. Lỗi khi import thiếu thư viện
![](https://images.viblo.asia/7843e8bf-6765-4a71-a1b6-3e3c1f6f467d.png)

Lỗi trong hình là lỗi khi bạn thiếu library: **RxCocoa** nhé. Bạn add thêm nó vào và **import RxCocoa** là fix được.

### 1.2.3. Một số lỗi khác

- Lỗi **bind(to:)** nhầm kiểu dữ liệu: trường hợp này thì bạn phải kiểu tra kiểu dữ liệu của **ObservableType** và nơi nhận bind data xem có cùng kiểu dự liệu chưa? nếu chưa thì bạn phải dùng **.map{...}** để convert data về đúng kiểu dữ liệu nhận trước khi binding:
![](https://images.viblo.asia/5c0c46cb-87ca-4d11-a150-95aed40a542e.png)


- Lỗi **Extraneous argument label 'onNext:' in call** lỗi này thường gặp khi trong closure bên trong của nó có lỗi complie, bạn phải sửa lỗi bên trong xong là nó tự được. 
(notes: bạn có thể copy code bên trong ra ngoài tạm để sửa cho dễ, sau khi xong thì copy vào vì code trong đó lúc đó nó éo gợi ý đâu :v: )
![](https://images.viblo.asia/bd3f959e-7b51-4208-ad73-93beb4e645f0.png)


# 2. Debugging Runtime
## 2.1. Log debug
Bạn có thể dùng hàm "debug" của RxSwift để log ra tất cả các event của observable.
VD:
```
let subscription = myInterval(0.1)
    .debug("my probe")
    .map { e in
        return "This is simply \(e)"
    }
    .subscribe(onNext: { n in
        print(n)
    })

Thread.sleepForTimeInterval(0.5)

subscription.dispose()
```
Khi đó code sẽ tự động print ra:
```
[my probe] subscribed
Subscribed
[my probe] -> Event next(Box(0))
This is simply 0
[my probe] -> Event next(Box(1))
This is simply 1
[my probe] -> Event next(Box(2))
This is simply 2
[my probe] -> Event next(Box(3))
This is simply 3
[my probe] -> Event next(Box(4))
This is simply 4
[my probe] dispose
Disposed
```

Ngoài ra bạn có thể tự custom hàm debug của chính mình để có thể print ra theo ý muốn.
VD: Tạo 1 Observable mới có các event chuyển tiếp từ Observable gốc, và bạn có thể print tuỳ ý trong đó:
```
extension ObservableType {
    public func myDebug(identifier: String) -> Observable<Self.E> {
        return Observable.create { observer in
            print("----- subscribed \(identifier)")
            let subscription = self.subscribe { e in
                print("----- event \(identifier)  \(e)")
                switch e {
                case .next(let value):
                    observer.on(.next(value))

                case .error(let error):
                    observer.on(.error(error))

                case .completed:
                    observer.on(.completed)
                }
            }
            return Disposables.create {
                   print("----- disposing \(identifier)")
                   subscription.dispose()
            }
        }
    }
 }
```

## 2.2. Debugging memory leaks

Cách bước để debug memory là:

Bước 1: Bật debug mode
- Để bật debug mode bạn cần phải thêm *TRACERESOURCES* vào *Other Swift Flags* của *RxSwift*
    - với Cocoapod bạn thêm bằng cách sửa podfile như sau:
        ![](https://images.viblo.asia/03b3eae9-2dc4-4d53-8678-0e53ddb5d9ec.png)
    - với Carthage bạn cần build bằng lệnh sau:
        `carthage update --no-use-binaries --configuration Debug RxSwift`
        
Bước 2: Bật tracking resources:
Bạn có thể thêm code tracking resources vào appdelegate:
```
/* add somewhere in
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey : Any]? = nil)
    */
    _ = Observable<Int>.interval(1, scheduler: MainScheduler.instance)
        .subscribe(onNext: { _ in
            print("Resource count \(RxSwift.Resources.total)")
        })
```

Bước 3: Test memory leaks: 
Bạn vào màn hình cần kiểm tra, sau đó back lại. Cứ thao tác lặp lại vài lần. *Nếu thấy resource count tăng dần lên thì xin chúc mừng, bạn đã có memory leaks ahihi*. 
Để fix thì bạn phải soi lại code xem có Observable nào quên chưa Dispose hay dispose sai cách không? Nhân tiện kiểm tra xem có chỗ nào thiểu **[weak self]** không nữa nhé.

- navigate to your screen and use it
- navigate back
- observe initial resource count
- navigate second time to your screen and use it
- navigate back
- observe final resource count

# Kết luận
Qua bài viết mình đã hướng dẫn các bạn cách debug khi dùng RxSwift, hướng dẫn cách xử lý khi bạn gặp phải 1 số warning hay errors thường gặp.

Nếu bạn gặp vấn đề nào đó thì có thể comment vào nhé. (Mình không hứa sẽ fix được hết nhưng sẽ tìm cao nhân giúp cho :rofl: )

Tài liệu tham khảo: 
- [RxSwift blog](https://github.com/ReactiveX/RxSwift/blob/master/Documentation/GettingStarted.md#debugging)