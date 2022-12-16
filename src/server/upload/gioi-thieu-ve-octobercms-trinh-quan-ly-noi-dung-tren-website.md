# Giới thiệu OctoberCMS

October là một hệ thống quản trị nội dung trên nền tảng web với mục đích khiến công việc phát triển ứng dụng web trở nên đơn giản, thân thiện hơn cho người dùng, được phát triển bằng ngôn ngữ PHP trên nền tảng Framework Laravel nổi tiếng. Là một CMS đa năng mạnh mẽ với cộng đồng lập trình viên xây dựng mạnh mẽ, October cho thấy một viễn tưởng sáng giá cho CMS thay thế WordPress trong thời gian tới. Dựa trên Framework Laravel do đó nó là CMS phổ biến đầu tiền được các lập trình viên quen thuộc Laravel lựa chọn.

![Logo](https://raw.githubusercontent.com/octobercms/october/develop/themes/demo/assets/images/october.png)

October CMS được thiết kế dựa trên MVC pattern và chứa đựng framework Laravel trong đó, điều này khiến cho lập trình viên thoải mái trong quá trình phát triển, source code được tổ chức tốt hơn so với Wordpress.

# Cài đặt và sử dụng OctoberCMS

Chúng ta có thể sử dụng composer để cài đặt OctoberCMS và generate ra base project. Đầu tiên bạn cần chạy command này 
```bash
curl -s https://octobercms.com/api/installer | php
```

Sau đó tiến hành download source code về bằng lệnh 

```
composer create-project october/october myoctober
```

Trong quá trình cài đặt có thể xảy ra lỗi do OctoberCMS require 1 vài extension, bạn cần cài đặt thêm và enable chúng

- PHP version 7.0.8 or higher
- PDO PHP Extension
- cURL PHP Extension
- OpenSSL PHP Extension
- Mbstring PHP Library
- ZipArchive PHP Library
- GD PHP Library

Tiếp theo bạn cần chạy command `october:install` để thực hiện init các cài đặt cơ bản cho CMS
``` bash
$ cd myoctober
$ php artisan october:install  
.====================================================================.
                                                                      
 .d8888b.   .o8888b.   db  .d8888b.  d8888b. d88888b d8888b.  .d888b. 
.8P    Y8. d8P    Y8   88 .8P    Y8. 88  `8D 88'     88  `8D .8P , Y8.
88      88 8P      oooo88 88      88 88oooY' 88oooo  88oobY' 88  |  88
88      88 8b      ~~~~88 88      88 88~~~b. 88~~~~  88`8b   88  |/ 88
`8b    d8' Y8b    d8   88 `8b    d8' 88   8D 88.     88 `88. `8b | d8'
 `Y8888P'   `Y8888P'   YP  `Y8888P'  Y8888P' Y88888P 88   YD  `Y888P' 
                                                                      
`=========================== INSTALLATION ==========================='

 Database type:
  [0] MySQL
  [1] Postgres
  [2] SQLite
  [3] SQL Server
 > 0

 MySQL Host [localhost]:
 > 

 MySQL Port [3306]:
 > 

 Database Name [database]:
 > october

 MySQL Login [root]:
 > 

 MySQL Password []:
 > xxx

Enter a new value, or press ENTER for the default

 First Name [Admin]:
 > 

 Last Name [Person]:
 > 

 Email Address [admin@domain.tld]:
 > 

 Admin Login [admin]:
 > 

 Admin Password [admin]:
 > 

 Is the information correct? (yes/no) [yes]:
 > 

 Application URL [http://localhost]:
 > 

 Configure advanced options? (yes/no) [no]:
 > 

Application key [xxxx] set successfully.
Migrating application and plugins...
Migration table created
System
Migrating: 2013_10_01_000001_Db_Deferred_Bindings
...
October.Demo
- v1.0.1:  First version of Demo
Seeded System 
Seeded Backend 
.=========================================.
                ,@@@@@@@,                  
        ,,,.   ,@@@@@@/@@,  .oo8888o.      
     ,&%%&%&&%,@@@@@/@@@@@@,8888\88/8o     
    ,%&\%&&%&&%,@@@\@@@/@@@88\88888/88'    
    %&&%&%&/%&&%@@\@@/ /@@@88888\88888'    
    %&&%/ %&%%&&@@\ V /@@' `88\8 `/88'     
    `&%\ ` /%&'    |.|        \ '|8'       
        |o|        | |         | |         
        |.|        | |         | |         
`========= INSTALLATION COMPLETE ========='

```

sau khi install xong xuôi, chỉ cần chạy 
```
php artisan serve
```
để tiến hành dev thôi.

OctoberCMS cũng giống các CMS khác đều chia thành hai phần:

- Frontend: Chính là phần website của chúng ta, nơi các thông tin, hình ảnh được đưa lên để mọi người có thể đọc và tương tác với chúng. Để truy cập trang frontend bạn vào http://localhost:8000/

![Trang frontend](https://images.viblo.asia/587b6933-921f-44a6-8073-ea7bd4707b05.png)
- Backend: là vùng quản trị, nơi chúng ta quản lý nội dung (thêm, sửa, xóa). Truy cập backend http://localhost:8000/backend (admin/admin)

![](https://images.viblo.asia/34cdefd0-ea78-4b8f-a52d-ff135e16032b.png)

Cấu trúc thư mục của dự án 
![](https://images.viblo.asia/fa9042de-a228-4987-8cb0-8aca9f285c30.png)


## Các thành phần của Backend

Giao diện bảng điều khiển (dashboard) của OctoberCMS khá đơn giản với trên cùng là thanh menu điều hướng bao gồm:

- Dashboard: Nơi hiển thị các thông tin điều khiển như thông tin tình trạng hệ thống ,  các Widget. 
- CMS: Đây chính là phần lõi tạo ra các trang web mà sẽ hiển thị ở frontend. Phần này sẽ là nơi chúng ta xử lý mọi vấn đề xoay quanh giao diện website.
- Media: Công cụ quản lý các tài nguyên đa phương tiện như hình ảnh, âm thanh, video và các tài nguyên khác.
- Settings: Tại đây chúng ta thiết lập các thông số, thuộc tính cho các thành phần của OctoberCMS.
- Account: Nơi quản lý thông tin tài khoản.

## Theme

Theme định ra các website được hiển thị, các theme của October được xây dựng hoàn toàn dựa theo file-based nên chúng có thể quản lý bằng các VCS, như Git. Theme được đặt bên trong thư mục `/themes`, chúng bao gồm các thành phần :

|  Object | Mô tả |
| -------- | -------- |
| Pages     | Các trang của website     |
| Partials     | Chứa các thành phần nhỏ, được tái sử dụng lại trên HTML như header, navbar, footer,...    |
| Layout     | Chứa thông tin về cách dàn trang     |
| Content files     | text, html hoặc markdown     |
| Asset files     | Chứa css, js, ảnh,...    |

Mỗi theme cho frontend được định nghĩa bên trong 1 thư mục riêng, cấu trúc thư mục bên trong thư mục theme như sau

```
themes/
  website/           <=== Tên theme
    pages/           <=== Pages
      home.htm
    layouts/         <=== Layouts
      default.htm
    partials/        <=== Partials
      sidebar.htm
    content/         <=== Content
      intro.htm
    assets/          <=== Assets
      css/
        my-styles.css
      js/
      images/
```

> Để chọn theme cho frontnend bạn chỉ cần set `activeTheme` trong file `config/csm.php` là tên của thư mục là ok.

Theme là phần hay nhất của OctoberCMS vì cách thực hiện mô đun hóa này giúp cho tạo ra các trang web nhanh chóng do sử dụng lại code hiệu quả. Chúng ta cùng tìm hiểu mô hình này:

![](https://images.viblo.asia/deff138a-10fa-4f14-91e7-74bd30f66768.png)

Đầu tiên trong website chúng ta sẽ có rất nhiều các trang ví dụ: trang chủ, trang bài viết, trang diễn đàn... Các trang này về nội dung là khác nhau nhưng về cấu trúc bố trí (layout) là giống nhau, ví dụ đầu tiên có phần header chứa thanh menu điều hướng, có phần chứa nội dung và phần sidebar chứa các thông tin phụ trợ, phần footer chứa các thông tin cuối trang như thông tin liên hệ.

Trong hệ thống chúng ta có thể tạo ra nhiều layout khác nhau, với mỗi page khi áp dụng một layout cụ thể sẽ có thể hiện khác nhau.

Các layout lại được mô đun hóa thành các partials, contents với việc sử dụng các tài nguyên trong assets như hình ảnh, âm thanh, các file css, javascript.

Components là các thành phần chứa code có thể tạo ra các nội dung theo điều kiện logic, nó tác động và cung cấp dữ liệu cho partials.


Ngoài ra, October còn có nhiều theme được cộng đồng xây dựng, bạn có thể chọn từ đó và sử dụng

![](https://images.viblo.asia/78a27f56-5599-431a-b9a6-1fb70d51285d.png)

rồi active lên là có 1 giao diện được xây dựng hoàn thiện !
[](https://images.viblo.asia/3742c671-1c06-4453-8454-bd5def08ec5b.png)

Giao diện frontend của theme mới active:


![](https://images.viblo.asia/c6f971e8-2573-46cf-8d62-d2b3623d3337.png)