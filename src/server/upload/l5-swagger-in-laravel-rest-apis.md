# 1. Mở đầu
Trong thời đại mà RESTful API trở thành xương sống của các ứng dụng đa nền tảng và đòi hỏi sự liên kết của nhiều bên. **Swagger** và **OpenAPI** là những công cụ mạnh mẽ sinh ra để giải quyết vấn đề gắn kết các bên, theo dõi thông tin, tiến độ và kiểm tra các API một cách dễ dàng, tường minh. Nó cho phép các developers hiểu cách ứng dụng hoạt động mà không cần phải đọc qua toàn bộ source code. :grinning:

Trong bài viết hôm nay mình sẽ giới thiệu cho các bạn một thư viện hỗ trợ viết và generate api documentation một cách dễ dàng và tiện lợi trong Framework Laravel.
# 2. Giới thiệu về Swagger
Trước tiên mình cần tìm hiểu qua một số khái niệm nhé! **Swagger** là gì? **OpenAPI Specification** là gì? **Swagger UI** là gì?

**Swagger** là mã nguồn mở cung cấp công cụ cho các lập trình viên và các bên khác (kể cả bên phân tích product hay khách hàng,..) dễ dàng tạo ra một tài liệu RESTful API chuyên nghiệp, dễ hiểu và đúng quy chỉnh.

Là một framework có thể hỗ trợ các developer trong toàn bộ quá trình phát triển API, từ thiết kế, viết tài liệu cho tới testing và deployment.

**OpenAPI Specification:** là một định dạng mô tả API dành cho RESTful API. Một file OpenAPI cho phép bạn mô tả toàn bộ API gồm các thông tin như host, basePath, version,... Riêng từng API sẽ có các thông tin cơ bản như path, type, params, response, authentication,...

**Swagger UI:** Là một mã nguồn mở giúp sinh ra giao diện cho tài liệu từ file config dưới chuẩn OpenAPI. Giao diện rất rõ ràng và tường minh. Có thể test các API trực tiếp trong giao diện (tương tự postman).

   ![](https://images.viblo.asia/cb3cd298-f7e3-40af-b3b1-99c1c6a105fd.png)

# 3. L5-Swagger
Laravel là một framework PHP mạnh mẽ trong việc tạo ra các RESTful API cùng cộng đồng vô cùng lớn nên chúng ta có thể thấy rất nhiều mã nguồn mở trợ giúp cho việc tích hợp và làm việc với Swagger cùng Laravel.

Sau đây mình xin giới thiệu tới các bạn thư viện **L5-Swagger**.

## 3.1. L5-Swagger là gì?
**L5-Swagger** là một thư viện hỗ trợ khá tốt cho toàn bộ công đoạn làm việc với Swagger bao gồm cả việc hiển thị UI và generate file config từ các API có sẵn. Document của thư viện cũng mô tả khá rõ ràng về các chức năng, và cách cài đặt.
## 3.2. Các bước cài đặt và cấu hình l5-swagger vào Laravel
> **Lưu ý:** Chúng ta phải dùng Laravel >= 5.1 và Swagger >= 2.0
### Bước 1: Create Laravel 5 Project

`composer create-project --prefer-dist laravel/laravel l5-swagger  `
### Bước 2: Install Swagger Package (Ở đây mình cài laravel 5.8)
`composer require "darkaonline/l5-swagger:5.8.*"`

Vì mặc định **darkaonline/l5-swagger": "5.8.*"** sử dụng swagger 3.0 nếu bạn muốn sử dụng swagger phiên bản cũ hơn 2.0 và sử sụng `@SWG` (SWAGGER annotations) hỗ trợ:
 
 `composer require 'zircote/swagger-php:2.*'`
 
 Ngoài ra mọi người có thể tham khảo thêm ở [đây](https://github.com/DarkaOnLine/L5-Swagger) để cài đặt l5-swagger sao cho phù hợp với phiên bản laravel.
### Bước 3: Publish L5-Swagger config and view files
`php artisan vendor:publish --provider "L5Swagger\L5SwaggerServiceProvider"`
### Bước 4: Using Swagger `@SWG` annotation
Ở bước 2 mình có cài và sử dụng @SWG ở đây chúng ta phải:
Thêm vào file** .env**: `SWAGGER_VERSION=2.0`
Hoặc vào  **config/15-swagger.php** sửa thành: 
`'swagger_version' => env('SWAGGER_VERSION', '2.0'),`
### Bước 5: Create A Controller that wants to have Swagger Annotations:
Chúng ta sẽ viết Swagger api documentation trong các Controller

VD: Thêm đoạn chú thích sau vào một controller:
```
/**
 * @SWG\Swagger(
 *      schemes={"http", "https"},
 *      @SWG\Info(
 *          version="1.0.0",
 *          title="L5 Swagger API",
 *          description="L5 Swagger API description",
 *          @SWG\Contact(
 *              email="darius@matulionis.lt"
 *          ),
 *      )
 *  )
 */
```
=>  Kết quả:![](https://images.viblo.asia/860e8cb0-7288-4b6e-bc1d-286a8800f6ee.png)

- Có thể thêm đoạn này để xác thực người dùng: (tham khảo [Swagger Authentication](https://swagger.io/docs/specification/2-0/authentication/))
    ```
    /**
     * @SWG\SecurityScheme(
     *   securityDefinition="APIKeyHeader",
     *   type="apiKey",
     *   in="header",
     *   name="Authentication",
     * )
     */
    ```~~

### Bước 6: Generate Swagger UI:
- Chạy câu lệnh sau:  
`php artisan l5-swagger:generate`
- Nếu không muốn mỗi lần thay đổi api documentation đều phải chạy câu lệnh trên thì ta sét trong file **.env**.
`L5_SWAGGER_GENERATE_ALWAYS=true `
### Bước 7: Accessing the UI:
- Giờ thì bạn truy cập: `http://localhost:8000/api/documentation`

    **=> Kết quả:**

![](https://images.viblo.asia/cb3cd298-f7e3-40af-b3b1-99c1c6a105fd.png)
# 4. Một số chú thích
Ở đây mình có làm một ví dụ đơn giản cho function **store()** cho **UserController**:
```
    /**
     * @SWG\Post(
     *   path="api/users",
     *   summary="Create A User",
     *   operationId="store",
     *   tags={"Users"},
     *   security={
     *       {"ApiKeyAuth": {}}
     *   },
     *   @SWG\Parameter(
     *       name="name",
     *       in="formData",
     *       required=true,
     *       type="string"
     *   ),
     *   @SWG\Parameter(
     *       name="email",
     *       in="formData",
     *       required=true,
     *       type="string"
     *   ),
     *   @SWG\Parameter(
     *       name="team_id",
     *       in="formData",
     *       required=true,
     *       type="integer"
     *   ),
     *   @SWG\Response(response=200, description="successful operation"),
     *   @SWG\Response(response=406, description="not acceptable"),
     *   @SWG\Response(response=500, description="internal server error")
     * )
     *
     */
```
- Giải thích một số  keys:

    - **`@SWG\Swagger`:** Chứa thông tin cơ bản về swagger
    - **`@SWG\Info`:** Thông tin cấu hình
    - **`@SWG\SecuritySchema`:** Mô tả các phương pháp xác thực được sử dụng trong API ([Swagger Authencation](https://swagger.io/docs/specification/2-0/authentication/)).
    - **`security`:** API nhận access_token xác thực từ **securitySchema**
    - **`@SWG\<Method-name>`:** Định nghĩa kiểu phương thức HTTP mà chúng ta sẽ sử dụng ( GET, POST, PUT, DELETE,...).
    - **`path`:** Định nghĩa đường dẫn api gọi tới function.
    - **`summary`:** Tóm tắt chức năng của đầu api.
    - **`operationId`:** Tên của function.
    - **`tags`:** Định nghĩa tags, gom tất cả các đầu API có trong một Controller thành một nhóm để người dùng dễ nhìn.
    - **`@SWG\Parameters`:** các parameters được truyền cho API. Trong này ta có thể set tham số truyền vào:
        - **`required`:** không null thì để true, ngược lại false
        - **`in`:**
            - **`body`:** Sẽ tạo cho người dùng một input area mà ở đó người ta sẽ phải nhập data body request vào (thường sử dụng cho PATH/PUT) 
            - **`formData`:** Sẽ tạo cho những người dùng những input đã được định trước và người ta sẽ nhập data request theo từng field đã định sẵn vào (thường sử dụng cho POST/PUT/PATH).
            - **`path`:** tạo cho người dùng một input để nhập vào giá trị khai báo trong routers, thường là id (VD: GET /api/members/{user_id} thì ở đây sẽ là giá trị {user_id}).
            - **`query`:** bạn sẽ tạo cho người dùng một input nhập vào giá trị theo các field định sẵn để gửi những query request (sử dụng trong methods GET).
            - **`header`:** khai báo những giá trị trong header của request mà bạn cần truyền lên.
        - **`type`:** type request truyền lên.
    - **`@SWG\Response`:** là phần trả về của server. Có thể định nghĩa những HTTP code: 200, 404, 500,... với những mô tả cho từng trường hợp riêng
# 5. Kết Luận
   Trên đây là bài chia sẻ của mình về cách cài đặt và sử dụng Swagger (L5-Swagger) trong Laravel
   - Điểm mạnh:
        - Dễ dàng sử dụng, setting.
        - Tác vụ phân chia rõ ràng.
        - Phần mô tả trong comment tường minh và tương đối sát với file config.
    - Điểm yếu:
        - Do phải đặt tả tương đối nhiều trong comment sẽ làm code bị to ra gây khó chịu trong quá trình dev và đọc code.
        - Nếu quá nhiều sẽ đặt ra câu hỏi là generate như vậy liệu có hơn nhiều so với tự design file config thuần.
 # 6. Tài liệu tham khảo
 - L5-Swagger: https://github.com/DarkaOnLine/L5-Swagger
 - Swagger 2.0: https://swagger.io/docs/specification/2-0/basic-structure/