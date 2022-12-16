![image.png](https://images.viblo.asia/69dfd76d-fdd4-47ea-9239-6a1bc262717b.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Bạn có phải là người thích sử dụng cú pháp `async`/`await` không? Mình cũng vậy, theo quan điểm của mình thì `async`/`await` tốt hơn là `Promise chains`. Nhưng mình tự hỏi liệu bạn đã sử dụng nó đúng cách chưa. Đôi khi nó có thể làm cho chương trình của bạn chạy chậm hơn mong đợi. Trong bài viết này, mình sẽ chia sẻ một điều rất quan trọng nếu bạn muốn cải thiện hiệu suất khi sử dụng `async`/ `await` và điều đó cực kỳ dễ áp ​​dụng trong project của bạn.

Before Reading
------

Nhiều JavaScript Dev yêu thích cú pháp `async`/ `await`. Mình nghĩ lý do mà tại sao mọi người thích cú pháp này là vì `Promise hell `, nó tiếp tục tạo ra một `chain` khi nhiền lần chấm `then` liên tiếp.

`async`/ `await` cho phép các bạn giảm bớt hoặc thoát khỏi `Promise hell` bằng cách sử dụng keyword `await`. Nhưng bạn đã bao giờ nghĩ rằng cú pháp này có thể làm chậm ứng dụng của bạn khi nó được sử dụng theo cách không tối ưu chưa?

Vậy chúng ta phải làm gì? Hãy nói về các lựa chọn của chúng ta nào.

Helper Functions
------

Giả sử có một hàm được gọi là `sleep`. Nó sẽ chờ một khoảng thời gian bạn muốn và là một `Promise` cơ bản.

```javascript
const sleep = t => {   
  return new Promise (res => {   
    setTimeout (res, t);   
  });   
};
```

Và chúng ta cũng có một hàm `fetch`

```javascript
const fetch = url => {   
  const time = url.length * 1000;   
  sleep(time);   
};
```

Hàm giả `fetch` nhận đối số kiểu `string` và nó được sử dụng để tính toán thời gian chờ. Nếu chúng ta gọi `fetch('/notice')`, thời gian chờ sẽ là bảy giây vì `/notice` có bảy ký tự.

Tình huống cơ bản và vấn đề gặp phải của ví dụ này là
--------

Bây giờ, chúng ta truy cập ứng dụng; nó có lẽ là `/`. Ngay sau khi chúng ta truy cập trang chính, code sẽ cố gắng load dữ liệu bằng cách nhập `fetch`. (Ở ví dụ này mình dùng `React` nhé)

```javascript
// React base
async componentDidMount() {
  const banners = await fetch('/banners');
  const events = await fetch('/events');
  const notices = await fetch('/notices');
  /* Do other tasks here */
  this.setState({
    ...this.state,
    banners,
    events,
    notices
  });
}
```

Chúng ta đã thực hiện một hàm `fetch` trước đó, đó là một `Promise`. Nó có đối số là 1 string.

*   `/banners` → tám ký tự/độ trễ tám giây
*   `/events` → bảy ký tự/độ trễ bảy giây
*   `/notices` → tám ký tự/độ trễ tám giây

![image.png](https://images.viblo.asia/805803e4-8112-4ef5-81d3-5fdbc092195a.png)

Tổng thời gian `fetch` sẽ là `23 giây` vì nó đợi quá trình `fetch` hiện tại kết thúc trước khi gọi lần tiếp theo.

Cấu trúc này ổn nếu thứ tự `fetch` là quan trọng. Ví dụ: chúng ta nên `fetch` `/login`trước `/my-profile` vì đó là thông tin chỉ dành cho thành viên.

Điều gì sẽ xảy ra nếu có nhiều hơn năm `API` mà bạn cần fetch trước khi hiển thị? Càng nhiều API, user của bạn sẽ đợi lâu hơn trước khi xem trang.

Giải phảp
-----------

Giải pháp rất rõ ràng và đơn giản.

```javascript
// React base
async componentDidMount() {
  const bannersFetch = fetch('/banners');
  const eventsFetch = fetch('/events');
  const noticesFetch = fetch('/notices');
  /* Do other tasks here */
  const banners = await bannersFetch;
  const events = await eventsFetch;
  const notices = await noticesFetch;
  this.setState({
    ...this.state,
    banners,
    events,
    notices
  });
}
```
Điểm khác biệt duy nhất so với phiên bản trước đó là chúng ta không còn đặt keyword `await` trước `fetch`. Thay vào đó, chúng ta đặt nó sau. Điều gì xảy ra sau đó?

![image.png](https://images.viblo.asia/2f070649-d080-4c52-ba80-adc19bf4a45d.png)

Mỗi `fetch`request sẽ được gửi đến server vì không có request nào trong số chúng chờ response trước khi kích hoạt request tiếp theo `fetch`.

Mặc dù không có thêm công việc nào trong `componentDidMount` ở ví dụ trên, thời gian chờ tối đa lâu nhất sẽ chỉ là tám giây.

Promise mang đến điều kỳ diệu
-------

Lý do mà chúng ta có thể nhận được lợi ích to lớn từ việc thay đổi một vài dòng code là vì `Promise`. Về cơ bản, `Promise` được biết đến như một `API` hoạt động `asynchronous`. Tuy nhiên, bí mật thực sự được giấu trong hàng đợi sự kiện.

![image.png](https://images.viblo.asia/f8244736-f136-43f3-a29c-ad5954d38639.png)

`JavaScript` là đơn luồng (`single-threaded`), như nhiều người trong số các bạn đã biết. Điều đó có nghĩa là chỉ có một nhiệm vụ chạy trong chương trình trong cùng một thời điểm :D. Vùng chứa, là một loại hàng đợi giữ các tác vụ cho đến khi đến lượt chúng được thực thi, được gọi là _event queue_ hoặc _task queue_ điều này có thể khác nhau tùy thuộc vào tài liệu bạn đang đọc.

Ví dụ về các nhiệm vụ có thể được coi là một _normal task_ là `console.log(1)`, `obj.foo()` hoặc bất cứ điều gì tương tự như vậy không phải là một job `asynchronous`.

`Promise` là một `API asynchronous`. Trong thời gian chạy, `JavaScript` gửi một tác vụ `Promise` (hoặc một tác vụ dựa trên `Promise`) đến hàng đợi sự kiện `Promise`. Và các nhiệm vụ trong hàng đợi `Promise` cũng phải đợi đến lượt được gọi. Nhưng lưu ý rằng bất kỳ tác vụ nào trong hàng đợi `Promise` chỉ có thể được kéo ra và chạy nếu tác vụ bình thường `normal task` hoàn toàn trống.

![image.png](https://images.viblo.asia/9d7f5f7a-44ba-443b-960f-b734e8867510.png)

```javascript
const banners = await fetch('/banners');
const events = await fetch('/events');
const notices = await fetch('/notices');
```

Do có keyword `await` trên mỗi dòng, hàng đợi `Promise` không thể nhận thêm nhiệm vụ. Thứ nhất, `fetch('/banners')` được thực thi. Chương trình đợi `response` của nó và đưa tác vụ `fetch` tiếp theo vào hàng đợi.

![image.png](https://images.viblo.asia/731024a1-e562-4229-aa80-c0f2ede6794e.png)

```javascript
const bannersFetch = fetch('/banner');
const eventsFetch = fetch('/events');
const noticesFetch = fetch('/notices');

const banners = await bannersFetch;
const events = await eventsFetch;
const notices = await noticesFetch;
```

Với code này, tất cả ba `fetch` có thể được xem như là xếp chồng lên nhau trong hàng đợi `Promise` theo thứ tự từ trên xuống dưới. Những `Promise` đó sẽ được kéo ra và thực hiện gần như cùng một lúc (khi mà hàng đợi `normal task` trống), nhưng chúng không phải đợi response của `fetch` lần trước nữa.

Một ví dụ khác
-----

```javascript
const fetchA = () => {
  return new Promise((callback) => {
    setTimeout(() => callback("OK"), 3000);
  });
};

const fetchB = () => {
  return new Promise((callback) => {
    setTimeout(() => callback("OK"), 2000);
  });
};

const fetchC = () => {
  return new Promise((callback) => {
    setTimeout(() => callback("OK"), 1000);
  });
};

const runFetch = async () => {
  const startTime = new Date().getTime();

  const A = await fetchA();
  const B = await fetchB();
  const C = await fetchC();

  const result = {
    A,
    B,
    C,
    time: (new Date().getTime() - startTime) / 1000,
  };

  console.log("runFetch :>> ", result);
};

const runBetterFetch = async () => {
  const startTime = new Date().getTime();

  const fetch1 = fetchA();
  const fetch2 = fetchB();
  const fetch3 = fetchC();

  const A = await fetch1;
  const B = await fetch2;
  const C = await fetch3;

  const result = {
    A,
    B,
    C,
    time: (new Date().getTime() - startTime) / 1000,
  };

  console.log("runBetterFetch :>> ", result);
};

runFetch();
runBetterFetch();
```

Kết quả sẽ là:

```console
runBetterFetch :>>  { A: 'OK', B: 'OK', C: 'OK', time: 3.005 }
runFetch :>>  { A: 'OK', B: 'OK', C: 'OK', time: 6.03 }
```

Promise.all
------
Bạn cũng có thể sử dụng `Promise.all` để giải quyết vấn đề trên (hoặc `Promise.allSettled` trong trường hợp bạn không quan tâm đến các `request` không thành công).

```javascript
const [banners, events, notices] = await Promise.all([
  fetch("/banners"),
  fetch("/events"),
  fetch("/notices"),
]);
```

Kết luận
------

Sử dụng cú pháp `async`/ `await` làm cho cuộc sống của chúng ta dễ dàng hơn và hạnh phúc hơn, nhưng chúng ta nên sử dụng chúng tốt. Đơn giản chỉ cần đặt keyword `await` ở đâu đó có thể gây ra những hậu quả rất khác nhau tùy thuộc vào nơi bạn đặt nó.

Roundup
----
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
-----
* https://tuan200tokyo.blogspot.com/2022/11/blog36-meo-on-gian-e-cai-thien-hieu.html