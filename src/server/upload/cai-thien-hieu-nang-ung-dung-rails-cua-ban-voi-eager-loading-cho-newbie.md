Trước tiên thì như tiêu đề, bài viết này chỉ dành cho newbie, vì `lazy loading` và vấn đề `N+1 query` là đều rất quen thuộc với Ruby dev đã có một chút kinh nghiệm, và cũng có khá nhiều bài viết đề cập đến nó. Vì là bài viết cho các bạn new dev nên các bước làm mình sẽ viết hơi chi tiết một chút nhé :D.

![](https://images.viblo.asia/92a08d3e-bb01-4112-9b78-07247f671073.jpg)

**Active Records** và **ORM** (là gì thì bạn có thể tham khảo [câu trả lời này](https://stackoverflow.com/a/2194943)) là những công cụ rất mạnh trong Ruby on Rails(RoR), nhưng đó là chỉ khi chúng ta biết cách sử dụng sức mạnh đó. Khi mới làm quen với RoR, bạn sẽ tìm thấy vô số cách để thực hiện một nhiệm vụ tương tự, nhưng chỉ khi bạn tìm hiểu sâu hơn một chút, bạn mới thực sự biết được chi phí của việc sử dụng cái này hơn cái khác như thế nào. Sự khác biệt sẽ rõ ràng hơn nếu đó là một ứng dụng lớn, yêu cầu hiệu năng tương đối.
 
 ### Ví dụ
Bài viết này sẽ sử dụng một ví dụ xuyên suốt, tạo một ứng dụng RoR đơn giản với 2 model `Author` và `Post`, mỗi tác giả thì có thể có nhiều bài post, như sau:
 
  ```ruby
 # command: rails g scaffold Author name:string
  
 # columns: 
 #  - name: String
 
class Author < ActiveRecord::Base
   has_many :posts
end
  ```
 
 ```ruby
 # command: rails g scaffold Post title:string body:text author:references
 
 # columns: 
 #  - title: String
 #  - body: Text
 #  - author_id: Integer
 
class Post < ActiveRecord::Base
  belongs_to :author
end
 ```
 
 Và một controller cùng view tương ứng để hiển thị danh sách các bài post.
 
 ```ruby
 # app/controllers/posts_controller.rb
 
class PostsController < ApplicationController
  def index
    @posts = Post.order(created_at: :desc)
  end
end
 ```
 
 File `app/views/posts/index.html`
 ```html
 <tbody>
  <% @posts.each do |post| %>
    <tr>
      <td><%= post.title %></td>
      <td><%= post.body %></td>
      <td><%= post.author.name %></td>
    </tr>
  <% end %>
</tbody>
 ```

### Vấn đề

Mình dùng MySQL nhé, bạn hãy tạo ít dữ liệu mẫu
```
authors = Author.create([{ name: 'John' }, { name: 'Doe' }, { name: 'Manish' }])
 
Post.create(title: 'I love Tuts+', body: '', author: authors.first)
Post.create(title: 'Tuts+ is Awesome', body: '', author: authors.second)
Post.create(title: 'Long Live Tuts+', body: '', author: authors.last)
```

Chạy server lên để show ra danh sách tất cả bài post, server chạy ok, vào link [localhost:3000/posts](localhost:3000/posts) để thấy danh sách bài post:

![](https://images.viblo.asia/def0a6d9-431d-458c-9b6f-872d6a99b854.jpg)

Hãy xem nội dung log server, xem cách Ruby thực hiện query để lấy dữ liệu từ bảng:
 
 ```
Post Load (0.6ms)  SELECT "posts".* FROM "posts"  ORDER BY "posts"."created_at" DESC
Author Load (0.5ms)  SELECT  "authors".* FROM "authors" WHERE "authors"."id" = ? LIMIT 1  [["id", 3]]
Author Load (0.1ms)  SELECT  "authors".* FROM "authors" WHERE "authors"."id" = ? LIMIT 1  [["id", 2]]
Author Load (0.1ms)  SELECT  "authors".* FROM "authors" WHERE "authors"."id" = ? LIMIT 1  [["id", 1]]
 ```

Ta thấy ngoài truy vấn lấy ra tất cả bài post, khi truy vấn để tìm tác giả của mỗi bài viết thì ta sẽ phải chạy thêm query một lần tương ứng.  Trên view kia là ở dòng `<%= post.author.name %>`. Như vậy, với bảng `posts` có 3 bản ghi, ta sẽ phải chạy 4 câu query như trên, cho nên với một database có lượng dữ liệu lớn thì tương ứng sẽ có rất nhiều query phải thực thi. Hiệu năng sẽ bị giảm đáng kể, đây là vấn đề mà ta vẫn thường hay gọi là `N+1 query`.
 
Ta gặp phải vấn đề này là vì mặc định trong RoR, **ORM** sẽ sử dụng `lazy loading` - trì hoãn việc tải dữ liệu cho đến khi nào ta thực sự cần. Khi nào Ruby đọc đến dòng `post.author.name` thì mới gọi truy vấn đến bảng `authors`. Việc thực hiện nhiều query sẽ dẫn đến việc Ruby phải thao tác đến database nhiều lần, mỗi lần thực hiện là phải mở kết nối, thực hiện xong lại phải đóng kết nối lại, việc nãy sẽ tiêu tốn của bạn cực kỳ nhiều thời gian luôn nhé. Bạn có thể tìm hiểu thêm về `N+1` trên google.

### Giải quyết

Để giải quyết vấn đề trên thì Rails cung cấp cho chúng ta một tính năng đó là `eager loading`- tải trước dữ liệu cần thiết. Có nghĩa ở ta sẽ load trước các dữ liệu liên quan đến tất cả bài post (trong ví dụ trên là author) trong database, giảm bớt được một lượng lớn các câu query phải thực hiện.

Ta có 3 method với chung mục đích thực hiện `eager loading` này đó là:

- `preload()`
- `eager_load()`
- `includes()`

Hãy thử thay đổi thành cách lấy ra tất cả bài post như sau:

```ruby
def index
  @posts = Post.order(created_at: :desc).preload(:author)
end
```

Kết quả hiển thị ra view không có gì thay đổi, nhưng log thì giờ sẽ như này:

```
SELECT "posts".* FROM "posts"  ORDER BY "posts"."created_at" DESC
SELECT "authors".* FROM "authors" WHERE "authors"."id" IN (3, 2, 1)
```
 
 Với việc sử dụng truy vấn với khóa `IN`, giờ ta chỉ cần thực hiện một query duy nhất cho mỗi bảng mà thôi, Ruby đã giải quyết được vấn đề `N+1 query` được đề cập ở trên.

Tuy nhiên, bởi vì bản chất của cách sử dụng `preload` này vẫn là sinh ra từng câu query riêng biệt cho từng bảng, nên ta sẽ nảy sinh ra một số ngoại lệ về liên hệ giữa 2 bảng như sau:

- Sắp xếp các bài post theo tác giả.
- Tìm kiếm tất cả các bài post của một tác giả cụ thể.

Đây đều là những yêu cầu rất cơ bản và gần như ứng dụng nào cũng phải có :D.

Hãy cùng giải quyết các ngoại lệ trên với `eager_load` và `includes`.

### eager_load() 

#### 1. Sắp xếp theo tên tác giả

Ta cập nhật lại controller một chút như này:

```ruby
def index
  @posts = Post.order('authors.name').eager_load(:author)
end
```

Khi chạy server lên ta sẽ có log như này:

```
SELECT "posts"."id" AS t0_r0, "posts"."title" AS t0_r1, "posts"."body" AS t0_r2, "posts"."author_id" AS t0_r3, "posts"."created_at" AS t0_r4, "posts"."updated_at" AS t0_r5, "authors"."id" AS t1_r0, "authors"."name" AS t1_r1, "authors"."created_at" AS t1_r2, "authors"."updated_at" AS t1_r3 
FROM "posts"
LEFT OUTER JOIN "authors" ON "authors"."id" = "posts"."author_id"
ORDER BY authors.name
```
 
 #### 2. Tìm kiếm tất cả các bài post của một tác giả cụ thể
 
Cập nhật lại controller như này.

```ruby
def index
  @posts = Post.order(created_at: :desc).eager_load(:author).where('authors.name = ?', 'Manish')
end
```

Log sẽ như này:

```
SELECT "posts"."id" AS t0_r0, "posts"."title" AS t0_r1, "posts"."body" AS t0_r2, "posts"."author_id" AS t0_r3, "posts"."created_at" AS t0_r4, "posts"."updated_at" AS t0_r5, "authors"."id" AS t1_r0, "authors"."name" AS t1_r1, "authors"."created_at" AS t1_r2, "authors"."updated_at" AS t1_r3 
FROM "posts"
LEFT OUTER JOIN "authors" ON "authors"."id" = "posts"."author_id"
WHERE (authors.name = 'Manish')  
ORDER BY "posts"."created_at" DESC
```

Nếu bạn nắm được cơ bản SQL thì đọc log cũng dễ hiểu thôi đúng không nào, từ việc sử dụng nhiều query cho từng bảng riêng rẽ, bây giờ Ruby lại sinh ra một câu query dài hơn sử dụng phép nối giữa các bảng của MySQL. Đọc log khi sử dụng `eager_load` ta thấy:

- Luôn sử dụng `LEFT OUTER JOIN` để liên kết giữa các bảng.
- Chỉ sử dụng một câu query.

Dẫu là bớt được số lượng lớn query, tuy nhiên sử dụng `LEFT OUTER JOIN` sẽ tạo ra một query dài, có thể dẫn đến việc phải thực hiện một câu query phức tạp cho một công việc đơn giản. Và trên thực tế thì công việc ta phải thực hiện nó lại phức tạp hơn thế này nhiều. Cho nên câu query sẽ trở nên cực kỳ phức tạp, và dẫn đến có thể hiệu năng của ứng dụng lại chưa chắc được cải thiện :(.

Rất may là Rails đã cung cấp cho ta phương thức `includes()` để thực hiện các công việc phức tạp.

### `includes()`

#### 1. Sắp xếp theo tên tác giả

Thay đổi controller chút.

```ruby
def index
  @posts = Post.order('authors.name').includes(:author)
end
```

Log sẽ như này:

```
SELECT "posts"."id" AS t0_r0, "posts"."title" AS t0_r1, "posts"."body" AS t0_r2, "posts"."author_id" AS t0_r3, "posts"."created_at" AS t0_r4, "posts"."updated_at" AS t0_r5, "authors"."id" AS t1_r0, "authors"."name" AS t1_r1, "authors"."created_at" AS t1_r2, "authors"."updated_at" AS t1_r3 
FROM "posts"
LEFT OUTER JOIN "authors" ON "authors"."id" = "posts"."author_id"
ORDER BY authors.name
```

 #### 2. Tìm kiếm tất cả các bài post của một tác giả cụ thể
 
 Thay đổi controller chút.

```ruby
def index
  @posts = Post.order(created_at: :desc).includes(:author).where('authors.name = ?', 'Manish')
end
```

**Chú ý:** Với Rails 4 thì phải thêm `.references(:author)` vào cuối nhé.

Log sẽ như này:

```
SELECT "posts"."id" AS t0_r0, "posts"."title" AS t0_r1, "posts"."body" AS t0_r2, "posts"."author_id" AS t0_r3, "posts"."created_at" AS t0_r4, "posts"."updated_at" AS t0_r5, "authors"."id" AS t1_r0, "authors"."name" AS t1_r1, "authors"."created_at" AS t1_r2, "authors"."updated_at" AS t1_r3 
FROM "posts"
LEFT OUTER JOIN "authors" ON "authors"."id" = "posts"."author_id"
WHERE (authors.name = 'Manish')  
ORDER BY "posts"."created_at" DESC
```

Ta thấy cách thực hiện query sẽ giống với cách dùng `eager_load` đã đề cập ở trên.

Còn nếu chỉ đơn thuần là lấy ra các bài post với tác giả thì cách này sẽ thực hiện giống `preload()` ở trên.

```ruby
def index
  @posts = Post.order(created_at: :desc).includes(:author)
end
```

Log:

```
SELECT "posts".* FROM "posts"  ORDER BY "posts"."created_at" DESC
SELECT "authors".* FROM "authors" WHERE "authors"."id" IN (3, 2, 1)
```

Bạn có thể hiểu đơn giản là với `includes()`, Active Record sẽ lựa chọn cách làm nào tối ưu hơn giữa 2 cách sử dụng `preload()` và `eager_load()` để thực hiện.

### Phương thức `joins()`

Với việc sử dụng `eager loading` ở trên, ta đã giải quyết được vấn đề `N+1 query`, tuy nhiên hãy để ý một chút, việc sử dụng `LEFT OUTER JOIN`, có thể chúng ta sẽ phải load cả những dữ liệu không cần thiết (như ở trên ta đã load tất cả các trường của bảng `authors`). Giả sử như bảng `authors` có rất nhiều trường khác nhau nhưng ví dụ trên lại chỉ cần lấy ra trường `name` mà thôi, sẽ rất lãng phí tài nguyên để load tất cả. Bạn vẫn có thể dùng kết hợp `erger loading` với phương thức `joins()` để khắc phục vấn đề này, tuy nhiên chúng ta nên sử dụng phương thức `joins()` để thay thể là đủ. Chính trang document của Rails cũng viết như này ([tham khảo thêm ở đây](https://guides.rubyonrails.org/active_record_querying.html#specifying-conditions-on-eager-loaded-associations
)):

> Even though Active Record lets you specify conditions on the eager loaded associations just like `joins()`, the recommended way is to use `joins()` instead.

Phương thức `joins()` cũng sẽ kết nối các bảng có liên kết, tuy nhiên nó chỉ load về những dữ liệu cần thiết mà thôi.

Hãy áp dụng cho 2 bài toán ta đã đưa ra bên trên.

#### 1. Sắp xếp theo tên tác giả
```ruby
def index
  @posts = Post.order('authors.name').joins(:author)
end
```

Log 
```
SELECT "posts".* FROM "posts" INNER JOIN "authors" ON "authors"."id" = "posts"."author_id"  ORDER BY authors.name
SELECT  "authors".* FROM "authors" WHERE "authors"."id" = ? LIMIT 1  [["id", 2]]
SELECT  "authors".* FROM "authors" WHERE "authors"."id" = ? LIMIT 1  [["id", 1]]
SELECT  "authors".* FROM "authors" WHERE "authors"."id" = ? LIMIT 1  [["id", 3]]
```

 #### 2. Tìm kiếm tất cả các bài post của một tác giả cụ thể
```ruby
def index
  @posts = Post.order(created_at: :desc).joins(:author).where('authors.name = ?', 'Manish')
end
```

Log
```
SELECT "posts".* FROM "posts" INNER JOIN "authors" ON "authors"."id" = "posts"."author_id" WHERE (authors.name = 'Manish')  ORDER BY "posts"."created_at" DESC
SELECT  "authors".* FROM "authors" WHERE "authors"."id" = ? LIMIT 1  [["id", 3]]
```

Vấn đề `N+1 query` kia đã quay trở lại, tuy nhiên bạn có thể thấy bây giờ query ở dòng đầu tiên đã sử dụng `INNER JOIN` và đã không load bất cứ trường nào từ bảng quan hệ. Và để chỉ cho Ruby biết cần load chính xác những trường nào từ các bảng quan hệ, ta sẽ kết hợp sử dụng với `select()` như sau:

```
def index
  @posts = Post.order(created_at: :desc).joins(:author).select('posts.*, authors.name as author_name')
end
```

Query bây giờ sẽ gọn gàng đẹp zai hơn rất nhiều như này:

```
SELECT posts.*, authors.name as author_name 
FROM "posts"
INNER JOIN "authors" ON "authors"."id" = "posts"."author_id"
ORDER BY "posts"."created_at" DESC
```

Bên ngoài view ta chỉ cần cập nhật một chút dùng `post.author_name` thay thế cho `post.author.name` để gọi ra tác giả bài post nữa là được.

Với việc dùng `joins` kết hợp với `select` như trên, ta đã giải quyết được vấn đề `N+1 query` và cũng load những dữ liệu thực sự cần thiết ra mà thôi, tránh lãng phí tài nguyên cũng như mất thời gian. 

### Kết

Bạn có thể cân nhắc dùng `eager loading` hay là `joins` để giải quyết vấn đề `N+1 query` cho ứng dụng của mình, tùy thuộc vào từng trường hợp cụ thể. Rails đã cung cấp cho ta nhưng công cụ tuyệt vời, hãy sử dụng chúng linh hoạt.

Như mình đã nói từ đầu là bài viết này chỉ dành cho newbie, hi vọng những kiến thức trên sẽ có ích cho các bạn mới làm quen và chưa có nhiều kinh nghiệm khi dev RoR.

Cám ơn bạn đã theo giõi bài viết.

### Tham khảo

- https://code.tutsplus.com/articles/improving-the-performance-of-your-rails-app-with-eager-loading--cms-25018