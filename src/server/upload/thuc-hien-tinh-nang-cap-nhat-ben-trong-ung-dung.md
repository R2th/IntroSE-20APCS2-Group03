Gần đây, Google đã thông báo rằng họ sẽ cung cấp API cập nhật trong ứng dụng cho các ứng dụng được xuất bản qua Google Play. Tuy nhiên, các ứng dụng không được phân phối qua Cửa hàng Play sẽ không có quyền truy cập vào API này. Gần đây tôi đã thực hiện một chức năng cập nhật trong ứng dụng, nhưng vì tôi không tìm thấy bất kỳ ví dụ hoàn chỉnh nào về nó, nên bài này tôi muốn chia sẻ kinh nghiệm của tôi.

![phone](https://miro.medium.com/max/700/1*IWW1flIWsxU-yOJ3rFz7gQ.gif)

### Kiểm tra xem có bản cập nhật nào không
Trước khi chúng tôi thực hiện cập nhật , điều đầu tiên chúng tôi cần biết nếu có bản cập nhật. Tôi đã sử dụng [Firebase Remote Config](https://firebase.google.com/docs/remote-config/) để định nghĩa thuộc tính `latestVersionCode` sẽ luôn chỉ đến version code của phiên bản mới nhất. Vì nó là một số nguyên chỉ tăng nên nó hoàn toàn phù hợp với kiểu so sánh này. Khi bắt đầu chạy ứng dụng ứng dụng, tôi so sánh thuộc tính với giá trị `BuildConfig.VERSION_CODE` và, nếu nó cao hơn, tôi hiểu là đang có bản cập nhật mới. Tôi đã đóng gói code Remote Config bên trong RxSingle để làm cho code của tôi được tốt hơn:

```kotlin
remoteConfiguration.fetchLatestVersionCode()
     .onErrorReturnItem(BuildConfig.VERSION_CODE)
     .subscribe(versionCode -> {
          if (versionCode > BuildConfig.VERSION_CODE) downloadUpdate()
     })
```

Trong thực tế, tôi sẽ hiển thị một dialog thông báo cho người dùng về bản cập nhật và để người dùng chọn chọn nếu anh ta muốn tải xuống, nhưng ở đây chúng tôi sẽ tải xuống trực tiếp.

### Tải xuống APK mới
Tôi sử dụng `OkHttp` để tải xuống ,và tôi muốn hiển thị một thanh tiến trình tải xuống cho người dùng, tôi cần một ResponseBody để nhận thông tin về tiến trình. Và thật may mắn, có ví dụ chính thức cách làm thế nào để thực hiện việc đó. Tôi đã chuyển sang sử dụng Kotlin:

```kotlin
private const val EXHAUSTED_SOURCE = -1L

/**
 * A [ResponseBody] that informs a [ProgressListener] about the download progress.
 */
class DownloadProgressBody(
    private val responseBody: ResponseBody,
    private val progressListener: ProgressListener
) : ResponseBody() {

    private var bufferedSource: BufferedSource? = null

    override fun contentType(): MediaType? = responseBody.contentType()

    override fun contentLength(): Long = responseBody.contentLength()

    override fun source(): BufferedSource? {
        if (bufferedSource == null) {
            bufferedSource = Okio.buffer(source(responseBody.source()))
        }
        return bufferedSource
    }

    private fun source(source: Source): Source {
        return object : ForwardingSource(source) {
            var totalBytesRead = 0L

            override fun read(sink: Buffer, byteCount: Long): Long {
                val bytesRead = super.read(sink, byteCount)
                // read() returns the number of bytes read, or -1 if this source is exhausted.
                totalBytesRead += if (bytesRead != EXHAUSTED_SOURCE) bytesRead else 0L
                progressListener.update(totalBytesRead, responseBody.contentLength(), bytesRead == EXHAUSTED_SOURCE)
                return bytesRead
            }
        }
    }
}

/**
 * Callback getting informed when the download progress of [DownloadProgressBody] updates.
 */
interface ProgressListener {

    /**
     * Informs this listener that the download progress was updated.
     *
     * @param bytesRead The bytes that have been read.
     * @param contentLength The total bytes that are being read.
     * @param done Whether the download is complete.
     */
    fun update(bytesRead: Long, contentLength: Long, done: Boolean)
}
```

Bây giờ, chúng ta chỉ cần thêm `ResponseBody` như một network interceptor  khi build `OkHttp` client:

```kotlin
val progressListener = object : ProgressListener { ... }
val okHttpClient = OkHttpClient.Builder().addNetworkInterceptor {
    val originalResponse = it.proceed(it.request())
    val responseBody = originalResponse.body() ?:       return@addNetworkInterceptor originalResponse

    return@addNetworkInterceptor originalResponse.newBuilder()
        .body(DownloadProgressBody(responseBody, progressListener))
        .build()
}.build()
```

Và như thế `progressListener`sẽ nhận thông tin về tiến trình tải. Phương thức `update()` như dưới đây

```kotlin
override fun update(bytesRead: Long, contentLength: Long, done: Boolean) {
    val progress = ((bytesRead.toFloat() / contentLength) *    100).roundToInt()
    runOnUiThread { progressBar.progress = progress }

    if (done) installApk()
}
```

Nó cập nhật `ProgressBar` và nếu quá trình tải xuống hoàn tất thì sẽ thực hiện cài đặt.

Bây giờ, để thực hiện download thực tế, chúng tôi thực hiện gọi bằng `OkHttp` tới `apkUrl` là URL của file apk và bạn lưu trữ nó trong một file với

```kotlin
apkFile = File(filesDir, "update.apk")
```

sử dụng internal storage.

```kotlin
val request = Request.Builder().url(apkUrl).build()
val response = okHttpClient.newCall(request).execute()

if (!response.isSuccessful) throw Error("Request failed")

response.body()?.source()?.use { bufferedSource ->
    val bufferedSink = Okio.buffer(Okio.sink(apkFile))
    bufferedSink.writeAll(bufferedSource)
    bufferedSink.close()
}
```

Chú ý: Bạn chỉ có thể download vào internal storage trên Android N hoặc cao hơn. Với các phiên bản thấp hơn, các bạn có thể xem thêm thông tin ở cuối bài này.

### Cài đặt apk đã tải về

Cũng giống như trên phần này chỉ được sử dụng trong Android N trở lên.
Trước tiên, tôi cần thêm `FileProvider` vào `Manifest` để được cấp quyền truy cập trình package installer vào bộ nhớ trong.

```xml
<provider
    android:name="androidx.core.content.FileProvider"
    android:authorities="${applicationId}.provider"
    android:exported="false"
    android:grantUriPermissions="true">
    <meta-data
        android:name="android.support.FILE_PROVIDER_PATHS"
        android:resource="@xml/file_provider_paths" />
</provider>
```

Với  `xml/file_provider_paths` có dạng

```xml
<?xml version="1.0" encoding="utf-8"?>
<paths>
    <files-path
        name="files"
        path="." />
</paths>
```

Như vậy, chúng ta sẽ sử dụng `/files` từ app’s internal storage. Chúng ta cần thêm quyền tới Manifest để có thể có quyền cài đặt ứng dụng mới.

```xml
<uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />
```

Như thế, chúng ta có thể start một intent để chạy trình cài ứng dụng mặng định của hệ thống:

```kotlin
fun installApk() {
  val uri = FileProvider.getUriForFile(
      applicationContext,
      "$packageName.provider",
      apkFile
  )
  val intent = Intent(Intent.ACTION_INSTALL_PACKAGE).apply {
      setDataAndType(uri, "application/vnd.android.package-archive")
      addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
  }
  activity.startActivity(intent)
}
```

Và thông qua `FileProvider`,  chúng ta đã cho phép quyền để package installer có thể đọc `apkFile` từ app’s internal storage. Phần còn lại sẽ được xử lý bởi hệ thống.

Bạn cũng có thể cung cấp cho người dùng những trải nghiệm tốt hơn giống như xóa `apkFile` sau này

### Vấn đề gặp phải với version thấp hơn Nougat
Bên dưới Android 7,package installer hoạt động theo một cách khác, khiến cho không thể cài đặt APK từ bộ nhớ trong, bạn có thể tham khảo thêm [ở đây](https://stackoverflow.com/a/39333203/1477936). Cách giải quyết sẽ là tải APK xuống bộ nhớ ngoài. Sau đó, bạn cũng cần xử lý các runtime permissions để đọc và ghi vào bộ nhớ ngoài.

Ngoài ra, vấn đề bảo mật nếu bạn tải APK xuống bộ nhớ ngoài, hãy tham khảo thêm trên  [Google issue](https://issuetracker.google.com/issues/112630336) ,nó sẽ yêu cầu bạn thực hiện các cơ chế bảo mật bổ sung, như kiểm tra so sánh SHA để xác thực APK của bạn sẽ cài đặt chứ không phải sửa đổi một người nào đó.

Trong trường hợp của tôi, tôi không thực hiện việc cài đặt trong ứng dụng với người dùng Android 5, 6 bởi vì nó khá là phức tạp, nhưng tôi không muốn tài liệu này là không đầy đủ nên tôi đã bổ xung cách thức để xử lý ở trên.

Nguồn: [Implement an in-app update function](https://medium.com/grandcentrix/implement-an-in-app-updater-1f50fbc38416)