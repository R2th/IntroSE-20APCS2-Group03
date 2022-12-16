# Giới thiệu
Trong bài viết này mình xin chia sẻ tất tần tật về URLSession, cách tạo HTTP requests cũng như implement background download rằng có thể vừa paused vừa resumed.
Một ứng dụng cơ bản cần có các chức năng có thể get để lấy dữ liệu từ server, update các trạng thái hay download remote file tới bộ nhớ. Để phục vụ cho anh em những thứ trên thì Apple đã cung cấp URLSession - là một networking API cho việc uploading và downloading content.
# Bắt đầu nào !!!
Trước tiên chúng ta vào [link này](https://koenig-media.raywenderlich.com/uploads/2019/06/URLSession-Materials.zip) để download materials cho demo này.
Build và run project này thì bạn sẽ nhìn thấy một view bao gồm một search bar ở trên top và một empty tableview ở ngay bên dưới search bar.
![](https://images.viblo.asia/195a80d0-d94a-43ec-b368-ced52ffff8b6.png)
## URLSession Overview
Trước khi bắt đầu chúng ta nên xem qua kiến trúc của URLSession. Nó bao gồm một class và một bộ các class cho việc handling HTTP/HTTPS-based requests.
![](https://images.viblo.asia/443eaf0c-96f3-48f6-a217-d424e93a9de7.png)
URLSession là đối tượng chịu trách nhiệm chính cho việc gửi và nhận HTTP requests. Bạn có thể tạo một URLSessionConfiguration - cái mà có 3 loại phục vụ cho từng mục đích sử dụng:
* `.default`: Tạo một đối tượng default configuration để sử dụng cho việc lưu trữ đối tượng trên disk-persisted global cache, credential và cookie.
* `.ephemeral`: Cũng tương tự như `.default` configuration. Ngoại trừ tất cả những session-related tới dữ liệu được lưu trữ trong bộ nhớ. Có thể hiểu là "private" sesstion
* `.background`: Đối với loại này cho phép thực hiện việc upload hay download tasks trong background. Tiếp tục ngay cả khi app rơi vào trạng thái suspended hay terminated.
Ngoài ra `URLSessionConfiguration` cũng cho phép bạn cấu hình sesstion properties như là timeout values, caching polocies và thêm headers cho HTTP. Bạn có thể vào [link này](https://developer.apple.com/reference/foundation/urlsessionconfiguration) của apple doc để có thể xem được full list configuration options.

`URLSesssionTask` là một class trừu tượng (abstract class) để biểu thị cho một task object. Một session có thể tạo được một hoặc nhiều tasks để thực hiện công việc fetching data và downloading hay uploading files. Có 3 kiểu cho session task:
* `URLSessionDataTask`: Sử dụng task này cho HTTP GET requests để nhận data từ server về.
* `URLSessionUploadTask`: Sử dụng task này để upload file tới server, có 2 kiểu cho loại này đó là HTTP POST hoặc PUT
* `URLSessionDownloadTask`: Sử dụng task này để download file từ server tới vị trí file tạm thời.
![](https://images.viblo.asia/61b01279-4df7-46b9-a0d5-028e7e86ff7a.png)
Bạn có thể suspend, resume và cancel tasks. `URLSessionDownloadTask` cho phép pause và tiếp tục download.
Thông thường thì `URLSession` trả về data theo 2 hướng: một là task finishes hay là successfully hai là một error - những cái này sẽ được gọi trên methods của delegate khi mà tạo sesssion.
Trên đây là những lý thuyết để cho bạn có cái nhìn tổng quan về `URLSession`. Bây giờ ta sẽ dựa vào những kiến thức này để lao vào giải quyết bài toán trong thực tế nhé !

## Data Task
Ở demo này thì sẽ sử dụng [iTunes Search API](https://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html) cho các request mà user search.

Phần này chúng ta sẽ tạo một data task để query phục vụ cho việc khi user search.
Các bạn mở SearchViewController + SearchBarDelegate thì `searchBarSearchButtonClicked(_:)` bắt sự kiện khi người dùng search. Ta sẽ thực hiện gọi query server tại đây - nó sẽ gọi vào `getSearchResults(searchTerm:completion:)` 
Class quản lý cho việc query service này là `QueryService`.
Trong `QueryService.swift` chúng ta khởi tạo một `URLSession` và một `URLSessionDataTask`

```
// 1
let defaultSession = URLSession(configuration: .default)
// 2
var dataTask: URLSessionDataTask?
```

Ở đây thì URLSessionDataTask có kiểu `.default` và một biến URLSessionDataTask để bạn sẽ tạo một GET request iTunes Search web service khi user xác nhận search. Cái thằng `dataTask` này nó sẽ khởi tạo lại mỗi lần mà user enters một new search.

Tiếp tục trong class `QueryService` với method `getSearchResults(searchTerm: String, completion: @escaping QueryResult)` - method này sẽ phục vụ việc GET data từ server về với đầu vào là `searchTerm` và có một closure để hứng result khi completion. Ta sẽ implementation cho method này:
```
func getSearchResults(searchTerm: String, completion: @escaping QueryResult) {
  // 1
  dataTask?.cancel()
  // 2
  if var urlComponents = URLComponents(string: "https://itunes.apple.com/search") {
    urlComponents.query = "media=music&entity=song&term=\(searchTerm)"
    // 3
    guard let url = urlComponents.url else { return }
    // 4
    dataTask = defaultSession.dataTask(with: url) { data, response, error in
      defer { self.dataTask = nil }
      // 5
      if let error = error {
        self.errorMessage += "DataTask error: " + error.localizedDescription + "\n"
      } else if let data = data,
        let response = response as? HTTPURLResponse,
        response.statusCode == 200 {
        self.updateSearchResults(data)
        // 6
        DispatchQueue.main.async {
          completion(self.tracks, self.errorMessage)
        }
      }
    }
    // 7
    dataTask?.resume()
  }
}

```
1. Với mỗi query mới thì ta sẽ cancel data task để reuse lại data task cho việc thực hiện new query.
2. Tạo một `URLComponents` với đầu vào là base URL và sau đó thực hiện query cho URLComponents đó.
3. Optional-bind url property of `urlComponents` to `url`
4. Gán data task với một URLSessionDataTask có query `url` và một completion closure handler khi mà data task completes.
5. Nếu HTTP request successful, thì sẽ call method `updateSearchResults` với đầu vào là một response `data`
6. Cập nhật lại data cho mảng tracks
7. Call `resume()` để starts data task

Build và run lại rồi thử search và bạn sẽ nhìn thấy tableView đã có dữ liệu rồi.
![](https://images.viblo.asia/f99fb745-0e68-4895-ae12-c1e154a0a502.png)
Như vậy `URLSession` đã được thêm vào rồi. App demo đã thêm được chức năng search tên bài hát rồi.
Tiếp tục ta sẽ làm việc với `Download Task` để có thể tap vào bài hát đó và download nó về và dễ dàng lưu trữ nó lên local file.
## Welcome to DownloadTask
Để dễ dàng cho việc quản lý cũng như clear thì ta sẽ tạo thêm một class Download để có thể dễ dàng handle multiple downloads.
![](https://images.viblo.asia/8cf8988f-06dd-422f-97c1-48be27866c9b.png)
```
class Download {

  var track: Track
  init(track: Track) {
    self.track = track
  }

  // Download service sets these values:
  var task: URLSessionDownloadTask?
  var isDownloading = false
  var resumeData: Data?

  // Download delegate sets this value:
  var progress: Float = 0

}
```

* Ở trên đây thì class này sẽ có một property là track với kiểu `Track`. url property of track chính là một identifier cho một `Donwload`
* task: là `URLSessionDownloadTask`để download track
* isDownloading: trạng thái cho việc download 
* resumeData: lưu trữ `Data` khi người sử dụng pause một download task.
* progress: tiến độ cho việc download: từ 0.0 tới 1.0

Tiếp theo trong class DownloadService.swift ta sẽ add thêm property `activeDownloads`
```
var activeDownloads: [URL: Download] = [:]

```
Cái này phục vụ cho việc mapping giữa URL và Download.

## URLSessionDownloadDelegate
Với việc tạo download task thì bạn có thể tạo một completion handles giống như data task bạn vừa tạo ở trên. Nhưng trong demo này ta sẽ implementation cho việc update và display download progress cho việc download bài hát đó nên ta sẽ cần implement một custom delegate - cái này sẽ phục vụ rất tốt cho yêu cầu trên.
Ta có một vài sesion delegate protocols, bạn có thể tham khảo thêm ở [apple doc](https://developer.apple.com/reference/foundation/urlsession)
Implementation thôi nào! Chúng ta sẽ vào `SearchViewController.swift` rồi add thêm extension cho nó.
```
extension SearchViewController: URLSessionDownloadDelegate {
  func urlSession(_ session: URLSession, downloadTask: URLSessionDownloadTask, 
    didFinishDownloadingTo location: URL) { 
    print("Finished downloading to \(location).")
  }
}
```

Ở đây thì method này handle cho việc donwload finish.
## Creating a Download Task

Trong class SearchViewController ta sẽ khởi tạo một `URLSession` để phục vụ cho việc download task. 
```
lazy var downloadsSession: URLSession = {
  let configuration = URLSessionConfiguration.default
  return URLSession(configuration: configuration, delegate: self, delegateQueue: nil)
}()

```
Đây ta khởi tại `URLSessionConfiguration` với kiểu là default. setting delegateQueue là nil bởi vì session được tạo là một serial operation queue để cho phép tất cả các delegate methods và completion handlers được gọi. Và có một chú ý đó là `downloadSession` là lazy cho phép bạn delay lại init parametter này sau khi view controller được inited.
Tiếp theo ta thêm đoạn mã này trong hàm viewDidload():
```
downloadService.downloadsSession = downloadsSession
```
Như vậy ta đã có session và delegate configured. Tiếp theo ta sẽ tạo một download task khi user request một track download.

Trong DownloadService.swift ta sẽ implementation trong method `startDownload(_ track: Track)` như sau:
```
func startDownload(_ track: Track) {
  // 1
  let download = Download(track: track)
  // 2
  download.task = downloadsSession.downloadTask(with: track.previewURL)
  // 3
  download.task!.resume()
  // 4
  download.isDownloading = true
  // 5
  activeDownloads[download.track.previewURL] = download
}

```
1. Khởi tạo một Download với track
2. Sử dụng một URLSession mới và tạo một downloadTask với previewURL sau đó gán nó với task của Download
3. Bắt đầu download bằng cách gọi resume()
4. Update trạng thái là downloading
5. Maping download url trong activeDownloads dictionary


Build và run và thử tap vào download thì sau một lúc bạn sẽ nhìn thấy message trong debug console là `Finished downloading`.
![](https://images.viblo.asia/8cca35ef-a7e3-4947-a2b4-155745c2015a.png)
 Tiếp theo ta sẽ play và save nó lại nhé.
## Saving and Playing the Track
`urlSession(_:downloadTask:didFinishDownloadingTo:)` chính thằng này sẽ cung cấp cho ta temporary file location sau khi download finish. Nhiệm vụ của ta là sẽ di chuyển nó tới nơi cần trước khi nó được trả ra từ method này
Ta sẽ implementation lại method này như sau:
```
// 1
guard let sourceURL = downloadTask.originalRequest?.url else { return }
let download = downloadService.activeDownloads[sourceURL]
downloadService.activeDownloads[sourceURL] = nil
// 2
let destinationURL = localFilePath(for: sourceURL)
print(destinationURL)
// 3
let fileManager = FileManager.default
try? fileManager.removeItem(at: destinationURL)
do {
  try fileManager.copyItem(at: location, to: destinationURL)
  download?.track.downloaded = true
} catch let error {
  print("Could not copy file to disk: \(error.localizedDescription)")
}
// 4
if let index = download?.track.index {
  DispatchQueue.main.async {
    self.tableView.reloadRows(at: [IndexPath(row: index, section: 0)], with: .none)
  }
}
```
Build và run project. Sau khi download xong thì bạn sẽ nhìn thấy path location ở console. Như của mình thì nó sẽ như thế này:
```
file:///Users/macbook/Library/Developer/CoreSimulator/Devices/F712430D-AA5E-4371-9D62-9277D6A99CCD/data/Containers/Data/Application/8EFB5994-7060-40EB-B464-5356555562C5/Documents/mzaf_15004041856361393205.plus.aac.p.m4a
```

Sau khi finish download then button download disappear because `download?.track.downloaded = true`. Tiếp tục tap vào cell thì bạn sẽ thấy trình AVPlayerViewController hiện thị lên như dưới đây:
![](https://images.viblo.asia/ad4193cd-e15e-4266-8b02-0edc6443ecc4.png)

## Pausing, Resuming and Cancelling Downloads
Tiếp theo ta sẽ implementation cho việc pause, cancel, resume a download.
Trong class DownloadService ta sẽ implementation method cancelDownload(_:) 
```
func cancelDownload(_ track: Track) {
  if let download = activeDownloads[track.previewURL] {
    download.task?.cancel()
    activeDownloads[track.previewURL] = nil
  }
}
```
Tiếp theo là `pauseDownload(_:)`:
```
func pauseDownload(_ track: Track) {
  guard let download = activeDownloads[track.previewURL] else { return }
  if download.isDownloading {
    download.task?.cancel(byProducingResumeData: { data in
      download.resumeData = data
    })
    download.isDownloading = false
  }
}
```

Có một điều khác nhau ở 2 method trên! Không biết các bạn có nhận ra không =)) Đó chính là `cancel(byProducingResumeData:)` thay vì `cancel()`. Trong đó bạn cung cấp một closure parameter cái mà bạn sẽ lưu lại resume data để phục vụ cho việc resume tiếp.
Bạn cũng set `download.isDownloading = false` nhằm để biểu thị là download is pause.
Tiếp theo đó là mothod `resumeDownload(_ track: Track)` như sau:
```
func resumeDownload(_ track: Track) {
  guard let download = activeDownloads[track.previewURL] else { return }
  if let resumeData = download.resumeData {
    download.task = downloadsSession.downloadTask(withResumeData: resumeData)
  } else {
    download.task = downloadsSession.downloadTask(with: download.track.previewURL)
  }
  download.task!.resume()
  download.isDownloading = true
}
```
Ở đây thì mình sẽ check nếu download đó tồn tại resumeData thì tiếp tục download với resumeData đó còn nếu chưa thì sẽ khởi tạo session mới với đầu vào là previewURL cho downloadSession đó.
Và cuối cùng nhớ set cờ isDownloading là true nhé `download.isDownloading = true`

Về mặt UI cho cell để trực quan hoá các trạng thái download thì ta sẽ implementation thêm cho TrackCell.swift 
Ta sẽ sửa lại một chúe cho hàm configure trong TrackCell.swift thành:
`func configure(track: Track, downloaded: Bool, download: Download?) {`
và đồng nghĩa trong SearchViewController sẽ fix lại trong tableView(_:cellForRowAt)
`cell.configure(track: track, downloaded: track.downloaded, 
  download: downloadService.activeDownloads[track.previewURL])`

 Tiếp tục ta sẽ thêm trong hàm configure như sau:

 ```
 var showDownloadControls = false
 ```

```
downloadButton.isHidden = downloaded || showDownloadControls
```

Build và run. Download một vài track và bạn có thể pause, resume và cancel

![](https://images.viblo.asia/ca800170-fff0-4dcb-a701-9881dbf1d86f.png)

Tiếp theo ta sẽ hiện thị ra download progress cho bài đang được download.

## Showing Download Progress
Đầu tiên ta sẽ implement progress trong TrackCell.swift 
```
func updateDisplay(progress: Float, totalSize : String) {
  progressView.progress = progress
  progressLabel.text = String(format: "%.1f%% of %@", progress * 100, totalSize)
}
```
Delegate method sẽ call phương thức này để set value cho progress.
Để gọi delegate method đó ra ta sẽ qua SearchVC+URLSessionDelegates.swift và add `URLSessionDownloadDelegate` extension.
```
func urlSession(_ session: URLSession, downloadTask: URLSessionDownloadTask, 
  didWriteData bytesWritten: Int64, totalBytesWritten: Int64, 
  totalBytesExpectedToWrite: Int64) {
  // 1
  guard let url = downloadTask.originalRequest?.url,
    let download = downloadService.activeDownloads[url]  else { return }
  // 2
  download.progress = Float(totalBytesWritten) / Float(totalBytesExpectedToWrite)
  // 3
  let totalSize = ByteCountFormatter.string(fromByteCount: totalBytesExpectedToWrite, countStyle: .file)
  // 4
    DispatchQueue.main.async {
    if let trackCell = self.tableView.cellForRow(at: IndexPath(row: download.track.index,
      section: 0)) as? TrackCell {
      trackCell.updateDisplay(progress: download.progress, totalSize: totalSize)
    }
  }
}
```
Ở trong method này thì nó đã cung cấp `totalBytesWritten` và `totalBytesExpectedToWrite` thì ta sẽ dựa vào đây để tính ra được progress.
Build và run project thì ta sẽ được như sau:
![](https://images.viblo.asia/b2701eb1-1a06-4476-941d-a5ddf51ee38a.png)

Ở trên thì ta đang download với trong khi app đang ở trạng thái hoạt động, bây giờ ta sẽ tranfer cho app có thể download khi đang ở background.
## Enabling Background Transfers
Mờ file SearchViewController.swift thay vì sử dụng default session configuration, ta sẽ đổi qua background session configuration.
Để handle task completes khi app không running thì bạn cần handle event đó từ app delegate.
```
func application(_ application: UIApplication, handleEventsForBackgroundURLSession 
  identifier: String, completionHandler: @escaping () -> Void) {
  backgroundSessionCompletionHandler = completionHandler
}

```

Và 

```
extension SearchViewController: URLSessionDelegate {

  // Standard background session handler
  func urlSessionDidFinishEvents(forBackgroundURLSession session: URLSession) {
    DispatchQueue.main.async {
      if let appDelegate = UIApplication.shared.delegate as? AppDelegate,
        let completionHandler = appDelegate.backgroundSessionCompletionHandler {
        appDelegate.backgroundSessionCompletionHandler = nil
        completionHandler()
      }
    }
  }

}
```

DONE! Build và run rồi cảm nhận nhé các bạn

# Tổng kết:
Cảm ơn mọi người đã theo dõi và đọc bài viết này. Như vậy mình đã giới thiệu tổng quan về URLSession chính và chủ yếu của nó thông qua ví dụ rất trực quan. 

# Tham khảo:
- Bài viết tham khảo từ [raywenderlich](https://www.raywenderlich.com/567-urlsession-tutorial-getting-started)
- https://developer.apple.com/documentation/