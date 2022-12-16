Ở [phần 1](https://viblo.asia/p/xay-dung-mot-ung-dung-restful-api-don-gian-voi-rails-5-phan-1-aWj53LYpK6m) mình đã xây dựng được một ứng dụng API cơ bản, tiếp theo mình sẽ áp dụng gem `active_model_serializers` để xây dựng các response chuẩn cho ứng dụng.
# Active model serializers
`ActiveModelSerializers` tạo convention về cấu hình sang dạng Json.

`ActiveModelSerializers` hoạt động thông qua hai thành phần: **serializers và adapter**.

`Serializers` mô tả về các thuộc tính và các mối quan hệ cần được nhắc đến.

Adapters mô tả cách mà các thuộc tính và các mối quan hệ được nhắc đến.

SerializableResource phối hợp các resources , Adapter và Serializer để xuất bản các tài nguyên serialization. Các serialization có #as_json, #to_json và #serializable_hash các phương pháp được sử dụng bởi Rails JSON Renderer.
## Cài đặt
Thêm `gem "active_model_serializers"` vào Gemfile. Sau đó chạy `bundle install`
## Tạo serializers
Chạy lệnh `rails g serializer post` để khởi tạo serializer chô model post mà ta đã tạo từ trước.

```ruby
#app/serializers/post_serializer.rb

class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content
end
```

Như vậy là chúng ta đã khởi tạo xong serializer để sử dụng.
# Response sử dụng serializers
Mình sẽ viết lại các phương thức trong PostsController sử dụng serializer
## index
```ruby
def index
    @posts = Post.order('created_at DESC')
    render json: {
      success: true,
      data: ActiveModel::Serializer::CollectionSerializer.new(@posts, serializer: PostSerializer)
    }
end
```
Kết quả test với Postman
![](https://images.viblo.asia/2dcf58b0-14a0-45b4-8637-f2c63a460914.png)
## show
```ruby
def show
    render json: {
      success: true,
      data: PostSerializer.new(@post)
    }
end
```
![](https://images.viblo.asia/d038f0cf-b5eb-4a05-96f3-f28fc1ede39b.png)
## create
```ruby
def create
    @post = Post.new post_params

    @post.save!
    render json: {
      success: true,
      data: PostSerializer.new(@post)
    }
end
```
![](https://images.viblo.asia/840d84c1-974d-4712-82a5-2cef405d01ac.png)
## udpate
```ruby
def update
    @post.update! post_params
    render json: {
      success: true,
      data: PostSerializer.new(@post)
    }
end
```
![](https://images.viblo.asia/88b84606-5c14-45d3-a414-ab14626eb93d.png)
## destroy
```ruby
def destroy
    @post.destroy!
    render json: {
      success: true,
      data: PostSerializer.new(@post)
    }
end
```
# Bắt các lỗi cơ bản với serializers
## Validation Errors
Đầu tiên chúng ta sẽ khai báo một class dùng chung để sử dụng cho các serializer bắt lỗi.
```ruby
#app/serializers/api/errors/base_errors_serializer.rb

class Api::Errors::BaseErrorsSerializer < ActiveModel::Serializer
  attribute :success
  attribute :errors

  def success
    false
  end
end
```
Response sẽ gồm 2 attribute là success để thông báo trạng thái và errors để đưa ra danh sách lỗi.

Tạo class bắt lỗi validate kế thừa từ class `BaseErrorsSerializer`
```ruby
#app/serializers/api/errors/validation_errors_serializer.rb

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
```ruby
#app/serializers/api/errors/each_validation_errors_serializer.rb

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
Tiếp theo ta cần khai báo để trả về khi xảy ra validate exception.
```ruby
#app/controllers/concerns/exception_rescue.rb

module ExceptionRescue
  extend ActiveSupport::Concern

  included do
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalidation_response

    def render_invalidation_response exception
      render json: exception.record, serializer: Api::Errors::ValidationErrorsSerializer,
        status: :bad_request
    end
  end
end
```
```ruby
#app/controllers/api_controller.rb

class ApiController < ActionController::API
  include Api::ExceptionRescue
end
```
Cuối cùng là khai báo I18n
```yml
#config/locales/en.yml

en:
  api_validation:
    resources:
      post: Post
    fields:
      post:
        title: Title
        content: content
    codes:
      blank: 1000
```
![](https://images.viblo.asia/d47a43ca-6809-4774-89b8-4b17b2d1006f.png)
## Record Not Found
Trường hợp lỗi xảy ra khi không tìm thấy record tương ứng, ta cũng xây dựng một class để khai báo lỗi.
```ruby
#app/serializers/api/errors/active_record_not_found.rb

class Api::Errors::ActiveRecordNotFound
  attr_reader :model, :detail, :message_key

  def initialize error, message: nil
    @model = error.model.underscore
    @detail = error.class.to_s.split("::")[1].underscore
    @message_key = message || :default
    @errors = serialize
  end

  def serialize
    {
      resource: resource,
      code: code,
      message: message
    }
  end

  def to_hash
    {
      success: false,
      errors: serialize
    }
  end

  private
  def message
    I18n.t "params_exception.active_record.record_not_found.message"
  end

  def resource
    I18n.t(
      underscored_resource_name,
      scope: [:api_validation, :resources]
    )
  end

  def code
    I18n.t detail,
      scope: [:api, :errors, :code],
      default: detail,
      locale: :api
  end

  def underscored_resource_name
    @model.to_s.gsub("::", "").underscore
  end
end
```
Thêm vào file `exception_rescue.rb`
```ruby
  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found_response
  def render_record_not_found_response exception
    render json: Api::Errors::ActiveRecordNotFound.new(exception).to_hash, status: :not_found
  end
```
Chỉnh sửa phương thức load_posts trong PostsController để raise ra lỗi với phương thức `find_by!` khi không tìm thấy record
```ruby
  def load_post
    @post = Post.find_by! id: params[:id]
  end
```
![](https://images.viblo.asia/76bc62a2-c4fb-46e0-a7ff-64cfb3619122.png)
I18n
```yml
en:
  api_validation:
    resources:
      post: Post
    fields:
      post:
        title: Title
        content: Content
    codes:
      blank: 1000
      invalid: 1002
      record_not_found: 1100
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
# Tổng kết
Qua 2 bài viết, mình đã tóm tắt lại cách xây dựng một ứng dụng API đơn giản với Ruby on Rails. Từ những kiến thức cơ bản này chúng ta có cơ sở để tìm hiểu sâu hơn và nâng cao hơn về API và RoR. Bài viết này nhằm mục đích ghi nhớ lại kiến thức cơ bản để xây dựng API do mình tự tìm hiểu do đó sẽ còn nhiều thiếu sót, rất mong nhận được đóng góp từ các bạn. Chúc mọi người thành công!