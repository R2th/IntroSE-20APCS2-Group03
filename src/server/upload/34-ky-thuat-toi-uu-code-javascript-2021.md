#### Mở đầu
Gần đây mình có tìm hiểu những tips và tricks  javascript , mục đích để giảm những đoạn code không thật sự cần thiết cũng như giúp code Javascript rõ ràng và tối ưu hơn.

Hôm nay, mình sẽ chia sẻ với các bạn về 1 bài viết khá hữu ích về 34 kỹ thuật mà lập trình viên Javascript nên biết trong năm 2021.

Chúng ta cùng bắt đầu nhé :grinning:
#### 1. If với nhiều điều kiện
Bạn có thể lưu nhiều giá trị trong mảng và sau đó sử dụng phương thức Include.
```javascript:js
//longhand
if (x === 'abc' || x === 'def' || x === 'ghi' || x ==='jkl') {
    //logic
}

//shorthand
if (['abc', 'def', 'ghi', 'jkl'].includes(x)) {
   //logic
}
```
#### 2. If true … else

Với điều kiện if else đơn giản thì bạn có thể sử dụng các toán tử ternary để viết ngắn gọn
```rust:js
if (x > 100) {
   variable = true;
} else {
   variable = false;
}

// Shorthand
let variable = (x > 10) ? true : false;

//Hoặc
let variable = x > 10;

console.log(variable);
```
#### 3. Khai báo biến
Khi bạn muốn khai báo hai biến có giá trị chung hoặc kiểu chung, thì có thể viết ngắn gọn như sau.
```rust:js
//Longhand 
let variable1;
let variable2 = 1;

//Shorthand 
let variable1, variable2 = 1;
```

#### 4. Kiểm tra Null, Undefined, Empty 

Khi bạn tạo biến mới, và bạn muốn kiểm tra xem biến mà bạn đang tham chiếu đến, giá trị của nó có phải là empty hoặc undefined hay không.

JavaScript có một cách viết tắt  để thực hiện được chức năng này.

```rust:js
// Longhand
if (variable1 !== null || variable1 !== undefined || variable1 !== '') {
    let variable2 = variable1;
}
// Shorthand
let variable2 = variable1 || '';
```

#### 5. Kiểm tra giá trị Null và gán giá trị mặc định
```javascript:js
let variable1 = null, variable2 = variable1 || 'default value';

console.log("null check", variable2); // output là "default value"
```

#### 6. Kiểm tra giá trị Undefined và gán giá trị mặc định
```javascript:js
let variable1 = undefined, variable2 = variable1 || 'default value';

console.log("null check", variable2); // output là "default value"
```

#### 7. Gán giá trị cho nhiều biến
Khi bạn xử lý nhiều biến và muốn gán các giá trị khác nhau cho các biến khác nhau, kỹ thuật viết tắt này rất hữu ích.
```objectivec:js
//Longhand 
let variable1, variable2, variable3;
variable1 = 1;
variable2 = 2;
variable3 = 3;
//Shorthand 
let [variable1, variable2, variable3] = [1, 2, 3];
```

#### 8. Toán tử gán
Chúng ta sẽ xử lý rất nhiều toán tử số học trong khi lập trình. Và đây là một  kỹ thuật hữu ích để gán toán tử cho các biến JavaScript.
```objectivec:js
variable1 = variable1 + 1;
variable2 = variable2 - 1;
variable3 = variable3 * 10;

// Shorthand
variable1++;
variable2--;
variable3 *= 10;
```

#### 9. If Presence Shorthand
```objectivec:js
// Longhand
if (variable1 === true) or if (variable1 !== "") or if (variable1 !== null)

// Shorthand //Nó sẽ kiểm tra string empty,null và undefined
if (variable1)
```

Đây là một  cách viết tắt khá phổ biến.

**Nhưng cần lưu ý** 
Nếu variable1 có bất kỳ giá trị nào, nó sẽ vào logic sau vòng lặp if, nên toán tử này chủ yếu được sử dụng để kiểm tra null hoặc undefined.

#### 10. Toán tử AND (&&) cho nhiều điều kiện
Nếu bạn chỉ gọi một hàm nếu biến là true thì  bạn có thể sử dụng toán tử **&&**
```cpp:js
//Longhand 
if (variable1) {
 callMethod(); 
} 
//Shorthand 
variable1 && callMethod();
```

#### 11. Vòng lặp for shorthand

```rust:js
// Longhand
for (var i = 0; i < testData.length; i++)

// Shorthand
for (let i in dataTest) hoặc for (let i of testData)
```

#### 12. Comparison Returns
Bạn cũng có thể sử dụng phép so sánh trong câu lệnh return. 
```javascript:js
// Longhand
let test;
function checkReturn() {
    if (!(test === undefined)) {
        return test;
    } else {
        return callMe('test');
    }
}
var data = checkReturn();
console.log(data); //output test
function callMe(val) {
    console.log(val);
}

// Shorthand
function checkReturn() {
    return test || callMe('test');
}
```

#### 13. Arrow Function

Arrow Function là một tính năng mới được giới thiệu trong ES6. Nó giúp bạn tạo các hàm một cách gọn gàng hơn rất nhiều.
```markdown:js
//Longhand 
function add(a, b) { 
   return a + b; 
} 
//Shorthand 
const add = (a, b) => a + b;
```

#### 14. Short Function Calling
Chúng ta có thể sử dụng ternary operator để thực hiện chức năng này.

```javascript:js
// Longhand
function test1() {
  console.log('test1');
};
function test2() {
  console.log('test2');
};
var test3 = 1;
if (test3 == 1) {
  test1();
} else {
  test2();
}
// Shorthand
(test3 === 1? test1:test2)();
```

#### 15. Switch Shorthands
Bạn có thể lưu các điều kiện trong key-value objects và sử dụng dựa trên các điều kiện.
```rust:js
// Longhand
switch (data) {
  case 1:
    test1();
  break;

  case 2:
    test2();
  break;

  case 3:
    test();
  break;
  // And so on...
}

// Shorthand
var data = {
  1: test1,
  2: test2,
  3: test
};

data[something] && data[something]();
```

#### 16. Implicit Return 
Với việc sử dụng Arrow Function, chúng ta có thể trả về giá trị trực tiếp mà không cần phải viết câu lệnh return.

```markdown:js
//Longhand 
function add(a, b) { 
   return a + b; 
} 
//Shorthand 
const add = (a, b) => a + b;
```

#### 17. Lũy thừa cơ số thập phân

```rust:js
// Longhand
for (var i = 0; i < 100; i++) { ... }

// Shorthand
for (var i = 0; i < 1e2; i++) {
```

#### 18.  Default Parameter Values

ES6 cho phép đặt giá trị mặc định cho tham số khi khai báo hàm. 

```javascript:js
//Longhand
function add(variable1, variable2) {
  if (variable1 === undefined)
    variable1 = 1;
  if (variable2 === undefined)
    variable2 = 2;
  return variable1 + variable2;
}

//shorthand
add = (variable1 = 1, variable2 = 2) => (variable1 + variable2);
add() //output: 3
```

#### 19. Toán tử Spread 

```rust:js
//longhand
// joining arrays dùng concat
const data = [1, 2, 3];
const array1 = [4 ,5 , 6].concat(data);

//shorthand
// joining arrays
const data = [1, 2, 3];
const array1 = [4 ,5 , 6, ...data];
console.log(array1); // [ 4, 5, 6, 1, 2, 3]
```

**Clone array dùng spread**
```objectivec:js
//longhand

// cloning arrays
const array1 = [1, 2, 3];
const array2 = array1.slice()

//shorthand
// cloning arrays
const array1 = [1, 2, 3];
const array2 = [...array1];
```

#### 20. Template Literals

Thay vì sử dụng nhiều toán tử **+** để nối nhiều biến trong một string thì bạn có thể sử dụng Template Literals

```javascript:js
//longhand
const welcome = 'Hi ' + variable1 + ' ' + variable2 + '.'

//shorthand
const welcome = `Hi ${variable1} ${variable2}`;
```

#### 21. Multi-line String 
Khi bạn xử lý một chuỗi nhiều dòng trong code, bạn có thể thực hiện cách này:
```javascript:js
//longhand
const data = 'string text line 1\n' +
'string text line 2'

//shorthand
const data = `string text line 1
                           string text line 2`
```

#### 22. Gán thuộc tính Object 

```rust:js
let variable1 = 'a'; 
let variable2 = 'b';
//Longhand 
let obj = {variable1: variable1, variable2: variable2}; 

//Shorthand 
let obj = {variable1, variable2};
```

#### 23. Chuyển String thành Number
```rust:js
//Longhand 
let variable1 = parseInt('456'); 
let variable2 = parseFloat('456.9'); 

//Shorthand 
let variable1 = +'456'; 
let variable2 = +'456.9';
```

#### 24. Destructuring Assignment 
```javascript:js
//longhand
const variable1 = this.data.variable1;
const variable2 = this.data.variable2;
const variable2 = this.data.variable3;

//shorthand
const { variable1, variable2, variable3 } = this.data;
```
#### 25 Array.find
Khi bạn có một mảng các đối tượng và bạn muốn tìm object cụ thể theo thuộc tính object thì có thể sử dụng phương thức find()
```javascript:js
const data = [{
        type: 'test1',
        name: 'abc'
    },
    {
        type: 'test2',
        name: 'cde'
    },
    {
        type: 'test1',
        name: 'fgh'
    },
]
function findtest1(name) {
    for (let i = 0; i < data.length; ++i) {
        if (data[i].type === 'test1' && data[i].name === name) {
            return data[i];
        }
    }
}
//Shorthand
filteredData = data.find(data => data.type === 'test1' && data.name === 'fgh');
console.log(filteredData); // { type: 'test1', name: 'fgh' }
```

#### 26 Điều kiện Lookup 
Ví dụ, nếu bạn muốn kiểm tra 1 biến type và dựa trên biến type sẽ gọi các method khác nhau.

Bạn có thể sử dụng nhiều `else if` hoặc sử dụng `switch`, nhưng có một cách ngắn gọn khác để thực hiện việc này

```javascript:js
// Longhand
if (type === 'test1') {
  test1();
}
else if (type === 'test2') {
  test2();
}
else if (type === 'test3') {
  test3();
}
else if (type === 'test4') {
  test4();
} else {
  throw new Error('Invalid value ' + type);
}

// Shorthand
var types = {
  test1: test1,
  test2: test2,
  test3: test3,
  test4: test4
};

var func = types[type];
(!func) && throw new Error('Invalid value ' + type); func();
```

#### 27. Bitwise IndexOf

Hàm `indexOf()` được sử dụng để truy xuất vị trí của mục bạn đang tìm kiếm trong 1 mảng. Nếu mục không được tìm thấy sẽ trả về giá trị -1.

Và trong JavaScript, 0 được coi là `falsy`, còn các số lớn hơn hoặc nhỏ hơn 0 được coi là `truthy`

Toán tử bitwise (~) sẽ trả về giá trị `truthy` cho bất kỳ giá trị nào ngoại trừ -1
```javascript:js

//longhand
if(arr.indexOf(item) > -1) { // item found 
}
if(arr.indexOf(item) === -1) { // item not found
}

//shorthand
if(~arr.indexOf(item)) { // item found
}
if(!~arr.indexOf(item)) { // item not found
}
```
#### 28. Object.entries()

Tính năng này giúp chuyển đổi object thành một array object.

```javascript:js
const data = { test1: 'abc', test2: 'cde', test3: 'efg' };
const array = Object.entries(data);
console.log(array);

Output:
   [ 
     [ 'test1', 'abc' ],
     [ 'test2', 'cde' ],
     [ 'test3', 'efg' ]
   ]
```

#### 29. Object.entries()

Đây cũng là một tính năng mới được giới thiệu trong ES8 thực hiện chức năng tương tự như Object.entries (), nhưng không có phần key:
```javascript:js
const data = { test1: 'abc', test2: 'cde' };
const array = Object.values(data);
console.log(array);

/** Output:
[ 'abc', 'cde']
**/
```
#### 30. Double Bitwise
Lưu ý là phương pháp này chỉ hoạt động đối với số nguyên 32 bit

```go:js
// Longhand
Math.floor(1.9) === 1 // true

// Shorthand
~~1.9 === 1 // true
```
#### 31. Lặp lại một chuỗi nhiều lần

```javascript:js
//longhand 
let test = ''; 
for(let i = 0; i < 5; i ++) { 
  test += 'test '; 
} 
console.log(str); // test test test test test 

//shorthand 
'test '.repeat(5);
```

#### 32. Tìm số max và min trong array
```shell:js
const array = [1, 2, 3]; 
Math.max(…array); // 3
Math.min(…array); // 1
```
#### 33. Lấy character từ string

```go:js
let str = 'abc';
//Longhand 
str.charAt(2); // c

//Shorthand 
Lưu ý: Nếu bạn biết index của mảng thì có thể sử dụng trực tiếp index được chèn ký tự.
Nếu index sai nó sẽ throw undefined
str[2]; // c
```
####  34. Power Shorthand
Cách viết tắt cho hàm lũy thừa.
```objectivec:js
//longhand
Math.pow(2,3); // 8

//shorthand
2**3 // 8
```

#### Mọi người có thể đọc bài gốc ở đây
https://javascript.plainenglish.io/34-javascript-optimization-techniques-to-know-in-2021-d561afdf73c3