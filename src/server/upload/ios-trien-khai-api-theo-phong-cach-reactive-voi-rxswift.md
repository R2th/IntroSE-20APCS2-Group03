*Bài viết này mình đăng lại từ blog cá nhân với mục đích lưu trữ vì bài cũ trên viblo của mình đã lỡ tay xóa.*


-----



<p>Có lẽ hầu hết mọi người có thể đã quen với việc triển khai API sử dụng closure làm callback, hôm nay mình xin chia sẻ với các bạn cách sử dụng RxSwift để triển khai API. Ở trong bài này mình sử dụng Moya để xây dựng cấu trúc API, Moya như là một network abstraction layer được xây dựng sẵn với base là Alamofire, giúp ta đơn giản hóa và clear hơn cấu trúc API.</p>

<p><a href="https://github.com/Moya/Moya">https://github.com/Moya/Moya</a></p>

<h2>Về RxSwift</h2>

<p>RxSwift không mới nhưng cũng chẳng hề cũ, mình dev iOS cũng được một thời gian tương đối, tuy nhiên mới một vài tháng trở lại đây mình mới tiếp xúc với RxSwift và ứng dụng nó vào trong các project của mình. RxSwift về cơ bản mà nói, nó giúp đơn giản hóa việc lập trình bất đồng bộ bằng việc cho phép bạn tương tác và xử lý với các dữ liệu từ các sự kiện đi tới theo một cách tuần tự. Thực sự mà nói thì Rx có ứng dụng rất rộng rãi trong nhiều tình huống, nhưng chúng ta chỉ cần nhớ duy nhất một điều rằng, Rx giúp chúng ta lập trình bất đồng bộ. Nếu có đoạn code nào là bất đồng bộ, ở đó bạn có thể ứng dụng Rx.</p>



<h2>Code</h2>



<h3>API Structure</h3>



<p>Sử dụng Moya, chúng ta có thể viết cấu trúc API rất dễ dàng và clear các phần của nó, mình lấy ví dụ với một API đơn giản như sau:</p>


```
import Moya

enum API {

    case getBook(Int)
    // ... more APIs
}

extension API: TargetType {

    static let baseUrl = "http://localhost:3000"
    static let apiVersion = "/api/v1"

    var baseURL: URL {
        return URL(string: API.baseUrl + API.apiVersion)!
    }

    var path: String {
        switch self {
        case .getBook(let id):
            return "/books/\(id)"
        }
    }

    var method: Moya.Method {
        switch self {
        case .getBook:
            return .get
        }
    }

    var sampleData: Data {
        return "{}".data(using: .utf8)!
    }

    var task: Task {
        switch self {
        case .getBook:
            return Task.requestPlain
        }
    }

    var headers: [String : String]? {
        return nil
    }
}
```



<p>và một lớp APIProvider, thường viết ra để config MoyaProvider.</p>


```
import Moya

class APIProvider {

    static let shared = MoyaProvider()
    // trong lớp này vốn có rất nhiều thứ nhng mình xóa đi để đơn giản hóa ví dụ
}
```



<h3>Base Service</h3>



<p>Vậy là chúng ta đã có một API đơn giản đã được cấu trúc ở trên, việc tiếp theo là đi viết lớp BaseService, theo cả 2 cách: thông thường (sử dụng closure làm callback) và sử dụng RxSwift:</p>



<pre class="wp-block-code"><code>import RxSwift

class ResponseError {

    static let invalidJSONFormat = NSError(domain: "", code: 600, userInfo: [NSLocalizedDescriptionKey: "Invalid JSON Format"])
}

class BaseService {

    // Cách thông thường
    static func requestJson(api: API, completion: @escaping ([String: Any]?, Error?) -> Void) {
        APIProvider.shared.request(api) { result in
            do {
                switch result {
                case .success(let response):
                    let json = try response.mapJSON()
                    if let jsonDict = json as? [String: Any] {
                        completion(jsonDict, nil)
                    } else {
                        throw ResponseError.invalidJSONFormat
                    }
                case .failure(let error):
                    throw error
                }
            } catch {
                completion(nil, error)
            }
        }
    }
    
    // Sử dụng RxSwift
    static func requestJsonRx(api: API) -> Observable&lt;[String: Any]> {
        return Observable.create({ observer -> Disposable in
            let request = APIProvider.shared.request(api, completion: { result in
                do {
                    switch result {
                    case .success(let response):
                        let json = try response.mapJSON()
                        if let jsonDict = json as? [String: Any] {
                            observer.onNext(jsonDict)
                            observer.onComplete()
                        } else {
                            throw ResponseError.invalidJSONFormat
                        }
                    case .failure(let error):
                        throw error
                    }
                } catch let error {
                    observer.onError(error)
                    observer.onComplete()
                }
            })
            return Disposables.create {
                request.cancel()
            }
        })
    }
}</code></pre>



<h3>Các service con</h3>



<p>Giả sử ta đã có model Book có thể khởi tạo từ json nhờ ObjectMapper</p>


```
import RxSwift

class BookService: BaseService {

    // Theo cách thông thường
    static func getBook(id: Int, completion: @escaping (Book?, Error?) -> Void) {
        requestJson(.getBook(id), completion: { (json, error) in
            if let error = error {
                completion(nil, error)
            } else if let book = Book(JSON: json) {
                completion(Book(JSON: json), nil)
            } else {
                completion(nil, ResponseError.invalidJSONFormat)
            }
        })
    }

    // Sử dụng RxSwift
    static func getBookRx(id: Int) -> Observable&lt;Book> {
        return requestJsonRx(.getBook(id)).map({ json in
            if let book = Book(JSON: json) {
                return book
            } else {
                throw ResponseError.invalidJSONFormat
            }
        })
    }    
}
```


<h3>Call API</h3>


```
import RxSwift

class ViewController: UIViewController {
    
    var disposeBag = DisposeBag()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Cách thông thường
        BookService.getBook(id: 100, completion: { (data, error) in
            // Thao tác với data và error
        })
        
        // Reactive Style
        BookService.getBookRx(id: 100)
        // Làm gì đó hay ho với các operator của RxSwift
        // ...
        // Sau đó:
        .subscribe(onNext: { book in
            // Xử lý book object
        }, onError: { error in
            // Xử lý nếu gặp lỗi
        }, onCompleted: {
            // Xử lý khi complete
        }, onDisposed: {
            // Xử lý khi dispose
        }.disposed(by: disposeBag)
}
```



<h2>Kết</h2>



<p>Mình có viết cả code thông thường kèm theo để các bạn có cái nhìn rõ hơn, còn để mà nói dùng reactive thì tốt hơn hay cách truyền thống thì tốt hơn, mình cũng không nhận định được. Về cơ bản thì reactive là chỉ là một phong cách code, còn vấn đề thì vẫn có thể giải quyết theo nhiều cách, ai thích nó thì hy vọng bài viết sẽ có ích cho bạn, còn ai không thích hoặc chưa từng sử dụng thì có thể bookmark tham khảo. Chúc các bạn một ngày làm việc ngon lành.</p>