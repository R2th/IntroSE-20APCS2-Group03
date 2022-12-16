Để hiểu về callbacks, đầu tiền chúng ta cần phải biết về vòng đời của một Object trong Ruby.
## **I. Vòng đời của Object**
Trong quá trình hoạt động của một ứng dụng Rails, các đối tượng có thể được tạo mới, cập nhật hoặc hủy bỏ. Rails cung cấp một vòng đời bao gồm các trạng thái của một đối tượng như sau:
* Đầu tiên sẽ là khởi tạo đối tượng: `intitialize`
* Sau đó đối tượng sẽ được lưu lại: `save`
* Thực hiện tìm kiếm đối tượng: `find`
* Cập nhật đối tượng: `update`
* Hủy bỏ đối tượng: `destroy`

Tiếp theo, chúng ta sẽ đi vào tìm hiểu về callbacks.
## **II. Tổng quan về Callbacks**
### **1. Khái niệm**

Callbacks được định nghĩa là một class method can thiệp vào vòng đời của một Object. Trước khi một đối tượng có sự thay đổi về mặt trạng thái thì callbacks được kích hoạt để thực hiện các tiền xử lý hay các xử lý logic sau khi thay đổi trong quá trình khởi chạy.

Sau đây sẽ là một ví dụ để có thể hiểu rõ hơn về callbacks cũng như cách sử dụng nó

```
before_save :downcase_email
private
def downcase_email
    self.email = email.downcase
end
```
Ở đây, trước khi lưu tài khoản người dùng vào hệ thống thì sẽ thực hiện chuyển các ký tự ở trường email khi người dùng nhập về ký tự thường không viết hoa. Và thông thường,  các phương thức thực thi ở callbacks sẽ được khai báo với mức độ truy cập là `private` để tránh nó có thể can thiệp được từ bên ngoài.

### **2. Các  loại callbacks**

Như đã liệt kê ở phần 1 về các phương thức trong vòng đời của một Object thì tương ứng, vòng đời của một Object có những phương thức nào thì sẽ có những loại callbacks tương tự:
```
initialize
save
find
update
destroy
```
Lưu ý rằng, nếu trong một model bạn định nghĩa cả 2 callbacks `after_find` và `after_initialize` thì `after_find` sẽ được thực thi trước khi chạy đến `after_initialize`.

Còn nếu xét về thứ tự thực thi callbacks thì tương ứng ta có các loại:
```
before
arround
after
```
Đầu tiên `before_callback` sẽ được thực thi trước khi xảy ra một sự kiện, `after_callback` sẽ thực thi sau khi sự kiện đó xảy ra và `arround_callback` sẽ được thực thi trước và sau khi sự kiện xảy ra.

Ngoài ra, ta sẽ tìm thấy một số callbacks ví dụ như:
```
before_validation
after_validation
after_commit
after_rollback
after_touch
```

### **3. Skip Callbacks**

Với một số action, bạn sẽ phải trực tiếp thay đổi trạng thái của đối tượng đồng thời bỏ qua việc thực hiện các xử lý logic và để làm được việc đó, Active Record cung cấp cho chúng ta một số phương thức phổ biến như sau:
```
decrement
decrement_counter
increment
increment_counter
delete
delete_all
update_column
update_columns
update_all
```
Hoặc đơn giản, nếu bạn muốn việc thực thi các xử lý trong callbacks chỉ áp dụng với một số action nhất định thì bạn có thể sử dụng từ khóa `on`

Ví dụ như sau
```
before_validation :strip_name, on: :save
private
def strip_name
    self.name = name.strip!
end

>> account = Account.new(name: "   name remove space    ")
account.save!
account.name
=> result: "name remove space"
account.name = "   name update include space   "
account.update!
account.name
=> result: "   name update include space   "
```
Đoạn code trên thực hiện việc loại bỏ các khoảng trắng của trường name trước khi thực hiện lưu đối tượng vào cơ sở dữ liệu và nó chỉ được thực thi khi đối tượng gọi đến phương thức save.

### **4. Callbacks có điều kiện**

Trong quá trình thực thi callbacks, ta có thể sử dụng thêm điều kiện để loại bỏ việc thực thi callbacks trong từng trường hợp.

```
before_save :remove_space, if: :name?
private
def remove_space
    self.name = name.strip
end
```
Trước khi lưu đối tượng vào cơ sở dữ liệu, ta sẽ kiểm tra nếu như `:name?` trả về true thì thực hiện gọi phương thức `remove_space` của callbacks.

Hoặc ta cũng có thể sử dụng nhiều điều kiện cho một callback
```
before_save :validate_field, if: :name?, unless: Proc.new { |user| !user.email? }
private
def prefix
    self.name = name.strip
    self.email = email.downcase
end
```

## **Tài liệu tham khảo**
https://guides.rubyonrails.org/active_record_callbacks.html