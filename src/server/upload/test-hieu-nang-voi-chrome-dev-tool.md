## 1. Các loại kiểm thử hiệu năng 
Kiểm thử hiệu năng (Performance Testing) là kỹ thuật kiểm thử nhằm xác định băng thông, khả năng xử lý, khả năng mở rộng hay nói chung là hiệu năng của hệ thống dưới khối lượng truy cập, khối được công việc xác định. Kết quả của kiểm thử hiệu năng phục vụ việc điều tra, đo lường, đánh giá hiệu năng thực của hệ thống.
![](https://images.viblo.asia/565104aa-b25f-41c2-ac3e-76697567c402.png)




| Load test | Stress test | Volume test |Endurance test|Spike Test|
| -------- | -------- | -------- | ---| -------- | -------- |
|Mô phỏng độ chịu tải của hệ thống. Thường là khi hệ thống hoạt động bình thường và khi có tải cao. Nhằm đánh giá sự ổn định khi sản phẩm chạy trong môi trường thực tế.| Mô phỏng hệ thống khi quá tải, xác định khả năng hoạt động, phục hồi, ngưỡng chịu đựng trước khi xảy ra sự cố     | Mô phỏng khả năng xử lý hệ thống đối với một lượng dữ liệu lớn     | Mô phỏng hệ thống hoạt động trong thời gian dài quá đó tìm ra các vấn đề về bộ nhớ, phân mảnh dữ liệu     |Kiểm tra phản ứng của hệ thống khi tải thay đổi đột ngột. Đồng thời cũng kiếm tra khả năng phục hồi của hệ thống khi lượng truy cập giảm | 
|   Mục tiêu đánh giá khả năng đáp ứng hệ thống khi hoạt động bình thường và khi hoạt động tại giờ cao điểm.  |  Mục tiêu chính của Stress Test là tìm ra ngưỡng đỉnh của hệ thống, tại đó nếu vượt ngưỡng đỉnh hệ thống sẽ xảy ra sự cố và không thể đáp ứng dịch vụ     | Mục tiêu bài test là đánh giá các vấn đề làm ảnh hưởng tới hiệu năng hệ thống khi phải xử lý lượng dữ liệu rất lớn     |Mục tiêu đánh giá sự ổn định sản phẩm với lượng người dùng truy cập không đổi trong thời gian dài | Mục tiêu đánh giá khả năng đáp ứng và khả năng phục hồi sau khi tải giảm của hệ thống sau khi tải đột ngột tăng| 
## 2. Thực hiện Load test với Chrome dev tool
**Bước 1**:  Mở Google Chrome ở Chế độ ẩn danh. Chế độ ẩn danh đảm bảo rằng Chrome chạy ở trạng thái sạch. 
Ví dụ: nếu bạn đã cài đặt nhiều tiện ích mở rộng, thì những tiện ích mở rộng đó có thể tạo ra nhiễu trong các phép đo hiệu suất.


**Bước 2:** Nhấn Command + Option + I (Mac) hoặc Control + Shift + I (Windows, Linux) để mở DevTools. Chọn Network -> Clear
![](https://images.viblo.asia/c7e138d1-c410-417a-83f9-adaff04b948d.png)

**Bước 3:** Tải lại trang. Lúc này bạn sẽ thấy các data được trả về và thời gian load trang của hệ thống. 
* Load test chính là thời gian hiển thị dữ liệu đầu tiên đến user hay nói chính xác hơn là thời gian tải khi hệ thống hoạt động bình thường. Khả năng chấp nhận hay UX tốt khi Load = 3-> 5 s, trong trường hợp hệ thống có quá nhiều dữ liệu thì là 6-> 7s. Nếu lâu hơn thì có nghĩ perfomance của hệ thống không tốt cần cải thiện
* Finish thời gian load hết toàn bộ dữ liệu ra màn hình.
  Ví dụ vào màn hình có phân trang, chúng ta chỉ view trang đầu nhưng có những hệ thống nó load hết dữ liệu của các trang sau nên thời gian finish thường lâu hơn. Tuy nhiên cũng cần cải thiện chỗ này để đảm bảo perfomance

![](https://images.viblo.asia/f8b978d3-da02-4981-88f3-ee6bdf9927de.png)

Ngoài ra các bạn có thể vào Lighthhouse để thực hiện run perfomance tự động 
![](https://images.viblo.asia/eb88817d-1c37-42ec-b087-0507c14564ac.png)

Hệ thống sẽ trả về đánh giá về hiệu năng mà hệ thống đáp ứng, ví dụ ở đây mình test cho trang https://viblo.asia/followings thì đánh giá perfomance đạt 42% ngưỡng chấp nhận được.

Nếu hệ thống của bạn chỉ ở mức < 30% thì cần tìm cách cải thiện nhé, bên dưới cũng có những bản report xem phần nào khiến cho perfomance bị chậm. Đối vs các bạn dev thì sẽ phân tích dễ hơn. Dựa vào báo cáo này chúng ta sẽ tìm cách cải thiện hệ thống của mình

![](https://images.viblo.asia/56e8e3b5-a150-4baf-bbef-55511f6c3726.png)

Load test thật dễ với Chrome dev tool phải không? Hy vọng bài viết sẽ giúp ích cho bạn. Ngoài ra để test hiệu năng một cách xịn sò hơn bạn có thể tìm hiểu về sử dụng Jmetter nhé!

***Link tham khảo:*** https://www.stormforge.io/blog/types-performance-testing/