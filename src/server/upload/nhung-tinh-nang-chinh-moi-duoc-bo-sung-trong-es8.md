**EcmaScript8** hay EcmaScript2017 đã được phát hành vào cuối tháng 6 bởi TC39. Bài viết này sẽ giới thiệu các tính năng chính, mới được thêm vào trong ES8 thông qua các ví dụ

# String padding
Phần này bổ sung thêm 2 function tới đối tượng String: **padStart** & **padEnd**. Như tên gọi, mục đích của các function này là để pad (độn) thêm vào đầu hoặc cuối chuỗi, chuỗi kết quả sẽ có độ dài như chúng ta cung cấp. Bạn có thể pad nó với một ký tự nhất định hoặc chuỗi hay chỉ là các dấu cách (mặc định). Đây là cách khai báo hàm:
```
str.padStart(targetLength [, padString])
str.padEnd(targetLength [, padString])
```
Như bạn có thể thấy tham số đầu tiên của các function này là targetLength, nó là độ dài của chuỗi kết quả. Tham số thứ 2 không bắt buộc là padString là chuỗi để pad thêm vào chuỗi nguồn. Mặc định là khoảng trắng.
```
'es8'.padStart(2);          // 'es8'
'es8'.padStart(5);          // '  es8'
'es8'.padStart(6, 'woof');  // 'wooes8'
'es8'.padStart(14, 'wow');  // 'wowwowwowwoes8'
'es8'.padStart(7, '0');     // '0000es8'
'es8'.padEnd(2);          // 'es8'
'es8'.padEnd(5);          // 'es8  '
'es8'.padEnd(6, 'woof');  // 'es8woo'
'es8'.padEnd(14, 'wow');  // 'es8wowwowwowwo'
'es8'.padEnd(7, '6');     // 'es86666'
```

# Object.values và Object.entries
Phương thức **Object.values** trả lại một mảng giá trị các thuộc tính của đối tượng, thứ tự tương tự vòng lặp for in. Cách khai báo của hàm:
```
Object.values(obj)
```
Tham số **obj** là đối tượng nguồn. Nó có thể là một object hoặc mảng (mảng [10, 20, 30] tương đương với đối tượng {0: 10, 1: 20, 2: 30}).
```
const obj = { x: 'xxx', y: 1 };
Object.values(obj); // ['xxx', 1]

const obj = ['e', 's', '8']; // same as { 0: 'e', 1: 's', 2: '8' };
Object.values(obj); // ['e', 's', '8']

// when we use numeric keys, the values returned in a numerical 
// order according to the keys
const obj = { 10: 'xxx', 1: 'yyy', 3: 'zzz' };
Object.values(obj); // ['yyy', 'zzz', 'xxx']
Object.values('es8'); // ['e', 's', '8']
```

# Object.getOwnPropertyDescriptors
Phương thức **getOwnPropertyDescriptors** trả lại tất cả các thuộc tính descriptor của một đối tượng cụ thể. Một thuộc tính descriptor được định nghĩa trực tiếp trên đối tượng và không kế thừa từ nguyên mẫu của đối tượng. Cách khai báo:
```
Object.getOwnPropertyDescriptors(obj)
```
**obj** là đối tượng nguồn. Các keys của đối tượng descriptor là **configurable**, **enumerable** **writable**, **get**, **set** and **value**.
```
const obj = { 
  get es7() { return 777; },
  get es8() { return 888; }
};
Object.getOwnPropertyDescriptor(obj);
// {
//   es7: {
//     configurable: true,
//     enumerable: true,
//     get: function es7(){}, //the getter function
//     set: undefined
//   },
//   es8: {
//     configurable: true,
//     enumerable: true,
//     get: function es8(){}, //the getter function
//     set: undefined
//   }
// }
```

# Dấu phẩy trong danh sách các tham số khi khai báo và gọi hàm
Dấu phẩy trong danh sách các tham số của hàm là việc không gây ra lỗi (SyntaxError) khi chúng ta thêm các dấu phẩy không cần thiết ở cuối danh sách tham số:
```
function es8(var1, var2, var3,) {
  // ...
}
```
Giống như khai báo, bạn có thể áp dụng điều này khi gọi hàm:
```
es8(10, 20, 30,);
```
Tính năng này lấy cảm hứng từ dấu phẩy trong các object literal { x: 1 } và mảng [10, 20, 30,].

# Async functions
**async function** dùng để khai báo một hàm bất đồng bộ, nó trả lại một đối tượng **AsyncFunction**. Thực chất, các hàm **async** làm việc giống như **generators**, nhưng không được dịch thành các hàm generator.
```
function fetchTextByPromise() {
  return new Promise(resolve => { 
    setTimeout(() => { 
      resolve("es8");
    }, 2000);
  });
}
async function sayHello() { 
  const externalFetchedText = await fetchTextByPromise();
  console.log(`Hello, ${externalFetchedText}`); // Hello, es8
}
sayHello();
```
Gọi hàm *sayHello* sẽ log "Hello, es8" sau 2 giây
```
console.log(1);
sayHello();
console.log(2);
```
Và đây là kết quả
```
1 // immediately
2 // immediately
Hello, es8 // after 2 seconds
```
Có kết quả này vì hàm *sayHello* không block flow.

Chú ý async function luôn trả lại một promise và một từ khóa await chỉ có thể được sử dụng trong hàm được đánh dấu với từ khóa async.

# Chia sẻ bộ nhớ và atomics
Khi bộ nhớ được chia sẻ, nhiều luồng có thể đọc và ghi trên cùng dữ liệu trong bộ nhớ. Thao tác atomic đảm bảo các giá dự đoán được để đọc và ghi, các thao tác kết thúc trước khi thao tác tiếp theo bắt đầu và các thao tác này không bị gián đoạn. Phần này giới thiệu một hàm khởi tạo mới ShareArrayBuffer và một đối tượng Atomics với các phương thức tĩnh.
Atomic là một đối tượng của phương thức Math, vì thế chúng ta không thể sử dụng nó như một hàm khởi tạo. Ví dụ các phương thức tĩnh trong đối tượng này là:

* add/sub - cộng/trừ một giá trị ở một vị trí cụ thể
* and/or/xor
* load - lấy giá trị tại một vị trí cụ thể

# Và một tính năng cho năm sau trong ES9 - Lifting template literal restriction
Với tag template literal (ES6) chúng ta có thể làm những thứ như khai báo một template parsing function và trả lại một giá trị theo logic của chúng ta:
```
const esth = 8;
helper`ES ${esth} is `;
function helper(strs, ...keys) {
  const str1 = strs[0]; // ES
  const str2 = strs[1]; // is
  let additionalPart = '';
  if (keys[0] == 8) { // 8
    additionalPart = 'awesome';
  }
  else {
    additionalPart = 'good';
  }
  
  return `${str1} ${keys[0]} ${str2} ${additionalPart}.`;
}
```
Giá trị được trả lại sẽ là "ES8 is awesome"

Và nếu esth là 7, giá trị trả lại là "ES7 is good"

# Kết luận
Quá trình tích hợp các tính năng mới đã được chuẩn bị và sẵn sàng. Trong giai đoạn cuối, các tính năng đã được ủy ban TC39 xác nhận và triển khai. Hầu hết chúng đã có trong TypeScript, các trình duyệt hoặc các polyfill, vì thế bạn có thể thử chúng ngay bây giờ.