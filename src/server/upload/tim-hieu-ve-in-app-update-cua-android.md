# I. Mở đầu
* Trong quá trình phát triển app Android, đôi khi chúng ta cần phải phát hành các phiên bản cập nhật của ứng dụng để sửa lỗi, khắc phục các vấn đề nghiêm trọng… Chúng ta cần phải phát hành phiên bản mới lên Google Play Store và chờ đợi cập nhật từ phía user. Đây là một cách làm thủ công và khó có thể chắc chắn rằng user sẽ cập nhật app lên phiên bản mới nhất. Để khắc phục vấn đề hiện hữu này, tại Google IO May 2018, Google đã giới thiệu **In-App Update** của **Play Core library**.
* Trong bài viết này, chúng ta sẽ đi tìm hiểu phương thức mới này và nội dung của bài viết được mình tham khảo tại [đây](https://medium.com/google-developer-experts/exploring-in-app-updates-on-android-57f1aee011cb)
# II. Nội dung chính
### 1. Tổng quan
* Từ API 21 trở lên, **Play Core library** sẽ cho phép chúng ta sử dụng tính năng **In-App Update** - chúng ta sẽ hiển thị thông báo app cần được cập nhật trong quá trình sử dụng app của user. **Play Core library** cũng cấp 2 phương thức để thông báo ứng dụng cần cập nhật là **Flexible** và **Immediate**.

![](https://images.viblo.asia/24f7e0ee-b58f-4c38-bda7-99c66eaac876.png)

* **Flexibel** sẽ hiện thị dialog thông báo cho user và tiến hành tải bản cập nhật dưới background, điều này sẽ không làm gián đoạn quá trình sử dụng app của user. Đối với các bản cập nhật quan trọng thì chúng ta có thể dùng **Immediate** để bắt buộc user phải cập nhật để có thể tiếp tục sử dụng app.
### 2. Kiểm tra phiên bản cập nhật
* Chúng ta sẽ tiến hành kiểm tra sự tồn tại của phiên bản cập nhật mới từ Play Store.
```
val updateManager = AppUpdateManagerFactory.create(this)
updateManager.appUpdateInfo.addOnSuccessListener {
    if (it.updateAvailability() == UpdateAvailability.UPDATE_AVAILABLE &&
            it.isUpdateTypeAllowed(AppUpdateType.IMMEDIATE)) {
            ....
            }
    }
```
* Bằng cách tạo ra 1 instance của **AppUpdateManager**, chúng ta sẽ có các thông tin cần thiết của ứng dụng. Tiếp đó, chúng ta sẽ sử dụng **AppUpdateInfo** để có một tập các thông tin cần thiết để lựa chọn phương thức cập nhật phù hợp. Phương thức **availableVersionCode()** sẽ cung cấp thông tin phiên bản của bản cập nhật đang tồn tại. Bên cạnh đó, phương thức **updateAvailability()** sẽ trả về giá trị của trạng thái cập nhật.
```
- UNKNOWN
- UPDATE_AVAILABLE
- PDATE_IN_PROGRESS
- EVELOPER_TRIGGERED_UPDATE_IN_PROGRESS
```
* Chúng ta sẽ sử dụng giá trị của phương thức **isUpdateTypeAllowed()** và so sánh với giá trị **UPDATE_AVAILABLE** nhằm xác định chính xác sự tồn tại của bản cập nhật mới. Dựa vào kiểu giá trị của **AppUpdateType** (**IMMEDIATE** hay **FLEXIBLE**) chúng ta sẽ lựa chọn phương thức cập nhật tương ứng.
* Sau khi có các thông tin cần thiết, chúng ta sẽ tiến hành cập nhật bằng phương thức **sartUpdateFlowForResult()** của **AppUpdateManager** class với các giá trị đầu vào như sau:
```
- AppUpdateInfo instance.
- Giá trị tương ứng của AppUpdateType.
- Context của compoment tương ứng.
- Request code.
```
```
updateManager.startUpdateFlowForResult(appUpdateInfo, ppUpdateType.IMMEDIATE, this, REQUEST_CODE_UPDATE)
```
* Khi phương thức **startUpdateFlowForResult()** được gọi, thì phương thức **startActivityForResult()** cũng được khởi chạy và ứng dụng sẽ được tiến hành cập nhật. Trong một vài trường hợp user có thể hủy bỏ quá trình cập nhật hoặc bị lỗi thì trong phương thức **onActivityResult()** của activity/fragment chúng ta có thể lý với 2 request code là **ActivityResult.RESULT_CANCELLED** và **ActivityResult.RESULT_IN_APP_UPDATE_FAILED**.
```
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent) {
    if (requestCode === REQUEST_CODE_UPDATE) {
        if (requestCode != RESULT_OK) {
        ...
        }
    }
}
```
### 3. Immediate in-app updates
* Phương thức này sẽ ứng với giá trị **AppUpdateType.IMMEDIATE** và sẽ khóa UI đến khi nào user hoàn thành quá trình cập nhật app. Nếu user thoát app, thì quá trình này sẽ được tiếp tục dưới background. Tuy nhiên nếu user thoát app và vào lại app trong khi tiến trình cập nhật app đang diễn ra thì user sẽ phải tiếp tục chờ quá trình cập nhật app hòan tất.

![](https://images.viblo.asia/baf60a6c-17bd-43d1-b6f0-d009a91a7a90.png)

* Chúng ta cần kiểm tra trạng thái trả về của **updateAvailability()** có phải là **DEVELOPER_TRIGGERED_UPDATE_IN_PROGRESS** hay không, nếu đúng thì sẽ thì tiếp tục quá trình cập nhật. Giả sử chúng ta không xử lý trường hợp này, thì user sẽ tiếp tục sử dụng app mà không có bản cập nhật.
```
override fun onResume() {
    super.onResume()
    val updateManager = AppUpdateManagerFactory.create(this)
    updateManager.appUpdateInfo.addOnSuccessListener {
        if (it.updateAvailability() == UpdateAvailability.DEVELOPER_TRIGGERED_UPDATE_IN_PROGRESS){
            updateManager.startUpdateFlowForResult(it, IMMEDIATE, this, REQUEST_CODE_UPDATE)
        }
    }
}
```
* Với phương thức **Immediate**, chúng ta sẽ không cần làm thêm gì cả, app sẽ tự động khởi chạy sau khi cập nhật thành công.
### 4. Flexible in-app updates
* Có thể kích họat bằng giá trị **AppUpdateType.FLEXIBLE** và sẽ hiện thị pop-up để yêu cần xác nhận cập nhật dưới background trong quá trình sử dụng app của user.

![](https://images.viblo.asia/d624256a-51bb-4e86-bf1d-5b20abe1ae02.png)

* Chúng ta sẽ tiến hành cập nhật app như sau:
```
updateManager.startUpdateFlowForResult(appUpdateInfo, AppUpdateType.FLEXIBLE, this, REQUEST_CODE_UPDATE)
```
* Bởi vì mọi thứ đều diễn ra dưới background nên chúng ta cần có các phương thức để theo dõi quá trình cập nhật. Chúng ta sẽ sử dụng **InstallStateUpdatedListener** để nhận callback khi có sự thay đổi trong quá trình cài đặt.
* **installStatus()** sẽ trả về các giá trị **InstallStatus** tương ứng như sau:
```
- UNKNOWN
- REQUIRES_UI_INTENT
- PENDING
- DOWNLOADING
- DOWNLOADED
- INSTALLING
- INSTALLED
- FAILED
- CANCELLED
```
* **installErrorCode()** sẽ trả về các giá trị **InstallErrorCode** tương ứng như sau:
```
- NO_ERROR
- NO_ERROR_PARTIALLY_ALLOWED
- ERROR_UNKOWN
- ERROR_API_NOT_AVAILABLE
- ERROR_INVALID_REQUEST
- ERROR_INSTALL_UNAVAILABLE
- ERROR_INSTALL_NOT_ALLOWED
- ERROR_DOWNLOAD_NOT_PRESENT
- ERROR_INTERNAL_ERROR
```
* Tương ứng với mỗi giá trị trả về, chúng ta sẽ có những xử lý thích hợp. Khi đã có listener, chúng ta có thể đăng ký với **AppUpdateManager** với phương thức **registerListener()**. Khi đã hoàn tất cập nhật, chúng ta cần hành hủy bỏ listener bằng phương thức **unregisterListener()**
```
val updateManager = AppUpdateManagerFactory.create(this)
updateManager.registerListener(listener)
...
updateManager.unregisterListener(listener)
```
* Khi nhận được trạng thái là **DOWNLOADED** thì app sẽ được khởi động lại để tiến hành cài đặt bản cập nhật. Tiến trình này có thể được tiến hành thủ công bằng cách gọi phương thức **completeUpdate()** từ **AppUpdateManger** instance, khi được gọi, **Play Core library** sẽ hiện thị màn hình cài đặt và app sẽ được khởi động lại dưới background.
```
appUpdateManager.completeUpdate()
```
* Khi được gọi từ background, app sẽ tiếp tục được cập nhật nhưng không thể khởi chạy cho đến khi việc cập nhật hòan thành. Tuy nhiên, nếu tiến trình cập nhật diễn ra khi app đang ở foreground, tiếp đó user thoát ra và khởi chạy app thì chúng ta cần phải gọi phương thức **completeUpdate()** trong **onResume()** để hoàn tất quá trình cập nhật.
```
updateManager.appUpdateInfo.addOnSuccessListener {appUpdateInfo ->
    if (appUpdateInfo.installStatus() == InstallStatus.DOWNLOADED) {
        updateManager.completeUpdate()
    }
}
```
# III. Kết luận
* Hy vọng với những thông tin mình chia sẻ trong bài viết này sẽ giúp ích phần nào cho các bạn trong quá trình phát triển ứng dụng trên Android. Hẹn gặp lại trong các bài viết tiếp theo!