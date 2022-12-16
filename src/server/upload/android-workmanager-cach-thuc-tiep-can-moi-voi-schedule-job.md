Đến thời điểm hiện tại thì Android Jetpack cũng ra mắt được một thời gian. Đây là một cải tiến lớn , một tập hợp các component, tool,... mọi thứ giúp tạo nên một ứng dụng Android tuyệt vời hơn. Trong đó những sự thay đổi đến từ 4 nhóm sau :
- Architecture
- Ui
- Foundation
- Behavior 

Trong bài viết này mình muốn giới thiệu tới các bạn một thư viện mới trong nhóm Architecture đó là **WorkManager**.

# Giới thiệu
Trước khi nói về  WorkManager mình sẽ đưa ra một ví dụ rất quen thuộc khi chúng ta phát triển app. Chắc hẳn mọi người đã không còn xa lạ gì với RxJava, ThreadPool, hoặc mới hơn nữa là coroutines trong kotlin. Phải nói đây là những công cụ cực kì mạnh để giải quyết các bài toán thực thi bất đồng bộ. 

Có lẽ quá đơn giản khi bạn dùng RxJava để thực thi một task update thông tin người dùng lên server khi họ thực hiện các thay đổi thông tin nào đó. Nhiệm vụ này sẽ được thực thi ở background, hoàn toàn không làm gián đoạn UI. Nhưng vậy câu hỏi đặt ra là liệu **có một sự đảm bảo nào** cho việc update của bạn sẽ thành công ? Hay chúng ta chỉ có thể obsever nó rồi đợi nó trả về state của công việc. Có khi nào người dùng ấn update rồi tắt app  khiến cho process của app bạn bị hệ thống **kill** không thương tiếc nếu có những tác vụ khác của app khác quan trọng hơn cần chạy ? Vậy là quá nguy hiểm khi data không được update phải không.

-----

Mọi vấn đề trên sẽ được WorkManager đảm nhiệm. Đây là component giúp chúng ta dễ dàng chỉ định các công việc bất đồng bộ. Các ưu điểm tuyệt vời của nó mình có thể kể đến như sau :
- Đảm bảo task của bạn sẽ được thực thi
- Cơ chế chạy thông minh 
- Sử dụng dễ dàng

Bây giờ mình sẽ phân tích cụ thể các ưu điểm trên :
- THứ nhất là đảm bảo task sẽ được thực thi : Như ví dụ ở trên về update data.Tại sao mình nói WorkManager sẽ đảm bảo thực thi cho bạn. Thứ nhất, nếu app foreground, task sẽ được chạy trên 1 worker thread bình thường. Nhưng nếu app bị tắt chẳng hạn, lập tức WorkManager sẽ tìm đến các giải pháp lên lịch cho công việc của bạn như JobSchedule, AlarmManager, ...
- Cơ chế chạy thông minh : ở đây nó chính là cơ chế tự động lựa chọn giải pháp để thực thi task. Bạn có biết tình trạng của máy mình hiện tại thì lựa chọn giải pháp nào là tốt nhất ? WorkManager sẽ xem xét các yếu tố như OS version, Google Play Service có khả dụng trên máy bạn không hay Firebase có được tích hợp không ... và nhiều yếu tố khác nữa để lựa chọn giải pháp tối ưu nhất. Có thể là JobSchedule, AlarmManager hoặc cũng có thể là FireBase JobDispatcher,...
- Sử dụng dễ dàng : đương nhiên khi tự WorkManager lựa chọn, phân tích giải pháp thì ta chỉ việc đưa task cho nó thôi phải không :) Và không phải lo task không được thực thi.

# Một số class quan trọng
Sau đây mình sẽ giới thiệu các class quan trọng mà chúng ta sẽ phải dùng khi làm việc với thư viện này.
- **Worker** : Đây sẽ là class nơi mà chúng ta chỉ định công việc cụ thể cần thực hiện. Khi kế thừa woker, ta sẽ phải override hàm doWork() là nơi định nghĩa cụ thể công việc.
- **WorkRequest** : tạo ra yêu cầu thực thi công việc. Với request ta có thể chỉ định thêm điều kiện để task có thể được thực thi.
- **WorkManager** : có nhiệm vụ nhận các request trên và điều phối thực thi chúng
- **WorkStatus** : class chứa các thông tin về task. WorkManager class sẽ chứa 1 object WorkStatus ở dạng LiveData. Vì thế ta có thể obsever nó để lấy ra các thông tin cần thiết như trạng thái hiện tại của task, dữ liệu đầu ra của task, hay giá trị của thẻ tag đã được gán cho công việc.

# Ví dụ cơ bản
## Bước 1: Tạo Worker
Như đã nói ở trên , Worker chính là đại diện cụ thể cho công việc mà ta muốn thực hiện. Ta sẽ kế thừa class này cùng với fun doWork() như sau :
```
class MyWorker : Worker() {
    override fun doWork(): Result  = try {
        //do something
        
        Result.SUCCESS
    } catch (e: Throwable) {
     
        Result.FAILURE
    }
```

Ở đây ta sẽ thực thi công việc trong fun doWork(). Nếu thành công sẽ trả về status là SUCCESS, ngược lại là FAILURE

## Bước 2: Tạo WorkRequest
WorkRequest đại diện cho 1 yêu cầu chạy 1 worker nào đó. Ví dụ ta sẽ tạo ra 1 yêu cầu chạy nhiệm vụ trong worker vừa tạo ở trên

```
val workRequest = OneTimeWorkRequest.Builder(MyWorker::class.java).build()

```

Ngoaì **OneTimeWorkRequest** dùng thể thực thi 1 lần nhiệm vụ thì ta còn có **PeriodicWorkRequest** dùng để thực thi công việc lặp lại định kì. Ví dụ ta muốn chạy task trên cứ 15 phút 1 lần như sau :

```
val periodicRequest = PeriodicWorkRequest.Builder(MyWorker::class.java, 15, TimeUnit.MINUTES)
```
## Bước 3: Chạy WorkRequest với WorkManager 
WorkManager phụ trách việc nhận các WorkRequest và enqueue các task đó

```
val workManager = WorkManager.getInstance()
workManager.enqueue(workRequest)
```
# Một số tiện ích khác
## 1. Input - Output data
Có thể truyền dữ liệu cho 1 worker để thực hiện task cũng như lấy dữ liệu output từ worker sau khi task đã hoàn thành.

**Input Data** : Ta có thể truyền dữ liệu cho 1 task bằng setInputData cho WorkRequest. Ví dụ muốn truyền 1 string làm đầu vào cho task như sau :
```
val workRequest = OneTimeWorkRequest.Builder(MyWorker::class.java)
                    .setInputData(Data.Builder().putString("key","data input").build())
                    .build()
```

-> Bây giờ trong fun doWork() ta có thể lấy ra data này để thực thi nhiệm vụ cần thiết.

```
class MyWorker : Worker() {
    override fun doWork(): Result  = try {
        var input = getInputData().getString("key")
        //do something
        
        Result.SUCCESS
    } catch (e: Throwable) {
     
        Result.FAILURE
    }
```

**OutPut Data**:
Sau khi task hoàn thành ta có thể trả về data tương ứng như sau :
```
class MyWorker : Worker() {
    override fun doWork(): Result  = try {
        var input = getInputData().getString("key")
        //do something
        
        //return output
        setOutputData(Data.Builder().putString("key", "data output").build())
        Result.SUCCESS
    } catch (e: Throwable) {
     
        Result.FAILURE
    }
```
## 2. WorkRequest Constrains 
Một tính năng rất hay nữa của WorkManager đó là Constrains - Chỉ định điều kiện thực thi task. Khi mà thiết bị của bạn đáp ứng các yêu cầu này thì task mới được chạy.

Có các kiểu điều kiện sau :
- **setRequiresCharging**(**boolean** **requiresCharging**)  : quy định yêu cầu về trạng thái sạc thiết bị
- **setRequiredNetworkType(@NonNull NetworkType networkType**) : quy định trạng thái mạng của thiết bị
- **setRequiresBatteryNotLow(boolean requiresBatteryNotLow**) : quy định mức pin thiết bị
- **setRequiresStorageNotLow(boolean requiresStorageNotLow**) : quy định mức độ có sẵn của bộ nhớ 

Ví dụ mình sẽ quy định task chỉ được thực thi khi mà thiết bị có kết nối mạng như sau:
```
val workRequest = OneTimeWorkRequest.Builder(MyWorker::class.java)
                    .setConstraints(Constraints.Builder()
                       .setRequiredNetworkType(NetworkType.CONNECTED).build())

                    .build()
```
## 3. Task Chain 
Cơ chế này cho phép sắp xếp các nhiệm vụ liên tiếp nhau. Ngoài ra còn có thể lấy output của nhiệm vụ trước làm input cho nhiệm vụ sau.

Ví dụ mình sẽ có 3 task A,B,C sẽ được thực thi với 3 WorkRequest sau đây :
```
var firstRequest = OneTimeWorkRequest.Builder(AWorker::class.java)
                 .build()
var secondRequest = OneTimeWorkRequest.Builder(BWorker::class.java)
                 .build()
var thirdRequest = OneTimeWorkRequest.Builder(CWorker::class.java)
                 .build()
```

Bây giờ thay vì gọi **workManager.enqueue(workRequest)**, chúng ta sẽ có fun thay thế là **beginWith()** . 
```
workManager.beginWith(firstRequest).then(secondRequest).then(thirdRequest).enqueue()
```
Task A cần chạy đầu tiên, nên ta sẽ truyền Request của nó vào fun **beginWith()**. Sau đó sẽ dùng đến fun **then()** để truyền vào các task muốn thực hiện tiếp sau đó khi mà task A kết thúc. Với cách này ta có thể tạo ra các chuỗi công việc liên tiếp nhau, rất tiện lợi vì có thể lấy được các dữ liệu thực thi của nhau.

# Lời kết
Vậy là mình đã chia sẻ với mọi người về WorkManger - một component rất hay để lên lịch công việc trong Android. Tuy nhiên mình cũng sẽ có lưu ý sau. Hiện tại thì đội ngũ phát triển WorkManager vẫn đang trong quá trình hoàn thiện sản phẩm để đưa ra bản chính thức. Ở những bản alpha hiện tại tất nhiên vẫn còn 1 số lỗi. Các bạn có thể nghiên cứu và trải nghiệm nó. CÒn nếu muốn apply vào dự án thực tế thì hãy cân nhắc và kiểm tra kĩ những phần có thể hoạt động không chính xác. Hy vọng bài viết này sẽ mang lại những điều bổ ích. Cảm ơn các bạn ^.^