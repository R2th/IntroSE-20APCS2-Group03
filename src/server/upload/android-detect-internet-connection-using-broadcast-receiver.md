Xin chào mọi người, với những ứng dụng hiện tại cần truy cập đến internet, việc kiểm tra internet đã kết nối hay không rất quan trọng. Ví dụ như Facebook, khi mất kết nối internet, sẽ hiện thị một thanh thông báo cho người dùng biết ở bên dưới.
Trong bài viết này, mình sẽ sử dụng boardcast để bắt trạng thái đã truy cập được internet hay không.
Chúng ta sẽ liệt kê được các kết nối như sau: 
1. Connecting.
2. Disconnected.
3. Disconnecting.
4. Suspended.
5. Unknown
Bắt đầu nhé !

## Thêm permission 
- Sau khi khởi tạo project xong, bạn cần thêm permission trong file AndroidManifest :
```
    <!-- This permissions are neccessary for broadcast receiver -->
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```
Ta cần 2 quyền đó là truy cập vào trạng thái của wifi và trạng thaí của mạng.
## Khai báo recever trong Androidmanifest 
- Chúng ta cần khai báo 1 receiver trong file manifest 
```
<receiver
            android:name="packetname.InternetConnector_Receiver"
            android:enabled="true" >
            <intent-filter>
 
                <!-- Intent filters for broadcast receiver -->
                <action android:name="android.net.conn.CONNECTIVITY_CHANGE" />
                <action android:name="android.net.wifi.WIFI_STATE_CHANGED" />
                <action android:name="android.net.wifi.STATE_CHANGE" />
            </intent-filter>
        </receiver>
```
Ta cần lưu ý một số điều sau: 
- Nếu như khai báo receiver trong file andorid manifest , recever đó hoạt động như 1 service, tức là có có thể khởi chạy khi app chạy trên background.
- Nếu như khai báo bằng code trong Activity, receiver đó chỉ hoạt động được khi app khởi chạy
Tuỳ vào bài toán thực tế mà chúng ta có thể sử dụng 1 cách linh hoạt 2 kiểu khai báo này !
Full file manifest sẽ có dạng như sau:
```
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.internetconnection_demo"
    android:versionCode="1"
    android:versionName="1.0" >
 
    <uses-sdk
        android:minSdkVersion="8"
        android:targetSdkVersion="22" />
 
    <!-- This permissions are neccessary for broadcast receiver -->
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    
    <!-- Put your MyApplication inside application tag -->
    <application
        android:name="com.internetconnection_demo.MyApplication"
        android:allowBackup="true"
        android:icon="@drawable/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme" >
        <activity
            android:name=".MainActivity"
            android:label="@string/app_name" >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
 
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
 
        <!-- Broadcast receiver declaration in manifest file and make sure to enable it -->
        <receiver
            android:name="com.internetconnection_demo.InternetConnector_Receiver"
            android:enabled="true" >
            <intent-filter>
 
                <!-- Intent filters for broadcast receiver -->
                <action android:name="android.net.conn.CONNECTIVITY_CHANGE" />
                <action android:name="android.net.wifi.WIFI_STATE_CHANGED" />
                <action android:name="android.net.wifi.STATE_CHANGE" />
            </intent-filter>
        </receiver>
    </application>
 
</manifest>
```
## Tạo application của app 
```
package com.internetconnection_demo;
 
import android.app.Application;
 
public class MyApplication extends Application {
 
 // Gloabl declaration of variable to use in whole app
 
 public static boolean activityVisible; // Variable that will check the
 // current activity state
 
 public static boolean isActivityVisible() {
 return activityVisible; // return true or false
 }
 
 public static void activityResumed() {
 activityVisible = true;// this will set true when activity resumed
 
 }
 
 public static void activityPaused() {
 activityVisible = false;// this will set false when activity paused
 
 }
 
}
```
## Tạo broadcast để bắt trạng thái internet 
```
package com.internetconnection_demo;
 
import android.content.Context;
import android.graphics.Color;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.TextView;
 
public class MainActivity extends AppCompatActivity {
 private static TextView internetStatus;
 
 @Override
 protected void onCreate(Bundle savedInstanceState) {
 super.onCreate(savedInstanceState);
 setContentView(R.layout.activity_main);
 internetStatus = (TextView) findViewById(R.id.internet_status);
 
 // At activity startup we manually check the internet status and change
 // the text status
 ConnectivityManager connectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
 NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();
 if (networkInfo != null && networkInfo.isConnected()) {
 changeTextStatus(true);
 } else {
 changeTextStatus(false);
 }
 
 }
 
 // Method to change the text status
 public void changeTextStatus(boolean isConnected) {
 
 // Change status according to boolean value
 if (isConnected) {
 internetStatus.setText("Internet Connected.");
 internetStatus.setTextColor(Color.parseColor("#00ff00"));
 } else {
 internetStatus.setText("Internet Disconnected.");
 internetStatus.setTextColor(Color.parseColor("#ff0000"));
 }
 }
 
 @Override
 protected void onPause() {
 
 super.onPause();
 MyApplication.activityPaused();// On Pause notify the Application
 }
 
 @Override
 protected void onResume() {
 
 super.onResume();
 MyApplication.activityResumed();// On Resume notify the Application
 }
 
}
```

## Tạo giao diện kiểm tra internet
```
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:gravity="center" >
 
    <!-- This text will display the status of internet -->
 
    <TextView
        android:id="@+id/internet_status"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:textSize="20sp"
        android:textStyle="bold" />
 
</RelativeLayout
```

Chỉ với vài dòng code đơn giản, chúng ta đã tạo ra được chức năng kiểm tra internet trong ứng dụng của mình. 

Các bạn có thể tham khảo code tại: https://github.com/sonusurender/Detect_Internet_Connection_Demo

Bài viết được tham khảo từ : https://www.androhub.com/android-detect-internet-connection-using-broadcast-receiver/comment-page-1/#comment-8656