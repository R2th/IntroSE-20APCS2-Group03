Đây là bài dịch từ của một chia sẻ trên trang [medium](https://medium.com/), bài viết nguồn mời các bạn xem tại đây: https://theiconic.tech/making-your-swift-code-more-testable-with-dependency-injection-and-protocols-b3cc0cc80173

Không khó để tìm thấy các ứng dụng iOS được thiết kế như sau: một lớp xử lý các yêu cầu đăng nhập và trả về một đối tượng người dùng và một lớp khác được sử dụng với một **singleton** trên ứng dụng để dễ dàng truy cập vào người dùng hiện tại.

```
struct User {
    
    let name: String
    
    init(name: String) {
        
        self.name = name
    }
}

class AuthenticationClient {
    
    func login(username: String, password: String, onCompletion: @escaping (User?, Error?) -> Void) {
        
        let data: [String: Any] = ["username": username, "password": password]
        
        let url = URL(string: "mybaseurl.com/oauth")!
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.addValue("application/json", forHTTPHeaderField: "Accept")
        
        let json = try? JSONSerialization.data(withJSONObject: data, options: [])
        
        request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Content-Type")
        
        request.httpBody = json
        
        let task = URLSession.shared.dataTask(with: request) { (data, urlResponse, error) -> Void in
            
            if let data = data, data.count > 0,
                let response = try? JSONSerialization.jsonObject(with: data, options: [.allowFragments]) as? [String: Any] {
                
                DispatchQueue.main.async {
                    
                    onCompletion(User(name: (response?["name"] as? String) ?? ""), nil)
                }
            }
            else {
                
                DispatchQueue.main.async {
                    
                    onCompletion(nil, NSError(domain: "error", code: (urlResponse as? HTTPURLResponse)?.statusCode ?? 0, userInfo: nil))
                }
            }
        }
        
        task.resume()
    }
}

class UserSession {
    
    static let shared: UserSession = UserSession()
    
    private (set) var currentUser: User?
    
    var isLoggedIn: Bool {
        
        return currentUser != nil
    }

    func login(username: String, password: String, onError: @escaping (String) -> Void) {
        
        AuthenticationClient().login(username: username, password: password) { (user, error) in
            
            if let user = user, error == nil {
                
                self.currentUser = user
                
                // Broadcast to the whole app the login status update
                NotificationCenter.default.post(name: Notification.Name("userLoginStatusUpdatedNotification"), object: nil)
            }
            else {
                
                onError("There was an error processing your login. Please try again")
            }
        }
    }
    
    func logout() {
        
        // perform any logout operation
        
        currentUser = nil
        
        // Broadcast to the whole app the login status update
        NotificationCenter.default.post(name: Notification.Name("userLoginStatusUpdatedNotification"), object: nil)
    }
}
```

Mặc dù mô hình này đơn giản và được sử dụng rộng rãi, nhưng nó có thể gây khó khăn cho bạn khi cố gắng viết các bài kiểm tra cho mã này.
Một số vấn đề mà chúng ta có thể gặp phải như sau:
* **AuthenticationClient** không thể được kiểm tra mà không thực hiện một request thực sự đến máy chủ. Ngoài ra, thật khó để giả lập được tất cả các kịch bản thành công và thất bại.
* Phương thức **login** của **UserSession** gọi phương thức **request** của **AuthenticationClient**, điều này sẽ dẫn đến cùng một vấn đề như ở trên.
* Các phương thức **login**, **logout** của **UserSession** đều kích hoạt một **Notification** thông qua **NotificationCenter**. Chúng ta có thể thử test điều đó nhưng vì các thông báo được phát trên toàn ứng dụng, nên có thể dẫn đến các sự cố khi các bài kiểm tra đang chạy song song, khiến các phần khác của ứng dụng thay đổi theo một cách không lường trước được.

Đây chỉ là một vài trong số những thách thức bạn sẽ gặp phải khi test một phần nhỏ nhưng quan trọng này của ứng dụng. Một điểm đáng nói nữa là bằng cách sử dụng **singleton** **UserSession** sẽ khiến việc test các lớp sử dụng nó trở nên khó khăn hơn với cùng lý do chúng ta gặp vấn đề về **NotificationCenter** : các **singleton** là các thể hiện duy nhất có thể chia sẻ được. Sửa đổi chúng trong khi chạy nhiều bài test cùng một lúc có thể gây ra lỗi khiến bất cứ ai phát điên trong vài phút! 

### Dependency Injection FTW
Bước đầu tiên để refactor mã của chúng ta và đảm bảo rằng nó có thể tést được là áp dụng một khái niệm gọi là **[Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection)**. Nói ngắn gọn, điều này có nghĩa là chúng ta phải cho phép các lớp của chúng ta nhận được tất cả các phụ thuộc bên ngoài của chúng trong các hàm khởi tạo của chúng và khi kiểm tra bằng cách **dependency injection**, chúng ta có thể giả lập một số phụ thuộc đó để chúng trả về các giá trị mà chúng ta mong muốn. Điều này cho phép chúng ta có kết quả có thể dự đoán được trong các bài test.
Ví dụ: việc đưa một thể hiện của **URLSession** vào hàm khởi tạo của **AuthenticationClient** sẽ cho phép chúng ta ghi đè phương thức **dataTask**, cái có thể trả về một số dữ liệu dự kiến mà chúng ta có thể sử dụng để xác thực logic có trong trình xử lý hoàn thành. Tuy nhiên, có nhiều cách tốt hơn và rõ ràng hơn để làm điều đó bằng cách sử dụng các **Protocol**.
```
protocol URLSessionProtocol: class {
    
    func dataTask(with request: URLRequest, completionHandler: @escaping (Data?, URLResponse?, Error?) -> Void) -> URLSessionDataTask
}

extension URLSession: URLSessionProtocol { }
```

Bằng cách sao chép phương thức **dataTask** của **URLSession** của Apple và đưa nó vào trong **protocol** và làm **URLSession** phù hợp với **protocol** này chúng ta sẽ tạo ra một ràng buộc với bất kì lớp nào sử dụng **URLSessionProtocol**. Chỉ những phương thức có trong protocol này mới có thể truy cập được từ các thể hiện phù hợp với nó. Tuy nhiên, có một hạn chế trong việc thực hiện hiện tại của chúng ta. Phương thức **dataTask** sẽ trả về một thể hiện của **URLSessionDataTask** sẽ gây ra sự cố khi test, vì chúng tôi không thể test trước khi hàm **resume** được gọi.
Để khắc phục điều này, hãy tạo một protocol cho nó. **URLSession** hiện có một phương thức mới có cùng tên như trước đây nhưng phương thức này đang trả về một thể hiện của **URLSessionDataTaskProtocol**.
```
protocol URLSessionDataTaskProtocol {
    
    func resume()
}

extension URLSessionDataTask: URLSessionDataTaskProtocol { }

protocol URLSessionProtocol: class {
    
    func dataTask(with request: URLRequest, completionHandler: @escaping (Data?, URLResponse?, Error?) -> Void) -> URLSessionDataTaskProtocol
}

extension URLSession: URLSessionProtocol {

    func dataTask(with request: URLRequest, completionHandler: @escaping (Data?, URLResponse?, Error?) -> Void) -> URLSessionDataTaskProtocol {
        
        // The double casting is necessary because both methods have the same name and the compiler gets lost
        return ((dataTask(with: request, completionHandler: completionHandler) as URLSessionDataTask) as URLSessionDataTaskProtocol)
    }
}
```

Đây là một cách tiếp cận cực kỳ mạnh mẽ vì nó trừu tượng hóa các đối tượng thực hiện nó. Một trong những đối tượng đó có thể là lớp **URLSession** của Apple hoặc lớp giả mà chúng ta đã tạo để test cho client mà không cần đến server.
Ý tưởng tương tự cũng được áp dụng cho **NotificationCenter**.
```
protocol NotificationCenterProtocol {
    
    func post(name aName: NSNotification.Name, object anObject: Any?)
    
    func addObserver(_ observer: Any, selector aSelector: Selector, name aName: NSNotification.Name?, object anObject: Any?)
}

extension NotificationCenter: NotificationCenterProtocol {}

extension Notification.Name {
    
    static let userLoginStatusUpdatedNotification = Notification.Name(rawValue: "userLoginStatusUpdatedNotification")
}
```

### Breaking down the code
Trong ví dụ này, chúng ta chỉ có một lớp client, nhưng hầu hết các ứng dụng sẽ yêu cầu nhiều lớp client, thường là một lớp cho mỗi endpoint hoặc hơn. Phải viết các bài test cho toàn bộ hoạt động yêu cầu cho mỗi lớp là đau đớn thêm nữa, ngoài các vấn đề đã được đề cập ở trên. Chúng ta có thể làm tốt hơn! Chúng ta hãy chuyển một số mã cốt lõi của phần request sang một lớp **HttpClient**.
```
typealias JSONDictionary = [String: Any]

enum HttpMethod: String {
    
    case GET = "GET"
    case DELETE = "DELETE"
    case POST = "POST"
    case PUT = "PUT"
}

enum HttpError {
    
    case json
    case parsing
    case unknown
}

enum Result<T> {
    
    case failed(HttpError)
    case successful(T)
}

protocol HttpClientProtocol {
    
    func request(endpoint: String, httpMethod: HttpMethod, bodyData: JSONDictionary?, onCompletion: @escaping (Result<JSONDictionary>) -> Void)
}

final class HttpClient: HttpClientProtocol {
    
    private let baseUrl: String
    
    private let urlSession: URLSessionProtocol
    
    convenience init() {
        
        self.init(baseUrl: "mybaseurl.com", urlSession: URLSession.shared)
    }
    
    init(baseUrl: String, urlSession: URLSessionProtocol) {
        
        self.baseUrl = baseUrl
        self.urlSession = urlSession
    }
    
    func request(endpoint: String, httpMethod: HttpMethod, bodyData: JSONDictionary?, onCompletion: @escaping (Result<JSONDictionary>) -> Void) {
        
        guard let url = URL(string: baseUrl + endpoint) else { return }
        
        var request = URLRequest(url: url)
        request.httpMethod = httpMethod.rawValue
        request.addValue("application/json", forHTTPHeaderField: "Accept")
        
        if let bodyData = bodyData, httpMethod == .POST || httpMethod == .PUT {
            
            do {
                
                let json = try JSONSerialization.data(withJSONObject: bodyData, options: [])
                
                request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Content-Type")
                
                request.httpBody = json
            }
            catch {
                
                DispatchQueue.main.async {
                    
                    onCompletion(.failed(.json))
                }
                
                return
            }
        }
        
        let task = urlSession.dataTask(with: request) { (data, urlResponse, error) -> Void in
            
            var errorResponse = HttpError.unknown
            
            do {
                
                if let data = data, data.count > 0,
                    let response = try JSONSerialization.jsonObject(with: data, options: [.allowFragments]) as? JSONDictionary {
                    
                    DispatchQueue.main.async {
                        
                        onCompletion(.successful(response))
                    }
                        
                    return
                }
            }
            catch {
                
                // handle error properly
                errorResponse = .json
            }
            
            DispatchQueue.main.async {
                
                // ideally we'd map the error properly
                onCompletion(.failed(errorResponse))
            }
        }
        
        task.resume()
    }
}
```

Để làm cho mọi thứ đẹp hơn một chút, chúng ta đã thực hiện thêm một vài thay đổi trong mã:
* Khai báo một **typealias** cho từ điển cho dữ liệu đẩy lên và nhận về từ server.
* Tạo một **enum** cho tất cả các phương thức **REST** mà chúng ta hỗ trợ.
* Tạo một **enum** kết quả với các loại liên quan để trả về một phản hồi thành công hoặc thất bại. Với điều này, chúng ta có thể tránh việc sử dụng nhiều tham số tùy chọn trong một **closure** hoặc thậm chí nhiều**closure** cho mỗi kết quả.
* Tạo một phương thức **init** tiện lợi với các giá trị mặc định của chúng ta. Điều này làm cho mã chúng ta viết trong ứng dụng rõ ràng hơn mà không cần phải tiêm tất cả các trường hợp theo cách thủ công. Chúng thường chỉ được tiêm thủ công khi viết test.
Bây giờ chúng ta có thể đưa lớp mới **HttpClient** vào **AuthenticationClient**, áp dụng các khái niệm mới mà chúng ta vừa giới thiệu.
```
protocol AuthenticationClientProtocol {
    
    func login(username: String, password: String, onCompletion: @escaping (Result<User>) -> Void)
}

final class AuthenticationClient: AuthenticationClientProtocol {
    
    private let httpClient: HttpClientProtocol
    
    convenience init() {
        
        self.init(httpClient: HttpClient())
    }
    
    init(httpClient: HttpClientProtocol) {
        
        self.httpClient = httpClient
    }
    
    func login(username: String, password: String, onCompletion: @escaping (Result<User>) -> Void) {
        
        let data: JSONDictionary = ["username": username, "password": password]
        
        httpClient.request(endpoint: "/oauth", httpMethod: .POST, bodyData: data) { result in
            
            switch result {
                
            case .successful(let dictionary):
                
                if let name = dictionary["name"] as? String {
                    
                    onCompletion(.successful(User(name: name)))
                }
                else {
                    
                    onCompletion(.failed(.parsing))
                }
                
            case .failed(let error):
                
                onCompletion(.failed(error))
            }
        }
    }
}
```

Khi kiểm tra điều này, tất cả những gì chúng ta cần làm là triển khai một lớp giả phù hợp với **HttpClientProtocol** với phản hồi dự kiến và đưa nó vào một thể hiện của **AuthenticationClient**. Điều này sẽ cho phép chúng ta tập trung vào kiểm tra kết quả phân tích cú pháp và xử lý lỗi. Chúng tôi sẽ không lo lắng về yêu cầu ở đây vì điều đó sẽ được đề cập trong bài kiểm tra cho **HTTPClient**. Hãy xem ví dụ thử nghiệm dưới đây.
```
import Foundation
import XCTest
@testable import DependencyInjectionAndTests

// Helper class that implements the protocol necessary to test the AuthenticationClient
class HttpClientMock: HttpClientProtocol {
    
    // These two variables will allow us to define what's the expected result of the `request` method
    var mockDataTask: URLSessionDataTask?
    var mockResult: Result<JSONDictionary>?
    
    func request(endpoint: String, httpMethod: HttpMethod, bodyData: JSONDictionary?, onCompletion: @escaping (Result<JSONDictionary>) -> Void) {
        
        if let result = mockResult {
            
            onCompletion(result)
        }
    }
}

func testReturnsUserForValidResponse() {
        
    // We create an instance of a mock class that conforms to HttpClientProtocol
    let httpClient = HttpClientMock()
        
    // we make this mock class return an expected dictionary
    httpClient.mockResult = .successful(["name": "Cassius"])
        
    // injecting the mock class in our class that's being tested
    let client = AuthenticationClient(httpClient: httpClient)
        
    var user: User?
    var error: HttpError?
        
    // we perform the method that will use our mock class' result, parse and return an object
    client.login(username: "username", password: "password") { result in
            
        switch result {
                
        case .successful(let resultUser):
                
            user = resultUser
                
        case .failed(let resultError):
                
            error = resultError
        }
    }
        
        // test if the dictionary was well parsed and returned an object User with the expected name
    XCTAssertEqual(user?.name, "Cassius")
    XCTAssertNil(error)
}
```

Bây giờ là lúc áp dụng thiết kế mới cho lớp **UserSession**. Nó sẽ nhận được các thể hiện **AuthenticationClientProtocol** và **NotificationCenterProtocol** trong hàm khởi tạo của nó.
```
protocol UserSessionProtocol {
    
    var currentUser: User? { get }
    
    var isLoggedIn: Bool { get }
    
    func login(username: String, password: String, onError: @escaping (String) -> Void)
    func logout()
}

final class UserSession: UserSessionProtocol {
    
    private let notificationCenter: NotificationCenterProtocol
    
    private let authenticationClient: AuthenticationClientProtocol
    
    static let shared: UserSession = UserSession()
    
    private (set) var currentUser: User?
    
    var isLoggedIn: Bool {
        
        return currentUser != nil
    }
    
    convenience init() {
        
        self.init(authenticationClient: AuthenticationClient(), notificationCenter: NotificationCenter.default)
    }
    
    init(authenticationClient: AuthenticationClientProtocol, notificationCenter: NotificationCenterProtocol) {
        
        self.authenticationClient = authenticationClient
        self.notificationCenter = notificationCenter
    }
    
    func login(username: String, password: String, onError: @escaping (String) -> Void) {
        
        authenticationClient.login(username: username, password: password) { (result) in
            
            if case .successful(let user) = result {
                
                self.currentUser = user
                
                // Broadcast to the whole app the login status update
                self.notificationCenter.post(name: .userLoginStatusUpdatedNotification, object: nil)
            }
            else {
                
                // TODO: read the error and return a proper error message
                onError("There was an error processing your login. Please try again")
            }
        }
    }
    
    func logout() {
        
        // perform any logout operation
        
        currentUser = nil
        
        // Broadcast to the whole app the login status update
        notificationCenter.post(name: .userLoginStatusUpdatedNotification, object: nil)
    }
}
```

Mặc dù **UserSession** có một singleton (thuộc tính dùng chung), khi sử dụng lớp này trong các phần khác của ứng dụng, hãy nhớ tiêm nó vào trình khởi tạo, giống như chúng ta đã làm với **URLSession** trong **HttpClient** để có thể kiểm tra được. Bạn có thể tạo một hàm init tiện lợi có **UserSession.shared** là giá trị mặc định.
```
import UIKit

class ViewController: UIViewController {

    private let session: UserSessionProtocol
    
    convenience init() {
        
        self.init(session: UserSession.shared)
    }
    
    init(session: UserSessionProtocol) {
        
        self.session = session
        
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder aDecoder: NSCoder) {
        
        fatalError("Use init(session:) instead")
    }
}
```

### Test all the things!
Chúng tôi đã cấu trúc lại ứng dụng của mình và giờ nó đã sẵn sàng để được kiểm tra đúng cách! Dưới đây là một số ví dụ khác về các trường hợp thử nghiệm cho lớp **HttpClient**.
```
import Foundation
import XCTest
@testable import DependencyInjectionAndTests

class URLSessionDataTaskMock: URLSessionDataTaskProtocol {
    
    private(set) var hasResumeBeenCalled = false
    
    func resume() {
        
        hasResumeBeenCalled = true
    }
}

class HttpClientTests: XCTestCase {
    
    func testCallsResume() {
        
        // This test ensures `resume()` is called for the task created
        
        let task = URLSessionDataTaskMock()
        
        let urlSession = URLSessionMock()
        urlSession.mockURLSessionDataTask = task
        
        let client = HttpClient(baseUrl: "baseurl.com", urlSession: urlSession)
        
        client.request(endpoint: "/endpoint", httpMethod: .GET, bodyData: nil) { result in }
        
        XCTAssertTrue(task.hasResumeBeenCalled)
    }
    
    func testReturnsJsonErrorForInvalidJsonFromServer() {
        
        // This test ensures that an invalid JSON received from the server triggers a .json error
        
        let expectation = self.expectation(description: "testReturnsSuccessfulDictionary")
        
        let urlSession = URLSessionMock()
        urlSession.mockData = "invalid json".data(using: .utf8)
        
        XCTAssertNotNil(urlSession.mockData)
        
        let client = HttpClient(baseUrl: "baseurl.com", urlSession: urlSession)
        
        var dictionary: JSONDictionary?
        var error: HttpError?
        
        client.request(endpoint: "/endpoint", httpMethod: .GET, bodyData: nil) { result in
            
            switch result {
                
            case .successful(let resultDictionary):
                
                dictionary = resultDictionary
                
            case .failed(let resultError):
                
                error = resultError
            }
            
            expectation.fulfill()
        }
        
        XCTWaiter().wait(for: [expectation], timeout: 1.0)
        
        XCTAssertNil(dictionary)
        XCTAssertEqual(error, .json)
    }
}
```

Một vài ví dụ nữa về các bài kiểm tra cho **UserSession**.
```
import Foundation
import XCTest
@testable import DependencyInjectionAndTests

class AuthenticationClientMock: AuthenticationClientProtocol {
    
    private(set) var usernameReceived: String?
    private(set) var passwordReceived: String?
    
    var mockResult: Result<User>?
    
    func login(username: String, password: String, onCompletion: @escaping (Result<User>) -> Void) {
        
        usernameReceived = username
        passwordReceived = password
        
        if let result = mockResult {
            
            onCompletion(result)
        }
    }
}

class NotificationCenterMock: NotificationCenterProtocol {
    
    private(set) var namePostReceived: NSNotification.Name?
    private(set) var objectPostReceived: Any?
    
    private(set) var nameObserverReceived: NSNotification.Name?
    private(set) var selectorObserverReceived: Selector?
    private(set) var objectObserverReceived: Any?
    
    func post(name aName: NSNotification.Name, object anObject: Any?) {
        
        namePostReceived = aName
        objectPostReceived = anObject
    }
    
    func addObserver(_ observer: Any, selector aSelector: Selector, name aName: NSNotification.Name?, object anObject: Any?) {
        
        nameObserverReceived = aName
        selectorObserverReceived = aSelector
        objectObserverReceived = anObject
    }
}

class UserSessionTests: XCTestCase {
    
    func testCurrentUserIsSetOnLogin() {
        
        let authentication = AuthenticationClientMock()
        authentication.mockResult = .successful(User(name: "Cassius"))
        
        let session = UserSession(authenticationClient: authentication, notificationCenter: NotificationCenterMock())
        
        session.login(username: "username", password: "password") { (error) in }
        
        XCTAssertEqual(session.currentUser?.name, "Cassius")
    }
    
    func testNotificationIsTriggeredOnLogin() {
        
        let authentication = AuthenticationClientMock()
        authentication.mockResult = .successful(User(name: "Cassius"))
        
        let notificationCenter = NotificationCenterMock()
        
        let session = UserSession(authenticationClient: authentication, notificationCenter: notificationCenter)
        
        session.login(username: "username", password: "password") { (error) in }
        
        XCTAssertEqual(notificationCenter.namePostReceived, Notification.Name.userLoginStatusUpdatedNotification)
    }
    
    func testNotificationIsTriggeredOnLogout() {
        
        let notificationCenter = NotificationCenterMock()
        
        let session = UserSession(authenticationClient: AuthenticationClientMock(), notificationCenter: notificationCenter)
        
        session.logout()
        
        XCTAssertEqual(notificationCenter.namePostReceived, Notification.Name.userLoginStatusUpdatedNotification)
    }
}
```

### Kết luận
Thiết kế mã của bạn sao cho dễ test hơn có vẻ không phải là một nhiệm vụ dễ dàng và bạn có thể nghĩ rằng nó không đáng để bỏ công sức, hoặc nó quá tốn thời gian. Tuy nhiên, không có gì giống như sự an tâm rằng lần tới khi bạn thay đổi thứ gì đó trong mã của mình, nó có thể được đánh giá dễ dàng bằng tất cả các test mà bạn đã viết.