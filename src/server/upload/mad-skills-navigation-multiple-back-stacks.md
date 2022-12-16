Chào mừng bạn đến với chuyên mục Android MAD skills. Đây là điều mới mẻ và thú vị dành cho các lập trình viên Android. Trong bài viết này, chúng ta sẽ xem xét tới một tính năng được yêu cầu cao: Multiple back stacks.
{@embed: https://www.youtube.com/watch?v=Covu3fPA1nQ}
# Giới thiệu
Có rất nhiều người sử dụng `BottomNavigationView` khi lập trình app Android. Mỗi tap có rất nhiều hành động và được điều hướng tới các màn khác theo một chiều sâu. Khi chúng ta nhấn sang tab khác, thì những trạng thái của tab hiện tại sẽ ko được lưu trữ. Điều này rất bất tiện (Không như iOS) cho chúng ta.

Có một vài cách để xử lý vấn đề này, và cách thường được các lập trình viên lựa chọn là custom ra một extension. Và tất nhiên extension này không phải dễ để thực hiện. Đây là [source code](https://github.com/android/architecture-components-samples/blob/8f4936b34ec84f7f058fba9732b8692e97c65d8f/NavigationAdvancedSample/app/src/main/java/com/example/android/navigationadvancedsample/NavigationExtensions.kt) ví dụ.

Tuy nhiên, kể từ phiên bản `2.4.0-alpha01`, NavigationUI đã hỗ trợ Multiple back stacks mà không cần bất kì custom extension gì. Điều này có nghĩa nếu app của bạn sử dụng hàm `setupWithNavController()` cho `BottomNavigationView` hoặc `NavigationView`, bạn chỉ cần update dependence và multiple back stack sẽ hỗ trợ bạn tận răng.
# Multiple Back Stack Support
Để hình dung rõ hơn về cách triển khai, các bạn có thể tham khảo [repo](https://github.com/android/architecture-components-samples/tree/master/NavigationAdvancedSample) này. 

Có 3 tabs trong app, và mỗi tab điều có luồng Navigation riêng. Để hỗ trợ multiple back stacks, chúng ta sử dụng hàm chuẩn `setupWithNavController()` từ `NavigationUI` cho việc kết nối `BottomNavigationView` với `NavController`.
```
class MainActivity : AppCompatActivity() {

    private lateinit var navController: NavController
    private lateinit var appBarConfiguration: AppBarConfiguration

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val navHostFragment = supportFragmentManager.findFragmentById(
            R.id.nav_host_container
        ) as NavHostFragment
        navController = navHostFragment.navController

        // Setup the bottom navigation view with navController
        val bottomNavigationView = findViewById<BottomNavigationView>(R.id.bottom_nav)
        bottomNavigationView.setupWithNavController(navController)

        // Setup the ActionBar with navController and 3 top level destinations
        appBarConfiguration = AppBarConfiguration(
            setOf(R.id.titleScreen, R.id.leaderboard,  R.id.register)
        )
        val toolbar = findViewById<Toolbar>(R.id.toolbar)
        setSupportActionBar(toolbar)
        toolbar.setupWithNavController(navController, appBarConfiguration)
    }

    override fun onSupportNavigateUp(): Boolean {
        return navController.navigateUp(appBarConfiguration)
    }
}
```
Ta cũng kết hợp 3 `navigation graph` riêng biệt thành một `single graph` duy dất bằng cách sử dụng tag include. Bây giờ, `activity's layout` chỉ chứa một single `NavHostFragment`.
```
<navigation
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/nav_graph"
    app:startDestination="@+id/home">

    <include app:graph="@navigation/home"/>
    <include app:graph="@navigation/list"/>
    <include app:graph="@navigation/form"/>

</navigation>
```
Tiếp theo chúng ta update version của navigation và fragment và sync again. 
```
versions.fragment = "1.4.0-alpha01"
versions.navigation = "2.4.0-alpha01"
```
Hãy thử run app và các bạn sẽ thấy mỗi tab đã được lưu trữ state khi chúng ta chuyển sang tab khác. Thật tuyệt vời phải không nào!

Cám ơn các bạn đã đọc bài viết. Chúc các bạn có một ngày làm việc vui vẻ.

Source: https://medium.com/androiddevelopers/navigation-multiple-back-stacks-6c67ba41952f