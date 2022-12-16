Trong bài viết này, mình sẽ giới thiệu về cách sử dụng class và functions trong Kotlin.

### 1. Cách khai báo class
Khai báo class trong Kotlin rất đơn giản, bạn chỉ cần thêm từ khóa "class" trước tên class
```
class MainActivity {

}
```
Class sẽ có 1 constructor mặc định duy nhất. Chúng ta có thể tạo thêm nhiều constructor khác cho những trường hợp có thêm những tham số. Khi tạo thêm constructor có tham số, các tham số được viết sau tên của class, bên trong cặp ngoặc "()" đặt cạnh tên class:
```
class Person(name: String, surname: String)
```

Thân hàm của constructor sẽ được viết trong khối lệnh init:
```
class Person(name: String, surname: String) {
     init {
     ...
     }
}

```

Để tạo 1 hoặc nhiều constructor thứ cấp, ta sử dụng từ khóa **constructor**:
```
constructor(): this(name, surname) {
    ...
}
```
Chú ý rằng trong constructor thứ cấp cần phải chỉ định lại các tham số đã dùng trong constructor chính thông qua "this", tương đương với super() trong Java
### 2. Class inheritance (kế thừa)
Mặc định, 1 class luôn luôn extends từ Any (giống như Object trong Java), nhưng chúng ta cũng có thể kế thừa thêm từ những class khác. Để kế thừa trong Kotlin, thay vì sử dụng extends như trong  Java, chúng ta chỉ cần thay bằng dấu ":" 
```
open class Animal(name: String)
class Person(name: String, surname: String) : Animal(name)
```

### 3. Functions
Functions trong Kotlin được khai báo chỉ với từ khóa "fun"

```
fun onCreate(savedInstanceState: Bundle?) {
}
```
Trong Java, kiểu trả về của mỗi hàm sẽ được đặt lên trước tên hàm, nhưng trong Kotlin, kiểu trả về được đặt sau dấu ":" sau tên của hàm: 
```
fun add(x: Int, y: Int) : Int {
    return x + y
}
```
Nếu không trả về bất kì kiểu nào, hàm sẽ mặc định trả về **Unit**, giống như **void** trong Java. Khi không khai báo kiểu trả về mà trong thân hàm vẫn return về 1 giá trị nào đó, khi đó trình biên dịch sẽ tự động hiểu là hàm trả về đúng với kiểu của giá trị đó, ví dụ: 
```
fun add(x: Int, y: Int) = x + y
```
Trong ví dụ trên, hàm add sẽ có kiểu trả về giống với kiểu của "x + y", đó là Int.

### 4. Tham số trong Functions
Tham số trong Kotlin khá khác so với trong Java. Như các bạn thấy, chúng ta viết tên của tham số trước và sau đó là kiểu tham số, ngăn cách với nhau bởi ":"
```
fun add(x: Int, y: Int) : Int {
     return x + y
}
```
Một điều khá hay trong Kotlin là ta có thể sử dụng 1 tham số có giá trị mặc định để truyền vào. Ví dụ ở dưới là 1 hàm để Toast lên 1 message: 

```
fun toast(message: String, length: Int = Toast.LENGTH_SHORT) {
    Toast.makeText(this, message, length).show()
}
```
Tham số thứ 2 (length) đã được chỉ định rõ là 1 giá trị default. Chính vì thế mà bạn có thể viết tham số thứ 2 hoặc không, điều này tránh được sự cần thiết của tính năng overloading: 
```
toast("Hello")
toast("Hello", Toast.LENGTH_LONG)
```
Điều này tương đương với đoạn code sau trong Java:
```
void toast(String message){
    toast(message, Toast.LENGTH_SHORT);
}

void toast(String message, int length){
    Toast.makeText(this, message, length).show();
}
```
Đỡ phải viết thêm 1 hàm đúng không nào, điều này cũng tương đương với các hàm có nhiều tham số là các default value.
Bên trên mình đã khái quát sơ qua về class và functions trong Kotlin, bài viết còn hơi sơ sài và khá nhiều thiếu sót, mong các bạn comment phía dưới để mình cải thiện được bài viết.