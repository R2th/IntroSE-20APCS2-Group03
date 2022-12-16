Ta có thể dễ dàng xây dựng một API application với  `Rails`: define REST endpoint trong `config/routes.rb`, logic được handle trong các controllers kế thừa lớp `ActionController::API`, và trả về json response (việc response các object ( `ActiveRecord`) có thể dùng [gem blueprinter](https://github.com/procore/blueprinter) support việc serializer object).

Bài viết này mình sẽ giới thiệu một phương pháp dựng một API application hoàn toàn mới, đó là **grape**.

:comet:

## Grape
**Grape** là một `ruby` API framework, phục vụ việc xây dựng RESTful API application được viết dựa trên `Rails` hay `Sinatra`.

`Grape` có một số ưu điểm:

* Dễ dàng tích hợp API documents ([gem grape-swagger](https://github.com/ruby-grape/grape-swagger-rails)).
* Dễ dàng trong việc define các API endpoints.
* Các `parameters` được support validate ở mức basic (`allow_blank`, `values` (like enums), ...)
* Support version
* Grape API nhanh hơn các API khác cho `rails` application.

Để sử dụng `grape`: 
```ruby
gem 'grape'
```

### Routes
Các API endpoints sẽ được define trong các class kế thừa `Grape::API`, trước hết cần tạo ra 1 class `API::BaseAPI` kế thừa `Grape::API` và mount class này trong `config/routes`:

```ruby
# config/routes.rb

Rails.application.routes.draw do
  mount API::BaseAPI => "/api"
end
```

### Grape API
Mọi việc từ define endpoints, chỉ định response format, version, ... đều được gom trong các class kế thừa `Grape::API`, ta define class `API::BaseAPI` kế thừa `Grape::API` (các class sau được mount từ class Base này):


```ruby
# app/api/base_api.rb

class API::BaseAPI < Grape::API
  format :json # xml

  mount API::V1::BaseAPI
end
```

các version được define trong class `API::V1::BaseAPI`(ver 1):
```ruby
# app/api/v1/base_api.rb

class API::V1::BaseAPI < Grape::API
  version 'v1'
  
  get :status do
     { status: :ok }
  end
end
```

### Parameter validations
`Grape` support validate các params ở mức basic, các validate được definde trong block `params` (đặt trước phần code define endpoint):

```ruby
# app/api/v1/base_api.rb

class API::V1::BaseAPI < Grape::API
  version 'v1'
  
  params do
    requires :status, type: Integer, allow_blank: false
  end
  get :status do
     { status: :ok }
  end
end
```

* Các `Type` được support: `Integer`, `Float`, `DateTime`, `File`, `JSON`, ... ([Supported Parameter Types](https://github.com/ruby-grape/grape#supported-parameter-types))
* Support nhiều loại `Type` [Multiple Allowed Types](https://github.com/ruby-grape/grape#multiple-allowed-types)
* Các loại build-in validate: `allow_blank`, `values`, `except_values`, `same_as`, `regexp`, ... ([Built-in Validators](https://github.com/ruby-grape/grape#built-in-validators))
* Support custom lại error message: [Custom Validation messages](https://github.com/ruby-grape/grape#custom-validation-messages)

### Model representations

Các object (`ActiveRecord`) được response qua method `present` với tham số là object cần response và class nào phụ trách việc define `entity` được trả về. Một trong những `Entity` được sử dụng phổ biến là [Grape Entity](https://github.com/ruby-grape/grape-entity)

## Grape entity

Thêm gem vào trong `Gemfile`:
```ruby
gem 'grape'
gem 'grape-entity'
```

Ta định nghĩa class `API::Entities::Status` là class `present` cho model `Status`

```ruby
# app/api/entities/status.rb

module API
  module Entities
    class Status < Grape::Entity
      expose :ip
      expose :status, format_with: :integer
      expose :message, format_with: :string, if: { type: :detail }
    end
  end
end
```

Sử dụng class này trong `GrapeAPI`:

```ruby
# app/api/v1/base_api.rb

class API::V1::BaseAPI < Grape::API
  version 'v1'
  
  params do
    requires :status, type: Integer, allow_blank: false
  end
  get :status do
     present Status.first, with: API::Entities::Status, type: :detail
  end
end
```

Một số options có thể xem ở [đây nhé](https://github.com/ruby-grape/grape-entity#defining-entities).

---
Trên đây là tìm hiểu của mình về `Grape` API trong `Rails`, cảm ơn đã đọc bài viết và mong muốn đóng góp từ các bạn :pig: