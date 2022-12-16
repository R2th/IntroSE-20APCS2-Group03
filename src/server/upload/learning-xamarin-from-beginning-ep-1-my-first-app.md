Xamarin là nền tảng lập trình di động cross-platform được cung cấp bởi Microsoft, tức là code 1 lần để chạy luôn cả trên Android và iOS. Tất nhiên là về mặt hỗ trợ, tương thích, thì Xamarin vốn không thể so sánh với Kotlin hay Swift, những platform chuyên dụng cho Android và iOS, tuy nhiên đây cũng là 1 ngôn ngữ khá hay và đáng học, đối với các dev thiên về .NET (vì code behind của Xamarin là C#).  Bạn nào có hứng thú thì hãy cùng mình làm quen tìm hiểu Xamarin nhé. Bài đầu tiên chúng ta sẽ bắt đầu từ đơn giản nhất, chỉ tạo 1 project và navigation thôi. :grinning: 
***
 **Cài đặt môi trường**  
Bạn cần cài [Visual Studio 2019 bản Community](https://visualstudio.microsoft.com/downloads/). Hoàn toàn miễn phí.  
Ngoài ra, bạn cần cài thêm 1 thiết bị ảo (mình chọn cài thiết bị Android cho đơn giản). Nếu không thích Android Emulator của Visual Studio, bạn có thể chọn Genymotion. Mình cũng cài Genymotion để tiện việc sử dụng trên cả Android Studio và Visual Studio.  
***
**Tạo project đầu tiên**  
Mở visual studio 2019 và chọn *File --> Create a new project*, rồi chọn *Mobile App (Xamarin.Forms)*   
![](https://images.viblo.asia/6987333c-1449-4083-b129-f145e81b62c2.png)
Khi bạn tạo xong, solution của bạn sẽ có cấu trúc như bên dưới, bao gồm project để code, và 2 Project dành cho việc build trên Android và iOS.
Ví dụ mình tạo project của mình là **MyFirstXamarinApp**, thì Solution sẽ gồm 3 project con là **MyFirstXamarinApp**, **MyFirstXamarinApp.Android** và **MyFirstXamarinApp.iOS**  
![](https://images.viblo.asia/013e50f3-a2c5-4f26-b1a3-00e446740a98.png)
***
**Thử chạy Android Emulator và run source**  
Mình cũng như một số bạn dev, khi mới tạo project thì thường build và run 1 lần để đảm bảo là các setting không có vấn đề gì, và ở bước này mình đã gặp vấn đề khi thử run source với Genymotion.  
Đầu tiên là lỗi Genymotion không hiển thị trên list build device của Visual Studio. Các bạn có thể tham khảo cách giải quyết tại [đây](https://www.c-sharpcorner.com/blogs/does-not-genymotion-emulator-show-in-visual-studio-heres-a-fix) nhé.  
Kế tiếp, sau khi thấy được Genymotion device trên Visual Studio thì khi build để run source thì lại phát sinh lỗi *INSTALLFAILEDVERIFICATIONFAILURE*. Bạn có thể tham khảo cách giải quyết tại [đây](https://stackoverflow.com/questions/15014519/apk-installation-failed-install-failed-verification-failure).  
Sau khi giải quyết xong 2 lỗi này thì source của mình chạy được trên Genymotion.
***
**Navigation trong Xamarin**  
Sau khi run được project HelloWorld, chúng ta cùng thử Navigation trong Xamarin nhé.
Navigation của Xamarin có các loại như Hierarchical Navigation, TabbedPage, CarouselPage, MasterDetailPage, Modal Pages được mô tả ở [trang hướng dẫn Official của Microsoft](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/app-fundamentals/navigation/). Ở Sample của mình thì mình sử dụng [Hierarchical Navigation](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/app-fundamentals/navigation/hierarchical)
Theo đó, mình khai báo Main page là Navigation page.  
![](https://images.viblo.asia/a51c0811-9043-4871-aa8d-adca4c1c0f30.png)
Tiếp đó mình add button vào Main page, tạo 1 page khác (tạm đặt tên là AddNewItem, mỗi khi click vào button *Add New Item* ở Main Page thì mở ra trang add New Item. Navigation này hoạt động theo kiểu Push Pop.  
![](https://images.viblo.asia/a67bebe6-2b02-4c2b-bd4d-1786eeed27b2.png)
Và mình chạy thử code. Màn hình main thế này  
![](https://images.viblo.asia/eb35b32d-02c1-4762-8837-e9fc42d2f1cc.png)
Và màn hình *Add New Item* thế này  
![](https://images.viblo.asia/1bb08764-a04f-4c37-9da9-b26608841258.png)
***
**Tạm kết**  
 Trên đây là 1 sample đơn giản nhất, mở đầu cho quá trình tự học Xamarin. Lần tới chúng ta sẽ cùng tìm hiểu cách lưu dữ liệu vào file bằng 1 sample nho nhỏ khác.  
 Nếu các bạn có hứng thú thì hãy đồng hành cùng mình khám phá nhé. :roller_coaster::roller_coaster::roller_coaster:
***
Link tham khảo:  
https://docs.microsoft.com/en-us/xamarin/xamarin-forms/
https://www.tutorialspoint.com/xamarin/xamarin_first_application.htm