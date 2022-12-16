# Giới thiệu
Lần trước tôi đã hướng sử dụng ErrorSupportFragment một component rất hay được sử dụng trong một ứng dụng Tivi. Hôm nay chúng ta sẽ cùng đi implement tính tăng voice search.

Leanback đã hỗ trợ một component phục vụ cho tính năng search bao gồm cả search voice đó là **SearchSupportFragment**. Tuy nhiên component này không cho phép chúng ta custom UImà phải sử dụng UI default của nó, như vậy sẽ không phù hợp với yêu cầu của từng dự án cụ thể. Trong bài này tôi sẽ hướng dẫn các bạn tự implement tính năng voice search với giao diện tùy thích
# Tìm hiểu
Để implement chức năng voice search chúng ta sẽ sử dụng một component của android đó là **SpeechRecognizer**  Đây là một component cho phép nhận diện giọng nói cực kỳ chuẩn xác của android. Hầu hết mọi ứng dụng có sử dụng nhận dạng giọng nói đều sử dụng component này kể cả thư viện leanback

![](https://images.viblo.asia/424da9fb-561a-4781-afba-3ff5d2749905.jpg)
# Triển khai
1.    Đầu tiên tôi sẽ tạo một class quản lý việc search voice có tên là **VoiceSearchManager** class này sẽ chứa một instance của SpeechRecognizer
    
```
class VoiceSearchManager(private val context: Context) {

    private var searchListener: SearchListener? = null
    private var speechRecognizer: SpeechRecognizer? = null
    private val handler = Handler()
    private var soundMap = SparseIntArray()
    private var isRecognizing = false

    private var soundPool: SoundPool = SoundPool.Builder().setMaxStreams(2)
            .setAudioAttributes(AudioAttributes.Builder().setLegacyStreamType(
                    AudioManager.STREAM_SYSTEM).build())
            .build()

    init {
        loadSounds(context)
        speechRecognizer = SpeechRecognizer.createSpeechRecognizer(context)
    }

    fun setSearchListener(listener: SearchListener) {
        searchListener = listener
    }

    fun stopRecognition() {
        if (!isRecognizing) return
        cancelRecognition()
    }


    fun startRecognition() {
        if (isRecognizing) return
        val res = context.checkCallingOrSelfPermission(Manifest.permission.RECORD_AUDIO)
        if (PackageManager.PERMISSION_GRANTED != res) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                return
            }
        }
        isRecognizing = true
        setRecognitionListener()
        val recognizerIntent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
            putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL,
                    RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true)
        }
        speechRecognizer?.startListening(recognizerIntent)
    }

    fun submitRecognition() {
        if (!isRecognizing) return
        cancelRecognition()
    }

    fun finish() {
        cancelRecognition()
    }

    private fun cancelRecognition() {
        isRecognizing = false
        speechRecognizer?.cancel()
        speechRecognizer?.setRecognitionListener(null)
    }

    private fun setRecognitionListener() {
        speechRecognizer?.setRecognitionListener(object : RecognitionListener {
            override fun onReadyForSpeech(bundle: Bundle) {
                playSearchOpen()
            }

            override fun onBeginningOfSpeech() {}

            override fun onRmsChanged(rmsdB: Float) {}

            override fun onBufferReceived(bytes: ByteArray) {}

            override fun onEndOfSpeech() {}

            override fun onError(error: Int) {
                stopRecognition()
                playSearchFailure()
            }

            override fun onResults(bundle: Bundle) {
                val matches = bundle.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
                if (matches != null && matches.isNotEmpty()) {
                    submitQuery(matches.first())
                }
                submitRecognition()
                playSearchSuccess()
            }

            override fun onPartialResults(bundle: Bundle) {
                val results = bundle.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
                if (results == null || results.size == 0) {
                    return
                }
                searchListener?.onQueryChange(results.first())
            }

            override fun onEvent(i: Int, bundle: Bundle) {

            }
        })
    }

    private fun submitQuery(query: String) {
        if (query.isNotEmpty()) {
            searchListener?.onQuerySubmit(query)
        }
    }

    private fun loadSounds(context: Context) {
        val sounds = intArrayOf(android.support.v17.leanback.R.raw.lb_voice_failure,
                android.support.v17.leanback.R.raw.lb_voice_open, android.support.v17.leanback.R.raw.lb_voice_no_input,
                android.support.v17.leanback.R.raw.lb_voice_success)
        for (sound in sounds) {
            soundMap.put(sound, soundPool.load(context, sound, 1))
        }
    }

    private fun play(resId: Int) {
        handler.post {
            val sound = soundMap.get(resId)
            soundPool.play(sound, FULL_LEFT_VOLUME, FULL_RIGHT_VOLUME, DEFAULT_PRIORITY,
                    DO_NOT_LOOP, DEFAULT_RATE)
        }
    }

    private fun playSearchOpen() {
        play(android.support.v17.leanback.R.raw.lb_voice_open)
    }

    private fun playSearchFailure() {
        play(android.support.v17.leanback.R.raw.lb_voice_failure)
    }

    private fun playSearchSuccess() {
        play(android.support.v17.leanback.R.raw.lb_voice_success)
    }
    
    interface SearchListener {

        fun onQueryChange(query: String)

        fun onQuerySubmit(query: String)
    }

    companion object {
        const val FULL_LEFT_VOLUME = 1.0f
        const val FULL_RIGHT_VOLUME = 1.0f
        const val DEFAULT_PRIORITY = 1
        const val DO_NOT_LOOP = 0
        const val DEFAULT_RATE = 1.0f
    }
}
```
Ở trên tôi đã cung cấp đầu đủ các function cần thiết cho chức năng voice search. Bao gồm cả hanlde âm thanh khi thao tác với button voice search (ở đây tôi dùng sound mặc định của leanback)

2. Tạo **Fragment Voice Search**. Bạn có thể thoái mái custom giao diện fragment này theo nhu cầu bản thân ở đây cho đơn giản mình chỉ tạo một icon voice search với một text view result trong fragment này
xml
```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".VoiceSearchFragment">

    <ImageView
        android:id="@+id/button_voice_search"
        android:layout_width="100dp"
        android:layout_height="100dp"
        android:layout_marginStart="100dp"
        android:layout_marginTop="100dp"
        android:focusable="true"
        android:focusableInTouchMode="true"
        android:src="@drawable/ic_keyboard_voice_black_24dp"
        android:tint="#4641a6">

        <requestFocus />
    </ImageView>

    <TextView
        android:id="@+id/text_result"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="150dp"
        android:layout_toEndOf="@id/button_voice_search"
        android:textSize="18sp"
        tools:text="Result" />
</RelativeLayout>
```
**VoiceSearchFragment**
```
class VoiceSearchFragment : Fragment() {

    private lateinit var voiceSearchManager: VoiceSearchManager
    private lateinit var voiceSearchButton: ImageView
    private lateinit var textResult: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_voice_search, container, false)
        voiceSearchButton = view.findViewById(R.id.button_voice_search)
        textResult = view.findViewById(R.id.text_result)
        return view
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        voiceSearchManager = VoiceSearchManager(requireContext())
        handleEvent()
    }

    private fun handleEvent() {
        voiceSearchManager.setSearchListener(object : VoiceSearchManager.SearchListener {
            override fun onQuerySubmit(query: String) {
                // khi kết thúc search
                textResult.text = query
            }

            override fun onQueryChange(query: String) {
                // đang trong quá trình nói
                textResult.text = query
            }

        })

        voiceSearchButton.setOnClickListener {
            toggleVoiceSearch()
        }
    }

    private fun toggleVoiceSearch() {
        if (voiceSearchManager.isRecognizing) {
            voiceSearchManager.stopRecognition()
        } else {
            voiceSearchManager.startRecognition()
        }
    }
}
```
Chỉnh sửa một chút trong **MainActivity** để chạy **VoiceSearchFragment** ngay lần đầu chạy app nhé
```
class MainActivity : FragmentActivity() {

    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
}

```
```
<?xml version="1.0" encoding="utf-8"?>
<fragment xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/main_browse_fragment"
    android:name="com.example.duong.demoleanback.VoiceSearchFragment"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    tools:deviceIds="tv"
    tools:ignore="MergeRootFrame" />
```
**Chạy thử** (Chú ý để chạy được bạn cần phải có device thật có hỗ trợ voice search nhé. Nếu không có tivi bạn hoàn toàn có thể sử dụng Device android mobile để test)

![](https://images.viblo.asia/225ca362-653e-4372-9f90-6cdeb4825917.png)\

# Cảm ơn các bạn đã theo dõi
#