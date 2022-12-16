```

class UsersController < ApplicationController
  def index
    # ...
  end
end

# config/routes.rb
Rails.application.routes.draw do
  resources :users, only: [:index]
end
```

Rails có quá nhiều điều tuyệt vời mà chúng ta cứ nghĩ nó là hiển nhiên nên bỏ đã bỏ qua nhiều điều xảy đằng sau đó. Nếu ai đã từng làm việc với Rails thì chắc chắn đã làm việc với Routes cụ thể là `routes.rb`
```
# config/routes.rb
Rails.application.routes.draw do
  resources :users, only: [:index]
end
```
Rất, rất quên thuộc phải không ạ? Nhưng mà bạn đã bao giờ tự hỏi điều gì xảy ra đằng sau đó, làm sao rails có thể biết request đến method của controller nào... thì bạn đã đọc đúng bài rồi đấy. Hôm nay chúng ta sẽ cùng tìm hiểu "sự thật đằng sau hậu trường là gì" =))

### Mở đầu
![](https://images.viblo.asia/10f8c269-7702-45c2-956d-e82121de817e.png)
Trên đây là các đối tượng liên quan đến cấu hình route. Journey là gì? Cũng hơi lạ nhỉ. Đừng nóng vội, chúng ta sẽ tìm hiểu sau.
![](https://images.viblo.asia/3482db1c-1f34-4fa2-a91c-d966b3b70d48.png)
Đây là cách 1 request tìm tới controllers của nó

### routes.rb
Rất quen  thuộc, file bạn dùng để khai báo cái routes và phần còn lại để Rails lo.

### RouteSet
RouteSet mới thực sự là class đóng vai trò chính trong việc cấu hình route của ứng dụng Rails. Method `#draw` chính là cái đã đc sử dụng trong routes.rb
```
# What's Rails.application.routes? Why, an instance of `RouteSet`, of course!
Rails.application.routes.draw do
  # ...
end
```
Trong thời gian runtime thì RouteSet sẽ nhận các request và cùng với các đối tượng khác xác định và tìm đích đến cho request đó.
### Journey::Routes
https://github.com/rails/journey
Trong 1 thời gian dài, Journey chỉ là 1 gem độc lập, trước khi nó được thêm vào ActionPack. Nó tập trung vào routes, và tìm ra cách định tuyến 1 request. Journey::Routes giữ các routes của Rails app. RouteSet sẽ delegates đến nó.

### Journey::Route
Nếu như Journey::Routes như là 1 mảng thì Journey::Route là 1 phần tử trong mảng đó. Nó như 1 ứng dụng web nhỏ đáp ứng với 1 điểm cuối duy nhất.

### RouteSet::Dispatcher
Dispatcher là 1 class nhỏ chịu trách nhiệm khởi tạo controller và có nhiệm vụ chuyển request tới đúng controller để xử lý và trả về response.

### Yêu lại từ đầu
Quay lại với file routes.rb của chúng ta.
```
Rails.application.routes.draw do
  resources :users, only: [:index]
end
```

Khi Rails app khởi động, RouteSet sẽ được khởi tạo. Nó build cái routes từ file routes.rb. Và nó cũng chính là thành phần đầu tiên nhận request từ client sau khi đi qua Rack và các middleware khác. Để nó có thể nhận các request sau khi đi qua Rack nó cần phải implement 1 Rack interface
```
def call(env)
  req = make_request(env)
  req.path_info = Journey::Router::Utils.normalize_path(req.path_info)
  @router.serve(req)
end
```
Ở đây thì request sẽ đc tạo lại, là 1 instance của ActionDispatch::Request từ env.
Tiếp theo sau đó thì request sẽ được truyền vào #serve của @router chính là instance của Journey::Router.
Journey::Router#serve sẽ tìm các routes match với path của request.
```
def serve(req)
  find_routes(req).each do |match, parameters, route|
    set_params  = req.path_parameters

    # ...

    status, headers, body = route.app.serve(req)

    # ...

    req.path_parameters = set_params.merge parameters

    return [status, headers, body]
  end

  [404, { "X-Cascade" => "pass" }, ["Not Found"]]
end
```

đặt biệt chú ý dòng này
```
req.path_parameters = set_params.merge parameters
# `req.path_parameters` is now a hash that
# might look familiar:
{:controller=>"users", :action=>"index"}
```
to be continued...