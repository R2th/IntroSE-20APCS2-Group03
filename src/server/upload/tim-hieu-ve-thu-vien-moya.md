Moya là một thư viện trừu tượng . Nó cung cấp một cách trừu tượng để thực hiện call network mà không cần làm việc trực tiếp với Alamofire.

## 1. Tại sao lại Moya?
-  Giúp quản lý API  ngay lập tức.
-  clean code và dễ thực hành.
- Tập trung vào các tính năng cốt lõi thay vì kết nối mạng.
-  Dễ Dàng cho stub network response dễ dàng cho việc viết Unit test.

## 2. Chuẩn bị

Bây giờ sẽ cùng mình xây dựng base API kết hợp với Moya nhé ^_^:

Mình sẽ sử dụng Json [Movie](https://www.themoviedb.org/): 

Đầu tiên mình sẽ tạo **Movie Model** adopt **Decodable**: 

```
struct Movie {
    let id: Int
    let posterPath: String
    let backdrop: String
    let title: String
    let releaseDate: String
    let rating: Double
    let overview: String
}

extension Movie: Decodable {
    enum MovieCodingKeys: String, CodingKey {
        case id
        case posterPath = "poster_path"
        case backdrop = "backdrop_path"
        case title
        case releaseDate = "release_date"
        case rating = "vote_average"
        case overview
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: MovieCodingKeys.self)
        
        id = try container.decode(Int.self, forKey: .id)
        posterPath = try container.decode(String.self, forKey: .posterPath)
        backdrop = try container.decode(String.self, forKey: .backdrop)
        title = try container.decode(String.self, forKey: .title)
        releaseDate = try container.decode(String.self, forKey: .releaseDate)
        rating = try container.decode(Double.self, forKey: .rating)
        overview = try container.decode(String.self, forKey: .overview)
    }
}
```

**Note**: Khi bạn muốn  tên các property của model  khác với tên do API cung cấp bạn cần implement CodingKey enum. Nó sẽ cho Swift biết chính xác cách ánh xạ Json của bạn.

**Tạo MovieResults Model:**

```
struct MovieResults {
    let page: Int
    let numberOfResults: Int
    let numberOfPages: Int
    let movies: [Movie]
}

extension MovieResults: Decodable {
    
    private enum ResultsCodingKeys: String, CodingKey {
        case page
        case numberOfResults = "total_results"
        case numberOfPages = "total_pages"
        case movies = "results"
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: ResultsCodingKeys.self)
        
        page = try container.decode(Int.self, forKey: .page)
        numberOfResults = try container.decode(Int.self, forKey: .numberOfResults)
        numberOfPages = try container.decode(Int.self, forKey: .numberOfPages)
        movies = try container.decode([Movie].self, forKey: .movies)
        
    }
}

```

**Tạo API Enum:**

Tạo 1 enum chứa tất cả các  endPoint (chứa các path url) của bạn. Mỗi case chứa các parameter mà bạn truyển đến endpoint cụ thể

```
enum MovieApi {
    case recommended(id:Int)
    case popular(page:Int)
    case newMovies(page:Int)
    case video(id:Int)
}
```
**Note**:
- Tạo mỗi case cho mỗi endPoint.
- Khi bạn có một endPoint yêu cầu nhiều tham số, thay vì bạn phải  truyền nhiều tham số vào func nhìn code ko được đẹp ban chỉ cần truyền 1 dictionary vào làm tham số :

```
// First import Alamofire to make use of ‘Parameters’
case endPointWithLotsOfParams(parameters: Parameters)
```


## 3. Implement thư viện Moya: 


Chúng ta tạo Target Type Protocol và xây dựng trình quản lý  Network Manager, Dependency Injection and Plugins.

**Target Type Protocol**:

Bạn đã tạo enum API cùng với list các endpoint, chúng ta cần import Moya và adopt **Target Type** Protocol . Moya’s Target Type protocol gồm  of 7 properties:
baseUrl, path, method, sampleData, task, validate, header. 

Các bạn thêm đoạn code sau vào :

```
extension MovieApi: TargetType {
    var baseURL: URL {
        guard let url = URL(string: "https://api.themoviedb.org/3/movie/") else { fatalError("baseURL could not be configured.")}
        return url
    }
    
    var path: String {
        switch self {
        case .recommended(let id):
            return "\(id)/recommendations"
        case .popular:
            return "popular"
        case .newMovies:
            return "now_playing"
        case .video(let id):
            return "\(id)/videos"
        }
    }
    
    var method: Moya.Method {
        return .get
    }
    
    var sampleData: Data {
        return Data()
    }
    
    var task: Task {
        switch self {
        case .recommended, .video:
            return .requestParameters(parameters: ["api_key":  NetworkManager.MovieAPIKey], encoding: URLEncoding.queryString)
        case .popular(let page), .newMovies(let page):
            return .requestParameters(parameters: ["page":page, "api_key": NetworkManager.MovieAPIKey], encoding: URLEncoding.queryString)
        }
    }
    
    var headers: [String : String]? {
        return ["Content-type": "application/json"]
    }
    
    // stuff
}
```

## **4. Thực hiện**

Create class **NetworkManager** and một protocol **Networkable**
Procol này sẽ định nghĩa các property and method mà bạn yêu cầu người quản lý bạn có:
```
protocol Networkable {
    associatedtype T: TargetType
    var provider: MoyaProvider<T> { get }
}
```

```
struct NetworkManager: Networkable {
    
    static let MovieAPIKey = "myKey"
    let provider = MoyaProvider<MovieApi>(plugins: [NetworkLoggerPlugin(verbose: true)])
    
    func getNewMovies(page: Int, completion: @escaping ([Movie])->()){
        provider.request(.newMovies(page: page)) { result in
            switch result {
            case let .success(response):
                do {
                    let results = try JSONDecoder().decode(MovieResults.self, from: response.data)
                    completion(results.movies)
                } catch let err {
                    print(err)
                }
            case let .failure(error):
                print(error)
            }
        }
    }
}

```

**Dependency Injection**

Các dev hay có thói quen viết lớp network layer.Họ gọi ở lớp ViewController bằng cách sử dụng singleton mà họ có thể truy cập mọi lúc mọi nơi.
Sử dụng Singleton rất khó cho việc test.Vậy làm thế nào để bạn sử dụng NetworkManager ở trong lớp ViewController? Bạn có thể sử dụng Dependency Injection.Đơn giản bạn chỉ cần truyền NetworkManager vào hàm init của Viewcontroller.

```
 let provider = NetworkManager()
        let appStartVC = MainViewController(networkProvider: provider)
        self.window = UIWindow(frame: UIScreen.main.bounds)
        self.window?.rootViewController = appStartVC
        self.window?.makeKeyAndVisible()
```
Bạn truyền object NetworkManager vào cho lớp  MainViewController nghĩa là là bạn inject instance NetworkManager vào MainViewController.

```
class MainViewController: UIViewController {

    var networkProvider: NetworkManager!
    
    init(networkProvider: NetworkManager) {
        super.init(nibName: nil, bundle: nil)
        self.networkProvider = networkProvider
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
```
Bạn làm như trên thì bạn dể kiểm soát object NetworkManager. Làm cho mã ít bị dính chặt và phụ thuộc vào nhau hơn -> Dễ viết Unit Test.

**Plugins**

Moya có sẵn một số plugin tiện lợi mà bạn dễ sử dụng.Nó có thể log ra tất cả các hoạt động mạng trên console nếu có gì đó xảy ra có thể là linh url request trên server, data trả về, error trả về ...
```
let provider = MoyaProvider<MovieApi>(plugins: [NetworkLoggerPlugin(verbose: true)])
```

# **5. Kết luận**: 
Bằng cách dùng Lib Moya giúp cho  bạn có thể enum adopt  protocol **TargetType**. Với việc dùng sử dụng nó sẽ giúp các dev mới dễ phát triển đọc và hiểu ngay lập tức. Cám ơn các bạn đã theo dõi bài viết của mình.
Bạn có thể tham khảo source code: https://github.com/dunglh-1464/MovieMoyaDemo
# Tài liệu tham khảo: 
https://medium.com/flawless-app-stories/getting-started-with-moya-f559c406e990