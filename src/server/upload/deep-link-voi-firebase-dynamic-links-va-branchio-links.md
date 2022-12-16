*Câu chuyện nguồn gốc  của Deeplink* :thinking:

Theo thống kê, mỗi tháng có hơn [100k app được upload lên Google Play](https://www.statista.com/statistics/1020956/android-app-releases-worldwide/) và khoảng [30k](https://42matters.com/ios-apple-app-store-statistics-and-trends) app lên App Store. Một thị trường sôi động và tiềm năng, nhưng làm  sao để thu hút được ánh nhìn, sự tò mò của người dùng. Đây là lúc mà Quảng Cáo  Online (Ad) nhảy vào cuộc chơi. 

Để quảng bá một app, cách làm phổ biến là Ad sẽ *khoe* một sản phẩm đặc trưng của app. Để tiếp cận sản phẩm này, thì user cần phải cài app, đây là rào cản khiến người dùng không thể đến ngay đến sản phầm mà họ đang "tò mò" đó.

## Ấn tượng đầu tiên..

Lấy ví dụ Philips Kitchen+ app. App này chia sẻ hàng tá công thức món ăn có thể nấu với chiếc bếp nấu Airfryer. Công thức nấu ăn này được  dùng để thu hút user.

Giả sử một user trông thấy quảng cáo, thấy thú vị với món "Gà Hầm Bắc  Âu" và quyết định click vào đó, thì họ rõ ràng là muốn bay đến ngay công thức của món ăn đó ngay sau khi họ cài app (nếu trên điện thoại họ lúc đó chưa có app)

![Deep linking example](https://photos.infinum.com/store/584e4468e803004b974d27a59cfb350e.jpg)
Trên đây là một luồng đi mà user mong đợi

Nếu họ cài app xong mà chỉ được dẫn tới màn home thì chắc họ sẽ khá  "bực" đúng ko nào anh em, và có nguy cơ là cái app này sẽ bị xóa ngay sau đó :cry:

## Deeplink - và vấn đề được  giải quyết
Nhà phát triển nào cũng rất đau lòng nếu biết app mình bị xóa phải ko anh em. Để giảm thiểu rủi ro này, deeplink được phát minh để đưa user đến nơi mà họ muốn :sunglasses:

Về "vẻ ngoài" thì deeplink không khác gì link thường, nhưng nó chứa đựng logic cần thiết để làm ít nhất 2 việc: 
* đưa user đến app store để install app đó; 
* và sau đó là mở cái màn hình cụ thể trong app mà ta mong muốn.

Vậy, làm sao để tạo deeplink? 

### Firebase Dynamic Links

Option đầu tiên anh em có thể kể đến là Dynamic Links của *ông lớn* Firebase. :sunflower: 

[Firebase](https://firebase.google.com/) thì chắc anh em cũng  nghe nhiều  rồi, đây là một nền tảng được phát triển bởi Google, cung cấp hàng loạt services phục vụ cho việc phát triển ứng dụng mobile hay web app. Một vài service đã làm nên thương hiệu như: Cloud Firestore, Cloud Messaging, Google Analytics và **Firebase Dynamic Links**.

[Firebase Dynamic Links](https://firebase.google.com/docs/dynamic-links) cho phép anh em tạo link cross-platform, có nghĩa là một link có thể hoạt động ở các nền tảng khác nhau, gồm: Android, iOS, và browser của PC. Anh em có thể thiết lập những xử lý mong muốn sau khi user click vào cái link đó trên thiết bị của họ. 

Anh em có thể tạo Dynamic Links này bằng 2 cách chính: 
* Trên Firebase console
* Hoặc tạo từ app mobile hoặc webapp thông qua SDK. 

#### Các step tạo Dynamic Links cơ bản

![](https://images.viblo.asia/5d78b7e8-a339-442b-a58e-6e9e593a5819.png)

1. Tạo URL public (dạng short link, với domain là domain mà bạn đã đăng kí cho app của bạn) 
2. Nhập URL mà sẽ gửi đến app (trường hợp user click vào URL trên PC, PC sẽ mở URL luôn trên browser, nên URL này nên là một web page tồn tại anh em nhé)
3. Thiết lập xử lý sau khi url được click trường hợp thiết bị của User là iOS
4. Nhập URL của App Store trường hợp User chưa cài App
5. SThiết lập xử lý sau khi url được click trường hợp thiết bị của User là Android
6. Nhập URL của Google Play Store trường hợp User chưa cài App

Ngoài ra, anh em còn có thể setting **meta tags** cho Dynamic Link của mình, meta tags dùng để  quy định title, description, image cho phần preview mô tả link khi link này được xuất hiện trên các mạng xã hội chẳng hạn.

Firebase Console còn cung cấp  cho anh em con số thống kê, lượt click, lượt cài đặt app,... để phục vụ các chiến dịch marketing và phân tích thống kê người dùng.

Điểm ngon lành nhất của Firbase Dynamic Links là nó **Free** 100% cho anh em, bất chấp anh em có tạo hàng triệu link đi chăng nữa.

### branch.io

Không như nền tảng "hầm hố" Firebase cung cấp hàng tá service các kiểu để anh em develop mobile / web app, [Branch](https://branch.io/) là nền tảng tập trung duy nhất vào sứ mệnh marketing và deep link. Firebase Dynamic Links có tính năng gì thì Branh Link  cũng làm được **+ thêm** vài tính năng chuyên biệt. 

- Branch Link cho phép anh em gán bao nhiêu tùy thích cặp key-value mong muốn được gửi đến app, trong khi Firebase chỉ support một web URL mà thôi
- Branch hõ trợ nhiều "chợ" Android: Google Play Store, Huawei App Gallery, Vivo App Store, Oppo App Market.
- Branch deep links được hỗ trợ sài trên Huawei, trong khi Firebase Dynamic Links thì "bó tay" vì Huwei không chơi với Google services :smirk:
- Branch cung cấp nhiều số liệu thống kê xoay quanh deep link hơn

Anh em lưu ý, việc  tạo Branch link thì free, cơ mà để khai thác hết tiềm năng thì anh em xem xét trả [phí](https://branch.io/pricing/) nhé.

#### Đào sâu về Branch một tẹo

Trên thì đã trình bày một số điểm khác nhau cơ bản giữa Branch và Firebase Dynamic Link, sau đây là một số tính năng khác nữa của Branch mà anh em có thể muốn biết

- Deepviews (Preview app sẽ được tự tạo ra đi kèm với deeplink)
- Referrals (sử dụng Branch deep links để tạo dựng và đo lường tương tác user)
- Journeys (web banner access nhanh vào app)
- Universal emails (deep links trong các chiến dịch quảng bá bằng  email)

Để biết thêm chi tiết, anh em xem tại [branch.io](https://branch.io/).

## Thế cuối cùng thì chọn cái gì?

Firebase Dynamic Links là cách đơn giản, thuận tiện, xịn xò mà anh em có thể sử dụng luôn ko phải suy nghĩ. Nếu anh em có đang sài các  service khác của Firebase trong dự án thì sài luôn Dynamic link luôn để quản lý chung một nơi cho tiện. App anh em mà ko đòi hỏi quá nhiều tính năng hiếm lạ thì Firebase Dynamic  Link là quá ổn áp.

Mặt khác, nếu app anh em chú trọng vào các  công  tác phát triển người dùng và quảng cáo, tìm thị trường thì anh em sẽ nên cân nhắc  Branch đó nhé

*Tài liệu tham khảo: https://branch.io/how-branch-links-work/ ; https://infinum.com/the-capsized-eight/deep-linking-firebase-branchio*