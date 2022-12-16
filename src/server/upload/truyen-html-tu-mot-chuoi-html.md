Giả sử bạn có một chuỗi `HTML` mà bạn lấy từ API hoặc bạn tự viết ra nó.
```JS
let string_of_html = `
  <div>Một chuỗi HTML</div>
`
```
Bạn có thể dùng `innerHMTL` để truyền nó vào một phần tử.
```JS
document.body.innerHTML = string_of_html;

// hoặc thêm nó vào bên dưới
document.body.innerHTML += string_of_html;
```
Nếu bạn muốn kiểm soát chắc chắn vị trí mà bạn muốn truyền vào thì bạn có thể dùng `insertAdjacentHTML`.
`insertAdjacentHTML` cho phép ta đặt phần tử `HTML` ở 4 chỗ khác nhau.
```JS
el.insertAdjacentHTML('beforebegin', string_of_html);
el.insertAdjacentHTML('afterbegin', string_of_html);
el.insertAdjacentHTML('beforeend', string_of_html);
el.insertAdjacentHTML('afterend', string_of_html);
```
```HTML
<!-- beforebegin -->
<div>
  <!-- afterbegin -->
  chữ bên trong div
  <!-- beforeend -->
</div>
<!-- afterend -->
```
Hoặc có trường hợp bạn muốn có một DOM hoàn chỉnh trong JS trước khi bạn làm bất cứ điều gì với nó.
Trong trường hợp đó bạn có thể làm như sau
```JS
let dom = new DOMParser()
  .parseFromString(string_of_html, 'text/html');
```
Sau đó lấy ra phần tử chuỗi mà bạn cần. Giả sử rằng đó là phần tử duy nhất bạn đã thêm vào.
```JS
let dom = new DOMParser()
  .parseFromString(string_of_html, 'text/html');
let new_element = dom.body.firstElementChild;
```
Bây giờ bạn có thể làm bất cứ điều gì mình muốn với phần tử đó.
Hoặc bạn có thể làm theo cách sau
```JS
let new_element = document.createRange()
  .createContextualFragment(string_of_html);
```
Tuy nhiên cách này sẽ thực thi tất cả đoạn `<script>` nó tìm đc bên trong chuôi vậy nên hãy cẩn thận khi sử dụng nó
Cảm ơn vì đã đọc.
[Tham khảo](https://css-tricks.com/snippets/javascript/inject-html-from-a-string-of-html/)