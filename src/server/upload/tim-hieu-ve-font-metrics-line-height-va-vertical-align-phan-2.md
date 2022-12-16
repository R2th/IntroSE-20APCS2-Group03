Bài viết được dịch từ bài [Deep dive CSS: font metrics, line-height and vertical-align](https://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align) của tác giả [Vincent De Oliveira](https://iamvdo.me/en).

Phần 1: https://viblo.asia/p/tim-hieu-ve-font-metrics-line-height-va-vertical-align-phan-1-Qbq5QLOJlD8


-----


# `vertical-align`: one property to rule them all

Tôi chưa đề cập đến thuộc tính `vertical-align`, dù nó là một nhân tố cần thiết để tính chiều cao của *line-box*. Thậm chí có thể nói rằng `vertical-align` có vai trò chủ đạo trong inline formatting context.

Giá trị mặc định của `vertical-align` là `baseline`. Bạn có còn nhớ các chỉ số ascender và descender của font không? Những chỉ số này xác định vị trí của baseline, cũng như tỉ lệ. Do tỉ lệ giữa ascender và descender hiếm khi nào là 50/50, nhiều vấn đề sẽ phát sinh, ví dụ như với các phần tử sibling.

Với đoạn code:

```html
<p>
  <span>Ba</span>
  <span>Ba</span>
</p>
```

```css
p {
  font-family: Catamaran;
  font-size: 100px;
  line-height: 200px;
}
```

Một thẻ `<p>` với 2 thẻ `<span>` sibling kế thừa `font-family`, `font-size` và `line-height` cố định. Các baseline sẽ trùng với nhau và chiều cao của line-box sẽ bằng với `line-height`.

![](https://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/vertical-align-baseline.png)

*Cùng các giá trị về font, cùng baseline, mọi thứ có vẻ ổn*

Phần tử thứ 2 có `font-size` nhỏ hơn thì sẽ như thế nào?

```css
span:last-child {
  font-size: 50px;
}
```

Sự căn chỉnh baseline mặc định có thể sinh ra một *line-box* cao hơn (!), như ảnh bên dưới. Tôi xin nhắc lại rằng chiều cao của *line-box* được tính toán từ điểm cao nhất tới điểm thấp nhất của các phần tử con của nó.

![](https://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/vertical-align-baseline-nok.png)

*Một phần tử con nhỏ hơn có thể làm chiều cao của line-box cao hơn*

Có thể có [tranh luận về việc ưu tiên sử dụng giá trị không đơn vị cho `line-height`](http://allthingssmitty.com/2017/01/30/nope-nope-nope-line-height-is-unitless/), nhưng thỉnh thoảng bạn cũng cần dùng các giá trị cố định để [tạo ra một vertical rhythm hoàn hảo](https://scotch.io/tutorials/aesthetic-sass-3-typography-and-vertical-rhythm#baseline-grids-and-vertical-rhythm). Thành thật mà nói, cho dù bạn lựa chọn kiểu giá trị nào, bạn vẫn sẽ gặp vấn đề với việc căn chỉnh inline.

Hãy xem một ví dụ khác. Một thẻ `<p>` với `line-height: 200px`, chứa một thẻ `<span>` kế thừa `line-height`:

```html
<p>
    <span>Ba</span>
</p>
```

```css
p {
    line-height: 200px;
}
span {
    font-family: Catamaran;
    font-size: 100px;
}
```

Chiều cao của *line-box* là bao nhiêu? Chúng ta mong muốn một giá trị là 200px, nhưng không phải. Vấn đề ở đây là thẻ `<p>` có `font-family` riêng biệt (mặc định là `serif`). Các baseline của thẻ `<p>` và thẻ `<span>` có thể khác nhau, do vậy chiều cao của *line-box* sẽ cao hơn dự kiến. Điều này xảy ra do trình duyệt thực hiện việc tính toán với việc coi mỗi *line-box* bắt đầu với một ký tự có độ rộng bằng 0, đặc tả gọi ký tự đó là *strut*.

> Một ký tự vô hình, nhưng có tác động hữu hình.

Tiếp tục, chúng ta đang đối mặt với vấn đề giống như trường hợp các phần tử sibling ở phía trên.

![](https://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/vertical-align-strut.png)

*Mỗi phần tử con được căn chỉnh như thể line-box của nó bắt đầu bằng một ký tự vô hình có độ rộng bằng 0*

Việc căn chỉnh baseline đã bị rối loạn, vậy thì dùng `vertical-align: middle` để giải quyết thì sao? Như đặc tả mô tả, `middle` "căn chỉnh điểm giữa của chiều dọc của box với baseline của box cha cộng với 1 nửa x-height của phần tử cha". Tỉ lệ của các baseline khác nhau, cũng như tỉ lệ của x-height, do vậy căn chỉnh với `middle` cũng không ổn. Tệ nhất là, trong hầu hết các trường hợp, `middle` không thực sự là "ở giữa". Có quá nhiều nhân tố tham gia vào việc tính toán mà không thể kiểm soát bằng CSS (x-height, tỉ lệ ascender/descender, v..v..).

Chú ý là, có 4 giá trị khác có thể hữu ích trong một số trường hợp:

- `vertical-align: top`/`bottom` căn chỉnh về phía đỉnh hoặc đáy của *line-box*

- `vertical-align: text-top`/`text-bottom` căn chỉnh về phía đỉnh hoặc đáy của *content-area*

![](https://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/vertical-align-top-bottom-text.png)

*Vertical-align: top, bottom, text-top và text-bottom*

Tuy nhiên hãy cẩn thận, trong tất cả các trường hợp, việc căn chỉnh được thực hiện trên *virtual-area*, tức là trên một chiều cao vô hình. Hãy xem ví dụ sử dụng `vertical-align: top` đơn giản sau. `line-height` vô hình có thể sinh ra kết quả kỳ dị, nhưng không bất ngờ.

![](https://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/vertical-align-top-virtual-height.png)

*vertical-align có thể sinh ra kết quả kỳ lạ, nhưng khi xem xét một cách trực quan bằng line-height thì không hề bất ngờ*

Cuối cùng, `vertical-align` cũng nhận các giá trị số giúp nâng cao hay hạ thấp box theo baseline. Tùy chọn này có thể sẽ có ích trong một số trường hợp.

# CSS tuyệt vời

Chúng ta đã nói về cách `line-height` và `vertical-align` hoạt động với nhau như thế nào, nhưng vấn đề bây giờ là: liệu font metrics có kiểm soát được bằng CSS? Câu trả lời ngắn là: không. Cho dù tôi có thực sự hy vọng là có. Dù sao thì, tôi nghĩ chúng ta nên nghịch thử một chút. Font metrics là các hằng số, nên chúng ta sẽ có thể làm được điều gì đó.

Sẽ ra sao nếu chúng ta muốn một đoạn văn bản sử dụng font Catamaran và chiều cao của các chữ cái viết hoa đúng bằng 100px. Dường như có thể làm được: hãy tính toán một chút.

Đầu tiên chúng ta gán giá trị cho các font metrics bằng CSS, sau đó tính `font-size` để các chữ cái viết hoa có được chiều cao là 100px.

```css
p {
    /* font metrics */
    --font: Catamaran;
    --fm-capitalHeight: 0.68;
    --fm-descender: 0.54;
    --fm-ascender: 1.1;
    --fm-linegap: 0;

    /* desired font-size for capital height */
    --capital-height: 100;

    /* apply font-family */
    font-family: var(--font);

    /* compute font-size to get capital height equal desired font-size */
    --computedFontSize: (var(--capital-height) / var(--fm-capitalHeight));
    font-size: calc(var(--computedFontSize) * 1px);
}
```

![](https://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/css-metrics-capital-height.png)

*Chiều cao của các chữ cái viết hoa giờ là 100px*

Khá đơn giản phải không? Nhưng nếu chúng ta muốn chữ được hiển thị ở giữa để phần khoảng trống còn lại được chia đều ở phía trên và phía dưới chữ "B" thì sao? Để làm được điều đó, chúng ta phải tính `vertical-align` dựa trên tỉ lệ ascender/descender.

Đầu tiên, tính chiều cao của `line-height: normal` và *content-area*:

```css
p {
    …
    --lineheightNormal: (var(--fm-ascender) + var(--fm-descender) + var(--fm-linegap));
    --contentArea: (var(--lineheightNormal) * var(--computedFontSize));
}
```

Sau đó, chúng ta cần:
- Khoảng cách từ đáy của chữ cái với cạnh dưới của box.
- Khoảng cách từ đỉnh của chữ cái với cạnh trên của box.

như sau:

```css
p {
    …
    --distanceBottom: (var(--fm-descender));
    --distanceTop: (var(--fm-ascender) - var(--fm-capitalHeight));
}
```

Giờ chúng ta có thể tính `vertical-align` bằng hiệu của các khoảng cách nhân với `font-size` được tính toán (chúng ta phải áp dụng giá trị này vào một phần tử con inline).

```css
p {
    …
    --valign: ((var(--distanceBottom) - var(--distanceTop)) * var(--computedFontSize));
}
span {
    vertical-align: calc(var(--valign) * -1px);
}
```

Cuối cùng, chúng ta gán giá trị `line-height` mong muốn và tính toán nó trong khi vẫn giữ được trạng thái căn chỉnh theo chiều dọc:

```css
p {
    …
    /* desired line-height */
    --line-height: 3;
    line-height: calc(((var(--line-height) * var(--capital-height)) - var(--valign)) * 1px);
}
```

![](https://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/css-metrics-results-line-height.png)

*Kết quả khi sử dụng các line-height khác nhau. Các chữ cái luôn hiển thị ở giữa.*

Thêm một biểu tượng với chiều cao bằng với chiều cao của chữ cái "B" giờ khá dễ dàng:

```css
span::before {
    content: '';
    display: inline-block;
    width: calc(1px * var(--capital-height));
    height: calc(1px * var(--capital-height));
    margin-right: 10px;
    background: url('https://cdn.pbrd.co/images/yBAKn5bbv.png');
    background-size: cover;
}
```

![](https://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/css-metrics-results-icon.png)

*Biểu tượng và chữ cái B với cùng chiều cao*

[Xem kết quả trên JSBin](http://jsbin.com/tufatir/edit?css,output)

Chú ý rằng ví dụ trên chỉ được dùng cho mục đích diễn giải. Bạn không nên phụ thuộc vào nó bởi:
- font metrics là các hằng số nhưng [các tính toán trên trình duyệt thì không](https://www.brunildo.org/test/normal-lh-plot.html) ¯\⁠(ツ)⁠/⁠¯
- nếu font không tải được, font dự phòng được dùng nhưng có thể có font metrics khác, do vậy xử lý các giá trị font metrics của nhiều font sẽ trở nên khó khăn.

# Tổng kết

Những điều chúng ta học được:
- inline formatting context rất khó hiều
- tất cả các phần tử inline đều có 2 chiều cao:
  - *content-area* (dựa trên font metrics)
  - *virtual-area* (`line-height`)
  - cả 2 chiều cao này đều không được xác định một cách rõ ràng
- `line-height: normal` được tính dựa trên font metrics
- `line-height: n` có thể tạo ra `virtual-area` nhỏ hơn `content-area`
- `vertical-alight` không đáng tin cậy
- chiều cao của một *line-box* được tính dựa trên các thuộc tính `line-height` và `vertical-align` của các phần tử con của nó
- chúng ta không thể lấy/gán font metris một cách dễ dàng bằng CSS

Nhưng tôi vẫn yêu CSS :)

# Tham khảo

- lấy giá trị font metrics: [FontForge](https://fontforge.github.io/en-US/), [opentype.js](http://opentype.js.org/font-inspector.html)
- [tính toán `line-height: normal` và một số tỉ lệ trên trình duyệt](http://brunildo.org/test/aspect-lh-table2.html)
- cao siêu hơn, giải thích về [inline formatting context](http://meyerweb.com/eric/css/inline-format.html)
- các đặc tả dự kiến hỗ trợ việc căn chỉnh theo chiều dọc: [Line Grid module](https://drafts.csswg.org/css-line-grid/)
- [Font Metrics API Level 1](https://drafts.css-houdini.org/font-metrics-api-1/), một bộ sưu tập các ý tưởng thú vị (Houdini)