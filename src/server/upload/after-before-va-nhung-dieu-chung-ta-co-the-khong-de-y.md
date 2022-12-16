Đọc tiều đề chắc hẳn mọi người cũng đã đoán được hôm nay chúng ta sẽ nói về chủ đề là `::after` và `::before` trong CSS.

`::after` và `::before` đã rất là quen thuộc với chúng ta trong quá trình học tập và làm việc, đặc biệt là các *Front End Developer*. Hôm nay mình xin chia sẻ sâu hơn một chút những gì mình đã tìm hiểu được về hai pseudo-element này, rất mong được mọi người ủng hộ .

![](https://images.viblo.asia/1a2987c9-c736-4e60-9165-a627b2cc7051.jpeg)

## ::after và ::before là gì?
`::after` và `::before` được gọi là các pseudo-elements hay còn được hiểu là các phần tử giả và chúng được sử dụng trong  **CSS** để tạo ra các phần tử giả trong element.

`::before` sẽ tạo ra một phần tử giả luôn luôn là element con đầu tiên của element được sử dụng `::before`.

Tương tự đối với `::after` nhưng phần tử giả lúc này luôn luôn là element con cuối cùng.

![](https://images.viblo.asia/b9264238-5b42-40d4-8d84-5b9b7b8990ee.JPG)

**Cú pháp**
```css
/* CSS3 syntax */
::after /*or ::before*/

/* CSS2 syntax */
:after /*or :before*/
```

Việc trong CSS3 chúng ta sử dụng `::` thay vì `:` như trong CSS2 với mục đích để phân biệt pseudo-element với pseudo-class.

## Một số lưu ý khi sử dụng

#### Thứ nhất

Tất cả các trình duyệt đều hỗ trợ cú pháp `:` của CSS nhưng đối với cú pháp `::` trong CSS3, chúng ta cần chú ý IE8 và Opera 4-6 chỉ hỗ trợ `:`. Vậy nên chúng ta nên sử dụng `:` thay vì `::` vừa ngắn gọn lại đảm bảo không gặp những lỗi không mong muốn. Mình xin phép sử dụng `:` từ giờ đến cuối bài viết.


#### Thứ hai

Bất kỳ khi nào sử dụng `:after` hoặc `:before` chúng ta đều cần khai báo `content: '';` cho phần tử giả đó, nếu không có `content` thì phần tử giả sẽ không được render ra trên DOM cũng như hiển thị lên trên website. Và `content` có thể chứa các giá trị: 
1.  Một chuỗi: `content: 'a string';`. Đối với các ký tự đặc biệt thì cần mã code đặt biệt, ví dụ như unicode.
2.  Một ảnh: `content: url('/path/image.jpg');`.  Ảnh được chèn vào sẽ có size giữ nguyên theo ảnh gốc và không thể resize được.
3.  Rỗng: `content: '';` rất hữu ích khi clearfix và chèn ảnh dưới dạng `background-image`
4.  Khi muốn xóa phần tử giả khỏi trang, chúng ta có thể sử dụng: `content: none;`

#### Thứ ba

Phần tử giả được tạo ra sẽ có `display: inline`.

#### Thứ tư

Đã bao giờ bạn cố gắng thêm `:after` hoặc `:before` cho thẻ `img` chưa? Mặc dù bạn đã khai báo `content` đầy đủ và style  mọi thứ cho nó nhưng vẫn không thấy `:after` (`:before`) của bạn đâu dẫu cho bạn kiểm tra trong dev tool vẫn thấy.

Nguyên nhân là do `img` không áp dụng được `:after` và `:before` hay nó rộng ra là các **replaced element** sẽ không áp dụng được `:after` và `:before`.

Vậy **replaced element** là gì? Chúng những element mà nội dung của chúng nằm ngoài phạm vi của *CSS formatting model*. Hay hiểu đơn giản hơn đó là những element mà **CSS** không thể style được. Gồm các thẻ như: `audio`, `video`, `canvas`, `svg`, ... Bạn có thể tham khảo thêm [tại đây](http://ahmed.amayem.com/html-replaced-elements-non-replaced-elements-examples/)

Vậy tại sao nội dung của các **replaced element**  lại nằm ngoài phạm vi của *CSS formatting model*. Bởi vì nội dung của chúng được lấy từ bên ngoài tài liệu `.html` của bạn.

VD: hình ảnh bạn đưa vào trang web bằng thẻ `img` sẽ được lấy link tuyệt đối hoặc tương đối vào nên nội dung của nó không thuộc document của bạn.
{@embed: https://codepen.io/numberboo/pen/XWJjvKO}

Nhưng ngoài các **replaced element** còn các element khác cũng không sử dụng được `:after ` hay `:before`. Đó là một vài type của thẻ `input`, cụ thể là các type mình đã test dưới đây:
{@embed: https://codepen.io/numberboo/pen/zYxKgwQ}

Trong một vài lần code, mình vô tình áp dụng `:after` và `:before` cho `input` type *text* và thật ngạc nhiên nó không hiện lên trên website của mình.

Mình có tìm hiểu vì sao mà các input này không nhận `:after` và `:before` và tìm thấy câu trả lời khá thuyết phục trên [stack overflow](https://stackoverflow.com/questions/2587669/can-i-use-a-before-or-after-pseudo-element-on-an-input-field).

Cụ thể, câu trả lời là `:after` và `:before` chỉ được áp dụng cho các *container element* hay các phần tử giả sẽ được render vào **bên trong** element đó. Và hiển nhiên `input` không thể chứa các element khác nên nó sẽ không sử dụng được.

Tuy nhiên điều này lại không đúng đối với các `input` type còn lại (VD: date, week,...) cho nên vẫn chưa thể khẳng định được câu trả lời ở trên có đúng hay không? Nếu mọi người có ý kiến khác đừng ngại ngần comment bên dưới để chúng ta cùng thảo luận.

## Ứng dụng tuyệt vời của :after và :before
`:after` và `:before` có rất nhiều ứng dụng tuyệt vời khi sử dụng trong trang web.
#### 1. Clearfix

Chúng ta có thể sử dụng `:after` để tạo ra một phần tử giả làm nhiệm vụ clear float thay cho việc tạo ra một `div`.
{@embed: https://codepen.io/numberboo/pen/JjobPNW}

#### 2. Custom checkbox, radio-button

{@embed: https://codepen.io/numberboo/pen/jOEVNXP}

#### 3. Các hiệu ứng hover đẹp mắt

{@embed: https://codepen.io/numberboo/pen/mdyObZv}

Ngoài ra còn nhiều ứng dụng khác của `:after` và `:before` mà mình chưa kể ra ở đâu nhưng chúng thực sự đem lại hiệu quả.

## Lời kết
Trên đây mình đã đưa ra những hiểu biết của mình về hai pseudo-element `:after` và `:before`.

Nếu có ý kiến góp ý nào, mọi người hãy để lại comment bên dưới nhé. Cảm ơn mọi người đã đọc bài viết.

## References

[https://css-tricks.com/almanac/selectors/a/after-and-before/](https://css-tricks.com/almanac/selectors/a/after-and-before/)

[https://developer.mozilla.org/en-US/docs/Web/CSS/::before](https://developer.mozilla.org/en-US/docs/Web/CSS/::before)

[https://developer.mozilla.org/en-US/docs/Web/CSS/::after](https://developer.mozilla.org/en-US/docs/Web/CSS/::after)

[https://stackoverflow.com/questions/2587669/can-i-use-a-before-or-after-pseudo-element-on-an-input-field](https://stackoverflow.com/questions/2587669/can-i-use-a-before-or-after-pseudo-element-on-an-input-field)