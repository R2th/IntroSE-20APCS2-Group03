### MỞ ĐẦU: 
- Trước kia khi còn làm việc độc lập, mình hầu như hay sử dụng UITableView để hiển thị một danh sách gì đó, nó khá nhanh và dễ dùng. Từ khi mình vào cty lớn mình để ý thấy ở đây hầu hết các dự án lớn họ dùng UICollectionView thay vì sử dụng UITableView, đọc thấy configure khá lằng nhằng nên mình quyết định cái gì tiện thì làm, mình vẫn sử dụng UITableView, cho đến một ngày khách hàng yêu cầu thay đổi việc hiện thị danh sách, mình đã rất khổ sở để sửa, nhưng cuối cùng phải bỏ đi hết làm lại :'(. 
- Đây là lý do tại sao trong dự án yêu cầu phải thay đổi giao diện liên tục thì nên sử dụng UICollectionView thay vì UITableView. Có khá nhiều bài viết hướng dẫn cách sử dụng UICollectionView cơ bản rồi nên ở bài viết này mình sẽ chỉ chỉ ra sự khác biệt giữa hai design parterns này:

### 1. Hỗ trợ Multi-column.
- Hầu hết mọi người có thể đoán ra lợi thế lớn nhất khi sử dụng UICollectionView là khả năng xử lý multi-column dễ dàng. Chức năng này được tích hợp vào UIKit nguyên bản bằng cách sử dụng đối tượng UICollectionViewFlowLayout. 
- Dưới đây là ví dụ về việc kết hợp 2 columns sử dụng UICollectionView:

![](https://images.viblo.asia/05d237af-b0b2-46eb-b9e0-2f1dd575ec19.jpeg) 

### 2. Cuộn danh sách theo chiều ngang.
- Khả năng thực hiện cuộn ngang đã rất quen thuộc với những người đã sử dụng UICollectionView trong các ứng dụng của họ. Apple đã sử dụng kiểu bố trí này để hiện thị những ứng dụng trên AppStore của họ:

![](https://images.viblo.asia/874af605-52be-46f4-b855-23b3d8b9de95.png)

### 3. Custom Layout theo mong muốn.
- Khi bạn được yêu cầu làm những giao diện nâng cao của một danh sách, chắc chắn bạn phải bắt đầu triển khai lớp con UICollectionViewLayout để tùy chỉnh giao diện cell của riêng bạn. Đây chính là điều mà UITableView không thể làm được vì nó hoạt động theo nguyên tắc khác của các đối tượng chiều rộng đầy đủ (nghĩa là chiều rộng của một cell xác định luôn không đổi).
- Chúng ta có thể tạo ra thứ giống như này (**Pinterest**):

![](https://images.viblo.asia/6fe33d2d-fb20-4c67-a7c3-d1e0f7fc4d1e.jpeg)

### 4. Configure Animation cho việc thêm và xoá Cell.
- Điều này ít được biết đến, nhưng nếu bạn muốn thử nghiệm các Animations của riêng bạn cho các cell trong UICollectionView, bạn có thể làm như vậy bằng cách cung cấp các thuộc tính tùy chỉnh: 
```
class CustomLayout: UICollectionViewFlowLayout {

    override func initialLayoutAttributesForAppearingItem(at itemIndexPath: IndexPath) -> UICollectionViewLayoutAttributes? {
        let attributes = layoutAttributesForItem(at: itemIndexPath)
        attributes?.transform = CGAffineTransform(rotationAngle: 90 * CGFloat.pi / 2)
        return attributes
    }

    override func finalLayoutAttributesForDisappearingItem(at itemIndexPath: IndexPath) -> UICollectionViewLayoutAttributes? {
        // ..similar customization
        return super.finalLayoutAttributesForDisappearingItem(at: itemIndexPath)
    }

}
```

### 5. Base View của UICollectionViewController là UIView.
- Bạn sẽ thường gặp phải các tình huống mà bạn muốn thêm một hoặc hai views bên cạnh UICollectionView của mình. Điều này thật dễ dàng với UICollectionViewController vì View của nó được base trên UIView.
- Ví dụ: Thêm một view vào bộ Controller của bạn rất đơn giản và dễ hiểu như thế này:

```
class MyCollectionViewController: UICollectionViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        let customTopView = UIView()
        customTopView.backgroundColor = .yellow
        view.addSubview(customTopView)
    }

}
```

### 6. Không có FooterViews và Separator.
- Hầu như sau khi implemented danh sách vào UITableView, các bạn sẽ thường tắt những đường separator bên dưới, và để làm điều ấy bạn sẽ phải mất 2 dòng code như dưới đây:

```
override func viewDidLoad() {
    super.viewDidLoad()

    tableView.tableFooterView = UIView()
    tableView.separatorStyle = .none
}
```
- Với UICollectionView thì bạn lại chẳng phải làm cái điều này nữa vì mặc định nó đã không có những đường separator này rồi.

### Hạn chế: 
- Thật ra không có gì là hoàn hảo, UICollectionView không thể thao tác vuốt sang trên cell để xoá hoặc thực hiện những hành động khác. Trên UITableView bạn có thể implement một vài functions để mở thao tác này:

```
override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
    // Implement delete action handler here
}
``` 

- Thường thì theo như mình thấy, trên CollectionView ít khi sử dụng thao tác như này lắm, nhưng nếu muốn thì ngoài kia có khá nhiều pods có thể hỗ trợ bạn việc này (ví dụ: SwipeCellKit).

### Lời kết:
- Nhắc lại lời mở đầu, khi mà dự án yêu cầu phải thay đổi giao diện liên tục thì bạn nên sử dụng UICollectionView thay vì UITableView, điều này sẽ giúp bạn tránh khỏi những phát sinh trong tương lai. UICollectionView thực sự là một design partern tuyệt vời để custom những trang chứa giao diện danh sách phức tạp. Hãy suy nghĩ cẩn thận trước khi sử dụng UITableView hoặc UICollectionView nhé, đừng như mình phải mất công làm lại từ đầu :D.

> nguồn tham khảo: https://www.letsbuildthatapp.com/blog/UICollectionView-vs-UITableView.