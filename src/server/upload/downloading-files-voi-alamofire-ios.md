### Giới thiệu
Với lượng dữ liệu ngày càng tăng hiện nay được sử dụng bởi các ứng dụng di động, việc đa số các ứng dụng cho phép tải xuống dữ liệu để hỗ trợ cho các chức năng ngoại tuyến trở nên phổ biến hơn . Dữ liệu được tải xuống có thể hỗ trợ các trò chơi sách điện tử cho người đọc hoặc tệp nhạc / video cho trình phát video / nhạc.
Thông thường, các ứng dụng triển khai trình quản lý tải xuống của riêng họ quên một khía cạnh rất quan trọng của quy trình này là cho phép người dùng tạm dừng tải xuống và tiếp tục lại sau khi họ có kết nối internet tốt hơn.

### Downloading Files
iOS hỗ trợ để tải xuống tệp bằng NSURLCconnectection  Foundation. Một đối tượng NSURLConnection cho phép bạn tải nội dung của URL bằng cách cung cấp một URL request object. NSURLConnection rất ít chỉ cung cấp các điều khiển cơ bản để bắt đầu tải và hủy  không đồng bộ .

### Alamofire

Có một số công cụ và thư viện đã được xây dựng để giúp bạn dễ dàng sử dụng hơn. Thay vì dùng NSURLC Connectection, chúng ta hãy thử thiết lập các bản tải xuống bằng cách sử dụng Alamofire giúp đơn giản hóa rất nhiều các tác vụ tải xuống.

Ở đây rất đơn giản để bắt đầu tải các tệp xuống  bằng cách sử dụng Alamofire.doad. Để nơi lưu file tải xuống,  sử dụng  DownloadFileDestination . Cuối cùng, để bắt được các bản cập nhật và tiến độ tải xuống, chúng ta dùng downloadProTHER. Nếu bạn muốn thực hiện một số thay đổi đối với giao diện người dùng (ví dụ: cập nhật tải file), hãy sử dụng DispatchQueue.main.async để thực hiện các cập nhật trên Giao diện người dùng.

```
private func beginDownload() {  
   UIApplication.shared.isIdleTimerDisabled = true

   self.downloadProgressView?.setProgress(value: 0, animationDuration: 0)

   let destination: DownloadRequest.DownloadFileDestination = {temporaryURL, response in
     if let suggestedFileName = response.suggestedFilename {
       do {
         let directory = try Utils.tempDirectory()
         self.downloadedFilePath = (directory + suggestedFileName)
         if let downloadedFilePath = self.downloadedFilePath {
           if downloadedFilePath.exists { try self.downloadedFilePath?.deleteFile() }
           return (URL(fileURLWithPath: downloadedFilePath.rawValue), [.removePreviousFile, .createIntermediateDirectories])
         }
       } catch let e {
         log.warning("Failed to get temporary directory - \(e)")
       }
     }

     let (downloadedFileURL, _) = DownloadRequest.suggestedDownloadDestination()(temporaryURL, response)
     self.downloadedFilePath = Path(downloadedFileURL.absoluteString)
     return (downloadedFileURL, [.removePreviousFile, .createIntermediateDirectories])
   }

   downloadRequest = Alamofire.download(url, to:destination).downloadProgress {progress in
     DispatchQueue.main.async {
         self.downloadProgressView?.setProgress(value: CGFloat(progress.fractionCompleted * 100), animationDuration: 0.1)
     }
   }.response { defaultDownloadResponse in
     // TODO: Handle cancelled error
     if let error = defaultDownloadResponse.error {
         log.warning("Download Failed with error - \(error)")
         self.onError(.Download)
         return
     }
     guard let downloadedFilePath = self.downloadedFilePath else { return }
     log.debug("Downloaded file successfully to \(downloadedFilePath)")
     // TODO: Handle downloaded file
   }
 }
```
### Common File Utilities

Tôi thường sử dụng các chức năng tiện ích phổ biến để truy cập các vị trí thư mục trong toàn bộ ứng dụng (Đây là sử dụng Đường dẫn từ FileKit, vì vậy hãy đảm bảo bạn thêm nó vào Podfile hoặc Cartfile nếu bạn cũng dự định sử dụng các tiện ích này). 
[](http://cocoadocs.org/docsets/FileKit/1.3.0/)

```
class Utils {  
  internal static func tempDirectory() throws -> Path {
    return try self.directoryInsideDocumentsWithName(name: "temp")
  }

  internal static func directoryInsideDocumentsWithName(name: String, create: Bool = true) throws -> Path {
   let directory = Path(NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)[0]) + name
   if create && !directory.exists {
     try directory.createDirectory()
   }
   return directory
  }
}
```
Tất cả những gì bạn cần để tích hợp một thành phần tải xuống đơn giản trong ứng dụng của bạn sử dụng Alamofire đơn giản hơn rất nhiều. Bài sau sẽ nói về cách Resuming downloads bằng Alamofire .