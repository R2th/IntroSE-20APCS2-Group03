Có nhiều cách để truyền dữ liệu hay callback giữa các màn hình với nhau, hôm nay mình sẽ cùng các bạn tìm hiểu 1 cách áp dụng với mô hình MVVM và sử dụng RxSwift. Đây là 1 trong những khái niệm mới nên mình hi vọng sẽ giúp ích cho các bạn.

# 1. Chuẩn bị
Đầu tiên, bạn mở Xcode và tạo 1 new project với tên:  PassingData 

![](https://images.viblo.asia/24f983c0-62b9-4636-9a08-3238ab5a3353.png)


Trước khi bắt đầu vào code, mình sẽ giới thiệu lại 1 số khái niệm sử dụng trong bài. 
Đầu tiên, RxSwift là gì? RxSwift là 1 phiên bản Reactive Extension được viết bằng ngôn ngữ Swift, ReactiveX là sự kết hợp từ Observer pattern, iterator pattern và functional programming. Nó giúp công việc được xử lý đơn giản hơn. Thay thế cho notifications - đối tượng khó test, ta có thể sử dụng signals. Thay cho delegates, ta dùng các block code và bỏ đi switches/ifs lồng nhau. Ta có thể sử dụng KVO, IBActions, filters, MVVM và còn nhiều tiện ích khác giúp tăng hiệu suất trong RxSwift.

Tiếp theo là **PublishSubject**, đây là 1 loại subject. Subject trong RxSwift hoạt động như vừa là **Observable** vừa là 1 **Observer**. Khi 1 **Subject** nhận 1 **.next** event thì ngay lập tức nó sẽ phát ra emit đó cho các **subcriber** của nó.  Với **PublishSubject**: Khởi đầu "empty" và chỉ emit các element mới cho subcriber của nó.

Phần cuối cùng là mô hình MVVM

![](https://images.viblo.asia/1b4e715d-5154-4ea9-890a-fd5457bfaa4d.jpg)

**View**: Tương tự như trong mô hình MVC, View là phần giao diện của ứng dụng để hiển thị dữ liệu và nhận tương tác của người dùng. Từ đó có thể phản hồi lại người dùng thông qua tính năng binding, command.

**Model**: Giống tương tự như trong mô hình MVC. Model là các đối tượng giúp truy xuất và thao tác trên dữ liệu thực sự.

**ViewModel**: Lớp trung gian giữa View và Model. ViewModel có thể được xem là thành phần thay thế cho Controller trong mô hình MVC. Nó chứa các mã lệnh cần thiết để thực hiện data binding, command.

**Data Binding**
Binding Data trong MVVM là điều không bắt buộc, một số implement chỉ đơn giản làm ViewModel như một lớp trung gian giữa Model-View, lớp này giữ nhiệm vụ format data hoặc mapping trạng thái của View. Tuy nhiên cách này theo mình khiến cho ViewModel trở thành Presenter và đưa kiến trúc này về MVP.

# 2. Coding

Đầu tiên, bạn chạy pod để sự dụng 1 số thư viện có liên quan như RxSwift, RxCocoa hay NSObject+Rx. Dùng terminal tới project của bạn, mở Pod và sửa thành như sau

```
platform :ios, '9.0'

def pods
    # Clean Architecture
    pod 'MGArchitecture', '0.3.2'
    pod 'MGAPIService', '0.3.1'
    pod 'MGLoadMore', '0.2.1'
    
    # Core
    pod 'ObjectMapper', '3.3'
    pod 'Reusable', '4.0.4'
    pod 'Then', '2.4'
    pod 'MJRefresh', '3.1'
    pod 'Validator', '3.0.2'
    
    # Rx
    pod 'NSObject+Rx', '4.3'
    pod 'RxDataSources', '3.0'
    pod 'RxViewController'
end

target 'PassingData' do
    use_frameworks!
    inhibit_all_warnings!
    pods    
end
```

Lưu lại và chạy pod install, đến đây pod sẽ tự tải và chạy thư viện cho project của bạn. Bạn chỉ việc chờ thôi. Lưu ý: Sau khi chạy pod xong, bạn vào project của bạn bằng file **PassingData.xcworkspace** nhé
 
Tiếp theo. bạn tạo 1 file mới, chọn swift file, và đặt tên là Student. Đây sẽ là thành phần Model của chúng ta.

![](https://images.viblo.asia/9784779e-bbe3-4b06-b16f-a0b4211074b0.png)

Tạo 1 class tên Student, chứa 2 thuộc tính, id kiểu Int và name kiểu String. Và khởi tạo các thuộc tính.

```
import Foundation

struct Student {
    var score: Int
    var name: String
}

extension Student {
    init() {
        self.init(
            score: 0,
            name: "")
    }
}
```

Tiếp theo, chúng ta sẽ tạo 2 viewcontroller, nơi sẽ chuyển đổi dữ liệu với nhau. Tạo 2 file viewcontroller, đặt tên là **Transmit** và **CallBack2**. Vì là mô hình MVVM nên chúng ta sẽ tạo thêm các thành phần còn lại cho viewcontroller như UseCase, Navigator, ViewModel. Bạn có thể tạo tự động bằng tool [iGen](https://pypi.org/project/igen/).

![](https://images.viblo.asia/797e6716-19e7-45a7-956f-22486346906b.png)

Ở mỗi viewcontroller, có đoạn code dưới để binder giữa viewmodel và controller

```
func bindViewModel() {
        let input = ViewController2ViewModel.Input()
        let output = viewModel.transform(input)
    }
```


Ngoài ra chúng ta tạo thêm 1 file Assembler để tiện quản lý. Tạo file tên Assembler và thêm đoạn code như sau
```
import Foundation
protocol Assembler: class,
    TransmitAssembler,
    CallBackAssembler
{}

final class DefaultAssembler: Assembler {
}
```

Ở mỗi ViewController chúng ta tạo 1 button để thực hiện action chuyển data giữa các màn hình, màn hình **Transmit** thì là nút **Next**, còn **CallBack** là nút **Back**. Ngoài ra mỗi màn hình có thêm 1 text field để thể hiện tên của học sinh và cũng là để người dùng thấy được sự thay đổi. Sửa trong storyboard như hình dưới đây:

![](https://images.viblo.asia/641be5cf-ba46-4f03-ba87-d7d037c25ec1.png)

**Quan trọng:**
Bước này mình sẽ giải thích qua cơ chế chuyển và thay đổi dữ liệu giữa các màn hình trong mô hình này.
Ở màn hình Transmit, chúng ta sẽ truyền cho CallBack 1 student, làm dữ liệu ban đầu. Tại CallBack chúng ta sẽ sử dụng biến Student đấy, ngoài ra, ở màn hình này chúng ta không thay đổi trực tiếp cũng như truyền lại màn hình Transmit biến này, mà thông qua 1 PublishSubject có thể emit ra Student. Vậy là ở CallBack chúng ta có thêm 2 thành phần, 1 biến student - dùng làm dữ liệu gốc, 1 biến publish subject để bắn sự kiện thay đổi student khi xác nhận thay đổi.

Mở file CallBackViewModel, thêm 2 biến như sau:
```
struct CallBackViewModel {
    let navigator: CallBackNavigatorType
    let useCase: CallBackUseCaseType
    
    let studentSubject: PublishSubject<Student>
    let student: Student?
}
```

Vì CallBackViewModel thay đổi, nên chúng ta cùng thay đổi trong Assembler, vào file CallBackAssembler và sửa như sau:
```
protocol CallBackAssembler {
    func resolve(navigationController: UINavigationController, studentSubject: PublishSubject<Student>, student: Student?) -> CallBackViewController
    func resolve(navigationController: UINavigationController, studentSubject: PublishSubject<Student>, student: Student?) -> CallBackViewModel
    func resolve(navigationController: UINavigationController) -> CallBackNavigatorType
    func resolve() -> CallBackUseCaseType
}

extension CallBackAssembler {
    func resolve(navigationController: UINavigationController, studentSubject: PublishSubject<Student>, student: Student?) -> CallBackViewController {
        let vc = CallBackViewController.instantiate()
        let vm: CallBackViewModel = resolve(navigationController: navigationController,
                                            studentSubject: studentSubject,
                                            student: student)
        vc.bindViewModel(to: vm)
        return vc
    }

    func resolve(navigationController: UINavigationController, studentSubject: PublishSubject<Student>, student: Student?) -> CallBackViewModel {
        return CallBackViewModel(
            navigator: resolve(navigationController: navigationController),
            useCase: resolve(),
            studentSubject: studentSubject,
            student: student)
        )
    }
}
```

Để chuyển màn hình ta cần navigator để định hướng tới màn hình CallBack, vào TransmitNavigator và thêm func **toCallBack**, ở đây sẽ có return trả về, là biến student sau khi thay đổi:

```
    func toCallBack(student: Student) -> Driver<Student> {
        let studentSubject = PublishSubject<Student>()
        let vc: ChooseDeviceViewController = assembler.resolve(navigationController: navigationController,
                                                               studentSubject: studentSubject,
                                                               student: student)
        return studentSubject.asDriverOnErrorJustComplete()
    }
```

Cơ chế thay đổi ở đây gần giống như delegate. Hãy dừng lại ở đây 1 chút và ngẫm nghĩ về nó nhé.

Tiếp theo vào TransmitViewModel, setup các input và output. 
```
extension TransmitViewModel: ViewModelType {
    struct Input {
        let transmitTrigger: Driver<Student>
    }

    struct Output {
        let transmit: Driver<Student>
    }

    func transform(_ input: Input) -> Output {
        let transmit = input.transmitTrigger
            .flatMapLatest { student in
               self.navigator.toCallBack(student: student)
            }
            
        return Output()
    }
}
```

Tiếp đến, vào file TransmitViewController. Tạo 1 đối tượng student, đặt tên à Nam và điểm số là 8. Và tạo 1 subject để onNext sự kiện transmit 

```
var nam = Student(scorce: 8, name: "Nam")
let transmitTrigger = PublishSubject<Student>()
```

Từ Storyboard, kéo action touch inside button Transmit vào viewcontroller, tại đây ta sẽ emit sự kiện bằng subject vừa tạo bên trên
```
 @IBAction func transmitInvoker(_ sender: Any) {
        transmitTrigger.onNext(student)
    }
```

Vậy là bạn đã hoàn thành được 1 nửa chặng đường rồi đấy, bạn đã chuyển được dữ liệu từ màn hình transmit sang callback, và có 1 delegate để bắn sự kiện trở lại transmit. Khá tuyệt đó chứ.
Giờ đến phần còn lại chúng ta sẽ bắn sự kiện trở lại transmit bằng viewmodel của CallBack nhé.

Vào CallBackViewModel, cài đặt input và output, để nhận được sự kiện score textfiled thay đổi:
```
extension CallBackViewModel: ViewModelType {
    struct Input {
        let scoreTrigger: Driver<String>
    }

    struct Output {
        let callBack: Driver<Void>
    }

    func transform(_ input: Input) -> Output {
        let callBack = input.scoreTrigger
            .do(onNext: { score in
                let student = Student(scorce: score, name: self.student?.name)
                self.studentSubject.onNext(student)
                self.studentSubject.onCompleted
            })
            .mapToVoid()
        
        return Output(callBack: callBack)
    }
}
```


Tiếp đến kéo outlet scoreTextField vào để bắt sự kiện mỗi khi textfield thay đổi, và nhớ hoàn thiện viewmodel trong ViewController nữa nhé
```
func bindViewModel() {
        let input = CallBackViewModel.Input(scoreTextField.rx.text.orEmpty.asDriver())
        let output = viewModel.transform(input)
        
        output.callBack
            .drive()
            .disposed(by: rx.disposeBag)
    }
```

Giờ hãy chạy thử và xem như thế nào nhé, khá ổn, bạn đã thấy student được bắn trả lại, nhưng không thấy sự thay đổi trên UI. Bởi vì chúng ta chưa load lại màn hình với dữ liệu mới.
Vào TransmitViewController, chúng ta thêm Binder cho sự kiện thay đổi.
```
extension TransmitViewController {
    var callBackBinder: Binder<Student> {
          return Binder(self) { viewController, student in
            viewController.scoreTextField = student.score
    }
}
```

Công việc cuối cùng là cho output sử dụng binder này, rất dễ phải không
```
func bindViewModel() {
        let input = TransmitViewModel.Input(transmitTrigger: transmitTrigger.asDriverOnErrorJustComplete())
        let output = viewModel.transform(input)
        
        output.loading
            .drive(callBackBinder)
            .disposed(by: rx.disposeBag)
    }
```

Vậy là đã xong bài hướng dẫn cơ bản về việc chuyển và callback dữ liệu với RxSwift và mô hình MVVM, hi vọng bài hướng dẫn này sẽ hữu ích với các bạn