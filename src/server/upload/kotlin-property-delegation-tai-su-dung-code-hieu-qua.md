![](https://images.viblo.asia/7315fb7b-1e4e-4acc-a3fd-5ee58dccbe9d.png)

Cho tới nay, Kotlin cũng đã ra mắt được khá lâu. Và cũng đã có rất nhiều bài viết nói về những ưu điểm cũng như sự vượt trội của ngôn ngữ này. Tuy nhiên phần lớn là viết về những ưu điểm cơ bản nhất, chẳng hạn như code ngắn gọn hơn, hỗ trợ lambda hay cơ chế NUll-Safety,... Tất nhiên những điểm này thực sự rất quan trọng , và là những nguyên nhân chính để khiến một lập trình viên sử dụng Kotlin.

Mục tiêu của bài viết này, mình muốn sau khi đã nắm bắt được những điều cơ bản của Kotlin, thì chúng ta sẽ tiếp tục tìm ra những cách để làm cho code trở nên đơn giản, tối ưu và dễ sử dụng hơn nữa.

# Một vài ví dụ
Trước khi vào xem Kotlin Delegation cụ thể là gì. Mình sẽ đưa ra một vài trường hợp thường xảy ra khi code, cụ thể ở đây là code 1 project Android.

## Trường hợp 1: Tạo một thể hiện duy nhất cho biến 

Nghe rất quen thuộc phải không. Đúng vậy. Một trường hợp khá phổ biến, khi chúng ta muốn tạo ra một share-variable, chúng chỉ được khởi tạo 1 lần duy nhất và dùng ở nhiều nơi. 
```
    companion object {
        private var INSTANCE: ShareObject? = null
        @JvmStatic
        fun getInstance(): ShareObject {
            if (INSTANCE == null) {
                INSTANCE = ShareObject()
            }
            return INSTANCE!!
        }
    }
```
Như ví dụ mình muốn tạo ra 1 thể hiện duy nhất của ShareObject. Ok , code này chạy rất bình thường phải không. Vấn đề bây giờ, mình lại muốn tạo ra 1 thể hiện khác của ShareObject, và nó cũng là duy nhất ??? Chúng ta sẽ tạo ngay 1 biến INSTANCE2 và tạo function getInstance2() cho nó phải không?

Trước khi đến với câu trả lời cách làm trên đúng không thì mình qua ví dụ 2 trước nhé :)

## Trường hợp 2: Get/Set value cho SharedPreferent 
Lại là case rất quen thuộc với Android Dev phải không :D 

Mình sẽ có class sau đây: 
```
class PreferencesManager @Inject constructor(context: Context) {

   private val preferences = context.getSharedPreferences("myApp", Context.MODE_PRIVATE)
       
   fun getCountValue() = preferences.getInt(LAUNCH_COUNT, 0)
   
   fun setCountValue(value: Integer) {
        preferences.edit().putInt(LAUNCH_COUNT, value).apply()
    }
   companion object {
       private const val LAUNCH_COUNT = "LAUNCH_COUNT"
   }
}

```

Nhiệm vụ của mình rất đơn giản. Chỉ cần lưu vào SharedPreference 1 biến kiểu int đại diện cho số lần launch app. 

Nhìn qua thì code ok. Nhưng mình muốn rút gọn đoạn code này 1 chút nữa. Đây là lúc dùng property getter/setter của kotlin.

```
class PreferencesManager @Inject constructor(context: Context) {

   private val preferences = context.getSharedPreferences("myApp", Context.MODE_PRIVATE)

   var launchCount: Int
       get() = preferences.getInt(LAUNCH_COUNT, 0)
       set(value) {
           preferences.edit().putInt(LAUNCH_COUNT, value).apply()
       }

   companion object {
       private const val LAUNCH_COUNT = "LAUNCH_COUNT"
   }
}

```

Nhìn code "ngon" hơn rồi đấy. :heart_eyes:

Bây giờ, lại có vấn đề khác. Mình muốn lưu thêm cả số lần mà user tương tác với một màn hình nào đó. Vẫn đơn giản phải không.

```
class PreferencesManager @Inject constructor(context: Context) {

   private val preferences = context.getSharedPreferences("myApp", Context.MODE_PRIVATE)

   var launchCount: Int
       get() = preferences.getInt(LAUNCH_COUNT, 0)
       set(value) {
           preferences.edit().putInt(LAUNCH_COUNT, value).apply()
       }

   var screenCount: Int
       get() = preferences.getInt(SCREEN_COUNT, 0)
       set(value) {
           preferences.edit().putInt(SCREEN_COUNT, value).apply()
       }
       
   companion object {
       private const val LAUNCH_COUNT = "LAUNCH_COUNT"
       private const val SCREEN_COUNT = "SCREEN_COUNT"
   }
}

```

Nhìn qua thì có vẻ như vẫn ok. Nhưng nếu chúng ta ngày càng lưu nhiều hơn các biến tương tự như vậy thì điều gì sẽ xảy ra ?

Chúng ta sẽ phải viết đi viết đi viết lại 1 đoạn logic y hệt nhau, khác mỗi key truyền vào.
```
get() = preferences.getInt(LAUNCH_COUNT, 0)
       set(value) {
           preferences.edit().putInt(LAUNCH_COUNT, value).apply()
       }
```

Đây cũng là điều mình muốn nói trong ví dụ 1. Khi số lượng biến tăng lên mà logic cần viết cho nó vẫn tương tự như các biến trước thì tại sao k nghĩ ra cách để sử dụng lại đoạn logic này mà không cần copy-paste lại? 

Kotlin Property Delegation sẽ giúp chúng ta giải quyết việc này. 

# Delegated Property
Trước tiên mình sẽ nói một chút về Delegation Patten. Về khái niệm hay định nghĩa chính xác của pattern này thì hiện tại mình vẫn chưa có. Tuy nhiên mình sẽ đưa ra một vài mô tả đơn giản nhất về nó để các bạn dễ hiểu. 

- "Delegation pattern là một mẫu design pattern cho phép một đối tượng có thể đạt được việc sử dụng lại mã code của thành phần khác, tương tự như việc kế thừa" 
- "Delegation cũng tương tự như việc kế thừa nhưng được thực hiện thủ công thông qua các đối tượng"

Mình sẽ có ví dụ cụ thể như thế này:
```
open class Weapon {
    open fun makeDamage() {
        //do something
    }
}

class Gun: Weapon() {
    override fun makeDamage() {
        super.makeDamage()
    }
}
```

Như trên, với kiểu kế thừa thì class Gun sẽ kế thừa và sử dụng lại function makeDamage() của class Weapon. Và nếu viết với kiểu delegation thì sẽ như sau:

```
class Weapon {
    fun makeDamage() {

    }
}

class Gun constructor(private val weapon: Weapon) {
    fun makeDamage() {
        weapon.makeDamage()
    }
}
```

Chúng ta không còn quan hệ kế thừa ở đây nữa. Class Gun vẫn có func makeDamage(). Tuy nhiên nó sẽ giữ một instance của Weapon và chuyển action này cho nó (delegate). Bên ngoài nếu ta gọi gun.makeDamage() thì vẫn tưởng như là Gun đang làm việc này. Tuy nhiên thực tế thì nó đã chuyển action cho thằng Weapon.

Về lợi ích của Delegate thì nó có thể thay thế được kế thừa trong một vài trường hợp. Phần này các bạn có thể tìm hiểu thêm. Mình sẽ tập trung tiếp vào Property Delegated trong kotlin.

Về việc sử dụng delegation thì Kotlin đã hỗ trợ nó giúp chúng ta không cần tạo ra các đoạn mã dài dòng cho việc delegated (như ví dụ trên)

## Từ khóa 'by'
Kotlin đưa ra từ khóa này kèm với cú pháp delegate property như sau:
```
val/var <property name>: <Type> by <expression>
```

<expression> sau by chính là thành phần được delegated. Mỗi khi ta truy cập vào property, thì lập tức các function getValue() và setValue() tương ứng của class được delegated sẽ được chạy.

Ví dụ:
```
class Example {
    var p: String by Delegate()
}

class Delegate {
    operator fun getValue(thisRef: Any?, property: KProperty<*>): String {
        return "run get value"
    }
 
    operator fun setValue(thisRef: Any?, property: KProperty<*>, value: String) {
        println("run set new value")
    }
}
```

Ở trên ta đang delegate biến p cho class Delegate. Bây giờ khi truy cập vào p, thì 2 func tương ứng của Delegate sẽ được chạy

- println(Example().p) -> In ra: "run get value"
- Example().p = "new value" -> In ra: "run set new value"


## Giải quyết vấn đề sử dụng lại code

Mình sẽ tiếp tục ví dụ được nêu ở trên về lưu các biến trong SharedPreference. Vấn đề đã nhận thấy là chúng ta cần có một cách để không phải viết đi viết lại cùng 1 đoạn code logic. Mình sẽ áp dụng property delegated vào như sau:

- Do các biến cần lưu là dạng int nên sẽ tạo ra 1 class ( đảm nhiệm việc nhận delegate):
```
class IntPreference(
   private val preferences: SharedPreferences,
   private val name: String,
   private val defaultValue: Int
) : ReadWriteProperty<Any, Int> {

   @WorkerThread
   override fun getValue(thisRef: Any, property: KProperty<*>): Int {
       return preferences.getInt(name, defaultValue)
   }

   override fun setValue(thisRef: Any, property: KProperty<*>, value: Int) {
       preferences.edit { putInt(name, value) }
   }
}
```
- Như chúng ta thấy thì đoạn code logic get và set một biến kiểu Int đã được viết ở tại 1 chỗ. Tiếp theo sẽ là delegated cho các property tương ứng:

```
class PreferencesManager @Inject constructor(context: Context) {

   private val preferences = context.getSharedPreferences("myApp", Context.MODE_PRIVATE)

   var launchCount by IntPreference(preferences, LAUNCH_COUNT, -1)
   var screenCount by IntPreference(preferences, SCREEN_COUNT, -1)

   companion object {
       private const val LAUNCH_COUNT = "LAUNCH_COUNT"
       private const val SCREEN_COUNT = "SCREEN_COUNT"
   }
}
```

Ok. Vậy là bây giờ việc khai báo cho launchCount và screenCount còn ngắn gọn hơn nữa. Giả sử sau này có cần lưu thêm nhiều biến như vậy vào sharedPreference thì ta cũng chỉ cần thêm 1 dòng code mà không cần viết lại những logic bị trùng lặp :) 

Hy vọng bài viết sẽ giúp ích cho các bạn. Và nếu có đóng góp thì các bạn comment phản hồi giúp mình nhé ^.^. Cảm ơn đã đón đọc !