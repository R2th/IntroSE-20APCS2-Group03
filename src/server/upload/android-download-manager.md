# Download Files sử dụng Download Manager trong Android
## 1. Giới thiệu
Download manager là một service hệ thống dùng để xử lý các long-running HTTP downloads. Client có thể request một URI được download cho một file đích cụ thể. Download manager sẽ thực hiện download dưới background, nó quan tâm đến các HTTP interactions, retrying downloads sau khi có một lỗi hoặc thay đổi kết nối và các reboots hệ thống. 

Khi request download thông qua API này, ta nên register một broadcast receiver cho `ACTION_NOTIFICATION_CLICKED` để xử lý thích hợp khi người dùng click vào một running download hoặc từ download UI.

Thể hiện của class phải được lấy từ `Context.getSystemService(Class)` với argument  là `DownloadManager.class` hoặc `Context.getSystemService(String)` với argument là `Context.DOWNLOAD_SERVICE`.

## 2. Permissions
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

## 3. Generate URI
```kotlin
val imageUri = Uri.parse("http://commonsware.com/misc/test.mp4")
```

## 4. Tạo instance cho DownloadManager
```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        // Instances of download manager
        downloadManager = getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
        ...
    }
```
* Instance của `DownloadManager` sẽ được tạo thông qua `getSystemService` với tham số `Context.DOWNLOAD_SERVICE`.

## 5. Dowload data
```kotlin
    private fun startDownload(uri: Uri): Long {

        val downloadReference: Long

        val request = DownloadManager.Request(uri)

        // Setting title of request
        request.setTitle("Data Download")

        // Setting description of request
        request.setDescription("Android Data download using DownloadManager.")

        // Set the local destination for the downloaded file to a path
        // within the application's external files directory
        request.setDestinationInExternalFilesDir(this@MainActivity, Environment.DIRECTORY_DOWNLOADS, "test.mp4")
        // Enqueue download and save into referenceId
        downloadReference = downloadManager?.enqueue(request) ?: -1

        download.isEnabled = false
        downloadCancel.isEnabled = true

        return downloadReference
    }
```
* `downloadReference`: Nó là id duy nhất để chỉ ra một download request.
* `request`:  Một request mới được tạo bằng việc sử dụng `DownloadManager.Request(uri)`.
* `request.setDestinationInExternalFilesDir`: Dùng để save file vào external downloads folder.
* `downloadManager.enqueue(request)`: Enqueue một download mới tương ứng với request. Quá trình tải xuống sẽ tự động bắt đầu khi download manager sẵn sàng thực hiện và kết nối khả dụng.

## 6. Check Download Status
```kotlin
    private fun getStatusMessage(downloadId: Long): String {

        val query = DownloadManager.Query()
        // set the query filter to our previously Enqueued download
        query.setFilterById(downloadId)

        // Query the download manager about downloads that have been requested.
        val cursor = downloadManager?.query(query)
        if (cursor?.moveToFirst() == true) {
            return downloadStatus(cursor)
        }
        return "NO_STATUS_INFO"
    }
```
* `DownloadManager.Query()`: Được dùng để filter các download manager queries. Ở đây, ta cung cấp một `downloadId` trong `setFilterById()` để chỉ include các downloads với Id được cho.
* `downloadManager.query(query)`: Dùng để truy vấn download manager về downloads được request.
* `Cursor`: Cursor trỏ đến các thông tin của downloads, với các cột bao gồm tất cả hằng số  `COLUMN_*`.

```kotlin
    private fun downloadStatus(cursor: Cursor): String {

        // column for download  status
        val columnIndex = cursor.getColumnIndex(DownloadManager.COLUMN_STATUS)
        val status = cursor.getInt(columnIndex)
        // column for reason code if the download failed or paused
        val columnReason = cursor.getColumnIndex(DownloadManager.COLUMN_REASON)
        val reason = cursor.getInt(columnReason)

        var statusText = ""
        var reasonText = ""

        when (status) {
            DownloadManager.STATUS_FAILED -> {
                statusText = "STATUS_FAILED"
                when (reason) {
                    DownloadManager.ERROR_CANNOT_RESUME -> reasonText = "ERROR_CANNOT_RESUME"
                    DownloadManager.ERROR_DEVICE_NOT_FOUND -> reasonText = "ERROR_DEVICE_NOT_FOUND"
                    DownloadManager.ERROR_FILE_ALREADY_EXISTS -> reasonText = "ERROR_FILE_ALREADY_EXISTS"
                    DownloadManager.ERROR_FILE_ERROR -> reasonText = "ERROR_FILE_ERROR"
                    DownloadManager.ERROR_HTTP_DATA_ERROR -> reasonText = "ERROR_HTTP_DATA_ERROR"
                    DownloadManager.ERROR_INSUFFICIENT_SPACE -> reasonText = "ERROR_INSUFFICIENT_SPACE"
                    DownloadManager.ERROR_TOO_MANY_REDIRECTS -> reasonText = "ERROR_TOO_MANY_REDIRECTS"
                    DownloadManager.ERROR_UNHANDLED_HTTP_CODE -> reasonText = "ERROR_UNHANDLED_HTTP_CODE"
                    DownloadManager.ERROR_UNKNOWN -> reasonText = "ERROR_UNKNOWN"
                }
            }
            DownloadManager.STATUS_PAUSED -> {
                statusText = "STATUS_PAUSED"
                when (reason) {
                    DownloadManager.PAUSED_QUEUED_FOR_WIFI -> reasonText = "PAUSED_QUEUED_FOR_WIFI"
                    DownloadManager.PAUSED_UNKNOWN -> reasonText = "PAUSED_UNKNOWN"
                    DownloadManager.PAUSED_WAITING_FOR_NETWORK -> reasonText = "PAUSED_WAITING_FOR_NETWORK"
                    DownloadManager.PAUSED_WAITING_TO_RETRY -> reasonText = "PAUSED_WAITING_TO_RETRY"
                }
            }
            DownloadManager.STATUS_PENDING -> statusText = "STATUS_PENDING"
            DownloadManager.STATUS_RUNNING -> statusText = "STATUS_RUNNING"
            DownloadManager.STATUS_SUCCESSFUL -> statusText = "STATUS_SUCCESSFUL"
        }

        return "Download Status: $statusText, $reasonText"
    }
```

## 7. Cancel downloads
```kotlin
downloadManager.remove(downloadId);
```

## 8. Broadcast receiver
```kotlin
 private var onComplete: BroadcastReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            // Download complete
            // Check if the broadcast message is for our enqueued download
            long referenceId = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
        }
    }

    private var onNotificationClick: BroadcastReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            // The download notification was clicked
        }
    }
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        ...
        registerReceiver(onComplete, IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE))
        registerReceiver(onNotificationClick, IntentFilter(DownloadManager.ACTION_NOTIFICATION_CLICKED))
    }
    
    override fun onDestroy() {
        super.onDestroy()
        unregisterReceiver(onComplete)
        unregisterReceiver(onNotificationClick)
    }
```
* 	`ACTION_DOWNLOAD_COMPLETE`: Broadcast intent action được gửi bởi download manager khi một download complete.
* 	`ACTION_NOTIFICATION_CLICKED`: Broadcast intent action được gửi bởi download manager khi user clicks vào running download, từ system notification hoặc từ downloads UI.
* 	`referenceId`: Dùng để xác định download nào đã hoàn thành. 

## 9. Demo UI
![](https://images.viblo.asia/445a9679-1ea3-4390-9183-849b1af33145.png)

***Github**: https://github.com/huuphuoc1396/AndroidDownloadManager*

## Tham khảo
1. https://developer.android.com/reference/android/app/DownloadManager
2. https://www.codeproject.com/Articles/1112730/Android-Download-Manager-Tutorial-How-to-Download