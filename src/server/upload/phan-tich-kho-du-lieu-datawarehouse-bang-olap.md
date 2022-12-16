Sau bài đầu tiên [sự khác biệt giữa database và data warehouse](https://viblo.asia/p/su-khac-biet-giua-database-va-data-warehouse-Eb85o92kZ2G), mình đã giới thiệu sự khác nhau giữa database và datawarehouse. Đúng lời hứa, phần này mình đi chi tiết về demo mình đã làm trước đây với các phần mềm có vẻ hơi cũ được thực hiện trên window 7, nhưng đủ dùng và vừa đủ đảm bảo báo cáo chi tiết các bài tập lớn như bộ môn **Kho dữ liệu** mà một số trường đại học đang dạy:
* SQL Server 2008 R2
* Microsoft visual studio 2008

*Import mẫu database  vào SQL 2008 R2 thông qua SQL Server Management
Studio. Bước này các bạn tự tìm hiểu google nhé vì nó khá dễ*

https://drive.google.com/file/d/1TWQOe7-1qfrVKgHwASOOHMUH3nJ77VzX/view?usp=sharing

## Bước 1: Khởi động môi trường làm việc OLAP Analysis Services - BIDS Environment.
* Click **Start Menu** -> Microsoft **SQL Server 2008 R2** -> Click **SQL Server Business Intelligence Development Studio**.

![](https://images.viblo.asia/bf528cea-671e-4d1b-bb21-e411cb98810e.png)

## Bước 2: Khởi động Analysis Services Project
* Click ​ **File** ​ -> ​ **New** ​ -> ​ **Project** ​ -> ​ **Business Intelligence Projects** ​ ->select
**Analysis Services Project** ​ -> Assign Project ​ **Name** ​ -> Click ​ **OK**

![](https://images.viblo.asia/25498170-7d23-4aa0-9e4c-be698be9c184.png)

## Bước 3: Tạo mới Data Source
### 3.1 Thêm dữ liệu vào cần phân tích
* Trong cửa sổ **Solution Explorer** với project đã tạo, chuột phải **Data Source** -> Click **New Data Source**
![](https://images.viblo.asia/2bd00b7c-9284-497e-9ce6-75067a7eebac.png)
### 3.2 Tiếp đến click "New"
![](https://images.viblo.asia/5e3ec27a-0562-47fa-a48d-3e19bef1245b.png)
### 3.3 Chọn database "Sales_DW"
Database này được import vào SQL 2008 R2 trước đó nên có thể xài luôn
![](https://images.viblo.asia/ad004fdb-afa5-4084-9301-246a1cf3b350.png)\
### 3.4 Chọn Option "Inherit" và "Next"
![](https://images.viblo.asia/6db4a9c7-8d21-4332-8a0e-22541329105d.png)

## Bước 4: Tạo mới Data Source View. 
Mục đích để tạo ra một khung nhìn về dữ liệu trực cho project OLAP. Từ đó có thể đưa ra quyết định chính xác xây dựng các khối phục vụ truy vấn.
### 4.1 Trong cửa sổ Solution Explorer chuột phải "Data Source View" -> Click "New Data Source View"
![](https://images.viblo.asia/0992c872-f30f-41c5-bb53-b0b16f699dac.png)
### 4.2 
* chọn **FactProductSales** -> chuyển sang bên mục bên phải.
![](https://images.viblo.asia/11e75c6b-0143-49ac-953f-1a7fd5bf361e.png)
* chọn "Fact Table" ở bên phải (**FactProductSales**) -> Click **Add Related Tables**
![](https://images.viblo.asia/de939c8d-525a-4990-bd5a-a20b8da64b52.png)

kết quả:
![](https://images.viblo.asia/307653d1-ecf6-4ef7-8361-9832e549e8eb.png)
### 4.5 Giờ đây chúng ta đã tạo ra 1 khung nhìn quan hệ dữ liệu giữa các bảng thực tế
![](https://images.viblo.asia/b08ee7ff-521e-4ab2-ae54-c175a38624ac.png)

## Bước 5: Tạo khối cube và thiết lập các "chiều"(Dim) dựa trên bảng có sẵn
![](https://images.viblo.asia/2c976a84-a0b2-4406-a2b8-4eab2096b826.png)
### 5.1 Chọn "Use exissting tables" -> Click Next
![](https://images.viblo.asia/3b855330-b25c-4b36-a49d-8e795d5c13b7.png)
### 5.2 Lựa chọn bảng cần phân tích các thuộc tính giá trị
Chọn** Fact Table Name**  trong **Measure Group Tables (FactProductSales)** ->  Click
**Next**.
### 5.3 Chọn "Measures" trong các list để hiển thị trong cube sau này -> Click Next
![](https://images.viblo.asia/29a4e870-6b1d-48e4-b2cf-55ba97eb30cf.png)
### 5.4 Tiếp đó chúng ta cần xác định chọn các "chiều" (Dim) cần hiển thị của cube
Chọn tất cả **Dimensions** liên quan với **Fact Table** -> Click  **Next**
![](https://images.viblo.asia/f57fa99e-5a71-4628-b17f-fd8dfa0f3a97.png)
### 5.5 Finish
![](https://images.viblo.asia/b4d43424-7c6d-48aa-952a-09484ae2dc2b.png)
### 5.6 Cube đã sẵn sàng và hoàn thành các thiết lập "chiều" và các giá trị của nó
![](https://images.viblo.asia/03789ba8-e7c9-4939-a77b-a60498cdde32.png)

## Bước 6: Lựa chọn các thuộc tính bảng để làm "chiều" hay để làm giá trị "measure"
Kéo và thả **dimension** từ **Table** trong **Data Source View** và thêm vào **Attribute Pane** ở bên trái
![](https://images.viblo.asia/7a955e3e-3028-4968-a318-60a6b5f4cbd9.png)
![](https://images.viblo.asia/5c9d6058-dcf5-4ef5-86d1-e84055ad8dd3.png)

Tương tự **Dim Date**, muốn gì được lấy thậm chí **Dim Customer** 
![](https://images.viblo.asia/0e8da37e-2933-4d77-ab66-2a7bb5328ac2.png)

## Bước 7: Deploy the Cube
Sau khi 1 loạt setting chọn "**chiều**" (Dim) **measure** các loại tùy thuộc bản báo cáo cần dữ liệu gì thì chúng ta đến bước khởi chạy tạo **cube** dựa theo setting.
![](https://images.viblo.asia/dae58542-9de7-4139-9293-0c29cfabac88.png)
### 7.1 Cài đặt các thuộc tính cần thiết cube trong Deployment Properties.
![](https://images.viblo.asia/a0b41c52-9b7b-4036-9cb2-15906b617ef1.png)
### 7.2 Trong "Solution Explorer", chuột phải "Project Name" -- > Click "Deploy"
![](https://images.viblo.asia/5199fe91-1ea3-4803-9b6b-4175501cbd21.png)
### 7.3 Đợi hoàn thành deploy
![](https://images.viblo.asia/b756c233-1a99-4b32-9cda-a6d5fc0fa3b0.png)

## Bước 8: Khởi chạy cube dựa trên thiết lập deployment
![](https://images.viblo.asia/ab31f916-b534-43b6-bdc5-30bf307891da.png)
### 8.1 Click "Run" để chạy "Cube"
![](https://images.viblo.asia/b15b06c7-4dd5-40f0-9b03-2afc6849abf3.png)
![](https://images.viblo.asia/4b1864c3-cc81-4b96-8c4f-6451ef6eceae.png)
![](https://images.viblo.asia/0d114287-beb3-4083-8d0c-136c781d9541.png)

## Bước 9: Phân tích dữ liệu thông qua "Browser"
![](https://images.viblo.asia/1fa4368b-d72b-484e-bb37-dab14c6caf95.png)
### 9.1 Bước này chính là bước tạo ra các bảng báo cáo, dữ liệu báo cáo dựa trên khối đã tạo ra.
Kéo và thả **measures** vào trong **Detail fields**, & Kéo và thả **Dimension Attributes** vào hàng hoặc cột.

Ví dụ: *Để thống kê số lượng Product đã bán theo từng ngày.*
1. **Product Name**  Kéo và thả vào cột. (Thống kê theo product name)
2. **Full Date UK** Kéo và thả vào hàng (Thống kê theo ngày)
3. **FactProductSalesCount** kéo vào mục: **measure in Detail area** (Bảng chính
để thống kê số lượng sản phẩm bán ra theo ngày)
![](https://images.viblo.asia/f8aa0277-b5c5-4ab5-a098-8f81a1009101.png)

## Kết luận
Có rất nhiều sự kết hợp giữa **Dim** và các dữ liệu cần **measure**. Tổng hợp trích xuất báo cáo kiểu dạng như thế này cần rất nhiều trong hệ thống lớn đa dữ liệu khác nhau, các công ty doanh nghiệp lớn nhu cầu rất lớn. Demo này chỉ là đơn giản chưa có sự kết hợp nhiều database. Hi vọng các bạn đọc có chút view gì đó về Datawarehouse.