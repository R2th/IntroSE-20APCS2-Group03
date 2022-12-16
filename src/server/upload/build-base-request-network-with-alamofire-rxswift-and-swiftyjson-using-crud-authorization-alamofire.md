# Giới thiệu
Nếu các bạn đã đọc bài này của mình giới thiệu về các [Library](https://viblo.asia/p/top-10-thu-vien-ios-ma-toi-biet-4dbZNo08lYM) thì hôm nay mình sẽ đi sâu hơn về building một base networking sử dụng mô hình CRUD and Authorization mình tự building thông qua tham khảo document của alamofire và dự án mình đang làm.

> Using MVVM pattern design.
# Các thư viện sử dụng
1. Thư viện request network [Alamofire](https://github.com/Alamofire/Alamofire)
2. Function programing [RxSwift](https://github.com/ReactiveX/RxSwift) và [RxCocao](https://github.com/ReactiveX/RxSwift/tree/master/RxCocoa)
3. Format json swift to model [SwiftyJson](https://github.com/SwiftyJSON/SwiftyJSON)
# Các bước thực hiện
## Xây UserModel
```
import Foundation
import SwiftyJSON

class SessionModel {
    var userID: Int?
    var acccessToken: String?

    init(json: JSON) {
        self.userID = json["user_id"].intValue
        self.acccessToken = json["auth_token"].stringValue
    }
}
```

## Xây dựng class BaseService.
> Trong các dự án thường sẽ được build các tác vụ request networking bên trong một thư mục. Mình sẽ build trong thư mục **Networking** (Tự tạo nhé :p) 

**Mình sẽ sử dụng design pattern Singleton để tổ chức cho class BaseService của mình.**

```
import Foundation
import Alamofire
import RxSwift
import SwiftyJSON

class BaseService {
    static let instance = BaseService()

    var sessionManager = SessionManager.default
    private var headers = SessionManager.defaultHTTPHeaders
    private var configure = URLSessionConfiguration.default

    private init() {
        configHeader()
    }

    func configHeader() {
        headers["Content-Type"] = "application/json"
        configure.httpAdditionalHeaders = headers
        sessionManager = Alamofire.SessionManager(configuration: configure)
    }
 }
```

> Advanced using của Alamofire. Các bạn có thể đọc thêm ở document của alamofire. [Advanced Usage](https://github.com/Alamofire/Alamofire/blob/master/Documentation/AdvancedUsage.md)

> Ở đây mình sử dụng **SessionManager.default** để thiết lập một số config riêng biệt ngoài các config default của Alamofire.
> Nếu request của bạn không có config thì có thể sử dụng mặc định request của Alamofire là **Alamofire.request(...)** thay vì sử dụng **self.sessionManager.request(...)** như mình ở function sau nhé.

## Xây dựng baseAPI để thực hiện request chung cho các request của chúng ta.
**Đặt dưới func configHeader()**

> Mình chú thích ở sau các hàm. Các bạn chú ý đọc điểu hiểu hàm. Code nó không format comment nên hơi khó đọc xíu

```
[...]
func baseAPI(router: Router) -> Observable<Result<JSON>> {
        return Observable.create({ observer -> Disposable in # Chúng ta sẽ tạo một Observable để phục vụ cho việc thu thập tín hiệu phát ra cho các tác vụ sau đó.
            self.sessionManager
                .request(router) # Router thì chúng ta sẽ set ở func phía dưới nhé.
                .authenticate(user: "account", password: "password") # Nếu app của bạn sử dụng Basic Auth thì thêm cái này không thì có thể bỏ qua. Điền tài khoản của basic Auth vào. Cái này mình cũng chưa rõ lắm nên các bạn tự tìm hiểu thêm nhé.
                .responseJSON { response in
                    switch response.result {
                    case .success(let value):
                        let json = JSON(value)  # Xử lý về dạn json thông qua SwiftyJson
                        observer.onNext(Result.success(json))  # observer phát ra tín hiệu trả về dữ liệu
                    case .failure(let error):
                        observer.onNext(Result.error(error)) # observer phát ra tín hiệu trả về lỗi
                    }
                    observer.onCompleted() # observer phát ra tín hiệu hoàn thành request
                }
            return Disposables.create()
        })
    }
[...]
```
## Thiết lập Enum Router.
> Router này sẽ giúp chúng ta điều hướng **URL PATH** và **URL METHOD** để request lên server.

**DEMO JSON PARAM truyền lên với demo LOGIN request**
```
{
  "session": {
    "mailaddress": "user_test_1@gmail.com",
    "password": "Abc@1234"
  }
}
```

```
enum Router: URLRequestConvertible { # URLRequestConvertible class của Alamofire để thiết lập config 
    static let baseURLString = "http://example.com/api/" # Base URL đến server của bạn.
    case login(email: String, password: String) # Mình sẽ demo một request login 

    var method: HTTPMethod { # Setup method cho request.
        switch self {
        case .login:
            return .post
        default:
            return .get
        }
    }

    var path: String { # Setup path url cho request 
        switch self {
        case .login:
            return "sessions"
    }

    func asURLRequest() throws -> URLRequest { # Xử lý endcode url path và method thành urlRequest.
        let url = try Router.baseURLString.asURL()

        var urlRequest = URLRequest(url: url.appendingPathComponent(path))
        urlRequest.httpMethod = method.rawValue
        
        # 3 Lệnh trên là tao sẽ tạo một URL REQUEST để thực hiện request.
        
        var headerParameter: Parameters? = nil # Khởi tạo parameter cho requet của chúng ta.

        switch self {
        case .login(let email, let password):
            headerParameter = ["session": ["mailaddress": email, "password": password]]  as [String : Any] # Tạo parameter với tham số truyền vào là email và password. ứng với parameter dạng json ở bên trên.
        default:
            break
        }
        urlRequest = try URLEncoding.default.encode(urlRequest, with: headerParameter) # Encode request của chúng ta ra URL REQUEST.
        return urlRequest
    }
}
```
## Thiết lập access token cho các request sau khi login. 
Với thiết lập này thì sau khi login. Các request sau các bạn không phải thêm thủ công một param là token gửi lên server nữa.
```
class AccessTokenAdapter2: RequestAdapter {
    private let accessToken: String

    init(accessToken: String) {
        self.accessToken = accessToken
    }

    func adapt(_ urlRequest: URLRequest) throws -> URLRequest {
        var urlRequest = urlRequest
        urlRequest.setValue(accessToken, forHTTPHeaderField: "AccessToken")
        return urlRequest
    }
}
```

### Hàm helper set Access token.
Mình sử dụng **Extension** để thêm func vào class BaseService hoặc bạn có thể gọi trực tiếp **AlamofireSetup.instance.sessionManager.adapter = AccessTokenAdapter2(accessToken: accessToken)** sau khi *login* thành công hoặc *register* tài khoản thành công.
```
extension BaseService {
    static func setToken(accessToken: String) {
        AlamofireSetup.instance.sessionManager.adapter = AccessTokenAdapter2(accessToken: accessToken)
    }
}
```

## Demo login request.

```
extension AlamofireSetup {
    func login(email: String, password: String) -> Observable<Result<SessionModel>> {
        return baseAPI(router: Router.login(email: email, password: password))
            .flatMapLatest { resultJson -> Observable<Result<SessionModel>> in
                switch resultJson {
                case .success(let json):
                    let userData = SessionModel(json: json)
                    return Observable.just(Result.success(userData))
                case .error(let error):
                    return Observable.just(Result.error(error))
                }
            }
    }
}
```

> Result này sẽ giúp xử lý lỗi dễ dàng hơn. Bạn có thể tự build theo các khác. Vì mình cũng chưa tối ưu được phần này.
```
enum Result<T> {
    case success(T)
    case error(Error)
}
```

## Login button tap send request với mô hình MVVM
### Ở Login controller

```
# Khởi tạo viewModel ở **override func viewDidLoad()**
# Truyền vào là 2 textField là mail và password và button login.
viewModel = LoginViewModel(
            inputs: (
                email: getObservableTextField(emailTextField),
                password: getObservableTextField(passwordTextField),
                loginTaps: loginButton.rx.tap.asObservable()
            )
        )
```
### Xử lý ở viewModel
```
import Foundation
import RxSwift
import SwiftyJSON
import RxCocoa

class LoginViewModel: BaseViewModel {
    
    // MARK: - Outputs
    var loginResult: Observable<Result<SessionModel>>!
    
    init(inputs: (
        email: Observable<String>,
        password: Observable<String>,
        loginTaps: Observable<Void>)) {
        
        super.init()
        let emailAndPassword = Observable.combineLatest(inputs.email, inputs.password) { (email: $0, password: $1) }
        loginResult = inputs.loginTaps
            .withLatestFrom(emailAndPassword)
            .flatMapLatest({ [unowned self] loginInfo -> Observable<Result<SessionModel>> in
                return AlamofireSetup.instance.login(email: loginInfo.email, password: loginInfo.password)
            })
    }
}
```

### Xử lý Lắng nghe ở viewController 
```
viewModel.loginResult
            .asObservable()
            .subscribe(onNext: { [weak self] result in
                guard let `self` = self else {
                    return
                }
                switch result {
                case .success(let userModel):
                    print("LOGIN SUCCESS")
                    # Redirect to Home Page 
                     BaseService.setToken(accessToken: userModel.accessToken)
                case .error(let error):
                    print("LOGIN FAIL")
                    self.showAlertDialog(message: error.localizedDescription)
                }
            })
            .disposed(by: disposeBag)
```

## Kết luận
Follow cơ bản sẽ là vậy. Còn thiếu xót gì mong các bạn comment góp ý.
Nhiều code mình sửa đổi tên class để phù hợp với bài viết. Có gì sửa thiếu các bạn thông cảm.