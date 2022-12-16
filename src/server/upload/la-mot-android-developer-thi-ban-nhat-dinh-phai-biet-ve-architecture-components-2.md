### 1.Mở đầu.
Như bạn đã biết Google I/O 2018 đã đưa ra Android Jetpack, là một tập hợp các libraries, tools và architechtural guidance để giúp bạn tạo ra các ứng dụng Android tuyệt vời một cách nhanh chóng và dễ dàng. Nó cung cấp mã code cơ bản, là nền tảng cho bạn thiết kế ứng dụng trở nên độc đáo.

Trong Android Jetpack có Android Architecture Components, là một bộ sưu tập các thư viện giúp các lập trình viên thiết kế các ứng dụng Android một cách mạnh mẽ, có thể dễ dàng test và maintain. Ban đầu là xây dựng một số lớp dùng để quản lý vòng đời thành phần UI và xử lý data một cách bền vững, hiệu quả

Ở [phần 1](https://viblo.asia/p/la-mot-android-developer-thi-ban-nhat-dinh-phai-biet-ve-architechture-components-3P0lPz0pKox) mình đã trình bày về 4 components của Android Architecture Components là Room, LiveData, Lifecycle và ViewModel và sự kết hợp tuyệt vời giữa chúng! Ở bài viết này mình xin trình bày các components còn lại của Android Architechture Components là Navigation, Paging, WorkManager và Data Binding. Với 3 thành phần đầu Navigation, Paging và WorkManager rất mới mẻ (được Google I/O tháng 5 2018 giới thiệu cùng Android Jetpack) còn Data Binding thì đã có từ khá lâu.

Tất cả chúng sinh ra là giải pháp cho thiết kế ứng dụng Android trong tương lai. Chúng ta hãy tiếp tục đọc qua và xem có đọng lại gì không nhé ^^

### 2.Paging.
Nhiều ứng dụng hoạt động với một tập hợp dữ liệu lớn nhưng chỉ cần load và display một phần nhỏ tại một thời điểm nhất định. Nếu bạn không cẩn thận, bạn phải request data bạn không cần thiết lãng phí pin của người dùng và băng thông. Nếu dữ liệu đang hiện thị của bạn liên tục cập nhật, có thể khó giữ cho giao diện của ứng dụng đồng bộ và vẫn chỉ gửi một lượng nhỏ thông tin qua internet. Thì Paging ra đời để giải quyết những vấn đề này:

1.cho phép bạn tải giữ liệu từng chút một và mượt mà (gradually and gracefully).

2.Thư viện này hỗ trợ cả những danh sách dữ liệu lớn bounded và unbounded. Chẳng hạn như liên tục cập nhật nguồn dữ liệu.

3.Tích hợp với RecyclerView, thường được sử dụng để hiện thị một lượng dữ liệu lớn.

4.Kết hợp độc đáo với LiveData hoặc RxJava để quan sát dữ liệu mới trong giao diện người dùng.

Paging Library được xây dựng trên ý tưởng từ gửi danh sách dữ liệu bằng LiveData tới RecyclerView, mục đích là đê tải dữ liệu dần dần.
![](https://images.viblo.asia/12f57f49-8835-471c-82a3-064c63805580.png)

Các thành phần chính của Paging là PagedList và DataSource.

*PagedList* là một Collection, tải dữ liệu theo từng mảnh nhỏ một cách bất đồng bộ từ DataSource.

*Data Source* là một lớp cơ sở cho việc load bản sao data vào trong PagedList. Có thể được hỗ trỡ bởi Network, Database, File, Any other source.
### 3.Navigation.
Navigation Architecture Component đơn giản hóa việc triển khai của sự điều hướng trong ứng dụng Android.
![](https://images.viblo.asia/8d275ee2-d149-45c1-a80b-a09da8ca0f1e.png)

Các nguyên tắc của Navigation.

1. Ứng dụng phải có một điểm bắt đầu cố định:
Là màn hình mà người dùng nhìn thấy khi họ khởi chạy ứng dụng của bạn từ trình khởi chạy. Điểm đến này cũng là màn hình cuối cùng người dùng nhìn thấy khi họ quay lại trình khởi chạy bằng ấn nút back.

2. Một ngăn xếp được sử dụng để đại diện cho “navigation state” của một ứng dụng.
Navigation state phải được thể hiện bằng cấu trúc last in, first out. Điểm bắt đầu của ứng dụng ở cuối ngăn xếp và điểm hiện tại ở đầu ngăn xếp.

3. Up Botton không bao giờ thoát khỏi ứng dụng. Nếu người dùng ở điểm xuất phát, Up Botton không được hiện thị. Khi ứng dụng được khởi chạy bằng liên kết sâu trên tác vụ của một ứng dụng khác, Up Botton sẽ đưa người dùng đến đích cha mẹ phân cấp và không quay trở lại ứng dụng khác.

4. Up và Back tương đương với nhiệm vụ của ứng dụng.
Khi nút Back không thoát khỏi ứng dụng của bạn, chẳng hạn như khi bạn đang thực hiện nhiệm vụ của riêng mình chứ không phải tại điểm xuất phát, nút Up sẽ hoạt động giống với nút Back.

5. Liên kết sâu hoặc điều hướng đến cùng một điểm đến sẽ dẫn đến cùng một ngăn xếp.

### 4.WorkManager.
Trong Android, bạn có biết để xử lý công việc dưới background có thể thực hiện bao nhiêu cách không?
![](https://images.viblo.asia/78e881ed-f4de-44bc-9ada-6593d30ef02e.png)

Rất nhiều cách đúng không nào! Tùy vào từng bài toán mà bạn phải có lựa chọn cho thích hợp. Đồ thị phía dưới, trục dọc đặc trưng cho thời gian tiêu tốn và trục ngang là chất lượng công việc.
![](https://images.viblo.asia/61cb5f9b-2ba2-4323-97b9-1e6bf69ff4a4.png)
Thì ở góc mà thời gian tiêu tốn ít nhất và chất lượng công việc tốt nhất là sự tổ hợp sử dụng của 4 đối tượng JobSheduler, JobDispatcher, AlarmManager và BroadcastReceivers. Để thay thế dùng một lúc cả 4 đối tượng này thì ta WorkManager được sinh ra!

WorkManager là một thư viện tương thích, linh hoạt và đơn giản để xử lý các công việc dưới background (công việc đồng bộ cũng như không đồng bộ, đơn giản cũng như phức tạp). WorkManager hiện tại đang là phiên bản Alpha, khi ổn định nó sẽ là công cụ sắp xếp lịch các tasks trong Android. WorkManager thực hiện các background tasks đòi hỏi một cách nhanh chóng và đảm bảo. Thực thi nhanh chóng có nghĩa là WorkManager sẽ thực hiện công việc ở background của bạn ngay khi có thể.Thực thi đảm bảo có nghĩa là WorkManager sẽ thực hiện logic để bắt đầu công việc của bạn trong nhiều tình huống, ngay cả khi bạn điều hướng khỏi ứng dụng của mình.

WorkManager là một thư viện đơn giản nhưng cực kì linh hoạt và có nhiều lợi ích bổ sung:

1. Hỗ trợ cho các task định kì và các task không đồng bộ một phần.

2. Hỗ trợ các ràng buộc như điều kiện internet, không gian lưu trữ và trạng thái sạc.

3. Chuỗi các công việc yêu cầu phức tạp, bao gồm cả chạy song song.

4. Đầu ra của yêu cầu người dùng được sử dụng cho đầu vào tiếp theo.

5. Xử lý cả các mứng API nhỏ hơn 14.

6. Làm việc có hoặc không các dịch vụ của Gooogle Play.

7. Hỗ trợ LiveData để dễ dàng hiện thị UI.

... Còn nhiều lợi ích nữa.

Một số ví dụ các task sử dụng tốt WorkManager:

1. Uploading Logs

2. Áp dụng lọc hình ảnh và lưu hình ảnh.
![](https://images.viblo.asia/09dc1969-a75a-47a9-9b4e-0b8c78510cf0.png)
3. Đồng bộ hóa dữ liệu cục bộ với network định kì.
### 5.Data Binding.
Data Binding Library là một thư viện hỗ trợ, cho phép bạn ràng buộc các thành phần UI trong layout với các nguồn dữ liệu sử dụng định dạng khai báo (trong xml) thay vì lập trình (code trong file Java).

Ví dụ đoạn code dưới đây gọi findViewById() để tìm một TextView và liên kết nó với thuộc tính userName của biến viewModel:
```java
TextView textView = findViewById(R.id.sample_text);
textView.setText(viewModel.getUserName());
```
Nhưng khi dùng Data Binding thì ta có thể gắn văn bản trong file xml, và điều này loại bỏ sự gọi code Java như ở trên.
```java
<TextView
    android:text="@{viewmodel.userName}" />
```
Data Binding ra đời cho phép chúng ta không phải gọi UI Framework từ các Activitys, làm cho chúng đơn giản và dễ maintain. Điều này cũng làm tăng hiệu suất của ứng dụng và giúp ngăn chặn memory leaks và null poiter exceptions.

Data Binding được sử dụng trong mô hình MVVM.
### 6.Tổng kết.
Như vậy là mình đã trình bày một cách khái quát về các thành phần trong Architechture Components. Một giải pháp cho tương lai để xây dựng một ứng dụng Android mạnh mẽ, dễ dàng test và maintain. Bài viết chỉ là khái quát qua và chưa thể mang đến nội dung chi tiết, chắc chắn còn rất nhiều thiếu sót. Mong những sự góp ý của các bạn! Để hoàn thành bài viết mình đã tham khảo các trang web của Google.
### 7.Tài liệu tham khảo.
1.https://developer.android.com/jetpack/docs/getting-started

2.https://www.youtube.com/watch?v=QVMqCRs0BNA

3.https://www.youtube.com/watch?v=8GCXtCjtg40&t=289s

4.https://www.youtube.com/watch?v=IrKoBFLwTN0