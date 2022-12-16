# 1. Validations Overview:
- Dưới đây là 1 ví dụ đơn giản về validation
- Khởi tạo model `User` với 1 attribute `name`.
    ```ruby
    rails g model User name:string
    ```
- Thêm validation cho attribute `name` của `User`.
    ```ruby
    class User < ApplicationRecord
      validates :name, presence: true
    end
    ```
- Khởi tạo user với các giá trị khác nhau (không có name, name là "" và name là "John Dove") và kiểm tra các user này có hợp lệ hay không.
    ```ruby
    User.create.valid?                    # false
    User.create(name: "").valid?          # false
    User.create(name: "John Dove").valid? # true
    ```
- User thứ 1 và user thứ 2 không hợp lệ và không được insert vào trong database.
- Chỉ có user thứ 3 là hợp lệ và được insert vào database.
- Ta có thể thấy validation cho phép chúng ta biết được user nào hợp lệ, được lưu vào databse và user nào không hợp lệ.

## 1.1 Why use Validations?
- Validation được sử dụng để chắc chắn rằng chỉ có data hợp lệ là được lưu vào trong database.
- Ví dụ app của bạn cần chắc chắn rằng mỗi user cung cấp 1 địa chỉ email hợp lệ.
- Model-level validation là cách tốt nhất để chắc chắn chỉ có data hợp lệ là được lưu vào database.
- Mọi data để được lưu vào database đều phải thông qua model, không thể bị bỏ qua bởi end-user và dễ để test và maintain.
- Rails cung cấp sẵn 1 số built-in helper method với các validation thường xuyên được sử dụng và cho phép tạo ra các custom helper method của bạn để dùng cho validation.
- Trên thực tế có nhiều cách để validate data trước khi lưu vào database, bao gồm database constraints, client-side validation và controller-level validations.
- Dưới đây là 1 số ưu và nhược điểm của từng cách validation:

### a. Database constraint, stored procedures:
- Database constraint, stored procedures làm cho validation phụ thuộc vào database và khó để test và maintain hơn. 
- Tuy nhiên nếu databse đượcb sử dụng cho nhiều app khác nhau thì database-level validation có thể là 1 ý kiến tốt.

### b. Client-side validation:
- Client-side validation có thể có ích nhưng khó có thể tin tưởng được nếu được sử dụng đơn độc.
- Khi bạn implement client-side validation bằng JavaScript, user có thể tắt JavaScript trên trình duyệt, bỏ qua client-site validation và insert data không hợp lệ vào database.
- Tuy nhiên nếu client-side validation được sử dụng đi kèm với các kĩ thuật khác thì client-side validation là 1 cách thuận tiện để phản hồi lỗi validation ngay lập tức cho user mà không cần submit form và chờ server trả lỗi validation về.

### c. Controller-level validation:
- Controller-level validation sẽ làm cho controller của bạn ngày càng nở rộng và khó để test và maintain.

## 1.2 When Does Validation Happen?
- Có 2 loại Active Record object: loại thứ nhất sẽ tương ứng với 1 record đã được lưu vào trong database và loại thứ 2 thì chưa được lưu vào trong database.
- Khi bạn khởi tạo 1 object mới, ví dụ khi gọi `new` method, object được tạo ra chưa được lưu vào database (loại Active Record object thứ 2).
- Khi gọi `save` method thì tùy thuộc vào object mà nó sẽ được lưu vào database (object hợp lệ) hoặc không (object không hợp lệ).
- Active Record cung cấp 2 hàm: `new_record?` để xác định object có phải object mới, chưa lưu vào database hay không và `persisted?` để xác định object có phải đã được lưu vào database hay không.
- Ví dụ như sau:
    ```ruby
    user = User.new(name: "John Doe")
    user.new_record? # true
    user.save
    user.persisted?  # true
    ```
- Khởi tạo và lưu 1 record mới thì Active Record sẽ tạo ra 1 câu lệnh `SQL INSERT` vào database.
- Update 1 record đã tồn tại thì Active Record sẽ tạo ra 1 câu lệnh `SQL UPDATE` vào database.
- Nếu record không hợp lệ (validation fail) thì obejct sẽ bị đánh dấu là không hợp lệ và Active Record sẽ không tạo ra câu lệnh `SQL INSERT` hay `SQL UPDATE`.
- Điều này giúp tránh được việc lưu data không hợp lệ vào database.
- Ta có thể chọn validation riêng biệt cho từng thao tác tạo object mới hoặc update object đã có sẵn.
- Rails cung cấp nhiều hàm để thay đổi  trạng thái (update attributes) của 1 object trong database.
- Trong đó có 1 số hàm khi được gọi sẽ thực hiện validation trước khi thực hiện insert/update data vào database nhưng 1 số hàm thì không.
- Các hàm dưới đây thực hiện validation khi được gọi
    ```ruby
    create
    create!
    save
    save!
    update
    update!
    update_attributes
    update_attributes!
    ```
- Các hàm có dấu `!` ở cuối (bang version) sẽ raise exception khi record không hợp lệ.
- Các hàm không có dấu `!` ở cuối (non-bang version) hàm `save` trả về boolean, các hàm `create`, `update` trả về object.

## 1.3 Skipping validation:
- Các hàm dưới đây không thực hiện validation khi được gọi
    ```ruby
    decrement!
    decrement_counter
    increment!
    increment_counter
    toggle!
    touch
    update_all
    update_attribute
    update_column
    update_columns
    update_counters
    ```
- Hàm `save` không thực hiện validation khi được gọi với `validate: false`
    ```ruby
    save(validate: false)
    ```

## 1.4 valid? and invalid?:
- Trước khi lưu Active Record object vào databse, Rails thực hiện validation, nếu có validation nào trả về lỗi, Rails sẽ không lưu obejct vào database.
- Tuy nhiên ta cũng có thể tự thực hiện validation.
- Hàm `valid?` thực hiện validation khi được gọi và trả về `true` hoặc `false`.
- Ví dụ:
    ```ruby
    class User < ApplicationRecord
      validates :name, presence: true
    end

     User.craete(name: "John Doe").valid? # true
     User.craete(name: nil).valid?        # false
    ```
- Sau khi Active Record thực hiện validation, nếu có lỗi ta có thể truy vấn lỗi thông qua hàm `errors`.
- Hàm `errors` trả về 1 collection các lỗi.
- Theo định nghĩa obejct là hợp lệ nếu collection lỗi là tập rỗng sau khi thực hiện validation.
- Chú ý rắng 1 obejct mới được khởi tạo thông qua hàm `new` sẽ không trả về lỗi bởi vì validation chỉ được chạy khi lưu object vào database thông qua hàm `create`, `save` hoặc các hàm khác chạy validation khi được gọi.
- Ví dụ:
    ```ruby
    class User < ApplicationRecord
      validates :name, presence: true
    end

    user = User.new
    user.errors.messages # {}

    user.valid? # false
    user.errors.messages # {:name=>["can't be blank"]}

    user = User.create
    user.errors.messages # {:name=>["can't be blank"]}
    ```
- Hàm `invalid?` trả về giá trị ngược lại với hàm `valid?`.

## 1.5 errors[]:
- Để xác định 1 attribute nào đó của obejct có hợp lệ hay không, bạn có thể sử dụng hàm `errors[:attribute]`.
- Hàm `errors[:attribute]` trả về 1 mảng các lỗi nếu attribute không hợp lệ.
- Hàm `errors[:attribute]` trả về 1 mảng rỗng nếu attribute hợp lệ.
- Hàm chỉ thực sự có tác dụng sau khi validation đã được thực hiện.
- Ví dụ:
    ```ruby
    class User < ApplicationRecord
      validates :name, presence: true
    end

    User.new.errors[:name].any?    # false
    User.create.errors[:name].any? # true
    ```

## 1.6 errors.details[]:
- Để xác định validation nào fail trên attribute đó của obejct, ta có thể sử dụng hàm `errors.details[:attribute]`.
- Hàm `errors.details[:attribute]` trả về 1 mảng hash với với key là `:error` và value là tên validator fail trên attribute của object đó.
- Ví dụ:
    ```ruby
    class User < ApplicationRecord
      validates :name, presence: true
    end

    user = User.new
    user.valid?
    user.errors.details[:name] # [{error: :blank}]
    ```

# 2. Validation Helpers:
- Active Record cung cấp cho ta 1 số pre-define validation helper cho phép bạn sử dụng trực tiếp bên trong class definition của mình.
- Những helper này cung cấp những quy tắc validation thường xuyên được sử dụng.
- Mỗi lần có 1 validation fail, 1 error message được thêm vào `errors` collection của object.
- Error message này quan hệ trực tiếp với attribute đang được validate và trả về lỗi.
- Mỗi validation helper này chấp nhận 1 số lượng tùy ý tham số bao gồm attribute name, do đó với 1 dòng code bạn có thể add cùng loại validation cho nhiều attribute khác nhau.
- Tất cả validation helper này chấp nhận `:on` và `:message` options.
- Option `:on` quy định khi nào validation được thực hiện.
- Option `:on` chỉ nhận 1 trong 2 tham số `:update` và `:create`.
- Option `:message` quy định message nào được thêm vào `errors` collection khi validation fail.
- Mỗi validation helper có 1 message mặc định được sử dụng khi option `:message` không được quy định khi sử dụng validation helper.

## 2.1 acceptance:
- Validation helper này thực hiện validate checkbox  trên giao diện của user đã được check hay chưa.
- Validation helper này thường được dùng khi cần user đồng ý với điều khoản của hệ thống hoặc tương tự như vậy.
- Ví dụ:
    ```ruby
    class User < ApplicationRecord
      validates :terms_of_service, acceptance: true
    end
    ```
- Các giá trị mặc định được tính là accept bao gồm `[1, true]`, ta có thể custom lại các giá trị này thông quan option `:accept`
- Ví dụ:
    ```ruby
    class User < ApplicationRecord
      validates :terms_of_service, acceptance: {accept: ['yes']}
    end
    ```

## 2.2 validates_associated:
- Validation helper này đồng thời thực hiện validation với object đang có quan hệ (association) với object đang gọi validation.
- Nếu object có quan hệ với obejct đang gọi validation không hợp lệ thì object đang gọi validation cũng không hợp lệ. 
- Không sử dụng `validates_associated` cho cả 2 model trong 1 association, khi đó 2 validation helper `validates_associated` sẽ gọi lẫn nhau và tạo nên infinite loop.
- Ví dụ:
    ```ruby
    class User < ApplicationRecord
      has_many :books, dependent: :destroy
      validates_associated :books
    end
    ```
    
## 2.3 confirmation:
- Validation helper này được sử dụng đễ validate 2 text fileds  có nhận chung giá trị hay không.
- Ví dụ bạn muốn confirm email hoặc password, validation helper sẽ tạo 1 virtual-attribute tên là `email_confirmation` hoặc `password_confirmation` tương ứng với attribute `email` hoặc `password`.
- Validation helper này chỉ thực hiện validate khi field `email_confirmation` (hoặc `password_validation` không rỗng) do đó cần thêm validatio helper presence cho `password_confirmation`
- Ví dụ:
    ```ruby
    class User < ApplicationRecord
      validates :password, confirmation: true
      validates :password_confirmation, presence: true
    end
    ```

## 2.4 exclusion:
- Validation helper này được sử dụng để validate giá trị của attribute nào đó không nằm trong tập các giá trị cho trước hay không.
- Validation helper này sử dụng option `:in` (hoặc `:within`) để quy định tập giá trị cần kiểm tra.
- Ví dụ:
    ```ruby
    class User < ApplicationRecord
      validates :subdomain, exclusion: {in: %w(www us ca jp)}
    end
    ```

## 2.5 format:
- Validation helper này được sử dụng để validate giá trị của attribute nào đó có phù hợp với format cho trước hay không.
- Validation helper này sử dụng option `:format` để quy định format cần kiểm tra.
- Ví dụ:
    ```
    class User < ApplicationRecord
      validates :email, format: {with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/}
    end
    ```

## 2.6 inclusion:
- Validation helper này được sử dụng để validate giá trị của attribute nào đó có nằm trong tập giá trị cho trước hay không.
- Validation helper này sử dụng option `:in` (hoặc `:within`) để quy định tập giá trị cần kiểm tra.
- Ví dụ:
    ```ruby
    class User < ApplicationRecord
      validates :gender, inclusion: { in: %w(male female) }
    end
    ```

## 2.7 length:
- Validation helper này được sử dụng để validate độ dài của giá trị của attribute nào đó.
- Validation helper này sử dụng những option khác nhau để mô tả các điều kiện validate độ dài khác nhau.
- Ví dụ
    ```ruby
    class User < ApplicationRecord
      validates :password, length: { minimum: 6 }
    end
    ```

## 2.8 numericality:
- Validation helper này được sử dụng để validate attribute nào đó có phải là số hay không
- Validation helper này sử dụng những option khác nhau để mô tả các điều kiện validate khác nhau với số.
- Ví dụ:
    ```ruby
    class User < ApplicationRecord
      validates :age, numericality: { only_integer: true }
    end
    ```

## 2.9 presence:
- Validate helper này được sử dụng để validate attribute nào đó có `blank` hay không
- Validate này raise lỗi với các giá trị `nil` hoặc chuỗi rỗng
- Ví dụ:
    ```ruby
    class User < ApplicationRecord
      validates :age, numericality: { only_integer: true }
    end
    ```