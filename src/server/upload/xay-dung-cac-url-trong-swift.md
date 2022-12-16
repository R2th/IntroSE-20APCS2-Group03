Hầu hết các ứng dụng hiện nay đều yêu cầu kết nối mạng - điều này có nghĩa là bạn sẽ phải làm việc với các URL có cấu trúc khác nhau thường xuyên. Tuy nhiên, việc xây dựng các URL - đặc biệt là các URL động dựa trên tham số đầu vào của người dùng - không phải là điều đơn giản và có thể dẫn đến một loạt các vấn đề nếu chúng ta không cẩn thận.

 Sau đây, chúng ta hãy xem xét các kỹ thuật khác nhau để làm việc với URL trong Swift, cách làm để xây dựng code URL tối ưu hơn.

# Strings
Một trong những cách phổ biến nhất để khai báo URL là dưới dạng strings. Mặc dù điều đó có thể đúng trong một số trường hợp, tuy nhiên định dạng của URL và các kí tự trong của nó có một giới hạn chặt chẽ hơn so với nhiều loại chuỗi khác. Những giới hạn đó có thể dẫn đến các sự cố khi sử dụng phương pháp nối chuỗi đơn giản để tạo nên một URL, như ví dụ bên dưới mình có tham số search query để tạo một URL sau đó gọi search API để tìm kiếm repositories trên Github:

```
func findRepositories(matching query: String) {
    let api = "https://api.github.com"
    let endpoint = "/search/repositories?q=\(query)"
    let url = URL(string: api + endpoint)
    ...
}
```

Mặc dù đoạn code ở trên có thể hoạt động tốt với các URL đơn giản, nhưng nó dễ mắc phải hai vấn đề sau:

Nếu số lượng tham số đầu vào tăng thêm, code của chúng ta sẽ nhanh chóng bị lộn xộn và khó đọc, vì cách chúng ta đang làm ở đây đơn giản chỉ là thêm chuỗi bằng cách nối *api* với *endpoint*.
Và vì câu truy vấn là một chuỗi bình thường, nó có thể chứa đựng những kí tự đặc biệt và *emoji*, điều này có thể dẫn tới định dạng một URL bị sai. Dĩ nhiên bạn có thể *encode* câu truy vấn bằng *addingPercentEncoding* API, nhưng sẽ tốt hơn nếu để hệ thống xử lý thay cho chúng ta.
Rất may, *Foundation* cung cấp một loại có thể giải quyết cả hai vấn đề trên cho chúng ta - *URLComponents*.

# Components

Mặc dù một string URL trông có vẻ đơn giản, nhưng chúng có nhiều cấu trúc hơn chỉ đơn giản là tập hợp các ký tự - vì chúng có định dạng được xác định rõ ràng mà chúng phải tuân thủ. Vì vậy, thay vì đối phó với chúng như là chuỗi nối nhau - xử lý chúng như là một tổng của các thành phần riêng lẻ là cách phù hợp hơn nhiều, đặc biệt là khi số lượng các thành phần tăng lên.

Ví dụ: giả sử chúng ta muốn thêm API sắp xếp các repositories trên Github, cho phép chúng ta sắp xếp kết quả tìm kiếm theo nhiều cách khác nhau. Để mô hình hóa các tùy chọn sắp xếp có sẵn, chúng ta có thể tạo một enum cho chúng như sau:

```
enum Sorting: String {
    case numberOfStars = "stars"
    case numberOfForks = "forks"
    case recency = "updated"
}
```

Bây giờ hãy thay đổi hàm findRepositories của chúng ta từ ví dụ trước để sử dụng các URLComponents thay vì khai báo URL bằng string. Kết quả là một thêm một vài dòng code, nhưng khả năng đọc được cải thiện rất nhiều và giờ đây chúng ta có thể dễ dàng thêm nhiều mục truy vấn - bao gồm tùy chọn sắp xếp mới của chúng ta - vào URL một cách khoa học, có cấu trúc hơn:

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

Các *URLComponents* không chỉ cho phép chúng ta xây dựng các URL một cách đẹp và gọn gàng, nó cũng tự động mã hóa các *parameters* cho chúng tôi. Bằng cách "*outsourcing*" loại nhiệm vụ này cho hệ thống, source code của chúng ta không còn phải kiểm tra tất cả các chi tiết liên quan đến URL.

*URLComponents* cũng là một ví dụ tuyệt vời về kiểu tích hợp có sử dụng *builder pattern*. Sức mạnh của pattern này là chúng ta nhận được API chuyên dụng để xây dựng một giá trị phức tạp, giống như cách chúng ta tạo URL ở trên. Để biết thêm về *builder pattern* - bạn có thể tham khảo ["Using the builder pattern in Swift"](https://www.swiftbysundell.com/posts/using-the-builder-pattern-in-swift).

# Endpoints

Rất có thể ứng dụng của chúng ta không chỉ có 1 endpoint, và lặp lại tất cả các đoạn code *URLComponents* cần thiết để xây dựng một URL có thể làm cho code của chugns ta bị lặp đi lặp lại. Hãy xem liệu chúng ta có thể khái quát hóa việc triển khai của chúng ta một chút để hỗ trợ bất kì request Github enpoint nào không.

Đầu tiên, hãy định nghĩa một *struct* endpoint. Điều duy nhất mà chúng ta mong đợi thay đổi giữa các *endpoint* là đường dẫn mà chúng ta đang request, cũng như những *queryItems* mà chúng ta muốn đính kèm làm parameter - cho chúng ta một cấu trúc giống như sau:

```
struct Endpoint {
    let path: String
    let queryItems: [URLQueryItem]
}
```

Bằng cách sử dụng extension, bây giờ chúng ta có thể dễ dàng định nghĩa các factory method cho các endpoint thông dụng, chẳng hạn như tìm kiếm chúng ta đã sử dụng ở trên:

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

Cuối cùng, chúng ta có thể định nghĩa một extension khác sử dụng path và queryItems cho bất kỳ endpoint đã cho nào để dễ dàng tạo một URL cho nó, bằng cách sử dụng các *URLComponents*:

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

Với những mảnh ghép ở trên, bây giờ bạn có thể dễ dàng sử dụng endpoint trong code base của dự án, thay vì phải xử lý trực tiếp các URL. Ví dụ, chúng ta có thể tạo một kiểu *DataLoader* cho phép chúng ta truyền vào một endpoint để tải dữ liệu như dưới:

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

Chúng ta bây giờ cũng có một cú pháp gọn gàng để tải dữ liệu, vì chúng ta có thể gọi các static factory method  bằng cách sử dụng dot-syntax:

```
dataLoader.request(.search(matching: query)) { result in
    ...
}
```

Thật tuyệt vời phải không nào! 🎉 Bằng cách giới thiệu các lớp trừu tượng đơn giản và sử dụng các *URLComponents*, chúng ta có thể nhanh chóng thực hiện các cải tiến lớn đối với code xử lý URL - đặc biệt so với phương pháp dựa trên chuỗi đã sử dụng ban đầu.

# Static URLs
Cho đến nay, chúng ta đã xử lý các URL được tạo động dựa trên dữ liệu đầu vào của người dùng hoặc dữ liệu khác chỉ được biết đến khi thực thi. Tuy nhiên, không phải tất cả các URL đều là động mà có những URL hoàn chỉnh đã được biết đến từ lúc biên dịch.

Như chúng ta đã thấy khi xử lý các URL động, ngay cả khi sử dụng các kiểu chuyên dụng như *URLComponents*, chúng ta vẫn phải làm việc với rất nhiều tùy chọn. Chúng ta không thể đảm bảo rằng tất cả các thành phần động đều hợp lệ, vì vậy để tránh lỗi crash và những hành vi không thể đoán trước, chúng ta buộc phải thêm các đoạn code để xử lý các trường hợp nil cho các URL không hợp lệ.

Tuy nhiên, đó không phải là trường hợp cho các URL tĩnh. Với các URL tĩnh, chúng ta đã xác định được chính xác URL trong code. Đối với loại URL đó, việc xử lý optionals trong code của chúng ta là không cần thiết, vì vậy hãy xem cách chúng ta có thể thêm một cách khác để xây dựng các URL đó - sử dụng loại *StaticString* của Swift.

*StaticString* là họ hàng ít được biết đến hơn của kiểu *String*. Sự khác biệt chính giữa chúng là *StaticString* không thể là kết quả của bất kỳ *dynamic expression* - chẳng hạn như nối chuyễn. Bên trong, Swift sử dụng loại này cho những thứ như tên file cho *assertions* và *preconditions*, nhưng chúng ta cũng có thể sử dụng loại này để tạo trình khởi tạo cho static URL như sau:

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

Bây giờ chúng ta có thể dễ dàng định nghĩa các non-optional URL bằng cách sử dụng một static string literal:

```
let url = URL(staticString: "https://myapp.com/faq.html")
```

Ít optional có nghĩa là ít phải viết code để kiểm tra và điều này thường là điều tốt 👍.

# Conclusion
Lúc đầu, làm việc với các URL có vẻ như là một vấn đề bình thường, nhưng một khi chúng ta bắt đầu lấy các trường hợp phức tạp, mọi thứ có thể trở nên rối hơn. Bằng cách tận dụng các API có sẵn như *URLComponents*, chúng ta có thể giảm tải nhiều logic cần thiết để xử lý - và bằng cách xác định các loại tên miền cụ thể cho những thứ như endpoints, chúng ta có thể cải thiện cách làm việc với URL trong code của chúng ta.

Cảm ơn các bạn vì đã đọc! 🚀

Reference: https://www.swiftbysundell.com/posts/constructing-urls-in-swift?utm_campaign=Swift%20Weekly&utm_medium=Swift%20Weekly%20Newsletter%20Issue%20132&utm_source=Swift%20Weekly