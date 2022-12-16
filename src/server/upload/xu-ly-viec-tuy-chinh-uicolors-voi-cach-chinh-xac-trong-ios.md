> Nếu bạn là nhà phát triển ứng dụng thì bạn chắc chắn phải đối mặt với một số thách thức khi xử lý nhiều mã màu mà bạn đã sử dụng trong nhiều ứng dụng.
## Mở đầu
Nếu bạn muốn thay đổi màu sắc cho một **UIView** trên **storyboard** bạn sẽ phải thông qua một màn hình chọn màu hoặc bạn thực hiện việc này trong code thông các hàm khởi tạo màu của class UIColor như:

* **init(white: CGFloat, alpha: CGFloat)**
* **init(hue: CGFloat, saturation: CGFloat, brightness: CGFloat, alpha: CGFloat)**
* **init(red: CGFloat, green: CGFloat, blue: CGFloat, alpha: CGFloat)**
* **init(CGColor cgColor: CGColor!)**
* **init(patternImage image: UIImage)**
* **init(CIColor ciColor: CIColor)**

Điều này có vẻ khá là nhàm chán trong khi chúng ta phải thiết lập màu sắc bằng cách đưa ra các giá trị thích hợp, ví dụ:

```swift
self.view.backgroundColor = UIColor(red: 120/255, green: 150/255, blue: 200/255, alpha: 1)
```
## Color Sets
Apple đã giới thiệu một thứ gọi là **Color Sets** từ Xcode 9. **Color Sets** sẽ giúp bạn xác định tất cả các màu của bạn tại một nơi. Bạn có thể dễ dàng thêm màu tùy chỉnh của mình. Thực tế, điều thú vị là bạn có thể đưa ra quy ước đặt tên thích hợp cho từng màu. 

Ngoài ra nó sẽ rất hữu ích khi bạn muốn thay đổi các giá trị màu sắc, bạn sẽ thay đổi ở một nơi và nó sẽ cập nhật ở khắp mọi nơi. Là một Dev, bạn có thể dễ dàng nhớ màu đó bằng tên của nó, bạn cũng có thể reference và sử dụng nó trong một dự án khác. Điều này làm cho công việc lập trình của chúng ta dễ dàng phải không?

Nào! hãy bắt đầu với từng bước đơn giản sau đây:

### Tạo Color Sets

Bạn cần thêm mới một **“New Color set”** trong file **assets** của bạn.

![](https://images.viblo.asia/1e3ab562-e1c1-4e1b-8c94-eee4caa7053a.png)

Lựa chọn một Color Sets và thay đổi màu theo yêu cầu bạn muốn trên màn hình tuỳ chỉnh màu.

![](https://images.viblo.asia/a977134a-6339-44e5-a977-64ba214b7201.png)

Tuỳ chỉnh màu sắc theo mong muốn của bạn.

![](https://images.viblo.asia/d6cb306d-849c-43db-ae13-9697fd76f757.png)

Thêm một vài màu khác với color sets ở đây tôi thêm vào màu cho **Font**.

![](https://images.viblo.asia/a947307e-6689-4b31-a430-bc0245ef86d6.png)


### Sử dụng Color Sets

Bây giờ là lúc để sử dụng màu tùy chỉnh này vào ứng dụng. Trước tiên, chúng ta có thể đặt màu sắc của **UIView** ngay trên **Storyboard** thông qua màn hình chọn màu.
<br>
<br>
Lựa chọn màu nền cho **UIView**.

![](https://images.viblo.asia/8dd4ddb8-afaa-4291-a436-45b3a11c63fb.png)

Lựa chọn màu cho nội dung text trên **Label**

![](https://images.viblo.asia/6706b86b-fd97-44e2-9faa-0090400b9567.png)

Bạn cũng có thể kéo thả nhưng Color sest này ngay trong code của mình.

![](https://images.viblo.asia/8a12ea41-11dc-4718-aa42-ed4e9377c823.png)

Khá là đơn giản phải không :)

## Tóm lại

Có đôi chút tiếc nối khi đến tận xCode9 nó mới xuất hiện và chỉ hỗ trợ iOS 11 trở lên. Nhưng đây cũng là một tính năng khá hay ho khi lập trình. Một mẹo vặt mà không phải ai cũng để ý đến nó, có thể là bạn đã quá quen với những cách làm trước đó. Nhưng tôi tin chắc rằng bạn sẽ cảm thấy thoải mái khi sử dụng tính năng này.
<br>
<br>
Thank for reading!
<br>
<br>
[Nguồn bài viết đây nhé](https://medium.com/@kishannakum/handle-custom-uicolors-with-correct-way-in-ios-a226057b60a0) :)