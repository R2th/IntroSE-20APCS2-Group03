Đây là bài dịch từ trang [medium.com](https://medium.com), mời các bạn xem bài gốc tại đây: https://medium.com/dev-genius/how-to-animate-your-images-in-swift-ios-swift-guide-64de30ea616b

5 bước để tạo hình ảnh động với `UIImage` và `UIImageView`

![](https://images.viblo.asia/0ba14dcd-6a9f-491b-a944-2746d54902b9.png)

`UIKit` cung cấp một tính năng sẵn có tuyệt vời để hiển thị hình ảnh động chỉ với một vài dòng mã. Nó cho phép tạo hình động cho rất nhiều trường hợp khác nhau, từ tải hình động, đến vật phẩm phát sáng, vật phẩm xoay và nhiều thứ khác.
Đây là 5 bước để tạo và thêm hình động dựa trên hình ảnh của riêng bạn vào ứng dụng. Chúng ta cùng bắt đầu nào.
### 1. Tạo một bộ hình ảnh cho ảnh động của bạn
Đầu tiên, bạn cần tạo một thư mục chứa bộ các hình ảnh cho ảnh động của bạn. Hãy chắc chắn rằng, tên của các tập tin ảnh là số thứ tự của ảnh đó trong ảnh động, bắt đầu từ **0** (ví dụ: **0.png**)
Trong bài viết này, tôi sẽ dùng một ví dụ như sau: hãy tưởng tượng chúng ta đang có một trình nghe các bài podcast, và cần một ảnh động để chỉ ra bài nào đang được chơi.
Đây sẽ là các ảnh thể hiện cho từng trạng thái của ảnh động trong ví dụ trên.

![](https://images.viblo.asia/d9b50954-d017-4ac0-b5b1-a28576293a4b.png)

Còn đây là một ví dụ về ảnh động đồng xu quay. Chúng ta sẽ tạo ra một ảnh động có đồng xu quay 360 độ với 6 ảnh khác nhau như sau:

![](https://images.viblo.asia/4822a514-4ed8-4226-9f53-d17af382ee29.png)

Giả sử khoảng thời gian là đủ ngắn (nhỏ hơn 1 giây với trường hợp này), ảnh động của chúng ta sẽ trông rất mượt với số lượng hình ảnh như trên.
### 2. Thêm hình ảnh của bạn vào thư mục xcassets
Khi bạn đã có thư mục chứa các ảnh, hãy mở XCode, chọn danh mục asset trong dự án, sau đó kéo thả thư mục đó vào XCode.

![](https://images.viblo.asia/d5751288-37ed-4a14-8483-953434ce0a2f.jpeg)

Để chắc chắn mọi thứ vẫn trong tầm kiểm soát, hãy bật tùy chọn **Provide Namespace**. Nó sẽ làm cho asset có thể truy cập vào **FolderName/ImageName** thay vì **ImageName**.

![](https://images.viblo.asia/256d679c-e48a-4c00-b91a-de2fcfdf0620.png)

### 3. Tạo trình lấy ra hình ảnh tự động
Bây giờ, chúng ta sẽ đưa tất cả các ảnh của ảnh động vào mã của bạn.
Hãy tạo một hàm với tên `animatedImages`với tham số đầu vào là tên của ảnh động (tương ứng với tên của thư mục chúng ta đã tạo trong tệp xcassets ở bước trên), và trả ra một mảng các ảnh.
Để tránh việc phải kiểm tra xem có bao nhiêu ảnh thành phần, bạn hãy lặp từ 0 đến khi hết các ảnh có trong thư mục.
Bằng cách này, tất cả hình ảnh của hình ảnh động sẽ được lấy ra bất kể hình ảnh đó có bao nhiêu và không chỉ định số lượng hình ảnh sẽ tải.
```
func animatedImages(for name: String) -> [UIImage] {
    
    var i = 0
    var images = [UIImage]()
    
    while let image = UIImage(named: "\(name)/\(i)") {
        images.append(image)
        i += 1
    }
    return images
}
```
### 4. Cấu hình để ImageView chạy được ảnh động
Chúng ta đã có trình tải hình ảnh của mình, vì vậy bước cuối cùng là đặt những hình ảnh này vào `imageView` và cấu hình để ảnh động có thể hoạt động.
`UIImageView` có một tính năng sẵn có cho ảnh động, trong đó có một số thuộc tính có thể tùy chỉnh sau:
* Khoảng thời gian cho hình ảnh động: `animationDuration`.
Khoảng thời gian này được đo bằng giây, nó thể hiện cho việc sẽ hiển thị tất cả cách ảnh trong vòng bao nhiêu giây. Nếu bạn có 10 ảnh trong ảnh động, được hiển thị trong vòng 0.5 giây, thì mỗi ảnh sẽ được hiển thị trong vòng 0.5/10 giây. Giá trị mặc định của tham số khoảng thời gian này là 0.
* Số lần lặp lại của hình ảnh động: `animationRepeatCount`.
Thuộc tính này chỉ định số lần mà bạn muốn ảnh động lặp lại, giá trị 0 nghĩa là ảnh động sẽ được lặp lại mãi mãi.
Ngoài ra, bạn đừng quên thiết lập thuộc tính `image` với hình ảnh đầu tiên của ảnh động, nếu không, sẽ không có gì được hiển thị nếu hình động không chạy.
```
imageView.animationImages = animatedImages(for: "PodcastPlaying")
imageView.animationDuration = 0.9
imageView.animationRepeatCount = 2
imageView.image = imageView.animationImages?.first
imageView.startAnimating()
```

![](https://images.viblo.asia/6b0c2e68-fa25-42a5-ab09-4d80e859b6d4.gif)

### 5. Một phương án thay thế dùng UIImage
Ở trên, chúng ta đã có một cách triển khai bằng `UIImageView`, với một số tùy chỉnh cơ bản.
Lớp `UIImage` cũng có một đặc tính để tạo một đối tượng ảnh động, vẫn dựa trên mảng các ảnh thành phần.
Một lợi thế của của phương án này là cho phép bạn sử dụng thuộc tính `tintColor` để thay đổi màu cho ảnh động.
Với ví dụ trên, chúng ta tùy chỉnh màu cho ảnh động như sau:
```
let animatedImage = UIImage.animatedImage(with: images, duration: 1)
imageView.image = animatedImage
imageView.tintColor = UIColor.red
```

![](https://images.viblo.asia/13307789-3f34-43dd-9ca3-e607dc1aed14.gif)

Ngoài màu sắc, một lợi thế nữa của việc sử dụng `UIImage` là chúng ta có thể sử dụng các tính năng nâng cao cho `UIImage`, chẳng hạn như kéo giãn ảnh.

![](https://images.viblo.asia/cf0f1392-49f0-4890-8587-6e7b6f22f522.gif)  ![](https://images.viblo.asia/6e22f556-c384-4f18-8e64-7348fceeffc6.gif)

Để có nhiều thông tin chi tiết hơn về ảnh động, mời các bạn xem trong tài liệu của Apple dưới đây:

https://developer.apple.com/documentation/uikit/uiimage/1624149-animatedimage
https://developer.apple.com/documentation/uikit/uiimageview/1621068-animationimages

### Tóm tắt
Ảnh động là một cơ hội tốt để chúng ta thêm các hiệu ứng vào ứng dụng. UIKit cũng có một số tính năng sẵn có để hỗ trợ một số kiểu hiệu ứng như: hiệu ứng tải, phát sáng, quay các đối tượng...
Dưới đây là tóm tắt nhanh về 5 bước cần thực hiện để thêm hình ảnh hoạt hình vào ứng dụng của bạn:
1. Tạo một bộ hình ảnh cho hoạt hình của bạn
2. Thêm hình ảnh của bạn vào thư mục xcassets của XCode
3. Tạo trình lấy ra ảnh tự động
4. Cấu hình ImageView để chạy hình động
5. Phương án thay thế