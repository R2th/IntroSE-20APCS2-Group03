### Nội dung

- Giới thiệu
- The Observer Pattern
- The Adapter pattern
- The Memento Pattern

### Giới thiệu

Ở phần trước chúng ta đã cùng nhau tìm hiểu về các design pattern thường gặp như: Singleton, MVC, Decorator, Adapter, Facade. Trong phần 2 này chúng ta sẽ tiếp tục tìm hiểu về các design pattern phổ biến khác như: Observer, Adapter, Memento.

**Nào chúng ta cùng bắt đầu!**

### The Observer pattern

Trong Observer pattern, một object gửi thông báo tới object khác khi có sự thay đổi về trạng thái. Cách cài đặt thông thường là một bộ lắng nghe đăng ký theo dõi trạng thái của object. Khi trạng thái object đó thay đổi, tất cả các object theo dõi sẽ nhận được thông báo về sự thay đổi này.

Cocoa cài đặt Observer pattern theo 2 cách thường gặp là: Notifications và Key-Value Observing (KVO).

#### Notifications

Notification xây dựng dựa trên cơ chế subscribe(theo dõi) và publish(thông báo). Object(the publisher) gửi messages tới object khác(subcribers). Object thông báo không cần biết bất kể thông tin gì về bên nhận thông báo.

Ví dụ: Khi keyboard hiển thị/ẩn đi, hệ thống gửi notify: **UIKeyboardWillShowNotification/UIKeyboardWillHideNotification** tương ứng. Khi ứng dụng chuyển trạng thái về background, hệ thống gửi notify: **UIApplicationDidEnterBackgroundNotification**.

**Làm thế nào để sử dụng Notifications?**

Chúng ta tìm hiểu đoạn code trong file **AlbumView.swift**:

```Swift
NSNotificationCenter.defaultCenter().postNotificationName("BLDownloadImageNotification", object: self, userInfo: ["imageView":coverImage, "coverUrl" : albumCover])
```

Trong đoạn code trên mục đích để gửi thông báo thông qua NSNotificationCenter. Thông báo bao gồm: UIImageView và URL của cover image để download.

Và để nhận được thông báo trên, chúng ra sử dụng đoạn code sau trong file **LibraryAPI.swift**:

```Swift
NSNotificationCenter.defaultCenter().addObserver(self, selector:"downloadImage:", name: "BLDownloadImageNotification", object: nil)
```

Do đó, bất kể khi nào class **AlbumView**  thông báo notify **BLDownloadImageNotification**, từ khi đăng ký theo dõi thông báo này **LibraryAPI**  sẽ gọi function **downloadImage()**

Tuy nhiên trước khi implement downloadImage(), bạn nên nhớ bỏ theo dõi thông báo BLDownloadImageNotification sau khi class **LibraryAPI** của bạn bị deallocated bằng đoạn code sau:

```Swift
deinit {
  NSNotificationCenter.defaultCenter().removeObserver(self)
}
```

Khi object bị deallocated, nó xóa chính nó và các đối tượng lắng nghe tất cả thông báo mà nó đã đăng ký.

#### Key-Value Observing (KVO)

Trong KVO, một object có thể yêu cầu nhận được thông báo về bất cứ thay đổi của một property cụ thể của chính nó hoặc object khác.

**Làm thế nào để sử dụng KVO Pattern?**
Trong trường hợp này chúng ta sử dụng KVO để quan sát thay đổi của property **image** của UIImageView. Mở file **AlbumView.swift** và thêm đoạn code vào trong function **init(frame:albumCover:)**:

```Swift
coverImage.addObserver(self, forKeyPath: "image", options: nil, context: nil)
```

Để nhận được thông báo của sự thay đổi chúng ta thêm dòng sau:

```Swift
override func observeValueForKeyPath(keyPath: String, ofObject object: AnyObject, change: [NSObject : AnyObject], context: UnsafeMutablePointer<Void>) {
  if keyPath == "image" {
    indicator.stopAnimating()
  }
}
```

Cuối cùng chúng ta bỏ đăng kí sau khi đã hoàn tất:

```Swift
deinit {
  coverImage.removeObserver(self, forKeyPath: "image")
}
```

### The Adapter pattern

Adapter cho phép những class không tương tác với giao diện có thể làm việc cùng với nhau. Nó bao lấy  object và để lộ ra interface để tương tác với object đó.

**Làm thế nào để sử dụng Adapter pattern?**
Ví dụ trong file HorizontalScroller.swift chúng ta tạo protocol là HorizontalScrollerDelegate:

```Swift
@objc protocol HorizontalScrollerDelegate {
    // ask the delegate how many views he wants to present inside the horizontal scroller
    func numberOfViewsForHorizontalScroller(scroller: HorizontalScroller) -> Int
    // ask the delegate to return the view that should appear at <index>
    func horizontalScrollerViewAtIndex(scroller: HorizontalScroller, index:Int) -> UIView
    // inform the delegate what the view at <index> has been clicked
    func horizontalScrollerClickedViewAtIndex(scroller: HorizontalScroller, index:Int)
    // ask the delegate for the index of the initial view to display. this method is optional
    // and defaults to 0 if it's not implemented by the delegate
    optional func initialViewIndex(scroller: HorizontalScroller) -> Int
}
```

Để các class khác có thể gọi các function của protocol HorizontalScrollerDelegate chúng ta cần tạo instant cho nó:

```Swift
weak var delegate: HorizontalScrollerDelegate?
```

### The Memento Pattern

The memento pattern captures and externalizes an object’s internal state. In other words, it saves your stuff somewhere. Later on, this externalized state can be restored without violating encapsulation; that is, private data remains private.

Memmento pattern lưu trạng thái bên trong của  object và sau đó có thể  khôi phục lại mà không vi phạm  việc đóng gói. Điều này nghĩa là dữ liệu private vẫn tiếp tục private.

**Làm thế nào để sử dụng Memento pattern?**

Chúng ta cùng quan sát 2 method dưới đây

```Swift
//MARK: Memento Pattern
func saveCurrentState() {
  // When the user leaves the app and then comes back again, he wants it to be in the exact same state
  // he left it. In order to do this we need to save the currently displayed album.
  // Since it's only one piece of information we can use NSUserDefaults.
  NSUserDefaults.standardUserDefaults().setInteger(currentAlbumIndex, forKey: "currentAlbumIndex")
}

func loadPreviousState() {
  currentAlbumIndex = NSUserDefaults.standardUserDefaults().integerForKey("currentAlbumIndex")
  showDataForAlbum(currentAlbumIndex)
}
```

- saveCurrentState: lưu lại inde hiện tại của album vào NSUserDefaults – NSUserDefaults- đây là cách lưu data mặc định cung cấp bởi iOS để lưu cài đặt của ứng dụng và dữ liệu.
- loadPreviousState: lấy ra index được lưu lần trước đó.

**Archiving**

Một trong cách cài đặt khác của Memento pattern là Archiving. Đơn giản đó là việc convert một object thành dạng stream để lưu lại và khôi phục sau đó mà không phải expose private properties thành external classes.

**Làm thế nào để sử dụng Archiving ?**

Quan sát đoạn code trong class Album sau:

```Swift
class Album: NSObject, NSCoding {
required init(coder decoder: NSCoder) {
  super.init()
  self.title = decoder.decodeObjectForKey("title") as! String
  self.artist = decoder.decodeObjectForKey("artist") as! String
  self.genre = decoder.decodeObjectForKey("genre") as! String
  self.coverUrl = decoder.decodeObjectForKey("cover_url") as! String
  self.year = decoder.decodeObjectForKey("year") as! String
}

func encodeWithCoder(aCoder: NSCoder) {
  aCoder.encodeObject(title, forKey: "title")
  aCoder.encodeObject(artist, forKey: "artist")
  aCoder.encodeObject(genre, forKey: "genre")
  aCoder.encodeObject(coverUrl, forKey: "cover_url")
  aCoder.encodeObject(year, forKey: "year")
}
```

- encodeWithCoder: được gọi khi muốn archive Album instance.
- decodeObjectForKey: dùng để unarchive từ instance save trước đó.

### Tổng kết

Thông  qua bài viết này, chúng ta hiểu thêm về các design pattern thường sử dụng trong iOS như: Observer, Adapter, Memento. Sau khi thành thạo các design pattern: Singleton, MVC, Delegation, Protocols, Facade, Observer, and Memento... cuối cùng thì code của bạn sẽ loại bỏ đi việc bị trùng lặp, dễ sử dụng lại, dễ đọc hơn. Và khi developer khác khi nhìn vào code của bạn, họ sẽ dễ dàng để hiểu những gì đang chạy và mỗi class làm công việc gì ở trong app.

Thật vậy, design pattern giúp cuộc sống của developer dễ dàng hơn và code của bạn trở nên tốt hơn!

Bạn có thể tải về ví dụ trong bài viết [_tại đây_](http://www.raywenderlich.com/wp-content/uploads/2014/12/BlueLibrarySwift-Final-2.zip)

##### _Nguồn:_

[_http://www.raywenderlich.com/46988/ios-design-patterns_](http://www.raywenderlich.com/46988/ios-design-patterns)

[https://www.raywenderlich.com/90773/introducing-ios-design-patterns-in-swift-part-2](https://www.raywenderlich.com/90773/introducing-ios-design-patterns-in-swift-part-2)

[http://nshipster.com/key-value-observing/](http://nshipster.com/key-value-observing/)