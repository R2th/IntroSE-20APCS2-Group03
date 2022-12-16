Trong quá trình xây dựng 1 ứng dụng, cần làm chức năng gửi mail tuy nhiên bạn gặp một số vấn đề như sau:
* Bạn  không muốn thiết lập mail thử nghiệm.
*  Bạn không muốn 1 mail spam sẽ được gửi từ mail thử nghiệm của bạn vô tình đến 1 mail nào đó. Khiến rò rĩ thông tin đến end-user, hoặc vô tình public dự án đang trong quá trình phát triển ra ngoài.
*  Không cần phải mở mail để test, Muốn reivew email ngay trên trình duyệt.

=> Gem `"Letter Opener"` sẽ giúp bạn giải quyết vấn đề đó một cách đơn giản. 
## 1. Cài đặt
* Để sử dụng được gem `"Letter Opener"` đầu tiên bạn cần thêm nó vào môi trường Development bằng cách:
     * Thêm vào vào `Gem file`:

        ```
        gem "letter_opener", :group => :development
        ```
     *  của bạn sau đó mở command lên và chạy lệnh `bundle` để cài đặt nó
 * Sau đó bạn cần thiết lập phương thức `delivery method` trong file `config/environments/development.rb` như sau:
    ```
    config.action_mailer.delivery_method = :letter_opener
    ```
## 2. Sử dụng
* Sau khi cài đặt thì bây giờ bất kỳ email nào cũng sẽ được bật lên trong trình duyệt của bạn thay vì được gửi đi.
* Các tin nhắn được lưu trữ trong `tmp/letter_opener`.
*  Nếu bạn muốn thay đổi ứng dụng đó sẽ được sử dụng để mở email của bạn, bạn nên ghi đè biến môi trường `LAUNCHY_APPLICATION` hoặc thiết lập `Launchy.application` trong initializer.

## 3. Non Rails Setup
Nếu bạn không sử dụng Rails, ta có thể dễ dàng thiết lập bằng cách sử dụng [Mail gem](https://github.com/mikel/mail). Chỉ cần thiết lập các phương pháp phân phối khi cấu hình Mail và chỉ định một vị trí.
```
require "letter_opener"
Mail.defaults do
  delivery_method LetterOpener::DeliveryMethod, :location => File.expand_path('../tmp/letter_opener', __FILE__)
end
```
Phương pháp này là tương tự nếu bạn đang sử dụng [Pony gem](https://github.com/benprew/pony):
```
require "letter_opener"
Pony.options = {
  :via => LetterOpener::DeliveryMethod,
  :via_options => {:location => File.expand_path('../tmp/letter_opener', __FILE__)}
}
```
Ngoài ra, nếu bạn đang sử dụng `ActionMailer` trực tiếp (không có Rails), bạn sẽ cần thêm các phương pháp phân phối.
```
require "letter_opener"
ActionMailer::Base.add_delivery_method :letter_opener, LetterOpener::DeliveryMethod, :location => File.expand_path('../tmp/letter_opener', __FILE__)
ActionMailer::Base.delivery_method = :letter_opener
```
Letter Opener sử dụng [Launchy](https://github.com/copiousfreetime/launchy) để mở gửi mail trong trình duyệt.
Điều này giả định quá trình Ruby được chạy trên các máy phát triển địa phương. 

Nếu bạn đang sử dụng một dàn máy chủ riêng biệt hoặc máy ảo này sẽ không làm việc. Trong trường hợp đó xem xét sử dụng [Mailtrap](https://mailtrap.io/) hoặc [MailCatcher](https://mailcatcher.me/).
## 4. Tài liệu tham khảo
https://github.com/ryanb/letter_opener