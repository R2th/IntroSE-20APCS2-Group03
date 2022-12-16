Chào mọi người, sau 1 tuần ăn tết no say thì hôm nay mình trở lại với 1 vấn đề mà làm đau đầu hầu hết các lập trình viên, đó là bảo mật. Ở một bộ phim nào đó mình đã xem thì có câu nói là "KHÔNG MỘT HỆ THỐNG NÀO LÀ AN TOÀN", cho nên việc chúng ta cần làm là bịt được càng nhiều lỗ hổng càng tốt, tăng khả năng bảo mật của hệ thống trước các cuộc tấn công của hacker. Cho nên ở bài viết này mình xin phéo chia sẻ một số Tips bảo mật để tăng sức đề kháng của một ứng dụng Rails trước sự tấn công của hacker. Các bạn chú ý là trong bài mình sẽ nêu ra rất nhiều cách để tăng tính bảo mật trong Rails, vì vậy k thể nào có thể viết chi tiết ra từng case được, cho nên với mỗi case mình sẽ dẫn link cụ thể để các bạn follow nhé.
Để hiểu được cơ chế bảo mật của Rails, các bạn có thể xem tại [Rails Security Guide](https://guides.rubyonrails.org/security.html) .
### Best Practices
Để tăng tính bảo mật cho Rails thì bạn cần nên chú ý những điều sau đây:
* Không lưu trữ secret trong code của bạn. Đây là một nguyên tắc khá là cơ bản, rất nhiều vụ việc xảy ra do dev bất cẩn để key hoặc một đoạn secret token nào đó lên github, làm lộ các thông tin bảo mật của hệ thống. Để tránh các trường hợp đó các bạn có thể sử dụng biến ENV cũng là một cách hay.
* Mặc dù Rails đã support người dùng truy vấn dữ liệu thông qua ActiveRecord để tăng tính bảo mật. Tuy nhiên lỗ hổng SQL injection vẫn có thể xảy ra nếu dev sử dụng đoạn code như bên dưới
```
User.group(params[:column])
```
Có rất nhiều lỗ hổng như vậy trong ActiveRecord. Các bạn có thể xem chi tiết ở link sau: [Rails SQL Injection](https://rails-sqli.org/)
* Sử dụng [SecureHeaders](https://github.com/twitter/secure_headers).  Đây là một  tính năng được thiết kế để chống lại các cuộc tấn công XSS.
* Bảo vệ dữ liệu trên đường truyền bằng giao thức HTTPS thay vì HTTP, các bạn có thể lấy chứng chỉ SSL miễn phí từ [Let’s Encrypt](https://letsencrypt.org/).
```
config.force_ssl = true
```
* Thêm domain của bạn vào [HSTS Preload List](https://hstspreload.org/)
```
config.ssl_options = {hsts: {subdomains: true, preload: true, expires: 1.year}}
```
* Bảo vệ các dữ liệu nhạy cảm như email, mã số thẻ ngân hàng,..bằng cách mã hóa chúng khi lưu trữ ở DB, có rất nhiều công cụ giúp chúng ta thực hiện công việc này dễ dàng như [attr_encrypted ](https://github.com/attr-encrypted/attr_encrypted) hoặc là [KMS Encrypted](https://github.com/ankane/kms_encrypted).
* Ngăn chặn kiểu tấn công [Host Header Injection](http://carlos.bueno.org/2008/06/host-header-injection.html) bằng cách config trong file **config/environments/production.rb** như sau:
```
# config/environments/production.rb
config.action_controller.default_url_options = {host: "www.yoursite.com"}
config.action_controller.asset_host = "www.yoursite.com"
```
* Set **autocomplete="off"** đối với những field trong form chứa các dữ liệu nhạy cảm như là credit card number chẳng hạn.
* Bảo đảm rằng các thông tin về data cần bảo mật như password hoặc credit card number khi gửi lên server thông qua request không bị ghi ra log mà nên hiển thị ở dạng **[FILTER]** trong Rails.
```
Rails.application.config.filter_parameters += [:credit_card_number]
```
* Sử dụng các thư viện đáng tin cậy như [Devise](https://github.com/plataformatec/devise) cho việc xác thực người dùng.
* Thông báo đến người dùng khi mật khẩu bị thay đôỉ.
* Thông báo đến người dùng khi email bị thay đổi, gửi email thông báo đển cả 2 địa chỉ email mới và email cũ.
* Lưu lại tất cả số lần đăng nhập thành công và thất bại và số lần thay đổi password (nếu sử dụng devise thì bạn có thể tham khảo gem [Authtrail](https://github.com/ankane/authtrail)).
* Sử dụng một số gem để phân quyền người dùng, có thể kể đến 2 gem khá là nổi tiếng đó là [Cancancan](https://github.com/CanCanCommunity/cancancan) và [Pundit](https://github.com/elabs/pundit).
* Yêu cầu các công cụ tìm kiếm không tiến hành đánh index trang khi mà URL của trang có chứa các secret token.
```
<meta name="robots" content="noindex, nofollow">
```
* Setting để trình duyệt không tiến hành cache lại đối với những page chứa dữ liệu nhạy cảm.
```
response.headers["Cache-Control"] = "no-cache, no-store, max-age=0, must-revalidate"
response.headers["Pragma"] = "no-cache"
response.headers["Expires"] = "Sat, 01 Jan 2000 00:00:00 GMT"
```
* Sử dụng **json_escape** khi tiến hành truyền biến vào Javascript, hoặc nếu tốt hơn, các bạn có thể sử dụng gem [Gon](https://github.com/gazay/gon)
```
<script>
  var currentUser = <%= raw json_escape(current_user.to_json) %>;
</script>
```
* Cẩn thận khi sử dụng **html_safe**. Link chi tiết: [Stay safe while using html_safe in Rails](https://product.reverb.com/stay-safe-while-using-html-safe-in-rails-9e368836fac1).
* Nếu dự án hiện tại của bạn vẫn đang sử dụng **attr_accessible**, thì bạn cần upgrade chúng thành [strong_parameters](https://ankane.org/strong-parameters).
### Open Source Tools
* [Brakeman](https://github.com/presidentbeef/brakeman) Đây là một công cụ phân tích bảo mật cho các ứng dụng Rails của bạn. Nó quét thông qua ứng dụng của bạn và kết quả đầu ra là một bảng định dạng các lỗ hổng có thể. Cảnh báo an toàn được phân nhóm theo mức độ nghiêm trọng của nó (cao, trung bình và thấp). Tuy nhiên cần lưu ý rằng ngay cả khi bạn kết thúc không có bất kỳ cảnh báo, nó không có nghĩa là ứng dụng của bạn là an toàn, vì Brakeman đôi khi bỏ qua một số cạm bẫy bảo mật cơ bản.
* Trong trường hợp nếu bạn muốn kiểm tra gem của ứng dụng cho các lỗ hổng, hãy thử [bundler-audit](https://github.com/rubysec/bundler-audit), chạy trên đầu trang Bundler. Với bundler-audit , bạn có thể tiết kiệm được rất nhiều thời gian vì nó kiểm tra tệp gemfile.lock của bạn để tìm lỗ hổng ở các phiên bản gem đã cũ và ngăn việc tải về không đáng tin cậy.
* [npm audit](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities) Tương tự với gem bundler-audit dùng cho các gem trong ruby ,thì thằng này dùng để kiểm tra các Javascript package.
* [git-secrets](https://github.com/awslabs/git-secrets) đây là 1 gem mình thấy khá là hữu dụng, nó sẽ kiểm tra và ngăn chặn những thông tin nhạy cảm như token, key, bla bla... khi mà bạn push code lên git repository
```
brew install git-secrets
git secrets --register-aws --global
git secrets --install
git secrets --scan
```
### Services
Ngoài việc sử dụng các tool để đánh giá độ bảo mật của application. Thì các bạn có thể sử dụng nhiều dịch vụ bên ngoài để đánh giá mức độ an toàn của mình, có thể kể đến một số dịch vụ như [Observatory ](https://observatory.mozilla.org/), [Hakiri](https://hakiri.io/), [CodeClimate](https://codeclimate.com/) hay là [HackerOne](https://www.hackerone.com/).

Trên đây mình đã chia sẻ một số tip để nâng cao độ bảo mật cho ứng dụng Rails, hy vọng các bạn có thể tìm hiểu và áp dụng vào project của mình. Chào thân ái.