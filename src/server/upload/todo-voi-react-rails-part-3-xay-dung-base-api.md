# Introduction
Trong bài part 1 và part 2, chúng ta đã xây dựng xong TODO App với các chức năng đơn giản với Reactjs. 
Hôm này chúng ta sẽ tiếp tục với phần API với Rails. Trong bài này, mình sẽ xây dựng API Base: data response, error response, bắt các exception  như thế nào ...?

# Response format
Việc đầu tiên, chúng ta sẽ cần có một response format làm chuẩn. Về việc thống nhất là response trả về như thế nào là tuỳ bạn. Nhưng ở đây mình gợi ý một format mình thường dùng trong dự án như sau:

* Trường hợp response success:
```json
{
  "success": true,
  "data": {
      "id": 1, 
      "title": "task1"
  }
}
```
**success**: có thể true/false.

**data**: có thể là object / hash / array. 

* Trường hợp lỗi validation:

```json
{
  "success": false,
  "errors": [
      {
        "resource": "task",
        "fields": "title",
        "code": 1000,
        "message": "Title can't be blank"
      }
  ]
}
```

**resource**: là model bị lỗi
**fields**: là trường bị lỗi

* Trường hợp lỗi như: missing params, record not found, ...
```json
  {
     "success": false
     "errors": [
         {
           "message": "Record not found",
           "code": 1000    
         }
     ]
  }

```

# Xây dựng API Base
Ở trên mình có response format làm chuẩn dùng cho App của mình rồi. Vậy làm thế nào để nhận được response tương ứng.

Mình sẽ sử dụng `gem active_model_serializers` để hỗ trợ xử lý response trả về. Cách sử dụng chi tiết , bạn xem ở đây https://github.com/rails-api/active_model_serializers

### Base controller cho api
* tạo `app/controllers/api_controller.rb`: 

tất cả controller sẽ kế thừa từ controller này. Trong này chứa `ExceptionRescue` là module chung để bắt các exception và trả về format response như trên.

```ruby
class ApiController < ActionController::API
  include Api::ExceptionRescue
end
```

* tạo `app/controllers/api/exception_rescue.rb`

```ruby
module Api::ExceptionRescue
  extend ActiveSupport::Concern

  included do
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalidation_response
    rescue_from ActionController::ParameterMissing, ActiveRecord::RecordNotFound,
      ArgumentError, ActiveRecord::RecordNotDestroyed, with: :render_params_error_response

    def render_invalidation_response exception
      render json: exception.record, serializer: Api::Errors::ValidationErrorsSerializer,
        status: :bad_request
    end

    def render_params_error_response exception
      render json: exception, serializer: Api::Errors::ParamsErrorsSerializer,
        status: :bad_request
    end
  end
end
```

Module trên xử lý bắt các exceptions và sử dụng serliaizer để parse nó thành format mình cần. 
Serlializer đó bao gồm 
* `Api::Errors::ValidationErrorsSerializer` : trả về response format cho các lỗi validation
* `Api::Errors::ParamsErrorsSerializer`: trả về response format cho các lỗi như: missing params, record not found, ...

### Base serializer để xử lý lỗi
* tạo `BaseErrorsSerializer`: `app/serializers/api/errors/base_errors_serializer.rb`: là class cha để xử lý lỗi, các class khác sẽ kế thừa từ class này.

```ruby
class Api::Errors::BaseErrorsSerializer < ActiveModel::Serializer
  attribute :success
  attribute :errors

  def success
    false
  end
end
```

* tạo `app/serializers/api/errors/validation_errors_serializer.rb` :  trả về response format cho các lỗi validation

```ruby
class Api::Errors::ValidationErrorsSerializer < Api::Errors::BaseErrorsSerializer
  def errors
    object.errors.details.map do |field, details|
      details.map.with_index do |error_details, index|
        Api::Errors::EachValidationErrorSerializer.new(
          object, field, error_details, object.errors[field][index]).generate
      end
    end.flatten
  end
end
```

trong class trên mình cần thêm `EachValidationErrorSerializer`
* tạo `app/serializers/api/errors/each_validation_error_serializer.rb`

```ruby
class Api::Errors::EachValidationErrorSerializer
  def initialize record, error_field, details, message
    @record = record
    @error_field = error_field
    @details = details
    @message = "#{field} #{message}"
  end

  def generate
    {
      resource: resource,
      field: @error_field,
      code: code,
      message: @message
    }
  end

  private
  def resource
    I18n.t(
      underscored_resource_name,
      scope: [:api_validation, :resources]
    )
  end

  def field
     I18n.t(
      @error_field,
      scope: [:api_validation, :fields, underscored_resource_name]
    )
  end

  def code
    I18n.t(
      @details[:error],
      scope: [:api_validation, :codes]
    )
  end

  def underscored_resource_name
    @record.class.to_s.gsub("::", "").underscore
  end
end
```

Class trên mình sẽ bắt được các exception và nhận được response format theo mong muốn. Nhưng mình cần thêm I18n có dạng như sau:

```yml
en:
  api_validation:
    resources:
      task: Task
    fields:
      task:
        title: Title
    codes:
      blank: 1000
      taken: 1001
      invalid: 1002
      confirmation: 1003
      too_long: 1007
      too_short: 1008
      not_a_number: 1009
      greater_than: 1010
      not_an_integer: 1011
```

* tạo `app/serializers/api/errors/params_errors_serializer.rb`:
trả về response format cho các lỗi như: missing params, record not found, ...

```ruby
class Api::Errors::ParamsErrorsSerializer < Api::Errors::BaseErrorsSerializer
  I18N_SCOPE = [:params_exception]

  def errors
    [{code: code, message: message}]
  end

  private
  def code
    error_type[:code]
  end

  def message
    error_type[:message]
  end

  def error_type
    @error_type ||= I18n.t class_name_underscore, scope: I18N_SCOPE
  end

  def class_name_underscore
    object.class.name.underscore.gsub(%r{\/}, ".")
  end
end
```

I18n scope cần có dạng:
```yml
  params_exception:
    active_record:
      record_not_found:
        code: 3001
        message: No data found.
    argument_error:
      code: 3002
      message: Incorrect parameter.
    record_not_destroyed:
      code: 3003
      message: Cannot be deleted.
```

Đến đây là chúng ta đã làm xong phần Base cho API rồi, baì tiếp theo chúng ta sẽ làm tiếp từng các api cần thiết cho App của mình.