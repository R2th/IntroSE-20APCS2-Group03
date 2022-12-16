## 1. Giới thiệu.
Khác với các nhiều ngôn ngữ khác, Kotlin phân biệt rõ ràng giữa collection có thể thay đổi giá trị và collection không thể thay đổi giá trị (list, set, map, ...). Bởi vậy, việc control chính xác lúc nào dùng loại collection thế nào sẽ giúp giảm thiểu bug và việc thiết kế các API được tốt hơn.
![](https://images.viblo.asia/3adb8462-2f41-47a4-9a8a-923803b1099f.png)
Kotlin cung cấp cho chúng ta một tập các native interface để làm việc với collection:

- Iterable: Lớp cha. Bất kỳ class nào kế thừa từ interface này đại diện cho một chuỗi các phần tử mà chúng ta có thể duyệt qua
- MutableIterable: Iterable hỗ trợ việc xóa các phần tử trong khi đang duyệt
- Collection: Class đại diện cho một tập các phần tử. Chúng ta có thể sử dụng các hàm mà trả về size của collection, kiểm tra collection có rỗng hay không,... Tất cả các method cho loại này chỉ là lấy dữ liệu, bởi vì collection là immutable.
- MutableCollection: Collection hỗ trợ việc thêm hoặc xóa các phần tử: các hàm add, remove, clear...
- List: Collection có lẽ là được dùng nhiều nhất. Nó đại diện cho một tập các phần tử có thứ tự. Bởi vì có thứ tự, ta có thể truy cập các phần tử thông qua chỉ số
- MutableList: List hỗ trợ việc thêm hoặc xóa các phần tử
- Set: một tập các phần tử không có thứ tự và không hỗ trợ lưu các phần tử trùng
- MutableSet: Set hỗ trợ việc thêm và xóa các phần tử
- Map: một tập các cặp key - value với key trong map là duy nhất
- MutableMap: Map hỗ trợ việc thêm và xóa các phần tử
## 2. Khởi tạo.
List<out T> trong Kotlin là một interface cung cấp các thao tác như size, get.... Cũng như trong Java, List<out T> kế thừa từ Collection<T> và Iterable<T>. Đây là immutable collection.
```Kotlin
var list: List<Int> = listOf(1, 2, 3, 4, 5) // [1,2,3,4,5]
var list1: List<Int> = List(5, { index ->
      index + 1
})  // [2,3,4,5,6]

list.add(5) //compiler sẽ báo lỗi
list.clear() // compiler sẽ báo lỗi
```
Vì collection không thể thay đổi, chúng chỉ có thể khởi tạo giá trị lúc khai báo. Kotlin cung cấp hàm khởi tạo hoặc chúng ta có thể sử dụng hàm thư viện chuẩn có sẵn listOf(), setOf() và mapOf(). Với mapOf(), ta sử dụng cú pháp mapOf(a to b, c to d). Cùng với đó, các hàm add(), clear() cũng sẽ không có đối với immutable collection.
```Kotlin
var list: MutableList<Int> = mutableListOf(1, 2, 3, 4, 5) // [1,2,3,4,5]
var list1: MutableList<Int> = MutableList(5, { index ->
     index + 1
})  // [2,3,4,5,6]

list.add(5) // OK
list.clear() // OK
```
Với mutable collection, chúng ta có MutableList<T>, interface này cung cấp thêm các thao tác như add, clear... Việc phân chia cũng tương tự với Set<out T>/MutableSet<T> và Map<K, out V>/MutableMap<K, V>.
## 3. Phân biệt.
Chúng ta cùng xem ví dụ sau:
```Kotlin
  val numbers: MutableList<Int> = mutableListOf(1, 2, 3)
  val readOnlyView: List<Int> = numbers
  println(numbers)        // prints "[1, 2, 3]"
  numbers.add(4)
  println(readOnlyView)   // prints "[1, 2, 3, 4]"

  readOnlyView.clear()    // -> compiler báo lỗi
  numbers.clear()         // OK
```
readOnlyView không thể thay đổi giá trị của list mà chỉ có thể xem được giá trị của list. Giá trị của list thay đổi khi numbers thay đổi giá trị bằng cách sử dụng add hoặc clear. Khi đó, giá trị của readOnlyView khi in ra cũng sẽ thay đổi. Điều đó bởi vì cả 2 biến numbers và readOnlyView đều cùng trỏ vào cùng một list và readOnlyView sẽ thay đổi nếu list được trỏ vào thay đổi. Trong trường hợp chỉ có duy nhất 1 tham chiếu tới list, chúng ta có thể coi collection đó hoàn toàn là immutable collection.
    
Trong trường hợp bạn chỉ muốn thay đổi collection ở bên trong đối tượng mà không muốn bị thay đổi từ bên ngoài:
```Kotlin
class Controller {
      private val _items = mutableListOf<String>()
      val items: List<String> get() = _items.toList()
}
```
Một số extension method quen thuộc:
```Kotlin
val items = listOf(1, 2, 3, 4)
  items.first() == 1
  items.last() == 4
  items.filter { it % 2 == 0 }   // returns [2, 4]

  val rwList = mutableListOf(1, 2, 3)
  rwList.requireNoNulls()        // returns [1, 2, 3]
  if (rwList.none { it > 6 }) println("No items above 6")  // prints "No items above 6"
  val item = rwList.firstOrNull()
```
Với map, ta có thể khởi tạo và truy cập như sau:
```Kotlin
val readWriteMap = hashMapOf("foo" to 1, "bar" to 2)
println(readWriteMap["foo"])  // prints "1"
val snapshot: Map<String, Int> = HashMap(readWriteMap)
```

## 4. Một số hàm phổ biến.
Đây là các hàm nằm trong thư viện chuẩn được Kotlin cung cấp với nhiều loại collection khác nhau
### 4.1 Các hàm làm việc với tổng thể
- any: trả về true nếu có ít nhất 1 phần tử thỏa mãn logic truyền vào
```Kotlin
  var list = mutableListOf(3, 5, 7)
  list.any { it == 3 } // true
```
- all: trả về true nếu tất cả các phần tử thỏa mãn logic truyền vào
```Kotlin
var list = mutableListOf(3, 6, 9)
list.all { it % 3 == 0 } //true
```
- count: trả về số phần tử thỏa mãn logic truyền vào
```Kotlin
var list = mutableListOf(3, 5, 9)
list.count { it % 3 == 0 } // 2
```
- fold: tổng của các giá trị bắt đầu từ giá trị khởi tạo và áp dụng việc tính toán ở hàm được đưa vào với các phần tử từ đầu đến cuối collection.
```Kotlin
var list = mutableListOf(3, 5, 6)
val result = list.fold(0, { total: Int, i: Int ->
    total + i
})
print(result) // 14
```
Như ở ví dụ trên: 0 là giá trị khởi tạo, total là tổng của quá trình, i là giá trị của từng phần tử, lần lượt là 3, 5, 6
- foldRight: tương tự như fold nhưng duyệt theo thứ tự từ cuối trở về đầu
```Kotlin
  var list = mutableListOf(3, 5, 6)
  val result = list.foldRight(0, { total: Int, i: Int ->
      total + i
  })
  print(result) // 14
```
Giá trị lần lượt của i bây giờ là: 6, 5, 3

- forEach: thực hiện hàm được truyền vào với mỗi phần tử trong collection:
```Kotlin
  var list = mutableListOf(3, 5, 6)
  list.forEach {
      println(it)
  }
```
- forEachIndexed: tương tự như forEach, tuy nhiên có thêm chỉ số của các phần tử:
```Kotlin
  var list = mutableListOf(3, 5, 6)
  list.forEachIndexed {index: Int, value: Int ->  
      println("position $index: $value")
  }
```
- max: trả về phần tử lớn nhất của collection hoặc null nếu collection rỗng
```Kotlin
  var list = mutableListOf(3, 5, 6)
  print(list.max()) // 6
```
- min: trả về phần tử nhỏ nhất của collection hoặc null nếu collection rỗng
```Kotlin
  var list = mutableListOf(3, 5, 6)
  print(list.min()) // 3
```
- none: trả về true nếu không có phần tử nào thỏa mãn logic truyền vào
```Kotlin
  var list = mutableListOf(3, 5, 6)
  print(list.none {
      it > 8
  })
```
- reduce: tương tự như fold nhưng không có giá trị khởi tạo mà chỉ áp dụng với các phần tử của dãy
```Kotlin
  var list = mutableListOf(3, 5, 6)
  var result = list.reduce { total: Int, i: Int ->
      total + i
  }
  print(result) // 14
```
- reduceRight: tương tự như reduce nhưng duyệt từ cuối dãy trở về đầu
```Kotlin
  var list = mutableListOf(3, 5, 6)
  var result = list.reduce { total: Int, i: Int ->
      total + i
  }
  print(result) // 14
```
- sumBy: trả về tổng của tất cả các phần tử nhưng được xử lý thông qua logic được truyền vào
```Kotlin
  var list = mutableListOf(3, 5, 7)
  var result = list.sumBy {
      it % 3
  }
  print(result) // 3
```
result ở trên là tổng của các số dư của dư của từng phần tử
### 4.2 Các hàm lọc
- drop: trả về một list bao gồm tất cả các phần tử trừ n phần tử đầu tiên
```Kotlin
var list = mutableListOf(3, 5, 6, 7, 9)
var result = list.drop(3)
print(result) // [7, 9]
```
- dropWhile:t rả về một list bao gồm tất cả các phần tử trừ các phần tử đầu tiên mà thỏa mãn logic truyền vào
```Kotlin
 var list = mutableListOf(3, 6, 6, 7, 9)
 var result = list.dropWhile {
      it % 3 == 0
 }
 print(result) // [7, 9]
```
Trong ví dụ trên, các phần từ đầu tiên mà thỏa mãn yêu cầu sẽ bị loại ra.
- dropLastWhile: tương tự như dropWhile tuy nhiên sẽ loại các phần tử cuối nếu thỏa mãn logic truyền vào
```Kotlin
  var list = mutableListOf(3, 6, 6, 7, 9)
  var result = list.dropLastWhile {
      it % 3 == 0
  }
  print(result) // [3, 6, 6, 7]
```
- filter: trả về một list các phần tử thỏa mãn logic truyền vào
```Kotlin
  var list = mutableListOf(3, 6, 6, 7, 9)
  var result = list.filter {
      it % 3 == 0
  }
  print(result) // [3, 6, 6, 9]
```
- filterNot: trả về một list các phần tử không thỏa mãn logic truyền vào
```Kotlin
  var list = mutableListOf(3, 6, 6, 7, 9)
  var result = list.filterNot {
      it % 3 == 0
  }
  print(result) // [7]
```
- filterNotNull: trả về một list các phần tử trừ các phần tử null
```Kotlin
  var list = mutableListOf(3, 6, 6, null, 9)
  var result = list.filterNotNull()
  print(result) // [3, 6, 6, 9]
```
- slice: trả về một list các phần tử ở các vị trí xác định
```Kotlin
  var list = mutableListOf(3, 6, 6, 7, 9)
  var result = list.slice(listOf(0, 1, 3, 4))
  print(result) // [3, 6, 6, 9]
```
- take: trả về một list gồm n phần tử đầu tiên
```Kotlin
  var list = mutableListOf(3, 6, 6, 7, 9)
  var result = list.take(4)
  print(result) // [3, 6, 6, 7]
```
- takeLast: trả về một list gồm n phần tử cuối cùng
```Kotlin
  var list = mutableListOf(3, 6, 6, 7, 9)
  var result = list.takeLast(4)
  print(result) // [6, 6, 7, 9]
```
- takeWhile: trả về một list bao gồm các phần tử đầu tiên mà thỏa mãn logic truyền vào
```Kotlin
  var list = mutableListOf(3, 6, 6, 7, 9)
  var result = list.takeWhile {
      it % 3 == 0
  }
  print(result) // [3, 6, 6]
```
### 4.3 Các hàm chuyển đổi
- flatMap: duyệt qua tất cả các phần tử và tạo ra một collection mới cho mỗi phần tử bằng cách áp dụng logic truyền vào, cuối cùng trả về một list bao gồm tất cả các phần tử của các list vừa được tạo ra
```Kotlin
var list = mutableListOf(3, 6, 6, 7, 9)
var result = list.flatMap { listOf(it, it + 1,it+2) }
print(result) // [3, 4, 5, 6, 7, 8, 6, 7, 8, 7, 8, 9, 9, 10, 11]
```
- groupBy: trả về một map bằng cách áp dụng logic truyền vào và phân loại các phần tử trong collection thành các nhóm
```Kotlin
  var list = mutableListOf(3, 6, 6, 7, 9)
  var result = list.groupBy { if (it % 2 == 0) "even" else "odd" }
  print(result) // {odd=[3, 7, 9], even=[6, 6]}
```
- map: trả về một list là kết quả của logic chuyển đổi được truyền vào áp dụng với tất cả các phần tử của collection ban đầu
```Kotlin
  var list = mutableListOf(3, 6, 6, 7, 9)
  var result = list.map { it + 1 }
  print(result) //[4, 7, 7, 8, 10]
```
- mapIndexed: trả về một list là kết quả của logic chuyển đổi được truyền vào áp dụng với tất cả các phần tử và chỉ số của các phần tử của collection ban đầu
```Kotlin
  var list = mutableListOf(3, 6, 6, 7, 9)
  var result = list.mapIndexed { index, value ->
    value + index
  }
  print(result) //[3, 7, 8, 10, 13]
```
### 4.4 Các hàm làm việc với các phần tử
- contains: trả về true nếu phần tử nằm trong collection
```Kotlin
  var list = mutableListOf("a", "b", "c", null, "d")
  var result = list.contains("a")
  print(result) //true
```
- elementAt: trả về phần tử tại vị trí i hoặc throw IndexOutOfBoundException nếu i không nằm trong khoảng chỉ số của collection
```Kotlin
  var list = mutableListOf("a", "b", "c", null, "d")
  var result = list.elementAt(1)
  print(result) // "a"
```
- elementAtOrElse: trả về một phần tử ở vị trí i hoặc thực hiện logic được truyền vào nếu chỉ số của collection không nằm trong khoảng chỉ số của collection
```Kotlin
  var list = mutableListOf("a", "b", "c", null, "d")
  var result = list.elementAtOrElse(10, { i ->
      "null"
  })
  print(result) // "null"
```
- elementAtOrNull: trả về một phần tử ở vị trí i hoặc null nếu chỉ số nằm ngoài khoảng chỉ số của collection
```Kotlin
  var list = mutableListOf("a", "b", "c", null, "d")
  var result = list.elementAtOrNull(10)
  print(result) // null
```
- first: trả về phần tử đầu tiên thỏa mãn logic truyền vào hoặc throw NoSuchElementCollection nếu không có phần tử thỏa mãn logic
```Kotlin
  var list = mutableListOf(1, 2, 4, 1, 7)
  var result = list.first { it > 3 }
  print(result) // 4
```
- firstOrNull: trả về giá trị đầu tiên thỏa mãn logic truyền vào hoặc trả về null nếu không có phần từ nào thỏa mãn logic
```Kotlin
  var list = mutableListOf(1, 2, 4, 1, 7)
  var result = list.first { it > 9 }
  print(result) // null
```
- indexOf: trả về chỉ số đầu tiên của phần tử i hoặc trả về -1 nếu không có phần tử nào được tìm thấy
```Kotlin
  var list = mutableListOf(1, 2, 4, 1, 7)
  var result = list.indexOf(3)
  print(result) // -1
```
- indexOfFirst: trả về chỉ số đầu tiên của phần tử i thỏa mãn logic truyền vào hoặc trả về -1 nếu không tìm thấy phần tử nào
```Kotlin
  var list = mutableListOf(1, 2, 4, 1, 7)
  var result = list.indexOfFirst { it % 2 == 0 }
  print(result) // 1
```
- indexOfLast: trả về chỉ số của phần tử cuối cùng thỏa mãn logic truyền vào hoặc trả về -1 nếu không tìm thấy phần tử nào
```Kotlin
  var list = mutableListOf(1, 2, 4, 1, 7)
  var result = list.indexOfLast { it % 2 == 0 }
  print(result) // 2
```
- last: trả về phần tử cuối cùng thỏa mãn logic truyền vào
```Kotlin
  var list = mutableListOf(1, 2, 4, 1, 7)
  var result = list.indexOfLast { it % 2 == 0 }
  print(result) // 4
```
- lastIndexOf: trả về chỉ số cuối cùng của phần tử thỏa mãn logic hoặc -1 nếu không tìm thấy phần tử nào
```Kotlin
  var list = mutableListOf(1, 2, 4, 2, 7)
  var result = list.lastIndexOf(2)
  print(result) //3
```
- lastOrNull: trả về phần tử cuối cùng thỏa mãn logic hoặc null nếu không tìm thấy phần tử nào
```Kotlin
var list = mutableListOf(1, 2, 4, 2, 7)
var result = list.lastOrNull(3)
print(result) // null
```
- single: trả về phần tử duy nhất thỏa mãn logic truyền vào, throw NoSuchElementCollection nếu không có phần tử nào thỏa mãn logic hoặc throw IllegalArgumentException nếu có nhiều hơn một phần tử thỏa mãn logic
```Kotlin
  var list = mutableListOf(1, 2, 4, 2, 7)
  var result = list.single { it > 1}
  print(result) // throw IllegalArgumentException
```
- singleOrNull: trả về phần tử duy nhất thỏa mãn logic truyền vào và trả về null nếu không có phần tử nào thỏa mãn logic hoặc có nhiều hơn một phần tử thỏa mãn logic
```Kotlin
  var list = mutableListOf(1, 2, 4, 2, 7)
  var result = list.singleOrNull { it > 1}
  print(result) // null
```
### 4.5 Các hàm sinh
- partition: chia collection ban đầu thành một cặp collection(Pair) với collection đầu tiên chứa những phần tử mà logic truyền vào trả về true còn collection thứ hai chứa những phần tử mà logic truyền vào trả về false
```Kotlin
  var list = listOf(1, 2, 4, 2, 7)
  var result = list.partition { it % 2 == 0 }
  print(result) // ([2, 4, 2], [1, 7])
```
- plus: trả về một collection mới bao gồm tất cả các phần tử của collection ban đầu và collection được truyền vào. Vì hàm plus là hàm overload của toán tử + nên ta có thể sử dụng toán tử +
```Kotlin
  var list = listOf(1, 2, 4)
  var listA = listOf(3, 4)

  var result = list.plus(listA)
  println(result) // [1, 2, 4, 3, 4]

  var result1 = list + listA
  println(result1) // [1, 2, 4, 3, 4]
```
- zip: trả về một collection mới là collection của một cặp (Pair) bằng cách kết hợp từng phần tử của collection ban đầu với từng phần tử của collection được truyền vào. Size của collection mới bằng size của collection có size nhỏ hơn
```Kotlin
  var list = listOf(1, 2, 4, 2, 7)
  var listA = listOf(3, 4, 6, 7)
  var result = list.zip(listA)
  println(result) // [(1, 3), (2, 4), (4, 6), (2, 7)]
```
### 4.6 Các hàm làm việc với thứ tự
- reverse: trả về một collection với thứ tự các phần tử bị đảo ngược lại
```Kotlin
  var list = listOf(1, 2, 4, 2, 7)
  var result = list.reverse()
  println(result) // [7, 2, 4, 2, 1]
```
- sorted: trả về một list đã được sắp xếp theo chiều tăng dần
```Kotlin
  var list = listOf(1, 2, 4, 2, 7)
  var result = list.sorted()
  println(result) // [1, 2, 2, 4, 7]
```
- sortedBy: trả về một list các phần tử được sắp xếp bằng logic truyền vào, những phần tử thỏa mãn logic sẽ được xếp vào cuối, những phần tử không thỏa mãn được xếp vào đầu
```Kotlin
  var list = listOf(1, 2, 4, 2, 7)
  var result = list.sortedBy { it > 3 }
  println(result) // [1, 2, 2, 4, 7]
```
- sortedDescending: trả về một list đã được sắp xếp theo chiều giảm dần
```Kotlin
  var list = listOf(1, 2, 4, 2, 7)
  var result = list.sortedDescending()
  println(result) // [7, 4, 2, 2, 1]
```
- sortedByDescending: trả về một list các phần tử được sắp xếp bằng logic truyền vào, những phần tử thỏa mãn logic sẽ được xếp vào đầu, những phần tử không thỏa mãn được xếp vào cuối
```Kotlin
  var list = listOf(1, 2, 4, 2, 7)
  var result = list.sortedByDescending { it > 3 }
  println(result) // [4, 7, 1, 2, 2]
```
## 5. Tổng kết.
Qua bài viết mình đã giới thiệu một cách tổng quan về Collections trong Kotlin. Cám ơn các bạn đã theo dõi bài viết.
Tài liệu tham khảo:
- https://kotlinlang.org
- https://github.com/ngohado