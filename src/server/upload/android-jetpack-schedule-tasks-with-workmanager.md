## **Giới thiệu Android Jetpack**

Lời mở đầu mình xin giởi thiệu về Android Jetpack cho những ai chưa biết về nó. Mình sẽ không dịch những từ chuyên ngành vì dịch ra nghe rất kỳ.

Bạn có thể hiểu Jetpack như 1 hệ sinh thái của android vậy. Jetpack là một tập hợp của  Foundation, Architecture,  Behavior, UI  để giúp bạn tạo các ứng dụng Android tuyệt vời một cách nhanh chóng và dễ dàng.

Theo đánh giá cá nhân của mình thì đây sẽ là tương lai của Android. Khi nó đã tích hợp mọi thứ mà một lập trình viên Android cần. Và điều mình thích nhất ở Jetpack là bộ Architecture.
Chưa hề có 1 chuẩn nào về architecture cho đến khi Google chính thức đưa ra 1 chuẩn architecture cho lập trình viên Android. 

Các bạn có thể xem về Android Architecture Components tại [đây](https://developer.android.com/topic/libraries/architecture/)

Sơ qua về Jetpack thế nhé. Vì bài viết này em nó không phải là nhân vật chính. Mình sẽ có 1 bài viết chi tiết về em nó sau nhé. Giờ thì đến với nhân vật chính WorkManager nào.

## **WorkManager**

### **Define**

*WorkManager là 1 thành viên trong bộ Jetpack Architecture. 
WorkManager manage your Android background jobs. 
Tức là sao?. Mọi task vụ thực hiện dưới background như download, upload file, network... 
Các bạn đều có thể dùng WorkManager để thực thi.*

Đọc định nghĩa trên thì nhiều bạn sẽ nghĩ : Ô hay , thế Asynctask, Handler Thread, Service cũng làm được những thứ trên. Thế sinh ra thằng này làm cái gì vậy?

Để trả lời câu hỏi trên hãy tìm hiểu rõ hơn về Workmanager nhé :D

### **Overview**

*Schedule tasks with WorkManager
Là sao? Là thế này. Với WorkManager bạn có thể sắp xếp các task vụ của mình.
Bạn có thể quyết định khi nào thực hiện task. Và giả sử như bạn có nhiều task cần
thực hiện, bạn có thể quyết định thằng B chạy trước A rồi sau đó sẽ chạy thằng C hoặc ở
1 màn hình khác bạn lại cần chạy task theo thứ tự A > B > C. Nếu như task sau của bạn có input
là output của task trước thì bạn cũng đừng lo lắng. Với WorkManager bạn có thể làm được.*

Chú ý nhé :

*WorkManager  dành cho các task vụ mà ngay cả khi bạn thoát ứng dụng thì task vẫn thực hiện
ví dụ như việc bạn upload data lên server. Còn các task vụ mà sẽ tắt khi thoát app ra
thì  nên dùng ThreadPools nhé các bạn.*
    
Xem qua cách hoạt động nào:

WorkManager chọn cách thích hợp để chạy tác vụ của bạn dựa trên các yếu tố như level API 
thiết bị và trạng thái ứng dụng. Nếu WorkManager thực thi một trong các nhiệm vụ của bạn
trong khi ứng dụng đang chạy, WorkManager có thể chạy tác vụ của bạn trong một luồng mới. 
Nếu ứng dụng của bạn không chạy, WorkManager chọn một cách thích hợp để schedule 
một backgorund task - tùy thuộc vào mức API của thiết bị và các phụ thuộc kèm theo,
WorkManager có thể sử dụng JobScheduler, Firebase JobDispatcher hoặc AlarmManager.
Bạn không cần viết logic để tìm ra khả năng của thiết bị và chọn một API thích hợp,
thay vào đó bạn chỉ có thể giao nhiệm vụ của mình cho WorkManager và để cho nó chọn
tùy chọn tốt nhất. (Đoạn này hiểu đơn giản là bạn chỉ cần sử dụng WorkManager thôi, đừng
lăn tăn về việc nó sẽ sử dụng JobScheduler hay Firebase JobDispatcher, cũng như bạn k cần
viết code check API này kia làm gì. WorkManager đã xử lý điều đó).

Ngoài ra còn tính năng nâng cao của WorkManager mà mình rất thích. Đây cũng chính là lí do mình
quyết định dùng nó trong project của mình. 

Bạn sẽ giải quyết thế nào trong bài toán sau:

Tôi muốn lấy thông tin của Khách hàng. Nhưng để làm điều đó cần login và lấy mã token, cookie. 

Như vậy đây là 1 Chain Task đúng không nào? Là chuỗi các task vụ cần làm đó.

Mình đã làm như sau: Dùng Asynctask để gọi API login. Check và lấy ra token , cookie trong Response trả về trong onPostExcute sau đó gọi tiếp API Inquiry Data để lấy thông tin khách hàng.

Đây là cách đơn giản nhất để làm điều này. Tuy nhiên mình đánh giá là không nên làm vậy, kém cả về mặt performance , maintain, debug và đặc biệt là nhìn code rất xấu.

Bạn có thể dùng Handler thread xử lý bài toán này, tuy nhiên cũng rất phức tạp. 

Và, Ơn giời WorkManager đây rồi :D nó đã giải quyết được các vấn đề trong bài toán trên 1 cách rất simple :D

*WorkManager cung cấp một số tính năng nâng cao. Ví dụ, bạn có thể thiết lập một chuỗi
các nhiệm vụ; khi một tác vụ kết thúc, WorkManager sẽ xếp hàng nhiệm vụ tiếp theo
trong chuỗi. Bạn cũng có thể kiểm tra trạng thái của nhiệm vụ và các giá trị trả về của nó 
bằng cách quan sát LiveData của nó.
(LiveData cũng là 1 component mới trong bộ Android Architecture Component nhé. Mình sẽ có
bài viết cho em nó sau)
*
Phù, xong phần Overview nhé. Mình sẽ viết theo flow trên trang chủ Jetpack nhé.

### **Classes and concepts**

API WorkManager sử dụng một số lớp khác nhau. Tuy nhiên mình thấy có các class cần chú ý sau:
 
**Worker:**  class xác định task cần thực hiện. API WorkManager bao gồm 1 class abstract Worker. Bạn cần extend class này  và thực hiện công việc tại đây.

**WorkRequest:** đại diện cho một nhiệm vụ riêng lẻ. Ở mức tối thiểu, một đối tượng WorkRequest xác định lớp Worker nào sẽ thực hiện nhiệm vụ. Tuy nhiên, bạn cũng có thể thêm các chi tiết vào đối tượng WorkRequest, chỉ định những thứ như các trường hợp mà tác vụ sẽ chạy. Mỗi WorkRequest có một ID duy nhất được tạo tự động; bạn có thể sử dụng ID để thực hiện những việc như hủy một công việc xếp hàng đợi hoặc nhận trạng thái của tác vụ. WorkRequest là một lớp trừu tượng; trong mã của bạn, bạn sẽ sử dụng một trong các lớp con trực tiếp, OneTimeWorkRequest hoặc PeriodicWorkRequest.

**WorkRequest.Builder:** một lớp trợ giúp để tạo các đối tượng WorkRequest. Bạn sẽ sử dụng một trong các lớp con, OneTimeWorkRequest.Builder hoặc PeriodicWorkRequest.Builder.
Ràng buộc: chỉ định các hạn chế về thời điểm tác vụ sẽ chạy (ví dụ: "chỉ khi được kết nối với mạng"). Bạn tạo đối tượng Constraints với Constraints.Builder và chuyển các ràng buộc tới WorkRequest.Builder trước khi tạo WorkRequest.

**WorkManager**: enqueues và quản lý các yêu cầu công việc. Bạn chuyển đối tượng WorkRequest của bạn tới WorkManager để enqueue nhiệm vụ. WorkManager lên lịch nhiệm vụ theo cách như vậy để trải rộng tải trên tài nguyên hệ thống, tất nhiên nó sẽ thực hiện với các ràng buộc mà bạn đã chỉ định.

**WorkStatus:** chứa thông tin về một tác vụ cụ thể. WorkManager cung cấp một LiveData cho mỗi đối tượng WorkRequest. LiveData chứa đối tượng WorkStatus; bằng cách quan sát LiveData, bạn có thể xác định trạng thái hiện tại của tác vụ và nhận bất kỳ giá trị trả về nào sau khi tác vụ kết thúc.

### **Typical workflow**

Giả sử bạn đang viết một ứng dụng thư viện ảnh và ứng dụng đó cần nén định kỳ hình ảnh được lưu trữ của nó. Bạn muốn sử dụng các API WorkManager để lên lịch nén ảnh. Trong trường hợp này, bạn không đặc biệt quan tâm khi nén xảy ra; bạn muốn thiết lập nhiệm vụ và quên nó đi.

Đầu tiên, bạn sẽ định nghĩa lớp Worker của mình và ghi đè phương thức doWork () của nó. Lớp Worker của bạn chỉ định cách thực hiện thao tác, nhưng không có bất kỳ thông tin nào về thời điểm tác vụ sẽ chạy.

    public class CompressWorker extends Worker {
    @Override
    public Worker.WorkerResult doWork() {

        // Thực hiện task ở đây. 
        //Trong case này task là nén ảnh và không có params
        myCompress();

        // Cho biết kết quả: Thành công hay thất bại
        return WorkerResult.SUCCESS;

        // trả về RETRY nếu thấy bại. Task sẽ được thực thi lại
        // trả về FAILURE nếu muốn kết thúc, không thực thi lại.)
    }
}
    
Tiếp theo, bạn tạo một đối tượng OneTimeWorkRequest dựa trên Worker đó, sau đó enqueue nhiệm vụ với WorkManager:
    
    OneTimeWorkRequest compressionWork =
        new OneTimeWorkRequest.Builder(CompressWorker.class)
    .build();
    WorkManager.getInstance().enqueue(compressionWork);
WorkManager chọn một thời điểm thích hợp để chạy tác vụ.Trong hầu hết các trường hợp, nếu bạn không chỉ định bất kỳ ràng buộc nào, WorkManager sẽ chạy tác vụ của bạn ngay lập tức. Nếu bạn cần kiểm tra trạng thái tác vụ, bạn có thể lấy đối tượng WorkStatus bằng cách xử lý LiveData<WorkStatus>. Ví dụ: nếu bạn muốn kiểm tra xem tác vụ đã hoàn tất chưa, bạn có thể sử dụng mã như sau:

    WorkManager.getInstance().getStatusById(compressionWork.getId())
    .observe(lifecycleOwner, workStatus -> {
        // Do something with the status
        if (workStatus != null && workStatus.getState().isFinished())
        { ... }
    });
Để hiểu thêm về LiveData, các bạn xem tại [đây](https://developer.android.com/topic/libraries/architecture/livedata)
### 
### **Task constraints ( Sự ràng buộc)**

Nếu muốn, bạn có thể chỉ định các ràng buộc khi nhiệm vụ được chạy. Ví dụ: bạn có thể muốn chỉ định rằng tác vụ chỉ nên chạy khi thiết bị ở chế độ chờ và kết nối với nguồn. Trong trường hợp này, bạn cần tạo một đối tượng OneTimeWorkRequest.Builder và sử dụng trình tạo đó để tạo OneTimeWorkRequest:


    // Tạo sự ràng buộc, khi nào thì task được thực thi
    Constraints myConstraints = new Constraints.Builder()
    .setRequiresDeviceIdle(true)
    .setRequiresCharging(true)
    // Có rất nhiều ràng buộc có sẵn.
    // Tham khảo tại Constraints.Builder 
     .build();

    // ...sau đó tạo một OneTimeWorkRequest sử dụng các ràng buộc đó
     OneTimeWorkRequest compressionWork =
                new OneTimeWorkRequest.Builder(CompressWorker.class)
     .setConstraints(myConstraints)
     .build();

    
### **Canceling a Task**

Bạn có thể hủy một task sau khi bạn enqueue nó. Để hủy tác vụ, bạn cần ID task đó, mà bạn có thể nhận được từ đối tượng WorkRequest. Ví dụ, đoạn mã sau hủy bỏ yêu cầu compressionWork từ phần trước:

    UUID compressionWorkId = compressionWork.getId();
    WorkManager.getInstance().cancelByWorkId(compressionWorkId);
WorkManager cố gắng hết sức để hủy tác vụ, nhưng điều này vốn dĩ không chắc chắn - nhiệm vụ có thể đã chạy hoặc kết thúc khi bạn cố hủy nó. WorkManager cũng cung cấp các phương thức để hủy bỏ tất cả các nhiệm vụ trong một chuỗi công việc duy nhất, hoặc tất cả các nhiệm vụ với một thẻ (TAG) được chỉ định.

### **Advanced functionality (Nâng cao)**
API WorkManager cung cấp các tính năng nâng cao cho phép bạn thiết lập các yêu cầu phức tạp.

**Recurring tasks(Nhiệm vụ định kỳ)**

Bạn có thể có một nhiệm vụ mà bạn cần phải thực hiện nhiều lần. Ví dụ: ứng dụng trình quản lý ảnh sẽ không muốn nén ảnh một lần. Nhiều khả năng, nó sẽ muốn kiểm tra hình ảnh được chia sẻ của nó thường xuyên như vậy, và xem nếu có bất kỳ hình ảnh mới hoặc thay đổi cần phải được nén. Tác vụ lặp lại này có thể nén hình ảnh mà nó tìm thấy, hoặc cách khác, nó có thể kích hoạt 1 tác vụ mới : "nén hình ảnh này".

Để tạo một nhiệm vụ định kỳ, sử dụng lớp PeriodicWorkRequest.Builder để tạo một đối tượng PeriodicWorkRequest, sau đó enqueue PeriodicWorkRequest giống như cách bạn sẽ làm đối tượng OneTimeWorkRequest. Ví dụ, giả sử chúng ta định nghĩa một lớp PhotoCheckWorker để xác định các hình ảnh cần được nén. Nếu chúng ta muốn chạy tác vụ kiểm kê mỗi 12 giờ, chúng ta sẽ tạo một đối tượng PeriodicWorkRequest như sau:

    new PeriodicWorkRequest.Builder photoWorkBuilder =
        new PeriodicWorkRequest.Builder(PhotoCheckWorker.class, 12,
                TimeUnit.HOURS);
    // ...nếu bạn muốn, bạn có thể áp dụng các ràng buộc  ở đây ...
    
    PeriodicWorkRequest photoWork = photoWorkBuilder.build();
    //  enqueue task:
    WorkManager.getInstance().enqueue(photoWork );

WorkManager cố gắng chạy nhiệm vụ của bạn tại khoảng thời gian bạn yêu cầu, tùy thuộc vào các ràng buộc mà bạn áp đặt và các yêu cầu khác của nó.


**Chained tasks ( Chuỗi công việc)**

Ứng dụng của bạn có thể cần chạy một số tác vụ theo một thứ tự cụ thể. WorkManager cho phép bạn tạo và enqueue một chuỗi công việc xác định nhiều nhiệm vụ và thứ tự chúng sẽ chạy.

Ví dụ: giả sử ứng dụng của bạn có ba đối tượng OneTimeWorkRequest: workA, workB và workC. Các nhiệm vụ phải được chạy theo thứ tự đó. Để enqueue chúng, tạo một chuỗi với phương thức WorkManager.beginWith (), truyền đối tượng OneTimeWorkRequest đầu tiên; phương thức đó trả về một đối tượng WorkContinuation, nó định nghĩa một chuỗi các nhiệm vụ. Sau đó, thêm các đối tượng OneTimeWorkRequest còn lại, theo thứ tự, với WorkContinuation.then (), và cuối cùng, enqueue toàn bộ chuỗi với WorkContinuation.enqueue ():

Hơi khó hiểu đúng không? :D  Xem ví dụ nhé:

    WorkManager.getInstance()
    .beginWith(workA)
        // Note: WorkManager.beginWith()  trả về 1 đối tượng WorkContinuation
    .then(workB)    // FYI, then() cũng trả về 1 thể hiện của WorkContinuation
    .then(workC)
    .enqueue();

WorkManager chạy các tác vụ theo thứ tự được yêu cầu, theo các ràng buộc cụ thể của mỗi tác vụ. Nếu bất kỳ tác vụ nào trả về Worker.WorkerResult.FAILURE, toàn bộ chuỗi sẽ kết thúc.

Bạn cũng có thể truyền nhiều đối tượng OneTimeWorkRequest cho bất kỳ lệnh gọi startsWith () và .then () nào. Nếu bạn truyền một số đối tượng OneTimeWorkRequest cho một cuộc gọi phương thức duy nhất, WorkManager sẽ chạy tất cả các tác vụ đó (song song) trước khi nó chạy phần còn lại của chuỗi. Ví dụ:

    WorkManager.getInstance()
    // First, run all the A tasks (in parallel):
    .beginWith(workA1, workA2, workA3)
    // ...when all A tasks are finished, run the single B task:
    .then(workB)
    // ...then run the C tasks (in any order):
    .then(workC1, workC2)
    .enqueue();

Bạn có thể tạo các chuỗi phức tạp hơn bằng cách nối nhiều chuỗi với các phương thức WorkContinuation.combine (). Ví dụ: giả sử bạn muốn chạy một chuỗi như sau:

   ![](https://images.viblo.asia/ccf04218-3aaf-4276-a364-2827074b572d.PNG)
   
Để thiết lập trình tự này, hãy tạo hai chuỗi riêng biệt, sau đó ghép chúng lại với nhau thành một chuỗi thứ ba:

    WorkContinuation chain1 = WorkManager.getInstance()
    .beginWith(workA)
    .then(workB);
    WorkContinuation chain2 = WorkManager.getInstance()
    .beginWith(workC)
    .then(workD);
    WorkContinuation chain3 = WorkContinuation
    .combine(chain1, chain2)
    .then(workE);
    chain3.enqueue();

Trong trường hợp này, WorkManager chạy workA trước khi làm việc. Nó cũng hoạt động trước khi làm việc. Sau khi cả hai công việc và workD đã hoàn thành, WorkManager chạy workE.

Có một số biến thể của phương thức WorkContinuation cung cấp viết tắt cho các tình huống cụ thể. Ví dụ, có một phương thức WorkContinuation.combine (OneTimeWorkRequest, WorkContinuation…), hướng dẫn WorkManager hoàn thành tất cả các chuỗi WorkContinuation đã chỉ định, sau đó kết thúc với OneTimeWorkRequest được chỉ định. Để biết chi tiết, xem [WorkContinuation](https://developer.android.com/reference/androidx/work/WorkContinuation) nhé.

**Unique work sequences (một chuỗi công việc duy nhất)**

Bạn có thể tạo một chuỗi công việc duy nhất, bằng cách bắt đầu chuỗi với một cuộc gọi đến beginUniqueWork () thay vì beginWith (). Mỗi chuỗi công việc duy nhất có một tên; WorkManager chỉ cho phép một chuỗi công việc với tên đó tại một thời điểm. Khi bạn tạo một chuỗi công việc duy nhất mới, bạn chỉ định những gì WorkManager sẽ làm nếu có một chuỗi chưa hoàn thành có cùng tên:
* Hủy chuỗi hiện tại và thay thế bằng trình tự mới
* Giữ chuỗi hiện tại và bỏ qua yêu cầu mới của bạn
* Nối chuỗi mới của bạn vào chuỗi hiện tại, chạy tác vụ đầu tiên của chuỗi mới sau khi tác vụ cuối cùng của chuỗi hiện tại kết thúc.

Một chuỗi công việc duy nhất có thể hữu ích nếu bạn có một nhiệm vụ không nên được enqueued nhiều lần. Ví dụ: nếu ứng dụng của bạn cần đồng bộ hóa dữ liệu với mạng, bạn có thể enqueue một chuỗi có tên là "sync" và chỉ định rằng tác vụ mới của bạn sẽ bị bỏ qua nếu đã có một chuỗi có tên đó. Một chuỗi công việc duy nhất cũng có thể hữu ích nếu bạn cần dần dần xây dựng một chuỗi nhiệm vụ dài. Ví dụ: ứng dụng chỉnh sửa ảnh có thể cho phép người dùng hoàn tác một chuỗi hành động dài. Mỗi hoạt động hoàn tác có thể mất một thời gian, nhưng chúng phải được thực hiện đúng thứ tự. Trong trường hợp này, ứng dụng có thể tạo chuỗi "hoàn tác" và nối thêm từng hoạt động hoàn tác vào chuỗi khi cần.

**Tagged work ( Task được gắn thẻ)**

Bạn có thể nhóm các nhiệm vụ của bạn một cách hợp lý bằng cách gán một chuỗi thẻ cho bất kỳ đối tượng WorkRequest nào. Để đặt thẻ, hãy gọi WorkRequest.Builder.addTag (), ví dụ:

    OneTimeWorkRequest cacheCleanupTask =
        new OneTimeWorkRequest.Builder(MyCacheCleanupWorker.class)
    .setConstraints(myConstraints)
    .addTag("cleanup")
    .build();

Các lớp WorkManager cung cấp một số phương thức tiện ích cho phép bạn thao tác trên tất cả các nhiệm vụ với một thẻ cụ thể. Ví dụ, WorkManager.cancelAllWorkByTag () hủy bỏ tất cả các nhiệm vụ với một thẻ cụ thể, và WorkManager.getStatusesByTag () trả về một danh sách tất cả các WorkStatus cho tất cả các tác vụ với thẻ đó.

**Input parameters and returned values**

Để linh hoạt hơn, bạn có thể chuyển đối số cho công việc của mình và có nhiệm vụ trả về kết quả. Các giá trị được trả về và trả về là các cặp khóa-giá trị. Để chuyển một đối số cho một nhiệm vụ, hãy gọi phương thức WorkRequest.Builder.setInputData () trước khi bạn tạo đối tượng WorkRequest. Phương thức đó lấy một đối tượng Data, mà bạn tạo ra với Data.Builder. Lớp Worker có thể truy cập các đối số đó bằng cách gọi hàm Worker.getInputData (). Để xuất ra một giá trị trả về bạn  sử dụng Worker.setOutputData (), lấy một đối tượng Data, bạn có thể lấy kết quả bằng cách quan sát LiveData <WorkStatus>.

Ví dụ, giả sử bạn có một lớp Worker thực hiện một phép tính tốn thời gian. Đoạn mã sau cho thấy lớp Worker sẽ trông như thế nào:
        
    // Define the Worker class:
    public class MathWorker extends Worker {

    // Define the parameter keys:
    public static final String KEY_X_ARG = "X";
    public static final String KEY_Y_ARG = "Y";
    public static final String KEY_Z_ARG = "Z";
    // ...and the result key:
    public static final String KEY_RESULT = "result";

    @Override
    public Worker.WorkerResult doWork() {


        // Fetch the arguments (and specify default values):
        int x = getInputData().getInt(KEY_X_ARG, 0);
        int y = getInputData().getInt(KEY_Y_ARG, 0);
        int z = getInputData().getInt(KEY_Z_ARG, 0);

        // ...do the math...
        int result = myCrazyMathFunction(x, y, z);

        //...set the output, and we're done!
        Data output = new Data.Builder()
            .putInt(KEY_RESULT, result)
            .build();
        setOutputData(output);
        return WorkerResult.SUCCESS;
    }
    }

Để tạo công việc và chuyển các đối số, bạn sẽ sử dụng mã như sau:
    
    // Create the Data object:
    Data myData = new Data.Builder()
        // We need to pass three integers: X, Y, and Z
        .putInt(KEY_X_ARG, 42)
        .putInt(KEY_Y_ARG, 421)
        .putInt(KEY_Z_ARG, 8675309)
        // ... and build the actual Data object:
        .build();

    // ...then create and enqueue a OneTimeWorkRequest that uses those arguments
    OneTimeWorkRequest.Builder argsWorkBuilder =
              new OneTimeWorkRequest.Builder(MathWorker.class)
        .setInputData(myData);
    OneTimeWorkRequest mathWork = argsWorkBuilder.build();
    WorkManager.getInstance().enqueue(mathWork);
    
Giá trị trả về sẽ có sẵn trong WorkStatus của tác vụ:

    WorkManager.getInstance().getStatusById(mathWork.getId())
    .observe(lifecycleOwner, status -> {
         if (status != null) {
           int myResult =
               status.getOutputData().getInt(KEY_RESULT,
                  myDefaultValue));
    // ... do something with the result ...
         }
    });

Nếu bạn có một chuỗi nhiệm vụ, kết quả đầu ra từ một nhiệm vụ có sẵn như là đầu vào cho nhiệm vụ tiếp theo trong chuỗi. Nếu đó là một chuỗi đơn giản, với một OneTimeWorkRequest duy nhất được theo sau bởi một OneTimeWorkRequest khác, tác vụ đầu tiên trả về kết quả của nó bằng cách gọi hàm setOutputData () và nhiệm vụ tiếp theo sẽ lấy kết quả đó bằng cách gọi phương thức getInputData (). Nếu chuỗi phức tạp hơn - ví dụ, bởi vì một số tác vụ gửi đầu ra tới một tác vụ duy nhất sau đây, bạn có thể định nghĩa một InputMerger trên OneTimeWorkRequest.Builder để xác định điều gì sẽ xảy ra nếu các tác vụ khác nhau trả về đầu ra có cùng khóa.

## Lời kết
Phù, cuối cùng cũng hết rồi. Đây là lần đầu tiên mình viết bài nên nếu có sai xót gì nhờ anh em đóng góp. Mình sẽ viết loạt bài về các component trong Android Jetpack và các bài viết mang tính chất chia sẻ kinh nghiệm, rất mong được anh em ủng hộ.
Bài viết này mình tham khảo và dịch từ trang developer android, anh em có thể xem bản gốc tại [đây](https://developer.android.com/topic/libraries/architecture/workmanager)

Nếu anh em hứng thú với WorkManager thì có thể mình sẽ viết phần 2 về WorkManager với source code demo nhé.:D