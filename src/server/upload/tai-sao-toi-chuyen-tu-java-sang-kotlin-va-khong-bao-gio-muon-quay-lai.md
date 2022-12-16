Hê lô :hugs: ,xin chào các bạn !

Qua một thời gian học tập và phát triển ứng dụng với cả Java và Kotlin,
tôi cảm thấy bản thân đã nghiêng về phía Kotlin nhiều hơn, và thực sự là bây giờ không muốn quay trở lại Java nữa.<br>
Lí do tại sao ?
Hãy cùng tôi đi hết nội dung của bài viết để tìm thấy câu trả lời nhé :yum::yum:

![](https://images.viblo.asia/60d2ea84-569e-4d9c-beaf-7791024fac6a.png)
### I. Lời mở đầu
Khi bạn đang đọc bài viết này, ít nhất bạn đã nghe nói về Kotlin. Đó là một ngôn ngữ mã nguồn mở có thể biên dịch sang Máy ảo Java, Android và thậm chí là JavaScript.

Nó hoàn toàn có thể tương tác với Java. Điều đó có nghĩa là bạn chỉ cần thực hiện một số cấu hình bổ sung nhỏ - như thiết lập trình biên dịch Kotlin - và sau đó bạn có thể tạo tệp .kt đầu tiên trong dự án Java hiện có của mình.

Bắt đầu với Kotlin thường dễ dàng hơn rất nhiều so với việc cập nhật lên phiên bản Java mới nhất, vì vậy rào cản để chuyển sang ngôn ngữ này của bạn là hoàn toàn thấp.

Kotlin cung cấp rất nhiều tiện ích mở rộng mà tôi mong muốn trong tất cả các phiên bản Java mới nhất, như tính không nullability, toán tử Elvis, cuộc gọi an toàn và nhiều hơn nữa.

Bộ tính năng của nó làm giảm đáng kể: code soạn sẵn và dễ xảy ra lỗi. Có nghĩa là dễ viết hơn với cách ít dài dòng hơn, dẫn đến ít mã hơn. Ít mã hơn chủ yếu dẫn đến ít lỗi hơn. Do khả năng có thể null của Kotlin, nó cũng ít có khả năng tạo ra NullPointerExceptions.
v.v...
### II. Cú pháp và ngữ nghĩa
Cú pháp của Kotlin trông rất giống với các ngôn ngữ hiện đại khác. Đối với tôi, nó trông rất giống với TypeScript.

Chúng ta hãy đi sâu vào một số tính năng của Kotlin và cú pháp và ngữ nghĩa thực sự trông như thế nào.
#### 1. Tự suy luận kiểu
Kotlin có thể tự động giải quyết các loại biến của bạn nhưng vẫn cho phép bạn xác định chúng một cách rõ ràng.

```
val vehicle = Vehicle("WDE1F3DE9A9EA855F") // Kotlin tự hiểu đó là một Vehicle
val message = "example output" // Không định nghĩa rõ ràng, kotlin tự suy luận là String
val count: Int = 5 // Vẫn có thể định nghĩa kiểu rõ ràng nếu muốn
```
#### 2. Các thông số được đặt tên
Bạn có thể chuyển tên tham số cùng với giá trị của nó, điều này sẽ bảo vệ bạn khỏi việc vô tình truyền các đối số theo thứ tự sai nếu chúng cùng kiểu. Bên cạnh đó, nếu hàm của bạn chứa các tham số nullable, thì tất cả các thành phần đó sẽ được tạo null cho bạn, điều này thậm chí còn hữu ích hơn.

```
val firstVehicle = Vehicle(vin = "WDCB451D3F033E91F", type = "limousine")
val secondVehicle = Vehicle(vin = "WD77DD5D3B690C63F")
val thirdVehicle = Vehicle(type = "hardtop", vin = "WDEB60F2FA593071F")
```
#### 3. Chuỗi
Dễ dàng xây dựng chuỗi mà không cần StringBuilder.

```
log.info("Invalid SMS PIN [customerId=${customer.id}")
log.info("Process successfully finished [customerId=$customerId]")
```

#### 4. (Hầu như) mọi thứ đều có thể sử dụng được như một biểu thức
Các cấu trúc phổ biến như if và try cũng có thể sử dụng như một biểu thức. Vì vậy, bạn có thể sử dụng try/catch để gán một biến nếu không có ngoại lệ nào được ném ra nhưng sẽ trở lại giá trị mặc định nếu có sự cố.

```
val backoffTime: Int = try { calculateBackoff() } catch (e: Exception) { 320 }
val validationState = if (emailConfirmed) Status.CONFIRMED else Status.UNCONFIRMED
```

#### 5. Cấu trúc lặp nâng cao
Có một loạt các cấu trúc để xác định phạm vi vòng lặp của bạn.

```
for (i in 10 downTo 1 step 2) { println(i) } // Lặp ngược từ 10 đến 1 với bước nhảy là 2
for (i in 1..3) { println(i) } // Lặp trong khoảng 1 <= i <= 3
```
#### 6. Toán tử Elvis
Toán tử này có thể được sử dụng để quay trở lại các giá trị mặc định sau toán tử " ?: " ,  nếu giá trị trong thời gian chạy sẽ là null.

```
val contactInformation: String = customer.mobileNumber ?: customer.email
val requiredContact: String = customer.email ?: throw new ValidationException("Missing Contact Information")
```
#### 7. When - chính là switch được điều chỉnh
Thường được nói vui là " trí tuệ nhân tạo", when cung cấp cho bạn một tập hợp các tính năng mở rộng để xây dựng các biểu thức điều kiện với nhiều nhánh.

```
val statusCode: HttpStatus = when {
  isNewCustomer -> HttpStatus.CREATED
  existingCustomerUpdated -> HttpStatus.ACCEPTED
  else -> HttpStatus.OK
}
```

#### … Và còn nhiều hơn thế nữa
Còn nhiều "đường quyền" hơn để khám phá với Kotlin. Tôi chỉ giới thiệu sơ qua về những gì tôi yêu thích nhất.
![](https://images.viblo.asia/60d9df32-2950-43a5-bca2-5087055743ab.png)
### III. Các tính năng chi tiết
Hãy đi sâu vào một số tính năng cốt lõi của Kotlin - hoặc các tính năng mà tôi thực sự yêu thích kể từ khi bắt đầu cuộc hành trình này.
#### 1. Tính không có giá trị
Theo cá nhân tôi, đây là lần có tác động lớn nhất. Tôi đã đấu tranh rất nhiều với Null Pointers trong quá khứ. Với Kotlin, bạn buộc phải xác định rõ ràng một biến có thể null trong thời gian chạy hay không. Nếu bạn đang cố gắng gán các tham chiếu đến các đối tượng nullable cho các loại không thể nullable, bạn sẽ gặp lỗi trình biên dịch. Điều đó làm giảm đáng kể khả năng xảy ra các con trỏ Null không mong muốn trong thời gian chạy.

Bên cạnh đó, Kotlin cung cấp các cuộc gọi an toàn **?.** cũng như tùy chọn lùi lại **?:** nếu một null giá trị được tìm thấy.

```
var notNullableCustomer: Customer
var nullableCustomer: Customer?
var nullableListWithNullableItems: List<Customer>?
var notNullableListWithNullableItems: List<Profile?>
var nullableListWithNullableItems: List<Profile?>?
  
var confirmedCustomers: List<Customer> = customersPerRegion
  ?.flatten()
  ?.filter { customer -> customer.status == Status.CONFIRMED }
  ?: listOf()
```

Nếu có một tham chiếu nullable, nhưng bạn chắc chắn rằng điều này không thể xảy ra trong thời gian chạy, bạn có thể đánh dấu biến của mình bằng **!!** để thông báo cho trình biên dịch rằng đây có thể được coi là một tham chiếu không thể null.

#### 2. Chức năng và lập trình chức năng ( Function)
Kotlin hỗ trợ sự phát triển hàng ngày của bạn thông qua các tiện ích mở rộng gọn gàng dẫn đến cú pháp gọn gàng và rõ ràng hơn. Ví dụ: bạn có thể bỏ qua kiểu trả về, dấu ngoặc nhọn hoặc câu lệnh trả về.

```
// Viết theo kiểu cũ
override fun getId(): String {
    return customer.id.value
}

// ... Vẫn thế nhưng đơn giản hơn
override fun getId() = customer.id.value
```

Về chữ ký của phương thức, bạn có thể sử dụng các tham số mặc định và được đặt tên. Nếu bạn vẫn đang làm việc với các lớp Java đang gọi các phương thức từ các lớp Kotlin, bạn có thể chú thích các phương thức của mình @JvmOverloadsđể trình biên dịch của Kotlin sẽ tạo ra tất cả các chữ ký đã được nạp chồng.

```
@JvmOverloads
fun customerLivesIn(region: String, mustBeConfirmed: Boolean = false): Boolean { /* TODO */ }

customerLivesIn("Bavaria")
customerLivesIn(region = "Bavaria")
customerLivesIn("Bavaria", false)
customerLiveIn(mustBeConfirmed = true, region = "Bavaria")
```

Ngoài ra còn có tùy chọn để giảm bớt các biểu thức lọc và ánh xạ của bạn bằng cách bỏ qua việc khai báo các tham số đơn lẻ it.

```
val confirmedCustomers: List<Customer> = customersPerRegion
  ?.flatten()
  ?.filter { it.status == Status.CONFIRMED }
  ?: listOf()
```

Không nên lạm dụng điều này - đặc biệt nếu bạn đang làm việc filter hoặc map.

#### 3. Data Classes
Lớp dữ liệu là lớp đặc biệt dành cho các thực thể, các đối tượng chuyển giao dữ liệu, hoặc các business objects mà không yêu cầu bạn phải thực hiện các hàm thông thường như constructor, getters / setters, toString, hashCode, hoặc equals. Kotlin sẽ tự sản sinh nó.
#### 4. Extension Function - Các chức năng mở rộng
Bạn có thể thêm các chức năng và thuộc tính vào các lớp hiện có mà không cần tạo các lớp con - không chỉ cho riêng bạn mà còn cho các lớp từ các phụ thuộc của bên thứ ba.

```
fun String.isValidVin() = this.matches(Regex("[a-z0-9]*"))
fun Customer.isConfirmed: Boolean
  get() = this.status == Status.CONFIRMED
```

#### 5. Operator overloading
Các lớp liên quan đến các phép toán có thể được nạp chồng. Điều tương tự cũng xảy ra đối với các phép toán phi toán học (ví dụ: sử dụng ==trên các phép toán bằng). Điều này giúp tăng cường khả năng đọc, vì đó là một tuyên bố tự nhiên hơn đối với mắt người.
Ví dụ:
* `+` cho `plus()`
* `*` cho `times()`
* `[]` cho `get()`
* `in` cho `contains`

```
data class Counter(val dayIndex: Int) {
  operator fun plus(increment: Int): Counter {
    return Counter(dayIndex + increment)
  }
}
```

#### 6. Lọc, sắp xếp và làm việc với bộ sưu tập (collections)

Không cần phải gọi stream nữa - map và filter có thể được sử dụng ngầm. Ngoài ra, bạn có thể ngầm định cũng như sử dụng giá trị hiện tại của mình mà không cần khai báo qua it.

Kotlin hỗ trợ làm việc với các bộ sưu tập khổng lồ thông qua Sequences . Coder đánh giá về Sequences là lazy, có nghĩa là việc tính toán sẽ chỉ được thực hiện khi một hoạt động kết thúc được gọi (tức là khi kết quả thực sự cần thiết). Sequences cũng xử lý khác với Iterables , khi họ đi qua tất cả lặp cho một yếu tố duy nhất trước khi tiếp tục thay vì làm việc thông qua tất cả các yếu tố của một lặp đơn trước khi tiếp tục lặp kế tiếp. Điều này mang lại lợi thế là không cần kết quả trung gian.

```
val persons = listOf(Person(1, "Santa"), Person(2, "Claus"))
val filteredPersons: Sequence<String> = persons.asSequence()
  .filter { it.name.startsWith("S") }
  .map { it.name }
// no evaluations for any item yet
filteredPersons.forEach(::println)
// .map for "Claus" never evaluated
```

#### 7. Coroutines
Với Coroutines , bạn có thể viết mã song song / không đồng bộ theo cách tự nhiên, tuần tự. Không có callbacks, promises hoặc thread. Do đó, chúng cũng rất nhẹ và chỉ có chi phí tối thiểu. Bắt đầu 100.000 Coroutines sẽ không dẫn đến kết quả OutOfMemoryExceptionso so với khi bắt đầu 100.000 thread hạng nặng.

```
private suspend fun hasOrders(customerId: String) = 
  gateway.retrieveOrders(customerId).isNotEmpty()
private suspend fun hasMembership(customerId: String) =
  gateway.retrieveMembershipDetails(customerId: String) != null

// [...]

val isMemberWithOpenOrder: Boolean = runBlocking {
  listOf(
    async { hasOrders(customerId) }
    async { hasMembership(customerId) }
  ).map { it.await() }.all { it } ?: false
}
```

#### Và còn rất nhiều thứ khác nữa ...

### IV. Nhược điểm
Ngay cả khi chúng là ngôn ngữ mới, vẫn có những mặt trái nhất định khi sử dụng Kotlin.

* Thời gian biên dịch chậm hơn —Với dự án nhỏ, tôi không nhận thấy điều đó, nhưng nó dường như là một điều phổ biến được chỉ ra trong cộng đồng.
* Cần xử lý nhiều phụ thuộc hơn - Ít nhất phải có phụ thuộc lõi Kotlin và trình biên dịch của nó.
* Không có ngoại lệ nào được kiểm tra - Đối với tôi, đây là một tính năng, nhưng nói chung, đây có vẻ là một chủ đề cho các nhà phát triển Java.
* Chuyển đổi giữa cả hai ngôn ngữ - Nếu bạn có một dự án hỗn hợp, điều này đôi khi có thể khiến bạn mệt mỏi.

### V. Kết luận
Kotlin là một ngôn ngữ hiện đại và ngắn gọn cho phép bạn và nhóm của bạn không chỉ viết mã theo cách hiệu quả hơn mà còn thực sự tăng khả năng đọc của nó. Kotlin đang được phát triển tích cực và liên tục phát hành các tính năng mà bạn có thể tận dụng với nỗ lực cập nhật tối thiểu.

Nhưng đừng chỉ theo ý kiến của tôi. Tự mình thử nó xem. Do khả năng tương tác của nó với Java, bạn có thể bắt đầu ngay lập tức trong dự án mà bạn lựa chọn!

Cảm ơn bạn đã đọc !

##### *Tài liệu tham khảo:*

https://betterprogramming.pub/why-i-switched-from-java-to-kotlin-and-never-looked-back-8c061209ea8

https://mobiosolutions.medium.com/why-kotlin-is-the-best-choice-for-android-application-development-697aacb1632a