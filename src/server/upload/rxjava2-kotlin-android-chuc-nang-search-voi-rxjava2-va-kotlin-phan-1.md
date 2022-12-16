# Mở đầu
Giả sử chúng ta phải giải quyết tìm kiếm trong một ứng dụng Android.
Chúng ta chỉ cần một EditText và dữ liệu truy vấn dựa trên đầu vào, phải không? 
Nghe có vẻ dễ dàng - chúng ta hãy xem chúng ta sẽ thực hiện như thế nào với Kotlin và Reactive Extensions!

# Cơ bản 
Trước khi chúng ta nhảy vào code chúng ta cần thêm các Dependencies cần thiết,
Ngoài ta chúng ta cần tạo một layout đơn giản bao gồm một EditText và đăng kí observable ở sự kiện textChanges 

**build.gradle(module.app)**

```
// RxJava2
compile "io.reactivex.rxjava2:rxjava:2.1.2"
compile "io.reactivex.rxjava2:rxandroid:2.0.1"
// RxBindig
compile "com.jakewharton.rxbinding2:rxbinding:2.0.0"
compile "com.jakewharton.rxbinding2:rxbinding-kotlin:2.0.0"

```

**activity_layout.xml**

```
android.support.v7.widget.AppCompatEditText
  android:id="@+id/mainSearchText"
  android:layout_width="match_parent"
  android:layout_height="match_parent"/>
```

**onCreate subscription**


```
RxTextView.textChanges(mainSearchText)
  .subscribe(
    { Log.d("MainActivity", "$it") },
    { Log.e("MainActivity", "$it") }
```


****

Tại sao chúng ta sử dụng lớp tiện ích RxTextView để quan sát các sự kiện thay đổi văn bản ? 
Chúng ta có thể áp dụng một số phép thuật Kotlin để nó trở nên dễ dàng hơn không ?
Có lẽ Jake Wharton đã hỏi câu hỏi câu hỏi khi ông tạo ra module RxBinding Kotlin.
Nó bổ sung thêm các extension functions cho view type.

```
MainSearchText  
  .textChanges()
  .subscribe({
    Log.d("MainActivity", it.toString())
  }, { 
    Log.e("MainActivity", it.toString())
  })
```

Chúng ta có thể thấy đoạn code trên rất đơn giản và dẽ hiểu nhờ vào các tính năng ngôn ngữ Kotlin và cú pháp lambda. 


# Triển Khai

1. Đầu tiên chúng ta cần update lại giao diện một chút 


**Extended EditText**
```
<android.support.v7.widget.AppCompatEditText  
  android:id="@+id/mainSearchText"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:layout_marginEnd="16dp"
  android:background="@android:color/transparent"
  android:drawableEnd="@drawable/main_close_white_24dp"
  android:drawableStart="@drawable/main_search_white_24dp"
  android:hint="@string/main_search_hint"
  android:imeOptions="actionSearch"
  android:inputType="text"
  android:lines="1"
  android:maxLines="1"/>

```

**Content body**
```
<FrameLayout  
  android:layout_width="match_parent"
  android:layout_height="match_parent">

  <TextView
    android:id="@+id/mainContent"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_gravity="center"
    android:gravity="center"
    android:textColor="@color/colorAccent"
    android:textSize="24sp"
    android:textStyle="bold"/>

  <ProgressBar
    android:id="@+id/mainProgressbar"
    android:layout_width="96dp"
    android:layout_height="96dp"
    android:layout_gravity="center"
    android:indeterminate="true"
    android:visibility="gone"/>
</FrameLayout>
```

Ngoài ra, chúng ta cần viết thêm một extension function để xử lý sự kiện onTouch cho drawable ở bên phải, để xoá input nhập vào khi click vào drawable.


**Extension function for EditText**

```
fun AppCompatEditText.setRightDrawableOnTouchListener(func: AppCompatEditText.() -> Unit) {
  setOnTouchListener { _, event ->
    var consumed = false
    if (event.action == MotionEvent.ACTION_UP) {
      val drawable = compoundDrawables[2]
      if (event.rawX >= (right - drawable.bounds.width())) {
        func()
        consumed = true
      }
    }
    consumed
  }
}
```

**Clear text**
```
mainSearchText.setRightDrawableOnTouchListener {  
  text.clear()
}
```

# More ??
+ Ở Part 1 này mình đã giới thiệu về ý tưởng và xây dựng các thành phần cơ bản để thực hiện chức năng Search 
+ ở Part2 Sắp tới mình sẽ đi vào chi tiết code thực hiện chức năng này và sẽ có Source code git cho các bạn tham khảo

 *Thanks for reading*