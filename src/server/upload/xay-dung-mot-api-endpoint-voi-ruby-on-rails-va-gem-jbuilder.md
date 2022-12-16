Rails là một framework web application theo cầu trúc MVC, Rails vốn đã được hỗ trợ để xây dựng một website hoàn chỉnh mà không cần đến API. Tuy nhiên, hiện nay các thư viện, framework client-side đã trở nên mạnh mẽ hơn bao giờ hết với các cái tên không xa lạ gì như [ReactJS](https://reactjs.org/), [AngularJS](https://angularjs.org/), [VueJS](https://vuejs.org/), ... Do đó việc xây dựng một API Endpoint dần đã trở thành một công việc hết sức quan trọng tại thời điểm hiện tại.

Rails cho đến thời điểm hiện tại đã nắm bắt được xu thế và hỗ trợ mạnh mẽ hơn tới trào lưu này, kể từ version 5 thì Rails đã hỗ trợ những ứng dụng [API-only](https://guides.rubyonrails.org/api_app.html). Bên cạnh đó còn có vài lựa chọn khác để xây dựng lên một API Endpoint với Rails:

- [Active Model Serializers](https://github.com/rails-api/active_model_serializers)
- [JBuilder](https://github.com/rails/jbuilder)

Cả hai gem đều có điểm mạnh, điểm yếu riêng. Tuy nhiên trong bài này mình chỉ giới thiệu và hướng dẫn cách  xây dựng Endpoint bằng JBuilder.

# JBuilder

JBuilder khá hiệu quả trong việc tạo và render JSON response cho các request API trong Rails. JBuilder được biết đến với những điểm lợi thế sau:

- Các JSON API response có thể tái sử dụng bằng `partial`.
- Sử dụng được các View Helper của Rails khi tạo ra API response.
- Sử dụng nguyên tắc "Convention over Configuration" để hoạt động. 

Mình cũng sẽ giới thiệu về việc render JSON response từ Controller với JBuilder, sau đó tái sử dụng chúng ở View và Model.

# Ứng dụng Rails API

Ứng dụng Rails API có thể được hiểu là một bản thu gọn của một ứng dụng Rails truyền thống. Cụ thể là nó không cần sử dụng đến các gem cần thiết cho việc làm việc với front-end như turbolinks, webpacker, coffee rails , ... 

# Ruby / Rails version

Ở hướng dẫn trong bài mình sẽ sử dụng:

- Ruby: 2.6.5
- Rails: 6.0.3.2

# Bắt đầu thôi
### 1, Tạo một ứng dụng Rails API

Để tạo một ứng dụng Rails API, chúng ta chạy câu lệnh sau:

```shell
rails new rails-api-with-jbuilder --api
```

Option `--api` dùng để tạo một ứng dụng Rails API. Điều này đồng nghiã với những việc sau:

-  Ứng dụng của chúng ta sẽ có bộ middleware hạn chế hơn bình thường. Cụ thể là nó sẽ không có các middleware chủ yếu dùng cho các ứng dụng sử dụng trình duyệt (ví dụ như hỗ trợ cookies).
-  `ApplicationController` sẽ kế thừa từ `ActionController::API` thay vì `ActionController::Base`.
- Các generators sẽ bỏ qua việc tạo view, helper và asset mỗi khi bạn tạo một resource mới.

Câu lệnh này cũng tự động chạy `bundle install` để cài đặt các dependency cần thiết để App chạy.

### 2, Cài đặt gem JBuilder

Sau khi bạn tạo xong App bằng câu lệnh bên trên thì trong `Gemfile` đã có sẵn dòng comment sau: 

```ruby
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem 'jbuilder', '~> 2.7'
```

 Để cài đặt và sử dụng JBuilder thì chúng ta cần bỏ comment của dòng đó hoặc thêm vào `Gemfile` : 
 
 ```ruby
 gem 'jbuilder', '~> 2.7'
 ```

Chạy `bundle install` để cài đặt gem.

### 3, Tạo Model

Để xây dựng và thao tác với API thì chúng ta cần một vài bảng và insert data cho chúng.

```ruby
rails g model Company name:string
rails g model Employee name:string email:string company:belongs_to
```

Sau khi sử dụng generator để tạo migration và model thì chúng ta chạy `rails db:migrate` để migrate.

### 4, Thêm data

Chúng ta sẽ sử dụng gem [faker](https://github.com/stympy/faker) để fake data cho các model mà ta đã tạo ở bước 3.

```ruby
  # Thêm gem 'faker' vào group [:development, :test] để có thể fake data cho môi trường development và test
  
  gem 'faker'
```

Chạy `bundle install` để cài đặt gem.

Sau khi cài đặt xong thì chúng ta có thể fake data bằng `seeds.rb`

```ruby
# Tạo Company
10.times { Company.create!(name: Faker::Company.name) }

# Tạo Employee
50.times {
  company = Company.all.sample
  Employee.create!(
    name: Faker::Name.name,
    email: Faker::Internet.email,
    company: company
  )
}
```

Sau đó chạy `rails db:seed` để sinh data.

# Render JSON với JBuilder

Bây giờ thì chúng ta đã có một ứng dụng Rails API có sẵn data, chúng ta đã có thể sử dụng JBuilder để trả JSON về cho các request API rồi


## Render mảng trong API response

Để lấy được danh sách Company với một API request, ta cần làm các bước sau.

**Bước 1.** Tạo controller cho company.

```ruby
rails g controller companies
```


**Bước 2.** Setup route cho API endpoint

```ruby
# config/routes.rb
resources :companies
```

Bước này sẽ tạo ra các [route RESTful](https://guides.rubyonrails.org/v2.3.11/routing.html#restful-routing-the-rails-default) cho controller companies

**Bước 3.** Tạo action cho controller

```ruby
# app/controllers/companies_controller.rb
class CompaniesController < ApplicationController
  def index
    @companies = Company.all
  end
end
```

**Step 4.** Tạo file `index.jbuilder` ở trong view của company

Tạo thư mục `companies` trong thư mục `app/view`.

```bash
mkdir -p app/views/companies
```

Tạo file `index.jbuilder` ở trong thư mục này.

```ruby
# app/views/companies/index.jbuilder
json.array! @companies do |company|
  json.id company.id
  json.name company.name
  json.created_at company.created_at
end
```

**Bước 5.** Kiểm tra xem API của chúng ta đã chạy chưa nào.

- Bật Server với câu lệnh `rails s`.
- Thử request tới API endpoint của chúng ta nào.
```bash
curl -X GET http://localhost:3000/companies
```

Chúng ta sẽ được kết quả sau

```json 
[
   {
      "id":1,
      "name":"Johns Inc",
      "created_at":"2021-01-20T14:45:24.090Z"
   },
   {
      "id":2,
      "name":"Dooley LLC",
      "created_at":"2021-01-20T14:45:24.094Z"
   },
   {
      "id":3,
      "name":"Lynch LLC",
      "created_at":"2021-01-20T14:45:24.098Z"
   },
   [...]
]

// yay
```

## Render partial trong API response

Chúng ta có thể sử dụng partials để render một cụm JSON dùng lặp lại ở nhiều chỗ API khác nhau.

**Bước 1.** Tạo `EmployeesController`

```bash
rails g controller employees
```

**Bước 2.** Setup route cho API endpoint

```ruby
# config/routes.rb
resources :employees
```

**Bước 3.** Tạo action cho controller

```ruby
# app/controllers/employees_controller.rb
class EmployeesController < ApplicationController
  def index
    @employees = Employee.all
  end
end

```

**Bước 4.** Tạo file `index.jbuilder` ở trong view của employee

Tạo thư mục `employees` trong thư mục `app/view`.

```bash
mkdir -p app/views/employees
```

Tạo file `index.jbuilder` ở trong thư mục này.

```ruby
# app/views/employees/index.jbuilder
json.array! @employees do |employee|
  json.id employee.id
  json.name employee.name
  json.email employee.email
  json.created_at employee.created_at
end
```

**Bước 5.** Kiểm tra API của chúng ta.

Thử request tới API endpoint.
```bash
curl -X GET http://localhost:3000/employees
```

Chúng ta sẽ được kết quả sau

```json
[
   {
      "id":1,
      "name":"Msgr. Wen Nienow",
      "email":"waylon.feeney@torphy.com",
      "created_at":"2021-01-20T14:45:36.705Z"
   },
   {
      "id":2,
      "name":"Jeffery Crona",
      "email":"micah_brakus@lubowitz.biz",
      "created_at":"2021-01-20T14:45:36.710Z"
   },
   {
      "id":3,
      "name":"Sherlene Yundt",
      "email":"pasquale@franecki-wehner.org",
      "created_at":"2021-01-20T14:45:36.731Z"
   }, 
   [...]
]
```

Tiếp theo chúng ta sẽ thêm thông tin company vào mỗi bản ghi employee bằng việc sử dụng patial.

**Bước 6.** Tạo partial jbuilder cho company

Ta tạo một file view partial vào thư mục `app/views/companies` với tên `_company.jbuilder`

```ruby
# app/views/companies/_company.jbuilder
json.id company.id
json.name company.name
json.created_at company.created_at
```

**Bước 6.** Sử dụng partial company để render vào JSON của Employee

Chúng ta có thể sử dụng lại partial của company như sau:

```ruby
# app/views/employees/index.jbuilder
json.array! @employees do |employee|
  json.id employee.id
  json.name employee.name
  json.email employee.email

  json.company do
    json.partial! 'companies/company', company: employee.company
  end

  json.created_at employee.created_at
end
```

Ở đây rails sẽ render company cho từng employee . Để xem kết quả thì chúng ta  request thử xem nhé:

```bash
curl -X GET http://localhost:3000/employees
```

Response:

```json
[
   {
      "id":1,
      "name":"Steve Hagenes DVM",
      "email":"crissy_conroy@barrows.co",
      "company":{
         "id":3,
         "name":"Lynch LLC",
         "created_at":"2021-01-20T14:45:24.098Z"
      },
      "created_at":"2021-01-20T14:45:36.990Z"
   },
   {
      "id":2,
      "name":"Lanette Luettgen",
      "email":"sherice_ward@mann.org",
      "company":{
         "id":17,
         "name":"Hyatt-Welch",
         "created_at":"2021-01-20T14:45:36.670Z"
      },
      "created_at":"2021-01-20T14:45:36.994Z"
   }, 
   [...]
]

// hur-ray
```

Như bạn thấy đấy, với mỗi một node `employee` trong JSON response thì đều chứa một node `company` chứa thông tin của các company, nhờ vào việc sử dụng partial của jbuilder.

Hi vọng bài hướng dẫn nho nhỏ này sẽ giúp các bạn hiểu hơn về cách dùng của JBuilder. Nếu cảm thấy thú vị thì các bạn có thể tìm hiểu sâu hơn nha.

Các bạn có thể xem ví dụ trên bài ở https://github.com/manhdat22/rails-api-with-jbuilder

Nguồn:

- [JBuilder](https://github.com/rails/jbuilder)
- [Faker](https://github.com/stympy/faker)