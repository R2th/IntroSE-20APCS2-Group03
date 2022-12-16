![](https://images.viblo.asia/a7297fa4-4e52-4147-a83f-e446c2617a2a.jpg)
# Vô nào
Chuyện là thế này các bác ạ! Đã gần đến cái giờ thiên (8h00 ngày 22 hàng tháng) mà vẫn chưa có một ý tưởng nào cho bài study report tháng này. Em là em sợ đủ thứ nên mới google tìm cho mình một vài ý tưởng hay, hay cực :D

Đầu tiên, định viết về Laravel rồi ấy chứ, nhưng mà biết viết cái gì đây. Cả tháng research đủ kiểu, đủ mọi thể loại nhưng gộp lại chưa đủ để mần thành bài viết. Nhớ không nhầm thì cả tháng nay mần js nhiều nhứt, thế thì chuyển qua js xem thử có gì để viết không.

Tự nhiên, ở đâu lòi ra ECMAScript trên google khi research Javascript. Vài chục phút trước khi tìm hiểu ECMAScript, Javascript và viết bài này thì mình hiểu ECMAScript, Javascript là một, chỉ là người ta thích gọi gì thì gọi thôi (không chắc cho lắm).

Thế là lao đầu tìm hiểu thử. Mới đầu chưa có ý định sẽ viết một bài liên quan đến ECMAScript và Javascript như thế này đâu, chẳng qua là tìm để thỏa cái ham muốn cá nhân thôi :D

# Vô sâu thêm tý nữa
Nếu như lúc search google, hàng tá kết quả mà trùng khớp với nhau thì không đến nỗi phải viết bài này. Cơ mà đọc từng bài nói về ECMAScript, JavaScript thì mỗi bài nói mỗi kiểu, chắc là mỗi người hiểu mỗi kiểu nên mới viết vậy đấy :D

Tình cờ, gặp anh chàng Michael Aranda trên freecodecamp, cũng bàng hoàng khi tìm hiểu về vấn đề này và cũng có đưa ra ý kiến cá nhân về nó. Thấy anh ấy với mình thần giao cách cảm hay sao mà lại hiểu về ECMAScript và JavaScript giống nhau như vậy nên quyết định nghe theo anh ấy luôn :) (tý nữa dẫn link tham khảo sau nhé)
# Tý nữa
![](https://images.viblo.asia/24a60ba1-05c1-4f30-8a57-0c186e197983.jpg)

"ECMAScript đòi làm gà, vậy Javascript tình nguyện làm trứng". Tại sao vậy? Mình không biết đặt tiêu đề gì sốc sốc cho bài viết này nên đành để cái tên tạm bợ như vậy. Các bạn có thể đề xuất cho mình một tên hay thiệt hay ở phần bình luận nhé.

Chắc hẳn bạn đã nghe câu chuyện về con gà và quả trứng rồi nhỉ. Liệu "gà có trước hay trứng có trước?". Tại sao mình lại liên hệ ECMAScript và JavaScript với gà và trứng chứ. Ắt hẳn phải có nguyên nhân...

--

**Mọi thứ bắt nguồn từ sự ra đời của JavaScript và ECMAScript.**

Ngày xửa ngày xưa, khi mà khái niệm ECMAScript chưa tồn tại trên thế gian này thì Brendan Eich của Netscape đã viết ra một đặc tả ngôn ngữ kịch bản. Nó có tên là Mocha (cà phê). Sau đó được đổi tên thành LiveScript và cuối cùng là JavaScript (Lúc này JavaScript chưa công bố đâu).

Đến tháng 12/1995, Sun Microsystems và Netscape công bố JavaScript. Rồi tháng 3/1996, trình duyệt Netscape Navigator 2.0 ra đời, hỗ trợ Javascript. Sau đó, Microsoft ra mắt một ngôn ngữ tương tự tên là JScript để cạnh tranh và tránh vấn đề bản quyền. JScript được thêm vào trong Internet Explorer 3.0 và ra mắt vào tháng 8/1996 (Đoạn này nói thêm thôi :))

**Thế là JavaScript ra đời rồi đó. Vậy JavaScript là gà hay là trứng?**

Chắc cỡ đầu năm 1997, Netscape chuyển Javascript tới ECMA International để làm công tác chuẩn hoá và viết đặc tả (Nhằm để viết ra cái thứ gọi là ECMAScript ý mà).

Tháng 6/1997, một đặc tả thứ 262 (ECMA-262) được viết cho JavaScript có tên ECMAScript được hình thành từ sự thoả thuận giữa những công ty đang tham gia vào quá trình chuẩn hóa. (Cứ hiểu ECMA-262 là một đặc tả trong danh sách nhiều bộ đặc tả về công nghệ của tổ chức ECMA, còn ECMAScript là tên của đặc tả cho JavaScript kia được viết tại ECMA-262)

Tham khảo thêm:
+ ECMA-262: https://www.ecma-international.org/publications/standards/Ecma-262.htm
+ ECMAScript: https://en.wikipedia.org/wiki/ECMAScript

Vậy tóm lại, ECMAScript là đặc tả được định nghĩa trong ECMA-262 nhằm mục đích tạo ra tiêu chuẩn cho ngôn ngữ Script nói chung. ECMAScript cung cấp một bộ các quy tắc, đặc tả và hướng dẫn mà bắt buộc các ngôn ngữ script phải theo dõi và cân nhắc trong quá trình được triển khai nếu các tác giả của các ngôn ngữ này muốn được công nhận là phù hợp với tiêu chuẩn ECMAScript.

**Đến lúc loạn não**

ECMAScript được định nghĩa là vậy, thế thì JavaScript là gì?

JavaScript là một ngôn ngữ Script đã được triển khai dựa vào các chỉ dẫn trong tài liệu ECMAScript. JavaScript chính là một biến thể của ngôn ngữ ECMAScript. Các lập trình viên tạo nên Javascript đã dựa vào tiêu chuẩn của ECMAScript để tạo ra, cập nhật và phát triển ngôn ngữ này. Như vậy, chúng ta có thể đi đến kết luận, nếu chúng ta đọc đặc tả trong tài liệu ECMAScript, chúng ta sẽ biết cách tạo ra một ngôn ngữ Script. Nhưng nếu chúng ta đọc tài liệu JavaScript, chúng ta sẽ biết được cách để sử dụng một ngôn ngữ script mà thôi.

Và, nói thêm thế này. JavaScript vượt trội hơn ECMAScript bởi các lập trình viên có thể bổ sung một số hàm, thư viện chưa có sẵn trong đặc tả. (Nói chung có thể hiểu là phát triển lên từ bản gốc)

--

**Ngay từ đầu nói rằng lúc ECMAScript chưa tồn tại thì JavaScript đã ra đời**

**Rồi lại nói ECMAScript ra đời là một tiêu chuẩn để viết những ngôn ngữ Script như JavaScript**

**Cuối cùng lại hack não khi bảo JavaScript được triển khai dựa trên ECMAScript**

# Ra được rồi
Nếu bạn để ý kỹ một tý thì "ra được rồi" đấy. Thực tế thì JavaScript được tạo ra đầu tiên, Netscape đã đưa JavaScript đến ECMA để viết ra ECMAScript, giống như đã một bài văn hoàn chỉnh, từ bài văn đó đi ngược lại, viết ra cái dàn bài để sau này phát triển version của dàn bài ấy vậy.

Khi ECMAScript được viết ra rồi, người ta giao kèo với nhau rằng nó sẽ trở thành cái chung để từ đây tạo ra các Script khác. Và thế là kể từ đó, khi ECMAScript nâng cấp lên phiển bản mới, ra tính năng mới thì JavaScript chạy theo, lúc này JavaScipt thành ra lại ra đời sau ECMAScript.

**Tóm tại, ECMAScript được xây dựng dựa trên JavaScript và JavaScript cũng được xây dựng dựa vào ECMAScript**

**Thế nên ECMAScript đòi làm gà, thì Javascript tình nguyện làm trứng, còn ECMAScript buồn buồn muốn làm trứng thì JavaScript đành phải làm gà**

Các bạn có thể tham khảo thêm từ bài viết của lão [Michael Aranda trên freecodecamp](https://medium.freecodecamp.org/whats-the-difference-between-javascript-and-ecmascript-cba48c73a2b5)

À, ngoài ra nếu có hứng thú về mấy khái niệm thế này, các bạn có thể tìm hiểu thử ECMAScript 6, Babel, V8, SpiderMonkey, Chakra (Naruto :D),... Cũng loạn loạn lắm đấy :)