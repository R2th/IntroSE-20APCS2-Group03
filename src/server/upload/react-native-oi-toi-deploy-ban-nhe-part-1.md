![](https://images.viblo.asia/c3245f43-78f4-44c1-a991-b5a381951c88.png)

* Thằng react native này code xong rồi deploy sao ta ? Có rườm rà phức tạp không ta ? Làm sao mình deploy được khi có biết gì về android và ios đâu nhỉ ? . Ok. Đó là những câu hỏi khi mà các bạn vừa mới có cảm tình với nó (React Native) và bị dập tắt sau một hồi research (Ok , WTF , rườm rà vãi cả *** ra quần) . Có người bỏ cuộc và có người tiếp tục với RN. Nếu tiếp tục thì đọc tiếp nhé .

*  Lên trang chủ [React Native](http://facebook.github.io/react-native/) translate một hồi rồi cài thử . Máy tao chạy window mày ơi, build con app cả tiếng đồng hồ. Còn máy tao ram có 4G đứng đơ . Thôi t học cái khác đây =)) . Ok 20% số lượng người ra đi vì cấu hình máy yếu . Mấy thanh niên máy ngon cấu hình tốt thét lên. **Phêêêêêêêêêêêê........** . Chạy Hello world rầm rầm rồi tụi mày . Tiếp nhé mấy bạn có điều kiện =))

*  Thực ra code gì cũng được miễn là bạn có chút kiến thức và biết cách đọc tài liệu cũng như research, đương nhiên là phải có demo thì trình bạn lên rần rần mà còn hứng thú khi có kết quả ấy chứ . Nhưng trong lúc xây dựng một cái app hoàn thiện thì nó phát sinh cả mớ vấn đề, không đơn giản như bạn nghĩ đâu. Rồi chuyện gì đến sẽ đến ngồi một con bug cả tuần liền không sao fix được cả. Tư duy để tìm cách giải quyết bó tay, research bó tay, đang lên cộng đồng nhờ giúp đở củng bó tay,  ôm máy tính đi khắp nơi tìm kiếm 500 anh em pro giải quyết cũng bó tay. Giờ sao ta ? Tắt máy đi ngủ sáng mở máy lên với quyền` Administrator` . Chửi thề `D34532^&&$%^&&*(*$%^$%GVH......` Thì ra nó bị `permission ` , đơn giản vậy đó nhưng khổ lắm các bạn ạ. Rồi có người comment, thằng react native này code thì nhanh nhưng có nhiều vấn đề quá , 10% số người lại bỏ cuộc . 

* Đến đoạn này được thì chắc bạn đã build được cái app ngon lành cành đào rồi đúng không ? . Giờ sao cho mọi người nhìn thấy app của mình nhỉ ? Tóm lại một câu thôi `Tốn tiền vãi cả ra..` .Mua acc để đeploy đi mấy bác. Nhưng mua rồi deploy được cũng là cả một vấn đề đấy. Bài viết này chỉ dành cho mấy bạn vượt qua các cửa ải phía trên nhé. 

# I. Trả lời mấy câu hỏi ?
**1. Thằng này deploy lên đâu ?**

=> Nó build ra cho 2 hệ điều hành chính android và ios nên chắc các bạn không cần mua account mấy store của Apple và Google đâu :P. 

**2. Quy trình build test thì như thế nào vào build product thì như thế nào ?**

=> Về build test : 

- Có rất nhiều cách build test cho từng nền tảng . Ở bài viết này mình hướng dẫn các bạn build test Android với Fabric và Ios với Testflight nhé. Các bạn lên search qua về 2 thứ bá đạo trên xem rồi mình sẽ đi chi tiết trong seri bài viết này nhé.

=> Về build product : 

- Bạn cần chuẩn bị 2 cái account [Google Play](https://play.google.com/store) cho android và [Apple Store](https://www.apple.com/ios/app-store/) cho ios nhé. Quy trình thế nào mình sẽ triển nó trong bài viết này luôn .

**3. Build mấy cái này có mệt không ?**

* Ok 2 chử thôi . **Mệt lắm** 

**4. Sao bạn vòng vo vậy , khi nào thì vào phần chính đây ?**

* Mình xin lỗi triển nhé các bạn.


# II. Deploy Android

## 1. Build test với Fabric. 
* Đối với mỗi developer trong quá trình phát triển ứng dụng thường có 2 thời điểm đặc biệt chú trọng nhất :

    - Build apps cho QA test
    - Release production 

- Thời điểm 1. Build apps cho QA test thì chúng ta chỉ mong muốn sản phẩm của mình không quá nhiều bug mặc dù đã cố gắng hạn chế hết mức có thể rồi, nhưng dù khi có nhiều bug đi nữa thì tất cả đều được QA log lại và thông báo trực tiếp để fix. 
- Nhưng thời điểm 2. Release production thì không dễ dàng như vậy, lúc này sản phẩm đã đến tay người dùng rồi và bạn không thể kiểm soát được bug - hay force crash trong apps.
-  Xuất phát từ mong muốn được thông báo những trường hợp force crash apps gây ra phản ứng khó chịu cho người dùng, Fabric Crashlytics cho phép theo dõi apps của bạn ngay cả khi nó đã nằm trên AppStore/Google Play.
   
   Bây giờ, chúng ta sẽ bắt tay vào tìm hiểu cách sử dụng nhé!


### a . Create Account Fabric.

![](https://images.viblo.asia/f4740f44-5543-4714-98f3-43053b969b7e.png)

Đầu tiên bạn lên trang chủ [Fabric](https://get.fabric.io/) đăng ký một tài khoản với email của mình nhé.

![](https://images.viblo.asia/8f3e3083-e4cc-43ac-a788-d8976cf265bf.png)
* Chỉ cần mấy bước đơn giản thôi thì bạn đã sỡ hữu một tài khoản gọi là bá đạo nhất cho việc deploy test mà lại hoàn toàn free nhé. 
* Khi bạn tạo xong thì thấy giao diện của dashboard hổ trợ 3 nền tảng là:

    - Ios
    - Android
    - Unity
    
* Giao diện phải nói là chuyên nghiệp và thực sự đẹp (trong mắt mình) .


### b . Open AndroidStudio and go to Preferences

* Mở AndroidStudio với source project React Native của mình đi nhé.
* Nếu chwua có [AS](https://developer.android.com/studio/?hl=vi) thì bạn có thể tải ở link đính kèm nhé.
* Bạn vào mục Preferences.

![](https://images.viblo.asia/aac3e056-f8f1-4227-a1e9-f960bd13b0ee.png)

* Cửa sổ mới hiện ra bạn bấm vào button Browse repositories.

![](https://images.viblo.asia/dec3d0ac-14bd-4b58-b551-45b6311a206a.png)

* Tìm và install Plugins Fabric for Android nhé

![](https://images.viblo.asia/9f370657-ee40-49e3-a618-7f9a841f35d6.png)

* Khi cài xong thì có một biểu tượng là icon của Fabric hiện lên trên thanh công cụ của Android Studio.


![](https://images.viblo.asia/81b2b3ba-6107-40f9-8148-19fa731ece2a.png)

### c. Create App with Fabric

* Sau khi click vào icon Fabric bây giờ giao diện của nó hiện lên trên Android Studio của mình. Các bạn tạo một cái App mới với Fabric nhé ( Nhớ login vào với tài khaonr đả tạo ở bước trên nhé ).

![](https://images.viblo.asia/ed0a9c9a-76bb-40a2-a199-e709e663cfb4.png)

* Click chọn App vừa mới tạo ra nhé .

![](https://images.viblo.asia/61b13669-4863-4f76-a777-48ead318d932.png)

* Tiếp đến phần All Kits chọn Crashlytics

![](https://images.viblo.asia/41200b71-2cbf-4608-a46a-7abadd172fab.png)

* Install Crashlytics 

![](https://images.viblo.asia/2dfa1d7e-3c81-495f-8f85-53bba12a3efa.png)

* Sau khi install xong thì nó hiện ra cho mình một đoạn code để setting cho app với Fabric.
Thêm đoạn code đó vào file AndroidManifest.xml trong thư mục android.

![](https://images.viblo.asia/355bf893-6193-421f-95eb-6df8ad92e9d0.png)

* Build APK file với build debuger

![](https://images.viblo.asia/f17cf44f-7f53-4e20-ac51-0d7e7188c5a5.png)

* Sau khi build apk xong thì kéo thư mục app-debug.apk vào giao diện của Fabric trong AndroidStudio để tiến hành update bản apk lên store của Fabric.

![](https://images.viblo.asia/cfc265df-35ca-4fbb-a573-4c96a9c4c721.png)

* Cuối cùng Add member , QA , tester vào để kiểm tra lại ứng dụng.

![](https://images.viblo.asia/1b18e2e3-b629-4c40-ab84-f6e47efd1d65.png)

* Bây giờ app của mình đả có trên Store của Fabric bạn có thể lên dashboard của Fabric để kiểu tra app, tải app hay xem các thông tin ở đó.

![](https://images.viblo.asia/eb2c6aef-4cff-4fef-9544-e2830d71c0ab.png)

### d. Test app

* Để cài được ứng dụng bạn tải Fabric trên Google Play về sau đó vào email được add vào ứng dụng của bạn để lấy code . Nhập vào và tải app . Có thể report hay comment khi app có bất kỳ vấn đề gì xảy ra .

* Việc test và report như thế nào thì đả có trên trang chủ của Fabric nên mình sẽ không nhắc nhiều thêm.

### e. Kết 

* Sau khi bạn Run app thành công và click vào app nếu app bị crash . Ngay khi đó bạn sẽ nhìn thấy project trên Fabric Crashlytics thông báo report. 
* Không chỉ dừng tại đây, khi bạn đã phát hiện ra bug này rồi. Sau khi tiến hành fix bug xong bạn build lại 1 bản cho QA test. QA thấy không còn bug này nữa sẽ close bug này trực tiếp trên report luôn. Một tính năng rất tiện dụng cho cả bên Develop và QA.
* Với những chia sẻ trên đây của mình hy vọng rằng sẽ mang lại sự hữu ích cho các Developer trong quá trình theo dõi tình trạng của Apps được tốt nhất. Dựa trên đó sẽ có những biện pháp bảo trì kịp thời ngay khi có sự cố xảy ra!

-------
----
---
Bài viết dựa vào những kinh nghiệm khi mình chạy dự án thực tiển nên có gì chưa hay thì bổ sung hoặc góp ý thêm cho mình (bow)


Phần 2 tiếp tục trong bào viết sau nhé. 

**Thanks** for ....