Không giống như Java, nơi chúng ta cần viết mọi thứ, trình biên dịch Kotlin có thể hiểu mã và tự định nghĩa các đoạn code . Điều này làm tăng năng suất code và cũng  tiết kiệm cả thời gian.

## Kotlin khiến việc phát triển phần mền Android trở nên thú vị hơn 

Nếu bạn đã tìm hiểu qua Kotlin , bạn sẽ tìm thấy vô số cách mà Kotlin đã giải quyết nhiều điểm yếu của Java và các tính năng tuyệt vời của Kotlin làm cho việc phát triển Android trở nên thú vị hơn.
Như [Open Source For You](https://opensourceforu.com/2018/07/kotlin-a-language-for-modern-multi-platform-applications/) miêu tả

> *“Kotlin is a multi-platform programming language that is concise, safe, interoperable and tool-friendly. It is a statically-typed programming language that runs on the Java virtual machine and can also be compiled to the JavaScript source code or can use the LLVM compiler infrastructure.”*

-----



 Kotlin là một ngôn ngữ lập trình đa nền tảng ngắn gọn, an toàn, tương tác tốt  và là một công cụ thân thiện. Nó là ngôn ngữ lập trình tĩnh chạy trên máy ảo Java và cũng có thể được biên dịch thành mã nguồn JavaScript hoặc có thể sử dụng cơ sở hạ tầng trình biên dịch LLVM

Bất kể những tính năng nào mà bạn đang xem ở đây, hầu hết chúng đều có thể áp dụng cho các nền tảng khác ( navite code, android, JVM,...) , nơi Kotlin được sử dụng để phát triển.
Nào cùng đi tìm hiểu xem Kotlin có gì mà hay vậy.

## Kotlin Extensions

Khái niệm đầu tiên mà mình nói tới ở đây chính là Kotlin Extensions . Như ở [Doc](https://kotlinlang.org/docs/reference/extensions.html) đã miêu tả : 

> *“Kotlin provides the ability to extend a class with new functionality without having to inherit from the class or use design patterns such as Decorator.”*

-----



 Kotlin cung cấp khả năng mở rộng một lớp với chức năng mới mà không cần phải kết thừa hoặc sử dụng mẫu desing pattern như Decorator.
 
Chúng ta có thể thêm phương thức vào class hay interface sẵn có mà không cần phải kế thừa lại.  Ví dụ, chúng ta có thể mình thêm một chức năng mới cho một lớp trong thư viện của bên thứ ba mà không sửa đổi code mẫu, phần chúng ta thêm vào vẫn được sử dụng  như một chức năng bình thường của thư viện. Các chức năng như vậy được gọi là extension functions (chức năng mở rộng)

### **Default Kotlin Extensions**

Kotlin là một package của nhiều chức năng hữu ích. Các phần mở rộng mặc định của Kotlin có thể kể đến như `filter`, `single`, `first` và `last` trong array-list cũng như `last` để check ký tự cuối trong một chuỗi.

 **filter**
 
Filter là một hàm mở rộng của array-list mà qua đó chúng ta có thể lọc được kết quả, như ví dụ dưới:
```kotlin
// Simple list
val numbers = listOf("one", "two", "three", "four")  
val longerThan3 = numbers.filter { it.length > 3 }

// Custom data class arraylist
val searchedSeries = arrayAllSeries.filter{ 
              it.seriesName.toLowerCase().contains(search_key.toLowerCase()) }
```
Trong Java, chúng ta cần viết tất cả các vòng lặp, tạo một mảng riêng và thêm tất cả các đối tượng vào một mảng mới, v.v. Với Kotlin chúng ta say "NO"  

**single**

Single khá giống như filter khi nó cũng lọc nhưng mà chỉ lọc ra một kết quả  với điều kiện đã cho thôi (nghe xàm xàm như JS hay Python nhỉ)  :stuck_out_tongue_winking_eye:
```kotlin
val series : Series = arrayAllSeries.single{ 
              it.seriesName.toLowerCase().contains(search_key.toLowerCase()) }
```

**first and last**

Như tên của nó , chúng trả về giá trị đầu và giá trị cuối của mảng 
```kotlin
val last =  arrayAllSeries.last()
val first =  arrayAllSeries.first()
```
Tất nhiên nếu chỉ có vậy thì không nói làm gì rồi. Chúng ta có thể thêm các điều kiện lồng vào nữa
```kotlin
val last = arrayAllSeries.last { it.seriesName.toLowerCase().contains(searchkey.toLowerCase()) }
val first = arrayAllSeries.first { it.seriesName.toLowerCase().contains(searchkey.toLowerCase()) }
```
Nói qua sương sương vậy thôi Kotlin còn vô vàn các chức năng mở rộng như trên giúp chúng ta giảm boilerplate code .
Đây chỉ là phần nổi của tảng băng chìm . 

### **User-Defined Extensions**

Chúng ta có thể tạo các phần mở rộng cho bất kỳ class hay interface trong Kotlin để có các chức năng mong muốn của mình . Dưới đây là một số tiện ích mở rộng mình sử dụng thường xuyên.

**ViewExtensions**

Đầu tiên chúng ta hãy xem qua ví dụ dưới đây, viết theo cách thông thường
```kotlin
RxView.clicks(tv_login)
.throttleFirst(Constants.RX_CLICK_INTERVEL, TimeUnit.MILLISECONDS)
.subscribe {
    LoginScreen.startActivity(WeakReference(this))
}.let{
    composables.add(it)
}
```
 Code có vẻ khá dài cho một cú click nhỉ, giả sử có chục cái `textview` cần click  như vậy thì thế nào . Với Kotlin , mọi chuyện dễ dàng hơn. Đầu tiên tạo file `viewextensions` rồi viết lại  extensions function cho `RxClick` trong View: 
```kotlin
fun View.reactiveclick(block : () -> Unit) : Disposable{
  return RxView.clicks(this)
              .throttleFirst(Constants.RX_CLICK_INTERVEL, TimeUnit.MILLISECONDS)
              .subscribe({
                  block()
              }, {})
}
```

Ta viết thêm chức năng cho View , thích viết trong đó cũng được, miễn là hợp ý mình thui. Đùa tý chứ viết sao cho phù hợp chứ linh tinh thì chết ngay.  `reactiveclick` tương tự như `general-click function` trong View :  `setOnClickListener`. Và giờ sử dụng thoải mái ở khắp nơi thôi 
```kotlin
tv_login?.reactiveclick {
     LoginScreen.startActivity(WeakReference(this))
}?.let { composables.add(it) }
```
Làm chút so sánh nhỉ 
```kotlin
// without kotlin extensions
RxView.clicks(tv_login)
.throttleFirst(Constants.RX_CLICK_INTERVEL, TimeUnit.MILLISECONDS)
.subscribe {
    LoginScreen.startActivity(WeakReference(this))
}.let{
    composables.add(it)
}


// with Kotlin Extensions
tv_login?.reactiveclick {
     LoginScreen.startActivity(WeakReference(this))
}?.let { composables.add(it) }
```
Chúng ta sẽ nhận biết những lợi thế của extension functions khi ta bắt đầu sử dụng chúng. Nó giống như bạn đang thực hiện phong cách của riêng bạn. Sau đây là một số thứ mà mình sử dụng trong dự án của mình để loè mọi người , à nhầm để tăng năng suất cho code (hehe) :
```kotlin
fun View.reactiveclick(block : () -> Unit) : Disposable{
  return RxView.clicks(this)
              .throttleFirst(Constants.RX_CLICK_INTERVEL, TimeUnit.MILLISECONDS)
              .subscribe({
                  block() 
              }, {}) 
}

fun View.showSnackbar(message : String){
    Snackbar.make(this,message,Snackbar.LENGTH_SHORT).show()
}

fun View.hideKeyboard() {
    val imm = context.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
    imm.hideSoftInputFromWindow(windowToken, 0)
}

fun View.setViewHeight(value : Int){
    layoutParams.height = value
}

fun View.remove(){
    visibility = View.GONE
}

fun View.hide(){
    visibility = View.INVISIBLE
}

fun View.show(){
    visibility = View.VISIBLE
}
```
**String extensions**
```kotlin
fun String?.checkIsNullOrEmpty() : Boolean{
    return !this.isNullOrEmpty() && !this.equals("null",ignoreCase = true)
}

fun  String.removeFirstLastChar(): String = this.substring(1, this.length – 1)

val EMAIL_ADDRESS_PATTERN = Pattern
        .compile("[a-zA-Z0-9\\+\\.\\_\\%\\-\\+]{1,256}" + "\\@"
                + "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}" + "(" + "\\."
                + "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}" + ")+")
fun String.isvalidEmail(): Boolean {
    return EMAIL_ADDRESS_PATTERN.matcher(this).matches()
}
```
Chúng ta có thể viết bất kỳ chức năng nào để áp dụng trên các chuỗi theo yêu cầu cấp dự án. Ví dụ khi ta làm app chat chit hẹn hò bí mật với Tuesday, mà muốn user khi gõ @  thì hiện danh sách  gợi ý người dùng ( Messenger Facebook đó )  ta có thể làm như sau: 
```kotlin
fun String?.checkIsNullOrEmpty() : Boolean{
    return !this.isNullOrEmpty() && !this.equals("null",ignoreCase = true)
}

fun String.startShowingMentions() : Boolean {
    return checkIsNullOrEmpty() && this.endsWith("@")
}
```
**Context extension**

Đây là một trong những thứ yêu thích của mình . Có rất nhiều extension function mà  chúng ta có thể viết bằng cách sử dụng context  như cài đặt màu thanh trạng thái, lấy chiều cao và chiều rộng màn hình, hiển thị toast và thậm chí kiểm tra kết nối internet.
Hãy xem một số thứ mà mình dùng nhé : 
```kotlin
fun Context.hasNetwork(): Boolean? {
    var isConnected: Boolean? = false // Initial Value
    val connectivityManager = getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
    val activeNetwork: NetworkInfo? = connectivityManager.activeNetworkInfo
    if (activeNetwork != null && activeNetwork.isConnected)
        isConnected = true
    return isConnected
}

val Context.screenWidth: Int
    get() = resources.displayMetrics.widthPixels

val Context.screenHeight: Int
    get() = resources.displayMetrics.heightPixels

fun Context.setSatatusBarColor(context: WeakReference<Activity>, @ColorRes colorResId: Int) {

    if (Build.VERSION.SDK_INT >= 21) {
        val window = context.get()?.window
        window?.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS)
        window?.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS)
        window?.statusBarColor = context?.get()!!.resources.getColor(colorResId)
    }

}

fun Context.showToast(msg: String,length : Int) {
    Toast.makeText(this, msg,
            Toast.LENGTH_SHORT).show()
}
```
Trông ngon nghẻ chưa :joy::joy::joy:

Nhưng lưu ý là đừng cho tất cả extension functions vào hết trong một file. Cẩn thẩn sau một hai tháng nhìn lại sẽ hoa mắt chóng mặt đấy. Hãy tạo ra các file riêng biệt như `ViewExtensions`, `StringExtensions`, `FileExtensions`,..... như cách mà ta làm việc với tập tin trong Java thui. Đây là những extension funtsion thường xuyên được mình sử dụng , tất nhiên là ta có thể sử dụng nhiều hơn nữa  tuỳ theo đặc trưng của mỗi dự án 

## Higher-Order Functions
Một hàm có thể được truyền dưới dạng tham số hoặc có thể được return  từ hàm được gọi là higher-order-functions . Nói cách khác, higher-order-functions là hàm lấy các hàm làm tham số hoặc trả về hàm.
Chức năng này rất tiện dụng không phân biệt nền tảng mà bạn đang phát triển. Mình cảm thấy các higher-order-functions rất tiện dụng để thay thế các click listeners và truyền các hàm dưới dạng tham số.
Để hiểu rõ hơn về nó, hãy xem một ví dụ sau đây : 

Điều phổ biến nhất mà tất cả chúng ta sử dụng là tạo RecyclerView trong đó chúng ta tạo click listeners và truyền nó vào trong adapter. Thay vào đó, ta sẽ chuyển trực tiếp hàm dưới dạng tham số như ví dụ sau : 
```kotlin
class CountryAdapter(
    val context: Context, val block: (viewType: Int, data: CountryDetails) -> Unit,
    private val glideDelegate: GlideDeligate) : RecyclerView.Adapter<BaseViewHolder<Any>>() {
```
Nhìn xem đối số thứ hai, là một higher-order-functions với hai tham số cần invoke trong  Rycylerview item click 
Invoke nó như thế nào, xem nè : 
```kotlin
itemView.setOnClickListener {
    dataModel?.let {
        block(itemViewType, dataModel!!)
    }
}
```
Và giờ tạo adapter thôi 
```kotlin
private fun setUpRecyclerview() {
    layoutManager = LinearLayoutManager(activity, RecyclerView.VERTICAL, false)
    recyclerview_countries?.layoutManager = layoutManager
    countryadapter = CountryAdapter(activity!!, {  viewType : Int, data : CountryDetails -> coutriesItemClick(viewType,data) }, GlideDeligate(activity!!))
    recyclerview_countries?.adapter = countryadapter
}
fun  coutriesItemClick(viewType: Int, data: CountryDetails){
    
}
```
`coutriesItemClick` là hàm chúng ta  truyền vào `CountryAdapter` như là một tham số để  invoke  


-----
Ngon chưa :money_mouth_face::money_mouth_face::money_mouth_face:.  Ta loại bỏ tất cả các boilerplate code để tạo ra click listener , và cũng không cần phải xác định xem view nào được gọi khi item click nữa 

**Recyclerview adapter with multiclick areas**

Truyền higher-order-functions vào khi ta có một hay hai  vùng trong item cần gán sự kiện click . Nhưng nếu  có nhiều hơn thì sao. Tất nhiên là không nên truyền tất vào rồi ( tối đa 3 tham số thôi nhé- Đọc cuốn Clean code và bạn sẽ biết lý do tại sao lại vậy ) 

Hãy xem làm thế nào để xử lý các loại tình huống này một cách hiệu quả.
```kotlin
class PlaylistAdapter(val context: Context, val glideDelegate: GlideDeligate): Adapter() {

    var onItemClick: ((Item) -> Unit)? = null
    var onPlayClick: ((Item) -> Unit)? = null
    var onPauseClick: ((Item) -> Unit)? = null
    var onPreviousClick: ((Item) -> Unit)? = null
    ...// other methods, 

    fun onBind(item){
        view.setOnClickListener {
              onItemClick?.invoke(item) 
        }
        view.button_play.setOnClickListener {
              onPlayClick?.invoke(item) 
        }
}
```

Rất ngon và ngọt nước rồi (hihi). Giờ tha hồ thích bao nhiều cũng được nhé . Sao phải xoắn nhỉ : 
![](https://images.viblo.asia/a1a47032-7ba0-4bd1-a900-8e2e80a621aa.jpg)

```kotlin
val adapter = PlaylistAdapter(activity!!,glideDeligare)

adapter.onItemClick = { item ->
    // process the item
}

adapter.onPlayClick = { item ->
    // proceed to play
}
```

## Scoped Functions
Nếu bạn đã sử dụng Kotlin được một thời gian, bạn đã biết các scope functions như `let`, `also`, `apply` , v.v. - hãy xem qua lợi ích của việc sử dụng chúng.

Về cơ bản, các hàm này làm điều tương tự nhau  - thực thi một khối mã trên một đối tượng. Điều khác biệt là cách đối tượng này trở nên khả dụng bên trong khối và kết quả của toàn bộ biểu thức là gì.
Hãy cùng đi qua một vài trong số chúng 

**let**

`let` là một scope functions trong đó các biến khai báo bên trong biểu thức không thể được sử dụng ở ngoài . `let` lấy đối tượng mà nó được gọi làm tham số và trả về kết quả của biểu thức lambda.
Hãy xem cách sử dụng của nó: 

```kotlin
Movie("Avengers", 5.0).let {
    println(it)
    it.changeNameTo("Sherlock")
    it.decrementRating()
    println(it)
}
```
   Còn khi mà bạn không sử dụng let thì bạn sẽ phải khai báo  một biến mới  và lặp lại tên của nó bất khi nào sử dụng : 
```kotlin
val movie= Movie("Avengers", 5.0)
println(movie)
movie.changeNameTo("Sherlock")
movie.decrementRating()
println(movie)
```
Scopen functions có thể khiến code trông ngắn gọn hơn và dễ đọc hơn . Hơn nữa nó có thể check null :
```kotlin
var name : String? = "Kotlin let null check"
name?.let { println(it) } //prints Kotlin let null check
name = null
name?.let { println(it) } //nothing happens
```
Không còn cảnh như vậy  nữa :
![](https://images.viblo.asia/a27ae716-6967-411f-9276-11e3c4874d9d.png)

**run**

* Tương tự như `let` , `run`  cũng trả lại câu lệnh cuối cùng
* Nhưng không giống `let`, `run` không hỗ trợ từ khóa `it`

**apply** 

`apply` có thể thay đổi thuộc tính của thực thể bên nơi chúng ta áp dụng từ khoá
```kotlin
textviewName?.apply{
     text = "print this from apply"
     hint = "hide this from apply"
     .......
}
```
**with**

 `with` lại là một từ khoá hoạt động gần giống apply  dùng để truy cập thuộc tính của thực thể mà từ khoá được áp dụng 
```kotlin
data class Person(var name: String, var tutorial : String)
var person = Person("Samule", "Kotlin")

with(person)
    {
        name = "No Name"
        tutorial = "Kotlin tutorials"
    }
```
Các scope functions khác nhau về kết quả trả về :
* `apply`, `also`  thì trả về một *object*
* `let`, `run`, `with` thì trả về một biểu thức *lambda*

Chọn cái nào để sử dụng thì còn tuỳ theo bạn muốn xử lý code của mình như thế nào. Nhưng việc sử dụng chúng thì thật sự rất tiện lợi Nếu các bạn muốn tìm hiểu sâu hơn về scope function hãy tham khảo[ bài viết ](https://viblo.asia/p/tu-viet-scope-functions-voi-kotlin-de-xem-cach-chung-hoat-dong-3P0lPEeP5ox)của Phúc Búa nhé .

Bài viết được dịch từ trang [Medium](https://medium.com/better-programming/advanced-android-programming-with-kotlin-5e40b1be22bb)  và có thêm chút xàm xí của mình nữa. Có gì sai xót mong mọi người góp ý .:heart_eyes::heart_eyes::heart_eyes: