Bài trước mình đã thực hành [làm quen với Rasa 3 và dạy chatbot chào hỏi cơ bản](https://viblo.asia/p/rasa-3-bai-1-lam-quen-rasa-3-tao-chatbot-chao-hoi-don-gian-Ny0VG9ZYJPA).
Tuy nhiên chatbot mà dùng giao diện command line thì nhìn cũng hơi chán nên mình sẽ nhúng Chatbot rasa vào giao diện website.

Vì mục đích bài này chỉ là có một giao diện chat thay thế command line cho đẹp thôi nên mình sẽ làm theo cách đơn giản và nhanh nhất có thể, không đi sâu vào các config, nếu muốn hiểu sâu hơn bạn có thể xem thêm ở [trang tài liệu của Rasa](https://rasa.com/docs/rasa/connectors/your-own-website) nhé.

# Build Websocket Rasa
**Bước 1**: Trong file credentials.yml thêm đoạn code sau:
```
socketio:
  user_message_evt: user_uttered
  bot_message_evt: bot_uttered
  session_persistence: true
```
Rasa có hỗ trợ Authentication cho quá trình truyền nội dung chat nữa nhưng ở bài này mình chưa muốn đi sâu, bạn có thể xem thêm ở trang chính của Rasa mình để link đưới phần "Tài liệu tham khảo".

**Bước 2**: Run Rasa server dùng lệnh sau:
```
rasa run --cors "*"
```
Mặc định Rasa sẽ start server trên http://0.0.0.0:5005
Sau khi chạy lệnh đợi 1 lúc thấy hiện thông báo như hình dưới là đã hoàn thành.

![image.png](https://images.viblo.asia/92c43fc5-c89e-46de-8ccf-ac4249ac29dd.png)

# Nhúng Rasa 
Chèn đoạn code sau vào website của bạn:
```
<div id="rasa-chat-widget" data-websocket-url="http://localhost:5005"></div>
<script src="https://unpkg.com/@rasahq/rasa-chat" type="application/javascript"></script>
```
Thuộc tính **data-websocket-url** điền url Websocket Rasa đã build.

Lý do mình dùng "http://localhost:5005" chứ không phải "http://0.0.0.0:5005" là do khi để http://0.0.0.0:5005 chạy ở máy mình bị báo lỗi "Connection refused" làm cho web không kết nối được với bot rasa để gửi và nhận phản hồi, nên mình phải map host. Nếu bạn dùng "http://0.0.0.0:5005" không lỗi thì cứ dùng nhé.

Thông tin map host của mình như sau:
```
0.0.0.0 localhost
```

Nếu bạn chưa build sẵn một website thì cũng không sao, chỉ cần tạo một file html có nội dung như sau:
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Rasa ChatBot UI</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
</head>
  <body>
    <h1>Rasa ChatBot UI</h1>
    <div id="rasa-chat-widget" data-websocket-url="http://localhost:5005/"></div>
    <script src="https://unpkg.com/@rasahq/rasa-chat" type="application/javascript"></script>

  </body>
</html>
```
Mở file html vừa tạo lên bằng trình duyệt bất kỳ và test chat các câu chào hỏi mình đã huấn luyện cho bot ở bài trước và xem phản hồi.

Kết quả sẽ như hình sau:

![image.png](https://images.viblo.asia/c9426fcf-33ee-4e8f-91ae-a9264c950599.png)

Ngoài website Rasa còn hỗ trợ tích hợp chatbot lên nhiều kênh khác như: Facebook Messenger, Telegram,... mình sẽ cùng tìm hiểu sau nhé.

# Tài liệu tham khảo
https://rasa.com/docs/rasa/connectors/your-own-website