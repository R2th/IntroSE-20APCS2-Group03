### 1. Private, Public, Protected và Default ?
Private, public, protected và default được gọi chung là **Access modifier** hay còn gọi là từ khóa phạm vi truy cập.


Vậy **Access Modifier** là gì ?

Access modifier là các "từ" dùng trước các khai báo của một class, biến hay method(phương thức) để thể hiện khả năng truy cập của class, biến hay method đó ở các class khác.
Với class ta có 2 loại Access modifier là public và default nhưng với biến và method(phương thức) thì ta có 4 access modifier (public, protected, default, private).


Default: Truy cập trong nội bộ package

Private: Truy cập trong nội bộ lớp

Public: Thành phần công khai, truy cập tự do từ bên ngoài

Protected: Thành phần được bảo vệ, bị hạn chế truy nhập từ bên ngoài

![](https://images.viblo.asia/3efc9ede-d8e3-4b93-b1f0-7b46e1e773f3.png)


### 2. Public Access Modifier
Public Access Modifier là có thể truy cập ở bất cứ đâu. Nó có phạm vi rộng nhất trong tất cả Modifier. Một lớp, phương thức, constructor, interface, ... được khai báo public có thể được truy cập từ bất cứ lớp nào khác. Do đó, các trường, phương thức và khối được khai báo bên trong một lớp public có thể được truy cập từ bất kỳ lớp nào trong thế giới Java.


Tuy nhiên, nếu lớp public chúng ta đang cố gắng truy cập là trong một package khác, thì lớp public này vẫn cần được import trước khi truy cập.


### 3. Private Access Modifier
Các method, biến và constructor khi được khai báo private thì chỉ có thể được truy cập trong chính lớp được khai báo đó.

Private  Modifier có phạm vi truy cập mang tính hạn chế nhất. Lớp và interface không thể là private.

Các biến được khai báo private có thể được truy cập bên ngoài lớp nếu như có tạo phương thức public getter cho biến đó tại lớp đó.

Sử dụng Private Access Modifier trong Java là cách chủ yếu để một đối tượng bao đóng chính nó và ẩn dữ liệu với bên ngoài, giúp an toàn dữ liệu với bên ngoài.


### 4. Protected Access Modifier
Protected Access Modifier là có thể truy cập bên trong package và bên ngoài package nhưng chỉ thông qua tính kế thừa.

Protected Access Modifier không thể áp dụng cho lớp và interface. Các phương thức và trường có thể khai báo protected, tuy nhiên các phương thức và trường trong một interface không thể khai báo là protected.


### 5. Default Access Modifier
Default Access Modifier nghĩa là chúng ta không khai báo một cách rõ ràng một Access Modifier cho một lớp, trường, phương thức, ... Nói cách khác, nếu bạn không sử dụng bất cứ Modifier nào, thì theo mặc định nó được xem như là default. Default Modifier là chỉ có thể truy cập bên trong package.

Một biến hoặc phương thức được khai báo mà không có bất kỳ Access Modifier nào là có sẵn cho mọi lớp trong cùng package. Các trường này trong một interface là hoàn toàn public static final và các phương thức trong một interface là public theo mặc định.


### 6. Access Modifier và tính kế thừa trong Java
Qui tắc cần lưu ý và bắt buộc:

Các phương thức được khai báo public trong một lớp cha cũng phải là public trong tất cả lớp con.

Các phương thức được khai báo protected trong một lớp cha phải hoặc là protected hoặc public trong các lớp con; chúng không thể là private.

Các phương thức được khai báo mà không có điều khiển truy cập (không sử dụng modifier nào) có thể được khai báo private trong các lớp con.

Các phương thức được khai báo private không được kế thừa, do đó không có qui tắc nào cho chúng.