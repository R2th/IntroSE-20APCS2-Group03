## Giới thiệu
Tiền thân của `Pyrocms` được phát triển dựa trên codeigniter framework với version 2. Sau này `Pyrocms` version 3  được phát triển bởi **ryanthompson** dựa trên nền tảng laravel framework, được liên tục cập nhật khi laravel update phiên bản mới. Phiên bản hiện tại là 3.6.
Sau đây mình xin giới thiệu sơ qua về cách cài đặt, chúng ta dùng vagrant hoặc docker để setup. Mình thì dùng vagrant để cài đặt.

`PyroCMS has a few system requirements:`

* PHP >= 7.0 (5.6.4 for v3.3)
* PDO PHP Extension
* cURL PHP Extension
* SQLite PHP Extension
* OpenSSL PHP Extension
* Mbstring PHP Extension
* Fileinfo PHP Extension
* Tokenizer PHP Extension
* GD Library (>=2.0) OR Imagick PHP extension (>=6.5.7)

## 1. Cài đặt
Dùng composer: `composer create-project pyrocms/pyrocms` hoặc vào [github](https://github.com/pyrocms/pyrocms) để tải source code về. Dùng virtualhost trỏ domain dev vào thư mục `/public/` và chạy domain dev trên trình duyệt, config những tham số database để tiến hành cài đặt. Phía dưới là hình ảnh installing và complete.
![](https://images.viblo.asia/81c96101-8cf7-4e78-91cb-349bb3fd8f98.png)
![](https://images.viblo.asia/c1353f87-7dcb-4bf5-8d3a-0538e77bf2d4.png)
![](https://images.viblo.asia/4aa5fdbb-8420-4f95-b178-3ece3a47b66f.png)
![](https://images.viblo.asia/b8e50625-71a0-499d-b2ce-2e4912d6d8e7.png)
![](https://images.viblo.asia/2fe66ba5-ced1-42d0-a4fe-d9c370d8552c.png)


[Xem youtube](https://www.youtube.com/watch?v=DbMpMyzYDUY)
## 2. Tài liệu tham khảo
- Document pyrocms: https://pyrocms.com/documentation
- Demo CMS: https://demo.pyrocms.com/admin/login
- Join slack channel: https://pyrocms.slack.com
- Videos: https://pyrocms.com/videos