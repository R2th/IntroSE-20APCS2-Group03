# I. Giới thiệu qua về Android P
-----
- Android P được ra mắt bởi Google vào ngày 07 tháng 03 năm 2018, bản preview đầu tiên được release vào cùng ngày và bản final beta cuối cùng được released vào ngày 25 tháng 07 năm 2018
- Có một số tính năng mới như giao diện mới cho quick setting menu, đồng hồ được chuyển sang bên trái của notification bar vv.v..
- Mình sẽ không đề cập chi tiết về Android P, trong bài viết này sẽ đi sâu hơn vào tính năng mới của TextView trên Android P.
# II. Văn bản và Textview trên Android P
-----
### 1. **PrecomputedText** (Tình toán trước thành thần Text)
- Việc hiển thị text trên **TextView** khá là phức tạp, bao gồm các **tính năng** như **multiple font, khoảng cách giữa các dòng, các chữ với nhau, hướng text hiển thị, line breaking, các gách nối** v.vv.. **TextView** phải làm quá nhiều việc để tính toán và bố trí các Text được nhận như: **đọc file font, tìm các ký tự hình tượng, chia các shape cho text, tính toán phần bounding và caching các text vào bộ đệm**. Hơn nữa, tất cả các công việc trên đều hoạt động trên **UI Thread**, và nó có khả năng làm giảm hiệu năng của ứng dụng.
- Các tác vụ tính toán có thể chiếm **90% thời gian** yêu cầu để set text. Để giải quyết vấn đề này, trong **Android P** có giới thiệu dến [JetPack](http://d.android.com/jetpack) và API mới [PrecomputedText](https://developer.android.com/reference/android/text/PrecomputedText) như là giải pháp thay thế cho [PrecomputedTextCompat](https://developer.android.com/reference/androidx/core/text/PrecomputedTextCompat) từ API 14.
- **PreccomputedText** cho phép ứng dụng thực hiện các tác vụ chiếm nhiều thời gian của bố cục text cho trước cũng như tác vụ chạy trên background thread, caching layout và trả về dữ liệu được đo lường. Kết quả của PrecomputedText có thể set trực tiếp cho **TextView**. Như hình dưới đây, chỉ có **10%** công việc còn lại để hoàn thành cho **TextView** sẽ chạy trên **UI Thread**, các tác vụ tính toán chiếm **90%** công việc sẽ chạy trên **background thread**.
![](https://images.viblo.asia/58d34a38-01b3-4f6d-810c-c3d4a769ba76.png)
```
// UI thread
val params: PrecomputedText.Params = textView.getTextMetricsParams()
val ref = WeakReference(textView)
executor.execute {
    // background thread
    val text = PrecomputedText.create("Hello", params)
    val textView = ref.get()
    textView?.post {
        // UI thread
        val textViewRef = ref.get()
        textViewRef?.text = text
    }
}
```

### 2. **Magnifier** (Kính lúp)
- Tính năng này khá quen thuộc với các bạn dùng iPhone đúng ko :D. Vâng tới bây giờ thì nó mới xuất hiện trên Android P.
- Ngay cả với tính năng **Smart Text Selection** sẵn có, việc chọn văn bản chính xác theo ý người dùng vẫn có thể là một thử thách. Android P ra mắt **Magnifier** để gia tăng và cải thiện trải nghiệm của người dùng khi chọn các vùng văn bản. Chiếc kính lúp này giúp người dùng chọn vùng văn bản chính xác hơn bởi cách hiển thị nó trên các dòng văn bản.

![](https://images.viblo.asia/422b9329-004d-4baf-a020-e857e0223247.gif)

- **[Magnifier](https://developer.android.com/reference/android/widget/Magnifier)** có 3 phương thức chính là show, update và dismiss. Ví dụ như 

```
fun onTouchEvent(event: MotionEvent): Boolean {
    when (event.actionMasked) {
        MotionEvent.ACTION_DOWN -> 
              magnifier.show(event.x, event.y)
        MotionEvent.ACTION_MOVE -> 
             magnifier.show(event.x, event.y)
        MotionEvent.ACTION_UP -> 
             magnifier.dismiss()
    }
}
```

### 3. **Smart Linkify** (Liên kết thông minh)
- Class [Linkify](https://developer.android.com/reference/android/text/util/Linkify) đã có từ API 1, cho phép thêm link tới văn bản sử dụng regexes.
- Trên Android P ra mắt API [TextClassifier](https://developer.android.com/reference/android/view/textclassifier/TextClassifier) sẽ tự động nhận diện casci URL, số điện thoại, các contact vv..v..

![](https://2.bp.blogspot.com/-xIh0fHVyBNc/Wy1ZtbNOwPI/AAAAAAAAFik/swyBI1GB6Eg-CLvsQW_zNUSDx1Y7ReNKQCLcBGAs/s1600/smart_linkifyimage3.gif)

- Để tăng hiệu năng cho app, generating và applying links trên background thread
```
// UI thread
val text: Spannable = ...
val request = TextLinks.Request.Builder(text)
val ref = WeakReference(textView)
executor.execute {
    // background thread
    TextClassifier.generateLinks(request).apply(text)
    val textView = ref.get()
    textView?.post {
        // UI thread
        val textViewRef = ref.get()
        textViewRef?.text = text
    }
}
```

### 4. **Line Height**

- Trước khi Android P ra mắt, khoảng cách giữa các line được kiểm soát khi sử dụng 2 thuộc tính  ```lineSpacingExtra``` và ```lineSpacingMultiplier```. Từ Android P có thêm thuộc tính [lineHeight](https://developer.android.com/reference/android/widget/TextView.html#attr_android:lineHeight) để set chiều cao của các dòng văn bản (khoảng cách từ top đến bottom của dòng văn bản) sẽ gần như thay thế 2 thuộc tính trên.

![](https://4.bp.blogspot.com/-1W5Dj67c5d0/Wy1Z_Dq5kdI/AAAAAAAAFio/Rwbhao7fkqkF8ZYYQVO8Ato2dPQ0yeCVACLcBGAs/s1600/pasted%2Bimage%2B0%2B%25287%2529image4.png)

```
<TextView
    android:layout_height="wrap_content"
    android:layout_width="match_parent"
    android:text="Lorem ipsum dolor sit amet"
    app:lineHeight="50sp"/>

// Set trong code
TextView.setLineHeight(@Px int)
```

### 5. **Baseline text alignment**
- Để control được khoảng cách của baseline, sẽ có 2 thuộc tính mới từ Android P là [firstBaselineToTopHeight](https://developer.android.com/reference/android/widget/TextView.html#attr_android:firstBaselineToTopHeight) và [lastBaselineToBottomHeight](https://developer.android.com/reference/android/widget/TextView.html#attr_android:lastBaselineToBottomHeight).
- **firstBaselineToTopHeight**: Đặt khoảng cách giữa phần bao trên cùng của TextView và baseline của dòng đầu tiên của TextView. Thuộc tính này sẽ updates top padding.
- **lastBaselineToTopHeight**: Đặt khoảng cách giữa phần bao dưới cùng của TextView và baseline của dòng cuối cùng của TextView. Thuộc tính này sẽ updates bottom padding.

![](https://1.bp.blogspot.com/-0pHD0qrf758/Wy1aFmOQpRI/AAAAAAAAFis/7UNA8XZv7gQs5rPpa43QEwJ_eMr-IyLsQCLcBGAs/s1600/baseline%2Bspecimage5.png)

```
<TextView
    android:layout_height="wrap_content"
    android:layout_width="match_parent"
    android:text="Lorem ipsum dolor sit amet"
    app:firstBaselineToTopHeight="28sp"
    app:lastBaselineToBottomHeight="20sp"/>

// or in code
TextView.setFirstBaselineToTopHeight(@Px int)
TextView.setLastBaselineToBottomHeight(@Px int)
```

# III. Tổng kết
- Như đã kể một số tính năng cũng như các thành phần mới của văn bản và TextView giúp chúng ta cập nhật thêm từ phiên bản Android P
- Hy vọng bài viết này giúp các bạn có thêm kiến thức cũng như update thêm về công nghệ


# Thanks for reading. Happy Reading & Coding :D
- Tham khảo:
- https://android-developers.googleblog.com/
- https://twitter.com/FMuntenescu
- https://twitter.com/siyamed
- https://android-developers.googleblog.com/2018/07/whats-new-for-text-in-android-p.html
- d.android.com