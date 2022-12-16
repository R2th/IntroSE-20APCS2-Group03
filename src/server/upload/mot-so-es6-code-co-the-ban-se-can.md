# Mở đầu
ES6 giờ đây đã được những developer javascript sử dụng chúng thường xuyên trong lập trình JavaScript. Và trong bài viết này thì xin phép được tổng hợp lại một số đoạn mã mà mình thấy khá hay  sẽ có thể hữu ích khi bạn làm dự án. **Bắt đầu luôn thôi nào !**
# 1. Ẩn tất cả các phần tử được chỉ định (Hide all elements specified)
```js
const hide = (elements) => [...elements].forEach(element => (element.style.display = 'none'));

// Ví dụ ẩn tất cả các phần tử <img> trên trang
hide(document.querySelectorAll('img'));
```
# 2. Kiểm tra xem phần tử có lớp được chỉ định hay không (Check if the element has the specified class)
```js
const hasClass = (element, className) => element.classList.contains(className);

// Ví dụ
hasClass(document.querySelector('p.container'), 'container');
```
# 3. Chuyển đổi một lớp cho một phần tử (Toggle a class for an element)
```js
const toggleClass = (element, className) => element.classList.toggle(className);

// Ví dụ
toggleClass(document.querySelector('p.container'), 'container');
```
# 4. Lấy vị trí cuộn của trang hiện tại (Get the scroll position of the current page)
```js
const getScrollPosition = (element = window) => ({
  x: element.pageXOffset !== undefined ? element.pageXOffset : element.scrollLeft,
  y: element.pageYOffset !== undefined ? element.pageYOffset : element.scrollTop
});

// Ví dụ
getScrollPosition();
```
# 5. Cuộn lên đầu trang một cách mượt mà (Cmooth-scroll to the top of the page)
```js
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;

  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

// Ví dụ
scrollToTop();
```
# 6. Kiểm tra xem phần tử cha có chứa phần tử con hay không (Check if the parent element contains the child element)
```js
const elementContains = (parent, child) => parent !== child && parent.contains(child);

// Ví dụ
elementContains(document.querySelector('head'), document.querySelector('title')); // true
elementContains(document.querySelector('body'), document.querySelector('body')); // false
```
# 7. Kiểm tra xem phần tử được chỉ định có hiển thị trong chế độ xem không (Check if the element specified is visible in the viewport)
```js
const elementIsVisibleInViewport = (element, partiallyVisible = false) => {
  const { top, left, bottom, right } = element.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

// Ví dụ
elementIsVisibleInViewport(document.querySelector('#test'));
elementIsVisibleInViewport(document.querySelector('#test'), true);
```
# 8. Tìm nạp tất cả các hình ảnh trong một phần tử (Fetch all images within an element)
```js
const getImages = (element, includeDuplicates = false) => {
  const images = [...element.getElementsByTagName('img')].map(img => img.getAttribute('src'));
  return includeDuplicates ? images : [...new Set(images)];
};

// Ví dụ
getImages(document, true); // ['image_1.jpg', 'image_2.png', 'image_1.png', '...']
getImages(document, false); // ['image_1.jpg', 'image_2.png', '...']
```
# 9. Biết thiết bị đó là thiết bị di động hay máy tính để bàn/máy tính xách tay (Figure out if the device is a mobile device or a desktop/laptop)
```js
const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? 'Mobile'
    : 'Desktop';

// Ví dụ
detectDeviceType(); // Desktop
```
# 10. Lấy URL hiện tại (Get the current URL)
```js
const currentURL = () => window.location.href;

// Ví dụ
currentURL();
```
# 11. Tạo một đối tượng chứa các tham số của URL hiện tại (Create an object containing the parameters of the current URL)
```js
const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (previousValue, currentValue) => ((previousValue[currentValue.slice(0, currentValue.indexOf('='))] = currentValue.slice(currentValue.indexOf('=') + 1)), previousValue),
    { }
  );

// Ví dụ
getURLParameters('https://www.google.com/search?q=phu'); // {q: "phu"}
getURLParameters('http://google.com/'); // { }
```
# 12. Mã hóa một tập hợp các yếu tố hình thức như một đối tượng (Encode a set of form elements as an object)
```js
const formToObject = form =>
  Array.from(new FormData(form)).reduce(
    (previousValue, [key, value]) => ({
      ...previousValue,
      [key]: value
    }),
    { }
  );

// Ví dụ
formToObject(document.querySelector('#form')); // { email: 'test@email.com', name: 'Test' }
```
# 13. Truy xuất một tập hợp các thuộc tính được chỉ ra bởi các bộ chọn đã cho từ một đối tượng (Retrieve a set of properties indicated by the given selectors from an object)
```js
const get = (from, ...selectors) =>
  [...selectors].map(selector =>
    selector
      .replace(/\[([^\[\]]*)\]/g, '.$1.')
      .split('.')
      .filter(t => t !== '')
      .reduce((previousValue, currentValue) => previousValue && previousValue[currentValue], from)
  );

// Ví dụ
const objectData = { teacher: { homeroom: { name: 'Teacher' } }, students: [1, 2, { name: 'Student' }] };
get(objectData, 'teacher.homeroom.name', 'students[0]', 'students[2].name'); // ["Teacher", 1, "Student"]
```
# 14. Gọi hàm đã cung cấp sau khi đợi tính bằng mili giây (Invoke the provided function after wait in milliseconds)
```js
const delay = (fn, wait, ...args) => setTimeout(fn, wait, ...args);

// Logs 'later' after 1s.
delay(
  function(text) {
    console.log(text);
  },
  1000,
  'later'
);
```
# 15. Kích hoạt một sự kiện cụ thể trên một phần tử nhất định, truyền dữ liệu tùy chỉnh theo tùy chọn (Trigger a specific event on a given element, optionally passing custom data)
```js
const triggerEvent = (element, eventType, detail) => element.dispatchEvent(new CustomEvent(eventType, { detail }));

// Ví dụ
triggerEvent(document.getElementById('myId'), 'click');
triggerEvent(document.getElementById('myId'), 'click', { username: 'phu' });
```
# 16. Xóa trình nghe sự kiện khỏi một phần tử (Remove an event listener from an element)
```js
const off = (el, evt, fn, opts = false) => el.removeEventListener(evt, fn, opts);

document.body.addEventListener('click', () => console.log('!')); // Sẽ log '!' mỗi khi click.
off(document.body, 'click', fn); // Khi chạy lệnh này thì sẽ không log '!' mỗi khi click nữa.
```
# 17. Lấy định dạng có thể đọc được của số mili giây nhất định (Get readable format of the given number of milliseconds)
```js
const formatDuration = ms => {
  if (ms < 0) {
    ms = -ms;
  }

  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000
  };

  return Object.entries(time)
    .filter(value => value[1] !== 0)
    .map(([key, value]) => `${value} ${key}${value !== 1 ? 's' : ''}`)
    .join(', ');
};

// Ví dụ
formatDuration(1024); // "1 second, 24 milliseconds"
formatDuration(1234567890) // "14 days, 6 hours, 56 minutes, 7 seconds, 890 milliseconds"
```
# 18.Tính khoảng cách giữa hai ngày (Get the difference between two dates)
```js
const getDaysDiffBetweenDates = (dateInitial, dateFinal) => (dateFinal - dateInitial) / (1000 * 3600 * 24);

// Ví dụ
getDaysDiffBetweenDates(new Date('2021-08-18'), new Date('2021-08-26')) // 8
```
# 19. Thực hiện yêu cầu GET đến URL đã chuyển (Make a GET request to the passed URL)
```js
const httpGet = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send();
};

httpGet(
  'https://jsonplaceholder.typicode.com/posts/1',
  console.log
); 
//{
//  "userId": 1,
//  "id": 1,
//  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
//}
```
# 20.Thực hiện một yêu cầu POST đến URL đã chuyển (Make a POST request to the passed URL)
```js
const httpPost = (url, data, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send(data);
};

const newPost = {
  userId: 1,
  id: 1337,
  title: 'Foo',
  body: 'bar bar bar'
};
const data = JSON.stringify(newPost);

httpPost(
  'https://jsonplaceholder.typicode.com/posts',
  data,
  console.log
);
//{
//  "userId": 1,
//  "id": 101,
//  "title": "Foo",
//  "body": "bar bar bar"
//}
```
# 21. Tạo bộ đếm với phạm vi, bước và thời lượng được chỉ định cho bộ chọn được chỉ định (Create a counter with the specified range, step and duration for the specified selector)
```js
const counter = (selector, start, end, step = 1, duration = 2000) => {
  let current = start,
    _step = (end - start) * step < 0 ? -step : step,
    timer = setInterval(() => {
      current += _step;
      document.querySelector(selector).innerHTML = current;

      if (current >= end) {
        document.querySelector(selector).innerHTML = end;
      }

      if (current >= end) {
        clearInterval(timer);
      }
    }, Math.abs(Math.floor(duration / (end - start))));
  return timer;
};

// Ví dụ
counter('#test', 1, 1000, 5, 2000); // Tạo bộ đếm 2 giây cho phần tử có id="test"
```
# 22. Sao chép một chuỗi vào khay nhớ tạm (Copy a string to the clipboard)
```js
const copyToClipboard = str => {
  const el = document.createElement('textarea');

  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);

  const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;

  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

// Ví dụ
copyToClipboard('Doan Phu');
```
# 23. Tìm xem tab trình duyệt của trang có được tiêu điểm hay không (Find out if the browser tab of the page is focused)
```js
const isBrowserTabFocused = () => !document.hidden;

// Ví dụ
isBrowserTabFocused(); // true
```
# 24. Tạo một thư mục, nếu nó không tồn tại (Create a directory, if it does not exist)
```js
const fs = require('fs');
const createDirIfNotExists = dir => (!fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined);

// Ví dụ
createDirIfNotExists('test');
```

# Kết luận
Bài của mình đến đây là kết thúc. Hy vọng nó sẽ hữu ích phần nào đó cho các bạn trong quá trình tìm hiểu ES6 cũng như đang thực chiến dự án. Bài viết cũng khó tránh khỏi những sai xót, mong mọi người thông cảm, và rất mong những ý kiến đóng góp của mọi người để bài viết được hoàn thiện hơn.

# Tài liệu tham khảo
[ 30 seconds of code](https://www.30secondsofcode.org/)