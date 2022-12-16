Trong quá trình sử dụng các thiết bị iOS, có đôi khi chúng ta cần thực hiện một vài tác vụ như cài đặt các ứng dụng không có trên App Store hay root access tới hệ thống file. Tuy nhiên thì với các cơ chế bảo mật đặc thù của hệ điều hành iOS mà chúng ta không thể thực hiện được các tác vụ đó. Lúc này, jailbreak thiết bị iOS là một giải pháp thông dụng và hiệu quả nhất để có thể thực hiện các tác vụ kể trên. Vậy, jailbreak là gì thì hãy cùng mình tìm hiểu về nó trong bài viết này nhé.

## I. Tổng quan
### 1. Khái niệm
Mục đích chính của việc jailbreak một thiết bị iOS là tắt các cơ chế bảo vệ (cụ thể là cơ chế code signing mà mình có đề cập ở [đây](https://viblo.asia/p/ios-security-architecture-ByEZk6pqKQ0#_iv-code-signing-3)). Điều này cho phép người sử dụng có thể chạy các chương trình bất kì không được kí bởi Apple trên thiết bị iOS.

### 2. Cơ chế của việc jailbreak
Khác với Android khi mà các phiên bản khác nhau có thể có cơ chế gần như tương tự trong việc rooting, jailbreak được thực hiện tương ứng với từng phiên bản. Nguyên nhân của việc này là vì trên Android, việc custom ROM hay cài đặt file nhị phân `su` là bạn đã có thể có được root access thì trên iOS việc này không mấy khả thi. Việc chạy một custom ROM khá khó khi mà cơ chế [secure boot](https://viblo.asia/p/ios-security-architecture-ByEZk6pqKQ0#_iii-secure-boot-2) sẽ hạn chế việc này và khiến OS cài lên chỉ có thể là downgrade của phiên bản hiện tại (nếu nó vẫn được kí bởi Apple). Còn cài đặt một file nhị phân `su` không được kí bởi Apple trước khi jailbreak là bất khả thi. Để có thể jailbreak, các nhóm nghiên cứu phải thực hiện những công việc phức tạp hơn rất nhiều, cụ thể là họ phải tìm ra các lỗ hổng bảo mật, sử dụng các lỗ hổng bảo mật này để có thể tiến hành jailbreak.

Và đương nhiên rồi, chúng ta thì không phải một nhà nghiên cứu nên cách dễ nhất để chúng ta có thể jailbreak thiết bị của mình là sử dụng các công cụ có sẵn mà các nhóm đã nghiên cứu phát triển thôi. Có rất nhiều các công cụ để jailbreak từ nhiều tổ chức khác nhau, trong đó phổ biến nhất là checkra1n, Chimera hay unc0ver. Chúng ta sẽ nói thêm về các công cụ này trong phần sau của bài viết.


### 3. Lợi ích của việc jailbreak
Về cơ bản, việc jailbreak sẽ cho phép các người dùng có thể custom lại giao diện, cài đặt các ứng dụng bên thứ 3 không do Apple cung cấp qua App Store. Một số lợi ích chính của jailbreak có thể kể tới như:
- Root access tới hệ thống file.
- Cài đặt và thực thi các chương trình, ứng dụng mà không cần *sign-by-Apple*.
- Debugging và phân tích động một app
- Truy cập tới Objective-C hay Swift runtime. (các ứng dụng iOS sử dụng 2 ngôn ngữ này làm ngôn ngữ chính)

### 4. Những điều nên chú ý khi quyết định jailbreak
- Việc jailbreak các phiên bản mới sẽ ngày càng khó hơn do Apple luôn liên tục tăng cường bảo mật cho sản phẩm của mình.
- Việc downgrade hệ điều hành rất hạn chế vì Apple sẽ ngừng kí cho các firmware sau một thời gian nhất định.
- Upgrade hệ điều hành sẽ yêu cầu phải jailbreak lại. Tuy nhiên điều này không phải lúc nào cũng khả thi.
- Nên thay đổi mật khẩu mặc định của tài khoản root sau khi jailbreak (mặc định là `alpine`).
- Trước khi cài đặt một phần mềm nào hãy chắc chắn nó không gây hại cho thiết bị của bạn vì các phần mềm bên thứ 3 này hoàn toàn không được kiểm duyệt bởi Apple.

### 5. Phân loại jailbreak
Có 4 kiểu jailbreak được sử dụng là:
- **Tethered jailbreaks**: Đây là kiểu jailbreak mà thiết bị sẽ mất jailbreak sau khi reboot. Việc khởi động lại thiết bị luôn yêu cầu phải kết nối tới thiết bị máy tính.
- **Semi-tethered jailbreaks**: Với kiểu jailbreak này thì thiết bị vẫn sẽ mất jailbreak sau khi reboot. Tuy nhiên nó có thể tự khởi động và sử dụng chế độ non-jailbreak mà không cần kết nối tới máy tính.
- **Semi-untethered jailbreaks**: Đây là một kiểu jailbreak cho phép thiết bị có thể tự khởi động. Tuy nhiên việc tắt cơ chế Code Signing sẽ không được áp dụng tự động mà người dùng sẽ cần phải truy cập vào một ứng dụng hay một trang web nào đó.
- **Untethered jailbreaks**: Đây là kiểu được sử dụng phổ biến nhất khi mà người dùng chỉ cần jailbreak một lần và không cần thêm thao tác nào khác ngay cả khi reboot thiết bị.

### 6. Các công cụ để jailbreak
Jailbreak là một công việc hết sức phức tạp và khó khăn. Tuy nhiên, cảm ơn các nhóm nghiên cứu về jailbreak khi mà họ cung cấp cho chúng ta các công cụ để tiến hành việc jailbreak dễ dàng và hết sức đơn giản. Các công cụ này có thể tìm thấy trên trang chủ của các team. Tuy nhiên, chúng ta có thể truy cập vào [Can I Jailbreak](https://canijailbreak.com/) nơi sẽ có các bản cập nhật mới nhất cho các công cụ jailbreak của rất nhiều tổ chức như checkra1n, unc0ver, Chimera,...

![](https://images.viblo.asia/fc78d39c-48ff-410f-9074-f80c46f86feb.png)

## II. Tiến hành Semi-tethered jailbreak với checkra1n 0.10.1 beta
Hiện tại trên trang [Can I Jailbreak](https://canijailbreak.com/) , phiên bản mới nhất của checkra1n là [checkra1n 0.10.1 beta](https://checkra.in/) đã hỗ trợ các  phiên bản từ iOS 12.3 tới 13.4.1. 

Trước tiên, tải phần mềm về tại trang [download](https://checkra.in/releases/0.10.1-beta#all-downloads). Ở đây mình tiến hành tải phiên bản dành cho macOS. Hiện tại thì phiên bản này chỉ hỗ trợ cho macOS và Linux.

Sau khi tải về, tiến hành chạy file cài đặt và khởi động ứng dụng. Sau đó vào Setting > Security and Privacy chọn Open Anyway để cho phép chạy checkra1n trên macOS. Giao diện của iOS sẽ như thế này:

![](https://images.viblo.asia/31826db5-9ed6-4357-a00d-35e4c64ac6d7.png)

Có thể start luôn nhưng để đảm bảo không có các lỗi cũng như biết được lỗi nếu có xảy ra trong quá trình jailbreak, bạn nên vào option và bật Safe mode và verbose lên.

![](https://images.viblo.asia/d9fe6aab-d509-42a9-ad3f-80ce9f235e46.png)

Trở về màn hình ban đầu và chọn start. Ở đây sẽ có một vài hướng dẫn của team phát hành. Chọn next để tiếp tục.

![](https://images.viblo.asia/4ad1f1b5-3ba4-44ac-81a7-d97806955638.png)

Thiết bị sẽ vào recovery mode và bạn sẽ thấy hướng dẫn của checkra1n để jailbreak.

![](https://images.viblo.asia/5929f877-222b-495e-a38a-7c8e4d6f6385.png)

Chọn start và làm theo hướng dẫn. Việc còn lại hãy để checkra1n lo.

Sau khi jailbreak thành công, trên thiết bị sẽ có thêm các app là Cydia và checkra1n.

![](https://images.viblo.asia/e3b3db24-0bb1-4a64-b65d-51dc1e4da4ef.PNG)

Thế là quá trình jailbreak đã hoàn thành. 

**Lưu ý:** Jailbreak trên được tiến hành theo kiểu Semi-tethered jailbreak. Nếu thiết bị khởi động lại, nó sẽ sử dụng chế độ non-jailbreak. Bạn phải jailbreak lại thiết bị theo các bước trên sau khi reboot.

## References
- [https://github.com/OWASP/owasp-mstg](https://github.com/OWASP/owasp-mstg)
- [Can I Jailbreak](https://canijailbreak.com/)