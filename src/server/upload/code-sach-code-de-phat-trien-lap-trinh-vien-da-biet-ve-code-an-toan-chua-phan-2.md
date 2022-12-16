![](https://images.viblo.asia/40c92226-a80f-4f9b-90f4-492e8a8a1ffc.png)

Như đã hứa ở cuối [phần 1](https://viblo.asia/p/code-sach-code-de-phat-trien-lap-trinh-vien-da-biet-ve-code-an-toan-chua-phan-1-Qbq5Qawm5D8) thì trong phần 2 này mình sẽ nói về các lỗ hổng: PHP Type Juggling, Hard Coded, Xử lý dữ liệu quan trọng tại Client side, Sử dụng bộ sinh số ngẫu nhiên không an toàn,...

Mình vẫn sẽ lấy các challenge trong Secure Coding CTF làm ví dụ phân tích. Vừa tiện có ví dụ trực quan, vừa tiếp tục là write up cho các challenge luôn.

Giờ thì tiếp tục với Secure Coding thôi :v::v::v:

# 3. PHP Type Junggling
Lỗ hổng typle junggling xảy ra do PHP hỗ trợ 2 phương thức so sánh bằng: **so sánh tương đối (Loose comparisons)** và **so sánh tuyệt đối (Strict comparisons)**

So sánh tuyệt đối được sử dụng với 3 dấu bằng **```===```**. Kiểu so sánh này chỉ trả về **TRUE** khi 2 biến được so sánh giống nhau về cả **kiểu dữ liệu** và **giá trị**.

So sánh tương đối được sử dụng với 2 dấu bằng **```==```**. Kiểu so sánh này linh hoạt hơn, nhưng cũng dễ tạo ra các lỗ hổng mà lập trình viên không hề biết. Đó là do khi thực hiện so sánh, PHP sẽ cố gắng đưa 2 biến về 1 kiểu dữ liệu chung. Nếu 2 biến được so sánh giống nhau về cả **kiểu dữ liệu** và **giá trị** thì thực hiện không khác gì so sánh tuyệt đối.

Tuy nhiên, khi kiểu dữ liệu của 2 biến khác nhau thì trong quá trình chuyển về kiểu dữ liệu chung, giá trị của chúng có thể bị thay đổi. Việc này có thể tạo ra những sai lệch kết quả không mong muốn. Nếu có thể lợi dụng được điều này thì kẻ tấn công có khả năng:
- Vượt qua 1 số bước xác thực
- Thay đổi luồng hoạt động của chương trình theo ý muốn
- Làm chương trình xảy ra lỗi logic.

Để rõ hơn thì mọi người có thể đọc thêm trong bài viết của bạn mình tại [đây](https://viblo.asia/p/php-type-juggling-924lJPYWKPM). Giờ thì chúng ta sẽ xem qua 2 ví dụ cụ thể

## 3.1. Ví dụ 1: Junggling 1
Thông tin:
- Tuần: 1
- Bài: Junggling 1
- Ngôn ngữ lập trình: PHP
- Mã nguồn: https://ideone.com/HKEGEf

Chúng ta chỉ cần chú ý đến đoạn code PHP trong file mã nguồn là được:
```php
<?php
require "settings.php";

if (isset($_GET['password']))
{
    $actualPass = "999";
    if ($_GET['password'] === "999") {
        $_GET['password'] = "=P"; //hahaha
    }

    if ($_GET['password'] == $actualPass) {
        echo $flag;
    }
    else {
        echo "Nope<br/><br/><br/>";
    }
}
```

Trong code đã ghi rõ password là 1 xâu: **```999```**. Nhưng nếu chúng ta nhập vào 999 thì khi gặp đoạn if thứ nhất, so sánh **```===```** sẽ đổi ngay input của chúng ta thành **```=P```** . Còn để echo ra được flag thì cần bypass đoạn if thứ nhất và vào được if thứ 2, hay nói cách khác là phải tìm input thỏa mãn đồng thời 2 điều kiện sau:
- Không được là **999**
- So sánh tương đối với xâu **```999```** phải trả về **FALSE**

Để dễ tìm được input thỏa mãn thì chúng ta nên xem 3 bảng so sánh trong [tài liệu về so sánh trong PHP](https://www.php.net/manual/en/types.comparisons.php)

Mình đã đánh dấu luôn trên bảng so sánh tương đối để nhìn dễ hơn:
![](https://images.viblo.asia/45017ace-58c3-4e07-8eba-e4dd4e896a50.png)

Việc so sánh string **```1```** cũng tương tự khi so sánh string **```999```** nên  mình đã khoanh cả dòng đó lại bằng màu xanh. Các trường hợp có thể xảy ra **TRUE** là hướng chúng ta cần tìm để thỏa mãn được đoạn if thứ 2. Trong đó cần loại bỏ trường hợp được khoanh vàng luôn vì trường hợp này sẽ bị chặn tại đoạn if thứ nhất ("1" == "1" trả về TRUE và "1" === "1" cũng trả về TRUE).

Chú ý là: khi đọc giá trị từ GET request thì input của chúng ta chỉ là 1 string mà thôi, nên sẽ không thể truyền giá trị boolean được. Thế thì chỉ còn 1 phương án khả thi nhất, đó là so sánh 1 số với 1 string. Với phương án này thì xem cách PHP xử lý kiểu biến khi thực hiện so sánh ở bảng dưới đây sẽ rõ hơn.

![](https://images.viblo.asia/f2cda82f-bf09-408a-8c7e-1cceeed2243f.png)

Vậy là khi thực hiện so sánh 2 chuỗi với nhau thì PHP sẽ chuyển hết sang dạng số, rồi thực hiện so sánh giữa 2 số với nhau.

=> Cần tìm 1 chuỗi mà khác **```999```**, nhưng khi chuyển sang dạng số tự nhiên thì phải có giá trị = 999.

=> Chuỗi đó là **```0999```**:
- ```0999 === 999``` => FALSE
- ```0999 == 999``` => TRUE

![](https://images.viblo.asia/c9b59dc4-b3f4-49f9-a9fd-4429d40cac1d.png)

## 3.2. Ví dụ 2: Junggling 2
Thông tin:
- Tuần: 4
- Bài: Junggling 2
- Ngôn ngữ lập trình: PHP
- Mã nguồn: https://ideone.com/AlX3uK

Lần này phần code PHP so sánh như sau:
```php
<?php
require "settings.php";

if (isset($_GET['password'])) {
    if (strcmp($_GET['password'], $actualPass) == 0) {
        echo $flag;
    } else {
        echo "<h2 class='display-4' style='color: #628FFF;'>Nope</h2>";
    }
}
?>
```

Lần này để lấy được flag cần nhập input sao cho ```strcmp($_GET['password'], $actualPass)``` trả về 0. Mình đã khoanh đỏ các ô như hình dưới vì hàm **strcmp** chỉ trả về 4 loại giá trị: <0, 0, >0 và null.

![](https://images.viblo.asia/63f0b29a-9683-4cfd-bdf0-4cb1674a52dd.png)

Để vượt qua xác thực thì chúng ta cần hàm strcmp trả về **0** hoặc **null**. Chúng ta chỉ có thể tìm cách làm hàm strcmp trả về null, vì chúng ta không biết mật khẩu nên không thể làm strcmp trả về 0 được.

Khi đọc document về hàm strcmp của PHP, chúng ta dễ dàng thấy 1 số trường hợp khiến strcmp trả về null.

![](https://images.viblo.asia/1ace597f-c43e-48fa-804c-9bd283f72a63.png)

Trong đó, khi so sánh một chuỗi với một mảng thì strcmp sẽ trả về null. Mà chúng ta có thể nhập vào 1 mảng bằng cách đổi **```?password=```** thành **```?password[]=```**

![](https://images.viblo.asia/40698abe-05fa-41dc-a0b3-1bb262763654.png)

**Tóm lại, tuy có những trường hợp lập trình viên chỉ có thể sử dụng so sánh tương đối. Nhưng nếu có thể, hãy luôn sử dụng so sánh tuyệt đối. Kể cả khi trông có vẻ vô hại, so sánh tương đối vẫn có thể làm logic code hoạt động sai vì khả năng cho ra các kết quả khó đoán.**

# 4. Hard Coded
Hard coded là lỗi do lập trình viên để lộ các thông tin quan trọng trong code. Khi đoạn code này bằng cách nào đó bị lộ ra và kẻ xấu có thể sử dụng các thông tin này để tấn công. Tùy vào độ quan trọng của thông tin mà hậu quả có thể từ không ảnh hưởng gì tới ảnh hưởng vô cùng nghiêm trọng.

Ví dụ như trường hợp được [4000$ bounty trên hackerone](https://hackerone.com/reports/716292) này. Starbuck đã để lộ API key của JumpCloud trong public repo trên Github. Nếu chăm search trên github thì thỉnh thoảng cũng thấy 1 số API key được hard code trong các public repo.

Mình đã từng gặp lỗi này trong thực tế. Đó là trong mã nguồn của 1 ứng dụng android vẫn còn hard code địa chỉ server staging kèm theo basic authen. Mà tài khoản chính vẫn có thể đăng nhập được vào môi trường staging luôn.

## Ví dụ: Sloth
Thông tin:
- Tuần: 1
- Bài: Sloth
- Ngôn ngữ lập trình: Java
- Mã nguồn: https://ideone.com/JRq6hA

Trong code đã lộ thông tin đăng nhập như sau:
- Lộ username tại dòng 58:
```java
if (username.equals("admin") && md5hash(password).equals(adminPasswordHash))
```
- Lộ admin password hash tại dòng 29:
```java
adminPasswordHash = "0571749e2ac330a7455809c6b0e7af90";
```

Không chỉ lộ thông tin đăng nhập, trường hợp này còn là lỗ hổng sử dụng hàm băm không an toàn do băm mật khẩu bằng thuật toán MD5. Chỉ cần sử dụng các công cụ online, bất cứ ai cũng có thể tìm được mật khẩu gốc.

![](https://images.viblo.asia/03e6c653-4399-4508-a9e8-6a22572a3680.png)

Với thông tin đăng nhập là admin/sunshine thì chúng ta có thể đăng nhập và lấy được flag

![](https://images.viblo.asia/91bd9d5c-fbf4-422b-8adc-e5692f4011c0.png)

Ngoài ví dụ này, trong ví dụ về việc lộ git log ở phần 1 mình cũng đã đề cập về việc hard coded credential nhưng sau đó đã gỡ ra khỏi code.

**Tóm lại, để tránh lộ các thông tin quan trọng chỉ có 1 cách, đó là thật cẩn thận với mỗi thông tin được hard code. Cần chắc chắn rằng thông tin này không có giá trị giúp tấn công vào hệ thống thì mới hard code. Hạn chế tối thiểu việc hard code.**

# 5. Xử lý dữ liệu quan trọng tại Client Side
Lỗi này xảy ra do lập trình viên thực hiện 1 vài chức năng xử lý dữ liệu tại Client, sau đó chỉ đưa kết quả lên Server. Việc này có thể giảm nhẹ phần nào công việc Server phải làm, tuy nhiên chỉ cần biết sử dụng Burp Suite cơ bản thì chúng ta có thể dễ dàng chặn và sửa request trước khi gửi lên.

Giả sử trường hợp như sau: ```Trong năm Covid thứ 2, trường X triển khai hệ thống làm bài kiểm tra trắc nghiệm online cho học sinh. Sau khi học sinh bấm nút "NỘP BÀI" thì ở phía Client sẽ đối chiếu đáp án và chấm điểm luôn, rồi gửi điểm lên Server để lưu kết quả lại. Tôi là học sinh Z học lớp 1F, với tài năng của 1 script kiddie chính hiệu, tôi đã bật burp suite lên và chặn request, sửa điểm bài thi từ 2.5 thành 10. Cuối năm học, không ngoài dự đoán tôi đã đứng đầu trường.```

Qua trường hợp của  ```học sinh Z``` kể trên, có thể thấy rằng rất nguy hiểm khi chúng ta xử lý các dữ liệu quan trọng tại Client Side.

## Ví dụ: Client Destroyer
Thông tin:
- Tuần: 3
- Bài: Client Destroyer
- Ngôn ngữ lập trình: PHP, JavaScript
- Mã nguồn: https://ideone.com/gBcsvH

Bài Client Destroyer có 1 đoạn mã PHP và 1 đoạn mã JS:
- PHP:  
```php
<?php
if (isset($_POST['password']))
{
    $password = $_POST['password'];
    if ($password == 'Hel2.4dnx21j.sl/dfsz')
    {
        include_once "flag.php";
        echo $flag;
    }
    else
    {
        echo "Sorry, the wrong password";
    }

}
?>
```
- JS:
```javascript
//const button = document.querySelector("#sub");
//document.addEventListener(button, validate);
function validate() {
    let input = document.querySelector("#in").value;
    console.log("I am here")
    input = input.replaceAll(".", "");

    if (input != "Hel2.4dnx21j.sl/dfsz") {
        alert("Given input is not correct, try again")
        return false;
    }
    return true;
}
```

Ở đoạn code PHP, chúng ta biết được mật khẩu là **```Hel2.4dnx21j.sl/dfsz```**, nhưng khi nhập vào vẫn bị báo sai mật khẩu. Việc này xảy ra là do đoạn JS ở dưới chọc ngoáy, nó sẽ xóa toàn bộ dấu chấm **```.```** đi.

Nhưng do đoạn script này được viết ngay trong file php, nên chúng ta có thể sử dụng Chrome Dev Tools để sửa hàm **validate()**. Chỉ cần F12 => tab Console => copy paste lại đoạn code JavaScript ở trên nhưng xóa dòng input = input.replaceAll("." , ""); đi => Enter để tiến hành thực thi ghi đè hàm. 

Sau đó chúng ta có thể nhập mật khẩu và lấy được flag.

**Như vậy, để đảm bảo hệ thống hoạt động đúng, với các chức năng quan trọng thì chỉ nên gửi input từ người dùng lên cho Server xử lý.**

# 6. Sử dụng bộ sinh số ngẫu nhiên không an toàn
Vấn đề về việc sử dụng bộ sinh số ngẫu nhiên không an toàn thường được nhắc đến với ngôn ngữ lập trình Java. Java chung cấp 2 thư viện sinh số ngẫu nhiên là **java.util.Random** và **java.security.SecureRandom**

Cả 2 thư viện trên đều có khả năng sinh số ngẫu nhiên, nhưng **java.security.SecureRandom** được coi là ***True Random*** (Random Number Genarator - RNG) còn **java.util.Random** không được đánh giá cao, được coi là ***Pseudo Random - giả ngẫu nhiên*** (Pseudo Random Number Genarator - PRNG).

Theo mình hiểu thì có thể xác định tính ngẫu nhiên của bộ sinh số bằng cách đánh giá 2 yếu tố:
- Thuật toán sinh ngẫu nhiên
- Thuật toán lấy seed

Về thuật toán sinh ngẫu nhiên thì mình không giỏi thuật toán để có thể đưa ra nhận xét. Còn về seed thì mình có biết 1 chút. **Seed** là 1 tham số mà từ seed này thì thuật toán sinh ngẫu nhiên có thể sinh ra dãy số ngẫu nhiên. Với các seed giống nhau thì dãy số ngẫu nhiên được sinh ra sẽ giống hệt nhau về cả giá trị từng phần tử và thứ tự của chúng.

Các thuật toán RNG được khuyến nghị dùng trong các sản phẩm yêu cầu độ bảo mật cao không chỉ do có thuật toán sinh tốt, mà cách thuật toán lấy seed cũng được phức tạp hóa để đảm bảo giá trị seed là ngẫu nhiên và không tồn tại 2 seed trùng nhau.

## Ví dụ: Thunderstruck
Thông tin:
- Tuần: 3
- Bài: Thunderstruck
- Ngôn ngữ lập trình: Java
- Mã nguồn: https://ideone.com/rJaWIA

Vẫn là yêu cầu đăng nhâp để lấy flag, user name thì là admin, còn password thì được sinh bằng hàm **generateSecurePassword()**. Nhưng hàm này không an toàn chút nào:
```java
static private String generateSecurePassword() {
    String password = "magicallysecure";
    Random rnd = new Random();

    // generate a random number between 0 and 20 and based on that, create a password
    Integer random = rnd.nextInt(20);

    // let's do some math on that number
    // btw, this code can be run on the website like https://w...content-available-to-author-only...e.com/online-java-compiler
    // just don't forget to import java.util.Random; at the top of the code editor
    random = random * 16578;
    random = random ^ 654321;
    for (int i = 0; i < password.length(); i++) {
        random += (int) password.charAt(i); // convert every character from password to an integer according to ASCII table and add that number to random
    }

    password = random.toString();

    return password;
}
```

Hàm trên sinh mật khẩu bằng cách lấy ngẫu nhiên 1 số trong khoảng 0 -> 20, sau đó qua 1 loạt phép tính để tạo ra mật khẩu. Với khoảng số bé như vậy thì chỉ có khoảng 20  mật khẩu có thể được tạo ra mà thôi. Chúng ta chỉ cần thử chạy thuật toán với các giá trị từ 0 -> 19, sau đó thử lần lượt các mật khẩu được tạo.

Và seed = 19 sẽ sinh ra mật khẩu đúng là **867281**.

![](https://images.viblo.asia/full/06bf3016-1a96-46d7-bd0a-86fbd040833e.png)

![](https://images.viblo.asia/full/d246948f-3a58-41a4-b4e2-73a107b81fa5.png)

-----

Mình xin kết thúc phần 2 tại đây. Trong phần tiếp theo mình sẽ chủ yếu đề cập đến lỗ hổng OS Command Injection.