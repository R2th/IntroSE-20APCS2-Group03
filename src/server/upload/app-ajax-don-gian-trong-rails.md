Chúng ta cùng thử viết một Web app đơn giản có sử dụng Ajax bằng Ruby on Rails nhé! 😊😊
<br>Trong bài viết mình sẽ không đề cập đến các thao tác cơ bản nữa mà nói thẳng vào cách xây dựng Ajax luôn nên có thể hơi vắn tắt ^^.

# Mở đầu
-----
#### Ajax là gì ?
Ajax là viết tắt của 「Asynchronous Javascript + XML」, vietsub ra là「 `Truyền tin không đồng bộ` dựa vào JS và XML」. Ưu điểm của "Không đồng bộ" là kể cả khi nó chạy thì cũng không gây cản trở các quá trình khác của hệ thống.<br>
* `Truyên tin đồng bộ` thì sẽ xử lý tuần tự từng câu lệnh một, xử lý xong câu lệnh này thì mới đến câu lệnh tiếp theo.<br>
* Còn `Truyên tin không đồng bộ` thì ngược lại, nó sẽ liên tục thực hiện các câu lệnh sau bất chấp câu lệnh hiện tại đã xong hay chưa. Việc này sẽ giúp cho trải nghiệm người dùng mượt mà hơn vì không phải mất thời gian chờ xử lý những câu lệnh dài dòng, tốn thời gian. **Chẳng hạn như người dùng có thể  thao tác liên tục trên website mà không cần phải reload lại trang.**<br>
➤ Chính vì việc xử lý câu lệnh bất tuần tự như này mà việc phát triển các ứng dụng có dùng Ajax cũng sẽ khó và tốn nhiều công sức hơn ^^.
<br>
***Ví dụ về việc áp dụng Ajax trong thực tế:** Chức năng bấm Like và Comment của Facebook, chức năng Thêm vào giỏ hàng của các Shop online...vv..*<br>
Các bạn có thể đọc thêm về Ajax tại đây nha https://www.tutorialspoint.com/ajax/what_is_ajax.htm.

<br>Để sử dụng Ajax thì có nhiều cách khác nhau nhưng phổ biến nhất vẫn là sử dụng Jquery. Ở bài viết này mình cũng sử dụng Jquery để viết các chức năng của Ajax 😚.

# Let's start !

-----
> Ruby version: 2.7.2<br>
> Rails version : 6.1.5<br>
> Database      : default SQLite3
> 
<br>

Mình sẽ tạo app chỉ với một chức năng  là `create`, các chức năng khác các bạn cũng có thể làm tương tự.<br>

## 1. Tạo Controller và model
* Đầu tiên, mình tạo một Rails app mới tên là `testapp`. <br>Mở Terminal và cùng làm như sau:<br>
```
$ rails new testapp
```

Đợi chạy xong thì direct địa chỉ đến vị trí app vừa tạo<br>
```
$ cd testapp
```

<br>

* Tạo controller có tên là `posts` với trang `index`<br>
```
~/testapp$ rails g controller posts index
```

![image.png](https://images.viblo.asia/1b599328-6395-4e43-8cfb-ee2b25c71d7c.png)

<br>

* Tạo model `post` với column là `title`, data type là text
```
~/testapp$ rails g model post title:text
```

![image.png](https://images.viblo.asia/be9d74aa-9bf7-4202-b41b-198b4a96f8df.png)

<br>

* Tạo model thì không thể thiếu lệnh `migrate`.
```
~/testapp$ rails db:migrate
```

## 2. Xây dựng `views` và `validation`
* Muốn truy cập được vào trang web thì phải đầu tiên cài đặt routing phải không nào! ^^<br>
`testapp/config/route.rb`<br>
``` ruby
Rails.application.routes.draw do
  resources :posts, only: [:index, :create]
  root "posts#index"
end
```
`resources` chỉ áp dụng cho method `index` và `create`.

<br>

* Tiếp theo, truy cập vào file `index.html.erb` bằng đường dẫn `testapp/app/views/post/index.html.erb` và thêm vào đoạn code dưới đây.
``` html
<h1>Posts#index</h1>
<p>Find me in app/views/posts/index.html.erb</p>

<!-- tạo form để tạo post mới -->
<%= form_for @post, remote: true do |f| %>
	<%= f.text_field :title, class: "input-box" %>
	<%= f.submit %>
<% end %>
<hr>

<!-- Hiển thị posts -->
<div class="box">
<% @posts.each do |post| %>
	<%= render "posts/post", post: post %>   <!-- Với mỗi post ta sẽ truyền giá trị của nó vào partial file -->
<% end %>
</div>
```

<br>

Đoạn code trên mình dùng `form_for` nên phải có thêm `remote: true`, nếu các bạn dùng `form_with` thì không cần thêm `remote: true` vì trong `form_with` thì default của `remote` đã là `true` rồi. Thay vào đó, với `form_with` thì chúng ta phải thêm `local: false`. <br>

Có thể thay `form_for` bằng `form_with` như sau:<br>

``` html
<%= form_with model: @post, local: false do |f| %>
	<%= f.text_field :title, class: "input-box" %>
	<%= f.submit %>
<% end %>
```

<br>

* Bên trên mình có dùng `<%= render "post/post, post: post %>`  nên bây giờ phải tạo partial file.<br>
Các bạn vào folder `testapp/app/views/post` và tạo file mới có tên `_post.html.erb`. Sau đó thêm vào file đoạn code sau:
``` html
<%= post.id %>-
<%= post.title %><br>
```

<br>

* Không được bỏ trống `:title` khi tạo post. File `testapp/app/models/post.rb` sửa như sau.
``` ruby
class Post < ApplicationRecord
    validates :title, presence: true
end
```

## 3. Xây dựng `Controller` và `template`
* Xong phần views rồi thì đến phần controller nào, các bạn sửa file `testapp/app/controllers/posts_controller.rb` như dưới đây.
``` ruby
class PostsController < ApplicationController
  def index
  	@posts = Post.all
  	@post = Post.new
  end

 def create 
    @post = Post.new(post_params)
    respond_to do |format|
      if @post.save
        format.js
      end
    end
  end

  private
  def post_params
  	params.require(:post).permit(:title)
  end
end
```

<br>

* Ở bài viết này, mình dùng Jquery để xây dựng Ajax. Mình sẽ import Jquery bằng cách thêm CDN của Jquery vào phần `<head>` của file `testapp/app/views/layout/application.html.erb`.
``` html
<!DOCTYPE html>
<html>
  <head>
    <title>Testapp</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <%= stylesheet_link_tag 'application', media: 'all', 'data-turbolinks-track': 'reload' %>
    <%= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %>

  </head>

  <body>
    <%= yield %>
  </body>
</html>

```

<br>

* Bước cuối cùng là tạo `tempate`.
<br> Tong `controller` ta vừa tạo hàm `def create` nên ta cũng cần phải tạo một `template` cho create ở phần `views`. Tuy nhiên vì ta muốn sử dụng Ajax nên `template` của ta không phải là ~~create.html.erb~~ mà là `create.js.erb`.<br>
Vào folder `testapp/app/views/posts` và tạo file mới có tên `create.js.erb`. Sau đó thêm vào file đoạn code sau.
``` javascript
$('.box').append("<%= j render @post %>");
$('.input-box').val("");
```

<br>

```$('.box').append("<%= j render @post %>");``` : Ở trang `index.html.erb` ta đặt phần hiển thị post trong thẻ `<div class="box`> nên ta sẽ dùng lệnh `append` để add thêm các post mới vào thẻ div này.
<br>

Câu lệnh `<%= j render @post %>` là cách viết tắt của ` <%= escape_javascript(render @post) %>`. Nó giúp lệnh render của chúng ta tránh bị lỗi ký tự khi render file partial. Các bạn có thể đọc thêm về `escape_javascript` ở đây<br>
https://stackoverflow.com/questions/1620113/why-escape-javascript-before-rendering-a-partial Hoặc <br>
https://apidock.com/rails/ActionView/Helpers/JavaScriptHelper/escape_javascript<br>
Còn `$('.input-box').val("");`  có tác dụng làm trắng khung input trong form sau khi tạo post thành công.

<br>

# Hoàn thành<hr>
Vậy là chúng ta đã viết xong một app Ajax đơn giản bằng Jquery và Rails. Cùng vào localhost và xem thành quả nào !
<br>
* Khởi động server, localhost mặc định của chúng ta là cổng 3000.

```
~/testapp$ rails s
```

<strong>Thành quả</strong>

![](https://images.viblo.asia/02e96e81-021e-4d36-a3cf-5f65a8372164.gif)

<br>
Yes, It's works ! 😁😁
<br>Như vậy, ta có thể thấy nhờ có Ajax mà chúng ta có thể tạo post mới và các post vừa tạo sẽ hiện ngay lên màn hình mà không cần phải reload lại trang. 

# Tổng kết
-----
Trên đây là những bước siêu cơ bản để tạo một app Ajax bằng rails. Ngoài tính năng `create` như trên, mọi người cũng có thể làm tương tự với các tính năng khác như `update`, `edit` hay `delete`. <br>
Mình cũng đang tự học Rails thôi nên mong mọi người cùng đọc và góp ý nha 😋.