![](https://images.viblo.asia/edf295a9-cb40-4601-9d35-61e77c070a5c.jpg)

# Giới thiệu 
Xin chào các bạn, bài viết ngày hôm nay mình sẽ giới thiệu tới các bạn một tính năng rất hay tới từ Google - Google Cast.


-----


**Google Cast là gì ?** 

-----


Đây là giao thức độc quyền được phát triển bởi Google cho phép thiết bị di động hay máy tính cá nhân có thể phát và kiểm soát các nội dung âm thanh/ video trực tuyến trên các thiết bị tương thích. Có thể là trên smart TV hay hệ thống âm thanh gia đình. Hay nói 1 cách ngắn gọn là bạn có thể play video trên điện thoại cá nhân và có thể xem trên 1 màn hình lớn của TV. Rất thú vị phải không ?:wink:

![](https://images.viblo.asia/3b557069-c523-4e8c-9621-bb67b5e54b6f.png)

Chắc hẳn các bạn cũng đã đâu đó gặp được biểu tượng trên phải không ? Vâng, đó chính là Cast Button :grin: Một số app thông dụng cũng đã có tính năng này , tiêu biểu như là YouTube.

Vào ngày 03/02/2014 thì Google Cast SDK chính thức được phát hành cho phép các bên thứ 3 sửa đổi  và tích hợp và phần mềm của họ một cách chủ động nhất. Cơ hội để các anh em developer có thể tự làm app với Google Cast là đây :))

Phần tiếp theo mình sẽ hướng dẫn 1 vài bước cơ bản để chúng ta có thể lập trình với cast trên thiết bị Android.

# Chuẩn bị
Để thực hiện được mục tiêu của bài viết này cũng phải có đầu tư tí xíu :laughing:
Hiện tại chúng ta sẽ phải cần thêm Cast Device.
![](https://images.viblo.asia/21d66782-f448-46e2-93a8-97fb892bcf2b.jpeg) Đây là 1 thiết bị rời, có nhiệm vụ làm trung gian giao tiếp giữa thiết bị gửi ( app ) và thiết bị nhận ( nơi phát video ).

Hoặc bây giờ cũng đã có các thiết bị smart TV có hỗ trọ cast build-in, chúng ta sẽ không cần phải dùng đến device rời như trên.

Một số thông tin cài đặt thiết bị các bạn tham khảo ở đây nhé 
https://developers.google.com/cast/docs/developers

# Xây dựng Android send app
Ở đây mình sẽ đưa ra các bước cơ bản để có thể chuyển tiếp video/ âm thanh qua cast device. Còn trước đó các bạn cần có app đã phát được video rồi nhé !

## B1: Thêm thư viện 
Trước tiên chúng ta cần update Google Play Service. Sau đó thêm các dependences sau 
```
implementation 'com.android.support:mediarouter-v7:27.1.1'
implementation 'com.google.android.gms:play-services-cast-framework:16.1.0'

```

## B2: Thiết lập Cast Context 
Cast FrameWork sẽ có 1 context global gọi là **CastContext**. Nó sẽ điều phối mọi hoạt động cast dữ liệu. Để khởi tạo context này chúng ta cần dùng đến **OptionsProvider** 

### B2.1 Tạo OptionsProvider
```
public class CastOptionsProvider implements OptionsProvider {

    @Override
    public CastOptions getCastOptions(Context context) {
        return new CastOptions.Builder()
                .setReceiverApplicationId(context.getString(R.string.app_id))
                .build();
    }

    @Override
    public List<SessionProvider> getAdditionalSessionProviders(Context context) {
        return null;
    }
}
```

Chúng ta sẽ tạo ra 1 class impliment OptionsProvider. Các bạn cần lưu ý fun **getCastOptions**. Đây chính là fun cho phép đưa ra các thiết lập thông qua cast builder. Ở đây có rất nhiều thuộc tính, nhưng cái quan trọng bắt buộc phải có là Receiver App Id. Nó chính là id của app nhận chạy trên cast device. Nhờ có dòng config này thì app gửi của chúng ta mới tìm được các cast device phù hợp.


Có một vấn đề như sau. Khi các bạn tự phát triển app nhận, thì các bạn sẽ cần đăng kí với google để có thể lấy được Id của nó. < https://cast.google.com/publish/#/signup >

Còn nếu bạn chấp nhận việc sử dụng app nhận mặc định, tức là không có quyền sửa đổi hay nâng cấp gì thì có thể truyền ID mặc định sau vào trong config trên.

```
CastMediaControlIntent.DEFAULT_MEDIA_RECEIVER_APPLICATION_ID
```

### B2.2 Thêm metadata 
Sau khi đã tạo class provider và config thành công, chúng ta cần thêm dữ liệu vào thẻ meta-data trong Manifest như sau 
```
<meta-data
android:name="com.google.android.gms.cast.framework.OPTIONS_PROVIDER_CLASS_NAME"
android:value="com.google.sample.cast.refplayer.CastOptionsProvider" />
```
Với value chính là đường dẫn tới class provider mà chúng ta tạo ở trên.

### B2.3 Khởi tạo cast context 
```
private CastContext mCastContext;

protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.video_browser);
    setupActionBar();

    mCastContext = CastContext.getSharedInstance(this);
}
```

Sau khi đã thêm meta-data thì chỉ cần dùng fun **getSharedInstance** để tạo context này.

Một vấn đề cần lưu ý ở đây. Ngay từ tên function các bạn đã thấy từ share. Ý nghĩa của nó là gì. Khi các bạn đang ở màn hình A, play video rồi cast lên TV. Xong sau đó các bạn chuyển qua màn B tương tác, và vẫn muốn remote được video đã được play ở A. Thì ở cả activity A và B ta đều phải dùng 1 thể hiện của CastContext. Hàm này có ý nghĩa như vậy. Đương nhiên google cũng đưa ra lời khuyên là nên khởi tạo CastContext ở mọi activity trong app của bạn để có thể remote tới video được cast một cách thuận tiện nhất.

## B3. Thêm Cast Button

Button này được thiết kế sẵn trong FrameWork. Nó có nhiệm vụ tìm kiếm Receiver App ( thuộc cast device ) mà nằm chung 1 mạng với sender app của chúng ta. 

Sẽ có 2 cách để thêm button này


**Cách 1:** Dùng Item Menu 
Thêm item sau vào file xml menu 
```
<item
    android:id="@+id/media_route_menu_item"
    android:title="@string/media_route_menu_title"
    app:actionProviderClass="android.support.v7.app.MediaRouteActionProvider"
    app:showAsAction="always"/>
```

Sau đó trong activity 
```
private MenuItem mediaRouteMenuItem;

public boolean onCreateOptionsMenu(Menu menu) {
    super.onCreateOptionsMenu(menu);
    getMenuInflater().inflate(R.menu.browse, menu);
    mediaRouteMenuItem = CastButtonFactory.setUpMediaRouteButton(getApplicationContext(), menu, R.id.media_route_menu_item);
    return true;
}
```

**Cách 2:** Thêm trực tiếp vào layout

```
<android.support.v7.app.MediaRouteButton
       android:id="@+id/media_route_button"
       android:layout_width="wrap_content"
       android:layout_height="wrap_content"
       android:layout_weight="1"
       android:mediaRouteTypes="user"
       android:visibility="gone" />
```

Trong activity cũng setup tương tự 
```
@Override
protected void onCreate(Bundle savedInstanceState) {
   super.onCreate(savedInstanceState);
   setContentView(R.layout.activity_layout);

   mMediaRouteButton = (MediaRouteButton) findViewById(R.id.media_route_button);
   CastButtonFactory.setUpMediaRouteButton(getApplicationContext(), mMediaRouteButton);

   mCastContext = CastContext.getSharedInstance(this);
}

```

OK vậy là đến đây, khi ấn button này, thì danh sách các app nhận nếu cùng mạng sẽ được hiển thị lên cho phép ta lựa chọn.

## B4. Cast Video

Trước khi cast & play video, ta cần biết được cơ chế của nó.
1. Thứ nhất:  SDK framework sẽ cho phép cast video thông qua RemoteMediaClient được quản lý bởi CastSession.
2. Thứ 2 : FrameWork không sử dụng các model object của chúng ta. Ta cần map các thông tin video cần thiết sang 1 loại object khác mà nó có thể hiểu - đó là **MediaInfor**

Chúng ta sẽ lần lượt tìm hiểu các vấn đề này.
### CastSession 
Đây là một tập hợp các bước từ khi người dùng click chọn CastButton cho tới khi video được play và cast thành công. Các bạn có thể thấy trong một chuỗi này có rất nhiều công đoạn. Tự tiếp nhận Cast device từ lựa chọn người dùng, kết nối app gửi và app nhận, khởi tạo và mapping video,... 
Trong chuỗi đó, app của chúng ta rất có thể sẽ bị gián đoạn, có thể là do chủ quan hoặc cũng có thể là khách quan do app khác. Và chúng ta cần quan tâm xử lý hết chúng ?

Đương nhiên là vậy, nhưng không phải một cách thủ công. CastSession sẽ cung cấp một loạt các callBack phù hợp để ta dễ dàng quản lý. 

```
private CastSession mCastSession;
private SessionManagerListener<CastSession> mSessionManagerListener;

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
        public void onSessionStarting(CastSession session) {}

        @Override
        public void onSessionEnding(CastSession session) {}

        @Override
        public void onSessionResuming(CastSession session, String sessionId) {}

        @Override
        public void onSessionSuspended(CastSession session, int reason) {}

```

### RemoteMediaClient && MediaInfor

Sau khi đã thiết lập CastSession thành công. Thì từ session đó, ta sẽ lấy ra được một đối tượng RemoteMediaClient có nhiệm vụ load và cast video của ta lên app nhận tương ứng.

```
private void loadRemoteMedia(int position, boolean autoPlay) {
    if (mCastSession == null) {
        return;
    }
    RemoteMediaClient remoteMediaClient = mCastSession.getRemoteMediaClient();
    if (remoteMediaClient == null) {
        return;
    }
    remoteMediaClient.load(buildMediaInfo(), autoPlay, position);
}
```

Chúng ta để ý thấy fun load chính là có nhiệm vụ load video tương ứng.

Tuy nhiên như đã nói ở trên, framework sẽ chỉ hiểu được 1 object là **MediaInfor**. Vì vậy bạn sẽ cần có 1 bước là mapping video object sang kiểu MediaInfor.

CHúng ta sẽ có fun buildMediaInfor() chính là tham số thứ nhất của load() như sau :
```
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

Ok đến đây là chúng ta đã hoàn thành các bước cơ bản để play và cast video rồi đó :laughing:

# Tổng Kết 
Trên đây là các bước cơ bản để chúng ta có thể làm việc với GoogleCast trên một ứng dụng Android. Hy vọng bài viết sẽ giúp ích với các bạn. Ngoài ra các bạn có thể truy cập trang offical doc (https://developers.google.com/cast/docs/android_sender/) để tham khảo thêm một số tính năng khác của bộ SDK này nhé. Cảm ơn các bạn đã đón đọc bài viết của mình ^.^