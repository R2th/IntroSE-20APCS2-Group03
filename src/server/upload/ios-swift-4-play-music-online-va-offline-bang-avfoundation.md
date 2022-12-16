# I. Mục Tiêu
![](https://images.viblo.asia/7f475f91-d5fd-4bba-b7f4-669b601d4da6.png)
Xây dựng view nghe nhạc như trên hình có các chức năng play, pause, hiển thị thông tin, tăng giảm âm lượng, back track...
# II. Bắt đầu công việc
## 1. Xây dựng UIView
Tạo 1 UIViewController trong storyboard rồi kéo cái thành phần vào UIViewController, autolayout cho các thành phần đó.
![](https://images.viblo.asia/39c6069b-3520-421a-a011-5c797c7a76d6.png)
## 2. Implement code
Tạo class controll UIViewController ta vừa dựng trong phần 1 đặt tên là DetailMusicViewController, ánh xạ các thành phần trong view sang class controller. 
```
class DetailMusicViewController: UIViewController {
    
    // MARK : Outlet
    @IBOutlet weak var sliderMusic: UISlider!
    @IBOutlet weak var lbEnd: UILabel!
    @IBOutlet weak var avatarImg: UIImageView!
    @IBOutlet weak var lbName: UILabel!
    @IBOutlet weak var lbSinger: UILabel!
    @IBOutlet weak var slideVolume: UISlider!
```
Để play nhạc online ta dùng class AVPlayer nhạc offline dùng class AVAudioPlayer, cả 2 class này đều nằm trong thư viện AVFoundation nên chúng ta phải import thư viện này vào : 

``` import AVFoundation ```

Khai báo 1 player để play nhạc. Nếu play nhạc online player có kiểu AVPlayer, offline thì player có kiểu AVPlayer:
```
var player : AVAudioPlayer?
//var player : AVPlayer? // chơi nhạc online
```

tạo function initPlayer() để khởi tạo player, đồng thời set thuộc tính maximum cho sliderMusic :
```
func playerInit() {
  guard let url = Bundle.main.url(forResource: "music", withExtension: "mp3") else {
                return
            }
            do {
                player = try AVAudioPlayer(contentsOf: url)
                let duration = player?.duration
                let min = Int(duration!) / 60
                let second = Int(duration!) % 60
                self.lbEnd.text = "\(min):\(second)"
                self.sliderMusic.maximumValue = Float(duration!)
            } catch let err {
                print(err.localizedDescription)
            }
}
```

Trường hợp nghe nhạc online :
``` func playerInit() {
     let url = URL(string: "http://file.x2convert.com/files/2018/7/7/mr_siro_cham_day_noi_dau_piano_version.mp3")
            player = AVPlayer(url: url!)
            guard let duration = player?.currentItem?.asset.duration else {
                return
            }
            let durationBySecond = CMTimeGetSeconds(duration)
            let min = Int(durationBySecond) / 60
            let second = Int(durationBySecond) % 60
            self.lbEnd.text = "\(min):\(second)"
            self.sliderMusic.maximumValue = Float(durationBySecond)
}
```

Trong viewDidLoad() gọi playerInit()
Để cập nhật progress của sliderMusic chúng ta phải lập lịch cập nhật theo 1s :
```
 Timer.scheduledTimer(timeInterval: 1.0, target: self, selector: #selector(updateSlider), userInfo: nil, repeats: true)
```

Implement function updateSlider() :
```
 @objc func updateSlider() {
      if player!.isPlaying == true {
            sliderMusic.value = Float((localPlayer!.currentTime))
        } 
```

Trường hợp nghe nhạc online:
```
 @objc func updateSlider() {
    if player != nil {
            let currentTimeBySecond = CMTimeGetSeconds((onlinePlayer!.currentTime()))
            sliderMusic.value = Float(currentTimeBySecond)
        }
```

### Ánh xạ các Action và implement chúng :
Đầu tiên là button Play:
```
@IBAction func onClickBtnPlay(_ sender: UIButton) {
        sender.isSelected = !sender.isSelected
        
        if player != nil {
            if sender?.isSelected == true {
                player?.stop()
            } else {
                player?.play()
            }
    }
```

Button backTrack, mỗi lần click thì player sẽ lùi lại 10s :
```
 @IBAction func onClickBtnBackTime(_ sender: Any) {
let currentTime = sliderMusic.value
        var targetTime : Float = 0
        if currentTime - 10 > 0 {
            targetTime = currentTime - 10
        } else {
         targetTime = 0
        }
        
        sliderMusic.value = targetTime
        if player != nil {
            player?.currentTime = TimeInterval(targetTime)
        } 
        // Trường hợp online
        /*if player != nil {
            player?.seek(to: CMTime(seconds: Double(targetTime), preferredTimescale: 1))
        }
        */
        }
```

Button nextTrack, tăng thêm 10s khi click:
```
@IBAction func onClickNextTime(_ sender: Any) {
        let currentTime = sliderMusic.value
        var targetTime : Float = 0
        if currentTime + 10 > sliderMusic.maximumValue {
            targetTime = sliderMusic.maximumValue
        } else {
            targetTime = currentTime + 10
        }
        
        sliderMusic.value = targetTime
        if player != nil {
            player?.currentTime = TimeInterval(targetTime)
        } 
        /*
        // Trường hợp online
        if player != nil {
            player?.seek(to: CMTime(seconds: Double(targetTime), preferredTimescale: 1))
        }
        */
    }
```

Cuối cùng là action kéo thanh slideVolue :
```
 @IBAction func onChangeSliderVolume(_ sender: Any) {
        if player != nil {
            player?.volume = slideVolume.value
        } 
        /*
        // Trường hợp online
        if player != nil {
            player?.volume = slideVolume.value
        }
        */
    }
```

Build và chạy thử chúng ta được kết quả như sau :![](https://images.viblo.asia/d928e43e-59dd-4c75-a167-04b1c699c821.png)

# III Tổng kết
Bên trên chúng ta đã làm được 1 view nghe nhạc đơn giản sử dụng AVFoundation. Hy vọng bài viết giúp ích được cho các bạn. Các bạn có thể phát triển thêm để xây dựng 1 app nghe nhạc hoàn chỉnh của riêng mình. Cám ơn các bạn đã chú ý theo dõi bài viết này. Hẹn gặp lại trong các bài viết lần sau!

Source code : https://github.com/vungocduy1261993/MusicApp