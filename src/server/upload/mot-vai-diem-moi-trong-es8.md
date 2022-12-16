## I. ECMAScript ES8 là gì? 
ES8 là chữ viết tắt của ECMAScript 8, đây được coi là một tập hợp các kỹ thuật nâng cao của Javascript và là phiên bản mới nhất của chuẩn ECMAScript. Được phát hành vào cuối tháng 6 bởi TC39. Bạn cứ nghĩ xem hiện nay có khá nhiều trình duyệt Browser ra đời và nếu mỗi Browser lại có cách chạy Javascript khác nhau thì các trang web không thể hoạt động trên tất cả các trình duyệt đó được, vì vậy cần có một chuẩn chung để bắt buộc các browser phải phát triển dựa theo chuẩn đó và đó là ECMAScript. Và sau đây mình sẽ giới thiệu một số tính năng mới trong ES8.
## II. 1 số tính năng mới.
### 1. Object.values().
Function Object.values return một mảng giá trị các thuộc tính của một đối tượng. Cách sử dụng hàm như sau:
```javascript
countries = {
    BR: 'Brazil',
    DE: 'Germany',
    RO: 'Romania',
    US: 'United States of America'
};

Object.values(countries);
// ["Brazil", "Germany", "Romania", "United States of America"]
```

### 2. Object.entries
Function Object.entries return một mảng các cặp [key, value] của đối tượng, được đặt trong 1 mảng lớn, có thứ tự giống với phương thức Object.values. Cách sử dụng hàm như sau:
```javascript
countries = {
    BR: 'Brazil',
    DE: 'Germany',
    RO: 'Romania',
    US: 'United States of America'
};

Object.entries(countries);
// [['BR', 'Brazil'], ['DE', 'Germany'], ['RO', 'Romania'], ['US', 'United States of America']]
```

### 3.Phần này thêm hai hàm vào đối tượng String: padStart & padEnd.
Như tên của chúng, mục đích của các function này là để bắt đầu hoặc kết thúc chuỗi, để chuỗi kết quả đạt đến độ dài đã cho. Bạn có thể đưa thêm ký tự vào chuỗi ban đầu bằng ký tự hoặc chuỗi cụ thể hoặc chỉ cần đệm bằng dấu cách theo mặc định. Dưới đây là một số ví dụ về 2 function này.
```javascript
// 'string'.padStart(targetLength, padString)
"nah".padStart(3) => "nah"
"nah".padStart(5) => "  nah"
"nah".padStart(5, "hi") =>  "hinah"
"nah".padStart(4, "hi") =>  "hnah"

// 'string'.padEnd(targetLength, padString)
"nah".padEnd(3) => "nah"
"nah".padEnd(5) =>  "nah  "
"nah".padEnd(5, "hi") =>  "nahhi"
"nah".padEnd(4, "hi") =>  "nahh"
```
### 4. Array.prototype.includes
Method này sẽ kiểm tra giá trị được đưa vào có trong mảng hay không, nếu có thì return true và không thì return false.
Method này giống với method includes? trong ruby.
```javascript
['Rina Ishihara', 'Asuka Ichinose', 'Kirara Asuka'].includes('Kirara Asuka') 
// true

['Ava Taylor', 'Karla Kush', 'Brooklyn Chase'].includes('Johnny Sins') 
// false
```
### 5. Async functions
Hay còn gọi là bất đồng bộ. Từ khóa async dùng để khai báo một hàm bất đồng bộ. 
```javascript
function loadExternalContent() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('hello');
        }, 3000);
    });
}

async function getContent() {
    const text = await loadExternalContent();
    console.log(text);
}
```
lần lượt console log ra cái gì đó và gọi hàm này xem thử thôi.
```javascript
console.log('1');
getContent();
console.log('2');

=>
'1'
'2'
'hello'
```
Tại chúng ta gọi getContent trước mà lại in ra chuỗi "hello" sau sau.
đây được gọi là Async function và chúng ta set cho nó chờ 3s sau khi được gọi mới thực hiện lệnh.
### 6. Chia sẻ bộ nhớ và atomics
Khi bộ nhớ được chia sẽ, nhiều luồng có thể đọc và ghi trên cùng dữ liệu trong bộ nhớ. Thao tác atomic đảm bảo các giá trị đọc và ghi, các thao tác kết thúc trước khi thao tác tiếp theo bắt đầu và các thao tác này không bị gián đoạn. Khai báo như sau
```javascript
new SharedArrayBuffer(length)
```
Ví dụ:
```javascript
// main.js
const w = new Worker('worker.js'),
buff = new SharedArrayBuffer(1);
var   arr = new Int8Array(buff);
/* setting data */
arr[0] = 9;
/* sending the buffer (copy) to worker */
w.postMessage(buff);
/* changing the data */
arr[0] = 1;
/* printing the data after the worker has changed it */
w.onmessage = (e)=>{
  console.group('[main]');
  console.log('Updated data received from worker thread: %i', arr[0]);
  console.groupEnd();
}

// worker.js
onmessage = (e)=>{
  var arr = new Int8Array(e.data);
  console.group('[worker]');
  console.log('Data received from main thread: %i', arr[0]);
  console.groupEnd();
  /* changing the data */
  arr[0] = 7;
  /* posting to the main thread */
  postMessage('');
}

=>
[worker]
Data received from main thread: 1
[main]
Updated data received from worker thread: 7
```

### 7. Object.getOwnPropertyDescriptors
Phương thức getOwnPropertyDescriptors trả lại tất cả các thuộc tính descriptor của một đối tượng.
```javascript
const obj = {
    name: 'Pablo',
    get foo() { return 42; }
};
Object.getOwnPropertyDescriptors(obj);
//
// {
//  "name": {
//     "value": "Pablo",
//     "writable":true,
//     "enumerable":true,
//     "configurable":true
//  },
//  "foo":{
//     "enumerable":true,
//     "configurable":true,
//     "get": function foo()
//     "set": undefined
//  }
// }
```
Qua bài viết mình đã giới thiệu một số function mới trong es8. Chắc hẳn còn nhiều thiếu sót, mong các bạn góp ý thêm.
Bài viết được tham khảo:
[What's new in es8](https://medium.freecodecamp.org/es8-the-new-features-of-javascript-7506210a1a22)
[shared-memory-in-javascript](https://www.hongkiat.com/blog/shared-memory-in-javascript/)