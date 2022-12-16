Trong thời buổi mà công nghệ thông tin đã bao phủ hầu như tất cả mọi lĩnh vực đời sống thì việc sử dụng email cũng trở nên phổ biến hơn bao giờ hết . Email không chỉ được dùng để thông tin liên lạc hay trao gửi những lời yêu thương như trong bài hát "Email tình yêu" của Đan Trường thuở nào nữa mà nó đã phát triển thành một ngành công nghiệp gọi là Email Maketing .
Chém gió lan man thế cũng chỉ để thấy rằng nhu cầu sử dụng email ở thời điểm hiện tại vô cùng lớn. Và tất nhiên , đối với một ông lớn công nghệ như Amazon thì không thể nào ngó lơ một mảng kinh doanh béo bở như thế được. Ngoài việc cung cấp các dịch vụ email thông thường giống những nhà cung cấp khác như PA Việt Nam , Google (sau đây mình xin phép gọi chung dạng email này là work mail) thì AWS còn cung cấp thêm 1 dịch vụ gọi là Amazon Simple Email Service - Amazon SES.

## Giới thiệu AWS Simple Email Service - SES :

Simple Email Service là một dịch vụ email được AWS quảng cáo là đơn giản - dễ dùng kèm theo khẩu hiệu quen thuộc là xài bao nhiêu trả bấy nhiêu . Để dễ hình dung hơn, chúng ta sẽ cùng nhìn vào một user case thực tế để xem SES có gì đặc biệt hơn các dịch vụ email khác nhé.

Giả sử như bạn đang bắt tay vào xây dựng 1 ứng dụng quảng cáo , bạn đã có trong tay một domain abc.xyz nào đó để phục vụ cho ứng dụng của bạn. Và để bạn có thể gửi email đến end users, bạn sẽ có các lựa chọn sau :

**1 - Tự xây dựng một email server của riêng bạn :**

Việc xây dựng một server email cần :
- Thiết bị, tất nhiên xây dựng server thì phải cần server rồi.
- Nhân sự để xây dựng và vận hành một mail server.
- Địa chỉ IP public dùng cho mail server không bị blacklisted : Nếu một ip mail server nằm trong black list thì bạn sẽ không thể gửi mail được .
- Phải có DNS server để tạo các bản ghi cho mail server như MX record , A record, reverse dns để phục vụ cho email routing.

**2 - Thuê một dịch vụ mail từ một nhà cung cấp nào đó :**

- Bạn có thể thuê một dịch vu email từ các nhà cung cấp như PA , Google hoặc AWS WorkMail. Tuy nhiên thường các loại hình email này bắt bạn phải chi trả một khoản phí cố định hàng tháng mặc dù có lúc bạn chẳng dùng gì cả ! 

- Ngoài ra thì các dịch vụ này đều có một giới hạn send mail  (giới hạn số lượng email có thể gửi từ một user ). Giới hạn này có thể được tính theo ngày, giờ , phút , giây , tuy nhiên thường là tính theo ngày . Tùy từng loại dịch vụ và nhà  cung cấp thì giới hạn này cũng khác nhau. Theo mình được biết thì mức giới hạn này cũng chỉ quanh quẩn ở mốc 10,000 email/ngày/user. Bạn có thể tham khảo thêm tại đây : [Email sending limit](https://group-mail.com/sending-email/email-send-limits-and-options/)

Việc giới hạn này cũng dễ hiểu thôi. Giống như việc ngăn chặn DDOS vậy, nếu không có giới hạn cho việc send mail này thì chẳng mấy chốc tất cả đường truyền internet trên thế giới sẽ bị tắt nghẽn vì tràn ngập mail rác.

Từ những vấn đề ở trên chúng ta có thể thấy rằng việc xây dựng một dịch vụ mail phục vụ cho mục đích quảng cáo cũng đau đầu phết chứ chẳng đùa . Và thế là AWS cung cấp dịch vụ SES - Simple Email Service như một cứu cánh cho bạn :)

SES không chỉ dễ dùng, dễ sử dụng (như thế nào là dễ thì một tý mình sẽ demo cho xem) mà còn có các tính năng vượt trội hơn so với các loại work mail khác : 
- Xài bao nhiêu trả bấy nhiêu => không phải mất phí cố định hàng tháng. SES cho phép send free 62,000 email mỗi tháng , nếu vượt quá số này thì sẽ tính phí  `0.1$` cho mỗi 1000 email tiếp theo.
- Giới hạn send mail mỗi ngày lớn. Mặc định với user mới mà AWS dùng thuật ngữ là `User in Sandbox` là 200 emails/ngày. Khi có request `move-out sandbox` thì giới hạn sẽ là 50.000 emails/ ngày. Giới hạn này sẽ được tăng nếu bạn có nhu cầu sử dụng thật , AWS sẽ xem xét và tăng giới hạn cho bạn. Các bạn có thể vào đây để tham khảo [Link](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/increase-sending-limits.html)

## Hướng dẫn sử dụng dịch vụ AWS SES :
Cũng giống như tất cả các service khác của AWS thì AWS SES cũng được Amazon trang bị sẵn một bộ tài liệu khá đầy đủ. Tuy nhiên đối với những người dùng mới như mình thì những tài liệu này y như đám rừng vậy , đọc rất là hoang man . Phải mãi sau khi sử dụng được rồi thì mới thấy những tài liệu này cực kỳ hữu ích. Vì vậy mình khuyên các bạn nên dành thời gian để yêu thương chúng :D

Trong phần này thì mình sẽ hướng dẫn cho các bạn - những người có thể bị tẩu hỏa nhập ma khi lần đầu xem tài liệu của AWS cách để sử dụng dịch vụ AWS SES.

Đầu tiên, các bạn tìm đến phần dịch vụ này nhé . `Service -> Customer Engagement - Simple Email Service` hoặc gõ luôn trên thanh tìm kiếm service SES . Cần lưu ý rằng hiện tại SES chỉ được Amazon cung cấp ở 3 Region N.Virginia , Oregon và Ireland . Ở các Region khác thì không dùng được nhé.

#### Bước 1 : Verify Domain/Email Address:

Để bắt đầu sử dụng dịch vụ, các bạn phải tiến hành Verify Domain hoặc Email account. Trường hợp mình chỉ có mỗi Domain name thì sẽ Verify Domain nhé.

Phần Identity Management -> Domain -> kích vào Verify a New Domain .

![](https://images.viblo.asia/c358195f-d36d-43d8-ae2b-e4ed74e77b02.png)

Điền thông tin domain của các bạn và tích vào `Generate DKIM Settings` rồi sao đó ấn `Verify This Domain`

Sau khi ấn vào thì mình sẽ nhận được 1 bảng Domain Verification Record. Đây là các bản ghi để điền vào DNS của bạn. Bạn tạo các bản ghi tương ứng với name / value của record trên DNS để verify Domain nhé.

![](https://images.viblo.asia/f5047cd4-3d62-4bb8-b414-3eb7c997bec0.png)

Bạn chỉ cần điền 2 loại record là `Domain Verification Record` và `DKIM Record Set` là đã đủ để verify domain sử dụng SES. Phần `Email Receiving Record` dùng cho mục đích nhận email. ( Hiện tại mục đích của mình chỉ cần gửi mail thôi, phần nhận mail mình sẽ giải thích thêm ở dưới.)
Sau khi Domain của bạn Verify xong thì bạn sẽ nhận được status như này :

![](https://images.viblo.asia/9014da64-90c0-4c11-9a21-b7d3b49c00ea.png)

`Lưu ý :` Mặc định tất cả các acount mới đăng ký SES đều là `User in Sandbox` như mình có đề cập ở trên. Đây là định nghĩa của AWS dành cho new user, đối với những user này thì sẽ bị giới hạn số lượng mail gửi 1 ngày, cũng như chỉ gửi được email đến các account cùng thuộc Sandbox ( đồng nghĩa với việc không gửi ra ngoài được.)

Ví dụ như mình đăng ký domain abc.xyz , thì mình chỉ gửi mail được đến cho các user thuộc domain `abc.xyz` như `email1@abc.xyz` gửi được mail đến `email2@abc.xyz` chứ không gửi mail đến do.hoang.minh.hung@gmail.com được. 

Tương tự với việc verify Email Address, ví dụ bạn verify 2 email address là email1@gmail.com và email2@yahoo.com thì bạn chỉ sử dụng SES gửi email giữa 2 email đó mà thôi, chứ không gửi đến email do.hoang.minh.hung@gmail.com được.

`Lưu ý` : các email address dùng verify cho SES phải là các email đã tồn tại và sử dụng được nhé. Vì AWS SES sẽ gửi 1 email chứa link verify đến cho các bạn đấy.

Muốn gửi được email ra ngoài thì bạn phải làm động tác gọi là Request AWS move-out sandbox cho account của bạn. Hướng dẫn request tham khảo tại  [đây](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html).

#### Bước 2 : Tạo một SMTP Credential để sử dụng SES:
Giống như tất cả các dịch vụ email, tất nhiên là bạn cần phải có 1 tài khoản để chứng thực kết nối với server.
Phần Email Sending -> SMTP Settings -> Kích vào Create My SMTP Credentials

![](https://images.viblo.asia/0a18e376-e210-498a-8362-e444d537085d.png)

Bạn có thể thấy phần SMTP setting này có bao gồm luôn thông tin của SMTP server , port sự dụng .... Lát nữa mình sẽ dùng thông tin này. Bây giờ tạo một username/password đã :v: 
Kích vào đó thì nó sẽ chuyển đến giao diện này.

![](https://images.viblo.asia/0cbb8b1d-8904-4685-a5c5-9e57c3ea9ea2.png)

Điền vào tên IAM mà bạn thích, còn không thì cứ để nó mặc định vậy. Đây thực chất là một IAM User của AWS cho phép sử dụng SMTP . ( phần này bạn cần tìm hiểu thêm về IAM User & Role, trong nội dung bài viết này thì mình xin phép bỏ qua.)

Tiếp tục kíck `Create`, sau khi kíck thì bạn sẽ được tạo 1 user như này

![](https://images.viblo.asia/0ec03142-53f1-475a-bb6f-3660355c85d3.png)

Bạn lưu ý thông tin SMTP user/password, lưu lại nhé !
Đến đây là đã xong đầy đủ các thành phần để sử dụng SES. Bây giờ chỉ việc kiếm cái tools gửi mail nào đó, ráp các info ở trên vào là đã có thể gửi được email đi rồi đấy.

#### Bước 3 : Sử dụng SES để gửi mail bằng cách tích hợp vào Postfix 
AWS cho phép sử dụng SES bằng nhiều cách khác nhau. Nhưng trong bài viết này mình sẽ dùng cách tích hợp vào Postfix ( một Mail Transport Application được tích hợp sẵn trong Centos7) để sử dụng SES.

##### Cấu hình Postfix :
Các file cấu hình của Postfix được lưu ở `/etc/postfix/` . 2 file bạn cần thao tác chỉnh sửa lần lượt là `main.cf` và `master.cf`

**main.cf**
Thêm những dòng sau vào file `main.cf`
```html
vim /etc/postfix/main.cf
relayhost = [email-smtp.us-east-1.amazonaws.com]:587                     #Thông tin này lấy ở phần SMTP setting như hình trên. 
smtp_sasl_auth_enable = yes
smtp_sasl_security_options = noanonymous
smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd            #Đây là file sẽ chứa user/pass của SMTP user , ta sẽ tạo ở bước tiếp theo.
smtp_use_tls = yes
smtp_tls_security_level = encrypt
smtp_tls_note_starttls_offer = yes
```
**tạo file sasl_passwd**
```html
vim /etc/postfix/sasl_passwd
[email-smtp.us-east-1.amazonaws.com]:587 SMTPUSERNAME:SMTPPASSWORD                #Thông tin user và pass lấy ở bước tạo Credential ở trên nhé.
```
Tiếp theo là chạy lệnh sau để tạo hash chứa thông tin user/pass
```html
sudo postmap hash:/etc/postfix/sasl_passwd
```
**master.cf**
Tiếp đến là edit file `master.cf` và thêm dòng này vào file.
```html
vim /etc/postfix/master.cf
-o smtp_fallback_relay=
```

Cuối cùng là tìm và dẫn đường dẫn CA certificate cho Postfix. Centos7 thì nó sẽ là `/etc/ssl/certs/ca-bundle.crt`. Trên OS khác thì bạn tìm cái tương tự nhé. Postfix sẽ cần cái CA cert này để verify với SES cert của AWS.
```html
sudo postconf -e 'smtp_tls_CAfile = /etc/ssl/certs/ca-bundle.crt'
```
Xong xuôi thì bạn restart lại Postfix bằng lệnh `sudo systemctl restart postfix` nhé.

Vậy là đã hoàn tất. Tiếp đến chúng ta thử gửi mail nào. Dùng command sau để gửi mail nhé.
```html
sendmail -f sender@abc.xyz recipient@abc.xyz
From: Sender Name <sender@abc.xyz>
Subject: Amazon SES Test                
This message was sent using Amazon SES.                
.                                                                                                                                       #lưu ý cuối command là dấu chấm `.` nhé. Đây là format để Postfix biết là đã kết thúc 1 email và send nó đi :D
```

Vậy là đã xong phần config gửi mail. Bạn có thể mở email `recipient` ra để check xem có nhận đc mail hay không nhé. Hoặc mở log của Postfix xem cũng được. Đây là đoạn log sent mail của Postfix, các bạn để ý `status=sent` ở dòng thứ 4 .nếu gửi thành công.
```html
Apr 13 11:58:58 quality-front-stg postfix/pickup[4413]: 2BC7DC578C2: uid=1001 from=<sender@abc.xyz>
Apr 13 11:58:58 quality-front-stg postfix/cleanup[4427]: 2BC7DC578C2: message-id=<6015d2e39dbe599414f9471bfe3bfd0b@abc.xyz>
Apr 13 11:58:58 quality-front-stg postfix/qmgr[4414]: 2BC7DC578C2: from=<sender@abc.xyz>, size=1146, nrcpt=1 (queue active)
Apr 13 11:58:59 quality-front-stg postfix/smtp[4429]: 2BC7DC578C2: to=<do.hoang.minh.hung@gmail.com>, relay=aspmx.l.google.com[108.177.97.27]:25, delay=0.91, delays=0.01/0/0.39/0.51, dsn=2.0.0, status=sent (250 2.0.0 OK 1523620739 a5-v6si5116036plp.196 - gsmtp)
Apr 13 11:58:59 quality-front-stg postfix/qmgr[4414]: 2BC7DC578C2: removed
```

Vậy là đã hoàn tất phần gửi mail. Mục đích chính của mình là config để gửi mail, nhưng mình cũng sẽ nói qua về cơ chế nhận mail của SES. 

Đối với trường hợp verify bằng Email Address, thì email đó đã tồn tại rồi. Do đó việc nhận email cũng đơn giản, bạn có thể dùng chính Email đó để nhận mail.

Trường hợp các bạn Verify Domain như mình và chưa có bất kỳ email nào của domain đó, thì để nhận mail bằng SES thì các bạn phải làm thêm các bước sau :
 - Các bạn điền thêm Record DNS dùng để nhận mail ở bước Verify domain ở trên. 
 - Tạo một S3 dùng để chứa email nhận.
 - Vào phần Email `Receiving -> Rule Sets -> kích vào Create a New Rule Set` để tạo 1 rule nhận email. Email các bạn nhận được sẽ được lưu vào S3 với dạng Raw mail, và phải download về rồi dùng 1 mail client nào đó mở lên xem.
Chi tiết có thể tham khảo hướng dẫn của AWS tại  [đây](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/receiving-email-getting-started-receipt-rule.html)

Đây là lý do vì sao SES thường được dùng cho chức năng gửi hơn là nhận mail. Vì nó là 1 mail service simple theo đúng nghĩa đen :v . 

## Kết luận :
Nhìn chung thì SES là một dịch vụ được tối ưu cho việc gửi mail với giới hạn gửi mail tương đối lớn. Dễ dàng tích hợp vào các service khác của AWS. Tất nhiên còn rất nhiều ứng dụng của SES nhưng với trình độ newbie như mình và bài viết mình cũng định hướng đến newbie thì mình chỉ tập trung đến tính năng cơ bản nhất của SES mà thôi. Chi tiết hơn thì các bạn có thể tham khảo thêm ở [đây](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/Welcome.html). Chào thân ái và quyết thắng :D