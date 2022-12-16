## Giới thiệu
Như chúng ta đã biết, tại sự kiện vào tháng 10 năm 2020, Apple đã công bố bốn mẫu iPhone mới: **iPhone 12 mini**, **iPhone 12**, **iPhone 12 Pro** và **iPhone 12 Pro Max**. **IPhone 12** và **12 Pro** có độ phân giải màn hình giống hệt nhau và hoạt động giống hệt nhau. Vì vậy, chỉ có ba độ phân giải màn hình thực sự cần xem xét.
* iPhone 12 mini 5,4 "với 1080 × 2340 pixel
* iPhone 12/12 Pro 6.1 "với 1170 × 2532 pixel
* iPhone 12 Pro Max 6.7 "với 1284 × 2778 pixel

Không có độ phân giải nào trong số này tương ứng với các thiết bị hiện có. Trong bài viết này chúng ta cùng nhau so sánh các thiết bị hiện có là iPhone SE thế hệ thứ 2, 11 Pro và 11 Pro Max với các mẫu mới và chúng ta cũng xem xét cả tính năng *Display Zoom* (được Apple giới thiệu trên iOS 14) trong khi so sánh chúng.
Cùng nhau bắt đầu nào!!!! 

## 2nd Gen iPhone SE
iPhone SE thế hệ thứ hai có cùng kích thước và hoạt động tương tự như iPhone 6, 6s, 7 và 8. 
### Standard Zoom
iPhone SE thế hệ thứ hai có độ phân giải *375 × 667 points* ở độ phân giải gốc.

![Xcode 12.1 build of Adaptivity on 2nd generation iPhone SE running iOS 14.1 in portrait](https://images.viblo.asia/fbfdbc7d-e35e-4679-91cb-f50dd5f409c7.png)

![Xcode 12.1 build of Adaptivity on 2nd generation iPhone SE running iOS 14.1 in landscape](https://images.viblo.asia/1e29cfd3-2584-440d-91d6-1f026b26ec77.png)

### Display Zoom
Khi bật tính năng *Display Zoom*, iPhone SE thế hệ thứ 2 hiển thị độ phân giải giống với iPhone SE thế hệ thứ nhất được phóng to lên 320 × 568 points. Đó là độ phân giải tương tự như iPhone 5 và 5S. Tuy nhiên, lưu ý rằng navigation bar có chiều cao là 112 points, cao hơn 1 point so với iPhone SE sử dụng thực tế.

![Xcode 12.1 build of Adaptivity on 2nd generation iPhone SE running iOS 14.1 in portrait with Display Zoom](https://images.viblo.asia/0993c75b-c54f-45ad-9ca9-4c577728ef20.png)

![Xcode 12.1 build of Adaptivity on 2nd generation iPhone SE running iOS 14.1 in landscape with Display Zoom](https://images.viblo.asia/f8c32da1-9928-4e03-be1c-accbe0d594ca.png)

## iPhone 11 Pro
iPhone 11 Pro có cùng kích thước và hoạt động tương tự như iPhone X và XS.

### Standard Zoom
iPhone 11 Pro có độ phân giải *375×812 points* ở độ phân giải gốc.

![Xcode 12.1 build of Adaptivity on iPhone 11 Pro running iOS 14.1 in portrait](https://images.viblo.asia/23c543ea-846b-4c30-a6b1-d14e7886b659.png)

![Xcode 12.1 build of Adaptivity on iPhone 11 Pro running iOS 14.1 in landscape](https://images.viblo.asia/b53d7a00-1829-41c1-b5f0-9b71ab41f15e.png)

### Display Zoom
Khi bật tính năng *Display Zoom*, iPhone 11 Pro  được phóng to lên 320×693 points khi app được build bằng Xcode 12 trở lên. Điều này không tương ứng với bất kỳ thiết bị nào trước đó. Lưu ý rằng cả top và bottom bar đều nhỏ hơn một chút so với kích thước ban đầu.

![Xcode 12.0 build of Adaptivity on iPhone 11 Pro running iOS 14.1 in landscape with Display Zoom](https://images.viblo.asia/c22902a5-65c7-42de-ba8d-e025ba2972b2.png)

![Xcode 12.0 build of Adaptivity on iPhone 11 Pro running iOS 14.1 in portrait with Display Zoom](https://images.viblo.asia/98282cf4-a07e-4e04-867b-db587a5f3ab8.png)

iPhone 11 Pro không hỗ trợ Display Zoom trên iOS 13. Khi được build với Xcode 11 (tức là được liên kết với iOS 13), iPhone 11 Pro với Display Zoom hiển thị iPhone SE 320 × 568 points. Điều này đảm bảo ứng dụng không nhìn thấy độ phân giải màn hình không tồn tại trên iOS 13. Ứng dụng cho rằng **status bar** cao 20 point (như trên iPhone SE thế hệ 1) nhưng iOS tiếp tục đặt thời gian và các chỉ số khác ở trên cùng của màn hình.

![Xcode 11.7 build of Adaptivity on iPhone 11 Pro running iOS 14.1 in portrait with Display Zoom](https://images.viblo.asia/1a4465a2-c699-4344-aeb2-8164513d4386.png)

![Xcode 11.7 build of Adaptivity on iPhone 11 Pro running iOS 14.1 in landscape with Display Zoom](https://images.viblo.asia/32ef40bb-b85c-46af-b2c9-efacb83d5554.png)

## iPhone 11 Pro Max

iPhone 11 Pro Max có cùng kích thước và có hoạt động tương tự như iPhone XS Max. IPhone 11 và XR có kích thước vật lý hơi khác nhau và chỉ là 2x thay vì 3x, nhưng có cùng độ phân giải về điểm và có thể được coi là tương đương về mặt chức năng như iPhone 11 Pro Max.

### Standard Zoom
iPhone 11 Pro Max có độ phân giải 414 × 896 points ở độ phân giải gốc. Chiều cao của ***Bar*** giống như trên iPhone 11 Pro.

![Xcode 12.1 build of Adaptivity on iPhone 11 Pro Max running iOS 14.1 in portrait](https://images.viblo.asia/dde8fd15-c02d-4d38-b6c2-4dbcc9b0c6bb.png)

![Xcode 12.1 build of Adaptivity on iPhone 11 Pro Max running iOS 14.1 in landscape](https://images.viblo.asia/22864476-475c-42ca-b2d6-1ef0090e31cd.png)

### Display Zoom
Khi bật tính năng Display Zoom, iPhone 11 Pro Max sẽ hiển thị độ phân giải của iPhone 11 Pro được phóng to lên 375 × 812 points. Không giống như iPhone 11 Pro, iPhone 11 Pro Max đã hỗ trợ tính năng Phóng to hiển thị trong iOS 13. Các ứng dụng được xây dựng bằng Xcode 11 sẽ có cùng độ phân giải của iPhone 11 Pro với các ứng dụng được xây dựng Xcode 12. Một lần nữa, thanh trên và dưới có kích thước hơi khác so với iPhone 11 Pro thực tế. *Status bar* ngắn hơn 4 point và bottom bar hơn 3 điểm, cho diện tích nội dung dọc nhiều hơn 7 point so với trên iPhone 11 Pro.

![Xcode 12.1 build of Adaptivity on iPhone 11 Pro Max running iOS 14.1 in portrait with Display Zoom](https://images.viblo.asia/b30d9fdf-156c-41eb-b633-18162ffbae8d.png)

![Xcode 12.1 build of Adaptivity on iPhone 11 Pro Max running iOS 14.1 in landscape with Display Zoom](https://images.viblo.asia/c941dd6b-b621-42dc-a370-2b7a4d12d28a.png)

## iPhone 12 mini
### Standard Zooom
Màn hình 1080 × 2340 pixel sẽ đề xuất độ phân giải mới là 360 × 780 point, nhưng iPhone 12 mini thực sự cho thấy độ phân giải thu nhỏ của iPhone 11 Pro là 375 × 812 point. Điều này có nghĩa là iPhone 12 mini không giới thiệu độ phân giải mới. Tuy nhiên, vì màn hình vật lý thực tế tính bằng *pixel* không phải là bội số nguyên của độ phân giải tính bằng ***points*** nên sẽ luôn mở rộng. Với màn hình 3x, hy vọng chúng sẽ khó nhìn. *Status bar* cao hơn 6 point so với iPhone 11 Pro. *Bottom bar* có cùng chiều cao.

![](https://images.viblo.asia/d8f5dd91-e86b-4098-89fd-1f84a8d6fee6.png)

![](https://images.viblo.asia/d729a33c-b280-41a9-8c81-829f9dbe6e69.png)

### Display Zoom
Vì iPhone 12 mini đang hoạt động như thể nó là một chiếc iPhone 11 Pro, khi tính năng Display Zoom được bật, iPhone 12 mini sẽ hiển thị độ phân giải được phóng to lên là 320 × 693 points khi ứng dụng được xây dựng bằng Xcode 12.0 trở lên. Status bar cao hơn 5 points so với iPhone 11 Pro với Display Zoom. Bottom bar có cùng chiều cao.

![](https://images.viblo.asia/80f43de9-dce1-47af-8f5f-fdb17bc8710e.png)

![](https://images.viblo.asia/c0e52b26-931d-404c-9489-cecbabb259dc.png)

## iPhone 12 / 12 Pro
### Standard Zoom
Không giống như iPhone 12 mini, the iPhone 12 và 12 Pro giới thiệu một độ phân giải mới 390x844 points cho độ phân giải gốc. Apps phải được build bẳng Xcode 12.1 trở đi để có thể nhìn thấy độ phân giải này. Ở chiều ngang, lưu ý rằng danh mục kích thước ngang là nhỏ gọn (giống như iPhone 11 Pro và các thiết bị nhỏ hơn). Thanh trạng thái đã tăng 3 điểm so với iPhone 11 Pro. Thanh dưới cùng là không thay đổi.

![](https://images.viblo.asia/ac46b55f-a99e-41c3-89db-b2aa28db3a69.png)

![](https://images.viblo.asia/96a76ce9-2f80-4d4a-a02c-1bc9dbf24adf.png)

### Display Zoom
Khi bật tính năng Display Zoom, iPhone 12 và 12 Pro hiển thị độ phân giải được phóng to lên là 320 × 693 points khi ứng dụng được tạo bằng Xcode 12.0 trở lên. Đây là độ phân giải tương tự như iPhone 11 Pro và iPhone 12 mini với Display Zoom. Status bar cao hơn 1 point so với iPhone 11 Pro tương đương với tính năng Display Zoom trong khi bottom bar ngắn hơn 1 point.

![](https://images.viblo.asia/5fec3d2e-bfbd-4d85-a58a-12d7d104118f.png)

![](https://images.viblo.asia/57857667-1197-498d-92da-5481b56cb791.png)

## iPhone 12 Pro Max
### Standard Zoom
Giống như iPhone 12 và 12 Pro, iPhone 12 Pro Max giới thiệu độ phân giải hoàn toàn mới 428 × 926 points phân giải gốc. Vì đây là độ phân giải mới nên các ứng dụng phải được xây dựng bằng Xcode 12.1 trở lên để xem được. Stutus bar cao hơn 3 điểm so với iPhone 11 Pro Max. Bottom bar là không thay đổi.

![](https://images.viblo.asia/f092973e-9d98-4d90-9b5b-b7f416c514c4.png)

Ở chiều ngang, hãy lưu ý rằng danh mục kích thước ngang là bình thường (giống như iPhone 11 Pro Max).

![](https://images.viblo.asia/5d42ff95-4fc1-4fa3-a653-c6a77b16f283.png)

### Display Zoom
Khi bật tính năng Display Zoom, iPhone 12 Pro Max hiển thị độ phân giải của iPhone 11 Pro được phóng to lên 375 × 812 points. Status bar ngắn hơn 3 points và bottom bar ngắn hơn 4 điểm, cho diện tích nội dung dọc nhiều hơn 7 points so với trên iPhone 11 Pro.

![](https://images.viblo.asia/248b3552-26ad-4fdd-b5fa-caeb1a855fee.png)

![](https://images.viblo.asia/c5914012-7a54-4ae3-8cb9-2ea09e5586a4.png)

## Kết luận

Apple cung cấp cho chúng ta khả năng tương thích các ứng dụng với các thiết bị mới rất tuyệt vời,  phạm vi iPhone 12 cũng không khác (ngoại trừ iPhone 12 mini, luôn có độ phân giải hợp lý của iPhone 11 Pro được thu nhỏ để lấp đầy màn hình của nó). Chiều cao thanh khi chia tỷ lệ không phải lúc nào cũng khớp với thiết bị gốc, vì vậy khả năng tương thích ngược không chính xác 100%. Để xem độ phân giải mới của iPhone 12/12 Pro và 12 Pro Max, các ứng dụng phải được build bằng Xcode 12.1.

*Display Zoom* thường hiển thị phiên bản được phóng to của độ phân giải nhỏ hơn của thiết bị hiện có. Ngoại lệ là kích thước iPhone X, XS và 11 Pro không hỗ trợ Display Zoom cho đến iOS 14. Chúng hiển thị độ phân giải mới là 320 × 693 points khi được xây dựng với Xcode 12 (tức là so với iOS 14) và một hộp chữ cái 320 × 568 points khi được xây dựng bằng Xcode 11.

Qua bài viết này chúng ta cũng có thể nhận thấy khi build bằng các version Xcode khác nhau thì độ hiển thị màn hình cũng sẽ khác nhau và khi thay đổi chế độ *Display Zoom* cũng tương tự, vì vậy khi phát triển với các thiết bị mới chúng ta cần phải chú ý đến việc này để cho giao diện không bị vỡ trên các màn hình. 

Bài viết được dịch theo nguồn:

https://hacknicity.medium.com/how-ios-apps-adapt-to-the-various-iphone-12-screen-sizes-e45c021e1b8b