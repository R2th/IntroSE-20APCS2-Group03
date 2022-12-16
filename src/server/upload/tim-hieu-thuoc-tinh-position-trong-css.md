Chắc hẳn khi các bạn làm layout, chuyển PSD sang HTML. Thì việc sử dụng **thuộc tính position** trong CSS là không thể thiếu. Như là khi dùng `:before` hay `:after` hoặc làm menu đa cấp hoặc header cố định một chỗ khi scroll trình duyệt…..<br><br>
Hay là di chuyển một mục nào đó mà không gây ảnh hưởng tới các phần khác. Giúp bạn linh động trong việc làm layout mà không phải lo lắng gì cả. Cho nên hôm nay chúng ta sẽ cùng tìm hiểu về **thuộc tính position trong CSS** nhé.
## Giá trị của thuộc tính position trong css
Thuộc tính position hiện tại có những giá trị thường được dùng sau:
* **relative**: Giá trị này thường được sử dụng để thiết lập vị trí của phần tử mà không gây ảnh hưởng tới việc hiển thị ban đầu cũng như các phần tử khác
* **absolute**: Giá trị này dùng để thiết lập vị trí của một phần tử theo phần tử cha có giá trị thuộc tính position là `relative` hoặc `absolute`
* **fixed**: Giá trị này giúp cho phần tử luôn cố định một chỗ khi chúng ta scroll trình duyệt
* **static**: Đây là giá trị hiển thị mặc định của thuộc tính position trong CSS.

Và đi kèm với thuộc tính position thì đó là các thuộc tính dùng để căn chỉnh vị trí cho phần tử
* **top**: Thuộc tính này giúp chúng ta căn chỉnh phần tử từ trên xuống dưới nếu giá trị > 0 và ngược lại nếu giá trị < 0 nó sẽ chạy ngược lên trên
* **bottom**: Thuộc tính này thì ngược lại so với top, nó giúp chúng ta căn chỉnh phần tử từ dưới lên trên nếu giá trị > 0 và ngược lại nếu giá trị < 0 nó sẽ chạy xuống dưới
* **right**: Thuộc tính này giúp chúng ta căn chỉnh phần tử từ phải qua trái nếu giá trị > 0 và ngược lại nếu giá trị < 0 nó sẽ chạy qua phải
* **left**: Thuộc tính nàygiúp chúng ta căn chỉnh phần tử từ trái qua phải nếu giá trị > 0 và ngược lại nếu giá trị < 0 nó sẽ chạy qua trái

Đọc xong thấy có vẻ khó hiểu nhỉ. Chắc chắn là vậy rồi. Đọc không mà. Vì thế mình có làm ví dụ từng thuộc tính một cho các bạn xem đây.
## Giải thích các vị trí trong position
Trước khi đi sâu giải thích các giá trị trong position. Mình xin giải thích trước các thuộc tính về vị trí như `top`, `right`, `bottom`, `left` thì mình có làm hình minh họa như dưới đây cho các bạn dễ hình dung nè

![](https://images.viblo.asia/5d8a3f7e-4e05-4699-af71-c84185af8ef0.png)

Khi một phần tử cha có thuộc tính `position: relative` và bạn muốn canh phần tử con theo phần tử cha đó và phần tử con sử dụng `position: absolute`. Chúng ta sẽ sử dụng các thuộc tính vị trí trên để căn chỉnh cho nó. Nên mình có sơ lược vài ý dưới đây cho các bạn

1. Nếu chỉ có giá trị top = 0 và left = 0 thì phần thì phần tử sẽ nằm góc bên trái trên cùng
2. Nếu chỉ có top = 0 và right = 0 thì phần tử sẽ nằm góc bên phải trên cùng
3. Nếu chỉ có bottom = 0 và left = 0 thì phần tử sẽ nằm góc bên trái dưới cùng
4. Và nếu chỉ có bottom = 0 và right = 0 thì phần tử sẽ nằm ở góc bên phải dưới cùng
5. Các trường hợp giá trị > 0 hay < 0 thì nó sẽ di chuyển phần tử theo ý bạn(đã giải thích ở mục trên)
6. Trường hợp đều có 4 giá trị top right bottom left và đều = 0 phần tử con(absolute) sẽ phủ hết phần tử cha(relative) nếu các bạn không set thuộc tính `width`, `height` cho phần tử con
7. Nếu chỉ có left = 0 và right = 0 thì phần tử con có độ rộng là 100% của phần tử cha nếu không set thuộc tính `width` cho phần tử con
8. Tương tự nếu chỉ có top = 0 và bottom = 0 thì phần tử con có chiều cao 100% của phần tử cha nếu không set thuộc tính `height` cho phần tử con
9. Ngoài ra các thuộc tính khác vẫn sử dụng chung với position đều được như `margin, background`…..

Các bạn xem thêm codepen dưới đây cho dễ hiểu hơn nha. Các bạn nên mở cái Codepen này lên và thay đổi giá trị `top`, `right`, `bottom` hay `left` để thấy được cách nó hoạt động nha.<br>

{@embed: https://codepen.io/blackzero/pen/BGNwNr}

## Giá trị relative

Như đã nói ở trên giá trị này giúp căn chỉnh phần tử mà không gây ảnh hưởng đến các phần tử khác. Bình thường chúng ta dùng `margin` hay `padding` chắc chắn sẽ đẩy các phần tử khác ra một đoạn gây ảnh hưởng tới layout.<br>

{@embed: https://codepen.io/blackzero/pen/mQJBbw}

Các bạn thấy chứ mình dùng `position: relative` cho phần tử image thế là nó nằm lên trên đoạn text luôn mà đoạn text không hề di chuyển. Nếu bình thường bạn không dùng `position: relative` mà bạn dùng `margin` hay `padding` sẽ ảnh hưởng ngay.

## Giá trị absolute

Đây giá trị này mình mới giải thích kỹ cho các bạn về các vị trí ở trên mục giải thích các vị trí. Thường thường giá trị `absolute` này khi được sử dụng cho phần tử mà phần tử cha của nó đang có `relative` hoặc `absolute` . Để lúc này nó sẽ chạy theo phần tử cha đó<br>

{@embed: https://codepen.io/blackzero/pen/BGNwNr}

Các bạn nhớ dùng Codepen này của mình thay đổi giá trị thử nhé. Hiện tại mình để `top: 0` và `left: 0 `nên nó nằm trên cùng bên trái đó. Có gì không hiểu kéo lên mục **giải thích các vị trí** ở trên nha.

## Giá trị fixed

Đây là giá trị thần thánh mà bạn hay gặp. Khi vào một website nào đó bạn scroll trình duyệt mà cứ thấy cái menu nó cứ đứng ở đó hoài hay là cái button chẳng hạn. Đó là giá trị `fixed`. Giá trị này không phụ thuộc vào phần tử cha hay gì cả. Khi nào scroll trình duyệt là nó hoạt động thôi. Xem ví dụ để hiểu nè.<br>

{@embed: https://codepen.io/blackzero/pen/WYvZQa}

## Ngoài lề giá trị sticky

Mình không có đề cập nó ở trên là vì nó không được hỗ trợ nhiều. Nhưng cũng nói sơ cho các bạn hiểu và hình dung. Nó cũng na ná `fixed` nhưng mà khi các bạn scroll đụng đó nó sẽ nằm như `fixed` và khi các bạn scroll lên ra khỏi nó nó sẽ quay lại vị trí ban đầu.

![](https://images.viblo.asia/8bc99e05-7064-4ca9-b47e-80b5c5ea769c.png)

Xem demo phát cho dễ hiểu nè. Vì nó không hỗ trợ nhiều nên mình khuyến khích các bạn không nên dùng nà.<br>

{@embed: https://codepen.io/blackzero/pen/XybejJ}

## Lời kết

**Thuộc tính position** trong CSS rất quan trọng nên mình khuyên các bạn nên học và nắm vững chúng thật kỹ càng. Nó được sử dụng rất nhiều trong việc code website hiện nay lắm đặc biệt là cắt layout và làm các thành phần như menu đa cấp(sử dụng nhiều position lắm).<br>

Nếu có thời gian mình sẽ viết thêm bài áp dụng thuộc tính position này vào trong một thành phần nào đó trong website cho các bạn dễ hình dung nha. Còn giờ thì cám ơn bạn đã đọc bài và chúc các bạn một ngày tốt lành.<br>

Ngoài ra Blog của mình viết rất nhiều kiến thức bổ ích về HTML CSS như [CSS Flexbox toàn tập](https://evondev.com/category/css-flexbox/), [CSS Grid toàn tập](https://evondev.com/category/css-grid/), cách cắt PSD sang HTML toàn tập rất chi tiết và đẩy đủ. Các bạn có thể [Nhấn vào đây](https://evondev.com/) để theo dõi nha. Xin cám ơn các bạn đã đọc bài.