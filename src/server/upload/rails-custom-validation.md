# 1. Lảm nhảm
- Rails được biết đến với triết lý là COC ([Convention over Configuration](https://en.wikipedia.org/wiki/Convention_over_configuration)) không phải COCC nha =))
- Coding trong Rails đều tuân theo nguyên lý này, cũng nhờ đó mà develop với Rails có thể đạt được hiệu qủa tương tự các framwork khác trong khi sử dụng ít code hơn, mà less code thì less bug :smile: :smile: :smile:
- Tuy vậy, Rails cũng cung cấp khả năng override và custom mạng mẽ cho các built-in feature của framework, cho phép developer config lại các chức năng này cho phù hợp với dự án mình đang làm.
- Dự án mình đang làm custom validation hơi nhiều nên mình sẽ sử dụng validation để minh hoạ cho khả năng này của Rails =))
- Nội dung cũ nhưng hi vọng sẽ có ích cho ai đó :D :D :D

# 2. Intrudution
## a. Validation
- Rails cung cấp các built-in validation để validate ở model trước khi insert / update dữ liệu vào DB.
- Chúng ta khai báo 1 validation ở model với method validate.
- Ví dụ với validates confirmation.
    ```ruby
    validates :email, confirmation: true
    validates :email, confirmation: { case_sensitive: true }
    validates :email, confirmation: { case_sensitive: true }, message: "doesn't match"
    validates :email, confirmation: { case_sensitive: true }, message: "doesn't match %{attribute}"
    ```
- Với các ví dụ trên, bạn có thể thấy mình đang custom nhiều hơn qua nhiều ví dụ
- Với ví dụ thứ nhất, mình chỉ đơn giản là khai báo validate confirmation với attribute, các option khác (case_sensitive, message, ...) sẽ sử dụng config mặc định của Rails  
    ```ruby
    validates :email, confirmation: true
    ```
- Với ví dụ thứ 2, mình đang custom thêm option mặc định về `case_sensitive`
    ```ruby
    validates :email, confirmation: { case_sensitive: true }
    ```
- Với ví dụ thứ 3, mình lại custom thêm về `message` khi xảy ra lỗi
    ```ruby
    validates :email, confirmation: { case_sensitive: true }, message: "doesn't match"
    ```
 - Với ví dụ thứ 4, mình đang pass thêm `params` vào message lỗi
     ```
     validates :email, confirmation: { case_sensitive: true }, message: "doesn't match %{attribute}"
     ```
- Các bạn có thể xem message của validate nào nhận params nào ở repo [rails-i18n](https://github.com/svenfuchs/rails-i18n/blob/master/rails/locale/en.yml).
- Ngoài việc custom lại message mặc định, Rails còn cho phép bạn custom lại message cho từng model hoặc attribute của model nữa cơ, thông qua việc sử dụng i18n
    ```yml
    en:
      activerecord:
        errors:
          models:
            user:
              confirmation: "user's %{attribute} doesn't match"
              attributes:
                password:
                  confirmation: "user's password doesn't match"
            admin:
              attributes:
                password:
                  confirmation: "admin's %{attribute} doesn't match"
    ```

## b. Custom validates
- Chúng ta đã giới thiệu sơ về khả năng custom validation của Rails, nhưng đó chưa phải là tất cả.
- Bên cạnh các built-in validation, Rails còn cung cấp cho chúng ta khả năng custom thêm các validation mới.
- Chúng ta sẽ tìm hiểu phần này thông qua ví dụ về validate format của email
    ```ruby
    validates :email, format: { with: /\A([^@\s]+)@(sun-asterisk.com)\z/ }
    ```
- Validate email phải thuộc domain `sun-asterisk.com.com`

### i. validate method
- Cách thứ nhất để custom validates là cung cấp 1 method cho model để validate
    ```ruby
    validate :email_sun_asterisk_format

    private

    def email_sun_asterisk_format
      return if email.to_s.match?(/\A([^@\s]+)@(sun-asterisk.com)\z/)

      errors.add :email, :invalid
    end
    ```
- Bạn có thể tìm hiểu thêm ở [guides.rubyonrails.org](https://guides.rubyonrails.org/active_record_validations.html#custom-methods)
- Cách này khá đơn giản tuy nhiên nó sẽ không DRY nếu validate logic được sử dụng ở nhiều model.
- Bạn có thể tách thành concern và include vào các model cần thiết để DRY hơn

### ii. validates_each
- Cách thứ hai để custom validates là cung cấp 1 validator class cho model để validate
- Tạo custom validator trong thư mục `app/validators`
    ```ruby
    #app/validators/sun_asterisk_format_validator.rb
    class SunAsteriskFormatValidator < ActiveModel::EachValidator
      def validate_each(record, attribute, value)
        return if value && value.match?(/\A([^@\s]+)@(sun-asterisk.com)\z/)

        record.errors.add attribute, :invalid
      end
    end
    ```
- Thêm thư mục `app/validators` vào load path
    ```ruby
    # config/application.rb
    config.autoload_paths += %W["#{config.root}/app/validators/"]
    ```
- Sử dụng custom validator như 1 built-in validate bình thường khác
    ```ruby
    # app/models/user.rb
    validates :email, presence: true
    validates :email, sun_asterisk_format: true
    ```
- Bản thân mình thích cách thứ 2 hơn so với cách thứ nhất vì nó cung cấp syntax tương tự như built-in validators của Rails, code cũng đẹp và DRY hơn hơn :smile:

# c. More about validates_each
## i. options
- Trong ví dụ trên bạn có thể thấy hàm `validate_each` nhận 3 params là `record`, `attribute`, `value`
- Tuy nhiên class `ActiveModel::EachValidator` còn cung cấp cho bạn 1 params nữa là `options`
- Ví dụ
    ```ruby
    #app/validators/sun_asterisk_format_validator.rb
    class SunAsteriskFormatValidator < ActiveModel::EachValidator
      def validate_each(record, attribute, value)
        return if value && value.match?(/\A([^@\s]+)@(sun-asterisk.com)\z/)

        record.errors.add attribute, (options[:message] || :invalid)
      end
    end
    ```

    ```ruby
    # app/models/user.rb
    validates :email, sun_asterisk_format: { message: "must be in sun-asterisk.com domain" }
    ```
 - Không chỉ message, bạn có thể sử dụng thêm các option khác cho custom validator của mình, custom thoải mái =))

## iii. error message
- Để add error mesage vào record ta có 2 cách
- Cách 1
    ```ruby
    record.errors[attribute] << "string"
    ```
- Với cách này, kể cả khi bạn `<< :key` thì Rails sẽ convert `:key` sang `string`và sử dụng làm error message
    ```ruby
    record.errors[attribute] << :invalid # :invalid sẽ được convert thành "invalid"
    record.errors[attribute] << I18n.t("errors.messages.invalid") # sử dụng error message mặc định cho mọi model
    ```
- Cách này có khá nhiều khuyết điểm nên mình thường sử dụng cách 2
- Cách 2
    ```ruby
    record.errors.add attribute, :invalid
    ```
- Với cách này bạn thậm chí còn có thể sừ dụng i18n riêng cho custom validator của mình thay vì sử dụng chung i18n với các built-in validators của Rails
    ```ruby
    record.errors.add attribute, :invalid_sun_asterisk_format
    ```
    ```yml
    # config/locals/en.yml
    en:
      hello: "Hello world"
      errors:
        messages:
          invalid_sun_asterisk_format: "must be in sun-asterisk.com domain"
    ```
- Hoặc thêm params vào i18n của error message
    ```ruby
    record.errors.add attribute, :invalid_sun_asterisk_format, value, value
    ```
    ```yml
    # config/locals/en.yml
    en:
      hello: "Hello world"
      errors:
        messages:
          invalid_sun_asterisk_format: "must be in sun-asterisk.com domain, received %{value}"
    ```

# 3. Say bye
- Link source code tham khảo minh đang để trên [Github](https://github.com/thanhlt-1007/viblo_custom_validation),
- Hi vọng các bạn thích bài viết này
- Ẹnjoy and happy coding :smile: :smile: :smile: