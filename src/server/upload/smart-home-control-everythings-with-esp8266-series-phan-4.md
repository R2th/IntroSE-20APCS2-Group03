<h1>Tổng quan</h1>
Như đã nói trong phần trước,bắt đầu từ bài viết này chúng ta không cần care phần cứng kia nữa.Tất cả việc chúng ta làm sẽ xoay quanh cái "status" mà chúng ta đã định nghĩa từ các bài trước.Trong bài viết này,mình sẽ viết một app Android "nho nhỏ" để kết nối với Firebase.<br>
Oke.Let's GO!

<h1>Chuẩn bị</h1>

* Kiến thức về lập trình Android
* Android Studio IDE
<h1>Lập trình</h1>

* Trước hết cần kết nối app của bạn đến Firebase.bạn có thể tham khảo [ở đây](https://techtalk.vn/blog/posts/phat-trien-ung-dung-co-so-du-lieu-thoi-gian-thuc-voi-firebase-phan-1) 
*  Cấu trúc dữ liệu mình sử dụng

![data](https://images.viblo.asia/2bc35928-a647-4a0a-8f97-70263b40e30d.PNG)<br>
Bạn có thể thấy,đây là cách mình dùng trong thường hợp mình dùng nhiều thiết bị<br>
* Xây dựng modal,ứng với cấu trúc như trên.đây là định nghĩa class của mình
>     private int status;
>     private String idDevice;
>     private String nameDevice;
* Tạo item cho mỗi button
![](https://images.viblo.asia/5c720f05-cd36-4838-bbcb-9c3b62c53e62.jpg)
Ở đây mình dùng Recyclerview  để hiện thị dạng List như thế này.
* Xử lí logic
>      public void setData(final Device data){
>             tvDevice.setText(data.getNameDevice());
>             chooseImage(data.getStatus());
>             ivStatus.setOnClickListener(new View.OnClickListener() {
>                 @Override
>                 public void onClick(View v) {
>                     data.setStatus(1-data.getStatus());
>                     chooseImage(data.getStatus());
>                     FirebaseDatabase database = FirebaseDatabase.getInstance();
>                     DatabaseReference myRef = database.getReference(LIST_DEVICE).child(ID_USER);
>                     myRef.child(data.getIdDevice()).setValue(new Device(data.getStatus(), data.getIdDevice(), data.getNameDevice()));
>                 }
>             });
>         }
> 
Giải thích
   *  Khi ta ấn vào nút bấm trên hình thì sẽ đổi trạng thái của thuộc tính status từ 0>1 và ngược lại
   *  Update lại giá trị status ứng Device vừa rồi trên Firebase.
   *  Khi đó ESP8266 sẽ nhận được giá trị thay đổi và quyết định "on","off"

<h1>Demo</h1>
Video demo bạn có thể tham khảo ở đây

{@embed: https://www.youtube.com/watch?v=7kuiTV7qAeg}

<h1>Tổng kết</h1>
Như vậy mình đã hướng đẫn các bạn cách đơn giản nhất,để có thể điều khiển thiết bị qua app Android.Trong các phần tiếp theo mình sẽ hướng đẫn việc control bằng Siri hay Google Assitant,..Các bạn theo dõi nhé!