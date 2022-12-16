Ở phần trước, chúng mình đã cùng nhau tìm hiểu sơ qua về khái niệm để có cái nhìn bao quát về **Sync Adapter Framework**, đồng thời cũng đã tìm hiểu được một phần cách để implements nó. Nếu bạn đã bỏ lỡ mất phần trước của bài viết thì bạn có thể tham khảo tại đây nhé: [Sync Adapter Framework - Better ways to sync](https://viblo.asia/p/sync-adapter-framework-better-ways-to-sync-Ljy5VPeVZra#_i-introduction-0).
Phần này sẽ giới thiệu đến bạn cách để implements những thành phần còn lại, bao gồm: tạo stub content provider, tạo và khởi chạy sync adapter. Chúng mình cùng bắt đầu ngay nhé!
## **2. Create a stub content provider**
**Sync Adapter Framework** được thiết kế để làm việc với dữ liệu thiết bị được quản lý bởi 1 provider framework linh hoạt và có độ bảo mật cao. Chính vì vậy, Sync Adapter Framework kỳ vọng rằng app của bạn sẽ sử dụng framework đã được tích hợp content provider cho local data của nó, nếu không sync adapter của bạn sẽ crashes khi run.
**[ContentProvider]**(https://developer.android.com/reference/android/content/ContentProvider) cung cấp nhiều lợi ích về mặt bảo mật và được thiết kế đặc biệt cho việc lưu trữ dữ liệu trên Android. Nếu app của bạn được thiết kế để truyền tải dữ liệu từ server tới device thì bạn nên cân nhắc tạo cho mình một content provider hoàn chỉnh. ***Ngược lại, nếu app của bạn có cơ chế lưu trữ data khác, vì việc tạo content provider không thực sự cần thiết***. Tuy nhiên, để thoả mãn được những yêu cầu khi xây dựng Sync Adapter Framework thì bạn vẫn cần khai báo những thành phần cốt lõi của content provider cho app của mình, chúng là những thành phần thiết yếu để cấu thành content provider, tuy nhiên tất cả các phương thức đều phải return **null** hoặc **0**. Sau khi khai báo những thành phần này, bạn có thể sử dụng sync adapter để đồng bộ dữ liệu dưới bất kỳ hình thức nào bạn có. 
### 2.1. Add a stub content provider 
Để tạo stub content provider, ta tạo 1 class kế thừa từ ContentProvider class và override lại các phương thức:
```
/*
 * Define an implementation of ContentProvider that stubs out
 * all methods
 */
class StubProvider : ContentProvider() {
    /*
     * Always return true, indicating that the
     * provider loaded correctly.
     */
    override fun onCreate(): Boolean  = true

    /*
     * Return no type for MIME type
     */
    override fun getType(uri: Uri): String?  = null

    /*
     * query() always returns no results
     *
     */
    override fun query(
            uri: Uri,
            projection: Array<String>,
            selection: String,
            selectionArgs: Array<String>,
            sortOrder: String
    ): Cursor?  = null

    /*
     * insert() always returns null (no URI)
     */
    override fun insert(uri: Uri, values: ContentValues): Uri? = null

    /*
     * delete() always returns "no rows affected" (0)
     */
    override fun delete(uri: Uri, selection: String, selectionArgs: Array<String>): Int = 0

    /*
     * update() always returns "no rows affected" (0)
     */
    override fun update(
            uri: Uri,
            values: ContentValues,
            selection: String,
            selectionArgs: Array<String>
    ): Int = 0
}
```

### 2.2. Declare the provider in manifest
Để **Sync Adapter Framework** xác định được app của bạn đã được tích hợp ContentProvider thì bạn cần khai báo stub content provider của mình trong file manifest với đầy đủ những thuộc tính cần thiết:
- *android:name*="com.example.android.datasync.provider.StubProvider" : Tên của class implements stub content provider
- *android:authorities*="com.example.android.datasync.provider": URI để xác định stub content provider của bạn, value của nó được cấu tạo từ app’s package name + chuỗi *“.provider”*. Điều này để ngăn không cho thành phần nào cập vào provider này mặc dù nó được khai báo cho system.
- *android:exported="false"*: Xác định xem liệu rằng app của bạn có khả năng truy cập vào content provider này không. Đặt giá trị là *false* vì không cần cho phép bất cứ ứng dụng nào truy cập vào nó. Giá trị này không ảnh hưởng đến sự tương tác giữa Sync Adapter Framework và content provider. 
- *android:syncable="true"*: Đặt giá trị là “**true**” cho phép provider của bạn có thể đồng bộ hóa và bạn sẽ không cần call method `setIsSyncable()` trong code. Flag này cho phép sync adapter framework thực hiện transfer data với content provider khi bạn call việc transfer 1 cách rõ ràng.

```
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.android.network.sync.BasicSyncAdapter"
    android:versionCode="1"
    android:versionName="1.0" >
    <application
        android:allowBackup="true"
        android:icon="@drawable/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme" >
    ...
    <provider
        android:name="com.example.android.datasync.provider.StubProvider"
        android:authorities="com.example.android.datasync.provider"
        android:exported="false"
        android:syncable="true"/>
    ...
    </application>
</manifest>
```

 
Ok vậy là đã tạo xong những dependencies required bởi Sync Adapter Framework. Bây giờ chúng ta sẽ bắt đầu khai báo sync adapter để implements data transfer code.


## **3. Create a sync adapter**
Để tạo sync adapter bạn cần chú ý các thành phần:
- *Sync adapter class*: Class bọc data transfer code trong 1 interface làm việc tương thích với Sync Adapter Framework.
- *Bound Service*: Component cho phép Sync Adapter Framework run code bên trong sync adapter class.
- *Sync adapter xml metadata file*: Chứa thông tin về sync adapter. Sync adapter framework đọc file này để xác định phương thức call và lên lịch cho việc transfer data.
- *Declarations in the app manifest*: Bạn cần báo Bound Service và file metadata của mình để hệ thống có thể đọc được.

### 3.1. Create a sync adapter class
Bạn cần phải tạo 1 class extends **sync adapter base class**, khai báo constructor, implements các method để định nghĩa cách thức transfer data.
***3.1.1. Extend the base adapter class***
Việc bạn cần làm là tạo 1 class extending **[AbstractThreadedSyncAdapter](https://developer.android.com/reference/android/content/AbstractThreadedSyncAdapter)** class và define constructor cho nó. Constructor được sử dụng để run các setup tasks mỗi khi sync adapter component được tạo, nó tương tự như việc bạn override `onCreate()` của Acitivity. Dạng thứ 2 của constructor được add vào Android platform 3.0 để support cho *parallelSyncs argument*, vì vậy bạn cần khởi tạo cả 2 dạng constructor này để duy trì tính tương thích. 

****Lưu ý***: Sync adapter framework được thiết kế để làm việc tương thích với sync adapter components là singleton instances.

```
/**
 * Handle the transfer of data between a server and an
 * app, using the Android sync adapter framework.
 */
class SyncAdapter @JvmOverloads constructor(
        context: Context,
        autoInitialize: Boolean,
        /**
         * Using a default argument along with @JvmOverloads
         * generates constructor for both method signatures to maintain compatibility
         * with Android 3.0 and later platform versions
         */
        allowParallelSyncs: Boolean = false,
        /*
         * If your app uses a content resolver, get an instance of it
         * from the incoming Context
         */
        val mContentResolver: ContentResolver = context.contentResolver
) : AbstractThreadedSyncAdapter(context, autoInitialize, allowParallelSyncs) {
    ...
}
```

***3.1.2. Add the data transfer code***
Sync adapter component không thể tự động thực hiện việc transfer data. Nó chỉ có thể bọc data transfer code của bạn, **sync adapter framework** sẽ thực hiện việc transfer data bên dưới background, không cần đến sự can thiệp của app. Khi framework sẵn sàng để sync data, nó sẽ invoke đến method `onPerformSync()`. Trong đó, cần nắm được các arguments:
- *Account*: Account object được liên kết với event triggered sync adapter. Nếu server không cần account để xác thực thì bạn có thể bỏ qua argument này.
- *Extras*:  Bundle object chứa các flags được gửi bởi event triggered adapter. 
- *Authority*: Quyền truy cập vào content provider của system. App cần quyền này để truy cập vào provider. Thông thường, authority này tương ứng với content provider bên trong app của bạn.
- *Content provider client*: ContentProviderClient cho content provider được xác định bởi Authority argument. Nó là 1 lightweight public interface cho content provider. Chức năng của nó tương tự như 1  **[ContentResolver](https://developer.android.com/reference/android/content/ContentResolver)**. Nếu app của bạn không sử dụng content provider để lưu trữ dữ liệu thì bạn có thể bỏ qua nó. 
-* Sync result*: SyncResult sử dụng để gửi thông tin đến sync adapter framework.

```
/*
 * Specify the code you want to run in the sync adapter. The entire
 * sync adapter runs in a background thread, so you don't have to set
 * up your own background processing.
 */
override fun onPerformSync(
        account: Account,
        extras: Bundle,
        authority: String,
        provider: ContentProviderClient,
        syncResult: SyncResult
) {
    /*
     * Put the data transfer code here.
     */
}
```

Có một số điều bạn cần chú ý khi implements transfer code:
- *Connecting to server*: Sync adapter framework không thể tự động connect tới server nên bạn phải chủ động thực hiện việc này.
- *Downloading & uploading data*: Sync adapter không thể tự động thực hiện bất kỳ transfer data tasks nào. Nếu bạn muốn lấy data từ server về và lưu nó vào provider thì bạn phải implements những method để request và insert data vào content provider. Tương tự, việc send data từ local lên server bạn cũng cần đọc data từ nơi lưu trữ và send chúng đi bởi các upload request của bạn. Tại đây, bạn cũng có thể handle error network trong khi thực hiện transfer data.
- *Handling data conflicts or determining how current the data is*: Bạn cần phải tự implement cách để xử lý khi có conflicts với data giữa server và device local bởi vì sync adapter không thể tự động xử lý việc này.
- *Clean up*: Hãy luôn nhớ rằng cần phải disconnect server và clear những tài nguyên tạm thời và bộ nhớ đệm sau mỗi lần thực hiện transfer data.

****Lưu ý***: method  `onPerformSync()` được chạy trên background thread, vì vậy bạn không cần phải implements background processing. Ngoài ra bạn nên kết hợp việc xử lý các *sync-related task* với các *network-related task* để đảm bảo có đủ dung lượng pin cho việc start và stop network interfaces. Để tìm hiểu thêm về cách access network hiệu quả, bạn có thể đọc thêm về *[Transferring Data Without Draining the Battery](https://developer.android.com/training/efficient-downloads)*, bạn có thể sẽ học được 1 vài cách để tối ưu cho sync adapter của mình. 

### 3.2 Bind the sync adapter to framework
Bạn cần tạo 1 **[Bound Service](https://developer.android.com/reference/android/app/Service)** và truyền binder object từ sync adapter component tới framework để cung cấp quyền khả năng truy cập vào sync adapter component cho sync adapter framework. Framework sẽ dựa vào object này để invoke vào phương thức` onPerformSync()` và thực hiện passing data.
Bạn hãy khởi tạo 1 singleton instance của sync adapter component bên trong  `onCreate()` của service. Bằng cách này, việc khởi tạo nó sẽ được trì hoãn cho tới khi framework chạy transfer data lần đầu. Bạn cũng cần khởi tạo nó trong 1 *thread-safe manner*, tránh rủi ro trong trường hợp framework queues up những executions được lập lịch bởi sync adapter. 

```
package com.example.android.syncadapter
/**
 * Define a Service that returns an [android.os.IBinder] for the
 * sync adapter class, allowing the sync adapter framework to call
 * onPerformSync().
 */
class SyncService : Service() {
    /*
     * Instantiate the sync adapter object.
     */
    override fun onCreate() {
        /*
         * Create the sync adapter as a singleton.
         * Set the sync adapter as syncable
         * Disallow parallel syncs
         */
        synchronized(sSyncAdapterLock) {
            sSyncAdapter = sSyncAdapter ?: SyncAdapter(applicationContext, true)
        }
    }

    /**
     * Return an object that allows the system to invoke
     * the sync adapter.
     *
     */
    override fun onBind(intent: Intent): IBinder {
        /*
         * Get the object that allows external processes
         * to call onPerformSync(). The object is created
         * in the base class code when the SyncAdapter
         * constructors call super()
         *
         * We should never be in a position where this is called before
         * onCreate() so the exception should never be thrown
         */
        return sSyncAdapter?.syncAdapterBinder ?: throw IllegalStateException()
    }

    companion object {
        // Storage for an instance of the sync adapter
        private var sSyncAdapter: SyncAdapter? = null
        // Object to use as a thread-safe lock
        private val sSyncAdapterLock = Any()
    }
}
```

### 3.3. Add the account required by framework
Sync adapter framework yêu cầu mỗi sync adapter phải có 1 account type. Bạn phải setup account type bên trong Android system. Để setup account type, bạn phải add 1 placeholder account sử dụng account type bằng cách gọi method `addAccountExplicitly()`. Nơi thích hợp nhất để call method này là trong `onCreate()` của activity sử dụng để open app của bạn. 

```
...
// Constants
// The authority for the sync adapter's content provider
const val AUTHORITY = "com.example.android.datasync.provider"
// An account type, in the form of a domain name
const val ACCOUNT_TYPE = "example.com"
// The account name
const val ACCOUNT = "placeholderaccount"
...
class MainActivity : FragmentActivity() {

    // Instance fields
    private lateinit var mAccount: Account
    ...
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
       ...
        // Create the placeholder account
        mAccount = createSyncAccount()
       ...
    }
    ...
    /**
     * Create a new placeholder account for the sync adapter
     */
    private fun createSyncAccount(): Account {
        val accountManager = getSystemService(Context.ACCOUNT_SERVICE) as AccountManager
        return Account(ACCOUNT, ACCOUNT_TYPE).also { newAccount ->
            /*
             * Add the account and account type, no password or user data
             * If successful, return the Account object, otherwise report an error.
             */
            if (accountManager.addAccountExplicitly(newAccount, null, null)) {
                /*
                 * If you don't set android:syncable="true" in
                 * in your <provider> element in the manifest,
                 * then call context.setIsSyncable(account, AUTHORITY, 1)
                 * here.
                 */
            } else {
                /*
                 * The account exists or some other error occurred. Log this, report it,
                 * or handle it internally.
                 */
            }
        }
    }
    ...
}
```

### 3.4. Add the sync adapter metadata file
Để cắm sync adapter component vào framework, bạn cần cung cấp cho framework metadata file mô tả về component và các flags bổ sung. Metadata file này xác định account type bạn tạo cho sync adapter, content provider authority liên kết với app, kiếm soát 1 phần những system user interface liên quan đến sync adapter, và khai báo những *sync-related flags* khác. Metadata file này được khai báo trong 1 file XML và đặt trong folder `/res/xml/`. Thông thường nó được đặt tên là `syncadapter.xml`.
File XML này chỉ bao gồm 1 cặp thẻ *<sync-adapter>*  gôm các thành phần: 
- *android:contentAuthority*: URI authority cho content provider. Bạn có thể sử dụng giá trị đã khai báo trong android:authorities khi bạn khai báo content provider trong file AndroidManifest.xml. 
- *android:accountType*: Bạn nên đặt giá trị trùng với giá trị account type khi bạn tạo authenticator metadata file.
*Settings attributes*
- *android:userVisible*: Set visibility cho account type. Mặc định, icon và label của nó sẽ được hiển thị trong Account section của system's Settings app.
- *android:supportsUploading*: ***true*** nếu app của bạn cần upload data lên cloud, ***false*** nếu app chỉ cần download data.
- *android:allowParallelSyncs*: Cho phép nhiều instance của sync adapter component chạy đồng thời. Sử dụng nếu app của bạn có nhiều account và muốn thực hiện transfer data đồng thời trên nhiều account.
- *android:isAlwaysSyncable*: Cho phép sync adapter framework run sync adapter component bất cứ lúc nào. Nếu bạn muốn quản lý thời điểm run transfer data, hãy đặt giá trị này là ***false*** và gọi phương thức `requestSync()` mỗi khi cần thực hiện transfer data.

```
<?xml version="1.0" encoding="utf-8"?>
<sync-adapter
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:contentAuthority="com.example.android.datasync.provider"
        android:accountType="com.android.example.datasync"
        android:userVisible="false"
        android:supportsUploading="false"
        android:allowParallelSyncs="false"
        android:isAlwaysSyncable="true"/>
```
    
### 3.5 Declare sync adapter in the manifest
Bạn cần request các permission liên quan và Bound Service để có thể khởi chạy.
- **[android.permission.INTERNET](https://developer.android.com/reference/android/Manifest.permission#INTERNET)**: Cho phép app truy cập internet để transfer data với server.
- **[android.permission.READ_SYNC_SETTINGS](https://developer.android.com/reference/android/Manifest.permission#READ_SYNC_SETTINGS)** & **[android.permission.WRITE_SYNC_SETTINGS](https://developer.android.com/reference/android/Manifest.permission#WRITE_SYNC_SETTINGS)**: Cho phép app truy cập sync adapter settings để có thể dễ dàng controls.

Khai báo permission related:
```
<manifest>
...
    <uses-permission
            android:name="android.permission.INTERNET"/>
    <uses-permission
            android:name="android.permission.READ_SYNC_SETTINGS"/>
    <uses-permission
            android:name="android.permission.WRITE_SYNC_SETTINGS"/>
    <uses-permission
            android:name="android.permission.AUTHENTICATE_ACCOUNTS"/>
...
```
    
Khai báo service:
```
</manifest>
        <service
                android:name="com.example.android.datasync.SyncService"
                android:exported="true"
                android:process=":sync">
            <intent-filter>
                <action android:name="android.content.SyncAdapter"/>
            </intent-filter>
            <meta-data android:name="android.content.SyncAdapter"
                    android:resource="@xml/syncadapter" />
        </service>
```
trong đó:
-  *<intent-filter>*: Lọc những triggered với intent action: `android.content.SyncAdapter`. Mỗi khi có action này được triggered, system sẽ start bound service của bạn. 
-  *android:exported="true"*: Cho phép những processes khác ngoài app của bạn có thể truy cập service (bao gồm cả system).
-  *android:process=":sync"*: Service sẽ được run trên 1 global shared process tên là ‘**sync**’. Khi bạn có nhiều sync adapter bên trong app, có thể sử dụng chung process này để tối ưu tài nguyên.
    
## **4. Run the sync adapter**
****Lưu ý***: Để có thể xử lý tốt các công việc chạy background thì bạn nên tham khảo về  **[WorkManager](https://developer.android.com/topic/libraries/architecture/workmanager)** và **[background processing guide](https://developer.android.com/guide/background)**. 
Để có thể tối ưu được benefit của sync adapter framework, bạn cần lựa chọn thời điểm phù hợp để run sync adapter. Có thể dựa trên schedule hoặc một thời điểm cố định nào đó trong ngày. Tránh thực hiện transfer data như kết quả 1 user action (ví dụ cung cấp refresh button cho user interface).
    
Một số thời điểm thích hợp để run sync adapter:
### 4.1. When server data changes
Nếu app của bạn lấy data từ server và data trên server có thể thay đổi thường xuyên thì bạn có thể run sync adapter để đồng bộ mỗi khi data trên server có sự thay đổi. Để có thể chạy sync adapter, yêu cầu server phải send cho bạn 1 message cụ thể đến **[BroadcastReceiver](https://developer.android.com/reference/android/content/BroadcastReceiver)** bên trong app. Khi nhận được message này, call `ContentResolver.requestSync()` để đăng ký với sync adapter framework để thực hiện run sync adapter.
Bạn có thể sử dụng **[Google Cloud Messaging](https://developers.google.com/cloud-messaging)** cho việc lắng nghe message từ server 1 cách an toàn và hiệu quả. Trong khi việc lắng nghe thay đổi từ server bằng Service bình thường yêu cầu Service của bạn phải luôn chạy, kể cả khi không có thay đổi, gây ra tiêu tốn dung lượng pin không cần thiết, thì GCM sử dụng BroadcastReceiver, chỉ activated khi message được gửi đến. 
    
***Lưu ý***: Khi sử dụng GCM, gần như device đăng ký sẽ nhận được message cùng lúc và đồng thời chạy tất cả các instance của sync adapter dẫn tới tình trạng server overload. Để tránh tình huống này, bạn nên cân nhắc việc trì hoãn run sync adapter trong 1 khoảng thời gian duy nhất cho từng device. 
Ví dụ làm thế nào để run `requestSync()` khi nhận được GCM message:
```
...
// Constants
// Content provider authority
const val AUTHORITY = "com.example.android.datasync.provider"
// Account type
const val ACCOUNT_TYPE = "com.example.android.datasync"
// Account
const val ACCOUNT = "default_account"
// Incoming Intent key for extended data
const val KEY_SYNC_REQUEST = "com.example.android.datasync.KEY_SYNC_REQUEST"
...
class GcmBroadcastReceiver : BroadcastReceiver() {
    ...
    override fun onReceive(context: Context, intent: Intent) {
        // Get a GCM object instance
        val gcm: GoogleCloudMessaging = GoogleCloudMessaging.getInstance(context)
        // Get the type of GCM message
        val messageType: String? = gcm.getMessageType(intent)
        /*
         * Test the message type and examine the message contents.
         * Since GCM is a general-purpose messaging system, you
         * may receive normal messages that don't require a sync
         * adapter run.
         * The following code tests for a a boolean flag indicating
         * that the message is requesting a transfer from the device.
         */
        if (GoogleCloudMessaging.MESSAGE_TYPE_MESSAGE == messageType
            && intent.getBooleanExtra(KEY_SYNC_REQUEST, false)) {
            /*
             * Signal the framework to run your sync adapter. Assume that
             * app initialization has already created the account.
             */
            ContentResolver.requestSync(mAccount, AUTHORITY, null)
            ...
        }
        ...
    }
    ...
}
```
    
### 4.2 When device data changes
Nếu app của bạn sử dụng content provider để lưu trữ data. Bạn có thể observe mỗi khi data thay đổi và và thực hiện call `requestSync()` để đồng bộ data lên server.
    
***Lưu ý***: Nếu bạn sử dụng stub content provider thì provider của bạn sẽ không có data và callback  `onChange()` sẽ không bao giờ được gọi. Trường hợp này bạn cần có 1 cơ chế lắng nghe data thay đổi của riêng bạn, và gọi  `requestSync()` trong response của nó.
Để observe được content provider, extend từ class **[ContentObserver](https://developer.android.com/reference/android/database/ContentObserver)** và implements callback onChange(). Sau đó, gọi `requestSync()` bên trong callback này để run sync adapter. 
Để register observer, truyền nó như 1 argument vào phương thức `registerContentObserver()`. Đồng thời bạn cũng cần phải truyền vào 1 content URI cho data bạn muốn lắng nghe. Nếu content URI này match với URI được truyền vào trong ContentResolver, callback `ContentObserver.onChange()` sẽ được gọi.
    
```
// Constants
// Content provider scheme
const val SCHEME = "content://"
// Content provider authority
const val AUTHORITY = "com.example.android.datasync.provider"
// Path for the content provider table
const val TABLE_PATH = "data_table"
...
class MainActivity : FragmentActivity() {
    ...
    // A content URI for the content provider's data table
    private lateinit var uri: Uri
    // A content resolver for accessing the provider
    private lateinit var mResolver: ContentResolver
    ...
    inner class TableObserver(...) : ContentObserver(...) {
        /*
         * Define a method that's called when data in the
         * observed content provider changes.
         * This method signature is provided for compatibility with
         * older platforms.
         */
        override fun onChange(selfChange: Boolean) {
            /*
             * Invoke the method signature available as of
             * Android platform version 4.1, with a null URI.
             */
            onChange(selfChange, null)
        }

        /*
         * Define a method that's called when data in the
         * observed content provider changes.
         */
        override fun onChange(selfChange: Boolean, changeUri: Uri?) {
            /*
             * Ask the framework to run your sync adapter.
             * To maintain backward compatibility, assume that
             * changeUri is null.
             */
            ContentResolver.requestSync(account, AUTHORITY, null)
        }
        ...
    }
    ...
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        ...
        // Get the content resolver object for your app
        mResolver = contentResolver
        // Construct a URI that points to the content provider data table
        uri = Uri.Builder()
                .scheme(SCHEME)
                .authority(AUTHORITY)
                .path(TABLE_PATH)
                .build()
        /*
         * Create a content observer object.
         * Its code does not mutate the provider, so set
         * selfChange to "false"
         */
        val observer = TableObserver(false)
        /*
         * Register the observer for the data table. The table's path
         * and any of its subpaths trigger the observer.
         */
        mResolver.registerContentObserver(uri, true, observer)
        ...
    }
    ...
}
```
    
### 4.3. Run sync adapter periodically
Bạn có thể thiết lập 1 khoảng thời gian định kỳ để khởi chạy sync adapter để download data từ server về device. Tương tự, bạn có thể thiết lập để run sync adapter để upload data từ device lên server vào ban đêm vì hầu hết người dùng đều không sử dụng điện thoại, bật nguồn và cắm sạc điện thoại vào ban đêm nên khoảng thời gian này rất hữu dụng. Tuy nhiên, hãy cân nhắc để mỗi device chạy sync adapter vào một khoảng thời gian khác nhau tránh việc làm server overload. 
Để chạy sync adapter định kỳ, call method `addPeriodicSync()`. Vì sync adapter framework cần chạy nhiều sync adapter và tối ưu hóa thời gian sử dụng pin của device nên thời gian bạn đặt có thể lệch giao động vài giây. Để có thể chạy `addPeriodicSync()`, bạn cần sử dụng 1 repeating alarm để trigger vì nó không thể tự động chạy.
    
```
// Content provider authority
const val AUTHORITY = "com.example.android.datasync.provider"
// Account
const val ACCOUNT = "default_account"
// Sync interval constants
const val SECONDS_PER_MINUTE = 60L
const val SYNC_INTERVAL_IN_MINUTES = 60L
const val SYNC_INTERVAL = SYNC_INTERVAL_IN_MINUTES * SECONDS_PER_MINUTE
...
class MainActivity : FragmentActivity() {
    ...
    // A content resolver for accessing the provider
    private lateinit var mResolver: ContentResolver

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        ...
        // Get the content resolver for your app
        mResolver = contentResolver
        /*
         * Turn on periodic syncing
         */
        ContentResolver.addPeriodicSync(
                mAccount,
                AUTHORITY,
                Bundle.EMPTY,
                SYNC_INTERVAL)
        ...
    }
    ...
}
```
    
### 4.4. Run sync adapter on demand
Trường hợp này thực sự không được khuyến khích khi sử dụng sync adapter framework vì nó đi ngược lại những lợi ích khi thiết kế sync adapter framework, hơn nữa cho phép user có thể chủ động run sync adapter sẽ gây lãng phí tài nguyên network và battery. Tuy nhiên, để có thể chạy sync adapter một cách chủ động, bạn có thể set flags cho phép chạy sync adapter thử công và sau đó gọi phương thức `ContentResolver.requestSync()`.
    
Có 2 flags cho phép bạn chạy sync adapter thủ công:
- **[SYNC_EXTRAS_MANUAL](https://developer.android.com/reference/android/content/ContentResolver#SYNC_EXTRAS_MANUAL)**: Force sync thủ công. Sync adapter sẽ ignores những setting trước đó, chẳng hạn như cờ set bởi `setSyncAutomatically()`.
- **[SYNC_EXTRAS_EXPEDITED](https://developer.android.com/reference/android/content/ContentResolver#SYNC_EXTRAS_EXPEDITED)**: Force sync adapter chạy ngay lập tức. Nếu bạn không set cờ này, system có thể delay việc chạy sync adapter của bạn 1 vài giây để tối ưu hóa dung lượng pin và lên lịch cho việc chạy nhiều request trong 1 khoảng thời gian ngắn.
    
```
// Constants
// Content provider authority
val AUTHORITY = "com.example.android.datasync.provider"
// Account type
val ACCOUNT_TYPE = "com.example.android.datasync"
// Account
val ACCOUNT = "default_account"
...
class MainActivity : FragmentActivity() {
    ...
    // Instance fields
    private lateinit var mAccount: Account
    ...
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        ...
        /*
         * Create the placeholder account. The code for CreateSyncAccount
         * is listed in the lesson Creating a Sync Adapter
         */

        mAccount = createSyncAccount()
        ...
    }

    /**
     * Respond to a button click by calling requestSync(). This is an
     * asynchronous operation.
     *
     * This method is attached to the refresh button in the layout
     * XML file
     *
     * @param v The View associated with the method call,
     * in this case a Button
     */
    fun onRefreshButtonClick(v: View) {
        // Pass the settings flags by inserting them in a bundle
        val settingsBundle = Bundle().apply {
            putBoolean(ContentResolver.SYNC_EXTRAS_MANUAL, true)
            putBoolean(ContentResolver.SYNC_EXTRAS_EXPEDITED, true)
        }
        /*
         * Request the sync for the default account, authority, and
         * manual sync settings
         */
        ContentResolver.requestSync(mAccount, AUTHORITY, settingsBundle)
    }
```
## **5. Tổng kết**
Như vậy là chúng mình đã cùng nhau đi qua 1 lượt tìm hiểu tất tần tật lý thuyết về **Sync Adapter Framework**. Chắc hẳn dù ít dù nhiều thì các bạn cũng đã có cho mình được những hình dung nhất định về công cụ tuyệt vời này rồi phải không? Nếu có vấn đề gì còn vướng mắc, hãy comment xuống phía dưới cho mình biết nhé.
    
Nhắc nhỏ: Các bậc tiền bối đi trước luôn căn dặn chúng mình 1 câu: *"Trăm nghe không bằng 1 thấy, mà trăm thấy không bằng 1 lần vác bàn phím ra code thử"*. Ý là lý thuyết dù có nhiều, và hay ho tới đâu nếu chỉ đọc thôi không áp dụng thì cũng chỉ như nước đổ đầu vịt ==!. Vậy để mớ lý thuyết này không chỉ dùng để đọc suông thì bạn có thể thử áp dụng và tự làm cho mình 1 project nhỏ nhỏ, hoặc hãy tiếp tục đồng hành với mình trong series này ở phần sau nhé!
    
*Cảm ơn bạn đã đọc!*
    
Tạm biệt, hẹn gặp lại.