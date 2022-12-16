![](https://images.viblo.asia/5ff37084-cb48-4ae7-ad64-a66e9d20c3a6.jpeg)https://images.viblo.asia/5ff37084-cb48-4ae7-ad64-a66e9d20c3a6.jpeg

Từ thời điểm khi Fragment được release (khoảng năm 2011), các nhà phát triển ứng dụng bắt đầu tranh luận về thiết kế ứng dụng nên được sử dụng, liệu một ứng dụng nên chứa nhiều activity và một vài fragment, hoặc nhiều fragment với một vài activity hay là kết hợp cả hai.
Mỗi developer sẽ chọn kiến trúc phù hợp và hợp lý với họ. Ngoài ra các developer sẽ phải đối mặt với việc vấn đề liên quan đến việc điều hướng(navigation) vốn tồn tại trong nền tảng chẳng hạn như điều gì sẽ sảy ra nếu người dùng click vào button back ? người dùng nên quay lại màn hình nào ? và nếu người dùng đến màn hình này từ các ứng dụng khác ? Từ notification ? từ deep-link ?
Tất cả những điều này đã thay đổi từ Google IO 2018, Team android đã quyết định làm nó dễ dàng cho những nhà phát triển trong việc điều hướng ứng dụng. Họ đã release một component mới **Navigation Architecture Component** . Cái này là một phần trong gói “JetPack”. Thành phần này giúp các nhà phát triển ứng dụng thực hiện việc điều hướng ứng dụng nhanh hơn và tốt hơn.
Android Team khuyến khích rằng Activity chỉ là một điểm đầu vào của ứng dụng và tất cả các màn hình lên là fragment.

#### Vậy làm thế nào chúng ta bắt đầu ??
Việc đầu tiên bạn cần làm là download Android Studio 3.3 Canary3(bản hiện tại mới nhất tôi đang dùng)

[https://developer.android.com/studio/preview/](https://developer.android.com/studio/preview/)

Android Studio mới có chứa navigation editor rất trực quan 

![](https://images.viblo.asia/63d9e7fd-83c2-43f1-bf48-3ac0148e4c3a.png)https://images.viblo.asia/63d9e7fd-83c2-43f1-bf48-3ac0148e4c3a.png

Sau đó chúng ta cần add navigation library(hiện tại đang là bản alpha) vào file build.gradle

```xml 
dependencies {
    def nav_version = "1.0.0-alpha01"
    implementation "android.arch.navigation:navigation-fragment:$nav_version"
    implementation "android.arch.navigation:navigation-ui:$nav_version"
}
```

Bây giờ chúng ta sẽ tạo một resource directory mới của loại navigation bên trong thư mục "res"

![](https://images.viblo.asia/4fc10a4c-6d5f-4753-a09a-0c4ce3149c15.png)

Chúng ta hãy tạo một file navigation graph bên trong thư mục navigation

![](https://images.viblo.asia/5f0394de-8f88-4ed7-8132-853904d28ee3.png)

File mới được tạo có chứa 2 tab(Design/Text) tương tự như Layout editor.
Design chứa editor navigation trực quan, Text là cấu trục file xlm.
Bây giờ chúng ta add vài fragment tới editor navigation. Nếu bạn click trên add button , 
chúng ta có thể tạo một blank fragment hoặc lựa chọn 1 fragment đã tồn tại trong ứng dụng (hoặc activity) từ list.

![](https://images.viblo.asia/c6bd9999-2d0f-42e4-a454-51afae692d17.png)

Sau khi đã add một fragment, file xml cũng được uppdate theo.
```xml 
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:app="http://schemas.android.com/apk/res-auto"
            xmlns:android="http://schemas.android.com/apk/res/android"
            app:startDestination="@id/topicsListFragment">

    <fragment
        android:id="@+id/topicsListFragment"
        android:name="com.freesoulapps.navigationtest.fragments.TopicsListFragment"
        android:label="topicsList"/>
</navigation>
```

Bạn có thể chú ý thấy UI của fragment là unavailable điều này có thể được fix một cách dễ dàng bằng cách add dòng code bên dưới vào trong mỗi 
element fragment trong xml.

```xml 
tools:layout=”@layout/fragment_topics_list”
```

Thành phàn root chưa id của fragment đó thực sự như là một điểm đến bắt đầu (start destination). nó có thể dễ rằng được thay đổi từ xml hay từ navigation editor bằng cách lựa chọn fragment mong muốn và click vào button "Set Start Destination" nhấp chuột vào menu bên phải.
Bây giờ chúng ta sẽ kết nối một vài điểm đến. Di chuột qua bên cạnh phải của fragment gốc của bạn, bạn sẽ nhìn thấy một vòng ,click nó và kéo tới điểm đến fragment tiếp theo bạn muốn. Chúc mừng bạn đã tạo một action .action này sẽ chuyển bạn từ fragment gốc tới điểm đến fragment bạn muốn. file navigation xml sẽ trông như này:
```xml 
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:app="http://schemas.android.com/apk/res-auto"
            xmlns:android="http://schemas.android.com/apk/res/android"
            xmlns:tools="http://schemas.android.com/tools"
            app:startDestination="@id/topicsListFragment">

    <fragment
        android:id="@+id/topicsListFragment"
        android:name="com.freesoulapps.navigationtest.fragments.TopicsListFragment"
        android:label="topicsList"
        tools:layout="@layout/fragment_topics_list">
        <action
            android:id="@+id/action_topicsListFragment_to_topicDetailFragment2"
            app:destination="@id/topicDetailFragment"/>
    </fragment>
    <fragment
        android:id="@+id/topicDetailFragment"
        android:name="com.freesoulapps.navigationtest.fragments.TopicDetailFragment"
        android:label="TopicDetailFragment"/>
</navigation>
```

action sẽ có một id và một destination 
Bây giờ bắt đầu sử dụng một navigation mới, chúng ta cần phải thay đổi một chút ở activity của chúng ta.
bên trong file layout của activity, chúng ta cần add  NavHostFragment

```xml 
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <android.support.v7.widget.Toolbar
        android:id="@+id/my_toolbar"
        android:layout_width="match_parent"
        android:layout_height="?attr/actionBarSize"
        android:background="?attr/colorPrimary"
        android:elevation="4dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"/>

    <fragment
        android:id="@+id/nav_host_fragment"
        android:name="androidx.navigation.fragment.NavHostFragment"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        app:defaultNavHost="true"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/my_toolbar"
        app:navGraph="@navigation/nav_graph"/>

</android.support.constraint.ConstraintLayout>
```
Chú ý thuộc tính app:defaultNavHost=”true”. Thuộc tính này đảm bảo rằng NavHostFragment của bạn chặc được button back của hệ thống.
Bên trong activity của bạn cũng cần override lại phương thức onSupportNavigateUp() 

```java 
override fun onSupportNavigateUp()
 = NavHostFragment.findNavController(nav_host_fragment).navigateUp()

```

Cho việc điều hướng chúng ta cần gọi 

`view.findNavController().navigate(R.id.someAction)`

method  ‘navigate()’ chấp nhận id của action hoặc destination(ngoài ra nó còn chấp nhậnt 1 bundle để gửi dữ liệu)
Ngoài ra cho button bạn cũng có thể sử dụng createNavigateOnClickListener()

`fab.setOnClickListener(Navigation.createNavigateOnClickListener(R.id.action_topicsListFragment_to_createTopicFragment))`

createNavigateOnClickListener()  chấp nhận một id của action hoặc một destination.

Bạn muốn chuyển hướng tới một vài destination hoặc xoá gốc (origin) từ "back stack" bạn có thể set ‘Clear Task’ tơi true cho action mong muốn trong ‘Launch Options’ phần phía trong attribute panel (hoặc set app:clearTask=”true” bên trong thành phần action trong xml navigation graph).
Bạn có thể thay đổi hành vi ‘Pop To' của action từ attribute panel hoặc từ xml app:popUpTo=”@+id/connectionFragment”. Hành động này khi người dùng click back ,thì sẽ chuyển đến connectionFragment thay vì destination ban đầu.
Hỗ trợ toolbar  up icon action và title dựa trên điểm đến bạn nên add vào bên trong activity 
```
NavigationUI.setupActionBarWithNavController(this, NavHostFragment.findNavController(nav_host_fragment))
```
title của toolbar sẽ được thay đổi theo attribute 'label' của fragment bên trong navigate editor/xml.
Bạn muốn trói menu/bottom navigation/drawer navigation với một chuyển hướng cụ thể, điều này có thể được thực hiện rất đơn giản bằng cách thiết lập item id giống như destination id. Cho ví dụ, nếu chúng ta có một fragment đến với id=signInFragment sau đó menu item sẽ như này

```xml 
<item
    android:id="@+id/signInFragment"
    android:icon="@drawable/ic_check_black_24dp"
    android:title="@string/navigation_sign_in" />
```
Chúng ta cần kết nói giữa chúng bằng một phương tĩnh từ class NavigationUI bên trong activity
`NavigationUI.setupWithNavController(navigation, findNavController(nav_host_fragment))`

Vì nội dung tìm hiểu khá nhiều nên mình sẽ chia làm 2 phần.
Phần 1 mình xin tạm dừng tại đây. Các bạn có thể tham khảo [source code tại đây](https://github.com/oLeQuangHoa/NavigationComponentSample)