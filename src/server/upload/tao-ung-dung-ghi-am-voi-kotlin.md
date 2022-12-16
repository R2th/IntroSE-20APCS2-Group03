Android multimedia framework bao gồm hỗ trợ ghi và phát âm thanh. Trong bài viết này, chúng ta sẽ phát triển một ứng dụng Sound Recorder cơ bản có khả năng ghi lại âm thanh và lưu nó vào bộ nhớ cục bộ của thiết bị Android bằng MediaRecorder được cung cấp bởi SDK Android.

Bạn cũng sẽ tìm hiểu cách yêu cầu quyền của người dùng trong thời gian thực và cách làm việc với bộ nhớ cục bộ của thiết bị Android.
## 1. Khởi tạo UI
Trước tiên, chúng ta cần xây dựng giao diện người dùng của Audio Recorder. Nó bao gồm một bố cục đơn giản với 3 nút sẽ được sử dụng để bắt đầu, tạm dừng, tiếp tục và dừng ghi âm
```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent" android:layout_height="match_parent"
        tools:context=".MainActivity">

    <TextView
            android:id="@+id/textview_sound_recorder_heading"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Sound Recorder"
            android:layout_centerHorizontal="true"
            android:textSize="32dp"
            android:textStyle="bold"
            android:textColor="#000"
            android:layout_marginTop="32dp"
    />

    <Button
            android:id="@+id/button_start_recording"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Start"
            android:layout_alignParentBottom="true"
            android:layout_marginLeft="32dp"
            android:layout_marginBottom="32dp"
            android:layout_centerVertical="true"/>

    <Button
            android:id="@+id/button_pause_recording"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Pause"
            android:layout_alignParentBottom="true"
            android:layout_centerHorizontal="true"
            android:layout_marginBottom="32dp"/>

    <Button
            android:id="@+id/button_stop_recording"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Stop"
            android:layout_alignParentBottom="true"
            android:layout_alignParentRight="true"
            android:layout_marginBottom="32dp"
            android:layout_marginRight="32dp"/>
</RelativeLayout>
```
## 2. Yêu cầu quyền truy cập
Sau khi tạo giao diện người dùng, chúng ta gần như có thể bắt đầu sử dụng **MediaRecorder** để xây dựng ứng dụng của mình. Nhưng trước tiên, chúng ta cần yêu cầu các quyền cần thiết để ghi lại âm thanh và truy cập vào bộ nhớ cục bộ với một số dòng mã đơn giản trong tệp **AndroidManifest.xml**.
```
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```
Chúng ta cũng cần kiểm tra xem người dùng có thực sự kích hoạt các quyền hay không trước khi có thể sử dụng MediaRecorder ở trong tệp MainActivity.kt.
```
if (ContextCompat.checkSelfPermission(this,
      Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED && ContextCompat.checkSelfPermission(this,
      Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
  val permissions = arrayOf(android.Manifest.permission.RECORD_AUDIO, android.Manifest.permission.WRITE_EXTERNAL_STORAGE, android.Manifest.permission.READ_EXTERNAL_STORAGE)
  ActivityCompat.requestPermissions(this, permissions,0)
}
```
**Note:**  Dòng code này sau đó sẽ được di chuyển trong lệnh gọi OnClickListener của nút start_recording  để có thể đảm bảo rằng **MediaRecorder** sẽ không được khởi động nếu không có quyền phù hợp.
## 3. Ghi và lưu âm thanh
### Thêm  xử lí sự kiện OnClickListeners
Trước tiên, chúng ta cần thêm OnClickListener vào các nút để đảm bảo chúng phản ứng với các sự kiện click của người dùng. Như đã đề cập trước khi kiểm tra các quyền phù hợp sẽ được thêm vào trong lệnh gọi OnClickListener của nút start_recording.
```
button_start_recording.setOnClickListener {
    if (ContextCompat.checkSelfPermission(this,
            Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED && ContextCompat.checkSelfPermission(this,
            Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
        val permissions = arrayOf(android.Manifest.permission.RECORD_AUDIO, android.Manifest.permission.WRITE_EXTERNAL_STORAGE, android.Manifest.permission.READ_EXTERNAL_STORAGE)
        ActivityCompat.requestPermissions(this, permissions,0)
    } else {
        startRecording()
    }
}

button_stop_recording.setOnClickListener{
    stopRecording()
}

button_pause_recording.setOnClickListener {
    pauseRecording()
}
```
### Cấu hình MediaRecorder
Tiếp theo, chúng ta cần xác định đường dẫn cho đầu ra của mình và bắt đầu định cấu hình **MediaRecorder**.
```
private var output: String? = null
private var mediaRecorder: MediaRecorder? = null
private var state: Boolean = false
private var recordingStopped: Boolean = false

override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)

    output = Environment.getExternalStorageDirectory().absolutePath + "/recording.mp3"
    mediaRecorder = MediaRecorder()
    
    mediaRecorder?.setAudioSource(MediaRecorder.AudioSource.MIC)
    mediaRecorder?.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4)
    mediaRecorder?.setAudioEncoder(MediaRecorder.AudioEncoder.AAC)
    mediaRecorder?.setOutputFile(output)
}
```
Ở đây, chúng ta có được đường dẫn đến thư mục gốc của bộ lưu trữ ngoài và thêm tên bản ghi và tên tệp của chúng vào đó. Sau đó, chúng ta tạo đối tượng **MediaRecorder** và xác định nguồn âm thanh, bộ mã hóa âm thanh, định dạng đầu ra và tệp đầu ra.
### Ghi và lưu âm thanh
Code được sử dụng để bắt đầu MediaRecorder được xác định trong OnClickListener của nút start_recording 
```
private fun startRecording() {
    try {
        mediaRecorder?.prepare()
        mediaRecorder?.start()
        state = true
        Toast.makeText(this, "Recording started!", Toast.LENGTH_SHORT).show()
    } catch (e: IllegalStateException) {
        e.printStackTrace()
    } catch (e: IOException) {
        e.printStackTrace()
    }
}
```
Như bạn thấy chúng ta cần gọi chức năng **prepare()** trước khi có thể bắt đầu ghi âm. Và cũng cho nó vào một khối try catch để đảm bảo ứng dụng  không bị  crash khi chức năng **prepare()**  bị lỗi

OnClickListener của nút stop rất giống với nút chúng ta đã xác định ở trên
```
private fun stopRecording(){
    if(state){
        mediaRecorder?.stop()
        mediaRecorder?.release()
        state = false
    }else{
        Toast.makeText(this, "You are not recording right now!", Toast.LENGTH_SHORT).show()
    }
}
```
Ở đây, chúng ta kiểm tra xem **MediaRecorder** có đang chạy hay không trước khi thực sự dừng ghi âm vì ứng dụng của chúng ta sẽ bị crash nếu phương thức **stop()** được gọi trong khi MediaRecorder không phải là bản ghi. Sau đó, chúng ta thay đổi biến trạng thái thành false để ngăn người dùng nhấn nút **stop**.
Sau đó, chúng ta chỉ cần xác định OnClickListener cho nút pause/resume 
```
@SuppressLint("RestrictedApi", "SetTextI18n")
@TargetApi(Build.VERSION_CODES.N)
private fun pauseRecording() {
    if(state) {
        if(!recordingStopped){
            Toast.makeText(this,"Stopped!", Toast.LENGTH_SHORT).show()
            mediaRecorder?.pause()
            recordingStopped = true
            button_pause_recording.text = "Resume"
        }else{
            resumeRecording()
        }
    }
}

@SuppressLint("RestrictedApi", "SetTextI18n")
@TargetApi(Build.VERSION_CODES.N)
private fun resumeRecording() {
    Toast.makeText(this,"Resume!", Toast.LENGTH_SHORT).show()
    mediaRecorder?.resume()
    button_pause_recording.text = "Pause"
    recordingStopped = false
}
```
Trong hai phương thức này, chúng ta kiểm tra xem **MediaRecorder** có đang chạy hay không. Nếu đang chạy thì chúng ta tạm dừng ghi âm và thay đổi text của nút thành "Pause". Nếu nhấp lại, bản ghi sẽ tiếp tục từ điểm còn lại của nó.

Cuối cùng, chúng ta có thể bắt đầu ghi âm và nghe nó bằng cách mở tệp records.mp3 sẽ được lưu trong bộ nhớ cục bộ của thiết bị.
### Mã nguồn hoàn chỉnh cho MainActivity.kt
```
package com.framgia.soundrecorder

import android.Manifest
import android.annotation.SuppressLint
import android.annotation.TargetApi
import android.content.pm.PackageManager
import android.media.MediaRecorder
import android.os.Build
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.os.Environment
import android.support.v4.app.ActivityCompat
import android.support.v4.content.ContextCompat
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_main.*
import java.io.IOException

class MainActivity : AppCompatActivity() {

    private var output: String? = null
    private var mediaRecorder: MediaRecorder? = null
    private var state: Boolean = false
    private var recordingStopped: Boolean = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        mediaRecorder = MediaRecorder()
        output = Environment.getExternalStorageDirectory().absolutePath + "/recording.mp3"

        mediaRecorder?.setAudioSource(MediaRecorder.AudioSource.MIC)
        mediaRecorder?.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4)
        mediaRecorder?.setAudioEncoder(MediaRecorder.AudioEncoder.AAC)
        mediaRecorder?.setOutputFile(output)

        button_start_recording.setOnClickListener {
            if (ContextCompat.checkSelfPermission(this,
                    Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED && ContextCompat.checkSelfPermission(this,
                    Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
                val permissions = arrayOf(android.Manifest.permission.RECORD_AUDIO, android.Manifest.permission.WRITE_EXTERNAL_STORAGE, android.Manifest.permission.READ_EXTERNAL_STORAGE)
                ActivityCompat.requestPermissions(this, permissions,0)
            } else {
                startRecording()
            }
        }

        button_stop_recording.setOnClickListener{
            stopRecording()
        }

        button_pause_recording.setOnClickListener {
            pauseRecording()
        }
    }

    private fun startRecording() {
        try {
            mediaRecorder?.prepare()
            mediaRecorder?.start()
            state = true
            Toast.makeText(this, "Recording started!", Toast.LENGTH_SHORT).show()
        } catch (e: IllegalStateException) {
            e.printStackTrace()
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }

    @SuppressLint("RestrictedApi", "SetTextI18n")
    @TargetApi(Build.VERSION_CODES.N)
    private fun pauseRecording() {
        if(state) {
            if(!recordingStopped){
                Toast.makeText(this,"Stopped!", Toast.LENGTH_SHORT).show()
                mediaRecorder?.pause()
                recordingStopped = true
                button_pause_recording.text = "Resume"
            }else{
                resumeRecording()
            }
        }
    }

    @SuppressLint("RestrictedApi", "SetTextI18n")
    @TargetApi(Build.VERSION_CODES.N)
    private fun resumeRecording() {
        Toast.makeText(this,"Resume!", Toast.LENGTH_SHORT).show()
        mediaRecorder?.resume()
        button_pause_recording.text = "Pause"
        recordingStopped = false
    }

    private fun stopRecording(){
        if(state){
            mediaRecorder?.stop()
            mediaRecorder?.release()
            state = false
        }else{
            Toast.makeText(this, "You are not recording right now!", Toast.LENGTH_SHORT).show()
        }
    }
}
```
## 4. Tìm kiếm tệp âm thanh
Sau khi ghi, bạn cần vào bộ nhớ cục bộ của thiết bị Android để nghe bản ghi âm của mình.
1. Mở ứng dụng tập tin trên thiết bị của bạn
2. Đi đến thư mục đã đăng kí
3. Tìm kiếm recording.mp3
## 5. Tổng kết
Bây giờ bạn đã biết MediaRecorder hoạt động như thế nào, làm thế nào để có thể yêu cầu quyền truy cập trong thời gian thực và điều quan trọng là tại sao phải làm như vậy. 
Bạn cũng đã tìm hiểu về bộ nhớ cục bộ của thiết bị Android và cách bạn lưu trữ dữ liệu trong đó.

-----
Link tham khảo: https://android.jlelse.eu/create-an-android-sound-recorder-using-kotlin-36902b3bf967