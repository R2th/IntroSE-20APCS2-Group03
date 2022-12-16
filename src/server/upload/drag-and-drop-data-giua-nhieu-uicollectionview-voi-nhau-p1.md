## 1. Drag and drop data trong UICollectionView
Nếu chỉ đơn thuần kéo thả trong 1 collectionview duy nhất thì chúng ta có thể dùng các hàm delegate có sẵn của UICollectionView

```
optional func collectionView(_ collectionView: UICollectionView, 
                  moveItemAt sourceIndexPath: IndexPath, 
                          to destinationIndexPath: IndexPath)
```

Còn nếu gỉa sử chúng ta có 3 collectionView, chúng ta kéo data từ collectionView này sang collectionView khác và ngược lại, hôm nay chúng ta sẽ cùng đi giải quyết bài toán đó.

## 2. Giải quyết bài toán
Chúng ta có thể tượng tượng như thế này

![](https://images.viblo.asia/6e7473fc-3e05-4496-9e5b-07a89628054d.png)

Tất cả UICollectionView của chúng ta sẽ nằm trong 1 vùng gọi là canvas, vùng này có tác dụng xử lý sự kiện kéo thả, khi chúng ta kéo 1 cell data từ collectionView này thả sang collectionView khác, chúng ta phải thực hiện đồng thời 2 sự kiện, xoá cell ở collectionView này và insert vào collectionView khác.

### 2.1 Setup UICollectionView
Để thực hiện việc kéo thả được data giữa các collectionView với nhau, chúng ta cần xây dựng 2 protocol cho việc này:
* Draggable: xử lý các sự kiện kéo data, tính toán việc kéo data trong collectionView.
* Droppable: xử lý các sự kiện sau khi kéo data, xoá thêm data trong collectionView

```
protocol Draggable {
    func canDragAtPoint(_ point : CGPoint) -> Bool
    func representationImageAtPoint(_ point : CGPoint) -> UIView?
    func dataItemAtPoint(_ point : CGPoint) -> AnyObject?
    func dragDataItem(_ item : AnyObject)
    func startDraggingAtPoint(_ point : CGPoint)
    func stopDragging()
}
```

```
protocol Droppable {
    func canDropAtRect(_ rect : CGRect) -> Bool
    func willMoveItem(_ item : AnyObject, inRect rect : CGRect)
    func didMoveItem(_ item : AnyObject, inRect rect : CGRect)
    func didMoveOutItem(_ item : AnyObject) -> Void
    func dropDataItem(_ item : AnyObject, atRect : CGRect)
}
```

Tiếp theo khi kéo các cell từ collectionView này sang collectionView khác, data tương ứng trong các dataSource của từng collectionView cũng phải di chuyển theo(delete từ thằng này xong insert vào thằng khác), do đó chúng ta cần 1 dataSource 1 delegate để làm việc này.

```
public protocol DragDropCollectionViewDataSource : UICollectionViewDataSource {
    func collectionView(_ collectionView: UICollectionView, indexPathForDataItem dataItem: AnyObject) -> IndexPath?
    func collectionView(_ collectionView: UICollectionView, dataItemForIndexPath indexPath: IndexPath) -> AnyObject
    func collectionView(_ collectionView: UICollectionView, cellIsDraggableAtIndexPath indexPath: IndexPath) -> Bool
}
```

```
public protocol DragDropCollectionViewDelegate : UICollectionViewDataSource {
    func collectionView(_ collectionView: UICollectionView, moveDataItemFromIndexPath from: IndexPath, toIndexPath to : IndexPath)
    func collectionView(_ collectionView: UICollectionView, insertDataItem dataItem : AnyObject, atIndexPath indexPath: IndexPath)
    func collectionView(_ collectionView: UICollectionView, deleteDataItemAtIndexPath indexPath: IndexPath)
}
```

Chúng ta tạo tiếp 1 class DragDropCollectionView, rồi cho nó adopt 2 protocol Draggable và Droppable

```
class DragDropCollectionView: UICollectionView, Draggable, Droppable {
    required public init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }
    
    override open func awakeFromNib() {
        super.awakeFromNib()
    }
    
    override public init(frame: CGRect, collectionViewLayout layout: UICollectionViewLayout) {
        super.init(frame: frame, collectionViewLayout: layout)
    }
}
```

### 2.1 Implement các function trong protocol draggable

```
// MARK : Draggable
public func canDragAtPoint(_ point : CGPoint) -> Bool {
    if let dataSource = self.dataSource as? DragDropCollectionViewDataSource,
        let indexPathOfPoint = self.indexPathForItem(at: point) {
        return dataSource.collectionView(self, cellIsDraggableAtIndexPath: indexPathOfPoint)
    }
    
    return false
}
```

Hàm canDragAtPoint kiểm tra xem cell chúng ta kick vào có thể drag được ko, việc drag đc hay ko sẽ do chúng ta setup ở viewcontroller 

```
public func representationImageAtPoint(_ point : CGPoint) -> UIView? {
    
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

hàm representationImageAtPoint sẽ chụp lại view tại vị trí cell chúng ta kíck vào sau đó chuyển nó thành dạng ảnh, việc này sẽ cho chúng ta 1 snapshot của cell

```
public func dataItemAtPoint(_ point : CGPoint) -> AnyObject? {
    
    guard let indexPath = self.indexPathForItem(at: point) else {
        return nil
    }
    
    guard let dragDropDS = self.dataSource as? DragDropCollectionViewDataSource else {
        return nil
    }
    
    return dragDropDS.collectionView(self, dataItemForIndexPath: indexPath)
}
```

hàm dataItemAtPoint sẽ lấy data tại cell chúng ta kích

```
public func startDraggingAtPoint(_ point : CGPoint) -> Void {
    
    self.draggingIndexPath = self.indexPathForItem(at: point)
    
    self.reloadData()
    
}
```

Hàm startDraggingAtPoint sẽ lấy indexPath tại cell chúng ta kicks sau đó lưu lại

```
public func stopDragging() -> Void {
    
    if let idx = self.draggingIndexPath {
        if let cell = self.cellForItem(at: idx) {
            cell.isHidden = false
        }
    }
    
    self.draggingIndexPath = nil
    
    self.reloadData()
    
}
```

Hàm stopDragging sẽ được gọi sau khi kết thúc việc drag and drop, ở đây nó xoá đi indexPath cell đã lưu trước đó và hiện lại cell đã ẩn.

### 2.2 Implement các function trong protocol droppable

```
// MARK: Droppable
public func dragDataItem(_ item : AnyObject) -> Void {
    
    guard let dragDropDataSource = self.dataSource as? DragDropCollectionViewDataSource else {
        return
    }
    
    guard let dragDropDelegate = self.delegate as? DragDropCollectionViewDelegate else {
        return
    }
    
    guard let existngIndexPath = dragDropDataSource.collectionView(self, indexPathForDataItem: item) else {
        return
        
    }
    
    dragDropDelegate.collectionView(self, deleteDataItemAtIndexPath: existngIndexPath)
    
    if self.animating {
        self.deleteItems(at: [existngIndexPath])
    }
    else {
        
        self.animating = true
        self.performBatchUpdates({ () -> Void in
            self.deleteItems(at: [existngIndexPath])
        }, completion: { complete -> Void in
            self.animating = false
            self.reloadData()
        })
    }
    
}
```

Hàm dragDataItem sẽ được gọi khi chúng ta kéo 1 cell data ra khỏi collectionView thì nó sẽ tiến hành xoá bỏ cell đó cũng như data của cell đó.

```
public func canDropAtRect(_ rect : CGRect) -> Bool {
    return (self.indexPathForCellOverlappingRect(rect) != nil)
}
```

Hàm canDropAtRect sẽ kiểm tra xem tại vị trí chúng ta drop cell có thể insert được ko 

```
public func willMoveItem(_ item : AnyObject, inRect rect : CGRect) {
    guard let dragDropDataSource = self.dataSource as?  DragDropCollectionViewDataSource else {
        return
    }
    
    guard let dragDropDelegate = self.delegate as? DragDropCollectionViewDelegate else {
        return
    }
    
    if let _ = dragDropDataSource.collectionView(self, indexPathForDataItem: item) {
        return
    }
    
    if let indexPath = self.indexPathForCellOverlappingRect(rect) {
        dragDropDelegate.collectionView(self, insertDataItem: item, atIndexPath: indexPath)
        self.draggingIndexPath = indexPath
        self.animating = true
        self.performBatchUpdates({ () -> Void in
            self.insertItems(at: [indexPath])
        }, completion: { complete -> Void in
            self.animating = false
            
            if self.draggingIndexPath == nil {
                self.reloadData()
            }
        })
    }
    
    currentInRect = rect
}
```

Hàm willMoveItem sẽ thực hiện insert cell data mới vào collectionView mà chúng ta vừa thả data vào

```
public func didMoveItem(_ item : AnyObject, inRect rect : CGRect) -> Void {
    guard let dragDropDataSource = self.dataSource as?  DragDropCollectionViewDataSource else {
        return
    }
    
    guard let dragDropDelegate = self.delegate as? DragDropCollectionViewDelegate else {
        return
    }
    
    if let existingIndexPath = dragDropDataSource.collectionView(self, indexPathForDataItem: item),
        let indexPath = self.indexPathForCellOverlappingRect(rect) {
        
        if indexPath.item != existingIndexPath.item {
            
            dragDropDelegate.collectionView(self, moveDataItemFromIndexPath: existingIndexPath, toIndexPath: indexPath)
            
            self.animating = true
            
            self.performBatchUpdates({ () -> Void in
                self.moveItem(at: existingIndexPath, to: indexPath)
            }, completion: { (finished) -> Void in
                self.animating = false
                self.reloadData()
                
            })
            
            self.draggingIndexPath = indexPath
        }
    }
    
    var normalizedRect = rect
    normalizedRect.origin.x -= self.contentOffset.x
    normalizedRect.origin.y -= self.contentOffset.y
    currentInRect = normalizedRect

    self.checkForEdgesAndScroll(normalizedRect)
}
```

Hàm didMoveItem sẽ được gọi nếu chúng ta chỉ di chuyển cell trong cùng collectionView mà ko sang collectionView khác, việc này chỉ đơn giản là hoán đổi vị trí cell cũ và cell mới

```
public func didMoveOutItem(_ item : AnyObject) {
    guard let dragDropDataSource = self.dataSource as? DragDropCollectionViewDataSource,
        let existngIndexPath = dragDropDataSource.collectionView(self, indexPathForDataItem: item) else {
            
            return
    }
    
    guard let dragDropDelegate = self.delegate as? DragDropCollectionViewDelegate else {
        return
    }
    
    dragDropDelegate.collectionView(self, deleteDataItemAtIndexPath: existngIndexPath)
    
    if self.animating {
        self.deleteItems(at: [existngIndexPath])
    }
    else {
        self.animating = true
        self.performBatchUpdates({ () -> Void in
            self.deleteItems(at: [existngIndexPath])
        }, completion: { (finished) -> Void in
            self.animating = false;
            self.reloadData()
        })
        
    }
    
    if let idx = self.draggingIndexPath {
        if let cell = self.cellForItem(at: idx) {
            cell.isHidden = false
        }
    }
    
    self.draggingIndexPath = nil
    
    currentInRect = nil
}
```

Hàm didMoveOutItem sẽ được gọi nếu chúng ta di chuyển cell và đè nó lên 1 cell khác, cell cũ tại ví trí đó sẽ bị xoá đi.