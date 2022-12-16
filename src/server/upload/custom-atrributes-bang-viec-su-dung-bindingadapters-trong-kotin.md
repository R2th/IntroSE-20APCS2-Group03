Bằng việc sử dụng Framework Android Data Binding, Nó dễ dàng custom attributes mà có thể sử dụng nó trong layout. Nó là một phương thức với tham số chính xác được chú thích bới  @BindingAdapter. Cho ví dụ phổ biến nhất đó là download ảnh từ URL bằng Glide hoặc Picasso

```
@BindingAdapter("bind:imageUrl")
public static void setImageUrl(ImageView view, String url) {
   Glide.with(view.getContext()).load(url).into(view);
}
```

Trong layout thuộc tính imageUrl có thể được sử dụng namespace : app

```
<ImageView
    android:id="@+id/avatar"
    android:layout_width="@dimen/photo_size"
    android:layout_height="@dimen/photo_size"
    android:scaleType="centerCrop"
    app:imageUrl="@{user.avatarUrl}"/>
```
    
Ví dụ này được viết bằng Java , phương thức phải được để ở dạng static. Còn về Kotlin thì sao ? Từ khóa static không còn tồn tại nhưng ngôn ngữ này ít nghiêm ngặt hơn Java về việc định nghĩ phương thức: 1 phương thức có thể được định nghĩ bên ngoài một lớp

Phương thức Java có thể được chuyển thành Kotlin như sau :

```
@BindingAdapter("imageUrl")
fun setImageUrl(imageView: ImageView, url: String?) {
    Glide.with(imageView.context).load(url).into(imageView)
}
```


Việc sử dụng trong layout thì tương tự, chúng ta vẫn có thể khai báo app:imageUrl với cú pháp tương tự
Thuật toán này có thể sử dụng như một lớp Kotlin thông thường mà không sử dụng data binding  framework , nó có thể được gọi bằng cách truyền ImageView and String như là đối số :
setImageUrl (myImageView, "myUrl")

### **Chức năng mở rộng**

Trong Kotlin chúng ta có thể đơn giản hóa dòng code bằng cách khai báo phương thức như là chức năng mở rộng trên lớp ImageView. Chúng ta cùng cấu trúc lại như sau :

```
@BindingAdapter("imageUrl")
fun ImageView.setImageUrl(url: String?) {
    Glide.with(context).load(url).into(this)
}
```

Nó có vẻ lạ  nhưng nó vẫn là phương thức @BindingAdapter, chúng ta vẫn có thể sử dụng imageUrl trong layout. Lý do đơn giản đó là : có 3 phiên bản của thuật toán này (Java static, Kotlin với đối số và phần mở rộng như đã nêu ở trên) được chuyển thành 1 bytecode tương tự như nhau. 

Lợi thế của phần mở rộng này đó là bây giờ chúng ta có thể sử dụng nó 1 cách chính xác trên đối tượng Imageview :


`ImageView.setImageUrl("myUrl")`


Tính chất
Đầu tiên 2 BindingAdapter tôi luôn luôn khai báo trong android 2 kiểu như sau:

```
@BindingAdapter("visibleOrGone")
fun View.setVisibleOrGone(show: Boolean) {
    visibility = if (show) VISIBLE else GONE
}

@BindingAdapter("visible")
fun View.setVisible(show: Boolean) {
    visibility = if (show) VISIBLE else INVISIBLE
}
```

Sử dụng 2 Adapter ẩn hiện của 1 view có thể được sử dụng Boolean thay vì sử dụng Int với 3 trạng thái VISIBLE, INVISIBLE và GONE . Trong layout thuộc tính có thẻ khai báo như thường lệ trong các trường hợp thông thường bằng cách sử dụng namespace **app**

app:visibleOrGone="@{state.myBoolean}"

Trong Code Kotlin chúng ta có thể sử dụng những thuật toán đó để điều chỉnh ẩn hiện của 1 view . Một phương thức mở rộng khác trả về Boolean với khả năng hiển thị cũng có thể hữu ích , Nó có thể được viết với 1 dòng code đơn giản như sau :

`fun View.isVisible() = visibility == VISIBLE`

Hiện tại chúng ta đang sử đụng kotlin vì thế chúng ta không cần viết getters và setters , Chúng ta có thể sử dụng các thuộc tính ! vậy chúng ta có thể định nghĩ một thuộc tính mở rộng trong một lớp View và sử dụng Setter như là BinhdingAdapter có được không ? Tất nhiên là được, nó có thể sử dụng với tiền tố **set** trước **BindingAdapter** như sau :

```
@set:BindingAdapter("visibleOrGone")
var View.visibleOrGone
    get() = visibility == VISIBLE
    set(value) {
        visibility = if (value) VISIBLE else GONE
    }

@set:BindingAdapter("visible")
var View.visible
    get() = visibility == VISIBLE
    set(value) {
        visibility = if (value) VISIBLE else INVISIBLE
    }
```

Vẫn như thường lệ trong layout không có gì thay đổi, chúng ta vẫn có thể sử dụng app:visibleOrGone và app:visible. Nhưng bây giờ chúng ta có thể dễ dàng sử dụng trong Koltin để nhận và thay đổi sự hiển thị như sau :

```
if (!myView.visibleOrGone) {
    myOtherView.visible = true
}
```

### Tóm lại

Biểu thức điều chỉnh trong data binding rất hữu ích và sử dụng layout một cách dễ dành và để tránh những  biểu thức phức tạp. Sử dụng Kotlin họ có thể khai báo nhiều cách, bạn có thể chọn cách tốt nhất dự trên mức sử dụng mà bạn muốn đặt được. 

Cám ơn các bạn đã đọc bài viết của mình.

Tham khảo : https://proandroiddev.com/custom-attributes-using-bindingadapters-in-kotlin-971ef8fcc259