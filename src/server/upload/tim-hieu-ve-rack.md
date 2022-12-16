Bạn có muốn biết điều gì xảy ra đằng sau 1 ứng dụng như là Rails, Sinatra, hay là bất cứ 1 frameworks Ruby nào đó? Dưới đây chúng ta sẽ tìm hiểu về điều đó. 
`Rack` là một thành phần quan trọng, nó giúp cho một ứng dụng có thể chạy được. Vậy `Rack` ở đây chính xác là gì? Cùng xem ảnh dưới đây.

![](https://i2.wp.com/www.rubyguides.com/wp-content/uploads/2018/09/rack-stack-1.png)

Nhìn vào trên ta có thể thấy được rằng `Rack` là một tầng nằm giữa framework và application server (`Thin, Puma, Unicorn, ....`), nó là sự gắng kết giúp cho framework và application server có thể giao tiếp với nhau.

Vậy taị sao chúng ta lại phải sử dụng Rack? Rack Middleware là gì? Làm sao để viết Rack Middleware hay 1 ứng dụng Rack? Chúng ta cùng tìm hiểu dứoi đây.

#### Tại sao phải sử dụng Rack?
Chúng ta sử dụng Rack vì nó cho phép các frameworks khác nhau và servers có thể hoán đổi cho nhau. Chúng trở thành các components mà bạn có thể plug-in, điều này có nghĩa là bạn có thể sử dụng Puma với Rails, Sinatra hoặc bất kì frameworks nào khác.
Khi sử dụng Rack thì việc sử dụng frameworks hay server nào cũng không còn quan trọng nữa. Với Rack mỗi component thực hiện công việc riêng của mình không có sự ảnh hưởng hay ràng buộc nào với nhau.

#### Rack Middleware là gì?
Bởi vì Rack nằm ở giữa mọi single request và response mà ứng dụng của bạn tạo ra, đó là một vị trí tuyệt vời để có thể thay đổi hoặc respond theo một cách nào đó những requests đã tạo ra.
Chính vì thế mà người ta gọi đó là Rack Middleware.
Để hiểu hơn về Rack chúng ta cùng tìm hiểu xem làm sao để xây dựng được 1 ứng dụng Rack.

#### Làm sao để viết một ứng dụng Rack
Cách nhanh nhất để tìm hiểu được Rack hoạt động như thế nào chính là tự mình viết ứng dụng Rack. Và chúng ta sẽ cùng tìm hiểu nó dưới đây.
Một ứng dụng Rack chính là 1 class với 1 method `:call`
```ruby
2.5.1 :001 >  require 'rack'
 => true 
2.5.1 :003 > handler = Rack::Handler::Thin
 => Rack::Handler::Thin 
2.5.1 :004 > class RackApp
2.5.1 :005?>     def call(env)
2.5.1 :006?>         [200, {"Content-Type" => "text/plain"}, "Hello world from Rack"]
2.5.1 :007?>       end
2.5.1 :008?>   end
 => :call 
2.5.1 :009 > handler.run RackApp.new
Thin web server (v1.7.2 codename Bachmanity)
Maximum connections set to 1024
Listening on localhost:8080, CTRL+C to stop
```
Đoạn mã trên sẽ khởi động một server với cổng 8080 khi đó chúng ta truy cập vào http://localhost:8080 sẽ thấy được như hình ảnh dưới.

![](https://images.viblo.asia/c32ececd-2889-43b1-a121-22bcca1cb926.png)

Array được trả về khi gọi đến RackApp trên kia nhìn rất quen thuộc đúng không, chúng chính là:
-  HTTP status code (200)
-  HTTP headers (“Content-Type”)
- Và nội dung trả về (“Hello world from Rack”)

Nếu bạn muốn truy cập vào request detail, bạn có thể sử dụng `env` argument.
```ruby
req = Rack::Request.new(env)

```
Một số phương thức hữu dụng có sẵn như:
- path_info (/blogs)
- ip (ip của ngừoi dùng)
- user_agent (Chrome, Firefox, Safari…)
- request_method (get / post / put / ...)
- body (contents)
- media_type (plain, json, html)

Bạn có thể sử dụng những thông tin này để xây dựng cho ứng dụng của bạn.
Ví dụ, chúng ta có thể deny access của một IP nào đó như là `1.1.1.1` (hoặc có thể test ngay chính localhost của chúng ta - `127.0.0.1`)
```ruby
2.5.1 :041 > handler = Rack::Handler::Thin
 => Rack::Handler::Thin 
2.5.1 :042 > class RackApp
2.5.1 :043?>     def call(env)
2.5.1 :044?>         req = Rack::Request.new(env)
2.5.1 :045?>         if req.ip == "127.0.0.1" || req.ip == "::1"
2.5.1 :046?>             [403, {}, "You need permission"]
2.5.1 :047?>           else
2.5.1 :048?>             [200, {"Content-Type" => "text/plain"}, "Hello world from Rack"]
2.5.1 :049?>           end
2.5.1 :050?>       end
2.5.1 :051?>   end
 => :call 
2.5.1 :052 > handler.run RackApp.new
Thin web server (v1.7.2 codename Bachmanity)
Maximum connections set to 1024
Listening on localhost:8080, CTRL+C to stop
```
Và khi chúng ta truy cập vào web sẽ thấy được kết quả như dưới

![](https://images.viblo.asia/5f0eb75a-4ea5-40a1-af42-f16867af7b6b.png)
 
 Trên đây, bạn đã hiểu được cách hoạt động và tạo ra một ứng dụng Rack, giờ chúng ta sẽ cùng tìm hiểu làm sao để viết và sử dụng một Rack Middleware
 
 #### Làm sao để viết và sử dụng một Rack Middleware
 Bây giờ khi đã có application và middleware thì làm sao để bạn có thể kết hợp để sử dụng chúng cùng nhau? `Rack::Builder` sẽ giúp chúng ta làm việc đó.
 
 Ví dụ chúng ta cùng cải thiện đoạn code bên trên bằng việc tách việc filter ip address truy cập vào ứng dụng bằng 1 middleware chúng ta tách ra.
 
 ```ruby
 require 'rack'
handler = Rack::Handler::Thin
class RackApp
  def call(env)
    req = Rack::Request.new(env)
    [200, {"Content-Type" => "text/plain"}, "Request from - #{req.ip}"]
  end
end

class FilterIpAddress
  def initialize(app)
    @app = app
  end
  def call(env)
    req = Rack::Request.new(env)
    if req.ip == "127.0.0.1" || req.ip == "::1"
      [403, {}, "You need permission"]
    else
      @app.call(env)
    end
  end
end

app =
Rack::Builder.new do |builder|
  builder.use FilterIpAddress
  builder.run RackApp.new
end
handler.run app
 ```
 Cùng truy cập vào http://locahost:8080 và dĩ nhiên chúng ta cũng thấy được kết quả như trên
 
 ![](https://images.viblo.asia/5f0eb75a-4ea5-40a1-af42-f16867af7b6b.png)
 
 Và giờ chúng ta có thể test bằng cách thay điạ chỉ IP bằng 1 địa chỉ khác để thấy được request sẽ trả về kết quả như thế nào.
 
 ```ruby
 class FilterIpAddress
  def initialize(app)
    @app = app
  end
  def call(env)
    req = Rack::Request.new(env)
    if req.ip == "1.1.1.1"
      [403, {}, "You need permission"]
    else
      @app.call(env)
    end
  end
end
 ```
 
 Và kết quả sẽ trả về:
 
 ![](https://images.viblo.asia/ec473bef-2092-49f0-94e2-04ec94027421.png)
 
 Ở ví dụ trên thì chúng ta có 2 Rack app, 1 là ứng dụng chính chúng ta chạy app `RackApp` trả về content cho request và 1 chúng ta xem nó như là 1 middleware sử dụng cho việc check IP.
 
 Bằng cách sử dụng `Rack::Builder` chúng ta có thể sắp xếp thứ tự chúng nên chạy. Ví dụ: Ta sẽ viết thêm 1 middleware upcase content trả về và sắp xếp thứ tự chạy của chúng để xem kết quả trả về.
 ```ruby
 class UpcaseAll
  def initialize(app)
    @app = app
  end
  def call(env)
    status, headers, response = @app.call(env)
    response.upcase!
    [status, headers, response]
  end
end
 ```
 - Thứ nhất ta sẽ để chúng sau FilterIp (filter IP localhost)

```ruby
app =
Rack::Builder.new do |builder|
  builder.use FilterIpAddress
  builder.use UpcaseAll
  builder.run RackApp.new
end
handler.run app
```
 => Khi chạy ứng dụng thì FilterIP sẽ được chạy trước => response sẽ được trả về từ FilterIpAddress => nó sẽ không được chạy tiếp UpcaseAll => nên kết quả trả về vẫn bình thường. Khi request thành công (ví dụ bỏ filter localhost filter 1 ip nào đó) => khi đó request pass qua `FilterIpAddress` và tiếp tục chạy đến `UpcaseAll` Khi đó kêt quả trả về response đã đc Upcase lên.
 
 ![](https://images.viblo.asia/5994e8d0-3203-4438-af5c-2793f20dbad2.png)
 - Bây giờ chúng ta sẽ thay đổi thứ tự chạy middleware để `UpcaseAll` lên trước `FilterIpAddress` Khi đó mọi kết quả trả về đều được Upcase vì nó đã đc chạy đầu tiên.

```ruby
app =
Rack::Builder.new do |builder|
  builder.use UpcaseAll
  builder.use FilterIpAddress
  builder.run RackApp.new
end
handler.run app
```

![](https://images.viblo.asia/c5111926-3c4c-46a2-9fcc-1550e24ca84d.png)

Ở trên bạn đã tìm hiểu được thế nào là Rack và sự tương tác giữa các Ruby framework và server, cũng như học được cách viết ứng dụng Rack và hoạt động của nó. Ở bài viết trước mình cũng có giới thiệu về [Rack::Attack](https://viblo.asia/p/giam-thieu-che-do-ddos-su-dung-rackattack-63vKjajV52R) Sau khi hiểu được rack bạn có thể đọc lại và thấy được chúng thực sự hoạt động như thế nào.

> Reference: https://www.rubyguides.com/2018/09/rack-middleware/