## Broadcast Receiver là gì?
Đã bao giờ bạn tự hỏi hệ thống Android làm cách nào mà có thể nhận biết được tất cả những sự thay đổi của hê thống như lắng nghe tin nhắn đến, hành động rút - cắm sạc, hay hành động bật tắt mạng,... đó chính xác là hệ thống sử dụng Broadcast Receiver để làm. Vậy chúng ta đi vào tìm hiểu Broadcast Receiver là gì.

**1**. Broadcast Receiver là một trong 4 component lớn trong Android, với mục đích là lắng nghe các sự kiện, trạng thái của hệ thống phát ra thông qua Intent nhờ đó mà các lập trình viên có thể xử lí được các sự kiện hệ thống ở bên trong ứng dụng của mình.

**2**. Broadcast Receiver có thể hoạt động được cả khi ứng dụng bị tắt đi, nghĩa là ở background chính vì vậy nó thường được sử dụng với service.

## Cách đăng ký Broadcast
### 1. Đăng ký trong file AndroidManifest 

   Là cách chúng ta khai báo Broadcast Receiver trong Manifest và khi lần đầu khởi chạy ứng dụng thì nó sẽ đăng ký Broadcast và cứ thế nó start cho đến khi các bạn XOÁ ứng dụng đi.Nó vẫn lắng nghe khi các bạn đã tắt ứng dụng đi luôn nhé đây là ưu điểm của cách đăng ký này.
 
```java
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

     <receiver android:name=".Broadcast">
         <intent-filter>
             <action android:name="android.intent.action.AIRPLANE_MODE"/>
         </intent-filter>
     </receiver>
</application>
```
   
   Ở đây trong thẻ `<intent-filter>` có sự kiện lắng nghe là `<action android:name="android.intent.action.AIRPLANE_MODE"/>` tương ứng với sự kiện bật tắt chế độ máy bay. Nếu không có action này thì chúng ta sẽ không nhận được bất kì thông báo nào khi có sự thay đổi. 
   Ở trên chúng ta đã thực hiện đăng ký lắng nghe bây giờ chúng ta sẽ xử lý kết quả trả về bằng cách tạo một class mới extends lại BroadcastReceiver 

```java
public class Broadcast extends BroadcastReceiver {
            @Override
            public void onReceive(Context context, Intent intent) {
                Log.d(Broadcast.class.getSimpleName(), "Air Plane mode");
            }
        }
```
   
   Chúng ta Override lại hàm onReceive() và khi có sự thay đổi thì sẽ đi vào hàm này ở đây mình đặt Log để nhận biết khi có sự thay đổi bật tắt chế độ máy bay. Kết quả thu được
   
   ![](https://images.viblo.asia/6be3f0ea-ecca-4c14-9217-cf616c1da01b.png)
   
### **2. Đăng ký trong file Java**

   Đây là cách thông dụng nhất vì đa số trong các ứng dụng chúng ta chỉ lắng nghe trong phạm vi ứng dụng của mình, khi kết thúc thì chúng ta cũng ngừng lắng nghe luôn.
   Chúng ta cũng làm như ở cách đăng ký ở trong file Manifest chỉ khác biệt ở trong cách đăng ký.

```java
 public class MainActivity extends AppCompatActivity {

            private Broadcast broadcast;

            @Override
            protected void onCreate(Bundle savedInstanceState) {
                super.onCreate(savedInstanceState);
                setContentView(R.layout.activity_main);
                broadcast = new Broadcast();
                IntentFilter filter = new IntentFilter("android.intent.action.AIRPLANE_MODE");
                registerReceiver(broadcast, filter);
            }

            @Override
            protected void onStop() {
                super.onStop();
                unregisterReceiver(broadcast);
            }
        }
```

   
Ở đây chúng ta tạo một cái IntentFilter để đăng ký lắng nghe hành động bật tắt chế độ máy bay, sau đó chúng ta gọi registerReceiver() truyền vào class Broadcat và cái action mà chúng ta vừa khởi tạo trước đó với mục đích là thông báo với hệ thống là ứng dụng lắng nghe sự thay đổi của cái action mà chúng ta vừa đăng ký và trả kết quả về hàm onReceive() trong class Broadcast.Có một lưu ý quan trọng là nếu sử dụng cách đăng ký bằng Java code thì nhất định phải unregister() nếu không sẽ bị lỗi kinh điển 
> Are you missing a call to unregisterReceiver()?
> 
Tùy vào yêu cầu đưa ra mà chúng ta lựa chọn cách sử dụng cho phù hợp.

## **Custom BroadcastReceiver**

Thường được sử dụng để truyền thông điệp trong và ngoài ứng dụng nhưng không phải là sự thay đổi từ hệ thống mà là những thông điệp mà lập trình viên muốn truyền đi.

Chúng ta tạo receiver nhưng ở phần action thay vì sử dụng action có sẵn của hệ thống thì chúng ta tự tạo 1 action 

```java
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

            <receiver android:name=".Broadcast">
                <intent-filter>
                    <action android:name="test.Broadcast"/>
                </intent-filter>
            </receiver>

            <activity android:name=".TestBroadcastActivity">
            </activity>
        </application>
```


Điểm khác biệt ở đây là mình có thêm vào đoạn code để có thể gửi được Broadcast. Mình thực hiện send Broadcast từ màn hình MainActivity vào tạo thêm một activity để nhận kết quả trả về

```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Intent intent = new Intent();
        intent.setAction("test.Broadcast");
        sendBroadcast(intent);
    }
}
```

Ở Activity nhận kết quả trả về mình đăng ký nhận và hủy Broadcast và cũng sử dụng lại class Broadcast ở trên.

```java
public class TestBroadcastActivity extends AppCompatActivity {

    private Broadcast mBroadcast;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test_broadcast);
        mBroadcast = new Broadcast();
        IntentFilter filter = new IntentFilter("test.Broadcast");
        registerReceiver(mBroadcast, filter);
    }

    @Override
    protected void onStop() {
        super.onStop();
        unregisterReceiver(mBroadcast);
    }
}
```

Và kết quả trả về cùng với dòng log mình đã thêm vào trong hàm OnReceive()
> `08-14 20:59:40.624 1798-1798/com.example.vuminhduc.demobroadcast D/Broadcast: Da nhan Broadcast tu MainActivity`
> 


Ta thấy từ cách sendBroadcast trên chúng ta có thể áp dụng để truyền dữ liệu giữa các class với nhau. Ở đây mình sẽ làm một ví dụ gửi nhận một chuỗi String và Log ra. Mình làm tương tự như trên nhưng thêm dòng code sau để gửi dữ liệu 

> `intent.putExtra("string_test", "Hello");`
> 

Và ở bên class Broadcast - nơi mà chúng ta nhận và xử lí dữ liệu thì chúng ta sử dụng dòng code 

> `intent.getStringExtra("string_test")`
> 

Như vậy chúng ta đã có thể nhận được dữ liệu từ nơi bắn Broadcast rồi. Thật tiện lợi phải không nào?

## **Local Broadcast Receiver**

Ở đây chúng ta sang tìm hiểu về Local Broadcast và những điểm khác biệt so với các cách trước nhé.

**Ưu điểm**

1. Bạn sẽ không phải lo lắng về việc rò rỉ dữ liệu vì dữ liệu chỉ được gói gọn trong project của bạn mà thôi.

2.  Không phải lo lắng về các lỗ hổng bảo mật vì nó không send broadcast với ứng dụng khác    

3. Nó hiệu quả hơn việc gửi một Broadcast qua hệ thống

Sự khác biệt ở đây ở trong cách mà chúng ta sendBroadcast, register và unRegister 

**Với sendBroadcast**
> `LocalBroadcastManager.getInstance(this).sendBroadcast(intent);`
> 

**Với RegisterBroadcast**

>` LocalBroadcastManager.getInstance(this).registerReceiver(mBroadcast, filter);`
>

**Và với UnRegisterBroadcast**

> `LocalBroadcastManager.getInstance(this).unregisterReceiver(mBroadcast);`


## Hạn chế Broadcast với permission

Khi chúng ta sử dụng cách này thì chỉ những nơi đã được cấp quyền phù hợp với bên gửi thì mới có thể nhận được Broadcast.

**Với bên gửi**

Khi mà bạn gọi  sendBroadcast(Intent, String) hoặc sendOrderedBroadcast(Intent, String, BroadcastReceiver, Handler, int, String, Bundle) bạn có thể hạn chế quyền trong tham số bằng cách

> `sendBroadcast(intent, Manifest.permission.RECEIVE_SMS);`
> 

**Với bên nhận**

Nếu chúng ta muốn nhận được Broadcast ở trên thì chúng ta phải làm theo những cách sau:

> `registerReceiver(mBroadcast, filter, Manifest.permission.RECEIVE_SMS, null);`
> 

Hoặc đăng ký trong file Manifest
```java

 <receiver android:name=".Broadcast"
     android:permission="android.permission.SEND_SMS">
        <intent-filter>
           <action android:name="android.intent.action.AIRPLANE_MODE"/>
        </intent-filter>
 </receiver>
```


## Priority between Broadcast Receivers

1. Được sắp xếp với một thứ tự xác định bằng cách sử dụng `sendOrderedBroadcast (Intent, String, BroadcastReceiver, Handler, int, String, Bundle)` và thuộc tính `android:priority`
2. Mặc định của priority là 0
3. Chỉ một đối tượng nhận được trong một thời điểm
4. Sau khi đối tượng thứ nhất nhận xong thì đối tượng thứ hai nhận hoặc chúng ta có thể hủy bỏ luôn quá trình với `abortBroadcast()`
5. Priority là một số Integer và càng lớn thì độ ưu tiên càng cao. 

```java
<receiver android:name=".Broadcast"
     android:permission="android.permission.SEND_SMS">
        <intent-filter
            android:priority="1">
            action android:name="android.intent.action.AIRPLANE_MODE"/>
        </intent-filter>
</receiver>
```

## Sử dụng Package Manager để Disable các Broadcast tĩnh

Khi ta có hai class kế thừa lại BroadcastReceiver tương ứng với hai đối tượng lắng nghe Broadcast thì nếu ta muốn disable Broadcast thứ hai tương ứng với class Broadcast2.class thì ta làm như sau:

```java
private void disableBroadcast(Context context) {
        ComponentName receiver = new ComponentName(context, Broadcast2.class);
        PackageManager pm = context.getPackageManager();

        pm.setComponentEnabledSetting(receiver,
                PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
                PackageManager.DONT_KILL_APP);
    }
```

## Các lưu ý về bảo mật và cách xử lí

1. Nếu bạn không muốn sendBroadcast cho các đối tượng ở bên ngoài ứng dụng của bạn thì bạn có thể sử dụng LocalBroadcast vì LocalBroadcastManager hiệu quả hơn nhiều (không cần giao tiếp liên tục) và cho phép bạn tránh suy nghĩ về bất kỳ vấn đề bảo mật nào liên quan đến các ứng dụng khác có thể nhận hoặc gửi các broadcast của bạn.

2. Không phát thông tin nhạy cảm bằng cách sử dụng intent không tường minh. Thông tin có thể được đọc bởi bất kỳ ứng dụng nào đăng ký để nhận broadcast. Có ba cách để kiểm soát ai có thể nhận broadcast của bạn:

* Bạn có thể set các quyền cho Broadcast
* Set package mà bạn muốn gửi Broadcast đến quá setPackage(String)
* Sử dụng Local Broadcast

3. Khi bạn đăng ký nhận Broadcast thì bất cứ ứng dụng nào mà bạn đăng ký đều có thể gửi những thông tin độc hại đến ứng dụng của bạn. Có các cách phòng tránh sau đây:
* Set các quyền bạn cho là "Nguy hiểm"
* Bạn có thể set android:exported=false
* Local Broadcast

4. Chú ý cách đặt tên hành động lắng nghe sao cho tránh trùng lặp tên
5. Không nên chạy task nặng trong hàm onReceive() nếu bạn muốn chạy thì chúng ta nên sử dụng một trong hai cách sau:
* Sử dụng goAsync() trong onReceive()
* Sử dụng JobScheduler
6. Không nên start Activity từ Broadcast vì lúc này trải nghiệm người dùng đang chập chờn, nhất là khi có nhiều hơn một người nhận. Thay vào đó hãy xem xét hiện thị các thông báo.

## Tổng kết

Trên đây chúng ta vừa tìm hiểu qua Broadcast Receiver nếu có gì chưa đúng hoặc thiếu sót các bạn có thể comment ở dưới post này. Cảm ơn các bạn đã theo dõi.

Bài viết này có sử dụng tài liệu tham khảo từ 
https://developer.android.com/guide/components/broadcasts