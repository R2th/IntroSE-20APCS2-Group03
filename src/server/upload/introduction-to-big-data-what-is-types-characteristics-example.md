### What is Data?
Số lượng, ký tự hoặc ký hiệu của các quá trình, ứng dụng được thực hiện bởi máy tính, có thể được lưu trữ và truyền tải dưới dạng tín hiệu điện (electrical signals) và được lưu lại trên các phương tiện ghi từ tính (magnetic media: băng, đĩa mềm,.....), phương tiện chuyển đổi quang học (optical media) hoặc phương tiện chuyển đổi cơ học (mechanical recording media)
### What is Big Data?
Big Data cũng là một dạng dữ liệu nhưng với kích thước khổng lồ. Big Data là một thuật ngữ được sử dụng để mô tả một tập hợp dữ liệu có kích thước khổng lồ và đang tăng theo cấp số nhân theo thời gian. Nói tóm lại, dữ liệu đó quá lớn và phức tạp đến nỗi không có công cụ quản lý dữ liệu truyền thống nào có thể lưu trữ hoặc xử lý nó một cách hiệu quả.

Trong thời đại kỹ thuật số không ngừng lớn mạnh, Big Data được tạo thành từ rất nhiều nguồn khác nhau như từ các trang web, phương tiện truyền thông, máy tính cá nhân, hay các ứng dụng trên di động, các bộ truyền phát dữ liệu,v..v....

Dưới đây là môt vài ví dụ của Big Data: 
1. Sở giao dịch chứng khoán New York sản sinh ra khoảng 1 terabyte dữ liệu giao dịch mới mỗi ngày.

![](https://images.viblo.asia/1c74b616-ff07-4a7b-a96a-d977b3e19418.jpg)
2. Social Media: thống kê chỉ ra rằng 500+ terabyte dữ liệu mới được đưa vào cơ sở dữ liệu của trang truyền thông xã hội Facebook mỗi ngày. Dữ liệu này chủ yếu được tạo ra do user đăng tải lên hình ảnh và video, trao đổi tin nhắn, post bình luận, v.v.

![](https://images.viblo.asia/c0facc8d-419c-4710-8510-6d59d94ae970.jpg)
3. Động cơ máy bay: 1 động cơ Jet của hãng Jetar có thể tạo ra hơn 10 terabyte dữ liệu trong 30 phút thời gian bay. Với nhiều nghìn chuyến bay mỗi ngày, dữ liệu được tạo ra lên tới nhiều Petabyte.

![](https://images.viblo.asia/7b4d65c4-fad6-49b4-8fa1-4ee58d6e5f98.jpg)

### Types Of Big Data
Big Data có thể được tìm thấy ở 3 dạng thức khác nhau như dưới đây:
1. Structured:

Bất kỳ dữ liệu nào có thể được lưu trữ, truy cập và xử lý ở dạng định dạng cố định được gọi là dữ liệu 'có cấu trúc - Structured'. Chỉ trong một khoảng thời gian ngắn, ngành khoa học máy tính đã đạt được những thành tựu lớn hơn về kỹ thuật phát triển trong khi làm việc với dạng thức Structured như thế này . Tuy nhiên, hiện nay, ngày càng có nhiều vấn đề phát sinh khi kích thước của dữ liệu tăng lên rất lớn, kích thước điển hình ngày nay đã đạt tới zettabyte.

Bạn có biết zettabyte lớn đến cỡ nào ? 
10^21 bytes hay 1 tỉ terabytes = 1 zettabyte 

Ví dụ điển hình của dạng thức Big Data Structured là cơ sở dữ liệu - Data base


|Employee_ID| 	Employee_Name| 	Gender 	|Department| 	Salary_In_lacs|
| -------- | -------- | -------- | -------- | -------- |
|2365 |	Rajesh Kulkarni 	|Male 	|Finance|	650000|
|3398 |	Pratibha Joshi |	Female |	Admin| 	650000|
|7465| 	Shushil Roy |	Male |	Admin| 	500000|
|7500| 	Shubhojit Das |	Male 	|Finance| 	500000|
|7699| 	Priya Sane |	Female| 	Finance |	550000|

Tool sử dụng để lưu trữ kiểu dữ liệu Structured Big Data: Oracle, MySQL, SQL Server,v....v...

2. Unstructured:

Bất kỳ dữ liệu nào không có khuôn mẫu xác đinh hoặc cấu trúc được phân loại là dữ liệu phi cấu trúc. Ngoài vấn đề kích thước của dữ liệu là rất lớn, unstructured data còn đặt ra nhiều thách thức về mặt xử lý để người dùng có thể lấy ra giá trị từ nó. Một ví dụ điển hình của dữ liệu phi cấu trúc là dữ liệu không đồng nhất, không có mối quan hệ cơ sở dữ liệu với nhau như văn bản, file ảnh, video, âm thanh,v...v....
Ví dụ của unstructuted data là output trả về khi dùng công cụ Google Search

![](https://images.viblo.asia/0d896090-48af-4bd8-8411-08f459730c23.png)

Tool sử dụng để lưu trữ kiểu dữ liệu Unstructured Big Data: Data Mining, RapidMiner, Knime,v....v...

3. Semi-structured:

Là sự kết hợp của 2 dạng thức Structured data và Unstructured data hay còn gọi là dạng thức dữ liệu bán cấu trúc. 
Ví dụ như XML hay Json, dưới đây là 1 đoạn XML lưu trữ data người dùng 
```
<rec><name>Prashant Rao</name><sex>Male</sex><age>35</age></rec>
<rec><name>Seema R.</name><sex>Female</sex><age>41</age></rec>
<rec><name>Satish Mane</name><sex>Male</sex><age>29</age></rec>
<rec><name>Subrato Roy</name><sex>Male</sex><age>26</age></rec>
<rec><name>Jeremiah J.</name><sex>Male</sex><age>35</age></rec>
```
Data tăng trưởng qua các năm 
![](https://images.viblo.asia/a1d4982b-db8f-4297-adac-0a6aba954aa0.jpg)

Có lưu ý rằng dữ liệu ứng dụng web- web application data là dạng không có cấu trúc- unstructured data, bao gồm log files, transaction history files,v..v.... Các hệ thống OLTP - On-line transactional processing được xây dựng để làm việc với dữ liệu có cấu trúc- structured data, trong đó dữ liệu được lưu trữ trong các mối quan hệ (các bảng), ví dụ máy ATM là một hệ thống OLTP. 

Tool sử dụng để lưu trữ kiểu dữ liệu Semi-structured Big Data: Hadoop là một cái tên nổi bật nhất và phổ biến nhất ngày nay khi lưu trữ Big Data. Để tìm hiểu thêm về Hadoop, bài viết ở phần kế tiếp sẽ mô tả chi tiết cụ thể về cách hoạt động, ưu nhược điểm khi sử dụng Hadoop để lưu trữ Big Data.

### Characteristics Of Big Data
Đặc trưng của Big Data được mô tả bởi 5 yếu tố sau (hay người ta còn gọi là 5V):
* Volume: độ lớn của dữ liệu 

Cái tên Big Data bản thân nó đã chỉ ra mối liên quan đến một kích thước rất lớn. Kích thước của dữ liệu đóng một vai trò rất quan trọng trong việc xác định giá trị của dữ liệu. Ngoài ra, việc một dữ liệu cụ thể có thực sự được coi là Big Data hay không, phụ thuộc vào khối lượng của dữ liệu. Do đó, volume là một đặc điểm cần được xem xét khi xử lý Big Data.

* Variety: độ phong phú, đa dạng của dữ diệu 

Sự đa dạng đề cập đến các nguồn không đồng nhất và bản chất của dữ liệu, cả có cấu trúc và không cấu trúc. Trước đây, spreadsheets và databases là những nguồn data duy nhất được cân nhắc để lưu trữ dữ liệu của hầu hết các ứng dụng. Tuy nhiên ngày nay, dữ liệu dưới dạng email, ảnh, video, thiết bị giám sát, file PDF, âm thanh, v.v ... cũng đang được xem xét trong các ứng dụng phân tích. Sự đa dạng của dữ liệu phi cấu trúc này đặt ra một số vấn đề nhất định cho việc lưu trữ, khai thác và phân tích dữ liệu.

* Velocity: tốc độ xử lý, phân tích dữ liệu 

Thuật ngữ *velocity* dùng để chỉ tốc độ tạo dữ liệu. Dữ liệu được tạo ra và xử lý nhanh như thế nào để đáp ứng được nhu cầu, xác định tiềm năng thực sự trong việc xử lý dữ liệu.

Tốc độ sử lý dữ liệu lớn liên quan đến tốc độ truyền dữ liệu từ các nguồn như business processes, application logs, mạng networks và các trang social media, cảm biến, thiết bị di động, v.v.... Luồng dữ liệu là rất lớn và liên tục không ngừng. 

* Variability: tính biến đổi dữ liệu

Variability đề cập đến sự không nhất quán có thể được hiển thị bởi dữ liệu theo thời gian, do đó tính biến đổi này có thể sẽ ảnh hưởng, gây cản trở quá trình xử lý và quản lý data một cách hiệu quả.

* Veracity: độ tin cậy của dữ liệu

Một trong những tính chất phức tạp nhất của Big Data là độ tin cậy,chính xác của dữ liệu. Với xu hướng ngày càng phát triển của các nền tảng Social Media và Social Network ngày nay, sự gia tăng mạnh mẽ tính tương tác và chia sẻ của người dùng Mobile làm cho bức tranh xác định về độ tin cậy & chính xác của dữ liệu ngày một khó khăn hơn. Bài toán phân tích và loại bỏ dữ liệu thiếu chính xác và nhiễu loạn đang là tính chất quan trọng của Big data. 

![](https://images.viblo.asia/bd6c7a26-f915-4f00-9962-ca20ca781c74.png)

### Benefits of Big Data Processing
Khả năng xử lý Big Data mang lại nhiều lợi ích như:
* Doanh nghiệp có thể sử dụng các nguồn bên ngoài khi đưa ra quyết định. Ví dụ như sử dụng dữ liệu từ các mạng xã hội như Facebook, Twitter cho phép các tổ chức đưa ra chiến lược kinh doanh của mình
* Cải thiện hệ thống chăm sóc khách hàng. Các hệ thống truyền thống ghi nhận phản hồi từ khách hàng đang được thay thế dần bằng các hệ thống mới được thiết kế với công nghệ Big Data. Trong các hệ thống mới này, Big Data và công nghệ xử lý ngôn ngữ tự nhiên đang được sử dụng để đọc và đánh giá phản hồi của người tiêu dùng.
* Xác định sớm các rủi ro có khả năng phát sinh đối với sản phẩm / dịch vụ (nếu có)
* Hiệu quả hoạt động tốt hơn 

Big Data có thể được sử dụng để tạo ra các staging area hoặc landing zone cho dữ liệu mới nhằm xác định data nào nên được lưu trữ ở data warehouse trước khi lưu trữ chúng. 

Để tìm hiểu thêm về Big Data, các bạn có thể tham khảo các nguồn trích dẫn dưới đây.

https://www.guru99.com/what-is-big-data.html

https://www.datamation.com/big-data/structured-vs-unstructured-data.html

https://techblog.vn/oltp-va-olap-co-gi-khac-nhau

https://ehealth.gov.vn/Index.aspx?action=News&newsId=46156