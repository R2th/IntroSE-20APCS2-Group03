# Tổng quát
- Android bottom sheet là compent được mở phía dưới màn hình thiết bị để hiển thị thêm thông tin như map app(hiển thị thêm thông tin về hướng đi, địa chỉ), music app(hiển thị play bar stick).
# Một số loại Bottom Sheet
- **Persistent Bottom Sheet**: Hiển thị nội dung trong ứng dụng, nó sẽ hiển thị ở dưới màn hình, biểu diễn 1 số thông tin. Khi được mở ra, nó sẽ hiển thị toàn bộ thông tin cần thiết, ví dụ:
![](https://images.viblo.asia/cfd303c1-3cc4-4bda-99bc-b85d7cdca1c3.png)
- **Modal Bottom Sheet**: có elevation cao hơn app, thường được dùng thay thế cho menu hay dialog. ví dụ:
![](https://images.viblo.asia/d7137b43-7f50-4174-b726-c7772a4ff760.png)
# Tạo Project
- Thêm dependencies
```
build.gradle
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'com.android.support:appcompat-v7:26.1.0'
    implementation 'com.android.support:design:26.1.0'
 
    // butter knife
    compile 'com.jakewharton:butterknife:8.8.1'
    annotationProcessor 'com.jakewharton:butterknife-compiler:8.8.1'
}
```
# Tạo layout cho bottom sheet:
```
bottom_sheet.xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/bottom_sheet"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="#fff"
    android:orientation="vertical"
    android:padding="@dimen/activity_margin"
    app:behavior_hideable="true"
    app:behavior_peekHeight="56dp"
    app:layout_behavior="android.support.design.widget.BottomSheetBehavior">
 
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:layout_gravity="center_vertical"
        android:weightSum="3">
 
        <TextView
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_marginBottom="@dimen/activity_margin"
            android:layout_weight="2"
            android:text="Order Details"
            android:textColor="#444"
            android:textSize="18dp"
            android:textStyle="bold" />
 
        <TextView
            android:layout_width="0dp"
            android:gravity="right"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:textStyle="bold"
            android:textSize="15dp"
            android:text="₹435.00"></TextView>
    </LinearLayout>
 
 
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Chicken Fried Rice 1x1" />
 
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Paneer Tikka 1x2" />
 
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="@dimen/activity_margin"
        android:text="Delivery Address"
        android:textColor="#444"
        android:textStyle="bold" />
 
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Flat No 404, Skyline Apartments, Vizag - 500576" />
 
    <Button
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="30dp"
        android:background="#000"
        android:foreground="?attr/selectableItemBackground"
        android:text="PROCEED PAYMENT"
        android:textColor="#fff" />
 
</LinearLayout>
```
- *app:layout_behavior*: có tác dụng làm layout giống bottom sheet, giá trị của nó sẽ là *android.support.design.widget.BottomSheetBehavior*
- *app:behavior_peekHeight*: chiều cao của bottom sheet khi được minimized
- *app:behavior_hideable*: ẩn bottom sheet khi được swiped  down
# Implement Bottom Sheet
- Trong Main layout ta khai báo thêm layout bottom sheet
```
activity_main.xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#efefef">
 
    <android.support.design.widget.AppBarLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:theme="@style/AppTheme.AppBarOverlay">
 
        <android.support.v7.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            android:background="?attr/colorPrimary"
            app:popupTheme="@style/AppTheme.PopupOverlay" />
 
    </android.support.design.widget.AppBarLayout>
 
    <include layout="@layout/content_main" />
 
    <!-- Adding bottom sheet after main content -->
    <include layout="@layout/bottom_sheet" />
 
</android.support.design.widget.CoordinatorLayout>
```
```
content_main.xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    app:layout_behavior="@string/appbar_scrolling_view_behavior"
    tools:showIn="@layout/activity_main">
 
    <Button
        android:id="@+id/btn_bottom_sheet"
        android:layout_width="wrap_content"
        android:layout_marginTop="@dimen/activity_margin"
        android:layout_gravity="center_horizontal"
        android:layout_height="wrap_content"
        android:text="Show Bottom Sheet" />
 
    <Button
        android:id="@+id/btn_bottom_sheet_dialog"
        android:layout_width="wrap_content"
        android:layout_marginTop="@dimen/activity_margin"
        android:layout_gravity="center_horizontal"
        android:layout_height="wrap_content"
        android:text="Show Bottom Sheet Dialog" />
 
    <Button
        android:id="@+id/btn_bottom_sheet_dialog_fragment"
        android:layout_width="wrap_content"
        android:layout_gravity="center_horizontal"
        android:layout_marginTop="@dimen/activity_margin"
        android:layout_height="wrap_content"
        android:text="Show Bottom Sheet Dialog Fragment" />
 
</LinearLayout>
```
- BottomSheetBehavior  cung cấp callback và giúp làm việc tốt với CoordinatorLayout
```
MainActivity.java
public class MainActivity extends AppCompatActivity {
 
    private static final String TAG = MainActivity.class.getSimpleName();
 
    @BindView(R.id.btn_bottom_sheet)
    Button btnBottomSheet;
 
    @BindView(R.id.bottom_sheet)
    LinearLayout layoutBottomSheet;
 
    BottomSheetBehavior sheetBehavior;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ButterKnife.bind(this);
 
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
 
        sheetBehavior = BottomSheetBehavior.from(layoutBottomSheet);
 
        /**
         * bottom sheet state change listener
         * we are changing button text when sheet changed state
         * */
        sheetBehavior.setBottomSheetCallback(new BottomSheetBehavior.BottomSheetCallback() {
            @Override
            public void onStateChanged(@NonNull View bottomSheet, int newState) {
                switch (newState) {
                    case BottomSheetBehavior.STATE_HIDDEN:
                        break;
                    case BottomSheetBehavior.STATE_EXPANDED: {
                        btnBottomSheet.setText("Close Sheet");
                    }
                    break;
                    case BottomSheetBehavior.STATE_COLLAPSED: {
                        btnBottomSheet.setText("Expand Sheet");
                    }
                    break;
                    case BottomSheetBehavior.STATE_DRAGGING:
                        break;
                    case BottomSheetBehavior.STATE_SETTLING:
                        break;
                }
            }
 
            @Override
            public void onSlide(@NonNull View bottomSheet, float slideOffset) {
 
            }
        });
    }
 
    /**
     * manually opening / closing bottom sheet on button click
     */
    @OnClick(R.id.btn_bottom_sheet)
    public void toggleBottomSheet() {
        if (sheetBehavior.getState() != BottomSheetBehavior.STATE_EXPANDED) {
            sheetBehavior.setState(BottomSheetBehavior.STATE_EXPANDED);
            btnBottomSheet.setText("Close sheet");
        } else {
            sheetBehavior.setState(BottomSheetBehavior.STATE_COLLAPSED);
            btnBottomSheet.setText("Expand sheet");
        }
    }
}
```
# Modal Bottom Sheet
- Tạo layout cho modal bottom sheet
```
fragment_bottom_sheet_dialog.xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:paddingBottom="8dp"
    android:paddingTop="8dp">
 
    <!-- NOTE: This list should be displayed in a list
    instead of nested layouts -->
 
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:clickable="true"
        android:foreground="?attr/selectableItemBackground"
        android:orientation="horizontal"
        android:paddingBottom="8dp"
        android:paddingLeft="@dimen/activity_margin"
        android:paddingRight="@dimen/activity_margin"
        android:paddingTop="8dp">
 
        <ImageView
            android:layout_width="24dp"
            android:layout_height="24dp"
            android:layout_marginRight="32dp"
            android:src="@drawable/ic_remove_red_eye_black_24dp"
            android:tint="#737373" />
 
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center_vertical"
            android:text="Preview"
            android:textColor="#737373"
            android:textSize="16sp" />
 
    </LinearLayout>
 
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:clickable="true"
        android:foreground="?attr/selectableItemBackground"
        android:orientation="horizontal"
        android:paddingBottom="8dp"
        android:paddingLeft="@dimen/activity_margin"
        android:paddingRight="@dimen/activity_margin"
        android:paddingTop="8dp">
 
        <ImageView
            android:layout_width="24dp"
            android:layout_height="24dp"
            android:layout_marginRight="32dp"
            android:src="@drawable/ic_share_black_24dp"
            android:tint="#737373" />
 
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center_vertical"
            android:text="Share"
            android:textColor="#737373"
            android:textSize="16sp" />
 
    </LinearLayout>
 
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:clickable="true"
        android:foreground="?attr/selectableItemBackground"
        android:orientation="horizontal"
        android:paddingBottom="8dp"
        android:paddingLeft="@dimen/activity_margin"
        android:paddingRight="@dimen/activity_margin"
        android:paddingTop="8dp">
 
        <ImageView
            android:layout_width="24dp"
            android:layout_height="24dp"
            android:layout_marginRight="32dp"
            android:src="@drawable/ic_link_black_24dp"
            android:tint="#737373" />
 
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center_vertical"
            android:text="Get link"
            android:textColor="#737373"
            android:textSize="16sp" />
 
    </LinearLayout>
 
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:clickable="true"
        android:foreground="?attr/selectableItemBackground"
        android:orientation="horizontal"
        android:paddingBottom="8dp"
        android:paddingLeft="@dimen/activity_margin"
        android:paddingRight="@dimen/activity_margin"
        android:paddingTop="8dp">
 
        <ImageView
            android:layout_width="24dp"
            android:layout_height="24dp"
            android:layout_marginRight="32dp"
            android:src="@drawable/ic_content_copy_black_24dp"
            android:tint="#737373" />
 
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center_vertical"
            android:text="Make a Copy"
            android:textColor="#737373"
            android:textSize="16sp" />
 
    </LinearLayout>
 
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:clickable="true"
        android:foreground="?attr/selectableItemBackground"
        android:orientation="horizontal"
        android:paddingBottom="8dp"
        android:paddingLeft="@dimen/activity_margin"
        android:paddingRight="@dimen/activity_margin"
        android:paddingTop="8dp">
 
        <ImageView
            android:layout_width="24dp"
            android:layout_height="24dp"
            android:layout_marginRight="32dp"
            android:src="@drawable/ic_email_black_24dp"
            android:tint="#737373" />
 
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center_vertical"
            android:text="Email a Copy"
            android:textColor="#737373"
            android:textSize="16sp" />
    </LinearLayout>
</LinearLayout>
```
- Tạo Fragment BottomSheetFragment 
```
BottomSheetFragment.java
public class BottomSheetFragment extends BottomSheetDialogFragment {
    public BottomSheetFragment() {
        // Required empty public constructor
    }
 
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }
 
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_bottom_sheet_dialog, container, false);
    }
}
```
- Trong MainActivity ta sẽ mở bottom sheet dialog như sau
```
MainActivity.java
MainActivity.java
/**
 * showing bottom sheet dialog
 */
@OnClick(R.id.btn_bottom_sheet_dialog)
public void showBottomSheetDialog() {
    View view = getLayoutInflater().inflate(R.layout.fragment_bottom_sheet_dialog, null);
 
    BottomSheetDialog dialog = new BottomSheetDialog(this);
    dialog.setContentView(view);
    dialog.show();
}
 
 
/**
 * showing bottom sheet dialog fragment
 * same layout is used in both dialog and dialog fragment
 */
@OnClick(R.id.btn_bottom_sheet_dialog_fragment)
public void showBottomSheetDialogFragment() {
    BottomSheetFragment bottomSheetFragment = new BottomSheetFragment();
    bottomSheetFragment.show(getSupportFragmentManager(), bottomSheetFragment.getTag());
}
```
[nguồn](https://www.androidhive.info/2017/12/android-working-with-bottom-sheet/)