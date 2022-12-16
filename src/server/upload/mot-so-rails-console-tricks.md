## Lời nói đầu:

Rails console là một công cụ không hề xa lạ với chúng ta, và cực kỳ hữu ích trong bất kỳ giai đoạn nào của dự án.

Nhưng rails vốn rất ma thuật, có ti tỉ thứ tính năng có sẵn mà ta không hề biết tới.

![](https://images.viblo.asia/f9d8110d-89a8-4845-96a3-728f88b405e7.gif)

Bài viết dưới đây liệt kê ra một số tricks hữu dụng, để chúng ta có thể sử dụng console hiệu quả hơn. 

**Vậy nên, nếu bạn có trick nào hay ho, hãy comment thêm ở bên dưới nhé.** :flushed:

### 1. Tự động Rollback dữ liệu khi tắt console:

Rails console có 1 mode được gọi là `sandbox`.
Ở chế độ đó, tất cả các thay đổi liên quan đến Database sẽ được đặt savepoint. 

Vì vậy khi kết thúc session, Database sẽ tự động rollback lại về lúc ban đầu. Cứ thoải mái nghịch ngợm mà không cần cờ lo làm gì. :triumph:

Để bật chế độ `sandbox` ta chỉ cần thêm 1 đoạn `--sandbox` lúc khởi động là xong:

```
rails console --sandbox
```

### 2.Lấy lại kết quả execute trước đó:

Bạn đã bao giờ phải truy xuất một đống dữ liệu bằng multiline trong console chưa?

Và sau khi gõ xong bạn mới nhận ra: "Bỏ mợ, quên mất chưa assign variable cho nó rồi". Thế là lại phải gõ thêm lần nữa. (sad)

Nhưng thực ra trong rails console, kết quả của câu lệnh luôn được mặc định gán cho variable là `_`, ta chỉ cần gọi nó ra thôi.

```
> Game.all.map do |game|
>   game.name
> end
=> ["zelda", "mario", "gta"]

> _
=> ["zelda", "mario", "gta"]
```

### 3. Search methods

Trong trường hợp bạn nhớ "mang máng", hình như object này có method "abc..." gì đó thì phải.

Thì hàm `.methods` sẽ output ra toàn bộ các hàm của object này dưới dạng `Array`. Lợi dụng điều đó, ta thêm cái `grep` vào là có thể search được như sau:

```
>> Game.first.methods.grep(/lumn/)
Game Load (0.8ms)  SELECT  "games".* FROM "games" ORDER BY "games"."id" ASC LIMIT $1  [["LIMIT", 1]]
=> [:column_for_attribute, :update_column, :update_columns]
```

### 4. Tìm vị trí mà method được định nghĩa.

`source_location` là method sẽ trả về full path của file mà method đó được định nghĩa.

Khi bạn đang muốn tìm hiểu về gem, hay overwrite lại thì nó rất hữu dụng.

```
>> 'Luis Vasconcellos'.method(:inquiry).source_location
=> ["/usr/local/bundle/gems/activesupport-5.2.1/lib/active_support/core_ext/string/inquiry.rb", 12]
```

Câu lệnh ở trên giúp ta thấy được nơi định nghĩa method, 

nhưng ngoài ra, ta còn có thể đưa trực tiếp đoạn source code đó ra output bằng câu lệnh như sau:

```
>> 'Luis Vasconcellos'.method(:inquiry).source.display
def inquiry
    ActiveSupport::StringInquirer.new(self)
  end
=> nil
```

### 5. Helper object

Khi mở console lên, nó cung cấp sẵn cho ta một object gọi là `helper`. Đặc điểm của object này là nó có thể access trực tiếp tới bất cứ view helper nào trong Rails app. Ví dụ:

```
>> helper.truncate('Luis Vasconcellos', length: 9)
=> "Luis V..."
```

### 6. App object

Console cũng cung cấp cho ta một object khá thú vị là `app` - nó kiểu dạng như một object của toàn ứng dụng của mình ấy.

Cụ thể nó là cái gì thì hơi khó nói, nhưng đại khái nó có thể làm được những điều kỳ diệu sau:

- Access `GET` endpoints:

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

- Access `POST` endpoints:

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

- Search `_path` helper từ `Game` route:

```
>> app.methods.grep(/_path/).grep(/game/)
=> [:search_games_path, :game_ownlist_placements_path, :game_ownlist_placement_path, :game_wishlist_placements_path, :game_wishlist_placement_path, :game_path]
```

- Thử kết hợp các tricks đã giới thiệu bện trên xem:

```
>> app.get(app.root_path)
Started GET "/" for 127.0.0.1 at 2018-08-26 02:27:40 +0000
Processing by HomeController#show as HTML
  Rendering home/show.html.erb within layouts/application
  Rendered home/show.html.erb within layouts/application (12550.2ms)
  Rendered shared/_menu.html.erb (3.8ms)
  Rendered shared/header/_autocomplete.html.erb (1.2ms)
  Rendered shared/_header.html.erb (28.0ms)
  Rendered shared/_footer.html.erb (3.8ms)
Completed 200 OK in 12835ms (Views: 12810.0ms | ActiveRecord: 0.0ms)
=> 200

>> app.body.response
=> "\n<!DOCTYPE html>\n<html>\n  <head>\n    <title> ...

>> app.cookies
=> #<Rack::Test::CookieJar:0x0000556ee95c33e0 @default_host="www.example.com", @cookies=[#<Rack::Test::Cookie:0x0000556eeb72b2d0 @default_host="www.example.com", ...
```

### Nguồn:
- https://medium.com/@lfv89/rails-console-magic-tricks-da1fdd657d32