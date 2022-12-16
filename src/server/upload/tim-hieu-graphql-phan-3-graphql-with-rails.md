Chào các bạn,

Ở [bài viết trước](https://viblo.asia/p/tim-hieu-graphql-phan-2-cac-khai-niem-co-ban-gAm5yROLKdb) mình đã giới thiệu qua về các khái niệm cơ bản và tư tưởng chủ đạo của GraphQL

Tuy nhiên tất cả vẫn dừng ở mức khái niệm về cách tạo queries, cách update dữ liệu bằng mutations, cách tạo schema để chỉ định các khả năng của API và xác định cách client có thể yêu cầu dữ liệu....mà chưa chỉ ra được cách xử lí dữ liệu ở server như thế nào

Mình sẽ bắt đầu với một ví dụ rất cơ bản đó là Đăng ki, Đăng nhập và Đăng xuất người dùng.

Như đã nói ở bài trước, do GraphQL chỉ là một đặc tả, bạn có thể dùng nó với bất cứ thư viện hay nền tảng nào. Ở bài viết này mình sẽ áp dụng GraphQl vào một dự án Rails

## Cài đặt GraphQL

Thêm vào Gemfile và bundle

```
gem "graphql"
```

Xong rồi chạy:

```
rails generate graphql:install
```

Kết quả sẽ tạo ra 1 thư mục app/graphql, và chúng ta chủ yếu sẽ làm việc ở đây

Ngoài ra lệnh trên sẽ tạo ra 1 controller tên là GraphqlController và thay đổi 1 chút ở routes file, các bạn có thể mở ra xem (hehe)

Xong rồi, bắt đầu nào...

## Chuẩn bị một số thứ

Giả sử bạn đang có một project Rails, và có một số models cơ bản phục vụ cho việc xác thực người dùng như sau:

Model User

```
class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  has_one :auth_token
end
```

Model UserToken

```
class AuthToken < ApplicationRecord
  belongs_to :user

  validates :token, presence: true
  validates :refresh_token, presence: true
  validates :expired_at, presence: true

  class << self
    def generate! user
      token = find_or_initialize_by user: user
      token.renew!
    end
    
    def verify token
      find_by(token: token)&.user
    end
  end

  def renew!
    // Dùng để tạo mới token
  end
end
```

Minh họa thôi nhé

## Nhảy vào GraphQL nào

### Tạo người dùng

Tạo GraphQL type để biểu diễn một người dùng:
> /graphql/types/user_type.rb

```
Types::UserType = GraphQL::ObjectType.define do
  name "User"
  field :id, !types.ID
  field :name, !types.String
  field :email, !types.String
end
```

Bây giờ chúng ta có model User và GraphQL type của nó là "UserType" với tên là "User" và các trường bắt buộc: id, name, email


Như mình đã nói các loại Query, Mutation và Subscription là các entry points cho các request được gửi bởi client.
Vì thế nên mình sẽ có các QueryType, MutationType gồm các fields là các root-field của các request tương ứng là query hay mutation

Nhớ lại bài trước, mình đã có một ví dụ về mutation để tạo người dùng là "createUser", bây giờ xây dựng nó nào.

Tất cả các GraphQL mutation bắt đầu từ một root tpye được gọi là Mutation.

> /graphql/types/mutation_type.rb

```
Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"
  
  field :createUser, Types::UserType do
    description "Create User"
    argument :name, !types.String
    argument :email, !types.String
    argument :password, !types.String
    resolve ->(_obj, args, _ctx) {
      User.create! name: args[:name], email: args[:email], password: args[:password]
    }
  end
end

```

Ở trên mình đã tạo ra một MutationType có một field là createUser

* Types::UserType chỉ định type sẽ được trả về
* description: Mô tả cho mutation
* argument: Chỉ định các đối số, sử dụng "!" bắt buộc phải có mặt
* types.String là types định nghĩa sẵn của GraphQL, chỉ định kiểu dữ liệu của argument
* resolve: hàm xử lí dữ liệu, một hàm resolve nhận vào ba đối số:
1. obj: Đối tượng trước đó, đối với một field trên root Query types thường không được sử dụng.
2. args: Các đối số được cung cấp cho field
3. ctx: Một giá trị được cung cấp cho tất cả resolver và chứa thông tin ngữ cảnh quan trọng như người dùng hiện đang đăng nhập, hoặc truy cập vào cơ sở dữ liệu....

Những cái này lúc nào gặp mình sẽ nói thêm (hehe), ở trên đây thì mình đã dùng thằng args rồi

Chạy thử nào! 

![](https://images.viblo.asia/965f1f4c-48cd-4b40-9efb-3a2ec759d329.png)

(done)

Tuy nhiên có một cách để viết resolve nữa đó là sử dụng GraphQL::Function

Lúc đó "createUser" sẽ đơn giản nhưu thế này:

> /graphql/types/mutation_type.rb

```
Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :createUser, function: Resolvers::Users::CreateUser.new
end
```

và class "Resolvers::Users::CreateUser" sẽ như sau:

> /graphql/resolvers/users/create_uer.rb

```
class Resolvers::Users::CreateUser < GraphQL::Function
  argument :name, !types.String
  argument :email, !types.String
  argument :password, !types.String

  type Types::UserType

  def call _obj, args, _ctx
    User.create! name: args[:name], email: args[:email], password: args[:password]
  end
end
```

Dể đọc dể hiểu hơn đúng không (hehe)

Như vậy là xong phần Đăng kí User rồi nhé (tất nhiên chỉ là ví dụ minh họa :v :v)

### Đăng nhập

Có người dùng rồi thì cho nó đăng nhập thôi :v

Đăng nhập thì đơn giản là nhập email và password, đúng thì trả về token để tiếp tục dùng API, mà nó cũng có thay đổi một số dữ liệu nên sẽ dùng mutation

Thêm vào MutationType:

> /graphql/types/mutation_type.rb

```
Types::MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :createUser, function: Resolvers::Users::CreateUser.new
  field :signInUser, function: Resolvers::Auth::SignInUser.new
end
```

Như vậy là đã có một mutation là "signInUser"

Viết tiếp Resolver để xử lí thôi

> /graphql/resolvers/auth/sign_in_uer.rb

```
class Resolvers::Auth::SignInUser < GraphQL::Function
  argument :email, !types.String
  argument :password, !types.String

  # Định nghĩa luôn kiểu trả về cho mutation này, ko dùng những cái đã có
  type do
    name 'SigninPayload'

    field :token, types.String
    field :user, Types::UserType
  end

  def call _obj, args, ctx
    email = args[:email]
    password = args[:password]

    # basic validation
    return unless email && password

    user = User.find_by email: email
    return unless user
    return unless user.authenticate password

    AuthToken.generate! user
    ctx[:session][:token] = user.auth_token.token

    OpenStruct.new({
      user: user,
      token: user.auth_token.token
    })
  end
end
```

Tất nhiên code signin ở đây cũng chỉ mang tính chất minh họa nha (yaoming)

Không có gì đặc biệt, ngoại trừ có sự xuất hiện của thằng "ctx", tí mình sẽ nói tới nó sau :v

Thử đăng nhập cái coi

![](https://images.viblo.asia/2b443282-e58b-4dae-8376-1000e7e75be1.png)

Với kiểu trả về tự định nghĩa ở trên thì mình có thể yêu cầu dữ liệu trả về là token và các thông tin tùy ý của user


### Đăng xuất

Đăng nhập được rồi, giờ cho nó đăng xuất thôi :v 

À mà trước khi đăng xuất thì phải có điều kiện là phải đăng nhập rồi, vậy thì làm sao để check xem user đã đăng nhập hay chưa?

Đã đến lúc dùng thèn ctx rồi:

Nhắc lại tí:

ctx: Một giá trị được cung cấp cho tất cả resolver và chứa thông tin ngữ cảnh quan trọng như người dùng hiện đang đăng nhập, hoặc truy cập vào cơ sở dữ liệu....

Là sao (??) Thôi hiểu đơn giản thì nó như là session của GraphQL, nó dùng để chia sẽ dữ liệu giữa các Resolvers

Rất đơn giản, bạn chỉ cần sửa lại cái GraphqlController đã nói ở trên như sau:

> app/controllers/graphql_controller.rb

```
class GraphqlController < ApplicationController
  skip_before_action :verify_authenticity_token

  def execute
    variables = ensure_hash params[:variables]
    query = params[:query]
    operation_name = params[:operationName]
    context = {
      session: session,
      current_user: current_user
    }
    result = NPlusOneSchema.execute query, variables: variables, context: context, operation_name: operation_name
    render json: result
  end

  private
  def ensure_hash ambiguous_param
    ....
  end

  def current_user
    return unless token = session[:token]
    AuthToken.verify token
  end
end
```

Vẫn là mang tính chất minh họa thôi nhé :v 

À mà lúc trước có nói là có thay đổi 1 chút chi đó ở routes file, ngó qua cái nào

> config/routes.rb

```
Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"
  
  .......
end
```

Quá rõ ràng rồi, với mỗi request gửi lên thì nó đều chạy vô cái hàm execute của GraphqlController và sau đó là NPlusOneSchema.execute và truyền vào thằng context, thì hiển nhiên thằng Resolver nào cũng dùng cái context đó rồi

À, cái NPlusOneSchema là gì hả (??) nó là cái schema mà mình đã giới thiệu ở bài trước đó, tí mình sẽ nói thêm, còn cái tên nó thì...tại mình dùng lại cái project cũ nên tên nó bựa thế đó (hehe)

Quay lại cái thằng Resolver "signInUser" ở trên bạn sẽ thấy cái này

```
    ctx[:session][:token] = user.auth_token.token
```

Tất nhiên cái này cũng chỉ mang tính chất minh họa thôi chứ chả ai làm thế này (yaoming)

Thường token người ta có thể gửi lên theo params hoặc là trên headers của request, nhưng ở đây mình ví dụ lưu vào nó session để xem hoạt động của thằng "ctx" luôn

Hiểu đơn giản là khi đăng nhập thành công thì mình bốc thằng session trong ctx ra rồi nhét cái token vào đó (hơi bựa :v), vì trong Resolver nó không gọi trực tiếp session được .

Và để kiểm tra có user đăng nhập hay chưa thì mình chỉ đơn giản là bốc lại cái token từ trong session ra, rồi kiếm thằng user tương ứng rồi lại quăng thằng user đó vào cái context (như đã nói, token có thể lấy từ chổ khác hay hơn)

Resolver có yêu cầu authen thì chỉ cần kiểm tra trong ctx có thằng user nào không là được

> /graphql/resolvers/base.rb

```
class Resolvers::Base < GraphQL::Function
  def authenticate! ctx
    raise GraphQL::ExecutionError.new("Authentication required") if ctx[:current_user].blank?
  end
end
```

Và tất nhiên, sửa lại các Resolver trên kế thừa từ "Resolvers::Base" nhé

> /graphql/resolvers/auth/sign_out_user.rb

```
class Resolvers::Auth::SignOutUser < Resolvers::Base
  type types.String

  def call _obj, args, ctx
    authenticate! ctx

    ctx[:current_user].auth_token&.destroy!
    ctx[:current_user] = nil
    ctx[:session][:token] = nil
    :ok
  end
end
```

Vẫn là minh họa thôi nhé

![](https://images.viblo.asia/30c71585-2f1b-4266-9c7c-f29fa954565f.png)

Đăng xuất thêm phát nữa:

![](https://images.viblo.asia/6ff47494-17bf-444d-b815-0d61c996671d.png)

(done)


### Schema

Hốt tất cả Queries và Mutations vào Schema nhé, vì nó execute ở đây mà (bỏ qua cái tên đi :v)

> app/graphql/n_plus_one_schema.rb

```
NPlusOneSchema = GraphQL::Schema.define do
  mutation Types::MutationType
  query Types::QueryType
end
```


-----
Như vậy đã xong

Hẹn gặp lại các bạn ở bài viết sau <3

-----
Tham khảo: https://www.howtographql.com

-----

## Mr.Nara