# Giới thiệu về Pencil Kit
Gần đây có khá nhiều Drawing app sử dụng framwork mới của Apple: PencilKit. Trong bài viết này mình sẽ chia sẻ một vài chi tiết thú vị về framework mới này nhé
PencilKit được Apple giới thiệu tại  WWDC 2019. Mặc dù nghe cái tên của nó ngụ ý khá là đặc biệt thì PencilKit hoạt động khá tốt trên cả IPads sử dụng bút Apple Pencil và cả iphone - sử dụng ngón tay . Pencil Kit chỉ có trên ios 13 trở lên

# Tại sao lại là PencilKit ?
Cụ thể là **PencilKit** sẽ cung cấp 1 canvas view, 1 tool picker ( với 1 vài công cụ vẽ hữu dụng) như là đối tượng PKDrawing chẳng hạn, nó sẽ giúp bạn lưu/ tái hiện lại lại các bản vẽ. 
Dĩ nhiên là tất cả các chức năng này phải được bạn tự implement. Khi làm việc với PencilKit, sẽ có rất nhiều điểm bạn cần phải chú ý để làm được 1 ứng dụng hoàn chỉnh. 
Tuy nhiên, PencilKit lại rất tuyệt vời, nó hoạt động với độ chính xác cao, độ trễ thấp khi được sử dụng cùng vs Apple Pencil. Với PencilKit, thay vì cố phát minh lại bánh xe thì bạn có thể tập trung vào các tính năng độc đáo của ứng dụng

![](https://images.viblo.asia/5bc2566c-56a8-479b-ab32-4f640e0bfd3a.png)

## PKCanvasView
**PKCanvasView** đại diện cho các drawing canvas. Nó có thể scroll ở chế độ mặc định. Tuy nhiên, theo tôi thì điều này cũng không cần thiết lắm bởi vì nhiều cavas được hiển thị đồng thời ( 1 cho ảnh gốc để vẽ và 1 cho khu vực vẽ )
```
optional func canvasViewDrawingDidChange(_ canvasView: PKCanvasView) optional func canvasViewDidFinishRendering(_ canvasView: PKCanvasView) 
optional func canvasViewDidBeginUsingTool(_ canvasView: PKCanvasView) 
optional func canvasViewDidEndUsingTool(_ canvasView: PKCanvasView)
```
Hàm **canvasViewDrawingDidChange** được gọi khi có bất kì sự thay đổi trong khung canvas. Nó rất có ích nếu bạn muốn đánh dấu khi nào bản vẽ được thay đổi và lưu nó nếu muốn. Đôi khi, n cũng là event kích hoạt đoạn code so sánh hình ảnh

Hàm canvasViewDidFinishRendering được gọi khi canvas view được sinh ra. nếu bạn có 1 bức vẽ phức tạp hơn, có thể mất thời gian 1s nhưng bức vẽ được hiển thị từng phần nên cảm nhận của người dùng vẫn khá là OK
2 delegate còn lại được gọi khi người dùng bắt đầu và kết thúc việc sử dụng các công cụ vẽ

Tích hợp **PKCanvasView** vào app khá là dễ, bạn có thể làm điều này qua storyboard hoặc trong đoạn code của mình luôn
```
let canvas = PKCanvasView(frame: bounds) 
view.addSubview(canvas) 
canvas.tool = PKInkingTool(.pen, color: .black, width: 30)
```

Còn nếu tích hợp thông qua storyboard thì nhớ chú ý là thêm 1 **UIView** bình thường và đổi tên class thành **PKCanvasView**

# PKDrawing
Đối tượng **PKDrawing** đại diện cho các bản vẽ thực sự trong khung **canvas**. Bạn có thể lấy về khung của bản vẽ trong khung canvas, dễ dàng mã hoá/ giải mã nó để lưu trữ trên server ( như Firebase chẳng hạn). Bởi vì bản vẽ gốc được vẽ trên Ipad nhưng hiển thị trên các thiết bị khác nhau, chúng ta cần phải scale lại và hiển thị bản vẽ với các khung canvas khác nhau.
**CGAffineTransform** tỏ ra hữu ích khi chịu trách nhiệm cho điều này. Thêm vào đó, bạn có thể lập trình để gắn các bản vẽ khác nhau 1 cách dễ dàng
```
let factor = min(scaleX, scaleY) 
let transform = CGAffineTransform(scaleX: factor, y: factor) 
let drawing = pkDrawing.transformed(using: transform)
```

Một tính năng hữu dụng khác của **PKDrawing** đó chính là việc lấy về **UIImage** hiện tại từ bản vẽ
```
private func image(from canvas: PKCanvasView) -> UIImage { 
    let drawing = canvas.drawing 
    let visibleRect = canvas.bounds 
    let image = drawing.image(from: visibleRect, scale: UIScreen.main.scale) 
    return image 
}
```


# PKToolPicker
**PKToolPicker** là 1 UI component  chứa các công cụ để vẽ. Trên Ipads, nó sẽ nổi lên trên các views khác trong khi trên iPhone nó là view nằm ở phía dưới của màn hình. 
Trên iPads, nó chứa các hàm **undo/redo**, trong khi trên iPhone, bạn cần tự add các hàm này nhé. 
Để kết nối **PKToolPicker** với khung vẽ canvas, bạn cần sử dụng đoạn code dưới đây:
```
if let window = parent?.view.window, let toolPicker = PKToolPicker.shared(for: window) { 
    toolPicker.setVisible(true, forFirstResponder: canvasView)       
    toolPicker.addObserver(canvasView) 
    toolPicker.addObserver(self) 
    canvasView.becomeFirstResponder()
}
```

**PKToolPicker** cung cấp 1 vài công cụ hữu ích cho việc vẽ như sau:
* **PKInkingTool** - chứa các công cụ vẽ: bút mực, đánh dấu, bút chì
* **PKEraserTool** - chổi, giúp xoá 1 phần hoặc cả bức vẽ của bạn.
* **PKLassoTool** - lựa chọn 1 vùng trên bản vẽ và di chuyển vùng này
* **Ruler** - thước đo thẳng
* **Color** picker - Giúp bạn chọn màu cho các tool cần chọn màu mực vẽ
* Chức năng **Undo/Redo** ( chỉ có trên iPad)

# Một số hạn chế 
Tuy có rất nhiều tính năng hữu ích, bạn đôi khi vẫn cảm thấy không được thuận tiện khi custom một vài đối tượng. Sau đây là 1 số vấn đề bạn có thể gặp phải
* Rất khó để customize các tool picker
* Bạn không thế lấy về danh sách các nét vẽ mà bản vẽ có
* Bạn chỉ có thể lấy về các dữ liệu đại diện cho bản vẽ mà thôi

# Kết luận
PencilKit là 1 framework mới khá tuyệt vời, cung cấp nhiều chức năng vẽ. 

Nó sẽ giúp bạn tiết kiệm khá nhiều thời gian và năng lượng để có thời gian tập trung vào những phần cụ thể trên app của bạn đồng thời lại rất dễ dàng tích hợp vào trong ứng dụng

**Nguồn tham khảo:** 
https://medium.com/flawless-app-stories/getting-started-with-pencilkit-on-ios-13-a4bda3323fd8