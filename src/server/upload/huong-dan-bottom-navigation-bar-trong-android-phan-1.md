![](https://images.viblo.asia/123ff94a-9e20-4c63-91a1-c16a4679a8a8.png)

Một trong những bổ sung mới nhất cho Material Design là Bottom Navigation Bar. Nó giống như TabBar mà bạn nhìn thấy trên IOS và chức năng  nó cũng tương tự như thế

![](https://images.viblo.asia/cab895d9-42c2-49c6-8965-5319d814f0e2.png)

Trước khi vào hướng dẫn, chúng ta cũng tìm hiểu Bottom Navigation là gì. 

### Bottom Navigation là gì ?

Bottom navigation bars dễ dàng chuyển đổi giữa các Top - level views trong  một lần chạm. - [Material Design spec](https://material.io/design/components/bottom-navigation.html#usage)

Điều này giúp nhà phát triển lựa chọn Bottom Navigation thay vì lựa chon Navigator Drawer.
Nếu bạn có 4 mục điều hướng , Đó là trường hợp lý tưởng sử dụng Bottom Navigation. Nếu không thì dùng Navigator Drawer . Chúng ta không muốn Bottom Navigation quá chật chội và rối mắt đúng không.

Khi nào sử dụng Bottom Navigation
Bottom Navigation sử dụng tốt nhất là khi bạn chỉ có từ 3 -> 5 top-level .

Các lợi ích mà Bottom Navigation có như sau :
+ Luôn luôn hiện hữu : Luôn hiện dù cho bạn chọn màn hình điều hướng nào
+ Đơn giản hơn: ít hơn các lựa chọn và dễ nhớ hơn

Đơn giản hơn để nhìn vào Bottom Navigation
Nếu mọi thứ có vẻ quá phức tạp , chúng ta lên chú trọng vào màn hình điều hướng như sau :
+ 2 màn hình : [Tabs](https://blog.iamsuleiman.com/material-design-tabs-with-android-design-support-library/)
+ 3->5 màn hình : Bottom Navigation
+ 5 và cao hơn : Navigation Drawer

Bây giờ chúng ta tiếp tục nào

Bắt đầu 
Tôi phải thừa nhận Bottom Navigation trông đẹp và tuyệt vời. Bài hướng dẫn này chúng ta sẽ sử dụng [thư viện](https://github.com/aurelhubert/ahbottomnavigation) để demo cho cách bạn xem

Đầu tiên chúng ta thêm thư viện vào app/build.gradle của bạn

```
dependencies {
    compile 'com.aurelhubert:ahbottomnavigation:0.1.3'
}
```

Chú ý : Tôi hy vọng ứng dụng của bạn minSdk > 14. Bởi vì thư viện này chỉ hỗ trợ từ 14 và cao hơn thế.

Thêm Bottom Navigation tới layout của bạn như sau :
```
<LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical"
        tools:context="home.learn.hmt.the_weather_kotlin.screen.home.HomeActivity"
        >
        <com.aurelhubert.ahbottomnavigation.AHBottomNavigation
            android:id="@+id/ah_tab_contain"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            app:layout_constraintTop_toTopOf="parent"
            tools:layout_height="@dimen/dp_48"
            />
        <FrameLayout
            android:id="@+id/layout_contain"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            app:layout_constraintTop_toBottomOf="@id/ah_tab_contain"
            />
 </LinearLayout>
```

FrameLayout với ID là @+id/layout_contain nơi để hiển Fragment của chúng ta.

### Chúng ta cùng chuyển qua code Kotlin nào

Mỗi Bottom Navigation bar item hiển thị 1 Fragment khác nhau cho mỗi item

Ít nhất, bạn phải cung cấp icon và tiêu đề. Hoặc với bất kì từ nào trong String và Drawable

Mình sẽ tạo 1 với tên : menu_tab_bar.xml

```
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">
    <item
        android:id="@+id/tab_home"
        android:icon="@drawable/ic_launcher_foreground"
        android:title="@string/tab_current"
        app:showAsAction="ifRoom"/>
    <item
        android:id="@+id/tab_inbox"
        android:enabled="true"
        android:icon="@drawable/ic_launcher_foreground"
        android:title="@string/tab_hour"
        app:showAsAction="ifRoom"/>
    <item
        android:id="@+id/tab_trips"
        android:enabled="true"
        android:icon="@drawable/ic_launcher_foreground"
        android:title="@string/tab_map"
        app:showAsAction="ifRoom"/>
</menu>
```

Trong activity : HomeActivity
Chúng ta sẽ khai báo :
```

  private lateinit var ahNavigation: AHBottomNavigation
  private lateinit var ahBottomNavigationAdapter: AHBottomNavigationAdapter

fun setUpBottomNavigation() {
    ahNavigation = mBinding.ahTabContain
    ahBottomNavigationAdapter = AHBottomNavigationAdapter(this, R.menu.menu_tab_bar)
    ahBottomNavigationAdapter.apply {
      setupWithBottomNavigation(ahNavigation)
    }
    ahNavigation.apply {
      titleState = AHBottomNavigation.TitleState.ALWAYS_SHOW
      setOnTabSelectedListener({ position, _ ->
        onNavigationBotItemClick(position)
      })
    }
  }
  
  private fun onNavigationBotItemClick(position: Int): Boolean {
    var fragment: Fragment = when (position) {
      Tab_Position.TAB_CURRENT.res -> CurrentWeatherFragment.newInstance()
      Tab_Position.TAB_HOUR.res -> HourWeatherFragment.newInstance()
      Tab_Position.TAB_MAP.res -> MapFragment.newInstance()
      else -> Fragment()
    }

    fragmentTransaction.replace(R.id.layout_contain, fragment, "SOMETAG")
    fragmentTransaction.commit()
    return true
  }
  
  
  enum class Tab_Position(val res: Int) {
    TAB_CURRENT(0),
    TAB_HOUR(1),
    TAB_MAP(2)
  }
```
  
Bài sau mình sẽ hướng dẫn cách bạn về các style trong Bottom Navigation
  
Tài liệu tham khảo : https://blog.iamsuleiman.com/bottom-navigation-bar-android-tutorial/

Bạn có thể xem qua source của mình để có cái nhìn chi tiết hơn : https://github.com/haiminhtran810/The_Weather_Kotlin/blob/develop/app/src/main/java/home/learn/hmt/the_weather_kotlin/screen/home/HomeActivity.kt

Cảm ơn bạn đã xem qua bài biết của mình.