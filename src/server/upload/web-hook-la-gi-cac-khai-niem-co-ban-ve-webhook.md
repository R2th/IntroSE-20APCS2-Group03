# 1. Web hook là gì?
Web hook là một cách cực kỳ hữu ích và tương đối dễ dàng, gọn nhẹ trong việc triển khai các phản ứng sự kiện. Các web hook cung cấp một cơ chế trong đó một ứng dụng server-side có thể thông báo cho một ứng dụng phía client-side khi một sự kiện mới (mà ứng dụng client-side có thể quan tâm) đã xảy ra trên máy chủ.

Webhooks đôi khi còn được gọi là "Reverse APIs". Trong các API, ứng dụng client-side sẽ gọi (tiêu thụ) ứng dụng server-side. Trong khi đó, khi có web hook, phía server-side sẽ gọi web hook (end-point URL được cung cấp bởi ứng dụng client-side), ví dụ: ứng dụng server-side gọi ứng dụng client-side.

Webhooks hoạt động dựa trên khái niệm về phản ứng sự kiện- "event reaction" (đừng gọi cho tôi, tôi sẽ gọi bạn nếu tôi có tin gì mới). Nhờ vậy, ứng dụng client-side sẽ không cần phải liên tục hỏi ứng dụng server-side.

Do đó, thay vì ứng dụng client-side phải liên tục thăm dò ứng dụng server-side để kiểm tra các sự kiện mới, ứng dụng server-side sẽ gọi ứng dụng client-side (bằng cách gọi URL webhook từ client cung cấp) bất cứ khi nào server-side có thông tin gì mới để báo cáo cho client.

### Đây là khái niệm cốt lõi và cơ bản về Webhook.

Do đó, với webhooks, bạn có thể sẽ được nhận push notification khi có sự kiện xảy ra trên máy chủ. Bạn sẽ không cần phải thăm dò API để xác định những sự kiện này đã xảy ra hay chưa nữa. Bạn chỉ có thể đăng ký vào một sự kiện với webhooks. Bạn giờ đây chỉ cần "subscribe" cho 1 sự kiện với Webhook.
![](https://images.viblo.asia/ddd74d91-74a0-4e9f-aaf5-3a63b3cd5f74.png)

### Ví dụ về Webhook ?

Trong các lệnh gọi API, ứng dụng server-side cung cấp cho ứng dụng client-side các end-point URL mà ứng dụng client-side có thể gọi. Do đó, phía server-side có thể hiển thị các API end-point URL tiếp theo cho ứng dụng message loại bảng đơn giản.
 ```php
POST /messages                                	createNewMessage
 
 GET  /messages/{messageId}                     	readMessage
 
 POST /messages/{messageId}/comments            	postComment
 
GET  /messages/{messageId}/comments/{commentsId}   readComment
```

Các URL này được hiển thị bởi ứng dụng client-side.

Do đó, nếu ứng dụng client-side muốn gửi một tin nhắn mới đến server, ứng dụng client-side sẽ phải thực hiện gọi,

`POST /messages`

Tương tự, nếu ứng dụng client-side muốn đọc một bình luận đã được đăng cho một tin nhắn cụ thể trên máy chủ, thì ứng dụng client-side sẽ gọi,

`GET /messages/{messageId}/comments/{commentsId}`

Cần lưu ý là các thông báo, nhận xét được tạo và lưu trữ trên cơ sở dữ liệu máy chủ và đọc từ cơ sở dữ liệu máy chủ, sử dụng API do máy chủ cung cấp (end-point URL).

Trong trường hợp sử dụng Webhooks, ứng dụng client-side sẽ cung cấp cho ứng dụng server-side một URL để gọi và ứng dụng server-side sẽ gọi (tiêu thụ) URL đó, khi một số sự kiện server-side có liên quan đã xảy ra. Vậy nên, một webhook chỉ đơn giản là một end-point URL được ứng dụng client-side cung cấp cho ứng dụng server-side. Một ví dụ đơn giản như sau.

`{"newCommentWebhook" : "https://clientdomain.com/webhook/newcomment" }`

End-point URL phải được ứng dụng client-side chuyển đến ứng dụng server-side trước khi gọi webhook của server-side.

Cứ cho là ứng dụng server-side thông báo cho ứng dụng client-side bất cứ khi nào một bình luận mới cho một message cụ thể được đăng lên. Trong trường hợp này, bất cứ khi nào một bình luận mới được đăng lên cơ sở dữ liệu phía server-side, ứng dụng server-side sẽ (sau khi đăng bình luận lên cơ sở dữ liệu) gọi URL webhook ở trên, để client biết vừa có một bình luận mới. Do đó, với việc sử dụng webhooks, server-side có thể thông báo cho client-side về một sự kiện có liên quan (hay một bình luận mới đã được đăng).

Từ góc độ triển khai, ứng dụng server-side phải thiết kế các API end-point sao cho có các tham số giữ chỗ, qua đó các ứng dụng client-side có thể truyền đến end-point URL webhook. Có thể thực hiện điều này là bởi API "request body" của server-side có một tham số cho các web hook URL.

![](https://images.viblo.asia/00307aca-c786-4a48-be6d-eea0e9b68d10.png)

Thứ hai là ứng dụng server-side nên có một số cơ chế lưu trữ client cung cấp web hook end-point, để server-side có thể gọi khi có yêu cầu.

## Sử dụng webhooks để thông báo so với phân phối payload
Hiện đang diễn ra các cuộc tranh luận về việc liệu có nên chỉ sử dụng webhooks đơn giản như một cơ chế thông báo hay không, hay payload của nó cũng sẽ bao gồm các dữ liệu liên quan. Trong khi có thể truyền payload data trong phần thân của webhook để cải thiện khả năng mở rộng và độ tin cậy, việc giữ cho webhooks nhẹ vẫn là quan trọng. Webhooks mặc dù về mặt kỹ thuật có thể chứa payload, chỉ là một cơ chế gọi lại và chủ yếu là một tín hiệu thể hiện sự thay đổi trạng thái.

Khi nhận được thông báo về thay đổi trạng thái, các lệnh gọi API an toàn và riêng biệt có thể được gọi từ ứng dụng client-side, để nhận payload thực tế. Sự tách biệt này cho phép cải thiện khả năng mở rộng và độ tin cậy của toàn bộ quá trình tích hợp API.

nguồn : #BizFlyCloud