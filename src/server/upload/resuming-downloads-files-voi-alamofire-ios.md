### Resuming downloads Files với Alamofire trên iOS
Ở bài trước mình có nói về việc Downloading Files với Alamofire iOS  các bạn có thể xem ở bài này  https://viblo.asia/p/downloading-files-voi-alamofire-ios-07LKX2O2lV4 để tiếp tục với chủ đề này thì hôm nay sẽ hướng dẫn mọi người cách Resuming downloads Files với Alamofire trên iOS Khi quá trình tải xuống bị cancelled (theo yêu cầu của người dùng hoặc do lỗi mạng hoặc nội bộ mất mạng hay máy bị hết pin ... ) :v
Có thể bạn đang đặt câu hỏi vì sao Alamofire lại là thư viện được dùng để thay thế mà không phải là một thư viện khác? Apple cung cấp class NSURLSession tại sao không dùng nó và một số class khác liên quan, tại sao chúng ta vẫn cần tới thư viện Alamofire?
Câu trả lời là Alamofire cũng dựa trên nền tảng NSURLSession nhưng bạn hãy thử so sánh việc sử dụng NSURLSession và Alamofire sau tutorial này xem thế nào nhé bạn sẽ thấy thích thú khi sử dụng Alamofire. Việc bạn viết code có sử dụng Alamofire thì dễ viết code, rõ ràng, đơn giản.

### Save resume data
Vào vấn đề chính :v
Khi quá trình tải xuống bị cancelled (theo yêu cầu của người dùng hoặc do lỗi mạng hoặc nội bộ mất mạng hay máy bị hết pin ), Alamofire gọi trình xử lý phản hồi nơi nó có thể handler lỗi đó và xử lý dữ liệu tiếp tục. Cả iOS và Alamofire, đều không tự động lưu dữ liệu để tiếp tục tải xuống file khi xảy ra sự cố. Để hỗ trợ tiếp tục tải xuống, bước đầu tiên là lưu dữ liệu trong bộ đệm để có thể sử dụng lại sau này khi muốn tải xuống lại.

Chúng ta hãy xem cách handle resume data trong block từ Alamofire.
```
if let error = defaultDownloadResponse.error {  
  log.warning("Download Failed with error - \(error)")
  self.onError(.Download)
  if let resumeData = defaultDownloadResponse.resumeData {
    Shared.dataCache.set(value: resumeData, key: self.url)
  }
  return
}
```
Chúng tôi sẽ sử dụng data cache from Haneke trong bài đăng này https://github.com/Haneke/HanekeSwift để lưu trữ dữ liệu resume. Nếu bạn đang sử dụng một thư viện khác hoặc đã triển khai triển khai bộ đệm của riêng mình, bạn cần thay đổi các lần xuất hiện của Shared.dataCache để phù hợp với việc triển khai của bạn.

### Resume download from saved data
Tiếp tục tải xuống từ dữ liệu đã lưu bước tiếp theo là cung cấp dữ liệu tiếp tục tải xuống.
Đầu tiên lấy dữ liệu từ bộ nhớ cache

```
Shared.dataCache.fetch(key: url).onSuccess {resumeData in  
  self.startDownload(with: resumeData)
}.onFailure {_ in
  self.startDownload()
}
```
Bây giờ cung cấp dữ liệu này khi bắt đầu tải xuống. Alamofire làm cho điều này thực sự đơn giản. Tất cả những gì chúng ta cần là thêm phần tiếp tục bổ sung với thông số khi tạo yêu cầu.

`Alamofire.download(resumingWith: resumeData, to: destination)  `

```
internal func beginDownload() {  
  UIApplication.shared.isIdleTimerDisabled = true

  self.downloadProgressView?.setProgress(value: 0, animationDuration: 0)

  if SYSTEM_VERSION_LESS_THAN(version: "10.0") || SYSTEM_VERSION_GREATER_THAN(version: "10.2") {
    Shared.dataCache.fetch(key: url).onSuccess {resumeData in
      self.startDownload(with: resumeData)
    }.onFailure {_ in
      self.startDownload()
    }
  } else {
    self.startDownload()
  }
}

private func startDownload(with resumeData: Data? = nil) {  
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

  if let resumeData = resumeData {
    downloadRequest = Alamofire.download(resumingWith: resumeData, to: destination)
  } else {
    downloadRequest = Alamofire.download(url, to:destination)
  }

  downloadRequest?.downloadProgress {progress in
    DispatchQueue.main.async {
      self.downloadProgressView?.setProgress(value: CGFloat(progress.fractionCompleted * 100), animationDuration: 0.1)
    }
  }.response { defaultDownloadResponse in
    if let error = defaultDownloadResponse.error {
      log.warning("Download Failed with error - \(error)")
      self.onError(.Download)
      if let resumeData = defaultDownloadResponse.resumeData {
        Shared.dataCache.set(value: resumeData, key: self.url)
      }
      return
    }
    guard let downloadedFilePath = self.downloadedFilePath else { return }
    log.debug("Downloaded file successfully to \(downloadedFilePath)")
    self.unzipFile(at: downloadedFilePath)
  }
}
```
http://pulkitgoyal.in/resuming-downloads-on-ios/
Đó là tất cả những gì bạn cần để supporting pause và resume on your iOS apps.. Lần tới sẽ có bài  tích hợp tải xuống trong một ứng dụng.