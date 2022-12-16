Android Mutimedia Framework hỗ trợ phát nhiều loại media phổ biến, để bạn có thể dễ dàng tích hợp âm thanh, video và hình ảnh vào ứng dụng của mình. Bạn có thể phát nhạc hoặc video từ các file được lưu trữ trong resource của ứng dụng (raw resource), từ các file độc lập trong hệ thống file hoặc từ luồng dữ liệu lấy được qua kết nối mạng, tất cả đều sử dụng API MediaPlayer.

MediaPlayer dường như rất dễ sử dụng, nhưng  nó có thể phức tạp hơn bạn nghĩ rất nhiều. Vậy hãy cùng nhau xem qua tổng quan về MediaPlayer ở dưới đây nhé!
# 1.Khái niệm cơ bản
Các lớp sau được sử dụng để phát nhạc và video trong  Android :
* **MediaPlayer:**
Lớp này là API chính để phát âm thanh và video.
* **AudioManager:**
Lớp này quản lý nguồn âm thanh và đầu ra âm thanh trên thiết bị (loa, tai nghe).

Trước khi bắt đầu phát triển ứng dụng của bạn bằng MediaPlayer, hãy đảm bảo manifest của bạn có các khai báo thích hợp để cho phép sử dụng các tính năng liên quan.

* **Internet Permission:** Nếu bạn đang sử dụng MediaPlayer để phát nội dung trên internet, ứng dụng của bạn phải yêu cầu quyền truy internet.
    ```
    <uses-permission android:name="android.permission.INTERNET" />
    ```
* **Wake Lock Permission:** Nếu ứng dụng  của bạn cần giữ màn hình không bị mờ hoặc tiến trình không sleep.
     ```
   <uses-permission android:name="android.permission.WAKE_LOCK" />
    ```
# 2.Sơ đồ trạng thái
Sơ đồ sau đây cho thấy vòng đời và trạng thái của đối tượng MediaPlayer, các hình bầu dục đại diện cho các trạng thái mà một đối tượng MediaPlayer có thể nằm trong. Các mũi tên biểu diễn các phương thức điều khiển chuyển tiếp trạng thái đối tượng MediaPlayer.

Có hai loại mũi tên:

* Các mũi tên với một đầu mũi tên đơn đại diện cho việc gọi phương thức đồng bộ

* Các mũi tên với một đầu mũi tên kép đại diện cho việc  gọi phương thức không đồng bộ

![](https://images.viblo.asia/39e3d393-5a6c-40e4-9ebe-c1a62a52d15c.gif)

Từ sơ đồ trạng thái này, ta có thể thấy rằng một đối tượng MediaPlayer có các trạng thái sau:
## Idle và End
Khi đối tượng MediaPlayer vừa được tạo bằng cách sử dụng **new** hoặc sau khi **reset()** được gọi, nó đang ở trạng thái **Idle** , và sau khi **release()** được gọi, nó đang ở trạng thái **End**. Giữa hai trạng thái này là vòng đời của đối tượng MediaPlayer.

Có một sự khác biệt  quan trọng giữa đối tượng MediaPlayer mới được khởi tạo và đối tượng MediaPlayer sau khi **reset()** được gọi. Đó là lỗi khi bạn gọi các phương thức như : **getCurrentPosition(), getDuration(), getVideoHeight(), getVideoWidth(), setAudioAttributes(AudioAttributes), setLooping(boolean), setVolume(float, float), pause(), start(), stop(), seekTo(long, int), prepare() or prepareAsync()** ở trạng thái **Idle** :

* Nếu bất kỳ phương thức nào trong số này được gọi ngay sau khi đối tượng MediaPlayer được khởi tạo,call back **OnErrorListener.onError()** sẽ không được gọi bởi hệ thống và trạng thái đối tượng vẫn không thay đổi. 
* Nếu các phương thức này được gọi ngay sau khi **reset()**, call back **OnErrorListener.onError()** sẽ được gọi  và đối tượng sẽ được chuyển sang trạng thái **Error**.

Một lưu ý đó là khi một khi một đối tượng MediaPlayer không còn được sử dụng nữa, bạn nên gọi  **release()** ngay lập tức để các tài nguyên được sử dụng liên kết với đối tượng MediaPlayer có thể được giải phóng ngay lập tức. Khi đối tượng MediaPlayer ở trạng thái **End**, nó không thể được sử dụng nữa và không có cách nào để đưa nó trở lại trạng thái nào khác.

Hơn nữa, các đối tượng MediaPlayer được tạo bằng cách sử dụng **new** ở trạng thái **Idle**, trong khi các đối tượng được tạo **create** KHÔNG ở trạng thái **Idle**. Thực tế, các đối tượng đang ở trạng thái **Prepared** nếu việc tạo bằng cách sử dụng phương thức **create** thành công.
## Error
Đôi khi, một số thao tác điều khiển có thể bị lỗi do nhiều lý do khác nhau. Trong tất cả các điều kiện lỗi này, Media Player yêu cầu người dùng cung cấp phương thức **OnErrorListener.onError()** nếu một **OnErrorListener** đã được đăng ký trước bằng :
```
setOnErrorListener(android.media.MediaPlayer.OnErrorListener)
```

* Điều quan trọng cần lưu ý là khi một lỗi xảy ra, đối tượng MediaPlayer sẽ rơi vào  trạng thái **Error**  ngay cả khi **OnErrorListener** chưa được đăng ký với ứng dụng.
* Để tái sử dụng một đối tượng MediaPlayer ở trạng thái **Error** và phục hồi từ lỗi, **reset()** có thể được gọi để khôi phục đối tượng về trạng thái **Idle** của nó.
* **IllegalStateException**  được ném ra để ngăn chặn các lỗi lập trình như gọi **prepare()**, **preparAsync()** hoặc một trong các phương thức overload của **setDataSource()** trong trạng thái không hợp lệ.
## Initialized
Gọi **setDataSource(FileDescriptor), setDataSource(String), setDataSource(Context, Uri), setDataSource(FileDescriptor, long, long), setDataSource(MediaDataSource)** chuyển đối tượng MediaPlayer ở trạng thái **Idle** sang trạng thái **Initialized** .
## Prepared và Preparing
Đối tượng MediaPlayer trước tiên phải nhập trạng thái **Prepared** trước khi có thể bắt đầu phát.
Có hai cách (đồng bộ và không đồng bộ) để có thể đạt được trạng thái  **Prepared**.
* Gọi **prepare()** (đồng bộ) chuyển đối tượng đến trạng thái  **Prepared** sau khi phương thức call back trả về.
* Gọi  **prepareAsync()** (không đồng bộ)  trước tiên chuyển đối tượng đến trạng thái **Preparing** sau khi phương thức call back trả về, trong khi đó hệ thống tiếp tục làm việc trên phần còn lại của công việc chuẩn bị cho đến khi công việc chuẩn bị hoàn thành.

Khi chuẩn bị hoàn thành hoặc khi gọi **prepare()** trả về thành công, hệ thống gọi đế callback **onPrepared()** của **OnPreparedListener**, nếu một **OnPreparedListener** được đăng ký trước bằng
```
setOnPreparedListener(android.media.MediaPlayer.OnPreparedListener)
```

Điều quan trọng cần lưu ý là trạng thái **Preparing** là trạng thái tạm thời và hành vi gọi bất kỳ phương thức nào có hiệu ứng phụ trong khi đối tượng MediaPlayer đang ở trạng thái **Preparing** sẽ không được chấp nhận.

Một ngoại lệ IllegalStateException được ném ra nếu **prepare()** hoặc **prepareAsync()** được gọi trong bất kỳ trạng thái nào khác.

Trong khi ở trạng thái **Prepared**, các thuộc tính như âm lượng, screenOnWhilePlaying, vòng lặp có thể được điều chỉnh bằng cách gọi các phương thức thiết lập tương ứng.
## Started, Paused và Stopped
Để bắt đầu phát media, **start()** phải được gọi. Sau khi **start()** trả về thành công, đối tượng MediaPlayer đang ở trạng thái **Started**. Phương thức **isPlaying()** có thể được gọi để kiểm tra xem đối tượng MediaPlayer có ở trạng thái **Started** hay không.
* Trong khi ở trạng thái **Started**, hệ thốngyêu cầu  cung cấp callback **OnBufferingUpdateListener.onBufferingUpdate()** nếu một **OnBufferingUpdateListener** đã được đăng ký bằng 
    ```
    setOnBufferingUpdateListener(OnBufferingUpdateListener). 
    ```
    Callback này cho phép các ứng dụng theo dõi trạng thái buffer trong khi phát  âm thanh/video.
    
*    Gọi **start()** không ảnh hưởng đến đối tượng MediaPlayer đã ở trạng thái **Started**.

Player có thể được tạm dừng và dừng lại, và vị trí đang phát  hiện tại có thể được điều chỉnh. Có thể  tạm dừng thông qua **pause()**. Khi  **pause()** trả về, đối tượng MediaPlayer nhập trạng thái **Paused**.

Lưu ý rằng quá trình chuyển đổi từ trạng thái **Started** sang trạng thái **Paused** và ngược lại xảy ra không đồng bộ. Có thể mất một thời gian trước khi trạng thái được cập nhật tkhi gọi đến **isPlaying()**, và nó có thể là một vài giây trong trường hợp nội dung được truyền trực tuyến.
* Gọi **start()** để tiếp tục phát lại đối tượng MediaPlayer bị tạm dừng và vị trí phát  được tiếp tục giống với vị trí đã tạm dừng. Khi  **start()** trả về, đối tượng MediaPlayer bị tạm dừng quay lại trạng thái **Started**.
* Gọi **pause()** không có hiệu lực đối với đối tượng MediaPlayer đã ở trạng thái  **Paused**.

Gọi **stop()** để dừng phát  và khiến MediaPlayer ở trạng thái **Started**, **Paused**, **Prepared** hoặc **PlaybackCompleted**  để vào trạng thái **Stopped**.
* Khi ở trạng thái **Stopped**, không thể bắt đầu phát  cho đến khi **prepare()** hoặc **prepareAsync()** được gọi để đặt đối tượng MediaPlayer về trạng thái **Started**.
* Gọi **stop()** không có hiệu lực đối với đối tượng MediaPlayer đã ở trạng thái **Stopped**.

Vị trí phát có thể điều chỉnh bằng cách gọi **seekTo(long, int)**

Chú ý **seekTo(long, int)**  có thể được gọi khi Media Player ở những trạng thái   **Prepared**, **Paused** and **PlaybackCompleted** 

Hơn nữa vị trí hiện tại có thể được lấy ra bằng phương thức **getCurrentPosition()** , phương thức hữu ích nếu bạn muốn sử dụng tiến trình phát media.

## PlaybackCompleted 
Khi Media Player phát đến cuối của stream media, playback hoàn thành.

* Nếu bạn thiết lập **loop** là **true** với **setLooping(boolean)**, MediaPlayer sẽ trở lại trạng thái **Started**
* Nếu thiết lập **loop** là **false** , hệ thống sẽ gọi đến callback **OnCompletion.onCompletion()**, nếu **OnCompletionListener**  được đăng ký với ứng dụng.
    ```
    setOnCompletionListener(OnCompletionListener).
    ```
   Đối tượng Media Player bây giờ ở trạng thái **PlaybackCompleted**
* Trong khi đang ở trạng thái **PlaybackCompleted**, gọi **start()** có thể khởi động lại playback từ lúc bắt đầu tài nguyên media

# 3.Sử dụng Media Player
Một trong những thành phần quan trọng nhất của Android Mutimedia Framework là MediaPlayer class. một đối tượng của lớp này có thể lấy dữ liệu, giải mã và phát cả audio và video với thiết lập đơn giản nhất. Nó hỗ trợ nhiều loại tài nguyên media như:
* Local resources
* Internal URIs
* External URLs (streaming)

Một ví dụ đơn giản về cách phát file media trong thư mục project của bạn(lưu trong res/raw/ ):
```
MediaPlayer mediaPlayer = MediaPlayer.create(context, R.raw.sound_file);
mediaPlayer.start();
```

Trong trường hợp này raw file nên là một file media được encode và format chính xác theo một trong những chuẩn được hỗ trợ.

Để phát một file media có sẵn trong hệ thống(có thể truy xuất qua Content Provider)
```
Uri myUri = ....; // initialize Uri here
MediaPlayer mediaPlayer = new MediaPlayer();
mediaPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
mediaPlayer.setDataSource(getApplicationContext(), myUri);
mediaPlayer.prepare();
mediaPlayer.start();
```

Để phát từ một nguốn trên internet thông qua URL và HTTP :
```
String url = "http://........"; // your URL here
MediaPlayer mediaPlayer = new MediaPlayer();
mediaPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
mediaPlayer.setDataSource(url);
mediaPlayer.prepare(); // might take long! (for buffering, etc)
mediaPlayer.start();
```

**Chú ý:** Bạn phải bắt ngoại lệ  **IllegalArgumentException** và **IOException** khi sử dụng **setDataSource()** bời vì file mà bạn tham chiếu đến có thể không tồn tại.

# Kết bài 
Ở phần này, chúng ta đã tìm hiểu cơ bản về Media Player, trạng thái của nó và cách sử dụng nó một cách đơn giản nhất. Ở bài sau chúng ta sẽ tìm hiểu chi tiết hơn về cách sử dụng Media Player như là sử dụng với Service, xử lý khi có cuộc gọi đến...
Cảm ơn các bạn đã đọc hết bài viết. Hẹn gặp lại ở các bài viết sau nhé !

# Tài liệu tham khảo 
1. https://developer.android.com
2. https://medium.com