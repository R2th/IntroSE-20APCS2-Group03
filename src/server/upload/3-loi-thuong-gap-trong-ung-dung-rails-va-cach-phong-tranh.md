# 1. ActionController::RoutingError
Chúng ta bắt đầu với lỗi cơ bản của bất kỳ ứng dụng web nào, lỗi 404 phiên bản Rails. Lỗi này nghĩa là người dùng đã request một URL không tồn tại trong ứng dụng của bạn. Bạn cần phải khai báo đúng controller để xử lý url người dùng nhập vào trong file `config/routes.rb`.

Một nguyên nhân phổ biến khác cũng có thể dẫn đến lỗi `ActionController::RoutingError` là khi bạn deploy ứng dụng lên Heroku, hay bất kỳ nền tảng nào không cho phép server phục vụ static files, bạn sẽ thấy file CSS và JavaScript không được load. Trong trường hợp đó lỗi sẽ giống như sau:

```
ActionController::RoutingError (No route matches [GET] "/assets/application-eff78fd93759795a7be3aa21209b0bd2.css"):
```

Để fix lỗi này, bạn cần thêm dòng sau vào file `config/environments/production.rb`:

```
Rails.application.configure do
  config.public_file_server.enabled = true
end
```

Ngoài ra, nếu bạn không thích trang 404 error mặc định, bạn có thể tự custom trong 404 của chính mình bằng cách thêm dòng sau vào `config/routes.rb` (tham khảo ở [đây](https://github.com/roidrage/lograge#handle-actioncontrollerroutingerror)):

```
Rails.application.routes.draw do
  match '*unmatched', to: 'application#route_not_found', via: :all
end
```

Sau đó thêm phương thứ `route_not_found` vào `ApplicationController`:

```
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  
  def route_not_found
    render file: Rails.public_path.join('404.html'), status: :not_found, layout: false
  end
end
```

# 2. NoMethodError: undefined method '[]' for nil:NilClass

Lỗi này xảy ra khi bạn sủ dụng dấu ngoặc vuông để đọc thuộc tính từ một nil object, và nil object không tồn tại phương thức đó. Lỗi này cũng có thể xảy ra khi bạn lấy dữ liệu từ một JSON API hoặc một file CSV, hay chỉ là lấy dữ liệu từ nested parameters từ controller.

Ví dụ trường hợp ta xử lý parameter được gửi lên như sau:

```
{ user: { address: { street: '123 Fake Street', town: 'Faketon', postcode: '12345' } } }
```

Khi muốn lấy giá trị street từ params trên, bạn có thể gọi `params[:user][:address][:street]`. Nhưng nếu như không có address nào được truyền vào  `params[:user][:address]` thì nó sẽ là `nil`, do đó khi gọi `[:street]` sẽ xảy ra lỗi `NoMethodError`.

Để tránh tình trạng gặp lỗi trên, bạn có thể check nil trên mỗi phần nhỏ của params, sử dụng toán tử `&&` như sau:

```
street = params[:user] && params[:user][:address] && params[:user][:address][:street]
```

Ruby 2.3 đã bổ sung phương thức `dig` cho các đối tượng thuộc kiểu hashs, arrays và `ActionController::Parameters` có chức năng kiểm tra tương tự như trên. Nếu bất kì phần nào bị nil, hàm `dig` sẽ trả về nil thay vì báo lỗi `NoMethodError`. Ví dụ để lấy street từ ví dụ ban đầu, ta chỉ việc gọi:

```
street = params.dig(:user, :address, :street)
```

Bên cạnh đó, nếu bạn muốn lấy dữ liệu từ object lồng nhau trong Ruby 2.3 trở lên, thay vì gọi

```
street = user.address.street
```

và bị lỗi `NoMethodError: undefined method street for nil:NilClass` khi user nil, bạn có thể gọi như sau

```
street = user&.address&.street
```

Nếu bạn không sử dụng Ruby 2.3 trở lên, có thể sử dụng gem [ruby_dig](https://github.com/Invoca/ruby_dig) hoặc phương thức [try](http://api.rubyonrails.org/classes/Object.html#method-i-try) từ `ActiveSupport`.

# 3. ActionController::InvalidAuthenticityToken
Lỗi này xảy ra khi một http request (POST, PUT, PATCH hoặc DELETE) không có hoặc sai CSRF token (Cross Site Request Forgery). CSRF là một lỗ hổng bảo mật tiềm tàng trong các ứng dụng web, kẻ tấn công có thể sử dụng cookies của người dùng để gửi những request trái phép mà người dùng không hề hay biết. Rails phòng chống tấn công CSRF bằng cách chèn một đoạn token vào tất cả các form, khi submit form server sẽ chỉ xử lý các request có mã token hợp lệ. Kích hoạt bằng cách thêm dòng dưới đây vào `ApplicationController`:

```
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
end
```

Trong môi trường production, nếu bạn nhận được lỗi `ActionController::InvalidAuthenticityToken` có nghĩa là người dùng đang bị tấn công theo phương thức CSRF và Rails đã bảo vệ thành công. Tuy nhiên còn nhiều nguyên nhân khác không mong muốn làm phát sinh lỗi này.

**Ajax**


Khi bạn gửi ajax request từ phía frontend, chắc chắn rằng bạn đã gửi kèm CSRF token trong request đó. Nếu bạn sử dụng `jQuery` và `rails-ujs` (Rails unobtrusive scripting adapter) thì phía Rails đã xử lý sẵn cho bạn. Nhưng nếu bạn muốn xử lý ajax theo các khác, ví dụ như [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), bạn sẽ cần phải thêm CSRF token bằng tay. Đầu tiên, chắc chắn rằng bạn đã thêm thẻ sau vào trong thẻ `<head>` của trang web:

```
<%= csrf_meta_tags %>
```

Khi gen ra mã html, nó sẽ có dạng sau:

```
<meta name='csrf-token' content='THE-TOKEN'>
```

Khi tạo ajax request, đọc nội dung tag meta trên và thêm nó vào headers của request như sau:

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

**Webhooks/APIs**

Đôi lúc có nhiều lý do mà bạn muốn tắt chức năng bảo mật CSRF. Ví dụ khi bạn mong muốn POST request đến những url nhất định từ một bên thứ ba, như bạn đang xây dựng hệ thống API cho nhiều người nặc danh sử dụng, bạn sẽ không muốn chặn chúng. Bạn có thể đang ở vị trí xây dụng một API cho các nhà phát triển bên thứ ba hoặc bạn muốn nhận các webhook đến từ một dịch vụ khác.

Để bỏ qua việc kiếm tra CSRF ở một số controller nhất định, bạn chỉ việc thêm dòng dưới đây vào trong controller:

```
class ApiController < ApplicationController
  skip_before_action :verify_authenticity_token
end
```


# Tham khảo

- https://dev.to/philnash/top-10-errors-from-1000-ruby-on-rails-projects-and-how-to-avoid-them-24m
- https://www.rubydoc.info/docs/rails/4.1.7/ActionController/RoutingError
- https://ruby-doc.org/core-2.2.0/NoMethodError.html
- http://guides.rubyonrails.org/security.html#cross-site-request-forgery-csrf