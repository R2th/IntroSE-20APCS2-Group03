# I. Giới thiệu
Dựa trên cuốn sánh "**Design Patterns: Elements of Reusable Object-Oriented Software**" của bộ tứ tác giả **Erich Gamma**, **Richard Helm**, **Ralph Johnson** và **John Vlissides** (GoF) Facade được tổng quát như sau:
* **Facade design pattern** là 1 pattern thuộc nhóm structural design patterns, với kiểu thiết kế này chúng ta cung cấp một giao diện thống nhất bao gồm các tập hệ thống con. 
* Nhờ việc định nghĩa interface ở level cao hơn điều đó làm cho các hệ thống con dễ dàng sử dụng.

Nghe có vẻ hơi khó hiểu nhưng chúng ta sẽ cùng tìm hiểu và hiểu về nó qua một ví dụ nhỏ dựa trên ứng dụng Ruby on Rails sau nhé.

# II. Vấn đề 
Rails framework được xây dựng dựa trên mô hình MVC, vậy hãy cùng review lại kiến thức trên ghế nhà trường một chút nhé. View sẽ chịu trách nhiệm biểu diễn data, Model thao tác với database và xử lý các nghiệp vụ logic và cuối cùng Controller điều hướng hay nói cách khác là nó là một sợi dây để kết nối mọi thứ với nhau, đối với mình mà nói thì controller khá là stupid nhưng lại rất quang trọng :D.

Vậy vấn đề mình muốn đề cập đến ở đây là gì? Trong các ứng dụng thực tế chúng ta có thể thấy hoặc đã gặp không hề ít trường hợp là controllers phải xử lý rất nhiều logic để chuẩn bị các biến instance cho views. Để khắc phục điều này chúng ta có thể viết các services để thực thi các hành động hay thậm chí có thể sử dụng presenters để tái cấu trúc data/model một cách đơn giản và trực quan nhất trước khi gửi đến cho views nhưng điều đó có vẻ như là chưa đủ. 
```
class UsersController < ApplicationController
  def index
    @user = User.new
    @last_active_users = User.active.order(created_at: :desc).limit(10)
    @vip_users_presenter = VipUsersPresenter.new(User.active.vip)
    @messages = current_user.messages
  end
end
```
Đoạn code trên cho thấy theo thời gian controller sẽ ngày càng phình to và chưa rất nhiều biến instances điều này sẽ khiến các developer khó kiểm soát, khó maintain về sau do sự rườm rà của các action và chứa nhiều thông tin không cần thiết khi trong khi đó nhiệm vụ chính của controller là điều hướng như đã mình đã nói ở trên. 

# III. Giải pháp
Bây giờ chúng ta áp dụng Facade design pattern để giải quyết vần đề trên bằng cách chuyển phần việc preparing data cho view vào một class ngoài controller được gọi là **unified face**.

Chúng ta sẽ tạo một thư mục facades bên trong foler app để chứa các file trên.

```
# app/facades/users_facade.rb

class UsersFacade
  attr_reader :current_user, :vip_presenter

  def initialize(current_user, vip_presenter=VipUsersPresenter)
    @current_user = current_user
    @vip_presenter = vip_presenter
  end

  def new_user
    User.new
  end

  def last_active_users
    @last_active_users ||= active_users.order(created_at: :desc).limit(10)
  end

  def vip_users
    @vip_users ||= vip_presenter.new(active_users.vip).users
  end

  def messages
    @messages ||= current_user.messages
  end

  private
  def active_users
    User.active
  end
end
```
Đến đây mình sẽ review lại ứng dụng 1 tí nhé:
1. Các biến instance ở action index controller đã được chuyển vào class UsersFacade 
2. Khi views gọi đến những data tương tự thì nó đã được caching
3. Đã có sự refactor cho ứng dụng và cơ chế phụ thuộc của VipUsersPresenter  

Controller sẽ được edit lại một cách đơn giản và trực quan hơn trước rất nhiều.
```

class UsersController < ApplicationController
  def index
    @user_facade = UsersFacade.new(current_user)
  end
end
```
Khi cần lấy dữ liệu views sẽ dùng user_facade đề gọi các methods tương ứng.
```
<%= render @user_facade.last_active_users %>
<%= render @user_facade.messages %>
<%= render 'users/form', user: @user_facade.new_user %>
<%= render @user_facade.vip_users %>
```

# IV. Tổng kết
**Facade pattern** là một trong những phương pháp cho phép refactor hay nó cách khác là đơn giản hóa controllers. Đặc biệt trong các ứng dụng lớn và có độ phức tạp thì điều này thực sự cần thiết và cần áp dụng ngay ở những giai đoạn đầu của dự án. Bằng cách đóng gói các dự liệu có cùng tính chất vào cùng một class cho phép người đọc dễ dàng đọc hiểu code một cách trực quan nhất từ đó dễ dàng phát triển và thay đổi mà tránh gây ảnh hưởng những logic khác.

Bên cạnh những ưu điểm tuyệt vời trên thì nó cũng tồn tại một số nhược điểm. Việc áp dụng facade trong ứng dụng nghĩa là bạn sẽ tạo một abstraction layer, vì thế không nên sử dụng duy nhất một facade và đưa tất cả các khởi tạo từ controller vào class này. Nếu như facade quá lớn nó sẽ mất đi tính reusable và bạn sẽ chỉ có thể áp dụng facade đó cho một controller xác định.

Có thể thấy bất kì design pattern đều có những ưu nhược điểm nhất định, để có thể áp dụng những lợi thế và hạn chế nhược điểm chúng ta cần phải liên tục học hỏi và không ngừng thực hành, từ đó rút ra những kinh nghiệm và tìm ra những phương pháp tối ưu nhất để ứng dụng vào project của mình. 

Trên đây mình đã chia sẻ về Facade design pattern một trong những pattern thuộc nhóm cấu trúc, mặc dù có nhiều thiếu sót nhưng rất mong có sự góp ý và hi vọng phần nào giúp mọi người hiểu thêm về một design pattern hữu ích. 



# V. Tài liệu tham khảo
* [Facade design pattern in Ruby on Rails](https://medium.com/kkempin/facade-design-pattern-in-ruby-on-rails-710aa88326f)