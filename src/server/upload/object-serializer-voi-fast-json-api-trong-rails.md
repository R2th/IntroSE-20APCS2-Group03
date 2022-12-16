## Object serializer là gì ?

Object serializer là công cụ để chúng ta có thể chuyển các object, cụ thể ở đây là các object trong rails, sang dạng JSON để phục vụ cho các HTTP response trả về dữ liệu dạng JSON.
Trong rails, để thực hiện serialize object, chúng ta có thể sử dụng các gem như `fast_jsonapi`, `active_model_serializers` hay có thể sửa dụng chính `Active Model Serializer`(AMS) mà rails cung cấp. Nhưng trong khuôn khổ bài viết này, mình sẽ giới thiệu tới các bạn gem `fast_jsonapi` nhé :grinning:


## Giới thiệu về gem Fast JSON API

`Fast JSON API` cung cấp hầu như mọi chức năng mà `Active Model Serializer` cung cấp. Tuy nhiên, ưu điểm của `Fast JSON API` nằm ở tốc độ và hiệu năng, thậm chí có thể gấp tới 25 lần về mặt thời gian so với `Active Model Serializer`. Chúng ta có thể thấy qua ví dụ sau đây:

```ruby
$ rspec
Active Model Serializer serialized 250 records in 138.71 ms
Fast JSON API serialized 250 records in 3.01 ms
```


Qua ví dụ trên thì chúng ta có thể thấy tốc độ của `Fast JSON API` vượt trội như thế nào đúng không :+1:

## Các tính năng của Fast JSON API

Về cơ bản, Fast JSON API sẽ cung cấp cho chúng ta những chức năng chính sau đây:
*  Cú pháp khai báo tương tự như `Active Model Serializer`
*  Hộ trợ các quan hệ `belongs_to`, `has_many`, `has_one`
*  Hỗ trợ các document ghép
*  Caching

## Cài đặt

Để cài đặt Fast JSON API, chúng ta thêm dòng này vào gem file và sau đó chạy `bundle install`:
```ruby
gem 'fast_jsonapi'
```

Sau khi cài đặt xong thì chúng ta có thể sử dụng các tính năng của Fast JSON API rồi :grinning: Cùng tìm hiểu nhé!

## Sử dụng

Chúng ta có thể sử dụng lệnh `bundled generator` 

```
rails g serializer Movie name year
```

Lệnh này sẽ tạo ra trong project của bạn một serializer nằm trong `app/serializers/movie_serializer.rb`

## Định nghĩa Model

```ruby
class Movie
  attr_accessor :id, :name, :year, :actor_ids, :owner_id, :movie_type_id
end
```

## Định nghĩa Serializer

Đây là phần quan trong nhất. Chúng ta sẽ định nghĩa xem một object sẽ được serialize như thế nào:

```ruby
class MovieSerializer
  include FastJsonapi::ObjectSerializer
  set_type :movie  # optional
  set_id :owner_id # optional
  attributes :name, :year
  has_many :actors
  belongs_to :owner, record_type: :user
  belongs_to :movie_type
end
```

Cùng xem kết quả  qua ví dụ sau nhé :grinning:

Chúng ta sẽ tạo một object của lớp `Movie` như sau:

```ruby
movie = Movie.new
movie.id = 232
movie.name = 'test movie'
movie.actor_ids = [1, 2, 3]
movie.owner_id = 3
movie.movie_type_id = 1
movie
```

Sau đó chúng ta sẽ thực hiện serialize object này :

**Return hash**

```ruby
hash = MovieSerializer.new(movie).serializable_hash
```

**Return JSON**

```ruby
json_string = MovieSerializer.new(movie).serialized_json
```

**Kết quả sẽ cho ra output như sau:**

```json
{
  "data": {
    "id": "3",
    "type": "movie",
    "attributes": {
      "name": "Superman!",
      "year": null
    },
    "relationships": {
      "actors": {
        "data": [
          {
            "id": "1",
            "type": "actor"
          },
          {
            "id": "2",
            "type": "actor"
          }
        ]
      },
      "owner": {
        "data": {
          "id": "3",
          "type": "user"
        }
      }
    }
  }
}
```

## Attributes

Các attributes được định nghĩa trong Fast JSON API qua method `attributes`. Method này còn có alias là `attribute`, nó sẽ giúp code của chúng ta rõ ràng hơn khi định nghĩa một attribute đơn.

Mặc định thì các attributes của object serializer được định nghĩa bằng cách lấy các attributes cùng tên từ object trong Model. Ví dụ như class Movie ở trên, các thuộc tính như `name`, `year`,.. cũng sẽ được chuyển trực tiếp vào `MovieSerializer`:

```ruby
class MovieSerializer
  include FastJsonapi::ObjectSerializer

  attribute :name, :year
end
```

Với `Fast JSON API`, chúng ta còn có thể tự định nghĩa các attributes bên cạnh các attributes có sẵn của object như sau:

```ruby
class MovieSerializer
  include FastJsonapi::ObjectSerializer

  attributes :name, :year

  attribute :name_with_year do |object|
    "#{object.name} (#{object.year})"
  end
end
```

Bằng việc implement thêm attribute `:name_with_year`, object serializer sẽ có thêm thuộc tính `:name_with_year` như ta đã định nghĩa ở trên.

Ngoài ra, chúng ta có thể ghi đè các attributes mặc định (các attributes được lấy trực tiếp từ Model object):

```ruby
class MovieSerializer
  include FastJsonapi::ObjectSerializer

  attribute :name do |object|
    "#{object.name} Part 2"
  end
  
end
```

Các thuộc tính có thể sử dụng dưới một cái tên khác bằng cách truyền method gốc hoặc accessor bằng `shortcut proc`:

```ruby
class MovieSerializer
  include FastJsonapi::ObjectSerializer

  attributes :name

  attribute :released_in_year, &:year
end
```

## Collection serialization
Bên cạnh việc serialize một object độc lập như các ví dụ mình đã trình bày ở trên, chúng ta còn có thể serialize một collection các object. Cú pháp khai báo hoàn toàn tương tự:

```ruby
hash = MovieSerializer.new([movie, movie]).serializable_hash
json_string = MovieSerializer.new([movie, movie]).serialized_json
```

Chúng ta có thể truyền thêm option `is_collection` để quản lý rõ ràng hơn việc serialize một collection hay một single object riêng lẻ. Mặc định nếu ta không truyền option này vào thì `Fast JSON API` sẽ tự hiểu và tự phân biệt khi nào truyền vào một collection, khi nào truyền vào một single object. Tuy nhiên, không phải lúc nào `Fast JSON API` cũng có thể hiểu và phân biệt đúng như chúng ta mong muốn. 
Chính vì vậy mà `Fast JSON API` đã cung cấp cho chúng ta những option để quản lý việc serialize collection hoặc object dễ dàng hơn :
```ruby
options[:is_collection] = nil # or true or false
hash = MovieSerializer.new([movie, movie], options).serializable_hash
json_string = MovieSerializer.new([movie, movie], options).serialized_json
```

Các option của `is_colletion` đó là :

* `nil` hoặc không truyền vào: `Fast JSON API` sẽ tự hiểu xem resource truyền vào là collection hay single object (Tuy nhiên, sẽ có một số hạn chế như mình đã viết ở trên)
* `true`: sẽ luôn coi resource truyền vào là một collection
* `false`: sẽ luôn coi resource truyền vào là một single object

## Params

Trong một số trường hợp, các attribute của serializer object có thể mang nhiều thông tin hơn những attribute của object trong model. Việc truyền các params sẽ giúp chúng ta xử lý các trường hợp khác nhau một các dễ dàng hơn.
Nói thì hơi trừu tượng và khó hiểu, chúng ta cùng xem qua ví dụ sau nhé :grinning:

```ruby
class MovieSerializer
  include FastJsonapi::ObjectSerializer

  attributes :name, :year
  attribute :can_view_early do |movie, params|
    # in here, params is a hash containing the `:current_user` key
    params[:current_user].is_employee? ? true : false
  end

end

# ...
current_user = User.find(cookies[:current_user_id])
serializer = MovieSerializer.new(movie, {params: {current_user: current_user}})
serializer.serializable_hash
```

Ở ví dụ trên, chúng ta sẽ truyền `params[:current_user]` vào trong attribute `:can_view_early`, attribute này sẽ trả về true nếu `params[:current_user].is_employee?` là true, và trả về false nếu ngược lại. Chính vì thế mà giá trị của attribute `can_view_early` sẽ phụ thuộc vào params mà chúng ta truyền vào.

## Conditional Relationship

Conditional Relationship có thể định nghĩa bằng cách truyền một Proc qua từ khóa `if:`. Relationship sẽ được serialize nếu Proc trả về `true` và ngược lại, sẽ không được serialize nếu Proc trả về `false`, tương tự thì chúng ta có thể truyền vào cả `record` cả `params`. Cùng xem qua ví dụ sau đây nhé :

```ruby
class MovieSerializer
  include FastJsonapi::ObjectSerializer

  # Actors will only be serialized if the record has any associated actors
  has_many :actors, if: Proc.new { |record| record.actors.any? }

  # Owner will only be serialized if the :admin key of params is true
  belongs_to :owner, if: Proc.new { |record, params| params && params[:admin] == true }
end

# ...
current_user = User.find(cookies[:current_user_id])
serializer = MovieSerializer.new(movie, { params: { admin: current_user.admin? }})
serializer.serializable_hash
```

## Lời kết
Trên đây mình đã chia sẻ những kiến thức cơ bản nhất đủ để chúng ta có thể áp dụng Fast JSON API trong dự án của mình, để tìm hiểu thêm thì các bạn có thể xem qua link tham khảo mình để dưới đây nhé. Chúc các bạn thành công!
https://github.com/Netflix/fast_jsonapi