Chắc hẳn với các Dev thì index không còn gì xa lạ. nhưng với 1 số người chắc vẫn chưa hiểu rõ index trong sql là gì. nên hôm nay mình sẽ giới thiệu 1 chút về index cho những người mới phần nào hiểu được và các dev có thể ôn lại kiến thức của mình.
     
##     Giới thiệu về index
Dễ hiểu thì index(hay còn gọi là chỉ mục) là bảng tra cứu đặc biệt mà Database Search Engine có thể sử dụng để tăng nhanh thời gian và hiệu suất thu thập dữ liệu. Hiểu đơn giản, một index là một con trỏ tới dữ liệu trong một bảng. 
    
Index sẽ giúp tăng tốc độ các câu lệnh truy vấn SELECT và các mệnh đề WHERE 
Các index  có thể là duy nhất, tương tự như ràng buộc UNIQUE, trong đó index ngăn ngừa các bản sao của các bản ghi trong cột hoặc việc tổ hợp của các cột có index.

Ví dụ cho mọi người dễ hình dung.  
Một index là một con trỏ tới dữ liệu trong một bảng. Một index trong một Database là tương tự như một chỉ mục trong Mục lục của cuốn sách. Nếu muốn tham chiếu tất cả các trang trong một cuốn sách về một chủ đề nào đó, đầu tiên ta nghĩ ngay đến mục lục của nó, mà liệt kê tất cả các chương, chủ đề theo thứ tự và sau đó được tham chiếu tới một hoặc nhiều trang cụ thể.
    
##     Cú pháp
Cú pháp tạo index thì cực kỳ đơn giản


`CREATE INDEX tên_index ON tên_bảng;`


ngoài ra index còn có các kiểu index khác tùy vào nhu cầu sử dụng
### Single-colume index:
Hiểu đơn giản là đánh index cho duy nhất 1 cột trong bảng

Vi dụ: 
`CREATE INDEX tên_index  ON tên_bảng (tên_cột);`

### Unique index:
Như tên gọi của nó,nó không cho phép giá trị trùng lặp nào được chèn vào trong bảng

Ví dụ: 
`CREATE UNIQUE INDEX tên_index ON tên_bảng(tên_cột);`

### Composite index:
Như single-colume index nhưng nó sẽ đánh index cho nhiều cột. Việc tạo single-colume index hay composite index tùy thuộc vào có bao nhiêu cột thường được dùng WHERE hay JOIN.nếu 1 cột thì ta dùng single-colume index, nhiều cột thì dùng composite 

### Implicit index:
Loại ngầm định ,được tạo tự động bởi database server khi một bảng được tạo. Implicit index được tạo ngầm định cho các ràng buộc primary key và unique.

## Index dùng trong những trường hợp nào
Dưới đây là những trường hợp nên sử dụng index để đạt hiểu quả tối đa.

-dùng trong các bảng thường được truy vấn bằng câu lệnh **WHERE**, **JOIN** với **ON** hay các câu lệnh so sánh có điều kiện thường xuyên trên một cột nào đó.
    
-Đối với các cột cần Index thì tuỳ vào kiểu dữ liệu của nó, kiểu có số byte càng lớn thì việc **INSERT** nhiều dữ liệu về sau càng lâu hơn (trừ cột có kiểu int hay bigint tự tăng) . Kiểu dữ liệu cơ bản cần Index đó là kiểu CHAR hay VARCHAR:

-Index giới hạn độ dài của "text", như MYSQL là 767 byte

-Đối với MYSQL, MS SQL, v.v... thì nên đặt kiểu dữ liệu là CHAR(số ký tự) . kiểu CHAR sẽ chiếm không gian định sẵn chứ không giãn nở như kiểu VARCHAR , tuy nhiên thì cột Index không cần có số byte quá lớn nên kiểu CHAR là hợp lý nhất

-Index không nên sử dụng trong các bảng thường xuyên có các hoạt động như insert, update.

-không sử dụng với các cột có quá nhiều giá trị null,các cột thường xuyên bị thay đổi

Bonus: với các bảng có trường là text và thường xuyên phải thực hiện câu lệnh tìm kiếm liên quan tới trường text thì nên dùng Full Text Search.

## Nhược điểm của index
Mọi thứ đều có mặt trái của nó, và index cũng vậy, nó cũng có nhược điểm của chính mình. Dưới đây mình sẽ liệt kê một số nhược điểm chết người của index:

-thực hiện nhiều trong thay đổi trong bảng sẽ dẫn đến phân mảnh, làm giảm hiệu năng

-insert, update, delete sẽ bị chậm(như nói ở trên không nên dùng với các bảng thường xuyên dùng insert, update
##     Kết luận
Qua những gì mình chia sẽ. Chắc mọi người cũng hình dung phần nào về index, cách dùng nó như thế nào. Hẹn mọi người vào bài chia sẽ kế tiếp!