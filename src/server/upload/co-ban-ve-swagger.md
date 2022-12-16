Như chúng ta biết hiện nay việc phát triển các ứng dụng hay hệ thống đều cần sử dụng đến một thứ không thể thiếu là  **API**.
Nó là các phương thức, giao thức kết nối với các thư viện và ứng dụng khác. Nó là viết tắt của Application Programming Interface – giao diện lập trình ứng dụng. API cung cấp khả năng cung cấp khả năng truy xuất đến một tập các hàm hay dùng. Và từ đó có thể trao đổi dữ liệu giữa các ứng dụng. 

Vậy nên chúng ta luôn cần một **Tài liệu hướng dẫn API**. Nó là một nội dung kỹ thuật, nó chứa tất cả các thông tin được yêu cầu để có thể làm việc với API, với thông tin chi tiết về các tài nguyên, phương thức, các request và response, thông tin chứng thực, … được hỗ trợ bởi các hướng dẫn và ví dụ.
 Một công cụ rất phổ biến hiện nay để giúp làm một Tài liệu hướng dẫn API đó là **Swagger**.
 
###  Swagger là gì
**Swagger** là một bộ công cụ mã nguồn mở để xây dựng OpenAPI specifications giúp chúng ta có thể thiết kế, xây dựng tài liệu và sử dụng REST APIs.  
Swagger cung cấp 3 tools chính cho các developers :
- **Swagger-Editor** : dùng để design lên các APIs hoàn toàn mới hoặc edit lại các APIs có sẵn thông qua 1 file config.
- **Swagger-Codegen** : dùng để generate ra code từ các file config có sẵn
- **Swagger-UI** : dùng để generate ra file html,css,… từ 1 file config.

Trong các tools trên, **Swagger UI** được sử dụng nhiều nhất, nó giúp sinh ra giao diện cho tài liệu từ file config dưới chuẩn OpenAPI. Giao diện được hiện ra rõ ràng và tường minh. Dễ dàng đọc hiểu cho cả lập trình viên lẫn người dùng. Sử dụng file config nhưng hoàn toàn tách biệt tác vụ với nhau. Trong bài này mình sẽ giới thiệu Swagger phiên bản 2.0 .

### Cấu trúc cơ bản của file Swagger
Đầu tiên 1 file swagger có thể viết bằng JSON hoặc YAML. 
- **Metadata**:  Mọi thông số kỹ thuật của Swagger đều bắt đầu với phiên bản Swagger . Phiên bản Swagger xác định cấu trúc tổng thể của đặc tả API - những gì bạn có thể ghi lại và cách bạn ghi lại nó. Ngoài ra các thông tin chi tiết như tiêu đề, mô tả hay version của bản api hiện tại cũng được khai báo tại đây.
- **Base Url**: Nơi bạn sẽ định nghĩa host của server, đường dẫn cơ bản cũng như giao thức https hoặc http.
- **Consumes, Produces**: xác định các loại [MiME](https://swagger.io/docs/specification/2-0/mime-types/) được API hỗ trợ 
- **Paths**: xác định các điểm cuối riêng lẻ (đường dẫn) trong API của bạn và các phương thức HTTP (hoạt động) được hỗ trợ bởi các điểm cuối này. Và đây là phần quan trọng chứa thông tin API của bạn sẽ như thế nào bằng đường dẫn API, phương thức (GET, POST, PUT...), request (query, path, body..), response API

### API Host and Base URL
REST APIs có một URL cơ sở mà các đường dẫn điểm cuối được nối vào. Đường url này được định nghĩa bởi **schema**, **host**, **basePath**
```
host: petstore.swagger.io
basePath: /v2
schemes:
  - https
```
 Tất cả API đều được dựa trên đường URL này ví dụ: 
 ![](https://images.viblo.asia/7e38fb09-6246-4890-a53d-9470328d9046.png)

- **Schema** là giao thức truyền được API sử dụng. Swagger hỗ trợ 2 giao thức là **http** và **https**
```
schemes:
  - http
  - https
```
- **host** là tên miền hoặc địa chỉ IP (IPv4) của máy chủ lưu trữ cung cấp API. Nó có thể bao gồm số cổng nếu khác với cổng mặc định của lược đồ (80 cho HTTP và 443 cho HTTPS). Lưu ý rằng đây chỉ phải là máy chủ lưu trữ, không có http (s): // hoặc đường dẫn phụ
```
api.example.com
example.com:8089
93.184.216.34
93.184.216.34:8089
```
- **basePath** là tiền tố URL cho tất cả các đường dẫn API, liên quan đến gốc máy chủ. Nó phải bắt đầu bằng một dấu gạch chéo /. Nếu basePath không được chỉ định, nó sẽ mặc định là /, nghĩa là, tất cả các đường dẫn đều bắt đầu từ máy chủ gốc
```
/v2
/api/v2
/
```
### Paths and Operations
 Là các điểm cuối (tài nguyên) mà API của bạn hiển thị, chẳng hạn như `/pet` và hoạt động là các phương thức HTTP được sử dụng để thao tác các đường dẫn này, chẳng hạn như GET, POST hoặc DELETE.
 ```
 paths:
  /pet:
    post:
 ```
 
 Khi đã khai báo đường dẫn đến API và phương thức của API, chúng ta cần tiếp tục khai báo đến request input của API gọi là **Parameters**
 
###  Parameters
Trong Swagger, các tham số hoạt động API được xác định trong phần tham số trong định nghĩa hoạt động. Mỗi tham số có tên, kiểu giá trị (đối với tham số giá trị nguyên thủy) hoặc lược đồ (đối với nội dung yêu cầu) và mô tả tùy chọn. Các dạng Parameters như là : 
- **query parameters**, ví dụ /users?role=admin. 
Tham số truy vấn là loại tham số phổ biến nhất. Chúng xuất hiện ở cuối URL yêu cầu sau dấu chấm hỏi (?), Với các cặp tên = giá trị khác nhau được phân tách bằng dấu và (&). Tham số truy vấn có thể được yêu cầu và tùy chọn.
```
     parameters:
        - in: query
          name: offset
          type: integer
          description: The number of items to skip before starting to collect the result set.
        - in: query
          name: limit
          type: integer
          description: The numbers of items to return.
```
- **path parameters**, ví dụ /users/{id}. Tham số đường dẫn là các thành phần của đường dẫn URL có thể khác nhau. Chúng thường được sử dụng để trỏ đến một tài nguyên cụ thể trong một bộ sưu tập, chẳng hạn như người dùng được xác định bằng ID. Một URL có thể có một số tham số đường dẫn, mỗi tham số được biểu thị bằng dấu ngoặc nhọn {}.
```
paths:
  /users/{id}:
    get:
      parameters:
        - in: path
          name: id   # Note the name is the same as in the path
          required: true
          type: integer
          minimum: 1
          description: The user ID.
       responses:
         200:
           description: OK
```
- **header parameters**, ví dụ  X-MyHeader: Value. Một lệnh gọi API có thể yêu cầu gửi các tiêu đề tùy chỉnh cùng với một yêu cầu HTTP. Swagger cho phép bạn xác định tiêu đề yêu cầu tùy chỉnh như trong: tham số tiêu đề. Ví dụ: giả sử, một cuộc gọi tới GET / ping yêu cầu tiêu đề X-Request-ID:
```
paths:
  /ping:
    get:
      summary: Checks if the server is alive.
      parameters:
        - in: header
          name: X-Request-ID
          type: string
          required: true
```
- **body parameters** sử dụng trong the body of POST, PUT and PATCH requests. 
Các yêu cầu POST, PUT và PATCH có thể có phần thân yêu cầu (tải trọng), chẳng hạn như dữ liệu JSON hoặc XML. Theo thuật ngữ Swagger, nội dung yêu cầu được gọi là tham số nội dung. Chỉ có thể có một tham số nội dung, mặc dù hoạt động có thể có các tham số khác (đường dẫn, truy vấn, tiêu đề).
```
paths:
  /users:
    post:
      summary: Creates a new user.
      consumes:
        - application/json
      parameters:
        - in: body
          name: user
          description: The user to create.
          schema:
            type: object
            required:
              - userName
            properties:
              userName:
                type: string
              firstName:
                type: string
              lastName:
                type: string
```
- **form parameters** sử dụng cho những request truyền lên nhiều data ví dụ như việc upload file chả hạn 
```
paths:
  /survey:
    post:
      summary: A sample survey.
      consumes:
        - application/x-www-form-urlencoded
      parameters:
        - in: formData
          name: name
          type: string
          description: A person's name.
        - in: formData
          name: fav_number
          type: number
          description: A person's favorite number.
```

### Response API
Một API cần chỉ định các phản hồi cho tất cả các hoạt động API. Mỗi thao tác phải có ít nhất một phản hồi được xác định, thường là một phản hồi thành công. Phản hồi được xác định bằng mã trạng thái HTTP của nó và dữ liệu được trả về trong nội dung phản hồi và / hoặc tiêu đề
```
paths:
  /ping:
    get:
      produces:
        - application/json
      responses:
        200:
          description: OK
```

Trong câu trả lời, mỗi định nghĩa phản hồi bắt đầu bằng một mã trạng thái, chẳng hạn như 200 hoặc 404. Một hoạt động thường trả về một mã trạng thái thành công và một hoặc nhiều trạng thái lỗi. Mỗi trạng thái phản hồi yêu cầu một mô tả.
```
 responses:
        200:
          description: OK
        400:
          description: Bad request. User ID must be an integer and bigger than 0.
        401:
          description: Authorization information is missing or invalid.
        404:
          description: A user with the specified ID was not found.
```
Ngoài những trạng thái status ra, chúng ta có thể khai báo những dạng dữ liệu mà API sẽ trả về 
```
responses:
        200:
          description: A User object
          schema:
            type: object
            properties:
              id:
                type: integer
                description: The user ID.
              username:
                type: string
                description: The user name.
```
Một thứ rất hay của Swagger hỗ trợ là **$ref**. Nó giúp chúng ta có thể sử dụng lại những data mà ta đã định nghĩa. Nó giúp tránh việc trùng lặp hay khai báo nhiều lần.
```
responses:
        200:
          description: A Pet object
          schema:
            $ref: '#/definitions/Pet'
        "405":
          description: "Invalid input"
definitions:
  Pet:
    type: "object"
    properties:
      id:
        type: "integer"
      name:
        type: "string"
        example: "doggie"
      status:
        type: "string"
        description: "pet status in the store"
```

Như trên chúng ta đã tìm hiểu cơ bản để viết được một file swagger định nghĩa API. Sau đây là một ví dụ mình đã viết ra: 
```
swagger: "2.0"
info:
  description: "demo"
  version: "1.0.0"
  title: "Swagger Petstore"
host: "petstore.swagger.io"
basePath: "/v2"
schemes:
- "https"
- "http"
paths:
  /pet:
    post:
      tags:
      - "pet"
      summary: "Add a new pet to the store"
      description: ""
      operationId: "addPet"
      consumes:
      - "application/json"
      - "application/xml"
      produces:
      - "application/xml"
      - "application/json"
      parameters:
      - in: "body"
        name: "body"
        description: "Pet object that needs to be added to the store"
        required: true
        schema:
          type: object
          properties:
            name:
              type: string
      responses:
        "200":
          description: "Success"
        "405":
          description: "Invalid input"
  /pets/{id}:
    get:
      tags:
      - "pet"
      summary: "Get Pet of Store"
      description: "Get Pet of Store"
      operationId: "getPets"
      consumes:
      - "application/json"
      produces:
      - "application/json"
      parameters:
        - in: path
          name: id
          type: integer
          required: true
          description: Numeric ID of the user to get.
      responses:
        200:
          description: A Pet object
          schema:
            $ref: '#/definitions/Pet'
        "405":
          description: "Invalid input"
definitions:
  Pet:
    type: "object"
    properties:
      id:
        type: "integer"
      name:
        type: "string"
        example: "doggie"
      status:
        type: "string"
        description: "pet status in the store"
```

![](https://images.viblo.asia/b015e475-a3d9-4949-ac00-98fb2db86502.png)

Hy vọng bài viết của mình sẽ giúp các bạn hiểu và sử dụng Swagger một cách tốt.
Bài viết được tham khảo từ : https://swagger.io/docs