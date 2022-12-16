Chào các bạn, chắc hẳn khi sử dụng facebook đôi khi bạn sẽ nhìn thấy UI được hiển thị dưới dạng màu xám với animation. Hôm trước mình vô tình nhìn thấy thư viện giúp chúng ta có thể làm được như vậy một cách nhanh chóng trên ios. Thư viện đó có tên là [SkeletonView](https://github.com/Juanpe/SkeletonView). Nó có một số sao khá khiêm tốn là hơn 6500 star ^^.
## Bắt đầu
Để bắt đầu sử dụng thư viện này, thì chúng ta cần phải cài đặt nó vào trong project xcode.
Có 2 cách là dùng pod hoặc carthage (Các bạn có thể đọc bài viết này để rõ hơn về pod và carthage ^^ [Tìm hiểu về CocoaPods và Carthage](https://viblo.asia/p/tim-hieu-ve-cocoapods-va-carthage-aWj53XbPK6m))
Pod 
```
pod "SkeletonView"
```
Carthage
```
github "Juanpe/SkeletonView"
```
## Cách sử dụng
Sau khi đã cài đặt xong bằng cocoapod hoặc carthage thì chúng ta sẽ cần import SkeletonView vào nơi mà chúng  ta cần sử dụng
```
import SkeletonView
```
Tiếp theo, chúng ta cần phải set xem view nào sẽ có thể hiển thị dạng skeleton
Có 2 cách đó là set thuộc tính isSkeletonable trong code hoặc trên storyboard
Code
```
avatarImageView.isSkeletonable = true
```
Storyboard
![](https://images.viblo.asia/eb201080-e22f-4294-91d7-02ab828c37b1.png)
Tiếp theo là chúng ta cần phải set cho view mà chúng ta muốn hiển thị skeleton bằng cách sử dụng 1 trong các function sau: 
```
(1) view.showSkeleton()                 // Solid
(2) view.showGradientSkeleton()         // Gradient
(3) view.showAnimatedSkeleton()         // Solid animated
(4) view.showAnimatedGradientSkeleton() // Gradient animated
```
## Example
Ở đây mình có thử sử dụng thư viện SkeletonView vào một project mình tự tạo. Giao diện rất đơn giản chỉ là một tableview và bên trong có chứa một vài cell
![](https://images.viblo.asia/746d640b-f6f5-4b72-a110-ed7ea86185cb.png)
Tiếp đó mình tạo cell thì mình sẽ cần set thuộc tính isSkeletonable = true cho cell và các view con bên trong nó.
![](https://images.viblo.asia/f4c8c465-2b83-4499-8236-9e759629944e.png)
Tiếp đến là  trong viewcontroller
![](https://images.viblo.asia/e84a4dfc-1163-48a2-b079-601dc693d755.png)
Thì ở đây để sử dụng  thư viện SkeletonView với tableview, chúng ta cần đảm bảo VC conform với protocol SkeletonTableViewDataSource
```
public protocol SkeletonTableViewDataSource: UITableViewDataSource {
    func numSections(in collectionSkeletonView: UITableView) -> Int // Có giá trị mặc định
    func collectionSkeletonView(_ skeletonView: UITableView, numberOfRowsInSection section: Int) -> Int // Có giá trị mặc định
    func collectionSkeletonView(_ skeletonView: UITableView, cellIdentifierForRowAt indexPath: IndexPath) -> ReusableCellIdentifier // Cần thiết lập 
}
```
> IMPORTANT! If you are using resizable cells (tableView.rowHeight = UITableViewAutomaticDimension ), it's mandatory define the estimatedRowHeight.


Link github:
https://github.com/dungkv95/ExampleSkeletonView