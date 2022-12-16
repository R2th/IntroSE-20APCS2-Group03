Chủ đề tưởng chừng quen nhưng để viết một `service get location` sao cho phù hợp với hầu hết `version android` hiện tại và yêu cầu của từng dự án thì cần thời gian và nhiều điều cần lưu ý. Trong bài viết này, mình chỉ chia sẻ những điểm cần lưu ý và 1 vài hướng sử dụng cơ bản cho một ứng dụng cần `update location` cả lúc chạy `foreground` và `background`. Phần tối ưu, coi như bài tập thêm.
## Context
Như mọi người đã biết, từ `android O (API 26)`, `background app` bị giới hạn việc có thể nhận `location` của người dùng. Ứng dụng có thể nhận `location update` chỉ 1 vài lần trong mỗi giờ.
  
> Việc `limit` này apply cho tất cả các ứng dụng chạy trên `android O` hoặc cao hơn, bất kể việc bạn có set `targetSDK version` bao nhiêu đi nữa.

Hành vi truy xuất vị trí này đặc biệt quan trọng cần ghi nhớ nếu ứng dụng của bạn có cảnh báo thời gian thực (`real-time alerts`, như chỉ đường...) hoặc phát hiện chuyển động (`motion detection`, như tính khoảng cách đi bộ...) trong khi chạy trong *background*.

Ứng dụng *android* phân biệt rõ ràng giữa *foreground* và *background*. Sẵn đây, mình xin điểm lại 1 chút về điều kiện để là một ứng dụng *foreground*:

- Ứng dụng có 1 *activity* đang *visible*, bất kể *activity* đang `started` hoặc `paused`.
- Ứng dụng có 1 `foreground service`
- Mội ứng dụng *foreground*  khác *connect* đến 1 ứng dụng, bất kể là *bind* đến 1 trong những *service* của nó hoặc sử dụng một trong các `content provider` của nó. Ví dụ, một ứng dụng *forground* *bind* bất cứ một *component* nào của một ứng dụng khác, thì lúc đó ứng dụng khác đó sẽ được coi là *foreground*:
    - *Input method editor*
    - *Wallpaper service*
    - *Notification listener*
    - *Voice or text service*

Phần còn lại sẽ được hệ thống xem là ứng dụng *background*.

Với những ứng dụng *foreground* thì việc *update location* hoàn toàn giống như trên `android 7.1.1 (API 25)` trở xuống.

Để *optimize* việc *get location* thường xuyên, liên tục, thì ứng dụng của bạn cần thực hiện 1 trong các hành động sau:

- Ứng dụng bạn chạy *foreground*
- Tạo một *foreground service*, và đi kèm là 1 *ongoing notification* để thông báo cho *user*.
- Sử dụng Geofencing API, optimize cho việc sử dụng pin 
- Sử dụng `passive location listener` (lắng nghe vị trí thụ động), nghĩa là có thể nhận được *location* nhanh hơn nếu có các ứng dụng *foreground* đang yêu cầu cập nhật *location* với tốc độ nhanh hơn (so với ứng dụng của mình).

## Idea
1. Tạo 1 [bound service](https://developer.android.com/guide/components/bound-services), khi ứng dụng đang ở *foreground*, việc *update location* được cho phép.
2. Khi *activity* cuối cùng không còn *visible* với người dùng (*foreground* sang *background*), *bound* *service* sẽ tự đổi thành một *foreground service* (kèm với 1 *ongoing notification*) và tiếp tục *update location*.
3. Khi *activity* trở lại *foreground*, *foreground service* và *ongoing notification* bị *remove*, trở lại thành *bound service* như trước.

## Start
### Permissions cần thiết

```xml
    <!-- Required for all versions if need precise location --> 
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <!-- Required for background location services on Q+ (10) -->
    <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
   <!-- Required for foreground services on P+ (9), this is normal permission -->
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
```
Trong 3 *permission* trên, 2 *permission* trên là *dangerous permission*, bạn cần *request runtime* từ *android M+*, cái *FOREGROUND_SERVICE* là *normal permission* nên không cần *request* lúc *runtime*, nhưng nó cần nếu bạn muốn ứng dụng chạy tốt trên *android* P+ .

Ngoài ra, khai báo *location foreground service* cần `foregroundServiceType="location"` nếu bạn *support android* `Q+`.
```xml
<!-- Foreground services in Q+ require foregroundServiceType -->
<service
            android:name=".location.MyLocationService"
            android:foregroundServiceType="location" />
```

P/S: Mình sẽ bỏ qua phần *request runtime permission* nhé.
### Implement Service
```java
class MyLocationService : Service() {
    private val serviceBinder = LocalBinder()
    /**
     * Class dùng cho client Binder. Vì service của mình chạy cùng process với app
     * nên mình chưa sử dụng IPC ở đây.
     */
    inner class LocalBinder : Binder() {
        internal val service: MyLocationService by lazy {
            this@MyLocationService
        }
    }
    
    override fun onBind(intent: Intent): IBinder {
        // Call khi một client đang ở foreground và binds vào service.
        // Service bây giờ không cần là một foreground service nữa.
        stopForeground(true)
        return serviceBinder
    }

    override fun onRebind(intent: Intent) {
        // Call khi một client trở lại foreground và binds vào service.
        // Service bây giờ không cần là một foreground service nữa.
        stopForeground(true)
        super.onRebind(intent)
    }

    override fun onUnbind(intent: Intent): Boolean {
        // Call khi client cuối cùng unbinds khỏi service.
        // Chúng ta biến service này thành foreground service.
        if (requestingLocationUpdates()) { // chỉ khi ứng dụng cần background location.
            startForeground(NOTIFICATION_ID, notification)
        }
        return true // True để đảm bảo onRebind() được gọi khi một client re-binds.
    }
}
```
Về cơ bản ý tưởng việc chuyển đổi qua lại giữa *bound service* và *foreground service* chỉ có vậy :D.

Tiếp tục với *ongoing notification* nào 
```java
private val notification: Notification
  get() {
    val intent = Intent(this, MyLocationService::class.java)
    intent.putExtra(EXTRA_STARTED_FROM_NOTIFICATION, true)
    val servicePendingIntent = PendingIntent.getService(
        this, 0, intent,
        PendingIntent.FLAG_UPDATE_CURRENT
    )
    
    val activityPendingIntent = PendingIntent.getActivity(
        this, 1,
        Intent(this, MainActivity::class.java), 0
    )
    // lưu ý là request code (0, 1...) nên khác nhau cho các loại notification khác (nếu cùng mở 1 activity),
    return NotificationCompat.Builder(this, CHANNEL_ID)
        .addAction(R.mipmap.ic_launcher, "Start Activity", activityPendingIntent)
        .addAction(R.drawable.ic_close, "Stop service", servicePendingIntent)
        .setOngoing(true)
         // Set những thứ cần thiết khác nhé :D
         // Note thêm là Notification channel cần cho android O+
        .build()
}
```
Ở đây mình cần *focus* vào 1 vài điểm cần lưu ý:

- `EXTRA_STARTED_FROM_NOTIFICATION`: phần *extras* này cần để trong `onStartCommand` mình phân biệt nó đến từ *notification* hay không.
- `servicePendingIntent`: là *PendingIntent* gọi *onStartCommand* từ *service*
- `activityPendingIntent`: là *PendingIntent* để *start Activity* 

```java
override fun onStartCommand(intent: Intent, flags: Int, startId: Int): Int {
    val startedFromNotification = intent.getBooleanExtra(
        EXTRA_STARTED_FROM_NOTIFICATION, false
    )

    // Chúng ta nhận được extras này khi user không muốn nhận location update nữa (click ở notificaiton)
    if (startedFromNotification) {
        removeLocationUpdates()
        stopSelf()
    }

    // Flag này để báo hệ thống không cần re-create service khi nó bị kill.
    return START_NOT_STICKY
}
```

OK, đa số chúng ta đã hoàn thành, chỉ còn việc tạo các *location request và remove update location* khi không còn dùng.
```java
override fun onCreate() {
    fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
    locationCallback = object : LocationCallback() {
        override fun onLocationResult(locationResult: LocationResult) {
            super.onLocationResult(locationResult)
            onNewLocation(locationResult.lastLocation)
        }
    }
    locationRequest = LocationRequest().apply {
         // Khoảng interval mong muốn update location, giá trị tương đối.
         // khoảng thời gian có thể sớm hoặc trễ hơn
        interval = UPDATE_INTERVAL_IN_MILLISECONDS
        // Tốc độ nhanh nhất để cập nhật vị trí.
        // Cập nhật sẽ không bao giờ thường xuyên hơn giá trị này.
        fastestInterval = FASTEST_UPDATE_INTERVAL_IN_MILLISECONDS
        priority = LocationRequest.PRIORITY_HIGH_ACCURACY
    }
    getLastLocation()
    ...
}
private fun getLastLocation() {
  try {
        fusedLocationClient.lastLocation.addOnCompleteListener { task ->
            if (task.isSuccessful && task.result != null) {
                latestLocation = task.result
            }
   } catch (unlikely: SecurityException) {
        Log.e(TAG, "Lost location permission. ${unlikely}")
   }
}
private fun onNewLocation(location: Location) {
    // Ở đây bạn có thể bắn một `LocalBroadcast` chưa location đến nơi bạn cần nhận (Activity, fragment...)
}
```

> Lưu ý ở bước `try...catch` trong `getLastLocation` vì user có thể hủy các permission đã cấp trước đó :D

Và cuối cùng, nhớ *expose* 2 cái *functions* để bên ngoài *client (activity, fragment...)* có thể chủ động việc *request* hoặc *stop update location* .
```java
    fun requestLocationUpdates() {
        startService(Intent(applicationContext, MyLocationService::class.java))
        try {
            fusedLocationClient.requestLocationUpdates(
                locationRequest,
                locationCallback,
                Looper.myLooper()
            )
        } catch (unlikely: SecurityException) {
            Log.e(TAG, "Lost location permission. Could not request updates. $unlikely")
        }
    }
    fun removeLocationUpdates() {
        try {
            fusedLocationClient.removeLocationUpdates(locationCallback)
            stopSelf()
        } catch (unlikely: SecurityException) {
            Log.e(TAG, "Lost location permission. Could not remove updates. $unlikely")
        }
    }
````

### Implement trong Activity
Cần tạo 1 `ServiceConnection`, *bind* và *unbind location service* đúng thời điểm.

```java
private var locationService: MyLocationService? = null
private var isLocationServiceBound = false
private val serviceConnection = object : ServiceConnection {
    override fun onServiceDisconnected(name: ComponentName?) {
        // locationService?.removeLocationUpdates()
        locationService = null
        isLocationServiceBound = false
    }

    override fun onServiceConnected(name: ComponentName?, service: IBinder?) {
        val binder = service as? MyLocationService.LocalBinder
        locationService = binder?.service
        isLocationServiceBound = true
        // locationService?.requestLocationUpdates()
    }
}
override fun onStart() {
    super.onStart()
    if (permissionsGranted()) {
        bindService(Intent(this, MyLocationService::class.java), serviceConnection, Context.BIND_AUTO_CREATE)
    } else {
         requestPermissions()
    }
}

override fun onStop() {
    if (isLocationServiceBound) {
        unbindService(serviceConnection)
        isLocationServiceBound = false
    }
    super.onStop()
}
```
Một lưu ý với *version android O+*
>  Từ *android O+*, bạn cần gọi function `startForeground` trong vòng 5 giây kể từ thời điểm *service* `created`.

Do đó, việc gọi `startForeground` trong `onUnbind` có thể không hoạt động trên *android O+*. bạn cần 1 cách khác để làm điều này, gọi `startForegroundService`.

```java
override fun onStop() {
    if (isLocationServiceBound) {
        unbindService(serviceConnection)
        isLocationServiceBound = false
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && shouldStartLocationService()) {
            // From android O+, we need to startForeground within 5 seconds from the time it's created
            // So, we can not do that, we need restart the service
            stopLocationService()
            startForegroundService(Intent(this, MyLocationService::class.java))
         }
    }
    super.onStop()
}
```
Ngoài ra, bạn nhớ update `onUnbind` nhé,
```java
    override fun onUnbind(intent: Intent): Boolean {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O &&requestingLocationUpdates()) {
            startForeground(NOTIFICATION_ID, notification) // this may not work on android O+ with above limit (5 seconds)
        }
        return true
    }
```

**HAPPY CODING**

**References**:
- https://developer.android.com/training/location/retrieve-current
- https://github.com/android/location-samples