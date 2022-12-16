Chào các bạn, chúng ta cùng tìm hiểu tiếp về Kotlin với phần 3 nhé!

Tuần này ta sẽ tập trung vào các phần cơ bản của Kotlin như `operators overloading`, `top level function and parameters` và `interators`. Ta cũng sẽ nói về các phần nâng cao hơn như `domain specific languages (DSLs)` và chỉ cho bạn cách để có thể viết code đẹp hơn khi sử dụng Android KTX cho `content values`, `bundles` và `callbacks`.

## Day 15: Operator overloading
Viết Kotlin với tốc độ nhanh gấp đôi với `operator overloading`. Các đối tượng như `Path`, `Range` hoặc `SpannableStrings` đã có sẵn các phương thức như là cộng hoặc trừ. Với Kotlin thì bạn có thể implement thêm các toán tử của riêng mình.

Docs: [operator overloading](https://kotlinlang.org/docs/reference/operator-overloading.html#operator-overloading), [Android KTX usage example](https://github.com/android/android-ktx/blob/master/src/main/java/androidx/core/text/SpannableString.kt#L32)

```
// Definition
/** Adds a span to the entire text. */
inline operator fun Spannable.plusAssign(span: Any) =
setSpan(span, 0, length, SPAN_INCLUSIVE_EXCLUSIVE)
// Use it like this
val spannable = “Eureka!!!!”.toSpannable()
spannable += StyleSpan(BOLD) // Make the text bold with +=
spannable += UnderlineSpan() // Make the text underline with +=
```

## Day 16: Top level functions and parameters
Khi bạn muốn viết các phương thức Utility cho một class. Hãy thêm chúng vào top level của source file. Trong Java, chúng được biên dịch thành các static methods của class đó.

Docs: [basic syntax](https://kotlinlang.org/docs/reference/basic-syntax.html).

```
// Define a top-level function that creates a DataBinding Adapter for a RecyclerView
@BindingAdapter(“userItems”)
fun userItems(recyclerView: RecyclerView, list: List<User>?){
    //update the RecyclerView with the new list
    …
}
class UsersFragment: Fragment{...}
```

Bạn muốn định nghĩa static constants cho một class? Hãy đặt chúng như là một top-level properties. Chúng sẽ được biên dịch như là một trường.

```
// Define a top-level property for Room database
private const val DATABASE_NAME = “MyDatabase.db”
private fun makeDatabase(context: Context): MyDatabase {
    return Room.databaseBuilder(
                   context,
                   MyDatabase::class.java,
                   DATABASE_NAME
              ).build()
}
```

## Day 17: Iterating types without an iterator

Android KTX thêm các interators vào `ViewGroup` và `SpareArray`. Để định nghĩa một kiểu interator extensions hãy sử dụng `operator`. Vòng lặp Foreach sẽ sử dụng extension này.

Docs: [for loops](https://kotlinlang.org/docs/reference/control-flow.html#for-loops), [Android KTX usage example](https://github.com/android/android-ktx/blob/master/src/main/java/androidx/core/view/ViewGroup.kt#L66).

```
// Example from Android KTX
for(view in viewGroup) { }
for(key in sparseArray) {}
// Your project
operator Waterfall.iterator() {
   // add an iterator to a waterfall class
}
for(items in myClass) {} // Now waterfall has iterations!
```

## Day 18: Easy Content Values
Kết hợp sức mạnh của [ContentValues](https://developer.android.com/reference/android/content/ContentValues.html) với sự ngắn gọn của Kotlin. Sử dụng Kotlin KTX `ContentValues` và chỉ cần truyền vào một `Pair<StringKey, Value>`. 

[Android KTX implementation.](https://github.com/android/android-ktx/blob/master/src/main/java/androidx/core/content/ContentValues.kt#L21)

```
val contentValues = contentValuesOf(
    “KEY_INT” to 1,
    “KEY_LONG” to 2L,
    “KEY_BOOLEAN” to true,
    “KEY_NULL” to null
)
```

## Day 19: DSLs (Domain specific languages)
Domain specific languages có thể được tạo ra bằng cách sử dụng một kiểu type safe builders. Nó làm cho các API trở nên dễ đọc hơn (Clean hơn). Bạn có thể xây dựng chúng theo cách của mình với sự giúp đỡ của các tính năng như [extension lambdas](https://kotlinlang.org/docs/reference/lambdas.html#function-literals-with-receiver) và [type safe builders.](https://kotlinlang.org/docs/reference/type-safe-builders.html)

```
html {
    head {
             title {+”This is Kotlin!” }
         }
    body {
             h1 {+”A DSL in Kotlin!”}
             p {+”It’s rather”
                b {+”bold.” }
                +”don’t you think?”
                }
          }
}
```

[Spek](http://spekframework.org/) là một testing library được xây dựng theo Kotlin DSL. Thay vì sử dụng `@Annotations`, Spek cung cấp một cách đơn giản hơn để viết ra các dòng test code.

```
@RunWith(JUnitPlatform::class)
class MyTest : Spek({
    val subject = Subject()
    given("it ’ s on fire") {
        subject.lightAFire()
        it("should be burning") {
            assertTrue(subject.isBurning())
        }
        it("should not be cold") {
            assertFalse(subject.isCold())
        }
    }
})
```

Một DSL cho Kotlin cho android là [Anko](https://github.com/Kotlin/anko). Anko cho phép bạn xây dựng các view sử dụng declarative code.

```
frameLayout {
    button("Light a fire") {
    onClick {
        lightAFire()
    }
}
```

## Day 20: Easy Bundle
Sử dụng builder creator trong Kotlin KTX sẽ cho bạn viết builder một cách đẹp đẽ hơn, ngoài ra nó cũng có thể xử dụng cho cả các mảng Arrays

```
val bundle = bundleOf(
        "KEY_INT " to 1,
        "KEY_LONG" to 2L,
        "KEY_BOOLEAN" to true,
        "KEY_NULL" to null
        "KEY_ARRAY" to arrayOf(1, 2)
)
```

## Day 21: Cleaning up postDelayed
Với last parameter call syntax, bạn có thể làm đẹp hơn các phần callbacks, Callable, và Runnable. Ví dụ, Android KTX đã làm đẹp hơn hàm `postDelayed`:

```
// Android KTX API
fun Handler.postDelayed(
              delay: Int, 
              token: Any? = null,  
              action: () -> Unit)
// Call it like this — no need for a Runnable in your code
handler.postDelayed(50) {
         // pass a lambda to postDelayed
}
```

---
Bài viết được dịch từ: https://medium.com/androiddevelopers/31daysofkotlin-week-3-recap-20b20ca9e205

Cảm ơn các bạn đã đọc bài viết!