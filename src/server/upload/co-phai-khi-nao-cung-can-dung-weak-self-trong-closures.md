![](https://images.viblo.asia/a80136aa-7363-4a00-9581-2479d82b3a9d.png)

Đối với một lập trình viên iOS, không ai là chưa nghe tới memory leak, retain cycle,.. đều là các vấn đề liên quan tới thất thoát bộ nhớ.
Và không thể không nói tới `[weak self]` là một phương pháp để tránh việc điều này xảy ra. 
## 1. Automatic Reference Counting.
Bộ nhớ trong Swift được quản lí theo cơ chế ARC, nó hoạt động theo cơ chế tính số lượng reference đến vùng nhớ. 

Nó sẽ được giải phóng khi không có đối tượng nào tham chiếu đến nó. 
Vì thế trong một số trường hợp bạn không giải phóng được do vẫn có strong reference đến nó vì thế bạn nên tìm hiểu cách sử dụng `[weak self]`

Một số phương pháp để kiểm tra memory leak:

* Kiểm tra trong hàm deinit() khi ViewController bị đóng.
* Quan sát mức độ bộ nhớ tăng dần
* Sử dụng tool Allocations Instruments

## 2. Unowned, weak và Strong - weak
Closues có thể strong capture bất cứ biến hay hằng số trong context mà nó được định nghĩa. Ví dụ bạn sử dụng self trong closures thì nó sẽ được duy trì trong suốt vòng đời của scope đó. Và nếu self vẫn giữ strong reference sẽ dẫn đến strong reference cycle. 

Chính vì thế bạn cần sử dụng `[weak self]` hoặc `[unowned self]` để tránh điều đó. Tuy nhiên nên cẩn thận khi sử dụng unowned, nếu object đó nil thì app sẽ bị crash. 

Ví dụ:
```swift
let changeColorToRed = DispatchWorkItem { [weak self] in
    guard let self = self else { return }
    self.view.backgroundColor = .red
}
```
## 3. Escaping và non-escaping closures

Trong Swift có hai loại closures là escaping và non-escaping.  
* Non-escaping closures thực thi code trong scope của nó một cách tức thì và không có khả năng lưu trữ hay sử dụng sau đó. 
* Escaping closures thì có thể lưu trữ nó vào 1 biến hoặc 1 closure khác và có thể thực thi nó trong tương lai.

Chính vì thế non-escaping như higher order function và không gây ra reference cycle nên sẽ không yêu cầu sử dụng weak hay unowned.
Còn với escaping có thể gây ra reference cyclé khi không sử dụng weak hoặc unowned. Tuy nhiên chỉ khi nó đảm bảo 2 điều sau:

* Closures được lưu trữ vào 1 biến hoặc 1 closures khác.
* Có sử dụng self để tham chiếu trong closure .

Biểu đồ dưới đây sẽ giúp bạn thấy được khi nào thì cần dùng `[weak self]`
![](https://images.viblo.asia/b0e23cf1-504b-4f6f-8c2e-2c8238c0e0e0.png)

## 4. Delay deallocation
Trong biểu đồ trên bạn có thể thấy đề cập đến delay deallocation. Đây là 1 side effect mà cả escaping và non-escaping có thể xảy ra. 

Nó không phải nguyên nhân trực tiếp dẫn đến memory leak, nhưng nó sẽ gây ra một vài điều không mong muốn. Ví dụ khi VC bị dismiss nhưng closure vẫn đang bị block thì VC sẽ không được deinit ngay lúc đó.

Hãy cùng phân tích với ví dụ dưới đây

```swift
func delayedAllocAsyncCall() {
    let url = URL(string: "https://www.google.com:81")!

    let sessionConfig = URLSessionConfiguration.default
    sessionConfig.timeoutIntervalForRequest = 999.0
    sessionConfig.timeoutIntervalForResource = 999.0
    let session = URLSession(configuration: sessionConfig)

    let task = session.downloadTask(with: url) { localURL, _, error in
        guard let localURL = localURL else { return }
        let contents = (try? String(contentsOf: localURL)) ?? "No contents"
        print(contents)
        print(self.view.description)
    }
    task.resume()
}
```

Trong đoạn code trên có 1 closure và không dùng đến `weak self` hay `unowned self` và closure cũng không được lưu trữ lại, thực hiện ngay lập tức. Thế nên trường hợp này sẽ không gây ra memory leak. 

Tuy nhiên với task download sẽ mất thời gian, nên trong khi task đó thực hiện mà ViewController bị huỷ thì nó sẽ không được giải phóng ngay mà cần đợi task đó hoàn thành. -> Gây ra sự delay không mong muốn. Vì vậy bạn có thể dùng `weak self` để tránh điều này xảy ra.

## 5. ‘guard let self = self’ vs Optional Chaining
Khi sử dụng `[weak self]` là chúng ta đã tạo 1 biến optional thế nên khi sử dụng chúng ta cần unwrap hoặc sử dụng optional chaining. Ở đây chúng ta sẽ nói đến cách unwrap bằng guard let.

Nếu như trong closure có một task tốn thời gian và có thể sinh ra delay dealloc thì việc sử dụng guard let ngay từ đầu cũng không thể tránh được điều đó. Nhu ví dụ sau: 

```swift
func process(image: UIImage, completion: @escaping (UIImage?) -> Void) {
    DispatchQueue.global(qos: .userInteractive).async { [weak self] in
        guard let self = self else { return }
        // perform expensive sequential work on the image
        let rotated = self.rotate(image: image)
        let cropped = self.crop(image: rotated)
        let scaled = self.scale(image: cropped)
        let processedImage = self.filter(image: scaled)
        completion(processedImage)
    }
}
```
Việc sử dụng `guard let` là chúng ta so sánh self với nil, nếu không nil thì chúng ta sẽ tạo ra một strong reference để sử dụng trong scope -> nguyên nhân có thể gây ra delay deallocation.

Còn với việc sử dụng optional chaining sẽ như sau:

``` swift 
func process(image: UIImage, completion: @escaping (UIImage?) -> Void) {
  DispatchQueue.global(qos: .userInteractive).async { [weak self] in 
      // perform expensive sequential work on the image
      let rotated = self?.rotate(image: image)
      let cropped = self?.crop(image: rotated)
      let scaled = self?.scale(image: cropped)
      let processedImage = self?.filter(image: scaled)
      completion(processedImage)
  }
}
```

Với việc dùng optional chaining thì chúng ta sẽ so sánh self với nil ở từng dòng lệnh, nếu nil sẽ bỏ qua và không tạo ra strong reference ở đây. 

## 6. Một số ví dụ
### 6.1 Grand Central Dispatch
GCD thường không gây ra reference cycles nếu như nó không được lưu trữ để dùng sau đó.  Ví dụ sau không gây ra memory leak bởi vì nó thực hiện ngay lập tức:
```swift
func nonLeakyDispatchQueue() {
    DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
        self.view.backgroundColor = .red
    }

    DispatchQueue.main.async {
        self.view.backgroundColor = .red
    }

    DispatchQueue.global(qos: .background).async {
        print(self.navigationItem.description)
    }
}
```
Tuy nhiên nếu bạn lưu trữ GCD vào 1 biến như sau thì sẽ gây ra leak: 
``` swift
func leakyDispatchQueue() {
    let workItem = DispatchWorkItem { self.view.backgroundColor = .red }
    DispatchQueue.main.asyncAfter(deadline: .now() + 1.0, execute: workItem)
    self.workItem = workItem // stored in a property
}
```


### 6.2 UIView.Animate and UIViewPropertyAnimator
Tương tự như GCD nó cũng không gây ra memory leak nếu không lưu trữ nó vào thuộc tính.

Trường hợp an toàn:
```swift
func animteToRed() {
    UIView.animate(withDuration: 3.0) { 
        self.view.backgroundColor = .red 
    }
}
```

``` swift
func setupAnimation() {
    let anim = UIViewPropertyAnimator(duration: 2.0, curve: .linear) { 
        self.view.backgroundColor = .red 
    }
    anim.addCompletion { _ in 
        self.view.backgroundColor = .white 
    }
    anim.startAnimation()
}
```

Trường hợp gây ra menory leak:
```swift
func setupAnimation() {
    let anim = UIViewPropertyAnimator(duration: 2.0, curve: .linear) {
        self.view.backgroundColor = .red
    }
    anim.addCompletion { _ in
        self.view.backgroundColor = .white
    }
    self.animationStorage = anim
}
```

### 6.3 Lưu trữ closure trong property
Ví dụ trong ViewController1 có 1 closure và ViewController2 tham chiếu đến closure đó thì cần sử dụng đến `weak self`
```swift
class PresentedController: UIViewController {
  var closure: (() -> Void)?
}
```
Khi đó ViewController2 sẽ như sau:
```swift
class MainViewController: UIViewController {
  
  var presented = PresentedController()

  func setupClosure() {
     self.presented.closure = { [weak self] in 
         self?.printer() 
     }
  }

  func printer() {
    print(self.view.description) 
  }
}
```
## 7. Tổng kết
Qua đây chúng ta có thể rút ra một vài kết luận như sau:

* `[unowned self]` là một phương án không an toàn
* Non-escaping không cần `[weak self]` nếu như nó không gây ra delay dealloction
* Escaping closure yêu cầu  `[weak self]` nếu nó được lưu trữ hoặc passed vào closure khác và có tham chiếu self trong nó.
* GCD, aimation thường không cần  `[weak self]` nếu nó không được lưu trữ trong 1 biến để dùng sau đó.
* Nếu bạn không chắc chắn thì hãy nghĩ tới deinit và Instruments.

### Tài liệu tham khảo
https://medium.com/flawless-app-stories/you-dont-always-need-weak-self-a778bec505ef