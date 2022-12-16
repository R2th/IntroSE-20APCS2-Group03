Bấy lâu nay chuyển sang php không đụng gì đến ruby, sợ nó mốc meo nên đành lôi quyển bí kíp rails ra đọc lại xem có nhớ gì không, đọc đến mục routing thấy có mấy cái mới cũng khá hay mà mình chưa nge đến bao giờ. Vậy nên hôm nay mạn phép chia sẻ lại cho ae một số thủ thuật khi làm việc với Routing trong Rails. MN đọc hết bài để xem mình biết được bao nhiêu thứ trong list dưới đây nhé :D
### 1. Resource Routing
- Route được định nghĩa trong file `config/route.rb`. Chúng ta thường dùng hàm `resources` or `resource` để định nghĩa một nhóm các route liên quan đến nhau:
- Cách dùng khá đơn giản:  `resources :users` nó sẽ tạo ra 7 routes theo chuẩn REsful, tương ứng với 7 action khai báo trong controller tương ứng(Đây cũng là điểm mà mình thích nhất trong Rails, chỉ cần bạn định nghĩa theo 1 format chuẩn của Rails thì việc còn lại nó lo cả)
```
METHOD    PATH               ACTION             
get       '/users',          to: 'users#index'  
post      '/users',          to: 'users#create' 
get       '/users/new',      to: 'users#new'    
get       '/users/:id/edit', to: 'users#edit'   
get       '/users/:id',      to: 'users#show'   
patch/put '/users/:id',      to: 'users#update' 
delete '/users/:id',         to: 'users#destroy'
```

- Tên action là phía sau kí tự `#`, và chúng được định nghĩa trong file `users_controller.rb` 

```
class UsersController < ApplicationController
    def index
    end
    
    def create
    end
    
    # tiếp tục với các method khác
end
```

- Nếu như bạn không muốn khai báo đủ cả 7 actions thì bạn có thể dùng `except` hoặc `only`:

```
resources :users, only: :show 
resources :users, except: [:show, :index]
```

- Để xem được danh sách các route có trong app bằng cách chạy cmd: `rake routes` or `rails routes`.
Từ rails 5.0 trở đi thì bạn có thể dùng `rails` thay thế cho `rake`
- Cách để hiển thị các routes theo tên của controller nào đó: `rake routes -c static_pages` or `rails routes -c static_pages`
```
static_pages_home GET /static_pages/home(.:format) 
static_pages#home static_pages_help GET /static_pages/help(.:format) static_pages#help
```

- Hoặc nếu bạn muốn search theo tên method, path URL hoặc HTTP verb thì sử dụng option -g:
    - `rake routes -g new_user  # tìm kiếm theo helper method`
    - `rake routes -g POST # tìm kiếm theo HTTP verb`

- Bonus: Để biết thêm sự khác biệt giữa `resources` và `resource` thì mn tham khảo thêm [ở đây nhé](http://api.rubyonrails.org/classes/ActionDispatch/Routing/Mapper/Resources.html#method-i-resources) và [đây nữa](https://api.rubyonrails.org/classes/ActionDispatch/Routing/Mapper/Resources.html#method-i-resource)

### 2. Constraints
- Trong một số trường hợp bạn chỉ muốn một số routes được sử dụng và không cho phép client gọi một số api mà bạn không muốn thì đã có `Constraints` hỗ trợ khá mạnh mẽ, ví dụ mình chỉ cho phép 1 địa chỉ ip (127.0.0.1) có thể truy cập đến route:
```
constraints(ip: /127\.o\.o\.1$/) do
    get "route', to: "controller#action"
end
```
- Trường hợp bạn muốn xử lí phức tạp hơn ở chỗ này thì có thể sử dụng advance constraints và tạo một class để chứa đoạn code logic đó: Mình lấy một ví dụ, mình muốn check xem headers["Accept"] của request nếu nó là của version `v1` thì mình cho nó đi vào routes được định nghĩa trong namespace `:v1` ngược lại với `v2` thì vào namespace `:v2`.
```
# lib/api_version_constraint.rb
class ApiVersionConstraint
    def initialize(version:, default:)
        @version = version
        @default = default
    end
    
    def version_header
        "application/vnd.my-app.v#{@version}"
    end
    
    def matches?(request)
    @default || request.headers["Accept"].include?(version_header)
    end
end

# config/routes.rb
require "api_version_constraint"
Rails.application.routes.draw do
    namespace :v1, constraints: ApiVersionConstraint.new(version: 1, default: true) do
        resources :users # Will route to app/controllers/v1/users_controller.rb
   end
   
   namespace :v2, constraints: ApiVersionConstraint.new(version: 2) do
       resources :users # Will route to app/controllers/v2/users_controller.rb
   end
end
```

### 3. Scoping routes
Scoping routes sinh ra là để giúp bạn tổ chức lại routes của mình, dưới đây là một số cách mà Rails hỗ trợ:
- Scope by URL: cách này giúp bạn phân chia routes theo url, thường thì giúp cho client dễ nhận biết hơn đâu là url cuả admin, đâu là của user
```
scope 'admin' do
    get 'dashboard', to: 'administration#dashboard'
    resources 'employees'
end
```

Xem có gì khác biệt ko nhé:
```
get       '/admin/dashboard',          to: 'administration#dashboard'
post      '/admin/employees',          to: 'employees#create'
get       '/admin/employees/new',      to: 'employees#new'
get       '/admin/employees/:id/edit', to: 'employees#edit'
get       '/admin/employees/:id',      to: 'employees#show'
patch/put '/admin/employees/:id',      to: 'employees#update'
delete    '/admin/employees/:id',      to: 'employees#destroy'
```

- Scope by module:
```
scope module: :admin do
    get 'dashboard', to: 'administration#dashboard'
end
```

Cách phân chia thế này giúp bạn tách file controller theo từng thư mục vd của folder admin thì chưa những controller của admin, folder user thì chứa những controller của user
```
get '/dashboard', to: 'admin/administration#dashboard'
```

Ngoài ra bạn cũng có thể đặt tên cho tiền tố bằng cách truyền tham số vào `as`:

```
scope 'admin', as: :adminstration do
    get 'dashboard'
end
```

```
# => adminstration_dashboard_path
```

Rails cũng hỗ trợ thêm tính năng giúp gộp cả 2 cách trên thành một thông qua method `namespace`:

```
namespace :admin do
end

scope 'admin', module: :admin, as: :admin
```

- Scope by controller:
```
scope controller: :management do get 'dashboard'
    get 'performance'
end
```

Kết quả:
```
get       '/dashboard',          to: 'management#dashboard'
get       '/performance',        to: 'management#performance'
```

### 4. Concerns
- Từ khoá `concerns` cũng không quá gì là xa lạ khi ta làm việc với controller hoặc service, còn trong routes thì lạ thật :D
- Cũng như cái tên của nó đã nói lên công dụng của nó là gì, tương tự như controller và service, `Concerns` trong route giúp tái sử dụng lại các route giống nhau, tránh việc lặp code.

Định nghĩa 1 concern: 
```
concern :commentable do
    resources :comments
end
```

Đoạn code trên nó không tạo ra bất kì route nào, cho phép bạn tái sử dụng thông qua thuộc tính `:concerns` trên bất kì resource nào bạn cần dùng.

```
resource :page, concerns: commentable
```

Nếu viết dưới dạng nested resource thì sẽ là:
```
resource :page do 
    resource :comments
end
```

Kết quả:
```
 /pages/#{page_id}/comments
 /pages/#{page_id}/comments/#{comment_id}
```

Có thể sử dụng cho nhiều resource khác:
```
resource :post, concerns: %i(commentable)
resource :blog do
    concerns :commentable
end
```

### 5. Root route
Cái này thì chắc không cần phải bàn nhiều, `root` giúp bạn chỉ định home page của trang web
```
# config/routes.rb
Rails.application.routes.draw do root "application#index"
# equivalent to:
# get "/", "application#index"
end
# app/controllers/application_controller.rb
class ApplicationController < ActionController::Base 
    def index
        render "homepage"
     end
end
```

Kết quả thu được:
```
root GET / application#index
```

### 6. Split routes
Thường thì chúng ta sẽ định nghĩa các endpoint vào file routes, đến một lúc nào đó thì file routes của bạn rất lớn và nhìn rối, khó quản lí. Trong trường hợp này chúng ta có thể tách file routes mình ra theo chức năng hoặc module, và include nó vào lại file routes với method `require_relative` của Ruby.

```
# config/routes.rb
YourAppName::Application.routes.draw do
  require_relative 'routes/admin_routes'
  require_relative 'routes/sidekiq_routes'
  require_relative 'routes/api_routes'
  require_relative 'routes/your_app_routes'
end
```

```
# config/routes/api_routes.rb
YourAppName::Application.routes.draw do
  namespace :api do
    # ...
  end
end
```

Hôm nay mình xin phép tạm dừng tại đây, còn một số cái hay nữa mình sẽ chia sẽ sớm trong vài ngày tới. Hy vọng bài viết mang lại cho mn một số kiến thức bổ ích, nếu có gì không đúng mn cùng cmt để thảo luận nhé. Cảm ơn mn đã đọc bài của mình :D :D

Happy coding!