Tiếp tục về Database Testing ...
Như phần trước chúng ta đã tìm hiểu qua được về Database Testing: Overview, Type, Processes, Techniques. Bài này mình xin chia sẻ thêm về Scenarios, Object, Data Integrity, Data Mapping...

# V.  Scenarios

Trong chương này, chúng ta sẽ thấy một số kịch bản thử nghiệm cơ sở dữ liệu phổ biến đối với các phương pháp thử nghiệm khác nhau.

## Structured Database Testing 

Các kịch bản cơ sở dữ liệu chung về Kiểm tra cơ sở dữ liệu có cấu trúc được đưa ra dưới đây:

- Xác minh tên cơ sở dữ liệu, xác minh thiết bị dữ liệu, thiết bị đăng nhập và thiết bị đổ, xác minh xem có đủ không gian được phân bổ cho từng cơ sở dữ liệu và xác minh thiết lập tùy chọn cơ sở dữ liệu hay không.

- Tên của tất cả các bảng trong cơ sở dữ liệu, tên cột cho mỗi bảng, loại cột cho mỗi bảng, kiểm tra giá trị null hay không. Xác minh khóa và chỉ mục trong mỗi bảng: Khóa chính cho mỗi bảng, khóa ngoài cho mỗi bảng.

- Các kiểu dữ liệu giữa một cột khóa ngoài và một cột trong bảng khác Các chỉ mục, nhóm hoặc không phân cụm duy nhất hoặc không phải là duy nhất.

## Functional Database Testing

Các kịch bản cơ sở dữ liệu thử nghiệm chung liên quan đến Kiểm tra cơ sở dữ liệu chức năng là:

- Tìm ra lược đồ, trình kích hoạt và các thủ tục lưu trữ chịu trách nhiệm thực hiện hàm đó và biến chúng thành một nhóm chức năng và sau đó mỗi nhóm có thể được kiểm tra cùng nhau.

- Kiểm tra luồng dữ liệu và xem nơi bạn có thể kiểm tra dữ liệu. Bắt đầu từ front-end.

## Non-Functional Database Testing

Các kịch bản Cơ sở dữ liệu thử nghiệm chung liên quan đến Kiểm tra cơ sở dữ liệu không có chức năng là:

- Viết kịch bản thử nghiệm để thử các chức năng chính và mọi chức năng phải được kiểm tra ít nhất một lần trong một chu kỳ đầy đủ.

- Thực hiện các tập lệnh thử nghiệm một lần nữa và một lần nữa trong một khoảng thời gian cụ thể.

- Xác minh các tệp nhật ký để kiểm tra bất kỳ bế tắc nào, lỗi trong bộ nhớ, hỏng dữ liệu, v.v.

- Viết truy vấn từ giao diện người dùng và đưa ra các tìm kiếm. Nhận bản ghi hiện có, thay đổi giá trị trong một số trường và lưu bản ghi. (Nó liên quan đến câu lệnh UPDATE hoặc cập nhật các thủ tục được lưu trữ, kích hoạt cập nhật.)

- Chèn một mục menu mới trong cửa sổ front-end. Điền thông tin và lưu bản ghi. (Nó liên quan đến các câu lệnh INSERT hoặc các thủ tục được lưu trữ chèn, các trình kích hoạt xóa).

- Chọn một bản ghi hiện có, nhấp vào nút XÓA hoặc XÓA, và xác nhận việc xóa. (Nó liên quan đến DELETE tuyên bố hoặc xóa các thủ tục được lưu trữ, kích hoạt xóa.)

- Lặp lại các trường hợp thử nghiệm này với dữ liệu không hợp lệ và xem cơ sở dữ liệu phản hồi như thế nào.

# VI.  Objects

Các lược đồ, các bảng, các thủ tục lưu sẵn và Triggers là các đối tượng chính của một cơ sở dữ liệu. Chúng tôi đã chia sẻ các loại thử nghiệm DB và các kịch bản thử nghiệm cho các đối tượng cơ sở dữ liệu này.

## Schemas

Lược đồ cơ sở dữ liệu định nghĩa cấu trúc của hệ thống cơ sở dữ liệu theo định dạng được hệ thống quản lý cơ sở dữ liệu hỗ trợ. Một lược đồ đề cập đến cách một cơ sở dữ liệu được cấu trúc (bao gồm các bảng cơ sở dữ liệu trong trường hợp cơ sở dữ liệu quan hệ).

Lược đồ cơ sở dữ liệu là tập hợp các công thức được gọi là ràng buộc toàn vẹn được áp đặt trên cơ sở dữ liệu. Các ràng buộc toàn vẹn này đảm bảo tính tương thích giữa các phần của lược đồ.

Trong một cơ sở dữ liệu quan hệ, lược đồ bao gồm các bảng, các trường, các khung nhìn, các chỉ mục, các gói, các thủ tục, các hàm, trình kích hoạt, các kiểu, khung nhìn vật hoá, từ đồng nghĩa, liên kết cơ sở dữ liệu và các phần tử khác.

Các lược đồ thường được lưu trữ trong một từ điển dữ liệu. Mặc dù một lược đồ được định nghĩa trong ngôn ngữ cơ sở dữ liệu văn bản, thuật ngữ này thường được sử dụng để chỉ một mô tả đồ họa của cấu trúc cơ sở dữ liệu. Nói cách khác, lược đồ là cấu trúc của cơ sở dữ liệu xác định các đối tượng trong cơ sở dữ liệu.

Loại lược đồ chung được sử dụng trong kho dữ liệu là:

- Lược đồ hình sao
- Snowflakes Schema
- Galaxy Schema

## Tables in Database

Trong một cơ sở dữ liệu quan hệ, một bảng được sử dụng để sắp xếp thông tin thành các hàng và cột.

Ví dụ - Bảng khách hàng chứa thông tin như id khách hàng, địa chỉ, số điện thoại, v.v ... như một loạt các cột.

Mỗi phần dữ liệu là một trường trong bảng. Một cột bao gồm tất cả các mục trong một trường đơn lẻ, chẳng hạn như số điện thoại của tất cả các khách hàng. Các trường được tổ chức dưới dạng bản ghi, là tập hợp đầy đủ các thông tin (chẳng hạn như tập hợp thông tin về một khách hàng cụ thể), mỗi phần bao gồm một hàng.

## Stored Procedures

Một thủ tục lưu sẵn là một loạt các câu lệnh SQL được lưu trữ trong cơ sở dữ liệu dưới dạng được biên dịch và nhiều chương trình có thể chia sẻ nó. Việc sử dụng các thủ tục lưu sẵn có thể hữu ích trong việc duy trì tính toàn vẹn dữ liệu, truy cập kiểm soát dữ liệu và cải thiện năng suất.

## Triggers

Trình kích hoạt cơ sở dữ liệu là mã được thực thi để đáp ứng với các sự kiện nhất định trên một bảng hoặc khung nhìn cụ thể trong cơ sở dữ liệu. Trình kích hoạt chủ yếu được sử dụng để duy trì tính toàn vẹn của thông tin trên cơ sở dữ liệu.

# VII. Data Integrity

Tính toàn vẹn dữ liệu quan trọng trong cơ sở dữ liệu. Nó bao gồm xác thực dữ liệu trước khi chèn, cập nhật và xóa. Các trình kích hoạt phải có hiệu lực để xác nhận các bản ghi bảng tham chiếu.

Để kiểm tra tính toàn vẹn dữ liệu, bạn cần thực hiện các thao tác sau:

- Bạn cần phải kiểm tra các cột chính trong mỗi bảng và xác minh xem có tồn tại bất kỳ dữ liệu không chính xác nào không. (Ký tự trong trường tên, tỷ lệ phần trăm âm, v.v.)

- Tìm hiểu dữ liệu không phù hợp và chèn chúng vào các bảng có liên quan và xem có xảy ra lỗi không.

- Chèn dữ liệu con trước khi chèn dữ liệu của cha mẹ. Cố gắng xóa một bản ghi vẫn được tham chiếu bởi dữ liệu trong bảng khác.

- Nếu dữ liệu trong bảng được cập nhật, hãy kiểm tra xem liệu dữ liệu có liên quan khác có được cập nhật không. Bạn cần đảm bảo rằng các máy chủ hoặc cơ sở dữ liệu được sao chép được đồng bộ hóa và chứa thông tin nhất quán.

# VIII. Data Mapping

Data mapping trong cơ sở dữ liệu là một trong những khái niệm then chốt cần được kiểm chứng bởi mọi người kiểm thử. Thông thường, người thử nghiệm phải xác minh ánh xạ trường giao diện người dùng cuối giao diện người dùng với trường cơ sở dữ liệu phía sau tương ứng.

Thông tin này được cung cấp trong Đặc tả yêu cầu phần mềm hoặc tài liệu đặc tả yêu cầu kinh doanh tài liệu SRS / BRS. Nếu ánh xạ không được cung cấp, thì bạn cần kiểm tra phần mã hóa.

Khi bạn thực hiện bất kỳ hành động nào trong ứng dụng đầu cuối, có một hành động CRUD tương ứng được gọi và trình kiểm tra phải kiểm tra mọi hành động được gọi có thành công hay không.

**1. Key Aspects of Data Mapping**

Dưới đây là các khía cạnh chính của Data Mapping:

- Để kiểm tra các trường trong giao diện Người dùng / Giao diện người dùng và được ánh xạ liên tục với bảng DB tương ứng. Thông tin lập bản đồ này được xác định trong các tài liệu yêu cầu như đã đề cập ở trên.

- Đối với bất kỳ hành động nào được thực hiện trong giao diện người dùng của ứng dụng, hành động 'Tạo, Truy xuất, Cập nhật và xóa'  CRUD tương ứng sẽ được bắt đầu ở phía sau.

- Người kiểm tra sẽ phải kiểm tra xem hành động đúng có được gọi hay không và hành động được gọi trong chính nó là thành công hay không.

**2. Steps in Data Mapping Testing**

Dưới đây là các bước tiếp theo cho Data Mapping:

- Bước 1 - Trước tiên hãy kiểm tra lỗi cú pháp trong mỗi tập lệnh.

- Bước 2 - Tiếp theo là kiểm tra ánh xạ bảng, ánh xạ cột và ánh xạ kiểu dữ liệu.

- Bước 3 - Xác minh ánh xạ dữ liệu tra cứu.

- Bước 4 - Chạy mỗi tập lệnh khi các bản ghi không tồn tại trong các bảng đích.

- Bước 5 - Chạy từng kịch bản khi các bản ghi đã tồn tại trong các bảng đích.

# IX. Performance

Ứng dụng có thời gian phản hồi nhiều hơn và hiệu suất kém có thể dẫn đến các vấn đề lớn. Kiểm tra tải cơ sở dữ liệu được sử dụng để tìm bất kỳ vấn đề hiệu năng nào trước khi bạn triển khai các ứng dụng cơ sở dữ liệu của bạn cho người dùng cuối.

Kiểm tra tải cơ sở dữ liệu giúp bạn thiết kế ứng dụng cơ sở dữ liệu cho hiệu suất, độ tin cậy và khả năng mở rộng. Tải thử nghiệm của các ứng dụng cơ sở dữ liệu liên quan đến việc kiểm tra hiệu suất và khả năng mở rộng của ứng dụng cơ sở dữ liệu của bạn với tải người dùng khác nhau.

Kiểm tra tải cơ sở dữ liệu bao gồm việc mô phỏng tải người dùng thực tế cho ứng dụng cơ sở dữ liệu đích. Nó giúp bạn xác định cách ứng dụng Cơ sở dữ liệu của bạn hoạt động như thế nào khi nhiều người dùng truy cập cùng một lúc.

**1. Load Testing**

Mục tiêu chính của Load Testing là để kiểm tra xem hầu hết các giao dịch đang chạy có tác động hiệu suất trên cơ sở dữ liệu hay không. Trong thử nghiệm tải, bạn cần kiểm tra các khía cạnh sau:

- Thời gian phản hồi để thực hiện các giao dịch cho nhiều người dùng từ xa cần được kiểm tra.

- Với các giao dịch thông thường, bạn nên bao gồm một giao dịch có thể chỉnh sửa để kiểm tra hiệu suất của cơ sở dữ liệu cho các giao dịch pf loại này.

- Với các giao dịch thông thường, bạn nên bao gồm một giao dịch không chỉnh sửa để kiểm tra hiệu suất của cơ sở dữ liệu cho các loại giao dịch này.

- Thời gian thực hiện bởi cơ sở dữ liệu để lấy các bản ghi cụ thể cần được kiểm tra.

**2. Stress Testing**

Stress Testing được thực hiện để xác định điểm ngắt hệ thống. Ở đây, ứng dụng được tải theo cách mà hệ thống không thành công tại một thời điểm. Điểm này được gọi là điểm ngắt của hệ thống cơ sở dữ liệu. Kiểm tra căng thẳng còn được gọi là Fatigue Testing.

Xác định trạng thái của các giao dịch cơ sở dữ liệu liên quan đến một lượng đáng kể nỗ lực. Lập kế hoạch thích hợp là cần thiết để tránh mọi vấn đề về thời gian và chi phí.

Các công cụ kiểm tra căng thẳng phổ biến nhất là LoadRunner và WinRunner.

# X. Tools

Có nhiều công cụ được cung cấp bởi các nhà cung cấp có thể được sử dụng để tạo ra dữ liệu Kiểm tra, để quản lý dữ liệu Kiểm tra và thực hiện kiểm tra cơ sở dữ liệu như Load Testing and Regression Testing.

Một số công cụ phổ biến được sử dụng:



| No. | Category & Description | Examples |
| -------- | -------- | -------- |
| 1    | **Load Testing Tools:** Những công cụ này được sử dụng để đặt tải sử dụng cao trên cơ sở dữ liệu của bạn, cho phép xác định liệu cảnh quan hệ thống của bạn có phù hợp với nhu cầu kinh doanh của bạn hay không. | Web Performance  Rad View  Mercury |
| 2    | **Data Security Tools:** Những công cụ này được sử dụng để thực hiện việc tuân thủ và các tiêu chuẩn theo các quy định bảo mật thông tin.   | IBM Optim Data Privacy    |
| 3    | **Test Data generator tools:**  Tester sử dụng các công cụ này để tạo dữ liệu thử nghiệm cho một hệ thống cơ sở dữ liệu. Đây là chủ yếu cần thiết khi bạn có số lượng lớn dữ liệu và bạn cần mẫu để thực hiện kiểm tra DB. Nó thường được sử dụng để kiểm tra tải và căng thẳng.  | Data Factory,   DTM Data Generator,  Turbo Data |
| 4    | **Test Data Management Tool:**  Các công cụ này được sử dụng để duy trì kiểm soát phiên bản cho dữ liệu thử nghiệm. Bạn phải xác định kết quả mong đợi và sau đó bạn so sánh nó với kết quả thực tế của các bài kiểm tra.   | IBM Optim Test Data Management    |
| 5    | **Tools to perform Unit Testing:**  Các công cụ này được sử dụng để thực hiện kiểm tra hồi quy trên cơ sở dữ liệu của bạn.   | SQLUnit,   TSQLUnit,  DBFit, DBUnit  |



# XI. Backup
Phần quan trọng nhất của sự tăng trưởng của tổ chức là dữ liệu của nó. Trong trường hợp lỗi hệ thống, cần khôi phục dữ liệu. Sao lưu là bản sao chính xác của cơ sở dữ liệu, giúp bạn khôi phục dữ liệu của mình trong trường hợp mất dữ liệu.

![](https://images.viblo.asia/293b4aa6-83ad-492e-9eac-2cd39092debb.png)


Hãy xem xét một công ty tài chính có dữ liệu liên quan đến khách hàng của họ như số A / C, tên khách hàng, tín dụng và ghi nợ, thời gian, v.v .. Làm thế nào một tổ chức có thể chịu áp lực mất thông tin quan trọng trong trường hợp mất dữ liệu?

Đây là lý do bạn sao lưu dữ liệu để trong trường hợp bất kỳ sự thất bại của một đĩa, bộ điều khiển đĩa, vv bạn có thể dựa vào sao lưu để khôi phục nó vào cơ sở dữ liệu.

**1. Types of Data Backups**

Có hai loại sao lưu có thể được sử dụng:

- **Physical Backups** - Sao lưu vật lý bao gồm việc sao lưu bằng các công cụ sao lưu của bên thứ ba như Veritas Net Back, IBM Tivoli Manager hoặc bản sao lưu người quản lý người dùng bằng các tiện ích hệ điều hành.

- **Logical Backups** - Sao lưu hợp lý của cơ sở dữ liệu bao gồm việc sao lưu các đối tượng logic như bảng, chỉ mục, thủ tục, v.v.

Ví dụ - Một trong những công cụ phổ biến để sao lưu dữ liệu là Oracle Recovery Manager (RMAN) là một tiện ích của Oracle để thực hiện sao lưu cơ sở dữ liệu.

RMAN bao gồm hai thành phần:

- Target database cần sao lưu.

- RMAN client được sử dụng để chạy các lệnh để thực hiện sao lưu dữ liệu.

**BACKUP VALIDATE** được sử dụng để kiểm tra xem bạn có thể sao lưu hợp lệ các tệp cơ sở dữ liệu không. Nó đảm bảo:

- Nếu sao lưu được đặt ra cho các đối tượng vật lý hoặc logic của cơ sở dữ liệu.
- Nếu sao lưu thường xuyên được thiết lập cho dữ liệu vô giá.
- Nếu công cụ sao lưu đáp ứng các yêu cầu sao lưu của một tổ chức.


# XII. Recovery

**Database recovery testing** được sử dụng để đảm bảo rằng cơ sở dữ liệu được phục hồi. Thử nghiệm khôi phục cho phép bạn tìm hiểu xem ứng dụng có đang chạy đúng hay không và kiểm tra truy xuất dữ liệu vô giá có thể bị mất nếu phương pháp khôi phục của bạn không được thiết lập đúng cách.

Bạn cũng kiểm tra xem một số quy trình quan trọng đang chạy trơn tru để đảm bảo rằng việc phục hồi dữ liệu sẽ trôi qua thông suốt giai đoạn thử nghiệm.

Bạn có thể thực hiện các kiểm tra sau để khôi phục cơ sở dữ liệu:

- Bất kỳ lỗi hoặc sai sót nào trong phần mềm sao lưu và bạn cần giải quyết những vấn đề này ở giai đoạn trước đó.

- Bạn cần phải tiến hành kiểm tra phục hồi để bạn sẽ biết phải làm gì trong trường hợp khẩn cấp.

- Bạn cần phải kiểm tra nhu cầu thử nghiệm khôi phục để bạn có thể lập kế hoạch cho chiến lược khôi phục hiệu quả.

- Bạn cũng nên biết cách bạn có thể khôi phục tài liệu.

Bạn cần phải chạy các bài kiểm tra phục hồi trong giai đoạn đầu của dự án. Điều này cho phép bạn loại bỏ và vứt bỏ mọi loại lỗi từ hệ thống. Dưới đây là danh sách một số điểm quan trọng cần được xem xét tại thời điểm thử nghiệm -

- Khoảng thời gian khi thay đổi hoặc sửa đổi xảy ra trong hệ thống cơ sở dữ liệu.

- Khoảng thời gian mà bạn muốn thực hiện kế hoạch khôi phục của mình.

- Độ nhạy của dữ liệu trong hệ thống cơ sở dữ liệu. Dữ liệu quan trọng hơn, bạn càng thường xuyên phải kiểm tra phần mềm.


**Common Steps in Database Backup and Recovery Testing**

Trong thử nghiệm khôi phục cơ sở dữ liệu, bạn cần phải chạy thử nghiệm trong môi trường thực tế để kiểm tra xem hệ thống hoặc dữ liệu thực sự có thể được phục hồi trong trường hợp có bất kỳ thảm họa và bất kỳ sự kiện không lường trước nào khác trong môi trường kinh doanh hay không.

Đưa ra dưới đây là các hành động phổ biến được thực hiện trong Thử nghiệm khôi phục cơ sở dữ liệu:

- Kiểm tra hệ thống cơ sở dữ liệu
- Kiểm tra các tệp SQL
- Kiểm tra các tệp một phần
- Kiểm tra sao lưu dữ liệu
- Kiểm tra công cụ sao lưu
- Kiểm tra sao lưu nhật ký


# XIII. Security

Database security testing được thực hiện để tìm các lỗ hổng trong các cơ chế bảo mật và cũng về việc tìm ra các lỗ hổng hoặc điểm yếu của hệ thống cơ sở dữ liệu.

Mục tiêu chính của kiểm tra bảo mật cơ sở dữ liệu là tìm ra các lỗ hổng trong một hệ thống và để xác định xem dữ liệu và tài nguyên của nó có được bảo vệ khỏi những kẻ xâm nhập tiềm ẩn hay không. Kiểm tra bảo mật xác định một cách để xác định các lỗ hổng tiềm năng một cách hiệu quả, khi được thực hiện thường xuyên.

Đưa ra dưới đây là các mục tiêu chính của việc thực hiện kiểm tra bảo mật cơ sở dữ liệu:

- Xác thực
- Ủy quyền
- Bảo mật
- Khả dụng
- Chính trực
- Khả năng phục hồi

## Các mối đe dọa trên Database System

**1. SQL Injection**

Đây là loại tấn công phổ biến nhất trong một hệ thống cơ sở dữ liệu, nơi các câu lệnh SQL độc hại được chèn vào trong hệ thống cơ sở dữ liệu và được thực thi để lấy thông tin quan trọng từ hệ thống cơ sở dữ liệu. Cuộc tấn công này tận dụng lợi thế của sơ hở trong việc thực hiện các ứng dụng của người dùng. Để ngăn chặn điều này, người dùng nhập các trường cần được xử lý cẩn thận.

**2. Privilege Elevation in Database** 

Trong cuộc tấn công này, người dùng đã có một số truy cập trong hệ thống cơ sở dữ liệu và anh ta chỉ cố gắng nâng cấp quyền truy cập này cao hơn để anh ta / cô ấy có thể thực hiện một số hoạt động trái phép trong hệ thống cơ sở dữ liệu.

**3. Denial of Service** 

Trong kiểu tấn công này, kẻ tấn công làm cho một hệ thống cơ sở dữ liệu hoặc tài nguyên ứng dụng không có sẵn cho người dùng hợp pháp của nó. Các ứng dụng cũng có thể bị tấn công theo cách khiến ứng dụng hiển thị và đôi khi toàn bộ máy, không sử dụng được.

**4. Unauthorized Access to data**

Một loại tấn công khác là truy cập trái phép vào dữ liệu trong một ứng dụng hoặc hệ thống cơ sở dữ liệu. Truy cập trái phép bao gồm:

- Truy cập trái phép vào dữ liệu qua các ứng dụng dựa trên người dùng
- Truy cập trái phép bằng cách theo dõi quyền truy cập của người khác
- Truy cập trái phép vào thông tin xác thực ứng dụng khách có thể sử dụng lại

**5. Identity Spoofing**

Trong Identity Spoofing, tin tặc sử dụng thông tin đăng nhập của người dùng hoặc thiết bị để khởi chạy các cuộc tấn công chống lại các máy chủ mạng, lấy cắp dữ liệu hoặc bỏ qua các điều khiển truy cập vào hệ thống cơ sở dữ liệu. Ngăn chặn cuộc tấn công này yêu cầu cơ sở hạ tầng CNTT và giảm nhẹ cấp mạng.

**6. Data Manipulation**

In a data manipulation attack, a hacker changes data to gain some advantage or to damage the image of database owners.

## Database Security Testing Techniques

**1. Penetration Testing**

Một thử nghiệm thâm nhập là một cuộc tấn công vào một hệ thống máy tính với mục đích tìm kiếm các lỗ hổng bảo mật, có khả năng truy cập vào nó, chức năng và dữ liệu của nó.

**2. Risk Finding**

Tìm kiếm rủi ro là một quá trình đánh giá và quyết định rủi ro liên quan đến loại mất mát và khả năng xảy ra lỗ hổng. Điều này được xác định trong tổ chức bởi các cuộc phỏng vấn, thảo luận và phân tích khác nhau.

**3. SQL Injection Test**

Nó liên quan đến việc kiểm tra đầu vào của người dùng trong các trường ứng dụng. Ví dụ: không nên nhập ký tự đặc biệt như ‘,’ hoặc ‘;’ vào bất kỳ hộp văn bản nào trong ứng dụng người dùng. Khi một lỗi cơ sở dữ liệu xảy ra, nó có nghĩa là đầu vào của người dùng được chèn vào trong một số truy vấn, sau đó được thực thi bởi ứng dụng. Trong trường hợp này, ứng dụng dễ bị tấn công SQL injection.

Các cuộc tấn công này là một mối đe dọa lớn đối với dữ liệu khi những kẻ tấn công có thể truy cập vào thông tin quan trọng từ cơ sở dữ liệu máy chủ. Để kiểm tra các điểm nhập SQL injection vào ứng dụng web của bạn, hãy tìm mã từ cơ sở mã của bạn, nơi các truy vấn MySQL trực tiếp được thực thi trên cơ sở dữ liệu bằng cách chấp nhận một số đầu vào của người dùng.

SQL Injection Testing có thể được thực hiện cho các dấu ngoặc, dấu phẩy và dấu ngoặc kép.

**4. Password Cracking**

Đây là kiểm tra quan trọng nhất trong khi thực hiện kiểm tra hệ thống cơ sở dữ liệu. Để truy cập thông tin quan trọng, tin tặc có thể sử dụng công cụ bẻ khóa mật khẩu hoặc có thể đoán tên người dùng / mật khẩu phổ biến. Những mật khẩu phổ biến có thể dễ dàng có sẵn trên internet và cũng có các công cụ bẻ mật khẩu tồn tại một cách tự do.

Vì vậy, nó là cần thiết để kiểm tra tại thời điểm thử nghiệm nếu chính sách mật khẩu được duy trì trong hệ thống. Trong trường hợp của bất kỳ ứng dụng ngân hàng và tài chính nào, cần phải đặt chính sách mật khẩu nghiêm ngặt trên tất cả các hệ thống cơ sở dữ liệu thông tin quan trọng.

**5. Security Audit of Database System** 

Kiểm toán bảo mật là một quá trình đánh giá các chính sách bảo mật của công ty vào một khoảng thời gian thường xuyên để xác định xem các tiêu chuẩn cần thiết có được tuân theo hay không. Có thể tuân thủ các tiêu chuẩn bảo mật khác nhau theo yêu cầu của doanh nghiệp để xác định chính sách bảo mật và sau đó đánh giá các chính sách được thiết lập dựa trên các tiêu chuẩn đó có thể được thực hiện.

Ví dụ về các tiêu chuẩn bảo mật phổ biến nhất là ISO 27001, BS15999, v.v.

## Database Security Testing Tools

Có nhiều công cụ kiểm tra hệ thống khác nhau có sẵn trên thị trường, có thể được sử dụng để kiểm tra hệ điều hành và kiểm tra ứng dụng. Một số công cụ phổ biến nhất được thảo luận dưới đây.

**1. Zed Attack Proxy**

Nó là một công cụ kiểm tra thâm nhập để tìm lỗ hổng trong các ứng dụng web. Nó được thiết kế để được sử dụng bởi những người có nhiều trải nghiệm bảo mật và như vậy là lý tưởng cho các nhà phát triển và những người thử nghiệm chức năng, những người mới tham gia thử nghiệm thâm nhập. Nó thường được sử dụng cho Windows, Linux, Mac OS.

**2. Paros**

Tất cả dữ liệu HTTP và HTTPS giữa máy chủ và máy khách, bao gồm cả cookie và các trường biểu mẫu, có thể bị chặn và sửa đổi bằng cách sử dụng các máy quét này. Nó được sử dụng cho nền tảng chéo, Java JRE / JDK 1.4.2 hoặc cao hơn.

**3. Social Engineer Toolkit**

Nó là một công cụ mã nguồn mở và các yếu tố con người bị tấn công chứ không phải là phần tử hệ thống. Nó cho phép bạn gửi email, java applet, vv chứa mã tấn công. Nó được ưa thích cho Linux, Apple Mac OS X và Microsoft Windows.

**4. Skipfish**

Công cụ này được sử dụng để quét các trang web của họ để tìm lỗ hổng bảo mật. Các báo cáo được tạo ra bởi công cụ này nhằm phục vụ như một nền tảng cho các đánh giá bảo mật ứng dụng web chuyên nghiệp. Nó được ưa thích cho Linux, FreeBSD, MacOS X và Windows.

**5. Vega** 

Nó là một công cụ bảo mật web đa nền tảng mã nguồn mở được sử dụng để tìm các phiên bản của SQL injection, cross-site scripting (XSS) và các lỗ hổng khác trong các ứng dụng web. Nó được ưa thích cho Java, Linux và Windows.

**6. Wapiti**

Wapiti là một công cụ mã nguồn mở và dựa trên web để quét các trang web của ứng dụng web và kiểm tra các tập lệnh và biểu mẫu nơi nó có thể tiêm dữ liệu. Nó được xây dựng bằng Python và có thể phát hiện lỗi xử lý tệp, cơ sở dữ liệu, XSS, LDAP và CRLF, phát hiện lệnh thực thi.

**7. Web Scarab**

Nó được viết bằng Java và được sử dụng để phân tích các ứng dụng giao tiếp thông qua các giao thức HTTP / HTTPS. Công cụ này được thiết kế chủ yếu cho các nhà phát triển có thể tự viết mã. Công cụ này không phụ thuộc vào hệ điều hành.

# XIV. Challenges
Để thực hiện thử nghiệm cơ sở dữ liệu thành công, người kiểm tra phải thu thập các yêu cầu từ tất cả các nguồn, như các yêu cầu kỹ thuật và chức năng. Có khả năng là một vài yêu cầu ở mức cao, vì vậy cần phải phân tích các yêu cầu đó thành các phần nhỏ. Cơ sở dữ liệu thử nghiệm là một nhiệm vụ phức tạp và những người thử nghiệm phải đối mặt với nhiều thử thách trong khi thực hiện thử nghiệm này. Các thử thách cơ sở dữ liệu phổ biến nhất là:

**1. Phạm vi kiểm tra quá lớn**

Tester cần phải xác định các mục thử nghiệm trong kiểm tra cơ sở dữ liệu nếu không, anh ta có thể không hiểu rõ về những gì anh ta sẽ kiểm tra và những gì anh ta sẽ không kiểm tra. Vì vậy, nếu bạn rõ ràng về yêu cầu, bạn có thể lãng phí rất nhiều thời gian thử nghiệm các đối tượng không chính xác trong cơ sở dữ liệu.

Khi bạn có một danh sách các đối tượng cần kiểm tra, tiếp theo là ước tính nỗ lực cần thiết để thiết kế các phép thử và thực hiện các phép thử cho từng mục thử nghiệm. Tùy thuộc vào thiết kế và kích thước dữ liệu của chúng, một số kiểm tra cơ sở dữ liệu có thể mất nhiều thời gian để thực thi.

Do kích thước cơ sở dữ liệu quá lớn, nó trở thành một thách thức lớn để tìm ra các đối tượng cần phải được kiểm tra và những đối tượng cần được loại bỏ.

**2. Cơ sở dữ liệu thử nghiệm thu nhỏ**

Những người thử nghiệm thường được cung cấp một bản sao của cơ sở dữ liệu phát triển để kiểm tra. Cơ sở dữ liệu đó chỉ có ít dữ liệu, đủ để chạy ứng dụng. Vì vậy, cần phải kiểm tra sự phát triển, dàn dựng và cũng như hệ thống cơ sở dữ liệu sản xuất.

**3. Thay đổi cấu trúc cơ sở dữ liệu**

Đây là một trong những thử thách phổ biến trong thử nghiệm DB. Đôi khi, nó xảy ra mà bạn thiết kế hoặc thực hiện một thử nghiệm, và cấu trúc cơ sở dữ liệu đã được thay đổi tại thời điểm đó. Điều này là cần thiết mà bạn cần phải nhận thức được những thay đổi được thực hiện cho cơ sở dữ liệu trong quá trình thử nghiệm.

Khi cấu trúc cơ sở dữ liệu thay đổi, bạn nên phân tích tác động của các thay đổi và sửa đổi các thử nghiệm. Ngoài ra, nếu nhiều người dùng sử dụng cơ sở dữ liệu thử nghiệm, bạn sẽ không chắc chắn về kết quả kiểm tra, do đó bạn nên đảm bảo rằng cơ sở dữ liệu thử nghiệm chỉ được sử dụng cho mục đích thử nghiệm.

Một thử thách khác trong thử nghiệm DB là bạn chạy nhiều thử nghiệm cùng một lúc. Bạn nên chạy một thử nghiệm tại một thời điểm ít nhất là cho các thử nghiệm hiệu suất. Bạn không muốn cơ sở dữ liệu của bạn thực hiện nhiều tác vụ và hiệu suất dưới báo cáo.

**4. Kế hoạch kiểm tra phức tạp**

Cấu trúc cơ sở dữ liệu thường phức tạp và nó có dữ liệu rất lớn, do đó, có khả năng bạn đang thực hiện các kiểm tra không đầy đủ hoặc tương tự nhiều lần. Vì vậy, có một nhu cầu để tạo ra một kế hoạch thử nghiệm và tiến hành cho phù hợp và kiểm tra tiến độ thường xuyên.

**5. Good understanding of SQL**

Để kiểm tra một cơ sở dữ liệu, bạn nên có kiến thức tốt về các truy vấn SQL và các công cụ quản lý cơ sở dữ liệu cần thiết.


Cảm ơn mọi người đã theo dõi bài viết!

Nguồn tham khảo: https://www.tutorialspoint.com/database_testing