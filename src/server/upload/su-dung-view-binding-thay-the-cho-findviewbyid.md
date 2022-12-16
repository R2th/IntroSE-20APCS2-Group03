Mới trong Android Studio 3.6, view binding cho bạn khả năng thay thế findViewById bằng các object được tạo tự động để đơn giản hóa code, loại bỏ lỗi và tránh tất cả các phiền toái của findViewById.

## Update build.gradle để enable view binding

Không cần thên lib nào đặc biệt. View Binding đã được built sẵn trong Android Gradle Plugin từ Android Studio 3.6. Để enbble view binding, set **viewBinding**  trong **build.gradle**  của module app.

```kotlin
// Available in Android Gradle Plugin 3.6.0
android {
    viewBinding {
        enabled = true
    }
}
```

Trong Android Studio 4.0 thì **viewBinding** đã được move vào **buildFeatures**:

```kotlin
// Android Studio 4.0
android {
    buildFeatures {
        viewBinding = true
    }
}
```

Khi được enable cho project, view binding sẽ tự động generate binding class cho tất cả các layout. Không cần phải thực hiện các thay đổi đối với XML  - nó sẽ tự động hoạt động với các layout hiện có.

Có thẻ sử dụng binding class bất cứ khi nào inflate layout, ví dụ như **Fragment**, **Activity** hay thậm chí cả RecyclerView **Adapter** (hoặc **ViewHolder**).

## Sử dụng view binding trong Activity

Nếu bạn có 1 layout tên là **activity_awesome.xml**, gồm một button và 2 text view, view binding sẽ generate ra một class là **ActivityAwesomeBinding** bao gồm một property cho mọi view với ID trong layout.

```kotlin
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

Bạn không cần phải gọi findViewById khi sử dụng view binding - thay vào đó chỉ sử dụng các property được cung cấp để tham chiếu bất kỳ view nào trong layout với id.

Phần tử gốc của layout luôn được lưu trữ trong một property được gọi là **root** - cái mà sẽ được tạo tự động cho bạn. Trong một phương thức **onCreate** của **Activity**, pass **root** đến **setContentView** để báo cho Activity sử dụng layout từ binding object.

## Safe code sử dụng binding objects

findViewById là nguồn gốc của nhiều lỗi đối với người dùng trong Android. Nó hay pass qua một id mà không có trong layout hiện tại dẫn đến null và crash. Và, vì nó không có bất kỳ type-safety  nào được tích hợp trong nó, nó sẽ gọi **findViewById<TextView>(R.id.image)**. View binding thay thế findViewById bằng một thay thế ngắn gọn, an toàn.
    
View binding:
*    **Type-safe**: bởi vì các thuộc tính luôn chính xác dựa trên view trong layout. Vì vậy, nếu bạn đặt TextView trong layout, view binding sẽ hiển thị thuộc tính TextView.
    
*  **Null-safe**: View binding sẽ phát hiện nế một view chỉ xuất hiện trong vài config và tạo một thuộc tính **@Nullable**.
    
Và vì các binding classes đc generate là các class Java thông thường với các chú thích thân thiện với Kotlin, nên bạn có thể sử dụng liên kết xem từ cả ngôn ngữ lập trình Java và Kotlin.
    
## Code được tạo ra là gì?
    
**View binding** tạo ra một calss Java thay thế **findViewById** trong code. Nó sẽ generate ra một binding object cho mọi layout XML trong mô-đun của bạn trong khi ánh xạ các tên để **activity_awesome.xml** ánh xạ sang **ActivityAwesomeBinding.java**.
    
Khi chỉnh sửa layout XML trong Android Studio, việc generate code sẽ được tối ưu hóa để chỉ binding object liên quan đến file XML đó và nó sẽ làm như vậy trong bộ nhớ để giúp mọi việc nhanh chóng. Điều này có nghĩa là các thay đổi binding object sẽ ngay lập tức thay đổi trong editor và bạn không cần phải chờ rebuild lại.
    
Ví dụ về việc file được generate từ XML:
    
```kotlin
public final class ActivityAwesomeBinding implements ViewBinding {
  @NonNull
  private final ConstraintLayout rootView;
  @NonNull
  public final Button button;
  @NonNull
  public final TextView subtext;
  @NonNull
  public final TextView title;
}
```

View binding sẽ generate một thuộc tính chính xác cho mỗi view  với một id được chỉ định. Nó cũng sẽ tạo ra một thuộc tính được gọi là **rootView** mà gọi ra thông qua một getter là **getRoot**. View binding không làm bất kỳ logic nào. Nó chỉ hiển thị các views trong một binding objec để bạn có thể kết nối chúng mà không có các dễ bị lỗi tới findViewById. Điều này giữ cho file được tạo đơn giản (và tránh làm chậm quá trình build).
    
Nếu bạn sử dụng Kotlin, class này được tối ưu hóa cho khả năng tương tác. Vì tất cả các thuộc tính được chú thích bằng @Nullable hoặc @NonNull, Kotlin biết cách hiển thị chúng dưới dạng null-safe.
    
```kotlin
  private ActivityAwesomeBinding(@NonNull ConstraintLayout rootView, @NonNull Button button,
      @NonNull TextView subtext, @NonNull TextView title) { … }
  
  @NonNull
  public static ActivityAwesomeBinding inflate(@NonNull LayoutInflater inflater) {
    /* Edited: removed call to overload inflate(inflater, parent, attachToParent) */
    View root = inflater.inflate(R.layout.activity_awesome, null, false);
    return bind(root);
  }
```
    
Trong **ActivityAwesomeBinding.java**, view binding generates một inflate method. Constructor một param chuyển null thành dạng parent view và không đính kèm với parent. View binding cũng hiển thị một constructor với 3 params của inflate  cho phép pass parent và attachToParent parameters khi cần.
    
Gọi **bind** sẽ lấy inflated layout và bind tất cả các thuộc tính, với một số kiểm tra lỗi được thêm vào để tạo thông báo lỗi có thể đọc được.
    
 ```kotlin
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
    
Method **bind** là code phức tạp nhất trong binding object được generate, với lệnh gọi findViewById cho mỗi view để bind. Compiler có thể kiểm tra types và khả năng nullable của từng thuộc tính trực tiếp từ XML layout, nó có thể gọi findViewById an toàn.
    
Trên mỗi binding class, view binding hiển thị ba public static functions để tạo một binding object ở đây:
    
* **inflate(inflater)**: Sử dụng trong **Activity** **onCreate** khi không có parent view để truyền đến binding object.
 
* **inflate(inflater, parent, attachToParent)**: Sử dụng trong **Fragment** hoặc RecyclerView **Adapter ** (hoặc **ViewHolder**) trong đó cần pass  Viewgroup cha cho  binding object.
    
* **bind(rootView)**: Sử dụng khi bạn đã inflated view và chỉ muốn sử dụng view binding để tránh findViewById.
    
## Include layout
    
Một binding object sẽ được tạo cho mỗi **layout.xml** trong một mô-đun. Điều này đúng ngay cả khi một layout  khác <include> layout này.
    
```kotlin
<!-- activity_awesome.xml -->
<androidx.constraintlayout.widget.ConstraintLayout>
    <include android:id="@+id/includes" layout="@layout/included_buttons"
</androidx.constraintlayout.widget.ConstraintLayout>
  
<!-- included_buttons.xml -->
<androidx.constraintlayout.widget.ConstraintLayout>
    <Button android:id="@+id/include_me" />
</androidx.constraintlayout.widget.ConstraintLayout>
```
 
## Sử dụng view binding  và data binding

View binding chỉ thay thế cho findViewById. Nếu bạn cũng muốn tự động liên kết các views  trong XML, bạn có thể sử dụng data binding library. Cả hai lib có thể được áp dụng cho cùng một mô-đun và chúng sẽ hoạt động cùng nhau.

Khi sử dụng cả hai, các layout sử dụng thẻ <layout> sẽ sử dụng data binding để generate binding objects. Tất cả các layout khác sẽ sử dụng view binding để tạo các đốibinding objects.
    
 Để đọc thêm về view binding, các bạn tham khảo [nguồn](https://developer.android.com/topic/libraries/view-binding).
Cảm ơn mọi người đã đọc bài của mình :D