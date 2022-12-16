# Giới thiệu

Hôm nay mình xin giới thiệu tới các bạn một số **scope function** là **let**, **apply**, **run**, **also** và **with** trong nhóm **standard function** của **Kotlin**. Và mình xin ví dụ các function này với **Android** để cùng thảo luận về cách sử dụng, các điểm giống và khác nhau của chúng đồng thời là một số use case.

![](https://images.viblo.asia/9be1ef64-1081-4b05-bca7-05d78c31f112.png)

# Scope function

Scope function (hàm phạm vi) là những function có chức năng chính là cung cấp một scope nhỏ hơn từ function gọi.

Một ví dụ đơn giản nhất để thể hiện như sau:

```kotlin
fun test() {
    var mood = "I am sad"

    run {
        val mood = "I am happy"
        println(mood) // I am happy
    }
    println(mood)  // I am sad
}
```

Với ví dụ này thì bên trong function test, bạn có được một scope riêng biệt với mood được định nghĩa lại là `I am happy` và nó chỉ tồn tại trong scope của run.

## So sánh scope function: let, apply, run, also, with

Để so sánh các scope function let, apply, run, also, with thì mình sẽ dựa trên các tiêu chí sau:

- **extension function**
- **it and this**
- **return**

### normal vs extension function

```kotlin
bundle.apply {
    putInt("some_int", 0)
    putString("some_String", "")
}
        
with(bundle) {
    putInt("some_int", 0)
    putString("some_String", "")
}
```

Thoạt nhìn qua thì chúng ta sẽ thấy hai cách trên gần giống nhau và cũng thực hiện cùng một việc. Tuy nhiên with là normal function trong khi đó let, apply, also, run là extension function.

- **normal function: with**
- **extension function: let, apply, run, also**

Câu hỏi ở đây vậy cái nào tốt hơn? Giả sử bundle có thể bị null, thì chúng ta cần check null trước khi thực hiện như sau

```kotlin
bundle?.apply {
    putInt("some_int", 0)
    putString("some_String", "")
}

 with(bundle) {
    this?.putInt("some_int", 0)
    this?.putString("some_String", "")
}
```
        
Với ví dụ này thì chắc hẳn bạn cũng nhìn ra là **extension function sẽ có lợi hơn** rất nhiều vì giúp chúng ta giảm thiệu khá nhiều code trong việc check null trước khi sử dụng.

### it and this

Chúng ta cùng xem ví dụ sau về let và apply. Cả hai function đều thực hiện chung một việc.

```kotlin
bundle?.let {
    it.putInt("some_int", 0)
    it.putString("some_String", "")
}

 bundle?.apply {
    putInt("some_int", 0)
    putString("some_String", "")
}
```

Ở trong `apply` thì this được gọi ngầm và ám chỉ tới bundle nên bạn ko cần phải gọi trực tiếp `this.putInt` hay `this.putString`.

Còn ở trong `let` thì để gọi đến bundle thì bạn phải dùng it.

Từ ví dụ trên thì có vẻ như là **apply sẽ tốt hơn let vì ngắn gọn hơn**. Tuy nhiên let cũng có lợi ích như sau:
- cung cấp cả hai cách truy cập tới biến gọi function và class chứa
- khi mà không thể gọi ngầm this thì it.put vẫn ngắn hơn là this.put
- bạn có thể convert it sang tên khác rõ ràng hơn như sau

```kotlin
bundle?.let {
    nonNullBundle ->
    nonNullBundle.putInt("some_int", 0)
    nonNullBundle.putString("some_String", "")
}
```

Từ đó ta có hai nhóm như sau:
- **it là object và this là class: let, also**
- **không có it, this là object: apply, run, with**

### return this or anything

Và một sự khác nhau nữa của scope function chính là return value. Chúng ta hãy cùng xem qua ví dụ sau:

```kotlin
bundle?.apply {
    putInt("some_int", 0)
    putString("some_String", "")
}?.putBoolean("some_boolean", false) // ok, default return this

bundle?.apply {
    putInt("some_int", 0)
    putString("some_String", "")
    "2"
}.toInt() // error, return this (bundle)
```

```kotlin
bundle?.run {
    putInt("some_int", 0)
}.putString("some_String", "") // error, default return Unit

bundle?.run {
    putInt("some_int", 0)
    this
}.putString("some_String", "") // ok

bundle?.run {
    putInt("some_int", 0)
    putString("some_String", "")
    "2"
}.toInt() // ok
```

Các function apply, also  chỉ return object gọi nó và các function let, run, with sẽ return anything tùy theo dòng lệnh cuối cùng có giá tị là gì, nếu không define thì mặc định là return Unit

- **return object: apply, also**
- **return anything: let, run, with**

Từ những so sánh trên thì mình sẽ có bảng kết luận chi tiết như sau:

![](https://images.viblo.asia/9be1ef64-1081-4b05-bca7-05d78c31f112.png)

Có vẻ hơi nhiều thứ cần phải nhớ nhỉ? Không đâu, bạn chỉ cần nắm rõ cho mình một scope function là đủ cho hầu hết mọi nhu cầu rồi. Các loại khác có quên thì xem lại khi code một chút là nhớ ngay.

Với **apply, run, with** mà muốn truy cập đến class từ trong function thì sao nhỉ? Bạn có thể dùng `this@class` là xong.

# Use case

- Thay thế `if (object != null)`

```kotlin
bundle?.apply {
    putInt("some_int", 0)
    putString("some_String", "")
    putBoolean("some_boolean", false)
}
```

- Khởi tạo object

```kotlin
val person1 = Person().apply {
    name = "Quan"
    job = "Android Dev"
}
```

...

**Let practice and make IT awesome!**

# Tham khảo

Standard.kt

https://github.com/JetBrains/kotlin/blob/master/libraries/stdlib/src/kotlin/util/Standard.kt

Mastering Kotlin standard functions: run, with, let, also and apply

https://medium.com/@elye.project/mastering-kotlin-standard-functions-run-with-let-also-and-apply-9cd334b0ef84

Kotlin standard functions — just another guide

https://proandroiddev.com/kotlin-standard-functions-just-another-guide-8c639181ceb1