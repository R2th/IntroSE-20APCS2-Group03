## Rambulance gem
Rambulance là một gem đơn giản, gọn nhẹ, kế thừa từ `ActionController::Base`, được dùng trong việc hiển thị các trang lỗi cho ứng dụng Rails của bạn
Về cách cài đặt và sử dụng, các bạn có thể tham khảo Github [yuki24/rambulance](https://github.com/yuki24/rambulance)
Nói sơ qua thì các cặp ngoại lệ - trạng thái được định nghĩa trong file `config/initializers/rambulance.rb` theo cú pháp như sau:

```
# config/initializers/rambulance.rb
config.rescue_responses = {
  "ActiveRecord::RecordNotUnique" => :unprocessable_entity,
  "CanCan::AccessDenied"          => :forbidden,
  "YourCustomException"           => :not_found
}
```

Các template của trang lỗi được viết trong views (thường được viết trong `views/errors`. Ví dụ: `app/views/errors/not_found.html.erb` hoặc `app/views/errors/not_found.json.jbuilder`. Và dựa vào định dạng của request mà trả về template json hay html (hoặc loại khác)

## Vấn đề: Làm thế nào để trả về trang lỗi html cho các request như `css`, `pdf`
Trước khi đi vào cách giải quyết, mình sẽ nói về lỗi sẽ xảy ra. Ở đây mình sẽ tạo một ứng dụng mới hoàn toàn và không thêm bất cứ resource nào
- Trước hết, khi chưa thêm gem Rambulance vào và truy cập `localhost:3000/abc`, trang lỗi của rails sẽ hiển thị ra:

![image.png](https://images.viblo.asia/6c130ae7-265a-4c51-8c96-061e571c1c3a.png)

Sau khi thêm Rambulance vào (ở đây mình đã sửa template một chút. các bạn có thể sử dụng template mặc định của Rambulance)

![image.png](https://images.viblo.asia/45a16800-5ecd-43ca-a656-a1243e88fc61.png)

![image.png](https://images.viblo.asia/f3631747-c472-486d-8a42-79c5d3e102cf.png)

 -> Các trang lỗi sẽ được hiển thị ra theo đúng định dạng của request là json hay html (trường hợp không có đuôi thì mặc định giống html)

Tuy nhiên khi gửi request css thì sao?

![image.png](https://images.viblo.asia/438496e4-296c-4fb7-957f-1edff2078603.png)

-> Vẫn là lỗi 404, nhưng lỗi hiện thị đã khác

Ở đây có 2 nguyên nhân:
  - **Nguyên nhân 1**: Không có template app/views/errors/not_found.css.*
        -  Trường hợp này chúng ta không thể giải quyết bằng thêm template được. Lý do là chúng ta đang muốn hiển thị mỗi trang lỗi theo định dạng html
  -  **Nguyên nhân 2**: Cùng xem log nhé

> ActionController::RoutingError (No route matches [GET] "/abc.css"):
>   
> actionpack (6.0.4.6) lib/action_dispatch/middleware/debug_exceptions.rb:36:in `call'
> web-console (4.2.0) lib/web_console/middleware.rb:132:in `call_app'
> web-console (4.2.0) lib/web_console/middleware.rb:28:in `block in call'
> web-console (4.2.0) lib/web_console/middleware.rb:17:in `catch'
> web-console (4.2.0) lib/web_console/middleware.rb:17:in `call'
> actionpack (6.0.4.6) lib/action_dispatch/middleware/show_exceptions.rb:33:in `call'
> railties (6.0.4.6) lib/rails/rack/logger.rb:37:in `call_app'
> railties (6.0.4.6) lib/rails/rack/logger.rb:26:in `block in call'
> activesupport (6.0.4.6) lib/active_support/tagged_logging.rb:80:in `block in tagged'
> activesupport (6.0.4.6) lib/active_support/tagged_logging.rb:28:in `tagged'
> activesupport (6.0.4.6) lib/active_support/tagged_logging.rb:80:in `tagged'
> railties (6.0.4.6) lib/rails/rack/logger.rb:26:in `call'
> sprockets-rails (3.4.2) lib/sprockets/rails/quiet_assets.rb:13:in `call'
> actionpack (6.0.4.6) lib/action_dispatch/middleware/remote_ip.rb:81:in `call'
> actionpack (6.0.4.6) lib/action_dispatch/middleware/request_id.rb:27:in `call'
> rack (2.2.3) lib/rack/method_override.rb:24:in `call'
> rack (2.2.3) lib/rack/runtime.rb:22:in `call'
> activesupport (6.0.4.6) lib/active_support/cache/strategy/local_cache_middleware.rb:29:in `call'
> actionpack (6.0.4.6) lib/action_dispatch/middleware/executor.rb:14:in `call'
> actionpack (6.0.4.6) lib/action_dispatch/middleware/static.rb:126:in `call'
> rack (2.2.3) lib/rack/sendfile.rb:110:in `call'
> actionpack (6.0.4.6) lib/action_dispatch/middleware/host_authorization.rb:103:in `call'
> webpacker (4.3.0) lib/webpacker/dev_server_proxy.rb:23:in `perform_request'
> rack-proxy (0.7.2) lib/rack/proxy.rb:67:in `call'
> railties (6.0.4.6) lib/rails/engine.rb:527:in `call'
> puma (4.3.11) lib/puma/configuration.rb:228:in `call'
> puma (4.3.11) lib/puma/server.rb:718:in `handle_request'
> puma (4.3.11) lib/puma/server.rb:472:in `process_client'
> puma (4.3.11) lib/puma/server.rb:328:in `block in run'
> puma (4.3.11) lib/puma/thread_pool.rb:134:in `block in spawn_thread'
> Processing by Rambulance::ExceptionsApp#not_found as CSS
>   Rendering vendor/bundle/ruby/3.0.0/gems/rambulance-2.2.0/app/views/errors/internal_server_error.text.erb
>   Rendered vendor/bundle/ruby/3.0.0/gems/rambulance-2.2.0/app/views/errors/internal_server_error.text.erb (Duration: 5.7ms | Allocations: 419)
> Completed 404 Not Found in 16ms (Views: 12.1ms | ActiveRecord: 0.0ms | Allocations: 4672)
    
  - Đầu tiên là `ActionController::RoutingError (No route matches [GET] "/abc.css"):`
      - Dễ hiểu vì route này chưa được định nghĩa, tạo ra ngoại lệ RoutingError. Ngoại lệ này tương ứng với template not_found của Rambulance
  - Tuy nhiên nhòn ở dưới cùng, template được render ra lại là `internal_server_error`
  -> Vậy lý do là gì?
  
  Nhìn vào request dễ nhận thấy, format của request này là `text/css`. Trong khi không tìm thấy template nào cho css dẫn đến một lỗi khác, và lỗi này được gọi ra trong vendor
-> cần làm sao để hiện thị ra đúng lỗi 404

## Giải pháp
Ở đây mình tạo ra một method mới trong ApplicationController có tên `routing_error` để raise lên lỗi của Rambulance như sau

```config/routes.rb
Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  match '*not_found_path', to: 'application#routing_error', via: :all
end
```

```app/controllers/application_controller.rb
class ApplicationController < ActionController::Base
  def routing_error
    raise ActionController::RoutingError, "No route matches"
  end
end
```

Như vậy, với bất kì request nào không khớp với các path được định nghĩa trong route sẽ gọi đến method routing_error
Tuy nhiên đến đây vẫn chưa xong. Các request css vẫn xảy ra lỗi như trên. Vì vậy cần định nghĩa sao cho:
    - Các request json trả về json
    - Các request không phải json sẽ trả về html
Điều này giải quyết bằng cách thêm cài đặt format cho route, và mình sửa như sau:

```config/routes.rb
Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  match '*not_found_path', to: 'application#routing_error', constraints: lambda { |req| req.format = req.format == :json ? :json : :html }, via: :all
end
```

Và kết quả:
![image.png](https://images.viblo.asia/bd4d4f4e-9de5-4b12-bbd5-4ea1e19e34b1.png)

Ngoài ra thì các request như `pdf`, `js`, v.v... cũng có kết quả tương tự

Phương pháp này được áp dụng trong bài toán: Hiển thị trang 404 cho các đường dẫn không tồn lại thay vì trang 500

## Tái bút
Bài viết này được viết bởi một thành viên chưa có nhiều kinh nghiệm về Rails, cũng như chưa tìm hiểu kỹ nên sẽ có những lý giải sai, cách trình bày chưa rõ ràng, và cách giải quyết cũng chưa phải tối ưu. Rất mong các anh chị và các bạn có thể góp ý, đưa ra nhận xét cũng như các cách giải quyết hay hơn để bản thân em/mình có thể học hỏi được thêm. Cảm ơn mọi người đã ghé thăm bài viết!