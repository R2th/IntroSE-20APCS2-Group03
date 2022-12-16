Ở các phiên bản Android N trở đi, giao diện thông báo Notification (màn hình chứa thông tin trang thái kết nối wifi, bluetooth ... và thông báo của các app hoặc system) có một vài cải tiến về mặt giao diện và trải nghiệm người dùng. Một trong những thay đổi đó là giao diện Quick Setting :D.

![](https://images.viblo.asia/38b33ddc-ad23-4782-a527-6ae5e873f320.png)

[Xem preview màn hình notification trên Android N](https://www.youtube.com/watch?time_continue=16&v=LpPKz3uRZyc)

Như các bạn thấy trong video, ở android N, khi người dùng kéo mở màn hình Notification sẽ xuất hiện 1 dòng rút gọn các icon setting, ta có thể tùy chọn các setting này mà k cần phải kéo toàn bộ màn hình thông báo xuống nữa (ở Android M hoặc như các phiên bản trước sẽ show toàn bộ màn hình notification).

Mặc định thì các icon rút gọn này là các setting được ưu tiên cao như wifi	, 3g-4g, bluetooth, chế độ tiết kiệm pin ... Tất nhiên là ta có thể tùy chỉnh vị trí các setting này ở vị trí mong muốn, hoặc thay thế bằng các setting khác. Nếu ta tap vào các icon này và giữ lâu một chút sẽ đưa ta vào màn hình setting của app tương ứng

Một trong những tính năng mà mình thấy khá hay và có tính tùy biến cao chính là việc edit và tạo các setting này trên màn hình thông báo. Click vào icon edit sẽ hiện ra list các setting có trong máy (bao gồm của app hệ thống và app người dùng cài đặt). Ta có thể giữ và kéo thả các setting mong muốn trên màn hình thông báo. Đây là tính năng đã có trên Android M nhưng thao tác không dễ dàng và còn nhiều lỗi, trên Android N đã cải thiện các thao tác này mượt hơn.

Ở bài viết này, ta sẽ cùng làm qua một vài ví dụ đơn giản để tạo được các setting icon này.

Đầu tiên, ta sẽ làm quen với khái niệm **Tile Service**, đây là class chính tạo nên các icon setting như bạn đã thấy trên màn hình thông báo của smartphone. Nó là service sẽ giúp ta kết nối đến app khi ta thay đổi các setting tương ứng.

## Update the Tile UI

Ta đăng kí Quick Settings tile ở file AndroidManifest.xml, và nó cần có đầy đủ permission và filter như hình sau

```
<!-- TileService for "Update the Tile UI" section -->

<service
    android:name=".QuickSettingsService"
    android:icon="@drawable/ic_android_black_24dp"
    android:label="@string/tile_label"
    android:permission="android.permission.BIND_QUICK_SETTINGS_TILE">
    <intent-filter>
        <action 
            android:name="android.service.quicksettings.action.QS_TILE" />
    </intent-filter>
</service>
```

Ở class QuickSettingsService sẽ extend TileService, ở sự kiện onClick() ta sẽ viết method cập nhật UI của tile.
```
@Override
public void onClick() {
    Log.d("QS", "Tile tapped");
    updateTile();
}

private static final String SERVICE_STATUS_FLAG = "serviceStatus";
private static final String PREFERENCES_KEY = 
    "com.google.android_quick_settings";

private void updateTile() {

    Tile tile = this.getQsTile();
    boolean isActive = getServiceStatus();

    Icon newIcon;
    String newLabel;
    int newState;

    // Change the tile to match the service status.
    if (isActive) {

        newLabel = String.format(Locale.US,
                       "%s %s",
                       getString(R.string.tile_label),
                       getString(R.string.service_active));

        newIcon = Icon.createWithResource(getApplicationContext(),
                      R.drawable.ic_android_black_24dp);

        newState = Tile.STATE_ACTIVE;

    } else {
        newLabel = String.format(Locale.US,
                "%s %s",
                getString(R.string.tile_label),
                getString(R.string.service_inactive));

        newIcon =
                Icon.createWithResource(getApplicationContext(),
                        android.R.drawable.ic_dialog_alert);

        newState = Tile.STATE_INACTIVE;
    }

    // Change the UI of the tile.
    tile.setLabel(newLabel);
    tile.setIcon(newIcon);
    tile.setState(newState);

    // Need to call updateTile for the tile to pick up changes.
    tile.updateTile();
}
```

Để lưu trạng thái active của setting, ta có thể lưu flag ở SharedPreference, kiểm tra trạng thái của service để cập nhật UI mới nhất

```
// Access storage to see how many times the tile
// has been tapped.
private boolean getServiceStatus() {

    SharedPreferences prefs =
            getApplicationContext()                        
                .getSharedPreferences(PREFERENCES_KEY, MODE_PRIVATE);

    boolean isActive = prefs.getBoolean(SERVICE_STATUS_FLAG, false);
    isActive = !isActive;

    prefs.edit().putBoolean(SERVICE_STATUS_FLAG, isActive).apply();

    return isActive;
}
```

## Mở dialog từ Tile

Tạo tạo thêm 1 service nữa để thực hiện ví dụ này
```
@SuppressLint("Override")
@TargetApi(Build.VERSION_CODES.N)
public class QSDialogService
   extends TileService {
    
    // Class definition
}
```

Một dialog fragment được mờ từ tile cần setup thêm một vài công đoạn bởi nó không có host activity. Vì vậy khi tạo dialog, hệ thống sẽ không gọi method onAttach() là nơi mà ta thường implements event handler, hơn nữa ta không có method findViewById() để truy cập đến các view con trong layout

Ta có thể tạo một dialog Builder class để implements xử lí các sự kiện onclick trên dialog
```
private boolean isTileActive;

@Override
public void onClick(){

   // Get the tile's current state.
   Tile tile = getQsTile();
   isTileActive = (tile.getState() == Tile.STATE_ACTIVE);

   QSDialog.Builder dialogBuilder =
           new QSDialog.Builder(getApplicationContext());

   QSDialog dialog = dialogBuilder
           .setClickListener(new QSDialog.QSDialogListener() {

               @Override
               public void onDialogPositiveClick(DialogFragment dialog) {
                   Log.d("QS", "Positive registed");

                   // The user wants to change the tile state.
                   isTileActive = !isTileActive;
                   updateTile();
               }

               @Override
               public void onDialogNegativeClick(DialogFragment dialog) {
                   Log.d("QS", "Negative registered");

                   // The user is cancelled the dialog box.
                   // We can't do anything to the dialog box here,
                   // but we can do any cleanup work.
               }
           })
           .create();

   // Pass the tile's current state to the dialog.
   Bundle args = new Bundle();
   args.putBoolean(QSDialog.TILE_STATE_KEY, isTileActive);

   this.showDialog(dialog.onCreateDialog(args));
}
```

## Mở Activity từ Tile

Ở ví dụ ta cần lưu ý xử lí đến case đó là trước khi khởi động intent, ta cần xem xem thiết bị có đang bị khóa hay không. Tile Service cung cấp method để kiểm tra trạng thái này là hàm isLocked(). 

Khi đã thỏa mãn điều kiện máy unlock, khi mở activity thì ta muốn thanh hiên thị thông báo đồng thời được đóng lại. Ta có method startActivityAndCollapse() để đóng menu và start activity.

```
// Check to see if the device is currently locked.
boolean isCurrentlyLocked = this.isLocked();

if (!isCurrentlyLocked) {

    Resources resources = getApplication().getResources();

    Tile tile = getQsTile();
    String tileLabel = tile.getLabel().toString();
    String tileState = (tile.getState() == Tile.STATE_ACTIVE) ?
                    resources.getString(R.string.service_active) :
                    resources.getString(R.string.service_inactive);

    Intent intent = new Intent(getApplicationContext(),
        ResultActivity.class);

    intent.putExtra(ResultActivity.RESULT_ACTIVITY_NAME_KEY,
        tileLabel);
    intent.putExtra(ResultActivity.RESULT_ACTIVITY_INFO_KEY,
        tileState);
    intent.addFlag.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

    startActivityAndCollapse(intent);
}
```

Vậy là ta đã tìm hiểu thêm về một trong những tính năng mới của Android N. Một số ứng dụng hiện nay đã có thêm cài đặt Quick Setting cho app để tăng thêm trải nhiệm người dùng như Shazam (bật tùy chọn auto kiểm tra nhạc), một số app bản đồ (giúp bật tracking nhanh ngay trên thanh noti ) hay như một số ứng dụng nghe nhạc (tùy chọn bật floating lyrics khi nghe nhac). Hy vọng qua các ví dụ đơn giản này sẽ giúp các bạn biết thêm về các tính năng mới của Android N và có thêm tùy chọn cải thiện trải nghiệm người dùng cho app của bạn (dance)

Bạn có thể truy cập github sample của google để hiểu rõ hơn tại [đây](https://github.com/googlecodelabs/android-n-quick-settings.git)