Trong bài này mình sẽ hướng dẫn các bạn sử dụng AVPlayer để play 1 video mp4. Lưu ý là khi test link các bạn nên dùng link https, còn nếu các bạn dùng link http thì cần phải thêm mã vào file plist ([link](https://stackoverflow.com/questions/31254725/transport-security-has-blocked-a-cleartext-http))

## Let’s get started

### Video URL

Điều đầu tiên và quan trọng nhất mà chúng ta cần là một URL video. URL có thể là URL online hoặc là URL đại diện cho đường dẫn đến video bên trong bundle app.
```
let url = URL(string: “https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4")
```

## Video Playback with AVPlayer

Để tạo video player, chúng tôi sẽ sử dụng [AVFoundation](https://developer.apple.com/documentation/avfoundation)’s AVPlayer object.

[AVPlayer](https://developer.apple.com/documentation/avfoundation/avplayer) - AVPlayer là một controller object được sử dụng để play và quản lí thời gian của media asset. Bạn có thể sử dụng AVPlayer để play local hoặc remote, chẳng hạn như file QuickTime movie và file âm thanh MP3, cũng như các media được cung cấp bằng HTTP Live Streaming.

```
let asset = AVAsset(url: url)
let playerItem = AVPlayerItem(asset: asset)
let player = AVPlayer(playerItem: playerItem)
```

Giải thích:

Dòng 1 - AVAsset object được tạo bằng URL video. Một AVAsset object sẽ đại diện cho media sẽ được play.

Dòng 2 - AVPlayerItem object được tạo bằng AVAsset object. Nó mô hình hóa trạng thái thời gian và trình bày của một tài sản được chơi bởi player.

Dòng 3 - AVPlayer object được tạo bằng AVPlayerItem object.

## Adding AVPlayer to AVPlayerLayer

Bây giờ chúng ta đã có AVPlayer object của mình, tiếp theo là hiển thị nó trên màn hình, tức là thêm nó vào viewControler hoặc một view nào đó.

AVPlayerLayer - Một CALayer mà AVPlayer hiển thị cho output của nó.

```
let playerLayer = AVPlayerLayer(player: player)
playerLayer.frame = self.videoView.bounds //bounds of the view in which AVPlayer should be displayed
playerLayer.videoGravity = .resizeAspect
```

Giải thích:

Dòng 1 - một AVPlayerLayer object được tạo bằng AVPlayer object được khởi tạo trước đó.

Dòng 2 - frame của playerLayer được set theo view mà chúng ta muốn video được hiển thị.

Dòng 3 - set *videoGravity* của *playerLayer* theo yêu cầu (tùy chọn).

videoGravity - xác định cách video sẽ được hiển thị trong *bound* của *playerLayer*. Giá trị của nó có thể là:

**resizeAspect** - Player sẽ duy trì tỷ lệ khung hình Video và phù hợp với video trong bound của layer.

**resizeAspectFill** - Player nên duy trì tỷ lệ khung hình của video và phóng đầy vào bound của layer.

**resize** - Video phải chỉnh lại cho phù hợp với bound của layer.

Vì PlayerLayer là một CALayer nên nó sẽ hoạt động giống hệt như một layer bình thường. Chúng ta cần thêm playerLayer vào một lớp view để nó hiển thị trên màn hình. 

Vì vậy, ở đây chúng ta sẽ dùng:

```
self.videoView.layer.addSublayer(player)
```

videoView chỉ là một UIView trong đó chúng ta sẽ thêm player của mình.

## Play video in AVPlayer

Cho đến bây giờ, chúng tôi đã thêm thành công player vào view của chúng tôi. Nhưng chỉ đơn giản là thêm player vào view và tất nhiên là nó sẽ không giúp chúng ta phát video.

AVPlayer có 2 phương pháp rất đơn giản để play và pause video.

**play ()** - Bắt đầu play mục hiện tại.

**pause ()** - Tạm dừng mục hiện tại.

Hiện tại, chúng tôi chỉ cần phát video trong player.

```
player.play()
```

Tổng hợp code để các bạn dễ theo dõi:

```
//1. Create a URL
if let url = URL(string: "https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4") {
    //2. Create AVPlayer object
    let asset = AVAsset(url: url)
    let playerItem = AVPlayerItem(asset: asset)
    let player = AVPlayer(playerItem: playerItem)
    
    //3. Create AVPlayerLayer object
    let playerLayer = AVPlayerLayer(player: player)
    playerLayer.frame = self.videoView.bounds //bounds of the view in which AVPlayer should be displayed
    playerLayer.videoGravity = .resizeAspect
    
    //4. Add playerLayer to view's layer
    self.videoView.layer.addSublayer(playerLayer)
    
    //5. Play Video
    player.play()
}
```

Lưu ý: Một điều nữa, đừng quên **import** **AVFoundation** trong file bạn dùng AVPlayer. Tất cả các class mà chúng ta đã sử dụng là của AVFoundation framework.

## Playback Controls

Bây giờ chúng tôi đã làm cho player của chúng tôi hoạt động, một điều tất cả chúng ta phải chú ý - hiện tại vẫn chưa có tùy chọn nào để tạm dừng video khi video bắt đầu play. 

Chúng ta cũng không thể tắt tiếng, cũng không tua nhanh hoặc tua lại. Nói tóm lại, AVPlayer không có kèm theo các điều khiển phát lại mặc định.

Nếu họ không cung cấp nó, chúng ta sẽ tạo ra các điều khiển riêng. Và điều đó, cũng theo UI tùy chỉnh của chúng ta.

Chúng ta sẽ tạo các control sau để quản lý play video.

1. Play/Pause

2. Mute/Un-mute video

3. Forward/Rewind

4. Track video progress

5. Playing multiple videos in a queue

6. Tracking video play status

7. Replay video

Tất nhiên, bạn cần tạo UI của riêng mình để hỗ trợ các điều khiển play. Tham khảo hình minh họa dưới đây.

![](https://images.viblo.asia/81d69c23-1ff0-4633-967c-82ac07b1c627.png)

### Play/Pause

Đây là cách đơn giản nhất để thực hiện. Như chúng tôi đã nói, các phương thức play () và pause () của AVPlayer có thể được sử dụng cho mục đích này.

```
public func playVideo() {
    player?.play()
}

public func pauseVideo() {
    player?.pause()
}
```

### Mute/Un-mute video

Thuộc tính isMuted của AVPlayer có thể được sử dụng để làm việc này.

**isMuting** - Giá trị Boolean cho biết đầu ra âm thanh của player có bị tắt tiếng hay không.

Đặt giá trị của nó thành true / false thành có tiếng / tắt tiếng .

```
player?.isMuted = true
```

### Fast-Forward/Rewind video

Tua lại (Rewinding) và chuyển tiếp nhanh (fast-forwarding) một video playback chỉ đơn giản là - thay đổi thời gian phát lại hiện tại, giảm hoặc thêm vào nó.

AVPlayer cung cấp nhiều phương thức tìm kiếm để quản lý thời gian trong phát lại video. Bạn có thể tìm nó ở [đây](https://developer.apple.com/documentation/avfoundation/avplayer). 

Chúng tôi sẽ sử dụng hàm sau để làm điều này:

**seek(to:)**  - Đặt thời gian play hiện tại thành thời gian đã chỉ định.

```
func rewindVideo(by seconds: Float64) {
    if let currentTime = player?.currentTime() {
        var newTime = CMTimeGetSeconds(currentTime) - seconds
        if newTime <= 0 {
            newTime = 0
        }
        player?.seek(to: CMTime(value: CMTimeValue(newTime * 1000), timescale: 1000))
    }
}

func forwardVideo(by seconds: Float64) {
    if let currentTime = player?.currentTime(), let duration = player?.currentItem?.duration {
        var newTime = CMTimeGetSeconds(currentTime) + seconds
        if newTime >= CMTimeGetSeconds(duration) {
            newTime = CMTimeGetSeconds(duration)
        }
        player?.seek(to: CMTime(value: CMTimeValue(newTime * 1000), timescale: 1000))
    }
}
```

Giải thích:

**currentTime ()**- Trả về thời gian hiện tại của player item hiện tại.

**Dòng 1 đến 9** - tua lại phát lại trong một giây nhất định với giới hạn 0 giây.

**Các dòng từ 11 đến 19** Tua nhanh player item với giới hạn tổng thời lượng của item.

### Tracking video progress

Chúng tôi có thể theo dõi video playback với AVPlayer’s **periodic time observer**.

**addPeriodicTimeObserver (forInterval: queue: using :)** - Yêu cầu gọi định kỳ một block nhất định trong khi play video để báo cáo thời gian thay đổi.
```
player.addPeriodicTimeObserver(forInterval: CMTime(seconds: 1, preferredTimescale: 2), queue: DispatchQueue.main) {[weak self] (progressTime) in
    if let duration = player.currentItem?.duration {
        
        let durationSeconds = CMTimeGetSeconds(duration)
        let seconds = CMTimeGetSeconds(progressTime)
        let progress = Float(seconds/durationSeconds)
        
        DispatchQueue.main.async {
            self?.progressBar.progress = progress
            if progress >= 1.0 {
                self?.progressBar.progress = 0.0
            }
        }
    }
}
```

Trong đoạn mã trên, chúng tôi đã thêm **observer** cho player. Observer này sẽ được gọi sau mỗi 0,5 giây (CMTime (giây: 1, preferTimescale: 2)).

CMTime - Một struct đại diện cho một giá trị thời gian như dấu thời gian hoặc thời lượng. Bạn có thể tham khảo liên kết [này](https://stackoverflow.com/questions/12902410/trying-to-understand-cmtime/13001917#13001917) để hiểu cách thức thực sự hoạt động.

**Dòng 2 đến 6** - Phần trăm tiến độ được tính bằng tổng thời lượng và thời lượng hiện tại.

**Dòng 9 đến 11** -  UIProgressView được sử dụng để hiển thị tiến trình phát lại trên UI.

### Playing videos in a Queue — Playlist

Có một hạn chế với AVPlayer. Nó chỉ có thể được sử dụng để phát một video duy nhất, tức là không có hàm init nào nhận nhiều *AVPlayerItems*.

**AVQueuePlayer** là giải pháp mà chúng tôi sẽ sử dụng để phát tất cả các video trong danh sách phát của chúng tôi.

AVQueuePlayer - Một player được sử dụng để player một số item theo trình tự. 

AVQueuePlayer cũng là một AVPlayer với các tính năng bổ sung. Nó có thể nhận một mảng AVPlayerItem.

init (items :) - Tạo một queue player với các player item đã chỉ định.
```
let urls = [URL]()
//Add items to urls array
var playerItems = [AVPlayerItem]()

urls.forEach { (url) in
    let asset = AVAsset(url: url)
    let playerItem = AVPlayerItem(asset: asset)
    playerItems.append(playerItem)
}

let player = AVQueuePlayer(items: playerItems)
```

Thực hiện theo các bước tương tự như AVPlayer, tức là thêm nó vào playerLayer và sau đó gọi play () trên đó.

## Tracking video play status

Trong suốt thời gian hoàn thành, playback có thể ở nhiều trạng thái, tức là có thể playing hoặc pause tại một thời điểm nào đó hoặc có thể vẫn được buffer trong một khoảng thời gian cụ thể. Chúng ta phải theo dõi tất cả các trạng thái này để có thể cập nhập UI phù hợp. Ví dụ: chúng ta có thể sử dụng một loading view để hiển thị trạng thái cho user biết là đang cần load thêm buffer.

AVPlayer’s **timeControlStatus**  có thể được sử dụng để theo dõi trạng thái play video.

*timeControlStatus* - Trạng thái cho biết liệu quá trình playback đang trong trạng thái progress, paused vô thời hạn hoặc bị suspended trong khi chờ điều kiện mạng thích hợp.

Nó chấp nhận một giá trị của loại AVPlayer.TimeControlStatus i.e.

1. *paused* - player bị paused.

2. *waitingToPlayAtSpecifiedRate* - Player đang ở trạng thái chờ do bộ đệm trống hoặc bộ đệm không đủ.

3. *playing* - Player hiện đang play một media item.

**timeControlStatus is observable using Key-value observing.**

Vì nó là một observable property, chúng tôi có thể register một observer và theo dõi bất kỳ thay đổi nào được thực hiện trong giá trị của nó.
```
player.addObserver(self, forKeyPath: “timeControlStatus”, options: [.old, .new], context: nil)
```

Trong đoạn code trên, chúng tôi đang theo dõi giá trị cũ cũng như giá trị mới của *timeControlStatus*.

Chúng ta có thể quan sát những thay đổi được thực hiện trong *NSKeyValueObserving*,  phương thức **observeValue(forKeyPath:of:change:context:)** . 

Bất kỳ class nào kế thừa từ **NSObject** đều có sẵn phương thức này,

ví dụ: bất kỳ thứ gì thuộc loại *UIView*, v.v. Bạn chỉ cần ghi đè lên nó trong lớp của mình.

**NSObject** cung cấp triển khai protocol *NSKeyValueObserving* cung cấp khả năng observe tự động cho tất cả các object.

```
override public func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) {
    if keyPath == "timeControlStatus", let change = change, let newValue = change[NSKeyValueChangeKey.newKey] as? Int, let oldValue = change[NSKeyValueChangeKey.oldKey] as? Int {
        let oldStatus = AVPlayer.TimeControlStatus(rawValue: oldValue)
        let newStatus = AVPlayer.TimeControlStatus(rawValue: newValue)
        if newStatus != oldStatus { //5
            DispatchQueue.main.async {[weak self] in
                if newStatus == .playing || newStatus == .paused {
                    self?.loaderView.isHidden = true
                } else {
                    self?.loaderView.isHidden = false
                }
            }
        }
    }
}
```

Trong đoạn code trên, chúng tôi đang sử dụng **newValue** của **timeControlStatus** để show / hide loader (ví dụ: UIActivityIndicatorView). Loading view bị hidden trong trường hợp video đang play / pause và hiển thị khi video vẫn ở buffering state.

Dòng 5 - chúng tôi chỉ thay đổi cho những thay đổi này khi newValue khác với oldValue.

## Replay video

Để replay video sau khi play kết thúc, chúng ta có thể observe notification **AVPlayerItemDidPlayToEndTimeNotification**.

*AVPlayerItemDidPlayToEndTimeNotification* - Một thông báo được phát ra khi Item play đến thời gian kết thúc.

```
NotificationCenter.default.addObserver(self, selector: #selector(playerEndedPlaying), name: Notification.Name("AVPlayerItemDidPlayToEndTimeNotification"), object: nil)
```

Như đã thấy rõ từ đoạn code trên, phương thức **playerEndedPlaying** sẽ được gọi bất cứ khi nào quá trình play kết thúc.

```
@objc func playerEndedPlaying(_ notification: Notification) {
   DispatchQueue.main.async {[weak self] in
      player?.seek(to: kCMTimeZero)
      player?.play() //This is optional
   }
} 
```

Trong đoạn code trên, chúng tôi đang tìm kiếm thời gian phát lại để kCMTimeZero, tức là bắt đầu. Khi video được tìm đến vị trí bắt đầu, chúng tôi gọi play () trên player. Play lại là theo yêu cầu của chúng ta. 

Chúng ta có thể tránh nó chỉ trong trường hợp chúng tôi muốn nó bị tạm dừng sau khi chơi một lần.

## AVPlayerViewController

Bên cạnh AVPlayer, apple cũng đã cung cấp hỗ trợ cho bộ controller full màn hình để play video.

**AVPlayerViewController**  - Một object hiển thị nội dung video từ một player object cùng với **system-supplied playback controls**. Nó được cung cấp bởi AVKit framework.

```
class AVPlayerViewController : UIViewController
```

```
let controller = AVPlayerViewController()
controller.player = player //AVPlayer object 
self.present(controller, animated: true) {[weak self] in
   DispatchQueue.main.async {
     player?.play()
   }
}
```

Giải thích:

Dòng 1 - tạo một instance AVPlayerViewController.

Dòng 2 - gán một instance AVPlayer cho controller. Ví dụ **AVPlayer** có thể được tạo giống như cách chúng ta đã thảo luận trước đó.

Dòng 3 đến 7 - presented controller và gọi play () trên player sau khi controller được presented.

## Full Screen Mode

Chúng ta có thể sử dụng **AVPlayerViewController** để hiển thị video ở chế độ toàn màn hình khi nhấn vào nút mở rộng.

Cho đến bây giờ, chúng tôi chủ yếu sử dụng 3 class để hiển thị playback video trên screen - AVPlayer, AVPlayerLayer và AVPlayerViewController. AVPlayerLayer và AVPlayerViewController, cả hai đều sử dụng instance của **AVPlayer**.

Để hiển thị video ở chế độ toàn màn hình, chúng ta chỉ cần mở AVPlayerViewController và đồng bộ hóa tiến trình play với AVPlayerLayer. Bây giờ, có thể có 2 lựa chọn thay thế để đạt được điều đó:

1. Tạo các object **AVPlayer** khác nhau cho cả **AVPlayerLayer** và **AVPlayerViewController** và sử dụng **seek(to:)** để đồng bộ hóa tiến trình giữa chúng.

2. Tạo một cá thể **AVPlayer** duy nhất và sử dụng nó cho cả khi và khi cần. Tiến trình play được xử lý tự động trong trường hợp này vì chúng tôi sử dụng cùng một phiên bản player.

Cả hai phương pháp sẽ cho kết quả như mong đợi. Chúng tôi sẽ theo dõi thứ 2 vì nó hiệu quả hơn một chút.

```
func expandVideo()  {
    player?.pause()
    let controller = AVPlayerViewController()
    controller.player = player
    NotificationCenter.default.addObserver(self, selector: #selector(avPlayerClosed), name: Notification.Name("avPlayerDidDismiss"), object: nil)
    self.parentViewController()?.present(controller, animated: true) { in
        DispatchQueue.main.async {
            player?.play()
        }
    }
}

@objc func avPlayerClosed(_ notification: Notification) {
    DispatchQueue.main.asyncAfter(deadline: DispatchTime.now() + 0.5) { in
        player?.play()
    }
}
```

Giải thích:

Dòng 2 - **player** đã tạm dừng trước khi presenting **AVPlayerViewController**.

Dòng 3 đến 10 - presented controller và gọi play () trên player sau khi controller được presented.

Dòng 5 - đăng ký một observer cho **custom notification** *avPlayerDidDismiss*. Phương thức avPlayerCloses sẽ được gọi sau khi thông báo được kích hoạt. Apple không cung cấp bất kỳ phương thức callback / delegate nào khi AVPlayerViewController bị dismissed. Chúng ta thực sự cần điều này để play video khi controller bị dismissed. Đây là lý do chúng tôi sử dụng custom notification.

Dòng 13 đến 15 - phương thức *avPlayerClosed*. Nó sẽ play lại video với tiến trình hiện tại.

Để phát hiện sự loại bỏ của *AVPlayerViewController*, chúng tôi sẽ sử dụng phương thức *viewWillDisappear ( :)*.

```
extension AVPlayerViewController {
    open override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        self.player?.pause()
        NotificationCenter.default.post(name: Notification.Name("avPlayerDidDismiss"), object: nil, userInfo: nil)
    }
}
```

Trong đoạn code trên,

Dòng 4 - pause video trước khi controller bị dismiss

Dòng 5 - một custom notification - *avPlayerDidDismiss* được đăng trên bộ điều khiển miễn nhiệm. Chúng tôi đã thêm observer vào nó trước đó.

 Đừng quên xóa các observer (kvo and Notification Center) sau khi bạn thực hiện xong.
 
```
deinit {
    NotificationCenter.default.removeObserver(self)
    player?.removeObserver(self, forKeyPath: “timeControlStatus”)
}
```

## One last thing…

Tất cả các ứng dụng iOS có phiên âm thanh mặc định được cấu hình sẵn.

- Trong iOS, cài đặt công tắc Ring / Im lặng thành chế độ im lặng làm im lặng mọi âm thanh đang được ứng dụng phát.

- Khi ứng dụng phát âm thanh, mọi âm thanh nền khác sẽ bị tắt tiếng.

Nhưng, đó không phải là hành xử âm thanh chung mà bất kỳ phát lại phương tiện nào cũng cần phải có, tức là chúng ta phải nghe âm thanh ngay cả khi thiết bị của chúng ta ở chế độ im lặng. Ngoài ra, nếu bất kỳ ứng dụng nào khác đang phát bất kỳ âm thanh nào, nó phải bị dừng trong thời gian này.

*AVAudioSession* - Một đối tượng trung gian giao tiếp với hệ thống về cách bạn định sử dụng âm thanh trong ứng dụng của mình. Nó sẽ cấu hình âm thanh ứng dụng của chúng ta.

```
do {
    try AVAudioSession.sharedInstance().setCategory(AVAudioSessionCategoryPlayback, mode: AVAudioSessionModeDefault, options: .mixWithOthers) //For playing volume when phone is on silent
} catch {
    print(error.localizedDescription)
}
```

## Sample Project

Bạn có thể download sample project từ [đây](https://github.com/pgpt10/GPVideoPlayer).

Tôi cũng đã tạo ra một cocoapod, vì vậy bạn có thể tích hợp trình phát với các điều khiển tùy chỉnh vào dự án của bạn. Bạn có thể tìm thấy nó ở [đây](https://cocoapods.org/pods/GPVideoPlayer).

![](https://images.viblo.asia/c22a99ed-2225-4dcb-a6ad-7d556cf9f54f.gif)

Link bài gốc các bạn có thể đọc ở [đây](https://medium.com/free-code-camp/how-to-set-up-video-streaming-in-your-app-with-avplayer-7dc21bb82f3).