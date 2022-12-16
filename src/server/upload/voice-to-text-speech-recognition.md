The SpeechRecognizer class provides access to the speech recognition service. Its a google Api service that provides you with necessary utils that allows the recognition of well... speech. So to but it in simplier terms, this api allows you to talk to your devices and converts your speech into text. In order for this service to run its methods have to be invoked only from thr main application thread.

Now lets create and app to demo how it works. Note: In this demo we will use our own interface and not that of the google's intent.

Create an Android Project and select Kotlin as the app's language. Now open the Manifest file and add this permission:

**AndroidManifest.xml**

`<uses-permission android:name="android.permission.RECORD_AUDIO" />`

Next open the activity_main.xml and add a button and a TextView.

**activity_main.xml**

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:layout_margin="10dp"
    android:orientation="vertical"
    tools:context=".MainActivity">

    <Button
        android:id="@+id/BtnStart"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="20dp"
        android:text="START"
        android:textSize="20sp" />

    <TextView
        android:id="@+id/TvSpeechText"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="12sp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</LinearLayout>
```

Now that the layout is ready we will open the MainActivity.kt class and add a listener to the button. This listener will trigger a function that will call the SpeechRecognizer to start listening to your voice and inturn returns the speech in the form of text which we will then pass to the TextView.

**MainActivity.kt**

Add below variables:
```
lateinit var tvSpeech: TextView
lateinit var btnStart: Button
var formattedSpeech: StringBuffer = StringBuffer()
```

Then on the onCreate method initiate our elements and add a listener to the btnStart:

```
tvSpeech = findViewById(R.id.TvSpeechText)
btnStart = findViewById(R.id.BtnStart)
btnStart.setOnClickListener {
    startListening()
}
```

So whenever you click the btnStart it will call the function **startListening()** All that is left now is to create the startListening() function.

```
private fun startListening() {
        val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)
        intent.putExtra(
            RecognizerIntent.EXTRA_LANGUAGE_MODEL,
            RecognizerIntent.LANGUAGE_MODEL_FREE_FORM
        )
        intent.putExtra(
            RecognizerIntent.EXTRA_CALLING_PACKAGE,
            "com.domain.app"
        )
        val recognizer = SpeechRecognizer
            .createSpeechRecognizer(this)
        val listener: RecognitionListener = object : RecognitionListener {
            override fun onResults(results: Bundle) {
                val voiceResults = results
                    .getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
                if (voiceResults == null) {
                    println("No voice results")
                } else {
                    for (match in voiceResults) {
                        formattedSpeech.append(String.format("\n- %s",match.toString()))
                        tvSpeech.text = formattedSpeech.toString()
                    }
                }
            }

            override fun onReadyForSpeech(params: Bundle) {
                println("Ready for speech")
            }

            /**
             * ERROR_NETWORK_TIMEOUT = 1;
             * ERROR_NETWORK = 2;
             * ERROR_AUDIO = 3;
             * ERROR_SERVER = 4;
             * ERROR_CLIENT = 5;
             * ERROR_SPEECH_TIMEOUT = 6;
             * ERROR_NO_MATCH = 7;
             * ERROR_RECOGNIZER_BUSY = 8;
             * ERROR_INSUFFICIENT_PERMISSIONS = 9;
             *
             * @param error code is defined in SpeechRecognizer
             */
            override fun onError(error: Int) {
                System.err.println("Error listening for speech: $error")
            }

            override fun onBeginningOfSpeech() {
                // TODO Auto-generated method stub
            }

            override fun onBufferReceived(buffer: ByteArray) {
                // TODO Auto-generated method stub
            }

            override fun onEndOfSpeech() {
                // TODO Auto-generated method stub
            }

            override fun onEvent(eventType: Int, params: Bundle) {
                // TODO Auto-generated method stub
            }

            override fun onPartialResults(partialResults: Bundle) {
                // TODO Auto-generated method stub
            }

            override fun onRmsChanged(rmsdB: Float) {
                // TODO Auto-generated method stub
            }
        }
        recognizer.setRecognitionListener(listener)
        recognizer.startListening(intent)
    }
```

The SpeechRecognizer has some override methods such as onReadyForSpeech(), onError() and so on. The onError return an Int and it is represented as shown in the above and below code so you can handle it accordingly if needed.

/**
 * ERROR_NETWORK_TIMEOUT = 1;
 * ERROR_NETWORK = 2;
 * ERROR_AUDIO = 3;
 * ERROR_SERVER = 4;
 * ERROR_CLIENT = 5;
 * ERROR_SPEECH_TIMEOUT = 6;
 * ERROR_NO_MATCH = 7;
 * ERROR_RECOGNIZER_BUSY = 8;
 * ERROR_INSUFFICIENT_PERMISSIONS = 9;
 - @param error code is defined in SpeechRecognizer
 */
 
 After the RecognitionListener is initiated the text results will be returned in the `onResults(results: Bundle)` callback and it is here you will get your result, converts it to text and set to your edit text. I have formatted the text and used a StringBuffer **formattedSpeech** so i can concacinate each result after speech in the textview.

Here is the full code in MainActivity.

**MainActivity.kt**


```
import android.content.Intent
import android.os.Bundle
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import android.widget.Button
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    lateinit var tvSpeech: TextView
    lateinit var btnStart: Button
    var formattedSpeech: StringBuffer = StringBuffer()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        tvSpeech = findViewById(R.id.TvSpeechText)
        btnStart = findViewById(R.id.BtnStart)
        btnStart.setOnClickListener {
            startListening()
        }
    }

    private fun startListening() {
        val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)
        intent.putExtra(
            RecognizerIntent.EXTRA_LANGUAGE_MODEL,
            RecognizerIntent.LANGUAGE_MODEL_FREE_FORM
        )
        intent.putExtra(
            RecognizerIntent.EXTRA_CALLING_PACKAGE,
            "com.domain.app"
        )
        val recognizer = SpeechRecognizer
            .createSpeechRecognizer(this)
        val listener: RecognitionListener = object : RecognitionListener {
            override fun onResults(results: Bundle) {
                val voiceResults = results
                    .getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
                if (voiceResults == null) {
                    println("No voice results")
                } else {
                    for (match in voiceResults) {
                        formattedSpeech.append(String.format("\n- %s",match.toString()))
                        tvSpeech.text = formattedSpeech.toString()
                    }
                }
            }

            override fun onReadyForSpeech(params: Bundle) {
                println("Ready for speech")
            }

            /**
             * ERROR_NETWORK_TIMEOUT = 1;
             * ERROR_NETWORK = 2;
             * ERROR_AUDIO = 3;
             * ERROR_SERVER = 4;
             * ERROR_CLIENT = 5;
             * ERROR_SPEECH_TIMEOUT = 6;
             * ERROR_NO_MATCH = 7;
             * ERROR_RECOGNIZER_BUSY = 8;
             * ERROR_INSUFFICIENT_PERMISSIONS = 9;
             *
             * @param error code is defined in SpeechRecognizer
             */
            override fun onError(error: Int) {
                System.err.println("Error listening for speech: $error")
            }

            override fun onBeginningOfSpeech() {
                // TODO Auto-generated method stub
            }

            override fun onBufferReceived(buffer: ByteArray) {
                // TODO Auto-generated method stub
            }

            override fun onEndOfSpeech() {
                // TODO Auto-generated method stub
            }

            override fun onEvent(eventType: Int, params: Bundle) {
                // TODO Auto-generated method stub
            }

            override fun onPartialResults(partialResults: Bundle) {
                // TODO Auto-generated method stub
            }

            override fun onRmsChanged(rmsdB: Float) {
                // TODO Auto-generated method stub
            }
        }
        recognizer.setRecognitionListener(listener)
        recognizer.startListening(intent)
    }
}
```

Run the App and press start to start listening. The text should be displayed right after you done talking and click again to start over listening. This can be useful in taking notes or even further improved as a voice to text recorder. The final app is up to you.

Quick Note: Since Android 6.0 introduces App Permission you will need to allow permission manually for this app to run. I didnt cover this in this tutorial but you can refer my previous tutorials in order to add permission to the app.

Happy Coding!

**DEMO**

https://drive.google.com/file/d/1F5gVwY4E4gyMWtLHtNivHQTWcxyg_g5w/view?usp=drivesdk