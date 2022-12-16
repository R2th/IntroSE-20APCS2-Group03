# I. Giới thiệu:

-----


Ở phần trước, chúng ta đã tìm hiểu qua về **Clean Architecture** và **MVVM**.
Các bạn có thể xem lại bài viết trước [tại đây](https://viblo.asia/p/rxswift-clean-architecture-mvvm-va-rxswift-phan-1-gAm5yaR85db). Trong bài viết này, mình sẽ đưa ra một example đơn giản về Clean Architecture và MVVM.

# II. Demo:

-----


Trong ví dụ này, chúng ta sẽ sử dụng API public của github https://api.github.com/search/repositories

Các param sẽ sử dụng là:
- q: language:swift
- per_page: 10
- page: 1

**Source code demo:** https://github.com/tgdong2296/SimpleDemoCleanArchitecture

## 1. Domain:
Trong tầng **Domain**, chúng ta sẽ chứa những **Model** là các thành phần cơ bản của ứng dụng. Tất cả các **Model** nằm trong **Domain** đều không phụ thuộc vào bất cứ thành phần nào khác của ứng dụng.

```swift
import Foundation
import ObjectMapper

protocol BaseModel: Mappable {
    
}
```

```swift
import ObjectMapper
import Then

struct GithubRepo {
    var id = 0
    var name: String
    var fullname: String
    var urlString: String
    var starCount: Int
    var folkCount: Int
    var avatarURLString: String
}

extension GithubRepo {
    init() {
        self.init(
            id: 0,
            name: "",
            fullname: "",
            urlString: "",
            starCount: 0,
            folkCount: 0,
            avatarURLString: ""
        )
    }
}

extension GithubRepo: Then, Hashable {
    
}

extension GithubRepo: BaseModel {
    
    init?(map: Map) {
        self.init()
    }
    
    mutating func mapping(map: Map) {
        id <- map["id"]
        name <- map["name"]
        fullname <- map["full_name"]
        urlString <- map["html_url"]
        starCount <- map["stargazers_count"]
        folkCount <- map["forks"]
        avatarURLString <- map["owner.avatar_url"]
    }
}
```

## 2. Platform:
Tại **Platform** chúng ta sẽ tiến hành triển khai việc gọi **API** và tiếp nhận data thông qua một **Repository**. **Repository** sẽ chịu trách nhiệm thực hiện request tới server và tiếp nhận reponse được trả về từ server, sau đó bóc tách data trong response. `APIService` sẽ trả về một `Observable<GithubRepoResponse>` và chúng ta sẽ sử dụng operator `.map{ }` để bóc tách dữ liệu mà response trả về. Như vậy, mỗi khi request API thành công thì **Observable** sẽ onNext ra một element có kiểu dữ liệu là `[GithubRepo]`.

```swift
import Foundation
import ObjectMapper
import RxSwift

protocol GithubRepoRepositoryType {
    func getGithubRepos(input: GithubRepoRequest) -> Observable<[GithubRepo]>
}

class GithubRepoRepository: GithubRepoRepositoryType {
    private let api: APIService = APIService.share
    
    func getGithubRepos(input: GithubRepoRequest) -> Observable<[GithubRepo]> {
        return api.request(input: input)
            .map { (response: GithubRepoResponse) -> [GithubRepo] in
                return response.githubRepos
            }
    }
}
```

## 3. Application:
Đây là tầng mà chúng ta sẽ triển khai mô hình **MVVM**. Chúng ta sẽ coi các thành phần view nằm trong **StoryBoard** hoặc **Xib** và **ViewController** thuộc lớp **View** của mô hình **MVVM**.

### 3.1. ViewController
**ViewController** sẽ được adopt một **protocol** đó là `BindableType`. Tất cả các **UIViewController** khi adopt protocol này sẽ phải định nghĩa một property là `viewModel` chịu trách nhiệm lưu giữ instance của **ViewModel** trong **ViewController** và `func bindViewModel()` để thực hiện  **binding** dữ liệu.

```swift
import UIKit
import RxSwift

public protocol BindableType: class {
    associatedtype ViewModelType
    
    var viewModel: ViewModelType! { get set }
    
    func bindViewModel()
}

extension BindableType where Self: UIViewController {
    public func bindViewModel(to model: Self.ViewModelType) {
        viewModel = model
        loadViewIfNeeded()
        bindViewModel()
    }
}
```

```swift
import UIKit
import Foundation
import RxSwift
import RxCocoa
import Then
import NSObject_Rx
import MGArchitecture
import Reusable

class MainViewController: UIViewController, BindableType {
    @IBOutlet weak var tableView: UITableView!
    
    var viewModel: MainViewModel!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        configView()
    }
    
    private func configView() {
        title = "Gitgub"
        tableView.do {
            $0.register(cellType: GithubRepoCell.self)
            $0.rowHeight = 80
        }
    }
    
    func bindViewModel() {
        let input = MainViewModel.Input(
            loadTrigger: Driver.just(()),
            selectTrigger: tableView.rx.itemSelected.asDriver()
        )
        let output = viewModel.transform(input)
        
        output.repos
            .drive(tableView.rx.items) { tableView, index, repo in
                let indexPath = IndexPath(item: index, section: 0)
                let cell: GithubRepoCell = tableView.dequeueReusableCell(for: indexPath)
                cell.setContentForCell(repo)
                return cell
            }
            .disposed(by: rx.disposeBag)
        
        output.selected
            .drive()
            .disposed(by: rx.disposeBag)
        
        output.indicator
            .drive(rx.isLoading)
            .disposed(by: rx.disposeBag)
        
        output.error
            .drive(rx.error)
            .disposed(by: rx.disposeBag)
    }
}

extension MainViewController: StoryboardSceneBased {
    static var sceneStoryboard = StoryBoards.main
}
```

### 3.2. ViewModel:
**ViewModel** sẽ đóng vai trò chuẩn bị và chung chuyển dữ liệu. Nó sẽ có ba thành phần chính gồm:
- **Input**: tập các trigger đầu vào được tiếp nhận từ View.
- **Output**: tập các giá trị đầu ra để thực hiện bind lên View.
- **func transform(input: Input) -> Output** thực hiện biến đổi tập giá trị đầu vào thành kết quả đầu ra.

Ngoài ra, **ViewModel** còn chứa 2 thành phần là **UseCase** chịu trách nhiệm thực hiện các xử lý logic nghiệp vụ và **Navigator** chịu trách nhiệm điều hướng ứng dụng (chuyển màn hình, show alert,...).

Trong ví dụ, khi nhận được sự kiện kích hoạt load data từ `loadTrigger` thì sẽ thực hiện gọi API thông qua hàm `getRepos()` được định nghĩa trong UseCase. Hàm này sẽ trả về một `Observable<[GithubRepo]>`, bởi vậy nên nếu chúng ta muốn nhận được data trả về từ API response là `[GithubRepo]` thì phải sử dụng operator `.flatMap { }`. Sau đó sẽ chuyển kết quả vào Output để bind sang ViewController.

```swift
import Foundation
import RxSwift
import RxCocoa
import MGArchitecture

struct MainViewModel {
    let navigator: MainNavigatorType
    let useCase: MainUseCaseType
}

extension MainViewModel: ViewModelType {
    struct Input {
        let loadTrigger: Driver<Void>
        let selectTrigger: Driver<IndexPath>
    }
    
    struct Output {
        let repos: Driver<[GithubRepo]>
        let selected: Driver<Void>
        let error: Driver<Error>
        let indicator: Driver<Bool>
    }
    
    func transform(_ input: MainViewModel.Input) -> MainViewModel.Output {
        let indicator = ActivityIndicator()
        let error = ErrorTracker()
        
        let repos = input.loadTrigger
            .flatMapLatest { _ in
                return self.useCase.getRepos()
                    .trackActivity(indicator)
                    .trackError(error)
                    .asDriverOnErrorJustComplete()
            }
        
        let selected = input.selectTrigger
            .withLatestFrom(repos) { indexPath, repos in
                return repos[indexPath.row]
            }
            .do(onNext: { repo in
                self.navigator.toRepoDetail(githubRepo: repo)
            })
            .mapToVoid()
        
        return Output(
            repos: repos,
            selected: selected,
            error: error.asDriver(),
            indicator: indicator.asDriver()
        )
    }
}
```

### 3.3. UseCase:
Đóng vai trò xử lý các **logic nghiệp vụ**.

```swift
import Foundation
import RxSwift
import RxCocoa
import MGArchitecture
import MGAPIService

protocol MainUseCaseType {
    func getRepos() -> Observable<[GithubRepo]>
}

struct MainUseCase: MainUseCaseType {
    
    func getRepos() -> Observable<[GithubRepo]> {
        let request = GithubRepoRequest(page: 1)
        let repository = GithubRepoRepository()
        return repository.getGithubRepos(input: request)
    }
}
```

### 3.4. Navigator:
Đóng vai trò **điều hướng** ứng dụng.

```swift
import Foundation
import UIKit
import RxSwift
import RxCocoa

protocol MainNavigatorType {
    func toRepoDetail(githubRepo: GithubRepo)
}

struct MainNavigator: MainNavigatorType {
    unowned let navigationController: UINavigationController
    
    func toRepoDetail(githubRepo: GithubRepo) {
        let viewController = RepoDetailViewController.instantiate()
        let useCase = RepoDetailUseCase()
        let navigator = RepoDetailNavigator(navigationController: navigationController)
        let viewModel = RepoDetailViewModel(navigator: navigator,
                                            useCase: useCase,
                                            repo: githubRepo)
        viewController.bindViewModel(to: viewModel)
        navigationController.pushViewController(viewController, animated: true)
    }
}
```

Chúng ta có thể theo dõi luồng chạy thông qua **Sequqence Diagram** sau:

![](https://images.viblo.asia/a6f4632b-5e38-48e3-9897-c6e2d32a2f08.jpg)

**Source code demo:** https://github.com/tgdong2296/SimpleDemoCleanArchitecture

# III. Tài Liệu tham khảo:

-----


https://github.com/tuan188/MGCleanArchitecture