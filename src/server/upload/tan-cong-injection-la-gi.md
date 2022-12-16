Một trong những kiểu tấn công phổ biến nhất được biết đến đối với ứng dụng web là SQL injection. SQL injection là một kiểu tấn công nhắm vào cơ sở dữ liệu SQL, cho phép người dùng cấp các tham số của riêng họ cho một truy vấn SQL. Và thông thường điều này thường dẫn đến một cơ sở dữ liệu bị xâm phạm do các quyền được cập nhật thông qua các lệnh SQL injection truyền vào.

SQL injection là dạng injection phổ biến nhất, nhưng không phải là dạng duy nhất. Các cuộc tấn công injection có hai thành phần chính: một trình thông dịch và payload từ người dùng bằng cách nào đó được đọc vào trình thông dịch. Điều này có nghĩa là các cuộc tấn công injection có thể xảy ra chống lại  như FFMPEG (một bộ xử lý video) cũng như chống lại cơ sở dữ liệu (như trường hợp injection SQL truyền thống)

## SQL Injection
![](https://images.viblo.asia/19a7a4a6-b8c1-410f-8155-b5c320442d34.jpg)

SQL injection là hình thức injectioncổ điển nhất. Một chuỗi SQL được đặt trong một HTTP payload, dẫn đến các truy vấn SQL tùy chỉnh được thực thi thay đổi quyền cho end user.
![](https://images.viblo.asia/ada49815-bf40-498a-8043-15029546eb26.png)
 Thông thường nhiều tập PMNM được xây dựng bằng cách sử dụng kết hợp PHP và SQL (thường là MySQL). Nhiều lỗ hổng SQL injection đã xảy ra do quan điểm thoải mái của PHP về luồng giữa các view, logic và data code. Các nhà phát triển PHP cũ sẽ đan xen sự kết hợp của SQL, HTML và PHP vào các tệp PHP của họ — một mô hình tổ chức được hỗ trợ bởi PHP sẽ bị lạm dụng, dẫn đến một lượng lớn mã PHP dễ bị tấn công.
 
 Hãy xem ví dụ về một đoạn mã PHP cho phép người dùng đăng nhập:
 
 ```php
 <?php if ($_SERVER['REQUEST_METHOD'] != 'POST') {
  echo '
    <div class="row">
        <div class="small-12 columns">
        <form method="post" action="">
            <fieldset class="panel">
            <center>
            <h1>Sign In</h1><br>
            </center>
                <label>
                    <input type="text" id="username" name="username"
                    placeholder="Username">
                </label>
                <label>
                    <input type="password" id="password" name="password"
                    placeholder="Password">
                </label>
        <center>
              <input type="submit" class="button" value="Sign In">
         </center>
            </fieldset>
        </form>
    </div>
</div>';
} else {
  // the user has already filled out the login form.
  // pull in database info from config.php
  $servername = getenv('IP');
  $username = $mysqlUsername;
  $password = $mysqlPassword;
  $database = $mysqlDB;
  $dbport = $mysqlPort;
  $database = new mysqli(
    $servername,
    $username,
    $password,
    $database,
    $dbport
  );
  if ($database->connect_error) {
    echo "ERROR: Failed to connect to MySQL";
    die;
  }
  $sql = "SELECT userId, username, admin, moderator FROM users WHERE
username =
'" . $_POST['username'] . "' AND password =
'" . sha1($_POST['password']) . "';";
  $result = mysqli_query($database, $sql);
}
 ```
 Như bạn có thể thấy trong mã đăng nhập này, PHP, SQL và HTML đều được đặt lẫn với nhau. Hơn nữa, truy vấn SQL được tạo dựa trên việc nối các tham số truy vấn mà không có sự khởi tạo nào xảy ra trước khi chuỗi truy vấn được tạo.
 Sự đan xen của mã HTML, PHP và SQL chắc chắn làm cho việc đưa vào SQL dễ dàng hơn nhiều cho các ứng dụng web dựa trên PHP. Ngay cả một số ứng dụng PHP OSS lớn như WordPress, đã từng là nạn nhân của điều này trong quá khứ.
 
 Trong những năm gần đây, các tiêu chuẩn mã hóa PHP đã trở nên nghiêm ngặt hơn nhiều và ngôn ngữ này đã triển khai các công cụ để giảm khả năng xảy ra SQL injection. Hơn nữa, sự lựa chọn PHP của các nhà phát triển ứng dụng đã giảm so với trước. Theo chỉ số TIOBE, một tổ chức đo lường mức độ phổ biến của ngôn ngữ lập trình, việc sử dụng PHP đã giảm đáng kể kể từ năm 2010.
 
 Các bài học bảo mật rút ra từ PHP đã tồn tại trong các ngôn ngữ khác và việc tìm ra các lỗ hổng chèn SQL trong các ứng dụng web ngày nay sẽ khó hơn nhiều. Tuy nhiên, nó vẫn có thể xảy ra và vẫn phổ biến trong các ứng dụng không sử dụng các phương pháp hay nhất về mã hóa an toàn.
 
 Hãy xem xét một Node.js / Express.js server đơn giản khác :
 
```javascript
const sql = require('mssql');
/*
* Recieve a POST request to /users, with a user_id param on the request
body.
*
* An SQL lookup will be performed, attempting to find a user in the
database
* with the `id` provided in the `user_id` param.
*
* The result of the database query is sent back in the response.
*/
app.post('/users', function (req, res) {
  const user_id = req.params.user_id;
  /*
  * Connect to the SQL database (server side).
  */
  await sql.connect('mssql://username:password@localhost/database');
  /*
  * Query the database, providing the `user_id` param from the HTTP
  * request body.
  */
  const result = await sql.query('SELECT * FROM users WHERE USER = ' +
    user_id);
  /*
  * Return the result of the SQL query to the requester in the
  * HTTP response.
  */
  return res.json(result);
});
```
Trong ví dụ này, một nhà phát triển đã sử dụng nối chuỗi trực tiếp để đính kèm tham số truy vấn vào truy vấn SQL. Điều này giả định rằng tham số truy vấn được gửi qua không bị giả mạo.
Trong trường hợp user_id hợp lệ, truy vấn này sẽ trả về một đối tượng người dùng. Trong trường hợp chuỗi user_id độc hại hơn, nhiều đối tượng khác có thể được trả về từ cơ sở dữ liệu. Hãy xem một ví dụ:
```
const user_id = '1=1'
```
Bây giờ, truy vấn SELECT * FROM users where USER = true, được dịch thành 'trả lại tất cả các đối tượng người dùng cho người yêu cầu.

Điều gì sẽ xảy ra nếu chúng ta vừa bắt đầu một câu lệnh mới bên trong đối tượng user_id ?
```
user_id = '123abc; DROP TABLE users;';
```
Bây giờ truy vấn của chúng ta trông giống như sau: SELECT * FROM người dùng WHERE USER = 123abd; DROP TABLE users ;. Ơ, chúng ta đã thêm một truy vấn khác lên trên truy vấn ban đầu. Và bây giờ chúng ta cần xây dựng lại dữ liệu của users.

Một ví dụ thú zị hơn có thể là một cái gì đó như thế này:
```
const user_id = '123abc; UPDATE users SET credits = 10000 WHERE user = 123abd;'
```

Bây giờ, thay vì yêu cầu danh sách tất cả người dùng hoặc drop người dùng, chúng tôi đang sử dụng truy vấn thứ hai để cập nhật tài khoản người dùng của chính mình trong cơ sở dữ liệu — trong trường hợp này, tự tạo cho mình nhiều sô tín dụng trong ứng dụng hơn những gì chúng ta đã có.

## Code Injection

Trong thế giới injection, SQL injection chỉ là một phần con của các cuộc tấn công kiểu “injection”. SQL injection được phân loại là injection vì nó liên quan đến một trình thông dịch (trình thông dịch SQL) được nhắm mục tiêu bởi payload được đọc vào trình thông dịch. Code injection dựa trên việc thực thi trên giao diện command-line (CLI) gọi một API endpoint được cung cấp thêm các lệnh không mong muốn do thiếu sanitization.
![](https://images.viblo.asia/f7141d93-163a-4a60-8ce4-faef00030d7a.png)

SQL injection đầu tiên là một cuộc tấn công injection và thứ hai là một cuộc tấn công chèn mã. Điều này là do tập lệnh injection chạy dưới trình thông dịch hoặc CLI (lệnh injection).
Như đã đề cập trước đó, có nhiều kiểu chèn mã ít được biết đến hơn mà không dựa trên cơ sở dữ liệu. Những điều này ít phổ biến hơn vì một số lý do. Đầu tiên, hầu hết mọi ứng dụng web phức tạp ngày nay đều dựa vào cơ sở dữ liệu để lưu trữ và truy xuất dữ liệu người dùng. Vì vậy, nhiều khả năng bạn sẽ tìm thấy SQL hoặc chèn cơ sở dữ liệu khác thay vì đưa vào CLI ít phổ biến hơn đang chạy trên máy chủ
Hãy xem xét một máy chủ nén hình ảnh / video mà MegaBank đã phân bổ để sử dụng trong các chiến dịch tiếp thị hướng đến khách hàng của mình. Máy chủ này là một tập hợp các API REST được đặt tại https://media.megabank.com. Nó bao gồm một số API:

* uploadImage (POST)
* uploadVideo (POST)
* getImage (GET)
* getVideo (GET)

Endpoint uploadImage() là một endpoint Node.js đơn giản như sau:

```javascript
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const fs = require('fs');
/*
* Attempts to upload an image provided by a user to the server.
*
* Makes use of imagemin for image compression to reduce impact on
server
* drive space.
*/
app.post('/uploadImage', function (req, res) {
  if (!session.isAuthenticated) { return res.sendStatus(401); }
  /*
  * Write the raw image to disk.
  */
  fs.writeFileSync(`/images/raw/${req.body.name}.png`, req.body.image);
  /*
  * Compresses a raw image, resulting in an optimized image with lower
  disk
  * space required.
  */
  const compressImage = async function () {
    const res = await imagemin([`/images/raw/${req.body.name}.png`],
      `/images/compressed/${req.body.name}.jpg`);
    return res;
  };
  /*
  * Compress the image provided by the requester, continue script
  * expecution when compression is complete.
  */
  const res = await compressImage();
  /*
  * Return a link to the compressed image to the client.
  */
  return res.status(200)
    .json({ url: `https://media.megabank.com/images/${req.body.name}.jpg` });
});
```

Đây là một endpoint khá đơn giản có thể chuyển đổi hình ảnh PNG thành JPG. Nó sử dụng thư viện imagemin và không lấy bất kỳ thông số nào từ người dùng để xác định kiểu nén, ngoại trừ tên tệp.
Tuy nhiên, có thể một người dùng lợi dụng việc sao chép tên tệp và khiến thư viện imagemin ghi đè lên các hình ảnh hiện có. Đó là bản chất của tên tệp trên hầu hết các hệ điều hành.
```html
// on the front-page of https://www.mega-bank.com
<html>
<!-- other tags -->
<img src="https://media.mega-bank.com/images/main_logo.png">
<!-- other tags -->
</html>
```

```
const name = 'main_logo.png';
// uploadImage POST with req.body.name = main_logo.png
```
Thoáng qua thì trông có vẻ không giống như một cuộc tấn công injection, vì nó chỉ là một thư viện JavaScript đang chuyển đổi và lưu hình ảnh. Nhưng bởi vì thư viện imagemin gọi một CLI (imagemin-cli), đây thực sự sẽ là một cuộc tấn công injection — sử dụng CLI đã được gắn vào API để thực hiện các hành động không mong muốn.

Khi cho thêm các tuỳ chọn option giữa các tập lệnh và các lệnh cấp hệ thống, điều cần thiết là phải chú ý đến chi tiết về cách một chuỗi được sanitized trước khi được thực thi trên hệ điều hành chủ (Linux, Macintosh, Windows, v.v.) hoặc trình thông dịch (SQL, CLI, v.v.) ) để ngăn chặn việc tiêm lệnh và chèn mã.

## Command Injection

Với việc chèn lệnh, một endpointi API tạo ra các lệnh Bash, bao gồm cả một yêu cầu từ máy client. Người dùng sẽ thêm các lệnh tùy chỉnh sửa đổi hoạt động bình thường của endpoint API.
Cho đến nay, chúng ta đã biết rằng việc chèn mã liên quan đến việc lợi dụng một API được viết không đúng cách để khiến trình thông dịch hoặc CLI thực hiện các hành động mà nhà phát triển không mong muốn. Chúng ta cũng đã biết rằng Injection Command là một hình thức Injection code nâng cao, trong đó thay vì thực hiện các hành động không mong muốn đối với CLI hoặc trình thông dịch, chúng ta đang thực hiện các hành động không mong muốn đối với một hệ điều hành.

![](https://images.viblo.asia/561d4b43-5b47-4da8-8d36-fcaec4359ee2.png)
Hãy lùi lại một chút và xem xét tác động của một cuộc tấn công ở cấp độ này. Đầu tiên, khả năng thực thi các lệnh (thường là Bash) đối với hệ điều hành dựa trên Unix (Macintosh hoặc Linux) có những rủi ro rất nghiêm trọng đi kèm với nó. Nếu chúng ta có quyền truy cập trực tiếp vào hệ điều hành Unix lưu trữ (hơn 95% máy chủ dựa trên Unix) và các lệnh của chúng ta được hiểu như một super user, chúng ta có thể làm bất cứ điều gì chúng ta muốn với hệ điều hành đó.
Hệ điều hành bị xâm nhập có thể bị đánh mất một số thông tin chẳng hạn như:
*  /etc/passwd
Giữ mọi thông tin tài khoản người dùng trên OS
*  /etc/shadow
Chứa mật khẩu được mã hóa của người dùng
*  ~/.ssh
Chứa các khóa SSH để giao tiếp với các hệ thống khác
*  /etc/apache2/httpd.conf
Cấu hình cho máy chủ Apache
*  /etc/nginx/nginx.conf
Cấu hình cho máy chủ Nginx

Hơn nữa, việc chèn lệnh có thể cung cấp cho chúng quyền ghi đối với các tệp này ngoài quyền đọc. Một lỗ hổng như thế này sẽ mở ra một loạt các cuộc tấn công tiềm ẩn mà chúng ta có thể sử dụng lệnh injection để gây ra nhiều tàn phá hơn dự kiến bao gồm:
* Đánh cắp dữ liệu từ máy chủ .
* Viết lại các tệp nhật ký để ẩn dấu vết. 
* Thêm một người dùng trong cơ sở dữ liệu với quyền ghi để sử dụng sau này.
* Xóa các tệp quan trọng trên máy chủ. 
* Xóa máy chủ và đánh sập nó. 
* Sử dụng tích hợp với các máy chủ / API khác (ví dụ: sử dụng các khóa Sendgrid của máy chủ để gửi thư rác). 
* Thay đổi một biểu mẫu đăng nhập duy nhất trong ứng dụng web thành một biểu mẫu lừa đảo gửi mật khẩu không được mã hóa đến trang web.
* Khóa quản trị viên và tống tiền họ.

Như bạn có thể thấy, injection lệnh là một trong những kiểu tấn công nguy hiểm nhất mà hacker có trong bộ công cụ của họ. Nó đứng đầu trong mọi thang đánh giá rủi ro về lỗ hổng bảo mật và sẽ tiếp tục ở đó trong một thời gian dài sắp tới, ngay cả với các biện pháp giảm thiểu được áp dụng trên các máy chủ web hiện đại.

Một trong những biện pháp giảm thiểu điều này trên các hệ điều hành dựa trên Unix là một hệ thống phân quyền mạnh có thể giảm thiểu một số rủi ro bằng cách giảm thiệt hại có thể gây ra bởi một enpoint bị xâm phạm. Hệ điều hành dựa trên Unix cho phép áp dụng các quyền chi tiết cho tệp, thư mục, người dùng và lệnh. Việc thiết lập chính xác các quyền này có thể loại bỏ nguy cơ của nhiều mối đe dọa trước đó bằng cách buộc một API chạy với tư cách người dùng không có đặc quyền. Thật không may, hầu hết các ứng dụng có nguy cơ injection lệnh không thực hiện các bước này để tạo hồ sơ quyền người dùng nâng cao cho mã của họ.

Cùng đi nhanh qua một ví dụ đơn giản khác về injection code:

```javascript
const exec = require('child_process').exec;
const fs = require('fs');
const safe_converter = require('safe_converter');
/*
* Upload a video to be stored on the server.
*
* Makes use of the `safe_converter` library to convert the raw video
* prior to removing the raw video from disc and returning an HTTP 200
status
* code to the requester.
*/
app.post('/uploadVideo', function (req, res) {
  if (!session.isAuthenticated) { return res.sendStatus(401); }
  /*
  * Write the raw video data to disk, where it can be later
  * compressed and then removed from disk.
  */
  fs.writeFileSync(`/videos/raw/${req.body.name}`, req.body.video);
  /*
  * Convert the raw, unoptimized video—resulting in an optimized
  * video being generated.
  */
  safe_converter.convert(`/videos/raw/${req.body.name}`,
    `'/videos/converted/${req.body.name}`)
    .then(() => {
      /*
    * Remove the raw video file when it is no longer needed.
    * Keep the optimized video file.
    */
      exec(`rm /videos/raw/${req.body.name}`);
      return res.sendStatus(200);
    });
});
```
Có một số thao tác trong ví dụ này: 
1. Chúng ta ghi dữ liệu video vào disk trong thư mục / videos / raw.
2. Chúng ta chuyển đổi tệp video, ghi ra / video/converted. 
3. Chúng ta xóa video cũ 
Đây là một quy trình nén khá điển hình. Tuy nhiên, trong ví dụ này, dòng xóa tệp video cũ, exec (rm /videos/raw/${req.body.name}) ; dựa vào thông tin đầu vào của người dùng chưa được sanitized để xác định tên tệp video cần xóa.
Hơn nữa, tên không được tham số hóa mà thay vào đó được nối với lệnh Bash dưới dạng một chuỗi. Điều này có nghĩa là các lệnh bổ sung có thể xuất hiện sau khi video bị xóa. 
Cùng xem sét trường hợp này chúng ta truyền lên:
```
// name to be sent in POST request
const name = 'myVideo.mp4 && rm -rf /videos/converted/';
```
Trong quá trình thực thi mã, một đầu vào được sanitized đúng cách ở đây có thể dẫn đến các lệnh bổ sung được thực thi đối với hệ điều hành chủ — do đó có tên là “command injection”.