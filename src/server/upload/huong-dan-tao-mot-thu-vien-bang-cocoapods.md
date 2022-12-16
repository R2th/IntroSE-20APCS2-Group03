# 1. CocoaPods là gì?<br/>
CocoaPods là một chương trình quản lí các bộ thư viện của ứng dụng Mobile dành cho iOS. Chúng ta có thể lên CocoaPods để tìm kiếm các bộ thư viện mà ứng dụng cần sử dụng. Để có thể sử dụng, mình cần phải cài bộ tool của CocoaPods để có thể liên kết vào ứng dụng chúng ta. Trên CocoaPods chứa đựng các bộ thư viện bao gồm ngôn ngữ Swift và Object-C.<br/>

Trang chủ: https://cocoapods.org
# **2. Cài đặt CocoaPods**<br/>
CocoaPods được viết bằng ngôn ngữ Ruby.  Trên OSX, có thể chỉ cần gõ theo dòng lệnh sau.<br/>
<br/>
`sudo gem install cocoapods`

# **3. Tạo thư viện bằng Command Line của CocoaPods**<br/>
Trên OSX, mở Terminal để thực hiện. Hãy CD đến folder mà bạn muốn chứa đựng Lib CocoaPods.<br/><br/>
`pod lib create {name library}`

Lúc này pod sẽ thực hiện việc Cloning từ pod template từ GIT về folder của bạn.<br/>
Sau đó sẽ có một số câu hỏi mà bạn phải trả lời.<br/>

* `What platform do you want to use?? [ iOS / macOS ]`<br/>
Platform bạn muốn sử dụng cho iOS hay macOS<br/>

* `What language do you want to use?? [ Swift / ObjC ]`<br/>
Ngôn ngữ lập trình trong thư viện của bạn<br/>

* `Would you like to include a demo application with your library? [ Yes / No ]`<br/>
Có muốn sẵn một bản demo trong bộ thư viện không?<br/>

* `Which testing frameworks will you use? [ Quick / None ]`<br/>
Có sẵn testing trong đó không?<br/>

* `Would you like to do view based testing? [ Yes / No ]`<br/>
Thực hiện based testing?<br/>

Sau khi một số dòng lệnh được bạn trả lời, command line sẽ tiếp tục chạy đến khi Xcode Project tự mở lên. Như vậy là quá trình tạo cơ bản đã kết thúc. <br/>

# **4. Config PodSpec**<br/>
Bạn có thể mở file PodSpec để config lại thông số của thư viện. Có thể tìm hiểu thêm thông qua https://guides.cocoapods.org/syntax/podspec.html<br/>

*Nguồn*<br/>
https://guides.cocoapods.org/making/making-a-cocoapod.html