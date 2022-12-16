## Introduction
Trong quá trình phát triển phần mềm, cùng với mong muốn sản phẩm của `team` sẽ có một trải nghiệm người dùng tốt, chúng ta luôn phải đối mặt với các vấn đề như *tốc độ `load` các tài nguyên quá chậm, thời gian chờ khởi tạo quá lâu do phải chờ đợi một số nội dung `chưa-thật-sự-cần-thiết`, rồi thì là hiện tượng `FOUC` `(flash of unstyled content)` khi `styles` chưa sẵn sàng, vân vân và mây mây...* 🥴🥴 

Để có thể có những giải pháp nhằm hạn chế những vấn đề trên, chúng ta cần hiểu rõ về quá trình `rendering` của `browser` đối với một `web page`. Làm sao để nó có thể hiển thị ra màn hình từ các `file HTML/CSS/JS` hay các tài nguyên khác ?

![](https://images.viblo.asia/452d0008-c170-4cfc-aca6-2f36d2e3dd0c.gif) ![](https://images.viblo.asia/31f88b92-6c1c-4c86-aa59-94a6de76b272.png)

<br/>

*Trong bài viết này, chúng ta sẽ cùng nhau đi trả lời câu hỏi trên nhé ^^*


*Bắt đầu thôi nào !*


## Rendering process

Khi `browser` gửi `request` tới `server` để `fetch` một `HTML file`, `server` sẽ trả về một `HTML page` dưới dạng `binary stream format` - một `text file` với `response` trên `header`:

```js
Content-Type: 'text/html';  // MIME Type
Charset='UTF-8';           // UTF-8 character encoding
```

<br/>

Bạn có thể xem qua trên tab `Network` trong cửa sổ `Google Chrome DevTools` *(mở bằng tổ hợp `Cmd + Option + I` hoặc `Ctrl + Shift + I`)* như dưới đây:

![](https://miro.medium.com/max/2000/1*Tm-HPhmGA0BL7HIj38H8Qw.png)

Nếu phần `header` không có thông tin này, `browser` sẽ không hiểu cách xử lý `file` vừa tải về như thế nào và nó sẽ hiển thị ở định dạng `văn bản thuần túy`.

Còn nếu mọi thứ đều ổn, từ các thông tin này, `browser` có thể `convert` `binary format` sang `text file` có thể đọc được. Từ đây, nó có thể bắt đầu đọc `HTML file`.

Quá trình này cũng diễn ra tương tự với các tài nguyên khác như *`CSS files`, `Images`, `JS files`, etc.*  😸😸

<br/>

Vẫn biết mỗi `browsers` khác nhau đều có những cơ chế hoạt động khác nhau, song, sơ đồ dưới đây mô tả một cách chung nhất **quá trình `rendering`** khi chúng `compile` các `source code HTML/CSS` từ trên `server` xuống `client`:

![](https://www.phpied.com/files/reflow/render.png)

*Bây giờ, chúng mình cùng nhau điểm qua từng giai đoạn nhé* *😺😺*

### DOM tree
`Browser` sẽ đọc toàn bộ các thẻ trong `HTML source code` rồi sau đó xây dựng một `DOM tree`.

`DOM` là viết tắt của `Document Object Model`.
- Mỗi `HTML tag` tương ứng với một `node` trong `DOM Tree`.
- Mỗi `text` bên trong `HTML tag` sẽ tương ứng với một `text node`.
- `Root node` trong `DOM tree` là một `documentElement` *(`<html> tag`)*.

<br/>

![](https://miro.medium.com/max/1040/1*YSA8lCfCVPn3d6GWAVokrA.png)

<br/>

*Bạn có thể đọc thêm về `DOM` qua bài viết về [**Original DOM - Shadow DOM - Virtual DOM tại đây**](https://haodev.wordpress.com/2019/06/21/original-dom-vs-shadow-dom-vs-virtual-dom/).*

**Như vậy, nếu `file HTML` có mỗi thẻ `<h1>DevNotes</h1>` thì `DOM Tree` chỉ có `một-node-duy-nhất` là `h1` thôi đúng không ?**

![](https://images.viblo.asia/1a2a9f33-4f2e-4471-982d-1176325f0f22.gif)

Để biết được kết quả chính xác là gì, bạn thử tạo một `file HTML` có nội dung như vậy sau đó mở trên `browser`, kiểm tra thử trong tab `Element` trong `Google Chrome DevTools Console` nhé 😉😉))

### CSSOM Tree

`CSSOM` là viết tắt của `CSS Object Model`. 

Sau khi `DOM tree` được tạo ra, `browser` sẽ đọc toàn bộ `style sources` *(`user-agent CSS`, `external`, `embedded`, `inline`, etc.)*, xác định `styles` của các `element node` tương ứng dựa vào tính chất `specificity & cascades` trong `CSS` để tạo ra `CSSOM tree` *(style structure)* tương ứng:

![](https://miro.medium.com/max/714/1*DJg1yRx-AzkZposWbJKcaA.png)

##### Notes:
- `Browser` có xu hướng `ignore` một số dòng `code` nó không hiểu đi *(ví dụ như với các `prefix` của các `browsers-khác-browser-hiện-tại` như `-moz`, `-webkit`, `-o`, etc.)*

- Mỗi `node` sẽ chứa các `CSS style information` cho từng `DOM element` tương ứng *(ngoại trừ những `elements` không hiển thị ra màn hình như `<meta> tags`, `<script> tags`, `<title> tag` , etc.)*

### Render tree

Sau khi đã có `DOM Tree` và `CSSOM tree`, `browser` sẽ `combine` chúng lại thành một `Render tree`.

`Render tree` sẽ bao gồm các `nodes`, `text nodes` và các `styles` tương ứng:

![](https://miro.medium.com/max/2000/1*8HnhiojSoPaJAWkruPhDwA.png)


Mỗi `node` trên `render tree` thường được gọi là mỗi `frame` *(cũng có thể xem như một `CSS box` và tuân theo `box model`)*.

Từ đây, `browser` sẽ `paint` *(`draw`)* các `nodes` của `Render tree` lên màn hình.

<br/>

*Hmmm*,

***Như vậy thì `DOM tree` và `Render tree` có gì khác không ?*** 

![](https://images.viblo.asia/29ad79f6-3411-4167-b694-38a63e39fcfb.PNG)

*Mình cùng nhau so sánh nào !* 

### DOM Tree vs. Render Tree

Nhìn vào sơ đồ trên thì có thể nhận ra được luôn rằng một cái chưa áp dụng `styles` và một cái là áp dụng `styles` rồi đúng không nào ^^

Và chính vì điểm khác nhau này, điều mình muốn lưu ý ở đây là trong một vài trường hợp, `Render tree` có thể sẽ `bớt cồng kềnh` hơn `DOM tree` một chút.

Xét ví dụ cho dễ hình dung nhé, giả sử mình có một thẻ `<h1>` chẳng hạn. Như vậy, `node h1` sẽ tồn tại trong `DOM tree`.

Trong `CSS` mình có `style` cho nó là `display: none`, như vậy, khi trong `Render tree` sẽ không còn `node h1` này nữa. 

Đây cũng là một `điểm-khác-nhau-cơ-bản` để phân biệt giữa cách mà `display: none` vs. `visibility:hidden`/`opacity: 0` được áp dụng đối với một `element`.

Điều này cũng tương tự với các `invisible elements`, như `<head> tag` hay bất kì  `<meta> tag`,  `<title> tag` nha. Chúng không được hiển thị lên màn hình nên không có trong `Render tree` mà chỉ tồn tại trong `DOM Tree` thôi 😺😺

## Repaint & Reflow

*Quá trình `rendering` ban đầu là như thế, song, nếu có một số thay đổi về `input information` như người dùng thêm vào phần tử này, đổi màu phần tử kia,... thì `browser` sẽ phải xử lý như thế nào đây ?*

*Chúng ta cùng tìm hiểu thêm 2 từ khóa nữa là `Reflow` và `Repaint` nhé ^^*

### Reflow
Quá trình một phần của `render tree` hay một số `node` được tính toán lại kích thước được gọi là **`reflow`** *(hoặc có thể gọi là **`relayout`** hay **`layouting`**)*.

> Parts of `render tree` (or the whole tree) are revalidated ⇒ Node dimensions recalculated.

<br/>

Nói cách khá, đây là tập hợp nhiều tiến trình mà `browser` tính toán lại kích thước và bố trí lại vị trí của các `elements` trên `web page`.

*Tuyệt vời đúng không nào, trình duyệt lo hết 🎶🎶 . . .*

Thế nhưng nhược điểm của quá trình này là nó **chạy-đồng-bộ**, tức là `reflow` mà chưa chạy xong thì thằng đằng sau cứ chờ đấy đã 😹😹

Điều này đồng nghĩa với trường hợp nếu có `quá-nhiều-tiến-trình-reflow`, `browser` xử lý không kịp thì tốc độ `FPS` *(`Frames Per Second`)* sẽ giảm, thậm chí còn dẫn tới tình trạng màn hình đơ luôn hoặc tồi tệ nhất là `crash tab`. 

![](https://images.viblo.asia/d1fd6a00-ef54-4952-8a87-cad3e70ce3aa.PNG)

### Repaint

> Parts of the screen are updated, either because of changes in `geometric properties of a node` or because of `stylistic change`.
 
<br/>

Quá trình một phần của `render tree` được cập nhật lại do bị thay đổi các tính chất hình học hoặc thay đổi `styles` *(như `color`, `background`, etc.)* được gọi là **`repaint`** hoặc **`redraw`**.

<br/>

*Cả `Repaint` & `Reflow` đều có ảnh hưởng khá nhiều tới trải nghiệm người dùng cũng như `performance` của ứng dụng. Chúng mình cùng điểm qua một số trường hợp phổ biến có thể gây ra `Reflow, Repain` để có thể hạn chế ở mức tốt nhất nhé* *😺😺*

### What triggers ?
Bất cứ điều gì làm thay đổi thông tin đầu vào *(`input information`)* được sử dụng để xây dựng `render tree` đều có thể gây ra hiện tượng `Reflow/Repaint` này: 
- Thêm, xóa, cập nhật một `DOM node`.
- Che giấu `DOM node` bằng `display: none` *(`reflow` và `repaint`)* hoặc `visibility: hidden` *(CHỈ `repaint`)*
- Di chuyển, làm `animations` với một `DOM node`.
- Thêm `stylesheet`, điều chỉnh các giá trị của `style properties`.
- Một số các `user actions` *(`resize`, `scrolling`, etc.)*

<br/>

*Mình cùng điểm nhanh qua vài ví dụ dưới đây:*
```js
var hstyle = document.body.style;  // cache

hstyle.padding = "20px";           // reflow & repaint

hstyle.border = "10px solid red";  // reflow & repaint

hstyle.color = "blue";             // ONLY repaint

hstyle.backgroundColor = "#fad";   // repaint

bstyle.fontSize = "2em";           // reflow & repaint

// new DOM element - reflow & repaint
document.body.appendChild(document.createTextNode('Hi DevNotes !'));
```

### How to minimize ?
*Khi nắm được lý do quá trình `reflow/repaint` diễn ra, chúng ta có một số cách để giảm các `negative effects` từ `reflow/repaint` trong `UX` là giúp nó diễn ra nhanh hơn, các tính toán không quá phức tạp.*

*Cùng nhau liệt kê xem chúng là gì nào:*

- **Batching**: Kĩ thuật này có thể hiểu đơn giản là nhóm các câu lệnh đọc ghi `DOM` vào sát nhau, tránh việc đọc ghi `DOM` rời rạc, gây nên tình trạng `reflow` liên tục.
-  **Reduce complexity of your selectors**: Việc giảm bớt độ phức tạp khi gọi `selectors` sẽ giảm thiểu được thời gian ghép cặp và xây dựng lại `style structure`.
- **DOM Depth**:  Việc update một `DOM node` sẽ kéo theo `update` tất cả các `DOM node con`, đồng nghĩa việc việc tất cả các `DOM` bị `update` sẽ phải được tính toán lại. Nếu DOM của chúng ta quá sâu, đồng nghĩa với việc việc tính toán sẽ trở nên phức tạp hơn.
- ...

Trên đây mình chỉ liệt kê ra một số gợi ý để giảm thiểu `reflow/repaint`. Để tìm hiểu thêm nhiều giải pháp hay ho hơn, bạn có thể xem thêm trên [Developer Google](https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations) hoặc trong bài viết [Hạn chế reflow trên trình duyệt](https://viblo.asia/p/han-che-reflow-tren-trinh-duyet-gDVK2JPjKLj#_3-han-che-bang-cach-nao-2)   với các ví dụ siêu siêu cụ thể nhé ^^

![](https://images.viblo.asia/752ec301-e939-4fc8-a072-fff422de3533.PNG)


## Conclusion
*Yayyy...*

Vậy là chúng mình vừa cùng nhau tìm hiểu về quá trình `rendering` cũng như `repaint/ relayout` của `browser` rồi. Mình hy vọng rằng bài viết này giúp ích được cho các bạn ^^

![](https://images.viblo.asia/bcac0ae4-37b9-4f82-a75a-8dc9bbdd51ba.gif)

Cảm ơn vì các bạn đã đọc bài chia sẻ này. Tặng mình **`1 upvote`** để có thêm động lực cho những bài viết sắp tới nhé 😺😺

*Tiện thì ghé qua [nhà mình](https://haodev.wordpress.com/) chơi một chút rồi về ^^*

*Chúc các bạn cuối tuần vui vẻ !*

<br/>

***References:** [Phpied](https://www.phpied.com/rendering-repaint-reflowrelayout-restyle/), [Mr. ThinhDora](https://thinhdora.me/search/query:t%E1%BB%91i%20%C6%B0u%20browser%20rendering),  [My Blog](https://haodev.wordpress.com/2020/06/20/from-html-css-to-ui-rendering-process/), [ITNext](https://itnext.io/how-the-browser-renders-a-web-page-dom-cssom-and-rendering-df10531c9969).*