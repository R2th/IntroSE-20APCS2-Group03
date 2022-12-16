Nếu bạn là một lập trình viên php thì chắc hẳn không còn xa lạ với XAMPP, WAMPP ... rồi nhỉ. Thế nhưng các bạn đã rơi vào trường hợp phải cấu hình nhiều version php cho mỗi dự án tương ứng chưa nhỉ.  Và topic hôm nay mình sẽ trình bày các cấu hình nhiều version PHP trên XAMPP.
Có khá nhiều bài hướng dẫn trên **stack overflow**  về cách làm tuy nhiên nếu các bạn lười đọc Tiếng Anh hoặc đã thử qua nhưng vẫn chưa được thì hi vọng topic này có thể giúp các bạn giải quyết vấn đề. 
# 1. Vấn đề
> Vừa qua. mình có gặp  trường hợp đó là 2 project đang làm cần sử dụng 2 version PHP khác nhau ( một cái cần dùng php 7.2 , một cái lại dùng php >=7.3). Tuy nhiên lúc cài XAMPP thì version php hiện tại trên máy đang mặc định là 7.2. Thế là khi chạy source yêu cầu php >=7.3 thì mình đã gặp lỗi bên dưới

![image.png](https://images.viblo.asia/a362706a-aff2-4dfb-ba08-aadc60526399.png)

![image.png](https://images.viblo.asia/96c370fb-949b-4c06-bc92-f435acb2256d.png)

# 2. Hướng giải quyết
Sau khi lùng sục cả chân trời góc bể, dạo chơi khắp stack overflow thì cuối cùng cũng tìm được
câu trả lời khá chi tiết và dễ hiểu, mình xin trích dẫn câu trả lời đang đứng top sang tiếng Việt cho các bạn tiện tham khảo:

> **Để sử dụng nhiều phiên bản php chỉ với một phiên bản xampp duy nhất, chúng ta có hai lựa chọn:**
> 1. Cấu hình cho mỗi project một phiên bản  php nhất định.
> 2. Cấu hình từng phiên bản php trên một port riêng biệt.


**Sau khi đã áp dụng cách đầu tiên thành công, mình sẽ hướng dẫn chi tiết các bước ở dưới!**
# 3.Các bước thực hiện
**Bước 1: Tải phiên bản php mà bạn muốn thêm tại php.net**
* Giải nén thư mục php vừa tải vào trong xampp, cùng cấp với thư mục php hiện có.Bởi vì dự án của mình cần version `php >= 7.3` nên mình sẽ download `php 8.1.8`

    **Lưu ý:** Chỉ download phiên bản NTS (Non Thread Safe) bởi phiên bản Thread safe sẽ không có file **php-cgi.exe**
    
![image.png](https://images.viblo.asia/19dbfc73-e6da-4c94-a361-9437a09b540f.png)


**Bước 2:  Cấu hình file php.ini trong thư mục php vừa tải:**

* Vào trong thư mục php vừa tải, coppy file `php.ini-development` và đổi tên thành `php.ini`

* Mở file `php.ini` vừa đổi tên bằng một editor bất kỳ ( notepad, notepad++ ... )

* Tiếp theo, hãy ấn tổ hợp phím `Ctrl+F` và tìm kiếm đoạn text sau: `extension_dir = "ext"` và uncomment dòng này bằng cách xóa dấu `;` ở đầu dòng

![image.png](https://images.viblo.asia/ec3d5fe3-5008-47e9-b2f1-137fa9cee359.png)

![image.png](https://images.viblo.asia/8408ca43-d9dd-42f2-b173-adc13b7dfaf3.png)

* Làm tương tự để uncomment cho các dòng dưới đây:
    * `extension=curl`
    * `extension=ftp`
    * `extension=fileinfo`
    * `extension=mysqli`
    * `extension=openssl`
    * `extension=pdo_mysql`
    
![image.png](https://images.viblo.asia/dcc6405a-676c-4d2b-ab72-598ff0625463.png)

**Bước 3: Cấu hình apache**
* Mở file `httpd-xampp.conf`bằng một trong hai cách:
    * **Cách 1**: Vào thư mục xampp đã cài, mở file `httpd-xampp.conf` bằng đường dẫn `tên_ổ_đĩa/xampp/apache/conf/extra/httpd-xampp.conf`
    
        **Ví dụ**: Mình lưu folder xampp tại ổ D thì đường dẫn sẽ là `D:\xampp\apache\conf\extra\httpd-xampp.conf`
    * **Cách 2**: Khởi động xampp, tại màn hình quản lí hãy click vào nút config sẽ hiện ra danh sách các file, hãy ấn chọn vào file `httpd-xampp.conf`. Xem chi tiết trong hình bên dưới
    
    ![image.png](https://images.viblo.asia/73cc3128-fc9b-416e-be7d-404260287c5c.png)

* Tiếp theo, thêm đoạn code sau vào cuối file `httpd-xampp.conf`, sau đó thay **`/php8_1`** và **`"D:/xampp/php8_1/"`** thành tên folder và đường dẫn đến folder **`php`** của bạn
     ```
    ScriptAlias /php8_1 "D:/xampp/php8_1/"
    Action application/x-httpd-php8_1-cgi "/php8_1/php-cgi.exe"
    <Directory "D:/xampp/php8_1">
        AllowOverride None
        Options None
        Require all denied
        <Files "php-cgi.exe">
            Require all granted
        </Files>
        SetEnv PHPRC "D:/xampp/php8_1"
    </Directory>
    ```
   ![image.png](https://images.viblo.asia/26c0fd18-a88d-4539-874b-5256b7cbdfc6.png)

    **Ví dụ:** Nếu tên thư mục **`php`** của bạn  là **`php6_5`** và đường dẫn thư mục là **`"C:/xampp/php6_5/"`** thì đoạn code sẽ là:  
    ```
    ScriptAlias /php6_5 "C:/xampp/php6_5/"
   Action application/x-httpd-php6_5-cgi "/php6_5/php-cgi.exe"
    <Directory "C:/xampp/php6_5">
         AllowOverride None
         Options None
         Require all denied
            <Files "php-cgi.exe">
                Require all granted
            </Files>
            SetEnv PHPRC "C:/xampp/php6_5/"
     </Directory>
    ```
    * Bạn có thể cấu hình nhiều version khác không giới hạn bằng cách lặp lại **bước 1** đến **bước 3**
    
    
**Bước 4:** Cấu hình project để chạy với `version php` tương ứng
* Thêm đoạn code sau vào cuối file `httpd-xampp.conf`, sau đó thay **`D:\xampp\htdocs\vhosts\8-test-version-php`** và **`application/x-httpd-php8_1-cgi`** thành đường dẫn đến project của bạn. Xem hình bên dưới để nắm rõ hơn
     ```
        <Directory "D:\xampp\htdocs\vhosts\8-test-version-php">
        UnsetEnv PHPRC
        <FilesMatch "\.php$">
            php_flag engine off
            SetHandler application/x-httpd-php8_1-cgi
        </FilesMatch>
        </Directory>
     ```
     ![image.png](https://images.viblo.asia/57fef045-65c9-417c-bd8c-2ebe3b327ef8.png)
      
     **Ví dụ:** Nếu project của bạn nằm trong thư mục **`C:\xampp\htdocs\vhosts\8-test-version-php`**  thì đoạn code sẽ như sau:  
     ```
        <Directory "C:\xampp\htdocs\vhosts\8-test-version-php`">
            UnsetEnv PHPRC
            <FilesMatch "\.php$">
                php_flag engine off
                SetHandler application/x-httpd-php6_5-cgi
            </FilesMatch>
        </Directory>
     ```
*   Cuối cùng, khởi động lại xampp và tận hưởng thành quả.
![image.png](https://images.viblo.asia/aebfbd7f-3d16-4d19-846f-ecd89ddb6d61.png)![image.png](https://images.viblo.asia/10eb0f5f-d107-4892-9002-6cfabcf7e869.png)

# 4. Một số lưu ý
* **Mình sẽ liệt kê một số lỗi đã gặp trong quá trình cấu hình để các bạn tham khảo và tránh:**
    * Lỗi **`Access forbidden`** : Lỗi này là do đường dẫn thư mục bị sai. Lúc trước, khi sử dụng wampserver mình có lầm tưởng rằng, khi cấu hình virtualhost thì đường dẫn trỏ đến project nằm ở đâu cũng được. Tuy nhiên, với xampp thì bắt buộc project phải nằm trong thư mục xampp/htdocs.
 >  Nên nhớ, tất cả các project khi chạy xampp cần được bỏ vào trong thư mục xampp/htdocs
           
           
>   Nếu không chỉ định project chạy với version php nào thì mặc định  version php trong biến môi trường (Enviroment Variable) sẽ được chọn

# 5. Nguồn tham khảo
* https://stackoverflow.com/questions/45790160/is-there-way-to-use-two-php-versions-in-xampp
* https://www.youtube.com/watch?v=o-NeHuaaELI