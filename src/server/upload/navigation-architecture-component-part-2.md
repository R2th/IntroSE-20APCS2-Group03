**Phần trước**

Ở phần trước mình đã giới thiệu các bạn một số phần cơ bản của Navigation như:
* Cài đặt Navigation Architecutre Component vào Project
* Tạo file Navigation Graph
* Thao tác với Destination ở trong Navigation (Thêm mới, liên kết với nhau, truyền dữ liệu giữa các destination với nhau)

Trong bài này mình sẽ giới thiệu một vài khái niệm nâng cao hơn để các bạn có thể làm chủ được Navigation Architecture Component.

## Liên kết Navigation với các thành phần khác
Cho đến giờ thì những ví dụ cũng chỉ là cách tạo Navigation một cách thủ công, vì gần như không kết hợp với các thành phần khác có sẵn của Android cung cấp. Mọi thứ đều không sao cho đến khi bạn cần sử dụng Navigation Drawer, Bottom Navigation View, Toolbars thì nhu cầu kết hợp chúng với nhau là rất cần thiết. Những hàm hỗ trợ liên kết với các thành phần khác nằm trong lớp NavigationUI.
> Việc này sử dụng các thành phần điều hướng khác mà không phải là tạo **action** của destination, mà chính là sử dụng điều hướng có sẵn ở trong các trình điều hướng cao cấp hơn như NavigationView, Bottom Navigation.

### Kết hợp Navigation với NavigationView hoặc Bottom Navigation View
Như đã đề cập, việc sử dụng trình điều hướng của thành phần khác được cung cấp bởi lớp NavigationUI bằng cách gọi hàm tĩnh của lớp này sau đây:
```
Navigation.findNavController(this, R.id.nav_host_component)?.let { navigation ->
    NavigationUI.setupWithNavController(bottomNavigation, navigation)
}
```
* Việc này có yêu cầu nhỏ khi thiết kế là id đặt trong file nav_graph phải trùng với id của menu mà NavigationView hoặc Bottom Navigation View sử dụng để điều khiển các sự kiện. Sau khi cài đặt xong thì tất cả các sự kiện của Navigation View sẽ được Navigation Controller xử lý.
* Giao diện của activity kết hợp giữa các thành phần kéo các fragment vào trong giao diện của activity như sau:
```
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/container"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <fragment
        android:id="@+id/nav_host_github"
        class="androidx.navigation.fragment.NavHostFragment"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:defaultNavHost="true"
        app:layout_constraintBottom_toTopOf="@id/navigation"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:navGraph="@navigation/github_nav_graph" />


    <com.google.android.material.bottomnavigation.BottomNavigationView
        android:id="@+id/navigation"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginStart="0dp"
        android:layout_marginEnd="0dp"
        android:background="?android:attr/windowBackground"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:menu="@menu/navigation" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Navigation kết hợp với Custom View
* Vì NavigationUI chỉ cung cấp các tùy chỉnh có giới hạn các thành phần giao diện người dùng, vì vậy nếu muốn tự tạo Custom View nào đó của mình, bạn phải tự xây dựng các chức năng của mình.
* Để sử dụng bạn có thể sử dụng **addOnNavigatedListener()** để có thể lắng nghe được sự kiện khi mà Navigation điều hướng các destination. Sử dụng nó nếu như bạn muốn thay đổi các destination đích hoặc là ẩn hiện các thành phần giao diện khác. 

## Kết hợp nhiều Navigation Graph
Trên thực tế trong ứng dụng có rất nhiều phần riêng biệt mà nếu để chung chúng trong 1 navigation graph thì rất phức tạp và rối bởi đồ thị quá nhiều phần. Chính vì thế cách giải quyết trong trường hợp này là nhóm các navigation lại với nhau và có quan hệ lồng nhau.
### Nhóm các navigation graph vào navigation khác
Biểu đồ chứa được gọi là "**root graph**" và biểu đồ con trong đó được gọi là "**nested graph**", việc này rất tiện dụng cho việc nhóm các thành phần giao diện riêng biệt thực hiện các chức năng riêng biệt như là luồng đăng nhập và đăng ký tài khoản.

![](https://developer.android.com/images/topic/libraries/architecture/navigation-migrate3.png)
> Biểu đồ lồng nhau sẽ đóng gói các destination của nó vào 1 gói, và các biểu đồ khác tương tác với biều đồ lồng nhau qua điểm bắt đầu của biểu đồ đó.

Để tạo biểu đồ lồng nhau bạn làm các bước sau:
* Từ biểu đồ gốc, tiến hành thêm mới graph hoặc là **include** graph đã có sẵn vào biểu đồ chính. Lưu ý navigation được thêm vào bắt buộc phải được chỉ định đâu là **startDestination**.
* Chọn vào biểu đồ mới thêm, click chuột phải và chọn **Move To Nested Graph** -> **New Graph**. Lúc này graph này được coi như là 1 destination bình thường, bạn có thể gửi dữ liệu qua graph mới include vào bằng action và sẽ gửi đển destination start mặc định của graph. 
```
....
    <fragment
        android:id="@+id/mainFragment"
        android:name="thaihn.com.navigationcomponent.ui.main.weather.WeathersFragment"
        android:label="fragment_main"
        tools:layout="@layout/fragment_weathers">
        <action
            android:id="@+id/toDetailWeather"
            app:destination="@id/detailsFragment" />
        <action
            android:id="@+id/action_test"
            app:destination="@id/github_nav_graph" />
    </fragment>

    <include app:graph="@navigation/github_nav_graph" />
....
```
> Coi id destination của action chính là id của graph chúng ta include vào để có thể chuyển đến graph khác trong cùng 1 activity và thực hiên một luồng mới riêng biệt.

### Navigation giữa các Activity
Mặc dù google giới thiệu và gợi ý mô hình Navigation với một Activity duy nhất, nhưng nó không phải là mô hình duy nhất mà các ứng dụng thường sử dụng. Nếu ứng dụng của bạn đang phát triển và gặp phải vấn đề này thì chúng ta vẫn sẽ có cách giải quyết.
> Nếu không bắt buộc thì nên sử dụng theo cách trên, kéo các navigation graph về hết 1 màn hình để chuyển các navigation graph thay vì phải tạo 1 activity mới.

![](https://developer.android.com/images/topic/libraries/architecture/navigation-migrate1.png)
Như trên, mỗi activity đều có những navigation graph riêng và các destination trong đó. Để giải quyết trường hợp này, chúng ta có thể dùng sự kiện click bình thường để mở ra activity mới mà không qua navigation graph, lúc này sử dụng **startActivity(intent)** để mở ra activity mới. Nhưng cách đó là thủ công và không nên sử dụng. Thay vào đó chúng ta sẽ sử dụng Navigation với Activity thay vì Fagment như các phần trước giới thiệu.

* Tạo một destination mới của đồ thì gốc chính là activity mà bạn muốn chuyển đến bằng cách thêm mới trong navigation editor. Đồ thị gốc sẽ trông như sau:
```
....
    <activity
        android:id="@+id/testActivity"
        android:name="thaihn.com.navigationcomponent.ui.main.TestActivity"
        android:label="activity_test"
        tools:layout="@layout/activity_test" />
</navigation>
```
* Sau đó tạo action để có thể di chuyển đến màn hình đó như sau:
```
 <fragment
        android:id="@+id/mainFragment"
        android:name="thaihn.com.navigationcomponent.ui.main.weather.WeathersFragment"
        android:label="fragment_main"
        tools:layout="@layout/fragment_weathers">
       
        <action
            android:id="@+id/action_test_activity"
            app:destination="@id/testActivity" />
    </fragment>
```

* Sau đó tiến hành di chuyển đến activity đó bằng action đã đặt ở trong navigation graph là được:
```
val directions = WeathersFragmentDirections.actionTestActivity()
NavHostFragment.findNavController(this).navigate(directions)
```
### Điều hướng lên từ Activity destination
Khi activity destination có nhu cầu muốn điều hướng ngược lại trở về activity gốc mà đã gọi ra nó, điều này đôi lúc rất cần thiết cho chúng ta. Để làm được điều này, phải thông qua các bước sau đây:
* Định nghĩa thẻ parent activity ở trong tập tin AndroidManifest.xml
```
    <activity
        android:name=".ui.main.TestActivity"
        android:theme="@style/Theme.AppCompat.NoActionBar">

        <meta-data
            android:name="android.support.PARENT_ACTIVITY"
            android:value=".ui.main.MainActivity" />
    </activity>
```
* Để chuyển hướng lên về activity trước, bạn phải lắng nghe sự kiện của phím up của hệ thống để nhận biết click vào phím up. Và sử dụng class **NavUtils** để chuyển hướng lên, điều hướng hoạt động về activity parent của nó, trong gần hết các trường hợp chỉ cần gọi hàm **navigateUpFromSameTask** : 
```
toolbar.setNavigationOnClickListener {
            val upIntent: Intent? = NavUtils.getParentActivityIntent(this)
            when {
                upIntent == null -> throw IllegalStateException("No Parent Activity Intent") as Throwable
                NavUtils.shouldUpRecreateTask(this, upIntent) -> {
                    TaskStackBuilder.create(this)
                            .addNextIntentWithParentStack(upIntent)
                            .startActivities()
                }
                else -> {
                    NavUtils.navigateUpTo(this, upIntent)
                }
            }
        }
```
> Tuy nhiên nếu activity này được mở ra bằng deeplink thì việc này sẽ giúp chúng ta thoát khỏi ứng dụng. Để khắc phục trường hợp đó chúng ta phải kiểm tra và tạo lại task với parent activity và điều hướng nếu cần.
> 

## Một số thuộc tính khác
### Pop Behavior
Thông thường thì khi nhấn phím back hoặc phím up thì Navigation Component sẽ mặc định trở về destination trước đó, đôi lúc bạn cần trở về 1 destination trước đó nữa thì việc này chúng ta phải sử dụng đến **Pop Behavior** được Navigation Component hỗ trợ.

![](https://images.viblo.asia/78d63968-ef05-48f0-87ce-43130d1870b9.png)

Có thể thấy như trên hình chúng ta có thể chọn lựa được sẽ chuyển về destination nào, và việc này cũng sẽ xóa hết các stack của destination tồn tại giữa chúng.
### Deeplink
> Đối với 1 số bạn chưa biết về Deeplink thì có thể tham khảo định nghĩa của google develop cung cấp [tại đây](https://developer.android.com/training/app-links/). Nói một cách ngắn ngọn hơn thì deeplink giúp việc truy cập đúng nội dung bên trong ứng dụng của bạn dễ dàng và thuận tiện hơn mà không phải trải qua các thành phần khác.
> 
> Hiện nay việc sử dụng deeplink đã được Firebase hỗ trợ rất nhiều thông qua [Firebase Dynamic Link](https://firebase.google.com/docs/dynamic-links/), các bạn nên chuyển qua sử dụng nền tảng của Firebase để được hỗ trợ tốt nhất.

Mình sẽ hướng dẫn các bạn sử dụng Deeplink bằng cách thủ công mà Navigation Component đã cung cấp. Mỗi 1 desnination đều sẽ có 1 thẻ để thêm deeplink vào như hình dưới đây:

![](https://images.viblo.asia/bfea4276-ce9c-4c0c-b813-e7edd27d6ad3.png)

Tiến hành thêm link để truy cập vào destination cụ thể để có thể mở ra nội dung cần thiết đối với người dùng:
![](https://images.viblo.asia/6c32e73c-07a6-44a2-8da8-31133777e730.png)

Sau khi đã thêm đường dẫn của deeplink thì các bạn có thể test được ngay trên terminal của mình, thông qua adb shell như sau:

![](https://images.viblo.asia/e4c84c85-02a0-419a-8884-b9299249faf6.PNG)

Như vậy là các bạn đã có thể tạo được 1 deeplink đơn giản đối với Navigation Component.