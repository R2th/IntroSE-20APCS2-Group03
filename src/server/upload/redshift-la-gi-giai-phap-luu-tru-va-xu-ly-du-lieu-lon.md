## Lời nói đầu:
Cùng với sự phát triển về công nghệ thông tin và truyền thông thì càng ngày số lượng người sử dụng các trang thương mại điện tử, dịch vụ trực tuyến càng lớn dẫn đến lượng dữ liệu được lưu trữ cũng tăng theo. Do đó xử lý dữ liệu lớn là rất cần thiết. Công  ty mình cũng từng gặp phải vấn đề như vậy, và sau những tìm hiểu và phân tích thì đội ngũ engineer cũng đã đưa ra quyết định sẽ sử dụng một dịch vụ của Amazon là Amazon Redshift- một giải pháp hàng đầu về lưu trữ và xử lý dữ liệu lớn. CÙng mình tìm hiểu về nó nào 😀

![image.png](https://images.viblo.asia/e23c3894-7617-402f-8dbc-e49617e7084f.png)

## Redshift là gì?
* Redshift được base trên PostgreSQL, tuy nhiên không được dùng trong OLTP (On-line transactional processing)
* Redshift là OLAP - On-line analytical processing (dùng cho analytics và data warehousing)
(Bạn có thể tìm hiểu xem OLTP và OLAP là gì [ở đây](https://viblo.asia/p/oltp-va-olap-co-gi-khac-nhau-maGK786BZj2) nhé 😄)
* Lưu trữ dữ liệu dưới dạng cột (Column)
* Hỗ trợ mạn hình SQL interface để tạo các câu query truy vấn
* Amazon Redshift là kho dữ liệu được quản lý và lưu trữ hoàn toàn trên đám mây, có thể mở rộng và tăng tốc độ nhận thông tin chuyên sâu bằng tính năng phân tích nhanh chóng, dễ dàng, bảo mật trên quy mô lớn.
* Amazon Redshift dễ dàng theo dõi và xử lý theo thời gian thực với nội dung phân tích mang tính dự đoán về mọi dữ liệu của bạn trong các cơ sở dữ liệu, kho dữ liệu.
* Theo thống kê của AWS thì có đến hàng triệu khách hàng đang sử dụng Amazon Redshift để chạy các truy vấn phân tích phức tạp và lưu trữ, xử lý dữ liệu từ terabyte đến petabyte.

## Thực trạng và nhu cầu xử lý dữ liệu lớn.
* Hiện tại, lượng truy cập và sử dụng các hệ thống ngày càng tăng dẫn đến lượng dữ liệu các hệ thống cũng tăng theo như Google, Shopee, eBay hay Facebook,...
* Do đó, nhu cầu thực tế về xử lý dữ liệu lớn là cấp thiết đối với cả những hệ thống lớn hoặc hệ thống nhỏ nhưng có lượng dữ liệu lớn. Amazon Redshift là một trong những giải pháp hiệu quả để xử lý và lưu trữ lượng dữ liệu trên đám mây lên tới hàng petabyte.

## Redshift architecture
![image.png](https://images.viblo.asia/f3e08e9a-ea54-4381-b82b-75edeae7a6f2.png)

* Cluster: Đây là thành phần cốt lỗi trong kiến trúc của Redshift. Mỗi Cluster bao gồm một hoặc nhiều nodes thực hiện việc tính toán
* Trong một Cluster sẽ có một hoặc nhiều Database
* Leader node xử lý giao tiếp với các layer bên ngoài, ví dụ như thực hiện query, tổng hợp kết quả
* Compute node: thực thi các câu truy vấn, gửi lại kết quả cho leader node
* Node slices: Mỗi một Compute Node tiếp tục được chia nhỏ ra thành các Node Slice. Mỗi một Node Slice sẽ được phân chia đều CPU, Memory và Storage từ Compute Node đó.
* Backup & Restore, Security VPC/IAM/KMS, Monitoring

## Redshift - Snapshot & DR (Disaster recovery)
* Redshift không có cơ chế "Multi-AZ"
* Bạn cần sử dụng snapshot để backup cluster và store trên S3
* Bạn có thể restore một snapshot ra một cluster mới
* Tạo snapshot có thể tự động hoặc bằng tay
    * Automated: bạn có thể tạo schedule tạo mỗi 8h/mỗi 5GB...
    * Manual:
* Bạn có thể config Amazon Redshift tự động copy snapshots của một Cluster sang một Region mới
![image.png](https://images.viblo.asia/b81193a0-612e-41de-adbe-7ada30b593b4.png)

## Redshift Spectrum là gì
Redshift Spectrum: truy vấn dữ liệu trực tiếp tới Amazon S3 mà không cần load dữ liệu vào các bảng của Redshift.
![image.png](https://images.viblo.asia/66d21213-4cc7-4542-b4cd-9525c8432aed.png)

## Redshift xử lý và lưu trữ dữ liệu như thế nào?
* Amazon Redshift thực hiện phân phối và lưu trữ dữ liệu trên các nút nhỏ (nodes). Redshift sử dụng khoá phân phối (distributionKey) có thể tự định nghĩa để phân phối và lưu trữ vào các nút. 
* Khi thực hiện truy xuất, tìm kiếm Redshift sẽ dựa vào khoá phân phối và các nút. Càng nhiều nút, tốc độ truy xuất càng nhanh, vì các khoảng dữ liệu được chia nhỏ. Việc tìm kiếm trong không gian nhỏ sẽ dễ dàng hơn.
* Ngoài ra, các bảng sẽ được sắp xếp theo khóa sắp xếp (sortKey) có thể tự định nghĩa để tối ưu tìm kiếm cũng như truy vấn tốt nhất.

## Lợi ích khi sử dụng Amazon Redshift.
* Amazon Redshift rẻ hơn gấp 3 lần so với các kho dữ liệu đám mây khác và 10 lần so với cơ sở dữ liệu truyền thống (dưới 1.000 đô la mỗi terabyte/năm). Với tốc độ xử lý nhanh và dễ dàng giúp tăng tối đa trải nghiệm người dùng và khách hàng.
* Lưu trữ hoàn toàn trên đám mây để độ bảo mật và an toàn cao nhất.
* Redshift cung cấp kho lưu trữ dữ liệu lớn lên tới hàng petabyte, không còn gặp vấn đề về thiếu dung lượng lưu trữ.

## Lời kết
Trên đây là những chia sẻ về hiểu biết của mình về Amazon Redshift. Tuy những kiến thức này chưa đầy đủ và cách thể hiện văn của mình chưa được hay và hiệu quả nhưng mong rẳng sẽ cung cấp được phần nào thông tin và kiến thức cho các bạn. Thân ái.
Các bạn có thể tham khảo nhiều hơn theo link này: 
https://viblo.asia/p/aws-redshift-E7bGoxYKv5e2
https://aws.amazon.com/vi/redshift/faqs/