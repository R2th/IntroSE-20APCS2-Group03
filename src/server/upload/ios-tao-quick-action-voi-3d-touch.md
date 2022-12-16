Đã ba năm kế từ khi Apple ra mắt iPhone 6S, 6S Plus cùng với chức năng 3D Touch, mình thấy rằng không thực sự nhiều ứng dụng implement chức năng này. Và ngay cả người dùng có vẻ cũng không mặn mà cho lắm đối với thao tác này. Có vẻ như thao tác nhấn mạnh xuống màn hình và mong chờ một điều gì đó xuất hiện có vẻ khá lạ lẫm, và ít người thực sự muốn khám phá tính năng ấy. 
        Nhưng dù sao, cá nhân mình vẫn khá thích chức năng này, và là một developer phát triển một số ứng dụng độc lập, mình luôn cố gắng áp dụng những thứ tiện lợi nhất có thể đến với người dùng. Và hôm nay mình sẽ giúp các bạn implement Quick Action với 3D Touch dùng cho iOS 9 trở lên và device 6s trở lên. Dù bài viết này đã khá muộn màng khi công nghệ đã ra đời được ba năm, nhưng dù sao mình cũng mong các bạn nhìn nhận mặt tích cực của 3D touch và sớm implement chúng trong các ứng dụng mà các bạn đang phát triển.
# Home Screen Quick Actions
Chúng ta có thể cài đặt Quick Action bằng hai phương thức: thêm động hoặc thêm tĩnh. Với cách cài đặt Quick Action tĩnh, chúng sẽ xuất hiện ngay khi người dùng cài đặt hoặc update ứng dụng. Với cách cài đặt động, người dùng sẽ chỉ nhìn thấy Quick Action sau khi khởi chạy ứng dụng trở đi. Dù với cách nào đi chăng nữa chúng ta cũng chỉ có thể thêm được tối đa 4 action cho ứng dụng.
Mỗi action sẽ có một title, một icon và một subtitle. Subtitle là thuộc tính tùy chọn, có thể có hoặc không.

## Adding the Shortcut Items

Chúng ta cài đặt Quick Action bằng cách thêm chúng vào một mảng có tên UIApplicationShortcutItems nằm trong file Info.plist của ứng dụng. Mỗi phần tử trong mảng này mà một dictionary chứa các thuộc tính tương ứng với các thuộc tính của đối tượng UIApplicationShortcutItem. Các thuộc tính như sau:

* **UIApplicationShortcutItemType**: Đây là trường bắt buộc có kiểu String, dùng để xác định quick action.


* **UIApplicationShortcutItemTitle**: Trường bắt buộc có kiểu String, hiển thị làm title của action. Có thể hiện thị làm hai dòng nếu như action này không có subtitle. Chúng ta cũng có thể localized nội dung này trong file InfoPlist.strings.

* **UIApplicationShortcutItemSubtitle**: Trường tùy chọn này có kiểu String dùng để hiển thị subtitle của action. Giống như giá trị bên trên chúng ta cũng có thể localized nó trong file InfoPlist.strings.

* **UIApplicationShortcutItemIconType**: Trường tùy chọn có kiểu String chứa tên kiểu icon của item mặc định sẽ được hiển thị. Nếu muốn hiển thị icon tùy chỉnh, vui lòng xem ở thuộc tính bên dưới.

* **UIApplicationShortcutItemIconFile**: Trường tùy chọn có kiểu String chứa tên icon sẽ hiển thị trên action, tên này là tên ảnh trong app bundle hoặc file asset.

* **UIApplicationShortcutItemUserInfo**: Trường tùy chọn có kiểu dictionary mà trong đó chứa các thông tin tùy ý.

![](https://images.viblo.asia/7795a584-becb-4342-8c0e-6017aebbe4fc.png)
Đây là một ví dụ về cách cài đặt các thuộc tính cho Shortcut Items trong file Info.plist. Chúng ta cũng có thể cài đặt đa ngôn ngữ cho title của các item trong file InfoPlist.strings như sau:

```
shortcutTitleFavorites = "Favorites";
shortcutSubtitleFavorites = "What you like";
```
Hoàn tất các bước trên, chúng ta có thể thấy kết quả sẽ như sau:

![](https://images.viblo.asia/84729623-bbc4-4250-8a64-dfcfc8bfd72f.png)

## Handling the shortcut
Khi người dùng chọn một item trong quick action, hệ thống sẽ khởi chạy ứng dụng và gọi đến phương thức *performActionForShortcutItem* nằm trong AppDelegate

```
func application(application: UIApplication,
     performActionForShortcutItem shortcutItem: UIApplicationShortcutItem,
     completionHandler: (Bool) -> Void) {

  completionHandler(handleShortcut(shortcutItem))
}
```

Trong phương thức này, hệ thống yêu cầu chúng ta gọi đến một closure khi hoàn tất để cho biết đã xử lý thành công hoặc không thành công. Trong ví dụ này, để làm rõ hơn, người viết sẽ sử dụng một phương thức có tên *handleShortcut* trả về một giá trị Bool cho biết thành công hay thất bại và tiến hành gọi nó trong closure

```
private func handleShortcut(shortcutItem: UIApplicationShortcutItem) -> Bool {        
    let shortcutType = shortcutItem.type
    guard let shortcutIdentifier = ShortcutIdentifier(fullIdentifier: shortcutType) else {
        return false
    }  
    return selectTabBarItemForIdentifier(shortcutIdentifier)
}
```

Đầu tiên, phương thức này sẽ tiến hành kiểm tra type của shortcutitem và cố gắng lấy identifier của nó. Khối *guard let* để đảm bảo lấy được giá trị của identifier nếu không chúng ta sẽ thoát khỏi hàm. Sau khi đã lấy được giá trị của identifier rồi, chúng ta sẽ tiến hành các xử lý tiếp theo tùy thuộc vào mỗi identifier nhận được.

## Lưu ý
Một tinh chỉnh cuối cùng mà chúng ta cần lưu ý đó là khi app đang trong thái bị kill, quick action sẽ khỏi chạy app, khi đó hai phương thức *willFinishLaunchingWithOptions* và *didFinishLaunchingWithOptions* sẽ được gọi đến trước khi phương thức *performActionForShortcutItem* được gọi. Còn đối với trường hợp app đang dưới background, sẽ chỉ có phương thức *performActionForShortcutItem* được gọi đến khi ta chọn quick action.

Vì vậy, để tránh việc gọi đến quick action hai lần, chúng ta cần kiểm tra trong hay phương thức willFinish… hoặc didFinish… để thấy rằng nếu chúng ta có quick action thì xử lý nó và sau đó return false. Return false sẽ cho hệ thông biết được và không gọi đến phương thức *performActionForShortcutItem* nữa. Chúng ta có thể làm như sau:

```
func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject : AnyObject]?) -> Bool {

  if let shortcutItem =
       launchOptions?[UIApplicationLaunchOptionsShortcutItemKey]
       as? UIApplicationShortcutItem {

    handleShortcut(shortcutItem)
    return false
  }
  return true
}
```

Trên đây chúng ta vừa tìm hiểu làm thế nào để implement tính năng 3D touch để tạo quick action trên app iOS. Cảm ơn các bạn đã quan tâm theo dõi.