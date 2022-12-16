Cái này tưởng đơn giản mà lại làm mình mất khối thời gian, chỉ vì mình không biết đến việc cái này override cái kia, dẫn đến một số cái không chạy như ý. Do đó mình viết bài này để bạn nào chưa biết cách làm thì sẽ biết cách làm, bạn nào chưa hiểu tại sao mình viết trông chuẩn lắm rồi mà nó vẫn không chạy thì hiểu được nguyên nhân nhé.


Hiển tiến độ download là một chức năng khá cơ bản trong các thể loại ứng dụng. Trong Swift việc này không khó. Về nguyên lý thì như sau: Khi bạn download một file thì hệ thống sẽ liên tục cập nhật cho bạn các thông tin về quá trình download. Các thông tin này gồm tổng lượng byte cần phải download, lượng byte vừa được download (trong lần báo cáo này), và tổng lượng byte đã được download (tính tổng các lần báo cáo). Mỗi lần báo cáo cách nhau bao nhiêu lâu thì mình cũng không rõ lắm, nhưng thấy khá là liên tục.


Vậy để tính xem đã download được bao nhiêu % thì chúng ta lấy tổng lượng byte đã download chia cho tổng lượng byte phải download rồi nhân 100 là ra.
Mà mình không thích dùng % nên trong bài này mình sẽ dùng ProgressView.

Phần setup project chắc bạn nào cũng biết rồi nên mình bỏ qua.

Về giao diện thì mình vẽ nhanh như sau:
![](https://images.viblo.asia/794289a2-02b5-4b74-a50f-19958a7359f8.png)

Ở màn hình này, khi user bấm vào nút download thì mình sẽ hiện chữ loading kèm bên dưới là thanh ***ProgressView*** để hiển thị tiến độ download.
Mình để cái ảnh đồng hồ để giả vờ đang download cái đồng hồ cho nó giống thật tí.

Label "Loading..." với thanh ProgressView ban đầu mình để ***hidden***.

ViewController mình đặt tên là ***InitialViewController***:
![](https://images.viblo.asia/b050b37b-6238-447b-8ec0-79394a7991eb.png)


Giờ vào phần code. Để download file mình sẽ dùng hàm downloadTask của ***URLSession***. 

Khi user bấm vào cái đồng hồ mình sẽ gọi hàm này:
```swift
func loadAssetFromServer() {
        showLoading()
        let path = "http://192.168.1.4:8080/"
        let url = URL(string: path + fileName)!
        
        let session = URLSession(configuration: .default, delegate: self, delegateQueue: .main)
        session.downloadTask(with: url).resume()
}
```

Mình tự host 1 cái server local để test cho tiện. Hàm showLoading() là mình dùng để hiện label "Loading..." với cái ProgressView. 

Phần quan trọng sẽ là đoạn này:
```swift
let session = URLSession(configuration: .default, delegate: self, delegateQueue: nil)
session.downloadTask(with: url).resume()
```

Để nhận được tiến độ download, chúng ta sẽ cần implement protocol ***URLSessionDownloadDelegate***. 

Do đang test nhanh nên mình để delegate là self, và dùng cái ***InitialViewController*** hiện tại để implement luôn. Trong thực tế có thể bạn sẽ muốn tạo class riêng để implement protocol này.

![](https://images.viblo.asia/4b5e1b24-3d12-4ef0-bdfd-b706024ebe4d.png)


Hàm
```swift
func urlSession(_ session: URLSession, downloadTask: URLSessionDownloadTask, didFinishDownloadingTo location: URL)
```
là nơi bạn xử lý tiếp sau khi download xong. 

Đối với tiến độ download chúng ta sẽ chú ý đến hàm
```swift
func urlSession(_ session: URLSession, downloadTask: URLSessionDownloadTask, didWriteData bytesWritten: Int64, totalBytesWritten: Int64, totalBytesExpectedToWrite: Int64)
```

***totalBytesExpectedToWrite*** là tổng lượng byte cần phải download, và ***bytesWritten*** là tổng lượng byte đã download.

Để thay đổi ***ProgressView*** cho ứng với tiến độ download chúng ta làm như sau:
```swift
func urlSession(_ session: URLSession, downloadTask: URLSessionDownloadTask, didWriteData bytesWritten: Int64, totalBytesWritten: Int64, totalBytesExpectedToWrite: Int64) {
        let progress = Float(totalBytesWritten) / Float(totalBytesExpectedToWrite)
        loadingProgressView.progress = progress
}
```

Vậy là xong. 

Giá trị của biến ***progress*** chính là tiến độ download, bạn không muốn dùng ProgressView mà dùng % thì cũng cứ thế mà dùng.

Rất đơn giản đúng không? Vậy mình mất nhiều thời gian ở chỗ nào?

À là bởi vì khi mình dùng ***URLSession***, mình truyền luôn ***completionHandler*** vào hàm ***downloadTask***, kiểu như này:

```swift
 func loadAssetFromServer() {
        showLoading()
        let session = URLSession(configuration: .default, delegate: self, delegateQueue: .main)
        let path = "http://192.168.1.4:8080/"
        let url = URL(string: path + fileName)!

        let task = session.downloadTask(with: url) { url, response, error in
            // Download complete, do something
        }

        task.resume()
}
```

Tuy nhiên, nếu xử lý completion kiểu này thì các hàm trong delegate của bạn sẽ **KHÔNG CHẠY**.

Vì Swift thấy có tận 2 chỗ đang xử lý completion, nên sẽ chỉ chạy một cái thôi. Và do Swift chọn completionHandler phía trên nên toàn bộ hàm trong delegate sẽ không được gọi => ***ProgressView*** của mình không được update.

Vậy mình bỏ completionHandler đi và handle completion trong hàm của delegate là được.

Hi vọng bài viết này của mình sẽ có ích cho các bạn đang muốn theo dõi tiến độ download file bằng ***URLSession***.