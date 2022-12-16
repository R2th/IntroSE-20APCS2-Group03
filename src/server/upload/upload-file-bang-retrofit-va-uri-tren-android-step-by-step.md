# I. Lời mở đầu
* Xin chào các bạn! Lâu lắm rồi mình mới có bài trên Viblo (chắc tầm phải 2 -3 tháng hơn) và hôm nay để đánh dấu sự quay trở lại này mình xin gửi đến các bạn một bài viết với chủ đề là Upload file (hình ảnh, document…) bằng Retrofit (hoặc các library bất kỳ có hỗ trợ RequestBody của okhttp3) và [URI](https://developer.android.com/reference/android/net/Uri) trên Android. 
* Mình đang tham gia một dự án có chức năng upload hình (chọn từ gallery / chụp hình) và upload lên S3 (Amazon service), tuy nhiên hiện tại Android không cho phép chúng ta truy cập trực tiếp vào đường dẫn của file nên muốn upload file thì chúng ta chỉ có thể thao tác với URI. 
* Ban đầu team mình chọn phương án dùng URI để ghi ra file rồi sử dụng file này để upload. Về cơ bản thì phương án ghi ra file đã giải quyết tốt yêu cầu của chức năng upload (ví dụ như upload avatar chẳng hạn). Tuy nhiên khi phát triển tới chức năng upload file hàng loạt thì phương án này mới lộ ra một nhược điểm lớn đó khoảng thời gian chờ khi ghi file từ URI. Với những file có dung lượng lớn thì đây thật sự là khoảng chờ không đáng có (bên mình phải upload file có dung lượng lên đến 100MB), bên cạnh đó, sau khi upload thành công thì chúng ta còn phải xử lý xóa file đã ghi để tránh sinh ra file rác... và còn vài nhược điểm khác cần khắc phục mà mình không liệt kê ở đây.
* Sau khi tìm hiểu và thay đổi phương pháp thì mình quyết định sẽ viết một bài về cách upload mới này. Nội dung bài viết mình sẽ cố gắng trình bày rõ ràng từng bước một (step-by-step) để các bạn có thể tham khảo dễ dàng hơn.
# II. Nội dung chính
* Chúng ta sẽ đi theo trình tự từ ngoài vào trong, nếu làm hết các bước rồi mà vẫn chưa thành công thì các bạn có thể xem phần lưu ý hoặc comment vào bài viết cho mình nhé.
## Bước 1 – AndroidManifest
* Bước đầu tiên và cơ bản nhất là chúng ta sẽ cung cấp các quyền sau:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```
> Mục đích các quyền trên làm gì thì các bạn có thể xem trên trang document của Android nhé. Máy mình test đang chạy Android 10 nên vẫn ổn với các quyền này.
* Tiếp theo, chúng ta sẽ khai báo provider như sau:
```xml
<provider
            android:name="androidx.core.content.FileProvider"
            android:authorities="${applicationId}.provider"
            android:exported="false"
            android:grantUriPermissions="true">
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/file_paths" />
</provider>
```
* Nội dung file_paths.xml
```xml
<paths>
    <external-files-path
        name="demo_images"
        path="." />
</paths>
```
> Nói một cách dễ hiểu thì provider này sẽ cho phép chúng ta truy cập file bằng URI (ví dụ khi chúng ta chụp ảnh rồi dùng ảnh này để upload), còn cụ thể hơn thì các bạn có thể xem tại [đây]( https://developer.android.com/reference/androidx/core/content/FileProvider).
## Bước 2 – Retrofit
* API upload mình đang sử dụng đang như thế này:
```kotlin
@PUT 
suspend fun uploadFile(@Url url: String, @Body request: RequestBody)
```
> API này đang sử dụng url của S3 cung cấp để upload file nên mình thay đổi url bằng @Url và request sẽ chứa thông tin của file cần upload dưới dạng BufferedSink. Chúng ta không cần quá quan tâm đến API này, tùy từng library mà sẽ có cách khai báo khác nhau miễn sao có support RequestBody là chúng ta có thể tiếp tục được.
## Bước 3 – Lựa chọn đầu vào (ở đây mình sẽ đưa ra 2 case là chọn file từ bộ nhớ và chụp hình)
### a. Chọn file từ bộ nhớ
* Để có thể truy cập vào bộ nhớ thì chúng ta sẽ yêu cầu user cấp quyền real-time và hàm có thể viết như sau:
```kotlin
private fun chooseFileFromStorage() {
// Yêu cầu quyền truy cập từ user        
withPermissionsCheck(
            Manifest.permission.WRITE_EXTERNAL_STORAGE,
            onShowRationale = ::onShowRationale,
            onNeverAskAgain = {
                showConfirmationDialog(
// Ở đây là nội dung của dialog mà chúng ta cần hiển thị. Giả sử dialog sẽ có 2 button (đi đến Setting của hệ thống để sửa quyền và bỏ qua)
                    positiveButtonEvent = {
// Đi đến Setting của hệ thống
                        gotoPermissionSetting(requireActivity())
                    },
                )
            }
        ) {
// Sau khi có quyền truy cập thì chúng ta sẽ tiến hành chọn file            
pickFileFromStorage(
                onSuccess = { uri, fileSize ->
// Ở đây chúng ta đã có uri của file, còn fileSize là tùy chọn (tùy theo yêu cầu mà chúng ta có thể trả về tương ứng)
                }, onError = {
// Nếu xảy ra lỗi thì hiển thị thông báo chẳng hạn.
                }
            )
        }
    }
```
> Lib hỗ trợ việc yêu cầu user cấp quyền mình đang dùng tại [đây]( https://mvnrepository.com/artifact/org.permissionsdispatcher/permissionsdispatcher-ktx), các bạn có thể sử dụng các lib khác thay thế tùy ý nhưng phải đảm bảo có quyền truy cập bộ nhớ từ user.
* Để có thể đi đến Setting của hệ thống, chúng ta có thể viết một hàm như sau:
```kotlin
fun gotoPermissionSetting(context: Context?) {
    val intent = Intent()
    intent.action = Settings.ACTION_APPLICATION_DETAILS_SETTINGS
    val uri = Uri.fromParts("package", context?.packageName, null)
    intent.data = uri
    context?.startActivity(intent)
}
```
* Sau khi có quyền truy cập thì tiếp theo chúng ta sẽ tiến hành chọn file muốn upload, hàm có thể được viết như sau:
```kotlin
fun Fragment.pickFileFromStorage(onSuccess: (Uri, String) -> Unit, onError: ((Int) -> Unit)? = null) {
    registerForActivityResult(GetFileContentByTypeContract()) {
        it?.let { uri ->
            when (getMimeType(this.requireContext(), it)?.toLowerCase(Locale.getDefault())) {
            "jpg", "jpeg", "png" -> {
// Giả sử chúng ta chỉ hỗ trợ 3 địng dạng hình ảnh
// Giả sử chúng ta muốn lấy fileSize để hiển thị lên UI
                    val fileSize = uri.getFileSize(requireContext())
                    when {
                        fileSize <= 0L -> {
                        onError?.invoke(ERROR_FILE_UNKNOWN)
                        }
// Giả sử chúng ta chỉ chấp nhận file từ 100MB trở xuống.
                        getFileSizeInMbUnit(fileSize) > 100 -> {
                            onError?.invoke(ERROR_FILE_MAX_SIZE)
                        }
                        else -> {
                            onSuccess(uri, getReadableSize(fileSize))
                        }
                    }
                }
                else -> {
                    onError?.invoke(ERROR_FILE_NOT_ALLOW)
                }
            }
        }
    }.launch(arrayOf("image/png", "image/jpg", "image/jpeg"))
}
```
* Class GetFileContentByTypeContract sẽ như sau:
```kotlin
class GetFileContentByTypeContract : ActivityResultContract<Array<String>, Uri?>() {
    override fun createIntent(context: Context, input: Array<String>?): Intent {
        return Intent(Intent.ACTION_OPEN_DOCUMENT)
            .addCategory(Intent.CATEGORY_OPENABLE)
            .putExtra(Intent.EXTRA_MIME_TYPES, input)
            .setType("image/*") 
    }

    override fun parseResult(resultCode: Int, intent: Intent?): Uri? {
        return if (intent == null || resultCode != Activity.RESULT_OK) null
        else intent.data
    }
}
```
* Hàm lấy Mime Type (hiểu đơn giản là lấy đuôi file):
```kotlin
fun getMimeType(context: Context, uri: Uri): String? {
        return if (uri.scheme == ContentResolver.SCHEME_CONTENT) {
            MimeTypeMap.getSingleton().getExtensionFromMimeType(context.contentResolver.getType(uri))
        } else{
            MimeTypeMap.getFileExtensionFromUrl(Uri.fromFile(File(uri.path!!)).toString())
        }
    }
```
* Hàm lấy kích thước của file thông qua URI:
```kotlin
fun Uri.getFileSize(context: Context?): Long {
    if (context == null) return -1L
    val contentResolver = context.contentResolver
// Chúng ta sẽ ưu tiên lấy kích thước tổng của file.
    val length = contentResolver.openFileDescriptor(this, "r")?.use { it.statSize } ?: -1L

    if (length != -1L) {
        return length
    } else {
// Trường hợp lấy kích thước tổng có vấn đề thì chúng ta mới sử dụng cách này.
// Tuy nhiên với những file lớn thì sẽ có sai số về kích thước nhận được.
// Các bạn có thể tham khảo thêm tại:
// https://stackoverflow.com/questions/48302972/content-resolver-returns-wrong-size
        if (scheme.equals(ContentResolver.SCHEME_CONTENT)) {
            return contentResolver.query(this, arrayOf(OpenableColumns.SIZE), null, null, null)
                ?.use { cursor ->
                    val sizeIndex = cursor.getColumnIndex(OpenableColumns.SIZE)
                    if (sizeIndex == -1) {
                        return@use -1L
                    }
                    cursor.moveToFirst()
                    return try {
                        cursor.getLong(sizeIndex)
                    } catch (throwable: Throwable) {
                        -1L
                    }
                } ?: -1L
        } else {
            return -1L
        }
    }
}
```
* Để quy đổi kích thước thước file ra đơn vị MB chúng ta có thể dùng hàm sau:
```kotlin
fun getFileSizeInMbUnit(size: Long): Double {
        return size / getByteLengthInDouble().pow(2.0)
    }
```
* Ở đây có một chỗ mà chúng ta cần lưu ý khi thao tác với kích thước file đó là từ [Android 26 (O)](https://developer.android.com/reference/android/text/format/Formatter#formatFileSize(android.content.Context,%20long)) trở đi thì đơn vị quy đổi kích thước file sẽ là 1000 (ví dụ 1KB = 1000B) và dưới O thì sẽ là 1024 (ví dụ 1KB = 1024B). Vậy nên sẽ có 1 hàm quy đổi như sau:
```kotlin
private fun getByteLengthInDouble(): Double {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) 1000.0
        else 1024.0
    }
```
* Để chuyển đổi kích thước file sang String cho thân thiện với user thì chúng ta có thể dùng hàm:
```kotlin
fun getReadableSize(size: Long): String {
        if (size <= 0) return "0"
        val units = arrayOf("B", "KB", "MB", "GB", "TB")
        val digitGroups = (log10(size.toDouble()) / log10(getByteLengthInDouble())).toInt()
        return DecimalFormat("#,##0.#").format(size / getByteLengthInDouble().pow(digitGroups.toDouble()))
            .toString() + units[digitGroups]
    }
```
###  b. Chụp hình
* Để sử dụng camera của device để chụp hình thì chúng ta cũng sẽ yêu cầu quyền truy cập camera từ user:
```kotlin
private fun takePhoto() {
        withPermissionsCheck(
            Manifest.permission.CAMERA,
            onShowRationale = ::onShowRationale,
            onNeverAskAgain = {
                showConfirmationDialog(
// Nội dung hiển thị của dialog (giống như khi chọn file)
                    positiveButtonEvent = {
                        gotoPermissionSetting(activity)
                    },
                    dialogStyle = R.style.BluishButtonDialogStyle
                )
            }
        ) {
            takeAPicViaCamera(
                onSuccess = { photoUri, fileSize ->
// Lấy URI thành công!
                },
                onError = {
// Xử lý hiển thị lỗi chẳng hạn.
                }
            )
        }
    }
```
* Hàm xử lý việc chụp hình và trả về kết quả như sau:
```kotlin
fun Fragment.takeAPicViaCamera(
    onSuccess: (Uri, String) -> Unit,
    onError: ((Int) -> Unit)? = null,
    onCancel: (() -> Unit)? = null
) {
    val context = context ?: return
    val photoFile: File = try {
        FileUtils.createImageFile(context)
    } catch (ex: IOException) {
        onError?.invoke(ERROR_FILE_UNKNOWN)
        return
    }
// Tiếp tục nếu tạo file thành công
    photoFile.also {
        val photoURI = try {
            FileProvider.getUriForFile(context, FileUtils.APP_FILE_PROVIDER, it)
        } catch (e: Exception) {
            if (photoFile.exists()) {
                photoFile.delete()
            }
            onError?.invoke(ERROR_FILE_UNKNOWN)
            return
        }
        registerForActivityResult(ActivityResultContracts.TakePicture()) { isSuccess ->
            if (isSuccess) {
                val fileSize = photoURI.getFileSize(requireContext())
                when {
                    fileSize <= 0L -> {
                        if (photoFile.exists()) {
                            photoFile.delete()
                        }
                        onError?.invoke(ERROR_FILE_UNKNOWN)
                    }
                    getFileSizeInMbUnit(fileSize) > 100 -> {
                        if (photoFile.exists()) {
                            photoFile.delete()
                        }
                        onError?.invoke(ERROR_FILE_MAX_SIZE)
                    }
                    else -> {
                        onSuccess(photoURI, getReadableSize(fileSize))
                    }
                }
            } else {
                if (photoFile.exists()) {
                    photoFile.delete()
                }
                onCancel?.invoke()
            }
        }.launch(photoURI)
    }
}
```
* Khi chụp hình từ camera thì chúng ta cần có 1 file tạm để lưu lại và từ file tạm này chúng ta mới có thể lấy URI. Hàm tạo file có thể viết như sau:
```kotlin
@Throws(IOException::class)
    fun createImageFile(context: Context): File {
// Tạo tên file
        val timeStamp: String = “demo_image_”.plus(System.currentTimeMillis())
        val storageDir: File? = context.getExternalFilesDir(Environment.DIRECTORY_PICTURES)
        return File.createTempFile(
            timeStamp, /* prefix */
            ".jpg", /* suffix */
            storageDir /* directory */
        )
    }
```
> File được tạo ra sẽ nằm trong thư riêng của app (~/app_package/files/Pictures). Nếu trong quá trình lấy URI xảy ra lỗi thì chúng ta nên chú ý xóa file tạm vừa được tạo ra để tránh sinh file rác.
### c. Tạo RequestBody từ URI
* Để có thể tạo Request từ URI thành công thì chúng ta cần 3 thành phần chính: **InputStream**, **MIME type** và **contentLength**. 
* Với InputStream thì chúng ta có thể mở một stream bằng URI như sau:
```kotlin
val inputFileStream = try {
        context.contentResolver.openInputStream(this)
    } catch (e: Exception) {
        null
    }
```
* Với MIME type thì sẽ được lấy bằng cách sử dụng ContentResolver:
```kotlin
val contentType = try {
        context.contentResolver.getType(this)?.toMediaTypeOrNull()
    } catch (e: Exception) {
        null
    }
```
* Còn contentLength chính là kích thước file lấy từ URI:
```kotlin
val contentLength = this.getFileSize(context)
```
* Khi có đủ 3 thành phần trên, chúng ta sẽ tiến hành tạo RequestBody như sau:
```kotlin
@Throws(IOException::class)
fun Uri.asRequestBody(context: Context): RequestBody? {
    val inputFileStream = try {
        context.contentResolver.openInputStream(this)
    } catch (e: Exception) {
        null
    }
    val contentType = try {
        context.contentResolver.getType(this)?.toMediaTypeOrNull()
    } catch (e: Exception) {
        null
    }
    return if (inputFileStream == null || contentType == null) null
    else {
        val contentLength = this.getFileSize(context)
        object : RequestBody() {
            override fun contentType(): MediaType {
                return contentType
            }

            override fun contentLength(): Long {
                return contentLength
            }

            override fun writeTo(sink: BufferedSink) {
// Stream từ URI sẽ được ghi vào một BufferedSink để phục vụ cho việc upload.
// Khi sử dụng block function “use” thì chúng ta không cần quan tâm đến việc close stream sau khi hoàn tất.
                inputFileStream.source().use { sink.writeAll(it) }
            }
        }
    }
}
```
* Sau khi có được RequestBody thì công việc còn lại chỉ là đem RequestBody này đưa vào API ở Bước 2 để thực hiện việc upload!
### d. Khắc phục lỗi thường gặp
* Nếu các bạn làm theo các Bước ở trên nhưng khi chạy upload lại xảy ra lỗi “Stream Closed” ( ` HTTP FAILED: java.io.IOException: unexpected end of stream` ) thì thường sẽ có các nguyên nhân chính như sau:
1. Hãy kiểm tra xem trong việc cấu hình API, các bạn có đang sử dụng HttpLoggingInterceptor.Level.BODY hay không? Nếu có thì hãy chuyển qua HttpLoggingInterceptor.Level.NONE hoặc HttpLoggingInterceptor.Level.BASIC. Nguyên nhân là do HttpLoggingInterceptor.Level.BODY sẽ sử dụng lại hàm contentLength() của Stream, mà lúc này Stream đã bị đóng nên sẽ xảy ra exception.
2. Việc lấy kích thước file đang có vấn đề. Bạn hãy xem lại chỗ xử lý lấy contentLength nhé.
3. MIME type không được server chấp nhận. Điều này thường xảy ra khi bạn upload video. Hãy tham khảo xem server mà bạn đang dùng có thể hỗ trợ những MIME type nào để map lại cho đúng.

# III. Kết
*  Mình xin được kết thúc bài viết tại đây và hy vọng với các nội dung ở trên sẽ giúp ích cho các bạn trong quá trình hoàn thiện chức năng upload file bằng Retrofit với URI trên Android.
*  Các bạn có câu hỏi hay góp ý thì cứ thoải mái comment cho mình nhé!