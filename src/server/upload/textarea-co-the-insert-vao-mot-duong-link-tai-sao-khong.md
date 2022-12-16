Nếu bạn làm về dự án có nhiều form thì chắc sẽ không tránh khỏi việc có thể copy paste một đường link vào input hoặc textarea nhỉ.

Nhưng vấn đề ở đây là input và textarea chỉ cho phép bạn paste vào một đường dẫn dạng văn bản chứ không phân biệt được đây là một đường link có thể click vào.

Ở bài viết này mình sẽ hướng dẫn bạn làm nó nhé. Bắt đầu nào :grin::grin::grin::grin::grin::grin:

### Create component

Vì để có thể chèn một thẻ link vào thì bắt buộc ô textarea của mình nó phải là một thẻ `div`. Đơn giản là vì `textarea` bình thường không thể chèn thêm thẻ nào vào cả.

`div` nó có một thuộc tính là `contenteditable` nó cho phép bạn có thể gõ những gì mình thích vào đó y hệt như một ô textarea bình thường.

```js
<div
  className="editor"
  contentEditable 
  suppressContentEditableWarning
/>
```

Bạn có thể tự style css lại cho editor của mình thật đẹp nhé.

![](https://images.viblo.asia/eff1a635-c348-46ba-abee-8317bbf7f584.PNG)

### Event paste

Để có thể insert một thẻ link vào `editor` thì bạn cần phải handle event paste của `editor` nhé.

Mình gắn vào `editor` một ref để có thể handle event của nó.

```js
const editorRef = useRef(null)

<div
  className="editor"
  contentEditable 
  suppressContentEditableWarning
  ref={editorRef}
/>
```

Bây giờ mình sẽ handle event paste của nó nhé.

```js
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.addEventListener('paste', (e) => {
        e.preventDefault()
        const contentCopied = e.clipboardData.getData('text/plain') // lấy ra nội dung của bạn đã copy từ trước đó
        // Tạo một thẻ link để insert trực tiếp vào editor
        const el = `<div class="link" contenteditable="false"><a href="${contentCopied}" target="_blank">${contentCopied}</a></div>`
        document.execCommand("insertHTML", false, el)
      })
    }
  }, [editorRef])
```
![](https://images.viblo.asia/d74846e7-37af-49f5-bf06-f5e8f69f1da6.PNG)

Ở đây nếu thẻ div mình vừa tạo ra có `class="link"` nó đang là một thẻ `block` nên sẽ gặp vấn đề là bạn sẽ  không thể gõ chữ cùng hàng với nó được. Vậy thì nhớ thêm style cho thẻ div đó thành `inline-block` nhé.

###  Phân biệt link và text

Nếu chỉ làm như trên thì bạn chỉ mới có thể insert link vào và mặc định những thứ bạn copy paste nó đều hiển thị ra một cái link.

Bây giờ mình sẽ validate những nội dung được copy và phân chia nó ra làm 2 loại là text bình thường và url.

Function validate
```js
function isUrlValid(userInput) {
  var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

  return !!res
}
```

```js
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.addEventListener('paste', (e) => {
        e.preventDefault()
        const contentCopied = e.clipboardData.getData('text/plain')

        if (isUrlValid(contentCopied)) {
          const el = `<div class="link" contenteditable="false"><a href="${contentCopied}" target="_blank">${contentCopied}</a></div>`

          document.execCommand("insertHTML", false, el)
        } else {
          document.execCommand("insertText", false, contentCopied)
        }
      })
    }
  }, [editorRef])
```
![](https://images.viblo.asia/5f206f11-7ea7-49a8-98fe-309fdbb1ab90.PNG)

### Convert link to text

Thay vì hiển thị những đường link bạn vẫn có thể thay thế đường link đó bằng một đoạn text tương ứng nhé.

VD: https://www.facebook.com/ ---> Facebook, ...

convertLinkToText.js
```js
// Bạn có thể thêm những đường link mình cần vào đây nhé
const listLink = [
  {
    link: "https://www.facebook.com",
    text: "Facebook",
  },
  {
    link: "https://github.com",
    text: "Github",
  },
  {
    link: "https://viblo.asia",
    text: "Viblo",
  },
  {
    link: "https://www.google.com",
    text: "Google",
  },
]

const convertLinkToText = (link) => {
  const existLink = listLink.find(item => link.includes(item.link))

  return !!existLink ? existLink.text : link
}

export default convertLinkToText
```

```js
if (isUrlValid(contentCopied)) {
    const el = `<div class="link" contenteditable="false"><a href="${contentCopied}" target="_blank">${convertLinkToText(contentCopied)}</a></div>`
    document.execCommand("insertHTML", false, el)
  } else {
    document.execCommand("insertText", false, contentCopied)
}
```
![](https://images.viblo.asia/b24d045b-da9e-4190-8307-1ba1ee19b9b6.PNG)

Trên đây chỉ là một component nhỏ nhỏ mà mình tìm hiểu được và cũng cảm thấy hay hay nên chia sẻ cho những ai cần.

Mình không chắc là nó hoàn hảo nhé :laughing: nếu gặp bug thì mình ráng fix thôi :laughing::laughing::laughing:

Cảm ơn các bạn đã đọc bài viết nhá :clown_face::clown_face::clown_face: