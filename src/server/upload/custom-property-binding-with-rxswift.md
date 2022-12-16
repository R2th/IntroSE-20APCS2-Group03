Khi mới bắt đầu học RxSwift , mình từng gặp source code  kiểu custom Property dùng Binder mình cũng không hiểu nó là gì , mình cũng thử tìm hiểu và hôm nay viết 1 bài để giới thiệu và cách dùng Binder trong Rx.
## 1. Custome property như thế nào ?

Khi bạn dùng RxCocoa binding, rất dễ dàng bind value của 1 Observable được emit tới các view trên màn hình
```
 var myObservalbe = PublishSubject<Void>()
  myObservalbe.map{ "new value is \($0)"}
            .bind(to: myLabel.rx.text).disposed(by: disposeBag)
```
Có bao giờ bạn tự hỏi **rx.text** là gì ?Bản thử nhấn phím Cmd + Click vào nó  bạn sẽ nhìn thấy source code như sau : 

```
/// Bindable sink for `text` property.
    public var text: Binder<String?> {
        return Binder(self.base) { label, text in
            label.text = text
        }
    }
```

Extenstion này thêm property **text** của struct Reactive  và thuộc tính này chỉ cho phép class UILabel sử dụng.

**text** nó là 1 kiểu Binder<String> nó đơn giản chỉ là 1 observer dùng để quan sát các value và xử lý nó theo cách mà mình mong muốn.
    
  Trong ví dụ trên  khi  myObservalbe.map{ "new value is \($0)"} bind cho thằng myLabel.rx.text thì thằng myLabel.rx.text nó sẽ lắng nghe các giá trị của thằng myObservalbe emit  và thực hiện : label.text = text.
    
 OK bây giờ mình thêm 1 ví dụ về customer property bằng cách dùng Binder.
    
##     2. Thêm Extension  Reactive  cho SwiftSpinner
  Bạn mở file Podfile và thêm đoạn code sau để cài đặt lib  : 
     `pod "SwiftSpinner"`
    
    Đầu tiền  bạn thêm đoạn code :
  
    `extension Reactive where Base: SwiftSpinner {
  
}`
    
   Điều này sẽ thêm property rx cho lớp  **SwiftSpinner** . Ta thêm property progress vào extension trên  và bind các giá trị được emit của Observable tới nó.
    `public var progress: UIBindingObserver<Base, Int> {

}`
    
   Cuối cùng bên trong block của property progress mình sẽ xử lý convert value từ 0 -> 100 và gọi hàm  SwiftSpinner.show(progress:title:) để hiển thị % completion trên màn hình :
    
    `public var progress: Binder<Int> {
        Binder.init(self.base) { (spinner, progress) in
            let progress = max(0, min(progress, 100))
            SwiftSpinner.show(progress: Double(progress)/100.0, title: "\(progress)% completed")
        }
    }
`
    OK thêm đoạn code sau để bắt đầu chạy : 
    
    override func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(animated)

     Observable<Int>.timer(0.0, period: 0.15, scheduler: MainScheduler.instance)
        .bind(to: SwiftSpinner.shared.rx.progress)
        .disposed(by: disposeBag)
    }
    
    
   ![](https://images.viblo.asia/18656612-7ed8-4dab-a2a5-124d01c13b3c.gif)
    
##     Tài liệu tham khảo 
    http://rx-marin.com/post/rxswift-custom-bindings/