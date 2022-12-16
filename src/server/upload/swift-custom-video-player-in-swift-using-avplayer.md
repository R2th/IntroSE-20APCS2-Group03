### Môi trường phát triển:
- **Swift Language Version:** Swift 5
- **Xcode:** Version 12.4
- **Deployment Target:** 13.0

Apple cung cấp **AVKit framework** - cho phép developers chạy nội dung đa phương tiện bên trong app của họ. Với **AVPlayerViewController**, ta có thể sử dụng default playback controls. Tuy nhiên trong trường hợp nếu ta muốn play video theo trình phát tuỳ chỉnh (customized player), thì ta có thể sử dụng **AVPlayer** class. Trong bài viết này, ta sẽ học cách chạy video sử dụng **AVPlayer** trong Swift.

![](https://i.imgur.com/l6BbysY.jpg)

### 1. Tạo VolumeView trong swift

- **Bước 1:** Ta tạo 1 custom class kế thừa từ **MPVolumeView** và đặt tên là **CustomVolumeView**.
- **Bước 2:** Trong **CustomVolumeView.swift**,  ta override hàm init() và tạo hàm **setupView()** thực hiện thay đổi UI cho Volume View.

```
private struct Constant {
    static let icTrack = UIImage(named: "ic-track")
}

final class CustomVolumeView: MPVolumeView {
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
    }
    
    private func setupView() {
        self.showsRouteButton = false
        self.backgroundColor = .clear
        self.setVolumeThumbImage(Constant.icTrack, for: .normal)
    }
}
```

- **Bước 3:** Override hàm **volumeSliderRect()** thay đổi frame cho volume slider và tạo hàm **setupSlider()** thay đổi UI cho volume slider.

```
final class CustomVolumeView: MPVolumeView {
    
    let padding: CGFloat = 12.0
    
    private func setupView() {
        ...
        setupSlider()
    }
    
    override func volumeSliderRect(forBounds bounds: CGRect) -> CGRect {
        return CGRect(x: bounds.origin.x,
                      y: bounds.origin.y,
                      width: bounds.width - padding,
                      height: bounds.height)
    }
    
    private func setupSlider() {
        guard let slider = self.subviews.first(where: { $0 is UISlider }) as? UISlider else { return }
        slider.minimumTrackTintColor = Constant.minTrackColor
        slider.maximumTrackTintColor = Constant.maxTrackColor
    }
}
```
### 2. Tạo Playback trong swift:

- **Bước 1:** Ta tạo 1 custom class kế thừa từ UIView và đặt tên là **PlayBackView** và file xib tương ứng **PlayBackView.xib**.

![](https://images.viblo.asia/12367f12-f2e7-435b-83c8-5b450bdac80c.png)

![](https://images.viblo.asia/7086c214-7560-44c3-a347-7d057b192faf.png)

- **Bước 2:** Mở **PlayBackView.xib** và thêm lần lượt các controls sau:
    - PlayPauseButton: Thêm **width constraint** có giá trị constant = 45 | **Leading constraint** có giá trị constant = 4 đối với Safe Area | **Height constraint** = superview's height | **Center Y constraint** đối với superview.
    - AudioButton: Thêm **width constraint** có giá trị constant = 45 | **Leading constraint** có giá trị constant = 0 đối với PlayPauseButton | **Height constraint** = superview's height | **Center Y constraint** đối với superview.
    - MpVolume:  Thêm **width constraint** có giá trị constant = 80 | **Leading constraint** có giá trị constant = 0 đối với AudioButton | **Height constraint** = superview's height | **Center Y constraint** đối với superview.
    - TimeSlider: Thêm **leading constraint** có giá trị constant = 0 đối với MpVolume | **Center Y constraint** đối với superview.
    - TimeRemainingLabel: Thêm **leading constraint** có giá trị constant = 6 đối với MpVolume | **Trailing constraint** có giá trị constant = 16 đối với SafeArea | **Center Y constraint** đối với superview.

![](https://images.viblo.asia/c04d9231-8d80-485b-a9f6-b5e00ee92be6.png)

- **Bước 3:** Thêm **IBOutlet** của các view objects trong **PlayBackView.xib**

```
final class PlayBackView: UIView {
    // MARK: - Outlets
    
    @IBOutlet private var playPauseButton: UIButton!
    @IBOutlet private var audioButton: UIButton!
    @IBOutlet private var mpVolume: CustomVolumeView!
    @IBOutlet private var timeSlider: UISlider!
    @IBOutlet private var timeRemainingLabel: UILabel!
}
```

- **Bước 4:** Trong **PlayBackView.swift**, ta import **AVFoundation** framework. Tiếp theo, ta override hàm khởi tạo init() và gọi hàm **loadFromNib()** có nhiệm vụ get view từ **PlayBackView.xib**.

```
import AVFoundation 

final class PlayBackView: UIView {
    // MARK: - Outlets
    ...
    
    // MARK: - Override Methods
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        loadFromNib()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        loadFromNib()
    }
}
```

```
extension UIView {
    @discardableResult
    func loadFromNib<T: UIView>() -> T? {
        guard let contentView = Bundle(for: type(of: self)).loadNibNamed(String(describing: type(of: self)), owner: self, options: nil)?.first as? T else { return nil }
        addSubview(contentView)
        contentView.translatesAutoresizingMaskIntoConstraints = false
        contentView.topAnchor.constraint(equalTo: self.topAnchor).isActive = true
        contentView.leftAnchor.constraint(equalTo: self.leftAnchor).isActive = true
        contentView.rightAnchor.constraint(equalTo: self.rightAnchor).isActive = true
        contentView.bottomAnchor.constraint(equalTo: self.bottomAnchor).isActive = true
        return contentView
    }
}
```

- **Bước 5:** Tạo hàm thực hiện PLAY - PAUSE - REPLAY video:

```
private struct Constant {
    static let icPlay = UIImage(named: "ic-play")
    static let icPause = UIImage(named: "ic-pause")
    static let icReplay = UIImage(named: "ic-replay")
}

final class PlayBackView: UIView {
    // MARK: - Outlets
    ...
    
    // MARK: - Controls & Properties
    
    private var player: AVPlayer?
    private var isVideoFinished: Bool = false
    
    // MARK: - Override Methods
    ...
    
    // MARK: - Public Methods
    
    func config(with player: AVPlayer) {
        self.player = player
    }
}

// MARK: - Play, Pause, Replay Video

extension PlayBackView {
    func playVideo() {
        player?.play()
        playPauseButton.setImage(Constant.icPause, for: .normal)
    }
    
    func pauseVideo() {
        player?.pause()
        playPauseButton.setImage(Constant.icPlay, for: .normal)
    }
    
    func replayVideo() {
        isVideoFinished = false
        player?.seek(to: CMTime.zero, completionHandler: { [weak self] isFinished in
            self?.player?.play()
        })
        playPauseButton.setImage(Constant.icPause, for: .normal)
    }
}
```

- **Bước 6:** Xác định thời điểm video bắt đầu và kết thúc:

```
final class PlayBackView: UIView {
    // MARK: - Controls & Properties
    
    private var statusObserver: NSKeyValueObservation?
    
    // MARK: - Public Methods
    
    func config(with player: AVPlayer) {
        self.player = player
        addObservers()
    }
}
```

```
// MARK: - Observers

private extension PlayBackView {
    func addObservers() {
        // Observer player's status
        addPlayerStatusObserver()
        
        addNotificationObserver()
    }
    
    func addPlayerStatusObserver() { 
        statusObserver = player?.observe(\.status, options: .new) { [weak self] currentPlayer, _ in
            guard let self = self else { return }
            if currentPlayer.status == .readyToPlay {
                self.playPauseButton.setImage(Constant.icPause, for: .normal)
            }
        }
    }
    
    func addNotificationObserver() {
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(playerDidFinishPlaying),
                                               name: .AVPlayerItemDidPlayToEndTime,
                                               object: nil)
    }
    
    @objc func playerDidFinishPlaying() {
        isVideoFinished = true
        playPauseButton.setImage(Constant.icReplay, for: .normal)
    }
}
```

- **Bước 7:** Cập nhật giá trị của **Time Slider** và **Time Remaining Label** theo thời gian chạy của video:

```
// MARK: - Observers

private extension PlayBackView {
    func addObservers() {
        ...
        addTimeObserver()
    }
    
    func addTimeObserver() {
        let interval = CMTime(value: 1, timescale: 2)
        player?.addPeriodicTimeObserver(forInterval: interval, queue: .main, using: { [weak self] progressTime in
            self?.updateVideoPlayerState(progressTime: progressTime)
        })
    }
    
    func updateVideoPlayerState(progressTime: CMTime) {
        // Update time slider's value
        guard let duration = player?.currentItem?.duration else { return }
        timeSlider.value = Float(progressTime.seconds / duration.seconds)

        // Update time remaining label
        let timeRemaining = duration - progressTime
        guard let timeRemainingString = timeRemaining.getTimeString() else { return }
        timeRemainingLabel.text = timeRemainingString
    }
}
```

```
extension CMTime {
    func getTimeString() -> String? {
        let totalSeconds = CMTimeGetSeconds(self)
        guard !(totalSeconds.isNaN || totalSeconds.isInfinite) else {
            return nil
        }
        let hours = Int(totalSeconds / 3600)
        let minutes = Int(totalSeconds / 60) % 60
        let seconds = Int(totalSeconds.truncatingRemainder(dividingBy: 60))
        if hours > 0 {
            return String(format: "%i:%02i:%02i",arguments: [hours, minutes, seconds])
        } else {
            return String(format: "%02i:%02i", arguments: [minutes, seconds])
        }
    }
}
```

- **Bước 8:** Thực hiện tua video bằng **Time Slider**:

```
private struct Constant {
    static let icTrack = UIImage(named: "ic-track")
}

final class PlayBackView: UIView {
    // MARK: - Outlets
    ...
    
    // MARK: - Override Methods
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        loadFromNib()
        setup()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        loadFromNib()
        setup()
    }
    
    // MARK: - Private Methods
    
    private func setup() {
        timeSlider.setThumbImage(Constant.icTrack, for: .normal)
        timeSlider.addTarget(self, action: #selector(timeSliderValueChanged(_:event:)), for: .valueChanged)
    }
    
    @objc private func timeSliderValueChanged(_ sender: UISlider, event: UIEvent) {
        guard let duration = player?.currentItem?.duration else { return }
        let totalSeconds = CMTimeGetSeconds(duration)
        guard !(totalSeconds.isNaN || totalSeconds.isInfinite) else { return }
        let value = Float64(sender.value) * totalSeconds
        let seekTime = CMTime(value: CMTimeValue(value), timescale: 1)
        
        // Seek and scrub video
        if let touchEvent = event.allTouches?.first {
            switch touchEvent.phase {
            case .began:
                pauseVideo()
            case .moved:
                player?.seek(to: seekTime, toleranceBefore: .zero, toleranceAfter: .zero)
            case .ended:
                playVideo()
                isVideoFinished = false
            default:
                break
            }
        }
        
        // Update time remaining label
        let timeRemaining = duration - seekTime
        guard let timeRemainingString = timeRemaining.getTimeString() else { return }
        timeRemainingLabel.text = timeRemainingString
    }
}
```

- **Bước 9:** Thêm **IBAction** cho **PlayPauseButton** và **AudioButton**:

```
private struct Constant {
    ...
    static let icAudio = UIImage(named: "ic-audio")
    static let icNoAudio = UIImage(named: "ic-no-audio")
    static let minWidthVolumeSlider: CGFloat = 0
    static let maxWidthVolumeSlider: CGFloat = 80
}

final class PlayBackView: UIView {
// MARK: - Outlets
    
    @IBOutlet private var mpVolumeWidthConstraint: NSLayoutConstraint!
    
    // MARK: - Controls & Properties

    private var isMuted: Bool = false
    
    // MARK: - Private Methods
    ...
    
    @IBAction private func playPauseButtonTapped(_ sender: Any) {
        guard let player = player else { return }
        if player.isPlaying {
            pauseVideo()
        } else {
            if isVideoFinished {
                replayVideo()
            } else {
                playVideo()
            }
        }
    }
    
    @IBAction private func audioButtonTapped(_ sender: Any) {
        isMuted = !isMuted
        player?.isMuted = isMuted
        audioButton.setImage(isMuted ? Constant.icNoAudio : Constant.icAudio, for: .normal)
        showHideVolumeSlider()
    }
    
    private func showHideVolumeSlider() {
        mpVolume.isHidden = isMuted
        mpVolumeWidthConstraint.constant = isMuted ? Constant.minWidthVolumeSlider : Constant.maxWidthVolumeSlider
        UIView.animate(withDuration: 0.3) {
            self.layoutIfNeeded()
        }
    }
}
```

```
extension AVPlayer {
    var isPlaying: Bool {
        return rate != 0 && error == nil
    }
}
```

- **Bước 10:** Remove observers

```
final class PlayBackView: UIView {
    // MARK: - Deinit
    
    deinit {
        statusObserver?.invalidate()
        NotificationCenter.default.removeObserver(self)
    }
}
```

### 3. Tạo video player trong swift:
Đầu tiên, ta sẽ tạo 1 custom class kế thừa từ UIView và đặt tên là **VideoPlayer**.

![](https://images.viblo.asia/733a2218-2d10-4ee2-ae5d-28736dc9dc68.png)

Tiếp theo, ta cần tạo file xib cho class **VideoPlayer**.

![](https://images.viblo.asia/a7ccb1b3-47c1-473d-be15-63429789761d.png)
 
#### Các bước để tạo custom video player sử dụng AVPlayer:
- **Bước 1:** Mở **VideoPlayer.xib** và thêm lần lượt các controls sau:
    - Close button: Thêm **leading constraint** có giá trị constant = 16 đối với Safe Area | **Top constraint** có giá trị constant = 12 đối với Safe Area | **Height constraint** có giá trị constant = 32 | **Aspect ratio** giữa width và height là 1:1
    - VideoView: Set **background color** cho view là Black Color | Thêm **leading constraint** và **trailing constraint** có giá trị constant = 0 đối với Safe Area | Thêm **center Y constraint** đối với Safe Area | **Aspect ratio** giữa width và height là 16:9
    - PlayBackView: Set **background color** cho view là #232323 (hex) có opacity = 50% | **Corner radius** = 20 | Thêm **leading constraint**, **trailing constraint** và **bottom constraint** có giá trị constant = 16 đối với Safe Area | **Height constraint** có giá trị constant = 47
    
  ![](https://images.viblo.asia/647a737b-adbe-45d0-ae36-ad4894dc3a5e.png)

- **Bước 2:** Thêm **IBOutlet** của các view objects trong **VideoPlayer.xib**
```
final class VideoPlayer: UIView {
    // MARK: - Outlets
    
    @IBOutlet private var videoView: UIView!
    @IBOutlet private var closeButton: UIButton!
    @IBOutlet private var playBackView: PlayBackView!
}
```

- **Bước 3:** Trong **VideoPlayer.swift**, ta import **AVFoundation** framework.  Tiếp theo, ta override hàm khởi tạo **init()** và gọi hàm **loadFromNib()** có nhiệm vụ get view từ **VideoPlayer.xib**. Hàm **setupPlayer()** tạo instance của **AVPlayer** và **AVPlayerLayer**.

```
import AVFoundation

final class VideoPlayer: UIView {
    // MARK: - Outlets
    ...
    
    // MARK: - Properties
    
    private var player: AVPlayer!
    private var playerLayer: AVPlayerLayer!
    
    // MARK: - Override Methods
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        loadFromNib()
        config()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        loadFromNib()
        config()
    }
    
    // MARK: - Private Methods
    
    private func config() {
        setupPlayer()
        playBackView.config(with: player)
    }
    
    private func setupPlayer() {
        player = AVPlayer()
        playerLayer = AVPlayerLayer(player: player)
        playerLayer.frame = videoView.bounds
        playerLayer.videoGravity = .resizeAspect
        videoView.layer.addSublayer(playerLayer)
    }
}
```

- **Bước 4**: Ẩn / hiện **PlayBackView**:

```
final class VideoPlayer: UIView {
    // MARK: - Properties
    
    private var isShowPlayBack = true
    
    // MARK: - Private Methods
    
    private func config() {
        ...
        // Tap gesture
        let controlTapGesture = UITapGestureRecognizer(target: self, action: #selector(playerViewHandleTap))
        self.addGestureRecognizer(controlTapGesture)
    }
    
    @objc private func playerViewHandleTap(_ gestureRecognizer: UITapGestureRecognizer) {
        let location = gestureRecognizer.location(in: self)
        guard let contentView = self.getViewsByType(type: PlayBackView.self).first else { return }
        
        if contentView.frame.contains(location) && isShowPlayBack {
            return
        }
        
        showHidePlayBackView()
    }
}
```

```
// MARK: - Show / Hide PlayBack

private extension VideoPlayer {    
    func showHidePlayBackView() {
        isShowPlayBack = !isShowPlayBack
        UIView.animate(withDuration: 0.3, animations: { [weak self] in
            guard let self = self else { return }
            self.closeButton.alpha = !self.isShowPlayBack ? 0 : 1
            self.playBackView.alpha = !self.isShowPlayBack ? 0 : 1
        })
        if isShowPlayBack {
            resetTimer()
        }
    }
}
```

```
extension UIView {
    func getViewsByType<T: UIView>(type _: T.Type) -> [T] {
        return getAllSubViews().compactMap { $0 as? T }
    }
    
    private func getAllSubViews() -> [UIView] {
        var subviews = self.subviews
        if subviews.isEmpty {
            return subviews
        }
        for view in subviews {
            subviews += view.getAllSubViews()
        }
        return subviews
    }
}
```

- **Bước 5**: Thêm IBAction cho CloseButton:

```
final class VideoPlayer: UIView {
    // MARK: - Properties
    
    var dismissClosure: (() -> Void)?
  
    MARK: - Private Methods
    
    @IBAction private func closeButtonHandleTapped(_ sender: Any) {
        dismissClosure?()
    }
}
```

- **Bước 6:** Ta tạo hàm **playVideo()** với param truyền vào là url string của video và hàm **updateLayoutSubviews** để cập nhật frame cho các subviews.

```
final class VideoPlayer: UIView {
    // MARK: - Public Methods
    
    func playVideo(with urlString: String) {
        guard let url = URL(string: urlString) else { return }
        let playerItem = AVPlayerItem(url: url)
        player?.replaceCurrentItem(with: playerItem)
        playBackView.playVideo()
    }
    
    func updateLayoutSubviews() {
        layoutIfNeeded()
        playerLayer.frame = videoView.bounds
    }
}
```

### 4. Sử dụng custom video player class trong ViewController
Trong **Main.storyboard**, ta tạo **VideoPlayerController** và thêm UIView object vào view controller đó. Thêm constraint cho UIView và thay đổi UIView class name bằng **VideoPlayer**. 

![](https://images.viblo.asia/e6769b9c-6710-4c76-8d1f-36ea776c73c7.png)

![](https://images.viblo.asia/8d892776-4425-43cd-975c-7b1b8ddd60f2.png)

Trong **VideoPlayerController.swift**, ta tạo IBOutlet của **VideoPlayer** và kết nối với VideoPlayer object trong storyboard. Trong hàm **viewDidLoad()**, ta gọi hàm **playVideo()** để thực thi play video. Trong hàm **viewDidLayoutSubviews()**, khi xoay màn hình thì sẽ thực thi hàm **updateLayoutSubviews()** để cập nhật frame cho các subviews.

```
private struct Constant {
    static let urlString = "https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8"
}

final class VideoPlayerController: UIViewController {
    
    // MARK: - IBOutlet
    
    @IBOutlet private var playerView: VideoPlayer!
    
    // MARK: - Override Methods
    
    override func viewDidLoad() {
        super.viewDidLoad()
        playerView.playVideo(with: Constant.urlString)
        playerView.dismissClosure = { [weak self] in
            self?.dismiss(animated: true)
        }
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        setNeedsStatusBarAppearanceUpdate()
    }
    
    override var preferredStatusBarStyle: UIStatusBarStyle {
        .lightContent
    }
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        playerView.updateLayoutSubviews()
    }
}
```


### Kết quả:
![](https://media.giphy.com/media/LXxuzO5AvTWBXbexVM/giphy.gif)

### Github:
- https://github.com/ndhuy96/custom-video-player