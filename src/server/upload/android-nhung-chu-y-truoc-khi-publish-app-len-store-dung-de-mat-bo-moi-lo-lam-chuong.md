Tất cả chúng ta đều làm việc chăm chỉ trong nhiều tuần hoặc thậm chí vài tháng để xây dựng ứng dụng Android của mình. Tất cả chúng ta đều muốn ứng dụng của mình nổi bật và tạo ấn tượng lâu dài với người dùng. 

Có câu nói: "The first impression is the last impression". Có thể hiểu là ấn tượng đầu tiên cũng là ấn tượng cuối cùng của người dùng. Vì vậy ấn tượng đầu tiên của người dùng với app của bạn là rất quan trọng, một màn ra mắt ấn tượng sẽ giúp đưa ứng dụng của bạn đi tới thành công. Vậy làm thế nào để bạn lauch ứng dụng mượt mà và thành công, để lại ấn tượng đầu tiên tốt đẹp cho người dùng của bạn?

Có rất nhiều điều để tìm hiểu và làm trước khi publish ứng dụng lên Store. Đừng để đến khi sự cố xảy ra, và mấy tháng trời ròng rã coding đem lại kết quả không như mong muốn chỉ vì chủ quan ở khâu publish rất quan trọng này. Vì vậy, hãy làm ngay những công việc dưới đây trước khi publish app nào.

# 1. Cố gắng để ứng dụng size càng nhẹ càng tốt
Không ai thích tải xuống một ứng dụng có size lớn và đặc biệt khi chúng ở trên một mạng chậm như 2G. Rất có khả năng người dùng đã quyết định cài đặt ứng dụng của bạn nhưng sau đó hủy cài đặt nó chỉ vì mất nhiều thời gian để tải xuống. 

Có một số cách bạn có thể tối ưu hóa kích thước ứng dụng của mình: 

* Sử dụng [Android App Bundle](https://developer.android.com/platform/technology/app-bundle) thay cho file .apk truyền thống. Android App Bundle được giới thiệu trong Google I/O 2018. Sử dụng Android App Bundle(.aab) giúp cho kích thước ứng dụng nhỏ hơn thay vì sử dụng file .apk truyền thống. Các con số thống kê ấn tượng được Google đưa ra để giới thiệu về Android App Bundle.

![](https://images.viblo.asia/829d20c2-74aa-49c8-b003-af7a169e52d7.png)

* Luôn sử dụng **ProGuard** hoặc **DexGuard** để thu nhỏ kích thước ứng dụng của bạn bằng cách xóa rất nhiều phương thức không sử dụng. Bước này có thể cho bạn thấy giảm đáng kể kích thước ứng dụng. Ngoài ra, việc nén các tài nguyên (như hình ảnh, tệp âm thanh, v.v.) có trong APK là việc tất nhiên phải làm. 

* Nếu ứng dụng của bạn cần lưu trữ một số tài sản (như hình ảnh, video clip, clip âm thanh, v.v.), thì tốt hơn để chúng trên server và để user tải chúng theo nhu cầu của họ. 

* Trước khi phát hành ứng dụng của bạn, hãy dành một chút thời gian để phân tích những gì thực sự có trong APK của bạn. Android Studio 2.2 có Trình phân tích APK tích hợp chỉ dành cho mục đích này. 

Pro Tip: Sử dụng các công cụ như [TinyPNG](https://tinypng.com/) hoặc [ImageOptim](https://imageoptim.com/mac) để giảm đáng kể kích thước hình ảnh.
# 2. App localization
Localization giúp cho ứng dụng của bạn sẽ chạy trên nhiều thiết bị Android trên nhiều khu vực, quốc gia khác nhau và ứng dụng của mình có thể sử dụng được cho tất cả mọi người. Bạn có thể tăng ồ ạt đối tượng mục tiêu của ứng dụng bằng cách hỗ trợ nhiều ngôn ngữ. 

![](https://images.viblo.asia/87d5dd0e-9db9-4b33-91b0-83187077941a.png)

Localization không chỉ đơn giản là Dịch (Translation). Nó còn nhiều hơn thế. 

Trước khi phát hành ứng dụng của bạn, hãy đảm bảo rằng tất cả các text được đặt đúng trong tệp string.xml và không có hard-coded ở bất kỳ đâu trong code của bạn. Kiểm tra [ở đây](https://developer.android.com/guide/topics/resources/localization.html) để được hướng dẫn chi tiết về điều này. 

Pro Tip: Bạn có thể sử dụng các công cụ khác nhau như [Crowdin](https://crowdin.com/) hoặc [WebTable](https://weblate.org/en/) để quản lý các dịch giả của mình một cách chuyên nghiệp.
# 3. Setup các công cụ báo cáo crash
![](https://images.viblo.asia/70a5f060-ef0a-4449-ac8c-ab9fb74951cc.jpg)

Nếu ứng dụng của bạn gặp sự cố, bạn là nhà phát triển thì nên nắm rõ mọi thông tin cần thiết về sự cố đó để bạn có thể thực hiện các bước cần thiết để khắc phục sự cố ngay lập tức. [Firebase Crashlytics](https://firebase.google.com/docs/crashlytics/) hoặc [Instabug](https://instabug.com/) có thể giúp bạn phát hiện và nắm rõ thông tin các sự cố. 

Cũng nhớ Log ra các exception bị catch một cách rõ ràng chi tiết. Một exception bị catch vẫn là một ngoại lệ mà bạn cần biết nơi xảy ra trong ứng dụng của mình, để bạn có thể tìm ra những cách tốt hơn để tối ưu code của mình.
# 4. Setup các công cụ Analytics
![](https://images.viblo.asia/a2b748c8-7c2e-4a40-8dd3-e41efae522d4.jpg)

Khi ứng dụng của bạn được phát hành trên thị trường, bạn sẽ muốn biết người dùng của mình đang sử dụng app như thế nào, tính năng nào của ứng dụng được sử dụng nhiều nhất và những tính năng nào bị bỏ qua hoàn toàn (và cách bạn có thể cải thiện chúng).

Bạn cần biết những người dùng màn hình nào dành phần lớn thời gian của họ và màn hình nào họ hoàn toàn không đụng đến. Nếu bạn nắm được những thông tin có giá trị này, bạn có thể xác định màn hình hay tính năng nào mình nên dành thời gian, công sức và tiền bạc nhiều nhất. Bạn có thể quyết định kế hoạch update app của bạn trong tương lai.

Có một số công cụ phân tích giúp bạn làm việc này, cả trả phí và miễn phí. Nhưng những cái miễn phí là quá đủ cho các ứng dụng quy mô nhỏ, trung bình và thậm chí là quy mô lớn.

Bạn có thể thử [Firebase Analytics](https://firebase.google.com/docs/analytics/)
# 5. Code tính năng cho user dễ dàng feedback trong ứng dụng
Khi ứng dụng của bạn được phát hành và người dùng của bạn bắt đầu sử dụng nó, họ sẽ gặp phải một số vấn đề hoặc có một số đề xuất và muốn liên lạc trực tiếp với bạn.

![](https://images.viblo.asia/98a5df22-312d-427c-b3d4-33a63c9bef41.png)

Cố gắng đặt hành động phản hồi ở đâu đó trong Navigation Drawer hoặc trong Toolbar để người dùng của bạn có thể dễ dàng truy cập và gửi feedback. Chức năng một số câu hỏi thường gặp cũng có thể giải quyết một số thắc mắc phổ biến của user gần như ngay lập tức. Điều này sẽ không chỉ tiết kiệm cho user mà còn tiết kiệm thời gian quý báu của bạn.

Phần thưởng: Nếu bạn muốn một giải pháp feedback ở cấp độ doanh nghiệp và có thể chi trả tiền cho nó, bạn nên dùng thử [UserVoice](https://www.uservoice.com/) hoặc [ZenDesk](https://www.zendesk.com/)
# 6. Chớ xem nhẹ App Store Optimization (ASO)
ASO là tất cả về cách bạn có thể tối ưu hóa ứng dụng và danh sách các ứng dụng của bạn trên Play Store để thu hút các lượt tải xuống hữu cơ từ cửa hàng.
![](https://images.viblo.asia/d8334b6d-8e5c-4d59-9931-672976d3cca3.png)

Bắt đầu chuẩn bị một số hình ảnh quảng cáo sạch và đẹp cho trang Cửa hàng Play của bạn. Thậm chí còn tốt hơn nếu bạn có thể làm một video nhỏ thể hiện một số tính năng thú vị nhất của ứng dụng.

Không nên xem thường việc viết mô tả cho ứng dụng. Hãy dành một lượng thời gian và nỗ lực đáng kể để nghiên cứu cách bạn có thể viết một mô tả được tối ưu hóa có thể thúc đẩy tải xuống hữu cơ.

Dành thời gian nghiên cứu về các từ khóa bạn sẽ nhắm mục tiêu và cách bạn sẽ kết hợp chúng trong phần tiêu đề và mô tả app của bạn. Nghiên cứu kỹ lưỡng đối thủ của bạn là ai và họ đang làm gì để cải thiện rank của họ?

Bạn không thể tối ưu hóa ứng dụng của mình và được xếp hạng tốt trong vài ngày. Mất nhiều thời gian và tiền bạc, nhưng một khi bạn đã làm đúng, bạn đang trên con đường tiếp cận vài triệu người dùng tiếp theo.

Pro Tip: Sử dụng các dịch vụ như [SensorTower](https://sensortower.com/) hoặc [AppAnnie](https://www.appannie.com/en/) để hiểu rõ hơn về đối thủ cạnh tranh của bạn và cách bạn có thể cải thiện thứ hạng Cửa hàng Play của mình.
# 7. Bạn đã suy nghĩ kỹ Min SDK chưa
Về cơ bản, con số minSDK nó phụ thuộc vào các tính năng mà ứng dụng của bạn muốn hỗ trợ và cơ sở người dùng mà nó muốn nhắm mục tiêu. Cần có sự cân bằng hợp lý giữa hai điều này.

Nếu ứng dụng của bạn hỗ trợ API cấp 15 trở lên thì nó cho phép bạn khai thác gần như 100% người dùng Android hiện tại. Ai chẳng muốn như vậy đúng ko?. Tuy nhiên đời không như là mơ, việc ứng dụng của bạn hỗ trợ các API level thấp sẽ khó khăn cho bạn rất nhiều bởi các API thấp sẽ bị hạn chế một số tính năng. Vì vậy, việc quyết định con số minSDK cũng rất là quan trọng.
# 8. Test Performance
Bạn có chắc chắn ứng dụng của bạn hoạt động với Performance tốt nhất không? Bạn cần đảm bảo rằng ứng dụng của bạn nhanh, phản hồi nhanh và hoạt động hoàn hảo và đem lại trải nghiệm tốt cho người dùng.

Sử dụng **LeakCanary** để phát hiện memory leak một cách nhanh chóng và dễ dàng.

![](https://images.viblo.asia/e6b6e2c4-4291-4f2e-a406-374e290e98f3.jpg)

Luôn nhớ rằng, ngay cả một rò rỉ nhỏ cũng có thể đánh chìm một con tàu lớn. 

[Đây](http://blog.nimbledroid.com/2016/05/23/memory-leaks.html) là một bài viết tuyệt vời giải thích cách bạn có thể đã vô tình gây memory leak trong ứng dụng của mình và cách khắc phục chúng. Đảm bảo mọi hoạt động nặng (file, cơ sở dữ liệu, mạng, v.v.) đều thoát khỏi luồng main.
# 9. Test App trên những device, API khác nhau
Bạn có thể đã sử dụng một hoặc hai thiết bị để phát triển ứng dụng của mình và đã test kỹ lưỡng app. Nhưng bạn có chắc rằng app bạn không có bug?

Có một số crash hoặc exception chỉ xảy ra trên một thiết bị cụ thể hoặc một phiên bản Android cụ thể và bạn cần phải xử lý cụ thể chúng.

Bạn cần kiểm tra ứng dụng của mình một cách kỹ lưỡng trên các nền tảng Android khác nhau và cả trên các mẫu thiết bị khác nhau từ ít nhất một số nhà sản xuất nổi tiếng như Samsung, Sony, LG, HTC, những cái tên đang nắm giữ thị phần đáng kể trong Android.

Có một số thay đổi mỗi khi có phiên bản Android mới mà bạn cần phải nắm rõ để xử lý. Nếu bạn đang xử lý tệp nặng, thì bạn phải kiểm tra đúng trên các phiên bản nền tảng khác nhau (hãy nhớ những gì Google đã làm với KitKat) và cả trên các thiết bị từ các nhà sản xuất khác nhau.
# 10. Vấn đề Security, bảo vệ data nhạy cảm.
Thực hiện kiểm tra bảo mật đầy đủ và chuyên sâu cho ứng dụng của bạn là điều bạn không thể bỏ lỡ. Và đây là việc nên thực hiện tốt trước khi phát hành. Vì một khi ứng dụng của bạn đã publish, có thể bạn sẽ không thể (hoặc sẽ rất khó) sửa chữa khi dữ liệu đã bị lộ hoặc hacker tấn công.

Nếu ứng dụng của bạn không đối phó với bất kỳ dữ liệu nhạy cảm nào của người dùng, thì có lẽ bạn có thể bỏ qua điều này, nhưng nếu có thì bạn phải chú ý tối đa vấn đề bảo mật.

Đảm bảo rằng tất cả các dữ liệu nhạy cảm được mã hóa trước khi lưu trữ trong cơ sở dữ liệu dưới local, shared preferences hoặc file. Tất cả network transfers nên được mã hóa là tốt. Không bao giờ phạm sai lầm khi lưu trữ dữ liệu nhạy cảm trong văn bản thuần túy, vì nó có thể dễ dàng bị xâm phạm nếu tin tặc chiếm giữ thiết bị.

Cũng đảm bảo rằng mật khẩu hoặc ghim không được mã hóa, nhưng được băm. Có một sự khác biệt giữa băm và mã hóa, và bạn cần tìm hiểu phạm vi thích hợp của chúng. Không bao giờ tự ý viết thuật toán mã hóa của riêng bạn mà phải luôn luôn tuân theo các tiêu chuẩn.

Đừng quên obfuscate code của bạn bằng **ProGuard**. Có lẽ bạn không muốn lộ code của mình cho mọi người xem và phân tích (trừ khi bạn có kế hoạch làm cho nó thành nguồn mở).

![](https://images.viblo.asia/431c033f-846b-42cb-b6bd-4c99fe5f04ab.png)

Pro Tip: **ProGuard** có thể bảo vệ ứng dụng của bạn, nhưng **DexGuard** thực hiện công việc đó còn tốt hơn. Nó không chỉ có thể obfuscate code của bạn, mà thậm chí còn mã hóa các class và string. Nó cũng có thể sử dụng reflection để gọi các phương thức do đó khiến cho hacker rất khó hiểu luồng ứng dụng của bạn.
# 11. Chống hacker
Tin tặc luôn có thể cố gắng giả mạo một ứng dụng theo mọi cách mà chúng có thể làm. Về mặt lý thuyết, không thể tạo ra một ứng dụng chống hack nhưng bạn có thể làm cho công việc của hacker trở nên khó khăn hơn.

Và thời điểm tốt nhất để thực hiện chống hack là ngay trước khi phát hành ứng dụng của bạn. Nếu bạn thực hiện những điều này sau trong bản cập nhật tiếp theo, tin tặc vẫn có thể nắm giữ APK trước đó của ứng dụng của bạn và khai thác các lỗ hổng từ các phiên bản cũ hơn.

Có một số điều bạn có thể làm để ngăn chặn hack (ở một mức độ nào đó), như ngăn ứng dụng sản xuất của bạn chạy trên trình giả lập. Xác suất người dùng sẽ sử dụng ứng dụng của bạn trên trình giả lập là gần như bằng 0.

Bạn có thể làm cho ứng dụng của mình âm thầm thất bại nếu có thể gỡ lỗi (phát hành APK và có thể gỡ lỗi, nghe có vẻ tanh không?) Hoặc nếu chứng chỉ này không phù hợp với chứng chỉ ký của bạn. Thuật ngữ mà thầm âm thầm thất bại là quan trọng ở đây. Don Phòng cho hacker biết rằng bạn đang cố gắng ngăn chặn một nỗ lực giả mạo.

Đặt logic kinh doanh rất nhạy cảm của ứng dụng của bạn trong NDK, khiến cho tin tặc khó hiểu và bẻ khóa nó. Tôi không khẳng định rằng mã NDK không thể bị crack, nhưng crack NDK chua hơn mã Java nhiều.

Mẹo chuyên nghiệp: Xem hướng dẫn chi tiết trong [bài viết này](https://www.airpair.com/android/posts/adding-tampering-detection-to-your-android-app). Và [thư viện này](https://github.com/SandroMachado/AndroidTampering), có thể giúp bạn làm việc này dễ dàng hơn một chút.
# 12. Lên một kế hoạch Release phù hợp
![](https://images.viblo.asia/ff324bc5-a22c-483f-a28a-6f8880c647b7.jpeg)

Sau nhiều tháng ròng rã coding, cuối cùng cũng xong app. Có lẽ bạn đang rất nóng lòng muốn publish ứng dụng của mình lên store để chạm tới tay hàng triệu người dùng. Đừng vội, như tôi đã nói ở trên: "Ngay cả một rò rỉ nhỏ cũng có thể đánh chìm một con tàu lớn". Mọi công sức của bạn có thể đổ sông đổ biển nếu như sau khi publish ứng dụng lên mà user gặp crash liên tục. Bạn nên dành thời gian để lập một kế hoạch publish thích hợp. Trước tiên, hãy tạo một bản phát hành Alpha nhỏ cho ứng dụng của bạn để cho một số bạn bè của bạn trải nghiệm app trước. Những bạn bè này phải bao gồm những người chuyên về công nghệ và những người mù công nghệ để có kết quả dùng thử tốt hơn. Để có được những feedback chi tiết và tập trung nhất, bạn nên giới hạn số người trải nghiệm phiên bản alpha này cỡ 5 đến 10 người.

Bạn có thể trực tiếp quan sát cách những người bạn này đang sử dụng ứng dụng của bạn, họ đang bị kẹt ở đâu, họ có ấn tượng với màn hình, tính năng gì, UI có bắt mắt ko, trải nghiệm của họ đã được tốt chưa?.

Sau một vài bản phát hành alpha nhỏ và những cải tiến ban đầu, bạn có thể tiếp tục với bản phát hành Beta và có thể tăng số người dùng thử app trải nghiệm phiên bản Beta này.

Nhiều người dùng từ nhiều quốc gia khác nhau có các thiết bị khác nhau sẽ sử dụng ứng dụng của bạn và đây chính xác là những gì bạn muốn. Hãy sẵn sàng để chứng kiến rất nhiều lỗi và crash. Nhưng cuối cùng, bạn sẽ nhận được một số phản hồi vô giá sẽ giúp bạn cải thiện đáng kể ứng dụng của mình.

Bây giờ ứng dụng của bạn đã sẵn sàng để phát hành cuối cùng. Bạn có thể khá yên tâm rằng không có vấn đề lớn nào có thể xảy ra bây giờ.

Để tìm hiểu kỹ hơn vấn đề này. Mời các bạn đọc [bài viết này](https://blog.aritraroy.in/releasing-android-apps-like-a-pro-52003779a13e)
# 13. Tôn trọng chất xám của người khác - Tuân thủ các quy định
Để ứng dụng của bạn thực sự hoàn thiện ta không thể không quan tâm đến vấn đề bản quyền. Chắc có lẽ ai cũng biết sự rắc rối lùm xùm cộng đồng trong nước và ngoài nước xung quanh game Flappy Bird của Nguyễn Hà Đông. Ngoài ra, bạn cũng cần thêm thông tin license của tất cả các thư viện nguồn mở mà bạn đang sử dụng.

Vấn đề tuân thủ các nội quy khi publish app. Chắc chắn rồi!. Nếu bạn không đọc kỹ các quy định, dù cố ý hay vô tình mắc lỗi thì bạn có thể phải trả một cái giá rất đắt. Ứng dụng có thể bị remove khỏi store hoặc tệ hơn là tài khoản quảng cáo, tài khoản develop của bạn sẽ bị banned.

### Lời kết
Tôi hy vọng bạn sẽ thấy những kỹ thuật này hữu ích trong việc giúp ứng dụng của bạn thành công trong Play Store. Hãy cùng nhau phát triển, giúp đỡ lẫn nhau và làm cho hệ sinh thái Android này tốt hơn. Cảm ơn vì đã đọc.

Nguồn tham khảo: 

https://blog.aritraroy.in/the-ultimate-pre-release-checklist-for-android-app-success-on-play-store-cb0eb9f59ce9

https://blog.aritraroy.in/releasing-android-apps-like-a-pro-52003779a13e

https://developer.android.com/distribute/best-practices/launch/launch-checklist

https://www.youtube.com/watch?v=psu3pPdfYSM

https://medium.com/mindorks/android-app-release-checklist-for-the-production-launch-4095f46d04fa