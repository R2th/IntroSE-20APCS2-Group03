# 1. Giới thiệu qua về Kotlin
- **Kotlin** hiện là ngôn ngữ chính thức trên Android. Nó mang tính **rõ ràng, ngắn gọn và mạnh mẽ**. Thứ tuyệt vời nhất là nó tương thích với mọi ngôn ngữ android và runtime.
- Được **Jetbrain** công bố vào tháng 07/2011 và phiên bản **Kotlin v1.0** được ra mắt vào ngày 15 tháng 02 năm 2016.
- Tại Google I/O 2017, Google đã tuyên bố first-class được hỗ trợ cho Kotlin trên Android và **Kotlin v1.2** được release vào ngày 28 tháng 11 năm 2017.
- Phiên bản mới nhất của **Kotlin** là [v1.2.41](https://kotlinlang.org/).
- Bạn đọc có thể tìm hiểu **Kotlin** qua website chính thức của [Kotlin](https://kotlinlang.org/) và có thể thử trực tiếp các tutorial của Kotlin ngay trên trang chủ.

# 2. Kotlin Android Extensions (KAE)
* Là một phần mở rộng của Kotlin, có vẻ như là một thư viện nhắm đến mọi tiện ích mà Kotlin mang lại - **Less code**.
* Kotlin Android Extensions giúp code **ngắn gọn và tường minh**, giúp bạn và đồng nghiệp có thể đọc hiểu code nhanh chóng.
* KAE cho phép bạn truy cập đến view trong layout XML, như thể là các thuộc tính với id được định nghĩa trong layout.
* Bài viết sau đây sẽ giúp bạn có góc nhìn cơ bản về KAE và một số hữu ích mà KAE mang lại.

# 3. Tích hợp Kotlin Android Extensions vào project
-  Tích hợp vào trong android module, build.gralde như sau
```
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'
```

# 4. Lấy trực tiếp view từ XML
- Giả sử bạn có một view XML như sau
```
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
 
    <TextView
        android:id="@+id/textFramgia"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:text="Hello World!"/>
 
</FrameLayout>
```
- Như bạn thấy view `TextView` có chứa id là `textFramgia`. Bạn chỉ cần tới class `MainActivity` và viết như sau:
```
import kotlinx.android.synthetic.main.activity_main.*
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)
 
    textFramgia.text = "Hello Kotlin! I'm Framgia's staff."
}
```
- Quá ngắn gọn và dễ dàng phải ko :D thay vì phải tạo variable, rồi findViewById quá dài dòng và mất thời gian.
- Nó sử dụng cơ chế tìm view trong cache, nếu trong cache không tồn tại nó sẽ tìm và add vào trong cache
- Nhìn lại vào dòng code sau
```
textFramgia.text = "Hello Kotlin! I'm Framgia's staff."
```
- Nó được convert như sau:
```
((TextView)this._$_findCachedViewById(id.textFramgia)).setText((CharSequence)"Hello Kotlin! I'm Framgia's staff.");
```
- Các thuộc tính không có thực, plugin không tạo thuộc tính cho mỗi lượt xem. Nó sẽ chỉ thay thế code trong quá trình biên dịch để truy cập bộ nhớ view cache, đưa nó vào đúng loại và gọi phương thức.
# 5. Kotlin Android Extensions trên Fragments
- Có một vấn đề với fragment là **view có thể tái tạo nhưng fragment instance sẽ luôn được tồn tại**. Vậy chuyện gì sẽ xảy ra? Nó có nghĩa là view tồn tại trong cache sẽ không còn giá trị.
- Hãy nhìn đoạn code dưới đây, Tôi sẽ tạo một fragment đơn giản sử dụng XML phía trên tôi đã viết
```
class Fragment : Fragment() {
 
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment, container, false)
    }
 
    override fun onViewCreated(view: View?, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        textFramgia.text = "Hello Kotlin!"
    }
}
```
- Trong hàm `onViewCreated` tôi thay đổi textView tương tự như ở activity. Nhưng để xử lý vấn để của Fragment phía trên, ta phải thêm đoạn code sau vào hàm `onDestroyView()`
```
public void onDestroyView() {
   super.onDestroyView();
   this._$_clearFindViewByIdCache();
}
```
# 6. Gọi view từ một view khác
- Bạn có thể gọi subview trực tiếp từ một view khác như sau
```
val itemView = itemViewCard //Là một view cha chứa nhiều các subview
itemView.itemImage.setImageResource(R.mipmap.ic_launcher)
itemView.itemTitle.text = "My Text"
```
# Tổng kết
- Bạn có thể thấy thật dễ dàng khi làm việc với các view của Android trong Kotlin. Với một plugin đơn giản, chúng ta có thể rút gọn đi số lượng code trong project. 

https://kotlinlang.org/docs/tutorials/android-plugin.html

https://antonioleiva.com/kotlin-android-extensions/