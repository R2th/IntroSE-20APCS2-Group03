Có khi nào bạn lướt qua một ứng dụng iOS và thấy những animation thú vị, bạn tự nhủ "Mình có thể ứng dụng cái này nhưng nó nhìn có vẻ phức tạp". Trong bài viết này tôi sẽ giúp bạn sử dụng một số animation đơn giản mà không cần phải dùng đến bất kì một framework nào khác, bạn sẽ thấy nó không phức tạp như bạn nghĩ đâu.

Đầu tiên bạn hãy tạo một project mới, đặt tên là IOS - Animation.

![](https://images.viblo.asia/6a4ecd42-dde9-4e6e-ac7b-7d8fa20f0760.png)

Tiếp theo bạn hãy mở ``Main.storybroad``,  thêm vào View ba thứ: Label, Textfield và Button.
Sau đó bạn hãy kéo constraint cho từng thứ mà bạn vừa thêm vào nhé: ``top``,  ``height``,  ``width`` và quan trọng nhất là ``Center Horizontally in Safe Area``. 
![](https://images.viblo.asia/00e2f6c3-474c-47b6-88b2-b1e166e2bdf3.png)


Kế đến bạn hãy kéo Outlet cho ``Center Horizontally in Safe Area`` của từng thứ vào ViewController nhé.

![](https://images.viblo.asia/4a662f3b-813a-44cf-a4e1-da3b696071b2.png)

Bạn chọn nút có hai hình tròn để show ViewController.

![](https://images.viblo.asia/afef6ae6-b003-4b08-b70b-8fea47b85b1e.png)

Bạn có thể kéo từ View hoặc kéo từ Menu phía bên trái.

![](https://images.viblo.asia/9374f3bf-08c9-4431-bc93-d6dbaa96c41a.png)

Vậy là chúng ta đã chuận bị xong ,bước tiếp theo bạn hãy mở file ViewController
Ở dưới hàm ``viewdidload()`` hãy thêm hàm ``viewWillApear(animated:)`` sau vào.

```
override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)
}
```

trong hàm này hãy thêm các dòng sau để set lại constraint cho các những thứ trên View của chúng ta

```
labelConstraint.constant -= view.bounds.width
textfieldConstraint.constant -= view.bounds.width
buttonConstraint.constant -= view.bounds.width
```

Khi bạn Run thử sẽ chỉ thấy một View trắng trơn vì chúng ta chưa hoàn thành setup animation.

Tiếp theo bạn hay thêm hàm ``viewDidAppear(animated:)`` ngay dưới hàm ``viewWillApear(animated:)`` vừa rồi.

```
override func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(animated)
}
```

sau đó bên trong hàm ``viewDidAppear(animated:)`` bạn có thể gọi animation method bằng cách gõ ``UIView.animate``  sẽ có một số lựa chọn cho bạn:

![](https://images.viblo.asia/9c4e80fc-2df0-4f68-9795-b6206096a49d.png)

Dòng đầu tiên là một animation chỉ có thời lượng và một animation closure.
Dòng tiếp theo có thêm một completion closure phòng khi bạn muốn làm gì đó sau khi animate hoàn thành xong.
Dòng thứ ba có bạn thêm lựa chọn để setup độ trễ và kiểu animation, bạn hãy chọn dòng này.

Sau đó hãy thêm duration = 1.0 giây, tạm thời chúng ta chưa cần delay nên hãy đặt là 0.0, option có thể để trống, trong animation closure set các constant mà bạn đã đặt trong ``viewWillApear(animated:)`` về trạng thái ban đầu để tạo ra animation, chúng ta sử dụng đến completion nên set nó bằng ``nil``.

```
UIView.animate(withDuration: 1.0,
               delay: 0.0,
               options: [],
               animations: { 
                 self.labelConstraint.constant += self.view.bounds.width
                 self.textfieldConstraint.constant += self.view.bounds.width
                 self.buttonConstraint.constant += self.view.bounds.width
                 self.view.layoutIfNeeded()
               }, completion: nil)
```

Dòng ```self.view.layoutIfNeeded()``` sẽ update lại mỗi khi vị trí của các view thay đổi.

Hãy Run và build thử app và bạn được chứng kiến animation mình vừa tạo ra.

Bây giờ nâng cao hơn bạn có thể thêm các animation option riêng.

có 3 loại animation thường dùng: 
* .curveEaseIn: bắt đầu châm rãi và nhanh dần.
* .curveEaseOut: bắt đầu nhanh và chậm dần.
* .curveEaseInOut: bắt đầu chậm ,nhanh dần rồi lại chậm dần đến hết, một sự kết hợp của 2 loại kể trên.

Ở đây chúng ta sẽ sử dụng .curveEaseOut:

```
UIView.animate(withDuration: 1.0,
               delay: 0.0,
               options: [.curveEaseOut],
               animations: {
                 self.labelConstraint.constant += self.view.bounds.width
                 self.textfieldConstraint.constant += self.view.bounds.width
                 self.buttonConstraint.constant += self.view.bounds.width
                 self.view.layoutIfNeeded()
               }, completion: nil)
```

Sao chúng ta không thử thay đổi delay khác nhau cho mỗi view,
Bạn hay thay thế hàm ```viewDidAppear``` bằng hàm sau đây:

```
override func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(animated)
    UIView.animate(withDuration: 1.0,
                   delay: 0.0,
                   options: [.curveEaseOut],
                   animations: {
                     self.labelConstraint.constant += self.view.bounds.width
                     self.view.layoutIfNeeded()
                   }, completion: nil)

     UIView.animate(withDuration: 1.0,
                    delay: 0.3,
                    options: [.curveEaseOut],
                    animations: {
                      self.textfieldConstraint.constant += self.view.bounds.width
                      self.view.layoutIfNeeded()
                    }, completion: nil)

     UIView.animate(withDuration: 1.0,
                    delay: 0.6,
                    options: [.curveEaseOut],
                    animations: {
                      self.buttonConstraint.constant += self.view.bounds.width
                      self.view.layoutIfNeeded()
                    }, completion: nil)
}
```

Build và Run thử app bạn sẽ thấy các view lần lượt xuất hiện trên màn hình.
Thế là bạn đã tạo ra được các animation đơn giản rồi đấy,
Cám ơn đã quan tâm và theo dõi bài viết này của tôi.

Nguồn: [Constraint Animations on iOS Apps using XCode and Swift](https://www.twilio.com/blog/2018/04/constraint-animations-ios-apps-xcode-swift.html)