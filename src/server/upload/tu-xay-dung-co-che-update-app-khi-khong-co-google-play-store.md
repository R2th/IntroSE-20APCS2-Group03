Bài viết được publish tại https://medium.com/@anhquan.vn/t%E1%BB%B1-x%C3%A2y-d%E1%BB%B1ng-c%C6%A1-ch%E1%BA%BF-update-app-khi-kh%C3%B4ng-c%C3%B3-google-play-store-4f85b240e79a

Follow mình trên medium để nhận các bài viết về android nhé :)

## Giới thiệu

Hiện tại hầu hết các app đều được phân phối qua google play store, tuy nhiên vì một lí do nào đó mà bạn không sử dụng cách phân phối này mà vẫn muốn có thể update được app khi cần, thì bạn cũng không có gì phải lo cả vì chúng ta hoàn toàn có thể tự xây dựng một cơ chế update cho những app như vậy.

Về cơ bản việc update app khi không sử dụng google pay store sẽ bao gồm các bước
1. Upload apk version mới lên server
1. Thông báo có version mới
1. App check có version mới sẽ hiển thị màn hình update kèm nội dung liên quan đến update
1. App tải apk và tiến hành cài đặt

Mỗi khi có version app mới thì bạn sẽ cần thực hiện lần lượt theo các bước ở trên.

Và giờ chúng ta cùng đi vào từng bước nhé

## 1. Upload apk version mới lên server

Phần này thì tuỳ các bạn có thể xây dựng server để lưu file hoặc như bản thân mình sẽ chọn up file apk lên github cho nhanh gọn

Ảnh dưới đây là một ví dụ:

https://github.com/dangquanuet/wifi-hunter-public/blob/develop/apk/wifi-hunter-code-2-name-1-0-1.apk

![](https://images.viblo.asia/760e681f-58bb-4280-8b7c-244ad208274f.png)

Lưu ý: với github thì bạn cần tải thử apk để lấy chính xác link chứa file và cung cấp cho app, 

Ở ví dụ trên thì link để tải file là
```
https://raw.githubusercontent.com/dangquanuet/wifi-hunter-public/develop/apk/wifi-hunter-code-2-name-1-0-1.apk
```

## 2. Thông báo có version mới

Có nhiều cách để làm việc này như
- Xây dựng một server với api trả về thông tin version mới
- Dùng Firebase remote config để trả về thông tin phiên bản mới

![](https://images.viblo.asia/69c854c9-3225-445d-b741-a2794bf8b547.png)

![](https://images.viblo.asia/1cfe78d7-0ced-488c-9f14-2dc5311621f8.png)

Thông tin về version mới nên bao gồm một số trường cơ bản như 
- version code
- version name
- apk url
- release notes

## 3. App check có version mới sẽ hiển thị màn hình update kèm nội dung liên quan đến update

Trong app bạn sẽ cần implement việc check version mới, có thể là thực hiện mỗi khi mở app sẽ check version code hiện tại của app so với version code app update trên server

Nếu version code app hiện tại nhỏ hơn version code app trên server thì bạn có thể thực hiện chuyển tới màn force update app.

Màn force update app nên hiển thị các thông tin cơ bản nhất về verson mới và button để người dùng quyết định có update app ngay lúc đó hay không.

![](https://images.viblo.asia/ca302964-77ca-4e55-932b-65e7cb5c3956.png)


## 4. App tải apk và tiến hành cài đặt

Khi người dùng nhấn update app, bạn sẽ thực hiện lần lượt các việc là 

- Config AndroidManifest.xml

```kotlin
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />

    <application>
    ...
        <provider
            android:name="androidx.core.content.FileProvider"
            android:authorities="${applicationId}.provider"
            android:exported="false"
            android:grantUriPermissions="true">
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/provider_paths" />
        </provider>
    </application>
```

Các bạn cần đảm bảo runtime permission cho các device chạy Android 6 trở lên nhé, có thể tham khảo cách request runtime permission nhanh gọn lẹ ở đây

https://github.com/dangquanuet/The-Movie-DB-Kotlin/blob/develop/app/src/main/java/com/example/moviedb/utils/PermissionUtils.kt

- Tài apk mới từ url về device

```kotlin
private fun downLoadFileFromUrl(url: String) {
        val context = context ?: return
        val downloadManager =
            context.applicationContext?.getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
        val uri = Uri.parse(url)

        // check if apk file exists
        val oldFile = File(filePath + filename)
        if (oldFile.exists()) {
            openApkFile(filePath)
        } else {
            // download location is Download folder
            val dir =
                Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
            dir.mkdirs();
            val downloadLocation = Uri.fromFile(File(dir, filename))

            // start download manager
            val request = DownloadManager.Request(uri)
                .setTitle(filename)
                .setDescription(getString(R.string.downloading))
                .setAllowedNetworkTypes(DownloadManager.Request.NETWORK_MOBILE or DownloadManager.Request.NETWORK_WIFI)
                .setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
                .setVisibleInDownloadsUi(true)
                .setDestinationUri(downloadLocation)
            request.allowScanningByMediaScanner()
            downloadID = downloadManager.enqueue(request)
        }
    }
```

- Lắng nghe khi nào quá tình download thực hiện xong qua receiver

```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        context?.registerReceiver(
            onDownloadComplete,
            IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE)
        )
    }
    
    override fun onDestroy() {
        context?.safeUnregisterBroadCastReceiver(onDownloadComplete)
        super.onDestroy()
    }

    private val onDownloadComplete = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            val id = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1)
            // Checking if the received broadcast is for our enqueued download by matching download id
            if (downloadID == id) {
                Toast.makeText(context, getString(R.string.download_completed), Toast.LENGTH_SHORT)
                    .show()
                openApkFile(filePath)
            }
        }
    }
```

- Hiển thị pop up cài đặt app:

```kotlin
    private fun openApkFile(location: String) {
        val intent = Intent(Intent.ACTION_VIEW)
        intent.setDataAndType(getUriFromFile(location), "application/vnd.android.package-archive")
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        context?.startActivity(intent)
    }

    private fun getUriFromFile(location: String): Uri? {
        return if (Build.VERSION.SDK_INT < 24) {
            Uri.fromFile(File(location + filename))
        } else {
            FileProvider.getUriForFile(
                context ?: return null,
                context?.applicationContext?.packageName + ".provider",
                File(location + filename)
            )
        }
    }
```

![](https://images.viblo.asia/54b58a14-2e23-4fd8-ab3f-42c28f220fb4.png)


**Lưu ý**: Để có thể cài đặt app từ apk thì bạn cần đảm bảo user đã enable setting cho phép caì đặt app từ nguồn không xác định:

1. Go to your phone’s **Settings**
1. Go to **Security & privac**y > **More settings**
1. Tap on **Install apps from external sources**
1. Select the **browser you want to download APK files from**
1. Toggle **Allow app installs ON**

![](https://images.viblo.asia/2335c536-5c64-4be5-971d-6d12eb6839c3.png)

Như vậy là bạn đã cài đặt xong một cơ chế để update app mà không cần qua google play store :)

Hẹn gặp lại các bạn trong các bài viết tới.