### Giới thiệu chung

   Nested attributes là một tính năng cho phép bạn lưu các thuộc tính của một bản ghi thông qua cha mẹ được liên kết của nó. Chúng ta sẽ xét ví dụ sau để hiểu rõ hơn:
    
   Nếu bạn làm một quản lý sách, trong đó có đối tượng Book, Author và AuthorBook. Một Book thì sẽ có một hoặc nhiều Author, và một Author cũng sẽ có một hoặc nhiều Book. Và khi bạn tạo Book đồng thời sẽ cập nhật thuộc tính được vào AuthorBook. Và để làm được điều đó thì Nested attributes sẽ giúp bạn cập nhật một cách rất dễ dàng.

### Sử dụng Nested attributes trong quan hệ many-to-many

   Để sử dụng được nested attributes thì bạn phải khai báo trong Model. Dưới đây tôi có ba Model sau:
   
   **Model book.rb**
   
```
class Book < ApplicationRecord
  has_many :author_books, dependent: :destroy
  has_many :authors, through: :author_books
  
  accepts_nested_attributes_for :author_books
end
```

   **Trong model author_book.rb**
   
```
class AuthorBook < ApplicationRecord
  belongs_to :book
  belongs_to :author
end
```

  **Trong model author.rb**
  
```
class Author < ApplicationRecord
  has_many :author_books, dependent: :destroy
  has_many :books, through: :author_books
end
```
    
Tiếp theo bạn phải khai báo thuộc tính cần cập nhật vào author_books khi tạo books trong controller books_controller như sau:
    
```
 private

 def book_params
    params.require(:book).permit :name,:description, :image,
      :publish_date, :price, :category_id, author_ids:[], author_books_attributes:
      [:id, :book_id, :author_id]
  end
````
      
 Trong đó:
 - Các thuộc tính: name, description, image, publish_date, price, category_id là thuộc tính của đối tượng Book.
 - Thuộc tính: author_ids:[] là thuộc tính cần cập nhật cho author_books.
 - author_books_attributes: [:id, :book_id, :author_id] là những thuộc tính trong đối tượng author_books.
 
###  Sử dụng Javascript Select Form Fields with Chosen

   Ở trên là ta đã thể hiện các liên kết giữa các đối tượng, vậy làm thế nào để có thể lấy được các bản ghi từ đối tượng Author. Ở đây là liên kết many-to-many nên ta sẽ sử dụng Select Form Fields with Chosen. Cách cài đặt và sử dụng như sau:
   
   Include chosen-rails trong Gemfile
    
`gem "chosen-rails"`
    
   Chạy lệnh bundle install.
   
   Include chosen javascript assets: Thêm vào trong file app/assets/javascripts/application.js:
   
`//= require chosen-jquery`
    
   Include chosen stylesheet assets: Thêm vào file app/assets/stylesheets/application.css
   
`*= require chosen`
  
  Tiếp tục khai báo trong controller books_controller.rb để lấy ra danh sách các authors.
  
  ```
  private
  
  def list_authors
    @authors = Author.all.select(:id, :name).map{|author| [author.name, author.id]}
   end
```
  
  Phía trên controller ta thêm before_action cho các action cần list ra authors.
  
 ```before_action :list_categories, :list_authors, only: %i(new edit)```
 
 Và để select authors ra ngoài form trong file books/_form.html.erb, ta thêm dòng sau:
 ```
  <div class="form-group">
    <%= f.label :author_id %>
    <%= f.select :author_ids, options_for_select(@authors.map{|key, value|
      [key, value]}), {include_blank: true}, {class: "chosen-select", multiple: "true"} %>
  </div>
```

   Sau đó thêm js cho class "chosen-select". Trong file js application.js thêm:
```
function chosen_init() {
  $(".chosen-select").chosen().change();
}

$(document).on('turbolinks:load', function(){chosen_init()});
```

  Vậy là khi tạo một book ta đã cập nhật luôn dược bản ghi vào bảng author_books. Kết quả cuối cùng thu được như hình bên dưới.

  Tạo list author sử dụng select form:
  
  ![](https://images.viblo.asia/3d01df63-b609-4671-bca5-2343c45e69c1.png)
  
  Sau khi click tạo book thì đồng thời sẽ cập nhật bản ghi vào trong bảng author_books:
  
  ![](https://images.viblo.asia/3ae4de82-b615-4708-b78e-3794cbb1d5a5.png)
  
###  Tổng kết

  Nested attributes là kĩ thuật được sử dụng rất nhiều trong các ứng dụng của rails. Nó giúp cập nhật các bản ghi của đối tượng này thông qua đối tượng khác một cách dễ dàng. Ngoài ra, bạn có thể sử dụng nó trong các mối liên kết khác đơn giản hơn. Bài viết trên sẽ giúp bạn có một cái nhìn khái quát về Nested attributes.
  
### Tham khảo

> https://robots.thoughtbot.com/accepts-nested-attributes-for-with-has-many-through
> https://www.pluralsight.com/guides/ruby-on-rails-nested-attributes
> https://github.com/tsechingho/chosen-rails