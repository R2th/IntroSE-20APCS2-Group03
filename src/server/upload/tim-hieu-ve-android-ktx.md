![](https://images.viblo.asia/47edfff3-b0a0-4b04-9aef-78262701558a.png)
# Mở đầu
Trong Google I/O 2018, Google đã giới thiệu Android Jetpack và điều này đã thay đổi cách phát triển một ứng dụng Android mạnh mẽ hiện đại.
>Jetpack is a collection of libraries, tools, and guidance to help developers write high-quality apps easier.

Jetpack được tạo ra để sử dụng những ưu điểm của ngôn ngữ Kotlin để giúp các nhà phát triển làm việc hiệu quả hơn. Vì vậy, trong blog này, chúng ta sẽ tìm hiểu về KTX Android. Chúng ta sẽ xem mọi thứ đã thay đổi như thế nào với việc sử dụng Android KTX.

Nguồn tham khảo: https://blog.mindorks.com/android-ktx-android-development-with-kotlin
# Android KTX là gì?
Android Kotlin Extensions hoặc đơn giản là Android KTX (Chúng tôi sẽ gọi nó là KTX từ bây giờ trở đi) là một tập hợp các chức năng cho phép các nhà phát triển Kotlin phát triển các ứng dụng Android theo cách rất thú vị và dễ chịu. Nếu bạn là một nhà phát triển Android, thì chắc hẳn bạn đã cảm thấy mệt mỏi với việc sử dụng các API Android Java đã cũ. Vì vậy, để sử dụng các API Java Android đó trong Kotlin một cách dễ dàng hơn, các nhà phát triển trong nhóm Android đã tạo ra Android KTX.

Mục tiêu của Android KTX không phải là thêm các tính năng mới vào các API Android hiện có, mà là giúp phát triển Android dễ dàng hơn bằng cách sử dụng API hiện có trong Kotlin.

Có nhiều tính năng có trong Android KTX, chúng như sau:
## Extension functions
Đây là những functions giúp chúng ta mở rộng chức năng của class mà không cần nhập code của class đó, tức là bạn chỉ cần gọi hàm của lớp đó.
Ví dụ: nếu bạn đang inflate view bên trong adapter, thì code mà không sử dụng extension function sẽ giống như sau:
```kotlin
override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
    val v = LayoutInflater.from(parent.context).inflate(R.layout.view_item, parent, false)
    return ViewHolder(v)
}
```
Vì vậy, tại sao phải sử dụng một mã lộn xộn như vậy? Chỉ cần sử dụng thuộc tính chức năng mở rộng của Kotlin. Nhưng làm thế nào để sử dụng chức năng mở rộng trong kotlin? Hãy lấy một ví dụ:
```kotlin
fun Int.triple(): Int {
    return this * 3
}

fun main(args: Array<String>) {
    var result = 10.triple()
    println(result)
}
```
Trong ví dụ trên, chúng ta đã tạo một hàm triple (), hàm này tăng gấp ba lần giá trị của một số nguyên. Vì vậy, trong hàm chính, chúng ta đã sử dụng hàm mở rộng đang gọi để loại bỏ giá trị được truyền, tức là 10 trong trường hợp của chúng ta

Sau khi sử dụng thuộc tính chức năng mở rộng, mã của LayoutInflater sẽ được giảm thành:
```kotlin
fun ViewGroup.inflate(layoutRes: Int): View {
    return LayoutInflater.from(context).inflate(layoutRes, this, false)
}
```
Đơn giản hơn nhiều đúng không? Bây giờ chúng ta hãy chuyển sang tính năng tiếp theo
## Extension properties
Kotlin cũng hỗ trợ extension property. Nhưng để sử dụng thuộc tính tiện ích mở rộng trong Kotlin, bạn phải cung cấp rõ ràng getter (cộng với setter cho vars).

Với sự trợ giúp của extension property, code của bạn sẽ giảm xuống:
```kotlin
val String.isLongEnough: Boolean
    get() = this.length > 5

fun main(args: Array<String>) {
    //using extension property
    if("Kotlin".isLongEnough) {
        //rest of the code goes here
    }
}
```
## Lambdas
Lambda function là các hàm ẩn danh có thể được truyền dưới dạng đối số cho các methods, bạn có thể trả lại chúng hoặc bạn có thể thực hiện tất cả các thao tác mà bạn có thể thực hiện trên một đối tượng thông thường.
Trong Kotlin, chúng ta định nghĩa hàm lambda như sau:
```kotlin
{s:String -> println(s) }
```
Ở đây s là một chuỗi rỗng được truyền làm đối số cho hàm in s. Để gán toàn bộ hàm trong một biến, hãy sử dụng đoạn mã dưới đây:
```kotlin
var link = {s:String -> println(s) }
```
## Named parameters
Đây là một tính năng không có trong một số ngôn ngữ hướng đối tượng khác. Kotlin cung cấp một cách để chỉ định tên của các đối số mà bạn đang truyền trong khi gọi hàm. Ví dụ, hãy xem đoạn mã dưới đây của hàm **arithmeticSeriesSum()**
```kotlin
fun arithmeticSeriesSum(a: Int = 1, n: Int, d: Int = 1): Int {
    return n/2 * (2*a + (n-1)*d)
}
```
Trong khi gọi, bạn có thể chỉ định tên của đối số là:
```kotlin
arithmeticSeriesSum(n=10)  // Result = 55
arithmeticSeriesSum(a=3, n=10, d=2)  // Result = 120
```
Ở đây **n**, **a** và **d** là tên của các tham số.

## Parameter default values
Trong Kotlin, bạn có thể chuyển các giá trị mặc định cho các tham số của một hàm. Ví dụ: nếu một hàm chứa hai tham số và cả hai đều có một số giá trị mặc định thì nếu bạn gọi hàm không có tham số và khi đó các tham số mặc định đó sẽ được sử dụng. Nếu cả hai tham số đều được truyền thì các tham số được truyền mới sẽ được sử dụng. Nếu bạn chỉ truyền một tham số thì tham số đầu tiên sẽ được gán giá trị được truyền và đối với biến khác, giá trị mặc định sẽ được sử dụng.
Sau đây là một ví dụ tương tự:
```kotlin
fun displaySymbol(character: Char = '=', length: Int = 15) {
    for (i in 1..length) {
        print(character)
    }
}

fun main(args: Array<String>) {
    println("Output when no argument is passed:")
    displaySymbol()

    println("Output when * is passed:")
    displaySymbol('*')

    println("Output when * and 5 are passed:")
    displayBorder('*', 5)
}
```
Vì vậy, đây là một số tính năng có thể được sử dụng trong Android KTX để làm cho mã của chúng tôi dễ đọc và ngắn gọn hơn.

Vì vậy, đây là một số tính năng có thể được sử dụng trong Android KTX để làm cho mã của chúng tôi dễ đọc và ngắn gọn hơn. Bây giờ, hãy xem cách Android KTX có thể giúp bạn viết mã chính xác hơn và đơn giản hơn bao giờ hết.
## String to Uri
Thông thường trong Kotlin, chúng ta sử dụng Uri.parse (uriString) nhưng Android KTX thêm một số tiện ích mở rộng vào lớp String để chuyển đổi String thành Uri theo cách rất dễ dàng hơn.
```kotlin
val uri = Uri.parse(myUriString)
```
Kotlin với mã KTX Android:
```kotlin
val uri = myUriString.toUri()
```
## SharedPreferences
Mã Kotlin để chỉnh sửa SharedPreferences
```kotlin
sharedPreferences.edit()
           .putBoolean(key, value)
           .apply()
```
Android KTX code:

```kotlin
sharedPreferences.edit { 
    putBoolean(key, value) 
}
```
## Displaying a Toast message
Android KTX làm cho cách hiển thị tin nhắn Android KTX làm cho cách hiển thị tin nhắn toast rất dễ dàng và đơn giản hơn.
Kotlin code:
```kotlin
Toast.makeText(context, R.string.toast_message, Toast.LENGTH_SHORT).show()
```
Android KTX code:
```kotlin
toast(R.string.toast_message)
```
## Fragment Transactions
Với sự trợ giúp của Android KTX, code transaction fragments được giảm bớt. Mã Kotlin cho Fragment Transactions:
```kotlin
supportFragmentManager
    .beginTransaction()
    .replace(R.id.container, customFragment, CustomFragment.TAG)
    .commitAllowingStateLoss()
```
Android KTX code for Fragment Transation:
```kotlin
supportFragmentManager.transaction(allowStateLoss = true) {
            replace(R.id.container, customFragment, CustomFragment.TAG)
}
```
Vì vậy, đây là một số ví dụ mà bạn có thể sử dụng Android KTX để làm cho code của bạn dễ đọc hơn và số dòng bạn viết trong code của mình cũng sẽ giảm xuống. Không còn dòng mã nào bằng cách sử dụng KTX Android.
# Sử dụng Android KTX trong Android Project
Để sử dụng KTX Android trong dự án của mình, bạn phải thêm một số phụ thuộc vào dự án của mình.
Thêm phần dependency sau vào tệp **build.gradle** của dự án của bạn:
```kotlin
dependencies {
    implementation 'androidx.core:core-ktx:1.0.1'
}
```
Vì KTX Android được chia thành nhiều mô-đun khác nhau (chúng ta sẽ tìm hiểu về các mô-đun trong phần bên dưới của bài này). Vì vậy, để sử dụng một mô-đun cụ thể, hãy thêm các phần phụ thuộc vào tệp build.gradle của ứng dụng. Ví dụ: nếu bạn muốn thêm mô-đungment-ktx, thì hãy thêm phần phụ thuộc bên dưới:
```kotlin
dependencies {
    implementation 'androidx.fragment:fragment-ktx:1.0.1'
}
```
# Android KTX Modules
Toàn bộ KTX Android được chia thành một số mô-đun cho phép bạn sử dụng các tính năng KTX trong ứng dụng của mình và bằng cách đó, bạn sẽ chỉ nhập những tính năng mà bạn cần. Một số mô-đun cơ bản mà chúng tôi sử dụng thường xuyên là:
* Core KTX
* Fragment KTX
* Palette KTX
* SQLite KTX
* Collections KTX

Hãy xem xét các mô-đun này chi tiết hơn.
## Core KTX
Core KTX chứa tất cả các thư viện có trong Android Framework. Các gói có trong mô-đun KTX cốt lõi là:
* androidx.core.animation
* androidx.core.content
* androidx.core.graphics
* androidx.core.graphics.drawable
* androidx.core.net
* androidx.core.os
* androidx.core.preference
* androidx.core.text
* androidx.core.transition
* androidx.core.util
* androidx.core.view
* androidx.core.widget
## Fragment KTX
Fragment KTX được sử dụng để đơn giản hóa API phân mảnh. 
Ví dụ: nếu bạn muốn thực hiện các giao dịch phân mảnh bằng KTX Phân mảnh, thì code sẽ là:
```kotlin
fragmentManager().commit {
   addToBackStack("...")
   setCustomAnimations(
           R.anim.enter_anim,
           R.anim.exit_anim)
   add(fragment, "...")
}
```
## Palette KTX
Điều này được sử dụng để đơn giản hóa việc sử dụng màu sắc trong Android bằng cách tận dụng để nâng cao tính năng của Kotlin. Ví dụ: bạn có thể truy xuất mẫu đã chọn cho một bảng màu nhất định bằng cách sử dụng mã dưới đây:
```kotlin
val palette = Palette.from(bitmap).generate()
val swatch = palette[target]
```
## SQLite KTX
Điều này rất hữu ích vì tất cả các mã liên quan đến SQL đều được bao gồm trong giao dịch như sau:
```kotlin
db.transaction {
    // insert data
}
```
## Collection KTX
Nếu bạn đang làm việc trên một ứng dụng Android đòi hỏi nhiều hoạt động liên quan đến bộ nhớ, thì bạn phải sử dụng ArrayMap, LongParseArray, LruCache và nhiều hơn nữa. Nhưng để làm việc với các bộ sưu tập tiết kiệm bộ nhớ này một cách hiệu quả, bạn có thể sử dụng Bộ sưu tập KTX trong ứng dụng của mình. Ví dụ:
```kotlin
// Combine 2 ArraySets into 1.
val combinedArraySet = arraySetOf(1, 2, 3) + arraySetOf(4, 5, 6)

// Combine with numbers to create a new sets.
val newArraySet = combinedArraySet + 7 + 8
```
## ViewModel KTX
Nếu bạn muốn làm việc với các coroutines từ **ViewModel** của mình, thì bạn có thể sử dụng ViewModel KTX cung cấp **viewModelScope()** và với sự trợ giúp của chức năng này, bạn có thể dễ dàng gọi coroutines từ **ViewModel** của mình. Vì vậy, thay vì tạo một phạm vi mới cho mỗi **ViewModel**, chỉ cần sử dụng viewModelScope(). Sau đây là một ví dụ về viewModelScope() thực hiện một yêu cầu mạng trong nền.
```kotlin
class MainViewModel : ViewModel() {
    // Make a network request without blocking the UI thread
    private fun makeNetworkRequest() {
        // launch a coroutine in viewModelScope
        viewModelScope.launch  {
            remoteApi.slowFetch()
            ...
        }
    }

    // No need to override onCleared()
}
```
## WorkManager KTX
Trình quản lý công việc được sử dụng để chạy một số tác vụ nền ngay cả khi ứng dụng sẽ bị đóng. Ứng dụng nền có thể được khởi động khi ứng dụng ở chế độ nền hoặc nền trước.

**WorkManager KTX** thêm chức năng như Operations và ListenableFeatures để thêm hỗ trợ cho Kotlin coroutines. Để tạm ngừng quy trình đăng ký hiện tại, bạn có thể sử dụng:
```kotlin
// Inside of a coroutine...

// Run async operation and suspend until completed.
WorkManager.getInstance()
        .beginWith(longWorkRequest)
        .enqueue().await()

// Resume after work completes...
```
# Kết luận
Chúng ta đã thấy rằng Android KTX là một phần rất hay của Android JetPack. Nó không cung cấp bất kỳ tính năng và chức năng mới nào, thay vào đó nó nâng cao cách sử dụng các API hiện có bằng ngôn ngữ Kotlin. Chúng ta đã thấy một số tính năng thú vị của Android KTX

Hi vọng qua bài viết này các bạn có thể triển khai được Android KTX cho dự án của mình :D

Cảm ơn các bạn đã đọc đến tận đây, chúc ae một ngày code vui vẻ :D