![](https://images.viblo.asia/3579fcd6-8d6b-4086-923b-8618fbc85ec1.png)
Trong bài loạt bài viết này, tôi sẽ chỉ cho các bạn một cách dễ dàng để đơn giản hóa một trong những việc dài nhất và nhàm chán nhất mà nhà phát triển phải thực hiện trong quá trình phát triển ứng dụng.

**Phần 1: Xây dựng một lớp URLRequest đơn giản hiệu quả**

Ngày nay, hầu hết các ứng dụng đều yêu cầu việc sử dụng kết nối mạng. Với nền tảng iOS, điều đó có nghĩa là chúng ta phải chiến đấu với lớp URLRequest. Điều này không phải lúc nào cũng dễ dàng và có thể dẫn đến một loạt các rắc rối chúng ta không cẩn thận.

   Trước tiên, để hiểu rõ hơn về các ví dụ, chúng ta cần biết các định nghĩa sau:
```
//This defines the type of HTTP method used to perform the request
enum HTTPMethod: String {
    case post = "POST"
    case put = "PUT"
    case get = "GET"
    case delete = "DELETE"
    case patch = "PATCH"
}

//This defines the parameters to pass along with the request
enum RequestParams {
    case body(_: [String: Any]?)
    case url(_: [String: Any]?)
}

//This is the `APIRequest` protocol you may implement other classes can conform
protocol APIRequest {
    associatedtype Resource: Decodable
    var baseURL: URL { get }
    var path: String { get }
    var method: HTTPMethod { get }
    var parameters: RequestParams { get }
    var headers: [String: Any]? { get }
}
```
Hãy tưởng tượng chúng ta có một lớp APIClient để thực thi các yêu cầu truy cập mạng. Và lớp đó có một phương thức để xây dựng URLRequests. Nó sẽ trông như thế này:
```
class APIClient {
    
    // Rest of code
    
    func buildURLRequest<T: APIRequest>(for request: T) throws -> URLRequest {
        do {
            var urlRequest = URLRequest(url: request.baseURL.appendingPathComponent(request.path),
                                        cachePolicy: .reloadIgnoringLocalAndRemoteCacheData,
                                        timeoutInterval: 100)
            urlRequest.httpMethod = request.method.rawValue

            request.headers?.forEach {
                urlRequest.addValue($0.value as! String, forHTTPHeaderField: $0.key)
            }

            urlRequest = try buildRequestParams(urlRequest, params: request.parameters)

            return urlRequest
        } catch {
            throw APIError.requestBuilderFailed
        }
    }

    fileprivate func buildRequestParams(_ urlRequest: URLRequest, params: RequestParams) throws -> URLRequest {
        var urlRequest = urlRequest
        urlRequest = try params.encoder.encode(urlRequest,
                                               with: params.parameters)
        return urlRequest
    }
}
```
Bạn có thể thấy, phương thức này khá dài và cũng có nhiều hơn một nhiệm vụ thực thi.  Điều này cũng phá vỡ nguyên tắc SRP-Single Responsibility Principle (S.O.L.I.D).

Sử dụng một chút kiến thức về design pattern để giải quyết vấn đề này như sau.

### **Builder** đã đến lúc thể hiện

Đây là một kịch bản hợp lý để sử dụng **Builder**  design pattern.

> **Builder** là **Creational** Design Pattern cho phép bạn xây dựng các đối tượng phức tạp từng bước. Builder cho phép bạn tạo các kiểu và các đại diện khác nhau của một đối tượng bằng cách sử dụng cùng một mã xây dựng.
> 
Về cơ bản mô hình này giúp chúng ta xây dựng các đối tượng phức tạp một cách dễ dàng hơn.

Chúng ta sẽ tiến hành tạo lớp URLRequestBuilder:

```
class URLRequestBuilder {
    
    var baseURL: URL
    var path: String
    var method: HTTPMethod = .get
    var headers: [String: Any]?
    var parameters: RequestParams?
    
    init(with baseURL: URL, path: String) {
        self.baseURL = baseURL
        self.path = path
    }
    
    @discardableResult
    func set(method: HTTPMethod) -> Self {
        self.method = method
        return self
    }
    
    @discardableResult
    func set(path: String) -> Self {
        self.path = path
        return self
    }

    @discardableResult
    func set(headers: [String: Any]?) -> Self {
        self.headers = headers
        return self
    }
    
    @discardableResult
    func set(parameters: RequestParams?) -> Self {
        self.parameters = parameters
        return self
    }
    
    func build() throws -> URLRequest {
        do {
            var urlRequest = URLRequest(url: baseURL.appendingPathComponent(path),
                                        cachePolicy: .reloadIgnoringLocalAndRemoteCacheData,
                                        timeoutInterval: 100)
            urlRequest.httpMethod = method.rawValue
            
            headers?.forEach {
                urlRequest.addValue($0.value as! String, forHTTPHeaderField: $0.key)
            }
            
            if let params = parameters {
                urlRequest = try buildRequestParams(urlRequest, params: params)
            }
            
            return urlRequest
        } catch {
            throw APIError.requestBuilderFailed
        }
    }
    
    fileprivate func buildRequestParams(_ urlRequest: URLRequest, params: RequestParams) throws -> URLRequest {
        var urlRequest = urlRequest
        urlRequest = try params.encoder.encode(urlRequest,
                                               with: params.parameters)
        return urlRequest
    }
}
```

> Trên mỗi phương thức có một từ khóa @discardableResult. Từ khóa này để việc Xcode tránh cảnh báo về kết quả được trả về mà mình không sử dụng.
> 
Lớp này có tất cả các thuộc tính chúng ta cần để tạo URLRequest, một số trong số chúng là tùy chọn và một số khác là bắt buộc. Sau đó, chúng ta sẽ xác định các bước, mỗi bước cài đặt phương thức sẽ giống như bước mà chúng ta cần để tạo đối tượng của mình.

Cuối cùng, chúng ta có một phương thức biên dịch, thu thập tất cả thông tin và tạo đối tượng cuối cùng.

```
class APIClient {

  // Rest of code
  
  func buildURLRequest<T: APIRequest>(for request: T) throws -> URLRequest {
    return try URLRequestBuilder(with: request.baseURL, path: request.path)
        .set(method: request.method)
        .set(headers: request.headers)
        .set(parameters: request.parameters)
        .build()
  }
}
```

Kết quả là cho ta một lớp dễ đọc dễ hiểu, chỉ có 5 dòng mã và chỉ có nhiệm vụ.

###  Thực hành xem sao

Chúng ta có thể viết thêm 1 lớp Service để triển khai việc load các API cần thiết vào trong đó.
Ví dụ như sau: 
```
import Foundation

typealias RequestCallback = (Data?, URLResponse?, Error?) -> Void

public class NotiService {
    static func getNoti(completion: @escaping RequestCallback) {
        let urlRequestBuilder:URLRequestBuilder = URLRequestBuilder.init(with: URL(string:"https://api.myjson.com/")!, path: "bins/ki5o0")
        urlRequestBuilder.set(method: .get)
        let urlRequest = try! urlRequestBuilder.build()

        let session = URLSession(configuration: URLSessionConfiguration.default)
        
        let task = session.dataTask(with: urlRequest, completionHandler: { (data, response, error) in
            completion(data, response, error)
        })
        task.resume()
    }
}
```

Khởi tạo một biến urlRequestBuilder và sử dụng các phương thức đã được định nghĩa từ trước để set các thuộc tính cần thiết.
Và sử dụng thêm phần URLSession để thực hiện việc load urlRequest đã được tạo ra. 
> Tất nhiên, việc này chỉ là tạm thời để kiểm tra tính năng của phần URLRequestBuilder mà chúng ta đã tạo. Phần này sẽ được phát triển ở những phần sau của loạt bài viết này.
> 

Gọi func getNoti() ở đâu đó muốn load và cùng xem kết quả sẽ như thế nào

```
class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        getNotiApi()
    }

    func getNotiApi() {
        NotiService.getNoti {  (data, response, error) in
            guard let data = data, let response = response else { return }
            print(String(data: data, encoding: .utf8)!)
            print("\n\n\n \(response)")
        }
    }
}
```
 ![](https://images.viblo.asia/1ee82ce7-615c-4a81-ae76-76e6dd958dec.png)
 
 Kết quả nhận được như hình trên.
 
 Source code đầy đủ mọi người có thể tham khảo tại đây
 https://github.com/tuannd-1671/BaseNetworking
 
 Phần 1 của loạt bài viết xin được dừng lại tại đây.
 Ở phần tiếp theo chúng ta sẽ thêm RequestAdapter và các phương thức xử lý dữ liệu nhận về mục đích đạt được là  xây dựng một base Networking đơn giản và hiệu quả!
Rất mong nhận được góp ý từ bạn đọc! Xin cảm ơn (bow)