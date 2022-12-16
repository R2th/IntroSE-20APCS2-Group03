Trong bài viết này, chúng ta sẽ cùng tìm hiểu về property và các tính năng tuyệt vời của nó đã được kotlin hỗ trợ. 
### 1. Property 
Trong kotlin xuất hiện từ khóa property, còn ở Java thì chỉ có field, đây là 1 điểm mới dễ gây hiểu lầm cho người mới tìm hiểu kotlin, cùng xem ví dụ sau:
```
public String name = "Java"; // field in java
var name: String = "Kotlin"; // property in kotlin  
``` 
Theo như ví dụ ở trên thì ta thấy khá giống nhau, nhưng khi dịch sang java của kotlin property trên thì nó như thế này :
```
private String name = "Kotlin";
public String getName() {return name;}
public void setName(String name) {this.name = name;}
```
Như vậy chúng ta thấy rằng, mặc định property trong kotlin sẽ bao gồm field và accessor (bộ truy cập)  (getter đối với val, và getter và setter đối với var)
Chúng ta có thể thay thế việc triển khai mặc định của accessors bằng một tùy chỉnh, chúng ta có thể định nghĩa setter theo điều kiện yêu cầu:

Ex: Nếu chỉ muốn chấp nhận các giá trị không trống, thì chúng ta có thể định nghĩa bộ setter sau: 
```
var name: String = "Kotlin"
   set(value) {
       if (value.isNotBlank())
           field = value
   }
name = "Kotlin"
name = ""
print(name) // Prints: Kotlin
```
Ex 2: Nếu muốn chắc chắn rằng giá trị property trả về được viết hoa, chúng ta có thể định nghĩa một custom getter viết hoa:
```
var name: String = "Kotlin"
   get() = field.capitalize()
name = "Kotlin"
print(name) // Prints: Kotlin
```
### 2. Backing Property 
Nếu bạn cần truy cập trực tiếp vào một field của property bên trong một lớp mà nó được khai báo, bạn có thể sử dụng  Backing Property.
Ex: 
```
private var _text: String? = null
var text: String
   set(value) {
       _text = value
   }
   get() {
       return _text + _text
   }
```
Như ví dụ trên,  nếu bạn muốn truy cập vào field  _ text ở một nơi khác bằng accessor là không thể, mà chúng ta có thể truy cập thông qua backing field của _ text là text.  
### 3. Extension Property 
Như đã biết, các property trong kotlin được xác định thông qua các accessor của chúng, chúng ta cũng có thể tạo extension cho các property.
Ex: Chúng ta có thể định nghĩa 1 extension property cho TextView: 
```
val TextView.trimmedText: String 
get() = text.toString().trim() 
// Usage textView.trimmedText
```
Hạn chế duy nhất là không thể có backing field bởi vì extension property không thể lưu trữ trạng thái.
Ex:
```
class BaseClass{}
var BaseClass.index : Int = 10 //compile error
//Extension property cannot be initialized
//because it has no backing field
```
Vậy tiếp theo ta nên sử dụng extension property ở đâu? 
Hãy xem xét một vấn đề đơn giản. Chúng ta thường cần có một số dịch vụ trong Android, nhưng mã được sử dụng để có được chúng rất phức tạp:
```
PreferenceManager.getDefaultSharedPreferences(this) 
getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater 
getSystemService(Context.ALARM_SERVICE) as AlarmManager
```
Để sử dụng một dịch vụ như AlertManager hoặc LayoutInflater, lập trình viên phải nhớ những điều sau đây:

Tên của function đang cung cấp nó (chẳng hạn như getSystemService) và lớp nào chứa nó (chẳng hạn như Context)

Tên của field đang chỉ định dịch vụ này (chẳng hạn như Context.ALARM_SERVICE)

Tên của lớp mà dịch vụ sẽ được truyền tới (chẳng hạn như AlarmManager)

Điều này rất phức tạp và đây là nơi hoàn hảo để chúng ta có thể tối ưu hóa việc sử dụng nhờ các Extension Property. 
Chúng ta có thể định nghĩa các Extension Property theo cách này:
```
val Context.preferences: SharedPreferences 
get() = PreferenceManager .getDefaultSharedPreferences(this) 
val Context.inflater: LayoutInflater get() = getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater 

val Context.alarmManager: AlarmManager 
get() = getSystemService(Context.ALARM_SERVICE) as AlarmManager
```
Và kể từ bây giờ, chúng ta có thể sử dụng các preferences, inflater, and alarmManager như thể chúng là các property của Context:
```
context.preferences.contains("Some Key") 
context.inflater.inflate(R.layout.activity_main, root) 
context.alarmManager.setRepeating(ELAPSED_REALTIME, triggerAt, interval, pendingIntent)
```
### 4. Generic extension property
Chúng ta có thể khai báo 1 generic extension property: 
Nếu đặt ở top level thì đó là top level extension property, còn ở trong class thì là member extension property. 

Ex: Top level extension property
```
val <T> List<T>.midIndex: Int
   get() = if (size == 0) 0 else size / 2

fun <T> getMidPosition(list: List<T>): Int {
   return list.midIndex
}
```
Ex: member extension property 
```
companion object{
   val String.Companion.EMPTY: String
   get() = ""
}
// use 
val name: String = String.EMPTY
```
Note: Không thể khai báo 1 generic non-extension property:
Bởi vì: không thể lưu trữ nhiều giá trị khác nhau trong một thuộc tính của một lớp và do đó, việc khai báo một thuộc tính không mở rộng chung không có nghĩa. 
Ex: 
```
 val <T> x : T = TODO()
 // error : type parameter of a property must be used in its receiver type 
```
### 5. Read-Write extension properties 
Đây là 1 phần trong extension property, nhưng mình cố tình tách ra để các bạn dễ theo dõi, tránh bị rối trong quá trình tìm hiểu.
Thường khi sử dụng extension property thì chúng ta chỉ read các extension của nó, trong phần này chúng ta sẽ thử write và read trong extension property.
Ex: 
```
var Person.fullName :String
get() = "my name is $firstName $lastName"
set(value) {
   val words = value.split(" ")
   lastName = words.last()
   firstName = words.first()
}

class Person(var firstName:String,var lastName:String)

fun main() {
   val person = Person("a","b")
   person.fullName = "Van Hieu"
   println(person.firstName) // Van 
   println(person.lastName) // Hieu
   println(person.fullName) // my name is Van Hieu
}
```
Trong ví dụ trên chúng ta đã thực hiện set value (write) cho extension fullName, thay đổi value cho 2 property đã được truyền value vào lúc đầu là fisrtName và lastName 
sau đó get value (read) của extension fullName và 2 property firstName, lastName.
### 6. Conclusion
Như vậy, chúng ta đã đi qua phần 1,  tìm hiểu property và các tính năng mà nó được hỗ trợ trong kotlin, trong bài viết không khỏi sai xót mong được mọi người góp ý.

Hẹn gặp lại các bạn trong bài tiếp theo, xin chào.