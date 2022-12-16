![](https://images.viblo.asia/a6bf2d07-e44e-4f4e-b294-33212d6546fa.jpg)

Bạn đang sử dụng Wordpress cho Website bán hàng của mình với hàng nghìn lượt truy cập đều đặn mỗi ngày - hàng chục đơn hàng vẫn được thực hiện trơn tru mỗi giờ. Bỗng một sáng thức dậy, bạn thấy số lượng truy cập sụt giảm nghiêm trọng. Số đơn hàng bằng 0 và bạn tự hỏi chuyện quái gì đang diễn ra vậy ? 

Bạn truy cập vào Website của mình  và thấy hàng trăm quảng cáo lạ thi nhau nhảy múa trên màn hình. Sau đó cứ mỗi click chuột lại đưa bạn tới một website nào đó xa lạ .... Đúng rồi đó, tình huống này bạn đã rơi vào hoàn cảnh éo le nhất của người bán hàng online ... bị Hack .Vậy chúng ta sẽ xử lý nó như nào ?

# 1. Tại sao bạn lại bị Hack?
Đây là câu hỏi rất quan trọng mà bạn phải trả lời. Nếu chỉ đơn giản tìm kiếm cụm từ "Khắc phục Wordpress bị mã độc" chắc hẳn bạn sẽ gặp được ngay hàng chục cách hướng dẫn với đủ loại thứ tiếng. Tây có, Ta có, Tàu có. Nhưng thường nó chỉ có thể hướng dẫn bạn cách xử lý mà không đưa ra nguyên nhân. Khi không tìm được nguyên nhân, thì sớm muộn gì Hacker cũng quay trở lại.

## 1.1. Đóng vai Hacker - Hack lại website của bạn

### 1.1.2. Kiểm tra thông tin đăng nhập
* Kiểm tra đường dẫn tới khu vực quản trị website có đang để mặc định không (/wp-admin , /wp-login.php) hay có quá dễ đoán hay không (/admin , /administrator, /quantri ..)
* Kiểm tra mật khẩu của bạn đã đảm bảo an toàn chưa (đủ độ dài, chữ Hoa , chữ Thường , không liên quan tới thông tin bản thân , không dùng chung với các dịch vụ khác...)

### 1.1.3. Kiểm tra "hàng xóm của bạn" đã an toàn chưa ?
* Nếu chỉ sử dụng một VPS duy nhất, bạn có thể bỏ qua điều này. Nhưng nếu đang sử dụng dịch vụ shared-hosting có lẽ bạn cần kiểm tra những website đặt cùng trên server đã đủ an toàn chưa? hiện có đang trong tình trạng bảo trì hay bị hack tương tự như trường hợp của bạn không? Đôi khi vấn đề không nằm ở website của bạn mà nằm ở chính những website đặt cùng trên server của bạn.

### 1.1.4. Kiểm tra Website của bạn đã đủ an toàn hay chưa?
*Đây có lẽ là phần mang nặng yếu tố kỹ thuật. Để có thể làm tốt bạn có thể nhờ hoặc thuê người khác làm hộ.*

**Sử dụng WPSCAN để dò quét lỗ hổng bảo mật trên Website của bạn** 

```WPSCAN là một công cụ mạnh mẽ và hiệu quả trong công việc dò quét các lỗ hổng bảo mật trên Wordpress```

**Cài đặt WPSCAN qua RubyGems** (Ubuntu 20.04)

Update & Upgrade hệ thống 
```bash
sudo apt-get update
sudo apt-get upgrade -y
```

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

**Cài đặt WPSCAN qua sources** (Ubuntu 20.04)

```bash
git clone https://github.com/wpscanteam/wpscan
cd wpscan/
bundle install
rake install
```

```
Finished in 58.84 seconds (files took 31.06 seconds to load)
6928 examples, 0 failures, 46 pending

Coverage report generated for RSpec to /root/wpscan/coverage. 1961 / 2295 LOC (85.45%) covered.
wpscan 3.8.1 built to pkg/wpscan-3.8.1.gem.
wpscan (3.8.1) installed.
```
![](https://images.viblo.asia/c0396b79-fa86-4f22-ab29-8f9122572730.png)

**Sử dụng WPSCAN để dò quét lỗ hổng bảo mật**

* Dò quét các lỗ hổng bảo mật trên themes

```bash
wpscan --url http(s)://www.yoursiteurl.com --enumerate vt
```

* Dò quét các lỗ hổng bảo mật trên plugins
```bash
wpscan--url http(s)://www.yoursiteurl.com --enumerate vp
```
* Dò quét các lỗ hổng bảo mật dựa trên api-key
```
wpscan --url http(s)://www.yoursiteurl.com -e vp --api-token API_KEY
```

Kết quả Scan bạn sẽ nhận được nội dung tương tự như sau:
![](https://images.viblo.asia/c9466900-01e8-4bdb-8535-4525eef6fe2b.png)

- Dấu [+] màu xanh cho biết themes/plugins của bạn có thể an toàn
-  Dấu [+] màu đỏ cho biết themes/plugins của bạn có vấn đề về bảo mật - bạn cần khắc phục ngay

### 1.1.4. Kiểm tra Server của bạn đã đủ an toàn hay chưa?
* Kiểm tra các port SSH,FTP ,RDP trên server của bạn đã đủ an toàn chưa? 

`Có dễ dàng truy cập từ Internet không ? mật khẩu có dễ đoán không?, có nằm trong danh sách mật khẩu phổ biến như [RockYou.txt](https://github.com/brannondorsey/naive-hashcat/releases/download/data/rockyou.txt) hay không?`
* Kiểm tra các file nhạy cảm "wp-config.php" , "/etc/passwd" , "/etc/shadow" có bị leak trên internet không? Bạn có vô tình upload chúng lên Github cá nhân hay không?

# 2. Bóc tách mã độc?
Sau khi đã kiểm tra khả năng hack từ ngoài vào trong. Chúng ta tiến hành bảo mật từ trong ra ngoài.

**Kiểm tra nội dung các file thay đổi trên hệ thống**

Đây có lẽ là bước phức tạp và mất nhiều thời gian của bạn nhất. Tình trạng bị tấn công khiến cho mã độc ở khắp mọi nơi trên website. Nếu không bóc tách kỹ , mọi công sức của bạn lại về con số 0.

Thông thường quá trình bóc tách mã độc của mình sẽ diễn ra như sau:

Kiểm tra các tệp đã sửa đổi gần đây trong WordPress 15 ngày qua:

```bash
find ./ -type f -mtime -15
```
30 ngày qua

```bash
find ./ -type f -mtime -30
```

Tiếp đó đọc nội dung từng file đáng ngờ (những file chèn những hàm không cần thiết **eval()**
**assert()**
**base64()**
**gzdeflate()**
**str_rot13()**, những file bị decode base64 , file có tên lạ). 

Để chắc chắn những suy đoán của mình, bạn có thể đối chiếu nội dung các file nghi ngờ với file gốc của Wordpress https://github.com/WordPress/WordPress hoặc bạn có thể thay thế để sử dụng luôn.

Một số "mã độc" PHP

```php
# Execute one command
<?php system("whoami"); ?>

# Take input from the url paramter. shell.php?cmd=whoami
<?php system($_GET['cmd']); ?>

# The same but using passthru
<?php passthru($_GET['cmd']); ?>

# For shell_exec to output the result you need to echo it
<?php echo shell_exec("whoami");?>

# Exec() does not output the result without echo, and only output the last line. So not very useful!
<?php echo exec("whoami");?>

# Instead to this if you can. It will return the output as an array, and then print it all.
<?php exec("ls -la",$array); print_r($array); ?>

# preg_replace(). This is a cool trick
<?php preg_replace('/.*/e', 'system("whoami");', ''); ?>

# Using backticks
<?php $output = `whoami`; echo "<pre>$output</pre>"; ?>

# Using backticks
<?php echo `whoami`; ?>
```

**Kiểm tra themes và plugins trên hệ thống**

Nếu bạn sử dụng themes và plugins từ các nguồn chính thống, vấn đề này có thể không quá quan trọng. Nhưng nếu bạn sử dụng từ các nguồn tài nguyên trái phép thì bạn cần kiểm tra thật kỹ nội dung này. Thông thường Hacker sẽ cài cắm các mã độc để lợi dụng website của bạn vào những mục đích bất hợp pháp. Chúng ta đều biết với nhau rằng "chẳng có bữa trưa nào là miễn phí cả" 

**Kiểm tra Databases**

Chúng ta tiến hành kiểm tra database xem có những tables hay columns lạ xuất hiện không ? Có những tài khoản lạ được thêm vào hay không? Hoặc có thể tiến hành restore với database đã backup từ thời điểm trước cuộc tấn công.

![](https://images.viblo.asia/abc4aeeb-9c2c-4b0b-94e7-e754e3cf75d4.png)

(Nguồn Ảnh https://sucuri.net)

**Kiểm tra độ an toàn của Server**

Tiến hành kiểm tra toàn diện Server, rà soát mã độc có thể còn sót lại đồng thời kiểm tra các account bất thường được thêm vào Server.
# 3. Bảo mật  
* Sử dụng duy nhất 1 VPS cho Website (tránh sử dụng Shared-Hosting)
* Thay đổi toàn bộ mật khẩu hiện tại đang sử dụng (SSH, Admin , RDP...)
* Cài đặt các Plugin bảo mật **Wordfence Security — Firewall & Malware Scan** , S**ucuri Security — Auditing, Malware Scanner and Security Hardening** ,**iThemes Security** ..vv..
* Sử dụng Firewall, hạn chế việc public trực tiếp các port nhạy cảm (SSH, RDP) ra ngoài internet  
* Update toàn bộ Wordpres Core , themes & Plugins - không sử dụng từ các nguồn không chính thống
* Theo dõi cập nhật các lỗ hổng bảo mật mới trên Wordpress để chủ động.kịp thời xử lý