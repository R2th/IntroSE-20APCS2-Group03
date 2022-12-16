Apple đã công bố Xcode 11 tại sự kiện WWDC19. Các ghi chú phát hành chính thức bao gồm những gì mới trong chương trình Xcode nhưng nó đáng để thử Xcode 11 với macOS Catalina. 
Các tính năng chính của Xcode 11 bao gồm **code navigation**, **Swift Package Manager** cho iOS, macOS và watchOS.

# Mini map
Xcode 11 có minimap tuyệt vời để điều hướng đến mã nguồn dễ dàng trong một tệp dài. Tính năng này có sẵn trong một trình soạn thảo văn bản khác như Sublime, Atom nhưng bị thiếu trong Xcode. Các nhà phát triển ứng dụng giờ đây cũng sẽ nhận được minimap trong Xcode.
![](https://images.viblo.asia/e0409b59-915f-47f3-a186-6c3e1095c755.png)

# SwiftUI Support
Apple đã công bố khuôn khổ mới SwiftUI để xây dựng các ứng dụng với ít mã hơn. Với Xcode 11, các nhà phát triển có thể xây dựng các ứng dụng bằng khung SwiftUI. Khi bạn tạo ứng dụng mới, Xcode sẽ yêu cầu bạn kích hoạt hỗ trợ SwiftUI.

![](https://images.viblo.asia/b72e6981-03cc-47be-bdba-a18b580b161a.png)

Sau khi kích hoạt, ứng dụng sẽ nhận được hỗ trợ đầy đủ các tính năng SwiftUI từ macOS Catalina.

# Xcode Test Plans

Xcode 11 cũng có hỗ trợ cho các gói kiểm thử, đây là một cách khác để quản lý cấu hình kiểm thử. Trước đây, cấu hình để chạy kiểm thử được sử dụng để quản lý từ lược đồ nhưng với Xcode 11, bạn có thể tạo kế hoạch kiểm thử trong một tệp khác và sử dụng nó để thực hiện kiểm thử. Trong trình chỉnh sửa lược đồ, bạn sẽ thấy tùy chọn chuyển đổi hành động kiểm tra sang kế hoạch kiểm tra để chúng tôi có thể quản lý cấu hình kiểm tra từ tệp khác.
![](https://images.viblo.asia/b425b15f-677b-49ee-a845-1cb14b0e5f51.png)

Bạn có thể tạo kế hoạch kiểm thử  heo sơ đồ hoặc kế hoạch tùy chỉnh. Có nhiều cách khác để tạo kế hoạch kiểm tra từ menu sản phẩm Xcode. Bây giờ, bạn có thể tạo một cấu hình khác nhau cho các loại  kiểm thử khác nhau.
![](https://images.viblo.asia/3f984345-1479-48e3-935d-b411d143e0f7.png)

# Swift Package Manager iOS!

Một ứng dụng iOS đã sử dụng các công cụ của bên thứ ba để quản lý các phụ thuộc như CocoaPods hoặc Carthage. Bây giờ Apple đã thêm hỗ trợ chính thức để quản lý các phụ thuộc. Trình quản lý gói swift có thể tìm fetch repos từ Github. Bạn có thể thêm hỗ trợ cho các gói SwiftPM từ các gói Xcode -> File -> Swift -> Thêm phụ thuộc Swift.

Khi Xcode được kết nối với Github thì bạn có thể tìm kiếm các gói và sử dụng trong repo.
![](https://images.viblo.asia/5351f0b4-02d2-4788-a027-bd67dbbbd5b8.png)

Khi các package đã được fetch xong, Xcode sẽ liên kết các frameworks và được hiển thị trong trình điều hướng dự án.

![](https://images.viblo.asia/50c9d9fc-a176-4326-883a-4b0b3e5442a7.png)

Có rất nhiều tính năng có sẵn trong Xcode 11, được đề cập trong ghi chú phát hành bạn có thể xem [tại đây](https://developer.apple.com/documentation/xcode_release_notes/xcode_11_beta_release_notes)
Tôi sẽ tiếp tục cập nhật những tính năng mới ở bài viết sau!