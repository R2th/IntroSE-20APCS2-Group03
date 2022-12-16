Đối với một dự án có sử dụng API, việc tạo documents cho API là việc vô cùng cần thiết. API documents giúp cho phía front-end có thể hiểu các api ở back-end hoạt động như thế nào và dựa vào đó để code.
Gần đây mình cũng làm việc với một dự án Laravel và cần tạo API documents, nhưng tìm kiếm tài liệu khá khó khăn. Sau khi hoàn thiện thì mình xin chia sẻ lại để cho các bạn khác có một nguồn tham khảo.

## 1. Cài đặt package
Package mình sửa dụng là [Laravel API Documentation Generator](https://github.com/mpociot/laravel-apidoc-generator), một trong số ít các package generate API Document hỗ trợ cho laravel. Package này yêu cầu Laravel >= 5.7 và PHP >= 7.2
Để cài đặt vào dự án Laravel, chạy lệnh composer:
```
composer require --dev mpociot/laravel-apidoc-generator
```
Sau đó, chạy lệnh sau để publish config vào thư mục config/
```
php artisan vendor:publish --provider="Mpociot\ApiDoc\ApiDocGeneratorServiceProvider" --tag=apidoc-config
```
File config của package sẽ nằm ở `/config/apidoc.php`

Lúc này, bạn có thể chạy lệnh sau để tạo API docs
```
php artisan apidoc:generate
```
API docs mặc định sẽ nằm ở `http://app_url/docs`
API docs bạn vừa tạo ở trên là API docs dạng cơ bản. Để có thể tùy biến và viết thêm chi tiết cho API docs, hãy đọc tiếp bên dưới.

## 2. Config
Như đã nói ở trên, file config của package sẽ nằm ở `/config/apidoc.php`. Sau đây là chi tiết về các cài đặt ở file này:
* **type**: Kiểu document, nếu chọn là static thì document sẽ là một file HTML nằm ở *public/docs*, nếu chọn laravel thì document sẽ là một file blade nằm trong *resources/views/apidoc*.
*  **route**: để cố định là laravel
*  **base_url**: base URL của API, mặc định là `config('app.url')`
*  **postman**: cài đặt post man collection
    *  **enabled**: mặc định là true. sẽ tạo ra postman collection
    *  **name**: trên của collection
    *  **description**: mô tả cho collection
* **strategies**: các service để parse API docs
* **logo**: logo của trang API docs, kích thước chuẩn là 230 x 52

    ```
    'logo' => resource_path('images') . '/logo.png',
    ```

* **default_group**: group mặc định của các endpoint không có thuộc tính `@group`
* **example_languages**: ngôn ngữ lập trình cho các ví dụ
* **fractal**: tìm hiểu thêm tại: https://fractal.thephpleague.com
* **routes**: gồm nhiều nhóm để cài đặt cho API documents
    ```
    'routes' => [
        [
            // Những endpoint match điều kiện này sẽ được áp dụng các config bên dưới
            'match' => [
                // match theo domain
                'domains' => [
                    '*',
                    // 'domain1.*',
                ],
                // match theo prefix
                'prefixes' => [
                    '*',
                    // 'users/*',
                ],
            ],
            // include những endpoint không match các điều kiện trên
            'include' => [
                // 'users.index', 'healthcheck*'
            ],
            // exclude những endpoint match các điều kiện trên
            'exclude' => [
                // 'users.create', 'admin.*'
            ],
            // thiết lập các quy tắc được áp dụng vào API Docs
            'apply' => [
                // Header
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json',
                    // 'Authorization' => 'Bearer {token}',
                    // 'Api-Version' => 'v2',
                ],
                // Nếu API Docs không có ví dụ của response trả về, package sẽ tự generate response theo config bên dưới
                'response_calls' => [
                    // method được áp dụng. '*' cho tất cả hoặc để trống để tắt tính năng này
                    'methods' => ['GET'],
                    // Các biến được set cho API call
                    'config' => [
                        'app.env' => 'documentation',
                        'app.debug' => false,
                        // 'service.key' => 'value',
                    ],
                    // Cookie được gửi theo API call
                    'cookies' => [
                        // 'name' => 'value'
                    ],
                    // query parameter được gửi theo API call.
                    'queryParams' => [
                        // 'key' => 'value',
                    ],
                    // body parameter được gửi theo API call.
                    'bodyParams' => [
                        // 'key' => 'value',
                    ],
                ],
            ],
        ],
    ],
    ```
    
## 3. Viết API document
Để bắt đầu viết API document, bạn vào method mà route cần viết document trỏ tới. Và viết theo mẫu như trong hình.
![](https://images.viblo.asia/9da6b624-2b50-4157-baed-519d8baaa7a8.png)
Dòng đầu tiên là tên của API, các dòng tiếp theo là các tham số truyền vào hoặc response, ...

### Các tham số cơ bản của API document
Các tham số của API document bắt đầu bằng @
* group: các endpoint cùng tên group sẽ được gộp vào một nhóm
* urlParam: tham số truyền qua url parameter
* queryParam: tham số truyền qua query string
* bodyParam: tham số truyền qua post body
* response gồm 2 phần:
    * phần số ngay sau response là HTTP status
    * phần tiếp theo là response body.

## 4. Kết quả
Sau khi hoàn tất viết document cho các API, bạn chỉ cần chạy lại lệnh ```php artisan apidoc:generate```, sau đó tải lại trang docs để xem kết quả. Bên dưới là hình minh họa.
![](https://images.viblo.asia/177186b0-8862-4ebb-98aa-aa8bec82c6be.png)

Các bạn có thể tham khảo thêm ở đây: https://laravel-apidoc-generator.readthedocs.io/en/latest/index.html