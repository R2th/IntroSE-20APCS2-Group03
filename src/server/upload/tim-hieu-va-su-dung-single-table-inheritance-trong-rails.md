## 1. Single Table Inheritance(STI) là gì
STI là một design pattern dựa trên ý tưởng dùng 1 bảng duy nhất để lưu trữ data của nhiều model bằng cách thừa kế từ một base model duy nhất.
STI là một thành phần của ActiveRecord::Base
## 2. Tại sao phải cần STI
Đôi khi trong quá trình phát triển dự án chúng ta sẽ gặp phải trường hợp các model có các attributes/function giống hệt nhau.
Lúc này chúng ta sẽ dùng STI để lưu trữ dữ liệu của các model đó vào 1 bảng duy nhất, mặt khác chúng ta vẫn viết các chức năng riêng của từng model như bình thường.
Sử dụng các method và xử lý với các model như bình thường, nhưng việc quản lý bảng sẽ được đơn giản hóa tối đa, bởi tất cả chúng sẽ được lưu vào 1 bảng duy nhất và phân biệt nhau bởi type.
Điều kiện tiên quyết để chọn lựa sử dụng STI thay cho phương pháp lưu trữ thông thường phải là khi các model đó có các trạng thái giống nhau, và có cùng các mối quan hệ về mặt đối tượng trong hệ thống
## 3. Triển khai STI

Đầu tiên là tạo bảng User nào 
```
class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :password
      t.string :type # <- This makes it an STI

      t.timestamps
    end
  end
end
```

Tiếp theo chúng ta tạo 2 model Admin và Guest

```
class User < ActiveRecord::Base
   validates_presence_of :password
   # This is a parent class. All shared logic goes here
end

class Admin < User
   # Admins must have more secure passwords than regular users
   # We can add it here
   validates :custom_password_validation
end

class Guest < User
   # Lets say that we have a guest type login. 
   # It has a static password that cannot be changed
   validates_inclusion_of :password, in: ['guest_password']
end
```

Bây giờ khi chúng ta tạo `Guest.create(name: 'Bob')`  ActiveRecord sẽ tự động chuyển đổi để tạo 1 entry trong bảng Users với type: 'Guest'
Ví dụ giờ chúng ta vào rails c và thử ` bob = User.where(name: 'Bob').first` thì cái object được trả về sẽ là 1 instance của Guest. 
Nếu chúng ta muốn biến nó thành 1 instance của User, chỉ việc gọi `bob.becomes(User)`
## 4. Custom inheritance_column
Default column để phân biệt class name của STI là `type`. Nhưng chúng ta có thể biến nó thành bất cứ cái gì tùy thích bằng cách:

```
class User < ActiveRecord::Base
  self.inheritance_column = :entity_type # can be string as well
end

class Admin < User; end
```

Tất nhiên là migration tương ứng phải là:

```
class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :password
      t.string :entity_type

      t.timestamps
    end
  end
end
```
Tài liệu tham khảo: https://riptutorial.com/ruby-on-rails/topic/9125/single-table-inheritance

Chúc các bạn làm việc vui vẻ (baibien)