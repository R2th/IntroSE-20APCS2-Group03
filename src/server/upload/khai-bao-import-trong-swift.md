Một trong những bài học đầu tiên chúng ta học về phát triển phần mềm đó là làm thế nào để tổ chức các khái niệm và chức năng thành các đơn vị riêng biệt . Ở cấp độ nhỏ nhất, điều này có nghĩa là suy nghĩ về các types , methods và properties . Những phần này sau đó tạo thành nền tảng cho một hoặc nhiều modules, sau đó có thể được đóng gói thành Library hoặc Framework.

Theo cách này, khai báo ‘import’ là chất keo để giữ mọi thứ lại với nhau. 

Mặc dù nó khá quan trọng , nhưng hầu hết đá số các nhà phát triển Swift thông thường chỉ quen với cách khai báo cơ bản như dưới đây : 

`import <#module#>`

Ở bài viết này , mình sẽ giúp các bạn hiểu rõ hơn về việc khai báo import cũng như việc sử dụng nó 1 cách hợp lí nhất .

Việc khai báo import sẽ cho phép đoạn code của bạn truy cập được những cái mà nằm trong cả những module khác.
Tuy nhiên, nếu có nhiều hơn một module khai báo một function hay type cùng tên , trình biên dịch có thể sẽ không thể biết bạn muốn gọi đến đoạn code nào .

Để làm sáng tỏ điều này , hãy xem xét 2 module đại diện cho các cuộc thi của Triathlon và Pentathlon :

Triathlon bao gồm 3 sự kiện : swimming, cycling, and running.

```
// Triathlon Module
func swim() {
    print("🏊‍ Swim 1.5 km")
}

func bike() {
    print("🚴 Cycle 40 km")
}

func run() {
    print("🏃‍ Run 10 km")
}
```

Pentathlon bao gồm 5 sự kiện : fencing, swimming, equestrian, shooting, and running.

```
// Pentathlon Module
func fence() {
    print("🤺 Bout with épées")
}

func swim() {
    print("🏊‍ Swim 200 m")
}

func ride() {
    print("🏇 Complete a show jumping course")
}

func shoot() {
    print("🎯 Shoot 5 targets")
}

func run() {
    print("🏃‍ Run 3 km cross-country")
}
```

Nếu chúng ta import 1 trong 2 module riêng lẻ , chúng ta có thể tham chiếu từng chức năng của chúng bằng cách gọi tên của chúng mà không gặp vấn đề gì. 

```
import Triathlon

swim() // OK, calls Triathlon.swim
bike() // OK, calls Triathlon.bike
run() // OK, calls Triathlon.run
```

Nhưng nếu chúng ta import cả hai module lại với nhau, ở trong ví dụ này chúng ta không thể gọi đến hàm swim()  . Cả Triathlon và Pentathlon đều bao gồm swim() và run(), vì vậy để tham chiếu đến swim() là không rõ ràng .

```
import Triathlon
import Pentathlon

bike() // OK, calls Triathlon.bike
fence() // OK, calls Pentathlon.fence
swim() // Error, ambiguous
```

Vậy làm thế nào để ta có thể điều phối được chúng ?
=> Đơn giản chỉ bằng cách bao gồm gọi cả tên module, trình biên dịch sẽ hiểu được và code của chúng ta sẽ chạy ổn .

```
import Triathlon
import Pentathlon

Triathlon.swim() // OK, fully-qualified reference to Triathlon.swim
Pentathlon.swim() // OK, fully-qualified reference to Pentathlon.swim
```

Một cách khác để giải quyết xung đột tên API là thay đổi khai báo import để có tính chọn lọc hơn về những thứ mà module đó bao gồm .

### Importing Individual Declarations

Khai báo import có một form có thể chỉ định các structures, classes, enumerations, protocols, và type aliases cũng như functions, constants, và variables được khai báo ở cấp cao nhất:  

`import <#kind#> <#module.symbol#>`

Ở đây, 'kind' có thể là bất kỳ từ khóa nào sau đây:

![](https://images.viblo.asia/b9195c52-2094-42d4-aa56-e93df9e0f72a.png)

Ví dụ,  khai báo import sau chỉ thêm function swim() từ module Pentathlon: 

```
import func Pentathlon.swim

swim() // OK, calls Pentathlon.swim
fence() // Error, unresolved identifier
```

### Resolving Symbol Name Collisions

Khi nhiều symbol được tham chiếu bởi cùng tên trong code, trình biên dịch Swift sẽ giải quyết tham chiếu này bằng cách tham khảo các mục sau, theo thứ tự :

* Local Declarations
* Imported Declarations
* Imported Modules

Nếu bất kỳ sai lệch nào trong cách tổ chức khai báo, Swift không thể giải quyết sự không rõ ràng và gây ra lỗi biên dịch.

Ví dụ , import module Triathlon cung các phương thức swim(), bike(), và run() . Khai báo hàm swim() đã import từ Pentathlon ghi đè lên module Triathlon. Tương tự, hàm run() được khai báo local sẽ ghi đè symbol có cùng tên từ Triathlon và cũng sẽ ghi đè mọi khai báo hàm đã import .

```
import Triathlon
import func Pentathlon.swim

// Local function shadows whole-module import of Triathlon
func run() {
    print("🏃‍ Run 42.195 km")
}

swim() // OK, calls Pentathlon.swim
bike() // OK, calls Triathlon.bike
run() //  OK, calls local run
```

Nếu một khai báo local hoặc import xung đột với một tên module , trước tiên trình biên dịch sẽ khai báo và quay lại tìm kiếm đủ điều kiện trong module .

```
import Triathlon

enum Triathlon {
    case sprint, olympic, ironman
}

Triathlon.olympic // references local enumeration case
Triathlon.swim() // references module function
```

Trình biên dịch Swift không giao tiếp và không thể điều hòa các xung đột đặt tên giữa các module và khai báo local, vì vậy bạn nên biết về khả năng này khi làm việc với các phụ thuộc .