Có thể bạn sẽ nghĩ việc đặt tên cho biến, hàm, hằng số, class,.. có vẻ là đơn giản trong code của bạn. Nhưng nó thực ra nó lại là một điều rất khó khăn đấy.

Đặt tên đúng là một việc vô cùng quan trọng của việc bạn code và cả với những người khác đọc code của bạn..

## 1. Nguyên tắc cơ bản. 
###  Rõ ràng.
Rõ ràng là một điểm quan trọng nhất trong việc đặt tên. Bạn hãy cố gắng đặt tên một cách ngắn gọn và rõ ràng nhất có thể.
Các thực thể như method hay properties được khai báo một lần nhưng sử dụng nhiều lần.
Luôn kiểm tra trường hợp sử dụng có phù hợp bối cảnh hay không. Ví dụ: 

![](https://images.viblo.asia/0bafb714-2e58-4cbd-b552-d16ae65d849e.png)

### Sự rõ ràng quan trọng hơn cả ngắn gọn.
Nhìn chung, không nên viết tắt tên của mọi thứ. Hãy cố gắng rõ nghĩa nhất mặc dù tên của nó sẽ dài. Ví dụ:

![](https://images.viblo.asia/0d8deca1-6903-4a36-95ca-d10afbbd2a35.png)

Bỏ qua những từ không cần thiết. Mỗi từ trong một tên nên truyền đạt thông tin nổi bật nhất của nó. Ví dụ như:
`allViews.removeElement(cancelButton)`  = not clear

`allViews.remove(cancelButton)` = clearer

### Nhất quán.
Cố gắng sử dụng tên nhất quán trong xuyên suốt project của bạn. 
Tính nhất quán đặt biệt quan trọng khi bạn có mọt lớp có các method sử dụng tính đa hình.

Các phương thức thực hiện cùng một thứ trong class khác nhau nên có cùng tên. Ví dụ:

**Sai cách**

```swift
class Arithmetic {
    func add(x: Float, y: Float)
}
class Integer: Arithmetic {
    func addInt(x: Int, y: Int)
}
class MyClass: Integer {
//this class will get two different names for functions both performing addition
}
```

**Đúng cách**
```swift
class Arithmetic {
    func add(x: Float, y: Float)
}
class Integer: Arithmetic {
    func add(x: Int, y: Int)
}
class MyClass: Integer {
    add(x: 23, y: 33)
    add(x: 3.3, y: 23.3)
}
```

### Không cần giải thích
Tên không cần có phần giải thích. Ví dụ :

![](https://images.viblo.asia/f2688e02-aa9d-4e7d-be82-13b5e8f93599.png)

## 2. Quy tắc đánh máy.
Thực hiện theo các quy tắc đánh máy để đặt tên các yếu tố: 

* Đối với các tên bao gồm nhiều từ không sử dụng dấu chấm câu làm một phần của tên hoặc dấu phân cách ( dấu gạch ngang, gạch dưới,..).
* Thay vào đó, viết hoa chữ cái đầu của các từ tiếp theo (nameOfSomeMethod) - quy tắc lạc đà.
*  Tuy nhiên cần lưu ý với phương thức, biến thì viết thường chữ cái đầu tiên.


## 3. Đặt tên cho class và protocol.
Tên của class nên là một danh từ rõ ràng những gì lớp đó đại diện. Còn đối với protocol nên đặt tên theo hành vi của nó.
Hầu hết các protocol  không liên quan đến một class nào nên được đặt tên sao cho không bị nhầm với một lớp. Thông thường người ta hay thêm "ing" vào tên. Ví dụ:

![](https://images.viblo.asia/c4d5b663-5156-4d14-b427-f49f6acf491a.png)

Một số protocol nhỏ không liên quan đến nhau thường được liên kết với một class, và quy ước đặt tên ở đây là cho chúng có cùng tên với nhau.

Ví dụ như protocol NSObject, nó là nhóm các phương thức bạn có thể sử dụng để truy vấn bất kì đối tượng nào về vị trí của nó trong hệ thống phân cấp các lớp để làm cho nó 
gọi các phương thức cụ thể và tăng hoặc giảm tham chiếu của nó. Vì class NSObject cung cấp các phương thức chính nên protocol có tên giống với class.
## 4. Đặt tên cho method. 
### Quy tắc chung. 
* Bắt đầu bằng một từ viết thường, các chữ sau viết hoa chữ cái đầu.
* Đối voliws các phương thức thể hiện hành động mà một đối tượng thực hiện hãy bắt đầu bằng một động từ.
* Không sử dụng do hoặc does trong tên. Bởi vì những động từ này hiếm khi  có thêm ý nghĩa, ngoài ra không sử dụng trạng từ hoặc tính từ trước động từ.
* Nếu method trả về một thuộc tính của người gọi, hãy đặt tên method theo thuộc tính. Tránh sử dụng get trừ khi một hoặc nhiều giá trị được trả lại gián tiếp.
![](https://images.viblo.asia/a0b03470-5255-4974-824f-8be24d5d6397.png)
* Thêm các từ để làm rõ vai trò của tham số:

Đặc biệt khi một loại tham số là NSObject, Any, AnyObject hoặc một lại cơ bản như Int, String, loại thông tin và bối cảnh tại thời điểm sử dụng có thể không truyền đạt đầy đủ 
ý định.  Ví dụ:
```swift
func add(_ observer: NSObject, for keyPath: String)
grid.add(self, for: graphics) = vague
```

Để được rõ nghĩa hơn chúng ta nên sử dụng như sau :
```swift
func addObserver(_ observer: NSObject, forKeyPath path: String)
grid.addObserver(self, forKeyPath: graphics) = clear
```

* Sử dụng tên tạo thành các cụm từ nghữ pháp tiếng anh. Ví dụ:

```swift
x.insert(y, at: z) “x, insert y at z”
x.subViews(havingColor: y) “x’s subviews having color y”
x.capitalizingNouns() “x, capitalizing nouns”
x.insert(y, position: z)
x.subViews(color: y)
x.nounCapitalize()
```

* Bắt đầu tên của các phương thức khởi tạo băng từ make. Ví dụ: x.makeIterator()
* Khi đối số đầu tiên tạo thành một phần của cụm từ , hãy đặt cho nó một argument label.
```swift
a.moveTo(x: b, y: c)
a.fadeFrom(red: b, green: c, blue: d)
```
* Mặt khác, nếu đối số đầu tiên không tạo thành một phần của cụm từ ngữ pháp, hãy bỏ qua argument label và thêm một từ tăng nghĩa cho nó. ví dụ:
```swift
view.dismiss(animated: false)
let text = words.split(maxSplits: 12)
let studentsByName = students.sorted(isOrderedBefore: Student.namePrecedes)
```

## 5. Đặt tên cho Properties.
Đặt tên cho biến, tham số và các loại liên quan theo vai trò của chúng thay vì kiểu của chúng. Ví dụ

**Cách sai**
```swift
var string = “Hello”
protocol ViewController {
    associatedtype ViewType : View
}
class ProductionLine {
    func restock(from widgetFactory: WidgetFactory)
}
```

**Cách đúng**
```swift
var greeting = “Hello”
protocol ViewController {
    associatedtype ContentView : View
}
class ProductionLine {
    func restock(from supplier: WidgetFactory)
}
```
* Nếu thuộc tính được thể hiện duới dạng danh từ, fomat là: (type) noun. Ví dụ: title
* Nếu thuộc tính được thể hiện dạng tính từ: isAdj. Ví dụ: isHidden.
* Nếu thuộc tính được thể hiện dạng động từ: verObject. Ví dụ: showPopup.
* Động từ nên ở thì hiện tại đơn.
* Không sử dụng phân từ để chuyển động từ thành tính từ.

![](https://images.viblo.asia/46b03e27-7085-49dc-a2d2-3a8398cdd50e.png)

* Sử dụng các động từ như: can, should, will,.. để làm rõ ý nghĩa hơn nhưng không sử dụng do hoặc does.

## 6. Tổng kết.
Qua bài viết hi vọng giúp các bạn hiểu rõ hơn về việc đặt tên trong code để dễ dàng sử dụng nhất :D

Tham khảo: https://medium.com/better-programming/naming-conventions-in-swift-4b7ca5eed4d2