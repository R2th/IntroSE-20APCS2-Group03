Ở phần bài trước, tôi đã giới thiệu về [Android Interface Definition Language (AIDL)](https://viblo.asia/p/android-interface-definition-language-aidl-gAm5ympA5db) cho mọi người. AIDL là một trong những sự lựa chọn tốt cho việc chia sẻ dữ liệu giữa các ứng dụng với nhau. Hôm nay tôi sẽ giới thiệu tiếp tới mọi người một sự lựa chọn khác nữa, đó là NFC. NFC là viết tắt của **Near-Field Communications** - chuẩn kết nối không dây trong phạm vi tầm ngắn. Công nghệ này hoạt động dựa trên cảm ứng từ trường để kết nối các thiết bị có hỗ trợ NFC được đặt gần nhau (dưới 4 cm) hoặc tiếp xúc với nhau. Tuy nhiên thông thường để tăng hiệu quả kết nối, người ta thường để các thiết bị tiếp xúc trực tiếp với nhau.
Bên dưới sẽ là hướng dẫn cụ thể để sử dụng NFC cho việc chia sẻ file.

## 1. Điều kiện tiên quyết

Để sử dụng được NFC thì điều kiện tiên quyết đó là:
1. Android 4.1 (API 16) hoặc cao hơn
2. Ít nhất có 2 thiết bị hỗ trợ NFC (chú ý: NFC không support trên emulator)

## 2. Gửi file đến device khác thông qua NFC

Android cho phép chuyển các file lớn giữa các thiết bị bằng tính năng truyền file **Android Beam**. Tính năng này có một API đơn giản và cho phép người dùng bắt đầu quá trình chuyển chỉ bằng cách chạm vào thiết bị. Đáp lại, truyền file **Android Beam** tự động sao chép tệp từ thiết bị này sang thiết bị khác và thông báo cho người dùng khi quá trình hoàn tất. Android Beam chỉ là một trong những tính năng có sẵn trong NFC framework. Để tìm hiểu thêm về NFC framework, hãy tìm hiểu thêm[ ở đây](https://developer.android.com/guide/topics/connectivity/nfc).

Bài học này hướng dẫn bạn cách làm để ứng dụng gửi các file lớn đến một thiết bị khác bằng cách sử dụng tính năng truyền file **Android Beam**. Để gửi file, cần yêu cầu 2 quyền: **NFC** và **READ_EXTERNAL_STORAGE**, kiểm tra để đảm bảo thiết bị của bạn hỗ trợ NFC và cung cấp URI để truyền file Android Beam.

Tính năng truyền file Android Beam có các yêu cầu sau:

1. Chỉ khả dụng trong Android 4.1 (API 16) hoặc cao hơn như đã nói ở trên.
2. Các file bạn muốn chuyển phải nằm trong bộ nhớ ngoài.
3. Mỗi file bạn muốn chuyển phải không bị giới hạn quyền đọc. Bạn có thể gọi phương thức File.setReadable (true, false) để làm điều đó.
4. Phải cung cấp URI cho các file bạn muốn chuyển. Truyền file Android Beam không thể xử lý các URI được tạo bởi **FileProvider.getUriForFile**.


### 2.1 Khai báo trong manifest

Yêu cầu 2 quyền: **NFC** và **READ_EXTERNAL_STORAGE** phải được khai báo trong manifest:
```
<uses-permission android:name="android.permission.NFC" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

Chỉ định rằng ứng dụng của bạn sử dụng NFC bằng cách thêm đoạn sau vào manifest:
```
<uses-feature
    android:name="android.hardware.nfc"
    android:required="true" />
```

Lưu ý rằng nếu ứng dụng của bạn chỉ sử dụng NFC làm tùy chọn, nhưng vẫn hoạt động nếu không có NFC, bạn nên đặt android:required="false" và chỉ kiểm tra NFC trong trong code.

### 2.2 Test việc hỗ trợ truyền file Android Beam

Nếu đặt thuộc tính android:required="false", bạn phải kiểm tra hỗ trợ NFC và hỗ trợ truyền file Android Beam bằng code.
Để kiểm tra hỗ trợ truyền file Android Beam trong code, hãy xem thiết bị có hỗ trợ NFC hay không bằng cách gọi **PackageManager.hasSystemFeature(PackageManager.FEATURE_NFC)**. Tiếp theo, hãy kiểm tra xem phiên bản Android có hỗ trợ truyền tệp Android Beam hay không bằng cách kiểm tra giá trị của SDK_INT.
```
class MainActivity : Activity() {
    ...
    private lateinit var nfcAdapter: NfcAdapter
    // Flag to indicate that Android Beam is available
    private var androidBeamAvailable = false
    ...
    override fun onCreate(savedInstanceState: Bundle?) {
        ...
        androidBeamAvailable = if (!packageManager.hasSystemFeature(PackageManager.FEATURE_NFC)) {
            // NFC isn't available on the device
            /*
              * Disable NFC features here.
              * For example, disable menu items or buttons that activate
              * NFC-related features
              */
            false
        // Android Beam file transfer isn't supported
        } else if (Build.VERSION.SDK_INT < Build.VERSION_CODES.JELLY_BEAN_MR1) {
            // If Android Beam isn't available, don't continue.
            androidBeamAvailable = false
            /*
             * Disable Android Beam file transfer features here.
             */
            ...
            false
        } else {
            // Android Beam file transfer is available, continue
            nfcAdapter = NfcAdapter.getDefaultAdapter(this)
            ...
            true
        }
    }
    ...
}
```

### 2.3 Tạo callback cung cấp cho các file khi truyền tệp qua Android Beam

Trong callback này, trả về một mảng các đối tượng Uri là **fileUris**. Truyền file Android Beam sao chép các file được đại diện bởi fileUris sang thiết bị nhận.
Callback cần implement NfcAdapter.CreateBeamUrisCallback và override lại function **createBeamUris()**. Đoạn code dưới đây cho bạn biết cách thực hiện việc này:

```
class MainActivity : Activity() {
    ...
    private lateinit var nfcAdapter: NfcAdapter
    // Flag to indicate that Android Beam is available
    private var androidBeamAvailable = false
    // List of URIs to provide to Android Beam
    private val fileUris = mutableListOf<Uri>()
    
    override fun onCreate(savedInstanceState: Bundle?) {
        ...
        androidBeamAvailable = if (!packageManager.hasSystemFeature(PackageManager.FEATURE_NFC)) {
            // NFC isn't available on the device
            /*
              * Disable NFC features here.
              * For example, disable menu items or buttons that activate
              * NFC-related features
              */
            false
        // Android Beam file transfer isn't supported
        } else if (Build.VERSION.SDK_INT < Build.VERSION_CODES.JELLY_BEAN_MR1) {
            // If Android Beam isn't available, don't continue.
            androidBeamAvailable = false
            /*
             * Disable Android Beam file transfer features here.
             */
            ...
            false
        } else {
            // Android Beam file transfer is available, continue
            nfcAdapter = NfcAdapter.getDefaultAdapter(this).apply {
                /*
                 * Instantiate a new FileUriCallback to handle requests for
                 * URIs
                 */
                fileUriCallback = FileUriCallback()
                // Set the dynamic callback for URI requests.
                nfcAdapter.setBeamPushUrisCallback(fileUriCallback, this@MainActivity)
            }
            ...
            true
        }
    }
    ...
    
    
    /**
     * Callback that Android Beam file transfer calls to get
     * files to share
     */
    private inner class FileUriCallback : NfcAdapter.CreateBeamUrisCallback {
        /**
         * Create content URIs as needed to share with another device
         */
        override fun createBeamUris(event: NfcEvent): Array<Uri> {
            return fileUris.toTypedArray()
        }
    }
}
```

Lưu ý: Bạn cũng có thể cung cấp mảng đối tượng Uri trực tiếp cho NFC framework thông qua NfcAdapter của ứng dụng. Chọn cách tiếp cận này nếu bạn có thể xác định các URI để chuyển trước khi sự kiện chạm NFC xảy ra. Để tìm hiểu thêm về cách tiếp cận này, hãy xem thêm **NfcAdapter.setBeamPushUris()**.

### 2.4 Chỉ định các file để gửi

Để chuyển một hoặc nhiều file sang một thiết bị hỗ trợ NFC khác, cần thêm URI của mỗi file vào mảng **fileUris** đã khai báo như phần trên. Để chuyển file, bạn cũng phải có quyền đọc vĩnh viễn đối với file đó. Đoạn code sau cho cách lấy URI và thêm vào mảng:
```
        /*
         * Create a list of URIs, get a File,
         * and set its permissions
         */
        val fileUris = mutableListOf<Uri>()
        val transferFile = "transferimage.jpg"
        val extDir = getExternalFilesDir(null)
        val requestFile = File(extDir, transferFile).apply {
            setReadable(true, false)
        }
        // Get a URI for the File and add it to the list of URIs
        Uri.fromFile(requestFile)?.also { fileUri ->
            fileUris += fileUri
        } ?: Log.e("My Activity", "No File URI available for file.")
```

## 3. Nhận file từ device khác thông qua NFC

Truyền file Android Beam sao chép file vào một thư mục đặc biệt trên thiết bị nhận. Nó cũng quét các file đã sao chép bằng **Android Media Scanner** và thêm các mục mới vào MediaStore provider. Phần dưới sẽ hướng dẫn bạn cách phản hồi khi quá trình sao chép file hoàn tất và cách xác định vị trí file đã sao chép trên thiết bị nhận.

### 3.1 Phản hồi khi quá trình truyền file kết thúc
    
Khi quá trình truyền file Android Beam kết thúc việc sao chép file vào thiết bị nhận, thiết bị sẽ gửi một notification có intent với ACTION_VIEW, kiểu MIME của file đầu tiên được chuyển và URI trỏ đến file đầu tiên. Khi người dùng click vào notification đó, intent sẽ được gửi đi. Để ứng dụng của bạn phản hồi lại intent này, hãy thêm các phần như sau vào manifest:
```
    <activity
        android:name="com.example.android.nfctransfer.ViewActivity"
        android:label="Android Beam Viewer" >
        ...
        <intent-filter>
            <action android:name="android.intent.action.VIEW"/>
            <category android:name="android.intent.category.DEFAULT"/>
            ...
        </intent-filter>
    </activity>
```

Ngoài ra có thể chỉ định những kiểu mime type mà ứng dụng sẽ xử lý bằng cách thêm:
```
<data android: mimeType = "mime-type" />
```

### 3.2 Yêu cầu permission

Để đọc các file mà tệp Android Beam truyền bản sao vào thiết bị, phải yêu cầu quyền READ_EXTERNAL_STORAGE
```
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

> Lưu ý: Kể từ Android 10 (API 29), bạn không cần yêu cầu quyền READ_EXTERNAL_STORAGE để xem các tệp mà Android Beam đã chuyển vào thiết bị.

### 3.3 Lấy đường dẫn tới các file copy

Truyền file Android Beam sao chép tất cả các file trong một lần truyền vào một thư mục trên thiết bị nhận. Như đã nói ở trên, khi hoàn thành việc gửi file, thiết bị sẽ gửi một notification có intent với ACTION_VIEW, kiểu MIME của file đầu tiên được chuyển và URI trỏ đến file đầu tiên.  Có thể gọi **Uri.getScheme()** để xác định các thông tin cần thiết cho mình.
```
class MainActivity : Activity() {
    ...
    // A File object containing the path to the transferred files
    private var parentPath: File? = null
    ...
    /*
     * Called from onNewIntent() for a SINGLE_TOP Activity
     * or onCreate() for a new Activity. For onNewIntent(),
     * remember to call setIntent() to store the most
     * current Intent
     *
     */
    private fun handleViewIntent() {
        ...
        /*
         * For ACTION_VIEW, the Activity is being asked to display data.
         * Get the URI.
         */
        if (TextUtils.equals(intent.action, Intent.ACTION_VIEW)) {
            // Get the URI from the Intent
            intent.data?.also { beamUri ->
                /*
                 * Test for the type of URI, by getting its scheme value
                 */
                parentPath = when (beamUri.scheme) {
                    "file" -> handleFileUri(beamUri)
                    "content" -> handleContentUri(beamUri)
                    else -> null
                }
            }
        }
        ...
    }
    ...
}
```

Lấy đường dẫn file từ uri như bên dưới:
```
fun handleFileUri(beamUri: Uri): File? =
            // Get the path part of the URI
            beamUri.path.let { fileName ->
                // Create a File object for this filename
                File(fileName)
                        // Get the file's parent directory
                        .parentFile
            }
```


Với trường hợp còn lại, cần xác định xem bạn có thể truy xuất thư mục file từ content URI hay không. Xác định content provider được liên kết với URI bằng cách gọi **Uri.getAuthority()**, kết quả có hai giá trị có thể có:
* MediaStore.AUTHORITY: có thể lấy được đường dẫn file từ đây
* Gí trị khác: trường hợp này là uri từ một content provider khác không phải là truyền file Android Beam, không thể lấy được đường dẫn file.

```
    ...
    private fun handleContentUri(beamUri: Uri): File? =
            // Test the authority of the URI
            if (beamUri.authority != MediaStore.AUTHORITY) {
                /*
                 * Handle content URIs for other content providers
                 */
                ...
            // For a MediaStore content URI
            } else {
                // Get the column that contains the file name
                val projection = arrayOf(MediaStore.MediaColumns.DATA)
                val pathCursor = contentResolver.query(beamUri, projection, null, null, null)
                // Check for a valid cursor
                if (pathCursor?.moveToFirst() == true) {
                    // Get the column index in the Cursor
                    pathCursor.getColumnIndex(MediaStore.MediaColumns.DATA).let { filenameIndex ->
                        // Get the full file name including path
                        pathCursor.getString(filenameIndex).let { fileName ->
                            // Create a File object for the filename
                            File(fileName)
                        }.parentFile // Return the parent directory of the file
                    }
                } else {
                    // The query didn't work; return null
                    null
                }
            }
    ...
```

Bài viết này đã trình bày cho các bạn cách để truyền nhận file thông qua NFC. Cùng với AIDL và các cách làm khác mong rằng sẽ được các bạn vẫn dụng linh hoạt trong từng trường hợp khác nhau.
Tham khảo thêm tại đây:
 https://developer.android.com/training/beam-files
 https://developer.android.com/guide/topics/connectivity/nfc/nfc#p2p
 https://developer.android.com/guide/topics/connectivity/nfc