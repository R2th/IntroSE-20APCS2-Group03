## Null safety in Kotlin

### Kiểu Null và Non-Null trong Kotlin
Hầu hết trong các ngôn ngữ lập trình đều giải quyết vấn đề null theo những cách khác nhau, và cách  trong Kotlin cũng khá riêng biệt và khác so với các ngôn ngữ khác. Nhưng luật chung đều là : nếu 1 biến có thể null, compiler sẽ bắt chúng ta đối phó với biến đó theo 1 cách nào đó. Kotlin sẽ ngăn cản chúng ta khai báo 1 biến với giá trị **null**, nếu bạn khai báo thế này:
```
var a: Int = null
a.toString()
```
sẽ ngay lập tức nhận được 1 thông báo kiểu như: **variable a must be initialized**, hay biến a phải không được phép để **null** mà phải gán giá trị cho nó. Điều này khá bất tiện nhưng lại rất an toàn, chúng ta sẽ không bị gặp 1 trong những lỗi phổ biến nhất trong lập trình: **NullpointerException**, lỗi rất hay gặp trong Java hay cũng như các ngôn ngữ khác. Một tính năng rất hay của Kotlin nhỉ :)

Tuy nhiên, cũng có nhiều trường hợp ta cần khai báo 1 số giá trị bằng **null** chứ. Như trong trường hợp để giải phóng bộ nhớ với GC hay những biến có các trường hợp không truy xuất đến nó. Trong Kotlin, cách để xác định rằng 1 biến có thể **null** bằng cách thêm dấu hỏi chấm ("?") vào cuối kiểu khai báo của nó. Biến a vẫn có kiểu là **Int** bình thường, nhưng giờ đây nó có thể đường hoàng **null** và không bị compiler bắt bẻ gì nữa. Mọi thứ đều là đối tượng trong Kotlin (ngay cả các kiểu nguyên thủy của Java), nên mọi thứ có thể **null**. do đó chúng ta cũng có thể có một số nguyên nullable
Ví dụ:
 
```
var a: Int? = null
a.toString()
```

### Lời gọi an toàn
Khi gọi đến các biến có thể **null**, rất có thể xảy ra lỗi, vì vậy chúng ra phải sử dụng 1 "safe call". Hãy cùng xem ví dụ sau:
```
var a: String? = null
var b = a?.length
print(b)
```
Biến a là 1 biến có thể **null**, và thực tế bên trên có giá trị null. Khi đó, nó được sử dụng để lấy giá trị cho biến b. Dấu "?" ở "a?" sẽ kiểm tra xem a có **null** hay không, nếu có,** a?.length** sẽ không được truy xuất tới và b sẽ có giá trị **null**. Ngược lại nếu a khác null, giả sử được gán giá trị là "Kotlin" chẳng hạn, kết quả in ra sẽ là 6. 
Điều này sẽ giúp tránh lỗi **NullPointerException**, kể cả khi cả a và b đều có giá trị **null** 

Toán tử !!
Ví dụ bên trên, khi a = null  thì **a?.length** sẽ không được gọi. Nhưng nếu vẫn muốn gọi đến và để xuất hiện lỗi **NullPointerException** thì phải làm thế nào. Chỉ cần thay "?" bằng toán tử "!!". Ở ví dụ :
```
var a: String? = "Kotlin"
var b = a!!.length
print(b)
```
vẫn chạy bình thường và in ra kết quả là 6.
Còn a được gán với giá trị **null** thì sẽ vẫn chạy hết đoạn code trên và xảy ra lỗi **NullPointerException**. Khi sử dụng toán tử này hãy chắc chắn biến của bạn không bao giờ null để tránh việc kiểm tra **null** của trình biên dịch.

### Toán tử Elvis

Nếu 1 đối tượng có thể mang giá trị null và ta muốn kiểm tra giá trị của nó, ta sẽ cần sử dụng đến toán tử "?:". xét ví dụ sau:

`var b = a?.length ?: 0`

Trông khá giống toán tử 3 ngôi nhỉ. Nếu **a?.length** không null thì b sẽ có giá trị của **a?.length**, ngược lại thì nó sẽ có giá trị bằng 0

Bên trên mình đã giới thiệu sơ lược về ***safety trong Kotlin***. Do kiến thức còn hạn chế nên không thể không tránh khỏi những lỗi hay thiếu sót. Mong các bạn có thể góp ý dưới phần comment để chúng ta cùng giải quyết.