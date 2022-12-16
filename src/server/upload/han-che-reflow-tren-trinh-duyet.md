Trong xu hướng hiện nay, các website `động` đang được ưa chuộng rất nhiều. Tức là người dùng có thể thao tác trên đó thay vì chỉ là nhận về thông tin là các dòng `text` đơn thuần như trước kia.

Các lập trình viên cũng rất cố gắng tạo ra những giao diện bắt mắt, dễ dàng sử dụng trong những thao tác đối với người dùng. Ví dụ như một vài trang thay vì liệt kê ra các đầu việc bằng `text` khô khan thì họ tạo ra những giao diện kéo thả cho người dùng. Hệt như việc họ dùng các công cụ ngoài đời thực - [**Trello**](https://trello.com) là một ví dụ điển hình. 


Tuy nhiên để tạo ra các thay đổi đó, lập trình viên thường thao tác thay đổi `DOM` rất nhiều, trình duyệt liên tục phải **Reflow** để **tính toán lại kích thước** và **bố trí lại vị trí**. Việc hiểu biết về **reflow** sẽ giúp tối ưu lại quá trình render một trang website tới người dùng sao cho mượt mà hơn.

# 1. Reflow
Để tìm hiểu `reflow` là gì chúng ta sẽ cùng theo dõi ví dụ sau: Điều gì sẽ xảy ra khi bạn cố gắng thay đổi chiều cao của một thẻ element.

Việc thay đổi chiều cao của `element` không ảnh hưởng đến cấu trúc của cây `DOM`. Tuy nhiên cần phải tính toán lại kích thước của nó.
![](https://images.viblo.asia/218a6bae-3617-440b-9a98-fe0548e24126.png)

Sau quá trình tính toán lại chiều cao. Các process tiếp theo như `repaint` mới được thực hiện trước khi hiện thị ra trình duyệt. 

**Vậy reflow là gì ?**

> Reflow là tập hợp nhiều tiến trình mà trình duyệt tính toán lại kích thước và bố trí lại vị trí của các elements trên web page.
> 
# 2. Tại sao phải hạn chế reflow ?

Tuy nhiên vì quá trình **reflow** diễn ra một cách đồng bộ, tức là khi **reflow** chưa chạy xong. Thì các quá trình khác cứ chờ ở đấy. Vì vậy cần phải hạn chế tối thiểu **reflow**  để quá trình hiện thị trên webpage sẽ diễn ra nhanh chóng hơn. 

Trong thực tế có rất nhiều trường hợp **reflow** quá lâu dẫn tới việc **crash tab**.

Sau đây là một số hạn chế mà **reflow** mang đến:
* Ngốn CPU
* Mất thêm thời gian xử lí [meaningful paint](https://web.dev/first-meaningful-paint/) 
* Mất thêm thời gian xử lí [contentful paint](https://web.dev/first-contentful-paint/) 

Dưới đây là các sự kiện dẫn tới việc kích hoạt quá trình **reflow**.

**Getting box metrics**
* `elem.offsetLeft`, `elem.offsetTop`, `elem.offsetWidth`, elem.offsetHeight, `elem.offsetParent`
* `elem.clientLeft`, `elem.clientTop`, `elem.clientWidth`, `elem.clientHeight`
*`elem.getClientRects()`, `elem.getBoundingClientRect()`

**Scroll stuff**
* `elem.scrollBy()`, `elem.scrollTo()`
* `elem.scrollIntoView()`, `elem.scrollIntoViewIfNeeded()`
* `elem.scrollWidth`, `elem.scrollHeight`
* `elem.scrollLeft`, `elem.scrollTop also`


**Setting focus**

* `elem.focus()`

**Getting window dimensions**

* `window.scrollX`, `window.scrollY`
* `window.innerHeight`, `window.innerWidth`
* `window.visualViewport.height` / `width` / `offsetTop` / `offsetLeft`

**document**
* `document.scrollingElement`
* `document.elementFromPoint`

**Mouse events: Reading offset data**
* `mouseEvt.layerX`, `mouseEvt.layerY`, `mouseEvt.offsetX`, `mouseEvt.offsetY`

**Forms: Setting selection + focus**
* `inputElem.focus()`
* `inputElem.select()`, `textareaElem.select()`

 **....**
 
Tham khảo thêm tại: **[What forces layout / reflow](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)**
# 3. Hạn chế bằng cách nào
Như phần đầu chúng ta đã nói, việc phải thay đổi các element để tạo ra **một trang website sinh động** là điều quan trọng trong thời đại hiện nay.

Vì vậy, trong quá trình thay đổi giao diện hay can thiệp vào thuộc tính của các element càng hạn chế `reflow` càng tốt.

> Hạn chế tối thiểu triggers reflow khi can thiệp vào các thuộc tính của elements
> 
## 3.1 Thay đổi hàng loạt
Kĩ thuật đầu tiên ở đây là khi thay đổi hàng loạt các element, hãy xoá chúng khỏi `DOM`, sau đó tiến thành **thay đổi thuộc tính** rồi thêm lại vào `DOM`.

Ví dụ như sau 

```js
var element = document.getElementById('example-element');
var parentElement = element.parentElement;
var removedElement = parentElement.removeChild(element); // triggers reflow
removedElement.style.opacity = '0.5';
removedElement.style.padding = '20px 10px';
removedElement.style.width = '200px';
parentElement.appendChild(removedElement); // triggers reflow
```

Ở đây nếu không xoá phần tử `parentElement` chúng ta sẽ mất thêm **3 lần reflow** cho việc style lại `opacity`, `padding`, `width`.

Nhưng do chúng ta đã xoá chúng sau đó mới tiến hành `style` nên đã tiết kiệm được quá trình `reflow`.

**Lưu ý là cách này trong thực tế đã phải kích hoạt reflow 2 lần nên tuỳ thuộc vào độ phức tạp của trong quá trình xử lí xem có nên lựa chọn không, nếu bạn chỉ phải thay đổi 1 thuộc tính padding thôi(tức là chỉ tốn 1 trigger reflow) thì không tội gì phải xử lí xoá element rồi thêm lại**

Thêm nữa bạn cũng nên **nhóm các câu đọc, ghi DOM vào với nhau**. **Tránh việc đọc ghi rời rạc**.
```js
// Tối ưu

var w = element.clientWidth + 50;
var w2 = element.clientWidth + 100;

element.style.width = w + 'px';
element.style.width = w2 + 'px';

// Chưa tối ưu

var w = element.clientWidth + 50;
element.style.width = w + 'px';
var w2 = element.clientWidth + 50;
element.style.width = w2 + 'px';
```
 
## 3.2 Tránh reflow trong vòng lặp
Check các vòng lặp trong code của bạn để đảm bảo rằng các **trigger reflow** như `element.offsetWidth` để ngoài vòng lặp bằng các sử dụng chúng như một biến.

**Chưa tối ưu**
```js
var list = document.getElementById('list');
var listItems = Array.from(list.children);

for (var i = 0; i < listItems.length; i++) {
  var listParentHeight = list.parentElement.offsetHeight; // Lặp lại reflow
  listItems[i].style.marginTop = Math.floor( listParentHeight / listItems.length - 10) + 'px'; 
}
```
**Tối ưu**

```js
var list = document.getElementById('list');
var listItems = Array.from(list.children);
var listParentHeight = list.parentElement.offsetHeight; // Đặt ngoài vòng lặp 
for (var i = 0; i < listItems.length; i++) {
  listItems[i].style.marginTop = Math.floor( listParentHeight / listItems.length - 10) + 'px'; 
}
```

## 3.3 Sử dụng visibility thay thế display
 Trong một vài trường hợp cần **ẩn/hiện** các element thì nên dùng thuộc tính `visibility: hidden` và `visibility: visible` thay thế cho `display: none` và `display: block`.
 
 Khi sử dụng `visibility: hidden` để ẩn, `element` vẫn chiếm không gian trong cấu trúc của cây `DOM`. Tức là việc thay đổi kích thước element sẽ **không diễn ra** như việc sử dụng thuộc tính `display`.
 
 Vì vậy trong các trường hợp không phải loại bỏ element khỏi `DOM`. Hãy sử dụng `visibility: hidden`để tránh **trigger reflow**
 ## 3.4 Sử dụng cssText để style
 Trong một số trường hợp phải thay đổi `style` của các element. Hãy cố gắng thực hiện chúng trong một lần duy nhất. **cssText** có thể giúp bạn trong việc này. Tạo ra sự thay đổi của nhiều thuộc tính trong một `triggers reflow`.
 
 
 
 **Chưa tối ưu**
 ```js
 element.style.left = left; // triggers reflow
element.style.top = top; // triggers reflow
```
**Tối ưu** 
```js
element.style.cssText += "left: " + left + "px; top: " + top + "px;"; // triggers reflow once
```
# 4. Tổng kết

Trên đây mình đã giới thiệu một số phương pháp để hạn chế `triggers reflow`mà vẫn đạt được mục đích là **thay đổi giao diện**. Ngoài ra còn một số phương pháp khác như 

* Giảm thiểu các rule về `CSS`, loại bỏ chúng khi không cần thiết.
* Giảm độ sâu của cây `DOM`, Tránh sự thay đổi của `node cha` kéo theo hàng loạt sự thay đổi của `node con`.
* [Sử dụng flex box](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing#use_flexbox_over_older_layout_models)
* Sử dụng `textContent` thay vì `innerText`.

**Tham khảo:**

* [ Tối ưu browser rendering: Flow](https://thinhdora.me/development/toi-uu-browser-rendering-flow)
* [How does browser work step by step in 2019 — optimization in the interaction stage (part 5)](https://medium.com/@cabulous/how-does-browser-work-in-2019-part-5-optimization-in-the-interaction-stage-66b53b8ec0ad)
* [Minimizing browser reflow](https://developers.google.com/speed/docs/insights/browser-reflow)
* [Web Performance: Minimising DOM Reflow / Layout Shift](https://medium.com/better-programming/web-performance-dom-reflow-76ac7c4d2d4f)
 
 Cảm ơn các bạn đã theo dõi bài viết, nếu thấy hữu ích đừng quên upvote cho mình nhé. Hẹn mọi người ở những bài tiếp theo.