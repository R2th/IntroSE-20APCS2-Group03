Với Gradient, bạn sẽ có thể tạo ra nhiều màu sắc hơn và đẹp hơn.

> A color gradient represented as an array of color stops, each having a parametric location value.

Apple Documentation.

Trong hướng dẫn này, bạn sẽ học cách triển khai các gradient khác nhau trong SwiftUI:
* Cách sử dụng Angular Gradient.
* Cách sử dụng Linear Gradient.
* Cách sử dụng Radial Gradient.

## Điều kiện tiên quyết
Để làm theo hướng dẫn này, bạn sẽ cần một số kiến thức cơ bản về:

* Cơ bản với Swift.
* Xcode 11 trở lên

## Angular Gradient

Với Angular Gradient, bạn đặt tâm của vòng tròn và gradient sẽ bắt đầu từ thông số mà bạn đặt và fill màu theo chiều kim đồng hồ.

```
let angularGradient = AngularGradient(gradient: Gradient(colors: [.black, .white, .black, .white]), center: .center, angle: .degrees(180))
 
var body: some View {
 
    VStack {
        Rectangle()
            .fill(angularGradient)
            .frame(width: 200, height: 200)
    }
    .padding()
}
```

Hiện tại, gradient bắt đầu fill từ 180 độ và di chuyển theo chiều kim đồng hồ.

![](https://images.viblo.asia/de838f4f-b4d6-4c19-8cc6-9f09c95efa8d.png)

Bạn thậm chí có thể điều chỉnh góc bắt đầu và kết thúc của gradient. Bạn sẽ đặt góc bắt đầu là 90 và góc kết thúc là 180.

```
let angularGradient = AngularGradient(gradient: Gradient(colors: [.black, .white, .black]), center: .center, startAngle: .degrees(90), endAngle: .degrees(180))
```

![](https://images.viblo.asia/aea216b5-51ef-4e7f-a6d5-3da5050f7ca7.png)

Nếu phần trung tâm hơi nhức mắt, bạn có thể di chuyển nó ra sau.

```
let angularGradient = AngularGradient(gradient: Gradient(colors: [.black, .white, .black, .white]), center: .bottomTrailing, angle: .degrees(0))
```

## Linear Gradient

Linear Gradient là gradient được sử dụng phổ biến nhất và có điểm bắt đầu và điểm kết thúc.

Apple đã làm rất tốt trong việc xác định trước UnitPoint khi sử dụng `.leading`, `.trailing`, `.top`, `.topLeading`, v.v. 
Tất cả những gì bạn phải biết là nó bắt đầu và kết thúc ở đâu.

Từ trái sang phải:

```
let linearGradient = LinearGradient(gradient: Gradient(colors: [.green, .yellow]), startPoint: .leading, endPoint: .trailing)
```

![](https://images.viblo.asia/5c20ae93-6502-49e7-b35f-7e1c64ca8fc3.png)

Từ trên xuống dưới:

```
let linearGradient = LinearGradient(gradient: Gradient(colors: [.green, .yellow]), startPoint: .top, endPoint: .bottom)
```

![](https://images.viblo.asia/c4f217f8-b442-4535-a560-1d113da9834d.png)

Từ trái sang phía trên bên phải:

```
let linearGradient = LinearGradient(gradient: Gradient(colors: [.green, .yellow]), startPoint: .leading, endPoint: .topTrailing)
```

![](https://images.viblo.asia/4adaee6a-1e5b-4c57-913b-59cb665ac92b.png)

Trong trường hợp bạn cần một hướng tùy chỉnh, bạn thậm chí có thể xác định Unit Point của riêng mình.

```
let linearGradient = LinearGradient(gradient: Gradient(colors: [.green, .yellow]), startPoint: UnitPoint(x: 0.9, y: 0.9), endPoint: UnitPoint(x: 0.25, y: 0.25))
```

![](https://images.viblo.asia/0ef2bc39-6100-4464-8829-64761b26536f.png)

## Radial Gradient

Radial Gradient hoạt động giống như Linear Gradient, ngoại trừ điểm bắt đầu và điểm kết thúc. Với Radial Gradient, bạn chỉ định bán kính bắt đầu và bán kính kết thúc, sau đó gradient sẽ fill theo hình tròn và di chuyển dần ra ngoài.

```
let radialGradient = RadialGradient(gradient: Gradient(colors: [.blue, .purple]), center: .center, startRadius: 1, endRadius: 20)
```

![](https://images.viblo.asia/a6c360b4-ed98-4707-b4a0-6dc2791225b8.png)

Để làm nó rõ hơn, bạn chỉ cần đặt bán kính cao hơn.

```
let radialGradient = RadialGradient(gradient: Gradient(colors: [.blue, .purple]), center: .center, startRadius: 10, endRadius: 70)
```

![](https://images.viblo.asia/d3bdcbe9-fe01-4403-8974-960ee0038a27.png)

Nếu bạn không thích vẽ ở center. Bạn có thể xác định điểm bắt đầu. Bạn sử dụng `.topLeading` và nó sẽ xuất hiện ở trên cùng bên trái.

```
let radialGradient = RadialGradient(gradient: Gradient(colors: [.blue, .purple]), center: .topLeading, startRadius: 10, endRadius: 70)
```

![](https://images.viblo.asia/dd3ae5ee-8049-48fd-a141-57667c1f7d11.png)

Nó có ý nghĩa gì ở đây?

Nhìn vào hình ảnh dưới đây, bán kính bắt đầu bắt đầu từ vòng tròn bên trong và kết thúc ở vòng tròn bên ngoài. 
Giữa vòng tròn bên trong và bên ngoài, đó là nơi bắt đầu gradient.

![](https://images.viblo.asia/f3a89f63-2e32-422b-8372-6b5cfc0b3940.png)

![](https://images.viblo.asia/795cd794-ffb9-4784-9678-a20973f20641.png)

Cảm ơn các bạn đã xem hết bài viết, mong nó sẽ giúp ích được cho các bạn.