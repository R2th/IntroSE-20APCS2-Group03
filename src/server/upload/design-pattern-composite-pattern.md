# Design Pattern: Composite Pattern
 Như các bạn đã biết Design Pattern có ứng dụng rất lớn trong thế giới lập trình. Có thể nhiều bạn chưa biết về nó nên có thể theo bài sau để có cái nhìn **[tổng quan về Design Pattern và ví dụ về command pattern](https://viblo.asia/p/vai-net-ve-command-pattern-Do754bQBZM6)**
 
 Trong bài hôm nay đê tiếp tục mình sẽ giới thiệu về **Composite Pattern**
 
 Vẫn sẽ như bài ở trên mình sẽ đi theo 3 phần:
 + Composite pattern
 + Cách sử dụng Composite Pattern
 + Ứng dụng của Composite Pattern trong lập trình IOS

## Composite Pattern
Composite là một mẫu thiết kế thuộc nhóm Structural Pattern. Composite Pattern là một sự tổng hợp những thành phần có quan hệ với nhau để tạo ra thành phần lớn hơn. Nó cho phép thực hiện các tương tác với tất cả đối tượng trong mẫu tương tự nhau.
Dưới đây là sơ đồ mô tả về pattern này.
![](https://images.viblo.asia/a2ec4ba3-cf92-48a0-b699-4ae499ae14f6.png)
Composite Pattern bao gồm các thành phần:
1. **Component protocol**: Đảm bảo tất cả các thành phần trong cây phải được xử lí theo cùng 1 hướng.
2. **Leaf**: Là một thành phần trong cây nhưng không có thành phần con.
3. **Composite**: Là một container chứa các đối tượng  leaf và các **composite** khác.

Tất cả các nút composite và leaf đều xuất phát từ component protocol. Chúng ta có thể tổ chức một vài lớp leaf khác nhau trong đối tượng composite.

## Cách sử dụng Composite Pattern

Composite Pattern được sử dụng khi chúng ta cần xử lý một nhóm đối tượng tương tự theo cách xử lý 1 object. Composite pattern sắp xếp các object theo cấu trúc cây để diễn giải 1 phần cũng như toàn bộ hệ thống phân cấp. Pattern này tạo một lớp chứa nhóm đối tượng của riêng nó. Lớp này cung cấp các cách để sửa đổi nhóm của cùng 1 object. Pattern này cho phép Client có thể viết code giống nhau để tương tác với composite object này, bất kể đó là một đối tượng riêng lẻ hay tập hợp các đối tượng.

1 ví dụ đơn giản có thể thấy được đó chính là: 
 Array là 1 composite với thành phần chính là Array. Composite này là 1 container để chứa các đối tượng leaf với mỗi leaf là một loại cụ thể là Int hay String hay bất cứ loại nào mà bạn thêm vào mảng.
 
Trên đây là cách sử dụng nhưng chắc chắn khá mông lung đúng không?. Chúng ta cùng nhau đi vào implement nó ngay thôi.
 
Đầu tiên chúng ta khởi tạo 1 class View đóng vai trò như 1 **Component Protocol** có đủ các phương thức khởi tạo, add và remove để thực hiện các thao tác thêm và xoá view con trong nó. Ngoài ra View còn có tên và có thể có superView, childViews chính vì thế chúng ta khai báo thêm các thuộc tính này trong View.
 ```Swift
 class View : NSObject {

    var children = [View]()
    var parent: View?
    var name: String

    init(name:String) {
        self.name = name
        super.init()

    }
    func add(_ view:View) {
        children.append(view)
    }

    func remove(_ view:View) {
        for (index, child) in children.enumerated() {
            if child === view {
                children.remove(at: index)
                break
            }
        }
    }
}
```

Tiến hành khởi tạo các leaf **Button** và **Label** implement các phương thức và thuộc tính của **Component Protocol** View.

```Swift
class Button: View {
    override func add(_ view: View) {

    }

    override func remove(_ view: View) {

    }
}

class Label: View {
    override func add(_ view: View) {

    }

    override func remove(_ view: View) {

    }
}

```

Chúng ta thử tạo 1 Dialog đóng vai trò là 1 Composite chứa các leaf và implement phương thức của **Component Protocol** View và thử 1 chút như sau:

```Swift
class Dialog: View {

}

var button = Button(name: "button")
var label = Label(name: "label")
var dialog = Dialog(name: "dialog")
dialog.add(button)
dialog.add(label)
dialog.remove(button)
```

Như chúng ta thấy nó khá đơn giản đúng không nào.

Tuy nhiên chúng ta sẽ sử dụng Composite Pattern khi nào?
+ Composite Pattern chỉ nên được áp dụng khi nhóm đối tượng phải hoạt động như một đối tượng duy nhất (theo cùng một cách).
+ Composite Pattern có thể được sử dụng để tạo ra một cấu trúc giống như cấu trúc cây.

## Ứng dụng của Composite Pattern trong lập trình IOS
![](https://images.viblo.asia/cca2c772-4998-49c6-afc4-f55c0d309bc9.png)
Ví dụ cơ bản về View như chúng ta vừa thực hiện là một minh chứng to lớn nhất về ứng dụng của Composite pattern trong lập trình ios.

Trên đây là Composite Pattern và cách sử dụng cũng như ứng dụng của nó trong lập trình IOS.
Hi vọng sẽ giúp ích phần nào cho các bạn mới và đang tìm hiểu về các design pattern. Hẹn gặp lại các bạn trong các bài chia sẻ tiếp theo.