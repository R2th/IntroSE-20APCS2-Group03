Hôm nay tôi xin chia sẻ với mọi người 7 lỗi thường hay gặp nhất khi lập trình ruby on rails. Đấy là những lỗi tôi đã ghi lại và thống kể, nếu các bạn cũng đã từng gặp lỗi này rồi thì sau khi đọc bài viết bạn sẽ dễ dàng nhận dạng và sửa lỗi.

Ở đây tôi chỉ thống kê những lỗi gây ảnh hướng đến bạn và đồng nghiệp khi làm dự án, ví dụ như gây mất thời gian tìm và sửa lỗi.

## 1. ActionController::RoutingError

Đây là lỗi thông dụng và cổ điển của nhiều web hay ứng dụng. Lỗi ```ActionController::RoutingError ``` nghĩ là được yêu cầu không tồn tại trên hệ thống.Rails sẽ raise lên lỗi nhưng không phải là lỗi của hệ thống.

```
ActionController::RoutingError (No route matches [GET] "/wp-admin"):
```

Lý do phổ biến dẫn đến lỗi này là do hệ thống không do phép người dùng truy cập, có thể là không có quyền. Nếu bạn deploy lên heroku hoặc bất kì platform khác xảy ra trường hợp không thể truy cập vào static files thì cũng dẫn đến lỗi ```ActionController::RoutingError```

```
ActionController::RoutingError (No route matches [GET] "/assets/application-eff78fd93759795a7be3aa21209b0bd2.css"):
```

Để khắc phục lỗi truy cập vào static file bạn cần sửa thêm dòng này vào file: ```config/environments/production.rb```.

```
Rails.application.configure do
  # other config
  config.public_file_server.enabled = true
end
```

Nếu bạn muốn log tất cả các lỗi router bạn có thể setup handle trong router, thêm dòng này vào file config/routes.rb.

```
Rails.application.routes.draw do
  # all your other routes
  match '*unmatched', to: 'application#route_not_found', via: :all
end
```

Và thêm hàm route_not_found vào ApplicationController:

```
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  def route_not_found
    render file: Rails.public_path.join('404.html'), status: :not_found, layout: false
  end
end
```

Việc handle router này bạn nên xem xet rồi mới áp dụng. Vì tất cả các router đều bị bắt trước khi đến controller xử lý.

## 2. NoMethodError: undefined method '[]' for nil:NilClass

Lỗi này là bạn dùng `[]` để đọc một thuộc tính của đối tượng nhưng đối tượng đó không tồn tại hoặc nil nên không tồn tại phương thức để gọi.
Sử dụng `[]` thường sử dụng cho hash hoặc array, lỗi này thường xảy ra khi bạn parsing dữ liệu JSON hoặc file CSV hoặc 1 cấu trúc dữ liệu lồng nhau.

Giả sử user summit form về thông tin địa chỉ, bạn cần dữ liệu có cấu trúc như sau:

```
{ user: { address: { street: '123 Fake Street', town: 'Faketon', postcode: '12345' } } }
```

Bạn sẽ truy cập vào street băng cách gọi: params[:user][:address][:street]. Nếu không có address nào trong user thì params[:user][:address] sẽ bị nil và việc gọi [:street] sẽ raise lỗi NoMethodError.

Để khắc phục bạn có thể kiểm tra nil rồi mới gọi để trả về kết quả:

```
street = params[:user] && params[:user][:address] && params[:user][:address][:street]
```

Việc thực hiện như cách trên thực sự mệt mỏi, dòng code dài dòng và không hiệu quả. Kể tử Ruby 2.3 hash và array sẽ được thêm phương thức `dig `. Dig cho phép cung cấp đường dẫn đến object bạn cần. Nếu bất kì bươc nào trả về nil thì nó sẽ return nil mà không raise lỗi NoMethodError:

```
street = params.dig(:user, :address, :street)
```

Bạn sẽ không nhận được lỗi, mặc dù street có thể nil.

Ngoài ra bạn cũng có thể nhận được kết quả tương tự bằng cách sử dụng `&.`.

```
street = user&.address&.street
```

If you are not using Ruby 2.3 or above you can achieve the same as above using the ruby_dig gem and ActiveSupport's try to achieve similar results.

Nếu bạn đang sửa dụng Ruby < 2.3 bạn có thể sử dụng gem ruby_dig.

## 3. ActionController::InvalidAuthenticityToken

Lỗi này có liên quan đến bảo mật nên bạn cần xem xét kĩ lưỡng. Lỗi `ActionController::InvalidAuthenticityToken` xảy ra khi bất kì một request POST, PUT, PATCH, or DELETE không có hoặc có CSRF Token không chính xác.

CSRF là một lỗi bảo mật trong đó có một web độc hại giả mạo request của người dùng. Vì khi một user đăng nhập vào phiên làm việc thì mỗi request đến server đều gửi kèm cookie, nên kẻ tấn công có thể giả mạo người dùng bằng cookie.

Rails giảm thiểu các cuộc tấn công CSRF bằng cách bao gồm một mã thông báo an toàn trong tất cả các request và xác minh bởi trang web, nhưng không thể được biết bởi một bên thứ ba. Điều này được thực hiện bởi dòng ApplicationController.

```
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
end
```

Vì vậy, nếu ứng dụng sản xuất của bạn đang tăng các lỗi ActionController :: InvalidAuthenticityToken thì điều đó có nghĩa là kẻ tấn công đang nhắm mục tiêu đến người dùng trang web của bạn, nhưng các biện pháp bảo mật của Rails sẽ giúp bạn an toàn.

Có nhiều lý do khác mà bạn có thể vô tình nhận được lỗi này.

**Ajax**
Ví dụ: nếu bạn đang thực hiện các yêu cầu Ajax từ giao diện người dùng của mình, bạn cần đảm bảo rằng bạn đang bao gồm mã thông báo CSRF trong yêu cầu. Nếu bạn đang sử dụng jQuery và bộ xây dựng sẵn có trong Rails thì nó đã được xử lý cho bạn. Nếu bạn muốn xử lý Ajax theo cách khác, giả sử sử dụng API Fetch, bạn sẽ cần phải đảm bảo bạn bao gồm mã thông báo CSRF. Đối với một trong hai cách tiếp cận, bạn cần đảm bảo bố cục ứng dụng của mình bao gồm thẻ meta CSRF trong phần <header> của request:
    
```
<%= csrf_meta_tags %>
```

Nó sẽ tạo ra một thẻ meta trông như thế này:

```
<meta name='csrf-token' content='THE-TOKEN'>
```

Khi thực hiện một yêu cầu Ajax, hãy thêm X-CSRF-Token vào header:

```
const csrfToken = document.querySelector('[name="csrf-token"]').getAttribute('content');
fetch('/posts', {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json'
    'X-CSRF-Token': csrfToken
  }
).then(function(response) {
  // handle response
});
```

**Webhooks/APIs**
Đôi khi có những lý do hợp lệ để tắt bảo vệ CSRF. Nếu bạn mong nhận được yêu cầu POST đến các URL nhất định trong ứng dụng của bạn từ bên thứ ba, bạn sẽ không muốn chặn chúng trên cơ sở CSRF. Bạn có thể ở vị trí này nếu bạn đang xây dựng một API cho các nhà phát triển bên thứ ba hoặc nếu bạn muốn nhận các webhook đến từ một dịch vụ.

Bạn có thể tắt bảo vệ CSRF bằng cách sau:

```
class ApiController < ApplicationController
  skip_before_action :verify_authenticity_token
end
```

Nếu bạn chấp nhận các request này, bạn nên minh rằng yêu cầu đến từ một nguồn đáng tin cậy.

## 4. Net::ReadTimeout

Net :: ReadTimeout xảy ra khi mất nhiều thời gian hơn để đọc dữ liệu hơn giá trị read_timeout, mặc định là 60 giây. Lỗi này có thể xảy ra lên nếu bạn đang sử dụng Net :: HTTP, open-uri hoặc HTTParty để thực hiện các yêu cầu HTTP.

Chú ý, điều này không có nghĩa là lỗi sẽ xảy ra nếu thời gian request lớn hơn giá trị read_timeout. Mà là thời gian thực hiện một lần đọc cụ thể. Bạn có thể đọc thêm về Net::HTTP and timeouts from Felipe Philipp.

Có một vài điều chúng ta có thể làm để ngăn chặn các lỗi Net :: ReadTimeout. Khi bạn hiểu các yêu cầu HTTP đang ném lỗi, bạn có thể thử điều chỉnh giá trị read_timeout thành một thứ hợp lý hơn. Như trong bài viết trên, nếu máy chủ bạn đang yêu cầu mất một thời gian dài để đặt cùng một phản hồi trước khi gửi tất cả cùng một lúc, bạn sẽ muốn có giá trị read_timeout dài hơn. Nếu máy chủ trả về phản hồi theo khối thì bạn sẽ muốn để read_timeout ngắn hơn.

Bạn có thể đặt read_timeout bằng cách đặt giá trị tính bằng giây trên ứng dụng HTTP tương ứng mà bạn đang sử dụng:

**with Net::HTTP**

```
http = Net::HTTP.new(host, port, read_timout: 10)
```

**with open-uri**

```
open(url, read_timeout: 10)
```

with HTTParty

```
HTTParty.get(url, read_timeout: 10)
```

Bạn không thể luôn luôn tin tưởng một máy chủ khác để phản hồi trong thời gian chờ mong đợi của bạn. Nếu bạn request HTTP trong Sidekiq, có thể giảm thiểu lỗi từ máy chủ khác. Bạn sẽ cần xử lý trường hợp máy chủ không bao giờ phản hồi kịp thời.

Nếu bạn request HTTP trong controller, thì bạn nên handle Net :: ReadTimeout và cung cấp cho người dùng kết quả thay thế. Ví dụ:

```
def show
  @post = Post.find(params[:slug])
  begin
    @comments = HTTParty.get(COMMENTS_SERVER, read_timeout: 10)
  rescue Net::ReadTimeout => e
    @comments = []
  @error_message = "Comments couldn't be retrieved, please try again later."
    Rollbar.error(e);
  end
end
```

## 5. ActiveRecord::RecordNotUnique: PG::UniqueViolation

Thông báo lỗi này dành riêng cho các cơ sở dữ liệu PostgreSQL, nhưng ActiveRecord cho MySQL và SQLite cũng sẽ có các lỗi tương tự. Vấn đề ở đây là một bảng cơ sở dữ liệu trong ứng dụng của bạn có một chỉ mục duy nhất trên một hoặc nhiều trường và một giao dịch đã được gửi đến cơ sở dữ liệu vi phạm chỉ mục đó. Đây là một vấn đề khó giải quyết hoàn toàn.

Hãy tưởng tượng bạn đã tạo Model User, và đảm bảo rằng địa chỉ email của người dùng là duy nhất:

```
class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :email
      t.timestamps
    end
    add_index :users, :email, unique: true
  end
end
```

Để tránh hầu hết các trường hợp của ActiveRecord :: RecordNotUnique, bạn cần thêm validate vào model User.

```
class User < ApplicationRecord
  validates_uniqueness_of :email
end
```

Nếu không có xác nhận này, tất cả các địa chỉ email sẽ được gửi đến cơ sở dữ liệu khi gọi User `save` và sẽ gây ra lỗi nếu chúng không phải là duy nhất.

Để đối phó với lỗi này, yêu cầu một số ngữ cảnh. Nếu các lỗi được gây ra bởi vi phạm nhiều validate, điều đó có thể là do người dùng đã gửi biểu mẫu hai lần do nhầm lẫn. Chúng tôi có thể cố gắng giảm thiểu vấn đề đó bằng một chút JavaScript để vô hiệu hóa nút gửi sau lần nhấp đầu tiên.

```
const forms = document.querySelectorAll('form');
Array.from(forms).forEach((form) => {
  form.addEventListener('submit', (event) => {
    const buttons = form.querySelectorAll('button, input[type=submit]')
    Array.from(buttons).forEach((button) => {
      button.setAttribute('disabled', 'disabled');
    });
  });
});
```

Có một mẹo để sử dụng first_or_create của ActiveRecord! cùng với `recuse` và `retry` khi lỗi được raise là một cách giải quyết gọn gàng. Bạn nên tiếp tục đăng nhập lỗi với giải pháp giám sát lỗi của bạn để bạn duy trì khả năng hiển thị kết quả.

```
def self.set_flag( user_id, flag )
  # Making sure we only retry 2 times
  tries ||= 2
  flag = UserResourceFlag.where( :user_id => user_id , :flag => flag).first_or_create!
rescue ActiveRecord::RecordNotUnique => e
  Rollbar.error(e)
  retry unless (tries -= 1).zero?
end
```

## 6. NoMethodError: undefined method 'id' for nil:NilClass

Lỗi này thường lén lút xung quanh hành động tạo đối tượng có quan hệ. Đường dẫn hạnh phúc — tạo đối tượng thành công — thường hoạt động, nhưng lỗi này sẽ xuất hiện khi các xác thực không thành công. Chúng ta hãy xem một ví dụ.

Có một controller và action tạo khóa học như sau:

```
class CourseApplicationsController < ApplicationController
  def new
    @course_application = CourseApplication.new
    @course = Course.find(params[:course_id])
  end
  def create
    @course_application = CourseApplication.new(course_application_params)
    if @course_application.save
      redirect_to @course_application, notice: 'Application submitted'
    else
      render :new
    end
  end
  private
  def course_application_params
    params.require(:course_application).permit(:name, :email, :course_id)
  end
end
```

Nội dung form:

```
<%= form_for [@course, @course_application] do |ca| %>
  <%# rest of the form %>
<% end %>
```

Vấn đề ở đây là khi bạn gọi kết xuất: mới từ hành động tạo, biến thể hiện @course đã không được đặt. Bạn cần đảm bảo rằng tất cả các đối tượng mà mẫu mới cần cũng được khởi tạo trong hành động tạo. Để khắc phục lỗi này, chúng tôi sẽ cập nhật hành động tạo để trông giống như sau:

```
def create
    @course_application = CourseApplication.new(course_application_params)
    if @course_application.save
      redirect_to @course_application, notice: 'Application submitted'
    else
      @course = Course.find(params[:course_id])
      render :new
    end
  end
```

## 7. ActionController::ParameterMissing

Lỗi này là một phần của việc triển khai thông số mạnh mẽ của Rails. Nó không hiển thị như là một lỗi 500 mặc dù-nó được giải cứu bởi ActionController :: Base và trả về như một yêu cầu 400 Bad.

Lỗi đầy đủ có thể trông giống như sau:

```
ActionController::ParameterMissing: param is missing or the value is empty: user
```

Controller có thể sẽ như sau:

```
class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to @user
    else
      render :new
    end
  end
  private
  def user_params
    params.require(:user).permit(:name, :email)
  end
end
```

Params.require (: user) có nghĩa là nếu user_params được gọi và params không có: user key hoặc params [: user] rỗng, ActionController :: ParameterMissing sẽ được nâng lên.

Nếu bạn đang xây dựng một ứng dụng được sử dụng thông qua giao diện web và bạn đã tạo một biểu mẫu để đăng chính xác thông số người dùng vào hành động này, thì thông số người dùng bị thiếu có thể có nghĩa là ai đó đang gây rối với ứng dụng của bạn. Nếu đúng như vậy, phản hồi 400 không phù hợp có thể là phản hồi tốt.



Trên đây là bài tổng hợp các lỗi thường gặp trong rails, mong nhận được ý kiến đóng góp từ mọi người.