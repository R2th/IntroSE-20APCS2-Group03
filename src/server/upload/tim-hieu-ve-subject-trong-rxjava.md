# 1, Định nghĩa
* Trong bài viết này mình sẽ giới thiệu với các bạn về 1 loại đối tượng trong RxJava. Tuy không được thông dụng như Observable hay Observer nhưng lại mạng sức mạnh tổng hợp của cả hai. Đó chính là Subject.
* Nhân tiện mình mới quay lại áp dụng chúng và cũng để ôn tập lại luôn, trong bài viết này mình sẽ giới thiệu với mọi người về các loại Subject trong RxJava. RxJava cung cấp cho chúng ta 4 loại Subject:
    * Publish Subject.
    * Replay Subject.
    * Behavior Subject.
    * Async Subject.
* Subject là đối tượng trong RxJava có thể tương tác với các component khác như 1 Observable và 1 Observer. Nói tóm lại nó mang sức mạnh của cả hai:
    * Vì Subject là Observer nên nó có thể subscribe 1 hoặc nhiều Observable.
    * Vì Subject là Observable nên nó có thể truyền các item tới Observer bằng các re-emmiting hoặc emit new items.
* Tìm hiểu chúng thông qua ví dụ là 1 cách dễ dàng để hiểu.
* Thừa nhận: 
    * Observable: giáo viên. Giáo viên dạy cho học sinh các bài học.
    * Observer: cậu học sinh. Học sinh sẽ theo dõi các bài học của giáo viên.
# 2, Các loại Subject
### 2.1 Publish Subject
* Nếu cậu học sinh vào lớp muộn, cậu ta chỉ muốn lắng nghe tại thời điểm khi cậu ta vào lớp.

![](https://images.viblo.asia/1dfb9769-3a4c-4b92-afb9-357b8bb965d0.png)

### 2.2 Replay Subject
* Nếu cậu học sinh vào lớp muộn, cậu ta muốn nghe lại từ đầu của bài giảng.

![](https://images.viblo.asia/f50dedd5-6e49-4524-b853-b8a6f4297081.png)
### 2.3 Async Subject
* Nếu cậu học sinh vào lớp tại bất cứ 1 thời điểm nào, cậu ta chỉ muốn nghe điều cuối cùng.
![](https://images.viblo.asia/4329603c-7402-45a2-bdc4-cd1fe27514d2.png)
### 2.4 Behavior Subject
* Nếu cậu học sinh vào muộn, cậu ta chỉ muốn nghe điều gần nhất.
![](https://images.viblo.asia/681143fa-5cba-4db6-809e-e3598d4cecbd.png)
# 3, Tổng kết
* Subject tuy ít được sử dụng hơn Observable và Observer nhưng cũng rất mạnh mẽ và hữu ích trong nhiều trường hợp như Publish Subject sử dụng trong Search.
* Hi vọng bài viết ngắn gọn sẽ giúp mọi người hiểu rõ hơn về Subject.