* **Xin chào mọi người, đối với QA / Tester thì việc kiểm thử các ứng dụng trên nhiều thiết bị khác nhau không còn quá xa lạ. Nên vậy, công việc kiểm thử ( testing ) cũng đòi hỏi rất nhiều kỹ năng. Trong đó, sử dụng SQL là một trong những kỹ năng rất quan trọng mà một QA/Tester cần phải có. Trong bài viết ngày hôm nay, mình sẽ phân tích tổng quan SQL là gì? Và tầm quan trọng của nó đối với một QA / Tester.**
### 1.	SQl là gì? 

SQL (Structured Query Language) hay ngôn ngữ truy vấn mang tính cấu trúc. SQL được sử dụng để giao tiếp với cơ sở dữ liệu. đó là ngôn ngữ tiêu chuẩn cho các hệ thống quản lý cơ sở dữ liệu quan hệ. Các câu lệnh SQL được sử dụng để thực hiện các tác vụ như cập nhật dữ liệu trên cơ sở dữ liệu hoặc truy xuất dữ liệu từ cơ sở dữ liệu.

**Tại sao SQL là cần thiết ?**

 SQL là cần thiết để:
* Tạo cơ sở dữ liệu, bảng và view mới.
* Để chèn các bản ghi vào trong một cơ sở dữ liệu. 
* Để xóa các bản ghi từ một cơ sở dữ liệu.
* Để lấy dữ liệu từ một cơ sở dữ liệu.
 
Chức năng của SQL: 
* Với SQL, chúng ta có thể truy vấn Database theo nhiều cách khác nhau, bởi sử dụng các lệnh. 
* Với SQL, người dùng có thể truy cập dữ liệu từ RDBMS. 
* SQL cho phép người dùng miêu tả dữ liệu.
* SQL cho phép người dùng định nghĩa dữ liệu trong một Database và thao tác nó khi cần thiết. 
* Cho phép người dùng tạo, xóa Database và bảng. 
* Cho phép người dùng tạo view, Procedure, hàm trong một Database.
* Cho phép người dùng thiết lập quyền truy cập vào bảng, thủ tục và view.

### 2.	Các kỹ năng SQL quan trọng như thế nào đối với Người kiểm thử phần mềm? 

**Giúp một QA/ Tester linh hoạt trong việc kiểm thử một hệ thống**

Là một Tester, tôi đã làm việc trên một số ứng dụng khác nhau. Một số ứng dụng yêu cầu skill về SQL, nhưng đối với một số ứng dụng thì không cần bất kỳ kiến thức nào. Với những dự án testing với Front-End thì SQL không cần được yêu cầu quá cao. Ví dụ, khi tôi test front-end cho 1 trang web nào đó. Việc tôi cần làm là test xem giao diện của website đó có tương thích với nhiều tổ hợp hệ điều hành khác nhau hay không. Đối với dự án này, tôi không cần sử dụng nhiều kỹ năng SQL của mình. Mà chỉ sử dụng một chút vào việc xác minh dữ liệu test, chèn, cập nhật và xóa các giá trị của data test trong database. 

Nhưng đối với một tester đâu chỉ làm mãi với những dự án như vậy, ở các dự án khác, tester phải tham gia vào test data của phía server ( hay còn gọi là back-end ). Nơi mà kiến thức SQL mà bạn bắt buộc phải có. Có một công cụ để thực hiện việc lấy data từ mySQL dựa trên các giá trị input. Là một phần của kiểm thử, tôi phải so sánh đầu ra của UI và đầu ra của database bằng cách nhập các input vào tool và database để đảm bảo một điều rằng là nó hoạt động đúng. Mỗi khi input thay đổi, việc testing các câu query sẽ rất lớn, vì vậy mỗi QA cần phải nắm vững và hiểu được mối quan hệ giữa các bảng để có thể test đúng và chính xác. Vậy nên, việc hiểu và sử dụng SQL Statement cũng như hiểu rõ về các relationship của các bảng là một điều rất quan trọng. Vì nó có thể ảnh hưởng trực tiếp đến dữ liệu của hệ thống.

**Dễ dàng thêm, sửa, đọc và xóa dữ liệu Với SQL**

Việc bạn muốn thêm, sửa, đọc hay xóa dữ liệu trở lên dễ dàng hơn bao giờ hết. Ví dụ, nếu bạn muốn lấy CustomerName và City của một Customers thì bạn làm như sau: 

`SELECT CustomerName,City FROM Customers; `

Thử tưởng tượng việc này sẽ khó khăn như thế nào nếu như test một hệ thống mà không biết cách những dữ liệu hoạt động hay nó được lấy từ đầu và đổ ra từ đâu đúng không nào? Tuy nhiên, SQL không chỉ giới hạn ở việc Thêm, Sửa, Truy Vấn và Xóa dữ liệu.

**SQL giúp công việc test trở nên dễ dàng**

Thử tưởng tượng trong ứng dụng của bạn có rất nhiều loại dữ liệu cần được test và bạn không thể quản lý được hết các dữ liệu đó vì bạn không biết truy vấn chúng từ đầu. Việc này lại khiến cho việc đọc dữ liệu trở lên phân tán và quy trình maintain không dễ dàng chút nào. Ngoài ra nếu bạn có nhiều ứng dụng khác nhau cần lưu thông tin thì việc quản lý dữ liệu lại càng trở lên khó khăn. Với SQL, bạn có thể truy xuất và quản lý được nhiều dữ liệu để test cho nhiều ứng dụng khác nhau trên các nên tảng khác nhau.

**SQL được sử dụng và hỗ trợ bởi nhiều công ty lớn**

Mặc dù SQL là ngôn ngữ khá đơn giản, nhưng nắm vững được nó là một kỹ năng là một điều vô cùng cần thiết. Tất cả các công ty lớn về công nghệ trên thế giới hiện nay như Microsoft, IBM, Oracle... đều hỗ trợ việc phát triển ngôn ngữ này và SQL được rất nhiều công ty lớn sử dụng.

> Hy vọng sau bài viết này các bạn hiểu được tầm quan trọng của SQL đối với một Tester/QA là như thế nào. Vì vậy, nếu các bạn có định hướng cho công việc Tester hay QA thì hãy bắt tay vào học SQL ngay từ bây giờ nhé ^^ Đây là bài viết đầu tiên của mình nên không tránh khỏi những thiếu sót, nên nếu có bất cứ thắc mắc nào, các bạn hãy comment phía dưới mình sẽ giải đáp sớm nhất có thể ạ. Cảm ơn các bạn đã theo dõi bài viết của mình. Hẹn gặp lại các bạn ở bài viết sau.

Tài liệu tham khảo:
* https://www.olenick.com/olenick-blog/184-the-importance-of-sql-skills-for-software-testers.html
* https://vietjack.com/sql/sql_la_gi.jsp