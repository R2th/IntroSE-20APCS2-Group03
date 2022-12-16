![](https://images.viblo.asia/496e45ff-34d3-41d5-915e-09fad504d17f.gif)

# Regular Expression (RegEx) à? Nghe quen quen.

> ***Đã bao giờ bạn ở vào các tính huống sau đây?***

### Bạn cần xử lý validate (kiểm tra tính hợp lệ) các trường dữ liệu nhập vào ô Text

![](https://images.viblo.asia/1e7a1bf4-eb56-428c-b731-eb53970ffba9.png)

![](https://images.viblo.asia/8b35be52-a32e-418b-8ba6-985838f4f0bb.png)

### Bạn cần copy và paste rất nhiều text từ chỗ này sang chỗ kia

Ví dụ từ XML sang C#

![](https://images.viblo.asia/4b3505d9-e466-427e-8ee4-e7327ec16d12.jpg)

hoặc CSV, Excel sang C#

![](https://images.viblo.asia/2a11aac3-36a4-43d9-b3de-b75f36b41ab8.jpg)


### Tìm kiếm một chuỗi nằm ở nhiều dòng trong Visual Studio hoặc Notepad++

Ví dụ tôi cần tìm và xóa bỏ (replace all) các comment như thế này ở code cũ.

![](https://images.viblo.asia/b77a555f-0486-4fef-bf15-637fa70473c9.jpg)

### Kiểm tra bằng câu lệnh SQL xem đã insert đủ các trường vào DB hay chưa?

![](https://images.viblo.asia/f4a5e1ef-dbad-43b1-84f8-08c1884538af.jpg)

### Bạn cần bóc tách dữ liệu của một trang web.

Ví dụ extract (crawling) tách lấy dữ liệu từ một trang web để lưu lại vào cơ sở dữ liệu của bạn

![](https://images.viblo.asia/17aa1867-6f02-47b0-9884-6467e44a660d.jpg)


### Cơn ác mộng đọc một chuỗi string từ DB và cố gắng chuyển đổi nó sang DateTime

Chuỗi ngày tháng lưu vào CSDL rất đa dạng. Rất khó để dùng hàm DateTime.TryParse() để tự động chuyển đổi một chuỗi thành Datetime ngon lành cành đào.

![](https://images.viblo.asia/c40a1d3d-4f01-4f24-8749-119034a8f1ab.png)

### Tìm kiếm một chuỗi, lưu chuỗi đó lại và lấy chuỗi đã lưu chèn vào chỗ nào đó

Hay nói cách khác, ta cần thay một chuỗi bằng một chuỗi khác, trong chuỗi mới đó lại có chứa cả chuỗi vừa bị thay thế.
Như ví dụ dưới đây sẽ cho các bạn thấy. Ta cần tìm ra ClassName, nhưng không phải thay thế ClassName đó bằng Class khác mà ta sẽ nhét nó vào 2 vị trí thay vì chỉ có 1 vị trí như hiện tại.

![](https://images.viblo.asia/7a2da882-3374-4327-ae69-57e43cadbc6a.jpg)

![](https://images.viblo.asia/cc4d46c2-54d1-44a5-9dea-a2c6de67837e.gif)
#  Vậy RegEx có thể giúp gì cho chúng ta trong các trường hợp trên?
![](https://images.viblo.asia/d11d22d7-cc52-4e12-8f3f-b7c4abe8110e.gif)

Regular Expression sinh ra là để giúp cho cuộc đời của bạn bớt khổ. Hãy tưởng tượng xem bạn phải nai lưng ra copy-paste bao nhiêu code. Bạn hoàn toàn có thể download các tool về để replace giúp bạn. Nhưng bạn cần bao nhiêu tool cho đủ đây.

Thay vào đó, bạn hãy thử học RegEx. Bộ cú pháp này sẽ giúp cho bạn thao tác với chuỗi như dao chém chuối. Như ta thấy các ví dụ bên trên, tất cả đều là `XỬ LÝ CHUỖI` ví dụ `Cut Copy Paste` hoặc `Replace` chuỗi.  RegEx là ngôn ngữ giúp xử lý chuỗi rất mạnh.

RegEx không phải là một ngôn ngữ lập trình. Nó chỉ là một `BỘ CÚ PHÁP` dùng để bắt chuỗi. Nhưng nó cực kỳ phổ biến và bất kỳ ngôn ngữ lập trình nào cũng hỗ trợ. Nó có cả trăm ngàn ứng dụng và công cụ ăn theo. 

Hãy lần lượt xem qua các ví dụ sau đây để học cách sử dụng Regular Expression nhé.

#  Bắt đầu sử dụng Regular Expression

Để bắt đầu sử dụng và học cách dùng RegEx, mình hay dùng trang web https://regex101.com/. Giao diện như sau:

![](https://images.viblo.asia/df2fd4af-d0f0-4e92-bd56-5570086484d3.gif)

### Trước hết các bạn hãy đọc qua một lượt các quy tắc bắt chuỗi (matching) đơn giản nhất của RegEx

+ `[xyz]` Tìm và so sánh tất cả ký tự nằm trong dấu ngoặc vuông và trùng khớp với 1 ký tự trong dấu ngoặc vuông. Ví dụ: `[31]` sẽ trùng khớp với **3** hoặc **1**, `[0123456789]` sẽ trùng khớp với bất kỳ một ký tự nào trong khoảng từ **0** đến **9**.
+ `[a-z]` So sánh và trùng khớp với `một` ký tự nằm trong khoảng chỉ định. Ví dụ: `[a-z]` sẽ trùng khớp với một ký tự trong khoảng từ a đến z nằm trong chuỗi cần test. `[0-9]` sẽ trùng khớp với bất kỳ một ký tự nào trong khoảng từ **0** đến **9**.
+ `[^xyz]` So sánh và không trùng khớp với những ký tự nằm trong khoảng chỉ định. Dấu `^` (dấu mũ) nằm trong dấu ngoặc vuông là một dấu phủ định. Ví dụ: `[^a-z]` sẽ không trùng khớp với tất cả các ký tự nằm trong khoảng từ **a** đến **z**.
+ `^` Trùng khớp với phần đầu của chuỗi đích. Ví dụ: `^a` sẽ trùng khớp với chữ **a** trong chuỗi **abc**, `^\w+` sẽ trùng khớp với chữ đầu tiên – chữ **"the"** của chuỗi **"The quick brown fox jumps over the lazy dog"**.
+ `$` Trùng khớp với phần cuối của chuỗi đích. Ví dụ: `c$` sẽ trùng khớp với chữ c trong chuỗi abc, `\w+$` sẽ trùng khớp với chữ cuối – chữ **"dog"** của chuỗi **"The quick brown fox jumps over the lazy dog"**.
+ `+` Trùng khớp với 1 hoặc nhiều lần ký tự đứng trước nó. Ví dụ `\d+` sẽ chỉ trùng với chuỗi có từ 1 con số trở lên.
+ `*` Trùng khớp với 0 hoặc nhiều lần ký tự đứng trước nó. Ví dụ `\d*` sẽ trùng với chuỗi có chứa 1 chữ số hoặc k có chữ số nào cũng đc.
+ `?`  Trùng khớp với 0 hoặc 1 lần ký tự đứng trước nó. Tương tự như `*` nhưng nó lại chỉ nhân lên 1 lần. `*` thì nhân lên nhiều lần.
+ `.`  Trùng khớp với 1 ký tự đơn bất kỳ ngoại trừ ký tự ngắt dòng (line-break) và cũng không lấy được ký tự có dấu (unicode). Ví dụ: `.` sẽ trùng khớp với ký tự **a hoặc b hoặc c** trong chuỗi **abc**. Nhưng `.` sẽ không bắt được các chữ `ă` hoặc `ê`.
+ `x{n}` Trùng khớp đúng với n lần ký tự đứng trước nó. n là một số không âm. Ví dụ `\d{2}` sẽ bắt đc các số có 2 chữ số đứng liền nhau.
+ `x{n,}` Trùng khớp với ít nhất n lần ký tự đứng trước nó. n là một số không âm.Ví dụ `\d{2,}` sẽ bắt đc các số có từ 2 chữ số trở lên đứng liền nhau.
+ `x{n,m}` Trùng khớp với ít nhất n lần và nhiều nhất là m lần ký tự đứng trước nó. n và m là một số không âm và n <= m. Ví dụ: `a{1,3}` sẽ khớp với **hah, haah, haaah** nhưng không khớp với **haaaah**.
+ `x|y` Trùng khớp với x hoặc y. Ví dụ: `slow|fast` sẽ khớp với chữ **slow** hoặc **fast** trong chuỗi đích.
+ `\b` Trùng khớp với toàn bộ ký tự đứng trước nó. Ví dụ: `hello\b` sẽ trùng khớp với toàn bộ từ hello trong chuỗi **hello world** nhưng sẽ không khớp với chuỗi **helloworld**.
+ `\B` Ngược lại với `\b`, `\B` sẽ không khớp với toàn bộ mà chỉ 1 phần ký tự đứng trước nó. Ví dụ: `hello\B` sẽ trùng khớp với chữ hello trong chuỗi **helloworld** nhưng sẽ không khớp với chuỗi **hello world**.
+ `\d` Trùng khớp 1 ký tự số (digit).
+ `\D` Trùng khớp 1ký tự không phải số (non-digit).
+ `\s` Trùng khớp 1 ký tự khoảng trắng (whitespace) bao gồm khoảng trắng tạo ra bởi phím Tab.
+ `\S` Trùng khớp với 1 ký tự không phải là khoảng trắng (non-whitespace).
+ `\w` Trùng khớp với các ký tự là từ (word) bao gồm dấu `_` (underscore) và chữ số.
+ `\W` Trùng khớp với các ký tự không phải là từ (non-word). Ví dụ: `\W` sẽ khớp với ký tự `%` trong chuỗi **"100%"**.
+ `\uxxxx` Trùng khớp với 1 ký tự unicode. Ví dụ: `\u00FA` sẽ khớp với ký tự **"ú"**, `\u00F9` sẽ khớp với ký tự **"ù"**.
+ `\pL` Trùng khớp với `một ký tự` Unicode bất kỳ ngoại trừ dấu cách. Đây chính là cú pháp viết hoàn hảo hơn của dấu `.`,Ví dụ `\pL+` sẽ lấy được chuỗi `truyền`, `thuyết` trong chuỗi **"truyền thuyết"**.

![](https://images.viblo.asia/bb00ea2c-cb41-4090-bce0-1b7ce1893791.gif)

Đừng lo, hãy xem qua các ví dụ từ từ rồi bạn sẽ hiểu

## Ví dụ đơn giản

### Tìm chuỗi số

![Ví dụ 1: Đang load...(Nếu load quá lâu hãy ấn F5)](https://images.viblo.asia/f2448336-4cd5-4ceb-a147-f617228b24ed.gif)


### Tìm ngày tháng

![Đang load video...(Nếu load quá lâu hãy ấn F5)](https://raw.githubusercontent.com/chungminhtu/regex_practices/master/Regex_CaptureDate.gif)

Link demo:  https://regex101.com/r/3dNzjU/1

### Tìm ngày tháng chính xác

Trong ví dụ trên thì ta thấy có chuỗi **"60/60/2018"** cũng được coi là ngày tháng, như thế là không chính xác. Ta hãy viết lại cho chuẩn.

![Đang load video...(Nếu load quá lâu hãy ấn F5)](https://raw.githubusercontent.com/chungminhtu/regex_practices/master/RegEx_CaptureDate_Advance.gif)

Link demo: https://regex101.com/r/3dNzjU/2



### Cách "tóm lấy" string cần tìm đưa vào Group

![Đang load video...(Nếu load quá lâu hãy ấn F5)](https://raw.githubusercontent.com/chungminhtu/regex_practices/master/RegEx_MatchGroup.gif)



### Cách tạo ra code để dùng RegEx trong các ngôn ngữ lập trình

RegEx là bộ cú pháp, tuy nhiên để áp dụng nó vào các ngôn ngữ lập trình lại phải tuân thủ theo các thư viện và quy tắc lập trình để lấy ra được các Group đã capture (thu) được. Hãy xem các tạo code ngay sau đây:

![Đang load video...(Nếu load quá lâu hãy ấn F5)](https://raw.githubusercontent.com/chungminhtu/regex_practices/master/RegEx_GenerateCode.gif)


### Cách bắt lấy chuỗi bất kỳ

![Đang load video...(Nếu load quá lâu hãy ấn F5)](https://raw.githubusercontent.com/chungminhtu/regex_practices/master/RegEx_CaptureString.gif)
Link demo: https://regex101.com/r/3dNzjU/3

### Lấy một chuỗi nhưng không chứa 1 ký tự đặc biệt nào đó

Ví dụ bạn cần lấy 1 chuỗi dài, nhưng nếu chuỗi đó có chứa 1 ký tự đặt biệt nào đó, ví dụ ký tự `/` thì không được lấy dòng đó. Nghĩa là cần loại bỏ 1 ký tự đặc biệt ra khỏi tập kết quả (group matches) thu được.

![](https://images.viblo.asia/fb43d150-40c9-44b6-b829-ada6a4e16877.PNG)

Rất đơn giản, chúng ta hãy làm như sau để có thể loại bỏ dấu "/" ra khỏi kết quả thu được. https://regex101.com/r/ctuQwj/1

![2018-11-27_22-58-46.jpg](https://images.viblo.asia/d9d7d17b-4a2d-4dbc-824f-5533de443ecf.jpg)

Giải thích 1 chút, như mình đã nói bên trên, khi dùng `[^ab]` thì nó sẽ loại bỏ các kết quả có chứa ký tự **a** hoặc **b** ra khỏi tập đã lấy được. Ở đây bạn cần loại bỏ dấu `/` nên ta sẽ viết là `[^\/]`. Và vì chúng ta cần nhân bản nhiều lần các ký tự khác dấu `/` để tìm 1 chuỗi dài liên tiếp, cho đến khi gặp 1 số có 4 chữ số. Vậy thì ta sẽ viết thêm đuôi `*?` vào để thành `[^\/]*?`.

Bình thường nếu tìm một chuỗi dài liên tiếp, không quan tâm là ký tự hay chữ số, ta hay viết là `.*?`, do đó cách viết `[^\/]*?` thực ra là một biến thể của `.*?`.

Dấu chấm `.` sẽ bắt được một ký tự bất kỳ ngoại trừ dấu xuống dòng, do đó `.*?` sẽ chỉ bắt được chuỗi dài vô tận ở cùng 1 dòng (1 line). Do đó nếu bạn cần bắt được chuỗi nằm ở nhiều dòng cho đến khi gặp một đoạn chuỗi cố định nào đó, thì sẽ phải dùng đến chiêu sau đây.

Sử dụng `[\s\S]` để thay thế cho dấu `.` ta sẽ bắt được toàn bộ ký tự bất kỳ bao gồm cả dấu xuống dòng `/n`. Do đó để bắt được 1 chuỗi dài vô tận nằm ở nhiều dòng ta sẽ dùng `[\s\S]*`

### Lấy một chuỗi nhưng không chứa 1 chuỗi con đặc biệt nào đó

Bây giờ bạn không chỉ cần exclude (loại bỏ) một ký tự ra khỏi danh sách chuỗi thu được, bạn còn cần loại bỏ hẳn **"một chuỗi"** thì sao. Vậy hãy dùng cách sau đây:

Vấn đề lúc này cần phải dùng đến chức năng **Negative Lookahead** của Regex, cách hoạt động như sau:

![2018-11-28_23-09-49.jpg](https://images.viblo.asia/edbc76e0-cc46-4fc9-aa23-13ddd70b05a9.jpg)

Giả sử mình cần exclude (loại bỏ) một chuỗi (chứ không phải 1 ký tự như là ví dụ `[^\/]*?` như bên trên nữa) ra khỏi một chuỗi đã bắt được. Thì cần dùng cách viết `(?!abc)` (Chú ý là dấu `(` và `)` là bắt buộc phải viết để đủ cú pháp). Trong đó **abc** là 1 chuỗi các ký tự liền nhau cần loại bỏ. Nếu cần loại bỏ 2 hoặc nhiều chuỗi con thì sao? vậy ta sẽ viết là `(?!abc|def|gho)`. 

Vì chuỗi con nằm bên trong chuỗi cha, do đó chúng ta cần viết thêm 1 dấu chấm `.` ngay đằng sau `(?!\/bc)` và bọc toàn bộ khối đó lại thành 1 group. Rồi viết thêm `*?` bên ngoài để nhân bản các ký tự lên thành 1 chuỗi. 

Như vậy để viết Regex này ta phải tư duy từ bên trong ra bên ngoài. Và việc viết thêm **Negative Lookahead** kèm với dấu chấm dạng `((?!abc).)*?` thật ra cũng vẫn chính là một biến thể của `.*?` (bắt một chuỗi dài vô tận, nhưng không được chứa chuỗi con cần loại bỏ bên trong nó)

Link demo:   https://regex101.com/r/SThqo2/2


### Bắt 1 chuỗi bất kỳ nằm ở nhiều dòng (mutiline)

Biểu thức RegEx:  `<h1>[\s\S]*<\/h2>`

Sẽ bắt được cả toàn bộ chuỗi nhiều dòng sau đây: 
```
<h1>My First Heading</h1>

<p>My first paragraph.</p>


<h2>My first paragraph.</h2>
```
Giải thích tại sao lại bắt được. Rất đơn giản, là vì `\s` sẽ lấy được ký tự dấu cách, còn `\S` sẽ lấy được ký tự bất kỳ ngoại trừ dấu cách (và `\S` sẽ bắt được dấu xuống dòng `\n`). Nếu kết hợp 2 ký tự đó nhét vào một khung vuông `[\s\S]` tức là sẽ lấy được 1 trong 2 trường hợp. Sẽ bắt được toàn bộ các ký tự bất kỳ bao gồm cả dấu cách nếu gặp. Viết `[\s\S]*?` thật ra là nhân bản ký tự cần bắt lên nhiều lần để tìm một chuỗi dài vô tận.

Bình thường nếu tìm một chuỗi dài liên tiếp, không quan tâm là ký tự hay chữ số, ta hay viết là `.*?`, do đó cách viết `[\s\S]*?` thực ra là một biến thể của `.*?`.
Dấu chấm `.` sẽ bắt được một ký tự bất kỳ ngoại trừ dấu xuống dòng, do đó `.*?` sẽ chỉ bắt được chuỗi dài vô tận ở cùng 1 dòng (1 line). Do đó nếu bạn cần bắt được chuỗi nằm ở nhiều dòng cho đến khi gặp một đoạn chuỗi cố định nào đó, thì sẽ phải dùng đến chiêu sau đây.
Sử dụng `[\s\S]` để thay thế cho dấu `.` ta sẽ bắt được toàn bộ ký tự bất kỳ bao gồm cả dấu xuống dòng `/n`. Do đó để bắt được 1 chuỗi dài vô tận nằm ở nhiều dòng ta sẽ dùng `[\s\S]*`

Các bạn có thể xem link demo: https://regex101.com/r/irhKCk/1

# Sử dụng RegEx trong thực tế

Trong thực tế RegEx có thể được gõ trực tiếp ở bất kỳ trình Editor nào. Ví dụ mình hay dùng Notepad++, hoặc Visual Studio

![Đang load video...(Nếu load quá lâu hãy ấn F5)](https://github.com/chungminhtu/regex_practices/blob/master/Nodepad++KepChuoi.gif?raw=true)


# Thêm thật nhiều ví dụ cho bạn tham khảo (để xem sức mạnh của RegEx)
## Check một chuỗi ngày tháng bất kỳ có hợp lệ hay không tính theo năm nhuận

Biểu thức RegEx: 
```
^(((0?[1-9]|1[012])/(0?[1-9]|1\d|2[0-8])|(0?[13456789]|1[012])/(29|30)|(0?[13578]|1[02])/31)/(19|[2-9]\d)\d{2}|0?2/29/((19|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([2468][048]|[3579][26])00)))$
```

Sẽ đúng cho:
```
01/31/1905 | 1/9/1900 | 2/29/1904
```
Và sẽ không trùng với:
```
31/01/2005 | 02/29/2005 | 2/29/2005
```

## Check 1 chuỗi ngày tháng phải có cả ngày và giờ

Biểu thức RegEx: 
```
^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-./])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$
```


Sẽ đúng cho:
```
31/12/2003 11:59:59 PM | 29-2-2004 | 01:45:02
```
Và sẽ không trùng với:
```
12/31/2003 | 29.02.2005 | 13:30 PM
``` 

## Check 1 chuỗi bất kỳ xem có phải ngày hoặc giờ hay không

Biểu thức RegEx: 
```
^(?=\d)(?:(?!(?:(?:0?[5-9]|1[0-4])(?:\.|-|\/)10(?:\.|-|\/)(?:1582))|(?:(?:0?[3-9]|1[0-3])(?:\.|-|\/)0?9(?:\.|-|\/)(?:1752)))(31(?!(?:\.|-|\/)(?:0?[2469]|11))|30(?!(?:\.|-|\/)0?2)|(?:29(?:(?!(?:\.|-|\/)0?2(?:\.|-|\/))|(?=\D0?2\D(?:(?!000[04]|(?:(?:1[^0-6]|[2468][^048]|[3579][^26])00))(?:(?:(?:\d\d)(?:[02468][048]|[13579][26])(?!\x20BC))|(?:00(?:42|3[0369]|2[147]|1[258]|09)\x20BC))))))|2[0-8]|1\d|0?[1-9])([-.\/])(1[012]|(?:0?[1-9]))\2((?=(?:00(?:4[0-5]|[0-3]?\d)\x20BC)|(?:\d{4}(?:$|(?=\x20\d)\x20)))\d{4}(?:\x20BC)?)(?:$|(?=\x20\d)\x20))?((?:(?:0?[1-9]|1[012])(?::[0-5]\d){0,2}(?:\x20[aApP][mM]))|(?:[01]\d|2[0-3])(?::[0-5]\d){1,2})?$
```

Sẽ đúng cho:
```
31.12.6008 | 5:30 AM | 30-04-1066
```

Và sẽ không trùng với:
```
00/00/0000 | 99:99:99 | 29/02/2005
```



# Tóm lại:

* **Regular expressions** (hay còn gọi là **Biểu thức chính quy** – viết tắt là **RegEx**) là một **chuỗi ký tự đặc biệt** được dùng làm **mẫu** (**pattern**) để phân tích sự **trùng khớp** (**match**) của một tập hợp các **chuỗi con** cần lấy ra từ một **chuỗi cha**.
* **Chuỗi cha** sau khi kiểm tra và lấy ra được các **chuỗi con** thì kết quả được đưa vào các **Nhóm kết quả** (**Matches**).
* Trong mỗi **Matches** có các **Group** chứa các **chuỗi con** có thể **cut** lấy ra khỏi **chuỗi cha** (do người dùng định nghĩa chuỗi con cần **lấy** hoặc **không lấy** bằng cách viết thêm cặp ngoặc tròn `()` bao bọc chuỗi con cần lấy)
* **RegEx** có thể lấy chuỗi ra (**cut**) hoặc thay thế chuỗi (**replace**)
* Hầu hết những ngôn ngữ lập trình (**PHP, C#, Perl, Javascript…**) đều cung cấp các thư viện hoặc hàm xử lý để lập trình viên có thể làm việc với Regular expression.

# Tham khảo

 Tham khảo thêm toàn bộ cú pháp RegEx bằng tiếng Anh tại: https://www.cheatography.com/davechild/cheat-sheets/regular-expressions/

> Một số công cụ test RegEx Online
* https://regex101.com/
* http://regexr.com/
* http://www.regexpal.com/
* http://regexper.com/

# Bài tập về nhà

Bạn ngứa tay muốn thử học RegEx ngay và luôn cho nóng. Vậy hãy thử thực hành bằng một số bài tập từ dễ đến khó sau đây nhé.

***Bài tập nhập môn:***

1. Lấy ra các chữ có chữ test trong chuỗi sau: **“that tested test is testing the tester's tests”**
2. Lấy ra các số điện thoại trong chuỗi sau:  ** “p:444-555-1234 f:246.555.8888 m:1235554567”**
3. Lấy ra các mã màu RGB trong chuỗi sau: **“#FF006C ABC 99AAB7FF 0xF0F73611”**
4. Lấy ra các chữ có 4 ký tự trong chuỗi sau: **“drink beer, it's very nice!”**
5. Lấy ra tên file trong chuỗi URL sau: **“rapidshare.com/asd/asd/File.avi.html”**

> Đáp án ở phần comment nhé.

***Bài tập dành cho học sinh giỏi (lớp học thêm)***

1. Tìm cách lấy các URL trong chuỗi HTML sau: 
```html
Lorem gyum
<b>Betrag</b> von 
<a href="http://www.vektor.de">Vektoren</a>
(Länge eines Vektors)
<a href="gcfa.com">GCFA</a> 
<a href="//cdn.com/test.js">CDN</a> 
ist das Maß einer Menge sozu…
```
2. Tìm cách loại bỏ toàn bộ COMMENT trong đoạn code sau:
```js
var sample = 0; 
var my_string = "Hello World!"; 
// This is a comment! 
function do_stuff(){ 
// This is another comment! 
alert(‘somethings’);
/* this is a multiline
     comment */
}
```
3. Tìm cách lấy ra chuỗi tiếng Nhật trong chuỗi sau: “
```
This is a demo story　前に来た時は北側からで、当時の光景はいまでも思い出せる。And it is true.
```
4. Lấy ra những file ảnh và độ phân giải của ảnh từ chuỗi sau: 
```
.bash_profile
workspace.doc
img0912.jpg (1280x720)
updated_img0912.png (1024x768)
documentation.html
favicon.gif 
img0912.jpg (1920x1600)
access.htaccess
```
5. Đọc nội dung từ trang tin rss sau: http://rss.cnn.com/rss/edition.rss Lấy ra các Tiêu đề, ngày giờ đăng, nội dung tin vắn

> Đáp án các bạn post vào phần comment và cùng trao đổi nhé.

Nếu các bài tập trên đây vẫn chưa đủ, các bạn hãy làm thêm các bài tập tại trang https://regexone.com nhé, rất nhiều ví dụ hay.

# Kết bài

Hi vọng bài viết nhỏ này đã giúp bạn học được cú pháp viết RegEx và áp dụng vào công việc thường ngày. Mình dùng Regex rất nhiều và nó là trợ thủ đắc lực trong quá trình code.

Các bạn thì sao? bạn đã dùng Regex vào những việc gì? Hãy kể tên bên dưới comment để mình cùng học hỏi với nhé. 

Thanks các bạn đã đọc, hãy comment, upvote và share bạn bè thật nhiều nhé!

# Update v2.2: Thêm các bài tập để các bạn luyện thêm (theo yêu cầu của nhiều bạn, nhớ tự làm trước khi dòm đáp án nhé ^^!)
### BTU1. Tìm ra các chuỗi là số điện thoại trong chuỗi sau. Chú ý một số loại ra một số chuỗi không phải là số điện thoại
```
Positive:
+42 555.123.4567
+1-(800)-123-4567
+7 555 1234567
+7(926)1234567
(926) 1234567
+79261234567
926 1234567
9261234567
1234567
123-4567
123-89-01
495 1234567
469 123 45 67
89261234567
8 (926) 1234567
926.123.4567
415-555-1234
650-555-2345
(416)555-3456
202 555 4567
4035555678
1 416 555 9292
11234567890
123-456-7890
(123) 456-7890
1 (123) 456-7890
123 456 7890
1 123 456 7890
123.456.7890
1 123.456.7890
1.123.456.7890
+1 123.456.7890
+91 (123) 456-7890
+1-(800)-555-2468
1-234-567-8912
+22-432-359-3687

Negative:
926 3 4
8 800 600-APPLE
```

Lời giải https://regexr.com/38pvb

### BTU2. Tìm ra chuỗi là địa chỉ email trong chuỗi sau, chú ý loại bỏ các chuỗi k phải địa chỉ emai thực sự.
```
Acceptable
---------------
abc1.1@domain.com
abc.abc@domain.com
abc_41.15768@domain.com
12345@domain.com
12.12.23@domain.com
ABC.ABC.ABC.ABC0046@domain.com
abc_123_4595@domain.com
abc@asdas.co.in
abc@insta123.com
abc@inta.co.in

Non-Acceptable
---------------
abc@@insta.com.com.com
abc@insta..com
abc@insta%.com
abc@insta/.com
abc@insta\\.com
abc..abc@domain.com 
abc__abc@domain.com
abc.@insta.com
abc..de@insta.com
abc-@insta.com
abc-def@insta.com
abc+@insta.com
abc123..45@insta.com
abc%@insta.com
abc\\@insta.com
abc/@insta.com
abc@insta-.com
ABC.ABC.ABC.ABC0046@domain.com.com.com
```

Lời giải: https://regexr.com/3bcrb


### BTU3. Tìm cách lấy ra và ngăn cách chuỗi số sau thành có phần trăm phần nghìn.
```
12345678

Toi muon no tro thanh 12,345,678
```
Lời giải: regexr.com/4409r

### BTU4. Lấy ra các chuỗi ngăn cách bởi dấu phẩy theo định dạng của một file CSV như sau (chú ý là chuỗi bị xuống dòng):
```
12,\"Hello, my name is Borislav.\",\"\"\"Welc
ome\"\"\",\"welcome\",   what\'s up!
new entry
```

Lời giải: https://regexr.com/3apuc

### BTU5. Tìm và xóa đi toàn bộ các thẻ HTML trong đoạn text dưới đây:
```
Welcome to RegExr v2.0 by gskinner.com!
 Welcome
Edit the Expression & Text to see matches. Roll over matches or the expression for details. Undo mistakes with ctrl-z. Save & Share expressions with friends or the Community. A full Reference & Help is available in the Library, or watch the video Tutorial.

Sample text for testing:
abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ
xyz
xy
xy
xy
xy
0123456789 _+-.,!@#$%^&*();\\/|<>\"\'
12345 -98.7 3.141 .6180 9,000 +42
555.123.4567	+1-(800)-555-2468
foo@demo.net	bar.ba@test.co.uk
www.demo.com	http://foo.co.uk/
http://regexr.com/foo.html?q=bar
<!DOCKTYPE html>
<html>
	<head>
		< title> My website </title>
		<link >
	</head>
	<body>
		<h1> Hello World </h1>
		<p> goodbye world</p>
	</body>
</html>

<!DOCTYPE html>
<html>
  <head>
    <!--Устанавливаю кодировку-->
    <meta charset-\"utf-8\">
    <!--Устанавливаю заголовок-->
    <title>How Long You Life?</title>
    <!--Подключаею стили-->
    <link rel=\"stylesheet\" href=\"css/style.css\">
    <link rel=\"shortcut icon\" href=\"img/favicon.ico\" type=\"image/x-icon\">
  </head>
  <body>
    <div id=\"main\">
      <div id=\"head\">How much you have to live?</div>
      <div id=\"text\">Days Hours Min Sec</div>
      <div id=\"time\"></div>
    </div>    
    <script src=\"js/script.js\"></script>    
  </body>
</html>
```

Lời giải: https://regexr.com/3cak1


### BTU6. Tìm cách loại bỏ các chuỗi console.log() do lập trình viên viết để test ra khỏi code trước khi bàn giao
```
function(window,document, this) {
console.log(\"This should be only in debug mode);
anotherCode();
console.log(\"this
too\" + var +
\" =)\");
var variable;
console.
log(\"debug mode\");
do(foo);
console.
log(\"this was\" +
\" formatted\" +
 \" by \" + ideFormatter);
 
}(window, console, this));
```

Lời giải:  https://regexr.com/3fi66


### BTU7. Loại bỏ toàn bộ các đoạn comment code trong đoạn code sau đây:
```
var sample    = 0;
var new       = 1;
var my_string = \"Hello World!\";

// This is a comment!

function do_stuff(){
	alert(my_string);//another comment
}

/* This is
 * a multiline
 * comment!
 */

var something;

/* programs/applications 16/*(4*2)=2 */

if(sample > new){
  do_stuff(/* arguments here */);
}

//

/**/

```

Lời giải: https://regexr.com/3aeb7

### BTU8. Lấy ra các chuỗi là các URL đầy đủ trong đoạn text dưới đây:
```
Welcome to RegExr 0.3b, an intuitive tool for learning, writing, and testing Regular Expressions. Key features include: 
www.google.com
* real time results: shows results as you type 
* code hinting: roll over your expression to see info on specific elements 
* detailed results: roll over a match to see details & view group info below 
* built in regex guide: double click entries to insert them into your expression 
* online & desktop: regexr.com or download the desktop version for Mac, Windows, or Linux 
* save your expressions: My Saved expressions are saved locally 
* search Comm https://google.us.edi?34535/534534?dfg=g&fg unity expressions and add your own 
* create Share Links to send your expressions to co-workers or link to them on Twitter or your blog [ex. http://RegExr.com?2rjl6] 

Built by gskinner.com with Flex 3 [adobe.com/go/flex] and Spelling Plus Library for text highlighting [gskinner.com/products/spl].
```

Lời giải: https://regexr.com/39nr7


### BTU9. Lấy ra toàn bộ các URL của một video Youtube từ đoạn text test sau đây
```
video complex
https://www.youtube.com/watch?feature=something&v=videoid1&embed=something
http://www.youtube.com/watch?feature=something&v=videoid2&embed=something
www.youtube.com/watch?feature=something&v=videoid3&embed=something
youtube.com/watch?feature=something&v=videoid4&embed=something

video
https://www.youtube.com/watch?v=videoid1
http://www.youtube.com/watch?v=videoid2
www.youtube.com/watch?v=videoid3
youtube.com/watch?v=videoid4

other video
https://www.youtube.com/v/videoid1
http://www.youtube.com/v/videoid2
www.youtube.com/v/videoid3
youtube.com/v/videoid4

channel
https://www.youtube.com/channel/channelid1
http://www.youtube.com/channel/channelid2
www.youtube.com/channel/channelid3
youtube.com/channel/channelid4

user
https://www.youtube.com/user/username1
http://www.youtube.com/user/username2
www.youtube.com/user/username3
youtube.com/user/username4

search
https://www.youtube.com/results?search_query=search+query1
http://www.youtube.com/results?search_query=search+query2
www.youtube.com/results?search_query=search+query3
youtube.com/results?search_query=search+query4

Youtu.be video
https://youtu.be/videoid1
http://youtu.be/videoid2
youtu.be/videoid3

normal youtube link
https://www.youtube.com
http://www.youtube.com
www.youtube.com
youtube.com

Youtu.be link
https://youtu.be
http://youtu.be
youtu.be
```

Lời giải: https://regexr.com/3akf5



### BTU10. Lấy ra các đoạn text là giá trị màu RBG 
```
Should match 3 ou 6 digits hexadecimal numbers
#fff #FFF #Fff #ff004B
All numerical values can have leading zeros. Percentages can have decimals.
White spaces are allowed before and after values.
Should match rgb() colors with 3 values all between 0 and 255
rgb(0,0,0) RGB(124, 100, 0) rgb(255,255,255) Rgb( 0255, 00001, 02)
Should match rgb() colors using percentages all between 0 and 100
rgb(10%,10%,10%) rgb(100.0%, 2.5%, 0%) rgb(00010%, 0002%, 001%)
Should match rgba() colors with 3 values between 0 and 255 plus 1 decimal value between 0 and 1
rgba(255 , 0 , 0, 0.5 ) rgba(1,1,1,0.255) rgba(0,0,0,0)
Should match rgba() colors using 3 percentage values between 0 and 100 plus 1 decimal value between 0 and 1
rgba(10%,10% , 10%, 0.2) rgba(10%, 0025.2%, 1%, 0.0001)
Should match hsl() colors with first value between 0 and 360 and 2 more percentage values between 0 and 100
hsl(0,20%,100%) HsL(360,10% , 0.2% ) hsl(000350, 002%, 0004.1%)
Should match hsl() colors with first value between 0 and 360 and 2 more percentage values between 0 and 100 plus 1 decimal value between 0 and 1
hsla(140,2%,50%,0.2) hsla(0,0%,0%,0) hsla(001,002%,00001.2%,0000.254)

Should NOT match hexadecimal numbers with not exactly 3 or 6 digits
#f #ff #ffff #fffff #fffffff
Should NOT match invalid hexadecimal values
#ffg #fffffg
Should NOT allow space between function and opening parenthesis
rgb (0,0,0) rgba (0,0,0,0) rgb (0%,0%,0%) rgba (0%,0%,0%,0) hsl (0,0%,0%) hsla (0,0%,0%,0)
Should NOT match rgb() nor hsl() colors with more or less than 3 values
rgb(0,0,0,0) rgb(0,0) hsl(0,0%,0%,0) hsl(0,0%)
Should NOT match rgba() nor hsla() colors with more or less than 4 values
rgba(0,0,0) rgba(0,0,0,0,0) hsla(0,0%,0%) hsla(0,0%,0%,0,0)
Should NOT allow rgb values over 255, nor rgb values with decimals
rgb(256,0,0) rgb(100.2,0,0)
Should NOT allow percentages over 100
rgb(120%,10%,1%) hsl(200, 101%, 10%)
Should NOT allow alpha values over 1
rgba(0,0,0,1.2) hsla(120, 50%, 50%, 1.3)
Should NOT allow hue values over 360
hsl(361,50%,50%) hsla(361,50%,50%,0.5)
Should NOT match invalid hsl format
hsl(1%,2%,3%) hsl(5,6,7)
Should NOT match rgb() colors with mixed percentages and integers
rgb(255, 10%, 0) rgb(10%, 255, 0) rgba(10%, 255, 0, 0.3)
```

Lời giải: https://regexr.com/38lmo