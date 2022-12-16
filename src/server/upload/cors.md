Bài viết này mình sẽ đề cập đến CORS, một cơ chế giúp chúng ta có thể gửi request cross domain.


# Security policy
- Khi ta sử dụng browser để truy cập một website thì nếu server của website đó không cấu hình thêm gì thì mặc định ta chỉ lấy được tài nguyên từ trên server đó, cơ chế này được gọi là **same-origin** policy. 
Same-origin policy sinh ra để quy định nội dung của một Website chỉ được đọc và thay đổi bởi một thành phần khác cùng site đó, nếu truy cập nằm ngoài phạm vi sẽ bị chặn. Giả sử User truy cập một Website độc hại, script của website đó có thể truy cập được dữ liệu từ các website mà User đã hoặc đang truy cập và có thể thực hiện được các tính năng của các Website đó như chuyển tiền, đọc tin nhắn ...

- Hiện nay thì same-origin policy là policy bắt buộc trên tất cả các trình duyệt hiện đại. Tuy nhiên thì vẫn có những trường hợp tự cấu hình để có thể bypass.

- Tuy policy này tăng cường tính bảo mật của website nhưng có thể gây khó khăn cho lập trình viên. Gỉa sử một website A của chúng ta cần gửi request để xác thực trên website B bằng script thì nếu theo same-origin policy thì request đó sẽ bị chặn lại.


Điều này dẫn đến sự ra đời của CORS

# Cross origin là gì 
Cross origin resources sharing là một cơ chế sử dụng HTTP headers để tương tác với browser, cho phép một webApplication chạy từ một domain A có quyền truy cập vào các tài nguyên của domain B(different origin).

Một request tới một tài nguyên nằm ngoài phạm vi của Website đó được gọi là **Cross origin request ** .

CORS yêu cầu server phải implement và grant access resources cho các domain và các tài nguyên cụ thể tương ứng với domain đó. Nếu truy cập nằm ngoài các phạm vi được server quy định thì request đó sẽ bị chặn.

# Tại sao CORS lại cần thiết

Như đã đề cập ở trên thì CORS cho phép ta có thể grant access cho các request từ các site khác nhau truy cập cập các tài nguyên khác nhau của server.

Hiện nay thì hầu hết các Website đều sử dụng cơ chế này.

Một ví dụ điển hình của nó là các Single page application, server cần implement access cho các front end để frontend được quyền truy cập API từ server.

# CORS được hoạt động như thế nào ?
CORS có 2 khái niệm

Simple request: Là các request không trigger CORS preflight. Mình không đi sâu vào đây, các bạn có thể đọc thêm tại https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

Preflighted request: 
- Là các request trigger CORS preflight. "preflight" đầu tiên sẽ gửi một request OPTIONS tới server ta đang cần gọi. Server sẽ gửi response tương ứng lại với request này.
- Response được trả về sẽ có dạng như sau


```
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Content-Type: text/html; charset=utf-8
```

Access-Control-Allow-Origin quy định các tất cả các valid CORS response. Giá trị có thể là domain được phép truy cập hoặc '*' tương ứng với tất cả các domain đều được truy cập.

Access-Control-Allow-Credentials: true quy định có include cookies, nếu không sử dụng cookie thì bạn nên bỏ qua nó.
- Sau đó Browser sẽ tiếp tục gửi request chúng ta vừa thực hiện


# Cấu hình CORS trên ruby on rails

Trên Ruby on rails các bạn có thể sử dụng gem rack-cors để cấu hình CORS

Cấu hình CORS khá đơn giản các bạn chỉ cần thêm vào application.rb như sau

```
module YourApp
  class Application < Rails::Application
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '*', headers: :any, methods: [:get, :post, :options]
      end
    end
  end
end
```

Ở trên thì mình cho phép
- request từ tất cả các origin domain đều có thể truy cập tài nguyên
- Resource được truy cập là tất cả, với các methods get, post, options.

Đây là một ví dụ khi các bạn gửi trên Browser sau khi config CORS
![](https://images.viblo.asia/a4eebd19-2c41-4cf1-8471-8b80081fd800.png)
![](https://images.viblo.asia/2548a9eb-ae5e-4305-bae1-00e2fbc2abc7.png)

Nếu không config CORS thì các bạn sẽ gặp errors như sau 
![](https://images.viblo.asia/49235f77-b745-47c1-87c6-7fd0f0770d45.png)