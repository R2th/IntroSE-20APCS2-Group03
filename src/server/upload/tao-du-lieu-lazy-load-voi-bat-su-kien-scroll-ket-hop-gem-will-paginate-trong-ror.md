###  1. Giới thiệu về load dữ liệu theo kiểu lazy load:
- Nếu bạn là một người hay mua sắm online trên mạng ví dụ như trang Lazada chẳng hạn, thì chắc mọi người cũng biết về nút tải thêm hay khi scroll xuống dòng thì sẽ load thêm dữ liệu. Đó được gọi là tải dữ liệu theo kiểu lazy load, nói đơn giản hơn là nếu bạn có dữ liệu lên đến hàng chục, trăm nghìn record thì nếu bạn dùng cách thông thường thì sẽ làm trang web chạy rất lâu và người dùng sẽ cảm thấy khó chịu, vì vậy load dữ liệu lazy load ra đời
### 2. Gem will_paginate:
- Thì gem will_paginate là một gem giúp cho ứng dụng ta phân trang, đây cũng là một dạng lazy load vì thay vì load hết tất cả record trong một trang thì chúng ta sẽ phân ra thành nhiều trang và mỗi trang sẽ chỉ chứa bao nhiêu record mà chúng ta muốn.
- Nếu bạn chưa biết gì về gem này thì có thể tham khảo link: https://github.com/mislav/will_paginate hoặc bạn cũng có thể dùng các gem hỗ trợ phân trang khác cũng được như gem `Kaminari` chẳng hạn
### 3. Áp dụng:
- Đương nhiên điều đầu tiên thì là ta phải có app rails rồi và cách tạo chắc mình cũng không cần nói nhiều nữa.
- Sau khi tạo xong trong `Gemfile` ta thêm các gem sau:
    + `gem "will_paginate"`: hỗ trợ phân trang
    + `gem "jquery-rails"`: hỗ trợ ta viết javascript theo jquery
    + `gem "Faker"`: tạo ra các record giả
- Sau khi chạy bundle xong, ta dùng hai câu lệnh này để tạo ra controller cũng như model
    + `rails g controller posts`: Tạo ra file controller tên là `posts_controller.rb` và folder view tên `posts`
    + `rails g model post`: Tạo ra model file tên `post` và file migrate `mã_create_post.rb` (mã ở đây là gồm dãy số tập hợp ngày tháng năm giờ phút giây mà bạn khởi tạo file migrate này). Trong file này tạo ra hai trường title và content
- Sau khi đã có những thứ cơ bản: Trong file `seed.rb` ta tạo dữ liệu giả gồm 100 bài posts
    ```ruby
    100.times do |n|
        Post.create! (
            title: "Post #{n}", 
            content: Faker::Lorem.sentence 5
        )
    end
    ```
    Chạy `rails db:seed` hay `rake db:seed` để tạo
- Trong file controller ta thêm:
    ```ruby
    @posts = Post.select(:id, :title, :content).order(created_at: :desc)
      .paginate page: params[:page], per_page: 10
    respond_to do |format|
      format.html
      format.js
    end
    ```
- Trong view ta tạo file:
    + index.html.erb và thêm:
        ```html
        <div class="page-header">
          <h1>My posts</h1>
        </div>

        <div id="my-posts">
          <%= render @posts %>
        </div>

        <div id="infinite-scrolling">
          <%= will_paginate %>
        </div>
        ```
    + _posts.html.erb và thêm:
        ```html
        <div>
          <h2><%= link_to post.title, post_path(post) %></h2>
          <p><%= post.content %></p>
        </div>
        ```
    + index.js.erb (file này được dùng khi có một request js gửi lên controller để xử lý thì sau đó nó sẽ chạy tới file này dựa trên đoạn lệnh `respond_to` mà mình viết ở trên để thực hiện những câu lệnh js và vì là file có đuôi erb nên việc gửi dữ liệu từ ruby là bình thường) ta thêm đoạn lệnh này vào:
        ```javascript
        $('#my-posts').append('<%= j render @posts %>');
        <% if @posts.next_page %>
          $('.pagination').replaceWith('<%= j will_paginate @posts %>');
        <% else %>
          $(window).off('scroll');
          $('.pagination').remove();
        <% end %>
        ```
    + Đoạn lệnh này có nghĩa từ thẻ có id là `my-post` bên file html ta append (tức là thêm ở cuối) thêm ''<%= j render @posts %>' (tức thêm các giữ liệu tiếp theo ở cuối). Câu lệnh `if` là để bắt sự kiện nếu `@post.next_page` thì ta replace lại phân trang và ngược lại thì đóng scroll và xóa phân trang đi (ở đây là khi load hết tất cả dữ liệu và không còn gì để load nữa thì xóa nó đi)
- Và thêm một điều quan trọng cuối cùng đó là bắt sự kiện khi chúng ta scroll xuống dòng. Trong folder app/assets/javascripts ta tạo file scroll.js và thêm đoạn lệnh
    ```javascript
    $(document).on('turbolinks:load', function () {
      $(window).on('scroll', function(){
        var more_posts_url = $('.pagination .next_page a').attr('href');
        if (more_posts_url && $(window).scrollTop() > $(document).height() - $(window).height() - 100) {
          $.getScript(more_posts_url);
        }
      });
    });
    ```
    + Ở đây đoạn javascript này đang bắt sự kiện khi bạn scroll thì nó sẽ lấy đường link từ `$('.pagination .next_page a').attr('href')` gán vào biến `more_posts_url` và xác định điều kiện nếu `more_posts_url` tồn tại và `$(window).scrollTop()` lớn hơn `$(document).height() - $(window).height() - 100)` thì sẽ gửi `request js` tới đường link trong `more_posts_url`. và như mình đã nói phía trên thì ở controller sẽ xử lý điều đó.
    + Ở id là `infinite-scrolling` của thẻ div chứa phân trang bạn có thể ẩn nó đi bằng cách viết trong file scss hoặc css là:
        ```
        #infinite-scrolling {
            display: none;
        }
        ```
### Kết:
Trên đây mới chỉ là kiểu lazy load đơn giản, sau bài này mình sẽ viết thêm một bài về load dữ liệu trên modal bằng lazy load, mong mọi người ủng hộ.
Link tham khảo: https://www.sitepoint.com/infinite-scrolling-rails-basics/