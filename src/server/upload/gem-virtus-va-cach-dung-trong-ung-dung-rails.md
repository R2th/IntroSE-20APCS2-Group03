`Virtus` hoạt động theo một cách gần như giống `Property` trong `DataMapper`.

> Virtus works in an almost identical way as Property in DataMapper. You can define attributes in your classes and it will create accessors to these attributes along with typecasting abilities. It comes with a set of builtin attribute types but you are free to add your own types too


`Virtus` cho phép tạo các thuộc tính của `class`, `module` hay các `instance class` với các thông tin tùy chọn về `type` khả năng hiển thị method đọc / ghi và các hành vi ép buộc(` coercion behavior`). Ngoài ra, nó cũng hỗ trợ rất nhiều `coercion` và mapping nâng cao của các đối tượng nhúng và collection.

Một số  trường hợp nên dùng `virtus`:
- Nhập các pamatters sanitization và ép buộc trong các ứng dụng web
- mapping JSON tới các domain object
- Đóng gói data-access trong các Value Object
- Tạo các domain model 

### Cài đặt

Có 2 cách cài đặt như các gem thông thường khác bạn có thể thực hiện như sau:

* Cách 1: Cho trực tiếp vào file Gemfile:
```
//Gemfile
gem "virtus"
```
và sau đó chạy lệnh `bundle install` trên terminal.

* Cách 2: Chạy trực tiếp lệnh `gem install virtus` trên terminal


### Cách dùng

**Available Attribute Types:**

Dưới đây là các type attributes mà có thể khởi tạo kiểu khi dùng `virtus`:

* Array
* Boolean
* Date
* DateTime
* Decimal
* Float
* Hash
* Integer
* Object
* String
* Time

**1. Dùng virtus với classes:**

Chúng ta có thể tạo class kế thừa từ `Virtus` và tạo các attributes như sau:

```
class Book
  include Virtus

  attribute :title,         String
  attribute :author,        String
  attribute :publish_date,  Date
  
  book = Book.new(:title => "Tôi Và Paris - Câu Chuyện Một Dòng Sông", :author => "Hoàng Long")
  book.attributes # => { :title => "Tôi Và Paris - Câu Chuyện Một Dòng Sông", :author => "Hoàng Long", :publish_date => nil }

  book.title # => "Tôi Và Paris - Câu Chuyện Một Dòng Sông"

  book.author # => "Hoàng Long"
  
end
```


**2. Dùng virtus với module:**

Chúng ta có thể tạo modules kế thừa từ `Virtus` và tạo các attributes sau đó include vào các class muốn sử dụng:

```
module Title
  include Virtus.module

  attribute :title, String
end

module Author
  include Virtus.module(:coerce => false)

  attribute :author, String
end

class Book
  include Title, Author
end

book = Book.new(:title => "Tôi Và Paris - Câu Chuyện Một Dòng Sông", :author => "Hoang Long")
```

**3. Tạo một Dynamically Extending Instances**

```

class Book
  # nothing here
end

book = Book.new
book.extend(Virtus.model)
book.attribute :title, String
book.title = "Tôi và Paris - câu chuyện một dòng sông"
book.title # => "Tôi và Paris - câu chuyện một dòng sông"
```

**4. Các giá trị mặc định(Default Values)**

```
class Page
  include Virtus.model

  attribute :title, String

  # default from a singleton value (integer in this case)
  attribute :views, Integer, :default => 0

  # default from a singleton value (boolean in this case)
  attribute :published, Boolean, :default => false

  # default from a callable object (proc in this case)
  attribute :slug, String, :default => lambda { |page, attribute| page.title.downcase.gsub(' ', '-') }

  # default from a method name as symbol
  attribute :editor_title, String,  :default => :default_editor_title

  def default_editor_title
    published? ? title : "UNPUBLISHED: #{title}"
  end
end

page = Page.new(:title => 'Virtus README')
page.slug         # => 'virtus-readme'
page.views        # => 0
page.published    # => false
page.editor_title # => "UNPUBLISHED: Virtus README"

page.views = 10
page.views                    # => 10
page.reset_attribute(:views)  # => 0
page.views                    # => 0
```


**5. Giá trị defaul trên các dynamically extended instance**

Cái này yêu cầu cần sử dụng thêm option `:lazy` (setting mặc định là `false`)

```
book = Book.new
book.extend(Virtus.model)
book.attribute :title, String, default: 'Tôi và Paris - câu chuyện một dòng sông', lazy: true
book.title # => "Tôi và Paris - câu chuyện một dòng sông"
```
**6. Embedded Value**
- Cùng xem ví dụ sau:

```
class City
  include Virtus.model

  attribute :name, String
end

class Address
  include Virtus.model

  attribute :street,  String
  attribute :zipcode, String
  attribute :city,    City
end

class User
  include Virtus.model

  attribute :name,    String
  attribute :address, Address
end

user = User.new(:address => {
  :street => 'Street 1/2', :zipcode => '12345', :city => { :name => 'NYC' } })

user.address.street # => "Street 1/2"
user.address.city.name # => "NYC"
```

Ở trên đây là những điều cơ bản nhất về gem `virtus`

Tham khảo từ [Virtus – Attributes For Your Plain Ruby Objects](https://solnic.codes/2011/06/06/virtus-attributes-for-your-plain-ruby-objects/) và [gem virtus](https://github.com/solnic/virtus)