### **Browser**
**I. arrayToHtmlList**
Nôm na là chuyển các element trong mảng thành các thẻ `li` và append chúng vào listID
```
const arrayToHtmlList = (arr, listID) =>
  arr.map(item => (document.querySelector('#' + listID).innerHTML += `<li>${item}</li>`));
```
*example*
```
arrayToHtmlList(['item 1', 'item 2'], 'myListID');
```

### II. bottomVisible
Trả về `true` nếu thanh scroll đang ở dưới cùng của browser và ngược lại sẽ trả về `false`
```
const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight || document.documentElement.clientHeight);
```
*example*
bottomVisible(); //true or false.

### III. copyToClipboard
Cái này thì khá phổ biến rồi nó sẽ copy một `string` vào `clipboard`

```
const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};
```

*example*
```
copyToClipboard('copy to clipboard'); // 'copy to clipboard' sẽ được copy vào clipboard
```

### IV: currentURL
Trả về URL hiện tại trên Browser
```
const currentURL = () => window.location.href;
```

*example*
```
currentURL(); // 'https://viblo.asia'
```

### V: detectDeviceType
Trả về kết quả là `Mobile` hay `Desktop` trong truy cập vào browser
```
const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? 'Mobile'
    : 'Desktop';
```
*example*
```
detectDeviceType(); // "Mobile"
detectDeviceType(); // "Desktop"
```

### VI: getScrollPosition
Trả về scroll position của trang hiện tại

```
const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});
```

*example*
```
getScrollPosition(); // {x: 0, y: 200}
```

### VII: getStyle
Trả về style của 1 phần tử được chỉ định
```
const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];
```

*example*
getStyle(document.querySelector('p'), 'font-size'); // '14px'

### VIII: scrollToTop
Di chuyển croll lên đầu trang
```
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
```

*example*
```
scrollToTop();
```

### IX: hasClass
Thường thì dùng jquery nhưng nếu dung javascript thì có thể dev như sau:
```
const hasClass = (el, className) => el.classList.contains(className);
```

*example*
```
hasClass(document.querySelector('p.special'), 'special'); // true
```

### X: hide
Set `display: none` cho element. 

```
const hide = (...el) => [...el].forEach(e => (e.style.display = 'none'));
```

*example*
```
hide(document.querySelectorAll('img')); // ẩn tất cả các thể `img`
```

### XI: Kết:
Chúng ta có thể làm mọi thứ rất đơn giản với javascript. Suy cho cùng thì tất cả các thư viện js hiện tại cũng đều bắt nguồn từ javascript. Nên nếu có thể chúng ta hãy nên tự dev ra các function và không phụ thuộc vào thư viện