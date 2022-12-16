Chào các bạn, lại là mình đây (dù chả ai biết `mình` là ai :-D :-D). Lại một thời gian ở ẩn nay lại có dịp sủi tăm để có cơ hội chia sẻ với mọi người. 

Trong thời gian sủi tăm mình để ý thấy blog của mình viết chủ yếu về `Vue` và `Laravel` vẫn được nhiều bạn theo dõi (mình cũng có ích cho xã hội đấy chứ nhỉ :-D), nên mình thấy rằng việc mình viết blog dù sao cũng giúp được nhiều (hoặc 1 số bạn) và nhiều lúc cứ cảm thấy "tự sướng" rồi cười thầm 1 mình 😂.

Bẵng đi một thời gian mình chủ yếu tập trung vào công việc của mình và tranh thủ thời gian để học thêm về các công nghệ, techstack mới. Nhiều lúc "buồn" chân tay, rất muốn viết, muốn chia sẻ một cái gì đó cho mọi người nhưng cũng cần phải có ý tưởng xem `viết về cái gì?` , cứ thế quên tới quên lui, đến mấy ngày nay do có một số bạn hỏi mình về vấn đề này nên tiện gợi ý tưởng viết bài cho mình luôn. 

Nhân những ngày cuối tuần rảnh rỗi ngồi không ngứa ngay chân tay lại ngồi viết blog, hôm nay mình không viết về `cách bind data trong Vue`, cách dùng `watch` hay `computed, $forceUpdate,...` mà mình sẽ chia sẻ với các bạn về con đường mình đã và đang đi để trở thành Fullstack Web Developer (`đi để trở thành` chứ không phải `đi để trở về` của Soobin nhé những người anh em thiện lành :D). Hi vọng rằng qua đây các bạn có một "nguồn" để tham khảo trên công cuộc trở thành fullstack web. :) (đọc xong nếu không yêu xin cũng đừng nói lời làm cay đắng con tim đau khổ này nhé <3)

> Theo W3School, Fullstack web developer là: A full stack web developer is a person who can develop both client and server software (một người có thể làm phần mềm ở cả phía client và server)
# Vài dòng về bản thân
Chắc các bạn đọc blog của mình nhiều rồi, câu từ có khi nhiều chỗ hơi "ngổ ngáo, trẻ trâu" không rõ: thằng cha viết blog này sinh năm bao nhiêu, làm gì, đực hay cái mà nhiều câu viết nghe cute vậy không biết? (đoạn `....cute` là mình bịa ra thế,  :-D).

Mình là cựu sinh viên Bách Khoa Hà Nội, nghe "cựu" già già, thực ra mình mới ra trường được gần 1 năm (đúng hạn đó các bạn, do Bách Khoa học 5 năm nên cảm giác hơi "lê la" thôi 🤣🤣). Mình cũng từng đi thực tập/làm ở 1 vài công ty, và hiện tại đang làm ở Singapore với 1 mức lương khá ổn cho 1 thanh niên ngô nghê như mình (ăn hên ấy mà, mình điểm thấp lắm :grin: :grin:, ơ hình như `Tôi đi code dạo` cũng đang bên này thì phải).

Công việc hiện tại của mình là chủ yếu viết API, viết app (web/mobile), deploy và maintain (sao nghe hổ lốn, làm kiểu "thiên hạ", việc gì cũng làm thế nhỉ :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye:). Vì môi trường làm việc hiện tại đưa đẩy phải thế đó các bạn :-D


Thôi lại chuẩn bị luyên thuyên bốc phét đến nơi rồi, vào chủ để chính thôi.
# Vỡ lòng về lập trình
### Sự bỡ ngỡ của anh thanh niên mới vào ngành
Mình bắt đầu đại học với sự hiểu biết về lập trình là con số `0`, thi vào ngành công nghệ thông tin đơn giản vì: thích chơi game, và "thấy bảo" ra trường lương cao (1 sự quan hệ biện chứng chặt chẽ nhất thế giới).

Thật sự khi mới bắt đầu học về lập trình mình gặp rất rất nhiều khó khăn, cảm giác mình cứ "ngu ngu" sao so với đám bạn cùng lớp. Năm 2 ở trường học C,  mình đã rất tốn công để hiểu nổi tại sao vòng `while` hoạt động thế nào và cũng không hiểu con trỏ trong C nó là cái điều gì luôn? 

Rồi  lúc học Java và mình vẫn không thể hiểu nổi tại sao câu lệnh tạo 1 đối tượng lại được viết như sau:
```java
Person person = new Person();
```
Khổ thân mấy thằng bạn mình trông bất lực khi giải thích cho mình cái nào mới là `person` thật :-D (trông mặt chúng nó kiểu: thằng này ngu bẩm sinh thật rồi :grin::grin:)

### Lần đầu làm chuyện ấy với PHP
Cuối năm 2 mình có 1 môn phải làm bài tập lớn, đề tài là về 1 trang web quản lý trường học. Lúc đó mình cũng chẳng biết làm web thì dùng cái gì, lên google search thấy có HTML làm được web (ồ really? thế chả nhẽ HTML đi làm mobile app :-D), vậy là mình bắt đầu học HTML, rồi cả CSS và JS và bắt đầu làm các trang web nội dung tĩnh, sau đó học thêm cả JQuery để làm mấy cái animation chạy chạy, nhấp nháy, mỗi lần F5 phát thấy có kết quả ngay trên trình duyệt thấy sướng kinh, tự thầm: làm cái này sướng thế nhỉ, chả như lúc làm Java mỗi lần code lại phải compile rõ lâu :-D. 

Sau đấy thì hiểu các nào để làm nội dùng trang web "động" có thể thay đổi, lưu trữ để lần sau mở ra là có. Thế là mình bén duyên với `PHP`.

![PHP](https://images.viblo.asia/655995c5-d50f-4f47-9371-2f0111d50bd1.png "PHP")


Mình học `PHP` từ cơ bản (trên trang W3School thì phải), rồi cứ thế nhận ra: uầy sao cái này đơn giản thế nhỉ, chả phải khai báo kiểu dữ liệu gì, cứ thế "chiến" luôn :-D. 

Rồi cũng biết được là `PHP` thì phải đi với `MySQL` để có thể lưu trữ được dữ liệu, vậy là mình học luôn `SQL` (các câu lệnh `SELECT, UPDATE, DELETE,....`)

Cuối kì cũng nộp được bài tập là 1 trang web có độ `5-6` màn hình, trông xanh đỏ tím vàng, nhấp nha nhấp nháy, background để nền trời mây :sun_behind_small_cloud: xong lại còn có nhạc nữa 🎶, phong cách thì đúng là của những thập niên 80 thế kỉ trước (dù mình 9x :-D)
# Trải nghiệm
Ngay sau project đầu tiên về `PHP` đó thì mình thấy: à lập trình cũng đỡ khó hơn với mình rồi thì phải :) (lại ảo tưởng). Và mình dành nhiều thời gian để học thêm, chủ yếu vẫn là PHP, sau đó có học thêm về Laravel nữa (nhưng lúc đó vẫn gà kinh :-D).
### Đi thực tập
Đầu năm 3 thì mình được trường phân vào 1 công ty khác để thực tập vị trí iOS developer, mình có thể chọn công ty khác làm về web nhưng thật sự là ngày đó chả biết mình thích gì, mình cứ tiến thôi. 

![IOS](https://images.viblo.asia/7a14da8d-701b-453a-82e7-ea48629068fe.png "IOS")

Kết thúc kì thực tập 4-5 tháng và lúc đó mình thấy rằng mình không thích mobile, suy nghĩ lúc đó là: sao không làm web đi chạy được cả android, ios, desktop (win, mac,....), đây thì làm mỗi iOS, sau này Android nó thịnh hành chiếm cả thế giới thì sao (suy nghĩ tuổi mới nhớn :grin::grin:). 

Ngay khi kết thúc năm 3 đại học, mình xin đến công ty của một người quen để thực tập, về web, code .NET, trong khoảng 5 tháng, là lần đầu tiên mình được đi làm ở một công ty, và cảm thấy ra ngoài mọi thứ nó qúa khác so với trong trường, chẳng còn những file code 1000-2000 dòng gói tất cả mọi thứ, mà bây giờ là module, project vài ba chục file, đọc loạn cả mắt, chẳng còn 1 mình 1 branch trong project mà giờ đây phải làm cùng 1 team với những người khác, commit lên vớ vẩn là "có biến" ngay :-D. Vậy là lại phải học cách thao tác với `Git` để quản lý source code nữa chứ (nhiều thứ phải học quá @@)

![.NET](https://images.viblo.asia/4970ddec-46b2-42b0-94fa-dd188ba03bae.png ".NET")

Hết gần 5 tháng thì mình dần nhận ra rằng, ngoài kia thực tế khác rất xa so với những gì học ở trường, và những thứ "khác xa" đó thực sự làm mình cảm thấy thích thú, hơn là học lý thuyết, thuần thuật toán,... (vì mình hấp thụ những thứ đó kém :-D). Mình kết thúc đợt thực tập do đầu năm 4 học nhiều hơn nên đi được ít (cả do lười nữa :-D). 

> Từ đây, định hướng con đường của mình dần rõ ràng, đó sẽ là được đi làm những công ty, với những dự án thực tế chứ không phải con đường nghiên cứu học thuật. 

### Thử những điều mới
Kì đầu tiên của năm 4 mình có 1 project về game và mình cùng đồng bọn chọn `Unity` để làm. Lúc đó xin "thầy bu" đầu tư cho con Mac, để làm game, và cũng vì cả team mỗi mình có Mac nên chạy `Unity` mượt nên mình bảo bạn mình để mình cân luôn project (hồi đâý hừng hực như con trâu, cái gì cũng làm). 

![Unity](https://images.viblo.asia/5efd8567-4fd7-4c4e-857f-a8a69d106373.jpg "Unity")

Làm Unity mình nhận ra rằng, bản thân mình yêu cái đẹp :-D (nghe dâm quá), thực ra là mình thích làm những cái thiên về bề ngoài trông thấy được (nói gọn như web thì là `frontend` :laughing:). Nhưng kết thúc kì đó mình cũng bỏ ngỏ `Unity` 1 xó.

Sau đó mình có ông anh họ cũng học lập trình, 2 anh em rủ nhau đi học 1 khoá về lập trình ở 1 trung tâm khá to. Khoá học về `Java Web`, và sau 1 cơ số buổi mình cảm thâý rất chán, không thấy thích `Java` vì độ phức tạp và loằng ngoằng chỉ để in ra được vài dòng HTML (thời sinh viên cả thèm chóng chán :-D). Cuối cùng thì mình bỏ dở giữa chừng khoá học, bỏ rơi ông anh đi học 1 mình sau đó cũng bỏ luôn vì ngại đi do cô đơn (nghĩ lại thấy mình tội lỗi quá :joy::joy:)

![Java](https://images.viblo.asia/974c9b8f-efbe-48ff-92e3-1478f06c5e6b.jpg "Java")

Thế rồi lại bẵng đi 1 vài tháng sống cuộc đời vật vờ, bùng học, ngủ nghỉ liên miên, hồi đó sinh viên phải nói là ngủ ngày thực sự khoẻ, và thức đêm thì cũng vô biên :-D.

# Frontend developer??
### Cơ hội mới
Sau những quãng ngày sống lay lắt, và qua những sự dụ dỗ rủ rê nhiệt tình của mấy đứa bạn đại học, thì đến giữa năm 4 đại học mình cũng đi thực tập ở 1 công ty, mình làm ở team `PHP`, code backend dùng `Laravel` và frontend là `VueJS`.

Lúc mới vào nghe thấy phải học `Vue` là sợ khiếp cả vía rồi, nghĩ bụng sao không dùng JQuery hay `Laravel Blade` là được rồi, lôi cái mới vào làm chi :disappointed_relieved::disappointed_relieved:.

Sau đó mình cũng phải bắt tay vào học `Vue`, và thật sự là cảm thấy yêu ngay từ những ánh nhìn đầu tiên. Vue thực sự dễ học cho người mới như mình, cú pháp khá là giống HTML. Code thì chia rõ ràng, file nào cũng 3 thẻ `template, script và style` phân chia rõ ràng rành mạch. Document cũng rất là dễ hiểu nữa chứ.

![Vue](https://images.viblo.asia/78287849-af7a-491e-b9b4-f70de730a395.png "Vue")

### Suy nghĩ định hướng
Thời gian tiếp theo mình dành rất nhiều thời gian với Vue, làm các tutorial về Vue, tìm các project mẫu về Vue. Nói là làm ở team `Laravel + VueJS` mà mình toàn làm mỗi Vue, `Laravel` để member khác làm. :-D

Từ việc thích `Vue` mình dần dần thích mọi thứ về JS,  mình học nhiều hơn về cả Javascript (JS), các chuẩn JS (ES5, ES6, ES7,...) để nâng cao kĩ năng JS. Rồi mình lại thấy yêu dần JS, vì cách viết phóng khoáng và độ mạnh mẽ của nó. Dùng JS có thể viết được hầu như tất cả các loại ứng dụng ở các tảng mà mình biết (Web app, native mobile app, native desktop app).

Rồi mình dành nhiều thời gian hơn để tìm hiểu thêm về những plugin khác của JS như `Eslint` để format code sao cho đẹp, dễ phát hiện lỗi. Eslint là 1 plugin cực hay mà mình khuyên các bạn RẤT NÊN phải dùng, nó sẽ giúp các bạn code năng suất hơn rất nhiều đấy ;). Rồi sau đó là học cách tự config `Webpack` để biết compile project Vue/React thế nào, config Babel để biết được cách mà `Babel` được sử dụng để dịch code của chúng ta chạy được trên trình duyệt ra sao, sử dụng `SCSS` thay cho CSS thể giảm thiểu số lượng code phải viết như thế nào, rồi tìm hiểu cả về `PWA` làm web chạy được cả khi offline và chạy trên điện thoại trông "giống" như app mobile thật, rồi `async/await`,.... Cái gì về JS là mình cũng muốn tìm hiểu bằng hết (ngựa non háu đá :D)

![JS](https://images.viblo.asia/09d2a453-82b4-4410-92ee-f863558019b4.jpeg "JS")

Dần dần mình có một thói quen (đến tận bây giờ), là vào bất kì trang web nào thấy hay hay, hay những trang web của những công ti to (Facebook, youtube, google) là cứ phải mở `Inspect` lên để xem source code, xem request gọi ra sao, websocket, rồi tự test tốc độ, security của các trang đó,....)

Sau này tìm hiểu các trang tuyển dụng, đọc blog thấy mọi người nói nhiều về ReactJS, tìm hiểu thì biết nó là hàng của Facebook, và xem thống kê thị phần việc làm thì React vượt trội nhất cả thế giới frontend :-D. Thế là lại có suy nghĩ nảy ra: mình cần phải có thêm kĩ năng frontend khác ngoài Vue, ngoài kia thế giới xôn xao dùng React tại sao mình lại không biết được (lại toàn suy nghĩ ngựa non háu đá :-D).

Thế là mình lại mày mò học ReactJS. Và cảm nhận của mình: ôiiii, biết Vue sẵn rồi chuyển qua React thật là dễ hấp thụ quá đi, tư tưởng giống nhau, rồi cách triển khai viết code cũng khá là giống nhau nữa. Rồi cũng tìm kiếm các project để làm, xem tutorial về React. Trong quá trình học React mình thấy rằng tài liệu, thư viện, và các tài nguyên khác về React nhiều vô biên không kể xiết, mà được support rất tận tình, cộng đồng thì năng động đông đảo, đúng là hàng của Facebook có khác, nhà nhà yêu mến <3

> Tới đây mình có suy nghĩ là, có phải Frontend Web Developer là cái mình muốn trở thành...
# Bon chen vào backend
### Frontend không làm mình đủ
Sau 1 quãng thời gian hầu như chỉ tập trung làm về `Vue`, có nhiều việc ở công ty mình được giao phải sửa cả phần backend là `Laravel` mà thật sự lúc đó gà thật (giờ chắc vẫn còn gà nhưng bớt :-D), động cái gì mình cũng phải hỏi thằng bạn làm cùng, cái gì cũng không chắc, không biết. Và tính mình thì ngại làm phiền người khác nhiều, nên tự nhiên cảm giác:  mình hỏi nhiều hình như thằng bạn nó cũng bắt đầu chán rồi :-D.

> Vậy là mình nghĩ rằng: mình không thể chỉ biết mỗi frontend được, mình muốn được làm nhiều hơn thế. 
### Tu luyện backend
Vậy rồi mình cũng đành bon chen vào thế giới backend. Dành nhiều thời gian hơn để đọc lại docs của Laravel, làm nhiều ví dụ, tìm các project mẫu về chạy rồi config lại thử xem nó có còn chạy được không sau khi mình thò tay vào :-D. Rồi cứ thế mình tìm hiểu nhiều hơn về Laravel: về queue để chạy task không đồng bộ, về gửi mail, về notification, về laravel echo với socketio để làm realtime, rồi Horizon để quản lý queue job, service provider,... Cứ thế lại thấy tình yêu backend dần tăng lên theo thời gian.

![Laravel](https://images.viblo.asia/f3a3e462-9deb-4a99-8463-f318f9427352.jpg "Laravel")

Dần dần cũng thấy rằng: ồ, nó cũng không khó như lúc đầu mình nghĩ, chẳng qua là mình lười động vào nên bị sợ backend và chìm đắm trong tình yêu với frontend :grin:.

Trong quá trình làm như thế, mình cũng hay lên các trang tìm việc làm, các trang tuyển dụng, đọc blog của mấy a Tây, xem video workshop về công nghệ, thì thấy nói rất nhiều về NodeJS, quảng cáo là NodeJS chạy nhanh, bất đồng bộ nên xử lý được cả triệu request, bla blo.... Trước giờ cứ tưởng NodeJS nó là 1 cái gì đó giống VueJS hay ReactJS (chắc là vì nó có chữ `JS` :grin::grin:). Vậy là lại có suy nghĩ nảy ra: mình cũng nên dắt túi thêm 1 ngôn ngữ backend để có nhiều sự lựa chọn khi làm việc, đồng thời tăng khả năng có việc làm sau này, vì thấy NodeJS tuyển nhiều quá trời (thanh niên ham hố thấy cái gì tuyển nhiều là học :rofl::rofl:)

Vậy là mình đâm đầu vào học NodeJS, chủ yếu là tự học vì đi làm công ty làm Laravel(PHP). Càng học mình lại càng thấy yêu Node, cú pháp thoáng mát, phóng khoáng, dùng `async/await` viết bất đồng bộ như đồng bộ, và đúng là cảm giác NodeJS có chút gì đó "nhanh" thật :). Kết hợp với Express nữa thì quá tuyệt vời, đơn giản, dễ hiểu, hiệu quả. 

![NodeJS](https://images.viblo.asia/d9e1206e-a9c3-467f-979c-ca4f8367acff.png "NodeJS")

Và nó lại càng làm tăng cái tình yêu với JS của mình lên. Học mỗi JS là có thể viết được cả frontend lẫn backend :-D. (Và đúng là yêu JS quá nên hiện tại hầu như mình chỉ dùng mỗi NodeJS cho backend)

Rồi sau đó cũng có 1 project làm về Python web, dùng `Python + Flask` cho backend và Vue cho frontend. Sau project này thì mình thấy (mình thấy thôi nhé :-D): `nếu làm web thì nên dùng những ngôn ngữ "thuần" web, sinh ra để cho web: PHP, NodeJS, Ruby,...` Vì mình thấy `python` hay `flask` vẫn có nhiều cái hạn chế khi làm web, đặc biệt 1 điều mình không thích ở `python` là việc các thư viện hay bị "bỏ rơi" (lỗi thời) hoặc lỗi về phiên bản của thư viện. Dù không có "cảm tình" với python (ôi sorry các bạn code python nhé :)), nhưng hiện tại công việc của mình vẫn thi thoảng buộc phải làm vì không còn sự lựa chọn nào khác :joy::joy:

> Cứ nghĩ đến đây là tới thiên đường rồi, dừng ở đây là được rồi, nhưng không, trước giờ mình mới chỉ có toàn code, code, code, chỉ có Vue/React, hay Laravel NodeJS, không biết cái mình làm ra được chạy như thế nào, triển khai ra sao vì toàn code ở local :-D. Mình để ý thấy các anh leader ở trong team luôn làm việc có thể coi là quan trọng hơn cả: deploy project lên server thật và bảo trì, vận hành đảm bảo là user luôn sử dụng hệ thống ổn định. Và những thanh niên gà mờ như mình thì không bao giờ được động vào những thứ quan trọng đó Vậy là trong lòng lại tràn trề 1 niềm khao khát: mình cũng phải làm được những thứ "quan trọng" như thế (tuổi trẻ mà, cái gì cũng tham :D).
# "Yêu lại từ đầu" với Linux
Mình tự thuê những VPS giá rẻ (hồi đó dùng của Digital Ocean thì phải, 5$/ 1 tháng) và tập tành thử deploy các project nhỏ nhỏ để test xem thế nào. Cho các bạn nào chưa biết, VPS là máy ảo, có hệ điều hành như thật (Ubuntu, Win,...), chúng ta có thể thao tới với nó như là 1 máy bình thường, thông thường là qua command line. Và mình khuyến khích các bạn, nếu là developer, thì hãy tập dùng VPS thay vì ném project lên `hosting`, vì hosting đã "cân" hết rồi, chúng ta chẳng được làm gì cả, vậy là trình chẳng lên được :D.

Có VPS rồi vì nó là Ubuntu (một "phiên bản" của Linux), nên mình phải học các câu lệnh về Linux, làm việc toàn bộ qua command line, không còn UI để mình thao tác bằng chuột nữa rồi. :-D.

Tiếp đó mình thử deploy một số project về Laravel hoặc NodeJS, làm theo các tutorial trên google. Nào là setup các thứ như PHP, NodeJS, MySQL, Redis, hay Nginx để làm webserver, postfix để làm hẳn 1 mail server riêng. Làm sao để public IP của server để bên ngoài có thể gọi vào được, rồi mua mấy cái tên miền (giá rẻ thôi :)) và làm sao để trỏ tên miền về địa chỉ IP của server để thay vì dùng IP thì mình dùng tên miền cho đẹp :-D.

![Linux](https://images.viblo.asia/ba0391b7-86b9-42a6-b217-af3bd427eea0.png "Linux")

Làm việc với server thì có một yếu tố rất quan trọng nữa là làm sao để server được bảo mật. Mình lại mày mò các tutorial hướng dẫn về HTTPS, Fail2ban, rồi dùng IP table để chỉ mở những port mà cần dùng, không mở thừa thãi port, rồi cách dùng Firewall, tạo account MySQL cho từng project, thay vì lúc nào cũng dùng account `root`. Về những vấn đề này thì bây giờ mình biết được là hầu hết các provider (Google, AWS, Azure,...) đã hỗ trợ chúng ta nhiều lắm rồi, mà không hiểu sao ngày xưa mình toàn làm tay :-D. Nhưng như thế lại hay, học thêm được nhiều.

Thọc thọc ngoái ngoái biết bao nhiêu lỗi lầm, cái VPS của mình chắc bị phá hỏng mất 3-4 lần, may là vẫn lưu snapshot (kiểu lưu lại trạng thái VPS, sau này lỗi thì có thể recover lại và dùng tiếp). Nhưng sau một thời gian thì mình thấy kĩ năng về Linux của mình cũng tăng đáng kể, toàn dùng command line, gõ trông như hacker :-D, trước còn "khinh" Linux: hệ điều hành gì mà cùi, chả có UI, nhìn command line xấu òm (tính mình cứ thích cái gì đẹp đẹp :-D). Và trong quá trình học nhiều về Linux và quản lý server, thì mình thấy các dev nước ngoài người ta rất là pro về Linux, và nhận ra mình vẫn còn kém xa so với họ.
> Anh lead công ty cũ mình từng bảo: nếu chú muốn lên trình thì phải tập dùng linux đi. Trước nghe thì biết vậy, giờ mới thấy thấm thía...

Sau khi có cơ hội được sang Singapore làm việc, môi trường mới cho phép mình được làm nhiều thứ hơn, được tự chủ nhiều hơn. Môi trường mới, mình phải làm việc độc lập nhiều hơn, phải làm nhiều công đoạn trong quá trình làm phần mềm hơn (không chỉ mỗi code nữa :)) gần như từ khi bắt đầu project đến lúc deploy và maintain, hầu như chẳng thể kêu được ai khi gặp lỗi, gặp bug, chỉ có google và stackoverflow là thầy :-D. Và do đó mình học được nhiều kĩ năng hơn.

> Tới đây mình nghĩ là đã đạt điều kiện cần để là Fullstack developer. Phần dưới đây là hoàn toàn tùy chọn, các bạn có thể đọc tiếp để biết thêm hoặc chuyển xuống phần kết bài, mình có vài lời khuyên cho các bạn ở đó :)
# Lon ton vào thế giới DevOps với hi vọng cuộc đời bớt khổ
Nói đến DevOps thì rất rộng và bao gồm nhiều thứ không chỉ những thứ mình nói dưới đây. DevOps giờ đã là cả một ngạch riêng hẳn tương tự như Frontend Engineer, Backend Engineer, giờ có DevOps Engineer (đại loại là những người chuyên deploy, maintain project). Ở đây phần này mình nói tới những khía cạnh mình học được và đã áp dụng và thấy hiệu quả.
### Docker
Khi còn làm ở công ty cũ ở Việt Nam trước khi qua Singapore, mình có được thấy anh lead setup sẵn project Laravel cho cả team dùng một thứ gọi là `Docker` (đọc là: "đốc cơ"), bọn mình thì vẫn cứ code như bình thường thôi, không thấy khác gì. Có hỏi anh ấy thì được biết là dùng Docker thì môi trường làm việc giữa các thành viên trong team giống hệt nhau (không phụ thuộc vào mình dùng win, mac, hay linux,...), đồng thời môi trường làm việc ở local `giống hệt` môi trường khi chạy `production` (chạy thật). Vậy là một niềm tò mò cực lớn lại trào dâng. 

Lúc đó mình muốn tìm hiểu xem nó là cái gì và nó hoạt động ra sao, vì mình thấy "bức bối" khi có 1 góc nào đó của project mình đang làm mà mình lại không được hiểu hết về nó :-D (ngựa non lại tiếp tục háu đá :)). 

Vậy là mình dành thêm thời gian rảnh ở nhà để học thêm về `Docker`, biết được: à nó là công cụ để ảo hoá môi trường làm việc, các package hay thư viện bên trong `Docker` độc lập hoàn toàn so với môi trường gốc, các ứng dụng sử dụng Docker thì gọi là `container` (đọc là: "cờn tên nơ"). Điều tuyệt vời khi mình dùng nó là nó nhanh, hiệu suất cao, không bị nặng nề như việc dùng máy ảo kiểu VM Ware hay VirtualBox như mình có từng thử, vì nó share hardware (CPU, RAM,..) với hệ điều hành gốc. Và hiện tại Docker đang cực cực phổ biến, sử dụng hầu hết ở các công ty nhỏ vừa và lớn: Tiki, Google, Facebook, Amazon,... và công ty cũ của mình :-D

![Docker](https://images.viblo.asia/c588355a-89f5-4718-a501-9ee285035440.png "Docker")

Dùng `Docker` thì ta có thể viết được ứng dụng với đủ thứ thư viện: PHP, NodeJS, ... bên trong nó, được đóng gói lại thành 1 thứ gọi là `Image`, chạy được như bình thường và thực tế ta không cần cài trực tiếp những thứ đó vào hệ điều hành gốc. Mỗi Image lại có một file cấu hình đầy đủ chi tiết gọi là `Dockerfile`. Mỗi 1 project sẽ được mô tả đầy đủ ở file `docker-compose`. Điều này cực kì thuận tiện khi mà chúng ta phải làm với hàng chục, vài chục app và nhiều hơn thế :-D (nghe cao siêu quá, xin cái demo coi :grin:)

Mình lấy 1 ví dụ cho các bạn dễ hiểu hơn: ta có 1 project Laravel cho backend, frontend dùng VueJS, dùng MySQL cho database, Redis cho queue, và khi chạy thật ta sẽ cần 1 webserver (Apache hoặc Nginx, ở đây mình chọn Nginx). Ta sẽ bắt đầu setup để chạy được project này:
1) Project dùng Laravel, đương nhiên phải có PHP -> cài PHP
2) Xong xuôi lại phải cài hàng loạt extension cho PHP:  php-xml, php-mbstring, php-zip,.....
3) Cài composer, chạy composer install
4) Dùng VueJS -> cài NodeJS, npm, chạy npm install
5) Cài MySQL, setup user, account, setup database
6) Cài Redis
7) Cài Nginx, và setup được nginx thì cũng cần "kha khá" bước :-D

Thường thì chúng ta cứ thế search google và làm theo từng bước, cài trực tiếp vào hệ điều hành gốc (ở local hoặc trên VPS). Điều gì xảy ra nếu ta có cỡ 10 project, mỗi project lại có những yêu cầu lúc thì ít hơn khi thì nhiều hơn phần mô tả bên trên ? Bạn dùng Linux cài các bước trên sẽ khác gần như hẳn so với bạn dùng Window? Local dùng Window, server dùng Ubuntu ? Hay khi bạn cần chuyển 1 project sang một server hoàn toàn khác -> làm lại từ đầu từng bước-> ngồi nghĩ xem cần cài những cái gì, và gần như 96,69% sẽ cài thiếu 1 cái gì đó cho đến khi chạy bị lỗi mới nhớ ra :-D. Điều này mình từng gặp rất nhiều khi join vào 1 dự án và phải cài project của công ty từ đầu, thật sự là 1 ác mộng :sweat_smile::sweat_smile:

Nếu dùng Docker cho project bên trên, ta chỉ cần cài duy nhất `docker` (đương nhiên rồi :-D) khai báo các thư viện, extension trong file cấu hình Docker cho project, và sau đó dùng docker để load file cấu hình và chạy, toàn bộ thư viện, extension... sẽ được cài vào trong app của chúng ta chạy ở môi trường "ảo", chứ không cần cài trực tiếp vào máy thật. Sau này khi lên server hay đưa project cho người khác, ta chỉ cần gửi file cấu hình là người ta có thể chạy được và có môi trường giống hệt mình. Không cần phải đau đầu nghĩ xem nên cài gì, còn thiếu gì, đủ chưa,... :-D 

> Theo cảm nhận của mình các bạn biết dùng Docker và áp vào project là cuộc đời đã tươi sáng hơn rất rất nhiều rồi ;). Nếu muốn cuộc đời tươi sáng hơn nữa, thì tiến tới phần tiếp theo nhé :-D
### CI/CD - Từ code đến deploy
Đến phần này cũng khá là nâng cao rồi, nếu các bạn thực sự có nhu cầu có thể đọc thêm, không thì biết tới Docker là các bạn có thể dừng bài này ở đây rồi :-D.

Hiện giờ một số trang quản lý code như Gitlab (Github cũng có nhưng phải trả phí cho dịch vụ ngoài). Mình khuyến khích các bạn dùng gitlab vì họ cho free unlimited private repository. Và Gitlab có một dịch vụ đó là CI/CD (Continuous integration and continuous delivery - tích hợp liên tục, triển khai liên tục) dành cho các ứng dụng sử dụng Docker.

![Gitlab_CI_CD](https://images.viblo.asia/cf31aeef-b904-4891-b2dd-0e95fa138c31.png "Gitlab_CI_CD")

Phần này các bạn cần dành nhiều thời gian tìm hiểu mình chỉ xin nói qua về các mình áp dụng và học hỏi. 

CI/CD là kể từ khi ta sẽ định nghĩa sẵn 1 loạt kịch bản cho project kể từ khi code được commit lên repository->đến deploy ra project thật (chạy thế nào, test ra sao, tiền xử lý, hậu xử lí cái gì,..), để các trang như Gitlab làm tự động toàn bộ thay cho chúng ta, việc của ta là chỉ tập trung vào code mà thôi :-D.

Cơ chế như sau (ở đây mình dùng Gitlab): khi có file cấu hình kịch bản sẵn rồi, ta để chung với folder project của chúng ta, commit code lên Gitlab, Gitlab sẽ tự động chạy test (thích bao nhiêu test ta cứ định nghĩa, test thế nào cũng toàn bộ do chúng ta định nghĩa), rồi Gitlab sẽ tự build `Docker Image`, rồi cũng tự push push Image lên `Container Registry`, cuối cùng là tự động update trên server thật luôn.. **Quá trình này hoàn toàn tự động**.

Nhờ vậy mà ta có thể code, commit, qua các test cần thiết để đảm bảo code chạy đúng và đủ sau đó triển khai ra server thật để user dùng các chức năng mới càng sớm càng tốt. 

Khi biết tới CI/CD mình thấy công việc của mình đã nhàn đi rất là nhiều rồi. Nếu theo cách truyền thống là ta code ở local, test, commit code, lên server pull code về, install các thư viện cần thiết, build lại project, và restart, mất rất nhiều thao tác và phải tự mình làm hết. Giờ đây việc của ta là chỉ cần cấu hình 1 lần, và kể từ sau chỉ cần tập trung vào việc viết code giảm thiếu tối đa thao tác lặp lại.
> Đến bước này thì cuộc đời cũng tươi sáng lắm rồi. Các bạn đọc đến đây là tắt được rồi :-D. Nhưng nếu các bạn lại muốn cuộc đời sáng thêm 1 nấc thì đọc tiếp phần dưới nhé.

> Phần dưới nếu các bạn thực sự muốn thì có thể đọc và tự tìm hiểu thêm nhé :-D

### Kubernetes
Ở bên này (Singapore) mình có hay đi tham dự các buổi seminar của những công ty như Facebook, Google, Amazon, Zendesk, Stripe,.. và mình cũng hỏi bạn mình làm ở Tiki (Việt Nam) thì được biết là các công ty này đều dùng Kubernetes (đọc là: "kiu-bơ-nấy-tịt-s)  để chạy và quản lý projects. 

![kubernetes](https://images.viblo.asia/86799d08-09f2-434b-839f-bdc18cf073aa.png "kubernetes")

Kubernetes là 1 platform để quản lý các ứng dụng `container` hay thực tế là các ứng dụng sử dụng Docker. Kubernetes là hàng của Google, Google phảt triển và sự dụng, ém hàng bao năm rồi, một vài năm trở lại đây mới public để cộng đồng sử dụng và đóng góp. Kubernetes được mô tả là `production-ready` (tạm hiểu là sinh ra để chạy production).

Sử dụng Kubernetes ta có thể:
- quản lý các ứng dụng, tự động scale
- tự động deploy 
-tự động "heal" (sửa chữa) project khi gặp lỗi
- deploy project `zero downtime`: bình thường khi ta deploy project sẽ có 1 khoảng server sẽ bị down (có thể khá nhỏ < 1 giây) khi ta restart để cập nhật lại code mới, khi chạy thật mục tiêu của ta là làm sao để server luôn luôn hoạt động mọi lúc, không down dù bất kì 1ms nào :-D. Với Kubernetes thì sẽ không còn chuyện đó nữa (quá tuyệt vời <3), và việc này được Kubernetes làm tự động.
- Load balancer: điều phối traffic để đảm bảo các app của chúng ta luôn hoạt động ổn định
- Dễ dàng chuyển app của chúng ta từ trạng thái này sang trạng thái khác. Khi deploy mà gặp lỗi ta có thể chuyển ngay về trạng thái cũ khi mà app vẫn chạy bình thường.
- ... vân vân và mây mây

Nghe thôi đã thấy sướng rồi :-D, mình rất tò mò về những thứ mà các công ty lớn họ sử dụng để xây dựng và phát triển sản phẩm của họ, cách mà họ quản lý chúng,...., Vậy là chú ngựa non háu đá lại tiếp tục học thêm về Kubernetes. Hiện tại đã áp dụng vào 1 - 2 project và thấy khá ổn.Và thật sự đi tức mức này và để hiểu được thì vẫn còn nhiều thứ thực sự đau đầu, dự định của mình là dần dần sẽ áp dụng lên toàn bộ các project mình làm. 
# Thứ chúng ta đã lãng quên
TEST - ôi nghe thấy đã thấy chán rồi. Cái này ai chả biết mà :-D. Lúc deploy chạy thật có user test cho rồi. Lỗi user kêu là biết ngay :-D

Mình chỉ xin nói ít dòng. Ngày trước mình cũng nghĩ như thế, và nhiều khi lúc code có những phần phải kiểm tra lại những do code nhiều quá đầu óc mụ hết đi rồi không nghĩ tới, và thành ra lúc deploy xong mới thấy những lỗi vớ vẩn hoặc thậm chí nghiêm trọng mà trong khi nó xuất phát từ những thiếu sót khi code (không nghĩ tới đủ các trường hợp, lỗi dữ liệu đầu vào,...)

Mình khuyên các bạn, Nên viết các test tự động cho project. Laravel có Laravel Dusk, Vue có bộ test riêng, NodeJs thì có Mocha, React hay React native cũng có những bộ test riêng, bla blo,....Ta chỉ việc viết test case sẵn, rồi chạy bằng 1 command là các test case đó sẽ được chạy tự động. 

![Test](https://images.viblo.asia/5b4c4709-848a-4093-8892-7fc7fcbe0d5d.jpg "Test")

Thôi phần này mình chỉ nói thế thôi không anh em lại chán (thực ra đọc đến đây dài là cũng chán lắm rồi :D)
# Bonus thêm 1 thứ đã lãng quên khác
> Cấu trúc dữ liệu và giải thuật
 
:laughing::laughing::laughing::laughing::laughing::laughing::laughing:

![Algorithm](https://images.viblo.asia/e2cdf84d-8b3f-4737-a1fa-fbc35baddcd4.jpg "Algorithm")

- "Mình làm fullstack, cái phải học là Vue, là Node, là PHP, là Java, Docker,... Khi code có bao giờ phải dùng đến nào Stack, Queue, Linked List hay dùng Quick Sort để viết CSS JS bao giờ đâu????"
- "Rồi rồi biết rồi, ai chả biết cấu trúc dữ liệu giải thuật là basic cho mọi thứ, biết rồi, chuẩn bị học đây" :-D
> Định hướng trở thành Fullstack developer, đã từng có 1 thời gian dài mình ôm chặt suy nghĩ là không cần thiết phải học cấu trúc dữ liệu và giải thuật, vì nghĩ rằng khi code có bao giờ dùng tới, và giờ các ngôn ngữ bậc cao đã xử lý hết cho chúng ta rồi...

Phần này mình cũng không nói nhiều, chỉ muốn chia sẻ một chút. Một thời gian gần đây mình có tranh thủ chút thời gian rảnh, để xem thêm về CTDL & GT đồng thời giải các bài toán trên hackerrank, một thời gian mình thấy rằng khi viết code mình có sự tư duy nhiều hơn mỗi khi gõ 1 dòng code, ngày xưa thì gõ như cái máy, giờ hay nghĩ xem cái hàm này làm gì, làm thế nào rồi mới viết trước, giúp mình hiểu sâu hơn và đặc biệt là rèn được cái phải nghĩ trước khi viết thay vì viết như cái máy :-D

Mình khuyến khích các bạn, không quá đặt nặng nề, nhưng nên dành ra chút thời gian rèn luyện về CTDL & GT, đọc tài liệu, blog, làm challange trên các trang như kiểu hackerrank,... mỗi ngày mỗi lần 1 chút để hoàn thiện bản thân. ;)
# Dấu chấm hết bài
Phù, cuối cùng cũng đọc tới cuối bài (cha nội này viết dài quá :-D)

Qua bài này chắc hẳn các bạn thấy mình là 1 người "tham", cái gì cũng muốn học. Đúng thật mình thấy mình là 1 người tham. Và vì cái "tham" đó nên mình buộc phải dành nhiều thời gian hơn để học. Với bản thân mình, sau này nhìn lại mình không muốn mình chỉ là một người sống cuộc đời lay lắt,  đi làm đủ công ăn lương tối về nhà là hết. Mình hâm mộ Cristiano Ronaldo, và mình học được từ anh ấy tính khao khát có mọi thứ và các câu chuyện về sự kiên trì của anh để có được thành công hôm nay, và triết lý đó mình nghĩ không chỉ có thể áp dụng được ở bóng đá mà ở mọi lĩnh vực. :-D (nghe triết lí to lớn ghê :-D)

Tất nhiên mình chỉ tập trung vào linh vực mình làm không có ý định ham hố quá nhiều, chủ yếu là quá trình phát triển và các công nghệ liên quan tới web và server, và hiện tại mình đã chuyển dần gần như chỉ làm với NodeJS, Vue và React (hoàn toàn không nghĩ việc sẽ nhảy sang mấy ngạch kiểu machine learning :-D)

Và dưới đây là một số lời khuyên mình dành cho các bạn:
- Trở thành Fullstack Web Developer, các bạn hãy đọc tham khảo về 2 mục về `frontend` và `backend` trong bài viết của mình. Những thứ đó theo mình là cần thiết. Sau đó nên xem tới phần về `Linux`, còn các phần khác thì tùy theo các bạn muốn bản thân biết nhiều hơn hay không :-D.
- Hãy đi thực tập, đi làm ở các công ty càng sớm càng tốt. Họ sẽ dạy cho bạn rất nhiều thứ.
- Tự học, cái này mình nghĩ rất quan trọng đối với lập trình viên, nó sẽ mở ra cho các bạn rất nhiều thứ mới mẻ ;)
- Kiên trì và dành nhiều thời gian hơn để trau dồi nâng cao giá trị bản thân.

**Kiên trì** là điều tối quan trọng mình muốn gửi tới các bạn. Vì thật sự, ngay cả với bản thân mình, trong quá khứ, mình đã từng có nhiều suy nghĩ: ồi làm machine learning/data science lương cao khủng thật chứ mấy ông Fullstack làm dăm ba cái web PHP làng nhàng thì được mấy đồng, hay cũng có lúc mình có hơi chút chút nghi ngờ về ngôn ngữ mình chọn, framework mình học nhưng thật may sau đó được gặp nhiều người đọc nhiều blog và mình nhận ra là mình phải kiên trì với lựa chọn của mình, kiên trì với con đường mình đã và đang đi.

Hi vọng rằng qua bài này mình có thể giúp được bạn nào đó còn đang băn khoăn thắc mắc về đường đi như thế nào nếu muốn trở thành frontend/backend hay fullstack developer.

Cám ơn các bạn đã theo dõi blog của mình, chúc các bạn luôn kiên trì và thành công trên con đường sự nghiệp và hẹn gặp lại các bạn vào các bài viết sau. <3