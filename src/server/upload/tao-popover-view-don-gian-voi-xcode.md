Chắc hẳn đôi khi làm các dự án cho khách hàng, đôi khi chúng ta cần phải thực hiện custom một popup để show ra dữ liệu giống với design. Trong bài viết này mình sẽ chia sẻ cách để tạo ra một popover view đơn giản chỉ với vài dòng code và storyboard.
Mình sẽ tạo ra một popover view giống như hình dưới đây:
![](https://images.viblo.asia/2f23bbaf-8517-491e-9eeb-5b320cc97a80.png)
### Bắt đầu tạo project xcode
Đầu tiên, mình sẽ tạo một project (các bạn có thể đặt tên tuỳ ý). Mình đặt tên cho project của mình là: ExamplePopoverView.
Sau đó, mình sẽ sử dụng storyboard để kéo thả UI như hình dưới đây: 
Các bạn có thể kéo popover view kia vào trực tiếp trong main view hoặc kéo nó vào thanh ngang phía trên (chắc nó là thanh tiêu đề của vc)
![](https://images.viblo.asia/11cf341c-5f5a-484c-8b47-a2cb7c6e06ca.png)
### Hiển thị popover view
Tiếp theo, mình sẽ mở file viewcontroller lên và tiến hành kéo outlet cho popover view và các button để xử lý action
![](https://images.viblo.asia/27a7447e-372b-4d28-81ea-90ff4edcf0fd.png)
Như trong hình phía trên thì mình có add thêm một button có tên là: Btn Hide Popover. Button này sử dụng để thực hiện hành động ẩn đi popover view khi người dùng click ra ngoài phạm vi của popover view.

```
@IBOutlet weak var btnHidePopover: UIButton!
@IBOutlet var popoverView: UIView!
```

Và đây là action
```
@IBAction func showDetail(_ sender: Any) {
        self.popoverView.center = self.view.center
        self.btnHidePopover.isHidden = false
        UIView.transition(with: self.view,
                          duration: 0.2,
                          options: [UIView.AnimationOptions.transitionCrossDissolve],
                          animations: {
                            self.view.addSubview(self.popoverView)
                       
        },
                          completion: { (_) in
                            
        })
        
    }
    
    @IBAction func doDone(_ sender: Any) {
        self.btnHidePopover.isHidden = true
        self.popoverView.removeFromSuperview()
    }
```

- Function showDetail chính là sự kiện khi user chọn button "Xem chi tiết". Ở function này mình xử lý add popover view vào main view, thiết lập popover view vào center. Sau đó thêm 1 chút transition cho đẹp.
- Func doDone chính là sự kiện khi user chọn  button "Đóng" trên popover view. Ở function này mình xử lý ẩn đi background màu xám phía dưới của popover view. Sau đó là xoá đi popover view khỏi superview.
### Kết
Mình xin dừng bài viết này tại đây.
Tuy cách sử dụng này khá đơn giản nhưng mình vẫn muốn viết bài này để cùng chia sẻ cách làm của bản thân. Cảm ơn mọi người đã đọc bài
Link github project: https://github.com/dungkv95/PopoverView