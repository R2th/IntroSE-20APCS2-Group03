# Giới thiệu
Nền tản Android TV là một trong những nền tản TV phổ biến nhất hiện nay bên cạnh Tizen của Samsung và WebOs của LG. Android TV xuất hiện trên đại đa số các mẫu tivi Sony, TCL,Xiaomi,... và đặc biệt là các mẫu Android Box đang được sử dụng rộng rãi hiện nay. Tuy nhiên việc lập trình trên nền tản này vẫn còn nhiều khó khăn nhất định mà quan trọng nhất là về lượng support trên internet rất ít và hiếm, khi gặp phải một issue thì rất khó khăn để giải quyết.
Trong series về Android TV này tôi sẽ giới thiệu cách phát triển ứng dụng Android TV.Mục đích của bài đăng này là hiểu việc triển khai cụ thể của Android “TV” application, đặc biệt là tập trung vào phát triển UI.

Vì giao diện người dùng là một trong những khác biệt lớn nhất giữa ứng dụng Android và ứng dụng Android TV. Chúng ta cần phải làm cho giao diện người dùng phù hợp để sử dụng TV, ví dụ chúng ta nên tạo một ứng dụng có thể điều hướng ứng dụng chỉ bằng ↑ ↓ → ← các phím chỉ hướng, thay vì điều hướng bằng bàn di chuột. Vì người dùng sử dụng bộ điều khiển từ xa và không thể sử dụng chức năng "màn hình cảm ứng" với TV. Để đạt được yêu cầu này, dự án mã nguồn mở Android đang cung cấp thư viện Hỗ trợ Leanback (android.support.v17.leanback) để các nhà phát triển có thể dễ dàng thực hiện giao diện người dùng đáp ứng các yêu cầu này và do đó phù hợp cho việc sử dụng TV. Hướng dẫn này chủ yếu giải thích việc sử dụng thư viện Leanback này.
# Bắt đầu với Android TV
## Init project
Tiến hành khởi tạo project mọi thao tác cơ bản đều giống với tạo project android phone, tại mục Android Device chọn TV
![](https://images.viblo.asia/b06b0390-2217-4af5-8f5b-799722b1b420.PNG)
## Add MainActivity
```
public class MainActivity extends FragmentActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

}
```
Bạn cũng có thể add một Android TV Activity, nó sẽ tạo đầy đủ các file liên quan để tạo một example android TV, đây có thể là một tài liệu hữu ích, tuy nhiên nó khá khó hiểu vì vậy để chúng ta hiểu rõ hơn về mục đích của từng file tôi sẽ tiến hàng tạo một Blank Activity và add từng thành phần của một ứng dụng Android TV vào đây
## Add một BrowseSupportFragment
BrowseSupportFragment được cung cấp bởi thư viện Android SDK Leanback và nó tạo giao diện người dùng chuẩn cho ứng dụng Android TV mà chúng ta sẽ thấy qua Hướng dẫn này.
```
public class MainFragment extends BrowseSupportFragment {
    private static final String TAG = MainFragment.class.getSimpleName();

    @Override
    public void onActivityCreated(Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);

    }
}
```
Trong file activity_main.xml tiến hành add MainFragment
```
public class MainFragment extends BrowseSupportFragment {
    private static final String TAG = MainFragment.class.getSimpleName();

    @Override
    public void onActivityCreated(Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
    }
}
```
Cùng chạy thử xem, được thành quả như sau
![](https://images.viblo.asia/7c6e1526-7920-4d51-aa62-ed99b4a6c773.PNG)
**BrowseSupportFragment** bao gồm **HeadersSupportFragment** & **RowsSupportFragment**.
Ở đây, bạn có thể thấy phần HeaderSupportFragment (header) ở phía bên phải và phần RowsFragment (contents) ở phía bên trái. Chúng ta sẽ thiết kế kết hợp Header và Rows này trong phần sau.
Trước đó, hãy triển khai giao diện người dùng bao gồm màu và tiêu đề chính của ứng dụng này.
## Settup UI
Thêm function sau vào MainFragment
```
    private void initView() {
        setTitle("Hello Android TV!");
        // over title
        setHeadersState(HEADERS_ENABLED);
        setHeadersTransitionOnBackEnabled(true);
        // set header background color
        setBrandColor(getResources().getColor(R.color.header_background));
        // set search icon color
        setSearchAffordanceColor(getResources().getColor(R.color.search_opaque));
    }
```
Thử chạy 

![](https://images.viblo.asia/bc19e968-3bc1-4b17-a8ed-5471ed23b4e1.PNG)

Bạn cũng có thể sử dụng phương thức **setBadgeDrawable** () thay cho phương thức **setTitle** (). Phần logo sẽ được hiển thị thay thế cho title
```
setBadgeDrawable(getResources().getDrawable(R.mipmap.ic_launcher));
```
![](https://images.viblo.asia/09d9e863-a0cb-4d6f-b7e8-cafa1557e400.PNG)
# Modify Android Manifest
Mặc định biểu tượng ứng dụng sẽ không được hiển thị trong trình khởi chạy Leanback vì vậy chúng ta cần phải config file Manifest như sau
```
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/Theme.Leanback" >
        <activity
            android:name=".MainActivity"
            android:icon="@drawable/app_icon_your_company"
            android:label="@string/app_name"
            android:logo="@drawable/app_icon_your_company" >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
 
                <category android:name="android.intent.category.LEANBACK_LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
```
Ứng dụng đã được hiển thị trong Leanback launcher

![](https://images.viblo.asia/d364c5e9-9670-4d88-bd66-5fb31d9c9196.PNG)

# Cảm ơn các bạn đã theo dõi
Hẹn gặp lại ở phần kế tiếp chúng ta sẽ tiềm hiểu sâu hơn về BrowseSupportFragment thành phần quan trọng của một ứng dụng Android TV