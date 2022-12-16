Data Mart là gì?



Một data mart tập trung vào một khu vực chức năng duy nhất của một tổ chức và chứa một tập hợp con dữ liệu được lưu trữ trong Kho dữ liệu.

Data mart là phiên bản thu gọn của Kho dữ liệu và được thiết kế để sử dụng bởi một bộ phận, đơn vị hoặc nhóm người dùng cụ thể trong một tổ chức. Ví dụ: Tiếp thị, Bán hàng, Nhân sự hoặc tài chính. Nó thường được kiểm soát bởi một bộ phận duy nhất trong một tổ chức.

 Data Mart thường chỉ lấy dữ liệu từ một vài nguồn so với kho dữ liệu.Data mart có kích thước nhỏ và linh hoạt hơn so với một Datwarhouse.

Trong hướng dẫn này, bạn sẽ học

Data Mart là gì?



Tại sao chúng ta cần Data Mart?



Các kiểu data Mart


Data mart phụ thuộc
Data mart độc lập
Data Mart kết hợp



Các bước để implement một Data mart
Thiết kế
Xây dựng
Cư trú
Truy cập
Quản lý


Thực tiễn tốt nhất để implement data mart



Ưu điểm và nhược điểm của Data Mart



Tại sao chúng ta cần Data Mart?
Data Mart giúp tăng cường thời gian phản hồi của người dùng do giảm khối lượng dữ liệu
Nó  truy cập dễ dàng vào dữ liệu request thường xuyên.
Data mart đơn giản hơn để implement khi so sánh với Datwarhouse của công ty. Đồng thời, chi phí triển khai Data Mart chắc chắn thấp hơn so với việc triển khai kho dữ liệu đầy đủ.
So với Data Warehouse, một data mart thì agile. Trong trường hợp thay đổi mô hình, data mart có thể được xây dựng nhanh hơn do kích thước nhỏ hơn.
Một Data mart được định nghĩa bởi một Chuyên gia về Chủ đề duy nhất. Kho dữ liệu trái ngược được xác định bởi các doanh nghiệp vừa và nhỏ từ nhiều lĩnh vực khác nhau. Do đó, Data mart có nhiều thay đổi hơn so với Data warehouse.
Dữ liệu được phân vùng và cho phép các đặc quyền kiểm soát truy cập rất chi tiết.
Dữ liệu có thể được phân đoạn và lưu trữ trên các nền tảng phần cứng / phần mềm khác nhau.



Các kiểu data Mart



Có ba kiểu data mart chính là:

Phụ thuộc : Các dữ liệu phụ thuộc được tạo bằng cách vẽ dữ liệu trực tiếp từ hoạt động, bên ngoài hoặc cả hai nguồn.


Độc lập : data mart độc lập được tạo mà không cần sử dụng kho dữ liệu trung tâm.


Kết hợp : Loại dữ liệu này có thể lấy dữ liệu từ kho dữ liệu hoặc hệ thống vận hành.


Data mart phụ thuộc 
Một data mart  phụ thuộc cho phép tìm nguồn dữ liệu của tổ chức từ một Kho dữ liệu. Nó cung cấp lợi ích của sự tập trung. Nếu bạn cần phát triển một hoặc nhiều dữ liệu vật lý, thì bạn cần  cấu hình chúng dưới dạng data mart phụ thuộc.

Dữ liệu phụ thuộc có thể được xây dựng theo hai cách khác nhau. Người dùng có thể truy cập cả data mart  và kho dữ liệu, tùy theo nhu cầu hoặc nơi truy cập chỉ giới hạn ở data mart. Cách tiếp cận thứ hai không tối ưu vì đôi khi nó được gọi là dữ liệu cơ sở dữ liệu. Trong dữ liệu Junkyard, tất cả dữ liệu bắt đầu bằng một nguồn chung, nhưng chúng bị loại bỏ và chủ yếu là rác.


![](https://images.viblo.asia/2fbdad2b-f9aa-41b7-88e8-3910ebb25a3b.png)






Data Mart độc lập
Một data Mart độc lập được tạo mà không cần sử dụng kho dữ liệu trung tâm. Loại Data Mart này là một lựa chọn lý tưởng cho các nhóm nhỏ hơn trong một tổ chức.

Một data Mart độc lập độc lập không có mối quan hệ với kho dữ liệu doanh nghiệp cũng như với bất kỳ mart dữ liệu nào khác. Trong data Mart độc lập, dữ liệu được nhập riêng và các phân tích của nó cũng được thực hiện tự động.

Việc thực hiện các dữ liệu độc lập là trái ngược với động lực xây dựng kho dữ liệu. Trước hết, bạn cần một kho lưu trữ dữ liệu doanh nghiệp tập trung, nhất quán, có thể được phân tích bởi nhiều người dùng với các sở thích khác nhau, những người muốn có nhiều thông tin khác nhau.





![](https://images.viblo.asia/af846bcb-b44c-42e6-89de-85e234105e33.png)





Data Mart kết hợp:


Một Data Mart kết hợp kết hợp đầu vào từ các nguồn ngoài kho dữ liệu. Điều này có thể hữu ích khi bạn muốn tích hợp đặc biệt, như sau khi một nhóm hoặc sản phẩm mới được thêm vào tổ chức.

Nó phù hợp nhất cho nhiều môi trường cơ sở dữ liệu và quay vòng triển khai nhanh cho mọi tổ chức. Nó cũng đòi hỏi nỗ lực làm sạch dữ liệu ít nhất. Hybrid Data mart cũng hỗ trợ các cấu trúc lưu trữ lớn và phù hợp nhất cho tính linh hoạt cho các ứng dụng tập trung vào dữ liệu nhỏ hơn.




![](https://images.viblo.asia/1d538aef-c59e-420c-b2fd-f01457081e86.png)




Các bước thực hiện một Datamart

![](https://images.viblo.asia/4331b2a1-c9de-4fee-b427-fff49b7a3ab9.png)





Triển khai Data Mart là một thủ tục bổ ích nhưng phức tạp. Dưới đây là các bước chi tiết để triển khai Data Mart:

Thiết kế



Thiết kế là giai đoạn đầu tiên của việc thực hiện Data Mart. Nó bao gồm tất cả các nhiệm vụ giữa việc bắt đầu yêu cầu một Data Mart  để thu thập thông tin về các yêu cầu. Cuối cùng, chúng tôi tạo ra thiết kế logic và vật lý của  data mart .

Bước thiết kế bao gồm các nhiệm vụ sau:

Thu thập các yêu cầu kinh doanh & kỹ thuật và Xác định nguồn dữ liệu.
Chọn tập hợp con dữ liệu thích hợp.
Thiết kế cấu trúc logic và vật lý của data mart.
Dữ liệu có thể được phân vùng dựa trên các tiêu chí sau:


Ngày


Đơn vị kinh doanh hoặc chức năng

 Địa lý


Bất kỳ sự kết hợp nào ở trên
Dữ liệu có thể được phân vùng ở cấp ứng dụng hoặc DBMS. Mặc dù nên phân vùng ở cấp Ứng dụng vì nó cho phép các mô hình dữ liệu khác nhau mỗi năm với sự thay đổi trong môi trường kinh doanh.



Bạn cần sản phẩm và công nghệ gì?

Một cây bút và giấy đơn giản sẽ đủ. Mặc dù các công cụ giúp bạn tạo sơ đồ UML hoặc ER cũng sẽ nối dữ liệu meta vào các thiết kế logic và vật lý của bạn.

Xây dựng



Đây là giai đoạn thứ hai của việc thực hiện. Nó liên quan đến việc tạo cơ sở dữ liệu vật lý và các cấu trúc logic.

Bước này bao gồm các nhiệm vụ sau:

Implement cơ sở dữ liệu vật lý được thiết kế trong giai đoạn trước. Ví dụ, các đối tượng lược đồ cơ sở dữ liệu như bảng, chỉ mục, khung nhìn, v.v. được tạo.
Bạn cần sản phẩm và công nghệ gì?

Bạn cần một hệ thống quản lý cơ sở dữ liệu quan hệ để xây dựng một data mart . RDBMS có một số tính năng cần thiết cho sự thành công của Data Mart.


Quản lý lưu trữ: RDBMS lưu trữ và quản lý dữ liệu để tạo, thêm và xóa dữ liệu.
Truy cập dữ liệu nhanh: Với truy vấn SQL, bạn có thể dễ dàng truy cập dữ liệu dựa trên các điều kiện / bộ lọc nhất định.
Bảo vệ dữ liệu: Hệ thống RDBMS cũng cung cấp một cách để phục hồi từ các lỗi hệ thống như mất điện. Nó cũng cho phép khôi phục dữ liệu từ các bản sao lưu này khi đĩa bị lỗi.
Hỗ trợ đa người dùng : Hệ thống quản lý dữ liệu cung cấp quyền truy cập đồng thời, khả năng nhiều người dùng truy cập và sửa đổi dữ liệu mà không can thiệp hoặc ghi đè thay đổi do người dùng khác thực hiện.
Bảo mật: Hệ thống RDMS cũng cung cấp một cách để điều chỉnh quyền truy cập của người dùng vào các đối tượng và một số loại hoạt động nhất định.




Cư Trú




Trong giai đoạn thứ ba, dữ liệu được điền trong data mart.

Bước cư trú bao gồm các nhiệm vụ sau:

Nguồn dữ liệu để ánh xạ dữ liệu đích
Khai thác dữ liệu nguồn
Thao tác làm sạch và biến đổi dữ liệu
Tải dữ liệu vào data mart 
Tạo và lưu trữ metadata
Bạn cần sản phẩm và công nghệ gì?

Bạn hoàn thành các nhiệm vụ cư trú này bằng Công cụ ETL (Extract Transform Load). Công cụ này cho phép bạn xem xét các nguồn dữ liệu, thực hiện ánh xạ nguồn tới đích, trích xuất dữ liệu, chuyển đổi, xóa dữ liệu và tải lại vào data mart .

Trong quá trình này, công cụ cũng tạo ra một số  metadata liên quan đến những thứ như dữ liệu đến từ đâu, mức độ gần đây, loại thay đổi được thực hiện đối với dữ liệu và mức độ tóm tắt đã được thực hiện.



Truy cập


Truy cập là bước thứ tư bao gồm đưa dữ liệu vào sử dụng: truy vấn dữ liệu, tạo báo cáo, biểu đồ và public chúng. Người dùng cuối gửi truy vấn đến cơ sở dữ liệu và hiển thị kết quả của các truy vấn

Bước truy cập cần thực hiện các tác vụ sau:

Thiết lập một lớp meta dịch các cấu trúc cơ sở dữ liệu và tên đối tượng thành các thuật ngữ kinh doanh. Điều này giúp người dùng không có kỹ thuật truy cập Data mart dễ dàng.
Thiết lập và duy trì cấu trúc cơ sở dữ liệu.
Thiết lập API và giao diện nếu cần
Bạn cần sản phẩm và công nghệ gì?

Bạn có thể truy cập data mart  bằng cách sử dụng dòng lệnh hoặc GUI. GUI được ưa thích vì nó có thể dễ dàng tạo đồ thị và thân thiện với người dùng so với dòng lệnh.

Quản lý



Đây là bước cuối cùng của quy trình Thực hiện Data Mart. Bước này bao gồm các nhiệm vụ quản lý như:

Quản lý truy cập người dùng đang thực hiện.
Tối ưu hóa hệ thống và tinh chỉnh để đạt được hiệu suất  cao.
Thêm và quản lý dữ liệu mới vào data mart .
Lập kế hoạch cho các kịch bản phục hồi và đảm bảo hệ thống sẵn có trong trường hợp khi hệ thống bị lỗi.
Bạn cần sản phẩm và công nghệ gì?

Bạn có thể sử dụng GUI hoặc dòng lệnh để quản lý data mart.

Thực tiễn tốt nhất để implement data Marts 
Sau đây là các thực tiễn tốt nhất mà bạn cần tuân theo trong quá trình Thực hiện Data Mart:

Nguồn của Data Mart phải được cấu trúc theo bộ phận
Chu kỳ triển khai của Data Mart nên được đo trong các khoảng thời gian ngắn, nghĩa là theo tuần thay vì tháng hoặc năm.
Điều quan trọng là liên quan đến tất cả các bên liên quan trong giai đoạn lập kế hoạch và thiết kế vì việc triển khai data  mart có thể phức tạp.
Chi phí phần cứng / phần mềm, mạng và triển khai Data Mart phải được dự toán chính xác trong kế hoạch của bạn
Mặc dù nếu Data mart được tạo trên cùng một phần cứng, chúng có thể cần một số phần mềm khác nhau để xử lý các truy vấn của người dùng. Cần đánh giá thêm sức mạnh xử lý và yêu cầu lưu trữ đĩa để đáp ứng nhanh cho người dùng
Một data mart có thể ở một vị trí khác với kho dữ liệu. Đó là lý do tại sao nó lại quan trọng để đảm bảo rằng  có đủ dung lượng mạng để xử lý khối lượng Dữ liệu cần thiết để truyền dữ liệu đến trung tâm dữ liệu .
Chi phí implement cần  bugdet thời gian thực hiện cho quá trình tải Datamart. Thời gian tải tăng khi tăng độ phức tạp của các phép biến đổi.
Ưu điểm và nhược điểm của Data Mart
Ưu điểm

Data mart chứa một tập hợp con của dữ liệu trên toàn tổ chức. Dữ liệu này có giá trị đối với một nhóm người cụ thể trong một tổ chức.
Đây là giải pháp thay thế hiệu quả về chi phí cho kho dữ liệu, cái mà mất chi phí cao để xây dựng.
Data Mart cho phép truy cập dữ liệu nhanh hơn.
Data Mart rất dễ sử dụng vì nó được thiết kế đặc biệt cho nhu cầu của người dùng. Do đó, một data mart  có thể tăng tốc các quy trình kinh doanh.
Data Marts cần ít thời gian thực hiện hơn so với các hệ thống Kho dữ liệu. Việc triển khai Data Mart nhanh hơn vì bạn chỉ cần tập trung tập hợp con duy nhất của dữ liệu.
Nó chứa dữ liệu lịch sử cho phép nhà phân tích xác định xu hướng dữ liệu.
Nhược điểm

Các doanh nghiệp tạo ra quá nhiều data marts khác nhau và không liên quan . Nó có thể trở thành một trở ngại lớn để duy trì.
Data Mart không thể cung cấp phân tích dữ liệu toàn công ty vì bộ dữ liệu của họ bị hạn chế.
Tóm lược:
Một mart dữ liệu được tập trung vào một khu vực chức năng duy nhất của một tổ chức và chứa một tập hợp con dữ liệu được lưu trữ trong Kho dữ liệu.
Data Mart giúp tăng cường thời gian phản hồi của người dùng do giảm khối lượng dữ liệu.



Ba loại mart dữ liệu là 
1) Phụ thuộc 


2)  Độc lập


3) Kết hợp



Các bước triển khai quan trọng của Data Mart là 

1) Thiết kế 


2) Xây dựng 


3)  Cư Trú


4) Truy cập 


5) Quản lý




Chu kỳ triển khai của Data Mart nên được đo trong các khoảng thời gian ngắn, nghĩa là theo tuần thay vì tháng hoặc năm.
Data mart là giải pháp thay thế hiệu quả về chi phí cho kho dữ liệu, cái mà mất chi phí cao để xây dựng.
Data Mart không thể cung cấp phân tích dữ liệu toàn công ty vì bộ dữ liệu bị hạn chế.

Refer: https://www.guru99.com/data-mart-tutorial.html