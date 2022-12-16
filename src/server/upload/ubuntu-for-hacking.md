![](https://images.viblo.asia/1e5cb7a4-698d-40cc-9408-a8c105d5c4ae.png)

Bạn đang sở hữu một VPS sử dụng hệ điều hành Ubuntu và muốn biến nó thành thứ "vũ khí" đắc lực trợ giúp cho công việc Pentest/Hacking của mình?
Vây dưới đây là những công cụ mà mình nghĩ bạn nên cài đặt để hoàn thành công việc đó.

## Các công cụ nên cài đặt
### 1. Ruby/ Python/ Perl
Hiện nay phần lớn các mã khai thác đều phát triển dựa trên các ngôn ngữ kịch bản như Ruby / Python / Perl. Vì vậy hãy đảm bảo máy chủ của bạn được cài sẵn các ngôn ngữ này

Cài đặt Python3
```bash 
sudo apt install software-properties-common
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt install python3.8
```

Cài đặt ruby

```bash
sudo apt-get update
sudo apt-get install ruby-full
```

Cài đặt Perl

```bash
sudo apt-get update
sudo apt-get install perl
```
### 2. Nmap
Nmap là một trong các công cụ hacking nổi tiếng nhất trên thế giới và trong phim ảnh. Nó cung cấp khả năng dò quét port và lỗ hổng trên máy chủ cực kỳ mạnh mẽ với độ chính xác cao. 

Cài đặt nmap

```bash
sudo apt-get install nmap
```

### 3. Metasploit framework
Ra đời vào năm 2003 bởi tác giả H. D. Moore - Metasploit Framework là tên của một dự án bảo mật máy tính nhằm giúp tổng hợp, cung cấp thông tin về các lỗ hổng bảo mật đồng thời hỗ trợ khai thác các lỗ hổng này .

Metasploit Framework tập trung vào việc triển khai nhanh các bước khai thác lỗ hổng bảo mật và phát triển các hệ thống phát hiện xâm nhập. Ban đầu nó được viết trên nền tảng ngôn ngữ lập trình Perl với các thành phần chính được viết bằng C và Python, sau này được viết lại bằng Ruby. Năm 2009, Metasploit được Rapid7 – một công ty chuyên về bảo mật mua lại.

Trên Kali linux, Metasploit framework được cài đặt mặc định. Đối với các nền tảng khác như Windows, macOS ... người sử dụng cần cài đặt một cách thủ công.

Cài đặt Metasploit Framework trên Ubuntu

```bash
curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall && chmod 755 msfinstall && ./msfinstall
```

> Riêng với công cụ này, mình đã có loạt 4 bài viết hướng dẫn cách sử dụng đồng thời phát triển các module khai thác. Các bạn quan tâm có thể theo dõi tại [đây](https://viblo.asia/p/ky-thuat-khai-thac-lo-hong-bao-mat-web-tren-metasploit-framework-p1-4dbZNJw8ZYM) 

### 4. Sqlmap
Sqlmap là công cụ rất đáng tin cậy trong công việc khai thác lỗ hổng bảo mật SQL Injection. Nhưng thông thường, nếu bạn sử dụng trên máy tính cá nhân. Nhiều khả năng Sqlmap sẽ không phát huy được tối đa hiệu quả do việc bị chặn các payload độc hại từ phía firewall của công ty hay của nhà mạng. Nên công cụ này chỉ hoạt động tốt nhất khi được cài đặt và sử dụng trên Server 

Cài đặt sqlmap
```bash
sudo apt-get install sqlmap
```
### 5. Nikto
Nikto là công cụ đầu tiên mà mình được tiếp xúc khi tìm hiểu về bảo mật. Tuy rằng hiện tại mình ít sử dụng trong công việc dò quét - nhưng không thể phủ nhận rằng, nó là một công cụ rất mạnh mẽ trong quá trình scan lỗ hổng. Đặc biệt là các lỗ hổng dịch vụ trên server

Cài đặt Nikto
```bash
sudo apt-get install nikto
```

### 6. Nuclei
Nuclei hiện tại đang là "ngôi sao sáng" trong lĩnh vực dò quét lỗ hổng bảo mật. Với khả năng tìm lỗ hổng "siêu việt" cộng với tỉ lệ False positives cực thấp. Nuclie ngày càng được cộng đồng bảo mật phát triển và tin dùng.
> Trong một số trường hợp mình được biết, Nuclie cập nhật template scan trước khi lỗ hổng được gán mã CVE

Cài đặt Go
```bash
sudo apt-get install golang
```
Cài đặt Nuclie
```bash
GO111MODULE=on go get -v github.com/projectdiscovery/nuclei/v2/cmd/nuclei
```
### 7. Setoolkit
Setoolkit là công cụ Phishing nổi tiếng nhất hiện nay. Nó cung cấp cho bạn nhiều tùy chọn tấn công như "Phishing email", "Phishing SMS" hay "Phising Web Application" mà bạn không cần viết một dòng code nào. Đồng thời đây cũng là một công cụ hỗ trợ phát tán Malware rất đắc lực

Cài đặt Setoolkit
```bash
git clone https://github.com/trustedsec/social-engineer-toolkit/ setoolkit/
cd setoolkit
pip3 install -r requirements.txt
python setup.py
```

> 
DISCLAIMER: This is only for testing purposes and can only be used where strict consent has been given. Do not use this for illegal purposes, period. Please read the LICENSE under readme/LICENSE for the licensing of SET.


### 8. John the Ripper
John the Ripper là công cụ da-zi-năng trong lĩnh vực crack. Bạn có thể crack bất cứ thứ gì. từ mật khẩu file ZIP , Hash Password Shadow cho đến các dịch vụ SSH, RDP... Miễn là bạn may mắn, 

cài đặt John The Ripper
```bash
sudo apt-get install john
```

### 9. WPSCAN
WPSCAN sẽ là công cụ hữu dụng trong trường hợp mục tiêu bạn kiểm thử sử dụng nền tảng Wordpress


Cài đặt các gói phụ thuộc
```bash
sudo apt-get install curl git libcurl4-openssl-dev make zlib1g-dev \
gawk g++ gcc libreadline6-dev libssl-dev libyaml-dev \
liblzma-dev autoconf libgdbm-dev libncurses5-dev automake \
libtool bison pkg-config ruby ruby-bundler ruby-dev libsqlite3-dev sqlite3 -y
```
Cài đặt Ruby Version Manager (RVM)

```bash
gpg --keyserver hkp://pool.sks-keyservers.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB

\curl -sSL https://get.rvm.io | bash -s stable --ruby
```

```bash
gem install nokogiri
gem install wpscan 
```

Cài đặt WPSCAN qua sources (Ubuntu 20.04)

```bash
git clone https://github.com/wpscanteam/wpscan
cd wpscan/
bundle install
rake install
```

### 10. Gobuster
Gobuster là công cụ mạnh mẽ và hiệu quả trong việc dò tìm các folder và file "ẩn" trên Web Application. Nó sẽ tìm ra những thư mục, đường dẫn, file nhạy cảm trên Server mà lập trình viên vô tình bỏ qua. Từ đó tạo tiền đề để tấn công vào hệ thống

Cài đặt
```bash
go install github.com/OJ/gobuster/v3@latest
```

### 11. Weevely

Weevely là công cụ tạo web-shell mà bản thân mình khá yêu thích. Nó giúp tạo ra những mã độc hại "ẩn" trên server mà rất khó bị phát hiện bởi các công cụ dò quét


```
:audit_filesystem	Audit the file system for weak permissions.
:audit_suidsgid	Find files with SUID or SGID flags.
:audit_disablefunctionbypass	Bypass disable_function restrictions with mod_cgi and .htaccess.
:audit_etcpasswd	Read /etc/passwd with different techniques.
:audit_phpconf	Audit PHP configuration.
:shell_sh	Execute shell commands.
:shell_su	Execute commands with su.
:shell_php	Execute PHP commands.
:system_extensions	Collect PHP and webserver extension list.
:system_info	Collect system information.
:system_procs	List running processes.
:backdoor_reversetcp	Execute a reverse TCP shell.
:backdoor_tcp	Spawn a shell on a TCP port.
:bruteforce_sql	Bruteforce SQL database.
:file_gzip	Compress or expand gzip files.
:file_clearlog	Remove string from a file.
:file_check	Get attributes and permissions of a file.
:file_upload	Upload file to remote filesystem.
:file_webdownload	Download an URL.
:file_tar	Compress or expand tar archives.
:file_download	Download file from remote filesystem.
:file_bzip2	Compress or expand bzip2 files.
:file_edit	Edit remote file on a local editor.
:file_grep	Print lines matching a pattern in multiple files.
:file_ls	List directory content.
:file_cp	Copy single file.
:file_rm	Remove remote file.
:file_upload2web	Upload file automatically to a web folder and get corresponding URL.
:file_zip	Compress or expand zip files.
:file_touch	Change file timestamp.
:file_find	Find files with given names and attributes.
:file_mount	Mount remote filesystem using HTTPfs.
:file_enum	Check existence and permissions of a list of paths.
:file_read	Read remote file from the remote filesystem.
:file_cd	Change current working directory.
:sql_console	Execute SQL query or run console.
:sql_dump	Multi dbms mysqldump replacement.
:net_mail	Send mail.
:net_phpproxy	Install PHP proxy on the target.
:net_curl	Perform a curl-like HTTP request.
:net_proxy	Run local proxy to pivot HTTP/HTTPS browsing through the target.
:net_scan	TCP Port scan.
:net_ifconfig	Get network interfaces addresses.
```
Cài đặt Weevely
```
git clone https://github.com/epinna/weevely3.git
cd weevely3
pip3 install -r requirements.txt
```

### 12. Bot

Bản chất đây không phải là một tools cụ thể nào. Các bạn có thể tự do phát triển Bot trên nhiều nền tảng khác nhau như Chatwork, Telegram, Slack ... Việc sử dụng Bot trong việc thông báo các lỗ hổng bảo mật VPS tìm được sẽ giúp tiết kiệm thời gian và công sức của bạn hơn rất nhiều.
### 13.  Kali linux tools

Đây là công cụ mình ít khuyên các bạn dùng nhất. Kali Linux Tools bản chất là một công cụ tiện dụng - đơn giản - nhanh chóng biến máy chủ Ubuntu của bạn thành một máy chủ Pentest đúng nghĩa. Nhưng bên cạnh đó, nó cũng tạo ra nhiều các công cụ ít dùng tới làm lãng phí tài nguyên hệ thống

Cài đặt
```bash
sudo su
git clone https://github.com/LionSec/katoolin.git && cp katoolin/katoolin.py /usr/bin/katoolin
chmod +x /usr/bin/katoolin
sudo katoolin
```




## Tổng kết

Trên đây là các công cụ phục vụ đắc lực cho công việc Hacking/ Pentesting mà bạn nên cài đặt và sử dụng trên VPS. Có thể còn nhiều công cụ tấn công hiệu quả khác mà mình đã vô tình bỏ qua. Mong các bạn đóng góp ý kiến để mình bổ sung trong thời gian sắp tới. Mình xin cảm ơn