# Mở đầu
Hàng ngày chúng ta sử dụng iTunes, Media Player... chắc hẳn đã rất quen với music visualizer. Vậy music visualizer thực sự là gì?
Đó chính là 1 feature mà bạn có thể dễ dàng nhìn thấy trên các thiết bị hay phần mềm chơi nhạc điện tử, sinh ra các hình ảnh động dựa trên âm nhạc được phát ra. Những hình ảnh này được sinh ra theo thời gian thực và đồng bộ với âm nhạc. Bạn có thể nghe nhạc không chỉ bằng tai mà còn bằng mắt. Thật là thú vị phải không nào? Có khi nào bạn tự hỏi làm thế nào để làm ra được 1 ứng dụng music visualization như thế ?
Hôm nay tôi sẽ hướng dẫn các bạn làm ứng dụng iOS music visualizer nhé !
# Cấu hình project
Trước khi xây dựng một ứng dụng music visualizer bạn cần trải qua các bước cấu hình sau đây: 
Trước hết giải nén starter project và mở ứng dụng lên bằng Xcode. Build và run, bạn có thể quan sát thấy như sau: 

![](https://images.viblo.asia/a8c491ce-8bb3-4bd6-a625-9a2beda09d3f.png)
## Cấu hình mở ra music library trên device
- Bạn có thể tap vào nút play để chuyển giữa play và pause mode nhưng bạn không hề nghe thấy tiếng nhạc phát ra. Chạm vào vùng black ở  giữa màn hình để ẩn/ hiện thanh navigation bar và tool bar. Nếu bạn bấm vào icon kính lúp thì n sẽ mở ra music library và chọn 1 bài hát.

![](https://images.viblo.asia/212a6f9d-343a-456f-ad3f-f814f16a2d31.png)

Tuy nhiên nếu dùng máy ảo, bạn sẽ không mở được music library. Do đó nếu muốn mở music library, bạn nên sử dụng device thật nhé, đồng thời thêm dòng sau đây vào file info.plis
```
    <key>NSAppleMusicUsageDescription</key>
    <string>$AppName uses music</string>
```
## Import AVAudioPlayer
- Sử dụng AVAudioPlayer là cách đơn giản để chơi nhạc trên thiết bị iOS. AVAudioPlayer có thể tìm thấy trên nền tảng AVFoundation.framework nên bạn cần là thêm nền tảng này vào project
Chọn Build Phases tab, expand Link Binary With Libraries section sau đó bấm nút + để thêm AVFoundation.framework

![](https://images.viblo.asia/773bf3b2-2202-4b9f-a87a-1e1313be64ac.png)

-Trong file ViewController.m, thêm phần 
```
#import <AVFoundation/AVFoundation.h>
@property (strong, nonatomic) AVAudioPlayer *audioPlayer;
```
- Sau khi import header file AVFoundation.h, bạn có thể truy cập AVAudioPlayer và tạo ra 1 instance của AVAudioPlayer sử dụng để play audio
Starter Project bao gồm 1 file nhạc tên là DemoSong.m4a trong thư mục Resource folder mà bạn có thể sử dụng. Bạn có thể sử dụng những định đạng khác nếu muốn nhưng nhớ là chỉ có những định dạng audio dưới đây được hỗ trợ chơi nhạc trên thiết bị iOS: AAC, ALAC, HE-AAC, iLBC, IMA4, Linear PCM, MP3, µ-law, a-law
## Thiết lập audio player
 Trong class  ViewController.m, bổ sung thêm method sau :
```
- (void)configureAudioPlayer {
    NSURL *audioFileURL = [[NSBundle mainBundle] URLForResource:@"DemoSong" withExtension:@"m4a"];
    NSError *error;
    self.audioPlayer = [[AVAudioPlayer alloc] initWithContentsOfURL:audioFileURL error:&error];
    if (error) {
        NSLog(@"%@", [error localizedDescription]);
    }
    [_audioPlayer setNumberOfLoops:-1];
}
```

Hàm này sẽ tạo ra 1 tham chiếu đến file nhạc và lưu trữ đường dẫn của nó trong audioFileURL. Sau đó sẽ tạo ra 1 instance của AVAudioPlayer mới với audioFileURL vừa được khởi tạo. Đồng thời thiết lập numberOfLoops là -1 tức là file nhạc sẽ được chơi lặp đi lặp lại

Thêm dòng sau vào cuối hàm viewDidLoad:
```
[self configureAudioPlayer];
```

Bằng việc gọi hàm configureAudioPlayer trong viewDidLoad. Bạn sẽ thiết lập audio player khi ngay khi view load lên, bạn có thể bấm nút play hoặc pause để play hoặc pause nhạc. 
Thêm dòng code sau đầy vào trong hàm playPause 
```
[_audioPlayer pause];
```

```
[_audioPlayer play];
```
Tap vào button play/pause sẽ gọi hàm playPause. Đoạn code này sẽ  cho audioPlayer chơi hay dừng nhạc dựa theo biến trạng thái isPlaying. Biến này được sinh ra để xác định audio player hiện tại đang chơi hay dừng 
# Chọn bài hát từ thư viện của thiết bị
Nếu chỉ chơi duy nhất 1 bài hát thì thật nhàm chán, bạn cần bổ sung thêm chức năng chơi nhạc thư viện của thiết bị.
Trong class ViewController.m, thêm dòng code dưới đây vào hàm playURL
```
self.audioPlayer = [[AVAudioPlayer alloc] initWithContentsOfURL:url error:nil];
[_audioPlayer setNumberOfLoops:-1];
```

Đoạn code trên đây tương tự đoạn đã thêm trong configureAudioPlayer. Tuy nhiên, thay vì hardcode tên file, bạn tạo ra một đối tượng mới của AVAudioPlayer với url được truyền qua tham số hàm. Đấy chính là url của bài hát mà bạn chọn trong device.
Build app lên, như vậy là bạn có thể chọn và play 1 bài hát từ thư viện nhạc rồi.
# Chơi nhạc ở chế độ background mode
Trong lúc đang chơi nhạc, bạn bấm phím home. Việc chơi nhạc sẽ bị ngừng lại và đây là 1 trải nghiệm không hề dễ chịu với người dùng. Bạn hãy cấu hình cho app để nhạc vẫn tiếp tục được chơi ngay cả khi app được chạy ở chế độ background. Luôn nhớ là chế độ này không được hỗ trợ trên máy ảo iPhones nên bạn hãy dùng device thật nếu muốn kiểm tra tính năng nhé
Để chơi nhạc trong chế độ background, bạn cần làm 2 điều sau
## Thiết lập audio session category
- Trước hết , Thiết lập audio session category.: 
1 audio session là trung gian giữa ứng dụng của bạn và iOS để cấu hình hành vi của audio. Cấu hình audio session sẽ thiết lập các hành vi âm nhạc cơ bản cho ứng dụng của bạn. 
Thêm hàm sau đây vào ViewController.m
```
- (void)configureAudioSession {
     NSError *error;
     [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryPlayback error:&error];

     if (error) {
         NSLog(@"Error setting category: %@", [error description]);
     }
 }
```
Trong hàm configureAudioSession, bạn lấy về 1 audio session thông qua [AVAudioSession sharedInstance]  và thiết lập category của nó là  AVAudioSessionCategoryPlayback. Điều này chỉ ra rằng audio session hiện tại sử dụng cho việc phát nhạc ( ngược lại với ghi âm hoặc xử lý âm thanh)
Thêm sau sau đây vào hàm viewDidLoad, ngay trước khi gọi hàm  [self configureAudioPlayer]
```
[self configureAudioSession];
```
## Khai báo app thực thi ở chế độ background mode
- Sau đó khai báo app của bạn thực thi ở chế độ background
Mở file  iPodVisualizer-Info.plist, sau đó thêm key "Required background modes", thiết lập value của Item0 là "App plays audio or streams audio/video using AirPlay"
![](https://images.viblo.asia/7b0cc54a-af07-4f20-822e-e55b0f6d5733.png)

Khi đã làm xong các bước, build app lên device, chọn 1 bài hát, nhấn nút home , và bạn có thể thấy là nhạc vẫn được chơi mà không có 1 sự ngắt quãng nào ngay cả khi mà app được xây dựng ở chế độ background.

# Visualizing Music
Bạn đã cấu hình xong project, app đã có thể chơi nhạc cả ở chế độ background mode. Vậy bây giờ đây chính là bước cuối dùng, "visualize music" - thể hiện âm nhạc bằng sự thay đổi hình ảnh theo beat nhạc
## Cấu hình hệ thống UI Kit particles 
- Đầu tiên, thêm QuartzCore.framework vào project, tương tự như cách thêm AVFoundation.framework
- Tạo 1 file mới File/New/File…, sau đó chọn iOS/Cocoa Touch/Objective-C , đặt tên là VisualizerView - 1 class con của UIView, chọn Next - Create 
- Đổi tên file VisualizerView.m sang .mm. Extension .mm để thông báo cho Xcode biết file này cần được biên dịch như 1 file C++, điều này là cần thiết bởi vì sau đó chúng ta sẽ truy cập class MeterTable của C++
Thay thế nội dung file VisualizerView.mm bằng nội dung dưới đây
```
#import "VisualizerView.h"
#import <QuartzCore/QuartzCore.h>

@implementation VisualizerView {
    CAEmitterLayer *emitterLayer;
}

// 1
+ (Class)layerClass {
    return [CAEmitterLayer class];
}

- (id)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        [self setBackgroundColor:[UIColor blackColor]];
        emitterLayer = (CAEmitterLayer *)self.layer;

        // 2
        CGFloat width = MAX(frame.size.width, frame.size.height);
        CGFloat height = MIN(frame.size.width, frame.size.height);
        emitterLayer.emitterPosition = CGPointMake(width/2, height/2);
        emitterLayer.emitterSize = CGSizeMake(width-80, 60);
        emitterLayer.emitterShape = kCAEmitterLayerRectangle;
        emitterLayer.renderMode = kCAEmitterLayerAdditive;

        // 3
        CAEmitterCell *cell = [CAEmitterCell emitterCell];
        cell.name = @"cell";
        cell.contents = (id)[[UIImage imageNamed:@"particleTexture.png"] CGImage];

        // 4
        cell.color = [[UIColor colorWithRed:1.0f green:0.53f blue:0.0f alpha:0.8f] CGColor];
        cell.redRange = 0.46f;
        cell.greenRange = 0.49f;
        cell.blueRange = 0.67f;
        cell.alphaRange = 0.55f;

        // 5
        cell.redSpeed = 0.11f;
        cell.greenSpeed = 0.07f;
        cell.blueSpeed = -0.25f;
        cell.alphaSpeed = 0.15f;

        // 6
        cell.scale = 0.5f;
        cell.scaleRange = 0.5f;

        // 7
        cell.lifetime = 1.0f;
        cell.lifetimeRange = .25f;
        cell.birthRate = 80;

        // 8
        cell.velocity = 100.0f;
        cell.velocityRange = 300.0f;
        cell.emissionRange = M_PI * 2;

        // 9
        emitterLayer.emitterCells = @[cell];
    }
    return self;
}

@end
```

- Đoạn code trên cấu hình 1 hệ thống UIKit particle như sau:
1. Overrides layerClass để trả về CAEmitterLayer, cho phép view này hoạt động như 1 particle emitter
2. Thiết lập hình dáng của emiiter dạng hình chữ nhật, cho phép view này hoạt động như 1 particle emiiter
3. Tạo ra 1 CAEmitterCell mà render ra particles sử dụng ảnh particleTexture.png
4. Thiêt lập màu sắc cho particle
5. Thiết lập tốc độ tại đó mỗi thành vẫn về màu sắc sẽ thay đổi phụ thuộc vào thời gian tồn tại của particle
6. Thiết lập tỉ lệ khi tạo ra particle
7. Thiết lập thời gian mỗi particle sẽ tồn tại giữa .75 và 1.25 s, và thiết lập tạo ra 80 particles mỗi giây
8. Cấu hình emitter tạo ra particle với vận tốc khác nhau và toả ra bất kì hướng nào
9. Thêm emitter cell vào emitter layer
Tiếp theo, mở file ViewController.m và bổ sung các phần sau: 
```
//Add with the other imports
#import "VisualizerView.h"

//Add with the other properties
@property (strong, nonatomic) VisualizerView *visualizer;
```
Bây giờ trong hàm viewDidLoad, thêm đoạn code dưới đây trước hàm [self configureAudioPlayer]
```
self.visualizer = [[VisualizerView alloc] initWithFrame:self.view.frame];
[_visualizer setAutoresizingMask:UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth];
[_backgroundView addSubview:_visualizer];
```
Đoạn code này sẽ tạo 1 đối tượng của VisualizerView với size bằng size của parent view và sẽ là view con của _backgroundView ( view nằm dưới music control)
Build app, bạn sẽ thấy hệ thống các particle hoạt động ngay lập tức
![](https://images.viblo.asia/dc5df439-5f63-4921-a2ab-925305faaa2a.png)https://images.viblo.asia/dc5df439-5f63-4921-a2ab-925305faaa2a.png

## Hệ thống UI Kit particle "beats" theo điệu nhạc
Điều bạn muốn là các particle này "beat" theo điệu nhạc. Điều này sẽ được thực hiện bằng việc thay đổi kích thước của particle khi mà độ lớn decibel của âm nhạc thay đổi
Trước hết, mở file VisualizerView.h và thêm đoạn code dưới đây
```
//Add with the other imports
#import <AVFoundation/AVFoundation.h>

//Add within the @interface and @end lines
@property (strong, nonatomic) AVAudioPlayer *audioPlayer;
```

Property mới này sẽ giúp vizualizer của bạn truy cập vào audio player của app và sau đó là audio level, nhưng trước hết bạn cần thiết lập 1 vài thứ. Mở file ViewController.m, và tìm kiếm setNumberOfLoops. Thêm đoạn code sau đây  bên cạnh  [_audioPlayer setNumberOfLoops:-1];
```
[_audioPlayer setMeteringEnabled:YES];
[_visualizer setAudioPlayer:_audioPlayer];
```
Với đoạn code trên, bạn đã hướng dẫn đối tượng của AVAudioPlayer thiết lập chế độ đo lường dữ liệu, sau đó truyền  audioPlayer cho visualizer, từ đó n có thể truy cập được dữ liệu này
Mở file VisualizerView.mm và chỉnh sửa như sau:**

```
// Add with the other imports
#import "MeterTable.h"

// Change the private variable section of the implementation to look like this
@implementation VisualizerView {
    CAEmitterLayer *emitterLayer;
    MeterTable meterTable;
}
```
Đoạn code trên đây giúp bạn truy cập vào đối tượng của MeterTable tên là meterTable, trong đó bạn có thể sự dụng để xử lý audilo levels từ AVAudioPlayer
Bạn sẽ sử dụng MeterTable để convert giá trị trong khoảng từ 0 đến 1 và sau đó sử dụng giá trị mới này để điều chỉnh kích thước particles trong music visualizer. Thêm hàm sau đây trong VisualizerView.mm
```
- (void)update
{
    // 1
    float scale = 0.5;
    if (_audioPlayer.playing ) 
    {
        // 2
        [_audioPlayer updateMeters];

        // 3
        float power = 0.0f;
        for (int i = 0; i < [_audioPlayer numberOfChannels]; i++) {
            power += [_audioPlayer averagePowerForChannel:i];
        }
        power /= [_audioPlayer numberOfChannels];

        // 4
        float level = meterTable.ValueAt(power);
        scale = level * 5;
    }

    // 5
    [emitterLayer setValue:@(scale) forKeyPath:@"emitterCells.cell.scale"];
}
```
Mỗi một lần hàm này được gọi, n sẽ cập nhật kích thước particles của visualizer. 
1. Bạn có thể thiết lập giá trị mặc định là 0.5, sau đó kiểm tra audioPlayer có được chơi hay không?
2.  Nếu audio đang được phát, bạn có thể gọi hàm_audioPlayer. updateMeters, n sẽ refresh dữ liệu AVAudioPlayer dựa trên trạng thái hiện tại của audio.
3 - 4.  Sau đó bạn truyền giá trị power trùng bình vừa tính toán vào trong hàm ValueAt của meterTable. Kết quả trả về là giá trị từ 0 đến 1, sau đó nhân với 5 mà sử dụng kết quả này làm tỉ lệ
5. Cuối cụng tỉ lệ này sẽ được thiết lập thành tỉ lệ particles của emitter
Hiện tại thì app vẫn chưa gọi hàm update và phần code mới thêm vẫn chưa có chút tác dụng gì. Sửa hàm initWithFrame trong file VisualizerView.mm bằng việc thêm code ngay sau dòng emitterLayer.emitterCells = @[cell]; 
```
CADisplayLink *dpLink = [CADisplayLink displayLinkWithTarget:self selector:@selector(update)];
[dpLink addToRunLoop:[NSRunLoop currentRunLoop] forMode:NSRunLoopCommonModes];
```
Đây là nơi bạn thiết lập CADisplayLink. CADisplayLink là 1 timer, nó hoạt động như 1 NSTimer với khoảng thời gian là 1/60s
Bây giờ build app và run app,. Bạn sẽ chú ý là các particles sẽ thay đổi kích thước nhưng ko "beat" cùng âm nhạc. Đó là vì sự thay đổi này không thể tác dụng lên nhưng particle có sẵn trên màn hình, chỉ có các particles mới được thay đổi.

Open VisualizerView.mm and modify initWithFrame: as follows:
```
// Remove this line
    // cell.contents = (id)[[UIImage imageNamed:@"particleTexture.png"] CGImage];

    // And replace it with the following lines
    CAEmitterCell *childCell = [CAEmitterCell emitterCell];
    childCell.name = @"childCell";
    childCell.lifetime = 1.0f / 60.0f;
    childCell.birthRate = 60.0f;
    childCell.velocity = 0.0f;

    childCell.contents = (id)[[UIImage imageNamed:@"particleTexture.png"] CGImage];

    cell.emitterCells = @[childCell];
```
Tương tự như CAEmitterLayer, CAEmitterCell cũng có 1 thuộc tính tên là emitterCells. Điều này nghĩa là 1 CAEmitterCell có thể chứa CAEmitterCell khác. Kết quả là particle cũng có thể emit ra các particle khác.

Sau đó thay dòng cuối cùng trong hàm update 
```
[emitterLayer setValue:@scale forKeyPath:@"emitterCells.cell.scale"];  
```
Bằng dòng sau đây 
```
[emitterLayer setValue:@(scale) forKeyPath:@"emitterCells.cell.emitterCells.childCell.scale"];
```
Build và run,. Kết quả bạn nhận được sẽ là các particle sẽ beat theo nhạc.

![](https://images.viblo.asia/c5d88721-43e3-4713-9d7d-b929428e22a1.png)

Lý do là bởi vì các particles được tạo và huỷ cùng với tốc độ màn hình refresh. Điều đó nghĩa là khi màn hình này được vẽ lại, 1 tập các particles mới sẽ được sinh ra mà tập các particles trước đó sẽ bị huỷ. Bởi vì các particles mới luôn được tạo ra với kích thước được tính toán từ mức audio tại đúng thời điểm đó nên các particles này sẽ xuất hiện đúng với xung nhạc. 
Chúc mừng bạn, vậy là bạn đã tạo ra thành công 1 chương trình music visualization rồi đó
![](https://images.viblo.asia/01e83f48-cc54-4627-9bd8-495eee4fb661.png)
# Kết luận
Như vậy là chúng ta đã cùng nhau tìm hiểu các bước để tạo ra 1 music visualization rồi. Mặc dù phải trải qua khá là nhiều bước nhưng mình tin thành quả đạt được cũng khá là xứng đáng. Bạn đã có thể tự tạo ra 1 music visualization của chính mình rồi để vừa nghe nhạc vừa "xem" nhạc nữa. Thật sự khá là thú vị phải không nào?
- Các bạn có thể tải starter project và final project trên github của mình để tham khảo nhé 
https://github.com/oLeThiVanAnh/R3_2018
- Nguồn tham khảo :

https://deezer.io/real-time-music-visualization-on-the-iphone-gpu-579d631272d3
 https://stackoverflow.com/questions/5051549/how-to-create-simple-music-visualizer-of-an-iphone-app
 https://en.wikipedia.org/wiki/Music_visualization