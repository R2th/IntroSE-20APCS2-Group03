## I. Giới thiệu tổng quan
Như các bạn đã biết việc bảo mật 2 lớp là rất cần thiết trong tất cả các dự án hiện nay. Về bảo mật 2 lớp thì bạn đã từng thấy sử dụng OTP của sms, email, hay xài app google authentication để xác thực. Đối với việc sử dụng SMS thì mình phải sử dụng đến service thứ 3, và phải trả 1 khoản phí chưa kể mạng mẽo rất thất thường. Hôm nay mình sẽ giới thiệu các bạn cách sử dụng app Google Authentication để thực hiện xác thực bảo mật 2 lớp trong dự án Rails. Ở dư án Rails các bạn rất thường xuyên dùng devise để thực hiện việc login/logout, mình sẽ kết hợp với devise để các bạn sẽ dễ áp dụng hơn

## II. Setup 
### 2.1 Nguyên tắc hoạt động
Đầu tiên mình sẽ nói qua một chút về nguyên tắc hoạt động nhé. Như các bạn đã biết đối với gem devise, sau khi user đăng nhập thành công sẽ tạo ra session và cho phép user truy cập vào trang web của bạn. Đối với các service sử dụng 2FA như bạn biết ví dụ như Github, bạn sẽ cần phải vào cài đặt user để bật 2FA, ở đây để đơn giản hơn thì mình sẽ xử lí như sau:
1. User nhập name/password
2. Hiển thị mã QR code để thực hiện quét QR
3. Sau khi sử dụng app Google Authenticate để quét QR thì bên app sẽ hiển thị 6 số và mình sẽ input 6 số này để hoàn thành việc login
4. Xác thực thành công thì coi như bạn đã active 2FA, kể từ lần sau đăng nhập lại bạn chỉ cần vào app xem 6 số là gì chứ không cân quét QR code nữa
5. Ok! về cơ bản flow là như vậy. Bây giờ mình sẽ đi vào chi tiết nhé
### 2.2 Các thư viện cần thiết
1. Gem **devise**
2. Gem **devise-two-factor**
3. Gem **rqrcode**
### 2.3 Cài đặt

1. **bundle install** các gem vừa cài đặt
2. Ở thư mục dự án rails, bạn chạy lênh **rake secret** để tạo 1 mã base64 và add mã được sinh ra vào file .env với khóa **TWO_FACTOR_SECRET**
3. Setup gem devise (về phần này các bạn có thể google thêm nhé)
4. Sau khi đã setup gem devise và xác định được model sẽ áp dụng gem devise kia, thường sẽ là model User, trong model User mình add dòng bên dưới:

    `devise :two_factor_authenticatable,
         :otp_secret_encryption_key => ENV['TWO_FACTOR_SECRET']`
         
    **TWO_FACTOR_SECRET** biến env mình vừa tạo ở bước 2

5. Tiếp theo bạn chạy lệnh `rails generate devise_two_factor MODEL TWO_FACTOR_SECRET`. Lệnh đó sẽ thực hiện những bước sau:
      
      - Chỉnh sửa file **app/models/MODEL.rb**
      - Xóa **:database_authenticatable** nếu cái này không được xóa tự động thì bạn phải xóa bằng tay nhé
      - Điều chỉnh tệp cấu hình **devise**
      - Tạo ra file migrate để add những column sau:
          - encrypted_otp_secret（string）
          - encrypted_otp_secret_iv（string）
          - encrypted_otp_secret_salt（string）
          - consumed_timestep（integer）
          -  otp_required_for_login（boolean)
6. Add thêm **otp_attempt** vào params của devise như bên dưới

    ```
    class ApplicationController < ActionController::Base
        before_action :configure_permitted_parameters, if: :devise_controller?
        .....
        private
        def configure_permitted_parameters
            devise_parameter_sanitizer.permit(:sign_up, keys: [:otp_attempt])
        end
    end
    ```
Vậy là chúng ta đã hoàn thành các bước ban đầu để setup được 2FA. Tiếp đến sẽ đi vào chi tiết hơn
## III. Xử lí controller và view
1. Như các bạn đã biết, đối với gem devise, sau khi mình login thành công nó sẽ chuyển hướng đến trang mà mình yêu cầu, hoàn thành 1 phiên đăng nhập. Bây giờ áp dụng 2FA mình sẽ phải check email/password, đúng thì sẽ nhảy đến trang xác thực 2FA. Chúng ta thêm đoạn code bên dưới:
    ```
        class SessionsController < Devise::SessionsController
          prepend_before_action :authenticate_with_two_factor, only: :create

          private
            def authenticate_with_two_factor
              user = User.find_by(email: params[:user][:email])
              return if user.blank?
              return unless user.valid_password?(params[:user][:password])
              session[:user_id] = user.id
              redirect_to new_two_factor_auth_path
            end
        end
    ```
 
2. Tiếp theo chúng ta sẽ tạo ra controller **TwoFactorAuthsController**. Trong controller này mình sẽ xử lí như sau
    ```
    class TwoFactorAuthsController < ApplicationController
      # Sau khi vào hàm new, sẽ thực hiện update otp_secret. 
      # Các bạn sẽ thắc mắc otp_secret ở đâu ra đúng không. 
      # Đó chính là do thằng gem devise-two-factor đã xử lí và đưa các field 
      # mình đã migrate ở bước trên về 1 field otp_secret.  
      def new
        @user = User.find(session[:user_id]).decorate
        return if @user.otp_secret && @admin.otp_required_for_login
        @user.update!(otp_secret: User.generate_otp_secret)
      end
       # Hàm create thì không có gì khó cả. kiểm tra xem cái 6 số mình nhập vào có đúng hay ko. 
       # đúng thì sẽ update field otp_required_for_login về true, 
       # cái này để xác nhận là user đã hoàn thành xác thực 2FA, 
       # lần sau login vào sẽ ko cần quét QR code nữa, sau đó thực hiện login như bình thường
      def create
        @user = User.find(session[:user_id]).decorate
        if @user.validate_and_consume_otp!(params[:otp_attempt])
          unless @user.otp_required_for_login
            @user.update!(otp_required_for_login: true)
          end
          session.delete(:user_id)
          sign_in(@user)
          redirect_to root_path, notice: 'Login successfully'
        else
          @error = 'Login failed'
          render :new
        end
      end
    end
    ```
    
    Đến đây bạn sẽ tự đặt 1 câu hỏi là, tại sao trên app Google Authenticate cứ sau 30s nó lại sinh ra một mã mới, và tại sao 1 cái mã trên app lại có thể mapping được với giá trị trên web của mình. Mình sẽ giải thích ngắn gọn như này nhé, ở dòng **otp_secret: User.generate_otp_secret** nó sẽ thực hiện sinh ra ngẫu nhiên 1 đoạn mã base32, cái mã này nó tương thích với thuật toán của Google là cứ 30s sinh ra một mã mới dựa vào cái mã ban đầu mà mình đã quét QR code. Bạn có thể tham khảo thêm cơ chế này trong tài liệu dưới đây sẽ rõ hơn cách hoạt động (https://www.rubydoc.info/gems/rotp/3.3.0)

3. Tiếp theo ở trong view của controller twofactor chúng ta thêm đoạn code bên dưới
    
      ```
      <% unless @user.otp_required_for_login %>
              <%= image_tag @user.build_qr_code.to_data_url, class: "img_qrcode" %>
            <% end %>
            <%= form_tag two_factor_auths_path do %>
              <div class="form-group">
                <%= label_tag :otp_attempt, "認証コード" %>
                </br>
                <%= text_field_tag(:otp_attempt, nil, class: 'form-control', required: true, pattern: '^\d{6}$', maxlength: 6) %>
                <%= submit_tag '認証', class: 'btn btn-primary', 'data-disable-with' => '送信中...' %>
              </div>
            <% end %>
    ```
    Ở đây sẽ kiểm tra xem user đã bật 2FA hay chưa thông qua **otp_required_for_login** nếu chưa hiển thị Qrcode, rồi thì hiển thị text box để nhập 6 số.

4. Tiếp theo chúng ta cần phải tạo ra QRcode bằng cách sử dụng decorate và gem **rqrcode**

    ```
        class UserDecorator < Draper::Decorator

        delegate_all

          def build_qr_code
            label = "your_name"
            issuer = "LiBz Tech Blog"
            uri = otp_provisioning_uri(label, issuer: issuer)
            qrcode = RQRCode::QRCode.new(uri)
            qrcode.as_png(
              offset: 0,
              color: '000',
              shape_rendering: 'crispEdges',
              module_size: 2
            )
          end
    end
    ```

Sau khi đã hoàn thành các bước trên các bạn vào login xem thử có đúng không nhé. Kết quả sẽ như sau:
 ![](https://images.viblo.asia/175b3683-d2ac-4661-94bf-637649f562a5.png)

Còn ở App sẽ như sau
![](https://images.viblo.asia/29448be4-603f-4373-9eb8-fbbb5042f125.jpg)

Vậy là mình đã giới thiệu tổng quan về cách hoạt động của 2FA kết hợp với Devise. Ở bài viết này mình chỉ đi vào chi tiết cách hoạt động, cài đặt 2FA, còn các vấn đề bên lề như thiết lập devise, routes để web có thể chạy ngon lành các bạn tự tìm hiểu áp dụng nhé.

## Tài liệu tham khảo
1. https://tech.libinc.co.jp/entry/2018/11/08/090000