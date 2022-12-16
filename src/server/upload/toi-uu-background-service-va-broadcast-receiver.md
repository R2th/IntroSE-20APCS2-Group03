![](https://images.viblo.asia/9fb63ed9-fa3f-4d86-99a2-02b4fad6179d.png)

Trên nhiều ứng dụng hay sử dụng một hoặc nhiều Service và Broadcast Receiver để thực thi tác vụ ngầm nhằm phục vụ yêu cầu của ứng dụng.
Ví dụ như: Broadcast Receiver (android.net.conn.CONNECTIVITY_CHANGE) để lắng nghe thiết bị thay đổi trạng thái kết nối internet. Mình giải thích thêm một chút, công việc này thực thi liên tục nếu chúng ta không hủy bỏ nó mặc dù ứng dụng đang ở dưới background. Mục đích có thể lấy thông báo mới nhất từ server, các message chat, dữ liệu cập nhật từ phiên bản update ..v.v

Các tiến trình chạy ngầm như vậy sử dụng nhiều bộ nhớ và pin của thiết bị hơn vì nó làm việc liên tục mặc dù ở đó nó có rất ít nhiệm vụ. Điều này sẽ làm ảnh hưởng tới hiệu năng và trải nghiệm người dùng. Nhận thấy được điều này nên Google đã đưa ra thông báo mới (cập nhật trên trang https://developer.android.com) :

* Tất cả ứng dụng chạy trên Android 7.0 trở về sau sẽ không nhận được trạng thái thông báo Network [NNECTIVITY_CHANGE] nếu khai báo trong file AndroidManifest.xml, nhưng việc khai báo trong code Context.registerReceiver() vẫn được chấp nhận.
* 2 broadcast : ACTION_NEW_VIDEO và ACTION_NEW_PICTURE bị xóa bỏ không chỉ trên Android 7.0

Đây là một thay đổi không nhỏ cho những nhà cung cấp dịch vụ Social Media đòi hỏi developer phải tìm cách thay thế vì trước giờ họ hay dùng tới các broadcast trên để khuyến khích người dùng sử dụng tiện ích của ứng dụng. Vậy làm thế nào để khắc phục hay giải pháp tối ưu cho vấn đề này là gì ? Mình cùng nhau đi tìm nhé :D

### 1. Khắc phục vấn đề

***Bước đầu các bạn cần phải xóa bỏ các cài đặt broadcast trên nếu có để trong file AndroidManifet.xml***

Nếu bạn đang có một số  receiver tương tự như này trong **AndroidManifest.xml** hãy thay thế nó bằng một số cách dưới đây:

`AndroidManifet.xml`
```
<receiver android:name=".ChargerReceiver">
    <intent-filter>
        <action android:name="android.intent.action.ACTION_POWER_CONNECTED" />
    </intent-filter>
</receiver>
```

Hãy xóa bỏ sự khai báo đó và thay bằng code trong activity hoặc fragment như sau:

`MainActivity.java`
```
public class MainActivity extends AppCompatActivity {
    private BroadcastReceiver chargerReceiver;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        chargerReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                // TODO: Awesome things
            }
        };

        registerReceiver(
                chargerReceiver,
                new IntentFilter(Intent.ACTION_POWER_CONNECTED)
        );
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        unregisterReceiver(chargerReceiver);
    }
}
```


Ngoài ra chúng ta nên dùng một số công cụ hỗ trợ thông minh hơn như: **JobScheduler** hoặc **[WorkManager](https://viblo.asia/p/ung-dung-lam-mo-anh-dung-workmanager-vi-du-thuc-te-gDVK2jYjKLj)** để đặt lịch chạy cho các tác vụ cần thiết. Nếu bạn chưa tìm hiểu về WorkManager có thể tìm kiếm tài liệu hữu ích ở đây. Và trong bài này mình sẽ đề cập giải pháp với **JobScheduler**.

### 2. Giải pháp hữu hiệu
- Hỗ trợ từ phiên bản Android Lollipop
- Nếu bạn cần chạy trên phiên bản thấp hơn có thể tham khaỏ cách dùng : **FirebaseJobDispatcher**

Trong JobScheduler có thành phần JobInfo chắc chắn bạn cần phải quan tâm, ở đây định nghĩa tất cả các điều kiện thỏa mãn trước để công việc có thể thực thi

* Network type (metered/unmetered)
* Charging and Idle
* Minimum latency (thời gian trễ thấp nhất)
* Periodic (công việc định kì)
* Persistent(làm việc liên tục)
* Certain deadline (thục hiện trước thời hạn đã định)

Bây giờ mình sẽ tạo một service download file khi có kết nối internet để việc hình dung dễ dàng hơn xem bên trong cái JobScheduler nó có gì nào.

Mình tạo một class JobUtils để quản lý và định nghĩa các job có trong ứng dụng:

`JobUtils.java`

```
public class JobUtils {
    public static final int MY_BACKGROUND_JOB = 0;
    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    public static void scheduleJob(Context context) {
        JobScheduler js =
                (JobScheduler) context.getSystemService(Context.JOB_SCHEDULER_SERVICE);
        JobInfo job = new JobInfo.Builder(
                MY_BACKGROUND_JOB,
                new ComponentName(context, **DownloadFileService**.class))
                .setRequiredNetworkType(JobInfo.NETWORK_TYPE_UNMETERED)
                .build();
        js.schedule(job);
    }
}
```

Như các bạn thấy việc cài đặt khá đơn giản chỉ cần thêm điều kiện **.setRequiredNetworkType(JobInfo.NETWORK_TYPE_UNMETERED)** khi có kết nối Internet thì nó sẽ thực thi tại method onStartJob trong class **DownloadFileService**

Tiếp theo chúng ta tạo ra class service 

`DownloadFileService.java`

```
@RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
public class DownloadFileService extends JobService {
    @Override
    public boolean onStartJob(JobParameters jobParameters) {
        Intent service = new Intent(getApplicationContext(), DownloadFileAsync.class);
        getApplicationContext().startService(service);
        JobUtils.scheduleJob(getApplicationContext()); // reschedule the job
        return true;
    }

    @Override
    public boolean onStopJob(JobParameters jobParameters) {
        return true;
    }
}
```

Khi chạy vào onStartJob thì quá trình download sẽ diễn ra, việc download khá dễ dàng khi dùng rxJava hoặc AsyncTask cái này mình sẽ không đi vào chi tiết nữa.

Việc cuối cùng là các bạn định nghĩa nó trong AndroidMainifest.xml cho service vừa tạo

```
<service
            android:name=".DownloadFileService"
            android:permission="android.permission.BIND_JOB_SERVICE"
            android:exported="true"/>
```

### 3. Tổng kết

Hy vọng rằng đến đây các bạn đã nắm được một số điều thú vị khi chúng ta làm việc với background service và broadcast receiver trong Android. Trong quá trình phát triển và nâng cấp ứng dụng không thể không chú ý đến những thay đổi từ Google về quyền, thông tin cá nhân người dùng và việc truy cập vào hệ thống. Dựa vào những thông tin trên các bạn có thể đưa ra những phương án chuẩn xác và thật tối ưu cho ứng dụng của mình nhé!