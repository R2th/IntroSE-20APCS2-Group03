![](https://images.viblo.asia/06d36c3a-62b9-4cf4-9ba5-39a02136e82e.png)

  Chào mọi người, đã lâu không gặp :pray: Dạo này cứ bị lười nên là chẳng chịu viết lách gì cả. Sẵn tiện hôm nay lượn lờ lung tung tìm được 1 thứ khá hay ho nên tranh thủ viết lại một tí :joy: 
  
  Nếu bạn đã từng inspect element của Youtube chắc hẳn bạn sẽ thấy, ngoài những tag bình thường như div, span... youtube còn sử dụng một số tag khá là kì lạ kiểu như này
  ![](https://images.viblo.asia/1ad31205-1b90-492f-95d0-48d25d7b493f.png)
  
  Không chỉ youtube mà rất là nhiều trang khác cũng có những tag kì lạ nữa. Bạn đã bao giờ tò mò mấy cái tag này là cái gì và nó từ đâu ra chưa :upside_down_face:  À thì loanh quanh 1 lúc cũng ra, cái của nợ này là những `custom element` và nó là 1 phần của bộ kỹ thuật có tên là `Web Components`.
  ## Web Components là cái gì ?
  Đầu tiên, Web Components có mới không :question: Câu trả lời ở đây là không, nếu bạn đã từng dùng tag [video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) thì xin giới thiệu đây chính là nó đấy. Các bạn chưa từng thắc mắc là sao có mỗi cái tag mà bên trong 1 đống nút đi cùng chưa :roll_eyes: 
  
  Ai đã từng làm việc với React hay Vue thì chắc hẳn các bạn biết rằng những libraries này được xây dựng dựa trên tư  tưởng Component-Based Architecture. Với Component ở đây là những thành phần UI được đóng gói, tồn tại một cách độc lập và có khả năng tái sử dụng. 
  
  Web Components cũng tương tự như vậy, nó là một bộ các kỹ thuật cho phép tạo ra các `custom element` (hay còn gọi là các tag) có khả năng tái sử dụng mà logic và chức năng của nó thì được đóng gói hoàn toàn bên trong component. Chỉ có một điều khác là Web Components được W3C xây dựng thành 1 [chuẩn web](https://www.w3.org/standards/techs/components). Điều này có nghĩa là chúng ta có thể tạo ra các component, sau đó đóng gói và sử dụng chúng ở mọi nơi mà chúng ta muốn :thinking:
  
  Nghe có vẻ hay đấy, nhưng cái này thì khác quái gì cách viết các library bình thường :roll_eyes: À thì cũng có khác, cũng có vượt trội người ta mới làm, chứ ko thì làm làm gì :roll_eyes: Như lời giới thiệu thì mình thấy có 2 điều mà khi sử dụng custom element tốt hơn đó là:
  - Tất cả mọi thứ bên trong custom element (bao gồm cả logic và style) sẽ hoàn toàn private với bên ngoài. Điều này giúp loại bỏ sự xung đột giữa custom element và code bên ngoài - việc xảy ra thưởng xuyên khi sử dụng các library. 
  - Việc custom element được sử dụng như 1 html tag cũng giúp nó trở nên "tự nhiên" và dễ tiếp cận hơn các library hiện tại.
  
![](https://images.viblo.asia/423e5766-0d6e-4af2-8f58-243682908c2a.png)
  
  Để làm được việc này, Web Components mang đến 3 công nghệ chính: 
  - **Custom elements**: Một bộ API JavaScript cho phép định nghĩa các custom element và hành vi của chúng, sau đó có thể được sử dụng như mong muốn trong giao diện người dùng.
  - **Shadow DOM**: một bộ API JavaScript cho phép đóng gói một cây DOM "ẩn" vào trong một element và kiểm soát các chức năng liên quan của element (đây là một DOM hoàn toàn tách biệt với DOM chính (main document DOM) ). Bằng cách này, chúng ta có thể giữ các chức năng của element ở mức độ private, để chúng có thể xử lý logic và style mà không hề gây xung đột với các phần bên ngoài.
  - **HTML templates**: Bao gồm 2 element `<template>` và `<slot>` cho phép viết các mẫu html mà không hiển thị trong view. Những mẫu này có thể sử dụng lại nhiều lần.
  
  Và chúng ta sẽ cùng nhau tìm hiểu về từng công nghệ bên trên để xem chúng ta có thể tạo ra những gì với chúng
  
  ### Custom elements
  Để đăng ký một custom element, chúng ta sử dụng function `define` được cung cấp bởi `CustomElementRegistry` có sẵn thông qua `window.customElements`:
  ```javascript
class SomeElement extends HTMLElement { ... };
customElements.define('some-element', SomeElement, {...});
  ```
  Như các bạn thấy function [define](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define) nhận vào 3 tham số theo thứ tự là:
  - `name`: Tên cho custom element. Tên này phải chứa dấu gạch nối '-'
  -  `constructor` : Constructor cho custom element.
  -  `options`: Một object điền khiển cách định nghĩa custom element. Hiện tại chỉ có 1 option được hỗ trợ là `extends`:  là tên của các built-in element, dùng để tạo các customized built-in element.
  
Để dễ hiểu hơn chúng ta sẽ thử một ví dụ cho trực quan:
{@embed: https://jsfiddle.net/em6rL4hx/2/}
Như các bạn thấy đấy, mình định nghĩa ra một `my-element` và chả thêm logic gì cho nó cả và vẫn dùng nó như một element bình thường. 

Ngoài ra Custom Element còn có khá nhiều tính năng khác như Built-in Element, Lifecycle Callback... các bạn có thể tìm hiểu thêm tại [đây](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
### Templates
Như đã đề cập ở trên,  2 element `<template>` và `<slot>` chúng ta có thể xây dựng những HTML node mà không cần phải chèn nó vào DOM ngay lập tức như thông thường. Chúng ta sẽ cùng xem ví dụ về 2 element này:
{@embed: https://jsfiddle.net/em6rL4hx/8/}
Như các bạn thấy, một đoạn template đã được định nghĩa ở body, nhưng kông hề được hiển trong view.
```html
<body>
   <template id="my-paragraph">
    <style>
      p {
        color: red;
        background-color: #666;
        padding: 5px;
      }
    </style>
    <p>This is template</p>
    <slot name='templ-slot'>This default text</slot>
  </template>
  </body>
```
Để sử dụng template chúng ta cần lấy node của template và sử dụng phần content
{@embed: https://jsfiddle.net/em6rL4hx/10/}

### Shadow DOM
Để những thao tác bên trong custom element được cô lập và không gây xung đột với bên ngoài, custom element có thể đính thêm vào nó một "shadow DOM", thông qua [Element.attachShadow()](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow). 
```javascript
let shadowRootInit = {mode: 'open'};
let shadowroot = element.attachShadow(shadowRootInit); 
```
Ngoài ra chúng ta cũng có thể attach shadow dom trong constructor của custom element
```javascript
class CustomElement extends HTMLElement {
  constructor() {
    super();
    // Create a shadow root
    const shadow = this.attachShadow({mode: 'open'});
```
`attachShadow()` nhận vào một tham số là `shadowRootInit`, tham số này là một object, và hiện tại chỉ support 1 option đó là `mode` (open/closed) để xác định tính đóng gói của shadow DOM. 

Nếu `mode = open` thì chúng ta có thể truy cập vào shadow DOM từ bên ngoài thông qua `element.shadowRoot` và sẽ trả về một Instance của shadow DOM gọi là [ShadowRoot](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot). Ngược lại `mode  = close` thì  `element.shadowRoot` sẽ trả về null.

Sau khi khởi tạo Shadow DOM thì chúng ta thao tác với nó y hệt như DOM bình thường vậy, không có gì khác biệt:
{@embed: https://jsfiddle.net/0xjf3nyt/}

Để tìm hiểu thêm tại sao shadow DOM lại tách biệt với DOM chính, các bạn có thể xem thêm tại [đây](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM#High-level_view).

## Tại sao lại phải quan tâm đến Web Components ?
Xem 1 hồi cũng thấy khá hay ho đấy, nhưng có 1 vấn đề là sao đến tận bây giờ cái Web Component này vẫn không phổ biến lắm, người ta viết library vẫn dùng kiểu cũ chứ chả dùng nó :roll_eyes: Chưa kể là cái của nợ này vẫn chưa được các trình duyệt hỗ trợ 100% nữa :upside_down_face: 

![](https://images.viblo.asia/2723ce72-9afe-462f-b04b-8fc4a4139476.png) 
https://caniuse.com/#search=web%20component

Như đã đề cập ở phía trên, Web Component là 1 Chuẩn Web được xây dựng bởi W3C, vì thế cho nên không sớm thì muộn nó cũng được các trình duyệt hỗ trợ hết thôi. Làm quen với 1 chuẩn Web trước thì cũng có mất mát gì đâu :roll_eyes: 

Viết và sử dụng Web Component mở ra 1 hướng đi mới cho việc chia sẻ các library, đem lại những trải nghiệm 
khá là tích cực cho cả người viết và sử dụng.

Nói chung Web Components là một tính năng khá là đáng sử dụng ở thời điểm hiện tại. 

## Support
Ở thời điểm hiện tại mặc dù các trình duyệt chưa hỗ trợ 100% Web Component, nhưng chúng ta có thể giải quyết vấn đề này bằng cách sử dụng [polyfills](https://www.webcomponents.org/polyfills). 

## Library
Hiện tại cộng đồng sử dụng Web Component thực sự cũng chưa lớn lắm, những library Web Component cũng chưa xuất hiện quá nhiều, nếu không muốn nói là hơi hẻo :roll_eyes: Chúng ta có thể tìm kiếm một số trên:
- https://www.webcomponents.org/
- https://github.com/topics/web-component

Nhìn tích cực một chút, thì có lẽ đây là cơ hội cho các bạn tỏa sáng nếu muốn trở thành một Open Source Contributor đấy :joy:

So với các thư viện Web Component thì các thư viện hỗ trợ phát triển Web Component có vẻ vẻ tươi sáng hơn 1 tí. Có vẻ như cú pháp viết  Web Component  vẫn chưa được tốt cho lắm nên người ta vẫn đang tập trung cho vấn đề phát triển
```javascript
class PopUpInfo extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({mode: 'open'});
    // Create some CSS to apply to the shadow dom
    const style = document.createElement('style');
    style.textContent = `
      .wrapper {
        position: relative;
      }`
      // Attach the created elements to the shadow dom
    shadow.appendChild(style);
  }
}
```
Một số thư viện nổi bật có thể kể đến: [LitElement](https://github.com/polymer/lit-element), [Riot](https://github.com/riot/riot) 

## Kết 
Web Component là một tính năng đáng mong đợi, qua bài viết này hi vọng mọi người có thể hiểu một chút về nó và sẵn sàng sử dụng nó trong tương lai.

Thông tin trong bài viết chỉ là những giới thiệu căn bản về Web Component  để tìm hiểu kĩ hơn các bạn có thể truy cập vào các link đã dẫn. Cảm ơn mọi người đã đọc bài.
  ## Source
-  https://developer.mozilla.org/en-US/docs/Web/Web_Components
-  https://www.webcomponents.org/