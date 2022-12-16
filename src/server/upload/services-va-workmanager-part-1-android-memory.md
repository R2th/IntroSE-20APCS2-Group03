Tại Google IO 2018, có một khái niệm mới, gọi là WorkManager, là một phần trong JetPack. Nó sinh ra để giải quyết những vấn đề phức tạp gặp phải khi các ứng dụng ngày càng làm nhiều việc ở background.  
Bài viết này chúng ta sẽ tìm hiểu kỹ hơn về nó và lý do đằng sau việc xây dựng nó.
Chúng ta sẽ có 3 phần:
- Memory basic
- Existing Background Solutions
- WorkManager
Đầu tiên, trước khi bắt đầu với tất cả mọi thứ về background, chúng ta cần phải hiểu một số điều cơ bản về quản lý bộ nhớ xử lý trong Android.

### Phần 1: Android Memory

![](https://images.viblo.asia/4da205a7-d9c8-4ea4-aee5-74f1865a7a94.png)

 Cách đây từ rất lâu, trong một thiên hà xa xôi, hạt nhân Android lần đầu tiên được phát triển, dựa trên Linux-Kernel. Điều khác biệt chính giữa Android và các hệ điều hành khác base trên Linux-Kernel chính là Android không có cái gọi là "Swap space" - Không gian hoán đổi.
  
  "Swap space" trong Linux  được sử dụng khi RAM đầy, nếu bộ nhớ cần nhiều tài nguyên hơn và RAM đầy, các trang không hoạt động trong bộ nhớ sẽ được chuyển đến Swap space. 
  
  Người ta xem Swap space là để giúp những thiết bị có lượng RAM nhỏ, nhưng trên tổng thể, "Swap space" lại nằm trên ổ cứng và với thời gian truy cập chậm hơn bộ nhớ vật lý,  nó lại có những hạn chế và không thể thay thế cho việc RAM lớn hơn. 
    
![](https://images.viblo.asia/ce2c1021-299d-4876-a524-b8616eaeb601.png)
    
Trong Android không có một thứ như "Swap space", khi hệ thống hết bộ nhớ, nó gọi OOM để tiêu diệt. Mục tiêu của OOM là giải phóng bộ nhớ bằng cách kill process dựa trên "visibility state" - Trạng thái hiển thị và lượng bộ nhớ tiêu thụ. Mỗi process đều có điểm số gọi là `oom_adj` của Activity Manager. Đây là một ví dụ về `oom_adj`
```
# Define the oom_adj values for the classes of processes that can be 
 # killed by the kernel. These are used in ActivityManagerService. 
 setprop ro.FOREGROUND_APP_ADJ 0 
 setprop ro.VISIBLE_APP_ADJ 1 
 setprop ro.SECONDARY_SERVER_ADJ 2 
 setprop ro.BACKUP_APP_ADJ 2 
 setprop ro.HOME_APP_ADJ 4 
 setprop ro.HIDDEN_APP_MIN_ADJ 7 
 setprop ro.CONTENT_PROVIDER_ADJ 14 
 setprop ro.EMPTY_APP_ADJ 15 
```

OOM (out of memory) sẽ kill những process có oom_adj cao, ứng dụng đang chạy có oom_adj = 0.

Có một quy tắc là : 
Nếu memory free < X1, thì sẽ kill process có oom_adj > Y1.

Về cơ bản sẽ giống như sau:

![](https://images.viblo.asia/b4b40e51-ca29-4b49-816e-98db87948827.png)

Mỗi process có một điểm `oom_adj` khác nhau

![](https://images.viblo.asia/c5a91574-d192-423c-ada3-c6c1d30a5883.png)

Kill tất cả các process có `oom_adj` > 7 và bộ nhớ tiêu thụ > 10kb.

![](https://images.viblo.asia/4244a459-543c-448c-9c51-f6f32648b562.png)

Bộ nhớ được giải phóng.

Vậy là nếu bạn dùng ít bộ nhớ, bạn sẽ có nhiều cơ hội để chiến thắng.

Điều thứ hai là bạn đã hiểu được vì sao cần Trạng thái của ứng dụng. Khi ứng dụng của bạn chuyển sang background, và bạn vẫn muốn thực hiện các tác vụ, lúc đó bạn cần phải sử dụng Services.

> Services là một thành phần ứng dụng, giúp thực hiện các hoạt động lâu dài trong background, điểu hiển nhiên là nó không cung cấp giao diện người dùng.

Có vài lý do tại sao bạn nên sử dụng Services:
1. Cho hệ thống biết rằng bạn đang chạy một tác vụ dài hạn và nhận được điểm oom_adj tương ứng.
2. Một trong 4 entry point trong Android Application (BroadcastReceiver, Activity, ContentProvider, Services)
3. Services chạy trong một process riêng

Tất nhiên đi kèm sẽ là những mặt hạn chế như:

![](https://images.viblo.asia/91a5fcf3-5b10-423f-882a-d245a04f12d3.png)

![](https://images.viblo.asia/6716a0ba-f48b-4ef6-96cc-c26945246393.png)


Và để tốt nhất cho người dùng, Google đã vào cuộc.

Bắt đầu với Marshmallow và tiếp theo sau là Nougat, chế độ Doze đã được giới thiệu. 

![](https://images.viblo.asia/0d201466-51da-4be2-8da1-1433e6018e2b.png)

Nếu bạn chưa quen lắm với Doze, bạn thực sự nên tìm hiểu về nó. Một cách tổng quát thì khi người dùng tắt màn hình, chế độ Doze sẽ được kích hoạt, nó vô hiệu hóa mạng, đồng bộ hóa, GPS, báo động, quyeeets wifi. Nó bật cho đến khi người dùng bật màn hình hoặc kết nối sạc. Với mục đích giảm số lượng ứng dụng thực hiện các công việc không quan trọng để có thể tiết kiệm pin cho người dùng. 

Và Google đã đi xa hơn nữa với Android Oreo (API 26)

Nếu ứng dụng của bạn target Android 8.0 và sử dụng method startService(), nó sễ throws ra một  [IllegalStateException](https://developer.android.com/reference/java/lang/IllegalStateException) khi không được phép tạo Services trong background.

Điều này có thể fix bằng cách điểu chỉnh target xuống dưới sdk 26, thật ra thì một số ứng dụng nổi tiếng đã chuyển target xuống api 22 để tránh run-time permission. 

Nhưng vẫn còn nhiều điều đang chờ bạn ở phía trước :
- Tháng 8 - 2018: Ứng dụng mới sẽ được yêu cầu target API 26(Android 8.0) hoặc cao hơn.
- Tháng 11 - 2018: Những ứng dụng cũ cũng bắt buộc target API 26 hoặc cao hơn.
- Từ 2019 trở đi : Mỗi năm yêu cầu về targetSdkVersion sẽ tăng lên. Trong vòng 1 năm sau mỗi lần Android release, app mới và app update sẽ cần chuyển target lên đúng API tương ứng. 
> Kết luận : Các Services như bạn đã biết hoặc đã từng dùng hiện nay sẽ dẫn bị deprecated. Các tác vụ chạy ngầm dưới background sẽ không còn được phép sử dụng. 

Vậy với những ứng dụng đang tồn tại, có giải pháp nào để dần thay thế Services không, hẹn gặp lại bạn ở bài viết sau nhé.

[Nguồn](https://medium.com/google-developer-experts/services-the-life-with-without-and-worker-6933111d62a6)