![](https://images.viblo.asia/853b3b00-724f-40f2-8ab0-848ee0b90764.PNG)

# 1. Lời mở đầu
Kỳ này trên trường mình có dạy môn về lập trình ứng dụng Android. Bài tập lớn cho cả kỳ của mình là làm ra 1 ứng dụng với yêu cầu: làm cái gì cũng được, áp dụng càng nhiều công nghệ, càng nhiều kỹ thuật thì điểm càng cao.

Với yêu cầu đó mình đã quyết định làm 1 API server cho ứng dụng Android. Quá trình tìm hiểu kiến thức mới có nhiều khó khăn, giải quyết xong vấn đề A thì lại xuất hiện vấn đề B. Nhưng quá trình này cũng rất thú vị.

Code xong server rồi thì mình nghĩ tới 1 vấn đề: ```nhiều đầu API như này thì làm sao báo cáo hết được kết quả? Ghi vào báo cáo word thì trông "cùi bắp" quá. Phải làm cái gì đó thú vị hơn.```

Và thế là mình tìm hiểu thêm và biết về **Swagger UI**.

# 2. Swagger UI
Swagger UI là một công cụ để bất kỳ ai, chỉ cần truy cập trang API document là có thể hình dung và tương tác với các tài nguyên API của dự án. Swagger UI này sẽ tự tạo ra các API document từ file config Swagger.

Giao diện của Swagger UI có ưu điểm là đẹp, màu sắc sặc sỡ bắt mắt, thậm chí có thể thực hiện luôn request tới từng đầu API và nhận về kết quả.

![](https://images.viblo.asia/d467907b-9923-4e5b-869e-a6165fdf5c7f.PNG)

Để cài đặt Swagger UI thì chúng ta cần clone repo swagger-api trên Github về tại đây: https://github.com/swagger-api/swagger-ui

Sau đó tiến hành cài đặt thủ công hoặc docker theo như hướng dẫn tại: https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/

Nhưng mình sẽ không cài đặt nhiều bước **dài dòng** như vậy. Trong bài viết này, mình sẽ hướng dẫn các bạn tạo 1 trang API document với Swagger:
- **ĐƠN GIẢN KHI CÀI ĐẶT**
- **ĐƠN GIẢN KHI TÙY CHỈNH DỮ LIỆU**
- **ĐƠN GIẢN KHI DEPLOY LÊN SERVER**

# 3. Làm API document siêu ĐƠN GIẢN
## 3.1. Cài đặt
**Bước 1:** chúng ta sẽ download repo trên github về tại https://github.com/swagger-api/swagger-ui
![](https://images.viblo.asia/28b19c85-0f6b-49ef-ad3e-5a9be301ebb6.PNG)

Bấm vào nút Download ZIP để tải về. Sau khi giải nén ra chúng ta sẽ có toàn bộ các file cần thiết.
![](https://images.viblo.asia/8a115fd1-ac80-41e7-941c-d7878aed4029.PNG)

**Bước 2:** Vì làm đơn giản và nhanh nên chúng ta chỉ cần các file trong thư mục **dist** thôi. Chúng ta copy hết toàn bộ các file trong thư mục này ra 1 một nơi khác. Sau đó xóa mấy cái file và folder swagger đi luôn, mấy cái đó hết tác dụng rồi.

![](https://images.viblo.asia/210c3c59-fed2-4b8e-b334-f768effd1c13.PNG)

## 3.2. Tùy chỉnh giao diện
Để sửa giao diện thì chúng ta sẽ sửa file **index.html**. Khi chỉnh sửa file index thì chúng ta có thể thay đổi những phần mình đã khoanh đỏ dưới đây
![](https://images.viblo.asia/f2c6cce3-d181-4285-9e87-c685f701ab1e.PNG)

Để thay đổi phần tiêu đề và icon trên tab trình duyệt, chúng ta sẽ sửa nội dung trong thẻ ```<title>``` và đường dẫn của 2 cái ảnh.
![](https://images.viblo.asia/b209521a-1b37-4852-8787-2015d2e56fea.PNG)

Để thay đổi danh sách các API, chúng ta sẽ sửa dòng url dưới đây
![](https://images.viblo.asia/cba7530e-1f60-425d-bafa-e1508bc7b5fc.PNG)
Thay vì lấy dữ liệu từ 1 url ngoài, chúng ta sẽ tải trực tiếp dữ liệu từ file json luôn (chúng ta sẽ tạo và chính sửa file json chứa dữ liệu sau). Để thay đổi chỉ cần:
- Thêm 1 thẻ script xác định file json chứa dữ liệu: ```<script src='spec.js' type="text/javascript"></script>```
- Đổi dòng url thành spec

![](https://images.viblo.asia/ef818bdd-bebf-45e1-9b5d-4c6be0598baf.PNG)

Để xóa thanh Explore đi, chúng ta sẽ xóa các đoạn sau
```html
<script src="./swagger-ui-standalone-preset.js" charset="UTF-8"> </script>
```
và
```html
plugins: [
    SwaggerUIBundle.plugins.DownloadUrl
],
layout: "StandaloneLayout"
```
và dòng ```SwaggerUIStandalonePreset``` trong phần preset

Sau các chỉnh sửa trên, file **index.html** trở thành như sau:
```html
<!-- HTML for static distribution bundle build -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>API Document</title>
    <link rel="stylesheet" type="text/css" href="./swagger-ui.css" />
    <link rel="icon" type="image/png" href="./logo.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="./logo.png" sizes="16x16" />
    <style>
      html
      {
        box-sizing: border-box;
        overflow: -moz-scrollbars-vertical;
        overflow-y: scroll;
      }

      *,
      *:before,
      *:after
      {
        box-sizing: inherit;
      }

      body
      {
        margin:0;
        background: #fafafa;
      }
    </style>
  </head>

  <body>
    <div id="swagger-ui"></div>

    <script src="./swagger-ui-bundle.js" charset="UTF-8"> </script>
    <script src='spec.js' type="text/javascript"></script>
    <script>
    window.onload = function() {
      // Begin Swagger UI call region
      const ui = SwaggerUIBundle({
        spec: spec,
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis
        ]
      });
      // End Swagger UI call region

      window.ui = ui;
    };
  </script>
  </body>
</html>
```

![](https://images.viblo.asia/54763544-bcd5-4362-9c90-5c51ea44dc82.PNG)

## 3.3. Tùy chỉnh dữ liệu
Ở trên mình đã nói về việc thêm 1 file **spec.js** để xác định các đầu API và thông tin hiển thị. Bây giờ chúng ta sẽ chỉnh sửa dữ liệu trong file js này.

Cấu trúc cơ bản của file spec.js như sau:
```json
var spec =
{
    swagger: "2.0",    // Phiên bản Swagger UI
    info: {
        description:
            "Các thông tin mô tả về dự án và API",
        version: "1.0",    // Phiên bản API
        title: "Tên dự án"
    },
    host: "localhost:3000",    // Server và port deploy API
    basePath: "/api/v1",       // Đường dẫn tới API
    tags: [    // Danh sách các nhóm API: admin, users, images,...
        {
            name: "admin",                                   // Tên nhóm API
            description: "Các API về tài khoản quản trị",    // Mô tả về nhóm API
        }
    ],
    schemes: ["http"],    // Sử dụng scheme gì? HTTP, HTTPS?
    paths: {
        "/admin/": {    // Đường dẫn. Kết hợp với host và basePath sẽ thành localhost:3000/api/v1/admin/
            post: {        // Phương thức gửi request: get, post, put, delete
                tags: ["admin"],
                summary: "Tạo tài khoản admin",
                description: "",
                operationId: "createNewAdminAccount",
                consumes: ["multipart/form-data"],    // Loại dữ liệu gửi đi
                produces: ["application/json"],       // Loại dữ liệu trả về
                parameters: [               // Các tham số
                    {
                        "in": "formData",      // Tham số được gửi lên từ form
                        "name": "username",    // Tên tham số
                        "required": "true",    // Tham số là bắt buộc
                        "schema": {
                            "type": "string"   // Loại dữ liệu của tham số là chuỗi
                        },
                        "description": "username cho tài khoản admin mới"
                    },
                    {
                        "in": "formData",
                        "name": "password",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "password cho tài khoản admin mới"
                    }
                ],
                responses: {
                    200: {
                        description: "status: 201 CREATED"
                    },
                },
                security: [
                    
                ]
            }
        },
        "/admin/{id}": {
            get: {
                tags: ["admin"],
                summary: "Lấy tài khoản admin theo id",
                description: "",
                operationId: "getAdminAccountByID",
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "schema": {
                            "type": "integer",
                            "minimum": "1"
                        },
                        "description": "id của tài khoản admin"
                    }
                ],
                responses: {
                    200: {                                     // Mã trả về 200
                        description: "Lấy dữ liệu thành công",    // Mô tả kết quả trả về
                        schema: {
                            $ref: "#/definitions/admin"           // Dữ liệu trả về là đói tượng admin (tham chiếu với phần definitions ở cuối)
                        }
                    },
                },
                security: [
                    
                ]
            },
            put: {
                tags: ["admin"],
                summary: "Đổi mật khẩu tài khoản admin theo id",
                description: "",
                operationId: "changePasswordAdminAccountByID",
                consumes: ["multipart/form-data"],
                produces: ["application/json"],
                parameters: [
                    {
                        "in": "path",
                        "name": "id",
                        "required": "true",
                        "schema": {
                            "type": "integer",    // Kiểu tham số là số nguyên
                            "minimum": "1"        // Giá trị thấp nhất là 1
                        },
                        "description": "id của tài khoản admin"
                    },
                    {
                        "in": "formData",
                        "name": "password",
                        "required": "true",
                        "schema": {
                            "type": "string"
                        },
                        "description": "password mới của tài khoản admin"
                    }
                ],
                responses: {
                    200: {
                        description: "đổi mật khẩu thành công"
                    },
                },
                security: [
                    
                ]
            }
        }
    },
    securityDefinitions: {    // Thông tin về api key sử dụng để thực hiện request
        api_key: {
            type: "apiKey",      // Thuộc loại api key xác thực
            name: "api_key",     // Tên trường chứa api key xác thực
            in: "header",        // API key được để trong phần header của request
        }
    },
    definitions: {            // Thông tin các đối tượng sẽ trả về
        admin: {                 // Tên đối tượng
            type: "object",         // Loại đối tượng là object
            properties: {           // Các thuộc tính của đối tượng
                id: {                  // Tên thuộc tính
                    type: "integer"    // Loại dữ liệu là số nguyên
                },
                username: {
                    type: "string"     // Loại dữ liệu là chuỗi
                },
                password: {
                    type: "string"
                }
            }
        }
    }
};
```

Mình đã comment hết thông tin của từng trường dữ liệu rồi. Tùy theo nhu cầu, chúng ta chỉ cần thay đổi thông tin là có thể đạt được kết quả mong muốn.

Tính năng gửi request tới API server của Swagger UI sẽ gửi request dựa vào các thông tin chúng ta khai báo. Tùy vào code back-end mà chúng ta cần thay đổi tương ứng, nếu không khi gửi request sẽ bị lỗi.

## 3.4. Deploy
Chúng ta chỉ cần copy cả thư mục lên web server là có thể truy cập được. Sau khi tối giản, xóa toàn bộ các file không cần thiết đi thì thư mục cần deploy chỉ còn lại như sau:

![](https://images.viblo.asia/9283dbdc-5788-4f5d-bb5f-96c4d9daa4a8.PNG)

Như vậy là chúng ta đã có 1 trang API Document cực nhẹ, tải cực nhanh trong khi làm cực đơn giản.