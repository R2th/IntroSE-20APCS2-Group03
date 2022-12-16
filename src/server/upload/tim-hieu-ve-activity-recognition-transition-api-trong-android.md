# Giới thiệu
Hôm nay tình cờ trong lúc lượn lờ trên mạng mình bắt gặp chủ đề khá hay muốn chia sẻ với các bạn đó là Activity Recognition Transition API trong Android. Đã bao giờ các bạn tự hỏi khi chúng ta sử dụng các ứng dụng sức khỏe như là khi chúng ta đi bộ thì ứng dụng sẽ tự động đếm bước chân hoặc khi chúng ta sử dụng Google Map để vẽ đường có thể hiển thị được quãng đường đó chúng ta đi bộ hay đi bằng các phương tiện khác như hình chưa :D 
![](https://images.viblo.asia/fc73ffe2-7fbf-4f3a-ac8c-b966f2422d93.png)

Đó chính xác là nó sử dụng các cảm biến của thiết bị để xác định đó các bạn. Vậy sử dụng các sensor như thế nào thì chúng ta cùng bắt đầu đi vào tìm hiểu nhé.
# Định nghĩa
1. Activity Recognition API là một giao diện định kỳ đánh thức thiết bị, đọc các cụm dữ liệu từ các cảm biến của thiết bị và sau đó phân tích dữ liệu này bằng các mô hình học máy mạnh mẽ.
2. API nhận dạng hoạt động trả về danh sách hoạt động mà người dùng có thể đang thực hiện, với thuộc tính tin cậy cho từng hoạt động. Thuộc tính tin cậy này luôn là số nguyên, nằm trong khoảng từ 0 đến 100. 
3. Nếu hoạt động được đi kèm với thuộc tính tự tin 75% trở lên thì an toàn để giả định rằng người dùng đang thực hiện hoạt động này và điều chỉnh hành vi của ứng dụng cho phù hợp.

# Cài đặt
Lý thuyết như vậy là đủ rồi :) chúng ta cùng bắt tay vào để cài đặt nào :D 

1. Bước đầu tiên là setup library
Chúng ta implement trong file build.gradle của app dòng sau 

```java
implementation 'com.google.android.gms:play-services-location:15.0.1'
```

Bên file build.gradle của project ta thêm dòng 
```java
 repositories {
        jcenter()
        google()
    }
```
  Và cuối cùng chúng ta cấp quyền trong Manifest
  ```java
  <uses-permission android:name="com.google.android.gms.permission.ACTIVITY_RECOGNITION" />
  ```
  
 2. Thiết kế giao diện
 
 Chúng ta tạo 2 file xml. File đầu tiên dùng cho từng item mà chúng ta detect được từ sensor, file thứ 2 là giao diện chung của ứng dụng
>  detected_item
```java
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/constraintLayout"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/detected_activity_name"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:text="@string/still"
        app:layout_constraintStart_toStartOf="@+id/detected_activity_progress_bar"
        app:layout_constraintTop_toTopOf="parent"/>

    <TextView
        android:id="@+id/detected_activity_confidence_level"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="8dp"
        android:layout_marginEnd="8dp"
        android:layout_marginRight="8dp"
        app:layout_constraintBottom_toTopOf="@+id/detected_activity_progress_bar"
        app:layout_constraintEnd_toEndOf="parent"/>


    <ProgressBar
        android:id="@+id/detected_activity_progress_bar"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginTop="4dp"
        android:minHeight="@dimen/progress_bar_min_height"
        android:progress="1"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/detected_activity_name"
        style="@android:style/Widget.ProgressBar.Horizontal"/>
</android.support.constraint.ConstraintLayout>

```

> main_activity
```java
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:id="@+id/linearLayout"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:id="@+id/request_activity_updates_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="@dimen/dp_32"
        android:layout_marginLeft="@dimen/dp_8"
        android:layout_marginStart="@dimen/dp_8"
        android:layout_marginTop="@dimen/dp_16"
        android:onClick="requestActivityUpdatesButtonHandler"
        android:text="@string/request_activity_updates"
        app:layout_constraintBottom_toTopOf="@+id/detected_activities_title"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"/>

    <Button
        android:id="@+id/remove_activity_updates_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="@dimen/dp_8"
        android:layout_marginRight="@dimen/dp_8"
        android:layout_marginTop="@dimen/dp_16"
        android:onClick="removeActivityUpdatesButtonHandler"
        android:text="@string/remove_activity_updates"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintTop_toTopOf="parent"/>


    <TextView
        android:id="@+id/detected_activities_title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="@dimen/dp_8"
        android:layout_marginLeft="@dimen/dp_8"
        android:layout_marginRight="@dimen/dp_8"
        android:layout_marginStart="@dimen/dp_8"
        android:layout_marginTop="@dimen/dp_16"
        android:text="@string/detected_activities_title"
        android:textSize="@dimen/headline_text_size"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/remove_activity_updates_button"/>

    <ListView
        android:id="@+id/detected_activities_listview"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:layout_marginBottom="@dimen/dp_8"
        android:layout_marginEnd="@dimen/dp_8"
        android:layout_marginLeft="@dimen/dp_8"
        android:layout_marginRight="@dimen/dp_8"
        android:layout_marginStart="@dimen/dp_8"
        android:layout_marginTop="@dimen/dp_16"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/detected_activities_title"/>
</android.support.constraint.ConstraintLayout>

```

3. Tạo Intent Service để lắng nghe sự thay đổi của thiết bị
Trong hàm onHandleIntent lấy các hoạt động có thể xảy ra liên quan đến tình trạng hiện tại của thiết bị. Mỗi hoạt động có một mức độ tin cậy là 1 số int có giá trị từ 0 đến 100
```java
 @Override
    protected void onHandleIntent(Intent intent) {
        ActivityRecognitionResult result = ActivityRecognitionResult.extractResult(intent);
        ArrayList<DetectedActivity> detectedActivities = (ArrayList) result.getProbableActivities();

        PreferenceManager.getDefaultSharedPreferences(this)
                .edit()
                .putString(Constants.KEY_DETECTED_ACTIVITIES,
                        Utils.detectedActivitiesToJson(detectedActivities))
                .apply();
            );
        }
    }
```
Đoạn code trên lấy dữ liệu trả về khi có sự thay đổi và chuyển đổi dữ liệu đó từ dạng JSON về Object
Và đừng quên khai bóa Service trong Manifest nhé ;) 
```java
 <service
            android:name=".DetectedActivitiesIntentService"
            android:exported="false" />
```

4. Tạo Adapter 
```java
private void updateActivities(ArrayList<DetectedActivity> detectedActivities) {

       //Tạo 1 HashMap để nhận dữ liệu trả về từ Intent Service
        HashMap<Integer, Integer> detectedActivitiesMap = new HashMap<>();
        for (DetectedActivity activity : detectedActivities) {
            detectedActivitiesMap.put(activity.getType(), activity.getConfidence());
        }
        
        //Add các item vào list để show lên giao diện
        ArrayList<DetectedActivity> tempList = new ArrayList<>();
        for (int i = 0; i < Constants.MONITORED_ACTIVITIES.length; i++) {
            int confidence = detectedActivitiesMap.containsKey(Constants.MONITORED_ACTIVITIES[i]) ?
                    detectedActivitiesMap.get(Constants.MONITORED_ACTIVITIES[i]) : 0;

            tempList.add(new DetectedActivity(Constants.MONITORED_ACTIVITIES[i],
                    confidence));
        }
        
        //Add xong thì xóa hết các item trong HashMap
        this.clear();
        
        //Thê dữ liệu sau khi có sự thay đổi
        for (DetectedActivity detectedActivity: tempList) {
            this.add(detectedActivity);
        }
    }
```

5. Main Activity

Khởi tạo Adapter trong Main và load dữ liệu 

```java
  ArrayList<DetectedActivity> detectedActivities = Utils.detectedActivitiesFromJson(
                PreferenceManager.getDefaultSharedPreferences(this).getString(
                        Constants.KEY_DETECTED_ACTIVITIES, ""));
for detected activities.
        mAdapter = new DetectedActivitiesAdapter(this, detectedActivities);
        detectedActivitiesListView.setAdapter(mAdapter);

        mActivityRecognitionClient = new ActivityRecognitionClient(this);
```

Handle sự kiện khi chúng ta click vào button để lắng nghe sự thay đổi và đăng ký sự kiện bằng ActivityRecognitionClient .requestActivityUpdates

```java

 public void requestActivityUpdatesButtonHandler(View view) {
        Task<Void> task = mActivityRecognitionClient.requestActivityUpdates(
                Constants.DETECTION_INTERVAL_IN_MILLISECONDS,
                getActivityDetectionPendingIntent());
//Khi thành công

        task.addOnSuccessListener(new OnSuccessListener<Void>() {
            @Override
            public void onSuccess(Void result) {
                Toast.makeText(mContext,
                        getString(R.string.activity_updates_enabled),
                        Toast.LENGTH_SHORT)
                        .show();
                setUpdatesRequestedState(true);
                updateDetectedActivitiesList();
            }
        });

//Khi bị thất bại

        task.addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception e) {
                Log.w(TAG, getString(R.string.activity_updates_not_enabled));
                Toast.makeText(mContext,
                        getString(R.string.activity_updates_not_enabled),
                        Toast.LENGTH_SHORT)
                        .show();
                setUpdatesRequestedState(false);
            }
        });
    }

```

Xử lý khi muốn ngắt lắng nghe

```java
 public void removeActivityUpdatesButtonHandler(View view) {
        Task<Void> task = mActivityRecognitionClient.removeActivityUpdates(
                getActivityDetectionPendingIntent());
                
        task.addOnSuccessListener(new OnSuccessListener<Void>() {
            @Override
            public void onSuccess(Void result) {
                Toast.makeText(mContext,
                        getString(R.string.activity_updates_removed),
                        Toast.LENGTH_SHORT)
                        .show();
                setUpdatesRequestedState(false);
                // Reset the display.
                mAdapter.updateActivities(new ArrayList<DetectedActivity>());
            }
        });

        task.addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception e) {
                Log.w(TAG, "Failed to enable activity recognition.");
                Toast.makeText(mContext, getString(R.string.activity_updates_not_removed),
                        Toast.LENGTH_SHORT).show();
                setUpdatesRequestedState(true);
            }
        });
    }
```

Get Pending Intent gửi thông báo đến khi có sự thay đổi

```java
 private PendingIntent getActivityDetectionPendingIntent() {
        Intent intent = new Intent(this, DetectedActivitiesIntentService.class);
        return PendingIntent.getService(this, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
    }
```

Cập nhật lại Adapter khi có sự thay đổi

```java
 protected void updateDetectedActivitiesList() {
        ArrayList<DetectedActivity> detectedActivities = Utils.detectedActivitiesFromJson(
                PreferenceManager.getDefaultSharedPreferences(mContext)
                        .getString(Constants.KEY_DETECTED_ACTIVITIES, ""));

        mAdapter.updateActivities(detectedActivities);
    }
```

6. Demo 

Khi mà chúng ta vừa vào app 

![](https://images.viblo.asia/abc5102d-2fad-47cb-94c7-65b319562f28.jpg)

Khi mà chúng ta click vào button nhận thông báo và kết quả :D 

![](https://images.viblo.asia/01457b39-1d20-4e1d-aed0-8e036a863b0d.jpg)

Tham khảo

https://codelabs.developers.google.com/codelabs/activity-recognition-transition/index.html?index=..%2F..%2Fio2018#0
https://developer.android.com/guide/topics/location/transitions