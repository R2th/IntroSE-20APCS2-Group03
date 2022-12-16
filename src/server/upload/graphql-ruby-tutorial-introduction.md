## GraphQL
Có thể bạn đã từng nghe nói về GraphQL, nếu chưa thì GraphQL là một Graph Query Language được dành cho API hay là một chuẩn API mới giúp cho client và server có thể giao tiếp để thao tác với dữ liệu, một sự thay thế cho REST (RESTful APIs), được Facebook giới thiệu cùng với Relay tại React.js Conf 2015. Kể từ khi ra đời, GraphQL có thể thay thế hoàn toàn REST bởi sự hiệu quả, mạnh mẽ và linh hoạt hơn rất nhiều.

GraphQL cho phép client có thể xác định chính xác dữ liệu cần lấy về từ server, cấu trúc dữ liệu không khô cứng 1 khuôn mẫu từ server (REST API) mà thay đổi theo từng ngữ cảnh sao cho hiệu quả nhất đối với client mà chỉ cần dùng duy nhất 1 endpoint
![](https://images.viblo.asia/5bf394ac-19f4-4cae-ae53-d7f4f6f0f208.jpg)

Hoạt động của GraphQL gồm 2 phần chính:

* **Schema**: mô tả của tất cả các trường, các mối quan hệ, các kiểu mà có thể sử dụng trong các truy vấn. Cú pháp để viết schema được gọi là Schema Definition Language (SDL)
* **Executor**:  nhận mô tả ( truy vấn ) và sử dụng các bản đồ (schema) ở trên để dẫn đường tới đích (tới các data node ) và thu gom dữ liệu luôn, tất nhiên rồi.

## GraphQL VS REST
Như đã nói ở trên, GraphQL hiệu quả, mạnh mẽ, linh hoạt hơn so với Rest vậy ta hãy  xem GraphQL hơn chỗ nào nhé :D

Khi sử dụng REST ta sẽ gặp những vấn đề sau:
* Số lượng API endpoint quá nhiều, đôi lúc sẽ phải cầm cái id này chạy tới endpoint này kết quả, sau đó cầm tập id được response chạy tới endpoint khác để lấy cái thật sự cần. Như ở trên có giới thiệu GraphQL chỉ sử dụng một endpoint duy nhất, như thế có thể khắc phục được vấn đề phụ thuộc vào quá nhiều endpoint của RESTful
* Rất khó để define ra được một chuẩn chung của dữ liệu trả về, vì đôi lúc với một model, client có thể lúc thì cần fields này, lúc thì cần những fields khác.
* Khi mà đổi một cái gì đó, ví dụ schema, thì không biết những chỗ nào bị ảnh hưởng.

GraphQL ra đời để khắc phục những vấn đề đó, cải thiện rất nhiều về Performance
![](https://images.viblo.asia/35f78c26-d2f1-4636-99b2-32187b794ac4.png)

## GraphQL với Rails
Trên là phần giới thiệu sơ lược về GraphQL, để hiểu thêm ta hay cùng build một GraphQL server đơn giản trên framwork rails nhé :D

Đầu tiên ta hãy tạo một ứng dụng rails 
```
rails new graphql-tutorial
cd graphql-tutorial
rails db:create
```
Mở  Gemfile và thêm gem của GraphQL vào:
```
gem 'graphql', '1.7.4'
gem 'graphiql-rails', group: :development
```
Sau đó chạy:
```
bundle update
rails generate graphql:install
```
Kết quả sẽ tạo ra một thư mục app / graphql mới, đó là nơi mà chúng ta sẽ dành phần lớn thời gian. Nó cũng đã thêm một một controller mới và định nghĩa thêm vào routes.rb. Không giống như các ứng dụng Rails điển hình, chúng ta hầu như không bao giờ làm việc với controller và routes file
```
#routes.rb
Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  post "/graphql", to: "graphql#execute"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
```
Chúng ta sẽ tạo model Link gồm các trường: url, description để thực hiện truy vấn đầu tiên là lấy tất cả các links
```
rails generate model Link url:string description:text
rails db:migrate
```
Bây giờ chúng ta định nghĩa GraphQL Type cho links. Vậy **GraphQL Type** là gì? nó là model trong GraphQL, nên sẽ có một ánh xạ 1-1 giữa các model của bạn và các GraphQL Type)
```
# defines a new GraphQL type
Types::LinkType = GraphQL::ObjectType.define do
  # this type is named `Link`
  name 'Link'

  # it has the following fields
  field :id, !types.ID
  field :url, !types.String
  field :description, !types.String
end
```
Chúng ta đã định nghĩa GraphQL Type, nhưng server vẫn chưa biết cách để xử lý nó, để giải quyết điều đó chũng ta sẽ viết một **Resolver**(Là function mà GraphQL server dùng để lấy dữ liệu cho một truy vấn cụ thể). Mỗi field của GraphQL types cần tương ứng với một resolver function. Khi một truy vấn tới server , server sẽ gọi các resolver functions tương ứng với các trường được chỉ định trong query

Tất cả GraphQL queries đều bắt đầu bằng root type được gọi là Query. 

Resolvers có thể là 1 trong 2 điều sau:

Object  để gọi phương thức với 3 đối số - obj, arg, ctx (giống lambda hoặc Proc objects)
GraphQL::Function - Ta sẽ đề cập ở phần sau

Khi chạy `rails generate graphql:install`, thì nó đã tạo ra root query type trong app/graphql/types/query_type.rb cho bạn. bây giờ hãy update nội dung của nó như sau
```
Types::QueryType = GraphQL::ObjectType.define do
  name 'Query'

  # queries are just represented as fields
  field :allLinks, !types[Types::LinkType] do
    # resolve would be called in order to fetch data for that field
    resolve -> (obj, args, ctx) { Link.all }
  end
end
```
Để kiểm tra những thứ bạn làm ở trên có đúng hay không, hay sử dụng GraphiQL (Một IDE trong trình duyệt để chạy truy vấn GraphQL). Mở brower theo địa chỉ http://localhost:3000/graphiql chạy và xem kết quả

![](https://images.viblo.asia/8a5a52ef-3f17-4536-9267-f87dea04cc32.png)

## Kết luận:
GraphQL hiện giờ cũng đang là một giải pháp được sử dụng khá rộng rãi, trên đây mình chỉ giới thiệu những khái niệm cơ bản của graphql như **Type**, **Resolve**, hay **Schema** bài viết sau mình sẽ built thêm để đầy đủ fuction CRUD như REST qua đó sẽ trình bày các khái niệm như **Mutation**. Cảm ơn các bạn đã theo dõi :D