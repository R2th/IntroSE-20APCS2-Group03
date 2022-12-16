# Tổng quan
Bảo quản dữ liệu cho người dùng khi họ nâng cấp lên thiết bị mới hoặc cài đặt lại ứng dụng của bạn là một phần quan trọng trong việc đảm bảo trải nghiệm người dùng tuyệt vời. Android cung cấp 2 cách để ứng dụng sao lưu dữ liệu lên cloud: [Auto backup for apps](https://developer.android.com/guide/topics/data/autobackup) and [Key/Value Backup ](https://developer.android.com/guide/topics/data/keyvaluebackup)
 - Auto backup bắt đầu hỗ trợ từ Android 6.0 (API 23 trở lên), lưu trữ dữ liệu bằng cách tải dữ liệu lên tài khoản Google Drive của người dùng. Auto backup bao gồm các tệp trong hầu hết các thư mục được hệ thống cho phép ứng dụng của bạn có thể truy cập, Auto backup có thể lưu trữ tối đa 25 MB dữ liệu trên file cho mỗi ứng dụng
 - Key/Value backup (trước đây biết biết đến là Backup API và Android Backup Service) lưu trữ dữ liệu cài đặt dưới dạng các cặp key/value bằng cách tải nó lên Dịch vụ sao lưu của Android ([Android Backup Service](https://developer.android.com/guide/topics/data/keyvaluebackup)). Hỗ trợ từ Android 2.2 (API 8 trở lên)
 
Trong bài viết này sẽ mô tả hướng dẫn các bạn các backup/restore dữ liệu bằng cách [Key/Value Backup ](https://developer.android.com/guide/topics/data/keyvaluebackup)

## I. Back up key-value pairs with Android Backup Service

Android Backup Service cung cấp kho lưu trữ đám mây để sao lưu và khôi phục dữ liệu ứng dụng của bạn dưới dạng key/value. Trong quá trình backup key/value, dữ liệu sao lưu ứng dụng sẽ được chuyển đến **backup transport** của device. Nếu device đang sử dụng **backup transport** mặc định của Google, sau đó dữ liệu sẽ được chuyển tới Android Backup Service để lưu trữ. Lượng dữ liệu được giới hạn ở mức 5MB cho mỗi người dùng ứng dụng của bạn và không mất phí lưu trữ data backup.

## II. Implement key-value backup
Để sao lưu dữ liệu ứng dụng của bạn, bạn cần triển khai 1 lớp **backup agent** . Lớp backup agent của bạn được gọi bởi Trình quản lý sao lưu (Backup Manager) cho cả 2 quá trình khi sao lưu và khôi phục (backup/restore).
Để thực hiện backup agent, bạn phải làm theo các bước sau:
1. Định nghĩa thuộc tính **android:backupAgent** vào file minifest
2. Đăng ký dịch vụ Android Backup Service cho app của bạn.
3. Định nghĩa class **backup agent** bằng 1 trong 2 đối tượng sau:
 - [Extending BackupAgent](https://developer.android.com/guide/topics/data/keyvaluebackup#BackupAgent): 
 Lớp [BackupAgent](https://developer.android.com/reference/android/app/backup/BackupAgent) cung cấp các interface để ứng dụng của bạn giao tiếp với Trình quản lý sao lưu (Backup Manager). Nếu bạn extend trực tiếp từ lớp này, bạn phải ghi đè các phương thức đó là onBackup () và onRestore () để xử lý các hoạt động sao lưu và phục hồi dữ liệu.
 
 Hoặc là
 
 - [Extending BackupAgentHelper](https://developer.android.com/guide/topics/data/keyvaluebackup#BackupAgentHelper): 
Trong lớp BackupAgentHelper, bạn phải sử dụng một hoặc nhiều đối tượng "helper", nó tự động sao lưu và khôi phục một số loại dữ liệu nhất định, do đó bạn không cần triển khai onBackup () và onRestore (). Trừ khi bạn cần toàn quyền kiểm soát các bản sao lưu của ứng dụng, Google khuyến cáo, khuyên các bạn nên sử dụng BackupAgentHelper để xử lý các bản sao lưu của ứng dụng.
Android hiện tại đang cung cấp các backup helpers mà nó sẽ sao lưu và khôi phục tệp hoàn chỉnh từ [SharedPreferences](https://developer.android.com/reference/android/content/SharedPreferences) and [internal storage](https://developer.android.com/guide/topics/data/data-storage#filesInternal).

Bây giờ chúng ta sẽ đi vào từng bước cụ thể:

### 1. Định nghĩa thuộc tính android:backupAgent vào file minifest
Đây là bước cực kỳ đơn giản, đặt tên lớp backup agent của mình và hãy khai báo nó trong file manifest của bạn bằng thuộc tính android: backupAgent trong thẻ <application>.
Ví dụ:
```xml
<manifest ... >
    ...
    <application android:label="MyApplication"
                 android:backupAgent="MyBackupAgent">
        <activity ... >
            ...
        </activity>
    </application>
</manifest>
```
  
### 2. Đăng ký dịch vụ Android Backup Service
Để ứng dụng của bạn thực hiện sao lưu bằng Android Backup Service, bạn phải đăng ký ứng dụng của mình với dịch vụ để nhận Backup Service Key,, sau đó khai báo Backup Service Key trong tệp kê khai Android của bạn.
Cách đăng ký Backup Service Key, truy cập  [register for Android Backup Service](https://developer.android.com/google/backup/signup). Sau khi đăng ký xong, bạn được cung cấp một Backup Service Key và mã XML <meta-data> thích hợp để định nghĩa nó vào tệp manifest Android của bạn, tất cả đều đặt trong thẻ <application>. Ví dụ:
```xml
<application android:label="MyApplication"
             android:backupAgent="MyBackupAgent">
    ...
    <meta-data android:name="com.google.android.backup.api_key"
        android:value="AEdPqrEAAAAIDaYEVgU6DJnyJdBmU7KLH3kszDXLv_4DIsEIyQ" />
</application>
```
    
Thuộc tính android:name phải là **"com.google.android.backup.api_key"** và thuộc tính android:value sẽ là Backup Service Key mà bạn đã đăng ký từ Android Backup Service.

Chú ý: Nếu bạn có nhiều ứng dụng thì phải đăng ký từng ứng dụng 1 tương ứng với package name của ứng dụng đó.

### 3. Định nghĩa backup agent class
Các bạn sẽ tạo class extend BackupAgentHelper. BackupAgentHelper sẽ hỗ trợ các bạn backup file [SharedPreferences](https://developer.android.com/reference/android/content/SharedPreferences) or [internal storage](https://developer.android.com/guide/topics/data/data-storage#filesInternal).
Trong bài viết này mình sẽ lấy ví dụ về backup SharedPreferences:
Để backup file SharedPreferences với tên file là "user_setting", lớp BackupAgentHelper sẽ được implement như sau:
```java
public class MyBackupAgent extends BackupAgentHelper {
    // The name of the SharedPreferences file
    static final String PREFS = "user_preferences";

    // A key to uniquely identify the set of backup data
    static final String PREFS_BACKUP_KEY = "user_setting";

    // Allocate a helper and add it to the backup agent
    @Override
    public void onCreate() {
        SharedPreferencesBackupHelper helper =
                new SharedPreferencesBackupHelper(this, PREFS);
        addHelper(PREFS_BACKUP_KEY, helper);
    }
}
```

Đối tượng SharedPreferencesBackupHelper sẽ giúp chúng ta backup/restore data lquan đến file SharedPreference

Khi Trình quản lý sao lưu (Backup Manager) gọi onBackup () và onRestore (), BackupAgentHelper gọi backup helpers của bạn để thực hiện sao lưu và khôi phục cho các tệp được chỉ định.

Đó là tất cả các bước thủ tục đăng ký, là điều kiện cần để chúng ta tiến hành backup/store data. Các bạn đã đăng ký backup agent là file SharedPreference có tên là **"user_setting"**. Việc còn lại của chúng ta bây giờ đó là thực hiện thay đổi file **"user_setting"** trên môi trường context (Activity), và tiến hành gọi backup data bằng câu lệnh BackupManager(context).dataChange() để tiến hành backup.
Ví dụ:
```java

public class TestActivity extends AppCompatActivity {


    static final String TAG = TestActivity.class.getSimpleName();
    static final String PREFS_BACKUP_KEY = "user_setting";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test);

        String androidID = getAndroidID();
        Log.d(TAG, "AndroidID: " + androidID);
    }


    private void setAndroidID(String androidID) {
        SharedPreferences pref = getSharedPreferences(PREFS_BACKUP_KEY, MODE_PRIVATE);
        SharedPreferences.Editor editor = pref.edit();
        editor.putString("android_id", androidID);
        editor.commit();
    }

    private String getAndroidID() {
        SharedPreferences pref = getSharedPreferences(PREFS_BACKUP_KEY, MODE_PRIVATE);
        String androidID = pref.getString("android_id", "");
        if (TextUtils.isEmpty(androidID)) {
            androidID = Settings.Secure.getString(getContentResolver(), Settings.Secure.ANDROID_ID);

            //Change data
            setAndroidID(androidID);

            //request backup
            new BackupManager(this).dataChanged();
        }
        return androidID;
    }
}
```

Đoạn code trên sẽ thực hiện việc backup/restore giá trị **androidID**. Khi lần đầu tiên chạy app, hiển nhiên sẽ không có data trong file **user_setting** và đoạn code sẽ lấy giá trị androidID từ hệ thống và lưu giá trị androidID vào sharedPreference **user_setting**, sau đó thực hiện request backup file **user_setting**. Quá trình backup sẽ không diễn ra ngay lập tức (xem **Perform a backup** để chi tiết hơn).
Sau khi Android Backup Service tiến hành backup file **user_setting** thành công. Các bạn xóa app đi cài lại, việc restore file **user_setting** sẽ được diễn ra tự động khi cài lại app. Khi đó mở app lên bạn sẽ get được giá trị androidID đã backup.

## III. Perform a backup
Khi đã đến thời điểm sao lưu dữ liệu ứng dụng của bạn, Trình quản lý sao lưu (Backup Manager) sẽ gọi phương thức onBackup (). Đây là nơi bạn phải cung cấp dữ liệu ứng dụng của mình cho Trình quản lý sao lưu để có thể lưu vào bộ nhớ đám mây (chính là Google Driver đó ^^)

Chỉ có Trình quản lý sao lưu (Backup Manager) mới có thể gọi phương thức onBackup () của backup agent. Mỗi khi dữ liệu ứng dụng của bạn thay đổi và bạn muốn thực hiện sao lưu, bạn phải yêu cầu một hoạt động sao lưu bằng cách gọi phương thức dataChanged() (xem [Request a backup](https://developer.android.com/guide/topics/data/keyvaluebackup#RequestingBackup) để biết thêm thông tin). Yêu cầu sao lưu không gọi ngay tới phương thức onBackup (). Thay vào đó, Trình quản lý sao lưu(Backup Manager) đợi một thời điểm thích hợp, sau đó thực hiện sao lưu cho tất cả các ứng dụng đã yêu cầu bản sao lưu kể từ lần sao lưu cuối cùng được thực hiện.

**CHÚ Ý:** Bạn sẽ không thể nào biết được thời điểm nào là thời điểm thích hợp để Android Backup Service tiến hành backup cho toàn bộ các ứng dụng có yêu cầu backup trên device. Đó là thời gian ngẫu nhiên, nó sẽ không backup ngay lập tức khi bạn gọi phương thức BackupManager.dataChanged(). Tuy nhiên đối với các bạn lập trình viên, để thực hiện test tính năng backup/restore ngay lập tức thì Google đã hỗ trợ các lập trình viên 1 công cụ để test công việc này. Đó là chính là [bmgr](https://developer.android.com/studio/command-line/bmgr) tool. 
## IV. Perform a restore
Khi đã đến thời điểm khôi phục dữ liệu ứng dụng của bạn, Trình quản lý sao lưu (Backup Manager) sẽ gọi phương thức onRestore (). Khi nó gọi phương thức này, Trình quản lý sao lưu cung cấp dữ liệu sao lưu của bạn để bạn có thể khôi phục dữ liệu trên thiết bị.

Chỉ Trình quản lý sao lưu mới có thể gọi onRestore (), **điều này tự động xảy ra khi hệ thống cài đặt ứng dụng của bạn và tìm dữ liệu sao lưu hiện có.** Tuy nhiên, bạn có thể yêu cầu khôi phục hoạt động cho ứng dụng của mình bằng cách gọi requestRestore() (xem [Requesting restore](https://developer.android.com/guide/topics/data/keyvaluebackup#RequestingRestore) để biết thêm thông tin).

**CHÚ Ý:** Để test việc restore ngay lập tức, các bạn cũng sử dụng [bmgr](https://developer.android.com/studio/command-line/bmgr) tool. 
## V. Request a backup
Bạn có thể yêu cầu một hành động sao lưu bất cứ lúc nào bằng cách gọi BackupManager(context).dataChanged(). Phương thức này thông báo cho Trình quản lý sao lưu mà bạn muốn sao lưu dữ liệu của mình bằng cách sử dụng **backup agent** mà bạn đã implement ở bước 3. Trình quản lý sao lưu sau đó gọi phương thức onBackup() của **backup agent** (mà bạn đã định nghĩa code ở bước 3) vào một thời điểm thích hợp trong tương lai. Thông thường, bạn nên yêu cầu bản sao lưu mỗi khi dữ liệu của bạn thay đổi (chẳng hạn như khi người dùng thay đổi tùy chọn ứng dụng mà bạn muốn sao lưu). Nếu bạn gọi dataChanged() nhiều lần liên tiếp, trước khi Trình quản lý sao lưu yêu cầu bản sao lưu từ **backup agent** của bạn, **backup agent** của bạn vẫn chỉ nhận được một cuộc gọi đến onBackup()

**CHÚ Ý:** Các bạn cũng sử dụng [bmgr](https://developer.android.com/studio/command-line/bmgr) tool để request backup ngay lập tức
## VI. Request a restore
Trong suốt thời gian hoạt động của ứng dụng, bạn không cần phải yêu cầu hoạt động restore. Hệ thống tự động kiểm tra dữ liệu sao lưu và thực hiện khôi phục khi ứng dụng của bạn được cài đặt. Tuy nhiên, bạn có thể yêu cầu thao tác khôi phục bằng tay bằng cách gọi requestRestore(), nếu cần. Trong trường hợp đó, Trình quản lý sao lưu gọi thực hiện onRestore () của bạn, chuyển dữ liệu từ tập dữ liệu sao lưu hiện tại.

**CHÚ Ý:** Các bạn cũng sử dụng [bmgr](https://developer.android.com/studio/command-line/bmgr) tool để request restore
## VII. Hạn chế
1. Do Android Backup Service sẽ chỉ hoạt động trên các device sử dụng backup transport mặc định của Google
=> Dẫn đến hạn chế về mặt device, những device không support backup, hoặc 1 loại backup transport khác không phải của Google thì sẽ không chạy được.
Tham khảo: https://developer.android.com/guide/topics/data/keyvaluebackup
2. BackupManager sẽ tự động thực hiện backup vào 1 thời điểm thích hợp mà mình không chủ động kích hoạt được tác vụ backup này.
Tham khảo: Perform a backup - https://developer.android.com/guide/topics/data/keyvaluebackup
3. Sau khi đã backup thành công, xóa app đi và cài lại app thì bắt buộc phải có kết nối internet thì quá trình restore ms có thể thành công, nếu không có network thì sẽ không thể restore phục hồi dữ liệu được.
4. Nếu trong OS Setting/Cloud and accounts/Backup and restore -> disable Back up my data -> Tất cả app data backup được lưu trên cloud storage (Google Driver) sẽ bị xoá. Sẽ k còn bản backup nào. Lần tiếp theo xóa app đi cài lại thì sẽ k có data backup nào để tiến hành việc restore data.

**CHÚ Ý:** Các bạn có thể sử dụng [bmgr](https://developer.android.com/studio/command-line/bmgr) tool để xem device đang sử dụng loại backup transport nào.
# Tổng kết
Trên đây, mình đã giới thiệu qua với các bạn cũng như hướng dẫn cách thực hiện việc backup/restore data trên ứng dụng android mỗi khi người dùng xóa app đi cài lại mà vẫn cần lấy lại những thông tin cần thiết, quan trọng trên ứng dụng của mình. Ở bài viết sau, mình sẽ hướng dẫn cách sử dụng [bmgr](https://developer.android.com/studio/command-line/bmgr) tool để thực hiện việc test backup/restore, các bạn có thể nhìn thấy sự thay đổi dữ liệu ngay lập tức. 
Cám ơn các bạn đã dành thời gian theo dõi bài viết của mình. Thanks all!