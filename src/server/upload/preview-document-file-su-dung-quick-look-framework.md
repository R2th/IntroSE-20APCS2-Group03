Đối với một Dev iOS chắc hẳn chung ta đã sử dụng qua rất nhiều các famework, trong số có Quick Look Framework. 
Chỉ cần thông qua tên gọi chúng ta cũng có thể tưởng tượng được nó được dùng với mục đích gì, đó là xem các file tài liệu mà ứng dụng xử lý.
Quck Look rất dễ dàng để sử dụng và nó hỗ trợ các file tài liệu như:
* iWork
* Microsoft Office document
* PDF
* Images
* Rick - Text format document
* Comma - separated value file (csv)

Quick Look Framework cung cấp cho chúng ta datasource để chứa file sẽ preview. Nó thực chất là danh sách các NSURL lưu path tới các file document.
Ngoài ra framework này còn cung cấp một Viewcontroller có tên là QLPreviewController để hỗ trợ việc preview. Nó sẽ yêu cầu chúng ta implementation hai phương thức
của QLPreviewControllerDataSource protocol. Bên cạnh đó, nó còn có các phương thức hỗ trợ được chứa trong  QLPreviewControllerDelegate protocol.
Giờ hãy bắt đầu bắt tay vào thử nghiệm nó :D 

## 1. Khởi tạo project
![](https://images.viblo.asia/304aa428-96d5-46a2-871a-ebdd1c64e01d.png)

Tạo một project demo, tiếp đó chúng ta sử dụng một UITableView để hiển thị danh sách các file sẽ preview

![](https://images.viblo.asia/cea6e6ef-0108-4a76-abcd-fbdcab4fceb2.png)

Tiến hành add các file demo vào trong project

![](https://images.viblo.asia/30556e85-9a64-4182-8761-fedfc63a7019.png)

## 2. Khởi tạo TableView để hiển thị danh sách
Triển khải UITableViewDatasource để hiển thị 
```swift
import UIKit

class ViewController: UIViewController {

    // Outlet
    
    @IBOutlet private weak var tableView: UITableView!
    
    // Property
    
    let fileNames = ["Demo-Image.jpeg",
                     "Demo-Keynote.key",
                     "Demo-Pages.pages",
                     "Demo-PDF.pdf",
                     "Demo-Text.txt",
                     "Demo-Word.docx"]
    
    // Life circle
    
    override func viewDidLoad() {
        super.viewDidLoad()
        title = "Demo Preview"
    }
}
extension ViewController: UITableViewDataSource, UITableViewDelegate {
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return fileNames.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "cell") else {
            return UITableViewCell()
        }
        cell.textLabel?.text = fileNames[indexPath.row]
        return cell
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 80.0
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
          // TODO: next step
    }
}
```

Kết quả: 
![](https://images.viblo.asia/41918386-9016-4090-8ad3-498a024821d2.png)

## 3. Khởi tạo QLPreviewController để hiển thị file
* Chuyển đổi File name sang URL 
    Khởi tạo thêm thuộc tính fileURLs để lưu trữ path các file. 
    Tiếp theo chúng ta tạo hàm get listURL vào gọi nó trong viewDidLoad
```swift 
    func prepareFileURLs() {
        for file in fileNames {
            let fileParts = file.components(separatedBy: ".")
            if let fileURL = Bundle.main.url(forResource: fileParts[0], withExtension: fileParts[1]) {
                if FileManager.default.fileExists(atPath: fileURL.path) {
                    fileURLs.append(fileURL)
                }
            }
        }
    }
   ```
  
 * Khai báo thuộc tính qlPreviewController để hỗ trợ preview

```swift 
     let quickLookController = QLPreviewController()
```
Bạn đừng quên setDatasource cho QLPreview để có thể tiến hành chuẩn bị cho việc Preview
```swift 
    override func viewDidLoad() {
        super.viewDidLoad()
        quickLookController.dataSource = self
        prepareFileURLs()
        title = "Demo Preview"
    }
```
* Triển khai các phương thức trong QLPreviewControllerDataSource:
```swift 
 extension ViewController: QLPreviewControllerDataSource {
    func numberOfPreviewItems(in controller: QLPreviewController) -> Int {
        return fileNames.count
    }
    
    func previewController(_ controller: QLPreviewController, previewItemAt index: Int) -> QLPreviewItem {
        return fileURLs[index] as QLPreviewItem
    }
}
```
* Trong hàm ```didSelectRowAt``` của UITableViewDelegate xử lý push qlPreview để hiển thị 
```swift 
 func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        if QLPreviewController.canPreview(fileURLs[indexPath.row] as QLPreviewItem) {
            quickLookController.currentPreviewItemIndex = indexPath.row
            navigationController?.pushViewController(quickLookController, animated: true)
        }
    }
```
## 4. Kết quả

![](https://images.viblo.asia/45849b7b-773e-4280-b0c4-02a5e9a64a55.png)

Trong khi preview chúng ta có thêm một số chức năng như chia sẻ hay xem danh sách các file

![](https://images.viblo.asia/cf87c59b-0e15-4bf9-a961-409b45de5749.png)

![](https://images.viblo.asia/6d90a860-6c13-40f5-8880-4103582efb12.png)

Ngoài ra các bạn có thể thử thêm các hàm xử lý với QLPreviewControllerDelegate :D

Link demo Project: https://github.com/thanhlong12312/DemoPreviewFile

Cảm ơn các bạn đã dành thời gian để theo dõi !