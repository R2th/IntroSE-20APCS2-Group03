Hôm nay mình sẽ tiếp tục series Rails Antipattern,  phần hôm nay mà chúng ta tìm hiểu là làm cách nào để refactor các block transaction lớn.

Các block transaction lớn thường không cần thiết, cho dù chúng nằm trong controller hay model, vì Active Record cung cấp transactions được xây dựng như một phần của việc lưu lại quá trình. Transactions tự động bao bọc toàn bộ quá trình lưu, bao gồm tất cả callbacks và validation. Bằng cách sử dụng transactions, bạn có thể giảm đáng kể độ phức tạp của code.

Sau đây là là một ví dụ một transaction quan trọng lấy ra bên trong một method trên một  Account model, đoạn code đặt một số giá trị và tạo một số liên kết với model khác ngay lần đầu tiên tạo account

``` ruby
class Account < ActiveRecord::Base
	def create_account!(account_params, user_params)
		transaction do
			account = Account.create!(account_params)
			first_user = User.new(user_params)
			first_user.admin = true
			first_user.save!
			self.users << first_user
			account.save!
			Mailer.deliver_confirmation(first_user)
			return account
		end
	end
end
```

Đoạn code này đóng gói tất cả chức năng trong một phương thức đó là `create_account!` trên model Account. Phương thức này sẽ chỉ sử dụng để tạo account và có chứa các chức năng sau: 

* Tạo user đầu tiên cho account
* Tạo quyền admin cho user
* Thêm user vào account
* Lưu account
* Gửi email xác nhận đến user

Tất cả các chức năng này đều nằm trong transaction nên nếu có bất kỳ lỗi nào xảy ra thì các hành động tiếp theo sẽ không được thực hiện và các thay đổi trong database được rollback lại về như cũ.

Thông thường, các dev tạo các phương thức create hoặc save trong một phương thức trên model khi họ chưa quen với Rails và không hiểu rõ về các chức năng validation và callback mà Active Record cung cấp. Tuy nhiên, bằng các sử dụng các chức năng có sẵn, bạn có thể xóa method `create_account!`.

Các callbacks và validations đươc xây dựng trong Active Record hoạt động theo một trật tự đã được thiết lập. Nếu có bất kỳ callbacks hay validations nào có lỗi khi chạy thì quá trình save của model sẽ dừng lại và transaction sẽ rollback.

Sau đây là thứ tự của các callbacks cho một lần gọi save(và save!) trên một bản ghi chưa được lưu trước đó

``` ruby
before_validation
before_validation :on => :create
after_validation
after_validation :on => :create
before_save
before_create
after_create
after_save
```

Callback này cung cấp tính linh hoạt lớn trong suốt vòng đời của Active Record. Ngoài ra, do chuỗi sự kiện này xảy ra trong transaction, nó giúp bạn tránh lập trình thủ công các transaction của riêng bạn. Với kiến thức vòng đời của callback trong tay, giờ đây bạn có thể cấu trúc lại đoạn transaction thủ công ở trên để phù hợp với các callback mà Active Record cung cấp.

### Check the controller

Mặc dù bạn sẽ chủ yếu thực hiện các thay đổi trên model ở đây, nhưng điều đó có lợi khi nhìn vào xem controller xem nó gọi phương thức `create_account!` để bạn có thể hiểu cách dùng phương thức này

``` ruby
class AccountsController < ApplicationController
	def create
		@account = Account.create_account!(params[:account], params[:user])
		redirect_to @account, :notice => "Your account was successfully created."
	rescue
		render :action => :new
	end
end
```

### Nested Attributes

Phương thức `create_account!` lấy tham số cho một account, và nó lấy tham số cho user đầu tiên cho tài khoản. Tuy nhiên, các phương thức save và create có sẵn chỉ cho phép 1 hash chứa các thuộc tính và giá trị được truyền vào. Bạn cần tạo ra setter trên model Account. Bạn có thể làm như vậy bằng cách sử dụng phương thức accepts_nested_attributes_for

``` ruby
accepts_nested_attributes_for :users
```

Bạn có thể sửa đổi form ở view để xây dựng các thuộc tính cho account. Bạn muốn đối tượng này chứa các thuộc tính của user admin, được lồng trong các thuộc tính của account. với key là `users_attributes`. Sau đó, bất kỳ phương thức create hoặc update  (Account#new, Account#create, Account#update_attributes) có thể gọi setter với một hash.

Sau đây là đoạn code ví dụ ở view:
``` ruby
<%= form_for(@account) do |form| -%>
	<%= form.label :name, 'Account name' %>
	<%= form.text_field :name %>
	<% fields_for :user, User.new do |user_form| -%>
		<%= user_form.label :name, 'User name' %>
		<%= user_form.text_field :name %>
		<%= user_form.label :email %>
		<%= user_form.text_field :email %>
		<%= user_form.label :password %>
		<%= user_form.password_field :password %>
	<% end %>
	<%= form.submit 'Create', :disable_with => 'Please wait...' %>
<% end %>
```

Trong đoạn code này, các trường cho user được lồng trong các trường của account. Khi form được gửi đến server, hash cho các trường của user sẽ nằm trong hash chứ các trường của account với key là `users_attributes`

Bạn vẫn cần set quyền admin cho user đầu tiên trước khi account được tạo ra và gửi mail xác nhận sau khi user được tạo ra. Bạn có thể thực hiện việc này bằng callback `before_create` và `after_create` trên model Account.

``` ruby
class Account < ActiveRecord::Base
	accepts_nested_attributes_for :users
	before_create :make_admin_user
	after_create :send_confirmation_email
	
	private
	def make_admin_user
		self.users.first.admin = true
	end
	
	def send_confirmation_email
		Mailer.confirmation(users.first).deliver
	end
end
```

Bây giờ bạn không còn phương thức `create_account` nữa. Thay vào đó, chức năng được thực hiện đơn giản bằng các gọi đến `Account#create` or `Account#save`, Cũng lưu ý bạn không cần tạo một transaction rõ ràng nữa vì tất cả hành động đều diễn ra trong transaction có sẵn. Chúng ta cùng đoạn code trong controller

``` ruby
class AccountsController < ApplicationController
	def create
		@account = Account.new params[:account]
		if @account.save
		flash[:notice] = "Your account was successfully created."
		redirect_to account_url(@account)
	else
		render :action => :new
	end
end
```

**Tài liệu tham khảo: cuốn Rails AntiPatterns: Best Practice Ruby on Rails Refactoring by Chad Pytel**