## 1: Giới thiệu
Vấn đề bảo mật thông tin cá nhân, thông tin tài khoản trên internet hiện nay đang là vấn đề nhức nhối và được quan tâm lớn. Để tránh sự rò rỉ thông tin cá nhân hay sự xâm nhập của các thành phần xấu trên internet thì người ta đưa ra rất nhiều các thức bảo mật thông tin khác nhau. Trong đó đáng chú ý nhất là phương pháp bảo mật thông tin bằng cách sử dụng xác thực 2 lớp. 

Vậy phương pháp này là gì, cách hoạt động như thế nào. Chúng ta hãy cùng nhau tìm hiểu nhé

## 2: Xác thực 2 yếu tố là gì ?
Xác thực 2 yếu tố là phương pháp xác minh 2 bước, để xác minh đúng là bạn chứ ko phải người khác đăng nhập vào tài khoản của bạn

VD: 
Bạn đăng nhập vào tài khoản gmail của mình, trên các thiết bị quen thuộc của bạn, có lẽ sẽ không cần xác minh. Nhưng trường hợp bạn đăng nhập bằng 1 thiết bị lạ, thì gmail sẽ gửi cho bạn 1 tin nhắn sms dùng để xác minh, hoặc bạn cần nhập 1 mã bí mật từ app Authenticator mà bạn đã đăng ký từ trước, để xác minh chính bạn là người đăng nhập

Phương pháp bảo mật này đôi khi sẽ gây ra phiển toái cho bạn, vì phải trải qua nhiều bước. Nhưng nó rất đáng tin cậy, có thể bảo vệ được tài khoản của bạn tránh được rủi ro lộ thông tin, hoặc bị kẻ xấu chiếm đoạt.

## 3: Cách thức hoạt động !
Bạn sẽ phải trả qua 2 bước để có thể đăng nhập được vào tài khoản của mình.

- Bước 1: Là đăng nhập thông thường bằng username (email) và password của bạn
- Bước 2: Là bước bảo mật để xác thực chính bạn là người đăng nhập

Bước 2 thường có những loại sau
- Trả lời câu hỏi bảo mật
- Mã bí mật được gửi về tin nhắn của số điện thoại mà bạn đã cung cấp
- Dữ liệu sinh trắc học (vân tay, khuôn mặt, mống mắt hoặc giọng nói)
- Khóa bảo mật là 1 thiết bị nhỏ, vd usb
- Các ứng dụng tạo mã xác minh, vd: google authenticator, authy ... được cài đặt trên điện thoại của bạn

![](https://images.viblo.asia/32dbbbf6-2947-4ef7-959a-82f1fda450ba.jpg)


## 4: Vì sao cần phải sử dụng xác thực 2 bước
Không cần nói thì chắc các bạn cũng biết hậu quả của việc lộ thông tin cá nhân trong thời đại internet phát triển như vũ bão hiện nay như thế nào.
Nhẹ thì mất tài khoản, bi sử dụng để truyền bá thông tin không chính thống. Nặng thì tiền mất tật mang, bị lộ thông tin của bạn, người thân trong gia đình, bạn bè thân thiết 

VD:
Tài khoản gmail của bạn có liên kết đến các nhiều tài khoản quan trọng khác, lưu thông tin đối tác, hoặc thông tin ngân hàng của cá nhân. Thì khi bị lộ thông tin gmail, bạn biết hậu quả rồi đấy, toàn bộ những tài khoản bạn liên kết, hoặc thông tin ngân hàng, khách hàng bị mất theo

![](https://images.viblo.asia/240b6c26-043f-46fb-a95c-7ae2b71f5c01.jpg)


Cho nên việc bảo mật thông tin 2 bước là rất cần thiết, bảo vệ bạn tránh khỏi những rủi ro không mong muốn

## 5: Xây dựng phương thức bảo mật 2 lớp cho trang web của bạn
- Trong bài viết này mình sẽ hướng dẫn các bạn bổ sung xác thực 2 lớp cho trang web của bạn, để bảo vệ tránh để lộ thông tin của những người dùng của bạn
- Ngôn ngữ sử dụng Ruby on Rails
- Phương pháp xác thực 2 bước mình sử dụng là dùng mã bí mật được tạo từ app Google Authenticator trên điện thoại

### 5.1 Khởi tạo
Như các bạn đã biết khi sử dụng Ruby on Rails thì có 1 thư viện hỗ trợ cho bạn trong việc xác thực login nhanh chóng, tiện lợi là `gem "devise"`

Chúng ta sẽ kết `devise` và 2 thư viện khác để có thể xác thực được 2 bước là
- `gem "devise-two-factor"` (https://rubygems.org/gems/devise-two-factor). Thư viện này hỗ trợ chúng ta code xác thực 2 bước nhanh hơn, đỡ phải đi viết lại từ đầu
- `gem "rqrcode"` (https://github.com/whomwah/rqrcode). Thư viện này hỗ trợ tạo ra 1 mã QRCode dùng để đăng ký với ứng dụng Google Authenticator trên điện thoại của bạn.

Bắt đầu thôi ....<br>
Để đơn giản thì mình chỉ tạo 1 ứng dụng demo nho nhỏ, chỉ có chức năng login thôi, chứ không có chức năng gì nữa hết
### 5.2 Config model
Model nào sử dụng để quản lý thông tin tài khoản đăng nhập của người dùng thì chúng ta sẽ config xác thực 2 bước trong model đó. Thường thì sẽ là `User Model` .
Chạy khởi tạo devise two factor cho model user
```
rails generate devise_two_factor User OTP_SECRET_KEY
```
`OTP_SECRET_KEY`  là biến môi trường chứa giá trị secret key base của ứng dụng.

Tạo column để lưu mã backup code khi đăng ký two factor
```
rails g migration AddDeviseTwoFactorBackupableToUsers
```

```
class AddDeviseTwoFactorBackupableToUsers < ActiveRecord::Migration[6.0]
  def change
    # Change type from :string to :text if using MySQL database
    add_column :users, :otp_backup_codes, :string, array: true
  end
end
```
Và cần bổ sung `two_factor_backupable` vào trong devise trong model User để có thể support thao tác với mã backup code
```
devise :two_factor_authenticatable, :two_factor_backupable,
         otp_backup_code_length: 10, otp_number_of_backup_codes: 10,
         :otp_secret_encryption_key => ENV['OTP_SECRET_KEY']
```
- `two_factor_authenticatable` Hỗ trợ chúng ta có thể giao tiếp với mã otp từ app google authenticator
- `two_factor_backupable` Hỗ trợ chúng ta thực hiện các hành động liên quan đến backup code, như generate ra mã backup codes, xác thực khi login với mã backup code
- `otp_backup_code_length` Độ dài của mã backup code khi sinh ra. 
- `otp_number_of_backup_codes` Số lượng mã backup code sinh ra trong 1 lần

nếu config `database_authenticatable` không được tự động xóa, thì bạn phải thực hiện xóa nó bằng tay.

Việc tải cả 2 `:database_authenticatable` và `two_factor_authenticatable` trong cùng 1 model sẽ cho phép người dùng bỏ qua tính năng xác thực 2 yếu tố. Đây là các xử lý của thằng Warden 

### 5.3 Create QR Code
Ở bước này mình sẽ tạo ra 1 mã QR code để có thể quét được trên app google authenticator
Tạo 1 controller dùng cho việc đăng ký và thao tác liên quan đến two factor, vd: `TwoFactorSettingController`
```
class TwoFactorSettingsController < ApplicationController
    before_action :authenticate_user!
    
    def new
        if current_user.otp_required_for_login
              flash[:alert] = 'Two Factor Authentication is already enabled.'
              return redirect_to edit_user_registration_path
        end

        current_user.generate_two_factor_secret_if_missing!
    end
end
```
Ở màn hình new này mình sẽ thực hiện hiển thị mã QR Code để quét trên app. Cho nên hàm new mình chỉ kiểm tra đơn giản. 
- Nếu user đã bật xác thực 2 bước rồi thì ta sẽ chuyển hướng qua trang tắt xác thực 2 bước
- Nếu chưa bật xác thực 2 bước thì chúng ta sẽ hiển thị mã QR Code để quét
- Ngoài quét bằng QR thì chúng ta có thể nhập mã để đăng ký bằng tay. Mỗi user sẽ có sinh ra 1 mã riêng để nhập thủ công bằng tay. 

```
current_user.generate_two_factor_secret_if_missing!
```
Câu lệnh này ở trong hàm new. Nên nó sẽ thực hiển kiểm tra xem, nếu user bị thiếu mã code nhập thủ công thì nó sẽ sinh ra 1 mã để user nhập thủ công, nếu có rồi thì sẽ bỏ qua
```
def generate_two_factor_secret_if_missing!
    return unless otp_secret.nil?
    update!(otp_secret: User.generate_otp_secret)
end
```

Thiết kế đơn giản phần view để hiển thị mã QR Code
```
<div class="card">
  <div class="card-header">
    1. Scan QR Code
  </div>
  <div class="card-body">
    <p>Please scan the below QR code using an OTP compatible app (such as Google Authenticator or Authy).</p>
    <hr />
    <p class="text-center">
      <%= qr_code_as_svg(current_user.two_factor_qr_code_uri)%>
    </p>
    <hr />
    <p class="text-center">
      If you cannot scan, please enter the following code manually: <code><%= current_user.otp_secret%></code>
    </p>
  </div>
</div>
```

![](https://images.viblo.asia/592dfa09-a939-4033-87e2-2a6c3b0b02ed.png)

Phần scan QR Code này sẽ có 2 thành phần<br>
1: Mã QR Code<br>
2: Trong trường hợp điện thoại của bạn không thể quét QR Code, thì chúng ta sẽ tự nhập mã code bằng tay vào trong ứng dụng google authenticator

Mã QR Code được tạo ra như thế nào. 
Tạo 1 hàm helper dùng để generate ra cái mã QR Code
```
def qr_code_as_svg(uri)
    RQRCode::QRCode.new(uri).as_svg(
        offset: 0,
        color: '000',
        shape_rendering: 'crispEdges',
        module_size: 4,
        standalone: true
    ).html_safe
end
```
Hàm helper này tạo ra 1 mã QR code, nó có tham số uri, tham số uri này là 1 là chuỗi dùng để liên kết và đăng ký trên app google authenticator

Trong model User mình sẽ tạo 1 hàm dùng để sinh ra uri khi tạo mã QR
```
def two_factor_qr_code_uri
    issuer = ENV['OTP_2FA_ISSUER_NAME']
    label = [issuer, email].join(':')

    otp_provisioning_uri(label, issuer: issuer)
end
```

`issuer = ENV['OTP_2FA_ISSUER_NAME']` ENV này là tên app của mình
Như thế này khi đăng ký trên app google authenticator format hiển thị của nó sẽ như thế này
```
Demo App(email@example.com)
804 506
```
URI sau khi kết hợp tên app và email của người dùng nó sẽ có mặt mũi như thế này
```
otpauth://totp/Demo%20App:Demo%20App_le.duc.son%40sun-asterisk.com?secret=3JDDP6PYMP4BHVOBRJDYZXZU&issuer=Demo%20App
```
### 5.4 Verify OTP code sau khi scan QR Code
![](https://images.viblo.asia/b9ed9eb5-f99e-4b5a-9981-19c39db3d804.png)
Chúng ta chỉ cần 1 input để nhập mã OTP dùng để verify
```
<div class="card">
    <div class="card-header">
      2. Confirm OTP Code
    </div>
    <div class="card-body">
      <p>Please confirm that your authentication application is working by entering a generated code below.</p>
      <%= form_for(:two_fa, url: verify_otp_two_factor_setting_index_path, method: :post) do |f| %>
        <div class="form-group">
          <%= f.text_field :code %>
        </div>
        <div class="form-group">
          <%= f.submit 'Confirm', class: 'btn btn-primary' %>
        </div>
      <% end %>
    </div>
</div>
```

Trong controller bổ sung thêm 1 hàm dùng để verify otp code nữa
```
def verify_otp
    if current_user.validate_and_consume_otp! enable_2fa_params_code[:code]
      backup_codes = current_user.generate_otp_backup_codes!
      current_user.save!
      session[:codes] = backup_codes
      redirect_to two_factor_setting_path(current_user)
    else
      flash[:danger] = "OTP Code invalid. Please try again"
      redirect_to new_two_factor_setting_path
    end
end

private

def enable_2fa_params_code
    params.require(:two_fa).permit(:code)
end
```
Hàm này có nhiệm vụ kiểm tra xem mã OTP dùng để verify mình nhập vào có đúng hay không
Nếu đúng thì chúng ta tạo sẵn mã backup code lưu vào db và lưu vào session dùng để hiển thị ở màn hình backup codes

Tại sao lại phải lưu mã backup code vào session mà không lấy từ DB ra để hiển thị.
Nguyên nhân: Devise two factor khi thực hiện lưu backup codes vào db thì đồng thời nó cũng tiến hành mã hóa luôn, cơ chế mã hóa cũng giống như mã hóa mật khẩu vậy. Tức là chỉ thực hiện mã hóa thôi, mình không thể giải mã ra được. mục đichs để bảo mật hơn tránh bị lộ mã backup code. 

Chính vị vậy để tiện dụng cho mình hiển thị mã backup codes và tiện check 1 số case để điều hướng màn hình thì nên lưu vào session cho tiện. Khi user thực hiện bật xác thực 2 bước thành công thì mình sẽ xóa session này đi.

Và mã backup code này chỉ hiển thị lần đầu khi quét mã QR thôi, sau khi user bật xác thực 2 bước xong xuôi thì sẽ không hiển thị nữa



## Kết
Nội dung này rất dài, nên phần 1 này chỉ tới bước này thôi.

Ở phần 2, Mình sẽ thực hiện
- Màn hình hiển thị mã backup code và bật xác thực 2 bước . Thao tác với mã backup code như download, copy
- Chức năng sinh ra mã backup mới, trong trường hợp bạn bị mất mã backup cũ

Mình sẽ tổng hợp lại code demo và đưa lên git ở phần sau.