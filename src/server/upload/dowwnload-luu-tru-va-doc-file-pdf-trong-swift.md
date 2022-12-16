Mình đã làm việc trên một Ứng dụng yêu cầu download, lưu trữ và đọc các file PDF , qua một thời gian mình đúc kết lại và hôm nay mình sẽ chia sẻ cho các bạn cách thức để làm việc với nó  . Để  làm việc với nó, có ba chủ đề chính:

**DownloadTask**

**File Management**

**PDFView**

Chúng ta sẽ đi chi tiết từng phần 1 nhé !

**DownloadTask**

Để download 1 file từ một URL, chúng ta cần sử dụng **downloadTask**. 

Vì chúng ta cũng cần phải giải quyết nơi mà có task vụ đã lưu tệp của chúng ta, quan sát **ViewContoder** trong ví dụ của mình, cần tuân thủ **URLSessionDoadDelegate**.

```
import UIKit

class ViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    @IBAction func downloadButtonPressed(_ sender: Any) {
        guard let url = URL(string: "https://www.tutorialspoint.com/swift/swift_tutorial.pdf") else { return }
        
        let urlSession = URLSession(configuration: .default, delegate: self, delegateQueue: OperationQueue())
        
        let downloadTask = urlSession.downloadTask(with: url)
        downloadTask.resume()
    }
}


extension ViewController:  URLSessionDownloadDelegate {
    func urlSession(_ session: URLSession, downloadTask: URLSessionDownloadTask, didFinishDownloadingTo location: URL) {
        print("downloadLocation:", location)
    }
}
```

Để xem vị trí của tệp đã được download, chỉ cần kiểm tra vị trí được print trong Xcode console . 

Sau khi tôi nhấn tải xuống, file được tải xuống chưa đến một giây và sau đó nó được kill bởi hệ thống. Hành vi này hoạt động giống nhau trên cả simulator và thiết bị thật .

![](https://images.viblo.asia/ac05de60-dad2-431a-9344-d54e6feca58a.gif)


**File Management**

Mỗi app được tạo trong iOS đều có sandbox riêng. Bên trong sandbox, có ba phần chính mà các nhà phát triển IOS nên biết: Bundle Container  Data Container và iCloud Container . 

Ở đây mình sẽ chỉ xác định trên Data Container để tập trung vào task của chúng ta -- download PDF. 

![](https://images.viblo.asia/e3ea661f-52f6-47fa-b7fb-09c1bcd99e32.png)

**Tham khảo:**

https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html#//apple_ref/doc/uid/TP40010672-CH2-SW4

Data container là không gian nơi code của bạn có thể thao tác với các file download từ Internet sau khi được compiled. Dưới đây tôi liệt kê các tính năng quan trọng:

Các tệp trong Thư viện ( Library) và tmp sẽ tự động được dọn sạch tự động bởi iOS.
iTunes sẽ sao lưu tất cả các tệp trong Data Container ngoại trừ Caches, tmp và các tệp chỉ định .isExcludedFromBackup = true. 
Trong quá App review, nếu Apple phát hiện ra rằng các tệp không cần thiết được sao lưu trong iTunes, thì có khả năng Ứng dụng sẽ bị reject .
Documents/Tài liệu là vị trí để lưu trữ các tập tin tải về. Do đó, bước tiếp theo là sao chép tệp từ tmp sang Documents. Tôi đã làm điều này bằng cách:

1. trích xuất tên pdf gốc,
2. tạo một url trong Documents,
3. xóa tập tin có cùng tên để tránh Lỗi  " Copy Error: “CFNetworkDownload_mdrFNb.tmp” couldn’t be copied to “Documents” because an item with the same name already exists. ". và

4. sao chép nó vào Documents.

```
extension ViewController:  URLSessionDownloadDelegate {
    func urlSession(_ session: URLSession, downloadTask: URLSessionDownloadTask, didFinishDownloadingTo location: URL) {
        print("downloadLocation:", location)
        // create destination URL with the original pdf name
        guard let url = downloadTask.originalRequest?.url else { return }
        let documentsPath = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
        let destinationURL = documentsPath.appendingPathComponent(url.lastPathComponent)
        // delete original copy
        try? FileManager.default.removeItem(at: destinationURL)
        // copy from temp to Document
        do {
            try FileManager.default.copyItem(at: location, to: destinationURL)
            self.pdfURL = destinationURL
        } catch let error {
            print("Copy Error: \(error.localizedDescription)")
        }
    }
}
view raw
```

![](https://images.viblo.asia/4396a08f-0dfb-4830-9821-1fe2a69a966e.gif)

**PDFView**

Bây giờ, chúng ta đã đặt thành công tệp PDF đã tải xuống vào vị trí thích hợp để người dùng truy cập. Đã đến lúc xem nó với PDFView từ PDFKit, đây là một framework tiện lợi do Apple cung cấp kể từ khi phát hành bản iOS 11.

Mặc dù nhiều hướng dẫn của PDFKit sử dụng storyboard để tạo PDFView bằng cách gán thuộc tính cho UIView, nhưng nó không hỗ trợ trong Xibs. Vì vậy, ở đây tôi sẽ khởi tạo nó .

```
@IBAction func openPDFButtonPressed(_ sender: Any) {
    let pdfViewController = PDFViewController()
    pdfViewController.pdfURL = self.pdfURL
    present(pdfViewController, animated: false, completion: nil)
}
```

```
import UIKit
import PDFKit

class PDFViewController: UIViewController {
    
    var pdfView = PDFView()
    var pdfURL: URL!

    override func viewDidLoad() {
        super.viewDidLoad()
        
        view.addSubview(pdfView)
        
        if let document = PDFDocument(url: pdfURL) {
            pdfView.document = document
        }
        
        DispatchQueue.main.asyncAfter(deadline: .now()+3) {
            self.dismiss(animated: true, completion: nil)
        }
    }
    
    override func viewDidLayoutSubviews() {
        pdfView.frame = view.frame
    }
}
```

![](https://images.viblo.asia/9f150ef7-dc9f-451a-99e2-45f7f5be4f4c.gif)

 Bây giờ chúng ta đã tải xuống bản PDF đã mở thành công 😀. Tôi biết kích thước không vừa vặn và tôi sẽ tập trung vào PDFKit trong bài viết tiếp theo nhé.