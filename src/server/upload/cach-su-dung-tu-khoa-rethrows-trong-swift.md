> Rethrows trong Swift cho phép chuyển tiếp một lỗi được throw ra bởi một hàm tham số nhất định. Nó được sử dụng rất nhiều trong các phương thức như `map` , `filter` và `forEach` giúp trình biên dịch xác định xem có cần tiền tố `try` hay không.




### 1. Cách sử dụng từ khóa rethrows

Từ khóa rethrows được sử dụng trong các hàm không throw ra lỗi mà thay vào đó chuyển tiếp lỗi từ các  hàm tham số của chúng. Nó cũng cho phép trình biên dịch chỉ yêu cầu từ khóa `try` nếu lệnh gọi lại đã cho thực sự gây ra lỗi.

Lấy ví dụ sau về một phương thức rethrowing thực hiện một cuộc gọi lại rethrowing :

```
 func rethrowingFunction(throwingCallback: () throws -> Void) rethrows {
     try throwingCallback()
 } 
```

Nếu lệnh gọi lại mà chúng ta chuyển vào không gây ra lỗi, chúng ta có thể gọi phương thức như sau:

```
 rethrowingFunction {
     print("I'm not throwing errors")
 } 
```

Tuy nhiên, ngay sau khi lệnh gọi lại của chúng ta có khả năng gây ra lỗi, trình biên dịch yêu cầu chúng ta sử dụng `try` cho phương thức rethrowing của chúng ta:

![](https://images.viblo.asia/330dcbe1-6380-40f2-85d3-0cfffd559760.png)

Trình biên dịch chỉ ra rằng phương thức rethrows của chúng ta không được đánh dấu bằng `try`

Điều này thật tuyệt vời vì nó cho phép chúng ta chỉ sử dụng từ khóa `try` nếu phần thân thực sự gặp lỗi. Không cần phải bao đóng phương thức của chúng ta trong một  `try-catch` nếu nó không có khả năng nhận được lỗi.

Nếu chúng ta viết cùng một phương thức mà không có `rethrows`, chúng ta sẽ phải sử dụng `try` trong mọi trường hợp:

```
 func rethrowingFunction(throwingCallback: () throws -> Void) throws {
     try throwingCallback()
 }

 try rethrowingFunction {
     print("I'm not throwing errors")
 } 
```

Nói cách khác, các phương thức rethrowing chỉ cần được đánh dấu bằng `try` nếu hàm tham số của chúng có khả năng gây ra lỗi.

### 2. Một ví dụ trong trường hợp thực tế

Bây giờ chúng ta đã biết cách hoạt động của từ khóa `rethrows`, chúng ta có thể xem một ví dụ trong trường hợp thực tế. Trong đoạn code sau, chúng ta đã tạo một phương thức bao đóng cho một mảng các string trong đó chúng ta nối các phần tử dựa trên một vị ngữ:

```
 extension Array  where Self.Element == String {
     func joined(separator: String, where predicate: (Element) throws -> Bool) rethrows {
         try filter(predicate)
             .joined(separator: separator)
     }
 } 
```

Theo mặc định, phương pháp `filter`  tiêu chuẩn đang rethrow các lỗi. Tuy nhiên, nếu chúng ta muốn hưởng lợi từ hành vi này trong phương thức bao đóng `joined` của chúng ta, chúng ta cũng cần thực hiện phương thức rethrowing tùy chỉnh của mình. Nếu không, chúng ta sẽ không thể throw ra bất kỳ lỗi nào trong predicate của chúng ta.

Một ví dụ sử dụng có thể trông như sau:

```
 enum Error: Swift.Error {
     case numbersNotAllowed
 }
 
 var names = ["Light", "Near", "Eval", "Misa4"]
 do {
     try names.joined(separator: ", ", where: { name -> Bool in
         guard name.rangeOfCharacter(from: .decimalDigits) == nil else {
             throw Error.numbersNotAllowed
         }
         return true
     })
 } catch {
     print(error) // Prints: `numbersNotAllowed`
 } 
```

Vì chúng ta có một tên với số 4 trong đó, phương thức đã kết hợp sẽ gây ra lỗi.

### 3. Sử dụng rethrows để bao đóng lỗi

Một trường hợp sử dụng phổ biến khác là bao đóng các lỗi khác thành một loại lỗi được xác định cục bộ. Trong ví dụ sau, chúng ta đã xác định một controller lưu trữ trả về một Result enum với một type StorageError strong. Tuy nhiên, phương thức FileManager của chúng ta có thể throw bất kỳ lỗi nào khác mà chúng ta muốn bao đóng vào trường hợp `StorageError.otherError`.

Sử dụng phương thức perform rethrowing với lệnh gọi lại đã cho, chúng ta có thể bắt bất kỳ lỗi nào đã xảy ra:

```
struct StorageController {
     
     enum StorageError: Swift.Error {
         case fileDoesNotExist
         case otherError(error: Swift.Error)
     }
     
     let destinationURL: URL
     
     func store(_ url: URL, completion: (Result<URL, StorageError>) -> Void) throws {
         guard FileManager.default.fileExists(atPath: url.path) else {
             completion(.failure(StorageError.fileDoesNotExist))
             return
         }
         try perform {
             try FileManager.default.moveItem(at: url, to: destinationURL) 
             completion(.success(destinationURL)) 
         }
     }
     
     private func perform(_ callback: () throws -> Void) rethrows {
         do {
             try callback()
         } catch {
             throw StorageError.otherError(error: error)
         }
     }
 } 
```

### 4. Ghi đè các phương thức với từ khóa rethrows

Điều quan trọng cần hiểu là không thể sử dụng phương thức throwing để ghi đè phương thức  rethrowing vì nó sẽ đột ngột biến phương thức có thể throw thành phương thức throwing . Phương thức throwing cũng không thể đáp ứng yêu cầu giao thức **"protocol"** đối với phương thức rethrowing vì lý do tương tự.

Mặt khác, một phương thức rethrowing có thể ghi đè lên một phương thức throwing vì cuối cùng một phương thức throwing cũng là một hàm có thể throw. Điều này cũng có nghĩa là bạn có thể sử dụng phương thức rethrowing để đáp ứng yêu cầu giao thức đối với phương thức throwing.

### 5. Kết luận 

Rethrows trong Swift có ngăn chặn việc sử dụng từ khóa `try` mà không có lý do. Nếu phương thức bên trong không gây ra lỗi, thì từ khóa rethrows đảm bảo trình biên dịch biết rằng không cần `try`. Một phương thức rethrowing sẽ chuyển tiếp bất kỳ lỗi nào do các tham số hàm của nó tạo ra.

Hy vọng rằng, điều này sẽ giúp bạn trong việc code hiệu quả hơn 😍.

Vậy là bài viết của mình đến đây là hết 😁. Cảm ơn các bạn đã theo dõi bài viết. 😃