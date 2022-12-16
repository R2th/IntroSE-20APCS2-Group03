# 1. HTTP 413 request entity too large
# when?
Đã bao giờ bạn thử tải lên 1 file hoặc 1 request rất lớn lên server chưa?
Nếu phía backend không có validate cho dung lượng gửi lên request, hẳn bạn sẽ nhận được lỗi 413 nginx "**request entity is too large for nginx to handle**".

# why?
Lí do xảy ra lỗi đó là bởi vì dung lượng của các dữ liệu gửi lên quá lớn, lớn hơn so với dung lượng tối đa được config trên nginx server. Các máy chủ web thường giữ giới hạn về kích thước tối đa của những request có thể được gửi đến chúng. Điều này được xử lý bằng tham số client_max_body_size. Theo những [tài liệu về nginx](https://nginx.org/en/docs/http/ngx_http_core_module.html#client_max_body_size), giá trị mặc định của **client_body_max_size** là 1 MiB.

# how to solve?
Để xử lý trường hợp lỗi như trên, ta cần thay đổi giá trị **client_body_max_size** trong config nginx. Các thao tác thực hiện như sau:
Chạy dòng lệnh sau để chỉnh sửa file editnginx.conf:
```
vi /etc/nginx/nginx.conf
```
Sau đó, thêm dòng sau vào đầu cửa http, server hoặc location context để sửa file. Sau đó lưu và đóng file lại:
```
client_max_body_size 10M;
```
Restart nginx sử dụng dòng lệnh sau:
```
sudo service nginx restart
```
Như vậy, kích thước tối đa của request được phép gửi lên đã được thay đổi thông qua việc cấu hình nginx.

Lưu ý rằng nếu bạn định cấu hình  "client client_body_max_size" lên 1 giá trị quá lớn, thì bạn sẽ đặt máy chủ của mình vào cùng một kịch bản như năm 2013, khi Django cho phép người dùng sử dụng mật khẩu rất dài. Điều đó có nghĩa là để Django thực hiện mã hóa mật khẩu (thay vì máy chủ nơi nó được lưu trữ). Điều này rất tốn kém và như bạn có thể đoán, sự tính toán dẫn đến một cuộc tấn công từ chối dịch vụ chống lại toàn bộ authentication framework của Django.

# 2. HTTP 414 request-URI too large
# when?
Cũng tương tự như 413 nginx "**request entity is too large for nginx to handle**", khi tải lên 1 file hoặc 1 request rất lớn lên server mà không validate dữ liệu nhập vào, bạn có thể gặp lỗi "**414 Request-URI Too Large**"
"HTTP 414 request-URI too large" chỉ ra rằng URI mà client yêu cầu lớn hơn lượng server có thể đáp ứng.

# why?
Khi chạy ứng dụng dưới local, mọi thứ dường như hoạt động tốt. Nhưng sau đó khi deploy code trên phiên bản Amazon EC2, Nginx bắt đầu thông báo lỗi "414 Request-URI Too Large".

Giải thích về điều này thì nguyên nhân có thể xảy ra nhất là do web server ở local mà ta đang sử dụng (có thể là Thin hoặc Webrick hoặc Unicorn) theo mặc định chấp nhận tất cả các yêu cầu request lớn. Nhưng, web server ở local (Nginx) thường mặc định là tối đa 4kb hoặc 8kb.

 Theo mặc định, kích thước bộ đệm bằng 8K byte. Khi một request vượt quá kích thước của một bộ đệm sẽ gây lỗi 414 (URI yêu cầu quá lớn) . 

# how to solved?
Lỗi này cũng có thể được xử lý theo cách tương tự như lỗi HTTP 413. Để xử lý, chúng ta phải sửa đổi tham số "**large_client_header_buffers**" trong cấu hình máy chủ. Bằng cách này, bạn có thể xử lý các lỗi liên quan đến kích thước tối đa của request payload hoặc URI request. 

Theo [document nginx](http://nginx.org/en/docs/http/ngx_http_core_module.html#large_client_header_buffers), giá trị mặc định của "**large_client_header_buffers**" là 8KB. Ta có thể tăng header size lên 16k. **large_client_header_buffers** có thể đã tồn tại. Nếu có, chỉ cần chỉnh sửa nó.

Trường hợp có nhiều phiên bản nginx có thể gây ra xung đột, và đó là lí do mà large_client_header_buffers không  hoạt động. Sau khi kill hết các nginx, khởi động lại các nginx qua các bước sau:
Đầu tiên, truy cập vào nginx.conf. Tìm ở trong: /etc/nginx/nginx.conf.

Sau đó, thêm dòng sau vào máy chủ hoặc phần http và https của file hoặc chỉnh sửa nếu nó đã có:
```
large_client_header_buffers 4 16k
```

Sau khi hoàn tất bước trên, hãy chắc chắn là bạn đã lưu file config, rồi khởi động lại nginx.

Một vài cách để khởi động lại nginx:

    service nginx restart
    nginx -s stop then nginx
    /usr/sbin/nginx -c /etc/nginx/nginx.conf

Everything started working after that.

Lưu ý rằng: thường thì buffer từ 4-8k thì perfomance sẽ tốt hơn từ 8-16 vì server sẽ phải đọc header lớn hơn. Tuy nhiên, nginx xử lý những vấn đề này khá tốt, nếu cần thiết tăng buffer thì vẫn oke. 

Khi lỗi 414 xảy ra vì URI quá dài, tức là khi URL quá dài. Mà chỉ có những method GET mới làm cho URL quá dài. ==> Có một cách khác để khắc phục lỗi 414 đó là nếu có thể thì ta không dùng method GET nữa, mà bằng cách nào đó submit form bằng method POST. Khi đó, không truyền các params lên URL => URL sẽ không bị "too long" => không bị lỗi 414 nữa.

Trên đây là một số điều mình đã tìm hiểu về lỗi 413/414 request-uri too large errors nginx, mong nhận được những góp ý của bạn đọc để nội dung được hoàn chỉnh hơn !

# Tham khảo
nginx.org/r/large_client_header_buffers

http://gbanis.com/blog/howto-troubleshoot-nginx-error-uri-too-large

https://medium.com/aviabird/413-414-request-url-entity-too-large-error-nginx-b6dcece6f5dd

https://stackoverflow.com/questions/23732147/configuring-nginx-for-large-uris/23757115

https://stackoverflow.com/questions/1067334/how-to-set-the-allowed-url-length-for-a-nginx-request-error-code-414-uri-too