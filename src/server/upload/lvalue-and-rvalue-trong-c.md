## lvalue and rvalue trong C++

### 1. left value
#### a. Định nghĩa

   - L-value: là phép gán đề cập đến một giá trị. Ở đây left và có thể được xuất hiện ở phía bên trái hoặc phải của toán tử gán (=). Left value thường đại diện như một định danh. Hay nói đơn giản hơn thì left value là phép gán giá trị.
    
    - Các biểu thức đề cập đến các vị trí có thể sửa đổi được gọi là các left value, giá trị có thể thay đổi được. Left value có thể sửa đổi thì không thể có thuộc tính const. Để các cấu trúc và định danh có thể thay đổi giá trị, chúng không được có bất kỳ thành viên nào có thuộc tính const. Tên của định danh biểu thị một vị trí lưu trữ, trong khi giá trị của biến là giá trị được lưu trữ tại vị trí đó.

   Định danh có thể là biến, đối tượng, ...

   - Một định danh là một giá trị có thể sửa đổi nếu nó đề cập đến một vị trí bộ nhớ và nếu loại của nó là số học, cấu trúc, liên kết hoặc con trỏ.
    Ví dụ: nếu ptr là con trỏ tới vùng lưu trữ, thì * ptr là left value có thể sửa đổi chỉ định vùng lưu trữ mà ptr trỏ tới.

   Khái niệm này còn có thể đươc đổi tên thành giá trị định vị, và được gọi là các biểu thức xác định vị trí (chỉ định) các đối tượng. Left value là một trong những điều sau đây:

   1. Tên của biến của bất kỳ loại i.e, một định danh của tích phân, nổi, con trỏ, cấu trúc hoặc loại kết hợp.
    2. Một biểu thức đăng ký ([]) không đánh giá thành một mảng.
    3. Một biểu thức unary-indirection (*) không tham chiếu đến một mảng
    4. Một biểu thức left value trong ngoặc đơn.
    5. Một đối tượng const (một left value không thể thay đổi).
    6. Kết quả của việc xác định thông qua một con trỏ, với điều kiện là nó không phải là một con trỏ hàm.
    7. Kết quả của việc truy cập thành viên thông qua con trỏ (-> hoặc.)

#### b. vd
```
// khai bao bien a kieu int 
int a; 
 
// gan left value 
a = 1; 
  
int b = a;
```


### 2. Right value
#### a. Định nghĩa
Right value: có nghĩa là giá trị dữ liệu được luw trữ tại một địa chỉ trong bộ nhớ. Right valuelà một biểu thức có thể có một giá trị được gán, và giá trị của right value này có thể được thay đổi thông qua một định danh khác. Hay nói cách khác right value chính là phép gán địa chỉ.

Right value: được sử dụng rất nhiều với với con trỏ với việc thực hiện các phép gán địa chỉ.

#### b. Ví dụ

```
// khai bao doi tuong a, b 
int a = 1, b; 
 
// khai bao cac con tro p, q 
int *p, *q; // *p, *q là các left value
 
*p = 1; // phep gan left value  
 
q = p + 5; // phep gan right value 
 
p = &b;  //phep gan right value
 
struct S { int m; }; 
 
struct S obj;
 
struct S* ptr = &obj; 
```