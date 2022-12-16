# Giới thiệu
Callbacks là một khái niệm không mới, nó khá quen thuộc và xuất hiện ở hầu hết các ngôn ngữ lập trình. Trong ngôn ngữ C++ ta biết đến callback qua khái niệm delegate (con trỏ hàm). Còn với một ứng dụng Rails, khi ta sử dụng các phương thức như là before_action, before_create,.... chính là đang sử dụng các hàm callbacks. Và trong bài viết này chúng ta sẽ đi tìm hiểu rõ hơn về callbacks trong ruby on rails. Trước tiên, chúng ta sẽ tìm hiểu về vòng đời phát triển của đối tượng.
# 1. Vòng đời phát triển của đối tượng.
![](https://images.viblo.asia/a91518bb-cbbf-4660-85fb-482526408604.jpg)

Trong quá trình hoạt động của ứng dụng Rails, đối tượng được tạo ra, có thể được update và destroy. Active Record trong Rails cung cấp cho chúng ta các "hooks" trong vòng đời phát triển của đối tượng để có thể điều khiển và kiểm soát dữ liệu của úng dụng. Callback cho phép chúng ta kích hoạt một logic nào đó trước hoặc sau khi đối tượng thay đổi trạng thái. Và chúng ta có thể định nghĩa như dưới đây.
# 2. Định nghĩa.
Callback là một phương thức của Active Record, nó sẽ được gọi tới vào một thời điểm nào đó trong vòng đời của một đối tượng. Cho phép ta thực thi các phương thức đã khai báo trước đó một cách tự động trước hoặc sau khi đối tượng được created, saved, updated, deleted, validated hoặc loaded từ database. Vậy khi nào thì ta nên dùng callback.
# 3. Khi nào cần sử dụng callbacks.
Xét ví dụ nhỏ sau: Giả sử trong UsersController cần sử lý action như show, edit, update, delete như sau :
```ruby
class UsersController < ApplicationController
  def show
    @user = User.find_by id: params[:id]
  end

  def edit
    @user = User.find_by id: params[:id]
  end

  def update
    @user = User.find_by id: params[:id]
    if @user.update_attributes update_params
     //code
    else
     //code
    end
  end

  def destroy
    @user = User.find_by id: params[:id]
    @user.destroy
    //code
  end
end
```
Như ta thấy, cả 4 action đều thực hiện một công việc khi bắt đầu action đó là tìm user trong bảng users bằng params[:id] được truyền vào. Thay vì việc trùng lại code như vậy, ta có thể xử lý tạo ra callbacks tìm user trước khi action. Như sau: 
```ruby
class UsersController < ApplicationController
  before_action :load_user, only: %i(show edit update destroy)

  def show; end

  def edit; end

  def update
    if @user.update_attributes update_params
      //code
    else
      //code
    end
  end

  def destroy
    @user.destroy
    //code
  end

  private

  def load_user
    @user = User.find_by id: params[:id]

    return if @user
    flash[:danger] = t ".error"
    redirect_to root_path
  end
end
```
Với đoạn code trên ta đã thực hiện một số thao tác:
* Khai báo phương thức load_user để tìm ra user và xử lý khi không tìm thấy user dựa vào param id được truyền vào.
* Dùng callbacks before_action gọi đến load_user đã được khai báo, và chỉ callback đối với 4 phương thức này.

So với code cũ có thể dài hơn nhưng nhìn rất gọn gàng và clean, chương trình cũng rất dễ để sửa đổi hoặc fix lỗi
# 4. Tạo và đăng kí callbacks.
Như ở ví dụ ở phần trên,trước tiên ta sẽ viết phương thức logic mà chúng ta cần xử lý như ở ví dụ trên :
```ruby
private

def load_user
  @user = User.find_by id: params[:id]

  return if @user
  flash[:danger] = t ".error"
  redirect_to root_path
end
```
Sau đó chúng ta đăng kí chúng: 
```ruby
 before_action :load_user, only: %i(show edit update destroy)
```
Hoặc ta có thể khai báo nhanh và ngắn gọn dưới dạng block  như sau :
```ruby
before_action do
  @user = User.find_by id: params[:id]

  return if @user
  flash[:danger] = t ".error"
  redirect_to root_path 
end
```
# 5. Danh sách các callbacks sẵn có
Dưới đây là danh sách với tất cả các callbacks của Active Record có sẵn, được liệt kê theo thứ tự mà chúng sẽ được gọi trong các hoạt động tương ứng:
## 5.1 Tạo đối tượng
1. before_validation
2. after_validation
3. before_save
4. around_save
5. before_create
6. around_create
7. after_create
8. after_save
9. after_commit/after_rollback
## 5.2 Cập nhật đối tượng
1. before_validation
2. after_validation
3. before_save
4. around_save
5. before_update
6. around_update
7. after_update
8. after_save
9. after_commit/after_rollback
## 5.3 Xóa đối tượng
1. before_destroy
2. around_destroy
3. after_destroy
4. after_commit/after_rollback

**Các callbacks after_save chạy sau khi create và update. Nếu chỉ muốn sau khi create ta có thể dùng after_create và sau khi update là after_update.**

**Các callbacks before_destroy nên được đặt trước dependent: :destroy associations  (hoặc sử dụng tùy chọn Prepend: true)  để đảm bảo chúng thực thi trước khi các bản  ghi phụ thuộc bị xóa.**

***Ngoài ra còn có một số callbacks khác như là:***
* after_initialize được gọi mỗi khi có một Active Record Object được tạo ra, bất kể là tạo mới với new hay chỉ là một bản ghi được load từ database
* after_find được gọi mỗi khi Active Record load một bản ghi từ cơ sở dữ liệu. After_find được gọi trước after_initialize nếu cả 2 đều được định nghĩa
* after_commit/after_rollback là 2 callbacks được kích hoạt bởi sự hoàn thành của một giao tác đối với database. Chúng sẽ không thực hiện cho tới khi những thay đổi trong database được commit hoặc rollback
# 6. Chạy callbacks.
### 6.1 Các phương thức sau đây kích hoạt chạy callbacks:
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

### 6.2 Callbacks after_find được kích hoạt bởi các phương thức tìm sau:
* all
* first
* find
* find_by
* find_by_*
* find_by_*!
* find_by_sql
* last

### 6.3 Callbacks after_initialize được kích hoạt mỗi khi một đối tượng mới của lớp được khởi tạo.
# 7 Bỏ qua callbacks
Giống như validation, ta có thể bỏ qua các callbacks bằng cách thự hiện môt trong những phương thức sau:
* decrement!
* decrement_counter
* delete
* delete_all
* increment!
* increment_counter
* update_column
* update_columns
* update_all
* update_counters

Hoặc đơn giản, nếu bạn muốn việc thực thi các xử lý trong callbacks chỉ áp dụng với một số action nhất định thì bạn có thể sử dụng từ khóa như only hoặc except như ta đã dùng ở ví dụ ban đầu.

Tuy nhiên việc sử dụng các callbacks này nên thận trong và xem xét thật kĩ. Việc bỏ qua các callbacks có thế dẫn đến dữ liệu không hợp lệ.
# 8. Callbacks có điều kiện.
Chúng ta có thể thiết lập gọi một callbacks nếu thỏa mãn điều kiện củ thể nào đó. Để làm được điều đó ta sẽ sử dụng 2 option là if và unless cùng với symbol, proc hoặc một mảng.
### 8.1 Sử dụng if hoặc unless cùng với symbol.
Ví dụ cụ thể:
```ruby
class UsersController < ApplicationRecord
  before_action :load_rate, if: :is_rated?
end
```
Trước khi action sẽ gọi callback load_rate nếu is_rated? trả về giá trị true. Hoặc ta có thể sử dụng unless ! :is_rated? thay vì sử dụng unless.

Ở đây có nghĩa là sẽ load ra rate nếu mà user này đã đánh giá.
### 8.2 Sử dụng if hoặc unless cùng với proc.
Tương tự ta có thẻ sử dụng điều kiện với proc:
```ruby
class UsersController < ApplicationRecord
  before_action :load_rate, if: Proc.new {is_rated?}
end
```
Cũng ý nghĩa tương tự như ví dụ trên
### 8.3 Callbacks nhiều điều kiện.
Ta có thể dùng nhiều điều kiện cho một callbacks, ví dụ:
```ruby
class UsersController < ApplicationRecord
  before_action :load_rate, if: Proc.new {is_rated?}, unless: Proc.new {is_author_topic?}
end
```
Ở callbacks before_action sẽ thực hiện load ra đánh giá nếu như người dùng này đã đánh giá, và người dùng này không phải là tác giả của bài viết này.
# 9. Tùy chỉnh Callbacks
Để có thể tùy chỉnh được callbacks, thì chùng ta cần phải hiểu được cơ chế hoạt động của callbacks thì mọi việc sẽ dễ dàng hơn nhiều.
### 9.1 ActiveSupport
Các phương thức callback trong Active Record được tạo ra nhờ vào sự hỗ trợ của ActiveSupport. 

ActiveSupport là một module trong Rails cung cấp các công cụ cần thiết nhất cho phép các module khác sau khi include ActiveSupport có thể tạo callback riêng cho nó.

Trong ActiveSupport khai báo 3 phương thức quan trọng và là cốt lõi nhất cho phép tạo nên một callback :
* define_callbacks : Định nghĩa ra các sự kiện trong một chu kì hoạt động của đối tượng sẽ được hỗ trợ callback, vdu như save, destroy, update, ... là các sự kiện khá phổ biến, với define_callback ta có thể tự custom một callback cho riêng mình.
* set_callback: Thiết lập các instance method hoặc proc, ... để sẵn sàng được gọi lại, có thể hiểu là install các phương thức đã khai báo trước đó và sẵn sàng đợi cho đến khi được callback.
* run_callback: Chạy các phương thức đã được install trước đó bởi set_callback vào một thời điểm thích hợp.

### 9.2 Cách ActiveRecord dùng ActiveSupport để tạo Callback
Đầu tiên, xem xét ActiveRecord::Callbacks module:
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
Có thể thấy phương thức define_model_callbacks truyền vào các tham số :initialize, :find, :touch, :save, :create, :update, :destroy đây là nơi các callback được tạo ra.

Khi khai báo các phương thức create, update, destroy, ... mỗi phương thức đều gọi đến run_callback có nghĩa là mỗi khi các phương thức này được kích hoạt thì nó sẽ gọi đến callback trước, chạy xong callback mới chạy đến các lệnh bên trong.

### 9.3 Tùy chỉnh callbacks
Để cho dễ hiểu hơn, ta sẽ đi vào một ví dụ cụ thể. Lấy luôn ví dụ về trang Viblo, khi một user chuyển bài viết từ Private draft sang trạng thái Public thì những user đang theo dõi user này sẽ nhận được thông báo về bài viết mới. Để tạo một callback trong model chúng ta phải extend module ActiveModel::Callbacks mà Rails cung cấp:
```ruby
class Post
  extend ActiveModel::Callbacks
  
  define_model_callbacks :publish, only: :before
  
  before_publish :notify_subscribed_users
  
  def publish
    run_callbacks :publish do
      puts "Make this post public"
    end
  end
  
  private
  def notify_subscribed_users
    ...
  end
end
```
ActiveModel::Callbacks cung cấp một số method để việc tạo callback trở nên rất dễ dàng:
* define_model_callbacks thực hiện luôn chức năng của hàm set_callback khi xác định thời điểm chạy callback bằng một tham số options. Trong trường hợp này là only: :before
* Khai báo method :publish và phạm vi đoạn code sẽ được xác định để chạy callback
* Khai báo method sẽ được callback. Trong trường hợp này notify_subscribed_users sẽ được chạy ngay bên dưới dòng code puts "Make this post public"

# Tổng kết
Như vậy chúng ta đã tìm hiểu xong về callbacks trong rails. Nó mang lại cho chúng ta rất nhiều lợi ích, nhưng chúng ta không nên quá lạm dụng nó.

Bài viết của mình đến đây là kết thúc. Hi vọng bài viết của mình có thể giúp bạn hiểu rõ hơn về callbacks và sử dụng nó một cách tối ưu. Bài viết cũng khó tránh khỏi những sai xót, mong mọi người thông cảm, và rất mong những ý kiến đóng góp của mọi người để bài viết được hoàn thiện hơn. Cảm ơn các bạn đã dành thời gian đọc bài viết của mình !!!
# Tài liệu tham khảo

https://guides.rubyonrails.org/active_record_callbacks.html

https://github.com/rails/rails/blob/master/activesupport/lib/active_support/callbacks.rb#L94