Chúng ta sẽ bắt đầu bằng 1 ví dụ.

Sự kiện `onclick` trên `div` cũng sẽ kích hoạt khi chúng ta click vào nested tag `<em>` hoặc `<code>`:

```
    <div onclick="alert('The handler!')">
      <em>If you click on <code>EM</code>, the handler on <code>DIV</code> runs.</em>
    </div>
```
{@codepen: https://codepen.io/tanbpv-1625/pen/WqLaYz}

Các bạn có thắc mắc tại sao lại vậy không ?

## Bubbling

Nguyên tắc hoạt động của bubbling rất là đơn giản.

**Khi một event xảy ra trên một phần tử, đầu tiên nó sẽ chạy các handler trên nó, sau đó là cha mẹ của nó, sau đó đến tất cả các tag cha bên ngoài khác.**

Bây giờ chúng ta có `FORM > DIV > P` với event `onclick` trên mỗi tag.

```
    <style>
      body * {
        margin: 10px;
        border: 1px solid blue;
      }
    </style>

    <form onclick="alert('form')">FORM
      <div onclick="alert('div')">DIV
        <p onclick="alert('p')">P</p>
      </div>
    </form>
 ```
 {@codepen: https://codepen.io/tanbpv-1625/pen/wLRQrY}
 
 Khi click vào bên trong `<p>` nó sẽ chạy `onclick`:
 1. Trên `<p>`.
 2. Ra ngoài `<div>`.
 3. Ra ngoài `<form>`.
 4. Và tới `document`.
 
 Nếu click trên `<p>`, chúng ta sẽ nhìn thấy 3 `alert`: `p` -> `div` -> `form`.
 
 Quá trình này được gọi là "bubbling" bởi vì các event "bubbling" từ element bên trong lên qua cha mẹ giống như một bong bóng trong nước.
 
###  event.target

Một handler trên element cha có thể biết được chi tiết về nơi event thực sự xảy ra.

**Phần tử trong cùng gây ra sự kiện này được gọi là *target* element, có thể truy cập dưới dạng event.target.**

Chú ý sự khác nhau của `this`(=`event.currentTarget`) :<br>
    * `event.target`: là "target" element lúc init event, nó không thay đổi thông qua quá trình bubling.<br>
    * `this`: là element "current" , có một handler đang chạy trên nó.

Chẳng hạn, nếu chúng ta có handler duy nhất `form.onclick`, thì nó có thể bắt được tất cả các click chuột trong form. Bất kể nhấp chuột xảy ra ở đâu, nó sẽ bubbles lên `<form>` và chạy handler.

Trong handler `form.click`:<br>
    * `this`(=`event.currentTarget`) là `<form>` element bởi vì handler chạy trên nó.<br>
    *  `event.target` là element cụ thể bên trong được click.

 {@codepen: https://codepen.io/tanbpv-1625/pen/OerdMX}
 
 `event.target` bằng `this` khi click trực tiếp vào `<form>` element.
 
###  Stopping bubbling

Một bubbling event đi từ target element thẳng lên. Thông thường, nó đi lên cho đến  `<html>`,  sau đó đến `document` object,  và một số sự kiện thậm chí đến `windown`,  gọi tất cả các handler trên đường dẫn.

Nhưng handler nào có thể quyết định rằng event đã được xử lý đầy đủ và ngăn chặn bubbling, method `event.stopPropagation()` làm điều này.

Ví dụ, ở đây `body.onclick` không làm việc nếu click vào `<button>`:

```
    <body onclick="alert(`the bubbling doesn't reach here`)">
      <button onclick="event.stopPropagation()">Click me</button>
    </body>
```
{@codepen: https://codepen.io/tanbpv-1625/pen/rEobMy}

**Không stop bubbling khi không cần**

## Capturing
Ở đây một giai đoạn khác của quá trình xử lý sự kiện được gọi là "capturing". Nó hiếm khi được sử dụng trong code thực tế, nhưng đôi khi có thể hữu ích.

Theo chuẩn [DOM Events](https://www.w3.org/TR/DOM-Level-3-Events/) có 3 giai đoạn lan truyền của event:

1. Capturing phase - event đi xuống element.
2. Target phase - event tới element target.
3. Bubbling phase - event bubles tuef element.

Dưới đây là hình ảnh khi click vào `<td>` bên trong table: 

![](https://images.viblo.asia/30b4af1e-51d4-424f-80e1-47a43f46c507.png)

Khi click vào `<td>`, event trước tiên đi từ `window` xuống element (capturing phase), sau đó nó đến mục tiêu và kích hoạt ở đó (target phase), sau đó nó đi lên (bubbling phase), gọi handler trên đường đi của nó.

**Trước đó chúng ta chỉ nói về bubbling, bởi vì capturing pharse ít khi được sử dụng.**

Handler được thêm bằng  `on<event>` -property, sử dụng HTML attributes hoặc sử dụng `addEventListener(event, handler)` chúng ta chỉ chạy trên pharse 2,3 (target pharse, bubbling pharse).

Để bắt sự kiện capturing pharse , chúng ta cần set `caturing: true`:

```
    elem.addEventListener(..., {capture: true})
    // or
    elem.addEventListener(..., true)
```

Bây giờ chúng ta sẽ nhìn 2 pharse:

```
    <style>
      body * {
        margin: 10px;
        border: 1px solid blue;
      }
    </style>

    <form>FORM
      <div>DIV
        <p>P</p>
      </div>
    </form>

    <script>
      for(let elem of document.querySelectorAll('*')) {
        elem.addEventListener("click", e => alert(`Capturing: ${elem.tagName}`), true);
        elem.addEventListener("click", e => alert(`Bubbling: ${elem.tagName}`));
      }
    </script>
```

{@codepen: https://codepen.io/tanbpv-1625/pen/ewaoWa}

Nếu click vào `p`:
1. `HTML` → `BODY` → `FORM` → `DIV` (capturing phase).
2. `P` (target phrase).
3. `DIV` → `FORM` → `BODY` → `HTML` (bubbling phase).

Để loại bỏ event capturing pharse chúng ta sử dụng `removeEventListener(..., true)`.