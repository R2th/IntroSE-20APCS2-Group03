## 1.Tổng quan

Đây là tính năng mới được thêm bắt đầu từ Kotlin 1.3. Hãy cùng xem qua lý do cho sự ra đời của nó nhé :D.

Các bạn hãy cùng xem qua đoạn code dưới đây:

```kotlin
data class Request(val arg: String)
 
class Service {
 
    fun process(request: Request?) {
        validate(request)
        println(request.arg) // Doesn't compile because request might be null
    }
}
 
private fun validate(request: Request?) {
    if (request == null) {
        throw IllegalArgumentException("Undefined request")
    }
    if (request.arg.isBlank()) {
        throw IllegalArgumentException("No argument is provided")
    }
}
```

Đọc qua thì chúng ta có thể thấy là hàm `validate` đã thực hiện việc check null cho `request` và nếu nó  `null` thì exception sẽ được throw ngay và luôn ở trong hàm. Vì vậy cho nên khi chương trình đã chạy đến dòng `println` thì chắc chắn việc request bị `null` là điều không thể xảy ra.

Và đây là chỗ chúng ta có thể thấy được cái "ngu" của compiler: Compiler không nhận biết được điều này và không cho phép chúng ta tham chiếu đến `request.arg`.

Để có thể khắc phục điều này thì Kotlin cho phép chúng ta "nâng cấp" hàm validate bằng cách ốp một `contract` cho nó với nội dung là nếu hàm return thành công - tức là nó không throw exception - thì đối sỗ được truyền vào hàm đó là không `null`:

```kotlin
@ExperimentalContracts
class Service {
 
    fun process(request: Request?) {
        validate(request)
        println(request.arg) // Compiles fine now
    }
}
 
@ExperimentalContracts
private fun validate(request: Request?) {
    contract {
        returns() implies (request != null)
    }
    if (request == null) {
        throw IllegalArgumentException("Undefined request")
    }
    if (request.arg.isBlank()) {
        throw IllegalArgumentException("No argument is provided")
    }
}
```

Qua ví dụ trên chắc các bạn cũng đã hiểu nôm na `contract` để làm gì rồi: nó cho phép lập trình viên "giật dây" compiler theo ý muốn của mình :D. 

Trong phần tiếp theo chúng ta sẽ cùng tìm hiểu kỹ hơn về tính năng này nhé.

## Contracts API

Cấu trúc của contract là như sau:

```kotlin
function {
    contract {
        Effect x
    }
}
```

Chúng ta có thể hiểu nôm na là "việc gọi hàm sẽ sinh ra một effect x"

Trong phần tiếp theo chúng ta sẽ cùng nhìn qua các loại effect mà ngôn ngữ hiện đang hỗ trợ.

###  Tạo ra một sự đảm bảo (guarantee) dựa trên kết quả được return

Với loại này thì chúng ta có thể chỉ định rằng nếu hàm return thì effect chúng ta định nghĩa ra sẽ được thỏa mãn. Nó chính là loại chúng ta vừa sử dụng trong mục Tổng quan đó :D.

Ngoài ra thì chúng ta còn có thể chỉ định cho compiler tạo ra một effect chỉ trong trường hợp giá trị được trả về bởi `return` thỏa mãn một trường hợp nào đấy:

```kotlin
data class MyEvent(val message: String)
 
@ExperimentalContracts
fun processEvent(event: Any?) {
    if (isInterested(event)) {
        println(event.message) 
    }
}
 
@ExperimentalContracts
fun isInterested(event: Any?): Boolean {
    contract { 
        returns(true) implies (event is MyEvent)
    }
    return event is MyEvent
}
```

Nhờ có contract trong đoạn code trên mà compiler đã thực hiện một smartcast trong hàm `processEvent`.

**Hiện tại thì các điều kiện có thể set cho `returns` chỉ bao gồm `true`, `false`, và null . Ngoài ra thì mặc dù `returns` có chấp nhận đối số kiểu `Boolean` nhưng chỉ có một số cách biểu diễn nhất định được chấp nhận, cụ thể là: check null ( == null, != null), check kiểu (is, !is), các toán tử logic: (&&, ||, !) **.

Ngoài ra có một biến thể của `returns` dành cho giá trị non-null được trả về:

```kotlin
contract {
    returnsNotNull() implies (event is MyEvent)
}
```

### Tạo ra một sự đảm bảo về việc sử dụng hàm

Hãy cùng xem qua đoạn code sau:

```kotlin
inline fun <R> myRun(block: () -> R): R {
    return block()
}
 
fun callsInPlace() {
    val i: Int
    myRun {
        i = 1 // Bị compiler báo lỗi do đây có thể là hành động gán lại giá trị cho biến
    }
    println(i) // Bị compiler báo lỗi do biến này có thể chưa được khởi tạo
}
```

Lý do mà chúng ta bị compiler báo lỗi ở dòng `i = 1` là do compiler không thể biết được là đoạn code được biểu diễn dưới dạng lambda (`block`) của chúng ta có thể được gọi bao nhiêu lần. Có thể sẽ nhiều hơn 1 lần nên nó cứ chặn, giết nhầm hơn bỏ sót :v. Chúng ta có thể bỏ các thông báo lỗi này bằng cách cho compiler biết rằng `block` sẽ chỉ được gọi duy nhất 1 lần bằng cách thêm `contract` như sau:

```kotlin
@ExperimentalContracts
inline fun <R> myRun(block: () -> R): R {
    contract {
        callsInPlace(block, InvocationKind.EXACTLY_ONCE)
    }
    return block()
}
```

Các hàm tiện ích của Kotlin như `run, with, apply...` đều được đặt `contract` như vậy.

Ở đây thì chúng ta đang sử dụng `InvocationKind.EXACTY_ONCE`. Ngoài ra thì có các tùy chọn khác là `AT_LEAST_ONCE`, `AT_MOST_ONCE` và `UNKNOWN`.

## Mặt hạn chế hiện tại của Contracts

Như các bạn thấy thì khả năng của `contracts` là rất hứa hẹn. Tuy nhiên thì hiện tại syntax của nó vẫn chưa ổn định cho nên khả năng trong tương lai có thể bị thay đổi.

Ngoài ra nó còn có các hạn chế sau:

- Chúng ta chỉ có thể áp dụng `contracts` cho các top-level function mà có thân hàm. Chúng ta không thể sử dụng chúng cho các `field` và function của class.
- Việc khai báo `contract` phải nằm ở dòng đầu tiên của thân hàm.
- Compiler sẽ "mù quáng" tin tưởng tuyệt đối vào contract vô điều kiện. Điều này có nghĩa là lập trình viên sẽ phải rất thận trọng trong việc viết một `contract`. Phiên bản trong tương lai của `contract` có thể sẽ có thêm phần verification cho `contract`

Và cuối cùng là phần mô tả của `contract` chỉ cho phép sử dụng duy nhất các tham chiếu đến các đối số được truyền vào hàm. Ví dụ như đoạn code sau đây sẽ không thể compile được:

```kotlin
data class Request(val arg: String?)
 
@ExperimentalContracts
private fun validate(request: Request?) {
    contract {
        // We can't reference request.arg here
        returns() implies (request != null && request.arg != null)
    }
    if (request == null) {
        throw IllegalArgumentException("Undefined request")
    }
    if (request.arg.isBlank()) {
        throw IllegalArgumentException("No argument is provided")
    }
}
```

## Kết

Mặc dù về mặt syntax thì `contract` vẫn chưa stable nhưng về chức năng được implement của nó đã đủ ổn định để mà được cho vào `stdlib` của Kotlin. **Do vậy nên nếu muốn chúng ta hoàn toàn có thể tự tin để dùng nó ngay bây giờ**. Trong trường hợp syntax có bị thay đổi chăng nữa thì việc chúng ta refactor lại cũng sẽ không khó khăn gì.

Cảm ơn các bạn đã đọc bài viết,
Happy coding !!!

*Nguồn: https://www.baeldung.com/kotlin-contracts
                https://proandroiddev.com/kotlin-contracts-make-great-deals-with-the-compiler-f524e57f11c*