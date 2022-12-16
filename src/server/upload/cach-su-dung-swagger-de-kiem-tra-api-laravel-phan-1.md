# Swagger là gì?
**Swagger là một framework giúp bạn có thể mô tả lại api của bạn** bằng cách sử dụng chung một loại ngôn ngữ giúp cho cả developer và tester đều có thể dễ dàng đọc hiểu, thậm chí học không vững về kiến thức source code. Bạn có thể tưởng tượng nó như việc lên kế hoạch để xây một ngôi nhà. Bạn có thể sử dụng bất kỳ loại vật liệu nào mình thích nhưng không thể vượt quá các thông số của một bản thiết kế.

Swagger có một số ưu điểm so với các framework khác:

* Dễ hiểu đối với cả những người là developer và những người không phải developer: Product manager, tất cả các bên có liên quan và thậm chí khách hàng cũng có thể tham gia vào việc thiết kế lên API,bởi vì nó được vạch ra rõ ràng thông qua giao diện thân thiện
* Nó vừa là ngôn ngữ người dùng, vừa là ngôn ngữ máy: Điều này có nghĩa rằng không chỉ chia sẻ được trong nhóm nội bộ mà những tài liệu tương đồng có thể được sử dụng để tự động hóa các quy trình phụ thuộc vào API.
* Nó dễ dàng để điều chỉnh: Nó giúp cho việc test và debug các vấn đề của API
# Swagger UI là gì?
Swagger UI là một phần của swagger một công cụ mã nguồn mở giúp tạo ra một trang web ghi lại các API được tạo ra bởi đặc tả của swagger. Giao diện cho API này thân thiện với người dùng, với tất cả những logic phức tạp được giữ phía sau màn hình. Nó cho phép developer thực hiện và giám sát API request đã gửi và kết quả mà họ sẽ nhận được, giúp nó trở thành một công cụ tuyệt vời với developer, tester và cả người dùng có thể hiểu được thứ mà họ đang test. Swagger UI đại diện cho api trong các trình duyệt do đó nó mang lại tính trực quan hơn so với các công cụ khác như Postman, SoapUI, ...

Khi bạn mở một trang web, trình duyệt sẽ tải một trang web từ server và kích hoạt các yêu cầu đến máy chủ API để lấy dữ liệu từ cơ sở dữ liệu. Swagger UI được tạo tự động từ bất kỳ API nào được xác định trong Đặc tả OpenAPI và có thể được xem trong trình duyệt. 
# Thêm Swagger UI vào dự án
Để thêm swagger ui vào dự án bạn có thể sử dụng composer với câu lệnh sau:
> composer require latrell/swagger dev-master

Update các package với lệnh 
> composer update
> 
hoặc cài đặt với lệnh
> composer install
> 
Tiếp đó tại phần providers cùa tệp config/app.php thêm đoạn sau:
```
'providers' => [
    // ...
    Latrell\Swagger\SwaggerServiceProvider::class,
]
```
Chạy câu lệnh sau để đưa swagger ui vào thư mục public và publish file config
> php artisan vendor:publish
>
File config/latrell-swagger.php là cách chính giúp bạn tương tác với Swagger.
# Cấu trúc swagger
Các bạn có thể tìm hiểu swagger qua ví dụ petstore: https://petstore.swagger.io/

Với swagger bạn có thể định nghĩa OpenAPI trong YAML hoăc JSON. Tại tài viết này mình sẽ giúp các bạn tìm hiểu và sử dụng swagger theo cấu trúc [YAML](https://en.wikipedia.org/wiki/YAML). Một cấu trúc YAML của swagger về tổng quan sẽ như sau:
```
openapi: 3.0.0
info:
  title: Sample API
  description: Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.
  version: 0.1.9
servers:
  - url: http://api.example.com/v1
    description: Optional server description, e.g. Main (production) server
  - url: http://staging-api.example.com
    description: Optional server description, e.g. Internal staging server for testing
paths:
  /users:
    get:
      summary: Returns a list of users.
      description: Optional extended description in CommonMark or HTML.
      responses:
        '200':    # status code
          description: A JSON array of user names
          content:
            application/json:
              schema: 
                type: array
                items: 
                  type: string
```
Tất cả các từ khóa sẽ được phân biệt chữ hoa chữ thường.
## Metadata
Mọi đặc tả OpenAPI đều bắt đầu bằng từ khóa: *openapi* đề cập đến phiên bản của định dạng đặc tả
```
openapi: 3.0.0
```
Phần *info* chứa thông tin của API: title, desription, version
```
info:
  title: Sample API
  description: Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.
  version: 0.1.9
```
* *title*: tên của API
* *description*: là thông tin mở rộng về API của bạn. Nó có thể được viết dưới dang [multiline](https://stackoverflow.com/questions/3790454/in-yaml-how-do-i-break-a-string-over-multiple-lines/21699210#21699210) và hỗ trợ [CommonMark](http://commonmark.org/help/) của ngôn ngữ Markdowmn. HTML được hỗ trợ trong phạm vi được cung cấp bởi Markdown 
* *version*: là một chuỗi tùy ý chỉ định phiên bản API của bạn.(Khác với phiên bản swagger mà bạn sử dụng được khai báo trong openapi). Bạn có thể sử dụng phiên bản ngữ nghĩa như major.minor.patch hoặc chuỗi tùy ý như 1.0-beta hoặc 2017-07-25
* *info*: cũng hỗ trợ các từ khóa khác cho thông tin liên hệ, giấy phép, điều khoản dịch vụ và các chi tiết khác. Bạn có thể tham khảo: [Info Object](https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.0.md#info-object)
## Servers
Phần *server* chỉ định API server và base URL. Bạn có thể xác định một hoặc nhiều máy chủ như production hoặc sandbox
```
servers:
  - url: http://api.example.com/v1
    description: Optional server description, e.g. Main (production) server
  - url: http://staging-api.example.com
    description: Optional server description, e.g. Internal staging server for testing
```
Tất cả các đường dẫn API đều có liên quan đến URL máy chủ. Trong ví dụ ở bên trên, định nghĩa đường dẫn */users* có nghĩa là http://api.example.com/v1/users hoặc http://staging-api.example.com/v1/users tùy thuộc vào server được sử dụng. Bạn có thể tìm hiểu thêm ở [api host and base path](https://swagger.io/docs/specification/api-host-and-base-path/)
## Paths
Phần *path* định nghĩa điểm cuối của đường dẫn đến API, và phương thức HTTP hỗ trợ bởi các điểm cuối này. Ví dụ: *GET /users* có thể được mô tả như sau:
```
paths:
  /users:
    get:
      summary: Returns a list of users.
      description: Optional extended description in CommonMark or HTML
      responses:
        '200':
          description: A JSON array of user names
          content:
            application/json:
              schema: 
                type: array
                items: 
                  type: string
```
Một thao tác định nghĩa bao gồm parameter, request body(nếu có) những response status code khả dụng. Để tìm hiểu thêm bạn có thể truy cập vào đường link [path and operation](https://swagger.io/docs/specification/paths-and-operations/)
## Parameters
Các thao tác có thể có các tham số được truyền qua đường dẫn (/users/{userId}), chuỗi truy vấn (/users?role=admin) headers (X-CustomHeader: Value) hoặc cookies (Cookie: debug=0). Bạn có thể định nghĩa được kiểu, định dạng dù chúng là bắt buộc hay tùy chọn và chi tiết khác:
```
paths:
  /user/{userId}:
    get:
      summary: Returns a user by ID.
      parameters:
        - name: userId
          in: path
          required: true
          description: Parameter description in CommonMark or HTML.
          schema:
            type : integer
            format: int64
            minimum: 1
      responses: 
        '200':
          description: OK
```
Bạn có thể tìm hiểu thêm ở: [Describing Parameters](https://swagger.io/docs/specification/describing-parameters/)
## Request body
Nếu một thao tác gửi một request body hãy sử dụng từ khóa *requestBody* để mô tả nội dung body và phương thức truyền thông
```
paths:
  /users:
    post:
      summary: Creates a user.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                username:
                  type: string
      responses: 
        '201':
          description: Created
```
Tìm hiểu thêm ở [Describing Request Body.](https://swagger.io/docs/specification/describing-request-body/)
## Response
Đối với mỗi thao tác, bạn có thể định nghĩa status code khả dụng, ví dụ như 200: OK hoắc 404 Not Found và response body *schema* Schema có thể được định nghĩa một dòng hoặc tham chiếu thông qua [$ref](https://swagger.io/docs/specification/using-ref/). Bạn cũng có thể cung cấp response mẫu cho mỗi loại nội dung khác nhau. 
```
paths:
  /user/{userId}:
    get:
      summary: Returns a user by ID.
      parameters:
        - name: userId
          in: path
          required: true
          description: The ID of the user to return.
          schema:
            type: integer
            format: int64
            minimum: 1
      responses:
        '200':
          description: A user object.
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: integer
                    format: int64
                    example: 4
                  name:
                    type: string
                    example: Jessica Smith
        '400':
          description: The specified user ID is invalid (not a number).
        '404':
          description: A user with the specified ID was not found.
        default:
          description: Unexpected error
```
Lưu ý rằng HTTP status code phản hồi phải được đặt trong dấu ngoặc kép: "200" (OpenAPI 2.0 không yêu cầu điều này). Tìm hiểu thêm: [Describing Response](https://swagger.io/docs/specification/describing-responses/)
## Input và Output Models
Thành phần tổng quát *components/schemas* ho phép bạn xác định các cấu trúc dữ liệu phổ biến được sử dụng trong API của bạn. Chúng có thể được tham chiếu thông qua *$ref* bất cứ khi nào một *schema* bắt buộc trong parameters, request bodies, và response bodies. Ví dụ, JSON object sau đây:
```
{
  "id": 4,
  "name": "Arthur Dent"
}
```
có thể được biểu diễn dưới dạng
```
components:
  schemas:
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
và sau đó được tham chiếu trong request body schema và lược response body schema như sau:
```
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
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
  /users:
    post:
      summary: Creates a new user.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/User'
      responses:
        '201':
          description: Created
```
## Authentication
Từ khóa *securitySchemes* và *security* được sử dụng để mô tả các phương thức được sử dụng trong API của bạn
```
components:
  securitySchemes:
    BasicAuth:
      type: http
      scheme: basic
security:
  - BasicAuth: []
```
Các phương thức xác thực được hỗ trợ là:
* Phương thức xác thực HTTP: [Basic](https://swagger.io/docs/specification/authentication/basic-authentication/), [Bearer](https://swagger.io/docs/specification/authentication/bearer-authentication/), and các phương thức tương tự
* [API key](https://swagger.io/docs/specification/authentication/api-keys/) dưới dạng header hoặc query parameters hoặc trong cookie
* [OAuth 2](https://swagger.io/docs/specification/authentication/oauth2/)
* [OpenID Connect Discovery](https://swagger.io/docs/specification/authentication/openid-connect-discovery/)

Tìm hiểu thêm tại [Authentication](https://swagger.io/docs/specification/authentication/)

> Tài liệu tham khảo:
> 
> https://swagger.io/docs/specification/authentication/
> 
> https://www.blazemeter.com/blog/getting-started-with-swagger-ui
> 
> https://github.com/latrell/Swagger