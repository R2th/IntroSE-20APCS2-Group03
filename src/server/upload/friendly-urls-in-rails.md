Theo mặc định, các ứng dụng Rails xây dựng URL dựa trên primary key – the `id` column từ cơ sở dữ liệu. Hãy tưởng tượng chúng ta có một model Person và associated controller. Chúng ta có person record là `Bob Martin ` có `id` number `6`. URL cho trang hiển thị của anh ấy sẽ là:
```rails
1   /people/6
```
Nhưng, vì mục đích thẩm mỹ hoặc SEO, chúng ta muốn tên của Bob trong URL. tại vị trí số `6`, được gọi là "slug". Hãy xem xét một vài cách để làm slugs tốt hơn
# 1. Simple Approach
Cách tiếp cận đơn giản nhất là ghi đè `to_param` method trong model `Person`. Bất cứ khi nào chúng ta gọi một route helper như thế này:
```ruby
person_path(@person)
```
Rails sẽ gọi `to_param` để chuyển đổi đối tượng thành một slug cho URL. Nếu mô hình của bạn không xác định `to_param` method thì Rails sẽ sử dụng quá trình thực hiện trong `ActiveRecord::Base` đó, nó sẽ trả về `id`.

Để `to_param` method thành công, điều quan trọng là tất cả các liên kết đều sử dụng `ActiveRecord` object thay vì gọi `id`. Đừng làm điều này :
```ruby
person_path(@person.id) # Bad!
```
Thay vào đó:
```ruby
person_path(@person)
```
## 1.1. Slug Generation with to_param
Trong model, chúng ta có thể ghi đè `to_param` để bao gồm một phiên bản parameterized của Person's name:
```ruby
class Person < ActiveRecord::Base
  def to_param
    [id, name.parameterize].join("-")
  end
end
```
Các parameterize method từ `ActiveSupport` sẽ biến bất kỳ chuỗi thành ký tự hợp lệ cho một URL.

Đối với người dùng của chúng ta `Bob Martin` có `id` là `6`,` to_param` sẽ tạo ra một slug `6-bob_martin`.
Đường dẫn đầy đủ sẽ là:
```
/people/6-bob-martin
```
## 1.2. Object Lookup
Chúng ta cần thay đổi gì để tìm thấy `Person` mà chúng ta cần? Nothing!

Khi chúng ta gọi `Person.find(x)`, tham số `x `được chuyển đổi thành một số nguyên để thực hiện tra cứu SQL. Hãy kiểm tra cách `to_i` xử lý các chuỗi có kết hợp các chữ cái và số:
```ruby
"1".to_i
# => 1
"1-with-words".to_i
# => 1
"1-2345".to_i
# => 1
"6-bob-martin".to_i
# => 6
```
Vì chúng ta triển khai `to_param` luôn có `id` phía trước và theo sau là dấu gạch nối, nên nó sẽ luôn luôn tìm kiếm dựa trên chỉ `id` và loại bỏ phần còn lại của slug.
## 1.3. Benefits / Limitations
Chúng ta đã thêm nội dung vào slug sẽ cải thiện SEO và làm cho URL của chúng ta dễ đọc hơn.

Một hạn chế là người dùng không thể thao tác trực tiếp trên URL. Ví dụ chúng ta có `url 6-bob-martin` nhưng bạn sẽ không thể đoán được url có `id` là `7` ví dụ như `7-russ-olsen`.

Một hạn chế khác là `id` vẫn nằm trong URL. Nếu `id` là thứ bạn muốn làm xáo trộn, việc tạo slug đơn giản bằng cách ghi đè `to_param` không giúp ích được gì.
# 2. Using a Non-ID Field
Đôi khi bạn muốn thoát khỏi `id` và sử dụng một thuộc tính khác trong cơ sở dữ liệu for lookups. Hãy tưởng tượng chúng ta có một `Tag` object có một `name` column..
## 2.1. Link Generation
Chúng ta có thể ghi đè lại `to_param` để tạo liên kết:
```ruby
class Tag < ActiveRecord::Base
  validates_uniqueness_of :name

  def to_param
    name
  end
end
```
Bây giờ khi chúng ta gọi  `tag_path(@tag)` ta sẽ nhận được một path như thế này `/tags/ruby`.
## 2.2. Object Lookup
Việc tìm kiếm là khó khăn hơn, mặc dù. Khi có một request đến cho /`tags/ruby` các `ruby` sẽ được lưu trữ trong `params[:id]` của router.
Một controller điển hình sẽ gọi T`ag.find(params[:id])`, về cơ bản `Tag.find("ruby")` sẽ thất bại.
### Option 1: Query Name from Controller
Thay vào đó, chúng ta có thể sửa đổi controller để sử dụng `Tag.find_by_name(params[:id])`. Nó sẽ làm việc , nhưng nó là thiết kế bad object-oriented. Chúng ta đang phá vỡ sự đóng gói của `Tag` class.

Các nguyên tắc DRY nói rằng một mảnh kiến thức nên có một đại diện duy nhất trong một hệ thống. Trong quá trình triển khai thẻ này, ý tưởng "Thẻ có thể được tìm thấy theo tên của nó" hiện đã được thể hiện trong `to_param` của model và tra cứu controller. Đó là một vấn đề về bảo trì lớn.
### Option 2: Custom Finder
Trong model của chúng ta, ta có thể xác định một công cụ tìm tùy chỉnh:
```ruby
class Tag < ActiveRecord::Base
  validates_uniqueness_of :name

  def to_param
    name
  end

  def self.find_by_param(input)
    find_by_name(input)
  end
end
```
Sau đó trong controller gọi `Tag.find_by_param(params[:id])`. Lớp trừu tượng này có nghĩa là chỉ có model biết chính xác cách một `Tag` được chuyển đổi thành và từ một tham số. Việc đóng gói được khôi phục.

Nhưng chúng ta phải nhớ sử dụng `Tag.find_by_param` thay vì `Tag.find` ở mọi nơi. Đặc biệt nếu bạn đang sử dụng ID friendly trên một hệ thống hiện có, đây có thể là một nỗ lực đáng kể.
### Option 3: Overriding Find
Thay vì triển khai công cụ tìm tùy chỉnh, chúng ta có thể ghi đè `find` method:
```ruby
class Tag < ActiveRecord::Base
  #...
  def self.find(input)
    find_by_name(input)
  end
end
```
Nó sẽ hoạt động khi bạn truyền vào một slug, nhưng sẽ bị hỏng khi một ID được truyền vào. Làm thế nào chúng ta có thể xử lý cả hai?
Cách đầu tiên là thực hiện một số chuyển đổi:
```ruby
class Tag < ActiveRecord::Base
  #...
  def self.find(input)
    if input.is_a?(Integer)
      super
    else
      find_by_name(input)
    end
  end
end
```
Điều đó sẽ hoạt động, nhưng việc kiểm tra type rất trái với ethos của Ruby. Việc luôn phải viết `is_a? ` khiến bạn tự hỏi "Có cách nào tốt hơn không?"
Và có một cách tốt hơn, dựa trên hai điều sau:
* Database cung cấp cho các `id` là `1` cho bản ghi đầu tiên
* Ruby chuyển đổi chuỗi bắt đầu bằng một chữ cái thành `0`
```ruby
class Tag < ActiveRecord::Base
  #...
  def self.find(input)
    if input.to_i != 0
      super
    else
      find_by_name(input)
    end
  end
end
```
Hoặc, ngưng tụ với một ternary:
```ruby
class Tag < ActiveRecord::Base
  #...
  def self.find(input)
    input.to_i == 0 ? find_by_name(input) : super
  end
end
```
Mục tiêu của chúng ta đã đạt được, nhưng chúng ta đã đưa ra một lỗi có thể xảy ra: nếu một tên bắt đầu bằng một chữ số thì nó sẽ trông giống như một ID. Hãy thêm một xác nhận rằng tên không thể bắt đầu bằng một chữ số:
```ruby
class Tag < ActiveRecord::Base
  #...
  validates_format_of :name, without: /^\d/
  def self.find(input)
    input.to_i == 0 ? find_by_name(input) : super
  end
end
```
Bây giờ mọi thứ có lẽ đã làm việc tuyệt vời!
# 3. Using the FriendlyID Gem
Tham khảo tại: https://github.com/norman/friendly_id

Chúc các bạn thành công!!