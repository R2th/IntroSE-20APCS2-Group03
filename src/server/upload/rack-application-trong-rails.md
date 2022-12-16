# **I. Rack là gì**

Rack là interface giúp web server và web framework giao tiếp với nhau.

Webserver ở đây có thể là WEBrick, Thin, Unicorn, Puma, và web framework có thể là Rails, Sinatra, …

Khi không có Rack:

![](https://images.viblo.asia/c11facd6-5331-4126-bbee-fd3a68eb960f.png)

Công việc chính của một App server như WEBrick là một phiên dịch viên giữa client requests và web application.

HTTP request từ client gửi tới hay HTTP response trả về cho client thì nó chỉ ở dạng plain text cơ bản.

![](https://images.viblo.asia/a4d03e88-34e3-4b4b-adc8-ce9af8bb019a.png)

Vậy nên App server như WEBrick sẽ chuyển đoạn plain text này thành Hash dễ nhìn.


![](https://images.viblo.asia/504c5de3-f7f3-4dff-bbb4-0ef882d0c709.png)

Website đã giao tiếp được, nhưng WEBrick chỉ dùng single thread. 

Nên chuyển sang Unicorn - yêu cầu trả về dạng Array không phải Hash như trên. 

Đẹp trời chuyển qua dùng Puma lại thay đổi tên method.

Quá mệt mỏi, một web server chỉ chạy được với một web app.
Rack sinh ra để clean vấn đề này.

```
require 'rack'

class App
  def call(request)
   [200, { content_type: "application/json", body: "" }, [""]]
  end
end
```

Rồi thích dùng cái nào thì dùng thoải mái luôn, quá dữ.

```
=>
Rack::Handler::WEBrick.run App.new
Rack::Handler::Unicorn.run App.new
Rack::Handler::Puma.run App.new
```

![](https://images.viblo.asia/b0746fb3-7461-46df-9ce7-318f97ced98e.png)

# **II. Rack middleware**

Middleware là một rack application được tạo bởi những rack application khác.

Rails là một rack application được tạo bởi của nhiều rack middleware.
Trong rails, bạn dùng "rake middleware" để xem rails hôi của middleware nào.

Tưởng gì, dăm ba [cái middleware này](https://guides.rubyonrails.org/rails_on_rack.html#internal-middleware-stack), tự viết xài cho thân thiện.

Tạo file say_goodbye.rb trong folder app/middleware:

```
class SayGoodbye

  def initialize app
    @app = app
  end

  def call env
    status, header, body = @app.call(env)    
        Rails.logger.debug "=" * 50
        Rails.logger.debug "Goodbye my love !!!"
        Rails.logger.debug "=" * 50
    [status, header, body]
  end
End
```

Thêm vào file config/enviroment/development.rb

```
Rails.application.configure do
    .....
    config.middleware.use SayGoodbye
end
```

Thực hiện một request và cái kết.

**Nguồn:**

https://viblo.asia/p/rack-trong-rails-la-gi-GrLZDbQg5k0 

https://ieftimov.com/post/writing-rails-middleware/