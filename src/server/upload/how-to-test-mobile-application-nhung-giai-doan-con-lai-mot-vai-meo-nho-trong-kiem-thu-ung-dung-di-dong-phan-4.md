Hôm nay chúng ta tìm hiểu nốt về các giai đoạn còn lại trong kiểm thử di động và một vài mẹo nhỏ hữu ích khi kiểm thử ứng dụng di động.

### X. Change relate testing - Kiểm thử về sự thay đổi

![](https://images.viblo.asia/32f931ac-4f57-4270-b600-a50e2423457e.png)

Bạn thực hiện qua các giai đoạn kiểm thử và tìm thấy một số lỗi. Do đó, một số thay đổi trong mã code được thực hiện đối với ứng dụng của bạn để sửa lỗi đó. Giai đoạn kiểm thử này sẽ tập trung vào sự thay đổi đó.

* Các mục tiêu chính của kiểm thử về sự thay đổi đó là:
    * Chắc chắn rằng nhóm của bạn đã sửa thành công tất cả các lỗi được phát hiện (có thể gọi là Retesting hoặc Confirmation testing ở bước này cũng được). Nói một cách đơn giản thì các testcase thực hiện ban đầu xảy ra lỗi sẽ được chạy lại, và lần này chúng sẽ được thông qua mà không có lỗi hay gặp vấn đề gì.
    * Kiểm tra rằng những sự thay đổi mới sẽ không dẫn đến sự xuất hiện của các lỗi mới ([Kiểm thử hồi quy - Regression testing](https://viblo.asia/p/the-nao-la-kiem-tra-lai-retesting-va-kiem-thu-hoi-quy-regression-testing-eW65GxxxKDO)). Trên thực tế, kiểm thử hồi quy không chỉ thông qua những testcase đã gặp lỗi, mà còn kiểm tra được tất cả chứng năng của ứng dụng của bạn.

Một số công cụ hữu ích để kiểm thử về sự thay đổi cho ứng dụng của bạn: [Appium](http://appium.io/), [Robotium](https://github.com/RobotiumTech/robotium), [Ranorex](http://www.ranorex.com/).

### XI. Beta testing

Cuối cùng, bạn có phiên bản đầy đủ chức năng trước khi phát hành của ứng dụng di động. Sẽ là tốt hơn để đánh giá khả năng về khả năng và sự ổn định của chương trình trước khi tới người dùng cuối trong tương lai.

Beta testing là giai đoạn kiểm tra và sửa lỗi ở phiên bản thử nghiệm của chương trình. Mục đích chính của nó là xác định số lượng lỗi tối đa để loại bỏ nó trước khi bản phát hành cuối cùng của ứng dụng được đưa ra thị trường.

Những người có nhiều kinh nghiệm làm việc với các loại ứng dụng tương tự, với phiên bản trước đó hoặc với một nhóm người nhất định sẽ được chọn làm những người dùng thử nghiệm cho Beta testing.

![](https://images.viblo.asia/9044d0b6-32c6-44ef-a3be-37512520fafe.jpeg)

* Sau đây là một vài điểm mà bạn nên xem xét khi thực hiện Beta testing.
    * Số người tham gia thử nghiệm (Một vài nước, một quốc gia hay một nhóm người...).
    * Thời gian thực hiện thử nghiệm (Kéo dài bao lâu: tầm 1 tháng tới 1 năm tuỳ vào độ lớn của ứng dụng).
    * Chi phí thực hiện kiểm tra (Mất phí hay không, nhiều hay ít).
    * Đối tượng nhắm tới (Một số người đã từng dùng app phiên bản cũ, một số người tại thị trường sắp nhắm tới...).

Mặc dù bạn cần phải bỏ ra một số tiền để bắt đầu BETA testing, nhưng đó sẽ là một sự đầu tư tốt cho chất lượng ứng dụng di động của bạn.

Một số nền tảng phổ biến cho việc kiểm thử thử nghiệm:  [HockeyApp](https://hockeyapp.net/#s), [Ubertesters](https://ubertesters.com/), [TestFlight](https://developer.apple.com/testflight/).

### XII. Certification testing



Mỗi cửa hàng ứng dụng đều có những quy tắc thiết kế và cài đặt tệp khác nhau. Certification testing được thực hiện nhằm đảm bảo ứng dụng của bạn đáp ứng được các yêu cầu khắc khe đó của các cửa hàng phổ biến như Google Play, AppStore, Windows phone.

Hãy cùng nhau xem xét các tiêu chí chính để ứng dụng của bạn đáp ứng được tiêu chuẩn, điều khoản sử dụng và thoả thuận cấp phép của các cửa hàng ứng dụng.

* Android (Google Play):
    * File cài đặt của ứng dụng (.apk) phải tuân thủ [chính sách của Google](https://play.google.com/intl/us/about/developer-content-policy/#!?modal_active=none).
    * Ứng dụng đáp ứng được yêu cầu về UI của [UIG](https://developer.android.com/guide/practices/ui_guidelines/index.html).
    * Không có virus trong ứng dụng của bạn. Chợ ứng dụng Google Play sẽ tự động quét tìm virus và có thể chặn tài khoản của bạn nếu phát hiện ra virus hoặc mã nguồn độc.
    * Phiên bản cập nhật ứng dụng của bạn nên tuân thủ một trình tự nhất định về ứng dụng.

* iOS (AppStore):
    * Ứng dụng đáp ứng được yêu cầu về UI của [HIG](https://developer.apple.com/design/human-interface-guidelines/ios/overview/themes/).
    * Ứng dụng phải có tên duy nhất, không bị trùng với ứng dụng nào có sẵn trên store.
    * Cần phải có một liên kết để nhận được phản hồi từ nhà phát triển.
    * Ứng dụng phải được đưa vào danh mục cụ thể.
    * App Store sẽ kiểm tra sự tương thích ứng dụng của bạn cho các thiết bị.
    * Ứng dụng không chứa các tài liệu cấm lưu hành, sự chậm trễ về việc sử dụng, sự lặp lại các chức năng trong ứng dụng.

* Windows phone (Windows phone):
    * Ứng dụng đáp ứng được yêu cầu kỹ thuật của [chứng chỉ ứng dụng](http://msdn.microsoft.com/en-us/library/windowsphone/develop/hh184843(v=vs.105).aspx).
    * Mô tả rõ ràng về yêu cầu phần cứng và kết nối mạng.
    * Các chức năng được mô tả trong phần mô tả hoặc ảnh chụp màn hình của ứng dụng thì phải được sử dụng bình thường và đầy đủ.
    * Tuỳ chọn để có thể kiểm soát được chức năng tự động phát nhạc là bắt buộc phải có.

## Một số mẹo để kiểm thử ứng dụng di động được tốt nhất.

Hãy cùng tôi hệ thống hoá lại kiến thức đã đạt được ở series 4 phần này, và xác định được mẹo chính để kiểm thử ứng dụng di động:

1. Tìm hiểu về loại ứng dụng bạn sẽ test.
2. Biết rõ sự khác biệt giữa ứng dụng máy tính và ứng dụng di động.
3. Phải lường tới sự khác biệt, ảnh hưởng từ phần cứng.
4. Sử dụng thiết bị thực thay thiết bị ảo khi có thể.
5. Đừng cố tìm kiếm gì mới để kiểm thử, hay sử dụng những công cụ quen thuộc và dễ sử dụng với bạn.
6. Tận dụng những lợi thế từ cloud mobile testing.
7. Xác thực những lỗi bạn tìm được luôn kèm theo: ảnh chụp màn hình, log, video...
8. Kiểm tra hoạt động của ứng dụng của bạn hoạt động ở cả 2 chế độ là portrait và landscape (hướng đứng và ngang, thường hay bị bug với những thiết bị hỗ trợ xoay ngang ở ngoài như: Tablet, Ipad, Samsung+, iphone+...).
9. Đừng bỏ qua (nhưng không nên lạm dụng) kiểm thử bằng emulator và simulator.
10. Xác định được hiệu năng ứng dụng của bạn.
11. Đừng tự động hoá tất cả mọi thứ.
12. Sử dụng người dùng thật để kiểm tra ứng dụng của bạn.
13. Tiết kiệm, giải phóng thời gian để giải quyết các tình huống thử nghiệm phức tạp hơn, độc đáo hơn (như monkey test, free test...).
14. Xem xét nhiều tới yếu tố con người.

---
[Phần 1: How to test mobile application? Tổng quan, so sánh sự khác biệt về Mobile app & Desktop app, chiến lược kiểm thử](https://viblo.asia/p/how-to-test-mobile-application-tong-quan-so-sanh-su-khac-biet-ve-mobile-app-desktop-app-chien-luoc-kiem-thu-phan-1-eW65GP66KDO).


[Phần 2: How to test mobile application? Các giai đoạn, phân loại trong kiểm thử ứng dụng di động](https://viblo.asia/p/how-to-test-mobile-application-cac-giai-doan-phan-loai-trong-kiem-thu-ung-dung-di-dong-phan-2-gDVK29Wr5Lj).

[Phần 3: How to test mobile application? Những giai đoạn trong kiểm thử ứng dụng di động (Phần 3)](https://viblo.asia/p/how-to-test-mobile-application-nhung-giai-doan-trong-kiem-thu-ung-dung-di-dong-phan-3-RnB5pBWbZPG).

---


Nguồn:

Get Easy QA: https://geteasyqa.com/qa/mobile-apps-testing/

Google: https://www.google.com