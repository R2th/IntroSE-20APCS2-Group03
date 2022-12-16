![](https://images.viblo.asia/03f30bac-dc2b-47a1-bf54-085164a723ac.png)

**GIới thiệu :**

Là nhà phát triển ứng dụng mobile, chúng ta đều biết rằng kích thước gói ứng dụng (APK / IPA) luôn là vấn đề đáng quan tâm . Điều này đặc biệt đúng khi phát triển với dự án Xamarin có kích cỡ lớn, nó là một nhược điểm đáng chú ý nhất với các ứng dụng Xamarin . Chúng có thể rất nặng ! Nhưng sau đó câu hỏi là, làm thế nào để bạn đối phó với điều này ? Hãy cùng tôi tìm hiểu !

Có một vài điều bạn có thể làm để làm cho ứng dụng của mình nhẹ hơn khi phát triển với Xamarin.

**Linking**

Các ứng dụng Xamarin sử dụng *linker* để giảm kích thước của ứng dụng . Linker sử dụng phân tích tĩnh ứng dụng của bạn để xác định assemblies nào thực sự được sử dụng, types nào thực sự được sử dụng và members nào thực sự được sử dụng . 

Linker hoạt động tương tự như *garbage collector* trong Android, liên tục tìm kiếm assemblies , types và members được tham chiếu cho đến khi toàn bộ việc bao đóng tham chiếu assemblies , types và members được tìm thấy. Sau đó, tất cả mọi thứ bên ngoài việc bao đóng này được discarded.

![](https://images.viblo.asia/83e63c67-8244-4a4d-b731-5b7c09caf7e7.png)

Nếu bạn kiểm tra tài liệu chính thức về [Linking on Android](https://docs.microsoft.com/en-us/xamarin/android/deploy-test/linker#linker-behavior) & [Linking on iOS](https://docs.microsoft.com/en-us/xamarin/ios/deploy-test/linker?tabs=windows), nó sẽ chỉ cho bạn cách thực hiện thao tác này .
Cơ chế chính để điều khiển Linker là Linker Behavior (Linking trong Visual Studio)  . Đi vào hộp thoại Project Options , có 3 tuỳ chọn :

1 .Don’t Link (None in Visual Studio)

2 .Link SDK Assemblies (SDK Assemblies Only)

3 .Link All Assemblies (SDK and User Assemblies)

Tuỳ chọn Don’t Link sẽ tắt Linker . Điều này rất hữu ích để khắc phục sự cố lúc runtime để biết rằng liệu Linker có đangg chịu trách nhiệm hay không . Tuỳ chọn này không nên dùng cho bản build production .

Tuỳ chọn Link SDK Assemblies chỉ liên kết với assemblies từ Xamarin . Tất cả các assemblies (ví dụ như code của bạn) không được liên kết . Như vậy, bất kỳ thư viện bên thứ ba nào của bạn sẽ không bị ảnh hưởng. Đây là loại liên kết dễ nhất và an toàn nhất và phải là mặc định của bạn. Vì các gói mặc định mà bạn sẽ cần bắt đầu với Xamarin Forms trên iOS và Android, tất cả đều có hỗ trợ liên kết, do đó bạn sẽ không gặp vấn đề gì.

Bây giờ bạn có thể nhận thấy rằng rất nhiều lần khi bạn cố gắng sử dụng điều này, các packages nhất định bắt đầu đưa ra các lỗi ngẫu nhiên, đôi khi về việc không tìm thấy hàm tạo của các lớp nhất định. Bạn có thể nhận thấy rằng dự án của bạn gặp sự cố thường xuyên, nó nói rằng không thể thể tìm thấy ctor () cho một lớp cụ thể từ libraries namespace. Điều này là do liên kết đã loại bỏ lớp constructor  mà code của bạn đang tìm kiếm. 

Có một số thư viện ngoài đó được xây dựng với sự hỗ trợ linking. Nó có khả năng là các thư viện này phải sử dụng [Reflection](https://docs.microsoft.com/en-us/xamarin/cross-platform/troubleshooting/questions/pcl-reflection) như một phần của công việc nội bộ , và vì vậy trình biên dịch sẽ nghĩ rằng một số phương thức và thuộc tính của nó được sử dụng. Do đó, nó sẽ quyết định loại bỏ chúng.

Có một vài cách để giải quyết vấn đề này. Tôi đề cập đến *compiler link skip*, bỏ qua linking cho một thư viện nhất định. Điều này phải được thực hiện trong mỗi nền tảng mà bạn sử dụng dll.

Với **iOS**

Đi tới ứng dụng IOS , dưới tab build IOS hãy làm như sau :
Tại mục Additional mtouch arguments bán sẽ cần phải thêm tên của DLL của framework mà bạn muốn loại bỏ cùng với --linkskip = LibraryName . Hãy chắc chắn rằng bạn không thêm phần mở rộng .dll và tách chúng ra bằng khoảng trắng .

Với **Android**

Đi tới ứngg dụng Android , dưới tab build Android hãy làm như sau :
Tại mục Ignore assemblies , nhập tên assemblies mà bạn muốn loại bỏ , cách nhau bởi dấu ; và không có phần mở rộng .dll

Tuỳ chọn Link All Assemblies  liên kết tới tất cả assemblies . điều đó có nghĩa là code của bạn cũng có thể bị xóa nếu không có tham chiếu tĩnh, vì nó sẽ điều tra mọi thứ và làm giảm kích thước ứng dụng của bạn. Khi được đặt thành loại này, quá trình liên kết khá mạnh mẽ và rất có thể ứng dụng sẽ xóa thứ gì đó mà bạn thực sự cần.

Nếu bạn quản lý để có được tất cả các thư viện của bạn liên kết thành công, thì bạn đã hoàn thành 80% cách đó. Để có một liên kết đầy đủ, bạn cũng cần phải liên kết code của riêng bạn. Quay trở lại cài đặt dự án và chọn Link all .

Cài đặt này khá giống nhau, ngoại trừ nó mở code của riêng bạn để được liên kết. Để ngăn các lớp của bạn được liên kết, bạn có thể sử dụng thuộc tính [Preserve] từ namespace Xamarin.Iternals . Điều này sẽ báo cho trình biên dịch bỏ qua một phương thức, thuộc tính hoặc lớp.

Đầu tiên , mọi thuộc tính Binding Context của bạn mà bạn chỉ tham chiếu từ XAML và sẽ ko thực thi trong file code, bạn sẽ cần thêm thuộc tính Preserve cho chúng .

Một điều khác cần để ý là các dependency services của bạn. Chúng sẽ được liên kết tự động, vì không có tham chiếu trực tiếp đến code từ PCL hoặc dự án native : DependencyService.Get<IPlatformSpecificOperations>() sẽ khôngg tham chiếu đến class đó 
    
Cuối cùng , custom renderers—giống như dependency services không trực tiếp tham chiếu tới codebase . Ví vậy bạn phải làm điều tương tự cho chúng .
    
**Xoá những packages không dùng**
    
NuGet packages hoặc .dll  , nói chung, được biết là làm tăng đáng kể kích thước xây dựng. Đôi khi, nó rất dễ bị bỏ bê điều này , và sau đó tại một thời điểm nhất định trong dự án của bạn, nó trở nên khó hiểu liệu một gói cụ thể có được sử dụng hay không. 
    
Khi dự án Xamarin được tạo ra , nó sẽ tự sinh cho chúng ta 1 số packages mặc định có thể sẽ ko cần sử dụng cho dự án của chúng ta. 
Vì vậy việc kiểm tra các packages không dùng trong project cũng rất cần thiết để làm gỉam kích cỡ dự án .
    
    Còn nữa .......