Nếu bạn nhận một dữ liệu người dùng nhập vào trong ứng dụng của bạn, bạn cần phải xác thực nó. Khi nghĩ về xác thực (validation) trong ứng dụng Ruby on Rails chúng ta thường nghĩ đến *model validation* đầu tiên. Vậy còn những mức độ xác thực dữ liệu khác thì sao? Liệu *model validation* có phải luôn là tối ưu? Tôi sẽ đưa ra nhanh 4 mức độ xác thực chính trong ứng dụng Rails và sẽ nói về các ưu điểm và nhược điểm của từng giải pháp qua ví dụ trên trường*email* của model *User*
# 1. Model level validation
Đây là cách tiếp cận thông thường trong một ứng dụng Rails. Chúng ta muốn chắc chắn rằng *email* sẽ luôn được hiển thị cho dữ liệu của *User*  nên ta có thể tạo xác thực như sau:
```
class User < ActiveRecord::Base
    validates :email, presence: true
end
```
Cách bảo vệ dữ liệu này đúng tuy nhiên hãy nhớ rằng vẫn có thể tạo dữ liệu *User* không có *email*. Khi gọi **User#save** hay **User#save!** sẽ không lưu lại dữ liệu không đúng. Tuy nhiên những phương thức sau thì có:
* decrement!
* decrement_counter
* increment!
* increment_counter
* toggle!
* touch
* update_all
* update_attribute
* update_column
* update_columns
* update_counters

Chúng ta nên cẩn thận khi sử dụng chúng, đặc biệt là những phương thức bắt đầu bằng **update_**. Còn với trường hợp đôi khi chúng ta không cần xác thực trường *email* thì sao? Chúng ta có thể dùng **:if** hoặc sử dụng *controller level validation*.
# 2. Controller level validation
Như đã nói ở trên, đôi khi chúng ta cần xác thực trường nào đó chỉ trong một số trường hợp nhất định. Khi đó sử dụng **:if** hay **:unless** là một lựa chọn tốt nhưng nó có thể sẽ làm phức tạp hóa và làm cho quá trình xác thực của chúng ta khó đọc và khó test hơn. *Controller level validation* là một giải pháp mở cho vấn đề này. Để sử dụng nó tôi khuyên bạn nên dùng *Form Object pattern* . Tuy nhiên, sử dụng *controller level validation* khó thực hiện hơn nhiều so với *model level validation*. *Form Object pattern* rất hữu dụng trong một ứng dụng lớn khi mà một *model* có nhiều xác thực (validations) được sử dụng theo tùy chọn hay bắt buộc.
# 3. Database level validation
Loại xác thực này là an toàn nhất khi mà không có cách nào để lưu dữ liệu không đúng nếu bạn xác thực trên cơ sở dữ liệu. Các loại xác thực thông dụng nhất là *presence* và *uniqueness* - cả hai đều rất tốt cho trường *email* của model *User*. Ta sẽ thêm chúng bằng cách tạo migration:
```
class AddValidationOnUserEmail < ActiveRecord::Migration
  def change
    change_column :users, :email, :string, null: false
    add_index :users, :email, unique: true
  end
end
```
Sau khi chạy **rake db:migrate** chúng ta có thể kiểm thử xác thực của chúng ta. Hãy thử sử dụng **update_column** (không gọi *model validations*) để lưu dữ liệu không có email:
```
user = User.find(user_id)
user.update_column(:email, nil) # => raises ActiveRecord::StatementInvalid: Mysql2::Error: Column 'email' cannot be null
```
Sẽ có lỗi sảy ra. Bây giờ chúng ta sẽ thử lưu dữ liệu User với email trùng lặp:
```
user = User.find(user_id)
user_2 = User.find(user_2_id)

user.update_column(:email, user_2.email) # => raises ActiveRecord::RecordNotUnique: Mysql2::Error: Duplicate entry
```
Hai cách xác thực là khác nhau. Trong khi *presence* có thể đưa vào khai báo trường, *uniqueness* cần phải tạo *proper index* trong cơ sở dữ liệu. Lỗi cũng sẽ sảy ra nếu bạn cố lưu một dữ liệu sai kiểu:
```
user = User.find(user_id)
user.update_column(:created_at, "string") # => raises ActiveRecord::StatementInvalid: Mysql2::Error: Incorrect datetime value
```
Như bạn có thể thấy, khai báo cẩn thận các trường dữ liệu và tạo các *proper indexes* là quan trọng không chỉ bởi lý do hiệu năng mà còn bởi lý do bảo mật.
# 4. Front-end validation
Đây là loại xác thực kém an toàn nhất. Bạn hoàn toàn có thể bỏ qua nó bằng cách tắt Javascript trong trình duyệt hay đưa ra một yêu cầu trực tiếp bằng mã lệnh.
Bạn nên luôn luôn bảo vệ dữ liệu bằng xác thực *back-end validations* trước nhất. Tuy nhiên sử dụng *front-end validation* là cách tốt nhất để nâng cao trải nghiệm của người dùng.
# Tham khảo
http://pdabrowski.com/blog/ruby-on-rails/four-levels-of-the-data-validation/