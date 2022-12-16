Bài viết được tham khảo từ nguồn:
https://www.softwaretestinghelp.com/sql-injection-how-to-test-application-for-sql-injection-attacks/

Trong khi thực hiện test một dự án (một trang web hoặc một hệ thống), mục đích của tester là đảm bảo sản phẩm được bảo vệ nhiều nhất có thể hay không?

Security Testing là để thực hiện cho mục đích này. Để thực hiện loại thử nghiệm này, ban đầu, chúng ta cần xem xét, những cuộc tấn công nào có khả năng xảy ra cao nhất. SQL Injection là một trong những cuộc tấn công như vậy.

SQL Injection được coi là một trong những cuộc tấn công phổ biến nhất vì nó có thể mang lại hậu quả nghiêm trọng và có hại cho hệ thống và dữ liệu nhạy cảm của bạn.

# Nội dung của bài viết:

1. SQL Injection là gì?
2. Risks của SQL Injection
3. Bản chất của cuộc tấn công này
4. Kiểm tra bảo mật của các ứng dụng web chống lại SQL Injection
5. Các bộ phận dễ bị tổn thương của cuộc tấn công này
6. Tự động kiểm tra SQL Injection
7. So sánh với các cuộc tấn công khác
8. Kết luận

# 1. SQL Injection là gì?

Trong một số dữ liệu đầu vào của người dùng có thể được sử dụng trong các Câu lệnh SQL, sau đó được ứng dụng thực thi trên cơ sở dữ liệu. Ứng dụng KHÔNG có khả năng xử lý các đầu vào do người dùng cung cấp đúng cách.

Nếu đúng như vậy, mã độc hại có thể cung cấp đầu vào không mong muốn cho ứng dụng, sau đó được sử dụng để đóng khung và thực thi các câu lệnh SQL trên cơ sở dữ liệu. Đây được gọi là SQL Injection. Hậu quả của một hành động như vậy có thể đáng báo động.

Như chính cái tên của nó, mục đích của cuộc tấn công SQL Injection là đưa mã SQL độc hại vào.

Mỗi và mọi lĩnh vực của một trang web giống như một cổng vào cơ sở dữ liệu. Trong biểu mẫu đăng nhập, người dùng nhập dữ liệu đăng nhập, trong trường tìm kiếm, người dùng nhập văn bản tìm kiếm, trong biểu mẫu lưu dữ liệu, người dùng nhập dữ liệu cần lưu. Tất cả dữ liệu được chỉ định này sẽ được chuyển đến cơ sở dữ liệu.

Thay vì dữ liệu chính xác, nếu bất kỳ mã độc hại nào được nhập vào, thì có khả năng xảy ra một số thiệt hại nghiêm trọng cho cơ sở dữ liệu và toàn bộ hệ thống.

SQL Injection được thực hiện với ngôn ngữ lập trình SQL. SQL (Ngôn ngữ truy vấn có cấu trúc) được sử dụng để quản lý dữ liệu được lưu giữ trong cơ sở dữ liệu. Do đó trong cuộc tấn công này, mã ngôn ngữ lập trình này đang được sử dụng như một loại mã độc.

Đây là một trong những cuộc tấn công phổ biến nhất, vì cơ sở dữ liệu được sử dụng cho hầu hết các công nghệ.

Nhiều ứng dụng sử dụng một số loại Cơ sở dữ liệu. Ứng dụng đang được thử nghiệm có thể có giao diện người dùng chấp nhận thông tin đầu vào của người dùng được sử dụng để thực hiện các tác vụ sau:

#1) Hiển thị dữ liệu được lưu trữ có liên quan cho người dùng, ví dụ: ứng dụng kiểm tra thông tin đăng nhập của người dùng bằng thông tin đăng nhập do người dùng nhập và chỉ hiển thị chức năng và dữ liệu có liên quan cho người dùng

#2) Lưu dữ liệu do người dùng nhập vào cơ sở dữ liệu, ví dụ: khi người dùng điền vào biểu mẫu và gửi nó, ứng dụng sẽ tiến hành lưu dữ liệu vào cơ sở dữ liệu; dữ liệu này sau đó được cung cấp cho người dùng trong cùng một phiên cũng như trong các phiên tiếp theo.

# 2. Risks của SQL Injection

Ngày nay, cơ sở dữ liệu đang được sử dụng cho hầu hết các hệ thống và trang web, vì dữ liệu nên được lưu trữ ở đâu đó.

Vì dữ liệu nhạy cảm đang được lưu trữ trong cơ sở dữ liệu, nên có nhiều rủi ro hơn liên quan đến bảo mật của hệ thống. Nếu bất kỳ dữ liệu blog hoặc trang web cá nhân nào bị đánh cắp, thì sẽ không có nhiều thiệt hại khi so sánh với dữ liệu bị đánh cắp từ hệ thống ngân hàng.

Mục đích chính của cuộc tấn công này là để hack cơ sở dữ liệu của hệ thống, do đó, hậu quả của cuộc tấn công này thực sự có thể gây hại.

Những điều sau đây có thể là kết quả của SQL Injection

Đánh cắp tài khoản của người khác.
Đánh cắp và sao chép dữ liệu nhạy cảm của trang web hoặc hệ thống.
Thay đổi dữ liệu nhạy cảm của hệ thống.
Xóa dữ liệu nhạy cảm của hệ thống.
Người dùng có thể đăng nhập vào ứng dụng với tư cách người dùng khác, thậm chí với tư cách quản trị viên.
Người dùng có thể xem thông tin cá nhân thuộc về những người dùng khác, ví dụ: chi tiết về hồ sơ của người dùng khác, chi tiết giao dịch, v.v.
Người dùng có thể thay đổi thông tin cấu hình ứng dụng và dữ liệu của những người dùng khác.
Người dùng có thể sửa đổi cấu trúc của cơ sở dữ liệu; thậm chí xóa các bảng trong cơ sở dữ liệu ứng dụng.
Người dùng có thể kiểm soát máy chủ cơ sở dữ liệu và thực hiện các lệnh trên nó theo ý muốn.
Những rủi ro được liệt kê ở trên thực sự có thể được coi là nghiêm trọng, vì việc khôi phục cơ sở dữ liệu hoặc dữ liệu của nó có thể tốn rất nhiều chi phí. Việc khôi phục lại hệ thống và dữ liệu bị mất có thể khiến công ty của bạn mất uy tín và tiền bạc. Do đó, chúng tôi khuyên bạn nên bảo vệ hệ thống của mình trước kiểu tấn công này và coi Kiểm tra bảo mật là một khoản đầu tư tốt cho danh tiếng của sản phẩm và công ty của bạn.

Với tư cách là người thử nghiệm, tôi muốn nhận xét rằng thử nghiệm chống lại các cuộc tấn công có thể xảy ra là một phương pháp hay ngay cả khi Thử nghiệm bảo mật không được lên kế hoạch. Bằng cách này, bạn có thể bảo vệ và kiểm tra sản phẩm trước các trường hợp không mong muốn và người dùng độc hại.

# 3. Bản chất của cuộc tấn công này
Như đã đề cập trước đó, bản chất của cuộc tấn công này là hack cơ sở dữ liệu với mục đích xấu.

Để thực hiện Kiểm tra bảo mật này, ban đầu, bạn cần tìm các phần hệ thống dễ bị tấn công và sau đó gửi mã SQL độc hại thông qua chúng đến cơ sở dữ liệu. Nếu cuộc tấn công này có thể xảy ra đối với một hệ thống, thì mã SQL độc hại thích hợp sẽ được gửi đi và các hành động có hại có thể được thực hiện trong cơ sở dữ liệu.

Mỗi và mọi lĩnh vực của một trang web giống như một cổng vào cơ sở dữ liệu. Bất kỳ dữ liệu hoặc đầu vào nào mà chúng tôi thường nhập vào bất kỳ trường nào của hệ thống hoặc trang web sẽ chuyển đến truy vấn cơ sở dữ liệu. Do đó, thay vì dữ liệu chính xác, nếu chúng ta gõ bất kỳ mã độc hại nào, thì nó có thể được thực thi trong truy vấn cơ sở dữ liệu và mang lại hậu quả có hại.

Để thực hiện cuộc tấn công này, chúng ta phải thay đổi hành động và mục đích của một truy vấn cơ sở dữ liệu thích hợp. Một trong những phương pháp khả thi để thực hiện nó là làm cho truy vấn luôn đúng và sau đó chèn mã độc hại của bạn. Thay đổi truy vấn cơ sở dữ liệu thành luôn đúng có thể được thực hiện với mã đơn giản như: ‘OR 1 = 1; -.

Người kiểm tra nên lưu ý rằng trong khi kiểm tra xem việc thay đổi truy vấn thành luôn đúng có thể được thực hiện hay không, nên thử các dấu ngoặc kép khác nhau - đơn và kép. Do đó, nếu chúng ta đã thử mã như ‘OR 1 = 1; -, chúng ta cũng nên thử mã có dấu ngoặc kép“ OR 1 = 1; -.

Ví dụ: hãy xem xét rằng chúng ta có một truy vấn, đang tìm kiếm từ đã nhập trong bảng cơ sở dữ liệu:

`select * from notes nt where nt.subject = ‘search_word‘;`

Do đó, thay vì từ tìm kiếm, nếu chúng ta nhập truy vấn SQL Injection ‘hoặc 1 = 1; -, thì truy vấn sẽ luôn đúng.

`select * from notes nt where nt.subject = ‘ ‘ or 1=1;–`

Trong trường hợp này, tham số "subject" được đóng bằng dấu ngoặc kép và sau đó chúng tôi có mã or 1 = 1, điều này làm cho một truy vấn luôn đúng. Với dấu “-“ chúng tôi nhận xét về phần còn lại của mã truy vấn, mã này sẽ không được thực thi. Đây là một trong những cách phổ biến nhất và dễ dàng nhất để bắt đầu kiểm soát truy vấn.

Một số mã khác cũng có thể được sử dụng để làm cho truy vấn luôn đúng, như:

> ‘ or ‘abc‘=‘abc‘;–
> ‘ or ‘ ‘=‘ ‘;–

Phần quan trọng nhất ở đây là sau dấu phẩy, chúng ta có thể nhập bất kỳ mã độc hại nào mà chúng ta muốn được thực thi.

Ví dụ: it may be ‘ or 1=1; drop table notes; —

`‘ or 1=1; drop table notes; —`

Nếu việc này có thể xảy ra, thì bất kỳ mã độc hại nào khác có thể được viết. Trong trường hợp này, nó sẽ chỉ phụ thuộc vào kiến thức và ý định của người dùng độc hại. Làm thế nào để Kiểm tra SQL Injection?

Kiểm tra lỗ hổng này có thể được thực hiện rất dễ dàng. Đôi khi chỉ cần nhập dấu ‘or “ vào các trường được kiểm tra. Nếu nó trả về bất kỳ thông báo bất ngờ hoặc bất thường nào, thì chúng tôi có thể chắc chắn rằng SQL Injection có thể thực hiện được cho trường đó.

Ví dụ: Nếu bạn nhận được thông báo lỗi như ‘Internal Server Error’ trong kết quả tìm kiếm, thì chúng tôi có thể chắc chắn rằng cuộc tấn công này có thể xảy ra trong phần đó của hệ thống.

Các kết quả khác, có thể thông báo cuộc tấn công có thể xảy ra bao gồm:

Đã tải trang trống.
Không có thông báo lỗi hoặc thành công - chức năng và trang không phản ứng với đầu vào.
Thông báo mã độc thành công.

Ví dụ: Hãy kiểm tra xem một cửa sổ đăng nhập thích hợp có dễ bị tấn công đối với SQL Injection hay không. Với mục đích này, trong trường địa chỉ email hoặc mật khẩu, chúng ta chỉ cần nhập dấu hiệu như hình dưới đây.
![image.png](https://images.viblo.asia/67319505-ef48-436b-afa7-4f57af63f35d.png)

Nếu đầu vào như vậy trả về kết quả như thông báo lỗi ‘Internal Server Error’ hoặc bất kỳ kết quả không phù hợp nào khác được liệt kê, thì chúng tôi gần như có thể chắc chắn rằng cuộc tấn công này có thể xảy ra đối với trường đó.

Một mã SQL Injection rất phức tạp cũng có thể được thử. Tôi muốn đề cập rằng trong sự nghiệp của mình, tôi chưa gặp trường hợp nào xuất hiện thông báo "Internal Server Error" do dấu hiệu, nhưng đôi khi các trường không phản ứng đối với mã SQL phức tạp hơn.

Do đó việc kiểm tra SQL Injection bằng một câu trích dẫn duy nhất ‘là một cách khá đáng tin cậy để kiểm tra xem cuộc tấn công này có khả thi hay không.

Nếu trích dẫn đơn không trả về bất kỳ kết quả nào không phù hợp, thì chúng ta có thể thử nhập dấu ngoặc kép và kiểm tra kết quả.
`"`

Ngoài ra, mã SQL để thay đổi truy vấn thành luôn đúng có thể được coi là một cách để kiểm tra xem cuộc tấn công này có khả thi hay không. Nó đóng tham số và thay đổi truy vấn thành ‘true‘. Do đó, nếu không được xác thực, đầu vào đó cũng có thể trả về bất kỳ kết quả không mong muốn nào và thông báo tương tự rằng cuộc tấn công này có thể xảy ra trong trường hợp này.

Việc kiểm tra các cuộc tấn công SQL có thể xảy ra cũng có thể được thực hiện từ liên kết của trang web. Giả sử chúng tôi có liên kết của trang web là http://www.testing.com/books=1. Trong trường hợp này, ‘books‘ là một tham số và ‘1‘ là giá trị của nó. Nếu trong liên kết được cung cấp, chúng tôi viết ‘  thay vì 1, thì chúng tôi sẽ kiểm tra xem có khả năng tấn công hay không.
`http://www.testing.com/books='`

Do đó, liên kết http://www.testing.com/books= sẽ giống như một bài kiểm tra xem cuộc tấn công SQL có thể xảy ra đối với trang web http://www.testing.com hay không?

Trong trường hợp này, nếu liên kết http://www.testing.com/books= trả về thông báo lỗi như 'Internal Server Error' hoặc trang trống hoặc bất kỳ thông báo lỗi không mong muốn nào khác, thì chúng tôi cũng có thể chắc chắn rằng SQL Injection là có thể cho trang web đó. Sau đó, chúng tôi có thể cố gắng gửi mã SQL phức tạp hơn thông qua liên kết của trang web.

Để kiểm tra xem cuộc tấn công này có thể xảy ra thông qua liên kết của trang web hay không, mã như ‘ or 1=1;– cũng có thể được gửi.

`http://www.testing.com/books='or 1=1;-`

Là một người kiểm tra phần mềm có kinh nghiệm, tôi muốn nhắc nhở rằng không chỉ thông báo lỗi không mong muốn có thể được coi là một lỗ hổng SQL Injection. Nhiều người kiểm tra chỉ kiểm tra các cuộc tấn công có thể xảy ra theo các thông báo lỗi.

Tuy nhiên, cần nhớ rằng không có thông báo lỗi xác thực hoặc thông báo thành công cho mã độc hại cũng có thể là một dấu hiệu cho thấy cuộc tấn công này có thể xảy ra.

# 4. Kiểm tra bảo mật của các ứng dụng web chống lại SQL Injection

Kiểm tra bảo mật của các ứng dụng web được giải thích bằng các ví dụ đơn giản:

Vì hậu quả của việc cho phép kỹ thuật lỗ hổng này có thể nghiêm trọng, nên cuộc tấn công này cần được kiểm tra trong quá trình kiểm tra bảo mật của một ứng dụng. Bây giờ với tổng quan về kỹ thuật này, chúng ta hãy hiểu một vài ví dụ thực tế về SQL injection.

Quan trọng: Kiểm tra SQL Injection này chỉ nên được kiểm tra trong môi trường thử nghiệm.

Nếu ứng dụng có trang đăng nhập, có thể ứng dụng sử dụng SQL động chẳng hạn như câu lệnh bên dưới. Câu lệnh này được mong đợi sẽ trả về ít nhất một hàng với chi tiết người dùng từ bảng Người dùng như kết quả được đặt khi có một hàng với tên người dùng và mật khẩu được nhập trong câu lệnh SQL.

`SELECT * FROM Users WHERE User_Name = ‘” & strUserName & “‘ AND Password = ‘” & strPassword & “’;”`

Nếu người kiểm tra nhập John làm strUserName (trong hộp văn bản cho tên người dùng) và Smith làm strPassword (trong hộp văn bản cho mật khẩu), câu lệnh SQL trên sẽ trở thành:

`SELECT * FROM Users WHERE User_Name = 'John' AND Password = 'Smith’;`

Nếu người kiểm tra nhập John’– dưới dạng strUserName và không có strPassword, câu lệnh SQL sẽ trở thành:

`SELECT * FROM Users WHERE User_Name = 'John' -- AND Password = '';`

Lưu ý rằng một phần của câu lệnh SQL sau John được chuyển thành một comment. Nếu có bất kỳ người dùng nào có tên người dùng là John trong bảng Người dùng, ứng dụng có thể cho phép người thử nghiệm đăng nhập với tư cách là người dùng John. Người kiểm tra hiện có thể xem thông tin cá nhân của người dùng John.

Điều gì sẽ xảy ra nếu người kiểm tra không biết tên của bất kỳ người dùng hiện có nào của ứng dụng? Trong trường hợp như vậy, người kiểm tra có thể thử các tên người dùng phổ biến như admin, administrator và sysadmin. Nếu không có người dùng nào trong số này tồn tại trong cơ sở dữ liệu, người kiểm tra có thể nhập John ’hoặc‘ x ’=’ x dưới dạng strUserName và Smith ’or‘ x ’=’ x dưới dạng strPassword. Điều này sẽ làm cho câu lệnh SQL trở nên giống như bên dưới.

`SELECT * FROM Users WHERE User_Name = 'John' or 'x'='x' AND Password = 'Smith’ or ‘x’=’x’;`

Vì điều kiện ‘x’ = ’x’ luôn đúng, tập kết quả sẽ bao gồm tất cả các hàng trong bảng Người dùng. Ứng dụng có thể cho phép người thử nghiệm đăng nhập với tư cách là người dùng đầu tiên trong bảng Người dùng.

Quan trọng: Người kiểm tra nên yêu cầu người quản trị cơ sở dữ liệu hoặc nhà phát triển sao chép bảng được đề cập trước khi thực hiện các cuộc tấn công sau.

Nếu tester nhập John ’; DROP table users_details; ’- dưới dạng strUserName và bất kỳ thứ gì dưới dạng strPassword, câu lệnh SQL sẽ trở thành như bên dưới.

`SELECT * FROM Users WHERE User_Name = ‘John’; DROP table users_details;’ –‘ AND Password = 'Smith';`

Câu lệnh này có thể khiến bảng “users_details” bị xóa vĩnh viễn khỏi cơ sở dữ liệu.

Mặc dù các ví dụ trên chỉ xử lý việc sử dụng kỹ thuật SQL injection trên trang đăng nhập, nhưng người kiểm tra nên kiểm tra kỹ thuật này trên tất cả các trang của ứng dụng chấp nhận thông tin nhập của người dùng ở định dạng văn bản, ví dụ: trang tìm kiếm, trang phản hồi, v.v.

Việc chèn SQL có thể có trong các ứng dụng sử dụng SSL. Ngay cả tường lửa cũng không thể bảo vệ ứng dụng khỏi kỹ thuật này.

Tôi đã cố gắng giải thích kỹ thuật tấn công này dưới dạng đơn giản. Tôi muốn lặp lại cuộc tấn công này chỉ nên được thử nghiệm trong môi trường thử nghiệm chứ không phải trong môi trường phát triển, môi trường sản xuất hoặc bất kỳ môi trường nào khác.

Thay vì kiểm tra thủ công xem ứng dụng có dễ bị tấn công SQL hay không, người ta có thể sử dụng Trình quét lỗ hổng web để kiểm tra lỗ hổng này.

# 5. Các bộ phận dễ bị tổn thương của cuộc tấn công này

Trước khi bắt đầu quá trình thử nghiệm, mọi người thử nghiệm chân thành ít nhiều phải biết phần nào sẽ dễ bị tấn công nhất có thể xảy ra cuộc tấn công này.

Nó cũng là một thực tiễn tốt để lập kế hoạch lĩnh vực nào của hệ thống sẽ được kiểm tra chính xác và theo thứ tự nào. Trong sự nghiệp thử nghiệm của mình, tôi đã học được rằng không phải là ý kiến hay nếu thử nghiệm các trường chống lại các cuộc tấn công SQL một cách ngẫu nhiên vì một số trường có thể bị bỏ sót.

Khi cuộc tấn công này đang được thực hiện trong cơ sở dữ liệu, tất cả các bộ phận của hệ thống nhập dữ liệu, trường đầu vào và liên kết trang web đều dễ bị tấn công.

Các bộ phận dễ bị tổn thương bao gồm:

Trường đăng nhập
Tìm kiếm các lĩnh vực
Các trường nhận xét
Bất kỳ trường nhập và lưu dữ liệu nào khác
Các liên kết của trang web

Điều quan trọng cần lưu ý là trong khi thử nghiệm chống lại cuộc tấn công này, chỉ kiểm tra một hoặc một vài trường là không đủ. Một điều khá phổ biến là một trường có thể được bảo vệ khỏi SQL Injection, nhưng trường khác thì không. Do đó, điều quan trọng là đừng quên kiểm tra tất cả các trường của trang web.

# 6. Tự động kiểm tra SQL Injection

Vì một số hệ thống hoặc trang web đã được thử nghiệm có thể khá phức tạp và chứa dữ liệu nhạy cảm, việc kiểm tra theo cách thủ công có thể thực sự khó khăn và mất rất nhiều thời gian. Do đó, việc kiểm tra chống lại cuộc tấn công này bằng các công cụ đặc biệt đôi khi có thể thực sự hữu ích.

Một trong những công cụ SQL Injection như vậy là SOAP UI. Nếu chúng tôi đã kiểm tra hồi quy tự động ở cấp API, chúng tôi cũng có thể chuyển đổi kiểm tra chống lại cuộc tấn công này bằng cách sử dụng công cụ này. Trong công cụ SOAP UI, đã có sẵn các mẫu mã để kiểm tra chống lại cuộc tấn công này. Những mẫu đó cũng có thể được bổ sung bằng mã viết của riêng bạn.

Nó là một công cụ khá đáng tin cậy.

Tuy nhiên, một bài kiểm tra phải được tự động hóa ở cấp API, điều này không dễ dàng như vậy. Một cách khác có thể để kiểm tra tự động là sử dụng các plugin trình duyệt khác nhau.

Cần phải đề cập rằng, ngay cả khi các công cụ tự động tiết kiệm thời gian của bạn, chúng không phải lúc nào cũng được coi là rất đáng tin cậy. Nếu chúng tôi đang kiểm tra hệ thống ngân hàng hoặc bất kỳ trang web nào có dữ liệu rất nhạy cảm, chúng tôi rất nên kiểm tra theo cách thủ công. Nơi bạn có thể xem kết quả chính xác và phân tích chúng. Ngoài ra, trong trường hợp này, chúng tôi có thể chắc chắn rằng không có gì bị bỏ qua.

# 7. So sánh với các cuộc tấn công khác

SQL Injection có thể được coi là một trong những cuộc tấn công nghiêm trọng nhất, vì nó ảnh hưởng đến cơ sở dữ liệu và có thể gây thiệt hại nghiêm trọng cho dữ liệu của bạn và toàn bộ hệ thống.

Chắc chắn nó có thể gây ra hậu quả nghiêm trọng hơn so với Javascript Injection hoặc HTML Injection, vì cả hai đều được thực hiện ở phía máy khách. Để so sánh, với cuộc tấn công này, bạn có thể có quyền truy cập vào toàn bộ cơ sở dữ liệu.

Cần nhắc lại rằng, để kiểm tra chống lại cuộc tấn công này, bạn phải có kiến thức khá tốt về ngôn ngữ lập trình SQL và nói chung, bạn nên biết các truy vấn cơ sở dữ liệu đang hoạt động như thế nào. Ngoài ra, trong khi thực hiện cuộc tấn công tiêm này, bạn nên cẩn thận và quan sát hơn, vì bất kỳ sự thiếu chính xác nào cũng có thể để lại lỗ hổng SQL.

# Phần kết luận
Tôi hy vọng bạn sẽ có một ý tưởng rõ ràng về SQL Injection là gì và chúng ta nên ngăn chặn những cuộc tấn công này như thế nào.

Tuy nhiên, chúng tôi khuyên bạn nên kiểm tra chống lại kiểu tấn công này mỗi khi hệ thống hoặc trang web có cơ sở dữ liệu đang được kiểm tra. Bất kỳ lỗ hổng cơ sở dữ liệu hoặc hệ thống nào còn sót lại có thể làm mất uy tín của công ty và rất nhiều tài nguyên để khôi phục toàn bộ hệ thống.

Vì thử nghiệm chống lại sự tiêm nhiễm này giúp tìm ra các lỗ hổng bảo mật quan trọng nhất, bạn cũng nên đầu tư vào kiến thức và công cụ kiểm tra của mình.

Nếu Kiểm thử bảo mật được lên kế hoạch, thì kiểm tra chống lại SQL Injection nên được lập kế hoạch như một trong những phần kiểm tra đầu tiên.