![](https://images.viblo.asia/36f57856-0774-4f2c-9adc-cc9a34d66eea.jpg)

## 1. Introduction

`Promise` trước đó đã được giới thiệu là một cơ chế nổi bật, cung cấp cho chúng ta một cách dễ dàng để xử lý bất đồng bộ.

`Promise` còn giúp chúng ta thoát khỏi những callback hell hay pyramid of doom ( những hàm callback lồng nhau không điểm dừng, mà trước đó chúng ta thường sử dụng `setTimeout` để xử lí) - [Đọc thêm `Promise`](https://www.digitalocean.com/community/tutorials/js-promises-es6)

`Async/await functions` là một bổ sung mới với ES2017 (ES8), giúp chúng ta nhiều hơn trong việc thực hiện các thao tác bất đồng bộ một cách tuần tự.

Một bí mật là `Async/await functions` vẫn sử dùng `Promise` bên dưới nhưng code bạn viết trông sẽ clean hơn

## 2. Simple Example

Trong ví dụ sau, trước tiên chúng ta khai báo một hàm trả về một `Promise` sẽ `resolves` ra giá trị `🤡` sau 2 giây.

Sau đó, chúng ta khai báo một hàm `async/ await` và chờ `Promise` trả ra kết quả trước khi log được xuất hiện

```
function scaryClown() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('🤡');
    }, 2000);
  });
}

async function msg() {
  const msg = await scaryClown();
  console.log('Message:', msg);
}

msg(); // Message: 🤡 <-- after 2 seconds
```

`await` là một toán tử mới được sử dụng để chờ một `Promise` `resolve` hoặc `reject`. Nó chỉ có thể được sử dụng bên trong một hàm `async` 

Sức mạnh của hàm `async` trở nên mạnh mẽ hơn khi xử lí chuỗi các hàm kéo theo liên quan:

```
function who() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('🤡');
    }, 200);
  });
}

function what() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('lurks');
    }, 300);
  });
}

function where() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('in the shadows');
    }, 500);
  });
}

async function msg() {
  const a = await who();
  const b = await what();
  const c = await where();

  console.log(`${ a } ${ b } ${ c }`);
}

msg(); // 🤡 lurks in the shadows <-- after 1 second
```


Tuy nhiên, trong ví dụ trên, mỗi hàm được thực hiện tuần tự, với mỗi hàm tiếp sau phải đợi bước trước `resolve` hoặc `reject` trước khi tiếp tục.

Thay vào đó, nếu bạn muốn các hàm đồng thời chạy song song, bạn chỉ cần sử dụng `Promise.all` để đợi tất cả các `Promise` hoàn thành:

```
// ...

async function msg() {
  const [a, b, c] = await Promise.all([who(), what(), where()]);

  console.log(`${ a } ${ b } ${ c }`);
}

msg(); // 🤡 lurks in the shadows <-- after 500ms
```

`Promise.all` trả về một mảng với các giá trị được `resolve` sau khi tất cả các `Promise` đã được giải quyết.

## 3. Promise-Returning

Các hàm `Async` luôn trả về một `Promise`, vì vậy những đoạn code sau đây có thể sẽ không tạo ra kết quả như bạn mong muốn:

```
async function hello() {
  return 'Hello Alligator!';
}

const b = hello();

console.log(b); // [object Promise] { ... }
```

Vì những gì được trả lại là một `promise`, thay vào đó, bạn có thể làm điều gì đó như sau:

```
async function hello() {
  return 'Hello Alligator!';
}

const b = hello();

b.then(x => console.log(x)); // Hello Alligator!
```

hoặc: 

```
async function hello() {
  return 'Hello Alligator!';
}

hello().then(x => console.log(x)); // Hello Alligator!
```

## 4. Different Forms

Từ đầu các ví dụ, chúng ta chỉ thấy hàm `async` như một `function declaration`, nhưng bạn cũng có thể định nghĩa `async` như một `function expressions` hoặc thống qua `arrow function` [đọc thêm về function declaration và function expressions](https://viblo.asia/p/phan-biet-function-declaration-va-function-expression-Az45bGnoKxY)

### 4.1 Async Function Expression

Đây là hàm bất đồng bộ từ ví dụ đầu tiên, nhưng có thể được định nghĩa giống như là `function expression`:

```
const msg = async function() {
  const msg = await scaryClown();
  console.log('Message:', msg);
}
```

### 4.2 Async Arrow Function

Đây là ví dụ tương tự một lần nữa, nhưng lần này được định nghĩa dưới dạng `arrow function`:

```
const msg = async () => {
  const msg = await scaryClown();
  console.log('Message:', msg);
}
```

## 5. Error Handling

Một điều khác rất hay về hàm `async` là việc xử lý lỗi cũng được thực hiện hoàn toàn đồng bộ, sử dụng câu lệnh `try… catch` cũ. 

Để chứng minh bằng cách sử dụng một `Promise` sẽ `reject` một nửa số lần:

```
function yayOrNay() {
  return new Promise((resolve, reject) => {
    const val = Math.round(Math.random() * 1); // 0 or 1, at random

    val ? resolve('Lucky!!') : reject('Nope 😠');
  });
}

async function msg() {
  try {
    const msg = await yayOrNay();
    console.log(msg);
  } catch(err) {
    console.log(err);
  }
}

msg(); // Lucky!!
msg(); // Lucky!!
msg(); // Lucky!!
msg(); // Nope 😠
msg(); // Lucky!!
msg(); // Nope 😠
msg(); // Nope 😠
msg(); // Nope 😠
msg(); // Nope 😠
msg(); // Lucky!!
```

Các hàm `async` luôn trả về một `Promise`, bạn cũng có thể xử lý các lỗi chưa được xử lý như bạn thường sử dụng câu lệnh `catch`:

```
async function msg() {
  const msg = await yayOrNay();
  console.log(msg);
}

msg().catch(x => console.log(x));
```

Việc xử lý lỗi đồng bộ này không chỉ hoạt động khi một `Promise` bị `reject` mà còn khi có timeout thời gian chạy hoặc lỗi cú pháp xảy ra.

Trong ví dụ sau, lần thứ hai với lệnh gọi hàm `msg`, chúng tôi chuyển vào một giá trị số không có phương thức `toUpperCase`. Khối `try… catch` cũng bắt được lỗi đó:

```
function caserUpper(val) {
  return new Promise((resolve, reject) => {
    resolve(val.toUpperCase());
  });
}

async function msg(x) {
  try {
    const msg = await caserUpper(x);
    console.log(msg);
  } catch(err) {
    console.log('Ohh no:', err.message);
  }
}

msg('Hello'); // HELLO
msg(34); // Ohh no: val.toUpperCase is not a function
```

## 6. Async Functions With Promise-Based APIS

Hầu hết các API web mà `promise-based` là đều sử dụng các hàm `async`:

```
async function fetchUsers(endpoint) {
  const res = await fetch(endpoint);
  let data = await res.json();

  data = data.map(user => user.username);

  console.log(data);
}

fetchUsers('https://jsonplaceholder.typicode.com/users');
// ["Bret", "Antonette", "Samantha", "Karianne", "Kamren", "Leopoldo_Corkery", "Elwyn.Skiles", "Maxime_Nienow", "Delphine", "Moriah.Stanton"]
```

## 7. Kết luận

Bên trên là những gì mình tìm hiểu về `Async/Await`, hi vọng giúp ích được cho mọi người

## 8. Tài liệu tham khảo

[6 lí do Async/Await đánh bại Promise](https://jobsgo.vn/blog/6-ly-asyncawait-cua-javascript-danh-bai-promises/)

[Promise es6](https://www.digitalocean.com/community/tutorials/js-promises-es6)

[Function declaration và Function expressions](https://viblo.asia/p/phan-biet-function-declaration-va-function-expression-Az45bGnoKxY)

[Async/Await](https://www.digitalocean.com/community/tutorials/js-async-functions)