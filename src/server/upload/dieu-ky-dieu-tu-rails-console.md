### 1. Rollback sau khi kết thúc một phiên làm việc (session)
Bạn có thể sử dụng console ở một chế độ gọi là sanbox. Ở chế độ này, mọi thay đổi trong database trong quá trình thực thi ở console sẽ được rollback và trở lại như cũ sau khi kết thúc một session ở console
Để chạy chế độ sanbox: 
> $ rails console --sandbox
### 2. Truy xuất vào giá trị trả về trước đó
Giá trị trả về của một đoạn lệnh có thể được gọi ngay sau đó với ký tự `_`
Ví dụ:
```
[1]>> Game.all.map(&:name)
=> ["zelda", "mario", "gta"]
[2]>> _
=> ["zelda", "mario", "gta"]
[3]>> puts _
zelda
mario
gta
=> nil
[4] _
=> nil
```

Như ví dụ trên, ở [2] và [3], giá trị trả về trước đó vẫn là một mảng ký tự nên khi `puts _` sẽ in ra mảng ký tự đó. Tuy nhiên đoạn lệnh này lại trả về `nil` nên khi gọi ở [4] thì `_` chỉ mang giá trị `nil`

### 3. Tìm kiếm method với grep
Bạn hoàn toàn có thể tìm kiếm tất cả method của một object khi biết một phần của tên method đó. Ví dụ

### 4. Tìm vị trí của một method trong source code

Sử dụng method `source_location` với một object có thể tìm kiếm được vị trí chính xác của method tương ứng với đôi tượng đó, đồng thời, nó còn xác định cụ thể method đó được define ở dòng nào. Điều này cực kỳ có lợi khi bạn muốn tìm một method từ thư viện bên thứ 3 và muốn tìm vị trí của method đó để custome lại theo ý muốn
Ví dụ:
```
>> 'Luis Vasconcellos'.method(:inquiry).source_location
=> ["/usr/local/bundle/gems/activesupport-5.2.1/lib/active_support/core_ext/string/inquiry.rb", 12]
```

### 5. Trả về source code của một method
Có câu *"Được voi đòi Hai Bà Trưng"*, nếu như đã có thể tìm được vị trí chính xác của method bằng cách trên, thì bạn cũng chẳng cần giữ gìn liêm sỉ mà xin thêm source code của nó nữa đâu đúng không? Vâng, rails console sẽ giúp bạn bằng cách gọi `source` để có thể lấy được source code của một method và view ra như trong IDE bằng gọi `display`

Ví dụ. Mình muốn custom method create của `Devise::RegistrationsController`. Cho là cách tổ chức thư mục của nó khá phức tạp nên mình cũng lười đi kiếm source code của nó để đọc. Ta có thể gọi

`>> Devise::RegistrationsController.new.method(:create).source.display`

Và kết quả
![](https://images.viblo.asia/d70a0e2b-d028-4d2f-a691-dc89e5959d2e.jpg)


### 6. Helper object

Console của rails cũng cấp một object tên là `helper`, và nó có thể truy cập đến bất kỳ helper method nào trong source code, bạn cũng có thể kiểm tra kết quả của những method này
Ví dụ: 
```
>> helper.truncate('Luis Vasconcellos', length: 9)
=> "Luis V..."
```

### 7. App object

Nếu như `helper` object có thể truy cập đến bất kỳ helper method nào, thì app object lại được xem như một instance của ứng dụng. Với object này, nó có thể tương tác với hệ thống như một người dùng. Cụ thể, nó có thể thực thi các http request với các method có sẵn trong console để có thể gửi request đến hệ thống. Đây là một lợi ích cho bạn khi muốn test những  chức năng CRUD trong hệ thống

Ví dụ: Truy cập vào một GET request
```
>> app.get('/')
Started GET "/" for 127.0.0.1 at 2018-08-25 22:46:52 +0000
   (0.5ms)  SELECT "schema_migrations"."version" FROM "schema_migrations" ORDER BY "schema_migrations"."version" ASC
Processing by HomeController#show as HTML
  Rendering home/show.html.erb within layouts/application
  Rendered home/show.html.erb within layouts/application (11417.2ms)
  Rendered shared/_menu.html.erb (3.6ms)
  Rendered shared/header/_autocomplete.html.erb (292.2ms)
  Rendered shared/_header.html.erb (312.9ms)
  Rendered shared/_footer.html.erb (3.7ms)
Completed 200 OK in 11957ms (Views: 11945.5ms | ActiveRecord: 0.0ms)
=> 200
```

Ví dụ: Truy cập vào một POST request

```
>> app.post('/games/zelda/wishlist_placements.js')
Started POST "/games/zelda/wishlist_placements.js" for 127.0.0.1 at 2018-08-25 23:03:21 +0000
Processing by OwnlistPlacementsController#create as JS
  Parameters: {"game_slug"=>"zelda"}
  Game Load (0.6ms)  SELECT  "games".* FROM "games" WHERE "games"."slug" = $1 LIMIT $2  [["slug", "zelda"], ["LIMIT", 1]]
  Rendering wishlist_placements/create.js.erb
  Rendered wishlist_placements/create.js.erb (194.8ms)
Completed 200 OK in 261ms (Views: 252.9ms | ActiveRecord: 0.6ms)
=> 200
```


Bài viết được tham khảo và dịch từ [nguồn](https://medium.com/better-programming/rails-console-magic-tricks-da1fdd657d32)