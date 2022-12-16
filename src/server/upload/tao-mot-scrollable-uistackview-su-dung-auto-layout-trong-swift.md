# Giới thiệu
Như tiêu đề của bài viết, chúng ta sẽ từng bước tạo ra một Scrollable UIStackView sử dụng Auto Layout
Mục tiêu của bài viết:
- Làm quen với UIScrollView để tạo ra một scrollable UI hiệu quả
- Xây dựng UI sử dụng Auto Layout thông qua code.

# Các bước thực hiện
Giờ ta sẽ đi vào chi tiết các bước thực hiện để tạo ra một Scrollable UIStackView
Để một UIScrollView hoạt động hiệu quả ta cần phải khai báo các thông tin sau:
- Frame của UIScrollView => chỉ ra vị trí để hiển thị UIScrollView
- Content size của UIScrollView => chỉ ra kích thước phần nội dung bên trong UIScrollView
Chúng ta sẽ từng bước sử dụng Auto Layout để khai báo các thông tin trên

## Frame constraints
Để tạo ra một UIView tốt sử dụng Auto Layout, ta cần phải tạo các ràng buộc để chỉ rõ các thuộc tính sau của UIView
- Vị trị của Frame
- Kích thước của Frame
Ví dụ: Đoạn code dưới đây tạo ra một full-screen UIScrollView

```
NSLayoutConstraint.activate([
  scrollView.leadingAnchor.constraint(equalTo: self.view.leadingAnchor),
  scrollView.trailingAnchor.constraint(equalTo: self.view.trailingAnchor),
  scrollView.topAnchor.constraint(equalTo: self.view.topAnchor),
  scrollView.bottomAnchor.constraint(equalTo: self.view.bottomAnchor)
])
```

## Content constraints
Ta sẽ định nghĩa phần nội dung bên trong UIScrollView thông qua đoạn code dưới đây

```
let greenView = UIView()
greenView.bakcgroundColor = .green
scrollView.addSubview(greenView)
```

Và phải chỉ ra mối quan hệ của phần nội dung này vơi chính UIScrollView thông qua các ràng buộc dưới đây:
```
greenView.translatesAutoresizingMaskIntoConstraints = false
NSLayoutConstraint.activate([
  greenView.leadingAnchor.constraint(equalTo: scrollView.leadingAnchor),
  greenView.trailingAnchor.constraint(equalTo: scrollView.trailingAnchor),
  greenView.topAnchor.constraint(equalTo: scrollView.topAnchor),
  greenView.bottomAnchor.constraint(equalTo: scrollView.bottomAnchor)
])
```
Những ràng buộc trên sẽ chỉ ra rằng phần nội dung sẽ được sắp xêp như thế nào bên trong UIScrollView

Để có thể scroll được ta cần phải khai báo kích thước của phần nôi dụng bên trong.

```
greenView.heightAnchor.constraint(equalToConstant: 2000).isActive = true
greenView.widthAnchor.constraint(equalTo: scrollView.widthAnchor).isActive = true
```
Hai dòng code trên chỉ ra kích thước của phần nội bên trong, và chỉ cho phép scroll theo chiều dọc.

Sau các bước trên ta sẽ có một UIScrollView như hình dưới đây:
![](https://images.viblo.asia/0309ee9c-7af1-44f5-83e0-ccc7ee73d1b3.png)

## ContentView sử dụng UIStackView
Ở bước này ta sẽ sử dụng UIStackView để xây dựng phần nội dung hiển thị bên trong UIScrollView

Cũng giống như các bước ở trên, ta cần phải chỉ ra các ràng buộc đối với UIStackView.

```
let stackView = UIStackView()
stackView.axis = .vertical
stackView.alignment = .fill
stackView.spacing = 0
stackView.distribution = .fill
scrollView.addSubview(stackView)

stackView.translatesAutoresizingMaskIntoConstraints = false
NSLayoutConstraint.activate([
  // Attaching the content's edges to the scroll view's edges
  stackView.leadingAnchor.constraint(equalTo: scrollView.leadingAnchor),
  stackView.trailingAnchor.constraint(equalTo: scrollView.trailingAnchor),
  stackView.topAnchor.constraint(equalTo: scrollView.topAnchor),
  stackView.bottomAnchor.constraint(equalTo: scrollView.bottomAnchor),

  // Satisfying size constraints
  stackView.widthAnchor.constraint(equalTo: scrollView.widthAnchor)
])
```

Giờ ta cần phần phải chỉ ra layout và chiều cao cho các subview bên trong UIStackView.
Mỗi subview cần phải có kích thước rõ ràng, thông qua đó sẽ có tác dụng lên UIStackView chứa nó

```
for i in 0...20 {
  let greenView = UIView()
  greenView.backgroundColor = .green
  stackView.addArrangedSubview(greenView)
  greenView.translatesAutoresizingMaskIntoConstraints = false
  // Doesn't have intrinsic content size, so we have to provide the height at least
  greenView.heightAnchor.constraint(equalToConstant: 100).isActive = true

  // Label (has instrinsic content size)
  let label = UILabel()
  label.backgroundColor = .orange
  label.text = "I'm label \(i)."
  label.textAlignment = .center
  stackView.addArrangedSubview(label)
}
```

Sau các bước trên ta sẽ có giao diện như hình dưới đây:

![](https://images.viblo.asia/93e13d17-3424-4abc-8b13-653d21729a66.png)

# Kết luận
Mong rằng qua ví dụ nhỏ này, bạn đọc có thể hiểu rõ hơn cơ chế hoạt động của UIScrollView, các bước để xây dựng một Auto Layout UI một cách hiệu quả

Nguồn tham khảo tại:
- https://blog.alltheflow.com/scrollable-uistackview/?utm_campaign=iOS%2BDev%2BWeekly&utm_medium=web&utm_source=iOS%2BDev%2BWeekly%2BIssue%2B363
- https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/AutolayoutPG/WorkingwithScrollViews.html#//apple_ref/doc/uid/TP40010853-CH24-SW1

Mã nguồn ví dụ trong bài viết:
- https://github.com/oLeThiVanAnh/R7_2018