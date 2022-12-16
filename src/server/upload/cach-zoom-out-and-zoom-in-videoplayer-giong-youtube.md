**I. Mở bài**

Chào các bạn thân yêu. Chúng ta lại gặp lại nhau trong thời tiết giao mùa mát mẻ, thời tiết này code tít phải biết các bạn nhỉ :)).
Câu chuyện là tôi có ông bạn cấp 3. Suốt ngày chỉ biết đi phượt, nó điên đến nỗi đi xe máy từ Bắc vào Nam chỉ vì cái đam mê. Đi đâu nó cũng quay 
video rồi lại up lên Youtube. Được cái nó đầu tư trang thiết bị cũng "xịn" nên videos rất chất lượng. Đợt xả lũ Hoà Bình vừa rồi nó còn đứng cạnh 
dòng lũ để quay. Rồi nó cũng nghĩ cách để thương mại hoá công sức nó bỏ ra. Nó có nhờ tôi định làm một app rồi bán content, nhưng nghĩ đi nghĩ lại 
nó vẫn quyết định up lên youtube free thôi :)). Làm mình đang làm dở lại phải bỏ và trong app này tôi có tìm hiểu một skill khá đơn giản nhưng cũng thú vị muốn chia sẻ với các bạn. Đó là cách zoom in , zoom out videoplayer giống app youtube mà chúng ta hay dùng. Nào lan man quá nhiều rồi, chúng ta start nha. 

**II. Implement**

Tôi xin đốt cháy giai đoạn và show UI màn hình gồm: 
- 1 là videoPlayer ( ở đây tôi sử dụng YouTubePlayerView là YouTubePlayer-Swift lib dùng để play link từ api của youtube). Các bạn có thể dùng AVPlayer nếu show video thông thường chúng ta hay làm. 2 cái này bản chất như nhau và có thể custom layout theo ý muốn. 
- 2 là list các videos liên quan. 

![](https://images.viblo.asia/c988680e-9493-434a-bd13-5eda58332382.png)

Và đề bài ra là zoom videoPlayer kia nhỏ lại ở góc màn hình để chọn được các videos khác ở màn hình Home như ảnh này :

![](https://images.viblo.asia/5cdd8bd5-77ef-418d-b40d-b46e4fa386e7.png)

Để zoom in hoặc zoom out tôi chọn UIPanGestureRecognizer. Chắc điều này các bạn cũng đã khó rõ và bây giờ bắt đầu các bước cần làm nào.

Bước 1: Chúng ta tạo 2 enum. 1 là để xác định trạng thái của VideoPlayer, 1 enum để điều hướng
```
enum StateVideoPlayer {
    case minimized
    case fullScreen
    case hidden
}
enum Direction {
    case up
    case down
    case right
    case left
    case none
} 
```

Bước 2: Khởi tạo p
Bước 2: Khởi tạo UIPanGestureRecognizer với target và action, add gestureRecognizer cho VideoPlayer 
```
let panGesture: UIPanGestureRecognizer = UIPanGestureRecognizer.init(target: self, action: #selector(self.minimizeGesture(_:)))
videosPlayer.addGestureRecognizer(panGesture)
```

Bước 3: Code xử lý trong func selector của panGesture
Như chúng ta đã biết thì UIPanGestureRecognizer có 6 state nhưng ở đây tôi chỉ cần dùng 2 state để xử lý đó là: began và ended
Mục đích ở func này là để xác định user đang muốn di chuyển VideoPlayer theo hướng nào và VideoPlayer đang ở trạng thái nào với 2 enum đã tạo ở bước 1
Sau đó ta sẽ lấy velocity để thay đổi frame của VideoPlayer là ok. Tôi đã xử lý như sau:

Tạo 1 hàm với input là translation và state của VideoPlayer. Hàm nay để thay đổi toạ độ cho VideoPlayer
```
    func positionDuringSwipe(translation: CGFloat, toState: StateVideoPlayer) {
        let width = UIScreen.main.bounds.width * 0.5 * translation
        let height = width * 9 / 16
        let x = (UIScreen.main.bounds.width - 10) * translation - width
        let y = (UIScreen.main.bounds.height - 10) * translation - height
        let coordinate = CGPoint.init(x: x, y: y)
        switch toState {
        case .fullScreen:
            self.view.frame.origin = coordinate
        case .hidden:
            self.view.frame.origin.x = UIScreen.main.bounds.width/2 + translation - 10
        case .minimized:
            self.view.frame.origin = coordinate
        }
    }
```

   
Có thông số hơi khó hiểu ở đây là 9/16 tôi có giải thích 1 chút. 
Thường khi layout cho 1 videoplayer ta thường để tỷ lệ width , height là 16 : 9 (Là tỷ lệ chuẩn để hiển thị video, các bạn có thể search tỷ lệ này ở google để hiểu rõ và sâu hơn).

Tiếp theo tạo 1 hàm với input là scaleFactor. Hàm này để thay đổi transform cho VideoPlayer 
 ```
func changeValues(scaleFactor: CGFloat) {
        self.tableView.alpha = 1 - scaleFactor
        let scale = CGAffineTransform.init(scaleX: (1 - 0.5 * scaleFactor), y: (1 - 0.5 * scaleFactor))
        let transform = scale.concatenating(CGAffineTransform.init(translationX: -(self.videosPlayer.bounds.width / 4 * scaleFactor), y: -(self.videosPlayer.bounds.height / 4 * scaleFactor)))
        self.videosPlayer.transform = transform
    }
```

Giờ là func selector của UIPanGestureRecognizer sẽ quyết định được bài toán của chúng ta. 

 ```
@objc fileprivate func minimizeGesture(_ sender: UIPanGestureRecognizer) {
        if sender.state == .began {
            let velocity = sender.velocity(in: nil)
            let vecX = velocity.x
            let vecY = velocity.y
            if vecX > 0 && vecY > 0 {
                self.direction = .down
            } else if vecX < 0 && vecY < 0 {
                self.direction = .up
            } else if vecX < 0 && vecY >= 0 {
                self.direction = .left
            } else if vecX > 0 && vecY <= 0 {
                self.direction = .right
            }
        }

        var finalState = StateVideoPlayer.fullScreen
        switch self.state {
        case .fullScreen:
            let factor = (abs(sender.translation(in: nil).y) / UIScreen.main.bounds.height)
            self.changeValues(scaleFactor: factor)
            self.positionDuringSwipe(translation: factor, toState: .minimized)
            finalState = .minimized
        case .minimized:
            if self.direction == .left || self.direction == .right {
                finalState = .hidden
                let factor: CGFloat = sender.translation(in: nil).x
                self.positionDuringSwipe(translation: factor, toState: .hidden)
            } else {
                finalState = .fullScreen
                let factor = 1 - (abs(sender.translation(in: nil).y) / UIScreen.main.bounds.height)
                self.changeValues(scaleFactor: factor)
                self.positionDuringSwipe(translation: factor, toState: .fullScreen)
            }
        default: break
        }

        if sender.state == .ended {
            self.state = finalState
            self.animate()
            self.delegate?.didEndedSwipe(toState: self.state, direction: self.direction)
            if self.state == .hidden {
                self.videosPlayer.pause()
            }
        }
    }
```

**III. See you again** 

Vậy là đã xong các bước. Hãy build và thử nhé. Nếu có gì chưa hiểu hay comment mình sẽ giải thích. Chúc các bạn có một ngày làm việc vui vẻ.