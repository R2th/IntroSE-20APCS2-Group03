Để đáp ứng nhu cầu phát triển các trang web điện tử thương mại, các blog cá nhân... đã có rất nhiều mã nguồn CMS ra đời, hỗ trợ mạnh mẽ cho việc phát tiển và quản lí web trở nên dể dàng hơn. Một trong số CMS nổi tiếng như Wordpress, Wix, Shopify,...
Hôm nay chúng ta đổi gió một chút tìm hiểu về CMS khác ngoài những CMS nổi tiếng trên. Và mình đã chọn EC-CUBE.

![](https://images.viblo.asia/49b88318-3495-45a8-89ed-33e5644ed7a1.png)


### Bạn biết gì về EC-CUBE?
- EC-CUBE là mã nguồn mở CMS do Nhật Bản phát triển để giải quyết ấn đề về thương mại điện tử. Ở đây là trang chủ của [nó](https://www.ec-cube.net)
- EC-CUBE được viết bằng ngôn ngữ PHP, tài liệu về EC-CUBE còn ít và đa phần là tiếng Nhật
- Hiện tại thì EC-CUBE đã có version 4.0 sau hơn năm năm phát triển.
### Cách sử dụng EC-CUBE
Hiện tại có nhiều repo về EC-CUBE thuộc các version khác nhau, trong đó có 2 account chứa các repo về EC-CUBE, một cái là tiếng Nhật([đây](https://github.com/EC-CUBE)) và một cái tiếng Việt([ở đây](https://github.com/eccubevn)).

Để cho thuận tiện với mn thì mình sẽ sử dụng repo tiếng Việt trong bài chia sẽ này.

#### Cài đặt
##### 1) Setup môi trường
* Máy chủ server: Apache
* PHP version 7.1.3 => < 7.3
* Quản lí package: npm, node js
* Database:
    * Mysql version 5.5.x / 5.6.x / 5.7.x
    * SQLite version 3.x
    * PostgreSQL version 9.2.x / 10.x
* Một số thư viện cho PHP:
    * gsql / mysqli (mà phù hợp với các cơ sở dữ liệu mà bạn muốn sử dụng)
    * Pdo_pgsql / Pdo_mysql / Pdo_sqlite (mà phù hợp với các cơ sở dữ liệu mà bạn muốn sử dụng)
    * PDO
    * Phar
    * mbstring
    * Zlib
    * CTYPE
    * JSON
    * Xml
    * libxml
    * OpenSSL
    * Zip
    * CURL
    * FileInfo
    * Intl

Trong lúc install project nếu thiếu thư viện nào thì hệ thống sẽ bắn lỗi cho mọi người biết và cài đặt thêm nên mn không đặt nặng vấn đề cài đặt môi trường nhé :D.
##### 2) Cài đặt
Như đã nói ở đầu bài mình sẽ dùng [repo tiếng Việt](https://github.com/eccubevn/ec-cube-vn).

* Đầu tiên mn clone [repo tiếng Việt](https://github.com/eccubevn/ec-cube-vn) này về
* Tiếp theo `cd` vào thư mục project vừa clone, vd: `cd ec-cube-vn`
* Chạy `composer install` để cài đặt các package có trong project: Ở bước này nếu như máy bạn thiếu một số thư viện cho PHP thì sẽ bị báo lỗi với các trường hợp như sau:
    * Một số lỗi thiếu thư viện của PHP: thì mình chỉ cần tìm kiếm thư viện và cài đặt đúng version của PHP, vd như máy mình thiếu cURL cho php, và mình dùng php 7.2 thì fix bằng cách chạy lệnh `sudo apt install php7.2-curl` sau đó restart lại apache `sudo server apache2 restart`. Mn làm tương tự cho các package khác.
    * Một số lỗi riêng của hệ thống như `facebook/webdriver 1.6.0 requires ext-curl` thì mn chỉ cần thêm option `--ignore-platform-reqs` vào sau `composer i` là được, `composer i --ignore-platform-reqs`.
   
* Đến đây có 2 phương án cho mọi người chọn để hoàn tất việc cài đặt:
    * Cài đặt bằng command line: `bin/console eccube:install`
 
    * Cài đặt bằng trình duyệt: 
        * Chạy server`bin/console server:run`, truy cập vào server ở link trong terminal, thường thì `http://127.0.0.1:8000` or `http://localhost:8000/`
        * Xuất hiện màn hình như dưới thì bạn đã cài đặt thành công rồi nhé:
        
        ![](https://images.viblo.asia/3d5754b1-2859-4c90-b28f-5e54bdd21c38.png)

        * Nhấn kế tiếp
       
        ![](https://images.viblo.asia/702ae245-b513-4d31-b74a-46b1ee41ddbb.png)

        * Nhấn kế tiếp sau đó các bạn điền thông tin vào như hình bên dưới: các bạn nhớ tên đăng nhập và mật mã của quản trị viên để đăng nhập vào hệ thống quản trị nhé :D, còn ở phần tên thư mục để truy cập là tên của thư mục quản trị, mn đặt gì cũng dk. vd: manage thì url để truy cập vào admin thì sẽ là localhost:8000/manager. Sau đó nhấn kế tiếp
        
        ![](https://images.viblo.asia/55857aca-bc00-43e0-b240-8f380e345e40.png)
        
        * Ở màn hình này mình setup database cho hệ thống: Ở mục database name thì mn phải tạo một db trước rồi điền vào đây, còn user_name, password thì mn điền của mysql :D

        ![](https://images.viblo.asia/899c6d18-e666-4e50-88a8-d5f3df9f64ca.png)
        
         * Đến đây mn nhấn kế tiếp để bắt đầu khởi tạo csdl :D
            ![](https://images.viblo.asia/78d01f89-aa75-4f67-9513-784db0a48541.png)
            
         * Nếu đến dk đây thì mn đã setup thành công rồi nhé :D. Click `Truy cập phần quản trị` để vào site quản trị.
   ![](https://images.viblo.asia/22899b3e-21e0-4f53-9af9-bd35ac604c23.png)
         * Phần quản trị thì có nhiều chức năng đặc trưng của một CMS
        
         ![](https://images.viblo.asia/b3ebc4de-6889-4e77-9949-0a3a808ed0b0.png)
         * Để truy cập vào giao diện của người dùng thì mn truy cập URL: `http://localhost:8000`
      
![](https://images.viblo.asia/e23888af-e4b2-4a80-8deb-3e507694faf2.png)

#### Một số lưu ý khi cài đặt:
- MN nhớ config trong file .env: 
    - `APP_ENV=dev`: chuyển sang môi trường dev thì mới chạy được lệnh `bin/console server:run`
    - `APP_DEBUG=1`: Bật chế độ debug, khi app có lỗi thì nó sẽ thông báo ra màn hình.
- Config sử dụng mysql: mặc định của eccube là sqlite, nên để chuyển sang hệ quản thị CSDL tùy thích thì mình phải config thêm, ở đây mình lấy vd là mysql nhé:
    - Nếu cài đặt bằng trình duyệt thì đã có select option cho mn chọn rồi nên mình nghỉ không có gì khó.
    - Trường hợp cài bằng lệnh `bin/console eccube:install` thì mn chỉ cần update `DATABASE_URL=mysql://user:pass@localhost:port/database_name` trong file `.env` trước khi run lệnh install là được. VD ở máy mình thì ntn `mysql://root:123456@localhost:3306/demo-eccube`
        - `user`: tên tài khoản đăng nhập vào mysql (root)
        -  `pass`: Mật khẩu đăng nhập sql (123456)
        -  `localhost`: Domain thường thì ở local là `localhost` or `127.0.0.1`
        -  `port`: Cổng truy cập vào database(3306)
        -  `database_name`: tên của database bạn vừa tạo cho project của mình
        -  Để hoạt động chính xác thì mn hãy dùng mysql workbench thử connect với các thông số trên xem được ko nhé.

- Một số thông tin truy cập vào site admin sẽ được lưu ở file `config.ini`: 
    ```
    admin_user = 'admin'
    admin_password = 'password'
    ```

#### Chức năng hỗ trợ

* EC-CUBE hỗ trợ khác nhiều chức năng như quản lí sản phẩm, đơn hàng, người dùng... 
* Cài đặt thêm các plugin
* Upload hoặc custom theme
* Còn một số chức năng khác nữa, mn có thời gian thì tìm hiểu sâu hơn nhé.
### Tài liệu tham khảo
* Git repo: 
    * Repo gốc: https://github.com/EC-CUBE
    * Repo tiếng việt: https://github.com/eccubevn/ec-cube-vn
* Doc tiếng việt: http://docs.ec-cube.vn/

### Kết bài

Qua bài viết này mình hy vọng mn có thể biết thêm một CMS mới và cách sử dụng nó. Bài viết chỉ dừng lại ở mức độ cơ bản nên để hiểu sâu và chi tiết hơn thì mn hãy vọc vạch nhiều hơn nhé :D

Happy coding :D :D