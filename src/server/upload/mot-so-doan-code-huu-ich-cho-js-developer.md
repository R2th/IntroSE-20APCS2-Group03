# 1. Sao chép ảnh
```js
const copyImageToClipboard = async (imageElement) => {
  let canvas = document.createElement("canvas");
  canvas.width = imageElement.width;
  canvas.height = imageElement.height;
  let ctx = canvas.getContext("2d");
  ctx.drawImage(imageElement, 0, 0);

  const dataURL = canvas.toDataURL();
  const blob = await (await fetch(dataURL)).blob();
  navigator.clipboard.write([
    new ClipboardItem({
      "image/png": blob,
    }),
  ]);
};
```
```html
<img crossorigin="anonymous" src="https://picsum.photos/200" alt="">
<button>Copy</button>
```
```js
document.querySelector("button").onclick = () => {
  copyImageToClipboard(document.querySelector("img"))
}
```
# 2. Sao chép văn bản
```js
const copyToClipboard = (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    } else {
      let textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise((res, rej) => {
        document.execCommand("copy") ? res() : rej();
        textArea.remove();
      });
    }
  } catch (error) {
    console.error(error);
  }
};
```
# 3. Force download file
**Tải file với thẻ a. 
Không hoạt động nếu file được trả về không có header "Content-Disposition: attachment"**
```js
const forceDownloadFile = (url) => {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = url;
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};
```
# 4. Tính khoảng thời gian đã qua
```js
const calculateElapsedTime = (timeCreated) => {
  const created = new Date(timeCreated).getTime();
  let periods = {
    year: 365 * 30 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
  };
  let diff = Date.now() - created;

  for (const key in periods) {
    if (diff >= periods[key]) {
      let result = Math.floor(diff / periods[key]);
      return `${result} ${(result === 1 ? key : key + "s")} ago`;
    }
  }

  return "Just now";
};

calculateElapsedTime("2022-05-20T09:03:20.229Z")
// output: 2 minutes ago
```
# 5. Định dạng số
```js
const formatNumber = (num) => {
  return Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(num);
}

formatNumber(389210)
// output: '389.2K'
```
# 6. Thay thế tất cả các ký tự trong chuỗi
```js
let str = "ababaa";
// Replace "b" with ""
// Output "aaaa"

// Regex
str.replace(/b/g, "");

// Better regex
str.replace(new RegExp("b", "g"), "");

// Split and join
str.split("b").join("");

// Replace All (modern browser)
str.replaceAll("b", "");

// While loop
while (str.includes("b")) str = str.replace("b", "");
```
# 7. Format file size
```js
const formatFileSize = (size) => {
  let i = Math.floor(Math.log(size) / Math.log(1024));

  return `${(size / Math.pow(1024, i)).toFixed(1)} ${
    ["B", "KB", "MB", "GB", "TB"][i]
  }`;
};

formatFileSize(32143332) // output: "30.7 MB"
formatFileSize(8904869085) // output: "8.3 GB"
```
# 8. Format video time
```js
const formatVideoTime = (seconds) => {
  try {
    const date = new Date(0);
    date.setSeconds(seconds);
    const time = date.toISOString().slice(11, 19);
    const result = time.startsWith("00:0")
      ? time.slice(4)
      : time.startsWith("00")
      ? time.slice(3)
      : time.length === 8 && time.startsWith("0")
      ? time.slice(1)
      : time;
    return result;
  } catch (error) {
    return "0:00";
  }
};

formatVideoTime(20) // output: "0:20"
formatVideoTime(135) // output: "2:15"
formatVideoTime(3214) // output: "53:34"
formatVideoTime(32143) // output: "8:55:43"
```