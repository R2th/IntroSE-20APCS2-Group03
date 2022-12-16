## Tìm hiểu khả năng tương thích của Swift và Objective-C
Với sự ra đời của Swift vào năm 2014, nhiều tổ chức đang cố gắng chuyển đổi  nguồn của họ từ Objective C sang Swift. 
Nhưng với những hệ thống quá lớn để chuyển đổi, cần có khả năng tương tác giữa Swift và Objective C. 
Đối với những người đang bắt đầu một dự án mới, họ có thể trực tiếp nhảy vào Swift nhưng nhiều thư viện vẫn dùng Objective C. 
Vì vậy, không có tùy chọn nào khác ngoài việc sử dụng cả hai ngôn ngữ trong một thư viện / dự án duy nhất. Trong bài viết này, mình sẽ giới thiệu cho mọi người về các sự tương tác Objective-C trong Swift | Swift trong Objective C trong các đoạn code mẫu và một số ví dụ.

![](https://images.viblo.asia/ada2bd65-8690-4983-bbcd-908f28836b40.png)

Trước tiên, bạn cần tải xuống project ví dụ để bắt đầu thực hành: [https://github.com/mushtaque87/SwiftObjC](https://github.com/mushtaque87/SwiftObjC)
### Objective C trong Swift
Giả sử bạn đã tạo Dự án SwiftObjC mới. Và chúng tôi cần đưa 1 class Objective C / Tệp TestObjC.h vào dự án nhanh chóng.
Tạo một tệp .m mới trong dự án
![](https://images.viblo.asia/ae67bbaf-8aff-41f5-8394-0de9951fb2a7.png)

Chọn Create Bridging Header.
![](https://images.viblo.asia/03f0e63c-352f-4d8c-8dec-bbf71c62b6c7.png)

Sau các bước trước, chúng ta có thể thấy cả hai file TestObjC.m và SwiftObjC-Briging-Header.h trong cấu trúc thư mục:

![](https://images.viblo.asia/434350a0-527d-4b0d-a698-e27d13b499d7.png)

Bây giờ thêm dòng code này trong tệp SwiftObjC-Briging-Header.h.
```
#import "TestObjC.h"
```

Bây giờ chúng ta sẽ thêm file .h (File giao diện) trong dự án.
Chọn File -> Chọn tệp .h  đặt tên nó là TestObjC.h rồi thêm đoạn code sau:

```
#import <Foundation/Foundation.h>
@interface TestObjC : NSObject
@property (strong, nonatomic) id testProperty;
- (void) testMethod;
@end
```

Vì vậy, bây giờ chúng ta có tất cả các đoạn code và cầu nối để sử dụng các thuộc tính và phương thức Objective C trong Swift. Trong bất kì class Swift nào mà bạn muốn sử dụng code Objective C và truy cập các thuộc tính và phương thức như sau:
```
let testObjC : TestObjC = TestObjC()
testObjC.testProperty = "Hello ObjC"
print(testObjC.testProperty!)
testObjC.testMethod()
```

Trình biên dịch Swift sẽ tự động nhập các lớp Objective C vào các lớp swift.
### Swift trong Objective-C
Sẽ hơi khó khăn 1 chút vì chúng ta đang đi ngược, nhưng đừng lo lắng, hãy bắt đầu nào!
Tạo 1 Objective C profiect (ObjcSwift) và thêm file Swift (TestSwift.swift). Khi thêm file, bạn cũng sẽ được nhắc tạo file bridging header.h như trên. Chọn Create a Bridging Header 
Bây giờ cấu trúc thư mục dự án sẽ như thế này:

![](https://images.viblo.asia/09af7690-01f2-4e0f-abc1-1bfa84f825b5.png)


Trong trường hợp này, bạn không cần phải thêm bất kỳ mã nào trong file Bridging header.h cả.
Bây giờ, hãy thêm các dòng mã này vào file Swift vừa tạo:
```
import Foundation
public class TestSwift : NSObject {
public var testProperty: Any = "Some Initializer Val"
override init() {}
@objc(testsFunction:)
public  func testsFunction(someArg:AnyObject)  {
   let returnVal = "You sent me \(someArg)"
   print(returnVal)
  }
}
```

Nếu bạn muốn sử dụng bất kỳ file Objective C, bạn phải nhập <ProductModuleName-Swift.h> trong tệp ObjectiveC (.m). Bạn có thể tìm thấy productModuleName trong phần Build Settings

![](https://images.viblo.asia/89dadbb6-51ad-48a5-a319-8f05e6ef01c8.png)


Trình biên dịch swift khi xây dựng dự án tạo ra một tệp .h giao diện cho các class swift không hiển thị.
Bạn có thể thấy giao diện tuân thủ này bằng Command + vào dòng này:

```
#import "ObjCSwift-Swift.h" 
```

Cuộn đến cuối và bạn có thể thấy lớp tùy chỉnh và biến như thế này:

![](https://images.viblo.asia/e341ff16-449b-4298-b357-c5ebbedb4cd7.png)

Bây giờ trong File Objective C, bạn có thể sử dụng triển khai file Swift như thế này:

```
#import "ObjCSwift-Swift.h"
@interface ViewController ()
@end
@implementation ViewController
- (void)viewDidLoad {
[super viewDidLoad];
// Do any additional setup after loading the view.
TestSwift* swiftObj = [[TestSwift alloc] init];
[swiftObj testsFunction:@"Hello Swift"];
}
```

Quay trở lại file TestSwift.swift của bạn, bạn có thể thấy mã qua phương thức testFunction:
```
@objc(testsFunction:)
```

Điều này rất quan trọng vì Objective C không hiểu các lớp Swift cấp cao. Dòng này sẽ tạo giao diện như trong ảnh chụp màn hình ở trên trong tệp swift.h được biên dịch trước mà Objective C hiểu và có thể gọi. Nếu dòng này bị thiếu thì bạn có thể nhận lỗi sau.

![](https://images.viblo.asia/da553ff4-e3f7-425e-aa5c-f00d0422a1b4.png)


Để biết thêm thông tin tham khảo các tài liệu Apple này:
https://developer.apple.com/documentation/swift/imported_c_and_objective-c_apis/importing_swift_into_objective-c#overview