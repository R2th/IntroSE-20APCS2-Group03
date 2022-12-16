## Lời mở đầu:

**UIScrollView** có khá nhiều thuộc tính, trong đó **contentInset**, **contentOffset** và **contentSize** là ba thuộc tính được sử dụng nhiều nhất. Một khi đã hiểu rõ được những thuộc tính này, ta có thể dễ dàng bắt đầu với những stretchable toolbar hay pinch in / pinch out với ảnh.

### 1. Content Inset

Là phần lề từ **UIScrollView** đến **innerView**. Nó được sử dụng trong trường hợp ta muốn cung cấp không gian bên trong cho **childView**. Thuộc tính này chỉ có thể setting bằng code với giá trị mặc định bằng 0 cho top, bottom, left, right.
```
scrollView.contentInset = UIEdgeInsets(top: 7, left: 7, bottom: 7, right: 7)
```

### 2. Content Offset
Là vị trí hiện tại sau khi scrolling trong area. Do đó giá trị của **contentOffset** sẽ thay đổi mỗi lần user scroll up hoặc scroll down. Thuộc tính này có thể được set bằng code cũng như ở main thread, nó sẽ scroll up đến vị trị đã cho nếu vị trí đó tồn tại.

```
scrollView.setContentOffset(CGPoint(x: 50, y: 50), animated: true)
```

### 3. Content Size
Là kích thước của content trong **UIScrollView**. Đôi khi thuộc tính này có thể là dynamic như phân trang hoặc static như contact list. Nó cũng có thể thay đổi ở runtime và cũng có thể setting bằng code.

```
scrollView.contentSize = CGSize(width: self.view.frame.size.width, height: 500)
```

![](https://images.viblo.asia/78191a3e-a540-4df9-b58f-7329adfa270e.png)


**UITableView** và **UICollectionView** kế thừa từ **UIScrollView**, do đó tất cả những thuộc tính này đều xuất hiện ở **tableView** và **collectionView** và có thể sử dụng nhiều lần như một giải pháp cho những vấn đề gặp phải hoặc để thiết kế những feature mới.


## Tài liệu tham khảo: 
https://medium.com/better-programming/contentoffset-contentinset-and-contentsize-of-a-uiscrollview-5ae8beb0f1db