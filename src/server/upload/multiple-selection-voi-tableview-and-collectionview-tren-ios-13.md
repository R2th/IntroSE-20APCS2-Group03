# Giới thiệu:
* WWDC 2019 đã giới thiệu một chức năng mới dành cho UItableViewCell. Bạn có thể cho người dùng có thể sử dụng 2 ngón tay và vuốt để chọn các item nhanh hơn trên UITableView hoặc UICollectionView.

 # Mục tiêu:
* Sử dụng MultiSelection để select item trên TableView hoặc CollectionView.
* Triển khai chức năng này với project mẫu

# Hiểu được MultipleSelection Gestures:
* Trong iOS 13, các ứng dụng có tính năng này sẽ giúp người dùng có thể nhanh chóng chọn được nhiều item. Ví dụ khi TableView hoặc CollectionView nhận ra có hai ngón tay chạm vào, ứng dụng sẽ tự động cho phép người dùng vuốt hai ngón tay để chọn nhiều item.

![](https://images.viblo.asia/c016af7e-7f79-4f4b-a4e1-73d6ca57d326.png)

# Bắt đầu với project mẫu:
* Mở Xcode và tạo dự án Xcode mới. Chọn Single View App và nhấp vào next.
![](https://images.viblo.asia/9315c6f5-9382-48c1-afa0-44fc0c3a7d17.png)
* Đặt tên cho project và khởi tạo.
![](https://images.viblo.asia/e5aed752-a377-4423-920c-61843b127f2c.png)

# Implementation:
* Đầu tiên ta xoá ViewController mặc định trong Main.storyboard và add vào một TableViewController và sẽ thêm NavigationController vào. Tiếp theo ta check vào ô Is Initial View Controller cho NavigationController để khi khởi động ứng dụng sẽ chạy đúng màn hình này.

![](https://images.viblo.asia/d34f5413-4eb3-4fb2-8e8d-35014ecb4c8e.png)

* Bây giờ chúng ta di chuyển đến file ViewController.swift để code. Ta phải chắc chắn rằng ViewController đã được kế thừa từ UITableViewController.

# Implementing Multiple Selections in TableView:
```
navigationItem.rightBarButtonItem = editButtonItem
tableView.allowsMultipleSelectionDuringEditing = true
```

* Để sử dụng multiple selection trên tableView, ta set true cho thuộc tính allowsMultipleSelectionDuringEditing của tableView và thêm edit button trên navigationItem.

# Thêm Delegate Method:
```
// 1
override func tableView(_ tableView: UITableView, shouldBeginMultipleSelectionInteractionAt indexPath: IndexPath) -> Bool {
return true
}
// 2
override func tableView(_ tableView: UITableView, didBeginMultipleSelectionInteractionAt indexPath: IndexPath) {
self.setEditing(true, animated: true)
}
// 3
override func tableViewDidEndMultipleSelectionInteraction(_ tableView: UITableView) {
print("\(#function)")
}
```

1. Ở hàm delegate này chúng ta return true để cho phép người dùng có thể sử dụng chức năng multiple selection bằng cách vuốt 2 ngón tay.
2. Hàm delegate này sẽ cho ứng dụng biết được người dùng bắt đầu sử dụng hai ngón tay để vuốt đồng thời chức năng edit sẽ được enable.
3. Hàm delegate này sẽ cho ứng dụng biết được người dùng đã dừng vuốt hai ngón tay để chọn item.

# Build and Run:
![](https://images.viblo.asia/3593f125-a50f-4aa4-9467-080abeb7a80f.png)

* Đối với CollectionView cũng sử dụng tương tự các delegate như vậy.

Reference:
https://medium.com/better-programming/multiple-selection-gestures-on-tableview-and-collectionview-in-ios-13-77144506b742