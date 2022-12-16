# I> Dẫn nhập
* Đã bao giờ bạn nảy ra ý tưởng thiết kế một ứng dụng có khả năng thay đổi tính năng dựa trên các hoạt động khác nhau của người dùng? Để hiện thực ý tưởng này, chúng ta phải có những tính toán phức tạp dựa trên các thông số trả về từ các cảm biến để có thể nhận biết user đang có những hoạt động gì ngoài thực tế. Ứng dụng của chúng ta phải luôn luôn ghi nhận các thông tin và phân tích chúng, điều này sẽ dẫn đến các hạn chế về hiệu năng của máy và đặc biệt là thiết bị sẽ nhanh chóng cạn kiệt nguồn năng lượng.

* Nhằm đơn giản hóa vấn đề này, Google đã giới thiệu [Transition API](https://developers.google.com/location-context/activity-recognition/) giúp cho chúng ta có thể nhận biết các hoạt động của user. Chúng ta chỉ cần tích hợp API này và xử lý thông tin đầu ra khi cần thiết! Để hiểu rõ hơn, chúng ta sẽ cùng nhau đi vào nội dung chính của bài viết.

# II> Transition API
### 1> Cài đặt thư viện
* Để có thể sử dụng API, chúng ta phải khai báo ***com.google.android.gms.permission.ACTIVITYRECOGNITION*** permission trong file manifest.

```
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
         package="com.example.myapp">

   <uses-permission android:name="com.google.android.gms.permission.ACTIVITY_RECOGNITION" />
  ...
</manifest>
```

### 2> Đăng ký nhận thông tin đầu ra
* Để có thể nhận thông tin đầu ra từ API, chúng ta cần có [ActivityTransitionRequest object](https://developers.google.com/android/reference/com/google/android/gms/location/ActivityTransitionRequest) để định nghĩa các dạng hoạt động của user và [PendingIntent](https://developer.android.com/reference/android/app/PendingIntent.html) callback để nhận các notification.

* Để tạo ActivityTransitionRequest object, chúng ta cần tạo ra 1 list các [ActivityTransition](https://developers.google.com/android/reference/com/google/android/gms/location/ActivityTransition) object – thể hiện các dạng hoạt động mà chúng ta cần xác định. Mỗi ActivityTransition object sẽ chứa 2 loại thông tin:

1. Các dạng hoạt động của user dựa trên [DetectedActivity](https://developers.google.com/android/reference/com/google/android/gms/location/DetectedActivity) class bao gồm:

   - [IN_VEHICLE](https://developers.google.com/android/reference/com/google/android/gms/location/DetectedActivity.html#IN_VEHICLE)
   - [ON_BICYCLE](https://developers.google.com/android/reference/com/google/android/gms/location/DetectedActivity.html#ON_BICYCLE)
   - [RUNNING](https://developers.google.com/android/reference/com/google/android/gms/location/DetectedActivity.html#RUNNING)
   - [STILL](https://developers.google.com/android/reference/com/google/android/gms/location/DetectedActivity.html#STILL)
   - [WALKING](https://developers.google.com/android/reference/com/google/android/gms/location/DetectedActivity.html#WALKING)

2. Các kiểu chuyển tiếp dựa trên [ActivityTransition](https://developers.google.com/android/reference/com/google/android/gms/location/ActivityTransition) class bao gồm:

   - [ACTIVITY_TRANSITION_ENTER](https://developers.google.com/android/reference/com/google/android/gms/location/ActivityTransition#ACTIVITY_TRANSITION_ENTER) 
   - [ACTIVITY_TRANSITION_EXIT](https://developers.google.com/android/reference/com/google/android/gms/location/ActivityTransition#ACTIVITY_TRANSITION_EXIT)

```
private void setupActivityTransitions() {
        List<ActivityTransition> transitions = new ArrayList<>();
        transitions.add(
                new ActivityTransition.Builder()
                        .setActivityType(DetectedActivity.WALKING)
                        .setActivityTransition(ActivityTransition.ACTIVITY_TRANSITION_ENTER)
                        .build());
        transitions.add(
                new ActivityTransition.Builder()
                        .setActivityType(DetectedActivity.WALKING)
                        .setActivityTransition(ActivityTransition.ACTIVITY_TRANSITION_EXIT)
                        .build());
        transitions.add(
                new ActivityTransition.Builder()
                        .setActivityType(DetectedActivity.STILL)
                        .setActivityTransition(ActivityTransition.ACTIVITY_TRANSITION_ENTER)
                        .build());
        transitions.add(
                new ActivityTransition.Builder()
                        .setActivityType(DetectedActivity.STILL)
                        .setActivityTransition(ActivityTransition.ACTIVITY_TRANSITION_EXIT)
                        .build());
        ActivityTransitionRequest request = new ActivityTransitionRequest(transitions);

        // Register for Transitions Updates.
        Task<Void> task =
                ActivityRecognition.getClient(this)
                        .requestActivityTransitionUpdates(request, mPendingIntent);
        task.addOnSuccessListener(
                new OnSuccessListener<Void>() {
                    @Override
                    public void onSuccess(Void result) {
                        Log.i(TAG, "Transitions Api was successfully registered.");
                    }
                });
        task.addOnFailureListener(
                new OnFailureListener() {
                    @Override
                    public void onFailure(Exception e) {
                        Log.e(TAG, "Transitions Api could not be registered: " + e);
                    }
                });
    }
```

### 3> Xử lý sự kiện
* Khi có thông tin đầu ra, chúng ta sẽ nhận được một Intent và data của intent này sẽ có chứa dạng hoạt động mà user tạo nên. Chúng tạo ra một BroadcastReceiver để xử lý như sau:

```
public class TransitionsReceiver extends BroadcastReceiver {

        @Override
        public void onReceive(Context context, Intent intent) {
            // Handle the Activity Transition Response
            if (!TextUtils.equals(TRANSITIONS_RECEIVER_ACTION, intent.getAction())) {
                mLogFragment.getLogView()
                        .println("Received an unsupported action in TransitionsReceiver: action="
                                + intent.getAction());
                return;
            }
            if (ActivityTransitionResult.hasResult(intent)) {
                ActivityTransitionResult result = ActivityTransitionResult.extractResult(intent);
                for (ActivityTransitionEvent event : result.getTransitionEvents()) {
                    String activity = toActivityString(event.getActivityType());
                    String transitionType = toTransitionType(event.getTransitionType());
                    mLogFragment.getLogView()
                            .println("Transition: "
                                    + activity + " (" + transitionType + ")" + "   "
                                    + new SimpleDateFormat("HH:mm:ss", Locale.US)
                                    .format(new Date()));
                }
            }
        }
    }
```

### 4> Hủy liên kết nhận thông tin
* Khi không cần nhận các thông tin từ API, chúng ta sẽ hủy như sau:
```
@Override
    protected void onPause() {
        // Unregister the transitions:
        ActivityRecognition.getClient(this).removeActivityTransitionUpdates(mPendingIntent)
                .addOnSuccessListener(new OnSuccessListener<Void>() {
                    @Override
                    public void onSuccess(Void aVoid) {
                        Log.i(TAG, "Transitions successfully unregistered.");
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Log.e(TAG, "Transitions could not be unregistered: " + e);
                    }
                });

        super.onPause();
    }
```

# III> Phần kết
* Hy vọng với API này, các bạn có thể xây dụng cho mình những ứng dụng có độ tùy biến cao dựa vào các hoạt động thực tế của user.

* Các bạn có thể tham khảo thêm thông tin tại: 
  - https://developers.google.com
  - https://codelabs.developers.google.com