**Trong bài viết này mình sẽ tập trung vào chủ đề tổng quan về Cơ sở dữ liệu.**

Tầm quan trọng và ứng dụng của database:
*Database hay cơ sở dữ liệu là các cụm từ được sử dụng nhiều trong các lĩnh vực dữ liệu, lập trình phần mềm, công nghệ thông tin, website … là thành phần vô cùng quan trọng để xây dựng và phát triển phần mềm, ứng dụng trên nền tảng mobile, PC.*

**Cơ sở dữ liệu (database) là một hệ thống các thông tin có cấu trúc được lưu trữ trên bộ nhớ ngoài, nhằm thoả mãn yêu cầu khai thác thông tin đồng thời của nhiều người sử dụng hay nhiều chương trình ứng dụng với nhiều mục đích khác nhau. 
CSDL bao gồm các loại dữ liệu: âm thanh, văn bản, hình ảnh, … được mã hóa và lưu trữ dưới dạng file cụ thể**

![](https://images.viblo.asia/a8e42e45-2f8b-492b-8deb-d3a04c7bdde0.jpg)


**Phân Loại:**
* Cơ sở dữ liệu dạng file: dữ liệu được lưu trữ dưới dạng các file có thể là text, ascii, *.dbf. Tiêu biểu cho cơ sở dữ liệu dạng file là*.mdb Foxpro
* Cơ sở dữ liệu hướng đối tượng: dữ liệu cũng được lưu trữ trong các bảng dữ liệu nhưng các bảng có bổ sung thêm các tính năng hướng đối tượng như lưu trữ thêm các hành vi, nhằm thể hiện hành vi của đối tượng.
* Cơ sở dữ liệu bán cấu trúc: dữ liệu được lưu dưới dạng XML.

**Thành phần:**
* Thực thể: dữ liệu được lưu trữ trong các bảng dữ liệu gọi là các thực thể.
* Quan hệ: giữa các thực thể này có mối liên hệ với nhau gọi là các quan hệ,mỗi quan hệ có các thuộc tính, trong đó có một thuộc tính là khóa chính.

**Hiệu quả của CSDL:**
* Phản ánh trung thực thực tế.
* Tính an toàn - bảo mật.
* Tính không dư thừa.
* Hiệu suất sử dụng cao.

*Lược đồ CSDL và thể hiện của lược đồ CSDL: Nếu CSDL có nhiều bảng thì cấu trúc các bảng chính là lược đồ CSDL, còn dữ liệu lưu trữ trong các bảng gọi là thể hiện của lược đồ CSDL.*

**Hệ quản trị CSDL:**
 Hệ quản trị CSDL là tập hợp các phần mềm chuyên dụng cho phép người dùng tạo ra, bảo trì và khai thác một CSDL.
 Một Hệ quản trị CSDL phải có ít nhất các thành phần sau:
* 	 Định nghĩa dữ liệu → DDL (Data Definition Language)
* 	 Thêm, sửa, xóa dữ liệu → DML (Data Manipulation Language)
* 	 Truy vấn dữ liệu → SQL (Structured Query Language)
* 	 Quản lý dữ liệu → DCL (Data Control Language) …
 Các hệ quản trị CSDL hiện nay:
	 Access, SQL Server, Oracle, DB2, SQL Lite, …
    
![](https://images.viblo.asia/bcbc1181-d99d-41ec-b17e-67661fafa292.png)
    
**Ưu điểm:**
* 	Quản lý được dữ liệu dư thừa
* 	Đảm bảo tính nhất quán cho dữ liệu
* 	Tạo khả năng chia sẻ dữ liệu nhiều hơn
* 	Cải tiến tính toàn vẹn cho dữ liệu

**Nhược điểm:**
* 	HQT CSDL tốt thì khá phức tạp
* 	HQT CSDL tốt thường rất lớn, chiếm nhiều dung lượng bộ nhớ
* 	Giá cả khác nhau tùy theo môi trường và chức năng
* 	HQT CSDL được viết tổng quát cho nhiều người dùng thì thường chậm

 Mô hình CSDL: Là một tập hợp các công cụ khái niệm để mô tả dữ liệu, mối liên hệ giữa các dữ liệu, ngữ nghĩa của dữ liệu cùng các ràng buộc nhất quán.

* Ví dụ: Để lưu trữ thông tin về SV ATTT gồm các thông tin: họ tên, ngày sinh, điện thoại, email. Ta dùng một bảng có các cột là HT, NS, DT, Email. Bảng này được gọi là mô hình CSDL quan hệ và được viết như sau: SV(HT, NS, DT, Email)*

**Một vài mô hình dữ liệu:**
* Mô hình quan hệ
* Mô hình thực thể liên kết
* Mô hình phân cấp
* Mô hình hướng đối tượng
* Mô hình kho dữ liệu

**Các bước xây dựng một hệ CSDL**
* Mức khái niệm: tìm hiểu thực tế à xác định các đối tượng và các mối quan hệ giữa các đối tượng à Đặc tả thực tế bằng mô hình mức khái niệm (mô hình thực thể)
* Mức Logic: Biểu diễn mô hình khái niệm ở trên thông qua một mô hình dữ liệu như: Mô hình quan hệ, mô hình mạng, mô hình phân cấp…
* Mức vật lý: Sử dụng một hệ quản trị CSDL để cài đặt CSDL trên máy tính và lập trình để quản trị CSDL.

**Bài viết cũng khá dài, và nặng lý thuyết nên mình sẽ tạm thời kết thúc bài viết tại đây, phần tiếp theo mình sẽ đi sâu vào các mô hình thực thể trong Cơ sở dữ liệu.**