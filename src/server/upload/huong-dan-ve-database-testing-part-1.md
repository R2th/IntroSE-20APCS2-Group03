# I. Overview
Database testing bao gồm thực hiện validate data, kiểm tra toàn vẹn dữ liệu, kiểm tra hiệu năng liên quan đến cơ sở dữ liệu và kiểm tra các thủ tục, trình kích hoạt và chức năng trong cơ sở dữ liệu. Đây là một hướng dẫn giới thiệu giải thích tất cả các nguyên tắc cơ bản của kiểm tra Database Testing.

**Ví dụ:** 

Hãy xem xét một ứng dụng nắm bắt chi tiết giao dịch hàng ngày cho người dùng và lưu trữ các chi tiết trong cơ sở dữ liệu. Từ quan điểm kiểm tra cơ sở dữ liệu, các kiểm tra sau đây cần được thực hiện :

- Thông tin giao dịch từ ứng dụng phải được lưu trữ trong cơ sở dữ liệu và nó sẽ cung cấp thông tin chính xác cho người dùng.

- Thông tin không nên bị mất khi nó được nạp vào cơ sở dữ liệu.

- Chỉ các giao dịch đã hoàn tất mới được lưu trữ và tất cả các hoạt động không hoàn chỉnh sẽ bị hủy bỏ bởi ứng dụng.

- Cần duy trì quyền truy cập vào cơ sở dữ liệu. Không được cung cấp thông tin người dùng không được chấp thuận hoặc không được chấp thuận.

**Tại sao bạn cần thực hiện kiểm tra Database Testing**

Có nhiều lý do tại sao thử nghiệm cơ sở dữ liệu được thực hiện. Có một nhu cầu để thực hiện tính toàn vẹn dữ liệu, xác nhận và kiểm tra tính thống nhất dữ liệu trên cơ sở dữ liệu vì hệ thống phụ trợ chịu trách nhiệm lưu trữ dữ liệu và được truy cập cho nhiều mục đích.

Đưa ra dưới đây là một số lý do phổ biến cho việc kiểm tra Cơ sở dữ liệu :

- Để giảm bớt sự phức tạp của các cuộc gọi đến backend cơ sở dữ liệu, các nhà phát triển tăng việc sử dụng các thủ tục View và Stored.

- Các thủ tục và Chế độ xem được lưu trữ này chứa các tác vụ quan trọng như chèn chi tiết khách hàng (tên, thông tin liên hệ, v.v.) và dữ liệu bán hàng. Các nhiệm vụ này cần được kiểm tra ở nhiều cấp độ.

- Kiểm tra hộp đen được thực hiện trên giao diện người dùng là quan trọng, nhưng gây khó khăn cho việc cô lập vấn đề. Thử nghiệm tại hệ thống phụ trợ làm tăng độ mạnh của dữ liệu. Đó là lý do tại sao thử nghiệm cơ sở dữ liệu được thực hiện trên hệ thống đầu cuối.

- Trong cơ sở dữ liệu, dữ liệu đến từ nhiều ứng dụng và có khả năng dữ liệu có hại hoặc không chính xác được lưu trữ trong cơ sở dữ liệu. Vì vậy, có một nhu cầu để kiểm tra các thành phần cơ sở dữ liệu thường xuyên. Ngoài ra, toàn vẹn dữ liệu và tính nhất quán cần được kiểm tra thường xuyên.


![](https://images.viblo.asia/54e59787-1a60-4f08-ae8b-7eb69a498c6e.png)

Database testing khác với front-end UI testing. Cùng xem bảng so sánh dưới đây:



| Database Testing | UI Testing | 
| -------- | -------- | 
| Database testing được gọi là kiểm tra tính hợp lệ dữ liệu và kiểm tra tính toàn vẹn hoặc kiểm tra back-end.     | UI Testing  hoặc front-end testing  cũng được gọi là Kiểm tra ứng dụng hoặc kiểm tra GUI.  | 
| Database testing bao gồm việc kiểm tra các thành phần back-end, không hiển thị cho người dùng.  Điều này bao gồm các thành phần cơ sở dữ liệu và các hệ thống DBMS như My SQL, Oracle. | UI testing liên quan đến việc kiểm tra các chức năng của ứng dụng và các thành phần của ứng dụng như biểu mẫu, biểu đồ, menu, báo cáo, v.v. Các thành phần này được tạo ra bằng cách sử dụng các công cụ phát triển front-end như VB.net, C #, Delphi, v.v.     | 
| Database testing bao gồm việc kiểm tra các thủ tục, view, lược đồ được lưu trữ trong cơ sở dữ liệu, bảng, indexes, keys, trình kích hoạt, data validations và kiểm tra tính nhất quán của dữ liệu     | UI testing  bao gồm việc kiểm tra chức năng của ứng dụng, nút, biểu mẫu và trường, lịch và hình ảnh, điều hướng từ trang này đến trang khác và chức năng tổng thể của ứng dụng.   | 
| Để thực hiện kiểm tra DB, người kiểm thử cần kiến thức toàn diện về khái niệm cơ sở dữ liệu - như các thủ tục và chức năng, các khung nhìn, các chỉ mục, các khóa và SQL thực hành tốt.   | Để thực hiện kiểm tra giao diện người dùng, người kiểm tra cần hiểu rõ về yêu cầu kinh doanh, kiến thức chức năng ứng dụng, mã hóa, v.v.     | 
| Dữ liệu đến từ nhiều nguồn dữ liệu không đồng nhất trên các ứng dụng web, các ứng dụng Intranet và các ứng dụng khác.    | Dữ liệu được nhập thủ công vào các ứng dụng. Nó bao gồm thử nghiệm chức năng của các ứng dụng front-end.    | 

# II. Type
Dựa trên chức năng và cấu trúc của cơ sở dữ liệu, kiểm tra DB có thể được phân thành ba loại :

- Structural Database Testing - Nó đề cập đến thử nghiệm bảng và cột, kiểm tra lược đồ, các thủ tục được lưu trữ và kiểm tra lượt xem, kiểm tra trình kích hoạt, v.v.

- Functional Testing - Nó liên quan đến việc kiểm tra chức năng của cơ sở dữ liệu từ quan điểm của người dùng xem. Loại kiểm tra chức năng phổ biến nhất là kiểm tra hộp màu trắng và hộp đen.

- Nonfunctional Testing - Nó bao gồm việc kiểm tra tải, kiểm tra rủi ro trong cơ sở dữ liệu, kiểm tra căng thẳng, yêu cầu hệ thống tối thiểu, và giao dịch với hiệu năng của cơ sở dữ liệu.

## Structural Database Testing

Kiểm tra cơ sở dữ liệu kết cấu bao gồm việc xác minh các thành phần cơ sở dữ liệu đó, không được tiếp xúc với người dùng cuối. Nó bao gồm tất cả các thành phần của kho lưu trữ, được sử dụng để lưu trữ dữ liệu và không được thay đổi bởi người dùng cuối. Các quản trị viên cơ sở dữ liệu có lệnh tốt hơn các thủ tục lưu sẵn SQL và các khái niệm khác thường thực hiện phép thử này.

Thảo luận là các thành phần phổ biến được thử nghiệm liên quan đến Kiểm tra kết cấu :

**1. Schema / Mapping Testing**

Nó bao gồm việc xác nhận hợp lệ các đối tượng của ứng dụng front-end với ánh xạ đối tượng cơ sở dữ liệu.

Trong Schema Testing: 

- Đôi khi nó xảy ra rằng các đối tượng ứng dụng người dùng cuối không được ánh xạ chính xác hoặc tương thích với các đối tượng cơ sở dữ liệu. Do đó, việc kiểm tra tính hợp lệ của các định dạng lược đồ khác nhau được liên kết với cơ sở dữ liệu là bắt buộc.

- Nó là cần thiết để tìm các đối tượng chưa được ánh xạ trong cơ sở dữ liệu, như bảng, xem, cột, vv là bắt buộc.

Có nhiều công cụ khác nhau trên thị trường có thể được sử dụng để thực hiện ánh xạ đối tượng trong các lược đồ.

**Ví dụ:** 

Trong Microsoft SQL Server, tester có thể viết các truy vấn đơn giản để kiểm tra và xác nhận hợp lệ các lược đồ trong cơ sở dữ liệu. Nếu tester muốn thay đổi cấu trúc bảng, người đó phải đảm bảo rằng tất cả các thủ tục được lưu trữ có bảng đó tương thích với thay đổi này.

![](https://images.viblo.asia/5a90214c-f5db-4d40-a4cf-dd17479aef95.png)


**2. Stored Procedures and Views Testing**

Trong thử nghiệm này, một người kiểm tra đảm bảo rằng việc thực hiện thủ công các thủ tục lưu sẵn và các khung nhìn tạo ra kết quả cần thiết.

Tester cần đảm bảo :

- Nếu nó cho phép các trigger được yêu cầu được thực hiện như mong đợi.

- Nếu nhóm phát triển đã bao gồm tất cả các vòng lặp và điều kiện bằng cách chuyển đầu vào cho các ứng dụng trong quy trình.

- Nếu có bất kỳ thủ tục được lưu trữ không được sử dụng trong cơ sở dữ liệu.

- Các hoạt động TRIM được áp dụng đúng khi dữ liệu được lấy từ các bảng được yêu cầu trong cơ sở dữ liệu.

- Xác nhận sự tích hợp tổng thể của các mô-đun thủ tục được lưu trữ theo yêu cầu của ứng dụng đang thử nghiệm.

- Các cơ chế xử lý lỗi và ngoại lệ được theo sau.

Các công cụ phổ biến nhất được sử dụng để thực hiện kiểm tra thủ tục lưu trữ là LINQ, công cụ kiểm tra SP, v.v.

**3. Trigger Testing**

Trong Trigger Testing, Tester cần đảm bảo những điểu sau:

- Liệu các quy ước mã hóa có được tuân thủ trong giai đoạn mã hóa của các trigger hay không.

- Xem các trình kích hoạt được thực thi đáp ứng các điều kiện bắt buộc.

- Cho dù trình kích hoạt cập nhật dữ liệu chính xác, một khi chúng đã được thực hiện.

- Xác nhận tính năng cập nhật / Chèn / Xóa trình kích hoạt chức năng ứng dụng w.r.t đang được thử nghiệm.

**4. Tables and Column testing**

Các lĩnh vực chính được đề cập trong thử nghiệm này là :

- Xác nhận hợp lệ các kiểu dữ liệu trong cơ sở dữ liệu với các giá trị trường trong ứng dụng front-end.

- Xác nhận độ dài của trường dữ liệu trong cơ sở dữ liệu với độ dài của các kiểu dữ liệu trong ứng dụng.

- Kiểm tra nếu có bất kỳ bảng hoặc cột chưa được ánh xạ nào trong cơ sở dữ liệu từ các đối tượng trường ứng dụng.

- Quy ước đặt tên của các bảng và cột cơ sở dữ liệu được xác minh, nếu chúng phù hợp với yêu cầu kinh doanh hay không.

- Xác nhận các khóa và chỉ mục trong cơ sở dữ liệu, tức là khóa chính và khóa ngoài trong bảng được xác định theo yêu cầu.

- Kiểm tra xem các khóa chính và khóa ngoại tương ứng của chúng có giống nhau trong hai bảng hay không.

- Kiểm tra duy nhất và NOT NULL đặc điểm của các phím được duy trì.

- Độ dài và kiểu dữ liệu của các khóa và chỉ mục được duy trì theo yêu cầu.

**5. Database Sever Check**

Kiểm tra máy chủ cơ sở dữ liệu bao gồm xác minh :

- Nếu máy chủ cơ sở dữ liệu có thể xử lý số lượng giao dịch dự kiến theo yêu cầu nghiệp vụ.

- Nếu các chi tiết cấu hình của máy chủ cơ sở dữ liệu đáp ứng yêu cầu nghiệp vụ.

- Nếu ủy quyền người dùng được duy trì theo yêu cầu.

## Functional Testing

Chức năng kiểm tra được thực hiện giữ trong tâm trí một điểm người dùng cuối xem; các giao dịch và hoạt động được yêu cầu có phải do người dùng cuối điều hành hay không.

**1. Black box Testing**


Kiểm tra hộp đen bao gồm việc xác minh sự tích hợp của cơ sở dữ liệu để kiểm tra chức năng. Các trường hợp thử nghiệm rất đơn giản và được sử dụng để xác minh dữ liệu đến và dữ liệu gửi đi từ hàm.

Các kỹ thuật khác nhau như kỹ thuật vẽ đồ thị hiệu ứng nguyên nhân, phân vùng tương đương và phân tích giá trị biên được sử dụng để kiểm tra chức năng của cơ sở dữ liệu.

Ưu điểm của nó như sau:

- Nó khá đơn giản và được thực hiện trong giai đoạn phát triển ban đầu.
- Chi phí phát triển các trường hợp thử nghiệm ít hơn so với thử nghiệm hộp trắng.

Những nhược điểm của nó như sau:

- Không thể phát hiện một vài lỗi
- Không biết chương trình cần được kiểm tra bao nhiêu.

**2. White Box Testing**

White Box Testing đề cập đến cấu trúc bên trong của cơ sở dữ liệu và các chi tiết đặc tả được ẩn khỏi người dùng. Nó liên quan đến việc kiểm tra các trình kích hoạt cơ sở dữ liệu và các khung nhìn lô-gic, sẽ hỗ trợ việc tái cấu trúc cơ sở dữ liệu.

Nó thực hiện kiểm tra mô-đun của các chức năng cơ sở dữ liệu, trình kích hoạt, khung nhìn, truy vấn SQL, v.v. Loại kiểm thử này xác thực các bảng cơ sở dữ liệu, mô hình dữ liệu, lược đồ cơ sở dữ liệu vv. Nó chọn các giá trị bảng mặc định để kiểm tra tính nhất quán của cơ sở dữ liệu.

Các kỹ thuật phổ biến nhất được sử dụng để thực hiện kiểm tra hộp màu trắng là điều kiện bảo hiểm, phạm vi bảo hiểm quyết định, tuyên bố bảo hiểm, vv

Lỗi mã hóa có thể được phát hiện trong thử nghiệm hộp trắng, vì vậy các lỗi nội bộ trong cơ sở dữ liệu có thể được loại bỏ. Giới hạn của kiểm thử hộp trắng là các câu lệnh SQL không được đề cập đến.

## Nonfuntional Testing

Thử nghiệm phi chức năng liên quan đến việc thực hiện kiểm tra tải, kiểm tra căng thẳng, kiểm tra các yêu cầu hệ thống tối thiểu để đáp ứng đặc điểm kỹ thuật kinh doanh, tìm kiếm rủi ro và tối ưu hóa hiệu suất của cơ sở dữ liệu.

**1. Load Testing**

Mục tiêu chính của thử nghiệm tải là để kiểm tra xem hầu hết các giao dịch đang chạy có tác động hiệu suất trên cơ sở dữ liệu hay không.

Trong kiểm tra tải, người kiểm tra sẽ kiểm tra :

- Thời gian phản hồi để thực hiện các giao dịch cho nhiều người dùng từ xa.
- Thời gian thực hiện bởi cơ sở dữ liệu để lấy các bản ghi cụ thể.

Ví dụ về thử nghiệm tải trong các loại thử nghiệm khác nhau :

- Chạy giao dịch được sử dụng nhiều lần để xem hiệu suất của hệ thống cơ sở dữ liệu.
- Tải xuống hàng loạt tệp lớn từ internet.
- Chạy đồng thời nhiều ứng dụng trên máy tính hoặc máy chủ.

**2. Stress Testing**

Stress Testing được thực hiện để xác định điểm ngắt hệ thống. Trong thử nghiệm này, ứng dụng được tải theo cách mà hệ thống không thành công tại một thời điểm. Điểm này được gọi là điểm ngắt của hệ thống cơ sở dữ liệu.

Xác định trạng thái của các giao dịch cơ sở dữ liệu liên quan đến một lượng đáng kể nỗ lực. Lập kế hoạch thích hợp là cần thiết để tránh bất kỳ vấn đề thời gian và chi phí nào.

Các công cụ kiểm tra căng thẳng thường được sử dụng nhất là LoadRunner và WinRunner.

Hãy để chúng tôi lấy một ví dụ về kiểm tra căng thẳng. Ứng dụng CRM có thể tải tối đa 50000 người dùng đồng thời. Giả sử bạn tăng tải lên 51000 và thực hiện một số giao dịch như cập nhật bản ghi hoặc thêm mục nhập. Ngay sau khi bạn thực hiện giao dịch, ứng dụng có thể đồng bộ hóa với hệ thống cơ sở dữ liệu. Vì vậy, các thử nghiệm tiếp theo là để thực hiện với một tải người dùng của 52000. Đôi khi, Stress Testing cũng được gọi là thử nghiệm mệt mỏi. 

# III. Processes

Quá trình thực hiện kiểm tra cơ sở dữ liệu tương tự như kiểm tra các ứng dụng khác. Kiểm tra DB có thể được mô tả bằng các quy trình chính được đưa ra dưới đây.

- Thiết lập môi trường
- Chạy thử nghiệm
- Kiểm tra kết quả kiểm tra
- Xác nhận theo kết quả mong đợi
- Báo cáo kết quả cho các bên liên quan


Các câu lệnh SQL khác nhau được sử dụng để phát triển các trường hợp Kiểm thử. Câu lệnh SQL phổ biến nhất, được sử dụng để thực hiện kiểm tra DB, là câu lệnh Select. Ngoài ra, các câu lệnh DDL, DML, DCL khác nhau cũng có thể được sử dụng.

Ví dụ - Tạo, Chèn, Chọn, Cập nhật, v.v.

**Database Testing Stages**

Kiểm tra DB không phải là một quá trình tẻ nhạt và bao gồm các giai đoạn khác nhau trong vòng đời kiểm tra cơ sở dữ liệu theo quy trình thử nghiệm.

Các giai đoạn chính trong kiểm tra cơ sở dữ liệu là -

- Kiểm tra trạng thái ban đầu
- Chạy thử nghiệm
- Xác nhận kết quả theo kết quả mong đợi
- Tạo kết quả

Giai đoạn đầu tiên trong thử nghiệm DB là kiểm tra trạng thái ban đầu của cơ sở dữ liệu trước khi bắt đầu quá trình thử nghiệm. Sau đó, hành vi cơ sở dữ liệu được kiểm tra cho các trường hợp thử nghiệm được xác định. Phù hợp với các kết quả thu được, các trường hợp thử nghiệm được tùy chỉnh.

Để kiểm tra cơ sở dữ liệu thành công, luồng công việc được đưa ra dưới đây được thực hiện bởi mọi thử nghiệm đơn lẻ.

- **Dọn dẹp cơ sở dữ liệu** - Nếu có dữ liệu có thể kiểm tra trong cơ sở dữ liệu, nó sẽ được làm trống.

- **Thiết lập Fixture** - Điều này liên quan đến việc nhập dữ liệu vào cơ sở dữ liệu và kiểm tra trạng thái hiện tại của cơ sở dữ liệu.

- **Thực hiện kiểm tra, xác minh kết quả và tạo kết quả** - Kiểm tra được chạy và đầu ra được xác minh. Nếu đầu ra là theo kết quả mong đợi, bước tiếp theo là tạo kết quả theo yêu cầu. Nếu không, kiểm tra được lặp lại để tìm các lỗi trong cơ sở dữ liệu.

# IV. Techniques

Phần này giải thích các kỹ thuật phổ biến nhất được sử dụng để thực hiện Kiểm thử Cơ sở dữ liệu.

**1. Database Schema Testing (Kiểm tra lược đồ cơ sở dữ liệu)**

Như đã đề cập trước đó, nó liên quan đến việc kiểm tra từng đối tượng trong lược đồ.

**Xác minh cơ sở dữ liệu và thiết bị**

- Xác minh tên cơ sở dữ liệu
- Xác minh thiết bị dữ liệu, thiết bị đăng nhập và thiết bị đổ
- Xác minh nếu đủ không gian được phân bổ cho từng cơ sở dữ liệu
- Xác minh cài đặt tùy chọn cơ sở dữ liệu

**Tables, columns, column types rules check**

Xác minh các mục được đưa ra dưới đây để tìm hiểu sự khác biệt giữa cài đặt thực tế và áp dụng.

- Tên của tất cả các bảng trong cơ sở dữ liệu

- Tên cột cho mỗi bảng

- Các loại cột cho mỗi bảng

- Giá trị NULL được kiểm tra hay không

- Liệu giá trị mặc định có bị ràng buộc để sửa các cột trong bảng hay không

- Định nghĩa quy tắc để sửa tên bảng và đặc quyền truy cập

**Key and Indexes**

Xác minh khóa và chỉ mục trong mỗi bảng :

- Khóa chính cho mỗi bảng

- Khóa ngoại cho mỗi bảng

- Các kiểu dữ liệu giữa cột khóa ngoài và cột trong bảng khác Các chỉ mục, nhóm hoặc không được phân cụm duy nhất hoặc không phải là duy nhất

**2. Stored Procedure Tests** 

Nó liên quan đến việc kiểm tra xem liệu một thủ tục lưu sẵn được xác định và kết quả đầu ra được so sánh. Trong một bài kiểm tra thủ tục lưu trữ, các điểm sau đây được kiểm tra :

- Tên thủ tục được lưu trữ

- Tên tham số, loại tham số, v.v ...

- **Đầu ra** - Cho dù đầu ra có chứa nhiều bản ghi. Các hàng không được thực hiện hoặc chỉ một vài bản ghi được trích xuất.

- Chức năng của thủ tục lưu trữ là gì và những gì một thủ tục lưu trữ không phải là nghĩa vụ phải làm gì?

- Vượt qua các truy vấn đầu vào mẫu để kiểm tra xem một thủ tục đã lưu có trích xuất dữ liệu chính xác hay không.

- **Các tham số thủ tục lưu sẵn** - Gọi thủ tục lưu sẵn với dữ liệu ranh giới và với dữ liệu hợp lệ. Làm cho mỗi tham số không hợp lệ một lần và chạy một thủ tục.

- **Trả về giá trị** - Kiểm tra các giá trị được trả về bởi thủ tục lưu sẵn. Trong trường hợp thất bại, không phải trả lại nonzero.

- **Kiểm tra thông báo lỗi** - Thực hiện các thay đổi theo cách mà thủ tục đã lưu không thành công và tạo ra mọi thông báo lỗi ít nhất một lần. Kiểm tra bất kỳ trường hợp ngoại lệ nào khi không có thông báo lỗi được xác định trước.

**3. Trigger Tests**

Trong thử nghiệm Trigger, trình kiểm tra phải thực hiện các tác vụ sau :

- Đảm bảo tên trình kích hoạt là chính xác.
- Xác thực trình kích hoạt nếu nó được tạo cho một cột bảng cụ thể.
- Xác thực cập nhật của trình kích hoạt.
- Cập nhật một bản ghi với một dữ liệu hợp lệ.
- Cập nhật bản ghi có dữ liệu không hợp lệ và bao gồm mọi lỗi kích hoạt.
- Cập nhật một bản ghi khi nó vẫn được tham chiếu bởi một hàng trong bảng khác.
- Đảm bảo quay lại giao dịch khi xảy ra lỗi.
- Tìm hiểu bất kỳ trường hợp nào trong đó trình kích hoạt không được phép quay lại giao dịch.

**4. Server Setup Scripts**

Hai loại kiểm tra nên được thực hiện :

- Thiết lập cơ sở dữ liệu từ đầu, và
- Để thiết lập cơ sở dữ liệu hiện có.


**Kiểm tra tích hợp của SQL Server**

Kiểm tra tích hợp sẽ được thực hiện sau khi bạn trải qua thử nghiệm thành phần.

- Thủ tục lưu trữ nên được gọi là mạnh mẽ để chọn, chèn, cập nhật và xóa các bản ghi trong các bảng khác nhau để tìm bất kỳ xung đột và không tương thích nào.

- Bất kỳ xung đột nào giữa lược đồ và trình kích hoạt.

- Bất kỳ xung đột nào giữa các thủ tục và lược đồ được lưu trữ.

- Bất kỳ xung đột nào giữa các thủ tục được lưu trữ và trình kích hoạt.

**5. Functional Testing Method**

Kiểm tra chức năng có thể được thực hiện bằng cách chia cơ sở dữ liệu thành các mô-đun theo chức năng. Các chức năng có hai loại sau đây :

- **Type 1** - Trong thử nghiệm Loại 1, hãy tìm hiểu các tính năng của dự án. Đối với mỗi tính năng chính, hãy tìm hiểu lược đồ, trình kích hoạt và các thủ tục được lưu trữ có trách nhiệm thực hiện hàm đó và đặt chúng vào một nhóm chức năng. Sau đó kiểm tra từng nhóm lại với nhau.

- **Type 2** - Trong thử nghiệm loại 2, biên giới của các nhóm chức năng trong một back-end là không rõ ràng. Bạn có thể kiểm tra luồng dữ liệu và xem nơi bạn có thể kiểm tra dữ liệu. Bắt đầu từ front-end.

Quá trình sau diễn ra :

- Khi một dịch vụ có yêu cầu hoặc lưu dữ liệu, một số thủ tục lưu sẵn sẽ được gọi.

- Các thủ tục sẽ cập nhật một số bảng.

- Những thủ tục được lưu trữ sẽ là nơi để bắt đầu thử nghiệm và những bảng đó sẽ là nơi để kiểm tra kết quả kiểm tra.

**6. Stress Testing**

Kiểm tra căng thẳng bao gồm việc nhận danh sách các hàm cơ sở dữ liệu chính và các thủ tục được lưu trữ tương ứng. Làm theo các bước dưới đây để kiểm tra áp lực :

- Viết kịch bản thử nghiệm để thử các chức năng đó và mọi chức năng phải được kiểm tra ít nhất một lần trong một chu kỳ đầy đủ.

- Thực hiện các tập lệnh thử nghiệm một lần nữa và một lần nữa trong một khoảng thời gian cụ thể.

- Xác minh các tệp nhật ký để kiểm tra bất kỳ deadlocks, thất bại trong bộ nhớ, dữ liệu tham nhũng, vv

**7.Benchmark Testing**

Nếu cơ sở dữ liệu của bạn không có bất kỳ vấn đề hoặc lỗi dữ liệu nào, bạn có thể kiểm tra hiệu năng hệ thống. Một hiệu suất hệ thống kém có thể được tìm thấy trong kiểm tra điểm chuẩn bằng cách kiểm tra các tham số được đưa ra dưới đây :

- Hiệu suất mức hệ thống
- Xác định các tính năng / tính năng được sử dụng nhiều nhất
- Thời gian - thời gian tối đa, thời gian tối thiểu và thời gian trung bình để thực hiện các chức năng
- Khối lượng truy cập

**8. Testing a Database via Front-end**

Các lỗi back-end cũng có thể được tìm thấy đôi khi bằng cách thực hiện kiểm tra front-end. Bạn có thể làm theo các bước đơn giản dưới đây để phát hiện lỗi bằng cách kiểm tra front-end.

- Viết truy vấn từ giao diện người dùng và phát hành các tìm kiếm.

- Chọn một bản ghi hiện có, thay đổi các giá trị trong một số trường và lưu bản ghi. (Nó liên quan đến câu lệnh UPDATE hoặc cập nhật các thủ tục được lưu trữ và kích hoạt cập nhật.)

- Chèn một mục menu mới trong cửa sổ front-end. Điền thông tin và lưu bản ghi. (Nó liên quan đến các câu lệnh INSERT hoặc các thủ tục được lưu trữ và các trình kích hoạt xóa.)

- Chọn một bản ghi hiện có, nhấp vào nút XÓA hoặc XÓA, và xác nhận việc xóa. (Nó liên quan đến câu lệnh DELETE hoặc xóa các thủ tục đã lưu và các trình kích hoạt xóa.)

- Lặp lại các trường hợp thử nghiệm này với dữ liệu không hợp lệ và xem cơ sở dữ liệu phản hồi như thế nào.



Nguồn tham khảo: https://www.tutorialspoint.com/database_testing