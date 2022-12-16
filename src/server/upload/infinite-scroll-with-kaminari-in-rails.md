Ngày nay thì mạng xã hội không còn lạ với việc chúng ta cứ lăn chuột và các bài post dần hiện ra, cứ tầm chục bài thì lại load tiếp.
Đó chính là kĩ thuật phân trang, ngoài ra còn kết hợp với cả ajax. Bài viết này mình sẽ hướng dẫn các bạn demo một app về infinite scroll sử dụng gem kaminari nhé.
# **1. Khởi tạo project**
Chúng ta sẽ khởi tạo một demo nhỏ với câu lệnh đơn giản trong rails.
```
rails new infinite_scroll
```
Thêm vào một số gemfile cần thiết.
```
gem "kaminari"
gem "faker"
gem "bootstrap-sass"
gem "bootstrap-kaminari-views"
```
Mình sẽ giới thiệu sơ qua.
gem kaminari dùng để phân trang, gem faker để fake giữ liệu các bài post, gem bootstrap-sass và bootstrap-kaminari-views chứa các style cho các pagination, next page, ... 
Tiếp theo là gì chắc ai cũng biết rồi nhỉ.
Dĩ nhiên là `bundle install` rồi.
Tiếp theo, thêm `/=require bootstrap` vaò file application.js và `@import "bootstrap";` vào application.scss.
# **2.  Model**
Chúng ta tạo một model với các trường đơn giản:
* id (integer, primary key)
* title (string)
* body (text)
* created_at (datetime)
* updated_at (datetime)

Với câu lệnh:
```
rails g model Post title:string body:text
rails db:migrate
```
Tiếp theo trong file config/seeds.rb chúng ta fake giữ liệu:
```
50.times do |n|
  title = "Post #{n}" 
  body = Faker::Lorem.sentence 5
  Post.create! title: title, body: body
end
```
Lệnh này sinh ra 50 bài post.
Tiếp theo chạy `rails db:seed` để general ra dữ liệu.
Cuối cùng trong config/routes.rb chúng ta thêm :
```
root to: "posts#index"
resources :posts
```
# **3. Controller**
Để sử dụng phân trang, trong controller chúng ta sẽ viết:
```
@posts = Post.order(created_at: :desc).page(params[:page]).per 10
respond_to do |format|
    format.js
end
```
```
page(params[:page])
```
là truyền số trang page được phân trang, `per 10` là 10 bài post trong 1 trang.
# **View**
*index.html.erb*
```
<div class="page-header">
  <h1>My posts</h1>
</div>

<div id="my-posts">
  <%= render @posts %>
</div>

<div id="infinite-scrolling">
  <%= paginate @posts, theme: "twitter-bootstrap-3" %>
</div>
```
Trong khối div `#my-posts` chứa những post đã được phân trang. Câu lệnh render @posts sẽ hiển thị mỗi post từ mảng bằng cách dùng partial *_post.html.erb*
```
<div>
  <h2><%= link_to post.title, post_path(post) %></h2>
  <p><%= post.body %></p>
</div>
```
# ** Infinite scroll**
Bây giờ ta sẽ chuyển phân trang thành infinite scrolling bằng JQuery. Tạo một file tên là pagination.js trong thư mục javascripts
```
$(document).on('turbolinks:load', function () {
  if ($('.pagination').length && $('#my-posts').length) {
    $(window).on('scroll', function(){
      more_posts_url = $('.pagination .next_page a').attr('href');
      if(more_posts_url) {
        more_posts_url = more_posts_url;
      } else {
        more_posts_url= $('.pagination .next a').attr('href');
      }
      if (more_posts_url && $(window).scrollTop() > $(document).height() - $(window).height() - 60) {
        $('.pagination').html('<img src="/assets/ajax-loader.gif" alt="Loading..." title="Loading..." />');
        $.getScript(more_posts_url);
      }
    });
  }
});
```
post/index.js.erb
```
$('#my-posts').append('<%= j render @posts %>');
<% if @posts.next_page %>
  $('.pagination').replaceWith('<%= j will_paginate @posts %>');
<% else %>
  $(window).off('scroll');
  $('.pagination').remove();
<% end %>
```
Ta hiển thị các post khác bằng cách append vào block #my-post . Sau đó, kiểm tra xem có còn trang hay không. Nếu có, thay thế thanh phân trang hiện tại với một trang mới. Ngược lại, ta remove thanh phân trang và unbind các sự kiện scroll window.
# **Kết**
Trên đây mình đã giới thiệu và demo cho các bạn về infinite. Hi vọng bài viết sẽ hữu ích cho các bạn. Cảm ơn vì đã đọc bài của mình.
# **Tham khảo**
https://www.sitepoint.com/infinite-scrolling-rails-basics/