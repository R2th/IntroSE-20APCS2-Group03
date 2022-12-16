# 1.HTTP Basic:
  Trước khi chúng ta cùng tìm hiểu sâu hơn về Vapor, chúng ta cần nắm được cơ chế hoạt động chung của HTTP và Web.
- **Sức mạnh của web**: HyperText Transfer Protocol - HTTP là nền tảng của web. Mỗi khi bạn ghé thăm một website, trình duyệt của bạn sẽ gửi HTTP request đến và nhận về những response từ server.Rất nhiều app bạn đang sử dụng như - order coffee, đồ ăn từ smartphone, streaming video từ TV hoặc là chơi game online đều dùng đến HTTP.
- **HTTP requests**: Một HTTP Request sẽ bao gồm những thành phần sau:
  - **Request line**: đây là thành phần đặc trưng của HTTP method sử dụng. Các request resource và HTTP Version. GET/about.html HTTP/1.1 là một ví dụ.
  - **Host**: tên của server xử lý các request. Đây là điều cần chú ý khi nhiều sever được host trên cùng address giống nhau.
  - **Other request headers**: như Ahthorization, Accept, Cache-Control, Content-Length, Content-Type...
  - **Optional request data:** nếu được yêu cầu từ HTTP method.
- Các **HTTP method** đặc trưng xử lý các request từ client được định danh theo các method sau: **GET/HEAD/POST/PUT/DELETE/CONNECT/OPTIONS/TRACE/PATCH.**
- HTTP Method phổ biến nhất là **GET**. Nó cho phép client lấy tài nguyên từ server. Ấn vào link hay tap vào story trong ứng dụng tin tức đều sử dụng **GET** request từ server.
- Một method phổ biến khác là **POST**. Nó cho phép client gửi data đến server. Ấn vào nút login sau khi điền username và password là một ví dụ sử dụng **POST** request đến server.
- R**equest Headers:** các server sẽ thường xuyên cần nhiều thông tin hơn từ các service request. Những thông tin này sẽ được gửi qua **request headers**. Request header chỉ đơn giản là key-value. Vài request-header thường gặp là: Authorization, Cookie, Content-Type và Accpet.
- **HTTP response:** server sẽ trả về các HTTP Response khi nó xử lý xong các request. HTTP response bao gồm:
     - **Status line**: bao gồm **version**, **status code** và **messeage**.
     - **Response headers.**
     - **Optional response body.**
 - The status code là messeage đu kèm với out put từ request. Có rất nhiều status code nhưng bạn sẽ không phải quá bận tâm cho nó. Chúng được chia ra làm 5 nhóm:
     - **1: Information Response:** 
     - 2:**Success Response: Chúng rất phổ biến, 200-OK là một ví dụ.**
     - 3:** Redirection Response.**
     - 4:** Client Error: 404 Not Fount.**
     - 5: **Server Error.**
 - Những response có thể bảo gồm response body như HTML content của page, ảnh, JSON description của resource.**The response body** có thể có hoặc không tuy nhiên  response **code-204 No Content** là một ví dụ.
 - REST: là một architectural gần giống HTTP. Nhiều API được sử dụng trong các app là REST API.REST bao gồm nhiều cách để truy vấn resource từ API. Ví dụ: bạn sẽ sử dụng REST APIs cho acronyms API như sau:
     - **GET/api/acronyms/:** lấy tất cả acronyms.
     - **POST/api/acronyms:** tạo acronyms mới.
     - **GET/api/acronyms/1:** lấy về acronym với ID 1.
     - **PUT/api/acronyms/1:** update  acronym với ID 1.
     - **DELETE/api/acronyms/1:** delete  acronym với ID 1.
# 2.Async: 
- Một trong những tính năng quan trọng nhất của Vapor là **Async**. Nó cũng sẽ là phần khó hiểu nhất. Như chúng ta đã biết thì nếu server của bạn là single thread và có 4 client requests:
    - Request cho quote dự trữ. Kết quả trả về được gọi từ API trên server khác.
    - Request cho CSS style sheet cố định. CSS sẽ được hiển thị ngay lập tức.
    - Request cho user profile. Profile phải được lấy về từ database.
    - Requets cho HTML tĩnh. HTML sẽ được hiển thị ngay.
 - Trong server đồng bộ, server sẽ tiền hành xử lý từng tác vụ một thì ta có thể xử lý nhiều việc cùng lúc. Nhưng giới hạn thread của các server là có hạn và chúng ta sẽ phải cân nhắc kỹ lưỡng.
![](https://images.viblo.asia/3cf08c7b-b6c1-485c-a239-398356e4be6b.png)
- **Future and Promises:** 
    - Để xử lý các công việc khác trong khi đợi chờ response, bạn phải đóng gói nó trong promises để tiếp tục công việc khi bạn nhận được response. Trong môi trường làm việc bất đồng bộ bạn sẽ có thể viết func sau:
```javascript
func getAllUsers() -> [User] {
  // do some database queries
}
```
   
   - Func trên sẽ không hoạt động bởi database của bạn sẽ không được hoành chỉnh vì thời gian getAllUsers() phải trả về [User] trong tương lai chứ không phải bây giờ. Trong Vapor, bạn phải hứa hẹn sẽ trả về kết quả gọi là Future.
```javascript
func getAllUsers() -> Future<[User]> {
  // do some database queries
}
```
# 3.Làm việc với Futures: 
 - **Unwrapping futures:** Vapor có nhiều func thuận tiện làm việc với futures để tránh cho việc bạn phải làm việc trực tiếp với nó. Tuy nhiên, có nhiều thứ bạn cần lưu ý khi sử dụng Future để chờ đợi promise được giải quyết. Để đễ hình dung, hãy tưởng tượng bạn nhận về status code là 204- No Content vì route lấy danh sách user từ database và chỉnh sửa first user trước khi trả về.
 - Để sử dụng result, bạn phải unwrap result và closure để giải quyết Future. Có 2 func chính để làm việc đó
    - **flatMap(to:):** Sử dụng khi promise closure trả về Future.
    - **map(to:):** Sử dụng khi promise closure trả về type cự thể hơn Future.
 ```javascript
 // 1
return database
       .getAllUsers()
       .flatMap(to: HTTPStatus.self) { users in
  // 2
  let user = users[0]
  user.name = "Bob"
  // 3
  return user.save().map(to: HTTPStatus.self) { user in
    //4    
    return HTTPStatus.noContent
  }
}
 ```
    
 - Đây là những điều chúng ta vừa thực hiện:
     - 1. Lấy về tất cả users từ database. **getAllUsers()** trả về **Future<[User]>**. CHo đến khi result được trả về hoàn tất cho Future này trước Future ở step 3, sử dụng flatMap(to:) để unwrap result. Closure để flatMap(to:) nhận hoàn chỉnh **future[User]** như parameter. **.flatMap(to:)** trả về **Future<HTTPStatus>.**
     - 2. Update cho name cho first user.
     - 3. Lưu user đã được cập nhật  cho database. Future<User> được trả về nhưng HTTPStatus value bạn cần trả về phải trước Future nên sử dụng map(to:) ở đây
     - 4.Trả về HTTPStatus value.
 - **Transform**:
     - Đôi khi bạn không cần để ý đến result của Future cho đến khi nó hoàn thành. Ở ví dụ trên bạn không unwrap result của save() và trả về một type khác. Cho trường hợp này bạn có thể đơn giản hóa steop 3 bên trên như sau bằng cách sử dụng transform(to:):

```javascript
return database
       .getAllUsers()
       .flatMap(to: HTTPStatus.self) { users in
  let user = users[0]
  user.name = "Bob"
  return user.save().transform(to: HTTPStatus.noContent)
}
``` 

- **Flatten**: Nhiều khi bạn phải đợi một số futures hoàn thành. Ví dụ khi bạn saving nhiều models trong database. Trong trường hợp này, bạn dùng flatten(on:).
```javascript
static func save(_ users: [User], request: Request)
  -> [Future<HTTPStatus>] {
  // 1
  let userSaveResults: [Future<User>] = []
  // 2
  for user in users {
    userSaveResults.append(user.save())
  }
  // 3
  return userSaveResults.flatten(on: request)
    //4
    .transform(to: HTTPStatus.created)
}
```
- Đây là những điều chúng ta thực hiện:
    - 1. Định nghĩa 1 mảng **Future<Users>** trả về type **save()** trong step2.
    
    - 2. Lặp lại qua từng user trong users array và thêm vào rồi trả về value user.save() cho mảng.
    - 3. Sử dụng flatten(to:) để đợi tất cả futures hoàn thành.
    - 4. Trả về **201 Created** status
 - **Mutiple Futures:** Đôi lúc bạn cần chờ một số future với các kiểu type khác nhau. Bạn gặp trường hợp này khi đang decode request data và lấy user từ database. Vapor có một số global func thuận tiện cho công việc này cho phép chờ đợi đến 5 future. Điều này tránh trường hợp code sẽ bị đan xen vào nhau:
```javascript
// 1
flatMap(
  to: HTTPStatus.self,
  database.getAllUsers(),
  // 2
  request.content.decode(UserData.self)) { allUsers, userData in
    // 3
    return allUsers[0]
      .addData(userData)
      .transform(to: HTTPStatus.noContent)
}
```
 - Đây là những điều chúng ta vừa làm:
    - 1. Sử dụng global flatMap(to:) để đợi 2 future hoàn thành.
    - 2. Closure lấy complete future như parameter.
    - 3. Gọi addData(_ :) trả vể vài future và đổi return type thanh .noCotent.
 - Nếu closure trả về non-future result, bạn có để sử dụng global map(to:_::)thay thế.
```javascript
// 1
map(
  to: HTTPStatus.self,
  database.getAllUsers(),
  // 2
  request.content.decode(UserData.self)) { allUsers, userData in
    // 3
    allUsers[0].syncAddData(userData)
    // 4
    return HTTPStatus.noContent
}
```
- Đây là điều chúng ta thực hiện:
    - 1. Sử dụng global map(to:) để đợi 2 future hoàn thành.
    - 2. Closure lấy complete future như paramater.
    - 3. Gọi syncAddData(_ :)
    - 4. Trả về .noContent.