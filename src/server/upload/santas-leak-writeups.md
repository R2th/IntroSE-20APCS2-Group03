# Giới thiệu
Dạo gần đây trong thời điểm dịch COVID-19 đang xảy ra, mình có nhiều thời gian rảnh hơn, nên có thời gian làm các đề CTF cũ. Trong bài viết lần này, mình xin chia sẻ lời giải của 1 challenge từ 1 cuộc thi CTF cũ. 
# Santa's Leak
Đề bài : Giải mã hình ảnh sau ( Mình đã tóm lược lại đề bài cho ngắn gọn )
![](https://images.viblo.asia/367d177e-dc8a-4735-b0c6-63216d0ef28c.png)

Gợi ý mà cuộc thi đưa ra đó là tất cả các flag đều có dạng `HV15-aaaa-bbbb-cccc-dddd-eeee`.

Như các bạn có thể thấy trên hình, đây là 1 QR code. Nên ta có thể scan để tìm các thông tin cần thiết. Mình sử dụng trang này để scan QR code: https://pageloot.com/qr-code-scanner/#upload. Sau khi scan ta thu được đoạn mã sau: 

`nyy lbh arrq vf urer`

Hmm. Có vẻ đây là 1 đoạn text đã được mã hóa. Thuật toán mã hóa đơn giản nhất có lẽ là [Ceasar Cipher](https://en.wikipedia.org/wiki/Caesar_cipher). Vấn đề là chúng ta không biết đây là thuật toán ROT bao nhiêu? Chúng ta có thể thử code để tìm ra đoạn text bạn cho là hợp lí. Nhưng bản thân mình khá lười nên sẽ tận dụng mọi nguồn lực trên Internet trước. Mình tìm được 1 trang sau đây để decode Ceasar Cipher rất hiệu quả https://www.dcode.fr/caesar-cipher.  Sau khi decode với tất cả các ROT-x (x từ 1 đến 25), ta thu được kết quả sau:

```
+13	all you need is here
+9	epp csy riih mw livi
+24	paa ndj ctts xh wtgt
+19	uff sio hyyx cm byly
+3	kvv iye xoon sc robo
+25	ozz mci bssr wg vsfs
+17	whh ukq jaaz eo dana
+12	bmm zpv offe jt ifsf
+4	juu hxd wnnm rb qnan
+16	xii vlr kbba fp ebob
+2	lww jzf yppo td spcp
+11	cnn aqw pggf ku jgtg
+5	itt gwc vmml qa pmzm
+23	qbb oek duut yi xuhu
+6	hss fvb ullk pz olyl
+20	tee rhn gxxw bl axkx
+7	grr eua tkkj oy nkxk
+10	doo brx qhhg lv khuh
+18	vgg tjp izzy dn czmz
+8	fqq dtz sjji nx mjwj
+21	sdd qgm fwwv ak zwjw
+15	yjj wms lccb gq fcpc
+14	zkk xnt mddc hr gdqd
+1	mxx kag zqqp ue tqdq
+22	rcc pfl evvu zj yviv
```

Như chúng ta có thể thấy với ROT-13, chúng ta có 1 được đoạn text có lẽ là "có nghĩa nhất":
`all you need is here`. Hmm, có vẻ như chúng ta lại phải quay lại hình ảnh ban đầu.
Mình sử dụng `binwalk` để xem có file ẩn nào trong ảnh của đề bài không. 

`binwalk santas.png`

Ta thu được kết quả sau:
![](https://images.viblo.asia/7f2b9fe3-17d8-4aa2-9c6f-9c02a781e12e.png)

Như các bạn thấy, có 1 file RAR ẩn trong hình ảnh của đề bài. Chúng ta lại dùng `binwalk` để extract ra file ẩn này

` binwalk -D 'rar archive:rar' santas_leak_new.png `

Sau khi extract được file ẩn trong ảnh ban đầu, ta thu được các file sau:

![](https://images.viblo.asia/823ecca4-3ff1-40b7-8d04-b1b7d177dac1.png)

Lại có 1 file nén ở đây. Chúng ta sẽ dùng unrar để xem có gì bên trong:

` unrar x -r 12AA2.rar `

Rất tiếc trên Viblo, theo như mình biết có vẻ không upload được 1 file tùy ý lên nên mình đã upload lên 1 trang khác trên mạng. Đây là file sau khi mình đã upload được lên https://vocaroo.com/adWrJ5H4HRG.
Sau một hồi googling, mình thấy đây là 1 file DTMF sound(https://en.wikipedia.org/wiki/Dual-tone_multi-frequency_signaling). Mình tìm được 1 đoạn gist trên mạng để giải mã file wav này https://github.com/hfeeki/dtmf/blob/master/dtmf-decoder.py.  Sau khi chạy đoạn code trên ta thu được đoạn mã sau: 

`10611711511632112111151151059810810132119105116104105110321151179910432973211497114`
Có vẻ đây là đoạn ASCII character đã bị decimal-encoder. Ta sẽ chia đoạn mã trên thành các block nhỏ mỗi block gồm 3 kí tự. 

Ta thu được 

`106 117 115 116 32 112 111 115 115 105 98 108 101 32 119 
105 116 104 105 110 32 115 117 99 104 32 97 32 114 97 114`

Chúng ta sử dụng https://www.rapidtables.com/convert/number/ascii-hex-bin-dec-converter.html để decode đoạn mã trên thu được kết qủa với ASCII: 

`just possible within such a rar`

Hmm. Ban đầu chúng ta đã giải nén file `12AA2.rar` để ra file war nhuư trên. Có vẻ như vẫn còn hidden file đâu đó trong file nén `12AA2.rar`.  Chúng ta chạy 

`unrar ltab 12AA2.rar `
thu được kết quả như sau: 

```
UNRAR 5.30 beta 2 freeware      Copyright (c) 1993-2015 Alexander Roshal

Archive: 12AA2.rar
Details: RAR 4

        Name: 2.wav
        Type: File
        Size: 470444
 Packed size: 419609
       Ratio: 89%
       mtime: 2015-11-14 11:12:07,722
  Attributes: ..A....
       CRC32: 7F094717
     Host OS: Windows
 Compression: RAR 3.0(v29) -m3 -md=512K

        Name: STM
        Type: NTFS alternate data stream
      Target: :3.txt
        Size: 490901
 Packed size: 376134
       Ratio: 76%
       mtime: 2015-11-14 11:12:26,000
  Attributes: .B
       CRC32: 979A0B91
     Host OS: Windows
 Compression: RAR 3.0(v29) -m3 -md=64K

     Service: EOF

```

Như vậy là còn 1 file NTFS alternate data stream. Thật sự thì mình cũng không biết đây là file gì nên lại phải tiếp tục googling @@. Sau 1 thời gian tìm hiểu, mình phải switch sang window để sử dụng công cụ sau http://www.nirsoft.net/utils/alternate_data_streams.html để extract ra ADS (alternate data stream) và thu được đoạn mã sau: 
https://gist.github.com/oBuiNhatDuy/a43f080ea036af97bfdb9b61773300fe ( Do đoạn mã quá dài nên mình không public trong bài viết này ). Dễ dàng nhận ra đây là đoạn mà theo kiểu base64 encode. Sau khi giải mã ta thu được 1 file. Do hạn chế của Viblo nên mình lại update file bin này lên 1 trình upload file online https://filebin.net/zy61pzdffqetebfc. Tên file dưới local mình sẽ đặt là `base64decoded.bin`

Chạy `file base64decoded.bin` ta thu được kết qủa :

`base64decoded.bin: PDF document, version 1.5`

Như vậy đây là 1 file PDF. Ta sẽ mở bằng các trình đọc PDF thông thường, ta thu được đoạn mã :
```
+++++ +++[- >++++ ++++< ]>+++ +++++ .<+++ ++[-> +++++ <]>++ ++.<+ +++[-
>++++ <]>++ ++.<+ +++++ +++[- >---- ----- <]>-- ----- -.<++ +++++ +[->+
+++++ ++<]> +++++ +++++ ++.-- ----- ..<++ +[->+ ++<]> +++++ +.-.< +++++
+++[- >---- ----< ]>--- ----. <+++[ ->--- <]>-- -.<++ ++[-> ----< ]>---
.---. <++++ +++[- >++++ +++<] >++++ +++++ +++++ .<+++ +++[- >++++ ++<]>
.<+++ +++++ [->-- ----- -<]>- ----- ----- --.<+ +++++ ++[-> +++++ +++<]
>++++ +++.+ ++++. <+++[ ->--- <]>-- .+++. <++++ ++++[ ->--- ----- <]>--
--.<+ +++++ +++[- >++++ +++++ <]>++ +++++ +.<++ +[->- --<]> -.+++ +++.<
+++++ ++++[ ->--- ----- -<]>- ---.< +++++ +++[- >++++ ++++< ]>+++ +++.+
+++++ +++.+ +++++ .---- ---.< +++[- >---< ]>-.< +++++ +++[- >---- ----<
]>--- -.<++ +++++ ++[-> +++++ ++++< ]>+++ .<+++ [->-- -<]>- --.-- -.<++
+++++ +[->- ----- --<]> ----- .<+++ +++++ +[->+ +++++ +++<] >++++ ++.<+
+++[- >---- <]>-- ----. <++++ [->++ ++<]> +++++ +++.< +++++ ++++[ ->---
----- -<]>- ----- --.<+ +++++ +++[- >++++ +++++ <]>++ +.--- --.<+ +++++
++[-> ----- ---<] >---- ----- ----- -.<++ +++++ ++[-> +++++ ++++< ]>+++
.<+++ [->-- -<]>- --.+. <+++[ ->+++ <]>+. <++++ +++++ [->-- ----- --<]>
--.<+ +++++ +++[- >++++ +++++ <]>++ .+.<+ ++[-> ---<] >---- --.<+ ++[->
+++<] >++.< +++++ +++[- >---- ----< ]>--. <++++ +[->- ----< ]>--- -----
.---. +++.- --.<+ +++++ ++[-> +++++ +++<] >++++ +++++ .<+++ +[->+ +++<]
>++.- ---.< ++++[ ->+++ +<]>+ .<+++ [->-- -<]>- ----- .++++ +.<++ +++++
+[->- ----- --<]> ----- ---.< +++++ ++++[ ->+++ +++++ +<]>+ ++.<+ ++[->
---<] >---. ---.< +++++ +++[- >---- ----< ]>--- --.<+ +++++ ++[-> +++++
+++<] >++++ +++++ +++++ +.+++ ++.<+ ++[-> ---<] >---. ---.< +++[- >+++<
]>+++ +.<++ +++++ ++[-> ----- ----< ]>-.< ++++[ ->+++ +<]>+ +.<++ ++[->
----< ]>--. <++++ ++++[ ->+++ +++++ <]>++ ++++. +++.+ ++.-- ----- .<+++
[->++ +<]>+ ++++. <++++ +++++ [->-- ----- --<]> --.<+ +++++ ++[-> +++++
+++<] >+.<+ ++[-> +++<] >++++ .<+++ [->-- -<]>- .<+++ +++++ [->-- -----
-<]>- ---.< +++++ ++++[ ->+++ +++++ +<]>+ ++.<+ +++[- >---- <]>-- -.<++
+[->+ ++<]> +.--- ---.< +++[- >+++< ]>+.- ----- ---.. <++++ ++++[ ->---
----- <]>-- ----. <++++ +++++ [->++ +++++ ++<]> +++.- ----. <++++ ++++[
->--- ----- <]>-- ----- ----- ---.< +++++ ++++[ ->+++ +++++ +<]>+ ++.<+
++[-> ---<] >---. ---.< +++++ +++[- >---- ----< ]>--- --.<+ +++++ ++[->
+++++ +++<] >++++ +++++ +++++ .---- ----- .<+++ +[->+ +++<] >+++. ----.
<++++ +++++ [->-- ----- --<]> ---.< +++++ ++++[ ->+++ +++++ +<]>+ +.+.<
+++[- >---< ]>--- ---.< +++[- >+++< ]>++. <++++ ++++[ ->--- ----- <]>--
----- ----- ---.< ++++[ ->--- -<]>- ---.- --.++ +.--- .<+++ +++++ [->++
+++++ +<]>+ +++++ +++++ ++++. <++++ [->++ ++<]> +++++ +.+++ +++.- --.+.
<++++ ++++[ ->--- ----- <]>-- ----- .<+++ [->-- -<]>- --.<+ +++++ +++[-
>++++ +++++ <]>++ .<+++ +[->- ---<] >--.< +++[- >+++< ]>+++ +.+++ +++.<
++++[ ->--- -<]>- --.<
```

1 đoạn mã rất thú vị nhưng thực ra đây là ngôn ngữ lập trình [Brainfuck](https://en.wikipedia.org/wiki/Brainfuck) . Mình sử dụng http://esoteric.sange.fi/brainfuck/impl/interp/i.html để thực thi đoạn mã trên ta thu được hướng dẫn tìm kiếm thêm các hidden file.  Ta sử dụng https://www.extractpdf.com/ đễ extract ra các file ẩn ta thu được thêm 3 ảnh sau: 

![](https://images.viblo.asia/4d2810e1-abe6-4453-8a3a-0d3352485cad.jpg)
![](https://images.viblo.asia/07f76aec-c470-46d6-b461-64b5a14e4b75.png)
![](https://images.viblo.asia/30f4ecf8-289d-46f7-9bc8-c986c68e770d.png)


Chúng ta thử sử dụng `exiftool` để lấy ra metadata của các ảnh trên nhưng dường như chẳng có gì đặc biệt. Như vậy có thể các hình ảnh này chứa các hidden image bên trong. Ta sử dụng http://magiceye.ecksdee.co.uk/ đễ extract ra hidden image. Sau khi extract ta thu được ảnh sau: ![](https://images.viblo.asia/f35a45f5-b150-4da4-ae90-b3e3cde80556.png)

Do phần write-up của challenge này tương đối dài nên mình sẽ chia làm 2 phần, trong phần tiếp theo mình sẽ trình bày nốt về cách giải challenge này. Hi vọng các bạn đón đọc