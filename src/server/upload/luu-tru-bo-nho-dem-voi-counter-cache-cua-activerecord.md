# Giới thiệu
* Thay vì đếm các bản ghi liên quan trong cơ sở dữ liệu mỗi khi tải trang, tính năng bộ nhớ đệm bộ đếm của ActiveRecord (hay còn gọi là [counter_cache](https://guides.rubyonrails.org/association_basics.html#options-for-belongs-to-counter-cache)) cho phép lưu trữ bộ đếm và cập nhật nó mỗi khi một đối tượng được liên kết được tạo hoặc xóa. Trong bài viết này, chúng ta sẽ tìm hiểu tất cả về bộ nhớ đệm đếm trong ActiveRecord.
# Nội dung
* Hãy lấy ví dụ điển hình về blog với các bài báo và các phản hồi. Mỗi bài viết có thể có nhiều phản hồi và chúng ta muốn hiển thị số lượng phản hồi bên cạnh tiêu đề của mỗi bài viết trên trang các bài blog để thể hiện mức độ phổ biến của nó.
```
# app/controllers/articles_controller.rb
class ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end

  # ...
end
```
* Chúng ta không phải tải trước các phản hồi , vì chúng ta không hiển thị dữ liệu của chúng trên trang index. Chúng ta đang cần hiển thị số lượng, vì vậy chúng ta chỉ quan tâm đến số lượng phản hồi cho mỗi bài viết. Ở trong controllers này đã tìm tất cả các bài báo và đặt chúng vào biến **@articles** để hiển thị trên view.
```
<!-- app/views/articles/index.html.erb -->
<h1>Articles</h1>

<% @articles.each do |article| %>
<article>
  <h1><%= article.title %></h1>
  <p><%= article.description %></p>
  <%= article.responses.size %> responses
</article>
<% end %>
```
* View lặp lại danh sách các bài viết và hiển thị tiêu đề, mô tả và số lượng phản hồi mà mỗi bài viết nhận được. Bởi vì chúng ta gọi **article.responses.size** trong view, **ActiveRecord** biết nó cần đếm số lượng phản hồi liên kết thay vì tải toàn bộ các phản hồi cho mỗi bài viết.
Một chú ý nhỏ nhưng mọi người hay không để ý đó là dù dùng **.count** nghe có vẻ là lựa chọn hợp lý hơn để đếm số lượng phản hồi, nhưng chúng ta nên sử dụng **.size**, bởi vì **.count** sẽ luôn thực hiện một truy vấn **COUNT**, trong khi **.size** sẽ bỏ qua truy vấn nếu các phản hồi đã được tải.
```
Started GET "/articles" for 127.0.0.1 at 2018-06-14 16:25:36 +0200
Processing by ArticlesController#index as HTML
  Rendering articles/index.html.erb within layouts/application
  Article Load (0.2ms)  SELECT "articles".* FROM "articles"
  ↳ app/views/articles/index.html.erb:3
  (0.2ms)  SELECT COUNT(*) FROM "responses" WHERE "responses"."article_id" = ?  [["article_id", 2]]
  ↳ app/views/articles/index.html.erb:7
  (0.3ms)  SELECT COUNT(*) FROM "responses" WHERE "responses"."article_id" = ?  [["article_id", 3]]
  ↳ app/views/articles/index.html.erb:7
  (0.1ms)  SELECT COUNT(*) FROM "responses" WHERE "responses"."article_id" = ?  [["article_id", 4]]
  ↳ app/views/articles/index.html.erb:7
  (0.1ms)  SELECT COUNT(*) FROM "responses" WHERE "responses"."article_id" = ?  [["article_id", 5]]
  ↳ app/views/articles/index.html.erb:7
  (0.1ms)  SELECT COUNT(*) FROM "responses" WHERE "responses"."article_id" = ?  [["article_id", 6]]
  ↳ app/views/articles/index.html.erb:7
  (0.1ms)  SELECT COUNT(*) FROM "responses" WHERE "responses"."article_id" = ?  [["article_id", 7]]
  ↳ app/views/articles/index.html.erb:7
  (0.1ms)  SELECT COUNT(*) FROM "responses" WHERE "responses"."article_id" = ?  [["article_id", 8]]
  ↳ app/views/articles/index.html.erb:7
  (0.1ms)  SELECT COUNT(*) FROM "responses" WHERE "responses"."article_id" = ?  [["article_id", 9]]
  ↳ app/views/articles/index.html.erb:7
  (0.1ms)  SELECT COUNT(*) FROM "responses" WHERE "responses"."article_id" = ?  [["article_id", 10]]
  ↳ app/views/articles/index.html.erb:7
  (0.1ms)  SELECT COUNT(*) FROM "responses" WHERE "responses"."article_id" = ?  [["article_id", 11]]
  ↳ app/views/articles/index.html.erb:7
  Rendered articles/index.html.erb within layouts/application (23.1ms)
Completed 200 OK in 52ms (Views: 45.7ms | ActiveRecord: 1.6ms)
```
* Yêu cầu trang index danh sách các blog xảy ra vấn đề** N+1 queries** , vì ActiveRecord lazy-loads số lượng phản hồi cho mỗi bài viết trong một truy vấn riêng biệt.
## Sử dụng COUNT() từ truy vấn
* Để tránh chạy thêm một truy vấn cho mỗi bài viết, chúng ta có thể join các bảng bài viết và phản hồi lại với nhau để đếm các phản hồi liên quan trong một truy vấn.
```
# app/controllers/articles_controller.rb
class ArticlesController < ApplicationController
  def index
    @articles = Article.
      joins(:responses).
      select("articles.*", 'COUNT("responses.id") AS responses_count').
      group('articles.id')
  end

  # ...
end
```
* Trong ví dụ này, chúng ta kết hợp các phản hồi trong truy vấn các bài viết và chọn **COUNT("responses.id")** đếm số lượng phản hồi. Chúng ta sẽ nhóm theo ID của **article** để tính số phản hồi cho mỗi bài viết. Như vậy trên view, chúng ta sẽ cần sử dụng **responses_count** thay vì gọi **size** để lấy số lượng phản hồi.
* Giải pháp này ngăn chặn các truy vấn phụ bằng cách làm cho truy vấn đầu tiên chậm hơn và phức tạp hơn. Mặc dù đây là bước đầu tiên tốt trong việc tối ưu hóa hiệu suất của trang này, nhưng chúng ta có thể tiến thêm một bước nữa là lưu vào bộ nhớ đệm để chúng ta không cần đếm từng phản hồi cho mỗi lần xem trang.
## Counter cache
* Vì các bài viết trên blog thường được đọc thường xuyên hơn là được cập nhật, counter cache là một cách tối ưu hóa tốt để làm cho việc truy vấn trang này nhanh hơn và đơn giản hơn.
* Thay vì đếm số lượng phản hồi mỗi khi bài viết được hiển thị, bộ nhớ đệm đếm giữ một bộ đếm phản hồi riêng biệt được lưu trữ trong mỗi hàng cơ sở dữ liệu của bài viết. Bộ đếm cập nhật bất cứ khi nào một phản hồi được thêm vào hoặc xóa bỏ.
* Điều này cho phép trang index article hiển thị với một truy vấn cơ sở dữ liệu mà không cần join bảng phản hồi trong truy vấn. Để thiết lập bộ nhớ này, bạn để tùy chọn **counter_cache: true** trong quan hệ **belongs_to** giữa bảng **response** và bảng **article**.
```
# app/models/response.rb
class Response
  belongs_to :article, counter_cache: true
end
```
* Điều này yêu cầu một trường cho bảng **Article** được đặt tên **responses_count**. Tùy chọn **counter_cache** đảm bảo số lượng trong field tự động cập nhật bất cứ khi nào một phản hồi được thêm vào hoặc bị xóa.
* Chú ý là chúng ta có thể ghi đè tên trường bằng cách sử dụng symbol thay vì true làm giá trị mặc định cho tùy chọn counter_cache. Chúng ta tạo một cột mới trong cơ sở dữ liệu của mình để lưu trữ số lượng.
```
$ rails generate migration AddResponsesCountToArticles responses_count:integer
      invoke  active_record
      create    db/migrate/20180618093257_add_responses_count_to_articles.rb
$ rake db:migrate
== 20180618093257 AddResponsesCountToArticles: migrating ======================
-- add_column(:articles, :responses_count, :integer)
  -> 0.0016s
== 20180618093257 AddResponsesCountToArticles: migrated (0.0017s) =============
```
* Bởi vì số lượng phản hồi hiện đã được lưu trong bộ nhớ cache trong bảng **article**, chúng ta không cần join bảng **response** trong truy vấn **article** nữa. Chúng ta sẽ sử dụng **Article.all** để tìm nạp tất cả các bài báo trong controller.
```
# app/controllers/articles_controller.rb
class ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end

  # ...
end
```
* Chúng ta không cần thay đổi view, vì Rails tự hiểu là sử dụng counter_cache cho phương thức **.size**.
```
<!-- app/views/articles/index.html.erb -->
<h1>Articles</h1>

<% @articles.each do |article| %>
<article>
  <h1><%= article.title %></h1>
  <p><%= article.description %></p>
  <%= article.responses.size %> responses
</article>
<% end %>
```
* Gửi yêu cầu tải lại trang index article, chúng ta có thể thấy một truy vấn đang được thực thi. Bởi vì mỗi bài báo đã biết số lượng phản hồi của nó, nó không cần phải truy vấn bảng **response** nữa.
```
Started GET "/articles" for 127.0.0.1 at 2018-06-14 17:15:23 +0200
Processing by ArticlesController#index as HTML
  Rendering articles/index.html.erb within layouts/application
  Article Load (0.2ms)  SELECT "articles".* FROM "articles"
  ↳ app/views/articles/index.html.erb:3
  Rendered articles/index.html.erb within layouts/application (3.5ms)
Completed 200 OK in 42ms (Views: 36.5ms | ActiveRecord: 0.2ms)
```
### Counter caches cho liên kết phạm vi
* Lệnh gọi lại bộ nhớ đệm bộ đếm của ActiveRecord chỉ kích hoạt khi tạo hoặc xóa bản ghi, vì vậy việc thêm bộ đệm bộ đếm vào một liên kết có phạm vi sẽ không hoạt động. Đối với các trường hợp nâng cao, chẳng hạn như chỉ đếm số phản hồi đã xuất bản (trường enum status là **published**), chúng ta có thể sử dụng các tính năng với gem **["counter_culture"](https://github.com/magnusvk/counter_culture)**.
### Cập nhật counter_cache
* Đối với các bài viết có trước bộ nhớ cache của bộ đếm, bộ đếm sẽ không đồng bộ, vì nó là 0 theo mặc định. Chúng ta có thể “đặt lại” một bộ đếm cho một đối tượng bằng cách sử dụng phương thức **.reset_counters** trên nó và truyền ID của đối tượng và bảng quan hệ mà bộ đếm sẽ được cập nhật.
```
Article.reset_counters(article.id, :responses)
```
* Để đảm bảo điều này chạy trên production khi chúng ta triển khai, chúng ta sẽ đưa nó vào một quá trình migration chạy trực tiếp sau khi thêm cột trong lần chạy migration cuối cùng.
```
$ rails generate migration PopulateArticleResponsesCount --force
      invoke  active_record
      create    db/migrate/20180618093443_populate_article_responses_count.rb
```
* Trong quá trình migration, chúng ta sẽ gọi **Article.reset_counters** cho mỗi bài viết, truyền ID của **article** và **:responses** là tên quan hệ.
```
# db/migrate/20180618093443_populate_article_responses_count.rb
class PopulateArticleResponsesCount < ActiveRecord::Migration[5.2]
  def up
    Article.find_each do |article|
      Article.reset_counters(article.id, :responses)
    end
  end
end
```
* Quá trình migration này cập nhật số lượng cho tất cả các bài viết trong cơ sở dữ liệu bao gồm cả những bài viết tồn tại trước bộ nhớ đệm bộ đếm.
### Callbacks
* Bởi vì bộ đệm bộ đếm sử dụng lệnh gọi lại để cập nhật bộ đếm, các phương thức thực thi trực tiếp lệnh SQL (như khi sử dụng **#delete**  thay vì **#destroy**) sẽ không cập nhật bộ đếm.
* Trong các tình huống mà điều đó xảy ra vì một lý do nào đó, có thể hợp lý nếu bạn thêm một task Rake hoặc một background job giúp các số lượng được đồng bộ hóa theo định kỳ.
```
namespace :counters do
  task update: :environment do
    Article.find_each do |article|
      Article.reset_counters(article.id, :responses)
    end
  end
end
```
## Tổng kết
* Việc ngăn chặn **N+1 queries** bằng cách đếm các đối tượng được liên kết trong truy vấn có thể hữu ích, nhưng bộ đếm trong bộ nhớ đệm là cách nhanh hơn để hiển thị bộ đếm cho hầu hết các ứng dụng. Các bộ đếm được lưu trong bộ nhớ cache tích hợp của ActiveRecord có thể giúp ích rất nhiều và các tùy chọn như **counter_culture** có thể được sử dụng cho các yêu cầu phức tạp hơn. Hi vọng bài viết này sẽ giúp ích được cho bạn phần nào. Chúc bạn thành công. :))
* Nguồn tham khảo: [https://blog.appsignal.com/2018/06/19/activerecords-counter-cache.html](https://blog.appsignal.com/2018/06/19/activerecords-counter-cache.html)