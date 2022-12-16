Xin chào mn, tiếp tục với series tìm hiểu về graphql trong rails. Hôm trước mình đã giới thiệu các bạn về Schema và Types, hôm nay mình tiếp tục tìm hiểu phần quan trọng của Graphql đó là Queries và Mutations.
## Queries
Nếu bạn đã quen thuộc với với REST, về cơ bản một method get dùng để fetch dữ liệu từ kho dữ liệu. Bạn có thể nghĩ `Queries` tương tự như `GET` nhưng nó có một số tính năng khác sau:
* Trong REST, khi chúng ta request với endpoint `/users`, có nghĩa là trả về danh sách các bản ghi `user` với mỗi record là toàn bộ các `field` của nó(`User.all`). Còn trong GraphQL bạn có thể chỉ trả về first_name, last_name hoặc bất cứ field nào bạn muốn.
*  Trong REST, để query một record bạn sử dụng `POST` nhưng trong GraphQL mọi request đều gửi dưới dạng `POST` và sử dụng chung endpoint chỉ tùy thuộc vào nó là một `Queries` hay là `Mutations` như là một phần của request.

Dưới đây là một ví dụ về một Querie từ phía Client:
```
query {
  users {
    first_name
    last_name
    email
  }
}
```

Giả định chúng ta có table `users`, và chỉ return `first_name`, `last_name` và `email`, chúng ta không cần quan tâm đến có bao nhiêu field tồn tại trong table `users`.

Quay trở lại áp dụng cho ứng dụng của chúng ta nào!
Trong folder `graphql/types` chúng ta mở file `query_type.rb`.

Bây giờ chúng ta định nghĩa một query trả về danh sách các TodoList:
```
module Types
    class QueryType < Types::BaseObject
        field :all_todo_lists, [TodoListType], null: false

        def all_todo_lists
            TodoList.all
        end
    end
end
```

* Mỗi query được đặt như một field trong root query
* Tên của query sẽ tự động `camelcased`, vd: `all_todo_lists` - > `allTodoLists`
* Method trong query accepts tham số như `object`, `context`

Chúng ta thử với `Playground`, mở trình duyệt và truy cập [http://localhost:3000/graphiql]( http://localhost:3000/graphiql) chúng ta sẽ thấy giao diện thế này:
![](https://images.viblo.asia/1523d212-fc47-41ba-bdc2-e7a29b338a71.png)

Bạn có thể click vào `Docs` để xem schema của `query` mà mình đã định nghĩa.

Hãy thử nó xem nào, bạn nhìn thấy box phía bên trái màn hình màu trắng ko, đó là nơi để mình định nghĩa query. Bây giờ thử viết câu query để lấy danh sách các `TodoList` và sau đó nhấn nút `Play` để execute câu query, kết quả bạn thu được sẽ như sau:
![](https://images.viblo.asia/d3350888-0a59-4442-b51b-a8afe4ed2714.png)

Bạn có thể test với nhìu fields của todolist

Vậy Query với argument thì sẽ thế nào?
Chúng ta mở file `query_type.rb`:
```
module Types
    class QueryType < Types::BaseObject
        field :todo_list, TodoListType, null: true do
            description "Find a todo_list with id"
            argument :id, ID, required: true
        end
        
        def todo_list(id:)
            TodoList.find id
        end
    end
end
```

Kết quả test ở `Playground`:

![](https://images.viblo.asia/effb6bb2-23e2-4bb7-ae56-09012045004c.png)
## Mutations
Khi chúng ta muốn tạo, sửa hoặc xóa các bản ghi thì chúng ta làm với `mutations`.

Dưới đây là cú pháp chung của một `mutation`
```
field :create_something, Types::SomeType do
    argument :title, !types.String
    argument :description, types.String
    
    resolve ->(obj, args, ctx) do
        SomeThing.create(
            title: args[:title],
            description: args[:description]
        )
    end
end
```

Trước tiên chúng ta tạo file test cho mutation cần viết:, bạn tạo mới file `spec/grahpql/mutations/create_todo_list_spec.rb`

```
require "rails_helper"

RSpec.describe Mutations::CreateTodoList do
	let(:args) do
		{
			title: "Do my homework"
		}
	end	

	it 'increase todo list by 1' do
		mutation = Mutations::CreateTodoList.new(object: nil, context: {}).resolve(args)

		expect(mutation.id).to eq TodoList.last.id
		expect(mutation.id).to eq TodoList.last.id
		expect(TodoList.count).to eq 1
	end
end
```

Chạy test với lệnh sau `rspec spec/graphql/mutations/create_todo_list.rb` và hiển nhiên kết quả sẽ là failed. Bắt tay vào implemnent mutation nào!

Chúng ta sẽ tạo một `TodoList` với mutations.

Trước hết ta tạo file base cho `mutation` tương tự như file `base_object` của `query`. Bạn tạo file với tên `mutations/base_mutation.rb` và chỉnh sửa nó một chút.

```
# mutations/base_mutation.rb
module Mutations
    class BaseMutation < GraphQL::Schema::Mutation
        null false
    end
end
```

Và bây giờ chúng ta định nghĩa class `CreateTodoList` kế thừa class `BaseMutation` trong file `mutations/create_todo_list.rb` để tạo mới một `TodoList`:
```
# mutations/create_todo_list.rb
module Mutations
    class CreateTodoList < BaseMutation
        argument :title, String, required: true
        
        type Types::TodoListType
        
        def resolve(title: nil)
            TodoList.create(
                title: title
            )
        end
    end
end
```

Bây giờ chúng ta `expose` `mutation` này vào `app/graphql/types/mutation_type.rb`

```
module Types
    class MutationType < Types::BaseObject
        field :create_todo_list, mutation: Mutations::CreateTodoList
    end
end
```

Bây giờ chúng ta test trên `Playground`:

![](https://images.viblo.asia/79c40d85-a55a-400f-bdc4-bbdd5bbeea91.png)

Công đoạn cuối cùng là bạn chạy lại rspec xem nó có pass ko nhé!, kết quả thu được của mình:
![](https://images.viblo.asia/1fbfbf87-0086-4f76-bbde-6088e119284a.png)

Yeah! Vậy là chúng ta đã tìm hiểu sơ qua queries và mutations trong graphql!

Mình vừa học vừa tìm hiểu nên bài viết còn nhiều sai xót nên mình xin nhận cmt của mn để học hỏi thêm ạ! Cảm ơn mọi người đã đọc.

Happy coding!

## Tài liệu tham khảo
1. [How to graphql](https://www.howtographql.com/graphql-ruby/3-mutations/)
2. [Build a to do list api with graphql in rails](https://www.codementor.io/karanjaeddy/build-a-to-do-list-api-with-graphql-api-rails-5-part-1-irjt1e7jm)