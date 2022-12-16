## 1.Mở đầu
Ở bài viết này, mình xin giới thiệu tới các bạn gem Simple Command dùng để xây dựng và sử dụng Services Object một cách đơn giản và chuẩn hóa.
Simple Command hỗ trợ tạo mới và kiểm tra trạng thái của action nào đó trong một đối tượng rất dễ dàng.

## 2.Cài đặt
Thêm dòng này vào Gemfile của bạn:

**`gem 'simple_command'`**

Sau đó thực hiện:

**`bundle install`** 

## 3.Sử dụng
Đây là một ví dụ về xác thực người dùng

**Trong file Service Object**
**Sử dụng từ khóa "prepend" để thêm SimpleCommand vào file Service.**
```
# define a command class
class AuthenticateUser
  # put SimpleCommand before the class' ancestors chain
  prepend SimpleCommand

  # optional, initialize the command with some arguments
  def initialize(email, password)
    @email = email
    @password = password
  end

  # mandatory: define a #call method. its return value will be available
  #            through #result
  def call
    if user = User.authenticate(@email, @password)
      return user
    else
      errors.add(:authentication, I18n.t "authenticate_user.failure")
    end
    nil
  end
end
```

**Trong file Controller:**
```
class Api::SessionsController < Api::BaseController
  def create
    command = AuthenticationService.call params[:access_token]
    if command.success?
      render json: command.result, serializer: EmployeeSerializer
    else
      render json: {errors: command.errors}
    end
  end
end
```
**Khởi tạo đối tượng mới thông qua Simple Command thì không cần gọi lại từ khóa "new" vì trong thư viện của Simple Command đã làm giúp chúng ta việc đó:**
```
module SimpleCommand
  attr_reader :result

  module ClassMethods
    def call(*args)
      new(*args).call
    end
  end

  def self.prepended(base)
    base.extend ClassMethods
  end

  def call
    fail NotImplementedError unless defined?(super)

    @called = true
    @result = super

    self
  end
```
**Hàm call của module simple_command**
- Có 2 instance variable: called và result
- Trong đó biến called đc  set = true khi hàm call đc gọi, biến result chứa kết quả trả về từ module ClassMethods khai báo bên trên

**Simple Command cung cấp một số hàm để tiện lợi cho việc kiểm tra trạng thái các action của đối tượng được tạo ra từ việc call method ở trên:**
```
  def success?
    called? && !failure?
  end

  def failure?
    called? && errors.any?
  end

  def errors
    @errors ||= Errors.new
  end
```

## 4.Viết Rspec
**Tạo file spec/commands/authenticate_user_spec.rb**
```
describe AuthenticateUser do
  subject(:context) { described_class.call(username, password) }

  describe '.call' do
    context 'when the context is successful' do
      let(:username) { 'correct_user' }
      let(:password) { 'correct_password' }
      
      it 'succeeds' do
        expect(context).to be_success
      end
    end

    context 'when the context is not successful' do
      let(:username) { 'wrong_user' }
      let(:password) { 'wrong_password' }

      it 'fails' do
        expect(context).to be_failure
      end
    end
  end
end
```
**Cảm ơn các bạn đã đọc đến đây!  Xin chào và hẹn gặp lại ^^!**

Nguồn tham khảo: https://github.com/nebulab/simple_command