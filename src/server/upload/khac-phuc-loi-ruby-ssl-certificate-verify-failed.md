> Bài viết này được dịch từ nguồn gốc: [Source link](https://www.engineyard.com/blog/ruby-ssl-error-certificate-verify-failed)

Khi làm việc trên Rails app hoặc khi cài các gem, chúng ta có thể gặp lỗi Ruby SSL:

`SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed`

Bài viết này sẽ giải thích lỗi là gì và cung cấp một số giải pháp.

Lỗi này như thấy trong tin nhắn là nó có gì đó liên quan tới SSL và các certificates.
Đầu tiên sẽ thảo luận tại sao cần phải sử dụng SSL. Khi app kết nối với một API của app bên thứ 3 hoặc khi lệnh `gem` kết nối tới rubygems.org cần phải sử dụng HTTPS version eg. https://api.example.com hoặc https://rubygems.org.
Nếu không sử dụng HTTPS versioin và sử dụng HTTP version không an toàn, dữ liệu nhận được có thể thay đổi bởi ai đó trên đường từ user tới server và không thể biết dữ liệu bị thay đổi. Nếu yêu cầu 1 gem từ http://rubygems.org từ máy laptop của bạn và đang sử dụng WiFi công cộng thì nhà cung cấp WiFi có thể cho bạn một gem đã sửa đổi.
Tóm lại bạn hãy sử dụng HTTPS trong đó sử dụng một SSL certificate an toàn.
Secure Sockets Layer hoặc SSL là một protocol bảo mật mà cung cập giáo tiếp an toàn giữa 2 máy. Với trường hợp trên giữa app của bạn và API của app bên thứ 3 hoặc gữi các máy của bạn và máy rubygems.org.

SSL làm việc như thế nào?
Máy 1 khởi tạo kết nối và nhìn SSL certificate của máy 2. Certificate này chứa các số mà máy 1 sẽ sử dụng để mã hóa giáo tiếp của chúng. Đây là một mô tả đơn giản và chưa đủ cho cả quy trình xử lý. Ở đây sẽ không đi vào sâu về mã hóa như thế nào hoặc hoạt động SSL handshake.

Giáo tiếp đã mã hóa đảm bảo rằng nhưng gì mà bạn đã gửi tới server và ngược lại không thể sửa đổi. Tuy nhiên, kết nối khởi đầu thực hiện rõ ràng dưới dạng văn bản từ trước khi nó mã hóa giao tiếp. Vậy trong khi bạn chắc chắn rằng giáo tiếp an toàn, làm thế nào để biết được bạn đang giao tiếp đúng với server?

SSL certificates được ký bở một Certificate Authority. Chữ ký(Signature) cho biết rằng các certificates là thật. Các Certificate Authorities cũng được ký cho cùng lý do. Điều này có thể tiếp tục cho đến khi tới certificate gốc. Thiết lập này tạo một chuổi tin cậy. Khi bạn tin cậy certificate gốc bạn có thể tin cậy certificate của trang web bạn đang giáo tiếp với.

Các certificates gốc được cài trong máy của bạn và đó là sự tin tưởng rằng các certificates hợp lệ.

Khi máy 1 kết nối với máy 2, máy 1 phải kiểm chứng certificate là certificates thật sự đúng. Nếu kiểm chứng thất bại thì bạn sẽ nhận lỗi `certificate verify failed`.

Khi kiểm chứng thất bại có thể là 1 trong 2 cái sau: Máy của bạn không có các certificate gốc đúng hoặc bạn đang kết nối với một URL mà có vấn đề với các certificate.

Nếu là các cuối cùng thì lựa chọn tốt nhất đó là yêu cầu site bên thứ 3 sửa certificate của họ. Các giải pháp dưới này để khắc phục lỗi trong trường hợp thứ nhất khi vấn đề là do máy của bạn.

### Vấn đề

Lỗi `certificate verify failed` xảy ra khi một máy không thể kiểm chứng certificate của máy mà nó đang kiết nối đến. Trong thực tế nó có nghĩa là gì?
Khi phát triển ứng dụng Rails có thể xảy ra khi
*  Chạy `gem install hoặc bundle install` máy của bạn cần kiết nối tới các nguồn gem như https://rubygems.org
*  App kết nối với API bên thứ 3 như GitHub API
*  Sử dụng một gem như ActiveMerchant để kết nối với các payment site như PayPal.

### Các giải pháp
#### Cập nhật CA certificates
Giải pháp đúng phụ thuộc vào code kết nối với một HTTPS URL. Việc đầu tiên đó là cố gắng cập nhật các certificates gốc trong máy.
Nếu sử dụng Linux, bạn có thể sử dụng package manager để cập nhật các CA certificates.

```
apt-get update ca-certificates
yum update ca-certificates
```

RVM trên OSX có thể chạy `rvm osx-ssl-certs update all`
Nếu không dùng RVM bạn có thể trích ra bằng tay các certificates từ Apple's Keychain.
```
cert_file="$( openssl version -d | awk -F'"' '{print $2}' )/cert.pem"
mkdir -p "${cert_file%/*}"
security find-certificate -a -p /Library/Keychains/System.keychain > "$cert_file"
security find-certificate -a -p /System/Library/Keychains/SystemRootCertificates.keychain >> "$cert_file"
```
Thông tin chi tiết có thể tham khảo [tài liệu SSL](https://rvm.io/support/fixing-broken-ssl-certificates)

#### Cập nhật các gem
Trong một số trường hợp cập nhật hệ thống các CA certificates không giải quyết được vì một số gem chỉ cụ thể CA certificates của họ. ActiveMerchant cung cấp cacert.pem của nó tại https://github.com/activemerchant/active_merchant/tree/master/lib/certs. Nếu lỗi xảy ra từ ActiveMerchant thử cập nhật gem đó lên bản mới nhất.

Năm 2014 rubygems.org phải cập nhật SSL certificate của họ. RubyGems cũng cung cấp các CA certificates và RubyGems bản mới hơn phải cài đặt bằng tay để cho nó hoạt động lại. Có thể tham khảo thêm tại [Ruby Gém guides](http://guides.rubygems.org/ssl-certificate-update/). Nó có vẻ không xảy ra nữa nhưng nếu có vấn đề với RubyGems hãy kiểm trả các certificates của hệ thống trước sau đó các issues của RubyGems.

### Giải pháp tệ
Vẫn có các giải pháp cho lỗi này nhưng không được coi là best practices.
#### Tắt kiểm chứng
Bạn có thể tắt kiểm chứng khi sử dụng net-http. Tuy nhiên không khuyến khích làm cách này.
```
http.verify_mode = OpenSSL::SSL::VERIFY_NONE
```

#### Sử dụng htttp version
Khi bạn đối phó với lỗi `certificate verify failed` khi đang cài các gem, có một số gợi ý sử dụng http://rubygems.org là nguồng thay vì https://rubygems.org. Điều này không tốt khi cài các gem dưới dạng văn bản. Tắt kiểm chứng tốt hơn bởi vì thậm chí không có kiểm chứng, bạn vẫn sử dụng giáo tiếp mã hóa. Không có sai lầm nhưng các giải pháp này là  không khuyến khích.

#### Set SSL_CERT_FILE
Điều này không phải là giải pháp tệ khi bạn biết minh đang làm gì. Tuy nhiên còn có nhiều giải pháp nữa ngoài mấy cái nêu trên là đề nghị tải các CA certificates về máy và cài đặt biến môi trường SSL_CERT_FILE với địa chỉ của nó.

Vấn đề với giải pháp này là không biết được các CA certificates đang tải có thể tin cậy hay không. Trong một số trường hợp các CA certificates đã tải về dưới dạng văn bản.

### Kết luận
Lỗi Ruby OpenSSL `certificate verify failed` có nghĩa là code của bạn không thể kiểm chứng rằng SSL certificate của website hoặc API bạn đang kết nối tới cái thật sự. Điều này rất quan trọng để giải quyết vấn đề này đúng đắn để giữ giáo tiếp của bạn an toàn.
 
Nếu bạn quan tâm tới những vấn đề an toàn, bạn có thể tham khảo thêm [Security issues](https://www.engineyard.com/blog/topic/security)