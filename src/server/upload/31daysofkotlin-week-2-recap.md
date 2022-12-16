Chào các bạn, tiếp theo phần 2 này mình ta sẽ tiếp tục tìm khám phá thêm về Kotlin - cùng tìm hiểu sâu hơn về một số các chủ đề như là sealed classes và inline 

## Day 8: Visibility 
Trong Kotlin, mọi thứ đều mặc định là ở dạng public, Kotlin cũng có các visibility modifier rất phong phú để bạn có thể lựa chọn như là: `private`, `protected`, `internal`. Mỗi cái sẽ giảm khả năng được truy cập từ bên ngoài theo một cách khác nhau.

Docs: [visibility modifiers](https://kotlinlang.org/docs/reference/visibility-modifiers.html)

```
// mặc định sẽ là public 
val isVisible = true
// chỉ được truy cập trong cùng file
private val isHidden = true
// chỉ được biên dịch bên trong ‘module’
internal val almostVisible = true
class Foo {
  // mặc định là default
  val isVisible = true
  // có thể được truy cập ở các class con
  protected val isInheritable = true
  // chỉ có trong cùng class
  private val isHidden = true
}
```

## Day 9: Default arguments
Nếu số lượng method overload quá nhiều, hãy làm cho code dễ đọc hơn bằng cách dùng named parameters và default parameters

Docs: [default arguments](https://kotlinlang.org/docs/reference/functions.html#default-arguments)

```
// parameters với giá trị default
class BulletPointSpan(
  private val bulletRadius: Float = DEFAULT_BULLET_RADIUS,
  private val gapWidth: Int = DEFAULT_GAP_WIDTH,
  private val color: Int = Color.BLACK
) {…}
// chỉ sử dụng giá trị default 
val bulletPointSpan = BulletPointSpan()
// gán giá trị cho một giá trị cho argument đầu tiên, các cái khác để default
val bulletPointSpan2 = BulletPointSpan(
    resources.getDimension(R.dimen.radius))
// sử dụng named parameter cho tham số cuối cùng, các cái khác default
val bulletPointSpan3 = BulletPointSpan(color = Color.RED)
```

## Day 10: Sealed classes
Kotlin `sealed` classes sẽ giúp bạn dễ dàng xử lý các dữ liệu lỗi. Khi nó được kết hợp với `LiveData` bạn có thể sử dụng một `LiveData` để thể hiện cho cả 2 trường hợp thành công và lỗi. Nó sẽ tốt hơn việc sử dụng 2 biến.

Docs: [sealed classes](https://kotlinlang.org/docs/reference/sealed-classes.html)

```
sealed class NetworkResult
data class Success(val result: String): NetworkResult()
data class Failure(val error: Error): NetworkResult()
// một observer cho cả success và failure
viewModel.data.observe(this, Observer<NetworkResult> { data ->
  data ?: return@Observer // skip nulls
  when(data) {
    is Success -> showResult(data.result) // smart cast to Success
    is Failure -> showError(data.error) // smart cast to Failure
  }
})
```

Bạn cũng có thể sử dụng `sealed classes` trong một `RecyclerView` adapter. Nó rất phù hợp với trường hợp sử dụng nhiều `ViewHolder` - nó sẽ được chỉ định trực tiếp với mỗi loại holder, trình biên dịch sẽ lỗi nếu tất cả các types của holder không match.

```
// sử dụng Sealed classes với ViewHolder trong RecyclerViewAdapter
override fun onBindViewHolder(
  holder: SealedAdapterViewHolder?, position: Int) {
  when (holder) { // compiler enforces handling all types
    is HeaderHolder -> {
      holder.displayHeader(items[position]) // smart cast here
    }
    is DetailsHolder -> {
      holder.displayDetails(items[position]) // smart cast here
    }
  }
}
```

Hãy tìm hiểu sâu hơn với `RecyclerView`, nếu ta có rất nhiều các call back từ RecyclerView item, như là detail click, shares và delete, chúng ta có thể sử dụng sealed classes. Một callback có thể handle tất cả các thứ trên.

```
sealed class DetailItemClickEvent
data class DetailBodyClick(val section: Int): DetailItemClickEvent()
data class ShareClick(val platform: String): DetailItemClickEvent()
data class DeleteClick(val confirmed: Boolean):
     DetailItemClickEvent()
class MyHandler : DetailItemClickInterface {
  override fun onDetailClicked(item: DetailItemClickEvent) {
    when (item) { // compiler enforces handling all types
      is DetailBodyClick -> expandBody(item.section)
      is ShareClick -> shareOn(item.platform)
      is DeleteClick -> {
        if (item.confirmed) doDelete() else confirmDetele()
      }
    }
  }
}
```

## Day 11: Lazy
Lazy sẽ làm khiến cho hàm khởi tạo của bạn không gọi ngay mà khi nào cần dùng tới nó thì nó mới gọi. Giá trị sau khi được gọi thì sẽ được lưu lại và sử dụng cho những lần sử dụng sau

Docs: [lazy](https://kotlinlang.org/docs/reference/delegated-properties.html#lazy)

```
val preference: String by lazy {
  sharedPreferences.getString(PREFERENCE_KEY) 
}
```

## Day 12: Lateinit
Trong Android, `onCreate` hoặc các loại callback sẽ dùng để khác khởi tạo các đối tượng. Trong Kotlin thì biến non-null sẽ phải được khởi tạo ngay từ đầu, vậy cần phải làm gì? bạn hãy sử dụng `lateinit`.

Docs: [lateinit](https://kotlinlang.org/docs/reference/properties.html#late-initialized-properties-and-variables)
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

## Day 13: Require and check
Các tham số khi truyền vào trong hàm của bạn có thoả mãn không? Hãy check nó trước khi sử dụng bằng cách dùng `require`. Nếu nó không thoả mãn thì sẽ throws ra một `IllegalArgumentException` exception.

Docs: [require](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/require.html)

```
fun setName(name: String) {
  // calling setName(“”) throws IllegalArgumentException
  require(name.isNotEmpty()) { “Invalid name” }
  
  // …
}
```

Trạng thái của một enclosing class có chính xác chưa? Hãy sử dụng `check` để kiểm tra. Nó sẽ throw một `IllegalStateException` nếu giá trị kiểm tra đó `false`.

Docs: [check](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/check.html)
```
fun User.logOut(){
  // When not authenticated, throws IllegalStateException
  check(isAuthenticated()) { “User $email is not authenticated” }
  isAuthenticated = false
}
```

## Day 14: Inline
Kotlin cho phép bạn khai báo một function là `inline` - có nghĩa là phần call sẽ được thay thế bằng kiểu thân hàm. 

Docs: [inline functions](https://kotlinlang.org/docs/reference/inline-functions.html)
```
// khai báo một inline function với tham số là một function
inline fun onlyIf(check: Boolean, operation: () -> Unit) {
  if (check) {
    operation()
  }
}
// Gọi nó như này
onlyIf(shouldPrint) { // call: pass operation as a lambda
  println(“Hello, Kotlin”)
}
// hàm trên sẽ được inline thành như này
if (shouldPrint) { // execution: no need to create lambda
  println(“Hello, Kotlin”)
}
```

Bài viết gốc: https://medium.com/google-developers/31daysofkotlin-week-2-recap-9eedcd18ef8