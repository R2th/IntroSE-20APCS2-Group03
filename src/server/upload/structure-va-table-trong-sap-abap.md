Author: [QuynhBC](https://www.facebook.com/bui.congquynh)

Bài viết số 04.

Xin chào các bạn. Trong bài viết tiếp theo này của mình thì mình đi sâu vào:
1. Các loại structure và table type.
2. Điểm khác biệt giữa chúng.

### **1:Structure**

Cấu trúc là các đối tượng dữ liệu (bao gồm các thành phần của bất kỳ kiểu dữ liệu nào) được lưu theo trình tự trong bộ nhớ. Kiểu dữ liệu của cấu trúc là kiểu có cấu trúc hoặc cấu trúc được định nghĩa trong  ABAP Dictionary.

Trong một chương trình, một kiểu hoặc cấu trúc có cấu trúc được tạo bằng cách sử dụng các bổ sung BEGIN OF ... END OF các bổ sung của câu lệnh TYPES, DATA, etc.

Các loại cấu trúc của Structure:

* Flat Structure:  Chúng chỉ chứa các thành phần có kiểu dữ liệu phẳng, chẳng hạn như kiểu cơ bản c, n, d, t, decfloat16, decfloat34, f, i, int8, p, x, cộng với b, s (hoặc cấu trúc với các kiểu này).

![image.png](https://images.viblo.asia/70c46662-a448-4e34-87db-c72755094a80.png)

* Nested Structure: là cấu trúc chứa ít nhất một cấu trúc con. Nested Struc có dạng phẳng hoặc dạng ký tự, tùy thuộc vào thuộc tính của tất cả các thành phần.

![image.png](https://images.viblo.asia/0e6a717c-b74e-4e86-a66c-ca67cfccf26c.png)'

*  Deep Structure: là một cấu trúc sâu ở bất kỳ cấp độ lồng nào. Nó có thể bao gồm: chuỗi, iternal table, data reference, hay object.

Hình ảnh sau đây minh họa về cấu trúc Deep Struc: 
![image.png](https://images.viblo.asia/8df337c6-64f5-4d82-b219-58a65c02146c.png)

![image.png](https://images.viblo.asia/5a8ab87e-cf32-470f-8669-edb12f53a78e.png)


***Các cách để tạo ra Structure.***

*  Tạo ngay trên chương trình của mình ( giống các hình ảnh ở trên )
*  Tạo SE11 >> Data Type >> Name of Struc >> Structure ( Create Type ).

![image.png](https://images.viblo.asia/65ba185e-4c84-4173-9cc4-089ba8db581e.png)

### **2:Table**
Kiểu bảng là kiểu mô tả cấu trúc và chức năng của một bảng nội bộ trong chương trình ABAP. Nó có thể được sử dụng trong chương trình ABAP một cách tương tự với các kiểu được xác định trước trong chương trình ABAP hoặc được định nghĩa trực tiếp trong chương trình ABAP để xác định các đối tượng và kiểu dữ liệu.

Table type: được sử dụng trong ABAP dictionary để được xác định cấu trúc kiểu có cấu trúc và các bảng kiểu khác:
* Là một thành phần của cấu trúc có dạng bảng như là một kiểu dữ liệu.
* Một loại bảng có thể được sử dụng làm loại hàng của một bảng xác định.
* Bảng miêu tả các thuộc tính của một bang nội bộ Internal Table.
* Các thuộc tính cấu trúc và kiểu dữ liệu của hàng trong bảng được xác định bởi kiểu hàng.
* Định nghĩa khóa mô tả cấu trúc của khóa bảng.
* Danh mục khóa xác định xem khóa có phải là duy nhất hay không, nghĩa là nếu tất cả các bản ghi của bảng có các giá trị khóa khác nhau.



![image.png](https://images.viblo.asia/120e4387-dea4-466e-bace-3d233e1d9da9.png)


***Cách sử dụng***

![image.png](https://images.viblo.asia/21f0771c-6410-49e6-8e6f-c69d93202060.png)

### **3:Điểm khác biệt giữa Structure và Table type**

*Structure là định nghĩa cho vùng làm việc ( work area - Wa ) trong khi Table type là định nghĩa cho bảng nội bộ ( internal table  - IT ).*

***Table type***  
* Được sử dụng để xác định cấu trúc và các thuộc tính kiểu dữ liệu của một dòng của bảng nội bộ ( IT ) trong SAP ABAP. Nó có một tùy chọn để quản lý và truy cập dữ liệu trong bảng nội bộ.
* Các loại bảng mô tả cấu trúc và chức năng của các bảng bên trong chương trình ABAP. Các hàng của chúng có thể có bất kỳ loại hàng nào. Do đó, các loại bảng có kiểu hàng cơ bản có thể được xác định giống như các loại bảng đa chiều (loại bảng với một loại bảng là loại hàng) hoặc các loại bảng sử dụng cấu trúc với các thành phần giống bảng. 

**Structure type**:
* Là các đối tượng dữ liệu được tạo thành từ các thành phần khác nhau của bất kỳ kiểu dữ liệu nào được lưu trữ lần lượt trong bộ nhớ, số lượng trường.
*   Các kiểu có cấu trúc mô tả cấu trúc và chức năng của bất kỳ đối tượng dữ liệu có cấu trúc nào, đó là cấu trúc dữ liệu với các thành phần thuộc bất kỳ kiểu nào.
*   Một thành phần có thể là một trường có kiểu cơ bản hoặc bản thân nó có thể là một cấu trúc.
*   Một bảng cũng có thể được sử dụng như một thành phần trong một cấu trúc.
*   Một bảng cơ sở dữ liệu luôn có một cấu trúc và do đó mặc nhiên là một kiểu có cấu trúc. Tuy nhiên, các trường của bảng cơ sở dữ liệu chỉ có thể có kiểu cơ bản.


```
Data: lt_table1 type table of Structure_type, "Tạo Internal table từ struc
      lt_table2 type Table_type,          " tạo Internal table từ table type
      
Data: ls_struc type Structure, "Tạo struc từ cấu trúc của struc
      ls_struc2 like line of lt_table1. "Tạo struc từ một dòng dữ liệu trong table type
```


Cảm ơn các bạn đã đọc đến đây.