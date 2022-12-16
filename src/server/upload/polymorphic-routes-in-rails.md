## 1. Tổng quan
Polymorphic URL helpers là các method cho giải pháp thông minh để đặt tên cho routes trong khi chúng được gọi đến chỉ bằng một instance của Active Record model. Chúng được sử dụng kết hợp với ActionController::Resources.

Các phương thức này hữu ích khi bạn muốn tạo URL hoặc đường dẫn đến RESTful resource mà không cần phải biết chính xác loại bản ghi được đề cập.

Trước khi phiên bản Rails 1.2 ra đời, routes được viết theo cách sau:

`redirect_to :controller => "posts", :action => "show", :id => @post.id`

Cần chỉ rõ controller, action, và tham số nếu có.

Trong ví dụ trên, sẽ redirect đến action show của PostsController với `params[:id]` có giá trị là `@post.id`.

Rails 1.2 xuất hiện và cho phép sử dụng các routing helpers như sau:

`redirect_to post_path(@post)`

Với cách viết ngắn gọn hơn nhưng ý nghĩa không thay đổi, cách viết này rất được yêu thích.

`post_path` sẽ xây dựng một routes bằng cách sử dụng đối tượng `@post` và tạo ra một đường dẫn như là `/posts/1` .

Phiên bản gần đây nhất, cú pháp được phép như thế này:

`redirect_to @post`

Cách viết này ngắn gọn hơn nữa, và càng được ưa chuộng.
## 2. Sử dụng
**Sử dụng trong framework**

Polymorphic URL helpers được sử dụng ở một số nơi trong Rails:

- `url_for` có thể sử dụng nó với một bản ghi làm đối số, ví dụ: `url_for(@article)`;
- `ActionView::Helpers::FormHelper` sử dụng `polymorphic_path`, do đó bạn có thể viết `form_for(@article)` mà không phải chỉ định tham số `:url` cho action của form;
- `redirect_to` (hình thức sử dụng gián tiếp `url_for`) có thể viết `redirect_to(post)` trong controller;
- `ActionView::Helpers::AtomFeedHelper` không phải chỉ định rõ ràng các URL cho đầu vào.

**Prefixed polymorphic helpers**

Ngoài các method `polymorphic_url` và `polymorphic_path`, một số prefixed helpers có sẵn như một cách viết tắt action như:

- `edit_polymorphic_url`, `edit_polymorphic_path`
- `new_polymorphic_url`, `new_polymorphic_path`

Ví dụ:

`edit_polymorphic_path(@post) # => "/posts/1/edit"`

`polymorphic_path(@post, format: :pdf) # => "/posts/1.pdf"`

**Sử dụng với mounted engines**

Nếu một mounted engine cần sử dụng `polymorphic_url`, hãy chuyển route proxy của engines làm đối số đầu tiên cho method.

Ví dụ:

`polymorphic_url([blog, @post]) # calls blog.post_path(@post)`

`form_for([blog, @post]) # => "/blog/posts/1"`

**Method**

Có cá method là Instance Public sau: `polymorphic_path`, `polymorphic_url`

- `polymorphic_path(record_or_hash_or_array, options = {})`

    Trả về path của URL cho bản ghi.
    
- `polymorphic_url(record_or_hash_or_array, options = {})`

    Xây dựng cuộc gọi đến tên của RESTful route và trả về chuỗi URL.
    
    Ví dụ:
    
    ```
    polymorphic_url(post) # => "http://example.com/posts/1"
    polymorphic_url([blog, post]) # => "http://example.com/blogs/1/posts/1"
    polymorphic_url([:admin, blog, post]) # => "http://example.com/admin/blogs/1/posts/1"
    polymorphic_url([user, :blog, post]) # => "http://example.com/users/1/blog/posts/1"
    polymorphic_url(Comment) # => "http://example.com/comments"
    ```

**Ứng dụng thực tế với polymorphic association**

Trong Rails, có thể định nghĩa một model là polymorphic như sau:

```
class Post
  has_many :comments, as: :commentable
end
```

```
class Image
  has_many :comments, as: :commentable
end
```

```
class Comment
  belongs_to :commentable, polymorphic: true
end
```

Và resources như sau

```
resources :posts
  resources :comments
end

resources :images
  resources :comments
end
```

Có thể xem tất cả các comments của một post thông qua đường dẫn: `/posts/1/comments` (path helper là `post_comments_path`).

Đường dẫn để xem tất cả các comments của một image tương tự là: `/images/1/comments` (path helper là `image_comments_path`).

Tuy nhiên, Rails đủ thông minh để nhận biết có polymorphic association trong model và có thể tạo đường dẫn tương ứng dựa trên model bạn truyền vào. Bạn có thể sử dụng helper `polymorphic_path` (hoặc `polymorphic_url`) để có được đường dẫn chính xác.

Ví dụ:

```
polymorphic_path(@post, Comment) # => /posts/1/comments
polymorphic_path(@image, Comment) # => /images/1/comments
```

Trong controller, có thể kiểm tra sự hiện diện của `params[:post_id]` hoặc `params[:image_id]` để biết đường dẫn đang được đề cập:

```
class CommentsController < ApplicationController
  def create
    if params[:post_id]
      parent = Post.find_by id: params[:post_id]
    elsif params[:image_id]
      parent = Image.find_by id: params[:image_id]
    end
    
    comment = parent.build comment_params
    
    ...
    
  end
end
```
## 3. Hoạt động
Method `redirect_to`, giống như `link_to` và `form_for` tất cả sử dụng một method phổ biến để xây dựng URL, được gọi là `url_for`. Các method `url_for` chấp nhận nhiều kiểu dữ liệu đầu vào khác nhau, chẳng hạn như Array, String, Hash, Symbol... Đặc biệt là instance của model, `url_for`  có thể kết hợp với method khác gọi là `polymorphic_url`.

### a. Trường hợp đầu vào là instance của model
Dưới đây cùng xem những gì `redirect_to`, `url_for` và `polymorphic_url` làm với một object.

Trong trường hợp của `redirect_to @post `, trước tiên kiểm tra ` @post`, dễ dàng nhận ra đây là một object của class Post và sau đó dùng `persisted?` để xem sự tồn tại của object này trong cơ sở dữ liệu.

- **Nếu `persisted?` trả về true** thì object được lưu trữ trong cơ sở dữ liệu dưới dạng một bản ghi. Rails sẽ thực hiện như sau để xây dựng một đường dẫn:

    `"#{@post.class.name.downcase}_path(#{@post.to_param})" # => post_path(1)`

    `url_for` biết rằng object này có thể được tìm thấy theo một method với tên gọi `post_path`.  "post" trong method này lấy tên của model Post. Rails sau đó gọi method này và truyền vào `@post.to_param` (Theo mặc định, `to_param` trả về id, nhưng có thể ghi đè method này trong model để trả về một cái gì đó khác thay vì id).

    Khi method `post_path(1)` được gọi, bạn sẽ nhận được chuỗi `"/posts/1"`

- **Nếu `persisted?` trả về false**, Rails lấy đường dẫn là `posts_path`. Khi method này được gọi sẽ trả về `"/posts"`

Phía trên là cách hoạt động của Polymorphic Routes. Có thể thay thế `redirect_to` bằng `link_to`, `form_for` hoặc `form_with` và Rails sẽ giúp xây dựng URL chính xác mà bạn muốn.

**Cú pháp của form_form**

```
<%= form_for @post do |f| %>
<% end %>
```

Nếu `@post` persisted, form sẽ có HTTP method là PUT, action là` "/post/1"`, một request sẽ được gửi đến action update của PostsController. Ngược lại, form sẽ có HTTP method là POST, action là `"/posts"`, một request sẽ được gửi đến action create của PostsController.

Method `form_for` kiểm tra xem object có persisted không, và nếu có thì sẽ render một form với HTTP methed là PUT, nếu không là POST. Đây chính là cách giúp form_for có thể biến đổi linh hoạt dù có cú pháp giống hệt nhau trên cả với cả trang new và edit.

### b. Trường hợp đầu vào là một mảng các object
Cùng tìm hiểu với `form_for`

`<%= form_for [@post, @comment] do |f| %>`

`url_for` nhận ra đây là một mảng sau đó tách ra và kiểm tra chúng từng phần.

`@post` trong trường hợp này chúng ta hãy giả định đó là một instance của Post, persisted và có id là 1; `@comment` là một instance của Comment, chưa được lưu trữ trong cơ sở dữ liệu.

`url_for` cần làm ở đây là xây dựng từng phần của URL helper method bằng cách đặt từng phần trong một mảng, sau đó nối các phần tử thành một routes method và sau đó gọi routes method đó với các đối số cần thiết.

Đầu tiên, `@post` là object của class Post và persisted, do đó URL helper method sẽ bắt đầu bằng `post`. Thứ hai, `@comment` là object của class Comment và không persisted, do đó `comments` sẽ theo sau `post`. url_for hiện tại có `[:post, :comments]`.

`url_for` kết hợp các phần riêng lẻ với nhau bởi một dấu gạch dưới sau đó gắn thêm `_path`, kết quả là `post_comments_path`. Sau đó, truyền vào các đối số cần thiết, có URL helper method hoàn chỉnh:

`post_comments_path(@post) # => "/posts/1/comments"`

`form_for` sẽ biết sử dụng PUT nếu `@comment` có persisted và POST nếu không. Form được render luôn luôn dành cho object cuối cùng được chỉ định trong mảng.

### c. Trường hợp đầu vào là một mảng có chứa Symbol
Hãy xem xét một cách sử dụng phổ biến khác, một mảng chứa ít nhất một object của Symbol:

`<%= form_for [:admin, @post, @comment] do |f| %>`

`url_for` thấy rằng có một Symbol và lấy nó làm phần đầu tiên của url. Sau đó `url_for` đi kiểm tra các phần còn lại của mảng. Trong trường hợp này, giả sử cả `@post` và `@comment` đều persisted và có id tương ứng là 1 và 2. `url_for` sau đó thêm `post` và `comment` vào url, kết quả là `[:admin, :post, :comment]`. Sau đó, kết hợp chúng với nhau, truyền dữ liệu đầu vào tạo thành:

`admin_post_comment_path(@post, @comment) # => /admin/posts/1/comments/2`

### d. Trường hợp routes khác tên model
Nếu các routes không khớp với tên model của chúng thì sẽ gặp rắc rối với `url_for`.

Bạn có những tuyến đường như thế này:

`resources :posts, as: :articles`

Bạn sẽ không thể sử dụng những thứ như:

`link_to @post.title, @post` hoặc là `redirect_to @post`

Chính xác là  `article_path` chứ không phải `post_path`. Sự suy diễn đường dẫn từ tên model sẽ không thể áp dụng trong trường hợp trên.

Có thể sử dụng một cú pháp khác để thể hiện đường dẫn mới:

`link_to @post.title, [:article, id: @post.id]`

Phần tử đầu tiên của routes helper là `article_`. Sau đó, do không Symbol nào nữa, nó xây dựng một routes helper là article_url. Phần tử cuối cùng của mảng sau đó được truyền làm đối số cho phương thức này, kết thúc:

`article_url(id: post.id)`
## 4. Kết luận
Có thể sử dụng polymorphic routes với `redirect_to`, `link_to`, `form_for` và `form_with`.

Không nên dùng Hash khi định nghĩa URL của bạn với các ứng dụng Rails hiện nay. Đó là cách dùng đã quá cũ. Polymorphic routes sẽ giúp bạn cấu trúc lại code của mình để làm cho nó trông đẹp hơn.

Đừng quên thử nghiệm những kiến thức mới này vào thực tế, bạn sẽ có những trải nghiệm đầy đủ nhất.

***Tham khảo:***

[Polymorphic Routes](https://ryanbigg.com/2018/12/polymorphic-routes)

[Polymorphic Routes in Rails](http://thelazylog.com/polymorphic-routes-in-rails/)

[ActionDispatch::Routing::PolymorphicRoutes](https://api.rubyonrails.org/classes/ActionDispatch/Routing/PolymorphicRoutes.html)