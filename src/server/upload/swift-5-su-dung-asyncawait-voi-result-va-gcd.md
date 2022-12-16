Swift 5.0 mang đến một số cải tiến mới khá thú vị trong đó có việc thêm `Result` vào thư viện chuẩn( standard library). `Result` giúp chúng ta xử lý đơn giản hơn, rõ ràng hơn trong các đoạn code phức tạp, chẳng hạn như đồng bộ APIs.
Đặc biệt khi kết nối nhiều lệnh gọi APIs với nhau.

# Tổng quan
Sử dung Result và Grand Central Dispatch (GCD), bạn có thể viết các đoạn code đơn thuần như sau:

```
 func load() {
        DispatchQueue.global(qos: .utility).async {
           let result = self.makeAPICall()
                .flatMap { self.anotherAPICall($0) }
                .flatMap { self.andAnotherAPICall($0) }
            
            DispatchQueue.main.async {
                switch result {
                case let .success(data):
                    print(data)
                case let .failure(error):
                    print(error)
                }
            }
        }
    }
```

ở đây, load function thực hiện gọi một số APIs ở background, mỗi lẫn chuyển kết quả của gọi API đến lượt gọi tiếp theo. Sau đó, chúng ta sẽ xử lý kết quả cuối cùng ở main thread, hoặc trong trường hợp một số lần gọi không thánh công, chúng ta sẽ xử lý lỗi. 

Bạn đã sẵn sàng? Bây giờ hãy tìm hiểu sâu hơn về cách thức thực hiện.

# Using Result

Như bạn có thế biết, Result type được triển khai như một enum có hai trường hợp: success và failure.

Cả hai giá trị được định nghĩa bằng cách sử dụng `generics` , để chúng có thể có giá trị liên quan đến lựa chọn của bạn. Nhưng trường hợp failure phải phù hợp với Error type của Swift.

```
enum NetworkError: Error {
    case url
    case server
    }
func makeAPICall() -> Result<String?, NetworkError> {
    // our network code
}
```

Theo ví dụ trên, bạn có thể nhìn thấy rằng chúng ta có một function trả về Result với data là kiểu String và error type là NetworkError.

Vì vậy, hãy nhìn đoạn code gọi API và xem cách chúng ta gọi hàm và xử lý lỗi: 

```
func load() {
   DispatchQueue.global(qos: .utility).async {
     let result = self.makeAPICall()
     DispatchQueue.main.async {
         switch result {
           case let .success(data):
               print(data)
            case let .failure(error):
               print(error)
            }
        }
    }
}
```

Load function thực hiện gọi trên một background thread đồng thời, sử dụng `DispatchQueue.global(qos: .utility).async,`, sau đó gọi `makeAPICall`.

Sau đó, nó chuyển về main thread để xử lý kết quả, đó là data chúng ta muốn (thành công) hoặc một lỗi kiểu NetworkError(failure). 

Rất đẹp và rõ ràng.

Điều này có thể khiến bạn thấy hơi bối rối, bởi vì thông thường khi chúng ta thực hiện gọi API, chúng ta thưởng sử dụng một số callback closure để xử lý kết quả, nhưng ở đây chỉ cần gấn kết quả của hàm xử dụng local.

Đây là lúc `Grand Central Dispatch (GCD)` phát huy tác dụng. 

# Thực hiện gọi API bằng Result

Đầu tiên, hãy thực hiện makeAPICall function ở đây. Ở đây, chúng ta sẽ bổ sung chức năng của mình, xác định url và tạo một placeholder cho kết quả trả về. 

```
func makeAPICall() -> Result<String?, NetworkError> {
    let path = "https://jsonplaceholder.typicode.com/todos/1"
    guard let url = URL(string: path) else {
        return .failure(.url)
    }
    var result: Result<String?, NetworkError>!
    // API Call Goes Here
    return result
}
```

Lưu ý trong guard statement, chúng ta trả về một `Result.failure(.url)` nếu vì lý do nào đó chúng ta có một url xấu.

Bây giờ, hãy xây dựng một hàm gọi API bằng `URLSession`.

```
URLSession.shared.dataTask(with: url) { (data, _, _) in
        if let data = data {
            result = .success(String(data: data, encoding: .utf8))
        } else {
            result = .failure(.server)
        }
    }.resume()
```

Điều này khá đơn giản, nếu `callback function` có data, bạn gắn nó cho kết quả dưới dạng giá trị success.

Nếu gặp lỗi, bạn gắn giá trị server enum tới. Bạn có thể kiểm tra giá trị phản hồi và lỗi nếu muốn thống báo chính xác hơn những vấn đề đang xảy ra. Tuy hiện như thế này là đủ dùng cho mục đích hiện tại.

Chúng ta đã dịch thành công callback vào Result, nhưng code của chúng ta vẫn chưa hoàn chỉnh trong đó function sẽ cố gắng trả về giá trị trước khi dataTask thực hiện callback.

Trên thực tế, bạn sẽ bị crash do kết quả được xác định là unwrapped optional và function sẽ cố gắng unwrap nó trước khi được gán.

Điều đó thật sự không tốt, hãy sửa nó.

# Thực hiện gọi API sử dụng CGD

Bạn đã có những gì cần thiết, hay thêm 3 dòng code để function hoạt động

Để rõ ràng, tôi sẽ hiển thị toàn bộ code của makeAPICall

```
func makeAPICall() -> Result<String?, NetworkError> {
    let path = "https://jsonplaceholder.typicode.com/todos/1"
    guard let url = URL(string: path) else {
        return .failure(.url)
    }
    var result: Result<String?, NetworkError>!
    
    let semaphore = DispatchSemaphore(value: 0)
    URLSession.shared.dataTask(with: url) { (data, _, _) in
        if let data = data {
            result = .success(String(data: data, encoding: .utf8))
        } else {
            result = .failure(.server)
        }
        semaphore.signal()
    }.resume()
    _ = semaphore.wait(wallTimeout: .distantFuture)
    return result
}
```

Sau khi bạn define Result, bạn cần tạo một Grand Central Dispatch semaphore với giá trị 0.

Semaphores thường được dùng trong ứng dụng multithread để chặn truy cập vào một block nhất định cho đến khi nó hoàn thành. Bạn chặn quyền truy cập bằng cách chờ đợi semaphore, và cấp quyền truy cập bằng tín hiệu semaphore.

Trong đoạn code trên, bạn gọi semaphore.wait sau khi block gọi API truy cập vào dòng lệnh tiếp theo. Lệnh Return của chúng ta. Điều này dừng thread hiện tại ở đó.

Khi callback funtion thực thi trên thread của nó, chúng ta sẽ gắn giá trị hoặc lỗi giá trị kết quả bên trong hàm và gọi semaphore.signal().

Điều này, đến lượt nó, thread ban đầu sẽ tiếp tục và trả về kết quả nó được gán. 

Và bây giờ chúng ta đã có câu trả lời làm sao để gắn kết quả trong một asynchronous call

# Xâu chuỗi nhiều lệnh gọi API

Sử dụng `async/await`

```
func processImageData1() async -> Image {
  let dataResource  = await loadWebResource("dataprofile.txt")
  let imageResource = await loadWebResource("imagedata.dat")
  let imageTmp      = await decodeImage(dataResource, imageResource)
  let imageResult   = await dewarpAndCleanupImage(imageTmp)
  return imageResult
}
```

Ví dụ bạn có thêm một số lệnh gọi API như sau.

```
func anotherAPICall(_ param: String?) -> Result<Int, NetworkError>
{ ... }
func andAnotherAPICall(_ param: Int) -> Result<User, NetworkError> 
{ ... }
```

Và những function này được triển khai bằng `GCD` và `Result` giống như `makeAPICall()`

```
func load() {
        DispatchQueue.global(qos: .utility).async {
            let result = self.makeAPICall()
                .flatMap { self.anotherAPICall($0) }
                .flatMap { self.andAnotherAPICall($0) }
            
            DispatchQueue.main.async {
                switch result {
                case let .success(data):
                    print(data)
                case let .failure(error):
                    print(error)
                }
            }
        }
    }
```

# FlatMap?

Một số hoạt động được xác định trên `Result`, và một trong số chúng được gọi là `flatMap`. 

Sử dụng `FlatMap` trên `Result` sẽ chuyển giá trị của `Result` hiện tại vào map closure mà đến lượt nó sẽ trả về một `Result` mới. 

Ở đoạn code trên, chúng ta sử dụng `flatMap` để lấy `Result` của lần gọi đầu tiên, và chuyển vào closure đầu tiên để thực hiện gọi API lần hai, và trả về kết quả chính trên `Result`.

Và sau đó giá trị được chuyển từ kết quả của Closure thứ hai và gọi API lần thứ ba, cuối cùng `Result` sẽ chứa đối tượng User.

Các lượt gọi API được xâu chuỗi bằng Result, GCD và FlatMap.

# Xử lý Error thế nào?

Bạn tự hỏi điều gì xảy ra khi API đầu tiên xảy ra lỗi.

Trong trường hợp đó flatMap không gọi `anotherAPICall() ` , chỉ đơn giản trả về trường hợp ` .failure` của `makeAPICall()`.

Điều đó xảy ra một lần nữa với `flatMap` tiếp theo và Swift gán kết quả lỗi đầu tiên cho kết quả cuối cùng, và được xử lý bởi lệnh `switch`.

Điều này cũng tương tự với lượt gọi API thứ hai và ba.

# Threading

Điều đáng nói cuối cùng là ` semaphore.wait()` sẽ chặn thread hiện tại cho đến khi nó được mở bởi `semaphore.signal()`. 

Đó là lý do tại sao load function của chúng ta bắt đầu bằng cách đưa tât cả vào background bạn có thể dừng hoặc tiếp tục theo ý muốn, sau khi hoàn thành chúng ta sẽ chuyển về main thread để cập nhật lại giao diện.

Nếu bạn chặn main thread với semaphore.wait(), bạn sẽ chặn luôn tương tác của người dùng, vì vậy luôn luôn sử dụng kĩ thuật này trên backgound hoăc một closure khác.

[Nguồn](https://medium.com/@michaellong/how-to-chain-api-calls-using-swift-5s-new-result-type-and-gcd-56025b51033c)