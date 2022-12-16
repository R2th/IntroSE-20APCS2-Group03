# 1. Why use a Decorator:
- Tưởng tượng bạn có `Article` model.
- Với gem `Draper` bạn có thể tạo 1 class `ArticleDecorator`.
- Class này gói model `Article` ở bên trong, định nghĩa các hàm xử lý logic của model `Article`.
    ```ruby
    # app/decorators/application_decorator.rb
    class ApplicationDecorator < Draper::Decorator
      delegate_all
    end

    # app/decorators/article_decorator.rb
    class ArticleDecorator < ApplicationDecorator
      def publication_status
        return "Drafting" if drafting?
        "Published at #{published_at.strftime("%A, %B %e")}"
      end
    end
    ```
- Thực hiện tạo decorator ở controller trước khi sử dụng trong view như sau.
    ```ruby
    # app/controllers/articles_controller.rb
    def show
      @article = Article.find(params[:id]).decorate
    end
    ```
- Ở view, bạn có thể sử dụng `@article` đã được decorate như sử dụng model và có thể gọi các method decorator.
    ```ruby
    # app/views/articles/show.html.erb
    <%= article.id %>
    <%= article.title %>
    <%= article.content %>
    <%= article.publication_status %>
    ```
- Bạn cũng có thể tạo article_helper và implement phương thức `publication_status` như sau.
    ```ruby
    # app/helpers/article_helper.rb
    module ArticleHelper
      def publication_status article
        return "Drafting" if article.drafting?
        "Published at #{article.published_at.strftime("%A, %B %e")}"
      end
    end
    ```
- Tuy nhiên cách này có 1 số hạn chế sau
- Phương thức `publication_status` sẽ tồn tại ở tất cả view và controller, không chỉ trong `ArticleController`
- Giả sử bạn có thêm model `Book` và bạn cần implement phương thức `publication_status` cho book
- Bạn cần phải sửa code ở phương thức `publication_status` như sau
    ```ruby
    # app/helpers/article_helper.rb
    module ArticleHelper
      def publication_status object
        case object.class
        when Article
          # implement publication_status for Article
       when Book
         # implement publication_status for Book
       end
      end
    end
    ```
- Các này bạn phải sửa code ở trong helper đã viết, bên cạnh đó `ArticleHelper` lại đang implement logic của `Book`.
- Hoặc chia thành cách method `publication_status_article`, `publication_status_book`
- Trong khi với gem `Decorator`, bạn chỉ cần tạo `BookDecorator` và implement `publication_status`
    ```ruby
    # app/helpers/book_helper.rb
   class BookDecorator < Draper::Decorator
      def publication_status
        return "Drafting" if drafting?
        "Published at #{published_at.strftime("%A, %B %e")}"
      end
    end
    ```
- Cách này không cần sửa code cũ và vẫn đảm bảo các model không chồng chéo nhau.
- Với cách tiếp cận implement `publication_status` trong từng model thì dễ dẫn đến fat model.
- Các method trong model chỉ nên chứa các hàm logic liên quan đến việc CRUD của model đó.
- Các method sau nên đưa vào decorator
1. Các method hiển thị attribute của model
2. Các method để tính toán dữ liệu giữa các attribute của model, ví dụ tính toán `name` từ `first_name` và `last_name`, tính toán `age` từ `birthday`.
3. Các method để tính toán url của model, ví dụ tính toán user đã cập nhật đủ thông tin thì trả về `user_path`, ngược lại trả về `edit_user_path`.

# 2. Installation:
- Thêm gem `Draper` vào Gemfile.
    ```ruby
    # Gemfile
    gem "draper"
    ```
- Chạy `bundle install` để install gem `Draper` vào source code.

# 3. Writing Decorators:
- Bạn có thể tạo decorator kế thừa trực tiếp từ `Draper::Decorator` như sau
    ```ruby
    # app/decorators/article_decorator.rb
    class ArticleDecorator < Draper::Decorator
    end
    ```
- Hoặc tạo `ApplicationDecorator` kế thừa `Draper::Decorator` và cho decorator kế thừa `ApplicationDecorator` như sau
    ```ruby
    # app/decorators/application_decorator.rb
    class ApplicationDecorator < Draper::Decorator
    end

    # app/decorators/article_decorator.rb
    class ArticleDecorator < ApplicationDecorator
    end
    ```

# 4. Generators:
- Để tạo `ApplicationDecorator` ta chạy
    ```ruby
    rails generate draper:install
    ```
- Để tạo `ArticleDecorator` ta chạy
    ```ruby
    rails generate decorator Article
    ```
- Để tạo `ArticleDecorator` cùng với các file khác như migration, model, helper, .... ta chạy
    ```ruby
    rails generate resource Article
    ```

# 5. Accessing Helpers:
- Để sử dụng các method của helper trong decorator ra sử dụng method `h`.
- Ta cần `include Draper::LazyHelpers` để tránh bị chậm khi gọi method `h` thường xuyên
    ```ruby
    # app/decorators/article_decorator.rb
    class ArticleDecorator < ApplicationDecorator
      include Draper::LazyHelpers

      def emphatic
        h.content_tag(:strong, "Awesome")
      end
    end
    ```
    
# 6. Accessing the model:
- Để sử dụng các method của model trong decorator, ví dụ method `published?`, ta có thể sử dụng 1 trong các cách gọi sau
    ```ruby
    self.object.published?
    object.published?
    model.published?
    published?
    ```
- Trong đó `self` là `decorator`, `object` hay `model` là record đang được gói lại bởi `decorator`.

# 7. Decorating Objects:
## a. Single object:
- Để tạo decorator trên 1 object, ta gọi method `decorate`.
    ```ruby
    @article = Article.first.decorate
    ```
- Theo mặc định, gọi method `decorate` sẽ trả về decorate ứng với model đó, ví dụ trên sẽ trả về `ArticleDecorator`.
- Nếu muốn trả về BookDecorator với article object ta có thể làm như sau.
    ```ruby
    @article = BookDecorator.new(Article.first)
    @article = BookDecorator.decorate(Article.first)
    ```
## b. Collections:
- Tương tự, chúng ta có thể trả về decorator cho collection theo 2 cách sau.
    ```ruby
    @articleas = Article.all.decorate
    @article = ArticleDecorator.decorate_collection(Article.all)
    ```
## c. Using pagination:
- 1 vài gem dùng để pagination thêm 1 số method vào `ActiveRecord::Relation`.
- Ví dụ method `paginate` của gem `kaminari` thêm  1 số method sau vào `ActiveRecord::Relation`: `current_page`, `total_pages`, `limit_value`, ....
- Để gọi các method trên với decorator, ta thực hiện delegate
    ```ruby
    # app/decorators/paginating_decorator.rb
    class PaginatingDecorator < Draper::CollectionDecorator
      delegate :current_page, :total_pages, :limit_value, :entry_name, :total_count, :offset_value, :last_page?
    end
    
    # app/decorators/article_decorator.rb
    class ArticleDecorator < ApplicationDecorator
      def self.collection_decorator_class
        PaginatingDecorator
      end
     end
    ```
- Thực hiện paginate cho collection paginate như  collection bình thường
    ```ruby
    @articles = Article.page(0).decorate
    @articles = ArticleDecorator.decorate_collection(Article.page(0))
    @articles.total_pages
    ```
# 8. Document
- Thanks to [drapper](https://github.com/drapergem/draper)
- Source code tham khảo: https://github.com/thanhlt-1007/demo_draper