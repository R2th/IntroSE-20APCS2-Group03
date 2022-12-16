Trong bài này chúng ta sẽ tìm hiểu 2 loại giá trị quan trọng nhất mà CSS có thể áp dụng cho các phần tử HTML, đó là: color và sizing. Nó cho phép chúng ta kiểm soát được màu sắc của các phần tử và màu sắc của chúng. Hầu hết các kiểu khai báo và giá trị CSS đều có tính tự giải thích, ví dụ như: `text-align: left`. Tuy nhiên, cũng có khá nhiều ngoại lệ, và cách xác định giá trị kỳ quặc. 

# CSS color
Chúng ta thường biết đến các từ mô tả màu sắc như: red, green, và lightgray ... Và CSS cũng support một lượng lớn các color names khác nhau, bạn có thể xem tài liệu online ở đây - [color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). Tuy nhiên, đây không phải là cách xác định màu CSS linh hoạt và phổ biến, chúng ta sẽ cùng tìm hiểu về những cách mạnh mẽ/ tốt nhất để apply màu trong CSS. 
## Hexadecimal colors
Có một phương pháp phổ biến để xác định màu sắc đó là, **hexadecimal RGB** (red-green-blue). Nghe qua thì thấy có vẻ phức tạp, tuy nhiên khái niệm về nó cũng khá đơn giản thôi.
Một cách nhanh chóng để hiểu được cách hexadecimal color hoạt động, đó là ta thử thay đổi màu của thẻ a từ red sang hexadecimal RGB color tương ứng. 
```css:index.html
/* GLOBAL STYLES */
a {
  color: #ff0000;
}
```
Khi save và reload lại page, ta thấy thẻ a vẫn có màu đỏ như cũ
![](https://images.viblo.asia/b8753cd4-b34e-402a-8f10-a3e02220918f.png)
Lý do gọi hệ màu này là hexadecimal RGB, bởi vì nó dùng cơ số 16, chứ không phải cơ số 10 thông thường. (“hexadecimal” là sự kết hợp của tiếng Hy Lạp và tiếng Latin, “six” (hex) và “tenth” (decimal)). Các chữ cái “a-f” tượng trưng cho các số từ 10 đến 15.

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
| - | - | - | - | - | - |-| - | - |-| - | - |-| - | - |-|
| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | a | b | c | d | e | f |
*Counting trong hex.*

Trong hệ cơ số 10, ta có thể đếm từ 0 tới 99 với 2 chữ số, trong đó 99 = 10² - 1. Tương tự hexadecimal (hex) cho phép ta đếm từ 0 tới ff ( = 16² - 1 = 255). Nói cách khác, khi đặt 2 số hex đứng cạnh nhau thì cho phép chúng ta đếm từ 0 tới 255 chỉ bằng 2 ký tự. Với 00 = 0 và FF hoặc ff = 255. (CSS hex không phân biệt chữ hay chữ thường, do vậy bạn viết chữ hoa hay chữ thường đều được.) <br>
Màn hình máy tính bao gồm các picture elements (hay gọi là `pixels`) và hiển thị màu sắc bằng cách kết hợp ánh sáng từ các phần tử red (đỏ), green (xanh lục), và blue (xanh lam) của một pixcel. Hexadecimal RGB đặt 3 bộ gồm 2 số hex đứng cạnh nhau để xác định giá trị red, green, và blue để tạo ra một một duy nhất. Vì vậy, **#ff0000** có thể đọc là **red=ff**, **green=00**, **blue=00** hoặc **red=255, green=0, blue=0.**

![](https://images.viblo.asia/9f668050-aea2-4095-9efc-b9cff76cb191.jpg)

*Các phần tử trong một pixel của màn hình máy tính*

Nếu cả 3 màu được bật ( nghĩa là, mỗi màu là **ff**, cả 3 là **#ffffff**) thì pixcel đó sẽ có màu trắng. Nếu cả 3 màu được tắt (nghĩa là, mỗi màu là **00**, cả 3 là **#000000**) thì pixcel đó sẽ có màu đen. Sự kết hợp của 3 màu này sẽ tạo ra các màu mà bạn nhìn thấy.
![](https://images.viblo.asia/1da9b93a-cb1f-489d-a77b-aacec71d3873.png)
*Đây là một số hexadecimal color.*

CSS cũng hỗ trợ cách viết tắt ngắn gọn trong trường hợp số hex giống nhau. Ví dụ, các chữ số giống nhau như là, `#222222, #cccccc, hoặc #aa22ff` thì ta có thể rút ngắn toàn bộ chỉ còn lại 3 chữ số, như này`: #222, #ccc, hoặc #a2f`. Khi trình duyệt thấy định dạng 3 chữ số như này, nó sẽ tự động điền các số còn thiếu. <br>
Do vậy, khi viết #f00 thay cho #ff0000 thì nó đều hiển thị màu đỏ. 
```css:index.html
.
.
.
/* GLOBAL STYLES */
a {
  color: #f00;
}
.
.
.
```
Hệ màu RGB thoạt đầu thì nhìn có vẻ khó hiểu, tuy nhiên khi thực hành nhiều, bạn sẽ hiểu được cách 3 giá trị này kết hợp với nhau để tạo ra các màu khác nhau, và các sắc thái khác nhau. Để tạo ra các màu phức tạp hơn, thì chúng ta có thể sử dụng công cụ [color picker](https://www.google.com/search?q=color+picker). Tuy nhiên, đối với một số màu phổ biến thì bạn cũng nên nhớ trong đầu. Ví dụ, phổ thang độ xám từ đen sang trắng luôn có 3 số hex giống nhau, ví dụ: tất cả là `00 (#000000) `thì là màu đen, tất cả là `ff (#ffffff)` thì là màu trắng, và số ở giữa `#979797` thì là màu xám.
![](https://images.viblo.asia/c69b1f13-6f89-4429-bf23-290aa29211a7.png)
*Thang màu xám trong Hexadecimal*

## Setting color and transparency via rgb() and rgba()
Ngoài việc sử dụng RGB hex, bạn có thể sử dụng RGB trực tiếp bằng phương thức` rgb()`, cái này cho phép bạn sử dụng số thập phân thay cho hex. Tóm lại, `rgb(255, 255, 255)` sẽ cho ra màu giống với `#ffffff`. Nhưng lý do chính để sử dụng RGB một cách trực tiếp đó là cho phép ta thiết lập **transparency** thông qua phương thức `rgba()`. <br>
Trong `rgba()` thì `a` là viết tắt của chữ `alpha`, bởi vì tên quy ước cho transparency level trong xử lý hình ảnh đó là `alpha level`. Và alpha level được chỉ định bằng một số từ 0 tới 1, trong đó 0 là transparent (trong suốt), 1 là opaque (đậm), và các giá trị ở giữa là định nghĩa mức độ trong suốt (vd, 50% là 0.5, 25% là 0.25, ...vv.) <br>
Ví dụ, ta sẽ thử đổi màu nên của thẻ `a` thành màu xám, bằng cách sử dụng `rgba()`. Tôi sẽ thử chọn màu xám khá đậm với giá trị trong RGB là 150, và khởi tạo opacity là 1. 
```css:index.html
.
.
.
.social-link {
  background: rgba(150, 150, 150, 1);
  color: blue;
}
.
.
.
```
Ta được kết quả như sau: 
![](https://images.viblo.asia/74b87a9a-4d2f-425f-b052-c8e4ebb7f6fa.png)
Tiếp tục, ta thử sửa opacity xuống 50% coi sao: 
```css:index.html
.
.
.
.social-link {
  background: rgba(150, 150, 150, 0.5);
  color: blue;
}
.
.
.
```
Kết quả là, ta có được nền màu xám nhạt hơn: 
![](https://images.viblo.asia/a9d3ddee-73e4-4ab3-be0d-a1333e2ddb09.png)
Thực sự, còn nhiều cách khác để set màu trong CSS (Ví dụ như HSL và HSLa). Tuy nhiên, trong bài này ta sẽ không đi sâu tìm hiểu chúng, vì trong thực tế cũng ít sử dụng.
# Introduction to sizing
Chúng ta thường sử dụng pixel để đo và đặt kích thước cho các phần tử như font, margins, hay padding, tuy nhiên trong thực tế có rất nhiều cách khó hiểu khác nhau để xác định kích thước các phần tử.
Do phải hiển thị nhiều phiên bản HTML trên nhiều máy tính và thiết bị khác nhau, cho nên các trình duyệt là một tập hợp các tiêu chuẩn phức tạp khác nhau, nhiều đến mức không tưởng tượng được.
Nếu bạn nghĩ đơn thuần là có thể chỉ định mọi thử bằng đơn vị pixcel (**px**), liệu có phải các màn hình chỉ là một mạng lưới lớn các pixel ? <br>
Chúng ta có thể thiết lập kích thước theo cách này nếu toàn bộ các thiết bị trên thế giới có cùng kích thước và độ phân giải màn hình giống nhau. Tuy nhiên, thật không may là nó khác nhau rất nhiều giữa các thiết bị, một số màn hình còn kết hợp nhiều pixel vật lý thành số lượng các pixel ảo nhỏ hơn. Điều đó có nghĩa, khi bạn tinh chỉnh kích thước nhìn trông rất đẹp trên màn hình của bạn rồi, nhưng ai đó sử dụng màn hình với độ phân giải màn hình nhỏ hơn thì có thể thấy kích thước phần tử đó rất lớn - đến mức không thể sử dụng nổi. Nhưng nếu ai đó sử dụng các thiết bị có độ phân giải cao (như Retina trên iPhone hoặc iMac) thì lại thấy chúng khá nhỏ. 
![](https://images.viblo.asia/d6249ab1-19ae-411d-bdca-d76388662fb9.png)

*Các màn hình có kích thước khác nhau, thì mật độ pixel cũng khác nhau.*

Tin tốt đó là các trình duyệt hiện nay đều cho phép ta zoom in hay zoom out để hiển thị tốt hơn, nhưng điều đó cũng có thể khiến cho các page sử dụng size tuyệt đối bị vỡ layout.  Trên các thiết bị hiện đại, nó có thể tự chỉnh sửa kết quả đầu ra, làm cho một thứ gì đó có mật độ điểm ảnh cực cao có thể hoạt động tốt trên các thiết bị có độ phân giải thấp hơn. <br>
Trong những năm gần đây, phương pháp được ưa chuộng nhất đó là sử đụng relative sizes (kích thước tương đối). Đó là kích thước của phần tử này sẽ dự trên kích thước của phần tử khác, hay thậm chí dựa trên kích thước của từng màn hình. <br>
Kiểu relative sizes này giúp giải quyết vấn đề vể tỷ lệ màn hình khác nhau, và nó cũng giúp dễ dàng thay đổi kích thước của page. Nếu thực sự muốn, thì ta vẫn có thể sử dụng absolute sizes (kích thước tuyệt đối) ở bất kỳ chỗ nào, tuy nhiên, ta nên tuân theo kích thước tương đối thì tốt hơn. 

# Pixels (and their less-used cousin, the point)
Pixel (px) và point (pt) là các đơn vị đo tuyệt đối, với 1 pixcel = 1/96 inch, và 1 point = 1/72 inch. Trong bài viết này chúng ta sẽ không tìm hiểu về point (vì thực tế nó không được sử dụng trong định kích thước web, mà thường được dùng trong in ấn hơn.) <br>
> **Style Note: Những người theo chủ nghĩa anti pixel**
> Trong quá trình tìm hiểu về phát triển web, chắc hẳn bạn sẽ gặp những người có tư tưởng không thích và chống sử dụng pixel. Họ tin rằng không bao giờ nên sử dụng kích thước tuyệt đối, mà hãy dùng kích thước tương đối. <br>
> Trong thực tế, đôi khi ta cảm thấy có những phần tử nếu sử dụng pixel thì hợp lý và tốt hơn, ví dụ như margins hay padding. <br>
> Về mặt lý thuyết, thì ta có thể thiết lập kích thước cho bất cứ phần tử nào bằng kích thước tương đối. Thực ra, không có quyết định bắt buộc nào cả, mà nó tùy thuộc vào yêu cầu dự án của bạn. Nếu sử dụng pixel mà trang web vẫn hiển thị tốt, layout không bị vỡ, và bạn đã quen với nó rồi thì hãy cứ tiếp tục sử dụng. Tuy nhiên, nếu enduser phàn nàn rằng việc đó gây ra layout bị vỡ, thì có khả năng bạn cần sửa lại thành kích thước tương đối.

Việc sử dụng kích thước tuyệt đối, giúp bạn thiết lập kích thước của phần tử một cách độc lập, không phụ thuộc vào kích thước của trình duyệt, độ phân giải màn hình, hay bất cứ thành phần nào trong trang. Nhưng, điều này có thể dẫn tới tình trạng là kích thước phần tử đó của bạn hoàn toàn không phù hợp với thiết bị đầu cuối của enduser. <br>
Việc sử dụng phép đo/ đơn vị tuyệt đối không hoàn toàn chỉ là xấu hoặc tốt. Bạn chỉ cần lưu ý rằng, những phần tử sử dụng kích thước tuyệt đối sẽ không tự động căn chỉnh kích thước theo các phần tử khác trên trang - có nhiều website hiện nay cũng đều kết hợp giữa kích thước tuyệt đối và tương đối. Điều cốt yếu là bạn cần biết được khi nào sử dụng loại kích thước nào.  <br>
Ví dụ, bạn có các banner quảng cáo trên website của mình, và bạn bán không gian quảng cáo dựa trên kích thước của phần tử (một trong những kích thước banner phổ biến nhất là 728x90px). Trong tình huống này bạn sẽ cần xác định kích thước tuyệt đối chứ không phải tương đối, để đảm bảo rằng, người thuê bao nhiêu sẽ được hưởng không gian quảng cáo bấy nhiêu. 

![](https://images.viblo.asia/c8b88258-b823-4838-b06d-86444f10fa8e.PNG)

*Kích thước quảng cáo như thế này chắc hẳn bạn đã thấy ở rất nhiều nơi.*

# Percentages
Có thể bạn đã biết về cách thiết lập kích thước bằng tỷ lệ phần trăm (%). Nó sẽ rất hữu ích khi ta muốn sử dụng kích thước tương đối, để ép một phần tử lấp đầy vào một khoảng trống. Có một vài điểm chú ý, bạn cần biết như sau:
* Tỷ lệ phần trăm này sẽ dựa vào parent container (container cha) đang bao bọc nó - chứ nó không được xác định bởi trình duyệt hay toàn bộ trang.
* Ta ít khi sử dụng tỉ lệ chiều cao, vì nó yêu cầu thiết lập chiều cao trên parent element - Mà ta không thể giả định chiều cao như giả định chiều dọc được.

Để hiểu cách kích thước % hoạt động như nào, ta sẽ tạo một thẻ div mới với tên class là **.bio-wrapper** , bao bọc thẻ div của class **.bio-box**.
```css:index.html
.
.
.
<div class="bio-wrapper">
  <div class="bio-box">
    <h3>Michael Hartl</h3>
    <a href="https://twitter.com/mhartl" class="social-link">
      here
    </a>
    <div class="bio-copy">
      <p>
        Known for his dazzling charm, rapier wit, and unrivaled humility,
        Michael is the creator of the
        <a href="https://www.railstutorial.org/">Ruby on Rails
        Tutorial</a> and principal author of the
        <a href="https://learnenough.com/">
        Learn Enough to Be Dangerous</a> introductory sequence. Michael
        is also notorious as the founder of
        <a href="http://tauday.com/">Tau Day</a> and author of
        <a href="http://tauday.com/tau-manifesto"><em>The Tau
        Manifesto</em></a>, but rumors that he's secretly a supervillain
        are slightly exaggerated.
      </p>
    </div>
  </div>
  <div class="bio-box">
    <h3>Lee Donahoe</h3>
    <a href="https://twitter.com/leedonahoe" class="social-link">
      here
    </a>
    <div class="bio-copy">
      <p>
        When he's not literally swimming with sharks or hunting powder stashes on
        his snowboard, you can find Lee in front of his computer designing
        interfaces, doing front-end development, or writing some of the interface
        -related Learn Enough tutorials.
      </p>
    </div>
  </div>
  <div class="bio-box">
    <h3>Nick Merwin</h3>
    <a href="https://twitter.com/nickmerwin" class="social-link">
      here
    </a>
    <div class="bio-copy">
      <p>
        You may have seen him shredding guitar live with Capital Cities on Jimmy
        Kimmel, Conan, or The Ellen Show, but rest assured Nick is a true nerd at
        heart. He's just as happy shredding well-spec'd lines of code from a tour
        bus as he is from his kitchen table.
      </p>
    </div>
  </div>
  <div class="bio-box">
    <h3>??</h3>
    <div class="bio-copy">
      <p>
        The Future
      </p>
    </div>
  </div>
</div>
.
.
.
```
Ở đây **.bio-wrapper** sẽ là parent container và xác định kích thước của children **.bio-boxes**. Và ta sẽ set width của class mới là 500px, và thay đổi width của .bio-box từ 200px (khá chật chội) thành 50%.

Nhìn trông có vẻ vẫn còn khá chật hẹp nhỉ ?

![](https://images.viblo.asia/c4bee2fe-1acf-4886-b558-462db33fb7da.PNG)

Lý do trông box đó khá nhỏ bởi vì nó đang lấy giá trị 50% của 500px là 250px. Để làm cho nó rộng rãi, to hơn thì ta cần thiết lập cho parent  của nó to hơn. Có một cách đơn giản đó là ta xóa width của class **.bio-wrapper** sau đó save và refresh lại. Khi này trình duyệt sẽ tự động giả định rằng phần trăm của width của **.bio-boxes** là dựa trên chiều rộng của trình duyệt. 
```css:index.html
.
.
.
.bio-wrapper {
}
.
.
.
```

![](https://images.viblo.asia/6079c654-2840-4eb9-abe8-6420199df4aa.PNG)
Giờ thì các box children đã to hơn rồi.

Như đã tìm hiểu ở trên, ta thấy rằng đơn vị % hoạt động tốt khi set kích thước cho chiều rộng, nhưng nó hoạt động khá dị đối với chiều cao, và không hoạt động đối với độ dày. Do vậy, chúng ta không thể sử dụng đơn vị % cho border.
Để kích thước % chiều cao có tác dụng, thì ta cần set chiều cao cho parent của nó trước. <br>
Vậy trong trường hợp bạn muốn set chiều cao của box là cả trình duyệt, bạn sẽ làm ntn ? Set height: 100% ư? nó sẽ không hoạt động. <br>
Ta hãy thử đoạn code dưới đây: <br>
```css:index.html
.
.
.
<div style="border:1px solid #000;width: 50%;height:100%;">I'm a percent
test</div>

<h1>I'm an h1</h1>
.
.
.
```
Ta sẽ có được chiều rộng là 50% của page, tuy nhiên chiều cao lại chỉ là bằng với chiều cao của nội dung trong div. (không giống như ta mong muốn.)
![](https://images.viblo.asia/7ef9a558-7655-4cf1-8d66-19cbaae50d36.PNG)

Ta sẽ thử xem điều gì sẽ xảy ra nếu ta set chiều cao cho thẻ body, như dưới đây: 
```css:index.html
.
.
.
/* GLOBAL STYLES */
body {
  height: 800px;
}
.
.
.
```
![](https://images.viblo.asia/12aa16fc-57d2-4d84-b9ab-82cdb5803cf7.PNG)

*Ta thấy rằng, thẻ div mới đã trở nên rất cao.*

Qua đoạn code ở trên ta thấy rằng, khi sử dụng % cho chiều cao, thì parent container phải được set chiều cao trước thì chiều cao % của children mới có tác dụng. Nếu không, trình duyệt sẽ chi cấp chiều cao cần thiết để đủ chứa content bên trong. <br>
## Percentage fonts
Chúng ta có thể sử dụng % để set kích thước cho text, tuy nhiên có một điều bạn hãy chú ý rằng, kích thước của font sẽ không dựa trên kích thước pixel của container mà nó dựa trên font-size của container đã kế thừa. <br>
Ví dụ chiều cao của box là 1000px, nhưng nó kế thừa font size 16px, do vậy nếu bạn set font size của phần tử con là 50% thì nó sẽ có chiều cao của 8px (50% của 16px) chứ không phải 500px như nhiều người lầm tưởng. Nói chung người ta thường sử dụng % như là cách để định dạng kích thước cho những thứ có hình hộp, và sử dụng phương pháp định kích thước khác cho font chữ (ví dụ như sử dụng đơn vị `em`).

# em
`em` là đơn vị tương đối để set kích thước cho text, và đó là đơn vị được nhiều người sử dụng và ưa thích. Tên gọi này bắt nguồn từ chiều rộng gần đúng của chữ `m,`, tuy nhiên việc sử dụng này mang tính lịch sử nhiều hơn. Trong CSS, một `em`, đại diện cho số lượng pixel bằng với kích thước phông chữ hiện tại của bất kỳ parent container nào của phần tử nhất định. <br>
Đối với kích thước văn bản thuẩn túy (không phải là kiểu header h1, h2) thì size mặc định của text là `16px`, do vậy kích thước mặc định của 1 em cũng là `16px`. <br>
Ví dụ, font size kế thừa parent container là 16px, nếu set kích thước là 0.5em thì sẽ tính 50% của 16px là 8px. Và 2.25em sẽ bằng 225% của 16px là 36px...vv <br>
Một trong những lý do giúp `em` trở nên hữu ích hơn so với pixel, đó là nó sẽ tự động thay đổi giá trị dựa trên font size kế thừa của parent object. Điều ngày có nghĩa là nếu bạn sử dụng `em` cho toàn bộ website của mình, bạn có thể chỉnh sửa toàn một text của website một cách đơn giản bằng cách chỉnh sửa font size base, và sau đó tất cả font trong container con sẽ tự động thay đổi theo tỷ lệ của việc chỉnh sửa mới này. <br>
Trong trường hợp bạn đã sử dụng pixel cho mọi thứ, thì bạn phải thay đổi bằng tay cho tất cả những chỗ cần thay đổi. <br>
Ví dụ ta thử set font size của class `.bio-copy` thành `0.5em`. Và bởi vì font size mặc định của toàn bộ page là `16px`, cho nên font size sau khi set sẽ trở thành `8px`. 
```css:index.html
.
.
.
/* BIO STYLES*/
.
.
.
.bio-copy {
  font-size: 0.5em;
}
.
.
.
```

![](https://images.viblo.asia/d653712b-51cb-47f5-b6af-aef964f244ef.png)

Và bây giờ ta xem nó sẽ thay đổi thế nào nếu ta thay đổi font size của parent element. Ta sẽ add lại class `.bio-wrapper` để bao bọc class `.bio-box`, từ đó ta có thể set lại base font size, bằng cách add thêm CSS rule. Đó là ta sẽ thay đổi font size default từ 16px thành 24px. Do vậy, `.bio-box` đang có font size là 0.5em (50% của 24px ) sẽ trở thành 12px.
```css:index.html
/* BIO STYLES */
.
.
.
.bio-wrapper {
  font-size: 24px;
}
.
.
.
```
Để xác định được kích thước font chữ là bao nhiêu, trình duyệt sẽ thu thập dự liệu font chữ từ con tới cha, cho tới khi tìm được font chữ tuyệt đối, sau đó tính toán ngược lại cây để có được font chữ chính xác. Như đã nói ở trên, nếu không tìm thấy giá trị tuyệt đối như vậy, trình duyệt sẽ lấy font size mặc định là 16px, tuy nhiên ta đã thay đổi parent div thành 24px, do đó các kích thước của các phần tử con cũng sẽ thay đổi theo. <br>
Kết quả là, font size 0.5 em không phải là 50% của 16px nữa, mà trở thành 50% của 24px, là 12px. Như vậy kích thước font của .bio-box tự động tăng từ 8px lên 12px, như bên dưới:

![](https://images.viblo.asia/7d3309de-78f2-45f9-ae1b-491126c43249.png)

Một trong những thuộc tính quan trọng của đơn vị em đó là, nó có tính tích lũy. Nếu một phần tử được set font size là 0.5em, được đặt trong một phần tử khác cũng được set font size là 0.5em, thì kích thước font chữ cuối cùng sẽ là 0.5×0.5=  0.25em. Ví dụ, base size là 24px, thì phần tử được lồng sâu nhất có kích thước là 25% của 24, hay là 6px. Hiệu ứng tích tũy này có thể sẽ hữu ích, hoặc nó cũng có thể vô tình gây ra lỗi hiển thị, nên bạn cần cẩn thận với nó. <br>
Code hiển tại của chúng ta đang bao gồm những thẻ div lồng nhau, đó là `.bio-copy` nằm trong `.bio-box` và nằm trong` .bio-wrapper`. Ở trên ta đã thay đổi font size của `.bio-copy` thành 0.5em, nếu giờ ta tiếp tục thay đổi font size của `.bio-box` thành 0.5em, thì kết quả ta thu được sẽ là 50% của 50% của 24px, là 6px.
```css:index.html
.
.
.
.bio-box {
  border: 1px solid black;
  font-size: 0.5em;
  width: 50%;
}
.bio-copy {
  font-size: 0.5em;
}
.
.
.
```
Khi này font size sẽ trở nên khá nhỏ:

![](https://images.viblo.asia/56ce0ba7-90e6-41d3-8bc5-dd8c975f7713.png)

Như đã trình bày ở trên, trình duyệt sẽ bắt đầu đi từ .bio-copy, nó đi lên một cấp tới class cha, nó phát hiện thấy lệnh set font chữ tương đối là 50%, nó lại đi tiếp lên một cấp nữa để tìm kích thước font chữ tuyệt đối, và nó thấy rằng class .bio-wrapper đang set kích thước tuyệt đối là 24px. Do đó, nó sẽ quay trở lại phần tử con .bio-box và set font size thành 12px, nó quay lại tiếp phần tử con cuối cùng .bio-copy và set font size thành 6px. <br>
Hoặc nó cũng có thể hoạt động theo một cách khác, nếu ta set font chữ của .bio-box và .bio-copy thành 1.5 em, thì trình duyệt sẽ hiển thị font chữ rất lớn là 54px (bằng cách tính 24×1.5×1.5=  54px). 

![](https://images.viblo.asia/042f540f-ecda-438c-a868-2104638b678b.png)

Font chữ quá vẻ quá lớn đúng k nào. Ta có thể set font size phù hợp hơn đó là khoảng 1em. 
```css:index.html
.
.
.
.bio-box {
  border: 1px solid black;
  font-size: 1em;
  width: 50%;
}
.bio-copy {
  font-size: 1em;
}
.
.
.
```
Cho đến thời điểm hiện tại, ta mới sử dụng đơn vị `em` cho font size của ký tự, tuy nhiên thực tế là đơn vị `em` có thể sử dụng cho cả margin, padding hay chiều rộng. 

<br><br><br>

*Hết. Chúng ta sẽ cùng nhau tìm hiểu các chủ đề khác trong CSS ở các bài viết lần tới nhé.<br>
Nguồn: [Learn-enough](https://www.learnenough.com/)*