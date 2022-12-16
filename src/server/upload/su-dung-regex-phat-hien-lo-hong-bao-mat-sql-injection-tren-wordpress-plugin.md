# Kỹ thuật phân tích source code tĩnh
Phân tích mã tĩnh (còn được gọi là Phân tích mã nguồn) thường được thực hiện như một phần của công việc kiểm thử xâm nhập phần mềm. Bước phân tích source code này sẽ được thực hiện ở giai đoạn triển khai trong vòng đời phát triển bảo mật (SDL). Đây là phương pháp tìm lỗ hổng bảo mật phần mềm không thông qua việc chạy phần mềm (phân tích động). Để phân tích source code tĩnh, ta thường sử dụng kết hợp 2 phương pháp:

* Phân tích bằng tay:
Thực hiện đọc và review source code thủ công để tìm ra lỗ hổng bảo mật. Việc này thực hiện thông qua việc đọc và kiểm tra các điểm đầu vào nguy hiểm tồn tại trong tài liệu thiết kế, mô tả chức năng hay các dòng code của ứng dụng
* Phân tích bằng công cụ:
Phân tích source code tĩnh thường đề cập đến việc chạy các công cụ phân tích code tĩnh để cố gắng tìm ra các "điểm yếu bảo mật" tồn tại trong phần mềm bằng cách sử dụng các kỹ thuật như Taint Analysis and Data Flow Analysis. Lý tưởng nhất là các công cụ như vậy sẽ tự động tìm ra các lỗ hổng bảo mật với mức độ tin cậy cao. Tuy nhiên, điều này nằm ngoài tình trạng hiện đại đối với nhiều loại lỗi bảo mật ứng dụng. Do đó, các công cụ như vậy thường đóng vai trò là công cụ hỗ trợ cho một nhà phân tích để giúp họ khai thác các phần mã liên quan đến bảo mật để họ có thể tìm ra các sai sót hiệu quả hơn, thay vì một công cụ chỉ đơn giản là tự động tìm ra các lỗ hổng.

![](https://images.viblo.asia/2978a648-6c8e-4d5a-b2cf-df029eb7032d.png)


## Lợi ích phân tích source code tĩnh
* Kỹ thuật kiểm thử tĩnh có thế bắt đầu sớm trong vòng đời phát triển phần mềm, do đó có thể phát hiện lỗi ở giai đoạn sớm.
* Với việc phát hiện lỗi sớm, chi phí cho việc sửa chữa lỗi sẽ giảm.
* Do chi phí bỏ ra cho các việc sửa chữa, làm lại giảm nên năng xuất phát triển sản phẩm cũng tăng lên.
* Kiểm thử tĩnh giúp nâng cao nhận thức các vấn đề về chất lượng sản phẩm
* Tóm lại, phương pháp kiểm thử tĩnh là phương pháp rất phù hợp cho việc nâng cao chất lượng của sản phẩm phần mềm

Bài viết dưới đây sẽ sử dụng phương pháp phân tích bằng tay để tìm ra lỗi SQL Injection trong Wordpress Plugins thông qua kỹ thuật sử dụng regex để tìm ra những đoạn code có nguy cơ có lỗ hổng bảo mật SQLi.
# Giới thiệu về WordPress Plugin
Plugin là một phần của phần mềm có chứa một nhóm các chức năng có thể được thêm vào trang web WordPress. Họ có thể mở rộng chức năng hoặc thêm các tính năng mới vào các trang web WordPress của bạn. Các plugin WordPress được viết bằng ngôn ngữ lập trình PHP và tích hợp hoàn toàn với WordPress. Trong cộng đồng WordPress, có một câu nói thể hiện rõ nhất vai trò của plugin đó là: “có một plugin cho chức năng đó”. Chúng giúp người dùng dễ dàng thêm các tính năng vào trang web của họ mà không cần biết một dòng code nào

Có hàng ngàn plugin WordPress miễn phí tại thư mục plugin chính thức của WordPress. Tại WPBeginner, chúng tôi viết về tất cả các plugin WordPress tốt nhất. Chúng tôi thậm chí đã chia sẻ danh sách tất cả các plugin mà chúng tôi sử dụng.

Ngoài các plugin miễn phí, có rất nhiều plugin thương mại tuyệt vời có sẵn từ các công ty và nhà phát triển bên thứ ba. Vì là phần mềm nên nó vẫn tiềm ẩn những nguy cơ về lỗ hổng bảo mật như: SQL Injection, Cross Site Scripting (XSS), Cross-Site Request Forgery (CSRF) ...
# Phân tích source code 
SQL injection – còn được gọi là SQLi – sử dụng những lỗ hổng trong các kênh đầu vào (input) của website để nhắm mục tiêu vào cơ sở dữ liệu nằm trong phần phụ trợ của ứng dụng web, nơi lưu giữ những thông tin nhạy cảm và có giá trị nhất. Chúng có thể được kẻ tấn công sử dụng để ăn cắp hoặc xáo trộn dữ liệu, cản trở sự hoạt động của các ứng dụng, và, trong trường hợp xấu nhất, nó có thể chiếm được quyền truy cập quản trị vào máy chủ cơ sở dữ liệu. Dưới đây là những gì bạn cần biết về tấn công SQL Injection và cách bảo vệ website của bạn khỏi chúng.

SQL Injection xảy ra khi đầu vào của người dùng không được lọc các ký tự thoát và sau đó được chuyển vào một câu lệnh SQL. Điều này dẫn đến việc người dùng cuối của ứng dụng có thể thao túng các câu lệnh được thực hiện trên cơ sở dữ liệu.
Câu lệnh SQL được xây dựng bằng cách thực hiện "nối chuỗi" trước khi nó được truyền cho hàm để thực thi câu lệnh SQL. Nó sẽ rất nguy hiểm khi dữ liệu người dùng nhập và không qua xử lý mà được truyền trực tiếp vào câu truy vấn SQL thông qua việc nối chuỗi.

Ví dụ về lỗ hổng thông qua việc sử dụng nối chuỗi trong câu truy vấn SQL:

```php
// The user we want to find.
String email = $_REQUEST[ 'email' ]
Connection conn = DriverManager.getConnection(URL, USER, PASS);
Statement stmt = conn.createStatement();
String sql = "SELECT * FROM users WHERE email = '" + email + "'";
ResultSet results = stmt.executeQuery(sql);
 
while (results.next()) {
  // ...oh look, we got hacked.
}
```

Trong ví dụ này, biến `email` được nhận trực tiếp từ request của người dùng. Biến này sau đó được truyền vào thông qua việc nối chuỗi: `“email = '" + email + "'";”`

Điều này gây ra lỗi SQL Injection khi câu truy vấn trên được thực thi.

Tiếp theo, chúng ra sẽ dụng regex để tìm ra các đoạn code lỗi tương tự có trong các Wordpress Plugins:

**`(?<!prepare)\(('|")SELECT.+FROM.+('|").*\..*`**

Regex này sẽ tìm tất cả truy vấn SELECT trong Plugin mà không sử dụng prepare. Vì hàm prepare() là một hàm thư viện trong WordPress được sử dụng để bảo vệ các truy vấn chống lại các cuộc tấn công SQL Injection. Ví dụ: 
`wpdb::prepare( string $query, mixed $args )`

Ở đây mình sử dụng VSCode để grep:
![](https://images.viblo.asia/75308470-18e3-4802-979a-c3cf31e3eed3.png)


# Một số kết quả thực tế
Sử dụng regex **`(?<!prepare)\(('|")SELECT.+FROM.+('|").*\..*`** để tìm lỗi:
## 1. Official MailerLite Sign Up Forms < 1.4.4 - Unauthenticated SQL Injection
**Đoạn code lỗi:**

File: mailerlite-admin.php

```mailerlite-admin.php
$form = $wpdb->get_row(
			"SELECT * FROM " . $wpdb->base_prefix
			. "mailerlite_forms WHERE id = " . $_POST['form_id']
		);
```

**Proof of Concept**
Tham số  "form_id" có nguy cơ bị dính lỗi SQL Injeciton.

`$_POST['form_id']` được sử dụng trực tiếp trong câu truy vấn SQL thông qua nối chuỗi. Điều này gây ra lỗi SQL Injection

**Reference**
https://wpvulndb.com/vulnerabilities/10235

## 2. SQL injection in the AdRotate 5.8.3.1 for WordPress exists via param "id"
**Đoạn code lỗi:**

```adrotate.php
if(isset($_GET['id'])) $id = esc_attr($_GET['id']);
```

Tham số bị lỗi ` $_GET['id'] ` nhận input trực tiếp từ người dùng.
Sau đó, tham số này được truyền trực tiếp và câu truy vấn SQL bên dưới và gây ra lỗi:

```adrotate-statistics.php
$stats = $wpdb->get_results("SELECT * FROM '{$wpdb->prefix}adrotate_stats' WHERE 'ad' = {$id} ORDER BY 'id' ASC;");
```

**Proof of Concept:**

Param `"id"` is vulneable to SQL Injeciton.

**Example:**

Sử dụng boolean-base để khai thác thông tin database.

`http://example.com/wp-admin/admin.php?page=adrotate-statistics&view=group&id=2+AND+1%3D(SELECT+IF+(+GREATEST(+ORD(MID(%40%40version%2C+1%2C+1))%2C+1)+%3D+53%2C+1%2C+0))`

Câu truy vấn kiểm tra phiên bản của MySQL có phải là "5" hay không.

# Một số lỗ hổng khác khai thác bởi Sun* Cyber Security Team

* Blog2Social: Social Media Auto Post & Scheduler < 6.3.1 - Authenticated SQL Injection:

    https://wpvulndb.com/vulnerabilities/10260

* Form Maker by 10Web < 1.13.36 - Authenticated SQL Injection:

    https://wpvulndb.com/vulnerabilities/10237

* Photo Gallery by 10Web < 1.5.55 - Unauthenticated SQL Injection:

    https://wpvulndb.com/vulnerabilities/10227
# Kết luận
Đây là một phương pháp phân tích source code tĩnh thủ công tuy còn nhiều hạn chế do việc đọc code thủ công mất nhiều thời gian, số lượng code cần review rất lớn. Tuy nhiên, theo đánh giá ban đầu, đây là phương pháp tiếp cận khá hiệu quả và đem lại hiệu suất cao. Việc khoanh vùng được các điểm lỗi giúp việc tìm lỗi đơn giản và tập trung đúng mục tiêu (Vì có hàng ngàn WordPress khác nhau). Đây chỉ là một số ít phương pháp được sử dụng để tìm lỗi, chúng ta cần kết hợp phương pháp phân tích động để thực hiện kiểm tra và khai thác lỗi giúp đạt kết quả cao nhất.

Sắp tới, team Sun* Cyber Security dự định sẽ ra đời công cụ phân tích source code tĩnh để tăng năng suất trong việc tìm lỗi cũng như giúp giảm thiểu các công việc thực hiện bằng tay.

# Tham chiếu
Bài viết được tham khảo và xây dựng dựa trên 1 paper của team được puclic trên exploit-db (Website public các mã khai thác lỗ hồng). Bài viết gốc tại: https://www.exploit-db.com/docs/48583