## **Tìm hiểu về Database Testing**

Việc thao tác với Database không chỉ quan trọng và diễn ra thường xuyên với các Developer mà nó còn vô cùng cần thiết với các QA. Việc Test data không chỉ đơn giản là việc chúng ta kiểm tra việc lưu trữ  data mà nó còn  được dùng để kiểm tra các phản ứng của ứng dụng trong các trường hợp nhập dữ liệu đầu vào bất thường, hiếm có, ngoại lệ hoặc những dữ liệu không mong đợi. Chính vì thế có thể thấy test data là một việc vô cùng quan trọng.

### 1. Database Testing là gì?

**Database là gì?**

Để tìm hiểu về Database testing trước hết ta phải nắm được Database là gì. Database (Cơ sở dữ liệu) là một tập hợp dữ liệu đã được tổ chức sắp xếp. Mục đích chính của Database là để tổ chức một lượng lớn thông tin bằng việc lưu trữ, thu thập, và quản lý. 

**Database testing là gì?**

![](https://images.viblo.asia/975e9d9f-54d5-42b1-8b72-78d8284b731a.jpg)

Giao diện(GUI) trong hầu hết các trường hợp đều được chú trọng bởi đội kiểm thử cũng như các thành viên trong đội phát triển phần mềm vì giao diện đồ họa(Graphic User Interface) là phần tương tác trực tiếp với người dùng trong một ứng dụng. Tuy nhiên, phần được coi là quan trọng nhất để xác thực thông tin và được coi như là trái tim của một ứng dụng đó là cơ sở dữ liệu (Database).
Database testing là kiểm tra các schema, tables, triggers … của các database dưới môi trường test. Nó có thể liên quan đến việc tạo ra các truy vấn phức tạp để test load/stress các database. Nó kiểm tra tính toàn vẹn và nhất quán của dữ liệu.

Test data có thể được tập hợp lại thông qua bất kỳ ứng dụng nào như Excel sheet, Word document hay Text file...Các dữ liệu được lưu trữ tại file Excel có thể được nhập vào bằng tay khi chạy test case hoặc cũng có thể nhập tự động thông qua các file xml, flat files, database...bằng cách sử dụng các công cụ hỗ trợ tự động. Khi sử dụng test data, bạn phải xác nhận chắc chắn các kết quả mong đợi và trạng thái của phần mềm cũng như những dữ liệu đầu vào không hợp lệ. 

Trong trường hợp test domain, test data sẽ được tạo ra một cách bài bản, có hệ thống theo một kiểu khác; còn nếu test tự động với một số lượng lớn ngẫu nhiên thì không ổn. Test data sẽ được tạo ra bởi tester hoặc một chương trình hay một chức năng chuyên tạo test data để giúp đỡ tester. Test data có thể được ghi lại để tái sừ dụng cho ứng dụng đó.

### 2. Sự khác nhau cơ bản giữa user-interface và database testing


| Đặc điểm so sánh| User-Interface testing  | Database testing |
| -------- | -------- | -------- |
|Khái niệm| Đây là loại kiểm thử về giao diện đồ họa hay kiểm thử Front-end	  |Đây là loại kiểm thử về dữ liệu hay kiểm thử về Back-end     |
|Góc độ User|Loại test này chủ yếu đề cập đến tất cả các testable item mà dễ tiếp thu cho người xem và tương tác như Forms, Presentation, Graphs, Menus, and Reports, … (được tạo thông qua VB, VB.net, VC ++, Delphi - Frontend Tools)|Loại test này chủ yếu đề cập đến tất cả các testable item mà thường bị ẩn từ người xem. Chúng bao gồm tiến trình và lưu trữ nội bộ như Assembly, DBMS như Oracle, SQL Server, MYSQL|
|Đối tượng xác thực|Loại test này bao gồm xác thực: các text boxes, các select dropdown, các calendar và button, điều hướng từ trang này sang trang khác, hiển thị hình ảnh cũng như nhìn và cảm nhận tổng thể ứng dụng.|Loại test này liên quan đến xác thực: các schema, các database table, các column , các key và index, stored procedures, triggers , database server validations, validating data duplication,|
|Mức độ khó|Các tester phải hiểu biết đầy đủ về các yêu cầu business cũng như việc sử dụng các công cụ phát triển và việc sử dụng các framework và tool tự động.|Các tester để mà có thể thực hiện backend testing phải có một background mạnh về các database server và các khái niệm Structured Query Language.|

### 3. Phân loại Database Testing

![](https://images.viblo.asia/dcd4fd28-d5e9-49d4-a967-79c72349fede.jpg)

 Database testing được chia làm 3 loại là

* Structural Testing - Kiểm thử cấu trúc cơ sở dữ liệu: 
Kiểm thử cấu trúc dữ liệu bao gồm việc kiểm tra tất cả các thành phần bên trong kho lưu trữ dữ liệu mà được sử dụng chính để lưu trữ dữ liệu mà không được phép trực tiếp truy xuất bới người dùng cuối. Việc kiểm tra cơ sở dữ liệu cũng là một loại kiểm thử rất quan trọng. Sự thành công trong giai đoạn này của người kiểm thử bao gồm việc làm chủ trong các câu lệnh truy vấn SQL.
* Functional Testing - Kiểm thử chức năng: 
Kiểm thử chức năng của cơ sở dữ liệu được chỉ định bởi yêu cầu đặc tả cần để đảm bảo tất cả các giao dịch và thao tác được thực hiện bởi người dùng đầu cuối phù hợp với các yêu cầu trong tài liệu đặc tả.
* Non-functional Testing - Kiểm thử phi chức năng:
Non-functional testing trong bối cảnh database testing có thể được phân loại thành các loại khác nhau theo yêu cầu của các business requirement. Nó có thể là load testing, Stress Testing, Security Testing, Usability Testing, và Compatibility Testing,... Load testing cũng như Stress Testing cái mà có thể được nhóm lại theo cả hai mục đích cụ thể của performance testing khi nói đến vai trò của Non-functional testing.

### 4. Quy trình thực hiện Database Testing

Quá trình thực hiện kiểm tra cơ sở dữ liệu tương tự như kiểm tra các ứng dụng khác. Kiểm tra DB có thể được mô tả bằng các quy trình chính được đưa ra dưới đây.

* Thiết lập môi trường
* Chạy thử nghiệm
* Kiểm tra kết quả kiểm tra
* Xác nhận theo kết quả mong đợi
* Báo cáo kết quả cho các bên liên quan

Các câu lệnh SQL khác nhau được sử dụng để phát triển các trường hợp Kiểm thử. Câu lệnh SQL phổ biến nhất, được sử dụng để thực hiện kiểm tra DB, là câu lệnh Select. Ngoài ra, các câu lệnh DDL, DML, DCL khác nhau cũng có thể được sử dụng.

Ví dụ - Tạo, Chèn, Chọn, Cập nhật, v.v.

**Database Testing Stages**

Kiểm tra DB không phải là một quá trình tẻ nhạt và bao gồm các giai đoạn khác nhau trong vòng đời kiểm tra cơ sở dữ liệu theo quy trình thử nghiệm.

Các giai đoạn chính trong kiểm tra cơ sở dữ liệu là 

* Kiểm tra trạng thái ban đầu
* Chạy thử nghiệm
* Xác nhận kết quả theo kết quả mong đợi
* Tạo kết quả

Giai đoạn đầu tiên trong thử nghiệm DB là kiểm tra trạng thái ban đầu của cơ sở dữ liệu trước khi bắt đầu quá trình thử nghiệm. Sau đó, hành vi cơ sở dữ liệu được kiểm tra cho các trường hợp thử nghiệm được xác định. Phù hợp với các kết quả thu được, các trường hợp thử nghiệm được tùy chỉnh.

Để kiểm tra cơ sở dữ liệu thành công, luồng công việc được đưa ra dưới đây được thực hiện bởi mọi thử nghiệm đơn lẻ.

* Dọn dẹp cơ sở dữ liệu - Nếu có dữ liệu có thể kiểm tra trong cơ sở dữ liệu, nó sẽ được làm trống.
 
* Thiết lập Fixture - Điều này liên quan đến việc nhập dữ liệu vào cơ sở dữ liệu và kiểm tra trạng thái hiện tại của cơ sở dữ liệu.
 
* Thực hiện kiểm tra, xác minh kết quả và tạo kết quả - Kiểm tra được chạy và đầu ra được xác minh. Nếu đầu ra là theo kết quả mong đợi, bước tiếp theo là tạo kết quả theo yêu cầu. Nếu không, kiểm tra được lặp lại để tìm các lỗi trong cơ sở dữ liệu.

### 5. Các kỹ thuật phổ biến được sử dụng trong Database Testing


**Database Schema Testing (Kiểm tra lược đồ cơ sở dữ liệu)**

**Xác minh cơ sở dữ liệu và thiết bị**

* Xác minh tên cơ sở dữ liệu
* Xác minh thiết bị dữ liệu, thiết bị đăng nhập và thiết bị đổ
* Xác minh nếu đủ không gian được phân bổ cho từng cơ sở dữ liệu
* Xác minh cài đặt tùy chọn cơ sở dữ liệu

**Tables, columns, column types rules check**

Xác minh các mục được đưa ra dưới đây để tìm hiểu sự khác biệt giữa cài đặt thực tế và áp dụng.

* Tên của tất cả các bảng trong cơ sở dữ liệu
* Tên cột cho mỗi bảng
* Các loại cột cho mỗi bảng 
* Giá trị NULL được kiểm tra hay không
* Liệu giá trị mặc định có bị ràng buộc để sửa các cột trong bảng hay không 
* Định nghĩa quy tắc để sửa tên bảng và đặc quyền truy cập

**Key and Indexes**

* Xác minh khóa và chỉ mục trong mỗi bảng :
* Khóa chính cho mỗi bảng
* Khóa ngoại cho mỗi bảng
* Các kiểu dữ liệu giữa cột khóa ngoài và cột trong bảng khác Các chỉ mục, nhóm hoặc không được phân cụm duy nhất hoặc không phải là duy nhất

**Stored Procedure Tests**

Nó liên quan đến việc kiểm tra xem liệu một thủ tục lưu sẵn được xác định và kết quả đầu ra được so sánh. Trong một bài kiểm tra thủ tục lưu trữ, các điểm sau đây được kiểm tra :

* Tên thủ tục được lưu trữ
* Tên tham số, loại tham số, v.v ...
* Đầu ra - Cho dù đầu ra có chứa nhiều bản ghi. Các hàng không được thực hiện hoặc chỉ một vài bản ghi được trích xuất.
* Chức năng của thủ tục lưu trữ là gì và những gì một thủ tục lưu trữ không phải là nghĩa vụ phải làm gì?
* Vượt qua các truy vấn đầu vào mẫu để kiểm tra xem một thủ tục đã lưu có trích xuất dữ liệu chính xác hay không.
* Các tham số thủ tục lưu sẵn - Gọi thủ tục lưu sẵn với dữ liệu ranh giới và với dữ liệu hợp lệ. Làm cho mỗi tham số không hợp lệ một lần và chạy một thủ tục.
* Trả về giá trị - Kiểm tra các giá trị được trả về bởi thủ tục lưu sẵn. Trong trường hợp thất bại, không phải trả lại nonzero.
* Kiểm tra thông báo lỗi - Thực hiện các thay đổi theo cách mà thủ tục đã lưu không thành công và tạo ra mọi thông báo lỗi ít nhất một lần. Kiểm tra bất kỳ trường hợp ngoại lệ nào khi không có thông báo lỗi được xác định trước.

**Trigger Tests**

Trong thử nghiệm Trigger, trình kiểm tra phải thực hiện các tác vụ sau :

* Đảm bảo tên trình kích hoạt là chính xác.
* Xác thực trình kích hoạt nếu nó được tạo cho một cột bảng cụ thể.
* Xác thực cập nhật của trình kích hoạt.
* Cập nhật một bản ghi với một dữ liệu hợp lệ.
* Cập nhật bản ghi có dữ liệu không hợp lệ và bao gồm mọi lỗi kích hoạt.
* Cập nhật một bản ghi khi nó vẫn được tham chiếu bởi một hàng trong bảng khác.
* Đảm bảo quay lại giao dịch khi xảy ra lỗi.
* Tìm hiểu bất kỳ trường hợp nào trong đó trình kích hoạt không được phép quay lại giao dịch.

**Server Setup Scripts**

Hai loại kiểm tra nên được thực hiện :

* Thiết lập cơ sở dữ liệu từ đầu, và
* Để thiết lập cơ sở dữ liệu hiện có.

**Kiểm tra tích hợp của SQL Server**

* Kiểm tra tích hợp sẽ được thực hiện sau khi bạn trải qua thử nghiệm thành phần.
* Thủ tục lưu trữ nên được gọi là mạnh mẽ để chọn, chèn, cập nhật và xóa các bản ghi trong các bảng khác nhau để tìm bất kỳ xung đột và không tương thích nào.
* Bất kỳ xung đột nào giữa lược đồ và trình kích hoạt.
* Bất kỳ xung đột nào giữa các thủ tục và lược đồ được lưu trữ.
* Bất kỳ xung đột nào giữa các thủ tục được lưu trữ và trình kích hoạt.

**Functional Testing Method**

Kiểm tra chức năng có thể được thực hiện bằng cách chia cơ sở dữ liệu thành các mô-đun theo chức năng. Các chức năng có hai loại sau đây :

* Type 1 - Trong thử nghiệm Loại 1, hãy tìm hiểu các tính năng của dự án. Đối với mỗi tính năng chính, hãy tìm hiểu lược đồ, trình kích hoạt và các thủ tục được lưu trữ có trách nhiệm thực hiện hàm đó và đặt chúng vào một nhóm chức năng. Sau đó kiểm tra từng nhóm lại với nhau.
* Type 2 - Trong thử nghiệm loại 2, biên giới của các nhóm chức năng trong một back-end là không rõ ràng. Bạn có thể kiểm tra luồng dữ liệu và xem nơi bạn có thể kiểm tra dữ liệu. Bắt đầu từ front-end.

Quá trình sau diễn ra :

* Khi một dịch vụ có yêu cầu hoặc lưu dữ liệu, một số thủ tục lưu sẵn sẽ được gọi.
* Các thủ tục sẽ cập nhật một số bảng.
* Những thủ tục được lưu trữ sẽ là nơi để bắt đầu thử nghiệm và những bảng đó sẽ là nơi để kiểm tra kết quả kiểm tra.

**Stress Testing**

Kiểm tra căng thẳng bao gồm việc nhận danh sách các hàm cơ sở dữ liệu chính và các thủ tục được lưu trữ tương ứng. Làm theo các bước dưới đây để kiểm tra áp lực :

* Viết kịch bản thử nghiệm để thử các chức năng đó và mọi chức năng phải được kiểm tra ít nhất một lần trong một chu kỳ đầy đủ.
* Thực hiện các tập lệnh thử nghiệm một lần nữa và một lần nữa trong một khoảng thời gian cụ thể.
* Xác minh các tệp nhật ký để kiểm tra bất kỳ deadlocks, thất bại trong bộ nhớ, dữ liệu tham nhũng, vv

**Benchmark Testing**

Nếu cơ sở dữ liệu của bạn không có bất kỳ vấn đề hoặc lỗi dữ liệu nào, bạn có thể kiểm tra hiệu năng hệ thống. Một hiệu suất hệ thống kém có thể được tìm thấy trong kiểm tra điểm chuẩn bằng cách kiểm tra các tham số được đưa ra dưới đây :

* Hiệu suất mức hệ thống
* Xác định các tính năng / tính năng được sử dụng nhiều nhất
* Thời gian - thời gian tối đa, thời gian tối thiểu và thời gian trung bình để thực hiện các chức năng
* Khối lượng truy cập

**Testing a Database via Front-end**

Các lỗi back-end cũng có thể được tìm thấy đôi khi bằng cách thực hiện kiểm tra front-end. Bạn có thể làm theo các bước đơn giản dưới đây để phát hiện lỗi bằng cách kiểm tra front-end.

* Viết truy vấn từ giao diện người dùng và phát hành các tìm kiếm.
* Chọn một bản ghi hiện có, thay đổi các giá trị trong một số trường và lưu bản ghi. (Nó liên quan đến câu lệnh UPDATE hoặc cập nhật các thủ tục được lưu trữ và kích hoạt cập nhật.)
* Chèn một mục menu mới trong cửa sổ front-end. Điền thông tin và lưu bản ghi. (Nó liên quan đến các câu lệnh INSERT hoặc các thủ tục được lưu trữ và các trình kích hoạt xóa.)
* Chọn một bản ghi hiện có, nhấp vào nút XÓA hoặc XÓA, và xác nhận việc xóa. (Nó liên quan đến câu lệnh DELETE hoặc xóa các thủ tục đã lưu và các trình kích hoạt xóa.)
* Lặp lại các trường hợp thử nghiệm này với dữ liệu không hợp lệ và xem cơ sở dữ liệu phản hồi như thế nào.

### 6. Cách thực hiện Database Testing hiệu quả nhất

Việc tạo test data có thể được thực hiện bằng nhiều cách khác nhau, ví dụ như tạo thủ công hoặc sao chép production data đến môi trường test, hoặc sao chép test data từ hệ thống của khách hàng tới môi trường test, sinh ra test data từ việc sử dụng các công cụ tự động...Test data có thể được ghi lại và sử dụng trong việc test hồi quy. Đây luôn luôn là một thói quen tốt, xác nhận dữ liệu vẫn còn hiệu lực trước khi tái sử dụng cho các kiểu test khác. Về cơ bản, tester sẽ kiểm tra và cập nhật test data trước khi thực hiện bất kỳ một test case nào. Nếu test data thử nghiệm được sử dụng trong quá trình thực hiện các test case thì nó có thể vượt quá thời hạn dành cho việc test.

Vậy thì tạo test data như thế nào để test một cách hiệu quả nhất?

* Tạo test data tốt nhất: hãy cố gắng tạo dữ liệu tốt nhất trong khả năng có thể, không quá dài dòng nhưng đảm bảo nhận biết được bug cho nhiều loại ứng dụng khác nhau; với điều kiện không tốn nhiều chi phí và thời gian trong việc chuẩn bị test data và thực hiện test.

* Thiết lập những dữ liệu không hợp lệ: để kiểm tra sự đúng đắn của dữ liệu, cần phải tạo các dữ liệu có format sai. Những dữ liệu kiểu như vậy sẽ không được chấp nhận bởi hệ thống và sẽ xuất hiện các message báo lỗi. Hãy kiểm tra và đảm bảo hệ thống sẽ sinh ra các message báo lỗi.

* Thiết lập các dữ liệu điều kiện biên: tạo ra các dữ liệu cho trường hợp cận biên để tạo ra các data set sẽ giúp bao quát các trường hợp liên quan đến cận trên và cận dưới.

* Tạo bộ dữ liệu đúng: tạo bộ dữ liệu này nhằm đảm bảo rẳng hệ thống hoặc ứng dụng sẽ phản ứng giống như yêu cầu kỹ thuật, hoặc nhận biết dữ liệu đúng hay sai đã được lưu lại vào database hay file.

* Tạo bộ dữ liệu sai: tạo bộ dữ liệu này nhằm xác nhận phản ứng của hệ thống đối với các giá trị phủ định, các chuỗi đầu vào chứa ký tự hoặc số. Tạo bộ dữ liệu cho việc test perfomance, load dữ liệu, test áp lực và test hồi quy: một số lượng lớn dữ liệu là điều cần thiết cho những kiểu test như thế này. Để thực hiện test performance cho các ứng dụng liên quan đến database nhằm tìm kiếm, cập nhật dữ liệu từ/đến các bảng trong database.
 
* Dữ liệu trống hoặc dữ liệu mặc định: thực hiện các test case với dữ liệu trống hoặc dữ liệu mặc định nhằm mục đích kiểm tra xem các message báo lỗi có được hiển thị đúng hay không.
 
* Kiểm tra các dữ liệu hỏng/lỗi: fill bug sau khi sử dụng chức năng sửa chữa lỗi và trước khi chạy test case cho các dữ liệu riêng biệt nhằm đảm bảo dữ liệu không bị hỏng hay lỗi.
 
* Tạo ra các dữ liệu đầu vào có giá trị và sao chép nhân đôi: trong rất nhiều test case dành cho phần mềm, các tester đang test nhưng bị trùng thời điểm release. Trong hoàn cảnh này, nhiều tester sẽ có quyền được truy cập vào các test data chúng và mỗi tester sẽ tìm kiếm và vận hành test data chung theo yêu cầu riêng của họ. Nên cách tốt nhất để giữ các dữ liệu vẫn nguyên vẹn là mỗi người giữ một bản copy cá nhân trong các file word, excel hay hình ảnh. Sử dụng những ý tưởng như vậy có thể tạo ra những dữ liệu độc đáo mà có thể phục vụ nhiều môi tường test để chắc chắn bao quát hết các trường hợp cần test.

[Tìm hiểu về Database testing (Phần 2)](https://viblo.asia/p/tim-hieu-ve-database-testing-phan-2-yMnKMOQzl7P)

***Tài liệu tham khảo:***

https://hoclaptrinh.vn/tutorial/hoc-sql-server/database-la-gi
https://www.tutorialspoint.com/database_testing

***Hy vọng bài viết bổ ích cho bạn!***