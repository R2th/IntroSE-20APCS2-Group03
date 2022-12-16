Rails có rất nhiều bước xử lý được ẩn đi mà chúng ta thường coi là điều hiển nhiên. Rất nhiều điều đang diễn ra ở phía sau hậu trường của một vở diễn tao nhã mà Rails cung cấp cho chúng ta với tư cách là người dùng của framework. Và tại một thời điểm nhất định, tôi thấy nó rất hữu ích khi vén bức màn và xem mọi thứ thực sự hoạt động như thế nào.

Nhưng việc mở mã nguồn Rails có thể gây khó khăn lúc đầu. Nó có cảm giác như bước vào một khu rừng trừu tượng và siêu lập trình. Lí do chủ yếu dẫn đến điều này là do bản chất của lập trình hướng đối tượng: về bản chất, không dễ dàng để đi theo một con đường từng bước được thực hiện trong thời gian chạy. Đôi khi, việc này sẽ dễ hơn nhiều nếu bạn có một quyển hướng dẫn ngay bên cạnh.

Với suy nghĩ này, hãy dành một chút thời gian để khám phá cách hoạt động của route trong Rails. Làm thế nào để một yêu cầu từ web được Rack chấp nhận làm và đi đến tận Rails controller của bạn?

### Lãnh thổ quen thuộc

Đối với mục đích của ví dụ này, hãy xem xét ứng dụng Rails chỉ có một route và controller duy nhất:

```ruby
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

Trong ứng dụng này, một yêu cầu GET sẽ được chuyển đến UsersControll. Nhưng bằng cách nào?

### Orientation


Rất nhiều sự kết hợp xảy ra để một yêu cầu có thể đi đến controller, vì vậy sẽ rất hữu ích khi có một cái nhìn tổng quát trước khi đi sâu vào chi tiết cách hoạt động. Ở đây, một sơ đồ cho thấy cách các routes được định nghĩa trong file routes.rb khi ứng dụng được khởi chạy. Chúng tôi sẽ khám phá các class này một cách chi tiết hơn ở phần sau:

![](https://images.viblo.asia/f641524e-1e44-4d5b-88ce-ea85ceb97ede.png)

Và đây là chuỗi sự kiện tiếp theo khi rails gửi yêu cầu GET tới /users:

![](https://images.viblo.asia/f6bfbf2f-5477-413a-92b3-afc6a8ba84e2.png)

### routes.rb

Đây là file mọi người ai cũng biết và yêu quý! Từ góc nhìn của Rails framework, đây là một public interface. Khai báo các routes của bạn trong file này và Rails sẽ tự tìm ra cách định tuyến một yêu cầu đến bộ controller phù hợp.

### RouteSet


Tôi đã nói dối khi tôi nói tuyến đường.rb là một public interface. Nó thực ra là một DSL tới một public interface. RouteSet mới là class thực tế đóng vai trò là điểm vào cho cấu hình route trong ứng dụng Rails. Nó nổi tiếng nhất với phương thức #draw, mà chúng ta vừa dụng trong routes.rb:

```ruby
# What's Rails.application.routes? Why, an instance of `RouteSet`, of course!
Rails.application.routes.draw do
  # ...
end
```

Trong runtime, RouteSet chịu trách nhiệm điều phối toàn bộ hoạt động mà chúng ta sắp sửa thực hiện: nó nhận được yêu cầu đến của web và cộng tác với các đối tượng bên dưới để xác định cách yêu cầu đưa nó tới các đoạn code xử lí của chúng ta.

### Journey::Routes

Ngày xửa ngày xưa, Journey là một gem độc lập, trước khi nó được sáp nhập vào ActionPack. Nó tập trung vào các routes và tìm ra cách định tuyến một yêu cầu được gửi đến. Nó hoàn toàn không biết về Rails, và nó cũng không quan tâm - cứ đưa cho nó một tập hợp các route, sau đó gửi yêu cầu và nó sẽ định tuyến yêu cầu đó đến route đầu tiên phù hợp.

Làm thế nào nó thực hiện việc định tuyến một cách hiệu quả là hấp dẫn, và có một cuộc nói chuyện tuyệt vời từ Vaidehi Joshi đi sâu vào chi tiết về nội bộ của Journey. Tôi khuyên bạn nên xem video đó!

Journey::Routes chứa các routes mà ứng dụng Rails của chúng ta biết. RouteSet delegates tới chúng bất cứ khi nào một tuyến mới được đăng ký khi khởi động, bất kể nó tới từ đâu, từ routes.rb, engine hoặc tới từ gem như Devise mà chúng tự khai báo các route riêng của mình.

### Journey::Route

Nếu chúng ta nghĩ về Journey::Routes giống như một mảng, thì các đối tượng Journey :: Route là các phần tử bên trong mảng. Ngoài các dữ liệu trừu tượng mà bạn nghĩ object này sẽ chứa, như đường dẫn của một route, nó cũng giữ một tham chiếu đến ứng dụng, thứ sẽ được gọi nếu route được chọn để phục vụ yêu cầu.

Theo cách này, mỗi Journey::Route giống như một ứng dụng web nhỏ chỉ phản hồi với một điểm cuối duy nhất. Nó không có kiến thức về các route khác ngoài của chính nó, nhưng nó có thể hướng dẫn yêu cầu của chúng ta đi đúng hướng khi thời gian đến.

### RouteSet::Dispatcher


Trái với những gì bạn có thể nghĩ, ứng dụng sống bên trong mỗi đối tượng Journey::Route không phải là một số tham chiếu đến controller. Có thêm một cấp độ gián tiếp ở đây, lớp này đóng vai trò như một phương tiện để giữ code Rails tách biệt với logic định tuyến mà Journey quan tâm đến.

Dispatcher là một lớp nhỏ chịu trách nhiệm khởi tạo bộ điều khiển và chuyển yêu cầu của chúng ta tới đó, cùng với một đối tượng phản hồi trống. Nó được gọi khi một route thích hợp được xác định cho một yêu cầu. Nó không có kiến ​​thức về cách một yêu cầu đến với nó, nhưng nó biết phải làm gì khi thấy yêu cầu của chúng ta: khởi tạo UsersControll và đưa cho controller yêu cầu của chúng ta. Như chúng tôi sẽ thấy, nó hoạt động như một nhà máy cho các controller của chúng a, loại bỏ nhu cầu chúng ta phải khai báo các lớp controller của chúng tôi ở bất cứ đâu bên ngoài các chính nó.

Điều này có vẻ như là một sự gián tiếp gần như không cần thiết, nhưng nó đáng để xem xét vị trí của TheDispatcher giữa logic định tuyến và các lớp controller cho phép cả hai thay đổi mà không ảnh hưởng đến cái khác.

### Journey::Router

Journey::Routes không biết gì về yêu cầu. Nó biết về các tuyến đường, và nó sẽ nhanh chóng và hiệu quả xác định chính xác route dành cho yêu cầu đó. Vì vậy, để ánh xạ một yêu cầu đến tới một route, chúng ta cần một cái gì đó biết về cả yêu cầu và route. Đó chính là Router.

Chính Router gọi ra Dispatcher i một khi tuyến đường đã được tìm thấy.

### UsersController

Này, chúng tôi biết cái này là gì rồi! Chào mừng về nhà. 😌 Bây giờ hãy ghép các mảnh ghép lại với nhau.

### Quay lại nơi tất cả bắt đầu

Khi Rails khởi động, một Routeset mới sẽ được khởi tạo. Nó đánh giá nội dung của tệp tuyến đường và xây dựng một bộ RouteSet.

```ruby
Rails.application.routes.draw do
  resources :users, only: [:index]
end
```

Bởi vì Routeset là nguồn lưu trữ tất cả các điểm cuối có sẵn trong ứng dụng của chúng ta, nên nó cũng là điểm đầu tiên nhận được yêu cầu từ thế giới bên ngoài, sau khi đi qua Rack và các phần mềm trung gian khác nhau. Đúng vậy, class khiêm tốn này được chôn vùi trong ActionPack là nhân viên mở cửa trong ứng dụng của chúng ta, sẵn sàng với một nụ cười và một cái ôm ấm áp ngay khi có yêu cầu đến trước cửa.

Để RouteSet chấp nhận yêu cầu sau khi nó đi qua Rack và bất kỳ phần mềm trung gian nào, nó cần phải implement Rack's interface:

```rubydef
call(env)
  req = make_request(env)
  req.path_info = Journey::Router::Utils.normalize_path(req.path_info)
  @router.serve(req)
end
```


Ở đây chúng tôi xây dựng một đối tượng yêu cầu mới. Đây sẽ là một instance mới của ActionDispatch::Request, được tạo ra từ env.

Sau khi thực hiện một số thao tác nho nhỏ trên đường dẫn tới, chúng ta chuyển yêu cầu tới @router, đây là một instance của Journey::Router. Chúng tôi chuyển cho nó một yêu cầu và yêu cầu nó phục vụ yêu cầu đó.

Trong Journey :: Router#serve, chúng ta lướt qua các route khớp với đường dẫn trong yêu cầu:

```ruby
def serve(req)
  find_routes(req).each do |match, parameters, route|
    set_params  = req.path_parameters

    # ...

    req.path_parameters = set_params.merge parameters

    # ...

    status, headers, body = route.app.serve(req)
    
    # ...

    return [status, headers, body]
  end

  [404, { "X-Cascade" => "pass" }, ["Not Found"]]
end
```

Đặc biệt chú ý đến dòng này:

> req.path_parameters = set_params.merge parameters# `req.path_parameters` is now a hash that
> # might look familiar:{:controller=>"users", :action=>"index"}


Lưu ý rằng chúng ta làm phong phú thêm đối tượng yêu cầu bằng metadata được lấy từ phương thức find_routes. Điều này khá tinh tế, nhưng đó là cách mà Journey giao tiếp với phần còn lại của hệ thống. Khi nó xác định lộ trình phù hợp cho yêu cầu, nó sẽ đóng dấu route đó vào chính yêu cầu, để các đối tượng tiếp theo xử lý yêu cầu (như Dispatcher) biết cách thực hiện.

Dù sao, khi route phù hợp cuối cùng cũng được tìm thấy, chúng ta yêu cầu route’s app phục vụ yêu cầu, sau đó trả lại mảng quen thuộc từ ứng dụng Rack chứa trạng thái, tiêu đề và nội dung.

Lý do cho tất cả sự thiếu quyết đoán này là sự tách biệt các mối quan tâm. Về lý thuyết, Journey có thể hoạt động hoàn toàn tốt bên ngoài ứng dụng Rails, và kết quả là nó đã trừu tượng hóa khái niệm của một ứng dụng trên mạng thành bất cứ thứ gì có chứa Rack's interface.

Chính ở đây mà Rails bước vào tầm nhìn. Như tôi đã đề cập trước đây, mỗi đối tượng đằng sau route.app thực sự là một instance của Dispatcher:

```ruby
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

  def dispatch(controller, action, req, res)
    controller.dispatch(action, req, res)
  end
end
```

Dispatcher là điểm nhập cảnh của chúng a trở lại vùng đất Rails. Nó biết rằng một yêu cầu được phục vụ bởi controller và nó biết rằng cách để nói chuyện với bộ Rails controller là gửi cho nó một phương thức #dispatch và kèm theo hành động, object yêu cầu và đối tượng ActionDispatch::new mới để viết phản hồi vào.

Lưu ý rằng trong phương thức #controller ở trên, chúng tôi đặt câu hỏi về lớp nào sẽ sử dụng cho chính yêu cầu đó. Khi yêu cầu của chúng ta được sinh ra lần đầu tiên, nó không biết ai nên xử lý yêu cầu của mình; nó chỉ là một hàm băm được với hàng tấn metadata đến từ thế giới bên ngoài. Nhưng may mắn thay, nó đã qua tay của Journey, người đã đính kèm với nó với một vài dữ liệu quan trọng:

```ruby
req.path_parameters
=> {:controller=>"users", :action=>"index"}
```

Được trang bị kiến thức này, bản thân đối tượng yêu cầu hiện đang ở vị trí để trả lời câu hỏi, bộ điều khiển nào sẽ phục vụ yêu cầu của chúng ta?

Đây là một cái gì đó trông giống như trong object Request:

```ruby
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

Đây cũng là một ví dụ tuyệt vời về nguyên tắc Mở/Đóng. Vì Rails đưa ra giả định rằng các controllers của bạn sẽ được đặt tên theo một cách nhất định, bạn nên tự do định nghĩa một bộ controller mới chỉ bằng cách tạo một lớp mới tuân theo quy ước đặt tên và xác định route phù hợp với nó. Bạn không cần phải cập nhật một số ánh xạ vô duyên của route -> controller, hoặc thậm chí đăng ký controller của bạn ở bất cứ đâu

Bây giờ chúng ta tới rất gần rồi: một tin nhắn đã được gửi tới UsersControll! Thông qua một loạt các phương thức trung gian, cuối cùng chúng ta đã gọi phương thức #index trên bộ điều khiển:

```ruby
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

Có vẻ như rất nhiều, nhưng cuối cùng, chúng tôi chỉ sử dụng phương send của Ruby để gọi hành động chính xác trên controller của chúng ta. Đơn giản hóa, nó có thể trông giống như thế này:

```ruby
UsersController.new(request, response).send(:index)
```

### Conclusion


Nếu bạn đã đọc đến đây, xin chúc mừng! Như bạn có thể thấy, có rất nhiều điều xảy ra đằng sau hậu trường, nhưng hy vọng điều này đã giúp làm sáng tỏ một số phép thuật và đánh giá cao các nguyên tắc hướng đối tượng trong công việc.

Lần tới khi bạn thêm controllẻ mới vào ứng dụng Rails, hãy ngồi lại và đánh giá cao việc Rails đang gánh giúp bạn bao công việc nặng nhọc như thế nào để bạn có thời gian đi sâu vào các chi tiết.