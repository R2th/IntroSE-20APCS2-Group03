# Khái quát
Rails là một framework mã nguồn mở được sử dụng rộng rãi trên thế giới, được xây dựng dựa trên ngôn ngữ lập trình Ruby với tiêu chí làm đơn giản hóa quá trình phát triển ứng dụng web. Tuy nhiên càng đơn giản bao nhiêu thì lại càng gây chủ quan cho lập trình viên bấy nhiêu và đôi khi là có những sai lầm mà họ ko lường trước được. Đôi khi xảy ra những lỗi mà bản thân người lập trình không thể hiểu nổi cái gì đang xảy ra và vô cùng bực tức. Những vấn đề đó có thể là vè bảo mật hay hiệu năng, tất nhiên tất cả những điều này ta đều phải tìm cách khắc phục nó. Bài viết này sẽ liệt kê 10 sai lầm mà lập trình viên hay mắc phải kèm theo cả cách hạn chế chúng.

# 1. Xử lí logic quá nhiều trong controller
Đối với những ai làm việc với Rails 1 thời gian chắc hẳn không còn lạ lẫm gì với hệ thống MVC của rails và câu "fat model, skinny controller". Nghĩa là mọi business logic sẽ nằm ở Model, Controller chỉ nhận nhiệm vụ điều phối và xử lý những logic đơn giản giữa M và V là chính. Nếu đặt quá nhiều logic grong controller thì việc thay đổi sau này sẽ rất khó khăn nếu như ta cần thêm bất cứ logic nào. Thậm chí việc này còn vi phạm nguyên tắc single responsibility principle - Một class chỉ nên giữ 1 trách nhiệm duy nhất (Chỉ có thể sửa đổi class với 1 lý do duy nhất). Việc dùng quá nhiều logic trong controller khiến cho việc chỉnh sửa code trong tương lai sẽ rất khó khăn và dễ gây ra những lỗi logic. Nói chung, chỉ những những hàm, code logic sau là nên có mặt trong controller của bạn:

* Kiểm soát session and cookie: Nó cũng có thể bao gồm các logic về authentication/authorization hoặc bất kỳ quá trình xử lý cookie bổ sung nào bạn cần thực hiện.
* Lựa chọn Model: Logic cho việc tìm kiếm các model đúng với các params được truyền vào từ các yêu cầu (request). Lý tưởng nhất là nên gọi một method đặt một instance variable sẽ được sử dụng sau để trả về.
* Quản lý các params của request: Tổng hợp các params và gọi ra một model method thích hợp để xử lý chúng.
* Rendering/redirecting: Hiển thị kết quả (html, xml, json, v.v.) hoặc chuyển hướng, nếu cần.

# 2. Xử lí logic quá nhiều trong view
Hệ thống templating ERB của Rails là một cách tuyệt vời để xây dựng nên các trang với các biến content. Tuy nhiên nếu không cẩn thận, thành quả mà bạn thu được sẽ là 1 file rất lớn với sự pha trộn hỗn độn của code Html và code Ruby khiến cho việc sửa đổi và duy trì trở nên vô cùng khó khăn. Và chắc chắn nếu đặt nhiều logic trong view thì việc tuân thủ quy tắc DRY sẽ bị phá vỡ. Ví dụ thay vì luôn luôn phải check xem có tồn tại current_user hay không để hiển thị name, nếu ko có thì hiển thị Guest:
```ruby
<h3>
  Welcome,
  <% if current_user %>
    <%= current_user.name %>
  <% else %>
    Guest
  <% end %>
</h3>
```
ta hoàn toàn có thể luôn luôn set mặc định cho thuộc tính `name = Guest` nếu như không tồn tại `current_user` trong `application_controller`
```ruby
require 'ostruct'

helper_method :current_user

def current_user
  @current_user ||= User.find session[:user_id] if session[:user_id]
  if @current_user
    @current_user
  else
    OpenStruct.new(name: 'Guest')
  end
end
```
Hàm này sẽ cho phép bạn thay thế đoạn code trên kia với 1 dòng lệnh đơn giản như sau:
```ruby
<h3>Welcome, <%= current_user.name -%></h3>
```
2 chú ý quan trọng khi viết view trong rails:

* Đảm bảo tính đóng gói (encapsulate ), ta nên sử dụng layout và partial.
* Sử dụng presenters/decorators để đóng gói các logic trong view thành 1 đối tượng, từ đó ta sử dụng các đối tượng này mà ko cần viết logic trong view. 

# 3. Xử lí logic quá nhiều trong model
Bên cạnh việc đặt logic nhiều trong view và controller, thì các lập trình viên xử lý nhiều logic trong model dẫn đến việc maintain thật rất kinh khủng. Các chức năng như tạo ra các thông báo email, liên kết tới các dịch vụ bên ngoài, chuyển đổi sang các định dạng dữ liệu khác và những chức năng không có nhiều liên quan đến trách nhiệm chính của model cần phải được ưu tiên ít hơn là việc tìm kiếm và duy trì dữ liệu trong cơ sở dữ liệu. Vậy nếu không được ở trong controller, không được dừng chân tại view cũng không thể tá túc ở model thì code logic nên đi đâu? (nghe khá buồn cho code logic). Nhưng may thay, câu trả lời là [POROs*](https://www.learnhowtoprogram.com/rails/apis/plain-old-ruby-objects) (plain old Ruby objects) . Với một framework toàn diện như Rails, những lập trình viên mới thường sẽ lưỡng lự khi phải tạo những class của riêng họ mà không thuộc khuôn khổ của framework. Tuy nhiên, việc đưa logic ra khỏi model và chuyển tới POROs thường được khuyến nghị để tránh việc Models trở nên quá phức tạp. Với Poros, bạn có thể đóng gói những thứ như thông báo email hoặc tương tác API vào các class riêng chứ không phải ghép chúng thành một mô hình ActiveRecord. Với những suy nghĩ như trên thì chỉ những code logic sau đây nên tồn tại trong Models của bạn:
* ActiveRecord configuration. Ví dụ: relation, validate ...
* Những logic nghiệp vụ thao tác với database như thêm sửa xoá ...
* Query, bạn chỉ nên sử dụng những query như where trong model mà ko nên viết trong controller hay view.

# 4. Sử dụng helper một cách bừa bãi
Rails đặt trọng tâm vào các thành phần được đặt tên ( model, view và controller). Điều này khá tốt khi định nghĩa một thứ gì đó thuộc về các class của những thành phần này. Nhưng có đôi khi chúng ta có thể cần các hàm không thuộc về cả model, view hay controller. Hàm generator của Rails tạo nên một thư mục helper và một class helper mới với mỗi thành phần mà chúng ta tạo ra. Nó như là khuyến khích chúng ta nhồi nhét bất kỳ chức năng nào mà không phù hợp với model, controller hay view vào trong những class helper này. Khi bạn có một chức năng bổ sung, hãy suy nghĩ về việc nhóm các hàm lại với nhau và tìm ra một cái tên thật sự rõ ràng cho class mà sẽ lưu trữ những hàm này. Sử dụng một framwork toàn diện như Rails không phải là một cái cớ cho việc sử dụng những hàm, class một cách bừa bãi.

# 5. Sử dụng quá nhiều Gem
Ruby on rails được hỗ trợ rất nhiều từ 1 lượng vô cùng phong phú các Gem, nó giúp cho các lập trình viên xử lý các vấn đề phức tạp 1 cách rất dễ dàng thông qua việc cài gem chứ không phải thêm những logic phức tạp vào dự án. Tuy nhiên bên cạnh đó cũng tồn tại rất nhiều ứng dụng cồng kềnh với hằng hà sa số gem được sử dụng trong nó trong khi các chức năng mà ứng dụng đem lại lại không hề tương xứng với số lượng gem đã được dùng. Điều này dẫn đến một số vấn đề của Rails:
* Sử dụng nhiều gem làm ứng dụng của ta nặng hơn mức cần thiết và tất nhiên ảnh hướng đến performance, ngốn ram và tất nhiên là tăng chi phí của hệ thống. Khởi động chậm, load chậm và khi chạy automation test cũng chậm.
* Mỗi gem bạn cài thì thường sẽ cài thêm một số gem dependency. Ví dụ nếu cài gem rails_admin thì bạn đã cài thêm 11 gem đi kèm với nó.

# 6. Bỏ qua những file log
Có thể hầu hết lập trình viên đều biết các file log được lưu trong thư mục log đối với từng môi trường development hay production. Rails cung cấp cho bạn rất nhiều chức năng tiện ích, đặc biệt là trong model. Định nghĩa rõ ràng các mối liên kết trong model của bạn sẽ khiến cho việc sử dụng những mối quan hệ dữ liệu trở nên dễ dàng hơn kể cả khi dùng trong view. Tất cả những phần SQL cơ bản cần thiết cho model của bạn đều được Rails tự động. Điều đó thật tuyệt nhưng làm sao bạn có thể chắc chắn rằng những phần SQL này thực sự hiệu quả? Một lỗi SQL mà bạn thường xuyên mắc phải đó là lỗi N+1 query. Ví dụ bạn cần query để hiển thị tất cả các comment của post:
```ruby
def comments_for_top_three_posts
  posts = Post.limit(3)
  posts.flat_map do |post|
    post.comments.to_a
  end
end
```
Nhìn vào log sau khi thực hiện hàm trên, chúng ta sẽ thấy một câu query để lấy ra 3 bài post sau đó tiếp tục là 3 câu query để lấy ra các comment của mỗi bài post:
```ruby
Started GET "/posts/some_comments" for 127.0.0.1 at 2014-05-20 20:05:13 -0700
Processing by PostsController#some_comments as HTML
  Post Load (0.4ms)  SELECT "posts".* FROM "posts" LIMIT 3
  Comment Load (5.6ms)  ELECT "comments".* FROM "comments" WHERE "comments"."post_id" = ?  [["post_id", 1]]
  Comment Load (0.4ms)  SELECT "comments".* FROM "comments" WHERE "comments"."post_id" = ?  [["post_id", 2]]
  Comment Load (1.5ms)  SELECT "comments".* FROM "comments" WHERE "comments"."post_id" = ?  [["post_id", 3]]
  Rendered posts/some_comments.html.erb within layouts/application (12.5ms)
Completed 200 OK in 581ms (Views: 225.8ms | ActiveRecord: 10.0ms)
```
Active Record trong Rails có thể làm giảm đáng kể số lượng truy vấn bằng cách cho phép bạn chỉ định trước tất cả các phần cần thiết sẽ được gọi. Điều này được thực hiện bằng cách gọi phương thức include (hoặc preload) trên ActiveRecord::Relation. Với include, AvtiveRecord sẽ đảm bảo tất cả các phần cần thiết sẽ được tải với số lượng truy vấn tối thiểu có thể. Ví dụ:
```ruby
def comments_for_top_three_posts
  posts = Post.includes(:comments).limit(3)
  posts.flat_map do |post|
    post.comments.to_a
  end
end
```
Khi code được sửa lại như trên, log đã cho ta thấy rằng tấy cả các câu comment đã được lấy ra chỉ với một câu truy vấn thay vì 3 câu như trước:
```ruby
Started GET "/posts/some_comments" for 127.0.0.1 at 2014-05-20 20:05:18 -0700
Processing by PostsController#some_comments as HTML
  Post Load (0.5ms)  SELECT "posts".* FROM "posts" LIMIT 3
  Comment Load (4.4ms)  SELECT "comments".* FROM "comments" WHERE"comments "."post_id" IN (1, 2, 3)
  Rendered posts/some_comments.html.erb within layouts/application (12.2ms)
Completed 200 OK in 560ms (Views: 219.3ms | ActiveRecord: 5.0ms)
```
Đó chỉ là một ví dụ cho vấn đề n+1 query. Rõ ràng việc đọc log giúp ta có thể xem lại và kiểm tra xem hệ thống hoạt động có trơn tru hay ko.

# 7. Bỏ qua kiểm thử tự động
Rails cung cấp khả năng kiểm thử tự động vô cùng mạnh mẽ và hiệu quả. Rất nhiều lập trình viên Rails sử dụng kiểu TDD và BDD để viết nên những bộ test vô cùng tinh vi, họ còn tạo cho chúng ta những framework kiểm thử vô cùng mạnh mẽ cùng với gem như rspec hay cucumber. Chúng đều rất dễ sử dụng tuy nhiên nhiều người lại bỏ qua bước quan trọng này.

# 8. Chặn việc truy cập từ các dịch vụ bên ngoài
Các dịch vụ bên thứ 3 thường rất dễ sử dụng và tích hợp vào ứng dụng rails tuy nhiên không phải lúc nào nó cũng chạy trơn tru và nhanh chóng hay thậm chí gặp lỗi từ phía họ. Điều này nếu không cẩn thận sẽ gây chậm ứng dụng của chúng ta hay có khi còn bị delay hoặc chết server. Để tránh việc chặn request thay vì gọi các dịch vụ trực tiếp trong quá trình xử lý của một request. Bạn nên chuyển chúng về hàng chờ background job để thực hiện khi có thể.
* Delayed job
* Resque
* Sidekiq: nếu không muốn sử dụng background job thì bạn phải đảm bảo trong code đã xử lý error handling , và thử tắt mạng chạy local xem khi không connect được bên thứ 3 thì ứng dụng của bạn có gặp vấn đê gì không.

# 9. Không muốn thay đổi những file database migration cũ
Rails ghi lại cấu trúc database hiện tại thông qua file db/schema.rb và nó luôn luôn đươc update mỗi khi bạn update migrate. Do các tệp tin migration này được đặt tên một cách tuần tự, bạn có thể chạy chúng lại từ đầu để tạo một database trống. Đây là một cách tuyệt vời để quản lý các thay đổi nhỏ trong cơ sở dữ liệu của ứng dụng và tránh các vấn đề của Rails. Theo thời gian, quá trình tạo cơ sở dữ liệu có thể sẽ mất một khoảng thời gian kha khá đôi khi trật tự bị thay đổi một cách vô ý hay thất lạc một file migration nào đó chẳng hạn hoặc bị chèn vào từ một ứng dụng Rails khác sử dụng cùng server database. Rails sẽ miêu tả về giản đồ cơ sở dữ liêu hiện tại của bạn trong tệp tin shema.rb sau mỗi lần cập nhật database. Tệp tin này có thể được tạo ra khi không có sự thay đổi nào trong database chỉ bằng cách chạy lệnh db:schema:dump. Sai lầm phổ biến của nhiều lập trình viên đó là tạo một migration mới vào trong ứng dụng của bạn mà không cập nhật file schema tương ứng. Khi mà việc migrations nằm ngoài tầm kiểm soát mà mất quá nhiều thời gian để chạy hoặc không còn tạo database đúng cách, lập trình viên không nên ngại việc xóa những file migration cũ, tạo một giản đồ mới và tiếp tục từ đó. 

# 10. Để lộ những thông tin nhạy cảm, quan trọng cần bảo mật
Rails cung cấp những công cụ hỗ trợ việc bảo mật rất tốt nhằm tránh việc bị tấn công bằng nhiều cách. Một trong số chúng là sử dụng app_secret để bảo vệ session của trình duyệt. Mặc dù token này được lưu trong config/secrets.yml và với môi trường production thì file này đọc thông tin từ các biến môi trường. Với phiên bản rails cũ thì nó được ghi trong config/initializers/secret_token.rb và file này cũng thường bị nhầm lẫn mà đưa lên các công cụ quản lý code như các file khác để mọi người ai cũng xem dược và điều này thì vô cùng nguy hiểm. Vì vậy cần phải để file này vào .gitignore để hạn chế người ngoài xem được và lấy thông tin.