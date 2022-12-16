# SwiftUI: Shadow

Trong hướng dẫn này, chúng ta sẽ tìm hiểu Shadow trong SwiftUI là gì. Bạn sẽ học được:

* Cách sử dụng Shadow.

### Điều kiện tiên quyết

Để làm theo hướng dẫn này, bạn sẽ cần một số kiến thức cơ bản về:

* Cơ bản về Swift.
* Xcode 11 trở lên

### Shadow

Việc thêm shadow và corner radius là một mớ hỗn độn trong UIKit, bạn sẽ cần tạo hai view để đạt được điều đó. 
Dưới đây chỉ là một ví dụ về việc bao gồm cả radius và shadow.

```
Rectangle()
.fill(Color.green)
.cornerRadius(4.0)
.shadow(radius: 4.0)
.frame(width: 200, height: 200)
```

![](https://images.viblo.asia/066c87e3-5216-46cc-b215-c37751e6d842.png)

Bạn có thể điều chỉnh radius của shadow.

```
.shadow(radius: 20.0)
```

![](https://images.viblo.asia/f21977a8-48a9-42a0-b652-0d057f22be7e.png)

Bạn thậm chí có thể di chuyển shadow xung quanh với trục x và y.

```
.shadow(color: Color.blue, radius: 20, x: 50, y: 50)
```

![](https://images.viblo.asia/fc0be16c-f1c7-4a90-82c2-8caa6ecbc5cc.png)

# SwiftUI: Padding
### Padding

Padding tự động thêm 16px cho mỗi bên.

```
VStack {
    Rectangle()
        .fill(Color.green)
        .frame(width: 200, height: 200)
        .padding()
        .border(Color.red)
 
}
```

![](https://images.viblo.asia/61ef5413-9f4d-434b-86bf-074807061b24.png)

Có lẽ padding hơi lớn. Thử đổi padding thành 10px.

```
.padding(10.0)
```

![](https://images.viblo.asia/75be853c-bb33-4ab3-b7be-e804dc7dac02.png)

Bạn có thể chỉ padding bên trái.

```
.padding(.leading, 10)
```

![](https://images.viblo.asia/e005d7e8-0f42-4e82-9d5c-955dde54d4ad.png)

Bạn lại đổi ý và muốn padding ở bên trái và bên phải.

```
.padding(.horizontal)
```

![](https://images.viblo.asia/1646bca0-c411-4320-85a7-ebd5ffe26eb5.png)

Bạn có thể làm một cái gì đó khác một chút.

```
.padding([.leading, .bottom])
```

![](https://images.viblo.asia/8e5430e8-3d15-4716-ad35-bc13581d6e25.png)

Cảm ơn bạn đã theo dõi bài viết tới đây, mong nó sẽ giúp ích.

Nguồn: Internet.