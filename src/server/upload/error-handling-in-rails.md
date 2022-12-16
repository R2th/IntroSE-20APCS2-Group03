### Murphy’s Law

Theo như Luật Murphy thì bất cứ điều gì cũng có thể sai vậy nên điều quan trọng chính là phải chuẩn bị cho nó. Nó áp dụng ở mọi nơi kể cả trong quá trình phát triển phần mềm. Ứng dụng mà chúng ta phát triển phải đủ mạnh mẽ, linh hoạt và mềm dẻo để xử lý nó.

Trong Rails, chúng ta sẽ xử lý các lỗi ở controller. Chẳng hạn như một lỗi trong tìm kiếm người dùng được xử lý ở controller như ví dụ dưới đây:

```
class UsersController < ApplicationController
  def show
    @user = User.find_by!(id: params[:id])
    render json: @user, status: :ok
  end
end
```

Ở đây ta thấy rằng, nếu user được tìm thấy, nó sẽ render lại json với user đã tìm được trước đó kèm trạng thái ```ok``` đã tìm được bản ghi. Trong trường hợp không có bản ghi user nào có id trùng khớp với id tìm kiếm, nó sẽ trả về lỗi 500 và điều hướng về trang lỗi từ server. Và thay vì để mặc định thì chúng ta sẽ xử lý trường hợp không tìm thấy để thông báo cho người dùng, và đây là việc làm cần thiết.

Khi bạn sử dụng find_by! như ở ví dụ trên và đối tượng không được tìm thấy, ta sẽ nhận được một lỗi thông báo bắn ra [RecordNotFound](https://apidock.com/rails/ActiveRecord/RecordNotFound) 

![](https://images.viblo.asia/e6b4edf7-b97b-4bf3-b074-6abaffdca4da.png)

### Exception != Error

Trước khi bắt đầu xử lý các lỗi, điều quan trọng là ta phải hiểu lỗi sẽ xảy ra với dòng code mà chúng ta đưa vào. Như ví dụ trên, lỗi nhận được từ server là ```ActiveRecord :: RecordNotFound```, và trong trường hợp này, ta sẽ thêm 1 đoạn try catch để bắt lỗi

```
begin
  @user = User.find_by!(id: 1)
rescue ActiveRecord::RecordNotFound => e
  print e
end
```

Trong trường hợp, bạn muốn xử lý tất cả các ngoại lệ thì điều quan trọng bạn cần phải phân biệt được sự khác nhau giữa Exception và Error trong Rails. Và thay vì sử dụng ```ActiveRecord::RecordNotFound```, ta sẽ sử dụng ```Exception``` để bắt lỗi.

```
begin
  @user = User.find_by!(id: 1)
rescue Exception => e
  print e
end
```

```StandardError``` cũng sẽ là một cách để bạn có thể xử lý ngoại lệ thay cho việc dùng ```Exception```

```
begin
  @user = User.find_by!(id: 1)
rescue StandardError => e
  print e
end
```

Sử dụng ```Exception``` như đã nói nó sẽ bắt tất cả các trường hợp lỗi trong dòng code của bạn, tuy nhiên việc sử dụng nó bạn cũng nên cân nhắc, nếu quá lạm dụng Exception, bạn sẽ không thực sự biết được, nguyên nhân gây lỗi thực sự trong dòng code đó là gì, việc này thực sự gây khó khăn.

### The Rescue

Để xử lý tất cả các lỗi, ta có thể sử dụng ```Rescue```, nó cũng tương tự như vệc ta sử dụng try catch để xử lý lỗi như ở ví dụ trên

```
class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    render json: @user, status: :ok
  rescue ActiveRecord::RecordNotFound => e
    render json: {
      error: e.to_s
    }, status: :not_found
  end
```

Với ```Rescue```, các lỗi sẽ được xử lý hoàn toàn tại controller.

Tuy nhiên, nếu quá lạm dụng việc này, bạn sẽ khiến controller của bạn trở nên rất ```Fat``` và một đoạn code cồng kềnh sẽ là việc không ai mong muốn.

### Error Handling

ApplicationController sẽ là nơi để xử lý các errors nhằm tách biệt việc xử lý lỗi và xử lý logic riêng biệt để code trong sáng hơn.

Đầu tiên, tạo một module để bao quát việc xử lý lỗi: tạo module ErrorHandler trong file error_handler.rb với đường dẫn lib/error và để sử dụng, ta sẽ include nó vào trong ApplicationController như sau:

```
#application_controller.rb
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include Error::ErrorHandler
end
```

```
#error_handler.rb
module Error
  module ErrorHandler
    def self.included(clazz)
      clazz.class_eval do
        rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
      end
    end

    private
    def record_not_found(_e)
      json = Helpers::Render.json(:record_not_found, _e.to_s)
      render json: json, status: 404
    end
  end
end
```

Ta có thể include tất cả các module xử lý lỗi ```ErrorHandler``` ở trong ```ApplicationController```

```
class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    if @user
      render json: @user, status: :ok
    else
      render json: {
        error: "User with id #{params[:id]} not found."
      }, status: :not_found
    end
  end
end
```

Và refactor các module ```ErrorModule``` để giải quyết các vấn đề lỗi có thể xảy ra một cách gọn gàng hơn

```
module Error
  module ErrorHandler
    def self.included(clazz)
      clazz.class_eval do
        rescue_from ActiveRecord::RecordNotFound do |e|
          respond(:record_not_found, 404, e.to_s)
        end
        rescue_from StandardError do |e|
          respond(:standard_error, 500, e.to_s)
        end
      end
    end

    private
    
    def respond(_error, _status, _message)
      json = Helpers::Render.json(_error, _status, _message)
      render json: json
    end
  end
end
```

Nếu lỗi nhận được là ```ActiveRecord:RecordNotFound``` cũng thừa kế từ ```StandardError``` thì ta có thể xử lý nó thông qua ```:record_not_found```.

### Define your own Exception

Ngoài việc sử dụng các thông báo lỗi đã định sẵn của server, ta cũng có thể tự định nghĩa các lớp để bắt lỗi thừa kế từ ```StandardError```. Đầu tiên, ta sẽ tạo một lớp ```CustomError``` để chứa các biến và các phương thức chung cho tất cả các lỗi mà ta sẽ xử lý nó. 

Chúng ta cũng có thể định nghĩa các lớp Lỗi của riêng mình kế thừa từ StandardError. Để đơn giản, chúng ta có thể tạo một lớp CustomError chứa các biến và phương thức chung cho tất cả các lớp lỗi do người dùng định nghĩa. Bây giờ UserDefinedError của chúng tôi mở rộng CustomError.

```
#custom_error.rb
module Error
  class CustomError < StandardError
    attr_reader :status, :error, :message

    def initialize(_error=nil, _status=nil, _message=nil)
      @error = _error || 422
      @status = _status || :unprocessable_entity
      @message = _message || 'Something went wrong'
    end

    def fetch_json
      Helpers::Render.json(error, message, status)
    end
  end
end
```

```
#not_visible_error.rb
module Error
  class NotVisibleError < CustomError
    def initialize
      super(:you_cant_see_me, 422, 'You can\'t see me')
    end
  end
end
```

Để xử lý tất các các lỗi dạng: không xác định được người dùng, ta sẽ sử dụng khối ```rescue``` từ ```CustomError``` đã được định nghĩa trước đó.

### 404 and 500

Chúng ta có thể xử lý các trường hợp ngoại lệ phổ biến như 404 và 500 cho dù nó có thể được xử lý mặc định. Hoặc ta sẽ tạo ra một controller riêng biệt để điều hướng những lỗi đó

```
#errors_controller.rb
class ErrorsController < ApplicationController
  def not_found
    render json: {
      status: 404,
      error: :not_found,
      message: 'Where did the 403 errors go'
    }, status: 404
  end

  def internal_server_error
    render json: {
      status: 500,
      error: :internal_server_error,
      message: 'Houston we have a problem'
    }, status: 500
  end
end
```

Để Rails sử dụng Routes giải quyết các ngoại lệ, ta thêm dòng ```config.exceptions_app = routes``` vào file ```application.rb```

```
Rails.application.routes.draw do
  get '/404', to: 'errors#not_found'
  get '/500', to: 'errors#internal_server_error'

  root 'home#index'
  resources :users, only: [:create, :show]
  get 'not_visible', to: 'home#not_visible'
end
```

### Tổng kết

Modular là cách tiếp cận để xử lý lỗi của Rails. Khi chúng ta muốn thay đổi một thông báo lỗi nào đó, ta sẽ chỉ cần thay đổi ở một nơi, như vậy rất tiết kiệm thời gian và tránh sai sót trong quá trình sửa lỗi. Đồng thời, việc này sẽ giúp code cuả chúng ta tránh được những vấn đề sau:

1.  Fat Controllers
2.  The DRY principle
3.  Harder to Maintainability


### Tài liệu tham khảo

[Error Handling in Rails](https://medium.com/rails-ember-beyond/error-handling-in-rails-the-modular-way-9afcddd2fe1b)