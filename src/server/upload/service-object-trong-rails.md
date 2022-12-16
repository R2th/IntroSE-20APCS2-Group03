Rails app được xây dựng trên mô hình MVC và dựa trên 3 nguyên tắc: 
* Không để **models** phình to 
* Không để logic phức tạp trong **views**
* Giữ **controllers** sạch sẽ<br>

Vậy câu hỏi đặt ra là khi mà ta phải xử lí những tác vụ quá nặng cần rất nhiều logic code và không liên kết với một **model** cụ thể nào thì ta nên viết thêm một **action**, viết thêm **controllers** khác hay đơn giản là thêm một vài **câu query**?<br>
Có một cách là sử dụng **Service Object** để xử bớt các logic từ đó giúp Rails app của chúng ta sạch sẽ, dễ maintain hơn.
### Service Object là gì?
Service Object có thể là một **class** hay một **module** có một **public method** thường được đặt tên là **call/perform**, được thiết kế để xử lí một task hay một bussiness logic.<br>
**Service Object là một class**
```ruby
class CloneUserService
  def initialize args
    @name = args[:user]
    @email = args[:email]
    @address = args[:address]
  end
    
  def call
    clone_user
  end
    
  private
    
  attr_reader :name, :email, :address
    
  def clone_user
    user = User.new(
      name: name,
      email: email,
      address: address
    )
    clone_user = user.dup
    clone_user.save
  end 
end
```
**Service Object là một module**:
```ruby
module SendMailService
  class << self
    def send_mail user, topic
      return if user.blank?
      Application::Mailer.send_topic_mail(user, topic).deliver_later
    end
  end
end
```
### Cách sử dụng service object
```ruby
class CloneUsersController < ApplicationController
  def create
    args = {name: params[:name], email: params[:email], address: params[:address]}
    @user_clone = CloneUserService.new(args).call
    if @user_clone.save
      flash[:success] = "Success"
    else
      flash[:fail] = "Fail"
      render :new
    end
  end
end
```
Như ta có thể thấy trong ```CloneUsersController``` trên đã xử dụng **Service Object** và ta thấy code khá là ngắn gọn và dễ hiểu. Còn nếu như không xử dụng Service Object thì controller đó sẽ trông như thể nào?
```ruby
class CloneUsersController < ApplicationController
  def create
    @user = User.new(
      name: name,
      email: email,
      address: address
    )
    @user_clone = @user.dup
      if @user_clone.save
        flash[:success] = "Success"
      else
        flash[:fail] = "Fail"
        render :new
     end
  end
end
```
### Nên viết những gì trong Service Object?
Phía trên chúng ta đã biết Service Object là gì và cách tạo và khai báo một Service Object. Vậy chúng ta nên để Service Objects làm những công việc gì?<br>
Sử dụng service objects là một cách rất hay để đóng gói những objects phức tạp, nhưng không nên lạm dụng mà áp dụng cho tất cả những methods có bussiness logic nặng. Một ví dụ điển hình là chuyển bớt vài trăm dòng code logic trong model vào trong một service object.<br>
Một service object sạch, đẹp, có hiệu quả là một object dễ dàng để test và tuân theo single responsibility principle.
Theo ** Amin Shah Gilani**:
> Does your code handle routing, params or do other controller-y things?
If so, don’t use a service object — your code belongs in the controller.<br>
Are you trying to share your code in different controllers?
In this case, don’t use a service object — use a concern.<br>
Is your code like a model that doesn’t need persistence?
If so, don’t use a service object. Use a non-ActiveRecord model instead.<br>
Is your code a specific business action? (e.g., “Take out the trash,” “Generate a PDF using this text,” or “Calculate the customs duty using these complicated rules”)
In this case, use a service object. That code probably doesn’t logically fit in either your controller or your model.

### Tổng kết
Qua bài viết này, tôi muốn chia sẻ với các bạn đôi điều về service objects: cách khai báo, sử dụng service objects và lúc nào chúng ta nên dùng service objects.<br>
*Good luck and hapy coding!*<br>
**Linh tham khảo**<br>
[https://medium.com/@scottdomes/service-objects-in-rails-75ca74214b77](https://medium.com/@scottdomes/service-objects-in-rails-75ca74214b77)<br>
[https://medium.freecodecamp.org/service-objects-explained-simply-for-ruby-on-rails-5-a8cc42a5441f](https://medium.freecodecamp.org/service-objects-explained-simply-for-ruby-on-rails-5-a8cc42a5441f)