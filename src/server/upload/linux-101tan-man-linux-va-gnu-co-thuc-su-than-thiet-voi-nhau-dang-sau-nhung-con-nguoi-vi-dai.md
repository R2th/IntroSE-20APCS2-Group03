### **Title có vẻ lạ phải không mọi người?** 

**A:** "Thằng điên này đang trong series học Linux mà mày xàm xí cái gì thế :triumph::triumph::triumph:?"

**B:** "Nó là 2 thành phần cốt lõi trong hệ điều hành bọn tao đang học mà lại còn ko thân với nhau thì làm gì có cái để cho mày tạo series này chứ !!!"

**C:** "Câu hỏi ngu thế, chắc chắn rồi, thế nên hđh mới được gọi là GNU/linux chứ  :thinking::thinking:"
## ...
Rất xin lỗi mọi người vì lâu rồi mình mới tiếp tục ra bài tiếp theo trong series **LINUX 101**. Trong thời gian tìm hiểu ý tưởng và kiến thức để chuẩn bị cho bài viết này, với những gì đã toan tính và lên kế hoạch thì đáng lẽ trong bài này mình sẽ viết về **Shell** - tất cả những thứ cơ bản liên quan đến Shell trong hệ điều hành Linux. Tuy nhiên ..., vâng, chắc chắn rồi sẽ có tuy nhiên, trong vô vàn trang web mà mình đã google được để chuẩn bị cho bài viết này đã có những thông tin **vô cùng, vô cùng thú vị** mà nó đã làm làm mình vô cùng bất ngờ khi lần đầu được nghe đến, biết đến, và mình đã nghĩ rằng chắn chắn đây sẽ trở thành một câu chuyện bên lề thú vị trên series Linux 101, đó cũng là lý do chính vì sao mình có đặt thêm một tag **Tản mạn** bên cạnh tên của series nữa. Và từ nay về sau những bài viết nào trong series LINUX 101 mang tính chia sẻ những câu chuyện bên lề về LINUX mình sẽ đều đặt thêm tag **[Tản mạn]** trên title.

<br>

Quay trở lại với tiêu đề của bài viết,  như đã chia sẻ trong các bài viết trước một hệ điều hành Linux được bao gồm bởi nhiều thành phần trong đó 2 thành phần quan trọng và chính yếu là **Linux kernel** và **GNU**, không thể thiếu một trong 2 nếu như muốn có một hệ điều hành Unix-like hoàn chỉnh. Và chắc chắn mọi người cũng đã biết rằng tạo ra 2 thành phần này là 2 người/nhóm tổ chức khác nhau và họ đã vô tình bắt gặp nhau trên đường đời tấp nập :D để rồi tạo cho ta nền tảng GNU/Linux nguồn mở tuyệt vời như ngày nay. **Chắc hẳn những con người tạo ra chúng phải có chung một niềm đam mê to lớn với lập trình, với mã nguồn mở nên mới có thể kết hợp với nhau ăn ý như vậy? Liệu có phải như vậy hay không? Hay câu chuyện thực sự đằng sau là như nào? Hãy pha một tách trà và cùng mình đi tìm hiểu nhé**


### 1. Ai đứng sau Linux Kernel và GNU?
**Linus Torvalds (28/12/1969)** - chả đẻ của Linux kernel đã quá nổi tiếng trong cộng đồng thậm chí với những người không am hiểu về công nghệ cũng có thể biết đến ông với tư cách là **người tạo ra hệ điều hành Linux**. Linus là nhà khoa học máy tính người Mỹ gốc Phần Lan, có thể bạn chưa biết ngoài việc là người viết ra nhân kernel cho Linux ông còn chính là người đã tạo ra **Git** - hệ thống quản lý phiên bản phân tán phổ biến mà chúng ta sử dụng ngày nay. 

![](https://images.viblo.asia/707e508d-eab5-48f7-9029-269e005a78bd.jpg)

Linus thì rất nổi tiếng rồi nhưng khi hỏi đến GNU mình dám chắc ko có đến 10% số người được hỏi sẽ biết cha đẻ của GNU là ai. GNU được viết ra không bởi một người mà là một tổ chức, đó là **Free Software Foundation (FSF)** - một tổ chức phi lợi nhuận với sứ mệnh  trên toàn thế giới là thúc đẩy quyền tự do của người sử dụng máy tính và bảo vệ quyền sử dụng phần mềm của người dùng. GNU là sản phẩm của **GNU Project**, ,một dự án được thực hiện bởi FSF và người đứng đầu project này cũng là người sáng lập ra FSF - **Richard Stallman**. Ông là nhà khoa học, kỹ sư phần mềm thiên tài người Mỹ,  được coi là giáo chủ của phần mềm tự do, **the last man standing của cộng đồng hacker chân chính**.  Như vậy mọi người có thể hiểu Richard Stallman chính là cha đẻ của GNU nhé, vì điều này có liên quan tới những phần mình sẽ chia sẻ phía dưới.

![](https://images.viblo.asia/34bab7a4-8164-4c67-8585-f9f5f570d168.jpg)
### 2. Trên đường đời tấp nập sao người nỡ đâm sập vào tôi?
Để trả lời cho câu hỏi **tại sao Kernel Linux của Linus Torvalds lại kết hợp với GNU của Richard Stallman** chúng ta cần làm rõ lần lượt từng câu hỏi sau:

<br>

 ##### Tại sao Richard Stallman tạo ra GNU ?
> * Mục tiêu của Stallman khi bắt đầu GNU project là tạo ra một hệ điều hành hoàn chỉnh thay thế cho UNIX và hơn cả nó phải là một hệ thống free software ( free software ở đây nên được hiểu là tự do phần mềm, không phải là phần mềm miễn phí ) hoàn toàn, không phải 95% free, không phải 99,5% free mà là 100% free.

<br>

##### GNU có phải là một hệ điều hành hoàn chỉnh?
> * Như đã nói ở trên mục tiêu của FSF khi phát triển GNU là biến nó thành một hệ điều hành UNIX-like hoàn chỉnh, và tất nhiên, một hệ thống UNIX-like phải bao gồm đầy đủ các thành phần quan trọng: kernel, trình biên dịch (compiler), editors, text formatters, mail software, giao diện đồ họa, các thư viện, games and rất nhiều thành phần khác nữa.
> * Richard và FSF đã hoàn thiện hầu như mọi thứ, bao gồm cả kernel, kernel mà FSF đã viết ra cho GNU được gọi là GNU Hurd ,tuy nhiên kernel này lại hoạt động không hiệu quả và không được cộng đồng lập trình viên hưởng ứng nhiệt tình dẫn đến GNU chưa thể tự mình trở thành một hệ thống hoàn chỉnh như mục tiêu ban đầu của đội ngũ phát triển.

<br>

##### Động lực nào đã khiến Linus viết ra Linux kernel ?
> * Thứ nhất, thời điểm Linus tạo ra Linux kernel là vào năm 1991 ( có tài liệu nói là 1990 ), là 8 năm sau khi dự án GNU bắt đầu (1983), vào thời điểm này hầu như mọi thứ của GNU đã hoàn thiện ngoại trừ kernel.
>  * Cùng khoảng thời gian này, intel đã cho ra đời bộ vi xử lý 80386, đây là vi xử lý x86 đầu tiên với kiến trúc 32bit, Linus đã sở hữu bộ máy tính với con chip 80386 này, tuy nhiên các hệ điều hành và phần mềm thời bấy giờ chưa tận dụng hết được sức mạnh phần cứng và các chức năng của 80386, đo đó Linus đã tự mình làm việc đó bằng việc viết ra một hệ điều hành nho nhỏ với kernel do chính ông viết ( đây là tiền thân của Linux kernel ) + các phần mềm của MINIX (một hệ điều hành UNIX-like khác với mục đích giáo dục ) và GNU.
>  * Trong cuốn sách **Just for fun** của mình Linus đã viết ông viết ra hệ điều hành này chỉ đơn giản là vì sở thích, và tất nhiên nó không thể hoàn thiện và hoành tráng như GNU được.

<br>

##### Hệ điều hành hoàn chỉnh ra đời
> * Kernel của Linus ban đầu đã sử dụng cùng với nhiều phần mềm của GNU và những phần mềm này được release dưới license free software của GNU ( GNU General Public License, viết tắt là GPL). Do đó ông không thể tùy tiện sử dụng chúng mà không chấp thuận với GPL được, đồng ý với GPL đồng nghĩa với việc Linux kernel cũng sẽ trở thành free software.
> * Tháng 12/1992 Linus đã release Linux kernel 0.99 sử dụng GNU GPL. Ông và các dev của GNU đã làm việc với nhau để tích hợp các thành phần của GNU với Linux tạo ra một hệ điều hành free, hoàn thiện và đầy đủ chức năng.
> * Giấy phép chính xác mà Linus sử dụng cho kernel của mình là GPLv2.
### 3. Đối lập về quan điểm
Cùng chung tay vào project GNU/Linux để đến được thành quả như ngày hôm nay nhưng **mục tiêu ban đầu đã thôi thúc mỗi con người bắt đầu** và **cách nhìn nhận, quan điểm của họ về đứa con của chính mình** là **hoàn toàn khác nhau, thậm chí có thể coi là trái ngược.**
* Với Richard Stallman, ông thuộc tuýp người **lý tưởng hóa ( the idealist )** và có phần lập dị - đây là tuýp người có hệ thống giá trị sống mạnh mẽ, có thiên hướng phục vụ, đặt nhu cầu của người khác lên trên nhu cầu của mình. Quả đúng như vậy, cách Richard bắt đầu GNU cũng vì lý do này, ông muốn mọi người đều có thể tiếp cận với máy tính, một chiếc máy tính không thì có ý nghĩa gì, nó phải đi kèm một hệ điều hành free mà tất cả mọi người đều có thể sở hữu và sử dụng. Chính vì vậy một hệ điều hành có cách vận hành sử dụng giống UNIX ( thời điểm đó UNIX vô cùng phổ biến ) nhưng phải free đã được ra đời. **Cho đến các giấy phép, chính sách, license do Richard viết ra cũng thể hiện rõ tư tưởng và lý tưởng sống của ông**, điều này được thể hiện rõ trong GPL - General Public License, nó nhấn mạnh đến sự **Free** của những user sở hữu các phần mềm có giấy phép GPL, cụ thể, có 4 sự tự do sau:
  *   Quyền tự do chạy phần mềm như bạn muốn, bất kể với mục đích gì
  *   Quyền được tự do tìm hiểu cơ chế hoạt động, chỉnh sửa source code theo ý thích.
  *   Quyền tự do  phân phối, chia sẻ lại các bản sao cho bất cứ ai.
  *   Và quyền tự do phát triển phần mềm và phát hành những cải tiến cho cộng đồng, đây chính là lợi ích cho cộng đồng.
* Linus Torvalds lại là con người ngược lại hoàn toàn, trong buổi nói chuyện tại TED với người dẫn Chris Anderson, ông đã chia sẻ khá thẳng thắn về con người ông và cái lý do đã khiến Linus bắt đầu xây dựng Linux. Ông nói rằng mình không phải là người sống vì mọi người, thậm chí còn khá cực đoan trong việc giao tiếp với người khác, ông luôn muốn có những không gian thật riêng tư và yên tĩnh cho riêng mình khi làm việc, và tất nhiên, lý do Linux kernel ra đời cũng vậy, ông ấy làm đơn giản chỉ vì mình, vì sở thích và đam mê với lập trình của mình, mục tiêu ban đầu không bao hám những lý do cao cả như vì cộng đồng mã nguồn mở, vì sự phát triển của nền công nghệ, vì tự do phần mềm, blah blah blah. Và lý do chính khiến ông public nó ra đơn giản chỉ vì muốn có sự comment, phàn hổi vào những dòng code của mình, chỉ vậy thôi.  ( Mọi ngươì có thể xem lại video Linus Torvalds tại TED talk ở link dưới đây )

<br>

{@embed: https://www.youtube.com/watch?v=o8NPllzkFhE}

<br>

* Và tất nhiên, với xuất phát điểm không quá nhiều lý tưởng xa vời, Linus đã đồng ý phát hành kernel của mình dưới giấy phép **GPLv2** mà Richard và FSF đã soạn ra ( và chỉ v2 mà thôi, ko có sau này hay tương tự gì cả ). Vì đơn giản, trong v2 của GPL đã thể hiện tốt quyền bảo vệ sử tự do phần mềm của người dùng, nó tập trung vào cách mà người dùng có thể làm gì với phần mềm. Nhưng với **GPLv3** thì không phải vậy, đây là nhân tố chính đã gây ra mẫu thuẫn giữa Linus và Richards và FSF, cũng là lý do mà đến nay Linux kernel vẫn chỉ sử dụng GPLv2 mà thôi, trong khi đa phần các phần mềm khác đã sử dụng GPLv3 rồi.
 * GPLv3 bổ sung thêm hàng chục điều khoản mà chủ yếu là để ngăn chặn cách các thiêt bị được coi là **Tivoization** sử dụng phần mềm. **Tivoization** là cách gọi chung của Richard Stallman cho những thiết bị phần cứng sử dụng nền tảng GNU/Linux nhưng không cho phép người sử dụng cài các phiển bản phần mềm đã chỉnh sửa vào phần cứng của họ. Richard thì không hề ưa điều này, ông cho rằng chúng đã giới hạn lại quyền tự do phần mềm của người sử dụng và như thế là không thể chấp nhận được đối với ông.
 * Góc nhìn của Linus về những thiết bị **Tivoization** thì hoàn toàn khác, trong bài blog **[Black and white](http://torvalds-family.blogspot.com/2008/11/black-and-white.html)** của ông viết vào 2/12/2008, Linus thể hiện một thái độ phản đối kịch liệt với quan điểm sống của Richard: "tất nhiên ông vô cùng ngưỡng mộ những người dành cả cuộc đời của mình vì đam mê và làm theo những gì mình cho là đúng, tuy nhiên thế giới này không chỉ có trắng và đen, ác quỷ và thiên thần, mọi chuyện đều có vô vàn các góc độ để cảm nhận, phần mềm cũng vậy, **nó không chỉ có tự do và ngược lại**". Bản thân các hãng sản xuất ra các thiết bị Tivoization đã lên tiếng về việc giới hạn quyền cài đặt lên phần cứng của họ, đó là vì nó sẽ ảnh hưởng đến kế hoạch, chiến lược kinh doanh của họ, và tất nhiên Linus ủng hộ điều này.
 * Phản pháo lại việc Linus không chấp thuận với GPLv3, trong một bài báo Richards đã nói rằng: "**Đừng follow Linus nếu như bạn muốn sự tự do**" ( https://www.computerworld.com.au/article/195096/stallman_want_freedom_don_t_follow_linus_torvalds/?)
### 4. Nhưng không chia tay
GNU/Linux là 1 hệ thống tồn tại dựa vào nhau, tách riêng chúng ra sẽ chẳng có gì là ý nghĩa cả, cộng với GNU không thể phát triển tiếp kernel Hurd của mình, đây có lẽ là những lý do chính mà đến nay GNU vẫn được sử dụng cùng kernel Linux, câu trả lời dành cho những bạn nào thắc mắc sao Linus Torvalds và Richard Stallman không đường ai nấy đi :D.
### 5. Lời kết
Đến đây có lẽ đã quá dài dòng rồi,  mình rất cảm ơn những bạn nào chăm chỉ đọc đến tận đây, hi vọng qua bài viết này mọi người sẽ có một cái nhìn toàn cảnh hơn về lịch sử của GNU/Linux, về những con người vì đại đằng sau nó ( Đừng gọi là Linux không nhé mọi ng, GNU/Linux mới là chuẩn men ).
### 6. Tham khảo
1. https://www.gnu.org/gnu/gnu-linux-faq.html
3. http://torvalds-family.blogspot.com/2008/11/black-and-white.html
4. https://www.computerworld.com.au/article/195096/stallman_want_freedom_don_t_follow_linus_torvalds/?
5. https://en.wikipedia.org/wiki/History_of_Linux
6. https://en.wikipedia.org/wiki/Tivoization
7. https://en.wikipedia.org/wiki/Linus_Torvalds
8. https://en.wikipedia.org/wiki/Richard_Stallman