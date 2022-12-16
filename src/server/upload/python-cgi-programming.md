Trở lại với seri về Python. Bài viết này sẽ giới thiệu về một điều rất thú vị, đó là CGI - Commond Gateway Interface
Common Gateway Interface hay CGI là một chuẩn xác định cách thức trao đổi thông tin giữa web server và một custom script. Hiện nó được maintain bởi NCSA
## CGI là gì ?
 - Common Gateway Interface hoặc CGI là một chuẩn cho các chương trình gateway để giao tiếp thông tin với các server như là HTTP server
 - Vesion hiện tại là CGI/1.1 và CGI/1.2 đang trong quá trình phát triển
## Web browsing
Để hiểu hơn về khái niệm của CGI, ta hãy xem chuyện gì xảy ra khi click vào một hyper link trong trình duyệt ở một trang web hoặc một URL.
1. Trình duyệt sẽ kết nối với HTTP web server và yêu cầu URL, filename...
2. Web server sẽ phân tích cú pháp URL và tìm kiếm filename. Nếu nó tìm thấy file đó sau đó gửi chúng quay ngược lại cho trình duyệt, nếu không thì chúng sẽ gửi một thông báo lỗi mô tả request đến file bị sai
3. Trình duyệt nhận phản hồi từ web serrver và hiển thị file nhận được hoặc nhận một thông báo lỗi

Tuy nhiên, có thể cài đặt máy chủ HTTP để bất cứ khi nào một tệp trong thư mục chỉ định được request không được gửi trở lại, thay vào đó nó được thực hiện như một chương trình và bất kì output nào của chương trình đó được gửi lại để trình duyệt hiển thị. Chức năng này được gọi là Common Gateway Interface hay CGI và chương trình đó được gọi là CGI scripts. Các chương trình này có thể là Python Script, Perl script, C or C++.
## Sơ đồ kiến trúc CGI
![](https://images.viblo.asia/dad6a36a-c47a-454c-9ce5-e77d46180513.png)
## Cấu hình Web server
Trước khi tiến hành với lập trình CGI, điều kiện tiên quyết là Server Web Server hỗ trợ CGI và nó được cài đặt để xử lý chương trình CGI. Tất cả chương trình CGI được thực thi bởi HTTP server và được lưu trong 1 thư mục được cấu hình sẵn. Thư mục này được gọi là CGI Directory và theo quy ước nó được đặt tên là `/var/www/cgi-bin`. Theo quy ước, CGI file có extension như là `.cgi` nhưng bạn có thể giữ extension là `.py` cũng được.
Mặc định, Linux server được configure để chỉ chạy các scrip trong thư mục `/var/www/cgi-bin`. Nếu bạn muốn chỉ định bất kỳ thư mục nào khác để chạy CGI script, hãy comment những dòng dưới đây trong `httpd.conf` file
```
<Directory "/var/www/cgi-bin">
   AllowOverride None
   Options ExecCGI
   Order allow,deny
   Allow from all
</Directory>

<Directory "/var/www/cgi-bin">
Options All
</Directory>
```
Sau khi chạy thành công Web server, ta có thể chạy bất kỳ chương trình CGI nào khác như Perl, Shell, C hoặc C++

## First CGI Program
Dưới đây là một liên kết đơn giản, chúng được link tới một CGI script là `hello.py`. File này được lưu trong `/var/www/cgi-bin` và có nội dung như dưới. Trước khi chạy chương trình CGI, sử dụng câu lệnh `chmod 755 hello.py` để file được đổi sang mod có thể thực thi được
```Python
#!/usr/bin/python

print "Content-type:text/html\r\n\r\n"
print '<html>'
print '<head>'
print '<title>Hello Word - First CGI Program</title>'
print '</head>'
print '<body>'
print '<h2>Hello Word! This is my first CGI program</h2>'
print '</body>'
print '</html>'
```
Nếu click `hello.py` sau đó nó sẽ ra kết quả nhưu hình dưới đây
![](https://images.viblo.asia/a89b8ab3-e5b7-4c0e-bd66-11e907f22591.png)

Đoạn mã trong file hello.py là đoạn code đơn giản của Python, đầu ra viết trên file STDOUT file. Có một tính năng quan trọng và là tính năng có sẵn ở đây là dòng đầu tiên được in ra là **Content-type:text/html\r\n\r\n**. Dòng này được gửi ngược lại cho trình duyệt để hiển thị trên màn hình trình duyệt.
Đến thời điểm hiện tại phải hiểu được cơ bản về khái niệm của CGI và có thể viết nhiều chương trình CGI phức tạp sử dụng Python. Đoạn script có thể tương thích với bất kỳ hệ thống bên ngoài nào khác cũng như trao đổi thông tin như là RDBMS
## HTTP Header
Dòng **Content-type:text/html\r\n\r\n** là một phần của HTTP header được gửi tới trình duyệt để hiểu nội dung. Tất cả các HTTP Header đều có chung 1 form
```
HTTP Field Name: Field Content

For Example
Content-type: text/html\r\n\r\n
```
Có một số HTTP Header khác mà sẽ sử dụng thường xuyên trong lập trình CGI như dưới đây

| # | Header | Description|
| -------- | -------- |-------- |
| 1     | **Content-type:**|  Một chuỗi MIME được định nghĩa theo format sẽ được trả về |
| 2|**Expires: Date** |Ngày mà thông tin trở nên không hợp lệ. Nó được sử dụng bởi trình duyệt để quyết định khi nào 1 page được refresh |
| 3|**Localtion: URL** |URL được return thay vì URL được request. Có thể sử dụng field này để chuyển hướng tới bất kỳ file nào|
| 4|**Last-modified: Date** |Ngày thay đổi gần nhất của resource|
| 5|**Content-length: N** |Độ dài tính bằng bytes của dữ liệu trả về. Trình duyệt sử dụng giá trị này để báo cáo tính toán thời gian download 1 file|
| 6|**Set-Cookie: String** |Đặt cookie truyền qua string|
## Các biến môi trường của CGI
Tất cả các chương tình CGI có thể truy cập vào các biến môi trường dưới đây. Các biến môi trường này đóng vai trò quan trọng trong khi viết nhiều chương trình CGI
| # | Variable Name | Description|
| -------- | -------- |-------- |
| 1     | **CONTENT_TYPE**|  Kiểu dữ liệu của nội dụng. Được sử dụng khi client gửi nội dung đính kèm tới server. Ví dụ như upload file |
| 2|**CONTENT_LENGTH** |Độ dài của thông tin truy vấn. Nó chỉ có sẵn cho request với phương thức POST|
| 3|**HTTP_COOKIE** |Trả về tập các cookie dưới dạng key value|
| 4|**HTTP_USER_AGENT** |User-Agent yêu cầu trường header chưá thông tin về user agent xuất phát từ request. Nó là tên của trình duyệt web|
| 5|**PATH_INFO** |Đường dẫn của CGI script|
| 6|**REMOTE_ADDR** |Điạ chỉ IP của máy chủ từ xa thực hiện yêu cầu. Nó là đăng nhập tin cậy hoặc xác thực|
| 7|**REQUEST_METHOD** |Phương thức thực hiện request. Phổ biến nhất là GET và POST|
| 8|**SERVER_SOFTWARE** |Tên của version mà phần mềm của server đang chạy|
Dưới đây là chương trình CGI nhỏ để liệt kê ra tất cả các biến CGI. 
```Python
#!/usr/bin/python

import os

print "Content-type: text/html\r\n\r\n";
print "<font size=+1>Environment</font><\br>";
for param in os.environ.keys():
   print "<b>%20s</b>: %s<\br>" % (param, os.environ[param])
```
## GET và POST
Phải trải qua nhiều tình huống khi truyền một số thông tin tới máy chủ web và đặc biệt là CGI Program. Phương thức hay sử dụng nhất trong các tình huống là GET và POST method
#### GET
GET  gửi thông tin user mã hoá được thêm vào page request. Page và thông tin mã hoá sẽ được phân cách bởi ký tự `?`
```
http://www.test.com/cgi-bin/hello.py?key1=value1&key2=value2
```
GET method là phương thức mặc định để truyền thông tin từ browser tới web server và nó cung cấp string dài xuất hiện trên Localtion box của trình duyệt. Không bao giờ sử dụng GET nếu bạn có password hoặc các thông tin bí mật mà bạn muốn gửi lên server. GET có độ dài giới hạn, chỉ 1024 ký tự có thể được gửi trong 1 chuỗi request. GET truyền thông tin sử dụng `QUERY_STRING` header và sẽ truy cập vào CGI thông qua biến môi trường `QUERY_STRING`
Có thông gửi thông tin đơn giản bằng cách ghép cặp key và value cùng với bất kỳ URL nào hoặc có thể sử dụng HTML <FORM> tage để truyền thông tin sử dụng GET.
   
#### Ví dụ về URL đơn giản sử dụng GET
 Dưới đây là 1 URL đơn giản, nó truyền 2 giá trị tới hello_get.py sử dụng GET
 
 https://www.tutorialspoint.com/cgi-bin/hello_get.py?first_name=Diep&last_name=Tran

 Bên dưới là **hello.get.py** để xử lý đầu vào. Sử dụng **cgi** module giúp dễ dàng truy cập thông tin đã được gửi
 ```Python
#!/usr/bin/python

# Import modules for CGI handling 
import cgi, cgitb 

# Create instance of FieldStorage 
form = cgi.FieldStorage() 

# Get data from fields
first_name = form.getvalue('first_name')
last_name  = form.getvalue('last_name')

print "Content-type:text/html\r\n\r\n"
print "<html>"
print "<head>"
print "<title>Hello - Second CGI Program</title>"
print "</head>"
print "<body>"
print "<h2>Hello %s %s</h2>" % (first_name, last_name)
print "</body>"
print "</html>"
```
Và kết quả là

![](https://images.viblo.asia/66c4b089-0752-40b5-9ec9-5e2f88cc50b6.png)
#### POST
Một phương thức truyền thông tin tin cậy hơn tới một CGI Program là POST. Việc đóng gói thông tin chính xác là giống như GET nhưng thay đó thông điệp xuất hiện trong CGI script dưới dạng form chuẩn
#### Một số ví dụ về gửi nhận các dạng data
Sử dụng lại file hello_get.py để nhận thông tin nhưng dữ liệu được gửi bằng phương thức POST
1. Bên dưới là HTML form và nút submit để gửi dữ liệu lên 
```html
<form action = "/cgi-bin/hello_get.py" method = "post">
    First Name: <input type = "text" name = "first_name"><br />
    Last Name: <input type = "text" name = "last_name" />

    <input type = "submit" value = "Submit" />
</form>
```

2. Gửi dữ liệu Checkbox tới CGI Program
- Client
```html
<form action = "/cgi-bin/checkbox.cgi" method = "POST" target = "_blank">
    <input type = "checkbox" name = "maths" value = "on" /> Maths
    <input type = "checkbox" name = "physics" value = "on" /> Physics
<input type = "submit" value = "Select Subject" />
</form>
```

CGI Program
```Python
#!/usr/bin/python

# Import modules for CGI handling 
import cgi, cgitb 

# Create instance of FieldStorage 
form = cgi.FieldStorage() 

# Get data from fields
if form.getvalue('maths'):
   math_flag = "ON"
else:
   math_flag = "OFF"

if form.getvalue('physics'):
   physics_flag = "ON"
else:
   physics_flag = "OFF"

print "Content-type:text/html\r\n\r\n"
print "<html>"
print "<head>"
print "<title>Checkbox - Third CGI Program</title>"
print "</head>"
print "<body>"
print "<h2> CheckBox Maths is : %s</h2>" % math_flag
print "<h2> CheckBox Physics is : %s</h2>" % physics_flag
print "</body>"
print "</html>"
```
4. Gửi dữ liệu Drop down box tới CGI Program
- Client
```html
<form action = "/cgi-bin/dropdown.py" method = "post" target = "_blank">
    <select name = "dropdown">
        <option value = "Maths" selected>Maths</option>
        <option value = "Physics">Physics</option>
    </select>
<input type = "submit" value = "Submit"/>
</form>
```
- CGI Program
```Python
#!/usr/bin/python

# Import modules for CGI handling 
import cgi, cgitb 

# Create instance of FieldStorage 
form = cgi.FieldStorage() 

# Get data from fields
if form.getvalue('dropdown'):
   subject = form.getvalue('dropdown')
else:
   subject = "Not entered"

print "Content-type:text/html\r\n\r\n"
print "<html>"
print "<head>"
print "<title>Dropdown Box - Sixth CGI Program</title>"
print "</head>"
print "<body>"
print "<h2> Selected Subject is %s</h2>" % subject
print "</body>"
print "</html>"
```
5. File Upload
- Client
```html
<html>
<body>
   <form enctype = "multipart/form-data" 
                     action = "save_file.py" method = "post">
   <p>File: <input type = "file" name = "filename" /></p>
   <p><input type = "submit" value = "Upload" /></p>
   </form>
</body>
</html>
```
- CGI Program
```Python
#!/usr/bin/python

import cgi, os
import cgitb; cgitb.enable()

form = cgi.FieldStorage()

# Get filename here.
fileitem = form['filename']

# Test if the file was uploaded
if fileitem.filename:
   # strip leading path from file name to avoid 
   # directory traversal attacks
   fn = os.path.basename(fileitem.filename)
   open('/tmp/' + fn, 'wb').write(fileitem.file.read())

   message = 'The file "' + fn + '" was uploaded successfully'
   
else:
   message = 'No file was uploaded'
   
print """\
Content-Type: text/html\n
<html>
<body>
   <p>%s</p>
</body>
</html>
""" % (message,)
```
## Sử dụng Cookies trong CGI
Giao thức http là một stateless protocol. Đối với một trang web thương mại, nó yêu cầu duy trì session trong các trang khác nhau. Ví dụ, một người dùng kết thúc đăng ký sau khi hoàn thành nhiều page. Làm thế nào để duy trì phiên của người dùng trên tất cả các trang đó ?
Trong nhiều tình huống, sử dụng cookies là hiệu quả nhất để nhớ và theo dõi, quá trình mua bán và nhiều thông tin khác cần thiết để có được trải nghiệm và thống kê web tốt hơn
#### How ?
Server gửi dữ liệu cho trình duyệt khách trong form của 1 cookie. Trình duyệt có thể chấp nhận cookie. Nếu được, nó lưu trữ dưới dạng bản rõ trên phần cứng của máy khách. Bây giờ, khi máy khách đến bất kỳ trang nào trên site của bạn, cookies đã có sẵn để truy xuất thông tin. Mỗi lần truy xuất server biết/ghi nhớ cái gì đã được lưu trữ
Cookíe là một bản ghi dữ liệu dưới dạng bản rõ của 5 biến
- **Expires** - Thời gian hết hạn. Nếu rỗng, cookie sẽ hết hạn khi thoát trình duyệt
- **Domain** -  Tên miền của site
- **Path** - Đường dẫn thư mục hoặc trang web nơi mà set cookie. Nó có thể rỗng nếu muốn truy xuất từ bất kỳ thư mục nào của page
- **Secure** - Nếu trường này có từ "secure", sau đó cookie có thể chỉ được truy xuất với 1 secure server. Nếu trường này rỗng, không tồn tại cái giới hạn trên
- **Name=Value** - Cookies được set và truy xuất trong 1 form với các cặp key và value

#### Setting up Cookies
Rất dễ để gửi cookies tới browser. Các cookies này được gửi cùng với HTTP header trước trường **Content-type** field. Giả sử nếu muốn đặt UserID và Password làm cookies

```Python
#!/usr/bin/python

print 'Set-Cookie:UserID = XYZ;\r\n'
print 'Set-Cookie:Password = XYZ123;\r\n'
print 'Set-Cookie:Expires = Tuesday, 31-Dec-2007 23:12:40 GMT";\r\n'
print 'Set-Cookie:Domain = www.tutorialspoint.com;\r\n'
print 'Set-Cookie:Path = /perl;\n'
print 'Content-type:text/html\r\n\r\n'
```
Từ ví dụ trên, ta phải hiểu set cookies như thế nào và sử dụng **Set-Cookie** HTTP header để set cookies
Nó là tuỳ chọn để set các thuộc tính cookies như là Expires, Domain.... Đáng chú ý là cookie được đặt trước khi gửi dòng **Content-type:text/html\r\n\r\n**
#### Truy xuất Cookies
Rất dễ dàng để lấy tất cả các cookies. Cookies được lưu trong biến môi trường của CGI là `HTTP_COOKIE` và chúng sẽ có form là
```
key1 = value1;key2 = value2....
```
Để truy xuất cookies
```Python
#!/usr/bin/python

# Import modules for CGI handling 
from os import environ
import cgi, cgitb

if environ.has_key('HTTP_COOKIE'):
   for cookie in map(strip, split(environ['HTTP_COOKIE'], ';')):
      (key, value ) = split(cookie, '=');
      if key == "UserID":
         user_id = value

      if key == "Password":
         password = value

print "User ID  = %s" % user_id
print "Password = %s" % password
```
Kết quả
```
User ID = XYZ
Password = XYZ123
```
Cảm ơn bạn đã theo dõi bài viết, bài còn nhiều thiếu sót mong bạn góp ý thêm. Ở bài viết tiếp theo tôi sẽ giới thiệu về cách truy cập Database

*Refs: Python Advanced Tutorial*