Làm thế nào để chúng ta có thể thêm 1 framework bằng việc sử dụng Git Submodule vào project IOS
![](https://images.viblo.asia/5d2828f4-93b5-4e7d-b06b-00a8b8c72a27.jpeg)
# Lời nói đầu
khi bạn xây dựng 1 ứng dụng IOS trong Xcode, chúng ta thường cần sử dụng 1 số code từ project khác. Những project được thêm những chức năng, method đến những ứng dụng khác. Một framework được đưa vào project của bạn mạng lại cho chúng ta những đoạn code những function có sẵn, mà chúng ta có thể tái sử dụng mà không cần phải tạo lại, như việc chúng ta tạo 1 chiếc xe mà không cần tạo từng cái bánh xe vậy :v: 
## Việc thêm 1 External Respository, Sub-Project và 1 Framework
Tổng quan, để sử dụng 1 external framework trong Xcode, chúng ta cần:
1. Thêm 1 vài synchronised link đến external repository và tải chúng. (mình sẽ minh hoạ sau)
2. thêm .xcodeproj(Xcode project) tệp từ external repo như 1 sub-project đến project chính của chúng ta, trong* Xcode'File Navigator*.
3. Thêm Framework vào build phases trong project của bạn.
Thực tế thì nó sẽ đơn giản lắm, chỉ cần kéo thả nên bạn không cần lo lắng :)), nhưng nếu bạn còn băn khoăn hoặc không thể làm được bạn có thể tham khảo tại đây [Build an App Like Lego tutorials](https://medium.com/build-an-app-like-lego/build-an-app-like-lego-tutorial-index-e07fe0d8755)
## Lựa chọn Managing External Repositories
Có một vài sự lựa chọn để bạn sync  một sub-project vào project của bạn. 
1. Git’s submodule((https://git-scm.com/book/en/v2/Git-Tools-Submodules))
2. CocoaPods[](https://cocoapods.org/)
3. Carthage[](https://github.com/Carthage/Carthage)
# BFWControls Framework
Trong bài post này, chúng ta sẽ thêm 1 Framework gọi là BFWControls vào project của chúng ta. Những bước này sẽ là rất giống khi bạn thêm bất kì Framework nào, bạn chỉ cần thay thế BWFControls đến Respository của Framework bạn muốn.
BWFControls gồm những chức năng giúp bạn đơn giản hoá trong việc tạo Xcode’s Interface Builder.

# Tạo Xcode Project
Nếu bạn đã có Xcode Project bạn có thể bỏ qua bước này.
Nếu không, bạn có thể tạo bất kì IOS Template này. hoặc bạn có thể [Embed a Xib in a Storyboard
](https://medium.com/@barefeettom/embed-a-xib-in-a-storyboard-953edf274155) thông qua bài viết này để tạo chúng. 
## Setup một thư mục Submodules 
Bạn có thể đặt Submodules code ở bất kì đâu trong project của bạn, nhưng mình đề xuất bạn nên tạo 1 thư mục gọi là Submodules  để chúng ta có thể quản lý dễ dàng hơn.
👉 Trong Xcode, tạo một "New Group" đặt tên chúng là Submodules
![](https://images.viblo.asia/5a7f82ca-99e4-456f-b853-1c27582af89e.png)
![](https://images.viblo.asia/33a2b39f-3f29-4e14-b8c0-cc9394a2a1c9.png)
👉 Chạy Terminal và gõ cd đến Submodules đường dẫn. bạn có thể làm điều này bằng cách kéo trức tiếp thư mục Submodules từ Xcode và thả trực tiếp vào Terminal Window, và giữ Command phím trong khi thả chuột.
## Thêm Submodule bằng terminal
👉 Tiếp tục ở màn hình Terminal, gõ( hoặc bạn có thể copy dòng lệnh này và paste vào terminal )
```
git submodule add https://github.com/BareFeetWare/BFWControls.git
```
👉 và nhần Return phím.
👁 Trong Terminal, Git sẽ tải BFWControls "Repo" and cấu hình chúng trực tiếp vào thư mục mình trỏ vào ( ở đây là submodule )
## Thêm Sub-Project
👉 Trong Finder, bên trong Submodules thư mục, và chúng ta thấy BFWControls thư mục đã được thêm vào và dễ dàng thấy BFWControls.xcodeproj tệp.
![](https://images.viblo.asia/9f004212-b50d-4c62-87da-69c778340af2.png)
👉 Kéo BFWControls.xcodeproj tệp từ Finder vào thư mục Submodules trong xcode
![](https://images.viblo.asia/9afd7b0f-3b57-428e-87f1-2acf01b1071c.png)
## Add the Framework
👉 Nhấn vào Xibsample project tệp trong Xcode. Chọn App Target trong *General* mục. Cuộn xuống *Embedded Binaries* và nhấn *+* .
![](https://images.viblo.asia/58b3fe82-67f8-422a-b48b-35c376ee7983.png)
👉 Xcode sẽ hiện thị danh sách Framework hiện có. Chọn *BFWControls.framework*( Đừng chọn BFWControls Demo.app nhé.)
![](https://images.viblo.asia/6e42859d-6b95-4e58-8002-7466584e509c.png)
👉 Click nút Add, và chạy lại project của chúng ta. Và chúng ta có thể dễ dàng thấy Framework đã được thêm vào. 
## Tóm lại
Trong bài post này, chúng ta đã thêm 1 submodule vào project xcode của chúng ta chỉ với vài dòng command trong terminal. Chúng ta đã thêm 1 sub-project bằng việc kéo BFWControls.xcodeproj tệp từ Finder đến Xcode project của chúng ta. Và cuối cúng, chúng ta đã thêm framework như một  embedded binary.
Tham khảo: https://medium.com/build-an-app-like-lego/add-a-framework-to-an-ios-app-45c06e39bf23