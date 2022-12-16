# Callback trong Rails:
## 1. Mở đầu
Trước khi đến với Callback, chúng ta cần hiểu vòng đời của một đối tượng là gì ? Hmmm nếu ta thử xét vòng đời của một con mèo thì nó sẽ được sinh ra, lớn lên và mất đi thì 1 object trong Rails cũng như vậy. Vòng đời của một object trong Rails gồm (Thêm, sửa, xóa) và Rails đã tạo ra những điểm móc hay chính là các callback trong vòng đời của một đối tượng để ta có thể thao tác với đối tượng này.
### 1.1. Callback là gì : 
*  Callback là một phương thức của Active Record, được gọi vào 1 thời điểm nào đó trong vòng đời của đối tượng.
*  Được dùng để thực thi các phương thức logic trước hoặc sau khi đối tượng có một sự thay đổi nào đó.
Ví dụ : Ta mong muốn trường email của ta trong CSDL đều là chữ in thường nhưng đối với người dùng thì họ có thể nhập theo ý thích của họ (CHAObuoiSang@gmail.com). Vậy ta nên xử lý điều này như thế nào ?
=> Trước khi lưu vào CSDL ta cho tất cả các kí tự viết thường hết => Ta sử dụng Callback before_save.
## 2.Tạo Callback:
Vì bản chất thằng Callback này chỉ xoay quanh các sự kiện của đối tượng  (create, update, destroy) nên nó PHẢI được khai báo trong model của đối tượng đó.
Ví dụ : viết một phương thức thông thường rồi sử dụng macro-style để khai báo nó như một Callback
```
class User < ApplicationRecord
  validates :email, presence: true
 
  before_save :ensure_email_valid
 
  private
  
  def ensure_email_valid
     self.email.downcase!
  end
end
```
=> Qua đây, ta thấy trước khi ta lưu đối tượng User này vào CSDL thì thực hiện hàm *ensureemailvalid* ( biến email thành chữ thường hết ) để đảm bảo tính đúng đắn dữ liệu trước khi lưu vào CSDL.
## 3. Danh sách Callback:
Đây là danh sách các Callback của Active Record, được sắp xếp theo thứ tự gọi đến trong quá trình hoạt động của một đối tượng:
### 3.1 Thêm
* before_validation
* after_validation
* before_save
* around_save
* before_create
* around_create
* after_create
* after_save
* after_commit/after_rollback
### 3.2 Sửa
* before_validation
* after_validation
* before_save
* around_save
* before_update
* around_update
* after_update
* after_save
* after_commit/after_rollback
### 3.3 Xóa
* before_destroy
* around_destroy
* after_destroy
* after_commit/after_rollback
### 3.4 after_initialize và after_find
Có thể trong quá trình ta code, chúng ta lại hiếm khi để ý đến 2 ông này nhưng 2 ông này lại có vai trò vô cùng to lớn đó.
* Callback *afterinitialize* được gọi khi đối tượng được khởi tạo hoặc được load từ database.
* Callback *afterfind* được gọi khi Active Record load 1 record từ database.
* *afterfind* được gọi trước khi *afterinitialize* nếu cả 2 đều được định nghĩa
```
class User < ApplicationRecord
  after_initialize do |user|
    puts "You have initialized an object!"
  end
 
  after_find do |user|
    puts "You have found an object!"
  end
end
 
>> User.new
You have initialized an object!
=> #<User id: nil>
 
>> User.first
You have found an object!
You have initialized an object!
=> #<User id: 1>
```

=> Vậy tại sao tôi lại nói nó có vai trò to lớn, thì bạn thấy đó mỗi khi 1 đối tượn được khởi tạo thì thằng Callback *afterinitialize* luôn được gọi hoặc khi load 1 đối tượng từ trong CSDL thì Callback *afterfind* sau đó là Callback *afterinitialize* được gọi. Vì vậy mà 2 thằng callback này luôn được gọi mà đôi khi ta không hề biết, nắm rõ được điều này có thể các bạn sẽ tối ưu được code của mình hơn thì sao :> .
##  4. Chạy Callback
Đây là các method sẽ chạy callback:
* create
* create!
* destroy
* destroy!
* destroy_all
* save
* save!
* save(validate: false)
* toggle!
* update_attribute
* update
* update!
* valid?
*afterfind* sẽ được gọi khi các method find này được gọi:
* all
* first
* find
* find_by
* find_by_*
* find_by_*!
* find_by_sql
* last
*afterinitialize* sẽ được gọi bất cứ khi nào 1 đối tượng mới được khởi tạo
## 5. Bỏ qua Callbacks
Giống với validation, Bạn có thể bỏ qua callbacks bằng cách sử dụng các method sau:
* decrement
* decrement_counter
* delete
* delete_all
* increment
* increment_counter
* toggle
* touch
* update_column
* update_columns
* update_all
* update_counters
=> Lưu ý : Các method này nên được sử dụng thận trọng vì các validate dữ liệu hay các logic được lưu lại trong callback. Nên việc bỏ qua các callbacks này có thể dẫn đến dữ liệu không hợp lệ.
## 6.Callbacks có điều kiện
Trong lập trình thì có muôn vàn hoàn cảnh và đôi khi ta cần phải biết tối ưu hóa code của ta tránh việc dư thừa ( clean code).
Nên Rails cung cấp cho chúng ta các điều kiện có thể áp dụng với Callback:
### 6.1 Sử dụng *:if* và *:unless* với *Symbol*
```
class Order < ApplicationRecord
  before_save :normalize_card_number, if: :paid_with_card?
end
```
Trước khi save sẽ gọi callback *normalizecardnumber* nếu *paidwithcard?* trả về * true*
### 6.2 Sử dụng *:if* và *:unless* với *Proc*
```
class Order < ApplicationRecord
  before_save :normalize_card_number,
    if: Proc.new { |order| order.paid_with_card? }
end
```
### 6.3 Nhiều điều kiện cho Callbacks
```
class Comment < ApplicationRecord
  after_create :send_email_to_author, if: :author_wants_emails?,
    unless: Proc.new { |comment| comment.article.ignore_comments? }
end
```
=> *Callback* là một công cụ khá mạnh mà Rails cung cấp cho chúng ta, có thể khá khác biệt với các ngôn ngữ lập trình khác nhưng chúng ta không nên lạm dụng sử dụng nó.Chỉ sử dụng *callback* khi logic liên quan đến bản thân đối tượng. Điều này sẽ tránh việc đối tượng phải xử lý những vấn đề nằm ngoài phạm vi kiểm soát của chính nó. Hi vọng bài viết sẽ giúp bạn hiểu thêm về Callback và sử dụng nó một cách tối ưu.
## Nguồn tham khảo
http://guides.rubyonrails.org/active_record_callbacks.html