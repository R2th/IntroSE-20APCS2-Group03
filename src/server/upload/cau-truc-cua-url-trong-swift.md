Đây là bài dịch từ của một chia sẻ trên trang [swiftbysundell](https://www.swiftbysundell.com), bài viết nguồn mời các bạn xem tại đây: https://www.swiftbysundell.com/posts/constructing-urls-in-swift

Hầu hết các ứng dụng hiện đại ngày nay đều yêu cầu một số hình thức kết nối mạng - điều này có nghĩa là làm việc với các URL với nhiều hình dạng và hình thức khác nhau. Tuy nhiên, việc xây dựng các URL - đặc biệt là các URL động dựa trên đầu vào của người dùng - không phải lúc nào cũng dễ dàng và có thể dẫn đến một loạt các lỗi và vấn đề nếu chúng ta không cẩn thận.

Tuần này, chúng ta hãy xem xét các kỹ thuật khác nhau làm việc với URL trong Swift, cách cấu trúc code để tạo nên các URL một cách mạnh mẽ hơn và làm thế nào để đảm bảo các cách tiếp cận khác nhau với các loại URL khác nhau.

### Strings
Một cách tiếp cận phổ biến với URL là về cơ bản chúng là các string. Và mặc dù điều đó có thể đúng ở một số khía cạnh, URL có một số hạn chế nghiêm ngặt hơn nhiều khi nói đến định dạng của chúng và những ký tự nào chúng có thể chứa, so với nhiều loại string khác.
Những hạn chế đó có thể nhanh chóng dẫn đến các vấn đề khi sử dụng nối string đơn giản để tạo URL, như dưới đây, chúng ta sử dụng một truy vấn tìm kiếm để tạo URL để request API tìm kiếm của GitHub:
```
func findRepositories(matching query: String) {
    let api = "https://api.github.com"
    let endpoint = "/search/repositories?q=\(query)"
    let url = URL(string: api + endpoint)
    ...
}
```
Mặc dù cách trên có thể hoạt động tốt đối với các URL đơn giản, nhưng rất dễ gặp phải hai loại vấn đề sau:
1. Khi số lượng tham số tăng lên, chúng ta sẽ tạo ra code khá lộn xộn, khó đọc, vì tất cả những gì chúng ta đang làm là thêm các chuỗi bằng cách sử dụng phép nối và nội suy.
2. Vì tham số *query* là một string bình thường, nó có thể chứa bất kỳ loại ký tự đặc biệt hoặc biểu tượng cảm xúc dẫn đến một URL không hợp lệ. Chúng ta có thể mã hóa *query* bằng hàm **addPercentEncoding**, nhưng sẽ tốt hơn nhiều nếu hệ thống xử lý vấn đề đó cho chúng ta.
Rất may, **Foundation** cung cấp một giải pháp giải quyết được cả hai vấn đề trên cho chúng ta - đó chính là **URLComponents**.

### Components
Mặc dù các URL có thể là các string dưới trình duyệt, nhưng chúng có cấu trúc chứ không chỉ là một tập hợp các ký tự - vì chúng có định dạng được xác định rõ mà chúng phải tuân theo. Vì vậy, thay vì xử lý chúng như việc nối string - chúng ta hãy coi chúng như là một tổng của các thành phần riêng lẻ, đặc biệt là khi số lượng các thành phần động tăng lên.
Ví dụ: giả sử rằng chúng ta muốn thêm tham số *sort*, cho phép chúng ta sắp xếp kết quả tìm kiếm của mình theo các cách khác nhau. Để mô hình hóa các tùy chọn sắp xếp có sẵn, chúng tôi có thể tạo ra một enum cho chúng - như thế này:
```
enum Sorting: String {
    case numberOfStars = "stars"
    case numberOfForks = "forks"
    case recency = "updated"
}
```
Bây giờ, hãy thay đổi hàm *findRepositories* của chúng ta phía trên để sử dụng URLComponents thay vì xây dựng URL bằng cách thao tác các string. Kết quả là có thêm một vài dòng code, nhưng khả năng đọc được cải thiện rất nhiều và giờ đây chúng ta có thể dễ dàng thêm nhiều mục truy vấn - bao gồm tùy chọn sắp xếp mới - vào URL theo cách rất có cấu trúc:
```
func findRepositories(matching query: String,
                      sortedBy sorting: Sorting) {
    var components = URLComponents()
    components.scheme = "https"
    components.host = "api.github.com"
    components.path = "/search/repositories"
    components.queryItems = [
        URLQueryItem(name: "q", value: query),
        URLQueryItem(name: "sort", value: sorting.rawValue)
    ]

    // Getting a URL from our components is as simple as
    // accessing the 'url' property.
    let url = components.url
    ...
}
```
**URLComponents** không chỉ cho phép chúng ta xây dựng các URL một cách sáng sủa và rõ ràng, nó còn tự động mã hóa các tham số cho chúng ta. Bằng cách đưa việc này cho hệ thống thực hiện, code base của chúng ta sẽ không còn phải quan tâm đến tất cả các chi tiết liên quan đến URL, điều này khiến mọi thứ trở nên rõ ràng hơn trong tương lai.
**URLComponents** cũng là một ví dụ tuyệt vời về *builder pattern*. Sức mạnh của các *builder* là chúng ta có được một API chuyên dụng để xây dựng một giá trị phức tạp, giống như cách chúng tôi xây dựng URL của mình ở trên. Để biết thêm về *builder pattern* - hãy xem "[Sử dụng *builder pattern* trong Swift"](https://www.swiftbysundell.com/posts/using-the-builder-pattern-in-swift).
### Endpoints
Rất có thể ứng dụng của chúng ta không chỉ cần yêu cầu một *endpoint* duy nhất và viết code cho các **URLComponents** cần thiết để tạo URL sẽ bị lặp lại. Hãy xem liệu chúng ta có thể khái quát hóa một chút việc triển khai để hỗ trợ request với bất kỳ *endpoint* của GitHub được không nhé.
Đầu tiên, khai báo một *struct* cho *endpoint*. Điều duy nhất mà chúng ta mong đợi để thay đổi giữa các *endpoint* là tham số *path*, còn *queryItems* chúng ta chỉ muốn đính kèm dưới dạng tham số - chúng  sẽ có một struc trông như thế này:
```
struct Endpoint {
    let path: String
    let queryItems: [URLQueryItem]
}
```
Sử dụng *extension*, chúng ta có thể dễ dàng định nghĩa các phương thức factory tĩnh chung cho các *endpoint*, chẳng hạn như tìm kiếm mà chúng ta đang sử dụng trước đây:
```
extension Endpoint {
    static func search(matching query: String,
                       sortedBy sorting: Sorting = .recency) -> Endpoint {
        return Endpoint(
            path: "/search/repositories",
            queryItems: [
                URLQueryItem(name: "q", value: query),
                URLQueryItem(name: "sort", value: sorting.rawValue)
            ]
        )
    }
}
```
Cuối cùng, chúng ta có thể định nghĩa *extension* khác sử dụng *path* và *queryItems* cho bất kỳ *endpoint* cụ thể nào để dễ dàng tạo URL cho nó, sử dụng **URLComponents**:
```
extension Endpoint {
    // We still have to keep 'url' as an optional, since we're
    // dealing with dynamic components that could be invalid.
    var url: URL? {
        var components = URLComponents()
        components.scheme = "https"
        components.host = "api.github.com"
        components.path = path
        components.queryItems = queryItems

        return components.url
    }
}
```
Với đoạn code trên, giờ đây chúng ta có thể dễ dàng đưa các *endpoint* vào code base của mình, thay vì phải xử lý trực tiếp các URL. Ví dụ: chúng tôi có thể tạo loại DataLoader cho phép chúng ta truyền các *endpoint* để tải dữ liệu, như sau:
```
class DataLoader {
    func request(_ endpoint: Endpoint,
                 then handler: @escaping (Result<Data>) -> Void) {
        guard let url = endpoint.url else {
            return handler(.failure(Error.invalidURL))
        }

        let task = urlSession.dataTask(with: url) {
            data, _, error in

            let result = data.map(Result.success) ??
                        .failure(Error.network(error))

            handler(result)
        }

        task.resume()
    }
}
```
Bây giờ chúng ta có một cú pháp thực sự tốt để tải dữ liệu, vì chúng ta có thể gọi các phương thức static factory:
```
dataLoader.request(.search(matching: query)) { result in
    ...
}
```
Bằng cách giới thiệu một trừu tượng đơn giản giản và sử dụng **URLComponents** trong phần mềm, chúng tôi có thể nhanh chóng thực hiện các cải tiến lớn cho code xử lý URL của mình - đặc biệt là so với cách tiếp cận dựa trên string mà chúng ta đã sử dụng ban đầu.
### Kết luận
Lúc đầu, làm việc với các URL có vẻ như là một vấn đề nhỏ, nhưng một khi chúng ta bắt đầu đưa ra các trường cụ thể và đầu vào do người dùng nhập, mọi thứ có thể trở nên khá phức tạp. Bằng cách tận dụng các API như **URLComponents**, chúng ta có thể giảm bớt phần lớn logic cần thiết để xử lý chính xác các URL cho hệ thống - và bằng việc định nghĩa các loại dành riêng cho domain, endpoint, chúng ta có thể cải thiện rất nhiều khi làm việc với URL.