# Sự khác biệt giữa 2 phương thức add() và replace() Fragment trong Android<br>
> ## Có lẽ trong các Android app phát triển hiện nay không thể thiếu thành phần Fragment nó giúp phân đoạn code thành các khối dễ quản lý thay vì dựa vào các lớp Activity lớn, phức tạp<br>
### Vậy khi sử dụng Fragment thì các bạn sẽ biết đến 2 phương thức add() và replace() để thêm 1 Fragment. Vậy sự khác biệt của nó như thế nào cùng tìm hiểu với mình nhé!<br>
#### 1.Add() Fragment:  khi sử dụng add Fragment B lên Fragment A thì A vẫn ở trạng thái onResume() chỉ bị Fragment B đè lên không ảnh hưởng gì. Khi click Back thì Fragment B sẽ bị hủy Fragment A vẫn hoạt động bình thường.<br>

#### 2. Repalce() Fragment: khi sử dụng replace Fragment B lên Fragment A thì Fragment B sẽ thay thế Fragment A và Fragment A sẽ chạy qua các phương thức onPause() -> onStop() -> onDestroyView(), khi nhấn Back hệ thống thì Fragment B sẽ bị hủy và Fragment A sẽ được restore lại-> onCreateView() -> onStart() -> onResume() . => nó sẽ tìm đến cái instance Fragment A.<br>

#### 3. Không bốc phét nữa, để kiểm chứng cho  điều này mình có đặt log, dựa vào ảnh log các bạn sẽ thấy rõ nó chạy như thế nào nhé: !<br>

***Đây là log của Add***<br>
![](https://images.viblo.asia/9a4cc82a-6d46-4af9-a19a-79eb91c8184b.PNG)<br>

***Đây là log của Replace***<br>
![](https://images.viblo.asia/f565ebe7-92f3-4fec-a86e-ade679665526.PNG)<br>

> Link các bạn có thể tham khảo: [Link](https://stackoverflow.com/questions/18634207/difference-between-add-replace-and-addtobackstack)<br>
> Cảm ơn các bạn đã đọc bài viết. Xin chào, hẹn gặp lại ở các bài viết sau :v