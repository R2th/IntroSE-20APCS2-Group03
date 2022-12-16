Chrome's developer tool cung cấp thông tin để bạn có thể biết rằng điều gì đã làm trang web của bạn bị chậm và làm thế nào để cho nó hoạt động nhanh hơn. Bài viết này sẽ giải thích cho bạn làm thế nào để debug performance issues.
1. Getting started : Có phải "Performance bottleneck" do mạng không ?
2. Tìm nguyên nhân của 1 request bị chậm
3. Network throttling
4. Xem headers request và reponse status
5. Filtering requests
6. Full text search
7. Network round-trips
8. DevTools Network settings
9. Request columns
10. Copy as fetch/cURL
11. Highlight initiators
12. Export and import HAR

### Getting started : Có phải "Performance bottleneck" do mạng không ?
Trước khi xem xét các request do page tạo ra chúng ta cần kiểm trả xem mạng có phải là thứ đang làm cho nó bị chậm hay không. Xử lý CPU nặng cũng là 1 nguyên nhân phổ biến gây ra thời gian tải trang bị chậm. 
Để kiểm tra xem điều gì làm cho page của bạn tải chậm. Đầu tiên bạn open Chrome DevTools bằng cách click chuột phải vào page rồi chọn Inspect. Sau đó chọn Performance tab và click vào Start Profiling and reload page.

*Tóm tắt : Click chuột phải -> Inspect -> Performance tab -> Start Profiling and reload page*

Ví dụ : Youtube homepage 
Trang chủ Youtube dành nhiều thời gian để chạy Javascript và hiển thị giao diện người dùng.

![vib1.png](https://images.viblo.asia/bdb7007c-c63c-44b4-a927-22a68f395d34.png)

Chuyển sang Networks tab, chúng ta có thể thấy rằng documnent request có thể  tăng tốc và gói javascrip có thể tải nhanh hơn. Nhưng so với thời gian 6.5s để thực thi Javascript thì nó không còn quá quan trọng.

![vb2.png](https://images.viblo.asia/afb991b5-2eb9-47e8-9c9b-e3a05767a025.png)

### Tìm nguyên nhân của 1 request bị chậm
Nếu 1 request bị chậm thì máy chủ cần phải phản hồi yêu cầu nhanh hơn hoặc kích thước của reponse cần phải giảm xuống. Để chia nhỏ thời lượng của 1 yêu cầu, hãy di chuột qua cột Waterfall hoặc click vào 1 request và chọn tab Timing. Bằng cách này bạn có thể tìm thấy request có thể chậm do phản hồi mất thời gian để tải xuống hay máy chủ mất nhiều thời gian để gửi phản hồi.

![vb3.png](https://images.viblo.asia/8543e518-e018-476d-a248-f93544966beb.png)

***Nếu 1 phản hồi mất quá nhiều thời gian để tải xuống bạn cần phải thu nhỏ nội dung phản hồi.***

Ví dụ : Nếu 1 request tải chậm do load 1 hình ảnh.
* Cung cấp một định dạng hiện đại như WebP cho các trình duyệt hỗ trợ nó
* Tăng độ nén hình ảnh
* Thay đổi kích thước hình ảnh để nó không lớn hơn mức cần thiết.

***Server phản hồi chậm.***

Để giải quyết các phản hồi chậm của máy chủ, bạn sẽ cần phải xem code Backend của bạn. Nó có thể đang thực hiện công việc không cần thiết hoặc chạy các truy vấn cơ sở dữ liệu chậm.

### Network throttling

Với PC hay laptop của bạn, bạn có thể sử dụng kết nối internet tương đối nhanh. Vì vậy, một hình ảnh 10MB có thể tải nhanh trên máy tính của bạn, nhưng sẽ mất nhiều thời gian trên kết nối 3G. 
Để giúp điều tra hiệu suất dễ dàng hơn, Chrome DevTools bao gồm tùy chọn điều chỉnh mạng giúp tăng độ trễ phản hồi một cách giả tạo và giảm băng thông. Điều này cho phép bạn mô phỏng cách trang web của bạn tải trên kết nối chậm hơn.
Để enable throttling, hãy tuỳ chọn 1 trong những option trong dropdown và click "Disable cache".

![vb4.png](https://images.viblo.asia/0d03a031-9975-4c0d-8625-3ca7aea8baf2.png)

Đây là trang web kết nối nhanh chóng mà không có bất kì điều chỉnh nào.

![vb5.png](https://images.viblo.asia/5a5408e2-ee6f-44f4-a38e-5b53109ca7ea.png)

Và đây là cùng 1 trang web được tải bằng cách cài đặt 3G

![vb6.png](https://images.viblo.asia/365b19f9-605c-4877-a4b0-69068109b8dd.png)

Việc điều chỉnh mạng cho phép bạn xem trang của mình hiển thị dần dần, quan sát thứ tự nội dung được hiển thị.

### Xem request headers và reponse status.
Nhấp vào từng request để xem request header cũng như reponse headers status trả về từ server

![image.png](https://images.viblo.asia/7443409b-5ea6-4930-ac44-fc70f112a67f.png)

### Filtering requests

Nhấp vào funnel icon để tìm kiếm danh sách các yêu cầu hoặc chỉ hiển thị các loại yêu cầu cụ thể.
Bộ lọc tìm kiếm hỗ trợ biểu thức chính quy, vì vậy nếu bạn muốn xem cả tệp CSS và phông chữ, bạn có thể sử dụng / css | woff2 / làm bộ lọc.

![vb7.png](https://images.viblo.asia/fe0aabed-d512-4acd-9e5b-9cb623ab3b55.png)
### Full text search 

Bạn có thể tìm kiếm văn bản phản hồi của tất cả các yêu cầu trang bằng tính năng tìm kiếm. Nhấp vào kính lúp ở bên trái của hộp kiểm "Preserve log" để bắt đầu tìm kiếm.

![image.png](https://images.viblo.asia/b9e8f99c-7480-46f6-8c0e-c888ff6170d9.png)

Việc sử dụng Chrome's developer tool là vô cùng cần thiết nếu bạn nhận được yêu cầu cải thiện performance website của mình. Cảm ơn các bạn đã đọc bài viết, hẹn gặp lại các bạn ở phần 2.

[Link tham khảo](https://www.debugbear.com/blog/devtools-network)