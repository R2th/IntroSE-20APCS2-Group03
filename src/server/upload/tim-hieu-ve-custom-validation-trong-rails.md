Trong bài viết này, chúng ta sẽ tìm hiểu về các custom validations trong Active Record trong rais. Trước tiên mình xin giới thiệu qua về Active Record để chúng ta dễ hiểu hơn. 

ActiveRecord là một phần quan trọng của Rails, nó sẽ mapping các đối tượng Ruby tới các bảng trong cơ sở dữ liệu.  Active Record giao tiếp với database, nó đóng vai trò là phần M trong MVC của Rails: models- là nơi xử lý hầu hết các business logic trong ứng dụng của bạn.  Về cơ bản thì Active Record làm nhiệm vụ trừu tượng hóa việc thao thác với các bảng trong cơ sở dữ liệu. Nói các khác thì các lập trình viên sẽ không cần phải viết các câu truy vấn trực tiếp vào cơ sở dữ liệu nữa.

Giả sử chúng ta có một model Student với các thuộc tính là first_name và last_name. Để sử dụng Active Record, chúng ta chỉ cần kế thừa ApplicationRecord và khi chúng ta chạy rails db: migrate thì nó cung cấp cho chúng ta câu lệnh SQL để thao tác với bảng Student trong Database.
```
class Student < ApplicationRecord
end



# CREATE TABLE students (
#    id int(11) NOT NULL auto_increment,
#    first_name varchar(255),
#    last_name varchar(255),
#    PRIMARY KEY  (id)
# );
```
Để tương tác với cơ sở dữ liệu, chúng tôi sử dụng các phương thức được kế thừa từ  ApplicationRecord Superclass.
```
Student.all
#SELECT * FROM students

Student.create(first_name: "Ade", last_name: "Obi")
#INSERT INTO "students" ("first_name", "last_name", "created_at", "updated_at") VALUES ("Ade", "Obi", "2019-04-18 06:05:43.426106", "2019-04-18 06:05:43.426106") 

ade = Student.find(1)
#SELECT  "students".* FROM "students" WHERE "students"."id" = 1 LIMIT 1
```
# Validation
Vì chúng ta viết các ứng dụng web cho các người dùng khác, chúng ta không thể chắc chắn rằng người dùng sẽ luôn nhập dữ liệu hợp lệ vào cơ sở dữ liệu. Để thực thi điều này, Active Record cung cấp cho chúng ta một validation framework để đảm bảo sự hiện diện của dữ liệu, tính duy nhất của các trường nhất định,...

Hãy nhìn vào bảng Student của chúng ta ở ví dụ trên. Chúng ta hoàn toàn có thể tạo một người dùng mà không có last name hoặc first name. Để giảm thiểu điều này, chúng ta chỉ cần sửa class Student của mình như sau:
```
class Student < ApplicationRecord
  validates :first_name, presence: true
  validates :last_name, presence: true
end
```
Với sửa đổi này, khi bạn tạo một object student không có thuộc tính firstname hoặc lastname thì đó là một object không hợp lệ và active records sẽ không lưu nó vào cơ sở dữ liệu.

Active record cũng cung cấp cho chúng ta các phương pháp để kiểm tra xem dữ liệu của chúng ta có hợp lệ hay không:
```
s1 = Student.create(first_name: "David", last_name: "Mustapha")
s1.valid? 
# => true

s2 = Student.new
# <Student id: nil, first_name: nil, last_name: nil, created_at: nil, updated_at: nil>

s2.valid?
# => false
```
Ngoài việc chỉ ngăn chặn dữ liệu không hợp lệ, Active Record còn cung cấp một danh sách lỗi chứa các thuộc tính không hợp lệ và thông báo cho người dùng. Những lỗi này có thể được truy cập như sau:
```
s4 = Student.new
s4.valid? # => false
s4.errors
#<ActiveModel::Errors:0x00007fffea94a240 @base=#<Student id: nil, first_name: nil, last_name: nil, created_at: nil, updated_at: nil>, @messages={:first_name=>["can't be blank"], :last_name=>["can't be blank"]}, @details={:first_name=>[{:error=>:blank}], :last_name=>[{:error=>:blank}] :count=>2}]}>

s4.errors.messages
# => {:first_name=>["can't be blank"], :last_name=>["can't be blank"]}
 
s5 = Student.new(first_name: "David", last_name: "Mustapha")
s5.valid? # => true
s5.errors.messages # => {}
```
# Custom Validation
Đôi khi, chúng ta có thể muốn sử dụng một số validation nhất định không chỉ đảm bảo sự hiện diện của một thuộc tính, độ dài, tính duy nhất hoặc bất kỳ trợ giúp nào được cung cấp bởi Active Record. Active Record còn cho phép chúng ta tùy chỉnh các validation của riêng mình.

Ví dụ với bảng Student, chúng ta có một cột số đăng kí bắt buộc. Nó phải được điền từ form đăng ký  và sẽ luôn bắt đầu với năm đăng ký. Bây giờ, Active Record không cung cấp loại validate này.

Có hai cách để xác định logic validation của riêng bạn:

* Custom Validator
* Custom Methods

## Custom Validator
Để validate sử dụng custom validator, ta chỉ cần xác định validation logic của mình trong một lớp kế thừa ActiveModel :: Validator và thực hiện phương thức validate, lấy bản ghi để xác thực làm đối số.

Nếu validate fail, nó thêm thuộc tính vào mảng lỗi cùng với thông báo lỗi. Vì vậy, trong trường hợp của chúng ta, ta sẽ có RegNumValidator như sau:
```
class RegNumValidator < ActiveModel::Validator
  def validate(record)
    unless record.reg_num.starts_with? record.reg_year
      record.errors[:reg_num] << 'Registration number must begin with Registration year'
    end
  end
end
```
Để sử dụng validator hợp lệ này trong model Student, chúng ta sử dụng phương thức validates_with:
```
class Student
  include ActiveModel::Validations
  validates_with RegNumValidator
end
```
Vậy, khi người dùng cố gắng tạo một sinh viên với số đăng ký sai, việc tạo bản ghi không thành công và thông báo lỗi có thể được hiển thị.
```
s6 = Student.new(first_name: "David", last_name: "Mustapha", reg_year: 2019, reg_num: "2016DAVM")
s6.valid? # => false
s6.errors.messages
# => {:reg_num=>["Registration number must start with registration date"]}
 
s7 = Student.new(first_name: "David", last_name: "Mustapha", reg_year: 2019, reg_num: "2019DAVM")
s7.valid? # => true
s7.errors.messages # => {}
```
## Custom Methods
Để sử dụng custom method cho validation, bạn chỉ cần xác định một phương thức để sử dụng cho validation trong class model của bạn và gọi nó như gọi bất kì validation thông thường. Sử dụng logic giống như những gì chúng ta đã có ở trên, model của chúng ta sẽ trông như thế này:
```
class Student < ApplicationRecord
  validate :reg_num_validator
 
  def reg_num_validator
    if reg_num.starts_with? reg_year
      errors.add("Registration number must start with #{reg_year}")
    end
  end
end
```
# Kết luận
Mình hy vọng bài viết này đã cung cấp cho bạn kiến thức cần thiết để bắt đầu với validation Active Records và cách custom validation theo logic của bạn cho phù hợp.
#  Tài liệu tham khảo:
https://medium.freecodecamp.org/a-quick-look-at-rails-custom-validation-9ab7e0f1af81