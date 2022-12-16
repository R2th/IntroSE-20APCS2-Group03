https://www.guru99.com/etl-vs-elt.html

### ETL là gì?

ETL là tên viết tắt của Extract, Transform và Load. Trong quá trình này, một công cụ ETL trích xuất dữ liệu từ các hệ thống nguồn RDBMS khác nhau sau đó chuyển đổi dữ liệu như áp dụng các biến đổi dữ liệu ( tính toán, nối chuỗi v.v. ) và sau đó tải dữ liệu vào hệ thống Data Warehouse.
ETL là những luồng từ “nguồn” tới ”đích”. Trong quá trình ETL, engine chuyển đổi sẽ xử lý mọi thay đổi dữ liệu.

![](https://images.viblo.asia/9d04947f-bcb4-4456-bb0e-13e8ecb3e249.png)

### Vậy ELT là gì?

ELT là một phương pháp khác để tiếp cận công cụ chuyển động dữ liệu. Thay vì chuyển đổi dữ liệu trước khi viết, ELT cho phép “hệ thống đích” chuyển đổi trước. Dữ liệu đầu tiên được sao chép vào “đích” và sau đó được chuyển đổi tại đó.
ELT thường được sử dụng với các database No-SQL như Hadoop, Data Appliance hoặc Cloud Installation.

![](https://images.viblo.asia/91469f3a-4af4-4339-98ce-32a9c488034d.png)

### Sự khác nhau giữa ETL và ELT

ETL và ELT khác nhau ở những điểm sau:


|  |ETL |ELT|
| -------- | -------- | -------- |
| 1.Quy trình    | Dữ liệu được chuyển đổi từ server staging sau đó được transfer tới Data warehouse DB     | Dữ liệu vẫn còn trong DB của Data warehouse    |
|2.Code Usage    | Được sử dụng cho:-Những biến đổi chuyên sâu về tính toán-Lượng data nhỏ	    | Được sử dụng cho lượng data rất lớn   |
| 3.Biến đổi dữ liệu   | Các biến đổi được thực hiện trong ETL server/staging     | Các biến đổi được thực hiện bên trong “hệ thống đích”    |
| 4.Thời gian load    | Dữ liệu trước tiên được load vào staging sau đó mới load vào “đích”. Cần nhiều thời gian   | Dữ liệu được load vào “đích” chỉ 1 lần sau đó mới biến đổi. Nhanh hơn      |
|5.Thời gian biến đổi     | Quá trình ETL bắt buộc cần quá trình “Tranform” hoàn tất. Khi kích thước dữ liệu tăng lên, thời gian chuyển đổi cũng tăng theo.   | .	Trong quá trình ELT, tốc độ không bao giờ phụ thuộc vào kích thước của dữ liệu.   |
| 6.Thời gian bảo trì     | Nhu cầu bảo trì là rất cao vì cần phải chọn dữ liệu để load và transform  | Nhu cầu bảo trì là rất thấp vì dữ liệu luôn có sẵn    |
| 7.Độ phức tạp khi bắt đầu    | Ở giai đoạn đầu thực hiện rất dễ dàng   | Để thực hiện quá trình ELT, cần phải có những kiến thức rất sâu về các tools và kĩ năng chuyên môn    |
| 8.Hỗ trợ Data warehouse?   | Mô hình ETL được sử dụng cho dữ liệu on-premise, quan hệ và có cấu trúc    | Được sử dụng cho cơ sở hạ tầng cloud có thể support các nguồn dữ liệu có cấu trúc và phi cấu trúc    |
| 9.Hỗ trợ Data Lake   | Không support    | Cho phép sử dụng Data Lake với dữ liệu phi cấu trúc    |
| 10.Độ phức tạp   | Quá trình ETL chỉ load những dữ liệu quan trọng, như đã được xác định trước từ thời điểm design    | Quá trình này bao gồm tất cả quá trình phát triển từ output-backward và load những dữ liệu liên quan    |
|11.Chi phí	  |Chi phí rất cao cho các doanh nghiệp vừa và nhỏ	    | Chi phí đầu vào thấp khi sử dụng các phần mềm online làm Services Platforms |
|12.Lookups     | Trong quá trình ETL, cả 2 bảng Facts và Dimensions cần có sẵn trong Staging     | Tất cả dữ liệu đều sẽ có sẵn vì Extract và Load được thực hiện chỉ trong 1 hành động  |
| 13. Aggregations   |Độ phức tạp tăng lên với dữ liệu thêm vào trong dataset   |Sức mạnh của target platform có thể xử lí một lượng dữ liệu đáng kể 1 cách nhanh chóng    |
| 14.Tính toán    | Ghi đè lên cột đang có hoặc cần cắm cờ và đẩy sang “đích”	    |Dễ dàng thêm cột đã được tính toán vào bảng hiện có.    |
| 15.Maturity     | ETL đã được sử dụng trong hơn 2 thập kỷ. Nó có bộ tài liệu tốt và dễ dàng để thực hành  | Khái niệm tương đối mới và khá phức tạp để triển khai   |
| 16.Hardware   |Hầu hết các tools đều có yêu cầu về hardware riêng biệt, tương đối đắt tiền | Chi phí cho phần cứng hệ thống điện toán đám mây không phải là vấn đề to tát |
|17. Hỗ trợ dữ liệu phí cấu trúc    | Chủ yếu hỗ trợ dữ liệu quan hệ cấu trúc   | Có hỗ trợ sẵn cho dữ liệu phi cấu trúc    |

### Tổng quan lại:

* ETL là viết tắt của Extract, Transform và Load trong khi ELT là viết tắt của Extract, Load, Transform.
* Trước tiên, ETL load data vào staging server sau đó mới mới sang “đích” trong khi ELT load thẳng dữ liệu vào trực tiếp “đích”.
* Mô hình ETL được sử dụng cho dữ liệu on-premises, dữ liệu có cấu trúc và quan hệ trong khi ELT được sử dụng cho các nguồn dữ liệu có cấu trúc và phi cấu trúc trên hệ thống đám mây mở rộng.
* ETL chủ yếu được sử dụng cho một lượng nhỏ dữ liệu trong khi ELT được sử dụng cho lượng dữ liệu lớn.
* ETL không cung cấp hỗ trợ Lake Data trong khi ELT cung cấp hỗ trợ Lake Data.
* ETL rất dễ thực hiện trong khi ELT yêu cầu các kỹ năng thích hợp để thực hiện và duy trì.

Tham khảo : https://www.guru99.com/etl-vs-elt.html