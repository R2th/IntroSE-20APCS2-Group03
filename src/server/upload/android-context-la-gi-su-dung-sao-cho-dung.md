# I. Khái quát về Context
- Context là thành phần trong ứng dụng android cung cấp quyền truy cập thông tin về các trạng thái của ứng dụng đó. Nó cung cấp các Activities, Fragments và Services truy cập tới các file tài nguyên, hình ảnh, theme, style và các file nằm ngoài ứng dụng. Nó cũng cho phép truy cập vào các thành phần chính của Android như layout, keyboard và tìm kiếm các content providers.
- Trong nhiều trường hợp, khi bắt buộc phải sử dụng Context chúng ta đơn giản truyền vào instance của activity hiện tại. Trong tình huống chúng ta ở trong các object được tạo bởi activity như adapter của fragments, chúng ta cần truyền activity instance vào trong object đó. Còn trong trường hợp chúng ta ở ngoài activity đó (VD application,  service), chúng ta sẽ sử dụng "application" context thay thể.

# II. Vậy Context dùng để làm gì?
- Sẽ có các trường hợp nhất định bắt buộc phải truyền vào context, ví dụ như start một activity, tạo một view mới, gửi local broadcast..v..v..

# III. So sánh Application và Activity Context
- Như chúng ta đã biết, Application Context và Activity Context là 2 thành phần context cơ bản nhất của Android. Vậy chúng khác nhau như thế nào?
1. Trong khi theme và styles thường xuyên xử dụng tại application level, chúng có thể định nghĩa tại Activity. Trong trường hợp activity có thể có các set theme hoặc style khác nhau (VD như ông khách bắt ActionBar phải disable ở một số trang nhất định) Chúng ta sẽ khai báo tại `AndroidManifest.xml` cho application và định nghĩa 1 trường hợp đặc biệt cho activity

```
<application
       android:allowBackup="true"
       android:icon="@mipmap/ic_launcher"
       android:label="@string/app_name"
       android:theme="@style/AppTheme" >
       <activity
           android:name=".MainActivity"
           android:label="@string/app_name"
           android:theme="@style/MyCustomTheme">
```
Đa phần các View nên truyền vào Activity Context để có thể apply các theme,style, dimensions tự định nghĩa. Nếu ko có trường hợp nào định nghĩa riêng cho Activity, default sẽ là trường hợp định nghĩa riêng cho Application. Đa số các trường hợp bạn nên sử dụng Activity Context, thông thường keyword `this` là instance của class cũng đại diện cho Activity Context.

2. Anonymous Function: Sử dụng AF sẽ implement listener, keyword `this` sẽ không đại diện cho instance của activity đó nữa mà là class trực tiếp được định nghĩa nếu chúng ta viết trong function này vậy ta sẽ thêm tên activity trước keyword `this` như ví dụ dưới đây

```
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        TextView tvTest = (TextView) findViewById(R.id.abc);
        tvTest.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View view) {
                  Toast.makeText(MainActivity.this, "Chiu chiu", Toast.LENGTH_SHORT).show();
              }
          });
        }
    }
```

3. Các trường hợp sử dụng RecyclerViewAdapter ta có thể gọi context như sau `viewHolder.itemView.getContext()`

# IV. Phòng tránh memory leak
- Application Context là điển hình của Singleon instance, giống như class custom manager cần Context thông tin để có quyền truy cập vào system service nhưng sẽ được tái sử dụng ở nhiều Activity. Việc tham chiếu đến Activity Context sẽ không tự giải phóng bộ nhớ khi không dùng đến, đó là 1 trong lý do ta dùng Application Context để thay thế trong trường hợp trên.
Ví dụ dưới đây, context sẽ được chứa ở Activity hoặc Service và destroy bởi hệ thống. Nó sẽ ko được giải phóng bộ nhớ bởi CustomeManager class giữ một tham chiếu static đến nó
```
public class CustomManager {
    private static CustomManager sInstance;

    public static CustomManager getInstance(Context context) {
        if (sInstance == null) {

            // This class will hold a reference to the context
            // until it's unloaded. The context could be an Activity or Service.
            sInstance = new CustomManager(context);
        }

        return sInstance;
    }

    private Context mContext;

    private CustomManager(Context context) {
        mContext = context;
    }
}
```
- Vây để xử lý những trường hợp trên, không bao giờ được giữ tham chiếu đến context ngoài vòng đời của nó. Kiểm tra mọi background thread, pending handler , hoặc inner class.
- Sử dụng Application Context khi nó cần tham chiếu xuyên suốt theo vòng đời của component. VD như để giải quyết trường hợp trên như sau

```
public static CustomManager getInstance(Context context) {
    if (sInstance == null) {

        // When storing a reference to a context, use the application context.
        // Never store the context itself, which could be a component.
        sInstance = new CustomManager(context.getApplicationContext());
    }

    return sInstance;
}
```

# Tham Khảo
- [What is a context - Simple Code Stuffs](http://www.simplecodestuffs.com/what-is-context-in-android/)
- [Avoiding memory leaks](http://android-developers.blogspot.com.tr/2009/01/avoiding-memory-leaks.html)
- [What is Context - StackOverflow](http://stackoverflow.com/questions/3572463/what-is-context-in-android)
- [Using Context - CodePath](https://guides.codepath.com/android/Using-Context#proper-storing-of-a-context-use-the-application-context)