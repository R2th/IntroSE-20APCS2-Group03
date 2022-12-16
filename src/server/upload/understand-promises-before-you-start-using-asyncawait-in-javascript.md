Với các công nghệ và công cụ hỗ trợ liên tục nổi lên, các nhà phát triển thường tự hỏi tại sao chúng ta cần điều này? Lợi thế của công cụ mới này là gì? Các giải pháp nào tốt? Với Javascrip thì việc xử lý bất đồng bộ có khá nhiều hướng giải quyết như là sử dụng **Callback**, **Promise** hay **Async/Await**. Giải pháp đang được ưa chuộng và nhiều lập trình viên sử dụng đó là xử lý bất đồng bộ với **Async/Await**.

Ai đó trên mạng có nói: 

> Chời ... Thời này ai xài Promise nữa. Quê! Bây giờ phải xài async/await mới hợp xu thế :D :D :D

Vâng! Đúng vậy. Cái gì cũng phải theo trend chứ. Nhưng tìm hiểu sâu về nó thì toàn bộ nền tảng của **Async/Await** là những **Promise**. 
Và để hiểu rõ hơn về nó, mời bạn theo dõi bài viết của mình nhé! (bow)

# Đồng bộ và Bất đồng bộ (Synchronous – Asynchronous)
**Synchronous** và **Asynchronous** là 2 khái niệm gây khó khăn cho người mới tiếp cận Javascript. Hiểu nôm na thì ... **Synchronous** là code chạy có tuần tự từ trên xuống dưới - từ trái qua phải - cái nào yêu cầu in ra trước thì in ra trước, còn **Asynchronous** thì không như vậy!

Ví dụ mình có đoạn code sau:
```js
let log1 = 'Gâu Gâu';
let log2 = 'Meo Meo';
 
console.log(log1);
console.log(log2);
```
Kết quả log ra theo trật tự  ```Gâu Gâu - Meo Meo```. Tiếp đến ví dụ sau:
```js
let log1 = 'Gâu Gâu';
let log2 = 'Meo Meo';

setTimeout(function() {
  console.log(log1);
}, 1000);

console.log(log2);
```
Kết quả log ra ```Meo Meo - Gâu Gâu```. Ở ví dụ này, có vẻ chưa thấy điều gì bất thường xảy ra, `setTimeout` 1s mới được in console log1 thì in ra sau là đúng rồi còn gì có gì lạ phải bàn :laughing::laughing::laughing:. OK vậy qua ví dụ tiếp.
```js
let log1 = 'Gâu Gâu';
let log2 = 'Meo Meo';

setTimeout(function() {
  console.log(log1);
}, 0);

console.log(log2);
```
Kết quả log ra vẫn ```Meo Meo - Gâu Gâu```. Bớ, rõ ràng setTimeout giá trị là 0 mà sao vẫn log ra `Meo Meo` trước :-? (suynghi)
> Hàm `setTimeout` là 1 hàm **Asynchronous** trong Javascript - chạy không tuần tự và bị cho vào hàng đợi, đợi cho các đoạn code tuần tự chạy xong thì nó mới được chạy tiếp (Chính vì lẽ đó mà ```Meo Meo``` mới được log ra sau trong ví dụ trên). Để hiểu rõ hơn bạn có thể tìm hiểu [tại đây](https://medium.com/front-end-weekly/javascript-event-loop-explained-4cd26af121d4).
> 
Không chỉ có hàm ```setTimeout``` mà khi sử dụng Ajax tương tác với API cũng là 1 dạng **Asynchronous** vì nó mất 1 khoảng thời gian nhất định để có thể tương tác. Như đã nói ở trên thì để xử lý **Asynchronous** có thể sử dụng ```Callback```, ```Promise``` hay ```Async/Await```. Bây giờ mình cùng đi chi tiết từng cái nhé!

# Sử dụng Callback để xử lý bất đồng bộ

Sử dụng ```Callback``` là cách đầu tiên và dễ nhất giúp bạn xử lý Asynchronous. Khi định nghĩa 1 function() thực hiện 1 nhiệm vụ tốn thời gian nào đó, bạn cần truyền thêm tham số vào hàm - đóng vai trò là hàm ```callback```. Khi hành động bắt đầu, rồi đến khi nó kết thúc, hàm ```callback``` sẽ được gọi ngay sau đó.
```js
function doAsync(url, onSuccess, onError) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => onSuccess(xhr.responseText);
  xhr.onerror = () => onError(xhr.statusText);
  xhr.send();
}
// Usage:
doAsync(
  'https://something.com',
  value => {
    // 'value' is corresponding with 'xhr.responseText'
  },
  error => {
    // 'error' is corresponding with 'xhr.statusText'
  }
);
```
Ở đây, ```doAsync()``` là hàm bất đồng bộ với 2 hàm callback là ```onSuccess``` và ```onError```. Khi request thành công thì onSuccess() sẽ được gọi, ngược lại onError() sẽ được gọi. Khá dễ phải không?

Tuy nhiên, thử tượng tượng cùng lúc phải thực hiện 2 request liên tiếp, với request thứ 2 chỉ thực hiện khi request thứ 1 thực hiện xong
```js
// Usage:
doAsync(
  'https://something.com',
  value => {
    // 'value' is corresponding with 'xhr.responseText' (1)

    doAsync(
      'https://other.com',
      value => {
        // 'value' is corresponding with 'xhr.responseText' (2)
      },
      error => {
        // 'error' is corresponding with 'xhr.statusText' (2)
      }
    );
  },
  error => {
    // 'error' is corresponding with 'xhr.statusText' (1)
  }
);
```
Não hoạt động nhanh tý thì vẫn OK! (yaoming). Nếu nghĩ xa hơn, bạn phải thực hiện thêm vài request khác nữa thì chắc chắn sẽ làm bạn khá đau đầu và bắt đầu khó hiểu. Trường hợp này gọi là **Callback Hell**.

Để tránh **Callback Hell** xảy ra, thì người ta đã nghĩ ra cách giải quyết khác. Đó là sử dụng `Promise`.

# Sử dụng Promise để xử lý bất đồng bộ

Cú pháp cơ bản của `Promise`:
```js
let promise = new Promise(function(resolve, reject) {
  // Code here
});
```
Trong đó, hàm được truyền vào **new Promise** gọi là **executor**. Promise gồm có 3 state. Đầu tiên, trong quá trình đang thực thi thì Promise có state `pending` và kết quả value là `undefined`. Khi executor kết thúc, nó sẽ gọi đến 1 trong 2 hàm được truyền vào:

* `resolve(value)`: xác định rằng công việc đã thực hiện thành công

  * state chuyển thành `fulfilled`
  * kết quả là `value`.
* `reject(error)`: xác định rằng đã có lỗi xảy ra

  * state chuyển thành `rejected`
  * kết quả là `error`.

Sử dụng `Promise` với ví dụ trên:
```js
function doAsync(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}

// Usage:
doAsync('https://something.com')
  .then(value => {
    // 'value' is corresponding with 'xhr.responseText'
  })
  .catch(error => {
    // 'error' is corresponding with 'xhr.statusText'
  });
```
Và nếu thực hiện nhiều request liên tiếp:
```js
// Usage:
doAsync('https://something.com')
  .then(value => {
    /*
     * 'value' is corresponding with 'xhr.responseText'
     * from 'https://something.com'
     */
    return doAsync('https://other.com');
  })
  .then(value => {
    /*
     * 'value' is corresponding with 'xhr.responseText'
     * from 'https://other.com'
     */
  })
  .catch(error => {
    /*
     * 'error' is corresponding with 'xhr.statusText'
     * from either 'https://something.com' or 'https://other.com'
     */
  });
``` 
Có thể thấy code trở nên gọn gàng, sạch sẽ hơn và không còn thấy hiện tượng nhiều mức lồng nhau giống khi sử dụng `callback`.

# Sử dụng Async/Await để xử lý bất đồng bộ

**Async/Await** là cú pháp đặc biệt giúp làm việc với **Promise** dễ dàng hơn. Khi sử dụng `Async/Await`, bạn sẽ thấy rằng việc xử lý `Asynchronous` sẽ giống với xử lý `Synchronous` hơn.

Với ví dụ xử lí nhiều request sử dụng `Promise` ở trên, ta có thể sử dụng `Async/Await` như sau:
```js
function doAsync(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}

// Usage:
async function run() {
  let responseSomething, responseOther;

  try {
    responseSomething = await doAsync('https://something.com');
    responseOther = await doAsync('https://other.com');
  } catch (error) {
    /*
     * 'error' is corresponding with 'xhr.statusText'
     * from either 'https://something.com' or 'https://other.com'
     */
  }
}

run();
```
Qua ví dụ trên, ta có thể rút ra được:

* Khi 1 hàm `async()` được gọi, nó sẽ trả về 1 **Promise**. khi hàm async trả về 1 giá trị, **Promise** sẽ được resolved với các giá trị được trả về. Khi hàm async ném ra 1 ngoại lệ hoặc 1 giá trị, **Promise** sẽ bị reject. Async dựa trên Promise phát triển tạo nên.

* Hàm `async()` có thể chứa 1 biểu thức `await`, mà tạm dừng việc thực hiện các hàm `async()` và chờ đợi cho các giải quyết **Promised** thông qua, sau đó tiếp tục thực hiện hàm `async()` và trả về giá trị được giải quyết. `Await` chỉ được thực hiện bên trong `async`.

# Tổng kết

Trên đây, bạn có thể thấy **Promise** và **Async/Await** không hoàn toàn thay thế mà nó hỗ trợ lẫn nhau. Mặc dù chúng ta theo trend dùng **Async/Await** ở đa số các trường hợp, nhưng **Promise** vẫn là nền tảng cần thiết khi thực thi các tác vụ `Asynchronous` trong Javascript. Do vậy, bạn nên xem xét và lựa chọn giải pháp phù hợp với từng trường hợp thực tế.

**Tài liệu tham khảo**

- Seminar của anh Đinh Văn Hoàng, hiện đang làm việc tại Avengers Group.
- https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8
- https://blog.pusher.com/promises-async-await/
- https://viblo.asia/p/javascript-xu-ly-bat-dong-bo-bWrZnenvKxw