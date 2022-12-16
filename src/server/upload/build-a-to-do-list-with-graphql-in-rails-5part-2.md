Xin chào mn, lại là mình đây. Như đã hứa trong [bài viết lần trước](https://viblo.asia/p/build-a-to-do-list-with-graphql-in-rails-5part-1-63vKj29kK2R) thì hôm nay mình tiếp tục seris về build to do list với graphql trong rails 5.
Ở phần [Build a to do list with Graphql in rails 5(Part 1)](http://localhost:3000/graphiql) mình đã giới thiệu qua graphql và chuẩn bị một số thứ như init project, setup gem. Ở bài này mình sẽ đi vào tìm hiểu GraphQL trong rails 5. 

## The API
Để bắt đầu với GraphQL chúng ta cần setup nó. Bắt đầu với việc  [`install graphql gem`](https://github.com/rmosolgo/graphql-ruby) bạn chạy lệnh sau:
```
rails g graphql:install
```
Khi chạy câu lệnh trên nó sẽ tạo 1 folder `app/graphql` và bên trong folder này có 2 folder `mutations` và `types`. Ngoài ra còn tạo ra một file controller `graphql_controller.rb`. Trong seri này chúng ta chưa tìm hiểu về controller mà chỉ tập trung vào TDD. 

Trước khi vào tìm hiểu syntax thì chúng ta chuẩn bị  một số thứ về `rspec`.

Bạn chạy 2 lệnh sau để tạo thư mục chứa file test nào
```
mkdir spec/graphql
mkdir spec/graphql/types spec/graphql/mutations
```

Để hỗ trợ trong việc viết test về `graphql` chúng ta thêm gem [`rspec-graphql_matchers`](https://github.com/khamusa/rspec-graphql_matchers) vào test group  trong `Gemfile`

```
group :test do
  # [...]
  gem 'rspec-graphql_matchers'
end
```

Sau đó chạy `bundle install` để install nó.

Như đã giới thiệu ở bài trước chúng ta sẽ tìm hiểu về 4 concepts/terms trong graphql: `Schema`, `Types`, `Queries` and `Mutations`

## Schema
Schema dùng để định nghĩa `server's API`. Nó cung cấp những `point` cho sữ tương tác giữa `server` và `client`. Khi chúng ta `generate` grahql sẽ tạo ra file `todos_graphql_api_schema.rb` trong folder `graphql`

```
class TodosGrapqlApiSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)
end
```

Bạn có thể đọc thêm ở [bài viết này](https://www.prisma.io/blog/graphql-server-basics-the-schema-ac5e2950214e)

## Types
Grahql sử dụng hệ thống `Types` để định nghĩa các tập hợp dữ liệu bạn có thể query trong API của bạn. Mỗi `type` sẽ có những `field` dùng để định nghĩa nhưng `field` mà `type` đó có thể trả về dữ liệu, nó rất đơn giản giống như một `string` hoặc `integer` tương ứng với một `column` trong `database`

Examples:
```
module Types
    class TodoListType < Types::BasicObject
        name 'TodoListType'
        description 'The Todo List Type'
        
        field :id, ID, null: false,
        field :title, String, null: false
    end
end
```

Chúng ta tìm hiểu một chút về các syntax có trong đoạn code trên:
* `name`: Đơn giản chỉ là định nghĩa tên cho `type` của bạn. Tên đặt theo kiểu `camel-case` và không nên sử dụng `dấu cách`
* `description`: Giúp người đọc hiểu được `your code` những dữ liệu nào mà `type` này trả về
* `field`: định nghĩa những `data` bạn có thể lấy trong `object`

Để hiểu rõ hơn về `Types` bạn tìm hiểu thêm ở [GraphQL official documentation](https://graphql.org/learn/schema/#type-system)

Bây giờ chúng ta định nghĩa `type` cho todo_list và item
```
touch app/graphql/todo_list_type.rb app/graphql/item_type.rb
```
Tiếp tục tạo 2 file test cho chúng:
```
touch spec/graphql/types/todo_list_type_spec.rb spec/graphql/types/item_type_spec.rb
```

Trước khi vào viết test chúng ta config lại file `rspec_helper` một chút để có thể tạo instance of type thông qua helper: 

```
RSpec.configure do |config|
  def set_graphql_type
    self.let(:subject) do
      self.described_class
    end
  end

  # ...
end
```

Chúng ta mở file `spec/graphql/types/todo_list_type_spec.rb` và bỏ đoạn lệnh sau vào:

```
require "rails_helper"

RSpec.describe Types::TodoListType do
	set_graphql_type

	it 'has an :id field of ID type' do
       expect(subject.fields["id"].type.to_type_signature).to eq "ID!"
       expect(subject.fields["title"].type.to_type_signature).to eq "String!"
    end
end
```

Sau đó run lệnh sau: 
```
rspec spec/graphql/types/todo_list_type_spec.rb
```
Bạn sẽ thấy test case trên không thể `pass` được. Bây giờ chúng ta cập nhật lại một chút cho nó `pass`. 

Mở file `app/graphql/types/todo_list_type.rb` và cập nhật lại như sau:
```
module Types
  class TodoListType < Types::BaseObject
    # name 'TodoListType'
    description 'The Todo List type'

    field :id, ID, null: false
    field :title, String, null: false
  end
end
```
Giải thích một chút về đoạn code trên, ở đây chúng ta định nghĩa một `type` có name là `TodoListType`, type này có 2 filed `id` và `title` tương ứng với 2 columns trong model `todo_list` là `id` và `tittle`.

Quay lại chạy lệnh `rspec spec/graphql/types/todo_list_type_spec.rb`, test sẽ `pass`.

Tiếp tục tương tự làm đối với `item` như sau:
`spec/graphql/types/item_type_spec.rb`

```
require "rails_helper"

RSpec.describe Types::ItemType do
	set_graphql_type

	it 'has an :id field of ID type' do
    # Ensure that the field id is of type ID
       expect(subject.fields["id"].type.to_type_signature).to eq "ID!"
       expect(subject.fields["name"].type.to_type_signature).to eq "String!"
    end
end
```

Chạy lệnh `rspec spec/graphql/types/item_type_spec.rb` -> kết quả màn hình sẽ `đỏ`.
Thêm vào file `app/graphql/types/item_type.rb`:

```
module Types
	class ItemType < Types::BaseObject
		description 'Item Type'

		field :id, ID, null: false
		field :name, String, null: false
	end
end
```

=> Bạn chạy lại lệnh `rspec`, lúc này test case sẽ pass.

Hôm nay mình xin dừng lại tại đây, hôm sau mình sẽ tiếp tục giới thiệu về `Queries` và `Mutations`.

Cảm ơn các bạn đã đọc.

Happy coding!