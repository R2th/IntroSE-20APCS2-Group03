Trong thời gian vừa rồi trong dự án mình cần sử dụng font tùy chọn ở các trang như 500.html, 404.html,... tùy đã dưa font tùy chọn vào trong thư mục `vendor/assets/fonts/` của Rails app nhưng vẫn không thể nhận được font tùy chọn ở các trang trên. Sau khi điều tra cho thấy rằng các trang lỗi được chỉ định bởi nginx lấy response luôn file ở thự mục public mà không thông qua Rails app cho nên font không được phục vụ. Thông thường Rails sẽ thực hiện [precompile](https://guides.rubyonrails.org/asset_pipeline.html#in-production) các assets khi deploy lên production và tên file sẽ nối với fingerprinting eg. `application-4dd5b109ee3439da54f5bdfd78a80473.css`. Bài toán đặt ra ở đây là làm sao để các font tùy chọn phục vụ cho các trang html do nginx chỉ định?
### Nginx phục vụ các file tĩnh như thế nào?
Trước tiên chúng ta cần tìm hiểu sơ qua cách mà [nginx phục vụ các file tĩnh](https://docs.nginx.com/nginx/admin-guide/web-server/serving-static-content/) .
Dưới này là cấu trúc trong Rails app chứa các trang lỗi 
```
public
├── 404.html
├── 422.html
├── 500.html
```

Trong config của nginx
```
# /etc/nginx/sites-enabled/default
server {
    ...
    error_page 404 /404.html;
    location = /404.html {
        root /usr/local/rails_apps/current/public;
    }
    ...
}
```

 Với config trên khi nhập URL trên trình duyệt `www.example.com/404.html` response trả về sẽ là một trang html tĩnh được chỉ định ở trên server là `/usr/local/rails_apps/current/public/404.html`.
 Hãy check tiếp trong file html khi cần dùng font tùy chọn
 ```
 # public/404.html
 <style>
   @font-face {
          font-family: SourceHanSansJP;
          src: url("/fonts/ABC.otf");
    }
    ...
</style>
 ```
 Khi đó ở mục console của trình duyệt khi inspect element sẽ hiển thị lỗi sau
 ![](https://images.viblo.asia/fd0f3314-7e4b-4adf-8992-6aaec5039e18.png)
 Để khắc phục lỗi này sẽ trình bay phần tiếp theo
 ### Config bên Rails app
 Tạo một thư mục `fonts` dưới `public/fonts`
 ```
 public
├── 404.html
├── fonts
│   └── ABC.otf
 ```
 Trong file 404.html vẫn giữ nguyễn khai báo font
### Cập nhật Nginx config file để phục vụ file cần dùng
Ở đây cần làm 2 việc đó là check mime types và config cho phép phục vụ file tĩnh với định dạng file.
#### Mime type
Để cho nginx có thể hiểu được request header `Content-type` phải check `cat /etc/nginx/mime.types` nhưng trong bài toán này file yêu cầu là `.otf` do [config mặc định của nginx](https://www.nginx.com/resources/wiki/start/topics/examples/full/) không có nên phải thêm vào để mở rộng.
Hãy thêm như dưới bằng `vi /etc/nginx/mime.types`
```
types {
    ...
    font/otf                              otf;
}
```
#### Static files
Thực hiện thêm config cho file `vi /etc/nginx/sites-enabled/default`
```
server {
    ...
    location ~* \.otf$ {
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods GET;
    }
    ...
}
```
Ở đây mình cho thêm `add_header Access-Control-Allow-Methods GET;` để chặn các request ngoài `GET` vì mục đích chỉ cho phép get về không được update hay xóa bằng methods khác.

Cuối cùng cần khởi động lại nginx để nó nhận config mới bằng cmd `sudo systemctl restart nginx`.

#### Testing
Để biết lỗi đã khác phục có thể check bằng 2 cách:

- Truy cập vào trang lỗi `404.html` quan sát các vùng được quanh đỏ

![](https://images.viblo.asia/04f7710c-929e-41d5-86e5-8b64fd8efa7e.png)

- Truy cập vào url đường link `example.com/fonts/ABC.otf` của font đã đặt vào trong thư mục `public/fonts`sau đó font tải về thành công.

![](https://images.viblo.asia/b75322aa-15ba-41dc-87e2-46f58bf01c85.png)

#### Kết luận
Hỳ vọng bài viết này có thể giúp bạn giải quyết vấn đề khi bạn gặp lỗi tượng tự.
Cảm ơn các bạn đã đọc bài viết này. :D

#### References
- [Serving Static Content](https://docs.nginx.com/nginx/admin-guide/web-server/serving-static-content/)
- [Nginx Full Example Configuration](https://www.nginx.com/resources/wiki/start/topics/examples/full/)
- [CORS on Nginx](https://enable-cors.org/server_nginx.html)
- [Rails The Asset Pipeline](https://guides.rubyonrails.org/asset_pipeline.html#in-production)