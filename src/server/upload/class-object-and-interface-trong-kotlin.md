Trong bài viết này chúng ta sẽ đi sâu vào tìm hiểu về class, interface để thấy được sự khác nhau giữa Kotlin và Java.
# 1. Định nghĩa class trong Kotlin:
Trong Java class có thể khai báo nhiều contructor, trong Kotlin cũng vậy nhưng có thêm một vài thay đổi nhỏ: contructor trong Kotlin phân biệt ra 2 loại: primary contructor và secondary contructor.
* primary contructor: thường là contructor chính, để khởi tạo class và được khai báo tách biệt với thân class.
* secondary contructor: được khai báo trong thân class.
Class trong Kotlin tồn tại 1 khối gọi là initializer block: cho phép bạn thêm các logic để khởi tạo.
### 2.1 Class và property
Sau đây chúng ta có ví dụ về class trong java:
```
public class Person { 
        private final String name; 
        public Person(String name) { 
            this.name = name; 
        } 
        public String getName() { 
            return name;
        } 
    }
```
Nếu chúng ta sử dụng tool để convert class Person từ Java sang Kotlin chúng ta sẽ có được class: <br>
`class Person(val name: String)`
Class Person được chuyển sang Kotlin thật ngắn ngọn phải không nào! 
Những class chỉ chứa dữ liệu như vậy được gọi là `value object`. Chú ý trong Kotlin từ khóa public được sử dụng mặc định thay cho default trong java nên chúng ta không còn cần sử dụng "public" cho class Person trong Kotlin.<br>
Trong java chúng ta thường khai báo các property và các getter, setter phù hợp cho mục đích sử dụng của các property. Như trong class Person trên chúng ta chỉ tạo hàm `getName()`  để lấy giá trị của biến việc này tạo ra những đoạn code dài và nhàm chán. Để khắc phục điều này Kotlin đã thay thế bằng từ khóa `val` và `var`. 
<br>Với `val`: read-only (chỉ để đọc) chỉ khỏi tạo getter, với `var`: mutable (có thể thay đổi được): khởi tạo getter và setter. Các hàm getter, setter sẽ được tạo tự động. Với Kotlin thay vì gọi hàm getter chúng ta chỉ cần trỏ tới property trực tiếp:<br>
` println(person.name) `
<br>Trong trường hợp bạn muốn có custom setter hoặc getter bạn vẫn có thể tự viết theo nhu cầu ví dụ như chúng ta có class Rectangle có chiều dài và rộng chúng ta cần biến check xem nó có phải là hình vuông hay không:
```
class Rectangle(val height: Int, val width: Int)
{ 
    val isSquare: Boolean 
    get() { 
        return height == width 
    } 
}
```
và gọi getter:
`println(rectangle.isSquare)`
Nếu bạn cần truy cập isSquare từ Java class bạn chỉ cần gọi isSquare() như trước.

### 2.2.  Khởi tạo class: primary contructor & initializer block:
  Chúng ta có ví dụ về class trong Kotlin:
```
class User(val nickname: String)
```
   Thông thường tất cả các khai báo của class đều nằm trong ngoặc {}. Còn phần code nằm trong ngoặc tròn () được khai báo ngay sau tên class là primary contructor trong Kotlin.<br>
    Primary contructor trong Kotlin có 2 công dụng chính:
*  Chỉ ra các tham số trong contructor
*  Quy định các property trong class được khỏi tạo bởi các tham số đó.

<br>Chúng ta hãy cùng trình bày class User trên theo 1 cách dễ hiểu hơn:
```
 class User constructor(_nickname: String) {  // primary contructor
         val nickname: String
        init { nickname = _nickname } // initializer block 
}
```
ở đây chúng ta thấy có 2 từ khóa: "contructor" và "init". Trong đó từ khóa "contructor" được sử dụng để bắt đầu khai báo cho primary contructor hoặc sencond contructor. Còn "init" được dùng để khai báo khối khởi tạo hay được gọi là "initializer block". khối code này sẽ được chạy khi class được tạo qua primary contructor. Và bạn có thể tạo ra nhiều khối khởi tạo tùy ý. <br>
Trong ví dụ này bạn không cần dùng đến khối khỏi tạo bỏi vì nó có thể tạo ra với nickname property. Bạn cũng có thể bỏ qua từ khóa "contructor" khi không có annotation hoặc từ khóa truy cập đi kèm vs primary contructor. Vậy nên chúng ta sẽ có class User sau khi rút gọn:
```
class User(_nickname: String) // primary contructor với 1 tham số 
{ 
    val nickname = _nickname  // property đưuọc khởi tạo với tham số của pramary contructor
}
```
Và cuối cùng, nếu trong class của bạn có property được khởi tạo bằng tham số tương ứng trong primary contructor bạn có thể đặt thêm từ khóa "val" vào trước tên parameter và không cần khai báo property trong class:
```
class User(val nickname: String)// "val": property tương ứng được tạo ra cho parameter
```
Nếu bạn muốn định nghĩa giá trị mặc định cho property bạn chỉ cần gán nó ở primary contructor:
```
class User(val nickname: String, val isSubscribed: Boolean = true)
```
Để tạo instance của class bạn chỉ cần gọi constructor mà không cần từ khóa new:
```
val alice = User("Alice")
```
Trong trường hợp class của bạn kế thừa từ class khác, primary contructor cần khởi tạo super class bằng việc cung cấp tham số truyền vào cho contructor của class cha:
```
open class User(val nickname: String) { ... } 
class TwitterUser(nickname: String) : User(nickname) { ... }
```
Nếu bạn không khái báo bất kỳ 1 contructor nào cho class thì default contructor sẽ được tạo ra. Trong trong hợp khỏi tạo class này bạn vẫn cần để dấu ngoặc () cho contructor mặc định:
```
open class Button
class RadioButton: Button()
```
### 2.3. Secondary constructor
Chúng ta có thể thấy trong Java chúng ta thường viết nhiều contructor để khởi tạo các class với các giá trị khác nhau nhưng trong Kotlin điều đó được thay đổi bằng cách sử dụng default parameter values (giá trị mặc định của tham số)

### 2.4 Inner và nested classe
Inner class trong java có lưu reference ngầm tới outter class, để remove nó chúng ta thêm từ khóa static. Với Kotlin cũng vậy nhưng cách khai báo của Java và Kotlin lại trái ngược nhau:
![](https://images.viblo.asia/a0fe9e9c-6f4f-434d-9065-ed083490e4b8.PNG)
Cú pháp để khai báo reference tới instance của outer class trong Kotlin cũng khác trong Java: chúng ta dùng từ kháo this@Outer để truy cập tới Outer class từ trong Inner class:
```
class Outer 
{ 
        inner class Inner 
        { 
                fun getOuterReference(): Outer = this@Outer 
        } 
}
```

# 2.Interface:
Chúng ta sẽ cùng xem xét cách định nghĩa interface và implement nó.
### 2.1.   Property trong interface:
Trong Kotlin interface có thể chứa abstract property. Điều đó nghĩa là tất cả các class implement interface đều phải cung cấp cách để lấy giá trị của abstract property đó cũng như khởi tạo lưu trữ giá trị tùy thuộc vào đặc điểm của từng class. 
<br> Ví dụ chúng ta có interface User. Class PrivateUser implement User với những private user chúng ta chỉ cần tên của họ. Class SubcribingUser implement User chúng ta cần lấy nickname qua địa chỉ email. Còn với FacebookUser chúng ta cần lấy nickname qua facebookId. Từ đó chúng ta có các cách implement nickName khác nhau cho các class:
```
interface User { 
        val nickname: String 
 }
 
 class PrivateUser(override val nickname: String) : User // sử dụng override cho property
 
 class SubscribingUser(val email: String) : User 
 { 
         override val nickname: String 
         get() = email.substringBefore('@') 
 } 
 class FacebookUser(val accountId: Int) : User 
 { 
         override val nickname = getFacebookName(accountId) 
 }
```

### 2.2  Phương thức với default implementation:
   Interface trong Kotlin khá giống với Java 8. Chúng có thể chứa abstract cũng như mothod thường.
 Để implement interface chúng ta sử dụng dấu ":" thay cho từ khóa "extends" cũng như "implement" trong Java 
```
 interface Clickable{
     fun click()
 }
```
 
 ```
class Button : Clickable 
 { 
     override fun click() = println("I was clicked") 
 }
```

Từ khóa "override" tương tự như "@Override" được sử dụng để đánh dấu phương thức cũng như property được ghi đè từ class cha hoặc interface. Không như Java việc sử dụng từ khóa "override" là bắt buộc.<br>
Một phương thức trong interface có thể có phần implement mặc định mà tất cả các class kế thừa nó đều phải thực thi bằng cách viết thêm phần thân cho phương thức.
```
interface Clickable {
    fun click() 
    fun showOff() = println("I'm clickable!")
}
```
Nếu bạn implement Clickable bạn cần implement `click()`  và cũng có thể định nghĩa lại hành động cho phương thức `showOff()` hoặc bạn có thể bỏ qua nếu định nghĩa default đã đúng với nhứng gì bạn cần.  <br>
Ví dụ bây giờ bạn có 1 interface khác: <br>
```
interface Focusable 
{ 
    fun setFocus(b: Boolean) = println("I ${if (b) "got" else "lost"} focus.") 
    fun showOff() = println("I'm focusable!") 
}
```
Nếu bạn cần implemnt cả 2 interface `Clickable` và `Focusable` bạn cần chỉ rõ phương thức `showOff()` của interface nào được inplement nếu không complier sẽ hiện lỗi. Chúng ta có class Button implement cả hai phương thức `showOff()` của 2 interface bằng cách dùng từ khóa `supper`:<br>
```
class Button : Clickable, Focusable 
{ 
    override fun click() = println("I was clicked")
    override fun showOff() { 
        super<Clickable>.showOff() // bạn cần phải chỉ ra ít nhất 1 implement here 
        super<Focusable>.showOff() 
     }
}
```
# 5. Open, final, abstract modifier
Như bạn biết trong java bạn có thể kế thừa bất kỳ class nào override bất kỳ phương thức nào trừ phi nó không được gắn với từ khóa `final` điều này có thể gây ra một vài vấn đề khi class cha có thay đổi và làm cho sự kế thừa từ class con bị sai lệch. Để khắc phục điều này Kotlin để mặc định từ khóa `final`. Nếu bạn muốn các thành phần của bạn được kế thừa, bạn cần thêm từ khóa `open` vào các property, method và class:
```
open class RichButton : Clickable { // có thể kế thừa từ class RichButton
    fun disable() {} //disable ko thể kế thừa do default "final" 
    open fun animate() {}  // có thể override
    override fun click() {}  //hàm kế thừa hàm khác được mặc định "open" 
}
```
Nếu bạn không muốn function `click()` được kế thừa từ class khác: 
```
 final override fun click() {}
```
Đối với `abstract` menber từ khóa `open` là mặc định.
# 6. Data class
Nếu bạn muốn class của bạn được dùng để chứa dữ liệu, bạn sẽ cần phải override các phương thức cần thiết: toString, equals, hashCode để sử dụng cho việc thao tác so sánh hay hiển thị dữ liệu điều này gây tốn thời gia mà chỉ tạo ra các đoạn code khuôn mẫu khá giống nhau. Để khắc phục điều này Kotlin cung cấp Data class. Bạn chỉ cần thêm từ khóa "data" vào  trước từ khóa "class" trình biên dịch sẽ tự hiểu và generate ra các method trên cho bạn :)
```
data class Client(val name: String, val postalCode: Int)
```
# 7. Khai báo một lớp và tạo một instance, kết hợp với từ khóa "object"
Từ khóa "object" được sử dụng trong trong Kotlin với 3 ý nghĩa chính:
* Object declaration: 1 cách để định nghĩa singleton trong Kotlin.
* Companion objects: chứa factory method hoặc các phương thức khác để khi chúng ta muốn sử dụng không cần khởi tạo class mà chỉ cần gọi tên class.
* Object expression: được sử dụng thay cho anonymous inner class trong java
### 7.1 Object declaration:
Trong Java khi chúng ta muốn 1 class luôn luôn chỉ được khởi tạo 1 lần để sử dụng cho cả chương trình chúng ta thường dùng Singleton pattern. Nhưng trong Kotlin chúng ta có thể sử dụng object declaration cho class đó:
```
object DataProviderManager {
    fun registerDataProvider(provider: DataProvider) {
        // ...
    }

    val allDataProviders: Collection<DataProvider>
        get() = // ...
}
```
Khi muốn sử dụng các phương thức của class DataProviderManager chúng ta chỉ cần: 
```
DataProviderManager.registerDataProvider(...)
```
Cũng như Class, từ khóa "object" có thể được sử dụng cho property, method, initalizer block, nhưng không thể dùng cho contructor. <br>
### 7.2  Companion objects: factory method và các thành phần static
Class trong Kotlin không thể có các thành phần static như static method, static property bởi vì từ khóa "static" trong Java không tồn tại trong Kotlin. Vì vậy để thay thế Kotlin có:
* Package-level function (thay cho static method) 
* Object declaration(thay cho static method và static field). 
Nhưng package-level function không thể truy cập vào các thành phần private của Class nên object declaration được sử dụng thay thế. Sau đây là ví dụ đơn giản cho companion object:
```
class A { 
        companion object { 
                fun bar() { println("Companion object called") } 
        } 
} 
>>> A.bar() Companion object called
```
Chúng ta  có thể thấy companion object là nới lý tưởng cho factory pattern. Chúng ta hãy cùng viết lại ví dụ về Uer, FacebookUser, SubcribingUser ở trên  nhưng sử dụng  companion object với factory method:
```
class User(val nickname: String) 
{ 
        companion object { 
                //Factory method tạo new user bằng email
                fun newSubscribingUser(email: String) = User(email.substringBefore('@'))
                
                //Factory method tạo new user bằng facebook account
                fun newFacebookUser(accountId: Int) = User(getFacebookName(accountId))
        }
}

//Sử dụng:
>>> val subscribingUser = User.newSubscribingUser("bob@gmail.com") 
>>> val facebookUser = User.newFacebookUser(4)
>>> println(subscribingUser.nickname) 
bob
```
Factory method thực sự rất hữu dụng. Nó giúp bạn tránh việc tạo ra nhiều object mới khi không cần thiết. Ví dụ như khi có email được gửi tới mà đã có sẵn trong cache thì đối tượng đã được tạo ra đó sẽ được sử dụng lại thay vì tạo ra instance mới.<br>
* Companion object có thể implement Interface:
Cũng giống như các object khác companion object cũng có thể thực thi 1 interface. Ví dụ như bạn có nhiều loại đối tượng trong 1 hệ thống. Các loại đối tượng này đều được tạo ra từ chuỗi JSON trả về từ mạng và bạn muốn tất cả các đối tượng trong hệ thống đều được tạo ra từ 1 phương thức. Đầu  tiên chúng ta sẽ xây dựng 1 interface định nghĩa method dùng để tạo đối tượng từ JSON và bạn có class Person:
```
interface JSONFactory<T> { 
        fun fromJSON(jsonText: String): T 
} 
class Person(val name: String) { 
        companion object : JSONFactory<Person> // implement Interface
        { 
                override fun fromJSON(jsonText: String): Person = ... 
        } 
}

```
<br>
Trên đây là nội dung kiến thức về Class, Interface và Object trong Kotlin mình tìm và tổng hợp được mong rằng sẽ giúp ích được cho các bạn trong việc học Kotlin. Mình mong muốn nhận được ý kiến đóng góp của mọi người trong phần comment bên dưới :)  <br>
Link tham khảo: 

http://sd.blackball.lv/library/Kotlin_in_Action_(2017).pdf