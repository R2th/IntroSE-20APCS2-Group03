Trong SwiftUI ***frame*** vừa có thể được sử dụng để chỉ định chiều rộng hoặc chiều cao tĩnh cho một view nhất định hoặc để áp dụng các giới hạn “constraints-like” trong đó view có thể phát triển hoặc thu nhỏ tùy thuộc vào nội dung và các view xung quanh.


đây là hai cách sử dụng phổ biến của ***frame*** để sửa đổi view có thể trông như thế nào:

```
// A view that displays a 30x30 fixed-sized icon using an SFSymbol:
struct Icon: View {
    var name: String
    var tintColor: Color = .blue

    var body: some View {
        Image(systemName: name)
            .foregroundColor(tintColor)
            .frame(width: 30, height: 30)
    }
}

// A view that displays a decorative image that's resized according
// to its aspect ratio, with a maximum width of 200 points:
struct DecorativeImage: View {
    var name: String

    var body: some View {
        Image(name)
            .resizable()
            .aspectRatio(contentMode: .fit)
            .frame(maxWidth: 200)
    }
}
```

Mặc dù cả hai cách sử dụng ***frame*** ở trên đều cực kỳ hữu ích, nhưng đôi khi chúng ta có thể không muốn chỉ định bất kỳ thông số cố định nào khi quyết định kích thước view. Cũng có một cách để làm cho một view nhất định mở rộng vô hạn, điều này có thể hữu ích trong nhiều loại tình huống khác nhau.

Ví dụ: giả sử chúng ta đang làm việc trên một view hiển thị một mảng danh mục dưới dạng lưới hai cột bằng cách sử dụng kiểu LazyVGrid của SwiftUI:

```
struct CategoryGrid: View {
    var categories: [Category]

    var body: some View {
        LazyVGrid(columns: columns) {
            ForEach(categories) { category in
                Text(category.name)
                    .padding()
                    .background(category.color)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
        }
        .padding()
    }

    private var columns: [GridItem] {
        let item = GridItem(.flexible(minimum: 50, maximum: .infinity))
        return [item, item]
    }
}
```

![](https://images.viblo.asia/f3d8fe97-e336-4990-a0db-e6a7a67b823d.png)

Danh hiện không trông ổn lắm, vì mỗi ô kết thúc có một kích thước khác nhau dựa trên văn bản mà nó đang hiển thị.

Điều đó ban đầu có vẻ hơi lạ - vì chúng ta chỉ định rằng cả hai cột của chúng ta phải linh hoạt với chiều rộng tối đa vô hạn - nhưng vì view Text không tự kéo dài để vừa với vùng chứa của nó, nên màu nền của mỗi view sẽ chỉ cuối cùng chiếm kích thước của Text.

Vấn đề có thể dễ dàng được giải quyết bằng cách sử dụng ***frame*** hợp với hằng số CGFloat.infinity mà chúng ta cũng đã sử dụng ở trên khi tạo các giá trị GridItem đại diện cho các cột. Bằng cách chèn một công cụ sửa đổi như vậy trước khi hiển thị nền, bây giờ chúng ta có thể làm cho hiển thị trông đẹp hơn nhiều:

```
struct CategoryGrid: View {
    var categories: [Category]

    var body: some View {
        LazyVGrid(columns: columns) {
            ForEach(categories) { category in
                Text(category.name)
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(category.color)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
        }
        .padding()
    }

    ...
}
```

![](https://images.viblo.asia/ab6f21af-f83e-4ad1-9088-83fb44ab5956.png)

Vì vậy, việc áp dụng frame với chiều rộng tối đa vô hạn hoặc chiều cao tối đa có thể là một cách tuyệt vời để lấp đầy tất cả không gian có sẵn trên trục ngang hoặc trục dọc.

Hãy xem một ví dụ khác, chúng ta đã xây dựng một InfoView có thể được sử dụng để hiển thị một đoạn văn bản thông tin cùng với tiêu đề. Mục đích của chúng ta là để các view thông tin này luôn được hiển thị trên toàn bộ chiều rộng của màn hình (trừ một số phần đệm), điều này rất có thể xảy ra trên iPhone chạy theo hướng dọc, nhưng ở chế độ ngang (hoặc trên iPad) có thể không có đủ văn bản để bao phủ toàn bộ chiều rộng của màn hình:

```
struct InfoView: View {
    var title: String
    var text: String

    var body: some View {
        HStack(alignment: .top, spacing: 15) {
            Image(systemName: "info.circle")
            VStack(alignment: .leading, spacing: 10) {
                Text(title).font(.headline)
                Text(text)
            }
        }
        .padding()
        .foregroundColor(.white)
        .background(Color.blue)
        .cornerRadius(20)
    }
}
```

![](https://images.viblo.asia/ad963314-3098-4804-9e52-c3e30c2ef09e.png)

Một cách để khắc phục sự cố đó là sử dụng Spacer để điền vào khoảng trống theo chiều ngang còn lại - điều này sẽ làm cho InfoView của chúng ta luôn hiển thị trên toàn bộ chiều rộng của view cha một cách hiệu quả. Tuy nhiên, trong khi spacers thực sự là một phần thiết yếu của hệ thống layout của SwiftUI, trong trường hợp này, việc thêm Khoảng cách vào view của chúng ta thực sự có thể phá vỡ layout dọc của nó - vì bộ đệm luôn chiếm một lượng không gian tối thiểu theo mặc định và vì HStack của chúng ta áp dụng 15 points khoảng cách giữa mỗi phần tử của nó:

```
struct InfoView: View {
    ...

    var body: some View {
        HStack(alignment: .top, spacing: 15) {
            Image(systemName: "info.circle")
            VStack(alignment: .leading, spacing: 10) {
                Text(title).font(.headline)
                Text(text)
            }
            Spacer()
        }
        ...
    }
}

```

![](https://images.viblo.asia/c93b8cf6-bdd7-4a2a-aac5-7cde4dc5af73.png)

Đây một lần nữa là một trường hợp sử dụng tuyệt vời khác cho ***frame***, trong trường hợp này có thể hoạt động như một bộ đệm nếu chúng ta không chỉ chỉ định ***infinity*** làm ***maxWidth*** của nó mà còn yêu cầu nó căn chỉnh nội dung của nó theo leading - như thế này :

```
struct InfoView: View {
    ...

    var body: some View {
        HStack(alignment: .top, spacing: 15) {
            Image(systemName: "info.circle")
            VStack(alignment: .leading, spacing: 10) {
                Text(title).font(.headline)
                Text(text)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        ...
    }
}
```

![v5.png](https://images.viblo.asia/7e5592f3-0ee1-482b-8083-d4596b9acfd5.png)

Lưu ý cách chúng ta cần chỉ định ***.leading*** làm căn chỉnh cho cả VStack, vì cái trước căn chỉnh nội dung của stack (hoặc hai texts), trong khi cái sau căn chỉnh chính stack trong view xung quanh của nó.

Tất nhiên, thay vì sử dụng ***.infinity*** làm chiều rộng tối đa, chúng ta cũng có thể chọn chỉ định một giá trị cố định để ngăn view của chúng tôi trải dài quá nhiều trên các thiết bị lớn hơn, chẳng hạn như iPad.

Như vậy chúng ta vừa sử dụng thử một cài cách làm việc với frame trong SwiftUI, tôi hy vọng nó sẽ hữu ích. Bài viết được dịch từ [bài viết cùng tên của tác giả John Sundell.](https://www.swiftbysundell.com/articles/swiftui-frame-modifier/)