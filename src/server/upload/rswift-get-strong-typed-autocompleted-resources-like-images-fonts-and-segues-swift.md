Hôm nay tôi xin giới thiệu với các bạn một thư viện không mới nhưng cũng không cũ và rất hot với những IOS Developer đó chính là RSwift(R là ở đây là Resouces nhé. Nhìn qua cứ tưởng RxSwift ^^). 

**I. RSwift dùng để làm gì ?**

Trước đây mỗi khi dùng đến file `Localizable.strings` để quản lý text trong một project. Để code được đẹp và sử dụng nó được dễ hơn tôi sẽ tạo một struct như sau : 
    
![](https://images.viblo.asia/810ecfda-f06b-45d5-86b5-fb110c08b47e.png)
    
Và gọi nó thế này : 

![](https://images.viblo.asia/7727a08b-2984-43c3-9d29-9c23df26e732.png)

Quản lý và tránh hard code cho tên các icon, image trong Assets.xcassets. Tôi cũng làm tương tự như làm việc với file 
.strings và  tôi thấy thực sự bất tiện và khó chịu khi cứ phải khai báo ở 2 file khác nhau. Nhiều lần như vậy tôi đã cảm thấy ức chế nhưng không biết làm gì hơn. 
   Rất may với RSwift tôi đã gỡ bỏ được sự bực tức đó ra khỏi thời gian code của tôi. Vì bạn sẽ bỏ qua được bước thêm
   biến vào struct như tôi đã ví dụ ở trên. 
   
**II. Cài đặt RSwift như thế nào ?**
   1. Bạn thêm `pod 'R.swift'` vào `Podfile` của bạn và install nó nếu dùng Cocoapods. Vì RSwift được sử dụng qua bước build app 
   nên nó không dùng được cho Carthage.
   
   2. Sau khi install vào `Build Phases`  add một `Run Script` mới như này : 
   
   ![](https://images.viblo.asia/06a8cee5-44db-443d-8e7a-63868651f461.png)
   
   3. Thêm đoạn mã này vào `Run Script` vừa tạo `"$PODS_ROOT/R.swift/rswift" generate "$SRCROOT"`.
   
![](https://images.viblo.asia/1b993731-76dd-4674-ae4f-94ac05b47754.png)
    
   4. Build project của bạn (Command B). Sau khi build success bạn vào thư mục project của bạn sẽ thấy xuất hiện 1
   file `R.generated.swift`
   
   ![](https://images.viblo.asia/8b2a77a8-8052-4125-a172-bd1c80287b58.png)
   
   Hãy kéo file đó vào xcode project của bạn. Lưu ý uncheck `Copy items if needed` nhé. Vậy là config đã xong, giờ trải
   nghiệm xem nó làm được những gì nào. 
   
**III. Sử dụng RSwift ra sao ?** 

   Giờ tôi sẽ kéo thả một image tôi tạm đặt tên là `ButtonUploadImage` vào trong `Assets.xcassets`. 
   
   ![](https://images.viblo.asia/957bf07f-ebfc-4d2b-accb-ab4d881b4beb.png)
   
   và build app (Command B). 
   
   Sau khi build app thành công. Bạn muốn sử dụng nó thì gọi nó ra như sau
   
   ![](https://images.viblo.asia/00650c83-410c-4501-9356-1fc5022e7dea.png)
   
Kiểm tra ở file `R.generated.swift` thì sau khi build app nó đã tự động sinh ra biến tương ứng với tên image của mình (ảo thật). RSwift còn hỗ trợ rất nhiều các kiểu của resources như : `Fonts`, `Resources files`, `Color`, `Localized strings`, `Storyboards`, `Segues`, `Nibs`, `Reusable cells` nữa. Việc sử dụng cho các kiểu resources khác cũng tương tự như vậy. Bạn chỉ cần tạo và build app, tự động trong file `R.generated.swift` sẽ có các biến tương ứng để ta sử dụng. Đây là link GitHub của thư viện các bạn hãy tham khảo nhé. Hy vọng mình đã giúp ích được cho các bạn một việc nhỏ gì đó. Xin cảm ơn đã đọc  bài của mình !

Link: (https://github.com/mac-cain13/R.swift)