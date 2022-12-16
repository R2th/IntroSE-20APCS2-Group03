# 1. Lý do dùng kiểm thử tự động kiểm tra Validate cho form Đăng nhập
 Automation testing như một xu thế cần đổi mới và thách thức dành cho QA trong thời đại công nghệ cập nhật từng giờ. Tuy nhiên, đại đa số QA thường kiểm thử manual và có tâm lý ngại code. Một phần do nền tảng code yếu nhưng quan trọng hơn là không cần mất thời gian nghĩ code, debug. Cho nên người ta sẵn sàng mất hàng giờ ngồi nhập thủ công để check những form đơn giản như đăng nhập. 
  
  Những lý do nên sử dụng kiểm thử tự động để check giá trị các trường của form đăng nhập:

*   Thông thường các form đăng nhập chỉ bao gồm 2 trường là username or email and password. Do đó có thể tái sử dụng code rất đơn giản
*   Sử dụng kiểm thử tự động trong form Đăng nhập tiết kiệm thời gian, tiết kiệm nhân lực, kéo theo rất nhiều lợi ích khác nhất là chi phí dành cho tổ chức sử dụng nhân lực

# 2. Các bước cần chuẩn bị
## 2.1. Yêu cầu bài toán
Tôi sẽ sử dụng form Đăng nhập của viblo làm ví dụ để kiểm thử tự động giá trị các trường. Trong trường hợp yêu cầu bài toán đơn giản như sau:

*  Gồm 2 trường: Username or Email, Password
*  Username viết liền không dấu, không chứa ký tự đặc biệt. Email đúng theo định dạng ví dụ: aaa@y.z
*  Password có độ dài 8 ký tự, hiển thị  ***...***
*  Trường hợp hợp lệ sẽ chuyển tới màn hình chính của Viblo
*  Trường hợp không nhập Username or Email sẽ hiển thị cảnh báo sau: Username or Email is required
*  Trường hợp không nhập Password sẽ hiển thị cảnh báo sau: Password is required
*  Trường hợp Username or Email and Password không hợp lệ sẽ hiển thị cảnh báo sau: The user credentials were incorrect.
## 2.2. Các case cần kiểm tra giá trị
Bây giờ, tôi sẽ chỉ ra checklist dành cho việc kiểm thử giá trị các trường. Có thể checklist sẽ chưa cover hết các case mà bạn nghĩ tới. Tuy nhiên, tôi sẽ list ra các case thông thường và đi theo tài liệu yêu cầu. Hãy cố gắng list ra càng nhiều càng tốt đảm bảo đủ hết các case mà bạn nghĩ tới. Điều này là quá tốt không chỉ riêng QA mà Dev cũng rất cần thiết.
| STT | Checklist | Kết quả mong muốn |
| -------- | -------- | -------- |
| 1    | Username or Email hợp lệ     | Login thành công. Tự động chuyển tới màn hình trang chủ|
| 2     | Bỏ trống trường Username or email, Password đúng     | Đăng nhập không thành công. Hiển thị message: Username or Email is required      |
| 3    | Username or Email đúng, Bỏ trống trường Password     | Đăng nhập không thành công. Hiển thị message:  Password is required   |
| 4    | Username or Email sai khi sử dụng ký tự thông thường, Password đúng     | Đăng nhập không thành công. Hiển thị message:  The user credentials were incorrect.   |
| 5    | Username or Email đúng, Password sai      |Đăng nhập không thành công. Hiển thị message:  The user credentials were incorrect.       |
| 6    | Username or Email sai khi sử dụng ký tự thông thường, Password sai      |Đăng nhập không thành công. Hiển thị message:  The user credentials were incorrect.       |
| 7     | Username or Email quá ngắn, Password đúng      | Đăng nhập không thành công. Hiển thị message:  The user credentials were incorrect.   |
|8   | Username or Email sử dụng html, Password đúng      | Đăng nhập không thành công. Hiển thị message:  The user credentials were incorrect.     |
|9    | Username or Email sử dụng quá độ dài quy định, Password đúng     | Đăng nhập không thành công. Hiển thị message:  The user credentials were incorrect.     |

## 2.3. Chuẩn bị 
Để viết được các đoạn mã ngoại trừ bạn có 1 chiếc máy tính không cần cấu hình quá cao. Chỉ cần chạy được là ổn :). Ngoài ra hãy cài công cụ sau:

* Python 2.x or 3.x. Link download: https://www.python.org/
* Selenium Library Python. Link download: http://selenium-python.readthedocs.io/
* Extension trên trình duyệt Chrome với tên như sau: xpathhelper 
* Applycation edit hoặc ide sau: Pycharm or Sublimetext
* Chorme Driver. Link download: http://chromedriver.chromium.org/downloads
## 2.4. Code từng trường hợp không hề khó
Sau đây, tôi sẽ giải thích cho trường hợp 3. Username or Email đúng, Bỏ trống trường Password

**Bước 1.   Import thư viện cần thiết**
```py
import time 
import csv 
from selenium import webdriver 
 ```
 - `import time`: Sử dụng thư viện thời gian trong trường hợp cần đợi kết quả từ câu lệnh được thực thi
 - `import csv`:  Sử dụng thư viện dùng để export kết quả sau khi chạy câu lệnh 
 - `from selenium import webdriver`: Sử dụng selenium để điều khiển trình duyệt web
**Bước 2:   Sử dụng selenium webdriver để mở trình duyệt Chrome và tải trang vblo.asia**
 ```py     
 if __name__ == '__main__':
    browser = webdriver.Chrome(executable_path="./chromedriver")
    browser.get("https://viblo.asia/")
    time.sleep(5)
 ```
- `time.sleep(5)`: Là thời gian để tải trang. Tùy thuộc vào tốc độ mạng để thiết lập thời gian.


**Bước 3.  Định nghĩa hàm và biến username or Email**

 ```py
def validate_with_username_and_not_password(browser):  

    try:  
        
        username = browser.find_elements_by_name("username") 
        if not username: 
            print("Case 1 fail")
            return False
 ```
- `def validate_with_username_and_not_password(browser):` Cấu trúc khai báo hàm trong python
- `try ... catch`: Sử dụng để bắt lỗi
- `username = browser.find_elements_by_name("username")`: Đặt tên biến là username. Sử dụng inspect trên Web để lấy được *name* của field "username or email"
- `if not username: 
            print("Case 1 fail")
            return False` Trong 2 trường hợp: 1 là form login không có username sẽ trả ra lỗi và phải viết lại các case tự động. 2 là thời gian đợi tải form quá lâu, khi đó sẽ cần phải thực thi lại hành động kiểm thử này

**Bước 4. Tìm và truyền giá trị cho biến username or email**
```py
        username = username[0] 
        username.clear()
        username.send_keys("ntvan")
 ```

 - `username = username[0] `: Truyền giá trị đầu tiên tìm thấy vào biến
 - `username.clear()`: Xóa dữ liệu đảm bảo biến không còn giá trị
 - ` username.send_keys("ntvan")`: Truyền giá trị username hợp lệ vào biến

**Bước 5: Thực hiện truyền giá trị password như bước 2**
```py
        password = browser.find_elements_by_name("password")
        if not password:
            print("Case 1 fail")
        password = password[0]
        password.clear()
  ```
  
**Bước 6: Thực hiện thao tác**

   ```py
        time.sleep(1)  
 
        login_button_elm = browser.find_elements_by_xpath("//div[@class='login-form']/button")
        login_button_elm[0].click()
        if 'Password is required' in browser.page_source:
            print("Case 1 pass")
            return True
        else:
            print("Case 1 fail")
            return False
 
    except Exception as e:
        print(e)
   ```
  - `  login_button_elm = browser.find_elements_by_xpath("//div[@class='login-form']/button")`:  Sử  dụng extension xpath đã cài để lấy xpath của button *Login* . 
  - ` login_button_elm[0].click()`:  Sử dụng selenium để tự động click vào button trên Form
  -  Sau khi đã click thì mong muốn là hiển thị message lỗi như sau: Password is required. Nếu không thì case này bị coi là Fail

Như vậy, tôi đã giải thích và hướng dẫn code xong một trường hợp trong danh sách checklist bên trên. Các trường hợp khác tương tự, chỉ cần định nghĩa hàm và có thể tái sử dụng biến

# 3. Demo
Click vào link: [Demo](https://youtu.be/Os8oovwDrEA)
# 4. Phần tiếp theo 
Tôi sẽ export hướng dẫn đễ export file csv... Continue