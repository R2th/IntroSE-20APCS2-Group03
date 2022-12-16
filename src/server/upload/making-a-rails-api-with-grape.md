Grapes không chỉ là một thực phẩm :D. Grape còn là một gem có thể giúp chúng ta xây dựng lên các REST-ful APIs trong framework Rails. Bài viết này sẽ nói về Grape, là một gem chứ không phải quả nho :))

# What is Grape?

Grape là một micro-framework về REST API giúp bổ sung, tích hợp việc phát triển API cho các framework phát triển web hiện nay, bằng việc cung cấp một giao diện DSL đơn giản để mô tả các API. Nó được hỗ trợ mạnh để tích hợp với các convention cho nhiều định dạng, subdomain, prefix hay version.

Việc tích hợp gem Grape trong ứng dụng Rails cho phép chúng ta sử dụng Grape DSL để dễ dàng xây dựng các API từ phía backend. Theo đó, với bất kì client nào, thông qua request HTTP, có thể truy cập và edit dữ liệu trong database.

# Set Up

Trong ví dụ này, chúng ta sẽ cùng nhau tạo một API từ ứng dụng Rails đơn giản để lưu trữ một directory của mọi người trong cơ sở dữ liệu Postgresql. 
Đầu tiên, thêm gem 'grape' trong Gemfile và thực hiện lệnh bundle install.

Giờ là lúc thiết lập cấu trúc file API. Trong thư mục con controllers của app, tạo một folder api

```
app
 |––controllers
       |––api
```

Đây là nơi chúng ta sẽ xây dựng framework cho API. Ngoài ra, bạn có thể tạo một thư mục api ở đường dẫn cao nhất trong ứng dụng. Nếu làm vậy, nhớ thêm đường dẫn đó trong config Rails load path của file config/application.rb

# Building the API

Grape API là các ứng dụng Rack, được tạo bởi subclass của API module hay các lớp bên dưới Grape::API.

## Creating the API Module and Base Class

Chúng ta sẽ bắt đầu định nghĩa API module và class base, cái mà kế thừa từ Grape::API.

Tạo một file, base.rb trong thư mục con api:

```
app
 |––controllers
       |––api
           |––base.rb
```

và input:

```
module API
  class Base < Grape::API
    mount API::V1::Base
  end
end
```

Chúng ta đã thiết lập module API, định nghĩa lớp Base(cái mà kế thừa từ Grape::API) và mount một số thứ khác trong lớp đó. 

## The mount keyword in rails

Keyword 'mount' nói cho ứng dụng Rails rằng, có một ứng dụng khác(thường là rack và trong trường hợp này là Grape API) đang tồn tại tại vị trí đó. Việc mounting một ứng dụng rack ở đây có nghĩa rằng các base function hiện đang avaiable trong ứng dụng Rails của chúng ta.

## Versioning

Framework Grape hỗ trợ versioning. Có nghĩa rằng, chúng ta sẽ nhóm các API bên trong một version hay module v1. Các version mà chúng ta có thể phát triển trong tương lai, sẽ được lồng bên trong các version v2, v3...module.

## Nesting Our Modules

Tạo một thư mục con v1 bên trong thư mục api:

```
app
 |––controllers
       |––api
           |––base.rb
           |––v1
```

Trong phần trước, chúng ta đã tạo Class Base trong thư mục api. Lớp này mount một version v1. Giờ là lúc xây dựng môtj lớp base dành riêng cho version v1.

Tạo một file base.rb trong thư mục v1:

```
app
 |––controllers
       |––api
           |––base.rb
           |––v1
               |––base.rb
```

Lớp này sẽ chịu trách nhiệm: mount những lớp khác, cái mà sẽ truy cập đến model Graduate. Đặt đoạn code sau vào file app/controllers/api/v1/base.rb: 

```
module API
  module V1
    class Base < Grape::API
      mount API::V1::Graduates
      # mount API::V1::AnotherResource
    end
  end
end
```

Chúng ta vừa mới mount lớp Graduates, cái mà sẽ truy cập đến model Graduate và database của chúng ta.

Tạo một file graduates.rb in đường dẫn v1:

```
app
 |––controllers
       |––api
           |––base.rb
           |––v1
               |––base.rb
               |––graduates.rb
```

## Defining Our API Endpoints

Chúng ta sẽ định nghĩa lớp Graduates, bên trong module API, để respond một request GET cho tất cả các grads và một request GET cho một grad duy nhất.
Trong file app/controllers/api/v1/graduates.rb:

```
module API
  module V1
    class Graduates < Grape::API
      include API::V1::Defaults

      resource :graduates do
        desc "Return all graduates"
        get "", root: :graduates do
          Graduate.all
        end

        desc "Return a graduate"
        params do
          requires :id, type: String, desc: "ID of the 
            graduate"
        end
        get ":id", root: "graduate" do
          Graduate.where(id: permitted_params[:id]).first!
        end
      end
    end
  end
end
```

Lớp Graduates đã ở bên trong function API như là một controller.

Đầu tiên, chúng ta chỉ định một resource hay model mà chúng ta muốn truy cập với cú pháp: resource :graduates do.
Sau đó, chúng ta định nghĩa các request GET, cái mà return đến client thông tin phù hợp tương ứng.

### Getting All the Graduates

Block này:

```
desc "Return all graduates"
        get "", root: :graduates do
          Graduate.all
        end
```

để đảm bảo rằng, khi một client thực hiện một request GET đến đường dẫn root của API, GET http://localhost:3000/api/v1/graduates, server sẽ trả lại tất cả các graduates, Graduate.all.

### Getting Just One Graduate

Block này:

```
desc "Return a graduate"
        params do
          requires :id, type: String, desc: "ID of the 
            graduate"
        end
        get ":id", root: "graduate" do
          Graduate.where(id: permitted_params[:id]).first!
        end
```

đảm bảo rằng khi một client gửi một request GET đến http://localhost:3000/api/v1/graduates với param trong require, server sẽ trả lại graduate tương ứng với id đúng đó.

Bạn có lẽ đang chú ý đến lớp Graduates được mix hay được include module khác:

```
include API::V1::Defaults
```

### The Default Mixin

Có một số thứ dùng chung cho tất cả lớp API trên tất cả các version hay resource, sẽ được khai báo chung trong file default.
Tạo file defaults.rb trong file: app/controllers/api/v1/defaults.rb

```
module API
  module V1
    module Defaults
      extend ActiveSupport::Concern

      included do
        prefix "api"
        version "v1", using: :path
        default_format :json
        format :json
        formatter :json, 
             Grape::Formatter::ActiveModelSerializers

        helpers do
          def permitted_params
            @permitted_params ||= declared(params, 
               include_missing: false)
          end

          def logger
            Rails.logger
          end
        end

        rescue_from ActiveRecord::RecordNotFound do |e|
          error_response(message: e.message, status: 404)
        end

        rescue_from ActiveRecord::RecordInvalid do |e|
          error_response(message: e.message, status: 422)
        end
      end
    end
  end
end
```

Ở đây, chúng ta sử dụng ActiveSupport::Concern để thêm một số hành vi cho các lớp Grape::API nào include nó. Chúng ta cũng đã thêm một số method để rescue và handle lỗi.

Okay, chúng ta đã xây dựng API module và endpoints Graduate. Giờ chúng ta cần set up routes, định nghĩa serializer và tạo doc API

## Routing

Trong file config/routes.rb, edit

```
Rails.application.routes.draw do
  mount API::Base, at: "/"
end
```

# CORS

## What is a cross-site request?

Cross-site HTTP requests là những request HTTP cho tài nguyên từ một domain khác. Các request như vậy phải tuân theo các hạn chế về bảo mật. Để hạn chế và khắc phục an toàn, W3C đã phát triển CORS.

## What is CORS?

Cross-Origin Resource Sharing(CORS) cung cấp cách thức cho một server để support khác request cross-site và cho phép truyền dữ liệu giữa các tên miền, trang web khác nhau một cách an toàn.

## How can our API utilize CORS?

Với gem rack-cors, gem này cung cấp Middleware Rack CORS đến ứng dụng Rails, cho phép nó support các CORS.

## Setting up Rack-CORS

Có vài bước set up :

1. Add đến gemfile và bundle install:

```
gem 'rack-cors', :require => 'rack/cors'
```

2. Add module API đến config/application.rb và config Middleware Rack-CORS:

```
module Api
  class Application < Rails::Application
    config.middleware.use Rack::Cors do
      allow do
        origins "*"
        resource "*", headers: :any, methods: [:get, 
            :post, :put, :delete, :options]
      end
    end
    config.active_record.raise_in_transactional_callbacks = true
  end
```

Với origin * cho phép API của chúng ta chấp nhận các request HTTP từ bất kì domain nào khác trên internet. Với resource * nghĩa là các request có thể truy cập vào bất kì resource nào.

# Serializing

Khi client access một API của chúng ta:

1.  Client gửi một request HTTP GET đến API của chúng ta thông qua: 

```
http://ourawesomedomainname/api/v1/graduates
```

2. Request đó được chuyển hướng đến lớp Graduates, cái mà chúng ta đã viết nó trong API module, trong file: app/controllers/api/v1/graduates.rb. Lớp đó sẽ respond lại toàn bộ các grads đến client bằng đoạn code:

```
get "", root: :graduates do
   Graduate.all
end
```

3, Bộ Serializer của chúng ta đến lúc này sẽ return các giá trị được gọi trong Graduate.all và converts nó đến 1 mảng các đối tượng Ruby trong JSON.

Chúng ta sẽ sử dụng một gem để giúp serializer dữ liệu

## Grape::ActiveModelSerializers

Hãy cùng nhau set up:

1. Thêm gem 'grape-active_model_serializers' đến Gemfile và bundle install.
2. Chỉ định cho API sử dụng Grape::Formatter::ActiveModelSerializers trong file app/controllers/api/v1/defaults.rb

```
module API
  module V1
    module Defaults
      extend ActiveSupport::Concern

      included do
        prefix "api"
        version "v1", using: :path
        default_format :json
        format :json
        formatter :json, 
             Grape::Formatter::ActiveModelSerializers
         ...
```

3. Viết serializer của bạn

## Writing Our Serializer

Tạo một đường dẫn, serializers bên trong thư mục app. Và tạo file graduate_serializer.rb bên trong đường dẫn đó. Đây là nơi mà serializer sẽ được thực thi.

Serializers được chỉ định và thực thi thông qua tên của model active_record. Vì vậy, grape-active_model_serializers sẽ tìm kiếm serializers cho những đối tượng được returned bởi grape API. Khi chúng ta gọi Graduate.all trong API, thì serializers gem sẽ tìm kiếm serializers với tên tương tự.

Bây giờ, chúng ta sẽ định nghĩa serializer để serializer tất cả các attributes mà một graduate có

```
class GraduateSerializer < ActiveModel::Serializer

  attributes :id, :first_name, :last_name, :cohort, 
       :current_job, :bio, :news, :website, :picture, 
       :created_at, :updated_at
end
```

# Grape Swagger

Gem grape-swagger sẽ tự động tạo DOC theo tiêu chuẩn Swagger cho Grape API của chúng ta. Chúng ta sẽ cùng nhau sử dụng nó:

1. Add gem "grape-swagger" đến gemfile và bundle install
2. Add doc grape-swagger lớp root hay lớp base trong API.
3.  Add doc endpoint đến routes

## Adding grape-swagger to our base class

Mở file app/controllers/api/v1/base.rb và edit nó:

```
require "grape-swagger"

module API
  module V1
    class Base < Grape::API
      mount API::V1::Graduates
      # mount API::V1::AnotherResource

      add_swagger_documentation(
        api_version: "v1",
        hide_documentation_path: true,
        mount_path: "/api/v1/swagger_doc",
        hide_format: true
      )
    end
  end
end
```

## Adding a documentation route

Add trong config/routes.rb:

```
mount GrapeSwaggerRails::Engine, at: "/documentation"
```

bây giờ, khi bạn truy cập vào link http://localhost/documentation, bạn sẽ được chuyển hướng đến base url: http://localhost:3000/api/v1/swagger_doc


![](https://images.viblo.asia/b35254e9-f320-4269-9a5b-bd4a7a06fb72.png)https://images.viblo.asia/b35254e9-f320-4269-9a5b-bd4a7a06fb72.png

![](https://images.viblo.asia/6cc25388-4eb6-40f6-90cd-feef6126b325.png)https://images.viblo.asia/6cc25388-4eb6-40f6-90cd-feef6126b325.png

Source:

https://www.thegreatcodeadventure.com/making-a-rails-api-with-grap/