iOS 14 giới thiệu đến người dùng một tính năng mới cực "hot" là widget, giúp cập nhật thông tin một cách nhanh chóng và giao diện thú vị hơn. Trong bài viết hôm nay, mình giới thiệu cách tạo Widget đơn giản bằng SwiftUI trên iOS14

Ở đây mình sử dụng XCode 12 và tạo Project có tên là "DemoWidget"
![](https://images.viblo.asia/50c1facc-bee4-46f2-9c57-a4199d8293e4.png)

Sau khi tạo xong, chúng ta cần thêm Widget Extension cho Project 
![](https://images.viblo.asia/4c9c9932-715f-4172-917b-2f563ee60e7c.png)

Mình sẽ đặt tên cho Widget là "MyPetWidget". Sau khi tạo xong Project của chúng ta sẽ có cấu trúc thư mục như sau
![](https://images.viblo.asia/1104f343-e960-43b4-8572-4fef0f8712ee.png)

Trong Demo này mình sẽ tạo ra một Widget đơn giản ở ngoài màn hình Home,  ảnh sẽ được thay đổi theo thời gian. Đầu tiên chúng ta sẽ định nghĩa một model là MyPet gồm 2 thuộc tính là name và photo

![](https://images.viblo.asia/bc72fb9a-d5d0-4aca-96c6-7da486ea6561.png)

Lưu ý khi tạo Model, phải add Target cho cả Widget Extension 
![](https://images.viblo.asia/0ad18cc2-a02c-412e-ba90-f9e35324e25e.png)

Tiếp đó, mình sẽ kéo vào thư mục Assets của Widget một số bức hình sử dụng trong demo
![](https://images.viblo.asia/06bbf5d7-39e9-4369-aaa6-809e6c7239e6.png)

Tạo file Repository.swift. Ở đây mình sẽ khai báo class Repository chịu trách nhiệm sinh Data để sử dụng trong ứng dụng

![](https://images.viblo.asia/ffc7ef3c-f9a8-4e4c-91a4-9b2a509c522e.png)

Mở file MyPhotoWidget.swift và kéo xuống phần khai báo MyPhotoWidget, đây là phần quyết định nội dung của Widget
![](https://images.viblo.asia/5456226a-81e8-452c-aa6b-34214f4c5108.png)

Có thể thấy MyPhotoWidget conforms Widget Protocol, trong đó khai báo body trả về một WidgetConfiguration. Có 2 loại Configuration là IntentConfiguration và StaticConfiguration
IntentConfiguration cho phép chúng ta thực hiện một số cấu hình và mất thêm một chút thời gian để thiết lập. Trong bài viết này, mình sẽ chỉ sử dụng StaticConfiguration 

Kéo lên một chút ta sẽ thấy đoạn code SimpleEntry. Có thể hiểu đây là model được sử dụng cho Widget. Chúng ta sẽ sửa lại model này để phù hợp với nội dung App. Thay đoạn mã trên bằng đoạn mã của chúng ta
![](https://images.viblo.asia/ec6d300a-69b0-4024-8ddc-3cf7c40904d7.png)

MyPetEntry có kiểu TimeLineEntry. Trong đó bắt buộc phải khai báo biến date để dựa vào đó cập nhật Widget theo thời gian

Mặc định Apple sẽ tạo sẵn một InentConfiguration
![](https://images.viblo.asia/7af00ef5-0f4c-4af5-8514-be9f746b96e6.png)

Chúng ta sẽ thay đổi đoạn code này sử dụng StaticConfiguration. Bạn sẽ thấy XCode báo một số lỗi, chúng ta sẽ cần sửa thêm ở vài chỗ nữa
![](https://images.viblo.asia/949b14ab-5315-474f-954f-f67306a2940f.png)

Kéo lên phần Provider. Do chúng ta thay đổi SimpleEntry thành MypetEntry, sử dụng StaticConfiguration thay vì IntentConfiguration, Provider vì thế cũng cần conform các protocol khác
Thay thế IntentTimelineProvider thành TimelineProvider và thay đổi nội dung của Provider thành như sau
![](https://images.viblo.asia/f1e3e397-a208-4bcf-a57d-cb7dda169b6f.png)

Đoạn mã trên sẽ quyết định content sẽ được render trên Widget của chúng ta, Provider sẽ là cầu nối giữa code và UI của chúng ta trông qua timeline. TimelineProvider yêu cầu định nghĩa một kiểu cho Entry, ở đây chúng ta cần data ở dạng MyPetEntry, do đó chúng ta sẽ thêm typealias Entry = MovieEntry. Tiếp đó implement function placeholder(in context:) và trả về một MovieEntry Object chứa MyPet() mặc định. Hàm này được sử dụng cho WidgetKit render trong lúc loading
![](https://images.viblo.asia/94ad318e-e4b8-4946-b18a-48d492039092.png)

Tiếp đến là hàm getTimeline(context:completion:) . Nhiệm vụ của hàm này là cấp cho Timeline object chứa nhiều Entries. Trong trường hợp này chúng ta sẽ cung cấp cho mỗi entry một MyPet thông qua MyPetEntry đã setup ở trên. Sau đó tạo ra cho mỗi Entry một date tương ứng với thời gian tồn tại. Hết khoảng thời gian này, entry tiếp theo sẽ được hiển thị để thay thế cho entry hiện tại bằng việc set policy cho Widget ở chế độ .atEnd, ở đây mình sẽ để 30 giây.
![](https://images.viblo.asia/171124df-c368-49ed-bce9-39d7b12ed065.png)

Trong demo này, chúng ta được sử dụng data tĩnh tại local, vậy nếu chúng ta phải thực hiện query để call API lên server và Widget ở trong trạng thái Preview thì Widget sẽ hiển thị như thế nào ?. Đó là lúc chúng ta dùng tới hàm getSnapshot(context:completion:). Khi đó Widget có thể kiểm tra context.isPreview và cung cấp một dữ liệu mẫu, nhờ đó Widget có thể hiển thị ngay lập tức. Hàm này không cần thiết trong Demo này, nhưng mình vẫn sẽ nhắc tới để có thể nắm được ý nghĩa của nó
![](https://images.viblo.asia/5bbcadfe-0667-462f-aaf3-f2fd2f5f338e.png)
Bước cuối cùng là tạo UI. Thay thế MyPhotoWidgetEntryView bằng đoạn code sau. Ở đây sử dụng ZStack với một Image hiển thị full Widget background, sau đó dùng 2 VStack, một để tạo ra vùng Gradient, một để hiển thị Text là tên MyPet

![](https://images.viblo.asia/3bff5b2b-9135-4ffd-8b7a-8a3f6d2977cd.png)

Muốn hiển thị Preview trong lúc Code như hình trên thì các bạn cần sửa thêm một chút MyPhotoWidget_Previews, cấp cho nó một MyPhotoWidgetEntryView mặc định để hiển thị

![](https://images.viblo.asia/036a5068-8baf-489b-a2a5-8ff884bf0d5b.png)

Build Project và chúng ta thu được kết quả như trong hình
![](https://images.viblo.asia/d4f98261-38fb-4d03-ad09-e83c3f453eea.png)

## Nguồn tham khảo
https://www.swiftcompiled.com/homescreen-widgets/

## Full Source Code
https://github.com/buixuanhuy5798/WidgetDemo/tree/master/MyPhotoWidget