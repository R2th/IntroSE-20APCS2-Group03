**Giới thiệu**

 Như các bạn đều biết mỗi lần Google cập nhật phiên bản mới thì đều có rất nhiều những thay đổi kéo theo tác động đến việc phát triển ứng dụng. Android O được ra mắt vào năm 2017. Và với phiên bản này có tương đối nhiều điểm mà những nhà phát triển như chúng ta cần quan tâm. Đối với bản thân mình thì thay đổi trên phiên bản này mà mình quan tâm nhất đó là việc giới hạn các tác vụ chạy nền của ứng dụng. 
 
Nói về giới hạn các tác vụ chạy nền thì có 2 điểm chính cần quan tâm đó là Service và Wakelocks.

Ở bài viết này mình muốn trình bày về **Service** khi bạn thực hiện phát triển ứng dụng có sử dụng service cần tương thích với phiên bản Android O. OK. Giờ chúng ta cùng bắt đầu

# 1. Ứng dụng Background và ứng dụng Foreground

 Để tìm hiểu các thay đổi mà hệ thống thực hiện với tác vụ chạy nền, điều đầu tiên các bạn cần quan tâm đó là phân biệt giữa ứng dụng Background và Foreground.
Quy tắc chung, ứng dụng của bạn sẽ được coi là **Foreground Service** nếu bất kỳ trường hợp nào trong ba trường hợp dưới đây là đúng:

1. Ứng dụng của bạn hiện có activity hiển thị.
2. Ứng dụng của bạn có **Foreground Service** đang chạy.
3. Ứng dụng của bạn được kết nối với một ứng dụng **Foreground** khác bằng cách ràng buộc **Service** hoặc bằng cách sử dụng đến các **Content Providers** của chúng.

Nếu bất kỳ kịch bản nào ở trên không đúng trong trường hợp hiện tại, ứng dụng của bạn được coi là ở chế độ **Background**.


# 2. Việc giới hạn tác vụ chạy nền có quan trọng?
 Bất cứ khi nào ứng dụng của bạn chạy ở Background bằng Service, ứng dụng của bạn sẽ tiêu thụ hai tài nguyên quý giá: 1) Bộ nhớ và 2) Pin.
Hai tài nguyên này giới hạn trên thiết bị di động và hầu hết các thiết bị từ thấp đến tầm trung không có nhiều bộ nhớ hoặc pin.

 Giả sử, nếu ứng dụng của bạn đang thực hiện một số nhiệm vụ rất chuyên sâu trong nền và sử dụng dung lượng RAM lớn hơn để thực hiện tác vụ đó, thì điều này sẽ ảnh hướng rất xấu đến trải nghiệm người dùng, đặc biệt nếu người dùng đang sử dụng một ứng dụng tốn nhiều tài nguyên khác, chẳng hạn như chơi trò chơi hoặc xem video.

 Theo tài liệu hướng dẫn cho **Started Service**, phương pháp hay nhất sẽ là, khi hoạt động hoàn tất, service sẽ tự dừng lại.

 Tuy nhiên, nhiều ứng dụng có các **Background Services** chạy trong thời gian dài, cơ bản chạy trong thời gian vô hạn để duy trì kết nối socket với máy chủ hoặc theo dõi một số tác vụ hoặc hoạt động của người dùng. Những service này tạo ra sự tiêu hao pin và chúng cũng liên tục tiêu thụ bộ nhớ.

 Từ một vài phiên bản android (Bắt đầu từ Marshmallow), Google đang cố gắng hết sức để tăng tuổi thọ pin và giảm mức tiêu thụ bộ nhớ được sử dụng bởi các ứng dụng bằng cách giới thiệu chế độ doze và chờ ứng dụng bằng cách trì hoãn việc thực thi background. nếu điện thoại không hoạt động.

# 3. Giới hạn tác vụ chạy background trên Android O
 Bắt đầu từ Android O, nếu ứng dụng của bạn ở chế độ background (check với ba điều kiện mình viết bên trên), ứng dụng của bạn được phép tạo và chạy các **Background Services** trong một vài phút.
Sau một vài phút trôi qua, ứng dụng của bạn sẽ nhập vào ở chế độ chờ. Khi ứng dụng của bạn nhập vào ở chế độ chờ, hệ thống sẽ dừng tất cả các **Background Services** giống như khi **Service** của bạn gọi Service.stopSelf ().

 Và đây là phần thú vị ...
Như tôi đã thảo luận ở trên, vấn đề tiêu hao pin và mức tiêu thụ bộ nhớ chủ yếu là do các **Started Service** gây ra. Để loại bỏ điều này, Android O hoàn toàn ngăn cản việc sử dụng phương thức **startService()** để start 1 service. Nếu bạn gọi **startService()** trên Android O, bạn sẽ nhận được **IllegalArgumentException**.

 Có một số ngoại lệ trong các trường hợp này khi ứng dụng của bạn được đưa vào danh sách cho phép tạm thời trong một thời gian. Trong thời gian này, ứng dụng của bạn có thể tạo các **Background Services** một cách tự do. Ứng dụng sẽ đưa vào danh sách tạm thời theo các tình huống dưới đây:

1. Khi nhận được thông báo FCM ưu tiên cao
2. Nhận một broadcast
3. Thực thi PendingIntent từ một thông báo
# ４. Thực thi tác vụ chạy background trên Android O
 Trong thực tế thì khi bạn thực hiện 1 số ứng dụng với độ phức tạp lớn. Thì việc thực thi một số tác vụ chạy background là cần thiết.

 Vậy có một vấn đề đặt ra là làm thế nào bạn có thể chạy **Background Service** trên Android O?
 
 1. Sử dụng 1 **JobScheduler**. Nếu chưa biết đến **JobScheduler** bạn có thể tìm hiểu thêm về **JobScheduler** tại đây(https://developer.android.com/reference/android/app/job/JobScheduler)
 2. Sử dụng **Foreground Service**
  Không có giới hạn thực hiện background nào ở trên áp dụng cho các foreground service. Điều này cũng sẽ giữ cho người dùng của bạn biết rằng ứng dụng của bạn đang thực hiện một số tác vụ background bằng cách hiển thị thông báo đang diễn ra. Điều này sẽ tăng tính minh bạch với người dùng. (VD: Như hiển thị 1 notification trong khi bạn đang download hay xử lý rất nhiều tác vụ dưới background). Bắt đầu từ Android O, bạn không thể sử dụng startService () nữa. Vì vậy, để tạo **Foreground Service**, bạn phải sử dụng NotificationManager.startServiceInForeground().
  

 Như vậy là mình đã trình bày xong bài viết về  xử lý background service trên Android O. 

Nguồn: https://medium.com/exploring-code/how-to-handle-background-services-in-android-o-f96783e65268, https://developer.android.com/reference/android/ . Nếu có gì sai sót rất mong nhận được sự đóng góp từ phía các bạn.