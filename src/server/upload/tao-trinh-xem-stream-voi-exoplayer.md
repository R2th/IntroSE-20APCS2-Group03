# **Mở bài**
- ExoPlayer là 1 thư viện khá nổi tiếng do Google tạo ra. ExoPlayer giúp load các thể loại video, đặc biệt hơn nữa là nó có thể load được video stream. Nó được Google sử dụng trong các ứng dụng nổi tiếng như YouTube và Google Play Phim.
- Các bạn có thể tìm hiểu rõ hơn tại [đây](https://google.github.io/ExoPlayer/)
- Bài này mình sẽ hướng dẫn các bạn sử dụng ExoPlayer để load 1 url stream
# **Cài đặt**
* Khai báo trong file gradle(app)
```
    dependencies {
...
    implementation 'com.google.android.exoplayer:exoplayer-core:2.7.3'
    implementation 'com.google.android.exoplayer:exoplayer-dash:2.7.3'
    implementation 'com.google.android.exoplayer:exoplayer-ui:2.7.3'
}
```
* Trong file layout xml, bạn tạo 1 `PlayerView` 
```
...
<com.google.android.exoplayer2.ui.PlayerView
   android:id="@+id/video_view"
   android:layout_width="match_parent"
   android:layout_height="match_parent"/>
```
* Ở Activity chúng ta cấu hình cho ExoPlayer như sau: 
```
   override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        // Tạo 1 mediaDataSource để chuẩn bị load video
        mediaDataSourceFactory = DefaultDataSourceFactory(this, Util.getUserAgent(this, "mediaPlayerSample"),
            bandwidthMeter as TransferListener<in DataSource>
        )
    }
```
* Tạo 1 function riêng để cấu hình ExoPlayer
```
 private fun initializePlayer() {

        playerView.requestFocus()

        val videoTrackSelectionFactory = AdaptiveTrackSelection.Factory(bandwidthMeter)

        trackSelector = DefaultTrackSelector(videoTrackSelectionFactory)
        lastSeenTrackGroupArray = null

        player = ExoPlayerFactory.newSimpleInstance(this,trackSelector)

        playerView.player = player
        player?.playWhenReady = true

        val mediaSource: MediaSource = HlsMediaSource.Factory(mediaDataSourceFactory)
            .createMediaSource( Uri.parse("http://4co2.vp9.tv/chn/DNG8/v.m3u8"))

        player?.prepare(mediaSource)
    }
```
* Overide lại lifecycle để thêm hàm mình vừa tạo ở trên
```
 public override fun onStart() {
        super.onStart()

        if (Util.SDK_INT > 23) initializePlayer()
    }

    public override fun onResume() {
        super.onResume()

        if (Util.SDK_INT <= 23 || player == null) initializePlayer()
    }

    public override fun onPause() {
        super.onPause()

        if (Util.SDK_INT <= 23) releasePlayer()
    }

    public override fun onStop() {
        super.onStop()

        if (Util.SDK_INT > 23) releasePlayer()
    }
```
* Kết quả: 

![](https://images.viblo.asia/e74c5066-614b-4478-b22e-af0ab2d4fdcb.png)
# **Kết bài**
- Cảm ơn các bạn đã đọc bài viế t của mình
- Nguồn tại [đây](https://google.github.io/ExoPlayer/)