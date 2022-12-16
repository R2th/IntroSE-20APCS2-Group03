Một trong component mới trong Android Material Components là đã được giới thiệu trong[ Google I/O2018](https://events.google.com/io/) là [BottomAppBar](https://material.io/develop/android/components/bottom-app-bar/). 
Trong phần đầu của [bài viết trước](https://viblo.asia/p/tim-hieu-ve-bottomappbar-trong-material-components-cua-android-63vKj0dMl2R) tôi đã giới thiệu với các bạn những thứ tuyệt với về BottomAppBar. Trong bài viết này, tôi sẽ tiếp tục giới thiệu tới các bạn những thứ tuyệt với khác chúng ta sẽ làm cùng với BottomAppBar.
 Các bạn cũng biết rằng các Components chắc chắn  không phải là static trong app. Chúng có thể được di chuyển, biến đổi hoặc khởi động một action. Chúng có các behaviors. Trong bài viết này, chúng ta sẽ cùng nhau thảo luận về việc thực hiện chi tiết những behavior đã được suggestions cho BottomAppBar, những cái đã được trình bày trong trang [BottomAppBar Material Guidelines](https://material.io/design/components/app-bars-bottom.html#behavior) 
 ![](https://images.viblo.asia/2ab92761-1474-4e11-903c-be88acb0e6bc.png)
 
## Behavior
**Layout**
Behavior đầu tiên trong hướng dẫn là trên layout của BottomAppBar. 

Đây là [những gì được suggest](https://material.io/design/assets/1KJSld6h82fzkcafrHCDFPOITibpWxF-5/behavior-layout-primary.mp4).

Để hỗ trợ cho những phần khác nhau của một app, layout và actions của bottom app bar có thể bị thay đổi để cho phù hợp với mỗi màn hình.

![](https://images.viblo.asia/645e7515-df2e-428f-a579-9e3964effb7e.gif)

Dựa trên hướng dẫn này, nó là được suggest để sử dụng BottomAppBar layout cho việc hiển thị một vài action trên action menu với một FAB tại trung tâm của màn hình chính.Trong màn hình thứ 2 đã được khởi động bở màn hình chính, BottomAppBar layout lên bao gồm một FAB tại vị trí cuối cùng của appbar và một số menu item bổ sung. Việc dịch chuyên layout của hai trường hợp lên được sử ly một cách hợp lý(xem hình bên trên)
Chúng ta hãy  nhìn, làm thế nào chúng ta thực hiện behavior này. Chúng ta cần tạo hai file xml bên dưới res/menu cho action menu của mỗi màn hình.
tạo 1 file xml có tên là bottomappbar_menu_primary.xml với nội dùng như bên dưới:

```xml
<?xml version="1.0" encoding="utf-8"?>

<menu xmlns:tools="http://schemas.android.com/tools"

xmlns:app="http://schemas.android.com/apk/res-auto"

xmlns:android="http://schemas.android.com/apk/res/android">

<item

android:id="@+id/app_bar_search"

android:icon="@drawable/baseline_search_white_24"

android:title="@string/action_search"

app:showAsAction="ifRoom"/>

</menu>
```

Tạo file xml thứ 2 có tên là bottomappbar_menu_secondary.xml

```xml
<?xml version="1.0" encoding="utf-8"?>

<menu xmlns:tools="http://schemas.android.com/tools"

xmlns:app="http://schemas.android.com/apk/res-auto"

xmlns:android="http://schemas.android.com/apk/res/android">

<item

android:id="@+id/app_bar_mail"

android:icon="@drawable/baseline_mail_white_24"

android:title="@string/action_mail"

app:showAsAction="ifRoom"/>

<item

android:id="@+id/app_bar_delete"

android:icon="@drawable/baseline_delete_white_24"

android:title="@string/action_delete"

app:showAsAction="ifRoom"/>

<item

android:id="@+id/app_bar_archieve"

android:icon="@drawable/baseline_archive_white_24"

android:title="@string/action_archieve"

app:showAsAction="ifRoom"/>

</menu>
```

Khi hành động dịch chuyển màn hình là được khởi động  ví dụ TOGGLE SSCREEN Button là được Click trong trường hợp của chúng ta. BottomAppBar layout bao gồm action menu và FAB nên được thay đổi. Bên dưới là code cho BottomAppBar cho behavior thay đổi layout từ màn hình chính tới màn hình thứ 2.

```
// Hide navigation drawer icon  
bottom_app_bar._navigationIcon_ = null

// Move FAB from the center of BottomAppBar to the end of it  
bottom_app_bar._fabAlignmentMode_ = BottomAppBar._FAB_ALIGNMENT_MODE_END_

// Replace the action menu  
bottom_app_bar.replaceMenu(_bottomappbar_menu_secondary_)

// Change FAB icon  
fab?.setImageDrawable(_baseline_reply_white_24_)
```
Nếu bạn muốn làm dịch chuyển với animation, thì các bạn có thể bổ sung thêm code.

**Scrolling**

Scrolling là một behavior quan trọng cho các components chẳng hạn như BottomAppBar. Trong trang Material Design guidelines có suggest behavior cho trường hợp này như sau: Scroll up thì bottom app bar có thể suất hiện hoặc ẩn đi.
Hình bên dưới là chứng minh cùng với việc thực hiện cho việc hide on scroll behavior của BottomAppBar.

![](https://images.viblo.asia/5548e37c-4ddd-4a1e-9e35-aeeeb40fb5bd.gif)

Để enable được behavior này, BottomAppBar và FAB lên cùng được đặt trong [CoordinatorLayout](https://developer.android.com/reference/android/support/design/widget/CoordinatorLayout) trong file layout. Sau đó chúng ta enable hideOnScroll và thiết lập scroll flags cho BottomAppBar như bên dưới:

```
<com.google.android.material.bottomappbar.BottomAppBar  
    android:id="@+id/bottom_app_bar"  
    android:layout_width="match_parent"  
    android:layout_height="wrap_content"  
    android:layout_gravity="bottom"  
    app:fabAlignmentMode="center"  
    **app:hideOnScroll="true"  
    app:layout_scrollFlags="scroll|enterAlways"**/>
```
Đoạn code trên là đủ cho behavior hide on scroll trên BottomAppBar.

**Elevation**

Mỗi một component trong thế giới Material Design có một độ cao tương ứng nhưng trong thế giới vật lý của chúng ta. BottomAppBar có một độ cao (elevation)  khoảng 8dp nơi nội dùng có 0dp và FAB có 12dp độ cao trong điều kiện thường. 2 Component , chúng ta đã đề cập trong bài viết này là BottomNavigationDrawer và Snackbar có độc cao là 16dp và 6dp tương ứng.
Bình thường snackbar là một thành phần dùng để notify bật lên cho người dùng từ bottom của màn hình. Tuy nhiên nếu màn hình có BottomAppBar hoặc BottomNavigationBar, thì behavior của snackbar lên thay đổi. Trong những trường hợp này, Snackbar lên được hiển thị ở trên component dưới cùng ví dụ như BottomAppBar. Bên dưới là hình minh hoạ và code liên quan cho việc thự hiện :

![](https://images.viblo.asia/cf8420ca-7cd2-48c6-bb2e-31785d452b98.gif)

Trong MainActivity
```java
private fun displayMaterialSnackBar() {

val marginSide = 0

val marginBottom = 550

val snackbar = Snackbar.make(

coordinatorLayout2,

"FAB Clicked",

Snackbar.LENGTH_LONG

).setAction("UNDO") { }

// Changing message text color

snackbar.setActionTextColor(ContextCompat.getColor(this, R.color.colorSnackbarButton))

val snackbarView = snackbar.view

val params = snackbarView.layoutParams as CoordinatorLayout.LayoutParams

params.setMargins(

params.leftMargin + marginSide,

params.topMargin,

params.rightMargin + marginSide,

params.bottomMargin + marginBottom

)

snackbarView.layoutParams = params

snackbar.show()

}
```
Như trên chúng tôi đã đề cập NavigationDrawer có độ cao là là 16dp.
Bên dưới là bottom navigation drawer thự hiện:

![](https://images.viblo.asia/fc6439ef-2ce3-48fd-9faa-2cdf2563fe1c.gif)

Việc thự hiện chi tiết cho behavior này là như bên dưới. Một file menu cho [NavigaitonView](https://developer.android.com/reference/android/support/design/widget/NavigationView)
gọi là bottom_nav_drawer_menu.xml

```xml

<menu xmlns:android="http://schemas.android.com/apk/res/android"

xmlns:app="http://schemas.android.com/apk/res-auto">

<group android:checkableBehavior="none">

<item

android:id="@+id/nav1"

android:icon="@drawable/baseline_mail_white_24"

android:title="@string/nav_item1" />

<item

android:id="@+id/nav2"

android:icon="@drawable/baseline_bookmark_white_24"

android:title="@string/nav_item2" />

<item

android:id="@+id/nav3"

android:icon="@drawable/baseline_message_white_24"

android:title="@string/nav_item3" />

<item

android:id="@+id/nav4"

android:icon="@drawable/baseline_note_white_24"

android:title="@string/nav_item4" />

<item

android:id="@+id/nav5"

android:icon="@drawable/baseline_location_on_white_24"

android:title="@string/nav_item5" />

<item

android:id="@+id/nav6"

android:icon="@drawable/baseline_sync_white_24"

android:title="@string/nav_item6" />

<item

android:id="@+id/nav7"

android:icon="@drawable/baseline_cloud_upload_white_24"

android:title="@string/nav_item7" />

<item

android:id="@+id/nav8"

android:icon="@drawable/baseline_favorite_white_24"

android:title="@string/nav_item8" />

<item

android:id="@+id/nav9"

android:icon="@drawable/baseline_chrome_reader_mode_white_24"

android:title="@string/nav_item9" />

<item

android:id="@+id/nav10"

android:icon="@drawable/baseline_select_all_white_24"

android:title="@string/nav_item10" />

<item

android:id="@+id/nav11"

android:icon="@drawable/baseline_sort_white_24"

android:title="@string/nav_item11" />

<item

android:id="@+id/nav12"

android:icon="@drawable/baseline_access_time_white_24"

android:title="@string/nav_item12" />

<item

android:id="@+id/nav13"

android:icon="@drawable/baseline_data_usage_white_24"

android:title="@string/nav_item13" />

</group>

</menu>
```

Một file cho bottom navigation drawer fargment lên được tạo như bên dưới

```xml
<?xml version="1.0" encoding="utf-8"?>

<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"

xmlns:app="http://schemas.android.com/apk/res-auto"

xmlns:tools="http://schemas.android.com/tools"

android:id="@+id/navigation_view_layout"

android:layout_width="match_parent"

android:layout_height="wrap_content"

app:behavior_hideable="true"

app:layout_behavior="@string/bottom_sheet_behavior">

<com.google.android.material.navigation.NavigationView

android:id="@+id/navigation_view"

android:layout_width="match_parent"

android:layout_height="wrap_content"

android:layout_gravity="bottom"

android:layout_marginTop="4dp"

android:paddingBottom="40dp"

app:layout_constraintEnd_toEndOf="parent"

app:layout_constraintHorizontal_bias="0.0"

app:layout_constraintStart_toStartOf="parent"

app:layout_constraintTop_toBottomOf="@+id/view2"

app:menu="@menu/bottom_nav_drawer_menu"

app:theme="@style/NavigationDrawerStyle" />

<TextView

android:id="@+id/textView"

android:layout_width="wrap_content"

android:layout_height="wrap_content"

android:layout_marginStart="12dp"

android:layout_marginTop="16dp"

android:fontFamily="@font/rubik_medium"

android:text="@string/bottom_sheet_name"

android:textColor="@color/colorAccent"

android:textSize="18sp"

android:textStyle="bold"

app:layout_constraintStart_toEndOf="@+id/imageView"

app:layout_constraintTop_toTopOf="parent" />

<TextView

android:id="@+id/textView2"

android:layout_width="wrap_content"

android:layout_height="wrap_content"

android:layout_marginTop="2dp"

android:text="@string/bottom_sheet_email"

android:textColor="@color/colorAccent"

app:layout_constraintStart_toStartOf="@+id/textView"

app:layout_constraintTop_toBottomOf="@+id/textView" />

<ImageView

android:id="@+id/imageView"

android:layout_width="48dp"

android:layout_height="48dp"

android:layout_marginStart="24dp"

android:background="@drawable/baseline_account_circle_black_48"

app:layout_constraintStart_toStartOf="parent"

app:layout_constraintTop_toTopOf="@+id/textView" />

<View

android:id="@+id/view2"

android:layout_width="match_parent"

android:layout_height="2dip"

android:layout_marginTop="15dp"

android:background="#447e7e7e"

app:layout_constraintEnd_toEndOf="parent"

app:layout_constraintHorizontal_bias="0.0"

app:layout_constraintStart_toStartOf="parent"

app:layout_constraintTop_toBottomOf="@+id/textView2" />

<ImageView

android:id="@+id/close_imageview"

android:layout_width="24dp"

android:layout_height="24dp"

android:layout_marginTop="8dp"

android:layout_marginEnd="16dp"

android:layout_marginBottom="8dp"

android:background="@drawable/baseline_close_black_24"

android:visibility="gone"

app:layout_constraintBottom_toBottomOf="@+id/textView2"

app:layout_constraintEnd_toEndOf="parent"

app:layout_constraintTop_toTopOf="@+id/textView" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

File layout này có chứa Navigation View và các component khác. Để inflate file layout này chsung ta cần một fragment class được extend từ BottomSheetDialogFragment như bên dưới:

```
class BottomNavigationDrawerFragment: BottomSheetDialogFragment() {

override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {

return inflater.inflate(R.layout.fragment_bottom_navigation_drawer, container, false)

}
override fun onActivityCreated(savedInstanceState: Bundle?) {

super.onActivityCreated(savedInstanceState)

navigation_view.setNavigationItemSelectedListener { menuItem ->

// Bottom Navigation Drawer menu item clicks

when (menuItem.itemId) {

// R.id.nav1 -> context!!.toast(getString(R.string.nav1_clicked))

}

// Add code here to update the UI based on the item selected

// For example, swap UI fragments here

true

}

}

}
```

Khi navigation drawer controll icon là được click, một thể hiện của fragment là được tạo và hiển thị như cho bởi đoạn code bên dưới:

```
verride fun onOptionsItemSelected(item: MenuItem?): Boolean {

when (item!!.itemId) {

android.R.id.home -> {

val bottomNavDrawerFragment = BottomNavigationDrawerFragment()

bottomNavDrawerFragment.show(supportFragmentManager, bottomNavDrawerFragment.tag)

}

}

return true

 }
```
Các bạn có thể download source code [tại đây](https://github.com/oLeQuangHoa/BottomAppBarBehavior)