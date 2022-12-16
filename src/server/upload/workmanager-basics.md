# WorkManager Basics
WorkManager là một [Android Jetpack](https://developer.android.com/jetpack) library, được xây dựng nhằm mục đích schedule deferrable, asynchronous tasks. Trong post này mình sẽ nói về `WorkManager` là gì và khi nào sử dụng nó.

## Bắt đầu với ví dụ
Giả sử chúng ta có một app chỉnh sửa hình ảnh, cho phép put các filters và upload nó lên web cho mọi người cùng xem. Bây giờ chúng ta cần tạo một series các background tasks bao gồm việc áp dụng các filter, nén image, và sau đó upload nó. Trong mỗi phase, có một vài hạn chế cần được kiểm tra đó là: thiết bị có đủ pin khi đang lọc image hay không, có đủ vùng lưu trữ khi nén image hay không, hay có kết nối internet khi đang upload hay không. 
![](https://images.viblo.asia/b0ba8e55-1efe-4b57-b0fd-4e5d733b15ac.png)

Ví dụ của một task:
* **Deferrable**, bởi vì chúng ta không cần nó xảy ra ngay lập tức, và trong thực tế có thể chờ một số ràng buộc được đáp ứng (như chờ một kết nối mạng).
* Cần được **guaranteed** để chạy, bất kể app có bị thoát ra hay không, bởi vì người dùng sẽ không hề thoải mái nếu image đã được lọc của họ không bao giờ được share cho mọi người thấy. 

Những đặc điểm trên làm cho image filter và uploading tasks trở thành trường hợp hoàn hảo để sử dụng WorkManager.

## Thêm WorkManager dependency
Toàn bộ Code trong post này sẽ được viết bằng Kotlin, sử dụng KTX library (Kotlin extensions). KTX cung cấp các [extensions fuction](https://developer.android.com/reference/kotlin/androidx/work/package-summary#extension-functions-summary) giúp Kotlin ngắn gọn và rõ ràng hơn. Chúng ta dùng phiên bản KTX của WorkManager bằng việc sử dụng dependency này.

```java
dependencies {
 def work_version = "1.0.0-beta02"
 implementation "android.arch.work:work-runtime-ktx:$work_version"
}
```

Các bạn có thể dễ dàng tìm thấy các phiên bản mới nhất của thư viện này [ở đây](https://developer.android.com/topic/libraries/architecture/adding-components#workmanager). Để dùng Java dependency, chúng ta chỉ cần bỏ `-ktx`.

## Xác định những gì công việc của chúng ta làm
Bây giờ chúng ta chỉ tập chung vào một phần công việc, trước khi xâu chuỗi nhiều tasks lại với nhau. Mình sẽ đi sâu vào upload task trước. Đầu tiên, chúng ta sẽ cần tạo implementation với `Worker` class. Mình sẽ gọi nó là `UploadWorker` và sẽ override phương thức `doWork()`.

Các `Worker`: 
* Xác định những gì công việc của chúng ta thực sự làm.
* Accept inputs và produce outputs. Cả input và output thể hiện như key và value pairs.
* Luôn luôn return một giá trị thể hiện các trạng thái success, failure, hoặc retry.

Dưới đây là ví dụ làm thể nào để implement một `Worker` để upload image:

```java
class UploadWorker(appContext: Context, workerParams: WorkerParameters)
    : Worker(appContext, workerParams) {

    override fun doWork(): Result {
        try {
            // Get the input
            val imageUriInput = inputData.getString(Constants.KEY_IMAGE_URI)

            // Do the work
            val response = upload(imageUriInput)

            // Create the output of the work
            val imageResponse = response.body()
            val imgLink = imageResponse.data.link
            // workDataOf (part of KTX) converts a list of pairs to a [Data] object.
            val outputData = workDataOf(Constants.KEY_IMAGE_URI to imgLink)

            return Result.success(outputData)

        } catch (e: Exception) {
            return Result.failure()
        }
    }

    fun upload(imageUri: String): Response {
        TODO(“Webservice request code here”)
        // Webservice request code here; note this would need to be run
        // synchronously for reasons explained below.
    }

}
```
Lưu ý:
* Input và output được truyền như [`Data`](https://developer.android.com/reference/androidx/work/Data), cơ bản nó là một ánh xạ của primitive types và arrays. Đối tượng data được chỉ định khá nhỏ - thực tế tổng kích thước của input/output được giới hạn bởi [`MAX_DATA_BYTES`](https://developer.android.com/reference/androidx/work/Data.html#MAX_DATA_BYTES). Nếu chúng ta cần đưa nhiều dữ liệu vào và ra của `Worker`thì nên put data vào một nơi khác, như [Room database](https://developer.android.com/training/data-storage/room/) chẳng hạn. Như ở ví dụ trên, chúng ta chỉ truyền vào một Uri image.
* Trong code thể hiện ví dụ cho việc trả về `Result.success()` và `Result.failure()`. Vẫn có một lựa chọn khác là `Result.retry()`, retry công việc của chúng ta, mình sẽ đề cập sau. 

## Xác định work của chúng ta nên chạy như thế nào
Trong khi `Worker` xác định công việc làm gì, `WorkRequest` xác định như thế nào và khi nào công việc nên được run. 

Dưới đây là một ví dụ về việc tạo một `OneTimeWorkRequest` cho `UploadWorker`. Và nó cũng có thể có một repeating `PeriodicWorkRequest`.

```java
// workDataOf (part of KTX) converts a list of pairs to a [Data] object.
val imageData = workDataOf(Constants.KEY_IMAGE_URI to imageUriString)

val uploadWorkRequest = OneTimeWorkRequestBuilder<UploadWorker>()
        .setInputData(imageData)
        .build()
```

`WorkRequest` này có trong đối tượng `imageData: Data` như một input và run ngay khi có thể.

Để yêu cầu `UploadWork` không run ngay lập tức và chỉ nên run nếu device có kết nối internet. Chúng ta có thể add đối tượng `Constraints`.

```java
val constraints = Constraints.Builder()
        .setRequiredNetworkType(NetworkType.CONNECTED)
        .build()
```

Dưới đây, một ví dụ về các constraints được hỗ trợ khác:

```java
val constraints = Constraints.Builder()
        .setRequiresBatteryNotLow(true)
        .setRequiredNetworkType(NetworkType.CONNECTED)
        .setRequiresCharging(true)
        .setRequiresStorageNotLow(true)
        .setRequiresDeviceIdle(true)
        .build()
```

Chúng ta đã nhắc trước đó là nếu một `Worker` return `Result.retry()`, WorkManager sẽ reschedule công việc. Chúng ta có thể customize backoff criteria khi tạo WorkRequest. Điều này cho phép chúng ta xác định được khi nào `Worker` được retried.

Backoff criteria được định nghĩa với 2 đặc tính: 
* **BackoffPolicy**, mặc định là theo cấp số nhân, nhưng có thể được đặt thành tuyến tính.
* **Duration**, mặc định là 30 giây.

```java
// Create the Constraints
val constraints = Constraints.Builder()
        .setRequiredNetworkType(NetworkType.CONNECTED)
        .build()

// Define the input
val imageData = workDataOf(Constants.KEY_IMAGE_URI to imageUriString)

// Bring it all together by creating the WorkRequest; this also sets the back off criteria
val uploadWorkRequest = OneTimeWorkRequestBuilder<UploadWorker>()
        .setInputData(imageData)
        .setConstraints(constraints)        
        .setBackoffCriteria(
                BackoffPolicy.LINEAR, 
                OneTimeWorkRequest.MIN_BACKOFF_MILLIS, 
                TimeUnit.MILLISECONDS)
        .build()
```

## Running work
Code dưới đây giúp chúng ta yêu cầu WorkManager schedule cho chúng ta.

```
WorkManager.getInstance().enqueue(uploadWorkRequest)
```

Đầu tiên chúng ta cần get instance của `WorkManager`, đây là một singleton có trách nhiệm thực thi công việc của chúng ta. Gọi `enqueue` để bắt đầu process của tracking và scheduling work `WorkManager`.

## Work run như thế nào
Mặc định `WorkManager` sẽ:
* Run work của chúng ta không trên main thread (**off of the main thread**). 
* **Guarantee** work sẽ thực thi (Nó sẽ không quên run work của chúng ta, ngay cả chúng ta restart device hoặc app exist).
* Run theo **best practices for the user’s API level**.

Bây giờ chúng ta sẽ tìm hiểu sâu hơn, xem `WorkManager` làm thế nào để chắc chắn rằng work sẽ run off of main thread và được đảm bảo để thực thi. `WorkManager` bao gồm các thành phần:
* **Internal TaskExecutor**: Một single thread [`Executor`](https://developer.android.com/reference/java/util/concurrent/Executor) xử lý tất cả các request để enqueue work. 
* **WorkManager database**: Một local database tracking tất cả thông tin và trạng thái work của chúng ta. Bao gồm trạng thái hiện tại của work, input và output từ work và bất kì constrait nào. Database này cho phép `WorkManager` đảm bảo work sẽ finish - nếu người dùng restart hoặc work bị interrupted, tất cả các thông tin chi tiết của work sẽ được pull về từ database và work có thể restart when devices boot trở lại. 
* **WorkerFactory***: Một factory mặc định, tạo instances của các `Worker`. Chúng ta sẽ cover tại sao và như thế nào config nó trong các bài post tiếp theo. 
* **Default Executor***: Một executor mặc định,  run work của chúng ta trừ khi có một chỉ định khác. Điều này chắc chắn rằng work của chúng ta sẽ run đồng bộ và **off of the main thread**.

(*) Là thành phần có thể được override để có các hành vi khác nhau. 
![](https://images.viblo.asia/d4c3677b-c349-4a84-a8bb-ac22061e0ed4.png)

Khi chúng ta enqueue `WorkRequest`:
1. Internal TaskExecutor sẽ thực hiện lưu trữ `WorkRequest` info vào WorkManager database.
2. Lát sau, khi các `Constraints` cho `WorkRequest` được đáp ứng (Cái này có thể ngay lập tức),  Internal TaskExecutor sẽ nói với `WorkerFactory` tạo một `Worker`.
3. Sau đó, `Executor` mặc định gọi phương thức `doWork()` của các `Worker`  ngoài main thread.

Theo cách này, công việc của chúng ta, mặc định vừa được đảm bảo để thực thi và chạy ngoài luồng chính (**guaranteed to execute** và **run off of the main thread**).

Bây giờ nếu chúng ta muốn sử dụng một số cơ chế khác ngoài `Executor` mặc định để chạy công việc của mình, chúng ta có thể có các box hỗ trợ cho coroutines (`CoroutineWorker`) và RxJava (`RxWorker`). 

Ngoài ra chúng ta có thể chỉ định chính xác work sẽ được thực thi như thế nào bằng việc sử dụng [`ListenableWorker`](https://developer.android.com/reference/androidx/work/ListenableWorker). `Worker` cũng chính là implementation của `ListenableWorker` để chạy work của chúng ta trên default `Executor` và đồng bộ hoá. Vì vậy nếu chúng ta muốn kiểm soát hoàn toàn chiến lược phân luồng các work hoặc để run bất đồng bộ, thì chúng ta có thể kế thừa từ `ListenableWorker`. 

Việc WorkManager gặp rắc rối khi lưu tất cả thông tin về công việc của chúng ta vào cơ sở dữ liệu là điều làm cho nó hoàn hảo cho các tác vụ cần được đảm bảo để thực thi. Điều này làm cho `WorkManager` trở nên không cần thiết cho các single task mà không cần guarantee mà chỉ cần thực thi trên background thread. Ví dụ, chúng ta download một image và muốn thay đổi color của UI dựa trên image đó. Work này nên được run off of the main thread, nhưng do nó liên quan đến UI, nên ta không cần tiếp tục nếu app bị close. Vậy nên, trong trường hợp này sẽ không dùng `WorkManager`.

## Using Chains for dependent work
Ví dụ, bộ lọc của chúng nhiều hơn một task vụ - chúng ta cần filter nhiều image, sau đó nén lại, và upload. Nếu chúng ta muốn chạy loạt các `WorkRequest` này, từng cái một hoặc song song, thì chúng ta có thể dùng [chain](https://developer.android.com/topic/libraries/architecture/workmanager/advanced#chained). Sơ đồ bên dưới ví dụ một chuỗi 3 task run song song, theo sau là một compress task và một upload task, run liên tiếp nhau: 
![](https://images.viblo.asia/4730edad-a61d-4d59-a3dc-c466b95646c5.png)

Điều này thì cực kì dễ dàng với `WorkManager`. Giả sử chúng ta đã tạo tất cả các `WorkRequest` với các constraints thích hợp.

```java
WorkManager.getInstance()
    .beginWith(Arrays.asList(
                             filterImageOneWorkRequest, 
                             filterImageTwoWorkRequest, 
                             filterImageThreeWorkRequest))
    .then(compressWorkRequest)
    .then(uploadWorkRequest)
    .enqueue()
```

Có 3 `WorkRequest` thực thi song song. Chỉ khi cả 3 filter task kết thúc, `compressWorkRequest` mới bắt đầu thực hiện, cuối cùng đến `uploadWorkRequest`.

Chức năng của chuỗi đó là output của `WorkRequest` này sẽ là input của `WorkRequest` tiếp theo. Vì vậy, giả sử bạn đặt chính xác input và output, như mình đã làm ở trên với ví dụ UploadWorker, các giá trị này sẽ tự động được passed.

Để xử lý output từ 3 filter work request chạy song song, chúng ta có thể dùng `InputMerger`, cụ thể là `ArrayCreatingInputMerger`.

```java
val compressWorkRequest = OneTimeWorkRequestBuilder<CompressWorker>()
        .setInputMerger(ArrayCreatingInputMerger::class.java)
        .setConstraints(constraints)
        .build()
```

Lưu ý rằng `InputMerger` được thêm vào `compressWorkRequest` chứ không phải 3 filter requests được run song song. 

Giả sử output của mỗi filter work request là key `KEY_IMAGE_URI` được map với image URI. `ArrayCreatingInputMerger` là output từ các work request chạy song song với **keys** tương ứng, nó tạo ra một mảng với tất cả các giá trị output, được mapped tới single key. 

![](https://images.viblo.asia/0016baff-56db-45b3-a795-a065b2ff6949.png)

Input cho compressWorkRequest cuối cùng sẽ trở thành cặp “KEY_IMAGE_URI” mapped với một mảng image URIs đã được filtered.

## Quan sát trạng thái của WorkRequest
Để quan sát trạng thái của `WorkRequest` một cách dễ dàng nhất ta sẽ sử dụng [`LiveData`](https://developer.android.com/reference/android/arch/lifecycle/LiveData). `LiveData` là một lifecycle-aware  observable data holder . 

Việc gọi `getWorkInfoByIdLiveData` sẽ return `LiveData` của [`WorkInfo`](https://developer.android.com/reference/androidx/work/WorkInfo). `WorkInfo` bao gồm dữ liệu output và một enum đại diện cho trạng thái của work. Khi work kết thúc thành công, `State` sẽ là `SUCCEEDED`. Ví dụ, chúng ta có thể tự động hiển thị hình ảnh khi work đã hoàn thành, như code bên dưới:

```java
// In your UI (activity, fragment, etc)
WorkManager.getInstance().getWorkInfoByIdLiveData(uploadWorkRequest.id)
        .observe(lifecycleOwner, Observer { workInfo ->
            // Check if the current work's state is "successfully finished"
            if (workInfo != null && workInfo.state == WorkInfo.State.SUCCEEDED) {
                displayImage(workInfo.outputData.getString(KEY_IMAGE_URI))
            }
        })
```

Một số điều cần lưu ý:
* Mỗi `WorkRequest` sẽ có một `id` duy nhất và `id` này là cách để truy cập vào `WorkInfo`.
* Khả năng observe và được notified khi `WorkInfo` thay đổi là một chức năng được cung cấp bởi `LiveData`.

Work cũng có một lifecycle, thể hiện bởi sự khác nhau của các `State`. Khi đang observe `LiveData<WorkInfo>` chúng ta sẽ thấy những trạng thái đó. Ví dụ:
![The “happy path” or work States](https://images.viblo.asia/b9ed944c-5ad6-4ef2-81ac-03de2a708f7c.png)

Nhưng hình trên thì ta có:
1. `BLOCKED` : State này chỉ xảy ra nếu work trong chain và không là next work trong chain. 
2. `ENQUEUED`: Work vào trạng thái này ngay khi work là next work trong chain và thích hợp để run. Work này có thể vẫn đang chờ trong trên các `Constraint` để được đáp ứng.
3. `RUNNING`: Trong state này, work đang được thực hiện. Đối với `Worker`, điều này cũng đồng nghĩa với việc phương thức `doWork()` đã được gọi. 
4. `SUCCEEDED`: Trạng thái này là trạng thái cuối cùng khi `doWork()` return `Result.success()`.

Bây giờ khi work `RUNNING`, chúng ta có thể gọi `Result.retry()`. Điều này khiến work quay trở lại trạng thái `ENQUEUED`.  Ở đây thì Work cũng có thể `CANCELLED` ở bất kì thời điểm nào. 

Nếu work result trả về `Result.failure()` thay vì success, thì state của chúng ta sẽ là `FAILED`. Full flowchart của các states trong như thế này:
![Working with WorkManager Presentation Android Developer Summit 2018](https://images.viblo.asia/21e90406-bf4d-4506-a66f-e3ae1d5a98c1.png)

Để nắm rõ hơn về `WorkManager` mọi người có thể xem video của [WorkManager Android Developer Summit talk - 2018](https://youtu.be/83a4rYXsDs0?t=1144).

## Kết luận
Trên đây là những điều cơ bản của WorkManager API. Sử dụng snippets mình vừa giới thiệu bạn có thể: 
* Tạo các Workers với input và output.
* Config các `Worker` sẽ run như thế nào, bằng việc sử dụng `WorkRequest`, `Constraint`, starting input và back off policies.
* Enqueue các `WorkRequest`.
* Nắm được cơ bản `WorkManager` làm gì bên dưới. 
* Tạo một chain phức tạp của các work phụ thuộc lẫn nhau. Running cả tuần tự và song song. 
* Quan sát `WorkRequest` status bằng việc sử dụng `WorkInfo`.

## Tham khảo
1. https://medium.com/androiddevelopers/workmanager-basics-beba51e94048
2. https://developer.android.com/topic/libraries/architecture/workmanager