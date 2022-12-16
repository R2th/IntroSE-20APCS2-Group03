> Bài viết gốc [Rails Design Patterns: Presenter & Service Objects](https://www.rubyguides.com/2019/09/rails-patterns-presenter-service/)

Tại sao chúng ta cần sử dụng design patterns?

Vấn đề đó là cấu trúc của Rails, Model-View-Controller cho thấy kết cấu cơ bản để biết vị trí viết code. 

Nhưng vẫn chưa đủ, View sẽ trở nên lớn và đầy logic khi mục đích chung chỉ biểu diễn thông tin.

Trong controller chứa chi tiết ngoài những gì cần làm trong controller theo nhiệm vụ cơ bản của nó.

Giải pháp là gì?

Trong bài viết này có 2 giải pháp cho vấn đề trên dưới dạng design patterns.

- Sử dụng presenter pattern
- Sử dụng service object pattern

Không phải ai cũng đồng ý làm sao để thực thi nó nhưng trong bài viết sẽ có bản để có thể hoạt động được. Hãy cùng tìm hiểu các patterns đó.

### Sử dụng Presenter trong Rails

các Views để biểu diễn thông tin có nghĩa là các tệp HTML, CSS và ERB(Embedded Ruby).
Chú ý rằng không nên có bất kỳ câu truy vấn `ActiveRecord` trong các views.

Tất cả logic phải loại bỏ từ views nếu muốn nó sạch sẽ và dễ làm việc. (Logic ở đây có nghĩa là các câu lệch `if` và  toán tử `?:`

Bây giờ cách giải quyết xử lý logic trong views đó là sử dụng helpers.

Helpers là hữu ích khi chúng ta có một phương định dạng thức toàn cục có thể sử dụng trong một số các views.

Vd: Biểu diễn định dạng markdown, hiển thị ngày tháng với một định dạng nhất định, xóa một số từ cụ thể từ văn bản, vv...

#### Cách dùng
Chúng ta có thể để code trong thư mục `app/helpers` và trong tệp `date_helper.rb`.

``` ruby
module DateHelper
  def display_date_only_month_year date
    date.strftime "%B %Y"
  end
end
```

#### Lời khuyên 
Hãy luôn đưa đầu vào cho phương thức helpers qua đối số thay vì dựa vào các biến tức thời. Vì cách này sẽ giúp tránh được nhiều rắc rối :laughing: 

**Phương thức Helpers có giới hạn**  đặc biệt nếu dùng nó cho tất cả định trong các views. Vì helpers có xu hướng xây dựng và thiếu tính tổ chức.

### Thay thế các điều kiện và phương thức định dạng phức tạp

Hãy tưởng tự dạng bạn có một đoạn view như sau

``` erb
<p>
  Post title: <%= post.title.gsub "forbidden word", "" %>
  <%= link_to "Read post", post, class: "w-75 p-3 text-#{post.draft? ? "orange" : "green"} border-#{post.draft? ? "orange" : "green"}" %>
</p>
```

Đoạn code trên ngắn phải không? nhưng khi đọc code thấy phức tạp với các toán tử và lặp lại code. *Bad practice*

Hãy tạo một presenter class để giải quyết như sau

``` ruby
class PostPresenter
  attr_reader :post
  
  def initialize post
    @post = post
  end
  
  def title_without_forbidden_words
    post.title.gsub "forbidden word", ""
  end
  
  def css_color
    post.draft? ? "orange" : "green"
  end
end
```

Lưu đoạn code trên trong thư mục `app/presenters/post_presenter.rb`, tạo thư mục `presenters` nếu chưa có nhé.

``` erb
<% presenter = PostPresenter.new post %>
<p>
  Post title: <%= presenter.title_without_forbidden_words %>
  <%= link_to "Read post", post, class: "w-75 p-3 text-#{presenter.css_color} border-#{presenter.css_color}" %>
</p>
```

#### ưu điểm ở đây là:

- Xóa tất cả logic từ view
- Đặt tên có nghĩa cho định dạng và các toán tử quyết định.
- Tái sử dụng class này trong các views khác mà không lặp lại code

Đây là cách mà dùng presenter trong Rails :grin:

### Cách sử dụng các Service Subjects

Trong controller nên chỉ chứa những phần cần làm, chúng không nên chứa về cách làm sao để gửi một Tweet, tính phí khách hàng hoặc tạo tệp PDF.

Các xử lý này **nên ủy quyền** cho một service object.

Một service object là một Ruby module mà đóng gói logic để hoàn thành một hành vi.

Vd:

``` ruby
module TwitterSerivce
  def self.send_welcome_message twitter_handle
    client.update "@{twiter_handle} welcome to 'Dev studio', we hope you enjoy our music!" 
  end
  
  def self.client
    @client ||= Twitter::REST::Client.new do |config|
      config.consumer_key        = "..."
      config.consumer_secret     = "..."
      config.access_token        = "..."
      config.access_token_secret = "..."
    end
  end
end
```

Để tiện hãy lưu code dưới thư mục `app/services` và tên tệp `twitter_service.rb`.

Tại sao phải dùng cách trên? vì Rails autoloads tất cả từ thư mục `app/`, code trên sẽ sẵn có trong các controllers.

Trong controller chúng ta có thể sử dụng như sau

``` ruby
class UsersController
  def create
    TwitterService.send_welcome_message user.twitter_handle
  end
end
```

Đây là hành vi của service object.

#### Kết luận

Trong bài viết đã đưa hai pattern Rails giúp chúng ta cải tiến chất lượng code trong dự án. Hãy áp dụng nó bây giờ.

Cảm ơn các bạn đã đọc :bow: