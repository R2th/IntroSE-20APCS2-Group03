![](https://images.viblo.asia/b5c43747-547e-40a1-b775-911468e0812d.png)
# Giới thiệu
Không giống như các ngôn ngữ khác, kotlin phân biệt rõ ràng các Collecton mutable và immutable (lists, sets, maps,...) 
Điều quan trọng là phải hiểu rõ sự khác biệt giữa chế độ read-only của các mutable collection và immutable collection. Cả hai đều có thể tạo ra một cách dễ dàng nhưng hệ thống không hiểu được sự khác biệt vì vậy việt control là hoàn toàn phụ thuộc vào bạn
# Collection
Kiểu List<out T> là một interface cung cấp chế độ read-only với các method size,get,.. Giống như Java nó cũng kế thừa từ Collection<T>. Các phương thức có thể thay đổi một list được cung cấp bởi MutableList<out T> interface tương tự như thế ta có các collection khác như Set<out T>/MutableSet<T> and Map<K, out V>/MutableMap<K, V>
    
**Example**:
```
val numbers: MutableList<Int> = mutableListOf(1, 2, 3)
val readOnlyView: List<Int> = numbers
println(numbers)        // prints "[1, 2, 3]"
numbers.add(4)
println(readOnlyView)   // prints "[1, 2, 3, 4]"
readOnlyView.clear()    // -> does not compile
val strings = hashSetOf("a", "b", "c", "c")
assert(strings.size == 3)
```

Kotlin không có một phương thức khởi tạo chuyên dụng nào với list và cá collection khác thay vào đó ta sử dụng các method chuẩn từ thư viện như listOf(), mutableListOf(), setOf(), mutableSetOf(), mapOf(a to b, c to d)
Lưu ý rằng những biến readOnlytrỏ đến cùng một danh sách và thay đổi khi danh sách cơ bản thay đổi. Nếu các tham chiếu duy nhất tồn tại trong một danh sách là readOnly, chúng ta có thể xem xét việc thu thập hoàn toàn không thay đổi. Một cách đơn giản để tạo bộ sưu tập như vậy là:
```
val  items  =  listOf ( 1 , 2 , 3 )
```
Để tạo một bản sao không thể thay đổi của một list chỉ việc
```
class Controller {
    private val _items = mutableListOf<String>()
    val items: List<String> get() = _items.toList()
}
```
Hàm toList() sẽ tạo một bản sao bằng cách duplicate list item, điều này đảm bảo list sẽ không bao giờ thay đổi
# Các method hữu dụng
Kotlin là một ngôn ngữ tuyệt vời nó cung cấp cho chúng ta rất nhiều hàm tiện ích để xử lý với các collection
**First(), Last(), Filter:**
```
val items = listOf(1, 2, 3, 4)
items.first() == 1
items.last() == 4
items.filter { it % 2 == 0 }   // returns [2, 4]

val rwList = mutableListOf(1, 2, 3)
rwList.requireNoNulls()        // returns [1, 2, 3]
if (rwList.none { it > 6 }) println("No items above 6")  // prints "No items above 6"
val item = rwList.firstOrNull()
```

```
val readWriteMap = hashMapOf("foo" to 1, "bar" to 2)
println(readWriteMap["foo"])  // prints "1"
val snapshot: Map<String, Int> = HashMap(readWriteMap)
```

**Find(), FindLast()**
```
val items = listOf(1, 2, 3, 2, 4)
val element = items.find{ it == 2 } // return 2
val element = items.findLast{ it == 2 } // return 2
```
**indexOfFirst, indexOfLast**
```
val items = listOf(1, 2, 3, 2, 4)
val indexFirst = items.indexOfFirst{it == 2} // return 1
val indexLast = items.infexOfLast{it == 2} // return 3
 ```