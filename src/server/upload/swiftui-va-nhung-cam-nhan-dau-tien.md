Như chúng ta đã biết thì SwiftUI là một framework mới mà Apple tung ra cùng với đợt release XCode 11 mới gần đây với rất nhiều tham vọng. SwiftUI được cho tốt hơn, ít code hơn, giúp dev rút ngắn thời gian phát triển với những tác vụ liên quan tới UI,... . Vậy liệu có thật là SwiftUI tốt hơn UIKit hiện tại, có phải chúng ta nên chuyển sang sử dụng SwiftUI ngay bây giờ luôn không? Bài viết này là đánh giá chủ quan của cá nhân mình về SwiftUI.

## Requirements
Đầu tiên, sẽ phải xem xét tới requirement của SwiftUI:
```
iOS 13.0+
macOS 10.15+
Mac Catalyst 13.0+
tvOS 13.0+
watchOS 6.0+
```
Hmm, vậy là tất cả những thứ mới nhất mà apple cho ra mắt :rofl::rofl: Với việc iOS13 release chưa được bao lâu, cùng với việc thường xuyên có lỗi trên các bản cập nhật sớm của Apple nên việc mong đợi user chuyển lên iOS13 không thể nhanh được. Vì vậy nếu sử dụng SwiftUI sẽ đồng nghĩa với việc chúng ta sẽ bỏ qua một lượng lớn người dùng hiện tại với iOS12 hay iOS11.

## Better app, Less code?
Tiếp theo là việc Apple giới thiệu với chúng ta `Better app, Less code` liệu chỉ là mang tính chất quảng cáo hay nó thực sự tốt như vậy? Hãy xem xét đến một ví dụ đơn giản: Tạo ra một ImageView được bo tròn và đổ bóng.
Ok, đầu tiên nếu sử dụng UIKit, cách thông thường và thông dụng nhất sẽ là bỏ tròn trên một view và đổ bóng trên một view. Đầu tiên là đổ bóng trên một container view:
```
let outerView = UIView(frame: CGRect(x: 0, y: 0, width: 100, height: 100))
outerView.clipsToBounds = false
outerView.layer.shadowColor = UIColor.black.cgColor
outerView.layer.shadowOpacity = 1
outerView.layer.shadowOffset = CGSize.zero
outerView.layer.shadowRadius = 10
outerView.layer.shadowPath = UIBezierPath(roundedRect: outerView.bounds, cornerRadius: 10).cgPath
```
Sau đó là bo tròn ImageView (cùng size với Container của nó) bên trong:
```
let myImageView = UIImageView(frame: outerView.bounds)
myImageView.image = .....
myImageView.clipsToBounds = true
myImageView.layer.cornerRadius = outerView.bounds.width / 2
```

Vậy chuyển sang với SwiftUI thì sẽ như thế nào?
```
let image = isFromAssets ? Image(imageName) : ImageStore.shared.image(name: imageName)
        let rightPadding: CGFloat = isFromAssets ? 60 : 0
        return image
            .padding(.trailing, rightPadding)
            .clipShape(Circle()).overlay(Circle()
                .strokeBorder(Color.blue, lineWidth: 3))
            .shadow(color: .gray, radius: 2, x: 2, y: 2)
```
Thành quả trên SwiftUI: 
![](https://images.viblo.asia/87a32a7c-eb4a-4206-9b56-59f638fd1cc3.png)

Trên đây là đoạn code đối với SwiftUI, có thể thấy là nó có gọn đi cả một nửa. Và cũng clear hơn nhiều so với sử dụng UIKit. Việc tái sử dụng của SwiftUI cũng là một điểm đáng nói. Khi lập trình với SwiftUI, các bản sẽ không hẳn bỡ ngỡ khi mà cấu trúc view của nó khác rất nhiều so với UIKit, không còn kéo thả view lồng view, storyboard một đằng code một nẻo, tất cả đều clear hơn so với SwiftUI. Cấu trúc view của SwiftUI thì lại giống với Web hay React-native, bây giờ một màn hình sẽ được phân tích, và viết thành những components nhỏ, có độ tái sử dụng cao,... Vậy về khía cạnh less code thì SwiftUi dường như đã tốt hơn rồi, còn về phía có tốt hơn không thì còn nhiều khía cạnh, chúng ta chưa thể khẳng định ngay bây giờ được.

## Advantages
Sau một thời gian trải nghiệm thì mình cảm thấy, SwiftUi có những ưu điểm nổi bật so với sử dụng UIKit bình thường:
* **Không còn AutoLayout:** SwiftUI thay thế storyboard bằng code, do đó việc tái sử dụng sẽ đơn giản hơn nhiều, sẽ ít conflict hơn khi mà tất cả đều được thể hiện trên code. Khi phát triển với Storyboard, chắc nhiều người dính thảm cảnh rằng storyboards một đằng còn code thì thay đổi một nẻo, chưa kể size class hay các thể loại khác.
* **Live Preview:** Điều tuyệt vời nhất chính là live preview, với live preview sẽ rút ngắn hàng "giờ" ngồi nhìn thanh build trên XCode. Nếu trước đây chỉ cần fix offset hay một chút về layout chúng ta sẽ phải run, build project, pha coffee rồi uống hết cốc đó để tận hưởng khoảng thời gian đợi XCode build. Với SwiftUI chỉ cần thay đổi ngay trên mặt code thôi, màn hình Preview sẽ thay đổi luôn cho chúng ta, sẽ không mất hàng tá thời gian để vướng vào việc fix UI vớ vẩn nữa. Nhưng hiện tại thì mình thấy Live Preview của XCode hiện tại vẫn chưa được hoàn thiện lắm khi mà vẫn bị hiện tượng lag. Nhưng có lẽ điều này sẽ được cải thiện ở những version mới hơn.
[video](https://youtu.be/w_rhuHnK43U)
* **Binding**: Nếu chỉ có mình SwiftUI thì và những thứ trên thì không thể hấp dẫn các dev được, nhưng với một framework cũng được release cùng lúc đó là `Combine` thứ mà chúng ta hằng mong muốn đó là Binding với Swift cuối cùng cũng xuất hiện rồi. Tuy chưa thể hoàn thiện và đầy đủ như RxSwift hay RxCocoa nhưng rất tiềm năng để có thể thay thế nó sau này. Với Combine việc binding giữa data và view là vô cùng đơn giản và thuận tiện.

## Conclusion
Với những ưu điểm như trên, thì theo cảm nhận của mình là việc chuyển sang SwiftUI vào thời điểm hiện tại có lẽ là chưa phù hợp. Bởi vì IOS 13 còn mới, và hầu hết người dùng có thể chưa update lên, tuy ngắn gọn hơn nhưng việc không có những component quen thuộc trong UIKit sẽ khiến bạn bỡ ngỡ khi bắt tay và thiết kế View, từ đó dẫn đến việc có thể là sẽ mất thời gian code hơn là như cũ. Swift trước đây cũng phải trải qua rất nhiều version mới có thể ổn định được, SwiftUI và Combine cũng không ngoại lệ, nếu bạn chuyển qua tìm hiểu bây giờ có thể sẽ gặp đôi chút khó khăn và support từ cộng đồng có thể còn chưa nhiều. Và trên hết, đây đều là cảm nhận của cá nhân mình khi thử làm cùng với SwiftUI. Qua bài viết mong sẽ cung cấp cho các bạn những thông tin cơ bản về SwiftUI