APIs(Application Programming Interfaces) đang ngày càng trở nên phổ biến, các dịch vụ trên Internet hầu hết đều sử dụng chuẩn RESTfull APIs để cung cấp cho các đối tác 1 phần tài nguyên của mình sử dụng. Vậy ta đặt ra câu hỏi là làm sao để cho các đối tác biết mình được cung cấp những tài nguyên gì? Phải sử dụng những thông tin nào để có thể lấy được tài nguyên đó?

Chính vì thế, ta cần phải có 1 công cụ hỗ trợ việc tạo document APIs giúp thuận tiện cho việc cung cấp về cách sử dụng tài nguyên thông qua APIs 1 cách hiệu quả. Hôm nay chúng ta sẽ tìm hiểu về 1 công cụ khá nổi tiếng dùng để viết document APIs: Swagger.
## Swagger là gì ?

Swagger là 1 open source dùng để phát triển, thiết kế, xây dựng và làm tài liệu cho các hệ thống RESTfull Web Service.

Swagger cung cấp những công cụ hỗ trợ việc tạo doc: Swagger UI, Swagger Editor, Swagger Codegen, Swagger Hub, Swagger Inspector. Trong đó 3 công cụ đầu tiên là open source, Swagger Hub và swagger Inspector là những công cụ cao cấp hơn nhưng sẽ phải trả phí, tuy nhiên chúng ta có thể dùng free trong vòng 30 ngày. Vậy để cho thuận tiện, chúng ta sẽ tìm hiểu các viết doc APIs bằng SwaggerUI và sơ lược về Swagger Hub.
Swagger UI là 1 công cụ giúp gen 1 trang html css mô tả về các APIs được cấu hình bởi 1 file .yaml. Ngoài ra, công cụ này còn cho phép ta mockup đến api đó để xem kết quả (tất nhiên là api của bạn phải hoạt động được đã :D).

## Cài đặt Swagger UI
**Bước 1**: Tải thư viện Swagger UI

Thực chất thì để hiển thị một document API cho người dùng đọc, thì chỉ cần 2 thứ, đó là thư viện Swagger UI và file document API được viết theo cú pháp và cấu trúc của Swagger có định dạng là ***.yaml**. Để cài đặt nó trong project của mình thì bạn làm như sau:

Thực hiện pull thư viện swagger-ui từ trang github của nó vào project của mình như sau:
```
git clone git@github.com:swagger-api/swagger-ui.git public/swagger-ui
```
Sau đó hãy copy thư mục dist trong project đó vào project của bạn và chọn render file index.html trong thư mục dist. 

Như trong project của tôi sử dụng Ruby on Rails làm backend sẽ copy vào thư mục **public/swagger** và thêm vào file **routes.rb** `root to: redirect("/swagger/index.html")`

Sau đó config trong file config/routes.rb để Rails có thể nhận đường dẫn đến file html tĩnh để chạy màn hình document API:

Khi đó, nếu ta chạy localhost:3000 trên trình duyệt, ta sẽ được trang demo Swagger UI bên dưới .

![](https://images.viblo.asia/b89a0ff1-736a-4b0c-9124-d084749aabdc.png)

**Bước 2**: Tạo config cấu hình các APIs của bạn

Cấu trúc cơ bản của 1 file .yaml trong Swagger như sau:

`openapi`: Phiên bản Swagger đang sử dụng, sẽ định nghĩa toàn bộ cấu trúc file .yaml

`info`: Thông tin của APIs, trong này sẽ chứa những phần: title, version, description, ...

`title`: tên Open-APIs (thường là tên sản phẩm project mình làm)

`vertion`: Phiên bản APIs public

`description`: Mô tả về APIs

`security`: Authentication mà APIs sử dụng để cung cấp tài nguyên

`paths`: Các APIs mà bạn cung cấp cho đối tác

`component`: Định nghĩa các model sử dụng bởi APIs

Ngoài ra còn rất nhiều keyword khác có thể tham khảo ở trang [document](https://swagger.io/docs/specification/basic-structure/) của Swagger.

Swagger cũng hỗ trợ viết config theo định dạng json, tuy nhiên chúng ta nên viết theo định dạng yaml.

Ta sẽ tạo file .yaml với cấu trúc như sau để cấu hình các APIs:


```
swagger: 2.0
info:
  description: Example of integration swagger with Rails
  version: 1.0.0
  title: Rails 5 Swagger
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

Sau đó, chúng ta save file cấu hìn dưới dạng đuôi `.yaml `vào thư mục **dist** tại bước 1, ở đây mình sẽ lưu thành` swagger.yaml`.

Cấu trúc thư mục như sau:

![](https://images.viblo.asia/e4fd2865-d72a-4de4-84aa-a93ddb39c067.png)

**Bước 3**: Cập nhật lại đường dẫn file config APIs và hưởng thụ thành quả

Bây giờ hãy mở file index.html trong thư mục dist, tìm và sửa path url của function SwaggerUIBundle thành đường dẫn chúng ta vừa tạo.

![](https://images.viblo.asia/96855547-1a2f-4eaf-ab35-051a32131c90.png)


Sau khi đã cài đặt xong, khởi động server Rails và truy cập vào đường dẫn: http://localhost:3000/swagger/dist/index.html, mình sẽ có kết quả như sau:

![](https://images.viblo.asia/9a758a96-4daf-41bf-b585-99fa15c0d250.png)

Kết quả hiển thị nên rất hiểu và trực quan . Tuy nhiên vẫn có một vấn đề đặt ra ở giải pháp này đó là thư viện Swagger UI có dung lượng lên đến gần 200MB, và nó được push trực tiếp vào sourecode của dự án mình, thực sự thì k hay tí nào, và việc get đến url document API trực tiếp trên server API đang chạy cũng làm cho dễ bị lộ cấu trúc của API, vì thực chất thằng giao diện của Swagger UI là một file tĩnh và nó chỉ handle lại response trả về mà thôi. Hãy tương tượng nó như thằng Postman, tuy nhiên nó cung cấp thêm phần mô tả cho API mà thôi.
## Kết luận

Trên đây, chúng ta đã tìm hiểu về 1 công cụ viết và quản lí document APIs khá dễ làm quen và tự viết được (dễ hơn cả code html 😛). Hi vọng bài viết này sẽ giúp ích cho project của các bạn. Cảm ơn vì đã đọc đến cuối bài viết !