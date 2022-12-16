Bài viết lần này của mình sẽ về cách tạo một trình chơi nhạc đơn giản bằng ngôn ngữ Swift sử dụng AVKit của IOS.  Nếu như đơn giản nhất để play một video bằng AVKit, chúng ta chỉ cần kéo AVKit Player ViewController trong storyboard hoặc create bằng code.
![](https://images.viblo.asia/3e6379c2-e75d-46da-a245-5476726fa6a5.png)

Nhưng tất nhiên trong bài viết này, mục đích không chỉ là play một video từ local hoặc từ url trên web, mà  là custom và control  được nó. Hãy bắt đầu với Storyboard, đây sẽ là giao diện chơi nhạc mới của chúng ta, phần `playerView` sẽ là phần hiển thị video layer, các phần control hay minimize, chỉnh speed rate là các component bình thường được đặt lên trên `playerView`

![](https://images.viblo.asia/9a0ef81b-4cf7-4fa3-a319-df9633c5891d.png)

Sau khi đã có giao diện, bây giờ chúng ta sẽ tạo một class để quản lý và chơi nhạc cũng như play video. Chúng ta sẽ tạo một `Singleton` để quản lý player và item của nó, việc để thành singleton sẽ giúp việc giữ lại `AVPlayer` mà không phụ thuộc vào các view controller, điều này sẽ khiến khi chúng ta minimize palyer mà vẫn có thể play nhạc như bình thường.

![](https://images.viblo.asia/6c7cecd4-2980-4594-a272-10adc9c7f3fd.png)

```
struct Track {
    var playerItem: AVPlayerItem
    var index: Int
    var state: TrackState

    init(url: URL, index: Int) {
        let asset = AVURLAsset(url: url)
        let item = AVPlayerItem(asset: asset)
        playerItem = item
        self.index = index
        self.state = .loading
    }
}
```
Hãy nói đến các thành phần, đầu tiên AVURLAsset sẽ biểu diễn các thông tin của file (ví dụ như duration của track), AVPlayerItem sẽ giữ các trạng thái của item đó (ví dụ như readyToPlay, Bufferring, ... ), AVPlayer sẽ giúp chúng ta play hay control các item, AVPlayerLayer sẽ là phần layer hiển thị khi chúng ta play video, chúng ta chỉ cần dùng `playerView` ở phía trên addSubLayer/InsertSubLayer là có thể hiển thị được.
Ở đây mình không khởi tạo `AVPlayer(playerItem: )` mà tạo một `AVPlayer()` rồi dùng function `replacePlayerItem` của nó. Bởi lẽ khi dùng hàm khởi tạo cùng một `playerItem` thì AVPlayer sẽ set up cho chúng ta một playback pipeline để play audioaudio, đến khi chúng ta lại set up player layer thì lúc này nó mới lại reconfig  lại để play cả video. Nên thay vì vậy chúng ta sẽ tạo một AVPlayer() rồi set up layer để nó có thể config đúng từ lần đầu, việc này sẽ giúp tối ưu hơn khi làm việc với avPlayer.
Ở function prepare có nói gọi đến function start/stop Observer, AVPlayer cung cấp cho chúng ta các observer để có thể quan sát và control.

![](https://images.viblo.asia/5e61f5c8-8090-41d7-9f72-2deea3e81178.png)

Rất nhiều người có thể sau khi config AVPlayer sẽ gọi luôn function `play()` để play luôn nhưng việc này chưa đúng lắm, vì khi chúng ta gọi function đó thì AVPlayer chưa có thể play nó ngay lập tức được, AVPlayer cần thời gian để load buffer để play. AVPlayer cung cấp cho chúng ta 2 cơ chế một là KVO để có thể quan sát trạng thái của playback, ở đây mình quan sát `AVPlayerItem.Status` để quan sát thời điểm thực sự mà item có thể play được. Trạng thái của Item sẽ chuyển từ BufferEmpty rồi đến BufferLikeKeepUp hoặc là Buffer đã đầy rồi mới `readyToPlay` - đây là thời điểm thích hợp để chúng ta replay. Vì là  `Singleton` nên mình để việc implement việc quan sát ở viewController thực tế đang play nó. Một cơ chế observer nữa để giúp quan sát thời gian đang play của Player `addPeriodicTimeObserver`, observer này trả về luôn closure để mình handle, nhưng vì là Singleton nên mình sẽ uỷ quyền lại việc thực hiện update hiển thị UI cho viewController thực tế đang play.
Một việc rất quan trọng nữa là đã startObserver thì phải stopObserver khi không cần nữa, việc không stopObserver sẽ dẫn đến việc player có thể play các item chồng đè lên nhau.

Bây giờ chúng ta sẽ implement việc thực hiện cập nhật các hiển thị UI ở ViewController 

![](https://images.viblo.asia/4fdf3180-18db-41ed-83f4-c16860ae5fe9.png)

![](https://images.viblo.asia/b1853616-d7cf-4675-8198-f98f1c43405a.png)

Về các control như next hay previous thì chúng ta cũng sẽ dùng function `replacePlayerItem` như lúc khởi tạo. Sau khi có thể handle các control action ở VideoPlayerViewController thì giờ chúng ta sẽ làm đến chức năng minimize. Khi minimize chúng ta sẽ dismiss ViewController hiện tại và hiểu nó nó ở một góc ở ViewController cha. Lưu ý cần stopObserver khi deinit nhé.
```
deinit {
        PlayerManager.shared.stopObserver(forController: self)
    }
```
Chúng ta đã để một Singleton giữ AVPlayer nên khi dismiss ViewController cũ, AVPlayer vẫn tồn tại và play như bình thường, nên ở ViewController khi dismiss hiện ra, sẽ tạo một view nhỏ để hứng layer của AVPlayer, và thêm Gesture để khi bấm vào sẽ mở lại full màn hình. Vì view này mình không muốn control gì nên sẽ implement các observer ở đây. Storyboard sẽ như thế này:

![](https://images.viblo.asia/f77429ef-f11e-4912-b845-f7a1e32a3d76.png)

Còn khi dismiss, chúng ta sẽ bắn một delegate về ViewController cha, và add lại sublayer. 

![](https://images.viblo.asia/e16af83a-db1d-4f6b-beef-b51a8cfa91ee.png)

Và đây là thành quả :slightly_smiling_face: :

{@embed: https://vimeo.com/322707170}

Đây là một số phần cơ bản để handle AVPlayer, từ đây chúng ta có thể custom được một trình xem video theo ý mình.
Source code demo mọi người có thể tham khảo :pray: :pray: : https://github.com/oCanKhacNguyen/videoPlayerDemo