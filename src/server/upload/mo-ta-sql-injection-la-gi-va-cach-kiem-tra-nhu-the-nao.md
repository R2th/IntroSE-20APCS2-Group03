Bài viết mô tả về sql injection và cách để kiểm tra ứng dụng web có bị lỗi sql injection hay không.

SQL injection được coi là một trong những cách tấn công phổ biến nhất vì nó có thể mang lại hậu quả nghiêm trọng và có hại cho hệ hệ thống và dữ liệu nhạy cảm của bạn

![Sql Injection](https://manhnv.com/images/posts/mo-ta-sql-injection-la-gi-va-cach-kiem-tra/sql-injection.jpg?raw=truev "SQL injection")

## SQL Injection là gì?

SQL injection là một kỹ thuật tấn công vào hệ thống cơ sở dữ liệu của ứng dụng (web, mobile hoặc desktop ...) thông qua việc kẻ tấn công lợi dụng lỗ hổng kiểm tra dữ liệu đầu vào và thi hành các câu lệnh SQL bất hợp pháp. Hậu quả của hành động này có thể đáng báo động.

Như chính tên của nó, mục đích của cuộc tấn công SQL injection là tiêm mã SQL bất hợp pháp, độc hại vào ứng dụng.

Trong các ứng dụng có dữ liệu này được chỉ định đi đến cơ sở dữ liệu như:

* Biểu mẫu (form) đăng nhập - người dùng nhập dữ liệu đăng nhập
* Biểu mẫu tìm kiếm - người dùng nhập dữ liệu tìm kiếm

Thay vì nhập dữ liệu chính xác, kẻ tấn cống sẽ nhập một câu lệnh truy vấn độc hại bất kỳ nào vào, thì có khả năng xảy ra một số thiệt hại nghiêm trọng đối với cơ sở dữ liệu và toàn bộ hệ thống.

SQL (Structured Query Language) được sử dụng để quản lý dữ liệu và lưu giữ trong cơ sở dữ liệu. Do đó, trong cuộc tấn công SQL injection này, câu lệnh của SQL được sử dụng như một mã độc hại.

Đây được coi là tấn công phổ biến nhất, vì cơ sở dữ liệu được sử dụng hầu hết cho tất cả các công nghệ.

## Hậu quả khi bị tấn công SQL injection

Mục đích chính của tấn công này là hack cơ sở dữ liệu của hệ thống, vì hầu hết hệ thống hiện nay đều có cơ sở dữ liệu để lưu thông tin. Do đó hậu quả của cuộc tấn công này thực sự rất lớn.

Những điều sau đây có thể là kết quả của tấn công SQL injection:

* Hack tài khoản của người khác.
* Ăn cắp và sao chép dữ liệu nhạy cảm của trang web hoặc hệ thống.
* Thay đổi dữ liệu của hệ thống, gây ra sai lệch dữ liệu.
* Hacker có thể đăng nhập với tư cách người dùng hợp pháp, ngay cả với tư cách quản trị viên.
* Hacker có thể xem thông tin cá nhân thuộc về người dùng khác, ví dụ: chi tiết về hồ sơ (profile) của người dùng khác, chi tiết về giao dịch của họ, v.v..
* Hacker có thể thay đổi thông tin cấu hình ứng dụng và dữ liệu của những người dùng khác.
* Hacker có thể sửa đổi cấu trúc cơ sở dữ liệu; thậm chí xóa các bảng trong cơ sở dữ liệu của ứng dụng.
* Hacker có thể kiểm soát máy chủ cơ sở dữ liệu và thực hiện các lệnh trên theo ý muốn.

Những hậu quả được liệt kê ở trên thực sự có thể coi là nghiêm trọng, vì việc khôi phục cơ sở dữ liệu có thể tốn rất nhiều chi phí. Nó có thể khiến công ty mất danh tiếng. Do đó, việc bảo vệ hệ thống trước loại tấn công này và coi thử nghiệm bảo mật là một điều cần thiết hàng đầu và là một khoản đầu tư tốt cho danh tiếng sản phẩm và công ty.

## Bản chất của tấn công SQL injection

Để kiểm tra, trước tiên bạn cần tìm các phần hệ thống dễ bị tổn thương (vulnerable) và sau đó thử gửi một đoạn mã SQL độc hại thông qua các ô nhập dữ liệu đầu vào. Nếu hệ thống có lỗi này thì mã SQL độc hại được tiêm vào sẽ được gửi tới truy vấn cơ sở dữ liệu trong ứng dụng và thực thi nó.

Bất kỳ vị trí nào có nhập dữ liệu đầu vào và có liên kết với cơ sở dữ liệu thì nên kiểm tra bằng cách: Thay vì nhập một dữ liệu chính xác tôi sẽ nhập bất kỳ một mã SQL độc hại nào và thấy hệ thống thực thi mã được nhập vào thì chính xác là đã gặp lỗi SQL injection.

Để thực hiện cuộc tấn công này, phải thay đổi hành động và mục đích của một truy vấn cơ sở dữ liệu thích hợp với từng hoàn cảnh. Một trong những phương pháp khả thi để thực hiện nó là làm cho truy vấn luôn luôn đúng và sau đó chèn mã độc. Thay đổi truy vấn thành luôn luôn đúng có thể được thực hiện bằng một mã đơn giản `' OR 1 = 1; --`

Người thực hiện kiểm tra nên ghi nhớ rằng trong khi kiểm tra xem việc đổi truy vấn thành luôn luôn đúng có thể được thực hiện hay không, thì nên thử các trích dẫn khác nhau - đơn và đôi. Dó đó , nếu đã thử một mã `' OR 1=1;--`, cũng nên thử với `" OR 1=1;--`

**Ví dụ:** Hãy giả sử rằng có một truy vấn, đó là tìm kiếm từ đã nhập trong bảng cơ sở dữ liệu:

```sql
select * from notes nt where nt.subject = ‘search_word‘;
```

Thay vì tìm từ tìm kiếm, hãy nhập truy vấn SQL injection `' OR 1=1;--`, thì truy vấn sẽ luôn luôn đúng. Và sẽ trở thành

```sql
select * from notes nt where nt.subject = ‘ ‘ or 1=1;--
```

Trong trường hợp này, tham số  `subject` của người dùng được đóng với `'` và sau đó chúng ra có mã `or 1=1`, điều này làm cho một truy vấn luôn luôn đúng. Với ký hiệu `--` sẽ `comment` phần còn lại của mã truy vấn sẽ, và phần mã phía sau sẽ không được thực thi. Đây là một trong những cách phổ biến nhất và dễ nhất để bắt đầu kiểm soát truy vấn.

**Một số mã khác cũng có thể được sử dụng để làm cho truy vấn luôn luôn đúng, như:**

* `‘ or ‘abc‘=‘abc‘;--`
* `‘ or ‘ ‘=‘ ‘;--`

Phần quan trọng nhất ở đây là sau khi có dấu phẩy, chúng ta có thể nhập bất kỳ mã độc nào, mà chúng ta muốn nó được thực thi.

**Ví dụ:** Nó có thể là `‘ or 1=1; drop table users; --`
Nếu câu lệnh tiêm trên được thực thi, thì bằng `users` trong cơ sở dữ liệu sẽ bị xóa.
Nếu việc câu lệnh trên có thể chạy thì bất kỳ mã độc nào khác cũng có thể được viết vào. Trogn trường hợp này phụ thuộc vào kiến thức và mục đích của kẻ tấn công.


## Cách đánh giá ứng dụng lỗi SQL injection

Kiểm tra lỗ hổng này có thể được thực hiện rất dễ dàng. Đôi khi nó chỉ cần nhập một dấu hiệu bất thường nào như `‘ or “`. Nếu nó trả về bất kỳ thông báo bất ngờ (unexpected) nào, thì chúng ta chắc chắn rằng trường hợp này là SQL injection.

**Ví dụ:**: Thông báo lỗi `Internal Server Error` trong kết quả trả về, có thể khẳng định rằng  lỗi SQL injection tồn tại này có thể xảy ra trong hệ thống.

**Các kết quả khác, có thể thông báo rằng có thể tấn công SQL injection:**

* Trả về một trang trống.
* Không có thông báo lỗi hoặc thành công - chức năng và trang không phản ứng với đầu vào.
* Thông báo thành công cho mã độc được nhập vào.

Hãy dựa vào trường hợp thực tế để đoán biết.

**Ví dụ:** Hãy kiểm tra xem cửa sổ đăng nhập có đễ bị tấn công đối với SQL injection không.
Trong trường hợp này, trường username và mật khẩu, chỉ cần nhập dấu `'` như ảnh bên dưới. 

![Sql Injection login](https://manhnv.com/images/posts/mo-ta-sql-injection-la-gi-va-cach-kiem-tra/login-sql-injection.png?raw=true "SQL injection login")

Nếu đầu vào trả về thông báo lỗi hoặc bất kỳ kết quả không phù hợp nào khác, thì có thể đoán chắc chắn rằng cuộc tấn công SQL injection có thể xảy ra. Thông báo lỗi giống với ảnh

![Thông báo lỗi](https://manhnv.com/images/posts/mo-ta-sql-injection-la-gi-va-cach-kiem-tra/notify-sql-injection-login.png?raw=true "Thông báo lỗi")

Kiểm tra `SQL injection` bằng một trích dẫn `'` là một cách đáng tin cậy để kiểm tra xem cuộc tấn công này có khả thi hay không.

Nếu trích dẫn đơn `'` không trả về bất kỳ kết quả không phù hợp nào, thì có thể thử nhập dấu nháy kép `"` và kiểm tra kết quả.

Ngoài ra, mã SQL để thay đổi truy vấn luôn luôn đúng `'OR 1=1;--` có thể được coi là một cách để kiểm tra xem cuộc tấn công này có khả thi hay không. Nó đóng tham số và thay đổi truy vấn thành `True`. Do đó, nếu không được xác thực, đầu vào như vậy cũng có thể trả về bất kỳ kết quả không mong muốn nào và thông báo tương tự, và khẳng định rằng cuộc tấn công SQL injection có thể xảy ra trong trường hợp này.

Kiểm tra các cuộc tấn công SQL có thể được thực hiện từ liên kết của trang web. Giả sử chúng tôi có một liên kết `http://35.190.155.168/cf5ef2940d/fetch?id=1` trả về nội dung của một file ảnh. Trong trường hợp này, `id` là tham số và `1` là giá trị của nó.

![Sql url](https://manhnv.com/images/posts/mo-ta-sql-injection-la-gi-va-cach-kiem-tra/sql-injection-url1.png?raw=true "SQL url")

Nếu trong liên kết, chúng tôi sẽ điền `'` thay vì `1` để kiểm tra.
Trong trường hợp này, nếu liên kết `http://35.190.155.168/cf5ef2940d/fetch?id='` trả về một thông báo lỗi `Internal Server Error` hoặc một trang trống hoặc bất kỳ thông báo lỗi không mong muốn nào khác, thì chắc chắn đây  là SQL injection. Có thể gửi mã SQL phức tạp hơn.

![Sql url](https://manhnv.com/images/posts/mo-ta-sql-injection-la-gi-va-cach-kiem-tra/sql-injection-url-error.png?raw=true "SQL url")

Không chỉ có thông báo lỗi không mong muốn mới có thể được coi là lỗ hổng SQL injejction. Nhiều người kiểm tra kiểm tra các cuộc tấn công có thể chỉ theo thông báo lỗi. Tuy nhiên, cần nhớ rằng, không có thông báo lỗi xác thực hoặc thông báo thành công nào cho mã cũng có thể là một dấu hiệu, rằng cuộc tấn công này khả thi.

## Tổng kết

* Qua bài viết mình đã giới thiệu về SQL injection, bản chất và cách kiểm tra một ứng dụng có lỗi SQL injection hay không.
* Từ đây có thể áp dụng để thực thi những câu lệnh SQL phức tạp hơn
*  Bài viết bạn có thể đọc thêm: https://manhnv.com/2019/05/mo-ta-sql-injection-la-gi-va-cach-kiem-tra/

**[Penetration Testing Web & Apps](https://viblo.asia/s/penetration-testing-web-apps-pmleBzPM5rd)**