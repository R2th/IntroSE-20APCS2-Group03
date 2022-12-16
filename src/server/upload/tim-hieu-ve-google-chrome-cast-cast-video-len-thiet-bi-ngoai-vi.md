Phần bài viết nối tiếp [phần 1 về Chrome Cast](https://viblo.asia/p/tim-hieu-ve-google-chrome-cast-1VgZv6A7ZAw), trong phần này mình sẽ giới thiệu với các bạn về cách thực hiện cast 1 video  lên thiết bị Chrome Cast. 

Như các bạn đã biết thì ứng dụng Chrome Cast sẽ chia làm 2 phần, 1 phần nằm dưới smart phone (**sender app**) và 1 phần năm trên thiết bị nhận Cast (**receiver app**). Ở trong bài viết này mình chỉ chủ yếu hướng dẫn các bạn viết phần code trên SmartPhone còn phần  **receiver app** thì mình sẽ dựa trên r[eceiver app mà google đã viết sẵn](https://codelabs.developers.google.com/codelabs/cast-receiver#0).

# 1. Khởi tạo Project

Trong Projet demo này mình sẽ có 2 màn hình chính, 1 là màn hình list các video và 1 phần màn hình play video. Cấu trúc sử dụng là 1 Activity và nhiều Fragment.

![](https://images.viblo.asia/7f80b849-7df3-4626-aad6-7863a4756805.png)
![](https://images.viblo.asia/c3b0988c-1eff-45f9-94f1-404491cf88e9.png)

Cấu trúc project khá đơn giản đúng ko nào. phần cáu trúc này mình sẽ dựa trên phần [code demo của google](https://codelabs.developers.google.com/codelabs/cast-receiver#0) và có chỉnh sửa đi 1 chút.

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
                xmlns:app="http://schemas.android.com/apk/res-auto"
                android:layout_width="match_parent"
                android:layout_height="match_parent">

    <androidx.appcompat.widget.Toolbar
            android:id="@+id/toolbar"
            android:layout_height="wrap_content"
            android:layout_width="match_parent"
            android:minHeight="?attr/actionBarSize"
            android:background="?attr/colorPrimary"
            app:theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar"
            app:popupTheme="@style/ThemeOverlay.AppCompat.Light"/>

    <FrameLayout
            android:id="@+id/browse"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:layout_below="@+id/toolbar"
            android:layout_alignParentBottom="true"
            android:layout_marginTop="8dp"/>

    <fragment
            android:id="@+id/castMiniController"
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"
            android:layout_alignParentBottom="true"
            android:visibility="gone"
            class="com.google.android.gms.cast.framework.media.widget.MiniControllerFragment"/>
</RelativeLayout>
```

Phần **FrameLayout** ở đây sẽ là nơi mình add các Fragment vào đó. Trong này  các bạn thấy có 1 fragment tên là **castMiniController** rất hay ho đúng không. Chút nữa mình sẽ nói thêm về phần này để các bạn hiểu rõ hơn.

File **build.gradle**

```gradle
    implementation 'androidx.mediarouter:mediarouter:1.2.2'
    implementation 'androidx.recyclerview:recyclerview:1.2.0'
    implementation 'com.google.android.gms:play-services-cast-framework:20.0.0'
```


Trong màn hình detail mình sẽ có 1 VIdeoView và 1 Controller để điều kiển hoạt động của Video (phần này mình sẽ không nói chi tiết, mục đích chính của chúng ta là thực hiện Cast Video cơ mà).

```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
                xmlns:app="http://schemas.android.com/apk/res-auto"
                android:id="@+id/container"
                android:layout_width="match_parent"
                android:layout_height="match_parent">

    <VideoView
            android:id="@+id/videoView1"
            android:layout_width="wrap_content"
            android:layout_height="200dp"
            android:layout_alignParentLeft="true"
            android:layout_alignParentRight="true"
            android:layout_below="@+id/toolbar"
            android:layout_centerInParent="true"/>
    ...
    
</RelativeLayout>
```

Vậy là cơ bản đã xong phần View, giờ mình sẽ đi chi tiết vào từng phần để các bạn có thể hiểu rõ hơn.

# 2. Cast Media
Các bạn có thể tham khảo thêm phần khai báo này [ở đây](https://viblo.asia/p/tim-hieu-ve-google-chrome-cast-1VgZv6A7ZAw#_6-thiet-lap-va-cau-hinh-sender-app-5)
## 2.1 Adding the Cast button
Nếu các bạn chưa hiểu về **Cast button** thfi có thể[ tham khảo tại đây](https://viblo.asia/p/tim-hieu-ve-google-chrome-cast-1VgZv6A7ZAw#_62-hien-thi-button-cast-7).

```Java
public boolean onCreateOptionsMenu(Menu menu) {
    super.onCreateOptionsMenu(menu);
    getMenuInflater().inflate(R.menu.browse, menu);
    mediaRouteMenuItem = CastButtonFactory.setUpMediaRouteButton(getApplicationContext(), menu, R.id.media_route_menu_item);
    return true;
}
```

![](https://images.viblo.asia/4569a186-8f58-4292-b587-914045300cf7.png)

Việc thực hiện thêm **Cast button** này ở Menu của Activity nên trong các màn hình từ List đến phần Play video thì **Cast button** đều sẽ được hiển thị.

## 2.2 CastOptionsProvider 

```Java
public class CastOptionsProvider implements OptionsProvider {

    @Override
    public CastOptions getCastOptions(Context context) {
        NotificationOptions notificationOptions = new NotificationOptions.Builder()
                .setTargetActivityClassName(ExpandedControlsActivity.class.getName())
                .build();
        CastMediaOptions mediaOptions = new CastMediaOptions.Builder()
                .setNotificationOptions(notificationOptions)
                .setExpandedControllerActivityClassName(ExpandedControlsActivity.class.getName())
                .build();

        return new CastOptions.Builder()
                .setReceiverApplicationId(context.getString(R.string.app_id))
                .setCastMediaOptions(mediaOptions)
                .build();
    }

    @Override
    public List<SessionProvider> getAdditionalSessionProviders(Context context) {
        return null;
    }
}
```

trong** AndroidManifest.xml**
```xml
        <activity
                android:name=".expandedcontrols.ExpandedControlsActivity"
                android:label="@string/app_name"
                android:launchMode="singleInstance"
                android:theme="@style/Theme.CastVideosDark"
                android:screenOrientation="portrait">
        </activity>
        <meta-data
                android:name="com.google.android.gms.cast.framework.OPTIONS_PROVIDER_CLASS_NAME"
                android:value="com.google.sample.cast.refplayer.CastOptionsProvider" />
```

ở đây mình có sử dụng thêm 1 Activity nữa là **ExpandedControlsActivity**. Activity này sẽ là phẩn hiển thị mở rộng của chức năng Cast khi mà các bạn thực hiện Cast video. Chút nữa mình cũng sẽ nói về phần này chi tiết hơn.

```Java
public class ExpandedControlsActivity extends ExpandedControllerActivity {

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        super.onCreateOptionsMenu(menu);
        getMenuInflater().inflate(R.menu.expanded_controller, menu);
        CastButtonFactory.setUpMediaRouteButton(this, menu, R.id.media_route_menu_item);
        return true;
    }
}
```

# 3. Thực hiện Play và Cast Video

 Nếu bạn muốn Play video và Cast Video thì thì bạn cần tìm hiểu và làm theo các khái niệm sau đây.
 
 -   Khởi tạo [MediaInfo](https://developers.google.com/android/reference/com/google/android/gms/cast/MediaInfo) chứa các thông tin cần thiết cho quá trình truyền và nhận Video.
 -   Kết nối tới **Cast device** thông qua chung mạng Wifi
 -   Truyền **MediaInfo** cho **receiver app**  để **receiver application** có thể đọc được các thông tin cần thiết về Video
 -   Theo dõi trãng thái của Video
 -   Gửi và nhận thông tin để truyền tương tác của người dùng lên **receiver application**

Để thực hiện việc quản lý trạng thái khi Play video mình cần định nghĩa ra 2 chế độ. 
```Java
public enum PlaybackLocation {
    LOCAL,
    REMOTE
}
```

Khi Play ở chế độ **LOCAL** thì toàn bộ việc load dữ liệu cũng như là hiển thị Video sẽ được thực hiện trên ứng dụng của bạn. Play ở chế độ **REMOTE** thì công việc nặng nhọc về load và hiển thị video sẽ do  **receiver application** đảm nhận và khi đó video ở dưới ứng dụng của bạn cần dc Stop lại. Công việc của bạn khi video play ở chế độ này chủ yếu là quản lý trạng thái của Video (Seek, pause, play...).


## 3.1 Quản lý Cast session

Như đã nói ở phần trước [Cast session](https://viblo.asia/p/tim-hieu-ve-google-chrome-cast-1VgZv6A7ZAw#_63-gui-tin-nhan-toi-thiet-bi-chromecast-8) được tạo ra bởi Framework, nên việc khởi tạo chúng ta không cần quan tâm lắm, việc của chúng ta ở đây là bắt và xử lý các sự kiện khi mà **Cast session** thay đổi.

```Java
private void setupCastListener() {
        mSessionManagerListener = new SessionManagerListener<CastSession>() {

            @Override
            public void onSessionEnded(CastSession session, int error) {
                onApplicationDisconnected();
            }

            @Override
            public void onSessionResumed(CastSession session, boolean wasSuspended) {
                onApplicationConnected(session);
            }

            @Override
            public void onSessionResumeFailed(CastSession session, int error) {
                onApplicationDisconnected();
            }

            @Override
            public void onSessionStarted(CastSession session, String sessionId) {
                onApplicationConnected(session);
            }

            @Override
            public void onSessionStartFailed(CastSession session, int error) {
                onApplicationDisconnected();
            }

            @Override
            public void onSessionStarting(CastSession session) {
            }

            @Override
            public void onSessionEnding(CastSession session) {
            }

            @Override
            public void onSessionResuming(CastSession session, String sessionId) {
            }

            @Override
            public void onSessionSuspended(CastSession session, int reason) {
            }
        };
    }
```

Có 2 trạng thái các bạn cần quan tâm nhất đó là 
- **onSessionStarted** khi bắt đầu thực hiện kết nối đến **receiver application**, ở đây mình sẽ truyền **MediaInfo**  thông qua Framework để **receiver application** có thể play video
- **onSessionEnded** khi bắt đầu kết thưc việc kết nối với **receiver application**, ở đây mình nhận sự kiện ngắt kết nối và cho play lại video dưới ứng dụng.

Còn khi nào các phương thức này được gọi thì các bạn có thể xem lại phần mình đã giới thiệu [ở đây](https://viblo.asia/p/tim-hieu-ve-google-chrome-cast-1VgZv6A7ZAw#_63-gui-tin-nhan-toi-thiet-bi-chromecast-8)

```Java
    private void onApplicationConnected(CastSession castSession) {
        mCastSession = castSession;
        if (null != mSelectedMedia) {

            if (mPlaybackState == PlaybackState.PLAYING) {
                mVideoView.pause();
                loadRemoteMedia(mSeekbar.getProgress(), true);
                return;
            } else {
                mPlaybackState = PlaybackState.IDLE;
                updatePlaybackLocation(PlaybackLocation.REMOTE);
            }
        }
        updatePlayButton(mPlaybackState);
        invalidateOptionsMenu();
    }

    private void onApplicationDisconnected() {
        updatePlaybackLocation(PlaybackLocation.LOCAL);
        mPlaybackState = PlaybackState.IDLE;
        mLocation = PlaybackLocation.LOCAL;
        updatePlayButton(mPlaybackState);
        invalidateOptionsMenu();
    }
```

Các function **updatePlaybackLocation**, **updatePlayButton**,  **invalidateOptionsMenu** chủ yếu để dùng cập nhật lại các tráng của của View dưới ứng dụng, nên chắc mình sẽ không nói chi tiết ở phần này. Mà mình sẽ đi chi tiết ở Func **loadRemoteMedia(mSeekbar.getProgress(), true)** đây chính là Func nhằm đảm nhiệm nhiệm vụ truyền thông tin về Video lên Cast Device.

```Java
    private void loadRemoteMedia(int position, boolean autoPlay) {
        if (mCastSession == null) {
            return;
        }
        final RemoteMediaClient remoteMediaClient = mCastSession.getRemoteMediaClient();
        if (remoteMediaClient == null) {
            return;
        }
        
        remoteMediaClient.load(new MediaLoadRequestData.Builder()
                .setMediaInfo(buildMediaInfo())
                .setAutoplay(autoPlay)
                .setCurrentTime(position)
                .build());
    }
 ```

```Java
private void loadRemoteMedia(int position, boolean autoPlay) {
}
```
Trong **CastSession** có 1 **RemoteMediaClient** để quản lý việc thực hiện thao tác với thiết vị Cast Device thông qua Framework và việc của lập trình viên chúng ta là đưa các thông tin đầu vào đầy đủ và cần thiết cho Object này.

```java
// Đây là nơi mình truyền các thông tin cơ bản về Video thông qua Object MediaInfo
setMediaInfo(buildMediaInfo())
```
```Java
// Truyền thời gian mà bạn muốn Video bắt đầu Play. Nếu không set thì Video mặc định sẽ play từ đầu
.setCurrentTime(position)
```

```Java
 remoteMediaClient.load()
```
sẽ thực hiện việc truyền toàn bộ thông tin đã được cấu hình lên Cast Device, ngoài ra bạn cũng có thể call **remoteMediaClient.pause()**,  **remoteMediaClient.play()**, **remoteMediaClient.seek(long currentTime)** để thực hiện việc điều kiển thao tác của người dùng lên **Cast Device**.

```Java
    // private MediaItem mSelectedMedia;
    
    private MediaInfo buildMediaInfo() {
        MediaMetadata movieMetadata = new MediaMetadata(MediaMetadata.MEDIA_TYPE_MOVIE);

        movieMetadata.putString(MediaMetadata.KEY_SUBTITLE, mSelectedMedia.getStudio());
        movieMetadata.putString(MediaMetadata.KEY_TITLE, mSelectedMedia.getTitle());
        movieMetadata.addImage(new WebImage(Uri.parse(mSelectedMedia.getImage(0))));
        movieMetadata.addImage(new WebImage(Uri.parse(mSelectedMedia.getImage(1))));

        return new MediaInfo.Builder(mSelectedMedia.getUrl())
                .setStreamType(MediaInfo.STREAM_TYPE_BUFFERED)
                .setContentType("videos/mp4")
                .setMetadata(movieMetadata)
                .setStreamDuration(mSelectedMedia.getDuration() * 1000)
                .build();
    }
```
    
Ở đây có Object **mSelectedMedia**, dữ liệu này được truyền từ màn hình List vào và nó chứa các thông tin cơ bản cần thiết của video VD: Title, url, duration, image thumb ... Bây giờ chúng ta sẽ đi chi tiết hơn ở từng Func

Phần **movieMetadata** này là phần chứa thông tin cơ bản của Video khi truyền lên **receiver application**. Các bạn lưu ý các key "MediaMetadata.KEY_SUBTITLE, MediaMetadata.KEY_TITLE vvv) này cũng phải được định nghĩa tương ứng trên **receiver application** và do ở đây mình viết Sender app dựa trên receiver application của google nên mình sử dụng lại các Key đã được định nghĩa trong **MediaMetadata**. Nếu các bạn tự xây dựng **receiver application** riêng của mình thì các key này có thể thay đổi.


```Java
MediaInfo.Builder(mSelectedMedia.getUrl())
```
Như ở phần trước mình có nêu thì thực chất ứng dụng Chrome Cast là thực hiện play 1 video theo 1 Url có sẵn "chứ không có gì quá cao siêu cả", mà để play 1 video thì chúng ta cần 1 Url đúng không nào. Url này có thể là link Video, Image tùy theo ứng dụng của bạn muốn hiển thị cái gì đến người dùng trên Cast Device.

```Java
.setStreamType(MediaInfo.STREAM_TYPE_BUFFERED)
.setContentType("videos/mp4")
```
Type của Video, do ở đây mình truyền lên 1 video có sẵn nên mình để type là "STREAM_TYPE_BUFFERED", nếu bạn muốn Cast lên 1 link Live stream thì bạn có thể truyền lên type "STREAM_TYPE_LIVE". Nhưng các bạn lưu ý, khi thực hiện Live Stream thì "ContentType" thường sẽ là **HSL**.

```Java
 .setStreamDuration(mSelectedMedia.getDuration() * 1000)
```

Độ dài của Video, lưu ý phần này cần khác 0. Nếu type các bạn truyền lên là "STREAM_TYPE_LIVE" thì phần này có thể không cần truyền lên hoặc truyền lên với Duration = 0.

# 3. Mini controller,  ExpandedControlsActivity và NotificationOptions
## 3.1 Mini controller
Ở phần khai  báo Activity các bạn thấy mình có thêm 1 Fragment tên là **castMiniController**

```xml
<fragment
            android:id="@+id/castMiniController"
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"
            android:layout_alignParentBottom="true"
            android:visibility="gone"
            class="com.google.android.gms.cast.framework.media.widget.MiniControllerFragment"/>
```

Yêu cầu bắt buộc của ChromeCast là phải có **castMiniController** để framework có thể hiển thị Mini play video khi bạn thực hiện Cast video.

Việc ẩn hiện **Mini controller** này là framework làm tự động hoàn toàn, bạn chỉ việc khai báo thêm 1 fragment ở activity.xml thôi. Mặc định ở phần view này sẽ có 1 ảnh thumb, tên video và tên ứng dụng Cast được truyền vào trong phần **movieMetadata** đã khai báo ở trên.

![](https://images.viblo.asia/0b833ba8-ca99-46f4-a3ac-7a3abd999909.png)

## 3.2 ExpandedControlsActivity
Khi Click vào phần **Mini controller** này, thì hệ thống sẽ tự động mở ra 1 Activity để hiển thị phần play video mở rộng khi bạn đang thực hiện Chrome Cast. Activity này được extends **ExpandedControllerActivity** của hệ thống.

```Java
public class ExpandedControlsActivity extends ExpandedControllerActivity {

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        super.onCreateOptionsMenu(menu);
        getMenuInflater().inflate(R.menu.expanded_controller, menu);
        CastButtonFactory.setUpMediaRouteButton(this, menu, R.id.media_route_menu_item);
        return true;
    }
}
```

Khi extends từ hệ thống ở đây mình có thể thêm 1 button Cast vào phần menu để có thể kết thúc thực hiện  Chrome Cast. Nếu đang ở trong màn hình này mà bạn thực hiện kết thúc Chrome Cast thì activity này sẽ được tự động đóng lại và trở về màn hình ban đầu. 

## 3.3 NotificationOptions

Nếu bạn muốn hiển thị 1 **Notification** trong quá trình thực hiện **Chrome Cast** thì bạn chỉ cần khai báo thêm ở trong **CastOptionsProvider** như phần trên mình có giới thiệu. Việc hiển thị hay tắt Notification này cũng được framework thực hiện tự động. 

![](https://images.viblo.asia/b674dea1-74c9-43f2-a743-9edac540d9a2.png)

Như ảnh trên thì phần **Notification** này cũng cho phép người dùng thao tác cơ bản như Play, Pause video. cũng như là Icon X để có thể kết thúc thực hiện Chrome Cast.


Các bạn lưu ý, việc thực hiện Cast Video này là hệ thống thực hiệện gần như hoàn toàn và trên 1 session riêng gần như không có liên quan đến ứng dụng và vòng đời của ứng dụng. Nên khi bạn đang thực hiện Cast Video mà app bạn bị Crash hoặc bạn tắt app đi thì việc thực hiện Cast vẫn được thực hiện hoàn toàn, vì toàn bộ thông tin cần thiết để **receiver app** play 1 video đã được **Load** lên từ trước đó rồi.


Trên đây mình đã giới thiệu cơ bản với các bạn về **framework Chrome Cast** và việc làm thế nào để có thể cast 1 video lên **Cast Device**. Lưu ý là toàn bộ phần **receiver app** trong này mình lấy từ ví dụ của Google, nên có 1 số thuộc tình mình cần bắt buộc tuân thủ theo chuẩn đã được để ra của Google.

Link liên kết:
- https://codelabs.developers.google.com/codelabs/cast-videos-android#0
- https://codelabs.developers.google.com/codelabs/cast-receiver