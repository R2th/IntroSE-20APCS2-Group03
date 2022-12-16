Chào các bạn Trong bài  này, mình sẽ giới thiệu có các bạn các dùng FCM và Postman để test gửi thông báo lên firebase.  Các bạn cùng tìm hiểu trong bài viết của mình nhé!


----

####  Tạo một FCM Token :

Các bạn thêm đoạn code này vào file `MainActivity.java`(Ở đây mình đang tạo 1 token cho Androi nhé).


``` html
FirebaseInstanceId.getInstance().getInstanceId().addOnSuccessListener(this, instanceIdResult -> {
   String newToken = instanceIdResult.getToken();
   Log.e("newToken", newToken);
});
```

Ở đây mình sẽ gửi thông báo bằng cách gửi `Generic Notification` sử dụng `Notification Composer:`

![](https://images.viblo.asia/2de1cb1b-fc90-4086-835c-c7481d9765f3.png)

Theo tài liệu mình đọc được thì 
* `Notification Message` : FCM tự động hiển thị thông báo cho các thiết bị người dùng cuối thay mặt cho ứng dụng khách. Tin nhắn thông báo có một tập hợp các khóa người dùng có thể nhìn thấy được xác định trước và một khối lượng dữ liệu tùy chọn của các cặp khóa-giá trị tùy chỉnh.




----

####  Gửi tin nhắn bằng giao thức HTTP sử dụng Postman :

Bạn cần phải có `Server Key` được lấy từ Firebase:
Đăng nhập vào Firebase rồi vào Project của bạn > Đến Project Setting > vào phần Cloud Messageing thì bạn sẽ thấy thông tin Server Key.

Giờ bạn vào Post chọn method `post` sau đó nhập url : `https://fcm.googleapis.com/fcm/send`

Trong phần `Header` `Authorization: key=<server_key>` **server_key** lấy từ firebase ở trên. và thêm `Content-Type: 
application/json.`


![](https://images.viblo.asia/0646a335-a2ea-4f02-b19f-f753457484ae.png)


Tiếp theo sang phần Body > chọn raw >  chọn JSON (application/json) và thêm đoạn code sau:

``` html
{
 "to" : "FCM token của bạn",
 "collapse_key" : "type_a",
 "notification" : {
     "body" : "nội dung thông báo",
     "title": "tiêu đề thông báo"
 },
 "data" : {
     "body" : "nôi dung chi tiết",
     "title": "thông tin chi tiết",
     "key_1" : "giá trị key_1",
     "key_2" : "giá trị key_2"
 }
}
```


Bây giờ, Bạn có thể gửi thông báo  `Generic`(sử dụng `notification` ) hoặc Thông báo `Custom` (sử dụng `notification` và `data`) và Ấn  vào Gửi.

#### Kết Luận
Dưới đây mình đã hướng dẫn các bạn cách gửi 1 thông báo lên firebase sử dụng FMC vs Postmant.
Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.

---

### Tham Khảo chi tiết hơn

https://medium.com/android-school/test-fcm-notification-with-postman-f91ba08aacc3