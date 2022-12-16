Tại WWDC 2018 , Apple đã có 1 video hướng dẫn các developer tối ưu hoá thời gian build trên Xcode 
Và hôm nay tôi muốn chia sẻ một số mẹo được tổng hợp lại từ video đó 
Hy vọng rằng nó sẽ giúp đỡ bạn phần nào rút ngắn được thời gian khi build dự án IOS 

Ở bài viết này mình sẽ sử dụng Xcode 10 

**Build song song các targets** 

Các version Xcode trước phiên bản Xcode 10 , tất cả các targets được build 1 cách tuần tự , tức là trong cùng 1 thời điểm thì chỉ 1 target được build . Với Xcode 10 bây giờ đã hỗ trợ mình build nhanh hơn nhiều vì nó phân bổ các task trên nhiều core để build các đurgets một cách song song bất cứ khi nào có thể .

Hình minh hoạ dưới đây sẽ làm ví dụ cho việc bạn build tất cả 5 targets trong Xcode 9 : 

![](https://images.viblo.asia/d0be5619-328f-4118-b0e7-2024abe1702c.png)

   *Với Xcode 9 , Các targets được build Theo thứ tự xong cái này mới đến cái kia*


Tất cả các targets được build lần lượt , bắt đầu từ một dependencies của targets khác . Một ví dụ thực tế về nơi mà bạn có thể nhận thấy điều này là khi bạn sử dụng CocoaPods . Nếu bạn có 10 dependencies trong Podfile , Xcode cần build tất cả Pods trước khi build targets của bạn . Đây là lí do tại sao việc sử dụng Carthage thường tiết kiệm thời gian build hơn so với việc bạn dùng pods , vì các dependencies được biên dịch 1 lần và chỉ được liên kết runtime  với target của bạn .


Xcode cố gắng tận dụng tốt hơn phần cứng có sẵn bằng cách phân bổ trên nhiều core ( lõi ) để build . Vì thế, timeline của nó được minh hoạ như sau : 

![](https://images.viblo.asia/33efed38-0e41-4722-a5af-3cde51ebcb46.png)

   *Bằng việc giảm kích thước của các targets , bạn sẽ có được thời gian build song song tối ưu nhất* 

Khi mở app trên Xcode 10 , build song song nên được enabled . Để kiểm tra tuỳ chọn này , hãy mở scheme editor , chọn “Build“ , hãy đảm bảo rằng “Parallelize Build” đã được tích xanh như dưới đây : 

![](https://images.viblo.asia/43498ab7-a69f-4c00-b581-b9439e3e5ba9.png)

   *Tuỳ chọn build trong Xcode Scheme Editor*

Tất nhiên , Xcode không thể build tất cả các targets của bạn trong 1 lần . Dự án của bạn rất có thể sẽ có 1 số dependencies giữa các targets . Một thuật toán tuyệt vời để giải quyết các dependencies và tìm ra thứ tự biên dịch là [Topological sorting](https://en.wikipedia.org/wiki/Topological_sorting)

Có một điều mà bạn có thể làm để giúp Xcode song song hoá các công việc đó là  : Chia các targets thành những units nhỏ . Một ví dụ là tạo một target testing riêng biệt cho từng framework , thay vì kiểm tra tất cả các thư viện trong một unit testing bundle đơn lẻ .

Bạn có thể xem các dependencies của một target trực tiếp trong “Build Phases” . Hãy nhìn vào một ví dụ mà tôi đã làm gần đây , [Tweetometer](https://github.com/BalestraPatrick/Tweetometer/) . 

**TweetometerKit** là một framework mà chứa business logic của app , chẳng hạn như network requests và models  
**Tweetometer** là target chính của app , nó chỉ định **TweetometerKit** là một target dependency rõ ràng , để nói với Xcode rằng nó yêu cầu framework phải sẵn sàng trước khi nó có thể tự biên dịch . Trong “Link Binary with Libraries”,  Các target dependencies ngầm được chỉ định cũng được sử dụng để tìm ra thứ tự phụ thuộc .


![](https://images.viblo.asia/4eaa27b3-b727-4374-96b3-605f63d952fe.png)

   *Một ví dụ của build phases để xác định sự phụ thuộc của các modules* 


Nếu dự dán của bạn đã tồn tại được vài năm sau một số lần refactorings . Hãy đảm bảo bạn không chỉ định các target dependencies không cần thiết nó có thể khiến project của bạn build chậm hơn đáng kể  .

**Khai báo script inputs và outputs**
 

Một Run Script Phase cho phép bạn thực thi đoạn code tuỳ chình trong quá trình biên dịch của 1 target . Có thể bạn đã tạo một run script để gọi script *copy-frameworks* của Carthage . Tôi cũng sử dụng chức năng này trong Tweetometer kết hợp với [swiftgen](https://github.com/SwiftGen/SwiftGen) để tạo ra đoạn code boilerplate để truy cập an toàn vào Storyboard views , Localizable strings và resources được lưu trữ trong Asset Catalog.  Một run script luôn được chạy nếu  danh sách các files input không được chỉ định ,danh sách các inputs thay đổi hoặc các files output bị thiếu . Run script dưới đây chỉ được thực thực thi trong trường hợp *carthage update* được run và các framework được re-build ,nếu không nó sẽ bỏ qua , điều này tiết kiệm thời gian quỳ báu cho các bản build của bạn .

![](https://images.viblo.asia/cd5230f1-1ffc-4e04-a3a7-76d69e5d1353.png)

   *Một run script  phổ biến khi sử dụng Carthage*


Run script sau đây gọi **swiftgen** mỗi khi projects build do không có file inputs hoặc outputs  nào được chỉ định .

![](https://images.viblo.asia/c1c89f26-1779-4ac4-b7e7-e8a4109e2d10.png)

   *Run script custom gọi 1 tool bên ngoài để generate source code*

Như bạn có thể nhận thấy từ các ảnh chụp màn hình này , Xcode 10 có 1 tuỳ chọn mới để chỉ định danh sách file inputs và outputs . Trong trường hợp bạn có nhiều files để liệt kê , bạn có thể  làm như vậy bằng cách tạo tệp *.xcfilelist* để và chỉ định tất cả các thư mục trong đó . Ví dụ , bạn có thể thiết lập một tập script  tự động update một *Carthage.xcfilelist* mỗi khi bạn thêm  một dependency mới để tránh quên thêm file inputs và outputs . Định dạng của file khá đơn giản : 

```
$(SRCROOT)/Carthage/Build/iOS/Presentr.framework
$(SRCROOT)/Carthage/Build/iOS/ValueStepper.framework
$(SRCROOT)/Carthage/Build/iOS/Whisper.framework
$(SRCROOT)/Carthage/Build/iOS/Kingfisher.framework
```

Xcode 10 cũng đã tốt hơn nhiều trong việc chuẩn đoán cycles dependency trong dự án bằng cách đưa ra các lỗi chi tiết trong build log . [New guide](https://help.apple.com/xcode/mac/10.0/#/dev621201fb0) cũng đã được xuất bản trực tuyến để tìm hiểu làm thế nào để sửa chữa và phát hiện một cycle . 

![](https://images.viblo.asia/35ba9436-d41e-4c53-b6f7-e28a4755d4df.png)

   *Một thông báo lỗi mới được hiển thị nếu bản dựng của bạn xuất hiện các chu kỳ*


Apple cũng phát hành thêm [tài liệu](https://help.apple.com/xcode/mac/10.0/#/devc8c930575) về các tính năng này và rất nhiều chi tiết khác liên quan đến quá trình xây dựng Xcode (chẳng hạn như trang [tham chiếu build settings](https://help.apple.com/xcode/mac/10.0/#/itcaec37c2a6) ).