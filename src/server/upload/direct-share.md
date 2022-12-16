Direct Share là tính năng cho phép ứng dụng chia sẻ nội dung đến các ứng dụng khác. Sau đó, người dùng có thể truy cập trực tiếp vào ứng dụng của bạn khi chia sẻ nội dung đến một ứng dụng khác. 

![](https://images.viblo.asia/84c00709-bc1d-4d8f-b95d-6fa3b47bd347.png)


Direct Share  hoạt động với khái niệm Sharing Shortcuts.  Ứng dụng đề xuất bản trước các mục tiêu có thể chia sẻ, Sharing Shortcuts đã xuất bản sẽ được hệ thống lưu giữ cho đến khi ứng dụng cập nhật chúng hoặc ứng dụng được gỡ cài đặt. 
Khi được hiển thị cho người dùng, hệ thống sẽ xếp hạng mọi phím tắt có thể áp dụng bằng dịch vụ dự đoán, trong đó hiển thị các phím tắt có nhiều khả năng được sử dụng hơn. 
# Thiết lập và yêu cầu:
Để dùng tính năng này phải để `complieSDK`  thấp nhất là 29.
Direct Share dùng Sharing Shortcuts nên phải tạo mội file `shortcuts.xml`
```
<shortcuts xmlns:android="http://schemas.android.com/apk/res/android">
    <share-target android:targetClass="com.example.android.directshare.SendMessageActivity">
        <data android:mimeType="text/plain" />
        <category android:name="com.example.android.directshare.category.TEXT_SHARE_TARGET" />
    </share-target>
</shortcuts>
```

Tệp `shortcuts.xml` cần được khai báo trong một hoạt động có bộ lọc ý định được đặt thành hành động `android.intent.action.MAIN` và danh mục `android.intent.category.LAUNCHER` trong tệp `AndroidManifest.xml`. 
```
<activity
    android:name=".MainActivity"
    android:label="@string/app_name">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
    <!-- Reference resource file where the app's shortcuts are defined -->
    <meta-data
        android:name="android.app.shortcuts"
        android:resource="@xml/shortcuts" />
</activity>
```

# Sử dụng ShortcutManager API
Khi các phần tử mục tiêu chia sẻ được xác định, ta cần xuất bản các phím tắt động phù hợp với các định nghĩa đó với API ShortcutManager. Các phím tắt chia sẻ vẫn tồn tại trong hệ thống cho đến khi chúng được cập nhật bởi cùng một ứng dụng hoặc ứng dụng được gỡ cài đặt. 

**build.gradle**
```
implementation "androidx.core:core:${versions.androidxCore}"
```

`SharingShortcutsManager` là lớp phụ trách tương tác với ShortcutManager. Mỗi khi người dùng mở ứng dụng ta sẽ đẩy các phím tắt chia sẻ đã lưu.

**MainActivity.kt**
```
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)
    ...
    sharingShortcutsManager = SharingShortcutsManager().also {
        it.pushDirectShareTargets(this)
    }
}
```

Ta có thể cấu hình các ứng dụng cùng loại với Direct Share 
```
 <category android:name="com.example.android.directshare.category.TEXT_SHARE_TARGET" />
```
Ở đây mình dùng share kiểu text/plain.

**SharingShortcutsManager.kt**
```
private val categoryTextShareTarget = "com.example.android.directshare.category.TEXT_SHARE_TARGET"
fun pushDirectShareTargets(context: Context) {
    ...
    val contactCategories = setOf(categoryTextShareTarget)
    ...
}
```

Tạo danh sách có thể share.

```
data class Contact(val name: String) {

    companion object {
        val invalidId = -1

        val id = "contact_id"
        val contacts = arrayOf(
            Contact("Nam"),
            Contact("Vuong"),
            Contact("Ngan")
        )

        fun byId(id: Int) = contacts[id]
    }
}
```

Ứng dụng chỉ xuất bản bốn phím tắt do giới hạn phím tắt. Không bao giờ thêm nhiều phím tắt hơn những gì được định nghĩa trong `ShortcutManagerCompat.getMaxShortcutCountPerActivity`. 

   ![](https://images.viblo.asia/06e0dbd0-dd2e-44ba-a8e7-0c5df22e1c79.png)
   
  Để tạo tên và icon:
  
`  SharingShortcutsManager.kt`
  ```
  val staticLauncherShortcutIntent = Intent(Intent.ACTION_DEFAULT)
  
  ShortcutInfoCompat.Builder(context, Integer.toString(id))
        .setShortLabel(contact.name)
        .setIcon(IconCompat.createWithResource(context, contact.icon))
        .setIntent(staticLauncherShortcutIntent)
        .build()
  ```
  Nếu một lối tắt tồn tại lâu dài, nó có thể được lưu vào bộ nhớ đệm bởi các dịch vụ hệ thống khác nhau và có thể xuất hiện dưới dạng mục tiêu chia sẻ ngay cả khi nó chưa được ứng dụng hủy xuất bản hoặc xóa. 
  
  ```
  ShortcutInfoCompat.Builder(context, Integer.toString(id))
         ...
        .setLongLived(true)
        .build()
  ```
  
#   Publish sharing
**SharingShortcutsManager.kt**

```
ShortcutManagerCompat.addDynamicShortcuts(context, shortcuts)
```
  
**AndroidManifest.xml**
```
<activity
    // Activity sẽ tiến hành share.
    android:name=".SendMessageActivity"
    android:label="@string/app_name"
    android:theme="@style/DirectShareDialogTheme">
    <intent-filter>
        <action android:name="android.intent.action.SEND" />
        <category android:name="android.intent.category.DEFAULT" />
        <data android:mimeType="text/plain" />
    </intent-filter>
</activity>
```

**SendMessageActivity.kt**
```
    private fun handleIntent(intent: Intent): Boolean {
        if (Intent.ACTION_SEND == intent.action && "text/plain" == intent.type) {
            textToShare = intent.getStringExtra(Intent.EXTRA_TEXT)
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P &&
                    intent.hasExtra(Intent.EXTRA_SHORTCUT_ID)) {
                val shortcutId = intent.getStringExtra(Intent.EXTRA_SHORTCUT_ID)
                contactId = Integer.valueOf(shortcutId!!)
            } else {
                contactId = Contact.invalidId
            }
            return true
        }
        return false
    }
```

Và thành quả sau cùng.
![](https://images.viblo.asia/61ef9afe-c719-49ca-bdf3-5e08a13b4e7b.png)

Cảm ơn các bạn đã theo dõi :heart_eyes::heart_eyes:

> Code lab: https://developer.android.com/codelabs/android-direct-share#0