Trong các project thường ta sẽ hay gặp phép gán sau:
```
myVar.obj1.obj2.enabled = !myVar.obj1.obj2.enabled
```
Việc này giúp cho chúng ta set lại giá trị phủ định cho một biến Bool nào đó, giúp cho việc thực hiện một logic nào đó trong project. Tuy nhiên, nếu trong trường hợp có quá nhiều biến Bool như vậy trong một file code sẽ rất dễ dẫn đến sự nhầm lẫn khi gán.
Để tránh việc này, chúng ta có thể viết thêm một hàm chuyển đổi giá trị cho biến Bool bằng cách sử dụng extension:
```
extension Bool {
   mutating func toggle() {
       self = !self
   }
}
```
Với hàm trên, việc sử dụng sẽ trở lên đơn giản và tránh được nhầm lẫn:
```
myVar.obj1.obj2.enabled.toggle()
```
Việc này có thể không thực hiện được với các ngôn ngữ khác, tuy nhiên Swift với mutable self giúp dễ dàng và tiện lợi trong việc thực thi trên.