Đầu tiên để đánh giá hiệu năng của một hệ quản trị cơ sở dữ liệu, chúng ta cần phải có một tiêu chuẩn nào đó để đánh giá. Và bài viết này mình sẽ trình bài khái quát về chuẩn TPC-C và các vấn đề liên quan đến nó

# TPC-C là gì?
> TPC-C là chuẩn để đánh giá các hệ thống phần cứng và phần mềm hệ quản trị cơ sở dữ liệu quan hệ về khả năng xử lý giao dịch trực tuyến. 
> TPC-C là một khối lượng công việc OLTP.

* Trong đó thuật ngữ OLTP (Online Transaction Processing) là xử lý giao dịch trực tuyến
# Lịch sử phát triển và mục đích ra đời
Tháng 7 năm 1992 TPC-C được phê duyệt và công nhận rộng rãi là chuẩn để đánh giá các hệ thống phần cứng và phần mềm về khả năng xử lý giao dịch trực tuyến.
Mục đích thiết kế ban đầu của TPC-C là xác định tập hợp các yêu cầu chức năng có thể được thực hiện trên nhiều hệ thống xử lý giao dịch trực tuyến không phụ thuộc vào phần cứng
# OLTP (Online Transaction Processing) là gì?
> OLTP (Online Transaction Processing) hoặc xử lý giao dịch trực tuyến, cho phép thực hiện theo thời gian thực, số lượng lớn các giao dịch cơ sở dữ liệu của nhiều người, thường là qua internet. Giao dịch cơ sở dữ liệu là một sự thay đổi, chèn, xóa hoặc truy vấn dữ liệu trong cơ sở dữ liệu.

OLTP được đặc trưng bởi:
* Thực hiện đồng thời nhiều loại giao dịch kéo dài trong 1 diện phức tạp
* Các chế độ thực hiện giao dịch trực tuyến (online) và trì hoãn.
* Nhiều phiên thiết bị đầu cuối trực tuyến.
* Quản lý thời gian thực thi của hệ thống và ứng dụng.
* Đọc/ghi đĩa (disk output/input) đáng chú ý.
* Toàn vẹn giao dịch (tính chất ACID).
* Phân phối không đồng nhất của việc truy cập dữ liệu thông qua khóa chính và khóa thứ cấp.
* CSDL gồm nhiều bảng với một loạt các kích cỡ, thuộc tính và các mối quan hệ khác nhau.
* Tương tranh trong truy cập và cập nhật dữ liệu.

# Đánh giá các giao dịch bởi các người dùng được mô phỏng

![](https://images.viblo.asia/94181ce2-12c0-4a9c-a0e1-110bf495c25e.png)
Mỗi người dùng được mô phỏng thực hiện một chu kỳ gồm: màn hình, thời gian đợi, thời gian phản hồi (RTs) như sau:
1. Chọn một loại giao dịch từ trình đơn (menu) theo phân bố trọng số.
1. Đợi màn hình nhập/xuất được hiển thị.
1. Đo lường thời gian phản hồi của trình đơn (Menu RT).
1. Nhập số các trường đầu vào yêu cầu trên thời gian nhập (Keying Time) tối thiểu đã được định nghĩa.
1. Đợi mã số yêu cầu của trường đầu ra được hiển thị lên màn hình nhập/xuất.
1. Đo lường thời gian phản hồi của giao dịch (Transaction RT).
1. Đợi xác định thời gian nghĩ (Think Time) tối thiểu trong khi màn hình nhập/xuất vẫn được hiển thị.


Transaction - Request Tracker :Ghi lại từng giao dịch trong lịch sử

# Tỷ lệ phần trăm hỗn hợp tối thiểu cho mỗi loại giao dịch
![image.png](https://images.viblo.asia/79ceaeb9-63ad-4a8d-879a-6c26d3175774.png)

# Ràng buộc thời gian chờ và thời gian phản hồi

* Các bước trong trình đơn (menu) là các giao dịch độc lập. Tối thiểu 90% các lựa chọn trong trình đơn (menu) phải có RT của trình đơn (menu) ít hơn 2 giây.
* Đối với mỗi loại giao dịch, thời gian nhập (Keying Time) không đổi và phải đạt tối thiểu là 18s cho New-Order, 3s cho Payment, và 2s cho mỗi Order-Status, Delivery và Stock-Level.
* Tối thiểu 90% từng loại giao dịch phải có thời gian phản hồi của giao dịch (Transaction RT) ít hơn 5s cho mỗi New-Order, Payment, Order-Status, và Delivery, và 20s cho Stock-Level.

Tóm tắt các ràng buộc các giao dịch hỗn hợp, thời gian đợi, và thời gian phản hồi

![image.png](https://images.viblo.asia/300c9103-33c2-4c7f-9653-115d811add92.png)

# Khoảng thời gian đo lường

* Bắt đầu sau khi hệ thống đạt đến trạng thái ổn định.
* Đủ dài để tạo ra kết quả thông qua tái sản xuất mà đại diện của hiệu suất đạt được duy trì trong khoảng thời gian 8 giờ.	
* Mở rộng không gián đoạn tối thiểu là 120 phút.

# Chỉ số tpm-C
> Là số lượng giao dịch Đơn đặt hàng mới được thực hiện mỗi phút.
> Với sự kết hợp bắt buộc với nhiều loại và độ phức tạp giữa các giao dịch, số liệu này mô phỏng chặt chẽ hơn một hoạt động kinh doanh hoàn chỉnh, không chỉ một hoặc hai giao dịch hoạt động máy tính.

**Vì vậy số liệu tpm-C được coi là thước đo thông lượng kinh doanh.**
# Các thành phần của CSDL TPC-C

Các thành phần của CSDL TPC-C được định nghĩa gồm chín bảng riêng lẻ và tách rời như sau
![image.png](https://images.viblo.asia/a6771fed-0246-4d39-82f3-3ee2a0a02107.png)


Công ty bán 100.000 mặt hàng và giữ hàng trong kho. 
Mỗi kho có 10 quận bán hàng và mỗi quận phục vụ 3000 khách hàng.

Các số trong các khối thực thể biểu diễn số dòng trong bảng. Các số này được nhân với W, số kho hàng (số warehouse), để minh họa tỷ lệ CSDL.
Các số bên cạnh mũi tên quan hệ biểu diễn số lượng quan hệ (số trung bình cái con của mỗi cái lớn hơn).
Dấu (+) dùng sau số lượng quan hệ hoặc bảng, minh họa rằng số này bị lệ thuộc vào biến thể nhỏ trong tập hợp CSDL ban đầu trong khoảng thời gian đo như các dòng được thêm hoặc xóa.




-----
# Kết luận
Qua trên mình cũng đã nêu ra các kiến thức cần nắm khi tìm hiểu về chuẩn TPC-C các bạn có thể tham khảo thêm tại trang chủ của TPC http://tpc.org/ 
Bài sau mình sẽ chỉ ra cách và quá trình để tiến hành đo đạt cũng như các thiết lập ban đầu.
Cảm ơn