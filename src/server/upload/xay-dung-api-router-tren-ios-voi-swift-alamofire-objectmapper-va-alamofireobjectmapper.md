Bài viết này dành cho những người mới bắt đầu làm quen với iOS như mình, và với những đàn anh đi trước thì mình rất mong nhận được ý kiến đóng góp anh em cùng nâng cao kiến thức

Mình mới làm quen với iOS Swift được 2 ngày, và cái mình lựa chọn đầu tiên đó là tích hợp việc tích hợp kết nối đến web API. Việc sử dụng các thư viện đã có rất nhiều bài hướng dẫn sử dụng trên mạng, và hướng dẫn cơ bản cũng nhan nhản nên mình xin phép không nói về các example của từng thư viện nhé. 
Yêu cầu phần tích hợp của mình đưa ra đó là:
- Cần quản lý các request một cách tập trung để thuận tiện cho việc maintain
- dễ dàng trong việc thêm xóa sửa các API mới
- Thực hiện convert kết quả trả về sang Object để có thể dùng luôn sau khi kết thúc request.

Không dài dòng thêm nữa, mình xin phép trình bày về cách làm của mình sau khi tìm hiểu và góp nhặt được dưới đây.

### Môi trường

Mình sử dụng môi trường như mô tả dưới đây, bạn nào sử dụng môi trường không giống thì tùy vào từng phiên bản thư viện thay thế các api thư viện cho phù hợp nhé
- **Swift**: 4.1
- **Alamofire**: 4.6
- **ObjectMapper**: 3.1
- **AlamofireObjectMapper**: 5.0

### Tích hợp vào trong project

Mở Podfile trong thư mục dự án và điền vào như dưới đây

```
# Uncomment the next line to define a global platform for your project
  platform :ios, '9.0'

target 'DemoApp' do
  # Comment the next line if you're not using Swift and don't want to use dynamic frameworks
  use_frameworks!

  # Pods for DemoApp
  pod 'Alamofire', '~> 4.6'
  pod 'ObjectMapper', '~> 3.1'
  pod 'AlamofireObjectMapper', '~> 5.0'
  
end

```

Sau đó mở `Terminal` lên, `cd` đên thư mục chứa dự án và chạy lệnh sau để cài đặt các thư viện được khai báo vào trong dự án
```
pod install
```

### Phát triển
Giờ ta bắt tay vào code thôi ^^!

Trước tiên mình sẽ cần khai báo một số thông tin trong file **Configs.swift** như sau

```swift
//
//  Configs.swift
//  DemoApp
//
//  Created by Tien Dang on 6/22/18.
//  Email: quyettien.uet@gmail.com
//

import Foundation

struct Production {
    static let BASE_URL: String = "https://your_base_url.com/api/" // Thay thế bằng Base url mà bạn sử dụng ở đây
}

enum NetworkErrorType {
    case API_ERROR
    case HTTP_ERROR
}
```

`NetworkErrorType` là enum mình dùng để định nghĩa loại lỗi, sẽ được dùng để phân biệt lỗi do server API trả về hay lỗi do việc gọi đến API

Tiếp theo mình sẽ tạo file **APIRouter.swift** với nội dung như sau

```swift
//
//  APIRouter.swift
//  DemoApp
//
//  Created by Tien Dang
//  Email: quyettien.uet@gmail.com
//

import Foundation
import Alamofire

enum APIRouter: URLRequestConvertible {
    // =========== Begin define api ===========
    case login(email: String, password: String)
    case changePassword(pass: String, newPass: String, confirmNewPass: String)
    
    // =========== End define api ===========
    
    // MARK: - HTTPMethod
    private var method: HTTPMethod {
        switch self {
        case .login, .changePassword:
            return .post
        }
    }
    
    // MARK: - Path
    private var path: String {
        switch self {
        case .login:
            return "v1/user/login"
        case .changePassword:
            return "v1/user/change_password"
        }
    }
    
    // MARK: - Headers
    private var headers: HTTPHeaders {
        var headers = ["Accept": "application/json"]
        switch self {
        case .login:
            break
        case .changePassword:
            headers["Authorization"] = getAuthorizationHeader()
            break
        }
        
        return headers;
    }

    // MARK: - Parameters
    private var parameters: Parameters? {
        switch self {
        case .login(let email, let password):
            return [
                "email": email,
                "password": password
            ]
        case .changePassword(let pass, let newPass, let confirmNewPass):
            return[
                "password": pass,
                "new_password": newPass,
                "new_password_confirmation": confirmNewPass
            ]
        }
    }

    // MARK: - URL request
    func asURLRequest() throws -> URLRequest {
        let url = try Production.BASE_URL.asURL()
        
        // setting path
        var urlRequest: URLRequest = URLRequest(url: url.appendingPathComponent(path))
        
        // setting method
        urlRequest.httpMethod = method.rawValue
        
        // setting header
        for (key, value) in headers {
            urlRequest.addValue(value, forHTTPHeaderField: key)
        }
        
        if let parameters = parameters {
            do {
                urlRequest = try URLEncoding.default.encode(urlRequest, with: parameters)
            } catch {
                print("Encoding fail")
            }
        }
        
        return urlRequest
    }
    
    private func getAuthorizationHeader() -> String? {
        return "Authorization token"
    }
}

```
File **APIRouter.swift** được sử dụng làm file chính để bọc tất cả các khai báo về API của bạn.
Trong file này các bạn cần chú ý các thành phần như sau:

1. Phần nằm giữa hai dòng cmt `Begin define api` và `End define api` là khai báo các API mà bạn có đồng thời khai báo các tham số tương ứng sử dụng cho API đó
2. Phần `// MARK: - HTTPMethod`: Trả về HTTP request method được sử dụng cho API tương ứng. Ở đây cả hai API ủa mình để sử dụng method POST
3. Phần `// MARK: - Path`: Trả về path của API
4. Phần `// MARK: - Headers`: Trả về các giá trị được sử dụng cho request header
5. Phần `// MARK: - Parameters`: Trả về request parameter. Ở đây các bạn sẽ cần định nghĩa các tham số đầu vào của từng API tương ứng với key nào trong việc thực hiện API request
6. Phần `// MARK: - URL request`: Cần chú ý nhất tới function `asURLRequest()`. Funtion này sẽ convert các thông tin mà bạn đã khai báo ở các phần bên trên sau đó trả ra một URLRequest. URLRequest trả ra sẽ được sử dụng trong `Alamofile`

Ok, như vậy chúng ta đã hoàn thành việc tạo ra một API Router với mục đích gom tất các API lại một nơi để xử lý tâp trung. Tiếp Theo chúng ta sẽ đến phần gọi API với `Alamofile` và xử lý dữ liệu trả về để convert sang Object

Dữ liệu server của mình trả lại sẽ có định dạng như sau

```json
{
    "status": "success"
    "code": 200,
    "message": "Login successfully",
    "data": {
        ......
    }
}
```
Hai trường đáng chú ý nhất:
- `code`: trả về mã của response. Với quy định đã được thống nhất giữa client và server api là `code` bằng 200 tương ứng với việc server xử lý thành công. Ngoài code 200 thì các mã code khác được coi là lỗi.
- `data`: trả về thông tin của đối tượng mà client đang yêu cầu

Và dưới đây mình tạo file **BaseResponse.swift**

```swift
//
//  BaseResponse.swift
//  DemoApp
//
//  Created by Tien Dang
//  Email: quyettien.uet@gmail.com
//

import Foundation
import ObjectMapper

class BaseResponse<T: Mappable>: Mappable {
    var status: String?
    var code: Int?
    var message: String?
    var data: T?
    
    required init?(map: Map) {
    }
    
    func mapping(map: Map) {
        status <- map["status"]
        code <- map["code"]
        message <- map["message"]
        data <- map["data"]
    }
    
    func isSuccessCode() -> Bool? {
        return code == 200
    }
}


class BaseResponseError {
    var mErrorType: NetworkErrorType!
    var mErrorCode: Int!
    var mErrorMessage: String!
    
    init(_ errorType: NetworkErrorType,_ errorCode: Int,_ errorMessage: String) {
        mErrorType = errorType
        mErrorCode = errorCode
        mErrorMessage = errorMessage
    }
}
```

Ở đây mình định nghĩa hai class để chứa đựng các thông tin nhận được.

- **class BaseResponse<T: Mappable>: Mappable**: sẽ chứa đựng thông tin được convert từ json mà server trả về. Class này có sử dụng generic T để đại diện cho object mà server sẽ trả về trong key `data`. Vì với mỗi một API thì data trả ra là khác nhau nên chúng ta sử dụng T để đại diện chung cho tất cả các loại. Sau đó, tùy theo API mà chúng ta sẽ quy định loại class tương ứng với Data. Điều này sẽ được đề cập ở phần dưới của bài viết này.
- **class BaseResponseError**: chứa các thông tin về lỗi sau khi thực hiện gọi API

Tiếp theo mình tạo file **MGConnection.swift** để thực hiện việc request

```swift
//
//  MGConnection.swift
//  DemoApp
//
//  Created by Tien Dang
//  Email: quyettien.uet@gmail.com
//

import Foundation
import Alamofire
import ObjectMapper

class MGConnection {
    
    static func isConnectedToInternet() ->Bool {
        return NetworkReachabilityManager()!.isReachable
    }
    
    static func request<T: Mappable>(_ apiRouter: APIRouter,_ returnType: T.Type, completion: @escaping (_ result: T?, _ error: BaseResponseError?) -> Void) {
        if !isConnectedToInternet() {
            // Xử lý khi lỗi kết nối internet
            return
        }
        
        Alamofire.request(apiRouter).responseObject {(response: DataResponse<BaseResponse<T>>) in
            switch response.result {
            case .success:
                if response.response?.statusCode == 200 {
                    if (response.result.value?.isSuccessCode())! {
                        completion((response.result.value?.data)!, nil)
                    } else {
                        let err: BaseResponseError = BaseResponseError.init(NetworkErrorType.API_ERROR, (response.result.value?.code)!, (response.result.value?.message)!)
                        completion(nil, err)
                    }
                } else {
                    let err: BaseResponseError = BaseResponseError.init(NetworkErrorType.HTTP_ERROR, (response.response?.statusCode)!, "Request is error!")
                    completion(nil, err)
                }
                break
                
            case .failure(let error):
                if error is AFError {
                    let err: BaseResponseError = BaseResponseError.init(NetworkErrorType.HTTP_ERROR, error._code, "Request is error!")
                    completion(nil, err)
                }
                
                break
            }
        }
    }
}
```

Phương thức cần chú ý ở đây là 

`static func request<T: Mappable>(_ apiRouter: APIRouter,_ returnType: T.Type, completion: @escaping (_ result: T?, _ error: BaseResponseError?) -> Void)`

Trong đó các tham số có ý nghĩa như sau
- **apiRouter** : Tham số quy định API mà bạn muốn gọi tới. Tham số này lấy trong `APIRouter.swift` đã được khai báo trước đó
- **returnType**: được định nghĩa kiểu T.Type chính là kiểu đối tượng mà bạn muốn convert từ dữ liệu server trả về trong key `data` của json
- **completion: @escaping (_ result: T?, _ error: BaseResponseError?) -> Void**: thực thi với kết quả sau khi request

**Chú ý**: Trong `case .success:` Trường hợp này mình quy định khi HTTP response code là 200 mới được coi là thành công, các HTTP response code khác đều được coi là lỗi (404, 405.....) và HTTP response code khác với trường `code` trong json trả về. Vì thế nên tùy trường hợp mà các bạn custom lại file này nhé.

### Thực thi
Như vậy, việc tạo lớp để thực hiện request và convert đối tượng trả về đã xong, bây giờ chúng ta sẽ đến phần implement những gì đã viết ở trên

#### API login
Với API login, dữ liệu trả về sẽ có định dạng như sau:

```json
{
    "status": "success",
    "code": 200,
    "message": "Login successfully",
    "data": {
        "user": {
            "id": 86,
            "role_id": 4,
            "fullname": "Tien Dang",
            "email": "quyettien.uet@gmail.com",
            "dob": null,
            "avatar": null,
            "status": "active",
            "created_at": "2018-06-23 16:11:40",
            "updated_at": "2018-06-23 16:22:40",
            "phone": null
        },
        "auth": {
            "token_type": "A",
            "expires_in": 2592000,
            "access_token": "xxxxxxxx",
            "refresh_token": "xxxxxxxx"
        }
    }
}
```

Vậy mình sẽ tạo ra hai hai object tương ứng với `user` và `auth` như dưới đây

File **User.swift**
```swift
//
//  User.swift
//  DemoApp
//
//  Created by Tien Dang
//  Email: quyettien.uet@gmail.com
//

import Foundation
import ObjectMapper

class User:Mappable {
    var id: Int?
    var roleId: Int?
    var fullname: String?
    var email: String?
    var dateOfBirth: String?
    var avatar: String?
    var status: String?
    var createdAt: String?
    var updatedAt: String?
    var phone: String?
    
    required init?(map: Map) {
    }
    
    func mapping(map: Map) {
        id <- map["id"]
        roleId <- map["role_id"]
        fullname <- map["fullname"]
        email <- map["email"]
        dateOfBirth <- map["dob"]
        avatar <- map["avatar"]
        status <- map["status"]
        createdAt <- map["created_at"]
        updatedAt <- map["updated_at"]
        phone <- map["phone"]
    }
}
```

và file **Auth.swift**
```swift
//
//  Auth.swift
//  DemoApp
//
//  Created by Tien Dang
//  Email: quyettien.uet@gmail.com
//

import Foundation
import ObjectMapper

class Auth: Mappable {
    var tokenType: String?
    var expiresIn: Int?
    var accessToken: String?
    var refreshToken: String?
    
    required init?(map: Map) {
    }
    
    func mapping(map: Map) {
        tokenType <- map["token_type"]
        expiresIn <- map["expires_in"]
        accessToken <- map["access_token"]
        refreshToken <- map["refresh_token"]
    }
}

```

Tiếp theo mình sẽ tạo một class để quy định response trả về trong key `data` với **LoginResponse.swift** như sau

```swift
//
//  LoginResponse.swift
//  DemoApp
//
//  Created by Tien Dang
//  Email: quyettien.uet@gmail.com
//

import Foundation
import ObjectMapper

class LoginResponse: Mappable {
    var user: User?
    var auth: Auth?
    
    required init?(map: Map) {
    }
    
    func mapping(map: Map) {
        user <- map["user"]
        auth <- map["auth"]
    }
}
```

Cuối cùng, trong ViewController mình gọi đến login như sau
```swift
MGConnection.request(APIRouter.login(email: "tiendang@gmail.com", password: "123456789"), LoginResponse.self,
                     completion: {(result, err) in
    guard err == nil else {
        print("False with code: \(err?.mErrorCode) and message: \(err?.mErrorMessage)")
        return
    }
            
    print("Fullname: " + (result?.user?.fullname)!)
})
```

Trong việc gọi ở trên chúng ta thấy có tham số đầu vào của `MGConnection.request` là `LoginResponse.self`. như vậy kết quả trả ra convert dữ liệu trong key `data` thành object kiểu `LoginResponse`.

Bản thân sau khi cài đặt theo cách thức trên mình thấy việc gọi api khá đơn giản và việc xử lý dữ liệu mà API trả về cũng rất nhanh, không phải mất thêm các bước convert bằng cơm như trong các example mà mình đọc được.
Hi vọng bài viết này sẽ giúp đỡ được cho các anh em mới tập tẹ nghịch ngợm với iOS như mình. Đồng thời rất mong nhận được ý kiến đóng góp từ các anh em có nhiều kinh nghiệm.

**-- The End --**