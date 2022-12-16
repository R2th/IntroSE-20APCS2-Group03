## Mở đầu

Một trong những thứ khiến Kotlin trở nên ưu việt hơn hẳn so với Java chính là các hàm Scope (with, apply, run, let, also), các hàm này giúp cho code trở nên ngắn gọn và dễ đọc hơn rất nhiều, đồng thời việc code trên Kotlin cũng nhanh hơn.

Vấn đề ở đây là không phải ai cũng hiểu rõ và nắm chắc được cách các hàm này hoạt động ra sao, trả về cái gì nên nhiều khi còn sử dụng chưa được chuẩn. Trong bài viết này, chúng ta hãy thử tự viết các hàm này để hiểu rõ cách thức chúng hoạt động nhé.

Lưu ý: Các hàm được viết lại không giống hệt so với thư viện chuẩn của Kotlin, bạn có thể xem chi tiết cách triển khai các hàm này để biết nó còn được thêm thắt những gì nhé.

## Bắt đầu

Trước tiên cần giả định trước với nhau một đối tượng **receiver** có kiểu là `Receiver`.
```Kotlin
class Receiver {
    var var0 = 1
    fun func() {}
}
```

## Hàm with()

```Kotlin
with(receiver) {
    // commands here
}
```
- Cách dùng: **Hàm này coi receiver là this, trả về dòng cuối của khối lệnh.**
- Thường dùng khi: **Cần lấy giá trị nhiều thuộc tính của đối tượng receiver để thực hiện việc gì đó.**


Ta có thể tự viết hàm này kiểu như sau:
```Kotlin
fun <T, R> doWith(receiver: T, block: T.() -> R): R {
    return receiver.block()
}
```
* Hàm này là hàm global.
* Có 2 tham số:
    *  Tham số đầu nhận lệnh có kiểu generic là `T`
    *  Tham số sau là một hàm mở rộng của lớp generic `T` trả về kiểu `R`.
* Hàm này chỉ thực hiện gọi method `block()` của đối tượng T được truyền vào.
* Trả về đúng kiểu trả về của hàm block luôn.

Khi sử dụng hàm này, có thể viết như sau:

```Kotlin
val a: Int = doWith(receiver, {
    func()
    return@doWith var0 + 1
})
```

Bạn thấy rằng hàm trả về kiểu Int của a nên IDE sẽ không báo lỗi.

Vì hàm truyền vào là tham số cuối nên theo quy tắc của Kotlin, ta có thể chuyển nó ra phía sau cho dễ nhìn.

```Kotlin
val a: Int = doWith(receiver) {
    func()
    return@doWith var0 + 1
}
```

-> Vẫn chạy đúng.

Để gọn hơn nữa có thể bỏ luôn `return@doWith` như sau:
```Kotlin
val a: Int = doWith(receiver) {
    func()
    var0 + 1
}
```
-> Nó vẫn trả về 11.

## Hàm apply

```Kotlin
receiver.apply {
    // commands here
}
```

* Cách dùng: **Hàm này coi receiver là this, trả về chính receiver (sau khi đã thực hiện các lệnh trong khối lệnh).**
* Thường dùng khi: **Cần thay đổi hoặc gọi một số lệnh với receiver trước khi gán cho một đối tượng khác (hoặc truyền vào hàm khác).**

Ta có thể tự viết hàm này kiểu như sau:

```Kotlin
fun <T> T.doApply(block: T.() -> Unit): T {
    block()
    return this
}
```
* Hàm này là hàm mở rộng của lớp generic `T`.
* Có 1 tham số là một hàm mở rộng của lớp generic `T` trả về kiểu `Unit`.
* Hàm này chỉ thực hiện gọi method `block()` của đối tượng `T` được truyền vào.
* Trả về chính đối tượng gọi nó.

Khi sử dụng hàm này, có thể viết như sau:

```Kotlin
val a: Receiver = receiver.doApply({
    var0 = 10
})
println(a.var0)
```

-> In ra 10. Đúng.

Ta cũng có thể rút gọn lại:

```Kotlin
val a: Receiver = receiver.doApply {
    var0 = 10
}
println(a.var0)
```

## Hàm run

```Kotlin
receiver.run {
    // commands here...
}
```

* Cách dùng: **Hàm này coi receiver là this, trả về dòng cuối của khối lệnh.**
*  Thường dùng khi: **Cần thực hiện nhiều lệnh liên tục với receiver.**

Ta có thể viết lại hàm này kiểu như sau:
```Kotlin
fun <T, R> T.doRun(block: T.() -> R): R {
    block()
}
```
* Hàm này là hàm mở rộng của lớp generic `T`.
* Có 1 tham số là một hàm mở rộng của lớp generic `T` trả về kiểu generic `R`.
* Hàm này chỉ thực hiện gọi method `block()` của đối tượng kiểu `T` gọi nó.
* Trả về đúng kiểu trả về của hàm `block()`, giống `with()`.

Khi sử dụng hàm này, có thể viết như sau:

```Kotlin
val a: Int = receiver.doRun({
    func()
    var0 + 10
})
println(a)
```

-> In ra 11. Đúng.

Ta cũng có thể rút gọn lại:

```Kotlin
val a: Int = receiver.doRun {
    func()
    var0 + 10
}
println(a)
```

## Hàm let
```Kotlin
receiver.let { rcv ->
    rcv.func()
    rcv.var0 += 1
}
```
* Cách dùng: **Hàm này coi receiver là tham số (it hoặc được define), trả về dòng cuối của khối lệnh.**
* Thường dùng khi: **Cần kiểm tra null (dùng ?.let) với receiver trước khi thực hiện lệnh với receiver, đặc biệt khi receiver là tham số của hàm khác (nếu define tên sẽ clear hơn dùng this của run).**

Ta có thể viết lại hàm này kiểu như sau:
```Kotlin
fun <T, R> T.doLet(block: (T) -> R): R {
    block(this)
}
```
* Hàm này là hàm mở rộng của lớp generic `T`.
* Có 1 tham số là một hàm trả về kiểu generic `R`, hàm này có một tham số kiểu `T`.
* Hàm này chỉ thực hiện gọi method `block()` của đối tượng kiểu `T` gọi nó, tham số của hàm này chính là đối tượng gọi nó.
* Trả về đúng kiểu trả về của hàm `block()`, giống `with()`.

Khi sử dụng hàm này, có thể viết như sau:

```Kotlin
val a: Int = receiver.doLet({
    it.func()
    it.var0 + 10
})
println(a)
```

-> In ra 11. Đúng.

Ta cũng có thể rút gọn lại:

```Kotlin
val a: Int = receiver.doLet {
    it.func()
    it.var0 + 10
}
println(a)
```

Và đặt tên cho đối số:
```Kotlin
val a: Int = receiver.doLet { rcv ->
    rcv.func()
    rcv.var0 + 10
}
println(a)
```

## Hàm also
```Kotlin
receiver.also { rcv ->
    rcv.func()
    rcv.var0 += 1
}
```
* Cách dùng: **Hàm này coi receiver là tham số (it hoặc được define), trả về chính receiver.**
* Thường dùng khi: **Cần gán receiver cho một đối tượng khác và kiểm tra null với receiver (dùng ?.also), đặc biệt khi receiver là tham số của hàm khác (nếu define tên sẽ clear hơn dùng this của apply).**

Ta có thể viết lại hàm này kiểu như sau:
```Kotlin
fun <T> T.doAlso(block: (T) -> Unit): T {
    block(this)
    return this
}
```
* Hàm này là hàm mở rộng của lớp generic `T`.
* Có 1 tham số là một hàm trả về kiểu `Unit`, hàm này có một tham số kiểu `T`.
* Hàm này chỉ thực hiện gọi method `block()` của đối tượng kiểu `T` gọi nó, tham số của hàm này chính là đối tượng gọi nó.
* Trả về chính đối tượng gọi nó.

Khi sử dụng hàm này, có thể viết như sau:

```Kotlin
val a: Receiver = receiver.doAlso({
    it.func()
    it.var0 += 10
})
println(a.arg0)
```

-> In ra 11. Đúng.

Ta cũng có thể rút gọn lại:

```Kotlin
val a: Receiver = receiver.doAlso {
    it.func()
    it.var0 += 10
}
println(a.arg0)
```

Và đặt tên cho đối số:
```Kotlin
val a: Receiver = receiver.doAlso { rcv ->
    rcv.func()
    rcv.var0 += 10
}
println(a.arg0)
```

## Tổng kết
Scope functions là một tính năng hữu ích của Kotlin, nếu hiểu đúng và áp dụng đúng sẽ giúp bạn code sướng tay hơn rất nhiều vì hạn chế được boilerplate code. Ngoài ra các hàm apply, run, let, also cũng là một cách rất hữu hiệu để null-check. Hy vọng qua bài viết này các bạn sẽ hiểu được cách các hàm này hoạt động và nếu có thời gian hãy thử code lại và cảm nhận nhé. :smile:

(Nếu nội dung bài viết có chỗ nào chưa chuẩn, rất mong nhận được comment góp ý từ mọi người.)