Trong bài viết này, chúng ta sẽ nói về mô-đun tính năng động cho phép chúng ta tách các tính năng và tài nguyên nhất định khỏi mô-đun cơ sở của ứng dụng và đưa chúng vào gói ứng dụng. Thông qua dynamic delivery, người dùng sau đó có thể tải xuống và cài đặt các tính năng sau khi họ đã cài đặt APK cơ bản của ứng dụng.

Để hiểu chi tiết điều này, chúng tôi sẽ xem xét ứng dụng nhạc chuông cơ bản trong đó người dùng có thể phát và đặt nhạc chuông trên điện thoại của họ:

![](https://cdn-images-1.medium.com/max/800/1*afTQMgnq9LJ436ZpcipXLQ.png)

Có một nút fab "About" trong hình ảnh đầu tiên mà chúng tôi thấy hiếm khi được người dùng sử dụng. Vì vậy, thay vì cung cấp tính năng này với base APK, chúng ta sẽ tạo một dynamic feature module riêng biệt trong code cơ sở , nơi sẽ có code chỉ dành cho Giới thiệu. Đối với điều này ,trước tiên ta sẽ thêm một "dynamic feature module":

![](https://cdn-images-1.medium.com/max/800/1*u3ybq2sMUdT7XdomhA06BQ.png)

Ở bước cuối cùng của quy trình này, hãy kiểm tra cả hai “Enable on-demand” and “Fusing”. 
Fusing dành cho các thiết bị trước Lollipop không hỗ trợ dynamic feature module, mô-đun "About"  sẽ được cài đặt và tải xuống với base APK:

![](https://cdn-images-1.medium.com/max/800/1*R8J4UVuJNVgy-6xOTZV6yg.png)

Sau đó, chúng ta có thể thấy bên dưới chúng ta có mô-đun riêng được thêm vào trong dự án. có một build.gradle khác cũng như manifest file.
![](https://cdn-images-1.medium.com/max/800/1*YCqDW-_zudsQkwzcN-ODwQ.png)

Và đừng quên thiết lập mối quan hệ với base module:
```
// In the base module’s build.gradle file.
android {
    ...
    // Specifies dynamic feature modules that have a dependency on
    // this base module.
    dynamicFeatures = [":dynamicFeature"]
}
```

```

// In the dynamic feature module’s build.gradle file:
...
dependencies {
    ...
    // Declares a dependency on the base module, ':app'.
    implementation project(':app')
}
```

Bây giờ, đã đến lúc để xem code tải xuống và cài đặt module About. Ta sẽ xử lý chức năng này trong onclick của nút About:
```
mFabButton!!.setOnClickListener {
            // Creates a request to install a module.
            var request: SplitInstallRequest =
                    SplitInstallRequest
                            .newBuilder()
                            // You can download multiple on demand modules per
                            // request by invoking the following method for each
                            // module you want to install.
                            .addModule("dynamicFeature")
                            .build()

            // Skip loading if the module already is installed. Perform success action directly.
            if (manager.installedModules.contains("dynamicFeature")) {
                //updateProgressMessage("Already installed")
                onSuccessfulLoad("dynamicFeature", launch = true)
            }

            manager.startInstall(request)
}
```
Và trong onCreate () của MainActivity của tính năng cơ bản:
```
// initialize SplitInstallManager.
manager = SplitInstallManagerFactory.create(this)
SplitCompat.install(this)
```
Chúng tôi cần phải có một listener khi yêu cầu cài đặt tính năng About về trong đoạn code đầu tiên:
```
** Listener used to handle changes in state for install requests. */
    private val listener = SplitInstallStateUpdatedListener { state ->
        val multiInstall = state.moduleNames().size > 1
        state.moduleNames().forEach { name ->
            // Handle changes in state.
            when (state.status()) {
                SplitInstallSessionStatus.DOWNLOADING -> {
                    //  In order to see this, the application has to be uploaded to the Play Store.
                    //displayLoadingState(state, "Downloading $name")
                    Toast.makeText(this,"downloading",Toast.LENGTH_SHORT).show()
                }
                SplitInstallSessionStatus.REQUIRES_USER_CONFIRMATION -> {
                    /*
                      This may occur when attempting to download a sufficiently large module.
                      In order to see this, the application has to be uploaded to the Play Store.
                      Then features can be requested until the confirmation path is triggered.
                     */
                    //startIntentSender(state.resolutionIntent()?.intentSender, null, 0, 0, 0)
                }
                SplitInstallSessionStatus.INSTALLED -> {
                    Toast.makeText(this,"installed",Toast.LENGTH_SHORT).show()
                    onSuccessfulLoad(name, launch = !multiInstall)
                }

                SplitInstallSessionStatus.INSTALLING ->
                    Toast.makeText(this,"installing..",Toast.LENGTH_SHORT).show()

                SplitInstallSessionStatus.FAILED -> {
                    //toastAndLog("Error: ${state.errorCode()} for module ${state.moduleNames()}")
                    Toast.makeText(this,"failed",Toast.LENGTH_SHORT).show()

                }
            }
        }
    }
```
Nhưng chờ đã, chúng tôi đã bỏ lỡ một tên phương thức onSuccessfulLoad (), hãy thêm implementation này:

```
private fun onSuccessfulLoad(moduleName: String, launch: Boolean) {
        if (launch) {
            Toast.makeText(this,"Onsuccessfulload",Toast.LENGTH_SHORT).show()

            var intent1 = Intent(this, Class.forName("com.example.dynamicfeature.MainActivity"))
            startActivity(intent1)
        }        
}
```

Điều này sẽ khởi chạy tính năng MainActivity của tính năng Giới thiệu về chúng tôi. Lần đầu tiên có thể mất một chút thời gian để khởi chạy vì tải xuống theo yêu cầu nhưng sau đó, nó sẽ hoạt động như một cơ duyên.

Lợi ích đáng kể của mô-đun tính năng động này là nó làm giảm kích thước của ứng dụng vì chúng tôi đang cung cấp các tính năng bổ sung theo yêu cầu.

Và, điểm quan trọng cần lưu ý là chúng tôi sẽ tải lên gói ứng dụng (.aab) thay vì .apk cho giao hàng này.

Nguồn : https://medium.com/mindorks/dynamic-feature-module-using-android-app-bundle-d5b163aaf91d