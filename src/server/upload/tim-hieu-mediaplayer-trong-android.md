# Giới thiệu
Media Player trong Android là một framework hỗ trợ để play những định dạng như video, nhạc, ảnh trong ứng dụng của mình. Bài viết sau đây trọng tâm việc tìm hiểu về MediaPlayer đã hỗ trợ những gì cho việc thực hiện những tác vụ liên quan đến media. MediaPlayer có thể hỗ trợ việc play offline hoặc là online tùy chỉnh nhờ vào những API MediaPlayer.
# Media Player State Diagram
Dưới đây là trạng thái của MediaPlayer sử dụng để có thể hỗ trợ việc play các media một cách tốt nhất:
![](https://images.viblo.asia/9a3c0ecf-05df-4478-b0a7-e3dc4fc2830d.gif)



-----


Chúng ta có thể thấy được các trạng thái sau là các trạng thái mà media có thể ở đó:
1. **Idle** : Trạng thái ban đầu của Media Player. Khi muốn trở về trạng thái ban đầu của MediaPlayer thì có thể sử dụng phương thức **reset()**.
2. **Initialized**: trạng thái đã khởi tạo được dữ liệu bên trong Media Player bằng phương thức **setDataSource(Uri uri)**. Việc truyền vào Uri này có thể là ở local hoặc là ở server đều có thể play được.
3. **End**: Trạng thái kết thúc MediaPlayer khi hàm **release()** được gọi. Đến đây MediaPlayer hoàn toàn bị hủy bỏ khi không sử dụng nữa
4. **Error**: Trạng thái lỗi  nếu việc play có vấn đề gì đó với Uri hoặc việc tương tác với nhạc trên internet gặp vấn đề. Lắng nghe listener OnErrorListener để xử lý khi không thể play nhạc.
5. **Prepared**: Trạng thái đã được chuẩn bị để sẵn sàng để có thể play hoặc là trạng thái khi stop hoặc là seekTo() đến khoảng nào đó trong toàn bộ độ dài của media. Việc đến được trạng thái này chúng ta phải trải qua hàm **prepareAsync()** (không đồng bộ) hoặc là **prepare()** (đồng bộ). Nếu gọi phương thức đồng bộ prepareAsync() thì sẽ có 1 listener được trả về nếu mà quá trình chuẩn bị thành công thì sẵn sàng để play. Chỗ này có thể gửi sự kiện chuẩn bị xong ra ngoài giao diện để cập nhật được giao diện phù hợp.
6. **Started**: Trạng thái khi mà media đang được chạy, lúc này có thể sử dụng **pause()** để tạm dừng nhạc hoặc **stop()** để dừng hẳn nhạc của media. Gọi **isPlaying()** để biết được media có đang được chạy không.
7. **Pause**: Khi media đang chạy, gọi hàm **pause()** để dừng media khi đang phát nhạc. Lúc này trạng thái media đang tạm dừng. Có thể dừng hẳn bằng hàm **stop()** hoặc **start()** để chạy media. Thường dùng cho nút play/pause gọi hàm này để thực hiện việc quản lý media. 
8. **Stop**: Khi đang ở trạng thái dừng hẳn, có thể chạy lại media bằng **prepareAsync()** hoặc là **prepare()** để có thể trở về trạng thái Prepared và chuẩn bị để play lại từ đầu.
9. **Playback Complete**: Trạng thái mà chạy xong media sẽ nhảy vào đây, có thể lắng nghe sự kiện OnCompletionListener của nó để có thể thực hiện chuyển bài hoặc là vẫn play bài đó với các trường hợp của loop media.  
* Ngoài ra còn hàm **seekTo()** để có thể chuyển đến phần mà bạn chọn khi play media. Hàm này có thể được gọi ở nhiều trạng thái khác nhau nên phải chú ý tới từng trạng thái của Media khi gọi hàm này. Việc cho biết chạy đến đâu của tổng số thời gian được trả về thông qua hàm **getCurrentPosition()**. 
# Permission
* Có một số trường hợp sử dung permission WAKE_LOOK để giữ màn hình ở trạng thái on, ví dụ khi sử dụng với play video.
```
<uses-permission android:name="android.permission.WAKE_LOCK" />
```
* Nếu ứng dụng có sử dụng đến media trên mạng internet thì cần cấp quyền INTERNET để có thể tải được về và chạy.
```
<uses-permission android:name="android.permission.INTERNET" />
```
# Callbacks
Những callback trả về cho chúng ta những trạng thái và giá trị của Media Player: 
* setOnPreparedListener(OnPreparedListener): Lắng nghe sự kiện Prepared xong của media để chuẩn bị cho việc play.
* setOnVideoSizeChangedListener(OnVideoSizeChangedListener): Lắng nghe sự kiện thay đổi size của media trong lúc play video.
* setOnSeekCompleteListener(OnSeekCompleteListener): Lắng nghe sự kiện khi di chuyển seekbar hỗ trợ bởi MediaPlayer
* setOnCompletionListener(OnCompletionListener): Lắng nghe sự kiện khi play xong một media, sử dụng để có thể quy định việc tiếp theo nó sẽ làm là play lại hay play bài hát khác.
* setOnBufferingUpdateListener(OnBufferingUpdateListener): Lắng nghe sự kiện thay đổi của bộ đệm khi play media online
* setOnInfoListener(OnInfoListener): Lắng nghe sự kiện khi có thông tin hoặc cảnh báo
* setOnErrorListener(OnErrorListener): Lắng nghe sự kiện nếu xảy ra lỗi khi play media


-----
Trên đây là một số kiến thức của MediaPlayer mà mình tìm hiểu được, hi vọng các bạn sẽ nắm rõ được các trạng thái và các hà cần thiết để các bạn xây dựng được 1 ứng dụng nghe nhạc hoặc play video. Tất nhiên là việc play music sẽ phải thông qua cả service nữa nên các bạn có thể áp dụng service để có thể xây dựng được ứng dụng nghe nhạc cho riêng mình.