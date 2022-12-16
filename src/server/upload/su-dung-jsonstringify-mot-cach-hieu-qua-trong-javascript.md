![](https://images.viblo.asia/c84d6c7d-782e-45d4-8c6b-6434ae189fd8.jpg)
`JSON.stringify()` là một hàm kinh điển trong Javascript để chuyển một Object sang JSON. Có rất nhiều thư viện sử dụng `JSON.stringify()` như `res.json()` trong [Express](http://expressjs.com/en/4x/api.html#res.json) , `post()` trong  [Axios](https://github.com/axios/axios#example) và  cả [Webpack stats](https://webpack.js.org/configuration/stats/). Trong bài viết này mình sẽ trình bày một cách tổng quan về `JSON.stringify()` bao gồm cả các trường hợp lỗi.
```JS
const obj = { answer: 42 };

const str = JSON.stringify(obj);
str; // '{"answer":42}'
typeof str; // 'string'
```
`JSON.stringify()` sử dụng chung với hàm `JSON.parse()`, đây là cách ta sao chép một Object mà không ảnh hưởng đến Object cũ.
```JS
const obj = { answer: 42 };
const clone = JSON.parse(JSON.stringify(obj));

clone.answer; // 42
clone === obj; // false
```
## Trường hợp đặc biệt và lỗi.
 #### 1. Khi một Object có một `property` trỏ về chính nó, `JSON.stringify()` trả về 1 error
  ```JS
  const obj = {};
  obj.prop = obj;
  
  // Throws "TypeError: TypeError: Converting circular structure to JSON"
  JSON.stringify(obj);
  ```
  
  #### 2. Các trường hợp `NaN` và `Infinity`, `JSON.stringify()` sẽ trả về `null`
  ```JS
  const obj = {
    nan: parseInt('not a number'),
    inf: Number.POSITIVE_INFINITY
  };
  
  JSON.stringify(obj) // '{"nan":null,"inf":null}'
  ```

#### 3. Lọc bỏ hết tất cả các giá trị `undefined` hay `function`
  
  ```JS
  const obj = {
    fn: function() {},
    undef: undefined
  };
  
  JSON.stringify(obj) // '{}'
  ```
  ## Các tham số còn lại của `JSON.stringify()`
  
 `JSON.stringify()` nhận vào 3 tham số , đa phần chúng ta không biết đến 2 tham số còn lại.

Tham số thứ 2 là một hàm `replacer`, một hàm nhận vào 1 cặp `key/value` có thể sử dụng để thay đổi output sau cùng.

 ```JS
const obj = {
    a: 1,
    b: 2,
    c: 4,
    d: {
      e: 4
    }
};
 
 //Nếu là number thì tăng lên 1
 JSON.stringify(obj, function replacer(key, val) {
     if(typeof val === 'number') {
         return val + 1;
     }
     
     return val;
 })
 // '{"a":2,"b":3,"c":4,"d":{"e":5}}'
 ```
 
 Tham số thứ 3 là `spaces`, cho phép format lại đoạn code in ra console. Có nhiều cách để hiển thị ra thứ mà ta mong muốn.
  ```JS
const obj = {
    a: 1,
    b: 2,
    c: 4,
    d: {
      e: 4
    }
};
 
 JSON.stringify(obj);
 // '{"a":1,"b":2,"c":3,"d":{"e":4}}'

JSON.stringify(obj, null, '  ');
// hoặc
JSON.stringify(obj, null, 2);
 // {
//   "a": 1,
//   "b": 2,
//   "c": 3,
//   "d": {
//     "e": 4
//   }
// }

//Không nhất thiết phải là dấu khoảng trắng
JSON.stringify(obj, null, '__'); 
// {
// __"a": 1,
// __"b": 2,
// __"c": 3,
// __"d": {
// ____"e": 4
// __}
// }
  ```
  
  Ví dụ như ta có thể lược bỏ dữ liệu nhạy cảm như **password** ra khỏi Object bằng `JSON.stringify()`.
  ```JS
  const obj = {
    name: 'John Doe',
    password: 'isLuckyman',
    nested: {
      hashedPassword: 'c3RhcmdhemVy'
    }
  };
  
  JSON.stringify(obj, function replacer(key, val) {
   if(key.match(/password/i)) {
     return undefined;
   }
     return val;
  });
  // '{"name":"John Doe","nested": {}}'
  ```
 ## Hàm toJSON() 
 Khi đi qua hàm `JSON.stringify()` nếu bên trong Object có hàm `toJSON()`, thì nó sẻ trả về kết quả của hàm này.
 ```JS
 const obj = {
     name: 'John Doe',
     nested: {
         test: 'nothing to show',
         toJSON: () => 'test'
     }
 };
 
 JSON.stringify(obj);
 // '{"name":"John Doe","nested":"test"}'
 ```
 Rất nhiều thư viện sử dụng `JSON.stringify()`  kết hợp `toJSON()` để đảm bảo output lúc serialize ra đúng với mong muốn như [Moment objects](https://momentjs.com/docs/#/displaying/as-json/) và  [Mongoose documents](https://mongoosejs.com/docs/api.html#document_Document-toJSON). Hy vọng bài viết sẽ giúp các bạn có thể hiểu rõ và sử dụng `JSON.stringigy()` hợp lý và hiệu quả.
 ### Tham khảo 
* [The code barbarian](http://thecodebarbarian.com/the-80-20-guide-to-json-stringify-in-javascript.html)