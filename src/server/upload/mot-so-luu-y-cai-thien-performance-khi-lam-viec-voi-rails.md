Khi làm việc với ruby on rails chắc hẳn chúng ta sẽ làm việc với active record rất nhiều. Tuy nhiên có nhiều điều có thể ta vẫn chưa thực sự hiểu, ví dụ như ActiveRecord execute SQL query như thế nào? Và cũng còn khá nhiều lập trình viên khác cũng không để ý tới điều này. Trong bài viết dưới dây, chúng ta sẽ cùng tìm hiểu thêm về ActiveRecord qua một số trường hợp hay gặp và một số lưu ý khác để tăng tốc độ cho dự án, tránh tạo ra lỗi N+1s queries. <br>
## Rule 1
Vậy, làm sao để chúng ta biết 1 câu query là không cần thiết?
Ta có thể dựa vào 1 rule để cân nhắc xem query đó có cần thiết hay không. Đó là: 1 action trong Rails controller chỉ **nên** execute 1 SQL query cho mỗi table. Nếu thấy nhiều hơn 1 SQL query/ table, ta có thể tìm cách để giảm 1,2 queries. Số lượng các queries trên mỗi bảng được show rất rõ ràng. <br>
Một rule khác đó là: Các câu queries **nên** được execute trong nửa đầu của controller action’s response, không nên gọi queries trong partial view. Các câu query được gọi ở trong view rất dễ dẫn đến N + 1s. Nếu trên development logs, chúng ta có thể dễ dàng bắt gặp những đoạn log như:
``` ruby
User Load (0.6ms)  SELECT  "users".* FROM "users" WHERE "users"."id" = $1 LIMIT 1  [["id", 2]]
Rendered posts/_post.html.erb (23.2ms)
User Load (0.3ms)  SELECT  "users".* FROM "users" WHERE "users"."id" = $1 LIMIT 1  [["id", 3]]
Rendered posts/_post.html.erb (15.1ms)
```
Hãy chú ý preload data trước khi in ra view. Đó là 1 số rule chúng ta nên chú ý. <br>
## Sử dụng count
**.count** sẽ luôn execute lệnh **count** trong SQL mỗi khi ta gọi. <br>
Vì vậy ta hãy luôn nhớ 1 điều là: Chỉ sử dụng **count** nếu muốn execute SQL count ngay lúc đó. Thông thường, chúng ta dùng count 1 association, sau đó sẽ sử dụng lại ở trong view. Điều này sẽ dẫn tới việc thừa 1 lần count. Ví dụ: <br>
``` ruby
    # _messages.html.erb
    # @messages = user.messages.unread
    <h2>Unread Messages: <%= @messages.count %></h2>

    <% @messages.each do |message| %>
        ...
    <% end %>
```
Ở đây sẽ execute 2 commands, **count** và **select**. **count** được execute bởi lệnh @messages.count, còn @messages.each sẽ execute **select** để load tất cả message. Nếu chúng ta thay đổi thứ tự code trong partial và thay đổi count thành size thì sẽ loại bỏ được **count** query và giữ lại **select** <br>
``` ruby
    <% @messages.each do |message| %>
        ...
    <% end %>

    <h2>Unread Messages: <%= @messages.size %></h2>
```
Bởi vì nhìn vào source code hàm **size** ta sẽ thấy như sau: <br>
``` ruby
    # File activerecord/lib/active_record/relation.rb, line 210
    def size
      loaded? ? @records.length : count(:all)
    end
```
Nếu relation đã được load, sẽ gọi length (1 method của Ruby để lấy ra size của 1 mảng), còn nếu ActiveRecord::Relation chưa được load, sẽ gọi lệnh **count**. <br>
Còn đây là hàm **count** <br>
``` ruby
    def count(column_name = nil)
      if block_given?
        # ...
        return super()
      end

      calculate(:count, column_name)
    end
```
Nó không được cache hay lưu trữ gì, chỉ đơn giản là execute SQL calculation mỗi khi được gọi. Tuy nhiên, như ở trong ví dụ trên kia, chúng ta chuyển phần tính @messages.size xuống bên dưới đoạn chạy each, như thế khi chạy vòng each, @messages đã được load, và chúng ta có thể chạy lệnh size để lấy ra. Tuy nhiên, nếu chúng ta vẫn muốn in ra size trước khi chạy each thì có thể dùng **load** method như sau <br>
``` ruby
    <h2>Unread Messages: <%= @messages.load.size %></h2>

    <% @messages.each do |message| %>
        ..
    <% end %>
```
**load** sẽ thực hiện load luôn messages, thay vì load lazy. Nó zẽ trả về 1 ActiveRecord::Relation. Do đó, khi .size được gọi, @messages đã được load sẵn, không cần 1 query để tính size nữa. <br>
Vậy khi nào thì câu query .count mới bị ignore? Chỉ khi result được cached bởi ActiveRecord::QueryCache, khi có 2 câu SQL giống hệt nhau được gọi. <br>
``` ruby
    <h2>Unread Messages: <%= @messages.count %></h2>
    ... other code in here
    <h2>Unread Messages: <%= @messages.count %></h2>
```
Do vậy hãy dùng .size thay thế cho .count ở mọi chỗ. Ta chỉ nên dùng count khi chúng ta không thực sự load hết tất cả các record của 1 association mà ta đang tính count. <br>
## Sử dụng where
Giả sử chúng ta có 1 đoạn code như sau, trong file **_post.html.erb** <br>
``` ruby
    <% @posts.each do |post| %>
      <%= post.content %>
      <%= render partial: :comment, collection: post.active_comments %>
    <% end %>
```
và trong file post.rb <br>
``` ruby
    class Post < ActiveRecord::Base
      def active_comments
        comments.where(soft_deleted: false)
      end
    end
```
Việc này sẽ dẫn tới SQL query bị execute mỗi khi render ra post partial bởi vì . **where** luôn luôn dẫn tới việc gọi query. Vậy nếu chúng ta gọi includes hoặc sử dụng preloading methods khác trong controller thì sao? => cũng k thể loại bỏ được việc **where** execute a query <br>
Điều này cũng xảy ra khi ta gọi scopes, vd trong model Comment, ta viết: <br>
``` ruby
    class Comment < ActiveRecord::Base
      belongs_to :post

      scope :active, -> { where(soft_deleted: false) }
    end
```
Do đó, chúng ta có 2 rules: 
- Không gọi scopes trong associations khi chúng ta render collections 
- Không dùng query method (vd **where**) trong instance methods của 1 ActiveRecord::Base class
Gọi scopes trong 1 associations khiến chúng ta không thể preload được result. Trong ví dụ bên trên, chúng ta có thể preload comments của 1 post, nhưng chúng ta không thể preload active comments của 1 post được. Do đó, chúng ta phải quay lại db, execute new queries cho mỗi phần tử của collection. <br>
Vậy có cách nào để fix N+1 cho render collection không? Câu trả lời là: Có. Chúng ta sẽ làm như sau <br>
``` ruby
    class Post
      has_many :comments
      has_many :active_comments, -> { active }, class_name: "Comment"
    end

    class Comment
      belongs_to :post
      scope :active, -> { where(soft_deleted: false) }
    end

    class PostsController
      def index
        @posts = Post.includes(:active_comments)
      end
    end
```
Ý tưởng là chúng ta sẽ tạo ra 1 association mới, nơi chúng ta có thể preload <br>
View ở đây không cần thay đổi gì, nhưng bây giờ nó sẽ chỉ execute 2 SQL queries, 1 query load trong bảng Post và 1 trong bảng Comment. <br>
``` ruby
    <% @posts.each do |post| %>
      <%= post.content %>
      <%= render partial: :comment, collection: post.active_comments %>
    <% end %>
```
## Sử dụng any?, exist? and present?
Chúng ta hãy cùng xem qua 1 ví dụ sau: <br>
``` ruby
    class DocComment < ActiveRecord::Base
      belongs_to :doc_method, counter_cache: true
      
      def doc_method?
        doc_method_id.present?
      end
    end
```
Mục đích dùng **present?** ở đây chỉ là để check xem DocComment object có thuộc 1 doc_method nào không. Nó sẽ chuyển giá trị của doc_method_id từ nil hoặc 1 Integer thành true hoặc false. <br>
``` ruby
    class Object
      def present?
        !blank?
      end
    end
```
**blank?** tương đương với câu hỏi: Liệu object này là truthy hay falsey? Mảng và hash rỗng là truthy nhưng nó blank, 1 string rỗng cũng là blank. Trong bí dụ bên trên, doc_method_id sẽ chỉ có 2 loại giá tri là nil và Integer, điều đó có nghĩa là: **present?** ở đây tương đương với việc sử dụng **!!** <br>
``` ruby
    def doc_method?
      !!doc_method_id
      # same as doc_method_id.present?
    end
```
Ví dụ nếu muốn biết nếu 1 ActiveRecord::Relation có records nào hay không, ta có thể sử dụng any?/present?/exits? hoặc dùng: none?/blank?/emtpy?. Liệu bạn có chắc là k xảy ra vấn đề gì hay không? <br>
Hãy xem xét ví dụ sau <br>
``` ruby
    - if @comments.any?
      h2 Comments on this Post
      - @comments.each do |comment|
```
Sẽ có 2 câu query được thực hiện trong đoạn code trên. Một câu sẽ được gọi bởi @comments.any? (SELECT 1 AS one FROM … LIMIT 1), và 1 câu @comments.each sẽ load toàn bộ relation comments (SELECT “comments”.* FROM “comments” WHERE …) <br>
Hãy xem tiếp ví dụ khi ta viết lại thành <br>
``` ruby
    - unless @comments.empty?
      h2 Comments on this Post
      - @comments.each do |comment|
```
Nếu viết thế này, sẽ chỉ có 1 câu query được load: @comment.empty? sẽ load cả relation bằng câu: SELECT "comments".* FROM "comments" WHERE ..... Xét tiếp ví dụ nếu ta viết thế này: <br>
``` ruby
    - if @comments.exists?
      This post has
      = @comments.size
      comments
    - if @comments.exists?
      h2 Comments on this Post
      - @comments.each do |comment|
```
Sẽ có 4 queries trong trường hợp này. Vì **exits?** không có tính năng cache và nó k load relation. exists? ở đây sẽ triggers câu: SELECT 1 ..., .size sẽ triggers câu lệnh COUNT vì relation không được cache. và lệnh exits? sẽ trigger 1 câu lệnh SELECT khác: SELECT 1 .... Cuối cùng, @comments load hết relation để chạy cho vòng each. Trong khi đó, chúng ta hoàn toàn có thể chỉ cần dùng 1 query cho đoạn code này <br>
``` ruby
    - if @comments.load.any?
      This post has
      = @comments.size
      comments
    - if @comments.any?
      h2 Comments on this Post
      - @comments.each do |comment|
```
Do đó, một số lưu ý khi sử dụng trong trường hợp này sẽ như sau: <br>
- Không nên sử dung present? và blank? nếu ActiveRecord::Relation không được sử dụng toàn bộ sau khi chúng ta gọi 1 trong 2 methods này. Ví dụ: @my_relation.present?, @my_relation.first(3).each.
- any?, none?, empty? nên được thay thế cho present?, blank? trừ khi ta chỉ lấy 1 phần của ActiveRecord::Relation sử dụng: first hoặc last. Chúng sẽ sinh ra 1 câu query SQL check nếu ta dùng entire relation. Hãy thay: @users.any?; @users.each thành @users.present?; @users.each hoặc @users.load.any?; @users.each, hoặc @users.any?; @users.first(3).each cũng ok.
- exists? giống như count, nó không được memorized, và luôn chạy 1 câu SQL query. Không nên sử dụng nó, chúng ta nên thay bằng present? hoặc blank?
## Kết
Trên đây là những gì tìm hiểu về một số lưu ý để cải thiện tốc độ cho Rails app. Hi vọng bài viết giúp ích cho mọi người. Hẹn gặp lại! <br>

## Reference
https://www.justinweiss.com/articles/how-to-preload-rails-scopes/ <br>
https://www.speedshop.co/2019/01/10/three-activerecord-mistakes.html <br>
https://guides.rubyonrails.org/