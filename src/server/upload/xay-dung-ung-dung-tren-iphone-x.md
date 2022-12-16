Mọi người đều hào hứng với iPhone X, “iPhone hoàn toàn là màn hình” -  Plus Face ID, máy ảnh tự sướng TrueDepth / camera animoji, camera góc rộng 12 megapixel và camera phía sau tele, chip động cơ thần kinh A11 Bionic và sạc không dây<br>
## 1. Sự khác biệt <br>
Đầu tiên, tóm tắt nhanh về những điểm khác biệt về màn hình iPhone X:<br>
* Kích thước màn hình là 375 x 812 điểm, do đó tỷ lệ màn hình là 9: 19,5 thay vì 9:16. Hơn 145 điểm so với màn hình 4,7 inch của iPhone 6/7/8 nhưng thanh trạng thái sử dụng 44 điểm và chỉ báo nhà gần như tăng gấp đôi chiều cao của thanh công cụ.<br>
* Độ phân giải màn hình là 3x: 1125 x 2436 pixel.<br>
![](https://images.viblo.asia/94931f31-072e-47b9-8e19-4d3ab445bf5c.png)
* Ở chế độ dọc, thanh trạng thái và thanh điều hướng chiếm 88 điểm hoặc 140 điểm cho các tiêu đề lớn. Thanh công cụ là 83 điểm thay vì 44 điểm. Trong cảnh quan, thanh công cụ là 53 điểm, và lề bố trí là 64 điểm thay vì 20 điểm.<br>
## 2. Bắt đầu <br>
Bạn hãy download source Code <a href="https://koenig-media.raywenderlich.com/uploads/2017/10/StarterPackage.zip" sl-processed="1">tại đây</a> và giải nén nó  :D<br>
Đầu tiên, hãy tự xem điều gì xảy ra khi bạn tải một hình ảnh 9:16 vào màn hình iPhone X. Mở AspectRatioSample, sau đó mở Main.storyboard. Đặt Chế độ xem thành iPhone X và chọn chế độ xem hình ảnh. Trong Thanh tra thuộc tính, chuyển đổi Chế độ nội dung giữa Aspect Fit và Aspect Fill:<br>
![](https://images.viblo.asia/08196d3f-445a-4ccd-b9af-4896041aceb5.png)
Trong Aspect Fit, nền xem màu đen hiển thị bên trên và bên dưới hình ảnh (chữ cái đấm bốc). Aspect Fill bao gồm khung nhìn, nhưng cắt các cạnh của hình ảnh.<br>
Trong định hướng ngang, Aspect Fit sẽ cột trụ hình ảnh (hiển thị chế độ xem nền ở hai bên) và Aspect Fill sẽ cắt phần trên cùng và dưới cùng.<br>
## 3.Thiết kế một ứng dụng mới<br>
Đóng AspectRatioSample và mở NewCandySearch. Build và chạy trên trình giả lập iPhone X: <br>
![](https://images.viblo.asia/3e12137c-7720-4b14-8221-d44c5e7a6bc9.png)
Đây là một ứng dụng chi tiết tổng thể với một danh sách các loại kẹo. Chế độ xem chi tiết hiển thị hình ảnh của kẹo đã chọn.<br>
### a. Sử dụng Auto Layout<br>
Mở Main.storyboard, chọn bộ điều khiển xem và hiển thị Trình kiểm tra tệp:<br>
![](https://images.viblo.asia/dbb5ea1c-e57f-4560-bb2f-ff36d25001b4.png)
Project mới được tạo trong Xcode 9 mặc định để sử dụng AutoLayout và  Safe Area Layout Guides.. Đây là cách đơn giản nhất để giảm công việc cần thiết cho thiết kế iPhone X.<br>
### b. Sử dụng  các UI<br>
Bây giờ hãy thêm Search bar vào Scrope bar, và bạn cũng có thể thay đổi kích thước title<br>
![](https://images.viblo.asia/f83f205c-bd96-476a-aebe-a298e673883e.png)
Tiếp theo, mở MasterViewController.swift: nó đã có hầu hết mã bộ điều khiển tìm kiếm. Bạn chỉ cần thay thế nhận xét TODO trong setupSearchController () bằng cách này:<br>
![](https://images.viblo.asia/9ecd2880-6599-4247-bd3d-10e34496e6c4.png)
Nếu thiết bị đang chạy iOS 11, bạn đặt thuộc tính searchController của navigation item; còn không, bạn đặt thanh tìm kiếm trong tableview header view<br>
Build và chạy trên trình giả lập iPhone X.  Sau đó xoay trình mô phỏng thành ngang và nhấn vào trường tìm kiếm để hiển thị thanh phạm vi: <br>
![](https://images.viblo.asia/837a3d49-09b9-46df-a53c-b4c96e1ed350.png)
IPhone X có chiều rộng nhỏ gọn theo hướng ngang, vì vậy nó hoạt động giống như iPhone 8 chứ không phải 8 Plus.<br>
### c. Status Bar<br>
Thanh trạng thái iPhone X cao hơn, do đó tự động định vị nội dung dựa trên loại thiết bị hơn là  thay vì giả định chiều cao cố định 20-pt.<br>
Luôn hiển thị thanh trạng thái trừ khi việc bạn ẩn nó sẽ thêm giá trị thực vào ứng dụng của bạn.<br>
### d. 3x Screen Resolution<br>
Ứng dụng không sử dụng 3x nếu ứng dụng không có LaunchScreen.storyboard.<br>
### e.Home Indicator Special Cases<br>
Nếu ứng dụng của bạn sử dụng cử chỉ vuốt từ trên xuống, hãy bật edge protect  bằng tính năng preferredScreenEdgesDeferringSystemGestures(): người dùng phải vuốt lên hai lần để truy cập  home indicator.<br>
Nếu ứng dụng của bạn có trải nghiệm xem thụ động, hãy bật auto-hiding ẩn với prefersHomeIndicatorAutoHidden (): home indicator sẽ biến mất nếu người dùng không chạm vào màn hình trong vài giây và xuất hiện lại khi người dùng chạm vào màn hình<br>
### f. iPhone X Simulator vs Device<br>
Sử dụng Simulator để kiểm tra bố cục dọc và ngang.<br>
Sử dụng thiết bị iPhone X để kiểm tra hình ảnh màu rộng, Kim loại, camera mặt trước.<br>
## 4. Cập nhật từ ứng dụng hiện có<br>
Điều gì sẽ xảy ra nếu bạn muốn cập nhật ứng dụng hiện có cho iPhone X? Trước tiên, hãy cập nhật nội dung của nó, bao gồm hình nền, sang PDF hoặc thêm hình ảnh 3x. Sau đó, hãy chắc chắn rằng nó có một LaunchScreen.storyboard, và bật Safe Area.<br>
Tiếp theo, đặt Chế độ xem thành iPhone X và kiểm tra mọi cấu hình bố cục.Build và chạy nó trên trình giả lập iPhone X. <br>
![](https://images.viblo.asia/4051a586-f2ba-4ed3-b44e-1e9359f15fc0.png)
Nhưng có một dòng giữa thanh điều hướng và thanh tìm kiếm, bởi vì thanh tìm kiếm nằm trong tableview header view:<br>
![](https://images.viblo.asia/4d804f6c-6a4b-49af-8ab8-5b7ca158641c.png)
Điều này thật dễ dàng - chỉ cần sao chép mã NewCandySearch để đặt searchController của thanh điều hướng vào CandySearch. Mở MasterViewController.swift trong cả hai dự án và sao chép các dòng này từ NewCandySearch: <br>
![](https://images.viblo.asia/a2c70989-ecf6-4b15-bf1b-4076793f8cec.png)
Trong MasterViewController.swift của CandySearch, dán các dòng này trong viewDidLoad () và bỏ comment ra dòng này:<br>
![](https://images.viblo.asia/ac5f52cf-043c-41a1-bc2f-c709a7bdc47e.png)
Bây giờ hãy mở AppDelegate.swift và tìm các dòng sau:<br>
![](https://images.viblo.asia/c7fa6fa2-67f7-4f41-831d-6167ac699989.png)
óa hoặc nhận xét dòng đầu tiên: thanh tìm kiếm sẽ có màu sắc từ thanh điều hướng.<br>
Build và chaỵ để xem kết quả:<br>
![](https://images.viblo.asia/cf1ef763-265b-49a1-938f-99a2dd15209d.png)
Do đó, màu nền của thanh trạng thái được cố định, nhưng giờ đây trường văn bản cũng có màu xanh lá cây, khiến bạn khó nhìn thấy văn bản và biểu tượng lời nhắc của trường tìm kiếm. Nhưng bạn có thể sửa lỗi đó - thay đổi cài đặt xuất hiện thứ ba trong AppDelegate.swift thành:<br>
![](https://images.viblo.asia/2cdfa15f-6b90-42c0-81ab-1b2ef901ae37.png)
Dưới đây, thêm dòng sau:<br>
![](https://images.viblo.asia/ddd2c440-0b48-4e06-b1ca-3a941e79f871.png)
## 5. Tổng kết<br>
Thế là ban đã có thể tạo mới hoặc chuyển đổi sang giao diện của iphone X. Chúc bạn thành công!<br>
Tài liệu tham khảo: https://www.raywenderlich.com/173928/develop-design-iphone-x