Chắc hẳn khi làm việc với API, việc xây dựng tài liệu (documents) đặc tả API, chức năng, tham số, các respone là điều cần thiết. Nếu như bạn đang gặp khó khăn trong việc đặt tả này hay không muốn đặc tả trên các file định dạng `excel` chưa theo chuẩn thì hãy xem xét sử dụng Swagger.

Swagger cho phép bạn đặc tả cấu trúc APIs của bạn để máy có thể đọc được. Khả năng mô tả API đến tận "root" là điều thật tuyệt vời mà Swagger mang lại.

Swagger không chỉ đặc tả cấu trúc APIs, nó còn làm được nhiều hơn thế với [hệ sinh thái đa dạng](https://swagger.io/docs/specification/2-0/what-is-swagger/) như sinh tạo 1 stub server cho APIs, sinh thư viện clients với 40 ngôn ngữ hay việc có thể test API trên chính Swagger. Tuy nhiên trọng phạm vi bài viết, mình chỉ nói về cấu trúc file mà Swagger sử dụng để đặc tả API.

Demo: 
* [Swagger API](https://petstore.swagger.io/?_ga=2.251622021.2012164495.1573894649-1774902752.1573894649)
* [Swagger demo with editor](https://editor.swagger.io/?_ga=2.49102629.2012164495.1573894649-1774902752.1573894649)

# 1. Basic Structure
Swagger có thể được viết dưới dạng `JSON` hoặc `YAML`. Trong hướng dẫn này, chúng tôi chỉ sử dụng ví dụ dạng `YAML` nhưng `JSON` hoạt động tốt tương đương. Một Swagger với định dạng `YAML` sẽ có dạng như sau
```yaml
swagger: "2.0"
info:
  title: Sample API
  description: API description in Markdown.
  version: 1.0.0
host: api.example.com
basePath: /v1
schemes:
  - https
paths:
  /users:
    get:
      summary: Returns a list of users.
      description: Optional extended description in Markdown.
      produces:
        - application/json
      responses:
        200:
          description: OK
```
Nào, chúng ta cùng điểm qua các thành phần của nó là cái gì nhé :D
# 2. Metadata
Khởi đầu cho mỗi Swagger bắt đầu với `version`, 2.0 đang là phiên bản cuối cùng của nó. Phiên bản giúp các trình dịch hiểu được cấu trúc tổng thể của phần nội dung tiếp theo.
```yaml
swagger: "2.0"
```
Tiếp theo, bạn cần định nghĩa các thông tin về API trong trường `info` với các trường `title`, `description` (tùy chọn), `version` (API version, không phải version của file hay Swagger)
```yaml
info:
  title: Sample API
  description: API description in Markdown.
  version: 1.0.0
```
# 3. Base URL
Base URL là phần dùng cho tất cả các API định nghĩa bao gồm: `schemes`, `host`, `basePath`:
```yaml
host: api.example.com
basePath: /v1
schemes:
  - https
```
Tất cả các đường link API đều quan hệ với base URL này. Ví dụ `/users` thực tế có nghĩa là https://api.example.com/v1/users.
# 4. Consumes, Produces
Phần `Consumes` và `produces` định nghĩa loại MIME được hỗ trợ bởi API. "Root-level" định nghĩa có thể được ghi đè bởi các toán tử riêng biệt (các API cụ thể có thể định nghĩa lại phần này).
```yaml
consumes:
  - application/json
  - application/xml
produces:
  - application/json
  - application/xml
```
# 5. Path
Phần này chính là phần quan trọng, định nghĩa từng API cụ thể và phương thức HTTP được hỗ trợ trong các API này. `GET` `/users` được mô tả như sau:
```yaml
paths:
  /users:
    get:
      summary: Returns a list of users.
      description: Optional extended description in Markdown.
      produces:
        - application/json
      responses:
        200:
          description: OK
```
# 6. Parameters
Các toán tử có thể cần các tham số dựa trên URL path (`/users/{userId`}), query string (`/users?role=admin`), `headers (X-CustomHeader: Value) `và trong request body. Bạn có thể định nghĩa các loại tham số, cấu trúc, mô tả chi tiết, yêu cầu hay tùy chọn hoặc các thông tin khác trong swagger như sau:
```yaml
paths:
  /users/{userId}:
    get:
      summary: Returns a user by ID.
      parameters:
        - in: path
          name: userId
          required: true
          type: integer
          minimum: 1
          description: Parameter description in Markdown.
      responses:
        200:
          description: OK
```
# 7. Responses
Mỗi API tất nhiên đều response về một trạng thái (status codes) như `200 OK` hoặc `404 Not Found` và `schema` (cấu trúc) của response body. Schemas này thì có thể được định nghĩa trực tiếp trong respone hoặc có thể tách ra định nghĩa ngoài vùng dựa bào `$ref`
```yaml
paths:
  /users/{userId}:
    get:
      summary: Returns a user by ID.
      parameters:
        - in: path
          name: userId
          required: true
          type: integer
          minimum: 1
          description: The ID of the user to return.
      responses:
        200:
          description: A User object.
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
          description: The specified user ID is invalid (e.g. not a number).
        404:
          description: A user with the specified ID was not found.
        default:
          description: Unexpected error
```
# 8. Input and Output Models
Phần `definitions` sẽ định nghĩa các cấu trúc dữ liệu chung để sử dụng trong API của bạn. Phần này có thể được tham chiếu qua `$ref` bất cứ một shema nào - ở cả request body và response body. Ví dụ đây là JSON object:
```json
{
  "id": 4,
  "name": "Minh NV"
}
```
Có thể được mô tả bởi
```yaml
definitions:
  User:
    properties:
      id:
        type: integer
      name:
        type: string
    # Both properties are required
    required:  
      - id
      - name
```
Và được tham chiếu trong request body schema và response body schema như sau thông qua `$ref`:
```yaml
paths:
  /users/{userId}:
    get:
      summary: Returns a user by ID.
      parameters:
        - in: path
          name: userId
          required: true
          type: integer
      responses:
        200:
          description: OK
          schema:
            $ref: '#/definitions/User'
  /users:
    post:
      summary: Creates a new user.
      parameters:
        - in: body
          name: user
          schema:
            $ref: '#/definitions/User'
      responses:
        200:
          description: OK
```
# 9. Authentication
Từ khóa `securityDefinitions` và `security` được sử dụng để mô tả các phương thức yêu cầu xác thực.
```yaml
securityDefinitions:
  BasicAuth:
    type: basic
security:
  - BasicAuth: []
```
Phương thức xác thức được hỗ trợ bao gồm:
* Basic authentication
* API key (as a header or query parameter)
* OAuth 2 common flows (implicit, password, application and access code)
# Tài liệu tham khảo
* [Swagger Editor](https://editor.swagger.io/?_ga=2.49102629.2012164495.1573894649-1774902752.1573894649)
* [Basic Strcuture](https://swagger.io/docs/specification/2-0/basic-structure/)