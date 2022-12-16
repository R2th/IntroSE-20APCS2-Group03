Hầu hết các ứng dụng hiện đại đều yêu cầu network - điều này có nghĩa là chúng ta sẽ làm việc với các URL ở các dạng khác nhau. Tuy nhiên, việc xây dựng các URL - đặc biệt là các URL động dựa trên input của người dùng - không phải luôn luôn tốt và có thể dẫn đến một loạt các lỗi và vấn đề nếu chúng ta không cẩn thận.
Trong bài viết này, chúng ta hãy xem xét các kỹ thuật khác nhau để làm việc với URL trong Swift.
## Strings
Một cách phổ biến để làm việc với URL là sử dụng chuỗi. Điều đó có thể đúng trong một số trường hợp nhưng URL có một bộ giới hạn chặt chẽ hơn khi nói đến định dạng của chúng và các ký tự chúng có thể chứa so với nhiều loại chuỗi khác.
Những giới hạn đó có thể nhanh chóng dẫn đến các sự cố khi sử dụng nối chuỗi đơn giản để tạo URL, như bên dưới nơi chúng ta sử dụng truy vấn tìm kiếm để tạo URL để request GitHub search API:
```
func findRepositories(matching query: String) {
    let api = "https://api.github.com"
    let endpoint = "/search/repositories?q=\(query)"
    let url = URL(string: api + endpoint)
    ...
}
```
Mặc dù code ở trên có thể hoạt động tốt cho các URL đơn giản, nhưng vẫn gặp phải hai vấn đề khi sử dụng phương pháp này:
1. Khi số lượng tham số tăng, chúng ta sẽ nhanh chóng kết thúc với code khá lộn xộn khó đọc, vì tất cả những gì chúng ta đang làm là thêm chuỗi bằng cách nối và nội suy.
2. Vì query là một chuỗi bình thường, nó có thể chứa bất kỳ loại ký tự đặc biệt nào và biểu tượng cảm xúc có thể dẫn đến URL không hợp lệ. Tất nhiên chúng ta có thể mã hóa truy vấn bằng cách sử dụng API addPercentEncoding, nhưng nó sẽ tốt hơn nhiều nếu có hệ thống xử lý nó.
Rất may, Foundation cung cấp một loại giải quyết cả hai vấn đề trên cho chúng ta - URLComponents.
## Components
Mặc dù URL có thể là chuỗi, nhưng chúng có cấu trúc nhiều hơn không chỉ đơn giản là tập hợp các ký tự - vì chúng có định dạng được xác định rõ ràng. Vì vậy, thay vì đối phó với chúng như là chuỗi nối - chúng ta sẽ xử lý chúng như là một tổng của các thành phần riêng lẻ sẽ phù hợp hơn nhiều, đặc biệt là khi số lượng các thành phần động tăng lên.
Ví dụ: giả sử chúng ta muốn thêm hỗ trợ cho tham số sắp xếp của GitHub, cho phép chúng tôi sắp xếp kết quả tìm kiếm theo nhiều cách khác nhau. Để mô hình hóa các tùy chọn sắp xếp có sẵn, chúng tôi có thể tạo một enum cho chúng - như sau:
```
enum Sorting: String {
    case numberOfStars = "stars"
    case numberOfForks = "forks"
    case recency = "updated"
}
```
Bây giờ hãy thay đổi hàm findRepositories của chúng ta từ trước để sử dụng các URLComponents thay vì xây dựng URL của nó bằng cách thao tác các chuỗi. Kết quả là chỉ một vài dòng code, nhưng khả năng đọc được cải thiện rất nhiều và giờ đây chúng ta có thể dễ dàng thêm nhiều mục truy vấn - bao gồm tùy chọn sắp xếp mới của chúng ta vào URL theo cấu trúc:
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
## Endpoints
Rất có thể ứng dụng của chúng ta không chỉ cần yêu cầu một endpoint duy nhất và đánh lại tất cả URLComponents code cần thiết để xây dựng một Url. Hãy xem liệu chúng ta có thể khái quát hóa việc triển khai url để hỗ trợ yêu cầu bất kỳ loại endpoint GitHub nào không.
Đầu tiên, hãy định nghĩa một cấu trúc để biểu diễn một end point. Điều duy nhất mà chúng ta đang mong đợi thay đổi giữa các endpoint là đường dẫn mà chúng ta đang yêu cầu, cũng như những queryItems mà chúng ta muốn đính kèm làm tham số - cho chúng ta một cấu trúc giống như sau:
```
struct Endpoint {
    let path: String
    let queryItems: [URLQueryItem]
}
```
Sử dụng extension, bây giờ chúng ta có thể dễ dàng xác định các static factory method cho các endpoint thông dụng, chẳng hạn như tìm kiếm chúng ta đã sử dụng trước đây:
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
Cuối cùng, chúng ta có thể định nghĩa một extension khác sử dụng đường dẫn và queryItems cho bất kỳ endpoint đã cho nào để dễ dàng tạo một URL cho nó, bằng cách sử dụng các URLComponents:
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
Với những điều trên, chúng ta có thể dễ dàng pass endpoint trong code của chúng ta, thay vì phải xử lý trực tiếp các URL. Ví dụ, chúng ta có thể tạo một kiểu DataLoader cho phép chúng ta pass endpoint để tải dữ liệu như sau:
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
Với ở trên tại chỗ, bây giờ chúng ta có một cú pháp thực sự tốt để load dữ liệu, vì chúng ta có thể gọi các static factory methods bằng cách sử dụng dot-syntax khi kiểu có thể được suy ra:
```
dataLoader.request(.search(matching: query)) { result in
    ...
}
```
## Static URLs
Chúng ta đã xử lý các URL được tạo động dựa trên dữ liệu đầu vào của người dùng hoặc dữ liệu khác chỉ được biết đến khi chạy. Tuy nhiên, không phải tất cả các URL phải là động và nhiều lần khi chúng tôi thực hiện các yêu cầu cho những thứ như phân tích hoặc cấu hình endpoint - URL hoàn chỉnh được biết đến lúc biên dịch.
Như bạn đã thấy khi xử lý các URL động, ngay cả khi sử dụng các kiểu chuyên dụng như URLComponents, chúng ta phải làm việc với rất nhiều tùy chọn. Chúng ta không thể đảm bảo rằng tất cả các thành phần động đều hợp lệ, vì vậy để tránh sự cố và hành vi không thể đoán trước, chúng tôi buộc phải thêm các code xử lý các trường hợp không hợp lệ cho các URL không hợp lệ.
Tuy nhiên, đó không phải là trường hợp cho các URL tĩnh. Với các URL tĩnh, chúng ta đã xác định chính xác URL trong code của chúng ta. Đối với loại URL đó, chúng ta không thể set optional trong cả project của chúng ta, vì vậy hãy xem cách chúng ta có thể thêm một cách riêng biệt để xây dựng các URL đó - sử dụng loại StaticString của Swift.
StaticString là loại string ít được biết đến. Sự khác biệt chính giữa String và StaticString là StaticString không thể là kết quả của bất kỳ biểu thức động nào - chẳng hạn như nội suy chuỗi hoặc nối - toàn bộ chuỗi cần phải được định nghĩa nội tuyến. Bên trong, Swift sử dụng loại này cho những việc như thu thập tên tệp để xác nhận và so sánh, nhưng chúng ta cũng có thể sử dụng loại này để tạo trình khởi tạo URL cho URL hoàn toàn tĩnh - như sau:
```
extension URL {
    init(staticString string: StaticString) {
        guard let url = URL(string: "\(string)") else {
            preconditionFailure("Invalid static URL string: \(string)")
        }

        self = url
    }
}
```
Hàm trên có thể đi ngược lại ý tưởng của Swift về runtime safety, nhưng có một lý do chính đáng tại sao chúng ta muốn gây ra crash ở đây thay vì đối phó với các tùy chọn. Loại xử lý lỗi nào thích hợp cho bất kỳ trường hợp cụ thể nào phụ thuộc rất nhiều vào việc lỗi có phải do lỗi lập trình hay lỗi thực thi gây ra. Kể từ khi xác định một URL tĩnh không hợp lệ chắc chắn là một sai lầm lập trình viên, sử dụng một preconditionFailure là phù hợp nhất cho vấn đề. Với việc xử lý như vậy, chúng tôi sẽ có chỉ dẫn rõ ràng về những gì đã xảy ra vì chúng ta hiện đang sử dụng API dành riêng cho URL tĩnh, chúng ta thậm chí có thể thêm các kiểm tra linting và tĩnh để làm cho mọi việc trở nên an toàn hơn.
Chúng ta có thể dễ dàng xác định các URL không bắt buộc bằng cách sử dụng một chuỗi ký tự tĩnh:
```
let url = URL(staticString: "https://myapp.com/faq.html")
```
Hy vọng bài viết sẽ có ích với các bạn
Reference: https://www.swiftbysundell.com/posts/constructing-urls-in-swift