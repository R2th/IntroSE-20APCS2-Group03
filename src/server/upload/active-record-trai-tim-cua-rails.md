#  1. Active Record là gì ? 
Một đối tượng bao bọc một hàng trong bảng cơ sở dữ liệu , đóng gói quyền truy cập cơ sở dữ liệu và thêm logic trên dữ liệu đó.

Đó là một pattern đơn giản, trong đó một lớp đại diện cho một bảng và một đối tượng đại diện cho một hàng trong lớp đó. 

Rails thực sự được tạo thành từ bảy gem và Active Record là gem chăm sóc tất cả các công cụ liên quan đến cơ sở dữ liệu.

#  2. ORM là gì ?
ORM viết tắt của Object-Relative-Mapping, đây là một kỹ thuật cho phép bạn quản lý cơ sở dữ liệu của mình bằng ngôn ngữ lập trình . Active Record tương tác với cơ sở dữ liệu, lấy dữ liệu và xử lý nó như một đối tượng Ruby bình thường. Ví dụ: nếu bạn muốn lấy tất cả thông tin về Customers, bạn sẽ phải viết truy vấn như

```
SELECT * FROM Customers;
```

và chuyển đổi các kết quả này thành một mảng. Khi sử dụng Active Record, chúng ta có thể viết
```
Customer.all
```

và lấy một mảng các đối tượng Customer. Một điều thú vị khác về Active Record là cơ sở dữ liệu bất khả tri. Do đó, các nhà phát triển có thể tập trung vào việc viết mã cho ứng dụng và Active Record sẽ chịu trách nhiệm kết nối với cơ sở dữ liệu.

# CRUD với Active Record
Active Record cho phép bạn tạo một đối tượng Ruby đại diện cho một hàng trong bảng cơ sở dữ liệu. Phương thức `new` trả về một đối tượng ruby mà sau này có thể được lưu lại bằng cách sử dụng phương thức `save`. Hai bước này có thể được kết hợp bằng cách sử dụng phương thức `create`.
```
// Hai bước để tạo mới một User
new_user = User.new(name: "huythanh")
new_user.save
// Tạo một User với một bước
new_user = User.create(name: "huythanh")
```

Chúng ta có thể cập nhật đối tượng bằng cách lấy nó từ cơ sở dữ liệu và sửa đổi thuộc tính của nó và lưu nó trở lại cơ sở dữ liệu
```
// Các bước để lấy dữ liệu ra, thay đổi và lưu lại
user = User.find_by(name:"huythanh")
user.name = "dohuythanh"
user.save

//Hoặc chúng ta có thể dùng hàm update để rút gon code 
user = User.find_by(name:"huythanh")
user.update(name:"dohuythanh")
```

Xóa một hàng khỏi cơ sở dữ liệu có thể được thực hiện bằng cách sử dụng phương thức `destroy`
```
user = User.find_by(name:"huythanh")
user.destroy
```

# Tài liệu tham khảo
 * Tìm hiểu thêm về Active record tại [đây](https://guides.rubyonrails.org/active_record_basics.html#what-is-active-record-questionmark)