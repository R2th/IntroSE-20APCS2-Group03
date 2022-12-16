Viết 1 bài ngắn ngắn thế này kể ra cũng không bõ cho lắm, nhưng 2 điều chỉnh khi search với Ransack ở đây thì toàn được hướng dẫn rời rạc trên Stackoverflow nên mình viết bài này ra. Rất mong các bạn chia sẻ thêm các case của các bạn phải chỉnh sửa khi dùng gem Ransack để mình có thể bổ sung thêm ở bài viết.

# Lập 1 project Rails và chuẩn bị các bước

Ở bước này chạy lệnh `rails new`, chuẩn bị các model và thêm gem Ransack. Do cũng lười biếng nên mình xin được phép skip bước này. Tuy nhiên thì mình sẽ up lên ảnh các bảng trong csdl mà mình sẽ dùng trong bài này.

![](https://images.viblo.asia/6260aa36-28e6-42b8-8c22-f7e5aa3e3908.png)

Sau đó, bạn làm 1 form search có các filter: từ khoá tìm kiếm, tag, số comment. Và chúng ta đi vào vấn đề 1.
# Vấn đề 1: Tìm kiếm các tag cách nhau bằng dấu phẩy
Yêu cầu bạn nhận được là ở form tìm kiếm tag, bạn có thể gõ nhiều tag, mỗi tag cách nhau bằng 1 dấu phẩy. Kết quả trả ra phải chứa 1 trong các tag ấy.

Phân tích ở đây là chúng ta dùng mối quan hệ là OR. Và chúng ta sẽ phải có cách tác động tới input với `split()` của Ruby.

Vậy code sẽ được viết như sau
```ruby
class PostsController < ApplicationController
  def index
    params[:q][:combinator] = "or"
    params[:q][:groupings] = []
    custom_words = params[:q][:tags_name_cont_any]
    custom_words.split(",").each_with_index do |word, index|
      params[:q][:groupings][index] = {tags_name_cont_any: word}
    end
    @q = Post.ransack(params[:q])
    @pre_posts = @q.result
                   .includes(:tags)
    @posts = if params[:tag]
               @posts.tagged_with(params[:tag]).page(params[:page])
                         .per(Settings.max_post_number_per_page)
             else
               @posts.page(params[:page])
                         .per(Settings.max_post_number_per_page)
             end
  end
end
```
Và ở view bạn đặt
```erb
<%= search_form_for @q do |f| %>
    ...
    <%= f.search_field :tags_name_cont_any %>
<% end %>
```
Tìm kiếm thoả mãn rồi, nhưng nhìn độ to của `index` trông kinh dị quá. Thế nên mình viết lại code như sau
```ruby
class PostsController < ApplicationController
  before_action :after_enter_tags_field, only: :index

  def index
    @q = Post.ransack(params[:q])
    @pre_posts = @q.result
                   .includes(:tags)
    @posts = if params[:tag]
               @pre_posts.tagged_with(params[:tag]).page(params[:page])
                         .per(Settings.max_post_number_per_page)
             else
               @pre_posts.page(params[:page])
                         .per(Settings.max_post_number_per_page)
             end
  end

  private

  def after_enter_tags_field
    return unless params[:q]

    params[:q][:combinator] = "or"
    params[:q][:groupings] = []
    custom_words = params[:q][:tags_name_cont_any]
    custom_words.split(",").each_with_index do |word, index|
      params[:q][:groupings][index] = {tags_name_cont_any: word}
    end
  end
end
```
Như vậy trông đỡ kinh dị hơn, dù có vẻ vẫn chưa gọn lắm
# Vấn đề 2: Tìm kiếm dựa theo số lượng comment
Vấn đề tiếp theo đặt ra là tìm kiếm và trả ra kết quả của các post có số comment lớn hơn 1 con số nhất định. Lúc này chúng ta sẽ dùng query phụ và gem Arel

Với gem Arel, ta phải thêm như sau:
```ruby
gem "arel", git: "https://github.com/rails/arel"
```
Sau đó, tại model, ta thêm như sau
```ruby
class Post < ApplicationRecord
  has_many :comments, dependent: :destroy
  ...
  ransacker :comments_count do
    query = "(
              SELECT COUNT(comments.post_id)
              FROM comments
              WHERE comments.post_id = posts.id
              GROUP BY comments.post_id
            )"
    Arel.sql(query)
  end
end
```

Và chúng ta đã có 1 thuộc tính tên `comments_count`. Trong ransack cũng có `_gteq` để so sánh lớn hơn hoặc bằng(Greater or Equal). Vậy chúng ta chỉ cần kết hợp lại là xong
```
<%= search_form_for @q do |f| %>
    ...
    <%= f.search_field :tags_name_cont_any %>
    <%= f.number_field :spot_reviews_count_gteq %>
<% end %>
```
# Tham khảo
https://stackoverflow.com/questions/53652254/multi-term-ransack-search-in-same-field-not-working

https://stackoverflow.com/questions/52700915/how-can-i-sort-with-ransack-a-column-that-contains-count-of-the-associated-model