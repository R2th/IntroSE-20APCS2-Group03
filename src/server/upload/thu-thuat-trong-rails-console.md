Là một Rails developer, đã bao giờ bạn dành nhiều thời gian cho việc tìm hiểu về rails console chưa. Rails console được ví như một "cửa sau" trong ứng dụng của bạn, nó cho phép bạn làm việc với các phần của ứng dụng từ giao diện dòng lệnh mà không cần thông qua trình duyệt. Để tận dụng tối đa việc sử dụng rails console, ở bài viết lần này mình xin chia sẻ một vài mẹo nhỏ khi làm việc với rails console.

# Làm sạch màn hình rails console
Nếu bạn sử dụng Mac sử dụng `Command + K`,  hoặc là bạn cũng có thể sử dụng `Ctrl + L` để xóa màn hình console trên cả Mac và Linux. Nếu bạn dùng Window thì gõ lệnh `system('cls')`

# Reload Console
Console chạy trong môi trường phát triển theo mặc định, nhưng nó không tự động tải lại code cho chúng ta. Khi một tập tin được tải nó được lưu trong bộ nhớ cache trong suốt thời gian của một phiên làm việc với console. Để làm mới lại code thoát khỏi console và lại chạy lại lệnh, như thế sẽ rất mất thời gian. Ở đây chúng ta chỉ cần sử dụng
```
>> reload!
Reloading...
=> true
```
Như vậy là xong, `reload!` sẽ cập nhật code mới nhất của bạn

# Tìm lại lịch sử câu lệnh
Khi bạn đã chạy một dòng code trong phiên giao diện điều khiển, bạn thường muốn chạy lại cùng một mã sau đó hoặc chỉnh sửa nó để làm một cái gì đó hơi khác. Bạn đã có một vài lựa chọn để gọi lại các lệnh. 
<br>
<br>
Bạn có thể sử dụng phím lên xuống ở trên bàn phím để tìm lại câu lệnh cần tìm
<br>
<br>
Có một cách khác đó là sử dụng `Ctrl + R` và sau đó nhập bất kỳ phần nào của lệnh đó. Nó sẽ tìm kiếm ngược trong lịch sử và tự động hoàn thành lệnh đầu tiên khớp với những gì bạn đã nhập. Bạn càng gõ, nó càng thu hẹp tìm kiếm. Khi bạn đã tìm thấy lệnh mà bạn đang tìm kiếm, hãy nhấn Enter để chạy nó. Hoặc nhấn bất kỳ phím mũi tên nào để bắt đầu chỉnh sửa lệnh. Hoặc tiếp tục nhấn Ctrl + R để liên tục quay lại các lệnh khớp.

# Autocompleting

Console hỗ trợ cho chúng ta autocomplete. Ví dụ bạn có một model là Movie. Khi sử dụng console, bạn gõ
```
>> Mov<Tab>
```
Kết quả:
```
>> Movie
```

Hoặc nếu bạn muốn sử dụng method where. Bạn chỉ cần gõ .w và Tab
```
>> Movie.w<Tab>
```
Sẽ có một trường hợp xảy ra đó là sẽ có nhiều hơn một kết quả được tìm thấy, bạn hãy ấn tab thêm một lần nữa
```
>> Movie.w<Tab><Tab>

Movie.where                 Movie.with_scope
Movie.with_exclusive_scope  Movie.with_warnings
Movie.with_options
```

bây giờ muốn sử dụng method where
```
>> Movie.wh<Tab>
```
ok vậy là ra kết quả cần tìm
```
>> Movie.where
```

# Lấy câu lệnh mới nhất và gán vào một biến
Ví dụ:
```ruby
>> User.find_by id: 1
=> #<User id: 1, email: "quangphunguyen@gmail.com", username: "Quang Phu", phone: nil, address: nil, is_admin: true, created_at: "2019-06-03 15:29:27", updated_at: "2019-06-03 15:29:27", provider: nil, uid: nil>
```
khi muốn gán vào câu lệnh trên vào 1 biến chỉ cần viết
`user = _`
kết quả:
```ruby
=> #<User id: 1, email: "quangphunguyen@gmail.com", username: "Quang Phu", phone: nil, address: nil, is_admin: true, created_at: "2019-06-03 15:29:27", updated_at: "2019-06-03 15:29:27", provider: nil, uid: nil>
```

# Sử dụng view helper
Trong rails console có hỗ trợ một biến là `helper` 
```ruby
>> helper.pluralize(3, 'mouse')
=> "3 mice"

>> helper.number_to_currency(1.50)
=> "$1.50"

>> helper.truncate("Iron Man", length: 7)
=> "Iron..."
```

# Sử dụng route helpers
Giống như sử dụng view helper thì route helpers có hỗ trợ một đối tượng `app`. Ví dụ

```ruby
>> app.movies_path
=> "/movies"

>> app.movie_path(Movie.first)
=> "/movies/1"
```

Vậy kết hợp cả `helper` và `app` sẽ ra gì nhỉ?

```ruby
>> helper.link_to("Movies", app.movies_path)
=> "<a href=\"/movies\">Movies</a>"

>> movie = Movie.first
>> helper.link_to(movie.title, app.movie_path(movie))
=> "<a href=\"/movies/1\">Iron Man</a>"
```

# Để mặc định đối tượng  sử dụng
 Giả sử bạn làm việc với một đối tượng Movie và gọi các phương thức trên nó:
```ruby
 >> movie = Movie.first

>> movie.title
=> "Iron Man"
>> movie.rating
=> "PG-13"
>> movie.director
=> "Jon Favreau"
```

Nếu bạn dự định dành vài phút chỉ để loay hoay với đối tượng đó, sẽ rất tuyệt nếu tránh gõ `movie.` mỗi khi bạn muốn sử dụng cho đối tượng đó. Để làm điều đó, bạn có thể đặt phim làm đối tượng mặc định như vậy:
```ruby
>> irb movie
```
Giờ đây câu lệnh của bạn sẽ ngắn đi kha khá
```ruby
>> title
=> "Iron Man"
>> rating
=> "PG-13"
>> director
=> "Jon Favreau"
```

# Sandbox
Trong một phiên làm việc với console, bạn không muốn những câu lệnh sql của mình ảnh hưởng và thay đổi vào database cách đơn giản bạn có thể làm đó là:

```ruby
$ rails console --sandbox
Loading development environment in sandbox
Any modifications you make will be rolled back on exit
>>
```
Như vậy mọi thay đổi của bạn sẽ bị rollback lại khi kết thúc phiên làm việc. Ví dụ:

```ruby
>> User.destroy(1)

>> User.find(1)
ActiveRecord::RecordNotFound: Could not find User with id=1

>> exit
   (12.3ms)  ROLLBACK
```

Nếu bạn vẫn chưa tin thì hãy thử lại
```
$ rails console
>> User.find(1)
>> #<User id: 1, ...>
```

Mọi dữ liệu vẫn y nguyên ban đầu.

# Chuyển môi trường sử dụng
Mặc định console sử dụng môi trường development 

```ruby
$ rails console
Loading development environment
>>
```

Bây giờ nếu bạn muốn chuyển sang môi trường `test` thì sao.

```ruby
$ rails console -e test
Loading test environment
>>
```

Với môi trường `production`

```
$ rails console -e production
Loading production environment
>>
```

### Tài liêu tham khảo
https://pragmaticstudio.com/tutorials/rails-console-shortcuts-tips-tricks