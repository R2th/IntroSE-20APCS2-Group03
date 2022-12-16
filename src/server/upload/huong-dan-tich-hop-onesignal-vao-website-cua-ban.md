# Lời mở đầu
Qua bài viết giới thiệu về Push notification và Onesignal chắc các bạn cũng đã nắm được cơ bản về nó và cũng đã tạo được tài khoản và app Onesignal ở bài trước. Bây giờ chúng ta cùng bắt tay vào làm sử dụng Onesignal để Push notifications cho website của bạn nhé :v: 

# Gét gô
1. Từ bài trước chúng ta đã tạo được 1 app Onesignal, hãy click vào app đó và cùng bắt đầu với mình nào.
2. Sau khi vào được app, hãy cùng nhìn lên menu phía bên phải, chọn Settings => Platforms => Web Push Platforms.

![image.png](https://images.viblo.asia/ce598c9a-2041-4d4c-83b3-1d48f53bea11.png)

3. Tiếp theo, bạn sẽ nhận được các options như là bạn có thể chọn loại website tự code hoặc dùng WordPress nên tùy từng dự án mà chọn cho phù hợp nhé. (ở đây mình sẽ chọn Typical Site)

![image.png](https://images.viblo.asia/3356f3c5-41a3-4cae-8e43-e5a0281ab8e9.png)

4. Tiếp theo bạn hãy điền thông tin website của bạn nhé.

![image.png](https://images.viblo.asia/81236277-677e-45f2-84e8-949deb1d2ba9.png)

Ở đây, mình sẽ giải thích kỹ hơn 1 chút:
* **SITE NAME:** Tên website của bạn muốn hiển thị khi push notifiactions.
* **SITE URL:** Đường link tới website của bạn. bên trên là mình sử dụng ngrok để tạo ra một đường dẫn truy cập vào localhost của mình nhé (Các bạn có thể tham khảo cách sử dụng ngrok ở các bài viết trên **Viblo** nhé)
* **AUTO RESUBSCRIBE (HTTPS ONLY):** phần này thì mình khuyến khích cứ nên bật vì để website bạn sau này tự động đăng ký lại nhé.
* **DEFAULT ICON URL:** phần này icon website của bạn để gửi kèm,  chắc hẳn các bạn cũng đã thấy nhiều các thông báo trên website hoặc trên app điện thoại thì có thể hiểu được thêm icon sẽ có ích như thế nào khi các bạn push notifications.
* **My site is not fully HTTPS:** các bạn chú ý phần này, nếu website của bạn không có https thì hãy bật nó lên nhé.

5. Tiếp theo, chúng ta sẽ chỉnh sửa phần thông báo người dùng đăng ký nhận thông báo trong website của bạn, ở đây bạn có thể add nhiều loại cùng 1 lúc nhưng nó cũng là con dao hai lưỡi bởi vì thêm quá nhiều thì sẽ gây khó chịu cho trải nghiệm người dùng, gây mất thiện cảm. Mình khuyến khích các bạn chỉ nên để 1 hoặc 2 thôi nhé.
![image.png](https://images.viblo.asia/80ef1250-92f3-416f-bbcc-53b3d92a1a31.png)

Trong màn setup này các bạn có thể tùy chỉnh thoải mái theo ý thích của các bạn để phù hợp với website của mình, đã có preview phía bên phải nên rất tiện để tùy chỉnh đúng không nào. Ở đây mình sẽ chọn Subscription Bell cho tiện trải nghiệm người dùng nhé.

6. Tiếp theo, chúng ta đi đến phần Welcome Notification. Option này cũng khá là hấp dẫn đối với việc giúp bạn đẩy lượng tương tác với người dùng sau khi đăng ký nhận thông báo, bạn có thể tùy ý thiết lập những câu chữ thích hợp với website của bạn để gửi đến người dùng và có thể xem preview ngay bên cạnh, quả là một option tuyệt vời :v:
![image.png](https://images.viblo.asia/2501b965-7a12-4997-a4ca-2a38fa5ca027.png)

7. Sau khi thực hiện xong các bước trên, các bạn hãy kéo xuống và click save.
8. Cửa sổ mới được hiện ra kèm theo 1 đoạn code, hãy lấy nó và copy vào mã nguồn của bạn nhưng phải nằm trước thẻ đóng `head` nhé. Sau đó bạn click **Finish** là đã hoàn thành rồi nhé. 

![image.png](https://images.viblo.asia/f012b377-42e2-435a-b39a-1f5443eb3438.png)

![image.png](https://images.viblo.asia/3f6e9a53-b407-4782-9e61-bcc992f9f84f.png)

Và đây là kết quả ( đã thấy chuông đăng ký :v: )

![image.png](https://images.viblo.asia/dd51b4b3-195c-46de-8734-7e73fa41a770.png)

Kiểm tra trong phần thống kê User đã Subscribe xem đã có chưa nhé các bạn

![image.png](https://images.viblo.asia/08d710c0-4b11-43eb-af47-90e34b50ef2d.png)

Nếu các bạn muốn gửi thông báo chỉ định cho User đã Subscribe thì các bạn hãy lấy **id** của user đó bằng cách sử dụng hàm `await OneSignal.getUserId()` và Onesignal cũng hỗ trợ api để các bạn sử dụng để push notifications cho các User đã Subcribe bằng **id** mà các bạn lấy được từ hàm trên. Cái này mình sẽ giải thích chi tiết ở bài sau nhé.

# Tạm kết
Cuối cùng chúng ta cũng đã hoàn thành được việc tích hợp Onesignal vào website, đây là 1 số kiến thức mình tìm hiểu được, các bạn có đánh giá nhận xét gì thì hãy để lại một bình luận bên dưới cho mình biết nhé. Cảm ơn các bạn đã theo dõi.