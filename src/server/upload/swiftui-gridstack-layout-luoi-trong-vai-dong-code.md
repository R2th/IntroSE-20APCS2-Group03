Như các bạn đã biết SwiftUI đang là xu hướng mới trong lập trình iOS, nó là một công cụ giúp cho việc xây dựng giao diện người dùng trở nên dễ dàng và trực quan hơn.
Cho dù chưa được Apple chính thức ra mắt, nhưng SwiftUI đã trở thành mối quan tâm lớn nhất của cộng đồng các nhà phát triển iOS trong thời gian qua.
Trong bài viết này, chúng ta cùng nhau tìm hiểu về GridStack, một thành phần mới của SwiftUI, một dạng layout views lưới linh hoạt, tiện lợi.

## GridStack - layout lưới trong vài dòng code

Thông thường, để tạo ra 1 giao diện với layout có dạng lưới với UIKit, chúng ta sẽ có khá nhiều việc phải làm với UICollectionView, từ việc xử lý datasource cho đến tính toán kích thước các item trong 1 đống các function của UICollectionViewDelegateFlowLayout.

Nhưng với GridStack, chúng ta có thể dễ dàng tạo ra giao diện lưới với vài dòng code. Những việc cần làm chỉ đơn giản là truyền vào giá trị chiều rộng nhỏ nhất mà các grid cell cần có và khoảng cách giữa chúng và chúng sẽ tự điều chỉnh kích thước dựa trên kích thước cho phép của các màn hình khác nhau.

Code sẽ trông như sau:

```
GridStack(minCellWidth: 300, spacing: 2, numItems: 15) { index, cellWidth in
    Text("\(index)")
        .color(.white)
        .frame(width: cellWidth, height: cellWidth * 0.66)
        .background(Color.blue)
}
```

Chúng ta sẽ nhận được kết quả như bên dưới:

![](https://images.viblo.asia/eec0fe65-70de-4edb-b2a7-cb8a7701c3f6.png)

Chúng cũng sẽ tự điều chỉnh số lượng item trên 1 hàng để phù hợp với kích thước mong muốn, khi device được xoay:

![](https://images.viblo.asia/4e772b86-410c-418b-947c-65e10e3e0c42.gif)

## Tổng quan về sử dụng

Hãy nghĩ về lưới theo chiều rộng tối thiểu bạn muốn các ô của bạn là bao nhiêu. Bằng cách đó, nó dễ dàng điều chỉnh cho bất kỳ không gian có sẵn. Kích thước khác duy nhất bạn cần cung cấp là khoảng cách giữa các ô.

Để thực sự tạo lưới, chúng ta cần biết số lượng các items. Sau đó, trình xây dựng chế độ xem nội dung sẽ được gọi với mỗi chỉ mục và cellWidth mà sau đó bạn có thể chuyển đến khung của bất cứ thứ gì bạn muốn hiển thị bên trong.

## Kích thước của views bên trong các cells

Lưới sẽ gói mỗi item mà bạn cung cấp trong 1 view được định nghĩa bởi cellWidth với chiều ngang của chúng. Không có bất cứ giá trị nào để định nghĩa cho chiều cao của cell. Điều đó có nghĩa bạn có thể điều chỉnh kích thước nội dung của cell linh hoạt nhất có thể. Dưới đây là một vài ví dụ mà bạn có thể thực hiện

* Chiều cao được định nghĩa bởi nội dung

```
GridStack(...) { index, cellWidth in
    Text("\(index)")
        // Không truyền bất cứ chiều cao nào vào frame, mà chúng sẽ tự xác định dựa vào nội dung
        .frame(width: cellWidth)
}
```

* Items hình vuông

```
GridStack(...) { index, cellWidth in
    Text("\(index)")
        // Truyền vào cellWidth cho width và height để tạo ra lưới với các hình vuông
        .frame(width: cellWidth, height: cellWidth)
}
```

* Kích thước dựa trên tỉ lệ khung hình

```
GridStack(...) { index, cellWidth in
    Text("\(index)")
        // Truyền vào cellWidth cho chiều rộng và chiều cao sẽ xác theo tỉ lệ so với chiều rộng
        .frame(width: cellWidth, height: cellWidth * 0.75)
}
```

## Khởi tạo

Một khởi tạo đầy đủ của GridStack sẽ có dạng như sau:

```
GridStack(
    minCellWidth: Length,
    spacing: Length,
    numItems: Int,
    alignment: HorizontalAlignment = .leading,
    content: (index: Int, cellWidth: CGFloat) -> Void
)
```

## Kết luận

Trên đây chúng ta đã cùng tìm hiểu một thành phần mới của SwiftUI - GridStack - một công cụ để xây dụng giao diện người dùng dạng lưới một cách đơn giản và trực quan.
Hy vọng bài viết trên sẽ hữu ích với các bạn trong quá trình tìm hiểu các tính năng mới mà 1 công cụ mạnh mẽ SwiftUI mang lại.

Bài viết được dịch từ: https://github.com/pietropizzi/GridStack