## Mở đầu
Anh em theo cái nghề dev này, có lẽ một nửa là do mê game, nửa còn lại là do các ảnh "hắc cơ" trên phim lừa gạt :joy:, còn một nhóm nhỏ yêu ngành yêu nghề tôi không nói. Thực ra thì mấy anh hắc cơ trên phim cũng được một nửa là thật, đó là khoản công an các kiểu đuổi bắt, còn về phần múa phím điên cuồng rồi hô "Access granted!" thì méo có đâu.

Còn nếu vẫn không tin và muốn giống vậy thì tôi nghĩ bạn có thể thử qua Bollywood, bạn sẽ được đào tạo bài bản bắt đầu với hack cơ sở dữ liệu của cảnh sát với window media player trên nền nhạc vô cùng kích thích :v

Hollywod cũng là một lựa chọn nếu bạn muốn hack ngân hàng trong 5' trong khi có một khẩu súng dí vào đầu vào một cái máy hút bụi đang chạy dưới háng =))

Cũng nói thêm là tôi không chuyên về bảo mật, nhưng điều này tôi được học từ một đàn anh trong một buổi chia sẽ, các ý kiến tôi cũng cố gắng hết sức để tra tài liệu và tìm hiểu trước khi chia sẻ nhưng có thể vẫn còn những sai sót. Hơn nữa, đây cũng chỉ là bản sơ lược tôi tổng quát nhanh, thông tin chỉ là tóm lược lại và thiếu sót là điều chắc chắn. Mong ae có gạch đá thì cũng xin nhẹ tay. 

## Part 1
Vì, dù là cơ bản thì cũng có khá nhiều kĩ thuật hack, nên tôi sẽ chia ra làm vài phần để viết cho bài không quá dài, mỗi phần sẽ có tầm 5-6 cái, ngắn quá thì thêm sau. Và cũng như tôi nói trên, tôi không chuyên về bảo mật, nên việc chọn cái loại hack để giới thiệu trong bài có thể khá là lung tung, nếu có góp ý thì vui lòng bình luận ở dưới, tôi sẽ sửa lại cho phù hợp

### SQL Injection

Định nghĩa thì nó là một lỗi bảo mật cho phép kẻ tấn công chèn thêm các mã sql vào câu lệnh truy vấn. Để đơn giản thì tôi sẽ làm một ví dụ đơn giản sau.

Giả dụ bạn có một khung đăng nhập, yêu cầu nhập vào `username` và `password` sau đó bạn sẽ truy vấn để đăng nhập giống vậy

```sql
SELECT *
  FROM users
 WHERE user = 'username'
   AND pass  = 'password' LIMIT 1
```

Nhưng  nếu bạn bị lỗi này, họ sẽ nhập password thành vậy `' or 1=1--` và câu truy vấn của bạn sẽ bị sửa lại thành

```sql
SELECT *
  FROM users
 WHERE email = 'user@email.com'
   AND pass  = '' or 1=1--' LIMIT 1
```

Và bùm, họ đăng nhập mà chả cần tới password, mọi thông tin người dùng lộ hết luôn, mà rồi vào tay ông nào quá đáng thì chỉ cần sửa thêm chút là bạn bay luôn cả cái table users, hay bị cài mã độc luôn ấy chứ.

Lỗi này giờ cũng ít bị rồi vì là các framework đều đã hỗ trợ truy vấn nên việc chèn code vào gần như là không thể.

####  Phòng chống
##### 1. Tham số hóa query
Thay vì truyền trực tiếp giá trị vào query như vậy

```php
$email = "user@email.com";

$sql = "SELECT * FROM users WHERE email = '" + email + "'";
```

Thì bạn nên dùng các method để tham số hóa câu lệnh như

```php
$statement = $dbh->prepare("select * from users where email = ?");
$statement->execute(array(email));
```

##### 2. ORM
Cơ chế hỗ trợ truy vấn thay cho viết SQL thuần như trên, nếu đã dùng laravel thì bạn chả lạ gì mấy cái `->first()` hay `->where(user, 'username')` gì gì kiểu thế nữa nhỉ =))

##### 3. Escaping/Sanitizing Inputs
Lọc kĩ đầu vào, loại bỏ các kí tự đặc biệt hoặc các thành phần nguy hiểm có thể gây ra, các đơn giản là là whitelist, thay vì chặn từ cái, thì bạn chặn hết rồi tại whitelist chọn nhưng cái cho phép nhập, vậy ngon :thumbsup:

### Cross-site scripting (XSS)
Cross tiếng anh nghĩa là dấu X, chắc vậy lên Cross Site Scripting không viết là CSS mà viết tắt là XSS =)))

XSS là việc hacker chèn mã độc để thực hiện thi ở clien, VD đơn giản là một ông gửi `<script>alert('Hello')</script>` qua kênh chat, ai mở mở kênh chat đó lên thì sẽ bị bật một alert hiện chữ Hello.

![](https://images.viblo.asia/4a6efc6b-526d-4a90-9ec9-84a07d2e182c.png)


Việc này có thể dẫn đến việc bị ăn cắp dư liệu được lưu ở trình duyệt như mật khẩu đã lưu, cookie,... hay bị ép điều hướng tới các trang web đọc hại như x*xx, *video,... hoặc nếu như viblo có lỗi này, tôi có thể viết một đoạn code để khi ai vào đọc bài là auto upvote chẳng hạn, ez keycap =))

####  Phòng chống
##### 1. Escape Dynamic Content
Cơ bản thì là encode các kí tự đặc biệt, không cần phải encode toàn bộ nội dung
##### 2. Whitelist Values
Giống như lỗi ở trên thay vì chọn từ cái để cấm, thì bạn cứ cấm hết rồi chọn từng để cho phép, vậy sẽ yên tâm hơn

### Command Execution
Lỗi này tương tự với SQL Injection và XSS ở trên, nhưng thay vì tác động tới Database hay clien, nó tác động đến các lệnh excuse trên server, thường là linux

![](https://images.viblo.asia/7fca5536-fbd9-4b49-88d4-eb23d2c10467.png)

Như các bạn thấy trong ảnh, chỉ là một ví dụ nhỏ, một câu `cat` đơn giản và thế là full clip không che của server.

####  Phòng chống
Như các bạn có thể thấy trong ảnh, việc thực thi nó cũng tương tự với SQL Injection và XSS, nên việc ngăn chặn cũng gần như tượng tự, bắt đầu với chuẩn hóa input ngoài ra còn cần phân quyền thực thi lệnh đúng để ngăn chặn việc truy xuất dữ liệu từ người không có quyền, về cơ bản thì nó được mấy cái gạch đầu dòng sau:
##### 1. Espace inputs
##### 2. Hạn chế các command được phép
##### 3. Chạy với quyền hạn chế
##### 4. Tránh gọi các lệnh cùng nhau
##### 5. Và nhớ nhờ ae trong team review code kỹ lưỡng :+1:

### Clickjacking
Cái này thì ae xem phim lậu hay đọc truyện online chắc chắn gặp nhiều, rất nhiều, mà nó còn là do mấy ông dev cố ý cắm vào nữa :joy:

Chính là việc ae, click play video nhưng lại bật ra cái quảng cáo, click đóng quảng cáo nhưng lại bật ra quảng cáo, click chả vào cái m* gì cũng bật ra quảng cáo :joy:

![](https://images.viblo.asia/76e76ec4-c777-4d99-a77a-f63b6c643c74.png)

Việc này có thể làm bằng css, hoặc js đều được cả, còn làm thế nào thì tôi không dạy và bypass thế nào thì tôi cũng không chỉ, cần câu cơm của ae cả thôi.

Nhưng đây chỉ là một "ứng dụng" nhỏ của nó, nếu vào tay hacker, tricker, họ có thể bắt bạn download nhưng tập tin malware, điều hướng bạn đến những trang đọc hại hoặc kết hợp với XSS, làm bạn vô tình gửi cho họ nhưng thông tin cá nhận mà bạn không hề hay biết

####  Phòng chống
##### 1. X-Frame-Options
Biểu thị cho phép trình duyệt render thẻ như `<frame>`, `<iframe>`, `<object>`
##### 2. Content Security Policy
Là một phần của HTML5, bảo vệ rộng hơn X Frame, nhưng thế nào thì tôi không biết :-1:
##### 3. Frame-Killing
Chèn đoạn code này vào trang, nó sẽ kiểm tra domain trang gốc có giống với domain của trình duyệt hay không, nếu đúng thì được phép hiển thị.
```html
<style>
  /* Hide page by default */
  html { display : none; }
</style>

<script>
  if (self == top) {
    // Everything checks out, show the page.
    document.documentElement.style.display = 'block';
  } else {
    // Break out of the frame.
    top.location = self.location;
  }
</script>
```

### Cross-site Request Forgery
Là kỹ thuật tấn công bằng cách sử dụng quyền chứng thực của người dùng đối với một website. 
Ví dụ về kịch bản tấn công nó sẽ thế này:
+ Một cái web đăng bài post dùng method GET và bị một anh hacker để ý
+ anh ta sửa lại đường dẫn bao gồm cả request được lên web đó như vậy `www.tweeper.com/post?message=This+horse+know+karate!+www%2Cbit.ly%2F60138Wawd` và gửi cho mọi người 
+ người nhận được mail hay gì đó chưa link như vậy

![](https://images.viblo.asia/412a15a7-01a6-4b85-bc11-3271b77baa69.png)
+ khi click vào link, họ sẽ được chuyển đến trang web đó và thực hiện hành động post bài mà hacker đã chuẩn bị trước, nhưng giới thiệu web đồi trụy, phát tán virus, cài đặt phần mềm độc hại....

![](https://images.viblo.asia/da436475-db92-4e35-8e1b-a222044faacc.png)

####  Phòng chống
Việc phòng chống này cần được thực hiện tốt cả ở user và server
##### User
+ Thoát tài khoản tại các website quan trọng sau khi xong việc
+ Không click vào các link nhận được mà không biết mục đích của chúng là gì
+ Không nên lưu các thông tin về mật khẩu tại trình duyệt
+ Khi đang thực hiện việc quan trọng, hay đang mở các web quan trong, không nên vào các website khác, có thể chứa các mã độc
##### Server
+ Sử dụng method GET và POST hợp lý
+ Dùng captcha hoặc các thông báo xác nhận
+ Dùng token
+ Dùng cookie riêng cho trang quản trị
+ Kiểm tra IP

## [Part 2](https://viblo.asia/p/cac-ki-thuat-hack-co-ban-lap-trinh-vien-nen-biet-phan-2-4dbZN92gKYM)