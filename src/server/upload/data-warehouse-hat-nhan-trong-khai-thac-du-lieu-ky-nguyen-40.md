Khai thác bất cứ thứ gì đều cần các công cụ hỗ trợ nhằm tăng hiệu quả (ví dụ với khoáng sản sẽ cần các máy đào, máy khoan...), và với khai thác dữ liệu - **Data Mining** cũng không phải ngoại lệ. *"Chiếc máy đào"* dữ liệu được ví là **Data warehouse**, giống như người thợ, có nhiệm vụ lấy tài nguyên (dữ liệu) thô từ nguồn, gọt giũa lại rồi lưu trữ cẩn thận và phân tích ra giá trị của nó.
![](https://a1digihub.com/wp-content/uploads/2019/08/Câu-chuyện-tự-dựng-DATA-WAREHOUSE-A1-digihub-1024x536.png)
# 1. Data Warehouse (DW) là gì?
Data warehouse là một hệ thống lưu trữ dữ liệu theo nhiều mốc lịch sử. Những dữ liệu trong **DW** sẽ được xứ lý, phân tích,... nhằm tạo ra những dự đoán, báo cáo có giá trị cho những tổ chức sở hữu nó.
=> Data warehouse là 1 phần quan trọng với các doanh nghiệp thời kỳ số hoá.

Đặc điểm của **DW**:
- **Subject Oriented**: Không nhằm phục vụ cho những operation như Database, dữ liệu trong DW tập trung xoay quanh subject (vd: sản phẩm, khách hàng, nhà cung cấp,..) nhằm mô hình hoá, phân tích và hỗ trợ việc ra quyết định.
- **Integrated**: Dữ liệu được tích hợp từ các nguồn hỗn tạp như csdl quan hệ, flat files,... nhằm nâng cao hiệu quả của việc phân tích dữ liệu.
- **Time varitant**: Dữ liệu lưu trữ theo chiều thời gian -> Cung cấp góc nhìn theo chiều lịch sử.
- **Non-volatile**: Nghĩa là dữ liệu chỉ có thể thêm vào, không xoá đi. Có được điều này là vì DW là hoàn toàn tách riêng với DB, việc cập nhật/thay đổi thường xuyên của DB không ảnh hưởng đến DW.

Có thể các bạn sẽ đặt ra câu hỏi **Database** cũng lưu trữ được dữ liệu, ngoài khác biệt về chức năng ra thì **DW** còn có gì khác biệt nữa?

# 2. Data Warehouse vs. Database
Khác biệt cơ bản là **Database** phục vụ cho những truy vấn thông thường còn **Data warehouse** với kiến trúc được tối ưu cho những truy vấn xử lý trên lượng lớn dữ liệu phức tạp, đa chiều, đa mức (từ mức tổng quát đến chi tiết) để phù hợp cho nhiệm vụ phân tích và khai thác dữ liệu của doanh nghiệp và data scientists.

||**Database** |	**Data warehouse**
| -------- | -------- | -------- |
Mục đích|	Được thiết kế để lưu lại bản ghi|	Được thiết kế để phân tích
Xử lý|	Online Transactional Processing (OLTP)|	Online Analytical Processing (OLAP)
Bảng và Joins|	bảng và joins các bảng phức tạp, mối quan hệ, chuẩn hóa|	không được chuẩn hóa
Định hướng	phục vụ| định hướng cho ứng dụng, sản phẩm|	định hướng cho các loại mục đích khác nhau
giới hạn lưu trữ|	thường giới hạn trong 1 ứng dụng|	lưu trữ dữ liệu từ nhiều nguồn khác nhau
độ khả dụng|	dữ liệu có sẵn từ thời gian thực, cần là có	|được làm mới khi cần thiết từ nhiều nguồn khác nhau, cần thì phải đợi hệ thống chạy tạo lại dữ liệu định kì cần thiết
Sử dụng	|Kỹ thuật mô hình ER được sử dụng	|Kỹ thuật mô hình dữ liệu được sử dụng
Kỹ thuật	|Capture dữ liệu	|Analyze dữ liệu
Loại dữ liệu	|Dữ liệu được lưu trữ trong Cơ sở dữ liệu được cập nhật.	|Dữ liệu hiện tại và lịch sử được lưu trữ. Có thể không được cập nhật.
Lưu trữ dữ liệu	|Phương pháp tiếp cận quan hệ phẳng được sử dụng để lưu trữ dữ liệu.	|Sử dụng phương pháp tiếp cận đa chiều và chuẩn hóa cho cấu trúc dữ liệu. Ví dụ: Lược đồ sao và bông tuyết.
Loại truy vấn	|Các truy vấn giao dịch đơn giản được sử dụng.	|Các truy vấn phức tạp được sử dụng cho mục đích phân tích.
Tóm tắt dữ liệu	|Lưu dữ liệu chi tiết	|Lưu trữ dữ liệu tóm tắt
Truy cập đồng thời | hỗ trợ nhiều truy cập cùng lúc | Giới hạn số truy cập tại 1 thời điểm, do chỉ tối ưu cho việc 1 nhóm nhỏ người dùng. 
Ứng dụng | *Ví dụ trong healthcare:* lưu trữ thông tin bệnh nhân (chiều cao, cân nặng,...) | *Ví dụ trong healthcare:* lưu trữ chiều cao, cân nặng,... của bệnh nhân theo nhiều mốc thời gian => Đánh giá chế độ dinh dưỡng, dự đoán tương lai.


# 3. Kiến trúc Data Warehouse
Kiến trúc được áp dụng phổ biến được áp dụng cho Data Warehouse là kiến trúc 3 tầng:

![](https://panoply.io/uploads/versions/diagram1---x----750-1087x---.jpg)

* **Bottom Tier**: máy chủ Data Warehouse nhằm trích rút thông tin từ nhiều nguồn khác nhau, sau đó thực hiện các thao tác chuyển đổi, làm sạch, load hay refresh.
* **Middle Tier**: máy chủ OLAP, chuyển đổi dữ liệu thành 1 cấu trúc phù hợp cho các phân tích và truy vấn phức tạp.
* **Top TIer**: Các tool cho phân tích, thống kê, lập báo cáo... ở phía client.

# 4. Điểm mạnh và điểm yếu của D
# 4.1. Điểm mạnh
1. Qua việc tích hợp, **DW** cho phép truy cập nhanh, dễ dàng những dữ liệu từ nhiều nguồn khác nhau.
2. Cung cấp thông tin nhất quán cho những truy vấn phức tạp.
3. Giảm thời gian phân tích và tạo báo cáo.
4. Lưu trữ dữ liệu theo chiều thời gian, giúp người dùng phân tích dữ liệu theo nhiều mốc lịch sử, dự đoán tương lai.

# 4.2. Điểm yếu
1. Không phù hợp cho những dữ liệu phi cấu trúc.
2. Tạo và thêm dữ liệu tốn thời gian, chi phí. 
3. Có thể bị *outdate* nhanh chóng.
4. Khó để modify lại các cài đặt như: kiểu dữ liệu, ranges, schema, indexes,..
5. Không dễ dùng với người dùng phổ thông. Tuy nhiên, đây không phải vấn đề lớn do **DW** thường chỉ phục vụ cho 1 nhóm nhỏ người dùng chuyên biệt.

# 5. Tổng kết
**Data Warehouse** giờ đây đã trở thành một phần quan trọng cho phân tích dữ liệu trong Data Mining, hỗ trỡ các doanh nghiệp trong việc ra những quyết định quan trọng. Vì thế, nó đang được sử dụng rộng rãi trong nhiều lĩnh vực như: tài chính - ngân hàng, kinh doanh buôn bán, quản lý sản xuất,... Với sự phát triển của công nghệ **Cloud Computing** như hiện nay thì trong tương lai gần, hầu hết các **Data Warehouse** sẽ được triển khai trên cloud nhằm tăng tính tiện dụng, ổn định và an toàn hơn. <br>
Cảm ơn các bạn đã đọc đến cuối bài viết.

# Tài liệu tham khảo
- [data-warehouse-tutorial](https://panoply.io/data-warehouse-guide/#data-warehouse-tutorial)
- [www.guru99.com](https://www.guru99.com/database-vs-data-warehouse.html)
- [www.tutorialspoint.com](https://www.tutorialspoint.com/dwh/dwh_overview.htm)