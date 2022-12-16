Đơn giản là mỗi ngày đến công ty thì đồng nghiệp, sếp, khách hàng và mấy thằng bạn cờ hó luôn có rất nhiều câu hỏi về kỹ thuật dành cho mình. Tuy nhiên, không phải câu hỏi nào mình cũng có thể trả lời một cách tử tế được. Vì vậy, mình viết series này để trả lời những câu hỏi(chủ yếu về mặt kỹ thuật) mà bản thân thấy thích thú và muốn đào sâu. Âu cũng là một cách để note lại những kiến thức thú vị cho bản thân. Mình muốn làm điều này lâu rồi, nhưng từ khi biết đến Viblo, mình mới nhận ra nó là một nền tảng quá đỗi phù hợp cho việc này. Nào thì cùng quẩy bài viết đầu tiên!

Nhân tiện hôm nay có thằng bạn sắp đi phỏng vấn, nó hỏi mình 1 câu cũng khá hay, nên mình sẽ viết bài này để giải đáp thắc mắc của nó. 
Nguyên văn câu hỏi của nó là:
![](https://images.viblo.asia/63fcdc2a-80c1-4534-837a-9129e644eb59.png)
Thằng này nó hơi bị có vấn đề về khả năng sử dụng tiếng Việt, nên mình xin mạn phép được dịch câu hỏi của nó ra tiếng người là : 
>Vân cờ hó: "Ê cờ hó, mày có biết include, extend và prepend một module trong Ruby khác nhau chỗ nào không?"

Sau một hồi google, mình sẽ tổng hợp những điều mình hiểu được và trả lời nó trong bài viết này. Bắt đầu nhé! :joy::joy::joy: 

### Module trong Ruby là gì? 
Module là một tập hợp các methods, constant và class variable mà bạn muốn sử dụng trong một số hoàn cảnh.Khi code Ruby, các bạn sẽ thường thấy tên module đứng sau các keyword: **include**, **extend** hoặc **prepend**. 
**Module** về cơ bản cũng giống **class**, chỉ khác ở ***keyword khai báo*** (`module` thay vì `class`), và cách sử dụng. Module luôn đứng một mình, nó không kế thừa từ một module nào, và cũng không thể làm cha của một module nào hết. Cũng chính vì vậy, `module` được sử dụng với tính linh hoạt rất cao. 

***Vậy module dùng để làm gì?  Nếu nó giống class thì sao không dùng class cho rồi?***
> **Module** có thể mixes được, còn **class** thì không. 

**Mixin** là một trong những lợi ích đáng chú ý nhất khi sử dụng module mà class không có được. Để mình lấy một ví dụ cho các bạn dễ hiểu. Ví dụ về module [Comparable](https://ruby-doc.org/core-2.5.3/Comparable.html) , nếu class của bạn có định nghĩa sẵn toán tử <=> để so sánh 2 object, bạn chỉ cần **mix** (ở đây sử dụng `include`) thêm module [Comparable](https://ruby-doc.org/core-2.5.3/Comparable.html) là bạn sẽ có thêm một loạt các instance method <, <=, ==, >=,  > và between? để sử dụng. 
```
class SizeMatters
  include Comparable
  attr :str
  def <=>(other)
    str.size <=> other.str.size
  end
  def initialize(str)
    @str = str
  end
  def inspect
    @str
  end
end

s1 = SizeMatters.new("Z")
s2 = SizeMatters.new("YY")
s3 = SizeMatters.new("XXX")
s4 = SizeMatters.new("WWWW")
s5 = SizeMatters.new("VVVVV")

s1 < s2                       #=> true
s4.between?(s1, s3)           #=> false
s4.between?(s3, s5)           #=> true
[ s3, s2, s5, s4, s1 ].sort   #=> [Z, YY, XXX, WWWW, VVVVV]
```
Nếu sử dụng quan hệ kế thừa của **class SizeMatters** để tạo ra các method trên, e rằng quá trình override các method sẽ rất vất vả và chẳng tiện lợi tý nào. Bằng cách mixes module `Comparable`, chúng ta có thể tái sử dụng code và tạo ra các chức năng liên quan đến việc so sánh hai objects chỉ bằng đúng một dòng code. Đỡ mất sức hơn nhiều đúng không nào?

**Có những cách nào để mix một module vào một class?**

Có 3 cách thường thấy để mix một module vào một class: **include**, **extend** và **prepend** .

Lợi ích và khái niệm **module**, cơ bản chỉ cần hiểu như vậy là đủ cho mục đích bài viết này. Nếu các bạn muốn hiểu sâu hơn, mình khuyến khích các bạn đọc [The Ruby Programming Language](https://theswissbay.ch/pdf/Gentoomen%20Library/Programming/Ruby/The%20Ruby%20Programming%20Language%20-%20Oreilly.pdf) của O'Reilly nhé.

### Ancestors chain của một class.
Đây là khái niệm mà các bạn cần hiểu, để mình có thể giải thích được sự khác nhau của **include**, **extend** và **prepend**. Vậy **ancestors chain của một class** là gì?
Ancestors chain của một class sẽ được hiển thị khi chúng ta gọi method `.ancestors` như sau: 
```
irb(main):022:0> String.ancestors
=> [String, Comparable, Object, Kernel, BasicObject]
```
Ancestors của một class là tập hợp của: 
* Tất cả các **class** mà nó kế thừa.
* Tất cả các **module** được mix trong nó.

`Ancestors chain` đơn giản là một chuỗi chứa tên của các `ancestor`. Như chúng ta đã thấy với class `String`, đứng ở cuối chuỗi là `BasicObject`(`class` này sẽ luôn đứng cuối chuỗi `Ancestors chain` của mọi `class`) và đứng ngay sau **module** `Comparable` là class `Object`(`superclass` của mọi `class`). Ta có thể hiểu thêm về chuỗi này qua sơ đồ dưới đây:
![](https://images.viblo.asia/6b99bcab-a34c-458e-a40f-1c94fd9d9a5b.png)
**Hình 1: Ruby object hierachy**

Khi ta gọi một method cho các String instance (giả sử là "Hieu"), trình thông dịch Ruby sẽ tìm method này **lần lượt** trong các thành phần của chuỗi **String's ancestors chain**. Sẽ xảy ra 2 trường hợp:
* **TH1:**  Ta gọi một method **được định nghĩa trong chuỗi ancestors chain**. Ví dụ ta gọi `"Hieu".>"ha"` , chúng ta sẽ tìm thấy method `.>` ở **module** `Comparable` (phần tử thứ 2 của chuỗi ancestors). Và câu chuyện đơn giản là code sẽ chạy như thế này:
```
"Hieu".>"ha"
=> true
```

* **TH2:** Ta gọi một method **không được định nghĩa trong chuỗi ancestors chain**. Ví dụ ta gọi `"hi".ahihi`, trình thông dịch Ruby sẽ tìm method `.ahii` lần lượt ở trong các phần tử của chuỗi và dù duyệt đến phần tử cuối cùng `BasicObject`  nhưng nó vẫn không tìm thấy. Kết thúc của chuỗi hành động này là việc gọi ra **private method** `method_missing` của phần tử `BasicObject` :
```
irb(main):026:0> "hi".ahihi
Traceback (most recent call last):
        4: from /home/troublehfrom18/.rbenv/versions/2.6.0/bin/irb:23:in `<main>'
        3: from /home/troublehfrom18/.rbenv/versions/2.6.0/bin/irb:23:in `load'
        2: from /home/troublehfrom18/.rbenv/versions/2.6.0/lib/ruby/gems/2.6.0/gems/irb-1.0.0/exe/irb:11:in `<top (required)>'
        1: from (irb):26
NoMethodError (undefined method `ahihi' for "hi":String)
```

Như vậy là các bạn và thằng Vân đã hiểu cơ bản về khái niệm **Ancestors chain** . Mình sẽ bắt đầu đi vào trả lời câu hỏi chính của bài viết nhé. 
### Include 
Như mình đã nói ở trên, có 3 cách cơ bản để mix một `module` vào một `class` (tương ứng với 3 keyword trong câu hỏi của Vân). Sử dụng keyword `include` là cách phổ biến nhất.
Ví dụ, ta thử mix module `Comparable` vào một class mới khởi tạo `SizeMatters`. Lúc này, hãy cùng xem chuỗi `Ancestors chain` của class `SizeMatters` thay đổi thế nào trước và sau khi `include` thêm module `Comparable`:
```
#Truoc khi include Comparable
irb(main):002:0> class SizeMatters
irb(main):003:1> end
=> nil
irb(main):004:0> SizeMatters.ancestors
=> [SizeMatters, Object, Kernel, BasicObject]
```
```
#Sau khi include Comparable
irb(main):005:0> class SizeMatters
irb(main):006:1> include Comparable
irb(main):007:1> end
=> SizeMatters
irb(main):008:0> SizeMatters.ancestors
=> [SizeMatters, Comparable, Object, Kernel, BasicObject]
```

Từ những gì thấy được, ta suy ra rằng, việc `include` module vào trong class tương đương với việc thêm module này vào chuỗi `Ancestors chain`. Từ đó, các instance của class `SizeMatters` có thể gọi ra các method của module `Comparable` dưới dạng **instance method**. Điều này thì ngay từ phần hiểu về khái niệm `Ancestor chain` các bạn đã có thể tự suy ra, chẳng có gì đặc biệt cả. Nếu muốn thấy điều đặc biệt, chúng ta hãy quan sát điều tương tự với các từ khóa `prepend` và`extend`.

### Prepend
Giờ thì ta làm tương tự với từ khóa `prepend`
```
irb(main):005:0> class SizeMatters
irb(main):006:1> prepend Comparable
irb(main):007:1> end
=> SizeMatters
irb(main):008:0> SizeMatters.ancestors
=> [Comparable, SizeMatters, Object, Kernel, BasicObject]
```
Ồ, các bạn thấy rồi phải không. Và chúng ta có thể trả lời cho **thằng Vân** thấy được điểm khác nhau đầu tiên giữa `prepend` và `include`, đó là là **vị trí của module được add vào chuỗi** `Ancestor chains`:
* Với `include`, module sẽ được thêm vào vị trí nằm **giữa class chứa module và superclass của nó .** Nếu có nhiều module được include, thì module cuối cùng sẽ là module ở gần class hiện tại nhất. Ví dụ:
```
irb(main):001:0> class SizeMatters
irb(main):002:1> include Comparable
irb(main):003:1> include Enumerable
irb(main):004:1> include Hieu #Đã define ở trên
irb(main):005:1> end
irb(main):006:0> SizeMatters.ancestors
=> [SizeMatters, Hieu, Enumerable, Comparable, Object, Kernel, BasicObject]
```
* Với `prepend`, module sẽ được thêm vào vị trí đầu của chuỗi `Ancestors chain` . 
```
irb(main):003:0> class SizeMatters
irb(main):004:1> prepend Comparable
irb(main):005:1> prepend Enumerable
irb(main):006:1> prepend Hieu
irb(main):007:1> end
=> SizeMatters
irb(main):008:0> SizeMatters.ancestors
=> [Hieu, Enumerable, Comparable, SizeMatters, Object, Kernel, BasicObject]
```
Đối với `prepend`, khi instance của `SizeMatters` gọi một method, trình thông dịch Ruby sẽ tìm method đó ở trong module `Hieu` đầu tiên. Điều này cho phép chúng ta có thể custom lại method của class SizeMatters trong module gần nhất mà chúng ta `prepend`. Đôi lúc điều này sẽ có lợi với một class đã tồn tại mà phần source code của nó quá dài dòng hoặc khó để tìm kiếm và sửa.
Chốt lại hộ thằng **Vân** là : sử dụng `prepend` và `module` khác nhau cơ bản như trên. :thumbsup::thumbsup::thumbsup:

### Extend
Vậy sử dụng `extend` khác hai phương pháp trên ở chỗ nào. Ta lại làm 1 ví dụ tương tự với `extend`
```
irb(main):003:0> class SizeMatters
irb(main):004:1> extend Comparable
irb(main):005:1> end
=> SizeMatters
irb(main):006:0> SizeMatters.ancestors
=> [SizeMatters, Object, Kernel, BasicObject]
```
Kỳ lạ nhỉ, chuỗi `Ancestors chain` chẳng có gì thay đổi cả. Vậy là sử dụng extend sẽ không thay đổi chuỗi `Ancestors chain` của class `SizeMatters`. Tuy nhiên, nó lại thay đổi chuỗi `Ancestors chain` của một class khác. Cùng nhìn đoạn code dưới đây:
```
irb(main):008:0> SizeMatters.singleton_class
=> #<Class:SizeMatters>
irb(main):007:0> SizeMatters.singleton_class.ancestors
=> [#<Class:SizeMatters>, Comparable, #<Class:Object>, #<Class:BasicObject>, Class, Module, Object, Kernel, BasicObject]
```
Như các bạn có thể thấy, module `Comparable` được thêm chuỗi `Ancestors chain` của class `#<Class:SizeMatters>`. Nó là **singleton class** của class `SizeMatters`. 

Đến đây các bạn sẽ lại tự hỏi **singleton class** ( a.k.a eigen class, anonymous class) là gì? Nó chỉ đơn giản là một class được tạo ra để chứa mọi thứ liên quan đến **singleton method**. Vậy **singleton method** là gì? Nó là method được định nghĩa riêng cho 1 **instance object**. Kiểu như này:
```
irb(main):001:0> a = "hi"
=> "hi"
irb(main):002:0> def a.dodai
irb(main):003:1> puts "Do dai cua tu la #{size}"
irb(main):004:1> end
irb(main):005:0> a.dodai
Do dai cua tu la 2
=> nil
```
Cụ thể về singleton class và singleton object, mình lại khuyên các bạn nên đọc quyển [The Ruby Programming Language](https://theswissbay.ch/pdf/Gentoomen%20Library/Programming/Ruby/The%20Ruby%20Programming%20Language%20-%20Oreilly.pdf) chương 7 để hiểu rõ. Ở bài viết này các bạn chỉ cần hiểu thế là đủ. 

Trở lại với câu hỏi chính, việc add module vào `Ancestors chain` của **singleton class**  `#<Class:SizeMatters>` gây ra một hệ quả nữa. Đó là các method ở trong module được `extend` sẽ **chỉ có thể gọi dưới dạng class method, thay vì instance method như** `prepend` và `include` .
```
irb(main):007:0> module Hieu
irb(main):008:1> def xinchao
irb(main):009:2> puts "Xinchao"
irb(main):010:2> end
irb(main):011:1> end
=> :xinchao
irb(main):012:0> class SizeMatters
irb(main):013:1> extend Hieu
irb(main):014:1> end
=> SizeMatters
#Thử gọi instance_method
irb(main):015:0> SizeMatters.new.xinchao
Traceback (most recent call last):
        4: from /home/troublehfrom18/.rbenv/versions/2.6.0/bin/irb:23:in `<main>'
        3: from /home/troublehfrom18/.rbenv/versions/2.6.0/bin/irb:23:in `load'
        2: from /home/troublehfrom18/.rbenv/versions/2.6.0/lib/ruby/gems/2.6.0/gems/irb-1.0.0/exe/irb:11:in `<top (required)>'
        1: from (irb):15
NoMethodError (undefined method `xinchao' for #<SizeMatters:0x000056350e08acc0>)
#Gọi class method
irb(main):016:0> SizeMatters.xinchao
Xinchao
```

Vậy chốt lại cho **thằng Vân**, có hai điểm khác nhau chính giữa việc sử dụng `extend` và `prepend`, `include`:
* Module được add vào chuỗi `Ancestors chain` của **singleton class**.
* Method của module được gọi dưới dạng **class method**.

-----
Chốt lại khá nhiều lần rồi, đây có vẻ là một câu trả lời **đầy đủ nhất mình có thể đưa ra** cho **Vân** rồi nhé. Câu trả lời này có thể chưa đầy đủ, các bạn hãy bổ sung thêm câu trả lời của bản thân ở dưới phần comment. Điều đó sẽ giúp ích cho mình rất nhiều. 

Ngoài ra, đọc xong bài viết này, có lẽ các bạn sẽ lại đặt thêm tầm 1000 câu hỏi nữa kiểu: 
* Lợi ích của singleton method, singleton class? 
* Ngoài mixin, module còn có thể được sử dụng như thế nào? 
* Làm sao để vừa sử dụng method của module dưới cả hai dạng instance method và class method?
..................

Đấy là lý do mình làm series trả lời câu hỏi này. Các bạn hãy comment thêm các câu hỏi của các bạn về Ruby On Rails, chúng ta sẽ cố gắng cùng nhau tìm câu trả lời. Mình nghĩ đây là cách hay nhất để chúng ta cùng nhau phát triển kỹ năng lập trình của bản thân. Yêu các bạn và ghét thằng **Vân.**


-----
References: 

Léonard Hetsch: https://medium.com/@leo_hetsch/ruby-modules-include-vs-prepend-vs-extend-f09837a5b073

Ruby-doc: https://ruby-doc.org/core-2.5.3/Comparable.html#method-i-3C

O'Reilly: https://theswissbay.ch/pdf/Gentoomen%20Library/Programming/Ruby/The%20Ruby%20Programming%20Language%20-%20Oreilly.pdf