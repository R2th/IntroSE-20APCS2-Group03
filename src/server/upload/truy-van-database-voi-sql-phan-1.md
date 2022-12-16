## **I.	Tổng quan về Database**
### 1.	Database là gì?
![](https://images.viblo.asia/21c99265-bec0-4e8f-964b-5537722118a4.png)
-	Cơ sở dữ liệu (Database), viết tắt là CSDL hoặc DB, là một tập hợp các Dữ liệu có quan hệ logic với nhau, có thể dễ dàng chia sẻ và được thiết kế nhằm đáp ứng các nhu cầu sử dụng của một tổ chức, cá nhân nào đó.
-	CSDL là một tập hợp có cấu trúc của những Dữ liệu có liên quan với nhau đuợc lưu trữ trong máy tính. Một CSDL đuợc thiết kế, xây dựng và lưu trữ với một mục đích xác định như phục vụ lưu trữ, truy xuất dữ liệu cho các ứng dụng hay nguời dùng. 
-	Bảng CSDL: Một CSDL thuờng bao gồm một hoặc nhiều bảng (table). Mỗi bảng đuợc xác định thông qua một tên (ví dụ Customers ). Bảng chứa các bản ghi - dòng (record - row), là dữ liệu của bảng.

![](https://images.viblo.asia/8533c3f6-d6b9-40d4-8b25-bdfbf0c95f5f.png)
 

### 2.	Hệ quản trị CSDL
- SQL (Structured Query Language) là ngôn ngữ truy vấn cơ sở dữ liệu thông dụng nhất hiện nay, bạn có thể dùng các lệnh SQL để truy vấn database bất kỳ do hệ quản trị database nào. 
- Máy chủ cơ sở dữ liệu – Database Server (máy chủ phục vụ Cơ sở dữ liệu) là Máy tính chủ mà trên đó có cài đặt phần mềm Hệ quản trị Cơ sở dữ liệu (HQTCSDL). Chúng ta có một số HQTCSDL chẳng hạn như: SQL Server, MySQL, Oracle… 
- Hệ quản trị cơ sở dữ liệu (tiếng Anh: Database Management System – DBMS), là phần mềm hay hệ thống đuợc thiết kế để quản trị một cơ sở dữ liệu. Cụ thể, các chương trình thuộc loại này hỗ trợ khả năng lưu trữ, sửa chữa, xóa và tìm kiếm thông tin trong một cơ sở dữ liệu (CSDL).  
- SQL Server là hệ quản trị database của Microsoft, còn MySQL là hệ quản trị database có mã nguồn mở có thể chạy trên nhiều platform nhu Linux, WinXP...Theo đánh giá của nhiều nguời, SQL Server của Microsoft mạnh hơn, bảo mật tốt hơn nhiều so với MySQL. 
- Hệ quản trị Cơ sở dữ liệu Oracle: là hệ quản trị CSDL mạnh nhất, tốt nhất chạy trên mọi nền tảng. 
### 3.	SQL là gì?
-	SQL ( Structured Query Language - Ngôn ngữ truy vấn cấu trúc) là một chuẩn của ANSI (American National Standards Institute - Viện tiêu chuẩn quốc gia Hoa kỳ) về truy xuất các hệ thống CSDL. Các câu lệnh SQL đuợc sử dụng để truy xuất và cập nhật dữ liệu trong một CSDL.
-	SQL hoạt dộng với hầu hết các chương trình CSDL như MS Access, DB2, Informix, MS SQL Server, Oracle, Sybase v.v...
-	Các thao tác với SQL :

                  •	SQL cho phép bạn truy cập vào CSDL. 

                  •	SQL có thể thực thi các câu truy vấn trên CSDL. 

                  •	SQL có thể lấy dữ liệu từ CSDL. 

                  •	SQL có thể chèn dữ liệu mới vào CSDL. 

                  •	SQL có thể xoá dữ liệu trong CSDL. 

                  •	SQL có thể sửa dổi dữ liệu hiện có trong CSDL.

## II.	Hướng dẫn cài đặt MySQL Server
Mình sẽ hướng dẫn các bạn cài đặt MySQL Community Server – phiên bản miễn phí MySQL dùng để học tập và nghiên cứu. 
### Bước 1: Tải MySQL Community Server về PC
-	Mọi người truy cập vào trang web https://dev.mysql.com/downloads/mysql/ để download phiên bản mới nhất.

![](https://images.viblo.asia/12858b5d-858b-4e87-9594-3108ab1a7afa.png)
-	Tải bản mysql–installer-community-8.0.13.0.msi đã được tích hợp sẵn nhiều tool, việc cài đặt sẽ dễ dàng hơn. 

![](https://images.viblo.asia/2cac6d89-fe66-44d9-9779-60e4fad22bfd.png)

![](https://images.viblo.asia/3614c40d-b92e-48fc-b915-8a4003a4b0ce.png)

-	Sau khi tải về, bạn sẽ có một file .exe trong PC của mình: 

![](https://images.viblo.asia/8c67d051-02d3-4c02-849b-c764d4326e06.png)

### Bước 2: Cài đặt
-	Đầu tiên, bạn chạy file .exe sau đó click chuột vào những chỗ được khoanh tròn trong hình dưới đây: 

![](https://images.viblo.asia/fc61a8d7-1652-4920-ab64-14f50d372222.png)

![](https://images.viblo.asia/cbc7d846-4a55-4093-ae8f-2c9db47f85ad.jpg)

-	 Tại bước này, chúng ta sẽ cài những thư viện cần thiết, nết bạn chọn Next sẽ bị báo lỗi. Hãy chọn Execute để tiến hành cài đặt các thư viện đó.
 
 ![](https://images.viblo.asia/1c64087d-3aec-4630-9364-6981b38a85d8.png)
 
 ![](https://images.viblo.asia/615bedfc-9b79-4a74-97b0-9ae7bb22747e.png)
-	Danh sách các bộ hiển thị sẽ được cài.

 ![](https://images.viblo.asia/f7fea571-2c18-40e3-b3f6-acbe7aa82abd.png)
 
 ![](https://images.viblo.asia/9241d8ac-205f-4d20-a3cf-043c9f2b76b9.jpg)
 
-	Tiếp tục tới phần cấu hình MySQL Server

 ![](https://images.viblo.asia/9e407ba1-008b-4189-8d5d-c36929d61879.jpg)
 
 ![](https://images.viblo.asia/de7ae878-58c6-4195-a284-df7aa7de2712.jpg)
 
  ![](https://images.viblo.asia/cf18e6f0-95d2-42df-a767-cc58a053048f.jpg)
  
   ![](https://images.viblo.asia/b5acd0bc-eb0d-4c94-bac5-5042d2fca19e.jpg)
   
-	Tiếp theo, set password cho tài khoản root. Nên nhập từ 4-32 ký tự bao gồm cả chữ và số.
 
 ![](https://images.viblo.asia/61312703-65cb-47b6-9dac-58860b27d9f8.png)
 
 ![](https://images.viblo.asia/57a0cac7-2761-4b16-b83e-3706f1d3dd0a.jpg)
 
 ![](https://images.viblo.asia/089a5860-92cb-4b38-8f1d-d8da487428ef.jpg)
 
 ![](https://images.viblo.asia/d4b787bc-38e8-4f1b-b06a-5a76b866ce15.jpg)
-	Cấu hình Database:
 
 ![](https://images.viblo.asia/f3536923-1356-474f-ae1f-b0222d6ec909.jpg)
 
 ![](https://images.viblo.asia/b210fffd-021b-4bf4-a98a-40c9769842a5.jpg)
 
-	Nhập vào password đã set ở bước trên và nhấn Check để kiểm tra việc kết nối với MySQL
 
 ![](https://images.viblo.asia/5b77bc33-73db-432f-aa8b-152f975e6da0.jpg)
 
 ![](https://images.viblo.asia/466819ff-5764-4cc4-85b0-e5dd4cff0e83.jpg)
 
 ![](https://images.viblo.asia/e7bbf020-baa6-42d5-839b-9bb128889b48.jpg)
 
 ![](https://images.viblo.asia/4f1dd8a3-2ac7-4046-8fbb-26ba317e2eac.jpg)

 ![](https://images.viblo.asia/7644dd7b-0daf-4c6f-b4b1-ef9ef3d20a26.jpg)
 
### Bước 3: Cấu hình cho MySQL để một user bất kỳ có thể truy cập vào database của mình ở bất kỳ địa chỉ IP nào.
 
 ![](https://images.viblo.asia/98d63974-a19f-4580-8302-50c2f98b10f2.png)
 
 ![](https://images.viblo.asia/ba77894a-b193-4838-ac61-f0ff4f6095b7.png)
-	Cú pháp để cấp quyền là:
GRANT ALL ON *.* to myuser@'%' IDENTIFIED BY 'mypassword';
-	Ví dụ gán quyền truy cập vào User root, từ bất cứ một địa chỉ IP nào.
 
 ![](https://images.viblo.asia/74ecfc01-00fb-47bb-a179-b57eb076ad9a.png)
 
-	Cấp quyền thành công

 ![](https://images.viblo.asia/81f5f6a2-56ff-45db-b81b-b67f47cad58c.png)

### Bước 4: Sử dụng MySQL Workbench
 
 ![](https://images.viblo.asia/f8927285-d9a5-4a21-af54-77c22be2e749.png)
 
 ![](https://images.viblo.asia/200780fd-9bed-4c70-b974-2893c77d06a8.png)
 
- Giao diện làm việc với SQL
 
![](https://images.viblo.asia/c52bf4b4-bc15-467b-9b61-6d0643fde55d.png)

## III. Lời kết
 Ở bài viết này mình đã giúp các bạn hiểu tổng quan về Database nói chung và SQL nói riêng, cách cài đặt MySQL Community Server phục vụ cho quá trình học tập và làm việc. Phần tiếp theo, mình sẽ hướng dẫn chi tiết về cách sử dụng, các lệnh truy vấn dữ liệu với MySQL Server. Rất cảm ơn các bạn đã quan tâm theo dõi.