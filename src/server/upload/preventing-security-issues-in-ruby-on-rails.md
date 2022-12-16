![](https://images.viblo.asia/02a83666-37d6-40f7-8851-b3204a7584cf.jpg)
Mặc rù Ruby on Rails (Rails) luôn không ngừng được hoàn thiện để nâng cao mức độ bảo mật, nhưng không thể khẳng định rằng framework này là bảo mật hoàn toàn. Bài viết này sẽ cung cấp cho bạn một số mẹo để ngăn chặn các lỗ hổng bảo mật tiềm ẩn.
### 1. Command Injection
Command Injection là việc thực thi 1 lệnh trong Ruby hoặc hệ điều hành thường xuất phát từ bên ngoài (có thể từ giao diện người dùng).

Ví dụ:
```
eval("ruby code")       # running Ruby code
`ls -al`                # running OS command
Kernel.exec("rm -rf")   # running OS command
```
**Ngăn chặn**: Không thực thi bất kì lệnh nào từ người dùng nếu chưa xác thực chúng.
### 2. SQL Injection
![](https://images.viblo.asia/c327fd46-e218-43e7-bbcc-68279b73b674.png)
Khi truy vấn dữ liệu từ database trong nhiều trường hợp cần dùng đến dữ liệu từ người dùng (tiêu biểu như khi tìm kiếm), đây là một điểm yếu cho các truy vấn dạng này.

Trong truy vấn
```
User.where("name LIKE '" + params[:search] + "'")
```
params[:search] đến trực tiếp từ người dùng, được thực thi ngay trong truy vấn SQL mà không qua quá trình xác thực nào, người dùng có thể làm bất cứ điều gì với database của bạn một cách dễ dàng.

**Ngăn chặn**: Xác thực đầu vào từ người dùng hoặc giới hạn phạm vi truy vấn.
### 3. Cross-site Scripting (XSS)
![](https://images.viblo.asia/9eeabae8-2618-45f2-9fb3-14b2faece620.png)
Bạn có đoạn mã sau 
```
<% = link_to "My Website", @user.website %>
```
nếu `@user.website` chứa một đoạn mã JavaScript thì ai đó có thể đánh cắp dữ liệu từ hệ thống của bạn thông qua trình duyệt.

Từ version 3.0 Rails đã có giải pháp ngăn chặn tấn công XSS, mặc định thì mọi chuỗi sẽ được hiển thị nguyên bản trên giao diện khi chúng xuất pháp từ các đoạn mã nhúng Ruby trong view. Để thực thi các đoạn mã này chúng ta có thể dùng `raw` hoặc `html_safe` hoặc `h`.

**Ngăn chặn**: Xem xét cẩn thận khi chấp nhận dữ liệu từ người dùng để thực thi mã HTML, có thể dùng `sanitize` để loại bỏ tag HTML mà bạn không mong muốn.
### 4. Sessions
Mặc định trong Rails session là persistent cookie lưu trong trình duyệt và không đặt ngày hết hạn cho chúng. Nên lưu ý khi lưu thông tin nhạy cảm trong session với cấu hình mặc định của Rails.

**Ngặn chặn**: Có thể xem xét giải pháp dùng database để hỗ trợ khi lưu trữ thông tin trong session.
### 5. Authentication
![](https://images.viblo.asia/344fa8f8-ef2f-4dd9-ad32-bd1d44f8da4f.jpg)
Rails không cung cấp kỹ thuật mặc định nào cho authentication.

**Ngăn chặn**: Sử dụng gem hỗ trợ, một gem được dùng khá phổ biến đó là **Devise**.
### 6. Insecure Direct Object Reference or Forceful Browsing
RESTful luôn sẵn sàng trong Rails, đây là một giải pháp bảo mật tốt, nhưng đường dẫn đến tài nguyên rất dễ đoán và có thể truy cập đến những tài nguyên hạn chế quyền truy cập.

**Ngăn chặn**: Bạn có thể thử dùng gem **cancancan** hoặc **pundit** để hạn chế quyền truy cập vào một số tài nguyên.
### 7. Cross Site Request Forgery (CSRF)
![](https://images.viblo.asia/d35dc55c-dd7e-45be-95b6-6c4c83f7f744.jpg)
Phương thức tấn công này hoạt động theo hình thức thêm các liên kết độc hại vào website của người dùng, khiến người dùng xác thực chúng mà không hay biết, Rails có kỹ thuật  **CSRF tokens** để ngăn chặn hình thức tấn công này.
```
class ApplicationController < ActionController::Base
  protect_from_forgery
  ...
end
```
Điều đặc biệt là các GET HTTP requests thì vô hiệu hóa với cơ chế trên.

**Ngăn chặn**: Chỉ đích danh action dùng GET HTTP requests buộc chúng sử dụng CSRF tokens như sau: 
```
protect_from_forgery except :show
```
### 8. Mass Assignment
Từ Rails 4.0 vấn đề Mass Assignment đã phần nào được giải quyết. bạn không thể lấy đầu vào trực tiếp từ trình duyệt để tạo một object trong database.

Khi dùng 
```
User.create(params[:user])
```
sẽ dẫn đến lỗi *ActiveModel::ForbiddenAttributesError* 

**Ngăn chặn**: Luôn dùng **strong parameters** để chỉ định các tham số được chấp nhận.
Ví dụ:
```
params[:user].require(:user).permit(:name, :email)
```
Đừng bao giờ dùng 
```
params[:user].require(:user).permit!
```
điều này cho phép tất cả tham số.
### 9. Redirects and Forwards
Bạn không nên dùng dữ liệu từ người dùng để làm mục tiêu chuyển hướng website, chẳng hạn như sau:
```
if path = URI.parse(params[:url]).path
  redirect_to path
end
```
Bởi điều này tạo điều kiện cho tấn công XSS.

**Ngăn chặn**: Liệt kê danh sách các URL hoặc domain có thể truy cập, sau đó đối chiếu với dữ liệu từ người dùng.
### 10. Dynamic Render Paths
Bạn không nên sử dụng đầu vào của người dùng để xây dựng đường dẫn cho template khi hiển thị vì rất dễ dàng truy cập bất kỳ tệp nào trong ứng dụng của bạn để thực hiện một cuộc tấn công.

**Ngăn chặn**: Tránh để người dùng nhập vào các đường dẫn hoặc sử dụng cơ chế lọc để giới hạn phạm vi truy cập.
### 11. Cross Origin Resource Sharing
Đôi khi bạn cần chia sẻ tài nguyên trên các domain khác nhau. Bạn nên chỉ định danh sách các domain được phép thực hiện request đó, có một số HTTP header kiểm soát việc này.

Ví dụ: Khi bạn cần tải lên 1 tệp bằng AJAX và chuyển nó đến ứng dụng khác. 

**Ngăn chặn**: Dùng gem **rack-cors**, sau đó trong *config/application.rb* chỉ định cấu hình như sau:
```
module Sample
  class Application < Rails::Application
    config.middleware.use Rack::Cors do
      allow do
        origins 'someserver.example.com'
        resource %r{/users/\d+.json},
          headers: ['Origin', 'Accept', 'Content-Type'],
          methods: [:post, :get]
      end
    end
  end
end
```
### 12. Sensitive Files
Nhiều project hiện nay được lưu trữ trên GitHub hoặc bất kỳ máy chủ công khai nào khác. Có một số tệp chứa thông tin nhạy cảm trong mỗi ứng dụng Ruby on Rails.

**Ngăn chặn**: Ignore các tệp này trong repository của bạn.
### 13. Encryption
![](https://images.viblo.asia/ddf633cf-77bd-48c1-84ae-5ea724e11f67.png)
Rails sử dụng Operating System encryption để mã hóa do vậy bạn không nên thay thế chúng bằng các giải pháp của riêng mình.

**Ngăn chặn**: Chỉ sử dụng build-in libraries cho việc mã hóa.

Rails cung cấp các hướng dẫn bảo mật tại [đây](https://guides.rubyonrails.org/security.html) bạn có thể đọc thêm.

**Tham khảo:** 

*[Securing Rails Applications](https://guides.rubyonrails.org/security.html)*

*[Preventing security issues in Ruby on Rails (based on OWASP cheatsheet)](https://medium.com/kkempin/preventing-security-issues-in-ruby-on-rails-based-on-owasp-cheatsheet-2fbca18b6a85)*

*Thank you for reading!*