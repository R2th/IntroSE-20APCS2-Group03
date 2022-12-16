Trong bài viết này, chúng ta hãy cũng tìm hiểu:
- **Struct** Class
- Structure types và Structures

# 1. Struct class
**Struct** đơn thuần là một container chứa dữ liệu. Không giống với **Object**, nó được sử dụng để đóng gói thông tin mà không chứa bất cứ một logic nào.

**Struct** cung cấp 1 cặp method Getter/Setter cho từng attribute mà nó chứa. Nó gần giống với phương thức ***attr_accessor*** cho các lớp.

**Struct** Class là một trình tạo kiểu cấu trúc. Lớp này chịu trách nhiệm xác định các kiểu cấu trúc mới có thể tạo ra các cấu trúc sau đó.

Hãy cũng xem qua ancestor chain của nó:
```
irb> Struct.class
 => Class
irb> Struct.ancestors
 => [Struct, Enumerable, Object, Kernel, BasicObject]
 ```
 
 **Struct** class kế thừa từ **Object** class. Nó cũng bao hàm module *Enumurable* phụ trách việc thêm một loạt các phương thức tìm kiếm, sắp xếp và truyền tải cho một lớp. Ancestor chain của nó giống hết với ***Array*** và ***Hash***
 
 # 2. Structure types and Structures
Một kiểu cấu trúc là một bản mẫu (class) chứa một danh sách các thuộc tính bất biến - còn được gọi là ***members***. Còn một cấu trúc thì là một thể hiện của nó trên bộ nhớ.

Để tạo ra 1 **Struct**

```
Address = Struct.new(:street, :city, :zip)
home = Address.new('Broadway', 'NYC', 10040)
```
Ở dòng đầu tiên, chúng ta đã định nghĩa kiểu cấu trúc *Address* bao gồm các members hay các attributes *street*, *city*, và *zip*.
Sau đó chung ta khởi tạo 1 cấu trúc có kiểu *Address* và lưu trữ nó ở biến *home*.
Mỗi argument của *home* khớp chính xác với các attributes của *Address* mà ta đã định nghĩa trên đó.
```
home.street # => "Broadway"
home[:city] # => "NYC"
home['zip'] # => 10040

home.not_exist    # => NoMethodError: undefined method `not_exist'
home[:not_exist]  # => NameError: no member 'not_exist' in struct
home['not_exist'] # => NameError: no member 'not_exist' in struct
```
Nhìn có vẻ giống như là *Hash*, nhưng để ý kỹ ta có thể thấy các cách để truy cập vào giá trị của 1 *member* trong *Struct*. Ngoài ra, lưu ý rằng nếu ta cố truy cập vào 1 member không có trong struct *NoMethodError* hoặc *NameError* sẽ được raise lên tùy thuộc vào các ta truy cập member.

Cùng với đó ta cũng có 3 cách để thay đổi giá trị của member
```
home.street= // the street= accessor method
home[:city]= // the Struct#[]= with a symbol key
home['zip']= // the Struct#[]= with a string key
```
Tương tự như Getter, thì Setter cũng sẽ raise errors tương ứng nếu ta cố thay đổi giá trị của một member không tồn tại trong Struct.

# 3. Structure type definition behind the scene

Giống với bất kỳ Class nào khác trong Ruby, phương thức ***Struct::new*** khởi tạo một Object có kiểu **Struct**,


Nhưng tại sao tôi lại nói lớp **Struct** là không được khởi tạo?
```
irb> Struct.allocate
TypeError (allocator undefined for Struct)
irb> Struct.methods(false)
 => [:new]
 ```
 ***Struct#allocate*** dùng để xác định không gian bộ nhớ cần thiết để chứa 1 object Struct, và nó trả về undefined.
 Vì vậy, Struct class không thể xác định không gian bộ nhớ cần thiết để khởi tạo một object có kiểu Struct.
 
 Ngoài ra, Struct cũng ghi đè phương thức ***BasicObject#new*** bằng phiên bản của riêng nó.
 
 **Vậy, Structure types được định nghĩa thế nào nếu chúng ta không thể khởi tạo 1 Struct? **
 
 Sâu bên trong, Ruby làm rất nhiều thứ vi diệu để class này có thể khởi tạo. Tất cả được định nghĩa trong phương thức **Struct#new**.
 
 Phương thức này không khởi tạo 1 Struct nhưng thay vào đó nó tạo ra 1 subclass của nó
 
 ```
 Address = Struct.new(:street, :city, :zip)

Address.class      # => Class
Address.superclass # => Struct
```
Ở đây, *Address* thực chất là 1 *Class* kế thừa từ *Struct* class.
Nó cho phép Address class có thể truy cập vào tất cả các phương thức và những thứ bên trong Struct class.


Vì vậy, 1 Structure type thực tế là 1 class được đặt tên kế thừa từ Struct class và 1 Structure đơn giản là 1 instance của class đước đặt tên đó.

Kiểu thiết kế này cho phép Structure type tương thích với mọi thứ mà 1 Class cung cấp trong Ruby như class opening, inheritance, mixins...

Ví dụ, ta có thể re-open **Address** class để add thêm method

```
Address = Struct.new(:street, :city, :zip)

class Address
  def full_address
    "#{street} #{city} #{zip}"
  end
end

home = Address.new('Broadway', 'NYC', 10040)

home.full_address # => "Broadway NYC 10040"
```

Đây là cách đơn giản để sử dụng phương thức Struct::new

Ngoài ra, ta cũng có cách khác để sử dụng phương thức này.

```
Struct.new('Address', :street, :city, :zip)

Struct::Address.superclass # => Struct

home = Struct::Address.new('Broadway', 'NYC', 10040)

home.class # => Struct::Address
```