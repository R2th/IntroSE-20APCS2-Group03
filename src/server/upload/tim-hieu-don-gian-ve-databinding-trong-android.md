# Databinding là gì?
Data Binding là một thư viện được tích hợp trong gói Android Jetpack. <br>
Nó cho phép liên kết giữa dữ liệu logic với các UI Element ( ví dụ như : TextView, EditText, ImageView…).

Khác với việc sử dụng findByViewId:
* Data binding tạo ra đối tượng ràng buộc tại thời điểm compile cho tất cả các view trong layout.
* findViewByld thì sẽ duyệt qua các view trong thời điểm runtime khi chúng được gọi.
* Các view được truy cập thông qua đối tượng Binding sẽ hiệu quả hơn so với việc sử dụng findViewByld.
* Với các layout có cấu trúc phức tạp, việc sử dụng Databinding có thể tăng hiệu suất một cách đáng kể.

![image.png](https://images.viblo.asia/1472efa4-a299-4995-a94d-542b47c54789.png)

Các bạn có thể xem thêm các tài liệu chính thức của Google về Databinding [tại đây](https://developer.android.com/topic/libraries/data-binding/start).
# Môi trường yêu cầu
Data Binding cung cấp cả tính linh hoạt (flexibility ) và khả năng tương thích (compatibility), nhưng chỉ được sử dụng cho các thiết bị chạy Android 4.0 (API cấp 14) trở lên. <br>
Đi kèm với Android Plugin cho Gradle version 1.5.0 trở nên, tuy nhiên bạn nên sử dụng version mới nhất, [thông tin về các version Android Plugin cho Gradle](https://developer.android.com/studio/releases/gradle-plugin#updating-plugin).

# Cách sử dụng cơ bản
 
1. Để sử dụng Databinding, đầu tiên chúng ta cần config trtong file gradle.build nằm ở  app module
Tìm theo đường dẫn app/build.gradle và thêm vào trong thẻ android{} như bên dưới:

```
android {
...
    buildFeatures {
        dataBinding true
    }
}
```

2. Tiếp đó thêm cặp thẻ `<layout></layout>` bọc lấy toàn bộ file layout của chúng ta như bên dưới:
```
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tool="http://schemas.android.com/tools">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical">

        <TextView
            android:id="@+id/name_text"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="Hello World!" />

    </LinearLayout>
</layout>
```

3. Khai báo và import binding class để có thể sử dụng
```
class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_main)
        
        binding.nameText.text = "Hi World!"
    }
```

Như ở trên chúng ta hoàn toàn có thể thay thế việc sử dụng findByVIewId truyền thống mà thay vào đó sử dụng đối tượng binding để truy cập thới các view trong layout của chúng ta tại thời điểm compile.

# Sử dụng Databinding với object
Vi dụ ta có một data class là MyName và 1 layout với cấu trúc như hình bên dưới:
![image.png](https://images.viblo.asia/50dfc3d6-29d5-4099-a02b-8980c7f559a7.png)

Để binding các view của layout với data của object thì chúng ta cần tạo một variable với name là "myName" cùng với type là package đến file MainActivity của layout đó trong cặp thẻ `<data></data>`  bên trong` <layout></layout>`.<br>
Thông qua name đã được define chúng ta có thể truy cập để lấy dữ liệu của object theo cú pháp `@={myName.name}`

![image.png](https://images.viblo.asia/9b2bf0c7-1bc1-4876-a66c-b337e05c6e87.png)

Cuối cùng trong file MainActivity chung ta lắng nghe sự thay đổi của của object, khi nó thay đổi thì sẽ lập tức được cập nhật lên view đã được liên kết trước đó.

```
 class MainActivity AppCompatActivity() {
 
private lateinit var binding: ActivityMainBinding
private val myName: MyName = MyName ( name: "Aleks")

override fun onCreate(savedInstanceState: Bundle?) {
super.onCreate(savedInstanceState)
binding = DataBindingutil.setContentView( activity:rthis, R. layout.activity_main)

binding.nyName = myName

}

```

Tương tự như hình bên dưới:

![image.png](https://images.viblo.asia/f04524c8-7f94-4f97-a830-3ffe98365cdc.png)

Bạn có thể xem thêm các sample nâng cao [tại đây.](https://github.com/android/databinding-samples)