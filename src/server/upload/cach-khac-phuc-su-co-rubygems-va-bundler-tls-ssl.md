Nếu bạn gặp sự cố liên quan đến chứng chỉ SSL và (hoặc) phiên bản TLS, bạn đã đến đúng nơi. Trong hướng dẫn này, chúng mình sẽ giải thích nguyên nhân của cả hai vấn đề đó và cách giải quyết chúng. Nhiều hướng dẫn trong bài viết này có thể giúp khắc phục sự cố chứng chỉ SSL hoặc sự cố phiên bản TLS.
Nếu bạn không quan tâm đến lý do và chỉ muốn khắc phục mọi thứ càng nhanh càng tốt, bạn có thể chuyển thẳng đến [các giải pháp cho các vấn đề SSL](https://bundler.io/v2.0/guides/rubygems_tls_ssl_troubleshooting_guide.html#solutions-for-ssl-issues) .
# 1. Vấn đề
## 1.1 Tại sao tôi lại nhìn thấy lỗi certificate verify failed?
Khi bạn thực hiện kéo các bản cập nhật từ RubyGems bằng lệnh `gem update` hoặc `gem install <your_gem>`, ... và gặp lỗi sau:

`OpenSSL::SSL::SSLError: SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed`.

Lỗi này xảy ra khi máy tính của bạn thiếu tệp mà nó cần xác minh rằng server đằng sau RubyGems.org là chính xác.

Phiên bản mới nhất của RubyGems sẽ khắc phục sự cố này, vì vậy chúng tôi khuyên bạn nên cập nhật lên phiên bản hiện tại. Để yêu cầu RubyGems tự cập nhật lên phiên bản mới nhất, hãy chạy lệnh `gem update --system`. Nếu cách đó không hiệu quả, hãy thử quy trình cập nhật thủ công bên dưới. 

> Cập nhật "nên khắc phục vấn đề này" có ý nghĩa gì với chúng ta? Hãy xem lại [Các chứng chỉ này là gì?](https://bundler.io/v2.0/guides/rubygems_tls_ssl_troubleshooting_guide.html#what-are-these-certificates) vàcác phần bên dưới [Ruby sử dụng chứng chỉ CA như thế nào?](https://bundler.io/v2.0/guides/rubygems_tls_ssl_troubleshooting_guide.html#how-ruby-uses-ca-certificates) để hiểu rõ hơn về các vấn đề cơ bản.

### 1.1.1 Các chứng chỉ này là gì?
Bất cứ khi nào máy tính của bạn giao tiếp với server (máy chủ) bằng HTTPS, nó sẽ sử dụng chứng chỉ SSL như một phần của kết nối đó. Chứng chỉ (certificate) cho phép máy tính của bạn biết rằng nó đang giao tiếp với máy chủ thực cho một domain và đảm bảo rằng giao tiếp giữa máy tính của bạn với máy chủ là hoàn toàn riêng tư (private) mà không có bất kỳ máy tính nào khác biết được những gì gửi qua lại.

Để biết chứng chỉ cho RubyGems.org có đúng hay không, máy tính của bạn tham khảo một chứng chỉ khác từ Tổ chức phát hành chứng chỉ (tên tiếng anh Certificate Authority (CA)).  Gói chứng chỉ CA bao gồm các chứng chỉ từ mọi công ty cung cấp chứng chỉ SSL cho các máy chủ, như Verisign, Globalsign và nhiều công ty khác. 

Mỗi CA có một chứng chỉ "root" được sử dụng để xác minh các chứng chỉ khác. Các chứng chỉ CA được gọi là “root” vì chúng ký (sign) các chứng chỉ khác (cái mà cũng có thể ký cho các chứng chỉ khác). Nói cách khác, biểu đồ của các chứng chỉ sẽ giống như một cái cây, với các chứng chỉ “root” ở gốc của cây.
![](https://docs.microsoft.com/en-us/windows/win32/seccertenroll/images/certificate-hierarchy.png)

Máy tính của bạn sẽ sử dụng gói CA tích hợp của nhiều chứng chỉ "root" để biết có nên tin tưởng chứng chỉ SSL được cung cấp bởi một trang web cụ thể, chẳng hạn như RubyGems.org hay không.

Đôi khi, các công ty mới được thêm vào gói CA hoặc các công ty hiện tại có chứng chỉ hết hạn và cần phân phối chứng chỉ mới. Đối với hầu hết các trang web, đây không phải là một vấn đề lớn, bởi vì các trình duyệt web thường xuyên cập nhật gói CA của họ như một phần của các bản cập nhật trình duyệt chung.

### 1.1.2 Cách Ruby sử dụng chứng chỉ CA
Chứng chỉ SSL được RubyGems.org sử dụng có nguồn gốc từ chứng chỉ root mới. Ruby (và do đó RubyGems và Bundler) không có gói CA được cập nhật thường xuyên để sử dụng khi tương tác với các trang web. Thông thường, Ruby sử dụng một gói CA do hệ điều hành (OS) cung cấp. Trên các hệ điều hành cũ hơn, gói CA này có thể thực sự cũ - như trong một thập kỷ. Khi một gói CA cũ không thể xác minh (new-ish) chứng chỉ cho RubyGems.org, bạn có thể thấy lỗi trong câu hỏi: `certificate verify failed`.

Mọi thứ phức tạp hơn nữa khi một thay đổi không liên quan khác 18-24 tháng trước dẫn đến một chứng chỉ SSL mới được cấp cho RubyGems.org. Điều này có nghĩa là chứng chỉ "roor" cần thiết để xác minh các kết nối đã thay đổi. Vì vậy, ngay cả khi trước đây bạn đã nâng cấp RubyGems / Bundler để khắc phục sự cố SSL, bạn sẽ cần phải nâng cấp lại — lần này lên phiên bản mới hơn với các chứng chỉ mới hơn.

### 1.1.3 Khắc phục sự cố lỗi chứng chỉ 
Bắt đầu bằng cách chạy kiểm tra SSL tự động và làm theo hướng dẫn. Bạn có thể cần cập nhật Bundler , cập nhật RubyGems , cập nhật thủ công chứng chỉ RubyGems hoặc thậm chí có thể cài đặt chứng chỉ hệ điều hành mới .

## 1.2 Tại sao tôi lại nhìn thấy read server hello A?
Lỗi này có nghĩa là máy của bạn không thể thiết lập kết nối an toàn đến RubyGems.org. Nguyên nhân phổ biến nhất cho vấn đề đó là một Ruby sử dụng phiên bản OpenSSL cũ. OpenSSL 1.0.1, phát hành ngày 12 tháng 3 năm 2012, là phiên bản tối thiểu bắt buộc để kết nối với RubyGems.org, bắt đầu từ ngày 1 tháng 1 năm 2018.

Để hiểu tại sao cần có phiên bản đó, hãy tiếp tục đọc. Để xem hướng dẫn về cách cập nhật OpenSSL và / hoặc Ruby để khắc phục sự cố, hãy chuyển đến phần **khắc phục sự cố** .

### 1.2.1 Phiên bản giao thức SSL và TLS
Các kết nối an toàn trên internet sử dụng HTTPS , phiên bản bảo mật của HTTP. Bảo mật đó ban đầu được cung cấp bởi SSL, từ viết tắt của Secure Sockets Layer. Theo thời gian, các nhà nghiên cứu đã phát hiện ra các lỗ hổng trong SSL và các nhà phát triển mạng đã phản hồi bằng các thay đổi và sửa chữa. Sau SSL 3.0, nó được thay thế bằng TLS, hoặc [Bảo mật lớp truyền tải](https://en.wikipedia.org/wiki/Transport_Layer_Security) .

Theo thời gian, TLS cũng được sửa đổi. TLS phiên bản 1.2, được xác định ban đầu vào năm 2011 và được hỗ trợ bởi OpenSSL bắt đầu từ năm 2012, là tiêu chuẩn hiện tại. Vào năm 2017, mọi phiên bản SSL và TLS cũ hơn TLS 1.2 đều được phát hiện có những lỗ hổng nghiêm trọng có thể bị khai thác bởi một đối thủ đã xác định hoặc có kiến thức. Do đó, các phương pháp bảo mật tốt nhất đề xuất chủ động chặn tất cả các phiên bản SSL, cũng như TLS phiên bản 1.0 và 1.1.

### 1.2.2 TLS 1.0 và 1.1 không được dùng nữa
RubyGems.org sử dụng nhà cung cấp CDN bên thứ 3 có tên [Fastly](https://www.fastly.com/) , cho phép người dùng trên khắp thế giới tải xuống gems thực sự nhanh chóng.

Năm ngoái, Fastly đã thông báo rằng họ sẽ ngừng sử dụng phiên bản TLS 1.0 và 1.1 do ủy quyền được công bố bởi Hội đồng Tiêu chuẩn Bảo mật PCI. ( [Đọc thêm về điều này trong bài đăng trên blog của Fastly](https://www.fastly.com/blog/phase-two-our-tls-10-and-11-deprecation-plan). )

Do đó, RubyGems.org sẽ yêu cầu TLSv1.2 tối thiểu bắt đầu từ tháng 1 năm 2018. Điều này có nghĩa là RubyGems.org và lênhj `gem` sẽ không còn hỗ trợ các phiên bản Ruby và OpenSSL không hỗ trợ TLS 1.2.

### 1.2.3 Khắc phục sự cố lỗi giao thức
Để khắc phục lỗi kết nối giao thức, hãy bắt đầu bằng cách chạy kiểm tra SSL tự động và làm theo hướng dẫn. Bạn có thể cần cập nhật Bundler , cập nhật RubyGems hoặc thậm chí cài đặt lại Ruby (bạn có thể tìm thấy hướng dẫn cài đặt lại bằng trình quản lý phiên bản hoặc trình quản lý gói .)

# 2. Giải pháp
## 2.1 Kiểm tra SSL tự động
Trước tiên, hãy chạy [tập lệnh này](https://github.com/rubygems/ruby-ssl-check/blob/master/check.rb) để kiểm tra xem lỗi của bạn là do sự cố chứng chỉ SSL hay sự cố phiên bản TLS.

Bạn có thể chạy tập lệnh ngay lập tức bằng lệnh này (cả Windows 10):

```
curl -Lks 'https://git.io/rg-ssl' | ruby
```

Nếu đầu ra có nội dung **“Your Ruby can’t connect to rubygems.org because you are missing the certificate”** thì bạn có lỗi xác minh chứng chỉ và cần cập nhật chứng chỉ của mình.

Thay vào đó, nếu bạn thấy thông báo **“Your Ruby can’t connect to rubygems.org because your version of OpenSSL is too old”** thì phiên bản OpenSSL của bạn đã cũ và không tương thích với TLSv1.2 và bạn cần nâng cấp OpenSSL và / hoặc biên dịch lại Ruby để sử dụng phiên bản SSL mới hơn.

Các hướng dẫn trong bài viết này có thể giúp bạn khắc phục cả hai sự cố.

## 2.2 Cập nhật bundle
Cập nhật lên phiên bản Bundler mới nhất bằng cách chạy lệnh:
```
gem install bundler
```
## 2.3 Cập nhật RubyGems
Bạn có thể nâng cấp RubyGems bằng lệnh tự cập nhật:

```
gem update --system
```

Nếu lệnh trên không thành công, bạn có thể thử tự tải xuống RubyGems mới nhất và cài đặt nó bằng các bước sau. Trong ví dụ này, chúng tôi sẽ tải xuống và cài đặt RubyGems 2.7.6. Nếu phiên bản mới nhất của RubyGems đã thay đổi vào thời điểm bạn đang đọc bài viết này, bạn sẽ cần phải thay đổi bất kỳ nơi nào bạn thấy 2.7.6 thành phiên bản RubyGems mà bạn đã tải xuống.

* Bước 1: Sử dụng trình duyệt web của bạn, truy cập trang Download RubyGems và tải xuống phiên bản gems của rubygems mới nhất.
* Bước 2: Khi bạn đã tải xuống gem, hãy mở Terminal.app trên macOS hoặc Command Prompt với Ruby trên Windows.
* Bước 3: Thay đổi thư mục thành thư mục Downloads của bạn. Trên macOS, lệnh sẽ là `cd ~/Downloads`. Trên Windows, nó sẽ là `cd C:\Users\%USERNAME%\Downloads`.
* Bước 4: Cài đặt gems nâng cấp RubyGems đã tải xuống bằng cách chạy `gem install --local rubygems-update-2.7.6.gem`.
Chạy lệnh nâng cấp `update_rubygems`.

Xong rồi đó! Chạy `gem --version` để xác minh rằng bạn đang sử dụng phiên bản RubyGems mới nhất.

## 2.4 Cập nhật System Clock
Nếu đồng hồ hệ thống (system clock) của bạn được đặt thành thời gian trong quá khứ hoặc tương lai, máy của bạn sẽ không thể thiết lập kết nối an toàn đến RubyGems.org. Để giải quyết vấn đề, bạn sẽ cần đặt đồng hồ hệ thống của mình thành thời gian hiện tại. Trong Linux, bạn có thể cập nhật đồng hồ hệ thống bằng cách chạy `sudo ntpdate ntp.ubuntu.com`.

Dưới đây là các giải pháp khả thi khác để cập nhật đồng hồ hệ thống:

* macOS: [Đặt ngày giờ trên máy Mac của bạn](https://support.apple.com/kb/PH25523?locale=en_US)
* Ubuntu: [Quản lý thời gian Ubuntu](https://help.ubuntu.com/community/UbuntuTime)
* Windows: [Bắt Windows 10 có thời gian để đồng bộ hóa với máy chủ thời gian](https://answers.microsoft.com/en-us/windows/forum/windows_10-other_settings-winpc/how-to-force-windows-10-time-to-synch-with-a-time/20f3b546-af38-42fb-a2d0-d4df13cc8f43)
* Vagrant: [Hiệu chỉnh đồng hồ hệ thống trong Vagrant](https://stackoverflow.com/questions/33939834/how-to-correct-system-clock-in-vagrant-automatically)

## 2.5 Cập nhật chứng chỉ CA
### 2.5.1 Cài đặt chứng chỉ RubyGems mới
Nếu bạn không thể cập nhật RubyGems, bạn có thể thêm chứng chỉ RubyGems theo cách thủ công. Nếu bạn có phiên bản RubyGems đủ mới (phiên bản 2.1.x trở lên) có thể sử dụng các chứng chỉ “được cung cấp” đó — và khi cài đặt thành công chứng chỉ thì chứng chỉ đó sẽ hoạt động mà không cần nâng cấp phiên bản RubyGems.

> Cảnh báo : Những hướng dẫn này sẽ chỉ thêm chứng chỉ mới; Ruby sẽ được giữ nguyên. Để đảm bảo phiên bản Ruby của bạn có thể sử dụng TLSv1.2, hãy chạy lại đoạn mã. Nếu không, hãy làm theo một loạt hướng dẫn khác trong hướng dẫn này để nâng cấp Ruby.

**Bước 1: Nhận chứng chỉ tin cậy mới**

Tải xuống tệp .pem từ liên kết này: [GlobalSignRootCA.pem](https://raw.githubusercontent.com/rubygems/rubygems/master/lib/rubygems/ssl_certs/rubygems.org/GlobalSignRootCA_R3.pem)

Sau đó, tìm tệp đã tải xuống và kiểm tra để đảm bảo tên tệp kết thúc bằng .pem. ( **Lưu ý** : Một số trình duyệt sẽ thay đổi phần mở rộng thành .txt, điều này sẽ ngăn điều này hoạt động. Vì vậy, điều quan trọng là đảm bảo tệp bạn đã tải xuống kết thúc bằng một phần mở rộng .pem)

**Bước 2: Định vị thư mục chứng chỉ RubyGems trong cài đặt của bạn**

Tiếp theo, bạn sẽ muốn tìm thư mục mà bạn đã cài đặt Ruby để thêm tệp .pem vào đó.

Trên Windows, mở dòng lệnh của bạn và nhập:

`C:\>gem which rubygems`

Bạn sẽ thấy đầu ra như thế này:

`C:/Ruby21/lib/ruby/2.1.0/rubygems.rb`

Để mở cửa sổ hiển thị thư mục chúng ta cần tìm, hãy nhập phần đường dẫn lên đến phần mở rộng tệp trong cùng cửa sổ (nhưng thay vào đó sử dụng dấu gạch chéo ngược). Ví dụ: dựa trên kết quả đầu ra ở trên, bạn sẽ chạy lệnh này:

`C:\>start C:\Ruby21\lib\ruby\2.1.0\rubygems`

Thao tác này sẽ mở ra cửa sổ Explorer, hiển thị thư mục RubyGems được cài đặt vào.

Trên macOS, mở Terminal và chạy lệnh này:

`$ gem which rubygems`

Bạn sẽ thấy đầu ra như thế này:

`/opt/rubies/2.4.1/lib/ruby/2.4.0/rubygems.rb`

Để mở một cửa sổ hiển thị thư mục chúng ta cần tìm, hãy sử dụng lênh open trên đầu ra đó mà không có “.rb” ở cuối, như sau:

`$ open /opt/rubies/2.4.1/lib/ruby/2.4.0/rubygems`

Một cửa sổ Finder sẽ mở ra hiển thị thư mục mà RubyGems được cài đặt vào.

**Bước 3: Sao chép chứng chỉ tin cậy mới**

Trong window, mở thư mục ssl_certs và kéo tệp .pem của bạn vào đó. Nó sẽ được liệt kê với các tệp khác như AddTrustExternalCARoot.pem.

Khi bạn đã thực hiện xong việc này, bạn có thể làm theo các hướng dẫn ở trên cùng để tự động cập nhật RubyGems. Truy cập phần **Cập nhật RubyGems** để biết hướng dẫn từng bước. Nếu điều đó không hiệu quả, hãy tiếp tục làm theo hướng dẫn này.

### 2.5.2 Cài đặt chứng chỉ hệ điều hành mới
Giải pháp này có thể hoạt động khi phiên bản OpenSSL được cài đặt bằng Homebrew cản trở khả năng tìm chứng chỉ chính xác của Ruby. Đôi khi, gỡ cài đặt mọi thứ và bắt đầu lại từ đầu là đủ để khắc phục mọi thứ.

Trước tiên, bạn sẽ cần xóa RVM. Bạn có thể làm điều đó bằng cách chạy lệnh này:

```
$ rvm implode
```

Tiếp theo, bạn sẽ cần xóa OpenSSL khỏi Homebrew. (Việc sử dụng `--force` đảm bảo rằng bạn xóa tất cả các phiên bản OpenSSL mà bạn có thể có):
```
$ brew uninstall openssl --force
```

Bây giờ, bạn có thể cài đặt lại RVM, theo các hướng dẫn phía dưới.
### 2.5.3 Cài đặt lại Ruby từ trình quản lý phiên bản
**Cài đặt với rvm**

> Lưu ý : Hãy thử giải pháp này nếu cập nhật chứng chỉ SSL với RVM không hoạt động. Nếu Ruby được cài đặt bằng RVM không thể tìm thấy các chứng chỉ chính xác ngay cả khi chúng đã được cập nhật, bạn có thể khắc phục bằng cách cài đặt lại RVM và sau đó cài đặt lại phiên bản Ruby của mình.

Chạy các lệnh sau để loại bỏ RVM và cài đặt lại nó:
```
$ rvm implode $ \curl -sSL https://get.rvm.io | bash -s stable
```
Sau đó, cài đặt lại Ruby trong khi nói với RVM rằng bạn không muốn sử dụng các tệp nhị phân được biên dịch trước. (Thật không may, quá trình này sẽ mất nhiều thời gian hơn, nhưng hy vọng nó sẽ khắc phục được sự cố SSL.)

Lệnh này sẽ cài đặt Ruby 2.2.3. Điều chỉnh lệnh để cài đặt (các) phiên bản Ruby mà bạn cần:
```
$ rvm install 2.2.3 --disable-binary
```
**Cài đặt bằng ruby-build hoặc rbenv install**

Làm theo các hướng dẫn được nêu trong hướng dẫn [Cập nhật và Khắc phục sự cố tạo ruby của rbenv](https://github.com/rbenv/ruby-build/wiki#updating-ruby-build).

### 2.5.4 Cài đặt lại Ruby từ trình quản lý gói hệ điều hành
**macOS: Ruby tích hợp sẵn**

macOS 10.13 High Sierra đi kèm với Ruby mặc định tương thích với TLSv1.2.

Để kiểm tra phiên bản macOS hiện tại của bạn, hãy chuyển đến menu Apple và chọn “Giới thiệu về máy Mac này”. Nếu bạn thấy bất kỳ điều gì khác ngoài “macOS High Sierra”, bạn sẽ cần phải nâng cấp lên macOS mới nhất (hoặc nếu không, hãy cài đặt phiên bản mới hơn của Ruby với Homebrew bằng cách làm theo bộ hướng dẫn tiếp theo sau những điều này).

Để nâng cấp lên High Sierra:
1. Mở ứng dụng App Store 
2. Chọn tab “Cập nhật” 
3. Nhấp vào nút “Cài đặt” cho “macOS High Sierra”

**macOS: Được cài đặt bằng Homebrew**

> Lưu ý : Để cài đặt phiên bản Ruby mới hơn với Homebrew, trước tiên hãy đảm bảo rằng Homebrew đã được cài đặt. Nếu brewlệnh không xuất hiện, hãy làm theo hướng dẫn cài đặt tại https://brew.sh và sau đó quay lại các bước này.

Chạy `brew update`
Chạy `brew install ruby`
Nếu Ruby đã được cài đặt, hãy chạy `brew upgrade ruby` để nâng cấp lên phiên bản mới nhất.

**Debian hoặc Ubuntu 16.04: Được cài đặt bằng apt-get**

> Lưu ý : Để gỡ bỏ Ruby bằng apt, bạn cần kiểm tra phiên bản Ruby nào bạn đã cài đặt. 
`apt` cài đặt Ruby v2.3.1.

Để gỡ cài đặt, hãy làm theo hướng dẫn được liệt kê ở đây . (Các hướng dẫn này hoạt động cho cả Ubuntu và Debian.)

Khi bạn đã gỡ cài đặt thành công Ruby, hãy cài đặt lại nó bằng cách chạy:
```
$ sudo apt-get install ruby
```
**Fedora: Được cài đặt bằng dnf**

> Lưu ý : Các phiên bản mới nhất của Fedora sử dụng `dnf` làm trình quản lý gói của nó, nhưng các phiên bản cũ hơn sử dụng `yum` thay thế. Nếu bạn thấy thông báo lỗi `dnf`: command not found, hãy thay thế dnf trong các hướng dẫn này bằng `yum`.

Đầu tiên, gỡ cài đặt Ruby bằng cách chạy:
```
$ dnf remove ruby
```
Và sau đó cài đặt lại (lệnh này sẽ cài đặt Ruby 2.3):
```
$ dnf install ruby
```
**RHEL hoặc CentOS: Được cài đặt với yum**

Làm theo các hướng dẫn sau để [nâng cấp Ruby on CentOS](http://ask.xmodulo.com/upgrade-ruby-centos.html) . (Chúng cũng bao gồm các hướng dẫn để khắc phục sự cố OpenSSL.)

**Windows: Được cài đặt bằng Ruby Installer**

Từ Control Panel, tìm trình cài đặt Ruby trong “Programs”. Nhấp vào thư mục và nhấp lại vào “Uninstall Ruby”. Cài đặt lại bằng cách tải xuống Ruby và Ruby DevKit tại RubyInstaller.

## Trợ giúp bổ sung
**Chạy một kiểm tra SSL tự động khác**

Chạy lại kiểm tra SSL tự động để xác minh xem vấn đề nằm ở vấn đề SSL hay vấn đề TLS. Nếu bạn đã làm theo các bước khắc phục sự cố ở trên mà vẫn gặp sự cố, hãy chuyển đến phần tạo sự cố bên dưới để biết các bước tiếp theo.

### Tạo vấn đề
Nếu không có hướng dẫn nào trong số này khắc phục được sự cố, bước tiếp theo là mở sự cố.

(Tạo sự cố trong trình [theo dõi sự cố RubyGems](https://github.com/rubygems/rubygems/issues) nếu lỗi của bạn đến từ `gem install`. Nếu lỗi do nguyên nhân `bundle install`, hãy tạo sự cố trong [trình theo dõi sự cố Bundler](https://github.com/rubygems/rubygems/issues/new?labels=Bundler&template=bundler-related-issue.md0.)

Vui lòng bao gồm: - Đầu ra khi chạy `gem env`: - Đầu ra khi chạy `bundle env`: - Đầu ra khi chạy `ruby -ropenssl -e 'puts OpenSSL::OPENSSL_LIBRARY_VERSION'`: - Trình quản lý phiên bản Ruby của bạn (nếu có): - Hệ điều hành và phiên bản hệ điều hành của bạn: - Tên và phiên bản trình quản lý gói của bạn (nếu có):

**Đóng góp vào bài viết này**

Nếu bạn tìm thấy một giải pháp không được liệt kê ở đây, hãy gửi PR để thêm giải pháp của bạn vào [hướng dẫn này](https://github.com/rubygems/bundler-site/blob/master/source/v1.16/guides/rubygems_tls_ssl_troubleshooting_guide.html.md) hoặc để lại ở comment phía dưới nữa nha! Chúc các bạn một ngày tốt lành :hugs::hugs::hugs:

# Tài liệu tham khảo
Bài viết được dịch từ nguồn [How to troubleshoot RubyGems and Bundler TLS/SSL Issues
](https://bundler.io/v2.0/guides/rubygems_tls_ssl_troubleshooting_guide.html#troubleshooting-certificate-errors). (Trong quá trình dịch bài có đoạn nào dịch sai hoặc thiếu mong các bạn thông cảm và góp ý giúp mình ở phần comment phía dưới nha :pray:)