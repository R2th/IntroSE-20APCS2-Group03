Khi phát triển các ứng dụng web, chúng ta thường phải đối mặt với vấn đề có chấp nhận hay không và xác thực đầu vào của người dùng hoặc một số dữ liệu đến từ các nguồn bên ngoài. Thông thường có đề xuất cách để giải quyết vấn đề này:

* Đầu tiên, hạn chế các tham số biểu mẫu ở level controller, sử dụng thành phần strong_parameters  
* Sau đó, xác thực các tham số được phép ở level model, sử dụng ActiveModel :: Validations

Cách tiếp cận này sau đó đã phát triển thành một phương pháp khác, cho thấy việc trích xuất các xác nhận hợp lệ từ các mô hình thành các lớp riêng biệt, tất cả các hành động xác thực hoặc thậm chí liên tục tồn tại được thực hiện. Mẫu này được gọi là Form Object và thường liên quan đến các giải pháp như: Virtus, Reform, Dry-Types, makandra/active_type.

Bây giờ chúng ta sẽ cố gắng cấu trúc lại cả hai hàm strong_parameters và xác thực mô hình bằng cách sử dụng gem dry-Validation.

Ứng dụng ví dụ của tôi cho phép một số người dùng đăng ký bằng điện thoại di động và một số nhóm người dùng khác có thể đăng ký bằng email. Logic đăng ký cũng có sự khác biệt 
```
class User < ApplicationRecord
  attr_acessor :mobile_registration

  # validations
  validates :phone,
            presence: true,
            uniqueness: true,
            format: { with: /\A\+\d*/,
                      message: I18n.t('errors.messages.phone_format_is_invalid') }
  validates :email,
            uniqueness: true,
            case_sensitive: false,
            unless: proc { |u| u.mobile_registration || u.email.blank? }
  validates :password, length: { minimum: 8 }, on: :create,
            unless: proc { |u| u.mobile_registration || u.email.blank? }
  validates :password, confirmation: true, presence: true, if: :password_present?
  validates :password_confirmation, presence: true, if: :password_present?
  validates :full_name, presence: true
end
```

model này chứa một loạt các xác nhận:
* phone luôn được xác thực 
* email chỉ được xác thực nếu thuộc tính hiện tại và thuộc tính mobile_registration không được đặt 
* mật khẩu chỉ được xác thực khi tạo hành động và chỉ khi thuộc tính hiện tại và thuộc tính mobile_registration bị bỏ đặt
*  password_confirmation phải bằng mật khẩu và phải có mặt nếu có mật khẩu 
*  full_name luôn được xác thực

Đối với những người mới làm quen, phần code này của mô hình có vẻ quá phức tạp. Bước đầu tiên trong một cách để phá vỡ sự phức tạp này là để di chuyển xác nhận từ model và gọi chúng chỉ trong các action controller cụ thể, nơi không cần kiểm tra điều kiện.Ví dụ: nếu xác thực mật khẩu chỉ được thực hiện khi tạo, tại sao không di chuyển nó đến hành động tạo của bộ điều khiển tương ứng? Ngoài ra, rõ ràng chúng tôi có các hành động riêng biệt đăng ký người dùng thiết bị di động và người dùng thông thường, vì vậy chúng tôi sẽ không gọi xác thực email và mật khẩu cho người dùng đăng ký bằng mobie phone.

Chúng ta hãy xem xét một hành động của controller (chúng được định hướng một cách có mục đích):
```
# The first one used to register users via web interface:
class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to profile_path(@user)
    else
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:phone, :email, :password,
                                 :password_confirmation, :full_name)
  end
end

# The second one is for mobile registrations
class Mobile::UsersController < MobilesController
  def create
    @user = User.new(user_params)
    # note this assignment. It is needed only to bypass conditional validation
    @user.mobile_registration = true
    if @user.save
      redirect_to profile_path(@user)
    else
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:phone, :full_name, :mobile_registration)
  end
end
```
Sử dụng dry-validation chúng ta có thể trích xuất tất cả các logic liên quan đến xác nhận hợp lệ thành các lớp riêng biệt và cũng loại bỏ các strong_parameters. Có vấn đề gì với strong_parameters? Cần nhớ, cách các phương thức liên quan đến strong_parameters đang phát triển và trở nên cồng kềnh theo thời gian.

Vậy, hãy viết một lớp mới cho User model validation, sẽ được sử dụng để xác thực người dùng đăng ký từ giao diện web:
```
require 'dry-validation'

class UserValidator
  UserSchema = Dry::Validation.Schema do
    # regular expression for phone validations
    PHONE_REGEX = /\A\+\d*/
    configure do
      # we need this to perform database-related validation, i.e. uniqueness
      option :record
      # custom error messages
      config.messages_file = File.join(Rails.root, 'config',
                                       'locales', 'validation_errors.en.yml')
      # sanitize input hash permitting only whitelisted parameters.
      # All parameters in this file will be whitelisted,
      # others will be filtered out
      config.input_processor = :sanitizer

      # universal uniqueness predicate
      def unique?(attr_name, value)
        !record.class.where.not(id: record.id).where(attr_name => value).exists?
      end

      # checking if value matches PHONE_REGEX
      def phone?(value)
        !PHONE_REGEX.match(value).nil?
      end
    end

    # wrap schema in :user, mimicking strong_parameters require method
    required(:user).schema do
      required(:full_name).filled
      required(:phone).filled(:phone?, unique?: :phone)
      optional(:password).filled(min_size?: 8)
      optional(:password_confirmation).filled
      optional(:email).filled(unique?: :email)

      # custom rules for password confirmation
      rule(password_confirmed?: [:password, :password_confirmation]) do |password, password_confirmation|
        password.filled?.then(password_confirmation.eql?(password))
      end

      rule(password_confirmation_filled?: [:password, :password_confirmation]) do |password, password_confirmation|
        password.filled?.then(password_confirmation.filled?)
      end
    end
  end
end
```
Tệp có lỗi tùy chỉnh sẽ trông giống như sau:
```
en:
  errors:
    unique?: 'Is not unique'
    phone: 'Phone should start with plus sign and contain only digits'
```

Mã này phục vụ như là một thay thế cho cả hai  strong parameters và ActiveModel :: Validations. Hãy kiểm tra xem nó chính xác là gì
```
# controller
user = User.new
result =  UserValidator::UserSchema.with(record: user)
                                   .call(user: { full_name: '',
                                                 email: 'admin@admin.test',
                                                 phone: '89',
                                                 password: '12345678',
                                                 password_confirmation: '1234567' })

result.success?

# => false

result.errors
=> {:user=>
  {:full_name=>["must be filled"],
   :phone=>["Phone should start with plus sign and contain only digits"],
   :email=>["Is not unique"],
   :password_confirmation=>["must be equal to 12345678"]}}

# let's provide valid parameters:
result =  UserValidator::UserSchema.with(record: user)
                                   .call(user: { full_name: 'John',
                                                 email: 'john@admin.test',
                                                 phone: '+89',
                                                 password: '12345678',
                                                 password_confirmation: '12345678',
                                                 active: true })

result.success?

# => true

result.output

# Notice that excessive key :active is not present in the output hash,
# because it was filtered out with sanitizer.

# {:user=>{:full_name=>"John", :phone=>"+89", :password=>"12345678",
# :password_confirmation=>"12345678", :email=>"john@admin.test"}}

# And what if do not provide user: {} hash?

UserValidator::UserSchema.with(record: user).call(something: {}).errors
# => {:user=>["is missing"]}
```

Và kết quả là mã điều khiển sẽ giống như sau:
```
class UsersController < ApplicationController
  def create
    @user = User.new
    validation = UserValidator::UserSchema.with(record: @user).call(params)
    if validation.success?
      @user.attributes = validation.output[:user]
      @user.save
      redirect_to profile_path(@user)
    else
      @errors = validation.errors
      render :new
    end
  end
# no strong parameters neeeded
end

# and the second one:
class Mobile::UsersController < MobilesController
  def create
    @user = User.new
    validation = MobileUserValidator::UserSchema.with(record: @user).call(params)
    if validation.success?
      @user.attributes = validation.output[:user]
      @user.save
      redirect_to profile_path(@user)
    else
      @errors = validation.errors
      render :new
    end
  end
```
Bỏ qua mã cho MobileUserValidator tưởng tượng, bởi vì nó chủ yếu lặp lại UserValidator, ngoại trừ email, mật khẩu và xác nhận password_confirmation. Kết luận, dry-validation cung cấp một cách rất thuận tiện để thay thế cả hai xác nhận ActiveRecord và ActiveModel, và cũng là một sự thay thế đẹp hơn cho strong_parameters.

nguồn:
https://solnic.codes/2015/12/07/introducing-dry-validation/

http://gafur.me/2017/11/13/refactoring-rails-application-with-dry-validation.html