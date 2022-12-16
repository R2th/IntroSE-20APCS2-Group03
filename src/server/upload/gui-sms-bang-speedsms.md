# Giới thiệu
Hiện nay trong hầu hết các dự án đều yêu cầu chức năng gửi thông tin xác thực OTP, gửi tin nhắn quảng cáo, ... Với các bạn dev thì chắc hẳn đã quá quen thuộc với Twilio tuy nhiên thì giá thành của nó thì lại khá đắt đỏ. Hôm nay mình sẽ giới thiệu tới mọi người [speedsms](https://speedsms.vn/) với chi phí sử dụng khá thấp và cung cấp nhiều gói dịch vụ khác nhau, đặc biệt đây là hàng của Việt Nam nên bạn sẽ nhận được hỗ trỡ rất nhanh và tận tình bằng tiếng việt :D. 
# Cài đặt
SpeedSMS API có thể tích hợp vào ứng dụng của mình 1 cách dễ dàng và nhanh chóng. ĐIều duy nhất bạn cần làm đó là tạo một tài khoản tại địa chỉ https://connect.speedsms.vn.  Mỗi tài khoản đăng ký sẽ được cấp một API access token. Ứng dụng của bạn sẽ sử dụng API access token này để xác thực (authenticate) với SpeedSMS API.

Để lấy API access token, bạn vui lòng đăng nhập tại địa chỉ https://connect.speedsms.vn, sau đó vào menu: "Settings" chọn "Profile". 

![](https://images.viblo.asia/05d44f3b-68c2-4cbd-b175-210d86bb6ab3.png)

Tuy nhiên để sử dụng được dịch vụ thì chúng ta cần phải xác thực số điện thoại thông qua tin nhắn OTP. 

![](https://images.viblo.asia/74527330-80b9-4c15-9e1d-eba7c7769f20.png)
Sau khi xác thực thành công các bạn sẽ được tặng 2000k VNĐ để gửi tin nhắn test. 
# Sử dụng 
Trên hướng dẫn https://speedsms.vn/sms-api-service/ của speedsms có cung cấp sẵn code mẫu cho các ngôn ngữ PHP, Java, C#, NodeJS nên mình sẽ cung cấp cho các bạn code Ruby để thực hiện gửi SMS. 

```Ruby
# frozen_string_literal: true

require "net/http"
require "uri"

class SmsAdapter
  OPENTIME_OUT = 10
  READTIME_OUT = 10
  CUSTOMER_CARE = "2"

  def initialize
    @uri = URI.parse "http://api.speedsms.vn/index.php/sms/send"
    @client = Net::HTTP::Post.new @uri
    @client.basic_auth "API token của bạn", ":x"
    @client.content_type = "application/json"
  end

  def send_sms to: nil, text: "", brandname: ""
    return unless to

    begin
      form_data = {to: to, content: text, sms_type: CUSTOMER_CARE, sender: brandname}
      @client.set_form_data form_data
      request_sender = Net::HTTP.start(@uri.host, @uri.port, use_ssl: @uri.scheme == "https") do |http|
        http.open_timeout = OPENTIME_OUT
        http.read_timeout = READTIME_OUT
        http.request @client
      end
      request_sender

      @response = JSON.parse request_sender.body, symbolize_names: true
      @response[:status] == "success"
    rescue StandardError
      @response = nil
      false
    end
  end
end
```

Ở đây mình demo một đoạn code gửi đơn giản không sử dụng tới xác thực 2 lớp. Tùy theo yêu cầu của dự án các bạn có thể kiểm tra request thành công hay thất bại và trả về lỗi cụ thể theo danh sách mã lỗi ở phía dưới. Để tìm hiểu chi tiết hơn các bạn có thể tham khảo thêm trong doc để sử dụng. 

Có một số thông tin cần phải quan tâm khi gửi đó là: 

### sms_type
Có các giá trị như sau

* 1: tin nhắn quảng cảo
* 2: tin nhắn chăm số khách hàng
* 3: tin nhắn gửi bằng brandname
* 4: tin nhắn gửi bằng brandname mặc định (Verify hoặc Notify)
* 5: tin nhắn gửi bằng app android, tải app tại [đây](https://play.google.com/store/apps/details?id=com.speedsms.gateway)
* 6: tin nhắn gửi bằng đầu số cố định
* 7: tin nhắn gửi bằng đâu số riêng được đăng ký với SpeedSMS
* 8: tin nhắn gửi bằng đầu số cố định 2 chiều

### brandname

Nếu bạn chọn sms_type là 2 thì có thể để trống giá trị này, hệ thống sẽ dùng số ngẫu nhiên để gửi. Trường hợp các sms_type khác thì sẽ là "tên thương hiệu hoặc số điện thoại đã đăng ký với SpeedSMS hoặc android deviceId của bạn"

### Dữ liệu trả về
* Thành công: 

```json
{ "status": "success", "code": "00", "data": { "tranId": transaction id number, "totalSMS": total sms number, "totalPrice": total price number, "invalidPhone": array of phone numbers } }
```

* Thất bại:
```json
{ "status": "error", "code": "error code", "message": "error description" }
```

### Danh sách error code: 

* 007: IP bị khóa
* 008: Tài khoản bị khóa
* 009: Tài khoản không được phép gọi tới API
* 101: Thiếu hoặc sai param
* 105: Số điện thoại không hợp lệ - hiện tại thì SpeedSMS đã hỗ trợ tất cả các đầu số di động tại Việt Nam.
* 110: Không hỗ trợ mã hóa nội dung sms
* 113: Nội dung SMS quá dài
* 300: Tài khoản không đủ để thực hiện gửi SMS
* 500: Internal error

Trên đây là tất cả các thông tin cơ bản. Các bạn có thể tự thực hiện gửi một tin nhắn SMS tới số điện thoại của mình để kiếm tra. 

# Vận hành
Để sử dụng dịch vụ của SpeedSMS các bạn cần phải nạp tiền kiểu như sử dụng sim trả trước. 

Để nạp tiền, bạn truy cập vào https://connect.speedsms.vn, sau đó vào menu: "Nạp tiền" và lựa chọn các hình thức thanh toán phù hợp nhất. Trường hợp khi tài khoản của bạn hết tiền, hệ thống sẽ gửi tin nhắn thông báo để bạn có thể xử lí. Ngoài ra bạn có thể cài đặt giá trị tối thiểu của số dư để nhận thông báo để có xử lí cho phù hợp tránh trường hợp bị hết tiền khi hệ thống đang trong giai đoạn vận hành. 

Trong trường hợp muốn đăng kí **brandname** bạn sẽ cần phải cung cấp các giấy tờ và làm việc trực tiếp với speedsms để nhận được hỗ trợ nhanh chóng và nhận được ưu đãi từ SpeedSMS. 

Bên cạnh hỗ trợ nhiều dịch vụ thì speedsms cũng cung cấp trang quản lí để hỗ trợ các bạn dev rất nhiều trong việc thống kê báo cáo, kiểm tra trạng thái tin nhắn gửi đi. 

![](https://images.viblo.asia/ed178dc9-7521-4c41-98c2-970c421444cc.png)

# Tổng kết

Mình hi vọng răng với những giới thiệu cơ bản trên đây các bạn có thể dễ dàng thao tác gửi SMS thông qua speedsms. Về chi phí trung bình chỉ tốn khoảng 500VNĐ cho 1 tin nhắn nên mình nghĩ đây là một giá khá hợp lí. Theo như mình đang sử dụng để test thì chi phí có thể rẻ hơn khi sử dụng với đầu số ngẫu nhiên khoảng 250 hoặc 350 VNĐ tùy theo nhà mạng. Đối với các dự án hướng tới khách hàng trong nước mình nghĩ đây là lựa chọn khá phù hợp. Tất nhiên speedsms cũng hỗ trợ việc gửi tin nhắn tới các nhà mạng nước ngoài. Nếu có gì cần tìm hiểu bạn có thể trao đổi với bộ phận Chăm sóc khách hàng để có thêm thông tin cần thiết.