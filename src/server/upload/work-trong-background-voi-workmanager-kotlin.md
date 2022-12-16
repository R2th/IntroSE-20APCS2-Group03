Có nhiều lựa chọn trên Android cho những work trong background. Trong bài viết này chúng ta sẽ tìm hiểu về WorkManager [WorkManager](https://developer.android.com/arch/work), một thư viện có khả năng tương thích linh động và đơn giản. WorkManager hiện tại đang trong bản beta.

### WorkManager là gì ?
WorkManager là một phần trong [Android Jetpack](http://d.android.com/jetpack) và là một [Architecture Component](http://d.android.com/arch) cho những work trong background mà cần sự kết hợp và đảm bảo việc thực thi.  Đảm bảo việc thực thi có nghĩa rằng WorkManager sẽ làm những Work trong  background của bạn ngay khi nó có thể. 
WorkManager là thực sự đơn giản và nhưng là một library cực kỳ linh động, nó bổ sung nhiều tiện ích. Những tiện ích này bao gồm:
* Hỗ trợ cho cả những task không đồng bộ (asynchronous) and những task được thực thi theo định kỳ ( periodic tasks)
* Hỗ trợ cho những rằng buộc (constraints) hay nó cách khác là những điều kiện thực thi như điều kiện về network, về không gian lưu trữ( storage space), về trạng thái thiết bị đang được sạc pin (charging status)
* Liên kết chuỗi các work request phức tạp, bao gồm việc chạy các Work song song.
* Đữ liệu đầu ra (out put) từ một work request đã được sử dụng như  dữ liệu đầu vào (input) cho một work request tiếp theo
* Khả năng tương thích với các API level 14
* Hỗ trọ LiveData để dễ dàng hiển thị trạng thái của work request trong UI

### WorkManager sử dụng khi nào?
Thư viện WorkManager là một sự lựa chọn tốt cho những task rất hữu ích để hoàn thành, thậ trí khi user chuyển hướng ra xa từ một màn hình cụ thể hoặc ứng dụng của bạn.
Một vài ví dụ điển hình khi sử dụng WorkManager: 
*  Việc Upload logs
*  Áp dụng việc filter Image và lưu trữ image đó
*  Đồng bộ dữ liệu định kỳ giữa local data với network.

### Những gì bạn sẽ làm
Trong bài viết này bạn sẽ xây dựng một app nho nhỏ với những chức năng như là chọn một photo từ trong Gallery App sau đó làm mờ photo đó rồi lưu kết quả tới một file.
(Các bạn có thể download đầy đủ source code tại phần cuối của bài viết)
như screenshot bên dưới: 

![](https://images.viblo.asia/0b4086c0-eb80-4b7f-9195-edd148c2a45d.png)

![](https://images.viblo.asia/3bc54b22-93e8-4cea-bbff-3a34844549c7.png)

Khi bạn run app bạn sẽ nhìn thấy những màn hình bên dưới( đảm bảo rằng ứng dụng đã có được những permissions để truy cập được photos trong device của bạn)
![](https://images.viblo.asia/8daea7dc-a8cf-4a51-bc21-940d4d30f2c2.png)

![](https://images.viblo.asia/37745742-00f1-4b42-a0bf-cd94e32ebe97.png)

Bạn có thể select một image và có được một màn hình tiếp theo. Cái radio button là nơi bạn có thể lựa chọn level làm mờ image mà bạn đã chọn. Click button **Go** sẽ làm mờ image và lưu nó.
Trong source code sẽ bao gồm những class bên dưới: 
*  *WorkerUtils*: class này sẽ chứa code cho việc làm mờ image và một vài phương thức tiện ích khác, những phương thức đó bạn sẽ sử dụng sau để hiển thị Notifications và làm chậm app.
*  *BlurActivity* : Activity này hiển thị image bạn đã chọn và bao gồm các radio button cho việc lựa chọn level làm mờ image
* *BlurViewModel* : View model này sẽ lưu trữ tất cả data cần thiết và để hiển thị trong BlurActivity. Nó ngoài ra cũng là 1 class nơi bạn bắt đầu thực thiện các work trong background bằng việc sử dụng WorkManager
*  *Constants*: đây là một static class với một vài constant bạn sẽ sử dụng trong app
*  *SelectImageActicity*: đây là activity đầu tiên, nơi cho phép bạn select một image
*  *res/activity_blur.xml và res/activity_select.xml* : là file layout cho mỗi activity
Ngoài ra còn một vài class bạn sẽ write code trong đó.

**Add WorkManager tới app**

WorkManager yêu cầu config gradle nhưng bên dưới:
*app/build.gradle*

```java
dependencies {
    implementation "android.arch.work:work-runtime-ktx:$versions.work"
}
```

Bạn nên có được version mới nhất của work-runtime [tại đây](http://d.android.com/topic/libraries/architecture/adding-components#workmanager)
*build.gradle*

```java 
versions.work = '1.0.0-beta03'
```

**Làm WorkRequest đầu tiên**
Trong bứơc này, bạn sẽ lấy một image trong res/drawable được gọi là test.jpg và chạy một vài function trên nó trong background. Những functions này sẽ làm mờ image và save nó tới một file tạm.
*Những class bạn cần biết trong WorkManager*
* [Worker](https://developer.android.com/reference/androidx/work/Worker.html): đây là nơi bạn đặt code cho việc thực hiện task bạn muốn trong background. Bạn sẽ extend class này và override phương thức [doWork()](https://developer.android.com/reference/androidx/work/Worker.html#doWork()).
* [WorkRequest](https://developer.android.com/reference/androidx/work/WorkRequest.html): trình bày một request để làm một vài work. Bạn sẽ gửi vào trong Worker như là một phần của việc tạo WorkRequest của bạn. Khi tạo WorkRequest , ngoài ra bạn cũng có thể xác định những thứ như [Constraints](https://developer.android.com/reference/androidx/work/Constraints.html) khi Worker chạy.
* [WorkManager](https://developer.android.com/reference/androidx/work/WorkManager.html): class này thực sự lên schedules WorkRequest của bạn và chạy nó. 

Bây giờ bạn sẽ định nghĩa một class mới gọi là BlurWorker, cái sẽ chứa code để làm mờ image. Khi button Go được click, một WorkRequest là được tạo và sao đó được enqueue bởi WorkManager.
Trong package Workers, tạo một class mới được gọi là BlurWorker.

```java
class BlurWorker(ctx: Context, params: WorkerParameters) : Worker(ctx, params) {
}
```

Sau đó override và thực hiện doWork() như bên dưới:
*BlurWorker.kt*

```java 
class BlurWorker(ctx: Context, params: WorkerParameters) : Worker(ctx, params) {

    private val TAG by lazy { BlurWorker::class.java.simpleName }

    override fun doWork(): Result {
        val appContext = applicationContext

        makeStatusNotification("Blurring image", appContext)

        return try {
            val picture = BitmapFactory.decodeResource(
                    appContext.resources,
                    R.drawable.test)

            val output = blurBitmap(picture, appContext)

            // Write bitmap to a temp file
            val outputUri = writeBitmapToFile(appContext, output)

            Result.success()
        } catch (throwable: Throwable) {
            Log.e(TAG, "Error applying blur", throwable)
            Result.failure()
        }
    }
}
```

Có được  một thể hiện của *WorkManager*  trong *ViewModel*
*BlurViewModel.kt*

```java
private val workManager: WorkManager = WorkManager.getInstance()

```

Có 2 loại của *WorkRequest* :

* OneTimeWorkRequest: một WorkRequest  sẽ được thực thi duy nhất 1 lần
* PeriodicWorkRequest : một WorkRequest sẽ được thực thi lập đi lập lại theo một khoảng thời gian được thiết lập.
Chúng ta chỉ muốn image bị làm mờ một lần khi Go button được click. Phương thức applyBlur được gọi khi Go button được click, vậy tạo một OneTimeWorkRequest từ BlurWorker đó. Sau đó sử dụng *WorkManager* để enqueue *WorkRequest* mà bạn vừa tạo. Thêm những dòng code bên dưới vào trong  phương thức applyBlur của *BlurViewModel*

*BlurViewModel.kt*

```java 
internal fun applyBlur(blurLevel: Int) {
   workManager.enqueue(OneTimeWorkRequest.from(BlurWorker::class.java))
}
```

Sau đó thêm event listener tới **Go** button.

*BlurActivity.kt*

```java
setOnClickListeners()
```

```java
private fun setOnClickListeners() {
    goButton.setOnClickListener { viewModel.applyBlur(blurLevel) }
}
```

Run app và bạn sẽ nhìn thấy Notification khi bạn click button Go

![](https://images.viblo.asia/923ecf39-fff8-4f10-bd27-3f703e7e1739.png)

Ngoài ra bạn có thể open *Device File Explorer* trong Android Studio. Sau đó chuyển hướng tới *data>data>com.example.background>files>blur_filter_outputs><URI>* và xác nhận rằng image đã bị làm mờ.
    ![](https://images.viblo.asia/bd1f239b-e090-4f95-9a69-696f7a5391c2.png)
    
**Add Input và Output**
    
   Tiếp theo chúng ta sẽ cùng cấp một URI của image mà chúng ta đã select như là một  *Input  tới  WorkRequest* .
   Input và output là được gửi vào trong thông qua một [Data](https://developer.android.com/reference/androidx/work/Data) . Data object là nhẹ và chứa cặp key/value. Chúng được dùng để lưu trữ số lượng data nhỏ và có     thể gửi vào trong hoặc ra ngoài từ  *WorkRequest*
    
   Chúng ta sẽ tạo một method được gọi là *createInputDataForUri* trong BlurViewModel
    
    *BlurViewModel.kt*
    
  ```java 
    private fun createInputDataForUri(): Data {
    val builder = Data.Builder()
    imageUri?.let {
        builder.putString(KEY_IMAGE_URI, imageUri.toString())
    }
    return builder.build()
}
 ```
 Gửi Data object tới *WorkRequest*
    
 *BlurViewModel.kt*
    
  ```java 
    internal fun applyBlur(blurLevel: Int) {
    val blurRequest = OneTimeWorkRequest.Builder(BlurWorker::class.java)
            .setInputData(createInputDataForUri())
            .build()

    workManager.enqueue(blurRequest)
}
 ```
Tiếp theo chúng ta sẽ phải update phương thức  *doWork()*  trong  *BlurWorker*  để có được input
    
*BlurWorker.kt*
    
```java 
    override fun doWork(): Result {
    val appContext = applicationContext

        
    // ADD THIS LINE
    val resourceUri = inputData.getString(KEY_IMAGE_URI)
         
    //... rest of doWork()
}
```
    
```java 
    override fun doWork(): Result {
    val appContext = applicationContext

    val resourceUri = inputData.getString(KEY_IMAGE_URI)

    makeStatusNotification("Blurring image", appContext)

    return try {
        if (TextUtils.isEmpty(resourceUri)) {
            Log.e(TAG, "Invalid input uri")
            throw IllegalArgumentException("Invalid input uri")
        }

        val resolver = appContext.contentResolver

        val picture = BitmapFactory.decodeStream(
                resolver.openInputStream(Uri.parse(resourceUri)))

        val output = blurBitmap(picture, appContext)

        // Write bitmap to a temp file
        val outputUri = writeBitmapToFile(appContext, output)

        Result.success()
    } catch (throwable: Throwable) {
        Log.e(TAG, "Error applying blur", throwable)
        Result.failure()
    }
}
```
  Tạo output  bằng cách tạo một Data mới, giống như bạn đã làm với input, và lưu outputUri như là một String. Sử dụng cùng key KEY_IMAGE_URI. Sau đó return tới WorkManager bằng việc sử dụng 
   *Result.success( Data outputData)*
 
 *BlurWorker.kt*
    
```java
    
    val outputData = Data.Builder().putString(KEY_IMAGE_URI, outputUri.toString()).build()
    result.success(outputData)
```
Tương tự như việc tạo *BlurWorker* chúng ta sẽ tạo 2 class mới lần lượt là *CleanupWorker* và *SaveImageToFileWorker*
    
*CleanupWorker.kt*
    
```java 
    
 class CleanupWorker(ctx: Context, params: WorkerParameters) : Worker(ctx, params) {
    private val TAG by lazy { CleanupWorker::class.java.simpleName }

    override fun doWork(): Result {
        // Makes a notification when the work starts and slows down the work so that
        // it's easier to see each WorkRequest start, even on emulated devices
        makeStatusNotification("Cleaning up old temporary files", applicationContext)
        sleep()

        return try {
            val outputDirectory = File(applicationContext.filesDir, OUTPUT_PATH)
            if (outputDirectory.exists()) {
                val entries = outputDirectory.listFiles()
                if (entries != null) {
                    for (entry in entries) {
                        val name = entry.name
                        if (name.isNotEmpty() && name.endsWith(".png")) {
                            val deleted = entry.delete()
                            Log.i(TAG, String.format("Deleted %s - %s", name, deleted))
                        }
                    }
                }
            }
            Result.success()
        } catch (exception: Exception) {
            Log.e(TAG, "Error cleaning up", exception)
            Result.failure()
        }
    }
}
```
 *SaveImageToFileWorker.kt*
    
```java 
    
    class SaveImageToFileWorker(ctx: Context, params: WorkerParameters) : Worker(ctx, params) {

    private val TAG by lazy { SaveImageToFileWorker::class.java.simpleName }
    private val Title = "Blurred Image"
    private val dateFormatter = SimpleDateFormat(
            "yyyy.MM.dd 'at' HH:mm:ss z",
            Locale.getDefault()
    )

    override fun doWork(): Result {
        // Makes a notification when the work starts and slows down the work so that
        // it's easier to see each WorkRequest start, even on emulated devices
        makeStatusNotification("Saving image", applicationContext)
        sleep()

        val resolver = applicationContext.contentResolver
        return try {
            val resourceUri = inputData.getString(KEY_IMAGE_URI)
            val bitmap = BitmapFactory.decodeStream(
                    resolver.openInputStream(Uri.parse(resourceUri)))
            val imageUrl = MediaStore.Images.Media.insertImage(
                    resolver, bitmap, Title, dateFormatter.format(Date()))
            if (!imageUrl.isNullOrEmpty()) {
                val output = Data.Builder()
                        .putString(KEY_IMAGE_URI, imageUrl)
                        .build()

                Result.success(output)
            } else {
                Log.e(TAG, "Writing to MediaStore failed")
                Result.failure()
            }
        } catch (exception: Exception) {
            Log.e(TAG, "Unable to save image to Gallery", exception)
            Result.failure()
        }
    }
}
```
Chúng ta sẽ update lại method *applyBlur()* trong *BlurViewModel.kt* như bên dưới:
*BlurViewModel.kt*
    
```java 
    
    internal fun applyBlur(blurLevel: Int) {
    // Add WorkRequest to Cleanup temporary images
    var continuation = workManager
            .beginWith(OneTimeWorkRequest
            .from(CleanupWorker::class.java))

    // Add WorkRequest to blur the image
    val blurRequest = OneTimeWorkRequest.Builder(BlurWorker::class.java)
            .setInputData(createInputDataForUri())
            .build()

    continuation = continuation.then(blurRequest)
    
    // Add WorkRequest to save the image to the filesystem
    val save = OneTimeWorkRequest.Builder(SaveImageToFileWorker::class.java).build()

    continuation = continuation.then(save)

    // Actually start the work
    continuation.enqueue()
}
``` 
Để hiểu rõ hơn về WorkManager các bạn có thể  tham khảo source code đầy đủ [tại đây](https://github.com/oLeQuangHoa/Sample-WorkManager/tree/codelab)
Ngoài ra các bạn có thể tham khảo tài liệu tại [https://codelabs.developers.google.com/codelabs/android-workmanager-kt/#0](https://codelabs.developers.google.com/codelabs/android-workmanager-kt/#0)