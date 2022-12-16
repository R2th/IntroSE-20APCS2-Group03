Grand Central Dispatch (GCD) là một framework được cung cấp bởi Apple, được phát hành vào năm 2009 với OS X Snow Leopard & iOS 4. Nó cung cấp API dễ sử dụng cho các nhà phát triển để chạy các tác vụ nền bằng cách tạo hàng đợi theo kiểu nối tiếp hoặc đồng thời mà không cần quản lý threads của chính họ

GCD tóm tắt việc gán các luồng để tính toán vào dispatch queue. Developer chỉ cần dispatch queue của riêng họ hoặc họ có thể sử dụng Apple cung cấp sẵn trong dispatch queue global với several built-in Quality of Service (QoS) được tích hợp sẵn từ người dùng  interactive, người dùng khởi tạo, tiện ích và nền. GCD sẽ tự động handle việc gán thread trong nhóm thread.

### Creating DispatchQueue, DispatchGroup, & DispatchSemaphore

Để tạo tất cả các instances của 3 cái đó, chúng ta chỉ có thể khởi tạo chúng bằng lớp tương ứng của chúng, sau đó gán nó cho một biến như vậy. Bộ intializer DispatchQueue được cung cấp một số nhận dạng duy nhất (sử dụng tên miền ngược dns làm quy ước), sau đó chúng tôi đặt các thuộc tính thành đồng thời để chúng tôi có thể thực hiện nhiều công việc song song không đồng bộ. Chúng  cũng đặt giá trị DispatchSemaphore bằng cách sử dụng MaximumAsyncTaskCount để giới hạn số lượng tác vụ tải xuống đồng thời. Cuối cùng, chúng ta cũng đảm bảo disable tương tác của người dùng với tất cả các buttons, sliders và switch khi operation bắt đầu.
```swift    
@objc func startOperation() {
        downloadTasks = []
        completedTasks = []
        
        navigationItem.rightBarButtonItem?.isEnabled = false
        randomizeTimeSwitch.isEnabled = false
        tasksCountSlider.isEnabled = false
        maxAsyncTasksSlider.isEnabled = false
        
        let dispatchQueue = DispatchQueue(label: "com.alfianlosari.test", qos: .userInitiated, attributes: .concurrent)
        let dispatchGroup = DispatchGroup()
        let dispatchSemaphore = DispatchSemaphore(value: option.maxAsyncTasks)
    
  }

 ```
 
### Creating The Download Tasks & Handling State Update
Tiếp theo, chúng ta chỉ tạo các tasks dựa trên số lượng tối đa, Tổng số Job từ property. Mỗi DownloadTask được instantiated với một identifier, sau đó  update trạng thái clouse, chúng ta pass the callback. Dưới đây là callback implementation:

1. Sử dụng task identifier, chúng ta lấy index của task từ array downloadTask
2. Ở trạng thái completed, chúng ta chỉ cần remove task khỏi mảng downloadTasks, sau đó insert task vào chỉ số mảng completeTasks bằng index zero. DownloadTasks và completeTasks có một trình property observer sẽ trigger phương thức reloadData trong chế độ xem bảng tương ứng của chúng.

3. Trong trạng thái inProgress, chúng ta truy xuất cell từ downloadTableView bằng phương thức cellForIndexPath:, sau đó chúng ta configure method  chuyển state mới. Cuối cùng, chúng ta cũng kích hoạt tableView beginUpdates và endUpdates trong trường hợp chiều cao của ô thay đổi.

 ```swift    
 @objc func startOperation() {
        // ...
        
        downloadTasks = (1...option.jobCount).map({ (i) -> DownloadTask in
            let identifier = "\(i)"
            return DownloadTask(identifier: identifier, stateUpdateHandler: { (task) in
                DispatchQueue.main.async { [unowned self] in
                    
                    guard let index = self.downloadTasks.indexOfTaskWith(identifier: identifier) else {
                        return
                    }
                    
                    switch task.state {
                    case .completed:
                        self.downloadTasks.remove(at: index)
                        self.completedTasks.insert(task, at: 0)
                        
                    case .pending, .inProgess(_):
                        guard let cell = self.downloadTableView.cellForRow(at: IndexPath(row: index, section: 0)) as? ProgressCell else {
                            return
                        }
                        cell.configure(task)
                        self.downloadTableView.beginUpdates()
                        self.downloadTableView.endUpdates()
                    }
                }
            })
        })
        
 }

 ```
 
 **Starting the Task Operation into DispatchGroup**
 
  ```swift    
  @objc func startOperation() {
        // ...
        downloadTasks.forEach {
            $0.startTask(queue: dispatchQueue, group: dispatchGroup, semaphore: dispatchSemaphore, randomizeTime: self.option.isRandomizedTime)
        }
  }
  
  class DownloadTask {
    
    var progress: Int = 0
    let identifier: String
    let stateUpdateHandler: (DownloadTask) -> ()
    var state = TaskState.pending {
        didSet {
            self.stateUpdateHandler(self)
        }
    }
    
    init(identifier: String, stateUpdateHandler: @escaping (DownloadTask) -> ()) {
        self.identifier = identifier
        self.stateUpdateHandler = stateUpdateHandler
    }
    
    func startTask(queue: DispatchQueue, group: DispatchGroup, semaphore: DispatchSemaphore, randomizeTime: Bool = true) {
        queue.async(group: group) { [weak self] in
            group.enter()
            semaphore.wait()
            self?.state = .inProgess(5)
            self?.startSleep(randomizeTime: randomizeTime)
            self?.state = .inProgess(20)
            self?.startSleep(randomizeTime: randomizeTime)
            self?.state = .inProgess(40)
            self?.startSleep(randomizeTime: randomizeTime)
            self?.state = .inProgess(60)
            self?.startSleep(randomizeTime: randomizeTime)
            self?.state = .inProgess(80)
            self?.startSleep(randomizeTime: randomizeTime)
            self?.state = .completed
            group.leave()
            semaphore.signal()
        }
    }
    
    private func startSleep(randomizeTime: Bool = true) {
        Thread.sleep(forTimeInterval: randomizeTime ? Double(Int.random(in: 1...3)) : 1.0)

    }
}

   ```
   
**Using DispatchGroup notify to receive notification of completed jobs**
   
   ```swift    
   
   @objc func startOperation() {
        // ...
        dispatchGroup.notify(queue: .main) { [unowned self] in
            self.presentAlertWith(title: "Info", message: "All Download tasks has been completed 😋😋😋")
            self.navigationItem.rightBarButtonItem?.isEnabled = true
            self.randomizeTimeSwitch.isEnabled = true
            self.tasksCountSlider.isEnabled = true
            self.maxAsyncTasksSlider.isEnabled = true
        }
    }
     
    ```