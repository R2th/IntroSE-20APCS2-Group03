Khi làm việc với JavaScript, chúng ta thường gặp nhiều câu lệnh điều kiện, sau đây là 5 cách giúp bạn clean code hơn mà mình tìm hiểu được. Let's go ! :point_down:
### 1. Dùng Array.includes với nhiều biểu thức điều kiện
Hãy xem một ví dụ sau:
```
function test(fruit) {
    if (fruit === 'apple' || fruit === 'strawberry' ) {
        console.log('red');
    }
}
```
Thoạt nhìn, ví dụ trên trông có vẻ tốt. Nhưng nếu bạn cần check thật nhiều fruit thì lúc ấy code của bạn sẽ thật dài dòng với thật nhiều ``||``.
Khi đấy, bạn có thể dùng Array.includes dưới biểu thức điều kiện để check chúng.
```
function test(fruit) {
       const redFruit = ['Apple', 'strawberry', 'cherry', 'cranberries'];
       
       if (redFruit.includes(fruit)) {
           console.log('red');
       }
}
```
Chúng ta đã gom ``redFruit`` thành một mảng để có thể sử dụng ``includes``. Điều này làm cho code của bạn gọn gàng hơn nhiều đúng không nào. :laughing:
### 2. Nội dung điều kiện nào ít hơn thì nên trả về trước
Mở rộng ví dụ trên, chúng ta có 2 điều kiện

*  Nếu ``fruit`` không tồn tại thì ``quẳng`` cho nó cái lỗi :stuck_out_tongue_winking_eye:
*  Nếu ``redFruit`` chứa ``fruit`` và ``quantity`` lớn hơn 10

Cùng xem ví dụ nào
```
function test(fruit, quantity) {
      const redFruit = ['Apple', 'strawberry', 'cherry', 'cranberries'];
      if (fruit) {
          if (redFruit.includes(fruit)) {
              console.log('red');
          }
          
          if (quantity > 10) {
              console.log('big quantity');
          }
      } else {
          throw new Error('No fruit');
      }
}

test(null) // error: No Fruit
test('apple') // print: red
test('apple', 20) // print: red, big quantity
```
Một nguyên tắc chung mà ban nên tuân theo, đó là những gì không hợp lệ thì chúng ta nên handle chúng trước và ``return`` nếu cần thiết.
Chúng ta có thể làm gọn code trên bằng cách đảo chiều các câu điều kiện, Hãy thử xem nhé
```
function test(fruit, quantity) {
    const redFruit = ['Apple', 'strawberry', 'cherry', 'cranberries'];
    if (!fruit) throw new Error('No fruit');
    
    if (!redFruit.includes(fruit)) return;
    
    console.log('red');
    
    if (quantity > 10) {
        console.log('big quantity')
    }
}
```
Với cách này code của bạn sẽ ngắn gọn hơn, và ít lồng nhau trong câu điều kiện ``if``, và việc đảo chiều điều kiện giúp ban tư duy logic tốt hơn.
### 3. Dùng tham số mặc định cho Function và Destructuring
Với ví dụ dưới, chúng ta luôn kiểm tra một tham số truyền vào có ``null`` / ``underfined`` và gán giá trị mặc định cho nó khi làm việc trong JavaScript
```
function test(fruit, quantity) {
    if (!fruit) return;
    const q = quantity || 1;
    
    console.log(`We have ${q} ${fruit}`);
}

test('banana') // We have 1 banana;
test('apple', 2) // We have 2 apple;
```
Trong thực tế chúng có thể 'tiết kiệm' một biến ``q`` bằng cách gán giá trị mặc định cho tham số `` quantity``
```
function test(fruit, quantity = 1) {
    if (!fruit) return;
    
    console.log(`We have ${q} ${fruit}`);
}

test('banana') // We have 1 banana;
test('apple', 2) // We have 2 apple;
```
Vậy nếu ``fruit`` là một ``Object`` thì sao, liệu chúng ta có thể gán giá trị mặc định cho chúng ?
```
function test(fruit) {
       if (fruit && fruit.name) {
           console.log(fruit.name);
       } else {
           console.log('unknown');
       }
}

test(undefined); // unknown
test({ }); // unknown
test({ name: 'apple', color: 'red' }); // apple
```
Nhìn vào ví dụ trên, chúng ta sẽ phải check tồn tại của ``fruit && fruit.name``. Nhưng sử dung destructuring và gán giá trị mặc định cho nó thì sẽ không phải check như vậy nữa
```
function test({name} = {}) {
    console.log(name || 'unknown);
}
```
### 4. Dùng Array.every và Array.some cho biểu thức điều kiện từng phần hoặc toàn phần
Trong tips cuối cùng này, chúng ta cùng quay lại với method của Array. Ví dụ sau đây, mình muốn check tất cả fruit có cùng một màu

```
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
  ];

function test() {
    let isAllRed = true;
    for (let f of fruits) {
        if (!isAllRed) break;
        isAllRed = (f.color == 'red')
    }
    
    console.log(isAllRed)
}
```
Bạn có thấy code quá dài dòng ko, chúng ta có thể giảm số lượng dòng code bằng cách dùng``Array.every``

```
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
 ];
  
function test() {
    const isAllRed = fruits.every(f => f.color === 'red');
    
    console.log(isAllRed)
}
```

Gọn gàng hơn nhiều nhỉ :laughing: . Tương tự, chúng ta cũng có thể kiểm tra tồn tại ít nhất một ``fruit`` có màu ``red`` với ``Array.some``
```
const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
];
function test() {
    const isAnyRed = fruits.some(f => f.color === 'red');
    
    console.log(isAnyRed); // true
}
```
Trên đây 4 cách để các bạn có thể clean code của mình hơn khi dùng các câu lệnh điều kiện trong JavaScript. Cảm ơn mọi người đã theo dõi. :heart_eyes:

Bài viết có tham khảo tại: [Tips JavaScript](https://scotch.io/bar-talk/5-tips-to-write-better-conditionals-in-javascript?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more#toc-1-use-array-includes-for-multiple-criteria)