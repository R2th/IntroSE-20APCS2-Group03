Hôm nay mình xin giới thiệu tới các bạn bài viết khá hay đăng trên website rollbar.com (https://rollbar.com/blog/top-10-ruby-on-rails-errors/). Bài viết có thống kê 10 lỗi thường gặp nhất trên các website sử dụng Ruby on Rails và các cách khắc phục, mình lược dịch và có chỉnh sửa lại nội dung cho ngắn gọn và dễ hiểu hơn.

Để tiện theo dõi, mình sẽ liệt kê 10 lỗi và giải thích chi tiết bên dưới. 10 lỗi đó bao gồm:

![](https://images.viblo.asia/bac9bdd1-04ec-4a81-bbf0-18ed42c3792a.png)

**1.ActionController::RoutingError**

Đây là lỗi được raise phổ biến nhất, có lẽ cũng không khó hiểu lắm. Lỗi này được raise khi user request tới 1 đường dẫn không có trên website của bạn. Mặc dù là 1 lỗi nhưng đa phần thì nó không liên quan tới website của chúng ta, hay nói cách khác nó thường không phải là lỗi. Vấn đề có thể do attacker dùng bot để dò lỗi trên hệ thống của chúng ta hoặc người dùng gõ vào url đường dẫn không chính xác.

Thông thường hệ thống chỉ có lỗi này khi chúng ta deploy code lên heroku hoặc 1 nền tảng nào đó không cho phép đọc file tĩnh, do đó file css hoặc js không load được, chúng ta nhận được lỗi như sau:

```
ActionController::RoutingError (No route matches [GET] "/assets/application-eff78fd93759795a7be3aa21209b0bd2.css")
```

Để sửa lỗi trên chúng ta thêm config vào file production.rb

```
Rails.application.configure do
  # other config
  config.public_file_server.enabled = true
end
```

**2. NoMethodError: undefined method '[]' for nil:NilClass**

Lỗi thứ 2 cũng trông khá quen thuộc với các lập trình viên đúng không? Có lẽ ít nhất chúng ta cũng đã gặp vài lần trong quá trình làm dự án. Lỗi này thường xảy ra khi chúng ta muốn gọi 1 key trong hash hoặc 1 thuôc tính của đối tượng, nhưng đối tượng lấy ra lại đang trả về nil, Giả sử chung ta có params như sau:

```
{ user: { address: { street: '123 Fake Street', town: 'Faketon', postcode: '12345' } } }
```

Chúng ta muốn lấy ra tên đường phố băng cách `params[:user][:address][:street]`, nhưng rất tiếc người dùng không nhập vào address nên `user[:address]` đã trả về nil rồi, chúng ta sẽ nhận được lỗi như trên.

Cách khắc phục các lỗi này, trước hết ta phải xác định được chúng ta có đối tượng trả về hay không, nếu dữ liệu trả về có thể bị rỗng (do trường address không bắt buộc nhập), chúng ta phải sử dụng 1 trong các cách sau

Với ruby 2.2.3 trở lên, hàm dig cho phép ta đào sâu vào hash và lấy ra giá trị, nếu không có sẽ trả về nil thay vì raise ra lỗi.

```
street = params.dig(:user, :address, :street)
```

Như vậy chúng ta nhận được tên đường là nil thay vì lỗi.
Ngoài ra, nếu chúng ta đang gọi ra các thuộc tính của object bằng dấu `.`,  chúng ta có thể sử dụng toán tử &. (có tác dụng tương đương hàm try trong ruby bản cũ) để tránh lỗi như sau:

```
 street = user.address.street #=>NoMethodError: undefined method street for nil:NilClass
 street = user&.address&.street #=> nil
 street = user.try(:address).try(:street) #=> nil
 ```
 
 Nếu đang sử dụng các phiên bản ruby cũ hơn, chung ta có thể thêm gem ruby_dig để dùng hàm dig.
 
 
 **3. ActionController::InvalidAuthenticityToken**
 
 Đây là một lỗi xảy ra do cơ chế bảo mật của Rails bị vi phạm. Rails sử dụng authen token để xác định các method gửi lên có bị làm giả không, do đó tránh được các cuộc tấn công CSRF.  Rails mặc định thêm hàm kiểm tra authen token trong application controller 
 
 ```
 class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
end
```

Nếu nhận được lỗi như trên nhiều khả năng user đã bị hacker tấn công lấy được phiên đăng nhập, nhưng rails đã chặn được các request giả mạo đó do token không khớp. Tuy nhiên có nhiều lý do khác khiến bạn có thể vô tình nhận được lỗi này.

- Ajax
- Ví dụ chúng ta gửi 1 request ajax từ client, chúng ta phải gửi kèm token theo request, nếu bạn đang gửi ajax bằng jquery, Rails đã xử lí phần này cho chúng ta rồi. Trong trường hợp bạn muốn tự làm, có thể làm như sau:

Thêm thẻ csrf token vào application layout

```
<%= csrf_meta_tags %>
```
Khi gửi request ajax, lấy token ra và gửi kèm theo header

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
- Webhooks/API
 Đôi khi chúng ta muốn gọi 1 request từ một hệ thống khác, lúc này chúng ta có thể tắt tính năng csrf token, tuy nhiên cần có cơ chế bảo mật và đưa các endpoint vào danh sách để đảm bảo request của chúng ta đến từ các nguồn tin cậy
 
 ```
 class ApiController < ApplicationController
  skip_before_action :verify_authenticity_token
end
 ```
 
 **4. Net::ReadTimeout**
 
 Lỗi này xảy ra khi ruby tốn nhiều thời gian để đọc dữ liệu từ socket hơn thời gian timeout.(mặc định là 60s). Có nhiều nguyên nhân dẫn tới lỗi này, tùy vào server và thiết kế hệ thống của bạn, chúng ta có thể lựa chọn cách nâng thời gian time out nếu server của bạn cần nhiều thời gian trả về dữ liệu hơn.
 
 
 **5. ActiveRecord::RecordNotUnique: PG::UniqueViolation**
 
 Lỗi này xảy ra đặc biệt với database Posgree SQL, nhưng active record sử dụng sqlite và my sql cũng có các lỗi tương tự. Lỗi này có nghĩa là 1 bản ghi được đánh index unique, và một bản ghi mới tạo ra đã vi phạm tính  duy nhất của bản ghi đó. Các bạn xem ví dụ sau
 
 Giả sự chúng ta tạo bảng User, và đánh index unique cho trường email
 
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
Nếu có người dùng tạo tài khoản với email đăng nhập trùng với email trong hệ thống, lỗi ActiveRecord::RecordNotUnique sẽ được thông báo.

Để tránh lỗi này ở tầng DB, chúng ta có thể viết validate ở model user thông báo cho người dùng email trùng với đã được đăng kí

```
class User < ApplicationRecord
  validates_uniqueness_of :email
end
```

Ngoài ra trong 1 số trường hợp, lỗi này xảy ra khi người dùng double click form dẫn đến việc submit và tạo nhiều bản ghi giống nhau cùng 1 lúc, do request xảy ra đồng thời nên có thể pass qua validate và chỉ bị chặn khi insert dữ liệu vào DB.
Để ngăn điều này chúng ta nên disable nút submit khi người dùng submit form, ví dụ:

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


**6. NoMethodError: undefined method 'id' for nil:NilClass**

Một lỗi NoMethodError nữa, tuy nhiên hơi khác 1 chút là lỗi này chỉ xảy ra khi lấy ra id của 1 object record.

Đây là 1 trường hợp thông thường có thể dẫn tới lỗi trên

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

Form view của chúng ta như sau

```
<%= form_for [@course, @course_application] do |ca| %>
  <%# rest of the form %>
<% end %>
```
Vấn đề là khi chúng ta gọi render :new từ method create, biến @course chưa được khởi tạo. Bới vậy chúng ta phải đảm bảo record luôn được tạo khi gọi render 1 template, đoạn code trên controller có thể sửa lại như sau;


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
  
  Bài viết cũng tương đối dài, các lỗi còn lại mình sẽ dịch lại trong bài tiếp theo, hy vọng bài viết sẽ giúp ích được cho các bạn trong quá trình làm việc :D.