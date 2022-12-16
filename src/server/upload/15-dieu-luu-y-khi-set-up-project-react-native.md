React Native là một ngôn ngữ khá hot và phổ biến gần đây. Nó có thể giúp bạn tạo dựng được ứng dụng trên cả Android và IOS.

Tuy nhiên, để phát triển được một dự án React Native tốt, dễ dàng mở rộng và maintain về sau là cả một vấn đề. Bạn cần thiết lập các gói npm được sử dụng rộng rãi khác nhau ở cộng đồng open source, nó sẽ giúp ích rất nhiều trong quá trình phát triển.

Trong bài này, chúng ta hãy cùng thảo luận về các libs và tool khác nhau xem xét cho việc set up ứng dụng. Hy vọng có thể giúp bạn giải quyết được vấn đề.

# 1. React-native base framework
Theo dõi trên trang chính thức của React Native, họ có giới thiệu 2 cách khác nhau để set up dự án React Native: viz. Expo CLI và React native CLI.
Bao gồm ưu, nhược điểm sau: 

**Expo CLI**

✅  Nhanh chóng viết luôn first screen

✅  Phân phối và cài đặt ứng dụng nhanh chóng

✅ Tốt cho các ứng dụng demo hay POC

🔴 Tăng thêm 20-25MB kích thước app

🔴 Không khuyến khích cho dự án dài hạn

🔴 Không thể viết native code. Phải đẩy ra và reset cấu hình expo

**React Native CLI**

✅ Dễ dàng thêm native code android và ios

✅ Đối với các ứng dụng quy mô lớn

🔴 Không dễ phân phối và cài đặt ứng dụng

🔴 Cần một máy Mac để phát triển IOS

# 2. Static typing
Với tư cách là một developer Javascript, tôi cũng dần cảm thấy phải nghiêm ngặt trong code của tôi viết. Statis typing giúp check bug sớm, tăng tính đúng đắn của code.

[**Typescript**](https://www.typescriptlang.org/)

Typescript là một ngôn ngữ lập trình mã nguồn mở, là bộ siêu cú pháp chặt chẽ của javascript.
✅ Cộng đồng lớn và được sử dụng rộng rãi trong cả font end và back end như: NodeJs, Angular 2+, VueJs, etc.

✅ Nhanh hơn

🔴 React ít support hơn.

[**Flow**](https://flow.org/)

Flow không phải là một ngôn ngữ lập trình, nó chỉ là một trình kiểm tra kiểu tĩnh cho Javascript.

✅ Hỗ trợ React cao cấp

🔴 Facebook đang chuyển dần sang typescript

🔴 Cộng đồng nhỏ 

🔴 Tài liệu không phong phú

# 3. Http request client
Hầu như các ứng dụng đều cần tương tác với api, nếu ứng dụng của bạn cần thì bạn cần 1 HTTP client. Bạn có thể xem xét: 

[**Axios**](https://www.npmjs.com/package/axios)

✅  Cách làm cổ điển và được kiểm nghiệm tốt 

🔴 Bạn cần có một thư viện riêng để sử dụng các API GraphQL.

[**Graphql Appolo client**](https://www.apollographql.com/docs/react/)

✅ Một ứng dụng client cho REST APIs and Graphql APIs.

✅ Lưu trữ dữ liệu vào bộ nhớ đệm ngoài hộp

🔴 Không được áp dụng nhiều 

# 4. Managing Reusable UI Components
Nếu bạn đang tìm cách sử dụng lại code của mình được nhiều nhất, dễ bảo trì, giữ giao diện nhất quán, bạn sẽ cần sử dụng các cloud component

[**Bit.dev**](https://bit.dev/)

✅ Liên tục publish các component từ rất nhiều codebase

✅ Dễ dàng import/install component vào bất kì repo nào

✅ Tài liệu và sắp xếp thành phần ở một nơi

✅ Hỗ trợ tuyệt vời cho React Native

# 5. Unit testing setup

Nếu bạn muốn ứng dụng của mình ổn định hơn thì việc kiểm tra giá trị unit test cực kì quan trọng.

**[Jest](https://jestjs.io/) and [enzyme](https://www.npmjs.com/package/enzyme)**

✅  Là một framework testing đơn giản 

✅ Cũng hoạt động với Typescript, Node, React, Angular and Vue

✅ Cùng với các framework tốt

✅ Cộng đồng lớn

# 6. State management
Nếu ứng dụng của bạn lớn hoặc dài hạn, bạn cần có chiến lược tốt để quản lí state và share nó trên các component.
Có một vài đề xuất : 

[**Redux**](https://redux.js.org/)

✅ Cộng đồng lớn, có nhiều ví dụ pattern để thử 

✅ Giúp nhiều trong quá trình dev và fix bug

🔴 Hiệu suất không cao, so với các thư viện quản lí khác như Mobx

[**Mobx**](https://mobx.js.org/README.html)

✅ Hiệu quả tốt hơn

🔴 Khả năng mở rộng không bằng redux

🔴 Không phù hợp với ứng dụng lớn và phức tạp 

**[Hooks](https://reactjs.org/docs/hooks-intro.html) and [Context API](https://reactjs.org/docs/context.html)**

Được phát hành trong ver v16.4+

✅ Không cần thêm thư viện mới, do đó, làm giảm size app

🔴 Cần lập plan và rule thống nhất giữa các member trong team

# 7. Navigation
Nếu bạn có nhiều hơn một màn hình, bạn cần xác định cách điều hướng màn hình sao cho dễ mở rộng và bảo trì 
**[React-navigation](https://reactnavigation.org/) hay [react-native-navigation](https://github.com/wix/react-native-navigation)**

✅ Cộng đồng lớn

✅ Hầu hết các loại navigator đều được định nghĩa: tab navigator, ...

✅ Define được navigation react hooks

✅ Riêng về react-native-navigation (wix) được viết bằng native nên các action show, push khá mượt mà, các bug hiện trên wix cũng ít hơn.

# 8. Forms
Các biểu mẫu trong React Native thực sự không vui vẻ gì, cá nhân tôi gặp nhiều khó khăn trong các tình huống, do đó, chúng tôi cần một cách tốt hơn để thực hiện form dễ viết, dễ bảo trì, maintain, thân thiện với dev 

[**Formik**](https://formik.org/docs/overview)

✅ Cộng đồng lớn 

🔴 Hiệu suất kém hơn so với dạng react-hooks

[**React hook form**](https://react-hook-form.com/)

✅ Hiệu suất tốt hơn formik

✅ Dựa trên hook, do đó thân thiện và dễ sử dụng hơn 

🔴 Cộng đồng nhỏ

# 9. Config loader

Khi chúng tôi làm việc trên một ứng dụng lớn và phức tạp, chúng tôi muốn ứng dụng của mình di động trên các môi trường, có thể mở rộng, kích hoạt liên tục, do đó cần một framework để set up cấu hình của mình.


Sử dụng [react-native-config](https://github.com/luggit/react-native-config).

# 10. Internationalization (i18n)

**React Context API**

✅ Sử dụng các API context từ React

✅ Sử dụng đơn giản 

🔴 Để sử dụng các tính năng phong phú như số nhiều, ngữ cảnh ( nam/nữ) cần triển khai tuỳ chỉnh

[**React i18 next**](https://www.npmjs.com/package/react-i18next)

✅ Cộng đồng lớn và được sử dụng rộng rãi.

✅ Nó có nhiều tính năng phong phú như: số nhiều, ngữ cảnh,...

🔴 Vì là gói ngoài nên tăng size app

# 11. Dynamic app update

Theo kiến trúc React Native, cho phép fix bug và gửi bản update trực tiếp cho người dùng, tức là không phải trải qua vòng đời đóng gói, phát hành lên store và người dùng update app.
Bạn có thể sử dụng code Microsoft để push app.

# 12. Analytics

Là cách quan trọng để theo dõi và phân tích hành vi của khách hàng.
Tôi cũng đã trải nghiệm và sử dụng [Firebase google analytics](https://firebase.google.com/products/analytics).

Nếu bạn sử dụng cho trường hợp phân tích cụ thể như phân tích quảng cáo, phạm vi tiếp cận, tìm kiếm phân tích tiếp thị,... bạn có thể xem xét Clever tap, Appsflyer or mix panel.
Tuy nhiên, bạn cần mua giấy phép.

# 13. Crashlytics

[**Firebase crashlytics**](https://firebase.google.com/docs/crashlytics)
Công cụ crashlytics rất nổi tiếng Fabric đã được hợp nhất với google với tên firebase crashlytics. Nó miễn phí và cung cấp những report hay về crashes.
Firebase có tích hợp cả slack và bạn có thể nhận được thông báo chi tiết về crash theo time.

# 14. Beta App distribution platforms

Hầu hết thời gian, chúng ta dành thời gian, build ứng dụng cho các member trong team hay gửi khách hàng để họ có cái nhìn trực quan về app và có những feedback trước khi publish.

Sau đây là một số tuỳ chọn: 
[**Firebase**](https://firebase.google.com/docs/app-distribution)

✅  Miễn phí và đi kèm với một loạt dịch vụ của Google: crashlytics, analytics, OCR,..

🔴 Setup và publishing mất nhiều thời gian

🔴 Hiện tại đang trong giai đoạn thử nghiệm

[**App center**](https://appcenter.ms/)

✅  Miễn phí và đi kèm với crashlytics và analytics

🔴 Setup và publishing mất nhiều thời gian

[**Testfairy**](https://www.testfairy.com/)

✅ Nhắm mục tiêu cho doanh nghiệp có hỗ trợ

✅ Các tính năng thú vị như lắc thiết bị để báo lỗi và tạo ticket trong  Jira.

✅ Ghi video tự động về luồng người dùng bị crash/bug

🔴 Bạn cần mua giấy phép

# 15. Automated app signing and publishing

Đối với bất kì team lớn nào cần distribute và publish nhiều, chúng ta nên tự động hoá quy trình giúp tiết kiệm thời gian và tránh lỗi từ con người.

Bạn có thể tham khảo: 

**Inhouse automated pipelines**

Bạn có thể xem xét Fastlane để signing và build file apk và ipa. Bạn có thể publish app trên bất kì nền tảng nào chọn từ trước.

✅ Kiểm soát và tiết kiệm chi phí

🔴 Thời gian thiết lập rất lớn

🔴 Cần các kĩ năng và kiến thức để set up

🔴 Bạn cần chạy đường dẫn trên circle ci hoặc Travis ci để xây dựng ipa hoặc lưu trữ mac mini của riêng bạn cùng như nhau.

[**Bitrise**](https://www.bitrise.io/)

Đây là một trong những cách nhanh chóng, dễ dàng  cho building và publish app.

✅  Set up nhanh 

✅  Tích hợp liền mạch với firebase 

✅ Fastlane

✅ Một giải pháp 1 cửa để xây dựng app android và ios

🔴 Cần có giấy phép

### Kết
Trên đây là 15 lưu ý khi set up một project React Native cho tới bước cuối cùng ( building và publish).
Cá nhân mình thấy tác giả viết khá chi tiết, đầy đủ, phân tích cũng rất chặt chẽ. Tuy nhiên, những libs, tool update theo từng ngày, chúng ta nên trau dồi và bổ sung thêm nhiều hơn, để có được nhiều options tốt chọn cho project của riêng mình

Bài viết dịch dựa trên nguồn: 

https://blog.bitsrc.io/15-things-to-consider-when-setting-up-a-react-native-app-552ee7b77dfd


Cám ơn các bạn đã đọc.