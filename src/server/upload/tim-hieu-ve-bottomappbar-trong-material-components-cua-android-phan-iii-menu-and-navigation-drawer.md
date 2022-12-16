Trong hai bài viết trước ([bài viết I](https://viblo.asia/p/tim-hieu-ve-bottomappbar-trong-material-components-cua-android-63vKj0dMl2R) và [bài viết II](https://viblo.asia/p/tim-hieu-ve-bottomappbar-trong-material-components-cua-android-phan-ii-behavior-cho-android-63vKjQqR52R)). Chúng ta đã tìm hiểu rất nhiều điều của [BottomAppBar](https://material.io/develop/android/components/bottom-app-bar/), cái đã được giới thiệu gần đây trong [I/O 2018](https://events.google.com/io/) như là một phần của [Material Components cho Android](https://material.io/develop/android/). Chúng ta đã cùng xem làm thế nào để thực hiện BottomAppBar và khám phá những thuộc tính của nó. BottomAppBar kế thừa khả năng hiển thị những item của menu và điều khiển navigation drawer, cái mà chúng ta đang sử dụng như là một phần của [Toolbar](https://developer.android.com/reference/android/widget/Toolbar).

![](https://images.viblo.asia/b19e1c40-a716-43d2-92cd-c5c677471256.png)

Vơi một component mới như BottomAppBar , điều khiển navigation và menu item của toolbar nên bị thay thế như là một phần của BottomAppBar. Những phần bên dưới sẽ hiển thị việc sử dụng Menu và điều khiển Navigation với BottomAppBar.

![](https://images.viblo.asia/491d6a26-f5de-43a9-904c-208a5bc52084.png)

**BottomAppBar Menu**

Đầu tiên một file menu xml nên được tạo bên dưới thư mục res/menu cho những menu item  mà sẽ được hiển thị trong BottomAppBar. Đây là file bottomappbar_menu.xml
```xml 
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:tools="http://schemas.android.com/tools"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:android="http://schemas.android.com/apk/res/android">

    <item
        android:id="@+id/app_bar_fav"
        android:icon="@drawable/baseline_favorite_white_24"
        android:title="@string/action_favorite"
        app:showAsAction="ifRoom"/>

    <item
        android:id="@+id/app_bar_search"
        android:icon="@drawable/baseline_search_white_24"
        android:title="@string/action_search"
        app:showAsAction="ifRoom"/>
    <item
        android:id="@+id/app_bar_settings"
        android:title="@string/action_settings"
        app:showAsAction="never"/>
</menu>
```

Trong MainActivity, nơi bạn có *setSupportActionBar(bottomappbar)* làm như bên dưới:

```
override fun onCreateOptionsMenu(menu: Menu): Boolean {
    val inflater = menuInflater
    inflater.inflate(R.menu.bottomappbar_menu, menu)
    return true
}
```

Bây giờ những menu items  đã được hiển thị trong BottomAppBar.

**Handling Menu Item Click**

Để xử lý việc những menu item trong BottomAppBar được click , bạn xem đoạn code bên dưới trong MainActivity

```
override fun onOptionsItemSelected(item: MenuItem?): Boolean {
    when (item!!.itemId) {
        R.id.app_bar_fav -> toast("Fav menu item is clicked!")
        R.id.app_bar_search -> toast("Search menu item is clicked!")
        R.id.app_bar_settings -> toast("Settings item is clicked!")
    }

    return true
}

```

![](https://images.viblo.asia/d3df71aa-6261-44a6-ba3b-8c335bfed5b5.gif)

**Điều khiển Navigation Drawer với BottomAppBar**

Theo truyền thống việc điều khiển Navigation Drawer được thực hiện với Navigation View được đặt tại bên trái của app. Vơi BottomAppBar, những behavior của navigation drawer cũng có sự thay đổi. 
Bottom Navigation Drawer , cái sẽ được sử dụng với BottomAppBar sẽ là một [Modal Bottom Sheet](https://material.io/develop/android/components/bottom-sheet-dialog-fragment/)
![](https://images.viblo.asia/94d5fd9b-564f-4584-9f8d-d4fd6b24b8a4.png)

Cho việc điều khiển navigation drawer, đầu tiên một [Bottom Sheet](https://material.io/develop/android/components/bottom-sheet-behavior/) là được tạo. Đoạn code bên dưới là file layout của bottom sheet.
*fragmentbottomsheet.xml*

```xml 
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content">


    <com.google.android.material.navigation.NavigationView
        android:id="@+id/navigation_view"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_gravity="bottom"
        android:layout_marginStart="8dp"
        android:layout_marginTop="8dp"
        android:layout_marginEnd="8dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:menu="@menu/bottom_nav_drawer_menu"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```

Một file menu cho navigation drawer lên được đặt dưới *res/menu*
*bottomnavdrawermenu.xml*
```xml 
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">
    <group android:checkableBehavior="none">
        <item
            android:id="@+id/nav1"
          android:icon="@drawable/baseline_exposure_plus_1_black_24"
            android:title="@string/nav_item1" />
        <item
            android:id="@+id/nav2"
            android:icon="@drawable/baseline_replay_10_black_24"
            android:title="@string/nav_item2" />
        <item
            android:id="@+id/nav3"
            android:icon="@drawable/baseline_forward_10_black_24"
            android:title="@string/nav_item3" />
    </group>
</menu>
```

Sau đó một class được extend từ *BottomSheetDialogFragment* lên được tạo , class này sẽ inflate bottom sheet layout ở trên 
```
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.google.android.material.bottomsheet.BottomSheetDialogFragment

class BottomNavigationDrawerFragment: BottomSheetDialogFragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_bottomsheet, container, false)
    }
}
```

Những dòng code bên dưới  lên được đặt trong phương thức *onOptionsItemSelected* mà đã được sử dụng trong phần *Handling Menu Item Click* ở trên.
Khi navigation icon được click , một thể hiện của BottomNavigationDrawerFragment là được tạo và BottomNavigationView được hiển thị.

```
android.R.id.home -> {
    val bottomNavDrawerFragment = BottomNavigationDrawerFragment()
    bottomNavDrawerFragment.show(supportFragmentManager, bottomNavDrawerFragment.tag)
}
```

Đây là code layout của main activity
*activitymain.xml*
```xml 
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <androidx.coordinatorlayout.widget.CoordinatorLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <com.google.android.material.bottomappbar.BottomAppBar
            android:id="@+id/bottom_app_bar"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_gravity="bottom"
            app:backgroundTint="@color/colorPrimary"
            app:fabAlignmentMode="center"
            app:fabAttached="true"
            app:navigationIcon="@drawable/baseline_menu_white_24"/>


        <com.google.android.material.floatingactionbutton.FloatingActionButton
            android:id="@+id/fab"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:src="@drawable/baseline_add_white_24"
            app:layout_anchor="@id/bottom_app_bar" />

    </androidx.coordinatorlayout.widget.CoordinatorLayout>

</androidx.constraintlayout.widget.ConstraintLayout>
```
Và xử ly khi các item trong navigation drawer được click, bạn sử dụng đoạn code bên dưới trong BottomNavigationDrawerFragment class
```
navigation_view.setNavigationItemSelectedListener { menuItem ->
    // Bottom Navigation Drawer menu item clicks
    when (menuItem!!.itemId) {
        R.id.nav1 -> context!!.toast(getString(R.string.nav1_clicked))
        R.id.nav2 -> context!!.toast(getString(R.string.nav2_clicked))
        R.id.nav3 -> context!!.toast(getString(R.string.nav3_clicked))
    }
    true
}
```

![](https://images.viblo.asia/5e03b63d-4689-47dc-9cad-92a0fe0397b7.gif)

Toàn bộ source code  mình sẽ update sau.
Link tham khảo [https://medium.com/material-design-in-action/implementing-bottomappbar-menu-and-navigation-c4f069e579ec](https://medium.com/material-design-in-action/implementing-bottomappbar-menu-and-navigation-c4f069e579ec)