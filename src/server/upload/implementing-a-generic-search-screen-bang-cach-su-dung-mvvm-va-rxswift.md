# Giới thiệu
Xin chào cả nhà. Là một iOS developer thì chắc chắn một điều là trước hay muộn gì các bạn đều đã làm về màn hình search. Hầu hết gần như 90% app trên thị trường đều có màn hình search và là một developer chắc hẳn ai cũng muốn những dòng code mình viết ra đều tái sử dụng một cách dễ dàng trong mọi trường hợp. Do đó bài viết này mình sẽ chia sẻ về cách implementing a generic search screen bằng cách sử dụng MVVM và RxSwift.

Trước khi bắt tay vào code thì sẽ khái quát qua những điểm chính sau đây:
* Có một subclass generic UIViewController:
1. Có một UISearchBar
2. Handle các trạng thái khác nhau của view controller: results, loading, no results, error

* Có một generic view model 
1. Đưa ra một Observer instance để có thể bind với các sự kiện trên thanh tìm kiếm
2. Sử dụng Driver instance để phát ra các sự kiện cho các trạng thái khác nhau (loading, results, etc).
3. Handles để cho sự kiện mới nhất sẽ được xử lý
4. Handles các sự kiện trên thanh tìm kiếm

# Implementation

## Dependencies
Sử dụng RxSwift và RxCocoa cho tất cả implementation
## The View Model
Bởi vì chúng ta sử dụng MVVM, tất cả các view model sẽ handle tất cả các logic cho các case trong SearchViewController. Chúng ta sẽ xác định đầu vào input là observer và outpit là drivers. Vì thế chúng ta sẽ cùng bắt đầu defining generic class như sau: 
```
class SearchViewModel<T> {
    // inputs
    private let searchSubject = PublishSubject<String>()
    var searchObserver: AnyObserver<String> {
        return searchSubject.asObserver()
    }
     
    // outputs
    private let loadingSubject = PublishSubject<Bool>()
    var isLoading: Driver<Bool> {
        return loadingSubject
            .asDriver(onErrorJustReturn: false)
    }

    private let errorSubject = PublishSubject<SearchError?>()
    var error: Driver<SearchError?> {
        return errorSubject
            .asDriver(onErrorJustReturn: SearchError.unkowned)
    }

    private let contentSubject = PublishSubject<[T]>()
    var content: Driver<[T]> {
        return contentSubject
            .asDriver(onErrorJustReturn: [])
    }
}
```
Chúng ta đã xác định đầu và đầu ra bằng cách sử dụng PublishSubject

```
enum SearchError: Error {
    case underlyingError(Error)
    case notFound
    case unkowned
}

private let bag = DisposeBag()
init() {
    // 1
    searchSubject
        .asObservable()
        .filter { !$0.isEmpty }
        .distinctUntilChanged()
        .debounce(0.5, scheduler: MainScheduler.instance)
        // 2
        .flatMapLatest { [unowned self] term -> Observable<[T]> in
            // 3
            // every new try to search, the error signal will
            // emit nil to hide the error view
            self.errorSubject.onNext(nil)
            // 4
            // switch to loading mode
            self.loadingSubject.onNext(true)
            // 5
            return self.search(byTerm: term)
                .catchError { [unowned self] error -> Observable<[T]> in
                    self.errorSubject.onNext(SearchError.underlyingError(error))
                    return Observable.empty()
            }
        }
        .subscribe(onNext: { [unowned self] elements in
            // 6
            self.loadingSubject.onNext(false)
            // 7
            if elements.isEmpty {
                self.errorSubject.onNext(SearchError.notFound)
            } else {
                self.contentSubject.onNext(elements)
            }
        })
        // 8
        .disposed(by: bag)
}
```
Ở đây mình đã chia nhỏ 8 mục để có thể giải thích được chi tiết rõ ràng hơn:
1. Ta sử dụng searchSubject để làm sự kiện cho đầu vào. Lọc ra các empty queries, loại bỏ giá trị lặp lại  và sử dụng toán tư debounce để kích hoạt request sau khi người dùng kết thúc việc tìm kiếm. Ở đây là 0.5s
2. Ta sử dụng flatMapLatest để loại bỏ nhưng kết quả tìm kiếm mà không cần quan tâm nữa. Ngay khi một giá trị mới được nhập vào thanh tìm kiếm, một quan sát mới sẽ được tạo và cái cũ sẽ bị ghi đè.
3. Mỗi khi bắt đầu với một yêu cầu tìm kiếm mới thì chúng ta sẽ xoá trạng thái error bằng cách emitting một sự kiện .next(nil)
4. Sử dụng .next(true) để loading subject
5. Sử dụng function mà đã custom ở bên trên 
6. Set cho trạng thái là false
7. Ở đây ta check khi mà nhận kết quả tìm kiếm. Nếu không nhận được bất kì kết quả nào thì sẽ phát ra một lỗi SearchError.notFound
8. Cuối cùng ta add disposable tới DisposableBag instance

Sau khi tạo xong view model thì bây giờ ta sẽ tạo view controller đi kèm.

```
class SearchViewController<T>: UIViewController {

    let searchBar = UISearchBar()
    let viewModel: SearchViewModel<T>
    private let bag = DisposeBag()

    var errorView: UIView? {
        return nil
    }

    var loadingView: UIView? {
        return nil
    }

    var contentView: UIView {
        fatalError("ContentView needs to be overriden")
    }

    init(viewModel: SearchViewModel<T>) {
        self.viewModel = viewModel
        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        configureSearchBar()

        // initial state
        errorView?.isHidden = true
        loadingView?.isHidden = true
    }

    private func configureSearchBar() {
        searchBar.barStyle = .default
        view.addSubview(searchBar)
        constrain(view, searchBar) { (superView, view) in
            view.top ==  superView.top
            view.leading == superView.leading
            view.trailing == superView.trailing
        }
    }
```

tiếp tục ta sẽ bindView với func bindViews

```
private func bindViews() {
      searchBar
      .rx
      .text
      .orEmpty
      .bind(to: self.viewModel.searchObserver)
      .disposed(by: bag)

      viewModel.isLoading.asDriver().drive(contentView.rx.isHidden).disposed(by: bag)
      viewModel.error
          .map { $0 != nil }
          .drive(contentView.rx.isHidden)
          .disposed(by: bag)

      if let loadingView = loadingView {
          viewModel.isLoading
              .map(!)
              .drive(loadingView.rx.isHidden)
              .disposed(by: bag)
          viewModel.error
              .map { $0 != nil }
              .drive(loadingView.rx.isHidden)
              .disposed(by: bag)
      }

      if let errorView = errorView {
          viewModel.error
              .map { $0 == nil }
              .drive(errorView.rx.isHidden)
              .disposed(by: bag)

      }
  }
```

Như vậy ta đã tạo xong một generic view controllẻ để handle loading và error states. Bây giờ ta sẽ tạo một demo app sử dụng những gì ta đã viết ở trên 

# Demo
Chúng ta sẽ tạo một DogSearchViewController kế thừa class SearchViewController. Đặc biệt nó sử dụng một model class Dog và yêu cầu một view model thuộc kiểu SearchViewModel<Dog>

## Dog Search View Model

```
import Foundation
import RxCocoa
import RxSwift

class Dog {
    let name: String

    init(name: String) {
        self.name = name
    }
}

class DogSearchViewModel: SearchViewModel<Dog> {
    override func search(byTerm term: String) -> Observable<[Dog]> {
        let dogs = term.isEmpty ? [] : [ Dog(name: "Shiba Inu"),
                                         Dog(name: "Samoyed"),
                                         Dog(name: "American Foxhound"),
                                         Dog(name: "Akita"),
                                         Dog(name: "Giant Schnauzer"),
                                         Dog(name: "Great Dane"),
                                         Dog(name: "Great Pyrenees"),
                                         Dog(name: "Tibetan Terrier"),
                                         Dog(name: "Toy Fox Terrier"),
                                         Dog(name: "Saint Bernard"),
                                         Dog(name: "German shepherd")]

        let filteredDogs = dogs.filter { $0.name[$0.name.startIndex] == term[term.startIndex] }

        return Observable.create({ (observer) -> Disposable in
            DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
                if filteredDogs.isEmpty {
                    observer.onError(SearchError.notFound)
                } else {
                    observer.onNext(filteredDogs)
                    observer.onCompleted()
                }
            }

            return Disposables.create()
        })
    }
}
```

Cuối cùng ta sẽ đi implement class DogSearchViewController

## DogSearchViewController

```
import Foundation
import RxSwift
import Cartography

class DogSearchViewController: SearchViewController<Dog> {
    override var contentView: UIView {
        return tableView
    }

    private let _loadingView: UIView = {
        let view = UIView(frame: .zero)
        let label = UILabel(frame: .zero)
        label.text = "Loading..."
        label.textAlignment = .center
        view.addSubview(label)
        constrain(label) { label in
            label.edges == label.superview!.edges
        }
        return view
    }()

    override var loadingView: UIView? {
        return _loadingView
    }

    private let _errorView: UIView = {
        let view = UIView(frame: .zero)
        let label = UILabel(frame: .zero)
        label.textAlignment = .center
        label.text = "Error 🙈"
        view.addSubview(label)
        constrain(label) { label in
            label.edges == label.superview!.edges
        }
        return view
    }()

    override var errorView: UIView? {
        return _errorView
    }

    private let tableView = UITableView()
    private let bag = DisposeBag()

    init() {
        super.init(viewModel: DogSearchViewModel())
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        configureErrorView()
        configureTableView()
        setupObservers()
        configureLoadingView()
    }

    func configureTableView() {
        view.addSubview(tableView)
        constrain(tableView, view, searchBar) { (view, superView, topView) in
            view.top == topView.bottom
            view.leading == superView.leading
            view.trailing == superView.trailing
            view.bottom == superView.bottom
        }

        tableView.register(DogCell.self, forCellReuseIdentifier: DogCell.identifier)
    }

    func configureLoadingView() {
        view.addSubview(_loadingView)
        constrain(tableView, _loadingView) { (tableView, view) in
            view.edges == tableView.edges
        }
    }

    func configureErrorView() {
        view.addSubview(_errorView)

        constrain(_errorView, view, searchBar) { (view, superView, topView) in
            view.top == topView.bottom
            view.leading == superView.leading
            view.trailing == superView.trailing
            view.bottom == superView.bottom
        }
    }

    func setupObservers() {
        guard let viewModel = viewModel as? DogSearchViewModel else {
            fatalError("Unexpected viewModel type")
        }

        viewModel.content
            .drive(tableView.rx.items(cellIdentifier: DogCell.identifier)) {
                (index, dog: Dog, cell) in
                cell.textLabel?.text = dog.name
            }
            .disposed(by: bag)
    }
}
```
Và sau đây là kết quả

### loading state.

![](https://images.viblo.asia/fa84a694-078b-435e-859c-9b563d3286db.png)

### Results starting with ‘s’

![](https://images.viblo.asia/e78befeb-5773-43a1-83d7-168260d9ced4.png)

### Error state

![](https://images.viblo.asia/646be26f-20ec-4675-af1e-85f026cd3d3c.png)

# Tổng kết

Cảm ơn mọi người đã theo dõi. Sau bài này mình đã giới thiệu qua implementation về cách tạo 1 search screen bằng cách sử dụng generic với MVVM và RxSwift

# Tài liệu tham khảo

https://medium.com/@andres.portillo/implementing-a-generic-search-screen-using-mvvm-and-rxswift-cd1d6fb134c
    
http://cocoadocs.org/docsets/RxSwift/2.4/