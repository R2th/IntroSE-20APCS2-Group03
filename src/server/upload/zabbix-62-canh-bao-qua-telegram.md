Bài trước mình có hướng dẩn các bạn cài đặt [zabbix server](https://viblo.asia/p/giam-sat-may-chu-va-thong-bao-khi-may-chu-gap-su-co-chua-bao-gio-kho-voi-zabbix-BQyJK3abJMe)

Ở phần cảnh báo của Zabbix mình thích nhất là cảnh báo qua Telegram vì nhanh và bảo mật

## Thiết lập Telegram

1. Đăng ký Bot Telegram mới: Gửi "**/NewBot**" tới **@BotFather** và làm theo hướng dẫn. Mã thông báo được cung cấp bởi **@botfather** trong bước cuối cùng sẽ là cần thiết để định cấu hình **Zabbix Webhook**.

![image.png](https://images.viblo.asia/46fb93cf-6452-4b3a-94a0-4d6ef9178a7c.png)

2. Nếu bạn muốn gửi thông báo cá nhân, bạn cần lấy ID trò chuyện của người dùng mà bot nên gửi tin nhắn.

![image.png](https://images.viblo.asia/edc5dc3c-1e40-4287-af90-629c7bed207e.png)

Yêu cầu người dùng gửi "/start" cho bot, được tạo ở bước 1. Nếu bạn bỏ qua bước này, Bot Telegram sẽ không thể gửi tin nhắn cho người dùng.

![image.png](https://images.viblo.asia/1c762f47-31d6-4c37-994d-50147010f638.png)

## Thiết lập Zabbix

1. Trong phần "Administration > Media types", nhập media_telegram.yaml. 
2. Định cấu hình loại phương tiện được thêm vào: Sao chép và dán mã thông báo bot telegram của bạn vào trường "Telegramtoken".

![image.png](https://images.viblo.asia/5cc3c0c2-c6d8-4c4d-8e20-107dc3d26571.png)

Trong tùy chọn tham số **Parsemode** được yêu cầu theo tài liệu của Telegram. Đọc tài liệu API BOT Telegram để tìm hiểu cách định dạng thông báo : [Markdown](https://core.telegram.org/bots/api#markdown-style) / [HTML](https://core.telegram.org/bots/api#html-style) / [MarkDownv2](https://core.telegram.org/bots/api#markdownv2-style).

Lưu ý: Trong trường hợp này, các hành động liên quan đến Telegram của bạn phải được tách ra khỏi các hành động thông báo khác (ví dụ: SMS), nếu không bạn có thể nhận được thông báo văn bản đơn giản với thẻ Raw Markdown/HTML.

Sau khi config xong ta và phần test để test congfig đã ăn chưa bằng id của nhóm hoặc ID cá nhân

![image.png](https://images.viblo.asia/6cc9aebe-e93c-4d87-8114-08f23e12463d.png)

![image.png](https://images.viblo.asia/f7009de6-f711-4327-a166-e2f64782521f.png)

Nếu bạn đã quên gửi '/start' đến bot từ Telegram, bạn sẽ gặp lỗi sau:

![image.png](https://images.viblo.asia/b113c9a7-f38c-49dd-a7fd-30288d6b6d28.png)

3. Để nhận thông báo trong Telegram, bạn cần tạo người dùng Zabbix và thêm phương tiện với loại Telegram. Trong trường "Sent to" Nhập ID người dùng Telegram ID hoặc ID nhóm thu được trong quá trình thiết lập Telegram.

![image.png](https://images.viblo.asia/50a94837-6758-4d9f-b5be-d610a6158ac0.png)


Sau khi sự cố thì sẽ thông báo qua telegram 

![image.png](https://images.viblo.asia/ccc48e68-71d1-4307-9db0-de8f251624d4.png)

Bạn có thể tham khảo chi tiết qua : https://www.zabbix.com/integrations/telegram