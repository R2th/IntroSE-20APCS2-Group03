Sau một thời gian dài làm việc chủ yếu với Javascript, nay mới có dịp trở lại với một dự án Ruby on Rails, lần này có dịp bắt tay vào buid dự án ngay từ đầu nên có nhiều vấn đề để cùng chia sẻ với mọi người.
<br><br>
Một trong những điều đầu tiên mình muốn chia sẻ cho mọi người là cách thức __handle lỗi và resonse lỗi__ mang đậm chất Rails :sunglasses: 

> Nói qua một chúc pattern mà mình sắp giới thiệu ở đây lấy cảm hứng từ bài hướng dẫn của tác giả Nguyễn Tấn Đức trong [Rails API errors response](https://viblo.asia/p/rails-api-errors-response-yMnKML9A57P) và [Handling Errors in an API Application the Rails Way](https://blog.rebased.pl/2016/11/07/api-error-handling.html) của Łukasz Sarnacki.

> Phần source code mẫu của bài viết này được publish tại github cá nhân của mình, bạn có thể clone về tham khảo: https://github.com/trandaison/rails_api_error_handling_best_practice/commits/happy_path


Đối với nhiều bạn khi lần đầu xây dựng một app API để phục vụ cho mobile client và web front-end vấn đề hay mắc phải nhất là định nghĩa response cho phía client.

Thường thì các vấn đề sau sẽ là điều khiến họ bối rối:
- Không biết format của response nên trả như thế nào cho hợp lý.
- Khi có lỗi trong quá trình thực thi, thông tin các  trả về không đầy đủ.
- Xử lý không nhất quán đối với từng loại Error khác nhau bởi có quá muôn vàn kiểu lỗi.
- Nếu xử lý được thì code bị lặp hoặc không tối ưu, thậm chí code thối.

Mục tiêu của mình qua bài viết này là xây dựng một pattern mà trong các actions của controller hay trong hàm thực thi của các service object là một “__happy path__” và việc xử lý lỗi sẽ là thứ gì đó... nằm ở hậu cần, không thể tìm thấy trong code ở controller và service (nghe nguy hiểm nhỉ :joy:)

> __WTF is happy path?__ :thinking: 
>
>  Nó là một "con đường" lý tưởng trong actions của controller, ví dụ trong action update, con đường lý tưởng sẽ là: __Tìm thấy object --> update attributes thành công --> render response__, xem như chạy 1 mạch mà ko một lỗi lầm :smile: không cần phải kiểm tra rằng có tìm thấy record không, update có thành công hay không,... :sunglasses: 

#### Vậy vấn đề cần mổ xẻ ở đây là gì?

Với web app thì Rails hỗ trợ render error messages tận răng rồi, quá đơn giản, nhưng với API thì object lỗi mà Rails trả về cho client là một thứ bỏ đi :joy: 
<br><br>
Tại sao à? Đơn giản là lỗi của active record validation trả về 1 đằng, còn các lỗi trong quá trình thực thi nó lại là một kiểu khác :joy: Làm cái gì cũng nên nghĩ cho client một tí, response gì mà khi thì thế này, khi khác thế khác thì ai "lập trình" cho thấu :weary:
<br><br>
Lôi thôi vậy để mọi người nắm được bối cảnh của vấn đề mà chúng ta sẽ giải quyết, còn bây giờ bước vào triển thôi, mình sẽ giải quyết từng vấn đề một một cách chi tiết nhất.

### 1. Giải quyết error validation của `ActiveRecord`

Nói luôn cho nó vuông đây là lỗi validation khi `save`, `update` hoặc gọi hàm `valid?` trên một đối tượng của `ActiveRecord`, là cái thứ lỗi mà bạn vẫn thường lấy thông qua cái hàm `.errors()` quen thuộc :joy:
<br><br>
Trước hết mình xin phép đưa ra một example schema cho response, bao gồm 2 trường hợp:
* Trường hợp response success (thường đi kèm với HTTP status code `2xx`)
```json
{
  "success": true,
  "data": {
    "user": {
      "email": "foo@bar.com",
      "phone_number": "+841234567890"
    }
  }
}
```
* Trường hợp response error (Thường đi kèm với HTTP status code `4xxx`)
```json
{
  "success": false,
  "errors": [
    {
      "resource": "user",
      "field": "email",
      "code": 1001,
      "message": "Email has already been taken."
    },
    {
      "resource": "user",
      "field": "phone_number",
      "code": 1002,
      "message": "Phone number is invalid"
    }
  ]
}
```
Mình giải thích qua một chút:
* `success` thuộc kiểu `boolean`, là `true` khi request đó thực hiện công việc thành công, còn lại là `false`.
* `data` là một `object`, đây là nơi chứa toàn bộ dữ liệu sẽ response cho client, key `data` được sử dụng khi giá trị của `success` là `true`.
* `errors` là một `array`, đây là nơi chứa toàn bộ những thông tin về lỗi, bao gồm cả lỗi validation lẫn lỗi trong quá trình thực thi. key `errors` được sử dụng khi giá trị của `success` là `false`.

  Trong đó từng object của mảng `errors` sẽ có cấu trúc như sau:
    * `resource` tên của model/resource bị lỗi, ở dạng `string`, định dạng _snake case_.
    * `field` tên của trường bị lỗi, cũng là `string`, định dạng _snake case_.
    * `code`<sup>*</sup> mã lỗi, là một số tuỳ bạn định nghĩa, client sẽ sử dụng mã này để phân biệt các lỗi. Mình thường dùng mã `1xxx`.
    * `message`<sup>*</sup> Message lỗi, là một `string`, thông thường client sẽ sử dụng luôn message này để hiển thị ra cho người dùng.


Đầu tiên mình có một model `User` được tạo ra từ `scaffold`
```shell
rails g scaffold User email password phone_number username full_name gender:integer age:integer
```

Mục đích là để tạo ra một vài errors cho việc test thử, nên mình sẽ thêm 1 tí _validations_ vào model như sau:
```ruby
class User < ApplicationRecord
  validates :email, presence: true, format: /\A[a-zA-Z0-9_\-\.]+@(([a-zA-Z]+\.[a-zA-Z]+)|(([0-9]\.){3}[0-9]))\z/, uniqueness: true
  validates :password, presence: true, format: /\A[^ ]{6,}\z/
  validates :phone_number, presence: true, format: /\A\+84(1\d{9}|9\d{8})\z/, uniqueness: true
  validates :username, presence: true, format: /\A[0-9a-zA-Z_\-\.]{6,}\z/
  validates :full_name, presence: true, format: /\A[^!@#\$%\^&\*\(\)\+\{\}]{4,}\z/
  validates :age, presence: true, numericality: {greater_than_or_equal_to: 18}

  enum gender: %i|male female|
end

```

Xem qua một chút về action `create` của `users_controller` vừa được sinh ra:
```ruby
def create
  @user = User.new user_params
  if @user.save
    render json: @user, status: :created, location: @user
  else
    render json: @user.errors, status: :unprocessable_entity
  end
end

private
def user_params
  params.require(:user).permit :email, :password, :phone_number, :username, :full_name, :gender, :age
end
```

Humm... :thinking: Trông code cũng không tệ nhỉ, nhưng một sự thật là trông nó rất xấu xí, vô tổ chức, và khả năng mở rộng về sau là không có nếu như cứ phải `if else` kiểu đó :sunglasses:.
<br><br>
Bạn có thể thử gọi API bằng [Postman](https://www.getpostman.com/) với form data cố tình làm cho fail validate, sẽ nhận được một response như sau:

```json
{
    "email": [
        "is invalid"
    ],
    "password": [
        "can't be blank",
        "is invalid"
    ],
    "phone_number": [
        "has already been taken"
    ],
    "age": [
        "can't be blank",
        "is not a number"
    ]
}
```
Rõ ràng nó khác xa với những gì chúng ta cần như đã nói ở phía trên :smile:
<br><br>
Bây giờ bạn sẽ muốn sửa controller của mình để có một "_happy path_" đầu tiên như sau :smile:
```ruby
def create
  @user = User.create! user_params

  render json: @user, status: :created, location: @user
end
```
Hãy thử gọi lại API trên Postman. BANG! Hô hô hô, bạn nhận được một cục lỗi :laughing: Thứ gì đó đại loại như sau :laughing: 
> Unprocessable Entity
>
>  ActiveRecord::RecordInvalid

Phải thôi, bạn vừa sửa controller của mình lại, sử dụng một _bang method_ `create!` thay vì `create`. 

Tốt thôi, hãy thử thêm đoạn code sau vào `application_controller.rb` của bạn sau đó thử lại trên Postman.
```ruby
class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  
  protected
  def render_unprocessable_entity_response error, status: :unprocessable_entity
    render json: error.record.errors, status: status
  end
end
```

Sao hả? Hết lỗi rồi nhé, bạn nhận được một response như cũ.

Bằng cách kết hợp _bang method_ và `rescue_from` bạn đã tạo ra được một _happy path_ đầu tiên, controller trông sáng sủa hơn nhiều mà vẫn đạt được một response như nhau.
<br><br>
Sau khi đã `catch` được lỗi rồi công việc đơn giản là phân tích lỗi để đưa về response chuẩn. Mình sẽ tạo ra một `class` đảm nhận việc này và sửa hàm `render_unprocessable_entity_response` trong `application_controller` lại như sau:
```ruby
def render_unprocessable_entity_response error, status: :unprocessable_entity
  render json: Errors::ActiveRecordValidation.new(error.record).to_hash, status: status
end
```
Phải, vừa xuất hiện một `class` lạ hoắc `Errors::ActiveRecordValidation`, đây sẽ là class làm nhiệm vụ chuyển lỗi của validations thành format chuẩn của response.
<br><br>
Xem qua về object lỗi mà `ActiveRecord` cung cấp để các bạn hình dung rõ hơn về đầu vào của chúng ta:
```ruby
# error.record.errors.details
{:email=>[{:error=>:invalid, :value=>"tran.dai.sonframgia.com"}],
 :password=>[{:error=>:blank}, {:error=>:invalid, :value=>nil}],
 :phone_number=>[{:error=>:taken, :value=>"+841206213188"}],
 :age=>[{:error=>:blank}, {:error=>:not_a_number, :value=>""}]}
 
# error.record.errors.to_hash true
{:email=>["Email is invalid"],
 :password=>["Password can't be blank", "Password is invalid"],
 :phone_number=>["Phone number has already been taken"],
 :age=>["Age can't be blank", "Age is not a number"]}
```

Bây giờ định nghĩa class đó tại thư mục `lib`: `lib/errors/active_record_validation.rb`
```ruby
module Errors
  class ActiveRecordValidation
    attr_reader :record

    def initialize record
      @record = record
      @errors = serialize
    end

    def serialize full_messages: true
      messages = record.errors.to_hash full_messages
      record.errors.details.map do |field, details|
        detail = details.first[:error]
        message = messages[field].first
        ValidationErrorSerializer.new(record, field, detail, message).serialize
      end
    end

    def to_hash
      {
        success: false,
        errors: serialize
      }
    end
  end
end
```
Hàm `to_hash` sẽ tạo ra một _hash_ với định dạng như mô tả ban đầu dùng cho render json ở application controller.

* Trong hàm `serialize` bạn cần để ý dòng `detail = details.first[:error]` và `message = messages[field].first`, ở đây với mỗi trường bị lỗi chúng ta chỉ cần lấy một lỗi đầu tiên để trả về là đủ, client không hiện hết toàn bộ lỗi của một field lên đâu, nên trả về hết toàn bộ lỗi trên 1 trường là 1 ý tưởng thừa thải.
* `ValidationErrorSerializer` nhìn cái tên class thôi cũng đủ biết nó là một cái `serilizer` rồi, nhiệm vụ của nó là từ các thông tin lỗi trả về thông tin `resource`, `field`, `code` và `message`.

  Bạn có thể đặt class này ở thư mục `lib`, riêng mình mình thích gom các serilizers lại cùng 1 thư mục nên mình sẽ đặt ở đường dẫn `app/serializers/validation_error_serializer.rb`. Class này như sau:
  ```ruby
  class ValidationErrorSerializer
    def initialize record, field, detail, message
      @record = record
      @field = field
      @detail = detail
      @message = message
    end

    def serialize
      {
        resource: resource,
        field: field,
        code: code,
        message: @message
      }
    end

    private
    def resource
      I18n.t underscored_resource_name,
        locale: :api,
        scope: [:api, :errors, :resources],
        default: underscored_resource_name
    end

    def field
      I18n.t @field,
        scope: [:api, :errors, :fields, underscored_resource_name],
        default: @field.to_s
    end

    def code
      I18n.t @detail,
        locale: :api,
        scope: [:api, :errors, :code],
        default: @detail.to_s
    end

    def underscored_resource_name
      @record.class.to_s.gsub("::", "").underscore
    end
  end
  ```
  Trong này có một số chỗ bạn cần lưu ý:
    * `resource`, `field`, `code` đều có thể đuợc custom lại text thông qua i18n. Tuy nhiên theo mình thì không nên custom lại, nên mình đặt các trường này vào file `locale` là `api`, tức là sẽ giống nhau giữa các ngôn ngữ.
    * Mã lỗi `code` nếu không custom lại sẽ có dạng như sau:
      ```ruby
      {
          "resource": "user",
          "field": "email",
          "code": "invalid",
          "message": "Email is invalid"
      }
      ```
      Nếu bạn hỏi mình để như vậy có được không? thì câu trả lời là __được__, rất dễ đọc, nhìn vào là biết lỗi gì liền thay vì nhìn con số `1009`, ai biết là lỗi quái gì :smile:
      
      Nhưng __không được__ :joy: Lỗi validation thì còn còn tên cho code chứ lỗi trong quá trình thực thi thì ai rảnh mà ngồi đặt tên cho nó, từ ngữ đâu diễn tả cho hết mà ko bị trùng. Nên thống nhất là dùng số cho tất cả các trường hợp.
      <br><br>
      Nghĩa là bạn phải tạo ra file `config/locales/api.yml`, mình sẽ cho bạn luôn toàn bộ lỗi của `ActiveRecord` validation như sau:
      ```yaml
      api:
        api:
          errors:
            code:
              default: 1000
              confirmation: 1001
              accepted: 1002
              blank: 1003
              present: 1004
              too_short: 1005
              too_long: 1006
              wrong_length: 1007
              taken: 1008
              invalid: 1009
              inclusion: 1010
              exclusion: 1011
              required: 1012
              not_a_number: 1013
              greater_than: 1014
              greater_than_or_equal_to: 1015
              equal_to: 1016
              less_than: 1017
              less_than_or_equal_to: 1018
              other_than: 1019
              not_an_integer: 1020
              odd: 1021
              even: 1022
              record_not_found: 1100
      ```
  
Sau bước này, từ mớ hỗn độn ở trên mình đã tạo ra được một response đẹp đẽ hơn nhiều:
```json
{
    "success": false,
    "errors": [
        {
            "resource": "user",
            "field": "email",
            "code": 1009,
            "message": "Email is invalid"
        },
        {
            "resource": "user",
            "field": "password",
            "code": 1003,
            "message": "Password can't be blank"
        },
        {
            "resource": "user",
            "field": "phone_number",
            "code": 1008,
            "message": "Phone number has already been taken"
        },
        {
            "resource": "user",
            "field": "age",
            "code": 1003,
            "message": "Age can't be blank"
        }
    ]
}
```
Chốt lại ở đây là sử dụng các _bang method_ kết hợp với `rescue_from` để handle lỗi thay vì các hàm `save`, `create`, `update`,...
<br><br>
Vậy là xong việc cho `ActiveRecord` validation rồi nhé :handshake:

### 2. Một số lỗi khác của `ActiveRecord`
Ngoài `ActiveRecord::RecordInvalid` ra thì còn có cả một mớ những class lỗi khác cần được `rescue` nữa nếu trong quá trình code bạn có đụng đến. Lúc nào gặp phải thì bạn định nghĩa tương tự như cách làm ở trên là được rồi, mình không thể liệt kê hết được đâu, vì chính mình cũng chưa gặp hết toàn các lỗi đó, một số cái điển hình mình có thể liệt kê cho bạn như:
> ActiveRecord::RecordNotDestroyed
>
> ActiveRecord::RecordNotFound
>
> ActiveRecord::RecordNotSaved
>
> ActiveRecord::RecordNotUnique

Ở đây điển hình có `ActiveRecord::RecordNotFound` chúng ta sẽ hay gặp phải (được `raise` khi dùng hàm `find` hoặc `find_by!`)

Đầu tiên là `rescue` nó ở `application_controller`:
```ruby
rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found_response

protected
def render_record_not_found_response error, status: :not_found
  render json: Errors::ActiveRecordNotFound.new(error).to_hash, status: status
end
```

Lại ra đời thêm một class lỗi nữa. Bạn để ý một chút xíu lần này vẫn lại tạo ra một đối tượng lỗi rồi gọi hàm `to_hash` để tạo ra body cho response. Khá quen nhỉ?

Ngoài ra việc body của response bao gồm `errrors` và `status` đồng nhất giữa các class lỗi, như vậy có phải là chúng ta nên vận dụng tính thừa kế của hướng đối tượng không nhỉ?
<br><br>
Đầu tiên tạo ra class lỗi để tất cả các class sau kế thừa nó `lib/errors/application_error.rb`:
> Nếu bạn có thắc mắc tại sao mình đặt tên là `application_error` thì cứ nhìn lại những gì rails (>= 5.1) đã cho ta, `application_controller`, `application_model` (không còn là `ActiveRecord::Base` nữa rồi nhé).
>
> Đến đây chắc bạn hiểu ý đồ của Rails và của mình rồi nhỉ?  

```ruby
module Errors
  class ApplicationError < StandardError
    attr_reader :code, :message

    def initialize code: nil, message: nil
      @code, @message = code, message
    end

    def serialize
      [
        {code: code, message: message}
      ]
    end

    def to_hash
      {
        success: false,
        errors: serialize
      }
    end
  end
end
```
Hàm khởi tạo của class này có 2 optional agruments là `code` và `message`, lý do mình sẽ giải thích ở phần 3.

Bây giờ mình có thể xoá hàm `to_hash` ở `ActiveRecordValidation` đi sau khi cho nó kế thừa `ApplicationError`

```ruby
module Errors
  class ActiveRecordValidation < Errors::ApplicationError
  # all previous content is still here.
  end
end
```
Tiếp theo là tạo ra file `lib/errors/active_record_not_found.rb`, lưu ý là class này cũng sẽ kế thừa lớp `Errors::ApplicationError`
```ruby
module Errors
  class ActiveRecordNotFound < Errors::ApplicationError
    attr_reader :model, :field, :detail, :message_key

    def initialize error, message: nil
      @model = error.model.underscore
      @detail = error.class.to_s.split("::")[1].underscore
      @field = error.primary_key
      @message_key = message || :default
      @errors = serialize
    end

    def serialize
      [
        {
          resource: resource,
          field: field,
          code: code,
          message: message
        }
      ]
    end

    private
    def message
      I18n.t message_key,
        scope: [:api, :errors, :messages, :not_found],
        resource: resource
    end

    def resource
      I18n.t model,
        locale: :api,
        scope: [:api, :errors, :resources],
        default: model
    end

    def code
      I18n.t detail,
        locale: :api,
        scope: [:api, :errors, :code],
        default: detail
    end
  end
end
```
Bạn sẽ hỏi mình là có cần viết serializer cho thằng này không? Theo cá nhân mình thì không cần, bản thân lỗi này trong mảng `errors` chỉ luôn có 1 phần tử thôi, tạo luôn phần tử đó ở đây là được rồi.
<br><br>
Vậy là giải quyết được thêm 1 lỗi phổ biến nữa rồi nhé. Các class error còn lại các bạn tự xoay sở :joy:

### 3. Giải quyết lỗi trong quá trình thực thi (controllers, service objects,...)

```ruby
def passed_condition?
  @errors = case false
  when mission.present?
    I18n.t "errors.complete_mission.mission_not_found"
  when mission_user.present?
    I18n.t "errors.complete_mission.current_missions_user_not_found"
  when mission_award.present? || invalid_15th_mission_award?
    I18n.t "errors.complete_mission.mission_award_not_found"
  when !was_earned?
    I18n.t "errors.complete_mission.mission_award_earned"
  when !was_award_completion?
    I18n.t "errors.complete_mission.mission_award_cannot_earn"
  end
  errors.nil?
end
```
#### WTF? :joy:

Hy vọng là bạn đã từng nghe nói qua về [Service Object](https://github.com/infinum/rails-handbook/blob/master/Design%20Patterns/Service%20Objects.md), hiểu nôm na nó như là osin cho _controller_ vậy. 

Bên trên là 1 đoạn code của một service object, hàm này được gọi trước khi thực thi object để đảm bảo rằng mọi thứ OK trước khi thực thi, và nếu có lỗi thì lỗi sẽ được gán cho biến `@errors`, sau khi thực thi get `errors` từ service object để response cho client. :joy:
<br><br>
Ai chọc mù mắt tôi đi :smile: Rõ ràng là rất khó để handle lỗi nếu có quá nhiều case như này.
<br><br>
Mọi thứ sẽ dễ chịu hơn nếu có `Errors::ApplicationError` ở đây :relaxed: Thử hình dung cứ ở đâu gặp lỗi thì phóng lỗi ra tại đó ngay và luôn, dừng luôn việc thực thi lại, việc xử lý lỗi và response đã có 1 giàn hậu cần phía sau lo rồi, ko phải suy nghĩ gì thêm nữa. Khi đi đến được cuối hàm có nghĩa là làm đã thực thi thành công (vì nếu có lỗi thì đã bị rơi rụng giữa đường rồi).
<br><br>
Vậy lợi ích ở đây dễ dàng thấy là service object được tuân thủ "_chỉ có 1 public method dùng để thực thi service_", không cần method `.success?` để kiểm tra service thực thi thành công hay không, ko cần method `.errors` để lấy thông tin lỗi.

Trên thực thế lỗi ở service object và controller khá giống nhau, nên hướng giải quyết cũng như nhau.
<br><br>
Trở lại với class `Errors::ApplicationError`, giả sử mình có một định nghĩa `i18n` như sau:
```yaml
en:
  api:
    errors:
      unexpected:
        code: 1100,
        message: Opps... Unexpected error.
```
Mình có thể khởi tạo một đối tượng lỗi của `ApplicationError` bằng thông tin ở `i18n` nói trên như sau:
```ruby
raise Errors::ApplicationError.new I18n.t(:unexpected, scope: [:api, :errors])
```
như vậy khi ở controller (hoặc service) gặp một lỗi nào đó bất kỳ mình muốn dừng chương trình lại và response lỗi đó về ngay cho client thì chỉ cần define lỗi đó vào file `i18n` theo cặp gồm `code` và `message`, sau đó raise lỗi lên như ví dụ phía trên là xong.
<br><br>
Khá đẹp trai nhỉ :sunglasses: Nhưng đẹp trai không chưa đủ, phải hot boy :smile: Mình muốn cách thức raise lỗi gọn gàng hơn nữa, cụ thể là như thế này:
```ruby
raise Errors::ApplicationError, :unexpected
# or
# raise Errors::ApplicationError.new :unexpected
```
Ý tưởng là class lỗi sẽ tìm cách đọc xem lỗi ở đâu, lấy tên class đó và đọc vào file `i18n` tương ứng.

Ví dụ mình `raise` lỗi ở `Api::V1::UsersController` thì đường dẫn ở file `i18n` sẽ là `"api.v1.users.<xxx>"`

Để làm được điều này đầu tiên mình cần 1 class lỗi chung cho controller và service object, mình tạm gọi là lỗi runtime `lib/errors/runtime.rb`
```ruby
module Errors
  module Runtime
    class StandarError < Errors::ApplicationError
      attr_reader :type, :detail

      def initialize type, detail
        @type, @detail = type, detail
        scope = i18n_scope
        error = I18n.t detail, scope: scope, default: translation_missing(detail ,scope)
        @code = error[:code]
        @message = error[:message]
      end

      private
      def i18n_scope
        backtrace = caller 0, 5
        matches_file = backtrace.last.match(file_path_regex) || backtrace[2].match(file_path_regex)
        file_path = matches_file[0]
        file_path.split(%r|/|)[3..-1].map {|e| e.gsub file_suffix, ""}
      end

      def file_path_regex
        case type
        when :controller
          /\/app\/(controllers)\/.*\.rb/
        when :service
          /\/app\/(services)\/.*\.rb/
        end
      end

      def file_suffix
        case type
        when :controller
          %r|_controller.rb|
        when :service
          %r|_service.rb|
        end
      end

      def translation_missing detail, scope
        prefix_msg = "translation missing: #{scope.push(detail.to_s).join('.')}"
        {
          code: "#{prefix_msg}.code",
          message: "#{prefix_msg}.message"
        }
      end
    end

    class ActionFailed < Errors::Runtime::StandarError
      def initialize detail
        super :controller, detail
      end
    end

    class ServiceFailed < Errors::Runtime::StandarError
      def initialize detail
        super :service, detail
      end
    end
  end
end
```
Để mình giải thích qua:
* Class `StandarError` kế thừa `Errors::ApplicationError` để sử dụng chung response format cũng như hàm `to_hash` :sunglasses:
* Bên dưới mình tạo ra thêm 2 class là `ActionFailed` dùng để bắn lỗi trong quá trình thực thi ở action trong controller, và `ServiceFailed` dùng để bắn lỗi trong quá trình thực thi ở service object.

  Cả 2 class trên đều kế thừa `Errors::Runtime::StandarError` để sở hữu "tính năng" tự động dò tìm `message` và `code` ở `i18n`.
* Cách thức dò tìm message ở `i18n` mình thực hiện dựa vào `caller()`, đây là một hàm trong module `Kernel` của ruby, bạn xem thêm [tại đây](https://apidock.com/ruby/Kernel/caller), mình lợi dụng nó để tìm ra nơi nào đã bắn error (`controller` hay `service`) và đọc đường dẫn đến file tương ứng để lấy message trong `i18n`.

Bây giờ thay vì truyền vào `code` và `message` ngu ngốc ban đầu chúng ta chỉ cần truyền key cụ thể vào là đã lấy được `code` và `message` một cách tự động.
```ruby
raise Errors::ApplicationError.new I18n.t(:unexpected, scope: [:api, :errors])
# same as
raise Errors::Runtime::ActionFailed, :unexpected # if in controller
# same as
raise Errors::Runtime::ServiceFailed, :unexpected # if in service
# same as 
raise Errors::Runtime::StandarError.new(:controller, :unexpected) # if in controller
# same as 
raise Errors::Runtime::StandarError.new(:service, :unexpected) # if in service
```
Tha hồ linh động sử dụng nhé.

Cuối cùng đừng quên thêm `message` và `code` ở i18n cũng như `rescue_from` cho các class lỗi vừa mới thêm ở trên vào application controller của bạn nhé.
```ruby
rescue_from(
  Errors::Runtime::StandarError,
  Errors::Runtime::ActionFailed,
  Errors::Runtime::ServiceFailed,
  with: :render_runtime_error_response
)

protected
def render_runtime_error_response error, status: :bad_request
  render json: error.to_hash, status: status
end
```

### Tổng kết: Còn điều gì cần giải quyết nữa không?
Còn, viết Test :sweat: Cho đến thời điểm hiện tại mình chỉ mới viết Rspec cho controller, service để đảm bảo rằng code thực thi đúng, chứng tỏ những class lỗi này chạy đúng chứ mình chưa trực tiếp viết Rspec cho những class này, nếu bạn có ý tưởng nào đóng góp cho vấn đề này, feel free to comment below.
<br><br>
Còn nữa, khi số lượng class error tăng lên, đồng nghĩa với việc file `application_controller` của bạn cũng sẽ phình ra, bạn có thể move những dòng code `rescue_from` cũng những hàm handler sang một file khác, đặt trong thư mục `app/controllers/concerns`, sau đó chỉ việc `include` module concern vừa tạo vào `application_controller` là xong.
<br><br>
Cuối cùng còn 2 điều mình muốn các bạn lưu ý:
* Pattern này được lợi về mặt quản lý source code, giúp mọi thứ dễ dàng hơn, dễ hiểu hơn, bù lại nó raise nhiều exception hơn bình thường :joy: invoke nhiều error class hơn nên có thể sẽ bị hy sinh một chút về mặt performance. Mình vẫn chưa test cụ thể, sẽ update lại sau khi mình làm một bài test hiệu năng cho nó, nhưng trên thực tế mình cảm nhận tốc độ không có sự thay đổi.

  Đối với những dự án lớn thì khả năng scale up và maintainability quan trọng hơn, phải hi sinh thôi.
* Pattern này không phải thần thánh, nên có thể có trường hợp không cover hết được, tuy nhiên đến thời điểm hiện tại mình chưa thấy trường hợp nào ko dùng đc :joy: cứ yên tâm mà sử dụng thôi.