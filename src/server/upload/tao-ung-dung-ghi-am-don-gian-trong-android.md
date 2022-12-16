Xin chào tất cả các bạn, trong bài viết này mình sẽ chia sẻ cách làm thế nào để tạo 1 trình ghi âm trong android.
Trong Android có micrô tích hợp, thông qua đó bạn có thể thu âm thanh và lưu trữ hoặc phát trong điện thoại. Có nhiều cách để chúng ta có thể thực hiện được việc ghi âm này, nhưng đơn giản và hiệu quả nhất sẽ thông qua MediaRecorder.
## Khởi tạo đối tượng MediaRecorder
Vậy, MediaRecorder là gì  ? Nó là 1 class được hệ thống support để ghi lại âm thanh hoặc video, để sử dụng  nó, trước tiên cần khởi tạo:
```
MediaRecorder myAudioRecorder = new MediaRecorder();

```
Bây giờ ta sẽ đặt định dạng nguồn , đầu ra và mã hóa và tệp đầu ra. Cú pháp như sau:
```
myAudioRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
myAudioRecorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP);
myAudioRecorder.setAudioEncoder(MediaRecorder.OutputFormat.AMR_NB);
myAudioRecorder.setOutputFile(outputFile);
```
## Bắt đầu ghi âm thanh
Sau khi chỉ định nguồn âm thanh và định dạng và tệp đầu ra , chúng ta có thể gọi hai phương thức chuẩn bị và bắt đầu ghi âm thanh như sau:
```
myAudioRecorder.prepare();
myAudioRecorder.start();
```
## Một số phương thức khác
Ngoài các phương thức này, còn có các phương thức khác được liệt kê trong class MediaRecorder cho phép bạn custom nhiều hơn đối với trình ghi âm thanh và video:
* setAudioSource (): hàm này chỉ ra nguồn âm thanh được ghi
* setVideoSource (): hàm này chỉ ra nguồn video sẽ được ghi lại.
* setOutputFormat (): hàm này sẽ chỉ ra format âm thanh được lưu trữ.
* setAudioEncoder (): chỉ ra bộ mã hóa âm thanh sẽ được sử dụng.
* setOutputFile (): chỉ ra đường dẫn lưu file khi ghi âm xong.
* stop(): dừng quá trình ghi âm lại.
## Tạo ứng dụng ghi âm
### Đầu tiên, chúng ta cần khai báo quyền trong AndroidManifest:
3 quyền yêu cầu bao gồm:
1. WRITE_EXTERNAL_STORAGE
2. RECORD_AUDIO
3. STORAGE

```
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
   package="com.example.sairamkrishna.myapplication" >
   
   <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
   <uses-permission android:name="android.permission.RECORD_AUDIO" /> 
	<uses-permission android:name="android.permission.STORAGE" /> 

   <application
      android:allowBackup="true"
      android:icon="@drawable/ic_launcher"
      android:label="@string/app_name"
      android:theme="@style/AppTheme" >
      
      <activity
         android:name="com.example.sairamkrishna.myapplication.MainActivity"
         android:label="@string/app_name" >
      
         <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
         </intent-filter>
      
      </activity>
      
   </application>
</manifest>
```
### Tạo giao diện
Trong bài này, chúng ta sẽ tạo giao diện khá đơn giản, như hình ảnh bên dưới đây:
![](https://images.viblo.asia/79420e70-f119-499f-8b43-292fa2929de4.jpg)

```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
   xmlns:tools="http://schemas.android.com/tools"
   android:layout_width="match_parent"
   android:layout_height="match_parent"
   android:paddingBottom="@dimen/activity_vertical_margin"
   android:paddingLeft="@dimen/activity_horizontal_margin"
   android:paddingRight="@dimen/activity_horizontal_margin"
   android:paddingTop="@dimen/activity_vertical_margin">

   <ImageView
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:id="@+id/imageView"
      android:layout_alignParentTop="true"
      android:layout_centerHorizontal="true"
      android:src="@drawable/abc"/>

   <Button
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:text="Record"
      android:id="@+id/button"
      android:layout_below="@+id/imageView"
      android:layout_alignParentLeft="true"
      android:layout_marginTop="37dp"
   />

   <Button
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:text="STOP"
      android:id="@+id/button2"
      android:layout_alignTop="@+id/button"
      android:layout_centerHorizontal="true"
   />

   <Button
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:text="Play"
      android:id="@+id/button3"
      android:layout_alignTop="@+id/button2"
      android:layout_alignParentRight="true"
      android:layout_alignParentEnd="true"
   />

   <Button
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:text="STOP PLAYING RECORDING "
      android:id="@+id/button4"
      android:layout_below="@+id/button2"
      android:layout_centerHorizontal="true"
      android:layout_marginTop="10dp" 
   />
</RelativeLayout>
```

### MainActivity.java
Full code xử lý logic:
```
package com.example.sairamkrishna.myapplication;

import android.media.MediaPlayer;
import android.media.MediaRecorder;

import android.os.Environment;
import android.support.v7.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;

import android.widget.Button;
import android.widget.Toast;

import java.io.IOException;
import java.util.Random;

import static android.Manifest.permission.RECORD_AUDIO;
import static android.Manifest.permission.WRITE_EXTERNAL_STORAGE;

import android.support.v4.app.ActivityCompat;
import android.content.pm.PackageManager;
import android.support.v4.content.ContextCompat;

public class MainActivity extends AppCompatActivity {

   Button buttonStart, buttonStop, buttonPlayLastRecordAudio, 
      buttonStopPlayingRecording ;
   String AudioSavePathInDevice = null;
   MediaRecorder mediaRecorder ;
   Random random ;
   String RandomAudioFileName = "ABCDEFGHIJKLMNOP";
   public static final int RequestPermissionCode = 1;
   MediaPlayer mediaPlayer ;

   @Override
   protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.activity_main);

      buttonStart = (Button) findViewById(R.id.button);
      buttonStop = (Button) findViewById(R.id.button2);
      buttonPlayLastRecordAudio = (Button) findViewById(R.id.button3);
      buttonStopPlayingRecording = (Button)findViewById(R.id.button4);

      buttonStop.setEnabled(false);
      buttonPlayLastRecordAudio.setEnabled(false);
      buttonStopPlayingRecording.setEnabled(false);

      random = new Random();

      buttonStart.setOnClickListener(new View.OnClickListener() {
         @Override
         public void onClick(View view) {

            if(checkPermission()) {

               AudioSavePathInDevice = 
                  Environment.getExternalStorageDirectory().getAbsolutePath() + "/" + 
                     CreateRandomAudioFileName(5) + "AudioRecording.3gp";

               MediaRecorderReady();

               try {
                  mediaRecorder.prepare();
                  mediaRecorder.start();
               } catch (IllegalStateException e) {
                  // TODO Auto-generated catch block
                  e.printStackTrace();
               } catch (IOException e) {
                  // TODO Auto-generated catch block
                  e.printStackTrace();
               }

               buttonStart.setEnabled(false);
               buttonStop.setEnabled(true);

               Toast.makeText(MainActivity.this, "Recording started", 
                  Toast.LENGTH_LONG).show();
            } else {
               requestPermission();
            }

         }
      });

      buttonStop.setOnClickListener(new View.OnClickListener() {
         @Override
         public void onClick(View view) {
            mediaRecorder.stop();
            buttonStop.setEnabled(false);
            buttonPlayLastRecordAudio.setEnabled(true);
            buttonStart.setEnabled(true);
            buttonStopPlayingRecording.setEnabled(false);

            Toast.makeText(MainActivity.this, "Recording Completed", 
               Toast.LENGTH_LONG).show();
         }
      });

      buttonPlayLastRecordAudio.setOnClickListener(new View.OnClickListener() {
         @Override
         public void onClick(View view) throws IllegalArgumentException, 
            SecurityException, IllegalStateException {
               
            buttonStop.setEnabled(false);
            buttonStart.setEnabled(false);
            buttonStopPlayingRecording.setEnabled(true);

            mediaPlayer = new MediaPlayer();
            try {
               mediaPlayer.setDataSource(AudioSavePathInDevice);
               mediaPlayer.prepare();
            } catch (IOException e) {
               e.printStackTrace();
            }

            mediaPlayer.start();
            Toast.makeText(MainActivity.this, "Recording Playing", 
               Toast.LENGTH_LONG).show();
         }
      });

      buttonStopPlayingRecording.setOnClickListener(new View.OnClickListener() {
         @Override
         public void onClick(View view) {
            buttonStop.setEnabled(false);
            buttonStart.setEnabled(true);
            buttonStopPlayingRecording.setEnabled(false);
            buttonPlayLastRecordAudio.setEnabled(true);

            if(mediaPlayer != null){
               mediaPlayer.stop();
               mediaPlayer.release();
               MediaRecorderReady();
            }
         }
      });
      
   }

   public void MediaRecorderReady(){
      mediaRecorder=new MediaRecorder();
      mediaRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
      mediaRecorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP);
      mediaRecorder.setAudioEncoder(MediaRecorder.OutputFormat.AMR_NB);
      mediaRecorder.setOutputFile(AudioSavePathInDevice);
   }

   public String CreateRandomAudioFileName(int string){
      StringBuilder stringBuilder = new StringBuilder( string );
      int i = 0 ;
      while(i < string ) {   
         stringBuilder.append(RandomAudioFileName.
            charAt(random.nextInt(RandomAudioFileName.length())));

         i++ ;
      }
      return stringBuilder.toString();
   }

   private void requestPermission() {
      ActivityCompat.requestPermissions(MainActivity.this, new 
         String[]{WRITE_EXTERNAL_STORAGE, RECORD_AUDIO}, RequestPermissionCode);
   }

   @Override
   public void onRequestPermissionsResult(int requestCode, 
      String permissions[], int[] grantResults) {
      switch (requestCode) {
         case RequestPermissionCode:
            if (grantResults.length> 0) {
            boolean StoragePermission = grantResults[0] == 
               PackageManager.PERMISSION_GRANTED;
            boolean RecordPermission = grantResults[1] == 
               PackageManager.PERMISSION_GRANTED;
                     
            if (StoragePermission && RecordPermission) {
               Toast.makeText(MainActivity.this, "Permission Granted", 
                  Toast.LENGTH_LONG).show();
            } else {
               Toast.makeText(MainActivity.this,"Permission 
                  Denied",Toast.LENGTH_LONG).show();
            }
         }
         break;
      }
   }

   public boolean checkPermission() {
      int result = ContextCompat.checkSelfPermission(getApplicationContext(), 
         WRITE_EXTERNAL_STORAGE);
      int result1 = ContextCompat.checkSelfPermission(getApplicationContext(), 
         RECORD_AUDIO);
      return result == PackageManager.PERMISSION_GRANTED && 
         result1 == PackageManager.PERMISSION_GRANTED;
   }
}
```
Bài viết được tham khảo tại: 

https://www.tutorialspoint.com/android/android_audio_capture.htm

Rất mong nhận được sự góp ý của các bạn để bài viết hoàn chỉnh hơn !

Code example:
https://github.com/te253111/AudioCapture