Chúng tôi đã nói rất nhiều về tài liệu test.
Nó là một phần không thể thiếu của kiểm thử phần mềm, và một trong những yếu tố chính đó là test case.
Testcase là trình tự từng bước một người kiểm thử thực hiện để xác thực một phần mềm đang hoạt động như dự định hay không.
Khi viết testcase, điều quan trọng là phải biết được dạng test case bạn cần viết.

![](https://images.viblo.asia/b2f1b344-e6d2-4cd4-be04-06265aa9af3c.png)

Mục tiêu là gì?

Hệ thống có xử lý validate không? Hay không hệ thống không thực hiện validate?Hoặc là mục tiêu để xem liệu phần mềm có bị hỏng ở một điểm nào đó không?
Nói chung, có ba kiểu thử nghiệm trong kiểm thử phần mềm bao gồm các cách tiếp cận này:

1. Positive test cases ( Phần Test case Normal)
2. Negative test cases ( Phần Test case Abnomal)
3. Destructive test cases ( Phần Test case phá hủy)

### Positive test cases:
kiểm tra các đầu vào hợp lệ để xác minh phần mềm đang làm những gì nó phải làm.
Mục đích chính của việc này là đảm bảo hệ thống không bị lỗi với những thao tác user thường sử dụng.

Nói chung, thử nghiệm tích cực đảm bảo hệ thống đáp ứng các yêu cầu theo các thao tác mà user thường sử dụng một cách bình thường nhất.

Ví dụ về các trường hợp thử nghiệm Normal

Hãy xem xét trường tạo mật khẩu phải chấp nhận 5-10 ký tự và chỉ bao gồm chữ cái và / hoặc số.
Dưới đây là một số ví dụ về trường hợp thử nghiệm tích cực:

* Trường mật khẩu phải chấp nhận 5 ký tự
* Trường mật khẩu phải chấp nhận 10 ký tự
* Trường mật khẩu phải chấp nhận tất cả các số
* Trường mật khẩu phải chấp nhận tất cả các chữ cái
* Trường mật khẩu phải chấp nhận kết hợp chữ cái và số

### Negative Test Cases

Các trường hợp kiểm tra bất thường là kiểm tra đầu vào không hợp lệ và xác minh phần mềm không làm những gì nó không được phép làm.
Mục đích của thử nghiệm tiêu cực là để đảm bảo hệ thống xác nhận đối với các đầu vào không hợp lệ bằng cách ném lỗi hoặc không cho phép hệ thống hoạt động trong một khoảng thời gian nhất định.

Chúng ta hãy xem xét ví dụ về lĩnh vực tạo mật khẩu tương tự ở trên và xem xét một số ví dụ về các trường hợp kiểm tra âm tính.

Ví dụ về trường hợp thử nghiệm âm tính

* Trường mật khẩu không được chấp nhận 1-4 ký tự
* Trường mật khẩu không được chấp nhận bất kỳ ký tự nào ngoài số hoặc chữ cái (! @ # ..vv)
* Trường mật khẩu không được chấp nhận 11 ký tự
* Trong mỗi bài kiểm tra này, hệ thống không nên chấp nhận đầu vào và nó sẽ dẫn đến một dạng xác thực nào đó.

Hệ thống sẽ xử lý các xác thực case này một cách dễ hiểu, cho dù thông qua các thông báo lỗi hoặc các cách tiếp cận giao diện người dùng khác để xác thực.

### Destructive Test Cases

Mục đích của các trường hợp kiểm thử phá hoại là kiểm tra những gì hệ thống có thể xử lý cho đến khi nó phá vỡ hoặc “phá hủy”.
Tải thử nghiệm và tiêm script là phương pháp phổ biến để thử nghiệm phá hoại.

Dưới đây là một số ví dụ về thử nghiệm phá hoại.

Ví dụ về trường hợp kiểm tra phá hủy

* Áp dụng tải trọng đáng kể cho hệ thống dẫn đến lỗi
* Chọc JavaScript vào biểu mẫu web có mục đích xấu
* Nhấp nhanh để cố gắng phá vỡ trang web
Bằng cách thực hiện một số trường hợp không thể đoán trước này,bạn sẽ xác định xem ứng dụng của bạn có xử lý các tình huống này một cách duyên dáng hay không.

### Áp dụng các loại Test Cases Trong kiểm thử phần mềm

Thật dễ dàng để tạo ra được các test case normal (positive test cases),
nhưng điều quan trọng là không bỏ qua hai kiểu thử nghiệm khác (negative và destructive test cases).

Ba kiểu test này trong kiểm thử phần mềm có thể được áp dụng cho nhiều kiểu test khác nhau như:  integration tests, non functional tests, functional test, và user acceptance tests.
Những cách tiếp cận thử nghiệm này có mục tiêu và mục đích khác nhau, và kết quả là, các trường hợp thử nghiệm của chúng rất khác nhau.

Bằng cách xem xét tất cả các góc độ kiểm tra và viết các trường hợp kiểm tra normal, adnormal và phá hoại, phạm vi kiểm tra của bạn sẽ lớn hơn và sản phẩm của bạn sẽ giữ được chất lượng cao hơn.
Trong 1 bộ test case thì nên có cả các trường hợp đó, để đảm bảo rằng hệ thống chay đúng theo cách thông thường, bất tường, và thao tác đặc biệt.