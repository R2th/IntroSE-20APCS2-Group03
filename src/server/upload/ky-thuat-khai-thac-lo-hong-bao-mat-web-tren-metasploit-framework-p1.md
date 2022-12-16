![](https://images.viblo.asia/c74ff2b3-bb74-4a77-a3fb-afb4e607d250.jpg)

### 1. Giới thiệu chung 

Ra đời vào năm 2003 bởi tác giả H. D. Moore - Metasploit Framework là tên của một dự án bảo mật máy tính nhằm giúp tổng hợp,
cung cấp thông tin về các lỗ hổng bảo mật đồng thời  hỗ trợ khai thác các lỗ hổng này . 

Metasploit Framework tập trung vào việc triển khai nhanh các bước khai thác lỗ hổng bảo mật và phát triển các hệ thống phát
hiện xâm nhập. Ban đầu nó được viết trên nền tảng ngôn ngữ lập trình Perl với các thành phần chính được viết bằng C và Python,
sau này được viết lại bằng Ruby.  Năm 2009, Metasploit được Rapid7 – một công ty chuyên về bảo mật mua lại.

Trên Kali linux, Metasploit framework được cài đặt mặc
định. Đối với các nền tảng khác như Windows, macOS ... người sử dụng cần cài
đặt một cách thủ công.

### 2. Cấu trúc của Metasploit Framework
### 

Metasploit Framework bao gồm các thành phần các khác nhau. Mỗi
thành phần đều được đảm nhận các chức năng riêng biệt. Đầu tiên ta xem xét cấu
trúc hệ thống tệp tin và các thư viện của nó. (*Trong Kali Linux, Metasploit
Framework được cài đặt mặc định trong thư mục “/usr/share/metasploit-
framework”:*)

Một số thư mục quan trọng cần chú ý như sau:

**Data**: Đây là nơi dùng để lưu trữ các tập tin nhị phân có thể chỉnh sửa
được cần thiết cho việc khai thác, các tệp tin tấn công từ điển hoặc các file hình
ảnh, ...

![](https://images.viblo.asia/7054ebff-9020-43dd-a7f0-fc344544241b.png)

**Documentation**: Đây là nơi chứa các tài liệu mô tả cần thiết cho
metasploit framework.

![](https://images.viblo.asia/e0c2a4a0-ed99-49d0-a2e0-0518448b1d24.png)

**Lib**: chứa các file thư viện mã nguồn cơ sở của framework.

![](https://images.viblo.asia/f52e5960-275e-441a-8b78-9731ded7bbaa.png)


**Modules**: Đây là nơi chứa các module thực tế của Metasploit
Framework dùng cho khai thác, các chức năng phụ để kiểm tra khả năng tấn
công, các module cho việc mã hóa...

![](https://images.viblo.asia/d41ad31a-b405-4fd1-b0c0-81ca83e0d4c1.png)

**Plugins**: Metasploit bao gồm rất nhiều plugins, nó là các đoạn chương trình nhỏ hỗ trợ trong quá trình sử dụng Metasploit.

![](https://images.viblo.asia/dc07de1d-aa1e-4c3e-82a7-1e39f2d147ff.png)

**Tools**: Nơi chứa các lệnh command-line tiện ích được sử dụng trong
quá trình khai thác

![](https://images.viblo.asia/c936d187-e4b9-4bc7-a496-ebe2733f8b4a.png)

**Scripts**: Nơi chứa “meterpreter” và các kịch bản mã khai thác khác.

![](https://images.viblo.asia/2dffd579-4212-420d-8344-930113590cef.png)

Ngoài ra Metasploit Framework còn có các thư viện khác nhau:

**Rex**: chứa các thư viện cơ bản cho mọi tác vụ của Metasploit
Framework.

**Msf:Core**: cung cấp một API cho việc phát triển mã khai thác. Đây
cũng là phần cần quan tâm để có thể viết mã khai thác lỗ hổng cho ứng dụng
web.

**Msf:Base**: thư viện này cung cấp các API được thiết kế cho việc phát
triển giao diện.

![](https://images.viblo.asia/b501030f-c341-4adc-8a4c-5535df13017a.png)

# 2.1. Payload

Một payload trong Metasploit-Framework thường được "ánh xạ" bởi một module khai thác. Bản thân nó chứa các đoạn mã sẽ được thực thi trên mục tiêu khi tấn công. Những  payload này được sử dụng rất linh hoạt và có giá trị
sử dụng lớn trong nhiều loại kịch bản tấn công khác nhau.

Có ba loại payload:

**Singles**: Những payload này hoàn toàn khép kín và có thể hoạt động
25một cách độc lập không kết nối với bất cứ điều gì. Nó thường dùng để làm
những việc đơn giản như là thêm một người dùng vào trong hệ thống của mục
tiêu hay đơn giản là mở một chương trình nào đó trên mục tiêu bị tấn công.
Các payload dạng này thường chỉ chạy một lần duy nhất.

**Stagers**: Payload này sẽ tạo ra một kết nối mạng giữa kẻ tấn công và
mục tiêu. Nó được thiết kế để đảm bảo tính nhỏ gọn và xác thực tính khả thi
của việc tấn công. Nó cũng được thiết kế để tải xuống các payload “Stages”.

**Stages**: Đây là các payload được tải xuống bới “stagers”. Nó có kích
thước lớn, thiết kế với nhiều tùy chọn, chức năng khác nhau.

# 2.2. Meterpreter 
Đây là một payload nâng cao có trong Metasploit-Framework. Mục đích của nó là để
cung cấp những tập lệnh để khai thác, tấn công các mục tiêu. Nó được viết từ
các thành phần phát triển dưới dạng thư viện liên kết động (DLL) files.

Meterpreter và các thành phần mở rộng được thực thi trong bộ nhớ, hoàn toàn
không được ghi lên đĩa nên có thể tránh được sự phát hiện từ các phần mềm
chống virus.

Meterpreter cung cấp một tập lệnh để người sử dụng có thể khai thác
trên mục tiêu:

**Fs**: Cho phép tải lên và tải xuống các tệp từ máy bị tấn công.

**Net:** : Cho phép xem thông tin mạng của máy bị tấn công như IP, bảng
định tuyến (route table).

**Process**: Cho phép tạo các chương trình chạy mới trên máy bị tấn
công.

**Sys**: Cho phép xem thông tin hệ thống của máy bị tấn công.

# 3. Quy trình kiểm thử cơ bản trên Metasploit Framework.

**Tổng Quan**

Có 2 hình thức khi sử dụng Metasploit-Framework:
- Sử dụng các module để dò quét và tấn công vào lỗ hổng bảo mật của
đối tượng.
- Tạo mã độc (Trojan), rồi bằng một cách nào đó truyền mã độc vào
máy nạn nhân và lừa nạn nhân kích hoạt nó.

Về cơ bản thì Metasploit Framework sử dụng hệ quản trị cơ sở dữ liệu
PostgreSQL để lưu trữ các cấu hình, payload phục vụ cho các nhiệm vụ khác
nhau trong quá trình kiểm thử.

Quá trình kiểm thử này trải qua các bước như sau:

**Bước 1**: Phát hiện, xác định các mục tiêu cần tấn công và thu thập
thông tin về mục tiêu đó. Ở bước này ta chủ yếu sử dụng Module
Auxiliary/Scanner và các công cụ dò quét khác như “Nmap” được tích hợp
sẵn.

**Bước 2:** Lựa chọn một mục tiêu vừa tìm được ở bước 1.

**Bước 3**: Dựa vào các thông tin mà Module Auxiliary vừa cung cấp. Từ
đó tìm kiếm các lỗ hổng và mã khai thác liên quan đến mục tiêu. Dùng
module Auxiliary để xác thực các lỗ hổng đã tồn tại thật sự trên các mục tiêu.

**Bước 4:** Tiến hành thực hiện tấn công thông qua các mã khai thác.

**Bước 5:** Tiến hành triển khai các mã độc và duy trì kết nối sau khi xâm
nhập thành công.

**Bước 6**: Xóa  vết.

Quy trình trên có thể thay đổi tùy thuộc vào mục tiêu trong thực tế.

Ngoài việc sử dụng các module khai thác có sẵn, Metasploit Framework hỗ trợ  mạnh mẽ cho
việc người sử dụng tự tạo các đoạn mã khai thác dựa trên API có sẵn của nó.

**Các bước thực hiện khai thác**


Sau đây là các cú pháp lệnh lần lượt theo các bước cơ bản để khai thác
lỗ hổng bảo mật trong thực tế:

- Khởi động Metasploit-Framework

Khởi động MSF bằng lệnh `msfconsole.` 

*Nếu là lần đầu tiên chạy MSF thì cần chạy lệnh “msfdb init” trước để
tạo database (cơ sở dữ liệu). Cơ sở dữ liệu này là nên tảng lưu trữ tất cả các
thông tin dữ liệu cần thiết của MSF.*

*Ngoài ra cần chạy lệnh `msfupdate`. Đây là lệnh để MSF tự động cập
nhật các module, các thông tin về các lỗ hổng mới nhất trên kho chứa (repository) của MSF.*

- Lựa chọn module để khai thác:

Sử dụng lệnh “search” để tìm kiếm các module liên quan đến mục tiêu
cần kiểm thử. Một lỗ hổng bảo mật được định nghĩa trong MSF thường có 2
module, một là “auxiliary” dùng để rò quét xác định xem mục tiêu có dính lỗi
này không, hai là “exploit” dùng để khai thác lỗ hổng.
![](https://images.viblo.asia/4ff5a809-6aad-478d-bc7a-7acb9f8f8573.png)

- Sau khi tìm kiếm được module dùng để khai thác, dùng lệnh “use
[đường_dẫn_module]” để sử dùng module đó.
Tiếp tục gõ `show info `để xem các thông tin và tùy chọn của module.

![](https://images.viblo.asia/c9bfc8ab-409e-49d8-9ca5-915910df4505.png)

- Cấu hình cho module đã chọn:
Sử dụng lệnh `show options` để xem những options cần cấu hình. Và
dùng lệnh` set [tên options] [giá trị]` để cấu hình cho options.

![](https://images.viblo.asia/3fe780f8-552a-4fa4-a31f-0b60339a7deb.png)

Một số tham số hay gặp:
> LHOST: local host, là địa chỉ ip của máy tấn công. Địa chỉ ip này phải
> đảm bảo mục tiêu tấn công có khả năng kết nối tới.
> 
> LPORT: cổng để MSF lắng nghe tín hiệu gửi về.
> RHOST: remote host, là địa chỉ ip của mục tiêu cần tấn công.
> RPORT: cổng được mở trên mục tiêu để MSF kết nối đến và khai
> thác.
> 
> Sau khi thiết lập các thông số, có thể dùng lệnh “check” để kiểm tra lại
> các thông số cấu hình đã đúng chưa.

- Lựa chọn payload:
Payload là đoạn code mà sẽ chạy trên hệ thống máy tính được điều
khiển từ xa. Tùy thuộc vào module khai thác lỗ hổng nào mà module đó sẽ hỗ
trợ các payload khác nhau.

> Sử dụng lệnh` show payloads `để liệt kê ra những payload của module
> exploit hiện tại.
> 
> Sử dụng lệnh `info [Tên của payload] `để xem thông tin chi tiết về
> payload đó.
> 
> Sử dụng lệnh `set PAYLOAD [Tên payload]` để xác định payload
> module name.
> 
>  Sau khi lựa chọn payload nào, dùng lệnh show option để xem những
> option của payload đó.

Với một số payload có thể hỗ trợ thêm các tùy chọn nâng cao. Sử dụng
lệnh “show advanced” để xem những tùy chọn này của payload đó.

- Sau khi cấu hình tất cả các bước trên thành công, sử dụng lệnh
“**exploit**” để thực hiện tấn công mục tiêu.

# 4. Cấu trúc của một Module khai thác
Cấu trúc của một module khai thác luôn cần các phần chính như sau:

- Payload Information Block: khối thông tin của Payload. Dùng để khai
báo các thông tin cơ bản về payload.

- Một danh sách các mục tiêu có sẵn được phác thảo.

- Phần kế thừa các hàm exploit(), run(), check().

Hàm *check ()* giúp xác minh việc có thể khai thác được tính có thể khai
thác của mục tiêu và không thực sự chạy các payload trên mục tiêu.

Mục đích của hàm *check ()* là để xác định xem mục tiêu có thể bị tấn
công hay không.

Hàm *check ()*  trả về giá trị kiểm tra đã được xác định:
- CheckCode::Safe - không thể khai thác.
- CheckCode::Detected - dịch vụ được phát hiện.
- CheckCode::Appears - phiên bản dễ bị tấn công.
- CheckCode::Vulnerable - đã xác nhận.
-  CheckCode::Unsupported - kiểm tra không được hỗ trợ cho module 
này.


```ruby
class Metasploit3 > Msf::Exploit::Remote
    include Msf::Exploit::Remote::TCP
    def initialize
            super(
            'Name' => 'Simplified ExploitModule',

            'Description' => 'This module sends a payload',
            'Author' => 'My Name Here',
            'Payload' => {'Space' => 1024,'BadChars' => “\x00”},

            'Targets' => [['Automatic',{}]] ,

            'Platform' => 'win',
            )

            register_options( [
                Opt::RPORT(12345)
            ], self.class)
            end
# Connect to port, send the payload, handle it, disconnect

def exploit
    connect()
    sock.put(payload.encoded)
    handler()
    disconnect()
  end
end
```

Hàm exploit() chính là hàm tiếp theo cần được viết. Đây cũng là
phần quan trọng nhất của mã khai thác. Nó làm thành phần chính thực hiện
các bước để có thể tái hiện lại lỗ hổng thành công. 

Đối với các đoạn mã khai thác lỗ hổng ứng dụng web thì hàm exploit thường sẽ thực hiện việc gửi và
nhận các yêu cầu và phản hồi từ phía máy chủ. 

Xứ lý các phản hồi này và
khai thác các lỗ hổng trên đó. Từ đó thực hiện khai thác như thực thi mã từ xa, lấy cắp thông tin, ...

Ví dụ về một hàm check() trong thực tế:

```ruby 
def check
    # connect to get the FTP banner
    connect
    # grab banner
    banner = banner = sock.get_once
    # disconnect since have cached it as self.banner
    disconnect
    case banner
        when /Serv-U FTP Server v4\.1/
            print_status('Found version 4.1.0.3, exploitable')
            return Exploit::CheckCode::Vulnerable
        when /Serv-U FTP Server/
              print_status('Found an unknown version, try it!');
              return Exploit::CheckCode::Detected
        else
            print_status('We could not recognize theserver banner')
            return Exploit::CheckCode::Safe
            end
            return Exploit::CheckCode::Safe
        end
```
# 5. Tổng Kết
Trên đây là những kiến thức cơ bản nhất mình lượm nhặt được về Metasploit Framework. Tại các phần tiếp theo, chúng ta sẽ cùng tìm hiểu và xây dựng các module khai thác trên nền tảng tuyệt vời này. :grinning:

Tài liệu tham khảo : 

https://github.com/rapid7/metasploit-framework/wiki

https://www.offensive-security.com/metasploit-unleashed/

Thank to @doandinhlinh