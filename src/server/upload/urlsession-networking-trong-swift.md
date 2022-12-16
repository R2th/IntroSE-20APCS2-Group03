Qua bài này, các bạn sẽ nắm được:
- Khi nào cần dùng URLSession
- URLSession là gì
- Fetch data dùng URLSession qua ví dụ đơn giản

-----
# Khi nào cần dùng URLSession
```sql
Rất đơn giản, bạn muốn "chiếc" app của bạn tương tác với Internet, nghĩa là bạn đang muốn tạo HTTP request, URLSession là 1 lựa chọn 
```
 **URLSession** là  1 framework được **chính Apple phát triển và implement sẵn trong iOS**. Rất nhiều developer dùng thư viện từ bên thứ 3 như [Alamofire](https://github.com/Alamofire/Alamofire) nhưng bạn sẽ sớm nhận ra rằng, bạn không cần thiết quá phụ thuộc vào 1 thư viện để tạo 1 HTTP request đơn giản, URLSession sẽ có tất cả những thứ mà bạn muốn.

# URLSession là gì
![](https://images.viblo.asia/beed41ec-51da-46a1-802e-14a15d4a26cf.png)

**URLSession** là một class cung cấp API để tương tác với các giao thức như HTTP, HTTPS
- **URLSession** tạo ra một ***session*** , hiểu đơn giản nó giống như 1 tab đang mở trong trình duyệt của bạn, nó chứa rất nhiều các phương thức HTTP request mà người dùng có thể tương tác 
- **URLsession** được sử dụng để tạo ra đối tượng **URLSessionTask**, thứ mà bạn có thể lấy dữ liệu từ Internet, tải xuống hay upload file lên webservices. Có 3 loại Task:
    - **URLSessionDataTask**: Sử dụng tác vụ này cho các yêu cầu HTTP GET để truy xuất dữ liệu từ máy chủ vào bộ nhớ.
    - **URLSessionUploadTask**: Sử dụng tác vụ này để tải tệp từ đĩa lên dịch vụ web, thường thông qua phương thức HTTP POST hoặc PUT.
    - **URLSessionDownloadTask**: Sử dụng tác vụ này để tải tệp từ dịch vụ từ xa đến vị trí tệp tạm thời. Bạn cũng có thể tạm dừng, tiếp tục và hủy bỏ task. URLSessionDownloadTask có khả năng tạm dừng bổ sung để nối lại trong tương lai.

- Bạn có thể cấu hình lại một session với **URLSesssionConfiguration** để phục vụ cho từng mục đích
    - .**default**: Tạo một đối tượng cấu hình mặc định sử dụng các đối tượng lưu trữ bộ đệm, thông tin xác thực và bộ nhớ cache .
    - .**ephemeral**: Tương tự như cấu hình mặc định, ngoại trừ tất cả dữ liệu liên quan đến phiên được lưu trữ trong bộ nhớ. Hãy nghĩ về điều này như một phiên "riêng tư"
    - .**background**: Cho phép phiên thực hiện các tác vụ tải lên hoặc tải xuống trong nền. Chuyển tiếp tục ngay cả khi ứng dụng bị treo hoặc chấm dứt bởi hệ thống. URLSessionConfiguration cũng cho phép bạn định cấu hình các thuộc tính phiên như giá trị hết thời gian, chính sách bộ đệm và các header HTTP bổ sung. Tham khảo tài liệu để biết danh sách đầy đủ các tùy chọn cấu hình

# Fetch data dùng URLSession
Vào phần thực hành luôn nhé, các bước để lấy dữ liệu từ webservice:

1. Khởi tạo HTTP Request với **URLSession**
2. Dùng **URLSessionDataTask** gửi yêu cầu để lấy dữ liệu
3. In ra các loại dữ liệu được trả về 
4. Kiểm tra có đúng dữ liệu ta cần và Convert dữ liệu sang JSON
## Khởi tạo HTTP Request với URLSession
Chúng ta cần 1 *session* và 1 *URL* như thế này
```swift:Swift
let session = URLSession.shared //1
let url = URL(string: "...")! //2
```

1. Tạo 1 tham chiếu tới Class URLSession với cấu hình mặc định 
2. Tạo url với kiểu URL, tham số là *string*

URL dùng ở VD này là [uers.json](https://gist.githubusercontent.com/reinder42/932d7671859959f6363b4d9b4e18bb91/raw/306631d79a5166bb0d86b12ac7d8cc42fecb996e/users.json), copy đường dẫn này và paste vào trong *string*
## Dùng URLSessionDataTask gửi yêu cầu lấy dữ liệu
Tạo 1 *dataTask*  với function `dataTask(with:completionHandler:)` :
```javascript:Swift
let task = session.dataTask(with: url, completionHandler: { data, response, error in

    // Do something...
})
```
 `dataTask(with:completionHandler:)` có 2 tham số truyền vào: url được khởi tạo ở trên và 1 `completionHandle`
```sql
completionHandle là gì?, bạn có thể hiểu đơn giản nó là 1 clousure mà bắt lại 3 tham số mà bạn muốn dùng lại: data, response và error.
```

* **data**: có kiểu là *Data*, là dữ liệu bạn muốn lấy từ webservice, 
* **response**: có kiểu là *URLResponse*, cho ta biết thêm thông tin về phản hồi của request có thể bao gồm độ dài, encoding, HTTP status code, ...
* **error**: sẽ chứa thông tin lỗi xảy ra nếu request không thành công. Nếu request thành công, error = nil

Đến đây, 1 request vẫn chưa hoàn thành, nó chỉ mới được khởi tạo, để bắt đầu gửi yêu cầu hãy thêm: 
```python:Swift
task.resume()
```

## In ra các loại dữ liệu được trả về
Trăm nghe không bằng mắt thấy, bạn hãy in các kiểu dữ liệu bắt trong `completionHandle` và xem nó là gì nhé

```swift:Swift
let task = session.dataTask(with: url) { data, response, error in
    print(data)
    print(response)
    print(error)
}
```
Chúng ta có gì nào?: 
* **data**: `Optional(321 bytes)`, bởi vì data có kiểu là *Data*
* **response**: có kiểu **NSHTTPURLResponse** là subclass của **URLResponse**. Bao gồm `Status Code : 200` (mình sẽ nói thêm ở dưới) và HTTP headers (bạn có thể tham khảo [tại đây](https://www.cloudflare.com/learning/what-is-cloudflare/))
* **error**: `nil`. May quá không có lỗi gì :v: 
## Kiểm tra có đúng dữ liệu ta cần

Khi thực hiện một request HTTP, bạn cần xác thực lại ít nhất các điều sau:
1. Liệu có xảy ra lỗi nào không? => check **error**
2. HTTP response code có trả về theo đúng mong đợi => check **response**
3. dữ liệu trả về có đúng format? => check **data** hay convert **data** sang JSON
### Check có lỗi hay không ?
```go:Swift
if error != nil {
    // OH NO! An error occurred...   
    self.handleClientError(error)
    return
}
```
Nếu có lỗi thì gọi 1 hàm để giải quyết lỗi này và thoát. Hoặc bạn có thể tham khảo thêm các cách xử lý: [throw an error](https://learnappmaking.com/error-handling-swift-do-try-catch/)
### Check response có OK ?
```swift:Swift
guard let httpResponse = response as? HTTPURLResponse,
      (200...299).contains(httpResponse.statusCode) else {
    self.handleServerError(response)
    return
}
```
* Ở đây chúng ta xét xem liệu **response** có đúng kiểu *HTTP Response* và  *Status code* có nằm trong khoảng 200 - 299 hay không. Nếu không thì sẽ thoát luôn
* *Status code* là trạng thái của request, VD  {404, 400, 401, vvv..} là lỗi, còn nằm trong khoản {200...299} request của bạn thành công.

### Check data, convert sang JSON
```javascript:Swift
if let json = try? JSONSerialization.jsonObject(with: data!, options: []) {
    print(json)
}
```

Sử dụng [optional binding](https://learnappmaking.com/swift-optionals-how-to/#optional-binding) để ép kiểu data sang chuỗi JSON bằng cách dùng function `jsonObject(with:options:)` của class `JSONSerialization`. Bằng cách đọc từng kí tự trong có trong data và chuyển nó sang chuỗi JSON, giống như bạn đọc sách và câu chuyện đó sẽ xuất hiện trong đầu bạn. 

 Một cách khác mà apple khuyên bạn nên sử dụng: 
 ```Swift
 do {
    let json = try JSONSerialization.jsonObject(with: data!, options: [])
    print(json)
} catch {
    print("JSON error: \(error.localizedDescription)")
}
 ```
 Ở đoạn code trên, nếu trong `try` bắt được lỗi thì nó sẽ được in ra trong `catch` 

**Oke** cùng xem kết quả json in ra là  gì, có giống với [uers.json](https://gist.githubusercontent.com/reinder42/932d7671859959f6363b4d9b4e18bb91/raw/306631d79a5166bb0d86b12ac7d8cc42fecb996e/users.json) mà bạn mong đợi không: 
```java:Swift
(
    {
        age = 5000;
        "first_name" = Ford;
        "last_name" = Prefect;
    },
        {
        age = 999;
        "first_name" = Zaphod;
        "last_name" = Beeblebrox;
    },
        {
        age = 42;
        "first_name" = Arthur;
        "last_name" = Dent;
    },
        {
        age = 1234;
        "first_name" = Trillian;
        "last_name" = Astra;
    }
)
```
# Tổng kết

**Awesome !** dưới đây là toàn bộ đoạn code mà cả buổi nay đã học, qua đó chúng ta biết được
* Muốn tại HTTP Request thì dùng **URLSession**
* **URLSession** là framework Apple tích hợp sẵn trong iOS, cung cấp API tương tác với phương thức HTTP, HTTS request
* Cách tạo 1 **URLSession**
* Cách kiểm tra **error**, **response**, **data**
* Cách convert sang JSON
```swift:Swift
let session = URLSession.shared
let url = URL(string: "...")!

let task = session.dataTask(with: url) { data, response, error in

    if error != nil || data == nil {
        print("Client error!")
        return
    }

    guard let response = response as? HTTPURLResponse, (200...299).contains(response.statusCode) else {
        print("Server error!")
        return
    }

    guard let mime = response.mimeType, mime == "application/json" else {
        print("Wrong MIME type!")
        return
    }

    do {
        let json = try JSONSerialization.jsonObject(with: data!, options: [])
        print(json)
    } catch {
        print("JSON error: \(error.localizedDescription)")
    }        
}

task.resume()
```

-----

Tài liệu tham khảo: 

https://learnappmaking.com/urlsession-swift-networking-how-to/
https://www.raywenderlich.com/567-urlsession-tutorial-getting-started
https://learnappmaking.com/swift-optionals-how-to/#optional-binding