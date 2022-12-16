Trong bài này chúng ta sẽ cùng nhau điểm qua các yếu tố cần thiết như thiết bị, mạng, tool hỗ trợ cũng như môi trường cần thiết cho việc pentest nhé.
## I. Host Device

Việc thực hiện pentest trên các thiết bị Linux và Windows không hẳn là không khả thi. Tuy nhiên, nó sẽ hạn chế rất nhiều tác vụ và có thể không thực hiện được một số tác vụ chạy trên macOS. Thêm vào đó, XCode, một bộ công cụ cực kì quan trọng cho iOS development chỉ có thể chạy trên iOS nên macOS là lựa chọn tuyệt vời nhất cho việc pentest iOS.

Để pentest iOS. chúng ta sẽ cần tối thiểu những thứ sau:
- Tuyệt nhất nếu có một macOS với quyền admin.
- Mạng wifi cho phép các kết nối client-to-client
- Tối thiểu 1 thiết bị iOS đã jailbreak
- BurpSuite hay các công cụ chặn bắt gói tin khác.

### 1. Xcode and command line tools.

Để thuận tiện cho việc pentest, Xcode là phần mềm không thể thiếu được. Nó cung cấp rất nhiều các tính năng, review source code cũng như deploy app từ source code chạy, sideloading và  hằng hà sa các thứ khác nữa. Có thể cài đặt nó thông qua App Store hoặc download ở website của Apple.

Hầu hết các tools được tích hợp trong Xcode, tuy nhiên thì trên command line lại không có. Thế nên command line tools là thứ giúp chúng ta sử dụng những thứ kia trên phạm vi systemwide. Có thể cài đặt command line tools với câu lệnh:
```
xcode-select --install
```
## II. Testing Device
Đối với thiết bị test, có 2 khả năng để nói tới là thiết bị thực và simulator. Khuyến khích mọi người việc test trên các thiết bị thực vì simulator sẽ có các hạn chế riêng do về cơ bản nó chỉ là một máy ảo. 

### 1. Jailbreaking
Mặc định, khi sử dụng thiết bị iOS, bạn sẽ chỉ có thể thực thi các tác vụ với quyền `mobile`. Điều này hạn chế chúng ta rất nhiều trong việc pentest, cài đặt tool ... những thứ mà cần quyền root để thực thi. Do đó, phải có cách nào đó để lấy được quyền thực thi `root`. Và jailbreak chính là chìa khoá của vấn đề này. Nếu trên adroid, có 2 cách để có được quyền root là rooting - liên quan tới việc cài đặt `su` lên hệ thống, và flashing custom ROM. Tuy nhiên, trên iOS việc sửa đổi ROM gần như là không thể do các cơ chế đã đề cập trong phần về [iOS Security Architecture](https://viblo.asia/p/ios-security-architecture-Do754QJ4KM6), nên không thể chọn cách này được.

Mục tiêu của jailbreak là cho phép việc thực thi các đoạn code bất kì không cần được kí bởi Apple trên iOS. Thường là việc khai thác các lỗ hổng của hệ điều hành (thậm chí của kernel). Việc này khá là phức tạp và khó khăn. Tuy nhiên, hãy gửi lời cảm ơn tới các tổ chức, các team cung cấp các tool hỗ trợ chúng ta trong việc này. Trước khi đi cụ thể vào việc jailbreak, cùng nói thêm 1 chút về các kiểu jailbreak thường dùng nào:

#### a. Jailbreak types
- Tethered: Là kiểu jailbreak không bền, sẽ mất sau khi reboot thiết bị mà không được kết nối tới máy tính.
- Semi-tethered: Không thể tái thực hiện nếu thiết bị không kết nối với máy tính trong quá trình reboot. Có thể tự chuyển về chế độ non-jailbreak.
- Semi-untethered: Cho phép thiết bị tự khởi động mà không cần kết nối với máy tính. Tuy nhiên việc tắt các cơ chế bảo về sẽ không được áp dụng tự động mà cần chạy một ứng dụng hay kết nối tới một website nào đó.
- Untethered: Là kiểu phổ biến nhất. Chỉ cần làm 1 lần và không cần quan tâm tới các thứ linh tinh như ở trên.
#### b. Benefits of Jailbreaking
- Thay đổi giao diện
- Cài thêm tính năng, phần mềm
- Root access
- Chạy các ứng dụng mà không cần sign-by-Apple
- Không bị hạn chế trong dubug cũng như dynamic analysis
- Truy cập tới runtime Objective-C hay Swift.
#### c. Which Jailbreaking Tool to Use
Mỗi một phiên bản iOS lại cần các kĩ thuật khác nhau để jailbreak. Điều này đồng nghĩa với việc chỉ các tool phù hợp mới có thể Jailbreak thiết bị. Có thể kiểm tra xem phiên bản có thể jailbreak không tại các trang như:
- [Can I Jailbreak?](https://canijailbreak.com/)
- [The iPhone Wiki](https://www.theiphonewiki.com/)
- [Redmond Pie](https://www.redmondpie.com/)
- [Reddit Jailbreak](https://www.reddit.com/r/jailbreak/)

Bản thân mình khuyến khích các tool của checkra1n.

**Lưu ý**: Việc jailbreak là trái với quy định về sử dụng thiết bị của Apple, cần cân nhắc trước khi thực hiện.

## III. Recommended Tools - iOS Device
### 1. Recommand source to Cydia
Sau khi jailbreak, sẽ có một phần mềm Cydia trên máy, là nơi cho phép cài đặt rất nhiều tool khác nhau theo cách đơn giản nhất. Trước khi bắt đầu, cần thêm các source cho phần mềm tại Source > edit > add. Mình recommand theo trải nghiệm của mình các source sau:
- http://cydia.iphonecake.com/
- https://apt.binger.com/
- http://apt.saurik.com/beta/cyda-arm64/
- http://apt.thebigboss.org/repofiles/cydia/
- https://build.frida.re
- https://repo.chariz.com
- https://checkra.in/assets/mobilesubtrate/
- https://coolstar.org/publicrepo/
- http://cydia.radare.org/

Ngoài ra các bạn có thể tự thêm các source cần thiết trong quá trình làm để phục vụ cho quá trình làm việc.
### 2. Recommend tool
- adv-cmds: advanced command line tool, bao gồm finger, fingerd, last, lsvfs,...
- Applist: Liệt kê danh sách các app đã cài đặt
- Apt: Advanced Package Tool, cho phép quản lý các package tương tự dpkg nhưng dễ dàng hơn. Cho phép install, uninstall, upgrade và downgrade package từ Cydia reposities.
- Appsync unified: Cho phép đồng bộ và cài các ứng dụng unsigned của iOS.
- BigBoss Recommended Tools: một command line tool mạnh mẽ cho việc pentest, cung cấp các tính năng cơ bản của unix như wget, less, unrar hay sqlite3.
- Class-dump/ Class-dump-z: Command line tool cho phép lấy ra các thông tin lưu trong Mach-O file, tạo các header file với class interface. **Lưu ý:** class-dump-z k hỗ trợ các thiết bị 64-bit. Mình vẫn chưa tìm được cách khắc phục cái này.
- Clutch: Giải mã các app executable.
- Cycript: Một môi trường console inline, tối ưu, javascript-to-Objective-C tuyệt vời trong dynamic analysis. Có lẽ mình sẽ viết riêng một bài cho công cụ này.
- Cydia Subtrate: Một platform cho phép tạo ra các iOS add-ons bên thứ 3 dễ dàng hơn thông qua app manipulation hay introspection.
- cUrl: Một công cụ http client phổ biến giúp cho việc tạo request hay download dễ dàng hơn.
- Darwin CC Tool: A dependency for Needle.
- IPA Installer Console: công cụ để install các gói tin ipa vào thiết bị iOS.
- Frida: Một công cụ mạnh mẽ trong việc dynamic analysis không chỉ cho iOS mà cả adroid. Có thể xem thêm [tại đây](https://frida.re/docs/home/).
- Grep: một công cụ filter mà nếu làm việc với linux sẽ khá quen với nó.

Ngoài các tool kể trên còn khá nhiều các tool khác để hỗ trợ, chúng ta sẽ cài thêm từ từ trong quá trình làm việc.

## IV. Recommended Tools - Host Computer
### 1. Burp Suite
Một công cụ proxy để bắt, phân tích gói tin rất hay và phổ biến, được phát hành bởi [Portswigger](https://portswigger.net/). Chúng ta sẽ nói thêm về nó tại [bài viết của anh Tuấn](https://viblo.asia/p/su-dung-burp-suite-intruder-sao-cho-hieu-qua-phan-1-1VgZvGG2lAw) nhé. 
### 2. Frida
Đây là một framework rất mạnh cho việc dynamic analysis. Nó cho phép chèn các đoạn javascript vào một ứng dụng iOS chạy trên thiết bị iOS, nhằm phân tích động các ứng dụng này. Tìm hiểu thêm về công cụ này tại [document của Frida](https://frida.re/docs/home/) nhé.
### 3. iFunbox
Một công cụ khá hay cho phép truy cập vào tài nguyên của thiết bị iOS, xem các file của app, cài đặt app, download file... Có thể tải về tại [đây](http://www.i-funbox.com/en_download.html). Giao diện của nó sẽ như thế này:

![](https://images.viblo.asia/0d440b31-eddb-4e28-ab6f-48adefd25d42.png)

### 4. Keychain dumper
Là công cụ giúp dump Keychain của thiết bị iOS để tìm kiếm các thông tin có thể khai thác được trong này. ([Keychain](https://developer.apple.com/documentation/security/keychain_services) là 1 tính năng của Apple, dùng để lưu trữ các thông tin nhạy cảm một cách an toàn). Nếu các thông tin lưu trong này không được mã hoá, hoàn toàn có thể bị kẻ tấn công đọc được trên thiết bị đã jailbreak. Nội dung file keychain sẽ trông như thế này: 

![](https://images.viblo.asia/5bd3d10a-965e-438a-8311-803201f1b5ef.png)

### 5. Mobile-Security-Framework - MobSF
Là một ứng dụng tích hợp, tự động cho việc pentest, phân tích mã độc, đánh giá rủi ro cho cả static analysis cũng như dynamic analysis. Đây là một công cụ tự động rất mạnh và phổ biến cho việc kiểm thử. Chi tiết về cách cài đặt và sử dụng MobFS có thể xem thêm tại [đây](https://github.com/MobSF/Mobile-Security-Framework-MobSF).

Giao diện của MobFS: 

![](https://images.viblo.asia/5e430974-2ca8-4580-a7e7-4282b8a03daf.png)

### 6. Needle
Đây là 1 framework tích họp cho việc đánh giá bảo mật cho IOS, được xem như `metasploit` của iOS. Các thông tin cụ thể về cài đặt và sử dụng needle có thể xem thêm tại [đây](https://github.com/FSecureLABS/needle)

### 7. Objection 
Objection là một "runtime mobile exploration toolkit, powered by Frida". 

 Danh sách đầy đủ các tính năng của Objection  có thể tìm trên trang chủ của project này,  nhưng có thể kể tới các chức năng chính như:
- Repackage applications  để thêm các Frida gadget
- Disable SSL pinning  bằng các phương thức thông dụng.
-  Truy cập tới data của ứng dụng để tải hoặc up data.
-  Thực thi các custom Frida scripts
- Dump the Keychain
-  Đọc  plist files
### 8. Passion fruit
Passionfruit là một công cụ test blackbox sử dụng frida-server trên máy iOS và mô phỏng lại data của app trên giao diện Vue.js-base.

Cài đặt passionfruit có thể thông qua câu lệnh:
```
npm install -g passionfruit
```
 Để sử dụng `passionfruit`, đơn giản chạy câu lệnh sau trên máy host:
```
passionfruit
```
Mặc định `passionfruit` sẽ chạy trên http://localhost:31337

Giao diện của nó sẽ như thế này 

![](https://images.viblo.asia/e3a7f593-d155-43d5-8c50-9e3ec1df4ae7.png)

### 9. Reverse engenerring tool
- IDA Pro
- radare2

**Lưu ý:** vì mình không rành về reverse lắm nên phần này sẽ để sơ sài vậy. Sau này sẽ bổ sung thêm.