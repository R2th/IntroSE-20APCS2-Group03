### Chúng ta cùng bắt đầu nhé ;)
`Fast JSON API` gem cung cấp tất cả các chức năng chính mà `Active Model Serializer` (AMS) có cung cấp, nhưng nó nhấn mạnh về `tốc độ` và `hiệu suất` hơn bằng cách đáp ứng yêu cầu benchmark nhanh gấp 25 lần. Trong khi `AMS` bắt đầu chậm lại khi một model có nhiều relationships. Gem `fast_jsonapi` cũng thực hiện `performance testing` như một nguyên tắc.
### Một số thông số chứng minh tính vượt trội về tốc độ của fast_jsonapi
Các bài test hiệu năng cho thấy tốc độ tăng 25-40 lần so với AMS, về cơ bản làm cho thời gian tuần tự hóa không đáng kể đối với các model phức tạp. Hiệu suất đạt được là đáng kể khi số lượng các bản ghi tuần tự tăng.

***Benchmark times for 250 records***
```R
$ rspec
Active Model Serializer serialized 250 records in 138.71 ms
Fast JSON API serialized 250 records in 3.01 ms
```
![](https://images.viblo.asia/2a2d8f80-89a3-42c0-aa13-41def9a7af50.png)
### Tại sao lại tối ưu hóa serialization?

Việc tuần tự hóa `JSON API` thường là một trong những phần `chậm nhất` của nhiều `API Rails`. Vậy tại sao chúng ta lại không cung cấp tất cả các chức năng chính mà AMS có nhưng với tốc độ cao hơn?

### Tính năng

1. Cú pháp khai báo tương tự Active Model Serializer
1. Hỗ trợ cho cả belongs_to, has_many và has_one
1. Hỗ trợ các document ghép (included)
1. Tối ưu tuần tự hóa các document ghép
1. Caching
1. Theo dõi với tích hợp Skylight (tùy chọn)

### Cài đặt 
Thêm dòng này vào Gemfile:
```R
gem 'fast_jsonapi'
```
Chạy
```R
$ bundle install
```

### Cùng sử dụng nào :)
Có thể khởi tạo một `serializer` sử dụng `Rails Generator`:
```R
rails g serializer Movie name year
```
Nó sẽ tạo ra một `serializer` mới trong `app/serializers/movie_serializer.rb`
### Định nghĩa Model
```Ruby
class Movie
  attr_accessor :id, :name, :year, :actor_ids, :owner_id, :movie_type_id
end
```
### Viết một serializer bằng cách sử dụng Fast JSONAPI?
Cú pháp khai báo của `fast_jsonapi` tương tự như `AMS`.
```Ruby
class MovieSerializer
 include FastJsonapi::ObjectSerializer
 attributes :name, :year
 has_many :actors
 belongs_to :owner, record_type: :user
 belongs_to :movie_type
end
```
Ở đây có khác một chút so với AMS là `include FastJsonapi::ObjectSerializer` thay vì `extends ActiveModelSerializer`, nhưng nó vẫn hỗ trợ các quan hệ như thường.

***Ví dụ:***
```R
movie = Movie.new
movie.id = 232
movie.name = 'Superman!'
movie.actor_ids = [1, 2, 3]
movie.owner_id = 3
movie.movie_type_id = 1
movie
```
### Một số Object Serialization
***Return a hash***
```Ruby
hash = MovieSerializer.new(movie).serializable_hash
```
***Return Serialized JSON***
```Ruby
json_string = MovieSerializer.new(movie).serialized_json
```
***Serialized Output***
```Ruby
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
`Format JSON` trả về chỉ có một kiểu `duy nhất`, khi muốn thay đổi thì chúng ta phải `edit code` :(. Nó không linh hoạt như AMS, có vài kiểu adapter cho phép người dùng tùy chọn.

### Attributes
Sử dụng method `attributes` để định nghĩa attributes trong `FastJsonapi`. Method này cũng có `bí danh` là `attribute` phù hợp khi định nghĩa một thuộc tính đơn.<br>
Theo mặc định, các thuộc tính được `đọc trực tiếp` từ thuộc tính mô hình có cùng tên.
```Ruby
class MovieSerializer
  include FastJsonapi::ObjectSerializer

  attribute :name
end
```
Có thể định nghĩa những thuộc tính custom với khai báo sử dụng cú pháp block của Ruby:
```Ruby
class MovieSerializer
  include FastJsonapi::ObjectSerializer

  attributes :name, :year

  attribute :name_with_year do |object|
    "#{object.name} (#{object.year})"
  end
end
```
Cũng có thể `ghi đè` các thuộc tính đã có với cú pháp trên:
```Ruby
class MovieSerializer
  include FastJsonapi::ObjectSerializer

  attribute :name do |object|
    "#{object.name} Part 2"
  end
end
```
Các thuộc tính cũng có thể sử dụng một `tên khác` bằng cách truyền method gốc hoặc `accessor` bằng `shortcut proc`:
```Ruby
class MovieSerializer
  include FastJsonapi::ObjectSerializer

  attributes :name

  attribute :released_in_year, &:year
end
```
**Thú vị đúng không nào** ;)