![](https://images.viblo.asia/1e8e5bbd-b5cf-491d-be86-109c4180a700.jpeg)

Với màu sắc, bạn có thể mang lại một cái gì đó nghệ thuật hơn cho ứng dụng của bạn. 

Có lẽ một số thiết kế nên có màu sắc nhất định và không chỉ có màu đen và trắng.

Trong hướng dẫn này, bạn sẽ tìm hiểu thêm về Color trong SwiftUI (chủ yếu là những gì bạn có thể làm với nó).

## Điều kiện tiên quyết

Để làm theo hướng dẫn này, bạn sẽ cần một số kiến thức cơ bản về:
* Swift 
* Ít nhất là Xcode 11

## Secondary Color

Apple đã tạo ra các màu `Primary` và `Secondary` có thể được sử dụng trên văn bản trong các tiêu đề, v.v. 
Dưới đây là một thí nghiệm xếp chồng màu thứ cấp, nó sẽ tự điều chỉnh màu.

```
ZStack {
Color.secondary
Color.secondary.padding()
Color.secondary.padding(40)
Color.secondary.padding(60)
}
.frame(width: 250, height: 250)
.padding()
```

![](https://images.viblo.asia/3d04ea05-ccee-4af6-8ebf-1a80c4287edb.png)

Khi bạn bật Chế độ Dark Mode trong simulator, nó sẽ thay đổi màu sắc. Xử lý thứ cấp Chế độ Light và Dark cho bạn.

## Color Multiply

Bạn cũng có thể thêm các màu sắc với nhau và xem kết quả.

```
HStack {
Color.blue.frame(width: 50, height: 50)
Image(systemName: "plus").font(.title)
Color.green.frame(width: 50, height: 50)
Image(systemName: "equal").font(.title)
Color.blue.colorMultiply(.green).frame(width: 50, height: 50)
}
.padding()
```

![](https://images.viblo.asia/58fd444e-c931-4c11-9afc-ae733bfae405.png)

## Opacity

Đôi khi bạn cần một màu sáng hơn của một màu nhất định. Đó là nơi mà opacity đóng vai trò quan trọng.

```
Color.blue.frame(width: 200, height: 50).opacity(0.2)
```

![](https://images.viblo.asia/5c66d74a-1183-4d87-8ede-256b82b5e3c8.png)

## Color Literal

Nếu bạn là người thích xem màu, bạn có thể chọn `Color Literal`. Để kích hoạt điều đó, bạn có thể làm như sau và chọn `Color Literal`.

![](https://images.viblo.asia/58b40b0c-8808-4c7d-a6e2-f6d3fa351dd8.png)

Bây giờ một màu sẽ xuất hiện và bằng cách nhấp đúp vào nó, bạn sẽ có thể chọn màu của riêng bạn.

![](https://images.viblo.asia/6b6b1c72-37f7-4b8b-b716-d39aefd0016f.png)

Nếu bạn có ý tưởng bạn có thể làm được nhiều thứ hơn với Color trong SwiftUI. 

Hãy khám phá và chia sẻ những gì bạn tìm thấy nhé.

Cảm ơn các bạn đã theo dõi bài viết tới đây.!

Nguồn: Medium.com