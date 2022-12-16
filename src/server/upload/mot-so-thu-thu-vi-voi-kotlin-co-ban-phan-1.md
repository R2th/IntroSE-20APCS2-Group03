> Trong Kotlin có một số thứ thú vị . Chủ đề ngày hôm nay chúng ta sẽ đi đến những vấn đề cơ bản của kotlin trong các các khai báo biến hoặc sử lý trong Func . Ok nào bắt đầu thôi !!!!!
### 1 . Toán tử Elvis :
**Sử lý nếu biến đó Null . Chúng ta thay thế giá trị Null bằng một giá trị mắc định nào đó -> Ví dụ : **
```
val name: String = person.name ?: “unknown”
val age = person.age ?: return
```
### 2.  Chuỗi kí tự mẫu :
**Sử dụng kí tự để kết nối chuỗi như ví dụ này :**
```
val language = “Kotlin”
// “Kotlin has 6 characters”
val text = “$language has ${language.length} characters”
```
### 3. Sử dụng biểu thức When :
** When có thể match với bất cứ thứ gì như là values , enums , chuỗi số , dưới đây là 1 ví dụ điển hình : **
```
class Train(val cargo: Number?) {
    override fun toString(): String {
        return when (cargo) {
            null, 0 -> "empty"
            1 -> "tiny"
            in 2..10 -> "small"
            is Int -> "big inty"
            else -> "$cargo"
        }
    }
}
```
### 4.Vòng lặp trong kotlin :
**Biểu thức vòng lặp được thể hiện trong ví dự dưới đây :**
```
// iterating in the range 1 to 100
for(i in 1..100) {…}
// iterating backwards, in the range 100 to 1
for(i in 100 downTo 1){…}
// iterating over an array, getting every other element
val array = arrayOf(“a”, “b”, “x”)
for(i in 1 until array.size step 2 ){…}
// iterating over an array with the item index and destructuring
for((index, element) in array.withIndex()) {…}
// iterating over a map
val map = mapOf(1 to “one”, 2 to “two”)
for( (key, value) in map){…}
```
### 5. Lazy :
** Lazy sử dụng khi bạn muốn trì hoãn việc khởi tạo giá trị cho biến. Nó sẽ tính toán và khởi tạo trong tương lai cần sử dụng . Ví dụ :   **
```
val preference: String by lazy {
  sharedPreferences.getString(PREFERENCE_KEY) 
}
```
### 6.Lateinit :
** bạn sử dụng nó khi bạn không khởi tạo giá trị ngay lập tức cho một biến thì bạn sử dụng từ khóa này ví dụ như sau : **
```
class MyActivity : AppCompatActivity() {
  // non-null, but not initalized
  lateinit var recyclerView: RecyclerView

  override fun onCreate(savedInstanceState: Bundle?) {
    // …
    // initialized here
    recyclerView = findViewById(R.id.recycler_view)
  }
}
```
### 7. Inline Function :
```
// define an inline function that takes a function argument
inline fun onlyIf(check: Boolean, operation: () -> Unit) {
  if (check) {
    operation()
  }
}
// call it like this
onlyIf(shouldPrint) { // call: pass operation as a lambda
  println(“Hello, Kotlin”)
}
// which will be inlined to this
if (shouldPrint) { // execution: no need to create lambda
  println(“Hello, Kotlin”)
}
```

> Và ok , vậy là phần 1 kết thúc mình đã hướng dẫn vài điều thú vị với Kotlin . Xin chào và hẹn gặp lại . Have a gud Day !!!