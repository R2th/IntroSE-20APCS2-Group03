## Giới thiệu

AJAX là viết tắt của Asynchronous Javascript and XML. Đây là một kỹ thuật trong Javascript, được dùng để cập nhật lại dữ liệu, giao diện một phần trên trang web mà không cần tải lại toàn bộ trang.   

Đây là sự kết hợp của:

* Một object XMLHttpRequest được xây dựng trong trình duyệt (để request data từ web server).
* Javascript và HTML DOM (để hiển thị data hoặc lấy data để gửi lên server).                                     

> AJAX có thể sử dụng XML, JSON hoặc văn bản thuần túy để vận chuyển dữ liệu.  

Nó cho phép các trang web cập nhật bất đồng bộ bằng cách trao đổi data với web server đằng sau hậu trường. Nghĩa là nó có thể load lại và thay đổi 1 phần của trang web mà không phải tải lại toàn bộ trang.

## AJAX hoạt động như thế nào?

![](https://images.viblo.asia/83fc6eef-17b8-43e8-a47d-45d6831d323b.gif)

* Một sự kiện xảy ra trong web page (khi web đã load xong, và một button được nhấn)
* Một XMLHttpRequest object được tạo bởi Javascript
* XMLHttpRequest object gửi một request đến web server
* Server xử lý request (yêu cầu)
* Server gửi response (phản hồi) về trang web
* Response được đọc và xử lý bởi Javascript
* Update nội dung trang.

Bài viết này đến đây là hết, cảm ơn mọi người đã theo dõi! 

## Tài liệu tham khảo

https://www.w3schools.com/js/js_ajax_intro.asp

https://gaacode.github.io/blog/2019/ajax-introduction/