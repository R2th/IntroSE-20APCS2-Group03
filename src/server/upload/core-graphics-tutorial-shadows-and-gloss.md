Mãi cho đến iOS 6, các hiệu ứng bóng đã phổ biến trên iOS, từ các button và thanh bar cho đến hầu hết mọi yếu tố trong UIKit. Với iOS 7, Apple đã thay đổi cách tiếp cận thiết kế của mình sang giao diện phẳng hơn. Điều đó không có nghĩa là nó đã sai hoặc lỗi thời khi sử dụng hiệu ứng bóng! Nó vẫn quan trọng để biết cách tạo ra chúng.

Core Graphics sẽ dễ dàng làm ra nó.

## Getting Started

Đối với hướng dẫn này, bạn sẽ làm việc với một dự án có tên là Cool Table. Bản thân dự án bao gồm nhiều topic về Core Graphics, nhưng đối với hướng dẫn này, bạn sẽ tập trung vào cách tạo shadow và gloss effect đơn giản trên các view.

Để bắt đầu, nhấp vào [Download](https://koenig-media.raywenderlich.com/uploads/2019/01/CoolTable-Swift-1.zip) Tài liệu ở đây hoặc dưới cùng của hướng dẫn này. Mở dự án khởi động trong Xcode và chạy nó.
![](https://images.viblo.asia/4e64d9eb-3273-40b5-99d4-d802bdb84160.png)
Bạn có thể thấy một table gồm hai section, mỗi section có một header và ba hàng. Tất cả công việc mà bạn sẽ làm ở đây sẽ nằm trong title view của các phần, do đó, không cần phải lo lắng về các hàng.

## The Drawing Canvas

Ngay bây giờ, table đang present header thông qua hàm *tableView(:titleForHeaderInSection:)*, điều này không cho phép có nhiều tùy chỉnh trong header. Để có thể tùy chỉnh nó, bạn muốn thiết lập header với *tableView(:viewForHeaderInSection:).*

Thật đáng để biết rằng có một số cách để tạo view cho header:

1.Bạn chỉ có thể tạo custom view bằng code.

2.Bạn có thể tạo custom view bằng Interface Builder.

Cả hai đều là những lựa chọn tốt, nhưng ở đây, bạn sẽ thực hiện cách tiếp cận thứ hai. Bạn sẽ tạo và custom view trong Interface Builder và cung cấp view dưới dạng header view.

## Creating the Files

Trong  Project navigator, tạo một file mới bằng cách sử dụng mẫu **Cocoa Touch Class**. Đặt tên cho class là **CustomHeader**. Hãy chắc chắn rằng nó là một subclass của **UIView** và language là **Swift**.
![](https://images.viblo.asia/bfe20468-55b9-40a2-9546-774038752ece.png)

Khi bạn đã tạo subclass **UIView**, hãy tạo file .**xib** có tên **CustomHeader**. Lần này, thay vì chọn **Cocoa Touch Class** trong các mẫu, hãy chọn **View** trong User Interface group.

Trong file XIB mới, bạn sẽ tìm thấy một View. Trong Identity inspector, thay đổi lớp của nó từ **UIView** thành **CustomHeader**, đây là class bạn vừa tạo.

![](https://images.viblo.asia/94dc2cde-decc-4df9-8d74-0d92bc3ab22d.png)https://images.viblo.asia/94dc2cde-decc-4df9-8d74-0d92bc3ab22d.png

Bây giờ bạn cần header để hiển thị section name.
Thực hiện theo ba bước sau:

1.Open **Library** từ **View** menu và kéo label vào view bên trong file XIB.

2.Tạo tất cả bốn constraint cho label với khoảng cách left, right là **4**, top: **0**, bottom: **10**.

3.Trong Attributes inspector, đặt text alignment là **center**.

4.Chọn lại view **CustomHeader**. Trong Attributes inspector, thay đổi **Size** của nó trong group** Simulated Metrics** từ **Inferred** sang **Freeform**.

5.Trong Size inspector, đặt chiều cao view là **50**.

Tiếp theo, trong **CustomHeader.swift**, thêm dòng này cho outlet UILabel. Đảm bảo kết nối nó trong file XIB.

```
@IBOutlet public var titleLabel: UILabel!
```

## Loading the View

Bước tiếp theo là load view từ  interface file và đưa nó vào table view. Để thực hiện điều này, hãy thêm phương thức sau ngay sau khi outlet::

```
class func loadViewFromNib() -> CustomHeader? {
  let bundle = Bundle.main
  let nib = UINib(nibName: "CustomHeader", bundle: bundle)
  guard 
    let view = nib.instantiate(withOwner: CustomHeader())
      .first as? CustomHeader
    else {
      return nil
    }
  return view
}
```

*loadViewFromNib* () là một class method tạo và trả về *CustomHeader* cho bạn. 

Tiếp theo, trong **CoolTableViewControll.swift**, thêm phương thức này vào cuối class:

```
override func tableView(
  _ tableView: UITableView,
  viewForHeaderInSection section: Int
  ) -> UIView? {
  guard let customHeaderView = CustomHeader.loadViewFromNib()
    else { return nil }
  customHeaderView.titleLabel.text = self.tableView(
    tableView,
    titleForHeaderInSection: section)
  
  return customHeaderView
}

```

Code load view như được giải thích trong bước trước, đặt text của label và return vie mới.

Xây dựng và chạy. Bạn sẽ thấy header mới mà bạn vừa tạo với background trắng.

![](https://images.viblo.asia/bf7a44a0-9e9e-4003-abf4-7ef0c3cb2581.png)

## Drawing the Masterpiece

Bây giờ bạn đã có một khung vẽ cho header của mình, bạn đã sẵn sàng cho phần thú vị. Đầu tiên, hãy xem xét những gì bạn cần trong kiệt tác mà bạn vẽ.

![](https://images.viblo.asia/3094d64c-bb7c-4286-903c-b1522394a267.png)

Header được chia thành hai khu vực. Trong hình trên, có ba điểm cần chú ý.

1.Một **gradient** với một bóng trên nó.

2.Một cái **small shadow** ngay dưới khu vực màu.

3.Một** stroke line** xung quanh header.

Diện tích của bóng là 10 điểm. Đây là lý do tại sao bottom constraint  dưới label là 10. Bạn biết chiều cao của header đầy đủ là 50. Do đó, vùng màu là 40.

## Preparing the Header

Tại sao không xác định các khu vực đó một cách trực quan bằng cách cho mỗi màu khác nhau? Bạn sẽ cung cấp cho khu vực gradient một nền đỏ và làm cho khu vực bóng tối màu xanh lá cây.

Trong **CustomHeader.swift**, thêm dòng này ngay sau khi khai báo title label :

```
@IBInspectable var coloredBoxHeight: CGFloat = 40
```

Giá trị *@IBInspectable* cho phép bạn thực hiện càng nhiều tùy chỉnh UI trực tiếp từ  Interface Builder.

Đó là một cách thực hành tốt để có bất kỳ số nào được khai báo là constant hoặc properties thay vì có nhiều số nằm rải rác trong code của bạn. Hầu hết thời gian, bạn sẽ quên số cụ thể bạn đã sử dụng khi xem code của riêng bạn sau một vài ngày.

Thêm phương thức này vào cuối *CustomHeader*:
```
override func draw(_ rect: CGRect) {
    // 1:
    var coloredBoxRect = bounds
    coloredBoxRect.size.height = coloredBoxHeight
    
    var paperRect = bounds
    paperRect.origin.y += coloredBoxHeight
    paperRect.size.height = bounds.height - coloredBoxHeight
    
    // 2:
    let context = UIGraphicsGetCurrentContext()!
    
    context.setFillColor(UIColor.red.cgColor)
    context.fill(coloredBoxRect)
    
    context.setFillColor(UIColor.green.cgColor)
    context.fill(paperRect)
  }

```

*draw* (_ :) trong *UIView* là nơi bạn đặt bất kỳ mã bản vẽ tùy chỉnh nào bạn muốn sử dụng để thay đổi giao diện của custom view. Phương thức draw mặc định không làm gì cả. Vì vậy, hãy chắc chắn rằng bạn overriding  bản gốc. Có hai bước xảy ra ở đây:

1.Tính hai hình chữ nhật mà bạn tô màu. Đầu tiên là khu vực sẽ có gradient. Thứ hai là khu vực shadow. Cả hai đều được tính toán dựa trên colorBoxHeight mà bạn đã xác định trước đó.

2.Lấy current Core Graphic context s và vẽ hai hình chữ nhật màu.

Bây giờ, thay đổi text color của title label trong** CustomHeader.xib** thành màu trắng trực tiếp từ Attributes inspector.

Build and run. Bạn sẽ thấy màu header của bạn.

![](https://images.viblo.asia/318e7052-d6fa-402f-85ec-eed9bc2de88b.png)

## Drawing Drop Shadows

Bây giờ các hình chữ nhật được xác định rõ ràng, thêm shadow. Trong CustomHeader.swift, thêm hai biến này sau colorBoxHeight:

```
var lightColor = UIColor(red: 105/255.0, green: 179/255.0, blue: 216/255.0, alpha: 1)
var darkColor = UIColor(red: 21/255.0, green: 92/255.0, blue: 136/255.0, alpha: 1)

```

Tiếp theo, trong phương thức *draw* (_ :) loại bỏ bốn dòng sau khỏi đáy phương thức.
```

context.setFillColor(UIColor.red.cgColor)
context.fill(coloredBoxRect)
    
context.setFillColor(UIColor.green.cgColor)
context.fill(paperRect)

```

Sau đó, thêm các dòng này:
```

// 1:
let shadowColor = UIColor(red: 0.2, green: 0.2, blue: 0.2, alpha: 0.5)
// 2:
context.saveGState()  
// 3:
context.setShadow(
  offset: CGSize(width: 0, height: 2), 
  blur: 3.0,
  color: shadowColor.cgColor) 
// 4:
context.setFillColor(lightColor.cgColor)
context.fill(coloredBoxRect) 
// 5:
context.restoreGState()

```

Đó là cách bạn vẽ một cái shadow! Ở đây, ý nghĩa của mã trên là gì, từng bước một:

1.Xác định shadow  dưới dạng màu xám với độ trong suốt 50%.


2.Save trạng thái đồ họa hiện tại để bạn có thể áp dụng bất kỳ thay đổi cấu hình nào bạn cần và quay lại trạng thái này khi bạn hoàn thành.


3.Đặt cấu hình shadow  cho bất cứ thứ gì bạn sẽ vẽ.


4.Vẽ hộp màu. Không có điều này sẽ không có shadow  được áp dụng trên màn hình.


5.Quay trở lại cấu hình đồ họa bạn đã lưu ở trên.


Cuối cùng, trong **CoolTableViewControll.swift**, ở cuối *tableView(:viewForHeaderInSection:)* ngay trước khi *return*, hãy thêm các dòng sau:

```
if section == 1 {
  customHeaderView.lightColor = UIColor(
    red: 147/255.0,
    green: 105/255.0,
    blue: 216/255.0,
    alpha: 1)
  customHeaderView.darkColor = UIColor(
    red: 72/255.0,
    green: 22/255.0,
    blue: 137/255.0,
    alpha: 1)
}

```

Điều này là để hiển thị một màu khác nhau cho table section 2. *darkColor* chưa được sử dụng, vì vậy đừng lo lắng về nó.

Build and run. Bạn sẽ thấy một sự cải thiện lớn từ lần trước bạn chạy ứng dụng. Các tiêu đề trông tốt hơn bây giờ, phải không? Tiếp theo, bạn sẽ thêm  gloss effect.
![](https://images.viblo.asia/f5491a83-20be-42e1-b47b-e1a510286f85.png)

## Adding a Gloss Effect

Có nhiều hơn một cách để áp dụng gloss effect. [Matt Gallagher](http://www.cocoawithlove.com/2008/09/drawing-gloss-gradients-in-coregraphics.html) và[ Michael Heyeck](http://www.mlsite.net/blog/?page_id=372) đã giải thích những cách khó hơn để làm điều đó, nhưng ở đây, bạn sẽ học một cách đơn giản.


Để đơn giản, vì lợi ích, việc thực hiện xấp xỉ gloss effect bằng cách áp dụng gradient alpha mask  là cách tiếp cận đủ tốt cho đến bây giờ.


**Pro tip**: đây là một cách tiếp cận thường được sử dụng, vậy tại sao không đặt nó trong một file riêng để dễ dàng truy cập trong các dự án sau này? **Extensions.swift** là tập tin cho công việc đó. Nó có một vài tiện ích mở rộng tiện dụng giúp mọi việc dễ dàng hơn nhiều.

Ở cuối phần CGContext extension, thêm phương thức này:

```
func drawGlossAndGradient(rect: CGRect, startColor: UIColor, endColor: UIColor) {
  // 1:
  drawLinearGradient(rect: rect, startColor: startColor, endColor: endColor)
  // 2:
  let glossColor1 = UIColor.white.withAlphaComponent(0.35)
  let glossColor2 = UIColor.white.withAlphaComponent(0.1)
  // 3:
  var topHalf = rect
  topHalf.size.height /= 2
  // 4:
  drawLinearGradient(rect: topHalf, startColor: glossColor1, endColor: glossColor2)
}

```
Đây là những gì các code ở trên làm:

1.Gọi một phương thức khác  trong file phần mở rộng từ sample project  vẽ một gradient hai màu trong một hình chữ nhật.


2.Xác định hai gloss colors.


3.Tính toán hình chữ nhật sẽ có gradient màu trắng hoặc gloss. Hình chữ nhật này là một nửa diện tích màu gradient.


4.Vẽ gradient trắng trong hình chữ nhật nhỏ hơn.


Trong CustomHeader.swift, tại cuối draw (_ :), hãy thêm dòng này:

```
context.drawGlossAndGradient(
  rect: coloredBoxRect,
  startColor: lightColor,
  endColor: darkColor)

```

Build and run. Bạn sẽ thấy một header đẹp với màu gradient và gloss effect.
![](https://images.viblo.asia/1dc05fcc-af14-411c-a872-d9504b1c0297.png)

Điều cuối cùng bạn cần là nét vẽ cuối cùng xung quanh vùng màu của header. Ngay sau dòng bạn vừa thêm, hãy thêm các dòng sau:

```
context.setStrokeColor(darkColor.cgColor)
context.setLineWidth(1)
context.stroke(coloredBoxRect.rectFor1PxStroke())

```

Build and run. Chú ý các darker stroke mà bạn muốn.
![](https://images.viblo.asia/500cf635-ba23-4509-8ee6-b848e65fa8a5.png)

Nếu các bạn quan tâm bài gốc, có thể đọc tại [đây](https://www.raywenderlich.com/9506-core-graphics-tutorial-shadows-and-gloss)
tài liệu : [link](https://koenig-media.raywenderlich.com/uploads/2019/01/CoolTable-Swift-1.zip)