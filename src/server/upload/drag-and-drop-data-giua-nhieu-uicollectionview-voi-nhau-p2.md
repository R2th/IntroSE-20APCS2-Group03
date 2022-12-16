## 3. Quản lý việc drag drop giữa các collection view
Chúng ta thấy rằng khi kéo nhiều collection view vào chung 1 view thì mặc định chúng sẽ là các view riêng biệt ko được kết nối với nhau, do đó sẽ cần 1 object đứng ra quản lý các collection view, cho phép chúng kết nối lại với nhau.

### 3.1 Object DragDropManager

Object DragDropManager là 1 object độc lập, nó sẽ chứa view cha của 3 collection view (hay còn lại là canvas như ở P1 đã nêu), tiếp đó nó chứa các collection view của chúng ta để đảm bảo kết nối các collectionview lại

```
public class DragDropManager: NSObject, UIGestureRecognizerDelegate {
    fileprivate var canvas : UIView = UIView()
    fileprivate var views : [UIView] = []
    fileprivate var longPressGestureRecogniser = UILongPressGestureRecognizer()
}
```

object DragDropManager sẽ adopt protocol UIGestureRecognizerDelegate để có thể implement các func chúng ta sẽ dùng với long gesture.
Tiếp đó chúng ta tạo 1 struct Bundle, là struct chứa thông tin từ collection nguồn, đích, toạ độ của cell vừa drag và image của cell

```
struct Bundle {
    var offset : CGPoint = CGPoint.zero
    var sourceDraggableView : UIView
    var overDroppableView : UIView?
    var representationImageView : UIView
    var dataItem : AnyObject
}
```

Chúng ta viết hàm khởi tạo init cho object DragDropManager

```
init(canvas : UIView, collectionViews : [UIView]) {
    
    super.init()
    
    self.canvas = canvas
    
    self.longPressGestureRecogniser.delegate = self
    self.longPressGestureRecogniser.minimumPressDuration = 0.3
    self.longPressGestureRecogniser.addTarget(self, action: #selector(DragDropManager.updateForLongPress(_:)))
    self.canvas.isMultipleTouchEnabled = false
    self.canvas.addGestureRecognizer(self.longPressGestureRecogniser)
    self.views = collectionViews
}
```

Nguyên tắc hoạt động ở đây là chúng ta tạo 1 LongGesture với thời gian nhấn giữ là 0.3, sau đó nó sẽ nhảy vào hàm delegate của UILongPressGestureRecognizer

Tiếp theo chúng ta sẽ implement hàm updateForLongPress sau khi đã nhẫn giữ 0.3 s

```
@objc func updateForLongPress(_ recogniser : UILongPressGestureRecognizer) -> Void {
    switch recogniser.state {
               
    case .began :
       
    case .changed :
        
    case .ended :
        
    default:
        break
        
    }
    
}
```

Từ hàm updateForLongPress chúng ta sẽ thấy cần phải xử lý 3 trạng thái của long gesture:
* begin: lúc bắt đầu nhấn
* changed: lúc chúng ta di chuyển đầu ngón tay
* ended : lúc chúng ta bỏ ngón tay ra

### 3.2 Trạng thái .began

Khi chúng ta đặt ngón tay lên bất kì 1 cell nào trong collection view, chúng ta đã có thể lấy được indexPath của cell đó trong collection view hiện tại

```
func startDraggingAtPoint(_ point : CGPoint) -> Void {
    self.draggingIndexPath = self.indexPathForItem(at: point)    
    self.reloadData()   
}
```

sau khi lấy được indexPath của cell vừa nhấn vào chúng ta lưu nó lại

### 3.3 Trạng thái .changed

Trạng thái này xuất hiện sau khi chúng ta nhấn giữ 1 cell và bắt đầu di chuyển cell đó.

Để đảm bảo rằng việc di chuyển mượt mà và tạo nhiều hiệu ứng khác chúng ta sẽ tạo 1 ảnh chụp lại cell đó sau đó mới tiến hành di chuyển ảnh vừa tạo, còn cell tại vị trí nhấn chúng ta sẽ ẩn nó đi.

```
func representationImageAtPoint(_ point : CGPoint) -> UIView? {
    
    guard let indexPath = self.indexPathForItem(at: point) else {
        return nil
    }
    
    guard let cell = self.cellForItem(at: indexPath) else {
        return nil
    }
    
    UIGraphicsBeginImageContextWithOptions(cell.bounds.size, cell.isOpaque, 0)
    cell.layer.render(in: UIGraphicsGetCurrentContext()!)
    let image = UIGraphicsGetImageFromCurrentImageContext()
    UIGraphicsEndImageContext()
    
    let imageView = UIImageView(image: image)
    imageView.frame = cell.frame
    
    return imageView
}
```

Khi di chuyển cell trong collection view, chúng ta sẽ phải xác định cái cell chúng ta di chuyển nó có nằm trong view nào trong các collection view chúng ta đang có hay không

Bằng cách for tất cả các collection view rồi so sánh vị trí của cell chúng ta sẽ tìm được collection view mà chúng ta đang di chuyển cell vào hoặc ra

```
for view in self.views where view is Draggable  {
    
    let viewFrameOnCanvas = self.convertRectToCanvas(view.frame, fromView: view)
    let overlappingAreaCurrent = bundle.representationImageView.frame.intersection(viewFrameOnCanvas).area
    
    if overlappingAreaCurrent > overlappingAreaMAX {
        overlappingAreaMAX = overlappingAreaCurrent
        mainOverView = view
    }
}
```

Tiếp theo khi chúng ta di chuyển cell vào trong 1 collection view, chúng ta cũng cần kiểm tra xem tại vị trí chúng ta di chuyển cell vào, có thể drag drop hay ko bằng cách kiểm tra xem tại vị trí đó có lấy được indexPath của cell tại vị trí đó hay ko

```
public func indexPathForCellOverlappingRect( _ rect : CGRect) -> IndexPath? {
    var overlappingArea : CGFloat = 0.0
    var cellCandidate : UICollectionViewCell?
    
    let visibleCells = self.visibleCells
    if visibleCells.count == 0 {
        return IndexPath(row: 0, section: 0)
    }
    
    if  isHorizontal && rect.origin.x > self.contentSize.width ||
        !isHorizontal && rect.origin.y > self.contentSize.height {
        
        return IndexPath(row: visibleCells.count - 1, section: 0)
    }
    
    for visible in visibleCells {
        let intersection = visible.frame.intersection(rect)
        
        if (intersection.width * intersection.height) > overlappingArea {
            overlappingArea = intersection.width * intersection.height
            cellCandidate = visible
        }
    }
    
    if let cellRetrieved = cellCandidate {
        return self.indexPath(for: cellRetrieved)
    }
    
    return nil
}
```

Khi drag drop cell cũng có 1 vấn đề nữa là nếu cell chúng ta drag ra ngoài colllection view hiện tại, sang 1 collection view mới thì chúng ta sẽ phải tiến hành 2 hành động
* xoá data tại collection view cũ
* insert data đó vào collection view mới

```
if let droppable = mainOverView as? Droppable {
    let rect = self.canvas.convert(bundle.representationImageView.frame, to: mainOverView)
    
    if droppable.canDropAtRect(rect) {
        
        if mainOverView != bundle.overDroppableView { // if it is the first time we are entering
            (bundle.overDroppableView as! Droppable).didMoveOutItem(bundle.dataItem)
            droppable.willMoveItem(bundle.dataItem, inRect: rect)
        }
        
        // set the view the dragged element is over
        self.bundle!.overDroppableView = mainOverView
        droppable.didMoveItem(bundle.dataItem, inRect: rect)
    }
}
```

### 3.4 Trạng thái .ended

Trạng thái này được gọi khi chúng ta nhả tay ra, lúc đó chúng ta sẽ kết thúc quá trình drag drop.

Cũng giống trạng thái .changed, nếu chúng ta drag cell sang 1 collection view mới thì chúng ta cần check thêm .

```
if bundle.sourceDraggableView != bundle.overDroppableView { // if we are actually dropping over a new view.
    if let droppable = bundle.overDroppableView as? Droppable {
        sourceDraggable.dragDataItem(bundle.dataItem)
        let rect = self.canvas.convert(bundle.representationImageView.frame, to: bundle.overDroppableView)
        droppable.dropDataItem(bundle.dataItem, atRect: rect)
    }
}

bundle.representationImageView.removeFromSuperview()
sourceDraggable.stopDragging()
```

## 4. Ứng dụng cùng viewcontroller

Trong viewController chúng ta khởi tạo 1 dragDropManger để quản lý các collectionView

```
self.dragAndDropManager = DragDropManager (
    canvas: self.view,
    collectionViews: [firstCollectionView, secondCollectionView, thirdCollectionView]
)
```

## 5. Demo

[https://github.com/pqhuy87it/MonthlyReport/tree/master/DragDropMultipleCollectionview](http://)