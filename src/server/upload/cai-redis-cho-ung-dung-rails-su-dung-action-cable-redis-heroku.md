Thông thường, một ứng dụng sau khi được phát triển xong. Các developer thường muốn deploy lên môi trường production để xem thành quả và có 1 cái địa chỉ để share cho mọi người hoặc truy cấ từ máy khác trước khi mua 1 con VPS và domain xịn. Đa phần sẽ lựa chọn heroku bởi nó miễn phí ở 1 mức độ phù hợp với nhu cầu đó và cách deploy cũng khá dễ dàng.

Nếu các bạn có sử dụng **ActionCable** trong rails, khi các bạn deploy lên heruku như cách thông thường. Các bạn sẽ nhận thấy các phần liên quan đến realtime mà bạn đã sử dụng ActionCable (Rails) của app (Websocket) sẽ không hoạt động. Lý do ở đây là Rails sử dụng cơ chế Pub/Sub của Redis xử lý realtime, vì heroku của bạn chưa có cài đặt và config redis nên tất nhiên nó không hoạt động được rồi. 

Để ý Logs hiển thi trên Terminal sẽ thấy thông báo lỗi dạng như sau

`Error Connecting to Redis on localhost:6379 ( Errno::ECONNREFUSED) (Redis::CannotConnectError)`

Bài viết này cũng dựa vào nhu cầu, khó khăn mà 1 số bạn gặp phải.
![](https://images.viblo.asia/03d8c739-6497-48f9-8fde-1d48bc80dbd8.png)

## Các bước để bật Redis trên heroku

B1. Truy câp vào link resources để thêm các addon cho app của bạn trên herkoku. https://elements.heroku.com/addons 
B2: Tìm đến Redis to Go. Rồi `install Redis to go `
B3: Ở mục `App to provision` to chọn tên app của bạn. Xong thì bấm `Provision add-on `

![](https://images.viblo.asia/c8638d27-6fe0-458a-a232-3c5ddcb9215d.png)

Tiếp đến lấy thông tin về Redis của bạn để cấu hình cho App. Trên teminal gõ `heroku config`.

(Hoặc vào phần quản lý app trên heroku của bạn, click vào Addon Redis To Go mà bạn đã cài đặt). Các bạn sẽ nhận được 1 biến môi trường như sau

`REDISTOGO_URL: redis://redistogo:328xxxxxxxxxxxxxd2@dory.redistogo.com:11403/`

## Config redistogo ở môi trường production

Trong project rails, các bạn thay đổi file `config/cable.yml` ở môi trường production như mẫu bên dưới.

```
development:
  adapter: async

test:
  adapter: async

production: &production
  :url:  redis://redistogo:328xxxxxxxxxxxxxd2@dory.redistogo.com:11403/
  :host: dory.redistogo.com
  :port: 11403
  :inline: true
  :timeout: 1
```

**Sau đó nhớ git add và commit, push lên lại.**

Như vậy là bạn đã cài đặt thành công Redis cho app của bạn. Ứng dụng Realtime của bạn đã hoạt động tốt rồi đó. Hi vọng bài viết này sẽ giúp ích cho các bạn mới tiếp xúc với Rails cũng như lần đầu deploy ứng dụng lên Heroku. 

Nếu các bạn bắt gặp các lỗi liên quan, có thể tham khảo bài viết "**Khắc phục lỗi thường gặp khi deploy Rails app lên heroku**" trước đây của mình https://viblo.asia/p/khac-phuc-loi-thuong-gap-khi-deploy-rails-app-len-heroku-bJzKmGzEl9N hoặc đóng góp và chia sẻ thêm để mình bổ sung cho bài viết hoàn thiện hơn.