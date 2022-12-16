# I. Lời giới thiệu
Trong bài viết này mình xin giới thiệu đến các bạn một bộ công cụ in-all-one chuyên về xử lý nội dung video hỗ trợ đa nền tảng **(Android, Android TV, iOS, Web-app, WebOS, TizenOS)** có tên gọi là [UizaSDK](https://github.com/uizaio). **Uiza** có thể dùng để xây dựng ứng dụng streaming video với khả năng tương thích và mở rộng mạnh mẽ. Mình sẽ hướng dẫn các bạn tích hợp **Uiza** với nền tảng Android trong bài viết này (các bạn có thể tham khảo với các nền tảng khác trên github)
# II. Nội dung chính
### 1> Tích hợp thư viện
**Bước 1:** Thêm JitPack repository vào gradle
```
allprojects {
      repositories {
         maven { url 'https://jitpack.io' }
      }
}
```
**Bước 2:** Thêm dependency
```
defaultConfig {  
    multiDexEnabled  true
}  
dependencies {  
    //for playing video VOD, LIVE  
    implementation 'com.github.uizaio.uiza-android-sdk-player:uizacoresdk:[lasted-release-number]'        
    
    //for live broadcaster  
    implementation 'com.github.uizaio.uiza-android-sdk-player:uizalivestream:[lasted-release-number]'  
}
```

Xem phiên bản mới nhất [tại đây](https://github.com/uizaio/uiza-android-sdk-player/blob/dev/CHANGELOG.md)

### 2> Khởi tạo SDK
Đầu tiên, các bạn trong trang chủ của [Uiza](https://uiza.io/) tạo 1 tài khoản để lấy appId và apiKey. Làm theo hướng dẫn [tại đây](https://docs.uiza.io/#get-api-key) để lấy token.

Trong file Application, các bạn khởi tạo work-space:
```
public class App extends MultiDexApplication {
        @Override
        public void onCreate() {
            super.onCreate();
            UZUtil.initWorkspace(this, api, token, appId);
        }
    }
```
Trong file manifest:
```
<application
  android:name=".App "  <!-- important -->
>
```
### 3> Gọi API
**Bước 1:** Chúng ta cần extend activity/fragment như sau
```
public class YourActivity extends BaseActivity{
}
public class YourFragment extends BaseFragment{
}
```
và chắc chắn phải thêm dòng code sau
```
UZUtil.setCasty(this);
```
trước super.onCreate(savedInstanceState); trong onCreate() của activity.

**Bước 2:** Gọi API sử dụng phương thức sau
```
UZService service = UZRestClient.createService(UZService.class);
subscribe(service.getListMetadata(), new ApiSubscriber<ResultGetListMetadata>() {
    @Override
  public void onSuccess(ResultGetListMetadata resultGetListMetadata) {
    }

    @Override
  public void onFail(Throwable e) {
    }
});
```
Cách gọi với các [API](https://docs.uiza.io/#introduction) còn lại cũng tương tự như trên.
### 4> Cách play video
File layout
```
<uizacoresdk.view.rl.video.UZVideo
  android:id="@id/uiza_video"
  android:layout_width="match_parent"
  android:layout_height="wrap_content" />
```
Tạo nội dung trong file MainActivity
```
public class MainActivity extends BaseActivity implements UZCallback{
   ...
}
```
Manifest
```
<activity
  android:name=".MainActivity "
  android:configChanges="keyboard|keyboardHidden|orientation|screenSize|screenLayout|smallestScreenSize|uiMode" />
```
Trong onCreate()
```
uzVideo = (UZVideo) findViewById(R.id.uiza_video);
uzVideo.setUZCallback(this);
UZUtil.initEntity(activity, uzVideo, "put the entity id here");
```
Play nội dung playlist/folder
```
UZUtil.initPlaylistFolder(activity, uzVideo, "put the playlist/folder id here");
```
Xử lý trong các sự kiện của activity life cycle
```
@Override
public void onDestroy() {
    super.onDestroy();
    uzVideo.onDestroy();
}

@Override
public void onResume() {
    super.onResume();
    uzVideo.onResume();
}

@Override
public void onPause() {
    super.onPause();
    uzVideo.onPause();
}

@Override
public void onStart() {
    super.onStart();
    uzVideo.onStart();
}

@Override
public void onStop() {
    super.onStop();
    uzVideo.onStop();
}

@Override
public void onActivityResult(int requestCode, int resultCode, Intent data) {
    if (requestCode == Constants.CODE_DRAW_OVER_OTHER_APP_PERMISSION) {
        if (resultCode == Activity.RESULT_OK) {
            uzVideo.initializePiP();
        } 
    } else {
        super.onActivityResult(requestCode, resultCode, data);
    }
}
```
### 5> Customize giao diện
**Bước 1:** Tạo layout **uiza_controller_skin_custom_main.xml** như [ví dụ](https://github.com/uizaio/uiza-android-sdk-player/blob/dev/sample/src/main/res/layout/uiza_controller_skin_custom_main.xml).

**Bước 2:** Tạo **layout uiza_controller_skin_custom_detail.xml** như [ví dụ](https://github.com/uizaio/uiza-android-sdk-player/blob/dev/sample/src/main/res/layout/uiza_controller_skin_custom_detail.xml)
- Trong file này, chúng ta có thể chỉnh sửa tùy ý thêm, xóa, sửa các thành phần của layout. Chúng ta sẽ không thay đổi id của các view liên quan đến SDK.

**Bước 3:** Trong **onCreate()** chúng ta thêm dòng code
```
@Override  
protected void onCreate(@Nullable Bundle savedInstanceState) {  
    UZUtil.setCasty(this);  
    UZUtil.setCurrentPlayerId(R.layout.uiza_controller_skin_custom_main);  
    super.onCreate(savedInstanceState);
}
```
### 6> Xử lý livestream với UizaSDK
Layout:
```
<uizalivestream.uiza.UZLivestream
  android:id="@+id/uiza_livestream"  
  android:layout_width="match_parent"  
  android:layout_height="match_parent" />
	Class LivestreamBroadcasterActivity
public class LivestreamBroadcasterActivity extends BaseActivity implements UZLivestream.Callback {
...
}
```
Phương thức onCreate()
```
getWindow().setFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON, WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);  
getWindow().setFlags(WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED, WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED);
uzLivestream = (UZLivestream) findViewById(R.id.uiza_livestream);  
uzLivestream.setCallback(this);
```
Phương thức onResume()
```
@Override  
protected void onResume() {  
    uzLivestream.onResume();  
    super.onResume();  
}
```
Thêm dòng code trong surfaceChanged(UZLivestream.StartPreview startPreview);
```
startPreview.onSizeStartPreview(1280, 720);
```
Phương thức onPermission()
```
@Override  
public void onPermission(boolean areAllPermissionsGranted) {  
    if (areAllPermissionsGranted) {  
       uzLivestream.setId("Put the entity id for livestream here");
    }
}
```
Bắt đầu livestream
```
if (uzLivestream.prepareAudio() && uzLivestream.prepareVideoHD(false)) {  
    uzLivestream.startStream(uzLivestream.getMainStreamUrl());  
}
```
Bắt đầu livestream và lưu thành file MP4
```
if (uzLivestream.prepareAudio() && uzLivestream.prepareVideoHD(false)) {  
    uzLivestream.startStream(uzLivestream.getMainStreamUrl(), true);  
}
```
Kết thúc streaming 
```
uzLivestream.stopStream();
```
Chuyển đổi camera:
```
uzLivestream.switchCamera();
```
# III> Kết
Hiện tại **SDK** vẫn đang trong quá trình phát triển nên vẫn còn xảy ra một vài issue, tuy nhiên đội ngũ phát triển vẫn đang miệt mài hoàn thiện **SDK**. Hy vọng với nội dung bài viết này, các bạn sẽ có thêm kinh nghiệm về xử lý nội video để áp dụng cho các ý tưởng của mình.