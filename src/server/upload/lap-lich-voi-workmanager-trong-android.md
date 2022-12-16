Android Jetpack ra đời đem lại rất nhiều tính năng mới, hữu ích cho developer. Trong đó, **WorkManager** là một API giúp ta dễ dàng có thể lập lịch, chạy task bất đồng bộ cho dù app đã bị thoát hoặc thiết bị khởi động lại. Nó được khuyến nghị là thay cho các API lập lịch trước đó của Android như **FirebaseJobDispatcher, GcmNetworkManager, and Job Scheduler**. Vậy cụ thể nó là gì, có gì hay, chúng ta hãy cùng tìm hiểu trong bài này nhé !!!

# I. Khái niệm
## 1. WorkManager là gì ?
Như đã nói, **WorkManager** là một API trong gói Android Jetpack đã rất nổi tiếng và giúp ta có thể lập lịch. Cụ thể hơn, nó là một thư viện Android mà chạy các công việc dự định khi điều kiện của công việc được thỏa mãn (khi có mạng, tại thời điểm nào đó, ...). 

**WorkManager** cung cấp một API giúp tiết kiệm pin hiệu quả, được tối ưu cho các phiên bản Android khác nhau
<img src="https://koenig-media.raywenderlich.com/uploads/2018/08/WorkManager-feature.png"/>

## 2. Tính năng
### a. Điều kiện hoạt động
Có thể quyết định khi nào công việc được chạy, sử dụng **Work Constraints**. Ví dụ như chạy chỉ khi thiết bị đang kết nối Wi-Fi, khi thiết bị nhàn rỗi, khi đủ không gian lưu trữ, ...
### b. Lập lịch mạnh mẽ
**WorkManager** cho phép lập lịch chạy một lần hoặc lặp lại. Công việc có thể được đánh tag hoặc đặt tên, giúp bạn dễ quản lý một đến nhiều công việc. 
Công việc được lưu trữ trong cơ sở dữ liệu SQLite nội bộ. WorkManager đảm bảo nó hoạt động tốt cho dù thiết bị có bị khởi động lại. Nó tuân thủ các tính năng tiết kiệm năng lượng như **Doze mode**, vậy nên bạn không phải lo lắng. 
### c. Khả năng thử lại linh hoạt
Đôi khi công việc chạy bị lỗi. **WorkManager** cung cấp khả năng thử lại linh hoạt, bao gồm cả tính năng dự phòng.
### d. Chuỗi công việc
**WorkManager** giúp liên kết các công việc với nhau chỉ bằng một đoạn code đơn giản, dễ hiểu.
Ví dụ
```
WorkManager.getInstance(...)
    .beginWith(listOf(workA,workB))
    .then(workC)
    .enqueue()
```
Đọc phát cơ bản có thể hiểu ngay. Bắt đầu với công việc A, B. Sau đó chạy tiếp C. Hoặc tương tự :3 

Cho mỗi task, có thể định nghĩa **input và output** cho nó. Và khi ở trong một chuỗi công việc, output của cái này được WorkManager tự động truyền cho cái tiếp theo :D Hay phết, đỡ phải xử lý lằng nhằng
### e. Khả năng tương tác với luồng
**WorkManager** dễ dàng được tích hợp với RxJava và Coroutines, cung cấp khả năng chạy task bất đồng bộ mạnh mẽ. 

## 3. Sử dụng
Vậy khi nào thì nên sử dụng **WorkManager**. Vì có nhiều thư viện khác của Android cũng có thể chạy tương tự như Alarm Manager, Sync Adapter, ...

Câu trả lời là công việc **"has to finish and is deferrable"**

<img src="https://miro.medium.com/max/700/1*K-jWMXQbAK98EdkuuaZCFg.png"/>

Cụ thể như sau:
- **Has to finish**: khi ứng dụng bị người dùng đóng, có cần thiết phải hoàn thành việc không (**Has to finish**)? Ví dụ như bạn muốn đồng bộ dữ liệu lên server khi xong việc. Việc này nên xảy ra kể cả khi bạn chuyển app khác hoặc app bị đóng để có thêm bộ nhớ. WorkManager sẽ giúp bạn giải quyết nó.
- **Is deferrable**: nếu task cần chạy sau một khoảng thời gian, nó là task trì hoãn (**Is deferrable**) .  Giả sử bạn muốn hẹn giờ cho một công việc nào đó, chạy sau 3h nữa. Thì bạn có thể sử dụng WorkManager để làm điều này :D

Chi tiết sử dụng các bạn có thể xem ở đây: https://android-developers.googleblog.com/2018/10/modern-background-execution-in-android.html

## 4. Cơ chế
WorkManager hỗ trợ từ API 14 (Android 4.0, ra đời năm 2011). Bạn có thể thấy nó rất cũ rồi. Để làm được điều này, **WorkManager** dùng thêm **JobScheduler** hoặc sự kết hợp giữa **BroadcastReceiver và AlarmManager**

<img src="https://developer.android.com/images/topic/libraries/architecture/workmanager/overview-criteria.png"/>

# II. Thực hành
Doc của Android đã hướng dẫn đầy đủ, bạn nên xem tại
https://developer.android.com/topic/libraries/architecture/workmanager/basics

# Tóm lại
WorkManager là một API giúp ta dễ dàng lập lịch công việc, với nhiều tính năng hữu ích. Còn chần chừ gì nữa mà ko sử dụng

# Tham khảo
1. https://developer.android.com/topic/libraries/architecture/workmanager
2. https://medium.com/androiddevelopers/introducing-workmanager-2083bcfc4712
3. https://android-developers.googleblog.com/2018/10/modern-background-execution-in-android.html

Các bạn có thể đọc nhiều hơn về Android, nghe tâm sự chém gió tại blog [Code cùng Trung](https://codecungtrung.com/) của mình nhé :D

Link blog: https://codecungtrung.com/