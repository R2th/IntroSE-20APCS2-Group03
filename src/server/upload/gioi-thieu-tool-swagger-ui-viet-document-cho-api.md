Chào các bạn, hôm nay mình sẽ giới thiệu với các bạn một tool khá là nổi tiếng trong việc tạo API docs: **Swager UI**

Swagger UI là một tool cho phép bất kỳ ai - từ developers cho đến end users - có thể hình dung và tương tác với các tài nguyên API của dự án. Tool này sẽ tự động generates ra API documents từ file config Swagger, với cái nhìn trực quan và việc triển khai trở nên dễ dàng hơn cho phía client.

### Cài đặt:

**Bước 1:** Tải thư viện Swagger UI. 

Các bạn vào trang chủ https://swagger.io/, tìm tới mục download thư viện Swagger UI sẽ được hướng dẫn clone từ [github repository này](https://github.com/swagger-api/swagger-ui), paste thư viện này vào project của bạn. Tìm đến thư mục **swagger-ui/dist** mở file **index.html** sẽ show lên một trang demo như sau

![](https://images.viblo.asia/156ca5bc-8989-4e9a-be66-facd2d02bf9d.png)

**Bước 2:** Cấu hình routes trỏ đường dẫn đến file index.html. 

Giả sử mình đang xây dựng một ứng dụng Rails app và thả toàn bộ thư viện này vào /public.

Trong file **routes.rb** mình cấu hình như sau:
```
get "/swaggers", to: redirect("/swagger-ui/dist/index.html")
```

Bây giờ khi truy cập tới URL **/swaggers** bạn sẽ được đưa tới file index.html ở trên

**Bước 3:** Tạo 1 file config để cấu hình API docs của project. 

Sau đây mình sẽ tạo file **swagger.yaml** với cấu trúc mẫu như sau:
```
swagger: 2.0
info:
  description: Example of Swagger
  version: 1.0.0
  title: Swagger Demo
schemes:
  - http
basePath: "/api/v1"
tags:
- name: Users
  description: Everything about user
paths:
  /users:
    post:
      tags:
      - Users
      summary: Add new user
      consumes:
      - "application/json"
      produces:
      - "application/json"
      parameters:
      - in: body
        name: data
        description: New user info
        schema:
          type: object
          properties:
            name:
              type: string
              example: User 1
            password:
              type: string
              example: "12345678"
     responses:
       200:
         description: Create user success
         schema:
           type: object
           properties:
             name:
               type: string
               example: User 1
       400:
         description: Create user fail
         schema:
           type: object
           properties:
              errors:
              type: string
              example: Some thing went wrong
```

Một số keys trong file config trên

- **info**: Thông tin cấu hình
- **basePath**: đường dẫn gốc đến thư mục API của project, trong ví dụ này là **/api/v1**
-  **tags**: Định nghĩa những cái tags, có thể sử dụng để gom những API trong cùng một controllers về một nhóm
-  **paths**: đường dẫn đến API, trong ví dụ này **/users** tức là URL của API này sẽ là **/api/v1/users** vì bạn đã khai báo basePath ở trên nên có thể lược bỏ phần base

**Bước 4:** Trỏ URL đến file config

Để sử dụng swagger, trong file **dist/index.html** bạn phải trỏ URL đến file swagger mà bạn vừa config như sau: 

Tìm đến đoạn js cuối file, trong đoạn khai báo `const ui = SwaggerUIBundle` có đoạn 

`url: "http://petstore.swagger.io/v2/swagger.json"`

Hãy sửa URL đó thành URL trỏ tới file **swagger.yaml** mà bạn vừa tạo ở bước 2, ví dụ file swagger.yaml của mình đang nằm trong thư mục **public/api_docs** của một Rails app, mình sẽ change như sau:

`url: "/api_docs/swagger.yaml"`

Truy cập lại file **/swaggers** và bạn sẽ có kết quả

![](https://images.viblo.asia/797f3880-179a-45a1-8e3a-565511f3e073.png)

Bây giờ, bạn có thể tiếp tục thêm vào **paths** trong file **swagger.yaml** để hoàn thành API document cho project của mình.

Tuy nhiên có một vấn đề đó là khi project càng phình to, càng nhiều API thì chẳng phải file **swagger.yaml** của bạn sẽ dài đến vô tận sao, và lúc đó việc click vào file này để sửa API hoặc thêm mới sẽ trở nên khó khăn rất nhiều

### Tổ chức lại file cấu hình với `$ref`

Để giải quyết vấn đề ở trên, bây giờ chúng ta sẽ chia nhỏ file swagger.yaml ra thành nhiều file và sử dụng `$ref` trong swagger.yaml để trỏ tới những file mà ta vừa tách ra

Bây giờ vấn đề tổ chức thư mục như thế nào thì tùy vào các bạn tự ý lựa chọn. Trong bài viết này, mình sẽ chia nhỏ **paths** theo từng controller như sau. Với ví dụ ở trên, hiện tại cấu trúc thư mục của mình như sau:
```
|
|__swagger-ui/
|__api_docs/
     |__swagger.yaml
     |
```

Bây giờ, mình sẽ tách file swagger.yaml ở trên ra theo cấu trúc thư mục như sau:
```
|
|__swagger-ui/
|__api_docs/
     |__swagger.yaml
     |__paths/
     |__components/
     |
```

```
# swagger.yaml
swagger: 2.0
info:
  description: Example of Swagger
  version: 1.0.0
  title: Swagger Demo
schemes:
  - http
basePath: "/api/v1"
tags:
- name: Users
  description: Everything about user
paths:
  /users:
    $ref: paths/users.yaml
# Có 1 lưu ý là bạn không thể viết $ref trực tiếp ngay dưới paths
```

```
# /paths/users.yaml
post:
  $ref ../components/users/create.yaml
# gỉa sử trong UsersController có thêm action khác ví dụ như index thì mình sẽ khai báo thêm ở đây
get:
  $ref ../components/users/index.yaml
```

```
# /components/users/create.yaml
tags:
- Users
summary: Add new user
consumes:
- "application/json"
produces:
- "application/json"
parameters:
- in: body
  name: data
  description: New user info
schema:
  type: object
  properties:
    name:
      type: string
      example: User 1
    password:
      type: string
      example: "12345678"
responses:
  200:
    description: Create user success
    schema:
      type: object
      properties:
        name:
          type: string
          example: User 1
  400:
    description: Create user fail
    schema:
      type: object
      properties:
        errors:
          type: string
          example: Some thing went wrong

# Trong file này các bạn hoàn toàn có thể tách parameters và response ra thành các file khác nhau nếu thấy quá dài
```

F5 là trang **/swaggers** và bạn thấy nội dung vẫn không có gì thay đổi

Cuối cùng, về việc viết **parameters** có khá nhiều khai báo sau từ khóa **in** mà bạn sẽ phải chú ý đến
- Với khai báo **in: body**, bạn sẽ tạo cho người dùng một input area mà ở đó người ta sẽ nhập data body request vào (sử dụng cho methods PATCH/ PUT)
- Với khai báo **in: formData**, bạn sẽ tạo cho người dùng những input đã định trước mà người ta sẽ nhập data request theo từng field đã định sẵn vào (sử dụng cho methods PATCH/ PUT)
- Với khai báo **in: path**, bạn sẽ tạo cho người dùng một input nhập vào giá trị khai báo trong routes, thường là id
- Với khai báo **in: query**, bạn sẽ tạo cho người dùng một input nhập vào giá trị theo các field định sẵn để gửi những query request (sử dụng trong methods GET)
- Với khai báo **in: header**, khai báo những giá trị trong header của request mà bạn cần truyền lên

Các bạn có thể tham khảo các cách viết [tại đây](https://editor.swagger.io/?_ga=2.109078469.1927412424.1523072772-1538259848.1523072772)

Cảm ơn các bạn đã theo dõi!