Tuyển tập một số câu quiz của Hive, đứa bạn mình làm Hive nhiều mà cũng có câu than khó =)), mọi người thử xem nhé 

**Q1: trong hive khi schema không khớp với nội dung file**

A. Không thể đọc file 

B. Chỉ đọc được dạng dữ liệu string 

C. Chỉ ném ra lỗi và dừng đọc file 

D. Trả về dữ liệu null cho những trường không khớp.


**Q2: Trong hive bạn có thể copy**


A. Lược đồ không có dữ liệu

B. Dữ liệu không có lược đồ 

C. Cả lược đồ và dữ liệu của nó 

D. Không cả lược đồ và dữ liệu của nó 


**Q3: Người dùng có thể chuyển thông tin cấu hình đến SerDe bằng cách sử dụng**

A. SET SERDEPRPERTIES

B. WITH SERDEPRPERTIES

C. BY SERDEPRPERTIES

D. CONFIG SERDEPRPERTIES


**Q4: Khi kết quả của kiểu dữ liệu STRING được trả về bằng cách truy vấn kiểu dữ liệu mảng sử dụng chỉ mục, kết quả có:**

A - không có dấu nháy

B - dấu nháy kép

C - dấu nháy đơn 

D - Không có dấu cách

**Q5: Hiệu suất của truy vấn tổng hợp được cải thiện bằng cách đặt thuộc tính nào sau đây là đúng?**

A - hive.map.group

B - hive.map.aggr

C - hive.map.sort

D - hive.map.sum


**Q6: Truy vấn** `Create table TABLE_NAME LIKE VIEW_NAME`

A - tạo một bảng là bản sao của view

B - không hợp lệ

C - chỉ chạy nếu view có dữ liệu

D - chỉ chạy nếu view nằm trong cùng thư mục với bảng

**Q7 - Nhược điểm của việc sử dụng quá nhiều phân vùng trong bảng Hive là gì?**

A - Nó làm chậm namenode

B - Không gian lưu trữ bị lãng phí

C - Join quires trở nên chậm chạp

D - Tất cả


**Q8:  Hive có thể tự động quyết định chạy chế độ cục bộ bằng cách đặt tham số nào sau đây trong hive-site.xml?**

A - hive.exec.mode.local.enable

B - hive.exec.mode.cluster.disable

C - hive.exec.mode.local.first

D - hive.exec.mode.local.auto

**Q9: hàm reverse() đảo ngược một chuỗi được chuyển đến nó trong một truy vấn Hive. Đây là một ví dụ về**

A - UDF tiêu chuẩn

B - UDF tổng hợp

C - Bảng tạo UDF

D - Không có

**Q10: MACRO được tạo trong Hive có khả năng**

A - Tự động chạy nhiều chức năng trên cùng một tập dữ liệu

B - Gọi một hàm và toán tử khác trong HIve

C - Dữ liệu truyền trực tuyến truy vấn

D - Tạo các chức năng có thể được sử dụng bên ngoài Hive


**Q11: Dấu phân tách mặc định trong hive để tách phần tử trong STRUCT là**

A - '\001'

B - '\oo2'

C - '\oo3'

D - '\oo4'

**Q12: Hàm chuỗi CONCAT trong Hive có thể nối**

A - chỉ có 2 chuỗi

B - bất kỳ số lượng chuỗi được ghép nối nào

C - số chuỗi bất kỳ

D - chỉ các chuỗi có độ dài bằng nhau

**Q13: Tập tin nào kiểm soát việc ghi nhật ký các lệnh được đưa vào CLI?**

A - hive-log4j.properties

B - hive-exec-log4j.properties

C - hive-cli-log4j.properties

D - hive-create-log4j.properties

**Q14: Có thể dễ dàng tạo và chỉnh sửa siêu dữ liệu Hive bằng cách sử dụng**
A - HCatalog

B - HMetamanager

C - Hweblog

D - Hue

**Q15: Chỉ mục có thể được tạo**

A - chỉ trên các bảng được quản lý

B - chỉ trên lượt xem

C - Chỉ trên các bảng bên ngoài

D - chỉ trên các khung nhìn có phân vùng

**Q16. Q - Biểu thức dưới đây trong mệnh đề where**

RLIKE '. * (Chicago | Ontario). *';

**đưa ra kết quả phù hợp**

A - những từ chứa cả Chicago và Ontario

B - các từ chứa Chicago hoặc Ontario

C - các từ Kết thúc bằng Chicago hoặc Ontario

D - những từ bắt đầu bằng Chicago hoặc Ontario

**Q17: Khi loại bỏ một bảng bên ngoài**

A - Lược đồ bị loại bỏ mà không làm giảm dữ liệu

B - Dữ liệu bị loại bỏ mà không loại bỏ lược đồ

C - Một lỗi được đưa ra

D - Cả lược đồ và dữ liệu đều bị loại bỏ

**Q18: Việc phân vùng bảng trong Hive tạo ra nhiều**

A - thư mục con dưới tên cơ sở dữ liệu

B - thư mục con dưới tên bảng

C - tệp dưới tên databse

D - các tệp dưới tên bảng

**Q19: Khi truy vấn Hive kết hợp 3 bảng, có bao nhiêu mapreduce jobs sẽ được bắt đầu?**

A - 1

B - 2

C - 3

D - 0

**Q20: Để chọn tất cả các cột bắt đầu bằng từ 'Sell', bảng GROSS_SELL truy vấn là**

A - select '$Sell*'  from GROSS_SELL

B - select 'Sell*' from GROSS_SELL

C - select 'sell.*' from GROSS_SELL

D - select  'sell[*]' from GROSS_SELL

## Đáp án 
Đáp án 
Q1: D.

Giải thích: Thay vì trả về lỗi, Hive trả về giá trị null cho sự không khớp giữa lược đồ và dữ liệu thực tế.

Q2:A

Giải thích: Copy dữ liệu được thực hiện bởi command hệ điều hành chứ không phải Hive 

Q3: B

Giải thích: Chức năng của SerDe được sử dụng để customize Hive cho nhiều định dạng tệp

Q4: Trả lời: A

Giải thích
STRINGS trả về dạng ARRAYS sẽ không chứa dấu nháy kép.

Q5 : B

Giải thích
SET hive.map.aggr = true;

Q6: A

Q7: Đáp án: D

Giải thích
Quá nhiều phân vùng tạo ra quá nhiều tệp và quá nhiều metadata được lưu trữ bởi namenode.

Q8: Đáp án: D

Giải thích
Tham số này được sử dụng để đặt chế độ cục bộ.
Q9: Trả lời: A

Giải thích
reverse (‘abcd’) cho ra ‘dcba’. Vì vậy, nó là một UDF tiêu chuẩn.

Q 10: Đáp án: B

Giải thích
Macro được tạo với mục đích gọi các hàm khác

Q11: Đáp án: B

Giải thích
Bốn dấu phân cách mặc định là :
\n cho dấu phân tách bản ghi,

001\ cho dấu phân tách trường

002\ cho dấu phân tách phần tử trong ARRAY hoặc STRUCT

003\ cho dấu phân tách phần tử trong MAP

Q12: Đáp án: C

Giải thích
Hàm CONCAT chấp nhận bất kỳ số lượng đối số nào

Q13: Trả lời: A

Giải thích
Thuộc tính này kiểm soát việc đăng nhập command line Interface.
Q14: Trả lời: A

Giải thích
Hcatalog lưu trữ thông tin metadata cho nhiều công cụ Hadoop như Hive và Mapreduce. Nó có thể được truy cập thông qua giao diện web

Q15: Trả lời: A

Giải thích
Vì dữ liệu bảng bên ngoài được quản lý bởi các ứng dụng khác, hive không tạo chỉ mục trên chúng.

Q16: Đáp án: B

Giải thích
Hive hỗ trợ biểu thức chính quy dựa trên java để truy vấn.

Q17: Trả lời: A

Giải thích
Vì dữ liệu được lưu trữ bên ngoài nên Hive chỉ loại bỏ lược đồ.

Q18: Đáp án: B

Giải thích
Các phần của một bảng tạo ra nhiều thư mục con hơn bên dưới nó.

Q19:  B

Giải thích :
Hive tạo một mapreduce job cho cặp bảng đầu tiên và cặp bảng thứ 2, cùng với một bảng chung giữa cả hai cặp.

Q20: Đáp án: C

Giải thích
Hive hỗ trợ biểu thức chính quy dựa trên java để truy vấn metadata của nó.