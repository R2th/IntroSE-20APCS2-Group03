Có rất nhiều ứng dụng đòi hỏi bạn cần phải gửi nhận dữ liệu giữa client và server liên tục. Khi đó bạn cần phải sử dụng socket để làm điều đó. Vậy socket là gì, sử dụng nó như thế nào, làm sao để đóng gói dữ liệu gửi đi và khi nhận được dữ liệu dạng byte thì làm sao để convert nó sang kiểu dữ liệu nguyên thuỷ. Bài viết này mình sẽ giúp các bạn có thể hiểu cơ bản và mô hình làm việc của nó.

# 1. Socket
### 1.1 Socket là gì?
- Phía server: Thông thường là một chương trình server chạy trên một máy tính cụ thể, chương trình này sẽ có server socket và được ràng buộc bởi một cổng (port number) chỉ chờ đợi các client thực hiện một yêu cầu kết nối tới.
- Phía client: Cần phải biết server ở địa chỉ nào, cổng nào mới có thể kết nói tới. Khi đó để thực hiện một yêu cầu kết nối thì client có gắng tạo ra "cuộc gặp gỡ" với server dựa trên địa chỉ và số cổng.

![](https://viblo.asia/uploads/5b4b2b5e-75af-4c30-9ad4-250c5f675a39.png)

- Nếu mọi việc ok thì chương trình ở máy chủ sẽ chấp nhận kết nối từ phía client. Khi chấp nhận máy chủ có một socket mới bị ràng buộc cùng cổng và thông tin đầu cuối ở đây là remote endpoint chính là địa chỉ và cổng của client.
- Để hiểu một cách đơn giản các bạn hãy xem hình ảnh sau:

![](https://viblo.asia/uploads/953c7488-d07c-409e-9884-3966a3f1605f.png)

### 1.2 Kết nối Socket
- Trong bài viết này mình sẽ nói về các kết nối socket với môi trường iOS sử dụng GCDAsyncSocket, swift 3.0

**Bước 1: Chuẩn bị**
- Tạo một class và đặt tên NCAsyncSocket và share instance

```
class NCAsyncSocket {
    class var shared: NCAsyncSocket {
        struct Instance {
            static let instance = NCAsyncSocket()
        }
        return Instance.instance
    }
}
```

- Các bạn có thể sử dụng thư viện  **CocoaAsyncSocket** để tạo kết nối socket
- Định nghĩa Host và port
```
let SERVER_HOST = ""
let SERVER_PORT = 1234
```

**Bước 2: Tạo kết nối**
- Trạng thái socket được định nghĩa như sau
```
enum SocketState {
    case Connected
    case Disconnected
}
```

- Tại phương thức khởi tạo

```
override init() {
        super.init()
        socketClient = GCDAsyncSocket(delegate: self, delegateQueue: DispatchQueue.main)
        socketClient?.delegate = self
        socketState = .Disconnected
    }
```

- Tạo kết nối: Nhìn vào đoạn code dưới rõ ràng bạn chỉ cần đầu vào là host và port
```
func connect() {
        if socketState == .Disconnected {            
            do {
                try socketClient?.connect(toHost: SERVER_HOST, onPort: UInt16(SERVER_PORT))
            } catch {
                //TODO when can not connect to server
            }
        }
    }
```
- Giờ đây bạn có thể xem trạng thái kết nối thông qua 2 delegate sau:

```
func socket(_ sock: GCDAsyncSocket, didConnectToHost host: String, port: UInt16) {

}
func socketDidDisconnect(_ sock: GCDAsyncSocket, withError err: Error?) {

}
```

**Bước 3: Kiểm tra kết nối**
- Bạn run và đặt break point xem đã kết nối được chưa nhé.

# 2. Đóng gói dữ liệu
- Dữ liệu gửi đi bạn cần phải được đóng gói, việc làm này phải thống nhất các sắp xếp dữ liệu, cách quy định sử dụng số byte cho mỗi giá trị gửi đi giữa người làm server và client. Nghe vậy có vẻ như nó rất rắc rối. Nhưng để đơn giản mình giới thiệu với các bạn về message pack (tham khảo tại http://msgpack.org, specs https://github.com/msgpack/msgpack/blob/master/spec.md)
- Các đặc trưng nổi bật của nó các bạn tự tìm hiểu nhé. Ở giới hạn bài viết này mình sẽ hướng dẫn cách đóng gói dữ liệu.
- Các bạn hiểu đơn giản như thế này: Việc dữ liệu gửi đi cần phải được đóng gói. Cách đóng gói cần phải có một quy định nhất định mà cả phía server và client biết. Và công việc đó đã được MessagePack đảm nhiệm rồi. Giờ chỉ cần dùng nó thế nào thôi.

```
override func packMessage() -> Data? {
        let value: [MessagePackValue] = [
            .int(messageType.rawValue),
            .int(messageId),
            .string(facebookId),
            .string(facebookToken)
        ]
        let packed = pack(.array(value))
        return packed
    }
```
- Trên đây là một gói tin được đóng gói trước khi gửi đi
- Gói tin được gửi đi gồm 2 param kiểu int và 2 param kiểu string, đầu ra sẽ dạng Data (NSData)
- Như mình đã nói ở trên đó, việc quy định bao nhiêu byte để mã hoá 1 param ví dụ ở đây là int hay string thì công việc đó MessagePack đã làm giúp mình. Thứ tự đóng gói cũng là thứ tự trong mảng như trên. 
- Các bạn có thể tìm hiểu thêm việc chuyển từ kiểu dữ liệu nguyên thuỷ sang byte như thế nào theo link specs mình cung cấp ở trên.

# 3. Gửi dữ liệu đi
- Sau khi đóng gói dữ liệu, chúng ta thử gửi đi xem thế nào nhé.

```
func send(data: Data, tag: Int64 = 1) {
    if socketState == .Connected {
        socketClient?.write(data, withTimeout: -1, tag: Int(tag))
    } else {
        NCMissDataQueue.shared.enqueue(data)
    }
}
```

- Trên đây là method cho phép bạn gửi dữ liệu đã đóng gói ở trên với kiểu là Data, bạn có thể gửi kèm tag đi theo gói tin đó. Trong method này mình có 1 queue chứa các data bị miss mà chưa gửi được. Queue này sẽ chứa các gói tin trong các trường hợp mất kết nối, khi có kết nối rồi các bạn hãy lấy các gói tin này và gửi lại.
- Trong trường hợp đang có kết  nối thì các bạn cứ gọi method gửi của socket bình thường.
- Một gói tin gửi đi làm thế nào bạn có thể biết nó đã được gửi đi thành công? GCDAsyncSocket có call back về cho bạn khi mà gói tin của bạn gửi đi thành công kèm theo tag của gói tin đó

```
func socket(_ sock: GCDAsyncSocket, didWriteDataWithTag tag: Int) {
    
}
```
Vậy bạn thử test nếu delegate này được call thì tức là bạn đã gửi thành công.

# 4. Nhận dữ liệu
- Khi dữ liệu của bạn được gửi đi, dữ liệu đó ban đầu nằm trong phần output stream của socket, khi được đẩy vào output stream thì socket sẽ lấy nó ra và gửi tới server. Server nhận và xử lý nó, tuỳ vào dữ liệu đó mà server sẽ có hành động response tương ứng (có hoặc không)
- Dữ liệu nhận được từ phía server sẽ gửi vào input stream của socket

```
func socket(_ sock: GCDAsyncSocket, didRead data: Data, withTag tag: Int) {
    
}
```
- Trên là delegate dữ liệu sau khi được chuyển từ dạng byte sang Data.
- Tới đây đã tới lúc lôi thằng messagepack ra rồi các bạn ạ. Nó sẽ unpack từng param cho chúng ta

```
bufferData.append(data)
let unpacked = try unpack(bufferData)
bufferData.removeAll()
bufferData.append(unpacked.remainder)
```
- Vấn đề là dữ liệu bạn nhận được có đủ gói hay không. Một đặc trưng của http, https dữ liệu bạn gửi đi sẽ không bị mất, nhưng không đảm bảo gửi đủ trong 1 lần. Vậy messagepack sẽ cứ đọc dữ liệu nhận được, nó tự biết cần phải đọc tới đâu và nếu phần còn thừa nó sẽ để vào một chỗ cho bạn chính là thằng remainder trong đoạn code trên. Bạn cần phải biết nó có hay không, nếu đọc append vào dữ liệu nhận được tiếp theo rồi parse.

# 5. Đọc dữ liệu nhận được
- Sau khi messagepack đọc được xong dữ liệu sẽ cho chúng ta một mảng dữ liệu. Việc của chúng ta là biết param nào làm nhiệm vụ gì và đọc ra mà sử dụng thôi.

```
override func unpackMessage() -> NCLoginResponseMessage? {
    guard let data = data else {
        return self
    }
    guard let count = data.arrayValue?.count, count > 5 else {
        return self
    }
    guard let token = data.arrayValue?[3].stringValue else {
        return self
    }
    fbToken = token
    guard let name = data.arrayValue?[4].stringValue else {
        return self
    }
    displayName = name
    guard let picture = data.arrayValue?[5].stringValue else {
        return self
    }
    fbUrl = picture
    return self
}
```

- Trên đây là một ví dụ trong project của mình để parse dữ liệu. Các bạn cứ parse theo thứ tự dữ liệu trả về thôi.

**Tổng kết:** Trên đây mình đã hướng dẫn các bạn cách để sử dụng messagepack kết hợp với socket để gửi nhận dữ liệu qua lại. Các bạn cùng đọc hiểu nhé