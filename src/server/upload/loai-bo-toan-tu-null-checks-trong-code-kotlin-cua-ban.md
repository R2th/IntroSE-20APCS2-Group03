Null safety là một trong những tính năng hay nhất của Kotlin, nó khiến bạn suy nghĩ về tính không hợp lệ ở cấp độ ngôn ngữ để bạn có thể tránh được nhiều trường hợp bị NullPointerExceptions, vốn rất phổ biến trong Java. Tuy nhiên, khi bạn sử dụng tính năng tự động chuyển code từ Java sang Kotlin, bạn có thể thấy rất nhiều biểu tượng `!!` trong code.  Có vẻ như bạn không nên có bất kì `!!` ở trong code của bạn, trừ khi nó là một nguyên mẫu nhanh. Và tôi tin đó là sự thật, bởi vì về cơ bản khi sử dụng `!!` có nghĩa là bạn đang có một Kotlin `NullPointerException` có khả năng chưa được xử lý ở đây. Thêm vào đó nó trông có vẻ không phù hợp trong một số trường hợp cụ thể.

Kotlin có một số cơ chế thông minh để tránh điều này, nhưng việc tìm ra chúng không đơn giản. Dưới đây là 6 cách để làm điều đó:

## 1. Sử dụng `val` thay vì `var`

Kotlin khiến bạn phải suy nghĩ về sự bất biến ở cấp độ ngôn ngữ và điều đó thật tuyệt vời. Nếu bạn chưa biết, `val` có nghĩa là bất biến, và `var` là khả biến. Chúng ta được khuyên rằng nên sử dụng càng nhiều thuộc tính bất biến càng tốt. Chúng là những chủ thể an toàn và làm việc tuyệt vời với functional programming. Nếu như bạn sử dụng chúng như những chủ thể bất biến, bạn không cần phải quan tâm đến khả năng xảy ra các trường hợp bị `null`. Nhưng hãy thật cẩn thận, vì `val` thực sự vẫn có thể là khả biến. Ví dụ khi chúng ta sử dụng một getter tùy biến:

```
class Person(val birthDay: DateTime) {
  val age: Int
    get() = yearsBetween(birthDay, DateTime.now())
}
```

Như bạn có thể thấy, không có cách rõ ràng nào để gán `Person.age`, nhưng `Person.age` sẽ thay đổi giá trị khi ngày hiện tại thay đổi.

Trong thực tế, suy nghĩ của `Person.age` như một biến số là một cách hiểu sai. Đây thực ra là một hàm getter mà bạn đang gọi có thể thay đổi giá trị qua các lệnh.

## 2. Sử dụng `lateinit`

Đôi khi bạn có thể sử dụng các đặc tính bất biến. Ví dụ, nó xảy ra trên Android khi một số thuộc tính được khởi tạo trong lệnh gọi `onCreate()`. Đối với những tình huống này, Kotlin có một tính năng gọi là `lateinit`.

Nó cho phép bạn thay thế đoạn code sau đây:

```
private var mAdapter: RecyclerAdapter<Transaction>? = null

override fun onCreate(savedInstanceState: Bundle?) {
   super.onCreate(savedInstanceState)
   mAdapter = RecyclerAdapter(R.layout.item_transaction)
}

fun updateTransactions() {
   mAdapter!!.notifyDataSetChanged()
}
```

Bằng cách viết khác:

```
private lateinit var mAdapter: RecyclerAdapter<Transaction>

override fun onCreate(savedInstanceState: Bundle?) {
   super.onCreate(savedInstanceState)
   mAdapter = RecyclerAdapter(R.layout.item_transaction)
}

fun updateTransactions() {
   mAdapter.notifyDataSetChanged()
}
```

Xin lưu ý rằng việc truy cập thuộc tính được khai báo là lateinit nhưng chưa được khởi tạo sẽ dẫn đến `UninitializedPropertyAccessException`.

Đáng buồn là `lateinit` không làm việc với các kiểu dữ liệu nguyên thủy như `Int`. Đối với các kiểu nguyên thủy, bạn có thể sử dụng delegates như thế này:

```
private var mNumber: Int by Delegates.notNull<Int>()
```

## 3. Sử dụng `let`

Đây là lỗi compile-time phổ biến trong Kotlin:
![](https://images.viblo.asia/e4e20f7b-ba6c-44da-980f-4b96c3d90f75.png)

Điều đó làm tôi bực mình: Tôi biết rằng thuộc tính khả biến này không thể thay đổi được sau khi kiểm tra null. Và nhiều bạn sửa nhanh nó bằng:

```
private var mPhotoUrl: String? = null

fun uploadClicked() {
    if (mPhotoUrl != null) {
        uploadPhoto(mPhotoUrl!!)
    }
}
```

Nhưng có một giải pháp thông minh hơn là sử dụng hàm `let`:

```
private var mPhotoUrl: String? = null

fun uploadClicked() {
    mPhotoUrl?.let { uploadPhoto(it) }
}
```

## 4. Tạo các hàm toàn cục để xử lý các trường hợp phức tạp hơn

`let` là một sự thay thế tuyệt vời cho một trường hợp kiểm tra null đơn giản, nhưng có thể có nhiều trường hợp phức tạp hơn. Ví dụ:

```
if (mUserName != null && mPhotoUrl != null) {
   uploadPhoto(mUserName!!, mPhotoUrl!!)
}
```

Bạn có thể lồng hai hàm `let`, nhưng điều đó sẽ rất khó đọc. Trong Kotlin, bạn có thể viết các hàm có thể truy cập ở mọi nơi để bạn có thể dễ dàng xây dựng một chức năng bạn cần được sử dụng như thế này:

```
fun <T1, T2> ifNotNull(value1: T1?, value2: T2?, bothNotNull: (T1, T2) -> (Unit)) {
   if (value1 != null && value2 != null) {
       bothNotNull(value1, value2)
   }
}
```

## 5. Sử dụng toán tử Elvis

Toán tử Elvis là tuyệt vời khi bạn có một giá trị dự phòng cho trường hợp null. Vì vậy, bạn có thể rút ngắn đoạn code sau:

```
fun getUserName(): String {
   if (mUserName != null) {
       return mUserName!!
   } else {
       return "Anonymous"
   }
}
```
Với
```
fun getUserName(): String {
   return mUserName ?: "Anonymous"
}
```

## 6. Những sự cố theo cách riêng của bạn

Vẫn có những trường hợp khi bạn biết một cái gì đó không thể là null, mặc dù kiểu khai báo là có thể null. Nếu nó là `null`, nó sẽ là một bug trong code và bạn nên biết về nó. Tuy nhiên, việc bỏ đi `!!` ở đó sẽ tạo cho bạn một ngoại lệ Kotlin `NullPointerException` chung chung gây khó cho việc debug. Hãy sử dụng các hàm dựng sẵn `requireNotNull` hoặc `checkNotNull` với thông báo ngoại lệ đi kèm để debug một cách dễ dàng hơn. Ví dụ:

Thay thế 
```
uploadPhoto(intent.getStringExtra("PHOTO_URL")!!)
```
Bằng
```
uploadPhoto(requireNotNull(intent.getStringExtra("PHOTO_URL"), { "Activity parameter 'PHOTO_URL' is missing" }))
```

Ngoài ra, nếu bạn sử dụng tính năng tự động chuyển đổi từ Java sang Kotlin trong IDEA/ Android Studio, bạn có thể cung cấp cho IDE một số gợi ý hữu ích để giảm hoặc loại bỏ những toán tử `!!` không cần thiết. 
Ví dụ, trước khi thực hiện chuyển đổi, thêm annotation `@NotNull` vào bất kì biến và method parameters nào mà bạn mong đợi sẽ không thể null. Công cụ chuyển đổi tự dộng sẽ nhận ra chú thích đó và sử dụng nó để tạo ra các biến không thể null, ...
## Tổng kết

Nếu bạn làm theo 6 lời khuyên này, bạn có thể loại bỏ tất cả hàm Null checks `!!` từ code Kotlin của bạn. Code của bạn sẽ an toàn hơn, dễ gỡ lỗi hơn và sạch hơn. Hãy cho tôi biết trong phần comment nếu bạn biết về nhiều cách hơn để đối phó với null safety.