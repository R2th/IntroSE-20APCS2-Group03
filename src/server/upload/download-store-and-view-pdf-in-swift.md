# Giới thiệu

Xin chào cả nhà, hôm nay mình xin phép được trình bày về cách download PDF file, lưu trữ và hiển thị chúng. Để thực hiện được mình sẽ chia thành 3 chủ đề:

* DownloadTask
* File Management
* PDF View

# DownloadTask
Để download file từ một URL, chúng ta cần sử dụng downloadTask. ViewController trong ví dụ dưới đây cần phải conform tới URLSessionDownloadDelegate:
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

Để xem vị trí của tệp đã tải xuống thì bạn cần kiểm tra trong console bằng cách printed ra đường dẫn của nó.
Sau khi mình nhấn tải xuống thì tập tin tải xuống tồn tại chưa đến 1 giây và sau đó bị hệ thống tiêu diệt :v. Hành vi này giống nhau trên cả máy giả lập và vật lý.

![](https://images.viblo.asia/16abeb02-0cee-43e2-a0f1-b149153eec52.gif)

# File Management

Trong mỗi ứng dụng được tạo trong iOS đều có mỗi sandbox riêng. Nó sẽ có 3 thành phần chính mà một iOS developers nên biết: Bundel Container, Data Container và iCloud Container. Ở đây mình chỉ quan tâm về Data Container để tập trung vào nhiệm vụ đó là - download PDF.

![](https://images.viblo.asia/c98ac027-2671-4e99-ae5a-b17f8215c9f2.png)

Data container là nơi mà code của mình có thể thao tác với các file được downloaded từ internet sau khi được biên dịch. Dưới đây mình sẽ liệt kê các tính năng quan trọng:
* File trong Library và tmp sẽ được xoá tự động bởi iOS 
* iTunes sẽ backup tất cả files trong Data Container ngoại trừ Caches, tmp và files chỉ định  `.isExcludedFromBackup = true`. Trong quá trình review nếu Apple mà tìm thấy những file không cần thiết được lưu lại trong iTunes nó sẽ bị rejected.
* Documents là vị trí lưu trữ các tập tin tải về.

Do đó bước tiếp theo là sao chép file từ tmp qua Document. Mình sẽ làm các bước như sau:
1. Extracting the original pdf name 
2. Tạo một Url trong Documents.
3. Xoá file với tên guống để tránh lỗi Copy Error:
```
“CFNetworkDownload_mdrFNb.tmp” couldn’t be copied to “Documents” because an item with the same name already exists.
```

4. Copying nó tới Document

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
```

![](https://images.viblo.asia/9c327f6c-3236-47d4-9847-52f0cbfcb5d5.gif)

# PDFView

Đến đây thì mình đã lưu thành công file PDF đã tải xuống vào vị trí thích hợp để người dùng có thể truy cập dễ dàng.
Đến lúc này để xem nó với PDFView thì mình sẽ dùng PDFKit - đây là 1 thứ viện tiện lợi được Apple cung cấp kể từ khi phát hành iOS 11

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

![](https://images.viblo.asia/6a252c6a-2a04-4679-97ee-ddd5f9082fba.gif)

Woa !!! Như vậy chúng ta đã download và opened file PDF successfully. Tuy nhiên size này đang chưa đúng. Với việc chỉnh sửa size cũng như thêm 3 chức năng cho app nữa là: Paging, Outline và Thumbnails.
 
# Tổng kết
Vậy là qua bài này thì mình đã giới thiệu tới các bạn về cách download, lưu trữ và open file PDF trên iOS app. Cảm ơn mọi người đã quan tâm và theo dõi !
Hẹn gặp lại mọi người vào tháng sau

# Tài liệu tham khảo 

* https://medium.com/@ji3g4kami/download-store-and-view-pdf-in-swift-af399373b451

* http://pdfkit.org/

* https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html#//apple_ref/doc/uid/TP40010672-CH2-SW4