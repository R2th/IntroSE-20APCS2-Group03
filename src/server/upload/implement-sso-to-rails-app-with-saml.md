Hôm nay mình xin giới thiệu với các bạn cách để implement sso trên Rails app với saml của mình nhé. (GO)
Để implement thì đầu tiên chúng ta sẽ nên hiểu qua về sso và cách hoạt động của saml?
###  SSO là gì?
SSO là viết tắt của Single Sign On, viết đến đây thì có lẽ mọi người đã mường tượng ra được SSO là gì rồi nhỉ. SSO là một thuật ngữ ám chỉ việc quản lý truy cập hệ thống khác nhau. Nói đơn giản đấy là việc quản lý sign in, sign out. 

Ví dụ như chúng ta 5 hệ thống A, B, C, D, E, F liên quan mật thiết với nhau, chả nhẽ chúng ta phải gõ từng password ở hệ thống khác nhau, khi chúng ta tích hợp sso rồi thì chúng ta chỉ cần sign in ở một hệ thống bất kỳ thì các hệ thống khác cũng sẽ sign in theo cái tài khoản đó. Cái mà chúng ta dùng hằng ngày là Google cũng đang áp dụng kỹ thuật này vào đó chính là việc chúng ta sign in vào mail thì nó sẽ redirect về [accounts.google.com](http://account.google.com) để chúng ta có thể sign in rồi quay trở lại trang chúng ta bắt đầu sign in, khi đó các google service cũng auto sign in theo account mà chúng ta vừa sign in ở [accounts.google.com](http://accounts.google.com).
SSO có 3 loại là OpenID, Oauth và SAML. Ở bài viết này mình sẽ sử dụng Saml sso để hướng dẫn mọi người. Vậy thì nó hoạt động như thế nào nhỉ?
### Cách hoạt động của Saml SSO
Trong bài viết này mình sẽ sử dụng Okta làm Identifi Provider(IdP) nhé.
Sau khi tạo 1 app là IdP có thông tin và đường dẫn request của rails app mình tạo ra đến IdP là `/sign_in_okata` và nó sẽ redirect đến Idp để authenticate. Sau khi authenticate xong thì sẽ back về rails app để thông báo là sign in thành công hay thất bại.
### Example
Project demo này mình sẽ có yêu cầu như sau:
1. gem Devise
2. Sử dụng Okta để làm IdP

Về cơ bản thì các bạn hãy tạo 1 rails app như bình thường, rồi tạo một model user, add gem devise và sau đó sẽ đến các bước mà mình hướng dẫn ở dưới nhé.
OK, đầu tiên thì chúng ta sẽ cài đặt gem devise có hỗ trợ saml đó chính là gem devise_saml_authenticatable. Thực ra gem này nó viết thêm 1 stragery là saml_authenticatable phục vụ cho saml.
```ruby
gem "devise_saml_authenticatable"
```
Sau khi bundle thì chúng ta add stragery vào model User
```ruby
class User < ActiveRecord::Base
	...
	devise :saml_authenticatable
	...
end
```
Và giờ sẽ đến phần setting config cho saml sso để nó có thể hoạt động được nhé.
trong file `config/initializers/devise.rb`
```ruby
Devise.setup do |config|
	# ==> Configuration for :saml_authenticatable
 
  # Create user if the user does not exist. (Default is false)
  config.saml_create_user = true

  # Update the attributes of the user after a successful login. (Default is false)
  config.saml_update_user = true

  # Set the default user key. The user will be looked up by this key. Make
  # sure that the Authentication Response includes the attribute.
  config.saml_default_user_key = :email

  # Optional. This stores the session index defined by the IDP during login.  If provided it will be used as a salt
  # for the user's session to facilitate an IDP initiated logout request.
  config.saml_session_index_key = :session_index

  # You can set this value to use Subject or SAML assertation as info to which email will be compared.
  # If you don't set it then email will be extracted from SAML assertation attributes.
  config.saml_use_subject = true

  # You can support multiple IdPs by setting this value to a class that implements a #settings method which takes
  # an IdP entity id as an argument and returns a hash of idp settings for the corresponding IdP.
  config.idp_settings_adapter = nil

  # You can set a handler object that takes the response for a failed SAML request and the strategy,
  # and implements a #handle method. This method can then redirect the user, return error messages, etc.
  # config.saml_failed_callback = nil
  config.allowed_clock_drift_in_seconds = 6.second
  # Configure with your SAML settings (see ruby-saml's README for more information: https://github.com/onelogin/ruby-saml).
  config.saml_configure do |settings|
    # assertion_consumer_service_url is required starting with ruby-saml 1.4.3: https://github.com/onelogin/ruby-saml#updating-from-142-to-143
    settings.assertion_consumer_service_url     = "https://10.0.36.150:3000/users/saml/auth"
    settings.assertion_consumer_service_binding = "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"
    settings.name_identifier_format             = "urn:oasis:names:tc:SAML:2.0:nameid-format:transient"
    settings.issuer                             = "https://10.0.36.150:3000/users/saml/metadata"
    settings.idp_sso_target_url                 = "https://<domain>/adfs/ls/idpinitiatedsignon.aspx"
    settings.idp_cert                           = <<-CERT.chomp
-----BEGIN CERTIFICATE-----
MIIC5jCCAc6gAwIBAgIQJ0j6DbG72qFIIUyNGqEL2TANBgkqhkiG9w0BAQsFADAv
MS0wKwYDVQQDEyRBREZTIFNpZ25pbmcgLSBkb21haW4uZnJhbWdpYS5jb20udm4w
HhcNMTgwMTE3MDQ1MTI1WhcNMTkwMTE3MDQ1MTI1WjAvMS0wKwYDVQQDEyRBREZT
IFNpZ25pbmcgLSBkb21haW4uZnJhbWdpYS5jb20udm4wggEiMA0GCSqGSIb3DQEB
AQUAA4IBDwAwggEKAoIBAQCreWeM0ThGIfow34QGVwaKz2id/HKa7D1IHQTNBqQS
2veeLv72s6Celyjy2M+suKvlyKHEY81bue5XkUk1rAJsPpXSOADNk37LqfU6zeIZ
ywHHyv/US0zlMj7cvY7SBD7HUHroLRBeO4eWoTeSLoTl1RMWSRpC1Iron+dLUNUQ
SGT0zYc0YDqjCE7yzLIPLsTZxBPC019u5IEhzTpW2PvTILmh3Lf07T+IXOCXLSTC
d8Xci52lZaotQR7s2nvu8W+M1b8Ml7lCqlJOO6Z91tOuAEpK5i2A1Ywy6o3A/pc/
4b8xXTO3Ryyw8y7NbzyJwXaTOvjy3A86G5U+Jg3YrDDNAgMBAAEwDQYJKoZIhvcN
AQELBQADggEBAFz5PSybqIn7MaBU+VzfizOBUYPku/FcKgq1yxMxIyghWX2Z5smr
4UZTqbrrDegIvL5/lMX4hD3M9hPGgL0yfOM7SYcL6I7tBg1rMjnayFdMVRB2oZtV
imd8dHj1YQHYyn4OKromtJFj9+0vo29Uh/hwfzAcMXJ6la0U07CnPx3iOR/wElnT
LO9xxvDRtX9SnfqW+LIpt6RA4k2HLhJRUKhCJoNFB2KbyLlWjEq/bHzN2PBej/e4
ym6eOpFQCS2sZCixPF94F6IRg6fK77OZ8hptXP5uaI/wSPtcwUTQn6OQcrXj6cBD
Vo/VNDviNaDs5dTunYgm+Y=
-----END CERTIFICATE-----
      CERT
  	settings.name_identifier_format = "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress"
  end
end

```
* `config.allowed_clock_drift_in_seconds = 6.second` là thông số cấu hình độ sai lệch về thời gian của CPU với sevice provider. Để  đảm bảo  rằng thông tin đăng nhập không bị sử dụng lại tránh mục đích truy cập trái phép, trong gem `devie_saml_authenticatable` có sử dụng hàm `validate_condition` (trong file `response.rb`) về thời gian để check về điều kiện này. 6 seconds là thời gian chênh lệch, có thể tùy vào máy mà chọn thời gian cho hợp lý sao cho đảm bảo đúng thời gian chênh lệch cũng như là nhỏ nhất có thể. Tham khảo thêm tại: [Clock driff in ruby-saml](https://github.com/onelogin/ruby-saml#clock-drift)

 * `settings.assertion_consumer_service_url = "https://<sp_host>/users/saml/auth"` đây là config đường dẫn response sau khi đăng nhập thành công. 
 
 * `settings.issuer  = "https://<sp_host>/users/saml/metadata"` là đường dẫn đến setting để chứng thực service là một service trust

 * `settings.idp_sso_target_url = "https://<idp_sso_target_url>"` là đường dẫn redirect đến IdP để đăng nhập khi người dùng request đến service provider.

 * `settings.idp_cert` là đoạn encript được lấy từ file certificate của IdP. Chạy câu lệnh cat `~/Downloads/name_cert.cert` thì chúng ta sẽ có được đoạn encript này.

 * `settings.name_identifier_format  = "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress"` Là cấu hình name ID format là email address bởi vì IdP sử dụng Name ID để phân biệt là user nào và tương tự tại IdP cũng cấu hình tương tự để đồng bộ.

Sau đó chúng ta cần cấu hình attribute mapping thông tin định danh user từ IdP trả về với bảng user trong database của app. Tạo file config/attribute-map.yml và điền vào thông tin mapping như sau:

```ruby
"urn:mace:dir:attribute-def:emailAddress": "email"
```
Như vậy là đã xong phần config ở local, tiếp theo sẽ là phần config ở Okata
Chúng ta truy cập [developer.okta.com](https://developer.okta.com/) và tạo một account nhé.
Sau đó bạn sẽ phải tạo một app trên Okta. Vào phần Application menu và chọn Create a New App button. Và dĩ nhiên là chúng ta chọn flatform là Web và SAML 2.0. Ở trong phần setting app thì chúng ta sẽ phải điền những thông số như sau:
```
Single sign on: YourAppUrl/users/saml/auth
Audience URI  : YourAppUrl/users/saml/metadata
Default RelayState: YourAppUrl
Application username: Email
```
Nếu chúng ta chỉ chạy ở local thì YourAppUrl chính là [http://localhost:3000](http://localhost:3000)
Sau đó click finish.
Trong trang kế tiếp, click vào View setup và setting sao cho Identity Provider Single Sign-On URL và idp_sso_target_url trong devise.rb. Tiếp theo chúng ta sẽ download certificate mà mình đã nói ở trên bằng cách click vào Download Certificate.
Ở trên chúng ta đã config saml_update_user = true. Nó có nghĩa là chúng ta chỉ sử dung user có sẵn trong database chứ không phải là tạo user với config saml_create_user = true.

-----
### Summary
Như vậy là mình đã giới thiệu cho các bạn biết được sso là gì, cách hoạt động của saml sso và một ví dụ nhỏ, hy vọng là mọi người sau khi đọc xong bài viết này có thể tự tạo cho mình một hệ thống nhỏ sử dụng saml sso. Bài viết của mình còn thiếu sót nhiều cũng như là kiến thức của mình còn ít nên mong mọi người góp ý để bài viết hoàn thiện hơn. Xin cảm ơn đã đọc bài viết này!


Nguồn tham khảo: 

https://blog.cloud66.com/adding-sso-to-your-rails-application-with-saml/
https://developers.onelogin.com/saml

https://github.com/onelogin/ruby-saml

https://github.com/apokalipto/devise_saml_authenticatable