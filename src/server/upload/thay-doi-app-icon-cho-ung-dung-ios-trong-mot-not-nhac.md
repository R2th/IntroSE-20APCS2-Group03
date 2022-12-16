Xin chào cả nhà lại là mình đây, do đợt vừa rồi khách hàng yêu cầu làm thêm feature này cho con app của họ và thấy cái này cũng hay ho phết mà bên android không hỗ trợ nên mình quyết định viết bài này mục đích chia sẻ cho những ai cần hoặc muốn mày mò ^^.
Trước tiên mình xin phép dành ít dòng để dưới thiệu về nó.
# Giới thiệu
Kể từ khi iOS 10.3 xuất hiện Apple ra mắt một chức năng cực kì tuyệt vời để các developer có thể thay đổi app icon. Tuy nhiên không được như app Clock của Apple nhưng cũng đủ để ta tận hưởng tính năng này một cách tuyệt vời. Ok bắt tay vào để xem nó hoạt động như thế nào.

Trong tài liệu Apple's API có cung cấp 3 điều quan trọng: 
```
var supportsAlternateIcons: Bool { get }
var alternateIconName: String? { get }
func setAlternateIconName(String?, completionHandler: ((Error?) -> Void)? = nil)
```
* **supportsAlternateIcons** là một readonly property,  nó quyết định app có thể thay đổi được app icon được hay không. 
* **alternateIconName** cũng là một readonly property, nó lấy ra tên hiện tại của app icon đang được hiển thị.
* **setAlternateIconName** là một method để thiết lập app icon được hiển thị. Nếu mình set cho icon name là nil thì app sẽ hiện thị của primary icon (thuật ngữ này sẽ xuất hiện bên dưới)

OK phần dạo đầu xin phép đến đây. Let's go to Xcode và bắt đầu get started nào !
# Chuẩn bị 
Đầu tiên mình sẽ thêm thư mục chứa toàn bộ app icon mà mình muốn thay đổi trong app. Lưu ý rằng nếu đưa tất cả vào Assets thì sẽ không được. 

Dưới đây là screenshot của mình :

![](https://images.viblo.asia/487e96ce-a248-435f-bde4-301879c2c64a.png)

Tiếp theo, mình sẽ set up trong file Info.plist
1. Add Icon files (iOS 5) tới Info.plist
2. Add CFBundleAlternateIcons kiểu là dictionary -> sử dụng cho thay đổi icon
3. Set 3 dictionary bên dưới CFBundleAlternateIcons 
4. Trong mỗi cái dictionary vừa tạo ở bước 3 thì có 2 properties - UIPrerenderedIcon and CFBundleIconFiles (chứa tên ảnh cần thay)
Dưới đây là screenshot file info.plist của mình :

![](https://images.viblo.asia/88e1d943-b8a9-423b-957b-18712e003776.png)

# Bắt đầu
Dưới đây là screenshot giao diện mình sẽ thiết kế để demo :

![](https://images.viblo.asia/f333c429-8c08-49c6-b5b8-3c9289663c25.png)


Phía trên cùng là icon hiện tại của app. Bên dưới là 1 list các icon mà người dùng muốn thay đổi. 
Trước tiên mình sẽ tạo 1 model AlternateIconItem :
```
struct AlternateIconItem {
    private(set) var identifier: String?
    var title: String?
    var imageName: String?

    init(identifier: String?, title: String?, imageName: String?) {
        self.identifier = identifier
        self.title = title
        self.imageName = imageName
    }
}
```
Tiếp theo mình sẽ load data tương ứng từ file info.plist ra và sau đó add tất cả giá trị vào mảng alternateIconItems 

```
 private var alternateIconItems = [AlternateIconItem]()
```

```
private func createAlternateIconItems() {
        guard let iconDict = Bundle.main.object(forInfoDictionaryKey: "CFBundleIcons") as? [String : Any] else {
            return
        }
        guard let alternateIconsDict = iconDict["CFBundleAlternateIcons"] as? [String : Any] else {
            return
        }
        var currentIconName: String?
        if #available(iOS 10.3, *), let alternateIconName = UIApplication.shared.alternateIconName {
        //Check device phải từ 10.3 trở lên thì mới lấy ra image current của app
            currentIconName = alternateIconName
        } else {
            showLowVersionAlert()
        }
        var alternateIconItems = [AlternateIconItem]()
        let iconName: String = UIDevice.current.userInterfaceIdiom == .phone ? "AppIcon" : "AppIcon"
        guard let defaultIconTitle = iconDict["DefaultIconTitle"] as? String else {
            return
        }
        let alternateIconItem = AlternateIconItem(identifier: nil, title: defaultIconTitle , imageName: iconName)
        alternateIconItems.append(alternateIconItem)
        if (currentIconName == nil) {
            currentIconItem = alternateIconItem
        }
        for key in alternateIconsDict.keys {
            let alternateIconDict = alternateIconsDict[key] as? [String : Any]
            let imageName = (alternateIconDict?["CFBundleIconFiles"] as? [Any])?.first as? String
            let iconTitle = alternateIconDict?["IconTitle"] as? String
            let alternateIconItem = AlternateIconItem(identifier: key, title: iconTitle, imageName: imageName)
            alternateIconItems.append(alternateIconItem)
            if (currentIconName == alternateIconItem.identifier) {
                currentIconItem = alternateIconItem
            }
        }
        self.alternateIconItems = alternateIconItems
    }
```
Tiếp theo mình sẽ implementation datasource và delegate để hiện thị cũng như handle sự kiện khi người dùng bấm vào cell :
```
    // MARK: - Table view delegate

    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        changeIconToItem(alternateIconItem: alternateIconItems[indexPath.row])
    }
```
```
    // MARK: - Table view data source

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return alternateIconItems.count
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: kCellIdentifier) as? AlternateIconTableViewCell else{
            return AlternateIconTableViewCell()
        }
        cell.updateCell(alternateIconItem: alternateIconItems[indexPath.row])
        return cell
    }

    override func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        return (section == 0) ? "List AlternateIcon" : nil
    }

    override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return rowHeight
    }
```

Và cuối cùng là implementation method thay đổi icon :
```
    private func changeIconToItem(alternateIconItem: AlternateIconItem?) {
        if #available(iOS 10.3, *) {
            guard UIApplication.shared.supportsAlternateIcons else {
                return
            }
            guard let identifier = alternateIconItem?.identifier else {
                // Reset to default
                UIApplication.shared.setAlternateIconName(nil)
                self.didChangeIconToItem(alternateIconItem: alternateIconItem!)
                return
            }
            UIApplication.shared.setAlternateIconName(identifier) { error in
                if error != nil {
                    self.showIconChangeFailerAlert()
                }
            }
            didChangeIconToItem(alternateIconItem: alternateIconItem!)
        } else {
            showLowVersionAlert()
        }
    }
```

# Kết quả
Và [đây](https://www.youtube.com/watch?v=KAYN8bx8mCg&feature=youtu.be) là thành quả của chúng ta sau khi triển khai.


Link resource: https://github.com/oTranBaThiet/DemoChangeAppIcon

Cảm ơn mọi người đã theo dõi ! Ai có đóng góp gì cho bài viết thì comment bên dưới bài nha ^^ Thank you so much !