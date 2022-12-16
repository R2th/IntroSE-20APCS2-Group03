Với các bạn Android dev chắc hẳn đều ít nhất đã nghe qua hoặc sử dụng thư viện [Android Data Binding](https://developer.android.com/topic/libraries/data-binding/)

Hôm nay mình xin giới thiệu với các bạn những thay đổi khi dùng `data binding` trong `android` bằng `kotlin`.

# Cài đặt  Data Binding với Kotlin

Nếu bạn làm app android bằng Java thì bạn chỉ cần thêm đoạn code dưới đây vào `app/build.gradle` là đủ.

```kotlin
dataBinding {
    enabled true
}
```

Tuy nhiên trong Kotlin bạn còn cần phải thêm data binding processor sau vào `app/build.gradle`.

Lưu ý version phải trùng với version gradle

```kotlin
apply plugin: 'kotlin-kapt'

...

dependencies {
    // version must be the same as gradle version
    kapt 'com.android.databinding:compiler:3.1.2'
}
```

#  @BindingAdapter với Kotlin

`@BindingAdapter` là một tính năng cực kỳ quan trọng và tiện lợi của data binding lib, giúp chúng ta có thể tạo ra các thuộc tính tùy biến và sử dụng lại code.

Bình thường khi làm với Java thì các bạn sẽ làm như đoạn dưới đây với việc load ảnh đơn giản từ url vào ImageView

```kotlin
public class BindingUtils {
    @BindingAdapter({ "imageUrl" })
    public static void loadImageUrl(ImageView view, String url) {
        Glide.with(view.getContext()).load(url).into(view);
    }
}
```

Tuy nhiên trong Kotlin mọi thứ lại khác, ban đầu mình nghĩ rằng chỉ cần cho đoạn code trên vào `companion object`như sau là xong.

```kotlin
class BindingUtils {
    companion object {
        @BindingAdapter("imageUrl")
        fun loadImageUrl(view: ImageView, url: String) {
            Glide.with(view.context).load(url).into(view)
        }
    }
}
```

Nhưng thực tế thì code như trên không chạy như mình muốn. Mà bạn cần phải bỏ `class`, `companion object` để đưa `fun` **ra ngoài** trở thành `kotlin top level functions` như sau

`BindingUtils.kt`
```kotlin
@BindingAdapter("imageUrl")
fun loadImageUrl(view: ImageView, url: String) {
    Glide.with(view.context).load(url).into(view)
}
```

Chúc các bạn code Android vui với Kotlin, hẹn gặp lại trong các bài tiếp theo :D.