## Quan điểm sai lầm và các vấn đề

Một trong những vấn đề lớn nhất mà nhiều người dùng và lập trình viên vẫn trải qua hàng ngày là:

### Tại sao văn bản của tôi lại là một đống hổ lốn như vậy?

```
ÉGÉìÉRÅ[ÉfÉBÉìÉOÇÕìÔÇµÇ≠Ç»Ç¢
```

Nếu bạn mở một văn bản và nó trông giống như thế này, chỉ có 1 và duy nhất 1 lí do: Text editor, browser, word processor hay bất cứ cái gì bạn dùng để mở văn bản đang dùng sai encoding. Vậy thôi. Văn bản đó không bị hỏng (à cũng có trường hợp nó bị, hãy xem ở dưới), bạn không cần phải thực hiện một nghi lễ ma thuật cổ đại nào cả, bạn chỉ cần chọn đúng encoding để văn bản được giải mã đúng mà thôi.

Văn bản tưởng tượng nói trên có chứa chuỗi bit dưới đây:

```
10000011 01000111 10000011 10010011 10000011 01010010 10000001 01011011
10000011 01100110 10000011 01000010 10000011 10010011 10000011 01001111
10000010 11001101 10010011 11101111 10000010 10110101 10000010 10101101
10000010 11001000 10000010 10100010                    
```

Giờ thì hãy đoán xem, chúng ta nên dùng encoding nào? Nếu bạn vừa thở dài và lắc đầu, thì đúng đấy, bố ai mà biết được?

Giờ thì hãy nghĩ chậm lại và thử phân tích kỹ hơn nào. Nó có thể là ASCII chăng? Ờm, phần lớn các byte trong chuỗi này đều bắt đầu bằng bit `1`. Nếu bạn còn nhớ, thì ASCII không dùng đến bit này. Vậy thì nó không phải là ASCII. Vậy còn UTF-8 thì sao? Ờm, cũng không nốt, hầu hết các chuỗi này không hợp lệ với UTF-8. Hãy thử "Mac Roman" nào (một encoding khác cho người châu Âu). Ồ, tất cả các byte này đều hợp lệ với Mac Roman. `10000011` được liên kết với "É", `01000111` thành "G",... Nếu bạn đọc chuỗi bit trên bằng Mac Roman, kết quả ta có sẽ là `ÉGÉìÉRÅ[ÉfÉBÉìÉOÇÕìÔÇµÇ≠Ç»Ç¢`. Nhìn nó giống tiếng người không nhỉ? Không? Có? Có thể? Ừ, làm sao mà máy tính biết được? Có thể ai đó thực sự muốn viết `ÉGÉìÉRÅ[ÉfÉBÉìÉOÇÕìÔÇµÇ≠Ç»Ç¢`. Theo kiến thức ít ỏi của tôi thì đó có thể là một chuỗi DNA. Trừ khi bạn có ý hay hơn, hãy kết luận đây là một chuỗi DNA, văn bản này đã được encode bằng Mac Roman và thế là chúng ta xong việc.

![](https://images.viblo.asia/a9b4a323-5661-40cb-83b0-07875ff7c9e5.png)

Tất nhiên, tôi chỉ đang đùa thôi. Đáp án đúng đó là văn bản này được encode bằng Japanese Shift-JIS và nên được giải mã thành `エンコーディングは難しくない`. Ờm, bố ai mà biết được?

Nguyên nhân chính dẫn đến văn bản hiển thị sai đó là: Một người nào đó đang cố để đọc một chuỗi byte bằng encoding sai. Máy tính luôn cần được biết văn bản này được encode bằng encoding scheme nào. Ngoài ra thì nó không biết được. Có nhiều cách khác nhau để nhiều loại văn bản khác nhau có thể chỉ định nó sử dụng encoding nào và chúng ta nên tuân thủ những cách đó. Một chuỗi bit luôn là một cái hộp bí ẩn, chúng có thể mang bất cứ một ý nghĩa nào.

Hầu hết các trình duyệt cho phép chúng ta chọn encoding để sử dụng bằng cách vào menu View và chọn "Text Encoding", nó sẽ làm cho trình duyệt giải mã lại trang web bạn đang xem bằng encoding vừa chọn. Nhiều phần mềm khác thì cung cấp menu "Reopen using encoding...", hoặc có thể một option "Import..." để chúng ta có thể tự chọn encoding bằng tay.

### Văn bản của tôi vô nghĩa ở mọi loại encoding!

Nếu một chuỗi bit không mang ý nghĩa gì (với con người) ở mọi loại encoding, văn bản đó nhiều khả năng đã bị convert sai ở một thời điểm nào đó. Giả sử chúng ta lấy đoạn text ở trên `ÉGÉìÉRÅ[ÉfÉBÉìÉOÇÕìÔÇµÇ≠Ç»Ç¢` và lưu nó dưới dạng UTF-8. Text editor của bạn cho là nó đã đọc đúng đoạn text được encode bằng Mac Roman và giờ thì bạn muốn lưu text này dưới một encoding khác. Dù sao thì tất cả các ký tự trên đều là ký tự Unicode hợp lệ mà. Điều đó có nghĩa là trong Unicode có một code point để thể hiện "É", một để thể hiện "G", vân vân. Nên chúng ta có thể lưu text này dưới dạng UTF-8 và cả nhà đều vui:

```
11000011 10001001 01000111 11000011 10001001 11000011 10101100 11000011
10001001 01010010 11000011 10000101 01011011 11000011 10001001 01100110
11000011 10001001 01000010 11000011 10001001 11000011 10101100 11000011
10001001 01001111 11000011 10000111 11000011 10010101 11000011 10101100
11000011 10010100 11000011 10000111 11000010 10110101 11000011 10000111
11100010 10001001 10100000 11000011 10000111 11000010 10111011 11000011
10000111 11000010 10100010                             
```

Đây là chuỗi bit UTF-8 thể hiện cho đoạn text `ÉGÉìÉRÅ[ÉfÉBÉìÉOÇÕìÔÇµÇ≠Ç»Ç¢`. Đáng tiếc là đoạn bit này lại chả có liên quan gì đến văn bản ban đầu cả. Dù cho chúng ta có mở nó bằng loại encoding nào thì chúng ta cũng sẽ không bao giờ lấy được đoạn text đúng là `エンコーディングは難しくない` từ nó cả. Văn bản này đã hỏng hoàn toàn. Thật ra vẫn có khả năng để lấy được đoạn text đúng nếu chúng ta biết được văn bản mã hoá bằng Shift-JIS đã bị hiểu sai thành Mac Roman và sau đó lưu dưới dạng UTF-8, từ đó ta có thể làm ngược lại để được kết quả đúng. Nhưng đó chỉ là trong trường hợp bạn cực kỳ may mắn thôi.

Có nhiều trường hợp mà một chuỗi bit nhất định nào đó không hợp lệ với một encoding nhất định. Nếu chúng ta thử mở văn bản trên bằng ASCII, một vài byte sẽ hợp lệ trong ASCII và được thay thế bằng ký tự thực, nhưng một số khác thì không. Chương trình mà bạn dùng để mở văn bản có thể quyết định là âm thầm loại bỏ những byte không hợp lệ với encoding mà bạn đã chọn, hoặc có thể thay nó bằng `?`. Unicode còn có một ký tự được gọi là "Ký tự thay thế của Unicode" � (U+FFFD) mà một chương trình có thể dùng để thay thế cho những ký tự không thể decode được khi xử lý bằng Unicode. Nếu một văn bản được lưu với những ký tự bị xoá hoặc thay thế như trên, những ký tự đó đã mất đi vĩnh viễn và không hề có một cách nào để phục hồi cả.

Nếu một văn bản được xác định và convert thành một loại encoding khác, nó sẽ bị hỏng. Cố gắng để "sửa" nó có thể hoặc không thể thành công, nhưng thường thì là trường hợp sau. Bất cứ một nỗ lực nào trong việc dịch bit hay thực hiện các ma thuật mã hoá cũng chỉ tổ tốn thời gian. Nó giống như việc cố gắng để chữa bệnh cho một bệnh nhân đã chết vậy.

### Vậy thì làm thế nào để xử lý encoding cho đúng?

Đơn giản thôi: Biết được một đoạn text - hay một chuỗi byte - được mã hoá bằng encoding nào, và sau đó đọc nó ra bằng encoding đó. Đó là tất cả những gì bạn phải làm. Nếu bạn đang phát triển một ứng dụng cho phép người dùng nhập text, hãy chỉ định là bạn chấp nhận encoding nào. Với các loại text field, thường thì lập trình viên sẽ quyết định encoding cho chúng. Với các loại file có thể được upload bởi người dùng hay import vào chương trình, cần có những chỉ dẫn rằng file đó nên sử dụng encoding nào. Theo cách khác, người dùng cần có một cách nào đó để thông báo cho chương trình biết rằng cần sử dụng encoding nào đối với file này. Thông tin này có thể là một phần của chính file format, hoặc có thể là lựa chọn encoding từ phía người dùng (tất nhiên là hầu hết người dùng sẽ không biết, trừ khi họ đã đọc bài viết này).

Nếu bạn cần phải convert từ một encoding sang một encoding khác, hãy sử dụng những phần mềm chuyên biệt dành cho việc đó. Convert giữa các encoding là việc so sánh 2 code page và quyết định rằng ký tự 152 trong encoding giống với ký tự 4122 trong encoding B, sau đó thay đổi bit tương ứng. Bạn không cần phải phát minh lại cái bánh xe bởi vì mọi ngôn ngữ lập trình phổ biến hiện nay đều cung cấp các cách thức để convert text từ encoding này sang encoding khác, giúp cho bạn không cần phải nghĩ đến code point, code page hay bit gì cả.

Giả sử, app của bạn *phải* chấp nhận những file được upload lên dưới dạng GB18030, nhưng bên trong bạn lại xử lý dữ liệu bằng UTF-32. Một công cụ như iconv sẽ giúp bạn convert file đó chỉ bằng một lệnh duy nhất như `iconv('GB18030', 'UTF-32', $string)`. Nó sẽ giữ lại các ký tự trong khi thay đổi các bit ở tầng dưới?

Đó là tất cả những gì nó làm. Nội dung của string, hay nói cách khác, các ký tự mà con người có thể đọc hiểu được, không thay đổi, nhưng giờ thì nó lại là một string UTF-32 hợp lệ. Như đã nói ở phần trước, không phải encoding scheme nào cũng có thể thể hiện tất cả mọi ký tự. Sẽ là bất khả thi nếu bạn muốn encode ký tự "縧" bằng bất cứ encoding scheme nào của các ngôn ngữ châu Âu.

## Unicode All The Way

Chính xác là bởi vì thế, gần như không có một lí do nào ở thời đại hiện nay để chúng ta không hoàn toàn sử dụng Unicode cả. Một vài encoding chuyên biệt có thể có hiệu quả hơn Unicode đối với một vài ngôn ngữ. Nhưng trừ khi bạn đang lưu trữ cả terabytes của những văn bản chuyên biệt như thế (rất nhiều đấy), chả có lí do gì mà bạn phải lo cả. Những vấn đề phát sinh từ những encoding không tương thích làm chúng ta đau đầu hơn nhiều so với việc lãng phí một vài gigabyte thời nay. Và điều đó sẽ càng ngày càng đúng bởi vì storage và bandwidth đang ngày một lớn hơn và rẻ hơn.

Nếu hệ thống của bạn cần phải làm việc với các encoding khác, convert chúng thành Unicode khi nhận input và convert ngược lại khi output nếu cần. Ngoài ra, hãy chú ý rằng bạn đang xử lý encoding nào ở thời điểm nào và chỉ convert nếu dữ liệu không có khả năng bị hư hại.

## UTF-8 và ASCII

Một trong những điểm hút khách của UTF-8 là nó tương thích hoàn toàn với ASCII, encoding cơ sở cho tất cả các encoding khác. Mọi ký tự có trong ASCII đều chỉ cần đến 1 byte trong UTF-8 và nó cũng có giá trị y như trong ASCII. Nói cách khác, mọi ký tự trong ASCII đều được bê nguyên vào UTF-8. Những ký tự không có trong ASCII sẽ mất 2 byte hoặc nhiều hơn trong UTF-8. Đối với hầu hết các ngôn ngữ lập trình có khả năng đọc ASCII, bạn có thể đưa trực tiếp text UTF-8 vào chương trình của bạn luôn:

`$string = "漢字";`

Lưu nó lại dưới dạng UTF-8 sẽ cho chúng ta chuỗi bit sau:

```
00100100 01110011 01110100 01110010 01101001 01101110 01100111 00100000
00111101 00100000 00100010 11100110 10111100 10100010 11100101 10101101
10010111 00100010 00111011
```

Chỉ có byte từ 12 đến 17 (những byte bắt đầu bằng 1) là các ký tự UTF-8 (2 ký tự, mỗi ký tự 3 byte). Tất cả các ký tự xung quanh đều là ASCII. Một parser sẽ đọc nó ra như sau:

```
$string = "11100110 10111100 10100010 11100101 10101101 10010111";
```

Đối với parser, mọi thứ đứng đằng sau dấu ngoặc kép chỉ là một chuỗi byte mà nó sẽ để yên như vậy cho đến khi gặp được một dấu ngoặc kép khác. Nếu bạn chỉ đơn giản output chuỗi byte này ra, bạn đang output ra text UTF-8. Không cần phải làm thêm gì cả. Các parser cùi có thể support Unicode thông qua cách đó mà không cần phải tự support Unicode. Tuy vậy thì hầu hết các ngôn ngữ hiện đại ngày nay đều ý thức được một cách rõ ràng về Unicode (Unicode-aware).

## Ngôn ngữ lập trình ý thức được encoding

Thế một ngôn ngữ support được Unicode có nghĩa là gì? Ví dụ, Javascript có support Unicode. Thật ra, mọi string trong Javascript được mã hoá bằng UTF-16. Thật ra, đó là encoding duy nhất mà Javascript sử dụng. Bạn không thể có một string trong Javascript mà không được mã hoá bằng UTF-16. Javascript sùng bái Unicode đến mức không có một chút hỗ trợ nào cho việc sử dụng các encoding khác trong core của nó. Do Javascript thường thì được chạy trong các trình duyệt, điều đó không thành vấn đề, vì trình duyệt có thể tự xử lý việc mã hoá và giải mã các input và output.

Các ngôn ngữ khác thì chỉ đơn giản là *ý thức* được về encoding. Về xử lý ở tầng dưới thì chúng lưu string bằng một encoding cụ thể nào đó, thường thì là UTF-16. Đổi lại chúng cần có thông tin về encoding hoặc thử tự xác định ra encoding với những thứ liên quan đến text. Chúng cần phải biết source code này được lưu bằng encoding nào, file này nên được đọc ra sử dụng encoding nào, hay bạn muốn output text ra bằng encoding nào; sau đó chúng convert encoding trực tiếp nếu cần, với Unicode như là một middleman. 

## Độ phức tạp của Unicode

Do Unicode xử lý một lượng lớn các kịch bản và vấn đề khác nhau, nó thực sự rất phức tạp. Ví dụ, chuẩn Unicode có bao gồm các thông tin về những vấn đề như [hợp nhất chữ tượng hình CJK](https://en.wikipedia.org/wiki/CJK_Unified_Ideographs). Điều đó có nghĩa là, thông tin về việc 2 hay nhiều hơn các ký tự tiếng Trung/Nhật/Hàn thể hiện cùng một ký tự nhưng có cách viết hơi khác nhau. Hay các quy tắc về việc convert từ chữ thường sang chữ viết hoa hoặc ngược lại, một vấn đề không phải đơn giản như trong hầu hết các ngôn ngữ tiếng Latinh châu Âu. Một số các ký tự còn có thể được thể hiện bằng các code point khác nhau. Chữ "ö" có thể được thể hiện bằng code point U+00F6 ("LATIN SMALL LETTER O WITH DIAERESIS") hoặc bằng 2 code point U+006F ("LATIN SMALL LETTER O") và U+0308 ("COMBINING DIAERESIS"), nghĩa là chữ "o" kết hợp với "¨". Trong UTF-8 nó có thể là chuỗi 2 byte 1000011 10110110 hoặc chuỗi 3 byte 01101111 11001100 10001000, cả 2 đều thể hiện cùng một ký tự giống nhau đối với con người. Bởi vì thế, Unicode đã sinh ra các quy tắc về việc bình thường hoá (Normalization) trong chuẩn của mình, ví dụ như các thể hiện trên được convert qua lại với nhau như thế nào. Còn rất nhiều vấn đề nữa nhưng nó lại không nằm trong scope của bài viết này, tuy nhiên bạn cũng nên biết một chút về chúng.

## Tóm tắt cuối cùng 

- Text luôn là một chuỗi bit cần được dịch ra text con người có thể đọc được bằng cách sử dụng các bảng tra cứu. Nếu dùng sai bảng, ký tự sai sẽ được sử dụng. 
- Bạn không thực sự làm việc với "ký tự" hay "văn bản", bạn luôn làm việc với *bit* thông qua hàng loạt lớp trừu tượng. Thường thì bạn sẽ gặp vấn đề nếu một trong các lớp trừu tượng này bị sai.
- Nếu 2 hệ thống giao tiếp với nhau, chúng luôn cần biết được việc sử dụng encoding nào. Một ví dụ đơn giản nhất là trang web báo cho trình duyệt biết việc nó được mã hoá bằng UTF-8.
- Trong thời đại ngày nay, encoding tiêu chuẩn chính là UTF-8, do nó có thể mã hoá gần như mọi ký tự bạn cần, tương thích ngược với và khá hiệu quả về mặt bộ nhớ đối với hầu hết các trường hợp.
- Các encoding khác cũng sẽ thỉnh thoảng có tác dụng, nhưng hãy expect là sẽ có vấn đề phát sinh ra từ những bộ ký tự mà chỉ có thể mã hoá một phần nhỏ của Unicode.
- Những ngày tháng mà một byte = một ký tự đã trôi qua lâu rồi và bạn và chương trình của bạn cần phải hiểu điều đó.

Bài viết được dịch từ [What Every Programmer Absolutely, Positively Needs To Know About Encodings And Character Sets To Work With Text](http://kunststube.net/encoding/).