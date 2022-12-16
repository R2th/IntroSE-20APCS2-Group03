**Xin chào, ở 3 bài trước của series ["Một số mẹo vặt "hay ho" của ES6"](https://viblo.asia/s/mot-so-meo-vat-hay-ho-cua-es6-P856j7gR5Y3), mình đã chia sẻ 1 số tips/tricks nhỏ với ES6, hy vọng ít nhiều nó sẽ có ích với các bạn khi áp dụng vào thực tế. Hôm nay, xin mời các bạn theo dõi phần 4 của series này. Hãy cùng nhau xem thử có gì thú vị trong phần tiếp theo này nhé :wink:**

![](https://images.viblo.asia/b50e28f1-b8c7-40d5-a0bc-e2e8c64f0eed.png)

### 1. Generate 1 random string

Khi muốn tạo 1 chuỗi các ký tự ngẫu nhiên (vì mục đích, lý do bảo mật nào đó), thì không rõ các bạn đã và đang dùng thuật toán hay library nào, có thể là `cryptoJS` chẳng hạn. Nhưng theo mình có 1 cách đơn giản, mà mình đã áp dụng nhiều trong các project cá nhân từ trước đến nay và cảm thấy khá an toàn. Ví dụ dưới đây sẽ tạo 1 chuỗi ngẫu nhiên với 10 ký tự:

```javascript
Math.random().toString(36).substr(2, 10);
"y99yu80obg"
Math.random().toString(36).substr(2, 10);
"oo4a5967xj"
Math.random().toString(36).substr(2, 10);
"8bjf4jvod8"
Math.random().toString(36).substr(2, 10);
"ji8yx6k29j"
```

Thật sự đơn giản không nào :)

### 2. Check empty Object
Chắc hẳn hầu hết các bạn đã từng làm JS thì 96,69% đều biết đến function `isEmpty` của lodash, để kiếm tra xem 1 Object có bị rỗng hay không, Tuy nhiên, vì lý do nào đó nếu không dùng lodash thì chúng ta có những cách xử lý nào khác không, với ES6 hoặc ES5 chẳng hạn...

Với ES5: 

```javascript
const emptyObj = {};

function isEmpty(obj) {
  for(let prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

isEmpty(emptyObj) // true
```

Có vẻ khá phức tạp nhỉ!?! Vậy nếu dùng ES6 thì sao...

```javascript
const emptyObj = {};

Object.keys(emptyObj).length === 0 && emptyObj.constructor === Object
// true

// or shorter
Object.entries(emptyObj).length === 0
// true
```

Khá đơn giản phải không nào ;)

### 3. Convert Object to Array hoặc Array to Object

Trong khi làm việc, có những lúc cần convert một Object sang Array hoặc ngược lại, hãy cùng xem xét 1 vài trường hợp cụ thể áp dụng ES6 nhé.

Convert Array to Object với shallow array:

```javascript
const names = ['Nguyen', 'Van', 'Thi', 'Mau'];
const obj = {...names};
// or
const obj = Object.assign({}, names);
console.log(obj);
// {0: "Nguyen", 1: "Van", 2: "Thi", 3: "Mau"}
```

Convert Array to Object với deep array:

```javascript
const entries = [
  ['foo', 'bar'],
  ['baz', 42]
];

Object.fromEntries(entries)
// {foo: "bar", baz: 42}
```

Convert Object to Array:

```javascript
const obj = {"0":"Banana","1":"Orange","2":"Apple","3":"Mango"};
const convertArray = Object.entries(obj)

console.log(convertArray)

// 0: (2) ["0", "Banana"]
// 1: (2) ["1", "Orange"]
// 2: (2) ["2", "Apple"]
// 3: (2) ["3", "Mango"]
// length: 4
// __proto__: Array(0)
```

### 4. Find and replace value của object trong Array

Để tìm kiếm và thay thế các giá trị mong muốn của 1 hoặc nhiều object trong Array, ta hoàn toàn có thể tận dụng function `findIndex` để giúp chúng ta làm việc này 1 cách nhanh chóng, ví dụ:

```javascript
const item = {id: 2, name: 'abc'}
const items = [{id:1, name: 'ghi'}, {id:2, name: 'def'}, {id:3, name: 'mno'}];

const foundIndex = items.findIndex(x => x.id == item.id);
items[foundIndex] = item;
// {id: 2, name: "abc"}
```

Nếu với ES5, cũng hoàn toàn có thể được nhưng theo mình thì sẽ phức tạp hơn 1 chút với thêm 1 lệnh `if`: 

```javascript
items.forEach((element, index) => {
  if(element.id === item.id) {
    items[index] = item;
  }
});

// {id: 2, name: "abc"}
```

Trên đây là 1 bài chia sẻ ngắn về 1 số kiến thức hay ho, mẹo vặt của Javscript/ES6 mà mình lượm lặt được trong quá trình làm việc cũng như tham khảo ở nhiều nguồn học tập khác nhau.

Hy vọng nó sẽ giúp ích được các bạn ít nhiều cho công việc nhé. Xin cảm ơn và hẹn gặp lại!

Chào thân ái và quyết thắng! 🤠