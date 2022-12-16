Phần lớn các ưng dụng iOS hiện nay đều cần giao tiếp Server-Client thông qua giao thức HTTP, nhằm mục đích giao tiếp với một JSON API.

Trong bài viết này sẽ từng bước xây dựng một thư viện HTTP request đơn giản sử dụng URLSession, protocol Codable và Protocol oriented programming.

# Luồng hoạt động của một request
![](https://images.viblo.asia/ff859c7c-3cbe-447a-94e5-f77091b899e0.png)

Theo mô hình trên, khi thực hiện một HTTP request, thông tin trao đổi giữa ứng dụng và server có thể chia thành hai loại:
- Request: Cung cấp các thông tin cần thiết để có thể gửi yêu cầu tới server
- Response: Kết quả trả về từ server sau khi gửi request.

# Xây dựng Request
Để gửi một Request tới server ta cần cung cấp các thông tin sau:
- Địa chỉ URL của API cần gửi
- Phương thức HTTP sẽ sử dụng (get, post, put, patch, delete..,)
- Dữ liệu sẽ gửi đi
- Request header

Ta sẽ định nghĩa thông tin này thông qua cấu trúc RequestData
```
public struct RequestData {
    public let path: String
    public let method: HTTPMethod
    public let params: [String: Any?]?
    public let headers: [String: String]?
    
    public init (
        path: String,
        method: HTTPMethod = .get,
        params: [String: Any?]? = nil,
        headers: [String: String]? = nil
    ) {
        self.path = path
        self.method = method
        self.params = params
        self.headers = headers
    }
}
```

# Xây dựng Response
Response là kết quả trả về backend API (thường dưới định dạng JSON), nên ta cần phải định nghĩa cấu trúc dữ liệu ta sẽ nhận được là gì.
Để dễ dàng chuyển đổi qua lại giữa JSON object và struct dữ liệu nhận được ta sẽ sử dụng protocol Codable
```
struct ResponseType: Codable {
    let dataField1: Int
    let dataField2: String
}
```

# Kết hợp Request và Resposne
Như đã giải thích ở trên Response là kết quả trả về của Request sau khi được sử lý. Ta sử dụng Protocol oriented programming để thể hiện mối quan hệ này.
Ta sẽ tạo một protocol **RequestType** để kết nối Request và Response

```
public protocol RequestType {
    associatedtype ResponseType: Codable
    var data: RequestData { get }
}
```

# Xây dựng Dispatcher
Giao thức **RequestType** (ở trên) kết nối giữa dữ liệu request và dữ liệu response.
Ta cần xây dựng một protocol cho phép người dùng sử dụng request data là dữ liệu đầu vào và response data là dữ liệu đầu ra của kết quả request.
```
public protocol NetworkDispatcher {
    func dispatch(request: RequestData, onSuccess: @escaping (Data) -> Void, onError: @escaping (Error) -> Void)
}
```

Protocol trên có thể thực thi một cách đơn giản thông qua thư viện UrlSession.

```
public enum ConnError: Swift.Error {
    case invalidURL
    case noData
}

public struct URLSessionNetworkDispatcher: NetworkDispatcher {
    public static let instance = URLSessionNetworkDispatcher()
    private init() {}
    
    public func dispatch(request: RequestData, onSuccess: @escaping (Data) -> Void, onError: @escaping (Error) -> Void) {
        guard let url = URL(string: request.path) else {
            onError(ConnError.invalidURL)
            return
        }
        
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = request.method.rawValue
        
        do {
            if let params = request.params {
                urlRequest.httpBody = try JSONSerialization.data(withJSONObject: params, options: [])
            }
        } catch let error {
            onError(error)
            return
        }
        
        URLSession.shared.dataTask(with: urlRequest) { (data, response, error) in
            if let error = error {
                onError(error)
                return
            }
            
            guard let _data = data else {
                onError(ConnError.noData)
                return
            }
            
            onSuccess(_data)
        }.resume()
    }
}
```

Ta sẽ  cần phải thực thi protocol **RequestType** để thực hiện một request, và gọi các phương thức của protocol **NetworkDispatcher** để trả về kết quả của request.
```
public extension RequestType {
    public func execute (
        dispatcher: NetworkDispatcher = URLSessionNetworkDispatcher.instance,
        onSuccess: @escaping (ResponseType) -> Void,
        onError: @escaping (Error) -> Void
    ) {
        dispatcher.dispatch(
            request: self.data,
            onSuccess: { (responseData: Data) in
                do {
                    let jsonDecoder = JSONDecoder()
                    let result = try jsonDecoder.decode(ResponseType.self, from: responseData)
                    DispatchQueue.main.async {
                        onSuccess(result)
                    }
                } catch let error {
                    DispatchQueue.main.async {
                        onError(error)
                    }
                }
            },
            onError: { (error: Error) in
                DispatchQueue.main.async {
                    onError(error)
                }
            }
        )
    }
}
```

# Ví dụ
Trong bài viết này, ta có một Web API tại địa chỉ **htt://127.0.0.1:3000/test** trả về dữ liệu có dạng

```
[{
	"dataField1": "1",
	"dataField2": "1",
  },
  {
	"dataField1": "2",
	"dataField2": "2",
  },
  {
	"dataField1": "3",
	"dataField2": "3",
  }]
```
Để dụng API ở trên ta cần thực hiện các bước sau:
- Bước 1: Định nghĩa struct/class sử dụng protocol Codable
    ```
    struct SampleData: Codable {
            let dataField1: String
            let dataField2: String
        }
    ```
- Bước 2: Định nghĩa struct/class/enum sử dụng protocol RequestType
```
struct GetAllSampleData: RequestType {
    typealias ResponseType = [SampleData]
    var data: RequestData {
        return RequestData(path: "http://127.0.0.1:3000/test")
    }
}
```

- Bước 3: Gọi hàm execute để thực thi
```
GetAllSampleData().execute(
    onSuccess: { (users: [SampleData]) in
        //Your action when get data
},
    onError: { (error: Error) in
        //Your action when error occurs
}
```

# Nguồn tham khảo và mã nguồn
- Nguồn tham khảo: https://medium.com/ios-os-x-development/minimal-networking-layer-from-scratch-in-swift-4-a151af786dc5
- Mã nguồn