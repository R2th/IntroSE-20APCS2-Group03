# 1. Introduce
- Để thực hiện validate ở server, Rails cung cấp sẵn rất nhiều [validation helper](https://guides.rubyonrails.org/active_record_validations.html#validation-helpers).
- Bên cạnh đó Rails cũng cho phép [custom validator](https://guides.rubyonrails.org/active_record_validations.html#performing-custom-validations) để tạo các validator phù hơp với business logic của dự án
- Hoặc sử dụng các gem có sẵn trên [rubygem](https://rubygems.org/) phù hợp với dự án mà không cần viết lại.

# 2. Email
## a. Introduce
- Validate email là 1 validator cơ bản được sử dụng trong nhiều dự án khác nhau.
- Thậm chí còn được sử dụng làm ví dụ cho phần custom validator trên [guide](https://guides.rubyonrails.org/active_record_validations.html#performing-custom-validations) của ruby on rails
    ```ruby
    class EmailValidator < ActiveModel::EachValidator
      def validate_each(record, attribute, value)
        unless value =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
          record.errors.add attribute, (options[:message] || "is not an email")
        end
      end
    end

    class Person < ApplicationRecord
      validates :email, presence: true, email: true
    end
    ```
- Đối với gem thì chúng ta có thể sử dụng gem [email_validator](https://github.com/K-and-R/email_validator)

## b. Install
- Thêm gem `email_validator` vào `Gemfile`
    ```
    # Gemfile 
    gem 'email_validator'
    ```
- Sử dụng email validator trong model
    ```ruby
    # app/model/user.rb
    class User < ApplicationRecord
      validates :email, email: true
    end
    ```
- Check lại trên rails console
    ```ruby
    user = User.create email: "le.tan.thanh"
    user.valid? # false

    user = User.create email: "le.tan.thanh@sun-asterisk.com"
    user.valid? # true
    ```

## c. Advance options:
- Gem `email_validator` cũng cung cấp thêm các option khác phục vụ cho việc validate
- Option `domain`:  chỉ các email có domain đúng với domain được khai báo mới pass được validation
    ```ruby
    # app/model/user.rb
    class User < ApplicationRecord
      validates :email, email: { domain: "sun-asterisk.com" }
    end
    ```
    ```ruby
    user = User.create email: "le.tan.thanh@gmail.com"
    user.valid? # true

    user = User.create email: "le.tan.thanh@sun-asterisk.com"
    user.valid? # true
    ```
- Ngoài ra còn có 1 số option khác là `allow_nil`, `require_fqdn`, `mode`

# 3. Url
## a. Introduce
- Bên cạnh email thì url cũng là 1 validator được sử dụng trong nhiều dự án khác nhau.
- Đối với gem thì chúng ta có thể sử dụng gem [validates_url](https://github.com/perfectline/validates_url)

## b. Install
- Thêm gem `validate_url` vào `Gemfile`
    ```
    # Gemfile 
    gem 'validate_url'
    ```
- Sử dụng email validator trong model
    ```ruby
    # app/model/user.rb
    class User < ApplicationRecord
      validates :homepage, url: true
    end
    ```
- Check lại trên rails console
    ```ruby
    user = User.create homepage: "home-page"
    user.valid? # false

    user = User.create homepage: "http://localhost:3000/home-page"
    user.valid? # true
    ```

## c. Advance options:
- Gem `validate_url` cũng cung cấp thêm các option khác phục vụ cho việc validate
- Option `no_local`:  chỉ các email có không có domain là `localhost` mới pass được validation
    ```ruby
    # app/model/user.rb
    class User < ApplicationRecord
      validates :homepage, url: { no_local: true }
    end
    ```
    ```ruby
    user = User.create homepage: "http://localhost:3000/home-page"
    user.valid? # false

    user = User.create homepage: "http://example.com/home-page"
    user.valid? # true
    ```
- Ngoài ra còn có 1 số option khác là `allow_nil`, `allow_blank`, `schemes`, `public_suffix`

# 4. Datetime
## a. Introduce
- Chúng ta có thể sử dụnh gem [validates_timeliness](https://github.com/adzap/validates_timeliness) để validator datetime.

## b. Install
- Thêm gem `validates_timeliness` vào `Gemfile`
    ```
    # Gemfile 
    gem 'validates_timeliness'
    ```
- Generate các file config cần thiết
    ```ruby
    rails generate validates_timeliness:install
    ```
- Sử dụng email validator trong model
    ```ruby
    # app/model/user.rb
    class User < ApplicationRecord
      validates :date_of_birth, timeliness: { on_or_before: lambda { 18.years.ago } }
    end
    ```
- Check lại trên rails console
    ```ruby
    user = User.create date_of_birth: Time.zone.now
    user.valid? # false

    user = User.create date_of_birth: 18.years.ago
    user.valid? # true
    ```

## c. Advance options:
- Gem `validates_timeliness` cũng cung cấp thêm các option khác phục vụ cho việc validate
- Option `no_local`:  chỉ các email có không có domain là `localhost` mới pass được validation
    ```ruby
    # app/model/user.rb
    class User < ApplicationRecord
      validates :homepage, url: { no_local: true }
    end
    ```
    ```ruby
    user = User.create homepage: "http://localhost:3000/home-page"
    user.valid? # false

    user = User.create homepage: "http://example.com/home-page"
    user.valid? # true
    ```
- Ngoài ra còn có 1 số option khác là `is_at`, `before`, `after`, `on_or_after`, `type`