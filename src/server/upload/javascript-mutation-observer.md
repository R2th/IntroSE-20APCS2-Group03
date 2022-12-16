# Cú pháp

`MutationObserver` sử dụng cực kỳ đơn giản.  Chúng ta chỉ cần tạo ra
một đối tượng observer với các callback tương ứng:

```js
let observer = new MutationObserver(callback);
```

Sau khi đã có observer rồi, chúng ta chỉ cần gắn nó với DOM cần quan
sát là đủ:

```js
observer.observe(node, config);
```

Trong phương thức trên, `config` là một đối tượng với các giá trị dạng
boolean, ứng với các key sau, mang ý nghĩa "thành phần nào của DOM
thay đổi sẽ được gọi callback":

- `childList` - Thay đổi trong các thành phần con trực tiếp của
`node`.
- `subtree` - Mọi thành phần trong `node`
- `attributes` - các thuộc tính của `node`,
- `attributeOldValue` - Ghi lại giá trị cũ của các thuộc tính (config
  này kết hợp với config `attributes` ở trên),
- `characterData` - Có quan sát `node.data` (nội dung của các thẻ)
  hay không
- `characterDataOldValue` - Ghi lại giá trị cũ của `node.data` (dùng
  kết hợp với `characterData`),
- `attributeFilter` - Một dánh sách các thuộc tính observer sẽ quan
  sát.
  
Sau khi có bất kỳ thay đổi nào trên DOM theo config trên, `callback`
sẽ được gọi thực thi với hai tham số: tham số thứ nhất là một danh
sách các [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord)
và tham số thứ hai chính là đối tượng observer.

[MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) là những
đối tượng có thuộc tính như sau:

- `type` - là một trong số các giá trị (chỉ thuộc tính nào thay đổi)
    - `"attributes"`: thuộc tính dã thay đổi
    - `"characterData"`: dữ liệu đã thay đổi (chỉ áp dụng với node text)
    - `"childList"`: các thành phần con thay đổi (thêm/bớt)
- `target` - Sự thay đổi xảy ra ở đâu
- `addedNodes/removedNodes`  - các node được thêm/bớt
- `previousSibling/nextSibling` - Các anh em phía trước/sau của node
  được thêm/bớt
- `attributeName/attributeNamespace` - tên hoặc namespace (áp dụng với
XML) của thuộc tính bị thay đổi.
- `oldValue` - Giá trị trước khi thay đổi, chỉ áp dụng với thuộc tính
  hoặc text.
  
Ví dụ, chúng ta có một `div` với thuộc tính `contentEditable` như sau,
chúng ta có thể tập trung vào đó:

```html
<div contentEditable id="elem">Click and <b>edit</b>, please</div>

<script>
let observer = new MutationObserver(mutationRecords => {
  console.log(mutationRecords); // console.log(the changes)
});
observer.observe(elem, {
  // observe everything except attributes
  childList: true,
  subtree: true,
  characterDataOldValue: true
});
</script>
```

Nếu chúng ta thay đổi text bên trong `<b>edit</b>` chúng ta sẽ gặp một
thuộc tính `MutationRecord`:

```js
mutationRecords = [{
  type: "characterData",
  oldValue: "edit",
  target: <text node>,
  // other properties empty
}];
```

Nếu chúng ta xoá bỏ thành phần `<b>edit</b>`, chúng ta sẽ gặp nhiều
`MutationRecord` hơn:

```js
mutationRecords = [{
  type: "childList",
  target: <div#elem>,
  removedNodes: [<b>],
  nextSibling: <text node>,
  previousSibling: <text node>
  // other properties empty
}, {
  type: "characterData"
  target: <text node>
  // ...details depend on how the browser handles the change
  // it may coalesce two adjacent text nodes "edit " and ", please" into one node
  // or it can just delete the extra space after "edit".
  // may be one mutation or a few
}];
```

# Cách sử dụng

Chúng ta cần sử dụng `MutationObserver` khi nào?  Đó là một câu hỏi
khó.  Vì thực tế, từng node trên DOM cũng có thể trigger event và gọi
callback khi có thay đổi rồi.

Dưới đây là một số trường hợp mà `MutationObserver` sẽ cần thiết:

Chúng ta cần nó để theo dõi một số thuộc tính, ví dụ `contentEditable`
và cài đặt tính năng undo/redo.  Lúc này, `MutationObserver` sẽ là
thích hợp hơn cả.

Thử tưởng tượng chúng ta xây dựng một website về lập trình.  Lẽ tự
nhiên là các đoạn code sẽ thường xuyên xuất hiện trên trang web đó, có
thể có dạng như sau:

```html
...
<pre class="language-javascript"><code>
  // here's the code
  let hello = "world";
</code></pre>
...
```

Ở đây, để highlight code cho đẹp, chúng ta có thể sử dụng một số thư
viện JavaScript, ví dụ [Prism.js](https://prismjs.com/).  Thế nhưng để
gọi phương thức `Prism.highlightElem(pre)` của thư viện này, thời điểm
là cực kỳ quan trọng.

Chúng ta có thể gọi theo event `DOMContentLoaded`, hoặc ở dưới cùng
của trang, khi mà toàn bộ HTML đã được tải hết.

```js
// highlight all code snippets on the page
document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);
```

Sau khi gọi như trên thì đoạn code sẽ được highlight (dưới đây chỉ
mang tính chất minh hoạ):

```js
// here's the code
let hello = "world";
```

Mọi việc rất đơn giản, chúng ta gọi thư viện để highlight code trong
các thẻ `pre`.  Thế nhưng mọi thứ sẽ phức tạp hơn khi mà chúng ta có
những tính năng ví dụ như lấy code từ một server bên ngoài.

```js
let article = /* fetch new content from server */
articleElem.innerHTML = article;
```

Giá trị của `article` sẽ bao gồm các đoạn code cần highlight.  Chúng
ta cần gọi thư viện `Prism.highlightElem`, nếu không code trông sẽ rất
xấu.  Vấn đề bây giờ phức tạp hơn, bởi việc gọi thư viện
`Prism.highlightElem` sẽ phụ thuộc vào việc tải dữ liệu từ server
ngoài.

Chúng ta có thể thực viện việc đó sau khi tải xong như sau:

```js
let article = /* fetch new content from server */
articleElem.innerHTML = article;

*!*
let snippets = articleElem.querySelectorAll('pre[class*="language-"]');
snippets.forEach(Prism.highlightElem);
*/!*
```

Nhưng nếu chúng ta có rất nhiều những thành phần như vậy trên một
trang, chúng ta phải gọi phương thức highlight code đó ở bất cứ đâu.
Đó quả là một sự bất tiện không hề nhẹ.

Rất may mắn là `MutationObserver` cho chúng ta một phương án khác tốt
hơn.  Chúng ta có thể sử dụng nó để tự động theo dõi quá trình thay
đổi của DOM (khi nào các đoạn code được thêm vào) và thực hiện
highlight chúng.

Như vậy, việc highlight code chỉ cần thực hiện ở một nơi, không hề cần
phải lo lắng liệu chúng ta có thể quên mất không gọi nó ở nơi nào hay
không.

# Ví dụ

Dưới đây là một ví dụ thực tế, bằng việc sử dụng observer như sau,
chúng ta sẽ quan sát các thành phần của DOM và thực hiện highlight
code mỗi khi chúng xuất hiện:

```js
let observer = new MutationObserver(mutations => {

  for(let mutation of mutations) {
    // examine new nodes

    for(let node of mutation.addedNodes) {
      // we track only elements, skip other nodes (e.g. text nodes)
      if (!(node instanceof HTMLElement)) continue;

      // check the inserted element for being a code snippet
      if (node.matches('pre[class*="language-"]')) {
        Prism.highlightElement(node);
      }

      // maybe there's a code snippet somewhere in its subtree?
      for(let elem of node.querySelectorAll('pre[class*="language-"]')) {
        Prism.highlightElement(elem);
      }
    }
  }

});

let demoElem = document.getElementById('highlight-demo');

observer.observe(demoElem, {childList: true, subtree: true});
```

Đoạn code dưới đây sẽ thực hiện điền `innerHTML` cho các thành phần.
Chạy thử đoạn code trên vào đoạn dưới đây, bạn sẽ thấy điều kỳ diệu:

```js
let demoElem = document.getElementById('highlight-demo');

// dynamically insert content with code snippets
demoElem.innerHTML = `A code snippet is below:
  <pre class="language-javascript"><code> let hello = "world!"; </code></pre>
  <div>Another one:</div>
  <div>
    <pre class="language-css"><code>.class { margin: 5px; } </code></pre>
  </div>
`;
```

Giờ đây, chúng ta có một `MutationObserver` có thể quan sát DOM và
thực hiện highlight code theo đúng yêu cầu, chúng ta có thể load bao
nhiêu code rồi hiển thị tuỳ ý, mà không cần phải lo về việc highlight
chúng nữa.

# Các phương thức khác

Chúng ta có thể dừng việc quan sát của một observer lại như sau:

```js
observer.disconnect()
```

Ngoài ra, chúng ta có thể sử dụng:

```js
mutationRecords = observer.takeRecords()
```

để lấy ra danh sách các MutationRecord chưa được xử lý (những sự thay
đổi đã xảy ra, nhưng callback chưa xử lý chúng).

```js
// we're going to disconnect the observer
// it might have not yet handled some mutations
let mutationRecords = observer.takeRecords();
// process mutationRecords

// now all handled, disconnect
observer.disconnect();
```

# Kết luận

`MutationObserver` có thể quan sát dự thay đổi của DOM và chúng ta có
thể sử dụng nó để theo dõi các thay đổi đó, đồng thời có hành động
tương ứng phù hợp.