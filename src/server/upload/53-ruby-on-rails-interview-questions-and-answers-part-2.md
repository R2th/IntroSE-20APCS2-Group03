Bài này là phần tiếp theo series 53 câu hỏi thường được phỏng vấn cho ứng viên Ruby on Rails.

**[Xem phần trước](https://viblo.asia/p/53-cau-hoi-va-tra-loi-phong-van-ruby-on-rails-OeVKBW2rZkW)**

#### 23. Framework nào bạn thường sử dụng cho background job?
* Sidekiq: Sử dụng Redis để xếp hàng các công việc. Redis là kho lưu trữ dữ liệu trong bộ nhớ nên rất nhanh. Sidekiq tăng thêm độ phức tạp cho cấu trúc infra vì cần thêm Redis.
* Sucker Punch: Chạy như một tiến trình Ruby và lưu giữ tất cả các job trong bộ nhớ. Các jobs sẽ bị mất nếu quy trình gặp sự cố. Không được khuyến khích cho các task quan trọng.

#### 24. Làm thế nào để khai báo constructor của một lớp trong Ruby?
Một constructor được định nghĩa thông qua một phương thức khởi tạo và được gọi khi một instance của một lớp được tạo mới. Không bắt buộc phải xác định phương thức này. Nó thường được sử dụng để cung cấp các giá trị thuộc tính trên các biến instance mới.

```ruby
class Thing
  attr_reader :name
  def initialize(name)
    @name = name
  end
end
t = Thing.new('dog')
puts t.name # => 'dog
```
#### 25. Logic nào nên sử dụng helper?
Logic của helper chỉ nên hỗ trợ cho views.

Ví dụ: Định dạng ngày trong một số views khác nhau.

#### 26. ActiveRecord là gì?
ActiveRecord là một ORM (object-relational mapping) ánh xạ model với các bảng cơ sở dữ liệu. Nó đơn giản hóa việc thiết lập một ứng dụng vì chúng ta không còn phải viết SQL trực tiếp để tải, lưu hoặc xóa các đối tượng.
Nó cũng cung cấp một số biện pháp bảo vệ chống lại SQL injection.

#### 27. Khi nào bạn dùng "self" trong Ruby?
* Sử dụng self khi định nghĩa và gọi các phương thức của lớp.
* Trong một lớp, self tham chiếu đến lớp hiện tại, vì vậy nó được cần thiết khi một phương thức lớp gọi một phương thức lớp khác.
* `self.class.method` là bắt buộc khi một biến instance gọi đến một phương thức lớp.

```ruby
class Adder
  def self.call(*num)
    num.inject(:+)
  end
end
# class method being called by class
puts Adder.call(1,2,3) # => 6
```
#### 28. Rack là gì?
Rack là một API nằm giữa máy chủ web và Rails. Nó cho phép cắm và hoán đổi các framework như Rails với Sinatra hoặc các máy chủ web như Unicorn với Puma.

#### 29. MVC là gì?
MVC (Model-View-Controller) là mô hình thiết kế sử dụng trong kỹ thuật phần mềm. Nó chia việc xử lý thông tin thành ba phần.* 

Mô hình quản lý dữ liệu và logic. Chế độ xem hiển thị thông tin. Bộ điều khiển nhận đầu vào và chuẩn bị dữ liệu cho một mô hình hoặc chế độ xem

![](https://images.viblo.asia/891c0b1a-7690-45cb-a29d-ca600fe0104b.png)

#### 30. Block trong Ruby là gì?
Một block là đoạn mã giữa hai dấu ngoặc nhọn, {…} hoặc giữa do và end.

Các block có phạm vi riêng, các biến được xác định bên trong block thì chỉ có giá trị sử trong block đó và không thể truy cập bên ngoài. Nhưng các biến được định nghĩa bên ngoài block có thể được sửa đổi bên trong block. 

```ruby
{|x| puts x} # a block
```

#### 31. Sự khác biệt giữa proc và lambda là gì?
Cả **procs** và **lambdas** đều là các khối được lưu trữ nhưng cú pháp và hành vi hơi khác nhau.

Một **lambda** trả về từ chính nó nhưng một proc trả về từ phương thức bên trong nó.

```ruby
def method_proc
  thing  = Proc.new { return 1}
  thing.call
  return 2
end
def method_lambda
  thing  = lambda { return 1}
  thing.call
  return 2
end
puts method_proc # => 1
puts method_lambda # => 2
```
Lưu ý rằng **method_proc** trả về 1 vì việc gọi proc kết thúc quá trình thực thi trong phương thức.

#### 32. "yield" trong Ruby là gì?

**yield** thực thi code được truyền vào method đó thông qua 1 block. Nó thường được sử dụng trong các tệp layouts trong ứng dụng Rails.

#### 33. content_for dùng để làm gì?
Nó cho phép xác định và hiển thị nội dung trong các views. Điều này rất hữu ích để định nghĩa content ở một chỗ và render nó ở nhiều nơi khác nhau.

#### 34. Sự khác nhau giữa Hash và Json?
**Hash** là một lớp Ruby, một tập hợp các cặp keyvalue, nó cho phép truy cập các value bằng các key.
**JSON** là một chuỗi ở định dạng cụ thể để gửi dữ liệu.

#### 35. Active Job là gì?
Cho phép tạo các background job và sắp xếp chúng trên các back ends như Delayed :: Job hoặc Sidekiq.
Nó thường được sử dụng để thực thi mã mà không cần phải thực thi trong luồng chính của web. Một trường hợp sử dụng phổ biến là gửi email thông báo cho người dùng.

#### 36. Bạn nghĩ gì về Rails?
* Nó rất thú vị. Việc có thể viết code một cách dễ hiểu như `Time.now + 5.days` hoặc `obj.nil?` cũng đủ làm tôi cảm thấy vui vẻ.
* Cộng đồng này rất hữu ích và rất dễ tìm thấy các ví dụ/tài liệu.

#### 37. Điều bạn không thích ở Rails là gì?
Thư viện về machine learning được phát triển kém hoặc không tồn tại.

#### 38. Kể tên một vài Gem mà bạn thích trong Ruby?
Một Gem mà mọi nhà phát triển Rails đều biết, Devise. Nó làm cho việc thiết lập xác thực vốn khá phức tạp trở thành một công việc chỉ kéo dài hai phút.

#### 39. Spring là gì?
Spring là một application preloader. Nó giữ cho ứng dụng chạy ở chế độ nền nên không cần khởi động bất cứ khi nào bạn chạy migration hoặc rake.

#### 40. asset pipeline là gì?
`Asset pipeline` cung cấp một framework cho phép kết nối, nén hay rút gọn các file CSS hay JS trong project. Ngoài ra có thể compile các `assets` trong ngôn ngữ khác (CoffeeScript, Sass, ERB) sang JavaScript và CSS. Các assets của gem trong application cũng sẽ được asset pipeline combine lại.

#### 41. Bạn quản lý xác thực trong Rails như thế nào?
Devise.

#### 42. splat operator là gì?
Splat được sử dụng khi bạn không muốn chỉ định trước số lượng đối số được truyền cho một phương thức. Ruby có hai loại toán tử splat: splat đơn và splat kép.

Ví dụ splat đơn:
```ruby
def do_sth(*input)
  input.each {|x| puts x }
end
do_sth(3,4,5)
# => 3
# => 4
# => 5
```

Splat kép giống như splat đơn nhưng nó nhận các key/value làm đối số.
```ruby
def do_sth(**input)
  input.each {|k,v| puts v }
end
do_sth('a':3, 'b':4, 'c':5)
# => 3
# => 4
# => 5
```

#### 43. Sự khác nhau giữa include và extend là gì?
Cả hai đều là các mixin cho phép chèn mã từ một mô-đun khác.

Nhưng `**include**` cho phép truy cập mã đó thông qua các `class method`, trong khi `**extend**` cho phép truy cập mã đó thông qua các `instance method`.

```ruby
module Greetings
  def hello
    puts 'hello'
  end
end
module Farewells
  def bye
    puts 'bye'
   end
end
class Conversation
  extend Greetings
  include Farewells
end
# class method
Conversation.hello
# => hello
# instance method
c = Conversation.new
c.bye
# => bye
```
#### 44. Sự khác nhau giữa load và require?
* **load** chạy một tệp khác, ngay cả khi nó đã có trong bộ nhớ.
* **request** sẽ chỉ chạy một tệp tin khác một lần, bất kể bạn yêu cầu nó bao nhiêu lần.

#### 45. Khác nhau giữa class và module?
Một class có các thuộc tính và phương thức. Bạn có thể tạo một instance của một class.
Mô-đun chỉ là một tập hợp các phương thức và hằng số mà bạn có thể kết hợp với mô-đun hoặc class khác.

#### 46. Scope là gì?
* Scope là logic truy vấn ActiveRecord mà bạn có thể định nghĩa bên trong một model và gọi ở nơi khác.
* Việc định nghĩa scope có thể hữu ích hơn thay vì phải sao chép cùng một logic ở nhiều nơi trong ứng dụng.

```ruby
# an example scope
class Post
  scope :active_posts, -> { where(active:true) }
end
```

#### 47. Sự khác nhau giữa biến class và biến instance?
Các biến instance được ký hiệu bắt đầu bằng @, là một một thể hiện của một lớp. Việc thay đổi giá trị của một thuộc tính trên một instance không ảnh hưởng đến giá trị thuộc tính của các instance khác.
Các biến class ký hiệu bắt đầu bằng @@, biến class thì nó available trong tất cả các instances của class đó. Có nghĩa là tất cả các object mà được instantiated từ class đó được sử dụng. Vì vậy, việc thay đổi biến trên một instance sẽ ảnh hưởng đến biến đó cho tất cả các instance của lớp.

```ruby
class Coffee
  @@likes = 0
  def like
    @@likes += 1
  end
  def likes
    puts @@likes
  end
end
coffee_one = Coffee.new
coffee_two = Coffee.new
coffee_one.like
coffee_two.like
coffee_one.likes
=> 2
```

**Lưu ý :** biến class có thể được cập nhật bởi bất kỳ instance nào của lớp.

#### 48. Khác nhau giữa find, find_by và where trong ActiveRecord?
* **find:** Lấy một đối số duy nhất và tra cứu bản ghi trong đó primary key khớp với đối số đó.
* **find_by:** Lấy key/value và trả về bản ghi phù hợp đầu tiên.
* **where:** Lấy key/value và trả về một tập hợp các bản ghi phù hợp. Hoặc một collection rỗng nếu không có kết quả phù hợp.

#### 49. Khác nhau giữa collect, map và collect?
Cả ba phương thức trên đều lấy đối số là block.
* select: Được sử dụng để lấy một tập hợp con của một collection. Việc gọi `.select!` sẽ làm thay đổi collection ban đầu.

```ruby
i = [1,2,3,4,5]
i.select {|x| x % 2 == 0}
# => [2, 4]
```
* map: Thực hiện một hành động trên từng phần tử của một tập hợp và xuất ra một tập hợp được cập nhật. Việc gọi `.map!` sẽ làm thay đổi collection ban đầu.

```ruby
i = [1,2,3,4,5]
i.map {|x| x+1}
# => [2,3,4,5,6]
```
* collect: là một alias của `.map` và hoạt động tương tự.

#### 50. CRUD verbs và các action trong Rails?

```ruby
verb      | action
---------------
GET       | index
GET       | new
POST      | create
GET       | show
GET       | edit
PATCH/PUT | update
DELETE    | destroy
```

#### 51. Định nghĩa một route cho một hành động create mà không sử dụng "resources"
* Với resources: `resources :photos`.
* Không có resources: `post ‘/photos’, to: ‘photos#create’, as: :create_photo`.

#### 52. Ba levels của access control là gì?
* `public:` Bất kỳ đối tượng nào cũng có thể gọi phương thức này.
* `protected:` Chỉ lớp đã định nghĩa phương thức và các lớp con của nó mới có thể gọi phương thức.
* `private:` Chỉ bản thân đối tượng mới có thể gọi phương thức này.

#### 53. Bạn sử dụng các singleton trong Ruby như thế nào?
Singleton là một mẫu thiết kế chỉ cho phép một lớp có một thể hiện. Điều này thường được nhắc đến trong Ruby, nhưng Ruby đi kèm với một mô-đun cho nó.

```ruby
require 'singleton'
class Thing
  include Singleton
end
puts Thing.instance
# => #<Thing:0x00007fdd492cf488>
```

Như vậy đã cùng xem qua 53 câu hỏi rồi, mình hi vọng danh sách này hữu ích với bạn!!

**Tham khảo:** [Tại đây](https://medium.com/better-programming/53-ruby-on-rails-interview-questions-and-answers-eb99eed1aeb7)