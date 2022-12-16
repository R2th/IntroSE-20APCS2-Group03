Như các bạn đã biết, 1 ứng dụng API sẽ không có giao diện cho người dùng trên trình duyệt, thay vào đó sẽ là các dữ liệu kiểu JSON hoặc XML ... được hiển thị mà thôi. Do đó, khi viết 1 ứng dụng API đòi hỏi người viết phải viết Documents (Tài liệu) kèm theo để hỗ trợ cho những Developers sử dụng chúng và đặc biệt là QA, những người sẽ gặp nhiều khó khăn hơn trong việc hiểu được tác dụng của các API.

Có nhiều cách để viết Documents, đơn giản nhất sẽ là viết bằng tay ra file Excel hoặc Word chẳng hạn. Chỉ rõ API này mục đích làm gì, URL để truy cập đến như thế nào, dữ liệu gửi Request là gì, Dữ liệu Response trả về là gì ... Xong rồi thì gửi chúng cho bên Developers/QA có như cầu sử dụng để họ đọc. Cách này khá thủ công và tốn nhiều efforts trong khi giá trị mang lại cho những người sử dụng chúng lại chưa chắc đã cao, vì đơn giản chúng không có 1 Format thống nhất và rất dễ thiếu thông tin.

# Swagger
Hôm nay mình sẽ giới thiệu cho các bạn 1 Tool khá nổi tiếng trong việc viết API docs, đó là Swagger (UI). Cụ thể Swagger là gì thì các bạn có thể search để tìm hiểu, trên Google và Vilbo có rất nhiều bài giới thiệu về Swagger nên ở phạm vi bài viết này mình xin phép không giới thiệu lại, thay vào đó sẽ mình sẽ đi sâu vào cách triển khai Swagger theo cách "Khoa học" và "Developer" nhất có thể.

Quay lại 1 chút thì các bài viết trên Viblo trước đây khi hướng dẫn triển khai Swagger UI thường tiếp cận theo hướng copy UI của Swagger rồi "ném" vào Project của mình (clone lại Repository Swagger hoặc copy file CSS, JavaScript của Swagger) không thì viết sẵn 1 file XML (JSON) rồi render lại chúng ra View.

Còn cách mà "Khoa học" và theo hướng "Developers" ở đây mình muốn nói đến là:

* Có khả năng tái sử dụng code, viết Docs cũng như viết Code, cái gì giống nhau là gọi lại dùng được
* Dễ dàng mở rộng (Scale), ví dụ: khi thêm 1 trường vào Model hay đổi tên 1 trường chẳng hạn thì file Documents cũng tự động được update chẳng hạn
* Tổ chức Trees (Cây thư mục) rõ ràng và khoa học

# Demo
Trong Rails thì có 2 Gem thường được dùng để Implement Swagger là: [swagger-docs](https://github.com/richhollis/swagger-docs) và [swagger-blocks](https://github.com/fotinakis/swagger-blocks). Sự khác biệt lớn nhất giữa 2 Gem này là swagger-blocks được support đến v2.0 của Swagger Specification còn swagger-docs chỉ dừng lại ở v1.2, và theo thông tin trên Repo của swagger-docs thì họ chưa có kế hoạch update lên v2.0. Do đó trong Demo này mình sẽ triển khai với gem swagger-blocks.

*Note: cả 2 gem kể trên đều không sinh ra giao diện UI/UX theo kiểu Swagger mà chỉ sinh ra 1 file .json phù hợp với format của Swagger UI mà thôi, do đó để có giao diện như Swagger mang lại, chúng ta cần 1 Gem nữa là [swaggeruiengine](https://github.com/zuzannast/swagger_ui_engine).*

Bắt đầu, tạo 1 ứng dụng Rails API bằng cách gõ các lệnh sau trên Terminal:
```
$ rails new api-sample-app --api
$ cd api-sample-app
$ rails g scaffold User name:string email:string
$ rails db:migrate
```

Sau đó add thêm 2 Gem mình giới thiệu phía trên vào `Gemfile` rồi `bundle` chúng:

```ruby
gem "swagger-blocks"
gem "swagger_ui_engine"
```

*Note: khi triển khai thực tế mình gặp phải 1 vấn đề khi call API bằng tool Postman - tool hỗ trợ test các Request API - thì Oki nhưng khi Deploy lên Server và call API qua lại giữa các Server thì bị trả về 404, sau 1 hồi search thì tìm hiểu ra là do thiếu config CORS. Để khắc phục thì bạn chỉ cần add thêm vào Gem như sau:*

```ruby
gem 'rack-cors', require: 'rack/cors'
```

và config cho Rails như sau:

```ruby
config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: [:get, :post, :options]
  end
end
```

Trên Repo của gem Swagger-Blocks có giới thiệu khá chi tiết về cách Setup Swagger, tuy nhiên mình thấy 1 số điểm chưa thực sự "dry" code cho lắm, do đó mình sẽ custom lại Trees (cấu trúc) của Swagger trong Project của mình 1 chút để tận dụng được những cái sài chung (tái sử dụng code í mà) như kiểu các Paramerter hay được gọi đi gọi là hoặc là các Response phổ biến (lỗi 404 hay 500 chẳng hạn). Đồng thời cũng giúp chúng ta dễ dàng mở rộng code khi cần thiết trong tương lai.

Cấu trúc thư mục của Swagger khi đó sẽ như thế này:

```
app/controllers
├── api
│   └── v1
│       ├── api_docs_controller.rb
│       ├── users_controller.rb
├── concerns
│   └── swagger 
│       ├── error_responses.rb
│       ├── parameters.rb
│       └── users_api.rb
└── application_controller.rb

app/models
├── application_record.rb
├── concerns
│   └── swagger
│       ├── error_schema.rb
│       └── user_schema.rb
└── user.rb
```

So sánh với tài liệu trên Repo của Swagger-Blocks thì cách tổ chức của mình có 1 vài điểm mà cá nhân mình nghĩ sẽ rành mạch và rõ ràng hơn.

* Theo Swagger hướng dẫn thì mỗi Documents sẽ ứng với 1 Controller, cách viết này khá dễ hiểu, nhưng các bạn có thế dễ dàng nhận ra là Controller sẽ bị phình to "cực kỳ" nhanh nếu đặt Docs trong đó. Và Controller cũng không phải là là 1 nơi lý tưởng để xử lý Docs. Do đó, chúng ta hãy tách ra thành 1 Module riêng biệt - chuyển xử lý Docs. Cụ thể ở đây mình sẽ để vào trong thư mục concern/swagger rồi sau đó Include lại vào Controller.
* Sẽ có rất nhiều Parameter dùng chung, ví dụ: userID được dùng chung khi get thông tin của User cũng như update thông tin user chẳng hạn. Do đó mình tạo ra 1 file parameter.rb để chứa những thứ dùng chung, khi cần dùng thì sẽ include lại vào file Docs (ở đây là user_api.rb)
* Tương tự, sẽ có rất nhiều Response Error được dùng chung, kiểu lỗi 401 - not authorize hay là 404 - not found Records do đó mình tạo ra 1 file error_response.rb để viết chung, khi cần lại include vào file chứa Docs (ở đây là user_api.rb)
* Response Success 200 tuy mỗi API sẽ trả về 1 thông tin khác nhau, nhưng không phải là không có điểm chung. Chẳng hạn, các API sau đều trả về thông tin của User sau khi Request thành công đó là: API show, API edit thông tin của User và API login. Do đó, chúng ta phải tìm cách tái sử dụng Code. May thay, với Swagger chúng ta có thể sử dụng $ref để gọi tới 1 schema được định nghĩa trước đó (ở đây là: user_schema.rb trong modes/concern/swagger)

Chú ý cần tạo Router cho Documents để còn biết URL mà xem trên trình duyệt.
```ruby
Rails.application.routes.draw do
  resources :users
  mount SwaggerUiEngine::Engine, at: "/api_docs"

  namespace :api, format: "json" do
		namespace :v1 do
			resources :api_docs, only: [:index] unless Rails.env.production?
		end
	end
end
```

Sau khi tạo Router, thì chúng ta cũng tạo ra 1 controller ứng với router này và định nghĩa các thông số cơ bản của API Documents như:

* Version Swagger sử dụng -Tittle, Description của API
* Đường dẫn mặc định của API
* Kiểu dữ liệu sinh ra của API (thường là Json hoặc có thể là XML) ....

Trong method index của api_docs_controller các bạn nhớ gọi method để render ra những thông tin API mà mình muốn viết Docs.

```ruby
# app/controller/api/v1/api_docs_controller.rb
# SWAGGERED_CLASSES define các class muốn sinh ra Docs

SWAGGERED_CLASSES = [
  Api::V1::UsersController,
  User,
  self,
].freeze

def index
  render json: Swagger::Blocks.build_root_json(SWAGGERED_CLASSES)
end
```
Đến đây là các bạn có thể bật server lên và vào URL: localhost:3000/api_docs.json để xem thanh quả rồi.

Chúng ta sẽ dùng gem swagger_ui_engine và config 1 chút để có giao diện Swagger UI cho dữ liệu json mình vừa tạo ra ở bên trên như sau:
```ruby
# config/initialize/swagger_ui_engine.rb

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

Xong. Tới đây bạn có thể restart lại server, truy cập lại URL localhost:3000/api_docs để thấy thành quả.

# Kết luận

Cá nhân mình đánh giá Swagger là 1 công cụ tuyệt vời để tạo ra Documents cho API khá là đơn giản và đẹp mắt. Hy vọng bài viết này sẽ ít nhiều giúp các bạn dễ dàng hơn trong việc viết API nói chung và API Documents nói riêng.