Ở [P1](https://viblo.asia/p/co-ban-ve-animation-voi-swift-40-maGK78OAZj2) bạn đã thấy cách sử dụng animation đơn giản như thế nào, bạn cũng có thể học thêm một vài cách khác để sử dụng animation lên View của mình.

**Lời dịch giả**: Giới thiệu sơ qua về bài viết này, ở phần trước mình đã trình bày cách dùng animation cơ bản rồi, vậy thì phần này sẽ nói về vấn đề gì đây nhỉ, trong phần này mình sẽ nhắc tới 2 vấn đề sau:

1) **Các thuộc tính có thể Animation**: như ở p1 bên trong block code của hàm animation bạn hay dùng center.x cộng trừ các kiểu để vị trí của View. Vậy câu hỏi đặt ra là những cái gì mình thay đổi trong block animation thì sẽ có được các animation? :]

2) **Animation Options**: Cái này sẽ nói về một số tuỳ chọn về cách hoạt động animation của chúng ta. Vd như Animation sẽ lặp lại liên tục (vd như chúng ta muốn  1 cái gì đó quay tròn liên tục chẳng hạn), animation hoạt động đảo ngược (vd như ta code 1 view đi từ A -> B, nếu ta app dụng tuỳ chọn đảo ngược thì bạn sẽ thấy sau khi View di chuyển tới điểm B, thì nó sẽ di chuyển ngược lại từ B -> A). 

Ngoài ra ta còn có 1 số tuỳ chọn sử dụng hàm thời gian kiểu **ease-in** và **ease-out**, 2 cái này là gì?

Trước hết bạn hãy tưởng tượng các trường hợp sau:

Một vật đi từ A -> B, nếu nó di chuyển từ từ 1m/s và vận tốc không thay đổi cho tới vị trí B thì dừng, cái này gọi là di chuyển tuyến tính và nó không app dụng gia tốc vào di chuyển.

Bây giờ, nếu ta dùng tuỳ chọn **ease-in** thì vật này sẽ di chuyển nhanh dần lên từ lúc bắt đầu di chuyển [demo](https://www.youtube.com/watch?v=aYZre6MLb30). 

Nếu ta dùng tuỳ chọn **ease-out** thì vật này sẽ di chuyển chậm dần lại cho tới lúc kết thúc animation [demo](https://www.youtube.com/watch?v=WVqz0fECOsI)

Ngoài ra, còn nhiều loại khác, bạn có thể xem cách di chuyển tại [đây](https://www.youtube.com/watch?v=QKrVwWxMIkk&index=1&list=UU_1df8EGLHHNglqUDLGk0cQ)

Nếu hai thứ trên làm bạn tò mò và muốn tìm hiểu thì bạn hay tiếp tục đọc xuống dưới :]]

## Các thuộc tính có thể Animation

Phần này sẽ cung cấp cho bạn tổng quan về các thuộc tính animation của **UIView** và sau đó hướng dẫn bạn dùng những thuộc tính animation này trong project của bạn.

Không phải tất cả các thuộc tính xem đều có thể sử dụng trong animation, nhưng tất cả các view animation từ đơn giản nhất đến phức tạp nhất đều có thể được xây dựng bằng cách chỉnh các thuộc tính nhỏ trên view như được nêu trong phần bên dưới.

### Position và Size
![](https://images.viblo.asia/b94aef65-e875-4f4f-bc84-22a8737bee07.png)

Bạn có thể di chuyển view và kích thước của view. Dưới đây là các thuộc tính mà bạn có thể sử dụng để sửa đổi vị trí và kích thước của một view:

**bounds**: thường dùng khi  chỉnh lại vị trí nội dung nằm trong view.

**frame**:  thường dùng khi di chuyển hoặc phóng to, thu nhỏ view.

**center**:  thuộc tính này khi bạn muốn di chuyển view sang vị trí mới trên màn hình.

Đừng quên rằng trong Swift, một số thuộc tính trong **UIKit** như **size** và **center** có thể thay đổi. 

Điều này có nghĩa là bạn có thể di chuyển view theo chiều dọc bằng cách thay đổi **centre.y** hoặc bạn có thể kích cở chiều ngang của view bằng cách giảm **frame.size.width**.

### Appearance
![](https://images.viblo.asia/af24d3d1-f0a1-43a4-b7c2-b00dd86a95b1.png)
Bạn có thể thay đổi diện mạo của view xem bằng cách tô màu nền của nó hoặc làm cho view hoàn toàn trong suốt hoặc bán trong suốt.

**backgroundColor**: Thay đổi thuộc tính này của view để dần thay đổi màu nền theo thời gian.

**alpha**: Thay đổi thuộc tính này để tạo hiệu ứng mờ dần hoặc làm rõ lại.

### Transformation
![](https://images.viblo.asia/4ae3153f-08c6-45ac-b028-4f18171dfd39.png)

**transform**: Sửa đổi thuộc tính này trong block  animation để tạo hiệu ứng rotation, scale và position của view.

Đây là một đoạn code mẫu có dùng **transform**, bạn nào quan tâm có thể tìm hiểu thử:
```
@IBAction func animateButton(_ sender: UIButton) {
    let originalTransform = self.main.transform
    let scaledTransform = originalTransform.scaledBy(x: 0.2, y: 0.2)
    let scaledAndTranslatedTransform = scaledTransform.translatedBy(x: 0.0, y: -250.0)
    UIView.animate(withDuration: 0.7, animations: {
        self.main.transform = scaledAndTranslatedTransform
    })
}
```

**Lời dịch giả**: Các bạn mới tiếp xúc có thể gặp khó khăn với cái Transformation này, về cơ bản là các animation dễ nếu có thể chỉnh bởi các thuộc tính như trong p1 và các thuộc tính trình bày ở trên, Vậy tại sao còn đẻ ra thằng này??? Thưc chất của việc di chuyển, phong to, thu nhỏ, xoay View là các phép nhân của ma trận, sử dụng nó bạn có thể tạo nên các hiệu ứng đẹp, vd như hiệu ứng chuyển view như lật trang sách, các bạn có thể tìm hiểu thêm về nó :]. Nếu chỉ dừng lại ở mức độ đơn giản các bạn có thể không dùng tới nó vẫn giải quyết được các animation rồi.

## Animation Options

Nhìn lại animation code của bạn, bạn luôn để [] vào tham số options. Tham số này cho phép bạn tùy chỉnh cách UIKit tạo animation. Ban chỉ có thể điều chỉnh thời lượng (duration) và độ trễ (delay) của animation nhưng bạn có thể kiểm soát nhiều hơn các tham số aniamtion của mình hơn thế.

Dưới đây là danh sách các tùy chọn được khai báo trong loại tập hợp **UIViewAnimationOptions** mà bạn có thể kết hợp theo nhiều cách khác nhau để sử dụng trong animation của mình.

### Repeating

Trước tiên, bạn hãy xem hai tùy chọn animation:

**.repeat**: Bao gồm tùy chọn này để tạo vòng lặp animation mãi mãi.

**.autoreverse**: Chỉ bao gồm tùy chọn này kết hợp với .repeat; tùy chọn này liên tục phát ra animation của bạn về phía trước, sau đó ngược lại.

Sửa đổi mã hoạt hình trường mật khẩu **viewDidAppear ()** để sử dụng tùy chọn **.repeat** như sau:
```
UIView.animate(withDuration: 0.5, delay: 0.4, 
  options: .repeat,
  animations: {
    self.password.center.x += self.view.bounds.width
  }, 
  completion: nil
)

```

Built và Run project của bạn để xem sự thay đổi:

![](https://images.viblo.asia/b52f3b64-5074-4c33-a150-655fcdc6dda4.png)
Trường Title field và username field bay vào và ổn định ở giữa màn hình, nhưng password field sẽ tiếp tục animtion mãi mãi từ vị trí ngoài màn hình.

Sửa đổi code bạn đã thay đổi ở trên để sử dụng cả **.repeat** và **.autoreverse** trong tham số tùy chọn như sau:
```
UIView.animate(withDuration: 0.5, delay: 0.4, 
  options: [.repeat, .autoreverse],
  animations: {
    self.password.center.x += self.view.bounds.width
  }, 
  completion: nil
)

```

Lưu ý là làm thế nào nếu bạn muốn kích hoạt nhiều hơn một tùy chọn,  đặt danh sách các tuỳ chọn trong trong dấu ngoặc vuông, các thành phần được ngăn cách bởi dấu phẩy.

Lưu ý: Nếu bạn chỉ cần một tùy chọn duy nhất, Swift cho phép bạn bỏ qua dấu ngoặc vuông để thuận tiện. Tuy nhiên, bạn vẫn có thể bao gồm chúng trong trường hợp bạn thêm nhiều tùy chọn hơn trong tương lai. Điều đó có nghĩa là [] là không có tùy chọn, [.repeat] là một tùy chọn duy nhất và [.repeat, .autorepeat] cho nhiều tùy chọn.

Build and Run project của bạn một lần nữa; lần này, password field sẽ chuyển động qua lại trên màn hình!

### Animation Easing

Trong thế giới thực, mọi thứ sẽ không đột ngột khi bắt đầu di chuyển hoặc đột ngột ngừng di chuyển. Các vật thể như ô tô hoặc tàu hỏa tăng tốc từ từ cho đến khi đạt được tốc độ nhất định và khi sắp dừng lại chúng sẽ dần dần giảm tốc độ cho đến khi dừng hẳn tại điểm đến cuối cùng.

Hình ảnh dưới đây minh họa chi tiết khái niệm này:
![](https://images.viblo.asia/35e891fd-97e8-4cb4-9906-4c26d9e41e04.jpg)

Để làm cho animation của bạn trông thực tế hơn, bạn có thể áp dụng cùng một hiệu ứng xây dựng động lượng ngay từ đầu và làm chậm lại trước khi kết thúc, được gọi chung là **ease-in** and **ease-out**.

Bạn có thể chọn từ bốn tùy khác nhau:

**.curveLinear**: Tùy chọn này không áp dụng tăng tốc hoặc giảm tốc cho animation.

**.curveEaseIn**: Tùy chọn này tăng tốc khi bắt đầu animation.

**.curveEaseOut**: Tùy chọn này giảm tốc cho đến cuối animation.

**.curveEaseInOut**: Tùy chọn này tăng tốc khi bắt đầu animation và giảm tốc cho đến cuối animation.

Để hiểu rõ hơn về cách các tùy chọn này thêm tác động trực quan vào animation của bạn, bạn sẽ thử một vài tùy chọn trong project của mình.

Sửa đổi code animation cho password field của bạn lần nữa với một tùy chọn mới như sau:
```
UIView.animate(withDuration: 0.5, delay: 0.4, 
  options: [.repeat, .autoreverse, .curveEaseOut],
  animations: {
    self.password.center.x += self.view.bounds.width
  }, 
  completion: nil
)

```

Build and Run project; chú ý cách trường giảm tốc khá mượt mà cho đến khi đạt đến vị trí ngoài cùng bên phải, trước khi quay lại phía bên trái màn hình:
![](https://images.viblo.asia/e172200c-616d-4e40-9e03-3f1dbf06d5ae.png)

Điều này có vẻ tự nhiên hơn nhiều vì đó là cách mà bạn mong đợi mọi thứ sẽ di chuyển trong thế giới thực.

Bây giờ hãy thử ngược lại. Dễ dàng hoạt hình khi trường vẫn ở ngoài màn hình bằng cách sửa đổi cùng mã như trên để thay đổi tùy chọn **.curveEaseOut** thành **.curveEaseIn** như sau:

```
UIView.animate(withDuration: 0.5, delay: 0.4, 
  options: [.repeat, .autoreverse, .curveEaseIn], 
  animations: {
    self.password.center.x += self.view.bounds.width
  }, 
  completion: nil
)

```
Build and Run project; quan sát cách field nhảy trở lại từ vị trí ngoài cùng bên phải của nó. Điều này có vẻ không tự nhiên và rất dễ nhìn như animation trước đây.

Cuối cùng hãy thử **.curveEaseInOut.** Nó kết hợp hai tùy chọn mà bạn đã biết thành một cách nới lỏng trông rất tự nhiên **.curveEaseInOut** cũng là chức năng mặc định UIKit áp dụng cho animation.

Bạn đã thấy các tùy chọn hoạt hình khác nhau ảnh hưởng như thế nào rồi phải không?

Bạn có thể tải dự án cuối cùng ở đây [link](https://koenig-media.raywenderlich.com/uploads/2017/10/animations-getting-started-final.zip)
link nguồn: [link](https://www.raywenderlich.com/363-ios-animation-tutorial-getting-started)