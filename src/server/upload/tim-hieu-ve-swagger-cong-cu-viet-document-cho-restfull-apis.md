APIs (Application Programming Interfaces) đang ngày càng trở nên phổ biến, các dịch vụ trên Internet hầu hết đều sử dụng chuẩn RESTfull APIs để cung cấp cho các đối tác 1 phần tài nguyên của mình sử dụng. Vậy ta đặt ra câu hỏi là làm sao để cho các đối tác biết mình được cung cấp những tài nguyên gì? Phải sử dụng những thông tin nào để có thể lấy được tài nguyên đó?

Chính vì thế, ta cần phải có 1 công cụ hỗ trợ việc tạo document APIs giúp thuận tiện cho việc cung cấp về cách sử dụng tài nguyên thông qua APIs 1 cách hiệu quả. Hôm nay chúng ta sẽ tìm hiểu về 1 công cụ khá nổi tiếng dùng để viết document APIs: Swagger.

# Swagger là gì ?
Swagger là 1 open source dùng để phát triển, thiết kế, xây dựng và làm tài liệu cho các hệ thống RESTfull Web Service. Ta có demo của Swagger như sau:
![](https://images.viblo.asia/22056284-1d73-481e-b25e-00aacdd672d6.png)
Swagger cung cấp những công cụ hỗ trợ việc tạo doc: Swagger UI, Swagger Editor, Swagger Codegen, Swagger Hub, Swagger Inspector. Trong đó 3 công cụ đầu tiên là open source, Swagger Hub và swagger Inspector là những công cụ cao cấp hơn nhưng sẽ phải trả phí, tuy nhiên chúng ta có thể dùng free trong vòng 30 ngày. Vậy để cho thuận tiện, chúng ta sẽ tìm hiểu các viết doc APIs bằng SwaggerUI.

Swagger UI là 1 công cụ giúp tạo 1 trang html css mô tả về các APIs được cấu hình bởi 1 file .yaml. Ngoài ra, công cụ này còn cho phép ta mockup đến api đó để xem kết quả.

Trong Ruby on Rails hiện tại có gem swagger-docs và swagger-ui  có hỗ trợ việc viết code ruby để render ra file yaml nhưng hiện tại vẫn còn một số lỗi như examples không thể hiện thị hay lỗi về sử dụng oneOf còn chưa được khắc phục và các gem này require rspec nên sẽ chỉ dùng tốt trên môi trường local. Do đó chúng ta sẽ tìm hiểu để viết trực tiếp bằng cú pháp yaml thay vì sử dụng gem.
# Cài đặt Swagger UI
## 1. Tải thư viện swagger
Các bạn clone [project](https://github.com/swagger-api/swagger-ui) Github này về, sau đó hãy copy thư mục dist trong project đó vào project của bạn và chọn render file index.html trong thư mục dist. Như trong project của tôi sử dụng Ruby on Rails làm backend sẽ copy vào thư mục `public/swagger` và thêm vào file routes.rb `root to: redirect("/swagger/index.html")`

Bằng cách này đường dẫn root của app sẽ trỏ đến file index.html của swagger.
## 2. Cấu trúc thư mục
Để tiện cho việc quản lí các API, ta sẽ chia nhỏ file yaml thành các file và phân chia vào các thư mục. Cấu trúc cơ bản của thư mục như sau:

![](https://images.viblo.asia/ce2fc96f-482f-40fe-8568-736565dd4654.png)

**index.yaml** là file config chính cho API docs, chứa các path

**paths** chứa các file define chính của các API, chúng ta sẽ chia theo controller để dễ quản lí

**definitions** chứa các mô tả về object cho API, chúng ta sẽ chia theo models

**shared** chứa các khai báo dùng chung như các errors thường gặp, pagination infor
## 3. Cú pháp $ref
Một cái khá hay của file .yaml là chúng ta có thể tách riêng từng phần và gọi lại chúng nhờ dùng $ref. Chính vì điều này, chúng ta có thể tách các cấu trúc dữ liệu thành từng phần riêng biệt như cấu trúc thư mục ở trên rồi gọi chúng lại. Điều này giúp file .yaml của chúng ta có 1 cấu trúc dễ nhìn dễ đọc và dễ hiểu. Để biết cụ thể thì bạn cần đọc [document](https://swagger.io/docs/specification/using-ref/) của swagger.

Cú pháp để dùng $ref có thể được tóm tắt như sau:

* Trỏ đến lement của document nằm trên cùng 1 file –` $ref: 'document.json#/myElement'`
* Trỏ đến element của document nằm trong thư mục cha  – `$ref: '../document.json#/myElement'`
* Trỏ đến element của document nằm trong một thư mục bất kì – `$ref: '../another-folder/document.json#/myElement'`

## 2. Tạo config cấu hình các APIs của bạn
Cấu trúc cơ bản của 1 file .yaml trong Swagger như sau:

`openapi`: Phiên bản Swagger đang sử dụng, sẽ định nghĩa toàn bộ cấu trúc file .yaml

`info`: Thông tin của APIs, trong này sẽ chứa những phần: title, version, description, ...

`title`: tên Open-APIs (thường là tên sản phẩm project mình làm)

`vertion`: Phiên bản APIs public

`description`: Mô tả về APIs

`security`: Authentication mà APIs sử dụng để cung cấp tài nguyên

`paths`: Các APIs mà bạn cung cấp cho đối tác

`definitions`: Định nghĩa các model sử dụng bởi APIs

Ngoài ra còn rất nhiều keyword khác có thể tham khảo ở trang [document](https://swagger.io/docs/specification/basic-structure/) của Swagger.

Swagger cũng hỗ trợ viết config theo định dạng json, tuy nhiên chúng ta nên viết theo định dạng yaml.

Ta sẽ tạo file index.yaml với cấu trúc như sau để cấu hình các APIs:

```yaml
---
openapi: 3.0.1
info:
  title: API V1
  version: v1
paths:
  /api/v1/users:
    $ref: ../paths/users.yaml#index_create
  /api/v1/users/{id}:
    $ref: ../paths/users.yaml#show_update
servers:
- url: https://{defaultHost}
  variables:
    defaultHost:
      default: www.example.com
```
Ở đây chúng ta sẽ có chia paths theo controller, cấu trúc Restful trong rails có 7 action nhưng thông thường khi viết API thì chỉ có 5 action thường dùng là index, create, show, update, delete. Trong đó, index và create không yêu cầu ID, còn các action còn lại đều yêu cầu ID, với mục đích mỗi file .yaml trong paths sẽ khai báo 1 resource theo controller do đó ta cần thêm key index_create và show_update (key có thể đặt tùy ý) để phân biệt.

File paths/users.yaml
```yaml
index_create:
    get:
    summary: List users
    tags:
    - users
    description: Use this API to get list users
    responses:
      200:
        description: Get list users successfully
        content:
          application/json:
            schema:
              type: object
              properties:
                success:
                  type: boolean
                  example: true
                data:
                  type: object
                  properties:
                    users:
                      type: array
                      items:
                        $ref: "../../definitions/user.yaml"
 show_update:
     put:
        summary: Update user
        tags:
        - user
        description: Use this API to updat user
        parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer

        requestBody:
          content:
            application/json:
              schema:
                type: object
                properties:
                   user:
                    type: object
                    properties:
                      name:
                        type: string
                        required: true
                        example: User new name

        responses:
          200:
            description: Update user successfully
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    success:
                      type: boolean
                      example: true
                    data:
                      type: object
                      properties:
                         user:
                          $ref: "../../definitions/user.yaml"
                    meta:
                      type: object
          400:
            description: Bad Request
            content:
              application/json:
                schema:
                  $ref: "../../definitions/common.yaml#/errors_object"
                examples:
                  when name was blank:
                    value:
                      success: false
                      errors:
                      - resource: user
                        field: name
                        code: 1003
                        message: Name is blank
          404:
            description: Not found
            content:
              application/json:
                schema:
                  $ref: "../../definitions/common.yaml#/errors_object"
                examples:
                  when user was not found:
                    value:
                      success: false
                      errors:
                      - resource: user
                        field:
                        code: 1051
                        message: User not found
```

File definitions/user.yaml

```yaml
  type: object
  properties:
    id:
      type: integer
      example: 1
    name:
      type: string
      description: User's name
      example: Nhat
```

File definitions/commons.yaml
```yaml
errors_object:
  type: object
  properties:
    success:
      type: boolean
      example: false
    errors:
      type: array
      items:
        type: object
        properties:
          code:
            type: integer
            required: true
          message:
            type: string
            required: true
          resource:
            type: string
            nullable: true
            description: The resource which is error
          field:
            type: string
            nullable: true
            description: The attribute wich is incorrect
```

Chỉnh sửa file index.html trong thư mục swagger
```javascript
window.onload = function() {
  // Begin Swagger UI call region
  const ui = SwaggerUIBundle({
    url: "/api/v1/index.yaml",
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  })
  // End Swagger UI call region

  window.ui = ui
}
```
Sau tất cả bạn hãy khởi chạy server để xem thành quả của mình nào.

# Tổng kết
Như vậy chúng ta đã tìm hiểu và viết được một API documents cơ bản bằng cú pháp yaml với swagger. Ngoài ra chúng ta còn phân chia được các file yaml thành các thư mục phù hợp với cấu trúc viết API với Ruby on Rails để có thể dễ dàng quản lí. Swagger còn rất nhiều keyword thú vị để chúng ta có thể tìm hiểu và áp dụng vào project của mình. Và bây giờ chúng ta có thể viết API docs mà không còn phụ thuộc vào Ruby gem nữa.