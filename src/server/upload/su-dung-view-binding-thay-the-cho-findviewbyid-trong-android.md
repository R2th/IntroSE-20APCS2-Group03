# Mở đầu
Trên Android 3.6, `View Binding` cung cấp cho bạn khả năng thay thế `findViewById` bằng các đối tượng ràng buộc được tạo ra để đơn giản hóa code, loại bỏ lỗi và tránh tất cả các boilerplate của `findViewById`.
# TL;DR
* Kích hoạt view binding trong `build.gradle` (không phụ thuộc vào các thư viện được implement)
* View binding tạo ra các đối tượng liên kết cho mọi layout trong module của bạn (`activity_awesome.xml` → `ActivityAwesomeBinding.java`)
* Đối tượng binding chứa một thuộc tính cho mọi chế độ xem với một `id` trong `layout` - với chính xác từng kiểu và không bị `null`.
* Hỗ trợ đầy đủ cho cả Java và Kotlin.

## Update `build.gradle` để kích hoạt view binding
Bạn không cần thêm bất kỳ thư viện bổ sung nào để cho phép view binding. Nó được tích hợp trong Android Gradle Plugin bắt đầu với các phiên bản từ Android Studio 3.6. Để bật view binding, hãy định cấu hình `viewBinding` trong `build.gradle` ở cấp module của bạn.
````php
// Available in Android Gradle Plugin 3.6.0
android {
    viewBinding {
        enabled = true
    }
}
````
Trong Android Studio 4.0, `viewBinding` đã được di chuyển vào `buildFeatures` và bạn có thể sử dụng:
```php
// Android Studio 4.0
android {
    buildFeatures {
        viewBinding = true
    }
}
```
Khi được kích hoạt trong một dự án, view binding sẽ tạo ra một lớp liên kết cho tất cả các layout của bạn một cách tự động. Bạn không cần phải thực hiện các thay đổi đối với các file `xml` của mình - nó sẽ tự hoạt động với các layout hiện có của bạn.

**View binding hoạt động với XML hiện tại của bạn và sẽ tạo một đối tượng binding cho mỗi layout trong một module**

## Sử dụng view binding trong một Activity
Nếu bạn có một layout được gọi là `activity_awesome.xml`, chứa một `Button` và hai `TextView`, view binding sẽ tạo ra một lớp nhỏ gọi là `ActivityAwesomeBinding` có chứa một thuộc tính cho mọi view có ID trong layout.

```php
// Using view binding in an Activity
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    val binding = ActivityAwesomeBinding.inflate(layoutInflater)

    binding.title.text = "Hello"
    binding.subtext.text = "Concise, safe code"
    binding.button.setOnClickListener { /* ... */ }

    setContentView(binding.root)
}
```

Bạn không cần phải gọi `findViewById` khi sử dụng view binding - thay vào đó chỉ sử dụng các thuộc tính được cung cấp để tham chiếu đến bất kì view nào trong layout với id của view.

## Sử dung view binding an toàn
`findViewById` là nguồn gốc của nhiều bug xảy ra trong Android. Nó có thể liên kết đến một id mà không có trong layout tham chiếu của bạn - tạo ra `null` và lỗi crash. View binding thay thế `findViewById` một cách ngắn gọn và an toàn hơn.
Và vì các lớp binding được tạo là các lớp Java thông thường với các chú thích thân thiện với Kotlin, nên bạn có thể sử dụng view binding trên cả ngôn ngữ lập trình Java và Kotlin.

## Nó tạo ra những đoạn code gì?
View Binding tạo ra một class Java thay thế nhu cầu về `findViewById` trong code của bạn. Nó sẽ tạo ra một đối tượng liên kết cho mọi bố cục XML trong module của bạn trong khi ánh xạ các tên để `activity_awesome.xml` ánh xạ sang `ActivityAwesomeBinding.java`.
Khi chỉnh sửa bố cục XML trong Android Studio, việc tạo code sẽ được tối ưu hóa để chỉ cập nhật đối tượng liên kết liên quan đến tệp XML đó và nó sẽ làm như vậy trong bộ nhớ để giúp mọi việc nhanh chóng. Điều này có nghĩa là các thay đổi đối tượng ràng buộc có sẵn ngay lập tức trong trình chỉnh sửa và bạn không cần phải rebuild lại project.

Hãy xem thử view binding đã generate những gì thông qua ví dụ nhỏ dưới đây:

*activity_awesome.xml*
```php
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".AwesomeActivity">


    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="16dp"
        android:layout_marginBottom="16dp"
        android:text="Button"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent" />

    <TextView
        android:id="@+id/title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textAppearance="@style/TextAppearance.AppCompat.Display4"
        android:textStyle=""
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        tools:text="Awesome Title" />

    <TextView
        android:id="@+id/subtext"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="63dp"
        android:text="TextView"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="1.0"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/title" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

Và đây là đoạn code được view binding generate ra từ file XML trên:
```php
public final class ActivityAwesomeBinding implements ViewBinding {
  @NonNull
  private final ConstraintLayout rootView;
  @NonNull
  public final Button button;
  @NonNull
  public final TextView subtext;
  @NonNull
  public final TextView title;
```

View binding sẽ tạo một thuộc tính được nhập chính xác cho mỗi view với một id được chỉ định. Nó cũng sẽ tạo ra một thuộc tính được gọi là `rootView` mà có thể sử dụng thông qua một hàm gọi `getRoot`. View binding không thực hiện bất kỳ logic nào. Nó chỉ hiển thị các `view`của bạn trong một đối tượng liên kết để bạn có thể kết nối chúng mà không có các cuộc gọi dễ bị lỗi tới `findViewById`. Điều này giữ cho tệp được tạo đơn giản (và tránh làm chậm quá trình build project).

Nếu bạn sử dụng Kotlin, lớp này được tối ưu hóa cho khả năng tương tác. Vì tất cả các thuộc tính được chú thích bằng `@Nullable` hoặc `@NonNull`, Kotlin biết cách hiển thị chúng dưới dạng không an toàn. Để tìm hiểu thêm về sự giao thoa giữa các ngôn ngữ, hãy xem tài liệu [để gọi Java từ Kotlin](https://kotlinlang.org/docs/reference/java-interop.html#null-safety-and-platform-types).

```php
  private ActivityAwesomeBinding(@NonNull ConstraintLayout rootView, @NonNull Button button,
      @NonNull TextView subtext, @NonNull TextView title) { … }
  
  @NonNull
  public static ActivityAwesomeBinding inflate(@NonNull LayoutInflater inflater) {
    /* Edited: removed call to overload inflate(inflater, parent, attachToParent) */
    View root = inflater.inflate(R.layout.activity_awesome, null, false);
    return bind(root);
  }
```

Trong `ActivityAwesomeBinding.java`, view binding tạo ra một phương thức `inflate` công khai. Phiên bản một đối số chuyển `null` thành dạng xem parent và không đính kèm với parent. View binding cũng hiển thị một phiên bản ba đối số của `inflate` cho phép bạn truyền các tham số `parent` và `attachToParent` khi cần.
Gọi `bind` là nơi phép màu xảy ra. Nó sẽ inflate layout và liên kết tất cả các thuộc tính, với một số kiểm tra lỗi được thêm vào để tạo thông báo lỗi có thể đọc được.
```php
  @NonNull
  public static ActivityAwesomeBinding bind(@NonNull View rootView) {
    /* Edit: Simplified code – the real generated code is an optimized version */
    Button button = rootView.findViewById(R.id.button);
    TextView subtext = rootView.findViewById(R.id.subtext);
    TextView title = rootView.findViewById(R.id.title);
    if (button != null && subtext != null && title != null) {
      return new ActivityAwesomeBinding((ConstraintLayout) rootView, button, subtext, title);
    }
    throw new NullPointerException("Missing required view […]");
  }
```

## Sử dụng View binding hay ButterKnife
Một trong những câu hỏi phổ biến nhất được hỏi về view binding là "Tôi nên sử dụng view binding của Kotlin hay ButterKnife?". Cả hai thư viện này đều được sử dụng thành công bởi nhiều ứng dụng và giải quyết cùng một vấn đề.
Đối với hầu hết các ứng dụng, chúng tôi khuyên bạn nên thử view binding thay vì các thư viện này vì view binding cung cấp tra cứu chế độ xem ngắn gọn, an toàn hơn.
![](https://images.viblo.asia/0bdb4fa7-9854-4e8a-91b6-0dffc879c87e.png)


# Tham khảo
[Use view binding to replace findViewById](https://medium.com/androiddevelopers/use-view-binding-to-replace-findviewbyid-c83942471fc)