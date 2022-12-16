# Với bài viết này giúp chúng ta có thể nắm được 

**・Tìm hiểu cách xử lý API misoca bằng Python**

**・Ví dụ về cách sử dụng thư viện oauth2_client**

Misoca với ưu điểm vượt trội là sẽ tự động hoá việc xử lý hóa đơn, vì vây với nhiều hệ thống liên kết cần thiết với nghiệp vụ yêu cầu thanh toán thì việc implement API là một sự lựa chọn tốt. Tuy nhiên, lại không thể tìm hiểu về oauth2 với các tài liệu của misoca.

# Giải thích cách sử dụng API misoca

**Đăng ký với Misoca**

Sau khi đăng nhập vào Misoca, hãy truy cập URL sau để đăng ký ứng dụng.

https://app.misoca.jp/oauth2/application

Đặt URL chuyển hướng như trong ví dụ bên dưới (cần ít nhất một trong số này):

・http://ネット上のURL/callback_misoca

・http://localhost:8080

・http://0.0.0.0:5001/callback_misoca


**Cài đặt oauth2-client**

Gõ lệnh sau để cài đặt oauth2-client.

*pip install oauth2-client*


# Hai ví dụ về việc triển khai API Misoca bằng Python. 

**Phần 1: Mở trình duyệt và phê duyệt và approve**

Đặc trưng : Không cần nhúng ID đăng nhập và mật khẩu vào nguồn.Cần mở trình duyệt khi được phê duyệt. 


Code như dưới đây!

```
#####################################################################
##Sample sử dụng API Misoca sử dụng oauth2_client
#####################################################################

from logging import getLogger, StreamHandler, Formatter
from oauth2_client.credentials_manager import CredentialManager, ServiceInformation

#Setting scope
scopes = ['read', 'write']

service_information = ServiceInformation('https://app.misoca.jp/oauth2/authorize', #authorizeのULR

                                         'https://app.misoca.jp/oauth2/token',#token ULR
                                         
                                         'Set application ID',
                                         
                                         'Set secret id',
                                         
                                         scopes)
                                         
manager = CredentialManager(service_information)

#Setting redirect URL

redirect_uri = 'http://0.0.0.0:5001/callback_misoca'

url = manager.init_authorize_code_process(redirect_uri, 'state_test')

#Đến đây mở trình duyệt, nhập URL hiển thị trong console gán vào trình duyệt

print('Open this url in your browser\n%s'% url)

code = manager.wait_and_terminate_authorize_code_process()



print('Code got = %s' %  code)

manager.init_with_authorize_code(redirect_uri, code)

#Get token 

print('Access got = [%s]' %  manager._access_token)

response = manager.get("https://app.misoca.jp/api/v3/contacts")

print(response.text)
```

**Source code được public trên Git Hub**

https://github.com/jshirius/python_tools/blob/master/oAuth2Client_misoca.py

**Phần 2: Không mở trình duyệt**

Không cần mở trình duyệt khi yêu cầu phê duyệt

Bạn cần viết ID đăng nhập và mật khẩu của mình trên source code

Code như dưới đây!

```
#####################################################################
##Sample sử dụng loginid và password 
#####################################################################


from logging import getLogger, StreamHandler, Formatter
from oauth2_client.credentials_manager import CredentialManager, ServiceInformation
import urllib.request


scopes = ['read', 'write']

service_information = ServiceInformation('https://app.misoca.jp/oauth2/authorize',#authorizeのULR
                                         'https://app.misoca.jp/oauth2/token',#tokenのULR
                                         'Set application ID',
                                         'Set secret id ',
                                         scopes)
manager = CredentialManager(service_information)

manager.init_with_user_credentials('setlogin id', 'set pass')
print('Access got = %s' %  manager._access_token)
# Here access and refresh token may be used

response = manager.get("https://app.misoca.jp/api/v3/contacts")
print(response.text)
```

Source code được public trên Git Hub

https://github.com/jshirius/python_tools/blob/master/user_login_misoca.py

**■ Tài liệu tham khảo**

Misoca API v3

https://doc.misoca.jp/v3/



Trên đây là cách triển khai API Misoca bằng Python!