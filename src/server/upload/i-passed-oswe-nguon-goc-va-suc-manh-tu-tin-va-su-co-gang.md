# 1. Giới thiệu

Xin chào, lại là Tôi - một thằng hay viết các bài blog xàm xàm. Như đã hứa với các bạn đọc ở bài viết [Chỉ một buổi chiều, Tôi đã chiếm quyền điều khiển server của 8 website như thế nào?](https://viblo.asia/p/chi-mot-buoi-chieu-toi-da-chiem-quyen-dieu-khien-server-cua-8-website-nhu-the-nao-Do7542neZM6) (Một bài viết cũng có thể hay, các bạn đọc thử nhá), Tôi đã hứa là sẽ quay trở lại viết bài với series OSWE, nhưng thôi Tôi quyết định đặt nó thành series `I passed OSWE` và bài hôm nay sẽ là `phần 1 - Nguồn gốc và sức mạnh | Tự tin và sự cố gắng`.

Tôi hy vọng rằng bài này sẽ có ích cho bất kỳ ai chuẩn bị học và thi OSWE. Đây chưa phải là bài chia sẻ cách học để thi OSWE, vì đây là bài chia sẻ trải nghiệm quá trình học và thi của Tôi.

Vào hồi 9h sáng ngày 23/01/2021 (dương lịch) Tôi đã bắt đầu bài thi OSWE thời gian thi là 48h, tuy nhiên sau 25h49p Tôi đã hoàn thành 100% bài thi OSWE.

Và đây là mail xác nhận từ `Offensive Security` gửi cho Tôi.

![Manhnv oswe certification](https://manhnv.com/images/posts/oswe/i-passed-OSWE-nguon-goc-va-suc-manh/manhnv-oswe-cert.png )

Và Badge trên website đây: [https://www.youracclaim.com/badges/f6400cb3-7bfc-4dad-97c1-af80301d2fea/public_url](https://www.youracclaim.com/badges/f6400cb3-7bfc-4dad-97c1-af80301d2fea/public_url)

Một chứng chỉ tuyệt vời để các bạn muốn học thêm nhiều skills về tấn công web nâng cao (có nhiều skills như thế nào thì các bạn đọc `Phần 3 - Sức Mạnh` nhé).

Tôi muốn viết nên series này là vì Tôi cũng muốn chia sẻ tý niềm vui khi đạt được chứng chỉ cho các bạn đọc được biết (nói trắng ra là khoe), cũng như review tạo chút động lực cho bạn nào muốn lấy OSWE trong thời gian sắp tới.

Những bạn đang có ý định thi, lỡ có đọc các bài review trượt lên trượt xuống trên mạng thì cũng đừng có hoảng loạn nha, nó cũng chả có gì đâu, cố gắng là được. Lúc mới tìm hiểu OSWE Tôi cũng đi đọc hết các bài review trên mạng, nhưng lạ thay toàn là bài về việc trượt lên trượt xuống 1-2 lần thậm chí 3 lần mới đỗ, nên cũng hoảng lắm.

Nhưng các bạn cứ tự tin và cố gắng lên, sẽ đạt kết quả tốt thôi.

# 2. Nguồn gốc

## Offensive Security Web Expert (OSWE) - Advanced Web Attacks and Exploitation (WEB-300)

OSWE là một trong danh sách 1 tràng chứng chỉ của [Offensive Security](https://www.offensive-security.com/).

![Manhnv OSWE](https://manhnv.com/images/posts/oswe/i-passed-OSWE-nguon-goc-va-suc-manh/AWAE-OSWE-WEB-300-box-label.png)

Offensive Security Web Expert  (OSWE) là chứng chỉ mà các bạn phải thi mới có thể đạt được sau khi hoàn thành khóa học Advanced Web Attacks and Exploitation (WEB-300). WEB-300 là một khóa học kiểm thử thâm nhập white box cho một ứng dụng web - `white box web app penetration tests`

Khóa học này sẽ dạy cho các bạn:

- Thực hành phân tích sâu mã nguồn của một ứng dụng web được decompiled.
- Tìm kiếm các lỗ hổng về logic mà các tools scan lỗ hổng không thể tìm ra.
- Kết hợp các lỗ hổng một cách hợp lý để tạo ra một `proof of concept` trên ứng dụng web.
- Khai thác các lỗ hổng bằng cách xâu chuỗi chúng thành các cuộc tấn công phức tạp.

Yêu cầu đề học được khóa học này là bạn cần có sẵn một số kiến thức nhỏ nhẹ như này trước thôi.

![Manhnv OSWE](https://manhnv.com/images/posts/oswe/i-passed-OSWE-nguon-goc-va-suc-manh/Screen_Shot_2021-01-29_at_09.42.13.png)

⇒ Về cơ bản nó là thế, các bạn có thể tham khảo khái niệm tại: [https://www.offensive-security.com/awae-oswe/](https://www.offensive-security.com/awae-oswe/)

Khi đăng ký khóa học bạn sẽ được cấp một file pdf tài liệu có hơn 410 trang bao gồm lý thuyết vào hướng dẫn thực hành cho 09 modules về white box và +1 module từ bản cập nhật mới nhất vào tháng 7/2020, đi kèm với đó là các video hướng dẫn bằng tiếng anh cho từng module (Đâu đấy 10 tiếng video thì phải, Tôi lấy thông tin trên trang của `Offensive Security` , Tôi chưa kiểm tra thực tế, vì lúc tải video về đến lúc thi, Tôi xem đúng mỗi video của phần dotnetnuke).

Các phần lý thuyết, thực hành được hướng dẫn cực kỳ chi tiết cũng như các khái niệm có refer đến tài liệu gốc, giúp bạn dễ dàng hơn trong quá trình tìm hiểu khóa học. Các bạn không chỉ được học cách khai thác đơn thuần mà còn được học cách làm sao để bypass waf khi exploit nữa (trong bài thi có bypass waf nhé).

Thử tham khảo [Syllabus](https://www.offensive-security.com/documentation/awae-syllabus.pdf) để biết hơn chi tiết về giáo trình.

## Labs của AWAE có gì?

Khi đăng ký khóa học ngoài việc được cấp tài liệu và video ra các bạn còn được cấp VPN để connect đến hệ thống labs của khóa học. Có 10 máy dành cho 10 modules của khóa học, và 3 máy   `Exercises and Extra Miles` 

Trong đấy:

- 10 máy dành cho modules sẽ có hướng dẫn chi tiết từng bước cho các bạn nắm bắt cách khai thác.
- Trong 10 modules, sau mỗi module sẽ có thêm 1 mục gọi là `Extra miles` để các bạn khai thác tiếp chính module đó, phần này các bạn phải tự làm và không có một hướng dẫn nào hết.
- Ngoài ra còn 3 máy `extra miles` thêm, 3 máy này hoàn toàn không có hướng dẫn, và các bạn phải tự `try harder`.

Thực sự labs của AWAE đang còn quá nghèo nàn, chưa được phong phú, nhưng cũng đủ cho các bạn đau đầu trong quá trình học đấy.

## Tóm lại

Cái hay của OSWE theo Tôi đánh giá: là sẽ hướng dẫn cho bạn cách để tìm ra được các lỗ hổng về logic trong source code của một ứng dụng web, rất hợp cho nhưng bạn theo hướng tìm kiếm 0days. Các bạn sẽ cảm nhận cái sung sướng khi mà tự Tôi tìm ra được một lỗ hổng,  tự viết POC để khai thác dựa trên sự kết hợp nhiều lỗ hổng lại với nhau để tạo ra một exploit hoàn thiện, ta nói nó sướng dã man luôn. Khi làm được như thế, bạn sẽ có cảm giác gì đó sung sướng, lâng lâng, như một vị thần. Vì vậy, nên một số bạn không có ý định thi cert nhưng vẫn có thể tham khảo mua để học vì có thể có những skills mà các bạn đang bị thọt.

Tuy nhiên, một tin buồn dành cho các bạn sắp đăng ký học và thi OSWE là: Từ ngày 01/01/2021,  [Offensive Security](https://www.offensive-security.com/) đã bỏ đi gói có thời gian dùng labs 30 ngày và chỉ còn 2 gói là 60 ngày, 90 ngày. Nhưng cũng vì thế mà những bạn cũng nghèo nghèo như Tôi cảm thấy thật là đau thận khi quyết định vung tiền mua khóa học. Cụ tỉ như sau:

![Manhnv OSWE](https://manhnv.com/images/posts/oswe/i-passed-OSWE-nguon-goc-va-suc-manh/Screen_Shot_2021-01-28_at_16.46.27.png)

# 3. Sức mạnh

## Skills sau khi học có được

Có rất nhiều kỹ năng về tấn công web mà bạn có thể học được trong khóa học này như:

![Manh nv OSWE](https://manhnv.com/images/posts/oswe/i-passed-OSWE-nguon-goc-va-suc-manh/skills.png)

## Quá trình học

Tôi đã dành dụm, chắt chiu tiền để mua khóa học, và thật may mắn khi mà tháng 12/2020 [Offensive Security](https://www.offensive-security.com/)  có đợt sale blackfriday cho khóa học 30 ngày labs còn $999. Tôi đã nhanh trí mua vào ngày 25/12, tuy nhiên thời gian gần nhất để có thể nhận khóa học là sang cuối đến tháng 3, nhưng tôi quyết định thanh toán với lịch là tháng 3. Sau khi thanh toán thành công, có mail xác nhận, tôi dùng chiêu sách đi năn nỉ [Offensive Security](https://www.offensive-security.com/) cho tôi được học sớm hơn. Sau khoảng 5 mail qua lại xin xỏ, trình bày lý do thì [Offensive Security](https://www.offensive-security.com/)  cũng sắp xếp cho tôi nhận khóa học vào ngày 27/01/2021, như vậy là sớm hơn 2 tháng. Tôi muốn được học để thi trước khi nghỉ tết.

Tại đây, ngay trong bài viết này Tôi trân trọng cảm ơn [Offensive Security](https://www.offensive-security.com/) đã tạo điều kiện cho Tôi.

Đây là quả lịch tôi note linh ta linh tinh này =))

![Manhnv OSWE](https://manhnv.com/images/posts/oswe/i-passed-OSWE-nguon-goc-va-suc-manh/note.jpg)

Tôi đã nhận được khóa học vào ngày 27/12/2020 , sau khi nhận khóa học tôi dành ra 1 tuần để đọc tài liệu. Tuy là sau mỗi module sẽ có bài extra miles nhưng tuần đầu tiên tôi không bắt tay làm nó vội, mà chỉ đọc tài liệu để cảm nhận overview thôi. Sau khi cảm nhận được overview, tôi quyết định vào chọn luôn ngày thì là 30/01/2021, vì thấy nó đúng sở trường của Tôi rồi. Thực sự nói là đúng sở trường thế thôi, nhưng đọc đến module dotnetnuke Tôi cũng sợ lắm, vì trước giờ tôi không thích hàng microsoft cho lắm, nên là không tìm hiểu về nó. Tuy nhiên Tôi đã tìm đến 2 video: học c# trong 1 giờ, học .net trong 1 giờ. Học xong vẫn sợ, nhưng Tôi tự tin từ đó đến ngày đăng ký thi tôi sẽ thành thạo khai thác lỗi dotnet.

Sau khi đăng ký ngày thi xong, tôi quyết định `try harder` với 3 máy Extra miles. Hôm đấy là 03/01/2021 - một ngày chủ nhật, Tôi chọn bài đầu tiên là một bài về nodejs, tối hôm đó tôi đã hình dung ra vector bypass authentication rồi, tuy nhiên mãi sáng sớm ngày hôm sau tôi mới thực sự bypass authentication của máy đầu tiên, tôi cảm giác nó cũng dễ dàng. Trên đà chiến thắng, tôi quật luôn RCE được luôn con máy đó, tuy nhiên không dễ tý nào, vì lâu lắm rồi không code nodejs nên tôi phải ngồi đọc lại một số thứ về nó. Nhưng cũng nhanh thôi sáng 05/01/2021 - tức là 3 ngày làm máy đầu tiên thì tôi đã có được RCE. Tôi tự thấy Tôi như thần thánh, nhưng thật sự chỉ là cảm giác sung sướng lúc đó khiến tôi ảo tưởng vậy thôi.

Ngày tiếp theo 06/01/2021 tôi tiến hành làm máy thứ 2, bây giờ là một máy java. Tôi nghĩ thầm, java thì chắc ok rồi, vì tôi từng biết lập trình java nên tôi đặt kỳ vọng là bypass authentication được trong ngày. Nhưng nô nồ nồ nồ, đời không như mỡ, tôi vật vã mãi sang ngày hôm sau mới có thể bypass được, vẫn là mất một ngày nữa. Bypass authen xong thì bước tiếp theo vẫn là đi tìm RCE, đến đây quả là một quá trình gian nan, nó làm Tôi nản chí khi mà mất đến tận 3 ngày, tức là từ ngày 07/01/2021 tới ngày 10/01/2021 mà tôi vẫn chưa thể khai thác được RCE cho máy java. Tôi nản toàn tập, nhưng không thể như thế mà bỏ cuộc được. Nên tôi quyết định tạm gác máy java lại và làm sang máy khác.

Ngày 11/01/2021 tôi làm máy tiếp theo, máy này là một máy blackbox. Tôi phải tìm cách để bypass authen bằng phương pháp blackbox trong khi đang luồng suy nghĩ của whitebox =)) , thật là vật vã quá đi. Thế thì mới gọi là cuộc sống, tôi lại thất bại lần đầu cho máy này sau 3 ngày chọc ngoáy, sau này tôi mới biết là do tôi thọt kiến thức, nên mới miss case, nhưng sẽ là hồi sau. Còn bây giờ, tôi quyết định quay trở lại máy java một lần nữa.

Ngày 14/01/2021, tôi quay lại máy java và thật là vui khi mà cuối ngày hôm đó tôi đã RCE được máy java.

Ngày 15/01/2021, tôi đã liên tục và bypass và RCE được máy blackbox. Đó là một máy python. 

Sau khi quẩy được máy blackbox, chính là lúc tôi đã pass được 3 máy extra miles, mà tất cả là nhờ việc try hard, không có hướng dẫn hay bất cứ hint nào. Thực mà nói, lúc nản với máy blackbox tôi đã đi hỏi hint ở trên diễn đàn, tôi đang bài đàng hoàng, nhưng không ai trả lời =))

Tôi quyết định vào đổi ngày thi, tôi đổi từ ngày 30/01/2021 xuống còn 27/01/2021 tức là sớm hơn 3 ngày, càng tự tin thì tôi lại càng muốn thi sớm, vì tính máu chiến bắt đầu tăng lên.

Tôi tính, từ ngày 16/01/2021 sẽ làm tất cả các bài extra miles sau mỗi module và đọc thật kỹ về deserialize .net, nhưng thật hay khi mà sang tối ngày 19/01/2021 tôi đã hoàn thành hết các phần extra miles, cũng như đã lĩnh hội được dotnet 😅. Các bạn biết gì tiếp theo rồi chứ gì? 

Đúng, lại một lần nữa tôi vào thay đổi lịch thi, bây giờ là sang ngày 23/01/2021, vì bài thi có thời gian 48h và 1 ngày viết report, nên tôi tối ưu chọn ngày cuối tuần để thi vì ngày bình thường còn đi làm ở công ty.

Đăng ký lại lịch thi xong, mấy ngày còn lại là tôi đọc lại tài liệu 1 lần nữa, ghi chép tất cả những câu lệnh, cách cấu hình, cách debug, cách bypass waf, ... ra notes. Và yên tâm ngồi rung đùi chờ ngày thi.

## Quá trình thi

Bài thi có tận 6 yêu cầu cho mỗi 1 bài lận, nhưng Tôi ko thể show ra đây mà chỉ nói sương sương như: Phải có screenshots tất cả các bước bạn tìm ra được lỗ hổng, screentshot nội dung file local.txt và proof.txt, viết 1 poc script duy nhất để khai thác từ đầu đến cuối cho mỗi một bài, .... Các bạn cứ làm đủ yêu cầu của nó là được. 

Như các bạn đã đọc bên trên Tôi bắt đầu bài thi vào  9h sáng ngày 23/01/2021 (dương lịch, ngày thứ 7). Bình thường tôi dậy rất muộn vì cuối tuần, nhưng sáng hôm đấy dậy rõ sớm, đánh răng rửa mặt đi húp bát cháo hành ở chợ. Chuẩn bị tâm lý sẵn sàng lên thớt.

Đúng 8h45h, tôi phải có mặt để làm thủ tục checkin để chuẩn bị cho bài thi, các bạn nhớ chuẩn bị chứng minh thư sẵn sàng, và dọn dẹp bàn ngồi thi cũng như xung quanh thật gọn gàng, tốt nhất là cất hết các đồ dùng như: Điện thoại, máy tính bảng, ... nói chung là các thiết bị mà bạn có thể liên lạc ra bên ngoài phải cất đi, không được dùng đến. Máy tính dùng để làm tốt nhất không mở các phần mềm chat, teamviewer, ...

Sau khi checkin các thứ xong, giám thi xác nhận tôi đủ điều kiện có thể tham gia thi, thì tôi được gửi cho một mail nữa chứa các thứ như: vpn để connect đến bài thi, hướng dẫn, tài khoản đăng nhập, ... Tôi tải về, đăng nhập và xác nhận với giám thi là VPN có thể connected. Từ đó tôi bắt đầu thi.

Họ cũng cấp cho Tôi tất cả là 5 máy: 2 máy debug, 2 máy target, 1 máy kali có thể dùng như là 1 máy attacker thay vì dùng chính máy tính cá nhân.

Vào thi máy đầu tiên, tôi gặp rắc rối khi cố tình debug lên máy target, vì trong quá trình học họ cấp cho máy target và máy debug là 1 máy, nhưng lúc thi là 2 máy riêng biệt, nên đoạn đầu không định hình được, tôi còn mail cho bên support là `Tôi không thể debug được bài thi`. 😑 Bây giờ nghĩ lại mà nó ngu vcd. Tôi mất khoảng 2 tiếng đầu cho việc ngồi cố tìm cách debug con target. Sự ngu dốt phải trả giá bằng tiền bạc là đây.

Đến tầm 11h trưa hôm đó, tôi mới lĩnh ngộ là Tôi chỉ debug trên máy debug thôi, hahaha và lúc đấy tôi mới thực sự vào thi. Thật bế tắc khi mà đến gần 13h chiều, tức là gần 4 tiếng trôi qua, tôi chưa thể tìm ra một vector nào để có thể bypass authen được bài đầu tiên. Tôi quyết định xin break, đi ra chợ làm bát cháo và mua một số đồ ăn vặt về để vừa làm vừa ăn.

Thật may khi hầu như tôi rất nhanh quên mọi thứ nhưng đối với code thì lại nhớ rất dai một source code tôi đã đọc rồi thì tôi hình dung được nó trong đầu luôn, và lúc ăn cháo đầu tôi luôn suy nghĩ đến vector nào có thể khai thác được và vạch ra vài ý trong đầu để lúc nữa quay về thử. Đúng như vậy, 14h chiều tôi có mặt lại phòng và ngồi vào báo với giám thị là Tôi comeback và tiếp tục bài thi. Thật may đúng như những thứ Tôi nghĩ, đến tầm 26h30p chiều ngày hôm đó, vạch ra cách đi cho việc vector bypass authen đầu tiên, nhưng mãi tận 20h44p tối tôi mới hoàn thành được POC đầu tiên và bypass authen thành công, submit flag và xin break gọi nửa con gà Mạnh Hoạch về ăn tạm.

Ăn xong cũng đã 22h tối, Tôi quay lại làm tiếp bài 1 cho phần RCE, thừa thắng xông lên, tôi chỉ mất 1 tiếng để có được RCE lúc đó là 23h đêm. Submit flag viết poc để có thể khai thác từ đầu đến cuối cho bài 1. Viết xong POC đã là 23h30, Tôi nghĩ nên hoàn thành bài thi của Tôi càng sớm càng tốt, để còn dành thời gian xem lại một lượt chụp đầy đủ ảnh còn viết bài cáo, nên tuy khuya rồi nhưng vẫn mở bài 2 lên tiếp tục try hard.

Bài thứ 2 quá là thuận lợi khi mà tầm 3h sáng ngày 24/01/2021 tôi đã có thể bypass authen, tức là mất khoảng 3 tiếng để làm nó.

Sau đó gần 2 tiếng, tức là gần 5h sáng ngày 24/01/2021 tôi đã RCE được máy thứ 2, lúc đấy đã quá mệt, nên tôi submit flag và đi ngủ.

Đi ngủ đâu đấy gần 10h sáng dậy, đánh răng rửa mặt, ăn uống, thong thả và quay lại bài thi để viết poc một cách chỉnh chu và kiểm tra lại screenshots xem còn thiếu bước nào không. 

Bắt đầu viết báo cáo sơ lược để đảm bảo có thể nhớ được những gì Tôi đã làm sau khi hết thời gian thi, cũng như hỗ trợ cho phần báo cáo chi tiết gửi tới `Offensive Security`.

## Viết báo cáo

Đến đây là ngày thứ 3, lúc mà kết nối VPN đến bài thi đã hết thời gian, bây giờ Tôi phải ngồi viết lại báo cáo một cách chi tiết về cách tìm ra lỗ hổng, cách khai thác, cũng như POC có thể chạy để khai thác từng bài. Nói chung là viết report cung cấp tất cả các thông tin trong các yêu cầu của đề thi mà OSWE cho.

Báo cáo phải viết càng chi tiết các bước càng tốt, làm sao để một người không biết gì về kỹ thuật cũng có thể làm lại theo báo cáo 1 cách step by step mà ra được kết quả đúng, thì lúc đó báo cáo của bạn mới được chấp nhận. Đã có trường hợp thi làm được 100% các máy nhưng cũng trượt vì báo cáo không OK rồi đấy, nên các bạn chú ý nha.

Viết xong thì gửi như hướng dẫn của `Offensive Security` là được. Bây giờ là ngồi hồi hộp chờ thông báo passed thôi.

## Tóm lại

Lúc học, các bạn phải notes những gì đã học, đến lúc vào thi mà phải đi search google thì oải lắm =))

![Manhnv OSWE](https://manhnv.com/images/posts/oswe/i-passed-OSWE-nguon-goc-va-suc-manh/Screen_Shot_2021-01-29_at_09.49.20.png)

Các POC script bạn viết cho quá trình làm extra miles thì nên lưu lại một cách dễ nhớ nhất, có thể trong bài thi sẽ dùng tới, nó không phải là sử dụng 100% nhưng nó có thể giúp bạn có được ý tưởng viết POC cho bài thi một cách nhanh nhất.

Bài thi yêu cầu bạn phải kết hợp logic được tất cả các lỗ hổng lại với nhau và viết 1 poc khai thác tất cả các lỗi bằng từ đầu đến cuối trong 1 poc duy nhất bằng: python, c, ... hoặc bất kỳ ngôn ngữ  script nào bạn thành thạo. Nên là bạn nên học thành thạo 1 ngôn ngữ script nào đó để viết POC cho nhanh nha.

Thời gian của bài thi là 48h nhưng Tôi nghĩ nếu các bạn giác ngộ được cách khai thác lỗi dạng whitebox rồi thì 48h thi là quá đủ.Tôi thì cũng chả giỏi dang gì lắm cũng có thể hoàn thành nó trong chưa đầy 26h và thời gian còn lại là dành thời gian cho việc kiểm tra lại POC cũng như screenshots.

Lúc thi phải giữ 1 cái đầu bình tĩnh, nếu ngày đầu tiên chưa làm ra được gì thì nhiều lúc cũng ko cần phải căng thẳng quá, cứ ăn, uống, ngủ, nghỉ thoải mái nhất có thể - cứ như một ngày bình thường thôi. Lúc nào cảm giác tâm trạng tốt thì quay lại thi tiếp. Đừng như Tôi thức đêm thức hôm, từ hôm thi xong đến giờ Tôi ho SML chỉ vì thức xuyên đêm =))

Viết báo cáo phải đủ, chi tiết các bước, để một người khác có thể thực hiện lại và ra kết quả đúng.

# 4. Kết luận

Khóa học rất OK, nên các bạn có ý định học để thi lấy chứng chỉ, cũng như các bạn có hứng thú học để tiếp thu kiến thức mới thì cứ mạnh dạn đăng ký học.

OSWE khó? Tùy quan điểm mỗi người tuy nhiên đối với Tôi ban đầu chưa thi, chưa học thì cũng nghĩ nó khó vì Tôi đọc review thấy toàn bài có cert này cert nọ vẫn tạch, run lắm, sợ lắm, nhưng cũng thi được, thì theo Tôi thấy là bình thường.

Lúc học cố gắng try harder hết tất cả các bài extra miles của AWAE đưa ra, tốt nhất là không bỏ lỡ bài nào, vì có thể phần bạn bỏ lỡ chính là phần bạn sẽ gặp lúc thi. Nhớ lưu lại POC của extra miles đã làm nữa nhé.

Bài thi giống như một cuộc thi chạy marathon, không phải là một cuộc thi chạy nước rút nên các bạn cứ từ từ mà làm, vì trong 48h thi mà OSWE đưa ra, họ đã tính toán cho bạn cả giờ ăn, uống, ngủ nghỉ, sinh hoạt rồi.

Đã có trường hợp làm được bài thi nhưng trượt vì báo cáo, nên phần báo cáo cũng là một phần quan trọng.

Một số trang tài liệu Tôi hay đọc trong lúc học OSWE:

- [https://book.hacktricks.xyz/](https://book.hacktricks.xyz/)
- [https://klezvirus.github.io/Advanced-Web-Hacking/](https://klezvirus.github.io/Advanced-Web-Hacking/)
- ... Tạm thời quên, nào nhớ ra Tôi sẽ update tiếp vào đây

⇒ Thời điểm viết bài, Tôi cũng không thể nhớ hết một số thứ Tôi muốn truyền đạt được, nên là bài viết này Tôi sẽ luôn update nếu như nhớ ra vấn đề gì.

Cuối cùng, cảm ơn các bạn đã đọc bài của Tôi, nếu như các bạn có yêu cầu thì Tôi sẽ viết một phần về cách học như thế nào nữa, nhé nhé.

Đây là bài viết trên blog của Tôi: https://manhnv.com/2021/01/i-passed-oswe-nguon-goc-va-suc-manh-tu-tin-va-su-co-gang/

⇒ Các bạn đọc thấy hữu ích có thể lì xì mình tại đây ạ: https://manhnv.com/donate.html