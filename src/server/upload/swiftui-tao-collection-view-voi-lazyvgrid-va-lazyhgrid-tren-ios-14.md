# I. Giới thiệu
Như đã biết, SwiftUI đã được giới thiệu trên iOS 13. Do vẫn là framework còn non trẻ, nên SwiftUI có rất nhiều thứ cần cải thiện để hoàn thiện mình, để đủ sức thay thế UIKit. Trước đây trên iOS 13, chúng ta đã có thể dùng List để thay thế UITableView, nhưng lại không hề có View nào tương ứng để thay thế UICollectionView. May thay, tới iOS 14, SwiftUI đã được thêm 2 View mới: LazyVGrid và LazyHGrid, sự thay thế hoàn hảo cho UICollectionView trong UIKit.

Trong bài viết này, chúng ta sẽ cùng tìm hiểu cách tạo 1 "collection view" với LazyVGrid và LazyHGrid.

# II. Nội dung

## 1. Tạo demo project

Các bạn mở Xcode ->  File -> New -> Project -> iOS -> App -> đặt tên project là LazyGrid, chọn interface SwiftUI -> create project.

Tương tự như List để tạo UITableView, cách sử dụng LazyHGrid và LazyVGrid cũng rất đơn giản, không cần phải sử dụng Datasource hay Delegate gì cả. Chúng ta chỉ cần làm 3 bước đơn giản như sau:
* Tạo mảng các giá trị cần fill vào Grid
* Tạo mảng GridItem: Đây là nơi chúng ta định nghĩa các view trong Grid sẽ trông như thế nào, layout ra làm sao
* Tạo Grid: truyền vào thông tin của mảng GridItem, tạo các View từ mảng giá trị để hiển thị

Nói thì có vẻ dài dòng, ốp vào code sẽ thấy nó đơn giản ngắn gọn ngay.

## 2. Tạo Grid (lưới)

Bây giờ chúng ta sẽ tạo 1 grid demo hiển thị ảnh của các icon của system. Apple cung cấp cho chúng ta hàng nghìn ảnh icon có sẵn trong iOS, được gọi là [SF Symbols](https://developer.apple.com/design/human-interface-guidelines/sf-symbols/overview/). Tất cả các icon này đều có sẵn, để tạo ảnh icon, các bạn chỉ cần viết code như sau:

```Swift
Image(systemName:”pencil”)
```

##### Bước 1: tạo mảng các icon:

Trong file ContentView.swift, tạo property cho struct ContentView như sau:

```Swift
private var icons = ["pencil", "trash", "printer.fill", "folder", "tray", "hare", "headphones", "ant", "mic", "plus.bubble", "video", "leaf"]
```

##### Bước 2: tạo mảng GridItem:

Ngay dưới property icons vừa tạo, chúng ta thêm code sau:

```Swift
private var gridItems = [GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible())]
```

##### Bước 3: tạo Grid:

Trong body của ContentView, chúng ta thêm code như sau:

```Swift
	var body: some View {
        // 1
        ScrollView {
            // 2
            LazyVGrid(columns: gridItems, spacing: 20) {
                // 3
                ForEach(icons, id: \.self) {
                    // 4
                    Image(systemName: $0)
                        .font(.system(size: 30))
                        .frame(width: 50, height: 50)
                        .background(Color.red)
                        .cornerRadius(10)
                }
            }
        }
    }
```

Chỉ với mấy dòng code, chúng ta đã tạo được 1 Grid view. Bên trên chúng ta lần lượt làm các việc:
* 1. Nhúng Grid trong ScrollView. bản thân Grid không tự scroll, để có thể cuộn Grid chúng ta cần để nó trong ScrollView
* 2. Tạo Grid View, cụ thể ở đây là LazyVGrid. mảng gridItems được truyền vào để xác định layout của Grid
* 3. Duyệt các phần tử trong mảng icons để tạo các View trong Grid. Các bạn đừng nhầm lẫn ForEach này với forEach của Swift nhé. Đây là struct của SwiftUI, còn forEach() là hàm của swift
* 4. Tạo các image View, đây là các phần tử sẽ hiển thị trên Grid

Xong, chúng ta đã tạo xong Grid, build project sẽ được kết quả như sau:

![](https://images.viblo.asia/92ba235d-0bee-44b0-b29b-20fc35bccfb7.png)

Cách tạo Grid đã rõ, dưới đây chúng ta sẽ tìm hiểu cách bố trí các View trong Grid

## 3. Layout Grid

Như đã nói bên trên, layout của Grid được xác định bằng mảng `gridItems`. Bên trên chúng ta tạo `gridItems` gồm 3 phần tử, nên Grid hiển thị ra 3 cột.

Trước tiên, chúng ta thay đổi đoạn code fix frame của `Image` bằng code flexible frame như sau:

```Swift
Image(systemName: $0)
	.font(.system(size: 30))
	.frame(minWidth: 0, maxWidth: .infinity, minHeight: 50) // flexible frame
	.background(Color.red)
	.cornerRadius(10)
```

Sau khi để frame của Image flexible, chúng ta được kết quả như sau: (khoảng cách giữa các Image là 20 do được setting spacing trong `LazyVGrid`)

![](https://images.viblo.asia/c89fe5e9-c6c1-4dbd-871b-8319ad352a58.png)

Tiếp theo, giả sử muốn có 4 cột mỗi hàng, chúng ta sửa gridItems như sau:

```Swift
private var gridItems = [GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible())]
```

Kết quả thu được như sau:

![](https://images.viblo.asia/456871c3-ad1f-47e7-809f-83be36d44e1c.png)

Ngoài `.flexible`, `GridItem` còn có thể được khởi tạo với 2 thuộc tính khác: `.adaptive` hoặc `.fixed`
* `.adaptive`: thuộc tính này sẽ tự động tính toán khoảng trống của Grid, để điền càng nhiều View vào Grid càng tốt
* `.fixed`: thuộc tính này đơn giản nhất, fix size của View vào 1 kích thước cố định

Nếu sử dụng `.adaptive` GridItem, chúng ta làm như sau:

```Swift
private var gridItems = [GridItem(.adaptive(minimum: 50))]
```

Kết quả được như hình sau:

![](https://images.viblo.asia/0e331fc2-4aa9-4704-a42c-351153e4066e.png)

Sử dụng `.fixed` thì như sau:

```Swift
private var gridItems = [GridItem(.fixed(100)), GridItem(.fixed(150))]
```

Kết quả như sau:

![](https://images.viblo.asia/a4d05685-d7b3-47f6-8f00-5ebfbbbd7b3d.png)

Chúng ta có thể sử dụng kết hợp cả 3 loại GridItem `.flexible`, `.adaptive` và `.fixed`. Tuy nhiên do `.flexible` và `.adaptive` đều tự nội suy kích thước, nên các bạn chỉ nên kết hợp `.flexible` và `.fixed`, hoặc `.adaptive` và `.fixed` chứ không nên sử dụng `.flexible` và `.adaptive` cùng với nhau để tránh những kết quả không mong muốn.

Giả sử tôi dùng chung `.fixed` và `.adaptive` như sau:

```Swift
private var gridItems = [GridItem(.fixed(100)), GridItem(.adaptive(minimum: 50))]
```

Kết quả trả về sẽ được như sau:

![](https://images.viblo.asia/2c97d8be-d2f9-400e-8c87-b34c35d4ca51.png)

Ok, vậy là các bạn đã hiểu cách sắp xếp layout của Grid rồi nhỉ

# III. Kết luận

Trên đây tôi đã giới thiệu cách sử dụng `LazyVGrid` để hiển thị tương tự với `UICollectionView` trong SwiftUI. Cách sử dụng `LazyHGrid` cũng hoàn toàn tương tự `LazyVGrid`, chỉ khác nhau ở chỗ 1 bên là Vertical, 1 bên là Horizontal Grid. Hi vọng bài viết này sẽ giúp ích các bạn trong quá trình tìm hiểu về Grid trong SwiftUI.

Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này, have a nice day ^_^!