## Giới thiệu 
Chào mọi người 
Đối với các ứng dụng mobile thì tính năng force-update là một trong số tính năng sẽ phải có trong ứng dụng . Đây là tính năng bắt buộc user phải update app nếu muốn tiếp tục sử dụng app .

Và cách đơn giản nhất và được nhiều lập trình viên sử dụng nhất đó là quản lý version app trên server của mình và có 1 API check force update mỗi khi mởi app .
Hoặc nếu ứng dụng  không có bên server thì sẽ quản lý version app thông qua Firebase .Các bạn có thể xem thêm [tại đây ](https://medium.com/@sembozdemir/force-your-users-to-update-your-app-with-using-firebase-33f1e0bcec5a) 

Và như một điều tất yếu , nhận thấy được vấn đề đó thì tại[ Android Dev Summit 2019](https://developer.android.com/dev-summit/) năm nay Google đã giới thiệu feature In-app Updates API . Giúp lập trình viên không cần phải tạo ra API để quản lý update app nữa , mà sẽ quản lý thông qua API của Google 

Như Google giới thiệu thì sẽ có 2 kiểu update app  : **Flexible** và **Immediate**

 - Flexible update : Là kiểu thông báo ( như ảnh dưới ) cho ngừời dùng khi có version mới trên store .Với trường hợp này user thì không bắt buộc  phải update ứng dụng  .![](https://images.viblo.asia/646e7218-e4bc-4290-9575-0143dd3dc6f1.png)
 - Immediate update : Khác với Flexible , kiểu này bắt buộc user phải update app mới có thể tiếp tục sử dụng app . ![](https://images.viblo.asia/4d7e754b-b034-4d4b-8e41-237b0b1a8ecf.png)
 
 Tiếp theo là cách để implement vào ứng dụng 
 
 1) Check for update availability
 
    Sẽ sử dụng [AppUpdateManager](https://developer.android.com/reference/com/google/android/play/core/appupdate/AppUpdateManager.html) để check xem với version hiện tại usrer có cần update không 
    
   ```
// Creates instance of the manager.
val appUpdateManager = AppUpdateManagerFactory.create(context)

// Returns an intent object that you use to check for an update.
val appUpdateInfoTask = appUpdateManager.appUpdateInfo

// Checks that the platform will allow the specified type of update.
appUpdateInfoTask.addOnSuccessListener { appUpdateInfo ->
    if (appUpdateInfo.updateAvailability() == UpdateAvailability.UPDATE_AVAILABLE
        // For a flexible update, use AppUpdateType.FLEXIBLE
        && appUpdateInfo.isUpdateTypeAllowed(AppUpdateType.IMMEDIATE)
    ) {
        // Request the update.
    }
}
```
Trong `appUpdateInfo` sẽ có trạng thái update của ứng dụng . Hơn nữa nếu ứng dụng đang update , trong `appUpdateInfo` sẽ có cả thông tin trạng thái của tiến trình đang update 
Nếu kết quả kiểm tra ứng dụng nên/cần update ,  thì sẽ sang bước tiếp theo 

2) Start an update
  Sử dụng [AppUpdateManager.startUpdateFlowForResult()](https://developer.android.com/reference/com/google/android/play/core/appupdate/AppUpdateManager.html#startupdateflowforresult) để request tiến trình update . 
   Tuy nhiên, nên chú ý tần suất  request update để tránh gây phiền nhiễu và ức chế cho người dùng . Vì thế nên giới hạn request update trong ứng dụng chỉ những thay đổi quan trọng đối với chức năng của ứng dụng.
   Đây là code để request update 
```
   appUpdateManager.startUpdateFlowForResult(
    // Pass the intent that is returned by 'getAppUpdateInfo()'.
    appUpdateInfo,
    // Or 'AppUpdateType.FLEXIBLE' for flexible updates.
    AppUpdateType.IMMEDIATE,
    // The current activity making the update request.
    this,
    // Include a request code to later monitor this update request.
    MY_REQUEST_CODE)
```

Và kết quả sẽ được trả về trong callBack `onActivityResult() `  
```
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent) {
    if (requestCode == MY_REQUEST_CODE) {
        if (resultCode != RESULT_OK) {
            log("Update flow failed! Result code: $resultCode")
            // If the update is cancelled or fails,
            // you can request to start the update again.
        }
    }
}
```

Tuỳ thuộc vào mỗi kiểu update **flexible**/**immediate** thì sẽ có cách handle khác nhau 

 Với **flexible** 
 
  Khi  bắt đầu flexible update, một dialog  sẽ xuất hiện cho người dùng để yêu cầu sự đồng ý. Nếu người dùng đồng ý, quá trình tải xuống bắt đầu trong background và người dùng có thể tiếp tục tương tác với ứng dụng. Khi update ứng dụng xong sẽ có thông báo cho biết ứng dụng đã cập nhật thành công .
  
  Để theo dõi trạng thái của bản cập nhật đang diễn ra bằng cách đăng ký listener dứoi đây 
```
  // Create a listener to track request state updates.
val listener = { state ->
    // Show module progress, log state, or install the update.
}

// Before starting an update, register a listener for updates.
appUpdateManager.registerListener(listener)

// Start an update.

// When status updates are no longer needed, unregister the listener.
appUpdateManager.unregisterListener(listener)
```

 Với **immediate** 
 
 Khi  bắt đầu immediate update ,Google Play sẽ hiển thị tiến trình cập nhật trên giao diện  ứng dụng của người dùng trong toàn bộ thời gian cập nhật. Nếu trong quá trình cập nhật,  người dùng đóng hoặc terminates ứng dụng  bản cập nhật sẽ tiếp tục tải xuống và cài đặt trong background mà không cần xác nhận thêm của người dùng.
 
 Tuy nhiên sẽ có trường hợp việc update sẽ rơi vào trạng thái DEVELOPER_TRIGGERED_UPDATE_IN_PROGRESS 
 vì thế khi user mở lại app cần kiểm tra xem có bị trạng thái này hay không , nếu có cần phải xử lý tiếp tục câp nhật như  dưới đây 
 ```
 // Checks that the update is not stalled during 'onResume()'.
// However, you should execute this check at all entry points into the app.
override fun onResume() {
    super.onResume()

    appUpdateManager
        .appUpdateInfo
        .addOnSuccessListener { appUpdateInfo ->
            ...
            if (appUpdateInfo.updateAvailability()
                == UpdateAvailability.DEVELOPER_TRIGGERED_UPDATE_IN_PROGRESS
            ) {
                // If an in-app update is already running, resume the update.
                manager.startUpdateFlowForResult(
                    appUpdateInfo,
                    IMMEDIATE,
                    this,
                    MY_REQUEST_CODE
                );
            }
        }
}
```

### Tổng kết 

Trên đây mình đã giới thiệu In-app Updates API  trong android 
Theo mình thấy In-app Updates API  có một số ưu và khuyết điểm như sau 

 Ưu điểm : 
  + Việc update app sẽ do Google Play xử lý và được update ngay lập tức trên ứng dụng . Nếu dùng cách cũ ( như mình giới thiệu ở trên ) bắt buôc bạn phải điều hướng use đến app của mình trên store .
  
 Nhược điểm : 
  + Với API này yêu cầu Android 5.0 (API level 21) hoặc cao hơn  => vì thế sẽ khó khăn cho ứng dụng đang hỗ trợ android dứoi 5.0 
  +  Việc config với version nào của app thì sẽ forceUpdate thì hiện tại trên Doc của Google vẫn chưa hướng dẫn xem sẽ config như thế nào .Các bạn có thể xem thêm issue  này [tại đây   ](https://issuetracker.google.com/issues/133299031)
 + Khó khăn trong việc kiểm thử , để kiểm thử được phần này cần phải tạo ra bản beta trên store
 
 Trên đây là một số ý kiến của mình 
 
 Cảm ơn các bạn !
 
 Ref : https://developer.android.com/guide/app-bundle/in-app-updates