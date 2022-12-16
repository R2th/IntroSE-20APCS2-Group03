# **MediaPlayer trong Android**

Ứng dụng di động của các bạn hầu hết đều có thể phát 1 đoạn video, chơi một bài nhạc hoặc 1 bản audio từ trong bộ nhớ máy, trong ứng dụng hay phát trực tiếp trên mạng. Tất cả đều sử dụng MediaPlayer APIs.
Trong bài viết này thì mình sẽ giúp các bạn tìm hiểu cụ thể hơn về MediaPlayer đã hỗ trợ những gì trong những tác vụ liên quan đến media.
### 1. MediaPlayer
* Class MediaPlayer là 1 trong những Componens quan trọng nhất của Media FrameWork, object của class này có thể giúp bạn phát hoặc chơi các video hoặc các bài hát, audio từ các nơi lưu trữ khác nhau.
*  Dưới đây mình sẽ làm ví dụ để chơi 2 bài nhạc, 1 bài từ trong local resource, 1 bài ở trong bộ nhớ máy:
    *  Đầu tiên là ở trong local resource:
        >     MediaPlayer mediaPlayer = MediaPlayer.create(context, R.drawable.lactroi);
        >      mediaPlayer.start();

        *  Trong trường hợp này, ta khởi tạo mediaplayer bằng cách dung MediaPlayer.create, sau đó truyền vào cho nó 2 tham số là context và 1 local resource là bài hát của Sếp được lưu trữ trong drawable. Khi gọi mediaPlayer.start(), bài hát này sẽ được phát.
    *  Còn trường hợp dưới đây, mình sẽ play 1 bài hát từ 1 đường link url có săn, url này có thể là từ bài hát trong thiết bị của bạn (được lấy ra bằng Content Resolver) hoặc từ 1 link stream url trên mạng: 
        
    ```
        String url = "…"; // your URL here
        MediaPlayer mediaPlayer = new MediaPlayer();
        mediaPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
        mediaPlayer.setDataSource(getApplicationContext(), url);
        mediaPlayer.prepare();
        mediaPlayer.start();
    ```
    
* Ở 2 ví dụ trên mình có sử dụng khá nhiều các method của mediaPlayer như getDataSource(), prepare(), start(), vậy các method trên có ý nghĩ gì, chúng ta sẽ cùng nhau tìm hiểu về các trạng thái và vòng đời của MediaPlay.

### 2. Vòng đời và các trạng thái của MediaPlayer
Vòng đời của MediaPlayer trông khá rắc rối và loằng ngoằng, trong qua trình mình giải thích ở dưới có thể gặp nhiều lỗi sai, vậy nên nếu có mong các bạn thông cảm và coment xuông dươi giúp mình.
Dưới đây là hình ảnh minh họa vòng đời và các trạng thái của MediaPlayer
![](https://images.viblo.asia/3d375b56-e556-4be8-9395-6fd6abf61c11.PNG)
Mình sẽ phân tích hình vẽ trên dựa vào các trạng thái của MediaPlayer.
* **Idle State**
    * Khi mà MediaPlayer được khởi tạo bằng từ khóa new hoặc sau khi gọi method reset(), nó sẽ rơi vào trạng thái **Idle**(trạng thái chờ). 
    * Có sự khác biệt giữa 2 cách này là khi khởi tạo bằng từ khóa new, ngay sau đó các bạn gọi các phương thức trong MediaPlayer như pause(), seekTo(), stop(), start(),…thì callback OnErrorListener.onError() sẽ không được cung cấp bởi hệ thống và trạng thái của MediaPayer vẫn không thay đổi. Còn nếu dung reset() mà sau đó gọi các phương thức trên thì call back OnErrorListener.onError() sẽ được cung cấp bởi hệ thống và mediaplayer sẽ được chuyển sang trạng thái **Error**. 
    * Khi ở trạng thái này, chúng ta có thể chuyển qua trạng thái **End** nếu gọi method release(), hay sang trạng thái **Initialized** nếu sử dụng setDataSource().
* **End state**
    * MediaPlayer sẽ rơi vào trạng thái này khi gọi method release(), lúc đó MediaPlayer sẽ không được sử dụng nữa. Chúng ta có thể gọi phương thức release() ở bất kì trạng thái nào của MediaPlayer.
    * Khi MediaPlayer ở trạng thái này quá lâu thì sẽ không có cách nào đưa về bất kì trạng thái nào khác.
* **Initialized State** 
    * Khi gọi phương thức setDataSource() và truyền vào nó các đối số phù hợp thì MediaPlayer sẽ được chuyển từ trạng thái **Idle** sang trạng thái **Initialized**
    * Các phương thức setDataSource() có thể kể đến  như setDataSource(FileDescriptor), setDataSource(String),  setDataSource(Context, Uri),  setDataSource(FileDescriptor, long, long), hoặc setDataSource(MediaDataSource). Sẽ có 1 IllegalStateException được ném ra nếu setDataSource() được gọi ở các trạng thái khác, vậy nên chỉ setDataSource() khi MediaPlayer ở trạng thái **Idle**.
    * Ở trạng thái này có thể chuyển đến trạng thái **Prepared** nếu gọi method prepare(), còn khi gọi method prpareAsynce() sẽ chuyển sang trạng thái **Preparing**.
* **Preparing state**
    * khi chúng ta gọi prepareAsync(), đây là 1 phương thức không đồng bộ,  mediaPlayer sẽ rơi vaò trạng thái này. 
    * Khi sử dụng method này thì sẽ được chạy trong 1 other thread, do đó giao diện người dùng không bị chặn vì nó trả về gần như ngay lập tức, trong trạng thái này, sẽ check trong local đã có file nhạc hay file audio chưa, nếu có rồi thì lấy ra và chuyển luôn vào trạng thái **Prepared**, còn nếu chưa có thì sẽ thực hiện các thao tác connect đến server và buffer. Khi mọi thao tác chuẩn bị trên network được hoàn thành thì người dung sẽ được hệ thống cung cáp callback  OnPreparedListener.onPrepared () khi mà trước đó đã setOnPreparedListener(), sau đó sẽ chuyển sang trạng thái **Prepared**.
* **Prepared State**
    * MediaPlayer ở trong trạng thái này khi gọi phương thức prepare() và phương thức prepareAsync () khi đã được cung cấp callback OnPreparedListener.onPrepared ().
    *  Ở trạng thái này, có thể start được MediaPlayer bằng cách gọi start(), MediaPlayer sẽ chuyển sang trạng thái **Started**, hoặc có thể chuyển sang trạng thái **Stop** bằng cách gọi method stop().
    *  Sử dụng method seekTo() trong trạng thái này không làm ảnh hưởng đến trạng thái của MediaPlayer.
   
* **Started State**
    * Trạng thái khi mà media đang được chạy, chuyển đến trạng thái này bằng cách gọi start() có thể từ các trạng thái **Prepare**, **Pause**, **PlaybackComplete**.
    *  Lúc này có thể sử dụng pause() để tạm dừng nhạc và chuyển sang trạng thái **Pause** hoặc stop() để dừng hẳn nhạc và chuyển sang trạng thái **Stop** của MediaPlayer. Gọi isPlaying() để biết được media có đang được chạy không. 
    *  Khi đang ở trong trạng thái này, khi gọi phương thức seekTo() hay start(), MediaPlayer vẫn giữ nguyên trạng thái. Trong trạng thái này khi mà trước đó dã setOnBufferingUpdateListener(OnBufferingUpdateListener), chúng ta sẽ được hệ thống cung cấp callback OnBufferingUpdateListener.onBufferingUpdate() để theo dõi trạng thái buffer trong suốt quá trình stream audio/video.
    *  Khi mà audio/video được phát hết, mà được setLooping(true) thì MediaPlayer sẽ được duy trì ở trạng thái **Started**.
*  **Pause state**
    *  Khi media đang chạy, gọi hàm pause() để dừng media khi đang phát nhạc. Lúc này MediaPlayer sẽ chuyển sang trạng thái **Pause**. 
    *  Tại trạng thái này, có thể chuyển sang trạng thái **Started** để play lại media bằng cách gọi start() hoặc có thể chuyển sang trạng thái **Stop** bằng cách gọi method stop(). Thường dùng cho nút play/pause gọi hàm này để thực hiện việc quản lý media. 
    *  Chúng ta có thể gọi seekto()/pause() khi đang ở trong **Pause State** mà không làm thay đổi trạng thái của MediaPlayer.
*  **Stop State**
    *  Rơi vào trạng thái này khi gọi phương thức stop(), phương thức stop() có thể được gọi từ các trạng thái như **Prepared**, **Pause**, **PlaybackComplete**
    *   khi ở trong trạng thái này. MediaPlayer phải được đưa về trạng thái **Prepared** hoặc **Preparing** trước khi muốn quay lại trạng thái **Started** bằng cách sử dụng prepared() hoặc prepareAsync()
    *   Khi MediaPlayer đã ở trong trạng thái này rồi thì khi gọi stop() không làm thay đổi trạng thái của MediaPlayer.
*   **PlaybackComplete State**
    *   Trạng thái mà chạy xong media sẽ nhảy vào đây, có thể lắng nghe sự kiện OnCompletionListener của nó để có thể thực hiện chuyển bài hoặc là vẫn play bài đó với các trường hợp của loop media. Tại đây có thể gọi start() để play lại audio/media
    *   Tại trạng thái này có thể gọi phương thức stop() để chuyển sang trạng thái **Stop** hay start() để quay lại trạng thái **Started**. 
    *   Khi ở trạng thái này, nếu gọi method seekTo() không làm thay đổi trạng thái.
    *  Khi setLooping(false) thì sẽ được cung cấp callback OnCompletion.onCompletion() nếu OnCompletionListener đã được đăng kí trước đó, MediaPlayer sẽ rơi vào trạng thái **PlaybackComplete**.
*   **Error State**
    *    Trong quá trình thao tác với MediaPlayer nếu xảy ra lỗi, có thể là khi setDataSource() sai, định dạng audio, video không đúng, kích thước ảnh quá lớn,.. sẽ rơi vào trong trạng thái này. 
    *    Khi rơi vào trạng thái **Error**, chúng ta sẽ được hệ thống cung cấp callback OnErrorListener.onError() nếu OnErrorListener đã được đăng kí từ trước. 
    *    Ở trạng thái này chúng ta có thể quay lại trạng thái **Idle** khi gọi method reset()

***Chú ý:***
* Trong trường hợp mà MediaPlayer được tạo bằng “create” như bên trên ví dụ 1 của mình thì nó sẽ rơi luôn vào trạng thái Prepared. Vì khi gọi create = gọi khởi tạo + gọi prepare(). Các bạn có thể tham khảo đoạn code trong hàm create() của MediaPlayer để hiểu rõ hơn: 
```
    public static MediaPlayer create(Context context, Uri uri, SurfaceHolder holder,
            AudioAttributes audioAttributes, int audioSessionId) {

        try {
            MediaPlayer mp = new MediaPlayer();
            final AudioAttributes aa = audioAttributes != null ? audioAttributes :
                new AudioAttributes.Builder().build();
            mp.setAudioAttributes(aa);
            mp.setAudioSessionId(audioSessionId);
            mp.setDataSource(context, uri);
            if (holder != null) {
                mp.setDisplay(holder);
            }
            mp.prepare();
            return mp;
        } catch (IOException ex) {
            Log.d(TAG, "create failed:", ex);
            // fall through
        } catch (IllegalArgumentException ex) {
            Log.d(TAG, "create failed:", ex);
            // fall through
        } catch (SecurityException ex) {
            Log.d(TAG, "create failed:", ex);
            // fall through
        }

        return null;
    }

```
* Sự khác biệt giữa 2 method prepare() và prepareAsync(): 
    * Prepare() được sử dụng để load dữ liệu của MediaPlayer ngay trên luồng gọi nó, thông thường là UI Thread, vậy nên khi mà xử lý dữ liệu trên mạng tốn nhiều thời gian, giao diện sẽ bị chặn trong khoảng thời gian đó và ứng dụng có thể bị ARN
    * Đối với prepareAsync() thì nó đã xử lý được vấn đề này bằng cách thao tác trên 1 luống khác, không làm ảnh hướng đến giao diện của chương trình. Tuy nhiên, ta phải setOnPrepareListener để biết khi nào MediaPlayer đã sẵn sàng được play.

### 3. Các Callback trong MediaPlayer.
* Những callback trả về cho chúng ta những trạng thái và giá trị của Media Player:
    * setOnCompletionListener(OnCompletionListener): Lắng nghe sự kiện khi play xong một media, sử dụng để có thể quy định việc tiếp theo nó sẽ làm là play lại hay play bài hát khác.
    * setOnVideoSizeChangedListener(OnVideoSizeChangedListener): Lắng nghe sự kiện thay đổi size của media trong lúc play video.
    * setOnPreparedListener(OnPreparedListener): Lắng nghe sự kiện Prepared xong của media để chuẩn bị cho việc play.
    * setOnBufferingUpdateListener(OnBufferingUpdateListener): Lắng nghe sự kiện thay đổi của bộ đệm khi play media online
    * setOnSeekCompleteListener(OnSeekCompleteListener): Lắng nghe sự kiện khi di chuyển seekbar hỗ trợ bởi MediaPlayer.
    * setOnInfoListener(OnInfoListener): Lắng nghe sự kiện khi có thông tin hoặc cảnh báo.
    * setOnErrorListener(OnErrorListener): Lắng nghe sự kiện nếu xảy ra lỗi khi play media.

### 4.Tổng kết
* Trong bài viết này mình đã giới thiệu cho các bạn về MediaPlayer, vòng đời và các trạng thái của nó, các hàm callback thường được sử dụng trong MediaPlayer. Hi vọng bài viết này sẽ có ích cho các bạn. Cảm ơn vì đã đọc bài viết của mình.
* Các kiến thức trong bài viết này mình có tham khảo ở:
    * https://developer.android.com/reference/android/media/MediaPlayer