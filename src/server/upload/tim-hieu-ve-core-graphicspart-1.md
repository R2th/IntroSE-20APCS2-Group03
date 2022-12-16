# Giới thiệu Core Graphics
Core Graphics là 1 framework thuộc kiến trúc UIKit. Nó là một frame work hỗ trợ vẽ đồ hoạ dự trên công cụ vẽ nâng cao của Quartz. Nó cung cấp các công cụ để thực hiện tạo ra các đồ hoạ 2D ở tầng thấp và độ chuẩn xác cao. Framework này có nhiều công dụng hỗ trợ render như, vẽ các hình học 2D ( đường thẳng, tròn, vuông,  cung tròn..), điều hướng, quản lí màu, image data, tạo image, cũng như tạo hiển thị, phân tích tại liệu từ PDF...

Trong phần này tôi sẽ giới thiệu về các khái niệm và các phương thức căn bản nhất của Core Graphics.

## 1 Các kiểu dữ liệu

### CGFloat
Là 1 dạng kiểu dữ liệu thể hiện các đại lượng vô hướng trong Core Graphics và cái frame work liên quan. CGFloat được biểu diễn bằng số thực tương tự như kiểu Float nhưng CGFloat biểu diễn các giá trị của các phần tử trong Core Graphics. Kích thước và độ chính xác của kiểu dữ liệu này phụ thuộc vào kiếu trúc của CPU (device). Khi ứng dụng build trên CPU 64 bit thì kiểu dữ liệu mang 64-bit (tươn đương với giá trị của kiểu Double). Đối với CPU 32 bit thì giá trị bằng 32 bit (tương đương với kiểu Float).

### CGPoint
Là 1 struct chứa 1 điểm trong hệ trục toạ độ 2 chiều.
  - init(x: Double, y: Double): Khởi tạo điểm trên hệ trục xác định bởi Float
  - init(x: Int, y: Int):  Khởi tạo điểm trên hệ trục xác định bởi Int
  - init(x: CGFloat, y: CGFloat): Khởi tạo điểm trên hệ trục xác định bởi CGFloat

### CGSize
Là 1 dữ liệu chứa giá trị là chiều rộng và chiều cao.
     Propeties: 
                var width: CGFloat
                var height: CGFloat

  Khởi tạo:
  - init(width: Double, height: Double)
 - init(width: Int, height: Int)
  - init(width: CGFloat, height: CGFloat)

          
### CGRect
  Kiểu dữ liệu chứa vị trí kích thước của 1 hình chữ nhật
    
  Khởi tạo:
  - init(x: Double, y: Double, width: Double, height: Double)
  - init(x: Int, y: Int, width: Int, height: Int)
  - init(x: Double, y: Double, width: Double, height: Double)

### CGVector
Kiểu dữ liệu chứa vector 2 chiều dx, dy
   - init(dx: Double, dy: Double)
  - init(dx: Int, dy: Int)
 - init(dx: CGFloat, dy: CGFloat)

## 2 Công cụ vẽ 2D

## CGPath
Đường dẫn đồ họa bất biến: mô tả toán học về hình dạng hoặc đường được vẽ. Nói nôn na nó biểu diễn chứa thông tin hình học về đường muốn vẽ. Sau đó dựa vào nó để gender ra các đường trên view.
## CGLayer
Một lớp Layer ngoài màn hình được

## CGContext
CGContext chứa các tham số và các thông tin cần thiết của device để vẻ và kết xuất hình ảnh ra ngoài, có thể là một cửa sổ trong một ứng dụng, hình ảnh bitmap, tài liệu PDF hoặc máy in.

Vẽ các đường hình học 2D:

1.  func beginPath():   Khởi tạo công cụ vẻ Graphics context.

     Mỗi thực thể Context chỉ có thể vẻ được 1 đường. Khi thay đỗi dữ liệu trong context thì giá trị hình được vẽ trước sẽ bị hủy bỏ
     
2. func move(to point: CGPoint): Đăt vị trí đầu tiên để vẽ tại một điểm xác định

3.  func addLine(to point: CGPoint): Thêm 1 path một đường thẳng từ điểm ban đầu đến điểm được chỉ định vào path hiện tại
4.  func addLines(between points: [CGPoint]): Thêm các path để nối các điểm trong mảng points theo thứ tự tạo thành chuỗi các đoạn thẳng  vào path hiện tại
5.  func addRect(_ rect: CGRect): thêm 1 path vẽ một hình chữ nhật  vào path hiện tại
6.  func addRects(_ rects: [CGRect]): thêm 1 mảng các path vẻ hình chữ nhật vào path hiện tại
7.  func addEllipse(in rect: CGRect): thêm 1 hình ellipse fit với hình chữ nhật rect cho trước vào path.
8.  func addArc(center: CGPoint, radius: CGFloat, startAngle: CGFloat, endAngle: CGFloat, clockwise: Bool): Thêm một cung tròn vào path hiện tại với các tham số: tâm: center, bán kính: radius, giá trị góc bắt đầu cung: startAngle: giá trị góc cuối cung: endAngle\
9.  addCurve(to:control1:control2:) thêm path vẽ đường cong cubic Bézier vào path. https://vi.wikipedia.org/wiki/%C4%90%C6%B0%E1%BB%9Dng_cong_B%C3%A9zier
10.  addCurve(to:control1:control2:) thêm path vẽ đường cong quadratic Bézier  vào path. 
11.  func addPath(_ path: CGPath): Thêm một path đã tạo trước đó vào context.
12.  func closePath(): đóng và chấm dứt path hiện tại.

Vẽ đường:
1.  func strokePath() : Vẽ đường dọc theo path hiện tại
2.  enum CGPathDrawingMode : Int32: các option lựa chọn để vẽ đường
3.  func fillPath(using rule: CGPathFillRule = .winding): Vẽ 1 vùng với đường dẫn hiện tại  với quy tắc được chỉ định
4.  func drawPath(using mode: CGPathDrawingMode): Vẽ đường dẫn với chế độ cho trước.

Vẽ hình:
1.  func fill(_ rect: CGRect):  Vẽ vùng chứa trong hình chữ nhật được cung cấp, sử dụng màu tô trong trạng thái đồ họa hiện tại.
2.  func fill(_ rects: [CGRect]) : Vẽ các khu vực có trong các hình chữ nhật được cung cấp, sử dụng màu tô trong trạng thái đồ họa hiện tại.
3.  func fillEllipse(in rect: CGRect) Vẽ vùng hình elip vừa với hình chữ nhật được cung cấp, sử dụng màu tô trong trạng thái đồ họa hiện tại.
4.  func stroke(_ rect: CGRect, width: CGFloat): Vẽ một đường dẫn hình chữ nhật, sử dụng chiều rộng đường chỉ định.

# Kết luận:
Trong phần này tôi đã giới thiệu các phần cơ bản về Core Graphics. Trong những phân tới tôi sẽ hướng dẫn bạn sử dụng Core Graphics để vẽ các hình mong muốn. ví dụ như biểu đồ RadaChart này
![](https://images.viblo.asia/c4b583be-2349-4ef2-a560-c84b96838ed1.png)

Bài viết tiếp: https://viblo.asia/p/ios-core-graphics-ung-dung-cg-de-ve-bieu-do-hinh-radachart-gDVK24o2lLj