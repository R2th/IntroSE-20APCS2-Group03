# Cấu trúc dữ liệu là gì?
## Cấu trúc dữ liệu có thật sự quan trọng?
* Ở thời đại công nghệ số, lượng dữ liệu được sinh ra và trao đổi ngày càng tăng cao. Nếu không được lưu trữ một cách khoa học thì việc truy vẫn đến dữ liệu về sau này sẽ vô cùng khó khăn. 
* Mỗi máy tính đều có giới hạn nhất định về bộ vi xử lý. Mặc dù hàng triệu phép tính có thể được giải quyết trong vòng một giây nhưng khi bài toán cần giải quyết trở nên phức tạp với hàng tỉ phép tính thì việc tổ chức dữ liệu vẫn cực kỳ quan trọng.

Bởi vậy, có thể nói cấu trúc dữ liệu đóng vai trò chủ chốt trong các ứng dụng, phần mềm... hiện nay.
## Định nghĩa
Cấu trúc dữ liệu được hiểu là cách tổ chức và lưu trữ dữ liệu một cách có hệ thống để sao cho các thao tác liên quan đến dữ liệu như đọc, ghi, tìm kiếm, ... được thực hiện một cách nhanh nhất.
# Cấu trúc dữ liệu thường dùng: stack, queue
Có nhiều loại cấu trúc dữ liệu, ví dụ như danh sách liên kết (linked list), cây (tree), đồ thị (graph), ... Trong bài này, mình sẽ giới thiệu với mọi người 2 loại cấu trúc dữ liệu mà thường được sử dụng nhất đó là ngăn xếp (stack) và hàng đợi (queue).
## Stack
### Giới thiệu stack
Stack, được hiểu theo nghĩa Tiếng Việt là ngăn xếp, xếp chồng. Đây là cấu trúc dữ liệu hoạt động theo nguyên tắc: vào sau ra trước (Last in first out - LIFO). Để trực quan, các bạn có thể hiểu nó là một chồng bát, bạn chồng các chiếc bát lên cao thì chiếc bạn chồng vào sau cùng sẽ là chiếc bạn lấy ra đầu tiên và ngược lại, chiếc bát đầu tiên, ở dưới cùng sẽ là chiếc bạn lấy ra sau cùng.
Các thao tác với cấu trúc dữ liệu kiểu stack là:
* push: thêm bản ghi, tương tự với việc bạn thêm một chiếc bát vào chồng.
* pop: lấy bản ghi, tương tự lấy bát ra khỏi chồng
* length: trả về số lượng bản ghi, tương ứng với chiều cao chồng bát.
* peak: trở về bản ghi đầu tiên, tương ứng với việc bạn chạm tay vào chiếc bát trên cùng
### Ứng dụng của stack:
* Chuyển đổi số thập phân sang nhị phân: Khi chuyển đổi số thập phân sang nhị phân, chúng ta sẽ thưc hiện thao tác chia số thập phân này cho 2 và viết phần dư ngược lại thứ tự mà nó được sinh ra. Sử dụng stack, ta lưu lần lượt phần dư sau mỗi lần chia và sau khi kết thúc thao tác chia, đọc stack vừa rồi sẽ cho ra biểu diễn nhị phân cần tìm.
* Tính giá trị biểu thức đại số hậu tố: Biểu thức đại số hậu tố là biểu thức có toán tử nằm sau 2 toán hạng của nó, cũng không có dấu ngoặc. Ví dụ như biểu thức hậu tố của `((4 + 2) / 3) + 5` sẽ là `4 2 + 3 / 5 +`. Đầu tiên, duyệt biểu thức theo thứ tự từ trái sang phải, khi gặp toán hạng thì đẩy vào stack. Sau đó, khi gặp toán tử, ta lấy 2 toán hạng trên cùng trong stack ra và thực hiện phép toán rồi lại đẩy kết quả vào stack. Đối với ví dụ này, các thao tác được thực hiện là:

|Đầu vào   | Thao tác | Stack    |
| -------- | -------- | -------- |
| 4        | push     | 4        |
| 2        | push     | 4, 2     |
| +        | pop      | 6        |
| 3        | push     | 6, 3     |
| /        | pop      | 2        |
| 5        | push     | 2, 5     |
| +        | pop      | 7        |
Kết quả cuối cùng là 7.
## Queue
### Giới thiệu queue
Queue, được hiểu là hàng đợi và là cấu trúc dữ liệu hoạt động theo nguyên tắc: vào trước ra trước (First in first out - FIFO). Một cách trực quan thì các bạn có thể liên tưởng đến lúc bạn xếp hàng mua vé xem phim, ai đến xếp hàng trước thì sẽ được bán vé trước và tương tự, ai xếp hàng sau thì sẽ được phục vụ sau.
Các thao tác với cấu trúc dữ liệu queue:
* EnQueue: Thêm một bản ghi vào cuối hàng đợi, tương tự như việc có thêm người đến xếp hàng đợi mua vé.
* DeQueue: Lấy ra bản ghi đầu tiên, tương tự việc người đứng đầu hàng đang được nhân viên bán vé.
* IsEmpty: Kiểm tra hàng đợi có rỗng hay không, tương tự việc người khác hỏi bạn xem có ai đang xếp hàng mua vé hay không và bạn trả lời.
* Front: Trở về bản ghi đầu tiên
### Ứng dụng của queue
* Xử lý các lệnh trong máy tính: Điều này khá là dễ hiểu nên mình không bình luận thêm.
* Kiểm tra chuỗi Palindrome: Một chuỗi được gọi là có tính chất Palindrome nếu nó có tính chât đối xứng, tức là viết xuôi cũng giống viết ngược, ví dụ như "aaAaa". Để kiểm tra tính chất này của một chuỗi bất kì, ta đọc chuỗi bởi 2 cấu trúc riêng biệt là stack và queue. Sau đó, lấy ra từng phần tử trong stack và queue để so sánh với nhau. Nếu tất cả các phần tử trong stack đều giống với phần tử trong queue ở vị trí tương ứng thì chuỗi đó có tính chất Palindrome.
# Ứng dụng của Stack và Queue trong Amazon Web Services
## Amazon Web Services là gì?
Amazon Web Services hay AWS là nền tảng dịch vụ công nghệ thông tin điện toán đám mây toàn diện với các dịch vụ cho thuê máy chủ, lưu trữ cơ sở dữ liệu, hạ tầng mạng, phân phối nội dung và nhiều giải pháp phần mềm khác giúp nhà phát triển phần mềm cũng như doanh nghiệp triển khai và mở rộng hệ thống thông tin dễ dàng và nhanh chóng. 

Các dịch vụ AWS đưa đưa ra vào năm 2006 với mục đích ban đầu để quản lý và điều hành hoạt động bán hàng online của website Amazon.com. Sau đó, AWS chính là công ty đầu tiên tiên phong dịch vụ điện toán đám mấy với khái niệm pay-as-you-go trên nền tảng AWS này, tức là doanh nghiệp chỉ trả chi phí thực sự với nhu cầu bạn sử dụng, giúp doanh nghiệp dễ dàng đầu tư cũng như mở rộng hạ tầng công nghệ thông tin với máy tính, dịch vụ lưu trữ dữ liệu với chi phí phù hợp và hiệu quả nhất

Trong phần này, mình sẽ không phân tích chi tiết mà chỉ nêu khái quát về vai trò của stack và queue trong 2 dịch vụ của AWS, đó là AWS CloudFormation và Amazon Simple Queue Service.
## AWS CloudFormation
AWS CloudFormation là một dịch vụ hỗ trợ việc thiết lập các tài nguyên của Amazon Web Service, nhờ đó bạn chỉ cần bỏ ra ít thời gian để quản lý các tài nguyên đó và có thể tập trung vào phát triển ứng dụng chạy trên AWS. Bạn tạo ra một template (thường là các đoạn mã Json hoặc Yaml) để mô tả tài nguyên AWS mà bạn muốn (như là Amazon EC2 innstance hoặc Amazon RDS DB instance), và AWS CloudFormation xử lý việc cung cấp và thiết lập các tài nguyên đó giúp bạn. Bạn không cần thiết phải tạo, thiết lập từng tài nguyên một, cũng không cần phải quan tâm phần nào phụ thuộc vào phần nào, AWS CloudFormation sẽ làm giúp bạn.

### Cấu trúc cơ bản của Amazon CloudFormation
Cấu trúc cơ bản của một Amazon CloudFormation sẽ gồm 2 phần:
* Template
* Stack

### Cơ chế hoạt động của Amazon CloudFormation
![](https://images.viblo.asia/5067da15-acc3-48e7-b5ed-2284fb6a4ec9.png)
Khi sử dụng AWS CloudFormation, các lệnh sẽ được thực hiện theo nội dung mà template mô tả. Ví dụ như khi cần tạo tài nguyên mới, bạn sẽ viết nội dung này vào template. AWS CloudFormation cung cấp và thiết lập các tài nguyên bằng cách gọi tới các AWS service được mô tả trong template. Sau khi tất cả các tài nguyên đã được tạo, AWS CloudFormation truyền tín hiệu thông báo stack đã được tạo thành công. Sau đó bạn có thể sử dụng tất cả các tài nguyên trong stack. Nếu gặp lỗi trong việc tạo ra stack, AWS CloudFormation sẽ roll-back tất cả các thay đổi và xóa mọi tài nguyên vừa được tạo ra.

Vai trò của stack được thể hiện rõ ràng nhất trong bước roll-back này. Khi tạo các tài nguyên, các lệnh sẽ được đưa vào một stack. Nếu có lỗi xảy ra thì cần lần lượt xóa bỏ các tài nguyên vừa tạo, dựa vào thứ tự lệnh trong stack và quy tắc vào trước ra sau, các tài nguyên sẽ được xóa bỏ một cách an toàn nhất
## Amazon Simple Queue Service
Amazon Simple Queue Service (SQS) là một dịch vụ giúp lưu trữ thông điệp (message), thường là dữ liệu văn bản, dưới dạng hàng đợi (queue). Ưu điểm của Amazon SQS là tính nhanh chóng, đáng tin cậy, có khả năng mở rộng và quản lý một cách đầy đủ.

### Cấu trúc cơ bản của Amazon SQS
Cấu trúc cơ bản của một Amazon SQS sẽ gồm 3 phần:
* Các thành phần của hệ thống phân tán.
* Hàng đợi
* Các thông điệp trong hàng đợi

![](https://images.viblo.asia/7ae90851-39a6-4194-9099-3158b50fc6d0.png)

### Cơ chế hoạt động của Amazon SQS
Cơ chế hoạt động của Amazon SQS được mô tả như hình dưới đây:
![](https://images.viblo.asia/524bae54-af4e-4a6e-9a2c-e620eb4ce2f2.png)
Giải thích chi tiết như sau:
* Thành phần 1 gửi thông điệp A tới một hàng đợi. Hàng đợi này sẽ lưu trữ thông điệp này.
* Khi thành phần nào đó trong hệ thống (ở đây là thành phần 2) sẵn sàng xử lý thông điệp thì nó sẽ gọi tới hàng đợi, lúc này, một thông điệp sẽ được trả lại (ở đây giải sử là thông điệp A).
* Sau khi thành phần 2 xử lý xong thông điệp A, nó sẽ xóa A khỏi hàng đợi để tránh các thành phần sau sẽ gọi tới thông điệp này.

Ở đây, có thể thấy rõ vai trò của hàng đợi là rất quan trọng. Nó giúp sắp xếp và tổ chức các thông điệp bài bản, có trật tự, làm cho các thông điệp được xử lý theo thứ tự, thông điệp nào được gửi trước thì sẽ được xử lý trước và ngược lại. Từ đó không có thông điệp nào phải chờ quá lâu.

# Kết luận
Trên đây, mình đã nêu ra những cái nhìn tổng quan về stack và queue. Bài viết hy vọng sẽ giúp ích cho mọi người khi đang bắt đầu tìm hiểu về 2 loại cấu trúc dữ liệu này. 

Thanks!

# Tài liệu tham khảo
Phần AWS CloudFormation:
https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html
https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-whatis-concepts.html
https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-whatis-howdoesitwork.html

Phần AWS queue:
https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html
https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-basic-architecture.html