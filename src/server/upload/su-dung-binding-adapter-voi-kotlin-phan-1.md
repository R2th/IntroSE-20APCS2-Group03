![](https://images.viblo.asia/b03ec3e6-9514-408e-ab50-50f1d5a50921.jpg)

`Binding Adapter ` thường khó sử dụng đối với người mới dùng `Binding Adapter` và chúng ta cũng biết tại sao nó lại khó sử dụng ở những trường hợp phức tạp. Ví dụ như đối với việc `setText` của `TextView`  hay `src` của `ImageView` thì khá dễ dàng để dùng `Binding Adapter`. Nhưng khi sử dụng một cái gì đó phức tạp hơn một chút ví dụ như [Two-way Binding](https://developer.android.com/reference/android/databinding/InverseBindingAdapter) để điều khiển dữ liệu thì nó thực sự khá là khó hiểu khi sử dụng.

Nói ở trên có vẻ khó hiểu thế thôi. Nhưng các bạn đừng lo lắng. Trong bài viết này  tôi sẽ trình bày các nguyên tắc cơ bản của việc viết `Binding Adapter` một cách dễ hiểu nhất. Đến cuối bài viết này, bạn sẽ thấy rằng việc viết các `Binding Adapter` cơ bản trong Kotlin khá đơn giản - miễn là bạn làm theo một số hướng dẫn. Đến cuối chương này bạn có thể làm chủ được `Binding Adapter` một cách dễ dàng.

### Khi nào thì chúng ta cần `Binding Adapter`
Dưới đây có 3 cách tôi sẽ nói dến bên dưới đây để một thuộc tính của` View` ràng buộc với dữ liệu.
#### 1.   Automatic Setters
Để ví dụ về [Automatic Setters](https://developer.android.com/topic/libraries/data-binding/#automatic_setters) từ tài liệu. Tôi có một đoạn code ví dụ : 
``` Kotlin
<TextView
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:text="@{viewModel.textString}" />
```
Giả sử viewModel.textString là một `String`, `Binding Adapter` sẽ tìm kiếm một method trên TextView :
```
public void setText(String value)
```
`Binding Adapter` sẽ không tìm thấy vì hàm `setText(String value)` không tồn tại. Nhưng kể từ khi `String` là một `CharSequence`. Nên nó sẽ đối chiếu được sang hàm 
```
public void setText(CharSequence value)
```
Tương tự như vậy tôi có thê ví dụ : 
``` XML
<TextView
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:text="@{viewModel.textResId}" />
```
Giả sử `viewModel.textResId` là `Int`, `Binding Adapter` sẽ tìm kiếm một phương thức trên TextView là :
```
public void setText(int value)
```
Đây là một ít code để bạn có thể dễ dàng hiểu hơn. Bạn có thể dùng cách này để sử dụng `Automatic Setters`.
Nhưng đây chỉ là cách đơn giản nhất để sử dụng `Binding Adapter`.
#### 2. Renamed Setters
[Renamed Setters](https://developer.android.com/topic/libraries/data-binding/#renamed_setters) phép bạn kết hợp một số tên thuộc tính tuỳ chỉnh với một `setter` vào trong `View`. Nó hữu ích khi một setter có method dài loằng ngoằng ở trong `View` hoặc khi bạn muốn các thuộc tính được đổi tên để phù hợp với View trong thực tế sử dụng. Chúng ta cùng mượn 1 ví dụ khác từ tài liệu ở link trên : 
``` XML
<ImageView
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:imageTintList="@{viewModel.colorStateList}" />
```
Đoạn code ở trên chúng ta sử dụng `Automatic Setters` để dùng method `setImageTintList`. Nhưng để rút ngắn nó chúng ta có thể tạo ra một  `Renamed Setters` chẳng hạn như:
```
@BindingMethods(
        BindingMethod(
                type = ImageView::class,
                attribute = "android:tint",
                method = "setImageTintList"
        )
)
class ImageViewBindingAdapters
```
Sau đó thuộc tính của View trở nên ngắn gọn và trong sáng hơn
``` XML
<ImageView
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:tint="@{viewModel.colorStateList}" />
```
Với cá nhân của tôi, thì thường tránh sử dụng ` renamed setters` vì chúng chính là các method nằm trong `View`. Ngoài ra `Binding Adapter Annotation` cần phải được liên kết với một `Class`, trong đó có thể có hoặc có thể không hoàn toàn trống rỗng như `ImageViewBindingAdapters` ở trên. Cuối cùng thì `Renamed Setters` nó cũng là một tính năng là `Google` mang đến cho bạn, như vậy bạn có thể sử dụng `Binding Adapter` một cách siêu đơn giản.
#### 3. Custom Setters
[Custom Setters](https://developer.android.com/topic/libraries/data-binding/#custom_setters) được sử dụng khi bạn cần phải làm điều gì đó phức tạp hơn một chút. Ví dụ khi bạn sử dụng một  `Glide` để tải hình ảnh và sau đó đặt nó hiển thị trên `ImageView` khi đã tải xong. Hoặc đơn giản hơn bạn có nhiều kiểu của một dữ liệu bạn muốn chỉ cần chỉ định kiểu vào trong `View` và `View` tự hiển thị theo kiểu mà bạn chuyền xuống cho `View`. Ngoài ra nếu bạn chỉ đơn giản là muốn tránh sử dụng `Renamed Setters`, bạn sẽ cần sử dụng `Binding adapters`. Nó cũng có thể được sử dụng khi bạn cần cập nhật nhiều thuộc tính trên một `View` cùng một lúc hoặc nếu bạn muốn nhận phản hồi từ `view-model`.
### Chậm lại 1 chút !!! Chính xác thì Binding Adapter là cái gì ?????
`Binding Adapter` chỉ đơn giản là `static method` hoặc `instance method` được sử dụng để làm thế nào xác định một số thuộc tính người dùng định nghĩa các thuộc tính dữ liệu để ràng buộc với thuộc tính của `View`.
Một lần nữa, Chúng ta lại sử dụng một [Ví dụ trong tài liệu](https://developer.android.com/topic/libraries/data-binding/#custom_setters). Trong ví dụ này, nói rằng chúng ta muốn thiết lập `padding left` trên `View`. Vấn đề là method `View.setPadding` có 4 tham số, vì vậy `automatic setters` sẽ không hoạt động ở đây.
Ta có thể viết một `Binding Adapter` cho một `padding` duy nhất, ví dụ:
```
@BindingAdapter("android:paddingLeft")
fun View.bindPaddingLeft(paddingLeft: Int) {
    setPadding(
            paddingLeft,
            // these call getPaddingTop etc on the receiver View
            this.paddingTop,
            this.paddingRight,
            this.paddingBottom
    )
}
```
Hoặc ta có thể viết một `Binding Adapter` để tạo điều kiện thiết lập tất cả các thuộc tính `padding`:
```
@BindingAdapter(
        "android:paddingLeft",
        "android:paddingTop",
        "android:paddingRight",
        "android:paddingBottom", requireAll = false)
fun View.bindPadding(
        paddingLeft: Int,
        paddingTop: Int,
        paddingRight: Int,
        paddingBottom: Int
) {
    setPadding(
            paddingLeft,
            paddingTop,
            paddingRight,
            paddingBottom
    )
}
```
### Extension Methods?
Bạn có thể tự hỏi tại sao chúng được viết dưới dạng các phương thức mở rộng(`Extension Methods`), có hai lý do cho việc này. Nó làm cho  rõ ràng hơn loại `View` mà các `Binding Adapter` hướng đến, và trong nhiều trường hợp nó làm cho method của view trở nên trong sáng hơn.

Do chúng làm việc như là `Extension Methods` vì `top level` của `Extension Methods` thường được dịch sang `static methods` nơi nhận các kiểu dữ liệu và sẽ trở thành `params` đầu tiên của JVM. Kết quả là một `Binding Adapter` mà tạo ra code `Java` có thể gọi được
### Tham số và Thuộc tính
Một `Binding Adapter` phải có ít nhất 1 thuộc tính. Số lượng thuộc tính phải phù hợp với số lượng tham số truyền vào để `Binding Adapter` chấp nhận. Giống như tham số đầu tiên của View. Giống như ` Extension Methods`. Thuộc tính `android:paddingLeft` được liên kết với tham số `paddingLeft`...
Mặc định thì tham số `requireAll` là `true`. Thiết lập nó là `false` thì đơn giản là cho phép bỏ qua các thuộc tính trong `xml layout` mà chúng ta không quan tâm.
### Binding adapter với các kiểu reference 
Chúng ta sẽ quay lại ví dụ padding sau, bây giờ Chúng ta có một `Custom View` được gọi là `UserView`. Nó có trách nhiệm hiển thị `Tên` và `Họ` của  `UserViewModel`.
`UserViewModel` sẽ giống như code bên dưới:
``` Kotlin
class UserViewModel(
        firstName: String,
        lastName: String
) : BaseObservable() {
    @Bindable
    var firstName: String = firstName
        set(value) {
            if (field != value) {
                field = value
                notifyPropertyChanged(BR.firstName)
            }
        }
    @Bindable
    var lastName: String = lastName
        set(value) {
            if (field != value) {
                field = value
                notifyPropertyChanged(BR.lastName)
            }
        }
}
```
`UserView` sẽ giống như bên dưới đây
``` Kotlin
class UserView @JvmOverloads constructor(
        context: Context, 
        attrs: AttributeSet? = null, 
        defStyleAttr: Int = 0
) : View(context, attrs, defStyleAttr) {
    var firstName: CharSequence = ""
        set(value) {
            field = value
            invalidate()
        }
    var lastName: CharSequence = ""
        set(value) {
            field = value
            invalidate()
        }
    override fun onDraw(canvas: Canvas?) {
        super.onDraw(canvas)
        // imagine this actually renders text
    }
}
```
Bạn có thể thấy `UserViewModel` và `UserView` đã gần như giống nhau về thuộc tính. Tức là cả 2 đều có thuộc tính là  `firstName` và `lastName`.
Cả hai `UserView` và `UserViewModel` đều có các thuộc tính các loại tham chiếu, tức là chúng không phải là loại nguyên thủy.
Trong Kotlin, các kiểu [dữ liệu cơ bản](https://kotlinlang.org/docs/reference/basic-types.html#basic-types) như `Double ,Float, Long, Int, Short, Byte` được biểu diễn như kiểu dữ liệu của JVM nguyên thủy. Nếu tất cả kiểu dữ liệu cơ bản này được đánh dấu là `nullable`. Thì [JVM representation](https://kotlinlang.org/docs/reference/basic-types.html#representation) của chúng ta sẽ cho phép nó được `null`.
### Cách tiếp cận với Automatic setters
Layout XML mà tôi định viết sẽ có dạng như thế này :
```
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">
    <data>
        <variable
            name="viewModel"
            type="com.congnt.example.UserViewModel" />
    </data>
    <com.congnt.example.UserView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:firstName="@{viewModel.firstName}"
        android:lastName="@{viewModel.lastName}" />
</layout>
```
Chúng ta không viết một Binding Adapter duy nhất, nhưng trình biên dịch như nó sẽ sử dụng Automatic setters. Tuy nhiên, đó là một lỗ hổng, điều này có thể gây ra crash khi chạy. Nếu tạo 1  `Binding Adapter Evaluates ` trước khi tạo `UserViewModel` cho nó thì sẽ có 1 Exception NPE(Null Pointer Exception) được ném ra.
### Data Binding không coi trọng việc kiểm tra non-null với tham số tham chiếu
Đúng vậy, khi kết hợp với Kotlin, mọi thứ có thể trở nên tồi tệ. Cả 2 thuộc tính `firstName` và `lastName` của `UserView` đều là các kiểu tham chiếu không null. Có nghĩa là nếu `Binding Adapter` truyền dữ liệu `null`, thì việc crash sẽ sảy ra. Ở phần cuối cùng của [tài liệu Data Binding](https://developer.android.com/topic/libraries/data-binding/#listener_bindings) nó cũng đã nói rõ : 
> If the expression cannot be evaluated due to `null` objects, Data Binding returns the default Java value for that type. For example, `null` for reference types, `0` for `int`,` false` for `boolean`, etc.
> 
Bây giờ kết hợp với Java với [tài liệu Kotlin](https://kotlinlang.org/docs/reference/java-to-kotlin-interop.html#null-safety), trong đó nêu rõ:
> When calling Kotlin functions from Java, nobody prevents us from passing null as a non-null parameter. That’s why Kotlin generates runtime checks for all public functions that expect non-nulls. This way we get a `NullPointerException` in the Java code immediately.
> 
Thật không may, có thể là thông qua `automatic setters` hoặc `binding adapters` mà trình biên dịch `Data Binding` không kiểm tra tính `null` của tham số được truyền kiểu tham chiếu trong code của chúng ta. Điều này có nghĩa các setter cơ bản của JVM cho các thuộc tính Kotlin của chúng ta sẽ ném một NPE khi `Data Binding` được tạo ra và chuyển một giá trị rỗng cho chúng. Lý tưởng nhất nó sẽ phát hiện điều này và thất bại trong quá trình biên dịch.

Điều này có thể được giải quyết bằng cách thay đổi `UserView`, nhưng giả sử chúng ta không thể thay đổi nó ngay bây giờ. Có thể dễ dàng tạo ra các `Custom View` để làm cho việc sử dụng của chúng ta dễ dàng hơn với `Data Binding`, nhưng chúng ta thường thấy mình trong các tình huống mà chúng ta muốn sử dụng các `View`  từ SDK hoặc các lớp trực tiếp từ thư viện hỗ trợ mà không cần tạo ra `sub class`. Trong hầu hết các trường hợp, chúng ta nên cố gắng giữ cho bất kỳ dữ liệu nào liên quan đến `View`  và xử lý chúng bên trong các `Binding Adapter`.

### Làm thế nào để chúng ta giải quyết vấn đề `null` mà không cần phải động vào View
Sử dụng `Binding Adapter` với tham số nullable, Ví dụ :
``` Kotlin
@BindingAdapter("android:firstName")
fun UserView.bindFirstName(firstName: CharSequence?) {
    this.firstName = firstName ?: ""
}
@BindingAdapter("android:lastName")
fun UserView.bindLastName(lastName: CharSequence?) {
    this.lastName = lastName ?: ""
}
```
Ở đây chúng tôi chỉ đơn giản là bảo vệ chống lại null bằng cách giải thích null như một chuỗi rỗng, nó đơn giản như vậy!

Điều quan trọng là các tham số của `Binding Adapters` được viết bằng Kotlin là `nullable` khi các kiểu đó là các kiểu tham chiếu như `CharSequence`.
Các kiểu cơ bản trong Kotlin có thể an toàn là các tham số `non-null`  của `binding adapter`. Điều này là do chúng được biểu diễn dưới dạng nguyên thủy JVM không thể null, trong trường hợp đó `Binding Adapter` sẽ truyền qua các giá trị mặc định của các dữ liệu JVM nguyên thủy.  Điều đó nói rằng, bạn nên cẩn thận khi làm điều này vì các giá trị mặc định có thể là không như bạn mong muốn. Để tránh điều này, bạn có thể đơn giản làm cho kiểu tham số nullable sẽ dịch thành kiểu tham chiếu nguyên thủy tương đương. Điều này sẽ gây ra `Data Binding` để vượt qua `null` thay vì giá trị nguyên thủy mặc định tương đương. 
 Cuối cùng quay trở lại với ví dụ `Padding`. Đây là một trường hợp như vậy trong đó các thành phần nguyên gốc có thể bỏ được có thể được mong muốn trên các giá trị mặc định cho các kiểu nguyên thủy JVM.

Giả xử `View` trong XML Layout trông giống như sau
``` XML
<View
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingLeft="@{@dimen/padding_left}"
    android:paddingTop="@dimen/padding_top"
    android:paddingRight="@dimen/padding_right"
    android:paddingBottom="@dimen/padding_bottom" />
```
Chỉ `android: paddingLeft` sẽ được set thông qua `data binding` vì nó là thuộc tính padding được set dụng `binding expression`
```
"@{/*binding expression in curly braces*/}”
```
Những cái khác sẽ được đặt theo cách truyền thống. Tuy nhiên khi Binding Adapter được gọi, thì giá trị mặc định `0` sẽ được truyền vào các thuộc tính còn thiếu, xóa giá trị hiện tại của chúng.  Điều này có thể được cố định bằng cách làm cho các tham số rỗng được đóng gói nguyên gốc như:
``` Kotlin
@BindingAdapter(
        "android:paddingLeft",
        "android:paddingTop",
        "android:paddingRight",
        "android:paddingBottom", requireAll = false)
fun View.bindPadding(
        paddingLeft: Int?,
        paddingTop: Int?,
        paddingRight: Int?,
        paddingBottom: Int?
) {
    setPadding(
            paddingLeft ?: this.paddingLeft,
            paddingTop ?: this.paddingTop,
            paddingRight ?: this.paddingRight,
            paddingBottom ?: this.paddingBottom
    )
}
```
Bây giờ `null` sẽ được thông qua cho `paddingTop, paddingRight và paddingBottom` , nơi mà `Binding Adapter` sẽ bỏ qua chúng, do đó các giá trị hiện tại sẽ không bị xóa.

Bài viết được tham khảo tại [đây](https://android.jlelse.eu/binding-adapters-with-kotlin-part-1-78b957ad6b8b)