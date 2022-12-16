## 1. Partials
Partial được dùng nhóm các view html dùng chung ra 1 file. Điều này giúp hạn chế trùng lặp code giúp chúng ta tái sử dụng cũng như bảo trì một cách nhanh chóng ở view
File là file partial sẽ có dấu gạch dưới ở trước tên file “_”
Khi sử dụng để render partial ra view ta chỉ việc
```
render "tên_partial" => nếu partial đặt cùng folder với phần view
render "shared/ten_partial" => nếu partial đặt khác folder, ở đây nó được đặt ở trong folder shared
```
Một ví dụ điển hình sử dụng partial đó là : Thường các trang new hoặc edit đều dùng chung 1 form (nhập name, email, address) . Ta sẽ định nghĩa 1 partial chứa form đó và gọi form đó ở `new.html.erb` và `edit.html.erb`
```
# app/views/employees/new.html.erb

<h1>New Employee</h1>  
<%= render 'form' %>  
<%= link_to 'Back', employees_path %> 
```
```
# app/views/employees/new.html.erb

<h1>New Employee</h1>  
<%= render 'form' %>  
<%= link_to 'Back', employees_path %> 
```
Các bạn đã thấy code ở view đã giảm tải rất nhiều chưa :D Đó là cách dùng partial đơn giản nhất

Vậy ta có thể truyền biên vào trong partial không ? Hoàn toàn được Bằng cách:
```
render "form", object: @user
```

Như vậy trong partial sẽ có 1 biến tên là object. tại đây ta truyền vào nó 1 giá trị là @user

Ngoài ra ta có thể render 1 tập các view partial giống nhau : nói thì hơi khó hiểu nhưng nhìn code các bạn sẽ hiểu Thay vì:
```
<% @users.each do |user| %>
  <%= render "user", user: user %>
<% end %>
```
Để hiển thị danh sách thông tin các user (Có partial name là _user.html.erb chứa thông tin của user)

Thì chúng ta có thể code ngắn gọn hơn bằng cách:

```
render @users => trong trường hợp partial cùng tên với tên object
render partial: "tên custom", collection: @users => tên partial khác vs tên object
```
Tìm hiểu thêm tại:
* [Layouts and Rendering in Rails (Official Docs)](https://guides.rubyonrails.org/layouts_and_rendering.html)
* [Action View Partials (Official Docs)](https://api.rubyonrails.org/classes/ActionView/PartialRenderer.html)

## 2. Decorators

Chúng ta sử dụng decorator để viết những logic không thuộc về model, cũng không thuộc về view.

Một ví dụ ở View:
```
<article>  
  <span class="publication-status">
    <% if @article.published? %>
      Published at: <%= @article.published_at.strfitme("%B #{@article.published_at.day.ordinalize}, %Y")
    <% else %>
      Draft
    <% end %>
  </span>
...
</article>
```
Khi viết nhiều code logic trong view, nó sẽ trở lên phức tạp, khó quản lí view của mình. Rails đã cung cấp cho chúng ta Rails Helper như 1 nơi chứa các logic của View, nhưng helper có nhược điểm:

* Helpers có thể sử dụng trên tất cả các view, chúng dễ dàng bị conflict tên hàm với nhau
* Helper là module, do vậy chúng ta không thể truy cập đối tượng. Có nghĩa là phải truyền đối tượng vào như một tham số trong hàm helper như:  `article_published_at_date(article)`

Gem [Draper](https://github.com/drapergem/draper) là một gem phổ biến dùng để cung cấp các decorator pattern (mở rộng của Active Record object) giúp trình bày các logic mà không cần viết vào model.

Chúng ta sử dụng [Draper](https://github.com/drapergem/draper) cho ví dụ trên:
```
class ArticleDecorator < Draper::Decorator  
  delegates_all

  def publication_status
    if is_published?
      "Published at: #{published_at}"
    else
      "Draft"
    end
  end

  def published_at
    object.published_at.strfitme("%B #{published_day}, %Y")
  end

  private

  def published_day
    object.published_at.day.ordinalize
  end
end  
```
Để dùng decorator này.

Có 2 cách chúng ta có thể dùng

Cách 1: Thêm vào controller như sau:
```
class ArticlesController < ApplicationController  
  def show
    @article.find(params[:id]).decorate
  end
end
```
Ở view sẽ sửa thành:
```
<article>  
  <span class="publication-status">
    <%= @article.publication_status %>
  </span>
...
</article>  
```
Cách 2 : Gọi trực tiếp ở view bằng cách @article.decorate.publication_status Như vậy nếu ở view sử dụng nhiều decorate thì chúng ta sẽ phải .decorate nhiều lần. Tùy vào trường hợp thì ta sử dụng 1 trong 2 cách này

Như vậy view đã trở nên ngắn gọn hơn, không có logic phức tạp. Chúng ta có thể nhìn lướt qua view và hiểu nó đang hiển thị gì một cách dễ dàng Tìm hiểu thêm về Gem này tại:
* [Draper Gem](https://github.com/drapergem/draper)
* [Experimenting with Draper](http://tutorials.jumpstartlab.com/topics/decorators.html)
* [Decorators on Rails](http://johnotander.com/rails/2014/03/07/decorators-on-rails/)
* [Rails Presenters](https://nithinbekal.com/posts/rails-presenters/)
## 3. Null Object
Sử dụng Null Object để tránh các điều kiện phức tạp. Tìm hiểu qua một ví dụ: Chúng ta có 1 ứng dụng mà user có thể xem nếu nó là amin hoặc customer, hoặc là guest nếu họ chưa login. Phụ thuộc vào role của user, chúng sẽ hiển thị các view header khác nhau:
```
<% if user_signed_in? %>  
  <% if current_user.role == 'admin' %>
    <%= render 'admin_nav' %>
  <% elsif current_user.role == 'customer' %>
    <%= render 'customer_nav' %>
  <% end %>
<% else %>  
  <%= render 'guest_nav' %>
<% end %> 

```
Tại ví dụ này, chúng ta đang sử dụng `partial`. Nhưng nếu ta add thêm 1 role mới, ta lại phải thêm 1 điều kiện nữa ở view. Chúng ta có thể làm ngắn gọn hơn bằng cách
```
<% if user_signed_in? %>  
  <%= render "#{current_user.role}_nav" %>
<% else %>  
  <%= render 'guest_nav' %>
<% end %>  
```
Thật đơn giản phải không? Nhưng ta chưa xét đến trường hợp null. Nếu current_user không có 1 role nào cả. Trường hợp này ta có thể sử dụng `Null Object. Null Object` là một đối tượng Ruby cũ mà respond trả về giống với đối tượng không phải là null. Có nghĩa chúng ta có thể làm với Null Object giống cách mà chúng ta làm với 1 object bình thường. Như trong ví dụ trên, chúng ta sẽ bắt đầu với 1 class đặt tên cho nó là `Guest`
```
class Guest  
  def role
    'guest'
  end
end  
```
Guest class sẽ response .`role` là `guest`, giống như User respond .`role` là `admin` hoặc customer Ở trong ApplicationController nơi mà `current_user` đã được định nghĩa. Chúng ta sẽ return 1 instance của Guest thay vì nil khi user không login:
```
class ApplicationController  
  def current_user
    super || Guest.new
  end
end
```
Lúc này, chúng ta có thể refactor đoạn view ở ví dụ trên thành
```
<%= render "#{current_user.role}_nav" %> 
```
Tham khảo thêm tại:
* [Rails Refactoring Example: Introduce Null Object](https://thoughtbot.com/blog/rails-refactoring-example-introduce-null-object)
* [Naught Gem](https://github.com/avdi/naught/)

## 4. Form Object

`Form Object `sử dụng để đơn giản hóa form có nhiều model và các form có logic phức tạo khác. Thay vì sử dụng `accepts_nested_attributes_for` và phải xử lý các validation fail của nhiều model, form object cho phép chúng ta có thể nhóm form lại và validation ở một chỗ khác. Do vậy `Form object` giúp chúng ta giảm thiểu tình trạng “Fat model”, đồng thời giúp code sáng sủa hơn, validates dễ dàng hơn.

Ví dụ: Chúng ta có 1 model Survey. mỗi survey có nhiều question (Model: Question), bạn có thể sử dụng` Form Object `để tạo Survey. Ta sẽ sử dụng `Virtus` tạo 1 đối tượng giống như Active Record. Nhưng có nhiều option cho tạo `Form Object.`
```
class CreateSurvey  
  include Virtus

  extend ActiveModel::Naming
  include ActiveModel::Conversion
  include ActiveModel::Validations

  attribute :title, String
  attribute :questions, Array[String]

  validates :title, presence: true

  def save
    if valid?
      persist!
      true
    else
      false
    end
  end

  private

  def persist!
    transaction do
      @survey = Survey.create!(title: title)
      @questions = questions.map{|question_text| Question.create(text: question_text)
    end
  end
end  
```
Trong Controller, chúng ta có thể kiểm soát form submit bằng các sử dụng object `CreateSurvey`
```
SurveysController < ApplicationController  
  def create
    @survey = CreateSurvey.new(params[:survey])

    if @survey.save
      # logic if successful
    else
      # logic if unsuccessful
    end
  end
end 

```
Để tìm hiểu rõ hơn về `Form Object`, bạn có thể tham khảo tại:
* [Reform Gem](https://github.com/trailblazer/reform)
* [Form Object Validations in Rails 4](https://crypt.codemancers.com/posts/2013-12-18-form-objects-validations/)
* [Form Objects with Virtus](https://www.hawkins.io/2014/01/form_objects_with_virtus/)
* [Form Objects (RailsCast)](http://railscasts.com/episodes/416-form-objects)
* [7 Patterns to Refactor Fat ActiveRecord Models](https://codeclimate.com/blog/7-ways-to-decompose-fat-activerecord-models/)

## 5. Alternate Templating Languages

`ERB` là một ngôn ngữ mẫu hoàn hảo, nhưng những ngôn ngữ tiên tiến hơn như `Haml` và `Slim` cho phép bạn viết HTML với Ruby trở nên rõ ràng hơn.
Nhìn vào ví dụ nhỏ để thấy sự khác biệt:

**ERB:**
```
<section class=”container”>  
  <h1><%= post.title %></h1>
  <h2><%= post.subtitle %></h2>
  <div class=”content”>
    <%= post.content %>
  </div>
</section>  
```
**Haml**

```
%section.container
  %h1= post.title
  %h2= post.subtitle
  .content
    = post.content
```
**Slim**

```
section.container  
  h1= post.title
  h2= post.subtitle
  .content= post.content
```

Việc lựa chon template language nào tùy thuộc vào sở thích của mỗi người. Nếu bạn thấy thoải mái với HTML tags, **ERB** là 1 sự lựa chọn tốt (Cung cấp nhiều hỗ trợ nhất). Nếu bạn muốn viết 1 cách ngắn gọn nhất thì chọn **Slim**.

Tìm hiểu thêm tại:

* [Haml](https://haml.info/)
* [Slim](http://slim-lang.com/)
* 
Hi vọng bài viết có thể giúp ích cho bạn!

Ref: https://allenan.com, và cảm ơn chị Ngọc trainer.