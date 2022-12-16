# 1. Lời mở đầu
Caching (bộ nhớ đệm) là một thuật ngữ chung có nghĩa là lưu trữ kết quả của một số code để có thể nhanh chóng truy xuất sau này. 

Caching tránh phải gọi query database nhiều lần để lấy dữ liệu hiếm khi thay đổi. Mặc dù khái niệm chung là giống nhau đối với tất cả các loại Caching, nhưng trong Rails cung cấp các trợ giúp khác nhau tùy thuộc vào những gì cần lưu vào Caching.

Đối với Rails, các dạng Caching phổ biến bao gồm **memoization**, **low-level caching** và **view caching**. Trong bài này, mình xin được đề cập đến **View Caching**.

# 2. Cách Rails Renders Views
"views" là các tệp nằm bên trong thư mục app/views. Thông thường, đây là những file dạng **.html.erb**, mặc dù có những lựa chọn khác (i.e., plain .html, .js.erb hoặc các file có sử dụng preprocessors khác, chẳng hạn như slim and haml). Trong nhiều framework web khác, các tệp này được gọi là "templates".

Khi một ứng dụng Rails nhận được một GET request, nó sẽ được chuyển đến một action trong controller cụ thể chả hạn ```UsersController#index```. Action ```index``` sau đó có trách nhiệm thu thập bất kỳ thông tin cần thiết nào từ DB và render nó để sử dụng trong tệp dạng view/template. Tại thời điểm này,  Rails đang xử lý ở "view layer".

```ruby
#app/views/users/index.html.erb

<div class='user-list'>
  <% @users.each do |user| %>
    <div class='user-name'><%= user.name %></div>
  <% end %>
</div>
```

Code Ruby Rails trong tệp cần được thực thi để render ra view (erb là bất kỳ thứ gì trong thẻ <% %>). Refesh trang 100 lần và @users.each sẽ được thực hiện 100 lần. 

Đối với các partial một phần dạng html.erb, cũng được thực thi tất cả code Ruby Rails bên trong đó và render thành một tệp HTML duy nhất để gửi lại phía request.

# 3. Nguyên nhân làm chậm Views
Có thể nhận thấy log của server khi xem một trang, Rails đã in ra rất nhiều thông tin trông giống như sau:

```
Processing by PagesController#home as HTML
  Rendering layouts/application.html.erb
  Rendering pages/home.html.erb within layouts/application
  Rendered pages/home.html.erb within layouts/application (Duration: 4.0ms | Allocations: 1169)
  Rendered layouts/application.html.erb (Duration: 35.9ms | Allocations: 8587)
Completed 200 OK in 68ms (Views: 40.0ms | ActiveRecord: 15.7ms | Allocations: 14307)
```

Dòng cuối cùng cho thấy rằng tổng thời gian Rails thực hiện để trả lại phản hồi cho trình duyệt là 68ms, trong đó 40ms giây để hiển thị tệp erb và 15.7ms để xử lý các query ActiveRecord.

Mặc dù đó là một ví dụ nhỏ, nó cũng cho thấy lý do tại sao nên sử dụng Caching cho Views. Mặc dù có thể làm cho các query ActiveRecord xảy ra ngay lập tức nhưng cần xử lý render ở các file erb với tốc độ tốt hơn.

Một số lý do cho việc Views hiển thị chậm như là xử lý vòng lặp each đang gọi các query DB trong Views. Phổ biến nhất có thể kể đến một việc đơn giản là hiển thị rất nhiều partial với nhiều mức lồng ghép vòng lặp. Ví dụ:

partial "email" này đang xử lý 1 phần riêng lẻ như sau
``` ruby
# app/views/emails/_email.html.erb

<li class="email-line">
  <div class="email-sender">
    <%= email.from_address %>
  </div>
  <div class="email-subject">
    <%= email.subject %>
  </div>
</div>
```
Và ở file view của index, một vòng lặp gọi lại partial "email" sẽ được viết như sau:

```
# app/views/emails/index.html.erb

...
<% @emails.each do |email| %>
  <%= render email %>
<% end %>
```

Nếu lặp 100 email, thì đang hiển thị partial " email.html.erb" 100 lần và số lượng chưa đáng lo ngại. Trên log server báo render chỉ mất 15ms để hiển thị toàn bộ. Tuy nhiên, nếu số lượng vòng lặp tăng lên 100000 sẽ phức tạp hơn và thậm chí có thể bao gồm các phần khác bên trong và thời gian hiển thị tăng lên. Ngay cả khi chỉ mất 1-2ms để hiển thị một partial "email" thì tổng lại cũng sẽ mất 100-200ms để thực hiện toàn bộ collection.

Caching sẽ là giải pháp để xử lý vấn đề lặp quá nhiều partial và may mắn khi Rails có một số chức năng tích hợp để dễ dàng thêm Caching, khi chỉ muốn lưu vào Caching partial "email", index page hay cả hai.

# 4. View Caching là gì?
View Caching trong Ruby on Rails sử dụng HTML mà một Views tạo ra và lưu trữ nó cho sau này. Mặc dù Rails có hỗ trợ ghi chúng vào system file hoặc giữ chúng trong bộ nhớ, nhưng để sử dụng trên production, gần như chắc chắn phải có một caching server lưu trữ độc lập, chẳng hạn như Memcached hoặc Redis. Rails 'memory_store' hữu ích cho việc phát triển nhưng không thể được chia sẻ giữa các quy trình (ví dụ: nhiều servers/dynos hoặc unicorn). Tương tự, file_store trong local server. Do đó, nó không thể được chia sẻ trên nhiều box và nó sẽ không tự động xóa các mục đã hết hạn, vì vậy sẽ cần gọi định kỳ ```Rails.cache.clear``` để disk của server không bị đầy.

Việc kích hoạt lưu trữ bộ Caching có thể được thực hiện trong tệp cấu hình ```environments``` (ex: config/environments/production.rb):
```ruby
  # memory store is handy for testing
  # during development but not advisable
  # for production
  config.cache_store = :memory_store
  ```
  
Trong cài đặt mặc định, ```development.rb``` sẽ có một số cấu hình được thực hiện để cho phép dễ dàng chuyển đổi Caching trên máy mỗi người. Chạy ```rails dev:cache``` để bật và tắt bộ Caching.

Lưu trữ View Caching trong Rails khá đơn giản, vì vậy để minh họa sự khác biệt về hiệu suất, mình chỉ sử dụng sleep(5) để tạo độ trễ thử nghiệm:

```ruby
<% cache do %>
  <div>
    <p>Hi <%= @user.name %>
    <% sleep(5) %>
  </div>
<% end %>
```

Render view này lần đầu tiên mất 5s, như mong đợi. Tuy nhiên, việc tải nó lên lần thứ hai chỉ mất vài ms vì mọi thứ bên trong block cache đều được tìm nạp từ bộ nhớ đệm.

# 5. Thêm View Caching
Giả định rằng view này gây ra một số vấn đề về hiệu suất:
```
# app/views/user/show.html.erb
<div>
  Hi <%= @user.name %>!
<div>

<div>
  Here's your list of posts,
  you've written
  <%= @user.posts.count %> so far
  <% @user.posts.each do |post|
    <div><%= post.body %></div>
  <% end %>
</div>

<% sleep(5) #artificial delay %>
```

Ví dụ này tạo ra với độ trễ giả định là 5s. Đầu tiên, có thể đóng gói toàn bộ file ```show.html.erb``` trong một cache block, như đã mô tả trước đó. Khi bộ nhớ cache đã nạp dữ liệu sau lần chạy đầu, lần thứ tiếp theo sẽ có thời gian hiển thị nhanh hơn. Tuy nhiên, có một số vấn đề như sau:

Đầu tiên, điều gì sẽ xảy ra nếu user thay đổi tên? Rails chưa biết khi nào hết hạn page đã lưu trong bộ nhớ cache, vì vậy user có thể không bao giờ thấy phiên name được update. 
Giải pháp là chỉ cần truyền biến @user và cache method: 
```ruby
<% cache(@user) do %>
<div>
  Hi <%= @user.name %>!
</div>
...
<% sleep(5) #artificial delay %>
<% end %>
```

Hiện tại, nếu chuyển một model đến cache(), nó sẽ sử dụng field updated_at của model đó để tạo ra một Key kiểm tra trong bộ nhớ cache. Nói cách khác, bất cứ khi nào @user được update, page được lưu trong bộ nhớ cache này sẽ hết hạn và Rails sẽ render lại HTML.

Khi user thay đổi tên thì điều gì sẽ xảy ra với các Post? Thay đổi một post hiện có hoặc tạo post mới sẽ không thay đổi field updated_at của User, vì vậy page đã lưu trong bộ nhớ cache của sẽ không hết hạn. Ngoài ra, nếu user thay đổi name, sẽ hiển thị lại tất cả các post của user, ngay cả khi post của user đó không thay đổi. 

Để giải quyết cả hai vấn đề này, có thể sử dụng bộ nhớ đệm trong bộ nhớ đệm.
```ruby
<% cache(@user) do %>
  <div>
    Hi <%= @user.name %>!
  <div>

  <div>
    Here's your list of posts,
    you've written
    <%= @user.posts.count %> so far<br>
    <% @user.posts.each do |post| %>
      <% cache(post) do %>
        <div><%= post.body %></div>
      <% end %>
    <% end %>
  </div>

  <% sleep(5) #artificial delay %>
<% end %>
```
Bây giờ, lưu vào bộ nhớ đệm từng phần render riêng lẻ của post. Do đó, ngay cả khi @user updated, sẽ không phải render lại Post, có thể sử dụng giá trị được lưu trong bộ nhớ cache. Tuy nhiên, vẫn còn một vấn đề nếu 1 post được thay đổi, vẫn sẽ không hiển thị cập nhật vì @user.update_at chưa thay đổi, vì vậy biến @user bên trong khối cache block sẽ không thực thi.

Để khắc phục điều này, sẽ cần thêm ```touch: true``` vào model Post:

```ruby
class Post < ApplicationRecord
  belongs_to :user, touch: true
end
```

Khi thêm vào ```touch: true```, ActiveRecord đang hiểu rằng mỗi khi Post được cập nhật, thì updated_at của user có post đó cũng được cập nhật.

```ruby
 <%= render partial: 'posts/post',
       collection: @posts, cached: true %>
```

Tương đương

```
<% @posts.each do |post| %>
  <% cache(post) do %>
    <%= render post %>
  <% end %>
<% end %>
```

Không chỉ render partial: ```... cached: true``` ít dài dòng hơn mà còn mang lại sự hiệu quả hơn vì Rails có thể đọc nhiều cặp key/value trong một round thay vì nhấn vào lưu trữ bộ nhớ cache từng mục trong collection.

# 6. Dynamic Page
Một số page bao gồm một số nội dung "động" thay đổi với tốc độ nhanh hơn nhiều so với phần còn lại của page xung quanh nó. Điều này đặc biệt đúng trên các trang home hoặc dashboards, nơi có thể có nguồn cấp dữ liệu activity/news. 

Ví dụ đơn giản, thêm ngày hiện tại vào view:

```ruby

<% cache(@user) do %>
  <div>
    Hi <%= @user.name %>,
    hope you're having a great
    <%= Date.today.strftime("%A") %>!
  <div>

  ...
<% end %>
```

Sử dụng thẻ <span> và điền nó bằng javascript. Kiểu này được gọi là "javascript sprinkles", thu được kết quả như sau:

```ruby
<% cache(@user) do %>
  <div>
    Hi <%= @user.name %>,
    hope you're having a great
    <span id='greeting-day-name'>Day</span>!
  <div>
      
<% end %>
```
```js
<script>
 // assuming you're using vanilla JS with turbolinks
 document.addEventListener(
   "turbolinks:load", function() {
   weekdays = new Array('Sunday', 'Monday',
     'Tuesday', 'Wednesday', 'Thursday',
     'Friday', 'Saturday');
     today = weekdays[new Date().getDay()];
   document.getElementById("greeting-day-name").textContent=today;
 });
</script>
```
Hoặc chỉ lưu vào bộ nhớ cache một số partial của view. Ex:

```ruby
<div>
  Hi <%= @user.name %>,
  hope you're having a great
  <%= Date.today.strftime("%A") %>!
<div>

<% cache(@user) do %>
    
<% end %>
```

# 7. Kết Luận
    
Có thể coi Caching như một phương pháp nhanh chóng và dễ dàng cho các vấn đề về hiệu suất. Thật vậy, Rails làm cho việc lưu trữ view và phần chia vào bộ nhớ đệm rất dễ dàng, ngay cả khi chúng được lồng sâu vào nhau.
    
Khi dùng bộ nhớ đệm cấp thấp trong Rails nên làm mới giá trị đã lưu trong bộ nhớ đệm. Mặt khác, một view có thể gọi đến nhiều model khác nhau và nếu không planing có chủ ý, có thể khó biết được model nào sẽ khiến partial nào của view được hiển thị lại tại thời điểm đó.

Sử dụng ít bộ nhớ đệm nhất có thể, ở ít nơi nhất có thể, để đạt được mức hiệu suất có thể chấp nhận được.

**Cảm ơn các bạn đã theo dõi đến đây!!! Xin chào và hẹn gặp lại!**
    
**Link tham khảo**: https://www.honeybadger.io/blog/ruby-rails-view-caching/?ck_subscriber_id=691531045