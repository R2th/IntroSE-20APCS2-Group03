Trong Ruby các chuỗi ký tự là một object của class String, ruby cung cấp rất nhiều methods để làm việc với String, bài viết này mình sẽ cùng tìm hiểu về một số methods của string.

## size, length, count
size, length là hai phương thức để lấy ra độ dài của chuỗi.
ví dụ:
```
irb(main):007:0> "hello ruby!".size
=> 11

irb(main):008:0> "hello ruby!".length
=> 11
```
Đối với string 2 phương thức size, length không có sự khác biệt, cả 2 đều cùng trả về độ dài của chuỗi và dưới đây là source của chúng.
```
VALUE
rb_str_length(VALUE str)
{
    return LONG2NUM(str_strlen(str, NULL));
}
```
 phương thức count của string trả về số lần xuất hiện của các ký tự là giao của các chuỗi truyền vào
 ví dụ :
 
 ```
 [31] pry(main)> "hello ruby".count("lloiu", "lu")
=> 3
 ```
 ở đây 2 chuỗi là truyền vào param là "lloiu" và "lu" giao của 2 chuỗi này là "lu" vậy nên nó sẽ đếm số lượng xuất hiện của ký tự "l" và "u". ở chuỗi trên "l" xuất hiện 2 lần và u xuất hiện 1 lần => tổng là 3.
## empty?
là phương thức dùng để kiểm tra xem chuỗi hiện tại có rỗng hay không, một chuỗi rỗng là chuỗi không có ký tự nào, nghĩa là chiều dài của chuỗi bằng 0.

ví dụ:

```
irb(main):015:0> "".empty?
=> true

irb(main):016:0> "".size
=> 0
```
## replace string
- sử dụng tr(from_str, to_str) : phương thức tr thay thế các ký tự trong to_str bằng các ký tự trong from_str tương ứng theo thứ tự
ví dụ:
```
irb(main):001:0> "hello ruby".tr("lae","ury")
=> "hyuuo ruby"
```
- sử dụng gsub: 
```
irb(main):005:0> 'hello ruby'.gsub(/abc/, '123')
=> "hello ruby"

irb(main):006:0> 'hello ruby'.gsub(/ell/, '303')
=> "h303o ruby"
```
=> tr khớp với các ký tự đơn (không thông qua biểu thức chính quy), do đó, các ký tự không cần xảy ra theo cùng một thứ tự trong đối số chuỗi đầu tiên. Khi tìm thấy một ký tự, nó được thay thế bằng ký tự được tìm thấy tại cùng một chỉ mục trong đối số chuỗi thứ hai nên nó sử dụng trong trường hợp thay thế các ký tự độc lập.

=> gsub được sử dụng khi bạn cần sử dụng biểu thức chính quy hoặc khi bạn muốn thay thế các chuỗi con dài hơn.

## include?
phương thức này dùng để kiểm tra xem chuỗi hiện tại có bao gồm một chuỗi khác không.

ví dụ:
```
irb(main):032:0> "hello ruby".include? "ruby"
=> true

irb(main):033:0> "hello ruby".include? "rails"
=> false
```

## chars
phương thức này sẽ trả về một mảng bao gồm tất cả các ký tự của một chuỗi

ví dụ:
```
irb(main):034:0> "hello ruby".chars
=> ["h", "e", "l", "l", "o", " ", "r", "u", "b", "y"]
```

## <<
là phương thức để append một string vào một string khác, thay vì dùng += mỗi khi "+" sẽ tạo ra một object khác đê lưu string mới thì với "<<" sẽ cho phép append trực tiếp vào chuỗi đó.
ví dụ:

```
irb(main):035:0> a = "hello ruby"
=> "hello ruby"
irb(main):036:0> a.object_
irb(main):036:0> a.object_id
=> 220
irb(main):037:0> a << " on rails"
=> "hello ruby on rails"
irb(main):038:0> a.object_id
=> 220
```
=> ở đây khi sử dụng "<<" thì object_id của biến a không thay đổi.

```
irb(main):042:0> a = "hello ruby"
=> "hello ruby"
irb(main):043:0> a.object_id
=> 260
irb(main):044:0> a += " on rails"
=> "hello ruby on rails"
irb(main):045:0> a.object_id
=> 280
```
=> khi sử dụng += object_id của a đã thay đổi.
## Tài Liệu Tham Khảo
https://www.rubyguides.com/2018/01/ruby-string-methods/