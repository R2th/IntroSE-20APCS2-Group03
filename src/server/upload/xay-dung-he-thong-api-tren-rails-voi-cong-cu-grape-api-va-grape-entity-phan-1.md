đây là một bài viết được viết dựa theo bài viết dưới đây:
https://medium.com/@clementrollon/build-a-basic-api-with-grape-api-grape-entity-part-1-5d5fa1cf38db

Ý chính của bài viết là xây dựng một hệ thống API đơn giản trên Ruby on Rails bằng công cụ Grape và Grape-Entity

Chúng ta sẽ thử xây dựng một hệ thống quản lý Book Store bằng Api. 

## Xây dựng hệ thống

Đầu tiên, chúng ta cần xây dựng hệ thống model và controller trước
```
rails g model Book isbn:integer title stock:integer

rails g controller Books

rails g model Flow previousStock:integer neStock:integer book:references

rails g controler Flows
```
sau đó ta sẽ chạy lệnh để  build `Database`
```
rails db:migrate
```
tiếp theo chúng ta cần phải add `relationship` cho `Book` và `Flow`, chúng ta thêm `has_many: flows` vào trong file model `Book.rb`

### Add Gems
Tiếp sau đây là 4 `Gem` cần thiết để chúng ta build API
```
Grape: nó là một `micro framework` được xây dựng giống như REST với mục địch là cung cấp DSL đơn giản để dễ dàng truy cập vào các API. Hiện tại nó đã hỗ trợ rất nhiều các quy ước chung và định dạng
```
```
Grape-Entity: là một hệ thống tập trung các API, cho phép truy cập bất kì chỗ nào trong cơ sử dữ liệu và đưa ra những thông tin muốn hiển thị
```
```
Grape On Rails Routes: đây là một Gem vô cùng hữu ích để xây dựng `routes` cho API
```
```
Faker: đây là một Gem hỗ trợ để tạo dữ liệu mẫu rất tiện lợi
```
### Chúng ta sẽ faker dữ liệu trong DB
sau khi chúng ta cài đặt gem `Faker` chúng ta có thể add thêm đoạn dưới đây vào file `seed.rb` để tự tạo dữ liệu:
```
15.times do
 Book.create!(isbn: Faker::Number.number(4),
             title: Faker::Superhero.power, stock: Faker::Number.between(2, 19))
end
book_ids = Book.ids
95.times do
 Flow.create!(book_id: book_ids.sample,
             newStock: Faker::Number.between(2, 15), previousStock:    Faker::Number.between(2, 15))
end
```
sau đó chúng ta chạy lệnh sau trên màn hình `command`:
```
rake db:seed
```

### Bây giờ chúng ta bắt đầu xây dựng API
chúng ta sẽ thêm đoạn dưới đây để gọi các API sẽ viết thông qua file `application.rb`.
```
config.paths.add File.join(‘app’, ‘api’), glob: File.join(‘**’, ‘*.rb’)
config.autoload_paths += Dir[Rails.root.join(‘app’, ‘api’, ‘*’)]
```
bây giờ chúng ta sẽ viết thử API đầu tiên:
đầu tiên chúng ta tạo file `book_store` trong file `api` bằng lệnh dưới đây:
```
mkdir -p app/api/book_store
```
chúng ta tạo file `base.rb` trong file `book_store`
```
touch app/api/book_store/base.rb
```
chúng ta thêm dữ liệu vào `base.rb` giống như dưới đây:
```
module BookStore
 class Base < Grape::API
  mount BookStore::V1::Books
 end
end
```
### Route
giờ chúng ta đã có file thư mực `api`, giờ làm sao để chúng ta điều hướng đến file đó, chúng ta sẽ thêm đoạn dưới đây vào file `routes.rb`
```
mount BookStore::Base => '/'
```
### Tạo method đầu tiên
```
mkdir -p app/api/book_store/v1
touch app/api/book_store/v1/books.rb
```
và chung ta ghi đoạn code sau vào trong fiel `books.rb`:

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
Chúng ta nên nhớ rằng xây dựng hệ thống Api cũng tương tự như xây dựng hệ thống App thông thường

một vài giải thích sơ bộ dưới đây:

**version ‘v1’, using: :path** : chỉ định version của Api này là v1

**format :json** : chỉ định đầu ra là **json**
**prefix :api** : chỉ định tiền tố trong đường link là **/api/**

**resource :books** : thể hiện là chúng ta sử dụng routes là **books** 

**desc ‘Return list of books’** : Mô tả về những gì đang làm và mong đợi trả ra

**get do …end** : đây là một hàm trả về thông thường

### Bước cuối cùng
trước khi chạy bạn nên check lại `routes` xem có ổn không bằng lệnh dưới đây:
```
rails grape:routes
```
nó sẽ trả về kết quả dưới đây:
```
GET  |  /api/:version/books(.json)  |  v1  |  Return list of books
```
Giờ chúng ta đã tạo xong API đầu tiên, hãy tự tận hưởng nó bằng cách vào đường link dươi đây:
```
[http://localhost:3000/api/v1/books](http://localhost:3000/api/v1/books)
```
### Kết luận:
Vậy là chúng ta đã hoàn thành xây dựng một hệ thống API nhỏ vô cùng đơn giản với `grape` và `grape-entity`, và ở phần tiếp theo chúng ta sẽ đến với cách làm thể nào để hiện thị thông tin chi tiết của books

Xin cảm ơn và hẹn gặp lại các bạn