# Tổng quan
Các Web framework ra đời giúp cho các lập trình viên phát triển các ứng dụng web một cách nhanh chóng và tiện lợi. Các framework cung cấp sẵn một số thư viện hoặc một số function cho phép các lập trình viên sử dụng cho một số tác vụ cụ thể mà không cần thực hiện code từ đầu. Các framework cũng thường cung cấp một số hàm có sẵn các cơ chế chống lại các lỗ hổng bảo mật. Ví dụ, Ruby on Rails cung cấp một số hàm truy vấn cơ sở dữ liệu có thể chống lại SQL injection. Hoặc các form của ứng dụng Ruby on Rails sẽ được tạo ra các token ngẫu nhiên để chống lại lỗi CSRF nếu chúng ta gọi csrf_token của form trong khi tạo ra form.

Tuy nhiên, không phải cứ framework cung cấp sẵn các hàm và có khả năng chống lại các lỗ hổng bảo mật thì chúng ta sẽ hoàn toàn an toàn khi phát triển ứng dụng. Điều trên chỉ đúng khi lập trình viên sử dụng đúng theo hướng dẫn của nhà phát triển và sử dụng một cách an toàn. Để hiểu hơn vấn đề này, chúng ta sẽ cùng theo dõi các ví dụ theo các lỗi được trình bày bên dưới.
![](https://images.viblo.asia/4939ac17-1e10-40ad-9345-c8a697f9bc44.png)

# Security guides
## Injection
Lỗ hổng xảy ra khi ứng dụng Rails không thực hiện validate đầu vào người dùng cung cấp.
![](https://images.viblo.asia/ac434595-c04c-49e7-9962-7869f6f9d284.jpg)

### Example

**SQL Injection**

Dưới dây là một ví dụ về việc sử dụng không đúng các hàm truy vẫn cơ sở dữ liệu dẫn đến lỗ hổng bảo mật SQL Injection:

```ruby
comments, emails = params[:id].split("+")
Comment.update_all("state = '#{params[:state]}'", "id IN
(#{comments})") unless comments.blank?
```

Đoạn code trên bị lỗi SQL Injection ở cả 2 tham số:` params[:state]` và `params[:id]`. 
Kẻ tấn công có thể cập nhật comments.user_id thành id của kẻ tấn công do đó có thể sở hữu toàn toàn bộ comments và đọc chúng

`http://localhost:3000/timeline?id=1&type=&state=2', user_id = '1`

**Command injection**

Tiếp theo là một ví dụ về lỗi Command injection trong Rails
```ruby
user_supplied_path = '; cat ./config/database.yml'
path = "#{Rails.root}/public/downloads/#{user_supplied_path}"
`ls #{path}`  #=> ls /webserver/public/downloads; cat ./config/database.yml
```

Khi ứng dụng gọi hàm hệ thống để thực hiện lệnh `ls` thì đồng thời cũng thực hiện lệnh `cat ./config/database.yml `do kẻ tấn công sử dụng ký tự `;` để thực hiện 2 câu lệnh liên tiếp. Lỗ hổng này có thể cho phép kẻ tấn công có thể chèn các đoạn mã độc hại vào `user_supplied_path` từ đó có thể thực hiện các hành vi tùy ý trên server

### Recommendation
- Thực hiện validate đầu vào người dùng cung cấp không bao giờ truyền trực tiếp các đầu vào của người dùng vào ứng dụng web mà chưa qua các hàm thực hiện kiểm tra.

- Không bao giờ sử dụng biến dạng chuỗi (# {...}) trong chuỗi SQL, ngay cả khi bạn hoàn toàn chắc chắn rằng giá trị được chèn là an toàn.

- Thực hiện làm sạch đầu vào người dùng, lọc các ký tự nguy hiểm như: `; | || & &&` để chống lại lỗ hổng command injection.

- Hạn chế sử dụng các hàm hệ thống  `%x[], system(), exec(), ….` khi không cần thiết. Khi sử dụng cần đảm bảo không sử dụng các biến đầu vào người dùng truyền trực tiếp vào các hàm trên.
## Sessions and Cookies

Cookie có thể bị đánh cắp, sử dụng lại và đôi khi được sửa đổi hoặc đọc. Ngày nay, cookie phiên Rails được gắn cờ là HttpOnly theo mặc định, vì vậy cookie phiên không thể bị đánh cắp với lỗ hổng XSS nữa. Nhưng nếu sử dụng các cookie khác, chúng cũng sẽ cần được gắn cờ để đảm bảo an toàn.

Flag `secure` trong cookie cũng cần được thiết lập giúp bảo vệ cookie chỉ được phép truyền qua kênh truyền mã hóa.
![](https://images.viblo.asia/08d76f01-82c1-4f2d-9cb2-9943ed7655b4.jpg)

### Recommendation
- Thực hiện tìm kiếm toàn bộ các đoạn code thực hiện việc tạo cookie và đảm bảo rằng chúng được gắn cờ httponly. `cookies[:user_name], cookies.signed[:user_id], cookies.permanent[:login]` đều được gán giá trị như sau: `cookies[:login] = {value: "user", httponly: true}`.
- Tìm kiếm và thực hiện gán giá trị cho 2 cờ httponly và secure thành true: `cookies[:login] = {value: "user", httponly: true, secure: true}`
- Thêm flag tương tự trong file config/initializers/session_store.rb.

## Authentication
Rails cung cấp gem Devise giúp ứng dụng web quản lý cơ chế xác thực rất tốt. Đây là một gem được phát triển giúp lập trình viên dễ dàng khi thực hiện phát triển các tính năng liên quan đến quản lý cơ chế xác thực người dùng. Tuy nhiên nếu chúng ta sử dụng không đúng có thế dẫn đến các lỗ hổng bảo mật nguy hiểm
![](https://images.viblo.asia/2d54cf36-5096-417b-b1c2-d4a295f8bf93.png)

### Recommendation
- Có thể bạn đã kiểm tra xác thực trong ApplicationController, vì vậy mọi hành động mới đều được xác thực. Nếu bạn đang thực hiện kiểm tra đầy đủ, cần đảm bảo mỗi khi có các chức năng mới được thêm vào thì cần kiểm tra lại về cơ chế xác thực đã được thực hiện trên chức năng mới chưa.
- Cần có cơ chế bắt buộc người dùng đặt mật khẩu đủ mạnh: Độ dài >=8 ký tự, có ký tự hoa, thường và ký tự đặc biệt để chống lại việc tấn công brutefore.
    - Devise: `set config.password_length = 8..128` in `config/initializers/devise.rb`.
- Có cơ chế khóa tài khoản sau một số lần đăng nhập thất bại:
    - Devise: activate the `lockable module`.
- Có cơ chế yêu cầu người dùng xac thực email khi đăng ký tài khoản:
    - Devise: use the `confirmable module` and `set config.reconfirmable = true` in `config/initializers/devise.rb`
- Thiết lập cơ chế xóa phiên làm việc sau khoảng thời gian không có tương tác (30 phút)
    - Devise: use the `timeoutable module`. 
- Thiết lập cơ chế thông báo email cho người dùng khi đổi password:
    - Devise: set `config.send_password_change_notification = tru`e in `config/initializers/devise.rb`
- Thông báo lỗi chung ví dụ" "Invalid email or password" thay vì thông báo cụ thể" Invalid email" hoặc "Invalid password"
    - Devise: `setting config.paranoid = true` in `config/initializers/devise.rb`
- Nếu sử dụng `role-based access control (RBAC)`, không bao gồm role attribute trong strong parameters của controller khi người dùng đăng ký hoặc chỉnh sửa người dùng. Ngăn chặn người dùng có thể tự update role của mình, tránh lỗi Mass Assigment trong rails
    - Devise: Do not pass the role parameter key to `devise_parameter_sanitizer.permit`.
## XSS
Lỗi XSS cho phép kẻ tấn công có thể nhúng các đoạn mã javascript độc hại và thực thi trên trình duyệt của người dùng.
![](https://images.viblo.asia/01a6d3f9-f9f2-45b6-968b-9ffe4031c313.jpg)

### Example
**VD1**: Ví dụ bên dưới cho phép ứng dụng web render nội dung của các bản ghi lên ứng dụng web nhưng bị lỗi XSS:
```ruby
# Wrong! Do not do this!
<%= raw @product.name %>

# Wrong! Do not do this!
<%= @product.name.html_safe %>

# Wrong! Do not do this!
<%= content_tag @product.name %>
```

Khi sử dụng `raw, html_safe, content_tag` hoặc tương tự không an toàn có thể dẫn đến lỗi XSS. Kẻ tấn công có thể tấn công như sau:
```ruby
content_tag("/><script>alert('hack!');</script>") # XSS example
# produces: </><script>alert('hack!');</script>><//><script>alert('hack!');</script>>
```

**VD2**: Một ví dụ khác về XSS thông qua href:
```ruby
<%= link_to "Personal Website", @user.website %>
```
Tấn công:
```ruby
<a href="javascript:alert('Haxored')">Personal Website</a>
```

Để fix lỗ hổng XSS ở trên, chúng ta cần sử dụng 
### Recommendation
- Tìm kiếm trong ứng dụng web tất cả các đoạn code sử dung .html_safe hoặc raw() cố gắng không sử dụng nếu có thể.
- Validate ký tự đầu vào người dùng sử dụng whitelist hoặc blacklist.
- Thực hiện Escape all HTML output của người dùng:
    - Sử dụng `==` thay vì `=` trong file ERB : `<%== params[:query] %>`
- Luôn luôn closed attribute sử dụng `"` để tránh lỗi XSS
- Cẩn thận khi sử dụng `render inline`: .... Giá trị truyền vào được Rails coi như ERB template. 
Ví dụ: `"Thanks #{@user.name}!"`. Nếu kẻ tấn công truyền vào giá trị `<%= rm -rf / %>` thì lệnh trên sẽ được thực hiện trên server, dẫn đến lỗi server side template injection. Ở đây chúng ta phải sử dụng:  `"Thanks <%= @user.name %>"`. 
- Sử dụng `json_escape` thay vì `to_json` khi cần render JSON vào bên trong HTML

## Authorization
Lỗ hổng liên quan đến cơ chế phân quyền người dùng. Nếu việc phân quyền thực hiện không tốt có thể dẫn đến việc người dùng này có thể xem thông tin nhạy cảm của người khác (IDOR) hoặc thực hiện các tác vụ của user với quyền cao hơn (Privilege Escalation) 

![](https://images.viblo.asia/bfb313a6-26b6-48f1-ad5e-d88efb632d96.jpg)

### Example
**IDOR example**
Chức năng xem profile của user có đoạn code lấy ra user:

```ruby
@user = User.find_by(id: params[:user_id])
```
Khi thực hiện chức năng view profile:
```
https://locahost:3000/users/2
```
Kẻ tấn công có thể dễ dàng thay đổi id=2 sang id=3 khác để xem thông tin của user khác
```
https://locahost:3000/users/3
```
Biện pháp ở đây là:
```
@user = current_user
```
**Privilege Escalation example**
User model cho phép sử dụng nested attributes cho user’s permissions: 
```ruby
accepts_nested_attributes_for :permission
```

Permission model có cờ add_users có giá trị True hoặc False cho phép user có thể thêm user hay không.

Trong controller sử dụng `User.update_attributes(params[:user]) `cho cả user và admin. Nhưng trên giao diện thì chỉ admin với có ô checkbox để thiết lập giá trị cho phép add user, còn user thường thì không.

Mặc dù vậy người dùng có thể tự thêm ô input vào form:

```html
<input type="checkbox" name="user[permission_attributes][add_users]" value="1" checked="checked" />
```
và thực hiện submit form. Vì phía server không kiểm tra nên người dùng đó đương nhiên có quyền được phép add user mặc dù không phải là admin.

### Recommendation
- Kiểm tra user hiện tại có quyền với các bản ghi khi truy cập tới không để thực hiện phân quyền đúng người, đúng quyền.
- Hạn chế sử dụng nested_attributes nếu có thể, nếu sử dụng cần thực hiện kiếm tra trên server để đảm bảo thực hiện đúng quyền.
- Sử dụng gem CanCanCan: `load_and_authorize_resource` để quản lý phân quyền.

## Unrestriced file upload
Các lỗ hổng liên quan đến việc upload file không an toàn lên hệ thống. Lỗ hổng xảy ra khi không thực hiện kiểm soat tốt các file được upload lên server gây ra các lỗ hổng như: XSS, DOS
![](https://images.viblo.asia/20ce2748-116e-4677-a508-cfa4647f3178.jpg)

### Recommendation
- Thực hiện kiểm tra: file name, file extension, file size, content-type khi thực hiện các chức năng liên quan đến upload file.
- Thực hiện whitelist các file được phép upload lên server (Ví dụ: jpg, png..). Tránh sử dụng blacklist khi có thể.
- Sử dụng các gem xử lý chức năng upload file: Ví dụ:  imagemagick,  CarrierWave...
- Tránh sử dụng user controlled filenames. Nếu có thể thực hiện việc tạo ra các file name một cách ngẫu nhiên.
- Nếu có thể nên sử dụng dịch vụ lưu trữ của bên thứ 3 hoặc server khác: Ví dụ: S3
- Khi cho phép download file, không nhận file name và path truyền từ phía người dùng mà cần tạo ra trên phía server để tránh gặp lỗi Local file inclusion.

# Tổng kết
Trên đây là một số các lỗi thường gặp khi các lập trình viên thực hiện phát triển ứng dụng Rails dễ gặp phải. Lời khuyên ở đây là khi sử dụng các thư viện hay hàm của framework cần tìm hiểu thật kỹ và sử dụng một cách chính xác và an toàn theo hướng dẫn. Khi cần phát triển cần tham khảo các tài liệu hướng dẫn và làm theo secure coding guideline của framework cung cấp.

Đối với ứng dụng Rails các bạn có thể tham khảo tại:
- [Rails secure coding guideline](https://guides.rubyonrails.org/security.html)
- [OWASP Ruby_on_Rails_Cheat_Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Ruby_on_Rails_Cheat_Sheet.html)
# Reference
- [Preproduction Security Checklist for a Rails App
](https://www.cloudbees.com/blog/preproduction-checklist-for-a-rails-app/?utm_source=programmingdigest&utm_medium=web&utm_campaign=featured)
- [Zen Rails Security Checklist
](https://github.com/brunofacca/zen-rails-security-checklist)
- [Rails Security Checklist
](https://github.com/eliotsykes/rails-security-checklist)