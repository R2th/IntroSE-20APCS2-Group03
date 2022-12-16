Value type và reference type là những kiến thức cực kỳ cơ bản trong bất cứ ngôn ngữ lập trình nào mà một lập trình viên đều phải nắm được. Để hiểu rõ hơn bản chất và sự khác nhau của hai loại này, bài viết này sẽ cùng phân tích và đi sâu vào chúng một cách chi tiết.

### Định nghĩa

Value type: Mỗi instance giữ một bản copy data của nó. Nó tạo ra một instance mới khi ta gán cho một biến hoặc một hằng số, hay khi truyền vào một function.

Reference type: Mỗi instance đều chia sẻ chung một bản copy duy nhất của data. Một khi được khởi tạo, thì khi gán nó cho một biến hoặc hằng số, hoặc khi truyền vào một function, nó sẽ trả về một tham chiếu tới chính instance đó.

Hãy cùng xem qua đoạn code sau:
```
class Tree {
    var yearOld = 1
}

var bigTree = Tree()
var smallTree = bigTree

smallTree.yearOld = 3

print("Big tree is \(bigTree.yearOld) years old")
print("Small tree is \(smallTree.yearOld) years old")
```

Output:
```
Big tree is 3 years old
Small tree is 3 years old
```

Cả hai instance bigTree và smallTree đều là reference type, chúng cùng chia sẻ một bản copy của Tree, vì vậy khi thay đổi giá trị của instance này thì ngay lập tức giá trị của instance kia cũng đổi theo.

Chú ý: Từ ví dụ trên ta đã thấy rõ class là reference type, điều này có nghĩa là biến của một class sẽ không lưu trữ một instance, mà nó tham chiếu đến vị trí trong bộ nhớ (heap) nơi lưu trữ instance đó.

Vậy thì nếu ta thay đổi var thành let thì chuyện gì sẽ xảy ra? Thực tế thì nó không ảnh hưởng gì đến kết quả cả, nó vẫn in ra là 3 years old.
```
let bigTree = Tree()
let smallTree = bigTree
```

Bởi lý do class là reference object, nên sự khác biệt duy nhất giữa let và var là khả năng gán lại biến cho một class cùng type khác. Vì vậy, keyword let và var không hề ảnh hưởng gì đến biến của class.

Ví dụ:
```
let bigTree = Tree()
let smallTree = bigTree
let mediumTree = bigTree

smallTree = mediumTree
smallTree = Tree()
```

Đoạn code trên sẽ gây ra lỗi compile vì ta đã cố gán giá trị cho smallTree mặc dù nó đã được khởi tạo, và bởi nó được khai báo với let (hằng số) nên đoạn code trên không thể thực thi được.
Tuy nhiên nếu ta khai báo smallTree với keyword var thì ta hoàn toàn có thể gán lại cho nó bất cứ giá trị cùng kiểu nào, hoặc thậm chí khởi tạo lại nó.

Nếu Tree được khai báo là struct như ví dụ dưới đây thì sao?

```
struct Tree {
    var yearOld = 1
}

let bigTree = Tree()
let smallTree = bigTree

smallTree.yearOld = 3
```

Do Tree là một struct, và smallTree được khai báo là một let constant, nên ta không thể thay đổi giá trị của yearOld như ta có thể làm với class ở trên.

Bởi vì struct là value type, và việc sử dụng let trong struct sẽ khiến cho object trở thành một constant. Khiến nó không thể được thay đổi hay gán lại giá trị mới thậm chí với cả các biến của nó. Tuy nhiên một struct khai báo với var hoàn toàn có thể thay đổi các biến của nó.

Kết quả là đoạn code trên sẽ bị fail.

Lưu ý: Đối với value type, nếu ta muốn gán lại giá trị cho object hoặc thay đổi biến bên trong object, ta cần khai báo nó là mutable (var).

```
var bigTree = Tree()
bigTree.yearOld = 3

var smallTree = bigTree
smallTree = Tree()
smallTree.yearOld = 5

print("Big tree is \(bigTree.yearOld) years old")
print("Small tree is \(smallTree.yearOld) years old")
```

Output:
```
Big tree is 3 years old
Small tree is 5 years old
```

Lưu ý: Khi ta thay đổi một value type, thì thực tế ta không thay đổi giá trị của nó mà ta thay đổi biến đang giữ giá trị đó. 

Struct không phải là value type duy nhất và class cũng không phải là reference type duy nhất trong swift. Dưới đây là một số kiểu dữ liệu khác:

| Value type | Reference type |
| -------- | -------- |
| Int     | Functions     |
| Double     | Closures     |
| String     | Class     |
| Array     |      |
| Dictionary     |      |
| Set     |      |
| Struct     |      |
| Enum     |      |
| Tuple     |      |

### Khi nào ta chọn value type, khi nào chọn reference type?


Làm sao để ta có thể quyết định nên sử dụng loại nào khi tạo một type mới? Rất nhiều API trong Cocoa subclass từ NSObject (reference type), vì vậy ta phải sử dụng class. Trong những trường hợp còn lại, ta có thể quyết định dựa trên các yếu tố sau:

Sử dụng value type:

- Khi sử dụng toán tử == để so sánh instance data. Toán tử này dùng để so sánh giá trị
- Ta muốn các bản copy có trạng thái độc lập
- Dữ liệu sẽ được sử dụng qua nhiều thread. Vì vậy ta không phải lo lắng về việc dữ liệu bị thay đổi từ thread khác.


Sử dụng reference type khi:

- Khi sử dụng === để so sánh. Toán tử này so sánh hai object, link tới địa chỉ memory lưu trữ dữ liệu này
- Khi ta muốn tạo ra trạng thái cùng chia sẻ, mutable.


### Reference và value type được lưu trong bộ nhớ như thế nào

Value type được lưu trong stack trong khi reference type được lưu trữ trong heap. Vậy thì sự khác nhau giữa stack và heap là gì?

Như đã đề cập trước đây, instance của reference type được lưu trữ trong heap và instance của value type được lưu trong stack. Nếu instance của value type là một phần của class instance, thì giá trị đó sẽ được lưu trữ trong heap cùng với instance của class.

Stack được sử dụng cho static memory allocation và heap được dùng cho dynamic memory allocation, cả hai đều được lưu trong ram của máy tính. Đối với reference type, tham chiếu được lưu trữ trong stack trong khi object mà nó chỉ tới được lưu trong heap. Đối với value type, bản thân object của nó sẽ được lưu trong stack. 

Bởi vì reference type luôn được lưu trong heap, nên bất cứ thứ gì nó bao gồm cũng được lưu trong heap. Ví dụ: nếu một class có một instance của struct bên trong nó, thì instance này cũng sẽ được lưu trong heap cùng với class instance.

*Tóm lại, reference type luôn được lưu trữ trong heap, value type luôn được lưu trữ ở nơi mà nó được khai báo.*

Ngoài ra ta còn có thêm một số thông tin như stack được quản lý và tối ưu bởi CPU. Khi một function tạo ra một biến, stack lưu trữ biến đó và phá huỷ nó khi function biến mất. Các biến được đặt trong stack sẽ được lưu trữ trực tiếp trong memory và được truy cập vào memory rất nhanh.

Hệ thống sử dụng heap để lưu data được tham chiếu bởi các object khác. Heap là một memory lớn, mà từ đó hệ thống có thể request và tự động allocate các memory block. Heap sẽ không tự động phá huỷ object như stack. Mà thay vào đó các work bên ngoài sẽ phải làm việc đó. Đối với các thiết bị Apple, ARC sẽ đảm nhiệm chức năng này. Biến đếm tham chiếu sẽ được ARC theo dõi và khi nó trở về 0, object sẽ được giải phóng. Tuy nhiên các hoạt động này nhìn chung khá chậm so với stack. Vì vậy value type thường nhanh hơn reference type.

Hy vọng qua bài viết này mọi người đã hiểu hơn về reference type và value type để có thể sử dụng chúng một cách phù hợp và hiệu quả.