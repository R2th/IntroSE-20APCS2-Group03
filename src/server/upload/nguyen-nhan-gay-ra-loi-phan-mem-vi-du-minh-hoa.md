> Lỗi phần mềm: là sự không khớp giữa chương trình và đặc tả của nó.
## 1. Lỗi phần mềm 
* **Lỗi phần mềm**: là một lỗi, lỗ hổng, thất bại hoặc có lỗi trong một chương trình máy tình hoặc hệ thống - là nguyên nhân PM tạo ra kết quả không chính xác hoặc không mong muốn hoặc vận hành theo cách không được định hướng trước.
* Lỗi phần mềm xuất hiện ở tất cả công đoạn. 
![](https://images.viblo.asia/19112822-3ee5-4fe9-96f5-9dd282d81bfd.PNG)
* Lỗi PM xuất hiện nhiều nhất ở đặc tả:
![](https://images.viblo.asia/524285ab-de9a-4341-aec6-ae4a9759c9d1.png)

## 2. Các thuật ngữ sử dụng
* Defect ( nhược điểm), Fault ( khuyết điểm), Failure ( thất bại)  --> Hệ thống thực sự có vấn đề.
* Anomaly ( sự dị thường), Vatiance( dị biến), Incident ( rắc rối)  --> Lỗi phát sinh nằm ngoài dự án ( hệ quả của chuỗi quá trình không mong đợi).
* Problem: Vấn đề;  Error, bug; lỗi  --> Lỗi của lập trình viên.

## 3. Nguyên nhân gây ra lỗi phần mềm 
1. Lỗi đặc tả: Định nghĩa các yêu cầu bị lỗi, lỗi trong giao tiếp giữa khách hàng và nhà phát triển, vv…
2. Các lỗi thiết kế logic: xảy ra trong quá trình các chuyên gia thiết kế hệ thống
3. Các lỗi lập trình: mã quá phức tạp, không tuân thủ theo các tài liệu hướng dẫn và tiêu chuẩn lập trình
4. Thiếu sót trong quá trình kiểm thử
5. Hạ tầng phức tạp, thay đổi công nghệ, tương tác với nhiều hệ thống, vv…
6. Lỗi từ điều kiện môi trường như: sự bức xạ, nguồn năng lượng, trường điện từ, ô nhiễm môi trường, vv…
## 4. Nguyên nhân làm đặc tả nhiều lỗi
1. Đặc tả không được viết ra
2. Đặc tả không đủ cẩn thận
3. Đặc tả thay đổi
4. Chưa phối hợp tốt trong nhóm
## 5. Ví dụ lỗi do lập trình 
* Chương trình tính tiền lương được đặc tả cho từng
nhân viên theo qui định làm tròn đến hàng đơn vị, với
công thức: 
<div align="center">Lươngi = round(hsli*lcb(1- 0.06),0 ) </div>
* Nhưng khi lập trình: 
<div align="center">Lươngi = round(hsli *lcb(1- 0.06),-2 ) </div>
* Như vậy sẽ dẫn đến sai số sau:
![](https://images.viblo.asia/d16b78d1-86fa-4a7a-825b-edf8a377a3b0.PNG)