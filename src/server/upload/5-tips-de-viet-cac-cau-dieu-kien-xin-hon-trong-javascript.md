## 1. Sử dụng Array.includes cho nhiều điều kiện
- [Array.includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

Ta có ví dụ như sau:

```javascript
// condition
function test(fruit) {
  if (fruit == 'apple' || fruit == 'strawberry') {
    console.log('red');
  }
}
```
Nhìn có vẻ ổn ổn rồi đó, mình thì vẫn hay viết như vậy mà =)) Tuy nhiên, điều gì sẽ xảy ra nếu có nhiều trái cây màu đỏ hơn, ví dụ thêm `cherry` và `cranberries` ? Chúng ta sẽ mở rộng điều kiện if với việc thêm 2 cái  `||` ?

Ở trong php, mình sẽ giải quyết vấn đề bằng cách sử dụng `in_array()`, và js cũng tương tự như vậy. Chúng ta có thể viết lại điều kiện ở trên bằng cách sử dụng `Array.includes`.

```js
function test(fruit) {
  // extract conditions to array
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  if (redFruits.includes(fruit)) {
    console.log('red');
  }
}
```

**Chốt: cho hết các điều kiện vào 1 mảng.**

## 2. Giảm Nesting, Return sớm cho bớt đau khổ
Hãy mở rộng ví dụ trước để bao gồm hai điều kiện nữa:
- nếu không có trái cây đầu vào, đẩy ra lỗi
- nếu có thì in số lượng quả nếu vượt quá 10

```js
// version 1
function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  // condition 1: fruit must has value
  if (fruit) {
    // condition 2: must be red
    if (redFruits.includes(fruit)) {
      console.log('red');

      // condition 3: must be big quantity
      if (quantity > 10) {
        console.log('big quantity');
      }
    }
  } else {
    throw new Error('No fruit!');
  }
}

// test results
test(null); // error: No fruits
test('apple'); // print: red
test('apple', 20); // print: red, big quantity
```

Nhìn vào đoạn code trên, chúng ta có:
- 1 câu if / else lọc ra điều kiện không hợp lệ 
- 3 mức `nested if` lồng nhau (condition 1, 2 & 3)

Một quy tắc chung mà chúng ta nên tuân theo là return kết quả sớm khi tìm thấy điều kiện không hợp lệ. Chúng ta có thể sửa lại 1 chút thành:

```js
/* return early when invalid conditions found */
// version 2
function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  // condition 1: throw error early
  if (!fruit) throw new Error('No fruit!');

  // condition 2: must be red
  if (redFruits.includes(fruit)) {
    console.log('red');

    // condition 3: must be big quantity
    if (quantity > 10) {
      console.log('big quantity');
    }
  }
}
```

Bằng cách này, chúng ta có một mức độ ít hơn của câu lệnh lồng nhau. Phong cách code này khá tốt, đặc biệt là khi bạn có câu lệnh if dài (hãy tưởng tượng bạn cần cuộn xuống phía dưới cùng để biết được rằng hết if này sẽ còn hay không còn else nữa).

Chúng ta có thể giảm thêm việc sử dụng `nested if`, bằng cách đảo ngược các điều kiện và return sớm. Nhìn vào `condition 2` dưới đây để xem chúng ta sẽ làm điều đó như thế nào:

```js
/* return early when invalid conditions found */
//version 3
function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  if (!fruit) throw new Error('No fruit!'); // condition 1: throw error early
  if (!redFruits.includes(fruit)) return; // condition 2: stop when fruit is not red

  console.log('red');

  // condition 3: must be big quantity
  if (quantity > 10) {
    console.log('big quantity');
  }
}
```

Bằng cách đảo ngược các điều kiện của `condition 2`, code của chúng ta hiện không có câu lệnh lồng nhau. Kỹ thuật này rất hữu ích khi chúng ta có logic dài và muốn dừng quá trình tiếp theo khi một điều kiện không được đáp ứng.

Tuy nhiên, không nên quá cứng nhắc rằng phải loại bỏ if lồng nhau bằng được, return bằng được khi điều kiện không thỏa mãn. Trong trường hợp này, nên dừng lại ở phiên bản `version 2`, bởi vì:
- Code vẫn ngắn gọn, dễ hiểu và hiển nhiên là đọc rất thuận miệng =))
- Việc đảo ngược các điều kiện dễ phát sinh các vấn đề nếu là điều kiện phức tạp, tăng `cognitive load` ([cognitive load](https://www.google.com/search?q=cognitive+load&oq=cognitive+load&aqs=chrome..69i57j69i60&sourceid=chrome&ie=UTF-8))

**Chốt: luôn luôn nhắm đến việc giảm việc sử dụng if lồng nhau và return sớm nhưng đừng lạm dụng nó.**

Tham khảo thêm về vấn đề này tại:
- [Avoid Else, Return Early](http://blog.timoxley.com/post/47041269194/avoid-else-return-early)
- [StackOverflow discussion on if/else coding style](https://softwareengineering.stackexchange.com/questions/18454/should-i-return-from-a-function-early-or-use-an-if-statement)

## 3. Sử dụng tham số mặc định (Default function parameters) và Destructuring

- [Default function parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
- [Destructuring Assignments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

Khi chúng ta muốn kiểm tra giá trị xem có `null` hay `undefined` không và gán giá trị mặc định cho nó:

```js
function test(fruit, quantity) {
  if (!fruit) return;
  const q = quantity || 1; // if quantity not provided, default to one

  console.log(`We have ${q} ${fruit}!`);
}

//test results
test('banana'); // We have 1 banana!
test('apple', 2); // We have 2 apple!
```

Trong thực tế, chúng ta có thể loại bỏ biến `q` bằng cách gán các tham số mặc định:

```js
function test(fruit, quantity = 1) { // if quantity not provided, default to one
  if (!fruit) return;
  console.log(`We have ${quantity} ${fruit}!`);
}

//test results
test('banana'); // We have 1 banana!
test('apple', 2); // We have 2 apple!
```

Mỗi tham số đều có thể có tham số mặc định riêng. Ví dụ: chúng ta cũng có thể gán giá trị mặc định cho trái cây: `test(fruit = 'unknown', quantity = 1)`

Nếu trái cây của chúng ta là một object thì sao? Chúng ta có thể gán tham số mặc định?
```js
function test(fruit) { 
  // printing fruit name if value provided
  if (fruit && fruit.name)  {
    console.log (fruit.name);
  } else {
    console.log('unknown');
  }
}

//test results
test(undefined); // unknown
test({ }); // unknown
test({ name: 'apple', color: 'red' }); // apple
```

Với ví dụ trên, chúng ta muốn in tên trái cây nếu có hoặc sẽ in `không xác định`. Chúng ta có thể tránh việc kiểm tra điều kiện `fruit && fruit.name` với tham số mặc định & destructuring assignments.

```js
// destructing - get name property only
// assign default empty object {}
function test({name} = {}) {
  console.log (name || 'unknown');
}

//test results
test(undefined); // unknown
test({ }); // unknown
test({ name: 'apple', color: 'red' }); // apple
```

Vì chỉ cần thuộc tính `name` từ `fruit`, chúng ta có thể destructing tham số bằng cách sử dụng `{name}`, sau đó có thể sử dụng `name` làm biến trong code luôn thay vì `fruit.name`.

Chúng ta cũng gán đối tượng trống `{}` làm giá trị mặc định. Nếu không làm như vậy, bạn sẽ gặp lỗi khi thực hiện `test(undefined)` - `Cannot destructure property name of 'undefined' or 'null'`. bởi vì không có property `name` trong `undefined`.

Chúng ta có thể sử dụng thư viện bên thứ 3, với `Lodash get` ([Lodash](https://lodash.com/docs/4.17.11#get)) như thế này:
```js
// Include lodash library, you will get _
function test(fruit) {
  console.log(__.get(fruit, 'name', 'unknown');
  // get property name, if not available, assign default value 'unknown'
}

//test results
test(undefined); // unknown
test({ }); // unknown
test({ name: 'apple', color: 'red' }); // apple
```

**Chốt: luôn gán giá trị mặc định cho tham số.**

## 4. Sử dụng Map / Object thay vì dùng Switch Statement

Hãy xem ví dụ dưới đây, chúng ta muốn in ra các trái cây dựa trên màu sắc:

```js
function test(color) {
  // use switch case to find fruits in color
  switch (color) {
    case 'red':
      return ['apple', 'strawberry'];
    case 'yellow':
      return ['banana', 'pineapple'];
    case 'purple':
      return ['grape', 'plum'];
    default:
      return [];
  }
}

//test results
test(null); // []
test('yellow'); // ['banana', 'pineapple']
```

Cách giải quyết vấn đề như trên thì không có gì phải bàn về việc đúng sai, nhưng nó dài. Vậy thì sửa lại một chút như thế này:

```js
// use object literal to find fruits in color
  const fruitColor = {
    red: ['apple', 'strawberry'],
    yellow: ['banana', 'pineapple'],
    purple: ['grape', 'plum']
  };

function test(color) {
  return fruitColor[color] || [];
}
```

Ngoài ra, bạn có thể sử dụng `Map()` để đạt được kết quả tương tự:

```js
// use Map to find fruits in color
  const fruitColor = new Map()
    .set('red', ['apple', 'strawberry'])
    .set('yellow', ['banana', 'pineapple'])
    .set('purple', ['grape', 'plum']);

function test(color) {
  return fruitColor.get(color) || [];
}
```

- [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- Phải chăng 2 cách dưới đã khiến cho chúng ta không bao giờ nghĩ đến việc dùng `switch` ?

Đối với ví dụ trên, chúng ta thực sự có thể cấu trúc lại code của mình để đạt được kết quả tương tự với `Array.filter`.

```js
const fruits = [
    { name: 'apple', color: 'red' }, 
    { name: 'strawberry', color: 'red' }, 
    { name: 'banana', color: 'yellow' }, 
    { name: 'pineapple', color: 'yellow' }, 
    { name: 'grape', color: 'purple' }, 
    { name: 'plum', color: 'purple' }
];

function test(color) {
  // use Array filter to find fruits in color

  return fruits.filter(f => f.color == color);
}
```


**Chốt: Thay vì dùng switch, hãy dùng Map() hoặc gắn các điều kiện thành Object.**

## 5. Sử dụng Array.every & Array.some

Chúng ta muốn kiểm tra xem tất cả các loại trái cây có màu đỏ hay không?:

```js
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
  ];

function test() {
  let isAllRed = true;

  // condition: all fruits must be red
  for (let f of fruits) {
    if (!isAllRed) break;
    isAllRed = (f.color == 'red');
  }

  console.log(isAllRed); // false
}
```

Chúng ta có thể dùn `Array.every` để làm điều này gọn gàng hơn:

```js
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
  ];

function test() {
  // condition: short way, all fruits must be red
  const isAllRed = fruits.every(f => f.color == 'red');

  console.log(isAllRed); // false
}
```

Theo cách tương tự, nếu chúng ta muốn kiểm tra xem có bất kỳ quả nào có màu đỏ hay không, chúng ta có thể sử dụng `Array.some` để đạt được kết quả đó trong... 1 dòng:

```js
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
];

function test() {
  // condition: if any fruit is red
  const isAnyRed = fruits.some(f => f.color == 'red');

  console.log(isAnyRed); // true
}
```

**Chốt: dùng Array.every & Array.some (okay, chả biết chốt thế nào)**

## Kết luận

- Kiến thức không tự sinh ra cũng không tự mất đi, bài viết này được hoàn thành từ bài viết gốc [5 Tips to Write Better Conditionals in JavaScript](https://scotch.io/bar-talk/5-tips-to-write-better-conditionals-in-javascript) và cộng với một ít chém gió của mình.
- Ăn quả nhớ kẻ trồng cây, lấy bài nhớ ghi nguồn.