Bạn có thể đã xem qua nhiều bài viết về Kotlin Extension, nhưng bài viết này không phải là tất cả về Extension. Đó là về việc làm cho code của bạn trở nên dễ đọc hơn, vì vậy tôi đã tập trung vào việc giải thích và đưa ra các tiện ích mở rộng hàng đầu của tôi để làm code bạn tự nhiên nhất có thể.

## Giới thiệu

Kotlin là một ngôn ngữ hiện đại và biểu cảm được xây dựng bởi các nhà phát triển. Theo quan điểm của tôi, đoạn code Kotlin tốt không gì khác ngoài mã có thể thể hiện bản thân một cách tự nhiên, dễ đọc.
Một trong những điều tôi yêu thích nhất về Kotlin là khái niệm về Extension. Đối với một nhà phát triển Android, tính năng này mở ra việc cải tiến code của bạn một cách dễ dàng hơn.
Không chần chờ hơn nữa, bắt đầu thôi.

### 1. Show, Hide, and Remove

Một trong những công việc phổ biến trong lập trình mobile là ẩn và hiện views
Nếu bạn dùng Java, bạn phải gọi phương thức `setVisibility` và truyền `View.VISIBILE` hoặc `View.GONE` tùy theo đặc tả. <br/>

 `view.setVisibility(View.GONE)`

Không có gì sai với đoạn code trên. Nó chạy tốt. Nhưng sử dụng phương thức `set` và `get` làm đoạn code vụng về hơn là tự nhiên. Kotlin đã cung cấp một cách vượt trội để gán giá trị mà không cần `set` hoặc `get`. Nhìn như vầy.

 `view.visibility = View.GONE`

Bây giờ, nó nhìn cũng không tự nhiên lắm vì có dấu gán `=`, vậy thế tôi đã nghĩ  "Tại sao không dùng extension để làm đoạn code đó tự nhiên hơn". Vì thế tôi đã tạo ra những extension này
```
fun View.show(){
    this.visibility = View.VISIBLE
}

fun View.hide() {
    this.visibility = View.INVISIBLE
}

fun View.remove(){
    this.visibility = View.GONE
}
```

Bây giờ chúng ta có thể sử dụng như sau:
```
view.show()
view.hide() 
view.remove()
```

Giờ nó đã trông tự nhiên dễ đọc hơn. 


### 2. Validations

Validate chuỗi string là một việt rất quan trọng khi lập trình. Không dễ để bắt gặp việc phải maintain một class utility có vài phương thức static để validate strings.
Hãy xem một hàm xác thực đơn giản trong Java:

```
// Function in utility class
public static Boolean isStringNotNullOrEmpty(String data){
    return data != null && data.trim().length() > 0 
            && !data.equalsIgnoreCase("null");
}

// Usage at call site
if(Utility.isStringNotNullOrEmpty(data))
```

Bằng việc sử dụng Extension trong Kotlin, việc validate sẽ trông dễ dàng và dễ đọc hơn.

```
//Extension function
fun String?.valid() : Boolean =
        this != null && !this.equals("null", true)
                && this.trim().isNotEmpty()

// Usage at call site
if(data.valid())
```

### 3. Extract Bundle Parameters

Trong Android, chúng tôi truyền dữ liệu giữa các thành phần thông qua Bundle - một cặp Key-value. Thông thường, chúng ta phải kiểm tra một vài thứ trước khi lấy dữ liệu từ Bundle. Trước tiên, chúng ta nên kiểm tra xem Key chúng ta đang tìm có nằm trong Bundle hay không. Sau đó, chúng ta cần kiểm tra xem nó có giá trị hợp lệ hay không. Thông thường, chúng tôi làm điều đó theo cách sau:
```
fun extractData(extras : Bundle){
    if (extras.containsKey("name") && extras.getString("name").valid()){
        val name = extras.getString("name")
    }
}
```
Ở đây, tôi đang sử dụng bốn Extensions : hai cho Activity và hai cho Fragment. Một lần nữa, một cặp cho mỗi thành phần để nhận giá trị không null hoặc giá trị có thể null. Hãy xem:

```
// Activity related
inline fun <reified  T : Any> Activity.getValue(
    lable : String, defaultvalue : T? = null) = lazy{
    val value = intent?.extras?.get(lable)
    if (value is T) value else defaultvalue
}

inline fun <reified  T : Any> Activity.getValueNonNull(
    lable : String, defaultvalue : T? = null) = lazy{
    val value = intent?.extras?.get(lable)
    requireNotNull((if (value is T) value else defaultvalue)){lable}
}

// Fragment related
inline fun <reified T: Any> Fragment.getValue(lable: String, defaultvalue: T? = null) = lazy {
    val value = arguments?.get(lable)
    if (value is T) value else defaultvalue
}

inline fun <reified T: Any> Fragment.getValueNonNull(lable: String, defaultvalue: T? = null) = lazy {
    val value = arguments?.get(lable)
    requireNotNull(if (value is T) value else defaultvalue) { lable }
}
```

Bây giờ, hãy xem cách sử dụng các Extensions ở trên:

```
val firstName by getValue<String>("firstName") // String?
val lastName by getValueNonNull<String>("lastName") // String
```

Cách tiếp cận này có ba ưu điểm:
1. Clean code, dễ đọc và code ngắn gọn
2. Lazy execution.
3. Null-safe values.

### 4. Resource Extensions

Trong Android, chúng ta cần truy cập project-level resources thông qua một lớp resource . Điều này liên quan đến một số code soạn sẵn mà chúng ta cần viết thủ công mỗi khi chúng ta muốn truy xuất dữ liệu từ tệp resources. Không có bất kỳ tiện ích mở rộng nào, việc truy xuất một màu hoặc có thể vẽ sẽ trông như thế này:

```
val color = ContextCompat.getColor(ApplicationCalss.instance, R.color.dark_blue)
val drawable = ContextCompat.getDrawable(MavrikApplication.instance, R.drawable.launcher)
```

Khi sử dụng Kotlin extension, nó sẽ lược bỏ những code dư thừa được lặp lại nhiều lần, và làm dễ đọc hơn

```
//Extensions
fun Int.asColor() = ContextCompat.getColor(ApplicationCalss.instance, this)
fun Int.asDrawable() = ContextCompat.getDrawable(MavrikApplication.instance, this)

//Usage at call site
val color = R.color.dark_blie.asColor()
val drawable = R.drawable.launcher.asDrawable()
```

### 5. Show Alert Dialog, Toast, or Snackbar

Khi bạn muốn hiển thị một tin nhắn chúc mừng đơn giản, câu lệnh bạn cần viết có thể khá dài. 
Đây là những nhiệm vụ chung. Chúng phải ngắn gọn và dễ thực hiện. Đó là lý do tại sao tôi sử dụng các Extensions  sau để tạo mã ngắn gọn nhất có thể.

```
// Show alert dialog
fun Context.showAlertDialog(positiveButtonLable : String = getString(R.string.okay),
                            title : String = getString(R.string.app_name) , message : String,
                               actionOnPositveButton : () -> Unit) {
    val builder = AlertDialog.Builder(this)
            .setTitle(title)
            .setMessage(message)
            .setCancelable(false)
            .setPositiveButton(positiveButtonLable) { dialog, id ->
                dialog.cancel()
                actionOnPositveButton()
            }
    val alert = builder.create()
    alert?.show()
}

// Toash extensions
fun Context.showShotToast(message : String){
    Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
}

fun Context.showLongToast(message : String){
    Toast.makeText(this, message, Toast.LENGTH_LONG).show()
}

// Snackbar Extensions
fun View.showShotSnackbar(message : String){
    Snackbar.make(this, message, Snackbar.LENGTH_SHORT).show()
}

fun View.showLongSnackbar(message : String){
    Snackbar.make(this, message, Snackbar.LENGTH_LONG).show()
}

fun View.snackBarWithAction(message : String, actionlable : String,
                            block : () -> Unit){
    Snackbar.make(this, message, Snackbar.LENGTH_LONG)
            .setAction(actionlable) {
                block()
            }
}
```

Viết những extension này chỉ 1 lần. Bạn có thể sử dụng suốt ứng dụng bằng cách sau:

```
// To show an alert dialog in activities, fragments and more
showAlertDialog(message){
  //TODO on user click on positive button on alert dialog
}

//To show toast in activities, fragments and more
showShotToast(message)
showLongToast(message)

//To show Snackbar applied on any active view
showShotSnackbar(message)
showLongSnackbar(message)
snackBarWithAction(message, lable){
  //TODO on user click on snackbar action lable
}
```

## Tổng kết
5 extensions trên chỉ là một cách nhỏ để làm cho code của bạn tốt hơn khi dùng với Kotlin.
Chúng ta phải làm cho các tác vụ chung phải dễ thực hiện, dễ đọc và tự nhiên nhất có thể.

Nguồn tham khảo:
https://medium.com/better-programming/5-kotlin-extensions-to-make-your-android-code-more-expressive-4c9243cb9466