Xin chào các bạn, bài viết này mình sẽ hướng dẫn các bạn sử dụng UIProgressView làm thanh tiến trình video trong ứng dụng ios. Và một số vấn về cũng như cách giải quyết mà mình đã gặp phải khi thực hiện nó. 
Đầu tiên, các bạn hãy tạo mới một project và xây dựng các thành phần cơ bản như sau:

# Khởi tạo UI

![](https://images.viblo.asia/65b9cdcc-1920-4201-af8d-d90d2d259c27.png)
![](https://images.viblo.asia/08c67f6b-5104-4cb2-8088-231b7649a318.png)

Đó là gồm một UIProgressView để làm thanh tiến trình, một UIView để sau đó chúng ta thêm một AVPlayer vào đó.

Tham chiếu các IBOutlet vào ViewController:

```
import UIKit
import AVFoundation

class ViewController: UIViewController {

    @IBOutlet private weak var progressView: UIProgressView!
    @IBOutlet private weak var playerHolder: UIView!
    private var player: AVPlayer?
    private var avplayerLayer: AVPlayerLayer!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
    }
```

# Import video
Và tất nhiên rồi, chúng ta cần một video để phát và các bạn có thể tải từ trên mạng, hoặc tham khảo ở [đây](https://www.sample-videos.com/)
Lưu ý là hãy chọn video có độ dài vừa phải để dễ dàng thực hiện nhé.

Sau khi tải xong, hãy kéo nó vào project của bạn:

![](https://images.viblo.asia/67aa54bb-bcdf-42ea-880a-f464930099d7.png)

# Thực hiện phát video trên app
Nó khá giống với việc đi tạo trình phát video. Và quả thực đúng là như vậy :D, chúng ta sẽ lấy video mà vừa import vào, đưa lên app để trình chiếu. Code cụ thể như sau:

```

override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        setUpPlayer()
        
    }

private func setUpPlayer() {
        avplayerLayer = AVPlayerLayer.init()
        avplayerLayer.frame = playerHolder.bounds
        playerHolder.layer.addSublayer(avplayerLayer)
        avplayerLayer.videoGravity = .resizeAspectFill
        
        guard let videoURL = Bundle.main.url(forResource: "SampleVideo", withExtension: "mp4") else {return}
        player = AVPlayer.init()
        let playItem = AVPlayerItem.init(url: videoURL)
        player?.replaceCurrentItem(with: playItem)
        avplayerLayer.player = player
        
        player?.play()
    }
```

Thử build và run project, chúng ta sẽ có kết quả như sau:

![](https://images.viblo.asia/f8719f5c-dcf6-4eb0-8d72-554a5530256a.png)


Video đã lên sóng. Nếu chưa thể play, các bạn hãy kiểm tra lại phần tên video ở videoURL đưa vào đã đúng hay chưa nhé (cả định dạng nữa)

Và sau đây sẽ là 2 cách, cũng như ưu nhược điểm của chúng để làm thanh tiến trình với UIProgress.


## Sử dụng UIView.animate để thực hiện

Cách này rất đơn giản, bạn chỉ việc dùng UIView.animate để thực hiện :

```

override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        setUpPlayer()
        trackingProgress()
    }

private func trackingProgress() {
        if let duration = self.player?.currentItem?.asset.duration {
            let duration = CMTimeGetSeconds(duration)
            DispatchQueue.main.async {
                self.progressView.subviews.forEach { $0.layer.removeAllAnimations() }
                self.progressView.progress = 0
                UIView.animate(withDuration: duration, animations: { [unowned self] in
                    self.progressView.setProgress(1.0, animated: true)
                })
            }
        }
    }
```

![](https://images.viblo.asia/a1bb3989-e944-4375-8d6d-fa76477889cf.png)


### Ưu điểm:
Animation chạy mượt, cách làm đơn giản

### Nhược điểm: 
Đối với các trường hợp như app chaỵ background thì không thể xử lí dừng lại được. Mà khi đó chúng ta phải dùng UIViewPropertyAnimator để xử lí.
Chỉ có thể nhận sự kiện khi animation đã kết thúc

# Sử dụng Timer

Dùng timer để cập nhật liên tục giá trị của UIProgress, thường là 1 giây nhưng cũng có thể thấp hơn.

```
private func trackingProgress() {
        _ = Timer.scheduledTimer(timeInterval: 1,
                                 target: self,
                                 selector: #selector(updateProgress(timer:)),
                                 userInfo: nil,
                                 repeats: true)
    }
    
    @objc private func updateProgress(timer: Timer) {
        progressView.progress = player?.currentItem?.currentTime()/player?.currentItem?.duration
    }
```

Kết quả vẫn rất đẹp và chính xác:

![](https://images.viblo.asia/a1bb3989-e944-4375-8d6d-fa76477889cf.png)


### Ưu điểm:
Có thể dừng lại hoặc completion ở bất cứ lúc nào trong quá trình tracking.

### Nhược điểm:
Không thể mượt như animation, đối với video càng ngắn, thể hiện càng rõ.
Code phải update liên tục nên gây tiêu tốn tài nguyên hơn cách sử dụng UIView.animated

# Kết luận
Cả 2 cách dùng Timer và UIView.animated đều có thể dùng để hỗ trợ việc tạo thanh tiến trình cho video player, tuy nhiên chúng đều có ưu và nhược điểm riêng. Đối với từng trường hợp cụ thể mà ta áp dụng để đạt được kết quả như mong muốn.

Cám ơn các bạn đã đọc bài viết của mình. Hi vọng nó sẽ giúp ích cho các bạn. Hẹn gặp lại các bạn ở các bài viết tiếp theo !