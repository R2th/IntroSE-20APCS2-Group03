Trong ứng dụng Android, khi xử lý các Collections khác nhau như danh lists, maps, sets v.v. chúng ta thực hiện nhiều thao tác trên các collections này, nhưng có rất nhiều Kotlin Collection Functions, có thể giúp các thao tác dễ dàng hơn. Nếu bạn muốn thực hiện một số thao tác (đơn giản hoặc phức tạp) trên bất kỳ collections nào, thì phải có một số collection function giúp toàn bộ việc phát triển Ứng dụng Android của bạn trở nên đơn giản và dễ dàng hơn. Chúng ta sẽ tìm hiểu về nhiều Kotlin Collection Functions trong bài này.

### Loại bỏ Strings bị trùng lặp

Có nhiều cách để loại bỏ các chuỗi trùng lặp khỏi một mảng:

```java
// Duy trì thứ tự ban đầu
val devs = arrayOf("Amit", "Ali", "Amit", "Sumit", "Sumit", "Himanshu")
print(devs.distinct()) // [Amit, Ali, Sumit, Himanshu]

// Duy trì thứ tự ban đầu
val devs = arrayOf("Amit", "Ali", "Amit", "Sumit", "Sumit", "Himanshu")
print(devs.toSet()) // [Amit, Ali, Sumit, Himanshu]

// Duy trì thứ tự ban đầu
val devs = arrayOf("Amit", "Ali", "Amit", "Sumit", "Sumit", "Himanshu")
print(devs.toMutableSet()) // [Amit, Ali, Sumit, Himanshu]

// Không duy trì thứ tự ban đầu
val devs = arrayOf("Amit", "Ali", "Amit", "Sumit", "Sumit", "Himanshu")
print(devs.toHashSet()) // [Amit, Ali, Sumit, Himanshu]
```

### Chuyển array hoặc list thành string

Bạn có thể chuyển đổi một array hoặc list thành một chuỗi bằng cách sử dụng `joinToString`:

```java
val someKotlinCollectionFunctions = listOf(
    "distinct", "map",
    "isEmpty", "contains",
    "filter", "first",
    "last", "reduce",
    "single", "joinToString"
)

val message = someKotlinCollectionFunctions.joinToString(
    separator = ", ",
    prefix = "Kotlin có nhiều collection functions như: ",
    postfix = "và nó rất xịn xò.",
    limit = 3,
    truncated = "vv "
)

print(message) // Kotlin có nhiều collection functions như: distinct, map, isEmpty, vv và nó rất xịn xò.
```

### Chuyển đổi một collection thành một kết quả duy nhất

Nếu bạn muốn biến đổi một collection đã cho thành một kết quả duy nhất, thì bạn có thể sử dụng hàm `reduce`. Ví dụ: bạn có thể tìm thấy tổng của tất cả các phần tử có trong list:

```java
val numList = listOf(1, 2, 3, 4, 5)
val result = numList.reduce { result, item ->
    result + item
}
print(result) // 15

// NOTE: Nếu list rỗng, nó sẽ throw RuntimeException
```

### Tìm xem tất cả các phần tử có thỏa mãn một điều kiện cụ thể hay không

Nếu bạn có một array hoặc list các phần tử dữ liệu và bạn muốn tìm xem tất cả các phần tử có thỏa mãn một điều kiện cụ thể hay không, thì bạn có thể sử dụng `all` trong Kotlin.

```java
data class User(val id: Int, val name: String, val isCricketLover: Boolean, val isFootballLover: Boolean)

val user1 = User(id = 1, name = "Amit", isCricketLover = true, isFootballLover = true)
val user2 = User(id = 2, name = "Ali", isCricketLover = true, isFootballLover = true)
val user3 = User(id = 3, name = "Sumit", isCricketLover = true, isFootballLover = false)
val user4 = User(id = 4, name = "Himanshu", isCricketLover = true, isFootballLover = false)

val users = arrayOf(user1, user2, user3, user4)

val allLoveCricket = users.all { it.isCricketLover }
print(allLoveCricket) // true

val allLoveFootball = users.all { it.isFootballLover }
print(allLoveFootball) // false
```

### Tìm một phần tử cụ thể dựa trên một điều kiện nhất định

Bạn có thể tìm thấy một phần tử cụ thể từ list các phần tử thỏa mãn một điều kiện cụ thể bằng cách sử dụng `find` và `single` trong Kotlin.

Giá trị `find` trả về phần tử đầu tiên phù hợp với điều kiện đã cho hoặc `null` nếu không tìm thấy phần tử như vậy.

Trong khi `single` trả về phần tử duy nhất phù hợp với điều kiện đã cho hoặc nó sẽ  throw exception nếu có nhiều hơn một phần tử phù hợp hoặc không có phần tử phù hợp nào trong danh sách.

```java
data class User(val id: Int, val name: String)

val users = arrayOf(
    User(1, "Amit"),
    User(2, "Ali"),
    User(3, "Sumit"),
    User(4, "Himanshu")
)

val userWithId3 = users.single { it.id == 3 }
print(userWithId3) // User(id=3, name=Sumit)

val userWithId1 = users.find { it.id == 1 }
print(userWithId1) // User(id=1, name=Amit)
```

### Chia danh sách thành nhiều danh sách con có kích thước nhỏ hơn

Có nhiều trường hợp khi bạn có một danh sách lớn hơn và bạn muốn chia nó thành các phần nhỏ hơn và sau đó thực hiện một số thao tác trên các danh sách con đó. Vì vậy, điều này có thể dễ dàng đạt được bằng cách sử dụng hàm `chunked`.

```java
val numList = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
val chunkedLists = numList.chunked(3)
print(chunkedLists) // [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
```

### Tạo bản sao của array

Bạn có thể tạo bản sao của array hiện có của mình bằng cách sử dụng các hàm khác nhau như:

- **copyInto**: Điều này sẽ thay thế các phần tử của một array thành một array khác hoặc nó sẽ throw exception nếu array đích không thể chứa các phần tử của array ban đầu do các hạn chế về kích thước hoặc các chỉ mục nằm ngoài giới hạn.

```java
val arrayOne = arrayOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
val arrayTwo = arrayOf(11, 12, 13, 14, 15, 16, 17, 18, 19, 20)
arrayOne.copyInto(destination = arrayTwo, destinationOffset = 2, startIndex = 0, endIndex = 4)
arrayTwo.forEach {print("$it ")} // 11 12 1 2 3 4 17 18 19 20
```

Tương tự, có những hàm khác có thể được sử dụng để sao chép các phần tử của một mảng:

- **copyOfRange(fromIndex, toIndex)**: Trả về một array mới là bản sao của phạm vi được chỉ định của array ban đầu.
- **copyOf()** hoặc **copyOf(newSize)**: Trả về một array mới là bản sao của array ban đầu, được thay đổi kích thước thành newSize đã cho hoặc nếu newSize không được chuyển thì toàn bộ array sẽ được sao chép.

### Thay đổi type của collections sang loại khác

Tùy từng trường hợp mà bạn có thể thay đổi type của collection. Tại đây, bạn có thể thay đổi loại collection này sang loại collection khác bằng cách tạo collection mới hoặc bằng cách referring đến collection cũ hơn.

**toIntArray**, **toBooleanArray**, **toLongArray**, **toShortArray**, **toByteArray**, **toDoubleArray**, **toList**, **toMap**, **toSet**, **toPair**, vv có thể được sử dụng để thay đổi type của một collection sang type khác.

```java
var uIntArray = UIntArray(5) { 1U }
var intArray = uIntArray.toIntArray()
intArray[0] = 0
print(uIntArray.toList()) // [1, 1, 1, 1, 1]
print(intArray.toList()) // [0, 1, 1, 1, 1]
```

Ở đây, chúng ta đang tạo một collection mới và những thay đổi trong collection mới sẽ không được phản ánh trong collection cũ hơn. Tuy nhiên, bạn có thể giữ tham chiếu đến collection cũ hơn. Đối với điều này thay vì `to`, chúng tôi cần sử dụng `as`:

**asIntArray**, **asLongArray**, **asShortArray**, **asByteArray**, **asList**, vv.

```java
var uIntArray = UIntArray(5) { 1U }
var intArray = uIntArray.asIntArray()
intArray[0] = 0
print(uIntArray.toList()) // [0, 1, 1, 1, 1]
print(intArray.toList()) // [0, 1, 1, 1, 1]
```

### Liên kết dữ liệu bằng một số key

Nếu bạn đang có một list dữ liệu và bạn muốn liên kết dữ liệu với một số key có trong phần tử dữ liệu của mình, thì bạn có thể sử dụng `associateBy`.

```java
data class Contact(val name: String, val phoneNumber: String)

val contactList = listOf(
    Contact("Amit", "+9199XXXX1111"),
    Contact("Ali", "+9199XXXX2222"),
    Contact("Himanshu", "+9199XXXX3333"),
    Contact("Sumit", "+9199XXXX4444")
)

val phoneNumberToContactMap = contactList.associateBy { it.phoneNumber }
print(phoneNumberToContactMap)
// Map with key: phoneNumber and value: Contact
// {
//     +9199XXXX1111=Contact(name=Amit, phoneNumber=+9199XXXX1111),
//     +9199XXXX2222=Contact(name=Ali, phoneNumber=+9199XXXX2222),
//     +9199XXXX3333=Contact(name=Himanshu, phoneNumber=+9199XXXX3333),
//     +9199XXXX4444=Contact(name=Sumit, phoneNumber=+9199XXXX4444)
// }
```

Trong ví dụ trên, key là phoneNumber và value là Contact. Nếu bạn không muốn có toàn bộ Contact làm value, thì bạn có thể chỉ cần chuyển giá trị mong muốn như thế này:

```java
val phoneNumberToContactMap = contactList.associateBy({it.phoneNumber}, {it.name})
print(phoneNumberToContactMap)
// Map with key: phoneNumber and value: name
// {
//     +9199XXXX1111=Amit, 
//     +9199XXXX2222=Ali, 
//     +9199XXXX3333=Himanshu, 
//     +9199XXXX4444=Sumit}
// }
```

### Tìm các phần tử riêng biệt trong một collection

Chúng ta có thể sử dụng hàm `distinct` để lấy list các phần tử duy nhất của một collection.

```java
val list = listOf(1, 2, 2, 3, 3, 3, 4, 4, 4, 4)
println(list.distinct()) // [1, 2, 3, 4]
```

### Union collections

Bạn có thể sử dụng hàm `union` để lấy các phần tử duy nhất của hai collections. Thứ tự của các phần tử của cả hai collection sẽ được giữ nguyên nhưng các phần tử của collection thứ hai sẽ được thêm vào sau các phần tử của collection đầu tiên.

```java
val listOne = listOf(1, 2, 3, 3, 4, 5, 6)
val listTwo = listOf(2, 2, 4, 5, 6, 7, 8)
println(listOne.union(listTwo)) // [1, 2, 3, 4, 5, 6, 7, 8]
```

### Intersection collections

Để lấy các phần tử chung trong hai collections, bạn có thể sử dụng hàm `intersect` trả về một collection chứa phần tử chung của cả hai collections.

```java
val listOne = listOf(1, 2, 3, 3, 4, 5, 6)
val listTwo = listOf(2, 2, 4, 5, 6, 7, 8)
println(listOne.intersect(listTwo)) // [2, 4, 5, 6]
```

### Chỉ giữ các phần tử được chỉ định

Nếu trong một collection, bạn chỉ muốn giữ lại các phần tử được chỉ định thì bạn có thể sử dụng hàm `retainAll`. Vì hàm này sẽ sửa đổi list của bạn, vì vậy hãy đảm bảo rằng list hoặc array của bạn có thể thay đổi được.

`retainAll` sẽ trả về true nếu bất kỳ phần tử nào bị xóa khỏi collection nếu không nó sẽ trả về false.

```java
val listOne = mutableListOf(1, 2, 3, 3, 4, 5, 6)
val listTwo = listOf(1, 2, 3, 3, 4, 5, 6)
val listThree = listOf(1, 2, 3, 3, 4, 5, 7)
println(listOne.retainAll(listTwo)) // false
println(listOne.retainAll(listThree)) // true
println(listOne) // [1, 2, 3, 3, 4, 5]
```

Tương tự, bạn có thể sử dụng `removeAll` để xóa tất cả các phần tử của một tập hợp có trong một tập hợp khác.

### Lọc một collection dựa trên một số điều kiện

Bạn có thể `filter` collection dựa trên các điều kiện nhất định bằng cách sử dụng filter. Điều này trả về một list chứa các phần tử thỏa mãn điều kiện đã cho.

```java
val list = listOf(1, 2, 3, 4, 5, 6, 7, 8)
val filteredList = list.filter { it % 2 == 0 }
print(filteredList) // [2, 4, 6, 8]
```

Tương tự, bạn có thể lọc collection dựa trên chỉ mục của các phần tử bằng cách sử dụng `filterIndexed`.

Nếu bạn muốn lưu trữ các phần tử đã lọc trong một số collection, thì bạn có thể sử dụng `filterIndexedTo`:

```java
val list = listOf(1, 2, 3, 4, 5, 6, 7, 8)
val filteredList = mutableListOf<Int>()
list.filterIndexedTo(filteredList) { index, i -> list[index] % 2 == 0 }
print(filteredList) // [2, 4, 6, 8]
```

Bạn cũng có thể tìm thấy các phần tử là instances của specified type trong một tập hợp bằng cách sử dụng `filterIsInstance`.

```java
val mixedList = listOf(1, 2, 3, "one", "two", 4, "three", "four", 5, 6, "five", 7)
val strList = mixedList.filterIsInstance<String>()
print(strList) // [one, two, three, four, five]
```

### Zip collections

`zip` trả về một list of pairs. Phần tử `first` của `pair` sẽ được lấy từ collection đầu tiên và phần tử `second` của `pair` sẽ được lấy từ collection thứ hai. Kích thước của list trả về sẽ bằng kích thước của collection ngắn nhất.

```java
val listOne = listOf(1, 2, 3, 4, 5)
val listTwo = listOf("a", "b", "c", "d", "e", "f")
print(listOne zip listTwo) // [(1, a), (2, b), (3, c), (4, d), (5, e)]
```

### Zip với phần tiếp theo trong một collection

`zipWithNext` trả về một list of pairs. Các phần tử của pair sẽ là các phần tử liền kề của collection.

```java
val list = listOf(1, 2, 3, 4, 5)
print(list.zipWithNext()) // [(1, 2), (2, 3), (3, 4), (4, 5)]
```

### Unzip collection

`unzip` trả về một pair of lists. List đầu tiên được tạo từ phần tử `first` của mỗi `pair` và list thứ hai được tạo từ phần tử `second` của mỗi `pair`.

```java
val list = listOf("Amit" to 8, "Ali" to 10, "Sumit" to 4, "Himanshu" to 2)
val (players, footballSkills) = list.unzip()
print(players) // [Amit, Ali, Sumit, Himanshu]
print(footballSkills) // [8, 10, 4, 2]
```

### Chia collection thành hai phần dựa trên một số điều kiện

Nếu bạn muốn chia collection của mình thành hai phần dựa trên một số điều kiện, thì bạn có thể sử dụng `partition`.

```java
data class User(val id: Int, val name: String, val isFootballLover: Boolean)

val users = listOf(
    User(1, "Amit", true),
    User(2, "Ali", true),
    User(3, "Sumit", false),
    User(4, "Himanshu", false)
)

val (footballLovers, nonFootballLovers) = users.partition { it.isFootballLover }
print(footballLovers) // [User(id=1, name=Amit, isFootballLover=true), User(id=2, name=Ali, isFootballLover=true)]
print(nonFootballLovers) // [User(id=3, name=Sumit, isFootballLover=false), User(id=4, name=Himanshu, isFootballLover=false)]
```

### Đảo ngược list

Bạn có thể đảo ngược list trong Kotlin bằng cách sử dụng hàm `reversed` và `asReversed`.

```java
val list = listOf(1, 2, 3, 4, 5)
print(list.reversed()) // [5, 4, 3, 2, 1]
print(list.asReversed()) // [5, 4, 3, 2, 1]
```

Cả hai đều cho cùng một đầu ra nhưng các chức năng này khác nhau.

`reversed()` có thể được áp dụng trên Array, List, và MutableList. Nó tạo ra một list mới, ngược lại với list ban đầu.

Nhưng hàm `asReversed()` có thể được áp dụng trên List và MutableList. Nó không tạo ra một list mới bởi vì sau khi đảo ngược, các phần tử mới vẫn tham chiếu đến list cũ.

Tương tự như vậy, có những hàm khác có thể được sử dụng để đảo ngược như `reversedArray()`, `reverse()`.

### Nhóm các phần tử của một collection dựa trên một số điều kiện

Bạn có thể sử dụng `groupBy()` để nhóm các phần tử của một collection dựa trên các điều kiện nhất định.

```java
val list = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
print(list.groupBy { it % 4 })
// {
//     1=[1, 5, 9], 
//     2=[2, 6, 10], 
//     3=[3, 7], 
//     0=[4, 8]
// }
```

### Sắp xếp phần tử của một collection

Bạn có thể sắp xếp các phần tử của một tập hợp bằng cách sử dụng hàm `sorted()`. Nó sẽ trả về một danh sách đã được sắp xếp.

```java
val list = listOf(10, 4, 1, 3, 7, 2, 6)
print(list.sorted()) // [1, 2, 3, 4, 6, 7, 10]
```

Tương tự, có những hàm khác có thể được sử dụng để sắp xếp collection dựa trên các điều kiện nhất định. ví dụ **sortedArray**, **sortedArrayWith**, **sortedBy**, **sortedByDescending**, **sortedArraydescending**, **sortedWith**, vv.

Đây là một số collection functions có thể được sử dụng trong khi xử lý các collection trong Kotlin.

### Reference
* https://blog.mindorks.com/kotlin-collection-functions
* https://kotlinlang.org/docs/collection-operations.html
* https://medium.com/mobile-app-development-publication/kotlin-collection-functions-cheat-sheet-975371a96c4b