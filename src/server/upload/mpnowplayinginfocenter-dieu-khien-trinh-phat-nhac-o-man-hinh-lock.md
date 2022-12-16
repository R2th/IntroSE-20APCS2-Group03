Khi bạn làm một ứng dụng nghe nhạc, chắc chắn bạn đâu muốn lúc nào cũng mở ứng dụng nghe nhạc ở ngay màn hình chính đâu. Đôi lúc bạn sẽ muốn khoá điện thoại chỉ để nghe nhạc, nhưng bạn vẫn muốn điều khiển được trình nghe nhạc như nghe bản nhạc tiếp theo, bản nhạc trước hoặc một chút thông tin ... 

## Âm nhạc

> Âm nhạc là thứ mang lại vẻ đẹp dưới dạng nụ cười trên khuôn mặt. Một trong những ứng dụng được sử dụng nhiều nhất và thịnh hành nhất là ứng dụng âm nhạc. Mỗi người trong chúng ta đều có một hoặc ứng dụng âm nhạc khác trong điện thoại của mình để giúp chúng ta xả stress. 😌


## Chủ đề
Bây giờ mình sẽ hướng dẫn làm thể nào để điều khiển ở trình phát nhạc trên màn hình khoá.

![](https://images.viblo.asia/070b8d16-65f6-4d27-8046-3d9229d868c7.png)

## Điều kiện cần và đủ để áp dụng vào ứng dụng

Để phát nhạc và mong muốn điều khiển thì ứng dụng iOS của bạn cần những điều sau:

1. Media playback
2. Remote commands configuration
3. Playing info center configuration

### 1. Hỗ trợ phát nhạc ở nền

Để khi ứng dụng iOS ở nền vẫn có thể phát nhạc được, bạn cần đoạn code đăng kí như sau:

```
do {
    //keep alive audio at background
    try AVAudioSession.sharedInstance().setCategory(AVAudioSession.Category(rawValue: AVAudioSession.Category.playback.rawValue))
    try AVAudioSession.sharedInstance().setActive(true)
} catch _ { 
}
```

Bật Audio ở Background Modes
![](https://images.viblo.asia/9f6b676c-94c9-4086-86d5-4d95d5077293.png)

### 2. Remote Commands

`MPNowPlayingInfoCenter` là một class cho phép tương tác giữa ứng dụng và remote control ở màn hình khoá. Class này cung cấp `MPRemoteCommand` để handle trong ứng dụng của mình.

* Trước tiên đăng kí Remote này ở ứng dụng bằng câu lệnh sau

`UIApplication.shared.beginReceivingRemoteControlEvents()`

* Các hàm handle mà bạn mong muốn

```
func addActionsToControlCenter(){
    addActionToPlayCommand()
    addActionToPauseCommnd()
    addActionToPreviousCommand()
    addActionToNextCommand()
    addActionToChangePlayBackPosition()
    addActionToseekForwardCommand()
    addActionToseekBackwordCommand()
}

func addActionToPlayCommand(){
        MPRemoteCommandCenter.shared().playCommand.isEnabled = true  
        MPRemoteCommandCenter.shared().playCommand.addTarget(self, action: #selector(playCommand))
}

func addActionToPauseCommnd(){
    MPRemoteCommandCenter.shared().pauseCommand.isEnabled = true
    MPRemoteCommandCenter.shared().pauseCommand.addTarget(self, action: #selector(pauseCommand))
}

func addActionToPreviousCommand(){
        MPRemoteCommandCenter.shared().previousTrackCommand.isEnabled = true    MPRemoteCommandCenter.shared().previousTrackCommand.addTarget(self, action: #selector(previousButtonTapped))
}

func addActionToNextCommand(){
    MPRemoteCommandCenter.shared().nextTrackCommand.isEnabled = true
    MPRemoteCommandCenter.shared().nextTrackCommand.addTarget(self, action: #selector(nextButtonTapped))
}

func addActionToChangePlayBackPosition(){
    MPRemoteCommandCenter.shared().changePlaybackPositionCommand.isEnabled = true
    MPRemoteCommandCenter.shared().changePlaybackPositionCommand.addTarget(self, action: #selector(changePlaybackPosition))
}

func addActionToseekForwardCommand(){
    MPRemoteCommandCenter.shared().seekForwardCommand.isEnabled = true
    MPRemoteCommandCenter.shared().playCommand.addTarget(self, action: #selector(seekForward))
}

func addActionToseekBackwordCommand(){
    MPRemoteCommandCenter.shared().seekBackwardCommand.isEnabled = true
    MPRemoteCommandCenter.shared().playCommand.addTarget(self, action: #selector(seekBackword))
}
```

### 3. Playing info center configuration

```
func updateInfoCenter() {

    guard let item = currentItem else {return}
   
    var nowPlayingInfo : [String : AnyObject] = [
        MPMediaItemPropertyPlaybackDuration : item.duration ?? 0 as AnyObject,
        MPMediaItemPropertyTitle            : item.contentObj.title as AnyObject,
        MPNowPlayingInfoPropertyElapsedPlaybackTime : item.currentTime as AnyObject,
        MPNowPlayingInfoPropertyPlaybackQueueCount  : totalCount as AnyObject,
        MPNowPlayingInfoPropertyPlaybackQueueIndex  : playIndex as AnyObject,
        MPMediaItemPropertyMediaType : MPMediaType.anyAudio.rawValue as AnyObject, 
        MPMediaItemPropertyArtist
    ]
    MPNowPlayingInfoCenter.default().nowPlayingInfo = nowPlayingInfo
}
```

![](https://images.viblo.asia/f4b121fe-aa58-4b7d-b156-6e151b2d1cf6.png)

###  Note
Ngoài ra còn nhiều thứ khác mà bạn có thể handle được thông qua `MPRemoteCommandCenter` như seek, duration, elapsed, rate ....

Hy vọng bài viết này, có thể giúp ích được cho bạn một phần nào đó. 

Nguồn:

https://medium.com/@g4gurpreetoberoi/controlling-music-from-lock-screen-mpnowplayinginfocenter-3f75ec7972d6

https://medium.com/@varundudeja/showing-media-player-system-controls-on-notification-screen-in-ios-swift-4e27fbf73575