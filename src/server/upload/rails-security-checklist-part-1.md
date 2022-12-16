Bài viết được dịch từ https://github.com/eliotsykes/rails-security-checklist

___

Checklist này chỉ giới hạn trong các biện pháp phòng ngừa bảo mật của Rails, ngoài ra có nhiều khía cạnh khác khi chạy ứng dụng Rails cần được bảo mật (ví dụ: hệ điều hành và phần mềm khác) mà không được liệt kê ở đây. Bạn vần cần tham khảo ý kiến của các chuyên gia bảo mật.

Một mục đích của tài liệu này là biến nó thành tài nguyên cộng đồng giống như [Ruby Style Guide](https://github.com/bbatsov/ruby-style-guide).

**Cảnh báo**: checklist này không đầy đủ và ban đầu được soạn thảo bởi một Rails developer với sự quan tâm đến bảo mật chứ không phải chuyên gia bảo mật vì vậy nó có thể có một số vấn đề.

# Rails Security Checklist
## Controller

 - Kích hoạt các callback an toàn mặc định cho `ApplicationController` (và các abstract controller khác)
 
     - Kích hoạt các callback authentication cho các action (`authenticate_user!` của Devise)
     - Kích hoạt các callback authorization cho các action (`verify_authorized` của Pundit)
     - Kích hoạt các callback scoping có liên quan đến authorization cho các action (`verify_policy_scoped` của Pundit)
     - Kích hoạt bảo vệ CSRF (protect from forgery)
     
 - Khi vô hiệu hoá các callback liên quan đến bảo mật, hãy nhắm đến các action theo từng trường hợp cụ thể. Hãy lựa chọn thật kĩ và chỉ vô hiệu hoá callback trong 1 controller cụ thể. Cần tránh làm ảnh hưởng tới sự kết thừa các class controller và làm các class con trở nên kém bảo mật.

## Route
 
- Kiểm tra authentication và authorization trong `routes.rb`. Việc này sẽ gây sự lặp lại nhiều kiểm tra bảo mật mà chúng ta thực hiện trong controller callback nhưng nó là có chủ đích.
- Kiểm tra tất cả các URL endpoint của các engine và các Rack app mount trong `routes.rb`, hãy đảm bảo là chúng được bảo vệ bởi các kiểm tra authentication và authorization 1 cách chính xác. Đối với các engine và Rack app nhạy cảm, không nên để lộ là chúng được cài đặt bằng cách trả về lỗi 404 đối với những user chưa đăng nhập.
- Kiểm tra các engine và Rack app dành cho môi trường develop hay test, hãy chắc chắn là chúng không để lộ ra các URL endpoint ở môi trường production. Thậm chí cũng không nên để lộ rằng chúng được cài đặt (ví dụ thông qua reponse với HTTP status 500). 1 cách lí tưởng thì không nên cài chúng ở môi trường production.

## View

- Tránh việc sử dụng HTML comment trong file view template vì chúng có thể được nhìn thấy bởi client. Hãy sử dụng server-side comment:

    ```ruby 
    # Không tốt - HTML comment có thể được nhìn thấy bởi những user sử dụng chức năng "View Source":
    <!-- This will be sent to clients -->
    <!-- <%= link_to "Admin Site", "https://admin.example.org/login" %> -->

    # OK - ERB comment được xoá bởi server và client sẽ không thể thấy được:
    <%# This will _not_ be sent to clients %>
    <%#= link_to "Admin Site", "https://admin.example.org/login" %>
    ```
    
## URL Secret Token

- Tránh việc để lộ URL secret token cho các bên thứ 3 thông qua header `Referer` (ví dụ: các URL reset password có thể bị lộ tới các CDN, JS host bởi các bên thứ 3 hay các trang liên kết) https://robots.thoughtbot.com/is-your-site-leaking-password-reset-links


## ID

- Tránh việc để lộ ID dưới dạng dãy liên tục (98, 99, 100, ...) vì việc này có thể làm lộ thông tin liên quan đến app của bạn hoặc hỗ trợ [forced browsing attacks](https://www.owasp.org/index.php/Forced_browsing). Ví dụ, các ID liên tục có thể được thấy ở URL, trong các field trong HTML form, các API. Các ID liên tục cho biết kích thước và tốc độ mà 1 số dạng dữ liệu được tạo trong app của bạn. Chẳng hạn như nếu 1 đối thủ đăng ký dịch vụ của bạn và trang cá nhân của người đó có path là `/users/12000`, sau 1 tháng người đó lại đăng ký và thấy path trang cá nhân mới là `/users/13000` thì có nghĩa bạn đã để lộ rằng dịch vụ của bạn có khoảng 1000 lượt đăng ký 1 tháng và có tổng cộng 13000 user. Có 1 giải pháp tuy không được ủng lộ lắm đó là bắt đầu các ID từ 1 số rất lớn nhưng dù sao làm thế cũng vẫn để lộ tốc độ mà dữ liệu mới được tạo.

- Nếu bắt buộc phải để ID trong URL hay form thì nên lựa chọn các ID khó đoán hơn như UUID hay [hashid](https://github.com/peterhellberg/hashids.rb) thay vì các ID liên tục. Đối với file hãy cân nhắc sử dụng các kĩ thuật như [URI Obfuscation](https://github.com/thoughtbot/paperclip#uri-obfuscation) của Paperclip để tạo ra các đường dẫn file không thể đoán được.

- Cấu hình model generator của Rails để sử dụng UUID làm khoá chính 1 cách mặc định

    ```ruby
    # In config/application.rb
    config.generators do |g|
      g.orm :active_record, primary_key_type: :uuid
    end
    ```
    
## Logging

- Tránh sử dụng cấu hình mặc định kém bảo mật của Rails như dùng 1 blocklist và log hầu hết các parameter của request. Nên dùng 1 safelist thay cho blocklist. Nếu không muốn Rails log bất kì parameter nào của request thì có thể config như dưới

    ```ruby
    # File: config/initializers/filter_parameter_logging.rb
    Rails.application.config.filter_parameters += [:password]
    if Rails.env.production?
      MATCH_ALL_PARAMS_PATTERN = /.+/
      Rails.application.config.filter_parameters += [MATCH_ALL_PARAMS_PATTERN]
    end
    ```

- Thường xuyên kiểm tra những data được bắt bởi các dịch vụ ghi log, bắt lỗi, monitoring của bên thứ 3. Bạn và cả user của bạn có thể sẽ phải bất ngờ vì những thông tin nhạy cảm bạn sẽ tìm thấy. Luôn ghi nhớ rằng dữ liệu ghi trong log file và các dịch vụ bên thứ 3 có thể bị lộ.
- Nên ghi log 1 cách tối thiểu
- Cân nhắc việc không ghi log hoặc thường xuyên xoá log lưu bởi dịch vụ của bạn và các bên thứ 3.

## Input Sanitization

- Luôn filter và kiểm tra tất cả các input của user
- Tránh các đoạn code đọc filesystem mà có sử dụng file name và path được nhập bởi user. Nếu không tránh được việc này thì nên sử dụng 1 safelist quy định các file name và path nào có thể được đọc.
- Đối với bất kì route nào redirect đến 1 URL được cho bởi query string hoặc POST param, nên sử dụng 1 safelist chứa các URL được chấp nhận hoặc chỉ redirect đến các path trong app. Không bao giờ cho phép redirect đến bất kì URL nào.
- Cân nhắc thêm 1 tầng bảo vệ vào strong parameter để chặn các value không thoả mãn các điều kiện về type (https://github.com/zendesk/stronger_parameters)
- Cân nhắc sanitize tất cả các ActiveRecord attribute (https://github.com/flavorjones/loofah-activerecord)

## Markdown Rendering

- Ưu tiên việc render markdown có sử dụng 1 safelist của các feature được cho phép và cấm việc render HTML tuỳ ý, nhất là khi chấp nhận input dưới dạng markdown từ user.
- Nếu sử dụng `RedCarpet`, nên dùng `Redcarpet::Render::Safe` thay cho các renderer khác như `RedCarpet::Render::HTML`
    ```ruby
    # không tốt 
    `renderer = Redcarpet::Render::HTML.new

    # đỡ nguy hiểm hơn
    renderer = Redcarpet::Render::Safe.new
    ```
    
## Uploads và xử lý file 

- Tránh xử lý việc upload file ở server application của bạn
- Nên sử dụng các dịch vụ của bên thứ 3 để quét virus/malware đối với các file được upload. Không nên làm việc đó trên server của bạn.
- Sử dụng 1 safelist của các file được phép upload
- Tránh việc chạy imagemagick hoặc các phần mềm xử lý ảnh trên hạ tầng của bạn

## Email

- Hạn chế số lượng email có thể được gửi tới cho 1 user (1 số app cho phép gửi nhiều email reset password tới 1 user mà ko có hạn chế gì)
- Tránh gửi các thông tin mà user nhập cùng với email mà có thể được sử dụng trong 1 cuộc tấn công. Ví dụ: URL sẽ trở thành link trong hầu hết mail client, nếu 1 kẻ tấn công nhập URL (thậm chí nhập vào 1 trường không nên là URL) và app của bạn gửi URL đó trong mail đến 1 user khác thì user đó (nạn nhân) có thể click vào URL mà kẻ tấn công nhập.
- Bảo mật email (cần thêm thông tin)
    - Sử dụng DKIM (https://scotthelme.co.uk/email-security-dkim/)
    - ...

## Phát hiện các hành vi lạm dụng và gian lận

- Báo cho user biết thông qua email khi password được thay đổi (HOWTOs: [Devise](https://github.com/plataformatec/devise/wiki/Notify-users-via-email-when-their-passwords-change))
- Nên thông báo cho user về những sự kiện quan trọng liên quan đến tài khoản, ví dụ như thay đổi password, thay đổi credit card, có cuộc gọi đến trung tâm hỗ trợ khách hàng/kĩ thuật, mới bị thu phí, mới có email hoặc các thông tin liên lạc được thêm vào, nhập sai password, 2FA được kích hoạt hoặc vô hiệu hoá, thay đổi các settings khác, đăng nhập từ 1 khu vực hoặc IP address hoàn toàn mới...
- Không gửi password mới thông qua email không được mã hoá
- Cân nhắc việc lưu lại lịch sử của các sự kiện quan trọng liên quan đến tài khoản (đăng nhập, thay đổi password, ...) để user có thể xem lại (và có thể gửi đến user dưới dạng báo cáo tóm tắt hàng tháng)
- Hạn chế tần suất của các hành động nguy hiểm. Ví dụ: ngăn chặn tấn công password theo kiểu bruteforce bằng cách chỉ cho phép 1 số lần đăng nhập nhất định trong 1 giây.
- Hạn chế việc tạo các ra các dữ liệu có giá trị theo từng user, theo địa chỉ IP, theo quốc gia, theo zip code, theo số điện thoại, theo số an sinh xã hội, hoặc theo 1 sự kết hợp của các yếu tố này để làm giảm thiểu các hình thức tấn công (DDOS, overflow, lừa đảo, ...). Ví dụ như chỉ cho phép 3 số an sinh xã hội đối với mỗi địa chỉ IP có thể làm giảm số lượng các ứng dụng gian lận thẻ tín dụng ([source](https://twitter.com/theroxyd/status/827525528429137920))

## Đăng nhập, đăng ký

- Nên sử dụng bảo mật nhiều lớp
- Nên sử dụng Yubikey hoặc các giải pháp tương tự
- Mặc định bật bảo mật nhiều lớp cho user hoặc khuyến khích user làm việc đó. Ví dụ: MailChimp giảm giá 10% khi bật 2FA
- Hạn chế tần suất truy cập theo địa chỉ IP hoặc thiết bị, đặc biệt là với quản trị viên
- Yêu cầu user xác thực tài khoản (tham khảo module confirmable của Devise)
- Khoá tài khoản sau khi nhập sai password N lần (tham khảo module lockable của Devise)
- Đặt thời gian timeout sau khi login (tham khảo module timeoutable của Devise)
- Hạn chế các hành vi enumeration của user ([source](https://www.owasp.org/index.php/Testing_for_user_enumeration_(OWASP-AT-002)))
    - Clearance mặc định sẽ hạn chế user enumeration (ngoại trừ khi đăng ký) ([source](https://github.com/eliotsykes/rails-security-checklist/issues/21#issuecomment-294912368))
    - Devise cần phải được config để bật chế độ `paranoid` thì mới có thể hạn chế user enumeration (ngoại trừ khi đăng ký) ([source](https://github.com/eliotsykes/rails-security-checklist/issues/21#issue-222185446)) 
    - Cả Clearance và Devise đều không hạn chế user enumeration khi đăng ký vì các ứng dụng thường muốn đưa ra thông báo nếu địa chỉ email đã được đăng ký

## Mật khẩu

- Sử dụng các thuật toán hash mật khẩu mạnh hơn với workload cao hơn. Tại thời điểm triển khai, nghiên cứu xem có thuật toán hash mật khẩu nào đang được khuyên dùng.
- Đặt lịch nhắc nhở để thường xuyên xem lại các phương pháp lưu trữ mật khẩu của bạn và xem xem có cần chuyển đổi sang 1 cơ chế khác hoặc tăng workload lên không khi mà hiệu suất của CPU luôn tăng theo thời gian.
- Ngăn chặn việc sử dụng lại mật khẩu
- Yêu cầu sử dụng password dài và mạnh
- Ngăn chặn các password thường được sử dụng 
- Chủ động thông báo, ngăn chặn, đặt lại mật khẩu cho những user mà sử dụng mật khẩu đã bị lộ từ các dịch vụ khác 
- Cân nhắc thêm 1 lớp mã hoá vào các hash mật khẩu (và các dữ liệu bí mật khác)

(còn tiếp)