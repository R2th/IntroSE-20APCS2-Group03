Tạo báo cáo bằng Microsoft Excel là một phương pháp được sử dụng khá phổ biến. Tuy nhiên, giờ đây bạn có thể thay thế công cụ này bằng Power BI. Mang lại trải nghiệm trực quan thông qua các biểu đồ, nhũng chức năng thống kê và tính toán đưa ra kết quả nhanh chóng trên nhiều dữ liệu.

## 1. Truy cập và lưu trữ dữ liệu dung lượng lớn ở nhiều định dạng
Power BI có khả năng truy xuất nhiều loại dữ liệu

Power BI cho phép bạn truy cập rất nhiều loại dữ liệu mà Microsoft Excel không thể hỗ trợ. Ngoài ra, các máy tính thường khá khó khăn để mở một file 300 megabyte.csv và nếu bạn thêm các file nhỏ khác sẽ khiến việc kết nối dữ liệu trở nên cực kì gian nan.

Tuy nhiên, Power BI sẽ giúp bạn lưu trữ, kết nối và phân tích mà chỉ cần dùng 50MB bằng thuật toán nén để nhập và lưu trữ dữ liệu trong tệp .PBIX. Những dữ liệu lớn sẽ không cần phải cắt giảm và tổng hợp mà thay vào đó sẽ được nằm trên cùng một tệp để tối ưu việc truy cập.

Bạn còn có thể tùy ý chỉnh sửa dữ liệu như

Tất cả thay đổi và tùy biến bao gồm định dạng, xóa dòng, thêm cột và di chuyển dữ liệu.
Thêm các mối quan hệ giữa các bảng khác nhau.
Thêm các dữ liệu mới được tích hợp trên power BI một cách dễ dàng. Cực kì hiệu quả khi bạn muốn liên kết nhiều dữ liệu lại với nhau.
Power BI sẽ giúp giảm đi rất nhiều những khó khăn khi kết nối dữ liệu so với các phần mềm khác. Bằng thuật toán thông minh giúp bạn ghi nhớ các bước đã làm và tự động lặp lại trong quá trình làm mới dữ liệu.

## 2. Cài đặt phân tích xu hướng theo thời gian
Phân tích xu hướng bằng Power BI mang đến sự tiện lợi và nhanh chóng hơn rất nhiều so với Excel. Các tính năng tích hợp thời gian thông minh bạn sẽ chỉ cần vài giây để xem một lượng dữ liệu khổng lồ. Bạn có thể xem dữ liệu trong Power BI theo các kích thước và thuộc tích khác nhau, bao gồm cả kích thước thời gian.

Cách tạo một phân tích xu hướng theo thời gian trong Power BI

### Bước 1: Đầu tiên, tạo một bảng ngày tháng, sử dụng chức năng “New Table” và thêm vào dòng lệnh: Date=calendarauto(). Điều này sẽ tạo ra một bảng với cột ngày tháng chứa tất cả các ngày dựa vào thông tin trong tệp dữ liệu của bạn.

Ví dụ: Trong tệp của bạn có dữ kiện MinDate (ngày tháng nhỏ nhất) = 1/7/2010 và MaxDate (ngày tháng lớn nhất) = 30/6/2011.  Kết quả bạn nhận được là tất cả các ngày trong khoảng thời gian giữa 1/7/2010 và 30/6/2011.
Lưu ý: Trước khi thực hiện bạn cần có ít nhất 1 tệp dữ liệu có dữ kiện ngày tháng.


### Bước 2: Tạo mối quan hệ giữa dữ liệu của bạn và bảng ngày tháng vừa tạo. Chú ý, dữ liệu ngày tháng của bạn phải đúng định dạng trong Query Editor. Chọn tab Relationship bên trái và kéo dòng Date từ bảng đã tạo vào dòng Date trong dữ liệu của bạn.

![](https://images.viblo.asia/a16ba4c2-b17e-4158-8cd6-55c131aae48f.png)

### Bước 3: Trở lại tab Report, lúc này bạn đã có thể tạo biểu đồ với dữ liệu ngày tháng từ bảng đã tạo và sử dụng để đo lường và phân tích.
![](https://images.viblo.asia/e87e365c-875c-4346-a104-be7c76d9c150.png)

### Bước 4: Click phải vào dữ liệu của bạn, chọn “New measure” nhập vào định dạng bên dưới. Định dạng mới này bây giờ cũng có thể được sử dụng để vẽ biểu đồ với công thức đo lường từng năm đến nay để so sánh hiệu suất giữa các năm.

YTD_Measure = TOTALYTD(sum(Table_Name[Value]),Dim_Date[Date])
![](https://images.viblo.asia/1393ad6c-420f-4d6b-9cf6-72204ef691ed.png)

## 3. Tính năng UX trực quan
Vẻ đẹp của Power BI nằm ở việc nó giúp tạo nên những kết quả trực quan nhất ngay với cả người không có nhiều kiến thức về UX hoặc tính sáng tạo. Chỉ bằng những tính năng kéo thả đơn giản mà bất kì ai cũng có thể sử dụng được.

Power BI giúp bạn tạo ra các lược đồ màu sắc và thương hiệu riêng một cách dễ dàng bằng các chủ đề. Một chủ đề đơn giản là một file dạng .json có nhiều màu sắc trong bảng mã HEX và có thể tùy ý chỉnh sửa. Khi cần sử dụng bạn chỉ việc nhúng các chủ đề này vào và chúng sẽ tạo ra các bảng cũng như biểu đồ tương ứng.

## 4. Các tính năng đám mây mạnh mẽ

Sau khi hoàn tất phân tích của bạn trên Power BI, bạn sẽ cần một cách để phổ biến báo cáo của mình. Đối với Excel, bạn phải gửi email 1 file cực lớn hoặc đặt file vào một thư mục được chia sẻ.
Ngoài ra, Power BI Service còn cung cấp những công cụ xử lý ngay cả khi bạn đã tải dữ liệu lên đám mây.

* Quick Insight: bằng thuật toán mạnh mẽ để nhanh chóng định nghĩa dữ liệu của bạn trên đám mây. Chỉ cần click phải vào tệp dữ liệu và chọn “Quick Insight”, dữ liệu sẽ được phân tích một cách nhanh chóng mà không cần mở nó trên Power BI Desktop.
* Natural Language Query: tính năng cho phép người dùng đặt câu hỏi và nhận được câu trả lời. Đây là tính năng rất hữu ích khi bạn chia sẻ báo cáo cho những người không quen sử dụng Power BI. Thay vì phải tạo các chú thích và hình ảnh mình họa để trả lời tất cả câu hỏi của mọi người.
* Personalized Dashboards: Power BI cho phép tạo những bảng điều khiển có thể lưu trữ trực quan từ các báo cáo khác nhau hoặc toàn bộ. Các bảng điều khiển cũng có thể được dùng để chia sẻ với các người cộng tác khác
* Alerts: Khi một bảng điều khiển đã được tạo, email thông báo có thể được cài đặt trên KPIs. Bằng cách click phải vào biểu đồ trên bảng điều khiển và chọn “Manage alerts”. Tính năng thông báo này khá hữu ích cho nhân viên theo dõi các quy trình kiểm thử hay quản lý hàng tồn kho…
## 
## 5. Tính năng bảo mật hàng

Row Level Security (RLS) là một tính năng tương đối phức tạp khi sử dụng Excel. Một ví dụ thường xuyên sử dụng RLS là đặt bảo mật hàng để đảm bảo rằng các nhân viên chỉ nhìn thấy dữ liệu liên quan đến địa phương của họ.

Để cài đặt RLS, chọn “Manage Roles” bên dưới Security tab của thẻ Modeling. Bạn có thể tạo ra các quyền cho các nhóm khác nhau, sử dụng bộ lọc DAX cho các trường khác nhau. Ví dụ: phân quyền cho Canada sẽ có mục Country được đặt là Canada.

Khi báo cáo được tải lên Power BI Service, những cá nhân hoặc các nhóm Office 365 có thể được thêm vào các quyền khác nhau. Bằng cách sử dụng tính năng Security khi click phải vào báo cáo.


Power BI là một công cụ dễ sử dụng để giúp thúc đẩy các tổ chức theo hướng dữ liệu. Bằng những dịch vụ mạnh mẽ, các doanh nghiệp sẽ không phải phụ thuộc vào IT để thu thập, chuyển đổi và phân tích dữ liệu.

Tự động tích hợp dữ liệu, giảm bớt khó khăn khi kết nối nhiều loại dữ liệu, trực quan hóa báo cáo và dễ dàng tích hợp bảo mật hàng là những lý do mà bạn nên sử dụng Power BI. Ngoài ra, môi trường đám mây với những tính năng như Natural Language Query mang lại sự tiện lợi cho người quản trị.
Ngày nay, các công ty đang dần loại bỏ các báo cáo dạng bảng với số liệu để thay thế bằng các biểu đồ. Chính vì vậy, Power BI sẽ là một trong những công cụ của tương lai, kỷ nguyên của những phân tích.

Đọc thêm các bài viết về Power BI tại: [](http://www.bacs.vn/vi/blog/cong-cu-ho-tro/)