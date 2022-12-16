## Giới thiệu
Mới đây Google đã giới thiệu đến với cộng đồng Android trên toàn thế giới **Navigation Architecture Component**, nó như một phần của Android Jetpack và gói AndroidX nhằm mục đích đơn giản hoá việc triển khai của điều hướng trong ứng dụng Android của bạn. Thành phần này và các nguyên tắc của nó cung cấp một cái nhìn mới về cách triển khai điều hướng,  bao gồm đề xuất sử dụng kiến trúc đơn Activity làm kiến trúc ưa thích cho Android Jetpack về sau. Navigation Architecture Component cũng có hỗ trợ cho các fragments và liên kết sâu bên ngoài, mà chúng ta sẽ thấy thêm giúp tạo ra trải nghiệm người dùng rõ ràng hơn, dễ dự đoán hơn.
# 1. Quản lí Fragment thông thường.
Trong Android, fragment đóng một vai trò quan trọng. Một fragment đại diện cho một hành vi hoặc một phần của Giao diện người dùng (UI) trong hoạt động. Chúng ta có thể kết hợp nhiều fragment trong một activity để xây dựng giao diện người dùng nhiều ngăn và sử dụng lại một fragment trong nhiều activity. Một fragment là một phần trong 'activity' có vòng đời riêng của nó. Fragment nhận các sự kiện của nó và được thêm vào và loại bỏ trong khi hoạt động đang chạy (giống như một "activity phụ" có thể được sử dụng lại trong các activity khác nhau). Để gọi một fragment này sang một fragment khác, Fragment manager đóng một vai trò quan trọng.
**Đoạn code sau đây cho thấy cách gọi một fragment:**
```kotlin
  supportFragmentManager.beginTransaction()
            .add(R.id.container, ResultListenerFragment::class.java, null)
            .commit()
```
**Các vấn đề thường xuyên xảy ra với Fragment manager thông thường**
Có một số hạn chế trong việc sử dụng Fragment manager và chúng như sau:
* Điều hướng quay lại
* commit () và commitAllowingStateLoss()
* Fragment và Bundle
* Khi nào sử dụng FragmentTransaction Add với Replace?
* Fragment receivers, broadcasts, và memory leaks
**Giải pháp**
Tất cả các vấn đề nêu trên đều có thể được khắc phục với ‘Navigation Component in Android JetPack’. Để thực hiện giải pháp này, cần tuân theo một số bước nhất định.
**Điều kiện tiên quyết**
Navigation component đi kèm với Android JetPack. Thư viện Android JetPack thì được cung cấp riêng cho hệ điều hành Android. Nó đi kèm với AndroidX và cung cấp khả năng tương thích trên mọi phiên bản hệ điều hành.
**Navigation component**
Navigation component là một thư viện quản lí các điều hướng phức tạp giữa các fragment, liên kết sâu, animation, và kiểm tra các đối số trong quá trình dịch chuyển giữa các fragment trong ứng dụng.
Nó gồm 3 phần chính:
* Navigation Graph: là một tệp XML chứa thông tin kiên quan đến điều hướng ở cùng một vị trí. Nó có tất cả các khu vực nội dung riêng lẻ trong các điểm đến được đặt tên cho ứng dụng của bạn và có thể có các đường dẫn hoặc bước mà người dùng có thể thực hiện qua ứng dụng.
* Nav Host: là một vùng chứa trống hiển thị tất cả các điểm đến từ biểu đồ điều hướng của bạn. Navigation component có triển khai navhost mặc định hiển thị các điểm đến fragment
* NavController: là một đối tượng quản lí điều hướng trong Navhost. Nó cũng sắp xếp việc hoán đổi nội dung trong Nav Host khi người dùng di chuyển trong ứng dụng của bạn.
# 2. Triển khai Navigation component
## 2.1. Cài đặt môi trường
Thêm các phần phụ thuộc sau vào tệp *build.gradle* của ứng dụng để bao gồm hỗ trợ điều hướng.
```kotlin
dependencies {
 def nav_version = "2.1.0"
 // Java
 implementation "androidx.navigation:navigation-fragment:nav_version"
 implementation "androidx.navigation:navigation-ui:navversion"
 implementation"androidx.navigation:navigation−ui:nav_version"
 // Kotlin
 implementation "androidx.navigation:navigation-fragment-ktx:nav_version" 
 implementation "androidx.navigation:navigation-ui-ktx:navversion"
 implementation"androidx.navigation:navigation−ui−ktx:nav_version"
}
```
## 2.2. Tạo biểu đồ Navigation
Điều hướng từ màn hình này sang màn hình khác rất đơn giản, chúng ta có thể kết nối với bất kỳ màn hình nào mà người dùng có thể điều hướng. Các điểm đến / màn hình này được kết nối thông qua các hành động(action). Chúng ta cũng có thể chuyển các tham số.

![](https://images.viblo.asia/62fca7c3-6292-4465-a38c-5b627e6f34e5.png)
Ở đây, mỗi màn hình được biểu thị bằng hình thu nhỏ xem trước và các hành động kết nối được biểu thị bằng các mũi tên cho biết khá nhiều cách người dùng có thể điều hướng từ màn hình này sang màn hình khác.
## 2.3. Chỉnh sửa Navigation
Trong android studio, chúng ta có thể mở trực tiếp trình chỉnh sửa điều hướng, nơi chúng ta có thể chỉnh sửa trực quan các biểu đồ điều hướng hoặc chỉnh sửa XML bên dưới.

![](https://images.viblo.asia/ab1dc081-e623-4965-8499-f15f173383f2.png)
Phần này được chia làm 3 phần :
* Destinations Panel: đích đến, nó sẽ hiển thị navigation chủ và tất cả các màn hình hiện có 
* Graph Editor: Nó hiển thị một bản trình bày trực quan về biểu đồ điều hướng của bạn. Nó cho phép bạn chuyển đổi giữa dạng xem Thiết kế và dạng biểu diễn XML bên dưới trong dạng xem Văn bản.
* Attributes: Chúng ta có thể thấy các thuộc tính cho mục hiện được chọn trong biểu đồ điều hướng.
Phần code XML có dạng như dưới đây:
```xml
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/mobile_navigation"
    app:startDestination="@+id/navigation_home">

    <fragment
        android:id="@+id/navigation_home"
        android:name="com.example.myapplication.ui.home.HomeFragment"
        android:label="@string/title_home"
        tools:layout="@layout/fragment_home">

        <action
            android:id="@+id/action_navigation_home_to_navigation_notifications"
            app:destination="@id/navigation_notifications" />
        <action
            android:id="@+id/action_navigation_home_to_navigation_dashboard"
            app:destination="@id/navigation_dashboard" />

    </fragment>

    <fragment
        android:id="@+id/navigation_dashboard"
        android:name="com.example.myapplication.ui.dashboard.DashboardFragment"
        android:label="@string/title_dashboard"
        tools:layout="@layout/fragment_dashboard" >
        <action
            android:id="@+id/action_navigation_dashboard_to_navigation_notifications"
            app:destination="@id/navigation_notifications" />
    </fragment>

    <fragment
        android:id="@+id/navigation_notifications"
        android:name="com.example.myapplication.ui.notifications.NotificationsFragment"
        android:label="@string/title_notifications"
        tools:layout="@layout/fragment_notifications">
        <argument
            android:name="myarg"
            android:defaultValue="Home"
            app:type="string" />
    </fragment>
</navigation>
```
Thẻ navigation là phần gốc của biểu đồ điều hướng, Trong khi các bạn thêm các điểm đến và các hành động vào biểu đồ của mình các bạn có thể thấy là thẻ destination và thẻ action là các phần tử con. Nếu bạn có các đồ thị lồng nhau thì sẽ có thêm các thẻ navigation con bên trong.
## 2.4. Thêm NavHost và trong Activity
Navigation Host là một phần quan trọng của Navigation Component. Đó là một vùng chứa trống, nơi các màn hình được hoán đổi vào ra khi người dùng điều hướng. Navigation Host phải được lấy từ NavHost. Việc triển khai NavHost mặc định của thành phần điều hướng và NavHostFragment xử lý việc hoán đổi các điểm đến fragment.
Thêm một NavHostFragment qua XML
```xml
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/container"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingTop="?attr/actionBarSize">

    <com.google.android.material.bottomnavigation.BottomNavigationView
        android:id="@+id/nav_view"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginStart="0dp"
        android:layout_marginEnd="0dp"
        android:background="?android:attr/windowBackground"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:menu="@menu/bottom_nav_menu" />

    <fragment
        android:id="@+id/nav_host_fragment"
        android:name="androidx.navigation.fragment.NavHostFragment"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:defaultNavHost="true"
        app:layout_constraintBottom_toTopOf="@id/nav_view"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:navGraph="@navigation/mobile_navigation" />

</androidx.constraintlayout.widget.ConstraintLayout>
```
**Chú ý:**
* Thuộc tính đầu tiên: chúng ta cần truyền name của việc triển khai NavHost
* Chúng ta cần truyền *app:navGraph*, được liên kết với NavHostFragment với biểu đồ điều hướng
* Tiếp theo, một thuộc tính quan trọng là *defaultNavHost = "true"* để xử lí nút quay lại hệ thống
## 2.5. Các nguyên tắc cơ bản của Navigation
Phần cốt lõi của trải nghiệm người dùng là điều hướng giữa màn hình và ứng dụng. Sau đây là những nguyên tắc cơ bản chúng ta cần thực hiện khi sử dụng thành phần điều hướng.
**Điểm đến đầu tiên cố định**
Trong navigation component, chúng ta cần đặt một điểm đến đầu tiên cố định. Điểm đến đầu tiên là màn hình đầu tiên, người dùng sẽ nhìn thấy và khi họ khởi chạy một ứng dụng từ trình khởi chạy. Thật trùng hợp, điểm bắt đầu cụ thể này cũng sẽ là màn hình cuối cùng mà người dùng nhìn thấy khi họ quay lại trình khởi chạy sau khi nhấn nút quay lại.
```xml
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/mobile_navigation"
    app:startDestination="@+id/navigation_home">
 </navigation>
```
Trong đoạn mã đề cập ở trên, *navigationhome* bắt đầu. Đó là màn hình đầu tiên mà người dùng nhìn thấy khi ứng dụng khởi chạy lần đầu cũng là màn hình cuối cùng khi người dùng muốn thoát ứng dụng.
**Nút back của hệ thống và nút back trên màn hình phải giống nhau**
Nút quay lại xuất hiện ở cuối màn hình và được sử dụng để điều hướng theo thứ tự ngược lại trong lịch sử các màn hình mà người dùng đã làm việc gần đây. Khi người dùng nhấn nút quay lại, màn hình hiện tại sẽ bật ra khỏi đầu back stack và điều hướng đến điểm đến trước đó.
**Nút back trên màn hình không bao giờ thoát khỏi ứng dụng của bạn**
Nút back trên màn hình không xuất hiện khi người dùng ở điểm đến bắt đầu của ứng dụng, vì nút back trên màn hình sẽ không bao giờ thoát khỏi ứng dụng. Tuy nhiên, nút quay lại hiển thị ở dưới cùng(nút back của hệ thống) sẽ thoát khỏi ứng dụng.
Cùng với tất cả những tính năng này trong Navigation component, nó hỗ trợ liên kết sâu và tạo lại ngăn xếp thực tế khi liên kết đến bất kỳ điểm đến nào trong biểu đồ điều hướng của bạn.
## 2.6. Truyền dữ liệu giữa các màn hình
Một điều thú vị khác với Navigation component là truyền dữ liệu giữa các điểm đến khác nhau. Ví dụ: màn hình hồ sơ người dùng có thể lấy đối số ID người dùng để xác định người dùng nào sẽ hiển thị. Đoạn code sau trình bày cách truyền đối số.
```xml
<fragment android:id="@+id/userFragment" >
     <argument
         android:name="UserID"
         app:argType="integer"
         android:defaultValue="1234" />
 </fragment>
```

![](https://images.viblo.asia/3d5694d0-f02f-4383-9670-628de90bd254.png)
**Navigation component hỗ trợ các loại đối số khác nhau:**
Chúng ta có thể chuyển các loại dữ liệu khác nhau từ một fragment này sang một fragment khác. Chúng ta chỉ có thể chuyển một lượng dữ liệu tối thiểu giữa các điểm đến. Nếu bạn đang muốn chuyển một lượng lớn dữ liệu, bạn nên cân nhắc sử dụng ViewModel như được mô tả trong phần [Share data between fragments](https://developer.android.com/guide/fragments/communicate)
## 2.7. Các lợi ích khác của việc sử dụng Navigation component
* Xử lý thay cho các Fragment transactions
* Xử lý chính xác các hành động trên nút back của màn hình hay nút back của hệ thống
* Cung cấp các tài nguyên được tiêu chuẩn hóa cho animations và chuyển tiếp
* Thực hiện và xử lý liên kết sâu
* Nó hỗ trợ các navigation UI patterns, navigation drawers, và bottom navigation
* Hỗ trợ ViewModel hoàn chỉnh - Chúng ta có thể điều chỉnh và mở rộng ViewModel thành biểu đồ điều hướng để chia sẻ dữ liệu liên quan đến giao diện người dùng giữa các điểm đến của biểu đồ.
# 3. Kết luận
Việc sử dụng Navigation component trong một dự án sẽ giúp ích rất nhiều trong quá trình chuyển đổi và truyền dữ liệu giữa các fragment. Điều này tự động quản lý một số yếu tố quan trọng mà nếu không, sẽ trở nên khó thực hiện với hệ thống quản lý fragment thông thường. Với sự trợ giúp của NavHost, vô số fragment và quá trình chuyển đổi có thể được xử lý trong ứng dụng. Nó giúp giải quyết sự thất vọng khi xử lý một lượng lớn mã tùy chỉnh cho các nhà phát triển trong một 'activity' trong khi xử lý các fragment. Nó làm giảm sự phức tạp của việc xây dựng các phương pháp quản lý chuyển đổi fragment và mất ít thời gian hơn để xây dựng một ứng dụng.

**Nguồn tham khảo :**

[https://www.innominds.com/blog/navigation-component-in-android-simplifying-navigation-for-developers](https://www.innominds.com/blog/navigation-component-in-android-simplifying-navigation-for-developers)

[https://willowtreeapps.com/ideas/exploring-androids-navigation-architecture-component](https://willowtreeapps.com/ideas/exploring-androids-navigation-architecture-component)