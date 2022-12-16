Phương châm viết bài để lưu lại kiến thức cho bản thân cũng như cho những ai cần hôm nay mình xin chia sẻ cách kiểm tra mail còn hoạt động hay không trên RoR (Ruby On Rails).

Nội dung:
1. Check Mail Format (REGEX)
2. Check DNS
3. Check SMTP

1.Check Mail Format (REGEX)
Đầu tiên thì chắc là cũng rất quen thuộc với quý anh em đấy là check format bằng chuỗi regex. Regex để check mail thì các quý anh em cứ lên google
search thì nó ra một đống. Dưới đây là regex của bản thân hay dùng. nếu anh em thấy hợp lý thì cứ copy paste vào :)
```
  EMAIL_REGEX = /\A[a-zA-Z0-9.!\#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\z/
```
để dùng đoạn regex ở trên thì cứ cho i xì đúc vào file model của quý anh em nhé. của mình sẽ là app/models/user.rb
```
validates :email, presence: true, format: { with: EMAIL_REGEX }  #Nếu quý anh em chỉ dùng regex thì cái này
validate :check_mail #Còn muốn mở rộng thì dùng cái này nhé!


def check_mail
    if email.present? && email.match?(EMAIL_REGEX)
         # chỗ này sẽ thêm phần check DNS vs SMTP ở dưới nha anh em
    else
        erors.add(:email, "Email is invalid")
    end
end
```
vậy là xong phần check regex tiếp theo tới check dns.

2. Check DNS
    Thì để resolv dns thì quý anh em thêm require 'resolv' vào nhé, còn thêm như thế nào thì đơn giản cứ copy paste vào file model user.rb là xong thôi :)
```
 require 'resolv'
 
 
  EMAIL_REGEX = /\A[a-zA-Z0-9.!\#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\z/
 
 validate :check_mail
 
 def check_mail
    if email.present? && email.match?(EMAIL_REGEX)
        domain = email.split("@").last
        records = Resolv::DNS.open do |dns|
            dns.getresources(domain, Resolv::DNS::Resource::IN::MX)
        end
        unless records.empty?
            # Chỗ này chừa lại để bản thân thêm phần check SMTP nha anh em
        else
            errors.add(:email, "domain is invalid")
        end
    else
        erors.add(:email, "is invalid")
    end
end
 
```

anh em thấy đơn giản không nào. chỉ cần chịu khó google vs một search key hợp lý là ra thôi. =)) vậy là xong phần check DNS rồi. 

4. Check SMTP 
    Phần cuối cùng sẽ là check SMTP. Để sử dụng smtp trong rails anh em thêm thư viện net/smtp vào nhé, nó sẽ là require 'net/smtp' vào trên hoặc dưới cái require 'resolv' lúc nẫy cho dễ nhìn nhé.
    vào code của chúng ta sẽ là:
```
  require 'resolv'
  require 'net/smtp'
 
  EMAIL_REGEX = /\A[a-zA-Z0-9.!\#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\z/
 
 validate :check_mail
 
 def check_mail
    if email.present? && email.match?(EMAIL_REGEX)
        url = "fts.co.jp"                                           #Host của anh em nhé
        domain = email.split("@").last
        records = Resolv::DNS.open do |dns|
            dns.getresources(domain, Resolv::DNS::Resource::IN::MX)
        end
        unless records.empty?
            records.each do |r|
                  begin
                        Net::SMTP.start(r.exchange.to_s, 25, url) do |smtp|
                           smtp.mailfrom(ApplicationMailer.default[:from])     # Gửi từ send mail của app nhé
                           res = smtp.rcptto(email)
                           result = res.string.chomp.gsub(/\s+/m, ' ').gsub(/^\s+|\s+$/m, '').split(" ")
                           Rails.logger.debug("SMTP_RCPT_TO_RESULT: #{result}")
                           if result[0] != "550"
                               return true
                            end
                      end
                  rescue Exception => e 
                       Rails.logger.debug("SMTP_ERROR: #{e}")
                       next # skip if has error
                  end
            end
                 # Nếu chạy hết resolved dns mà vẫn chưa return true thì thôi nghỉ
                errors.add(:email, "invalid")
        else
            errors.add(:email, "domain is invalid")
        end
    else
        erors.add(:email, "is invalid")
    end
end
 
```
đến đây thì hoàn thành nhé anh em.
thông thường thì chỉ cần kiểm tra cái dns đầu tiên là ok (đối vs gmail...) nhưng đối vs mail công ty thì sẽ có những công ty có trên 1 MX server nên mình check tất cho chắc ăn. nếu một trong số đó trả về khác 550 thì coi như mail đó active.
giải thích cho anh em xíu là mình dùng phương thức rcpt để check nhé. thường thì nếu mail không tồn tại hoặc lỗi thì MX serve sẽ trả về lỗi 550.

Cảm ơn anh em đã tốn thời gian cho bài viết này. Nếu anh em thấy video hay, ý nghĩa thì cho mình một like share và sụp-rai kênh Quang Linh Vlog để ủng hộ anh em chúng ...... nhầm :)) rất mong nhận được comment của quý anh em 

Anh em có thể tham khảo thêm:
[SMTP, RCPT Mail](https://cr.yp.to/smtp/mail.html)
[Cái này là Python chứ mà mình tham khảo phần logic nhé anh em](https://github.com/karolyi/py3-validate-email/blob/master/validate_email/smtp_check.py)
[Check Active Mail online](https://email-checker.net/check)