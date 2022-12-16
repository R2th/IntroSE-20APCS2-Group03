Chào mọi người, hôm trc mình có qua Medium có đọc một series khá hay từ Google Developer có tên là [#31DaysOfKotlin](https://medium.com/google-developers/31daysofkotlin-week-1-recap-fbd5a622ef86). Mục đích của series này là chia sẻ và giới về các tính năng của Kotlin và Android KTX. Mình đọc qua thì thấy có khá nhiều các tính năng thú vị mà có thể bạn đã sử dụng Kotlin rồi nhưng cũng chưa biết.

Vì thế mình quyết định sẽ dịch lại series này để cùng tìm hiểu nhé, series này có 4 phần tương đương với 4 tuần.

Tuần đầu tiên của series này thì sẽ tập trung vào phần basic.

Bài viết gốc các bạn có thể tham khảo ở đây: https://medium.com/google-developers/31daysofkotlin-week-1-recap-fbd5a622ef86
## Day 1: Toán tử Elvis
Nếu bạn đang cần xử lý một giá trị có thể null, hãy thử sử dụng toán từ elvis `?:`. 

Docs: [Elvis operator](https://kotlinlang.org/docs/reference/null-safety.html#elvis-operator)

Dưới đây là một cú pháp nhỏ để thay thế giá trị null với một giá trị default hoặc thậm chí sẽ return (bỏ qua luôn câu lệnh).

```kotlin
val name: String = person.name ?: “unknown”
val age = person.age ?: return
```

## Day 2: String templates
Bạn đang muốn định dạng một đoạn string? Hãy thử tham chiếu các biến và các câu lệnh vào trong đoạn string bằng cách thêm `$` phía trước tên biến. Muốn sử dụng một câu lệnh hay một biểu thức hãy sử dụng `${bieu_thuc}`

Docs: [string templates.](https://kotlinlang.org/docs/reference/basic-types.html#string-templates)

```kotlin
val language = “Kotlin”
// “Kotlin has 6 characters”
val text = “$language has ${language.length} characters”
```

## Day 3: Destructuring declarations - phân tách các thuộc tính 
[Android KTX](https://github.com/android/kotlin-extensions) sử dụng destructuring để chỉ định các thành phần của một màu sắc, bạn cũng có thể tự destructuring lớp của bạn hoặc là extends một class đã có để thực hiện việc destructuring. Nghe có vẻ hơi khó hiểu nhưng nhìn vào ví dụ bạn sẽ hiểu ngay thôi:

Docs: [destructuring declarations](https://kotlinlang.org/docs/reference/multi-declarations.html).

```kotlin
// now with prisms
val (red, green, blue) = color
// destructuring for squares
val (left, top, right, bottom) = rect
// or more pointedly
val (x, y) = point
```

## Day 4: Biểu thức when
When trong kotlin là một phần mở rộng của switch trong java với những siêu năng lực, câu lệnh `when` có thể được khớp với rất nhiều hoàn cảnh: Một chuỗi các giá trị, kiểu enums, các số trong một khoảng giá trị, bạn cũng có thể gọi ra một hàm bất kì. 

Docs: [when](https://kotlinlang.org/docs/reference/control-flow.html#when-expression) 

```kotlin
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

## Day 5: For loops, range expressions & destructuring
Vòng lặp `for` giờ đây đã có 2 chức năng mới đó là range expression và destructuring.

Docs: [ranges](https://kotlinlang.org/docs/reference/ranges.html), [destructuring](https://kotlinlang.org/docs/reference/multi-declarations.html#destructuring-declarations).

```kotlin
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

## Day 6: Properties
Trong Kotlin, các lớp có thể có các thuộc tính có thể thay đổi hoặc chỉ có thể được đọc (read-only), với getter và setter sẽ được khởi tạo một cách mặc định. Bạn cũng có thể chỉnh sửa một trong số chúng nếu cần thiết.

Docs: [properties](https://kotlinlang.org/docs/reference/properties.html).

```kotlin
class User {
    // properties
    val id: String = “” // khong sua duoc, chi co getter
    var name: String = “” // default getter and setter
    var surname: String = “” // custom getter, default setter
    get() = surname.toUpperCase() // custom getter declaration
    var email: String = “” // default getter, custom setter
    set(value) { // custom setter declaration
    // “value” = name of the setter parameter
    // “field” = property’s backing field; generated
        if(isEmailValid(value)) field = value
    }
}
```
## Day 7: Data classes and equality

Tạo một class chỉ với một mục đích là lưu data? Hãy đánh dấu nó như một "data" class. Hàm `equals()` sẽ tự động được tạo ra (cũng như `hashCode()`, `toString()` và `copy()`) và các kiểm tra cho sự bằng nhau của cấu trúc.

Docs: [data classes](https://kotlinlang.org/docs/reference/data-classes.html#data-classes), [equality](https://kotlinlang.org/docs/reference/equality.html)

```kotlin
data class User(
    val name: String, 
    val email: String, 
    val address: Address, 
    … 
)
public class UserListDiffCallback: DiffUtil.Callback() {
    override fun areContentsTheSame(
         oldItemPosition: Int,  
         newItemPosition: Int
    ): Boolean { 
    // use the generated equals method
    return newUserList[newItemPosition] == 
           oldUserList[oldItemPosition])
}
```

Tuần này sẽ tập trung vào các phần cơ bản: xoá bỏ lỗi null, làm đơn giản vòng lặp và các câu lệnh, cải thiện getter và setter, xoá các đoạn code thừa. Tuần tiếp theo chúng ta sẽ đi sâu hơn vào các tính năng của Kotlin nhé.