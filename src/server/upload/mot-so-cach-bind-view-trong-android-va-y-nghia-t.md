Để thực hiện bind view trong android chúng ta có một số cách như sau:
- `findViewById()` => cách này giờ gần như không còn được dùng nữa
- [Butter Knife](http://jakewharton.github.io/butterknife/) hay phiên bản [Kotter Knife](https://github.com/JakeWharton/kotterknife) cho Kotlin cũng không có quá nhiều người sử dụng

2 cách phổ biến hiện nay là sử dụng:
- Data binding lib
- Kotlin Android Extensions

Ở bài này mình sẽ không trình bày sâu về cách cài đặt, chi tiết cài đặt các bạn có thể xem tại link doc của từng loại.
Bài này mình sẽ trình bày góc nhìn về sự ngắn gọn, tiện lợi và tính an toàn của 2 cách.

### [Data Binding lib](https://developer.android.com/topic/libraries/data-binding/)

Nếu layout có include layout khác, khi cần gọi bind view cho child layout thì bạn sẽ cần phải gọi lần lượt từng lớp như sau
```kotlin
    val viewBinding = DataBindingUtils.setContentView(R.layout.activity_main)
    ...
    viewBinding.parentId.childId.doSomething()
```
Gọi như này hơi dài dòng một chút nhưng an toàn, có thể bạn sẽ thắc mắc mình nói an toàn nghĩa là gì thì các bạn hãy xem ý tiếp theo để hiểu.

### [Kotlin Android Extensions](https://kotlinlang.org/docs/tutorials/android-plugin.html#view-binding)

Nhóm extension của Kotlin để giúp việc dev Android trở nên dễ dàng hơn.
```kotlin
// Using R.layout.activity_main from the 'main' source set
import kotlinx.android.synthetic.main.activity_main.*

class MyActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        // Instead of findViewById<TextView>(R.id.textView)
        textView.setText("Hello, world!")
    }
}
```
 So với data binding lib thì dù cho layout của bạn có include child layout thì bạn vẫn có thể gọi trực tiếp các view của child layout mà ko cần qua parent như sau:
 
 activity_main.xml
 ```xml
<androidx.constraintlayout.widget.ConstraintLayout
    android:id="@+id/container"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <include
        android:id="@+id/layout_movie"
        layout="@layout/item_movie"/>

</androidx.constraintlayout.widget.ConstraintLayout>
 ```
 
 item_movie.xml
 ```xml
<androidx.constraintlayout.widget.ConstraintLayout
    android:layout_width="match_parent"
    android:layout_height="@dimen/dp_280">

    <androidx.appcompat.widget.AppCompatImageView
        android:id="@+id/image_detail"
        ...
    />
</androidx.constraintlayout.widget.ConstraintLayout>
```

MainActivity.kt
```kotlin
import kotlinx.android.synthetic.main.item_movie.*

    override fun onCreate(savedInstanceState: Bundle?) {
        image.detail.setImageDrawable()
    }
```

### Single exclamation mark trong Kotlin (T!)

Tuy nhiên các bạn cần lưu ý điểm sau, nếu bạn gọi đến view id thuộc một màn khác mà **không**  có trong màn hiện tại. Bạn vẫn gọi được và Android Studio cũng không hề báo lỗi, nhưng trong quá trình runtime thì sẽ gây **crassh vì null pointer exception do không tìn thấy view**.

![](https://images.viblo.asia/a9554b39-9596-4c78-b612-8c25c3f76f86.png)

Thực tế khi gọi đến một view id bằng kotlin android extension thì bạn sẽ nhận được type là `T!` như trong ảnh. `T!` được gọi là [platform type](https://kotlinlang.org/docs/reference/java-interop.html#notation-for-platform-types) 

`T! = T or T?`

![](https://images.viblo.asia/ce1bf99a-abdf-481c-97c4-10d47e79fe2f.png)


Hiện tại Android Studio chỉ cảnh báo khi chúng ta gọi trực tiếp `T?` mà không cảnh bảo `T!`, vì thế để cho code an toàn nhất thì hãy dùng cách gọi **null-safety** (`T?.do()`) với cả `T!` nhé.
 
 XIn chào và hẹn gặp lại các bạn :D.