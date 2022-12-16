## 1. Tại sao phải xử lý kéo thả cell trên table view
UITableView mặc định của ios đã hỗ trợ việc kéo thả cell, tuy nhiên khi chúng ta muốn tạo thêm hiệu ứng cho việc di chuyển, costume lại giao diện cell khi di chuyển hoặc thêm các hành động khác thì ios chưa hỗ trợ việc này, cho nên để dễ dàng xử lý các việc trên chúng ta phải tiến hành xử lý kéo thả cell trên table view

## 2. Các bước xử lý kéo thả cell trên table view
### 2.1 Xây dựng 1 class table view hỗ trợ việc kéo thả

Đầu tiên chúng ta sẽ tiến hành tạo 1 class DragDropTableView kế thừa từ class UITableView

```
class DragDropTableView: UITableView {
     private var snapshotView: UIView?
     private var beginIndexPath: IndexPath?
     private var endIndexPath: IndexPath?
}
```

trong đó snapshotView sẽ là clone view của cell khi  chúng ta ấn giữ, beginIndexPath là indexPath đầu tiên khi chúng ta kéo và endIndexPath sẽ là indexPath chúng ta di chuyển cell đến và nhả tay ra.

Tiếp theo chúng ta sẽ tạo 1 UILongPressGestureRecognizer và gán vào view của viewController chứa tableView

```
func addGestureToView(mainView: UIView?) {
    let longpress = UILongPressGestureRecognizer(target: self, action: #selector(longPressGestureRecognized(gestureRecognizer:)))
    longpress.minimumPressDuration = 0.3
    mainView?.addGestureRecognizer(longpress)
    self.mainView = mainView
}
```

UILongPressGesture sẽ có 3 trạng thái khi chúng ta nhấn giữ, di chuyển và kết thúc khi thả tay, chúng ta sẽ viết 1 hàm để xử lý việc này

```
@objc private func longPressGestureRecognized(gestureRecognizer: UILongPressGestureRecognizer) {
    let state = gestureRecognizer.state
    let locationInView = gestureRecognizer.location(in: self.mainView)
    switch state {
    case .began:
        self.startMovingCell(at: locationInView)
        break
    case .changed:
        self.movingCell(at: locationInView)
        break
    case .ended:
        self.endedMovingCell(at: locationInView)
        break
    default:
        break
    }
}
```

## 3. Xử lý các hàm kéo của UILongPressGestureRecognizer
### 3.1 Hàm startMovingCell

Hàm này được gọi ngay khi chúng ta nhấn vào cell và giữ 1 thời gian đã setup trước

```
private func startMovingCell(at position: CGPoint) {
    guard let visibleCell = self.visibleCell(at: position) else { return }
    guard let indexPath = self.indexPath(for: visibleCell) else { return }
    let canMove = self.dataSource?.tableView?(self, canMoveRowAt: indexPath)
    self.refreshCell(at: indexPath)
    if canMove == true {
        self.endIndexPath = indexPath
        self.beginIndexPath = indexPath
        self.snapshotView = snapshopOfCell(inputView: visibleCell)
        self.snapshotView?.alpha = 0.0
        
        if let snapshotView = self.snapshotView {
            self.mainView?.addSubview(snapshotView)
        }
        
        UIView.animate(withDuration: 0.3, animations: { () -> Void in
            let scale = CGAffineTransform.identity.scaledBy(x: 1.05, y: 1.05)
            let rotate = CGAffineTransform.identity.rotated(by: .pi / 36)
            self.snapshotView?.transform = scale.concatenating(rotate)
            self.snapshotView?.alpha = 0.8
            visibleCell.alpha = 0.0
            
        }, completion: { (finished) -> Void in
            if finished {
                visibleCell.isHidden = true
            }
        })
    }
}
```

trong hàm này chúng ta phải xử lý 1 số việc như:
+ gán lại các indexPath
+ tạo snapshot cho cell chúng ta đang kích (nếu có)
+ tạo animation cho snapshot (nếu muốn)
+ ẩn cell cũ đi
+ add snapshotView vào viewController hiện tại

### 3.2 Hàm movingCell

Hàm này được gọi khi chúng ta di chuyển cell trong viewController

```
private func movingCell(at position: CGPoint) {
    if let snapshotView = self.snapshotView {
        var center = snapshotView.center
        center.y += self.translationY(position)
        self.lastLocation = position
        snapshotView.center = center
        self.isMoving = true
    }
    
    guard let visibleCell = self.visibleCell(at: position) else { return }
    guard let indexPath = self.indexPath(for: visibleCell) else { return }
    
    let canMove = self.dataSource?.tableView?(self, canMoveRowAt: indexPath)
    
    if canMove == true {
        if let endIndexPath = self.endIndexPath, indexPath != endIndexPath {
            let cell = self.cellForRow(at: endIndexPath)
            cell?.isHidden = true
            self.dataSource?.tableView?(self, moveRowAt: endIndexPath, to: indexPath)
            
            if endIndexPath.section != indexPath.section {
                self.beginUpdates()
                self.deleteRows(at: [endIndexPath], with: .none)
                self.insertRows(at: [indexPath], with: .top)
                self.endUpdates()
            } else {
                self.moveRow(at: endIndexPath, to: indexPath)
            }
            
            self.endIndexPath = indexPath
        }
    }
}
```

Trong hàm này chúng ta phải xử lý các việc như sau:
+ Update lại vị trí của snapshotView trong viewController 
+ Kiểm tra xem vị trí mà chúng ta move đến có tồn tại cell nào không nếu không có thì break luôn ko xử lý gì thêm nữa
+ Tiếp đó chúng ta kiểm tra xem cell tại indexPath mới có thể di chuyển đc hay không, nếu ko thể di chuyển thì không xử lý thêm gì nữa
+ Khi kiểm tra cell ở vị trí mới đã có thể di chuyển, chúng ta mới tiến hành xử lý tiếp, nếu indexPath tại vị trí mới không trùng với vị trí cũ (hay nói nôm na là move sang cell mới) thì tiến hành update lại tableView
+ Khi update tableView thì chúng ta remove cell tại indexPath cũ và insert cell tại indexPath mới

### 3.3 Hàm endedMovingCell

Hàm này được gọi khi chúng ta thả ngón tay ra 

```
private func endedMovingCell(at position: CGPoint) {
    self.isMoving = false
    self.lastLocation = nil
    
    guard let endIndexPath = self.endIndexPath else {
        self.removeData()
        return
    }
    
    guard let cell = self.cellForRow(at: endIndexPath) else {
        self.removeData()
        return
    }
    
    cell.alpha = 0.0
    cell.isHidden = false
    
    UIView.animate(withDuration: 0.4, animations: { () -> Void in
        var center = self.snapshotView?.center
        let rect = cell.convert(cell.bounds, to: self.mainView)
        center?.y = rect.origin.y + rect.height / 2
        
        if let ct = center {
            self.snapshotView?.center = ct
        }
        
        self.snapshotView?.transform = CGAffineTransform.identity
    }, completion: { (finished) -> Void in
        if finished {
            self.reloadData()
            cell.alpha = 1.0
            self.snapshotView?.alpha = 0.0
            self.removeData()
        }
    })
}
```

Trong hàm  này chúng ta cần xử lý các việc sau:
+ kiểm tra xem cell tại vị trí kết thúc có cell ko, nếu ko có thì break luôn, ko xử lý gì thêm nữa
+ Nếu tồn tại cell tại vị trí kết thúc thì chúng ta có thể tạo animation cho việc kết thúc này
+ Update lại vị trí của snapshotView tại center của cell cuối cùng
+ Xoá snapshotView đồng thời hiện tại cell mà chúng ta đã ẩn trước đó.

## 4. Demo
Sau khi gắn nó vào viewcontroller ta sẽ có thể nhìn thấy đc các hiếu ứng animation mong muốn

![](https://images.viblo.asia/6a4ee011-235a-4f86-83b1-12441c9b6746.gif)