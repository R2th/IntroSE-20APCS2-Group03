## Giới thiệu
Nếu các bạn đã từng làm việc với Rails5 api thì chắc cũng từng ít nhất 1 lần sử dụng Activemodel Serializer, và hôm nay tôi sẽ giới thiệu cho các bạn 1 thư viện "tương tự" nhưng tốc độ thì vô cùng nhanh như cái tên của nó fast_jsonapi "A lightning fast JSON:API serializer for Ruby Objects".
Và tất nhiên không phải là chém gió, họ đã đưa ra những con số rõ ràng để thể hiện tốc độ vượt trội

**Serialization time is at least 25 times faster than Active Model Serializers on up to current benchmark of 1000 records**
### Benchmark times for 250 records
```
$ rspec
Active Model Serializer serialized 250 records in 138.71 ms
Fast JSON API serialized 250 records in 3.01 ms
```
## Cài đặt nó và xem như thế nào thôi :)
Add this line to your application's Gemfile:
```
gem 'fast_jsonapi'
```

Execute:
```
$ bundle install
```

### Rails Generator
Bạn có thể sử dụng generator
```
rails g serializer Movie name year
```
Nó sẽ tạo 1 file serializer tại 
```
app/serializers/movie_serializer.rb
```
### Model Definition
```
class Movie
  attr_accessor :id, :name, :year, :actor_ids, :owner_id, :movie_type_id
end
```

### Serializer Definition
```
class MovieSerializer
  include FastJsonapi::ObjectSerializer
  set_type :movie  # optional
  set_id :owner_id # optional
  attributes :name, :year
  has_many :actors
  belongs_to :owner, record_type: :user
  belongs_to :movie_type
  
  attribute :name_with_year do |object|
    "#{object.name} (#{object.year})"
  end
end
```

Hơi khác 1 tí so với ActiveModelSerializer là include FastJsonapi::ObjectSerializer thay vì extends ActiveModelSerializer
Vẫn hỗ trợ các quan hệ thông thường

Define attribute trong block

### Sample Object
```
movie = Movie.new
movie.id = 232
movie.name = 'test movie'
movie.actor_ids = [1, 2, 3]
movie.owner_id = 3
movie.movie_type_id = 1
movie
```

### Object Serialization
Return a hash
```
hash = MovieSerializer.new(movie).serializable_hash
```

Return Serialized JSON
```
json_string = MovieSerializer.new(movie).serialized_json
```

Serialized Output
```
{
  "data": {
    "id": "3",
    "type": "movie",
    "attributes": {
      "name": "test movie",
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
Theo ý kiến bản thân thì tôi thấy format json trả về cứ kỳ kỳ, và nó chỉ có 1 kiểu duy nhất, không giống như ActiveModelSerializer có sẵn vài adapter cho chúng ta chọn, hay đại loại là có thể tạo riêng 1 adapter tùy theo nhu cầu của mình, còn quay trở lại với fast_jsonapi muốn đổi thì phải...sửa code.

Hiện tại thì nó vẫn còn rất "hoang sơ" chắc đây cũng là 1 lý do cho cái tốc độ thần thánh đó :D
Cảm ơn các bạn đã theo dõi, Happy coding