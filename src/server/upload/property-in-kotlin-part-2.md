Chào mọi người, chúng ta sẽ lại tiếp tục tìm hiểu property trong kotlin, trong phần 2 này chúng ta sẽ đi qua các loại property phổ biến còn lại, cùng tìm hiểu nhé.
### 1. Property References
- Trong kotlin, chúng ta có thể tham chiếu đến các properties trong kotlin thông qua operator **::** 
- Ex:
     ``` 
     class Person(val name: String, var age: Int) {
            fun present() = "I'm $name, and I'm $age years old"
            fun greet(other: String) = "Hi, $other, I'm $name"
        } 
     ```    
- Sau đó, ta có thể tham chiếu đến property của Person class bằng cách:
    ```
    val prop = Person :: name	
    ```
- Kết quả trả về là một object đại diện cho một tham chiếu đến một property có loại là:
    *  KProperty1<R,V> nếu là tham chiếu đến Immutable properties: sẽ cho phép bạn đọc giá trị mà property có trong trường hợp đó bằng cách gọi get () 
    *  KMutableProperty1 <R, V> nếu là thuộc tính mutable properties: cũng sẽ cho phép bạn thay đổi giá trị property trong instance bằng cách gọi set (). 
        Với R ->  tham số , V -> Kiểu trả về
- Ngoài các thông tin cơ bản như trong Java mà  có thể lấy từ property reference thì chúng ta cũng có thể xác minh rằng property là constant, late init hay mutable trong quá trình test
- Ex: 
    ```
    lateinit var mutableProperty: String
    val property = this::mutableProperty
    assertEquals("mutableProperty", property.name)
    assertTrue(property.isLateinit)
    assertFalse(property.isConst)
    assertTrue(property is KMutableProperty<*>)
    ```
- Reference property với loại là Top-level property bằng cách  sử dụng  operator **: :** với tên property: kết quả trả về tương tự sẽ là KProperty0<V> hoặc KMutableProperty0<V>
- Ex:
    ```
    val x = 1
    var y = 2
      fun main() {
          val a = ::x     		// a: KProperty0<Int>
          val b = ::y     		// b: KMultableProperty0<Int>
          println(a.get())    	// 1
          b.set(3)
          println(b.get())    	// 3
      }
    ```
- Reference property là member của class:  tương tự nhưng trong hàm get() chúng ta phải truyền đối tượng của class có property được tham chiếu, với đầy đủ giá trị các property 
- Ex: 
    ```
    class A(val x: Int)
    fun main(args: Array<String>) {
       val prop = A :: x
       println(prop.get(A(5)))     // 5
    } 
    ```
### 2. Inline Property
- Chúng ta có thể tối ưu hóa các cuộc gọi property bằng cách sử dụng inline modifie với keyword **inline**
- Trong quá trình biên dịch, mỗi lần gọi đến property sẽ được tối ưu hóa, thay vì thực sự gọi property, cuộc gọi sẽ được thay thế bằng phần thân của property
- Ex:
    ```
    inline val now: Long
       get() {
           println("Time retrieved")
           return System.currentTimeMillis()
       }
    ```
Với  inline property đoạn mã trên sẽ được compile thành
    ```
        println("Time retrieved")
        System.currentTimeMillis()
    ```
- Điều này cải thiện hiệu suất bởi vì, getter sẽ không được gọi vì phần body sẽ thay thế cho property
- Nhược điểm: chỉ có một giới hạn là nó chỉ có thể áp dụng cho các thuộc tính không có backing field.
### 3. Delegate Property 
- Để tìm hiểu phần này, trước tiên các bạn cần nằm được khái niệm [Delegation](https://kotlinlang.org/docs/reference/delegation.html) trong kotlin 
- Đối với 1 số loại property phổ biến nhất định, mặc dù chúng ta có thể triển khai chúng theo cách thủ công mỗi khi chúng ta cần, nhưng sẽ rất tốt để thực hiện một lần và mãi mãi, và đưa vào thư viện. Chúng bao gồm: 
    * lazy properties: property chỉ được tính  khi truy cập lần đầu
    * observable properties: listeners sẽ nghe được những thay đổi đối với property này
    * storing properties trong 1 map, thay vì 1 trường riêng cho từng thuộc tính  
- Ex: chúng ta sẽ khai báo 1 delegate property là p với cú pháp `val/var <property name>: <Type> by <expression>` với expression là delegate bởi vì get() (and set()) tương ứng với property
    ```
        class Example { 
               var p: String by Delegate()
        }
    ``` 
- Các delegate property sẽ không phải implement interface nào, nhưng đối với khai báo var thì ta phải cung cấp một getValue () và setValue ()
    ```
    class Delegate {
       // thisRef: chính là object đọc p
       // property: giữ description của p
       operator fun getValue(thisRef: Any?, property: KProperty<*>): String {
           return "$thisRef, thank you for delegating '${property.name}' to me!"
       }
       // value: giữ giá trị được gán
       operator fun setValue(thisRef: Any?, property: KProperty<*>, value: String) {
           println("$value has been assigned to '${property.name}' in $thisRef.")
       }
    ```
### 4. Conclusion 
- Như vậy, mình đã giới thiệu xong hầu hết các loại property phổ biến mà hiện tại đã được Kotlin hỗ trợ
- Trong bài viết có tham khảo nguồn từ: https://kotlinlang.org/docs/tutorials 
- Cảm ơn các bạn đã đọc, xin chào tạm biệt và hẹn gặp lại.