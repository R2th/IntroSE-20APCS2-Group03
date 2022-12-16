## 1.Overview
Database là một phần không thể thiếu trong một ứng dụng phần mềm. Dù ứng dụng của bạn được phát trển trên nền tảng nào đi chăng nữa thì cơ sở dữ liệu vẫn là phần cốt lõi không thể thiếu.
 Một ứng dụng về chăm sóc sức khỏe, tài chính, thương mại điện tử, gửi thư...luôn tồn tại một hệ thống database cung cấp cho dữ liệu cho các ứng dụng.
 Khi sự phức tạp của ứng dụng tăng lên, yêu cầu cần phải có một cơ sở dữ liệu an toàn và mạnh mẽ. Có thể hiểu theo cách tương tự, đối với một ứng dụng có tần suất giao dịch cao liên quan đến tiền bạc (ví dụ như ứng dụng ngân hàng hoặc tài chính) yêu cầu một hệ thống database phải an toàn và có tính bảo mật cực kỳ cao.
 Một số công cụ quản lý dữ liệu có sẵn như MS-Access, MS SQL Server, SQL Server, Oracle, Oracle Financial, MySQL, PostgreQuery, DB2, Toad, .... Những công cụ này khách nhau về chi phí, độ mạnh, tính bảo vệ, mỗi cái đều có những ưu nhực điểm riêng
 
##  2.Tại sao phải kiểm tra cơ sở dữ liệu?
Để trả lời cho câu hỏi lớn này chúng ta hãy đi trả lời cho từng câu hỏi nhỏ để có cái nhìn rõ hơn về lý do tại sao phải kiểm kiểm tra cơ sở dữ liệu
### 1.Data Mapping
Trong phần mềm, dữ liệu được ánh xạ qua lại giữa UI và DB. Vì vậy đây là một khía cạnh để xem xét:
* Kiểm tra xem data hiển thị ngoài UI có được hiển thị nhất quán với các trường trong DB không. Các data này được xác định hiển thị theo spec của phần mềm
* Khi một thao tác được thực hiện trên giao diện UI của ứng dụng, một hành động (tạo, lấy, cập nhật, xóa data) tương ứng sẽ được thực hiện trong DB. Chúng ta sẽ pải kiểm tra xem data hiển thị ngoài UI và trong DB có được mapping với nhau hay không

### 2.Xác định thuộc tính ACID
Mỗi giao dịch mà DB thực hiện phải tuân thủ theo thuộc tính này 
![](https://images.viblo.asia/ce5a2ee4-8efe-48f1-ae09-93e95ed4c3e1.jpg)
* Atomicity: Nghĩa là khi thực hiện giao dịch trong ứng dụng thất bại hoặc một phần giao dịch được thực hiện thành công thì tất cả các dữ liệu của luồng nghiệp vụ đó sẽ không được lưu lại
* Consistency: Ứng dụng lưu trữ thông tin giao dich trong cở sở dữ liệu của ứng dụng và hiển thị chúng một cách chính xác tới người dùng.
* Isolation: Nếu có nhiều giao dịch được thực hiện cùng một lúc, data được lưu vào trong DB sẽ giống như khi chúng ta thực hiện lần lượt các giao dịch
* Durability: Không có thông tin nào bị mất trong quá trình giao dịch khi có các yếu tố bên ngoài nào như mất điện hoặc sự có thể thay đổi giao dịch

### 3.Tính toàn vẹn dữ liệu
Đối với bất kỳ hoạt động CRUD nào (create-read-update-delete) , các giá trị sẽ được cập nhật vào DB , dữ liệu sẽ được hiển thị lên giao diện UI của ứng dụng vì vậy cần phải đảm bảo rằng dữ liệu hiển thị trên UI là chính xác và đầy đủ
C: Khi người dùng lưu mọi giao dịch , thao tác tạo được thực hiện
R: Khi người dùng tìm kiếm hoặc xem mọi giao dịch đã lưu, thao tác truy xuất được thực hiện
U: Khi người dùng chỉnh sửa bản ghi hiện có, hoạt động cập nhật của DB được thực hiện
D: Khi người dùng xóa mọi bản ghi khỏi hệ thống, hoạt động xóa của DB được thực hiện
 Vì vậy, hãy đưa ra các trường hợp kiểm tra DB theo các hành động trên
 
##  3.Hoạt động kiểm tra database
### 1.Đảm bảo ánh xạ dữ liệu
Ánh xạ dự liệu là một trong những khía cạnh quan trọng trong cơ sở dữ liệu và nó phải được kiểm tra nghiêm ngặt bởi người kiểm thử
Đảm bảo rằng dữ liệu hiển thị trên giao diện ứng dụng và DB phải chính xác. Đối với các hoạt động CRUD phải đảm bảo rằng các bảng và bản ghi phải được cập nhật khi người dùng thực hiện các thao tác lưu, tìm kiếm, cập nhật hoặc xóa khỏi GUI của ứng dụng.

**Những điểm quan trọng cần phải kiểm tra:**
* Dữ liệu ánh xạ vào các bảng, cột và kiểu dữ liệu 
* Tra cứu dữ liệu được ánh xạ
* Đảm bảo hoạt động CRUD tại UI dữ liệu sẽ ánh xạ đúng vào DB

### 2.Đảm bảo các thuộc tính ACID của giao dịch
Bạn phải đảm bảo rặng mọi giao dịch đều thỏa mãn các thuộc tính ACID của cơ sở dữ liệu
* Atomicity: Đảm bảo data sẽ không được lưu nếu giao dịch không thành công hoặc kể cả một phần giao dịch thành công
* Consistency: Đảm bảo không có dữ liệu nào bị mất
* Isolation: Đảm bảo dù cố nhiều giao dịch đồng thời thì dữ liệu cũng không bị sai hoặc mất
* Durability: Đảm bảo rằng khi giao dịch đã được thực hiện, dữ liệu sẽ vẫn được giữ nguyên do có sự cố như mất điện xảy ra. Phần này cần kiểm tra kỹ nếu ứng dụng sử dụng cơ sở dữ liệu phân tán

### 3.Đảm bảo tính toàn vẹn dữ liệu
Khi các modul của ứng dụng sử dụng cùng một dữ liệu, nhưng dữ liệu đó được lấy theo các các khác nhau. TRường hợp đó phải đảm bảo rằng khi thực hiện trigger dữ liệu phải được phản ánh ở mọi nơi. Hệ thống phải hiển thị các giá trị được cập nhật gần nhất. điều này đượ gọi là tính toàn vẹn dữ liệu

**Các trường hợp kiểm tra để xác nhận tính toàn vẹn dữ liệu**
* Kiểm tra khi trigger dữ liệu có được cập nhật vào đầy đủ các bảng tham chiếu
* Kiểm tra dữ liệu không chính xác/ không hợp lệ trong các bảng
* Kiểm tra các lỗi với trường hợp cố chèn dữ liệu không hợp lệ
* Kiểm tra các lỗi liên quan đến việc chèn data mà chưa có khóa chính/khóa ngoại
* Thử xóa một bản ghi vẫn được tham chiếu bởi bất kỳ các bảng khác
* Kiểm tra khả năng mở rộng của database

### 4.Đảm bảo tính chính xác của các quy tắc kinh doanh
Ngày nay, database không chỉ là lưu chữ hồ sơ. Trên thực tế, cơ sở dữ liệu được phát triển thành các công cụ mạnh mẽ, cung cấp sự hỗ trợ rộng rãi cho các nhà phát triển để thực hiện logic kinh doanh. Ví dụ như tính toàn vẹn tham chiếu. Bằng cách sử dụng những tính năng này và các tính năng khác di DB cung cấp, các nhà phát triển triển khai logic nghiệp vụ. Người kiểm tra phải đảm bảo logic nghiệp vụ được triển khai là hoạt động chính xác.

## 4.Cách kiểm tra cơ sở dữ liệu
* Bước 1. Chuẩn bị môi trường
* Bước 2. Chạy thử nghiệm
* Bước 3. Kiểm tra kết quả
* Bước 4. Xác thực kiểm quả
* Bước 5. Báo cáo kết quả cho các bên liên quan 
![](https://images.viblo.asia/74790c40-8b65-4f3f-9643-427ebac92295.jpg)

## 5.Một số lời khuyên thiết thực
### 1.Tự viết truy vấn:
Để kiểm tra cơ sở dữ liệu một cách chính xác, người kiểm tra cần có kiến thức rất tốt về các câu lệnh SQL . Người kiểm tra cũng nên biết cấu trúc DB.

Bạn có thể kết hợp GUI và xác minh dữ liệu trong các bảng tương ứng để có độ bao phủ tốt hơn. Nếu bạn đang sử dụng máy chủ SQL thì bạn có thể sử dụng Trình phân tích truy vấn SQL để viết các truy vấn, thực hiện chúng và truy xuất kết quả.

Đây là cách tốt nhất và mạnh mẽ để kiểm tra cơ sở dữ liệu khi ứng dụng có mức độ phức tạp nhỏ hoặc trung bình.

### 2.Quan sát dữ liệu trong mỗi bảng
Thực hiện xác minh dữ liệu bằng hoặt động CRUD.điều này có thể thực hiện khi kết hợp sử dụng UI ứng dụng

### 3.Sử dụng truy vấn từ các nhà phát triển
Đây là cách đơn giản nhất để kiểm tra cơ sở dữ liệu. Thực hiện bất kỳ hoạt động CRUD nào từ GUI và xác minh tác động của nó bằng cách thực hiện các truy vấn SQL tương ứng thu được từ nhà phát triển. Nó không đòi hỏi kiến thức tốt về SQL và cũng không đòi hỏi kiến thức tốt về cấu trúc DB của ứng dụng.

Nhưng phương pháp này cần được sử dụng thận trọng. Điều gì xảy ra nếu truy vấn được cung cấp bởi nhà phát triển sai về mặt ngữ nghĩa hoặc không thực hiện đúng yêu cầu của người dùng? Quá trình đơn giản sẽ không xác nhận dữ liệu.

Tài liệu tham khảo: https://www.softwaretestinghelp.com/database-testing-process/