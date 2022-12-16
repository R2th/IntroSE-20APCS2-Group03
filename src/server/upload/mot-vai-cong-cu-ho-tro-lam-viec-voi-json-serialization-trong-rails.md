Trong Rails, ta có nhiều gem có thể hỗ trợ ta để làm việc với JSON serialization, sau đây mình xin được giới thiệu 1 vài gem, công cụ phổ biến.

Ở đây, chúng ta sẽ dùng 2 models là `Post` và  `Comment`.
Để có thể test example code, bạn có thể khởi tạo projetc và generate models với những câu lệnh sau:
```bash
rails new jsontest
cd jsontest
bundle exec rake db:create
bundle exec rails g model post title:string content:text published:boolean
bundle exec rails g model comment author:string body:text post_id:integer
bundle exec rake db:migrate
```

```ruby
# app/models/post.rb

class Post < ActiveRecord::Base
  has_many :comments
end

# app/models/comment.rb

class Comment < ActiveRecord::Base
  belongs_to :post
end

# Let's load the test data - bundle exec rails c

post = Post.create!(title: "Post", content: "content", published: true)
Comment.create!(post: post, author: "Author", body: "Comment")
```

### [Active Model Serializers](https://github.com/rails-api/active_model_serializers)
`ActiveModel::Serializer` khá là phổ biến mặc cho master của nó chưa được release.Phiên bản ổn định hiện tại là 0.10.
Hãy bắt đầu bằng việc add gem vào Gemfile:
```bash
gem 'active_model_serializers', '~> 0.10.0'
```
Bây giờ, hãy generate models `Post` và `Comment`:
```bash
rails g serializer post
rails g serializer comment
```

Các file serializers sẽ được lưu trữ tại thư mục `app/serializers`.Trước đó, chúng ta cần thêm vào config như sau trong `config/application.rb`:
```ruby
config.autoload_paths += ["#{config.root}/app/serializers"]
```

đảm bảo rằng phần serializers của bạn có những nội dung sau:
```ruby
# app/serializers/post_serializer.rb

class PostSerializer < ActiveModel::Serializer
  has_many :comments

  attributes :id, :title, :content
end

# app/serializers/comment_serializer.rb

class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :author
end
```

Sử dụng:
```ruby
post = Post.joins(:comments).first
PostSerializer.new(post).as_json # => {:id=>12, :title=>"Post", :content=>"content", :comments=>[{:id=>201, :body=>"Comment", :author=>"Author"}]}
```

### [JSONAPI-RB](http://jsonapi-rb.org/)
`jsonapi-rb` là một thư viện Ruby trực quan, bao gồm 4 thư viện độc lập: [jsonapi-parser](https://github.com/jsonapi-rb/parser) , [ jsonapi-renderer](https://github.com/jsonapi-rb/renderer) , [jsonapi-serializable](https://github.com/jsonapi-rb/serializable) và [jsonapi-deserializable](https://github.com/jsonapi-rb/deserializable)
Add gem vào Gemfile:
```bash
gem 'jsonapi-rails'
```

bây giờ chúng ta cần update các serializers ở trong `app/serializers/post_serializer.rb` và `app/serializers/comment_serializer.rb`,
```ruby
# app/serializers/post_serializer.rb

class PostSerializer < JSONAPI::Serializable::Resource
  type 'posts'
  has_many :comments
  attributes :id, :title, :content
end

# app/serializers/comment_serializer.rb

class CommentSerializer < JSONAPI::Serializable::Resource
  type 'comments'

  attributes :id, :author, :body
end
```

Sử dụng:
```ruby
post = Post.joins(:comments).first
renderer = JSONAPI::Serializable::Renderer.new
renderer.render(post, class: { Post: PostSerializer, Comment: CommentSerializer }, include: [:comments]) # => {:data=>{:id=>"113", :type=>:posts, :attributes=>{:id=>113,
:title=>"Post",
:content=>"content"},
:relationships=>{:comments=>{:data=>[{:type=>:comments, 
:id=>"2702"}]}}}, :included=>[{:id=>"2702", :type=>:comments, 
:attributes=>{:id=>2702, :author=>"Author", :body=>"Comment"}}]}
```

### [Fast JSON API](https://github.com/Netflix/fast_jsonapi)
Thư viện là một `JSON:API serializer` rất nhanh cho Ruby Object được tạo bởi `Netflix`,
Add gem vào Gemfile:
```bash
gem 'fast_jsonapi'
```

update serializers để sử dụng `Fast JSON API`:
```ruby
# app/serializers/post_serializer.rb

class PostSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :content
  has_many :comments
end

# app/serializers/comment_serializer.rb

class CommentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :body, :author
end
```

Sử dụng:
```ruby
post = Post.joins(:comments).first
PostSerializer.new(post, include: [:comments]).serializable_hash # => 
{:data=>{:id=>"12", :type=>:post, :attributes=>{:title=>"Post", 
:content=>"content"}, :relationships=>{:comments=>{:data=>[{:id=>"201", :type=>:comment}]}}}, :included=>[{:id=>"201", :type=>:comment, 
:attributes=>{:id=>201, :body=>"Comment", :author=>"Author"}}]}
```

### [RABL](https://github.com/nesquena/rabl)
RABL (Ruby API Builder Language) là một hệ thống Ruby template để generate JSON,
Add gem vào Gemfile:
```bash
gem 'rabl'
```

Ở đây chúng ta không định nghĩa serializers trong `app/serializers`, thay vào đó ta tạo JSON template, chẳng hạn như: `app/views/post.rabl` và `app/views/comment.rabl`:
```
# app/views/post.rabl

object @job

attributes :id, :title, :content

child :comments do
  extends "comment"
end

# app/views/comment.rabl

object @comment

attributes :id, :author, :body
```

Sử dụng:
```
post = Post.joins(:comments).first
Rabl.render(post, 'post', :view_path => 'app/views', :format => :hash) # 
=> {:id=>12, :title=>"Post", :content=>"content", :comments=>[{:id=>201, :author=>"Author", :body=>"Comment"}]}
```

### [JSON API Serializers](https://github.com/fotinakis/jsonapi-serializers)
`JSONAPI::Serializers` là 1 thư viện đơn giản cho serialization đối với Ruby objects và quan hệ của chúng:
Add gem vào Gemfile:
```bash
gem 'jsonapi-serializers'
```

Update code trong thư mục `app/serializers`:
```ruby
# app/serializers/post_serializer.rb

class PostSerializer
  include JSONAPI::Serializer

  attribute :id
  attribute :title
  attribute :content

  has_many :comments
end

# app/serializers/comment_serializer.rb

class CommentSerializer
  include JSONAPI::Serializer

  attribute :id
  attribute :author
  attribute :body
end
```

Sử dụng:
```ruby
post = Post.joins(:comments).first
JSONAPI::Serializer.serialize(post, include: ['comments']) # =>
{"data"=>{"type"=>"posts", "id"=>"12", "attributes"=>{"id"=>12,
"title"=>"Post", "content"=>"content"}, "links"=>{"self"=>"/posts/12"}, 
"relationships"=>{"comments"=>{"links"=>{"self"=>"/posts/12/relationships/comments", "related"=>"/posts/12/comments"}, 
"data"=>[{"type"=>"comments", "id"=>"201"}]}}}, 
"included"=>[{"type"=>"comments", "id"=>"201", 
"attributes"=>{"id"=>201, 
"author"=>"Author", "body"=>"Comment"}, 
"links"=>{"self"=>"/comments/201"}}]}
```

### [JBuilder](https://github.com/rails/jbuilder)
JBuilder là một gem cung cấp một DSL đơn giản để khai báo các cấu trúc JSON.Lần này chúng ta không phải cập nhật Gemfile vì gem này được thêm vào mặc định là Rails
Thông thường, các cấu trúc được lưu trữ trong các tệp có phần mở rộng json.jbuilder vì vậy chúng ta phải tạo 1 file như vậy. Áp dụng đoạn code sau vào `app/views/post2.json.jbuilder`:
```ruby
json.id post.id
json.title post.title
json.content post.content

json.comments(post.comments) do |comment|
  json.id comment.id
  json.author comment.author
  json.body comment.body
end
```

Sử dụng:
```ruby
post = Post.joins(:comments).first

# With template

renderer = ApplicationController.new
renderer.render_to_string('/post2', locals: {post: post}) # => "{\"id\":114,\"title\":\"Title 0\",\"content\":\"Content 0\",\"comments\":[{\"id\":2727,\"author\":\"Author 24\",\"body\":\"Comment 24\"}]}"

# Without template

def jbuild(*args, &block)
  Jbuilder.new(*args, &block).attributes!
end

result = jbuild do |json|
  json.id post.id
  json.title post.title
  json.content post.content

  json.comments(post.comments) do |comment|
    json.id comment.id
    json.author comment.author
    json.body comment.body
  end
end

result # => {"id"=>12, "title"=>"Post", "content"=>"content", "comments"=>[{"id"=>201, "author"=>"Author", "body"=>"Comment"}]}
```

### Tham khảo
https://buttercms.com/blog/json-serialization-in-rails-a-complete-guide