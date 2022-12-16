# Tìm hiểu về Thread trong Swift iOS

Đối với những lập trình viên lần đầu làm quen với iOS, hoặc đã quen với cách tiếp cận của các nền tảng khác, sẽ khá nhiều khó khăn khi làm việc với Thread trong iOS.

Bài viết này sẽ giới thiệu một số điểm lưu ý khi làm việc với Thread trong iOS sử dụng GCD.

Về cơ bản, cũng giống như những nền tảng khác, quản lý Thread chính là quản lý mức độ ưu tiên của các tác vụ sẽ được thực hiện trong ứng dụng của bạn.

Việc tối ưu thuật toán và mã nguồn để chương trình chạy nhanh hơn là một phần hết sức quan trọng. Nhưng bên cạnh đó ta cần phải xác định được mức độ ưu tiên của các tác vụ trong ứng dụng của mình, khi nào người dùng sẽ cần và tương tác với chúng, qua đó nâng cao trải nghiệm người dùng, gây cảm giác ứng dụng chạy nhanh và mượt mà hơn. Áp dụng Thread trong ứng dụng sẽ làm cải thiện điều này trong ứng dụng của bạn.

Dưới đây làm một số lưu ý khi bạn sử dụng Thread trong iOS

# Chỉ sử dụng Main Thread để cập nhật giao diện
Điều này nhằm mục đích đảm bảo tương tác người dùng, các hiệu ứng trên giao diện không bị block bởi các tác vụ khác (như load dữ liệu) trong Main Queue.
Đây cũng là cách đơn giản nhất để tránh những lỗi không đáng có khi xử lý tương tác người dùng.
Như ví dụ dưới đây:
```
// Không nên
DispatchQueue.main.async {
    //Lay du lieu tu server
    self.doWork()
    self.view.backgroundColor = .black
}

// Nên
let queue = DispatchQueue(label: "queue_name")
queue.async {
    //Lay du lieu tu server
    self.doWork()
}

DispatchQueue.main.async {
    self.view.backgroundColor = .black
}
```


Chỉ sử dụng MainThread để cập nhật giao diện sẽ đảm bảo UI không bị block khi ta thực hiện các tác vụ dài như tải dữ liệu, download file... Tránh các side effect khi tải dữ liệu, tải ảnh trên Main Thread

# Các mức độ ưu tiên trong GCD
Có một số mức độ ưu tiên khi thực hiện các tác vụ trong iOS. Các tác vụ có độ ưu tiên cao sẽ được xử lý trước, các tác vụ có mức độ ưu tiên thấp hơn sẽ được xử lý sau, sau khi hệ thống phục vụ các tác vụ ưu tiên cao hơn trước đó.
Bảng dưới đây liệt kê các mức độ ưu tiên và ý nghĩa:
![](https://images.viblo.asia/9ca77144-79d1-4519-8012-3fedbf335542.png)

Ngoài ra ta có thể tự tạo queue với QoS thông qua đoạn code dưới đây:

`var queue = DispatchQueue(label: "queu_name", qos: .utility)`

# Xác định tác vụ hiện đang chạy trên Thread nào
Để biết tác vụ hiện đang chạy trên Thread nào ta có thể biết thông qua **Thread.current** như đoạn code ví dụ sau:

```
func doWork() {
    print("Current thread in \(#function) is \ (Thread.current)")
}

// prints "Current thread in doWork() is <NSTrhead: 0x294345345>{number =3, name = (null)}"
```

Dựa vào cách này ta sẽ biết chính xác mức độ ưu tiên của tác vụ đang thực hiện. Ngoài ra ta có thể kiểm tra xem tác vụ có chạy ở Main Thread hay không thông qua hàm

`Thread.current.isMainThread`

# Nên sử dụng cơ chế bất đồng bộ thay vì đồng bộ.
**.async** closure cho phép thực thi các tác vụ một cách bất đồng bộ, nên có thể thực thi các tác vụ khác trong khi tác vụ này đang thực thi.

Việc sử dụng cơ chế bất đồng bộ cho phép ta thực hiện nhiều tác vụ khác nhau thay vì phải chờ đợi các tác vụ khác, hạn chế hiện tượng block đối với tương tác UI.

Không nên sử dụng cơ chế động bộ ở Main DispatchQueue như đoạn code dưới đây:
```
DispatchQueue.main.sync {
    self.updateView()
}
```

Và tránh sử dụng cơ chế đồng bộ trên **.userInteractive** Queue vì nó sẽ có cùng mức độ ưu tiên với **main queue**

# Kết luận
Mong rằng những lưu ý ở trên sẽ giúp mọi người dễ dàng làm quen với Thread trong iOS
Ngoài ra mọi người có thể tham khảo thêm những nguồn sau để có thông tin chi tiết hơn
- Giới thiệu về Concurrent Programming với GCD
  https://developer.apple.com/videos/play/wwdc2016/720/
  https://www.appcoda.com/grand-central-dispatch/
 
Nguồn tham khảo: https://medium.com/@gabriel_lewis/threading-in-swift-simply-explained-5c8dd680b9b2