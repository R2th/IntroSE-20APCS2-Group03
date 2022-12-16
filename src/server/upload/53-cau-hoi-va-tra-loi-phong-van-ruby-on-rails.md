(Các câu hỏi bạn có thể được hỏi trong cuộc phỏng vấn Ruby on Rails với vai trò Junior/Middle Developer)

![](https://images.viblo.asia/0fde02c3-8b92-4ea4-969f-d3d09ee04e64.png)

Như thường lệ, cứ giữa tháng mình lại lượn lờ trên Medium để làm cái việc ai cũng biết là làm gì rồi đấy :D Mình tìm được bài này thấy có vẻ khá hữu ích nên quyết định dịch để tự lưu lại kiến thức, cũng là chia sẻ cho mọi người phòng thân. Biết đâu một ngày đẹp trời bạn muốn nhảy việc, hoặc một ngày mây âm u bạn lại đi phỏng vấn các ứng viên của công ty mình. Dù sao "kiến thức là vô tận, biết thêm tí nào là tốt tí ấy, ngấm vào thân chứ có đi đâu mà sợ", đấy là mẹ mình hay bảo thế, nên mình cứ mạnh dạn dịch, hi vọng có ai đó đã đọc đến đây sẽ mạnh dạn đọc tiếp!! :relieved:

Phía trên là mở bài của mình, còn đây mới là mở bài của tác giả, mình sẽ tóm tắt thôi: Tác giả đã từng đi phỏng vấn hoặc được phỏng vấn rất nhiều cho vị trí  Ruby on Rails Developer và hi vọng kinh nghiệm của mình sẽ hữu ích cho những ai sắp tham gia một buổi phỏng vấn. Dưới đây là những câu hỏi mà tác giả đã nhận được hoặc đưa ra cho ứng viên của mình, các câu hỏi sẽ không sắp xếp theo thứ tự nào cả.



#### 1. Rails hoạt động như thế nào sau khi có một request yêu cầu truy cập danh sách các bài viết trong ứng dụng viết blog?

Khi người dùng click vào button tạo ra một GET request đến URL `/articles`, web server nhận được request này. Sau đó Rails sẽ thực thi controller action tương ứng là `index`dựa trên URL/controlller được ánh xạ từ file `routes.rb`. Controller gọi `Article.all` để lấy các bản ghi `articles` trong database thông qua model `Artical`.  Danh sách các bài viết này sẽ được gán vào một biến instance và biến này được gọi ra trên form để hiển thị danh sách các bài viết cho người dùng.

#### 2. Tại sao nó "Hầu hết mọi thứ trong Ruby đều là đối tượng (object)?"
Trong lập trình hướng đối tượng, một đối tượng là một thể hiện của một lớp. Trong Ruby, tất cả các lớp là các thể hiện của Lớp Class.
Ví dụ:
```ruby
7.class => Fixnum
7.class.class => Class
```

Một vài thứ không phải là đối tượng như `block` (khối), `method` (phương thức) và `conditional statements` (câu lệnh điều kiện `if`, `else`...).
Câu hỏi này được đặt ra để xem liệu bạn có hiểu hầu hết mọi thứ trong Ruby đều hoạt động tương tự nhau, điều này giúp Ruby dễ tiếp thu hơn các ngôn ngữ khác.

#### 3. Ruby là ngôn ngữ lập trình có kiểu tĩnh hay động?
Ruby là ngôn ngữ động. Đây là lý do tại sao bạn có thể thay đổi loại biến khi thực thi code.
Trong Ruby, các dòng mã dứoiư đây chạy từng dòng một mà không gây ra lỗi.

```ruby
x = 1
x = "foo"
```

Nếu bạn chưa hiểu ngôn ngữ lập trình kiểu tĩnh và động là như thế nào thì theo [Wikipedia](https://vi.wikipedia.org/wiki/Ng%C3%B4n_ng%E1%BB%AF_l%E1%BA%ADp_tr%C3%ACnh):
>  - Ngôn ngữ có kiểu tĩnh là ngôn ngữ xác định trước kiểu cho tất cả dữ liệu được khai báo trong mã nguồn tại thời điểm dịch. Các giá trị của biến chỉ có thể ở một/một số kiểu cụ thể nào đó và ta chỉ có thể thực hiện một số thao tác nhất định trên chúng.
>  - Các ngôn ngữ có kiểu động là ngôn ngữ mà các kiểu chỉ được gán lên các dữ liệu trong thời gian chương trình được thực thi. Điều này có mặt lợi là người lập trình không cần phải xác định kiểu đữ liệu nào hết, đồng thời có thêm lợi thế là có thể gán nhiều hơn một kiểu dữ liệu lên các biến.
  
#### 4. Bạn biết gì về getter và setter trong Ruby?
Một getter cho phép truy cập một biến instance. Một setter cho phép thiết lập một biến instance. Chúng ta có thể tự định nghĩa các phương thức setter và getter như dưới đây:
```ruby
class Car
  def color
    @color
  end
  def color=(color)
    @color = color
  end
end
c = Car.new
c.color = 'red'
puts c.color # => red
```
 
 Tuy nhiên, Ruby cung cấp ba phương thức accessor để thực hiện get và set một các nhanh gọn: `attr_reader` (getter), `attr_writer` (setter) và `attr_accessor` (setter và getter).
 
 ```ruby
class Car
  attr_accessor :color
end
c = Car.new
c.color = 'blue'
puts c.color #=> blue
```

#### 5. Điều gì xảy ra khi bạn gọi một phương thức trong Ruby?
Khi một method được gọi, Ruby sẽ xử lý lần lượt 2 công việc: tìm kiếm và thực thi. Đầu tiên nó sẽ tìm kiếm method bằng cách đi vào class của `object` (đối tượng), sau đó hãy di chuyển từ class đó đến class cha mà nó kế thừa, rồi từ class cha đó lại tiếp tục di chuyển đến class cha tiếp theo, cho đến khi gặp class tổ tiên cuối cùng là Object. Trên đường đi đó, nếu nó tìm được method đang được gọi thì sẽ dừng tìm kiếm và thực thi method đó. Nếu đến class cha cuối cùng vẫn không tìm thấy thì sẽ trả về `method_missing` và kết thúc tìm kiếm.

#### 6. Làm thế nào để lấy ra danh sách các routes của một ứng dụng Rails?
Mở terminal và chạy lệnh:
```
$ rake routes
```
Chúng ta cũng có  thể thêm `| grep <keyword>` vào sau lệnh trên để lọc các routes có chứa `keyword`.

#### 7. Gemfile là gì?
Gemfile là một tệp nằm trong thư mục gốc của dự án, nơi đặc tả các `dependencies` (theo mình hiểu là các gem - thư viện) trong một ứng dụng Ruby.

#### 8. Gemfile.lock là gì?
Gemfile.lock là một tệp nằm trong thư mục gốc của dự án, nó chứa chính xác phiên bản của các gem được cài đặt. Nếu một máy khác clone dự án, nó cũng sẽ được cài đặt các phiên bản gem tương tự.
Ngược lại, Gemfile không cần chỉ định phiên bản cụ thể của gem và sẽ cài đặt phiên bản mới nhất cho gem đó.

#### 9. Kể tên một số design patern (mẫu thiết kế) Rails bạn đã sử dụng
Có một số design patern trong Rails bao gồm các service objects, value objects, form objects, query objects, view objects, policy objects và decorators.
Bạn có thể đi sâu vào phân  tích các design patern đó với các ví dụ [tại đây](https://www.sitepoint.com/7-design-patterns-to-refactor-mvc-components-in-rails/).

#### 10. Rails quản lý trạng thái database như thế nào?
Sau khi các file migration được generate và thêm `intructions` (các chỉnh sửa đối với các thuộc tính của bảng), các `intructions` này hướng dẫn `ActiveRecord` cách để sửa đổi trạng thái cơ sở  dữ liệu hiện có.

#### 11. Sự khác biệt giữa `count`, `length` và `size`?
* **`count`**: Thực hiện một truy vấn SQL để đếm số lượng bản ghi. Method này hữu ích nếu số lượng bản ghi có thể đã thay đổi trong DB so với bộ nhớ.
* **`length`**: Trả về số lượng items trong collection của bộ nhớ. Nó nhanh hơn so với `count` vì không có `database transaction` nào được thực hiện. Nó cũng có thể được sử dụng để đếm các ký tự trong một chuỗi.
* **`size`**: Đây là một `alias` của `length` và được sử dụng tương tự.

#### 12. Bạn đã từng implement chức năng phân quyền như thế nào?

Phân quyền - Authorization (không nhầm lẫn với xác thực - authentication) liên quan đến việc cho phép các kiểu người dùng khác cấp thì có quyền truy cập khác nhau trong một ứng dụng.
Một vài `gems` như `Pundit` và `CanCanCan` có thể dùng để implement chức năng này.

#### 13. Callback là gì?
Callbacks là một phương thức của Active Record, nó sẽ được gọi tới vào một thời điểm nào đó trong vòng đời của một đối tượng. Callback thường được dùng để thực thi các phương thức logic trước hoặc sau khi đối tượng có một sự thay đổi nào đó, ví dụ như create, update, delete,...Chúng thường được sử dụng song song với việc validate dữ liệu để đảm bảo rằng việc vào ra dữ liệu database là hoàn toàn chính xác. Tuy nhiên nếu sử dụng Callback không hợp lí thì sẽ tạo ra một số trường hợp xấu gây ảnh hưởng đến quá trình test và debug.

Callbacks được sử dụng trực tiếp cùng với những phương thức ActiveRecord như là create, save, update, destroy của các bản ghi trong database.

#### 15. Intializers trong Rails là gì?
`Intializers` chứa logic cấu hình và chỉ chạy khi ứng dụng được khởi động. Điều này có nghĩa là máy chủ Rails (Rails server) cần được khởi động lại nếu `Intializers` được thay đổi. Chúng tồn tại trong thư mục` /config /intializers`.

#### 16. Sự khác nhau giữa delete và destroy?
* **`delete`**: Xóa một bản ghi.
* **`destroy`**: Xóa một bản ghi và thực thi callbacks.

Callbacks thường được gọi cho destroy là khi đặc tả quan hệ trong các file model. Ví dụ: Xóa những `comments` liên quan khi một `article` được xóa.

```ruby
class Article < < BaseController
  has_many :comments, dependent: :destroy
end
```

#### 17. Khi nói “Fat models, skinny controllers” nghĩa là đang nói đến điều gì?
Logic nghiệp vụ nên được đặt trong `models`, không phải `controllers`. Điều này giúp dễ dàng để unit test và tái sử dụng logic được hiệu quả hơn.

Controllers chỉ đơn thuần là truyền thông tin giữa `models` và `views`.

Điều này thường được đưa ra như lời khuyên cho các Dev Rails mới. Nó không thực sự được khuyến nghị, đặc biệt là trong các ứng dụng lớn.

#### 18. Khi nói “skinny controllers, skinny models” nghĩa là đang nói đến điều gì?

Khi một codebase phát triển, các model trở nên phình to ra vì xử lý quá nhiều thứ và trở nên không thể quản lý được. Các mô hình không nên quá cồng kềnh với logic.

Các `models` có thể được làm gọn hơn bằng cách giữ nguyên các yếu tố cơ bản và chuyển logic ra khỏi các model, cho vào các mẫu thiết kế khác như các `service objects`.

#### 19. Sự khác biệt giữa các class method và instance methods là gì?

Các `class method` có sẵn trên các lớp và các `instance method` có sẵn trong các `instance` (tất nhiên). Chúng thường được sử dụng cho các mục đích khác nhau.

Đối với một lớp, `Article`, một `instance method` có thể đếm số lượng từ trong phần thân của một  `Article` cụ thể. Trong khi một `class method` có thể đếm số lượng bài viết của một tác giả cụ thể trên tất cả các  `article` (chú ý sự khác biệt về phạm vi).

Các `class method` được ký hiệu là `def self.method_name`.

```ruby
class Greeting
  def self.hello_from_class
    puts 'class: hello'
  end
  def hello_from_instance
    puts 'instance: hello '
  end
end
# class method
Greeting.hello_from_class # => 'class: hello'
# instance method
g = Greeting.new
g.hello_from_instance # => instance: hello
```

#### 20. PORO là gì?
PORO là viết tắt của “Plain Old Ruby Object”.

Mặc dù hầu hết mọi thứ trong Ruby là đối tượng, ActiveRecord cũng có xu hướng sử dụng rất nhiều đối tượng phức tạp. Vì vậy, thuật ngữ PORO thường dùng để nhấn mạnh một đối tượng nhỏ, đơn giản được sử dụng để hỗ trợ logic nghiệp vụ.

#### 21. Ruby có cho phép đa kế thừa không?

Ruby không cho phép kế thừa từ nhiều hơn một lớp cha, nhưng nó có cho phép các mixing các module với `include` và `extend`.

#### 22. Ruby là ngôn ngữ định kiểu mạnh hay yếu?

Ruby là ngôn ngữ định kiểu mạnh. Sẽ có lỗi xảy ra nếu bạn cố gắng thực hiện hello `hello + 3`.

Nhìn vào JavaScript, ta sẽ thấy JavaScript là ngôn ngữ định kiểu yếu, với ví dụ trên nó sẽ cho ra hết quả là `“hello3”`. 

<br>
Bài viết hơi dài nên mình sẽ tách phần còn lại cho bài viết sau nhé!

**Tham khảo:** [Tại đây](https://medium.com/better-programming/53-ruby-on-rails-interview-questions-and-answers-eb99eed1aeb7)