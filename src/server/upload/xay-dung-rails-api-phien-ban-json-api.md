### JSON API là gì?
Vậy JSON API là gì và điều gì tuyệt vời về nó?
Từ các tài liệu:

* JSON API là một đặc tả về cách client yêu cầu tài nguyên được tìm lấy hoặc sửa đổi và cách server đắp đứng các yêu cầu đó.
* JSON API được thiết kế để giảm thiểu cả số lượng yêu cầu và lường dữ liệu được truyền giữa client và server. Hiệu quả này đạt được mà không ảnh hường đến khả năng đọc và tính linh hoạt.

Để tìm hiểu thêm về những điều tuyệt vời về nó, hãy xem thêm tại bài viết [Programmable Web](https://www.programmableweb.com/news/new-json-api-specification-aims-to-speed-api-development/2015/06/10)
### Làm thế nào để forrmat data?
API JSON serialized data nên chứa các mục sau:
* Root level của response JSOn API là 1 JSON object.
* Object này sẽ chứa key có data cấp cao nhất
* Key có dữ liệu trỏ đến một JSON object đơn biểu thị 1 bản ghi hoặc một tập hợp các JSON object biểu thị các bản ghi. 
* JSON object đại  diện cho một bản ghi sẽ chứa các mục sau: 
1.  ID của bản ghi.
2.  Loại bản ghi, tức là tên của tài nguyên, như "posts" hoặc "cats".
3.  Khóa thuộc tính, trỏ đến một đối tượng JSON chứa các cặp khóa / giá trị đại diện cho các thuộc tính của bản ghi đó. Các thuộc tính xuất hiện ở đây, nếu có, được xác định theo cách bạn tuần tự hóa dữ liệu của mình.
4.  Key ngẫu nhiên của relationships, sẽ trỏ đến một đối tượng JSON mô tả mối quan hệ giữa tài nguyên và các tài nguyên JSON API khác.

Để tìm hiểu thêm về định dạng JSON API, hãy đọc [tài liệu này](https://jsonapi.org/format/).
### Triển khai JSON API trong Rails 5 API
Bây giờ tất cả chúng ta đều tin rằng JSON API là hướng đi và chúng ta có thể hiểu biết cơ bản về cách định dạng dữ liệu, hãy xây dựng nó!
### App
CHúng ta sẽ build Rails 5 API đơn giản phục vụ dữ liệu liên quan đến Cat và sở thích của chúng.
Vì vậy app của chúng ta có 2 tài nguyên chính: Cat và Hobbies. Một con mèo có nhiều sở thích và một sở thích có nhiều con mèo. Chúng ta có mối quan hệ nhiều-nhiều.

**Bước 1: Bắt đầu**

Đầu tiên chạy với Rails 5:
```ruby
gem install rails --pre
rails new catbook --api --database=postgresql
```
Sau đó tiếp tục và cd vào thu mục. Thêm các gem sau vào Gemfile:
```ruby
gem 'active_model_serializers'
gem 'rack-cors'
```
sau đó chạy:
```ruby
bundle install
```
Bây giờ chúng ta cần đặt bộ chuyển đổi API cho JSON API. Tạo file `config/initializers/active_model_serializer.rb` và thiết lập:
```ruby
ActiveModelSerializers.config.adapter = :json_api
```
Điều này sẽ báo cho Rails biết tuần tự hóa dữ liệu của chúng ta theo định dạng JSON API.
Chúng ta cũng phải yêu cầu app của mình chấp JSON API khi nhận dữ liệu(khi jhacsh hàng của chúng ta POST dữ liệu cho máy chủ). Trong cùng file thêm như sau:
```ruby
api_mime_types = %W(
  application/vnd.api+json
  text/x-json
  application/json
)
Mime::Type.register 'application/vnd.api+json', :json, api_mime_types
```
Cuối cùng đừng quên thiết lập CORS. Ta sử dụng gem `rack-cors`.

**Bước 2: Domain Model**

Tạo tài nguyên cho Cat, Hobby và Cat Hobbies. Migrate cho Cat với các thuộc tính sau:
```ruby
class CreateCats < ActiveRecord::Migration[5.0]
  def change
    create_table :cats do |t|
      t.string :name
      t.string :breed
      t.string :weight
      t.string :temperament
      t.timestamps
    end
  end
end
```
Hobby:
```ruby
class CreateHobbies < ActiveRecord::Migration[5.0]
  def change
    create_table :hobbies do |t|
      t.string :name
      t.timestamps
    end
  end
end
```
và Cat Hobbies:
```ruby
class CreateCatHobbies < ActiveRecord::Migration[5.0]
  def change
    create_table :cat_hobbies do |t|
      t.references :cat, index: true
      t.references :hobby, index: true
      t.timestamps
    end
  end
end
```
Sau đó thiết lập Model với các associations:
```ruby
# app/models/cat.rb

class Cat < ApplicationRecord
  has_many :cat_hobbies
  has_many :hobbies, through: :cat_hobbies
end
```
```ruby
# app/models/hobby.rb

class Hobby < ApplicationRecord
  has_many :cat_hobbies
  has_many :cats, through: :cat_hobbies
end
```
```ruby
# app/models/cat_hobby.rb

class CatHobby < ApplicationRecord
  belongs_to :cat
  belongs_to :hobby
end
```
**Bước 3: Routes và Controllers**

Chúng ta sẽ đặt namespace cho các router theo cách sau:
```ruby
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :cats, except: [:new, :edit]
      resources :hobbies, except: [:new, :edit]
    end
  end
end
```
và cấu trúc Controller:
```ruby
├── app
    ├── controllers
        ├── api
            └── v1
                ├── cats_controller.rb
                └── hobbies_controller.rb
        ├── application_controller.rb
```
Lưu ý răng không có định nghĩa nào về router của Cat Hobbies. Đó là bởi vì người dùng sẽ sử dụng dữ liệu này sẽ cần hiển thị cat và hobbies liên quan của chúng, cũng như hobbies và cat liên quan của chúng, nhưng không phải là Cat Hobbies.

**Bước 4: Serializers và JSON Renderin**

Khi khách hàng yêu cầu các bản ghi về cat, chúng ta cũng muốn bao gồm các bản ghi về hobbies liên quan. Trong thực tế chúng ta muốn side load dữ liệu đó. Điều này có nghĩa là chúng ta sẽ bào gồm toàn bộ bản ghi về một hobbies hoặc hobbies liên quan nhất định, khi khác hàng yều cầu bản ghi về cat.

**Cat Serializer**

Bây giờ xác định Cat Serializer của chúng ta để serialize  thuộc tính của cat, cùng với hobbies liên quan của nó.
```ruby
class CatSerializer < ActiveModel::Serializer
  attributes :id, :name, :breed, :weight, :temperament
  has_many :hobbies
end
```
Điều này sẽ cho Rail bao gồm một Key về các mối quan hệ, mô tả các dữ liệu liên quan, khi phục vụ các bản ghi cho cat.
Vì vậy nếu chúng ta định nghĩa Cats#index như sau:
```ruby
module Api
  module V1
    class CatsController < ApplicationController

      def index
        render json: Cat.all
      end

    end
  end
end
```
Chúng ta sẽ thấy điều này khi khác hàng gửi yêu cầu:
```ruby
# GET /api/v1/cats

{
  data: [
    {
      id: "1",
      type: "cats",
      attributes: {
        name: "Moe",
        breed: "Tabby",
        weight: "fat",
        temperament: "entitled"
       },
      relationships: {
        hobbies: {
          data: [
           {
              id: "1",
              type: "hobbies"
            }
          ]
        }
      }
     },
    {
      id: "2",
      type: "cats",
      attributes: {
        name: "Ciprian",
        breed: "Calico",
        weight: "skinny",
        temperament: null
      },
      relationships: {
        hobbies: {
          data: [
            {
              id: "2",
              type: "hobbies"
            }
          ]
        }
      }
    }
  ]
}
```
Chúng ta có thể thấy Key mối quan hệ tồn tại, mô tả dữ liệu hobbies liên quan cho mỗi cat. Nhưng chúng ta vẫn không side load dữ liệu của chúng ta. Không có bản ghi hobbies thực tế có mặt ở đây.

Để side load dữ liệu chúng ta cần phải thêm vào controller:
```ruby
render json: Cat.all, include: ['hobbies']
```
Điều này sẽ trả về dữ liệu sau:
```ruby
# GET /api/v1/cats

{
   "data": [
      {
         "id": "1",
         "type": "cats",
         "attributes": {
            "name": "Moe",
            "breed": "Tabby",
            "weight": "fat",
            "temperament": null
         },
         "relationships": {
            "hobbies": {
               "data": [
                  {
                     "id": "1",
                     "type": "hobbies"
                  }
               ]
            }
         }
      },
      {
         "id": "2",
         "type": "cats",
         "attributes": {
            "name": "Ciprian",
            "breed": "Calico",
            "weight": "skinny",
            "temperament": null
         },
         "relationships": {
            "hobbies": {
               "data": [
                  {
                     "id": "2",
                     "type": "hobbies"
                  }
               ]
            }
         }
      }
   ],
   "included": [
      {
         "id": "1",
         "type": "hobbies",
         "attributes": {
            "name": "eating"
         },
         "relationships": {
            "cats": {
               "data": [
                  {
                     "id": "1",
                     "type": "cats"
                  }
               ]
            }
         }
      },
      {
         "id": "2",
         "type": "hobbies",
         "attributes": {
            "name": "playing"
         },
         "relationships": {
            "cats": {
               "data": [
                  {
                     "id": "2",
                     "type": "cats"
                  }
               ]
            }
         }
      }
   ]
}
```
Bây giờ chúng ta có key cấp cao nhất bao gồm các bản ghi hobbies thực tế có liên quan đến request của cat.

**Tối ưu hóa: N+1**

Tuy nhiên hiện tại dữ liệu này hơi chậm để load, vì nó gửi yêu cầu đến cơ sở dữ liệu cho sở thích của từng con mèo, từng con một. Chúng ta ta đang thực hiện 2 request database sau:
```sql
Cat Load (0.4ms)  SELECT "cats".* FROM "cats" INNER JOIN "cat_hobbies" ON "cats"."id" = "cat_hobbies"."cat_id" WHERE "cat_hobbies"."hobby_id" = $1  [["hobby_id", 1]]

Cat Load (0.2ms)  SELECT "cats".* FROM "cats" INNER JOIN "cat_hobbies" ON "cats"."id" = "cat_hobbies"."cat_id" WHERE "cat_hobbies"."hobby_id" = $1  [["hobby_id", 2]]
```
Hãy clean cái này và chỉ truy vấn database của chúng ta 1 lần, cho tất cả các sở thích liên quan đến tát cả con mèo.

Thay đổi render trong controller:
```ruby
render json: Cat.includes(:hobbies), include: ['hobbies']
```
Điều này thay đổi query trong database của chúng ta nhưu sau:
```sql
CatHobby Load (1.1ms)  SELECT "cat_hobbies".* FROM "cat_hobbies" WHERE "cat_hobbies"."hobby_id" IN (1, 2)
```
**Hobby Serializer**

Bạn có thể nhận thấy rằng dữ liệu của chúng ta phục vụ trong bản ghi Hobby bao gồm Key relationship, lần lượt chỉ vào dữ liệu mô tả của nhưng con mèo liên quan. Đó là bời vì ta đã thiết lập Hobby Serialize của mình.
```ruby
class HobbySerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :cats
end
```
Ngoài ra bạn có thể sử dụng các mục sau trong Hobby controller của mình để đảm bảo rừng các bản ghi Cat được `includes` tức là đã được side load, để đáp ứng bất kỳ request nào cho hobbies.
```ruby
module Api
  module V1
    class HobbiesController < ApplicationController

      def index
        render json: Hobby.includes(:cats), include: 
          ['cats']
      end
    end
  end
end
```
Và đó là nó :v 

Link tham khảo: https://www.thegreatcodeadventure.com/building-a-super-simple-rails-api-json-api-edition-2/