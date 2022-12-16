Clean Swift là một mô hình dựa trên Clean Architecture của Uncle Bob viết ra nhằm ứng dụng và dự án iOS và Mac. Clean Swift Architecture không phải là một framework. Nó là một tập các template của Xcode để tạo ra các thành phần của Clean Architecture cho bạn. Điều này cũng đồng nghĩa với việc bạn có thể thoải mái tuỳ chỉnh những template này sao cho phù hợp nhất với bạn.

Trong dự án MVC, code của chúng ta được gói gọn trong các Model, View và Controller. Trong Clean Swift, cấu trúc dự án được xây dựng xung quanh Scenes(ngữ cảnh). Dưới đây là một ví dụ về scene. Nói theo cách khác, chúng ta sẽ tạo một tập các thành phần cấu tạo nên scene để làm việc cho controller.

* Models
* Router
* Worker
* Interactor
* Presenter
* Configurator

## Communication

Việc giao tiếp giữa các thành phần được thực hiện thông qua protocol. Trong mỗi thành phần sẽ chứa Input và Output protocol để sử dụng cho vệc nhận và truyền dữ liệu. 

![](https://images.viblo.asia/6c8dc54e-a382-4b42-ae0e-99525e3cf5ab.png)

## Models

Model sẽ là nơi để lưu trữ dữ liệu, lớp của nó sẽ liên hệ với những thành phần khác, như bạn có thể thấy trong Flow diagram. Nó sẽ là một struct và hầy như sẽ chứa Request, Response và ViewModel.

```
import UIKit

struct TestModel{
    struct Fetch {
        struct Request
        {
            var itemId = 0
            var keyword: String?
            var count: String?
        }
        struct Response
        {
            var testObj: Test?
            var isError: Bool
            var message: String?
        }
        struct ViewModel
        {
            var name: String?
            var date: String?
            var desc: String?
            var isError: Bool
            var message: String?
        }
    }
}
```

Với ví dụ này, hãy giả dụ rằng bạn đang làm việc với API trong scene này, bạn cần phải làm theo như sau.

* Request: các parameter dùng để cho việc request API
* Response: can thiệp vào response từ API và lưu dữ liệu cần thiết.
* ViewModel: tất cả những thứ bạn cần để hiển thị trên UI được lưu ở đây. 
## 
## Router

Đây là một thành phần rất đơn giản. Router sẽ đảm nhiệm việc luân chuyển và truyền dữ liệu giữa các viewcontroller.

```
import UIKit

protocol TestRouterInput {
    func showSomeVC()
}

class TestRouter: TestRouterInput
{
    weak var viewController: ViewController!
	
    func showSomeVC() {
        viewController.performSegue(withIdentifier: "someVC", sender: nil)
    }
        
    // MARK: - Communication
    func passDataToNextScene(segue: UIStoryboardSegue)
    {
        // NOTE: Teach the router which scenes it can communicate with
        
        if segue.identifier == "someOtherVC" {

        }
    }
}
```

## Worker

Worker sẽ đảm nhận việc gọi tất cả API/Core Data và tiếp nhận response của chúng. Response (trong Models) sẽ lấy dữ liệu cho Interactor.

```
typealias responseHandler = (_ response:TestModel.Fetch.Response) ->()

class TestWorker{
      
    func fetch(itemId:Int!, keyword:String!, count: String!, success:@escaping(responseHandler), fail:@escaping(responseHandler))
    {
        // NOTE: Do the work
        //call network etc.
          let manager = YourApiManager()
      
          manager.fetch(itemId: itemId, keyword: keyword, count: count, success: { (data) in
                  let test = Test(JSON: data)                                                              
                  success(TestModel.Fetch.Response(testObj: test, isError: false, message:nil))
             }) { (error, message) in
                  fail(TestModel.Fetch.Response(testObj: nil, isError: true, message: message))
           }
    }
}
```

## Interactor

Đây là thành phần trung gian giữu Worker và Presenter. Ở đây, nó sẽ trao đổi với ViewController nơi mà đã truyền tất cả các Request cần thiết cho Worker. Trước khi tiến hành công việc trong Worker, quá trình kiểm tra dữ liệu sẽ được xẩy ra ở đây để đảm bảo rằng dữ liệu gửi đi là chính xác. Nếu mọi thứ đều ổn, Worker sẽ trả về một response và Interactore sẽ truyền dữ liệu đó vào Presenter.

```
import UIKit

protocol TestInteractorInput
{
    func fetchItems(request: TestModel.Fetch.Request)
}

protocol TestInteractorOutput
{
    func presentFetchResults(response: TestModel.Fetch.Response);
}

class TestInteractor : TestInteractorInput
{

    var output: TestInteractorOutput!
    var worker: TestWorker!
  
    func fetchItems(request: LoginModel.Fetch.Request) {
        if request.itemId == nil || request.count == nil || request.keyword == nil {
            return output.presentFetchResults(response: TestModel.Fetch.Response(object: nil,isError: true, message: "Fields may not be empty."))
        }
        worker = TestWorker()
        worker.fetch(name: request.name, type: request.type, count: request.count, success: { (object) in
            self.output.presentFetchResults(response: TestModel.Fetch.Response(object: object, isError: false, message: nil))
        }) { (error, message) in
            self.output.presentFetchResults(response: TestModel.Fetch.Response(object: nil, isError: true, message: message))
        }
    }
}
```

## Presenter
Bây giờ chúng ta đã có Respnse từ Interactor, đến lúc để format nó vào trong ViewModel và truyền kết quả về ViewController. Presenter sẽ đảm nhiệm các logic liên quan đến việc trình bày. Thành phần này sẽ quyết định dữ liệu sẽ được trình bày lên như thế nào cho người dùng. 

```
import UIKit

protocol TestPresenterInput
{
    func presentFetchResults(response: TestModel.Fetch.Response);
}

protocol TestPresenterOutput: class
{
    func successFetchedItems(viewModel: TestModel.Fetch.ViewModel)
    func errorFetchingItems(viewModel: TestModel.Fetch.ViewModel)
}

class TestPresenter: TestPresenterInput {
    
    weak var output: TestPresenterOutput!
    
    // MARK: - Presentation logic
    func presentFetchResults(response: TestModel.Fetch.Response) {
        // NOTE: Format the response from the Interactor and pass the result back to the View Controller
        let viewModel = TestModel.Fetch.ViewModel(name: response.testObj?.name, date: response.testObj?.date, desc: response.testObj?.desc, isError: response.isError, message: response.message)
        
        if viewModel.isError{
            if let output = self.output {
                output.errorFetchingItems(viewModel: viewModel)
            }
        }else{
            if let output = self.output {
                output.successFetchedItems(viewModel: viewModel)
            }
        }
    }
}
```

## Configurator
Thành phần này có một nhiệm vụ khởi tạo tất cả những thành phần trên và nối chúng vào với nhau.

```
import UIKit

// MARK: - Connect View, Interactor, and Presenter
extension ViewController: TestPresenterOutput
{
    override func prepare(for segue: UIStoryboardSegue, sender: Any?)
    {
        router.passDataToNextScene(segue: segue)
    }
}

extension TestInteractor: ViewControllerOutput
{
    
}

extension TestPresenter: TestInteractorOutput
{
    
}

class TestConfigurator {
    // MARK: - Object lifecycle
    
    static let sharedInstance = TestConfigurator()
    
    private init() {}
    
    // MARK: - Configuration
    
    func configure(viewController: ViewController)
    {
        let router = TestRouter()
        router.viewController = viewController
        
        let presenter = TestPresenter()
        presenter.output = viewController
        
        let interactor = TestInteractor()
        interactor.output = presenter
        
        viewController.output = interactor
        viewController.router = router
    }

}
```

## ViewController
Tất cả các thành phần đã xong. Đây là bước cuối cùng, và nó chỉ làm công việc đưa tất cả các thành phần trên vào guồng hoạt động.

```
import UIKit

protocol ViewControllerInput
{

}

protocol ViewControllerOutput
{
    func fetchItems(request: TestModel.Fetch.Request)
}

class ViewController: UIViewController, ViewControllerInput {

    var output: ViewControllerOutput!
    var router: TestRouter!
    
    // MARK: - Object lifecycle
    
    override func awakeFromNib()
    {
        super.awakeFromNib()
        TestConfigurator.sharedInstance.configure(viewController: self)
    }

    override func viewDidLoad(){
        super.viewDidLoad()
        output.fetchItems(request: TestModel.Fetch.Request(itemId: 23, keyword: "bbb", count: "3"))
    }

    func successFetchedItems(viewModel: TestModel.Fetch.ViewModel) {
        print(viewModel.name)
        print(viewModel.date)
    }
    
    func errorFetchingItems(viewModel: TestModel.Fetch.ViewModel) {
        print(viewModel.message)
    }
}
```

Tôi mong rằng bài hướng dẫn này sẽ có ích cho các bạn, giúp các bạn hiểu được về Clean Swift. Cảm ơn các bạn đã đón xem.

Ref: https://hackernoon.com/introducing-clean-swift-architecture-vip-770a639ad7bf