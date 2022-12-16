# Webhook là gì
## Giới thiệu 
   Webhook, hay còn gọi là  “Reverse APIs”, là một service được phát triển trên một số ứng dụng, cung cấp những thông tin, sự kiện xảy ra trên chính ứng dụng đó, nhằm cho phép developer có thể sử dụng để tích hợp vào ứng dụng mà họ đang phát triển. 
   Ở mô hình webhook, ta có Client-side và Serverside. Server-side là ứng dụng có hỗ trợ webhook, nơi mà chúng ta muốn nhận đc phản hồi mỗi khi sự kiện xảy ra. Client-side là ứng dụng mà chúng ta phát triển và muốn sử dụng thông tin được trả về từ những sự kiện đó. 
![](https://images.viblo.asia/00822649-41ac-4678-b061-2b1ce47638a5.png)


## Cách hoạt động
##### Đọc qua phần giới thiệu cảm thấy hơi khó hiểu nhỉ =))) Thôi thì đưa ra ví dụ cho dễ hiểu hơn nè:

   Ví dụ bạn đang muốn tạo một app có thể nhận được thông tin mỗi khi có thông báo, tin nhắn trên facebook. Vậy làm sao để ứng dụng của bạn có thể biết được mỗi khi có tin nhắn hay noti từ facebook? Theo cách thông thường thì bạn phải liên tục gửi request thăm dò đến facebook? Như vậy thì thật phiền phức và làm "tốn sức" của chính cái app mà bạn đang phát triển.
Vậy nếu sử dụng webhook thì sao? Lúc này server-side chính là facebook, và app của bạn sẽ là client-side. Thay vì liên tục hỏi hay bật channel để "lắng nghe", facebook sẽ trả về thông tin của noti, tin nhắn cho app của bạn. Đỡ tốn "calo" nhỉ? 

   Webhook được tạo ra nhằm mục đích hỗ trợ các dev trong việc khai thác thông tin từ sự kiện đã xảy ra trên server-side, tự động trả những thông tin đó về cho app của bạn, thế nên bạn phải cung cấp URL để bắt những thông tin đó. Vậy nên, một webhook chỉ đơn giản là một end-point URL được ứng dụng client-side cung cấp cho ứng dụng server-side.
*Có một lưu ý là webhook chỉ nhận những đường dẫn có giao thức http hoặc https.*
    Sau đây là sơ đồ so sánh webhook và polling :eyes:
![](https://images.viblo.asia/b41b9191-4489-46b8-ae34-5e066df3566d.png)

## Khi nào nên sử dụng Webhook :thinking:
   Webhook thường được  sử dụng để cập nhật các event theo thời gian thực một cách tiết kiệm tài nguyên nhất có thể.

   Ngoài ra Webhook còn đường dùng qua API là khi API của bạn không thật sự tốt hoặc thậm chí là không có API. Vì vậy thông qua Webhook, bạn có thể tạo một giải pháp cung cấp dữ liệu mà ứng dụng của bạn cần để hoạt động ngay một cách trơn tru nhất.

   Có một lưu ý nhỏ thế này, tuy Webhook khá linh động nhưng nếu nó không được sử dụng thường xuyên để call dữ liệu (vì nó chỉ hoạt động khi có dữ liệu hoặc event mới trên hệ thống), nên dẫn đến khả năng sẽ không thể lấy được các bản cập nhật mới nhất nếu hệ thống dừng hoạt động vì một lý do bất chợt nào đó.
# Webhook của Chatwork
   Chatwork là một ứng dụng chat được sử dụng trong công việc. Để hỗ trợ cho việc phát triển những ứng dụng muốn bắt event của họ, chatwork cũng có webhook riêng.
Hỗ trợ những function thông báo real time event như gửi message, edit, mention đến mình ở ChatRoom đang tham gia (GroupChat, DirectChat, MyChat) tới Webhook URL mà user đã setting.

### Request
   Thông báo event từ ChatWork Webhook sẽ được tiến hành dựa vào request HTTPS POST tới Webhook URL(URL bạn muốn bắt event từ chatwork) cần được setting ở[ màn hình quản lý Webhook](https://www.chatwork.com/service/packages/chatwork/subpackages/api/request.php) của Chatwork

Body request là JSON object có các mục bên dưới

|Field Name |	Type	| Required |	Description |
| -------- | -------- | -------- | -------- | 
| webhook_setting_id	| String	| ◯	| Setting ID của Webhook thực hiện thông báo event |
| webhook_event_type |	String	| ◯ |	Các loại Webhook Event Object |
| webhook_event_time	| Value |	◯	| Thời gian event được ghi lại trên hệ thống ChatWork Webhook (epoch seconds) |
|webhook_event	JSON | Object |	◯	 |Webhook Event Object tương thích với webhook_event_type |

VD khi chatwork của bạn(id là 00000) nhận được tin nhắn từ user id là 11111, từ room chat 22222,  thì request body bạn nhận được sẽ có dạng
```
{
    "webhook_setting_id": "12345",
    "webhook_event_type": "mention_to_me",
    "webhook_event_time": 1498028130,
    "webhook_event":{
        "from_account_id": 11111,
        "to_account_id": 00000
        "room_id": 22222,
        "message_id": "33333
        "body": "[To:00000] Giới thiệu về webhook-by TaiPA " 
        "send_time": 1498028125,
        "update_time": 0
    }
}
```

Từ đó bạn có thể tách data ra và xử lí sao cho phù hợp với bài toán bạn muốn giải ha! :kissing_heart:
### Response

Luôn trả về Status code 200 ở HTTP Request.
Dù HTTPS Request được thông báo từ ChatWork Webhook thất bại thì cũng không tiến hành gửi lại.
Size tối đa của response body là 512 bytes. Vượt quá giới hạn này sẽ bị lỗi.
Cần trả lời nội trong 10 giây ở HTTPS Request. Trường hợp vượt quá thì kết nối HTTPS sẽ bị ngắt và được xem như là error.
Gía trị 10 giây có thể sẽ thay đổi.
Tùy vào nội dung xử lý, nếu khó đoán chính xác thời gian trả lời thì nên xem xét phương pháp xử lý không đồng bộ thông qua Message queue.

### Một số event type cơ bản
Tất nhiên mỗi server đều có nhiều loại event khác nhau, và ứng mỗi loại event (mà chatwork có hỗ trợ webhook) thì sẽ dạng như:

message_updated: Bất cứ tin nhắn nào có mention đến bạn được update

mention_to_me: Bất cứ tin nhắn nào có mention đến bạn

message_created: Bất cứ tin nhắn nào đc tạo ra trong chat room có mặt bạn
# Áp dụng tích hợp Simsimi vào chatbot của chatwork để mua vui cho bà con :hatched_chick:
Tới đây thì bài đã hơi dài, hơn nữa mình cũng đang nghiên cứu để tích hợp sao cho ngon nghẻ luôn nên hẹn mọi người trong phần tới nhé. Gút pai!

À, giới thiệu sơ qua Simsimi là một ứng dụng nhắn tin với một con gà chatbot có sử dụng trí tuệ nhân tạo, con gà này rất vui tính và đôi khi cũng rất láo =))))) Theo mình biết thì Simsimi ở trên AppStore hoặc CH Play đều có nhé, các bạn có thể down về chửi nhau để giải stress, cũng hiệu quả lắm =))