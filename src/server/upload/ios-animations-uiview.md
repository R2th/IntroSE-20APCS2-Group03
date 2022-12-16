### iOS Animations: UIView
Khi bạn muốn đánh bóng cho ứng dụng của mình và tăng trải nghiệm người dùng thì việc áp dụng các animation là một lựa chọn đáng để thực hiện.
Trong phiên bản iOS7 và đặc biệt là iOS8 được phát hành thì animation và motion trở thành trung tâm cho việc thiết kế của ứng dụng từ Apple và các nhà phát triển bên thứ 3. iOS7 giới thiệu một dạng phẳng, tối thiểu hoá thiết kế cho ứng dụng mà kết quả trả về chắc chắn xảy ra trong một số ứng dụng có cùng kiểu UI. Để phân biệt ứng dụng của họ với các ứng dụng khác, các nhà phát triển làm việc với các tính năng như animation và motion để tạo ra sự vượt trội của ứng dụng của họ. Không chỉ dùng animation làm nên sự khác biệt của ứng dụng của họ với số khác mà họ có thể cải thiện trải nghiệm người dùng cho ứng dụng.
Bên dưới là một số ví dụ cho việc sử dụng animation trong quá trinh lập trình với UIView

![](https://images.viblo.asia/19c3b040-b35c-461f-ac07-f8ca336b3e8d.gif)
![](https://images.viblo.asia/df1d117b-375e-4adf-97f4-d90acc2c7aee.gif)

và đương nhiên để làm được nó code khá đơn giản và ngắn gọn.

``` swift
myView.transform = CGAffineTransform(scaleX: 0, y: 0)

UIView.animate(withDuration: 1, animations: {
    self.myView.transform = .identity
}, completion: nil)
```

Đây các một ví dụ cho việc tạo một animation. Có nhiều cách khác nhau để tạo các animation này. Bạn có thể thay đổi khung, các ràng buộc, v.v ..Chúng ta sẽ sử dụng CGAffineTransform và biến đổi thuộc tính của CGAffineTransform trên UIView để đạt những kết quả như mong muốn.

### UIView.animate parameters
Cùng điểm qua một số param cơ bản:

**duration**: giá trị TimeInterval (typealias cho Double) đề cập đến thời lượng animation tính bằng giây.

**delay**: độ trễ tính bằng giây (TimeInterval cũng vậy) trước khi animation bắt đầu. Nếu bạn muốn bắt đầu hoạt hình ngay lập tức, bạn có thể bỏ qua tham số này (chỉ trong một số trường hợp nhất định) hoặc đặt thành 0.

**dampingRatio** (usingSpringWithDamping): dao động khi animation của bạn đến gần điểm cuối (CGFloat). Phạm vi từ 0 đến 1, trong đó 0 là biên độ giảm chấn tối đa.

![](https://images.viblo.asia/213fb49f-bea2-4b94-b188-a0e0f3c3629b.gif)

**velocity**  (initSpringVelocity): vận tốc lò xo ban đầu (CGFloat). Trong trường hợp của chúng ta, khoảng cách di chuyển cơ sở là 100 khi chúng ta đi từ 0 đến 100 (xem kích thước đầy đủ). Nếu vận tốc được đặt thành 1, tổng khoảng cách hoạt ảnh trong một giây sẽ là 1 x 100 = 100 điểm. Nếu bạn muốn tốc độ ban đầu chậm hơn, hãy đặt nó trong khoảng từ 0 đến 1: 0,5 x 100 = 50pts.

**options**: tùy chọn đường cong hoạt hình ra khỏi cấu trúc UIView.AnimationOptions.

ví dụ:  Để đạt được animation sau:

![](https://images.viblo.asia/b7996795-c0a9-456a-8fb9-cac1deb321e1.gif)

 Ta sẽ viết:
```Swift
myView.transform = CGAffineTransform(scaleX: 0, y: 0)

UIView.animate(withDuration: 1, delay: 0, options: .curveLinear, animations: {
    self.myView.transform = .identity
}, completion: nil)
```

**completion**: Một khối tùy chọn sẽ được thực thi ở cuối hoạt ảnh ((Bool) -> Void)?). Boolean cho biết nếu các hình ảnh động kết thúc trước khi completion được gọi và tiến hành các hành động tiếp theo sau đó.

``` swift
myView.transform = CGAffineTransform(scaleX: 0, y: 0)

UIView.animate(withDuration: 1, delay: 0, animations: {
    self.myView.transform = .identity
}, completion: { [weak myView] completed in
        guard completed, let myView = myView else {
            return
        }

        myView.transform = CGAffineTransform(scaleX: 2, y: 2)
        UIView.animate(withDuration: 1, delay: 0, animations: {
            self.myView.transform = .identity
        }, completion: nil)
})
```
Ta sẽ được:

![](https://images.viblo.asia/99f872c3-039e-4fbb-9818-d0f3bb077b7c.gif)

Trên đây là một số ví dụ và trình bày sử dụng cơ bản. Chúng ta có thể biến tấu và sử dụng kết hợp chúng lại với nhau để được các animation đúng yêu cầu. Tuy đây chỉ là animation cơ bản nhưng bản chất nó lại rất quan trọng trong việc thực hiện nhưng animation nâng cao hơn.

### tham khảo:
https://blog.usejournal.com/ios-animations-uiview-part-1-d94305bee2f5