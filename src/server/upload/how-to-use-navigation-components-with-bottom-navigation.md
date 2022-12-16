# 1. Mở đầu
- Ở bài trước mình đã hướng dẫn các bạn sơ bộ về việc sử dụng Navigation Components trong Android. Hôm nay mình sẽ hướng dẫn các bạn sử dụng với 1 thư việc quan trọng mà hầu hết các Developer Android đều sẽ sử dụng qua. Khi các bạn gặp trường hợp như thế này các bạn sẽ cần tới cách giải quyết mà mình sẽ hướng dẫn dưới đây.
- Không vòng vo nữa mình sẽ vào vấn đề đó ngay bây giờ. Đó là trong trường hợp bạn muốn vừa sử dụng Navigation Components trong project, mà lại có một Bottom Navigation ở ngay bên dưới.
- Đầu tiên các bạn hãy học cách sử dụng 2 thư viện này giúp mình nhé, lát nữa mình sẽ để link sử dụng dụng và tài liệu sử dụng 2 thư viện này bên dưới. 
# 2. Create Project
- Muốn sử dụng được cả 2 thư viện thì các bạn phải import thư viện phần này mình không cần hướng dẫn nữa nhé, vì điều này có lẻ sẽ dễ dàng với các bạn rồi.
` implementation "androidx.navigation:navigation-fragment:$nav_version"
    implementation "androidx.navigation:navigation-ui:$nav_version"`
- Các bạn chọn version(nav_version) phù hợp với phiên bản hiện tại nhé. 
# 3. Code
- Sau khi create xong project các bạn tạo cho mình những fragment cần thiết dưới đây mình có 3 fragment là fragment 1, 2 và 3.
![](https://images.viblo.asia/2ab45784-fb67-466a-9b6c-d2f968de17c5.PNG)
- Tiếp tục các bạn tạo 3 textview cơ bản đề phân biệt 3 fragment với nhau nhé :
- Ở xml của Fragment 1: 
`<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="@string/fragment_1" />

</LinearLayout>`

 - Ở xml của Fragment 2: 
 
`<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="@string/fragment_2" />

</LinearLayout>`

- Ở xml của Fragment 3: 

`<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="@string/fragment_3" />

</LinearLayout>`
- Như vậy các bạn đã có UI để phân biệt 3 fragment với nhau rồi.
# 4. Tạo file Navigation
- Các bạn click chuột phải vào thư mục res -> Android Resoure file -> Reource tye: chọn Navigation -> Click chuột phải vào thư mục navigation vừa được tạo -> Click chuột phải New -> navigtaion resoure file.
- Các bạn nhớ đặc tên cho file đó nhé: Ở đây mình đặt tên là nav_graph.xml
![](https://images.viblo.asia/2daadaf5-a612-4fb2-8faa-fefc81424942.PNG)
- Tiếp theo các bạn kéo tất cả fragment của mình vào file nav_graph.xml
hoặc code tay như mình:

`<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/nav_graph"
    app:startDestination="@id/fragment1">
    <fragment
        android:id="@+id/fragment1"
        android:name="com.learntodroid.bottomnavigationtutorial.Fragment1"
        android:label="fragment_fragment1"
        tools:layout="@layout/fragment_fragment1" />
    <fragment
        android:id="@+id/fragment2"
        android:name="com.learntodroid.bottomnavigationtutorial.Fragment2"
        android:label="fragment_fragment2"
        tools:layout="@layout/fragment_fragment2" />
    <fragment
        android:id="@+id/fragment3"
        android:name="com.learntodroid.bottomnavigationtutorial.Fragment3"
        android:label="fragment_fragment3"
        tools:layout="@layout/fragment_fragment3" />
</navigation>`

- Đã cấu hình xong file navigation.
# 5. MainActivity
- Ở phần này chúng ta sẽ tập trung code ở MainActivity 
1. Import code xml


`<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <androidx.fragment.app.FragmentContainerView
        android:id="@+id/activity_main_nav_host_fragment"
        android:name="androidx.navigation.fragment.NavHostFragment"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:defaultNavHost="true"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:navGraph="@navigation/nav_graph" />

    <com.google.android.material.bottomnavigation.BottomNavigationView
        android:id="@+id/activity_main_bottom_navigation_view"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:menu="@menu/navigation_menu"/>
</androidx.constraintlayout.widget.ConstraintLayout>`

- Các bạn Import code này vào xml của mainActivity nhé,
- Để sử dụng được navigation thì các bạn cần một FragmentContainerView như trên và 1 BottomNavigation ngay bên dưới.
- Bước tiếp theo các bạn tạo 1 menu cho Bottom navigation nhé.
Đây là menu của mình:
![](https://images.viblo.asia/6d8cc80b-4586-40d0-86eb-7e79a0e53aca.PNG)

`<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">
    <item
        android:id="@+id/fragment1"
        android:icon="@drawable/ic_filter_1_black_24dp"
        android:title="@string/fragment_1"/>

    <item
        android:id="@+id/fragment2"
        android:icon="@drawable/ic_filter_2_black_24dp"
        android:title="@string/fragment_2"/>

    <item
        android:id="@+id/fragment3"
        android:icon="@drawable/ic_filter_3_black_24dp"
        android:title="@string/fragment_3"/>
</menu>`
- Icon các bạn tự thêm vào nhé. 
# 5. Setup 
- Ở bước này các bạn sẽ tập trung code ở MainActivity

`package com.learntodroid.bottomnavigationtutorial;
import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.NavigationUI;
import android.os.Bundle;
import com.google.android.material.bottomnavigation.BottomNavigationView;
public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        NavController navController = Navigation.findNavController(this, R.id.activity_main_nav_host_fragment);
        BottomNavigationView bottomNavigationView = findViewById(R.id.activity_main_bottom_navigation_view);
        NavigationUI.setupWithNavController(bottomNavigationView, navController);
    }
}
`
- Vậy là xong rồi chạy app xem thành quả nhé các bạn. 
![](https://images.viblo.asia/3cb19d84-4976-416d-b3fb-e1fd61802834.PNG)
![](https://images.viblo.asia/1eb94009-0d15-4819-8d31-18fb6cb0411a.PNG)
![](https://images.viblo.asia/90ad7921-4c30-4ec4-864e-72ee5d2dd9ca.PNG)
# 6. Kết luận
- Như vậy qua ví dụ cơ bản trên các bạn đã có thể sử dụng được Navigation Components with Bottom Navigation rồi, hãy app dụng vào dự án hiện tại hoặc 1 dự án demo để hiểu hơn các bạn nhé,
- Đây là link tài liệu và link hướng dẫn sử dụng các thư viện đó các bạn tham khảo nhé, cảm ơn rất nhiều.
https://developer.android.com/guide/navigation/navigation-getting-started
https://material.io/components/bottom-navigation
https://proandroiddev.com/step-by-step-to-bottom-navigation-with-jetpacks-navigation-component-and-multiple-nav-graphs-271c05af1dd3