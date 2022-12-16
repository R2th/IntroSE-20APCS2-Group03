# Giới thiệu
Swagger là 1 tool hỗ trợ trong việc thiết kế Api 1cách dễ dàng.  Swagger cho phép bạn miêu tả cấu trúc Api của bạn, nó sẽ giúp cho cấu trúc Api của bạn được xây dựng 1 cách đẹp và có thể tương tác với tài liệu API.

Bạn thử tưởng tượng việc bạn phải viết 1 đống Api bằng tay, rất dễ nhầm lẫn mà không có cách kiểm tra tự động nào ngoài việc bạn phải tự ngồi check xem params, method, type... có đúng hay chưa. Chưa kể khi bạn phải viết bằng nhiều ngôn ngữ khác nhau nữa. 

Quá nhiều việc để làm phải không nào?
Swagger sẽ giúp bạn làm những việc đó : từ việc tạo tài liệu api cũng như tự động đến việc test cấu trúc api...

# Cài đặt
Mình cũng chưa có dự án nào để áp dụng Swagger vào cả. Nên mình cũng chỉ giới thiệu 1 cách cơ bản và dễ hiểu nhất những gì mình đã tìm hiểu thôi nhé đủ để các bạn có áp dụng được (hihi) ^^

Bài viết này mình hướng dẫn với env Ruby On Rails

Lúc đầu mình chọn `gem swagger-docs` tuy nhiên sau khi đọc trên https://github.com/richhollis/swagger-docs thì thằng này nó chỉ hỗ trợ swagger 1.2 thôi. và nó khuyên nếu muốn sử dụng version 2.0 của swagger thì sử dụng `gem swagger-blocks`. 

OK fine. Cái j mới chả thích. Mình lượn qua bên swagger-blocks luôn.

Giờ mình bắt đầu vào làm luôn nhé

1.  Tạo nhanh 1 project rails + model User nhé ^^
    
    * `rails new Swagger-API-Rails`
    * `cd Swagger-Api-Rails`
    * `rails g model User name:string email:string age:integer address:string gender:boolean`
    * `rake db:migrate`
2.  add gem vào gemfile
    
    * `gem "swagger-blocks"` // như mình đã giải thích ở trên, ở bài viết này mình sẻ sử dụng gem `swagger-block` thay thì `swagger-docs`
    * `gem "swagger-ui-engine"` // gem này để hiển thị UI nhé. mình sẽ hướng dẫn config nó sau.
    * `bundle install`
3. settings routes
   
   * 
       ```
       namespace :api do
        namespace :v1 do
          resources :users
          get "api_docs" => "api_docs#index"
        end
      end
      mount SwaggerUiEngine::Engine, at: "/api_docs"
       ```
   * `rails s`
4. Tạo file swagger_ui_engine.rb
     ```
     # config/initialzers/swagger_ui_engine.rb
     unless Rails.env.production?
      SwaggerUiEngine.configure do |config|
        config.swagger_url = {
          v1: "/api/v1/api_docs"
        }

        config.validator_enabled = false
        config.json_editor = true
        config.request_headers = true
      end
    end
     ```
5.  tạo file api_docs_controller.rb để config swagger
      ```
      module Api::V1
      class ApiDocsController < BaseApiController
        include Swagger::Blocks
        skip_before_action :authorzation_user

        swagger_root do
          key :swagger, '2.0'
          info do
            key :version, '1.0'
            key :title, 'Title'
            key :description, "Description \
            "demonstrate features in the swagger-2.0 specification"
          end
        end

        SWAGGERED_CLASSES = [
          Api::V1::UsersController,
          self,
        ].freeze

        def index
          render json: Swagger::Blocks.build_root_json(SWAGGERED_CLASSES)
        end
      end
    end
      ```
6. User Controller
       
      ```
          include Swagger::Blocks
          swagger_path '/users/{id}' do  #link path request to server
            operation :get do # method get
              key :summary, 'Find User by ID' # summary
              key :description, 'Returns a single user if the user has access'  # description
              # định nghĩa params
              parameter do
                key :name, :id # name hiển thị là id 
                key :in, :path # phương thức add params vào path. VD: lúc request lên sẽ là users/1
                key :description, 'ID of user to fetch'
                key :required, true # validate 
                key :type, :integer # type params
                key :format, :int64 # format params
              end
              response 200 do
                # when get user succes
                key :description, 'user response'
                schema do
                  key :'$ref', :user_info
                end
              end
              response :default do
                # when get user failed
                key :description, 'unexpected error'
                schema do
                  key :'$ref', :ErrorModel
                end
              end
            end
          end
          
          # create schema return response 
          swagger_schema :user_info do
            key :required, [:id]
            property :token do
             key :email, :string
             key :name, :string,
             key :age, :integer,
             key :address, :string,
             key :gender, :boolean
            end
            property :uid do
              key :type, :string
            end
          end
          
          swagger_path '/users' do
            operation :post do # method post
              key :description, 'Creates a new user.  Duplicates are allowed'
              parameter do
                key :name, :email
                key :in, :body 
                key :description, 'User Email'
                key :required, true
                schema do
                  key :'$ref', :EmailInput
                end
              end
              response 200 do
                key :description, 'email response'
                schema do
                  key :'$ref', :User
                end
              end
              response :default do
                key :description, 'unexpected error'
                schema do
                  key :'$ref', :ErrorModel
                end
              end
            end
          end
      ```

Cấu trúc khá dễ hiểu phải không nào?

# Cấu trúc thư mục
Bước đầu init project + setup gem + môi trường đã ok rồi. Giờ mình sẽ miêu tả thêm về cấu trúc

Thông thường mình sẽ tách riêng logic của api riêng cụ thể ở đây để cho user_controller không bị phình to và code dễ dàng hơn

Cụ thể ở đây là `controllers/api/v1/users_controller.rb`

Theo Document của Swagger thì sẽ viết api doc trong user_controller. Tuy nhiên nó dễ phình to và việc viết doc trong controller nghe cũng không được được lý tưởng lắm. Do vậy mình sẽ tạo 1 module rồi import vào user controller

Cụ thể ở đây là : `controllers/concerns/swagger/users_api.rb`

Tiện thể tạo luôn 1 file  `paramters.rb` và `error_responses.rb`trong trong thư mục swagger luôn 

Giải thích các file trong controllers:
`user_controller.rb` sẽ là nơi sử lý và trả về dữ liệu
`users_api.rb` sẽ là nơi config để swagger có thể render ra document api
`parameters.rb` là nơi sẽ định nghĩa các params có thể gọi ở nhiều nơi
`error_response.rb` cũng là nơi định nghĩa các errors có thể gọi ở nhiều nơi
hỗ trợ việc DRY code đẹp hơn ý mà

Tạo 1 file `models/concerns/swagger/user_schema.rb` để định nghĩa response và type trong model

Như vậy cấu  trúc thư mục của ta sẽ có

```
-controllers
  - api
    - v1
      - user_controller.rb
  - concerns
   - swagger
     - user_api.rb
     - parameters.rb
  
- models
  - concerns
    - swagger
      - user_schema.rb
```

Từ cấu trúc này các bạn thử refactor lại code ở trên nhé. 
# Kết Luận
Vậy là mình đã giới thiệu xong Swagger cũng như cấu trúc thư mục để viết 1 swagger dễ đọc và dễ hiểu.

Tài liệu tham khảo: 

https://github.com/fotinakis/swagger-blocks

https://github.com/richhollis/swagger-docs

https://github.com/zuzannast/swagger_ui_engine