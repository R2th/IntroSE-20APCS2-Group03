# Cách thức hoạt động bất đồng bộ (Asynchronous)

Những người mới bắt đầu đôi khi không hiểu ý nghĩa của việc mã chạy một cách bất đồng bộ. Đoạn mã bất đồng bộ chạy ở một thời gian không xác định và không hề tuần tự đối với các đoạn mã khác.

Hãy xem ví dụ sau đây: 
```swift
func doSomeNetworking() {
// ... prepare url ...
 let session = URLSession.shared (1)
 let task = session.downloadTask(with:url) { loc, resp, err in (2)
 // ... completion function body goes here ... (4)
 }
 task.resume() (3)
}
```
Phương thức downloadTask( with: completionHandler: ) gọi khối lệnh của completion là bất đồng bộ . Nó gọi nó khi kết thúc việc kết nối đến Internet ( vì việc kết nối đến server mất một khoảng thời gian nhất định). Thứ tự mà các đoạn code chạy theo thứ tự số đã được đánh.

Điều này có nghĩa là một phương thức không thể trả về giá trị từ đoạn mã bất đồng bộ. Người mới bắt đầu có thể hiểu sai luồng sử lý và có những đoạn code như sau:
```swift
func doSomeNetworking() -> UIImage? { // vain attempt to return an image
 // ... prepare url ...
 var image : UIImage? = nil
 let session = URLSession.shared
 let task = session.downloadTask(with:url) { loc, resp, err in
 if let loc = loc, let d = try? Data(contentsOf:loc) {
 let im = UIImage(data:d)
 image = im // too late!
 }
 }
 task.resume()
 return image // can only be nil!
}
```
Khi bạn mới bắt đầu liệu đã có lúc bạn có suy nghĩ và code như vậy để rồi lại hì hục fix bug vì wtf tại sao lại không có dữ liệu trả về nhỉ rồi vân vân mây mây các câu hỏi. Vậy bây giờ mình sẽ giải thích lần lượt đầu tiên tại sao đoạn code trên lại sai.

Bạn viết đoạn code này với mong muốn rằng dữ liệu của mình sẽ được tải xuống và gán bằng image và trả về bởi hàm doSomeNetworking. Nhưng điều đó không bao giờ có thể hoạt động bởi vì dòng cuối cùng đã trả về image, sẽ thực thi trước khi dòng image = im được thực thi. Do đó, gán UIImage và trả về là hoàn toàn vô nghĩa vì dữ liệu trả về nó sẽ luôn là giá trị nil.

Khi bạn mới bắt đầu chắc hẳn bạn cũng nghĩ rằng các đoạn code sẽ đợi cho đến khi đoạn mã bất đồng bộ được hoàn thành. Điều đó là hoàn toàn sai lầm! Bất đồng bộ có nghĩa là không chờ đợi. 

Ví dụ, ở đây, mục tiêu của chúng ta là cập nhật giao diện với hình ảnh được tải xuống từ internet:
```swift
func doSomeNetworking() {
 // ... prepare url ...
 let session = URLSession.shared
 let task = session.downloadTask(with:url) { loc, resp, err in
 if let loc = loc, let d = try? Data(contentsOf:loc) {
 let im = UIImage(data:d)
 DispatchQueue.main.async {
 self.iv.image = im // update the interface _here_
                 }
         }
 }
 task.resume()
}
```
Đó là một giải pháp tuyệt vời. Nhưng bây giờ bạn lại muốn dữ liệu nhận được và truyền về cho nơi khởi tạo sử lý hay nói cách khác như một dạng dữ liệu trả về dưới dạng bất đồng bộ. Một cấu trúc xử lý thông thường là bạn sẽ định nghĩa một phương thức hoàn thành. Bên trong mã không đồng bộ của bạn, bạn gọi hàm hoàn thành như thế này:
```swift
func doSomeNetworking(callBackWithImage: @escaping (UIImage?) -> ()) {
 let s = "https://www.apeth.net/matt/images/phoenixnewest.jpg"
 let url = URL(string:s)!
 let session = URLSession.shared
 let task = session.downloadTask(with:url) { loc, resp, err in
      if let loc = loc, let d = try? Data(contentsOf:loc) {
           let im = UIImage(data:d)
            callBackWithImage(im) // call the caller's completion function
       }
 }
 task.resume()
}
```

Hãy để xem xét ví dụ trên từ vị trí gọi hàm để sử dụng. Tại nơi gọi hàm doSomeNetworking (callBackWithImage : ) chuyển vào một hàmm chức năng hoàn thành mà nó sẽ được thực hiện sau khi đã có dữ liệu. Ở đây, một lần nữa chúng ta sẽ cập nhật giao diện với hình ảnh được tải xuống:
```swift
doSomeNetworking { im in // completion function
     DispatchQueue.main.async {
         self.iv.image = im
     }
}
```

Hàm hoàn thành đó cũng là sử lý bất đồng bộ! Tại thời điểm gọi doSomeNetworking sẽ không biết khi nào hoặc liệu hàm hoàn thành này sẽ được gọi lại hay không. Thậm chí sẽ không biết cả nó sẽ được gọi lại trên thread nào của ứng dụng . Nhưng khi và nếu nó được gọi lại, hình ảnh sẽ đến dưới dạng tham số và bây giờ có thể sử dụng với bất kỳ mục đích gì.