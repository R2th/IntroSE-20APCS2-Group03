# Đứng top thì phải gáy lên cái đã.
![](https://images.viblo.asia/aa1fb2bb-f79f-4ebd-9410-c0924851c4bb.png)
*Phú Nguyễn trong danh sách top kia cũng là đệ tui nha :D*

# Ngày xửa ngày xưa...
Tuần trước, đâu đó thứ 3, mình bị đồng nghiệp cà khịa xúi làm Viblo Code -- cụ thể là họ đã nói gì thì mình cũng quên rồi :D Là một người có cái tôi khá lớn và độ tập trung vô cùng nhỏ, sau một tuần tôi đã vượt hết top để đem lại vinh quang (ảo) cho team AI. Nghe bên Cybersec xì xào cũng vui phết :D

Nếu các bạn chưa biết Viblo Code là gì, thì để mình quảng cáo nhé: đây là một platform cho mọi người làm các bài lập trình. Các bài đó xếp rank từ S / A / B / C / D / E theo thứ tự dễ dần, mỗi bài nếu làm đúng hết các test case sẽ cho một số điểm tương ứng. Nếu làm đúng hết trong lần đầu tiên trong thời gian cho phép sẽ được một cái cúp trong profile -- tuy nhiên đó là team Viblo quảng cáo chứ tôi làm được hoài mà profile có cái cúp nào đâu??? Trang này cũng khá giống HackerRank hay 2 tỉ các trang tương tự khác, tuy nhiên có một vài điểm nhấn tạo ra sự khác biệt:
- trang web được làm bởi Việt Nam (cụ thể là Sun-Asterisk Inc.)
- đề bài được biết bằng tiếng Việt (đồng thời cũng được dịch tiếng Anh song ngữ với chất lượng dở gấp ba Google Translate)
- ít người dùng nên dễ lên top
- ít đề bài nên khó lên điểm
- team cybersec pentest ~~lên thẳng prod server~~ nên nhiều lúc code không chạy/sandbox escape/etc

*đính chính: team Cyber đã thanh minh rằng do được một bạn báo một DoS exploit, họ test bug trên server code-staging, và không hiểu sao server prod vẫn đứt. vì vậy, các bạn hãy chuyển qua blame team Viblo Code :D*


# Cảm nhận chung
Ngoài những bug/features đã nếu trên ra, trang web xài cũng khá ổn định. Giao diễn dễ xài, tuy nhiên cái navbar không chuột phải được :D Mục đề bài và online IDE khá giống với Codecademy, và đó không phải là một điều xấu. Không có trang status nên lúc bị đánh sập là không biết lúc nào mới leo rank lại được.

Đề bài khá phong phú và hay ho trong tất cả các hạng mục rank. Hệ thống điểm và xếp hạng khá cuốn hút người chơi tham gia (mình là một nạn nhân điển hình). Ngoài ra, trong bài này tôi sẽ kể về cuộc hành trình này mà cố gắng không để lộ ra thông tin về bài tập nào cả, theo đúng quy định được đặt ra cho người chơi.

### Bài ghét nhất: [Huy Chat Pro](https://code.viblo.asia/challenges/ZA15r4Ko2x7) - rank D.

Cái tên bài đó đã nói lên tất cả những gì bạn cần biết về bài đó: bug quá nhiều và tên kém sang.

Đề bài cũng khá là đơn giản và tiêu chuẩn, tuy nhiên có lẽ ở rank E sẽ hay hơn. Tuy nhiên, nếu chỉ có đó thôi thì tôi cũng không ghét bài này làm gì. Bài đó ví dụ loạn tùm lum, khi nhìn input string bị dài hơn thực tế! Ban đầu tôi tưởng đó là `\0` null terminator, tuy nhiên lại không phải. Tôi tưởng tôi phải validate input, đương nhiên cũng không phải. Tôi sẽ bật mí cho các bạn luôn: trong input của họ có `\r` và `\n` mọi lúc mọi nơi! Chưa kể, có chỗ bạn phải bỏ và có chỗ bạn phải tính đám ký tự đó không theo một luật lệ gì cả. Các bạn có thể hiểu tôi bực như thế nào khi tôi phát hiện ra thói quen "tốt" của tôi khi xài `.strip()` ở mỗi input lại làm hại tôi trong bài này.

### Bài thích nhất: [Master Math](https://code.viblo.asia/challenges/3RabnKPJZyj) - rank S.

Bài này thực sự khó, tuy nhiên làm rất thích. Tôi đã phải gồng cuộn những cơ bắp thuyết số mà tôi đã không dùng 3 năm nay để làm bài này, và nó không uổng một chút nào cả. Tuy nhiên, cũng phải nói rằng tôi rất thích học thuyết số, chẳng qua dòng đời đưa đẩy vào con đường AI thôi, nên ¯\\\_(ツ)_/¯ nếu bạn không thích thì cũng bình thường thôi à.

# Tip leo rank
Ban đầu ego mình to, cứ thích đâm đầu vào rank S cơ :D Sau đó nản quá phải đi leo rank tử tế.
- Hệ thống điểm bây giờ chưa được cân lắm, nên làm các bài rank thấp sẽ lên điểm rất nhanh. Các bài đó số điểm không quá cao, nhưng so với thời gian cần thiết để thực hiện các bài đó thì không thấp chút nào!
- Chọn các bài có nhiều người làm được mà làm. Phần trăm người làm được càng cao thì bài đó càng dễ.
- Các bài rank thấp hơn thường không có mẹo. Đừng viết algo bruteforce, nhưng cũng hãy viết các algo $O(n^3)$ hay $O(n^4)$ thoải mái. Thậm chí, các thuật toán cơ bản lại thực hiện tốt hơn những thuật toán hoa mỹ bạn có thể xài!
- Rất nhiều bài giải thuật Dynamic Programming từ rank C trở lên. Hãy ôn luyện kỹ phần đó.
- Rất nhiều bài xài toán là chủ đạo từ rank B trở lên. Nếu bạn chỉ biết gõ phím thì tôi chúc bạn may mắn.
- Ban đầu hãy thử làm bài bằng Python (hoặc Ruby, JS, các ngôn ngữ scripting), vì nó nhanh. Nếu thời gian là vấn đề (code của bạn bị `kill -9` vì chạy quá lâu), hãy thử viết lại bằng các ngôn ngữ nhanh hơn (C/C++). Nếu thời gian vẫn là vấn đề (thường xảy ra trong các câu rank B trở lên), thì thuật toán của bạn đang chậm quá và bạn cần xem lại/viết lại toàn bộ.
- Nếu bạn chỉ đang fail vài test case thôi, thì hãy nghiên cứu các edge cases. Nếu bị Failed (làm sai), hãy đặt một cái `if`. Nếu bị Killed (chạy lâu quá), hãy đặt thêm một cái `if` nữa. Những ví dụ được đưa ra thường là những ví dụ cạnh được thiết kế chỉ để fail bạn thôi. Suy cho cùng thì AI cũng chỉ là các dòng `if` nên đừng ngại làm bài giải của bạn thông minh lên một tí :D
- Đừng ngại hardcode nếu cần thiết. Tôi đã từng dạy Python ở cao học, và tôi biết rằng hardcode là một điều thường không ai ủng hộ. Tuy nhiên, thứ nhất là bạn có hardcode thì cũng không qua được hidden test cases đâu, và thứ hai là cache các kết quả có sẵn không sai về mặt tối ưu hoá phần mềm. Nếu không thì [Fast Inverse Square Root](https://en.wikipedia.org/wiki/Fast_inverse_square_root) sinh ra để làm gì? (và nếu không thì cũng không có các đồ hoạ game đẹp mắt như bây giờ đâu.)
- Giữ cái đầu lạnh và con tim nóng. Quan trọng nhất là phải đẹp trai, rank rủng hay trải nghiệm hay kiến thức chỉ là phụ!

# Vậy bây giờ sao nữa đây?...
Người ta bảo phải biết dừng lúc còn đang ở trên đỉnh, thế nên cuộc chơi của mình sẽ kết thúc ở đây. Sau 1 tuần từ 1 account mới tinh đã xếp đầu tất cả các bảng xếp hạng, tôi không có gì để nói ngoài quote từ một HoN/Dota player đã từng nổi tiếng:

> "[Get on my level hoe.](https://www.youtube.com/watch?v=U0nX3BYNOUY)" - MoonMeander

Tiếp theo là gì nữa đây? [Viblo CTF](https://ctf.viblo.asia/) vừa ra (chắc các bạn đã biết sau khi Viblo cho một cái noti to đùng trên cùng website :D), chắc qua đó vào mục crypto luyện lại trình thuyết số thôi :D

***Update: đã tryhard CTF, bài gáy ở [đây](https://viblo.asia/p/tet-va-ctf-va-khat-vong-dung-tren-dinh-gAm5y8Akldb) :P.***

*nếu có comment, thắc mắc, hay nhu cầu giới thiệu thêm về các thuật tuán, các bạn có thể comment dưới đây :D mình ban đầu định giới thiệu sơ qua về giải thuật Dynamic Programming, tuy nhiên sợ xài ví dụ liên quan đến đề bài thật trong Viblo Code, và đồng thời sợ lan man vì cũng không phải là chủ đề chính của bài này, nên lại thôi.*