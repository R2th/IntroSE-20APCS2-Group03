Kể từ Android O, các background service và nhiều broadcast sẽ không hoạt động tốt. Vì vậy, nếu bạn muốn implement một task chạy ở background, bạn chỉ có vài lựa và một trong số chúng là WorkManager.

Đầu tiên, cần add một số dependencies.

Ở file project build.gradle:

```java
allprojects {
    repositories {
        google()
        jcenter()
    }
}
```

Ở file app build.gradle:
```java
dependencies {
    def work_version = 1.0.0

    // (Java only)
    implementation "android.arch.work:work-runtime:$work_version"

    // Kotlin + coroutines
    implementation "android.arch.work:work-runtime-ktx:$work_version"

    // optional - RxJava2 support
    implementation "android.arch.work:work-rxjava2:$work_version"
    // optional - Test helpers
    androidTestImplementation "android.arch.work:work-testing:$work_version"
  }
```

Hãy đến với 1 ví dụ đơn giản, làm 1 số công việc ở background ( download data, gửi vị trí hiện tại). 

```java
class LocationWorker(context: Context, workerParams: WorkerParameters) 
    : Worker(context, workerParams) {
    
    ...
    
    override fun doWork(): Result {
        
        val latitude = inputData.getDouble(KEY_LATITUDE, 40.1903484)
        val longitude = inputData.getDouble(KEY_LONGITUDE, 44.5148367)
        
        val sendDataService = SendDataService.getInstance()
        sendDataService.sendLocation(latitude, longitude)
            .addSuccessCallback {
                // do smth
            }
            .addFailureCallback {
                // do smth
            }

        return Result.success()
    }
}
```

Worker đã được tạo, giờ hãy xếp nó vào enqueue:
```java
fun createConstraints() = Constraints.Builder()
                        .setRequiredNetworkType(NetworkType.UNMETERED)  // if connected to WIFI
                                                                          // other values(NOT_REQUIRED, CONNECTED, NOT_ROAMING, METERED)
                        .setRequiresBatteryNotLow(true)                 // if the battery is not low
                        .setRequiresStorageNotLow(true)                 // if the storage is not low
                        .build()

fun createWorkRequest(data: Data) = PeriodicWorkRequestBuilder<LocationWorker>(12, TimeUnit.HOURS)  // setting period to 12 hours
                // set input data for the work
                .setInputData(data)                                                     
                .setConstraints(createConstraints())
                // setting a backoff on case the work needs to retry
                .setBackoffCriteria(BackoffPolicy.LINEAR, PeriodicWorkRequest.MIN_BACKOFF_MILLIS, TimeUnit.MILLISECONDS)
                .build()

fun startWork() {
    // set the input data, it is like a Bundle
    val work = createWorkRequest(Data.EMPTY)
    /* enqueue a work, ExistingPeriodicWorkPolicy.KEEP means that if this work already existits, it will be kept
    if the value is ExistingPeriodicWorkPolicy.REPLACE, then the work will be replaced */
    WorkManager.getInstance().enqueueUniquePeriodicWork("Smart work", ExistingPeriodicWorkPolicy.KEEP, work)
    
    // Observe the result od the work
    WorkManager.getInstance().getWorkInfoByIdLiveData(work.id)
        .observe(lifecycleOwner, Observer { workInfo ->
            if (workInfo != null && workInfo.state == WorkInfo.State.SUCCEEDED) {
                // FINISHED SUCCESSFULLY!
            }
        })
}
```

Chúng ta có thể thực hiện nhiều work cùng 1 lúc:

```java
fun chainWorks(filter1: Work, filter2: Work, compress: Work, upload: Work) {
  WorkManager.getInstance()
    // Run these works in parallel
    .beginWith(listOf(filter1, filter2))
    // Dependent work (only runs after all previous work in chain)
    .then(compress)
    .then(upload)
    // Don't forget to enqueue()
    .enqueue()
}
```

Hãy tìm hiểu kỹ hơn cách hoạt động của WorkManager:

![](https://images.viblo.asia/9c62f00c-5ddf-432e-930a-da1d7c5b82c9.jpeg)

Worker là implementation những gì chúng tôi muốn làm. Chúng ta cần mô tả công việc của mình trong phương thức doWork ().

WorkRequest lấy một Worker cùng một số arguments (ví dụ: Input data) và các Constraints (ví dụ: Network Connection).

WorkManager lấy WorkRequest và bắt đầu enqueue nó. WorkManager lưu work trong một Room database và chọn cách tốt nhất để schedule cho work. Sau đó, nó gọi doWork (). Kết quả được published  bằng LiveData

Nguồn: https://medium.com/@RobertLevonyan/android-workmanager-manage-periodic-tasks-c13fa7744ebd