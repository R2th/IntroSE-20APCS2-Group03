# Làm rõ các khái niệm cơ bản
Chắc rằng tất cả mọi người đều biết về điều này ở một mức độ nào đó, nhưng không hiểu sao những kiến thức đó lại bị mất đi trong các cuộc tranh luận về văn bản, nên đầu tiên hãy nhắc lại một chút: Máy tính không thể nào lưu trữ được “chữ”, “số”, “ảnh”, hay bất cứ thứ gì khác. Thứ duy nhất mà nó có thể lưu được và làm việc cùng đó là *bit*.  Một bit chỉ có thể có 2 giá trị: có hoặc không, đúng hoặc sai, 1 hoặc 0, bạn thích gọi theo cách nào cũng được. Vì máy tính hoạt động bằng điện, một bit thực chất có thể được thể hiện bằng điện áp, xung hiện tại hoặc trạng thái điện của mạch flip-flop. Đối với con người, bit thường được biểu thị bằng 1 và 0 nên hãy coi đây là quy ước trong suốt bài viết này.

Để dùng bit để thể hiện cho bất cứ thứ gì, chúng ta cần các quy tắc. Chúng ta cần phải chuyển đổi một chuỗi các bit thành thứ gì đó như chữ, số và ảnh bằng cách sử dụng một encoding scheme (lược đồ mã hóa), hoặc gọi tắt là encoding. Như thế này:

```
01100010 01101001 01110100 01110011
b        i        t        s
```

Trong encoding này, `01100010` đại diện cho chữ "b", `01101001` cho chữ "i", `01110100` cho chữ "t" và `01110011` cho chữ "s". Một chuỗi các bit nhất định sẽ đại diện cho một chữ và một chữ sẽ đại diện cho một chuỗi các bit nhất định. Nếu bạn có trí nhớ tốt để nhớ được chuỗi bit cho 26 chữ thì bạn có thể đọc bit như đọc sách vậy.

Encoding scheme trên được gọi là ASCII. Một chuỗi các số 1 và 0 được chia ra thành nhiều phần, mỗi phần 8 bit (hoặc 1 byte). ASCII quy định một bảng để dịch từ byte sang chữ cái mà con người có thể đọc được. Dưới đây là một phần nhỏ của bảng đó:


| bits | character |
| -------- | -------- |
| `01000001`     | A     |
| `01000010`     | B     |
| `01000011`     | C     |
| `01000100`     | D     |
| `01000101`     | E     |
| `01000110`     | F     |


Có tổng cộng 95 ký tự có thể đọc được quy định trong bảng ASCII, bao gồm chữ từ A đến Z ở trạng thái thường và in hoa, số từ 0 đến 9, một số dấu chấm câu và các ký tự như đồng đô la, dấu chấm than và một vài thứ khác. Nó cũng bao gồm 33 giá trị cho một số thứ như dấu cách, dấu xuống dòng, tab, backspace,... Những thứ này tất nhiên không thể in ra được, nhưng cũng vẫn hữu hình ở một số dạng và có ích trực tiếp với con người. Một vài giá trị thì chỉ có ích với máy tính, như mã để đánh dấu bắt đầu và kết thúc của văn bản. Tộng cộng có 128 ký tự được định nghĩa trong encoding ASCII, đó là một con số đẹp (với những người quen thuộc với máy tính), bởi vì nó sử dụng hết tất cả các kết hợp có thể của 7 bit (`0000000` cho đến `1111111`).

Và giờ thì chúng ta đã có cách để thể hiện văn bản chỉ bằng việc sử dụng 1 và 0:

```
01001000 01100101 01101100 01101100 01101111 00100000
  01010111 01101111 01110010 01101100 01100100
  
"Hello World"
```

# Thuật ngữ quan trọng

Để `encode` một thứ gì đó bằng ASCII, làm theo bảng từ phải qua trái, thay thế các chữ bằng các bit. Để `decode` một chuỗi các bit thành các ký tự có thể đọc được, làm theo bảng từ trái qua phải, thay thế các bit bằng chữ.

`Encode` nghĩa là sử dụng một thứ gì đó để thể hiện cho một thứ khác. `encoding` là một tập hợp các quy tắc để thực hiện việc chuyển đổi đó.

Một số thuật ngữ khác cần được làm rõ trong ngữ cảnh này:

**character set, charset**

Tập hợp các ký tự có thể được encode. "Mã hóa ASCII bao gồm một bộ ký tự gồm 128 ký tự." Về cơ bản thì đồng nghĩa với "encoding". 

**code page**

Một "trang" các mã để liên kết các ký tự với một chuỗi các bit tương ứng. Cũng có thể hiểu là một "bảng". Về cơ bản thì đồng nghĩa với "encoding". 

**string**

Một string là một số các thành phần được xâu lại với nhau. Một chuỗi bit là một loạt các bit, như `01010011`. Một chuỗi ký tự là một loạt các ký tự, `như thế này`. Đồng nghĩa với "sequence".

**Binary, Octal, Decimal, Hex**

Có rất nhiều cách để viết một số. 10011111 trong hệ nhị phân là 237 trong hệ bát phân, 159 trong hệ thập phân và 9F trong hệ thập lục phân. Chúng đều thể hiện một giá trị, nhưng số thập lục phân lại ngắn gọn hơn và dễ đọc hơn so với số nhị phân. Tuy vậy tôi sẽ dùng nhị phân trong suốt bài viết này để làm vấn đề trở nên dễ hiểu hơn cũng như loại bỏ bớt được một lớp trừu tượng. Đừng lo nếu bạn thấy ở đâu đó các mã ký tự lại được viết ở hệ khác nhé, chúng như nhau cả thôi.

# Excusez-Moi?

Sau khi đã nắm rõ những ý trên rồi thì cùng thú thật với nhau nào: 95 ký tự là quá ít khi chúng ta nói về các ngôn ngữ. Nó có thể áp dụng cho tiếng Anh cơ bản, nhưng sẽ thế nào nếu chúng ta muốn viết một risqué letter (thư báo rủi ro) bằng tiếng Pháp? Straßen­übergangs­änderungs­gesetz (luật đường bộ) trong tiếng Đức? Một lời mời đến tiệc smörgåsbord (tiệc đứng) bằng tiếng Thụy Điển? Ờm, bạn không thể. Không thể bằng ASCII. Không có một chỉ dẫn nào cho việc thể hiện các chữ như é, ß, ü, ä, ö or å trong ASCII, nên chúng ta không thể dùng nó được.

"Nhưng nhìn xem," dân châu Âu nói, "trong một cái máy tính thông dụng với 1 byte bằng 8 bit, mã hóa ASCII đang làm phí phạm hẳn 1 bit khi luôn set giá trị của nó là 0! Chúng ta có thể dùng bit này để nhét thêm tận 128 giá trị vào cái bảng đó!" Và họ đã làm như vậy. Nhưng kể cả thế, có nhiều hơn 128 cách để đặt dấu cho một nguyên âm. Chúng ta không thể nào đưa hết tất cả các biến thể của chữ cái được dùng trong các ngôn ngữ của toàn Châu Âu vào trong cùng một bảng với tối đa 256 giá trị được. Và sau đó thế giới chìm ngập trong một biển các encoding, các tiêu chuẩn, các tiêu chuẩn thực tế và thậm chí là... nửa tiêu chuẩn để dùng cho các bộ ký tự khác nhau. Một người nào đó cần phải viết một văn bản về tiếng Thụy Điển bằng tiếng Séc, tìm không ra encoding nào áp dụng cho cả 2 ngôn ngữ này nên đành tự chế ra một cái. Và chuyện đó diễn ra hàng ngàn lần.

Và cũng đừng quên tiếng Nga, tiếng Ấn Độ, tiếng Ả Rập, tiếng Do Thái, tiếng Hàn và hàng ngàn ngôn ngữ khác đang được dùng trên trái đất. Chưa kể các ngôn ngữ đã không còn được dùng nữa. Một khi bạn đã giải được bài toán làm thế nào để viết nhiều ngôn ngữ trong cùng một văn bản với các thứ tiếng trên, hãy thử thách bản thân bằng tiếng Trung. Hoặc tiếng Nhật. Cả 2 ngôn ngữ này chứa cả chục nghìn ký tự. Bạn có tối đa 256 giá trị trong một byte chứa 8 bit. Triển!

# Mã hóa đa byte (Multi-Byte Encodings)

Để tạo ra một bảng liên kết các ký tự với chữ cái cho một ngôn ngữ có nhiều hơn 256 ký tự, một byte đơn giản là không đủ. Với 2 byte (16 bit), chúng ta có thể mã hóa tới 65,536 ký tự khác nhau. BIG-5 là một encoding sử dụng cách đó. Thay vì tách một chuỗi các bit thành block 8, nó tách thành block 16 và có một cái bảng khổng lồ (ý tôi là, KHỔNG LỒ) quy định việc ký tự nào thì liên kết cùng chuỗi bit nào. BIG-5 ở thể đơn giản nhất đã xử lý hầu hết các ký tự của tiếng Trung phồn thể. GB18030 là một encoding khác cũng có cách tiếp cận tương tự, nhưng nó bao gồm cả tiếng Trung giản thể và phồn thể luôn. Và trước khi bạn hỏi, thì đúng vậy, có cả các encoding khác chỉ dành cho tiếng Trung giản thể thôi. Tôi chỉ muốn dùng 1 encoding thôi mà cũng khó khăn thế sao?


Dưới đây là một phần nhỏ của bảng mã hóa GB18030:


| bits | character |
| -------- | -------- |
| 10000001 01000000     | 丂     | 
| 10000001 01000001     | 丄     | 
| 10000001 01000010     | 丅     | 
| 10000001 01000011     | 丆     | 
| 10000001 01000100     | 丏     | 

GB18030 xử lý một lượng lớn các ký tự (bao gồm cả phần lớn các ký tự La tinh), tuy nhiên cuối cùng thì nó cũng chỉ là một định dạng mã hóa chuyên biệt trong hàng hà sa số các cái khác thôi.

# Sự bối rối mang tên Unicode

Cuối cùng thì cũng có người chịu hết nổi và đã đứng lên tạo ra một chuẩn mã hóa để hợp nhất tất cả các chuẩn khác. Chuẩn này được gọi là Unicode. Về cơ bản nó định nghĩa một bảng lớn cực đại với 1,114,112 các code point có thể được dùng cho mọi loại chữ cái và biểu tượng. Nó thừa đủ để mã hóa toàn bộ tiếng châu Âu, Trung Đông, Viễn Đông, miền Nam, miền Bắc, miền Tây, tiền sử và cả các ngôn ngữ tương lai mà con người chưa nghĩ ra. Sử dụng Unicode, bạn có thể soạn văn bản chứa gần như mọi ngôn ngữ bằng mọi ký tự mà bạn có thể gõ ra. Điều này hoặc là bất khả thi hoặc rất rất khó để thực hiện trước khi Unicode ra đời. Thậm chí còn có một mục không chính thức dành cho tiếng Klingon (Star Trek) trong Unicode. Bạn thấy đó, Unicode lớn đến nỗi nó cũng cho phép dùng vào mục đích cá nhân luôn.  

![](https://images.viblo.asia/a527095f-6c7e-4e8e-8830-659780a8f55f.png)


Vậy thì Unicode sử dụng bao nhiêu bit để mã hóa tất cả các ký tự đó? 0. Bởi vì Unicode không phải một loại mã hóa (encoding).

Bối rối? Nhiều người có vẻ như vậy. Đầu tiên, Unicode định nghĩa ra một bảng chứa các code point cho các ký tự. Nghe có vẻ nguy hiểm vậy thôi, nó cũng như là nói "65 đại diện cho A, 66 cho B và 9,731 cho ☃" (thật đấy). Làm thế nào mà những code point này được mã hóa thành bit thì lại là một câu chuyện khác. Để chứa 1,114,112 giá trị khác nhau, 2 byte là không đủ. 3 byte thì đủ, nhưng chả ai dùng 3 byte cả, nên cuối cùng 4 byte đã được chọn. Nhưng, trừ khi bạn dùng tiếng Trung hoặc các thứ tiếng khác với một lượng lớn các ký tự mà cần nhiều bit để mã hóa, bạn sẽ chẳng bao giờ dùng hết phần lớn 4 byte đó cả. Nếu chữ "A" luôn được mã hóa thành `00000000 00000000 00000000 01000001`, "B" thì thành `00000000 00000000 00000000 01000010`,.. mọi văn bản sẽ có kích thước tăng lên 4 lần so với kích thước thực.

Để tối ưu hóa vấn đề này, có rất nhiều cách để mã hóa code point thành bit. UTF-32 là một encoding có tác dụng mã hóa mọi code point sử dụng 32 bit. Nghĩa là, 4 byte trên một ký tự. Nó rất đơn giản, nhưng thường thì chiếm kích thước quá lớn. UTF-16 và UTF-8 là 2 loại mã hóa đa chiều dài. Nếu một ký tự có thể được mã hóa bằng 1 byte (bởi vì code point của nó là một số rất nhỏ), UTF-8 sẽ mã hóa nó bằng 1 byte. Nếu ký tự cần tới 2 byte, nó sẽ mã hóa bằng 2 byte, vân vân.  Khi giải mã (decode), byte đầu tiên trong chuỗi sẽ được sử dụng để xác định số byte cấu tạo thành ký tự, cụ thể:

- Chuỗi bắt đầu bằng mẫu bit "0" (0x00-0x7f) => chuỗi dài 1 byte.
- Chuỗi bắt đầu bằng mẫu bit "110" (0xc0-0xdf) => chuỗi dài 2 byte.
- Chuỗi bắt đầu bằng mẫu bit "1110" (0xe0-0xef) => chuỗi dài 3 byte.
- Chuỗi bắt đầu bằng mẫu bit "11110" (0xf0-0xf7) => chuỗi dài 4 byte.

Việc sử dụng bit có trọng số cao nhất (MSB) làm tín hiệu thông báo độ dài chuỗi có thể giúp giảm hao tốn bộ nhớ, nhưng vẫn sẽ tốn kém nếu được dùng quá thường xuyên. UTF-16 thì cân bằng hơn, dùng ít nhất 2 byte, sẽ tăng lên đến 4 byte nếu cần.

![](https://images.viblo.asia/8f6bbee6-2cb4-4d09-9db0-c6a6d9aa84e3.png)

Và đó là tất cả về Unicode. Unicode là một bảng lớn với mục đích liên kết các ký tự với các số và các loại mã hoá UTF khác nhau thì chỉ định cách thức mà những số này được mã hoá thành bit. Về cơ bản, Unicode cũng chỉ là một trong các encoding scheme và không có gì đặc biệt về nó ngoại trừ việc nó cố gắng để xử lý mọi thứ trong khi vẫn hoạt động một cách hiệu quả mà thôi. Và đó là một điều rất tốt.™

# Code Points

Các ký tự được thể hiện thông qua "code point" của nó. Code point được viết dưới hệ thập lục phân (để làm cho nó ngắn hơn), được bắt đầu bằng "U+" (không có ý nghĩa gì ngoài việc ám chỉ đây là một code point của Unicode). Ví dụ, ký tự Ḁ có code point là U+1E00. Theo cách nói khác, nó là ký tự số 7680 của bảng Unicode. Tên gọi chính thức của nó là "LATIN CAPITAL LETTER A WITH RING BELOW" (Chữ la tinh viết hoa A với vòng tròn ở dưới).

![](https://images.viblo.asia/5cdec56b-248f-4267-95e1-cdd731101f1f.png)

# Dài quá, ngại đọc

Một chút tóm tắt các ý trên: Mọi ký tự có thể được mã hoá thành nhiều chuỗi bit khác nhau và bất chứ chuỗi bit nào cũng có thể thể hiện các ký tự khác nhau, tuỳ thuộc vào loại mã hoá nào được dùng để viết chúng ra. Lí do đơn giản chỉ vì các mã hoá khác nhau thì sử dụng số bit khác nhau với mỗi ký tự và các giá trị khác nhau thì thể hiện các ký tự khác nhau.

![](https://images.viblo.asia/4117034a-9b3b-43f2-9a52-aa25e6d869b1.png)

(Hết phần 1)

Bài viết được dịch từ [What Every Programmer Absolutely, Positively Needs To Know About Encodings And Character Sets To Work With Text](http://kunststube.net/encoding/).

Có tham khảo và chỉnh sửa thêm từ các nguồn:
- https://en.wikipedia.org/wiki/UTF-8
- https://stackoverflow.com/questions/775412/how-does-a-file-with-chinese-characters-know-how-many-bytes-to-use-per-character