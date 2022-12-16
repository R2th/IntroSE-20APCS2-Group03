### Chuẩn bị

Để có thể làm theo hướng dẫn này, bạn sẽ cần:

- Android Studio 3.0 trở lên
- Plugin Kotlin 1.1.51 trở lên

### 1. Tạo Android Studio project

Mở Android Studio và tạo một project mới, đặt tên là NavigationDrawerDemo, với một activity tên MainActivity.
Các bạn nhớ chọn **Include Kotlin support**.

![](https://images.viblo.asia/b09c6135-baf8-48ad-b372-eee8b99d462f.jpg)

### 2. Thêm DrawerLayout và NavigationView

Để sử dụng DrawerLayout và NavigationView trong project, bạn cần sử dụng thư viện support design.
Vì vậy, hãy thêm vào **build.gradle** như sau :

```
dependencies {
    implementation 'com.android.support:design:27.0.2'
    implementation 'com.android.support:support-v4:27.0.2'
}
```

Thêm DrawerLayout và NavigationView trong layout của MainActivty như sau :

**res/layout/activlty_main.xml**

```
<?xml version="1.0" encoding="utf-8"?>
<android.support.v4.widget.DrawerLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        xmlns:tools="http://schemas.android.com/tools"
        android:id="@+id/drawer_layout"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:openDrawer="start">
 
    <include
            layout="@layout/app_bar_main"
            android:layout_width="match_parent"
            android:layout_height="match_parent" />
 
    <android.support.design.widget.NavigationView
            android:id="@+id/nav_view"
            android:layout_width="wrap_content"
            android:layout_height="match_parent"
            android:layout_gravity="start"
            app:headerLayout="@layout/nav_header_main"
            app:menu="@menu/activity_main_drawer" />
 
</android.support.v4.widget.DrawerLayout>
```

Sau khi thêm DrawerLayout, chúng ta cần thêm layout appbar @layout/app_bar_main.

Layout của appbar là **app_bar_main.xml** cụ thể như sau :

```
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".MainActivity">
 
    <android.support.design.widget.AppBarLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:fitsSystemWindows="true"
            android:theme="@style/AppTheme.AppBarOverlay">
 
        <android.support.v7.widget.Toolbar
                android:id="@+id/toolbar_main"
                android:layout_width="match_parent"
                android:layout_height="?attr/actionBarSize"
                android:background="?attr/colorPrimary"
                app:layout_scrollFlags="scroll|enterAlways"
                app:popupTheme="@style/AppTheme.PopupOverlay" />
 
    </android.support.design.widget.AppBarLayout>
</android.support.design.widget.CoordinatorLayout>
```

Cuối cùng, chúng ta sẽ tạo NavigationView, với layout là @layout/nav_header_main :

**nav_header_main.xml**

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:id="@+id/nav_header"
              android:layout_width="match_parent"
              android:layout_height="160dp"
              android:background="@color/colorAccent"
              android:clickable="true"
              android:focusable="true"
              android:foreground="?attr/selectableItemBackgroundBorderless"
              android:gravity="bottom"
              android:orientation="vertical"
              android:padding="16dp"
              android:theme="@style/ThemeOverlay.AppCompat.Dark">
 
    <ImageView
            android:id="@+id/nav_header_imageView"
            android:layout_width="64dp"
            android:layout_height="64dp"
            android:src="@mipmap/ic_launcher" />
 
    <TextView
            android:id="@+id/nav_header_textView"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:paddingTop="16dp"
            android:text="Chike Mgbemena"
            android:textAppearance="@style/TextAppearance.AppCompat.Body1" />
</LinearLayout>
```

Layout này chỉ đơn giản bao gồm một LinearLayout, một ImageView và một TextView :

![](https://images.viblo.asia/d97ac962-d6ea-41cc-9a72-c40360c75a68.png)

Để thêm cái menu item cho navigation drawer, chúng ta có thể sử dụng các thuộc tính app:menu , với giá trị trỏ đến menu resource file :

```
<android.support.design.widget.NavigationView
        app:menu="@menu/activity_main_drawer" />
```

```
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android">
    <group>
        <item android:id="@+id/nav_item_one"
              android:icon="@drawable/ic_drafts_black_24dp"
              android:title="Item 1" />
        <item android:id="@+id/nav_item_two"
              android:icon="@drawable/ic_drafts_black_24dp"
              android:title="Item 2" />
        <item android:id="@+id/nav_item_three"
              android:icon="@drawable/ic_drafts_black_24dp"
              android:title="Item 3" />
    </group>
 
    <group android:id="@+id/group_menu">
        <item android:id="@+id/nav_item_four"
              android:title="Item 4" />
        <item android:id="@+id/nav_item_five"
              android:title="Item 5" />
    </group>
 
    <item android:title="Title 1">
        <menu>
            <item android:id="@+id/nav_item_six"
                  android:icon="@drawable/ic_drafts_black_24dp"
                  android:title="Item 6" />
            <item android:id="@+id/nav_item_seven"
                  android:icon="@drawable/ic_drafts_black_24dp"
                  android:title="Item 7" />
        </menu>
    </item>
</menu>
```

### 3. Khởi tạo các thành phần

Tiếp theo, chúng ta sẽ khởi tạo DrawerLayout và ActionBarDrawerToggle, trong hàm onCreate() của **MainActivity.kt** :

```
import android.content.res.Configuration
import android.os.Bundle
import android.support.v4.widget.DrawerLayout
import android.support.v7.app.ActionBarDrawerToggle
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.Toolbar
import android.view.MenuItem
 
class MainActivity : AppCompatActivity() {
 
    private lateinit var drawer: DrawerLayout
    private lateinit var toggle: ActionBarDrawerToggle
 
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
 
        val toolbar: Toolbar = findViewById(R.id.toolbar_main)
        setSupportActionBar(toolbar)
 
        drawer = findViewById(R.id.drawer_layout)
 
        toggle = ActionBarDrawerToggle(this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close)
        drawer.addDrawerListener(toggle)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        supportActionBar?.setHomeButtonEnabled(true)
    }
 
    // ... 
}
```

Tiếp theo, chúng ta xử lí trong các hàm onPostCreate(), onConfigurationChanged(), và onOptionsItemSelected() như sau :

```
class MainActivity : AppCompatActivity() {
 
    // ... 
 
    override fun onPostCreate(savedInstanceState: Bundle?) {
        super.onPostCreate(savedInstanceState)
        toggle.syncState()
    }
 
    override fun onConfigurationChanged(newConfig: Configuration?) {
        super.onConfigurationChanged(newConfig)
        toggle.onConfigurationChanged(newConfig)
    }
 
    override fun onOptionsItemSelected(item: MenuItem?): Boolean {
        if (toggle.onOptionsItemSelected(item)) {
            return true
        }
        return super.onOptionsItemSelected(item)
    }
}
```

### 4. Test app

Tại thời điểm này, nếu build app, chúng ta sẽ thấy như sau :

![](https://images.viblo.asia/6b7acec7-939f-4fe6-8343-8bfcfdaa9231.png)https://images.viblo.asia/6b7acec7-939f-4fe6-8343-8bfcfdaa9231.png