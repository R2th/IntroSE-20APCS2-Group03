Ở bài viết này, mình xin phép được chia sẻ với mọi người về sức mạnh của Swift's generics và protocol và cách áp dụng nó cho việc dùng các custom Cell của `TableView` hoặc `CollectionView`  .

Đương nhiên là dưới góc nhìn của 1 fresher iOS cùi bắp như mình thì có thể bài viết sẽ có các lỗi sai sót, mong mọi người cứ gạch đá và đốt nhà thoải mái để cùng nhau tiến bộ ^^. 
### Đôi lời tâm tư tình cảm
Trong quá trình làm dự án, không ít lần mọi người sẽ bắt gặp việc phải khai báo `UITableViewCell` hay `UICollectionViewCell`  với `reuseIndentifier` . Theo lẽ thông thường thì cách tốt nhất là define `Constants` cho biến kiểu `String` cho identifier.

Với sự trợ giúp từ Swift's generics và protocol thì việc sử dụng các khai báo sẽ dễ dàng hơn nhiều. 

Kĩ thuật được nói ở trên thường được gọi là Reusable. Hiểu đơn giản là: có 1 công ty sai vặt tên  `Protocol`  và việc của bạn chỉ là mướn mấy chàng thuộc công ty đó về (thêm các protocol này cho các class ) giao việc cho họ và ngồi rung đùi đợi phép màu và hưởng thụ (mấy anh ôsin đẹp trai dễ thương của `Protocol` làm hết cho bạn rồi còn đâu)


![](https://images.viblo.asia/2da6f453-34e8-434d-b15e-b2cc54f300a2.gif)

### Thế mấy ông thuộc công ty Protocol đó làm gì nhỉ  ??

Trước khi thoả thuận mướn mấy anh đó về làm việc gì thì đương nhiên phải thương thảo hợp đồng rồi. Vậy nó gồm những gì: 
> Điều 1: Nhân viên phải có danh tính rõ ràng (gia phã mấy đời luôn thì càng tốt)

Ở đây thì bạn chỉ việc tạo 1 protocol tên là `ReusableView` trong đó có 1 biến `defaultReuseIdentifier` để lấy danh tánh và add nó vào trong extension của `UIView` thế là xong. 
```
protocol ReusableView: class {
    static var defaultReuseIdentifier: String { get }
    static var nibName: String { get }
}

extension ReusableView where Self: UIView {
    static var defaultReuseIdentifier: String {
        // Get the real name of the class for default value
        return String(describing: self)
    }
    static var nibName: String {
        return NSStringFromClass(self).components(separatedBy: ".").last ?? ""
    }
}
```

> Điều 2: Ông chủ phải đưa ra list công việc rõ ràng cho nhân viên

Trong điều khoản này thì đương nhiên mình phải xác định rõ ràng công việc cho mấy anh thuộc công ty Protocol làm rồi. Trong điều khoản này mình mướn họ về để làm việc với `UITableView` thôi nên mình chỉ cần thêm 1 vài hàm đơn giản trong extension của UITableView với sự hổ trợ của anh luật sư `Generics`
```
extension UITableView {
    // Register the Cell from XIB with identifer
   func register<T: UITableViewCell>(nibName name: T.Type, atBundle bundleClass: AnyClass? = nil) where T: ReusableView {
        let identifier = T.defaultReuseIdentifier
        let nibName = T.nibName
        
        var bundle: Bundle? = nil
        if let bundleName = bundleClass {
            bundle = Bundle(for: bundleName)
        }
        register(UINib(nibName: nibName, bundle: bundle), forCellReuseIdentifier: identifier)
    }
    
    // DequeueReusableCell with identifier
    func dequeueReusableCell<T: UITableViewCell>(_ type: T.Type) -> T where T: ReusableView {
        guard let cell =  self.dequeueReusableCell(withIdentifier: T.defaultReuseIdentifier) as? T else {
            fatalError("Could not dequeue cell with identifier: \(T.defaultReuseIdentifier)")
        }
        return cell
    }
}
```
> Điều 3: Giao việc cho họ, không thì họ méo làm :v 

Giờ thì hợp đồng xong xuôi hết rồi. Việc của bạn bây giờ chỉ là ép họ kí hợp đồng (gọi protocol Reusable ở Cell bạn muốn),  giao việc cho họ và ngồi hưởng thụ thôi. Quá đã 

![](https://images.viblo.asia/ca2b093a-4e21-4f49-b550-23d6aeccafb6.gif)

Ở đây chỉ cần gọi mấy hàm hồi nãy bạn tạo ra để dùng thui. 

* Đầu tiên là thằng Reusable: nếu bạn muốn đặt nick name cho ông nhân viên của bạn thì cứ việc. Không thì nó sẽ mặc định là tên thật của cái View bạn đang gọi:
```
class CustomViewCell: UITableViewCell, ReusableView {
    // Add new identifier if you want
    // static var defaultReuseIdentifier = "CustomCell"
```

* Sau đó là bàn giao công việc cho anh ôsin đẹp trai này làm thui:
```
 func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = myTableView.dequeueReusableCell(CustomViewCell.self)
        cell.configCell(people: models[indexPath.row])
        return cell
    }
```
Đó! Vậy là xong. Quá tuyệt vời ông mặt trời khi chỉ cần khai báo 1 dòng code đơn giản thay vì phải điền vô String identifier rồi ép kiểu hầm bà lằng trong ấy như các hàm của Apple đã support. 

![](https://images.viblo.asia/a70151da-a3e1-4bbf-b696-a3573df000c3.gif)

### Giao việc hết rồi, giờ rãnh quá đi đâu bây giờ?
Thiệt ra thì kĩ thuật này không giới hạn ở mỗi TableViewCells, như mình đã nói ở đầu bài, nó còn có thể áp dụng cho CollectionViewCells, các view con và đủ thứ trong ấy.

Nguồn bài viết mình tham khảo:
* https://blog.kulman.sk/simpler-and-safer-custom-tableview-cells/
* http://alisoftware.github.io/swift/generics/2016/01/06/generic-tableviewcells/

Còn nếu bạn lười vãi ra không muốn tự tạo hợp đồng giao việc cho bọn protocol thì cứ add pod từ link này về, nó cho bạn service từ A -> Á.... ý lộn A -> Z luôn:

* https://github.com/AliSoftware/Reusable

Link code demo của mình: 
* https://github.com/framgia-nguyenkdm/reusableDemo