Làm sao để khai báo layout một cách đơn giản, nhanh chóng thế này
```java
@LayoutId(R.layout.activity_main)
public class MainActivity extends BaseActivity {
}
```
or Kotlin
```swift
@LayoutId(R.layout.activity_main)
class MainActivity : BaseActivity() {
}
```
**Cách làm:**
1.Khởi tạo annotation

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface LayoutId { int value();}
```
or Kotlin
```scala
@Target(AnnotationTarget.CLASS, AnnotationTarget.FILE)
@Retention(AnnotationRetention.RUNTIME)
annotation class LayoutId(val value: Int)
```
2. Định nghĩa annotation ở hàm Base

```java
public abstract class BaseActivity extends AppCompatActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        LayoutId layoutId = getClass().getAnnotation(LayoutId.class);
        if (layoutId != null) {
            int contentViewId = layoutId.value();
            setContentView(contentViewId);
        }
    }
}
```
or Kotlin
```swift
abstract class BaseActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val layoutId = javaClass.getAnnotation(LayoutId::class.java)
        val contentViewId = layoutId?.value
        setContentView(contentViewId!!)
    }
}
```

Thế là xong!
Cám ơn bạn đã đọc