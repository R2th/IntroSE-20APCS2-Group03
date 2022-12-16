Bạn có thể sử dụng inset để bố trí nội dung của các `button` hệ thống hoặc custom. Với inset, bạn có thể thêm hoặc xóa khoảng trắng vào tiêu đề của button (`titleEdgeInsets`), hình ảnh (`imageEdgeInsets`) và cả tiêu đề và hình ảnh cùng nhau (`contentEdgeInsets`).

Để xem ba thuộc tính này hoạt động như thế nào, hãy tạo một nút (UIButton) thông qua file xib hoặc viết bằng code. Nó chỉ cung cấp một `center` theo chiều dọc và chiều ngang trong `constraint` của view cha. Cung cấp cho `contentView` màu nền màu xanh lam, `imageView` màu nền đỏ và `titleLabel` màu vàng. Trên đó, bạn cũng có thể cho đường viền của button màu xanh lá cây.

```
button.backgroundColor = .blue
button.imageView?.backgroundColor = .red
button.titleLabel?.backgroundColor = .yellow
button.layer.borderColor = UIColor.green.cgColor
button.layer.borderWidth = 2
```

![](https://images.viblo.asia/0341383c-2747-445e-a347-7dffc276441f.png)

`contentEdgeInsets` đang hoạt động như bạn mong đợi. Bạn có thể thêm không gian xung quanh cả `imageView` và `titleLabel` bằng cách sử dụng các giá trị.

```
let spacing: CGFloat = 8.0
button.contentEdgeInsets = UIEdgeInsets(top: 0, left: spacing, bottom: 0, right: spacing)
```

![](https://images.viblo.asia/f27aa75e-13a9-4bd6-8bc7-d8298c3606d1.png)

Quy tắc khi nói đến `titleEdgeInsets` hoặc `imageEdgeInsets` là thêm các phần bù bằng nhau vào insets của cả bên trái và bên phải. Vì vậy, nếu bạn thêm 8 `points` vào inset của tiêu đề bên trái, bạn cần thêm -8 `points` cho phần bên phải. Theo cách này, bạn chỉ sử dụng `insets` để bù tiêu đề hoặc hình ảnh và không thay đổi kích thước chúng theo bất kỳ cách nào. Nếu bạn không làm điều này, layout được tính toán có thể trở nên quá nhỏ và tiêu đề có thể bị cắt bớt và khoảng cách sẽ hiển thị một số hành vi kỳ lạ.

```
button.titleEdgeInsets = UIEdgeInsets(top: 0, left: spacing, bottom: 0, right: 0)
```

![](https://images.viblo.asia/fa75b497-722c-4d69-9f95-8e5e84616bf7.png)

Để thay đổi vị trí tiêu đề và hình ảnh, chúng ta có thể sử dụng `imageEdgeInsets` và `titleEdgeInsets` để di chuyển `imageView` phía sau `titleLabel`. Đầu tiên chúng ta di chuyển `imageView` cùng số lượng với chiều rộng nút sang phải và sau đó chúng ta trừ đi độ rộng của hình ảnh để `imageView` sẽ ở trong chế độ xem nội dung. Nó sẽ trông giống thế này:

![](https://images.viblo.asia/e0b8d93c-08d1-4133-ae41-79f6f786a75a.png)

Chúng tôi đặt giá trị ngược lại của `inset` bên trái cho `inset` bên phải:

```
let buttonWidth = button.frame.width
let imageWidth = button.imageView!.frame.width
button.imageEdgeInsets = UIEdgeInsets(top: 0, left: buttonWidth-imageWidth, bottom: 0, right: -(buttonWidth-imageWidth))
```

Sau đó, chúng ta có thể di chuyển `titleLabel` với cùng chiều rộng của `imageView` sang trái:

![](https://images.viblo.asia/2ed42cdc-68bc-4ad9-b384-d354414f027d.png)

```
button.titleEdgeInsets = UIEdgeInsets(top: 0, left: -imageWidth, bottom: 0, right: imageWidth)
```

Nếu bạn muốn có một số khoảng cách giữa `imageView` và `titleLabel`, bạn cần thêm một nửa khoảng cách vào `titleLabel` và một nửa khoảng cách cho `imageView` như sau:

```
let buttonWidth = button.frame.width
let imageWidth = button.imageView!.frame.width
let spacing: CGFloat = 8.0 / 2
button.imageEdgeInsets = UIEdgeInsets(top: 0, left: buttonWidth-imageWidth + spacing, bottom: 0, right: -(buttonWidth-imageWidth) - spacing)
button.titleEdgeInsets = UIEdgeInsets(top: 0, left: -imageWidth - spacing, bottom: 0, right: imageWidth + spacing)
```

![](https://images.viblo.asia/6180d39f-9c14-4eb7-aa62-7c52a022543b.png)

Nhưng hiện tại `titleLabel` và `imageView` vượt quá chế độ xem nội dung. Chúng tôi có thể bù đắp cho điều đó với `contentEdgeInsets`:

```
button.contentEdgeInsets = UIEdgeInsets(top: 0, left: spacing, bottom: 0, right: spacing)
```

![](https://images.viblo.asia/6e549775-33ac-4828-991a-15b228da6dcb.png)

Nhưng điều gì sẽ xảy ra nếu chúng ta muốn có `imageView` với một lề nhất định từ cạnh đuôi và `titleLabel` làm trung tâm?

Chúng ta có thể làm cho nút lớn hơn bằng cách cho nó một khoảng cách lớn hơn, ví dụ 128 points. Sau đó, chúng ta cần di chuyển `imageView` chiều rộng của nút cộng với khoảng cách sang bên phải trừ đi một lề mà chúng ta muốn `imageView` nằm ở cạnh phải (16 points trong trường hợp của chúng ta). Sau đó, chúng ta phải bù cho khoảng cách tương tự nhưng ngược lại ở cạnh bên phải để giữ cho `imageView` edgeInset cùng kích thước.

Khi thêm một hình ảnh, tiêu đề được đẩy sang phải với số lượng chiều rộng của hình ảnh. Trong ví dụ trên, `imageView` cùng với `titleLabel` được đặt ở giữa, nhưng bây giờ chúng ta chỉ cần căn giữa `titleLabel`. Để làm như vậy, chúng ta đặt tiêu đề bên trái và bên phải `titleEdgeInset` bằng một nửa chiều rộng của `imageView`. Chúng tôi làm điều đó ở cả hai bên để giữ cho tiêu đề có cùng kích thước, nếu không bạn sẽ có được một tiêu đề bị cắt ngắn.

```
button.imageEdgeInsets = UIEdgeInsets(top: 0, left: buttonWidth + spacing — imageWidth — 16, bottom: 0, right: -spacing)
button.titleEdgeInsets = UIEdgeInsets(top: 0, left: -imageWidth/2, bottom: 0, right: imageWidth/2)
button.contentEdgeInsets = UIEdgeInsets(top: 0, left: spacing, bottom: 0, right: spacing)
```

![](https://images.viblo.asia/b1363204-1c01-4959-b422-e43bef129cb8.png)

Khi bạn đặt nút giới hạn độ rộng, bạn có thể đặt lề thành 0 hoặc bỏ hết các lề. Ràng buộc về chiều rộng sẽ mở rộng chế độ xem nội dung.

Link: https://medium.com/short-swift-stories/using-uiedgeinsets-to-layout-a-uibutton-44ba04dd085c