## Mutations
Chào các bạn 

Ở [bài viết trước](https://viblo.asia/p/graphql-ruby-tutorial-introduction-bJzKm7dOl9N) mình đã giới thiệu sơ lược về GraphQL, có hướng dẫn build một GraphQL server đơn giản trên framwork rails qua đó giới thiệu một số khái niệm như **Type**, **Resolve**, **Schema**  và có một số so sánh nhỏ giữa GraphQL vs Rest Api để có thể thấy được vì sao và có nên sử dụng GraphQL hay không.

Ở bài này mình sẽ trình bày một khái cơ bản nữa của graphql nữa là **Mutations**

Nếu Query có thể xem *GET* request, mutations có thể được xem như *POST* / *PATCH* / *PUT* / *DELETE* request. Tất cả GraphQL mutations đều bắt đầu từ một root type được gọi là Mutation, root type này sẽ tự động ra trong file `app/graphql/types/mutation_type.rb` khi bạn chạy `rails generate graphql:install`

```
module Types
  class MutationType < Types::BaseObject
    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World"
    end
  end
end
```

Type này là một placeholder cho tất cả các mutations của GraphQL

Để ngăn chặn bất kỳ lỗi nào khi bạn lần đầu tiên bắt đầu dự án GraphQL, nó được tạo ra trường `testField` giả. Bạn sẽ có thể loại bỏ nó ngay khi bạn thêm mutation  của riêng bạn bên dưới.

Mutation type sẽ tự động xuất hiện trong  schema của bạn `app/graphql/graphql_tutorial_schema.rb`

```
class GraphqlTutorialSchema < GraphQL::Schema
  query Types::QueryType
  mutation Types::MutationType
end
```

Bây giờ chúng ta sẽ add resolver để tạo Link (model này đã được tạo ở bài viết trước)

Tạo file - `app/graphql/mutations/base_mutation.rb`
```
module Mutations
  # This class is used as a parent for all mutations, and it is the place to have common utilities 
  class BaseMutation < GraphQL::Schema::Mutation
    null false
  end
end
```
Tạo file - `app/graphql/mutations/create_link.rb`
```
module Mutations
  class CreateLink < BaseMutation
    # arguments passed to the `resolved` method
    argument :description, String, required: true
    argument :url, String, required: true

    # return type from the mutation
    type Types::LinkType

    def resolve(description: nil, url: nil)
      Link.create!(
        description: description,
        url: url,
      )
    end
  end
end
```
Sau đó để mutation này trong `app/graphql/types/mutation_type.rb`
```
module Types
  class MutationType < BaseObject
    field :create_link, mutation: Mutations::CreateLink
  end
end
```

Vậy là đã xong, bây giờ ta có thể test với GraphiQL
![](https://images.viblo.asia/5f5f53d8-eb51-4247-8ffe-7e7dfc2d2bd4.png)

## Tài liệu tham khảo
[Graphql-ruby Tutorial by Radoslav Stankov](https://www.howtographql.com/graphql-ruby/0-introduction/)