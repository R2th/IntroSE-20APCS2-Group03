### Mở đầu
Bản chất JavaScript là một ngôn ngữ đơn luồng, và nó chỉ chạy trên một luồng (thread) duy nhất. Thread này được dựa trên một khái niệm gọi là event loop. Thread này sẽ phản hồi tới các event khi chúng xảy ra. Là một ngôn ngữ đơn luồng, JavaScript chỉ có thể xử lý từng câu lệnh một. Trong khi đang xử lý câu lệnh đó thì thread sẽ bị block.

Việc đơn luồng này có nhiều ưu điểm, đơn giản nhất là nó sẽ giúp code dễ hơn. Bạn sẽ không cần phải quan tâm đến các vấn đề liên quan đến concurrency. Code của bạn sẽ được thực thi tuần tự từ trên xuống dướii theo cách bạn code. Bạn cũng sẽ không phải lo đến việc có nhiều việc khác nhau chạy trên cùng một thời điểm.

Tuy nhiên nó vẫn có nhược điểm lớn là chỉ có một công việc được làm tại một thời điểm. Mọi việc khác phải chờ đến khi nó hoàn thiện mới có thể được thực thi. Việc này thật sự sẽ là một vấn đề nếu bạn phải lấy data từ một API.

Khi gọi đến API bằng cách đồng bộ/synchronous, việc này có thể block main thread cho đến khi xử lý xong. Do đó code của bạn sẽ phải chờ cho đến khi main thread được mở, đồng nghĩa với việc app của bạn sẽ bị đứng và không có phản hồi.

Để giải quyết cho vấn đề ở đây là viết code bất đồng bộ, đưa việc gọi API vào xử lý bất đồng bộ. Khi làm vậy thì JavaScript có thể chạy được nhiều task khác nhau và chạy cùng lúc với nhau. Khi chạy một task bất đồng bộ thì nó sẽ được đưa vào event queue do đó sẽ không block main thread. 

 Với bất đồng bộ, việc các sự kiện, công việc hoạt động song song không gây ảnh hưởng tới luồng công việc chính. Điều này sẽ tối ưu được thời gian chờ, qua đó làm giảm tổng thời gian cần để hoàn thành một nhiệm vụ.
 Nhưng kết quả của công việc thực hiện sau có thể được trả về trước kết quả của công việc chạy trước nó, do vậy kết quả trả về cuối cùng có thể sẽ không theo thứ tự đã định sẵn, yêu cầu chúng ta cần kiểm soát chặt chẽ hơn.

Chúng ta có  3 cách để xử lý việc này : callback, promise, asyn await.

**Callback** có rất nhiều nhược điểm. Khi ta có nhiều thao tác bất đồng bộ, các callback phải chờ nhau thực hiện, thời gian để hoàn thành sẽ bị kéo dài hơn. Ngoài ra, việc viết các callback lồng nhau cũng làm cho mã nguồn của ta rắc rối và khó bảo trì.

Trong phiên bản ES6 , JavaScript đã được bổ xung thêm ( .then() ) **Promise**. Nó là một thay thế tuyệt vời cho callbacks và hầu hết cộng đồng nhanh chóng chuyển sang sử dụng nó để thay thế cho callbacks. Code mới của chúng ta gần giống với code cũ, kết quả là trông dễ theo dõi và bảo trì hơn. Tuy nhiên, dùng promise đôi khi ta vẫn thấy hơi khó chịu vì phải truyền callback vào hàm then và catch. Code cũng sẽ hơi dư thừa và khó debug, vì toàn bộ các hàm then chỉ được tính là 1 câu lệnh nên không debug riêng từng dòng được.

Cuối cùng, trong phiên bản ES7 gần đây nhất, **Async / Await** đã được bổ xung để việc viết code bất đồng bộ trong JavaScript tốt hơn, code dễ nhìn hơn và dễ sử dụng hơn.


### Async/Await 

Async/await  được cấu tạo từ 2 phần. Phần đầu tiên là function async. Hàm này sẽ được tự động thực thi bất đồng bộ. Giá trị nó trả về là một Promise. Vì trả về Promise nên bạn sẽ phải sử dụng các handler của Promise để xử lý giá trị này.

Phần thứ hai của async/await là operator await. Operator này sẽ được dùng cùng với một Promise. Nó sẽ khiến cho function async tạm dừng cho đến khi Promise đó chạy xong. Ngay sau đó nó sẽ lấy gía trị của Promise mà cho function async tiếp tục chạy.

**1. Async functions**

Phần quan trọng nhất của Async functions là async key. Điều này sẽ cho JavaScript biết rằng bạn muốn khai báo một hàm Async thay vì hàm thông thường. Đó cũng là async key này sẽ cho phép bạn sử dụng await key  bên trong hàm không đồng bộ đó. Nếu không, JavaScript sẽ ném ra SyntaxError. Thêm về điều này sau.

Hàm này hàm trả về promise.

Ví dụ :

```js
async function helloWorld() {
  return "Hello World"
}

helloWorld().then(
    res => console.log(res)
    //in ra Hello World
)
```

**2. Await**

Từ khóa Await được đặt trước 1 hàm làm cho hàm chờ một promise. Chỉ có thể sử dụng await bên trong một hàm Async.

Await - tạm dừng việc thực hiện các hàm async.
* Khi được đặt trước một Promise, nó sẽ đợi cho đến khi Promise kết thúc và trả về kết quả.
* Await chỉ làm việc với Promises, nó không hoạt động với callbacks.
* Await chỉ có thể được sử dụng bên trong các function async.

```js
 async function getJSONAsync() {

    // The await keyword saves us from having to write a .then() block.
    let json = await axios.get('https://tutorialzine.com/misc/files/example.json');

    // The result of the GET request is available in the json variable.
    // We return it just like in a regular synchronous function.
    return json;
    }function findRandomImgPromise(tag) {
  const apiKey = 'a89c66e48519481ab448a3f8356e635c';
  const endpoint = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${tag}`;
  return fetch(endpoint)
    .then(rs => rs.json())
    .then(data => data.data.fixed_width_small_url);
}

$('#request').click(async () => {
  const imgUrl = await findRandomImgPromise('cat');
  $('#cat').attr('src', imgUrl);
});
```

Như trong hình phía trên, hàm findRandomImgPromise là hàm bất đồng bộ, trả về một Promise. Với từ khoá await, ta có thể coi hàm này là đồng bộ, câu lệnh phía sau chỉ được chạy sau khi hàm này trả về kết quả.

### Xử lý lỗi trong Async / Await
Một điều tuyệt vời khác về Async / Await là nó cho phép chúng ta bắt các lỗi không mong đợi bằng cách sử dụng try / catch. Chúng ta chỉ cần để các await call của chúng ta vào trong khối try/catch như sau:

Khi nói đến async / await và lỗi, có hai cách để xử lý chúng. Một cách là sử dụng catch()chức năng. Hàm async trả về một .Promise Khi lời hứa bị từ chối, nó là catch()chức năng cho phép bạn bắt và xử lý lỗi này. Điều này cũng hoạt động cho Async / await.

```js
// Create async function
async function myAsyncFunc() {
  // Create promise that rejects
  // and wait for its completion
  await new Promise((resolve, reject) => {
    reject('Promise rejected!')
  })
}

// Invoke myAsyncFunc and catch the error
myAsyncFunc()
  .catch(err => {
    console.log(`error: ${err}`)
  })
// 'error: Promise rejected!'
```

Một điều tuyệt vời khác về Async / Await là nó cho phép chúng ta bắt các lỗi không mong đợi bằng cách sử dụng try / catch. Chúng ta chỉ cần để các await call của chúng ta vào trong khối try/catch như sau:

```js
/ Create async function
async function myAsyncFunc() {
  // Create new promise that rejects
  const myPromise = new Promise((resolve, reject) => {
    reject('Promise rejected!')
  })

  // Create try...catch statement
  try {
    // Await the promise to get rejected
    const message = await myPromise
  }
  catch(err) {
    // Catch any error and log it
    console.log(`error: ${err}`)
  }
}

// Invoke the myAsyncFunc() function
myAsyncFunc()
// 'error: Promise rejected!'
```
### Tại sao nên dùng async/await?
Như mình đã nói, async/await có một số ưu điểm vượt trội so với promise:

* Code dễ đọc hơn rất rất nhiều, không cần phải then rồi catch gì cả, chỉ viết như code chạy tuần tự, sau đó dùng try/catch thông thường để bắt lỗi.
* Viết vòng lặp qua từng phần tử trở nên vô cùng đơn giản, chỉ việc await trong mỗi vòng lặp.
* Debug dễ hơn nhiều, vì mỗi lần dùng await được tính là một dòng code, do đó ta có thể đặt debugger để debug từng dòng như thường.
* Khi có lỗi, exception sẽ chỉ ra lỗi ở dòng số mấy chứ không chung chung là un-resolved promise.
* Với promise hoặc callback, việc kết hợp if/else hoặc retry với code asynchnous là một cực hình vì ta phải viết code lòng vòng, rắc rối. Với async/await, việc này vô cùng dễ dàng.
### Bất cập của async/await

Tất nhiên, async/await cũng có một số bất cập mà các bạn cần phải lưu ý khi sử dụng:

* Không chạy được trên các trình duyệt cũ. Nếu dự án yêu cầu phải chạy trên các trình duyệt cũ, bạn sẽ phải dùng Babel để transpiler code ra ES5 để chạy.
* Khi ta await một promise bị reject, JavaScript sẽ throw một Exception. Do đó, nếu dùng async await mà quên try catch thì lâu lâu chúng ta sẽ bị… nuốt lỗi hoặc code ngừng chạy.
* async và await bắt buộc phải đi kèm với nhau! await chỉ dùng được trong hàm async, nếu không sẽ bị syntax error. Do đó, async/await sẽ lan dần ra toàn bộ các hàm trong code của bạn.

### Kết luận
Cảm ơn các bạn đã theo dõi, chúc ngày lễ tốt lành.

Tham khảo : 
https://blog.alexdevero.com/javascript-async-await