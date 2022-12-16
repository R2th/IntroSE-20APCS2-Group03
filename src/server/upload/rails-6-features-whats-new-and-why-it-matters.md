Mục đích của bài viết là giúp bạn làm quen với các tính năng chính đã được thêm vào Rails 6 và áp dụng để có thể giúp làm cho ứng dụng tốt hơn và tiết kiệm thời gian phát triển. Và phiên bản này được mong chờ vì nhiều điều hay ho mà nó cung cấp cho ta. 

Môi trường yêu cầu: Rails 6 yêu cầu Ruby 2.5+ và cơ sở dữ liệu được nâng cấp.

### Testing in Rails 6

Mong muốn các trường hợp thử nghiệm sẽ bao phủ hết phạm vi của mã code. Tuy nhiên, việc test sẽ trở nên vô cùng nặng nề bắt buộc chúng ta phải chờ đợi trong vài phút, có thể là vài giờ mới có thể thực hiện các trường hợp như mong muốn.

Và vì thế, Rails 6 đã đưa ra một câu trả lời thỏa mãn, đó là...

### Parallel Testing

Một phương thức mới đã được cung cấp đó chính là `parallelize` của `ActiveSupport::TestCase`. Nó cho phép chúng ta chạy song song các trường hợp test với phương pháp rẽ nhánh.

Để sử dụng được thì cần thêm vào file `test_helper.rb`

```
parallelize(workers: 2)
```

Nếu như trước đây, chúng ta thường chạy test với những dòng lệnh như thế này

```
bin/rails test OR bin/rspec spec
```

thì giờ ta có thể thay thế chúng bởi

```
PARALLEL_WORKERS=15 rails test OR PARALLEL_WORKERS=15 rspec spec
```

Nếu bạn muốn xem chi tiết hơn thì có thể tham khảo thêm [ở đây](https://edgeguides.rubyonrails.org/testing.html#parallel-testing)

### Bulk Insert and Upsert

Đôi khi ta rơi vào trường hợp, cần phải thêm nhiều bản ghi vào cùng một lúc và như vậy, Rails 6 ra đời một phương thức mới là `insert_all` để giải quyết vấn đề đó. Một câu truy vấn sql về insert được tạo ra Và nó sẽ thực hiện một lệnh truy vấn sql duy nhất mà không thực hiện thêm bất kỳ một callbacks nào. Từ đó giảm bớt các truy vấn không cần thiết và việc thực thi được tối ưu hơn. Có một phương pháp bổ sung là `upsert_all` cho phép sử dụng thao tác [upsert](https://wiki.postgresql.org/wiki/UPSERT)

Ta có thể xem qua ví dụ

* insert_all với việc bỏ qua các bản ghi trùng lặp

```
result = Article.insert_all(
  [
    { id: 1,
      title: 'Handling 1M Requests Per Second',
      author: 'John',
      slug: '1m-req-per-second' },

    { id: 1, # duplicate 'id' here
      title: 'Type Safety in Elm',
      author: 'George',
      slug: 'elm-type-safety' },

    { id: 2,
      title: 'Authentication with Devise - Part 1',
      author: 'Laura',
      slug: 'devise-auth-1' },

    { id: 3,
      title: 'Authentication with Devise - Part 1',
      author: 'Laura', # duplicate 'title' & 'author' here
      slug: 'devise-auth-2' },

    { id: 4,
      title: 'Dockerizing and Deploying Rails App to Kubernetes',
      author: 'Paul',
      slug: 'rails-on-k8s' }
  ]
)

puts Article.count
# 3
```

Phuơng thức `insert_all` chấp nhận tham số đầu vào là một mảng các hash như là một Active Record và các key trong hash phải giống nhau. Và khi có conflic hay trùng lặp về khóa ràng buộc giữa các hàng (bản ghi), thì nó sẽ tự động bỏ qua các bản ghi bị conflic và tiếp tục chèn các bản ghi tiếp theo mà không hề bị gián đoạn, ngắt quãng.

Với ví dụ trên, ta có thể thấy, có 2 bản ghi bị vi phạm khóa ràng buộc trên bảng articles và chúng đều bị bỏ qua và không thực hiện chèn vào cơ sở dữ liệu.

Còn với `insert_all!`thì thay vì bỏ qua những bản ghi bị lỗi thì nó sẽ đưa ra một thông điệp lỗi `ActiveRecord::RecordNotUnique`

* upsert_all

Với `insert_all`, ta sẽ bỏ qua những bản ghi bị lỗi hoặc đưa ra một ngoại lệ khi gặp một bản sao với `insert_all! ` và chung quy thì đều là bỏ qua việc thực thi những bản ghi không hợp lệ. Và đôi khi, ta muốn cập nhật lại bản ghi khi có sự cố trùng lặp xảy ra, hoặc sẽ là việc chèn thêm một bản ghi mới. Và với `upsert_all`, ta hoàn toàn có thể thực hiện được việc đó.

```
result = Article.upsert_all(
  [
    { id: 1, title: 'Handling 1M Requests Per Second', author: 'John', slug: '1m-req-per-second' },
    { id: 1, .... }, # duplicate 'id' here
    { id: 2, .... },
    { id: 3, .... }, # duplicate 'title' and 'author' here
    { id: 4, .... },
    { id: 5, .... }, # duplicate 'slug' here
    { id: 6, .... }
  ]
)
puts Article.count
# 5
```

Với upsert_all thì nó không hỗ trợ `unique_by` nếu bạn đang sử dụng cơ sở dữ liệu là Mysql.

### Insert, insert! và upsert

Các phuơng thức này là các hàm bao quanh `insert_all`, `insert_all!`, `upsert_all`, tuơng ứng như vậy, chúng cũng có phuơng thức hoạt động tuơng tự nhau. 

* `insert`: được sử dụng để chèn một bản ghi duy nhất vào cơ sở dữ liệu. Nếu bản ghi đó bị lỗi, trùng lặp về khóa ràng buộc, thì nó sẽ bỏ qua việc thực hiện chèn bản ghi đó vào cơ sở dữ liệu mà không đưa ra bất kỳ một ngoại lệ nào.

* `insert!`: phương thức này cũng cho phép chèn một bản ghi vào cơ sở dữ liệu, nhưng sẽ đưa ra một thông điệp lỗi tới người phát triển `ActiveRecord::RecordNotUnique` nếu bản ghi đó bị lỗi, trùng lặp về khóa ràng buộc.

* `upsert`: phương thức chèn hoặc cập nhật một duy nhất vào cơ sở dữ liệu tương tự như cách upsert_all hoạt động.

Xem qua một số ví dụ sau:

```
Article.insert({ id: 5, title: 'Elm on Rails', author: 'Amanda', slug: '1m-req-per-second' }, unique_by: :slug)

# is same as

Article.insert_all([{ id: 5, title: 'Elm on Rails', author: 'Amanda', slug: '1m-req-per-second' }], unique_by: :slug)
```

```
Article.insert!({ id: 5, title: 'Elm on Rails', author: 'Amanda', slug: '1m-req-per-second' }, returning: %w[ id title ])

# is same as

Article.insert_all!([{ id: 5, title: 'Elm on Rails', author: 'Amanda', slug: '1m-req-per-second' }], returning: %w[ id title ])
```

```
Article.upsert({ id: 5, title: 'Elm on Rails', author: 'Amanda', slug: '1m-req-per-second' }, unique_by: :slug, returning: %w[ id title ])

# is same as

Article.upsert_all([{ id: 5, title: 'Elm on Rails', author: 'Amanda', slug: '1m-req-per-second' }], unique_by: :slug, returning: %w[ id title ])
```

### Truncate Database

Thực hiện lệnh dưới đây, đồng nghĩa với việc xóa tất cả các bảng trong cơ sở dữ liệu của bạn, và bạn có thể tiến hành việc thêm mới sau đó.

```
rails db:truncate_all  
```

### Delete_by and destroy_by

Rails cung cấp các phuơng thức như find_by, find_or_initialize_by và find_or_create_by để tìm kiếm, khởi tạo, và tạo mới bản ghi dựa trên các điều kiện đã có. Còn những phương thức để tự xóa hoặc hủy các bản ghi thì không có sẵn.

Và Rails 6 đã bổ sung hai phuơng thức `delete_by` và `destroy_by` để `ActiveRecord::Relation` có thể xóa hoặc hủy tất cả các bản ghi phù hợp với điều kiện yêu cầu.

Nếu như trước đây, chúng ta thực hiện việc đó bằng những câu lệnh như

```
User.where(is_active: false).delete_all

User.where(is_active: false).destroy_all
```

thì giờ đây, ta đã có các phương thức tiện lợi hơn để thực hiện điều tuơng tự

```
User.delete_by(is_active: false)

User.destroy_by(is_active: false)
```

### Action Text

`action_text` có nội dung văn bản phong phú và chỉnh sửa được trong Rails.

Cài đặt có thể thực hiện: chạy dòng lệnh 

```
rails action_text:install
```

để thêm vào gói Yarn

Thêm rich text vào model hiện có

```
# app/models/message.rb
class Message < ApplicationRecord
  has_rich_text :content
end
```

Và ở view, ta đã có thể sử dụng nó với biểu mẫu form

```
<%# app/views/messages/_form.html.erb %>
<%= form_with(model: message) do |form| %>
  <div class="field">
    <%= form.label :content %>
    <%= form.rich_text_area :content %>
  </div>
<% end %>
```

Và kết quả thu đuợc trên trang

`<%= @message.content %>`

Kết luận: Rails 6 được phát hành và cung cấp những cải tiến, trong đó, có những tính năng nổi bật nhằm tiết kiệm rất nhiều thời gian trong giai đoạn phát triển cũng như cải thiện trong vấn để về bảo mật.

Tài liệu tham khảo: [Rails 6 Features: What's New and Why It Matters](https://www.toptal.com/ruby-on-rails/rails-6-features)