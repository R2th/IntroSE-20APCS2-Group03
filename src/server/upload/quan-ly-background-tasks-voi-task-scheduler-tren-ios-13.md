Trong bài viết này, tôi sẽ thảo luận về  BackgroundTasks framework được giới thiệu trong **WWDC** vừa rồi.

**Apple** đã phát hành một framework tuyệt vời khác trong năm này, và lần này là **BackgroundTasks** framework. Chúng ta có thể sử dụng nó để lập lịch và kiểm soát các điều kiện thực thi của các tác vụ ở background. **BackgroundTasks** framework cho phép bạn lập kế hoạch và chạy công việc ở background theo các tiêu chí bắt buộc  như pin đang sạc, tính khả dụng của kết nối, vv... **BackgroundTasks** framework có nhiều kiểu tác vụ khác nhau. Giờ chúng ta cùng xem xét nhé.

# Tác vụ làm mới ứng dụng

**BGAppRefreshTask** là một kiểu tác vụ đặc biệt của  **Background Task**  mà bạn có thể sử dụng để cập nhật dữ liệu ứng dụng. Một điều làm cho tác vụ này rất đặc biệt đó là hành vi người dùng. iOS tìm hiểu tần suất và thời gian người dùng đang chạy ứng dụng của bạn và cố gắng chạy **BGAppRefreshTask** ở thời điểm mà người dùng không sử dụng app. 

Hãy triển khai một *background app* làm mới cho sample app. Trước hết, bạn cần phải thêm *background modes capability* trong project settings. Tiếp theo, bạn cần thêm **“Background fetch”** checkbox, cái được yêu cầu trong việc làm mới ứng dùng background. Cuối cùng, bạn cần thêm **“Permitted background task scheduler identifiers”** key vào Info.plist. Key này sẽ lưu trữ mảng unique identifiers cho mọi **background task** trong ứng dụng. Cuối cùng, bạn đã có đầy đủ những điều kiện để bắt đầu xử lý logic của background refresh.


```
import UIKit
import BackgroundTasks

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        BGTaskScheduler.shared.register(
            forTaskWithIdentifier: "pl.snowdog.example.refresh",
            using: DispatchQueue.global()
        ) { task in
            self.handleAppRefresh(task)
        }
        return true
    }

    private func handleAppRefresh(_ task: BGTask) {
        let queue = OperationQueue()
        queue.maxConcurrentOperationCount = 1
        let appRefreshOperation = AppRefreshOperation()
        queue.addOperation(appRefreshOperation)

        task.expirationHandler = {
            queue.cancelAllOperations()
        }

        let lastOperation = queue.operations.last
        lastOperation?.completionBlock = {
            task.setTaskCompleted(success: !(lastOperation?.isCancelled ?? false))
        }

        scheduleAppRefresh()
    }
}
```


Chúng ta bắt đầu bằng việc đăng ký t*ask identifier*  và *associated closure*. Closure này sẽ chạy trên mọi việc thực thi tác vụ. Trong **handleAppRefresh** function, chúng ta chạy xử lý background.

Có hai điểm chính ở đây:

1.  Đảm bảo bạn gọi **setTaskCompleted** method ngay khi công việc kết thúc.

2.  Đặt expiration handler trên task object bơi vì hệ thống cho bạn khoảng thời gian giới hạn để hoàn thành công việc và nếu vượt quá, bạn sẽ phải giải phóng tài nguyên.

Hãy nhớ rằng, bạn chỉ có thể lập lịch một lần cho một công việc, bạn phải lập lịch cho nó mỗi lần nếu muốn thực hiện định kỳ.


```
    func applicationDidEnterBackground(_ application: UIApplication) {
        scheduleAppRefresh()
    }

    private func scheduleAppRefresh() {
        do {
            let request = BGAppRefreshTaskRequest(identifier: "pl.snowdog.example.refresh")
            request.earliestBeginDate = Date(timeIntervalSinceNow: 3600)
            try BGTaskScheduler.shared.submit(request)
        } catch {
            print(error)
        }
    }
```


# Tác vụ xử lý background

Một loại background tasks khác là **Processing task**. Bạn có thể sử dụng nó để huấn luyện một ML Model trên thiết bị hoặc dọn dẹp cơ sở dữ liệu. Trước khi bắt đầu, cần bật “Background processing” checkbox trong Background Modes capability. Hãy thêm một identifier khác cho kiểu tác vụ này vào Info.plist.


```
import UIKit
import BackgroundTasks

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        BGTaskScheduler.shared.register(
            forTaskWithIdentifier: "pl.snowdog.example.train",
            using: DispatchQueue.global()
        ) { task in
            self.handleMLTrain(task)
        }
        return true
    }

    private func scheduleMLTrain() {
        do {
            let request = BGProcessingTaskRequest(identifier: "pl.snowdog.example.train")
            request.requiresExternalPower = true
            request.requiresNetworkConnectivity = true
            try BGTaskScheduler.shared.submit(request)
        } catch {
            print(error)
        }
    }
}
```


Lập lịch cho processing task giống với app refresh task. Hãy xem **scheduleMLTrain** function. Hãy đặt requiresExternalPower và  requiresNetworkConnectivity properties  bằng true. Bằng cách này, bạn đã chỉ ra rằng, công việc chúng ta cần kết nối mạng và sạc pin. Tôi khuyến khích bạn thực hiện các công việc tính toán nặng nề trong khi thiết bị đang được sạc để hao pin và làm xấu trải nghiệm người dùng.


# Debugging

Cách duy nhất để gỡ lỗi background tasks là giữ thiết bị của bạn kết nối với Xcode debugger, nhưng chúng ta không biết khi nào iOS sẽ chạy các tác vụ của mình vì nó thực hiện các logic ẩn. Rất may, Apple cung cấp hai phương thức trong debugger để bắt đầu và hết hạn các background tasks. Hãy ghi nhớ rằng, bạn có thể dùng nó trong quá trình phát triển, và không bao gồm trong bản release. 

Để bắt đầu các background tasks, tạm dừng ứng dụng và chạy trong Debugger đoạn code này:

```
e -l objc — (void)[[BGTaskScheduler sharedScheduler] _simulateLaunchForTaskWithIdentifier:@”TASK_IDENTIFIER”]
```

Để buộc ngưng sử dụng:

```
e -l objc — (void)[[BGTaskScheduler sharedScheduler] _simulateExpirationForTaskWithIdentifier:@”TASK_IDENTIFIER”]
```


Nhớ thay thế **TASK_IDENTIFIER** bằng identifier thực tế.

# Kết luận

**BackgroundTasks** framework  là một cách tuyệt vời để lập lịch cho các tác vụ nặng nề của bạn đêm lại trải nghiệm tốt nhất bằng việc sử dụng các điều kiện môi trường. Apple đã cung cấp hàng loạt frameworks mới trong năm nay, tôi sẽ cố gắng cập nhật nhiều chủ đề mới ở các bài viết sau.

Cảm ơn!

[Refer](https://medium.com/snowdog-labs/managing-background-tasks-with-new-task-scheduler-in-ios-13-aaabdac0d95b)