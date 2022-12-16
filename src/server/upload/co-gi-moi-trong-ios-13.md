# Có gì mới trong iOS 13
Hệ điều hành iOS 13 của Apple đã được phát hành ngày 19 tháng 9 vừa qua, bản update iOS 13.1 dự kiến sẽ được cập nhật ngày 30-9.
Đến tháng 4 năm 2020, tất cả các ứng dụng iOS được gửi tới App Store sẽ cần được xây dựng với SDK iOS 13 trở lên.
Phiên bản Xcode 11 hiện tại cũng đã release và đã được đẩy lên AppStore, anh em update ngay nhé :DD
## 1- Đầu tiên, ứng dụng của bạn trông như thế nào?
Bạn cần xây dựng ứng dụng của mình bằng Xcode 11, sau đó chuyển cho nhóm QA của bạn để bắt đầu thử nghiệm vì bạn có thể tìm thấy các vấn đề cụ thể hơn trong thiết kế và tài nguyên dự án của mình.
## 2- Cập nhật sự phụ thuộc của bạn
Sau đó, bạn cần kiểm tra thay đổi phụ thuộc và bản phát hành, một số SDK và công cụ có phiên bản mới để hỗ trợ iOS 13, bao gồm sửa lỗi và hỗ trợ công cụ mới.
## 3- Dark Mode
![](https://images.viblo.asia/1f81c5e4-a434-4af9-9f60-7b8840202fdf.jpeg)
> Bạn cần quyết định xem ứng dụng của bạn có hỗ trợ Chế độ tối hay không.
Nếu bạn muốn hỗ trợ nó (hãy cẩn thận, nó cần nhiều thời gian hơn bạn nghĩ), bạn sẽ tìm thấy ở đây các phiên WWDC tuyệt vời để giúp bạn thực hiện từng bước này.
### Nếu không, bạn có thể buộc xuất hiện trên ứng dụng của mình
Nếu bạn không muốn áp dụng chế độ Dark trong ứng dụng của mình, hãy bỏ light mode của Google, nếu muốn sử dụng Dark mode hoặc đơn giản là không áp dụng Dark mode của bạn vào một thời điểm khác, thêm một khóa UIUserInterfaceStyle mới vào thông tin ứng dụng của bạn. giá trị cho Light hoặc Dark tối.
![](https://images.viblo.asia/b4dd0a91-4c7c-40cf-a0e9-1c3e9a171094.png)
## 4- Controls And Bars
![](https://images.viblo.asia/a04e95cc-7f05-45be-8a33-8fe1009c5d42.png)
Các thành phần đã được tinh chỉnh, đặc biệt đối với các điều khiển được phân đoạn. Sử dụng native components được đề xuất. Tương tự đối với UISteppers, mọi người đang phàn nàn về thay đổi hành vi ở đây (màu sắc, giá trị cập nhật tự động, v.v.)
## 5- Phương thức trình bày
![](https://images.viblo.asia/ebcf63bd-2c64-4713-b8dd-8cd354203904.png)
> Modality is a design technique that presents content in a temporary mode that’s separate from the user’s previous current context and requires an explicit action to exit.
Nếu bạn dựa vào việc có một chế độ không bị loại bỏ (tức là: chỉ loại bỏ phương thức sau khi người dùng chọn quốc gia của mình), trên iOS 13, theo mặc định, người dùng có thể chỉ cần vuốt chế độ xuống để loại bỏ nó, hãy xem [video](https://twitter.com/fcbunn/status/1136725792619147264?lang=en) này.

Bạn có thể vô hiệu hóa bộ này isModalInpresentation = true, bạn có thể cập nhật nó trong suốt vòng đời([Tài liệu Apple](https://developer.apple.com/documentation/uikit/view_controllers/disabling_pulling_down_a_sheet?changes=latest_minor)). Tùy chọn khác là bắt buộc kiểu trình bày toàn màn hình.

Tùy chọn khác là bắt buộc kiểu trình bày toàn màn hình cũng thường thấy trên iOS 12 hoặc thấp hơn modalPftimeationStyle = .fullScreen.
## 6- SF Symbols
![](https://images.viblo.asia/ebe9b96a-a20c-4614-962d-adfa08089286.png)
SF Symbols cung cấp một bộ hơn 1.500 icon nhất quán, có thể định cấu hình cao mà bạn có thể sử dụng trong ứng dụng của mình. Apple đã thiết kế các SF Symbols để tích hợp hoàn hảo với phông chữ của hệ thống San Francisco, vì vậy các biểu tượng tự động đảm bảo căn chỉnh dọc quang với văn bản cho tất cả các trọng lượng và kích thước. SF Symbols có sẵn trong một loạt các trọng lượng và tỷ lệ để giúp bạn tạo ra các thiết kế có thể thích ứng. Bạn có thể tải xuống ứng dụng SF Symbols [tại đây.](https://developer.apple.com/design/downloads/SF-Symbols.dmg)
Bạn có thể sử dụng chúng trong UIImage như thế này:
```
UIImage(systemName: "star.fill")
```
Sau tất cả những điều này, tôi nghĩ ứng dụng của bạn sẽ sẵn sàng hoạt động tốt với các tính năng và cập nhật mới của iOS 13.
Nhưng ở đó, luôn luôn có nhiều việc phải làm, chẳng hạn như hỗ trợ các màu sắc năng động mới. Tìm hiểu thêm tại [WWDC](https://developer.apple.com/videos/play/wwdc2019/224/).