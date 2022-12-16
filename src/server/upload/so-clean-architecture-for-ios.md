Trong những năm qua, ngành công nghiệp `phần mềm di động` đã phát triển với một tốc độ chóng mặt. Trước đây các ứng dụng di động chủ yếu là nhỏ và thường chứa ít màn hình. Trong khi bây giờ có rất nhiều ứng dụng khổng lồ, với giao diện người dùng và `business logic` rất phức tạp.

Đối với các ứng dụng phức tạp thì mô hình `MVC` truyền thống bộc lộ nhiều khuyết điểm như: `View` và `Controller` có mối quan hệ chặt chẽ với nhau đến mức mà phần Model gần như bị tách biệt làm cho việc Testing rất khó khăn, ViewController phình to vì chưa cả logic bussiness lẫn logic view làm cho việc đọc hiểu code để bảo trì và mở rộng rất khó khăn... `Clean Architecture` đã ra đời để giải quyết các vấn đề trên bằng việc phân tách rõ ràng các module dựa trên các nhiệm vụ riêng biệt.
![](https://images.viblo.asia/0af3f7a0-d852-4985-b99e-39dd0065fb22.jpg)

#### Clean Architecture
`Clean Architecture` được giới thiệu bởi Robert C. Martin (a.k.a. Chú Bob) và nhận được sự quan tâm lớn của các developer. `Clean Architecture` là một business architecture, nó tách rời những xử lý nghiệp vụ khỏi UI và framework, phân rõ vai trò và trách nhiệm của từng layer trong kiến trúc của mình.

#### The Anatomy of the Clean Architecture
Có rất nhiều biến thể của `Clean Architecture`, trong iOS bạn có thể nghe nói về `VIPER` hoặc `CleanSwift`. Khi nhảy sang các nền tảng khác như `.NET` hay `Android` thậm chí còn có nhiều biến thể hơn. Tuy nhiên các biến thể đều có nhiệm vụ như nhau là **tách rời những xử lý nghiệp vụ khỏi UI và framework** và tuân thủ theo các qui tắc của ``Clean Architecture``.

Dưới đây là danh sách các thành phần trong kiến trúc:

* **View**: Giao diện hiển thị nơi xảy ra tương tác giữa app và người dùng,  như Storyboard hoặc XIB.
* **Controller**: Nhận các hành động hoặc event từ view và update nó.
* **Interactor**: Lớp logic nghiệp vụ nơi **Controller**  gửi các yêu cầu.
* **Presenter**: Nhận phản hổi từ Interactor để gửi lại cho Controller.
* **Router**: Có nhiệm vụ điều hướng các ViewController.

Phần cốt lõi của kiến trúc là **Controller**, **Interactor**, và **Presenter**. Một điều quan trọng cần lưu ý đây là kiến trúc `unidirectional Data Flow` tức là dữ liệu sẽ di chuyển theo 1 luồng xác định, điều này làm giảm đáng kể sự phức tạp, dễ dàng để quản lý.

![](https://images.viblo.asia/7ef7db2b-2ac0-4343-b885-500052a2f69a.png)

Cách hoạt động:

1. Người dùng tương tác với **View**
2. **Controller** nhận sự kiện từ **View** để gửi đến **Interactor**.
3. **Interactor** thực hiện các logic business và trả về kết quả cho **Presenter**
4. **Presenter** format lại dữ liệu sau đó gửi lại về cho **Controller** thông qua **viewModel**
5. **Controller** nhận dữ liệu từ **Presenter** sau đó update lại view.

#### Practice
Chúng ta định nghĩa các use-case cho từng layer tương ứng

```swift
protocol ListProductsDisplayable: class { // View Controller
    func displayFetchedProducts(with viewModel: ListProductsModels.ViewModel)
    func display(error: AppModels.Error)
}
 
protocol ListProductsBusinessLogic { // Interactor
    func fetchProducts(with request: ListProductsModels.FetchRequest)
}
 
protocol ListProductsPresentable { // Presenter
    func presentFetchedProducts(for response: ListProductsModels.Response)
    func presentFetchedProducts(error: DataError)
}
 
protocol ListProductsRoutable: AppRoutable { // Router
    func showProduct(for id: Int)
}
```
Đây là flow xảy ra tại **viewDidload** `interactor.fetchProducts > presenter.presentFetchedProducts > controller.displayFetchedProducts. `

*Controller* :
```swift
class ListProductsViewController: UIViewController {
 
    private lazy var interactor: ListProductsBusinessLogic = ListProductsInteractor(
        presenter: ListProductsPresenter(viewController: self),
        productsWorker: ProductsWorker(store: ProductsMemoryStore())
    )
    
    private lazy var router: ListProductsRoutable = ListProductsRouter(
        viewController: self
    )
 
    private var viewModel: ListProductsModels.ViewModel?
 
    override func viewDidLoad() {
        super.viewDidLoad()
 
        interactor.fetchProducts(
            with: ListProductsModels.FetchRequest()
        )
    }
}

extension ListProductsViewController: ListProductsDisplayable {
    
    func displayFetchedProducts(with viewModel: ListProductsModels.ViewModel) {
        self.viewModel = viewModel
        tableView.reloadData()
    }    
 
    func display(error: AppModels.Error) {
        let alertController = UIAlertController(
            title: error.title,
            message: error.message,
            preferredStyle: .alert
        )
        
        alertController.addAction(
            UIAlertAction(title: "OK", style: .default, handler: nil)
        )
        
        present(alertController, animated: true, completion: nil)
    }
}
 
extension ListProductsViewController: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        guard let model = viewModel?.products[indexPath.row] else { return }
        router.showProduct(for: model.id)
    }
}
```
**Controller** tạo một router và  một instances đến **Interactor** thông qua 1 presenter. Gọi **Interactor** ở `viewDidload` để fetch list product.

```swift
struct ListProductsInteractor {
    private let presenter: ListProductsPresentable
    private let productsWorker: ProductsWorkerType
    
    init(presenter: ListProductsPresentable, productsWorker: ProductsWorkerType) {
        self.presenter = presenter
        self.productsWorker = productsWorker
    }
}
 
extension ListProductsInteractor: ListProductsBusinessLogic {
    func fetchProducts(with request: ListProductsModels.FetchRequest) {
        productsWorker.fetch {
            guard let value = $0.value, $0.isSuccess else {
                return self.presenter.presentFetchedProducts(error: $0.error ?? .unknownReason(nil))
            }
            
            self.presenter.presentFetchedProducts(
                for: ListProductsModels.Response(products: value)
            )
        }
    }
}
``` 
Inject 1 `productsWorker` ở Interactor để xử lý API.

```swift
struct ListProductsPresenter: ListProductsPresentable {
    private weak var viewController: ListProductsDisplayable?
    private let currencyFormatter: NumberFormatter
    
    init(viewController: ListProductsDisplayable?) {
        self.viewController = viewController
        self.currencyFormatter = NumberFormatter()
        self.currencyFormatter.numberStyle = .currency
    }
}
 
extension ListProductsPresenter {
    
    func presentFetchedProducts(for response: ListProductsModels.Response) {
        let viewModel = ListProductsModels.ViewModel(
            products: response.products.map {
                ListProductsModels.ProductViewModel(
                    id: $0.id,
                    name: $0.name,
                    content: $0.content,
                    price: currencyFormatter.string(from: NSNumber(value: Float($0.priceCents) / 100)) ?? "\($0.priceCents / 100)"
                )
            }
        )
        
        viewController?.displayFetchedProducts(with: viewModel)
    }
    
    func presentFetchedProducts(error: DataError) {
        // Handle and parse error
        let viewModel = AppModels.Error(
            title: NSLocalizedString("products.error.title", "Title for product error"),
            message: String(format: NSLocalizedString("products.error.message", "Message for product error"), error)
        )
        
        viewController?.display(error: viewModel)
    }
}
```

`Presenter` sẽ làm nhiệm vụ format lại dữ liệu respone và gọi controller để hiện thị lên `View`

Các `Model` được gói gọn trong một enum và chỉ liên quan đến trường hợp sử dụng riêng của nó.

```swift
enum ListProductsModels {
    
    struct FetchRequest {
        
    }
    
    struct SearchRequest {
        let text: String
    }
    
    struct Response {
        let products: [ProductType]
    }
    
    struct ViewModel {
        let products: [ProductViewModel]
    }
    
    struct ProductViewModel {
        let id: Int
        let name: String
        let content: String
        let price: String
    }
}
```

Cuối cùng `Router` chịu trách nhiệm điều khiển các luồng đi của ứng dụng:
```swift
struct ListProductsRouter {
    weak var viewController: UIViewController?
    
    init(viewController: UIViewController?) {
        self.viewController = viewController
    }
}
 
extension ListProductsRouter: ListProductsRoutable {
    
    func showProduct(for id: Int) {
        let storyboard = UIStoryboard(name: "ShowProduct", bundle: nil)
        
        guard let controller = storyboard.instantiateInitialViewController()) as? ShowProductViewController
            else { return assertionFailure("Invalid controller for storyboard \(storyboard).") }
 
        controller.productID = id
 
        viewController?.present(controller, animated: true)
    }
}
```

`router.showProduct(for: productID)`

#### Conclusion
Clean architechture rất linh hoạt, dễ dàng bảo trì và mở rộng.Mặc dù nó dài dòng hơn các kiến trúc khác,  nhưng nó là cần thiết để làm giảm sự phụ thuộc giứa các layer trong ứng dụng.

Link tham khảo: https://basememara.com/swift-clean-architecture/