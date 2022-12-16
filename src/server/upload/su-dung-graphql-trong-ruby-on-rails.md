# Sử dụng GraphQL trong RoR

GraphQL đã trở biết đến khi nó được giới thiệu bởi Facebook. Kể từ đó các công ty như Github, Shopify và Pinterest đã sử dụng nó như một phần cốt lõi của công nghệ. Truy vấn GraphQL điển hình sẽ được cấu trúc như dưới đây

```json
{
  allMovies {
    title
    description
  }
}
```
GraphQL cung cấp tính linh hoạt cho việc truy vấn các trường cần thiết được yêu cầu. Sự linh hoạt này cung cấp nhiều ưu điểm so với REST. Có lẽ lợi thế hấp dẫn nhất là nó loại bỏ quá trình over-fetching và under-fetching.

REST API có một cấu trúc cố định được xác định cho mỗi điểm cuối API. Nó trả lại quá nhiều dữ liệu trên mỗi cuộc gọi API hoặc quá ít. Ví dụ: nếu chỉ hiển thị tiêu đề trên một trang nhất định, việc trả lại các trường bổ sung không có ý nghĩa nhiều. Tương tự như vậy, nếu chúng ta muốn chỉ trả lại tên của nhà phân phối? Trong các REST API truyền thống, hầu hết có thể yêu cầu gửi một yêu cầu tìm kiếm thông tin nhà phân phối cho bộ phim đó.

Trong bài đăng này, chúng tôi sẽ triển khai một bộ phim giả lập API đơn giản và các bài đánh giá của họ.

Chúng ta sẽ bắt đầu bằng cách thiết lập một dự án cơ sở Rails. Chúng tôi sẽ sử dụng [graph-ql](https://github.com/rmosolgo/graphql-ruby).

```ruby
gem install bundler
gem install rails
bundle install
rails new learning-graphql
rails db:create
```

Ứng dụng Rails phải được cài đặt.  Bắt đầu máy chủ với Rails và chắc chắn rằng nó đang hoạt động. Thêm gem `graphiql-rails` và `bundle install` cho dự án.

Bây giờ chúng ta hãy tạo ra mô hình Movie bằng các lệnh sau trên terminal

```
rails generate model movie title description
rails db:migrate
```

Bây giờ chúng ta tạo seed data để hỗ trợ quá trình test chương trình trong file `db/seeds.rb`

```
Movie.create(
  title: ‘Deadly Weapon’,
  description: ‘2 retired monks walk into a bar’
)

Movie.create(
  title: ‘Deadly Weapon 2 — This time time it’s personal’,
  description: ‘Like Deadly Weapon, only deadlier and more personal’
)
```

## Fetching Movies with GraphQL

Bây giờ chúng ta sẽ đến giai đoạn thuộc tính của GraphQL. Điều này có thể được trợ giúp bởi `GraphQL gem`.

```
rails generate graphql:object movie
```

```ruby
# In the app/graphql/types/movie_type.rb file

Types::MovieType = GraphQL::ObjectType.define do
  name “Movie”
  
  field :id, !types.ID
  field :title, !types.String
  field :description, types.String
end
```

Mỗi Schema bao gồm các trường, các thông tin  đại diện cho mô hình của chúng ta. GraphQL xử lý tất cả các trường là các giá trị nullable theo mặc định. Trong trường hợp này, chúng tôi biết rằng các trường `id` và `title` sẽ luôn tồn tại. Vì vậy chúng ta có thể khai báo chúng là các trường require. Điều này đạt được thực hiển bằng `!` trước mỗi thuộc tính.

Giờ hãy tạo một truy vấn để tìm nạp tất cả các bộ phim hoặc một bộ phim dựa trên ID của nó

```ruby
Types::QueryType = GraphQL::ObjectType.define do
  name “Query”
  # Add root-level fields here.
  # They will be entry points for queries on your schema.
  field :allMovies do
    type types[Types::MovieType]
    description “A list of all the movies”

    resolve -> (obj, args, ctx) {
      Movie.all
    }
  end

  field :movie do
    type Types::MovieType
    description “Return a movie”
    argument :id, !types.ID
    resolve -> (obj, args, ctx) { Movie.find(args[:id]) }
  end
end
```

#### Một vài điểm để quan sát ở đây:

- Hàm giải quyết có trách nhiệm chấp nhận tải trọng truy vấn và thực hiện logic phụ trợ để hoàn thành yêu cầu và lấy dữ liệu được yêu cầu.
- Trong trường phim một đối số đã được xác định. Vì trường này nên trả về một phim duy nhất, chúng ta cần phải chọn một tiêu chí để xác định duy nhất mỗi bộ phim. Sử dụng thuộc tính id không phải nullable làm cho ý nghĩa nhất.

Bây giờ chúng ta hãy thử lấy tất cả các bộ phim. Nhập truy vấn sau và thực hiện nó. Nếu mọi việc suôn sẻ, chúng tôi sẽ thấy một cái gì đó với hình ảnh bên dưới. Thử gỡ bỏ các trường và xem câu trả lời thay đổi như thế nào.

![](https://images.viblo.asia/24f2e497-40e3-4bf7-b19c-edeb8a56b033.png)

### Creating a Movie

Cho đến bây giờ, chúng tôi chỉ đang xem xét cách lấy dữ liệu. Bây giờ chúng ta sẽ nói về việc sử dụng các đột biến cho các thao tác sửa đổi dữ liệu. Hãy xem làm thế nào chúng ta có thể tiếp tục với việc cố gắng tạo ra một bộ phim:

```ruby
# app/graphql/types/mutation_type.rb

Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :createMovie, Types::MovieType do
    argument :title, !types.String
    argument :description, !types.String

    resolve -> (obj, args, ctx) {
      Movie.create(
        title: args[:title],
        description: args[:description]
      )
    }
  end
end
```

Việc thực hiện chấp nhận hai đối số, tiêu đề và mô tả của bộ phim. Gọi chúng có cùng cú pháp như các truy vấn, tuy nhiên cần phải thêm từ khoá thay đổi. Cuộc gọi dưới đây sẽ trả lại ID của bộ phim mới được tạo. Nó có thể được sửa đổi để trả lại bất kỳ lĩnh vực khác là tốt.

### Adding Relationships

Để thử kết nối các loại khác nhau, trước hết chúng ta cần tạo một mô hình mới. Đối với ví dụ này, chúng tôi sẽ tạo mô hình Đánh giá. Phim có thể có nhiều bài đánh giá.


```terminar
rails generate model review content movie_belongs_to
rails db:migrate
rails generate graphql:object review
```

Chúng tôi cũng cần thêm `has_many :reviews` vào tệp `app/models/movie.rb`. Thời gian để thực hiện các đại diện kiểu đánh giá. Trong khi chúng tôi tham gia, chúng tôi cũng nên thêm một trường bổ sung vào loại Phim để hiển thị đánh giá làm tài sản bổ sung.


```
# app/graphql/types/review_type.rb

Types::ReviewType = GraphQL::ObjectType.define do
  name "Review"

  field :id, types.ID
  field :content, types.String
end
```

```

# app/graphql/types/movie_type.rb

Types::MovieType = GraphQL::ObjectType.define do
  name "Movie"

  field :id, types.ID
  field :title, types.String
  field :description, types.String

  field :reviews do
    type types[Types::ReviewType]
    resolve -> (obj, args, ctx) {
      obj.reviews
    }
  end
end
```

### Mở rộng
Đây là một cái  nhìn ngắn gọn của chúng ta về cách sử dụng GraphQL với Ruby.
Để tham khảo chúng ta có thể tham gia tại [(http://graphql.org/learn/) ](http://graphql.org/learn/)

## Kết luận

Đây là một bài viết cơ bản về GraphQL trong  rails. Trong bài mình dịch không được hay và sat nghĩa vì vậy bạn có thể đọc bản gốc tại:  [you-should-be-using-graphql-a-ruby-introduction](https://medium.com/@UnicornAgency/you-should-be-using-graphql-a-ruby-introduction-9b1de3b001dd).