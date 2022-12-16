# 1. Mở đầu
Trong Rails, thông thường khi mới khởi tạo 1 project, template engine mặc định là .html.erb, tuy nhiên cách viết HTML thông thường quá dài, gây cản trở quá trình viết code, bảo trì, mở rộng tính năng cho lập trình viên. Bài viết dưới đây sẽ tổng hợp lại một số template khác ngoài ERB và cách sử dụng chúng, từ đó bạn có thể lựa chọn xem template nào phù hợp với project của mình.

# 2. Các loại template 
## 2.1. Curly
Cài đặt Curly cũng đơn giản như cài đặt các loại gem khác, đơn giản bản chỉ gõ `gem install curly-templates` hoặc nếu bạn sử dụng bundle thì thêm dòng sau vào Gemfile:
```
gem 'curly-templates'
```

Để sử dùng Curly trong view hoặc partial, sử dụng tiền tố .curly thay vì là .erb. 
Ví dụ :  app/views/posts/comment.html.curly. Dựa vào tiền tố .curly, Curly sẽ tìm một presenter class tên là *Posts::CommentPresenter*.  Theo quy ước, file này sẽ được đặt tại app/presenters/, vậy thì trong ví dụ trên thì presenter sẽ có đường dẫn như sau *app/presenters/posts/commentpresenter.rb*

Dưới đây là ví dụ thực tế về cách sử dụng curly
```
<!-- app/views/posts/_comment.html.curly -->
<div class="comment">
  <p>
    {{author_link}} posted {{time_ago}} ago.
  </p>

  {{body}}

  {{#author?}}
    <p>{{deletion_link}}</p>
  {{/author?}}
</div>
```
Các hàm được nội suy trong file .curly sẽ được định nghĩa trong presenter tương ứng
```
# app/presenters/posts/comment_presenter.rb
class Posts::CommentPresenter < Curly::Presenter
  presents :comment

  def body
    SafeMarkdown.render(@comment.body)
  end

  def author_link
    link_to @comment.author.name, @comment.author, rel: "author"
  end

  def deletion_link
    link_to "Delete", @comment, method: :delete
  end

  def time_ago
    time_ago_in_words(@comment.created_at)
  end

  def author?
    @comment.author == current_user
  end
end
```
Qua ví dụ trên ta thấy là điểm mạnh curly đã tách biệt các cấu trúc logic ra khỏi view, khiến cho phần code trong view trở nên gọn gàng hơn rất nhiều.

## 2.2. Haml
Haml là một template engine cho HTML. Nó được thiết kế để cho việc viết các HTML trở nên dễ dàng hơn, bằng cách loại bỏ những sự dư thừa, phản ánh các cấu trúc cơ bản mà nó đại diện, cung cấp các cú pháp thanh lịch để ta có thể dễ dàng hiểu được. Haml sẽ tập trung rút gọn các cú pháp của html thay vì code ruby

Để cài đặt Haml, đơn giản bạn chỉ cần gõ `gem install haml` hoặc nếu bạn sử dụng bundle thì thêm dòng sau vào Gemfile:
```
gem 'haml'
```

Formatting
Phần cơ bản nhất của Haml ià shorthand để tạo HTML:
```
%tagname{:attr1 => 'value1', :attr2 => 'value2'} Contents

Ví dụ 
%strong= item.title
```
Chỉ cần dùng %tagname , Haml sẽ tự động xử lý sang html

Thêm class và id dễ dàng hơn, Haml sử dụng giống với syntax css
```
%tagname#id.class

Ví dụ
%span#button.header
```

Khi bạn sử dụng thẻ div, nó càng dễ dàng hơn. Bởi vì <div> là một commom element, một tag mà không có tên sẽ có default là div, vì vậy :

```
#foo Hello!
becomes

<div id='foo'>Hello!</div>
```

Haml sử dụng thụt lề để mang các phần tử riêng lẻ đại diện cho cấu trúc HTML.  Một phần tự con sẽ thụt lùi vào trong so với phần từ cha
```
%ul
  %li Salt
  %li Pepper
becomes:

<ul>
  <li>Salt</li>
  <li>Pepper</li>
</ul>
 ```

Nó cũng có thể nhúng code ruby vào trong Haml. Dấu bằng sẽ xuất kết quả ra màn hình, dấu - sẽ chạy nhưng không xuất kết quả ra màn hình:
```
%p
  Date/Time:
  - now = DateTime.now
  %strong= now
  - if now > DateTime.parse("December 31, 2006")
    = "Happy new " + "year!"
```
Do đó , Haml được gọi là ngôn ngữ đánh dấu HTML, giúp file view gọn gàng nhất có thể
    
## 2.3 Slim
 Slim là một template language , mục đích nó được tạo ra là để giảm số lượng syntax ở view mà không trở nên khó hiểu. Ngày nay, có rất nhiều người dùng slim cho nên các tính năng của nó càng ngày càng được phát triển và tính linh hoạt của cú pháp cũng vậy.
 Cài đặt
Đầu tiên chúng ta hãy cài đặt SLIM đã. Thêm dòng này vào Gemfile:

`gem "slim"`
Sau đó bundle instal, và bật lại server. Hoặc gem install slim ở trong terminal. note: SLIM bắt đầu được hỗ trợ từ Rails 3 trở lên.

Đây là một đoạn mẫu cách mà slim được viết , file trong rails được viết có đuôi là .slim
```
    h1 Markup examples

    #content
      p This example shows you how a basic Slim file looks.

    == yield

    - if items.any?
      table#items
        - for item in items
          tr
            td.name = item.name
            td.price = item.price
    - else
      p No items found. Please add some inventory.
        Thank you!

    div id="footer"
      == render 'footer'
      | Copyright &copy; #{@year} #{@author}
```
 Qua ví dụ trên ta có thể thấy là phần thụt lề khá quan trọng, nó ngụ ý rằng phần tự thụt vào trong sẽ là phần tử con.
     Đoạn code trên ta chú ý 1 chút:
 - | => ký tự (|) được sử dụng để phân tách đoạn văn bản dạng tự do trên một dòng mới , ta chú ý rằng ở phần footer nó thụt vào so với thẻ div vì thế nó nằm trong div.
 - Ngoài ra, Slim có rất nhiều cú pháp , bạn có thể xem thêm [tại đây](https://github.com/slim-template/slim)

    
### * Tại sao nên sử dụng Slim
- Slim cho phép bản viết các mẫu html tối ưu nhất có thể
- Cú pháp Slim mang tính thẩm mỹ và khiến việc viết html trở nên thú vị hơn. Vì bạn có thể sử dụng Slim như một sự thay thế  trong tất cả các khuôn khổ chính nên rất dễ áp dụng.
- Kiến trúc Slim rất linh hoạt và cho phép bạn viết các phần mở rộng cú pháp và các plugin.
    
#  3. Kết luận
   Ngoài 3 template được kể trên, còn rất nhiều template khác như : Liquid, Mustacha, Tilt, .. Nhưng ở đây mình chỉ liệt kê 1 một template được sử dụng phổ biển, bạn có thể xem thêm các template khác [tại đây](https://github.com/markets/awesome-ruby#template-engine)