Dữ liệu là thứ luôn được coi trọng hàng đầu, mất dữ liệu là một cơn ác mộng đối với hầu hết chúng ta. Vì vậy sao lưu dữ liệu phải là một trong những nhiệm vụ được ưu tiên. Chúng ta nên cung cấp một phương tiện sao lưu dữ liệu cho người dùng của mình. Và trên Android có sẵn một thứ gọi là **Auto Backup API** cho mục đích này và nó đã xuất hiện được một thời gian khá lâu.


### Auto Backup API

Nó tải lên dữ liệu ứng dụng cục bộ trong một thư mục riêng tư trên tài khoản Google Drive của người dùng với giới hạn lưu trữ tối đa là 25 MB / ứng dụng . (dữ liệu không được bao gồm trong hạn ngạch Google Drive cá nhân của người dùng). Nếu đạt đến giới hạn hạn ngạch cho một ứng dụng, hệ thống sẽ không sao lưu dữ liệu nữa. Tuy nhiên, *khi một bản sao lưu mới được thực hiện, bản sao lưu trước đó sẽ bị xóa.*
Để kích hoạt nó với các cấu hình mặc định, chúng ta chỉ cần thêm dòng sau vào `application` tag của file `manifest`.

```java
android:allowBackup="true"
```

Chỉ cần có thế ! Toàn bộ quá trình được quản lý bởi Android framework.

Thực tế có một yêu cầu nữa để làm cho nó hoạt động. Người dùng nên bật tính năng **Google Backup & Reset** của Google trên thiết bị của họ cùng với tài khoản sao lưu được chỉ định cho nó. Ví dụ bạn có thể tìm thấy tùy chọn này tại **Settings > Backup and reset > App data** .

![Auto Backup API in Android](https://s3.ap-south-1.amazonaws.com/mindorks-server-uploads/auto-backup-settings-4cde32f65f1530cd.png)

Những dữ liệu của người dùng hiện đủ điều kiện để sao lưu:
Theo mặc định, dữ liệu này bao gồm các **file** , thư mục **root** & **externalFiles** , **databases** và **sharedPreferences** nhưng API này sẽ luôn bỏ qua các thư mục **noBackupFiles** , **cache** & **codeCache** .

Bây giờ câu hỏi là khi nào và tần suất dữ liệu được tải lên Google Drive? Có một số kích hoạt nhất định để bắt đầu quá trình sao lưu:
- Thiết bị không hoạt động
- Lần sao lưu cuối cùng được thực hiện ít nhất 24 giờ trước
- Thiết bị được kết nối với WiFi / dữ liệu di động (theo cấu hình sao lưu của người dùng)

### Cấu hình tùy chỉnh
Giả sử chúng ta có yêu cầu chỉ xem xét `sharedPreferences` cho quá trình sao lưu và phần còn lại của các `file/folder` nên được bỏ qua. Điều này có thể đạt được dễ dàng bằng cách sử dụng thuộc tính **fullBackupContent** của thẻ `application` của `manifest`.

Chúng ta cần tạo một file XML (backup_rules.xml) với nội dung sau trong **res> xml** . Ở đây, `data.xml` là tên của file sharedPreferences .

```java
<full-backup-content>
    <include domain="sharedpref" path="data.xml" />
</full-backup-content>
```

Sau đó, chúng tôi có thể trỏ đến tệp này như sau:Các quy tắc có thể được cấu hình tùy thuộc vào yêu cầu của dự án.

```java
android:fullBackupContent="@xml/backup_rules"
```

Các quy tắc có thể được cấu hình tùy thuộc vào yêu cầu của dự án:

```java
<full-backup-content>
    <include domain=["file" | "database" | "sharedpref" | "external" | "root"]
    path="string"
    requireFlags=["clientSideEncryption" | "deviceToDeviceTransfer"] />
    <exclude domain=["file" | "database" | "sharedpref" | "external" | "root"]
    path="string" />
</full-backup-content>
```

Các domain trong thẻ <include> sẽ được đưa vào quá trình sao lưu trong khi các miền trong thẻ <exclude> sẽ bị bỏ qua.

Ngoài ra còn có một tham số **requestFlags** trong thẻ <include> để thêm các cờ về cơ bản được sử dụng để kích hoạt một số tính năng trên thiết bị Android. Nó có thể có các giá trị sau:

- **clientSideEncryption**: Được sử dụng để mã hóa bản sao lưu với client-side secret.
- **deviceToDeviceTransfer**: Được sử dụng để cho phép người dùng chuyển bản sao lưu sang một thiết bị khác.

### Backup Agent
    
Android cung cấp một interface giữa application và data backup infrastructure. Nó chủ yếu được sử dụng với cơ chế sao lưu `[Key-Value backup]` và không thực sự cần thiết khi chúng ta đang làm việc với sao lưu file. Tuy nhiên, nếu chúng ta cần có `delegates` hoặc `callbacks` cho các sự kiện như hoàn thành quá trình sao lưu và đạt đến giới hạn hạn ngạch được phân bổ, chúng ta có thể tạo một `agent` cho các mục đích như vậy.

```java
class CustomBackupAgent : BackupAgentHelper() {

    override fun onFullBackup(data: FullBackupDataOutput?) {
        super.onFullBackup(data)

        Log.e("BACKUP", "onFullBackup")
    }
}
```
Chúng ta phải tạo một lớp con của **BackupAgentHelper** và ghi đè các `method/event` bắt buộc. Sau đó, chúng ta cần xác định tác nhân của mình trong file `manifest > application` tag .

```java
android:backupAgent=".CustomBackupAgent"
```

### Testing

Chúng ta có thể buộc sao lưu và khôi phục bằng cách sử dụng các lệnh shell của ADB.

**Backup**

4 lệnh sau có thể được sử dụng theo trình tự để có một bản sao lưu đầy đủ.

- Enable backup manager

```java
adb shell bmgr enabled
```

- Initialize and run backup manager

```java
adb shell bmgr backup @pm@
adb shell bmgr run
```

- Perform full backup

```java
adb shell bmgr fullbackup <package_name>
```
    
Khi hệ thống thực hiện sao lưu đầy đủ, nó sẽ tắt ứng dụng theo mặc định để tránh bất kỳ thay đổi dữ liệu cục bộ nào trong khi quá trình đang chạy. Để có một bản sao lưu ở foreground, chúng ta có thể enable flag trong manifest. (API level > = 24)

```java
android:backupInForeground="true"
```

**Restore**
    
Việc khôi phục dữ liệu được thực hiện tự động khi ứng dụng được cài đặt lại từ cửa hàng Google Play hoặc sử dụng lệnh ADB (cài đặt bằng Android Studio). Quá trình khôi phục được thực hiện sau khi ứng dụng được cài đặt và trước khi ứng dụng được cung cấp cho người dùng. Nếu chúng ta cần khôi phục bằng cách sử dụng các lệnh shell, nó có thể được thực hiện như được mô tả [ở đây](https://developer.android.com/guide/topics/data/testingbackup#TestingRestore).

### Avoiding backup

Sao lưu là rất cần thiết nhưng có một số thứ không nên bao gồm trong quá trình này. Ví dụ:

- Mọi thông tin dành riêng cho thiết bị, chẳng hạn như FCM token
- Bất kỳ dữ liệu người dùng nhạy cảm nào, chẳng hạn như thông tin đăng nhập tài khoản
- Authorization tokens
- Files dung lượng lớn (hạn mức được phân bổ à 25 MB / ứng dụng)

### **Kết luận**

**Auto Backup API** là một công cụ rất tiện dụng được cung cấp bởi Android framework. Nó rất dễ sử dụng và tùy chỉnh. Ta nên bật API này trong mọi dự án và tùy theo yêu cầu. Giữ cho dữ liệu của người dùng của bạn an toàn! :)
    
### Reference
    
- https://blog.mindorks.com/android-auto-backup-api