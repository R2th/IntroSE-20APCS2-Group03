## 1. Vì sao cần quét virus ở tầng cloud - File Storage Security  là gì?
![image.png](https://images.viblo.asia/87e5707c-638a-42f9-a6f3-4079a0ab6945.png)
Khi cơ sở hạ tầng cloud tiếp tục phát triển, các kiến trúc ứng dụng cloud-native đã kết hợp các dịch vụ lưu trữ tệp / lưu trữ đối tượng trên cloud vào quy trình làm việc, điều này mở ra một vectơ tấn công mới bởi các tệp tin (file) chứa mã độc. 

Trend Micro Cloud One -File Storage Security bảo vệ quy trình làm việc thông qua các kỹ thuật cải tiến như quét phần mềm độc hại, tích hợp vào quy trình công việc tùy chỉnh và hỗ trợ nhiều nền tảng lưu trữ cloud — giúp doanh nghiệp tiến xa hơn và làm được nhiều việc hơn.
## 2. Cơ chế và cách hoạt động của File Storage Security
![image.png](https://images.viblo.asia/a9e32ef8-4449-46e0-83a5-9b54c5a658e4.png)

### Cơ chế:
- Tự động quét sẽ được trigger khi có file mới được upload lên
- Có thể quét các file cũ đang ở trong bucket trước khi set up service này bằng nhiều cách
- Sau khi các file được quét xong sẽ được gắn tag vào, có thể sử dụng lambda để xử lý dựa vào các tag này

### Xử lý post scan có 2 hướng:
+ Multi-bucket: các file sau khi scan xong sẽ được đưa về 2 nơi khác nhau tùy vào tag là quarantine bucket và clean bucket
+ Single-bucket: xử lý trực tiếp chỉ trên 1 bucket duy nhất

Bạn có thể tham khảo sample code xử lý post scan được chính Trend cung cấp: https://cloudone.trendmicro.com/docs/file-storage-security/post-scan-action-code/
### Các implement/deploy service:
- Deploy sử dụng cloud deployment templates ngay trên AWS kết hợp với Cloud One console do Trend cung cấp
- Sử dụng API do Trend cung cấp để xử lý post-scan

## 3. Giá thành sử dụng thì như thế nào nhỉ

Có 2 hình thức thanh toán
+ Annual subscription: Theo mình tìm hiểu thì contact trực tiếp với bộ phận sale của Trend sẽ có giá đẹp hơn, giá subscribed trên AWS marketplace chỉ đơn giản là tổng các function con của Cloud One. Trên trang chủ Trend thì có tạo 1 form inquires xong bảo sẽ có người gọi điện báo giá cho mình sau khi điền thông tin
+ Thanh toán theo mức độ sử dụng:

File Storage: Per bucket with 21-200 inspected files/hr	$0.4 / unit

File Storage: Per bucket with 201-400 inspected files/hr	$0.6 / unit

File Storage: Per bucket with 401+ inspected files/hr	$1.1 / unit

unit ở đây là bucket/h

Hẹn gặp lại mọi người ở bài viết hướng dẫn sử dụng chi tiết :D

Nguồn: https://cloudone.trendmicro.com/docs/file-storage-security/