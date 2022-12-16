## Mở đầu
Gần đây mình có làm một app nho nhỏ về social networking. Mình thì đảm nhận công việc viết API cho phía font-end sử dụng.  Ban đầu thì bọn mình trao đổi bằng "cơm" về vấn đề cần param truyền lên như thế nào rồi thì dữ liệu cần trả ra như sao...
Bạn thử tưởng tượng việc bạn phải viết 1 đống Api bằng tay, rất dễ nhầm lẫn mà không có cách kiểm tra tự động nào ngoài việc bạn phải tự ngồi check xem params, method, type... có đúng hay chưa. Chưa kể khi bạn phải viết bằng nhiều ngôn ngữ khác nhau nữa.

Có khá nhiều vấn đề bất cập xảy ra ví dụ như nói xong thì quên mất  nên thỉnh thoảng có lỗi gì  lại có những màn tẩm quất bằng "cơ học " mình đùa tí thôi. 
Đấy mới có app nho nhỏ thôi mà đã có nhiều vấn đề thế rồi. Giả sử bạn cần cung cấp API cho nhiều bên khác mà không có một tài liệu API đầy đủ thì gây rất nhiều khó khăn cho các lập trình viên khác khi sử dụng API của chúng ta, cũng như khó khắn trong việc test API.
Sau một hồi nghiên cứu tìm kiếm thì mình có tìm được một em khá phổ biến hiện nay là Swagger em nó chuyên dùng để viết doc API dễ dàng hơn.

Swagger sẽ giúp bạn làm những việc đó : từ việc tạo tài liệu api cũng như tự động đến việc test cấu trúc api...
## Cài đặt Swagger UI
**1**: Tải thư viện Swagger UI
Các bạn clone [project](https://github.com/swagger-api/swagger-ui) Github này về, sau đó hãy copy thư mục dist trong project đó vào project của bạn và chọn render file index.html trong thư mục dist.
Tìm đến thư mục swagger-ui/dist mở file index.html sẽ show lên một trang demo như sau
![](https://images.viblo.asia/6333f48a-09ff-41f4-a766-995f3754fb62.png)

### Về cấu trúc cơ bản :

Mô tả swagger có thể được viết bằng JSON hoặc YAML. Trong hướng dẫn này, mình xin sử dụng các ví dụ YAML. Một mô tả Swagger mẫu được viết bằng YAML trông giống như sau:

```
swagger: "2.0"
info:
  title: Sample API
  description: API lấy danh sách người dùng.
  version: 1.0.0
host: localhost:3000
basePath: api/v1
schemes:
  - https
paths:
  /users:
    get:
      summary: Trả về danh sách người dùng.
      description: Mô tả thêm.
      produces:
        - application/json
      responses:
        200:
          description: OK
```
**Metadata**

Swagger được bắt đầu với version Swagger, 2.0 là phiên bản mới nhất. Version Swagger xác định cấu trúc tổng thể của một đặc tả API - những gì bạn có thể ghi lại và cách bạn ghi lại nó.

`swagger: "2.0"`

Tiếp đến là những thông tìn cần thiết để mô tả được bao trong `info` :

  `title`: Tiêu đề API mình làm
  
  `version`: Phiên bản của API

 `description`: Mô tả về APIs

**Base URL**

Base URL  cho tất cả các lệnh gọi API được xác định bằng cách sử dụng các schemes, host and basePath:
```
host: localhost:3000
basePath: api/v1
schemes:
  - https
```

**Path**

Phần đường dẫn xác định các endpoints  riêng lẻ trong API của bạn và các phương thức HTTP được hỗ trợ bởi các endpoints này. Ví dụ:  GET /users  có thể được mô tả là:

```
paths:
  /users:
    get:
      summary: Trả về danh sách người dùng.
      description: Thêm miêu tả.
      produces:
        - application/json
      responses:
        200:
          description: OK
```

**Parameters**

Khai báo các param cần thiết để sử dụng.

Bạn có thể xác định các type,  required or optional

```
paths:
  /users/{userId}:
    get:
      summary: Trả về người dùng theo ID
      parameters:
        - in: path
          name: userId
          required: true
          type: integer
          minimum: 1
          description: Parameter description.
      responses:
        200:
          description: OK

```

**Responses**

Với mỗi response trả về bạn có thế khai báo trạng thái của nó ví dụ 200 OK or 404 Not Found và cấu trúc dữ liệu cần trả ra trong response body.

Schema có thể được định nghĩa inline hoặc được tham chiếu từ định nghĩa bên ngoài thông qua $ ref. Bạn có thể cung cấp các responses cho content types khác nhau.

```
paths:
  /users/{userId}:
    get:
      summary: Trả về người dùng theo ID
      parameters:
        - in: path
          name: userId
          required: true
          type: integer
          minimum: 1
          description: ID của người dùng cần trả.
      responses:
        200:
          description: Môt người dùng
          schema:
            type: object
            properties:
              id:
                type: integer
                example: 4
              name:
                type: string
                example: Arthur Dent
        400:
          description: ID không hợp lệ (vd: ID không phải là số).
        404:
          description: ID không tồn tại.
        default:
          description: Lỗi

```

**Tạo config cấu hình các APIs của bạn**

```
swagger: 2.0
info:
  description: Ví dụ
  version: 1.0.0
  title: Rails 6 Swagger
schemes:
  - http
host: "localhost:3000"
basePath: "/api/v1"
paths:
  /users:
    post:
      tags:
        - Register user
      description: Create new user
      produces:
        - application/json
      parameters:
        - in: "formData"
          name: "user[nickname]"
          required: true
        - in: "formData"
          name: "user[birthday]"
          required: true
          type: string
        - in: "formData"
          name: "user[avatar_id]"
          required: true
          type: number
      responses:
        200:
          description: User created
```

Như vậy, chỉ với khoảng 30 phút dọc document, ta có 1 file config khá đầy đủ về thông tin các APIs. Theo như cấu hình trên, ta có thể cấu hình các tài nguyên dữ liệu gửi lên APIs và dữ liệu APIs trả về dưới dạng model (cấu hình trong components/schemas) để có thể tái sử dụng lại.
Sau đó, chúng ta save file cấu hìn dưới dạng đuôi .yaml vào thư mục dist tại bước 1, ở đây tôi sẽ lưu thành swagger.yaml.

**Cập nhật lại đường dẫn file config APIs **

Bây giờ hãy mở file index.html trong thư mục dist, tìm và sửa path url của function SwaggerUIBundle thành đường dẫn chúng ta vừa tạo. Sau đó lưu lại, khởi chạy server, truy cập vào router đã trỏ tới tại bước 1.
Mặc định thì URL nó sẽ là :
```
 url: "https://petstore.swagger.io/v2/swagger.json",
```
Ta đổi lại :
```
 url: "swagger.yaml"
```
Sau đó chạy lại bước 1 để hưởng lại thành quả.
# Kết luận

Như vậy ở bài này mình đã hướng dẫn cho các bạn các cách làm thế nào để config swagger để hiển thị document API. Tùy từng trường hợp và yêu cầu của mỗi người để chọn ra option phù hợp nhất. Ngoài thằng Swagger ra thì còn có thằng API Blueprint cũng được nhiều lập trình viên sử dụng. Hy vọng mình sẽ có điều kiện tìm hiểu và giới thiệu nó cho các bạn trong tương lai. Cảm ơn các bạn đãtheo dõi.
Tài liệu tham khảo
https://medium.com/velacorpblog/t%C3%ACm-hi%E1%BB%83u-v%E1%BB%81-swagger-c%C3%B4ng-c%E1%BB%A5-vi%E1%BA%BFt-document-cho-restfull-apis-4129d20bc077
https://swagger.io/docs