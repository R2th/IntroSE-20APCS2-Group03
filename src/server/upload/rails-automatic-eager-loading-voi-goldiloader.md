# Introduction

Trong khi phát triển dự án của mình, mọi người ai cũng gặp vấn đề N+1 query, và thường giải quyết nó bằng cách sử dụng eager_load/includes ...
Như vậy, nó cũng không tiện cho lắm và có thể không eager_load hết các trường hợp. 

Để giải quyết vấn đề này, mình đã tìm hiểu về gem Goldiloader có khả năng tự động eager load cho mình.

# Installation
```
gem 'goldiloader'
```
```
$ bundle install
```

# Usage
Các association sẽ mặc định tự đông eager load cho mình, không cần phải config gì thêm hết. Tuy nhiên bạn vẫn có thể dùng `eager_load`, `includes` hoặc `preload` như bình thường.

Nếu bạn muốn disable việc eager load tự động này, bạn có thể dùng như sau:
+ Với scope method
```ruby
Blog.order(:name).auto_include(false)
```
+ Với association
```ruby
class Blog < ActiveRecord::Base
  has_many :posts, -> { auto_include(false) }
end
```

### fully_load
Trong một số trường hợp như sau:

```ruby
blogs = Blogs.limit(5).to_a
# SELECT * FROM blogs LIMIT 5

blogs.each do |blog|
  if blog.posts.exists?
    puts blog.posts
  else
    puts 'No posts'
  end
end
# SELECT 1 AS one FROM posts WHERE blog_id = 1 LIMIT 1
# SELECT * FROM posts WHERE blog_id IN (1,2,3,4,5)
```
Như ví dụ trên mỗi lần gọi `blog.posts.exists?` nó sẽ thực hiện query SQL. 

Các method như này bao gồm:

```ruby
first
second
third
fourth
fifth
last
size
ids_reader
empty?
exists?
```

Để tránh những trường hợp trên, mình cần sử dụng thêm fully_load vào association:

```ruby
class Blog < ActiveRecord::Base
  has_many :posts, fully_load: true
end
```

# Full Example
+ mình có các model như sau:

```ruby
class Blog < ActiveRecord::Base
  has_many :posts
end

class Post < ActiveRecord::Base
  belongs_to :blog
  belongs_to :author
end

class Author < ActiveRecord::Base
  has_many :posts
end
```
+ PostControllers có index method như sau:
```ruby
class PostsController < ApplicationController

  def index
    @blog = Blog.find(params[:blog_id])
    @posts = @blog.posts.order(published_at: :desc).limit(5)
  end
end
```
+ View index
```
<h1>Recent <%= @blog.name %> Posts</h1>
<ul>
  <% @posts.each do |post| %>
    <li><%= post.title %> - <%= post.author.name %><li>
  <% end %>
<ul>
```

+ Chạy và xem log
```sql
SELECT * FROM posts WHERE blog_id = 1 ORDER BY published_at DESC LIMIT 5
SELECT * FROM authors WHERE id IN (1,2,3,4,5)
```

Các eager load đã tự động sẵn cho mình.

## Lưu ý
Eager load trong rails có một số hạn chế mà không thể eager load được. như limit, offset, ... 

Nhự vậy gem này cũng có limitation tương tự, tức là không thể tự động eager load với những cái hạn chế này.

# Conclusion
Xác định và sử dụng eager load đúng cách sẽ làm cho performance tốt, nếu dùng không đúng có thể ảnh hưởng đến performance. 
Với gem goldiloader đã tạo cho bạn tự động việc eager load một cách nhanh chống.
Bạn có thể tham khao thêm tài liệu sau đây. 

### References:

https://github.com/salsify/goldiloader

https://www.salsify.com/blog/engineering/automatic-eager-loading-rails