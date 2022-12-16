Nguồn: https://medium.com/blablacar-tech/rxswift-mvvm-66827b8b3f10

Bài này mình chỉ viết về cách tiếp cận thứ nhất.
## ViewModels
Một vài quy tắc quan trọng của ViewModel:
- Nó có thể được sử dụng bởi bất kỳ View nào, tức là View là owns của ViewModel, View biết về ViewModel nhưng ViewModel không biết về View, bản thân ViewModel không chứa View, chỉ hoàn toàn là logic thôi.
- Một trong những lợi ích lớn nhất của MVVM là làm cho business logic là testable.
- MVVM mạnh mẽ với cơ chế "binding", MVVM + RxSwift là một sự kết hợp tuyệt vời: ViewModel cho phép hiển thị các thuộc tính Observable<T>, cái mà có thể bind trực tiếp trong View controller của bạn, điều này làm việc bind model data tới UI trở nên dễ dàng.

Xem hình bên dưới:
    
![](https://images.viblo.asia/80b813f7-f1f3-4226-88ff-2181abac62ce.jpg)

 ViewModel như một cái blackbox, nhận đầu vào Input (là các event từ View), xử lý và cho ra đầu ra Output, viewmodel không chứa view mà chỉ hoàn toàn là logic. 
    
Do đó mình viết một protocol đơn giản thể hiện rằng bất kỳ ViewModel nào cũng có Input và Output:
    
```
protocol ViewModelType {
  associatedtype Input
  associatedtype Output
}
```
    
## Cách tiếp cận:  without Subjects
    
Như mình đã nói trước đó, ViewModel nhận đầu vào Input và xử lý cho ra đầu ra Output, thêm hàm xử lý vào protocol ViewModelType:
    
```
protocol ViewModelType {
  associatedtype Input
  associatedtype Output
  
  func transform(_ input: Input) -> Output
}
```
    
Bây giờ mình sẽ làm ví dụ đơn giản sử dụng pattern này: có 1 textField, 1 button và 1 label. Người dùng nhập text vào textField, sau đó nhấn vào button sẽ hiển thị lời chào lên label.
   ![](https://images.viblo.asia/50dc37e8-f8a2-4c34-adb6-b0d872e20b17.jpg)
Trong ví dụ này, Input sẽ là text người dùng nhập ở textField và action người dùng click vào button "Validate", Output sẽ là lời chào để hiển thị lên label:
 
```
final class SayHelloViewModel: ViewModelType {
  struct Input {
    let name: Observable<String>
    let validate: Observable<Void>
  }

  struct Output {
    let greeting: Driver<String>
  }

  func transform(_ input: Input) -> Output {
    let greeting = input.validate
      .withLatestFrom(input.name)
      .map { name in
        return "Hello \(name)"
      }
      .startWith("")
      .asDriver(onErrorJustReturn: ":-(")

    return Output(greeting: greeting)
  }
}
```
    
Sau khi click vào button "Validate", dùng cái *input.validate.withLatestFrom* để lấy ra giá trị cuối cùng của textField, và dùng *.map {name in return "Hello \(name)"}* để tạo chuỗi "Hello \(name)".
    
 Bây giờ, hãy xem cách ViewController sử dụng ViewModel này:
    
```
final class SayHelloViewController: UIViewController {
  
  @IBOutlet weak var nameTextField: UITextField!
  @IBOutlet weak var validateButton: UIButton!
  @IBOutlet weak var greetingLabel: UILabel!
  
  private let viewModel = SayHelloViewModel()
  private let bag = DisposeBag()
  
  override func viewDidLoad() {
    super.viewDidLoad()
    bindViewModel()
  }
  
  private func bindViewModel() {
    let inputs = SayHelloViewModel.Input(name: nameTextField.rx.text.orEmpty.asObservable(),
                                         validate: validateButton.rx.tap.asObservable())
    let outputs = viewModel.transform(inputs)
    outputs.greeting
      .drive(greetingLabel.rx.text)
      .disposed(by: bag)
  }
}
```
    
Bây giờ bạn hãy build và xem kết quả nhé:
    
![](https://images.viblo.asia/19a517e8-32e1-483c-b08f-fbf9dadb4416.jpg)