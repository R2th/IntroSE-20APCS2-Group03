## Database Testing là gì?
Database Testing - Kiểm thử cơ sở dữ liệu là một loại test dùng để kiểm thử schema, tables, triggers, v.v. của cơ sở dữ liệu. Nó cũng kiểm tra tính toàn vẹn và nhất quán dữ liệu. Nó có thể liên quan đến việc tạo các truy vấn phức tạp để load/stress test cơ sở dữ liệu và kiểm tra mức độ đáp ứng của nó.

## Tại sao cần thực hiện Database Testing?
GUI thường được các thành viên trong nhóm Test và Dev (development) chú trọng nhất vì đồ họa giao diện người dùng là phần dễ thấy nhất của ứng dụng. Tuy nhiên, điều quan trọng không kém là validate thông tin, đây cũng chính là trái tim của ứng dụng hay còn gọi là DATABASE.

Chúng ta hãy xem xét một ứng dụng Ngân hàng trong đó người dùng thực hiện giao dịch. Bây giờ hãy thực hiện Database testing cho những mục quan trọng sau:

1. Ứng dụng lưu trữ thông tin giao dịch trong cơ sở dữ liệu và hiển thị chúng chính xác cho người dùng.
1. Không có thông tin bị mất trong quá trình.
1. Không có thông tin hoạt động được thực hiện một phần hoặc bị hủy bỏ được lưu bởi ứng dụng.
1. Không có cá nhân trái phép được phép truy cập thông tin của người dùng.

Để đảm bảo tất cả các mục tiêu trên, chúng ta cần sử dụng  data validation hoặc data testing.

Trong hướng dẫn này, chúng ta sẽ nghiên cứu

* Sự khác biệt giữa GUI và data testing
* Các loại data testing
* Schema Testing
* Bảng cơ sở dữ liệu (Database table), column testing
* Kiểm thử thủ tục lưu trữ
* Trigger testing
* Database server validations
* Functional database testing
* Đăng nhập và bảo mật người dùng
* Load testing
* Stress testing
* Quan niệm sai lầm hoặc hiểu lầm liên quan đến Database Testing

## Sự khác biệt cơ bản giữa user-interface và  data testing
![](https://images.viblo.asia/6b345e53-0c36-4433-a652-8b7b88dd45b7.jpg)

| User-interface testing |Database hoặc data testing |
| -------- | -------- |
| Loại test này còn được gọi là test đồ họa giao diện người dùng hoặc test giao diện người dùng.     | Loại test này còn được gọi là test Back-end hoặc data testing.     | 
| Loại test này chủ yếu xử lý tất cả các mục hiển thị cho người dùng xem và tương tác như  Biểu mẫu, Trình bày, Đồ thị, Menu và Báo cáo, v.v. (được tạo thông qua VB, VB.net, VC ++, Delphi - Công cụ Frontend )     | Loại test này chủ yếu liên quan đến tất cả các mục test thường được ẩn đi, người dùng không thể nhìn thấy. Chúng bao gồm quá trình lưu trữ và lưu trữ nội bộ như Assembly, DBMS like Oracle, SQL Server, MYSQL, v.v.     | 
| Loại test này bao gồm validate các: Text boxes, select dropdowns, Lịch và các nút, điều hướng từ trang này sang trang khác, hiển thị hình ảnh cũng như Giao diện của ứng dụng tổng thể.     | Loại test này bao gồm validate các: schema, database tables (Bảng cơ sở dữ liệu), columns (cột), keys and indexes, thủ tục được lưu trữ, triggers, xác thực máy chủ cơ sở dữ liệu, xác thực sao chép dữ liệu. |
| Tester phải có kiến thức chuyên sâu về các yêu cầu nghiệp vụ cũng như việc sử dụng các công cụ phát triển và việc sử dụng automation framework và tools.     | Tester để có thể thực hiện kiểm tra back-end phải có một nền tảng vững chắc trong nghiệp vụ database servervà các khái niệm Ngôn ngữ truy vấn có cấu trúc.     |

## Các kiểu Database testing

![](https://images.viblo.asia/85cd5068-71eb-438a-882a-4da65c239729.jpg)

3 loại Database testing là

1. Structural Testing (Kiểm thử cấu trúc)
1. Functional Testing (Kiểm thử chức năng)
1. Non-functional Testing (Kiểm thử phi chức năng)

### Structural database testing

Structural database testing liên quan đến việc xác thực tất cả các yếu tố bên trong kho lưu trữ dữ liệu được sử dụng chủ yếu để lưu trữ dữ liệu và không được phép sử dụng trực tiếp bởi người dùng cuối. Việc validate các database servers cũng là một xem xét rất quan trọng trong các loại test này. Để hoàn thành thành công giai đoạn này yêu cầu các tester phải thành thạo các truy vấn SQL.

### Schema testing
Khía cạnh chính của Schema testing là đảm bảo rằng schema ở the front end và back end tương quan nhau. Vì vậy, chúng ta cũng có thể coi Schema testing là Mapping testing.

Các checkpoints quan trọng nhất trong Schema testing.

1. Validate các định dạng schema khác nhau liên quan đến cơ sở dữ liệu. Nhiều lần định dạng mapping của bảng có thể không tương thích với định dạng mapping có trong cấp độ giao diện người dùng của ứng dụng.
1. Có nhu cầu xác thực trong trường hợp unmapped tables/views/columns.
1. Cũng cần phải xác minh xem các cơ sở dữ liệu không đồng nhất trong một môi trường có phù hợp với mapping ứng dụng tổng thể hay không.

Chúng ta cũng xem xét một số công cụ thú vị để validating database schemas.

* DBUnit được tích hợp với Ant rất phù hợp để thực hiện Schema testing.
* SQL Server cho phép Tester có thể test và truy vấn lược đồ của cơ sở dữ liệu bằng cách viết các truy vấn đơn giản và không thông qua code.

Ví dụ: nếu Dev muốn thay đổi cấu trúc bảng hoặc xóa nó, Tester sẽ muốn đảm bảo rằng tất cả các Quy trình và Chế độ xem được lưu trữ sử dụng bảng đó tương thích với những thay đổi cụ thể. Một ví dụ khác có thể là nếu Tester muốn kiểm tra thay đổi lược đồ giữa 2 cơ sở dữ liệu, họ có thể làm điều đó bằng cách sử dụng các truy vấn đơn giản.

### Database table, column testing
Cùng xem xét các loại test khác nhau cho database và column testing.

1. Việc mapping của các trường và cột cơ sở dữ liệu ở back end có tương thích với các mapping đó ở  front end hay không.
1. Xác nhận quy ước về độ dài và cách đặt tên của các trường và cột cơ sở dữ liệu theo quy định của các yêu cầu.
1. Xác nhận sự hiện diện của các bảng / cột cơ sở dữ liệu chưa sử dụng / chưa được mapping.
1. Xác nhận tính tương thích của
   * loại dữ liệu
   * độ dài các trường
   
    của các cột cơ sở dữ liệu phụ trợ với các cột hiện diện ở front end của ứng dụng.

1. Liệu các trường cơ sở dữ liệu có cho phép người dùng cung cấp đầu vào họ mong muốn theo yêu cầu của các tài liệu đặc tả yêu cầu nghiệp vụ hay không.

Kiểm tra khóa và chỉ mục

Kiểm tra các khóa và chỉ mục quan trọng-

1. Kiểm tra xem có yêu cầu không
   * Khóa chính
   * Khóa ngoại
   
    các ràng buộc đã được tạo ra trên các bảng yêu cầu.

1. Kiểm tra xem các tham chiếu cho khóa ngoại có hợp lệ không.
1. Kiểm tra xem kiểu dữ liệu của khóa chính và khóa ngoại tương ứng có giống nhau trong hai bảng không.
1. Kiểm tra xem các quy ước đặt tên cần thiết đã được tuân theo cho tất cả các khóa và chỉ mục.
1. Kiểm tra kích thước và độ dài của các trường và chỉ mục cần thiết.
1. Có yêu cầu không
    * Cụm chỉ mục
    * Các chỉ mục không theo cụm
    
     đã được tạo trên các bảng yêu cầu theo quy định của các yêu cầu nghiệp vụ chưa.
     
### Kiểm tra thủ tục lưu trữ

Danh sách những điều quan trọng nhất sẽ được xác nhận cho các thủ tục được lưu trữ.

1. Liệu nhóm phát triển đã áp dụng yêu cầu
   * quy ước tiêu chuẩn code
   * xử lý ngoại lệ và lỗi
   
   Với tất cả các thủ tục được lưu trữ các mô-đun cho ứng dụng đang được test.
1.  Liệu nhóm phát triển có đảm bảo tất cả các điều kiện / vòng lặp hay không bằng cách áp dụng dữ liệu đầu vào cần thiết cho ứng dụng test.
1. Liệu nhóm phát triển có áp dụng đúng các hoạt động TRIM bất cứ khi nào dữ liệu được tìm nạp từ các bảng cần thiết trong Cơ sở dữ liệu hay không.
1. Việc thực hiện thủ công Thủ tục lưu trữ có cung cấp cho người dùng cuối kết quả được yêu cầu hay không
1. Việc thực thi thủ công Thủ tục lưu trữ có đảm bảo các trường, bảng đang được cập nhật theo yêu cầu của ứng dụng hay không.
1. Việc thực thi các thủ tục được lưu trữ có cho phép gọi ngầm các kích hoạt được yêu cầu hay không.
1. Xác nhận sự hiện diện các thủ tục lưu trữ không sử dụng bất kỳ.
1. Validate điều kiện Null có thể được thực hiện ở cấp cơ sở dữ liệu.
1. Validate tất cả các Quy trình và Hàm được lưu trữ đã được thực hiện thành công khi Cơ sở dữ liệu được test là blank.
1. Xác nhận tích hợp tổng thể của các mô-đun thủ tục được lưu trữ theo yêu cầu của ứng dụng được thử nghiệm.

Một số công cụ thú vị để test các thủ tục được lưu trữ là LINQ, SP Test tool, v.v.

### Trigger testing
1. Liệu các quy ước mã hóa cần thiết có được tuân theo trong giai đoạn mã hóa của Triggers hay không.
1. Kiểm tra xem các Triggers được thực thi cho các giao dịch DML tương ứng có đáp ứng các điều kiện bắt buộc không.
1. Trigger cập nhật dữ liệu chính xác một khi chúng đã được thực hiện.
1. Validate các chức năng Triggers Cập nhật / Chèn / Xóa được yêu cầu trong lĩnh vực của ứng dụng đang được test.

### Database server validations
![](https://images.viblo.asia/38cf1491-8af8-4950-9521-dc720472f367.png)

1. Kiểm tra cấu hình máy chủ cơ sở dữ liệu theo quy định của các yêu cầu nghiệp vụ.
1. Kiểm tra ủy quyền của người dùng được yêu cầu để chỉ thực hiện các mức hành động được yêu cầu cụ thể.
1. Kiểm tra xem máy chủ cơ sở dữ liệu có thể phục vụ nhu cầu số lượng giao dịch người dùng tối đa được phép theo quy định của thông số kỹ thuật yêu cầu kinh doanh không.

### Functional database testing
Functional database testing theo quy định của đặc tả yêu cầu cần phải đảm bảo hầu hết các giao dịch và hoạt động được thực hiện bởi người dùng cuối phù hợp với thông số kỹ thuật yêu cầu.

Sau đây là các điều kiện cơ bản cần được quan sát để xác nhận cơ sở dữ liệu.

* Liệu trường có bắt buộc hay không trong khi cho phép giá trị NULL trên trường đó.
* Liệu chiều dài của mỗi trường có đủ?
* Liệu tất cả các trường tương tự có cùng tên trên các bảng?
* Liệu có bất kỳ trường tính toán nào có trong Cơ sở dữ liệu không?

Quá trình cụ thể này là xác nhận các trường mappings từ quan điểm người dùng cuối. Trong kịch bản cụ thể này, Tester sẽ thực hiện một thao tác ở cấp cơ sở dữ liệu và sau đó sẽ điều hướng đến mục giao diện người dùng có liên quan để quan sát và xác thực xem việc xác thực trường thích hợp đã được thực hiện hay chưa.

Điều kiện ngược lại, theo đó đầu tiên một thao tác được thực hiện bởi Tester tại giao diện người dùng và sau đó điều tương tự được xác nhận từ phía back end cũng được coi là một tùy chọn hợp lệ.

### Kiểm thử tính toàn vẹn và nhất quán của dữ liệu
Những mục kiểm thử quan trọng:

1. Dữ liệu có được tổ chức hợp lý hay không
1. Liệu dữ liệu được lưu trữ trong các bảng có chính xác và theo yêu cầu kinh doanh không.
1. Có bất kỳ dữ liệu không cần thiết nào có trong ứng dụng không.
1. Liệu dữ liệu đã được lưu trữ theo yêu cầu đối với dữ liệu đã được cập nhật từ giao diện người dùng hay chưa.
1. Liệu các hoạt động TRIM được thực hiện trên dữ liệu trước khi chèn dữ liệu vào cơ sở dữ liệu được kiểm thử.
1. Liệu các giao dịch đã được thực hiện theo các thông số kỹ thuật yêu cầu kinh doanh và liệu kết quả có chính xác hay không.
1. Liệu dữ liệu đã được cam kết đúng hay chưa nếu giao dịch được thực hiện thành công theo yêu cầu kinh doanh.
1. Liệu dữ liệu đã được khôi phục thành công hay chưa nếu giao dịch chưa được thực hiện thành công bởi người dùng cuối.
1. Liệu dữ liệu đã được khôi phục hoàn toàn trong điều kiện giao dịch chưa được thực hiện thành công và nhiều cơ sở dữ liệu không đồng nhất có liên quan đến giao dịch được đề cập hay không.
1. Liệu tất cả các giao dịch đã được thực hiện bằng cách sử dụng các quy trình thiết kế được yêu cầu theo quy định của các yêu cầu nghiệp vụ hệ thống.

### Đăng nhập và bảo mật người dùng
Validate thông tin đăng nhập và bảo mật người dùng cần phải xem xét những điều sau đây.

1. Ứng dụng có ngăn người dùng tiếp tục hay không trong trường hợp
   * Tên người dùng không hợp lệ nhưng mật khẩu hợp lệ
   * Tên người dùng hợp lệ nhưng mật khẩu không hợp lệ.
   * Tên người dùng và mật khẩu không hợp lệ.
   * Tên người dùng hợp lệ và mật khẩu hợp lệ.
1. Người dùng có được phép thực hiện chỉ những hoạt động cụ thể được chỉ định bởi các yêu cầu nghiệp vụ hay không.
1. Liệu dữ liệu được bảo mật từ truy cập trái phép
1. Liệu có các vai trò người dùng khác nhau được tạo với các quyền khác nhau không
1. Liệu tất cả người dùng có yêu cầu cấp truy cập trên Cơ sở dữ liệu được chỉ định theo yêu cầu của thông số kỹ thuật nghiệp vụ hay không.
1. Kiểm tra dữ liệu nhạy cảm như mật khẩu, số thẻ tín dụng được mã hóa và không được lưu trữ dưới dạng văn bản thuần túy trong cơ sở dữ liệu. Đó là một cách tốt để đảm bảo tất cả các tài khoản nên có mật khẩu phức tạp và không dễ đoán.

### Non-functional testing
Non-functional testing trong bối cảnh kiểm tra cơ sở dữ liệu có thể được phân loại thành các loại khác nhau theo yêu cầu kinh doanh. Đây có thể là Load testing, Stress Testing, Security Testing, Usability Testing, Compatibility Testing và vân vân. Việc thực hiện Load testing cũng như Stress Testing có thể được nhóm lại thành Performance Testing, phục vụ hai mục đích cụ thể khi nói đến vai trò của Non-functional testing.

**Định lượng rủi ro** - Định lượng rủi ro thực sự giúp các bên liên quan xác định các yêu cầu về thời gian đáp ứng hệ thống khác nhau theo các mức tải yêu cầu. Đây là mục đích ban đầu của bất kỳ nhiệm vụ đảm bảo chất lượng nào. Chúng ta cần lưu ý rằng Load testing không giảm thiểu rủi ro trực tiếp, nhưng thông qua các quá trình xác định rủi ro và định lượng rủi ro, đưa ra các cơ hội khắc phục và động lực khắc phục sẽ giảm thiểu rủi ro.

**Yêu cầu thiết bị hệ thống tối thiểu** - Sự hiểu biết mà chúng ta quan sát được thông qua test chính thức, cấu hình hệ thống tối thiểu sẽ cho phép hệ thống đáp ứng mong đợi hiệu suất  của các bên liên quan. Vì vậy, phần cứng, phần mềm bên ngoài và chi phí sở hữu liên quan có thể được giảm thiểu. Yêu cầu cụ thể này có thể được phân loại là yêu cầu tối ưu hóa kinh doanh tổng thể.

### Load testing

Các loại cấu hình sau đây là bắt buộc để thực hiện Load testing

1. Các giao dịch người dùng được sử dụng thường xuyên nhất có khả năng ảnh hưởng đến hiệu suất của tất cả các giao dịch khác nếu chúng không hiệu quả.
1. Ít nhất một giao dịch người dùng không chỉnh sửa phải được xuất hiện trong final test suite, để hiệu suất của các giao dịch đó có thể được phân biệt với các giao dịch phức tạp khác.
1. Các giao dịch quan trọng hơn tạo điều kiện thuận lợi cho các mục tiêu cốt lõi của hệ thống nên được đưa vào, vì sự thất bại dưới tải của các giao dịch này sẽ có tác động lớn nhất.
1. Ít nhất một giao dịch có thể chỉnh sửa phải được đưa vào để hiệu suất của các giao dịch đó có thể được phân biệt với các giao dịch khác.
1. Việc quan sát thời gian phản hồi tối ưu dưới số lượng lớn người dùng ảo cho tất cả các yêu cầu tiềm năng.
1. Việc quan sát thời gian hiệu quả để tìm nạp các records khác nhau.

Các công cụ Load testing quan trọng là Load runner, Win runner and JMeter.

### Stress testing
Stress testing đôi khi cũng được gọi là thử nghiệm cực đoan vì nó nhấn mạnh ứng dụng đang được thử nghiệm với khối lượng công việc khổng lồ khiến hệ thống thất bại. Điều này giúp xác định các điểm sự cố của hệ thống.

Các công cụ Stress testing quan trọng là Load runner, Win runner and JMeter.

Các sự cố phổ biến nhất xảy ra trong quá trình kiểm tra cơ sở dữ liệu

1. Số lượng chi phí đáng kể có thể được sử dụng để xác định trạng thái của các giao dịch cơ sở dữ liệu.
1. Giải pháp: Việc lập kế hoạch tổng thể và thời gian nên được tổ chức sao cho không có vấn đề dựa trên thời gian và chi phí xuất hiện.
1. Dữ liệu kiểm thử mới phải được thiết kế sau khi dọn sạch dữ liệu kiểm thử cũ.
1. Giải pháp: Một kế hoạch và phương pháp tạo dữ liệu kiểm thử nên có sẵn.
1. Cần có một trình tạo SQL giúp chuyển đổi các trình xác nhận SQL để đảm bảo các truy vấn SQL có khả năng xử lý các trường hợp kiểm tra cơ sở dữ liệu được yêu cầu.
1. Giải pháp: Bảo trì các truy vấn SQL và cập nhật chúng liên tục là một phần quan trọng của quy trình test tổng thể.
1. Điều kiện tiên quyết được đề cập ở trên đảm bảo rằng việc thiết lập thủ tục kiểm thử cơ sở dữ liệu có thể tốn kém cũng như tốn thời gian.
1. Giải pháp: Cần có sự cân bằng tốt giữa chất lượng và thời gian tiến độ dự án tổng thể.

![](https://images.viblo.asia/cbc19ba1-ceab-4f85-b2c6-29afa5446d98.png)

### Quan niệm sai lầm hoặc hiểu lầm liên quan đến Kiểm tra cơ sở dữ liệu.

1. Kiểm thử cơ sở dữ liệu đòi hỏi nhiều chuyên môn và nó là một công việc rất tẻ nhạt

* Thực tế: Kiểm thử cơ sở dữ liệu hiệu quả và hiệu quả cung cấp sự ổn định chức năng lâu dài cho ứng dụng tổng thể, do đó nó là công việc khó khăn.

2. Kiểm thử cơ sở dữ liệu gây tắc nghẽn công việc

* Thực tế: Ngược lại, kiểm thử cơ sở dữ liệu tăng thêm giá trị cho toàn bộ công việc bằng cách tìm ra các vấn đề tiềm ẩn và do đó chủ động giúp cải thiện ứng dụng tổng thể.

3. Kiểm thử cơ sở dữ liệu làm chậm quá trình phát triển tổng thể

* Thực tế: Kiểm thử cơ sở dữ liệu giúp cải thiện chất lượng tổng thể cho ứng dụng cơ sở dữ liệu.

4. Kiểm thử cơ sở dữ liệu quá tốn kém

* Thực tế: Bất kỳ chi tiêu nào cho kiểm thử cơ sở dữ liệu là một khoản đầu tư dài hạn dẫn đến sự ổn định lâu dài và mạnh mẽ của ứng dụng. Do đó, chi tiêu cho kiểm tra cơ sở dữ liệu là cần thiết.

*Bài viết được dịch lại và chỉnh sửa từ nguồn: https://www.guru99.com/*