# Tạo một framework trong iOS
## Mở đầu
Bạn đã bao giờ muốn chia sẻ code của mình giữa hai hoặc nhiều dự án, hoặc chia sẻ cho các lập trình viên khác?

Hoặc có thể bạn muốn mô hình hoá code của giống như cách mà iOS SDK chia các API của nó thành các function, hoặc cũng có thể bạn muốn chia sẻ code của mình giống như một thư viện cho bên thứ 3.

Bài hướng dẫn sau đây mình sẽ hướng dẫn từng bước để thực hiện các mong muốn như trên. Đó gọi là Framework!

Framework có mục đích chính sau:

* Đóng gói code
* Modun hoá code
* Sử dụng lại code

Bạn có thể chia sẻ framework của mình cho các ứng dụng khác, các thành viên khác trong dự án.

Các mục chính của bài hướng dẫn bao gồm:

* Tạo framework
* Tích hợp vào code có sẵn

## Tạo framework

Mình tạo 1 framework đơn giản là custome UILabel 

### Bước 1: Tạo một project cho framework

1. Trong Xcode, vào File ▸ New ▸ Project
2. Chọn iOS ▸ Framework & Library ▸ Cocoa Touch Framework

![](https://images.viblo.asia/034c50d2-5007-4845-96bb-a5895a99fdb1.png)

3. Chọn Next
4. Điền tên framework

Ở đây mình đặt tên là FrameworkDemo

![](https://images.viblo.asia/b72f825d-8427-48f6-9d16-8bb8f94078a7.png)

5. Chọn Next
6. Chọn thư mục để project
7. Chọn Create

Vậy là chúng ta đã tạo xong một framework!

### Bước 2: Thêm code vào framework

Ở đây mình tạo một hàm đơn giản để custom UILabel giống như tạo trên project bình thường

Trong file MyLabel.h

```
@interface MyLabel : UILabel
- (void) setText;
@end
```

Trong file MyLabel.m

```
#import "MyLabel.h"

@implementation MyLabel

-(void) setText {
    self.text = @"Hello";
}
@end
```

Nhớ để public MyLabel bằng cách chọn MyLabel.h ▸ bên inspector bên tay phải, trong mục Target Membership chọn public
![](https://images.viblo.asia/3e1cb135-4661-4010-9efd-715b0abcb905.png)

Trong file FrameworkDemo.h import module mình vừa tạo như sau:

![](https://images.viblo.asia/e2365879-1828-4b8c-b495-2521260d3825.png)

Xong xuôi chúng ta run project, sau khi run thành công sẽ xuất hiện file .framework trong thư mục Products như sau:

![](https://images.viblo.asia/77bd25ec-9806-4786-b0cc-b69e74723968.png)

## Nhúng framework vào project

Trong một project khác (mình tạo project mới có tên là TestFW) , chúng ta sẽ tích hợp framework vừa tạo để sử dụng Label vừa tạo như sau

1. Chọn File ▸ Addd File to "TestFW"

![](https://images.viblo.asia/5a106b8a-2a9f-44a3-a209-29bd8035a107.png)

Add file FrameworkDemo.xcodeproj vào

2. Mở project editor của TestFW ▸ chọn target ▸ chọn tab General ▸ Add framework vào Embedded Binaries and Linked Frameworks and Binaries.

![](https://images.viblo.asia/a489cf5b-acba-409f-b9f6-24d35cd228c2.png)

Vậy là xong bước nhúng framework vào project, giờ chúng ta có thể sử dụng được MyLabel trong project TestFW.

Trên đây mình đã thực hiện xong các bước tạo framework và tích hợp framework vào project để sử dụng. Cảm ơn mọi người đã đọc!

Link tham khảo: https://www.raywenderlich.com/5109-creating-a-framework-for-ios