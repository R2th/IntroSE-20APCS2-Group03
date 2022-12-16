## Mô tả
Khi nạn nhân truy cập vào một website cho phép mà website này lại cho phép điều hướng trình duyệt đến một `URL` khác. Ví dụ như trang web `www.example.com` có chức năng điều hướng đến 1 website dịch vụ con của nó như sau:
```
https://www.example.com/?redirect_to=https://www.sub.example.com
```
 - Khi người dùng truy cập vào `URL` trên trang example sẽ trả về 1 `response` có code 302 để điểu hướng trình duyệt của người dùng. Sau đó trình duyệt người dùng sẽ gọi 1 GET request đến trang https://www.sub.example.com. Bây giờ `attacker` sẽ thay đổi url trên để điều hướng người dùng đến trang không an toàn do `attacker` tạo ra ví dụ:
 ```
https://www.example.com/?redirect_to=https://attacker.com
```
Nếu trang `example.com` này không kiểm tra lại `request param` mà người dùng gửi lên thì nó sẽ tạo 1 `response` chuyển hướng sang trang của `attacker` rồi trả về cho người dùng. Và người dùng sẽ bị điều hướng đến trang chứa mã độc, quảng cáo, ... của `attacker`.

Theo xếp hạng của `The Open Web Application Security Project (OWASP)` thì nó nằm trong top 10 nguy cơ bảo mật web của năm 2013. 

Việc dính lỗi này từ các web site mà có lượng người sử dụng lớn và có độ tin cậy cao có thể đưa nhiều nạn nhân đến với các trang web nguy hiểm. Nó còn có thể dùng để để lừa đảo người dùng gửi các thông tin các nhân lên các website giả mạo mà nạn nhân vẫn tin tưởng rằng mình đã gửi thông tin cho website có thể tin tưởng được. Và nó cũng cho phép `attacker` phát tán `malware` từ trang web nguy hiểm, hoặc ăn cắp `tokens` xác thức `Oauth`(Khái niệm này mình sẽ nói trong một phần nào đó sau phần này).

Nếu các bạn muốn thử tìm kiếm các website có thể bị dính nguy cơ bảo mật này bạn có thể tìm kiếm các website có sử dụng `GET method` để chuyển đang trang mà bạn cần test, với một `param` là `URL` để điều hướng đến.

## Ví dụ:
 1. Shopify Theme Install Open Redirect
    - Độ khó: Thấp
    - Url: app.shopify.com/services/google/themes/preview/supply–blue?domain_name=XX
    - Report Link: https://hackerone.com/reports/1019621
    - Date Reported: November 25, 2015
    - Bounty Paid: $500
    - Description:
     Trong ví dụ đầu tiên, lỗ hổng `open redirect` được tìm thấy ở website `Shopify`. Một chức năng về thương mại điện tử trên website này cho phép người dùng tạo một gian hàng đển bán các sản phẩm. Hệ thống này cho phép người quản trị tùy biến giao diện của của hàng của họ bằng cách cài đặt các `theme` (giao diện) khác nhau. `Shopify` cho phép người dùng xem trước giao diện và kèm theo một tham số chuyển trang trên `URL`. Nó có dạng như sau:
         ```
         https://app.shopify.com/themes/preview/blue?domain_name=example.com/admin
        ```
      Ta có thể sửa đổi link này để dẫn nạn nhân điều hướng đến trang web nguy hiểm hoặc lừa đảo nạn nhân.
      
     Tóm tắt: Không phải tất cả các nguy cơ bảo mật đều phức tạp. `Open redirect` đơn giản chỉ cần sửa đổi `param` domain_name của `URL` là ta có thể điều hướng người dùng đến các website không phải của Shopify.
 2. HackerOne Interstitial Redirect
    - Difficulty: Medium
    - Url: N/A
    - Report Link: https://hackerone.com/reports/111968 3
    - Date Reported: January 20, 2016
    - Bounty Paid: $500
    - Description: Có một cách để tránh nguy cơ bảo mật từ việc `open redỉrect` là mỗi khi người dùng rời khỏi website để chuyển hướng đến một trang web khác thì sẽ dẫn người dùng qua một trang thông báo rằng họ đang được chuyển hướng đến trang khác không phải là trang web của bạn nữa trước khi người dùng thực sự được điều hướng qua đó.
        - Nhưng việc sử dụng phương pháp trên không triệt để vẫn có thể dẫn đến lỗ hổng:
        ```
        https://hackerone.com/zendesk_session?return_to=https://support.hackerone.com/ping/redirect?state=compayn:/
        ```
     - Ta thấy rằng đường link trên đã dính `open redirect` do không kiểm tra việc điều hướng ở `sub domain` `support.hackerone.com`. :)
## Tổng kết
 - `Open redirects` cho phép kẻ tấn công điều hướng người dùng thiếu cảnh giác đến các website nguy hiểm. Để tìm kiếm chúng, cũng giống như các ví dụ mình giới thiệu vừa rồi, chúng ta cần phải chú ý. Các tham số để điều hướng thường dễ dàng nhận biết ví dụ như : redirect_to = , checkout_url=, domain_name=, ...Hoặc đôi khi chúng được rút gọn lại ví dụ: r=, u=,..
 - Kiểu tấn công này sẽ đánh vào lòng tin của nạn nhận. Dẫn nạn nhân đến trang web nguy hiểm của kẻ tấn công. Nếu bạn là 1 web dev thì bạn cần kiểm tra kĩ lưỡng các tham số này và nhớ kiểm tra kĩ url được đưa vào.