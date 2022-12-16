- Xin chào các bạn, trong bài viết này, chúng ta sẽ cùng tìm hiểu làm thế nào để tích hợp và xây dựng một ứng dụng play video, bằng cách sử dụng YouTube API trong Android với Kotlin.
![](https://images.viblo.asia/6152e12d-7ade-4224-a0a7-ac6225fdd3a0.png)

### 1. Introduce
- YouTube Android Player API cho phép kết hợp chức năng phát lại video vào ứng dụng Android của bạn
- API định nghĩa các phương thức để loading và play Youtube videos (và playlist) và để tùy biến và kiểm soát các kinh nghiệm phát lại video 
- Sử sụng API, ta có thể load hoặc cue videos vào player view nhúng trong giao diện ứng dụng, sau đó ta có thể kiểm soát các lập trình phát lại, ví dụ như play, pause hoặc seek tới đến một điểm cụ thể trong đoạn video đang được load 
- Chúng ta cũng có thể đăng kí lắng nghe các sự kiện để có thể có callbacks cho các sự kiện nhất định chẳng hạn như player loading một video hoặc sự thay đổi trạng thái player.
- Và cuối cùng, API có chức năng trợ giúp thay đổi hướng cũng như chuyển tới fullscreen 
### 2. Setup
Trước khi đi vào phần code, chúng ta cần phải thực hiện các bước thiết lập Youtube API trong ứng dụng của chúng ta 
### **Creating an Android Project:**

**Bước 1** - Tạo một project mới với một activity trống

- ![](https://images.viblo.asia/6eb0d2c8-3141-4c09-9f96-15c209dfe886.png)
1. Vào Files
2. Create new project
3. Chọn một Project Template- Basic Activity

**Bước 2** - Thiết lập YouTube Library và Manifest 
Trong phần này, chúng ta sẽ thấy cách làm thế nào để thiết lập YouTube API Client library cho dự án.
- ![](https://images.viblo.asia/226cc062-23fd-4b7b-8bf4-db85c30d4681.png)
- ![](https://images.viblo.asia/996d97d0-8346-4a35-b067-d554fb9875de.png)
1. Đi đến YouTube Android Player API và download YouTube Android Player API jar file - [Link](https://developers.google.com/youtube/android/player/downloads)
2. Giải nén file jar và thêm chúng vào thư mục “libs”.

### Integration of YouTube Android Player in Screen using Kotlin

**Bước 1** - Đi đến Google Developer Console 
https://console.developers.google.com/apis/library/

**Bước 2** - Enable YouTube Data API
- ![](https://images.viblo.asia/676100db-3451-442f-8b47-2f63c11f261e.png)


**Bước 3** - Đi đến tùy chọn "Help me choose"
- ![](https://images.viblo.asia/57db38d1-1e50-4410-9d61-72f8164eb008.png)

**Bước 4** - Chọn credentials như hình dưới đây
- ![](https://images.viblo.asia/7b386372-9584-40f4-9ca4-78288949eaf7.png)

**Bước 5** - Đi đến Credentials  
- ![](https://images.viblo.asia/64b730a7-8d4f-4761-9eeb-47a480ac0974.png)
- ![](https://images.viblo.asia/afd629ac-2c3b-4a95-8a53-df51bb02e0d4.png)
- ![](https://images.viblo.asia/01f092a7-e53b-470b-a7aa-b9c815845ea4.png)
- ![](https://images.viblo.asia/42b8d039-0b20-4d28-9ddc-2d3604331d48.png)
- ![](https://images.viblo.asia/1d9c7395-def4-4926-a37b-63af182db9b1.png)
1. Trong mục “Name” nhập tên package của bạn
2. Generate the SHA-1 certificate fingerprint bằng cách running “signingReport”
3. Copy generated SHA-1 certificate fingerprint và đặt nó như hiển thị ở trên

### 3. Full Code
- AndroidManifest.xml
```
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="com.example.youtubeplayer">

    <uses-permission android:name="android.permission.INTERNET"/>
    <application

        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>

                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
        <activity android:name=".YoutubeActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>

                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
    </application>
</manifest>
```
- YouTubeActivity.Kt 
```
package com.example.youtubeplayer

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.ViewGroup
import android.widget.Button
import android.widget.Toast
import androidx.constraintlayout.widget.ConstraintLayout
import com.google.android.youtube.player.YouTubeBaseActivity
import com.google.android.youtube.player.YouTubeInitializationResult
import com.google.android.youtube.player.YouTubePlayer
import com.google.android.youtube.player.YouTubePlayerView
import com.google.android.youtube.player.internal.t
const val YOUTUBE_VIDEO_ID = "Evfe8GEn33w"
const val YOUTUBE_PLAYLIST = "UCU3jy5C8MB-JvSw_86SFV2w"

class YoutubeActivity : YouTubeBaseActivity(), YouTubePlayer.OnInitializedListener {
    private val TAG = "YoutubeActivity"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val layout = layoutInflater.inflate(R.layout.activity_youtube, null) as ConstraintLayout
        setContentView(layout)

        val playerView = YouTubePlayerView(this)
        playerView.layoutParams = ConstraintLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT)
        layout.addView(playerView)

        playerView.initialize(getString(R.string.GOOGLE_API_KEY), this)
    }

    override fun onInitializationSuccess(provider: YouTubePlayer.Provider?, youTubePlayer: YouTubePlayer?,
                                         wasRestored: Boolean) {
        Log.d(TAG, "onInitializationSuccess: provider is ${provider?.javaClass}")
        Log.d(TAG, "onInitializationSuccess: youTubePlayer is ${youTubePlayer?.javaClass}")
        Toast.makeText(this, "Initialized Youtube Player successfully", Toast.LENGTH_SHORT).show()

        youTubePlayer?.setPlayerStateChangeListener(playerStateChangeListener)
        youTubePlayer?.setPlaybackEventListener(playbackEventListener)

        if (!wasRestored) {
            youTubePlayer?.cueVideo(YOUTUBE_VIDEO_ID)
        }
    }

    override fun onInitializationFailure(provider: YouTubePlayer.Provider?,
                                         youTubeInitializationResult: YouTubeInitializationResult?) {
        val REQUEST_CODE = 0

        if (youTubeInitializationResult?.isUserRecoverableError == true) {
            youTubeInitializationResult.getErrorDialog(this, REQUEST_CODE).show()
        } else {
            val errorMessage = "There was an error initializing the YoutubePlayer ($youTubeInitializationResult)"
            Toast.makeText(this, errorMessage, Toast.LENGTH_LONG).show()
        }
    }

    private val playbackEventListener = object: YouTubePlayer.PlaybackEventListener {
        override fun onSeekTo(p0: Int) {
        }

        override fun onBuffering(p0: Boolean) {
        }

        override fun onPlaying() {
            Toast.makeText(this@YoutubeActivity, "Good, video is playing ok", Toast.LENGTH_SHORT).show()
        }

        override fun onStopped() {
            Toast.makeText(this@YoutubeActivity, "Video has stopped", Toast.LENGTH_SHORT).show()
        }

        override fun onPaused() {
            Toast.makeText(this@YoutubeActivity, "Video has paused", Toast.LENGTH_SHORT).show()
        }
    }

    private val playerStateChangeListener = object: YouTubePlayer.PlayerStateChangeListener {
        override fun onAdStarted() {
            Toast.makeText(this@YoutubeActivity, "Click Ad now, make the video creator rich!", Toast.LENGTH_SHORT).show()
        }

        override fun onLoading() {
        }

        override fun onVideoStarted() {
            Toast.makeText(this@YoutubeActivity, "Video has started", Toast.LENGTH_SHORT).show()
        }

        override fun onLoaded(p0: String?) {
        }

        override fun onVideoEnded() {
            Toast.makeText(this@YoutubeActivity, "Congratulations! You've completed another video.", Toast.LENGTH_SHORT).show()
        }

        override fun onError(p0: YouTubePlayer.ErrorReason?) {
        }
    }
}
``` 
- Bây giờ, bạn có thể run code và xem video trên emulator 
- ![](https://images.viblo.asia/544bd4cc-b4f6-4eda-953f-d1456520ae50.png)

### 4. Conclusion
- Như vậy, chúng ta đã tìm hiểu cách để xây dựng được một ứng dụng trình phát video YouTube Player bằng cách sử dụng YouTube API với ngôn ngữ Kotlin
- Cảm ơn các bạn đã đọc, xin chào và hẹn gặp lại.
- Link Github Project: - https://github.com/mitushaa/YouTube-Player-API 
- Refer: https://blog.kotlin-academy.com/building-a-youtube-player-using-kotlin-b0e4beef302a