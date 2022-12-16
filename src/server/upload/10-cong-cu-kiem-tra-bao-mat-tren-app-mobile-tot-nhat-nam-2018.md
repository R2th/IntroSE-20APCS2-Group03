## Tổng quan về công cụ kiểm tra bảo mật ứng dụng dành cho thiết bị di động Android và iOS
Công nghệ di động - “*Mobile Technology*” và thiết bị Smartphone - “*Smartphone device*” là hai thuật ngữ phổ biến thường được sử dụng hiện nay. 

Gần 90% dân số thế giới hiện đang sử dụng điện thoại thông minh. Mục đích của điện thoại không chỉ là “nghe, gọi và nhắn tin” mà nó còn có nhiều tính năng thông minh khác như máy ảnh, Bluetooth, GPS, Wi-Fi, thực hiện một số giao dịch online bằng các ứng dụng di động khác nhau,...

Kiểm tra ứng dụng phần mềm được phát triển cho các thiết bị di động với mục đích kiểm tra các chức năng, khả năng sử dụng, bảo mật, hiệu suất,... kiểm tra này được gọi là “*Kiểm tra ứng dụng dành cho thiết bị di động*” - “*Mobile Application Testing*”.

 “*Kiểm tra bảo mật ứng dụng dành cho thiết bị di động*” - “*Mobile Application Security Testing*” bao gồm kiểm tra xác thực (authentication), kiểm tra ủy quyền (authorization), bảo mật dữ liệu (data security), lỗ hổng có thể hack, quản lý session,...

Có nhiều lý do khác nhau để nói tại sao kiểm thử bảo mật ứng dụng dành cho thiết bị di động lại quan trọng. 

*Ví dụ:*
- Để ngăn chặn các cuộc tấn công gian lận trên ứng dụng di động.
- Ngăn chặn virus hoặc phần mềm độc hại (malware infection) lây nhiễm từ ứng dụng sang  thiết bị di động.
- Ngăn chặn vi phạm an ninh,...
Vì vậy, từ góc độ người dùng hay từ góc độ kỹ thuật, việc kiểm tra bảo mật là điều cần thiết. Nhưng hầu hết các tester đều cảm thấy khó khăn vì các ứng dụng dành cho thiết bị di động được viết trên nhiều nền tảng và nhiều loại thiết bị khác nhau. Vì vậy, tester cần có công cụ hỗ trợ cho việc kiểm tra bảo mật ứng dụng dành cho thiết bị di động nhằm đảm bảo rằng ứng dụng di động được bảo mật.
## Top các công cụ kiểm thử bảo mật trên mobile
### 1. [Zed Attack Proxy](https://www.owasp.org/index.php/OWASP_Zed_Attack_Proxy_Project)
![](https://images.viblo.asia/2d8f9818-9baa-4c21-996f-39711fa2fbe8.jpg)
Zed Attack Proxy (ZAP) được thiết kế một cách đơn giản và dễ sử dụng. Trước đó nó chỉ được sử dụng cho các ứng dụng web để tìm ra các lỗ hổng (vulnerabilities). Nhưng hiện tại nó được sử dụng rộng rãi bởi tất cả các tester để kiểm tra tính bảo mật trên mobile.

ZAP hỗ trợ gửi tin nhắn độc hại (malicious messages), do đó nó dễ dàng hơn cho tester khi kiểm tra tính bảo mật của các ứng dụng di động. Đây là loại thử nghiệm có thể test bằng cách gửi bất kỳ yêu cầu hoặc tập tin thông qua tin nhắn độc hại và thử nghiệm xem có ứng dụng di động nào dễ bị nhiễm bởi các tin nhắn độc hại hay không?

***✤ Các tính năng chính:***
- Công cụ kiểm tra bảo mật mã nguồn mở phổ biến nhất thế giới.
- Được duy trì thường xuyên bởi hàng trăm tình nguyện viên quốc tế.
- Cài đặt dễ dàng.
- Hỗ trợ đến 20 ngôn ngữ khác nhau.
- Là công cụ được phát triển dựa trên sự cung cấp và hỗ trợ của cộng đồng quốc tế và được phát triển bởi các tình       nguyện viên quốc tế.
- Thích hợp cho việc test bảo mật theo hướng manual. 
### 2. [Micro Focus](https://software.microfocus.com/fr-ca/software/mobile-app-security)
![](https://images.viblo.asia/6e5dea79-99e3-43fb-ae19-129d1f5d8414.jpg)
Micro Focus và HPE Software đã bắt tay cùng nhau và họ trở thành công ty phần mềm lớn nhất thế giới. Chủ yếu tập trung vào việc phân phối các giải pháp doanh nghiệp cho khách hàng của họ trong các lĩnh vực “Quản lý an ninh & rủi ro”, DevOps, Hybrid IT,...

Micro Focus cung cấp ứng dụng điện thoại end-to-end dùng để kiểm tra tính bảo mật trên nhiều thiết bị, nền tảng, mạng, máy chủ,... Fortify là công cụ của Micro Focus giúp bảo mật ứng dụng di động trước khi cài đặt trên thiết bị của người dùng.

***✤ Các tính năng chính:***
- Fortify thực hiện việc kiểm tra bảo mật di động toàn diện bằng mô hình phân phối linh hoạt.
- Kiểm tra tính bảo mật bao gồm phân tích static code và quét máy theo lịch cho các ứng dụng dành cho thiết bị di động   và cung cấp kết quả chính xác.
- Xác định lỗ hổng bảo mật trên máy khách (client), máy chủ (server) và mạng.
- Fortify cho phép quét (scan) tiêu chuẩn giúp xác định phần mềm độc hại.
- Fortify hỗ trợ nhiều nền tảng như Google Android, Apple iOS, Microsoft Windows và Blackberry.
### 3. [Kiuwan](https://www.kiuwan.com/)
![](https://images.viblo.asia/e870a72d-6d72-4371-ad1b-49f68f3200b1.jpg)
Kiuwan cung cấp phương pháp tiếp cận 360º cho thử nghiệm bảo mật ứng dụng dành cho thiết bị di động, với phạm vi phủ sóng công nghệ lớn nhất. Kiuwan kiểm tra bảo mật bao gồm phân tích static code và phân tích thành phần phần mềm một cách tự động hóa ở bất kỳ giai đoạn nào của SDLC. Kiuwan bao gồm các ngôn ngữ chính và các framework phổ biến trong việc phát triển di động, với sự tích hợp ở cấp IDE.
### 4. [QARK](https://www.linkedin.com/pulse/quick-android-review-kit-brisk-infosec-6083259584523292672/) 
![](https://images.viblo.asia/90a5ef45-d380-465f-91b1-9378fc9a896a.jpg)
LinkedIn là một công ty dịch vụ mạng xã hội được thành lập vào năm 2002 và có trụ sở tại California, Hoa Kỳ. QARK là viết tắt của “Quick Android Review Kit” và nó được phát triển bởi LinkedIn.

Cái tên QARK cho thấy rằng nó rất hữu ích cho nền tảng Android trong việc xác định lỗ hổng bảo mật trong mã nguồn ứng dụng dành cho thiết bị di động và tệp APK. QARK là một công cụ phân tích static code, cung cấp thông tin về nguy cơ bảo mật liên quan đến ứng dụng Android và cung cấp mô tả một cách rõ ràng và ngắn gọn về các vấn đề. 
QARK tạo ra các lệnh ADB (Android Debug Bridge) sẽ giúp xác nhận các lỗ hổng mà QARK đã phát hiện.

***✤ Các tính năng chính:***
- Là công cụ mã nguồn mở.
- Cung cấp thông tin chuyên sâu về các lỗ hổng bảo mật.
- Tạo ra báo cáo về những lỗ hổng tiềm năng và cung cấp thông tin về những việc cần làm để fix các lỗi đó.
- Highlight các vấn đề liên quan đến phiên bản Android.
- Scan tất cả các component trên thiết bị mobile nhằm phát hiện ra các sai sót trong cấu hình và mối đe dọa về an ninh. 
- Tạo ra một ứng dụng tùy chỉnh với mục đích test APK và xác định các vấn đề tiềm ẩn.
### 5. [Android Debug Bridge](https://developer.android.com/studio/command-line/adb)
![](https://images.viblo.asia/829f4543-a8b9-4081-8750-ead53607523a.jpg)
Android là một hệ điều hành dành cho thiết bị di động do Google phát triển. Google là một công ty đa quốc gia có trụ sở tại Hoa Kỳ được thành lập vào năm 1998. 

Android Debug Bridge (ADB) là một công cụ command line được dùng để giao tiếp với thiết bị Android được kết nối thực tế hoặc thiết bị mô phỏng (emulator) để đánh giá tính bảo mật của các ứng dụng dành cho thiết bị di động.

Nó cũng được sử dụng như một công cụ client - server có thể được kết nối với nhiều thiết bị Android thật hoặc thiết bị mô phỏng (emulator). Bao gồm "Client" (gửi các lệnh), "daemon" (chạy các lệnh commands) và "Server" (quản lý giao tiếp giữa Client và daemon).

***✤ Các tính năng chính:***
- ADB có thể được tích hợp với Android Studio IDE của Google.
- Giám sát các sự kiện của hệ thống với thời gian thực.
- Nó cho phép hoạt động ở mức hệ thống bằng cách sử dụng các lệnh shell.
- ADB giao tiếp/kết nối được với các thiết bị sử dụng USB, Wi-fi, Bluetooth,...
- ADB được đính kèm trong gói SDK Android.
### 6. [CodifiedSecurity](https://codifiedsecurity.com/) 
![](https://images.viblo.asia/3c64526d-342e-490e-b113-5134e6143fff.jpg)
Codified Security được thành lập vào năm 2015 với trụ sở chính tại London, Vương quốc Anh. Codified Security là một công cụ phổ biến được dùng để kiểm tra bảo mật ứng dụng di động. Nó xác định và sửa các lỗ hổng bảo mật và đảm bảo rằng ứng dụng di động được bảo mật để sử dụng.

Nó tiếp cận các vấn đề theo hướng lập trình để kiểm tra tính bảo mật và đảm bảo rằng các kết quả kiểm tra bảo mật ứng dụng dành cho thiết bị di động có thể mở rộng và đáng tin cậy.

***✤ Các tính năng chính:***
- Đây là nền tảng thử nghiệm theo hướng automation nhằm phát hiện lỗ hổng bảo mật trong mã code của ứng dụng dành cho thiết bị di động.
- Codified Security cung cấp phản hồi theo thời gian thực.
- Nó được hỗ trợ bởi machine learning và static code.
- Nó hỗ trợ cả test static và test dynamic trong thử nghiệm bảo mật ứng dụng dành cho thiết bị di động.
- Báo cáo cấp code giúp nhận được các vấn đề trong code từ phía máy khách của ứng dụng dành cho thiết bị di động.
  Codified Security hỗ trợ iOS, Android,...
- Nó kiểm tra ứng dụng di động mà không fetch source code. Dữ liệu (data) và mã nguồn (source code) được lưu trữ trên đám mây của Google.
- Tệp có thể được tải lên ở nhiều định dạng như APK, IPA,...
### 7. [Drozer](https://labs.mwrinfosecurity.com/tools/drozer)
![](https://images.viblo.asia/da2873e6-aedd-44de-a5c4-bb4740766816.jpg)
MWR InfoSecurity là một công ty tư vấn an ninh mạng được thành lập vào năm 2003. Là một công ty phát triển nhanh nhất chuyên cung cấp dịch vụ bảo mật mạng. Nó cung cấp giải pháp trong các lĩnh vực khác nhau như an ninh di động, nghiên cứu bảo mật,... cho tất cả các khách hàng trên toàn thế giới.

Drozer là một framework kiểm tra bảo mật ứng dụng dành cho thiết bị di động được phát triển bởi MWR InfoSecurity. Nó xác định các lỗ hổng bảo mật trong các ứng dụng và thiết bị di động và đảm bảo rằng các thiết bị Android, ứng dụng dành cho thiết bị di động,... được bảo mật khi sử dụng.

Drozer mất ít thời gian để truy cập và đánh giá các vấn đề liên quan đến bảo mật của thiết bị android bằng cách tự động chạy các câu lệnh phức tạp và tự động quản lý thời gian thực hiện.

***✤ Các tính năng chính:***
- Là một công cụ mã nguồn mở.
- Hỗ trợ cả thiết bị Android và trình mô phỏng thực tế (emulator) trong việc kiểm tra bảo mật.
- Chỉ hỗ trợ nền tảng Android.
- Thực thi bật mã code Java trên thiết bị thật.
- Cung cấp các giải pháp trong tất cả các lĩnh vực an ninh mạng.
- Drozer hỗ trợ có thể mở rộng để tìm và khai thác những điểm yếu tìm ẩn.
- Phát hiện và tương tác với khu vực bị đe dọa (threat area) trong ứng dụng Android.
### 8. [WhiteHat Security](https://www.whitehatsec.com/products/mobile-application-security-testing/)
![](https://images.viblo.asia/0568a3ad-e3be-4d5f-8e4f-f08fe360140a.jpg)
WhiteHat Security là một công ty phần mềm có trụ sở tại Hoa Kỳ được thành lập năm 2001. "White Hat" được gọi là hacker đạo đức hoặc chuyên gia bảo mật máy tính.

WhiteHat Security đã được công nhận bởi Gartner như một nhà lãnh đạo trong thử nghiệm bảo mật và đã giành được giải thưởng cho việc cung cấp các dịch vụ đẳng cấp thế giới cho khách hàng của họ. WhiteHat Security cung cấp các dịch vụ như kiểm tra bảo mật ứng dụng web, kiểm tra bảo mật ứng dụng di động, ...

WhiteHat Sentinel Mobile Express là một nền tảng kiểm tra và đánh giá bảo mật. WhiteHat Sentinel cung cấp một giải pháp nhanh hơn bằng cách sử dụng công nghệ static và dynamic.

***✤ Các tính năng chính:***
- Là một nền tảng bảo mật dựa trên đám mây.
- Hỗ trợ cả nền tảng Android và iOS.
- Cung cấp thông tin chi tiết và báo cáo để biết được trạng thái chính xác của dự án.
- Thử nghiệm ứng dụng di động static và dynamic được thực hiện bằng auto. Vì thế phát hiện lỗ hổng nhanh hơn bất kỳ     công cụ hoặc nền tảng nào khác.
- Thử nghiệm được thực hiện trên thiết bị thực tế bằng cách cài đặt ứng dụng di động, nó không sử dụng bất kỳ trình     giả lập nào để thử nghiệm.
- Cung cấp mô tả rõ ràng và ngắn gọn về lỗ hổng bảo mật và cung cấp giải pháp.
- Sentinel có thể được tích hợp với máy chủ CI, công cụ theo dõi lỗi và các công cụ ALM.
### 9. [Synopsys](https://www.synopsys.com/software-integrity/managed-services/mobile-application-security-testing.html)
![](https://images.viblo.asia/7fdfda91-430a-4189-81ea-de8542ade546.jpg)
Synopsys Technology là một công ty phần mềm có trụ sở tại Hoa Kỳ, cung cấp giải pháp toàn diện cho thử nghiệm bảo mật ứng dụng dành cho thiết bị di động. 
Giải pháp này xác định nguy cơ tiềm ẩn trong ứng dụng dành cho thiết bị di động và đảm bảo rằng ứng dụng di động được bảo mật. Có nhiều vấn đề khác nhau liên quan đến bảo mật ứng dụng dành cho thiết bị di động, do đó, các công cụ Synopsys static và dynamic đã được phát triển thêm option tùy chỉnh cho bộ kiểm tra bảo mật ứng dụng dành cho mobile.

***✤ Các tính năng chính:***
- Kết hợp nhiều công cụ để có được giải pháp toàn diện nhất cho thử nghiệm bảo mật ứng dụng dành cho thiết bị di động.
- Tập trung vào việc cung cấp phần mềm không có lỗi bảo mật trên môi trường production.
- Synopsys giúp cải thiện chất lượng và giảm chi phí.
- Loại bỏ các lỗ hổng bảo mật từ các ứng dụng từ phía máy chủ và từ các API.
- Nó kiểm tra lỗ hổng bằng cách sử dụng phần mềm nhúng.
- Các công cụ phân tích dynamic và static được sử dụng trong quá trình kiểm tra bảo mật ứng dụng dành cho thiết bị di   động.
### 10. [Veracode](https://www.veracode.com/solutions/by-need/mobile-application-security-testing) 
![](https://images.viblo.asia/76f27ac8-f74d-4cd7-bf4a-ffe20e265456.jpg)
Veracode là một công ty phần mềm có trụ sở tại Massachusetts, cung cấp dịch vụ bảo mật ứng dụng web và di động cho các khách hàng trên toàn thế giới. Sử dụng dịch vụ dựa trên đám mây tự động. 
Giải pháp Kiểm tra bảo mật ứng dụng dành cho thiết bị di động (MAST) của Veracode xác định các lỗ hổng bảo mật trong ứng dụng dành cho thiết bị di động và đề xuất hành động ngay lập tức để thực hiện giải pháp.

***✤ Các tính năng chính:***
- Dễ sử dụng và cung cấp kết quả kiểm tra bảo mật chính xác.
- Kiểm tra bảo mật được thực hiện dựa trên ứng dụng. Các ứng dụng tài chính và chăm sóc sức khỏe được kiểm tra chuyên   sâu còn các ứng dụng web đơn giản được kiểm tra đơn giản hơn.
- Thử nghiệm chuyên sâu được thực hiện bằng cách sử dụng toàn bộ các trường hợp sử dụng ứng dụng dành cho thiết bị di   động.
- Phân tích tĩnh Veracode cung cấp kết quả code review nhanh và chính xác.
- Trong một nền tảng, nó cung cấp nhiều phân tích bảo mật bao gồm phân tích hành vi ứng dụng tĩnh, động và ứng dụng di   động.

### 11. [Mobile Security Framework (MobSF) ](https://github.com/MobSF/Mobile-Security-Framework-MobSF)
![](https://images.viblo.asia/22228e6f-704f-4d7a-9197-e42fb79b5ff7.jpg)
Mobile Security Framework (MobSF) là một framework kiểm tra bảo mật tự động cho nền tảng Android, iOS và Windows. Nó thực hiện phân tích static và dynamic cho thử nghiệm bảo mật ứng dụng dành cho thiết bị di động.

Hầu hết các ứng dụng di động đang sử dụng các dịch vụ web có thể có lỗ hổng bảo mật. MobSF giải quyết các vấn đề liên quan đến bảo mật với các dịch vụ web.

***✤ Các tính năng chính:***
- Là một công cụ mã nguồn mở.
- Môi trường cho thử nghiệm ứng dụng dành cho thiết bị di động có thể được thiết lập dễ dàng bằng cách sử dụng MobSF.
- MobSF được lưu trữ trong môi trường cục bộ, do đó dữ liệu nhạy cảm không bao giờ tương tác với đám mây.
- Phân tích bảo mật nhanh hơn cho các ứng dụng dành cho thiết bị di động trên cả ba nền tảng (Android, iOS, Windows).
- MobSF hỗ trợ cả mã nhị phân và mã nguồn được nén.
- Hỗ trợ kiểm tra bảo mật API Web bằng API Fuzzer.
- Các nhà phát triển có thể xác định các lỗ hổng bảo mật trong giai đoạn phát triển.
### Kết luận
Thông qua bài viết này, chúng ta đã tìm hiểu về các Công cụ kiểm tra bảo mật ứng dụng di động khác nhau hiện đang có sẵn trên thị trường.
Nó sẽ là công cụ quan trọng đối với tester khi tiến hành kiểm thử bảo mật trên ứng dụng tùy theo tính chất và yêu cầu của từng ứng dụng di động.

------------------------------------------------------------------------------------------------------------------------
*Link tham khảo:
*
https://www.softwaretestinghelp.com/mobile-app-security-testing-tools/