Chào các bạn, trong các dự án gần đây, hầu hết mình làm việc với API trong rails chứ không còn là rails thuần như hồi mới làm nữa. Bởi vậy việc hiểu về grape và grape-entity, 2 gem được sử dụng ở khá nhiều project rails API là rất quan trọng. Trong bài viết này mình sẽ hướng dẫn các bạn cách sử dụng chúng như thế nào. Okay, bắt đầu vào việc thôi.
# Khởi tạo
Khởi tạo một project rails cơ bản nào
```
rails new api-example 
```
Project này của mình sẽ quản lý một cửa hàng sách. Mình sẽ tạo 2 model: `Book` và `Flow`
```
rails g model Book isbn: integer title: string stock: integer
rails g model Flow previousStock:integer newStock:integer book:references 
rails db:migrate 
```
đừng quên thêm `has_many: flows` trong `book.rb` và `belongs_to: book` trong `flow.rb`

# Add gem 
Tiếp theo là thêm các gem cần thiết cho project:

* grape: một gem hỗ trợ việc tạo các API trong rails
* grape-entity: gem hỗ trợ việc xử lý các attributes ở response trả về.
* grapeon_rails_route: một gem khá hữu ích trong việc xem các routes hiện có
* faker: dùng để fake data

Đừng quên chạy `bundle install` nhé
# Fake data
Muốn kiểm tra xem API của chúng ta hoạt động có chính xác hay không thì cần phải có data để hiển thị. Các bạn hãy mở file `seed.rb` và thêm đoạn code sau:
```
15.times do
 Book.create!(isbn: Faker::Number.number(4), title: Faker::Superhero.power, stock: Faker::Number.between(2, 19))
end
book_ids = Book.ids
95.times do
 Flow.create!(book_id: book_ids.sample, newStock: Faker::Number.between(2, 15), previousStock: Faker::Number.between(2, 15))
end
```

Nhớ là chạy `rails db:seed` nhé

# Xây dựng API
Đầu tiên chúng ta cần phải khai báo cho rails biết API sẽ được viết ở đâu. Các bạn hãy mở file `application.rb` lên và thêm dòng sau trong class `application`:
```
config.paths.add File.join(‘app’, ‘api’), glob: File.join(‘**’, ‘*.rb’)
config.autoload_paths += Dir[Rails.root.join(‘app’, ‘api’, ‘*’)]
```
Điều này sẽ giúp app của chúng ta tìm được API path. Tiếp theo, các bạn hãy tạo một folder có tên là `api` trong folder app, và trong `api` hãy tạo thêm một folder `book_store.

Xây dựng một project API về cơ bản cũng không khác gì project sử dụng rails thuần, có nghĩa là các bạn cũng phải tạo một cái base cho nó. Vì thế hãy tạo một file `base.rb` trong folder `book_store` vừa tạo và khai báo các thứ cần thiết:
```
module BookStore
 class Base < Grape::API
  mount BookStore::V1::Books
 end
end
```
* Chú ý: `mount BookStore::V1::Books`: đây là đường dẫn để tìm thấy API của chúng ta, ta sẽ viết toàn bộ các methods trong file `books.rb` sẽ nói đến ở dưới.
# Route 
Và cũng như những project khác, tất nhiên chúng ta phải khai báo routes cho nó nếu muốn sử dụng, mở `routes.rb` lên và khai báo thôi: 
```
mount BookStore::Base => ‘/’
```
Các bạn có thể để ý thấy rằng mọi thứ đều bắt đầu từ `base.rb`
# First method
Các bạn hãy tạo thêm folder `V1` trong `book_store`, folder này sẽ chứa file `books.rb` mà chúng ta đã nhắc đến ở trên. Tiếp theo hãy viết methods đầu tiên thôi:
```
module BookStore
  module V1
    class Books < Grape::API
      version 'v1', using: :path
      format :json
      prefix :api
      resource :books do
        desc 'Return list of books'
        get do
          books = Book.all
          present books
        end
      end
    end
  end
end
```
Rất đơn giản đúng không, trông nó cũng không khác những project rails thông thường khác là mấy. Mình sẽ giải thích một số những khai báo ở trên:
* `version ‘v1’, using: :path`: chỉ định version của API.
* `format: json`: nói với các API rằng chúng ta chỉ sử dụng định dạng JSON.
* `prefix: api`: hiểu đơn giản thì các path của chúng ta sẽ bắt đầu với `/api`. Nếu bạn chưa quên thì trong `routes.rb` chúng ta đã set route như này: `BookStore::Base => ‘/’`. Với prefix như trên chúng ta sẽ truy cập vào API theo đường dẫn `/api`.
* `resource :books`: nói rằng chúng ta sẽ sử dụng `book routes`
* `desc ‘Return list of books’`: mô tả method mà chúng ta viết. 
* `get do …end`: cái này thì khá cơ bản rồi, nó cũng giống như trong controller bình thường mà các bạn vẫn hay viết thôi
# Kiểm tra routes
Các bạn hãy chạy lệnh 
```
rails grape:routes
```
để xem nó sẽ show ra cái gì nhé. Còn bây giờ thì `rails s` rồi mở `localhost:3000/api/v1/books` lên và xem kết quả thôi.
# Xử lý response trả về
Giờ là lúc chúng ta xử lý các entity với grape-entity. Nó cho phép chúng ta lọc data từ model để quyết định xem attributes nào sẽ được hiện thị. Về cơ bản thì chức năng của gem grape-entity và serializer là tương tự nhau. Hiện tại nếu bạn get api như trện, kết quả nhận được sẽ là :
```
{
  "id":1,
  "isbn":3999,
  "title":"Enhanced Smell",
  "stock":9,
  "created_at":"2017-04-25T20:33:46.292Z",
  "updated_at":"2017-04-25T20:33:46.292Z"
}
```
trông rất xấu và thừa thãi. Ta sẽ dùng grape-entity để có một response đẹp hơn. Đầu tiên các bạn hãy tạo một folder `entities` trong folder `book_store` và tạo file `book.rb` trong đó. 
```
module BookStore
 module Entities
  class Book < Grape::Entity
   expose :isbn
   expose :title
   expose :stock
  end
 end
end
```
Hãy chạy lại `localhost:3000/api/v1/books` xem nào, kết quả trả về đã đẹp hơn nhiều rồi đó, không còn những attributes dư thừa nữa. Ok, vậy là method index đã xong, tiếp tục tới method show nào. 
# Return a book by id 
Mở `book.rb` trong v1 lên và thêm đoạn code sau nào
```desc 'Return a specific book'
 route_param :id do
  get do
   book = Book.find(params[:id])
   present book
  end
 end
```
route_param để thể hiện rằng bạn sẽ truyền params lên trong route để lấy được book mong muốn. Chạy thử `http://localhost:3000/api/v1/books/1` và xem kết quả nào.

Nguồn: https://medium.com/@clementrollon/build-a-basic-api-with-grape-api-grape-entity-part-1-5d5fa1cf38db