Bài viết được dịch từ bài [Deep dive CSS: font metrics, line-height and vertical-align](https://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align) của tác giả [Vincent De Oliveira](https://iamvdo.me/en).


-----


`Line-height` và `vertical-align` là các thuộc tính CSS đơn giản. Đơn giản đến nỗi hầu hết chúng ta đều bị thuyết phục rằng mình đã hoàn toàn hiểu cách chúng hoạt động và cách sử dụng chúng. Nhưng không phải vậy. Thực sự chúng phức tạp, có lẽ là phức tạp nhất, do chúng đóng vai trò chính trong việc tạo thành một trong những tính năng ít được biết đến của CSS: inline formatting context.

Ví dụ, `line-height` có thể nhận giá trị là một độ dài hoặc một giá trị không đơn vị, với giá trị mặc định là `normal`. Được rồi, vậy normal nghĩa là như thế nào? Chúng ta thường hiểu rằng nó là (hoặc nên là) `1`, hoặc có thể là `1.2`, thậm chí [đặc tả của CSS còn không mô tả rõ ràng về vấn đề này](https://www.w3.org/TR/CSS2/visudet.html#propdef-line-height). Chúng ta biết rằng giá trị không đơn vị của `line-height` có tính tương đối với `font-size`, nhưng vấn đề là `font-size: 100px` khác nhau đối với các font-family khác nhau, vậy thì `line-height` luôn luôn giống hay khác nhau? Nó có thực sự nhận giá trị giữa 1 và 1.2? Và `vertical-align`, ý nghĩa liên quan đến `line-height` của nó là gì?

Tìm hiểu sâu về một cơ chế không-đơn-giản của CSS...

# Hãy nói về `font-size` trước

Hãy xem đoạn code HTML đơn giản bên dưới, một thẻ `<p>` chứa 3 thẻ `<span>`, mỗi thẻ sử dụng một `font-family` khác nhau:

```html
<p>
    <span class="a">Ba</span>
    <span class="b">Ba</span>
    <span class="c">Ba</span>
</p>
```

```css
p  { font-size: 100px }
.a { font-family: Helvetica }
.b { font-family: Gruppo    }
.c { font-family: Catamaran }
```

Sử dụng cùng một `font-size` với các font-family khác nhau sẽ tạo ra các phần tử với chiều cao khác nhau:

![](https://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/font-size.png)

*Các font-family khác nhau, cùng font-size, sinh ra các chiều cao khác nhau*

Tuy chúng ta đoán trước được việc đó, nhưng tại sao `font-size: 100px` không sinh ra các phần tử với chiều cao 100px? Tôi đã đo và nhận được các giá trị: Helvetica: 115px, Gruppo: 97px và Catamaran: 164px

![](https://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/font-size-line-height.png)

*Các phần tử với font-size: 100px có chiều cao thay đổi từ 97px đến 164px*

Dù có vẻ hơi kỳ lạ, nhưng điều này hoàn toàn nằm trong dự đoán. Lý do nằm ở bản thân các font chữ. Dưới đây là cách các font chữ hoạt động:

- Một font định nghĩa [em-square](http://designwithfontforge.com/en-US/The_EM_Square.html) (hay UPM, units per em) của nó, một dạng ô chứa mà các ký tự được vẽ ra. Ô vuông này sử dụng các đơn vị tương đối và thông thường có giá trị 1000 đơn vị. Nhưng nó cũng có thể là 1024, 2048 hoặc các giá trị khác.

- Dựa trên đơn vị tương đối của nó, các chỉ số của font chữ (font metrics) sẽ được xác định (ascender, descender, capital height, x-height, v..v..). Chú ý là một số giá trị có thể tràn ra ngoài em-square.

- Trên trình duyệt, các đơn vị tương đối có thể được co giãn để vừa với font-size mong muốn.

Hãy mở font Catamaran bằng [FontForge](https://fontforge.github.io/en-US/) để xem các chỉ số:

- em-square là 1000
- ascender là 1100 và descender là 540. Sau khi kiểm tra thử, có vẻ các trình duyệt sử dụng các giá trị *HHead Ascent/Descent* trên MacOS và *Win Ascent/Descent* trên Windows (các giá trị này có thể khác nhau!). Chúng ta cũng chú ý rằng *Capital Height* là 680 và *X height* là 485.

![](https://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/font-forge-metrics.png)

*Các chỉ số của font khi xem trên FontForge*

Điều đó có nghĩa là font Catamaran sử dụng 1100 + 540 đơn vị trên 1000 đơn vị em-square, kết quả là 164px khi thiết lập giá trị `font-size: 100px`. Chiều cao được tính toán (computed height) này định nghĩa *content-area* của một phần tử và tôi sẽ đề cập tới khái niệm này trong suốt phần còn lại của bài viết. Bạn có thể coi *content-area* là vùng mà thuộc tính `background` được áp dụng (điều này cũng không hoàn toàn chính xác).

Chúng ta có thể dự đoán rằng độ cao của các chữ cái in hoa là 68px (680 đơn vị) và các chữ cái in thường (x-height) là 49px (485 đơn vị). Kết quả là `1ex` = 49px và `1em` = 100px, không phải 164px (may mắn là `em` là giá trị dựa trên `font-size`, không phải chiều cao được tính toán).

![](https://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/upm-px-equivalent.png)

*Font Catamaran: UPM - Units Per Em - và lượng pixel tương ứng khi sử dụng font-size: 100px*

Trước khi tìm hiểu kỹ hơn, hay xem xem những thứ trên có ý nghĩa gì. Khi một phần tử `<p>` được hiển thị trên màn hình, nó có thể được tạo bởi nhiều dòng, dựa vào độ rộng của nó. Mỗi dòng được tạo bởi một hay nhiều phần tử inline (thẻ HTML hay các phần tử inline vô danh như text) và mỗi dòng này được gọi là một *line-box*. Chiều cao của một *line-box* dựa trên chiều cao của các phần tử con của nó. Do đó trình duyệt sẽ tính toán chiều cao của mỗi phần tử inline, từ đó tính ra chiều cao của *line-box* (từ điểm cao nhất đến điểm thấp nhất của các phần tử con). Kết quả là một *line-box* luôn đủ cao để có thể chứa tất cả các phần tử con của nó (mặc định là vậy).

> Mỗi phần tử HTML thực ra là một chồng các line-box. Nếu bạn biết chiều cao của mỗi line-box, bạn sẽ biết được chiều cao của phần tử đó.

Nếu chúng ta sửa code HTML ở trên thành thế này:

```html
<p>
    Good design will be better.
    <span class="a">Ba</span>
    <span class="b">Ba</span>
    <span class="c">Ba</span>
    We get to make a consequence.
</p>
```

nó sẽ sinh ra 3 *line-box*:

- *line-box* đầu tiên và cuối cùng chứa một phần tử inline vô danh (text)
- *line-box* thứ 2 chứa 2 phần tử inline vô danh và 3 thẻ `<span>`

![](https://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/line-boxes.png)

*Một thẻ `<p>` (đường viền đen) được tạo thành từ các line-box (đường viền trắng) chứa các phần tử inline (đường viền trơn) và các phần tử inline vô danh (đường viền nét đứt)*

Chúng ta thấy rõ rằng *line-box* thứ 2 cao hơn các *line-box* khác, do *content-area* của các phần tử con của nó, và chính xác hơn là phần tử sử dụng font Catamaran.

Phần khó trong việc tạo thành *line-box* là chúng ta không thực sự nhìn thấy hay kiểm soát được nó bằng CSS. Ngay cả việc áp dụng thuộc tính background vào `::first-line` cũng không cho chúng ta một dấu hiệu trực quan về chiều cao của *line-box* đầu tiên.

# `line-height`: các vấn đề và hơn thế nữa

Tới giờ, tôi đã giới thiệu tới các bạn 2 khái niệm: *content-area* và *line-box*. Nếu bạn nhớ, tôi đã nói rằng chiều cao của một *line-box* được tính toán dựa trên chiều cao của các phần tử con của nó chứ không nói rằng nó được tính toán dựa trên chiều cao của *content-area* của các phần tử con đó. Điều này tạo ra một khác biệt lớn.

Nghe có vẻ lạ, nhưng một phần tử inline có 2 chiều cao khác nhau: chiều cao *content-area* và chiều cao *virtual-area* (tôi đã tạo ra khái niệm *virtual-area* để đại diện cho chiều cao mà chúng ta nhìn thấy được, bạn sẽ không thấy trong đặc tả đâu).

- chiều cao *content-area* được định nghĩa bởi các chỉ số của font (như đã nói ở trên).
- chiều cao *virtual-area* là `line-height`, và nó là chiều cao được dùng để tính toán chiều cao của *line-box*.

![](https://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/line-height.png)

*Các phần tử inline có 2 chiều cao khác nhau*

Như vậy, điều này đã phá vỡ quan niệm thông thường rằng `line-height` là khoảng cách giữa các baseline. Trong CSS thì không như vậy.

![](https://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/line-height-yes-no.png)

*Trong CSS, line-height không phải là khoảng cách giữa các baseline*

Chiều cao khác nhau giữa *virtual-area* và *content-area* được gọi là leading. Một nửa leading được cộng thêm vào phía trên của *content-area*, nửa còn lại được cộng thêm vào phía dưới. Do đó *content-area* luôn ở giữa của *virtual-area*.

Dựa trên các giá trị được tính toán, `line-height` (*virtual-area*) có thể bằng, cao hơn hoặc thấp hơn *content-area*. Trong trường hợp *virtual-area* thấp hơn, leading sẽ âm và một *line-box* trông sẽ thấp hơn các phần tử con của nó.

Còn có các loại phần tử inline khác:

- các phần tử inline thay thế (`<img>`, `<input>`, `<svg`, v..v..)
- `inline-block` và tất cả các phần tử `inline-*`
- các phần tử inline xuất hiện trong một bối cảnh định dạng riêng biệt (ví dụ như trong một phần tử flexbox, tất cả các flex item là *blocksified*).

Với các phần tử inline riêng biệt này, chiều cao được tính dựa trên các thuộc tính `height`, `margin` và `border` của chúng. Nếu `height` là `auto` thì `line-height` được sử dụng và *content-area* sẽ bằng với `line-height`.

![](https://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/line-height-inline-block.png)

*Các phần tử inline thay thế, inline-block/inline-\* và blocksified có content-area bằng với chiều cao, hay line-height, của chúng*

Tuy nhiên, vấn đề của chúng ta là giá trị `normal` của `line-height` là bao nhiêu? Và câu trả lời, như việc tính toán chiều cao *content-area*, được tìm thấy trong các chỉ số của font.

Vậy thì hãy quay lại với FontForge. em-square của Catamaran là 1000, nhưng chúng ta thấy nhiều giá trị ascender/descender khác nhau:

- *Ascent/Descent* thông thường: ascender là 770 và descender là 230. Được sử dụng để vẽ ký tự (bảng "*OS/2*")
- Các chỉ số *Ascent/Descent*: ascender là 1100 và descender là 540. Được sử dụng để tính chiều cao *content-area* (bảng "*hhea*" và bảng "*OS/2*")
- chỉ số *Line Gap*. Được sử dụng cho `line-height: normal`, bằng cách cộng thêm giá trị này vào các chỉ số *Ascent/Descent* (bảng "*hhea*")

Trong trường hợp của chúng ta, font Catamaran định nghĩa line gap với giá trị là 0, nên `line-height: normal` sẽ bằng với *content-area*, tức là 1640 đơn vị, hay 1.64.

Để so sánh, font Arial định nghĩa em-square với giá trị 2048 đơn vị, ascender = 1854, descender = 434 và line gap = 67. Nghĩa là với `font-size: 100px` thì *content-area* sẽ là 112px (1117 đơn vị) (Người dịch: (1854 + 434) * 1000 / 2048 = 1117,1875) và `line-height: normal` là 115px (1150 đơn vị hay 1.15). Tất cả các chỉ số này là của riêng font và được thiết lập bởi người thiết kế font.

Do đó, hiển nhiên rằng việc đặt `line-height: 1` là một cách làm xấu. Tôi xin nhắc lại rằng các giá trị không đơn vị có tính tương đối với `font-size`, không tương đối với *content-area*, và trường hợp *virtual-area* thấp hơn *content-area* là nguồn gốc của rất nhiều vấn đề.

![](https://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/line-height-1.png)

*Sử dụng line-height: 1 có thể tạo ra một line-box thấp hơn content-area*

Nhưng không chỉ có mỗi `line-height: 1`. Trong số 1117 font được cài trên máy của tôi (phải, [tôi cài tất cả các font của Google Web Fonts](https://github.com/qrpike/Web-Font-Load)), 1059 font, khoảng 95%, có `line-height` lớn hơn 1. `line-height` của tất cả các font đó dao động từ 0.618 tới 3.378. Bạn vừa đọc đúng rồi đấy, 3.378!

Một chút chi tiết nữa về việc tính toán *line-box*:

- với các phần tử inline, `padding` và `border` làm tăng vùng background, nhưng không làm tăng chiều cao *content-area* (cũng như chiều cao của *line-box*). Do đó *content-area* không phải lúc nào cũng là thứ bạn nhìn thấy trên màn hình. `margin-top` và `margin-bottom` không có tác dụng.

- Với các phần tử inline thay thế, `inline-block` và *blocksified*: `padding`, `margin` và `border` làm tăng `height` nên làm tăng chiều cao *content-area* và *line-box*.

*(còn tiếp)*