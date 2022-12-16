1. Cách hoạt động(mô hình) của bound service
- ***Bound service*** hoạt động giống như mô hình *client-server*.
- Vậy các bạn sẽ đặt câu hỏi là: "Cái gì đóng vai trò là client và cái nào là server".Câu trả lời là các Activity chính là client, còn bound service của bạn là server.
- Khi 1 activity thiết lập kết nối tới service bằng lệnh binService, thì lúc này activity được coi là 1 client.
- Các bạn cần hiểu đơn giản thế này, cứ khi nào màn hình(Activity) của bạn sử dụng (gọi đến) bound service thì lúc đấy nó được xem là 1 client.
- Bây giờ chúng ta quay lại câu hỏi chính:"**Khi nào 1 bound service bị hủy**".
- Giờ mình sẽ lấy 1 ví dụ đơn giản như thế này:
- Chúng ta có 2 activity 1 và activity 2, cho chúng cùng sử dụng 1 ***bound service***.Thì lúc này, theo như những gì chúng ta đã bàn luận ở trên thì activity 1 và activity 2 sẽ là các client còn bound service là server.Điều này sẽ được biểu diễn trong hình bên dưới
- ![](https://images.viblo.asia/5210d9be-e4a0-430b-8e7f-dd37c47e0678.png)
- Như vậy sẽ có 2 kết nối tới service, nếu 2 sợi dây kết nối này mà bị dứt thì service sẽ tự động bị hủy(sẽ chạy vào *onDestroy*).
Các bạn lại hỏi khi nào thì sợi dây đấy bị đứt.Đó là khi activity(Activity gọi đến bound service) của bạn bị hủy(Vì 1 lý do nào đấy).
2.Tổng kết
Giờ mình tóm tắt lại câu trả lời, khi các client(Activity) không còn kết nối tới service(bound service) thì service sẽ tự động bị hủy.
Như vậy là xong rồi đó, hy vọng bài viết này sẽ giúp ích phần nào cho các bạn trong quá trình tìm hiểu service nhé.
Nếu có bất cứ câu hỏi nào, các bạn để lại comment bên dưới nhé chúng ta sẽ cùng trao đổi.