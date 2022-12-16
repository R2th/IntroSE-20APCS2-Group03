# Những điều bạn cần biết về Encodings Và Character Sets khi làm việc với văn bản


Nếu bạn là người làm việc với văn bản trên máy tính, dù cho là chỉ có gõ/đọc email, thì bạn cần thiết phải có kiến thức về encoding. Bạn không cần phải hiểu hết mọi ngọn ngành chi tiết, nhưng ít nhất bạn phải biết được sơ sơ "encoding" nó là cái gì. Tin tốt là trong khi chủ đề này có thể biến thành một mớ hỗn độn lộn xộn khó hiểu, nhưng ý tưởng cơ bản đằng sau nó thì thực sự, thực sự là rất đơn giản.

Bài viết này sẽ nói về encoding và character sets. Có một bài viết rất hay của Joel Spolsky, có tựa đề là "The Absolute Minimum Every Software Developer Absolutely, Positively Must Know About Unicode and Character Sets (No Excuses!)". Bài viết này là một bài mở đầu về encoding rất hay, nhưng tuy nhiên thì tôi khá ngần ngại giới thiệu bài ấy với những người đang gặp khó khăn trong việc hiểu các vấn đề về encoding. Lí do là bởi vì bài thì đọc rất giải trí, nhưng mặt khác, lại chưa được sâu về các chi tiết kỹ thuật trong thực tiễn. Tôi hy vọng bài viết này có thể làm sáng tỏ hơn về chính xác encoding là cái gì và tại sao tất cả các văn bản của bạn lại lăn ra quằn quại lúc bạn cần nhất. Mặc dù bài viết này hướng tới đối tượng là các developers (chủ yếu là PHP), nhưng tôi nghĩ không chỉ các bạn dev, mà bất kỳ người dùng máy tính nào cũng sẽ có thể hưởng lợi từ bài viết này.

## Nhắc lại một số kiến thức cơ bản
Ai ai cũng đều biết điều sau đây ở một mức độ nào đó, nhưng mà không biết tại làm sao, mà kiến thức này dường như bị "quên" trong các cuộc bàn luận có chủ đề về văn bản. Thế nên, trước hết tôi xin phép nhắc lại: Máy tính không thể lưu trữ "chữ cái", "số", "hình ảnh" hoặc bất cứ cái gì cả. Thứ duy nhất nó có thể lưu trữ và xử lý được là với các bit. Một bit chỉ có thể có hai giá trị: có hoặc không, đúng hoặc sai, 1 hoặc 0 hoặc bất cứ cái gì khác mà bạn muốn gọi hai giá trị này. Vì máy tính làm việc với điện, một bit "thực tế" thể hiện sự tồn tại hoặc không tồn tại của một xung điện. Đối với con người, sự tồn tại/không tồn tại này thường được biểu diễn bằng 1 và 0 và đây sẽ là quy ước mà tôi sẽ sử dụng trong suốt bài viết này.

Để sử dụng bit để thể hiện bất cứ thứ gì khác không phải là bit, chúng ta cần các quy tắc. Khi chúng ta cần chuyển đổi một chuỗi các bit thành chữ cái, số hoặc hình ảnh, thì chúng ta sẽ phải sử dụng *encoding scheme*, hoặc nói tắt là *encoding*.

```
01100010 01101001 01110100 01110011
b        i        t        s
```

Trong encoding này, `01100010` thể hiện chữ "b", `01101001` thể hiện chữ "i", `01110100` thể hiện chữ "t" và `01110011` thể hiện chữ "s". Một chuỗi bit nhất định thể hiện một chữ cái và một chữ cái là là thể hiện của một chuỗi bit nhất định. Nếu bạn có thể nhớ được cách mapping này với tất cả 26 chữ cái, hoặc là người tra bảng nhanh, việc đọc bit sẽ không có gì là khó khăn cả.

Encoding scheme ở trên là ASCII. Một chuỗi 1 và 0 được chia thành các cụm tám bit mỗi chuỗi (viết tắt là một byte). ASCII định nghĩa một bảng dịch byte thành các chữ cái con người có thể đọc được. Dưới đây là một đoạn trích ngắn:

```
bits	character
01000001	A
01000010	B
01000011	C
01000100	D
01000101	E
01000110	F
```

Có 95 ký tự con người đọc được được định nghĩa trong bảng ASCII, bao gồm các chữ cái từ A đến Z (cả chữ hoa và chữ thường), các số từ 0 đến 9, một số dấu câu và ký tự như ký hiệu đô la, dấu và (&) và một số ký tự khác. Ngoài ra, ASCII cũng chứa 33 giá trị cho những thứ như dấu cách, line feeder, tab, backspace, v.v... Bản thân các kí tự này không thể in ra được, nhưng vẫn có thể nhìn thấy được dưới một số hình thức nào đó và có ích trực tiếp đối với con người. Một số giá trị chỉ hữu ích cho máy tính, ví dụ như mã để thể hiện nơi bắt đầu hoặc kết thúc văn bản. Tổng cộng lại, có 128 ký tự được định nghĩa trong mã hóa ASCII. Đây là một số tròn trĩnh gọn gàng (dành cho người làm việc với máy tính), vì nó khai thác tất cả cách sắp xếp có thể có từ 7 bit (0000000, 0000001, 0000010 đến 111111).

Và tèn ten, chúng ta đã có cách để hiển thị văn bản cho con người mà chỉ cần sử dụng 1 và 0.

```
01001000 01100101 01101100 01101100 01101111 00100000
  01010111 01101111 01110010 01101100 01100100
  
"Hello World"
```

### Một số khái niệm quan trọng
Để mã hóa một cái gì đó trong ASCII, đọc bảng từ phải sang trái, thay thế các chữ cái thành các bit. Để giải mã một chuỗi bit thành các ký tự chữ cái, đọc bảng từ trái sang phải, thay thế các chữ cái thành các bit.

"Mã hóa" có nghĩa là sử dụng một cái gì đó để đại diện cho một cái gì đó khác. Mã hóa là tập hợp các quy tắc để chuyển đổi một cái gì đó từ cách biểu hiện này sang cách biểu hiện khác.

Các khái niệm cũng cần được làm rõ trong bối cảnh này:

character set, charset:
Tập hợp các ký tự có thể được mã hóa. "ASCII encoding bao gồm một charset gồm 128 ký tự." Về cơ bản đồng nghĩa với "encoding".
code page:
Một "page" các code để gán một ký tự thành một chuỗi số hoặc bit. Còn lại là "bảng mã hóa".  Về cơ bản đồng nghĩa với "mã hóa".
chuỗi
Một chuỗi là một loạt các "thứ" được xâu chuỗi lại với nhau. Chuỗi bit là một đám bit, ví dụ như 01010011. Chuỗi ký tự là một đám các ký tự, `như thế này này`. Đồng nghĩa với "sequence".
    
Binary, Octal, Decimal, Hex
Có nhiều cách để viết số. 10011111 ở trong nhị phân là 237 trong bát phân, là 159 trong thập phân, và là 9F ở hệ thập lục phân. Tất cả đều đại diện cho cùng một giá trị, nhưng số viết bằng hệ thập lục phân ngắn và dễ đọc hơn nhị phân. Tôi sẽ chỉ sử dụng hệ nhị phân trong suốt bài viết này để có có thể truyền đạt ý tưởng một cách sáng rõ hơn và bớt đi một tầng abstraction cho người đọc. Nếu bạn đọc ở đâu đấy mà thấy các character code được thể hiện theo kiểu khác, thì cũng không có gì phải xoắn não, vì thực chất là giống nhau cả.

### Excusez-Moi?

Dựa trên cơ sở chúng ta đã hiểu được các từ ngữ, khái niệm, thì đã đến lúc đưa ra vấn đề: Trong ngôn ngữ, 95 ký tự thực sự không phải là nhiều. Tập hợp này bao gồm những ký tự cơ bản của tiếng Anh, nhưng nếu chúng ta muốn viết một lá thư thật là *risqué* bằng tiếng Pháp thì sao? Hay một Straßenübergangsänderungsgesetz trong tiếng Đức? Hay một lời mời đến một smorgåsbord trong tiếng Thụy Điển? Vâng, bó tay. Không có trong ASCII. Không có bất kỳ đặc tả nào về cách thể hiện các chữ cái é, ß, ü, ä, ö hoặc å trong ASCII, vì vậy ta không có cách nào để sử dụng chúng.

"Ê nhưng hãy nhìn xem," người châu Âu nói, "trong một máy tính thông thường có 8 bit cho byte, và ASCII đang lãng phí bit đấy, lúc nào cũng đặt nó thành 0! Chúng ta có thể sử dụng bit đó để nhét thêm hẳn 128 giá trị mới vào bảng mã!". Và họ đã làm như thế. Nhưng ngay cả như vậy, có hơn 128 cách để gạch, cắt, chặt chém và chấm một nguyên âm. Không có cách nào để có thể biểu hiện tất cả các biến thể của đám kí tự chữ và giun dế được sử dụng trong tất cả các ngôn ngữ châu Âu trong cùng một bảng với tối đa 256 giá trị. Vì vậy, kết cục là thế giới đẻ ra một nghìn tỉ encoding scheme, tiêu chuẩn trên giấy tờ, tiêu chuẩn thực tế được sử dụng và nửa tiêu chuẩn, tất cả để chứa các nhóm ký tự con khác nhau. Một ngày đẹp zời, một người nào đó cần viết một tài liệu về tiếng Thụy Điển bằng tiếng Séc, và sau khi thấy rằng không có encoding nào bao trùm cả hai ngôn ngữ, đã phát minh ra một encoding mới. Và cứ thế lặp đi lặp lại không biết bao nhiêu lần.

Và đừng quên về tiếng Nga, tiếng Hindi, tiếng Ả Rập, tiếng Do Thái, tiếng Hàn và tất cả các ngôn ngữ khác hiện đang được sử dụng trên hành tinh này. Chưa kể những ngôn ngữ không sử dụng nữa. Một khi bạn đã giải quyết được vấn đề làm thế nào để viết các tài liệu đa ngôn ngữ trong tất cả các thứ ngôn ngữ này, hãy thử tiếng Trung Quốc. Hoặc tiếng Nhật. Cả hai đều chứa hàng chục ngàn ký tự. Bạn có 1 byte gồm 8 bit, chứa 256 giá trị. Nào, xin mời!

### Mã hóa nhiều byte
Để tạo một bảng map các ký tự thành các chữ cái cho một ngôn ngữ sử dụng hơn 256 ký tự, chỉ một byte là không đủ. Hai byte (16 bit) có thể mã hóa 65.536 giá trị riêng biệt. BIG-5 là một encoding hai byte như vậy. Thay vì chia một chuỗi bit thành các cụm tám, nó chia nó thành các cụm 16 và có một bảng TO, RẤT TO để đặc tả mỗi ký tự tương ứng với mỗi cách sắp xếp bit. BIG-5 ở dạng cơ bản bao gồm hầu hết các chữ phổn thể của Trung Quốc. GB18030 là một encoding khác, về cơ bản cũng thực hiện công việc tương tự, nhưng bao gồm cả các chữ Trung Quốc phổn thể và giản thể. Và có cả những bảng mã chỉ bao gồm tiếng Trung giản thể. Trời ạ, sao mà đẻ lắm thế!

Dưới đây là một đoạn trích nhỏ từ bảng GB18030:

bit                                 ký tự 
10000001 01000000 丂
10000001 01000001 丄
10000001 01000010 丅
10000001 01000011 丆
10000001 01000100 丏

GB18030 bao gồm khá nhiều loại ký tự (bao gồm một phần lớn các ký tự Latin), nhưng cuối cùng vẫn chỉ là một định dạng encoding trong vô vàn các định dạng khác.

*(còn tiếp)*

Nguồn: http://kunststube.net/encoding/#fnref:valid-utf8