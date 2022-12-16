Swift 5.0 mang đến một số cải tiến ngôn ngữ mới cùng với sự ổn định của ABI và một trong số đó là thêm **Result** SDK vào thư viện chuẩn. Kết quả cho chúng ta cách xử lý lỗi đơn giản hơn, rõ ràng hơn trong mã phức tạp, chẳng hạn như asynchronous APIs.

Và đặc biệt khi kết nối nhiều lệnh gọi API với nhau.

# Tổng quan

Sử dụng **Result** và **Grand Central Dispatch (GCD)**, chúng ta có thể viết code Swift như sau:
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

Ở đây, chức năng load thực hiện một vài lệnh gọi API liên tiếp trong background, mỗi lần chuyển kết quả của một cuộc gọi sang cuộc gọi tiếp theo. Sau đó, chúng ta xử lý kết quả cuối cùng trên main thread hoặc trong trường hợp một trong các cuộc gọi của chúng ta không thành công, chúng ta sẽ xử lý lỗi kết quả.

Ready? Hãy đào bới và xem cách thức thực hiện.

# Sử dụng Result 
Như bạn có thể biết, Result type  được triển khai như một enum có hai trường hợp: thành công và thất bại

Cả hai giá trị được xác định bằng cách sử dụng Generics để chúng có thể có giá trị liên quan đến lựa chọn của bạn, nhưng thất bại phải là một cái gì đó phù hợp với loại Error.

```
enum NetworkError: Error {
    case url
    case server
    }
func makeAPICall() -> Result<String?, NetworkError> {
    // our network code
}
```

Vì vậy, trong ví dụ ở trên, bạn có thể thấy rằng chúng ta có một hàm trả về Kết quả có kiểu dữ liệu là optional String và loại lỗi có kiểu NetworkError.

Vì vậy, hãy nhìn vào mã gọi và xem cách chúng tôi có thể gọi hàm của chúng ta và xử lý kết quả của chúng ta:

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

Hàm tải thực hiện cuộc gọi trên concurrent background thread bằng cách sử dụng DispatchQueue.global (qos: .utility) .async, và sau đó gọi makeAPICall.

Sau đó, nó chuyển trở lại main thread để xử lý kết quả, đó là dữ liệu chúng ta muốn (thành công) hoặc lỗi loại NetworkError (thất bại).

Điều đó nói rằng, bạn có thể hơi bối rối vào thời điểm này, bởi vì thông thường khi chúng ta thực hiện cuộc gọi API, chúng ta thường cần sử dụng một số loại callback closure  để xử lý kết quả của mình, nhưng ở đây chúng ta chỉ cần gán kết quả của hàm cho ta kết quả local.

Well, đây là lúc Grand Central Dispatch (GCD) phát huy tác dụng.

# Tạo API Calls sử dụng Result

Đầu tiên, hãy để thực sự thực hiện chức năng makeAPICall. Ở đây, chúng ta sẽ bổ sung chức năng, xác định url và tạo một trình giữ chỗ cho kết quả trả về.

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

Lưu ý trong guard trả về một Kết quả.failure (.url) nếu vì lý do nào đó chúng tôi có một bad URL.

Bây giờ, hãy xây dựng một cuộc gọi API tiêu chuẩn bằng URLSession.

```
URLSession.shared.dataTask(with: url) { (data, _, _) in
    if let data = data {
        result = .success(String(data: data, encoding: .utf8))
    } else {
        result = .failure(.server)
    }
}.resume()
```

Điều này khá đơn giản. Nếu chức năng callback có dữ liệu, chúng ta sẽ gán nó cho kết quả dưới dạng giá trị .success.

Và nếu gặp lỗi, gán giá trị ens .server cho .failure. Chúng ta có thể kiểm tra các giá trị phản hồi và lỗi nếu chúng ta muốn thực hiện công việc tốt hơn để thông báo cho người gọi về chính xác những gì đã sai, nhưng điều này là đủ tốt cho bây giờ.

Chúng ta đã dịch thành công kết quả callback thành Kết quả, nhưng code vẫn chưa hoàn chỉnh trong đó chức năng sẽ cố gắng trả về giá trị kết quả, trước khi xảy ra callback dataTask.

Trên thực tế, Code sẽ bị crash do kết quả được xác định là tùy chọn hoàn toàn unwrapped optional và chức năng cố gắng mở khóa trước khi nó được gán!

So let’s fix that.

# Making API Calls Using CGD Semaphores (Thực hiện cuộc gọi API bằng cách sử dụng ngữ nghĩa CGD)

Chúng tôi đã có hầu hết những gì cần, vì vậy, hãy để thêm vài dòng code làm cho chức năng hoạt động.

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

Sau khi chúng tôi xác định Result, chúng ta tạo ra một semaphore Grand Central Dispatch với giá trị 0.

Semaphores thường được sử dụng trong các ứng dụng đa luồng để chặn truy cập vào một block code nhất định cho đến khi block completes. Bạn chặn quyền truy cập bằng cách chờ đợi trên semaphore và bạn cấp quyền truy cập bằng cách gọi tín hiệu trên semaphore.

Trong đoạn mã trên, gọi semaphore.wait sau khi bắt đầu các lệnh gọi API dataTask của tôi truy cập vào dòng mã tiếp theo, câu lệnh trả về. Điều này tạm dừng thread hiện tại tại điểm đó.

Khi hàm callback thực thi trên thread của nó, chúng ta gán dữ liệu hoặc lỗi cho hàm của chúng ta giá trị kết quả bên trong của hàm và sau đó gọi semaphore.signal ().

Điều đó, cho phép luồng chức năng ban đầu tiếp tục và trả về kết quả mà chúng ta vừa được gán, sau đó được gán cho giá trị kết quả trong hàm tải.

Và bây giờ chúng ta có câu trả lời là làm thế nào chúng ta có thể gán một cách kỳ diệu kết quả của một cuộc gọi asynchronous theo cách có vẻ synchronous.

#  Ứng Dụng Chúng Vào Multiple API Calls
ví dụ ban đầu của chúng ta đã thể hiện các lệnh gọi API “chaining”, đây là một trong những thủ thuật mà bạn thường sử dụng async / await.

```
func processImageData1() async -> Image {
  let dataResource  = await loadWebResource("dataprofile.txt")
  let imageResource = await loadWebResource("imagedata.dat")
  let imageTmp      = await decodeImage(dataResource, imageResource)
  let imageResult   = await dewarpAndCleanupImage(imageTmp)
  return imageResult
}
```

Ví dụ, hãy Giả sử rằng chúng ta có thêm một vài lệnh gọi API giống như sau:

```
func anotherAPICall(_ param: String?) -> Result<Int, NetworkError>
{ ... }
func andAnotherAPICall(_ param: Int) -> Result<User, NetworkError> 
{ ... }
```

Và các chức năng đó được triển khai bằng GCD và Kết quả chính xác như chúng tôi đã thực hiện với makeAPICall ().

Cho rằng, và giả sử chúng ta muốn thực hiện các cuộc gọi đó liên tiếp trước, sau đó đến lần khác, chức năng tải của chúng ta bây giờ trông chính xác như trong ví dụ đầu tiên:

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

Có một số hoạt động được xác định trên Result và một trong số chúng được gọi là FlatMap.

Sử dụng FlatMap trên Kết quả sẽ chuyển giá trị của Result hiện tại sang map closure, đến lượt nó có thể trả về Result mới cùng loại hoặc thuộc loại khác. (IOW, chúng ta ánh xạ Kết quả <A, MyError> thành Kết quả <B, MyError>)

Trong đoạn mã trên, chúng ta sử dụng FlatMap để lấy chuỗi tùy chọn Result của cuộc gọi đầu tiên và chuyển nó đến closure đầu tiên, điều này thực hiện cuộc gọi API thứ hai trả về Result của chính nó.

Sau đó, chúng tôi chuyển giá trị số nguyên từ Result đó sang closure thứ hai chứa lệnh gọi API thứ ba, cuối cùng trả về Result có chứa User đã tải.

Mỗi lệnh chờ kết quả của lệnh gọi API trước đó trước khi tiếp tục.

Voila! Các cuộc gọi API được xâu chuỗi bằng Result, GCD và FlatMap.

# Ummm… What About Errors?
Bạn có thể tự hỏi điều gì xảy ra nếu cuộc gọi API đầu tiên không thành công với một lỗi?

Trong trường hợp đó FlatMap không gọi là closure có chứa otherAPICall () và chỉ đơn giản chuyển vào trường hợp .failure được trả về bởi makeAPICall ().

Điều đó xảy ra một lần nữa với FlatMap tiếp theo và andAntherAPICall () và cuối cùng Swift kết thúc việc gán kết quả thất bại đầu tiên cho biến kết quả cuối cùng của chúng ta, sau đó được xử lý bởi câu lệnh switch.

Điều tương tự xảy ra nếu cuộc gọi API thứ hai hoặc thứ ba không thành công, trong đó mọi thứ vượt qua trạng thái lỗi sẽ không được gọi.

# Threading

Một điểm đáng nói cuối cùng là semaphore.wait () sẽ chặn luồng hiện tại cho đến khi nó bị chặn bởi semaphore.signal ().

Đó là lý do tại sao trong chức năng tải của chúng ta, chúng ta đã bắt đầu toàn bộ quá trình bằng cách ném các yêu cầu của chúng ta lên một background utility thread mà chúng ta có thể tạm dừng và tiếp tục theo ý muốn, và sau đó khi chúng ta hoàn thành, chuyển sang main thread để cập nhật giao diện người dùng của mình với các kết quả.

Chặn luồng chính bằng semaphore.wait () sẽ chặn giao diện người dùng của bạn cho đến khi các lệnh gọi API của bạn hoàn tất, vì vậy LUÔN LUÔN sử dụng kỹ thuật này trên một background thread hoặc operation block.

[Swift 5: How to do Async/Await with Result and GCD](https://medium.com/@michaellong/how-to-chain-api-calls-using-swift-5s-new-result-type-and-gcd-56025b51033c)