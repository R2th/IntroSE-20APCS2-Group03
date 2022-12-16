# Tìm hiểu về Operation và Operation Queue trong Swift
Đã bao giờ bạn sử dụng ứng dụng gặp trường hợp thao tác với giao diện như nhập text, nhấn button mà phải chờ một lúc sau và đột nhiên ứng dụng bị chết. Hoặc cũng có trường hợp bạn thao tác và phải chờ phản hồi rất lâu. Đó là khi ứng dụng của bạn đang phải xử lý rất nhiều các thao tác, không có thời gian thực hiện các thao tác trong main thread mà vẫn phải cung cấp UI cho người dùng. Vậy khi đó, các lập trình viên cần làm gì để xử lý cho ứng dụng chạy một cách mượt mà?
Trong bài viết này, chúng ta sẽ tìm hiểu về Operation và Operation Queue đã thực hiện như thế nào để giải quyết vấn đề trên nhé!

## Mở đầu
Bài viết sẽ đưa ra một sample project để mọi người cùng theo dõi cách thức hoạt động của Operation và Operation Queue. Đó là trường hợp hiển thị một list ảnh vào tableview. Hình ảnh được download từ internet, sau đó qua filter và hiển thị lên tableview. Cụ thể là theo flow như hình vẽ:

![](https://images.viblo.asia/e61e626a-1e80-4af0-acbd-d926e469c7c2.png)

Bước đầu, chúng ta hãy tạo 1 project và hiển thị hình ảnh lên tableview mà chưa áp dụng Operation.

![](https://images.viblo.asia/c5ff5228-fc6d-4b03-9ba7-b79f40cfe9a8.png)

Các action trong project diễn ra trong **ListViewController.swift**, và hầu hết là trong hàm `tableView(_:cellForRowAtIndexPath:)`
2 thao tác chính được thực hiện trong hàm này là:

*  **Lấy hình ảnh từ trên Internet xuống**
*  **Lọc hình ảnh.**

Thêm vào đó, lấy list danh sách hình ảnh được lấy xuống trong lần request đầu tiên khi mở app.
Tất cả những công việc trên đều được thực hiện trong main thread của ứng dụng. Do main thread còn phải đảm nhận việc hiển thị UI cho người dùng, do vậy các thao tác dowload và filter ảnh quá nhiều sẽ dẫn tới chết app.
## Tasks, Threads and Processes
Trước tiên chúng ta cần hiểu rõ một số keyword quan trọng

* **Task**: Hiểu đơn giản đó là 1 phần của công việc và cần phải thực hiện.
* **Thread**: Là cơ chế được quản lý bởi hệ thống, cho phép thực hiện nhiều task cùng một thời điểm trong ứng dụng.
* **Processes**: Là một đoạn mã code có thể thực hiện nhiều thread.

Biểu đồ dưới đây sẽ cho thấy rõ hơn mối quan hệ giữa task, thread và processes:
![](https://images.viblo.asia/9aa7f3bd-0cff-4a09-8023-20d413ecb31d.png)
Như ta có thể thấy, process có thể thực hiện nhiều thread, và một thread có thẻ thực hiện nhiều task.
## Operation vs. Grand Central Dispatch (GCD)

Grand Central Dispath (GCD) là một low-level API của iOS để quản lý các tác vụ đồng thời. 
Operation và Operation Queue được xây dựng dựa trên GCD tuy nhiên dùng operation ta có thể thêm sự phụ thuộc giữa các operation, tái sử dụng, huỷ hoặc buộc dừng chúng.
Trong bài hướng dẫn này, chúng ta sẽ sử dụng Operation vì yêu cầu của bài toán là hiển thị hình ảnh lên tableview, nên chúng ta cần phải có cơ chế huỷ operation trong trường hợp hình ảnh bị cuộn ra khỏi màn hình để đảm bảo hiệu xuất của ứng dụng.

## Xác định các Operation cần sử dụng và tạo Model
Các task chính mà ứng dụng cần thực hiện được thể hiện trong hình ảnh dưới đây:
![](https://images.viblo.asia/cf34b0f0-9ec5-448b-8184-8b7230ab3edc.png)
Nhìn vào hình ảnh ta có thể thấy rõ cần chia ra làm 3 thread chính: Thread để download hình ảnh từ trên mạng xuống, thread để filter hình ảnh sau khi đã download, và main thread sẽ chỉ đảm nhận việc hiển thị UI cho người dùng tương tác.
Luồng thực hiện như sau:
* Download list image để biết được có bao nhiêu row sẽ hiển thị trên screen.
* Thực hiện download các image mà có hiển thị trên screen.
* Task filter sẽ chỉ được thực hiện khi hoàn thành xong task download
* Cuối cùng là sẽ hiển thị hình ảnh lên cell.

Flow thực hiện như sau:
![](https://images.viblo.asia/717afd64-66fb-42ba-be20-370eace20e93.png)

Bây giờ chúng ta sẽ bắt đầu code theo hướng trên.
Trong XCode tạo file **PhotoOperations.swift**, và viết như sau:

```
import UIKit

// Các trạng thái mà ảnh có thể có
enum PhotoRecordState {
  case new, downloaded, filtered, failed
}

class PhotoRecord {
  let name: String
  let url: URL
  var state = PhotoRecordState.new
  var image = UIImage(named: "Placeholder")
  
  init(name:String, url:URL) {
    self.name = name
    self.url = url
  }
}
```
Để theo dõi các trạng thái của đối tượng ảnh, chúng ta tạo một class tên là PendingOperations

```
class PendingOperations {
  lazy var downloadsInProgress: [IndexPath: Operation] = [:]
  lazy var downloadQueue: OperationQueue = {
    var queue = OperationQueue()
    queue.name = "Download queue"
    queue.maxConcurrentOperationCount = 1
    return queue
  }()
  
  lazy var filtrationsInProgress: [IndexPath: Operation] = [:]
  lazy var filtrationQueue: OperationQueue = {
    var queue = OperationQueue()
    queue.name = "Image Filtration queue"
    queue.maxConcurrentOperationCount = 1
    return queue
  }()
}
```
Class này chứa 2 dictionary để theo dõi các trạng thái download và filter của image trên mỗi row của table tương ứng với mỗi operation queue.
Tất cả các biến được tạo ra đều để ở là lazy để chúng không được khởi tạo cho tới khi được truy cập. Điều này làm tăng hiệu năng của ứng dụng.
Tạo một `OperationQueue` rất đơn giản. Tên của queue được đặt ra để giúp việc debug, bởi vì tên sẽ được hiển thị ở Instruments hoặc debugger. `maxConcurrentOperationCount = 1` cho phép hoàn thành từng operation một. Bạn có thể cho phép queue quyết định có bao nhiêu operation có thể thực hiện trong 1 lúc tuỳ vào việc cải thiện hiệu năng của ứng dụng.

Tiếp theo, chúng ta sẽ quan tâm tới thực hiện download và filter operation. Thêm đoạn code sau vào file **PhotoOperations.swift** :
```
class ImageDownloader: Operation {
  //1
  let photoRecord: PhotoRecord
  
  //2
  init(_ photoRecord: PhotoRecord) {
    self.photoRecord = photoRecord
  }
  
  //3
  override func main() {
    //4
    if isCancelled {
      return
    }

    //5
    guard let imageData = try? Data(contentsOf: photoRecord.url) else { return }
    
    //6
    if isCancelled {
      return
    }
    
    //7
    if !imageData.isEmpty {
      photoRecord.image = UIImage(data:imageData)
      photoRecord.state = .downloaded
    } else {
      photoRecord.state = .failed
      photoRecord.image = UIImage(named: "Failed")
    }
  }
}
```
**Operation** là một abstract class. Mỗi một **Operation** sẽ thực hiện một **task**.
Nhìn vào đoạn code trên ta có thể phân tích các bước như sau:
1. Thêm 1 biến `photoRecord` hứa các thông tin của operation.
2. Khởi tạo với đầu vào là `photoRecord`
3. `main()` là phương thức cần được override trong Operation, thực hiện các công việc của operation.
4. Kiểm tra việc huỷ trước khi bắt đầu. Operation nên được kiểu ra nếu họ đã từng huỷ hay không trước khi thực hiện công việc.
5. Download dữ liệu.
6. Kiểm tra lại việc huỷ
7. Nếu có dữ liêu, khởi tạo đối tượng image và thêm vào thuộc tính image của photoRecord. Thay đổi trạng thái của photoRecord. Trong trường hợp không có data thì đánh dấu state của photoRecord là failed.
Bước tiếp, chúng ta tạo một operation khác để thực hiện filtering image. Thêm đoạn code sau vào **PhotoOperations.swift**:
```
class ImageFiltration: Operation {
  let photoRecord: PhotoRecord
  
  init(_ photoRecord: PhotoRecord) {
    self.photoRecord = photoRecord
  }
  
  override func main () {
    if isCancelled {
        return
    }
      
    guard self.photoRecord.state == .downloaded else {
      return
    }
      
    if let image = photoRecord.image, 
       let filteredImage = applySepiaFilter(image) {
      photoRecord.image = filteredImage
      photoRecord.state = .filtered
    }
  }
}
```
Đoạn code này tương tự như đoạn code download ở trên, thay hàm main() bằng việc thực hiện filter image.
Như vậy là đã xong các operation để phục vụ. Bây giờ sẽ quay lại ListViewController.swift để sử dụng chúng.
```
var photos: [PhotoRecord] = []
let pendingOperations = PendingOperations()
```
Thêm mảng đối tượng PhotoRecord và PendingOperations để quản lý các operation.
Thêm phương thức để thực hiện download list ảnh như sau:
```
func fetchPhotoDetails() {
  let request = URLRequest(url: dataSourceURL)
  UIApplication.shared.isNetworkActivityIndicatorVisible = true

  // 1
  let task = URLSession(configuration: .default).dataTask(with: request) { data, response, error in

    // 2
    let alertController = UIAlertController(title: "Oops!",
                                            message: "There was an error fetching photo details.",
                                            preferredStyle: .alert)
    let okAction = UIAlertAction(title: "OK", style: .default)
    alertController.addAction(okAction)

    if let data = data {
      do {
        // 3
        let datasourceDictionary =
          try PropertyListSerialization.propertyList(from: data,
                                                     options: [],
                                                     format: nil) as! [String: String]

        // 4
        for (name, value) in datasourceDictionary {
          let url = URL(string: value)
          if let url = url {
            let photoRecord = PhotoRecord(name: name, url: url)
            self.photos.append(photoRecord)
          }
        }

        // 5
        DispatchQueue.main.async {
          UIApplication.shared.isNetworkActivityIndicatorVisible = false
          self.tableView.reloadData()
        }
        // 6
      } catch {
        DispatchQueue.main.async {
          self.present(alertController, animated: true, completion: nil)
        }
      }
    }

    // 6
    if error != nil {
      DispatchQueue.main.async {
        UIApplication.shared.isNetworkActivityIndicatorVisible = false
        self.present(alertController, animated: true, completion: nil)
      }
    }
  }
  // 7
  task.resume()
}
```

Các bước thực hiện cụ thể như sau:
1. Tạo URLSession để download list hình ảnh từ luồng background.
2. Khởi tạo UIAlertControler để sử dụng khi thông báo lỗi.
3. Nếu yêu cầu thành công, tạo một dictionary từ  list, sau đó dictionary sử dụng tên hình ảnh làm key và URL làm value.
4. Tạo đối tượng photoRecord và thêm vào dictionary.
5. Trả kaij main thread để tải lại tableview và hiển thị hình ảnh.
6. Hiển thị alert trong trường hợp có lỗi. Chú ý rằng, URLSession được thực hiện ở background nhưng việc thông báo lỗi phải được thực hiện ở trong main thread.
7. Chạy download task.

Gọi phương thức `fetchPhotoDetails()` trong hàm `viewDidLoad()`
Tiếp theo sẽ xử lý trong hàm `tableView(_:cellForRowAtIndexPath:)` như sau:
```
override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
  let cell = tableView.dequeueReusableCell(withIdentifier: "CellIdentifier", for: indexPath)
  
  //1
  if cell.accessoryView == nil {
    let indicator = UIActivityIndicatorView(activityIndicatorStyle: .gray)
    cell.accessoryView = indicator
  }
  let indicator = cell.accessoryView as! UIActivityIndicatorView
  
  //2
  let photoDetails = photos[indexPath.row]
  
  //3
  cell.textLabel?.text = photoDetails.name
  cell.imageView?.image = photoDetails.image
  
  //4
  switch (photoDetails.state) {
  case .filtered:
    indicator.stopAnimating()
  case .failed:
    indicator.stopAnimating()
    cell.textLabel?.text = "Failed to load"
  case .new, .downloaded:
    indicator.startAnimating()
    startOperations(for: photoDetails, at: indexPath)
  }
  
  return cell
}
```
Cụ thể như sau:
1. Thông báo trạng thái cho người dùng thông quá `UIActivityIndicatiorView`
2. Lấy photoRecord của từng cell thông qua indexPath.
3. Set các thuộc tính cho cell
4. Kiểm tra state sau đó thực hiện các operation theo từng trạng thái.
Phương thức để bắt đầu các operation như sau:
```
func startOperations(for photoRecord: PhotoRecord, at indexPath: IndexPath) {
  switch (photoRecord.state) {
  case .new:
    startDownload(for: photoRecord, at: indexPath)
  case .downloaded:
    startFiltration(for: photoRecord, at: indexPath)
  default:
    NSLog("do nothing")
  }
}
func startDownload(for photoRecord: PhotoRecord, at indexPath: IndexPath) {
  //1
  guard pendingOperations.downloadsInProgress[indexPath] == nil else {
    return
  }
      
  //2
  let downloader = ImageDownloader(photoRecord)
  
  //3
  downloader.completionBlock = {
    if downloader.isCancelled {
      return
    }

    DispatchQueue.main.async {
      self.pendingOperations.downloadsInProgress.removeValue(forKey: indexPath)
      self.tableView.reloadRows(at: [indexPath], with: .fade)
    }
  }
  
  //4
  pendingOperations.downloadsInProgress[indexPath] = downloader
  
  //5
  pendingOperations.downloadQueue.addOperation(downloader)
}
    
func startFiltration(for photoRecord: PhotoRecord, at indexPath: IndexPath) {
  guard pendingOperations.filtrationsInProgress[indexPath] == nil else {
      return
  }
      
  let filterer = ImageFiltration(photoRecord)
  filterer.completionBlock = {
    if filterer.isCancelled {
      return
    }
    
    DispatchQueue.main.async {
      self.pendingOperations.filtrationsInProgress.removeValue(forKey: indexPath)
      self.tableView.reloadRows(at: [indexPath], with: .fade)
    }
  }
  
  pendingOperations.filtrationsInProgress[indexPath] = filterer
  pendingOperations.filtrationQueue.addOperation(filterer)
}
```
Cụ thể như sau:
1. Dựa vào indexPath để biết được downloadsInProgress đã được thực hiện chưa. Nếu đã thực hiện rồithif bỏ qua yêu cầu.
2. Nếu không, ta khởi tao ImageDownloader
3. Thêm completion block, cái mà sẽ thực hiện khi operation hoàn thành. Đây là nơi để ứng dụng biết được operation đã kết thúc.
4. Thêm operation vào dowloadsInProgress để theo dõi. 
5. Thêm operation vào download queue để thực hiện download.
Với việc filter thì thực hiện tương tự như download.

Vậy là chúng ta đã thực hiện xong, bây giờ hãy build ứng dụng và theo dõi thành quả. 
 
![](https://images.viblo.asia/47726bbd-a515-4742-a167-d1a9abde364f.png)

## Kết luận

Trên đây là các hướng dẫn cụ thể để chúng ta hình dung ra hoạt động và cách sử dụng operation trong trường hợp cụ thể. Cảm ơn các bạn đã đọc!
Link tham khảo: https://www.raywenderlich.com/5293-operation-and-operationqueue-tutorial-in-swift