Ở [bài trước](https://viblo.asia/p/tao-chatbot-don-gian-trong-laravel-voi-botman-E375zwNdKGW), mình đã hướng dẫn các bạn tạo 1 chat bot đơn giản trong Laravel với BotMan studio. Ở bài này mình sẽ hướng dẫn các bạn kết nối chatbot với Facebook Messenger của 1 trang facebook.
# Cài đặt driver
Cách tạo cài đặt và tạo project mình đã hướng dẩn ở bài trước bạn có thể xem lại [tại đây](https://viblo.asia/p/tao-chatbot-don-gian-trong-laravel-voi-botman-E375zwNdKGW).

Sau khi tạo xong project, mở terminal và chạy lệnh sau để cài đặt driver facebook.
```
php artisan botman:install-driver facebook
```
Kiểm tra danh sách driver đã cài đặt bằng câu lệnh.
```
php artisan botman:list-drivers
```
![](https://images.viblo.asia/58a83643-d5ab-4246-add7-edc74e6c2ac3.png)
# Thiết lập ứng dụng Facebook
Trước khi bắt đầu, bạn sẽ cần tạo một vài thứ sau.

**Tạo trang facebook**

Trang Facebook sẽ được dùng làm danh tính cho bot của bạn. Khi mọi người trò chuyện với ứng dụng của bạn, họ sẽ nhìn thấy tên Trang và ảnh đại diện của Trang. Để tạo một Trang mới, hãy truy cập https://www.facebook.com/pages/create.

**Tạo ứng dụng Facebook**

Ứng dụng Facebook chứa các cài đặt cho bot Messenger của bạn, bao gồm cả mã truy cập. Để tạo một ứng dụng mới, hãy truy cập [bảng điều khiển ứng dụng](https://developers.facebook.com/apps).

**URL Webhook**

URL webhook chính là url  khi chạy app laravel bạn tạo ở trên. Các hành động diễn ra trong cuộc trò chuyện với bot của bạn, chẳng hạn như các tin nhắn mới được gửi dưới dạng sự kiện đến webhook. 

Để triển khai một webhook trực tiếp có thể nhận các sự kiện webhook từ Messenger platform, webhook của bạn phải được lưu trữ trên máy chủ HTTP công khai phù hợp có những thành phần sau:
* Hỗ trợ HTTPS
* Một chứng chỉ SSL hợp lệ
* Một cổng mở chấp nhận các yêu cầu GET và POST

Khi chạy app laravel ở local thì nó ko hỗ trợ https nên chúng ta phải deploy app laravel lên các host hổ trợ https như heroku, ... như vậy khá là bất tiện khi test.
Nếu các bạn đang sử dụng linux thì có thể sử dụng ngrok để tạo URL HTTPS công khai cho ứng dụng local của bạn.

Truy cập vào https://dashboard.ngrok.com và làm theo hướng dẩn để tải ngrok về và giải nén.

Mở terminal trong folder chứa file ngrok vừa được giải nén và chạy lệnh
```
./ngrok http 8000
```
với 8000 là port đang chạy project laravel.
![](https://images.viblo.asia/7893d7ea-3c5f-4718-b28e-75b864f47345.png)
### Các bước thiết lập
**1 . Thêm Messenger platform vào ứng dụng Facebook của bạn**

* Truy cập vào bảng điều khiển của ứng dụng facebook bạn vừa tạo.
* Ở thanh bên phải của bảng điều khiển ứng dụng nhấn vào 'SẢN PHẨM'.
* Chọn Messenger và nhấn vào thiết lập.

**2. Cấu hình webhook cho ứng dụng của bạn**

* Trong phần 'Webhooks' của bảng cài đặt Messenger, hãy nhấp vào nút 'Thiết lập Webhooks'.
* Trong trường 'URL gọi lại', hãy nhập URL công khai cho webhook của bạn là url khi chạy ngrok ở trên `https://36f3ab52.ngrok.io/botchat`.
* Trong trường 'Mã xác minh', hãy nhập mã xác minh cho webhook. Ở đây mình đặt là `demo-chatbot`, sau đó mở file .env và thêm vào config `FACEBOOK_VERIFICATION=demo-chatbot`
* Trong 'Trường đăng ký', chọn messages và messaging_postbacks để bắt đầu. Bạn có thể xem chi tiết các sự kiện [tại đây](https://developers.facebook.com/docs/messenger-platform/webhook#setup).
* Nhấp vào nút 'Xác minh và lưu'.

Messenger platform sẽ gửi một yêu cầu GET với mã xác minh mà bạn cung cấp tới webhook. Nếu webhook của bạn hợp lệ và được thiết lập chính xác để phản hồi yêu cầu xác minh, cài đặt webhook của bạn sẽ được lưu.

**3. Đăng ký ứng dụng của bạn với Trang Facebook**

* Trong phần 'Tạo mã' của bảng cài đặt Messenger, hãy nhấp vào menu thả xuống 'Chọn một Trang' và chọn Trang Facebook mà bạn muốn đăng ký ứng dụng này. Đây là Trang mà bạn muốn webhook nhận sự kiện khi mọi người trên Messenger trò chuyện với Trang.
* Sao chép mã hiển thị trong trường 'Mã truy cập Trang' và thêm vào file .env của Laravel app `FACEBOOK_TOKEN=<Mã truy cập Trang>` 
* Trong phần 'Webhook' của bảng cài đặt Messenger, hãy nhấp vào menu thả xuống 'Chọn một Trang' và chọn cùng một Trang Facebook mà bạn đã tạo mã truy cập Trang. Thao tác này sẽ đăng ký ứng dụng của bạn để nhận sự kiện webhook cho Trang.
* Nhấp vào nút 'Đăng ký' bên cạnh menu thả xuống.

Bây giờ, Messenger platform có thể gửi các sự kiện webhook mà bạn đã đăng ký cho Trang đã chọn đến webhook (app laravel chatbot) của bạn.


-----


Bấy giờ chúng ta có thể gửi message cho page để xem chatbot hoạt động hay không. 
![](https://images.viblo.asia/dad820ed-6276-45c3-b384-bc0e569f0539.gif)
> Phần này chỉ hướng dẩn các bạn cài đặt chatbot của mình kết nối mới facebook messager. Còn nếu muốn phát triển chatbot tốt hơn thì các bạn nên tìm hiểu các ngôn ngữ phân tích và xữ lý ngôn ngữ tự nhiên. Các bạn có thể tìm hiểu [tại đây](https://botman.io/2.0/nlp)


-----
> Tài liệu tham khảo:
> 
> https://botman.io/2.0/driver-facebook-messenger
> 
> https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start