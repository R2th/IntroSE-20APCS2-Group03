# Mở đầu 
iOS 13 được release ngày 13/9/2019, cùng với đó Apple cung cấp thêm các tool, framework mới như SwiftUI, ARKit2, Combine. Ngoài các công cụ mới thì trên iOS 13 cũng sẽ có những thay đổi, các app cũ cần xử lý các thay đổi đó để đối ứng iOS 13. Bài viết này mình sẽ liệt kê 1 số thay đổi cần kiểm tra để xử lý với iOS 13. 
#  Sign in with Apple 
Để tăng tính bảo mật thì từ iOS 13 Apple cung cấp tính năng [Sign in With Apple], giúp cho việc quản lý trạng thái đăng nhập trên ứng dụng trở nên đơn giản hơn. 
Các ứng dụng đang sử dụng login bằng Social network hoặc third party thì nửa cuối năm nay sẽ cần phải thêm option Sign in with apple vào trong ứng dụng. 
Để áp dụng tính năng này có thể tham khảo link sau: 

https://medium.com/@spaceotech/how-to-integrate-the-new-sign-in-with-apple-button-in-your-ios-app-22acbee7b0dc
#  Launch Storyboard!

Tại WWDC2019 Apple thông báo trước tháng 4 năm 2020 toàn bộ các app cần phải hỗ trợ Launch Storyboard, support cho tất cả các screen size, support màn hình split của iPad 
Cần thiết phải  đối ứng 2 điểm dưới đây
- Bỏ Launch Image, thay vào đó sử dụng Launch Storyboard
- Hỗ trợ full màn hình, split screen (???) 
#  Dark mode 
Ở iOS 13 iPhone có thêm chế độ dark mode, light mode là chế độ bình thường vẫn sử dụng, nên khi ở chế độ light mode app vẫn sử dụng bình thường như iOS trước đó. Tuy nhiên khi app chuyển sang chế độ dark mode sẽ phát sinh các vấn đề về màu sắc trên app, ví dụ như ở Textfield chữ bị trắng lẫn với màu background nên ko thấy được. 
Để app mặc định luôn luôn chạy ở light mode thì ta có thể thêm key UIUserInterfaceStyle với value là Light trong file Info.plist, tuy nhiên Apple khuyến khích hỗ trợ dark mode, nên đây chỉ là phương án tạm thời, về lâu dài cần thực hiện việc đối ứng dark mode 
#  UIWebview
Từ năm ngoái UIWebview đã deprecated, theo Brady Eidson kĩ sư phụ trách phần Webkit của Apple thông báo trên Twitter thì ở iOS 13 UIWebview vẫn còn, tuy nhiên nó sẽ sớm được loại bỏ trong tương lai. Ứng dụng của mình đang phát triển cũng đã xuất hiện vấn đề crash app với UIWebview ở iOS 13, sau khi replace UIWebview bằng WKWebview thì vấn đề crash này đã được giải quyết. 

#  presentViewController 
Khi gọi hàm presentViewController thì mặc định viewcontroller sẽ được hiển thị như ảnh dưới 

![](https://images.viblo.asia/f7aa3034-6f26-475a-a378-b610f57d873b.png)

UIModalPresentationStyle thêm thuộc tính mới là auto, và mặc định sẽ là auto. 
Các thuộc tính UIModalPresentationStyle khác: 
iPhone: pageSheet, formSheet, pôpver 
iPad: pageSheet 
Muốn hiển thị full màn hình ta có thể thêm dòng code sau: 
`viewController.modalPresentationStyle = .fullScreen`

>  Source: https://techracho.bpsinc.jp/yoshi-k/2019_08_28/79514