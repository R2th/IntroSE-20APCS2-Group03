Khi bắt đầu viết ứng dụng theo phong cách reactive, sớm hay muốn thì dữ liệu output của bạn sẽ phụ thuộc nhiều hơn một **Observerable sequence**. ReactiveX cung cấp khá nhiều toán tử operator để kết hợp các Observable vào một sequence.

Bài viết này mô tả sự khác nhau giữa các toán tử như là **combineLatest**, **withLatestFrom**, **zip** và trong bối cảnh như nào thì nên sử dụng.

### 1. combineLatest
**combineLatest** là toán tử mà bạn sẽ muốn sử dụng khi giá trị nó phụ thuộc vào sự pha trộn các **Observerable** khác nhau. Ví dụ đơn giản nhất là **Observable** kiểu như là **isEnabled** nếu như button được set là **enable** hoặc **không**.

Lấy ví dụ tạo from **Login**. Một **email** của user phải được match với một [**regex**](https://viblo.asia/p/tim-hieu-ve-regex-phan-1-63vKjpVdl2R) (hiểu nôm na, regex được sử dụng để validate email các thứ) và độ dài của password phải có hơn 8 ký tự trở lên.


Chúng ta mong muốn button được set **enable** khi mà thoả mãn 2 yêu cầu trên. Cách làm phổ biến nhất trong trường hợp này là sử dụng **combineLastest**. Nó sẽ kết hợp các **Observable** và phát ra 1 **event** là kết quả của sự kết nối **value** cuối cùng của các **Observable**.

```
let isPasswordValid = passwordField.rx.text.orEmpty
    .map { $0.characters.count >= 8 }
    .distinctUntilChanged()
    
let isEmailVaild = emailField.rx.text.orEmpty
    .map(doesEmailMatchRegex)
    .distinctUntilChanged()
    
let isButtonEnabled = Observable.combineLatest(isPasswordValid, isEmailVaild) { $0 && $1 }    

isButtonEnabled.bind(to: button.rx.isEnabled)
    .disposed(by: disposeBag)
```

Giải thích một chút về { $0 && $1 } , là một **argument**, có tên là **resultSelector**, vai trò như một function. Nhiệm vụ của cái **resultSelector** là nó sẽ map một Observalbe tới event (kiểu tuble) vào event tiếp theo của operator. Thứ tự của **value** bên trong **resultSelector** tương tự như như thứ tự input vào **Observerable**.

(đùa, dịch chả hiểu gì luôn).
Viết kiểu closure rút gọn như trên đôi khi gây khó hiểu. $0 đại diện cho isPasswordValid, $1 đại diện cho isEmailVaild.
Kết quả là của phép $0 && $1 trả về cho isButtonEnabled.

Dạng tường minh là:
```
let isButtonEnabled = Observable.combineLatest(isPasswordValid, isEmailVaild) { (isPasswordValid, isEmailVaild) in 
  return isPasswordValid && isEmailVaild
} 
```

Giá trị **isButtonEnabled** sẽ phản ánh theo mô tả của y/cầu business. Bất cứ khi nào các value **isEmailVaild** hay **isPasswordValid** thay đổi trạng thái, **isButtonEnabled** sẽ được cập nhật trạng thái.

![](https://images.viblo.asia/809ab99c-b8d7-4f82-a443-62964d0fd51b.png)

Điều cần ghi nhớ ở đây là, **combineLatest** sẽ chỉ gửi **event** đầu tiên chỉ khi tất cả các **input** của **Observable** đã từng gửi **value**.

Giờ thử tìm hiểu trường hợp khác, ví dụ như là chúng ta từng phải xử lý xác thực  cho việc cấp quyền (validation for credential). Chúng ta muốn gưỉ một login request khi tap vào button.
Cách phổ biến là thực hiện đọc giá trị hiện thời của **email**, **password** trước khi thực hiện send request:
```
signInButton.rx.tap
    .flatMap { [weak self] in
        guard let `self` = self else { return .empty() }
        let credential = Credential(email: self.emailField.text, password: self.passwordField.text)
        return self.loginUseCase.login(using: credential)
    }
    .subscribe()
    .disposed(by: disposeBag)
```

Có vẻ cách tiếp cận này ko phải là tốt nhất. Nó không thực sự **reactive**, và bắt buộc phải sử dụng [weak self] ( để tránh bị retain cycle).
Nếu sử dụng **combineLatest** thì sẽ như nào nhỉ? Có nên sử dụng hay không và sử dụng như thế nào?
Ý tưởng sẽ là sử dụng **combineLatest** từ 3 **Observable**: trạng thái **tap** của button, value của **email**, value của **password**.

```
let doLogin = Observable.combineLatest(button.rx.tap, emailField.rx.text.orEmpty, passwordField.rx.text.orEmpty) { ($1, $2) }

doLogin
    .map(Credential.init)
    .flatMap(loginUseCase.login)
    .subscribe()
    .disposed(by: disposeBag)
```

Có vẻ tốt hơn, nhưng lưu ý là, **combineLatest** không nên, hoặc tránh sử dụng cho nhiều loại type hoặc feature ko đồng nhất.

**combineLatest** sẽ gửi **event** next bất cứ khi nào bất kỳ **observable** trong nhóm đó phát ra event mới. Có nghĩa là, các sự kiện thay đổi value email, passwork có thể kích hoạt (trigger) loginUseCase.

Khi chúng ta lập trình theo phong cách reactive, chúng ta luôn phải suy nghĩ cái gì cần trigger cho action. Trong trường hợp này, liên quan đến action, chỉ có button chịu trách nhiệm. Có nghĩa là, bạn không nên sử dụng combineLatest với button.rx.tap bên trong.

### 2. withLatesttFrom
**withLatestFrom** là toán tử để giải quyết vấn đề trên. Nó lấy ra một Oservable như là một input và chuyển đổi một **trigger** vào **event** cuối cùng từ **input** của **Observable**.
Bây giờ chúng ta có thể lắng nghe "trạng thái" tap của button và transform chúng vào credential:
```
let credential = Observable.combineLatest(emailField.rx.text.orEmpty, passwordField.rx.text.orEmpty, resultSelector: Credential.init)

button.rx.tap
    .withLatestFrom(credential)
    .flatMap(loginUseCase.login)
    .subscribe()
    .disposed(by: disposeBag)
```

![](https://images.viblo.asia/12b58dcf-de87-4ad7-9537-c39a5e7a9f84.png)


**withLatestFrom** cũng phù hợp khi dùng với **UITableView**. Khi hiện thị item trên UITableView, chúng ta có tương tác với item trong row, thông qua indexPath:
```
let items: Observable<[Items]> //items displayed on UITableView. 
let selectedItem = tableView.rx.itemSelected
    .withLatestFrom(items) { (index, items) in
        return items[index]
    }
```
 
### 3. zip
Toán tử **zip** tương tự như **combineLatest**, tuy nhiên, **zip** luôn taọ theo từng cặp từ các event có cùng index. Nếu chúng ta có 2 Oservable, zip sẽ đợi event mới nhất cùng với Observable khác. 
Như mô tả ở biểu đồ dưới đây:

![](https://images.viblo.asia/ef6c9db9-0256-4010-8339-250d56d23946.png)

zip tỏ ra hiệu dụng khi chúng ta muốn thực thi 2 hoặc nhiều hơn API request song song nhưng bạn cần đợi tất cả phải hoàn thành.

### Tổng kết
- **combineLatest** được sử dụng để tính toán trạng thái của variable, kiểu như isEnabled các thứ
- sự khác nhau giữã **combineLatest** và **zip** là, zip ko lưu các phần tử gửi trước đó. Thậm chí, Observalbe A gửi event mới, zip vẫn đợi event mới từ Observable B (có nghĩa là event phải cùng index). 
Hiểu theo nghiã khác, trong một số bối cảnh, **combineLatest** sẽ lấy giá trị cuối cùng từ B.
- **withLatestFrom** được sử dụng trong trường hợp có trigger-action, theo dõi sự thay đổi trạng thái và có hành xử tương ứng.