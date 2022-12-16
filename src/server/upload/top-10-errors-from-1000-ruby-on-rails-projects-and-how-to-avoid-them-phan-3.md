Tiếp tục series bài viết về top các lỗi thường gặp trong các dự án Ruby on Rails, chúng ta sẽ đi qua các lỗi còn lại

# 8. ActionView::Template::Error: undefined local variable or method
Đây là lỗi ActionView duy nhất trong top 10 này, và đó thực sự là một tín hiệu tốt. Càng ít công việc, càng ít lỗi xảy ra để hiển thị một view template thì càng tốt. Tuy nhiên, thỉnh thoảng vẫn hay gặp lỗi này, xảy ra khi một biến local hay một method thực sự không tồn tại.

Nó xảy ra phổ biến nhất trong các partial, trong nhiều trường hợp khác nhau, có thể bạn cần include một partial với một biến local trên một page. Chẳng hạn, nếu bạn có một partial post.html.erb chẳng hạn có chứa một template post với một biến @post được set trong controller. Khi đó bạn có thể render một partial như này:
```
<%= render @post %>
```

hoặc 

```
<%= render 'post', post: @post %>
```

hay
```
<%= render partial: 'post', locals: { post: @post } %>
```

Rails cung cấp cho chúng ta rất nhiều cách để render một parital. Nhưng option thứ 2 và thứ 3 ở đây có một sự nhầm lẫn mà bạn rất dễ mắc phải:

```
<%= render 'post', locals: { post: @post } %>
```

hoặc 

```
<%= render partial: 'post', post: @post %>
```
Sẽ raise ra lỗi một biến local hay một method không xác định. Để tránh điều này, hãy nhất quán và luôn luôn render partial với một cú pháp rõ ràng, thể hiện các biến local trong một hash:

```
<%= render partial: 'post', locals: { post: @post } %>
```

Có một trường hợp khác hay xảy ra lỗi biến local không tồn tại. Nếu trong một partial render trên một biến nhưng cần kiểm tra điều kiện của một biến khác, mà bạn chỉ truyền vào một biến vào partial. Lấy ví dụ, bạn update partial post ở trên để check một biến local:
```
<%= render partial: 'post', locals: { post: @post, show_header_image: true } %>
```

Sau đó, trong partial 
```
<h1><%= @post.title %></h1>
<%= image_tag(@post.header_image) if show_header_image %>
<!-- and so on -->
```

Việc này sẽ hoạt động tốt khi bạn truyền vào một biến local show_header_image, nhưng khi chỉ truyền vào:
```
<%= render partial: 'post', locals: { post: @post } %>
```

Nó sẽ fail với một biến local là undefined. Để kiểm tra sự tồn tại của một biến local trong một partial bạn nên kiểm tra xem nó có được xác định trước khi bạn sử dụng nó:

```
<%= image_tag(@post.header_image) if defined?(show_header_image) && show_header_image %>
```

Hoặc tốt hơn, chúng ta có thể sử dụng method local_assigns trong partial để kiểm tra tính xác định của biến:

```
<%= image_tag(@post.header_image) if local_assigns[:show_header_image] %>
```

Đối với những biến không thuộc kiểu boolean, chúng ta có thể sử dụng method fetch để handle chúng tốt hơn:

```
<%= image_tag(@post.header_image) if local_assigns.fetch(:show_header_image, false) %>
```

# 9. ActionController::UnknownFormat

Lỗi này, giống với ActionController::InvalidAuthenticityToken, là một trong những lỗi được gây ra bởi những user thiếu cẩn thận hay có mục đích xấu trên ứng dụng của bạn. Nếu bạn đang xây dựng ứng dụng mà response kiểu HTML template nhưng user nào đó yêu cầu một version JSON. Bạn sẽ thấy trong log xuất hiện lỗi này

```
ActionController::UnknownFormat (BlogPostsController#index is missing a template for this request format and variant.
request.formats: ["application/json"]
request.variant: []):
```

Người dùng sẽ nhận được response NotAcceptable 406. Trong trường hợp này, họ sẽ nhìn thấy lỗi bởi vì bạn đã không định nghĩa một template cho response này. Đây là một response bình thường, vì nếu bạn không muốn trả lại JSON, request của họ sẽ không được chấp nhận.

Tuy nhiên, bạn có thể xây dựng ứng dụng Rails của bạn để response của các request HTML thông thường, và các request JSON như API trong cùng một controller. Khi bạn bắt đầu làm việc này, bạn phải xác định các format mà bạn muốn response. Và bất kì một format nào nằm ngoài danh sách phản hồi đó đều sẽ gây ra lỗi ActionController::UnknownFormat và return lại trạng thái 406. Giả sử bạn có một action index của post như sau:

```
class BlogPostsController < ApplicationController
  def index
    respond_to do |format|
      format.html { render :index }
    end
  end
end
```

Khi client tạo một request JSON sẽ raise ra lỗi với hiển thị:

```
ActionController::UnknownFormat (ActionController::UnknownFormat):
```

để response lại một request JSON nữa, bạn nên update lại controller như sau:

```
class BlogPostsController < ApplicationController
  def create
    @blog_post = BlogPost.new(blog_post_params)
    respond_to do |format|
      if @blog_post.save
        format.html { redirect blog_post_path(@blog_post) }
        format.json { render json: @blog_post.to_json }
      else
        format.html { render :new }
        format.json { render json: @blog_post.errors.to_json }
      end
    end
  end
end
```

# 10. StandardError: An error has occurred, this and all later migrations canceled

Lỗi cuối cùng trong top 10 của chúng ta sẽ khiến chúng ta hơi thất vọng. StandardError là một class error cơ sở. Cái mà mọi lỗi khác đều kế thừa từ nó. Vì vậy, việc xảy ra và thấy nó thực sự rất chung chung. Trong thực tế, nó thường xảy ra trong quá trình migration database. 

Có một số thứ có thể khiến migration fail. Migration có thể không đồng bộ với database production thực tế. Trong trường hợp đó, bạn sẽ phải đi tìm hiểu lần lượt cái gì không đồng bộ ở đây và đi fix nó.

Giả sử bạn muốn add một trường full_name đến model users, cái mà đã có sẵn first_name và last_name. Bạn sẽ viết một migration giống như sau:

```
class AddFullNameToUser < ActiveRecord::Migration
  def up
    add_column :users, :full_name, :string
    User.find_each do |user|
      user.full_name = "#{user.first_name} #{user.last_name}"
      user.save!
    end
  end
  def down
    remove_column :users, :full_name
  end
end
```

Có rất nhiều vấn đề xảy ra ở kịch bản này:
- Nếu bất kì user nào có một dữ liệu lỗi nào đó, thì khi gọi user.save! nó sẽ bắn ra lỗi và cancel migration. 
- Thứ hai, trên production bạn có rất nhiều users, dẫn đến mất rất nhiều thời gian để migration
- Cuối cùng, ứng dụng của bạn chạy theo suốt quá trình dài, tên model User có thể thay đổi, hoặc bị xoá, dẫn đến migration bị fail.

Bạn nên thực hiện việc đó bên ngoài migration, ở ví dụ trên, bạn có thể xây dựng method full_name trong model bằng cách combine các first name và last name:

```
class User < ApplicationRecord
  def full_name
    @full_name || "#{first_name} #{last_name}"
  end
end
```

Trên đây chúng ta đã đi qua toàn bộ top 10 lỗi hay gặp trong các dự án Ruby on Rails. Hy vọng sẽ giúp ích các bạn trong công việc, thanks for reading

Nguồn:

https://rollbar.com/blog/top-10-ruby-on-rails-errors/