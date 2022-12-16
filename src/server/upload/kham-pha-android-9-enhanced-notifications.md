![](https://images.viblo.asia/7ed2e616-f298-4871-81a1-8a1751a57747.png)

# GIỚI THIỆU
* Android 9 đã ra mắt cách đây không lâu, có rất nhiều các nâng cấp mới đã ổn định để chúng ta có thể sử dụng trong ứng dụng của mình. Một nâng cấp khá đáng giá nằm ở Notification là cho phép chúng ta tạo thông báo theo ngữ cảnh một cách chi tiết hơn. Trong bài viết này chúng ta sẽ tìm hiểu chi tiết về sự nâng cấp này nhé. GO!

# NỘI DUNG
* Sự nâng cấp trong Notification này thì tập trung vào việc hiển thị các messages bên trong nội dung của Notification. Đầu tiên chúng ta sẽ xem xét phần hiển thị của tác giả khi thông báo các message này.
* Trước đây, để hiển thị các messages bên trong thông báo chúng sẽ dử dụng func *addMesage()* - method này cho phép truyền các thông tin của người gửi thông báo như tên, văn bản đại diện cho người mà tin nhắn trong thông báo đến từ đâu. Tuy nhiên hàm này đã được thay thế bằng một hàn mới - sự thay thế này cho phép chúng ta chuyền một instance của lớp Person. Lớp này sẽ được sử dụng để liên kết đoạn message đó với một người gửi cụ thể và sử dụng những chi tiết đó để thể hiện ngữ cảnh bên trong nội dung của Notification. Điều này cho phép chúng ta cung cấp nội dung hữu ích hơn cho các thông báo của mình, cải thiện trải nghiệm người dùng.
* Và bây giờ, chúng ta sẽ build một notification (đoạn build 1 notification này vẫn giống các api trước) : 

```
val notificationBuilder = NotificationCompat.Builder(this, ...)
        .setSmallIcon(...)
        .setContentTitle(...)
        .setContentText(...)
        .setPriority(...)
```

*  Để tham chiếu ở tạm đó, giờ dúng ta sẽ tạo một instance của lớp Person mà mình đã đề cập ở trên. Chúng ta sẽ sử dụng *Buider()* của lớp này đển tạo một Person istance đơn giản như sau:

```
val sender = Person.Builder()
        .setName("Joe Birch") //tên người gửi
        .build()
```

Và cuối cùng bạn sẽ sử dụng method *notify()* như cách bạn làm trước đây :

```
NotificationManagerCompat.from(this)
        .notify(..., notificationBuilder.build())
```

Khi notification này đã được hiển thị, bạn sẽ thấy rằng đoạn message của chúng ta đã được hiển thị, kèm theo đó là tên người gửi và icon mặc định của Person instance : 

![](https://images.viblo.asia/6cfd461d-1de2-45ae-b1a2-1dec13e19f9f.png)

* Lớp Person cũng có nhiều các properties khác mà chúng ta có thể áp dụng chúng cho app của mình như :

    *   **setImportant():**  xác định xem đây có phải là người quan trọng hay không, truyền vào một boolean param. Điều này có thể nếu đó là chủ sở hữu của thiết bị thường xuyên tương tác nên chỉ cần set nếu không có URI provider.
    *    **setKey():** set một key định danh cho Person instance này. Nó sẽ sử dụng nếu hiển thị tên của người gửi không được xác định rõ ràng - như một tên rút gọn.
    * **setUri():** một đại diện chuỗi của cho phép trỏ tới đường dẫn địa chỉ trong danh bạn nếu uri được truyền vào tồn tại. Nếu uri được truyền vào không tồn tại, method này sẽ bị bỏ qua.
    *  **setBot():** truyền vào 1 boolean để xác định là đây là một Person instance là Robot hay là một người.

Phía trên là những nâng cấp của người gửi, bây giờ chúng ta sẽ đến với phần nội dung message
* Một chức năng mới được nhắc đến ở đây là hỗ trợ nội tuyến trong thông báo - để làm được điều này, chúng ta chỉ cần sử dụng method *setData()* trên thể hiện thông báo và cung cấp URI của hình ảnh được sử dụng.

```
val message = Notification.MessagingStyle.Message(message, 
        time, sender)
        .setData("image/", chickenUri)
```
* Và bước tiếp theo không có gì khác so với các api trước : 

```
Notification.MessagingStyle(sender)
        .addMessage(message)
        .setBuilder(mBuilder)
```

Và với method này chúng ta có thể thấy một hình ảnh nội tuyến gắn liền với nội dung tin nhắn được hiển thị :

![](https://images.viblo.asia/6410eec6-c9e4-4a57-b6b1-76c6895d7864.png)

Và bây giờ chúng ta có thể gửi những tin một tin nhắn khác cho cuộc trò chuyện này thì chỉ cần nối chúng lại bằng cách sử dụng *addMessage()* method như dưới đây :

```
Notification.MessagingStyle(sender)
        .addMessage(message)
        .addMessage("Look at the chicken!") // gộp chuỗi này vào hình trên
        .addMessage(...)
        .setBuilder(mBuilder)
```

* Nếu Person instance trong một message là cùng một instance với notification trước đó thì hệ thống sẽ tự động gộp chúng lại thành một content như thế này : 

![](https://images.viblo.asia/3915f763-ca94-4fc9-9d0d-73dbca8bd567.png)

* Còn nếu Person instace của đoạn message đó không giống với instance trước thì sao? Nó sẽ được coi là một Person instance mới và instance sẽ được hiển thị cùng với 1 notification khác để mô tả sự thay đổi của bối cảnh

![](https://images.viblo.asia/c02ff7ca-122a-45cd-8f81-c9e1002c4f4b.png)

* Còn một property nữa mà chúng ta có thể set nó vào notification là **isGroupNotification**, sử dụng nó bằng cách gọi method *setGroupConversation()* method khi build message ở MessagingStyle:

```
Notification.MessagingStyle(sender)
        .addMessage(message)
        .setGroupConversation(true)
        .setBuilder(mBuilder)
```

* Việc setting property này sẽ xác định message trong Notification như một phần của một nhóm các thông báo. Nó cũng quan trọng để lưu ý rằng ở Android P bắt buộc phải được set **true** nếu notification của bạn có một large Icon được set tại *setLargeIcon()* method trong notification buidler. Khi set như vậy large Icon đó sẽ được hiển thị ở bên phải khi mà notification được mở rộng:

![](https://images.viblo.asia/aaeb505c-caa4-4c1a-97f1-fb96c5e7e0c3.png)

* Đến với android P chúng ta cũng có thể gán ý nghĩ cho cách hành động trên thông báo mà không làm thay đổi giao điện của thông báo. Nó cho phép chúng ta gán tham chiếu được xác định trước cho value vào các action của notification như là "mark as read","delete", "reply"... 

![](https://images.viblo.asia/bd765fa2-9b81-4224-8d3c-b5e8978971c4.png)

* Bạn có thực hiện điều này với method *setSemanticAction()* : 

```
val action = NotificationCompat.Action.Builder(...)
    .setSemanticAction(SEMANTIC_ACTION_CALL)
    .build()
```
* Hiện tại android đang hỗ trợ các semantic action là :
    * SEMANTIC_ACTION_NONE
    * SEMANTIC_ACTION_REPLY
    * SEMANTIC_ACTION_MARK_AS_READ
    * SEMANTIC_ACTION_MARK_AS_UNREAD
    * SEMANTIC_ACTION_DELETE
    * SEMANTIC_ACTION_ARCHIVE
    * SEMANTIC_ACTION_MUTE
    * SEMANTIC_ACTION_UNMUTE
    * SEMANTIC_ACTION_THUMBS_UP
    * SEMANTIC_ACTION_THUMBS_DOWN
    * SEMANTIC_ACTION_CALL

* Chi tiết về từng semantic action bạn có thể xem ở [đây](https://developer.android.com/reference/android/app/Notification.Action.html#SEMANTIC_ACTION_NONE)

Một sự thay đổi đáng để nhắc đến nữa là *setChoices()* method này hiển thị ra các sự lựa chọn. Nó đã được sử dụng từ API 20 nhưng với android P các sự lựa chọn này luôn được hiển thị khi device đay hoạt động.

# LỜI KẾT
* Như vậy trong bài viết này, chúng ta đã được đểm qua một số cải tiến trên Notification ở android 9. Hi vọng điều này có thể giúp ích cho mọi người. Nếu có gì đó thiếu xót hoặc chưa đúng mong mọi người phản hồi dưới phần comment. 

Have a good day ! :heart:

## Tham khảo:
* https://developer.android.com/reference/android/app/Person.Builder.html#setUri%28java.lang.String%29
* https://medium.com/google-developer-experts/exploring-android-p-enhanced-notifications-a9adb8d78387