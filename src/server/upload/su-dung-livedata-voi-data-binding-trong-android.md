Chào các bạn !
Như bạn có thể biết, trong phiên bản Android Studio mới nhất, Google đã giới thiệu hỗ trợ cho **LiveData** với Data Binding.

Bài viết này sẽ hướng dẫn cho các bạn cách sử dụng nó trong dự án một cách nhanh nhất .

Ok , bắt đầu thôi !

Đầu tiên **ObservableField** đã có thể được thay thế bởi **LivaData** trong data bindding
Để hiểu rõ hơn các bạn có thể xem source code [ở đây ](https://github.com/pszklarska/LiveDataBinding)

Tiếp theo là cách triển khai của LiveData 

### Setup
Đầu tiên bạn cần phải có bản Android Studio Canary mới nhất [ở đây ](https://developer.android.com/studio/preview/)

Tiếp theo bạn cần update Gradle trong file  Build Gradle 

```
buildscript {
    dependencies {
        classpath 'com.android.tools.build:gradle:3.1.0-alpha06'
    }
}
```

Nếu bạn dùng Kotlin thì cần thêm đoạn code như này 
```
kapt 'com.android.databinding:compiler:3.1.0-alpha06'
```

### Cách sử dụng

Như các bạn đã biết khi dùng databinding **ObservableField** sẽ được dùng như dưới đây : 
```
val kittyName = ObservableField<String>()
val kittyAge = ObservableInt()

init {
    kittyRepository.receiveNewKitties {
        kittyName.set(it.name)
        kittyAge.set(it.age)
    }
}
```
Đoạn code trên sẽ được thay thế khi sử dụng **LiveData** như sau : 

```
val kittyName = MutableLiveData<String>()
val kittyAge = MutableLiveData<Int>()

init {
    kittyRepository.receiveNewKitties {
        kittyName.postValue(it.name)
        kittyAge.postValue(it.age)
    }
}
```
Nhưng để đoạn code trên làm việc như mong muốn chúng ta cần phải set LifecycleOwner cho databinding như sau : 
```
val binding: ActivityMainBinding = ...
binding.setLifecycleOwner(this)
```
Nhìn chung với LiveData, chúng ta không cần phải lo lắng về lifecycle của Activity / Fragment. Dữ liệu được gửi đến UI chỉ khi nó hoạt động. Trong cách tiếp cận trước  (không có LiveData) nếu chúng ta muốn hiển thị dữ liệu trên UI, đầu tiên chúng ta cần kiểm tra xem liệu nó có còn tồn tại hay không. 
Nhưng với LiveData, chúng ta không cần phải lo lắng về nó vì dữ liệu sẽ chỉ được gửi đến UI nếu Activity/Framgent được start

Hãy cùng xem xét ví dụ sau : 

Chúng ta sẽ đặt log trong repository khi dữ liệu được khởi tạo  
```
init {
    kittyRepository.receiveNewKitties {
        Log.d("MainViewModel", "Generating kitty name: " + it.name)
        ...
    }
}
```
Và log thứ hai khi dữ liệu bị thay đổi 
```
kittyNameText.addAfterTextChangedListener { Log.d("MainActivity",
    "Showing kitty name: " + it) }
```

Bây giờ nếu không dùng LiveData khi chạy sẽ có đoạn log như dưới đây : 
```
D/MainViewModel: Generating kitty name: TIGER
D/MainActivity: Showing kitty name: TIGER
D/MainViewModel: Generating kitty name: FLUFFY
D/MainActivity: Showing kitty name: FLUFFY
```

Điều đó có nghĩa là UI được cập nhật ngay cả sau khi Activity bị paused. Điều này là không cần thiết

Bây giờ, nếu chúng ta chạy ứng dụng và và sử dụng  LiveData, chúng ta sẽ thấy log như sau : 
```
D/MainViewModel: Generating kitty name: PUMPKIN
D/MainViewModel: Generating kitty name: TIGER
```
Dữ liệu được tạo ra và thay đổi nhưng UI không cập nhật nó vì  Activity chưa được start hoặc resume. 

Thật tuyệt vời phải không ạ !

Bài viết của mình đến đây là hết 

Hi vọng mọi người thích bài viết này . 
Cảm ơn mọi người ! 

Bài viết được dịch từ : https://android.jlelse.eu/android-architecture-components-livedata-with-data-binding-7bf85871bbd8