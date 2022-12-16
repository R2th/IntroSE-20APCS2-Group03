# Giới thiệu

Trong quá trình phát triển thì đôi khi chúng ta sẽ cần phải làm việc với runtime permission của Android 6.0 trở lên. Với những bạn lần đầu gặp thì sẽ phải đi tìm hiểu, điều này là tát nhiên rồi, còn những bạn đã từng làm phần này thì do tần suất gặp cũng không phải là nhiều nên nhiều khi chúng ta sẽ dễ bị quên và phải xem lại code cũ hoặc cũng phải tìm hiểu lại như mội người mới nếu bạn không có lưu lại một source code cũ đã chạy ngon. 

Các tài liệu về request runtime permission không khó nhưng nhiều case dễ khiến cho chúng ta xử lý bị thiếu, ví dụ case user nhấn **deny** hoặc user tick chọn **never ask again**

Hiện nay có một số lib có sẵn hỗ trợ cho request runtime permission như [easypermissions](https://github.com/googlesamples/easypermissions), [PermissionsDispatcher](https://github.com/permissions-dispatcher/PermissionsDispatcher), [RxPermissions](https://github.com/tbruyelle/RxPermissions), ... nhưng vẫn còn khá phức tạp và thiếu một số function tiện ích như mở app setting chẳng hạn.

Nên hôm nay mình muốn giới thiệu với các bạn thêm một cách request runtime permission ngắn gọn hơn bằng việc tối ưu và đơn giản hóa cách request runtime permission thông thường và lắng nghe các trường hợp cần xử lý theo callback. Cách này thì ngắn gọn hơn, các bạn có thể đọc hiểu source và custom lại nếu cần.

Giới thiệu vậy đủ rồi, giờ chúng ta cùng xem code nào:

Code có sử dụng 2 file sau nên các bạn có thể tham khảo để xem những chỗ chưa hiểu nhé.

- PermissionUtils.kt
https://github.com/dangquanuet/The-Movie-DB-Kotlin/blob/develop/app/src/main/java/com/example/moviedb/utils/PermissionUtils.kt

- PermissionFragment.kt
https://github.com/dangquanuet/The-Movie-DB-Kotlin/blob/develop/app/src/main/java/com/example/moviedb/ui/screen/permission/PermissionFragment.kt

# Code thôi

## Cách thông thường

Đầu tiên chúng ta cần biết cách request runtime permission thông thường sẽ như thế nào?

Ví dụ về request mutliple permissions:

```kotlin
fun requestMultiplePermissions() {
    if (shouldAskPermissions(permissions)) {
            // Permissions is not granted
            // Should we show an explanation?
            if (shouldShowRequestPermissionsRationale(permissions)) {
                // Show an explanation to the user *asynchronously* -- don't block
                // this thread waiting for the user's response! After the user
                // sees the explanation, try again to request permissions.
                AlertDialog.Builder(this)
                    .setMessage("Please allow permissions to use this feature")
                    .setPositiveButton("OK") { dialog, which ->
                        ActivityCompat.requestPermissions(
                            this, permissions,
                            Constants.REQUEST_CAMERA_READ_CONTACTS
                        )
                    }
                    .setNegativeButton("Cancel") { dialog, which ->

                    }
                    .create().show()
            } else {
                if (isFirstTimeAskingPermissions(permissions)) {
                    firstTimeAskingPermissions(permissions, false)

                    // No explanation needed, we can request permissions.
                    ActivityCompat.requestPermissions(
                        this, permissions,
                        Constants.REQUEST_CAMERA_READ_CONTACTS
                    )

                    // REQUEST_CAMERA_READ_CONTACTS is an app-defined int constant.
                    // The callback method gets the result of the request.
                } else {
                    //Permissions disabled by device policy or user denied permanently. Show proper error message
                    AlertDialog.Builder(this)
                        .setMessage(
                            "Permissions Disabled, Please allow permissions to use this feature"
                        )
                        .setPositiveButton("OK") { dialog, which ->
                            val intent = Intent()
                            intent.action = Settings.ACTION_APPLICATION_DETAILS_SETTINGS
                            val uri = Uri.fromParts("package", packageName, null)
                            intent.data = uri
                            startActivity(intent)
                        }
                        .setNegativeButton("Cancel") { dialog, which ->

                        }
                        .create().show()
                }
            }
        } else {
            // Permission has already been granted
        }
}

fun onRequestPermissionsResult(
        requestCode: Int, permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        when (requestCode) {
        // multiple permission
            multiplePermissionsCode -> {
                // If request is cancelled, the result arrays are empty.
                if (grantResults.size == multiplePermissions.size) {
                    // permission was granted, yay! Do the
                    // contacts-related task you need to do.
                    if (isPermissionsGranted(grantResults)) {
                        showToast("permissions granted")
                    } else {
                        // permission denied, boo! Disable the
                        // functionality that depends on this permission.
                        if (shouldShowRequestPermissionsRationale(multiplePermissions)) {
                            // permission denied
                            showToast("permission denied")
                        } else {
                            // permission disabled or never ask again
                            showToast("permission disabled")
                        }
                    }
                }
            }
    }
}
```

Các bạn lưu ý rằng đoạn code dưới đây đã đã được rút gọn một phần nhờ các hàm như `shouldAskPermissions(), shouldShowRequestPermissionsRationale(), isFirstTimeAskingPermissions(), firstTimeAskingPermissions(), isPermissionsGranted()`. Các hàm này được trích từ - PermissionUtils.kt https://github.com/dangquanuet/The-Movie-DB-Kotlin/blob/develop/app/src/main/java/com/example/moviedb/utils/PermissionUtils.kt

Vậy nếu mà chúng ta không tách hàm thì code nó sẽ còn dài như thế nào nữa nhỉ? 

Chính vì lí do đó nên mình nghĩ tại sao lại không refactor lại cho gọn và dễ dùng hơn, nào chúng ta cùng sang phần tiếp theo

## Rút gọn code về runtime permissions

### Rút gọn việc request

Chúng ta sẽ định nghĩa một callback khi request runtime permission như sau:

```kotlin
/**
 * Callback on various cases on checking permission
 *
 * 1.  Below M, runtime permission not needed. In that case onPermissionGranted() would be called.
 * If permission is already granted, onPermissionGranted() would be called.
 *
 * 2.  Equal and Above M, if the permission is being asked first time onNeedPermission() would be called.
 *
 * 3.  Equal and Above M, if the permission is previously asked but not granted, onPermissionPreviouslyDenied()
 * would be called.
 *
 * 4.  Equal and Above M, if the permission is disabled by device policy or the user checked "Never ask again"
 * check box on previous request permission, onPermissionDisabled() would be called.
 */
interface RequestPermissionListener {
    /**
     * Callback on permission previously denied
     * should show permission rationale and continue permission request
     */
    fun onPermissionRationaleShouldBeShown(requestPermission: () -> Unit)

    /**
     * Callback on permission "Never show again" checked and denied
     * should show message and open app setting
     */
    fun onPermissionPermanentlyDenied(openAppSetting: () -> Unit)

    /**
     * Callback on permission granted
     */
    fun onPermissionGranted()
}
```

Tiếp theo đó chúng ta sẽ refactor lại đoạn code request runtime permissions với callback như sau:

```kotlin
/**
 * request permissions in fragment
 */
fun <T : Fragment> T.requestPermissions(
    permissions: Array<String>,
    permissionRequestCode: Int,
    requestPermissionListener: RequestPermissionListener
) {
    val context = context ?: return

    // permissions is not granted
    if (context.shouldAskPermissions(permissions)) {
        // permissions denied previously
        if (shouldShowRequestPermissionsRationale(permissions)) {
            requestPermissionListener.onPermissionRationaleShouldBeShown {
                requestPermissions(permissions, permissionRequestCode)
            }
        } else {
            // Permission denied or first time requested
            if (context.isFirstTimeAskingPermissions(permissions)) {
                context.firstTimeAskingPermissions(permissions, false)
                // request permissions
                requestPermissions(permissions, permissionRequestCode)
            } else {
                // permission disabled
                // Handle the feature without permission or ask user to manually allow permission
                requestPermissionListener.onPermissionPermanentlyDenied {
                    context.openAppDetailSettings()
                }
            }
        }
    } else {
        // permission granted
        requestPermissionListener.onPermissionGranted()
    }
}
```

Và đoạn code request multiple permissions sẽ trở thành như sau:

```kotlin
    // multiple permissions
    private val multiplePermissions = arrayOf(
        Manifest.permission.ACCESS_FINE_LOCATION,
        Manifest.permission.CAMERA
    )
    private val multiplePermissionsCode = 2111

    /**
     * request multiple permissions with listener
     */
    private fun requestMultiplePermissionWithListener() {
        requestPermissions(
            multiplePermissions,
            multiplePermissionsCode,
            object : RequestPermissionListener {
                override fun onPermissionRationaleShouldBeShown(requestPermission: () -> Unit) {
                    DialogUtils.showMessage(
                        context = context,
                        message = "Please allow permissions to use this feature",
                        textPositive = "OK",
                        positiveListener = {
                            requestPermission.invoke()
                        },
                        textNegative = "Cancel"
                    )
                }

                override fun onPermissionPermanentlyDenied(openAppSetting: () -> Unit) {
                    DialogUtils.showMessage(
                        context = context,
                        message = "Permission Disabled, Please allow permissions to use this feature",
                        textPositive = "OK",
                        positiveListener = {
                            openAppSetting.invoke()
                        },
                        textNegative = "Cancel"
                    )
                }

                override fun onPermissionGranted() {
                    showToast("Granted, do work")
                }
            })
    }
```

Ngắn gọn và dễ hiểu hơn nhiều rồi phải không nào?

Ngoài ra các bạn để ý rằng trong `RequestPermissionListener` có 2 hàm là `requestPermission(), openAppSetting()`.

- `requestPermission()` để làm gì? Khi mà user đã nhấn deny permission trước đó thì chúng ta nên hiển thị lí do tại sao cần quyền này, sau đó mới request permission. Hàm này giúp chúng ta gọi nhanh đến request permission.
- `openAppSetting()` để làm gì? Khi mà user tick `never ask again` và nhấn deny permission thì để có được permission, chúng ta buộc phải chỉ cho user bật permission một cách thủ công là vào App detail => mở mục permisson và nhấn Enable. Hàm này sẽ giúp chúng ta mở app detail setting luôn.

### Rút gọn xử lý result

Với phần xử lý request result thì chúng ta cũng tạo một iinterface như sau:

```kotlin
/**
 * request permission result listener
 */
interface PermissionResultListener {
    /**
     * Callback on permission denied
     */
    fun onPermissionRationaleShouldBeShown()

    /**
     * Callback on permission "Never show again" checked and denied
     */
    fun onPermissionPermanentlyDenied()

    /**
     * Callback on permission granted
     */
    fun onPermissionGranted()
}
```

Tiếp theo chúng ta sẽ refactor lại đoạn xử lý request permisison result với callback như sau:

```kotlin
/**
 * handle request permission result with listener in fragment
 */
fun <T : Fragment> T.handleOnRequestPermissionResult(
    requestPermissionCode: Int,
    requestCode: Int,
    permissions: Array<out String>,
    grantResults: IntArray,
    permissionResultListener: PermissionResultListener
) {
    if (requestPermissionCode == requestCode) {
        if (isGrantedGrantResults(grantResults)) {
            // permission was granted, yay! Do the
            // contacts-related task you need to do.
            permissionResultListener.onPermissionGranted()
        } else {
            // permission denied, boo! Disable the
            // functionality that depends on this permission.
            if (shouldShowRequestPermissionsRationale(permissions)) {
                // permission denied
                permissionResultListener.onPermissionRationaleShouldBeShown()
            } else {
                // permission disabled or never ask again
                permissionResultListener.onPermissionPermanentlyDenied()
            }
        }
    }
}
```

Và đoạn code xử lý request permission result trong fragment sẽ trở thành như sau:

```kotlin
    override fun onRequestPermissionsResult(
        requestCode: Int, permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)

        // multiple permission
        handleOnRequestPermissionResult(
            multiplePermissionsCode,
            requestCode,
            permissions,
            grantResults,
            object : PermissionResultListener {
                override fun onPermissionRationaleShouldBeShown() {
                    showToast("permission denied")
                }

                override fun onPermissionPermanentlyDenied() {
                    showToast("permission permanently disabled")
                }

                override fun onPermissionGranted() {
                    showToast("permission granted")
                }
            }
        )
    }
```

CŨng ngắn gọn và dễ hiểu hơn nhiều rồi phải không nào?

### Kết hợp việc rút gọn request và xử lý result

Từ hai phần rút gọn trên chúng ta có thể thấy đoạn code request runtime permission mới như sau:

```kotlin
    // multiple permissions
    private val multiplePermissions = arrayOf(
        Manifest.permission.ACCESS_FINE_LOCATION,
        Manifest.permission.CAMERA
    )
    private val multiplePermissionsCode = 2111

    /**
     * request multiple permissions with listener
     */
    private fun requestMultiplePermissionWithListener() {
        requestPermissions(
            multiplePermissions,
            multiplePermissionsCode,
            object : RequestPermissionListener {
                override fun onPermissionRationaleShouldBeShown(requestPermission: () -> Unit) {
                    DialogUtils.showMessage(
                        context = context,
                        message = "Please allow permissions to use this feature",
                        textPositive = "OK",
                        positiveListener = {
                            requestPermission.invoke()
                        },
                        textNegative = "Cancel"
                    )
                }

                override fun onPermissionPermanentlyDenied(openAppSetting: () -> Unit) {
                    DialogUtils.showMessage(
                        context = context,
                        message = "Permission Disabled, Please allow permissions to use this feature",
                        textPositive = "OK",
                        positiveListener = {
                            openAppSetting.invoke()
                        },
                        textNegative = "Cancel"
                    )
                }

                override fun onPermissionGranted() {
                    showToast("Granted, do work")
                }
            })
    }

    override fun onRequestPermissionsResult(
        requestCode: Int, permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)

        // multiple permission
        handleOnRequestPermissionResult(
            multiplePermissionsCode,
            requestCode,
            permissions,
            grantResults,
            object : PermissionResultListener {
                override fun onPermissionRationaleShouldBeShown() {
                    showToast("permission denied")
                }

                override fun onPermissionPermanentlyDenied() {
                    showToast("permission permanently disabled")
                }

                override fun onPermissionGranted() {
                    showToast("permission granted")
                }
            }
        )
    }
```

Các bạn tham khảo thêm tại:

- PermissionUtils.kt
https://github.com/dangquanuet/The-Movie-DB-Kotlin/blob/develop/app/src/main/java/com/example/moviedb/utils/PermissionUtils.kt

- PermissionFragment.kt
https://github.com/dangquanuet/The-Movie-DB-Kotlin/blob/develop/app/src/main/java/com/example/moviedb/ui/screen/permission/PermissionFragment.kt

Lưu ý đây là một cách trong rất nhiều cách, bạn có thể chọn cách nào mà bạn thấy phù hợp với mình.

Cảm ơn các bạn đã theo dõi và hẹn gặp lại trong các bài viết tới. À đừng quên :heavy_plus_sign::one: nếu thấy có ích nhé.