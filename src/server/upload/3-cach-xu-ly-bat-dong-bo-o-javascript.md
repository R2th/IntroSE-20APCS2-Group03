Javascript là ngôn ngữ đơn luồng (single-threaded), điều này có nghĩa là nó chỉ có thể xử lý một câu lệnh tại một thời điểm. Để loại bỏ rào cản này thì chúng ta có thể sử dụng bất đồng bộ, và bài viết này mình sẽ hướng dẫn và đưa ra những điểm cơ bản của 3 cách viết code bất đồng bộ trong JavaScript.

# Bất đồng bộ trong JavaScript là gì?

Bản chất JavaScript là một ngôn ngữ đơn luồng, và nó chỉ chạy trên một luồng (thread) duy nhất. Thread này được dựa trên một khái niệm gọi là [event loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop). Thread này sẽ phản hồi tới các event khi chúng xảy ra. Là một ngôn ngữ đơn luồng, JavaScript chỉ có thể xử lý từng câu lệnh một. Trong khi đang xử lý câu lệnh đó thì thread sẽ bị block.

Việc đơn luồng này có nhiều ưu điểm, đơn giản nhất là nó sẽ giúp code dễ hơn. Bạn sẽ không cần phải quan tâm đến các vấn đề liên quan đến [concurrency](https://en.wikipedia.org/wiki/Concurrency_(computer_science)). Code của bạn sẽ được thực thi tuần tự từ trên xuống dướii theo cách bạn code. Bạn cũng sẽ không phải lo đến việc có nhiều việc khác nhau chạy trên cùng một thời điểm.

Tuy nhiên nó vẫn có nhược điểm lớn là chỉ có một công việc được làm tại một thời điểm. Mọi việc khác phải chờ đến khi nó hoàn thiện mới có thể được thực thi. Việc này thật sự sẽ là một vấn đề nếu bạn phải lấy data từ một API.

Khi gọi đến API bằng cách đồng bộ/synchronous, việc này có thể block main thread cho đến khi xử lý xong. Do đó code của bạn sẽ phải chờ cho đến khi main thread được mở, đồng nghĩa với việc app của bạn sẽ bị đứng và không có phản hồi.

```javascript
function makeAPICall() {
  console.log('Bắt đầu gọi API.');
  console.log('Nhận data từ API.');
};

function processAPIData() {
  console.log('Xử lý data');
};

function readTheData() {
  console.log('Đọc data.');
};

// function này sẽ phải chờ đến khi
// hai function makeAPICall() và processAPIData() chạy xong.
function someOtherFunction() {
  console.log('Chức năng khác không liên quan đến API.');
};

makeAPICall();
processAPIData();
readTheData();
someOtherFunction();

// Output:
// 'Bắt đầu gọi API.'
// 'Nhận data từ API.'
// 'Xử lý data'
// 'Đọc data.'
// 'Chức năng khác không liên quan đến API.'
```

Ví dụ ở trên sẽ gặp vấn đề ngay khi có delay ở việc gọi API. Trong trường hợp đó thì code của chúng ta sẽ chạy với một thứ tự khác so với bạn mong muốn. Như vậy có thể sẽ dẫn đến những vấn đề không đáng có.

```javascript
function makeAPICall() {
  console.log('Bắt đầu gọi API.');
  // delay 2 giây
  setTimeout(() => {
    console.log('Nhận data từ API.');
    console.log('Gọi API thành công.');
  }, 2000)
}

function processAPIData() {
  console.log('Xử lý data');
};

function readTheData() {
  console.log('Đọc data.');
};

function someOtherFunction() {
  console.log('Chức năng khác không liên quan đến API.');
};

makeAPICall();
processAPIData();
readTheData();
someOtherFunction();

// Output:
// 'Bắt đầu gọi API.'
// 'Xử lý data'
// 'Đọc data.'
// 'Chức năng khác không liên quan đến API.'
// 'Nhận data từ API.'
// 'Gọi data thành công.'
```

Hướng giải quyết cho vấn đề ở đây là viết code bất đồng bộ, đưa việc gọi API vào xử lý bất đồng bộ. Khi làm vậy thì JavaScript có thể chạy được nhiều task khác nhau và chạy cùng lúc với nhau. Khi chạy một task bất đồng bộ thì nó sẽ được đưa vào event queue do đó sẽ không block main thread.

Nếu main thread không bị block thì nó có thể thực thì được các task tiếp theo, và code của bạn sẽ tiếp tục chạy. Đến khi task bất đồng bộ được chạy xong thì nó sẽ trả về data để bạn xử lý. Có 3 cách để làm được việc này đó là `callback`, `Promise` và `async/await`.

# Callback

Cách đầu tiên và cũng là lâu đời nhất để xử lý bất đồng bộ trong JavaScript là sử dụng callbacks. Một callback là một hàm bất đồng bộ được truyền vào một hàm khác dưới dạng tham số khi gọi. Khi function bạn chạy xong thì nó sẽ "gọi lại" hàm callback được truyền vào.

Hàm callback này sẽ không được gọi, không được thực thi hay làm bất cứ điều gì cho đến khi hàm chính chạy xong. Hàm này sẽ không block main thread do đó main thread sẽ có thể làm các việc khác. [Event listener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) chính là một trong các callback mà chúng ta thường xuyên sử dụng. 

`addEventListener()` nhận vào 3 tham số. Tham số đầu tiên là loại event bạn muốn lắng nghe. Tham số thứ hai chính là hàm callback mà bạn muốn chạy khi event diễn ra. Tham số cuối cùng là một object và không bắt buộc.

```javascript
// tìm button có id là '#btn' trong DOM
const btn = document.querySelector('#btn');

function handleBtnClick() {
  console.log('Click!');
};

// gắn event listener vào button,
// và truyền function xử lý event vào như một callback
// và callback này sẽ chạy khi và chỉ khi ai đó ấn vào button này.
btn.addEventListener('click', handleBtnClick);

// một cách khác:
// viết trực tiếp callback.
btn.addEventListener('click', function() {
  console.log('Click!');
});
```

Callback cực kì hữu dụng nếu bạn không thể biết trước bao giờ sẽ có data hoặc thời điểm hàm chính chạy xong. Lấy ví dụ về một việc gọi API, xử lý data và có delay. Gần như sẽ không thể biết trước được rằng bao giờ API mới hoàn tất, cũng như là việc xử lý xong data.

Với callback, bạn sẽ không cần phải đoán xem bao giờ thì xử lý xong. Bạn chỉ việc code theo đúng thứ tự mà bạn mong muón. Ví dụ, nếu việc xử lý API mất thời gian, thì bạn có thể cho hàm đọc data làm callback và chỉ thực thi khi nào có data. Do đó sẽ không có gì block main thread hết.

```javascript
function makeAPICall() {
  console.log('Bắt đầu gọi API.');
  // delay 2 giây
  setTimeout(() => {
    console.log('Nhận data từ API.');
    processAPIData();
    console.log('Gọi API thành công.');
  }, 2000)
}

function processAPIData() {
  console.log('Xử lý data');
  readTheData();
};

// Create a function to read the API data
function readTheData() {
  console.log('Đọc data.');
};

// Create another app function
// This function will be invoked
// right after the makeAPICall() function
// and before all other functions
function someOtherFunction() {
  console.log('Chức năng khác không liên quan đến API.');
};

makeAPICall();
someOtherFunction();

// Output:
// 'Bắt đầu gọi API.'
// 'Chức năng khác không liên quan đến API.'
// 'Nhận data từ API.'
// 'Xử lý data'
// 'Đọc data.'
// 'Gọi data thành công'
```

# Promise
Cách thứ hai đó để xử lý bất đồng bộ là promise. Promise là một tính năng mới được giới thiệu ở ES6, nó cung cấp một cách dễ dàng hơn để xử lý bất đồng bộ trong JavaScript. 

Một Promise là một object chứa một giá trị. Giá trị này sẽ không được show ra khi bạn tạo Promise. Promise sẽ trả về giá trị này khi nó thành công hoặc thất bại. Có 3 hàm handler bạn có thể sử dụng để lấy giá trị mà Promise trả về.

Các hàm này là `then()`, `catch()` và `finally()`. Đẻ sử dụng những hàm handler này thì ta gắn chúng vào một object Promise. Dựa vào trạng thái của Promise thì handler tương ứng sẽ được invoke. 

- `then()`  sẽ chạy khi Promise thành công. Đôi khi bạn cũng có thể sử dụng để xử lý trạng thái thất bại của Promise.
- `catch()` sẽ chạy chỉ khi Promise thất bại.
- `finally()` sẽ chạy khi Promise chạy xong, không quan trọng là thành công hay thất bại.

```javascript
const makeAPICall = new Promise((resolve, reject) => {
  console.log('Bắt đầu gọi API.');

  setTimeout(() => {
    console.log('Nhận data từ API.');
    resolve('Gọi API thành công.');
  }, 2000)
});

function processAPIData() {
  console.log('Xử lý data');
};

function readTheData() {
  console.log('Đọc data.');
};

// Hàm này sẽ chạy ngay sau Promise makeAPICall
// và chạy trước tất cả các hàm khác.
function someOtherFunction() {
  console.log('Chức năng khác không liên quan đến API.');
};

makeAPICall
  // add handle cho status thành công
  .then(result => {
    console.log(result);
    processAPIData();
    readTheData();
  })
  // add handle cho status thất bại
  .catch(error => {
    console.log(`Có lỗi xảy ra: ${error}.`)
  })
  // bạn có thể thêm finally() ở đây
  // .finally(() => {})

someOtherFunction();

// Output:
// 'Bắt đầu gọi API.'
// 'Chức năng khác không liên quan đến API.'
// 'Nhận data từ API.'
// 'Gọi data thành công'
// 'Xử lý data'
// 'Đọc data.'
```

# Async/await

Cách cuối cùng để xử lý bất đồng bộ là sử dụng async/await. Async/await được giới thiệu ở ES8, chúng được cấu tạo từ 2 phần. Phần đầu tiên là function `async`. Hàm này sẽ được tự động thực thi bất đồng bộ. Giá trị nó trả về là một Promise. Vì trả về Promise nên bạn sẽ phải sử dụng các handler của Promise để xử lý giá trị này. 

Phần thứ hai của async/await là operator `await`. Operator này sẽ được dùng cùng với một Promise. Nó sẽ khiến cho function `async` tạm dừng cho đến khi Promise đó chạy xong. Ngay sau đó nó sẽ lấy gía trị của Promise mà cho function `async` tiếp tục chạy.

Các function `async` đều bất đồng bộ, khi bị pause bởi `await` thì phần code còn lại vẫn chạy bình thường vì function đấy không block main thread. Khi Promise chạy xong thì hàm `async` sẽ chạy tiếp và trả về giá trị của Promise. 

Một điều quan trọng hơn là `await` phải được viết trong hàm `async` nếu không thì sẽ gặp lỗi `syntax error`

```javascript
// tạo một hàm async
async function makeAPICall() {
  // Show notification about API call
  console.log('Bắt đầu gọi API.');

  // Create a Promise to make the API call
  const dataPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Nhận data từ API.');
      resolve('Gọi API thành công.');
    }, 2000);
  });

  return dataReceived = await dataPromise
}

function processAPIData() {
  console.log('Xử lý data');
};

function readTheData() {
  console.log('Đọc data.');
};

// Hàm này sẽ chạy ngay sau async makeAPICall
// và chạy trước tất cả các hàm khác.
function someOtherFunction() {
  console.log('Some other function not related to API.')
}

makeAPICall
  // add handle cho status thành công
  .then(result => {
    console.log(result);
    processAPIData();
    readTheData();
  })
  // add handle cho status thất bại
  .catch(error => {
    console.log(`Có lỗi xảy ra: ${error}.`)
  })
  // bạn có thể thêm finally() ở đây
  // .finally(() => {})

someOtherFunction();

// Output:
// 'Bắt đầu gọi API.'
// 'Chức năng khác không liên quan đến API.'
// 'Nhận data từ API.'
// 'Gọi data thành công'
// 'Xử lý data'
// 'Đọc data.'
```


Cảm ơn các bạn đã đọc bài. 

Nguồn: https://blog.alexdevero.com/asynchronous-javascript-code/