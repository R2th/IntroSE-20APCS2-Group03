Ở phần trước chúng ta đã cùng nhau đi tìm hiểu làm thế nào để một request tìm đường đến đúng controller. Trong phần này chúng ta hãy cùng xem, khi nhận được một request, Rails sẽ làm những gì để tạo ra một đối tượng controller tương ứng để xử lý request đó.
## Back to where it all began
Hãy cùng quay trở lại nơi mà chúng ta đã bắt đầu
```
Rails.application.routes.draw do
  resources :users, only: [:index]
end
```
Khi Rails được khởi động, một đối tượng RouteSet sẽ đồng thời được khởi tạo bằng việc xem xét những nội dung có trong `routes.rb`.

Bời vì RouteSet luôn có sẵn `endpoints` cho ứng dụng của chúng ta. Là nơi đầu tiên nhận request và đưa chúng vào trong Rack hay các middleware khác.

Để request có thể được RouteSet chấp nhận sau khi đưa nó vào cho Rack hay bất khi middleware nào, trước tiên nó cần thực hiện interface của Rack:
```
def call(env)
  req = make_request(env)
  req.path_info = Journey::Router::Utils.normalize_path(req.path_info)
  @router.serve(req)
end
```
Tại đây chúng ta tạo ra một request object, đó là một đối tượng `ActionDispatch::Request` mới.

Sau khi thực hiện một số thủ tục với đường dẫn đến, chúng ta đưa request vào trong `@router`, đó là một đối tượng của `Journey::Router`. Chúng ta đưa cho nó một request và yêu cầu nó giữ lấy để phục vụ cho các quá trình tiếp theo.

Trong `Journey::Router#serve`, chúng ta lặp qua các đường dẫn đến khi tìm được được đường dẫn đầu tiên phù hợp.

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
```

Đặc biệt chú ý đến đoạn code này:

```
req.path_parameters = set_params.merge parameters

# `req.path_parameters` is now a hash that might look familiar:
{:controller=>"users", :action=>"index"}
```

Chúng ta đã đưa thêm dữ liệu vào request từ method `find_routes`. Điều này khá là tinh tế, nhưng đó là cách `Journey` liên lạc với phần còn lại của hệ thống. Sau khi xác định được routes phù hợp với request, nó *đóng dấu* những thông tin của request vào chính request đó. Cũng như là một chỉ dẫn để các thành phần khác (giống như `Dispatcher`) biết làm cách nào để xử lý request.

Bằng bất cứ cách nào, sau khi tìm được đường dẫn phù hợp, yêu cần `@router` phải trả về những thông tin với định dạng giống nhau cho Rack app, đó là `status`, `headers`, và `body`.

Lý do cho tất cả những điều trên là sự tách biệt về mặt code và khái niệm. Thực tế, `Journey` có thể hoạt động tốt bên ngoài ứng dụng Rails và bất cứ thứ gì implements Rack’s interface đều sẽ có được trả về những thông tin theo cùng một định dạng.

Và đây là nơi Rails sẽ xuất hiện. Như đã đề cập trước đây, đằng sau `router.app` thực sự là một đối tượng của `Dispatcher`:
```
class Dispatcher < Routing::Endpoint
  # ...

  def serve(req)
    params     = req.path_parameters
    controller = controller req
    res        = controller.make_response! req
    dispatch(controller, params[:action], req, res)
  rescue ActionController::RoutingError
    if @raise_on_name_error
      raise
    else
      [404, { "X-Cascade" => "pass" }, []]
    end
  end

private

  def controller(req)
    req.controller_class
  rescue NameError => e
    raise ActionController::RoutingError, e.message, e.backtrace
  end
```

`Dispatcher` là điểm đầu vào của Rails app. Nó biết được request sẽ được xử lý bởi controller nào và nó biết cách để giao tiếp với controller thông qua method `#dispatch`. Cùng với đó một đối tượng `ActionDispatch::Response` được tạo ra để lưu lại `response`.

Để ý vào method `#controller` phía trên, chúng ta tự hỏi, controller class nào sẽ được sử dụng để xử lý request. Khi request mới được sinh ra lần đầu tiên, nó sẽ không biết được controller nào sẽ được lựa chọn để xử lý giữa hàng tá dữ liệu đến từ bên ngoài kia. Rất may mắn vì qua bàn tay của `Journey`, cuối cùng chúng ta đã nhận được một dữ liệu quan trọng:
```
req.path_parameters
=> {:controller=>"users", :action=>"index"}
```

Đến đây mọi chuyện có lẽ đã đơn giản hơn. Trước hết hãy cùng nhau nhìn vào bên trong một `Request` object:

```
# actionpack/lib/action_dispatch/http/request.rb
def controller_class_for(name)
  if name
    controller_param = name.underscore
    const_name = "#{controller_param.camelize}Controller"
    ActiveSupport::Dependencies.constantize(const_name)
  else
    PASS_NOT_FOUND
  end
end
```

Chúng ta muốn lựa chọn chính xác một controller class để xử lý request một cách tự động. Điều đó chẳng có gì là khó khăn bằng việc xử lý một chút tên controller nhận được từ request và gọi đến controller class tương ứng. Trong trường hợp này, chúng ta bắt đầu với chuỗi “users”, request đã nói rõ ràng rằng nó muốn được xử lý bởi `UsersController`.

Vì Rails luôn muốn controller của bạn được đặt tên theo mộ quy ước nhất định để nó có thể mapping một cách tự động giữa từ đường dẫn đến controller.

Bây giờ chúng ta đã thực sự đến gần hơn. Thông qua một loạt các thủ tục trung gian, cuối cùng chúng ta đã đến với `#index` trên `UsersController`:
```

# actionpack/lib/action_controller/metal.rb
def dispatch(name, request, response) #:nodoc:
  set_request!(request)
  set_response!(response)
  process(name)
  # ...
end

# actionpack/lib/abstract_controller/base.rb
def process(action, *args)
  # ...
  process_action(action_name, *args)
end

def process_action(method_name, *args)
  send_action(method_name, *args)
end

alias send_action send
```

Nhìn có vẻ phức tạp nhưng cuối cùng mọi thứ sẽ trông như thế này:
```
UsersController.new(request, response).send(:index)
```
## Unwinding the Abstraction
Chúng ta đã đi sâu vào tìm hiểu rất nhiểu các đối tượng khác nhau và sẽ thật khó để có một cái nhìn tổng quan về toàn bộ quá trình ấy. Vì vậy chúng ta hãy cùng nhau nhìn lại nó một lần nữa:

![](https://images.viblo.asia/cab5e7df-0bd0-498f-91bb-890b75de9cc5.png)

Một cách khác để hiểu hơn về quá trình đó, bỏ qua một số bước trung gian, cuối cùng chúng ta sẽ thấy mọi thứ trông sẽ như thế này:

```
# remember that this is totally fake and you won't find this code anywhere in Rails ;)
def call(env)
  req = ActionDispatch::Request.new(env)
  res = ActionDispatch::Response.new(req)

  find_routes(req).each do |match, parameters, route|
    controller_name = "#{parameters[:controller]}Controller".constantize # UsersController
    action = parameters[:action] # "index"

    controller = controller.new(req, res)
    status, headers, body = controller.send(action)

    return [status, headers, body]
  end
```

## Conclusion

Nếu bạn đã đến được đây thì xin chúc mừng! Như bạn thấy, có rất nhiều thứ xảy ra đằng sau một Rails app, hi vọng điều này sẽ làm sáng tỏ một số điều kì diệu đang diễn ra bên trong nó.
Lần sau, khi bạn tạo mới một controller trong, hãy ngồi xuống và biết ơn những gì mà Rails đã rất vất vả để thực hiện mọi thứ thay cho bạn.

Nguồn bài viết : https://medium.com/rubyinside/a-deep-dive-into-routing-and-controller-dispatch-in-rails-8bf58c2cf3b5