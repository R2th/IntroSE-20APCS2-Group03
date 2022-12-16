Bạn có bao giờ thắc mắc một doanh nghiệp làm sao có thể lưu được tất cả các dữ liệu khổng lồ tới từ các quy trình kinh doanh của mình để phục vụ cho nghiệp vụ phân tích thị trường, hoạch định chiến lược, tạo báo cáo một các hiệu quả, tối ưu nhất –  Kho dữ liệu (Data warehouse) giúp lưu trữ thông tin một các tối ưu nhất.

![](https://images.viblo.asia/c096e1b0-349d-4307-97af-ff70adc3e446.png)

### Data warehourse là gì?
Data Warehouse tạm dịch là kho dữ liệu thường được viết tắt là DW hay DWH.

Về cơ bản có thể hiểu DW là một tập hợp các dữ liệu, thông tin có chung một chủ đề, được tổng hợp từ nhiều nguồn khác nhau trong nhiều mốc thời gian và không chỉnh sửa. Được dùng cho việc hỗ trợ ra quyết định, phân tích dữ liệu và lập báo cáo trong công tác quản lý. 

Hiện nay khái niệm kho dữ liệu được phát triển rộng hơn, nó mô tả tập hợp các công nghệ, phương pháp, kỹ thuật có thể kết hợp với nhau thực hiện các chức năng tích hợp, lưu trữ, xử lý và phân tích dữ liệu để cung cấp thông tin cho người sử dụng. Một kho dữ liệu thường có dung lượng lên đến hàng trăm GB thậm chí tính bằng đơn vị TB.

Quá trình tập hợp và thao tác trên các dữ liệu này có những đặc điểm sau (ACID):
1.  Atomicity (Tính nguyên tử): dữ liệu được tập hợp từ nhiều nguồn khác nhau -> khi tập hợp phải thực hiện làm sạch, sắp xếp, rút gọn dữ liệu.
2. Consistency (Tính nhất quán): chỉ lấy những dữ liệu có ích (các dữ liệu có cùng chủ đề).
3. Isolation (Tính cô lập): Các dữ liệu truy suất không bị ảnh hưởng bởi các dữ liệu khác hoặc tác động lên nhau.
4. Durable (Tính bền vững): Dữ liệu không thể tạo thêm, xóa hay sửa đổi.

### Cấu trúc dữ liệu cho kho dữ liệu

- Lượng dữ liệu trong kho là rất lớn và không có những thao tác như sửa đổi hay tạo mới nên nó cần được tối ưu cho việc phân tích và báo cáo.
- Các thao tác với dữ liệu của kho dựa trên cơ sở Mô hình dữ liệu đa chiều (multidimensional data model), được mô hình hoá vào đối tượng được gọi là data cube.
-  Data cube là trung tâm phân tích, nó bao gồm nhiều dữ kiện (fact) và dữ kiện tạo ra nhiều chiều dữ kiện khác nhau (dimention).

![](https://images.viblo.asia/805db632-f36e-4410-8f89-cd47eb919c12.png)


Ví dụ với kho dữ liệu về các loại phương tiện :

Chúng ta có thể chia làm 3 chiều đơn giản là 

- item (loại phương tiện)
- Time (thời gian sáng chế)
- Location (quốc gia sáng chế)

![](https://images.viblo.asia/7b1d5e0c-9a43-49cd-a230-d65321cf5ca3.jpg)


**Các kiểu dữ liệu trong DW**

1. Một bảng sự kiện (Fact table) là một bảng gồm nhiều phép đo (measure), số liệu (metrics) hoặc sự kiện (fact) của quy trình kinh doanh (business process). Có ba loại dữ kiện:
- Additive

    Dữ kiện bổ sung là Dữ kiện có thể được tổng hợp thông qua tất cả các các Dimension trong bảng Fact.
    
    ![](https://images.viblo.asia/c4c1e39b-3f03-4b03-b04c-277a65d0b213.png)


- Semi-Additive

    Là những sự kiện có thể được tóm tắt cho một số Dimension trong bảng Fact chứ không phải là những bảng khác.
    
     ![](https://images.viblo.asia/a5edd5fd-3a4b-4990-b2b1-9bf4e03fc598.png)


- Non-Additive

    Là những sự kiện không được tóm tắt cho bất kỳ Dimension hiện tại nào trong bảng fact.
    ![](https://images.viblo.asia/0d32e5e2-38f8-4b1e-802f-7e3d8a1ca792.png)

**Các loại bảng Fact (bảng dữ kiện) trong DW**

1. Transaction Fact Tables

- Đây là những bảng dữ kiện thường được sử dụng nhất
    
- Mỗi hàng trong bảng này đại diện cho một sự kiện cụ thể trong quy trình kinh doanh.
- Chứa nhiều khóa ngoại hơn các loại khác vì có mối quan hệ với tất cả các thứ nguyên có thể có (Dimension table).
- Dữ kiện trong các loại bảng này chủ yếu là Additive Facts.

2. Accumulating Snapshot Fact Tables

    Loại bảng Dữ kiện này sẽ đại diện cho toàn bộ vòng đời của quy trình kinh doanh từ đầu đến cuối quy trình (tức là Xử lý đơn hàng bán hàng, Xử lý yêu cầu).
    
    Mỗi bản ghi trong loại bảng này đại diện cho một thực thể của quy trình kinh doanh tương ứng và sau đó bản ghi này sẽ được cập nhật mỗi lần theo trạng thái hiện tại của thực thể.

3. Periodic Snapshot Fact Tables

    Bảng này lưu trữ Snapshot quy trình kinh doanh trong một khoảng thời gian cụ thể, trong bảng Dữ liệu này có thể không ở cấp độ quy trình kinh doanh. Nó tóm tắt hoạt động trong một khoảng thời gian, có thể là tháng, năm hoặc tuần.

Ngoài ra còn một số khái niệm như:

1. Factless Fact table 

    Trong thực tế, có thể có bảng Fact  không chứa phép đo (measure) hay sự kiện (fact) nào. 
    Ví dụ: Bảng dữ liệu đi chơi với crush (không có một dữ kiện nào :disappointed_relieved:)
    
    ![](https://images.viblo.asia/04b4b9bd-d6c8-4fdf-906c-0ba285b92b1d.png)

2. Một bảng Fact bao gồm các sự kiện tổng hợp thường được gọi là bảng tóm tắt (Summary tables).
3. Dimension table

    Là một trong những tập hợp các bảng đồng hành với Fact table.

    Bảng dữ kiện chứa các dữ kiện kinh doanh (hoặc các biện pháp) và các khóa ngoại tham chiếu đến các khóa ứng viên (thường là khóa chính) trong bảng thứ nguyên.

    Trái ngược với bảng dữ kiện, Dimension table chứa các thuộc tính mô tả (hoặc trường) thường là các trường văn bản (hoặc các số rời rạc hoạt động giống như văn bản). Các thuộc tính này được thiết kế để phục vụ hai mục đích quan trọng: hạn chế truy vấn và / hoặc lọc và gắn nhãn tập kết quả truy vấn.

### Ngôn ngữ cho kho dữ liệu

Ngôn ngữ xử lý phân tích trực tuyến (OLAP) ~ SQL và tập trung vào các câu lệnh:
- Thu nhỏ (roll-up): Tập hợp thành những tập có phạm vi lớn hơn VD: tập hợp theo năm thay vì theo quý.
- Mở rộng (drill-down): Chia nhỏ thành nhiều tập dữ liệu VD: Nhóm theo tháng thay vì theo quý.
- Cắt lát (slice): Nhìn theo từng lớp một VD: Từ danh mục bán hàng của Q1,Q2,Q3, Q4 chỉ xem của quý Q1.
- Thu nhỏ (dice): Bỏ bớt một phần của dữ liệu (~ thêm điều kiện trong truy vấn).

### Cấu trúc của hệ thống kho dữ liệu.
Gồm 3 tầng:
- Tầng đáy: Cung cấp dịch vụ lấy dữ liệu từ nhiều nguồn sau đó chuẩn hoá, làm sạch, tối ưu và lưu trữ dữ liệu đã tập trung.
- Tầng giữa: Cung cấp các dịch vụ thực hiện các thao tác với dữ liệu hay là dịch vụ OLAP.
- Tầng trên: Nơi chứa các câu truy vấn, báo cao, phân tích.

### Các loại lược đồ của kho dữ liệu

Có 4 loại lược đồ có sẵn trong kho dữ liệu.

**STAR SCHEMA (Lược đồ hình sao)**

![](https://images.viblo.asia/f4cd48b7-7b05-4b15-b547-92263f2664df.png)

Gồm 1 bảng Fact (bảng sự kiện) nằm ở trung tâm và được bao quanh bởi những bảng Dimension (bảng chiều). Dữ liệu của lược đồ hình sao không được chuẩn hoá. Các câu hỏi nhằm vào bảng Fact và được cấu trúc bởi các bảng Dimension.
- Ưu điểm: Bảng Fact, Dimension được mô tả rõ ràng, dễ hiểu. Bảng Dim là bảng dữ liệu tĩnh, và bảng Fact là dữ liệu động được nạp bằng các thao tác. Khoá của Fact được tạo bởi khoá của các bảng Dim. Nghĩa là khoá chính của các bảng Dim chính là khoá của bảng Fact.

- Nhược: Dữ liệu không được chuẩn hoá.


SNOW FLAKE SCHEMA (Lược đồ bông tuyết)

![](https://images.viblo.asia/148ff16c-466d-44a9-9d1a-e96cb9756108.png)


- Là dạng mở rộng của lược đồ hình sao bằng các bổ sung các Dim.  Bảng  Fact như lược đồ hình sao, bảng Dim được chuẩn hoá. Các chiều được cấu trúc rõ ràng. Bảng Dim được chia thành chiều chính hay chiều phụ.

- Ưu điểm: Số chiều được phân cấp thể hiện dạng chuẩn của bảng Dim.
Nhược: Cấu trúc phi dạng chuẩn của lược đồ hình sao phù hợp hơn cho việc duyệt các chiều.

**GALAXY SCHEMA**

![](https://images.viblo.asia/fa13d7e0-693e-4af3-a101-f117f423a7cf.png)

Chứa nhiều bảng Fact sử dụng chung một số bảng Dim. Lược đồ là sự kết hợp của nhiều data mart (kho dữ liệu có chủ đề, dạng thu nhỏ của kho dữ liệu, kho dữ liệu được chia thành nhiều phần nhỏ khác nhau).


**FACT CONSTELLATION SCHEMA**

![](https://images.viblo.asia/794ff7af-7df3-4a85-a573-9a6f81ec1827.png)

Dimension trong lược đồ được tách thành các Dimension độc lập dựa trên các cấp độ của hệ thống phân cấp.




### Xử lý phân tích trực tuyến (OLAP)

**Business Intelligence (BI)**

BI là quy trình và công nghệ mà các doanh nghiệp dùng để kiểm soát khối lượng dữ liệu khổng lồ, khai phá tri thức giúp cho các doanh nghiệp có thể đưa ra các quyết định hiệu quả hơn cho hoạt động kinh doanh của mình.
Công nghệ BI: Cung cấp một cách nhìn toàn cảnh hoạt động của doanh nghiệp từ quá khứ, hiện tại và các dự án tương lai. Hệ thống BI còn được gọi là Hệ thống hỗ trợ quyết định (DSS).
Qui trình BI là quy trình trích xuất từ cơ sở dữ liệu OLAP và sau đó phân tích dữ liệu >> thông tin có thể dùng để đưa ra kết quả.

**On-line analytical processing (OLAP)**

OLAP là kỹ thuật để truy xuất dữ liệu chủ yếu trong kho dữ liệu. Dữ liệu trong DW được tổ chức dưới dạng các khối dữ liệu đa chiều và OLAP được dùng để phân tích dữ liệu trên từng khối.

### Nguyên lý thiết kế DW

1. Hướng chủ đề: Loại bỏ các dữ liệu không hữu ích cho quá trình phân tích.

2. Tính toàn vẹn: Tích hợp dữ liệu từ nhiều nguồn khác nhau vào một định dạng thống nhất.

3. Tính bất biến: Dữ liệu phải thống nhất theo thời gian (Hạn chế đối đa sửa, xoá) >> phân tích thay đổi theo thời gian.

4. Giá trị lịch sử: Cung cấp dữ liệu tại các thời điểm khác nhau của một thông tin.

**Ba vấn đề chính trong xây dựng DW**

1. Data
        
   -  Cần thông tin gì để hỗ trợ ra quyết định? Ở cấp độ nào?
    
    - Dữ liệu được lấy từ đâu? định dạng như thế nào?
    
    - Độ lớn dữ liệu? Mức độ tăng trưởng dữ liệu như thế nào? cần bao nhiêu không gian để chứa?
2.  Structure

    - Dữ liệu cần được xây dựng theo những chiều nào để phục vụ phân tích?
    
    - Cấu trúc dữ liệu nào là phù hợp với yêu cầu?
    
       - Relational OLAP
       
       - Multi-Dimensional OLAP
        
       - Hybrid OLAP
3.  Process

    - Tiến trình extract-load-transform được thực hiện như thế nào? đặt ở đâu? lập lịch như nào?
    
    - Có những ngoại lệ nào cần xử lý? ở cấp độ nào?



### ETL (Extract - Transform - Load)

Tiến trình ETL hay là tiến trình thu thập và tích hợp dữ liệu

1. Extract: truy cập hệ thống nguồn để trích xuất dữ liệu. (source data)
2. Tranform: Kiểm tra, làm sạch, điều chỉnh phù hợp các yêu cầu của DW (load data)
3. Load: cập nhật DW với dữ liệu được cung cấp từ load data.

![](https://images.viblo.asia/25b8b6ce-38c1-4279-adb4-813c66dc8c14.png)


**Các dạng lưu trữ dữ liệu của Dminsion table**

- Loại 0: Retain Original:

    Đây là phương thức thụ động. Khi có sự thay đổi trên dimension, không có hành động nào xảy ra trên DW. Giá trị chiều được giữ nguyên như tại thời điểm bản ghi được thêm vào lần đầu tiên (không được chỉnh sửa?). Loại này hiếm khi được sử dụng.
- Loại 1: Overwrite

    Ghi đè dữ liệu cũ, không theo dõi dữ liệu lịch sử.
    
    Ưu: Dễ bảo trì
    
    Nhược: Không kiểm tra được dữ liệu lịch sử.
- Loại 2: Add new row

    Theo dõi dữ liệu lịch sử bằng cách tạo ra nhiều bản ghi cho một khoá tự nhiên trong bảng chiều (phân biệt bằng khoá tự nhiên hoặc số phiên bản)
- Loại 3: Add new attribute

    Theo dõi sự thay đổi bằng cách sử dụng các cột riêng biệt. Lưu giá trị lịch sử một cách giới hạn vì giới hạn ở số cột lưu trữ dữ liệu lịch sử. (Bản ghi chứa 1 cột cho giá trị ban đầu, 1 cột cho giá trị hiện tại).
- Loại 4: Add history table

    Sử dụng các bảng history table
    
    Một bảng lưu giá trị hiện tại
    
    Một bản lưu trữ tất cả thay đổi

![](https://images.viblo.asia/ce53ee67-e846-4c4f-a5a4-bf8647c8e058.png)


- Loại 6: Hybrid

    - Kết hợp cách tiếp cận từ loại 1,2,3 (6 = 1+2+3)
    
   - Khi bản ghi lần đầu tiên được thêm vào. Giá trị lịch sử và giá trị hiện tại là giống nhau.

    ![](https://images.viblo.asia/20e85a33-d05b-480e-aba9-b995e7fb0d8e.png)

  -  Khi thay đổi giá trị:

    - Ghi đè current_Flag (cột có giá trị Y/N chỉ định rằng phiên bản có đang được sử dụng) (1)

    - Tạo bản ghi mới để theo dõi lịch sử (2)

    - Lưu trữ giá trị lịch sử trong cột (3)

    ![](https://images.viblo.asia/6e072a21-54a4-4d7c-ba20-411365621a3f.png)


### Bus matrix

Cấu trúc mạch nối (Bus Architecture) là tập các bảng fact và dimension và mối liên kết giữa chúng (theo các tiến trình nghiệp vụ), xây dựng nên các chợ dữ liệu (Data Mart).

Bảng chiều dimension là bảng tra cứu “lookup” trong mô hình dữ liệu đa chiều, chứa dữ liệu văn bản để xác định các định danh identifer trong các bảng sự kiện fact. Dimension xác định WHO, WHAT, WHERE, WHY, HOW của trạng thái của sự kiện được ghi lại trong fact. Dimension được định nghĩa và triển khai một lần, từ đó sử dụng xuyên suốt trong các nghiệp vụ kinh doanh.

Xây dựng kiến trúc nhà kho dữ liệu doanh nghiệp là kết quả của quá trình thu thập yêu cầu. Ma trận được định nghĩa như sau:

Mỗi hàng row đại diện cho một qui trình nghiệp vụ

Mỗi cột column tương ứng một chiều của nghiệp vụ.

Ma trận kết quả thể hiện một bức tranh lớn (không tính đến các yếu tố liên quan đến công nghệ), cho phép xác dịnh và quản lý quá trình phát phát triển một cách dễ dàng. Kimball sử dụng khái niệm bus matrix cung cấp một khuôn khổ framework và một kế hoạch tổng thể để phát triển nhanh theo mô hình Agile, xác định các dimensions chung có thể sử dụng lại, đem lại sự thống nhất về mặt dữ liệu và giảm thời gian delivery.
Mục tiêu của việc xây dựng bus matrix là phải có được tổng quan toàn cảnh và chính xác các tiến trình trong toàn bộ tổ chức. Trong mô hình đa chiều, mỗi tiến trình được mô hình hoá và môt tả thông qua bảng fact và các bảng dimension liên quan.


*Tài liệu tham khảo*

https://faditek.com/nhap-mon-data-warehouse-mo-hinh-du-lieu/
https://oracenter.blogspot.com/2016/11/types-of-facts.html