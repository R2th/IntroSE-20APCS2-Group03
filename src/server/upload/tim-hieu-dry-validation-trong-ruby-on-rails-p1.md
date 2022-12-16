###### :black_small_square:Trước tiên, mình sẽ giới thiệu qua về Dry Validation
- `dry-validation ` là thư viện validation data được cung cấp bởi DSL, nó hoat động với bất kỳ dữ liệu đầu vào nào, cho dù nó là một hash, array hay một đối tượng chứa những liệu được lồng sâu vào với nhau.
- Validations được thể hiện thông qua các `Contract object`. Một `Contract` sẽ xác dịnh một `schema` với các kiểu check dữ liệu cơ bản và bất kỳ `rules` nào có thể áp dụng.  `rules` trong `Contract` chỉ được áp dụng một khi các giá trị mà chúng dựa vào đã được pass qua các kiểu check dữ liệu cơ bản của `schema`.
- Sử dụng nó sẽ nhanh hơn nhiều so với việc chúng ta sử dụng  `ActiveRecord/ActiveModel::Validations`,  `strong-parameters`.
- Để cho thể sử dụng nó trong project của mình ta cần cài đặt nó trước bằng việc add `gem 'dry-validation'` vào gemfile của project ROR chúng ta nhé
######  :black_small_square:Ta bắt đầu tìm hiểu những thứ căn bản của thư viện này nhé:
##### **1. Type Validate Basic**
- Một số kiểu check validate thường sử dụng trong dry mình có thể kể đến:
```
- required: buộc trong dữ liệu đầu vào của ta phải có nó
- filled: phải điền dữ liệu cho key, attribute,... (ví dụ: {email: "test@example.com"})
- optional: nó sẽ ko yêu cầu dữ liệu đầu vào phải có, 
    thường sẽ kết hợp với filled để validate dữ liệu
- value: kiểu dữ liệu (string, integer,...) cho key, attribute,...của dữ liệu đầu vào
```
##### **2. Schemas**
- Có thể nói `Schemas` là một phần quan trọng của `dry-validation`, nó sẽ xử lý dữ liệu trước khi nó bị validate bởi `rules` ( còn `rules` là gì thì bên dưới mình sẽ tìm hiểu rõ hơn nhé ) và `Schemas` có thể cung cấp các thông báo lỗi một cách chi tiết nhất
- `rules` ở đây có thể hiểu là mình sẽ validate các dữ liệu một cách cụ thể hơn (các dữ liệu cần validate một cách logic hơn) mà các type validate của gem không hỗ trợ.

 :small_red_triangle_down:**Định nghĩa một Schema cơ bản**
- Để định nghĩa một schema chúng ta sẽ sử dụng `schema` method:
```ruby
class ExampleContract < Dry::Validation::Contract
  schema do
    required(:email).value(:string)
    required(:age).value(:integer)
  end
end
```
- Ở bên trên ta đã khởi tạo một Contact với việc sử dụng required có nghĩa là đầu vào buộc phải có `email` , `age` và value của `email` phải là `string` và value của `age` phải là `integer`
- Bây giờ, ta sẽ thử áp dụng Contract chúng ta vừa tạo nhé:
```ruby
example = ExampleContract.new

result = example.call(age: 21)
# => #<Dry::Validation::Result{:age=>21} errors={:email=>["is missing"]}>

result.to_h
# => {:age=>21}

result.errors.to_h
# => {:email=>["is missing"]}
```

<hr>

 :small_red_triangle_down:**Định nghĩa một Schema với Params required**
 - Để định nghĩa một schema cho việc validate `HTTP parameters`, ta sẽ sử dụng `params` method:
```ruby
class ExampleContract < Dry::Validation::Contract
  params do
    required(:email).value(:string)
    required(:age).value(:integer)
  end
end
```
```ruby
result = ExampleContract.call('email' => 'namdang@test.com', 'age' => '18')
# => #<Dry::Validation::Result{:email=>"namdang@test.com", :age=>21} errors={}>

result.to_h
# => {:email=>"jane@doe.org", :age=>21}
```
- Sự khác biệt chính giữa `params` và `schema` đơn giản là `params` sẽ thực hiện các bắt buộc dành riêng cho `params` trước khi áp dụng `rules`. Trong phần `rules` ta sẽ tìm hiểu rõ ràng hơn.

<hr>

 :small_red_triangle_down:**Định nghĩa một Schema với JSON required**
- Ta có thể sử dụng `json` để định nghĩa một `schema` phù hợp cho việc xác thực JSON data:
```ruby
class ExampleContract < Dry::Validation::Contract
  json do
    required(:email).value(:string)
    required(:age).value(:integer)
  end
end
```
```ruby
result = ExampleContract.call('email' => 'namdang@test.com', 'age' => '18')
# => #<Dry::Validation::Result{:email=>"namdang@test.com", :age=>"21"} errors={:age=>["must be an integer"]}>

result = ExampleContract.call('email' => 'jane@doe.org', 'age' => 18)
# => #<Dry::Validation::Result{:email=>"jane@doe.org", :age=>18} errors={}>

result.to_h
# => {:email=>"namdang@test.com", :age=>18}
```

<hr>

 :small_red_triangle_down:**Sử dụng lại schema từ schema khác**
 - Ta có thể sử dụng lại một `schema` hiện có hoặc multiple `schema` bằng cách passing nó sang `schema` chúng ta định nghĩa. Ví dụ:
 ```ruby
 CategorySchema = Dry::Schema.Params do
  required(:category_id).value(:integer)
  required(:type).value(:string)
end

UserSchema = Dry::Schema.Params do
  required(:user_id).value(:integer) 
end

class PostContract < Dry::Validation::Contract
  params(CategorySchema, UserSchema) do
    required(:name).value(:string)
    required(:content).value(:string) 
  end
end

post = PostContract.new

post.(name: "New Post", content: 1, user_id: 2)
 => #<Dry::Validation::Result{:name=>"New Post", :content=>1, :user_id=>2} 
     # errors={:category_id=>["is missing"], :type=>["is missing"], :content=>["must be a string"]}> 
 ```
 
 <hr>
 
  :small_red_triangle_down:**Custom Types cho Schema**
  - Khi chúng ta định nghĩa schema sử dụng `param` hay `json`, ta có thể xử lý cho giá trị dữ liệu đầu vào theo cách ta muốn ví dụ như:
  ```ruby
  module Types
    include Dry::Types()

    StripString = Types::String.constructor(&:strip)
end

class EmailContract < Dry::Validation::Contract
  params do
    required(:email).value(Types::StripString)
  end
end

email = EmailContract.new
email.call(email: '   test@test.com   ')
# => #<Dry::Validation::Result{:email=>"test@test.com"} errors={}>
  ```
  
<hr>

##### Cảm ơn các bạn đã đọc bài viết của mình
#### Tài liệu tham khảo: [Dry Validation](https://dry-rb.org/gems/dry-validation)