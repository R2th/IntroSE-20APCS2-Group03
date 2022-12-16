![](https://images.viblo.asia/554010d0-223f-4b56-aee0-049bf3dc23f6.png)
Hello mọi người,

Bài viết đầu tiên của mình trên VIBLO, mình muốn chia sẻ một trang web đơn giản mình đã xây dựng để liệt kê các extension hữu ích dành cho VS Code.
# TL;DR
Dành cho những bạn lười đọc:
* [Đây là trang web thành quả](https://khang-nd.github.io/vscode-exts)
* [Đây là mã nguồn](https://github.com/khang-nd/vscode-exts)

Kỹ thuật sử dụng:
* HTML, JS
* Cú pháp ES6
* [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* [Bulma CSS](https://bulma.io/)

# Coding
Cấu trúc chính gồm có
```html
vscode-exts
  |_exts.js
  |_get.js
  |_index.html
```

Đầu tiên mình tạo file [exts.js](https://github.com/khang-nd/vscode-exts/blob/main/exts.js) để chứa mảng các extension ID. ID này bạn có thể lấy từ URL của Marketplace, ví dụ:
`https://marketplace.visualstudio.com/items?itemName=`**`streetsidesoftware.code-spell-checker`**

Tiếp theo, tạo file [get.js](https://github.com/khang-nd/vscode-exts/blob/main/get.js) để thực hiện việc lấy data bằng Fetch API:
```javascript
const marketUrl = "https://marketplace.visualstudio.com/items?itemName=";
const installUrl = "vscode://";
const selector = {
  name: ".ux-item-name",
  author: ".ux-item-publisher",
  installs: ".ux-item-rating",
};

const promises = extensions.map((ext) =>
  fetch(marketUrl + ext)
    .then((page) => page.text())
    .then((content) => {
      const dom = new DOMParser().parseFromString(content, "text/html");
      return {
        name: dom.querySelector(selector.name).textContent,
        author: dom.querySelector(selector.author).textContent,
        installs: dom.querySelector(selector.installs).textContent.replace(/[^\d,]/g, ""),
        marketUrl: marketUrl + ext,
        installUrl: installUrl + ext,
      };
    })
);

const getExtensions = () => Promise.all(promises);
```
Ở đây mình dùng Fetch để lấy data trực tiếp từ cây DOM. Mình map các extension ID vào request, sau đó trả về một Promise sau khi tất cả các request cùng hoàn tất.

Cuối cùng là tạo file [index.html](https://github.com/khang-nd/vscode-exts/blob/main/index.html), nhúng 2 file js vào, sử dụng Bulma CSS để tinh chỉnh giao diện và hiển thị data lên giao diện.

Mong là bài chia sẻ giúp ích cho mọi người.<br>
@khangnd<br>[![Github](https://images.viblo.asia/20x20/81dd12f0-a8c9-403f-ae51-27b92828ca22.png)](https://github.com/khang-nd) [![Linkedin](https://images.viblo.asia/20x20/4981766e-5e57-401a-8623-d3657a3148e5.png)](https://www.linkedin.com/in/khangnd/) [![Dev.to](https://images.viblo.asia/20x20/3921db2e-e4e5-45d7-acc8-e8b92e02d47d.png)](https://dev.to/khangnd) [![Fandom](https://images.viblo.asia/20x20/fad64df3-0be8-4481-b810-8995f18f71ea.png)](https://dev.fandom.com/wiki/User:KhangND)