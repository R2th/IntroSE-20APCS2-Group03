*Có lẽ đa số chúng ta đã có lần sử dụng các `URL Shortener` như [Bitly](https://bitly.com/), [Tiny](https://tiny.cc/),... để rút ngắn các đường `link` dài để có thể dễ dàng chia sẻ chúng cho bạn bè, đồng nghiệp cũng như các trích dẫn trên `slides` trình chiếu để trông chuyên nghiệp hơn.*

*Trong bài viết này, chúng ta sẽ cùng nhau xây dựng một ứng dụng `URL Shortener` đơn giản chỉ với xíu `HTML` và `Javascript` nhé ^^*

![](https://images.viblo.asia/fe9d0095-b5b1-4ca5-999c-2477587d71e0.gif)

## Intro.

Giao diện ứng dụng của chúng ta sẽ bao gồm 1 ô `input` dùng để dán `link` cần rút gọn vào và 1 `button` để thực hiện việc rút gọn `link`:

![](https://images.viblo.asia/6207492b-a6f6-453d-b218-063ac7397e4d.PNG)

Và như đã nói ở phía trên, `Tech Stack` được sử dụng sẽ là 1 chút `HTML`, 1 chút `CSS` và 1 chút `Javascript`, về cơ sở dữ liệu để lưu trữ thì chúng ta sẽ nhờ vào anh bạn [Jsonstore](https://www.jsonstore.io/) 😺😺

*Okayyy, bắt đầu nào !*

## Steps

Thư mục `URLshorten` sẽ bao gồm các `file`:
```html
🧊 URLshorten
          |____ 📄 index.html
          |____ 📋 main.js
```

### HTML 
Đầu tiên, trong `index.html`, chúng ta tạo một  `input`, `button`, và `script` dẫn `main.js` vào trong thẻ `body`:
```html
<input type="url" id="txtUrl">
<button onclick="shortenUrl()">Get my shortened URL</button>

<script src="./main.js"></script>
```
Ô `input` là nơi dán đường `link` cần rút gọn, do đó, mình sẽ đặt thêm `id` cho nó để chúng ta có thể dễ dàng truy cập vào `element` này nhờ vào `Javascript`.

Tiếp theo là `button` được gắn sự kiện `onClick` với chức năng rút gọn `link` thông qua `shortenUrl()`. Hàm  sẽ được thực hiện mỗi lần `click` vào `button`.

Cuối cùng là thẻ `script` dẫn `main.js` vào `index.html`. Hàm `shortenUrl()` phía trên sẽ nằm trong `file` này.

Ở bước này bạn có thế rải thêm chút `CSS` theo ý thích để ứng dụng của chúng ta xinh xẻo hơn chút 😛😛

### Data store
Trước khi cùng nhau viết những dòng `Javascript` đầu tiên, chúng ta sẽ sử dụng [Jsonstore](https://www.jsonstore.io/) để lưu trữ các đường `link` dài được người dùng cần rút gọn.

Đúng như cái tên, `Jsonstore` là một `JSON based cloud datastore` bảo mật và hoàn toàn miễn phí. Nó cung cấp cho bạn một `Enpoint` cho phép gửi các `HTTP requests` đến `datastore` của mình.

Trong bài viết này, mình sẽ sử dụng `enpoint` dưới đây:
```ts
const ENDPOINT = 'https://www.jsonstore.io/b7500b390a31a7fdc2bde29c94607fda2a38bcc19368e99835309de795232577';
```
Về cơ sở dữ liệu để lưu trữ, bạn hoàn toàn có thể sử dụng những nơi khác tùy ý, hãy xem `Jsonstore` như một trong những gợi ý nhé 😺😺

### Javascript
Hãy điểm qua các xử lý của hàm `shortenUrl()` trước khi đi vào `code`:
```js
function shortenUrl() {
  var longUrl = getUrl();    // Bước (1)
  genHash();                //  Bước (2)
  send_request(longUrl);   //   Bước (3)
}
```

<br/>

##### Bước (1) - `getUrl()`
Bước đầu trong quá trình xử lý rút gọn `link` là lấy được chuỗi `link` cần rút gọn mà người dùng dán vào ô `input`:
```js
const URL_REGEXP = new RegExp("^(http|https|ftp)://", "i");

function getUrl() {
  let url = document.getElementById('txtUrl').value;
  let isProtocolOk = URL_REGEXP.test(url);
  return isProtocolOk ? url : ('http://' + url);
}
```
Trong hàm `getUrl()` phía trên, mình có kiểm tra chuỗi người dùng dán vào có phải là một đường dẫn không qua `Regular Expression`. Ngoài ra chuỗi `RegExp` phía trên, chúng ta cũng có thể kiểm tra bằng các `built-in methods` như:
```js
let isProtocolOk = url.startsWith('http://') || url.startsWith('https://') || url.startsWith('ftp://');
```

<br/>

##### Bước (2) - `genHash()`
Lấy được `link` người dùng nhập rồi, chúng ta sẽ tạo một chuỗi ngẫu nhiên:
```js
function genHash() {
  if (window.location.hash == '') {
    window.location.hash = getRandomString();
  }
}
```

**Chuỗi ngẫu nhiên được tạo ra để làm gì?**

Giả sử ứng dụng `URL Shortener` của chúng ta có đường dẫn là: *`https://co.devnotes.vn`* *(ví dụ vậy, hosting này chưa tồn tại đâu các bạn ạ^^)*.
Mình vào ứng dụng này để rút gọn đường link một bài viết:
```js
https://haodev.wordpress.com/2020/03/18/pistory-0-khi-dan-than-vao-bo-mon-cao-phim/
```
Lúc này, `expect` là mình sẽ nhận được một đường `link` rút gọn ngắn hơn có dạng:
```js
https://co.devnotes.vn#<UNIQUE_STRING>
```
Kết quả là  *https://co.devnotes.vn#867lbb* chẳng hạn, khi truy cập vào đường dẫn này, chúng ta sẽ được `re-direct` về đường link dài ban đầu 😻😻

<br/>

Để tạo ra những chuỗi ngẫu nhiên như vậy có rất nhiều cách. Trong bài viết này mình làm như thế này:
```js
function getRandomString() {
  let random_string = Math.random().toString(32).substring(2, 5) + Math.random().toString(32).substring(2, 5);
  return random_string;
}
```
Ngoài cách trên, bạn có thể sử dụng một số thư viện ngoài hoặc tự viết ra quy tắc `generate` ra chuỗi ngẫu nhiên của bản thân nhé ^^

Chúng ta sẽ lưu chuỗi này vào `window.location.hash` *(như trong `genHash()` phía trên)*.

<br/>

##### Bước (3) - `send_request(longUrl)`
Có `longUrl`, có `genhash()` rồi thì mình gửi `POST request` thôi ^^

Tới đây nhờ [`Jquery` gọi `AJAX`](https://api.jquery.com/jquery.ajax/) cho gọn gàng nhé:
```JS
function sendRequest(url) {
  $.ajax({
    'url': endpoint + '/' + window.location.hash.substr(1) /* remove # */,
    'type': 'POST',
    'data': JSON.stringify(url),
    'dataType': 'json',
    'contentType': 'application/json; charset=utf-8'
  })
}
```
Bạn nhớ `embed` thêm `Jquery` vào `index.html`:
```js
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
```
Trở lại với `sendRequest() `, hàm này gửi một `JSON request` lên:
```js
ENDPOINT/<UNIQUE_STRING>
```
để lưu lại đường `link` gốc *(`url param`)* như là `data`.

Như vậy thì, mỗi khi `link` rút gọn được đặt lên `address bar`*(https://co.devnotes.vn#867lbb)*, chúng ta gửi `GET request` lên `ENDPOINT/<UNIQUE_STRING>` *(`ENDPOINT/867lbb`)*
và chúng ta sẽ nhận lại được đường `link` người dùng nhập vào bạn đầu:
```js
function checkCurentUrl() {
  let hashExisting = window.location.hash.substr(1);
  if (hashExisting) {
    $.getJSON(endpoint + "/" + hashExisting,
      function (data) {
        data = data["result"];
        if (data != null) {
          window.location.href = data;
        }
      }
    )
  }
}
```

*Bây giờ thì thử sử dụng xem nào ^^* 


`Copy-paste` một `link` bất kì nào đó, `click` vào `button` và nhận lại `link rút gọn` của mình trên thanh `address bar` nhé 😄😄

### Extension
Bạn có thể xem toàn bộ `source code` của `mini-project` này [tại đây](https://github.com/haolt/URLshorten). Chức năng thì đã `okie` rồi. Song, để phát triển ứng dụng hơn, chúng mình có thể thêm chức năng cho phép `custom hash` để link rút gọn có ý nghĩa dễ nhớ hơn này, hay cho phép người dùng lưu trữ các `link` đã rút gọn nữa chẳng hạn,...

Ngoài ra, để `UX` tốt hơn, chúng mình có thể thêm chức năng  `tự động copy` sau khi có `link` rút gọn trả về nhé !

Một gợi ý là bạn có thể sử dụng thêm các thư viện cho phép `copy URL` trên `address bar` như *[`SimpleCopy`](https://github.com/kyle-rb/simplecopy), [`ClipboardJS`](https://clipboardjs.com/), etc.*

Thử xem nàooo ! Mình chờ các **`pull requests`** từ các `homie` đó 😉😉

## Kết

Yayyy, vậy là chúng ta đã cùng nhau `code` một ứng dụng `URL Shortener` đơn giản rồi. Hy vọng rằng bài viết này có thể giúp ích được cho các bạn. Tặng mình **`1 upvote`** để có động lực cho các bài viết tiếp theo nhé ^^

![](https://images.viblo.asia/f0a0f014-4194-4957-ab4d-454c6be261df.gif)

Cảm ơn các bạn vì đã đọc bài viết của mình. Đó giờ các bài viết của mình chủ yếu về [`core techniques`](https://haodev.wordpress.com/devnotes/) và đây là bài viết đầu tiên dạng `Coding Tutorial` nên khó có thể tránh khỏi những sai sót.
Nếu có bất kì vấn đề hay vướng mắc gì, hãy `comment` phía dưới hoặc [`ping`](https://haodev.wordpress.com/me/) trực tiếp cho mình để được hỗ trợ nha 😸😸

*Happy coding !*

<br/>

***Reference**: [FreeCodeCamp](https://www.freecodecamp.org/news/building-a-simple-url-shortener-with-just-html-and-javascript-6ea1ecda308c/?fbclid=IwAR0xTgJCLZYIGazHPdpgX2xC1JUh1a9a76nBfBHHxVp3qqIfUGc4SUek8kA), [Personal Blog](http://haodev.wordpress.com/).*