Để tiếp tục series Debugging cùng Xcode, trong phần này chúng ta sẽ tìm hiểu về view debugging thông qua tool hỗ trợ của Xcode.

![](https://images.viblo.asia/a98b993c-692e-4511-848b-1378b8424848.png)

Trong quá trình tạo nên app, chắc hẳn chúng ta đã từng gặp phải những bug liên quan tới autolayout mà không dễ gì tìm ra được nếu chỉ nhìn vao code. View debugging là khái niệm đã xuất hiện từ Xcode6, thay vì print ra từng frame trên console và cố gắng tưởng tượng ra từng lớp view, Xcode có thể hiển thị hình ảnh của tất cả hệ thống view trên nền không gian 3D. Trong bài viết này chúng ta sẽ tìm hiểu về view debugging - debug mà không cần phải code tí nào.

Để bắt đầu bạn hãy download project tại [đây](https://github.com/jessesquires/JSQMessagesViewController). Sau khi gỉai nén, bạn hay dùng hãy dùng terminal để trỏ đến địa chỉ của project, sau đó nhập `pod install` và nhấn enter. Mở project tên **JSQMessages.xcworkspace** và chạy trên iPhone simulator. Lưu ý rằng View Debugging chỉ có thể được sử dụng từ iOS 8 trở lên. Click vào **Push via storyboard** và bạn sẽ thấy một cuộc hội thoại giữa Steve Jobs và Tim Cook. Chúng ta sẽ nghiên cứu màn hình này ngay sau đây.

![Even Steve Wozniak joins the fun!](https://images.viblo.asia/21ccfd75-b5c7-4927-b50f-f789e05d9c91.png)


Quay trở lại Xcode và click vào **Debug View Hierarchy** trên thanh debug, hoặc chọn trên thanh công cụ **Debug\View Debugging\Capture View Hierarchy**.

![](https://images.viblo.asia/7882902c-be85-4d37-9f34-bb08ce947d57.png)

Lúc này, Xcode sẽ ngay lập tức đóng băng app giống như khi sử dụng pause trên debug bar. Đồng thời, trên phần màn hình code, thay vì các dòng lệnh sẽ hiện ra hình ảnh không gian mà trong đó là tất cả hệ thống view của app tại thời điểm chúng ta click vào icon view debug.

![](https://images.viblo.asia/bd894fa1-7ff8-4c3a-93c9-1aabc3a450c1.png)

Có thể bạn biết rằng khi bạn thêm một subview thì thực chất bạn đang  thêm một lớp vào bên trên của stack bao gồm các view hiện tại. Có thể hiểu rằng tập hợp các view tạo thành một lớp khi bạn cho chạy ứng dụng. Màn hình hiện tại bạn thấy không có gì khác thường ngoài việc có rất nhiều các vạch đen chồng lên nhau. Vậy thì nó có ích lợi gì, có thể nói bạn đang chứng kiến mô hình view stack ở mặt trên cùng của stack, nhưng bạn cũng có thể xem được hình ảnh các lớp trong stack bằng cách kéo thả trên màn hình. Thay vì màn hình 2D ban đầu, chúng ta đang được thấy hình ảnh 3D của hệ thống các view của app trong thời điểm hiện tại.

![](https://images.viblo.asia/f7ddceec-72c4-490f-994e-d7c6515389ac.gif)

Chúng ta có thể quan sát hệ thống này từ mọi hướng trên dưới trái phải thậm chí cả phía sau. Góc nhìn trực quan nhất là chếch phía bên trái của hệ thống kể từ điểm nhìn phía trên cùng stack.

![](https://images.viblo.asia/dd786ace-0330-468e-8520-e0aecc0125cb.png)

Từ đây bạn có thể có cái nhìn toàn cảnh về hệ thống view của app rồi. Phía bên trái của màn hình dường như có rất nhiều view màu trắng trồng lên nhau, bạn hãy thử chọn view tắng nằm ở ngoài cùng xem sao. Xcode sẽ highlight view này lên để xác nhận lựa chọn của bạn, đồng thời thanh hiển thị ngay bên trên update và hiển thị `UIWindow` ở cuối dòng - vị trí cuối dòng này luôn chỉ đến view mà hiện tại bạn đang chọn.

![](https://images.viblo.asia/da826df9-9fea-40e6-a220-1b6661c1663d.png)

Bởi vì app này chỉ bao gồm một window cho nên có thể coi `UIWindow` là key window của app, nói cách khác đây chính là `window` của `Appdelegate`. Tiếp theo hay chọn vew ở ngay bên phải view hiện tại, thanh công vụ sẽ cập nhật hiển thị `UILayoutContainerView`, đây không phải là một public class.
Từ đây, hệ thống các view về cơ bản sẽ như sau:
1. `UINavigationTransitionView`: view quản trị navigation.
2. `UIViewControllerWrapperView`: một view bọc ngoài các thành phần của `view`.
3. `UIView`: view trên cùng của view controller.
4. `JSQMessagesCollectionView`: Collection view được sử dụng trong ví dụ này.

Trong view debugging, bốn view đầu tiên mà chúng ta vừa tiếp hiểu (bắt đầu từ window) thực ra không đáng quan tâm đến. Những view này sẽ làm các có thể làm những bạn mới làm quen với kiểu debug này bị rối. Ở phía góc dưới bên trái của màn hình view có một thanh bar với hai button điều chỉnh mặc định ở hai bên của thanh bar.

![](https://images.viblo.asia/5399df33-227f-4b99-80fd-e681e0d311bf.png)

Hãy kéo button bên trái sang phải một chút, bạn sẽ thấy view đại diện cho app window biến mất, nếu bạn kéo xa ra hơn nữa `UINavigationTransitionView` cũng sẽ biến mất. Nếu bạn kéo hết cỡ sang phải thì tất cả các view cha của `JSQMessagesCollectionView` sẽ biến mất.

![](https://images.viblo.asia/033c6d59-60b8-4103-b6f2-8855db151a28.png)

Ở phía bên phải bạn có thể thấy rằng navigation bar nằm ngay trên collection view nhưng lại khá nhỏ và làm cho bạn khó mà nhìn thấy những thứ bên dưới nó. Ngoài ra bạn có thể zoom lên để quan sát chi tiết các view nhỏ trên màn hình. Các button hỗ trợ zoom in, out nằm phía dưới ngay giữa màn hình.

![](https://images.viblo.asia/697ed2a2-430d-499b-8a52-7b4efad5967a.png)

Như chúng ta đã biết, button `+` để zoom in, `-` để zoom out và `=` để đưa về trạng thái ban đầu. Sau khi zoom in, có thể bạn sẽ thấy các lớp view vẫn còn quá sát nhau, không dễ để chỉ ra đâu là view nào. Để giải quyết vấn đề này, hãy sử dụng thanh bar ở dưới bên phải, bạn kéo button càng xa thì khoảng cách giữa các view càng lớn.

![](https://images.viblo.asia/1fd2a9e9-4978-485d-a810-499a6b32b055.png)

Trong một số trường hợp đặ biệt, bạn cần kéo thanh bar để tránh việc các view chồng lấp lên nhau. Ngoài ra, bạn cũng có thể cần phải thay đổi điểm nhìn cho phù hợp bằng cách kéo thả trên màn hình.

![](https://images.viblo.asia/71772931-f771-4047-9803-b6e55ec9e35e.png)

Trên thanh bar phía bên trái, giống như button bê trái, button bên phải cho phép bạn ẩn lần lượt các view con. Bạn nên để ý đến thanh toolbar bên trên để xác định rõ vị trí muốn ẩn và tránh bị nhầm lẫn giữa các view nằm sát nhau. Khi kéo button bên phải, bạn sẽ thấy navigation item biến mất, tiếp theo các button chứa chúng, lần lượt một số view khác và cuối cùng là navigation bar.

![](https://images.viblo.asia/534d536b-5ccf-406d-a39f-f95874cdfa30.png)

Trên đây là một số điều cơ bản cần biết khi thực hiên View Debugging, cảm ơn các bạn vì đã theo dõi.

Bài viết được dịch từ: https://www.raywenderlich.com/1879-view-debugging-in-xcode-6