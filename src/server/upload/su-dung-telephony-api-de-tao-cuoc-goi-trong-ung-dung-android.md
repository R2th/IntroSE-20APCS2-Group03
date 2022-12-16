Trong bài viết này, mình sẽ giới thiệu với các bạn Android Telephony API. Bạn sẽ học cách làm sao để thực hiện cuộc gọi từ ứng dụng của bạn và làm thế nào để theo dõi các sự kiện cuộc gọi điện thoại.

## 1. Tạo cuộc gọi

Để bắt đầu, mình sẽ chỉ cho bạn làm thế nào để bắt đầu một cuộc gọi từ ứng dụng của bạn bằng cách sử dụng ứng dụng điện thoại mặc định của máy hoặc thực hiện trực tiếp từ ứng dụng giúp người dùng thao tác dễ dàng hơn.

### Tạo mới Android Project

Tạo mới project với một activity rỗng MainActivity.

![](https://viblo.asia/uploads/766c12bf-2c18-4f7c-be9d-ccf914598c4a.jpg)

### Tạo layout

Giao diện sẽ bao gồm một EditText và một nút Dial :

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        android:id="@+id/activity_main"
        android:orientation="vertical"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:paddingLeft="@dimen/activity_horizontal_margin"
        android:paddingRight="@dimen/activity_horizontal_margin"
        android:paddingTop="@dimen/activity_vertical_margin"
        android:paddingBottom="@dimen/activity_vertical_margin"
        android:gravity="center_horizontal|center_vertical"
        tools:context="com.chikeandroid.tutsplust_telephony.MainActivity">
 
    <EditText
            android:id="@+id/et_phone_no"
            android:hint="Enter Phone number"
            android:inputType="phone"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"/>
     
    <Button
            android:id="@+id/btn_dial"
            android:layout_gravity="center_horizontal"
            android:text="Dial"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"/>
</LinearLayout>
```
![](https://viblo.asia/uploads/61d692ac-43d5-4741-a69b-3dfea0453138.jpg)

### Chỉnh sửa MainActivity class

Trong đoạn code dưới đây, mình sẽ gọi intent ACTION_DIAL để hiển thị ứng dụng điện thoại quay số. Số điện thoại sẽ được lấy từ tel URI scheme: tel:XXXXXXXX. Chú ý rằng, bạn không cần bất kì permission nào để thực hiện việc này :

```
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
 
public class MainActivity extends AppCompatActivity {
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button mDialButton = (Button) findViewById(R.id.btn_dial);
        final EditText mPhoneNoEt = (EditText) findViewById(R.id.et_phone_no);
 
        mDialButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String phoneNo = mPhoneNoEt.getText().toString();
                if(!TextUtils.isEmpty(phoneNo)) {
                    String dial = "tel:" + phoneNo;
                    startActivity(new Intent(Intent.ACTION_DIAL, Uri.parse(dial)));
                }else {
                    Toast.makeText(MainActivity.this, "Enter a phone number", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
}
```

Nếu bạn chạy ứng dụng và click vào nút DIAL, bạn sẽ được chuyển tới ứng dụng gọi điện của điện thoại, và từ đó bạn phải thực hiện bằng tay việc bấm số. 
Bạn có thể thay đổi việc này, tạo cuộc gọi từ chính bên trong ứng dụng chỉ đơn giản thay thế intent ACTION_DIAL bằng intent ACTION_CALL. Việc này sẽ yêu cầu permission android.permission.CALL_PHONE.

![](https://viblo.asia/uploads/34d71372-4ae9-4175-ac55-06f322cefec0.jpg)

## 2. Theo dõi các sự kiện của cuộc gọi

Trong phần này chúng ta sẽ theo dõi các sự kiện của cuộc gọi trong hệ thống Android. Cuộc gọi sẽ có thể nằm trong 3 trạng thái sau :

1. idle ( khi nó chưa được sử dụng )
2. ringing ( khi có một cuộc gọi đến )
3. off-hook ( khi cuộc gọi được trả lời )

### Thêm Permission

Chúng ta cần permission READ_PHONE_STATE  để có thể theo dõi trạng thái của cuộc gọi. Thêm nó vào AndroidManifest.xml :

```
<uses-permission android:name="android.permission.READ_PHONE_STATE"/>
```

### Tạo đối tượng PhoneStateListener

Chúng ta sẽ tạo một đối tượng của lớp  PhoneStateListener, và override lại hàm onCallStateChange. Chúng ta sẽ ghi nhận những thay đổi của trạng thái cuộc gọi bằng một thông báo Toast. 
Chú ý rằng chúng ta cũng có thể biết được các số điện thoại gọi đến khi gọi đến phương thức này :

```
// ... 
PhoneStateListener mPhoneStateListener = new PhoneStateListener() {
    @Override
    public void onCallStateChanged(int state, String incomingNumber) {
        super.onCallStateChanged(state, incomingNumber);
 
        switch (state) {
            case TelephonyManager.CALL_STATE_IDLE:
                Toast.makeText(MainActivity.this, "CALL_STATE_IDLE", Toast.LENGTH_SHORT).show();
                break;
            case TelephonyManager.CALL_STATE_RINGING:
                Toast.makeText(MainActivity.this, "CALL_STATE_RINGING", Toast.LENGTH_SHORT).show();
                break;
            case TelephonyManager.CALL_STATE_OFFHOOK:
                Toast.makeText(MainActivity.this, "CALL_STATE_OFFHOOK", Toast.LENGTH_SHORT).show();
                break;
        }
    }
};
// ...
```

Tùy thuộc vào mục đích của ứng dụng, bạn cũng có thể override lại các phương thức sau : onCellInfoChanged(), onCallForwardingIndicatorChanged(), onCellLocationChanged(), hoặc onSignalStrengthChanged().

### Lắng nghe trạng thái cuộc gọi.

Để bắt đầu lắng nghe trạng thái của cuộc gọi, chúng ta cần sử dụng đến TelephonyManager và khởi tạo nó trong onCreate() :

```
// ...
private TelephonyManager mTelephonyManager;
@Override
protected void onCreate(Bundle savedInstanceState) {
   // ... 
   mTelephonyManager = (TelephonyManager) getSystemService(getApplicationContext().TELEPHONY_SERVICE);
}
```

Trong hàm onResume(), chúng ta có thể bắt đầu lắng nghe bằng cách sử dụng phương thức TelephonyManager listen(), truyền vào một đối tượng PhoneStateListener và biến static LISTEN_CALL_STATE.
Chúng ta kết thúc việc lắng nghe trong onStop() bằng cách truyền LISTEN_NON như là tham số thứ 2 vào hàm listen().

Các tùy chọn khác có thể là LISTEN_CELL_LOCATION, LISTEN_SIGNAL_STRENGTH,  LISTEN_CALL_FORWARDING_INDICATOR, và LISTEN_CELL_INFO.

Cuối cùng, chạy ứng dụng và thực hiện một cuộc gọi đến :

![](https://viblo.asia/uploads/92bb349b-11f4-4530-ada9-90b832411add.jpg)

Việc theo dõi này sẽ chỉ hoạt động khi ứng dụng đang ở trạng thái sử dụng (foregrond). Để điều này thực hiện được ngay cả khi ứng dụng của chúng ta không hoạt động ( background), chúng ta cần tạo một BroadcastReceiver để theo dõi được trạng thái cuộc gọi ngay cả khi ứng dụng không chạy.

Chú ý rằng trong ví dụ trên chúng ta chỉ theo dõi được các cuộc gọi đến. Để theo dõi được các cuộc gọi đi, chúng ta cần thêm permission sau :

```
<uses-permission android:name="android.permission.PROCESS_OUTGOING_CALLS"/>

```

# 3. Tống kết

Như vậy trong bài viết này, bạn đã biết được :

- Tạo cuộc gọi từ ứng dụng của bạn.
- Theo dõi các sự kiện của cuộc gọi.

Ngoài ra, bạn có thể làm được nhiều việc hơn với cuộc gọi trong Android. Hãy tham khảo thêm tài liệu về ANdroid Telephone API để biết được nhiều hơn nhé.
https://developer.android.com/reference/android/provider/Telephony.html