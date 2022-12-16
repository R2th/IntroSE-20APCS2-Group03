# 1. Installation
## a. Gem graphql
- Để impelment GraphQL với Rails ta có thể sử dụng gem `graphql-ruby`.
- Thêm `gem graphql-ruby` vào `Gemfile`
    ```ruby
    # Gemfile
    gem "graphql"
    ```
- Chạy `bundle install` để install gem và `rails generate graphql:install` để generate ra các file cần thiết cho `GraphQL`
    ```ruby
    bundle install
    rails generate graphql:install
    ```
- Generator sẽ install thêm gem `graphiql-rails` vào trong `development` group
- Gem `graphiql-rails` cung cấp giao diện để bạn có thể test GraphQL API của bạn ở route /graphiql
    ```ruby
    # config/routes.rb
    if Rails.env.development?
        mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
      end
    ```
- Đối với Rails 6 (mà mình đang làm demo), bạn cần thêm asset của graphiql vào `manifest.js`
    ```javascript
    # app/assets/config/manifest.js
    ...
    //= link graphiql/rails/application.css
    //= link graphiql/rails/application.js
    ```
- Giao diện `grapiql`
    ![](https://images.viblo.asia/06edf6ca-10a6-4207-bd2b-83cbed228c04.png)

## b. Các file cần chú ý
- Sau khi chạy generator thí có 1 số file cần chú ý sau

### i. app/controllers/graphql_controller.rb
- Đây là file impelment `GraphqlController` với action `execute` nơi sẽ nhận request từ client, thực hiện request và trả về response cho người dùng.
- Gem `graphql` đã thêm route cho GraphQL vào `routes.rb`
    ```ruby
    # config/routes.rb
    post "/graphql", to: "graphql#execute"
    ```
- Ở file này bạn cần uncomment  `protect_from_forgery with: :null_session` để tránh các lỗi 422 liên quan đến token
    ```ruby
    # app/controllers/graphql_controller.rb
    class GraphqlController < ApplicationController
      protect_from_forgery with: :null_session

      def execute
          # ...
      end
    end
    ```

### ii. app/graphql/types/query_type.rb
- Ứng với các request dạng `GET` ở `REST API` thì sẽ được thay thế bằng `query` ở `GraphQL`
- Sau khi chạy generator thì gem `graphql` sẽ generate ra 1 example query là
    ```ruby
    # app/graphql/types/query_type.rb
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World!"
    end
    ```
- Bạn có thể sử dụng POST MAN để gửi POST request lên /graphql với params query là
    ```graphql
    query {
      testField
    }
    ```
- Bạn cần chú ý sử dụng `camelCase` với `GraphQL` thay vì `snake_case` như ruby
- Response trả về sẽ có dạng:
    ```json
    {
        "data": {
            "testField": "Hello World!"
        }
    }
    ```
- Trong đó
1. `data` là node mặc định của `GraphQL`
2. `testField` là field mà bạn đã truy vấn
3. `Hello World!` là giá trị được trả về của field `testField` được khai báo trong hàm `test_field` ở `query_type.rb`
- Query `testField` với `graphiql`
    ![](https://images.viblo.asia/45ae2380-2dc7-4270-ab47-5fa57f869e7d.png)

### iii. app/graphql/types/mutation_type.rb
- Ứng với các request dạng `POST`, `PUT`, `PATCH`, `PATCH` ở `REST API` thì sẽ được thay thế bằng `mutation` ở `GraphQL`
- Sau khi chạy generator thì gem `graphql` sẽ generate ra 1 example mutation là
    ```ruby
    # app/graphql/types/mutation_type.rb
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World"
    end
    ```
- Bạn có thể sử dụng POST MAN để gửi POST request lên /graphql với params query là
    ```graphql
    mutation {
      testField
    }
    ```
- Bạn cần chú ý sử dụng `camelCase` với `GraphQL` thay vì `snake_case` như ruby
- Response trả về sẽ có dạng:
    ```json
    {
        "data": {
            "testField": "Hello World!"
        }
    }
    ```
- Trong đó
1. `data` là node mặc định của `GraphQL`
2. `testField` là field mà bạn đã truy vấn
3. `Hello World!` là giá trị được trả về của field `testField` được khai báo trong hàm `test_field` ở `query_type.rb`
- Mutation `testField` với `graphiql`
    ![](https://images.viblo.asia/01b1abe2-6aa4-4cab-8338-7fe05caf081b.png)

# 2. Query với model
- Sau khi đã hiểu đc cách `GraphQL` hoạt động thông qua example `query` và `mutation`
- Ta có thể bắt đầu viết các `query` và `mutation` của mình
- Các bạn tạo 1 model Post gồm id, title, content để test nha =))
    ```ruby
    rails g model post title content:text
    rails db:migrate
    ```
- Install thêm gem `ffaker` để tạo seed data nữa nha
    ```ruby
    # Gemfile
    gem "ffaker"
    
    # db/seeds.rb
    100.times do
      Post.create title: FFaker::Lorem.sentence, content: FFaker::Lorem.paragraph
    end
    ```
- Chạy seed
    ```bash
    rails db:seed
    ```
- Done bước chuẩn bị =))

## a. Tạo type ứng với model
- Ta cần tạo type cho model `Post` trước
    ```ruby
    rails g graphql:object Post
    ```
- Sau khi chạy generator ta sẽ nhận file `post_type.rb` có nội dung sau
    ```ruby
    # app/graphql/types/post_type.rb
    module Types
      class PostType < Types::BaseObject
        field :id, ID, null: false
        field :title, String, null: true
        field :content, String, null: true

        field :created_at, GraphQL::Types::ISO8601DateTime, null: false
        field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
      end
    end
    ```
- Trong đó `field` là từ khóa để khai báo field của type
- `id`, `title`, `content`, `created_at`, `updated_at` là các field name, chúng map với các column của table `posts`
- `ID`, `String`, `GraphQL::Types::ISO8601DateTime` là các kiểu dữ liệu của gem `graphql`
- `null: true / false` cho ta biết field này có chập nhận trả về giá tri `null` hay không

## b. Khai báo query
- Chúng ta sẽ bắt đầu với action `posts#index` bên `REST` mapping với query `posts`bên `GraphQL`
    ```ruby
    # app/graphql/types/query_type.rb

    field :posts, [Types::PostType], null: false
    ```
- Trong đó `posts` là tên của query
- `[Types::PostType]` là kiểu dữ liệu trả về
- `null: false` là không cháp nhận dữ liệu trả về là `null`

## c. Implement logic cho query
- Khai báo method `posts` ứng với query `post`
- Method này cần trả về 1 mảng `Post`
    ```ruby
    # app/graphql/types/query_type.rb

    field :posts, [Types::PostType], null: false
    def posts
      Post.all
    end
    ```

## d. Test query
- Gửi request lên graphql với query có dạng
    ```graphql
    query {
      posts {
        id
      }
    }
    ```
- Response trả về có dạng
    ```json
    {
      "data": {
        "posts": [
          {
            "id": "1"
          },
          {
            "id": "2"
          },
          ...
          {
            id: "100"
          }
        ]
      }
    }
    ```
- Gửi request lên graphql với query các field khác của post
    ```graphql
    query {
      posts {
        id
        title
        content
        createdAt
        updatedAt
      }
    }
    ```
- Response trả về có dạng
    ```json
    {
      "data": {
        "posts": [
          {
            "id": "1",
            "title": "Id unde minus iure temporibus.",
            "content": "Numquam autem inventore beatae",
            "createdAt": "2021-05-20T12:27:46Z",
            "updatedAt": "2021-05-20T12:27:46Z"
          },
          ...  
        ]
      }
    }
    ```
- Thành công bước đấu, ăn cái bánh uống ly nước được rồi :D :D :D
- Vậy giả sử muốn query 1 field không có trong DB của Post thì làm sao ? sang phần tiếp theo nha =))

## e. Custom field
- Giả sử 1 ngày đẹp trời KH muốn query thêm field `bio` với post nhưng field này không được lưu trong database (ví dụ muốn GET bio của post phải gọi API của bên thứ 3 hoặc logic gì khác)
- Ta cần thêm `field :bio` vào `PostType` và khai báo hàm `bio` để trả về giá trị cho field bio
- Tương tự như hàm `test_field` để trả về giá trị cho field `test_field` trong `query_type.rb` hoặc `mutation_type.rb`
    ```ruby
    # app/graphql/types/post_type.rb
    module Types
      class PostType < Types::BaseObject
        ...
        field :bio, String, null: false
        def bio
          # Example call PostAPI to get post's bio
          # PostAPI.find(object.id).bio
          FFaker::Lorem.sentence
        end
      end
    end
    ```
- Trong method `bio` mình đang gọi `object`
- Object này chính là post mà `PostType` đang sử dụng để trả về giá trị cho các file
- Bạn có thể nhìn lại đoạn code trong `QueryType` để hiểu hơn
    ```ruby
    # app/graphql/types/query_type.rb
    module Types
      class QueryType < Types::BaseObject
        ....
        field :posts, [Types::PostType], null: false
        def posts
          Post.all
        end
      end
    end
    ```
- Mỗi `Types::PostType` sẽ được initialize với `object` là post được trả về từ `Post.all`
- Gửi request lên graphql với query có dạng
    ```graphql
    query {
      posts {
        id
        bio
      }
    }
    ```
- Response trả về có dạng
    ```json
    {
      "data": {
        "posts": [
          {
            "id": "1",
            "bio": "Eaque recusandae aspernatur perferendis vero in nobis aperiam."
          },
          {
            "id": "2",
            "bio": "Quod itaque corporis debitis inventore iste laborum sequi illum."
          },
          ...
          {
            id: "100",
            "bio": "Similique iusto explicabo voluptate reiciendis quisquam expedita atque optio."
          }
        ]
      }
    }
    ```
- Các `field :id, :title` ta không cần khai báo các hàm `id`, `title` tương ứng trong `Types::PostType` vì các hàm này sẽ được delegate đến các hàm `id`, `title`
    ```ruby
    # app/graphql/types/post_type.rb
    module Types
      class PostType < Types::BaseObject
        field :id, ID, null: false
        # có 1 hàm id và delegate tới hàm id của post
        # def id
        #  object.ì
        # end
      end
    end
    ```
- Áp dụng tương tự ta có thể move hàm bio vào model Post
    ```ruby
    # app/graphql/types/post_type.rb
    module Types
      class PostType < Types::BaseObject
        field :id, ID, null: false
        field :title, String, null: true
        field :content, String, null: true

        field :created_at, GraphQL::Types::ISO8601DateTime, null: false
        field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

        field :bio, String, null: false
      end
    end
    ```

## f. Association field
- Ngoài các field có trong database, custom field như các ví dụ trên, ta còn có thể trả về field ứng với các association của record
- Ví dụ khi query post ra cần query thêm comments của post
- Let's start
- Tạo model Comment
    ```ruby
    rails g model Comment post:references content:text
    ```
- Update code vào các file cần thiết
    ```ruby
    # app/models/post.rb
    class Post < ApplicationRecord
      has_many :comments
    end

    # app/models/post.rb
    class Comment < ApplicationRecord
      belongs_to :post
    end

    # db/seeds.rb
    100.times do
      post = Post.create title: FFaker::Lorem.sentence, content: FFaker::Lorem.paragraph
      3.times { post.comments.create! content: FFaker::Lorem.sentence }
    end
    ```
- Run your code =))
    ```ruby
    rails db:migrate
    rails db:seed
    ```
- Chạy graph generator với Comment
    ```ruby
    rails g graphql:object Comment
    ```
- Generator sinh ra class `CommentType`
    ``` ruby
    # app/graphql/types/comment_type.rb
    module Types
      class CommentType < Types::BaseObject
        field :id, ID, null: false
        field :post_id, Integer, null: false
        field :content, String, null: true
        field :created_at, GraphQL::Types::ISO8601DateTime, null: false
        field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
      end
    end
    ```
- Thêm field `comments` vào `PostType` như sau
    ```ruby
    # app/graphql/types/post_type.rb
    module Types
      class PostType < Types::BaseObject
        ...
        field :comments, [Types::CommentType], null: false
      end
    end
    ```
- Gửi request lên graphql với query có dạng
    ```graphql
    query {
      posts {
        id
        bio
        comments {
          id
          content
        }
      }
    }
    ```
- Response trả về có dạng
    ```json
    {
      "data": {
        "posts": [
          {
            "id": "1",
            "bio": "Eaque recusandae aspernatur perferendis vero in nobis aperiam.",
            "comments": [
              {
                "id": "1",
                "content": "Dignissimos perspiciatis nam qui minus velit."
              },
              {
                "id": "2",
                "content": "Provident unde sed eaque modi eius reiciendis."
              },
              {
                "id": "3",
                "content": "Tempora repellendus nisi incidunt quasi adipisci quod molestiae."
              }
            ]
          },
          {
            "id": "2",
            "bio": "Quod itaque corporis debitis inventore iste laborum sequi illum.",
            "comments": [
              {
                "id": "4",
                "content": "Facilis exercitationem accusamus ipsa nostrum sint vitae at maiores."
              },
              {
                "id": "5",
                "content": "Aut aspernatur maiores fugit reiciendis aperiam."
              },
              {
                "id": "6",
                "content": "Dignissimos cumque recusandae eum magnam."
              }
            ]
          },
          ...
          {
            id: "100",
            "bio": "Similique iusto explicabo voluptate reiciendis quisquam expedita atque optio.",
            "comments": []
          }
        ]
      }
    }
    ```

## g. Thêm params vào query
- Hiện tại với query `posts` chúng ra đang query `Post.all` và trả về tất cả post
- Dự án thực tế sẽ không ai làm như vậy cả =))
- Chúng ra cần truyển thêm 1 số thông tin như `page`, `per` để thực hiện pagination =))
- Ví dụ
    ```graphql
    query {
      posts(page: 1, per: 10) {
        id
        title
        content
        bio
      }
    }
    ```
- Let's start =))
- Để thêm params vào query chúng ra sử dụng keywork `argument`
- Với ví dụ trên ta sẽ update lại file code như sau
    ```ruby
    # app/graphql/types/query_type.rb
    module Types
      class QueryType < Types::BaseObject
        ... 
        field :posts, [Types::PostType], null: false do
          argument :page, Int, required: true
          argument :per, Int, required: true
        end
        def posts(page:, per: )
          Post.page(page).per(per)
        end
      end
    end
    ```
- Trong đó `argument` là từ khóa để khai báo params cho query
- `:page`, `:per` là tên của params
- `Int` là kiểu dữ liệu của params
- `required` là params có bắt buộc hay không
-  Hàm `posts` đang nhận 1 tham số dạng hash với 2 key là page và per
-  Ta có thể khai báo hàm `posts` dưới 1 dạng khác như sau
    ```ruby
    def posts(**args)
      Post.page(args[:page]).per(args[:per])
    end
    ```
- Gửi request lên graphql với query có dạng
    ```graphql
    query {
      posts(page: 1, per: 2) {
        id
        title
      }
    }
    ```
- Response trả về có dạng
    ```json
    {
      "data": {
        "posts": [
          {
            "id": "1",
             "title": "Nam repudiandae vitae fugit facere placeat ea.",
          },
          {
            "id": "2",
            "title": "Voluptatum ullam nisi inventore placeat quisquam reiciendis.",
          }
        ]
      }
    }
    ```

## h. Resolver cho query
- Hiện tại mình đang khai báo và implement logic của query `posts` trong `query_type.rb`
- Giả sử số lượng query nhiều và logic query trở nên phức tạp hơn thì sẽ rất khó để maintain và develop
- Để giải quyết vấn đề trên ta có thể implement logic query trong resolver
- Ví dụ
    ```ruby
    # app/graphql/types/query_type.rb
    module Types
      class QueryType < Types::BaseObject
        ...
        field :posts, resolver: Resolvers::Posts::IndexResolver
      end
    end

    # app/graphql/resolvers/base_resolver.rb
    module Resolvers
      class BaseResolver < GraphQL::Schema::Resolver
      end
    end

    # app/graphql/resolvers/posts/index_resolver.rb
    module Resolvers
      class Posts::IndexResolver < Resolvers::BaseResolver
        type [Types::PostType], null: false

        argument :page, Int, required: true
        argument :per, Int, required: true

        def resolve(page:, per:)
          Post.page(page).per(per)
        end
      end
    end
    ```
- Gửi request lên graphql với query có dạng
    ```graphql
    query {
      posts(page: 1, per: 2) {
        id
        title
        comments {
          id
          content
        }
      }
    }
    ```
- Response trả về có dạng
    ```json
    {
      "data": {
        "posts": [
          {
            "id": "1",
            "title": "Nam repudiandae vitae fugit facere placeat ea.",
            "comments": [
              {
                "id": "1",
                "content": "Dignissimos perspiciatis nam qui minus velit."
              },
              {
                "id": "2",
                "content": "Provident unde sed eaque modi eius reiciendis."
              },
              {
                "id": "3",
                "content": "Tempora repellendus nisi incidunt quasi adipisci quod molestiae."
              }
            ]
          },
          {
            "id": "2",
            "title": "Voluptatum ullam nisi inventore placeat quisquam reiciendis.",
            "comments": [
              {
                "id": "4",
                "content": "Facilis exercitationem accusamus ipsa nostrum sint vitae at maiores."
              },
              {
                "id": "5",
                "content": "Aut aspernatur maiores fugit reiciendis aperiam."
              },
              {
                "id": "6",
                "content": "Dignissimos cumque recusandae eum magnam."
              }
            ]
          }
        ]
      }
    }
    ```
- Done query cơ bản =))))))))

## i. Handle error
- Chúng ta sẽ minh họa phần này bằng API `post` với id là -1
- implement các file cần thiết
    ```ruby
    # app/graphql/types/query_type.rb
    module Types
      class QueryType < Types::BaseObject
       ...
       field :post, resolver: Resolvers::Posts::ShowResolver
      end
    end

    # app/graphql/resolvers/posts/show_resolver.rb
    module Resolvers
      class Posts::ShowResolver < Resolvers::BaseResolver
        type Types::PostType, null: false

        argument :id, Int, required: true

        def resolve(id:)
          Post.find(id)
        end
      end
    end
    ```
- Gửi request lên graphql với query có dạng
    ```graphql
    query {
      post(id: 1) {
        id
        title
        comments {
          id
          content
        }
      }
    }
    ```
- Response trả về có dạng
    ```json
    {
      "data": {
        "post": {
          "id": "1",
          "title": "Nam repudiandae vitae fugit facere placeat ea.",
          "comments": [
            {
              "id": "1",
              "content": "Dignissimos perspiciatis nam qui minus velit."
            },
            {
              "id": "2",
              "content": "Provident unde sed eaque modi eius reiciendis."
            },
            {
              "id": "3",
              "content": "Tempora repellendus nisi incidunt quasi adipisci quod molestiae."
            }
          ]
        }
      }
    }
    ```
- Gửi request lên graphql với case lỗi =))
    ```graphql
    query {
      post(id: -1) {
        id
        title
        comments {
          id
          content
        }
      }
    }
    ```
- Response trả về có dạng
    ```json
    {
      "errors": [
        {
          "message": "Couldn't find Post with 'id'=-1",
          "backtrace": [
            "/home/le.tan.thanh/.rvm/gems/ruby-3.0.1/gems/activerecord-6.1.3.2/lib/active_record/core.rb:338:in `find'",
            ...
            "/home/le.tan.thanh/.rvm/gems/ruby-3.0.1/gems/puma-5.3.1/lib/puma/thread_pool.rb:145:in `block in spawn_thread'"
          ]
        }
      ],
      "data": {}
    }
    ```
- Đấy là ở môi trường development, lỗi được handle để response JSON cho developer fix
    ```ruby
    # app/controllers/graphql_controller.rb
    class GraphqlController < ApplicationController
      # If accessing from outside this domain, nullify the session
      # This allows for outside API access while preventing CSRF attacks,
      # but you'll have to authenticate your user separately
      protect_from_forgery with: :null_session

      def execute
        ...
      rescue StandardError => e
        raise e unless Rails.env.development?
        handle_error_in_development(e)
      end
    end
    ```
- Ở môi trường production sẽ trả về HTML của page 500
    ![](https://images.viblo.asia/f6f4dc07-b09e-4298-81a7-bd312078ba9e.png)
- Toang thật sự =))
- Để handle lỗi ở graphql ruby bạn thêm `rescue_from` block vào schema của graphql
- Ở ví dụ của mình là `VibloGraphqlRubySchema`
    ```ruby
    # app/graphql/viblo_graphql_ruby_schema.rb
    class VibloGraphqlRubySchema < GraphQL::Schema
     ...
     rescue_from(ActiveRecord::RecordNotFound) do |err, obj, args, ctx, field|
        raise GraphQL::ExecutionError.new err.message, extensions: {
          err: err,
          obj: obj,
          args: args,
          ctx: ctx
        }
      end
    ```
- Để trả về response lỗi, ta sử dụng `rescue_from` và raise `GraphQL::ExecutionError`
- Block `rescue_from` nhận các parmas
- `err`: error được raise ở `query_type`
- `obj` object xảy ra lỗi
- `args` parmas mà query lỗi nhân vào
- `ctx` context mà `graphql_controller` truyền vào `query_type`
- Với `GraphQL::ExecutionError` ngoài message lỗi ta có thể truyền thêm 1 params là extensions để custom thêm các field trả về
- Gửi request lên graphql với case lỗi =))
    ```graphql
    query {
      post(id: -1) {
        id
        title
        comments {
          id
          content
        }
      }
    }
    ```
- Response trả về có dạng
    ```json
    {
      "data": null,
      "errors": [
        {
          "message": "Couldn't find Post with 'id'=-1",
          "locations": [
            {
              "line": 2,
              "column": 7
            }
          ],
          "path": [
            "post"
          ],
          "extensions": {
            "err": "Couldn't find Post with 'id'=-1",
            "obj": null,
            "args": {
              "id": -1
            },
            "ctx": {}
          }
        }
      ]
    }
    ```
- Done phần handle lỗi, khá giống `rescue_from` để handle lỗi ở controller nhỉ =))

# 3. Mutation với model
- Các kiến thức đổi với mutation cũng tương tự như với query, bạn chỉ cần chú ý
    1. Khai báo mutation ở file `mutation_type.rb`
    2. Thay `resolver` với `mutation`
- Let's start, tạo 1 cái mutation `create_post` nha các bạn
    ```ruby
    # app/graphql/types/mutation_type.rb
    module Types
      class MutationType < Types::BaseObject
        field :create_post, mutation: Mutations::Posts::CreateMutation
      end
    end

    # app/graphql/mutations/posts/create_mutation.rb
    module Mutations
      class Posts::CreateMutation < Mutations::BaseMutation
        argument :title, String, required: true
        argument :content, String, required: true

        field :post, Types::PostType, null: false

        def resolve(title:, content:)
          {
            post: Post.create!(title: title, content: content)
          }
        end
      end
    end
    ```
- Gửi request lên graphql 
    ```graphql
    mutation {
      createPost(input: {title: "title", content: ""}) {
        id
        title
        content
        comments {
          id
          content
        }
      }
    }
    ```
- Response trả về có dạng
    ```json
    {
      "data": {
        "createPost": {
          "post": {
            "id": "110",
            "title": "title",
            "content": "content",
            "comments": []
          }
        }
      }
    }
    ```
- Bạn cũng có thể bổ sung thêm `field :erors` để chứa message lỗi trong trường hợp create post lỗi
    ```ruby
    # app/graphql/mutations/posts/create_mutation.rb
    module Mutations
      class Posts::CreateMutation < Mutations::BaseMutation
        ...
        field :post, Types::PostType, null: false
        field :errors, [String], null: false

        ...
      end
    end
    ```

# 4. Advance
- Ngoài ra cón có 1 số topic khá hay về `GraphQL` như sau
- `Subscriptions` để theo dõi sự kiên (có thể hiểu như 1 dạng callback)
- `Input Object` trong các ví dụ trên các argument đều là các kiểu có sẵn của GraphQL, sử dụng input object để tạp thêm kiểu dữ liệu mới cho argument
- `Validation` cung cấp các validate cho field tương tự như với model

# 5. Link tham khảo
- graphql: https://graphql.org/
- graphql-ruby: https://graphql-ruby.org/getting_started
- Sample code: https://github.com/thanhlt-1007/viblo_graphql_ruby
- Happy coding