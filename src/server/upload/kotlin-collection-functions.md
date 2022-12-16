Xin chào các bạn đã quay trở lại với bài chia sẻ của mình.

Bạn là người mới hay đã code Android lâu năm thì chắc hẳn các bạn đều biết bây giờ hầu hết các ứng dụng Android đều đã chuyển qua Kotlin để viết. Để tăng tốc độ code cũng như code một cách gọn gàng sạch sẽ thì Kotlin hỗ trợ cho chúng ta rất nhiều collection để ta áp dụng.
Bài viết này của mình chia sẻ về một số Collection Function trong Kotlin, hy vọng sẽ giúp ích phần nào cho các bạn trong công việc cũng như trong quá trình học tập.

Chúng ta cùng bắt đầu thôi nào. Let's go....

## 1. Remove Duplicate Strings
- Có nhiều cách để loại bỏ các chuỗi trùng lặp khỏi một mảng:
    + Sử dụng **distinct()**:
    ```kotlin
    val devs = arrayOf("Amit", "Ali", "Amit", "Sumit", "Sumit", "Himanshu")
    print(devs.distinct()) // [Amit, Ali, Sumit, Himanshu]
    ```
    + Sử dụng **toSet()**:
    ```kotlin
    val devs = arrayOf("Amit", "Ali", "Amit", "Sumit", "Sumit", "Himanshu")
    print(devs.toSet()) // [Amit, Ali, Sumit, Himanshu]
    ```
    + Sử dụng **toMutableSet()**:
    ```kotlin 
    val devs = arrayOf("Amit", "Ali", "Amit", "Sumit", "Sumit", "Himanshu")
    print(devs.toMutableSet()) // [Amit, Ali, Sumit, Himanshu]
    ```
    + Sử dụng **toHashSet()**:
    ```kotlin
    val devs = arrayOf("Amit", "Ali", "Amit", "Sumit", "Sumit", "Himanshu")
    print(devs.toHashSet()) // [Amit, Himanshu, Sumit, Ali]
    ```
- **Chú ý:**  
    - Các function: `distinct()` , `toSet()`, `toMutableSet()` thì sẽ duy trì thứ tự ban đầu của array
    - Còn `toHashSet()` thì sẽ KHÔNG duy trì thứ tự ban đầu của array
  
##  2. Convert 1 array hoặc list thành 1 string
- Bạn có thể convert một array hoặc list thành một string bằng cách sử dụng `joinToString`. Ví dụ nếu bạn có một danh sách gồm tên các thành phố: `(HaNoi, BacNinh, DaNang)`, bạn có thể chuyển đổi thành một chuỗi như sau: `"HaNoi, BacNinh, DaNang : là các tỉnh thành của Việt Nam"`
    + **Ví dụ 1:**
    ```kotlin
    val listCities = listOf("HaNoi","BacNinh","DaNang")
    
    val message = listCities.joinToString(
        separator = ", ",
        postfix = ": là các tỉnh thành của Việt Nam",
    )
    
    print(message) //HaNoi, BacNinh, DaNang: là các tỉnh thành của Việt Nam 
    ```
    + **Ví dụ 2:**
     ```kotlin
     val listCities = listOf("HaNoi","BacNinh","DaNang")

    val message = listCities.joinToString(
        separator = ", ",
        postfix = ": là các tỉnh thành của Việt Nam",
        limit = 2,
        truncated = ".v.v. "
    )

    print(message) //HaNoi, BacNinh, .v.v. : là các tỉnh thành của Việt Nam
     ```
##  3. Chuyển 1 tập hợp thành 1 kết quả 
- Nếu bạn muốn chuyển đổi một tập hợp nhất định thành 1 kết quả duy nhất, thì bạn có thể sử dụng function `reduce `. 
- **Ví dụ 1:**  bạn có thể tính tổng của tất cả các phần tử trong list.
```kotlin
	val numList = listOf(1,2,3,4,5)
	val result = numList.reduce { result, item ->
    	result + item
	}
	print(result) // 15
```
- **Ví dụ 2:**
```kotlin
val strings = listOf("a", "b", "c", "d")
println(strings.reduce { acc, string -> acc + string }) // abcd
println(strings.reduceIndexed { index, acc, string -> acc + string + index }) // ab1c2d3
```
- **Chú ý:** Nếu list rỗng thì sẽ xảy ra exception: `RuntimeException`
## 4. Tìm tất cả phần tử có thỏa mãn 1 điều kiện hay không.
- Nếu bạn có 1 array hoặc 1 list các phần tử dữ liệu và bạn muốn tìm xem liệu rất cả các phần tử có thỏa mãn một điều kiện cụ thể hay không thì bạn có thể sử dụng `all` trong Kotlin.
```kotlin
data class User(val id: Int, val name: String, val isLoveCar: Boolean, val isLoveBook: Boolean)

val users = mutableListOf<User>(
    User(id = 1, name = "A", isLoveCar= true, isLoveBook= true),
    User(id = 2, name = "B", isLoveCar= true, isLoveBook= true),
    User(id = 3, name = "C", isLoveCar= true, isLoveBook= false),
    User(id = 4, name = "D", isLoveCar= true, isLoveBook= true)
)

println(users.all{it.isLoveCar}) //true
println(users.all{it.isLoveBook}) //false
```
## 5. Tìm phần tử trong list dựa vào 1 điều kiện cụ thể.
- Bạn có thể tìm thấy một phần tử cụ thể từ danh sách các phần tử đáp ứng một điều kiện cụ thể bằng cách sử dụng `single` and `find` trong Kotlin. 
    + **find**: trả về phần tử đầu tiên phù hợp với điều kiện đã cho hoặc null nếu không tìm thấy phần tử như vậy.
    + **single**: trả về phần tử duy nhất phù hợp với điều kiện đã cho hoặc nó sẽ ném ra một ngoại lệ `IllegalArgumentException` nếu có nhiều hơn một phần tử phù hợp hoặc `NoSuchElementException` nếu không có phần tử phù hợp nào trong danh sách.
 ```kotlin
data class User(val id: Int, val name: String)

val users = arrayOf(
    User(1, "A"),
    User(2, "B"),
    User(3, "C"),
    User(4, "A")
)

println(users.single { it.id == 3 }) // User(id=3, name=C)
println(users.find { it.name == "A" }) // User(id=1, name=A)
 ```
##  6. Chia list thành nhiều list nhỏ
- Có nhiều trường hợp khi bạn có một list lớn hơn và bạn muốn chia nó thành các phần tử nhỏ hơn và sau đó thực hiện một số thao tác lên trên các danh sách con đó. Bạn có thể sử dụng function `chunked`
```kotlin
val numList = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
val chunkedLists = numList.chunked(3)
print(chunkedLists) // [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
```
## 7. Tạo bản sao của array
- Bạn có thể tạo bản sao của mảng hiện có của mình bằng cách sử dụng các hàm khác nhau như:
    + **copyInto**:  Điều này sẽ thay thế các phần tử của một mảng thành một mảng khác hoặc nó sẽ ném ra một ngoại lệ nếu mảng đích không thể chứa các phần tử của mảng ban đầu do các hạn chế về `size` hoặc `index` nằm ngoài giới hạn.
    ```kotlin
    val arrayOne = arrayOf("1","2","3","4","5","6","7","8","9","10")
    val arrayTwo = arrayOf("a","b","c","d","e","f","g","h","i","j")
    arrayOne.copyInto(destination = arrayTwo, destinationOffset = 2, startIndex = 0, endIndex = 4)
    arrayTwo.forEach {print("$it ")} // a b 1 2 3 4 g h i j
    // Thay thế phần tử của arrayOne vào arrayTwo
    // destinationOffset = 2 : thay thế từ ptu thứ 2 trong arrayTwo
    // startIndex = 0: Bắt đầu từ ptu index=0 trong arrayOne
    // endIndex = 4 : Kết thúc trước ptu có index=4 trong arrayOne
    ```
  
  + Tương tự, có những hàm khác có thể được sử dụng để sao chép các phần tử của một mảng. Ví dụ:
      + **copyOfRange(fromIndex, toIndex)**: Trả về một array mới là bản sao của phạm vi được chỉ định của array ban đầu.
      ```kotlin
        val arrayOne = arrayOf("1","2","3","4","5","6","7","8","9","10")
        val arrayTwo = arrayOne.copyOfRange(0,5)
        arrayTwo.forEach {print("$it ")} // 1 2 3 4 5
      ```
      + **copyOf() hoặc copyOf(newSize)**: Trả về một mảng mới là bản sao của mảng ban đầu, được thay đổi kích thước thành newSize đã cho hoặc nếu newSize không được chuyển thì toàn bộ mảng sẽ được sao chép.
    ```kotlin
    val array = arrayOf("apples", "oranges", "limes")
    val arrayCopy = array.copyOf()
    println(arrayCopy.contentToString()) // [apples, oranges, limes]
    ```
    
    ```kotlin
    val array = intArrayOf(1, 2, 3)
    val arrayCopyPadded = array.copyOf(5)
    println(arrayCopyPadded.contentToString()) // [1, 2, 3, 0, 0]
    val arrayCopyTruncated = array.copyOf(2)
    println(arrayCopyTruncated.contentToString()) // [1, 2]
    ```
  
## 8. Liên kết dữ liệu bằng một số key
- Nếu bạn đang có một danh sách dữ liệu và bạn muốn liên kết dữ liệu với một số key có trong phần tử dữ liệu của mình, thì bạn có thể sử dụng `associateBy`. Khi sử dụng `associateBy` chúng ta sẽ nhận về một Map.
```kotlin
data class Person(val firstName: String, val lastName: String)

val scientists = listOf(Person("A", "B"), Person("C", "D"))
val byLastName = scientists.associateBy { it.lastName }

println(byLastName) // {B=Person(firstName=A, lastName=B), D=Person(firstName=C, lastName=D)}
//B=Person(firstName=A, lastName=B) : key= B , value = Person(firstName=A, lastName=B)
```

- Trong ví dụ trên sẽ tạo ra 1 map với key = lastName và value sẽ là Object Person. Tuy nhiên nếu bạn muốn tạo key = lastName và value = firstName thì có thể làm như sau:
```kotlin
data class Person(val firstName: String, val lastName: String)

val scientists = listOf(Person("A", "B"), Person("C", "D"))
val byLastName = scientists.associateBy({ it.lastName }, { it.firstName })

println(byLastName) // {B=A, D=C}
//B=A , key = B, value= A
```
## 9. Tìm các phần tử riêng biệt trong list.
- Bạn có thể sử dụng function `distinct` để có được danh sách các phần tử duy nhất của 1 list.
    ```kotlin
    val list = listOf(1, 2, 2, 3, 3, 3, 4, 4, 4, 4)
    println(list.distinct()) // [1, 2, 3, 4]
    ```
## 10. Hợp nhất các phần tử riêng biệt của 2 list.
- Các bạn có thể sử dụng `union` để có được các phần tử duy nhất của 2 list. Thứ tự của các phần tử của cả 2 list sẽ được giữ nguyên nhưng các phần tử của list thứ 2 sẽ được thêm vào sau các phần tử của list thứ 1.
    ```kotlin
    val listOne = listOf(1, 2, 3, 3, 4, 5, 6)
    val listTwo = listOf(2, 2, 4, 5, 6, 7, 8)
    println(listOne.union(listTwo)) // [1, 2, 3, 4, 5, 6, 7, 8]
    ```
 ## 11. Lấy ra các phần tử giống nhau của 2 list
 - Để lấy các phần tử chung trong 2 list bạn có thể sử dụng function `intersect`. Nó sẽ trả về một list chứa các phần tử chung của 2 tập list.
     ```kotlin
     val listOne = listOf(1, 2, 3, 3, 4, 5, 6)
    val listTwo = listOf(2, 2, 4, 5, 6, 7, 8)
    println(listOne.intersect(listTwo)) // [2, 4, 5, 6]
     ```
 ## 12. Lấy ra các phần tử được chỉ định trong list
 - Nếu trong 1 list, bạn chỉ muốn giữ lại các phần tử đã được chỉ định thì bạn có thể dùng function `retainAll` . Do hàm này sẽ sửa đổi lại list của bạn nên hãy đảm bảo rằng list hoặc array của bạn có thể thay đổi được.
 - `retainAll` sẽ trả về true nếu bất kỳ phần tử nào bị xóa khỏi list, ngược lại thì sẽ trả về false.
     ```kotlin
     val listOne = mutableListOf(1, 2, 3, 3, 4, 5, 6)
    val listTwo = listOf(1, 2, 3, 3, 4, 5, 6) // list2 chứa các ptu được chỉ định giữ lại
    val listThree = listOf(1, 2, 3, 3, 4, 5, 7)// list3 chứa các ptu được chỉ định giữ lại
    println(listOne.retainAll(listTwo)) // false - không ptu nào bị xóa
    println(listOne.retainAll(listThree)) // true - ptu 6 đã bị xóa
    println(listOne) //[1, 2, 3, 3, 4, 5]
     ```
  - Tương tự bạn có thể sử dụng `removeAll` để xóa tất cả các phần tử của 1 list có trong 1 list khác.
      ```kotlin
        val listOne = mutableListOf(1, 2, 3, 3, 4, 5, 6)
        val listTwo = mutableListOf(1,2,3)
        listOne.removeAll(listTwo)
        println(listOne) //[4, 5, 6]
      ```
  ## 13. Lọc 1 list dựa trên 1 số điều kiện
  - Bạn có thể sử dụng `filter` cùng với 1 số điều kiện để lọc 1 list. Điều này trả về một danh sách chứa các phần tử thỏa mãn điều kiện đã cho.
      ```kotlin
         //case1
        val list = listOf(1, 2, 3, 4, 5, 6, 7, 8)
        val filteredList = list.filter { it % 2 == 0 }
        print(filteredList) // [2, 4, 6, 8]
        
        //case2
        data class User(val id: String,val name: String)
    
        val users = mutableListOf<User>(
            User("1","A"),
            User("2","B"),
            User("3","B")
        )
    
        println(users.filter{ user -> user.name == "B"}) 
        // [User(id=2, name=B), User(id=3, name=B)]
      ```
   - Tương tự, bạn có thể lọc 1 list dựa trên chỉ mục của các phần tử bằng cách sử dụng: `filterIndexed`. Nếu bạn muốn lưu trữ các phần tử đã lọc trong một số list, thì bạn có thể sử dụng `filterIndexedTo`
       ```kotlin
       //Case1
        val list = listOf(0, 1, 3, 8, 4, 8, 6, 8)
        print(list.filterIndexed{value, i -> value==i}) // [0, 1, 4, 6]
        
       //Case2
        val list = listOf(1, 2, 3, 4, 5, 6, 7, 8)
        val filteredList = mutableListOf<Int>()
        list.filterIndexedTo(filteredList) { value, i -> list[index] % 2 == 0 } // value là giá trị của các ptu trong list
        print(filteredList) // [2, 4, 6, 8]
       ```
  - Bạn cũng có thể tìm thấy các phần tử là các bản sao của 1 kiểu dữ liệu cụ thể trong 1 list bằng cách sử dụng: `filterIsInstance`
      ```kotlin
      val mixedList = listOf(1, 2, 3, "one", "two", 4, "three", "four", 5, 6, "five", 7)
    val strList = mixedList.filterIsInstance<String>()
    print(strList) // [one, two, three, four, five]
      ```
 ## 14. Zip collections
 - `Zip` trả về 1 list các cặp với nhau. Kích thước của danh sách trả về sẽ bằng kích thước của tập hợp ngắn nhất.
     ```kotlin
     val listOne = listOf(1, 2, 3, 4, 5)
    val listTwo = listOf("a", "b", "c", "d", "e", "f")
    print(listOne zip listTwo) // [(1, a), (2, b), (3, c), (4, d), (5, e)]
     ```
 - Ngoài ra bạn có thể tạo ra các cặp với các phần tử liên tiếp trong cùng 1 list bằng cách sử dụng `zipWithNext`
     ```kotlin
     val list = listOf(1, 2, 3, 4, 5)
    print(list.zipWithNext()) // [(1, 2), (2, 3), (3, 4), (4, 5)]
     ```
## 15. UnZip một list các cặp.
- `unzip` trả về 2 list riêng biệt. Danh sách đầu tiên được tạo từ phần tử đầu tiên của mỗi cặp và danh sách thứ hai được tạo từ phần tử thứ hai của mỗi cặp.
    ```kotlin
    val list = listOf("A" to 8, "B" to 10, "C" to 4, "D" to 2)
    val (names, numbers) = list.unzip()
    print(names) // [A, B, C, D]
    print(numbers) // [8, 10, 4, 2]
    ```
## 16. Chia list thành hai phần dựa trên một số điều kiện
- Nếu bạn muốn chia dữ liệu của mình thành hai phần dựa trên một số điều kiện ví dụ như **isLoveBook**, thì bạn có thể sử dụng: `partition`
    ```kotlin
   data class User(val id: Int, val name: String, val isLoveBook: Boolean)

    val users = listOf(
        User(1, "A", true),
        User(2, "B", true),
        User(3, "C", false),
        User(4, "D", false)
    )

    val (userLoveBooks, userNotLoveBooks) = users.partition { it.isLoveBook }
    println(userLoveBooks) // [User(id=1, name=A, isLoveBook=true), User(id=2, name=B, isLoveBook=true)]
    println(userNotLoveBooks) //[User(id=3, name=C, isLoveBook=false), User(id=4, name=D, isLoveBook=false)]
    ```
## 17. Đảo ngược 1 list
- Bạn có thể đảo ngược danh sách trong Kotlin bằng cách sử dụng function `reversed` và `asReversed`
    ```kotlin
    val list = listOf(1, 2, 3, 4, 5)
    print(list.reversed()) // [5, 4, 3, 2, 1]
    print(list.asReversed()) // [5, 4, 3, 2, 1]
    ```
 - Có thể bạn không biết, tuy cả 2 cùng đầu ra nhưng chức năng chúng khác nhau.
     + Function `reversed()` có thể được áp dụng trên  **Array, List, and MutableList**. Nó tạo ra một danh sách mới, ngược lại với danh sách ban đầu.
     + Nhưng với function `asReversed()` có thể được áp dụng trên **List và MutableList**. Nó không tạo ra một danh sách mới bởi vì sau khi đảo ngược, các phần tử mới vẫn tham chiếu đến phần tử cũ. Vì vậy, bất kỳ sự thay đổi nào trong một trong số chúng sẽ dẫn đến sự thay đổi trong cái còn lại.
     + Tương tự, có những hàm khác có thể được sử dụng để đảo ngược các phần tử như `reverseArray ()`, `reverse ()`.
 
## 18. Nhóm các phần tử của 1 list dựa trên một số điều kiện.
- Bạn có thể sử dụng `groupBy()` để nhóm các phần tử của một list dựa trên các điều kiện nhất định. Ví dụ: Nhóm các phần tử của danh sách dựa trên phần dư khi chia  lấy dư cho 4.
    ```kotlin
        //Case 1
        val list = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
        print(list.groupBy { it % 4 })
        //{1=[1, 5, 9], 2=[2, 6, 10], 3=[3, 7], 0=[4, 8]}
        // Chia 4 dư 1 có 1,5,9
        // Chia 4 dư 2 có 2,6,10
        ...
        
        //Case 2
        val list = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
        println(list.groupBy { it%2==0 })
        //{false=[1, 3, 5, 7, 9], true=[2, 4, 6, 8, 10]}
    ```
## 19. Sắp xếp các phần tử trong danh sách
- Bạn có thể sắp xếp các phần tử của một danh sách bằng cách sử dụng hàm `sorted()`. Điều này sẽ trả về một danh sách đã được sắp xếp.
    ```kotlin
        val list = listOf(10, 4, 1, 3, 7, 2, 6)
        print(list.sorted()) // [1, 2, 3, 4, 6, 7, 10]
    ```
- Tương tự, có những hàm khác có thể được sử dụng để sắp xếp danh sách dựa trên các điều kiện nhất định như: **sortedArray, sortedArrayWith, sortedBy, sortedByDescending, sortedArraydescending, sortedWith...**

## 20. Tạo list từ n phần tử trong list có sẵn
- Bạn có thể lấy n phần tử của 1 danh sách có sẵn bằng hàm `take()`
    ```kotlin
        val list = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
        val a = list.take(4)
        println(a) // [1, 2, 3, 4]
    ```

- Lấy n phần tử cuối của danh sách bằng hàm `takeLast()`
    
    ```kotlin
        val list = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
        val a = list.takeLast(4)
        println(a) // [7, 8, 9, 10]
    ```

- Hàm `takeWhile()` sẽ lấy các phần tử cho đến khi không thỏa mãn điều kiện. Nếu phần từ đầu không thỏa mãn điều kiện thì list trả về rỗng.

    ```kotlin
        //case1
        val list = listOf(1,2, 3, 4, 5, 6, 7, 8, 9, 10)
        val a = list.takeWhile{it%2==0}
        println(a) //[]
        
        //case2
            val list = listOf(2, 4, 6, 7, 8, 9, 10)
            val a = list.takeWhile{it%2==0}
            println(a) // [2, 4, 6]
    ```

- Hàm `takeLastWhile()` cũng tương tự như `takeWhile()` tuy nhiên nó sẽ lấy các phần tử ở cuối danh sách. Chú ý là list trả về vẫn theo thứ tự ban đầu

    ```kotlin
        val list = listOf(2, 4, 6, 7, 8, 9, 10).reversed() // [10, 9, 8, 7, 6, 4, 2]
        val a = list.takeLastWhile{it%2==0}
        println(a) // [6, 4, 2]
    ```

 - Loại bỏ n phần tử trong danh sách có sẵn bằng `drop()`
 
     ```kotlin
         val list = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
         val a = list.drop(4)
         println(a) // [5, 6, 7, 8, 9, 10]
     ```
 
 - Loại bỏ n phần tử cuối danh sách có sẵn bằng `dropLast()`
     ```kotlin
         val list = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
        val a = list.dropLast(4)
        println(a) // [1, 2, 3, 4, 5, 6]
     ```

## Kết luận
- Có rất nhiều collection trong kotlin khác, tuy nhiên ở đây mình xin phép chia sẻ một số các function thường hay được dùng trong Kotlin. Các bạn còn biết thêm được nhưng function hữu ích khác thì hãy comment xuống bài viết để chúng mình cùng nhau tìm hiểu nhé.
- Bài viết trên là cá nhân tìm hiểu nên có thể đúng, có thể sai, mong được mọi người góp ý.
- Cảm ơn mọi người đã đọc bài của mình
- Tài liệu tham khảo:
    + https://blog.mindorks.com/kotlin-collection-functions
    + https://kotlinlang.org/