![](https://images.viblo.asia/cd598dbb-c4a4-400e-9c40-5d6444cf700c.png)

Threading trong lập trình iOS là một khái niệm khá khó để tiếp cận cho những người mới khi bắt đầu làm quen với Swift và iOS. Dưới đây là 1 vài mẹo nhỏ để bạn có thể hiểu dễ dàng, cơ bản khi tiếp xúc với Threading thông qua GCD(Grand Central Dispatch)


+ Hiểu đơn gỉan, threading là việc bạn quản lý những tác vụ nào ưu tiên trong app. Làm cho nhưng dòng code bạn viết ra chạy nhanh hơn thì rất là tuyệt, nhưng nó sẽ còn tuyệt hơn nữa nếu những user của bạn nhận thức được cái app của bạn chạy nhanh vcl ra so với các app khác.

+ Là 1 lập trình viên thì mục tiêu của chúng ta luôn là ưu tiên về UX và UI (những thứ mà user có thể thấy và tương tác), nó sẽ 1 phần nào đó làm cho user nghĩ rằng: "À đù, app này chạy nhanh và xử lý tốt vãi ra". Đừng bao giờ để user phải đợi load 1 thứ gì đó lên màn hình quá lâu nhưng mà thứ đó họ lại không quan tâm lắm.

### 1. Chỉ sử dụng Main Thread cho việc update các views

Đây là cách đơn giản nhất để tránh các sự cố không ngờ tới. Bạn phải chắc chắn rằng các views và giao diện của bạn không bị blocked (hiểu như không bị ảnh hưởng) bởi những việc khác trên Main Queue. Dưới đây là vd nè:

```swift
// DO NOT do this
        DispatchQueue.main.async {
            // hàm requestSomething sẽ lấy data reponse từ server về
            self.requestSomething()
            self.view.backgroundColor = .red
        }
        
// DO this
        let queue = DispatchQueue(label: "myQueue")
        queue.async {
            self.requestSomething()
        }
        DispatchQueue.main.async {
            self.view.backgroundColor = .red
        }
```

Bằng việc chỉ update các UI qua Main Thread, bạn sẽ chắc chắn rằng user sẽ không bị blocked từ việc load 1 cái gì đó hay vâng vâng mây mây. Luôn luôn tránh việc gọi các function có thể gây ảnh hưởng như load data, hình ảnh, trên Main Thread.


### 2. Hiểu các độ ưu tiên (QoS) trong GCD
Apple cung cấp cho chúng ta một vài độ ưu tiên để gắn cho sự kiện trong iOS. Những sự kiên có độ ưu tiên cao hơn sẽ được thực thi ngay lặp tức trong khi những độ ưu tiên thấp hơn sẽ được thực thi khi mà hệ thống đã được giải phóng 1 tí tài nguyền. Dưới đây là bảng độ ưu tiên từ cao tới thấp tôi lấy từ document của Apple
![](https://images.viblo.asia/21178a6c-b26b-42d8-9eff-0f2cca8d97f6.png)

Việc tạo queue với độ ưu tiên cũng khá dễ dàng. Bạn chỉ cần truyền tham số cho label hiểu như là tên của queue và độ ưu tiên bạn muốn là xong 
```swift
let queue = DispatchQueue(label: "myQueue", qos: .utility)
```

### 3. Nắm rõ bạn đang ở thread nào
Để biết bạn đang ở thread nào thì chỉ đặt dòng log `Thread.current` là được
```swift
func requestSomething() {
        print("Current thread in \(#function) is \(Thread.current)")
}
// Current thread in requestSomething() is <NSThreadL 0x283e83681>{number = 3, name = (null)}
```

Với cách này thì bạn có thể thấy chính xác độ ưu tiên của function đang chạy. Ngoài ra thì bạn còn có thể check bạn có đang ở trên Main Thread không bằng cách log `Thread.current.isMainThread`

### 4. Xác định trong đầu gần như lúc nào cũng nên xài async
Đây là 1 trong những cách tốt nhất để tránh vấn đề khi dùng threading nhưng nhiều lúc nó cũng có tác dụng phụ. Có rất nhiều lợi ích khi bạn dùng `sync` trong 1 số trường hợp nào đó, nhưng với những bạn là dân nghiệp dư mới bắt đầu học iOS thì tốt nhất nên tránh dùng ông này.

KHÔNG BAO GIỜ được gọi sync ở Main DispatchQueue:
```swift
DispatchQueue.main.sync {
     self.updateUI()
}
```

Và 1  lưu ý nhỏ nữa là nên tránh dùng `sync` trên `.userInteractive` Queue bởi vì nó có cùng độ ưu tiên với Main Queue.

### 5. Một vài trang khá hay để bạn tìm hiểu về Threading:
+ Đi sâu hơn tìm hiểu về threading với WWDC Video on concurrency:
https://developer.apple.com/videos/play/wwdc2016/720/
+ Nếu bạn là 1 người hay đọc cái bài post. Thì trang này của Appcoda sẽ giúp bạn hiểu thêm về sự khác nhau giữa các độ ưu tiên và cách chúng được thực thi:
https://www.appcoda.com/grand-central-dispatch/
+ Ray Wenderlich cũng có các bài khá hay hướng dẫn về threading đấy:
https://www.raywenderlich.com/5370-grand-central-dispatch-tutorial-for-swift-4-part-1-2



-----
Cám ơn các bạn đã theo dõi. :D bài này có vài từ khá khó hiểu khi dịch sát nghĩa nên mình chỉ ráng cố gắng hết sức mình để các bạn dễ hiểu nhất có thể. 


Nguồn bài viết: https://medium.com/@gabriel_lewis/threading-in-swift-simply-explained-5c8dd680b9b2