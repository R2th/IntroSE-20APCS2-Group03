Ở hướng dẫn này bạn sẽ học được:
* Làm thế nào để thay đổi kích thước hình ảnh.
* Làm thế nào để mask hình ảnh của bạn.
* Tác dụng của LuminanceToAlpha là gì.

## Điều kiện tiên quyết
Để làm theo hướng dẫn này, bạn sẽ cần một số kiến thức cơ bản về:

* Cơ bản với Swift.
* Xcode 11 trở lên.

## Resizeable

Để sửa đổi kích thước của hình ảnh, bạn có thể sử dụng `resizeable()`.

```
Image("tesla")
.resizable()
.scaledToFill()
.frame(width: 200, height: 200)
```

![](https://images.viblo.asia/049b1822-0436-47ad-8aa8-0d84437cc250.png)

## Mask

Bạn có thể sử dụng mask bằng cách thêm một lớp lên trên nó.

```
.mask(RoundedRectangle(cornerRadius: 4.0))
```

![](https://images.viblo.asia/1348eead-a53b-4285-95a4-e20f36f8ac87.png)

```
.mask(Circle())
```

![](https://images.viblo.asia/3ab67d2a-994d-42e3-8d6f-be1a3631a189.png)

```
Image("tesla")
    .resizable()
    .scaledToFill()
    .frame(width: UIScreen.main.bounds.width, height: 200)
    .mask(Text("Tesla")
        .fontWeight(.black)
        .font(.system(size: 120))
        .frame(maxWidth: .infinity, alignment: .center))
```

![](https://images.viblo.asia/1a5e324d-b5fb-4209-a7c9-27e27f930a81.png)

## LuminanceToAlpha

LuminanceToAlpha tạo một semi-transparent mask. Vùng tối sẽ trở nên trong suốt, còn vùng sáng sẽ có màu đen đục. Và vùng có độ sáng trung bình sẽ trở thành màu xám đục.

Thử mã sau, bạn sẽ thấy tác dụng của LuminanceToAlpha. Dưới đây là so sánh hình ảnh có và không có LuminanceToAlpha.

![](https://images.viblo.asia/98aef978-f5d2-4ad1-9d30-72e740092d0f.png)


# Saturation
Hiểu một cách đơn giản, Saturation là độ rực màu hoặc độ bão hòa của màu, nó còn được hiểu là mức độ sử dụng của một màu nhất định nhiều hay ít

Tại đây, bạn sẽ thấy sự khác biệt của saturation từ 0 đến 5. Bạn có thể chọn điều chỉnh độ bão hòa theo thời gian.

```
Color.red
  .frame(width: 50, height: 50)
  .saturation(0)
  .overlay(Text("0"))
```

![](https://images.viblo.asia/703c7a83-e0ae-4962-b1c4-ec24c50885d6.png)

Hiệu ứng này cũng có thể được áp dụng cho hình ảnh.

```
Image("tesla")
    .resizable()
    .frame(width: 120, height: 120)
    .saturation(1)
    .overlay(Text("1"), alignment: .bottom)
```

![](https://images.viblo.asia/66696cb5-25c3-48ce-a54e-4f591c8ffc44.png)


# HueRotation
Hiểu một cách ngắn gọn thì HueRotation là chuyển đổi màu xoay vòng cho hình ảnh. Ae nhìn ví dụ để hiểu rõ hơn.
Bạn sẽ có một ví dụ về HueRotation, trong đó màu khi xoay sang một mức độ khác sẽ ra một màu khác. Ở đây, chúng ta sử dụng màu xanh lam và sẽ thử xoay nó sang các góc khác nhau để xem kết quả của nó nhé.

```
Color.blue
    .frame(width: 50, height: 50)
    .hueRotation(.degrees(-45.0))
    .overlay(Text("-45°"))
```

![](https://images.viblo.asia/c5445fc9-47f7-4989-ac09-23e5d34442fd.png)

Bất cứ điều gì bạn làm với Màu (View), về cơ bản bạn cũng có thể làm với Hình ảnh. Hãy xem hiệu ứng trên hình ảnh.

```
Image("tesla")
    .resizable()
    .frame(width: 120, height: 120)
    .hueRotation(.degrees(45.0))
    .overlay(Text("45°"), alignment: .bottom)
```

![](https://images.viblo.asia/ac579e83-be75-4010-8eef-d38f55ca3c08.png)

Cảm ơn mọi người đã theo dõi, mong nó sẽ giúp ích!