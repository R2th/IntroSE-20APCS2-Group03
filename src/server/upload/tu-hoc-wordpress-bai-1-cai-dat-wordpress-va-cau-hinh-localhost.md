Wordpress là một CMS (Content Management System - Hệ thống quản trị nội dung) rất phổ biến của ngôn ngữ PHP. Với Wordpress, một người hoàn toàn không biết về code cũng có thể tạo được một trang web giao diện đẹp xịn sò và chuyên nghiệp.  

Wordpress có thể giúp chúng ta tạo ra đủ thứ trang web đối với đủ loại ngành nghề và nhu cầu sử dụng: Web doanh nghiệp, e-Commerce Web (thương mại điện tử), blogs, web du lịch, chứng khoán, diễn đàn, thậm chí cả mạng xã hội (nếu chúng ta có đủ kĩ năng).  

Chúng ta sẽ thử cùng nhau cài đặt và sử dụng Wordpress từ Nothing đến lúc tạo ra một trang web nhé.. :grinning: 

## Lựa chọn Wordpress
Nếu bạn search từ khoá "Wordpress" trên Google, bạn sẽ tìm thấy 2 trang web về Wordpress là [wordpress.com](https://wordpress.com/) và [wordpress.org](https://wordpress.org/).  

Vậy ta chọn cái nào để cài đặt wordpress đây? com hay org?  

Bạn có thể tham khảo so sánh giữa 2 loại hình Wordpress [tại đây](https://www.wpbeginner.com/beginners-guide/self-hosted-wordpress-org-vs-free-wordpress-com-infograph/).  

Nếu bạn là người dùng chỉ muốn tạo 1 Blog đơn giản, không cần tuỳ chỉnh nhiều về giao diện các thứ thì wordpress.com là đủ cho bạn rồi. Còn nếu bạn muốn tạo một trang web doanh nghiệp, ít tốn chi phí và muốn tuỳ chỉnh giao diện theo ý mình thì hãy chọn wordpress.org - "The real Wordpress".  :sunglasses::sunglasses::sunglasses:

![](https://images.viblo.asia/11b713c5-639a-4260-899e-1ae2bd8dc535.jpg)

## Cài đặt Wordpress
Bạn vào [trang download của wordpress.ord](https://wordpress.org/download/) để download bộ cài đặt của Wordpress về và giải nén, sẽ thấy thư mục **wordpress**. Cứ tạm để đó, chúng ta sẽ quay lại với nó sau.  

Tiếp theo chúng ta download XAMPP về máy. Đây là một bộ bao gồm nhiều phần mềm như Apache, PHP, MySQL, FTP Server, Mail Server và các công cụ như phpMyAdmin, giúp biến PC của chúng ta thành Web Server và có thể quản lý data của website. Tóm lại là XAMPP giúp bạn chứa Website của mình và cung cấp công cụ để bạn quản lý Website.  

Ngoài XAMPP thì bạn cũng có thể dùng LAMPP, WAMPP, MAMPP gì cũng được (khác nhau chữ cái đầu là ứng với các hệ điều hành, LAMPP: L là dành cho Linux, WAMPP: W là dành cho Windows, MAMPP: M là dành cho Mac OS X). Mình chọn XAMPP vì nó dùng được cho bất kì hệ điều hành nào (X tức là X-OS, OS nào em nó cũng tương thích :innocent:).  

Download XAMPP [tại đây](https://www.apachefriends.org/download.html) nhé các bạn. Download xong thì cứ giải nén rồi Next mải miết đến khi Finish thì thôi. Tuy nhiên nhớ bỏ Check ở ô "Learn more about Bitnami for XAMPP" nhé.  

![](https://images.viblo.asia/841e6243-cfc0-43be-ad34-4ba1072da625.png)  

Nếu trong quá trình cài đặt mà Windows Security Alert báo là đã block feature của App là "Apache HTTP Server" thì bạn cứ click vào nút "Allow access" nhé.  

Sau khi cài đặt xong thì XAMPP Control Panel sẽ được hiển thị như sau.  

![](https://images.viblo.asia/4c117700-4b8d-4d9a-bd46-2162a7edd15b.png)  

Lúc này bạn cần edit một tí để có thể Start được 2 thứ quan trọng nhất của XAMPP là Apache và MySql.  

Bạn vào phần Config của Apache.  

![](https://images.viblo.asia/ae16f877-69ac-45a9-8427-7cc33bfb6282.png)

Tìm dòng `Listen 80` và chỉnh thành `Listen 8080` là được. Giờ bạn có thể bấm nút Start của Apache và MySql rồi.  ![](https://images.viblo.asia/fccac11e-f268-40dd-bb6b-220e8e3d8536.png)

## Cài đặt Database và Setup First Site
Bạn hãy copy thư mục wordpress lúc nãy vào thư mục `C:\xampp\htdocs\`.  

Tiếp theo chúng ta cài đặt database. Bạn mở trình duyệt web lên, vào địa chỉ http://localhost:8080/phpmyadmin sẽ thấy trang quản lý database. 

Bạn bấm nút **New** để tạo mới database, nhập database name và chọn encode tuỳ ý (mình thường dùng **utf8_unicode_ci**), rồi bấm **Create** là xong.![](https://images.viblo.asia/56ce88a2-02a7-4c2e-b5d0-69707e5572f2.png)  

Lúc này chúng ta có 1 database với các thông tin như sau:  
* Database Host: **localhost**
* Database user: **root**
* Database password: trống
* Database name: database name mà bạn vừa nhập (ví dụ mình đã nhập wordpress)  

Giờ bạn lại mở 1 tab trình duyệt web mới, vào địa chỉ http://localhost:8080/wordpress để cài đặt lần đầu cho trang quản trị website của chúng ta, sẽ thấy trang chọn ngôn ngữ. Hãy chọn **English** và bấm **Continue**. 

![](https://images.viblo.asia/cad8b8b8-f32a-439b-a4f7-1363f012a840.jpg)  

Tiếp theo chúng ta sẽ thấy 1 trang chỉ hiển thị thông báo rằng chúng ta cần nhập các thông tin như Host, user, password, database name để kết nối với database. Chúng ta bấm vào nút **Let's go**. Kế đến sẽ tới trang để nhập vào các thông tin vừa nêu. Bạn nhập thông tin Database Name bạn đã nhập lúc nãy, User Name là **root**, Password bỏ trống, Database Host là **localhost**, Table Prefix bạn có thể để trống hoặc thích chọn prefix gì tuỳ ý. Sau đó bấm Submit.  

![](https://images.viblo.asia/68b4d986-d7c3-47e8-a87b-1c7dffbe8bc0.jpg)  

Trang kế tiếp bạn bấm **Run the install**.  

Ở bước kế tiếp, các bạn sẽ cần phải thiết lập các thông tin quan trọng cho website như Tên của website, tên tài khoản admin cùng mật khẩu, email…Nhập xong hãy ấn nút Install WordPress.

![](https://images.viblo.asia/f0e799d0-dbba-423b-8145-118a9fcccbc9.png)  

Xong rồi đấy. Lúc này sẽ hiện ra trang Success, và bạn bấm vào nút Login, với tài khoản admin mật khẩu bạn vừa nhập, bạn Login xong sẽ chuyển tới màn hình Dashboard.  

![](https://images.viblo.asia/05769a4a-cda8-4c79-ae2b-810da96218ee.png)  

Thế là xong. Giờ bạn đã sẵn sàng để vọc vạch Wordpress rồi đấy.  

## Tạm kết
Trên đây là các bước cài đặt wordpress vào PC, lần tới chúng ta sẽ cùng nhau thử vọc vạch cái Dashboard này để tạo ra một trang web nho nhỏ nhé.  
***
Link tham khảo:  
- https://wordpress.org/support/article/how-to-install-wordpress/
- https://www.wpbeginner.com/beginners-guide/self-hosted-wordpress-org-vs-free-wordpress-com-infograph/
- https://themeisle.com/blog/install-xampp-and-wordpress-locally/?sscid=81k4_i386e