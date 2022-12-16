Theo như [tài liệu đến từ Android](https://developer.android.com/topic/libraries/architecture) thì: 
> “Android architecture components are a collection of libraries that help you to build robust, testable, and maintainable apps.”
> 
Trong android architecture components có nhiều thành phần khác bao gồm các class dùng cho việc quản lý vòng đời của các UI component cho đến việc xử lý các data persistence. 
> “managing your UI component lifecycle and handling data persistence”
> 
Trong bài viết này mình sẽ giới thiệu với các bạn về `ViewModel` và làm thế nào sử dụng nó. 

##  Giới thiệu chung 
`ViewModel` là một class có trách nhiệm chuẩn bị và quản lý dữ liệu cho một UI component (có thể là Activity hoặc Fragment). Nó cũng cung cấp cách để dễ dàng giao tiếp giữa activity và fragment hoặc giữa các fragment với nhau.

`ViewModel` luôn được tạo trong cùng một phạm vi (một fragment hoặc một activity) và sẽ được giữ lại cho đến khi phạm vi đó còn "sống". Hay nói cách khác là `ViewModel` sẽ không bị destroyed khi activity hoặc fragment của nó bị destroyed bởi một configuration change (ví dụ như việc xoay màn hình). Instance mới của các owner này sẽ chỉ kết nối lại với `ViewModel` hiện có của nó. 

![](https://developer.android.com/images/topic/libraries/architecture/viewmodel-lifecycle.png)

*Vòng đời của `ViewModel` (Tham khảo: https://developer.android.com/topic/libraries/architecture/viewmodel)*

Mục đích chính của `ViewModel` đó là lấy và giữ thông tin cần thiết cho activity và fragment. Bên cạnh đó, activity và fragment có thể quan sát được sự  thay đổi trong `ViewModel` thông qua việc sử dụng [`LiveData` ](https://developer.android.com/topic/libraries/architecture/livedata) hoặc [`DataBinding`](https://developer.android.com/topic/libraries/data-binding/).

![](https://miro.medium.com/max/412/1*mkRQf65m6l0Jw5-l9GZT6w.png)

`ViewModel` chỉ có trách nhiệm quản lý data cho UI cho nên nó không bao giờ truy cập vào view hierarchy hoặc giữ tham chiếu đến activity hoặc fragment. 

Chúng ta sẽ bắt đầu với việc tìm hiểu về lợi ích của việc sử dụng `ViewModel`

### Lợi ích
1. `ViewModel` tồn tại khi quay màn hình hoặc các configuration change khác.
2. `ViewModel` vẫn running trong khi activity đang trong back stack.
3. `ViewModel` là lifecycle-aware.
4. `ViewModel` với sự hỗ trợ của `LiveData` có thể phản ứng lại sự thay đổi của UI. Mỗi khi data thay đổi, UI sẽ được cập nhật dựa trên sự quan sát `LiveData` với data hiện tại trong `ViewModel`.
5. `ViewModel` dễ dàng hiểu và dễ testing.

Trong bài viết này, mình sẽ giới thiệu với các bạn 3 khía cạnh quan trọng của `ViewModel`.

1. Tạo và sử dụng cơ bản `ViewModel`.
2.  Tạo và sử dụng `ViewModel` với tham số bằng việc dùng `ViewmodelProvide.Factory`.
3. Shared ViewModel để giao tiếp giữa activity và fragment.

## Simple `ViewModel`
Có 4 bước chính để tạo và dùng `ViewModel`:
1. Thêm các dependencies vào app-level `build.gradle`.
2. Tách data với activity bằng cách tạo một class kế thừa `ViewModel`.
3. Tạo `ViewModel` instance trong activity.
4. Thiết lập giao tiếp giữa `ViewModel` và `View`.

### Thêm các dependencies
Để dùng được `ViewModel` chúng ta phải thêm các dependencies vào `app/build.gradle`
```kotlin
implementation "android.arch.lifecycle:extensions:1.0.0"
annotationProcessor "android.arch.lifecycle:compiler:1.0.0"
```

Hoặc nếu bạn đang dùng Kotlin vs AndroidX thì thêm:
```kotlin 
implementation 'androidx.lifecycle:lifecycle-viewmodel-ktx:2.2.0'
```

### Tạo `ViewModel` class
Để tạo `SampleViewModel` cho Activity mà không cần bất kì data nào, thì chúng ta chỉ cần kế thừa từ `ViewModel`.
```Kotlin
package com.example.viewmodel

import androidx.lifecycle.ViewModel

class SampleViewModel :ViewModel() {

    override fun onCleared() {
        super.onCleared()
        // Dispose All your Subscriptions to avoid memory leaks
    }
}
```

`onCleared()`: Sẽ được gọi khi `ViewModel` không còn được dùng và sẽ bị destroyed. Nó hữu ích khi `ViewModel` observe một vài data, và bạn cần clear chúng để tránh việc leak của `ViewModel`.

### Tạo `ViewModel` instance trong activity
Để tạo `ViewModel` trong actitvity chúng ta sẽ dùng `ViewModelProvider`. Chúng ta cần truyền `Context` và tên class của `ViewModel` vào `ViewModelProvider` để lấy instance của nó.

```Kotlin 
package com.example.viewmodel

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.lifecycle.ViewModelProvider

class MainActivity : AppCompatActivity() {

   lateinit var viewModel : SampleViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        viewModel =  ViewModelProvider(this).get(SampleViewModel::class.java)
       
    }
}
```

`ViewModelProvider` là một tiện ích để lấy instance của `ViewModel` trong `ViewModelStore`. Nó sẽ trả về instance của `ViewModel` nếu tồn tại còn không thì nó sẽ tạo một cái mới. `ViewModelStore` sẽ lưu trữ `ViewModel` bằng việc dùng `HashMap`.

### Thiết lập giao tiếp giữa `ViewModel` và `View`
Bây giờ chúng ta sẽ bắt đầu với việc làm thế nào để lấy giá trị từ `ViewModel` và đưa chúng vào `View`.
Đầu tiên, chúng ta sẽ tạo một `LiveData` trong `ViewModel`, và khi click vào button chúng ta sẽ cập nhật giá trị của nó và show toast message. 
```Kotlin 
package com.example.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class SampleViewModel : ViewModel() {

    private val _badgeCount = MutableLiveData<Int>()
    var number = 0

    val badgeCount: LiveData<Int>
        get() = _badgeCount
    
    fun incrementBadgeCount() {
        _badgeCount.postValue(++number)
    }

    override fun onCleared() {
        super.onCleared()
        // Dispose All your Subscriptions to avoid memory leaks
    }

}
```

Giờ chúng ta sẽ bắt đầu UI code tron Activity.
```Kotlin 
package com.example.viewmodel

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    lateinit var viewModel: SampleViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        viewModel = ViewModelProvider(this).get(SampleViewModel::class.java)
        observeViewModel()
        initListeners()
    }

    private fun initListeners() {
        btn_badge?.setOnClickListener {
            viewModel.incrementBadgeCount()
        }
    }

    private fun observeViewModel() {

        viewModel.badgeCount.observe(this, Observer {
            showToast(it)
        })

    }

    private fun showToast(value: Int) {
        Toast.makeText(this, value.toString(), Toast.LENGTH_LONG).show()
    }

}
```

Mỗi khi data thay đổi trên `badgeCount` qua `LiveData`, chúng ta sẽ nhận callback thông qua `Observer` đã đăng kí, cho nên UI của chúng ta luôn được update và nhận giá trị mới nhất.

Chúng ta đã hoàn thành việc tạo `ViewModel` và giao tiếp nó với activity. Sau đây chúng ta sẽ tiếp tục với `ViewModelProvider.Factory`.

## `ViewModelProvider.Factory`
Như trên thì `ViewModel` của chúng ta không nhận bất kì tham số nào, điều đó dễ dàng đễ thực hiện. Tuy nhiên, nếu chúng ta cần truyền một tham số cho `ViewModel` thì sao? 
```Kotlin
class SampleViewModel(name: String) : ViewModel() {

    override fun onCleared() {
        super.onCleared()
        // Dispose All your Subscriptions to avoid memory leaks
    }
}
```
Nếu ta làm như trên thì kết quả sẽ là compile-time error.
```java
java.lang.RuntimeException: Cannot create an instance of class com.example.viewmodel.SampleViewModel.
```

cho nên chúng ta sẽ cần `ViewModelFactory` để làm điều này.

`ViewModelProvider()` tạo một `ViewModelProvider.Factory` mặc định, với `ViewModelProvider.Factory` này chúng ta sẽ không thể tạo `ViewModel` với tham số.  Vì vậy, khi chúng ta thêm tham số vào  constructor của `ViewModel`, thì việc thực hiện `ViewModelProvider.Factory` sẽ bị lỗi vì nó sẽ gọi primary constructor cho việc tạo instance của `ViewModel`.

`ViewModelProvider.Factory` là việc thực hiện của factory interface, chiụ trách nhiệm khởi tạo `ViewModel`. Chúng ta cần implement lại factory để có thể tạo `ViewModel` với tham số. 

Để làm điều này, chúng ta sẽ kết thừa từ `ViewModelProvider.Factory` và override phương thức `create()` cái sẽ tạo instance của `ViewModel`.

```Kotlin 
package com.example.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider

class SampleViewModelFactory (val arg: String): ViewModelProvider.Factory {

    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        return   modelClass.getConstructor(String::class.java).newInstance(arg)
    }
}
```

`modelClass.getConstructor(String::class.java)` sẽ get một constructor với kiểu `String` và tạo một instance của `ViewModel` bằng việc gọi phương thức `newInstance()` và truyền giá trị constructor vào phương thức này.

Bây giờ chúng ta sẽ thực hiện nó trong activity

```Kotlin 
class MainActivity : AppCompatActivity() {

    lateinit var viewModel: SampleViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val factory = SampleViewModelFactory("sample")
        viewModel = ViewModelProvider(this,factory).get(SampleViewModel::class.java)
    }
}
```

Nếu `ViewModel` của bạn có một phụ thuộc hoặc tham số và bạn muốn tạo instance của nó thì bạn cần tạo custom của `ViewModelProvider.Factory` để truyền phụ thuộc hoặc tham số đó vào.
```kotlin
val factory = SampleViewModelFactory("sample")
ViewModelProvider(this,factory).get(SampleViewModel::class.java)
```

Còn nếu bạn chỉ cần dùng đơn giản thông qua `ViewModelProvider(this)` để tạo instance của `ViewModel`.
```kotlin
ViewModelProvider(this).get(SampleViewModel::class.java)
```

## Shared ViewModel để giao tiếp giữa activity và fragment

Để giao tiếp giữa các fragment khác nhau, hoặc giữa fragment và activity chúng ta thường dùng interface hoặc target fragment. Nhưng dễ dàng hơn khi chúng ta share một `ViewModel` trong phạm vi activity. 
![](https://miro.medium.com/max/1239/1*jO6FHDhzcElE0TksGWPMYQ.png)

Để hoàn thành flow trên, chúng ta cần tạo `ViewModel` instance dùng trong activity scope trong fragment, activity sẽ chỉ có chung một instance được tạo và chia sẻ với các fragment khác nhau.

### Vấn đề
Việc giao tiếp giữa 2 hoặc nhiều fragment trong cùng activity là rất phổ biến. 

Giả sử chúng ta có 2 fragments: `Fragment1` cho phép người dùng chọn một item trong list, `Fragment2` sẽ hiển thị content của item được chọn. Trong trường hợp này cả 2 fragment sẽ định nghĩa một vài interface để activity bind chúng với nhau. Thêm vào đó, cả 2 fragment phải handle luôn việc khi một trong 2 fragment chưa được tạo hoặc visible. 

### Solution 
Để giải quyết vấn đề trên chúng ta sẽ dùng chung một `ViewModel` cho những fragment này trong phạm vi activity.

Bây giờ chúng ta sẽ tạo một `SharedViewModel` class
```Kotlin 
class SharedViewModel : ViewModel() {
      val selected = MutableLiveData<String>()
      fun selectedItem(item: String) {
       selected.value = item
      }
}
```

Giả sử chúng ta có 2 fragments: `Fragment1` và `Fragment2` được attached trong main activity, chúng ta cần post một vài thứ từ `Fragment1` sang `Fragment2` thông qua một button được click. 

```Kotlin
class Fragment1 : Fragment() {

    private lateinit var viewModel: SharedViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)    viewModel = activity?.let {
            ViewModelProviders.of(it)[SharedViewModel::class.java]
        } ?: throw Exception("Activity is null")       
    }
    
    btn.setOnClickListener {
         viewModel?.selectedItem("New Item posted")
    }
}
```

```Kotlin

class Fragment2 : Fragment() {
private lateinit var viewModel: SharedViewModel
    
    override fun onViewCreated(view: View, savedState:  Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        //ViewModel Creation using activity scope
         activity?.let {
            ViewModelProviders.of(it)[SharedViewModel::class.java]
        } ?: throw Exception("Activity is null")
              
        //Observe data changes from ViewModel and update the UI
         model.selected.observe(viewLifecycleOwner,Observer<Item> { item ->
         Toast.makeText(this, item, Toast.LENGTH_LONG).show()
        })
    }
}
```

`ViewModelProvider` sẽ trả về 2 fragment này cùng một instance của `SharedViewModel` trong activity scope.

Cách tiếp cận này mang đến các lợi ích sau đây:
* Activity không cần làm bất cứ điều gì về việc giao tiếp này.
* Các Fragment không cần biết gì về nhau, chúng chỉ cần `SharedViewModel`. Khi một fragment là disappears thì fragment còn lại vẫn hoạt động bình thường.
* Mỗi fragment đều hoạt động với vòng đời của chính nó, và không bị ảnh hưởng bởi những fragment khác. Cho nên, nếu một fragment bị replace, UI vẫn tiếp tục làm việc mà không có bất kì vấn đề nào. 

Vậy, chúng ta đã xong trong việc giao tiếp giữa các UI components.

## Tham khảo
1. https://medium.com/better-programming/everything-to-understand-about-viewmodel-400e8e637a58