Đối với  mỗi bài post bán hàng trên facebook, đôi khi mình nhận được hàng chục đến hàng trăm comment trên facebook để hỏi giá của các sản phẩm. Có rất nhiều comment mà mình sẽ reply với nội dung giống hệt nhau, vì vậy, mình nghĩ đến việc tạo ra một tool để giúp mình giải quyết vấn đề này chỉ trong một cú click chuột.  Trong bài viết lần này mình sẽ sử dụng Ruby on Rails tích hợp với facebook-graph-api để viết một web application đơn giản giúp quản lý trang fanpage bán mỹ phẩm của mình. 
Cụ thể, với application này mình sẽ thực hiện các hành động, lần lượt:
1. Tạo một bài post bán mỹ phẩm trên facebook thông qua rails app. (bài post này là **duy nhất**, sẽ được lưu id)  
2. Với mỗi comment trên bài **post vừa tạo**, mình sẽ reply bằng một comment với nội dung là thông tin về các mặt hàng mà mình đang bán.

### 1. Cơ bản về facebook graph api.
Facebook graph api là một API để bạn có thể thao tác với cơ sở dữ liệu của facebook thông qua application của bạn. Mình sẽ lấy ví dụ về `Tinder`. Khi bạn đăng nhập vào `tinder` thông qua facebook, sẽ có một modal hiện lên như thế này:

![](https://images.viblo.asia/edf32cee-9a6b-4e0f-a0f5-c73a78112a80.png)

Ở đây, `Tinder` đã sử dụng facebook-graph-api để hỏi xin quyền lấy dữ liệu về: `tên và ảnh đại diện, danh sách bạn bè, sinh nhật, ảnh, lượt thích trang và địa chỉ email ` của bạn trên facebook. `Tinder` sẽ dùng những dữ liệu lấy được này để làm những việc sau đây:
* Sử dụng `ảnh đại diện, tên và email` của bạn để lưu vào lưu vào cơ sở dữ liệu của `Tinder`, đồng thời tạo cho bạn một tài khoản.
* Sử dụng `danh sách bạn bè` trên facebook của bạn để làm chức năng gợi ý kết bạn. Giúp bạn tìm thấy những người bạn trên `facebook` của bạn mà cũng đang dùng `Tinder`.
* Sử dụng `sinh nhật` của bạn để làm chức năng gửi thông báo chúc mừng sinh nhật, hoặc để tính toán các đối tượng phù hợp với độ tuổi của bạn, giúp bạn có thể tìm được đối tượng hẹn hò.
Việc sử dụng dữ liệu của một trang mạng xã hội lớn như `facebook `có thể giúp các web application khác tạo ra được nhiều chức năng. Ngoài lợi ích của việc lấy về cơ sở dữ liệu từ facebook, chúng ta cũng có thể **TẠO, SỬA, XÓA** cơ sở dữ liệu trên facebook ở một **giới hạn quyền** nhất định thông qua `facebook-graph-api` tích hợp trong web application của chúng ta. Ví dụ như ở trong bài viết này, mình sẽ dùng facebook-graph-api để tạo nhiều comment reply các comment khác trong một bài post được chỉ định.

Vậy làm sao để một `web application` có thể thực hiện `GET, CREATE, EDIT, UPDATE, DELETE` với một phần cơ sở dữ liệu của facebook thông qua `facebook-graph-api` ?  Vì facebook-graph-api là một api dựa trên nền tảng `HTTP`, nên câu trả lời là `application` của bạn phải biết cách để gọi các `api request` với các cú pháp tổng quát như sau:

```
POST/GET/DELETE + https://graph.facebook.com/{node-id}/{edge-id}..........
```
Đó là những điều cơ bản về `facebook-graph-api` mà bạn cần hiểu để có thể tiếp tục với bài viết này.

Để đọc kỹ hơn về facebook-graph-api, các bạn có thể tham khảo một trong hai tài liệu này:
* Tài liệu chính thống của facebook: [Facebook Graph API](https://developers.facebook.com/docs/graph-api/)
* Hai bài viết khá đầy đủ từ một người bạn của mình trên viblo: [HHT-P1](https://viblo.asia/p/rails-question-sep-part1-tim-hieu-ve-graph-api-cua-facebook-gem-koala-graph-explorer-tools-cua-facebook-gDVK29Xj5Lj), [HHT-P2](https://viblo.asia/p/rails-question-sep-part2-lam-sao-de-tich-hop-graph-api-vao-trong-rails-app-gem-koala-07LKXMPDZV4)

### 2. Login app via facebook, get access_token
Đầu tiên, để có thể tiếp tục với bài viết này, các bạn cần có trong máy `local` , một thư mục chứa `sourcecode` của một `rails_app` bất kỳ đã có chức năng đăng nhập ( đăng nhập bằng `devise` thì càng tốt ). Mình sẽ mô tả các bước tiếp theo để giải quyết bài toán chính trong bài viết lần này:
* **Bước 1**: Thực hiện chức năng đăng nhập `rails_app` thông qua `facebook` . Lấy về `access_token` của user hiện tại, để có thể thực hiện các `api_request`. 
* **Bước 2**: Viết các method để thực hiện `GET api request`  và  `POST api request`.
* **Bước 3**: Dùng fanpage cá nhân và tạo một bài post bán mỹ phẩm. Sử dụng `GET api request` để lấy `id` của bài post vừa tạo. 
* **Bước 4**: Thực hiện`GET api request` để lấy mảng ids của các comments hiện tại trong bài post vừa tạo. 
* **Bước 5**: Thực hiện nhiều `POST api request`, để tạo nhiều comment reply lại các comments trong mảng ở **Bước 4.**

Ở **bước số 1** , mình sẽ giải thích cơ bản về việc thực hiện code của mình thôi. Để hiểu kỹ hơn về phần code, các bạn hãy tham chiếu đến tài liệu trong [link này](https://viblo.asia/p/rails-question-sep-part2-lam-sao-de-tich-hop-graph-api-vao-trong-rails-app-gem-koala-07LKXMPDZV4) ở 2 phần:  
*  `1. Tạo và cài đặt app trên trang Facebook for developer` và 
*  `2. Đăng nhập bằng facebook(thủ công)` .

Đầu tiên, mình sẽ đăng ký `rails_app` trên trang `facebook for developers`, lấy về `app_secret` và `app_id`, lưu trong các biến môi trường tương ứng `ENV['app_id']` và `ENV['app_secret']`.
Thiết lập trên trang `facebook for developers` ở phần chức năng đăng nhập với `redirect_uri` chuẩn là:  
```
#{YOURDOMAIN}/facebook/login
```
Hãy thay `#{YOURDOMAIN}` bằng tên miền chuẩn của `rails_app` mà bạn có.
Sau đó, trong `routes.rb` mình sẽ tạo một `resource`  :
```ruby
resource :facebook
```
Ở file `views/facebook/new.html.erb` , mình tạo một button đăng nhập facebook như sau:
```
<%= link_to "Sign in with facebook", %q(https://www.facebook.com/v3.2/dialog/oauth?client_id=#{your_app_id]}&scope=#{your_app_permissions}&redirect_uri=#{redirect_uri}"), class:  "btn btn-primary"%>
```
Hãy nhớ là ở tham số`&scope=` , bạn phải liệt kê đủ các `permissions` liên quan đến quyền **đăng bài post** và **quyền comment** trên fanpage cá nhân của bạn. Các bạn có thể xem về các `permissions` liên quan đến fanpage cá nhân ở [đây](https://developers.facebook.com/docs/graph-api/reference/page/). 
Sau đó, mình tạo một `facebooks_controller` và một action `login` để xử lý chức năng đăng nhập `rails-app` qua facebook như sau:
```ruby
class FacebooksController < ApplicationController

  def login
  #1: Lấy về access_token
    response_body = get_api_request "oauth/access_token?
      client_id=#{ENV["app_id"]}&client_secret=#{ENV["app_secret"]}&code=#{params[:code]}&redirect_uri=#{YOURDOMAIN}/facebook/login"
    access_token = response_body["access_token"]
   
   #2: Thực hiện get api request để lấy dữ liệu người dùng từ facebook, lưu dữ liệu đó vào database của rails app
    details = get_api_request "me?fields=email,name&access_token=#{access_token}"
    user = User.find_by email: details["email"]
    if !user
      user = User.create email: details["email"], name: details["name"], 
        password: Devise.friendly_token, access_token: access_token
    else
      user.update_attributes access_token: access_token
    end
    
    #3: Thực hiện đăng nhập user và quay trở lại với views facebook/new.html.erb
    sign_in user
    redirect_to new_facebook_path
  end

  private
  
    def get_api_request endpoint
      uri = URI "https://graph.facebook.com/v3.2/#{endpoint}"
      response_body = JSON.parse Net::HTTP.get_response(uri).body
    end
end
```

### 3. GET api request  và  POST api request với thư viện Net::HTTP
Các bạn có thể thấy ở phần 2 mình đã viết được method `get_api_request`  bằng thư viện `Net::HTTP` tích hợp sẵn trong `Ruby` . Vì vậy ở bước này, mình chỉ cần viết thêm một method `post_api_request` tương tự:
```ruby
class FacebooksController < ApplicationController
 #.........
 private
 
    def get_api_request endpoint
      uri = URI "https://graph.facebook.com/v3.2/#{endpoint}"
      response_body = JSON.parse Net::HTTP.get_response(uri).body
    end
    
   def post_api_request endpoint, content
      uri = URI "https://graph.facebook.com/v3.2/#{endpoint}?message=#{content}"
      response_body = JSON.parse 0Net::HTTP.post_form(uri).body
    end
end
```

### 4. Publish bài post "bán mỹ phẩm" và lấy id của bài post vừa tạo.

Mình sẽ tạo một bài post bán mỹ phẩm như thê này trên fanpage của mình:

![](https://images.viblo.asia/347176c8-009e-4105-80a1-8e8eb3d87baa.png)

Mình sẽ cần có được `id` của bài post này trên facebook để cho những xử lý phía sau. Trong `action` `facebook#show` mình xử lý như sau:
```ruby
class FacebooksController < ApplicationController
  def show
    pages_response = get_api_request("me/accounts?access_token=#{current_user.access_token}")
    page_access_token = pages_response[0]["access_token"]
    @posts = get_api_request("me/feed?access_token=#{page_access_token}")
  end
end
```
Trong `views/facebook/show.html.erb` :
```
<h2> All post of your page newfeed: </h2>
<% @posts.each do |post| %>
  <div class="row">
    <h4>Post id: </h4><span><%= post["id"] %></span>
  </div>
   <div class="row">
    <h4>Content: </h4><span><%= post["message"] %></span>
  </div>
<% end %>
```
Ta sẽ thấy được `id` của bài viết tương ứng với content ta vừa tạo như sau.

![](https://images.viblo.asia/de6f1e3b-5d8a-4a02-9b59-ff0669ff7333.gif)

Hãy lưu id này tạm thời vào `Settings.post_id` . Lát nữa chúng ta sẽ cần sử dụng nó. (Giả sử bài toán hiện tại chỉ yêu cầu chúng ta reply comment trên 1 post **đã cho trước** thì việc lưu id như thế này có thể chấp nhận được)

Trong file `settings.yml` .
```
post_id: 2779270585446576_3011533795553586
```

### 5. Reply toàn bộ các comments

Giả sử hiện tại trên bài post của mình, đã có 3 comment của khách hàng, hỏi về thông tin sản phẩm:

![](https://images.viblo.asia/a0926edc-5d96-439b-9803-86f3f37a42b0.png)

Việc của mình bây giờ là reply toàn bộ các comment trên bằng một comment với đầy đủ chi tiết về `giá thành, các loại mỹ phẩm và giá ship.`

Bây giờ trong `views/facebook/new.html.erb` mình sẽ tạo một `form tag` để `reply` toàn bộ các comment trong bài `post` vừa tạo:

```ruby
<% unless user_signed_in? %>
<%= link_to "Sign in with facebook", %q(https://www.facebook.com/v3.2/dialog/oauth?client_id=#{your_app_id]}&scope=#{your_app_permissions}&redirect_uri=#{redirect_uri}"), class:  "btn btn-primary"%>
<% else %>
<div class="form-facebook">
<%= form_tag facebook_path, method: :post, multipart: true do %>
  <div class="form-group">
    <%= label_tag "comment", "Multi comment", class: "form-label" %>
    <%= text_field_tag "comment", nil , class: "form-control" %>
  </div>
  <button type="submit" class="btn btn-danger btn-block">Add multi comments</button>
<% end %>
</div>
```

Và phần hiển thị của nó:

![](https://images.viblo.asia/2673dfcf-26b8-482b-a76f-5bcade51101d.png)

Trong `facebooks_controller#create`, mình sẽ xử lý như sau:

```ruby
  def create
    comments = get_api_request(Settings.post_id.to_s + "/comments")
    comments.each do |comment|
      post_api_request comment["id"], params[:comment]
    end
    redirect_to "https://www.facebook.com/#{Settings.post_id}"
  end
```
Như vậy là đã xong phần xử lý về code rồi. Giờ mình sẽ nhập nội dung comment vào, click vào nút `Add multi comments` 

![](https://images.viblo.asia/d0aa55b1-18ba-48e8-aee6-86f2fd12a66c.png)

Và kết quả sẽ như thế này:

![](https://images.viblo.asia/b85cc93e-0277-4dad-8ce5-80aeb96eda78.png)

Cảm ơn các bạn đã theo dõi bài viết. Ở bài viết tiếp theo, mình sẽ thử tạo tool auto comment trên facebook, thay vì việc phải nhập form theo cách thủ công như thế này. 

-----

**Tài liệu tham khảo:**

Facebook graph api: https://developers.facebook.com/docs/graph-api/using-graph-api/

Graph API Advanced: https://developers.facebook.com/docs/graph-api/advanced/