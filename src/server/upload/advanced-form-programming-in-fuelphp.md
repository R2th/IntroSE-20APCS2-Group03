# Advanced Form Programming
FuelPHP cung cấp một lập trình biểu mẫu nâng cao thông qua các lớp Fieldset và Fieldset_Field. Fieldset cung cấp một cách hướng đối tượng để tạo biểu mẫu. Nó có hỗ trợ hoàn chỉnh cho các mô hình. Nó cũng hỗ trợ sẵn cho việc xác nhận phía máy khách và phía máy chủ. Chúng ta tìm hiểu về lớp Fieldset và cách tạo một biểu mẫu nhé.

## Fieldset
Fieldset là một tập hợp các đối tượng Fieldset_Field . Fieldset_Field xác định mục nhập riêng lẻ của một biểu mẫu như firstname, lastname,... cùng với các xác nhận hợp lệ. Fieldset class có các phương thức để thêm/sửa/xóa các trường. Nó có các tùy chọn để xác định các trường được xác định trong form và tạo ra các trường từ form đó. Fieldset sử dụng các class Form và Validation trong nền kiểm tra và chạy trong trang. Chúng ta hãy xem một số phương pháp quan trọng của lớp Fieldset.

### force

**force** tạo một thể hiện Fieldset mới với hai tham số sau đây:

- ```$name```: định nghĩa fieldset
- ```$config```: Các tùy chọn có thể là validation_instance và form_instance. (validation_instance có thể có đối tượng Validation và form_instance có thể có đối tượng Form).
```
$employee_form = Fieldset::forge('employee');
```

### instance
**instance** trả về  Fieldset đã được định danh từ trước
```
$employee_form = Fieldset::instance('employee');
```

### get_name
Lấy định danh của fieldset
```
$employee_form = Fieldset::forge('employee');
$name = $employee_form->get_name();
```

### add

**add** tạo một bản Fieldset_Field mới và thêm nó vào fieldset hiện tại, nó bao gồm 4 tham số sau:

- ```$name```
- ```$label```
- ```$attributes``` − Thuộc tính thẻ HTML
- ```$rules``` − quy tắc validation
```
$employee_field = $employee_form->add (
   'employee_lastname', 
   'Lastname', 
   array ('class' => 'pretty_input')
);  

// with validation rules 
$employee_form->add ( 
   'email', 'E-mail', 
   array('type' => 'email', 'class' => 'pretty_input'), 
   array('required', 'valid_email') 
);
```
### add_before
**add_before** tương tự như add nhưng add_before có thêm một tham số để xác định trường trước khi trường mới được tạo sẽ được thêm vào.
```
$employee_form->add_before (
   'employee_firstname', 
   'Firstname', 
   array ('class' => 'pretty_input'), 
   array(), 
   'employee_lastname'
);
```
### delete

Xóa trường đã được chỉ định khỏi fieldset.
```
$employee_form->delete('employee_firstname');
```
### field
**field** nhận tất cả các trường hoặc những trường được chỉ định từ fieldset.
```
$fields = $employee_form->field(); 
$lastname_field = $employee_form->field('employee_lastname'); 
```
### build
**build** thực ra nó là ```$this->form()->build()```. Tạo đánh dấu HTML của form.
```
$employee_form->build(Uri::create('employee/add'));
```
### enable
Bật lại các trường đã bị vô hiệu hóa trước đó
```
$employee_form->enable('employee_firstname');
```
### disable
Vô hiệu hóa một trường trong fieldset đang được xây dựng.
```
$employee_form->disable('employee_firstname');
```
### form
Trả về các cá thể Form của Fieldset hiện tại.
```
$form = employee_form->form();
```

### add_model
Thêm trường của model vào fieldset. Nó bao gồm ba thông số sau:

- ```$class``` − tên class
- ```$instance``` − thể hiện của class để điền dữ liệu vào các trường có giá trị
- ```$method``` − tên của phương thức trong class. Phương thức này được sử dụng để thêm các trường vào fieldset. Orm\Model có phương pháp bắt buộc. Tên phương thức mặc định là set_form_fields.
```
$employee_form = Fieldset::forge('employee'); 
$employee_form->add_model('Model_Employee');
```

### populate
Cài đặt giá trị ban đầu của các trường trong fieldset sử dụng model
```
$emp = new Model_Employee(); 
$emp->name = "Jon"; 
$employee_form->populate($emp);
```
### repopulate
Cũng giống như populate, ngoại trừ đặt lại các trường trong fieldset.
### validation
Nhận cá thể xác thực của fieldset hiện tại.
```
$validation = $employee_form->validation();
```

### validated
Bí danh cho ```$this->validation()->validated()```

***input***

Bí danh cho ```$this->validation()->input()```

***error***

Bí danh cho ```$this->validation()->error()```.

***show_errors***

Bí danh cho ```$this->validation()->show_errors()```.

Để  dễ hình dung, bạn có thể làm theo ví dụ đầy đủ tại source bên dưới.

Source: https://www.tutorialspoint.com/fuelphp/fuelphp_advanced_form_programming.htm