### OpenCV là cái gì? 
Nó là một thư viện được viết bằng C ++. Sử dụng với Objective-C chắc dễ nhai hơn so với Swift, nhưng với thực tế sử dụng thư viện C ++ trong Swift thì không hề khó. Đây là những gì chúng tôi sẽ làm:

![](https://images.viblo.asia/b1d3bf5e-c52a-4a5e-8448-3555cf33ac1f.png)

### Step 1 — Download the OpenCV framework for iOS
Tìm và tải về version mới nhất tại đây hiện tại  là bản 4.11 http://opencv.org

### Step 2 — Create a new iOS project
Mở xcode tạo 1 project Import OpenCV vào project cho nhanh hoặc có cách khác bạn dùng podfile: `pod 'OpenCV'` nếu thích ở đây mình import thẳng cho nhanh

### Step 3 — Create a bridging header
Tạo thằng này để khỏi mất công `#import "OpenCVWrapper.h"` vào từng file  vì bắt buộc phải import vào mới dùng được thư viện OpenVC
Làm theo bước sau:
Create an Objective-C file by going to File > New > File (or ⌘N) and in iOS > Source, select Cocoa Touch Class.

![](https://images.viblo.asia/341cac01-2ea1-4289-8a22-935e19c3b3a4.png)

![](https://images.viblo.asia/a45dae4a-c911-42ff-ab6c-7e5912d8520e.png)

Click on Create Bridging Header.
![](https://images.viblo.asia/6ad82483-8bda-46d3-a280-ec8c3cf4b735.png)

OK sau khi tạo xong thì có 3 file : OpenCVWrapper.h, OpenCVWrapper.m and tenproject-Bridging-Header.h
    
![](https://images.viblo.asia/d6707d3e-04f1-427e-81bd-ad17e0d959ae.png)

Configure the bridging header: Thêm `#import "OpenCVWrapper.h"` vào file -Bridging-Header.h

### Step 4 — Change to Objective-C++
Để sử dụng Objective C ++, chúng ta phải thay đổi thành Objective-C ++. Điều này được thực hiện bằng cách thay đổi phần mở rộng của OpenCVWrapper.m thành OpenCVWrapper.mm. Sau đó import thư viện vào file  .mm của mình: `#import <opencv2/opencv.hpp>`
Do chính sách của Apple’s Macro bạn cần nhập `<opencv2 / opencv.h> `trước mọi thứ để không báo lỗi 
:v: 
Để làm cái này , hãy tạo `header file `tên `Prefix.h` (Về cơ bản, nó nhập cái mình cần trước khi mọi thứ được tải phù hợp với cái chính sách của Apple’s Macro :v).
Tìm `“Prefix Header” `  “$(PROJECT_DIR)/[Project Name]/Prefix.h”.

### Step 5 — Write a test method

Tạo 1 hàm Objective-C ++ đơn giản, nhưng để giúp chúng ta viết ít mã hơn, hãy để sử dụng namespace  std  sẽ cho phép chúng ta in nội dung trong console. Thêm phần này bên dưới phần #import. `using namespace std;`

```
@interface OpenCVWrapper : NSObject
- (void)isThisWorking;
@end
```

OpenCVWrapper.h 

```

@implementation OpenCVWrapper
- (void) isThisWorking {
    
}
@end
```

```
@implementation OpenCVWrapper
- (void) isThisWorking {
    cout << "Hey" << endl;
}
@end
```

### Final Step — Call our method from Swift
```
override func viewDidLoad() {
    super.viewDidLoad()
    let openCVWrapper = OpenCVWrapper()
    openCVWrapper.isThisWorking()
}
```
Check console =))
Bây giờ bạn có thể tự do sử dụng lib OpenCV trong các dự án Swift của mình :v 

Nguồn: https://medium.com/@borisohayon/ios-opencv-and-swift-1ee3e3a5735b