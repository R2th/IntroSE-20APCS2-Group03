Cùng với sự phát triển chóng mặt của các framework front end thì hiện web SPA đang rất thịnh hành, ưu điểm của SPA là page không reload mà chỉ render lại các vùng cần thay đổi, do đó hiếm khi chúng ta nhìn thấy icon loading ở các tab xuất hiện, trái lại chúng ta sẽ có 1 khoảng thời gian nhỏ trong thời gian khởi tạo và render các components hoặc đơn giản là thời gian thực thi các logic trong middleware giữa các routes.

Để tránh sự nhàm chán cho user, hiện tại có rất nhiều kiểu giao diện loading được tạo ra nhằm cải thiện UX khi sử dụng ứng dụng web một cách phong phú nhất có thể. Trong số đó có thể kể đến như [progress bar](https://ricostacruz.com/nprogress/), [loading spinner](https://github.com/fgnass/spin.js), [content placeholder](https://github.com/zalog/placeholder-loading),.. rất rất nhiều; và mỗi thư viện lại dùng vào những tình huống riêng.

Bài viết hôm nay mình sẽ dựa trên ý tưởng icon loading của trình duyệt đầu mỗi tab khi tải trang.

![](https://images.viblo.asia/9ed3a00a-2242-48aa-8eb6-19a8e2b78945.png)

### Hoàn cảnh hiện tại
- Có thể tác động lên trình duyệt để icon loading xuất hiện hay không? Câu trả lời là không.
- Có thể dùng ảnh **.gif** làm favicon rổi replace ảnh đó khi đang loading không? Câu trả lời là... hiện chỉ có trình duyệt Firefox là hỗ trợ việc này. Các trình duyệt khác thì không, kể cả Chrome.

Vậy là chúng ta phải tự thân vận động với javascript rồi.

### Ý tưởng
Có rất nhiều ý tưởng có thể áp dụng như:
- Draw một hình tròn, khuyết 1 góc bằng canvas sau đó convert sang [dataURL](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL), rồi set data đó vào `href` của favicon, sau đó draw một hình tròn khác, xoay đi 1 góc và lại set lại `href`.
- Kiếm một cái ảnh thay vì tự vẽ ra, rồi làm như trên.
- Vẽ nhiều hình ảnh spiner liên tục và thay đổi `href` liên tục để tạo hiệu ứng loading.

Và mình sẽ chọn cách thứ 3 nhé. Nguyên nhân thì chắt lát nữa làm xong các bạn sẽ đoán được, tuy nhiên còn 1 nguyên nhân nữa là nó khá đơn giản.

Số lượng hình ảnh mình sẽ tạo ra ở đây là 24 - nếu bạn thắc mắc thì mình lấy theo con số fps (frame per second) của film phổ biến hiện nay là 24fps :D 

![](https://images.viblo.asia/495c5f64-b176-49ea-9f90-0e1ccfd9a1fb.png)

Vậy là cứ mỗi 1000ms (1 giây) mình sẽ đổi src 24 lần, bình quân mỗi frame lệch nhau `360 / 24 = 15 deg` và `1000 / 24 ~= 42 ms`.

### Thực hiện

Để cho dễ quan sát tạm thời mình sẽ làm 1 cái `img` trong body để tác động trực tiếp lên đó cho dễ nhìn. Thêm tí CSS cho nó dễ ngó

```index.html
<button class="btn">Spin</button>
  <div id="canvas">
    <img class="spinner" src="src/1.png" alt="loading...">
  </div>
</div>
```

![](https://images.viblo.asia/5eec0f53-0c76-47d4-8c3b-cb7a8f0fc685.png)

Bắt sự kiện onclick vào button thì bắt đầu quay tay =))

```main.js
function start() {
  const spinner = document.querySelector('#canvas img');
  let i = 0;
  const FPS = 24;
  const INTERVALS = 1000 / FPS;
  return setInterval(() => {
    const index = i % FPS + 1;
    changeFavicon(`src/${index}.png`);
    spinner.src = `src/${index}.png`;
    i++;
  }, INTERVALS);
}
```
- Hàm `start` sẽ returns về id của interval dùng trong lúc muốn stop loading, chứ không là nó chạy tới khi nào tải lại trang hoặc tắt tab lẫn =))
- Các con số `24` và `1000` bên trong hàm mình đã giải thích rồi nhé.
- Còn hàm `changeFavicon` thì cũng đơn giản thôi

```main.js
function changeFavicon(link) {
  let favicon = document.querySelector('link[rel="icon"]');

  if (!favicon) {
    favicon = document.createElement('link');
    favicon.rel = 'icon';
    document.head.appendChild(favicon);
  }

  favicon.href = link;
  return favicon;
}
```
Đọc qua thì ai cũng biết nó làm gì rồi, query cái thẻ `link` ra, nếu document chưa có thì tạo cho nó 1 cái, sau đó set cái `href` vào.

Khi muốn dừng quay thì chỉ cần gọi hàm `clearInterval(id)` với id là cái giá trị hàm `start` trả về.

Kết quả là như này
![](https://images.viblo.asia/0b481fdd-dd6c-43cc-b7b8-3b184d75e93f.gif)

Vậy là web SPA bây giờ trông có vẻ giống Universal rồi nhé =))

###  Tổng kết
Một chút ý tưởng cho vui biết đâu hữu ích cho anh em, nếu anh em có ý định dùng thật thì đây, cài đặt [package spinner-favicon@1.0.0](https://www.npmjs.com/package/spinner-favicon) lên và xài nhé, mình đã sắp xếp lại 1 tí để nó thành một thư viện độc lập, dùng xong nhớ cho 1 star không dự án bị cháy ráng chịu =))

Nếu có anh em nào làm theo cách 1 hoặc 2, hoặc có cách nào ngon trym hơn nhớ comment bên dưới mình tham khảo với nhé :smile:

Ngoài ra anh em có thể dùng ý tưởng tương tự để làm các favicon động cho page như github, hoặc notification badge như trên app di động chẳng hạn
![](https://images.viblo.asia/54084e8c-ad9a-443a-8492-4df631cd1d4c.png)