## 1. Chọn files trong device
### 1.1 Chọn file
Để chọn được files trong iOS bạn có thể dùng **UIDocumentPickerViewController**

Ví dụ:
```
import UIKit
import MobileCoreServices // Bạn cần import MobileCoreServices vì kiểu dữ liệu của files (PDF, PNG, ....) được định nghĩa ở đây

class ViewController: UIViewController {

    func showFilePicker() {
        // kUTTypePDF là lọc files PDF, bạn có thể thêm nhiều kiểu dữ liệu khác nếu cần.
        let documentPicker = UIDocumentPickerViewController(documentTypes: [kUTTypePDF as NSString as String],
                                                            in: .import)
        documentPicker.delegate = self
        documentPicker.modalPresentationStyle = .formSheet
        if #available(iOS 11.0, *) {
            documentPicker.allowsMultipleSelection = false
        }
        self.present(documentPicker, animated: true, completion: nil)
    }

}

extension ViewController: UIDocumentPickerDelegate {

    func documentPicker(_ controller: UIDocumentPickerViewController, didPickDocumentAt url: URL) {
        print(url)
    }

    func documentPicker(_ controller: UIDocumentPickerViewController, didPickDocumentsAt urls: [URL]) {
        print(urls)
    }

    func documentPickerWasCancelled(_ controller: UIDocumentPickerViewController) {
    }

}
```

### 1.2 Lấy kích thước của file

```
let size = sizeForLocalFilePath(filePath: url.path)

func sizeForLocalFilePath(filePath: String) -> UInt64 {
    do {
        let fileAttributes = try FileManager.default.attributesOfItem(atPath: filePath)
        if let fileSize = fileAttributes[FileAttributeKey.size]  {
            return (fileSize as! NSNumber).uint64Value
        } else {
            print("Failed to get a size attribute from path: \(filePath)")
        }
    } catch {
        print("Failed to get file attributes for local path: \(filePath) with error: \(error)")
    }
    return 0
}
```

## 2. Mở file
Để mở 1 file bạn có thể dùng **UIDocumentInteractionController**. Bạn cần truyền vào file đã được download về device nhé, chứ files URL trỏ đến server thì không mở được đâu :D

```
class ViewController: UIViewController {

    var documentInteractionController: UIDocumentInteractionController?

    func openDocument(fileUrl: URL) {
        documentInteractionController = UIDocumentInteractionController(url: fileUrl)
        documentInteractionController?.delegate = self
        documentInteractionController?.presentPreview(animated: true)
    }

}

extension ViewController: UIDocumentInteractionControllerDelegate {

    func documentInteractionControllerViewControllerForPreview(
        _ controller: UIDocumentInteractionController) -> UIViewController {
        return self
    }

}
```

## 3. Download file

Việc download file thì có vô vàn cách + libs hỗ trợ. Nhưng trong bài này mình sẽ dùng **URLSessionDownloadTask** default của iOS nhé:

```
class ViewController: UIViewController {

    var downloadTask: URLSessionDownloadTask?
    var backgroundSession: URLSession?

}

extension ViewController {

    func downloadFile(documentUrl: URL) {
        let backgroundSessionConfiguration = URLSessionConfiguration.background(withIdentifier: "backgroundSession")
        backgroundSession = Foundation.URLSession(configuration: backgroundSessionConfiguration, delegate: self,
                                                  delegateQueue: OperationQueue.main)
        let request = URLRequest(url: documentUrl)
        downloadTask = backgroundSession?.downloadTask(with: request)
        downloadTask?.resume()
        // Show loading ở đây nhé
    }

    // Hàm này để lưu file dựa theo tên file mà server trả về
    fileprivate func getDestinationFileUrl(response: URLResponse) -> URL {
        var docsURL = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
        let filename = response.suggestedFilename ?? "file.pdf"
        docsURL.appendPathComponent(filename)
        return docsURL
    }

}

extension ViewController: URLSessionDownloadDelegate {

    func urlSession(_ session: URLSession, downloadTask: URLSessionDownloadTask, didWriteData bytesWritten: Int64,
                    totalBytesWritten: Int64, totalBytesExpectedToWrite: Int64) {
        let progress = CGFloat(totalBytesWritten) / CGFloat(totalBytesExpectedToWrite)
        print("progress: \(progress)")
        // Hiển thị progress nếu thích :D
    }

    func urlSession(_ session: URLSession, downloadTask: URLSessionDownloadTask, didFinishDownloadingTo location: URL) {
        // Ẩn loading
        guard let response = downloadTask.response else {
            print(downloadTask.error?.localizedDescription ?? "Loading file error.")
            return
        }
        let destinationURL = getDestinationFileUrl(response: response)

        // Đoạn này mình xoá file cũ đi nếu có (logic app mình thế ;) )
        let fileManager = FileManager.default
        if fileManager.fileExists(atPath: destinationURL.path) {
            try? fileManager.removeItem(at: destinationURL)
        }
        do {
            try fileManager.moveItem(at: location, to: destinationURL)

            // Mở file đã download được
            openDocument(fileUrl: destinationURL)
        } catch {
            print(error)
        }
    }

    func urlSession(_ session: URLSession, task: URLSessionTask, didCompleteWithError error: Error?) {
        // Ẩn loading
        print(error)
    }

}
```

## 4. Upload file
Trong ví dụ này mình sẽ dùng Alamofire để upload 1 ảnh png nhé 
```
func requestWith(endUrl: String, imageData: Data?, parameters: [String : Any],
                 onCompletion: ((Any?) -> Void)? = nil,
                 onError: ((Error?) -> Void)? = nil){

    let url = "http://google.com" /* your API url */

    let headers: HTTPHeaders = [
        /* "Authorization": "your_access_token",  in case you need authorization header */
        "Content-type": "multipart/form-data"
    ]

    Alamofire.upload(multipartFormData: { (multipartFormData) in
        for (key, value) in parameters {
            multipartFormData.append("\(value)".data(using: String.Encoding.utf8)!, withName: key as String)
        }

        if let data = imageData{
            multipartFormData.append(data, withName: "image", fileName: "image.png", mimeType: "image/png")
        }

    }, usingThreshold: UInt64.init(), to: url, method: .post, headers: headers) { (result) in
        switch result{
        case .success(let upload, _, _):
            upload.responseJSON { response in
                print("Succesfully uploaded")
                if let err = response.error{
                    onError?(err)
                    return
                }
                onCompletion?(response.value)
            }
        case .failure(let error):
            print("Error in upload: \(error.localizedDescription)")
            onError?(error)
        }
    }
}
(Nguồn: https://medium.com/theappspace/alamofire-4-multipart-file-upload-with-swift-3-174df1ef84c1)
```

**Kết luận**: Trong bài viết mình đã giới thiệu qua những thao tác cơ bản khi làm việc với file trong iOS. Hi vọng có thể giúp được cho các bạn. (y)