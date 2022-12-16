## Độ trễ mạng

Cách tối ưu độ trễ của mạng (chúng ta đang xét mô hình client-server):
- Sử dụng kết nối persistent.
- Giảm dung lượng data truyền qua mạng

### Sử dụng kết nối persistent

<p align="center">
  <img src="https://user-images.githubusercontent.com/106718776/204697821-ae2b3fff-540a-459a-af5d-166fc277d12b.png" style="width:500px !important;" /> 
  <br/>
  Hình ảnh tham khảo trên internet
</p>

> Trong hình minh họa trên, chúng ta thấy với kết nốt non-persistent sẽ tốn thời gian nhiều hơn do phải thiết lập lại connection. Vậy chúng ta nên chọn persistent connection đối với các giao thức mạng.

Chúng ta xem xét hệ thống của chúng ta đang sử dụng giao thức mạng nào?
- Http1.0 sử dụng non-persistent connection;
- Http1.1, Http2.0 và [Http/3](https://datatracker.ietf.org/doc/html/rfc9114)  sử dụng persistent connection;

> Nên ưu tiên chon Http2.0 hoặc Http/3 vì nó cho tốc độ tải nhanh hơn Http1.0 và Http1.1

- Nếu là server giao tiếp với server, chúng ta nên sử dụng Http2.0 (thường dùng gRPC) hay sử dụng Message broken (ví dụ RabbitMQ sử dụng giao thức AMQP ) .

### Giảm dung lượng data truyền qua mạng

- Chúng ta sử dụng kỹ thuật caching phía trình duyệt để cache lại các file script, json,... nhằm tăng tốc cho những lần truy cập sau;
- Chúng ta cần `Bundling` và `Minification` các file script trước khi gửi về client;
- Nén dữ liệu trước khi gửi qua mạng.

## Giảm độ trễ của việc truy cập memory

Chúng ta cần làm những việc sau:

- Tránh làm phình bộ nhớ
  + Giữ cho phần code base càng nhỏ càng tốt. Vì khi chạy chương trình phần code base cũng được nạp vào memory. Tuy nhiên ứng dụng của chúng ta phụ thuộc vào framework vậy nên chúng ta khó control độ lớn của code base. Nhưng ở đây mình có một số gợi ý là hãy làm tốt khâu thiết kế kiến trúc và code theo design pattern (nếu đang sử dụng hướng đối tượng).
  + Chúng ta tránh khai báo đối tượng khi không cần thiết để tránh phình Head Memory.
  + Sử dụng tốt pattern dispose, để hủy resource khi không sử dụng.
  + Tránh sử dụng các thư viện ngốn nhiều memory ví dụ khi xử lý excel thì `close xml` ngốn nhiều memory hơn là `aspose`.
- Sử dụng Weak Reference cho các đối tượng lớn
- Chia nhỏ một process lớn thành nhiều process nhỏ.
- Đối với database thì cần chuẩn hóa (normalize) để câu query được tối ưu hơn, vì ít join hơn nên bộ nhớ sử dụng dưới database cũng ít hơn.