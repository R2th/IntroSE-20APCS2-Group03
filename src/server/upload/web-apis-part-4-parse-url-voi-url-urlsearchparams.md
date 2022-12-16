## Giới thiệu
Hôm nay sẽ là một bài viết khá ngắn gọn :v 

## URL

Thông thường, để get thông tin url hiện tại, chúng ta thường sử dụng `window.location` và thu được kết quả như sau:

![](https://images.viblo.asia/0c97f403-af4c-45ff-80f6-cc3eaf2d2d7a.png)

Ngoài `window.location` thì `URL` cũng cung cấp một số properties, methods giúp cho chúng ta có thể dễ dàng tạo, đọc và chỉnh sửa các thành phần của url như `hostname`, `pathname`,... 

```js
url = new URL('https://developer.mozilla.org/en-US/docs/Web/API/URL#top')
```
![](https://images.viblo.asia/a6788426-861e-41af-ad87-5974003ba1d9.png)

- Tham khảo: https://developer.mozilla.org/en-US/docs/Web/API/URL

## URLSearchParams

Parse query string là một trong những vấn đề thường gặp lúc làm việc với url. 
Có nhiều thư viện xịn xò giải quyết vấn đề này như là `qs` hay `query-string` với hàng chục triệu lượt download mỗi tuần.

![](https://images.viblo.asia/db85dd81-690f-4bbd-bff6-5ce7ef84230e.png)

Tuy nhiên, để parse những url đơn giản thì chúng ta có thể sử dụng `URLSearchParams` đã có sẵn như sau:

Đầu tiên chúng ta sẽ dùng `window.location.search` để get query string của url hiện tại. Giả sử thu được kết quả như sau:

```js
var paramsString = "?user=trieu-quan-su&place=quan-net&place=rung";
```

Bây giờ nếu muốn get `place` chúng ta sẽ dùng method  `get` hoặc dùng `getAll` của `URLSearchParams`

```js
var searchParams = new URLSearchParams(paramsString);
searchParams.get('place') // quan-net
searchParams.getAll('place') // ["quan-net", "rung"]
```

Vậy là chúng ta đã lấy được giá trị của các query, cũng khá đơn giản mn nhỉ :D

Chúng ta cũng có thể lặp qua `searchParams` để lấy tất cả các `(key,value)` sử dụng `for...of` hoặc  `searchParams.forEach`

- Tham khảo: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

## Browser compatibility
![](https://images.viblo.asia/c7146ee2-288b-4e88-8720-10fee63ddf33.png)

## Kết luận

Bài viết chỉ đến đây thôi, hy vọng sẽ giúp ích được cho mọi người ở những dự án sắp tới. Chúc mọi người thành công  <3