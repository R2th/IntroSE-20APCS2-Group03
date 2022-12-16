# 1)  Database Testing là gì?

Database Testing  hay còn được gọi là  Backend Testing , kiểu kiểm tra lớp ứng dụng và Cơ sở dữ liệu, tập trung vào việc kiểm tra các hành vi của hệ thống ở cấp cơ sở dữ liệu.
Database Testing gồm bốn loại khác nhau:

* Kiểm tra tính toàn vẹn dữ liệu
* Kiểm tra tính hợp lệ của dữ liệu
* Hiệu suất cơ sở dữ liệu liên quan
* Kiểm tra các chức năng, thủ tục và kích hoạt

# 2) Trong Database Testing, chúng ta cần kiểm thử những gì?

Thông thường, chúng ta cần kiểm tra :

* Kiểm tra ràng buộc
* Kích thước dữ liệu hợp lệ của trường
* Thủ tục lưu trữ
* Đối chiếu tương ứng kích thước trường ứng dụng với cơ sở dữ liệu
* Mục lục cho các vấn đề dựa trên hiệu suất

# 3) Giải thích kiểm thử định hướng dữ liệu là gì?

Trong một bảng dữ liệu, để kiểm tra nhiều dữ liệu, kiểm thử định hướng dữ liệu được sử dụng. Việc sử dụng nó có thể dễ dàng thay thế các tham số cùng một lúc từ các vị trí khác nhau.

# 4) "Join" là gì và các kiểu liên kết "join" khác nhau?

"join" được sử dụng để hiển thị dữ liệu của hai hay nhiều hơn hai bảng dữ liệu

Các loại liên kết "join" khác nhau là:

* Natural Join (Tự nhiên)
* Inner Join (Bên trong)
* Outer Join (Bên ngoài)
* Cross Join (Vượt qua)

Outer Join được chia lại thành hai kiểu:

Left outer join (Liên kết bên trái)
Right outer join (Liên kết bên phải)


# 5) Chỉ mục là gì và các loại chỉ mục khác nhau?

Các chỉ mục là các đối tượng cơ sở dữ liệu và chúng được tạo trên các cột. Để lấy dữ liệu nhanh chóng, chúng thường được truy cập. Các loại chỉ mục khác nhau là:

* Chỉ số cây B
* Chỉ số bitmap
* Chỉ số cụm
* Chỉ số bao phủ
* Chỉ số không duy nhất
* Chỉ số duy nhất
# 6) Trong khi kiểm thử các thủ tục được lưu trữ, các bước mà người kiểm tra thực hiện là gì?

Người kiểm thử sẽ kiểm tra định dạng chuẩn của các thủ tục được lưu trữ , cũng như kiểm tra các trường có được lưu trữ chính xác sau khi đã cập nhật, updates, joins, indexes, deletions hay không.

# 7) Bạn sẽ làm như thế nào trong kiểm thử cơ sở dữ liệu,khi trigger hoạt động hoặc không hoạt động?

Khi truy vấn cơ sở dữ liệu, bạn sẽ biết trigger có hoạt động hoặc không hoạt động.

# 8) Trong kiểm thử cơ sở dữ liệu, các bước để kiểm tra tải dữ liệu là gì?

Các bước cần phải làm theo để kiểm tra tải dữ liệu: 

* Dữ liệu nguồn nên được biết
* Dữ liệu mục tiêu nên được biết
* Cần kiểm tra tính tương thích của nguồn và đích
* Trong trình quản lý SQL Enterprise, hãy chạy gói DTS sau khi mở gói DTS tương ứng
* Bạn phải so sánh các cột của  dữ liệunguồn và dữ liệu đích
* Số lượng dòng cần được kiểm tra
* Sau khi cập nhật dữ liệu nguồn, hãy kiểm tra xem các thay đổi có xuất hiện tại đích hay không.
* Kiểm tra NULL và ký tự trống

# 9) Không sử dụng Database Checkpoints, làm thế nào bạn kiểm tra truy vấn SQL trong QTP?

Bằng cách viết thủ tục trong VBScript, chúng ta có thể kết nối với cơ sở dữ liệu và có thể kiểm tra các truy vấn trong cơ sở dữ liệu.

# 10) Giải thích cách sử dụng các truy vấn SQL trong QTP?

Trong QTP (QuickTest Professional) sử dụng Database Checkpoints đầu ra và kiểm tra trong cơ sở dữ liệu, chọn truy vấn thủ công SQL. Sau khi chọn truy vấn thủ công, hãy nhập truy vấn để tìm dữ liệu vào trong cơ sở dữ liệu và sau đó so sánh dự kiến và thực tế.
# 11) Cách viết testcase để kiểm thử cơ sở dữ liệu là gì?

Viết testcase tương tự như đối với kiểm thử chức năng. Đầu tiên phải biết yêu cầu chức năng của ứng dụng. Sau đó, phải quyết định các tham số để viết testcase như

* Mục tiêu: Viết mục tiêu muốn kiểm thử
* Phương thức nhập: Viết phương thức hoạt động hoặc đầu vào bạn muốn thực hiện
* Kết quả mong muốn: làm thế nào nó sẽ xuất hiện trong cơ sở dữ liệu

# 12) Để quản lý và thao tác với bảng kiểm thử, các câu lệnh SQL mà bạn đã sử dụng trong kiểm thử cơ sở dữ liệu là gì?

Các câu lệnh như SELECT, INSERT, UPDATE, DELETE được sử dụng để thao tác với bảng, trong khi ALTER TABLE, CREATE TABLE và DELETE TABLE được sử dụng để quản lý bảng.

# 13) Làm thế nào để kiểm tra các procedures ( thủ tục) và triggers ?

Để kiểm tra các procedures ( thủ tục) và triggers, các tham số đầu vào và đầu ra phải được biết. Câu lệnh EXEC có thể được sử dụng để chạy thủ tục và kiểm tra hoạt động của các bảng.

Mở  cơ sở dữ liệu của dự án cần kiểm thử
Bây giờ trong menu View, bấm vào lược đồ cơ sở dữ liệu
Mở thư mục dự án từ menu Xem lược đồ
Nhấp chuột phải vào đối tượng phải được kiểm tra, và sau đó nhấp vào hộp thoại có nội dung Tạo đơn vị kiểm tra
Sau đó, tạo một dự án kiểm thử với ngôn ngữ mới
Chọn một) Chèn bài kiểm tra đơn vị hoặc b) Tạo một bài kiểm tra mới và sau đó bấm OK
Dự án phải được cấu hình sẽ được thực hiện bằng cách nhấp vào hộp thoại Cấu hình dự án.
Sau khi cấu hình, nhấp vào OK


# 14) Làm thế nào để có thể viết testcase từ các yêu cầu và thực hiện các yêu cầu chức năng một cách chính xác trong AUT (Application Under Test)?

Để viết một testcase từ các yêu cầu, bạn cần phân tích các yêu cầu kỹ lưỡng về chức năng. Sau đó, bạn vận dụng các kỹ thuật thiết kế testcase thích hợp như phân vùng tương đương, kiểm thử hộp đen, vẽ biểu đồ nguyên nhân, vv để viết testcase. Vâng, đó là cách để viết testcase từ các yêu cầu và thực hiện các yêu cầu chức năng một cách chính xác trong AUT (Application Under Test).

# 15) DBMS là gì?

DBMS (Database management system) là viết tắt của hệ thống quản lý cơ sở dữ liệu, có nhiều loại DBMS khác nhau:

* Mô hình mạng
* Mô hình phân cấp
* Mô hình quan hệ

# 16) DML là gì?

DML (Data Manipulation Language) là viết tắt của Ngôn ngữ thao tác dữ liệu, Nó được sử dụng để quản lý dữ liệu với các đối tượng lược đồ. Nó là một tập hợp con của SQL.
# 17) Lệnh DCL là gì? Hai loại lệnh được DCL sử dụng là gì?

DCL (Data Control Language) là viết tắt của Ngôn ngữ điều khiển dữ liệu, nó được sử dụng để kiểm soát dữ liệu.

Hai loại lệnh DCL là:

* Grant: Bằng cách sử dụng lệnh này, người dùng có thể truy cập đặc quyền vào cơ sở dữ liệu
 
* Revoke: Bằng cách sử dụng lệnh này, người dùng không thể truy cập cơ sở dữ liệu
# 18) Kiểm thử hộp trắng và kiểm thử hộp đen là gì?

Kiểm thử hộp đen có nghĩa là kiểm tra đầu ra khi đưa các đầu vào cụ thể. Kiểm thử này thường được thực hiện để xem phần mềm có đáp ứng yêu cầu của người dùng không. Không có đầu ra chức năng rõ ràng cụ thể cho kiểm thử này.

Kiểm tra hộp trắng được thực hiện để kiểm tra tính chính xác của mã nguồn và logic của chương trình. Kiểm thử này được thực hiện bởi các lập trình viên biết luồng xử lý của hệ thống.

# 19) Làm thế nào để đánh giá kết quả kiểm thử  QTP ?
Sau khi thử nghiệm xong, QTP sẽ tạo một báo cáo. Báo cáo này sẽ hiển thị các checkpoints ( Điểm kiểm tra), tin nhắn hệ thống và các lỗi được phát hiện khi thực hiện kiểm thử . Cửa sổ kết quả kiểm thử sẽ hiển thị bất kỳ sự không phù hợp nào gặp phải tại các điểm kiểm tra.

# 20) Giải thích quy trình kiểm thử QTP?

Quá trình kiểm thử QTP dựa trên các bước sau:
* Tạo GUI (Giao diện người sử dụng) Tệp bản đồ: Xác định đối tượng GUI cần kiểm tra
* Tạo kịch bản kiểm thử: Kịch bản kiểm thử được ghi lại
* Kiểm tra gỡ lỗi (Debug): Nên kiểm tra gỡ lỗi (Chạy Debug)
* Thực hiện kiểm thử : Testcase nên được chạy.
* Xem kết quả: Kết quả phản ánh sự thành công hay thất bại của các kiểm thử
* Phát hiện báo cáo: Nếu kiểm thử thất bại, lý do sẽ được ghi lại tệp báo cáo.

# 21) "Load testing" là gì và đưa ra một số ví dụ về nó?

Để kiểm tra phản hồi của hệ thống, Load testing được thực hiện. Nếu tải vượt quá mức độ sử dụng, nó được gọi là stress testing.

Ví dụ : Kiểm tra tải xuống tập hợp các tệp lớn, thực thi nhiều ứng dụng trên một máy tính, khiến máy chủ phải chịu một số lượng lớn email và lần lượt gửi yêu cầu thực hiện cho máy in. 

# 22) Làm thế nào để kiểm thử cơ sở dữ liệu bằng phương pháp thủ công?

Kiểm thử cơ sở dữ liệu theo cách thủ công bao gồm việc kiểm tra dữ liệu back end , để xem liệu việc thêm dữ liệu ở phía front end có ảnh hưởng đến back end hay không, và tương tự đối với việc xóa, cập nhật, chèn, v.v.

# 23) RDBMS là viết tắt của từ gì và RDMBS quan trọng mà SQL sử dụng là gì?

RDBMS ( Relational Database Management Systems) là viết tắt của Hệ thống quản lý cơ sở dữ liệu quan hệ sử dụng SQL

RDBMS quan trọng mà SQL sử dụng là Sybase, Oracle, Access, Ingres, Microsoft SQL server, v.v.

# 24) Kiểm thử hiệu năng là gì và những vướng mắc của kiểm thử hiệu năng là gì?

Kiểm thử hiệu năng xác định tốc độ hiệu suất của hệ thống máy tính. Nó bao gồm các kiểm tra định lượng như đo thời gian đáp ứng. Trong kiểm tra hiệu năng bạn luôn cần một người được đào tạo bài bản và có kinh nghiệm, các công cụ bạn sử dụng phải "đắt giá" về công dụng.

# 25) DDL là gì và các lệnh của nó là gì?

Để xác định cấu trúc cơ sở dữ liệu, Nhà phát triển sử dụng DDL. DDL (Data Definition Language) là viết tắt của Ngôn ngữ Định nghĩa Dữ liệu. Các lệnh DDL khác nhau bao gồm: Create ( tạo), Truncate (cắt), Drop(thả), Alter(thay đổi), Comment (nhận xét) và Rename (đổi tên).  

*Những Câu hỏi phỏng vấn Database Testing / SQL ở trên mong có thể giúp được những người mới vào nghề cũng như các Kỹ sư QA có kinh nghiệm.* 

# Tài liệu tham khảo
https://www.guru99.com/database-testing-interview-questions.html