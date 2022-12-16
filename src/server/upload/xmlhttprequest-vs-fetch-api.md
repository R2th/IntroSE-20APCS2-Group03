## XMLHttpRequest
Đoạn code Javascript sau đây biểu thị một request HTTP GET cơ bản đến `http://domain/service` sử dụng `XMLHttpRequest`
```
let xhr = new XMLHttpRequest();
xhr.open('GET', 'http://domain/service');

// request state change event
xhr.onreadystatechange = function() {

  // request completed?
  if (xhr.readyState !== 4) return;

  if (xhr.status === 200) {
    // request successful - show response
    console.log(xhr.responseText);
  }
  else {
    // request error
    console.log('HTTP error', xhr.status, xhr.statusText);
  }
};

// start request
xhr.send();
```
Đối tượng ` XMLHttpRequest` có nhiều tùy chọn, sự kiện và thuộc tính phản hồi khác. Ví dụ: có thể đặt và phát hiện thời gian timeout tính bằng mili giây:
```
// set timeout
xhr.timeout = 3000; // 3 seconds
xhr.ontimeout = () => console.log('timeout', xhr.responseURL);
```
và một sự kiện `progress` thông báo tiến trình tải lên một tệp tin dài:
```
// upload progress
xhr.upload.onprogress = p => {
  console.log( Math.round((p.loaded / p.total) * 100) + '%') ;
}
```
Số lượng tùy chọn nhiều và có một vài sự mâu thuẫn giữa các trình duyệt. Vì lý do này, hầu hết các thư viện và framework cung cấp các hàm bao bọc Ajax để xử lý sự phức tạp. Ví dụ phương thức `jQuery.ajax()`
```
// jQuery Ajax
$.ajax('http://domain/service')
  .done(data => console.log(data))
  .fail((xhr, status) => console.log('error:', status));
```
## Fetch
Fetch API là một thay thế hiện đại cho XMLHttpRequest. Các interface về `Headers`,  `Request`, `Response` được cung cấp một cách nhất quán, `Promises` cho phép xâu chuỗi một cách dễ dàng hơn và `async/await` không có `callback`. Ví dụ XHR ở trên có thể được chuyển đổi thành `Fetch-based` code đơn giản hơn nhiều.
```
fetch(
    'http://domain/service',
    { method: 'GET' }
  )
  .then( response => response.json() )
  .then( json => console.log(json) )
  .catch( error => console.error('error:', error) );
```
`Fetch` gọn gàng, đơn giản để hiểu và được sử dụng nhiều trong PWA Service Workers. Vậy tại sao không sử dụng nó thay vì `XMLHttpRequest`?

Thật không may, Fetch không phải là sự thay thế hoàn toàn cho các kỹ thuật Ajax.
### Trình duyệt hỗ trợ
`Fetch API` được hỗ trợ tương đối, tuy nhiên nó không hoạt động trên hầu hết các phiên bản của Internet Explorer. Ngoài ra những phiên bản của Chrome, Firefox và Safari cũ hơn 2017 có thể gặp vấn đề.
### Cookieless 
Không giống như `XMLHttpRequest`, không phải tất cả các cài đặt Fetch sẽ gửi cookie để xác thực và ứng dụng của bạn có thể thất bại. Vấn đề có thể được khắc phục bằng cách thay đổi các tùy chọn khởi tạo được truyền trong tham số thứ hai, ví dụ:
```
fetch(
    'http://domain/service',
    {
      method: 'GET',
      credentials: 'same-origin'
    }
  )
```
### Lỗi không bị reject
Mội lỗi HTTP như  `404 Page Not Found` hay `500 Internal Server Error` không làm cho Fetch Promise bị reject. `.catch()` sẽ không bao giờ chạy. Nó thường được xử lý với `response.ok` được đặt thành `false`.
`Reject` chỉ xảy ra nếu request không thể hoàn thành, ví dụ một lỗi mạng. Điều này có thể làm cho bẫy lỗi phức tạp hơn để cài đặt.
### Timeouts không được hỗ trợ
Fetch không hỗ trợ timeouts và request sẽ tiếp tục thực hiện. Cần có thêm code để bọc Fetch trong một Promise khác, ví dụ:
```
// fetch with a timeout
function fetchTimeout(url, init, timeout = 3000) {
  return new Promise((resolve, reject) => {
    fetch(url, init)
      .then(resolve)
      .catch(reject);
    setTimeout(reject, timeout);
  }
}
```
hay có thể sử dụng `Promise.race()` để giải quyết khi fetch hay timeouts hoàn thành trước:
```
Promise.race([
  fetch('http://url', { method: 'GET' }),
  new Promise(resolve => setTimeout(resolve, 3000))
])
  .then(response => console.log(response))
```
### Hủy bỏ Fetch
Thật dễ dàng để kết thúc một request XHR với `xhr.abort()`.

Việc hủy bỏ Fetch trước đây không thể thực hiện được nhưng hiện tại nó đã được hỗ trợ trong trình duyệt cài đặt `AbortController API`. Nó kích hoạt một tín hiệu có thể gửi đến đối tượng khởi tạo Fetch:
```
const controller = new AbortController();

fetch(
  'http://domain/service',
  {
    method: 'GET'
    signal: controller.signal
  })
  .then( response => response.json() )
  .then( json => console.log(json) )
  .catch( error => console.error('Error:', error) );
```
Fetch có thể hủy bỏ bằng cách gọi `controller.abort();` 
### No Progress
Hiện tại, Fetch không hỗ trợ các sự kiện `progress`. Do đó không thể báo cáo trạng thái tệp tải lên hoặc gửi form lớn.
## XMLHttpRequest hay Fetch API?
Với các cuộc gọi Ajax đơn giản, `XMLHttpRequest` là cấp thấp và phức tạp và bạn sẽ cần đến các hàm bao bọc. Thật không may, Fetch cũng vậy khi bạn bắt đầu xem xét sự phức tạp của timeouts, call abort và việc bắt lỗi.

Fetch API tương đối mới, nó không cung cấp tất cả chức năng XHR và một số tùy chọn rất cồng kềnh.

Cuối cùng, sự lựa chọn là của bạn.
## Tham khảo
[https://www.sitepoint.com/xmlhttprequest-vs-the-fetch-api-whats-best-for-ajax-in-2019/](https://www.sitepoint.com/xmlhttprequest-vs-the-fetch-api-whats-best-for-ajax-in-2019/)