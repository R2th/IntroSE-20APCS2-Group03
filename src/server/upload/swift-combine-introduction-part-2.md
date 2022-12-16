Hôm nay chúng ta sẽ tìm hiểu tiếp các thành phần của Swift combine

### Operators

Combine bao gồm một operators cung cấp một cách thuận tiện để xử lý các giá trị từ một luồng đang diễn ra trước khi phân phối chúng cho subscriber

Các toán tử khác nhau được định nghĩa là phần mở rộng trên Publisher triển khai chức năng của chúng dưới dạng các lớp hoặc cấu trúc mở rộng kiểu liệt kê này. Ví dụ: contains(_: )  trả về một phiên bản Publishers.Contains.

Một số operators này đã tồn tại trong thư viện chuẩn Swift

*map // Publishers.Map\
flatMap // Publishers.FlatMap\
filter // Publishers.Filter\
reduce // Publishers.Reduce*

Một số trong số chúng là mới:

tryMap // Publishers.TryMap\
tryCatch // Publishers.TryCatch\
decode // Publishers.Decode\
replaceError // Publishers.ReplaceError

```swift 

let passthroughSubject = PassthroughSubject<String, Never>()
let anySubscriber = AnySubscriber(passthroughSubject)
passthroughSubject.sink(
     receiveCompletion: { completion in
          print(completion)
     }) { value in
          print(value)
     }
[1, 2, 3, 4].publisher
    .filter { $0.isMultiple(of: 2) }
    .map { "My even number is \(String($0))" }
    .receive(subscriber: anySubscriber)
// prints my even number is 2
// prints my even number is 4
// prints finished

   ```
   
   
   ### URL Session
   
   
   Hãy cùng khám phá đầy đủ sức mạnh của reactive programming bằng cách đưa ra yêu cầu mạng không đồng bộ bằng cách sử dụng publisher tích hợp sẵn của Combine `dataTaskPublisher '
   ```swift 
   
   var subscriptions = Set<AnyCancellable>()
let dataTaskPublisher = URLSession.shared.dataTaskPublisher(
          for: URL(
              string: “https://jsonplaceholder.typicode.com/posts"
           )!
        )
dataTaskPublisher
    .retry(2)
    .map(\.data)
    .decode(type: [Post].self, decoder: JSONDecoder())
    .replaceError(with: [])
    .receive(on: DispatchQueue.main)
    .sink { posts in
        print("There are \(posts.count) posts")
    }
    .store(in: &subscriptions)
// prints There are 100 posts
   
  ```
   
   
   Một API khai báo như vậy rất thuận tiện khi xử lý các yêu cầu không đồng bộ phức tạp trong khi vẫn duy trì code readability.
   
   Enum Publishers cung cấp một cấu trúc có tên là CombineLatest cho phép chúng ta nhận các phần tử mới nhất từ hai publishers.
   
  ```swift 
    
    let postsDataTaskPublisher = URLSession.shared.dataTaskPublisher(
          for: URL(
              string: “https://jsonplaceholder.typicode.com/posts"
          )!
        )
let commentsDataTaskPublisher = URLSession.shared.dataTaskPublisher(
          for: URL(
             string: “https://jsonplaceholder.typicode.com/comments"
          )!
        )
let postsPublisher = postsDataTaskPublisher
     .retry(2)
     .map(\.data)
     .decode(type: [Post].self, decoder: JSONDecoder())
     .replaceError(with: [])
let commentsPublisher = commentsDataTaskPublisher
    .retry(2)
    .map(\.data)
    .decode(type: [Comment].self, decoder: JSONDecoder())
    .replaceError(with: [])
Publishers.CombineLatest(postsPublisher, commentsPublisher)
     .sink { posts, comments in
          print(“There are \(posts.count) posts”)
          print(“There are \(comments.count) comments”)
     }
     .store(in: &subscriptions)
// prints There are 100 posts
// prints There are 500 comments
    
    
   ```
   
   
Ngoài ra, chúng ta có thể sử dụng phương thức fetch () trả về một publisher.

 ```swift 
 
 private enum Error: Swift.Error {
    case invalidResponse
    case invalidJSON
}
private func fetchPosts() -> AnyPublisher<[Post], Swift.Error> {
    let url = URL(
          string: “https://jsonplaceholder.typicode.com/posts"
    )!
    return URLSession.shared.dataTaskPublisher(for: url)
        .tryMap { data, response -> Data in
            guard let httpResponse = response as? HTTPURLResponse,
                      httpResponse.statusCode == 200 else {
                throw Error.invalidResponse
            }
            return data
        }
        .tryMap { data -> [Post] in
             guard let posts = try?
                 JSONDecoder().decode([Post].self, from: data) else
             {
                  throw Error.invalidJSON
             }
    
             return posts
        }
        .eraseToAnyPublisher()
     }
 
  ```
  
 
### UI Binding


Phép gán (to: on) rất hữu ích khi nói đến ràng buộc «giá trị của thuộc tính tuân thủ KVO từ publisher»


Hãy điền các ô của chúng ta từ các post objects của chúng ta

```swift 



func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(
        withIdentifier: PostCell.identifier,
        for: indexPath
    ) as! PostCell
    let postsDataTaskPublisher = 
         URLSession
        .shared
        .dataTaskPublisher(
             for: URL(
                 string:“https://jsonplaceholder.typicode.com/posts"
             )!
     )
cell.subscriber = postsDataTaskPublisher
         .retry(2)
         .map(\.data)
         .decode(type: [Post].self, decoder: JSONDecoder())
         .replaceError(with: [])
         .map {
             return $0[indexPath.row].title
         }
         .receive(on: DispatchQueue.main)
         .assign(to: \.textLabel!.text, on: cell)
     
     return cell
}
final class PostCell: UITableViewCell {
    var subscriber: AnyCancellable?
    static var identifier = "PostCell"
    override func prepareForReuse() {
        subscriber?.cancel()
    }
    override init(
         style: UITableViewCell.CellStyle, 
         reuseIdentifier: String?
    ) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
    }
    required init?(coder: NSCoder) {
         fatalError(“init(coder:) has not been implemented”)
    }
}
 ```
   
   
   
   ### Cancellable
   
   
   Bất cứ khi nào subscriber không còn cần nhận các yếu tố từ publisher, người đó có thể hủy đăng ký của mình
   
   «Các loại người đăng ký được tạo bởi sink (receiveCompletion:receiveValue:) và assign(to: on:) đều triển khai giao thức Cancellable, cung cấp phương thức cancel()»
   
   ```swift 
   
   var subscriptions = Set<AnyCancellable>()
let dataTaskPublisher = URLSession.shared.dataTaskPublisher(
       for: URL(
           string: “https://jsonplaceholder.typicode.com/posts"
       )!
)
let postsPublisher = dataTaskPublisher
    .retry(2)
    .map(\.data)
    .decode(type: [Post].self, decoder: JSONDecoder())
    .replaceError(with: [])
    .sink { posts in
        print("There are \(posts.count) posts")
    }
    .store(in: &subscriptions)
postsPublisher.cancel()

   ```
   
   Điều này sẽ chưa print bất kỳ thứ gì bởi vì reactive programming xử lý các sự kiện không đồng bộ, tuy nhiên, phương thức  cancel()  được gọi trước khi dữ liệu được fetche từ service.
   
   Thêm code block này sẽ giải quyết vấn đề
   
   ```swift 
   DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
    postsPublisher.cancel()
}
// prints There are 100 posts
   ```