# Giới thiệu về Wordpress và Wpscan
## Giới thiệu về Wordpress
WordPress là một phần mềm nguồn mở (Open Source Software 1) được viết bằng ngôn ngữ lập trình website PHP và sử dụng hệ quản trị cơ sở dữ liệu MySQL; cũng là bộ đôi ngôn ngữ lập trình website thông dụng nhất hiện tại. WordPress được ra mắt lần đầu tiên vào ngày 27/5/2003 bởi tác giả Matt Mullenweg và Mike Little. Hiện nay WordPress được sở hữu và phát triển bởi công ty Automattic có trụ sở tại San Francisco, California thuộc hợp chủng quốc Hoa Kỳ.

WordPress là một mã nguồn mở bằng ngôn ngữ PHP để hỗ trợ tạo blog cá nhân, và nó được rất nhiều người sử dụng ủng hộ về tính dễ sử dụng, nhiều tính năng hữu ích.
WordPress phát triển rất mạnh với cộng đồng nhà phát triển các Themes (Giao diện) và các Plugins (Module chức năng) rất lớn. Với trên 55000 plugins giúp người dùng có thể dễ dàng sử dụng rất nhiều tính năng khác nhau từ: bán hàng, quản lý công việc, quản lý hệ thống, học tập, blog  cá nhân, web doanh nghiệp,...

Theo thống kê năm 2021 tại [barn2](https://barn2.com/wordpress-market-share/#:~:text=Number%20of%20websites%20using%20WordPress,manage%20it%20from%20any%20computer.) số lượng website Wordpress đang sử dụng trên thế giới là 1,3 tỉ website. Với một số lượng cực kỳ lớn website như vậy, vấn đề bảo mật cho các website chạy Wordpress CMS là vô cùng quan trọng. Hàng năm có rất nhiều các website wordpress bị tấn công bởi một số lỗ hổng phổ biến như: Đặt mật khẩu quản trị yếu, sử dụng các phiên bản Wordpress cũ, sử dụng plugin phiên bản cũ chứa lỗ hổng... Để giảm thiểu rủi ro và phòng tránh website bị tấn công, bài viết này mình sẽ giới thiệu tới mọi người công cụ WPScan - một công cụ chuyên rà quét các lỗ hổng bảo mật trên website chạy Wordpress CMS.
## Giới thiệu Wpscan
Wpscan là một công cụ mã nguồn mở với mã nguồn được public tại: https://github.com/wpscanteam/wpscan. Đây là một công cụ hoàn toàn miễn phí và được sử dụng rộng rãi.

Wpscan được sử dụng để dò quét, phát hiện và tấn công một số lỗ hổng bảo mật trên website Wordpress. Một số tính năng chính của công cụ:
- Kiểm tra phiên bản Wordpress Core, Plugin, Themes... để phát hiện các lỗ hổng bảo mật của phiên bản hiện tại
- Kiểm tra mã nguồn website để tìm lỗ hổng XSS, SQL Injection, Local Attack hoặc các lỗ hổng khác tại https://wpvulndb.com/ thông qua các mã CVE
- Thu thập thông tin users có treen hệ thống
- Tấn công Brute Force  tài khoản quản trị của Website
# Cài đặt và sử dụng Wpscan
## Cài đặt WPScan
**Kali Linux**
- WPScan là một công cụ được tích hợp sẵn trên hệ điều hành Kali Linux. Nếu bạn đang sử dụng hệ điều hành này thì có thể sử dụng nó luôn trong bộ công cụ của Kali Linux.

**Ubuntu 14.04 hoặc cao hơn**

```
sudo apt-get install libcurl4-openssl-dev libxml2 libxml2-dev libxslt1-dev ruby-dev build-essential

git clone https://github.com/wpscanteam/wpscan.git

cd wpscan

sudo gem install bundler && bundle install --without test
```

**CentOS / Fedora**
```
sudo yum install gcc ruby-devel libxml2 libxml2-devel libxslt libxslt-devel libcurl-devel patch

git clone https://github.com/wpscanteam/wpscan.git

cd wpscan

sudo gem install bundler && bundle install --without test
```



**macOSX via Homebrew**

`brew install wpscanteam/tap/wpscan`

**From RubyGems**

`gem install wpscan`

On MacOSX, if a Gem::FilePermissionError is raised due to the Apple's System Integrity Protection (SIP), either install RVM and install wpscan again, or run `sudo gem install -n /usr/local/bin wpscan `

**Docker**

Pull the repo with: `docker pull wpscanteam/wpscan`
## Sử dụng WPScan
Khi sử dụng WPScan, công cụ sẽ sử dụng danh sách các lỗ hổng được công bố trên https://wpscan.com/ để phát hiện lỗ hổng của phiên bản Wordpress đang sử dụng. Các lỗ hổng bao gồm: Wordpress Core, Plugin, Theme
### Update database
- Để cập nhật database của WPScan các bạn sử dụng lệnh: `wpscan --update`
### Enumeration Modes
- WpScan sử dụng các mode để enumerate thông tin users, plugin, themes là: **passive** (thụ động - scan với lượng request ít và tránh gây DOS server), **aggressive** (Chủ động - Scan với số lượng request lớn và liên tục tới server), **mixed** (Kết hợp cả 2). Mặc định WPScan sẽ scan với mode :mixed
### Enumeration Options
WPScan cung cấp các options để thu thập thông tin users, plugin, themes như sau:
- `- vp` (Vulnerable plugins): Danh sách các plugin có lỗ hổng
- `- ap` (All plugins): Danh sách toàn bộ plugin được cài đặt
- `- p` (Popular plugins): Những plugin phổ biến được cài đặt
- `- vt` (Vulnerable themes): Danh sách các theme có lỗ hổng
- `- at` (All themes): Danh sách toàn bộ các theme được cài đặt
-`- t` (Popular themes): Danh sách các theme phổ biến
- `-  tt` (Timthumbs): 
- `- cb` (Config backups): Tìm kiếm các file backup có trong web server
- `- dbe` (Db exports): Tìm kiếm các bản db export
-`- u` (User IDs range. e.g: u1-5): Tìm kiếm danh sách users trong hệ thống (Muốn tìm theo id sử dụng options: `-u1-5`
- `- m` (Media IDs range. e.g m1-15): Tìm kiếm các file media trên hệ thống


Scan với api-token
Việc sử dụng api để scan giúp chúng ta phát hiện được thêm nhiều thông tin và lỗ hổng của các plugin, theme được public trên  website https://wpscan.com

- Để sử dụng api key, các bạn đăng nhập tài khoản và vào mục: Profile để lấy được api key

![](https://images.viblo.asia/ca4e43a7-4b2e-4d4a-b4ee-d9f729187d98.png)

- Thêm option `--api-token` khi scan để scan với apikey
# Demo kiếm lỗ hổng và khai thác lỗ hổng với WPScan
## Scan website thu thập thông tin:
**Scan website:**

`wpscan --url http://thiennv.com/wordpress/ -e vp --plugins-detection mixed -e u`

**Sử dụng thêm api-token để scan**

`wpscan --url http://thiennv.com/wordpress/ -e vp --plugins-detection aggressive --api-token QZhn2Ior.....gzbOYbREHYk`

**Danh sách user scan được:**

![](https://images.viblo.asia/8832c540-fb11-4e70-86a1-f2e8399e0c37.png)

**Danh sách plugins và themes**
- Plugins:

![](https://images.viblo.asia/b26fd00e-bda7-46fa-946f-90b6ef251981.png)

-Themes: 

![](https://images.viblo.asia/dd08df17-0693-4532-b3ae-59c931c2d69f.png)


**Tiến hành brute fore mật khẩu tài khoản**

`wpscan --url http://thiennv.com/wordpress/ --usernames admin,editor --passwords /usr/share/wordlists/rockyou.txt`

- Kết quả: Tài khoản `admin:123456`
![](https://images.viblo.asia/c69e9e34-bfaf-4870-9466-af7ace686cf5.png)


**Đăng nhập với tài khoản admin và thực hiện RCE thông qua chức năng theme editor**
- Sửa file : `wp-content/themes/twentytwenty/404.php` thành shell code php:
- 
![](https://images.viblo.asia/41fff508-133a-4e3b-b704-2b074beb7123.png)

- Truy cập file và  thực hiện lệnh tùy ý trên server:

![](https://images.viblo.asia/f7384b63-450e-4aee-8a38-becbfc3eaecc.png)
# Tổng kết
Bà viết mang tính chất giới thiệu công cụ và cách sử dụng tới đối tượng là quản trị viên website wordpress muốn đảm bản an ninh cho website của mình, các tester hoặc pentester sử dụng trong quá trình kiểm thử bảo mật. Mọi hành vi sử dụng công cụ trên nhằm tấn công vào bất kỳ webiste của đơn vị hay tổ chức nào là vi phạm pháp luật và mình hoàn toàn không chịu trách nhiệm.

**Để đảm bảo an toàn cho Website Wordpress, các quản trị viên thực hiện các bước sau:**
- Luôn cập nhật phiên bản mới nhất cho phiên bản Wordpress, Plugin, Theme
- Không sử dụng mật khẩu yếu khi quản trị, đặt mật khẩu mạnh cho tài khoản ( >= 8 ký tự, có các ký tự: hoa, thường, ký tự đặc biệt và số)
- Sử dụng Wpscan tự kiểm tra website của mình thường xuyên để phát hiện cac vấn đề bảo mật
- Theo dõi các tin tức, lỗ hổng bảo mật trên https://wpscan.com/

Cảm ơn các bạn đã theo dõi bài viết!