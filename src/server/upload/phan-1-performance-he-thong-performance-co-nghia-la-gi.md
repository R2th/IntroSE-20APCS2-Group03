## Performance có nghĩa là gì?

> Hiệu suất là tốc độ đáp ứng một request. Ví dụ trong một ứng dụng Web (dạng client-server), khi có một request đến server thì server sẽ phản hổi lại một response nhanh như thế nào (ví dụ 1ms, 10ms,.. cho một request) được xem là hiệu suất của hệ thống.

<p align="center">
  <img src="https://images.viblo.asia/a13c8b40-9bf6-4fff-bd6e-bc5a5a7c23b7.png" alt="Hệ thống đơn giản" /> 
  <br/>Hình ảnh một hệ thống đơn giản
</p>

### Nguyên nhân phát sinh vấn đề hiệu suất
- Thắt nút cổ chai tại các hàng đợi xử lý (queue network, queue trong OS, queue IO trong database,...)
  + Database
    * Do viết query chưa hiệu quả
    * Tạo schema database chưa tốt
  + Tầng ứng dụng
    * Thuật toán xử lý chậm chạm
    * Sử dụng cấu trúc dữ liệu không hiệu quả
- Chưa áp dụng xử lý đa luồng
- Bị giới hạn về phần cứng (ví dụ như sử dụng Disk HDD để đọc ghi file thay vì SSD)

### Vậy nguyên tắc nâng cấp hệ thống:
- Tăng tính hiệu quả tại các điểm sau:
  + Sử dụng resource sao cho hiệu quả (ví dụ như quản lý tốt việc sử dụng memory, sử dụng HTTP2 thay vì dùng HTTP1.1,...)
  + Viết logic (thuật toán), query tại tầng ứng dụng và database sao cho hiệu quả.
  + Sử dụng cấu trúc dữ liệu và schema hợp lý. Ví dụ nếu thiết kế business tốt thay vì tạo 10 table thì chỉ cần tạo 5 table và như thế câu query cũng đơn giản và nhanh hơn.
  + Sử dụng cache nếu có thể. Ví dụ cache tại phía client, server, database.
- Xử lý đa luồng thay vì xử lý tuần tự.
- Tăng khả năng của phần cứng. Nhiều lúc hệ thống ổn hết rồi mà do phần cứng cùi mía quá làm giảm performance.

> Vậy mục tiêu tối ưu của chúng ta là `làm sao để tăng tốc độ đáp ứng của một request` tức là chúng ta đang làm giảm độ trễ. Và làm sao để `tăng throughput` của hệ thống tức là tăng khả năng xử lý request của hệ thống ví dụ system có thể xử lý 1000 request/1s bây giờ chúng ta tuning thành 10000/1s.

(còn tiếp...)