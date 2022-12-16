Thư viện tiêu chuẩn của Swift với kiểu **Result**  cho phép chúng ta diễn tả kết quả của một hoạt động thể hiện succeeded hoặc failed - sử dụng một duy nhất, thống nhất loại. Chúng ta hãy nhìn vào những gì loại tình huống mà kết quả có thể có ích, và một vài lời khuyên và thủ thuật có thể được tốt cần lưu ý khi bắt đầu làm việc với loại đó.

Trong khi có rất nhiều cách khác nhau để mô hình một loại quả, một trong đó đi kèm được xây dựng vào thư viện chuẩn Swift được khai báo là một generic enum đó là kiểu thiết kế mạnh mẽ cho cả hai giá trị thành công mà kết quả có thể chứa, cũng như đối với bất kỳ lỗi đó là đã gặp. Nó trông giống như thế này:

```
enum Result<Success, Failure> where Failure: Error {
    case success(Success)
    case failure(Failure)
}
```

Chúng ta có thể sử dụng kết quả để đại diện cho bất kỳ sự kết hợp success/failure, miễn là chiếu theo kiểu Thất bại trong  Error protocol. Vậy làm thế nào chúng ta có thể sử dụng các loại nêu trên trong thực tế, và những ưu điểm của làm như vậy là gì?

Như một ví dụ, chúng ta hãy nhìn vào URLSession, và là một trong các API phổ biến nhất được sử dụng của nó - trong đó sử dụng một thiết kế closure-based để đưa ra kết quả khác nhau một  network request’s  trong một cách làm không đồng bộ:

```
let url = URL(string: "https://www.swiftbysundell.com")!

let task = URLSession.shared.dataTask(with: url) {
    data, response, error in
    
    if let error = error {
        // Handle error
        ...
    } else if let data = data {
        // Handle successful response data
        ...
    }
}

task.resume()
```

Trong khi URLSession đã phát triển rất nhiều trong những năm qua, và có một bộ incredibly có khả năng  giải quyết API, quyết định chính xác làm thế nào để xử lý các kết quả của một lần call có thể vào những thời điểm có một chút khó khăn - từ đó, giống như ví dụ chương trình trên, cả hai dữ liệu và kết quả lỗi tiềm năng được truyền vào closure của chúng tôi như optionals - do đó đòi hỏi chúng ta unwrap từng giữ những giá trị mỗi lần call api.

Chúng ta hãy xem xét cách sử dụng kết quả có thể giúp chúng tôi giải quyết vấn đề đó. Chúng tôi sẽ bắt đầu bằng cách mở rộng URLSession với một API mới vượt qua một **Result<Data, Error>** giá trị vào xử lý hoàn thành, chứ không phải là một nhóm các optionals. Để thực hiện điều đó xảy ra, chúng tôi sẽ unwrap optionals rằng API chuẩn cho chúng ta (tương tự như những gì chúng ta làm ở trên) để xây dựng kết quả của chúng ta - như thế này:

```
extension URLSession {
    func dataTask(
        with url: URL,
        handler: @escaping (Result<Data, Error>) -> Void
    ) -> URLSessionDataTask {
        dataTask(with: url) { data, _, error in
            if let error = error {
                handler(.failure(error))
            } else {
                handler(.success(data ?? Data()))
            }
        }
    }
}
```

> Lưu ý cách chúng ta đã đơn giản hóa mọi thứ một chút ở trên, bằng cách bỏ qua giá trị URLResponse API mặc định của (sử dụng một dấu gạch dưới thay cho tên tham số của nó trong closure). Đó không phải là một cái gì đó mà chúng ta có thể luôn luôn muốn làm, mặc dù đối với nhiệm vụ kết nối mạng đơn giản hơn, có thể không phải là một nhu cầu để kiểm tra response value.
> 

<br>

Nếu bây giờ chúng ta quay trở lại trang web của  call trước đó và cập nhật nó để sử dụng API mới, chúng ta có thể thấy rằng code trở nên rất nhiều rõ ràng hơn - như bây giờ chúng ta có thể viết đường dẫn mã hoàn toàn riêng biệt cho cả trường hợp success và failure, như thế này :

```
let task = URLSession.shared.dataTask(with: url) { result in
    switch result {
    case .success(let data):
        // Handle successful response data
        ...
    case .failure(let error):
        // Handle error
        ...
    }
}
```

Một chi tiết thú vị về cách chúng ta sử dụng quả trên là chúng ta đã chỉ định loại Failure của nó đơn giản là lỗi. Điều đó có nghĩa rằng bất kỳ lỗi có thể được thông qua vào kết quả của chúng ta, do đó hạn chế lựa chọn của chúng tôi để xử lý lỗi cụ thể thêm tại trang web cuộc gọi (vì chúng ta không có bất kỳ danh sách đầy đủ các lỗi tiềm năng để xử lý). Trong khi đó là khó khăn để thay đổi khi làm việc trực tiếp với một API hệ thống đó, đến lượt nó, có thể ném bất kỳ lỗi - khi chúng ta đang xây dựng một hình thức cụ thể hơn trừu tượng chúng ta thường có thể thiết kế một API lỗi thống nhất hơn cho nó.

Ví dụ, chúng ta hãy nói rằng chúng tôi đang xây dựng một bộ nạp hình ảnh rất đơn giản mà sẽ cho chúng ta tải một hình ảnh qua mạng, một lần nữa sử dụng URLSession. Nhưng trước khi chúng ta bắt đầu thực sự thực hiện nạp của chúng tôi chính nó, trước tiên hãy xác định một enum mà danh sách tất cả các lỗi tiềm năng mà nó có thể gặp phải. Còn bây giờ, chúng tôi sẽ chỉ có hai trường hợp - hoặc là một lỗi mạng xảy ra, hoặc dữ liệu mà chúng tôi đã tải về hóa ra là không hợp lệ:

```
enum ImageLoadingError: Error {
    case networkFailure(Error)
    case invalidData
}
```

Sau đó, khi xây dựng bộ nạp hình ảnh, chúng tôi bây giờ có thể specialize Result với các loại lỗi trên - do đó cho phép chúng tôi gửi thông tin lỗi nhiều hơn đến các trang web cuộc gọi của chúng tôi:

```
struct ImageLoader {
    typealias Handler = (Result<UIImage, ImageLoadingError>) -> Void

    var session = URLSession.shared

    func loadImage(at url: URL,
                   then handler: @escaping Handler) {
        let task = session.dataTask(with: url) { result in
            switch result {
            case .success(let data):
                if let image = UIImage(data: data) {
                    handler(.success(image))
                } else {
                    handler(.failure(.invalidData))
                }
            case .failure(let error):
                handler(.failure(.networkFailure(error)))
            }
        }

        task.resume()
    }
}
```

Việc thiết kế trên thì cho phép chúng tôi để xử lý từng lỗi tiềm năng trong một thời trang nhiều chi tiết hơn khi sử dụng bộ nạp hình ảnh của chúng tôi, ví dụ như thế này:

```
let imageURL = URL(string: "https://www.swiftbysundell.com/images/logo.png")!
let imageLoader = ImageLoader()

imageLoader.loadImage(at: imageURL) { result in
    switch result {
    case .success(let image):
        // Handle image
        ...
    case .failure(.invalidData):
        // Handle an invalid data failure
        ...
    case .failure(.networkFailure(let error)):
        // Handle any network error
        ...
    }
}
```

Swift tích hợp trong loại Result chỉ có thể mất một vài dòng code để khai báo, nhưng các mô hình mà nó cho phép chúng tôi áp dụng là thật sự mạnh mẽ, và có thể dẫn đến mã đơn giản hơn nhiều - đặc biệt là khi thực hiện hoạt động không đồng bộ, chẳng hạn như các cuộc gọi mạng.

Bài viết được dịch từ [bài viết cùng tên của tác giả  John Sundell.](https://www.swiftbysundell.com/basics/result/)