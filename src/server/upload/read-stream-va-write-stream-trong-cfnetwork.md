Ta sẽ đi xem xem làm thế nào để create, open và check errors khi làm việc với read và write stream. Đồng thời ta cũng sẽ nói về làm thế nào để đọc từ read stream và ghi vào write stream, cũng như làm thế nào để tránh bị blocking khi đọc và ghi vào một stream, và cuối cùng là làm thế nào để điều hướng stream thông qua một proxy server.

# Làm việc với Read Stream
Core Foundation stream có thể được sử dụng để đọc và ghi file hoặc làm việc với network socket. Các quá trình này đều có hoạt động tương tự.

## Tạo một Read Stream
Ta tạo read stream bằng câu lệnh như sau:
```
let myReadStream = CFReadStreamCreateWithFile(kCFAllocatorDefault, fileURL)
```
Trong ví dụ trên, tham số `kCFAllocatorDefault` chỉ định rằng ta sẽ sử dụng hệ thống cấp phát mặc định hiện tại để cấp phát bộ nhớ cho stream. Còn tham số `fileURL` chỉ định tên file mà stream sẽ tạo ra, ví dụ như là `file:///Users/huypham/Downloads/MyApp.sit`.

Tương tự như vậy, ta có tạo ra các cặp stream (read và write) gắn với socket dựa trên một network service bằng việc gọi hàm `CFStreamCreatePairWithSocketToCFHost` hay `CFStreamCreatePairWithSocketToNetService`.

Sau khi tạo stream, ta cần phải open nó. Việc open một stream là cách để stream yêu cầu các tài nguyên hệ thống mà nó cần, ví dụ như file descriptor khi ta mở một stream để đọc file.

```
if !CFReadStreamOpen(myReadStream) {
    // Có lỗi xảy ra
    let myError = CFReadStreamGetError(myReadStream)
    if myError.domain == CFStreamErrorDomain.POSIX.rawValue {
        // Đọc error code sử dụng <sys/errno.h>
    } else if myError.domain == CFStreamErrorDomain.macOSStatus.rawValue {
        // Đọc error code sử dụng MacTypes.h
    }
    // Kiểm tra các error domain khác
    // ...
}

```

Hàm `CFReadStreamOpen` trả về `true` nếu stream có thể open được và `false` nếu stream không thể open vì một lý do nào đó. Nếu `CFReadStreamOpen` trả `false`, ví dụ trên gọi tới hàm `CFReadStreamGetError`, hàm này sẽ trả về một struct `CFStreamError` có chứa hai giá trị: một domain code và một error code. Domain code về mặt ý nghĩa nó sẽ xác định error code thuộc về loại lỗi nào. Ví dụ, nếu domain code là `CFStreamErrorDomain.POSIX` thì error code là một mã lỗi thuộc về UNIX. Còn nếu domain code là `CFStreamErrorDomain.macOSStatus` thì error code sẽ là một giá trị `OSStatus` được định nghĩa trong `MacErrors.h`. Còn với domain code là `kCFStreamErrorDomainHTTP`, error code sẽ được xác định trong enum `CFStreamErrorHTTP`.

Open một stream có thể sẽ tốn thời gian, do đó hàm `CFReadStreamOpen` và `CFWriteStreamOpen` tránh blocking bằng việc trả về `true` để xác định rằng quá trình open stream đã bắt đầu (chứ không phải `true` là open xong). Để kiểm tra tình trạng open, ta gọi hàm `CFReadStreamGetStatus` và `CFWriteStreamGetStatus`, nó sẽ trả về `CFStreamStatus.opening` nếu quá trình open vẫn đang diễn ra, `CFStreamStatus.open` nếu đã mở xong, hoặc `CFStreamStatus.error` nếu quá trình mở thất bại. Trong phần lớn trường hợp, việc open có hoàn thành hay không cũng không thành vấn đề vì CFStream cũng không thể đọc và ghi khi stream chưa mở.

## Đọc dữ liệu từ Read Stream
Để đọc dữ liệu từ read stream, ta gọi hàm `CFReadStreamRead`, tương tự như hàm hệ thống UNIX `read()`. Cả hai hàm này đều cần truyền vào buffer và độ dài buffer. Cả hai đều trả về số lượng byte đọc được, 0 nếu đọc hết file, -1 nếu xảy ra lỗi. Cả hai đều gây block cho tới khi có ít nhất một byte có thể đọc được, và sẽ nhả block khi buffer đầy.

```
var numBytesRead: CFIndex = 0
repeat {
    var buffer: [UInt8] = [UInt8](repeating: 0, count: myReadBufferSize)
    numBytesRead = CFReadStreamRead(myReadStream, &buffer, myReadBufferSize)
    if numBytesRead > 0 {
        // Xử lý các byte đọc được
    } else if numBytesRead < 0 {
        let error = CFReadStreamGetError(myReadStream)
        // Xử lý error
    }
} while numBytesRead > 0
```

## Tearing Down a Read Stream
Khi tất cả dữ liệu đã đọc xong, ta nên gọi hàm `CFReadStreamClose` để đóng stream, hàm này sẽ release các tài nguyên hệ thống gắn với stream đó. Sau đó ta release stream bằng cách gọi hàm `CFRelease`, nhưng đó là nếu ta sử dụng `Unmanaged` object, còn nếu không thì giờ bộ nhớ cấp phát cho Core Foundation object đều đã được tự hệ thống quản lý, ta không cần gọi hàm này nữa mà chỉ cần xóa bỏ tham chiếu tới stream bằng việc set `nil` cho nó.

```
CFReadStreamClose(myReadStream)
myReadStream = nil
```

# Làm việc với Write Stream
Làm việc với write stream cũng tương tự như với read stream. Một điểm khác biệt chính đó là hàm `CFWriteStreamWrite` không đảm bảo sẽ nhận toàn bộ byte ta truyền vào. Thay vào đó, `CFWriteStreamWrite` trả về số lượng byte mà nó đã nhận. Đoạn code dưới đây thể hiện cách xử lý cho vấn đề này.

```
var buffer: [UInt8] = Array("Hello, world".utf8)
var bufferLength: CFIndex = buffer.count
var done = false

while (!done) {
    let bytesWritten = CFWriteStreamWrite(myWriteStream, buffer, bufferLength)
    if bytesWritten < 0 {
        let error = CFWriteStreamGetError(myWriteStream)
        // Xử lý lỗi
    } else if bytesWritten == 0 {
        if CFWriteStreamGetStatus(myWriteStream) == .atEnd {
            done = true
        }
        // Hoàn thành việc write stream
    } else if bytesWritten != bufferLength {
        // Xác định xem đã ghi được bao nhiêu và điều chỉnh lại buffer
        bufferLength = bufferLength - bytesWritten
        memmove(&buffer, &buffer + bytesWritten, bufferLength)
        // Tìm xem có vấn đề gì xảy ra với write stream
        let error = CFWriteStreamGetError(myWriteStream)
        // Xử lý error
    }
}
CFWriteStreamClose(myWriteStream)
myWriteStream = nil
```

# Tránh blocking khi làm việc với Stream
Khi sử dụng stream để tương tác, sẽ có luôn có những khi mà dữ liệu trao đổi tốn rất nhiều thời gian, đặc biệt là khi làm việc với socket-based streams. Nếu ta thiết lập stream hoạt động đồng bộ (synchronously), toàn bộ app sẽ bị đứng yên để đợi dữ liệu trao đổi. Do đó, ta cần phải thiết lập theo một cách khác để tránh blocking.

Có hai cách để tránh blocking khi đọc hoặc ghi dữ liệu tới một CFStream object:
- Sử dụng run loop: Ta sẽ đi register để nhận các stream-related event và schedule stream vào một run loop. Khi một event xảy ra, hàm callback (mà ta truyền vào lúc register run loop) sẽ được gọi.
- Polling (thăm dò) : Với read stream, xem trước xem có byte nào để đọc không trước khi đọc từ stream. Với write stream, xem trước xem stream có thể ghi vào mà không bị block không trước khi ghi vào stream.

## Sử dụng run loop để tránh blocking
Đây là cách được sử dụng nhiều hơn. Một run loop chạy trên luồng chính. Nó sẽ đợi event xảy ra, sau đó gọi hàm mà được gắn với event đó.
Trong trường hợp đang truyền dữ liệu qua mạng, hàm callback sẽ được thực hiện bởi run loop khi event mà ta đăng ký xảy ra. Làm thế này thì đỡ phải thăm dò socket stream vì cái việc thăm dò sẽ làm chậm luồng.

Ví dụ dưới đây tạo ra một socket read stream:
```
CFStreamCreatePairWithSocketToHost(kCFAllocatorDefault, host, port, &myReadStream, nil)
```
`host` là một CFHost object reference, chỉ định remote host mà read stream sẽ đọc từ đó, `port` chỉ định port mà host đó sử dụng. Hàm `CFStreamCreatePairWithSocketToCFHost` trả về một read stream mới và `myReadStream`. Tham số cuối cùng là ta truyền nil để chỉ định rằng ta ko muốn tạo write stream. Nếu muốn tạo thì truyền `&myWriteStream` vào.

Trước khi open socket read stream, ta cần tạo một context để sử dụng khi register các stream-related event:
```
var myContext = CFStreamClientContext(version: 0, info: myPtr, retain: myRetain, release: myRelease, copyDescription: myCopyDesc)
```
Tham số đầu tiên ta truyền 0 để xác định version number. 
Tham số `info`, ta truyền `myPtr`, là một pointer trỏ tới dữ liệu mà ta muốn pass vào hàm callback. Thông thường, `myPtr` là một pointer trỏ tới một struct mà ta định nghĩa để chứa các thông tin liên quan tới stream. 
Tham số `retain`, là một pointer trỏ tới một function để retain `info`. Vì thế nếu ta truyền vào như trên, CFStream sẽ gọi `myRetain(myPtr)` để retain `info` pointer.
Tương tự như vậy, tham số `release`, là một pointer trỏ tới một hàm để release `info`. Khi stream bị gắt liên kết từ context, CFStream sẽ gọi `myRelease(myPtr)`.
Cuối cùng, tham số `copyDescription` là một pointer trỏ tới một hàm để cung cấp mô tả của stream. Ví dụ, nếu ta gọi hàm `CFCopyDesc(myReadStream)` với stream client context ở trên, CFStream sẽ gọi `myCopyDesc(myPtr)`.

Client context cũng cho phép ta thiết lập nil cho các tham số `retain`, `release`, `copyDescription`. Nếu `retain` và `release` set nil, ta cần phải giữ cho bộ nhớ trỏ tới `info` để giữ con trỏ này sống cho tới khi stream tự hủy. Nếu `copyDescription` set nil, khi ta request mô tả stream, hệ thống sẽ tự cung cấp một mô tả thô về những gì có trong vùng nhớ mà `info` đang trỏ tới.

Với client context được thiết lập, ta gọi hàm `CFReadStreamSetClient` để đăng ký nhận các stream-related event. `CFReadStreamSetClient` yêu cầu ta chỉ định một callback function và các event mà ta muốn nhận. Ví dụ dưới đây chỉ định hàm callback muốn nhận về các event `.hasBytesAvailable`, `.errorOccured`, `.endEncountered`. Sau đó schedule stream lên run loop với hàm `CFReadStreamScheduleWithRunLoop`.

```
let registeredEvents: CFOptionFlags = CFStreamEventType.hasBytesAvailable.rawValue | CFStreamEventType.errorOccurred.rawValue | CFStreamEventType.endEncountered.rawValue
if CFReadStreamSetClient(myReadStream, registeredEvents, myCallBack, &myContext) {
    CFReadStreamScheduleWithRunLoop(myReadStream, CFRunLoopGetCurrent(), .commonModes)
}
```

Với stream được schedule trên run loop, ta đã sẵn sàng để open stream

```
if !CFReadStreamOpen(myReadStream) {
    // Có lỗi xảy ra
    let myError = CFReadStreamGetError(myReadStream)
    if myError.domain == CFStreamErrorDomain.POSIX.rawValue {
        // Đọc error code trong <sys/errno.h>
    } else if myError.domain == CFStreamErrorDomain.macOSStatus.rawValue {
        // Đọc error code trong MacTypes.h
    }
    // Check các error domain khác
} else {
    // Chạy runloop
    CFRunLoopRun()
}
```

Bây giờ, ta chỉ việc đợi hàm callback được gọi. Trong hàm callback, ta kiểm tra event code và đưa ra các xử lý thích hợp.

```
let myCallBack = { (stream: CFReadStream?, event: CFStreamEventType, pointer: UnsafeMutableRawPointer?) in
    switch event {
    case .hasBytesAvailable:
        // Ta có thể gọi CFReadStreamRead ở đây mà không lo block vì đang có bytes để đọc
        let buffer: [UInt8] = [UInt8](repeating: 0, count: BUFSIZE)
        let bytesRead = CFReadStreamRead(stream, buffer, BUFSIZE)
        if bytesRead > 0 {
            // Xử lý các byte đọc được
        }
        // Ta có thể bỏ qua các xử lý khi bytesRead nhỏ hơn hoặc bằng 0 vì những trường hợp đó sẽ call tới các event khác
    case .errorOccurred:
        let error = CFReadStreamGetError(stream)
        // Xử lý error
        CFReadStreamUnscheduleFromRunLoop(stream, CFRunLoopGetCurrent(), .commonModes)
        CFReadStreamClose(stream)
    case .endEncountered:
        // Xử lý hoàn tất
        CFReadStreamUnscheduleFromRunLoop(stream, CFRunLoopGetCurrent(), .commonModes)
        CFReadStreamClose(stream)
    default:
        break
    }
}
```

Khi hàm callback nhận `.hasBytesAvailable` event, ta sẽ gọi `CFReadStreamRead` để đọc dữ liệu.

Khi hàm callback nhận `.errorOccurred` event, ta sẽ gọi `CFReadStreamGetError` để lấy error và xử lý.

Khi hàm callback nhận `.endEncountered` event, ta sẽ xử lý việc hoàn tất đọc từ stream và gọi `CFReadStreamUnscheduleFromRunLoop` để tháo stream ra khỏi run loop. Sau đó gọi `CFReadStreamClose` để đóng stream và gọi `CFRelease` để release stream nếu cần.

## Polling một Network Stream
Tổng quan mà nói, việc thăm dò một network stream khá là không tốt. Tuy nhiên nó vẫn có ích trong một số trường hợp nhất định. Để poll một stream, đầu tiên ta cần phải kiểm tra xem stream đã sẵn sàng để đọc hoặc ghi hay chưa, sau đó thực hiện đọc và ghi trên stream.

Khi ghi lên một write stream, ta có thể xác định nếu stream đã sẵn sàng để nhận dữ liệu chưa bằng cách gọi hàm `CFWriteStreamCanAcceptBytes`. Nếu trả `true`, ta có thể đảm bảo rằng gọi hàm `CFWriteStreamWrite` sẽ gửi dữ liệu ngay lập tức mà không block app lại.

Tương tự với read stream, trước khi gọi `CFReadStreamRead`, ta gọi hàm `CFReadStreamHasBytesAvailable` để kiểm tra.

Ví dụ polling một read stream
```
while !done {
    if CFReadStreamHasBytesAvailable(myReadStream) {
        let buffer: [UInt8] = [UInt8](repeating: 0, count: BUFSIZE)
        let bytesRead = CFReadStreamRead(stream, &buffer, BUFSIZE)
        if bytesRead < 0 {
            let error = CFReadStreamGetError(myReadStream)
            // Xử lý lỗi
        } else if bytesRead == 0 {
            if CFReadStreamGetStatus(myReadStream) == .atEnd {
                done = true
            }
        } else {
            // Xử lý data đọc được
        }
    } else {
        // Xử lý gì đó trong vòng while khi chưa có data nếu thích
    }
}
```

Ví dụ polling một write stream
```
var buffer: [UInt8] = Array("Hello, world".utf8)
var bufferLength: CFIndex = buffer.count

while (!done) {
    if CFWriteStreamCanAcceptBytes(myWriteStream) {
        let bytesWritten = CFWriteStreamWrite(myWriteStream, buffer, bufferLength)
        if bytesWritten < 0 {
            let error = CFWriteStreamGetError(myWriteStream)
            // Xử lý lỗi
        } else if bytesWritten == 0 {
            if CFWriteStreamGetStatus(myWriteStream) == .atEnd {
                done = true
            }
            // Hoàn thành việc write stream
        } else if bytesWritten != bufferLength {
            // Xác định xem đã ghi được bao nhiêu và điều chỉnh lại buffer
            bufferLength = bufferLength - bytesWritten
            memmove(&buffer, &buffer + bytesWritten, bufferLength)
            // Tìm xem có vấn đề gì xảy ra với write stream
            let error = CFWriteStreamGetError(myWriteStream)
            // Xử lý error
        }
    } else {
        // Xử lý gì đó trong vòng while khi write stream chưa thể nhận dữ liệu nếu thích
    }
}
```


# Kết
Trên đây là những kiến thức cơ bản để làm việc với stream trong CFNetwork, hy vọng sẽ giúp ích cho các bạn!

-----

*Dịch và tham khảo từ [CFNetwork Programming Guide](https://developer.apple.com/library/archive/documentation/Networking/Conceptual/CFNetwork/CFStreamTasks/CFStreamTasks.html#//apple_ref/doc/uid/TP30001132-CH6-SW1)*