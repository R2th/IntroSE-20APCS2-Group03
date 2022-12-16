Ở bài viết này chúng ta sẽ thử tạo 1 project API sử dụng gem fast_jsonapi cho serializer.
# Tạo project mới
Đầu tiên là tạo một project API mới
```
$ rails new rails-jsonapi \
  --database=postgresql \
  --skip-action-mailbox \
  --skip-action-text \
  --skip-spring -T \
  --skip-turbolinks \
  --api

$ cd rails-jsonapi
```
Lệnh này sẽ tạo một project api Rails sử dụng postgresql làm cơ sở dữ liệu với một số thứ được loại bỏ để giữ cho nó ngắn gọn.

Tiếp theo sẽ khởi tạo model và controller:
```
rails g resource Author name:string --no-test-framework
rails g resource Article title:string body:text author:references --no-test-framework
```
Đừng quên thêm quan hệ has_many vào model author.
```ruby
# app/models/author.rb
class Author < ApplicationRecord
    has_many :articles
end
```
Thêm dữ liệu seed để bắt đầu.
```
bundle add faker
```
```ruby
# db/seeds.rb
require 'faker'

Author.delete_all
Article.delete_all


10.times {
    Author.create( name: Faker::Book.unique.author)
}

50.times {
    Article.create({
        title: Faker::Book.title,
        body: Faker::Lorem.paragraphs(number: rand(5..7)),
        author: Author.limit(1).order("RANDOM()").first # sql random
    })
}
```
Bắt đầu tạo database và dữ liệu với lệnh sau
```
rails db:create db:migrate db:seed
```
# Khởi tạo endpoint và controller
Tạo route cho API
```ruby
# config/routes.rb
Rails.application.routes.draw do
  scope :api do
    resources :articles
    resources :authors
  end
end
```
Khởi tạo controller cho articles và authors
```ruby
# app/controllers/articles_controller.rb
class ArticlesController < ApplicationController
    before_action :find_article, only: :show
    def index
        @articles = Article.all
        render json: @articles
    end

    def show
        render json: @article
    end

    private
        def find_article
            @article = Article.find(params[:id])
        end
end

# app/controllers/author_controller.rb
class AuthorsController < ApplicationController
    before_action :find_author, only: :show
    def index
        @authors = Author.all
        render json: @authors
    end

    def show
        render json: @author
    end

    private
    def find_author
        @author = Author.find(params[:id])
    end
end
```
Tại thời điểm này, chúng ta có một api đang hoạt động đáp ứng các yêu cầu với json! Tuy nhiên, chúng ta chưa có liên kết nào giữa article và author, vì vậy response body cho GET /articles không bao gồm bất kỳ dữ liệu author nào.
```
[
  {
    "id": "1",
    "type": "article",
    "attributes": {
      "title" "Where the Red Fern Grows",
      "body": "...",
      "author_id": 2,
    }
  }
]  
```
Chúng ta có thể giải quyết điều này bằng cách thay render...
```ruby
def index
  @articles = Article.all
  render json: @articles, include: [:author]
end
```
...nhưng điều này có thể nhanh chóng trở nên cồng kềnh và không DRY chút nào
# Sử dụng Fast json
Fast JSONapi là một thư viện Ruby được tạo bởi nhóm phát triển Netflix. Nó bao gồm một bộ serializer triển khai spec https://jsonapi.org/  đầy đủ. Điều này sẽ làm phức tạp hơn một chút trong cả Frontend và Backend, nhưng lợi ích về hiệu suất có thể dễ dàng vượt trội hơn tất cả những điều đó, tùy thuộc vào tình huống của bạn. Bạn có thể tìm hiểu thêm về điểm chuẩn hiệu suất của fast_jsonapi [tại đây](https://github.com/Netflix/fast_jsonapi/blob/master/performance_methodology.md)

Thêm gem fast_jsonapi vào project
```
bundle add 'fast_jsonapi'
```
Bây giờ chúng ta có thể sử dụng serializer generator được đi kèm với fast_jsonapi
```
rails g serializer Article title body
rails g serializer Author name
```
Điều này sẽ tạo ra 2 file:
```ruby
# app/serializers/article_serializer.rb
class ArticleSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :body
end
```
```ruby
# app/serializers/author_serializer.rb
class AuthorArticleSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name
end
```
Để đơn giản, chúng ta sẽ chỉ xác định các association trên ArticleSerializer
```ruby
# app/serializers/article_serializer.rb
class ArticleSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :body
  belongs_to :author
end
```
Triển khai serializer trong controller tương ứng
```ruby
# app/controllers/authors_controllers.rb
class AuthorsController < ApplicationController
    before_action :find_author, only: :show
    def index
        @authors = Author.all
        options = { include: [:articles]}
        render json: AuthorSerializer.new(@authors, options).serializable_hash
    end

    def show
        options = { include: [:articles]}
        render json: AuthorSerializer(@author, options).serializable_hash
    end

    private
        def find_author
            @author = Author.find(params[:id])
        end
end
```
```ruby
# app/controllers/articles_controller.rb
class ArticlesController < ApplicationController
    before_action :find_article, only: :show
    def index
        @articles = Article.all
        options = { include: [:author]}

        render json: ArticleSerializer.new(
            @articles.preload(:author), 
            options
        ).serializable_hash
    end

    def show
        options = {:include => [:author]}
        render json: ArticleSerializer.new(@article, options).serializable_hash
    end

    private
        def find_article
            @article = Article.find(params[:id])
        end
end
```
Chạy lệnh `rails s` để khởi chạy rails server và tạo 1 request đến localhost:3000/articles.

Response sẽ trông giống như thế này
```
{
  "data": [
    {
      "id": "1",
      "type": "article",
      "attributes": ...,
      "relationships": {
        "author": {
          "data": {
            "id": "9",
            "type": "author"
          }
        }
      }
    },
    {
      "id": "2",
      "type": "article",
      "attributes": ...,
      "relationships": {
        "author": {
          "data": {
            "id": "3",
            "type": "author"
          }
        }
      }
    },
    {
      "id": "3",
      "type": "article",
      "attributes": ...
      "relationships": {
        "author": {
          "data": {
            "id": "3",
            "type": "author"
          }
        }
      }
    }
  ],
  "included": [
    {
      "id": "9",
      "type": "author",
      "attributes": {
        "name": "Tawna Denesik PhD"
      }
    },
    {
      "id": "3",
      "type": "author",
      "attributes": {
        "name": "Mrs. Carmela Herzog"
      }
    }
  ]
}
```
Như vậy là chúng ta đã sử dụng được fastjson trong app rails, thêm một lựa chọn bên cạnh Active Model Serializer.

*Nguồn: [Patrick Jones](https://dev.to/forksofpower/build-a-json-api-spec-compliant-api-with-rails-6-and-fastjsonapi-b19)*