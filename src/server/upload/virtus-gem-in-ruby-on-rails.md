##  Định nghĩa và cài đặt
- Gem Virtus cho phép bạn định nghĩa các thuộc tính trên classes, modules hoặc các class instances với các cài đặt không bắt buộc như type, phạm vi read/write các method.
- Để sử dụng virtus gem ta có 2 cách:
```
#Thực thi command 
     gem install virtus

#Thêm vào Gemfile
   gem "virtus"
```
## Sử dụng virtus
- Trước tiên cần tạo model post và category để làm demo:
```
rails generate model post
rails generate model category
```

### Sử dụng Virtus trong Class
- Ta có thể tạo ra các lớp mở rộng và xác định type của các attributes.

```
class Post < ApplicationRecord
  include Virtus.model

  attribute :title, String
  attribute :description, String
  attribute :number, Integer
end

irb(main):002:0> post = Post.new(:title => "This is title",  :description =>  "This is description")   # dễ dàng khởi tạo đối tượng với các thuộc tính

irb(main):003:0> post.attributes
=> {:title=>"This is title", :description=>"This is description", :number=>nil}   

irb(main):004:0> post.title # Lấy ra các thuộc tính
=> "This is title"

irb(main):005:0> post.description
=> "This is description"

post = Post.new(:title => "This is title",  :description =>  "This is description", :number => "10")  #ở đây bạn khai báo number với đối số truyền vào là text
irb(main):007:0> post.attributes
=> {:title=>"This is title", :description=>"This is description", :number=>10}  # giá trị nhận được là kiểu integer đã được khai báo ở model.
irb(main):008:0> post.number
=> 10
```
### Sử dụng Virtus trong Module
- Ta có thể khởi tạo các modele mở rộng với các thuộc tính sử dụng trong class.
```
module Title
  include Virtus.module

  attribute :title, String    # Ta khởi tạo một module Title để sử dụng trong class Post
end

class Post < ApplicationRecord  #Ta include module Title vào model post
  include Title
end

irb(main):001:0> post=Post.new(:title => "This is title")   # Khởi tạo đối tượng
irb(main):002:0> post.attributes   # Đối tượng nhận được
=> {:title=>"This is title"}

```

## Tạo một đối tượng mở rộng động
```
class Post < ApplicationRecord  # Hiện trạng model hiện tại
end

irb(main):001:0> post = Post.new
irb(main):002:0> post.extend(Virtus.model) # khởi tạo một đối tượng kế thừa Virtus
irb(main):003:0> post.attribute :title, String # tạo attribute cho đối tượng
irb(main):004:0> post.title = "This is title"
irb(main):006:0> post.title  # giá trị nhận đươc
=> "This is title"

```

## Khởi tạo cùng giá trị mặc định
```
class Post < ApplicationRecord
  include Virtus.model

  attribute :title, String, :default => "This title"
  attribute :description, String, :default => "this description"
end

irb(main):002:0> post=Post.new(:title => "Title") # khởi tạo đối tượng chỉ có title
irb(main):003:0> post.attributes
=> {:title=>"Title", :description=>"this description"}  # ta nhận đưuọc giá trị mặc định của description.

```

## Giá trị đính kèm
```
# Ta reset lại model post và category:
class Post < ApplicationRecord
  include Virtus.model

  attribute :title, String, :default => "This title"
end

class Address
  include Virtus.model

  attribute :street,  String
  attribute :zipcode, String
  attribute :city,    City
end

irb(main):002:0> post = Post.new(:category => {title: "This is category"})  # khởi tạo đối tượng

irb(main):008:0> post.category.title # lấy title category
=> "This is category"
```

## Khởi tạo đối tượng với giá trị Array hoặc Hash
```
class Post < ApplicationRecord
  include Virtus.model

  attribute :category_name, Array[String]
end

irb(main):001:0> post = Post.new(:category_name => %w[Category01 Category02 Category03]) # khởi tạo thuộc tính với giá trị mảng

irb(main):002:0> post.category_name
=> ["Category01", "Category02", "Category03"] # giá trị nhận được
```
## Định dạng Hash mặc định
```
class Post < ApplicationRecord
  include Virtus.model

  attribute :category_name, Hash[Symbol => String]
end

irb(main):004:0> post = Post.new(:category_name => {"name" => 123})

irb(main):005:0> post.attributes
=> {:category_name=>{:name=>"123"}}  # Giá trị nhận được luôn là key kiểu symbol và value kiểu String.
```
## Link tham khảo
Trên là một số ưu điểm mà Virtus gem có được, rõ ràng ta nhận thấy nhứng ưu điểm này rất cần thiết trong việc refactor code hay xử lý các đoạn code logic phức tạp.
https://rubygems.org/gems/virtus