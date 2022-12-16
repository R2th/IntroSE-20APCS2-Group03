Giả sử bạn có 1 lượng dữ liệu thông tin giao dịch khổng lồ, sau nhiều năm lưu trữ, chúng ta phân tích thống kê để cải thiện hệ thống. Trong hàm ý câu này chúng ta cần có Database (cơ sở dữ liệu) và Data Warehouse (kho dữ liệu) để bổ trợ cho nhau.
![](https://images.viblo.asia/8562fd99-2580-4954-99b9-29ecff04cdc6.png)
Sơ đồ xử lý thông thường của data warehouse
## Data Warehouse là gì ?
Với ngành nghề **analysis information** thì data warehouse là kim chỉ nam của nghề (nghề này hiếm và khó, thậm chí cần có kiến thức về machine learning). Kho dữ liệu là 1 **hệ thống** lữu trữ các thông tin kết hợp từ một hay nhiều nguồn khác nhau. Nó được thiết kế chuyên để phân tích, báo cáo, giúp bớt quá trình phân tích thống kê của 1 hệ thống cho 1 tổ chức lớn.

## Bảng so sánh giữa database và data wirehouse

Để dễ dàng hơn cho mọi người về cái nhìn của Data warehouse với cơ sở dữ liệu, mình có tham khảo 1 bảng so sánh sau đây được dịch lại theo ý hiểu của mình.

| Tham số | Database | Data warehouse |
| -------- | -------- | -------- |
| Mục đích	     | Được thiết kế để lưu lại	bản ghi     | Được thiết kế để phân tích     |
|Xử lý	     | Online Transactional Processing (**OLTP**)     | Online Analytical Processing (**OLAP**)     |
|Bảng và Joins	     | bảng và joins các bảng phức tạp, mối quan hệ, chuẩn hóa     | không được chuẩn hóa     |
|Định hướng	     | phục vụ định hướng cho ứng dụng, sản phẩm     | định hướng cho các loại mục đích khác nhau     |
|giới hạn lưu trữ	     | thường giới hạn trong 1 ứng dụng     | lưu trữ dữ liệu từ nhiều nguồn khác nhau     |
|độ khả dụng     | dữ liệu có sẵn từ thời gian thực, cần là có     | được làm mới khi cần thiết từ nhiều nguồn khác nhau, cần thì phải đợi hệ thống chạy tạo lại dữ liệu định kì cần thiết     |
|Sử dụng	     | Kỹ thuật mô hình **ER** được sử dụng    | Kỹ thuật mô hình dữ liệu được sử dụng     |
|Kỹ thuật	     | Capture dữ liệu    | Analyze dữ liệu     |
|Loại dữ liệu	     | Dữ liệu được lưu trữ trong Cơ sở dữ liệu được cập nhật.    | Dữ liệu hiện tại và lịch sử được lưu trữ. Có thể không được cập nhật.     |
|Lưu trữ dữ liệu	     | Phương pháp tiếp cận quan hệ phẳng được sử dụng để lưu trữ dữ liệu.    | Sử dụng phương pháp tiếp cận **đa chiều** và **chuẩn hóa** cho cấu trúc dữ liệu. Ví dụ: Lược đồ sao và bông tuyết.     |
|Loại truy vấn		     | Các truy vấn giao dịch đơn giản được sử dụng.   | Các truy vấn phức tạp được sử dụng cho mục đích phân tích.    |
|Tóm tắt dữ liệu	     | Lưu dữ liệu chi tiết    |  Lưu trữ dữ liệu tóm tắt     |

## Ứng dụng thực tế nó ra sao ?
Giả sử 1 doanh nghiệp có hàng triệu người dùng mỗi ngày như viễn thông X, để hiểu được hành vi người dùng thì doanh nghiệp X này cần thu thập từ vị trí điện thoại, tần suất gọi điện, tần suất sử dụng internet, ..... các dữ liệu này là rất rất lớn. Để tồn tại và tối đa hóa doanh thu thì doanh nghiệp X cần thống kê phân tích những thứ có lợi, có hại từ những dữ liệu đó, doanh nghiệp lúc đó có cái nhìn tổng thể để đưa ra được xu hướng khách hàng, phân phối chuyển giao...

Hay như doanh nghiệp Y chuyên về chăm sóc sức khỏe, data người bệnh là có giá trị khi nó rất lớn, nó có thể là đầu vào của machine learning hoặc AI phân tích dữ liệu báo cáo để có thể đáp ứng khách hàng tốt hơn, hiểu được đa số người dùng muốn gì ?

## Cái nhìn sơ bộ
Giả sử chúng ta có 1 sơ đồ bảng quan hệ cơ sở dữ liệu thông thường được cho là 1 phần database dữ liệu cho data warehouse của chúng ta. 
![](https://images.viblo.asia/f161dc90-7023-4e28-bc8e-2231106c457d.png)

Để tóm tắt những trường mình cần, thống kê, báo cáo định kì mà các sếp quan tâm thì chúng ta có thể truy vấn bình thường từng cái một. Nhưng vấn đề là không nhanh, không filter được đầy đủ khi cần gấp báo cáo về vấn đề X nào đó thì công cụ phân tích data warehouse sẽ phát huy tác dụng (OLAP tools).
![](https://images.viblo.asia/f8ea788a-e722-42f5-8173-08b5d4073627.png)
![](https://images.viblo.asia/7352b199-9971-4b27-86e6-baae6b10499e.png)

Như trên hình chúng ta có thể filter các kiểu truy vấn đa chiều (Dim Date, Dim Product, Dim Customer, DIm Times, ...) kết hợp với các bản ghi sẽ ra được các tổ hợp báo cáo khác nhau rất lơn, trong khi đó truy vấn thông thường như cơ sở dữ liệu sẽ không đáp ứng được.

## Kết luận
Bài viết mang tính chất giới thiệu qua về Data warehouse là gì, có 1 chút hình minh họa để các bạn thấy được mặt mũi của các báo cáo truy vấn đa chiều đơn giản. Tiếp theo mình sẽ đi sâu hơn về demo để tạo được các bản báo cáo như trên.
Demo thực hành với dataware house: [Phân tích Kho dữ liệu (Datawarehouse) bằng OLAP](https://viblo.asia/p/phan-tich-kho-du-lieu-datawarehouse-bang-olap-bJzKmqxDK9N)