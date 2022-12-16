Ở bài viết trước chúng ta đã đi qua 3 lỗi hay gặp nhất ở các project Ruby on Rails, trong bài này chúng ta sẽ đi qua các lỗi hay gặp còn lại

# 4. Net::ReadTimeout

Lỗi Net::ReadTimeout được raise lên khi Ruby mất khoảng thời gian để đọc dữ liệu từ một socket lớn hơn giá trị read_timeout, thường default là 60s. Lỗi này có thể raise lên nếu bạn đang sử dụng Net::HTTP, open-uri hay HTTParty để tạo một HTTP request.

Lưu ý rằng, điều này không có nghĩa rằng errors sẽ tự bắn ra nếu bản thân request mất nhiều thời gian hơn giá trị read_timeout. Mà chỉ xảy ra ở một lần request cụ thể nào đó nếu time request lớn hơn read_timeout.

Có một cặp cách thức giúp chúng ta có thể tránh lỗi  Net::ReadTimeout:

- Bạn có thể set giá trị read_timeout riêng biệt trên client mà bạn đang sử dụng

Với Net::HTTP
```
http = Net::HTTP.new(host, port, read_timout: 10)
```

Với open-uri
```
open(url, read_timeout: 10)
```

Với HTTParty
```
HTTParty.get(url, read_timeout: 10)
```

Bạn không thể lúc nào cũng mong đợi một server khác sẽ trả về với timeout đúng mong đợi. Nếu bạn có thể chạy http request trong một background job với option retry, như sidekiq chẳng hạn, sẽ hạn chế được những lỗi từ server, bạn sẽ cần handler những trường hợp server trả về timeout.

- Nếu bạn đang  chạy HTTP request trên một action controller, bạn nên rescue exception cho lỗi  Net::ReadTimeout và trả về cho người dùng thông tin mà lỗi gặp phải:

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

# 5. ActiveRecord::RecordNotUnique: PG::UniqueViolation

Lỗi này đặc biệt hay xảy ra với database PostgreSQL, nhưng ActiveRecord cho Mysql và Sqlite cũng bắn ra lỗi tương tự. Vấn đề ở đây là một bảng trong database của bạn có một chỉ mục duy nhất ở trên một hay nhiều trường và một transaction được gửi đến database để ép index đó. 

Giả sử bạn có model là User và trong migration, chắc chắn rằng địa chỉ email của user là duy nhất:
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

Để tránh một instance raise lỗi ActiveRecord::RecordNotUnique bạn nên add validate unique đến user model của bạn:
```
class User < ApplicationRecord
  validates_uniqueness_of :email
end
```

Nếu không có validation này, tất cả điạ chỉ email sẽ được gửi đến database, khi lời gọi User#save và sex raise ra errors nếu chúng không duy nhất. Tuy nhiên, validation trên cũng không thể đảm bảo được điều đó sẽ không bao giờ xảy ra. Lời giải thích chi tiết hơn, các bạn có thể tham khảo tại: https://api.rubyonrails.org/classes/ActiveRecord/Validations/ClassMethods.html#method-i-validates_uniqueness_of

- Nếu lỗi xảy ra khi user submit form 2 lần liên tiếp, chúng ta có thể chèn một đoạn javascript nhằm disable nút submit khi user click phát đầu tiên:

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

- Hoặc sử dụng retry để bắt và xử lý exception cho nó:

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

# 6. NoMethodError: undefined method 'id' for nil:NilClass

NoMethodError lại xuất hiện, mặc dù lần này mang một ý nghĩa khác, lỗi này thỉnh thoảng xảy ra khi tạo một đối tượng với các quan hệ. Giả sử ta có một controller với những actions để tạo ứng dụng cho một khoá học:

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

với form template:
```
<%= form_for [@course, @course_application] do |ca| %>
  <%# rest of the form %>
<% end %>
```

Vấn đề ở đây là khi bạn gọi render new từ action create, biến instance @course không được set. Bạn cần chắc chắn rằng tất cả các đối tượng instance của template new cần được khởi tại trong action create, để fix lỗi này bạn cần update lại action create như sau:
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

# 7. ActionController::ParameterMissing

Lỗi này là một phần trong Rails strong parameters. Nó không manifest lỗi 500, thay vaò đó nó bị rescue bởi ActionController::Base và trả về lỗi 400 bad request:

```
ActionController::ParameterMissing: param is missing or the value is empty: user
```

Để giải thích vấn đề này, giả sử bạn có một controller:
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

params.require(:user) có nghĩa rằng nếu user_params được gọi và params không có key user hoặc params[:user] là rỗng, lỗi ActionController::ParameterMissing được raise ra.

Tham khảo:

https://rollbar.com/blog/top-10-ruby-on-rails-errors/