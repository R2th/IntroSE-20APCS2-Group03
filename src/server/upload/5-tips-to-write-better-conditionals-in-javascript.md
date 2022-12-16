### 1. Use Array.includes for Multiple Criteria
```Javascript
// condition
function test(fruit) {
    if (fruit == 'apple' || fruit == 'strawberry') {
        console.log('red');
    }
}
```
Điều gì sẽ xảy ra nếu có nhiều trái cây màu đỏ hơn, chúng ta sẽ phải so sánh rất nhiều mà không phải với 2 loại nữa. Hãy viết tối ưu như bên dưới:
```Javascript
function test(fruit) {
    // extract conditions to array
    const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

    if (redFruits.includes(fruit)) {
        console.log('red');
    }
}
```
### 2. Less Nesting, Return Early
```Javascript
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
Hãy return sớm nếu điều kiện không hợp lệ:
```Javascript
/_ return early when invalid conditions found _/

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
Bằng cách này, chúng ta có thể giảm thiểu câu lệnh lồng nhau. Kiểu viết này đặc biệt tối ưu, dễ nhìn, dễ hiểu khi bạn có câu lệnh if dài (hãy tưởng tượng bạn cần cuộn xuống phía dưới cùng để biết có một câu lệnh khác hay không).

Và chúng ta có thể giảm hơn nữa các câu lện lồng bằng cách đảo ngược các điều kiện và return sớm. Nhìn vào điều kiện 2 dưới đây để xem nhé:
```Javascript
/_ return early when invalid conditions found _/

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
### 3. Use Default Function Parameters and Destructuring
```Javascript
function test(fruit, quantity) {
  if (!fruit) return;
  const q = quantity || 1; // if quantity not provided, default to 1

  console.log(`We have ${q} ${fruit}!`);
}

//test results
test('banana'); // We have 1 banana!
test('apple', 2); // We have 2 apple!
```
Thực tế chúng ta có thể loại bỏ biến `q` bằng việc sử dụng các tham số mặc định:
```Javascript
function test(fruit, quantity = 1) { // if quantity not provided, default to one
  if (!fruit) return;
  console.log(`We have ${quantity} ${fruit}!`);
}

//test results
test('banana'); // We have 1 banana!
test('apple', 2); // We have 2 apple!
```
**Nếu tham số đầu vào là *object*:**
```Javascript
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
Viết lại như sau:
```Javascript
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
### 4. Object Literal than Switch Statement
```Javascript
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
Viết lại như này nè:
```Javascript
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
### 5. Use Array.every & Array.some for All / Partial Criteria
```Javascipt
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
Chúng ta có thể giảm thiểu số lượng dòng code mà vẫn sẽ dễ hiểu như sau:

***Array.every***
```Javascript
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
***Array.some***
```Javascript
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
Cảm ơn các bạn đã đọc bài!!!
Hy vọng bài viết hữu dụng :grinning: