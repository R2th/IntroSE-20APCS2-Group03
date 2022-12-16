# Giới thiệu
Xin chào các bạn hôm nay mình xin phép chia sẻ về một "tút" khá là hay mà Apple đã cung cấp để phục vụ cho developer để tạo class base cho networking một cách dễ dàng nhất.
Từ khi Swift 4 được ra mắt và XCode 9.2 được phát thành từ tháng 12/2017 thì chúng ta chỉ cần sử dụng JSONDecoder và Decodable protocol là có thể thực hiện rồi.
# Getting Started
Do bài viết này mình muốn tập trung vào thiết kế các lớp networking nên mình sẽ chỉ parse JSON và print nó ra ở console chứ không đi sâu vào từng model. Mình sẽ tạo một generic API mà nó có thể tái sử dụng ở bất kì model nào.
Ở "tút" này mình sử dụng API từ "The Movie DB" các bạn có thể check nó tại đây
## Tạo model
Đầu tiên mình sẽ tạo một model Movie sẽ chứa tất cả những cái mà ta sẽ get từ API về

```
import Foundation

struct Movie: Decodable {
    
    let title: String?
    let poster_path: String?
    let overview: String?
    let releaseDate: String?
    let backdrop_path: String?
    let release_date: String?
}

```

và sẽ tạo thêm một model nữa là MovieFeedResult để chứa tất cả những Movie ở trên bằng cách qua một property results là một mảng có kiểu là Movie

```
import Foundation
struct MovieFeedResult: Decodable {
    let results: [Movie]?
}

```

## Tạo lớp Networking 
Như lúc đầu mình đã nói thì sẽ tạo một generic API để có thể tái sử dụng bất kì model nào thì bây giờ mình sẽ tạo một class trừu tượng để xử lý việc API trả về. Ta sẽ đặt tên cho nó là Result có kiểu là enum. Khi get lên một URL request thì chúng ta sẽ thường nhận được 2 loại kiểu response đó là success hoặc là failed nên ở đây Result cũng sẽ có 2 case tương ứng với 2 loại response đó.

```
import Foundation

enum Result<T, U> where U: Error  {
    case success(T)
    case failure(U)
}
```
Tiếp theo chúng ta sẽ tạo một protocol cơ sở cho các URL Request

```
protocol BaseRequest {
    var base: String { get }
    var path: String { get }
}
extension caseRequest {
    var apiKey: String {
        return "api_key=34a92f7d77a168fdcd9a46ee1863edf1"
    }
    
    var urlComponents: URLComponents {
        var components = URLComponents(string: base)!
        components.path = path
        components.query = apiKey
        return components
    }
    
    var request: URLRequest {
        let url = urlComponents.url!
        return URLRequest(url: url)
    }
}
```
Trong protocol này có 2 required properties là "base" và "path". Nó cũng có một vài computed propeties trong extension, một trong số chúng là APIKey được yêu cầu để có thể thực hiện các request( mình đã tạo API key từ Movie DB website) và cũng có một urlComponents property để tạo url và request property dùng để tạo một URLRequest
Bởi vì movies API có thể trả về các dữ liệu khác nhau. Những bộ phim đang chiếu, Những bộ phim hot. Để làm được điều này thì mình sẽ tạo 1 enum để quản lý sự khác nhau về kiểu mà API trả về.
```
enum MovieFeedFromAPI {
    case nowPlaying
    case topRated
}
extension MovieFeedFromAPI: Endpoint {
    
    var base: String {
        return "https://api.themoviedb.org"
    }
    
    var path: String {
        switch self {
        case .nowPlaying: return "/3/movie/now_playing"
        case .topRated: return "/3/movie/top_rated"
        }
    }
}
```
Ở đây MovieFeedFromAPI đang được conform tới BaseRequest nên nó bắt buộc phải khai báo 2 properti là base path và path associated tương ứng với protocol BaseRequest
Tiếp theo mình sẽ xử lý cho trường hợp khi API trả về là lỗi. Mình sẽ tạo ra một enum để quản lý và handle tất cả các loại lỗi trả về từ API 
```
enum APIError: Error {
    case requestFailed
    case jsonConversionFailure
    case invalidData
    case responseUnsuccessful
    case jsonParsingFailure
    var localizedDescription: String {
        switch self {
        case .requestFailed: return "Request Failed"
        case .invalidData: return "Invalid Data"
        case .responseUnsuccessful: return "Response Unsuccessful"
        case .jsonParsingFailure: return "JSON Parsing Failure"
        case .jsonConversionFailure: return "JSON Conversion Failure"
        }
    }
}
```
## Tạo lớp APIClient
Đây được xem là nơi thú vị nhất khi mà ta sẽ sử dụng JSONDecoder và Decodeable protocol để tạo một generic APIClient. Với lớp này chúng ta có thể tái sử dụng với bất kì một project nào, bất kì kiểu đối tượng nào.
```
protocol APIClient {
    var session: URLSession { get }
    func fetch<T: Decodable>(with request: URLRequest, decode: @escaping (Decodable) -> T?, completion: @escaping (Result<T, APIError>) -> Void)
}
```
Đối với mỗi object mà conform tới APIClient thì nó sẽ có 1 session và sẽ có thể sử dụng một generic function là fetch.
Bây giờ chúng ta sẽ mở rộng protocol này lên với extension
```
extension APIClient {
    typealias JSONTaskCompletionHandler = (Decodable?, APIError?) -> Void
    private func decodingTask<T: Decodable>(with request: URLRequest, decodingType: T.Type, completionHandler completion: @escaping JSONTaskCompletionHandler) -> URLSessionDataTask {
       
        let task = session.dataTask(with: request) { data, response, error in    
            guard let httpResponse = response as? HTTPURLResponse else {
                completion(nil, .requestFailed)
                return
            }
            if httpResponse.statusCode == 200 {
                if let data = data {
                    do {
                        let genericModel = try JSONDecoder().decode(decodingType, from: data)
                         completion(genericModel, nil)
                    } catch {
                        completion(nil, .jsonConversionFailure)
                    }
                } else {
                    completion(nil, .invalidData)
                }
            } else {
                completion(nil, .responseUnsuccessful)
            }
        }
        return task
    }
}
```
Function tiếp theo sẽ có vai trò là parsing hoặc decoding JSON data với đầu vào là 1 request URL, kiểu của object là conforms tới Decodable và 1 completion handler. Kết thúc là một URLSessionDataTask.
```
func fetch<T: Decodable>(with request: URLRequest, decode: @escaping (Decodable) -> T?, completion: @escaping (Result<T, APIError>) -> Void) {     
        let task = decodingTask(with: request, decodingType: T.self) { (json , error) in
            
            //MARK: change to main queue
            DispatchQueue.main.async {
                guard let json = json else {
                    if let error = error {
                        completion(Result.failure(error))
                    } else {
                        completion(Result.failure(.invalidData))
                    }
                    return
                }
                if let value = decode(json) {
                    completion(.success(value))
                } else {
                    completion(.failure(.jsonParsingFailure))
                }
            }
        }
        task.resume()
    }
```
Bên trong hàm này, chúng ta trả về một nhiệm vụ từ phương thức helper mà chúng ta vừa viết và chuyển như một tham số cho decodingType loại mà hàm này sẽ giải mã, sau khi kiểm tra xem JSON của nó không phải là nil và nếu đã được giải mã, chúng ta chuyển dữ liệu đã giải mã trong trường hợp thành công.
Cuối cùng thì ta cũng đã có một generic API sẽ fetch và decode bất kì kiểu object nào. Nó sẽ conform tới APIClient để nhận được thêm chức năng.
## MovieClient conform tới APIClient

```
class MovieClient: APIClient {
    let session: URLSession
    
    init(configuration: URLSessionConfiguration) {
        self.session = URLSession(configuration: configuration)
    }
    
    convenience init() {
        self.init(configuration: .default)
    }
    
    func getFeed(from movieFeedType: MovieFeed, completion: @escaping (Result<MovieFeedResult?, APIError>) -> Void) {
        fetch(with: movieFeedType.request , decode: { json -> MovieFeedResult? in
            guard let movieFeedResult = json as? MovieFeedResult else { return  nil }
            return movieFeedResult
        }, completion: completion)
    }
}
```

Bây giờ chúng ta sẽ test thử xem đã hoạt động chưa thì vào hàm viewDidLoad

```
client.getFeed(from: .nowPlaying) { result in
            switch result {
            case .success(let movieFeedResult):
                
                guard let movieResults = movieFeedResult?.results else { return }
                print(movieResults)
            case .failure(let error):
                print("the error \(error)")
            }
        }
```
Và đây là ở màn hình console
![](https://images.viblo.asia/dec978d6-4da3-494d-a1af-a8b1e29e00ed.png)


# Tổng kết

Vậy là mình đã giới thiệu xong về Decodable và JSONDecoder trong Swift 4 để tạo class base cho networking phục vụ cho việc request tới API
Cảm ơn các bạn đã quan tâm theo dõi

# Tài liệu tham khảo

https://www.themoviedb.org/documentation/api

https://developer.apple.com/documentation/foundation/jsondecoder

https://developer.apple.com/documentation/swift/decoder

https://docs.swift.org/swift-book/LanguageGuide/Enumerations.html

https://medium.com/@jamesrochabrun/protocol-based-generic-networking-using-jsondecoder-and-decodable-in-swift-4-fc9e889e8081