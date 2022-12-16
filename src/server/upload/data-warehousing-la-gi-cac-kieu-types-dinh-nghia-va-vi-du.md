**Data Warehousing là gì?**



 Data Warehousing  được định nghĩa là một kỹ thuật thu thập và quản lý dữ liệu từ nhiều nguồn khác nhau để cung cấp những hiểu biết nghiệp vụ có ý nghĩa. Nó là sự pha trộn của các công nghệ và các thành phần hỗ trợ việc sử dụng dữ liệu chiến lược.

Nó là bộ lưu trữ điện tử lưu trữ một số lượng lớn thông tin của doanh nghiệp, được thiết kế để truy vẫn và phân tích thay vì xử lý giao dịch. Đó là một quá trình chuyển đổi dữ liệu thành thông tin và cung cấp cho người dùng kịp thời để tạo sự khác biệt.
Trong bài này, các bạn sẽ tìm hiểu:


**Data Warehousing là gì?**
 
 
**Lịch sử của Datwarhouse**


**Làm thế nào Datwarhouse hoạt động?**



**Các loại  Data Warehousing**



**Các giai đoạn chung của  Data Warehousing**


**Các thành phần của  Data Warehousing**


**Ai cần  Data Warehousing?**


 **Data Warehousing được sử dụng để làm gì?**
 
 
**Các bước để cài đặt  Data Warehousing**


**Thực tiễn tốt nhất để cài đặt  Data Warehousing**


**Tại sao chúng ta cần  Data Warehousing? Ưu điểm & nhược điểm**


**Tương lai của Data Warehousing**


**Các công Công cụ kho dữ liệu**



Cơ dữ liệu hỗ trợ ra quyết định (Data Warehouse) được duy trì tách biệt với cơ sở dữ liệu hoạt động của tổ chức. Tuy nhiên, Data Warehouse không phải là một sản phẩm mà là một môi trường. Đây là một cấu trúc kiến trúc của một hệ thống thông tin cái mà  cung cấp cho người dùng thông tin hỗ trợ quyết định hiện tại và lịch sử cái mà  khó truy cập hoặc hiện diện trong kho dữ liệu vận hành truyền thống.

Data warehouse là cốt lõi của hệ thống BI được xây dựng để phân tích và báo cáo dữ liệu.

Bạn có biết rằng một cơ sở dữ liệu 3NF được thiết kế  cho một hệ thống kiểm kê có các bảng liên quan với nhau. Ví dụ: một báo cáo về thông tin hàng tồn kho hiện tại có thể bao gồm hơn 12 điều kiện tham gia. Điều này có thể  làm chậm thời gian phản hồi của truy vấn và báo cáo một cách nhanh chóng. Kho dữ liệu cung cấp một thiết kế mới có thể giúp giảm thời gian phản hồi và giúp tăng  hiệu suất của các truy vấn cho báo cáo và phân tích.

Hệ thống Data Warehousing còn được gọi bằng tên sau:



Hệ thống hỗ trợ quyết định (DSS)
Hệ Thống Điều Hành Thông Tin
Hệ thống thông tin quản lý
Giải pháp kinh doanh thông minh
Ứng dụng phân tích
Kho dữ liệu
![](https://images.viblo.asia/a86cae52-f229-481f-93e0-57cf28c53bdf.png)

**Lịch sử của Datwarhouse**


Datwarhouse mang lại lợi ích cho người dùng để hiểu và nâng cao hiệu suất của tổ chức của họ. Nhu cầu lưu trữ dữ liệu phát triển khi các hệ thống máy tính trở nên phức tạp hơn và cần thiết để xử lý lượng thông tin ngày càng tăng. Tuy nhiên, Data Warehousing không phải là một điều mới.

Dưới đây là một số sự kiện quan trọng trong quá trình phát triển của Kho dữ liệu

1960- Dartmouth và General Mill trong một dự án nghiên cứu chung, phát triển các khía cạnh và sự kiện.
1970- Một Nielsen và IRI giới thiệu các bảng dữ liệu đa chiều cho doanh số bán lẻ.
1983- Tera Data Corporation giới thiệu một hệ thống quản lý cơ sở dữ liệu được thiết kế đặc biệt để hỗ trợ quyết định
Data Warehousing  bắt đầu vào cuối những năm 1980 khi công nhân của IBM Paul Murphy và Barry Devlin phát triển Kho dữ liệu kinh doanh.
Tuy nhiên, khái niệm thực sự được đưa ra bởi Inmon Bill. Ông được coi là cha đẻ của kho dữ liệu. Ông đã viết về một loạt các chủ đề để xây dựng, sử dụng và bảo trì kho hàng & Nhà máy thông tin doanh nghiệp.


**Làm thế nào Datwarhouse hoạt động?**



Data Warehousing hoạt động như một kho lưu trữ trung tâm nơi thông tin đến từ một hoặc nhiều nguồn dữ liệu. Dữ liệu chảy vào kho dữ liệu từ hệ thống giao dịch và các cơ sở dữ liệu quan hệ khác.

Dữ liệu có thể là:

Cấu trúc
Bán cấu trúc
Dữ liệu phi cấu trúc
Dữ liệu được xử lý, chuyển đổi và nhập dữ liệu để người dùng có thể truy cập dữ liệu đã xử lý trong Kho dữ liệu thông qua các công cụ Business Intelligence, SQL client và bảng tính. Kho dữ liệu hợp nhất thông tin đến từ các nguồn khác nhau vào một cơ sở dữ liệu toàn diện.

Bằng cách hợp nhất tất cả các thông tin này ở một nơi, một tổ chức có thể phân tích khách hàng của mình một cách toàn diện hơn. Điều này giúp đảm bảo rằng nó đã xem xét tất cả các thông tin có sẵn. Kho dữ liệu làm cho khai phá dữ liệu khả thi. Khai phác dữ liệu đang tìm kiếm các mẫu trong dữ liệu có thể dẫn đến doanh thu và lợi nhuận cao hơn.


**Các loại kho dữ liệu**
Ba loại kho dữ liệu chính là:

**1. Kho dữ liệu doanh nghiệp:**

Kho dữ liệu doanh nghiệp là một kho tập trung. Nó cung cấp dịch vụ hỗ trợ quyết định trên toàn doanh nghiệp. Nó cung cấp một cách tiếp cận thống nhất cho tổ chức và  dữ liệu đại diện . Nó cũng cung cấp khả năng phân loại dữ liệu theo chủ đề và cấp quyền truy cập theo các bộ phận đó.

**2. Lưu trữ dữ liệu hoạt động:**

Kho lưu trữ dữ liệu hoạt động, còn được gọi là ODS, không có gì ngoài kho lưu trữ dữ liệu cần thiết khi cả kho dữ liệu và hệ thống OLTP không hỗ trợ các tổ chức báo cáo nhu cầu. Trong ODS, kho dữ liệu được làm mới theo thời gian thực. Do đó, nó được ưa thích rộng rãi cho các hoạt động thường ngày như lưu trữ hồ sơ của Nhân viên.

**3. Dữ liệu cục bộ:**
 


Một dữ liệu cục bộ  là một tập hợp con của kho dữ liệu. Nó được thiết kế đặc biệt cho một ngành kinh doanh cụ thể, chẳng hạn như bán hàng, tài chính, bán hàng hoặc tài chính. Trong một dữ liệu cục bộ độc lập, dữ liệu có thể thu thập trực tiếp từ các nguồn.

**Các giai đoạn chung của Kho dữ liệu**

Trước đó, các tổ chức bắt đầu sử dụng kho dữ liệu tương đối đơn giản. Tuy nhiên, theo thời gian, việc sử dụng kho dữ liệu tinh vi hơn đã bắt đầu.

Sau đây là các giai đoạn sử dụng chung của kho dữ liệu:

**Cơ sở dữ liệu hoạt động ngoại tuyến:**

Trong giai đoạn này, dữ liệu chỉ được sao chép từ một hệ thống hoạt động sang một máy chủ khác. Theo cách này, tải, xử lý và báo cáo dữ liệu được sao chép không ảnh hưởng đến hiệu suất của hệ điều hành.

**Kho dữ liệu ngoại tuyến:**

Dữ liệu trong Datwarhouse thường xuyên được cập nhật từ Cơ sở dữ liệu hoạt động. Dữ liệu trong Datwarhouse được ánh xạ và biến đổi để đáp ứng các mục tiêu của Datwarhouse.

**Kho dữ liệu thời gian thực:**

Trong giai đoạn này, kho dữ liệu được cập nhật bất cứ khi nào có giao dịch diễn ra trong cơ sở dữ liệu hoạt động. Ví dụ, hệ thống đặt vé máy bay hoặc đường sắt.

**Kho dữ liệu tích hợp:**

Trong giai đoạn này, Kho dữ liệu được cập nhật liên tục khi hệ thống vận hành thực hiện giao dịch. Sau đó, Datwarhouse tạo ra các giao dịch được chuyển trở lại hệ thống vận hành.
 

**Các thành phần của kho dữ liệu**
Bốn thành phần của Kho dữ liệu là:

**Trình quản lý tải**: Trình quản lý tải còn được gọi là thành phần phía trước. Nó thực hiện với tất cả các hoạt động kết hợp với việc trích xuất và tải dữ liệu vào kho. Các hoạt động này bao gồm các phép biến đổi để chuẩn bị dữ liệu cho việc nhập vào kho dữ liệu.****

**Quản lý kho**: Quản lý kho thực hiện các hoạt động kết hợp việc quản lý dữ liệu trong kho. Nó thực hiện các hoạt động như phân tích dữ liệu để đảm bảo tính nhất quán, tạo các chỉ mục và khung nhìn, tạo ra denormalization và aggregations, chuyển đổi và hợp nhất dữ liệu nguồn và lưu trữ và sao lưu dữ liệu.

**Trình quản lý truy vấn**: Trình quản lý truy vấn còn được gọi là thành phần phụ trợ. Nó thực hiện tất cả các hoạt động liên quan đến việc quản lý các truy vấn của người dùng. Các hoạt động của các thành phần kho dữ liệu này là các truy vấn trực tiếp đến các bảng thích hợp để lên lịch thực hiện các truy vấn.

**Công cụ truy cập của người dùng cuối**:

Điều này được phân loại thành năm nhóm khác nhau như

1. Báo cáo dữ liệu 
2.  Công cụ truy vấn 
3. Công cụ phát triển ứng dụng 
4. Công cụ EIS
5. Công cụ OLAP và công cụ khai thác dữ liệu.

**Ai cần kho dữ liệu?**


Kho dữ liệu là cần thiết cho tất cả các loại người dùng như:

Những người ra quyết định dựa vào khối lượng dữ liệu


Người dùng sử dụng các quy trình phức tạp, tùy chỉnh để lấy thông tin từ nhiều nguồn dữ liệu.


Nó cũng được sử dụng bởi những người muốn công nghệ  truy cập dữ liệu đơn giản

Nó cũng cần thiết cho những người muốn có một cách tiếp cận có hệ thống để đưa ra quyết định.

Nếu người dùng muốn hiệu suất nhanh trên một lượng dữ liệu khổng lồ cần thiết cho các báo cáo, lưới hoặc biểu đồ, thì kho dữ liệu chứng tỏ hữu ích.
Kho dữ liệu là bước đầu tiên Nếu bạn muốn khám phá 'các mẫu ẩn' của luồng dữ liệu và nhóm.
 
**Kho dữ liệu được sử dụng để làm gì?**


Ở đây, hầu hết các lĩnh vực phổ biến  sử dụng kho dữ liệu:

**Hãng hàng không:**

Trong hệ thống Hàng không, nó được sử dụng cho mục đích hoạt động như phân công phi hành đoàn, phân tích lợi nhuận của tuyến, chương trình khuyến mãi khách hàng thường xuyên, v.v.

**Ngân hàng:**

Nó được sử dụng rộng rãi trong lĩnh vực ngân hàng để quản lý các tài nguyên có sẵn trên bàn một cách hiệu quả. Một số ngân hàng cũng được sử dụng để nghiên cứu thị trường, phân tích hiệu suất của sản phẩm và hoạt động.

**Chăm sóc sức khỏe:**

Ngành chăm sóc sức khỏe cũng sử dụng kho dữ liệu để chiến lược và dự đoán kết quả, tạo báo cáo điều trị cho bệnh nhân, chia sẻ dữ liệu với các công ty bảo hiểm, dịch vụ hỗ trợ y tế, v.v.

**Khu vực công cộng:**

Trong khu vực công, kho dữ liệu được sử dụng để thu thập thông tin tình báo. Nó giúp các cơ quan chính phủ duy trì và phân tích hồ sơ thuế, hồ sơ chính sách y tế, cho mọi cá nhân.

**Lĩnh vực đầu tư và bảo hiểm:**

Trong lĩnh vực này, các kho chủ yếu được sử dụng để phân tích các mẫu dữ liệu, xu hướng của khách hàng và để theo dõi các biến động của thị trường.

**Chuỗi cửa hàng bán lẻ:**

Trong các chuỗi cửa hàng bán lẻ, kho dữ liệu được sử dụng rộng rãi để phân phối và tiếp thị. Nó cũng giúp theo dõi các mặt hàng, mô hình mua hàng của khách hàng, chương trình khuyến mãi và cũng được sử dụng để xác định chính sách giá.

**Viễn thông:**

Một kho dữ liệu được sử dụng trong lĩnh vực này để quảng bá sản phẩm, quyết định bán hàng và đưa ra quyết định phân phối.

Ngành công nghiệp khách sạn:

Ngành này sử dụng dịch vụ kho để thiết kế cũng như ước tính các chiến dịch quảng cáo  của họ, nơi họ muốn nhắm khách hàng mục tiêu dựa trên phản hồi và mô hình du lịch của họ.

Các bước để triển khai kho dữ liệu
Cách tốt nhất để giải quyết rủi ro kinh doanh liên quan đến việc triển khai Datwarhouse là sử dụng chiến lược ba nhánh như dưới đây

**1.Chiến lược doanh nghiệp**: Ở đây chúng tôi xác định kỹ thuật bao gồm kiến trúc và công cụ hiện tại. Chúng tôi cũng xác định  facts, dimensions và thuộc tính. Ánh xạ dữ liệu và chuyển đổi cũng được thông qua.



**2.Phân phối theo giai đoạn**: Việc triển khai dữ liệu nên được phân kỳ dựa trên các lĩnh vực chủ đề. Các thực thể kinh doanh liên quan như đặt chỗ và thanh toán nên được thực hiện trước tiên và sau đó được tích hợp với nhau.



**3.Tạo mẫu lặp**: Thay vì một cách tiếp cận lớn để thực hiện, Datwarhouse nên được phát triển và thử nghiệm lặp lại.


Dưới đây, là các bước chính trong việc triển khai Datwarhouse cùng với các sản phẩm của nó.



| Step | Task | Deliverables |
| -------- | -------- | -------- |
| 1     | Cần xác định phạm vi dự án   | Định nghĩa phạm vi  |
| 2     | Cần xác định nhu cầu kinh doanh     | Mô hình dữ liệu logic   |
| 3     |Xác định các yêu cầu kho dữ liệu vận hành    | Mô hình lưu trữ dữ liệu vận hành     |
| 4    | Mua hoặc phát triển các công cụ khai thác     |Công cụ và phần mềm trích xuất    |
| 5    | Xác định các  Yêu cầu dữ liệu   Data Warehouse | Mô hình dữ liệu chuyển tiếp   |
| 6     | Tài liệu bị thiếu dữ liệu    | Danh sách dự án To Do    |
| 7     | Bản đồ Lưu trữ dữ liệu vận hành vào Kho dữ liệu    | Bản đồ tích hợp dữ liệu D / W     |
| 8    | Phát triển Thiết kế cơ sở dữ liệu   Data Warehouse   | D / W Thiết kế cơ sở dữ liệu    |
| 9    | Trích xuất dữ liệu từ kho dữ liệu vận hành    |Trích xuất dữ liệu D / W tích hợp     |
| 10    |Tải dữ liệu Kho dữ liệu     |Khởi tạo dữ liệu tải    |
| 11    | Bảo trì Data Warehouse     | Truy cập dữ liệu on-going và các tải tiếp theo   |



Thực tiễn tốt nhất để triển khai Kho dữ liệu
Quyết định một kế hoạch để kiểm tra tính nhất quán, chính xác và tính toàn vẹn của dữ liệu.
Kho dữ liệu phải được tích hợp tốt, được xác định rõ và đánh dấu thời gian.
Trong khi thiết kế Datwarhouse, đảm bảo bạn sử dụng đúng công cụ, theo sát vòng đời, quan tâm đến xung đột dữ liệu và sẵn sàng để học bạn là sai lầm của bạn.
Không bao giờ thay thế hệ thống hoạt động và báo cáo
Đừng dành quá nhiều thời gian cho việc trích xuất, làm sạch và tải dữ liệu.
Đảm bảo có sự tham gia của tất cả các bên liên quan, bao gồm cả nhân viên kinh doanh trong quá trình triển khai Datwarhouse. Thiết lập rằng kho dữ liệu là một dự án chung / nhóm. Bạn không muốn tạo kho dữ liệu không hữu ích cho người dùng cuối.
Chuẩn bị một kế hoạch đào tạo cho người dùng cuối.
Tại sao chúng ta cần kho dữ liệu? Ưu điểm & nhược điểm


**Ưu điểm của kho dữ liệu:**

Kho dữ liệu cho phép người dùng doanh nghiệp nhanh chóng truy cập dữ liệu quan trọng từ một số nguồn ở một nơi.
Kho dữ liệu cung cấp thông tin phù hợp về các hoạt động đa chức năng khác nhau. Nó cũng hỗ trợ báo cáo và truy vấn đặc biệt.
Kho dữ liệu giúp tích hợp nhiều nguồn dữ liệu để giảm căng thẳng cho hệ thống sản xuất.
Kho dữ liệu giúp giảm tổng thời gian quay vòng để phân tích và báo cáo.
Tái cấu trúc và tích hợp giúp người dùng dễ sử dụng hơn để báo cáo và phân tích.
Kho dữ liệu cho phép người dùng truy cập dữ liệu quan trọng từ số lượng nguồn ở một nơi duy nhất. Do đó, nó giúp tiết kiệm thời gian lấy dữ liệu của người dùng từ nhiều nguồn.
Kho dữ liệu lưu trữ một lượng lớn dữ liệu lịch sử. Điều này giúp người dùng phân tích các khoảng thời gian và xu hướng khác nhau để đưa ra dự đoán trong tương lai.


**Nhược điểm của Kho dữ liệu:**



Không phải là một lựa chọn lý tưởng cho dữ liệu phi cấu trúc.
Kho dữ liệu có thể bị lỗi thời tương đối nhanh
Khó thực hiện thay đổi về kiểu và phạm vi dữ liệu, lược đồ nguồn dữ liệu, chỉ mục và truy vấn.
Kho dữ liệu có vẻ dễ dàng, nhưng thực sự, nó quá phức tạp đối với người dùng trung bình.
Mặc dù có những nỗ lực tốt nhất trong quản lý dự án, phạm vi dự án kho dữ liệu sẽ luôn tăng.
Đôi khi người dùng kho sẽ phát triển các quy tắc kinh doanh khác nhau.
Các tổ chức cần dành nhiều nguồn lực cho mục đích đào tạo và thực hiện.
Tương lai của kho dữ liệu
Thay đổi các ràng buộc quy định có thể hạn chế khả năng kết hợp nguồn dữ liệu khác nhau. Những nguồn khác nhau này có thể bao gồm dữ liệu phi cấu trúc rất khó lưu trữ.
Khi kích thước của cơ sở dữ liệu tăng lên, các ước tính về những gì tạo nên một cơ sở dữ liệu rất lớn tiếp tục phát triển. Việc xây dựng và chạy các hệ thống kho dữ liệu luôn tăng kích thước là rất phức tạp. Các tài nguyên phần cứng và phần mềm có sẵn ngày hôm nay không cho phép giữ một lượng lớn dữ liệu trực tuyến.
Dữ liệu đa phương tiện không thể dễ dàng thao tác dưới dạng dữ liệu văn bản, trong khi thông tin văn bản có thể được truy xuất bằng phần mềm quan hệ hiện có. Đây có thể là một chủ đề nghiên cứu.
Công cụ kho dữ liệu
Có rất nhiều công cụ kho dữ liệu có sẵn trên thị trường. Đây là một số nổi bật nhất:


1. MarkLogic:

MarkLogic là giải pháp lưu trữ dữ liệu hữu ích giúp tích hợp dữ liệu dễ dàng hơn và nhanh hơn bằng cách sử dụng một loạt các tính năng doanh nghiệp. Công cụ này giúp thực hiện các hoạt động tìm kiếm rất phức tạp. Nó có thể truy vấn các loại dữ liệu khác nhau như tài liệu, mối quan hệ và siêu dữ liệu.

http://developer.marklogic.com/products


2. Oracle:

Oracle là cơ sở dữ liệu hàng đầu trong ngành. Nó cung cấp một loạt các lựa chọn giải pháp kho dữ liệu cho cả tại chỗ và trên đám mây. Nó giúp tối ưu hóa trải nghiệm của khách hàng bằng cách tăng hiệu quả hoạt động.

https://www.oracle.com/index.html



3. Amazon RedShift:

Amazon Redshift là công cụ kho dữ liệu. Đây là một công cụ đơn giản và hiệu quả để phân tích tất cả các loại dữ liệu bằng cách sử dụng SQL tiêu chuẩn và các công cụ BI hiện có. Nó cũng cho phép chạy các truy vấn phức tạp đối với petabyte dữ liệu có cấu trúc, sử dụng kỹ thuật tối ưu hóa truy vấn.

https://aws.amazon.com/redshift/?nc2=h_m1



Phần kết luận:
Kho dữ liệu hoạt động như một kho lưu trữ trung tâm nơi thông tin đến từ một hoặc nhiều nguồn dữ liệu.
Ba loại kho dữ liệu chính là Kho dữ liệu doanh nghiệp, Kho dữ liệu hoạt động và Data Mart.
Trạng thái chung của kho dữ liệu là Cơ sở dữ liệu hoạt động ngoại tuyến, Kho dữ liệu ngoại tuyến, Kho dữ liệu thời gian thực và Kho dữ liệu tích hợp.
Bốn thành phần chính của Datwarhouse là Trình quản lý tải, Trình quản lý kho, Trình quản lý truy vấn, Công cụ truy cập của người dùng cuối
Datwarhouse được sử dụng trong các ngành công nghiệp khác nhau như Hàng không, Ngân hàng, Chăm sóc sức khỏe, Bảo hiểm, Bán lẻ, v.v.
Thực hiện Datwarhosue là một chiến lược 3 prong. Chiến lược doanh nghiệp, phân phối theo giai đoạn và tạo mẫu lặp.
Kho dữ liệu cho phép người dùng doanh nghiệp nhanh chóng truy cập dữ liệu quan trọng từ một số nguồn ở một nơi.


Refer: https://www.guru99.com/data-warehousing.html