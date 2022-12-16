# 3. Hiểu biết về Ruby
```
Đặc điểm của ngôn ngữ Ruby?
``` 
Hướng đối tượng <br>
Thông dịch <br>
Phiên bản hiện nay 2.6.5<br>
**Tất cả đều là object?**  <br>
Mọi thứ trong Ruby đều là object, từ các giá trị boolean, number, ... thậm chí là class
```
Các kiểu dữ liệu
```
![](https://images.viblo.asia/128f9cc7-549c-45f0-8e8b-9063a6458501.png)
**Number** <br>
VD: **1.object** <br>
Trước ruby 2.4 thuộc class FixNum, BigNum <br>
Từ 2.4 trở đi thuộc class Integer <br>
**String** khi tạo 2 biến tên giống nhau thì có 2 ô nhớ <br>
**Symbol** tạo 2 biến thì sẽ chỉ có 1 ô nhớ <br>
**Range** 1...4 (1,2,3) và 1..4 (1,2,3,4) <br>
**Hash** khi khai báo cùng id 2 giá trị -> tự động lấy giá trị thứ 2. Thêm 1 ob vào hash: hash[mới], + , merge,...
```
Array
```
Map -> sau khi chạy hàm each thì giá trị ban đầu sẽ không thay đổi <br>
Map! -> sau khi chạy hàm each thì giá trị ban đầu sẽ thay đổi <br>
Collection -> sau khi chạy hàm each thì giá trị ban đầu sẽ không thay đổi <br>
Collection! -> sau khi chạy hàm each thì giá trị ban đầu sẽ thay đổi
```
Các loại biến?
```
Biến thực thể @a <br>
Biến class  @@a <br>
Biến toàn cục $a <br>
Biến cục bộ a <br>
Hằng -> có thay đổi <br>
**Phạm vi biến** <br>
Biến thực thể  có ý nghĩa trong instance method <br>
Biến class  có ý nghĩa trong instance method và class method
![](https://images.viblo.asia/c87ddddf-49ff-4115-96c9-7bc94612468c.PNG)
```
Làm thế nào để getter và setter trong Ruby?
```
attr_reader là một phương thức ruby tạo getter cho biến<br>
attr_writer là một phương thức ruby tạo setter cho biến<br>
attr_accessible là một phương thức Rails về cơ bản chỉ định một danh sách trắng các thuộc tính mô hình có thể được thiết lập thông qua gán khối<br>
attr_accessor là một phương thức ruby tạo getter / setter cho biến
```
Class method và Instance method trong Ruby?
```
Class method được khai báo bằng từ khóa self, class self, tên class.method <br>
```ruby
self.bar
class << self
  def bar
    puts 'class method'
  end
end
```
Sự khác biệt chính là các instance method chỉ làm việc trên một thể hiện của một lớp, do đó bạn phải tạo ra một thể hiện của các lớp để sử dụng chúng. Class method chỉ có thể được gọi trên các lớp còn instance method chỉ có thể được gọi trên một thể hiện của một lớp.
Class method chỉ có thể được gọi trên các lớp <br>
Các instance method chỉ làm việc trên một thể hiện của một lớp, do đó bạn phải tạo ra một thể hiện của các lớp để sử dụng chúng. <br>
```
So sánh: include và extend Module
``` 
#### extends
methods từ module được extends vào được gọi như là class method<br>
extends is a public method
#### include
methods từ module được include vào được gọi như là instance methods<br>
include is a private method
```
Blocks, Procs, Lambdas trong Ruby. So sánh chúng"
```
Block chỉ là tập hợp câu lệnh, không phải là đối tượng, chỉ truyền được 1 block vào method. <br>
Proc là đối tượng đại diện cho block <br>
Lambda là function được gọi từ bên trong function, và những gì lambda làm hoàn toàn độc lập với function gọi nó => hoạt động của nó giống như một global function.
#### So sánh procs vs blocks
Block không phải là đối tượng, chỉ truyền được 1 block vào method.
Proc là đối tượng, truyền được nhiều proc vào method
#### So sánh procs vs lambdas
Về cơ bản thì chức năng của Proc và Lambda gần như giống hệt nhau (thực chất Lambda chính là một đối tượng của Proc), nhưng chúng có 2 điểm khác nhau cơ bản. <br>
1. Lambda kiểm tra số lượng tham số đầu vào và trả về một ArgumentError nếu số lượng truyền vào không đúng với tham số được khai báo trong method của nó; còn proc thì không kiểm tra số lượng tham số đầu vào và mặc định tham số đó là nil. <br>
2. Khi chạy đến return thì proc ngay lập tức trả về giá trị, còn lambda thì vẫn chạy tiếp các câu lệnh dưới return trong phương thức.
```
Phân biệt map, select, collect, reject, detect, each, inject
```
map, select chạy qua từng phần tử trong mảng và thực hiện câu lệnh trong block, sau đó return về mảng kết quả.<br>
map! thay đổi mảng ban đầu<br>
collect: return về 1 mảng từ mảng ban đầu với điều kiện trong block<br>
collect! thay đổi mảng ban đầu<br>
reject: thì trái lại với collect<br>
detect: return về giá trị thỏa mãn trong block, nếu có nhiều giá trị thì chỉ lấy giá trị gần nhất<br>
inject vs each: đơn giản là chạy qua từng phần tử và thực hiện các câu lệnh trong block