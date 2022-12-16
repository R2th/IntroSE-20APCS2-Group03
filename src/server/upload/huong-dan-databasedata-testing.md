Giao diện người dùng trong các trường hợp đều được chú trọng bởi các test manager cũng như các member của development team và Giao diện người dùng là phần dễ thấy nhất của các ứng dụng. Tuy nhiên nó cũng khá là quan trọng để xác nhận các thông tin có thể xem đâu là trọng tâm của các ứng dụng.

Chúng ta hãy xem xét một ứng dụng ngân hàng trong đó 1 user thực hiện các giao dịch. Từ quan điểm của database Testing cần chú ý 1 số điều quan trọng sau:

1. Các ứng dụng lưu trữ các thông tin giao dịch trong application database và hiển thị chúng một cách chính xác tới các user.
2. Không có thông tin nào bị mất trong các tiến trình.
3. Thông tin hoạt động không được thực hiện một phần hoặc không được hủy bỏ sẽ được lưu trong ứng dụng.
4. Không có cá nhân trái phép nào được phép truy cập thông tin người dùng.

Để đảm bảo tất cả các mục tiêu trên, chúng ta cần sử dụng data validation hoặc data testing.

## Database testing là gì?

Database testing là kiểm tra các schema, tables, triggers … của các database dưới môi trường test. Nó có thể liên quan đến việc tạo ra các truy vấn phức tạp để test load/stress các database. Nó kiểm tra tính toàn vẹn và nhất quán của dữ liệu.

Trong phần hướng dẫn này, chúng ta sẽ nghiên cứu những vấn đề sau đây:

• Sự khác nhau giữa GUI và Database Testing
• Các loại Database Testing
• Schema Testing
• Database table, column testing
• Stored procedures testing
• Trigger testing
• Database server validations
• Functional database testing
• Login và user security
• Load testing
• Stress testing
• Myths hay Misconceptions liên quán tới Database Testing
• Best Practices
    
## Sự khác biệt cơ bản giữa user-interface và data testing



| User-Interface testing  | Database or Data testing  |
| -------- | -------- |
| Loại test này cũng được biết đến như là Graphical User Interface testing hay Front-end Testing.     | Loại test này cũng được biết đến như là Back-end Testing hay data testing.      |
| Loại test này chủ yếu đề cập đến tất cả các testable item mà dễ tiếp thu cho người xem và tương tác như Forms, Presentation, Graphs, Menus, and Reports, … (được tạo thông qua VB, VB.net, VC ++, Delphi - Frontend Tools)     | Loại test này chủ yếu đề cập đến tất cả các testable item mà thường bị ẩn từ người xem. Chúng bao gồm tiến trình và lưu trữ nội bộ như Assembly, DBMS như Oracle, SQL Server, MYSQL, …
| Loại test này bao gồm xác thực: các text boxes, các select dropdown,   các calendar và button, điều hướng từ trang này sang trang khác, hiển thị hình ảnh cũng như nhìn và cảm nhận tổng thể ứng dụng.| Loại test này liên quan đến xác thực: các schema, các database table, các column , các key và index, stored procedures, triggers , database server validations, validating data duplication,     |
| Các tester phải hiểu biết đầy đủ về các yêu cầu business cũng như việc sử dụng các công cụ phát triển và việc sử dụng các framework và tool tự động.     | Các tester để mà có thể thực hiện backend testing phải có một background mạnh về các database server và các khái niệm Structured Query Language.      |


## Các loại Database testing

3 loại Database testing là

1. Structural Testing
2. Functional Testing
3. Non-functional Testing

Hãy xem xét từng type và sub-type của nó.

## Structural database testing

Các structural data testing liên quan đến việc xác thực tất cả các thành phần bên trong các kho dữ liệu mà được sử dụng chủ yếu để lưu trữ dữ liệu và không được phép thao tác trực tiếp bởi các end user. Việc xác thực của các database server cũng là một điều rất quan trọng trong các loại test này. Việc hoàn thành giai đoạn này  muốn thành công cần đòi hỏi sự thành thạo trong các SQL query của tester .

## Schema testing

Các khía cạnh chính của schema testing là để đảm bảo rằng các schema mapping giữa các front end và back end là tương tự nhau. Do đó, chúng ta cũng có thể tham khảo schema testing giống như mapping testing.

Chúng ta hãy thảo luận về các điểm quan trọng nhất cho schema testing.

1. Xác thực các định dạng schema khác nhau được liên kết với các database. Nhiều khi các định dạng mapping của các table có thể không tương thích với định dạng mapping hiện tại trong các user interface level của các ứng dụng.
2. Cần xác minh trong các trường hợp không map các tables/views/columns.
3. Cần xác minh xem liệu các database có đồng nhất với nhau không?

Chúng ta hãy xem xét một số công cụ để xác thực các database schema.

* DBUnit được tích hợp với Ant là rất phù hợp với mapping testing.
* Các SQL Server cho phép các tester có thể kiểm tra và query các schema của các database bằng cách viết các query đơn giản và không thông qua code.

Ví dụ, nếu các developer muốn thay đổi 1 table structure hoặc xóa nó, các tester sẽ muốn đảm bảo rằng tất cả các Stored Procedure và View mà sử dụng table đó tương thích với các sự thay đổi đó. Một ví dụ khác có thể là nếu các tester muốn kiểm tra các thay đổi của schema giữa 2 database, họ có thể làm điều đó bằng cách sử dụng các query đơn giản.

## Database table, column testing 

Chúng ta hãy nhìn vào các loại checkpoint khác nhau cho database và column testing.

1. Liệu việc mapping các trường database và column trong back end có tương thích với các mapping  đó trong front end hay không.
2. Xác thực độ dài và quy ước đặt tên của các trường database và column có theo các yêu cầu đã định.
3. Xác nhận sự hiện diện của bất kỳ table/column chưa được sử dụng / chưa được mapping database.
4. Xác nhận tính tương thích của
* Data type
* Field lengths
   của các backend database column với các backend database column có sẵn trong front end của ứng dụng.

5. Liệu các trường database có cho phép các user cung cấp các user input mong muốn theo yêu cầu của các business requirement specification hay không.

## Key và index testing

Kiểm tra quan trọng cho  key và index:

1. Kiểm tra xem liệu các yêu cầu
    • Primary Key
    • Foreign Key
    ràng buộc đã được tạo ra trên các table được yêu cầu hay chưa.

2. Kiểm tra xem liệu các tài liệu tham khảo cho các foreign key có hợp lệ hay không.
3. Kiểm tra xem liệu các kiểu dữ liệu của primary key và foreign key tương ứng có giống nhau trong 2 table hay không.
4. Kiểm tra xem liệu các quy ước đặt tên được yêu cầu có tuân thủ cho tất cả các key và index hay không.
5. Kiểm tra kích thước và độ dài của key và index được yêu cầu.
6. Liệu các yêu cầu

* Clustered indexes
* Non Clustered indexes
 đã được tạo trên các table được yêu cầu như được chỉ định bởi các business requirement hay chưa.
 
## Stored procedures testing

Danh sách những điều quan trọng nhất cần được xác thực cho các stored procedure.

1. Liệu các development team có chấp nhận các yêu cầu 

* Coding standard conventions
* Exception và error handling

   cho tất cả các stored procedure cho tất cả các mô-đun cho ứng dụng đang test không.

1. Liệu các development team có cover tất cả các condition/loop bằng cách áp dụng dữ liệu đầu vào cần thiết cho các ứng dụng đang test không.
2. Liệu các development team đã áp dụng đúng các phép toán TRIM bất cứ khi nào dữ liệu được lấy từ các table được yêu cầu trong các database không.
3. Liệu các thực thi thủ công của các Stored Procedure có cung cấp cho các end user với các kết quả được yêu cầu hay không
4. Liệu các thực thi thủ công của các Stored Procedure có đảm bảo các trường của các table đang được cập nhật theo yêu cầu của ứng dụng đang test hay không.
5. Liệu các thực thi của các Stored Procedure có cho phép tiềm ẩn invoking của các trigger được yêu cầu không.
6. Xác thực sự hiện diện của bất kỳ Stored Procedure chưa được sử dụng nào.
7. Xác thực để cho phép Null condition có thể được thực hiện ở các database level.
8. Xác thực thực tế tất cả các Stored Procedure và function đã được thực hiện thành công khi các database đang test là trống.
9. Xác thực sự tích hợp tổng thể của các mô-đun Stored Procedure theo mỗi yêu cầu của ứng dụng đang test.

Một số công cụ thú vị để test các Stored Procedure là LINQ, SP test tool...

## Trigger testing

1. Liệu các quy ước mã hóa bắt buộc có được tuân thủ trong suốt giai đoạn mã hóa của các trigger hay không.
2. Kiểm tra xem liệu các trigger được thực hiện cho các giao dịch DML tương ứng có đáp ứng các điều kiện bắt buộc hay không.
3. Liệu các trigger có cập nhật các dữ liệu chính xác khi chúng đã được thực hiện hay không.
4. Xác thực của các chức năng của các trigger Update/Insert/Delete được yêu cầu trong các lĩnh vực của các ứng dụng đang được test.

## Database server validations

1. Kiểm tra cấu hình của các database server theo yêu cầu của các business requirement.
2. Kiểm tra sự cho phép của user được yêu cầu để thực hiện chỉ các cấp độ cho phép của hành động mà ứng dụng yêu cầu.
3. Kiểm tra xem các database server có thể đáp ứng nhu cầu số lượng giao dịch tối đa của user được cho phép như đã chỉ ra bởi các business requirement hay không.

## Functional database testing

Các Functional database testing khi được chỉ ra bởi các requirement specification cần đảm bảo hầu hết các giao dịch và hoạt động được thực hiện bởi end user đều nhất quán với các requirement specification.

Sau đây là các điều kiện cơ bản cần được quan sát cho việc xác thực database.

* Liệu các trường là bắt buộc trong khi cho phép giá trị NULL trên trường đó.
* Liệu chiều dài của mỗi trường có đủ kích thước không?
* Liệu tất cả các trường tương tự có cùng tên trên các table không?
* Liệu có bất kỳ trường được tính toán hiện hành nào có trong database không?

Quá trình cụ thể này là các xác thực của các mapping của các trường từ quan điểm của end user. Trong trường hợp cụ thể này, các tester sẽ thực hiện một phép toán ở cấp độ database và sau đó sẽ điều hướng đến các user interface item có liên quan để quan sát và xác nhận xem liệu các trường xác thực hợp lệ đã được thực hiện hay chưa.

Điều kiện ngược lại, trong đó một phép toán trước tiên được thực hiện bởi các tester tại các user interface và sau đó điều tương tự được xác nhận từ back end cũng được coi là một lựa chọn hợp lệ.

## Kiểm tra tính toàn vẹn và nhất quán của dữ liệu
1. 
Các kiểm tra sau đây rất quan trọng

1. Liệu dữ liệu có được tổ chức hợp lý hay không
2. Liệu các dữ liệu được lưu trữ trong các table có chính xác và theo yêu cầu của các business requirement hay không.
3. Liệu có bất kỳ dữ liệu hiện hành không cần thiết nào có trong các ứng dụng đang test hay không.
4. Liệu dữ liệu có được lưu trữ theo các yêu cầu đối với dữ liệu liên quan cái mà đã được cập nhật từ các user interface hay không.
5. Liệu các phép toán TRIM có được thực hiện trên dữ liệu trước khi chèn dữ liệu vào các database đang test hay không.
6. Liệu các giao dịch đã được thực hiện theo các business requirement specifications hay chưa và liệu các kết quả có chính xác hay không.
7. Liệu các dữ liệu đã được cam kết chính xác chưa nếu các giao dịch đã được thực hiện thành công theo các business requirements.
8. Liệu các dữ liệu đã được khôi phục thành công chưa nếu các giao dịch chưa được thực hiện thành công bởi các end user.
9. Liệu các dữ liệu đã được khôi phục tất cả trong các điều kiện mà giao dịch chưa được thực hiện thành công và nhiều cơ sở dữ liệu không đồng nhất đã tham gia vào các giao dịch được đề cập.
10. Liệu tất cả các giao dịch đã được thực hiện bằng cách sử dụng các design procedure được yêu cầu theo quy định của các system business requirement hay chưa.

## Login và user security

Việc xác thực khả năng Login và user security cần phải xem xét những điều sau đây.

1. Liệu các ứng dụng có ngăn các user thao tác tiếp trong ứng dụng trong trường hợp
* username không hợp lệ nhưng password hợp lệ
* username hợp lệ nhưng password không hợp lệ.
* username không hợp lệ và password không hợp lệ.
* username hợp lệ và password hợp lệ.

1. Liệu các user được phép thực hiện chỉ các hoạt động cụ thể được chỉ định bởi các business requirement hay không.
2. Liệu dữ liệu có được bảo vệ khỏi truy cập trái phép hay không
3. Liệu có vai trò user khác nhau được tạo với các quyền khác nhau hay không
4. Liệu tất cả user có các cấp độ cần thiết của việc truy cập trên các database cụ thể được chỉ định theo yêu cầu của các business specification hay không.
5. Kiểm tra dữ liệu nhạy cảm như password, credit card number được mã hóa và không được lưu trữ dưới dạng văn bản thuần túy trong database. Đó là một phương pháp hay để đảm bảo tất cả các tài khoản phải có password phức tạp và không dễ đoán.

## Non-functional testing

Non-functional testing trong bối cảnh database testing có thể được phân loại thành các loại khác nhau theo yêu cầu của các business requirement. Nó có thể là load testing, Stress Testing, Security Testing, Usability Testing, và Compatibility Testing,... Load testing cũng như Stress Testing cái mà có thể được nhóm lại theo cả hai mục đích cụ thể của performance testing khi nói đến vai trò của Non-functional testing.

**Risk quantification** - Định lượng rủi ro thực sự giúp các bên liên quan xác định các yêu cầu khác nhau về thời gian đáp ứng của hệ thống theo các cấp độ được yêu cầu. Đây là mục đích ban đầu của bất kỳ nhiệm vụ đảm bảo chất lượng nào. Chúng ta cần lưu ý rằng load testing không giảm thiểu rủi ro trực tiếp, nhưng thông qua các quá trình xác định rủi ro và định lượng rủi ro, đưa ra các cơ hội khắc phục và động lực để khắc phục cái mà sẽ giảm thiểu rủi ro.

**Minimum system equipment requirement** - Sự hiểu biết mà chúng ta nhận ra thông qua formal testing, các cấu hình hệ thống tối thiểu sẽ cho phép hệ thống đáp ứng các kỳ vọng hiệu năng của các bên liên quan. Vì vậy, phần cứng, phần mềm không liên quan và chi phí sở hữu có liên quan có thể được giảm thiểu. Yêu cầu cụ thể này có thể được phân loại như các yêu cầu tối ưu business.

## Load testing

Mục đích của bất kỳ load test nào cần được hiểu rõ và ghi lại.

Các loại cấu hình sau đây là 1 bắt buộc cho load testing.

1. Các giao dịch của user thường xuyên sử dụng nhất có khả năng tác động đến hiệu suất của tất cả các giao dịch khác nếu chúng không hiệu quả.
2. Ít nhất một giao dịch non-editing của user phải được bao gồm trong bộ final test, do đó hiệu suất của mỗi giao dịch có thể được phân biệt từ các giao dịch phức tạp khác.
3. Các giao dịch quan trọng hơn mà thuận tiện cho các mục tiêu chính của hệ thống nên được đưa vào, vì lỗi load của các giao dịch này, theo định nghĩa, tác động lớn nhất.
4. Ít nhất một giao dịch editable cần được đưa vào bởi hiệu suất của mỗi giao dịch có thể được phân biệt từ các giao dịch khác.
5. Quan sát thời gian đáp ứng tối ưu dưới số lượng lớn user ảo cho tất cả các yêu cầu sau này.
6. Quan sát thời gian hiệu quả để tìm kiếm các bản ghi khác nhau.

Các công cụ load testing quan trọng là load runner, win runner và JMeter.

## Stress testing

Stress testing đôi khi còn được gọi là torturous testing vì nó dùng nhiều lần ứng dụng đang test với tải trọng công việc lớn đến mức hệ thống lỗi. Điều này giúp xác định các điểm breakdown của hệ thống.

Các công cụ stress testing quan trọng là oad runner, win runner và JMeter.

Các vấn đề thường xảy ra nhất trong database testing

1. Một lượng chi phí đáng kể có thể bỏ ra để xác định trạng thái của các giao dịch database.
2. Giải pháp: Việc lập kế hoạch và thời gian nên được tổ chức để không có vấn đề thời gian và chi phí nào xuất hiện.
3. Dữ liệu test mới phải được thiết kế sau khi làm sạch dữ liệu test cũ.
4. Giải pháp: Một kế hoạch và phương pháp trước cho việc tạo dữ liệu test phải ở trong tầm tay.
5. 1 SQL generator được yêu cầu để chuyển đổi các chương trình SQL để đảm bảo các truy vấn SQL thích hợp để xử lý các database test case cần thiết.
6. Giải pháp: Bảo trì các truy vấn SQL và cập nhật chúng liên tục là một phần quan trọng của quá trình test tổng thể, là một phần của chiến lược test tổng thể.
7. Điều kiện tiên quyết được đề cập ở trên đảm bảo rằng việc thiết lập các database testing procedure có thể tốn kém cũng như tốn thời gian.
8. Giải pháp: Cần có sự cân bằng giữa chất lượng và thời gian biểu của dự án.

### Myths hay Misconceptions liên quan tới Database Testing.

1. Database testing đòi hỏi rất nhiều chuyên môn và nó là một công việc rất tẻ nhạt
* Thực tế: hiệu quả của database testing cung cấp sự ổn định chức năng lâu dài cho ứng dụng lớn do đó nó là cần thiết để đưa vào.

2. Database testing bổ sung thêm extra work bottleneck
* Thực tế: Ngược lại, Database testing bổ sung nhiều giá trị hơn cho công việc tổng thể bằng cách tìm ra các vấn đề tiềm ẩn và do đó tích cực giúp cải thiện ứng dụng.

3. Database testing làm chậm quá trình phát triển tổng thể xuống
* Thực tế: Số lượng đáng kể của database testing giúp cải thiện tổng thể chất lượng cho các database application.

4. Database testing có thể quá tốn kém
* Thực tế: Bất kỳ chi phí nào cho database testing là một đầu tư dài hạn dẫn đến sự ổn định lâu dài và tính bền vững của ứng dụng. Do đó chi phí cho Database testing là cần thiết.

## Best Practices

* Tất cả dữ liệu bao gồm metadata cũng như các functional data cần phải được xác thực theo mapping của chúng bằng các tài liệu requirement specification.
* Việc xác minh các dữ liệu test đã được tạo ra bởi truy vấn với development team cần phải được xác nhận.
* Xác thực dữ liệu đầu ra bằng cách sử dụng cả manual cũng như automaton procedure.
* Triển khai các kỹ thuật khác nhau như kỹ thuật vẽ đồ thị hiệu ứng nguyên nhân, kỹ thuật phân vùng tương đương và kỹ thuật phân tích giá trị biên để tạo ra các điều kiện test dữ liệu được yêu cầu.
* Các quy tắc xác nhận tính toàn vẹn tham chiếu cho các database table cần thiết cũng cần phải được xác nhận hợp lệ.
* Việc lựa chọn các giá trị table mặc định để xác nhận tính nhất quán của database là một khái niệm rất quan trọng Cho dù các log event đã được thêm thành công vào database đối với tất cả các login event được yêu cầu
* Các công việc theo lịch trình có thực hiện đúng lúc không?
* Sao lưu database  kịp thời.

Tham khảo: [https://www.guru99.com/data-testing.html](https://www.guru99.com/data-testing.html)