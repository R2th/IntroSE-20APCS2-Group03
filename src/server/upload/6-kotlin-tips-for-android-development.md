![](https://images.viblo.asia/31f06877-e466-4f40-a9ae-01d58d2823e1.png)

Như các bạn đã biết Kotlin là một ngôn ngữ mạnh mẽ. Và nó đã được google công nhận là một ngôn ngữ chính thức để phát triển ứng dụng Android. Trong quá trình phát triển thì có rất nhiều tính năng "hay ho" mà Java không có. Vì vậy bài viết này với mong muốn liệt kê lại những tips, trick thường sử dụng nhất.
# LAZY LOADING
Chúng ta nghĩ đến việc sử dụng lazy loading khi gặp những trường hợp sau:
- Muốn giảm thời giản khởi động màn hình.
- Tối ưu hóa bộ nhớ.
- Đóng gói logic khởi tạo cho biến.

Giả sử trong thực tế bạn đang làm một màn hình shopping có chức năng mua Item trong đó. Nhưng không phải cứ vào màn hình đó thì user sẽ mua Item. Việc luôn luôn khởi tạo API sẽ làm giảm thời gian khởi tạo màn hình và lãng phí bộ nhớ.  Nguyên lý của Lazy loading là chỉ cấp phát bộ nhớ cho biến khi nó được gọi và sử dụng giá trị đó cho những lần gọi tiếp theo.
```
val purchasingApi: PurchasingApi by lazy {
    val retrofit: Retrofit = Retrofit.Builder()
            .baseUrl(API_URL)
            .addConverterFactory(MoshiConverterFactory.create())
            .build()
    retrofit.create(PurchasingApi::class.java)
}
```
Nếu bạn khai báo như trên thì biến purchasingApi sẽ không được cấp phát luôn khi bạn tạo class. Mà nó chỉ được cấp phát bộ nhớ khi biến đó được gọi lần đầu.
Hoặc bạn có thể dùng nó để đóng gói logic khởi tạo như sau:
```
val bounds: RectF by lazy { 
    RectF(0f, 0f, width.toFloat(), height.toFloat()) 
}
```
# LAMBDAS
LAMBDAS sẽ giúp chúng ta giảm số lượng dòng code trong source file và cho phép functional programming. Kotlin đã hỗ trợ sẵn việc này và bạn không phải sử dụng những thư viện thứ 3 như **Retrolambda**.
Ví dụ, khi bạn cần lắng nghe sự kiện onclick của button:
```
button.setOnClickListener { view ->
    startDetailActivity()
}
```
Thậm chí là trả về giá trị từ Lambdas như sau:
```
toolbar.setOnLongClickListener { 
    showContextMenu()
    true
}
```
# DATA CLASSES
Data class là một class đơn giản. Thường dùng làm model class cho dữ liệu. Và được hỗ trợ một số function built-in: equals(), hashCode(), copy(), and toString() 
```
data class User(val name: String, val age: Int)
```
Chỉ đơn giản như trên là chúng ta đã tạo xong một data class. Trong một số trường hợp bạn có thể nhận dữ liệu từ API cần kết hợp với một số thư viện parse Json như **Gson** thì bạn có thể thì bạn có thể tạo hàm khởi tạo mặc định và giá trị mặc định cho các biến như sau:
```
data class User(
    @SerializedName("name") val name: String = "",
    @SerializedName("age") val age: Int = 0
)
```
# COLLECTION FILTERING
Trong quá trình phát triển ứng dụng bạn thường gặp phải trường hợp cần lọc một list item dựa vào một điều kiện nào đó. Ở đây mình ví dụ là lọc ra một danh sách active user từ một danh sách user trả về từ API. 
```
val users = api.getUsers()
val activeUsersNames = items.filter { 
    it.active 
}
adapter.setUsers(activeUsers)
```
Kotlin đã xây dựng sẵn function filter cho collection giúp cho công việc của developer nhàn hơn rất nhiều.
# EXTENSIONS
EXTENSIONS rất hữu ích vì nó cho phép bạn có thể thêm một function vào một class mà không phải thừa kế class đó. Ví dụ trong thực tế bạn đã từng mong Activity có function như là: hideKeyboard(). Với Kotlin bạn có thể thực hiện việc này một cách dễ dàng:
```
fun Activity.hideKeyboard(): Boolean {
    val view = currentFocus
    view?.let {
        val inputMethodManager = getSystemService(Context.INPUT_METHOD_SERVICE) 
                as InputMethodManager
        return inputMethodManager.hideSoftInputFromWindow(view.windowToken,
                InputMethodManager.HIDE_NOT_ALWAYS)
    }
    return false
}
```
Với cách viết như trên thì bạn đã thêm một function hideKeyboard() vào tất cả class Activity. Giúp cách tổ chức code của chúng ta rõ ràng hơn và dễ đọc hơn rất nhiều. Thay vì viết những hàm Utility như trước kia.
# LEVERAGING LET
Let là một sope function. Và nó cho phép bạn thực hiện một khối lệnh khi object khác null. Việc này giúp chúng ta tránh được việc check null, code vì thế cũng dễ đọc hơn. Trong Java sẽ như sau:
```
if (currentUser != null) {
    text.setText(currentUser.name)
}
```
Trong Kotlin sẽ như sau:
```
user?.let {
    println(it.name)
}
```
với cách như trên thì let đã tự động gán user tới biến un-nullable: it. Bạn có thể sử dụng biến it mà không phải lo về check null nữa.

Vừa rồi mình đã liệt kê 6 tips, trick thường dùng trong Kotlin. Hi vọng sẽ giúp ích nhiều cho các bạn trong quá trình phát triển ứng dụng Android. Happy Coding!!! :smile:

Bài viết có tham khảo tại: https://savvyapps.com/blog/kotlin-tips-android-development