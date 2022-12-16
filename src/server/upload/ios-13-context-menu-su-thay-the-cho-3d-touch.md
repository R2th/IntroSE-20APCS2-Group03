# Giới thiệu
Tại  **WWDC 2019** ***Context Menu***  đã được giới thiệu trên iOS 13 và nó đã được Apple quảng cáo là sự thay thế cho  3D Touch, nó vẫn ở đây, mặc dù trên các dòng iPhone mới Apple đã loại bỏ hoàn toàn 3D Touch.
Trong bài viết này tôi cùng với các bạn tìm hiểu cách để sử dụng *Context Menu* trong phát triển iOS 13+, cùng  bắt đầu nào!!!

![](https://images.viblo.asia/20209fd7-ad9e-4670-80ed-6f7b8075cfa5.png)

# Context Menu
## Context Menu trên View
```
class BasicViewController: UIViewController, UIContextMenuInteractionDelegate { 

  override func viewDidLoad() { 
    super.viewDidLoad() 
    let interaction = UIContextMenuInteraction(delegate: self) 
    view.addInteraction(interaction) 
  }
}
```

Các hàm trong *UIContextMenuInteractionDelegate protocol*:
```
//Provides a Context Menu for the give menu when the interaction starts
func contextMenuInteraction(_ interaction: UIContextMenuInteraction, 
configurationForMenuAtLocation location: CGPoint) -> UIContextMenuConfiguration?

//Optional function. Gets triggered when the focused view is clicked.
func contextMenuInteraction(_ interaction: UIContextMenuInteraction, 
willCommitWithAnimator animator: UIContextMenuInteractionCommitAnimating)
```
## Initialization of a Context Menu
Để khởi tạo Context Menu, chúng ta cần 3 tham số (tất cả đều là ***optional***)
*identifier* - Bạn có thể đặt id chuỗi ở đây.
*previewProvider* - Bản xem trước của ViewController tiếp theo.
*actionProvider* - Tạo các nút menu và action ở đây.
## ContextMenu and CollectionView in Action
iOS 13 giới thiệu một vài phương thức *UICollectionViewDelegate* mới cho *ContextMenu*. Để hiển thị *ContextMenu* khi người dùng nhấn và giữ vào *CollectionViewCell*, function sau đây được sử dụng:
```
func collectionView(_ collectionView: UICollectionView, contextMenuConfigurationForItemAt indexPath: IndexPath, point: CGPoint) -> UIContextMenuConfiguration? {
        
        let configuration = UIContextMenuConfiguration(identifier: nil, previewProvider: nil){ action in
            let viewMenu = UIAction(title: "View", image: UIImage(systemName: "eye.fill"), identifier: UIAction.Identifier(rawValue: "view")) {_ in
                print("button clicked..")
            }
            let rotate = UIAction(title: "Rotate", image: UIImage(systemName: "arrow.counterclockwise"), identifier: nil, state: .on, handler: {action in
                print("rotate clicked.")
            })
            let delete = UIAction(title: "Delete", image: UIImage(systemName: "trash.fill"), identifier: nil, discoverabilityTitle: nil, attributes: .destructive, state: .on, handler: {action in
                
                print("delete clicked.")
            })
            let editMenu = UIMenu(title: "Edit...", children: [rotate, delete])
            
            
            return UIMenu(title: "Options", image: nil, identifier: nil, children: [viewMenu, editMenu])
        }
        
        return configuration
}
```

![](https://images.viblo.asia/9b51d2a7-3fba-4d77-b7cf-7216adbb2e76.gif)

### ContextMenu and PreviewProvider
Để hiển thị *PreviewProvider* chúng ta phải implement function sau:


```
unc collectionView(_ collectionView: UICollectionView, contextMenuConfigurationForItemAt indexPath: IndexPath, point: CGPoint) -> UIContextMenuConfiguration? {
let configuration = UIContextMenuConfiguration(identifier: "\(indexPath.row)" as NSCopying, previewProvider: {
            return SecondViewController(index: indexPath.row)
        }){ action in
//add your uimenu as earlier
}
}
```
Để handle cho việc click vào *PreviewProvider* chúng ta phải implement function sau trong UICollectionViewDelegate protocol:
```
func collectionView(_ collectionView: UICollectionView, willPerformPreviewActionForMenuWith configuration: UIContextMenuConfiguration, animator: UIContextMenuInteractionCommitAnimating) {
        
        let id = configuration.identifier as! String
        
        animator.addCompletion {
            self.show(SecondViewController(index: Int(id)), sender: self)
        }
}
```

![](https://images.viblo.asia/2a58006d-4673-4e15-81ee-830116bf650b.gif)

# Kết luận
Apple đã loại bỏ 3D Touch trên các dòng iPhone mới nhưng lại đem lại cho chúng ta 1 cách thể hiện khác và như họ nói 3D Touch vẫn còn ở đây. Thật là vi diệu phải không nào, theo tôi đây là một function rất hữu ích trên iOS 13 sẽ mang lại UX rất tuyệt vời.
Cám ơn các bạn đã đọc bài viết.

[Nguồn](https://medium.com/better-programming/ios-context-menu-collection-view-a03b032fe330)

[Demo](https://drive.google.com/drive/u/0/folders/1_lYmNZpPeI9b9ojbeIsddf6ol-EdEWfC)