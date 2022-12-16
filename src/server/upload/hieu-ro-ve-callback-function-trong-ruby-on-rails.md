## Giới thiệu về Callbacks
Callback là một phương thức của Active Record, nó sẽ được gọi tới vào một thời điểm nào đó trong vòng đời của một đối tượng.<br>
Callback thường được dùng để thực thi các phương thức logic trước hoặc sau khi đối tượng có một sự thay đổi nào đó.<br>
Ví dụ như create, update, delete.
## Cách định nghĩa callback function
Để có thể sử dụng các phương thức callbacks bạn cần phải khai báo chúng.<br>
Bạn có thể cài đặt phương thức callback như một phương thức bình thường:<br>
```ruby
class UsersController < ApplicationController
  before_destroy :find_user

  def destroy
    if @user.destroy
      // Do somethings
    else
      // Do somethings
    end
  end  

  private
  
  def find_user
    @user = User.find_by id: params[:id]
  end
end
```
Hoặc bạn có thể truyền một block vào:<br>
```ruby
class UsersController < ApplicationController
  before_destroy do
    @user = User.find_by id: params[:id]
  end
  
  def destroy
    if @user.destroy
      // Do somethings
    else
      // Do somethings
    end
  end
end
```
Callbacks có thể được thiết lập để chỉ chạy trên một số hoạt động nhất định của vòng đời:<br>
```ruby
class UsersController < ApplicationController
  before_validation :normalize_name, on: :create

  def update
    if @user.create user_params
      // Do somethings
    else
      // Do somethings
    end
  end

  private
  
  def normalize_name
    // Do somethings
  end
end
```
Khi sử dụng ta có thể nhóm các action dùng chung một phương thức truyền vào cùng một hàm callback bằng `before_action`, `after_action`, `around_action`, như ví dụ dưới đây: <br>
```ruby
class UsersController < ApplicationController
  before_action :find_user, only: [:update, :destroy]
  
  def update
    if @user.update_attributes user_params
      // Do somethings
    else
      // Do somethings
    end
  end

  def destroy
    if @user.destroy
      // Do somethings
    else
      // Do somethings
    end
  end
  
  private
  
  def find_user
    @user = User.find_by id: params[:id]
  end
end
```
Chúng ta có thể viết theo 2 cách sau: <br>
```ruby
before_action :find_user, only: [:update, :destroy]
// hoặc
before_action :find_user, only: %i(update, destroy)
```
Khi có thêm action create không cần find user thì ta dùng từ khóa **except**
```ruby
before_action :find_user, except: :create
```
Nên khai báo các phương thức callback là **private** hoặc **protected** để tránh việc chúng có thể bị gọi từ bên ngoài.
## Cơ chế hoạt động của callback trong Rails
Tiếp theo, chúng ta sẽ cùng xem xét kĩ càng hơn trong source code của Rails để hiểu cặn kẽ về Callback.<br>
Các phương thức callback trong Active Record không tự ngẫu nhiên mà có. ActiveSupport là một module trong Rails cung cấp các công cụ cần thiết nhất cho phép các module khác sau khi include ActiveSupport có thể tạo callback riêng cho nó.<br>
Trong ActiveSupport khai báo 3 phương thức quan trọng và là cốt lõi nhất cho phép tạo nên một callback đó là:<br>
1. **define_callbacks** : Định nghĩa ra các sự kiện trong một chu kì hoạt động của đối tượng sẽ được hỗ trợ callback, vdu như save, destroy, update, ... là các sự kiện khá phổ biến, với define_callback ta có thể tự custom một callback cho riêng mình.
2. **set_callback**: Thiết lập các instance method hoặc proc, ... để sẵn sàng được gọi lại, có thể hiểu là install các phương thức đã khai báo trước đó và sẵn sàng đợi cho đến khi được callback.
3. **run_callback**: Chạy các phương thức đã được install trước đó bởi set_callback vào một thời điểm thích hợp.

Có 3 loại callback được hỗ trợ đó là **before, after** và **around**.<br>
* **before callback** chạy trước một sự kiện
* **after callback** chạy sau khi sự kiện xảy ra
* **around callback** chạy cả trước và sau khi sự kiện xảy ra.
###  ActiveRecord dùng ActiveSupport để tạo Callback như thế nào?
Ta đã biết được công cụ cho phép các module khác tạo ra Callback đó là ActiveSupport, hãy cùng xem xét cụ thể hơn nữa các Callback của active record được tạo ra như thế nào?<br>
Đầu tiên, xem xét [ActiveRecord::Callbacks module](https://github.com/rails/rails/blob/505e84599aff6abf719484636b0515e1ce2e2220/activerecord/lib/active_record/callbacks.rb#L235):<br>
```ruby
module Callbacks
    extend ActiveSupport::Concern

    CALLBACKS = [
      :after_initialize, :after_find, :after_touch, :before_validation, :after_validation,
      :before_save, :around_save, :after_save, :before_create, :around_create,
      :after_create, :before_update, :around_update, :after_update,
      :before_destroy, :around_destroy, :after_destroy, :after_commit, :after_rollback
    ]

    included do
      extend ActiveModel::Callbacks
      include ActiveModel::Validations::Callbacks

      define_model_callbacks :initialize, :find, :touch, :only => :after
      define_model_callbacks :save, :create, :update, :destroy
    end

    def destroy #:nodoc:
      run_callbacks(:destroy) { super }
    end

    def touch(*) #:nodoc:
      run_callbacks(:touch) { super }
    end

  private

    def create_or_update #:nodoc:
      run_callbacks(:save) { super }
    end

    def create #:nodoc:
      run_callbacks(:create) { super }
    end

    def update(*) #:nodoc:
      run_callbacks(:update) { super }
    end
  end
end
```
Có thể thấy phương thức `define_model_callbacks` truyền vào các tham số `:initialize`, `:find`, `:touch`, `:save`, `:create`, `:update`, `:destroy` đây có vẻ là nơi các callback được tạo ra. <br>
Khi khai báo các phương thức `create`, `update`, `destroy`, ... mỗi phương thức đều gọi đến `run_callback` có nghĩa là mỗi khi các phương thức này được kích hoạt thì nó sẽ gọi đến callback trước, chạy xong callback mới chạy đến các lệnh bên trong. <br>
Tiếp theo, xem xét kĩ hơn một chút bên trong `define_model_callbacks` có gì:<br>
```ruby
def define_model_callbacks(*callbacks)
      options = callbacks.extract_options!
      options = {
         :terminator => "result == false",
         :scope => [:kind, :name],
         :only => [:before, :around, :after]
      }.merge(options)

      types   = Array.wrap(options.delete(:only))

      callbacks.each do |callback|
        define_callbacks(callback, options)

        types.each do |type|
          send("_define_#{type}_model_callback", self, callback)
        end
      end
    end

    def _define_before_model_callback(klass, callback) #:nodoc:
      klass.class_eval <<-CALLBACK, __FILE__, __LINE__ + 1
        def self.before_#{callback}(*args, &block)
          set_callback(:#{callback}, :before, *args, &block)
        end
      CALLBACK
    end

    def _define_around_model_callback(klass, callback) #:nodoc:
      klass.class_eval <<-CALLBACK, __FILE__, __LINE__ + 1
        def self.around_#{callback}(*args, &block)
          set_callback(:#{callback}, :around, *args, &block)
        end
      CALLBACK
    end

    def _define_after_model_callback(klass, callback) #:nodoc:
      klass.class_eval <<-CALLBACK, __FILE__, __LINE__ + 1
        def self.after_#{callback}(*args, &block)
          options = args.extract_options!
          options[:prepend] = true
          options[:if] = Array.wrap(options[:if]) << "!halted && value != false"
          set_callback(:#{callback}, :after, *(args << options), &block)
        end
      CALLBACK
    end
  end
end
```
Ta hãy chú ý đến <br>
```ruby
callbacks.each do |callback|
  define_callbacks(callback, options)

  types.each do |type|
    send("_define_#{type}_model_callback", self, callback)
  end
end
```
**Callbacks** ở đây là một mảng các phương thức được truyển vào hàm `define_model_callbacks`, cụ thể là `initialize`, `find`, `touch`, `save`, `create`, `update`, `destroy`<br>
Tại đây `define_callback` sẽ lần lượt định nghĩa từng phương thức này sẽ là những phương thức được hỗ trợ callback. Hàm callback mà ta vẫn thường sử dụng được tạo ra bởi `send("_define_#{type}_model_callback", self, callback)`, type bao gồm `before`, `after` và `around`.<br>
Lấy vị dụ với **save**, sau khi được define bởi hàm `define_callback`, sẽ có 3 phương thức tương ứng với 3 types được tạo ra cho save
```ruby
def _define_before_model_callback(klass, callback) #:nodoc:
  klass.class_eval <<-CALLBACK, __FILE__, __LINE__ + 1
    def self.before_#{callback}(*args, &block)
      set_callback(:#{callback}, :before, *args, &block)
    end
  CALLBACK
end

def _define_around_model_callback(klass, callback) #:nodoc:
  klass.class_eval <<-CALLBACK, __FILE__, __LINE__ + 1
    def self.around_#{callback}(*args, &block)
      set_callback(:#{callback}, :around, *args, &block)
    end
  CALLBACK
end

def _define_after_model_callback(klass, callback) #:nodoc:
  klass.class_eval <<-CALLBACK, __FILE__, __LINE__ + 1
    def self.after_#{callback}(*args, &block)
      options = args.extract_options!
      options[:prepend] = true
      options[:if] = Array.wrap(options[:if]) << "!halted && value != false"
      set_callback(:#{callback}, :after, *(args << options), &block)
    end
  CALLBACK
end
```
Lần lượt 3 hàm trên sẽ tạo ra 3 phương thức `before_save`, `around_save` và `after_save`, để ý bên trong mỗi hàm trên còn có gọi đến `set_callback`, điều này có nghĩa là **phương thức bạn truyền vào** `before_save`, `around_save`và `after_save` chính là truyền vào cho hàm `set_callback` này.<br>
Trên đây là toàn bộ vòng đời của một callback, được tạo ra như thế nào, thiết lập các phương thức ra sao, khi nào thì chạy.
## Các hàm callback được Rails hỗ trợ trong ActiveRecord
Danh sách các Callback của Active Record, được sắp xếp theo **thứ tự được gọi đến** trong các thao tác thay đổi dữ liệu của một đối tượng
### Tạo
* before_validation
* after_validation
* before_save
* around_save
* before_create
* around_create
* after_create
* after_save
* after_commit/after_rollback
### Cập nhật
* before_validation
* after_validation
* before_save
* around_save
* before_update
* around_update
* after_update
* after_save
* after_commit/after_rollback
### Xóa
* before_destroy
* around_destroy
* after_destroy
* after_commit/after_rollback<br>

Ngoài ra, còn có các hàm callback sau: <br>
* **after_initialize** được gọi mỗi khi có một Active Record Object được tạo ra, bất kể là tạo mới với new hay chỉ là một bản ghi được load từ database<br> 
* **after_find** được gọi mỗi khi Active Record load một bản ghi từ cơ sở dữ liệu. After_find được gọi trước after_initialize nếu cả 2 đều được định nghĩa<br> 
* **after_commit/after_rollback** là 2 callbacks được kích hoạt bởi sự hoàn thành của một giao tác đối với database. Chúng sẽ không thực hiện cho tới khi những thay đổi trong database được commit hoặc rollback

Khi khai báo các callback cho model chúng sẽ được đưa vào hàng chờ để thực hiện. Hàng chờ này bao gồm tất cả model validation, các phương thức callbacks đã được khai báo, và các thao tác với database. Chuỗi thực hiện các callbacks được coi như là một giao tác (transaction). Nếu bất kỳ một before_callback nào trả về false hoặc đưa ra exception, hoặc một after_callback đưa ra exception, chuỗi callbacks sẽ dừng lại và tiến hành ROLLBACK
## Running Callbacks
Các phương thức mà callback được kích hoạt chạy: <br>
* create
* create!
* destroy
* destroy!
* destroy_all
* save
* save!
* save(validate: false)
* toggle!
* touch
* update_attribute
* update
* update!
* valid?

**after_find** được kích hoạt chạy khi sử dụng các phương thức tìm kiếm: <br>
* all
* first
* find
* find_by
* find_by_*
* find_by_*!
* find_by_sql

**after_initialize** được kích hoạt tại mọi thời điểm khi một đối tượng của class được khởi tạo. <br>
**find_by_*** and **find_by_!** phương thức là công cụ tìm kiếm động được tạo tự động cho mọi thuộc tính.

## Skipping Callbacks
Khi sử dụng các phương pháp sau sẽ bỏ qua callbacks:
* decrement
* decrement_counter
* delete
* delete_all
* increment
* increment_counter
* toggle
* update_column
* update_columns
* update_all
* update_counters

Tuy nhiên, Chúng ta nên thận trọng khi sử dụng những phương thức này vì các quy tắc nghiệp vụ quan trọng và logic ứng dụng có thể được giữ trong các cuộc gọi lại. Bằng cách chuyển chúng mà không hiểu các hàm ý tiềm năng có thể dẫn đến dữ liệu không hợp lệ.<br>
Ngoài ra, chúng ta có thể thiết đặt skipping callback khi khai báo hàm callback <br>
**Ví dụ:** Chúng ta không gửi notification cho khách hàng với transaction này <br>
```ruby
class Transaction < ActiveRecord::Base
  belongs_to :user
  after_create :create_notification

  private 

  def create_notification
    Notification.create! transaction: self, recipients: user
  end
end
```
#### Sử dụng ActiveRecord::Base.suppress <br>
```ruby
module Chargable
  def charge(user)
    Notification.suppress do
      # Copy logic that creates new transactions that we do not want triggering Notifications
    end
  end
end
```
#### Sử dụng ActiveRecord::Base.skip_callback <br>
```ruby
class CashTransaction < Transaction
  skip_callback :create, :after, :create_notification
end
```
## Callbacks có điều kiện
Đôi khi không phải lúc nào ta cũng muốn sử dụng callbacks mà tùy vào từng trường hợp. Ta có thể sử dụng `:if` và `:unless` cùng với symbol, Proc và Array.
### Sử dụng `:if` và `:unless` với Symbol
```ruby
class Order < ApplicationRecord
  before_save :normalize_card_number, if: :paid_with_card?
end
```
Trước khi save sẽ gọi callback normalize_card_number nếu paid_with_card? trả về true

### Sử dụng `:if` và `:unless` với Proc
Ngoài sử dụng symbol ta có thể sử dụng Proc với mục đích tương tự
```ruby
class Order < ApplicationRecord
  before_save :normalize_card_number,
    if: Proc.new { |order| order.paid_with_card? }
end
```
### Nhiều điều kiện cho Callbacks
Ta có thể dùng :if và unless cho cùng 1 callbacks:
```ruby
class Comment < ApplicationRecord
  after_create :send_email_to_author, if: :author_wants_emails?,
    unless: Proc.new { |comment| comment.article.ignore_comments? }
end
```
## Tổng kết
Trên đây, mình đã trình bày những gì đã tìm hiểu về callbacks function trong Rails. Bài viết đã trả lời các câu hỏi thế nào là callback? Callback dùng để làm gì? Có những loại callbacks nào? Cơ chế hoạt động của chúng? Cách sử dụng callback function? <br>
Cảm ơn các bạn đã dành thời gian đọc bài viết, rất mong nhận được những ý kiến đóng góp của mọi người để bài viết được hoàn thiện hơn :))
## Tham khảo
Một số [bài viết](https://viblo.asia/p/callback-trong-rails-hoat-dong-nhu-the-nao-maGK7WwLKj2) về callback trên Viblo <br>
https://guides.rubyonrails.org/active_record_callbacks.html
https://apidock.com/rails/ActiveRecord/Callbacks