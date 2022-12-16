Xin chào các bạn, bài viết hôm nay mình sẽ viết về 2 operator thường hay sử dụng khi code RxSwift là **combineLatest** và **withLatestFrom**. Mình rất hay nhầm lẫn giữa 2 operator này vì chúng cứ na ná nhau :D, bài viết này mình sẽ chỉ rõ chúng khác nhau như thế nào, và cách sử dụng chúng nhé.

Mình sẽ tạo 1 màn hình Login đơn giản bao gồm form nhập email, form nhập password, và button login (ban đầu sẽ bị disable) như sau: 
![](https://images.viblo.asia/0038f731-d147-4409-9564-a2275012301e.png)

## 1. CombineLatest
CombineLatest đơn giản chỉ là gộp 2 hay nhiều obseverable lại và emit ra khi một trong các observerable nguồn có giá trị mới được cập nhật.

Đây là diagram để các bạn hiểu rõ hơn:
![](https://images.viblo.asia/c3cb8249-a656-4485-8c5a-83c86f15a656.png)

Mình giải thích 1 chút cái diagram này nhé: 
- 2 cái mũi tên ngang đầu tiên là 2 observerable nguồn, khi dùng operator combineLatest thì tạo ra 1 observerable là cái mũi tên dưới cùng.
- mỗi khi có sự kiện mới từ 1 trong 2 observerable nguồn thì chúng ta sẽ nhận được giá trị mới nhất từ các nguồn được gộp lại.

Mình sẽ example ở màn hình Login vừa tạo nha: lúc đầu button Login sẽ bị disable, nó được enable khi cả 2 form email và password đều được input
```
loginButton.backgroundColor = UIColor.lightGray
loginButton.isEnabled = false
        
let isEmailVaild = emailTextField.rx.text.orEmpty
    .map { $0.count >= 1 }
        
let isPasswordValid = passwordTextField.rx.text.orEmpty
    .map { $0.count >= 1 }

// isEmailVaild và isPasswordValid có kiểu Observerable<Bool>

Observable.combineLatest(isEmailVaild, isPasswordValid) {(isEmailVaild, isPasswordValid) in
    // mỗi khi input / edit email hoặc password đều sẽ nhảy vào đây và return true / false tương ứng
    return isEmailVaild && isPasswordValid
    }.subscribe(onNext: { (enable) in
        self.loginButton.backgroundColor = enable ? UIColor.blue : UIColor.lightGray
        self.loginButton.isEnabled = enable ? true : false
    }).disposed(by: disposeBag)
```

Kết quả như sau:
![](https://images.viblo.asia/4793416f-eaaa-45f2-9d69-4a451c7c17c3.gif)

Bây giờ, mình muốn khi button Login đã được enable, ấn vào button login sẽ thực hiện gửi bộ email và password này lên server. Như chúng ta biết bên trên, mỗi khi thay đổi giá trị input của email hoặc password thì đều phát ra event mới, điều này có nghĩa là nếu sử dụng combineLatest cho event login (ở ví dụ này là `loginButton.rx.tap` sẽ bị kích hoạt rất nhiều lần, đây là điều chúng ta không mong muốn, withLatestFrom sẽ giúp chúng ta giải quyết vấn đề này.

## 2. WithLatestFrom

Đây là diagram của withLatestFrom:
![](https://images.viblo.asia/b18f7d52-8145-468f-a49b-451a8bef006e.png)

Còn đây là example của mình, mục đích là khi ấn button login sẽ in ra giá trị được nhập của email và password (nối vào đoạn code bên trên nha):
```
let userInputs = Observable.combineLatest(emailTextField.rx.text.orEmpty, passwordTextField.rx.text.orEmpty) { (email, password) -> (String, String) in
    return (email, password)
}

loginButton.rx.tap.asObservable()
    .withLatestFrom(userInputs)
    .subscribe(onNext: { (email, password) in
        print("email: ", email)
        print("password: ", password)
    }).disposed(by: disposeBag)
```

Mình giải thích cái diagram kết hợp với đoạn code của mình:
- Mũi tên ngang thứ 1 là observerable biểu thị các lần click vào button Login nha, mũi tên ngang thứ 2 chính là giá trị của email và password.
- Việc sử dụng withLatestFrom thì tạo ra 1 observerable là cái mũi tên dưới cùng, nó chỉ phát ra tín hiệu (emit) khi nút Login được nhấn.
- Khi mà mình change email hoặc password thì nó vẫn chưa phát ra tín hiệu vì nút Login chưa được nhấn.

Rồi bây giờ mình cùng xem kết quả nha :D (chú ý vào chỗ log) :
![](https://images.viblo.asia/726fd167-2db1-4589-ae19-3a388744dc57.gif)


Hi vọng các bạn đã hiểu rõ 2 operator này, cảm ơn các bạn đã đọc bài viết <3