## Môi trường phát triển:
- **Swift Language Version:** Swift 5
- **Xcode:** Version 11.3.1
- **Deployment Target:** 12.0

Ở bài viết trước, mình đã hướng dẫn về cách tạo [Infinity Collection View](https://viblo.asia/p/swift-create-an-infinity-collection-view-in-ios-aWj533dY56m), và hôm nay mình sẽ hướng dẫn cách thêm chức năng **auto scroll** cho **Infinity Collection View**.

## Bước 1: Khởi tạo thuộc tính

```
let kCollectionViewNumberOfSets: Int = 4
let kCollectionViewLineSpacing: CGFloat = 4.0
let kNumberOfBanners: Int = 6
let kMaxAutoScrollSpeed: CGFloat = 100
let kMinAutoScrollSpeed: CGFloat = 0
let kCentimeterOf1Inch: CGFloat = 2.54
let kAutoScrollDefaultTimerInterval: CGFloat = 0.01
```
- **kCollectionViewNumberOfSets:** Thuộc tính kiểu Int biểu thị số lượng set các banners.
- **kCollectionViewLineSpacing:** Thuộc tính kiểu CGFloat biểu thị khoảng cách giữa các child view trong collection view.
- **kNumberOfBanners:** Thuộc tính kiểu Int biểu thị số lượng banners.
- **kMaxAutoScrollSpeed:** Thuộc tính kiểu CGFloat biểu thị tốc độ max của auto scroll.
- **kMinAutoScrollSpeed:** Thuộc tính kiểu CGFloat biểu thị tốc độ min của auto scroll.
- **kCentimeterOf1Inch:** Chỉ số biểu thị 1 inch = 2.54 cm.
- **kAutoScrollDefaultTimerInterval:** Thuộc tính kiểu CGFloat biểu thị khoảng thời gian mặc định khi autoscroll.


```
private var autoScrollSpeed: CGFloat! 
private var movePointAmountForTimerInterval: CGFloat!
```

- **autoScrollSpeed:** Thuộc tính kiểu CGFloat biểu thị tốc độ của auto scroll (mm/s).
- **movePointAmountForTimerInterval:** Thuộc tính kiểu CGFloat biểu thị số lượng Points di chuyển trong một khoảng thời gian.

## Bước 2: Tính toán tốc độ auto scroll
**Ý tưởng:** Để tính toán chính xác khoảng thời gian auto scroll của collection view trên từng loại thiết bị iPhone thì ta cần sử dụng **toạ độ không gian logic** (Logical coordinate space) được tính toán từ **toạ độ không gian thiết bị** (Device coordinate space). Toạ độ thiết bị được đo bằng đơn vị **Pixel** (px) - đơn vị điểm ảnh có giá trị khác nhau tuỳ thuộc vào loại thiết bị, còn toạ độ logic được đo bằng đơn vị **Point** (pt) - đơn vị sử dụng trong in ấn và có giá trị không đổi, 1 point xấp xỉ gần bằng 1/72 inch. Để tìm hiểu rõ hơn về đơn vị **Pixel** và **Point** thì bạn có thể truy cập [link](http://www.trungtamtinhoc.edu.vn/kich-thuoc-font-px-pt-em-khac-nhau-cho-nao/) này.
```
private func setAutoScrollSpeed(_ autoScrollSpeed: CGFloat) {
    var availableAutoScrollSpeed: CGFloat
    if autoScrollSpeed > kMaxAutoScrollSpeed {
        availableAutoScrollSpeed = kMaxAutoScrollSpeed
    } else if autoScrollSpeed < kMinAutoScrollSpeed {
        availableAutoScrollSpeed = kMinAutoScrollSpeed
    } else {
        availableAutoScrollSpeed = autoScrollSpeed
    }

    self.autoScrollSpeed = availableAutoScrollSpeed
    if (self.autoScrollSpeed > 0) {
        let movePixelAmountForOneSeconds = self.autoScrollSpeed * CGFloat(DeviceInfo.getPixelPerInch()) * 0.1 / kCentimeterOf1Inch
        let movePointForOneSeconds = movePixelAmountForOneSeconds / UIScreen.main.scale
        let movePointAmountForTimerInterval = movePointForOneSeconds * kAutoScrollDefaultTimerInterval
        let floorMovePointAmountForTimerInterval = floor(movePointAmountForTimerInterval)
        if floorMovePointAmountForTimerInterval < 1 {
            self.movePointAmountForTimerInterval = 1
        } else {
            self.movePointAmountForTimerInterval = floorMovePointAmountForTimerInterval
        }
        self.timerInterval = self.movePointAmountForTimerInterval / movePointForOneSeconds
    }

    startAutoScroll()
}
```
- Hàm [getPixelPerInch()](https://github.com/oNguyenDucHuyB/AutoscrollCollectionView/blob/autoscroll_collectionview/AutoscrollCollectionView/AutoscrollCollectionView/DeviceInfo.swift): Hàm lấy số lượng pixel trên inch. Với mỗi loại iphone khác nhau có kích thước màn hình khác nhau thì số lượng pixel trên inch cũng là khác nhau.
- **movePixelAmountForOneSeconds:** Số lượng pixel di chuyển trên một giây.

![](https://images.viblo.asia/91c94637-4457-4b2b-9b91-4f48de04beb9.png)

- **UIScreen.main.scale:** Giá trị này phản ánh hệ số tỷ lệ cần thiết để chuyển đổi từ tọa độ không gian logic mặc định sang tọa độ không gian thiết bị của màn hình này. Tọa độ logic mặc định được đo bằng đơn vị Point. Đối với màn hình Retina, hệ số tỷ lệ có thể là 3.0 hoặc 2.0 và một Point có thể được biểu thị bằng 9 hoặc 4 Pixel tương ứng. Đối với màn hình độ phân giải tiêu chuẩn, hệ số tỷ lệ là 1.0 và một Point bằng một Pixel.
- **movePointForOneSeconds:** Số lượng Point di chuyển trên một giây.
- **movePointAmountForTimerInterval:** Số lượng Point di chuyển trên một khoảng thời gian nhất định.
- Hàm **floor:** Làm tròn xuống bất kỳ số nào có giá trị thập phân tới số nguyên nhỏ hơn tiếp theo.
```
private func startAutoScroll() {
    if self.timer.isValid {
        return
    }

    if self.autoScrollSpeed == 0 {
        self.stopAutoScroll()
    } else {
        self.timer = Timer.scheduledTimer(timeInterval: TimeInterval(self.timerInterval),
                                          target: self,
                                          selector: #selector(timerDidFire),
                                          userInfo: nil,
                                          repeats: true)
    }
}
```
Ta setting **timer** với schedule là sau một khoảng thời gian **timerInterval** thì collection view sẽ di chuyển một khoảng là **movePointAmountForTimerInterval** và chu kỳ sẽ lặp lại liên tục => giá trị **contentOffset** sẽ được cộng thêm một khoảng là **movePointAmountForTimerInterval**.
```
@objc
private func timerDidFire() {
    let nextContentOffset = CGPoint(x: self.dishesCollectionView.contentOffset.x + self.movePointAmountForTimerInterval,
                                    y: self.dishesCollectionView.contentOffset.y)
    self.dishesCollectionView.contentOffset = nextContentOffset
}
```
```
private func stopAutoScroll() {
    if self.timer.isValid {
        self.timer.invalidate()
    }
}
```

## Bước 3: Cài đặt tốc độ auto scroll của collection view
Ta setting tốc độ của **auto scroll** với giá trị là 30 mm/s.

```
private func config() {
    // Initial Data
    // CollectionView's Layout
    // CollectionView's Settings

    setAutoScrollSpeed(30)
}
```

## Kết quả:

![alt](https://media.giphy.com/media/QYosDzq0UqTT0AZC9Q/giphy.gif)

## Link github: 
https://github.com/oNguyenDucHuyB/AutoscrollCollectionView/tree/autoscroll_collectionview