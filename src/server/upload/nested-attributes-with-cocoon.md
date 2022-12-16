Trong bài viết này, mình xin phép giới thiệu về kỹ thuật sử dụng nested attributes để thực hiện lưu các thuộc tính của bản ghi này thông qua một bản ghi khác dựa trên các mối quan hệ associated. Và việc sử dụng gem Cocoon để tạo ra sự linh hoạt trong việc thêm - sửa - xóa các nested field.

Bắt đầu sử dụng nested attributes bằng cách thêm phương thức ```accepts_nested_attributes_for```  vào trong model để kích hoạt nested attribute updating (mặc định trong rails phuơng thức này bị tắt đi).

**Associated one-one**: Ta sẽ bắt đầu với mối quan hệ một-một
```
class Student < ActiveRecord::Base
  has_one :account
  accepts_nested_attributes_for :account
end
```
Khi sử dụng accepts_nested_attributes_for trong model Student thì khi tạo mới một đối tượng student, ta có thể đồng thời tạo mới đối tượng account đi kèm với nó bằng cách truyền params tuơng ứng của account trong params của student
```
params = { student: { name: "Mong Ji", age: 20, account_attributes: { email: "mongji@sun-asterisk.com" } } }
student = Student.create(params[:student])
student.account.id = 1
student.account.email = "mongji@sun-asterisk.com"
```
Ta cũng có thể cập nhật thuộc tính của account thông qua student
```
params = { student: { account_attributes: { id: '1', email : "mong_ji@gmail.com" } } }
student.update params[:student]
student.account.email = "mong_ji@gmail.com"
```
Ngoài ra có thể sử dụng tùy chọn ```update_only``` để cập nhật đối tượng hiện tại mà không cần quan tâm đến id của nó. Theo mặc định, tùy chọn này sẽ bị tắt, nên khi muốn update một đối tượng, bạn sẽ cần phải gửi kèm id của đối tượng đấy để rails có thể phân biệt được là việc cần làm sẽ tạo mới một đối tượng hay cập nhật đối tượng đã có sẵn. Và việc sử dụng tùy chọn này cũng nên cần lưu ý vì đối tượng sẽ luôn được cập nhật cho dù bạn không gửi kèm id và mong muốn là tạo mới một đối tượng.

```accepts_nested_attributes_for :account, update_only: true```

Thêm một tùy chọn nữa đó là ```allow_destroy```: với tùy chọn này, bạn có thể thực hiện xóa đối tượng liên kết bằng từ khóa ```destroy``` .

khai báo trong model: ```accepts_nested_attributes_for :account, allow_destroy: true```

params được gửi lên server: ```params = { student: { account_attributes: { id: "1", email : "mong_ji@gmail.com", _destroy: "1" } } }```
```
student.account.marked_for_destruction? # => true
student.save
student.reload.account # => nil
```
Note: cần phải chỉ định đối tượng liên kết sẽ bị xóa bằng cách chỉ định id cho nó trong params và đối tượng chỉ thực sự bị xóa đi cho đến khi bạn thực hiện lưu đối tượng chứa nó. Và mặc định thì tùy chọn này cũng bị tắt đi và phải thực hiện kích hoạt bằng cách khai báo.

**Associated has-one**
```
class Class < ActiveRecord::Base
  has_many :students
  accepts_nested_attributes_for :students
end
```
Đối với Associated has-one, ta cũng thực hiện việc thêm - sửa - xóa tương tự với one-one, duy ở đây là, ta có thể thực hiện với nhiều bản ghi liên kết đồng thời.
```
params = { class: {
  name: "ATTT", students_attributes: [
    { name: "mong-ji", age: "20" },
    { name: "mong-ji", age: "21", id: "2" },
    { name: "mong-ji", id: "3", _destroy: true }
  ]
}}
```
Ngoài ra, ta có thể set ```reject_if``` để bỏ qua các bản ghi không đáp ứng được điều kiện trong  proc.
```
accepts_nested_attributes_for :students, reject_if: proc { |attributes| attributes['name'].blank? }
```
hoặc sử dụng method thay cho proc
```
accepts_nested_attributes_for :students, reject_if: reject_students

def reject_students
    params[:name].blank? && params[:age] < 18
end
```
Hoặc ta thể validate các thuộc tính của đối tượng ngay chính trong model của nó thông qua phuơng thức ```validates_presence_of``` và từ khóa ```inverse_of```
```
class Class < ActiveRecord::Base
  has_many :students, inverse_of: :class
  accepts_nested_attributes_for :students
end

class Student < ActiveRecord::Base
  belongs_to :class, inverse_of: :students
  validates_presence_of :class
end
```

**Gem Cocoon**

Tiếp theo, chúng ta sẽ đến với gem cocoon để hỗ trợ nested form giúp cho việc thêm - sửa - xóa được dễ dàng hơn. Ví dụ, khi muốn tạo 1 class với nhiều hơn 3 student tham gia lớp học đó. Ngoài ra, cocoon còn cung cấp một số phương thức có sẵn.

Đầu tiên, chúng ta cần tạo một ứng dụng và tích hợp gem cocoon để sử dụng: [Hướng dẫn cài đặt gem cocoon](https://www.sitepoint.com/better-nested-attributes-in-rails-with-the-cocoon-gem/)

Ta sẽ sử dụng các model cùng với khai báo accepts_nested_attributes_for như trong các ví dụ trên

trong Gemfile
```
gem "cocoon"
```
khai báo trong application.js
```
//= require cocoon
```
Xây dựng view nested của student để nhập dữ liệu
```
<div class="nested-fields">
  <%= f.label :name %>
  <%= f.text_field :name %>

  <%= f.label :age %>
  <%= f.text_field :age %>

  <%= f.check_box :_destroy %>
  <%= link_to_remove_association "remove address", f %>
</div>
```
```link_to_remove_association``` là phương thức hỗ trợ của Cocoon để tạo thực hiện việc xóa đi các associated record. Và class đi kèm bắt buộc đó là nested-fields.

Một helper khác cũng được cung cấp sẵn để  hỗ trợ thực hiện việc tạo mới associated record.

```link_to_add_association```:  ```<%= link_to_add_association 'add students', f, :students %>```

Ngoài ra, Cocoon cung cấp các loại callback như  sau: (bạn có thể tìm hiểu thêm về cocoon's callback [tại đây](https://www.sitepoint.com/better-nested-attributes-in-rails-with-the-cocoon-gem/))
* cocoon:before-insert
* cocoon:after-insert
* cocoon:before-remove
* cocoon:after-remove

Tài liệu tham khảo [https://api.rubyonrails.org/classes/ActiveRecord/NestedAttributes/ClassMethods.html](https://api.rubyonrails.org/classes/ActiveRecord/NestedAttributes/ClassMethods.html)