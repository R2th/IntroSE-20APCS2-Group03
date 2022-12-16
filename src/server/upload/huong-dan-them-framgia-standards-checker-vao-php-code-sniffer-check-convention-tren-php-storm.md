* Như các bạn đã biết thì PSR1, PSR2, PEAR,... là các chuẩn coding convention phổ biến hiện nay. Bên cạnh đó, các công ty công nghệ lớn thường sẽ có các chuẩn coding convention riêng cho riêng mình và framgia cũng không ngoại lệ.
* Hôm nay mình sẽ hướng dẫn các bạn thêm Framgia Standards Checker vào PHP Code Sniffer check convention framgia trên PHP Storm
# Cài đặt PHP Code Sniffer
* Giới thiệu qua cho các bạn nào chưa biết thì PHP Code Sniffer (hay còn gọi là phpcs) là 1 công cụ hỗ trợ tự động phát hiện các vi phạm coding convention đã xác định trước, nó giúp đảm bảo mã nguồn của bạn luôn sạch đẹp, dễ đọc và nhất quán.
* PHP_CodeSniffer yêu cầu phiên bản PHP 5.4.0 trở lên .
* Cài đặt với Composer, bạn sử dụng lệnh sau:
    ```
    $ composer global require "squizlabs/php_codesniffer=*"
    ```
*    Hãy chắc chắn là máy bạn có đường dẫn kiểu `~/.composer/vendor/bin/ `  .
*    Đến đây là chúng ta đã cài đặt xong php code sniffer, Để kiểm tra đã cài đặt thành công chưa bạn dùng lệnh:
        ```
        $ phpcs --version
        ```

* Nếu thành công, bạn sẽ nhận được kết quả dạng:

    ```
    PHP_CodeSniffer version 3.4.2 (stable) by Squiz (http://www.squiz.net)
    ```
# Thêm Framgia Standards Checker vào PHP Code Sniffer
* Sau khi cài đặt thành công PHP Code Sniffer, bạn cần thêm chuẩn Framgia.
* Bạn vào thư mục Standards theo đường dẫn `~/.composer/vendor/squizlabs/php_codesniffer/src/Standards`  sau đó mở terminal và chạy lệnh:
    ```
    $ git clone https://github.com/wataridori/framgia-php-codesniffer.git Framgia
    ```
*    Sau đó bạn chạy lệnh sau để kiểm tra chuẩn Framgia đã được thêm vào chưa:
        ```
        $ phpcs -i
        ```

* Nếu thành công thì bạn sẽ thấy tên Framgia trong kết quả trả về:
    ```
    The installed coding standards are Zend, MySource, Squiz, PSR2, PSR12, PSR1, PEAR and Framgia
    ```
*   Tiếp theo bạn `cd` vào thư mục `~/.composer/vendor/squizlabs/php_codesniffer/src/Standards` mở file `~/.bashrc` bằng terminal:
    ```
    $nano ~/.bashrc
    ```
* Sau đó kéo xuống cuối file và thêm dòng dưới và save lại:
    ```
    PATH="~/.composer/vendor/bin":$PATH
    ```
* Và chạy lệnh
    ```
    $ source ~/.bashrc
    ```
* Làm tương tự với file `~/.profile`
    ```
    $ nano ~/.profile
    //Sau đó thêm PATH="~/.composer/vendor/bin":$PATH vào cuối file, lưu lại
    //Chạy lệnh
    $ source ~/.profile
    ```
#     Dùng PHP Code Sniffer check Framgia Standard trực tiếp trên PHPStorm
## Cấu hình
* Để có thể check framgia convention trực tiếp trên PHP Storm với PHP Code Sniffer bạn làm theo các bước sau:
1. Bước 1: Mở PHP Storm => Setting => Languages & Frameworks => PHP => Quality Tools => Code Sniffer, bạn sẽ thấy cửa sổ sau:
![](https://images.viblo.asia/4d8bd66c-06de-429b-9b79-d99a9e8333f5.jpg)
2. Bước 2: Chọn Configurations là Local sau đó click nút có dấu ... bạn sẽ thấy cửa sổ:
![](https://images.viblo.asia/2dbacb5f-f5f5-4740-be3f-719d1ced1a6d.png)
3. Bước 3: Tìm đến đường dẫn `/.composer/vendor/squizlabs/php_codesniffer/bin/`hoặc đường dẫn khác nếu bạn thay đổi vị trí của nó theo ý mình và chọn file phpcs nếu bạn dùng Linux, sau đó chọn nút Validate để kiểm tra kết nối. Nếu nhận được thông báo dưới thì đã kết nối thành công:
 ![](https://images.viblo.asia/6803bb48-6c78-452a-be5f-dd23b31e86e4.png)
4. Bước 4: Lúc này bạn đã kêt nối PHP Storm và PHP Code Sniffer thành công, tiếp theo là bạn sẽ chọn chuẩn coding convention phục vụ việc check. Bạn chọn File => Setting => Editor => Inspection => Quality tools => PHP Code Sniffer validation. Bạn sẽ thấy cửa sổ sau:
![](https://images.viblo.asia/462dd0f1-d4a1-46ff-9786-81dd6d879bda.png)
5. Bước 5: Bạn nhấn refresh ở mục Coding Standard. Đây là danh sách các chuẩn coding convention của phpcs, Bạn chọn Framgia sau đó ấn OK.
## Sử dụng
* Bây giờ bạn có thể bắt đầu code được rồi, nếu sai convention chỗ nào, phpcs sẽ báo lỗi bằng 1 gạch dưới những đoạn code vi phạm, ví dụ:
![](https://images.viblo.asia/c3cab028-c1fd-4429-a5aa-3a1c164df620.png)
* Đoạn code trên mình đặt tên class sai định dạng và ngay lập tức phpcs báo lỗi.
# Kết luận
* Đó là tất cả quy trình từ cài đặt, kết nối tới sử dụng. 
* Nếu có bất kỳ góp ý, phản ảnh về bài viết vui lòng để lại comment để mình kịp thời khắc phục và hoàn thiện bài viết hơn.
* Chúc các bạn cài đặt thành công!
# Tài liệu tham khảo
* https://www.jetbrains.com/help/phpstorm/using-php-code-sniffer.html
* https://github.com/wataridori/framgia-php-codesniffer/tree/master