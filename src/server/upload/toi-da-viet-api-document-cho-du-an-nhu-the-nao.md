<div align="center">
    
# Lời nói đầu    
</div>
Xin chào các bạn, hiện tại sau khi dự án của mình hoàn thành được phase 1 thì công việc cần thiết bây giờ là phải viết lại tài liệu dự án để sau này dễ dàng bảo trì, phát triển hoặc bàn giao dự án cho đội phát triển tiếp theo. 

Đầu tiên mình nghĩ nó cũng chỉ đơn giản thôi, nhưng mà không. Lúc bắt tay vào làm thì mới thấy nó có nhiều cái phức tạp, và cái hay ho nhất mà mình thu về được đó là việc viết API document. Sau một hồi mình viết document bằng "cơm" thì được anh em khai sáng cho một số Tools hỗ trợ việc viết API document.

Và trong bài viết này, mình xin phép được chia sẻ một công cụ khá hay cũng như sơ qua cách sử dụng `Laravel Api Doc Generator`. Hi vọng rằng bài viết này có thể hỗ trợ cho những bạn "lần đầu làm chuyện ấy" giống như mình.

<div align="center">
    
# Nội dung   
</div>

<div align="center">
    
### Cài đặt và sử dụng
</div>

- Và sau một hồi tìm kiếm ở tận phương trời xa lắm, thì mình phát hiện ra là Laravel cũng có một công cụ hỗ trợ việc viết API Document. 
- Sơ qua 1 chút thông tin trên [github của laravel-apidoc-generator](https://github.com/mpociot/laravel-apidoc-generator):
![](https://images.viblo.asia/7536157c-d19c-43cc-a4a0-a0a8dfe059b9.jpg)

    Như các bạn có thể thấy thì commit mới nhất trên repo này là vào 15/6, tức là nó vẫn đang được phát triển liên tục. 
    
    Còn về số sao mà cộng đồng đánh giá thì rơi vào khoảng 2000 sao, không phải quá cao nhưng cũng là 1 mức đáng ngưỡng mộ đối với một repo opensource mới.
    
    Với những thông tin trên thì bạn đã an tâm để sử dụng tool này chưa nào? Nếu rồi thì chúng ta cùng bắt đầu nhé!

- **Yêu cầu cài đặt**: tối thiểu PHP 7 và Laravel 5.5.
- **Cài đặt**:
    
    Cài đặt bằng composer:
    ```bash
    composer required mpociot/laravel-apidoc-generator
    ```
    
    Khai báo trong service provider trong file `bootstrap/app.php`:
    ```php
    $app->register(\Mpociot\ApiDoc\ApiDocGeneratorServiceProvider::class);
    ```
    
    Tạo file config: sau khi chạy câu lệnh này, trong thư mục `config` của project sẽ xuất hiện file `apidoc.php`
    ```bash
    php artisan vendor:publish --provider="Mpociot\ApiDoc\ApiDocGeneratorServiceProvider" --tag=apidoc-config
    ```
   
- Thử vọc vạch 1 số thứ trong config xem sao?

- Cách thức thực hiện:
    
    Cài đặt các thứ đã xong xuôi hết rồi, giờ thì chạy xem thành quả của mình nào.
    - **B1**: Sinh ra Api Doc:
    ```bash
    php artisan apidoc:generate
    ```
    ![](https://images.viblo.asia/69d67757-b111-4cb8-81ae-ce98011c0b82.jpg)
    
    Sau khi quá trình này được hoàn tất, tài liệu HTML sẽ được ghi vào file: `public\docs\index.html`
    - **B2**: Bật server và kiểm tra kết quả thu được
    
    Tiếp theo, hãy bật server lên với câu lệnh 
    ```
    php artisan serve
    ```
   
    Truy cập địa chỉ `http://localhost:8000/docs/index.html` để xem kết quả thu được nhé
    ![](https://images.viblo.asia/88987c24-da24-4104-9ec3-7e7373f9c337.jpg)
    
    Ở cột ngoài cùng bên trái là list những api được sử dụng trong project mà đã được lấy ra (trừ một số cái bị skip ở bước 1).
    
    Phần còn lại là thông tin chi tiết của API đấy:
        
    - Phương thức: GET/POST/PATCH/PUT/DELETE
    - Route:
    - Example request & example response:
   
<div align="center">
    
### Cấu hình chi tiết
</div>

Có người từng nói "Miếng phô mai có sẵn chỉ có ở trên bẫy chuột". Vì vậy chúng ta không thể dùng ngay như bên trên được (chỉ là demo một chút cho các bạn thôi) mà phải cất công cấu hình một chút cho phù hợp với project và nhu cầu của bản thân!

Giờ thì cùng xem file `config/apidoc.php` có những thông số gì nào?
    
- **output**: đây là thiết lập đường dẫn cho file Document của bạn khi nó sinh ra. File document này được sinh ra là 1 file HTML và có chứa cả CSS, vì vậy hãy sử dụng đường dẫn tuyệt đối cho nó. Nếu bạn không thay đổi gì thì đường dẫn mặc định là **`public/docs`**
- **router**:
- **base_url**: base URL sẽ được sử dụng cho các ví dụ và Postman collection. Giá trị mặc định của base URL được lấy trong **config(`app.url`)**
- **postman**: không chỉ tạo ra một file document thông thường, laravel-apidoc-generator còn hỗ trợ sinh ra Postman Collection (nếu chưa biết về Postman thì bạn có thể tìm hiểu ở [đây](https://viblo.asia/p/postman-tro-thu-dac-luc-khi-lam-viec-voi-api-Az45bnjz5xY) nhé)
    - **enabled**: có sinh ra Postman Collection hay không. Giá trị mặc định ở đây là **`true`**
    - **name**: đặt tên cho collection được xuất ra. Nếu bạn để trống thì sẽ lấy tên mặc định từ `config('app.name')."API"`
    - **description**: mô tả chi tiết cho collection
- **logo**: thay vì sử dụng logo mặc định, bạn có thể tùy chỉnh logo của project của bạn trong file Document. Cũng giống như output, bạn phải sử dụng đường dẫn tuyệt đối đến file logo của bạn. **Chú ý**: ảnh logo nên để kích thước 230 x 52.
    ```php
    'logo' => resource_path('views') . '/api/logo.png'
    ```
- **fractal** (nếu chưa biết đến fractal thì bạn có thể tìm hiểu ở đây [**fractal/transformers**](https://viblo.asia/p/fractal-transformers-trong-laravel-that-de-dang-viet-apis-json-dep-hon-E375zeNdlGW)): 
- **routes**: phần này được lưu trữ dưới dạng mảng các route, mỗi route chứa một số quy định xem routes nào thuộc group nào, áo dụng những quy định nào. Điều này giúp cho chúng ta có thể tuỳ chỉnh những chi tiết cho từng route.
    - **match**: xác định các quy định được sử dụng trong route thuộc một group. Có 3 loại rules được định nghĩa ở đây:
        - **domains**: trong 1 project có thể có 
        - **prefixes**: đây là phần tiền tố cho các route. Kiểu như các route có domain và prefix chỉ định thì sẽ áp dụng các rule chỉ định. Ví dụ như sau:
        ```php:apidoc.php
        <?php
        return [
          'routes' => [
            //những route có tiền tố là users hoặc apps thì sẽ cần xác thực người dùng, sử dungj authorization truyền trong headers
            [ 
              'match' => [
                 'domains' => ['*'],
                 'prefixes' => ['users/*', 'apps/*'],
               ],
               'apply' => [
                 'headers' => [ 'Authorization' => 'Bearer {your-token}']
               ]
            ],
            // còn những route có tiền tố là stats, status thì public và không cần xác thực
            [
              'match' => [
                 'domains' => ['*'],
                 'prefixes' => ['stats/*', 'status/*'],
              ],
            ],
          ],
        ];
        ```
        - **versions**: đây là đánh số phiên bản cho các route. **CHÚ Ý:** phần này chỉ hoạt động nếu bạn sử dụng **Dingo Router**.
    - **apply**: sau khi định nghĩa trong match, trong phần apply sẽ chỉ định những thiết lập được áp dụng cho những routes này khi chạy lệnh `generate`.
        - **headers**: phần header này sẽ được hiển thì trong phần example requests trong tài liệu (cột đen ở phía bên phải màn hình ấy). Headers được khai báo dưới dạng key => value như thế này:
            ```php
            'headers' => [
                'Authorization' => 'Bearer {token}',
                'Api-Version' => 'v2',
            ],
            ```
        - **response_calls**: mặc định, response call sẽ chỉ được sinh ra cho những route có method **GET**, tuy nhiên bạn vẫn có thể tự cấu hình chi tiết. Còn cấu hình cụ thể thế nào thì hãy tìm hiểu [tại đây](https://laravel-apidoc-generator.readthedocs.io/en/latest/documenting.html#generating-responses-automatically) nhé. (đồ ăn sẵn chỉ có ở trên bẫy chuột thôi :D)

<div align="center">
    
# Lời kết  
</div>

Trong bài viết này, mình mới chỉ giới thiệu sơ qua về laravel-apidoc-generator, nếu có thời gian, các bạn hãy vào trang chủ để mò mẫm thêm những thứ hay ho hơn nhé. 

Chúc các bạn thành công và sớm hoàn thành công việc viết document cho dự án của mình!!!!!


<div align="center">
    
# Tài liệu tham khảo 
</div>

- Laravel API Document Generator: https://laravel-apidoc-generator.readthedocs.io/en/latest/
- Fractal Transformers: https://viblo.asia/p/fractal-transformers-trong-laravel-that-de-dang-viet-apis-json-dep-hon-E375zeNdlGW