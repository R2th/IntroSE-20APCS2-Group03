Nếu bạn chưa quen với Ruby on Rails, một trong những khía cạnh đáng ngại nhất là biết cách tốt nhất để hoàn thành một chức năng nhất định. Mặc dù có rất nhiều kỹ thuật và thư viện đã xuất hiện và là cách thức ưa thích của cộng đồng, nhưng vẫn có một số best practices giúp Rails cleanest, an toàn nhất và có thể bảo trì nhất có thể.

Bài viết liệt kê ở đây là mười trong số các best practices phổ biến và hữu ích nhất mà bạn có thể sử dụng.

# 1.Fat Model, Skinny Controller
Có thể cho rằng một trong những cách quan trọng nhất để viết code rõ ràng và súc tích trong Ruby on Rails, phương châm “Fat Model, Skinny Controller” đề cập đến cách các phần M và C của MVC hoạt động lý tưởng cùng nhau. Cụ thể, bất kỳ non-response-related cũng nên đi theo model, lý tưởng nhất là trong một method có thể kiểm tra được. Trong khi đó, the “skinny” controller chỉ đơn giản là một giao diện đẹp giữa view và model.

Trong thực tế, điều này có thể yêu cầu một loạt các kiểu tái cấu trúc khác nhau, nhưng tất cả đều bắt nguồn từ một ý tưởng: bằng cách di chuyển bất kỳ non-response-related (ví dụ: đặt thông báo flash hoặc chọn chuyển hướng hoặc kết xuất một khung nhìn) cho model (thay vì controller), bạn không chỉ khuyến khích sử dụng lại nếu có thể mà bạn còn có thể kiểm tra code của mình bên ngoài ngữ cảnh của một request.

Hãy xem xét một ví dụ đơn giản. Giả sử bạn có mã như thế này:

```ruby
def index
  @published_posts = Post.all :conditions => {['published_at <= ?', Time.now]}
  @unpublished_posts = Post.all :conditions => {['published_at IS NULL OR published_at > ?', Time.now]}
end
```

Bạn có thể thay đổi nó thành:
```ruby
def index
  @published_posts = Post.all_published
  @unpublished_posts = Post.all_unpublished
end
```
Sau đó, bạn có thể di chuyển logic đến model của mình, nó có thể trông như thế này:
```ruby
def self.all_published
  all :conditions => {['published_at <= ?', Time.now]}
end
```
```ruby
def self.all_unpublished
  all :conditions => {['published_at IS NULL OR published_at > ?', Time.now]}
end
```
Với các phương thức Post.all_published và Post.all_unpublished, chúng ta không chỉ đơn giản hơn để kiểm tra code của, chúng ta còn có thể sử dụng lại cùng một điều kiện ở một vị trí khác. Nhưng thậm chí điều này vẫn chưa đủ lý tưởng.
# 2.Reusable Scopes and Relations
Trong ví dụ trên, chúng ta vẫn chưa ở mức tối ưu. Ví dụ: nếu chúng ta chỉ muốn tìm 1 bài đăng? Chúng ta phải nhân đôi các điều kiện trong một phương thức khác, điều này dẫn đến ngày càng nhiều mã rác.

May mắn thay, Rails cung cấp một cách tốt hơn way—scopes (trong các phiên bản cũ hơn của Rails, chúng được gọi là named scopes). Nói một cách đơn giản, scopes là một tập hợp các ràng buộc đối với các tương tác cơ sở dữ liệu (như điều kiện, giới hạn hoặc bù) có thể xâu chuỗi và có thể sử dụng lại. Kết quả là, chúng ta có thể gọi MyModel.my_scope.another_scope, hoặc MyModel.my_scope.first hoặc MyModel.my_scope.all.
Chúng ta có thể viết lại:
```ruby
scope :published, lambda { where('published_at < = ?', Time.now) }
scope :unpublished, lambda { where('published_at > ?', Time.now) }
```

Điều này dẫn đến mã được xây dựng tốt hơn và các truy vấn có thể sử dụng lại nhiều hơn. Như một phần thưởng, nó giúp việc soạn thảo các truy vấn rất phức tạp như tìm kiếm bằng cách thêm các mối quan hệ và phạm vi bạn cần sẽ dễ dàng hơn nhiều.
# 3.Package Your Code into Gems and Plugins
Nếu bạn đã sử dụng Ruby on Rails một thời gian đủ dài, rất có thể bạn đã nhận thấy sự hữu ích của rubygems dành cho các nhà phát triển Rails. Nếu có một vấn đề tương đối phổ biến, thì rất có thể nhà phát triển khác đã giải quyết nó.

Vì vậy, khi bạn viết code bạn nghĩ là đủ phổ biến, điều đó thường có nghĩa là bạn đã viết nó nhiều lần trước đó trong một ứng dụng khác, hãy dừng lại và suy nghĩ về cách bạn có thể trích xuất nó vào một plugin hoặc gem phù hợp cho nhiều mục đích hơn . Điều này không chỉ có ích vào lần tiếp theo bạn cần chức năng mà còn buộc bạn phải dừng lại và đánh giá cách tiếp cận vấn đề của bạn một cách thường xuyên hơn, việc trích xuất code từ một ứng dụng đã dẫn đến một thiết kế đơn giản hơn. Bạn cũng không nên quên rằng với tư cách là một nhà phát triển, việc phát hành mã nguồn mở có thể được đền đáp bằng những cách khác.

Đồng thời, dành một chút thời gian để xem các loại gem nguồn mở đã giải quyết các vấn đề của bạn. Nếu bạn không chắc chắn nên bắt đầu từ đâu, thì tìm kiếm GitHub, là một điểm xuất phát tốt chứa danh sách các plugin phổ biến nhất trong cộng đồng.
# 4.Use the Built-in Ruby Duck Typing Methods
Là một ngôn ngữ, Ruby sử dụng một số quy ước có thể giúp phát triển dễ dàng hơn. Ví dụ, việc thực hiện một phương thức cá thể to_s trên một đối tượng sẽ cung cấp cho bạn một cách tiêu chuẩn để có được một chuỗi đại diện cho đối tượng của bạn.

Bằng cách triển khai các chuyển đổi loại tiêu chuẩn này, ngoài to_s, còn có to_i cho các số nguyên và to_a cho các mảng, bạn có thể làm cho code của mình ngắn gọn hơn. Ví dụ, hãy xem phép nội suy chuỗi sau:
```ruby
"Hello there, #{user.name}"
```
Nếu bạn đặt alias thuộc tính name thành to_s, bạn có thể viết đơn giản:
```ruby
"Hello there, #{user}"
```
# 5.Manage Attribute Access
Theo mặc định, khi sử dụng gán khối trong Rails, nghĩa là, mã tương tự `User.new (params [: user]) `và `@user.update_attribut params [: user]`. Xác thực của bạn ngăn chặn dữ liệu xấu, chẳng hạn, ngăn bạn ghi đè lên một thuộc tính mà bạn không muốn thay đổi.

Để giải quyết vấn đề này, ActiveRecord sử dụng hai phương thức` attr_protected `và` attr_accessible`. Sử dụng `attr_protected`, bạn khai báo một danh sách đen các biến bạn không muốn gán (ví dụ: attr_protected: admin ,: password_hash). Sử dụng `attr_accessible`, thường được ưa thích hơn, bạn khai báo những  thuộc tính bạn có thể gán (ví dụ:` attr_accessible: login ,: email ,: password ,: password_confirmation).`

Bằng cách này, bạn ngăn chặn bất kỳ sự tấn công hàng loạt nào có thể xảy ra thông qua ứng dụng của bạn. Bằng cách này, bạn có thể buộc bạn phải đặt thủ công các giá trị thuộc tính nhất định hoặc hữu ích hơn, cung cấp phương thức được bảo vệ để sử dụng khi bạn muốn đặt giá trị.
Từ góc độ bảo mật, sử dụng` attr_accessible` và` attr_protected` buộc bạn phải suy nghĩ về những gì nên chỉnh sửa và cách bảo vệ các cách đặt thuộc tính lớp của bạn.
# 6.Use Non-database-backed Models

1101/5000
Mặc dù các model trong Rails chủ yếu dựa trên ActiveRecord :: Base hoặc một số kiểu của đối tượng mapper cho cơ sở dữ liệu, nhưng điều quan trọng cần nhớ là trong MVC, M không bị hạn chế đối với các database-backed models.

Sử dụng các non-database-backed có thể giúp tổ chức logic có thể trở nên muddy. Ví dụ: có các thư viện cung cấp cho bạn giao diện giống như ActiveRecord cho các email mẫu liên hệ.

Sử dụng ActiveModel (có sẵn trong Rails 3 trở lên), có thể lấy các đối tượng tùy ý gói gọn một tập hợp các hành vi phổ biến và sử dụng chúng làm model của bạn. Thêm các mô hình ảo cũng giúp việc tuân thủ thiết kế bộ điều khiển RESTful dễ dàng hơn, vì bạn có thể biểu diễn dữ liệu ngoài các mục cơ sở dữ liệu dưới dạng tài nguyên. Ví dụ điển hình, một số thư viện xác thực phổ biến trong Rails hiện đại diện cho phiên xác thực hiện tại của người dùng là một mô hình và cá nhân tôi đã thực hiện đặt lại mật khẩu dưới dạng mô hình.

Khi đến lúc phải tương tác với các mô hình này trong controller của bạn, code của bạn clear hơn rất nhiều, vì bạn có thể sử dụng cách tiếp cận chính xác như với các mô hình được hỗ trợ cơ sở dữ liệu.
# 7.Virtual Attributes
Nếu bạn muốn tổng hợp dữ liệu trước khi chuyển nó sang một model (ví dụ: chuyển đổi loại đối tượng), thì có lẽ bạn nên bắt đầu cấu trúc code của mình để tận dụng các thuộc tính ảo.
Các thuộc tính ảo là một ý tưởng rất đơn giản, về cơ bản, tất cả những gì bạn đang làm là xác định các phương thức getter và setter của riêng bạn.

Có thể bạn đang sử dụng đoạn code sau để đặt tên người dùng:
```ruby
@user = User.new(params[:user])
@user.first_name, @user.last_name = params[:user][:full_name].split(" ", 2)
```
Bạn có thể xóa dòng thứ hai và thay vào đó thêm dòng sau vào model User của bạn:
```ruby
def full_name=(value)
  self.first_name, self.last_name = value.to_s.split(" ", 2)
end
```
Sử dụng các thuộc tính ảo, bạn có thể sử dụng các biểu diễn dữ liệu thay thế trong các biểu mẫu với nỗ lực tương đối ít. Nó cũng đơn giản hơn nhiều để kiểm tra logic trong sự cô lập, đó luôn là một điều tốt.
# 8.Use Translations
Kể từ Rails 2.2, bản thân framework với sự hỗ trợ mạnh mẽ cho việc quốc tế hóa (hoặc i18n) out of the box. Tất cả những gì bạn cần làm là duy trì tệp dịch YAML và sử dụng I18n.t / t trong code của bạn, nơi có dữ liệu hiển thị cho người dùng. Về cơ bản, framework Rails i18n giúp dễ dàng khai báo map của một bối cảnh trừu tượng thành một chuỗi.

Từ quan điểm của nhà phát triển, việc sử dụng I18n rất hữu ích cho việc sử dụng ứng dụng của bạn đến nhiều địa phương hơn. Khi đến lúc phải đổi tên một cái gì đó trong giao diện của bạn, việc có một nơi duy nhất để tìm chuỗi được đề cập để thay thế nó trên toàn bộ ứng dụng nhanh hơn nhiều so với việc quét mã của bạn cho mỗi lần xuất hiện.

# 9. In Conclusion
Có hàng trăm thực tiễn hoặc kỹ thuật mã hóa có thể giúp cuộc sống của bạn trở thành nhà phát triển Ruby on Rails dễ dàng hơn, nhưng tôi đã cố gắng chọn ra một vài phương pháp có thể áp dụng rộng rãi cho mọi dự án và thường bị bỏ qua. Bạn đã làm theo những thực hành này chưa? Bạn sẽ bắt đầu chứ?

Nguồn: (https://www.sitepoint.com/10-ruby-on-rails-best-practices/)