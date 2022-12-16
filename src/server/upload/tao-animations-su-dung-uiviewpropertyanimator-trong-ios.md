- Bất cứ một ứng dụng nào thì hiệu ứng cũng là một tiêu chí giúp đánh giá hay giữ chân người dùng. 
- Có nhiều cách để tạo animations trong iOS, phổ biến nhất là:
**UIView.animate(withDuration:animations:)**
- Bạn cũng có thể sử dụng **CABasicAnimation**

Trong bài hôm nay mình sẽ giới thiệu cho các bạn về **UIViewPropertyAnimator**. Class này giúp chúng ta kiểm soát animations nhiều hơn lớp tiền nhiệm **UIView.animate**. Với nó bạn có thể làm nhiều thứ hơn như custom time, interactive, hay bạn có thể pause/stop animations trong lúc nó đang hoạt động - thứ mà rất khó với lớp tiền nhiệm của nó.

Nghe thì có vẻ phức tạp nhỉ, cơ mà đừng lo lắng về nó, đơn giản lắm.

# Starting with UIViewPropertyAnimator
- **UIViewPropertyAnimator** có từ iOS 10 trở đi. Nó cho phép bạn tạo animations theo phong cách hướng đối tượng. Hãy cùng xem một ví dụ về animation được tạo bởi **UIViewPropertyAnimator**

![](https://images.viblo.asia/8d4b1a24-1ab6-4ba5-ba5f-501ed8976808.gif)

- Để làm điều đó rất đơn giản, chỉ cần đoạn code như sau

```
// Với UIView.animate
UIView.animate(withDuration: 0.3) {
    view.frame = view.frame.offsetBy(dx: 100, dy: 0)
}

// Với UIViewPropertyAnimator
let animator = UIViewPropertyAnimator(duration:0.3, curve: .linear) {
     view.frame = view.frame.offsetBy(dx:100, dy:0)
 }
 animator.startAnimation()
```

- Nếu bạn muốn test animations thì chỉ cần tạo file Playground và chạy đoạn code trên thôi.

![](https://images.viblo.asia/1cc9e68d-1322-4231-bb4b-d552597f6eb1.png)

- Nhìn thì có vẻ không có gì khác nhau nhiều, nó chỉ đơn giản là một cách mới để tạo ra animations. **UIViewPropertyAnimator** trở lên tiện hơn khi bạn muốn tương tác với animations thôi, còn tiện thế nào thì bạn đọc tiếp bên dưới nhé.

# Interactive and interruptible animations

- Các bạn có nhớ những gesture đơn giản như slide to unlock, swipe from bottom, swipe from top không? Đó là những ví dụ đơn giản và rất hoàn hảo trong việc tương tác và làm gián đoạn trong khi animations đang diễn ra. Bạn có thể start việc di chuyển ngón tay hay dừng tay lại hay việc thả tay ra và xử lý animations ngay tại thời điểm đó.
- Với người tiền nhiệm của nó thì việc control các điều đó quả là thứ xa xỉ. Bạn không thể cung cấp một cách dễ dàng tỉ lệ phần trăm animations đã hoàn thành. Bạn không thể tạm dừng lại animations khi mà nó đang diễn ra. Ví dụ khi thanh progress bạn set giá trị 1.0 cho nó và thực hiện animate cho nó thì nó cứ chạy tới 1.0 mới dừng lại và bạn không có cách nào để cho nó dừng lại ở một vị trí nửa vời. Giả sử progress chạy tới 30%, bạn tap vào thì dừng lại ở vị trí đó. Thật khổ sở...
- Nhưng với **UIViewPropertyAnimator** việc đó trở lên dễ dàng hơn rất nhiều.

# Preparing the Starter Project
- Ở đây mình chuẩn bị 1 project với 1 thanh progress view như hình dưới

![](https://images.viblo.asia/bdb97cec-71ae-4605-a666-b606fac70445.png)

- Mục đích của bài viết này là mình sẽ sử dụng **UIViewPropertyAnimator** để cho thanh progress kia chạy từ 0 tới 1 và có thể **dừng lại** hoặc **tiếp tục** chạy mỗi khi tap vào view của controller.
- Nếu bạn sử dụng UIView.animate thì sẽ cực kì khó khăn, nhưng với animator này thì lại rất đơn giản.
- Trong **ViewController.m** khai báo một số property như sau:
```
@property (weak, nonatomic) IBOutlet UIProgressView *progressView;
@property (nonatomic, retain) UIViewPropertyAnimator *animator;
@property (nonatomic, assign) BOOL isRunning;
```

- Khởi tạo một vài thứ:
```
- (void)viewDidLoad
{
    [super viewDidLoad];
    self.isRunning = NO;
    [self.progressView setProgress:0.f];
    UITapGestureRecognizer *gestureRecognizer = [[UITapGestureRecognizer alloc] initWithTarget:self
                                                                                        action:@selector(didTapView)];
    [self.view addGestureRecognizer:gestureRecognizer];
}
```
- Ở đây mình có tạo 1 gesture cho view của controller để bắt action khi bạn tap vào view đó.

# Running property animator with duration
- Công việc đầu tiên là gán lại cho thằng progress view về 0
- Khởi tạo và start luôn cái animation sử dụng UIViewPropertyAnimator

```
- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
    self.isRunning = YES;
    self.animator = [UIViewPropertyAnimator runningPropertyAnimatorWithDuration:10.f
                                                                          delay:0.f
                                                                        options:UIViewAnimationOptionCurveEaseInOut
                                                                     animations:^{
                                                                         if (self.isRunning) {
                                                                             [self.progressView setProgress:1.0f
                                                                                                   animated:YES];
                                                                         } else {
                                                                             [self.progressView setProgress:self.animator.fractionComplete
                                                                                                   animated:YES];
                                                                         }
                                                                     }
                                                                     completion:^(UIViewAnimatingPosition finalPosition) {

                                                                     }];
    [self.animator startAnimation];
}
```
- Đồng thời giá trị isRunning được bắt đầu là YES 
- Ở đây mình giải thích một chút: 
    - Tổng thời gian chạy là 10s
    - Option là dạng UIViewAnimationOptionCurveEaseInOut
    - Trong block animations nếu đang ở trạng thái running thì cứ cho nó animate progress view tới giá trị 1. Còn ngược lại thì bạn gán nó bằng giá trị fractionComplete (đây chính là tỉ lệ % animations đã được thực hiện)

# Xử lý pause/start animations
```
- (void)didTapView
{
    self.isRunning = !self.isRunning;
    if (self.isRunning) {
        [self.animator startAnimation];
    } else {
        [self.animator pauseAnimation];
    }
}
```
- Khi bạn tap vào view của controller thì cần có biến trạng thái (ở đây là isRunning) 
    - Nếu nó đang chạy thì dừng lại (pause) **pauseAnimation**
    - Nếu đã dừng lại rồi thì start **startAnimation**

- Khi start được call sau khi pause thì nó sẽ được tiếp tục từ trạng thái đã dừng trước đó.


Cuối cùng đây là kết quả:

![](https://images.viblo.asia/b2646205-29e3-433e-912e-cc7e9cbc7e8e.gif)