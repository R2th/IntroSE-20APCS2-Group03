Như chúng ta đã biết, class và module chính là nền tảng của lập trình hướng đối tượng. Và trong Ruby thường có câu nói là: "Hầu hết mọi thứ trong Ruby đều là Object". Ở bài viết này, mình sẽ giới thiệu cho các bạn về class, module và object đã được tổ chức như thế nào trong bộ nhớ và quá trình thực thi một object trong Ruby sẽ ra sao.
### Ruby Object
Một cấu trúc của Ruby object, sau khi được khởi tạo trong memory thì sẽ tồn tại những trường sau:
* klass: một pointer trỏ đến class object của object đó.
* iv_tbl: "Instance Variable Table", một hashtable chứa các biến instance thuộc về object đó.
* flags: một tập các cờ trạng thái Boolean của Object như cờ báo trạng thái Object bị hỏng, bị garbage collection đánh dấu, bị khóa ...

Đối với Ruby Class và Ruby Module cũng có cấu trúc tương tự ruby object, tuy nhiên nó có thêm 2 trường sau:
* m_tbl: "Method Table", một hashtable chứa instance method của class hoặc module đó.
* super: con trỏ trỏ đến lớp cha của nó

Các field trên đóng vai trò rất lớn trong quá trình tìm kiếm một method lúc gọi hàm, và điều quan trọng là cần phải hiểu rõ nó, cũng như cần chú ý đến sự khác biệt giữa con trỏ klass và super của một class object.

Và có một lưu ý quan trọng ở đây là: Mỗi class trong Ruby chính là một class object của lớp ***Class***,  và lớp ***Class*** được kế thừa từ ***Module***, vì vậy cũng có thể nói tất cả class đều là module. Tuy nhiên, có sự khác biệt ở đây, đó là các class không thể mixed in vào class khác, cũng như các class không thể extend vào object, tuy nhiên module thì có thể.
### The rules
Khi đã hiểu rõ cấu trúc của object, class và module trong ruby, thì quá trình tìm kiếm method của một đối tượng dường như là khá đơn giản và dễ hiểu, khi một Object gọi một method, quá trình đó diễn ra theo các bước sau:
* Ruby sẽ lần theo con trỏ kclass của Object để tìm kiếm method đó trong bảng m_tbl của class mà con trỏ kclass trỏ đến
* Nếu không có method nào được tìm thấy, Ruby sẽ tiếp tục lần theo con trỏ super của class này và tìm kiếm method trong bảng m_tbl của superclass
* Quá trình lần theo con trỏ super này tiếp diễn cho đến khi con trỏ super nhận giã trị nil hoặc không tồn tại
* Nếu method không được tìm thấy ở bất ký đối tượng nào, Ruby sẽ gọi method method_missing của Object đã trực tiếp gọi method. Quá trình này tiếp diễn một lần nữa đối với việc tìm kiếm method_missing.

Để hiểu rõ hơn quá trình trên diễn ra như thế nào, chúng ta sẽ lần lượt đi vào chi tiết từng ví dụ bên dưới.
### Class inheritance
Ở phần này, chúng ta cùng tìm hiểu khi một class kế thừa từ một class khác thì điều gì sẽ xảy ra. Và cùng tham khảo một ví dụ khi một object gọi hàm thì việc thực thi method sẽ diễn ra như thế nào ?
Việc diễn giải quá trình tìm kiếm một method trên có thể gây ra sự nhầm lần, cho nên mình sẽ bắt đầu với 1 ví dụ đơn giản. Bên dưới là một class đơn giản được định nghĩa trong ruby như sau:
```
class A
end
```
Đoạn code trên sẽ tạo ra một cấu trúc như sau trong memory
![Data structures for a single class](https://images.viblo.asia/d3fdc15f-77e0-4133-96cd-b73817ff94b1.png)

Các hình chữ nhật có viền đôi sẽ đại diện cho một class object, mà con trỏ klass của object này sẽ trỏ đến **Class** object. Trong có vẻ rối nhỉ :v. Trong Ruby, thì một class được định nghĩa, thì nó cũng là một class object thuộc về class **Class**.Và để cho dễ hiểu, thì đối với những mục sau, chúng ta sẽ mặc định bỏ qua các con trỏ klass trỏ vào Class, Module, Object để tránh loạn cào cào :v: 

Còn con trỏ super của class A trỏ đến class Object, nghĩa là class A kế thừa từ class Object. 
Tiếp theo, chúng ta khởi tạo một class kế thừa từ class A ở trên như sau:
```
class B < A
end
```

Đối với  việc thừa kế class, thì chúng ta chỉ cần follow theo con trỏ super, cấu trúc data của class B khi kế thừa class A như hình dưới
![One level of inheritance](https://images.viblo.asia/1d7f6c2d-824c-4c4a-9c9f-415353fdaadf.png)

### Class instantiation
Bây giờ chúng ta sẽ cùng tìm hiểu quá trình tìm kiếm một method khi mà một method được gọi sẽ thực hiện như thế nào. Đầu tiên chúng ta sẽ khởi tạo một đối tượng của class B:
```
obj = B.new
```

Đoạn code trên sẽ khởi tạo một object mới, và set con trỏ klass của nó đến class B, vì nó là một đối tượng của class B.
![Class instantiation](https://images.viblo.asia/739e3ab3-ee48-4c7d-ac9b-f3beb2ceef20.png)

Khi chúng ta thực hiện gọi 1 method:
```
obj.to_s
```
Thì quá trình thực hiện sẽ như sau:
1. Con trỏ klass của obj đang trỏ đến clas B, thực hiện tìm kiếm method đó tong field m_tbl của class B.
2. Nếu không có method thỏa mãn được tìm thấy trong B, thì nó sẽ lần theo con trỏ super của B, lúc này đang trỏ đến A, và cũng thực hiện tìm kiếm method đó trong A.
3. Tương tự, nếu như không có method thõa mãn trong A, thì nó sẽ tiếp tục lần theo con trỏ super của A, đang trỏ đến Object, và sau đó tiếp tục tìm kiếm như vậy.
4. Class Object chứa method ***to_s***, như vậy method này sẽ được thực thi, trả về giá trị như là ***"#<B:0x1cd3c0>"***. Một method sẽ dựa vào con trỏ klass để xác định tên của class nào sẽ được hiển thị, do đó B sẽ được hiển thị ở kết quả trả về, ngay cả khi hàm đó là hàm trong class Object.
### Including modules
Ok, bây giờ chúng ta tiếp tục đặt câu hỏi, có bao giờ bạn thắc mắc là làm thế nào, khi include một module vào một class, thì làm thế nào mà class đó có thể nhận biết được các hàm được viết trong module ? Cùng xem nhé. Mọi thứ bắt đầu phức tạp rồi đây.

Ruby xử lí việc include module bằng một proxy class có tên là ICLASS. Khi chúng ta include một module vào một class, thì Ruby sẽ chèn một ICLASS đại diện cho module được include đó. Để có thể hiểu rõ hơn, chúng ta cùng tham khảo ví dụ bên dưới.
Chúng ta khởi tao một module có tên là Mixin, sau đó include module đó vào class A.
```
module Mixin
    def mixed_method
        puts "Hello from mixin"
    end
end

class A
    include Mixin
end
```
Và dưới đây là cấu trúc của nó trong memory
![](https://images.viblo.asia/d0fb4c7b-b071-4502-8eef-70ed668d68aa.png)

Khi chúng ta include một module vào trong class, thì một ICLASS được sinh ra (proxy class), nó cũng chứa các con trỏ trỏ đến bảng iv_tbl and m_tbl giống như module Mixin gốc vậy, hay nói cách khác nó là bản sao của module Mixin gốc. Nó sẽ chèn vào giữa super link trỏ từ class A đến class Object.

Từ diagram, chúng ta có thể dễ dàng thấy rằng tại sao lại cần đến proxy class: lý do là vì mỗi module chỉ có một con trỏ super nên nếu module Mixin gốc được chèn trực tiếp vào thì nó không thể trỏ đến một lớp superclass thứ 2 (trong trường hợp có một class hay module khác kế thừa từ nó)

### The singleton class
Singleton class (hay còn gọi là metaclass hoặc là eigenclass) cho phép một object có thể định nghĩa những method khác so với các object còn lại thuộc cùng 1 class. Dưới đây là một ví dụ về cách định nghĩa một singleton class
```
class A
end

objA = A.new
objB = A.new
objA.to_s # => "#<A:0x1cd0a0>"
objB.to_s # => "#<A:0x1c4e28>"

class << objA # Open the singleton class of objA
    def to_s; "Object A"; end
end

objA.to_s # => "Object A"
objB.to_s # => "#<A:0x1c4e28>"
```

Đoạn code **class << objA** sẽ tạo ra một singleton class của objA. Instance method được add vào trong singleton class sẽ được xem như là một instance method của object A, điều trên được mô tả như cấu trúc bên dưới.
![](https://images.viblo.asia/0d9f7491-63a9-4ea4-984a-3ff13b1cef45.png)

Ở đây, singleton class được xem là một virtual class (lớp ảo), nó không thể được khởi tạo, cũng như là chúng ta hoàn toàn k thể truy vấn được chúng ở trong Ruby. Khi chúng ta truy vấn xem object A thuộc class nào, thì sẽ lần lượt duyệt qua các con trỏ klass và super cho đến khi gặp một nonvirtual class thì sẽ dừng lại, điều này dẫn đến một chú ý rằng class của một object đôi khi không matcth với con trỏ klass của chúng.
Và cái tên singleton class được gọi là singleton thực ra là do mỗi object thì chỉ có thể tồn tại một singleton class. Ruby cho phép chúng ta khởi tạo các singleton class cho hầu hết các object, tuy nhiên đối với các giá trị Fixnums hoặc symbols, thì điều đó không được phép.
### Method missing
Và sau tẩt cả những cái nhập nhằng ở trên, thì method_missing lại rất đơn giản, nó chỉ focus theo một rule như sau: nếu việc tìm kiếm một method cho object thất bại, thì việc tìm kiếm method lại lập lại 1 lần nữa, tuy nhiên thay vì tìm kiếm method được gọi ban đầu, thì nó sẽ tìm kiếm method có tên là method_missing, với giá trị đầu vào tương tự như ở method được gọi ban đầu.
Mặc định method_missing của class Object sẽ bắn ra một exception.

Nguồn tham khảo: https://www.amazon.com/Advanced-Rails-Building-Industrial-Strength-Record/dp/0596510322