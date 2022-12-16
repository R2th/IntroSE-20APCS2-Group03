Bài viết này mình sẽ hướng dẫn các bạn cách làm một UICollectionView bên trong một UITableViewCell. UICollectionView có số items là dynamic, height của UITableViewCell cũng sẽ được dynamic dựa theo height của UICollectionView.

Mình tạo view như sau: 
![](https://images.viblo.asia/f65204f6-8314-4074-9e93-7544d8583168.png)

Bên trong tableviewcell là một uicollectionview. UIcollectionViewCell là 1 Label. Mình autolayout cho UICollectionView cách top, left, right, bottom là 0 so với supperview.

Đoạn code ở ViewController như sau:

![](https://images.viblo.asia/69cb6f98-456c-4f30-bc9e-1900efcb968d.png)

Mình giải thích một chút: tableview mình có 1 cell, mình mong muốn hiển thị mảng items gồm 15 phần tử như trong ảnh. Vì mình muốn chiều cao của tableviewcell là linh động theo chiều cao của uicollectionview nên mình đặt **heightForRowAtIndexPath = UITableView.automaticDimension**.

Bây giờ là đoạn code ở file TableViewCell:

![](https://images.viblo.asia/1b659758-3060-4c0a-a21a-79e203088ee0.png)

Bên trong tableviewcell có một uicollectionview. 

Bây giờ mình build ứng dụng lên thử nhé, đây là kết quả:

![](https://images.viblo.asia/e4e89601-1175-42dc-b1ff-d1d48e023be4.png)

Nó không giống như mình mong đợi, nó chỉ hiển thị được 4 phần tử bên trong uitablewcell mặc dù mình đã dùng **UITableView.automaticDimension**.

Giải pháp ở đây là tính toán **collectionViewContentSize** và gán lại cho **contentSize** của UITablewViewCell. Phương pháp này gọi là "**does the magic**": Thêm đoạn code sau vào file TableViewCell:

```
override func systemLayoutSizeFitting(_ targetSize: CGSize, withHorizontalFittingPriority horizontalFittingPriority: UILayoutPriority, verticalFittingPriority: UILayoutPriority) -> CGSize {
        self.collectionView.layoutIfNeeded()
        self.layoutIfNeeded()
        let contentSize = self.collectionView.collectionViewLayout.collectionViewContentSize
        return CGSize(width: contentSize.width, height: contentSize.height + 8)
    }
```

File TablewViewCell hiện tại sẽ thế này:

![](https://images.viblo.asia/1d50611c-165e-4de2-a40a-369cb3bdfcbf.png)

Rồi, bây giờ mình run kết quả nhé:

![](https://images.viblo.asia/d1e85cf5-8e21-49d6-9912-1061c00dc240.png)

Bây giờ nó đã giống như mình mong đợi :). Mình thay đổi mảng items xem nó sẽ hiển thị thế nào nhé:

```
items = ["label 1", "label 2", "label 3", "label 4", "label 5", "label 6", "label 7", "label 8", "label 9", "label 10", "label 11", "label 12", "label 13", "label 14", "label 15", "hihi 1", "hihi 1","hihi 2","hihi 3","hihi 4","hihi 5","hihi 6","hihi 7","hihi 8","hihi 9","hihi 10"]
```

Nó hiển thị rất tốt như mình mong đợi rồi:

![](https://images.viblo.asia/b487339e-a31d-45ea-8910-7413bde3e0cc.png)

Cảm ơn các bạn đã xem bài viết. Happy coding :)