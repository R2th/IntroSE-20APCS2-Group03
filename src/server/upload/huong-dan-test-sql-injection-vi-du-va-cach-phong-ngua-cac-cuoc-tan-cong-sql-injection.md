Ở bài post này, mình xin giới thiệu với các bạn các ví dụ về SQL Injection và các cách phòng tránh các cuộc tấn công SQL Injection khi test Web.

Trong khi test một website hoặc một hệ thống, mục đích của Tester là đảm bảo sản phẩm được bảo vệ càng nhiều càng tốt.

Security Testing thường được thực hiện cho mục đích này. Để thực hiện loại thử nghiệm này, đầu tiên, chúng ta cần xem xét, những cuộc tấn công nào có khả năng xảy ra nhất. Và SQL Injection là một trong các loại tấn công đó.

![](https://images.viblo.asia/ec0862ae-b4ed-4fbd-89ca-e8dfe92bf9cf.png)

SQL Injection là một trong những loại tấn công phổ biến nhất khi nó có thể mang lại nguy hiểm và gây hại cho hệ thống của bạn cũng như những dữ liệu nhạy cảm.

### SQL Injection là gì?

Một vài user truyền vào các câu lệnh SQL được thực hiện trên database. Nó khiến cho ứng dụng không thể xử lý dữ liệu do người dùng cung cấp không đúng cách.

Trong trường hợp này, **một user độc hại có thể cung cấp những đầu vào không mong muốn cho ứng dụng, sau đó dùng để đóng khung và thực hiện các câu lệnh SQL trên database. Nó gọi là SQL Injection**. Hậu quả của một hành động như vậy có thể đáng báo động.

Như tên của nó, mục đích của cuộc tấn công SQL Injection là tiêm những code SQL độc hại.

Mỗi một trường của website là một cánh cổng dẫn đến database. Trong form login, người dùng nhập các dữ liệu login. Trong trường search, người dùng nhập các từ search. Trong form lưu dữ liệu, người dùng nhập các dữ liệu có thể lưu trữ. Tất cả các dữ liệu được chỉ ra đều có thể dẫn đến database.

Thay vì nhập các dữ liệu đúng, bất kỳ một code độc hại nào được nhập vào, đều có thể dẫn đến một số thiệt hại nghiêm trọng cho database và cho cả hệ thống.

SQL Injection được thực hiện với ngôn ngữ lập trình SQL. SQL (Structured Query Language - ngôn ngữ truy vấn cấu trúc) được sử dụng để quản lý các dữ liệu được tổ chức trong database. Do đó mã ngôn ngữ lập trình này đang được sử dụng như một mũi tiêm độc hại.

Đây là một trong các cuộc tấn công phổ biến, vì database được sử dụng cho hầu hết tất cả các công nghệ.

**Nhiều ứng dụng sử dụng một vài loại database. Một ứng dụng đang được test có thể có giao diện người dùng chấp nhận đầu vào của người dùng để thực hiện các task sau:**

1. Hiển thị dữ liệu lưu trữ có liên quan đến user. Ví dụ: ứng dụng kiểm tra thông tin đăng nhập của user sử dụng các thông tin login được nhập vào bởi user và chỉ hiển thị những chức năng và dữ liệu có liên quan đến user.

2. Lưu trữ các dữ liệu được nhập bởi user vào database. Ví dụ: Mỗi khi user nhập dữ liệu vào form và submit, ứng dụng xử lý lưu dữ liệu vào database. Dữ liệu này sau đó sẽ được cung cấp cho user trong cùng một phiên hoặc các phiên tiếp theo.

### Rủi ro của SQL Injection

Ngày nay, database được sử dụng cho gần như tất cả các hệ thống và website, vì dữ liệu nên được lưu trữ ở nhiều nơi.

Khi dữ liệu nhạy cảm được lưu trữ trong database, có nhiều rủi ro hơn trong bảo mật hệ thống. Nếu bất kỳ dữ liệu website hoặc blog cá nhân bị đánh cắp, thì sẽ không gây thiệt hại nhiều như dữ liệu ngân hàng bị đánh cắp.

Mục đích chính của cuộc tấn công này là hack database của hệ thống, do đó hậu quả của nó thật sự nguy hại.

**Những điều sau đây có thể là kết quả của SQL Injection:**

* Hack tài khoản của người khác
* Ăn cắp và copy dữ liệu nhạy cảm của hệ thống
* Thay đổi các dữ liệu nhạy cảm của hệ thống
* Xóa dữ liệu nhạy cảm của hệ thống
* Hacker có thể login vào ứng dụng như user khác, thậm chí là admin
* Hacker có thể xem thông tin cá nhân của user khác. Ví dụ: thông tin chi tiết profile, chi tiết giao dịch,...
* Hacker có thể thay đổi thông tin cấu hình của ứng dụng và dữ liệu của các user khác
* Hacker có thể sửa cấu trúc database, thậm chí delete bảng trong database
* Hacker có thể điều khiển server database và thực hiện câu lệnh trên nó.

Những rủi ro đã liệt kê bên trên có thể thực sự nguy hiểm, vì để restore một database hoặc dữ liệu của nó mất rất nhiều chi phí. Nó có thể làm mất danh tiếng và tiền bạc của công ty bạn để khôi phục dữ liệu và hệ thống bị mất. Vì vậy, cần phải quan tâm cao đến việc bảo vệ hệ thống khỏi các cuộc tấn công, và Security testing là giải pháp tốt cho uy tín sản phẩm và công ty bạn.

Là một tester, tôi muốn comment rằng test để chống lại các cuộc tấn công có thể là phương pháp tốt nhất dù Security Testing không được lên kế hoạch. Bằng cách này, bạn có thể bảo vệ và test sản phẩm chống lại các trường hợp không mong đợi và những người dùng độc hại.

### Bản chất của cuộc tấn công này

Như đã đề cập phía trên, bản chất của cuộc tấn công này là hack database với mục đích độc hại.

Để thực hiện Security Testing, ban đầu, bạn cần tìm những lỗ hổng của hệ thống và sau đó thông qua chúng gửi những mã SQL độc hại đến database. Nếu có thể thực hiện được, thì những mã SQL độc hại này sẽ được gửi và các hành động gây hại sẽ có thể thực hiện trong database.

Mỗi một trường của một website tương tự như một cánh cổng dẫn vào database. Bất kỳ dữ liệu hoặc đầu vào mà chúng ta thường nhập vào bất kỳ trường nào của hệ thống hoặc trang web đều đi đến database. Do đó, thay vì nhập dữ liệu đúng, nếu chũng ta nhập bất kỳ mã code độc hại nào, nó đều có thể thực hiện câu lệnh truy vấn database và mang lại hậu quả nghiêm trọng.

### Tool được đề xuất

**### 1. Kiuwan**

![](https://images.viblo.asia/f1ac0fc0-690d-4df1-89e0-5ab20951a17a.png)

Dễ dàng tìm kiếm và fix các lỗ hổng như SQL Injection trong code của bạn ở mỗi giai đoạn của SDLC (Software Development Life Cycle - Vòng đời phát triển phần mềm). Kiuwan tuân thủ các tiêu chuẩn bảo mật nghiêm ngặt nhất, bao gồm OWASP, CWE, SANS 25, HIPPA, ....

Tích hợp Kiuwan vào trong IDE để cho phản hồi tức thì trong khi phát triển. Kiuwan hỗ trợ tất ả các ngôn ngữ lập trình chính và tích hợp với các công cụ DevOps hàng đầu.

Để thực hiện cuộc tấn công này, chúng ta phải thay đổi hành động và mục đích của các truy vấn database thích hợp. Một trong các phương thức có thể để thực hiện là làm cho các truy vấn luôn đúng, rồi sau đó chèn vào các mã độc hại. Thay đổi truy vấn database thành luôn đúng có thể được thực hiện với mã code đơn giản như [‘ or 1=1;–].

![](https://images.viblo.asia/17c9030d-98b2-4f37-8977-5a4123b1d238.jpg)

Tester cần ghi nhớ rằng, việc check thay đổi truy vấn thành luôn đúng có thể được thực hiện hoặc không, các trích dẫn khác nhau nên được thử với single và double. Do đó, nếu chúng ta thử với mã single [‘ or 1=1;–] , thì chúng ta cũng nên thử với mã double [“ or 1=1;–].

**Ví dụ**: Cùng xem xét câu truy vấn dưới đây

***select  from notes nt where nt.subject = ‘searchword‘;***

Thay cho từ khóa tìm kiếm, chúng ta nhập truy vấn SQL Injection [‘ or 1=1;–], sau đó câu truy vấn sẽ trở thành luôn đúng.

***select  from notes nt where nt.subject = ‘ ‘ or 1=1;–***

Trong trường hợp này, parameter "subject" bị đóng lại với trích dẫn và sau đó chúng ta có code [or 1=1], cái mà sẽ không được thực hiện. Đây là một trong những cách phổ biến nhất và dễ dàng nhất để bắt đầu điều khiển truy vấn.

**Một vài code khác có thể sử dụng để làm cho truy vấn luôn đúng, như sau:**

* ‘ or ‘abc‘=‘abc‘;–
* ‘ or ‘ ‘=‘ ‘;–

Phần quan trọng nhất ở đây là sau đó chúng ta có thể nhập bất kỳ mã độc hại nào mà chúng ta mong muốn thực hiện.

**Ví dụ**: 

![](https://images.viblo.asia/ce39c9f6-d670-4a77-8335-781b667e06c4.jpg)

Nếu injection này là có thể, thì sau đó chúng ta có thể viết bất kỳ mã độc hại nào. Trong trường hợp này, nó sẽ chỉ phụ thuộc vào kiến thức và ý muốn của người dùng độc hại. Làm thế nào để check SQL Injection?

Việc kiểm tra lỗ hổng này có thể được thực hiện rất dễ dàng. Thỉnh thoảng chỉ cần gõ [‘ or “] vào trường kiểm tra. Nếu nó trả ra bất kỳ thông báo không mong muốn hoặc bất thường nào, chúng ta có thể chắc chắn rằng SQL Injection có thể thực hiện với trường đó.

**Ví dụ**: Nếu hiển thị message "Internal Server Error" như một kết quả tìm kiếm, chúng ta có thể chắc chắn rằng có thể tấn công vào phần này của hệ thống.

Một số kết quả khác cho biết có thể thực hiện cuộc tấn công SQL Injection:

* Hiển thị page trắng
* Không có message lỗi hay thành công - chức năng và page không phản ứng với đầu vào
* Message thành công cho mã độc hại

Hãy cùng xem xét cách hoạt động thực tế.

**Ví dụ**: Cùng test xem cửa sổ login có phải là lỗ hổng của SQL Injection không. 

Để thực hiện mục đích này, trong trường email và password, chúng ta nhập như sau:

![](https://images.viblo.asia/9f73e908-0acd-4755-861c-4a2491f45c3b.jpg)

Nếu kết quả trả ra là message lỗi ‘Internal Server Error‘ hoặc bất kỳ kết quả không phù hợp được liệt kê khác, chúng ta có thể chắc chắn rằng, có thể tấn công vào trường đó.

![](https://images.viblo.asia/a8ec443b-8814-4dc1-b2f5-6da62119b2c8.jpg)

Do đó, check SQL Injection với trích dẫn single ['] là cách khá đáng tin cậy để kiểm tra xem cuộc tấn công có thể thực hiện hay không.

Nếu single quote không trả ra kết quả không thích hợp, chúng ta có thể thử nhập double quote và check kết quả

![](https://images.viblo.asia/2b4f7d84-bc95-4ebd-81e0-26f82515bb30.jpg)

Ngoài ra, code SQL để thay đổi truy vấn thành luôn đúng cũng là một cách đeẻ check xem cuộc tấn công có thể hay không. Nó đóng tham số và thay đổi truy vấn thành "true". Do đó nếu không được xác thực, mỗi đầu vào như thế cũng có thể trả ra bất kỳ kết quả không mong đợi tương tự, và cuộc tấn công là có thể trong trường hợp này.

![](https://images.viblo.asia/7f5d161c-7c19-43eb-a6fa-6e44ee2b3257.jpg)

Việc check các cuộc tấn công SQL cũng có thể được thực hiện từ đường dẫn website. Giả sử chúng ta có đường dẫn là: http://www.testing.com/books=1. Trong trường hợp này, "books" là tham số và "1" là giá trị. Nếu chúng ta thay [1] bằng ['] thì chúng ta có thể check được injection có thể hay không.

Do đó, link http://www.testing.com/books= sẽ được check xem SQL attack có khả thi cho trang web http://www.testing.com hay không

![](https://images.viblo.asia/353f5424-eefa-46d7-8628-2d952c7b44f9.jpg)

Trong case này, nếu http://www.testing.com/books= trả ra message lỗi như ‘Internal Server Error‘ hoặc trang trắng, hoặc bất kỳ message lỗi không mong muốn nào, thì chúng ta có thể chắc chắn rằng SQL Injection là có thể. Sau đó, chúng ta có thể thử gửi nhiều mã SQL phức tạp qua đường dẫn website này.

Để check xem cuộc tấn công là có thể thông qua đường dẫn website hay không, mã như [‘ or 1=1;–] có thể được sử dụng.

![](https://images.viblo.asia/3c00bbaa-631a-42f1-8e1b-ef6bc5ac0462.jpg)

Là một tester có kinh nghiệm, tôi muốn nhắc nhở rằng không chỉ có thông báo lỗi không mong muốn có thể được coi là lỗ hổng SQL Injection. Nhiều tester kiểm tra các cuộc tấn công có thể chỉ theo thông báo lỗi.

Tuy nhiên, nên ghi nhớ rằng không có thông báo lỗi xác thực hoặc thông báo thành công cho mã độc cũng có thể là một dấu hiệu, rằng cuộc tấn công này là có thể.

### Security Testing Web Application chống lại SQL Injection

Security Testing một ứng dụng web được giải thích với ví dụ đơn giản sau:

Vì hậu quả của việc cho phép kỹ thuật lỗ hổng này có thể nghiêm trọng, cuộc tấn công này nên được thực hiện trong suốt quá trình test bảo mật của ứng dụng. Bây giờ với một cái nhìn tổng quan về kỹ thuật này, chúng ta hãy hiểu một vài ví dụ thực tế về SQL Injection.

**Lưu ý quan trọng: SQL Injection Test chỉ được thực hiện trong môi trường test**

Nếu ứng dụng có page login, có thể ứng dụng đang sử dụng câu lệnh SQL động như dưới đây. Câu lệnh này dự kiến sẽ trả về ít nhất một single row với chi tiết user từ bảng Users khi có hàng chứa username và password được nhập trong câu lệnh SQL.

*SELECT * FROM Users WHERE UserName = ‘” & strUserName & “‘ AND Password = ‘” & strPassword & “’;”*

Nếu tester muốn nhập "John" là strUsername (trong textbox username) và "Smith" là strPassword (trong textbox Password), câu lệnh bên trên sẽ trở thành:

*SELECT  FROM Users WHERE UserName = 'John' AND Password = 'Smith’;*

Nếu tester muốn nhập "John" là strUsername (trong textbox username) và không có strPassword, câu lệnh bên trên sẽ trở thành:

*SELECT  FROM Users WHERE UserName = 'John'~~-- AND Password = 'Smith’~~;*

Lưu ý rằng 1 phần câu lệnh SQL sau John chuyển thành một nhận xét. Nếu có bất kỳ user nào có username là John trong bảng Users, ứng dụng có thể cho phép tester login như user John. Tester có thể xem thông tin chi tiết của John.

Nếu tester hông biết tên của bất kỳ user nào trong ứng dụng thì làm gì? Trong trường hợp này, tester có thể thử với những username chung như admin, administrator, và sysadmin. Nếu không có user nào tồn tại trong database, tester có thể nhập [John' or 'x'='x] như strUsername và [Smith’ or ‘x’=’x] như strPassword. Câu lệnh SQL sẽ trở thành như sau:

*SELECT  FROM Users WHERE UserName = 'John' or 'x'='x' AND Password = 'Smith’ or ‘x’=’x’;*

Vì điều kiện ‘x’=’x’ luôn đúng, nên kết quả sẽ trả về toàn bộ các row của bảng Users. Từ đó, tester có thể login như người dùng đầu tiên trong bảng Users.

**Quan trọng**: Tester cần yêu cầu quản trị database hoặc developer copy bảng trong câu hỏi trước khi thử các cuộc tấn công sau.

Nếu tester nhập [John’; DROP table users_details;’—] như strUsername và bất kỳ cái gì làm strPassword, câu lệnh SQL sẽ trở thành như sau:

*SELECT  FROM Users WHERE UserName = ‘John’; DROP table usersdetails;’ –‘ AND Password = 'Smith';*

Câu lệnh này có thể khiến cho bảng "users_details" bị xóa vĩnh viễn khỏi database.

Các ví dụ trên sử dụng kỹ thuật SQL Injection chỉ với trang login, tester nên sử dụng kỹ thuật test này cho tất cả các page khác của ứng dụng như: search, feedback, ...

SQL injection có thể dùng với ứng dụng sử dụng SSL. Thậm chí tường lửa cũng có thể không có khả năng bảo vệ ứng dụng chống lại kỹ thuật này.

Tôi muốn nhắc nhở một lần nữa rằng kỹ thuật tấn công này chỉ test trên môi trường test, không dùng trong môi trường development, production hay bất kỳ một môi trường nào khác.

### Các phần dễ bị tấn công khi thực hiện cuộc tấn công này

Trước khi thực hiện quy trình test, mỗi tester nên ít nhiều biết những phần nào dễ bị tấn công nhất đối với cuộc tấn công này.

Nó cũng là cách tốt để lên kế hoạch test những trường nào của hệ thống một cách chính xác và theo thứ tự nào. Tôi đã học được, không nên kiểm tra ngẫu nhiên một số trường để chống lại các cuộc tấn công SQL vì một số trường có thể bị bỏ sót. Vì cuộc tấn công được thực hiện trong database, nên tất cả các phần hệ thống nhập liệu, các trường input, và đường dẫn website đều có thể bị tấn công.

Các phần dễ bị tấn công bao gồm:

* Các trường login
* Các trường tìm kiếm
* Các trường comment
* Bất kỳ trường nhập liệu và lưu trữ khác
* Website link

Quan trọng cần ghi nhớ rằng trong khi test chống lại cuộc tấn công này, không thể chỉ check một hoặc vài trường. Thông thường, một vài trường được bảo vệ khỏi tấn công SQL injection, nhưng các trường khác lại không được bảo vệ. Do đó, không được quên việc test toàn bộ các trường của website.

### Test tự động SQL Injection

Vì một số hệ thống hoặc website được test khá phức tạp và có chứa dữ liệu nhạy cảm, nên test thủ công có thể khó khăn và mất nhiều thời gian. Do đó, test để phòng tránh cuộc tấn công SQL Injection bằng các tool đặc biệt có thể thực sự hữu ích.

Một trong các tool SQL Injection là SOAP UI. Nếu bạn thực hiện test hồi quy tự động ở mức độ API, bạn cũng có thể sử dụng tool này để chống lại cuộc tấn công SQL. Trong tool SOAP UI, có sẵn các template có thể sử dụng để test chống lại cuộc tấn công này. Các template đó cũng có thể được bổ sung bằng code của bạn.

Đây là một tool khá tin cậy.

Tuy nhiên, test tự động ở mức độ API là không dễ dàng. Do đó, có một cách khác đó là sử dụng các plugin trình duyệt khác nhau để test tự động.

Cần lưu ý rằng, tool tự động có thể tiết kiệm thời gian, nhưng không phải luôn luôn đáng tin cậy. Nếu bạn test hệ thống ngân hàng hoặc một website với dữ liệu nhạy cảm, tốt nhất nên sử dụng test manual. Nơi bạn có thể xem kết quả chính xác và phân tích chúng. Ngoài ra, trong trường hợp này, chúng tôi có thể chắc chắn rằng, không có gì bị bỏ qua.

### So sánh với các cuộc tấn công khác

SQL Injection có thể coi là một trong các cuộc tấn công nguy hiểm nhất, vì nó ảnh hưởng đến database và có thể phá hủy nghiêm trọng dữ liệu cũng như toàn bộ hệ thống của bạn.

Để chắc chắn nó hậu quả nghiêm trọng hơn Javascript Injection hay HTML Injection, chúng ta cùng thực hiện tất cả trên client-side.  Để so sánh, với cuộc tấn công này, bạn có quyền truy cập vào toàn bộ cơ sở dữ liệu.

Để test chống lại cuộc tấn công này, bạn phải có kiến thức khá tốt về ngôn ngữ lập trình SQL. Và nói chung, bạn cần biết cách hoạt động của các truy vấn database. Ngoài ra, trong khi thực hiện cuộc tấn công này, bạn cần cẩn thận và quan sát nhiều hơn, vì bất kỳ sự không chính xác nào cũng có thể được để lại dưới dạng lỗ hổng SQL.

Tham khảo: https://www.softwaretestinghelp.com/sql-injection-how-to-test-application-for-sql-injection-attacks/