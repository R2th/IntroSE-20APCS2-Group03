# Giới thiệu
Hello, để tiếp tục chuỗi bài về bảo mật cơ bản, lần này mình sẽ giới thiệu cho các bạn biết về Email Spoofing, nó có nghĩa là gửi email với địa chỉ giả mạo. Mình sẽ cho các bạn thấy việc giả mạo email có thể gây nguy hiểm cho người dùng như thế nào nhé.

Email được gửi thông qua `Simple Mail Tranfer Protocol (SMTP)`, SMTP không có cơ chế xác thực, vì vậy hacker thường gửi email bằng cách sử dụng địa chỉ giả mạo để đánh lừa người nhận về người gửi email.

Phương thức tấn công phổ biến là `phishing`  - cố gắng lừa người dùng chia sẻ thông tin đăng nhập của họ. Email lừa đảo thường sẽ cảnh báo người dùng rằng ai đó đã cố gắng truy cập vào tài khoản của họ và đề nghị họ thay đổi mật khẩu ngay lập tức.

Tuy nhiên, link đổi password lại điều hướng người dùng tới trang web chứa mã độc với giao diện nhìn y hịt gmail.

![](https://images.viblo.asia/c4704d55-a204-49a9-b179-938e9c61bbf9.png)

Sau đó người dùng sẽ cần nhập mật khẩu cũ, và nó sẽ được lưu vào database của hacker. Tiếp đó trang web sẽ chuyển hướng đến trang reset password thật, vì vậy người dùng không nghi ngờ gì cả.

Việc bảo vệ chống lại các email lừa đảo phần lớn là do nhà cung cấp dịch vụ email. Các nhà cung cấp dịch vụ email dành rất nhiều resources để cố gắng phát hiện spam và email độc hại.

# Rủi ro
Nhìn chung đây là hình thức lừa đảo xảy ra khá là phổ biến và nguy hiểm. Có hơn 95% email được gửi qua internet là spam email. Hầu hết thư rác sử dụng các địa chỉ giả mạo. Nếu domain của bạn đang được sử dụng trong tin nhắn rác, những kẻ gửi spam có thể đang lợi dụng người dùng của bạn để:
* Đánh cắp thông tin đăng nhập của họ bằng cách gửi tin nhắn “lừa đảo”.
* Lợi dụng sự tin tưởng của người dùng vào trang web của chúng ta để lừa đảo.
* Phát tán phần mềm độc hại bằng cách chia sẻ các file độc hại.
* Vân vân và mây mây....

# Bảo vệ
Là chủ sở hữu trang web, bạn nên ngăn chặn việc sử dụng miền của mình trong thư rác bằng cách áp dụng cả hai phương pháp sau:

**1. Triển khai `Sender Policy Framework (SPF)`:**

Publish [DNS record](https://www.cloudflare.com/learning/dns/dns-records/) để nêu rõ máy chủ nào được phép gửi email từ miền của bạn.

Bằng cách thay đổi DNS records của bạn để list `Sender Policy Framework (SPF)`, bạn có thể nêu rõ máy chủ nào được phép gửi email từ miền của bạn. Điều này sẽ giúp gắn flag các email giả mạo được gửi bởi kẻ lừa đảo. Ví dụ:

```
// mail chỉ có thể gửi từ những địa chỉ được liệt kê
example.net.  TXT  "v=spf1 mx a:pluto.example.net include:aspmx.googlemail.com -all"
```

**2. Triển khai `Domain Key Identified Mail (DKIM)`:**

Bằng cách sử dụng `Domain Key Identified Mail (DKIM)`, bạn có thể chứng minh rằng email được gửi hợp lệ từ miền của bạn và email đó không bị sửa đổi khi transit.

`DKIM` thêm chữ ký điện tử vào tiêu đề email. Bên nhận thư sẽ kiểm tra chữ ký khi nhận để xác minh thư là xác thực và không bị giả mạo.

```ruby
# @return [DkimHeader] Constructed signature for the mail message
def dkim_header
  dkim_header = DkimHeader.new

  raise "A private key is required" unless private_key
  raise "A domain is required"      unless domain
  raise "A selector is required"    unless selector

  # Add basic DKIM info
  dkim_header['v'] = '1'
  dkim_header['a'] = signing_algorithm
  dkim_header['c'] = "#{header_canonicalization}/#{body_canonicalization}"
  dkim_header['d'] = domain
  dkim_header['i'] = identity if identity
  dkim_header['q'] = 'dns/txt'
  dkim_header['s'] = selector
  dkim_header['t'] = (time || Time.now).to_i

  # Add body hash and blank signature
  dkim_header['bh']= digest_alg.digest(canonical_body)
  dkim_header['h'] = signed_headers.join(':')
  dkim_header['b'] = ''

  # Calculate signature based on intermediate signature header
  headers = canonical_header
  headers << dkim_header.to_s(header_canonicalization)
  dkim_header['b'] = private_key.sign(digest_alg, headers)

  dkim_header
end
```

Ngoài ra còn có một tiêu chuẩn được gọi là `Domain-based Message Authentication, Reporting & Conformance (DMARC )` mà bạn nên biết. [Đọc thêm ở đây](https://dmarc.org/overview/)

Việc áp dụng các công nghệ này giúp email bạn gửi ít có khả năng bị đánh dấu là thư rác.

# Configuration
Việc triển khai `SPF` và `DKIM` yêu cầu publish các DNS record mới và thực hiện các cấu hình đối với technology stack của bạn - hãy tham khảo tài liệu về dịch vụ hoặc phần mềm gửi email để biết chi tiết. Dưới đây là các tài liệu liên quan cho một số phương pháp gửi email phổ biến hơn.

## Transactional Email Services
Transaction Email được gửi theo chương trình để response lại các action trên trang web hoặc ứng dụng. Nếu trang web của bạn sử dụng transaction email (ví dụ: trong khi đăng ký hoặc đặt lại mật khẩu), bạn cần đảm bảo rằng bạn đang gửi các email đã xác thực. Dưới đây là cách thiết lập email được xác thực trong các dịch vụ email giao dịch hàng đầu.
* [Amazon Simple Email Service](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/authentication.html)
* [Mailgun](https://documentation.mailgun.com/en/latest/quickstart-sending.html)
* [Mailjet](https://www.mailjet.com/docs/spf-dkim-guide)
* [Mandrill](https://mandrill.zendesk.com/hc/en-us/articles/360039236053-About-SPF-and-DKIM)
* [Postmark](https://postmarkapp.com/guides/dkim)
* [SendGrid](https://sendgrid.com/blog/a-dkim-faq/)
* [SendinBlue](https://help.sendinblue.com/hc/en-us/articles/209577385-Understand-SPF-DKIM-and-DMARC-protocols)

## Email Marketing Services
Email Marketing Services cho phép gửi hàng loạt email đến danh sách cần gửi thư. Nếu bạn sử dụng loại dịch vụ này, bạn cần đảm bảo rằng email được gửi đã được xác thực.
* [ActiveCampaign](https://help.activecampaign.com/hc/en-us/articles/206903370-DKIM-SPF-and-DMARC)
* [AWeber](http://docs.aweber-static.com/pdfs/deliverability.pdf)
* [Benchmark](https://www.benchmarkemail.com/resources/email-marketing-articles/email-authentication)
* [MailChimp](http://kb.mailchimp.com/accounts/email-authentication/set-up-custom-domain-authentication-dkim-and-spf)

## Mail Transfer Agents
System administrators sẽ sử dụng phần mềm "Mail Transfer Agent”. Các MTA phổ biến nhất là Microsoft Exchange (trên Windows) và SendMail / Postfix (trên Linux). Dưới đây là cách triển khai email đã xác thực trên các nền tảng đó:
* [MicrosoftExchange](https://blogs.technet.microsoft.com/fasttracktips/2016/07/16/spf-dkim-dmarc-and-exchange-online/)
* [SendMail](https://philio.me/setting-up-dkim-with-sendmail-on-ubuntu-14-04/)
* [Postfix](https://help.ubuntu.com/community/Postfix/DKIM)

# Tổng kết
Trên đây là phần giới thiệu cơ bản về Email Spoofing, hy vọng sẽ hữu ích cho bạn. Happy coding !!! <3 <3 <3