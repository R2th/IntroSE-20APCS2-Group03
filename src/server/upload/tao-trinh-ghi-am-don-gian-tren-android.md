Trong bài viết này, tôi sẽ hướng dẫn các bạn tạo cách tạo Trình ghi âm trên Android bằng cách sử dụng API MediaRecorder được cung cấp trong Android SDK.

![](https://images.viblo.asia/a2b7d2b4-b362-45c2-97db-14d8fe7704ca.png)

### **1.Tạo UI**
Trước tiên, chúng ta cần tạo một giao diện người dùng cho Audio Recorder của chúng ta. Tôi sẽ tạo nó một cách đơn giản với 3 button: 
 - Button đầu tiên sẽ bắt đầu trình ghi âm.
 - Button thứ hai để dừng ghi âm thanh.
 - Button cuối cùng để phát âm thanh đã ghi âm.
```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:layout_marginTop="100dp"
    tools:context="com.tuanlvt.demo_audio.MainActivity"
    >

    <Button
        android:id="@+id/start"
        android:padding="20dp"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:text="Start"
        android:textSize="20sp"
        />
    <Button
        android:id="@+id/stop"
        android:padding="20dp"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@id/start"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="10dp"
        android:text="Stop"
        android:textSize="20sp"
        />
    <Button
        android:id="@+id/play"
        android:padding="20dp"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@id/stop"
        android:layout_centerHorizontal="true"
        android:layout_marginTop="10dp"
        android:text="Play"
        android:textSize="20sp"
        />
</RelativeLayout>
```

### **2. Code Xử lý ghi âm và phát.**
 Tiếp theo là code cho  class Activty để chạy ứng dụng nào. Trước tiên,  khai báo button trước:
 `public class MainActivity extends AppCompatActivity {

    private Button start, stop, play;
    private MediaRecorder myAudioRecorder;
    private String outputFile;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        start = findViewById(R.id.start);
        stop = findViewById(R.id.stop);
        play = findViewById(R.id.play);
        stop.setEnabled(false);
        play.setEnabled(false);
    }
}
`
Chúng ta cần phải vô hiệu hóa nút **stop** và **play** khi activity được tạo bằng cách gọi phương thức **setEnabled** với tham số **false**. Sau đó, chúng ta cần xác định một đường dẫn cho tệp kết quả của bản ghi âm. Nó sẽ được lưu trữ trong một biến **String** có tên **outputFile**:
```
String outputFile = Environment.getExternalStorageDirectory().getAbsolutePath() + "/recording.3gp";
```
Ở đây,  tôi chọn lưu trữ các tập tin của thư mục lưu trữ bên ngoài. Bây giờ, bây giờ là lúc để cấu hình đối tượng MediaRecorder sẽ cho phép chúng ta ghi lại âm thanh:
```
MediaRecorder myAudioRecorder = new MediaRecorder();
myAudioRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
myAudioRecorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP);
myAudioRecorder.setAudioEncoder(MediaRecorder.OutputFormat.AMR_NB);
myAudioRecorder.setOutputFile(outputFile);
```
Chúng tôi xác định:
 - Nguồn âm thanh, Micro : AudioSource.MIC
 -   Định dạng đầu ra : OutputFormat.THREE_GPP
 -   Bộ mã hóa âm thanh : OutputFormat.AMR_NB 
 -   Tệp xuất mà âm thanh đã ghi sẽ được lưu : outputFile

Code được sử dụng để bắt đầu thu âm âm thanh được định nghĩa trong **OnClickListener** của button **start**: 
```
start.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    myAudioRecorder.prepare();
                    myAudioRecorder.start();
                } catch (IllegalStateException ise) {
                    // make something ...
                } catch (IOException ioe) {
                    // make something
                }
                start.setEnabled(false);
                stop.setEnabled(true);
                Toast.makeText(getApplicationContext(), "Recording started", Toast.LENGTH_LONG)
                        .show();
            }
        });
```
Như bạn có thể thấy, trước khi bắt đầu thu âm, tôi phải gọi phương thức **prepare()** của Object MediaRecorder sau đó bạn có thể gọi phương thức **start()**.

Tôi thực hiện cùng một implementation để **setOnClickListener** trên button stop:
```
 stop.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                myAudioRecorder.stop();
                myAudioRecorder.release();
                myAudioRecorder = null;
                start.setEnabled(true);
                stop.setEnabled(false);
                play.setEnabled(true);
                Toast.makeText(getApplicationContext(), "Audio Recorder successfully",
                        Toast.LENGTH_LONG).show();
            }
        });
```
Ở đây, chúng ta dừng ghi âm bằng cách gọi phương thức **stop()** của Object MediaRecorder. Sau đó, chúng ta cần gọi phương thức **release()**. Điều cuối cùng là **setEnabled()** cho button.  Tôi *set false*  cho button *stop* và *set true* cho button *start & play*. Bây giờ, chúng ta có một tập tin âm thanh ghi lại được lưu trữ ở đường dẫn *outputFile*. Vì vậy, chúng ta có thể bắt đầu mở trình phát âm thanh các tập tin đã ghi âm:
```
play.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                MediaPlayer mediaPlayer = new MediaPlayer();
                try {
                    mediaPlayer.setDataSource(outputFile);
                    mediaPlayer.prepare();
                    mediaPlayer.start();
                    Toast.makeText(getApplicationContext(), "Playing Audio", Toast.LENGTH_LONG)
                            .show();
                } catch (Exception e) {
                    // make something
                }
            }
        });
```
Để bắt đầu play tệp tin âm thanh,  tôi sẽ sử dụng MediaPlayer API. Tôi tạo ra một instance MediaPlayer và tôi thiết lập đường dẫn của tệp âm thanh để phát. Trước khi play tập tin âm thanh,  cần phải gọi phương thức **prepare()** của Object MediaPlayer. Cuối cùng,  ta có thể phát tệp bằng cách gọi phương thức start().

Ngoài những điều trên thì bạn phải nhớ thêm các** uses-permission** này vào file *AndroidManifest.xml* nhé:
```
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```

Chúc các bạn thành công.