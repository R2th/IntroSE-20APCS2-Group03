# XAMPP là gì?
XAMPP là chương trình tạo web server được ứng dụng trên các hệ điều hành Linux, MacOS, Windows, Cross-platform, Solaris. Ý nghĩa chữ viết tắt XAMPP là gì? XAMPP hoạt động dựa trên sự tích hợp của 5 phần mềm chính là Cross-Platform (X), Apache (A), MariaDB (M), PHP (P) và Perl (P), nên tên gọi XAMPP cũng là viết tắt từ chữ cái đầu của 5 phần mềm này.
Ưu điểm lớn nhất của XAMPP là không phải trả phí bản quyền và sử dụng mã nguồn mở, bên cạnh đó cấu hình của web server này tương đối đơn giản, gọn nhẹ nên được sử dụng ngày càng phổ biến hiện nay.

## Phần mềm được tích hợp với XAMPP là gì?
* Apache 2.4.34
* MariaDB 10.1.34
* PHP 7.2.8
* phpMyAdmin 4.8.2
* OpenSSL 1.1.0h
* XAMPP Control Panel 3.2.2
* Webalizer 2.23-04
* Mercury Mail Transport System 4.63
* FileZilla FTP Server 0.9.41

## XAMPP được dùng làm gì?
Phần mềm XAMPP là một loại ứng dụng phần mềm khá phổ biến và thường hay được các lập trình viên sử dụng để xây dựng và phát triển các dựa án website theo ngôn ngữ PHP. XAMPP được sử dụng cho mục đích nghiên cứu, phát triển website qua Localhost của máy tính cá nhân. XAMPP được ứng dụng trong nhiều lĩnh vực từ học tập đến nâng cấp, thử nghiệm Website của các lập trình viên.
> Localhost là từ ghép của hai chữ “local” và “host“. Local dịch theo nghĩa IT là máy tính của bạn, Host theo nghĩa IT là máy chủ. Vậy localhost nghĩa là một máy chủ được vận hành trên máy tính của bạn.

## Ưu điểm của XAMPP là gì?
### Các ưu điểm của XAMPP bao gồm:

XAMPP có thể chạy được trên tất cả các hệ điều hành: Từ Cross-platform, Window, MacOS và Linux.
XAMPP có cấu hình đơn giản cũng như nhiều chức năng hữu ích cho người dùng. Tiêu biểu gồm: giả lập Server, giả lập Mail Server, hỗ trợ SSL trên Localhost.
XAMPP tích hợp nhiều thành phần với các tính năng:
Apache
PHP (tạo môi trường chạy các tập tin script *.php);
MySql (hệ quản trị dữ liệu mysql);
Thay vì phải cài đặt từng thành phần trên, giờ đây các bạn chỉ cần cài XAMPP là chúng ta có 1 web server hoàn chỉnh.
Mã nguồn mở: Không như Appserv, XAMPP có giao diện quản lý khá tiện lợi. Nhờ đó, người dùng có thể chủ động bật tắt hoặc khởi động lại các dịch vụ máy chủ bất kỳ lúc nào.

### Khuyết điểm của XAMPP là gì?
Tuy nhiên, bởi vì có cấu hình đơn giản nên XAMPP không được hỗ trợ cấu hình Module, cũng không có Version MySQL, do đó, đôi khi sẽ mang đến sự bất tiện cho người dùng. Trong khi WAMP có nhiều tùy chọn hơn vì nó có nhiều phiên bản cho từng thành phần của server như PHP, Apache, MySQL.

Bên cạnh đó, dung lượng của XAMPP cũng tương đối nặng, dung lượng file cài đặt của XAMPP là 141Mb, nặng hơn nhiều so với WAMP chỉ 41Mb.

# Tải và cài đặt XAMPP
Bạn vào trang chủ XAMPP https://www.apachefriends.org/index.html chọn bản cài đặt cho OS nhé !
![](https://images.viblo.asia/9476c587-615c-4674-8ece-b7f218ed4929.png)

Sau đó chúng ta setup như bình thường 
![](https://images.viblo.asia/7b9ea2ea-8f51-4c85-94c8-8fe5ea4c2f36.png)

![](https://images.viblo.asia/3664b46a-c96b-4bc1-962a-35d8d7f4a471.png)

Để cấu hình Port, t chọn MAMP -> Preferences -> Ports
![](https://images.viblo.asia/2505e70a-dd71-4fe5-98db-0e1c3416b5c8.png)

Thường chúng ta sẽ để Port là 8080 nhưng mình để 80 cho ngắn :))

# Tổ chức thư mục
![](https://images.viblo.asia/2ac9aa06-fbe9-4c4a-a69e-3cb251579494.png)

* Trong thư mục XAMPP này, bạn cần chú ý một số thư mục sau:
* etc (alias): alias của thư mục /etc chứa các tập tin cấu hình của XAMPP như httpd.conf, php.ini,…
* htdocs (alias): alias của thư mục /htdocs nơi bạn chứa các ứng dụng web của mình
* logs (alias): alias của thư mục /logs. Khi có lỗi xảy ra, đọc log sẽ giúp bạn phần nào giải quyết được vấn đề ít nhiều.
* XAMPP Control: công cụ giúp bạn điều khiển Apache, MySql và FTP

## Trỏ thư mục ngoài htdocs
Cài đặt web trực tiếp trên thư mục htdocs có thể dẫn đến việc, chẳng may bạn xoá mất MAMPP bằng phần mềm thứ ba thì toàn bộ web chứa trong MAMPP Application sẽ mất. B nên trỏ lại đường dẫn web về thư mục khác:
Bước 1: MAMP -> Preferences -> Web Server -> Select
![](https://images.viblo.asia/631606cc-089c-4ee0-84bf-d5f5110254b8.png)

Bước 2: Chọn thư mục bạn muốn lưu file web, m đang trỏ hiện tại về WordPress folder
![](https://images.viblo.asia/07ac2622-c253-40f1-a207-7005dd2bce2b.png)

Bước 3: Chọn Select để lưu thế là xong :D
# Kết luận
Mình đã giúp các bạn hiểu cơ bản về XAMPP và cách cài đặt, bài tiếp theo sẽ hướng dẫn các bạn tạo web bán hàng với wordpress + XAMPP phục vụ gia đình hay mục đích cá nhân !

Nguồn tham khảo:
https://www.apachefriends.org/index.html
https://wiki.matbao.net/xampp-la-gi-cach-cai-dat-va-su-dung-xampp-tren-windows-va-linux/