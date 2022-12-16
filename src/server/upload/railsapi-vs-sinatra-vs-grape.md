Ai cũng biết rằng Rails thống trị trong mảng các Ruby web framework, khi mà framework phổ biến thứ hai là Sinatra cũng chỉ bằng 5% mức độ phổ biến so với Rails. Mặc dù vậy, điều đó không có nghĩa là các non-Rails frameworks như là Sinatra và Grape không có vai trò gì.
Khi nào thì việc bỏ qua ActionController và sử dụng framework khác là hợp lý? Ưu điểm và khuyết điểm của chúng là gì?. Chúng ta sẽ cùng khám phá điều đó trong bài viết này.

# Giới thiệu sơ lược về  Sinatra, Grape, và Rails::API
Trước khi đi vào tìm hiểu, hãy cùng xem qua một chút về timeline của hệ sinh thái Ruby web một vài năm gần đây
![](https://images.viblo.asia/89c53bd4-1c7f-4033-b5b0-85638989d27e.png)

### Sinatra
Sinatra được release lần đầu năm 2007, là non-Rails web framework đầu tiên giành được sự chú ý từ cộng đồng. Bởi sự tập trung vào việc xây dựng một web app nhanh chóng, cần ít công sức nhất có thể so với cách tiếp cận nguyên khối (đầy đủ chức năng cơ bản của một web app) của Rails. Implement một Sinatra app nhỏ có thể chỉ cần duy nhất một file, trái ngược hoàn toàn với Rails app.

### Grape
Grape được release cuối mùa thu năm 2010, Grape là web framework tiếp theo giành được sự chú ý đáng kể. Có thể coi Grape là một Ruby REST-like API framework. Tương tự như việc Rails giúp bạn nhanh chóng xây dựng một MVC app, bạn có thể xây dựng một REST-like API mạnh mẽ với Grape.

### Rails::API
Rails::API được release vào mùa xuân năm 2012. Rails::API chỉ sử dụng một phần nhỏ của Rails stack cho app đủ để generate JSON, bỏ qua các middleware không liên quan tới API app (ví dụ: cookie, flash, và session management). Rails::API bắt đầu là một gem riêng biệt, nhưng trong lần release của Rail 5 mùa hè năm 2016, nó đã được thêm vào default của Rails.

# Vậy nên sử dụng framework nào?
Mỗi framework đều có các ưu điểm và có thể thay thế nhau trong nhiều ngữ cảnh sử dụng. Hãy cũng lướt qua vài câu hỏi để xác dịnh framework nào là phù hợp nhất với ngữ cảnh của bạn.

### Bạn sẽ phát triển thêm cho một Rails app hay bắt đầu từ đầu?
Nếu bạn đang xây dựng một web app đơn giản, bạn có thể nghĩ bạn không cần những "special sauce" mà Rails cung cấp. Tuy nhiên, bạn sẽ nhận ra rằng thậm chí các app đơn giản cũng yêu cầu những điều đó. Ví đụ như nếu bạn chọn Sinatra hoặc Grape để bắt đầu, bạn cần phải tính đến các điều sau:
* Logging - Rails mặc định log tất cả các requests
* Environments - Load các phiên bản cụ thể theo môi trường (production, staging, development,..)
* Reloading - Rails tự động reload sau các thay đổi ở development
Tóm lại, khi bạn không sử dụng Rails, bạn sẽ cần phải quyết định xem mình cần những gì và tự tích hợp và hệ thống. Điều đó tạo ra sự khó khăn khi làm việc với team vì sự không đồng nhất so với việc tuân theo các chuẩn "convention over configuration" của Rails.

Vì những lí do này nên tôi nghĩ nên bắt đầu với Rails::API và lược bỏ dần những thứ không cần thiết khi đã chắc chắn
### App của bạn có thể phát triển đến giai đoạn không chỉ cung cấp JSON?
Sinatra, Grape, and Rails::API đều có thể dễ dàng xuất ra JSON. Tuy nhiên, Nếu nó có thể phát triển tới mức không chỉ trả về các JSON response (ví dụ: render HTML, có thể tương tác thông qua form, cần đến session của người dùng,...) thì lúc đó sử dụng Grape lại là một rào cản vì nó chỉ tập trung chủ yếu vào JSON API.

### Nếu như bạn chọn nhầm framework?
Nhờ có Rack's support cho việc mounting, bạn không phải lo lắng quá khi scope của app thay đổi và microframework bạn chọn không đáp ứng đầy đủ được. Bạn có thể dễ dàng mount Grape và Sinatra trong Rails, hoặc thậm chí là mount Grape cùng với Sinatra, như ví dụ đơn giản sau:
```ruby
# Example config.ru
# dễ dàng sử dụng sinatra kết hợp với grape

require 'sinatra'
require 'grape'

class API < Grape::API
  get :hello do
    { hello: 'world' }
  end
end

class Web < Sinatra::Base
  get '/' do
    'Hello world.'
  end
end

use Rack::Session::Cookie
run Rack::Cascade.new [API, Web]
```


### App của bạn cung cấp api công khai và được sử dụng nhiều

Khi đó bạn cần phải có thêm một số chức năng như Versioning, Documentation cho API, Parameter validation, Authentication,... Giống như Rails có các convention cho Rails app, Grape cũng có các convention cho JSON API app. Khi đã nắm bắt được các convention này, việc mở rộng API app với Grape là điều rất dễ dàng. Dưới đây là một ví dụ đơn giản sử dụng Grape với đầy đủ các chức năng kể trên 
```ruby
module Twitter
  class API < Grape::API
    version 'v1', using: :header, vendor: 'twitter' # versioning phiên bản cho API
    format :json
    prefix :api

    helpers do
      def current_user
        @current_user ||= User.authorize!(env)
      end

      def authenticate!
        error!('401 Unauthorized', 401) unless current_user
      end
    end

    resource :statuses do
      desc 'Return a public timeline.' # Mô tả cho endpoint của api
      get :public_timeline do
        Status.limit(20)
      end

      desc 'Return a personal timeline.'
      get :home_timeline do
        authenticate!
        current_user.statuses.limit(20)
      end

      desc 'Return a status.'
      params do
        requires :id, type: Integer, desc: 'Status id.' # Tạo các ràng buộc cho param truyền lên
      end
      route_param :id do
        get do
          Status.find(params[:id])
        end
      end

      desc 'Create a status.'
      params do
        requires :status, type: String, desc: 'Your status.'
      end
      post do
        authenticate!
        Status.create!({
          user: current_user,
          text: params[:status]
        })
      end

      desc 'Update a status.'
      params do
        requires :id, type: String, desc: 'Status ID.'
        requires :status, type: String, desc: 'Your status.'
      end
      put ':id' do
        authenticate!
        current_user.statuses.find(params[:id]).update({
          user: current_user,
          text: params[:status]
        })
      end

      desc 'Delete a status.'
      params do
        requires :id, type: String, desc: 'Status ID.'
      end
      delete ':id' do
        authenticate!
        current_user.statuses.find(params[:id]).destroy
      end
    end
  end
end
```
Như ta thấy Grape cung cấp các phương thức rất tiện lợi, ngắn gọn cho việc xây dựng API 

### Đánh giá hiệu năng

![alt](http://imageshack.com/a/img924/5652/YXJ7QY.png)
Benchmark trên được thực hiện thời điểm năm 2016 so sánh giữa các active Rack-based frameworks, sử dụng Puma làm application server. Còn dưới đây là benchmark đơn giản so sánh Sinatra với Rails::API cho một "Hello, world!" app đơn giản sử dụng ApacheBenchmark.
```ruby
# Sinatra performance test
# gem install sinatra
require 'sinatra'

class HelloWorldApp < Sinatra::Base
  get '/' do
    "Hello, world!"
  end
end
```
```ruby
# Rails::API performance test
# rails new hello_world_app --api

# routes.rb
Rails.application.routes.draw do
  get "/", to: "hello#test"
end

# hello_controller.rb
class HelloController < ApplicationController
  def test
    render json: {"Hello, world!"}
  end
end
```
Chạy lệnh `ab -c 100 -n 20000 http://localhost:3000/` (thực hiện 100 request đồng thời đến khi đạt 20000 request). Ta có kết quả sau:

![](https://images.viblo.asia/47c65bed-a700-46b6-aaca-041172e393d0.png)
Sinatra thực hiện được 1587 request trên 1 giây.

![](https://images.viblo.asia/c8b122ad-8bf7-4721-b3eb-aefad8122766.png)

Rails::API chỉ thực hiện được 1071 request trên 1 giây, một sự chênh lệch đáng kể!

Ta thấy được rằng Sinatra và Grape có hiệu năng vượt trội hơn so với Rails::API. Tuy nhiên cũng phải lưu ý Rails::API bao gồm một lượng lớn các middleware mà có thể bạn không dùng đến và là cũng là nguyên nhân dẫn đến sự chậm trễ trong hiệu năng. 

# Kết luận
### Điểm không rõ ràng
Sẽ có một vài thứ không cố định ảnh hưởng tới quyết định lựa chọn framework của bạn. Ví dụ như:
* Performance - mặc dù Sinatra và Grape có vẻ tốt hơn Rails::API khá nhiều về hiệu năng, Rails::API có thể bỏ đi các middlewares không sử dụng, nhờ đó có được hiệu năng tương đương Sinatra hay Grape
* Shared logic - nếu một service chia sẻ một vài logic với Rails (database access, ActiveRecord models, ...), bạn sẽ thường xuyên phải xử lý (tích hợp, xây dựng giải pháp thay thế) điều đó.

### Điểm nổi bật
Mỗi framework có một số điểm nổi bật riêng:

* **Rails::API** - Có thể coi như một Rails app đơn giản hơn, nhanh hơn, chuyên dụng cho việc cung cấp JSON API thay vì phải thông qua ActionController.
* **Sinatra** - Thích hợp cho các app đã rõ ràng scope của nó từ đầu, ít phải share logic với app khác và có thể làm thêm một vài thứ hơn là chỉ cung cấp JSON API.
* **Grape** - Khi app của bạn tập trung chủ yếu vào việc phát triển API, Grape là một lựa chọn tốt

# Tham khảo
http://blog.scoutapp.com/articles/2017/02/20/rails-api-vs-sinatra-vs-grape-which-ruby-microframework-is-right-for-you

https://github.com/rails-api/rails-api

https://github.com/ruby-grape/grape

http://sinatrarb.com/