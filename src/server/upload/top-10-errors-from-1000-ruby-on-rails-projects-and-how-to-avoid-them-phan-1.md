Trở lại với cộng đồng Ruby developer, chúng tôi đã tìm trong database của hàng ngàn project và tìm thấy top 10 lỗi hay gặp phải trong các ứng dụng Ruby on Rails. Chúng tôi sẽ chỉ ra cho các bạn, nguyên nhân gì gây ra chúng và giải pháp để ngăn ngừa chúng xảy ra. Nếu bạn tránh được các lỗi này, bạn sẽ trở thành một developer tốt hơn.

Bởi vì dữ liệu là quan trọng nhất, chúng tôi đã thu thập, phân tích, đánh giá top 10 lỗi Ruby từ những dự án Ruby on Rails. Chúng tôi đã thu thập tất cả những lỗi xảy ra từ mỗi project và tóm lược lại bao nhiêu lần chúng xảy ra. 

Chúng tôi tập trung vào lỗi thường xảy ra với bạn hay với users của bạn nhất. Để làm điều đó, chúng tôi đã xếp hạng lỗi theo số lượng dự án gặp phải trên các công ty khác nhau. 

Đây là top 10 lỗi Rails:
![](https://images.viblo.asia/6d45b105-05f6-41ea-a625-30408b5a96a2.png)

Các bạn hầu như đều đã gặp phải một vài lỗi trong chúng. Chúng ta sẽ lần lượt tìm hiểu chi tiết về các lỗi này. Các giải pháp được xây dựng trên base Rails 5

# 1. ActionController::RoutingError

Chúng ta hãy bắt đầu với một thứ cơ bản trong bất kì ứng dụng web nào, lỗi 404. Một ActionController::RoutingError có nghĩa rằng, user đã request đến một URL không có trong ứng dụng web của bạn. Rails sẽ ghi log cho lỗi này, nhưng trong hầu hết các trường hợp nó không phải là lỗi của ứng dụng của bạn. Điều này có thể do các link không chính xác được trỏ đến hoặc ngay trong ứng dụng của bạn. Nó có thể do 1 hacker hay một tester nào đó muốn kiểm tra ứng dụng của bạn. Với các trường hợp đó, bạn có thể thấy điều này trong file log:

```
ActionController::RoutingError (No route matches [GET] "/wp-admin"):
```

Có một lý do khá phổ biến do ứng dụng của bạn gây ra lỗi ActionController::RoutingError là: nếu bạn deploy ứng dụng trên heroku hay bất kì một platform nào khác mà không cho phép "serve static file", dẫn đến css và javascript không được load, trong trường hợp này lỗi sẽ trông như:

```
ActionController::RoutingError (No route matches [GET] "/assets/application-eff78fd93759795a7be3aa21209b0bd2.css"):
```

Để fix điều này và cho phép serve static file, bạn cần add dòng này đến file config/environments/production.rb:

```
Rails.application.configure do
  # other config
  config.public_file_server.enabled = true
end
```

Nếu bạn muốn tránh log lỗi 404 sinh ra bởi ActionController::RoutingError, có thể setting để bắt tất cả các lỗi 404 route. Để làm điều đó, bạn add dòng sau trong file config/routes.rb

```
Rails.application.routes.draw do
  # all your other routes
  match '*unmatched', to: 'application#route_not_found', via: :all
end
```

Sau đó add method route_not_found trong ApplicationControler

```
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  def route_not_found
    render file: Rails.public_path.join('404.html'), status: :not_found, layout: false
  end
end
```

# 2. NoMethodError: undefined method '[]' for nil:NilClass

Điều này có nghĩa bạn đang sử dụng cứ pháp ngoặc [] để đọc một thuộc tính từ một đối tượng, nhưng đối tượng đó không tồn tại hoặc nil và do đó nó không hỗ trợ method này. Điều này có thể xảy ra khi bạn parse và extract dữ liệu từ một JSON API hoặc file CSV hay get dữ liệu từ một params lồng nhau trong một action controler.

Giả sử user submit chi tiết một địa chỉ thông qua một form. Bạn đang mong đợi params như này:

```
{ user: { address: { street: '123 Fake Street', town: 'Faketon', postcode: '12345' } } }
```

Sau đó, bạn muốn truy cập vào giá trị của street bằng cách gọi params[:user][:address][:street]. Nếu địa chỉ không được truyền, params[:user][:address] trở thành nil và lời gọi [:street] của nó sẽ ráise lỗi NoMethodError. 

Bạn có thể kiểm tra nil trên mỗi params bằng toán từ && như sau:

```
street = params[:user] && params[:user][:address] && params[:user][:address][:street]
```

Kể từ Ruby 2.3, hash, array và ActionController::Parameters có một method dig. cho phép cung cấp một đường dẫn đến đối tượng mà bạn muốn lấy. Nếu ở bất kì một bước nào có giá trị nil, dig sẽ trả lại nil mà ko ném ra NoMethodError. Do đó bạn có thể:

```
street = params.dig(:user, :address, :street)
```

Mặt khác, nếu bạn cũng muốn dig thông qua nested objects. bạn có thể

```
street = user&.address&.street
```

để tránh lỗi tương tự có thể sinh ra:

```
NoMethodError: undefined method street for nil:NilClass
```

Nếu bạn dùng các version cũ hơn ruby 2.3. Bạn có thể sử dụng try thay thế.

# 3. ActionController::InvalidAuthenticityToken

Số 3 trong list của chúng ta yêu cầu một sự chú ý cẩn thận vì nó liên quan đến vấn đề sercurity. ActionController::InvalidAuthenticityToken sẽ được raise ra khi một POST, PUT, PATCH, or DELETE request bị mất hay có một giá trị sai CSRF (Cross Site Request Forgery) token.
CSRF là một lỗ hổng tiềm ẩn trong các ứng dụng web. Rails ngăn chặn các cuộc tấn công CSRF bằng cách include một secure token vào tất cả các form đã được trang web xác định và xác minh, nhưng không thể biết được từ một bên thứ 3. Điều này được thực hiện bởi 1 dòng quên thuộc trong ApplicationController:

```
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
end
```

Vì vậy nếu ứng dụng production của bạn raise ra lỗi ActionController::InvalidAuthenticityToken, có nghĩa đã có cuộc tấn công đến một người dùng của bạn nhưng các bạn biện pháp bảo mật của Rails đang giúp bạn trở nên an toàn.
Một vài lý do khác mà bạn có thể vô tình nhận được lỗi loại này

## Ajax

Ví dụ, nếu bạn muốn tạo một request Ajax từ frontend của bạn, bạn cần chắc chắn đã include CSRF token vào trong request. Nếu bạn sử dụng jQuery và rails-ujs (Rails unobtrusive scripting adapter) thì phía Rails đã xử lý sẵn cho bạn. Nhưng nếu bạn muốn xử lý ajax theo các khác, ví dụ như Fetch API, bạn sẽ cần phải thêm CSRF token bằng tay. Đầu tiên, chắc chắn rằng bạn đã thêm thẻ sau vào trong thẻ <head> của trang web:
    
```
<%= csrf_meta_tags %>
```

Nó sẽ output một meta tag như sau:

```
<meta name='csrf-token' content='THE-TOKEN'>
```

Khi tạo một Ajax request, đọc content của meta tag và add nó vào header của X-CSRF-Token

```
const csrfToken = document.querySelector('[name="csrf-token"]').getAttribute('content');
fetch('/posts', {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json'
    'X-CSRF-Token': csrfToken
  }
).then(function(response) {
  // handle response
});
```

## Webhooks/APIs

Thỉnh thoảng, có một vài lý do mà bạn cần tắt chức năng bảo vệ CSRF. Chẳng hạn khi bạn muốn nhận một request POST đến 1 url trong ứng dụng của bạn từ một bên thứ 3, khi đó bạn sẽ không muốn block chúng trên base của CSRF. Để bỏ qua việc kiếm tra CSRF ở một số controller nhất định, bạn chỉ việc thêm dòng dưới đây vào trong controller:

```
class ApiController < ApplicationController
  skip_before_action :verify_authenticity_token
end
```

Tham khảo:

https://rollbar.com/blog/top-10-ruby-on-rails-errors/