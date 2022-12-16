Nguồn: https://www.raywenderlich.com/6236502-avfoundation-tutorial-adding-overlays-and-animations-to-videos

Hãy download tài liệu source code ở link gốc trước khi bắt đầu nhé!

Trong bài hướng dẫn này, bạn sẽ học cách thêm overlays và animation vào video, bằng cách sử dụng  AVVideoComposition CoreAnimationTool, thứ sẽ cho phép bạn kết hợp CALayers với video để thêm background và overlay.

Nếu bạn đang làm một app camera, sẽ rất có lợi cho bạn khi thêm overlay và animation vào video. Nếu bạn thêm ngày tháng, tên địa chỉ, thời tiết hay chỉ một ảnh GIF vui vui, thì user cũng sẽ thấy thích thú hơn vì có thể chỉnh sửa video của họ.

Bạn có thể làm điều đó với AVFoundation, framework của Apple để vận dụng các nội dung audio và video. Bạn có thể nghĩ AVFoundation như là một chương trình để chỉnh sửa video và audio, thứ cho phép bạn kết hợp các đoạn video, audio và thêm các overlay sinh động lên đó.

Trong bài hướng dẫn này bạn sẽ học:
◾️Thêm khung vào video
◾️Thêm text và ảnh vào video
◾️Thêm hiệu ứng overlay
◾️Export video đã thêm hiệu ứng thành file

# Getting Started
Hãy download file project ở link gốc để bắt đầu nhé.
Project lần này tên là Cubica, có ý nghĩa là Custom Birthday Cards. Bạn sẽ tạo một app để record lại video và thêm overlay và border để chỉnh sửa thành một tấm card sinh nhật gửi đến bạn bè.

![](https://images.viblo.asia/08de98ec-d83c-49e9-b9f0-0963384f04f4.gif)

Mở project trên Xcode. Bạn có thể sử dụng simulator hoặc device, nhưng hãy nhớ là tutorial này yêu cầu video. Hãy chắc chắn là kéo thả video từ Mac vào simulator.

Project đã có sẵn một màn hình, nơi bạn có thể nhập tên người bạn của bạn và chọn một video để thêm overlay. Tất cả đều đang được xử lý trong **PickerViewController.swift**.
![](https://images.viblo.asia/6fa40218-f869-4803-81a4-4186a985bbfb.png)
Mỗi lần user chọn video, app sẽ gửi nó đến **VideoEditor.swift**. Hiện tại file này chỉ có một vài helper method và method được gọi là `makeBirthdayCard(fromVideoAt:forName:onComplete:)`. Bạn sẽ sửa method này để thêm overlay vào video.

Khi app thêm overlay vào video, method này sẽ gọi đến completion handler và gửi video URL đến **PlayerViewController.swift**. View controller này sẽ play video và export vào vào thư viện ảnh của bạn.

Tôi cược là bạn không thể đợi để gửi video này đến bạn của bạn! :]

# Composing a Video
Trước khi bạn có thể thêm bất kỳ overlay vào nào video, bạn sẽ cần setup một vài thứ. Bạn sẽ muốn tạo một video mới từ video đã tồn tại, với background và overlay đã được thêm vào đó.

Trước hết, bạn sẽ tạo một composition (thành phần) AVFoundation mới. Bạn có thể nghĩ một composition như là một trình chỉnh sửa video. Composition này sẽ giữ các type khác nhau của track như là audio và video track, và quản lý khi chúng bắt đầu hoặc kết thúc trên time line của video.

Một khi bạn tạo một composition rỗng, bạn sẽ add hai track vào vào composition, một cho video và một cho audio. Với audio track bạn đơn giảm là copy audio của video đã tồn tại. Để tạo video, bạn sẽ sử dụng `AVVideoCompositionCoreAnimationTool`, một class để bạn kết hợp một video đã tồn tại với Core Animation layer.

Once you have both the combined video and the audio inside the composition, you’ll export the composition into a video file using AVAssetExportSession.
Khi bạn đã có cả video vào audio vào composition, bạn sẽ export composition thành một file video sử dụng `AVAssetExportSession`.

Đừng lo lắng, nó không khó như vậy đâu! Bước đầu tiên của bạn là tạo composition.

# Creating a Composition
Mở **VideoEditor.swift**. Phần chính của sample project này trong `makeBirthdayCard(fromVideoAt:forName:onComplete:)`. Hiện tại, method này đơn giản chỉ gọi completion handler với video đã tồn tại. Thay thế dòng `onComplete(videoURL)` với đoạn code sau:
```
let asset = AVURLAsset(url: videoURL)
let composition = AVMutableComposition()
```
Tạo một `AVAsset`, thứ sẽ giữ tất cả thông tin cần và data về video được cung cấp. Đồng thời tạo một composition rỗng. Bạn sẽ lấp đầy composition với một video đã được overlay.

Tiếp theo, thêm một track vào composition và chụp lấy video track từ asset bằng cách thêm đoạn code sau:
```
guard
  let compositionTrack = composition.addMutableTrack(
    withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid),
  let assetTrack = asset.tracks(withMediaType: .video).first
  else {
    print("Something is wrong with the asset.")
    onComplete(nil)
    return
}
```
Bạn thêm một video track mới bằng cách gọi `addMutableTrack` với kiểu media là `.video` . Bạn có thể đưa vào đó hằng số ID không chuẩn cho track ID nếu bạn không sử dụng ID về sau. Bạn cũng bắt lấy video từ asset bằng `.first`, và chỉ video track trong asset thôi. Nếu bạn không thể thực hiện được việc nào trong 2 việc trên, in lỗi ra và gọi completion handler bằng `nil`.

Giờ, thêm đoạn code sau vào cuối hàm `makeBirthdayCard(fromVideoAt:forName:onComplete:)`để nhập video track từ asset vào trong video track của composition:
```
do {
  // 1
  let timeRange = CMTimeRange(start: .zero, duration: asset.duration)
  // 2
  try compositionTrack.insertTimeRange(timeRange, of: assetTrack, at: .zero)
  
  // 3
  if let audioAssetTrack = asset.tracks(withMediaType: .audio).first,
    let compositionAudioTrack = composition.addMutableTrack(
      withMediaType: .audio, 
      preferredTrackID: kCMPersistentTrackID_Invalid) {
    try compositionAudioTrack.insertTimeRange(
      timeRange, 
      of: audioAssetTrack, 
      at: .zero)
  }
} catch {
  // 4
  print(error)
  onComplete(nil)
  return
}
```
Đây là những gì đoạn code bên trên sẽ xử lý:
1. `CMTimeRange` quy định time range trong video. Trong trường hợp này, bạn muốn thêm video từ đầu đến cuối, nên bạn tạo range từ 0 đến hết độ dài của video.
2.  Một khi đã có time range, bạn nhập toàn bộ video từ asset vào video track của composition.
3.  Nếu asset cũng chứa một audio track, làm điều tương tự. Đầu tiên thêm một audio track vào composition vào sau đó nhập audio của asset vào trong track.
4.  Nếu có lỗi, in lỗi ra và gọi completion handler bằng `nil`.

# Setting Up the Composition
Tiếp theo, nhận kích thước và hướng của composition của bạn bằng cách thêm code sau vào cuối method:
compositionTrack.preferredTransform = assetTrack.preferredTransform
let videoInfo = orientation(from: assetTrack.preferredTransform)

```
let videoSize: CGSize
if videoInfo.isPortrait {
  videoSize = CGSize(
    width: assetTrack.naturalSize.height,
    height: assetTrack.naturalSize.width)
} else {
  videoSize = assetTrack.naturalSize
}
```
Bạn trước hết cần chắc là thông số khi export của asset và composition là giống nhau. Trong project đã bao gồm hàm `orientation(from:)`, trả về hướng portrait hay landscape của video. Nếu hướng là portrait, bạn sẽ cần đảo width và height khi check size của video. Còn không thì bạn có thể sử dụng size gốc.

Bây giờ, bạn sẽ tạo một composition mới bao gồm video và audio từ file gốc. Tiếp đến, bạn sẽ setup layer để chắc chắn rằng bạn có thể thêm background và overlay vào video trong composition.

# Core Animation – The Star of the Show
![](https://images.viblo.asia/8fd918a9-f112-4449-b3db-43f5b66e5886.png)
Nền và overlay của bạn sẽ đều là `CALayers`. `CALayer`là class chính của framework được gọi là Core Animation.

Đứng đằng sau mỗi view trong app của bạn là **Core Animation**, phản hồi cho việc draw và animate nội dung của nó. Kể từ khi `CALayer`đứng sau mỗi view, mọi thứ được draw trên màn hình điện thoai là một layer.

Như cái tên đã nói lên, bạn có thể vẽ các layer bên dưới hoặc phía trên các layer khác, làm  nó hoàn hảo cho việc thêm background hoặc overlay lên video. Bạn tận dụng nó trong video với với class tiện lợi của AVFoundation được gọi là `AVVideoCompositionCoreAnimationTool`. Đây như là một cây cầu của composition và Core Animation, để bạn tạo một video mới cho phép bạn áp dụng `CALayer` vào video composition.

Để bắt đầu, bạn sẽ cần 3 layer. Một là background, vẽ phía sau video. Thứ hai là layer để vẽ frame của video. Thứ ba là một overlay layer nằm trên video.
![](https://images.viblo.asia/ee067ca7-593e-4e8a-ac05-32683d0f1186.png)

# Layering the Cake
Tạo ba layer bằng cách thêm đoạn code sau vào cuối hàm  `makeBirthdayCard(fromVideoAt:forName:onComplete:)`:
```
let backgroundLayer = CALayer()
backgroundLayer.frame = CGRect(origin: .zero, size: videoSize)
let videoLayer = CALayer()
videoLayer.frame = CGRect(origin: .zero, size: videoSize)
let overlayLayer = CALayer()
overlayLayer.frame = CGRect(origin: .zero, size: videoSize)
```
Mỗi layer sẽ có frame giống nhau, kéo dài ra toàn bộ video.

Tiếp theo, nhóm tất cả các layer này vào một layer cha bằng cách thêm đoạn sau:
```
let outputLayer = CALayer()
outputLayer.frame = CGRect(origin: .zero, size: videoSize)
outputLayer.addSublayer(backgroundLayer)
outputLayer.addSublayer(videoLayer)
outputLayer.addSublayer(overlayLayer)
```
Ở đây, bạn tạo một layer mới, cái sẽ là layer của composition kết quả. Đầu tiên bạn thêm background layer, sau đó là video layer và cuối cùng, là overlay layer. Đó là thứ tự của các layer. Ở đây bạn sẽ sắp xếp để video nằm phía sau overlay layer và trên background layer.

Hiện giờ, hẳn là bạn sẽ muốn build project để xem kết quả. Nhưng không may là không có video nào được hiện ra hết!
![](https://images.viblo.asia/f43ed9f3-dd23-4750-8bd3-7682b039c409.png)
Bạn đã setup các layer, nhưng bạn vẫn phải sử dụng AVFoundation để export video từ các layer trên.

# Exporting the Video
Giờ bạn đã có tất cả các layer, giờ là lúc sử dụng `AVVideoCompositionCoreAnimationTool` để kết hợp chúng vào trong một chiếc bánh composition video!

# Creating a Video Composition
Thêm các method dưới đây:
```
let videoComposition = AVMutableVideoComposition()
videoComposition.renderSize = videoSize
videoComposition.frameDuration = CMTime(value: 1, timescale: 30)
videoComposition.animationTool = AVVideoCompositionCoreAnimationTool(
  postProcessingAsVideoLayer: videoLayer, 
  in: outputLayer)
```
Trước tiên, bạn tạo một `AVMutableVideoComposition` mới. Cái composition mà bạn tạo trước đó là `AVComposition`, cái này sẽ giữ video, audio, và các kiểu track. Mặt khác, bạn chỉ sử dụng `AVVideoComposition` để biên soạn nhiều video track. Trong trường hợp này bạn chỉ cần một video track.

Tiếp đến, bạn đặt kích thước render của video bằng với kích thước của video gốc. `frameDuration` sẽ xác định mất bao lâu để đến frame cuối cùng. Bằng cách truyền `CMTime` một giá trị của 1 và một timescale 30, bạn set frame duration thành 1/30 giây, kết quả trả về một video với rate là 30 khung hình trên giây.

Cuối cùng là thêm animation vào video sử dụng animation tool. Tool này sẽ ghép overlay layer và video layer để tạo ra video.

Tiếp theo, thêm đoạn code sau để thêm một video track vào video composition:
```
let instruction = AVMutableVideoCompositionInstruction()
instruction.timeRange = CMTimeRange(
  start: .zero, 
  duration: composition.duration)
videoComposition.instructions = [instruction]
let layerInstruction = compositionLayerInstruction(
  for: compositionTrack, 
  assetTrack: assetTrack)
instruction.layerInstructions = [layerInstruction]
```
Video composition sử dụng một tập hợp các chỉ dẫn để xác định hiển thị gì trên video. Trong trường hợp này, bạn chỉ cần một chỉ dẫn để lắp ghép video trong suốt quá trình kết hợp.

Mội chỉ dẫn có thể có chỉ dẫn layer riêng để xác định làm các nào layer các video track khác nhau. Bộ project cung cấp ban đầu đã có sẵn một method rất tiện lợi gọi là `compositionLayerInstruction` cái sẽ trả về các chỉ dẫn đúng cho video. Những chỉ dẫn này nói cho video scale và rotate chính nó để khớp kích thước với video size và hướng. Nếu ko có những chỉ dẫn này, video kết quả có thể bị sai hướng hoặc sai kích thước.

Giờ bạn đã có những mảnh cần thiết: một composition chứa toàn bộ video gốc và audio và video composition cái sẽ render video. Bạn sẽ kết hợp các mảnh này vào một export session.

# Using an Export Session
Đón xem phần 2 nhé ^^"~