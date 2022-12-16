Ruby là ngôn ngữ script hướng đối tượng free.
Vào năm 1993, kỹ sư người Nhật tên là Matsumoto Yukihiro đã bắt đầu phát triển ngôn ngữ này và công khai nó vào năm 1995. Kể từ sau khi ngôn ngữ Ruby được công khai, những hiệu quả phát triển mà nó mang lại ngày càng được biết đến rộng rãi, và hiện tại nó đã trở thành 1 ngôn ngữ nổi tiếng trên khắp thế giới. Ruby được phát triển với mục tiêu "Là ngôn ngữ hướng đối tượng trên cả Python 2 và mạnh mẽ hơn cả Perl". Và trong những năm gần đây, nhờ vào việc xử lý dễ dàng một lượng lớn dữ liệu mà ngôn ngữ này càng được phổ biến hơn nữa.

## 1. Ưu - Nhược điểm của ngôn ngữ Ruby và Những ví dụ ứng dụng nó

**1.1. 5 đặc trưng của Ruby**

Có 5 đặc trưng của ngôn ngữ này được đưa ra đó là: Hướng đối tượng, Phương thức Interpreter, Tính linh hoạt cao, Tự do cú pháp cao, Không cần mô tả nhiều. 
- Hướng đối tượng: là phương thức tập hợp tất cả data và method thành 1 "đối tượng", và kết hợp tổ hợp các đối tượng đó để lập trình.
- Phương thức interpreter: tức là bằng cách giải thích chi tiết program đã được mô tả rồi chạy, người ta sẽ vừa mô tả program vừa có được kết quả chạy luôn nên dễ dàng biết được chỗ chỉnh sửa nằm ở đâu.
- Tính linh hoạt cao: Ruby còn có nhiều tính năng cấp cao hơn so với ngôn ngữ C điển hình như là "Tính linh hoạt cao". So với những ngôn ngữ khác thì framework và library được version up thường xuyên nên ngôn ngữ này rất đa chức năng. Thêm vào đó, khi nâng cao tính năng thì đồng thời những lỗ hỏng dễ bị tấn công cũng sẽ được khắc phục, vì vậy có thể nói đây là ngôn ngữ có "Tính linh hoạt cao".
- Tự do cú pháp cao: sẽ có lợi cho việc phát triển và chỉnh sửa program.
- Không cần mô tả nhiều: nếu biết cách kết hợp thật khéo léo các object lại với nhau thì có thể viết chương trình chỉ bằng 1 vài mô tả mà thôi.

**1.2. Ưu điểm của Ruby**

Vì Ruby không cần tạo kiểu dữ liệu của biến nên có thể giảm thiểu được nội dung mô tả. Ngoài ra, cấu trúc câu đơn giản và mức độ tự do cao cũng là nguyên nhân giúp cho việc mô tả trở nên dễ dàng hơn. Vì đây là ngôn ngữ kiểu interpreter nên khi confirm program đã tạo hoặc chỉnh sửa, không cần phải tốn thời gian vào việc compile giống như kiểu compiler. Có một Web application framework tên là "Ruby on Rails" - nhu cầu sử dụng framework này ngày càng cao cũng có thể nói là 1 ưu điểm của Ruby.

**1.3. Nhược điểm của Ruby**

Vì Ruby là ngôn ngữ script nên tốc độ run chậm. Mặt khác nữa, khi phát triển với nhiều người thì chính vì nó có cú pháp được viết tự do nên không có tính thống nhất và khó để quản lý, thêm nữa là khó để đọc hiểu được đoạn code người khác viết - làm mất nhiều cost cho việc chỉnh sửa.

**1.4. Những ví dụ phát triển sử dụng Ruby**

Ruby hiện đang được sử dụng trong nhiều website nổi tiếng. Chẳng hạn như Twitter - trang SNS nổi tiếng nhất hiện nay, hay trang Cookpad - nơi mọi người có thể chia sẽ công thức nấu ăn của mình. Ngoài ra, một website rất nổi tiếng dành cho dân lập trình là trang GitHub - nơi mọi người có thể chia sẽ source code với những developer khác cũng được phát triển bằng ngôn ngữ Ruby.

## 2. Dễ dàng làm quen với ngôn ngữ Ruby
Ruby đưa vào những đặc trưng của tất cả các ngôn ngữ programming Web như Python, Perl, Java... nên những engineer có thể dùng được những ngôn ngữ đó thì cũng có thể ngay lập tức làm quen được với Ruby.

## 3. Framework nổi tiếng trong Ruby
Nói tới Ruby, người ta sẽ nhắc ngay tới "Ruby on Rails" - Web application framework nổi tiếng nhất của Ruby.
Vậy nên tiếp theo mình sẽ giới thiệu về Ruby on Rails và những framwork khác của Ruby.

**3.1. Đặc trưng của Ruby on Rails**

Đặc trưng đầu tiên của Ruby on Rails chính là nó được sử dụng free.
Ngoài ra, Ruby on Rails có thể đơn giản hóa mọi thứ và làm giảm effort của engineer bằng việc đưa ra những quy ước khi phát triển. Nhờ vào những quy ước này mà có thể dễ dàng hiểu được đoạn code mà người khác viết. 
Engineer còn có thể tự động test application đã tạo nên lại càng giảm được effort hơn nữa.
Một đặc trưng nữa đó chính là việc khi thao tác database, không cần sử dụng SQL riêng mà có thể dùng trực tiếp Ruby on Rails nên có thể làm ngắn được đoạn code.

**3.2. Framework ngoài Ruby on Rails**

a) Hanami
Hanami là một framework MVC nhẹ và có nguồn thư viện phong phú. Hanami tuy đơn giản nhưng có thể add thêm nhiều chức năng mở rộng khi cần thiết, 
nhờ vậy mà có thể biến nó thành một framework original được trang bị chỉ những kỹ năng cần thiết cho từng project nhưng vẫn giữ được sự "nhẹ" của nó.

b) Sinatra
Sinatra là framework dành cho người mới bắt đầu có thể dễ dàng develop. Method được chia theo từng action nên có thể chỉnh sửa dễ dàng.

c) Padrino
Padrino lấy nền tảng từ Sintara, có thể develop với những dòng code ngắn hơn so với Ruby on Rails. Và đây là framework nhẹ, chạy được các chức năng như "Tool test tự động" đang được inplement trên Ruby on Rails.

Tóm lại, Ruby là một ngôn ngữ dễ học, dễ dùng và độ tự do biến hóa cao nên sẽ làm cho việc lập trình của các bạn trở nên thú vị và dễ dàng hơn. Nếu có cơ hội thì hãy thử làm quen với ngôn ngữ này nhé. (Mình cũng chưa và nếu có cơ hội sẽ thử :D)