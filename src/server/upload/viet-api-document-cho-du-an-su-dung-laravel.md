Xin chào mọi người.
Hiện tại mình đang phát triển 1 dự án kết hợp Laravel API và reactjs và việc để  dễ dàng phối hợp giữa 2 team frontend và backend  và cần tài liệu dự án để sau này dễ dàng bảo trì, phát triển hoặc bàn giao dự án cho đội phát triển tiếp theo nên dự án có yêu cầu viết document cho API, sau 1 thơi gian tìm hiểu và áp dụng thì mình xin phép chia sẻ một số kiến thức với mọi người.
Về viết document cho laravel API thì mình sử dụng packet [Laravel API Documentation Generator ](https://github.com/mpociot/laravel-apidoc-generator)

# 1 . Giới thiêu package và cài đặt 
 Laravel API Documentation Generator là package generate API Document hỗ trợ cho laravel. Packege này hiện có gần 2500star  và hơn 400 lượt fork và vẫn đang được phát triên. Package này yêu cầu Laravel >= 5.7 và PHP >= 7.2
Để cài đặt vào dự án Laravel, chạy lệnh composer:
## Cài đặt

**Chạy lệnh để cài đặt thư viện** <br>
`composer require --dev mpociot/laravel-apidoc-generator`<br>
**Xuất bản tệp cấu hình bằng cách chạy lệnh:<br>**
`php artisan vendor:publish --provider="Mpociot\ApiDoc\ApiDocGeneratorServiceProvider" --tag=apidoc-config`<br>
File config của package sẽ nằm ở /config/apidoc.php<br>
**Chạy lệnh sau để tạo API docs** <br>
`php artisan apidoc:generate` <br>
Như vậy là chúng ta vừa tạo API docs mặc định để có thể tùy biến và viết thêm chi tiết cho API docs chúng ta sẽ chỉnh sửa như sau
## Cấu hình
File config của package sẽ nằm ở /config/apidoc.php. Giải thích về config này như sau :<br>
**type:** Kiểu document, nếu chọn là static thì document sẽ là một file HTML nằm ở public/docs, nếu chọn laravel thì document sẽ là một file blade nằm trong resources/views/apidoc.<br>
**route:** để cố định là laravel<br>
**base_url:** base URL của API, mặc định là config('app.url')<br>
**postman:** cài đặt post man collection<br>
**enabled:** mặc định là true. sẽ tạo ra postman collection<br>
**name:** trên của collection<br>
**description:** mô tả cho collection<br>
**strategies:** các service để parse API docs<br>
**logo:** logo của trang API docs, kích thước chuẩn là 230 x 52<br>
**default_group:** group mặc định của các endpoint không có thuộc tính @group<br>
**example_languages:** ngôn ngữ lập trình cho các ví dụ<br>
**fractal:** tìm hiểu thêm tại: https://fractal.thephpleague.com<br>
**routes:** gồm nhiều nhóm để cài đặt cho API documents<br>
``` php
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
##  Viết Document API 
Để viết API document, bạn vào method trong controller mà route cần viết document trỏ tới. Và viết bên trên method đó như phần dưới mình viết document cho method index của trang list user:
```php 
 /**
     * api/users
     *
     * This api to call list user.
     * param search name, email
     *
     * Example:
     * http://localhost:8001/api/users?search%5Bname%5D=thinh&search%5Bemail%5D=nguyen
     *
     */
    public function index(Request $request)
    {
        $searchParams = $request->search;
        $perPage = config('paginate.perPage');
        $users = $this->userRepository->getAllAndSearch($perPage, $searchParams);

        return $users;
    }
```
Dòng đầu tiên là tên của API . Ở đây là api/users <br>
Các dòng tiếp theo là mô tả param, response,message...
## Kết quả
Sau khi cấu hình và viết API thì chúng ta chạy lệnh: <br>
`$ php artisan apidoc:generate`
và sau đó vào lại trang http://localhost:8001/docs/index.html để xem thành quả:
![](https://images.viblo.asia/2dcc8187-9175-490d-ac0e-ab9264c38eed.png) <br>
<3 Cảm ơn mọi người, có góp ý gì về bài viết vui lòng comment bên dưới nhé.