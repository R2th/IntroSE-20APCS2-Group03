- Ngoài việc lên kế hoạch thiết kế giao diện ứng dụng, viết mã cho ứng dụng thì bạn vẫn còn đang thiếu một thứ gì đó. Đó chính là làm thế nào để bạn có thể kiếm tiền từ nó? Ở trong hoàn cảnh này mình đang nhắc tới là ứng dụng của bạn đang để miễn phí trên store. Phạm vi bài viết này mình không đề cập tới ứng dụng trả phí vì ngoài việc các bạn để ứng dụng của các bạn là mất phí thì các bạn vẫn có thể kiếm tiền từ quảng cáo bằng cách hiển thị quảng cáo trong ứng dụng của các bạn.

- Hiện nay, xu hướng của các ứng dụng là cho phép người dùng tải xuống một cách miễn phí và cung cấp các dịch vụ ngay trong ứng dụng, đồng thời kiếm tiền từ các dịch vụ đó. Nếu ứng dụng của bạn không thực sự hữu ích, không thực sự đáng giá và không được xếp hạng tốt thì việc bạn để người dùng phải trả phí ngay từ lúc tải ứng dụng là không nên vì khi đó sẽ chẳng có ai tải ứng dụng của bạn cả. Vì vậy bạn có thể kiếm tiền bằng cách viết ứng dụng miễn phí và hiển thị quảng cáo trong ứng dụng, kiếm tiền từ việc hiển thị quảng cáo đó.

- Hiện nay có rất nhiều mạng phân phối quảng cáo như Abmob, iAd, facebook audience network, Aplovin... Đây là một số mạng phân phối quảng cáo bạn thường dùng. Hôm nay mình sẽ chia sẻ một chút về iAd (quảng cáo được phân phối bởi Apple).

- Việc quyết định về loại ứng dụng (trả tiền hay miễn phí) ngay từ khi bạn triển khai ứng dụng sẽ rất thực tế. Với ứng dụng mất phí các bạn không cần phải làm gì đặc biệt ngoài việc phát triển các dịch vụ trong nó. Với ứng dụng miễn phí mất tiền thì các bạn phải xác định quảng cáo sẽ xuất hiện ở đâu cho phù hợp. Nói về vị trí quảng cáo thì nên đặt ở đầu hoặc cuối giao diện màn hình của bạn, hay nói cách khác là ngay trên đầu hoặc dưới cùng của màn hình. Với các mạng phân phối quảng cáo khác mình thì sẽ có những quy định hay chính sách khác. Riêng với iAd của Apple thì hiển thị quảng cáo bất kì nơi nào khác trong chế độ xem thì nguyên tắc về giao diện sẽ bị vi phạm và khi đó Apple sẽ từ chối quảng cáo của bạn.

- Bên cạnh vị trí quảng cáo trên thì còn có một vài quy tắc mà bạn cần phải lưu ý. Thứ nhất đừng bao giờ mong đợi rằng quảng cáo luôn có sẵn, các vấn đề về mạng, máy chủ khác nhau, vị trí của bạn, thời gian, địa điểm... rất nhiều thứ để quyết định ứng dụng bạn sẽ nhận được quảng cáo nào. Nếu trong trường hợp bạn không nhận được quảng cáo thì việc bạn thay đổi giao diện, có thể là hiển thị nội dung khác hoặc ko hiển thị phần hiện quảng cáo, nó sẽ rất hay và không gây khó chịu cho người dùng và đó được coi là ý tưởng tốt. Và điều đó phụ thuộc vào bạn. Thứ hai, đó là việc hiển thị quảng cáo không được che khuất bở các nội dung khác.

- Về doanh thu thì cả Apple và bạn đều hưởng lợi khi người dùng click vào quảng cáo. Tỉ lệ sẽ là 7:3, nó tương tự như ứng dụng trả phí các bạn nhé.

- Trong bài viết này mình sẽ chia sẻ về việc làm thế nào để hiển thị quảng cáo được phân phối bởi Apple.

**Nội dung bao gồm**:
- Sử dụng framework iAd. Đây là điều kiện tiên quyết để cài đặt quảng cáo.
- Thêm một banner quảng cáo vào phía dưới của màn hình hiển thị. Nếu không có quảng cáo sẽ ẩn quảng cáo đi cho tới khi có quảng cáo để hiển thị.

### Tạo project 
- Đầu tiên bạn tạo một project với tên iAdDemo dưới dạng Single View Application
![](https://images.viblo.asia/fc08ff29-fb2a-462b-bc7e-2ee1b39e6702.png)

- Giao diện ứng dụng sẽ thực sự rất đơn giản bao gồm:

    - Một label hiển thị ở giữa màn hình (phần này đại diện cho nội dung ứng dụng của bạn)
    - Một quảng cáo bên dưới của màn hình.

- Các bạn có thể tham khảo. Ở đây mình không đề cập tới phần nội dung ứng dụng của bạn. Chúng ta sẽ tập trung vào phần banner view nhé.
- Kích thước quảng cáo mình đang để là 320x50. Phần kích thước cũng là một phần rất quan trong, trước đây khi setup admob mình không để đúng chiều rộng, hậu quả là quảng cáo không hiện, trong khi đó thay id test thì vẫn hiển, mặc dù vậy phần consolog không thông báo gì cho mình là sai kích thước, mất rất nhiều thời gian mình mới biết là kích thước quảng cáo không đúng. Lúc đó đổi về đúng kích thước thì hiển thị luôn.

![](https://images.viblo.asia/056245fb-82f1-4ab0-b62e-40ca1fdfc48d.png)

- Về kích thước quảng cáo các bạn có thể tham khảo tại đây [Kích thước quảng cáo](https://developer.apple.com/documentation/iad/adadtype/adadtypebanner?changes=_5&language=objc)

### Chuẩn bị

- Bạn hãy connect outlet cho ADBannerView (phần màu xanh) sang file header (ViewController.h) nhé. Bạn có thể tham khảo code bên dưới.

```Objective-C
//
//  ViewController.h
//  iAdDemo
//
//  Created by ngodacdu on 8/18/18.
//  Copyright © 2018 ngodacdu. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <iAd/iAd.h>

@interface ViewController : UIViewController <ADBannerViewDelegate>

@property (weak, nonatomic) IBOutlet ADBannerView *adBanner;

@end
```

- Bước tiếp theo là bạn cần add iAd framework nhé, không là nó báo lỗi đó. Hãy xem hình ảnh sau:

![](https://images.viblo.asia/b8593205-b365-4097-8a18-25a10910e75c.png)

- Sau khi bạn thêm thành công:

![](https://images.viblo.asia/4836beae-d45d-49ab-be28-a2ff5d957fdd.png)

- Các bạn có thể để ý, trong file header bên trên mình có import thêm **#import <iAd/iAd.h>** đó là công việc bạn phải làm để có thể khai báo:

```Objective-C
@property (weak, nonatomic) IBOutlet ADBannerView *adBanner;
```

### Load quảng cáo

- Hãy gán delegate cho ViewController để nhận các thông báo trở lại khi quảng cáo được load, hoặc lỗi ...
- Hãy tham khảo
```Objective-C
//
//  ViewController.m
//  iAdDemo
//
//  Created by ngodacdu on 8/18/18.
//  Copyright © 2018 ngodacdu. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    
    // Make self the delegate of the ad banner.
    self.adBanner.delegate = self;
    
    // Initially hide the ad banner.
    self.adBanner.alpha = 0.0;
}

@end
```
- Ở đây khi quảng cáo chưa được load mình sẽ set cho alpha là 0. Khi nhận được delegate thông báo về là load được quảng cáo mình sẽ set nó thành 1 sau. Việc ẩn quảng cáo bằng cách set alpha không phải là cách duy nhất, các bạn có thể thay đổi chiều cao, hay set hidden, hay remove from supper view cũng đc.
- Một số delegate phục vụ cho bạn

```Objective-C
// Banner view will load
// Thông báo răng quảng cáo sắp được tải
- (void)bannerViewWillLoadAd:(ADBannerView *)banner {
    NSLog(@"[ViewController] bannerViewWillLoadAd.");
}

// Banner view did load
// Thông báo rằng quảng cáo đã được tải
- (void)bannerViewDidLoadAd:(ADBannerView *)banner {
    NSLog(@"[ViewController] bannerViewDidLoadAd.");
    
    // Hiển thị quảng cáo
    [UIView animateWithDuration:0.5 animations:^{
        self.adBanner.alpha = 1.0;
    }];
}

// banner load fail with error
// Khi việc load quảng cáo gặp lỗi
- (void)bannerView:(ADBannerView *)banner didFailToReceiveAdWithError:(NSError *)error {
    NSLog(@"[ViewController] didFailToReceiveAdWithError: %@", error.description);
}

// banner View Action Should Begin
// Phương thức này sẽ được gọi khi người dùng chạm vào biểu ngữ và quảng cáo sẽ được hiển thị ở chế độ kích thước đầy đủ
// Khi nó xảy ra thì mọi tác vụ sẽ dừng lại cho tới khi màn hình quảng cáo full này bị loại bỏ
// Nếu bạn return YES thì màn hình full sẽ được hiển thị
// Nếu bạn return NO thì không có gì xảy ra khi chạm vào quảng cáo
- (BOOL)bannerViewActionShouldBegin:(ADBannerView *)banner willLeaveApplication:(BOOL)willLeave {
    NSLog(@"[ViewController] willLeaveApplication.");
    return YES;
}

// banner view action did finish
// Nó được gọi khi màn hình quảng cáo full được loại bỏ
- (void)bannerViewActionDidFinish:(ADBannerView *)banner {
    NSLog(@"[ViewController] bannerViewActionDidFinish.");
}
```

- Kết quả là bạn sẽ thấy:

| Load thành công | Load fail |
| -------- | -------- |
|    ![](https://images.viblo.asia/e47dd0e3-42c0-4217-998e-95bf9f8e8b2c.png)  |   ![](https://images.viblo.asia/c955072d-4141-43e1-b772-dc1737f6f7a2.png)   |

- Trường hợp load fail có thể do bạn chưa enable iAd trên tài khoản itunes connect của bạn. Trong giới hạn bài viết này mình bỏ qua phần đó, các bạn có thể tự tìm kiếm để request contract về iAd.

### Tổng kết lại: 
- Mình có thử setup Admob, FacebookAudience và iAd thì thấy Admob mọi thứ rất dễ dàng để cài đặt nhưng Admob thì lại rất hay ban account và nhiều khi bạn nhận được email thông báo bị ban mà không biết lý do là gì (tức là vi phạm chính sách nhưng không rõ vi phạm mục nào khiến bạn rất khó xử lý, ngay cả khi bạn phản hồi lại cho họ). Các bạn hãy tự mình cài đặt để có thể biết được nên dùng cái nào nhé.
- Có một sự khác biệt là với iAd bạn sẽ không thấy hàm load và bạn không cần bận tâm tới việc load nhiều gây bị ban account vì lý do traffic
- Còn lại cả Admob và FacebookAudience thì đều có. Vậy bạn cần phải quan tâm hơn tới chính sách của họ để load cho hợp lý nhé.