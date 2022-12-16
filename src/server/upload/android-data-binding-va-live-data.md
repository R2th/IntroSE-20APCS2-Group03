Chào các bạn, hôm nay mình xin phép được nói tiếp câu chuyện về  [Android Data Binding](https://developer.android.com/topic/libraries/data-binding/), sau khi đã biết cách sửa để data binding có thể chạy với Kotlin ở bài [Android Data Binding với Kotlin](https://viblo.asia/p/android-data-binding-voi-kotlin-Ljy5VoqoKra) thì nếu bạn nào hay mò mẫm tìm hiểu sẽ có ý định thay thế `ObservableField` của data binding bằng `MutableLiveData` trong `Live Data` của `Android Architecture Component` như ví dụ mình làm sau đây:

Trong ví dụ mình có demo binding 1 chiều và 2 chiều
- binding 1 chiều là khi nhấn button thì sẽ lấy time hiện tại set cho biến `time` là `MutableLiveData` và mong muốn sẽ hiển thị lên text view thứ nhất

- binding 2 chiều là khi nội dung edit text thay đổi thì text view thứ hai cũng sẽ tự động hiển thị theo nội dung mới.

`NewTaskActivity.kt`
```kotlin
package com.quanda.ui

import android.arch.lifecycle.MutableLiveData
import android.databinding.DataBindingUtil
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import com.quanda.R
import com.quanda.databinding.ActivityNewTaskBinding
import java.util.*

class NewTaskActivity : AppCompatActivity() {

    lateinit var binding: ActivityNewTaskBinding
    var time = MutableLiveData<String>()
    var content = MutableLiveData<String>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_new_task)
        binding.apply {
            view = this@NewTaskActivity
            buttonShowTime.setOnClickListener {
                time.value = Date().toString()
            }
        }
    }

}
```


`activity_new_task.xml`
```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android">
    <data>
        <variable
            name="view"
            type="com.quanda.ui.NewTaskActivity"
            />
    </data>
    <android.support.v7.widget.LinearLayoutCompat
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical"
        android:padding="16dp"
        >

        <android.support.v7.widget.AppCompatTextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:hint="Current time"
            android:text="@{ view.time }"
            />

        <android.support.v7.widget.AppCompatButton
            android:id="@+id/button_show_time"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            android:text="show current time"
            />

        <View
            android:layout_width="match_parent"
            android:layout_height="1dp"
            android:layout_marginTop="16dp"
            android:background="@android:color/black"
            />

        <android.support.v7.widget.AppCompatEditText
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            android:hint="input text"
            android:text="@={ view.content }"
            />

        <android.support.v7.widget.AppCompatTextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="16dp"
            android:hint="Inputted content"
            android:text="@{ view.content }"
            />

    </android.support.v7.widget.LinearLayoutCompat>
</layout>
```

Tuy nhiên `data binding` ở đây **không hề chạy** như mình muốn. Thử tìm kiếm nguyên nhân một số nơi và mình đã có câu trả lời như sau, bạn cần thêm đoạn code này để config cho data binding:


```kotlin
    binding.setLifecycleOwner(this@NewTaskActivity)
```

Và đoạn code đầy đủ sẽ như sau

```kotlin
    binding.apply {
            setLifecycleOwner(this@NewTaskActivity)
            view = this@NewTaskActivity
            buttonShowTime.setOnClickListener {
                time.value = Date().toString()
            }
        }
```

Như vậy là xong, data binding hoạt động với live data như một phép màu.

Bài của mình đến đây là hết, hẹn gặp lại các bạn trong các bài tiếp theo :D.