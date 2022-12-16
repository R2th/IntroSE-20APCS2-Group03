Ngày nay smartphone đã gắn liền với mọi hoạt động trong công việc cũng như vui chơi, sinh hoạt hằng ngày của con người. Chúng ta ngày càng có xu thế dùng smartphone nhiều hơn và lâu hơn. Vì vậy một app mobile tốt dường như cần có thêm yếu tố tương tác thực tế với người dùng. Các bạn nghĩ sao nếu ta đang đi bộ tham quan trên phố, ứng dụng di động sẽ tự nhận biết và đề xuất ra những khu vui chơi hoặc ăn uống ngay gần bạn. Điều đó thật tuyệt phải không?

Bài viết này mình sẽ đi cụ thể vào nền tảng Android với 1 tính năng rất thú vị là Recognition.
![](https://images.viblo.asia/89cb1d88-d9c5-4093-abdb-a58deeedf973.jpg)

# Activity Recognition Transition (ART)
Thông thường để khám phá ra hành động của user, chúng ta chắc chắn phải theo dõi và liên kết với các cảm biến của device. Từ các thông tin thu thập được, dùng một số thuật toán nào đó như ML để phân tích, từ đó phán đoán ra user đang tương tác như nào với device phải không? Bài viết này chúng ta sẽ không đi viết thuật toán đâu nhé :D Tất cả những việc trên đều được support bởi **Activity Recognotion Transition Api**

API này sẽ làm nhiệm vụ phân tích hành động của user sau đó trả về 1 danh sách các hành động mà user "có thể" đang thực hiện. 

Dưới đây là 1 số hành động được support từ API:
* IN_VEHICLE: Thiết bị đang được dùng trên phương tiện giao thông như ô tô
* ON_BICYCLE: Thiết bị dùng trên xe đạp
* ON_FOOT: Thiết bị được user dùng khi đang đi bộ hoặc chạy
* RUNNING: Action này là case cụ thể của ON_FOOT, khi user đang chạy
*  WALKING: Tương tự trên thì đây là action đi bộ
* STILL: Thiết bị không được di chuyển
* UNKNOWN: Không phát hiện ra action của user

# Implementation
## Thêm dependencies và permissions
ART yêu cầu có Google Play Service, thêm vào build.gradle depen sau:

```
implementation 'com.google.android.gms:play-services-location:16.0.0'
```

Khai báo quyền 
```
<uses-permission android:name="com.google.android.gms.permission.ACTIVITY_RECOGNITION" />
```

## Đăng kí activity transaction update 
Để nhận được thông báo về user activity, chúng ta cần thực hiện:
1.  **Tạo danh sách các action mong muốn theo dõi**
```
val transitions = mutableListOf<ActivityTransition>()

transitions += 
                    ActivityTransition.Builder()
                    .setActivityType(DetectedActivity.IN_VEHICLE)
                    .setActivityTransition(ActivityTransition.ACTIVITY_TRANSITION_ENTER)
                    
transitions += 
                    ActivityTransition.Builder()
                    .setActivityType(DetectedActivity.WALKING)
                    .setActivityTransition(ActivityTransition.ACTIVITY_TRANSITION_EXIT)
```

Ở trên chúng ta đang đăng kí theo dõi cho 2 action là đi xe và đi bộ. Ngoài ra còn các action khác cũng có thể lấy qua class **DetectedActivity**

Ngoài ra chúng ta thấy có **setActivityTransition**. Đây chính là các flag chỉ ra thông tin của transition. Như ở trên chúng ta lắng nghe user bắt đầu đi xe và kết thúc đi bộ.

2.  **Tạo ra request từ danh sách đó**
Sau khi đã có danh sách action mong muốn, tạo ra request với class **ActivityTransitionRequest**
```
val request = ActivityTransitionRequest(transitions)
```

Với tham số chính là danh sách action mà ta tạo ở bước 1

3.  **Thực hiện request tới ActivityRecognition**
```
val task = ActivityRecognition.getClient(context)
                  .requestActivityTransitionUpdates(request, pendingIntent)
                  
task.addOnSuccessListener {

}

task.addOnFailureListener { e: Exception ->

}
```

Chúng ta để ý thấy param pending intent. Đây chính là thế hiện của 1 PendingIntent định nghĩa nơi mà chúng ta sẽ nhận callback từ client activity recognition. Thông thường ta sẽ truyền 1 pendingIntent trỏ tới 1 class BroadcastReceiver.

Dữ liệu nhận được từ callback sẽ được xử lý trong Broadcast như sau:

```
override fun onReceive(context: Context, intent: Intent) {
    if (ActivityTransitionResult.hasResult(intent) {
        val result = ActivityTransitionResult.extractResult(intent)
        for (event in result.transitionEvents) {
            // xử lý các action nhận được
        }
    }
}
```

Trên đây là 1 số kiến thức cơ bản về ART, hy vọng mọi người thấy hữu ích. Cảm ơn các bạn đón đọc.