## Tổng quan
Trong Android, chúng ta có thể dễ dàng play một hoặc nhiều audio cùng một lúc. Điều này nghe có vẽ rất tuyệt vời đối với lập trình viên, tuy nhiên đối với user thì không. Việc có 2 hay nhiều audio cùng phát tại một thời điểm sẽ làm cho user cảm thấy không được thoải mái và không thể tập trung được vào audio họ thật sự cần nghe. 

Để tránh điều này, Android cung cấp cho chúng ta một khái niệm về *audio focus* để có thể chỉ ra được rằng lúc nào, audio nào có quyền được play.

Việc này rất quan trọng đối với các ứng dụng sử dụng audio như là:  ứng dụng phát nhạc, phát video, hay live stream. 

Hành vi đúng của một ứng dụng có audio được khuyến nghị nên theo guidelines chung dưới đây: 
1. Gọi `requestAudioFocus` trước khi bắt đầu play, để verify rằng ứng dụng được `AUDIOFOCUS_REQUEST_GRANTED`. Việc này tốt nhất nên được thực hiện trong `onPlay()` callback của media session để đảm bảo rằng ứng dụng của chúng ta luôn được `requestAudioFocus` trước khi play. 
2. Khi ứng dụng khác có quyền audio thì nên stop hoặc pause playing, giảm hoặc tăng âm lượng phù hợp. 
3. Khi việc playback dừng, chúng ta nên huỷ bỏ audio focus.

Trên đây, mình đã giới thiệu tổng quan với các bạn về *audio focus* và hành vi đúng của một ứng dụng sử dụng audio là như thế nào. Sau đây chúng ta sẽ bắt đầu thực hiện một demo về audio focus.

## Request audio focus
Trước khi thực hiện func này, chúng ta sẽ trao đổi về sự khác nhau của việc `requestAudioFocus` trong các phiên bản Android khác nhau: 
- Từ Android 2.2 (API level 8): Apps quản lý audio focus bằng việc gọi `requestAudioFocus()` và `abandonAudioFocus()`. Bên cạnh đó, ứng dụng phải đăng kí `AudioManager.OnAudioFocusChangeListener` để nhận các callback và thay đổi mức audio phù hợp. 
- Từ Android 5.0 (API level 21): Audio apps nên dùng `AudioAttributes` để mô tả các kiểu audio của ứng dụng. Ví dụ, các apps play speech nên chỉ ra `CONTENT_TYPE_SPEECH`.
- Từ Android 8.0 (API level 26) : `requestAudioFocus()` sẽ nhận thêm tham số `AudioFocusRequest`. `AudioFocusRequest` chứa thông tin về ngữ cảnh của audio và khả năng của ứng dụng. Hệ thống sẽ sử dụng thông tin này để quản lý audio focus gain và loss tự động. 

Do [demo](https://github.com/huuphuoc1396/ManagingAudioFocus) của mình có `minSdkVersion 23` cho nên mình sẽ chỉ thực hiện 2 case từ Android 5.0 và từ Android 8.0. 

Trước tiên chúng ta cần lấy `AudioManger` thông qua `Context::getSystemService`.

```kotlin
private var audioManager: AudioManager? = null
    //...
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        audioManager = getSystemService(Context.AUDIO_SERVICE) as? AudioManager
        // ...
    }
```

Sau đó, chúng ta thực hiện `requestAudioFocus()` như sau: 

```kotlin 
 private fun requestAudioFocus(): Boolean {
        var res: Int?
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            audioFocusRequest?.let { res = audioManager?.requestAudioFocus(it) }
        }
        res = audioManager?.requestAudioFocus(
            audioFocusChangeListener,
            AudioManager.STREAM_MUSIC,
            AudioManager.AUDIOFOCUS_GAIN
        )
        return res == AudioManager.AUDIOFOCUS_GAIN
    }
```

Từ Android 8.0 chúng ta sẽ request audio focus với thêm một tham số nữa là `audioFocusRequest`, nó sẽ chứa luôn `AudioManager.OnAudioFocusChangeListener` . Còn dưới Android 8.0 và từ Android 5.0 trở lên, chúng ta chỉ cần chỉ ra các `AudioAttributes` (Ở đây mình khai báo là `STREAM_MUSIC` và `AUDIOFOCUS_GAIN` ) và sẽ truyền trực tiếp `AudioManager.OnAudioFocusChangeListener` vào đây. 

### `AudioManager.OnAudioFocusChangeListener`
`AudioManager.OnAudioFocusChangeListener` là một callback, được gọi khi audio focus type đã thay đổi.

```Kotlin 
 private var audioFocusChangeListener =
        AudioManager.OnAudioFocusChangeListener { focusChange ->
            when (focusChange) {
                AudioManager.AUDIOFOCUS_GAIN -> {
                    val message = "AUDIOFOCUS_GAIN"
                    toast(message)
                    Log.i(TAG, message)
                    isPlaying = true
                    updatePlayPause()
                }
                AudioManager.AUDIOFOCUS_LOSS -> {
                    val message = "AUDIOFOCUS_LOSS"
                    toast(message)
                    Log.i(TAG, message)
                    isPlaying = false
                    updatePlayPause()
                }
                AudioManager.AUDIOFOCUS_LOSS_TRANSIENT -> {
                    val message = "AUDIOFOCUS_LOSS_TRANSIENT"
                    toast(message)
                    Log.i(TAG, message)
                    isPlaying = false
                    updatePlayPause()
                }
                AudioManager.AUDIOFOCUS_LOSS_TRANSIENT_CAN_DUCK -> {
                    val message = "AUDIOFOCUS_LOSS_TRANSIENT_CAN_DUCK"
                    toast(message)
                    Log.i(TAG, message)
                    isPlaying = false
                    updatePlayPause()
                }
                AudioManager.AUDIOFOCUS_GAIN_TRANSIENT_EXCLUSIVE -> {
                    val message = "AUDIOFOCUS_GAIN_TRANSIENT_EXCLUSIVE"
                    toast(message)
                    Log.i(TAG, message)
                    isPlaying = true
                    updatePlayPause()
                }
            }
        }
```

- `AudioManager.AUDIOFOCUS_GAIN`: Ở đây, app được được trả quyền phát video. Chúng ta có thể play audio hoặc tăng dần volume cho đến normal.
- `AudioManager.AUDIOFOCUS_LOSS`: Có một ứng dụng khác cần quyền audio focus, chúng ta nên pause hoặc stop playing để nhường quyền cho app đó. 
- `AudioManager.AUDIOFOCUS_LOSS_TRANSIENT`: App sẽ mất audio focus một lúc. Chúng ta nên pause lại, cho đến khi app nhận được `AudioManager.AUDIOFOCUS_GAIN`.
- `AUDIOFOCUS_LOSS_TRANSIENT_CAN_DUCK`: App có thể mất audio focus một lúc, nhưng không cần thiết phải pause, chúng ta có thể chỉ cần giảm âm lượng của app tại đây thôi.
- `AudioManager.AUDIOFOCUS_GAIN_TRANSIENT_EXCLUSIVE`: Khi hết `AUDIOFOCUS_LOSS_TRANSIENT_CAN_DUCK`, chúng ta có thể tăng âm lượng cho đến normal ở đây.

### `AudioFocusRequest`
`AudioFocusRequest` chứa thông tin về request audio focus được dùng từ Android 8.0 trở lên. Chúng ta có thể implement nó như bên dưới. 
```kotlin
 private var audioFocusRequest: AudioFocusRequest? =
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN).run {
                setAudioAttributes(AudioAttributes.Builder().run {
                    setUsage(AudioAttributes.USAGE_GAME)
                    setContentType(AudioAttributes.CONTENT_TYPE_MOVIE)
                    build()
                })
                setAcceptsDelayedFocusGain(true)
                setOnAudioFocusChangeListener(audioFocusChangeListener)
                build()
            }
        } else {
            null
        }
```

## Huỷ bỏ *audio focus*
```kotlin
override fun onStop() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            audioFocusRequest?.let { audioManager?.abandonAudioFocusRequest(it) }
        } else {
            audioManager?.abandonAudioFocus(null)
        }
        isPlaying = false
        updatePlayPause()
        super.onStop()
    }
```

Đối với Android 8.0 trở lên, khi huỷ audio focus, chúng ta cần truyền `AudioFocusRequest` trước đó khi request cho `audioManager?.abandonAudioFocus`. Còn đối với version thấp hơn thì chúng ta chỉ cần `audioManager?.abandonAudioFocus(null)`. Chúng ta nên huỷ audio focus khi playback đã đừng hoặc hoàn thành. 

## Kết luận
Trên đây, mình đã giới thiệu với các bạn cơ bản về quản lý audio focus và khi nào chúng ta nên dùng nó. Nếu có thắc mắc về bất cứ vấn đề gì trong bài viết, hãy comment phía dưới nhé. Các bạn có thể tham khảo thêm demo của mình [tại đây](https://github.com/huuphuoc1396/ManagingAudioFocus).

## Tham khảo
1. https://developer.android.com/guide/topics/media-apps/audio-focus
---
**Happy coding!!!**