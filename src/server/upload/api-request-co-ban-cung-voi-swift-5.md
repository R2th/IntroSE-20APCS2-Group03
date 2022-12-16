Trong bài viết này mình sẽ hướng dẫn mọi người lấy ảnh và hiển thị lên màn hình app thông qua API request cơ bản.

Hãy cùng bắt đầu bằng việc tạo một project mới.

![](https://images.viblo.asia/634ce84b-3b1c-412f-a30d-62f16172f815.png)

Ở đây mình đặt tên project là requestDemo. Mục tiêu mà project này muốn hướng tới như sau:
*     Học cách tạo một request tới API cùng Swift 5.
*     Học cách sử dụng URL và URLSession.
*     Học cách request làm việc trong Swift.
*     Hiển thị được ảnh lấy về từ internet.

Sau khi đã tạo project xong, chúng ta sẽ vào storybroad và đặt một imageView vào màn hình. Đồng thời, constraint để imageView nằm full màn hình và set `content mode` thành `Aspect fit` như hình:

![](https://images.viblo.asia/b5019979-68bd-4dae-9125-30b2278cd7f5.png)

Tiếp theo chúng ta sẽ kéo IBOutlet cho ảnh này để có thể xử lí bằng code sau đây:

![](https://images.viblo.asia/d66da34d-5d6e-4203-9fea-437bc75d6fff.png)

Bây giờ thì mọi thứ đã sẵn sàng để chúng ta đi vào chủ đề chính của bài viết. Trong ví dụ này mình dùng [một bức ảnh mèo](https://s3-eu-west-1.amazonaws.com/assets.barcroft.tv/47118fd9-460e-45d5-8c15-29460e65cd95.jpg) mình tìm được trên Google.
Ví dụ này khá đơn giản nên hầu hết phần code chúng ta sẽ để trong hàm `viewDidLoad()`, sau này mọi người có thể code riêng ra một file để tiện sử dụng ở nhiều nơi. Đầu tiên chúng ta sẽ sử dụng một class tên là `URL` để đại diện cho URL của ảnh đã được chuẩn bị. Hãy tạo một isntance của class này và paste URL string vào đó:

![](https://images.viblo.asia/a51e2bb6-5906-4cd3-9e5e-8c833aab0bab.png)

Sau khi đã có URL, chúng ta sẽ lấy dữ liệu về. Class `URLSession` có thể quản lí các network request, hãy cùng tạo một request để lấy dữ liệu. Chúng ta hoàn toàn có thể tạo mới một `URLSession `để chỉnh sửa theo ý muốn, nhưng trong ví dụ đơn giản này ta có thể tận dụng `.share` đã được cài đặt sẵn để thực thi các hàm GET request cơ bản.
Khi ta sử dụng class `URLSession`, một network request sẽ được gọi là một task và mỗi khi tương tác với API chúng ta phải làm việc với một task tương tự như vậy.

![](https://images.viblo.asia/4cbf61ae-07a2-439c-82cb-5f22198904f4.png)

Bây giờ chúng ta sẽ tạo một task và truyền vào đó class `URL` ta đã tạo ở trên:

![](https://images.viblo.asia/9031f0a6-b754-44d6-ac1e-6502c1cdc0c7.png)

Ta sử dụng `URLSession` để bắt đầu một request tới URL  mà có chứa URL của ảnh. Trong hàm này, completion handle sẽ giúp ích trong trường hợp việc xử lí với dữ liệu xảy ra lỗi. Bây giờ ta có thể hiển thị ảnh ra màn hình sau khi chạy task, nên nhớ các UI elements phải luôn được update trên main thread :

![](https://images.viblo.asia/a3a48cf3-dbae-4e5b-9bea-f2bdb93f2697.png)

Trong Swift 5, sẽ có thêm một thứ gọi là `Result Type` được trả về. `Result type` được implement như một enum có hai case là `success` và `failure`. Cả hai case này đều được thiết kế dưới dạng generic nên có thể associate đến bất kì value bạn mong muốn, tuy nhiên `failure` phải conform với kiểu `Error` của Swift. Việc tận dụng `Réult Type` rất có lợi khi làm việc với các task bất đồng bộ vì trước khi lấy được dữ liệu, ta có thể bắt được `success` hay `failure`. Chúng ta có thể quan sát ví dụ đơn giản sau:

```
getImage(from: imageURL) { result in
    switch result {
    case .success(let image):
          DispatchQueue.main.sync {
                 self.imageContainer.image = loadedImage
          }
    case .failure(let error):
        print(error.localizedDescription)
    }
}
```

Đây là kết quả hiện thị ảnh:

![](https://images.viblo.asia/db85a3b3-317a-46c0-9c6d-09a21fde5610.png)

Trên đây là một ví dụ cơ bản về việc sử dụng và làm việc với URL và URLSession, hi vọng rằng sẽ giúp ích cho mọi người trong việc xây dựng một hệ thống quản lí API hiệu quả.

Ref: 

https://medium.com/better-programming/basic-api-request-with-swift-4-d8bf829524f
https://www.hackingwithswift.com/articles/161/how-to-use-result-in-swift