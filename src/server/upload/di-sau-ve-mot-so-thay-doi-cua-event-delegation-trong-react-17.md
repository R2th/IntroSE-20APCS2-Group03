Xin chào mọi người, chúng ta lại gặp lại nhau rồi. Trong bài trước (các bạn có thể xem tại [đây](https://viblo.asia/p/de-dang-test-template-mail-voi-nodemailer-QpmleJRM5rd)) thì mình có nói một chút về [Nodemailer](https://nodemailer.com/) cũng như là tạo một ứng dụng đơn giản để test mail template sử dụng Nodemailer. Đáng lẽ trong bài hôm nay mình sẽ cùng các bạn tìm hiểu thêm một số tính năng thú vị nữa của nó. Nhưng gần đây React mới cho ra mắt phiên bản 17 với một số thay đổi khá thú vị nên mình quyết định tìm hiểu một chút về nó và trong quá trình đó thì mình có thấy một số thay đổi khá thú vị liên quan đến Event Delegation trong React. Vì vậy trong bài viết này chúng ta cùng đi sâu vào trong những thay đổi này nhé! Bắt đầu thôi!

# I. Event Delegation.
## 1. Đi qua về bubbling và capturing.
Bubbling và capturing là khoá nối quan trọng giúp chúng ta có thể dễ dàng triển khai một trong những pattern xử lý event mạnh mẽ nhất (đó là Event Delegation).


Bubbling là gì? Cái tên của nó cũng nói lên phần nào ý nghĩa rồi. Bubbling đơn giản là nổi. Khi một event xảy ra tại một phần tử thì đầu tiên nó sẽ chạy ở phần tử đó (phần xử lý handler sẽ được xử lý), tiếp đến nó sẽ tiếp tục chạy đến phần tử cha và cứ tiếp tục như vậy cho đến khi chạy đến đối tượng `document`.
```javascript
// App.js
import React from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <form onClick={() => console.log("click form")}>
        form
        <div onclick={() => console.log("click div")}>
          div
          <button type="button" onClick={() => console.log("click button")}>click me</button>
        </div>
      </form>
    </div>
  );
}


// style.css
* {
  margin: 10px;
  border: 1px solid red;
}
```
Ở đoạn code React trên thì khi chúng ta click button `click me` event click sẽ được kích hoạt theo thứ tự như dưới:
1. Kích hoạt và handle xử lý ở `onClick` của button.
2. Kích hoạt và handle xử lý ở `onClick` của div.
3. Kích hoạt và handle xử lý ở `onClick` của form.
4. Tiếp tục kích hoạt (và handle nếu có ở `onClick`) cho đến đối tượng `document`.

Kết quả chúng ta nhận được ở console sẽ như dưới:
```javascript
click button 
click div 
click form 
```

Khi event được kích hoạt thì nó sẽ được bubbling cho đến `document` và có thể là `window`. Quá trình bubbling rất thuận lợi trong một số trường hợp bạn muốn handle một event nhất định trong toàn trang của mình. Nhưng bên cạnh đó cũng có một số trường hợp chúng ta phải chặn nó. Để chặn bubbling chúng ta có thể dùng hai phương án như dưới:
- `event.stopPropagation()` sử dụng trong trường hợp bạn chỉ muốn chặn quá trình bubbling trong phần handler của mình (không bao gồm những handler khác cùng event đó).
-  `event.stopImmediatePropagation()` sẽ sử dụng trong trường hợp với một event có nhiều hơn một handler cho nó. Chúng ta muốn chặn bubbling và ngừng tất cả những handler xếp ở phía sau cho cùng event đó.

Hãy xem qua ví dụ bên dưới để hiểu rõ thêm
```javascript
import React, { useEffect } from "react";

export default function App() {
  useEffect(() => {
     // ở đây chúng ta sẽ định nghĩa 3 handler cho event "click"
     // lần lượt cho 2 handler "document"
     // và 1 handle cho window dùng để kiểm tra bubbling từ document lên window
    document.addEventListener("click", handleDocumentClick1);
    document.addEventListener("click", handleDocumentClick2);
    window.addEventListener("click", handleWindowClick);

    return () => {
      // unmount
      document.removeEventListener("click", handleDocumentClick1);
      document.removeEventListener("click", handleDocumentClick2);
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  const handleDocumentClick1 = (event) => {
    // event.stopPropagation();
    // Nếu dùng thì ở console chúng ta sẽ nhận được là 
    // "click document handler 1
    // click document handler 2"
    
    
    // event.stopImmediatePropagation();
    // Nếu dùng thì ở console sẽ nhận được là 
    // "click document handler 1"
    // Ở đây sẽ chặn phần xử lý handle của handleDocumentClick2 luôn
    // thay vì chỉ chặn bubbling event click lên đối tượng window
    console.log("click document handler 1");
  };

  const handleDocumentClick2 = (event) => {
    console.log("click document handler 2");
  };

  const handleWindowClick = (event) => {
    console.log("click window"); // handler này sẽ không được xử lý vì đã bị chặn bubbling ở cấp document
  };

  return <div>hello world</div>;
}
```

Vậy còn capturing thì sao? Capturing là một giai đoạn khác tương tự như bubbling và nó sẽ chạy trước và ngược hướng so với giai đoạn bubbling.

```javascript
<html>
  <body>
    <div>
      <button>click me</button>
    </div>
    
    <script>
      for(let e of document.querySelectorAll('*')) {
        // Thêm true hoặc { capture: true } là tham số thứ 2 của "addEventListener"
        // để handler được xử lý ở giai đoạn Capturing
        e.addEventListener("click", e => console.log(`Capturing: ${e.tagName}`), true);
        e.addEventListener("click", e => console.log(`Bubbling: ${e.tagName}`));
      }
    </script>
  </body>
</html>
```

Ở đoạn code trên khi chúng ta click button `click me` thì even sẽ chạy lần lượt các giai đoạn như dưới:
1. Capturing - Giai đoạn sẽ chạy từ `html` => `body` => `div` và cuối cùng là `button`.
2. Target - Giai đoạn này là giai đoạn đạt đến đối tượng chính được click.
3. Bubbling - Giai đoạn sẽ chạy từ `button` => `div` => `body` => `html`

Và kết quả chúng ta sẽ nhận được như dưới:
```javascript
Capturing: HTML
Capturing: BODY
Capturing: DIV
Capturing: BUTTON
Bubbling: BUTTON
Bubbling: DIV
Bubbling: BODY
Bubbling: HTML
```

Vậy là chúng ta đã đi qua về `bubbling và capturing` tiếp đến hãy cùng xem lại về `Event Delegation`.
## 2. Tại sao lại là Event Delegation.
Ý tưởng của pattern này là khi chúng ta có quá nhiều phần tử giống nhau (như trong một danh sách vậy) và có cùng một phần xử lý event handler. Thì thay vì đặt phần handler đó vào mỗi phần tử trong danh sách thì sao không sử dụng một handler duy nhất cho phần tử cha của tất cả phần tử trong danh sách. Một điểm nữa là Event Delegation cho phép chúng ta handle xử lý cho những phần tử được thêm mới hoặc xoá khỏi danh sách. (vì phần handler xử lý đã được đưa lên đặt ở phần tử cha và chờ event được bubbling lên từ phần tử con).

Dưới đây là một số lợi ích khi áp dụng Event Delegation:
- Việc khởi tạo khá đơn giản và tiết kiệm bộ nhớ, không cần thêm nhiều handler mà chỉ dùng một handler.
- Những đoạn code trở nên ít hơn, khi thêm hoặc xoá phần tử thì không cần phải thêm hoặc xoá cả handler của phần tử đó.
- Việc cập nhật hàng loạt DOM bây giờ lại trở nên dễ dàng hơn (như là innderHTMl, style, ...).

Bên cạnh đó thì cũng có một số giới hạn. Như là việc chúng ta ngăn cản việc bubbling event bằng cách dùng `event.stopPropagation()` hoặc `event.stopImmediatePropagation()`. Hoặc có thể làm quá tải, vì việc handle xử lý tất cả đều dồn về phần tử cha (dù là ở trong handler có xử lý thoả mãn điều kiện hay không), nhưng mà may mắn là ảnh hưởng cũng không đáng kể lắm.

Vì vậy là ReactJS cũng áp dụng pattern này vào trong hệ thống event của nó. Tiếp theo hãy cùng đi vào một số thay đổi Event Delegation trong ReactJS phiên bản 17.
# II. Những thay đổi Event Delegation trong React 17.
## 1. Một số hiệu chỉnh của React 17.
Đầu tiên hãy nói một chút về những thay đổi trong React 17. Thì hầu hết những phiên bản khác của ReactJS khi cho ra mắt thì đều sẽ có một số tính năng mới (như là thêm một số lifecycle mới, rồi tính năng hooks chẳng hạn, ...). Nhưng phiên bản 17 này sẽ không có tính năng mới nào hết và thay vào đó là những hiệu chỉnh xoay quanh việc nâng cấp phiên bản hiện tại và một số hiệu chỉnh khác.

Trong đó thì có một phần hiệu chỉnh cho phép một dự án của chúng ta có thể dùng nhiều hơn một phiên bản ReactJS (ví dụ như dự án của bạn có thể sử dụng đồng thời v17 và v18, v18 và v19, ...). Mục đích là để tập trung giải quyết những vấn đề liên quan đến cập nhật phiên bản ReactJS cũ qua phiên bản ReactJS mới 1 cách từ từ, ít rủi ro và có kế hoạch (Bên cạnh đó thì việc cập nhật nhất quán phiên bản ReactJS trong toàn bộ dự án nên được khuyến khích ưu tiên hàng đầu. Và Chỉ dùng nhiều phiên bản ReactJS trong dự án của mình trong trường hợp dự án của bạn đã quá lâu không cập nhật phiên bản, dự án quá lớn để chịu sự thay đổi đó và nếu cập nhật cả dự án lên phiên bản mới sẽ có rủi ro cực cao, lượng công việc sẽ là cực lớn. Thay vì vậy thì chúng ta hãy cập nhật một cách từ từ theo đơn vị route, cập nhật từng route một lên phiên bản mới, từ từ cho đến khi là toàn bộ dự án).

Một chú ý nhỏ là việc sử dụng nhiều version ReactJS trong một dự án sẽ chỉ từ phiên bản v17 trở lên (ví dụ bạn ở v15 muốn lên v16 thì sẽ phải cập nhật toàn dự án nhất quán một phiên bản 16, còn nếu dự án ở v17 và muốn lên v18 hoặc hơn nữa thì có thể cân nhắc cập nhật lên từ từ từng route một lên v18 những route còn lại sẽ là v17).

Chúng ta sẽ không bàn nhiều về việc sử dụng nhiều phiên bản ReactJS trong một dự án nữa vì nó đã khá minh bạch rồi. Tiếp đến thì sẽ là một số thay đổi Event Delegation.
## 2. Những thay đổi Event Delegation.
Vì React 17 cho phép dự án của chúng ta có thể có nhiều hơn một phiên bản ReactJS. Nhưng nó cũng ảnh hưởng phần nào đến việc xử lý event của React. Và đặt ra thách thức không nhỏ.

Đơn cử là việc khi chúng ta gán những xử lý event handler như `onClick`
```javascript
<button onClick={handleClick}></button>
```
Và kết quả chúng ta mong muốn là
```javascript
button.addEventListener('click', handleClick);
```
Nhưng hầu hết những event thì React sẽ không gắn phần xử lý handler cho đối tượng mà chúng ta xác định trước đó (như ví dụ ở trên là chúng ta muốn gắn handler cho event click vào button). React sử dụng Event Delegation và gắn handler trực tiếp cho đối tượng `document` .

Và đây là lý do gây nên vấn đề khi chúng ta có nhiều phiên bản React trong một dự án.

Vì nếu chúng ta có nhiều phiên bản ReactJS trong một dự án và tương ứng với mỗi phiên bản thì sẽ riêng biệt với nhau. Và tất cả những xử lý event handler đều đăng ký tại trên cùng của React Tree. Hãy thử nghĩ đến trường hợp mà dự án dùng một phiên bản ReactJS khác thì nó sẽ cần lồng vào trong một React Tree có sẵn. Khi ở React Tree mới được lồng mà bạn muốn chặn bubbling event (bằng cách dùng `event.stopPropagation()`) nhưng mà phần React Tree cũ lồng ở ngoài vẫn có thể nhận bubbling event đó. Vì lý do này mà dẫn đến React sẽ thay đổi việc gắn event handler vào trong DOM trong v17.

Ở phiên bản React 17 này thì thay vì gắn những phần xử lý event handler vào đối tượng `document` thì React sẽ gắn vào `root elemnent` của React Tree mà chúng ta muốn render.
```javascript
const rootNode = document.getElementById('root');
ReactDOM.render(<App />, rootNode);
```

Ở React 16 sẽ là `document.addEventListener()`

Còn ở React 17 bây giờ sẽ là `rootNode.addEventListener()`

Vì vậy mà tất cả những dự án có phiên bản từ v16 trở xuống sẽ không thể cùng lúc dùng nhiều phiên bản được, bạn sẽ cần cập nhật dự án của mình lên v17. Và việc cập nhật dự án của bạn lên v17 sẽ là bước đệm rất quan trọng và hữu ích sau này.

Thật tuyệt vời đúng không hãy nhanh tay cập nhật dự án của mình lên v17 nào!!! Bên cạnh đó hãy lưu ý về một số chỗ bạn cần phải điều chỉnh khi lên v17 (hoặc bất cứ khi nào bạn cập nhật phiên bản mới).

Một ví dụ về một số chỗ cần điều chỉnh khi lên v17 như là ở v16 bạn có định nghĩa một số lắng nghe của riêng mình từ đối tượng `document.addEventListener()` thì bạn sẽ phải đổi nó một chút. Vì khi bạn dùng `event.stopPropagation()` để ngăn bubbling lên `document` thì nó sẽ không mang lại hiệu quả và đối tượng `document` vẫn sẽ lắng nghe được và chạy phần xử lý handler (đơn giản vì ngay từ đầu những event đó đã ở `document` rồi và đang cùng cấp việc ngăn bubbling bây giờ là vô nghĩa). Nhưng ở v17 thì điều đó là ngược lại:
```javascript
document.addEventListener('click', function() {
  // Handler do riêng bạn định nghĩa này sẽ không được khởi chạy
  // nếu ở React components bạn chặn bubbling bằng event.stopPropagation()
});
```
Trường hợp này bạn có thể sửa bằng cách lợi dụng giai đoạn `Capturing` khi event kích hoạt (mình có giải thích ở phần trên):
```javascript
document.addEventListener('click', function() {
  // Bây giờ thì phần handler của bạn sẽ được lắng nghe và xử lý đầu tiên,
  // do nó đang được định nghĩa nằm trong giai đoạn Capturing.
  // Vì thế nó sẽ handle tất cả những event click từ React components của bạn
}, { capture: true });
// hoặc dạng rút gọn
document.addEventListener('click', function() { ... }, true);
```
Thật thú vị đúng không nào! Tiếp đến hãy tổng kết lại những gì chúng ta đã tìm hiểu được trong bài viết lần này!
# III. Kết luận.
Vậy là chúng ta đã cùng đi qua một số thay đổi Event Delegation của React 17 rồi! Chúng ta đã đi xuyên suốt từ event `bubbling và capturing` cũng như là pattern `Event Delegation`, sau đó là một số hiệu chỉnh mà React 17 tập trung trong lần ra mắt này. Chúng ta cũng đã phần nào hiểu thêm về cách thức hệ thống event của React xử lý với những event của chúng ta và cũng thấy được sự quan trọng của React 17 (được ví như "stepping stone" trong công cuộc cập nhật phiên bản sau này). Vậy thì còn chần chờ gì nữa mà không cập nhật dự án của bạn lên React 17 ngay nào!:dragon:

Bài viết của mình đến đây là hết rồi! Cảm ơn các bạn đã đón đọc! Xin chào và hẹn gặp lại trong các bài viết kế tiếp.