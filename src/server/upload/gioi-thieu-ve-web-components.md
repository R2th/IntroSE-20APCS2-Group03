Front-end đang phát triển với tốc độ chóng mặt. Điều này được thể hiện rõ qua vô số bài báo, hướng dẫn và chủ đề Twitter. Trong bài viết này, tôi sẽ thảo luận về lý do tại sao Web Components là một công cụ tuyệt vời để cung cấp trải nghiệm người dùng với chất lượng cao mà không cần các khung hoặc các bước xây dựng phức tạp và điều đó không có nguy cơ trở nên lỗi thời. Trong các bài viết tiếp theo của loạt bài gồm năm phần này, chúng ta sẽ đi sâu hơn vào từng thông số kỹ thuật.

Loạt bài này giả định hiểu biết cơ bản về HTML, CSS và JavaScript. Nếu bạn cảm thấy yếu ở một trong những lĩnh vực đó, đừng lo lắng, việc xây dựng một yếu tố tùy chỉnh thực sự đơn giản hóa nhiều sự phức tạp trong phát triển front-end.

### Thành phần web là gì?

Web Components bao gồm ba công nghệ riêng biệt được sử dụng cùng nhau:

**Custom Elements**. Nói một cách đơn giản, đây là các thành phần HTML hợp lệ với các template, behaviors và tag name tùy chỉnh (ví dụ: `<one-dialog>` ) được tạo bằng một bộ API JavaScript. Các thành phần tùy chỉnh được mô tả trong [custom-element](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements). 
 
**Shadow DOM**. Có khả năng cô lập CSS và JavaScript, gần giống như `<iframe>` . Điều này được định nghĩa trong [shadow-trees](https://dom.spec.whatwg.org/#shadow-trees) .

**HTML templates**. Các template do người dùng xác định trong HTML không được hiển thị cho đến khi được gọi. Thẻ `<template>` được xác định trong [template-element](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element) .

Đây là những gì tạo nên đặc tả cho web components.

[HTML Modules](https://github.com/w3c/webcomponents/issues/645) có thể là công nghệ thứ tư trong danh sách trên, nhưng nó vẫn chưa được triển khai trong bất kỳ trình duyệt lớn nào. Nhóm Chrome đã thông báo [ý định triển khai chúng trong phiên bản tương lai](https://twitter.com/intenttoship/status/1085742504958279682).

Web Components thường có sẵn trong tất cả các trình duyệt chính ngoại trừ Microsoft Edge và Internet Explorer 11, nhưng [các polyfill tồn tại để lấp đầy các khoảng trống đó](https://github.com/webcomponents/webcomponentsjs) .

Việc gọi bất kỳ thứ nào trong số này là Web Components là chính xác về mặt kỹ thuật vì bản thân thuật ngữ này hơi lằng nhằng. Kết quả là, mỗi công nghệ có thể được sử dụng độc lập hoặc kết hợp với bất kỳ công nghệ nào khác. Nói cách khác, chúng không loại trừ lẫn nhau.

Chúng ta hãy xem nhanh từng cái. Chúng ta sẽ đi sâu hơn vào chúng trong các bài viết khác trong loạt bài này.

### Custom elements

Như tên ngụ ý, custom elements là các thành phần HTML, như `<div>` , `<section>` hoặc `<article>` , nhưng một cái gì đó chúng ta có thể tự đặt tên cho chúng, được xác định thông qua API trình duyệt. Custom elements giống như các phần tử HTML tiêu chuẩn đó - tên trong ngoặc <> - ngoại trừ chúng luôn có dấu gạch ngang, như `<news-slider>` hoặc `<bacon-cheeseburger>`. Trong tương lai, các nhà cung cấp trình duyệt đã cam kết không tạo ra các yếu tố tích hợp mới có chứa dấu gạch ngang trong tên để ngăn xung đột.

Các yếu tố tùy chỉnh chứa ngữ nghĩa, hành vi, đánh dấu của riêng họ và có thể được chia sẻ trên các frameworks và trình duyệt.

{@embed: https://codepen.io/calebdwilliams/pen/MLQGZx}

Trong ví dụ này, tôi định nghĩa `<my-component>` , phần tử HTML rất riêng của tôi. Phải thừa nhận rằng nó không làm được gì nhiều, tuy nhiên đây là khối xây dựng cơ bản của một custom elements. Tất cả các custom element phải bằng cách nào đó mở rộng HTMLElement để được đăng ký với trình duyệt.

Custom elements tồn tại ngoài framework của bên thứ ba và các nhà cung cấp trình duyệt được dành riêng cho khả năng tương thích ngược liên tục của thông số kỹ thuật, nhưng đảm bảo rằng các thành phần được viết theo thông số kỹ thuật sẽ không bị phá vỡ thay đổi API. Hơn nữa, các thành phần này thường có thể được sử dụng ngoài luồng với [các framework phổ biến nhất hiện nay](https://custom-elements-everywhere.com/) , bao gồm Angular, React, Vue và các thành phần khác với nỗ lực tối thiểu.

### Shadow DOM

Shadow DOM là một phiên bản đóng gói của DOM. Điều này cho phép các tác giả cách ly hiệu quả các đoạn DOM với nhau, bao gồm mọi thứ có thể được sử dụng làm bộ chọn CSS và các kiểu được liên kết với chúng. Nói chung, bất kỳ nội dung nào trong phạm vi của tài liệu đều được gọi là light DOM và bất kỳ nội dung nào trong shadow root đều được gọi là shadow DOM.

Khi sử dụng light DOM, một phần tử có thể được chọn bằng cách sử dụng `document.querySelector('selector')` hoặc bằng cách nhắm vào phần tử con nào của phần tử bất kì bằng cách sử dụng `element.querySelector('selector')` theo cách tương tự, có thể nhắm mục tiêu đến các phần tử con của shadow root bằng cách gọi `shadowRoot.querySelector` trong đó `shadowRoot` là tham chiếu đến document fragment - sự khác biệt là các phần tử con của shadow root sẽ không thể chọn từ light DOM. Ví dụ: Nếu chúng ta có một shadow root với `<button>` bên trong nó, việc gọi `shadowRoot.querySelector('button')` sẽ trả về nút của chúng ta, nhưng không có lệnh gọi bộ chọn truy vấn nào của tài liệu sẽ trả về phần tử đó vì nó thuộc về một phần tử khác. Ví dụ DocumentOrShadowRoot liệuOrShadowRoot. Bộ chọn kiểu làm việc theo cùng một cách.

Về mặt này, light DOM hoạt động giống như một `<iframe>` trong đó nội dung bị cắt khỏi phần còn lại của document; tuy nhiên, khi tôi tạo một shadow root, tôi vẫn có toàn quyền kiểm soát phần đó của trang của tôi, nhưng nằm trong một bối cảnh. Đây là những gì chúng ta gọi là `đóng gói` .

Nếu bạn đã từng viết một thành phần sử dụng lại cùng một `id` hoặc dựa trên các công cụ CSS-in-JS hoặc chiến lược đặt tên CSS ( [như BEM](https://css-tricks.com/bem-101/) ), thì Shadow DOM có khả năng cải thiện trải nghiệm nhà phát triển của bạn.

Hãy tưởng tượng kịch bản sau:

```html
<div>
  <div id="example">
    <!-- Pseudo-code used to designate a shadow root -->
    <#shadow-root>
      <style>
      button {
        background: tomato;
        color: white;
      }
      </style>
      <button id="button">This will use the CSS background tomato</button>
    </#shadow-root>
  </div>
  <button id="button">Not tomato</button>
</div>
```


Ngoài pseudo-code của `<#shadow-root>` (được sử dụng ở đây để phân định ranh giới bóng không có phần tử HTML), HTML hoàn toàn hợp lệ. Để đính kèm một shadow root vào nút ở trên, chúng ta sẽ chạy một cái gì đó như:

```javascript
const shadowRoot = document.getElementById('example').attachShadow({ mode: 'open' });
shadowRoot.innerHTML = `<style>
button {
  color: tomato;
}
</style>
<button id="button">This will use the CSS color tomato <slot></slot></button>`;
```

Một shadow root cũng có thể bao gồm nội dung từ document chứa nó bằng cách sử dụng phần tử `<slot>` . Sử dụng một vị trí sẽ thả nội dung người dùng từ document bên ngoài tại một vị trí được chỉ định trong thư mục gốc của bạn.

{@embed: https://codepen.io/calebdwilliams/pen/rRNJPJ}

### HTML templates

Phần tử `<template>` được đặt tên khéo léo cho phép chúng tôi dập tắt các mẫu mã có thể sử dụng lại bên trong một luồng HTML thông thường sẽ không được hiển thị ngay lập tức, nhưng có thể được sử dụng sau đó.

```html
<template id="book-template">
  <li><span class="title"></span> &mdash; <span class="author"></span></li>
</template>

<ul id="books"></ul>
```

Ví dụ trên sẽ không hiển thị bất kỳ nội dung nào cho đến khi tập lệnh đã sử dụng mẫu, khởi tạo mã và cho trình duyệt biết phải làm gì với nó.

```javascript
const fragment = document.getElementById('book-template');
const books = [
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { title: 'A Farewell to Arms', author: 'Ernest Hemingway' },
  { title: 'Catch 22', author: 'Joseph Heller' }
];

books.forEach(book => {
  // Create an instance of the template content
  const instance = document.importNode(fragment.content, true);
  // Add relevant content to the template
  instance.querySelector('.title').innerHTML = book.title;
  instance.querySelector('.author').innerHTML = book.author;
  // Append the instance ot the DOM
  document.getElementById('books').appendChild(instance);
});
```

```
Lưu ý rằng ví dụ này tạo một mẫu ( `<template id="book-template">` ) mà không cần bất kỳ công nghệ Web Components nào khác, minh họa lại rằng ba công nghệ trong danh sách ở đầu bài viết có thể được sử dụng độc lập hoặc tập thể.
```

Rõ ràng, người dùng của một dịch vụ sử dụng API mẫu có thể viết một mẫu có bất kỳ hình dạng hoặc cấu trúc nào có thể được tạo sau đó. Một trang khác trên một trang web có thể sử dụng cùng một dịch vụ, nhưng cấu trúc mẫu theo cách này:

```html
<template id="book-template">
  <li><span class="author"></span>'s classic novel <span class="title"></span></li>
</template>

<ul id="books"></ul>
```

{@embed: https://codepen.io/calebdwilliams/pen/LqQmXN}

### Tổng kết

Khi việc phát triển web tiếp tục trở nên ngày càng phức tạp, nó sẽ bắt đầu có ý nghĩa đối với các nhà phát triển như chúng ta bắt đầu trì hoãn ngày càng nhiều sự phát triển cho chính nền tảng web đã tiếp tục phát triển. Các đặc tả của Web Components là một bộ API cấp thấp sẽ tiếp tục phát triển và phát triển khi nhu cầu của chúng ta khi các nhà phát triển phát triển.

Trong bài viết tiếp theo, chúng ta sẽ tìm hiểu sâu hơn về phần HTML templates. Sau đó, chúng tôi sẽ tiếp tục thảo luận về các yếu Custom elements và Shadow DOM. Cuối cùng, tôi sẽ kết thúc tất cả bằng cách xem xét công cụ và kết hợp cấp cao hơn với các thư viện và khung phổ biến hiện nay.