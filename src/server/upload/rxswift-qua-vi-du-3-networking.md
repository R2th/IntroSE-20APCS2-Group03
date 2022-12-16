Hôm nay, chúng ta sẽ nói về networking và kết nối data với UI. Chúng ta cũng sẽ chắc chắn rằng code của chúng ta sẽ đơn giản, mượt mà và đẹp. Nếu bạn chưa đọc qua những ví dụ trước thì bạn có thể xem những bài trước trong series ở đây [#1](https://viblo.asia/p/rxswift-qua-vi-du-1-nhung-dieu-co-ban-Az45bnrO5xY) và [#2](https://viblo.asia/p/rxswift-qua-vi-du-2-observable-va-the-bind-4dbZNExQKYM)

Với Rx thì có rất nhiều mã nguồn mở rộng dành cho networking như *RxAlamofire* hay *Moya*. Ở ví dụ này chúng ta sẽ tập trung vào Moya.

# Moya

![](https://images.viblo.asia/dee645aa-2aeb-43cc-a183-d028e79f51db.png)

*Moya* là một lớp abstract ở trên cùng của networking mà bình thường bạn phải tự xử lý. Về cơ bản thì khi sử dụng Moya chúng ta sẽ kêt nối với API nhanh chóng và với các phần mở rộng cho nó bao gồm *RxSwift* và *ModelMapper*, chúng ta sẽ có đủ hành trang để bắt đầu hành trình.


## Setup

Để thiết lập *Moya*, chúng ta cần *Provider*, trong đó bao gồm thiết lập cho stubbing, endpoint, closure... Với ví dụ dưới đây thì chúng ta không cần thứ gì cả nên ở thời điểm này chỉ cần khởi tạo *Provider* với *RxSwift*. Tiếp theo chúng ta cần config Endpoint, là một enum chứa các endpoint. Chúng tả chỉ cần tạo một enum phù hợp với *TargetType* là xong. Vậy TargetType là gì? Nó là một protocol có chứa URL, method, task(request/upload/download), parameters và parameterEncoding (Những thứ cơ bản của một URL request). Ngoài ra còn một điều nữa, parameter cuối cùng là sampleData chứa các dữ liệu để test mà không cần phải có server.


### Example

Giờ chúng ta sẽ tới ví dụ. Trong ví dụ này thì chúng ta sẽ lấy issues cho mỗi repository cụ thể sử dụng Github API. Để cho ví dụ không quá đơn giản, đầu tiên chúng ta sẽ lấy về repository, kiểm tra xem nó có tồn tại không, sau đó sẽ lấy issues cho repository đó. Và chúng ta sẽ map từ JSON sang Objects. Chúng ta cũng sẽ xử lý lỗi, spamming API hay gửi trùng request...

![](https://images.viblo.asia/7b31dae5-e1b0-4adc-9d19-c7fc8c699448.png)

Đừng lo lắng, hầu như những thứ đó đều đã được nhắc tới ở bài đầu tiên trong series. Ở bài này chúng ta sẽ cần hiểu về các request được kết nỗi với nhau và xử lý lỗi.

![](https://images.viblo.asia/1f2c684e-9f78-4344-be54-52824365ec59.gif)

Giờ hãy bắt đầu nào. Ví dụ của chúng ta sau khi hoàn thành sẽ giống thế này:

![](https://images.viblo.asia/452d519d-d4bc-4757-8017-3c2fae3f07db.gif)

Chúng ta điền tên đầy đủ của repository (Thêm cả người sở hữu repository và "/"), ví dụ như: apple/swift, apple/cups, moya/moya... Khi repository được tìm thấy (URL request đầu tiền), chúng ta sẽ tìm issues của repository đó (URL request thứ hai). Đó là mục tiêu chính của chúng ta, bắt tay code nào!

Đầu tiên, chúng ta cần tạo project và cài đặt cocoapods. Chúng ta sẽ cần thêm vài pods ở ví dụ này. Chúng ta sẽ sử dụng RxSwift, Moya, RxCocoa, RxOptional, Moya’s extension cho RxSWift và cuối cùng là ModelMapper để map objects, Moya-ModelMapper. Khá là nhiều! Chúng ta có thể giảm trong Podfile xuống còn 3 pods là: 

```
platform :ios, '8.0'
use_frameworks!
 
target 'RxMoyaExample' do
 
pod 'RxCocoa', '~> 3.0.0'
pod 'Moya-ModelMapper/RxSwift', '~> 4.1.0'
pod 'RxOptional'
 
end
 
post_install do |installer|
    installer.pods_project.targets.each do |target|
        target.build_configurations.each do |config|
              config.build_settings['ENABLE_TESTABILITY'] = 'YES'
              config.build_settings['SWIFT_VERSION'] = '3.0'
        end
    end
end
```

Những thư viện này rất hữu ích và chúng ta sẽ thấy nhiệm vụ sẽ thật đơn giản với sự trợ giúp từ chúng.

# Bước 1 - Setup Controller và Moya

Chúng ta bắt đầu với UI, chỉ gồm UITableView và UISearchBar.

Sau đó chúng ta sẽ cần một Controller để quản lý tất cả. Chúng ta có thể thử miêu tả nhiệm vụ của Controller trước khi thiết kế

Vậy thực sự thì Controller sẽ làm gì? Nó sẽ lấy dữ liệu từ SearchBar, chuyển nó qua Model, lấy issues từ Model và hiển thị lên TableView. Bắt đầu với IssueListViewController nào. Tạo file IssueListViewController.swift và import các thành phần cơ bản cần thiết:

```
import Moya
import Moya_ModelMapper
import UIKit
import RxCocoa
import RxSwift
 
class IssueListViewController: UIViewController {
    
    @IBOutlet weak var tableView: UITableView!
    @IBOutlet weak var searchBar: UISearchBar!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupRx()
    }
    
    func setupRx() {
    }
}
```

Như bạn có thể thấy, chúng ta có hàm setupRx() bởi vì chúng ta cần binding các thành phần từ Controller sang Model. Nhưng trước hết, hãy setup Moya Enpoint. Nhớ rằng mình vừa chỉ ra có hai bước: Bước 1 là Provider và bước 2 là Endpoint. Hãy bắt đầu với Endpoint.

Chúng ta sẽ tạo file mới, gọi nó là GithubEndpoint.swift và sau đó tạo một enum với một vài target trong đó:

```
import Foundation
import Moya
 
enum GitHub {
    case userProfile(username: String)
    case repos(username: String)
    case repo(fullName: String)
    case issues(repositoryFullName: String)
}
```

Nhớ mình nói từ đầu không, file này cần phải phù hợp với TargetType nhưng nó mới chỉ là enum nên chúng ta sẽ tạo một extension với các thuộc tính cần thiết như mình đã chỉ ra ở đầu bài đó là baseURL, path, method (.get, .post...), parameters, parametersEncoding, task, sampleData

Giờ hãy implement nó nào. Trong file GithubEndpoint.swift, chúng ta sẽ tạo extension cho Github để phù hợp với TargetType:

```
import Foundation
import Moya
 
private extension String {
    var URLEscapedString: String {
        return self.addingPercentEncoding(withAllowedCharacters: CharacterSet.urlHostAllowed)!
    }
}
 
enum GitHub {
    case userProfile(username: String)
    case repos(username: String)
    case repo(fullName: String)
    case issues(repositoryFullName: String)
}
 
extension GitHub: TargetType {
    var baseURL: URL { return URL(string: "https://api.github.com")! }
    var path: String {
        switch self {
        case .repos(let name):
            return "/users/\(name.URLEscapedString)/repos"
        case .userProfile(let name):
            return "/users/\(name.URLEscapedString)"
        case .repo(let name):
            return "/repos/\(name)"
        case .issues(let repositoryName):
            return "/repos/\(repositoryName)/issues"
        }
    }
    var method: Moya.Method {
        return .get
    }
    var parameters: [String: Any]? {
        return nil
    }
    var sampleData: Data {
        switch self {
        case .repos(_):
            return "{{\"id\": \"1\", \"language\": \"Swift\", \"url\": \"https://api.github.com/repos/mjacko/Router\", \"name\": \"Router\"}}}".data(using: .utf8)!
        case .userProfile(let name):
            return "{\"login\": \"\(name)\", \"id\": 100}".data(using: .utf8)!
        case .repo(_):
            return "{\"id\": \"1\", \"language\": \"Swift\", \"url\": \"https://api.github.com/repos/mjacko/Router\", \"name\": \"Router\"}".data(using: .utf8)!
        case .issues(_):
            return "{\"id\": 132942471, \"number\": 405, \"title\": \"Updates example with fix to String extension by changing to Optional\", \"body\": \"Fix it pls.\"}".data(using: .utf8)!
        }
    }
    var task: Task {
        return .request
    }
    var parameterEncoding: ParameterEncoding {
        return JSONEncoding.default
    }
}
```

Toàn bộ file GithubEndpoint.swift đã xong. Nhìn qua thì có vẻ đáng sợ nhưng nếu bạn đọc nó thì sẽ thấy nó khá đơn giản. Chúng ta không cần bất cứ parameters nào trong ví dụ này nên sẽ để nil, method thì sẽ luôn là .get trong trường hợp này, baseURL thì luôn luôn giống nhau, chỉ có sampleData và path là phải đặt trong switch.

Nếu bạn muốn thêm các target khác, bạn chỉ cần kiểm tra nếu request là .get hay các loại khác như .post, .delete... Nó có parameters hay không sau đó bạn cũng sẽ cần thêm switch. Ở đoạn code trên thì mình cũng thêm function *URLEscapedString*, hàm này rất hữu ích với encoding các kí tự trong URL. Còn lại thì mọi thứ khá rõ ràng. Giờ quay trở lại Controller!

Giờ chúng ta cần implement Moya Provider Chúng ta cũng cần xử lý giấu bàn phím khi click vào cell bằng RxSwift nên chúng ta sẽ cần biến DisposeBag. Thêm vào đó, chúng ta cũng tạo biến Observable để chứa text lấy được từ Search Bar nhưng sẽ được lọc (Loại bỏ trùng lặp, đợi cho tới khi có thay đổi, và thêm mọi thứ từ bài [#1](https://viblo.asia/p/rxswift-qua-vi-du-1-nhung-dieu-co-ban-Az45bnrO5xY) của series này)

Tổng kết lại, chúng ta sẽ thêm 3 thuộc tính và implement hàm setupRx(). Cùng làm nào!

```
class IssueListViewController: UIViewController {
    ...
    let disposeBag = DisposeBag()
    var provider: RxMoyaProvider<GitHub>!    
    var latestRepositoryName: Observable<String> {
        return searchBar
            .rx.text
            .orEmpty
            .debounce(0.5, scheduler: MainScheduler.instance)
            .distinctUntilChanged()
    }
    ...
    func setupRx() {
        // First part of the puzzle, create our Provider
        provider = RxMoyaProvider<GitHub>()
   
        // Here we tell table view that if user clicks on a cell,
        // and the keyboard is still visible, hide it
        tableView
            .rx.itemSelected
            .subscribe(onNext: { indexPath in
                if self.searchBar.isFirstResponder() == true {
                    self.view.endEditing(true)
                }
            })
            .addDisposableTo(disposeBag)
    }
    ...
}
```

Vậy là xong bước 1. Sang bước 2 nào!

## Step 2 – Network model and mapping objects

Bây giờ chúng ta cần Model, nó sẽ cung cấp data tuỳ theo text được nhập vào Search Bar. Nhưng đầu tiên, chúng ta cũng cần parse objects trước khi gửi bất kì thông tin nào. Nó sẽ được xử lý bởi ModelMapper. Chúng ta sẽ cần 2 lớp, một là Repository, cái còn lại là Issue. Chúng ta cần thoả mãn Mappable protocol và hãy thử parse objects. Cùng tạo nào!

```
import Mapper
 
struct Repository: Mappable {
    
    let identifier: Int
    let language: String
    let name: String
    let fullName: String
    
    init(map: Mapper) throws {
        try identifier = map.from("id")
        try language = map.from("language")
        try name = map.from("name")
        try fullName = map.from("full_name")
    }
}
```

```
import Mapper
 
struct Issue: Mappable {
    
    let identifier: Int
    let number: Int
    let title: String
    let body: String
    
    init(map: Mapper) throws {
        try identifier = map.from("id")
        try number = map.from("number")
        try title = map.from("title")
        try body = map.from("body")
    }
}
```

Ở đây chúng ta chỉ cần một vài biến cơ bản. Ok, giờ chúng ta sẽ chuyển qua phần thú vị nhất của bài, IssueTrackerModel - phần cốt lõi của Networking. Đầu tiên, Model của chúng ta nên có thuộc tính *Provider*. Sau đó là biến cho observable để hứng dữ liệu từ SearchBar từ bên controller chuyển qua. Với method thì chúng ta cần method để trả về mảng Issues, để có thể bind vào TableView. 

Giờ hãy tạo IssueTrackerModel.swift nào.
 
```
import Foundation
import Moya
import Mapper
import Moya_ModelMapper
import RxOptional
import RxSwift
 
struct IssueTrackerModel {
    
    let provider: RxMoyaProvider<GitHub>
    let repositoryName: Observable<String>
    
    func trackIssues() -> Observable<[Issue]> {
        
    }
    
    internal func findIssues(repository: Repository) -> Observable<[Issue]?> {
 
    }
    
    internal func findRepository(name: String) -> Observable<Repository?> {
 
    }
}
```


Như bạn thấy, chúng ta đã thêm 2 method. *findRepository* và *findIssues*. Giờ ta sẽ implement 2 method này. 

```
internal func findIssues(repository: Repository) -> Observable<[Issue]?> {
    return self.provider
        .request(GitHub.issues(repositoryFullName: repository.fullName))
        .debug()
        .mapArrayOptional(Issue.self)
}
 
internal func findRepository(name: String) -> Observable<Repository?> {
    return self.provider
        .request(GitHub.repo(fullName: name))
        .debug()
        .mapObjectOptional(Repository.self)
}
```

Giờ mình sẽ phân tích từng bước:

1. Chúng ta có provider để có thể thực hiện request với các trường hợp trong enum.
2. Tiếp theo truyền vào Github.repo hoặc Github.issue. Xong phần request!
3. Chúng ta dùng toán tử debug() để in ra vài thông tin giá trị từ request. Nó rất có ích trong giai đoạn phát triển hay kiểm thử.
4. Bạn có thể thử parse và map kết quả trả về từ server bằng thủ công nhưng nhờ có extension, chúng ta có một số hàm như mapObject(), mapArray(), mapObjectOptional() hay mapArrayOptional(). 

Okay. Giờ chúng ta có hai methods trả về giá trị, làm thế nào để kết nối chúng? Với nhiệm vụ này, ta cần học thêm toán tử mới, *flatMap()* và đặc biệt là *flatMapLatest()*. Việc mà những toán từ này làm là, từ một sequence, nó tạo ra một sequence khác. Tại sao bạn lại cần nó? Giả sử bạn có 1 strings sequence, bạn muốn chuyển nó thành repositories sequence hay repositories sequence chuyển thành issues sequence. Chính xác là trường hợp của chúng ta. Chúng ta sẽ biến đổi nó. Nếu trường hợp chúng ta có nil, chúng ta có thể trả về mảng rỗng và clear TableView. Nhưng điểm khác biệt giữa *flatMap()* và *flatMapLatest()* là gì? *FlatMap()* lấy về một giá trị, sau đó thực hiện một nhiệm vụ dài, và khi nó nhận được giá trị tiếp theo, nhiệm vụ trước vẫn được hoàn thành ngay cả khi giá trị mới nhận được ở thời điểm nhiệm vụ hiện tại vẫn đang được thực thi. Nó không giống với thứ chúng ta cần trong ví dụ này vì khi bạn có giá trị text mới từ Search Bar, chúng ta muốn huỷ request cũ và tạo request mới. Đó là cái mà *flatMapLatest()* làm. 

hàm trackIssues sẽ giống như ở dưới:

```
func trackIssues() -> Observable<[Issue]> {
    return repositoryName
        .observeOn(MainScheduler.instance)
        .flatMapLatest { name -> Observable<Repository?> in
            print("Name: \(name)")
            return self
                .findRepository(name)
        }
        .flatMapLatest { repository -> Observable<[Issue]?> in
            guard let repository = repository else { return Observable.just(nil) }
            
            print("Repository: \(repository.fullName)")
            return self.findIssues(repository)
        }
        .replaceNilWith([])
}
```

Phân tích từng bước: 
1. Chúng ta muốn chắc rằng nó được observe từ MainScheduler bởi vì mục đích của Model này là bind dữ liệu sang cho TableView để hiển thị.
2. Chúng ta biến đổi text (tên repository) thành observable repository sequence, có thể gặp nil trong trường hợp này nếu nó không map với object của chúng ta.
3. Chúng ta sẽ kiểm tra xem repository có nil hay không.
Nếu nó nil, đơn giản là trả về observable nil sequence. Observable.just(nil) nghĩa là chúng ta sẽ gửi một nil item.
4. .replaceNilWith([]) là RxOptional extension giúp chúng ta xử lý trường hợp nil. Trong trường hợp này chúng ta biến đổi nil thành mảng rỗng để clear TableView.


### Step 3 – Bind issues to table view

Bước cuối cùng là kết nối data từ model chúng ta vừa tạo tới TableView. Nghĩa là ta phải bind observable tới TableView.
Bình thường bạn sẽ cần "conform" UITableViewDataSource với một vài methods như number of rows, cell for row... và gán dataSource với ViewController. 
Với RxSwift, chúng ta có thể setup UITableViewDataSource với chỉ một closure. 

Giờ quay trờ lại với IssueListViewController, và chúng ta sẽ implement setupRx() method:

```
class IssueListViewController: UIViewController {
    ...
    var issueTrackerModel: IssueTrackerModel!
    ...    
    func setupRx() {
        // First part of the puzzle, create our Provider
        provider = RxMoyaProvider<GitHub>()
        
        // Now we will setup our model
        issueTrackerModel = IssueTrackerModel(provider: provider, repositoryName: latestRepositoryName)
        
        // And bind issues to table view
        // Here is where the magic happens, with only one binding
        // we have filled up about 3 table view data source methods
        issueTrackerModel
            .trackIssues()
            .bindTo(tableView.rx.items) { tableView, row, item in
                let cell = tableView.dequeueReusableCell(withIdentifier: "issueCell", for: IndexPath(row: row, section: 0))
                cell.textLabel?.text = item.title
                
                return cell
            }
            .addDisposableTo(disposeBag)
        
        // Here we tell table view that if user clicks on a cell,
        // and the keyboard is still visible, hide it
        tableView
            .rx.itemSelected
            .subscribe(onNext: { indexPath in
                if self.searchBar.isFirstResponder == true {
                    self.view.endEditing(true)
                }
            })
            .addDisposableTo(disposeBag)
    }
    ...
}
```

Vậy là xong. Mọi thứ chúng ta muốn đã được hoàn thành. Chạy thử project và xem kết quả!.

![](https://images.viblo.asia/452d519d-d4bc-4757-8017-3c2fae3f07db.gif)