### Mở đầu
Hôm nay mình sẽ giới thiệu với các bạn một số những tips và tricks để giúp bạn code Javascript một cách hiệu quả cũng như "ngầu hơn" giúp tăng năng suất và hiệu quả công việc. :D Bắt đầu nhé.


### 1.  Loại bỏ các falsy values trong 1 mảng. 

Falsy values trong Javascript bao gồm có 0, false, NaN, undefined, null, '' (xâu rỗng).

Ngược lại với nó thì ta có khái niệm truthy values. Trong JavaScript, truthy là giá trị được hiểu là true trong ngữ cảnh Boolean. Tất cả mọi giá trị đều là truthy, trừ các falsy values kể trên. 

Giả sử ta có 1 mảng ban đầu gồm có các falsy values và truthy values, ta muốn loại bỏ toàn bộ các falsy values chỉ giữ lại các truthy values thôi. Có rất nhiều cách để thực hiện điều này, hôm nay mình muốn giới thiệu đến các bạn 1 cách làm đơn giản mà hiệu quả nhất đó là sử dụng filter kết hợp với Boolean.

Ở đây mình có một array bao gồm các phần tử truethy và falsy
```js
const array = [0, "sunday", 1, false]
```
Giờ mình sẽ lấy các phần tử truthly trong array

```js
const newArray = array.filter(Boolean)
console.log(newArray) //["sunday", 1]
```

Wow thật vi diệu, để mình giải thích:
```
array.filter(Boolean)
```

nó sẽ tương đương với đoạn này 

```js
array.filter( function(ele) { return Boolean(ele)})
```

 Hàm `Boolean(ele)` sẽ trả về true hay false tùy vào tham số đầu vào
 
 Như vậy `array.filter(Boolean)` sẽ trả ra các phần từ là truthly .
 
###  2. Sử dụng toán tử && và || 
 
 && sẽ trả ra phần tử đúng thứ 2 nếu cả hai phần tử đúng và trả ra phần từ sai đầu tiên nếu cả hai phần tử đều sai, trả ra phần tử falsy nếu có 1 phần tử trulthy và falsy.
 
 Ví dụ: 
 
```js
"sunday" && "monday" // "monday"
"monday" && "sunday" // "sunday"
false && "sunday" // false
"sun" && 0 // 0
0 && false // 0
```

Chúng ta  có thể áp dụng điều này vào câu lệnh điều kiện thay IF

Ví dụ ta có đoạn code sau:

MÌnh muốn lấy tên của một đối tượng user 

```js
const user =  {
 name: "Linh"
}
// Nếu user tồn tại sẽ lấy name 
// Dùng if
if (user) {
    return user.name
}

// Thay vì dùng if
const name = user && user.name
```

&& mình thấy trong reacjs sử dụng khá nhiều để tránh gặp đối không mong muốn khi lấy một giá trị của đối tượng rỗng.

Còn toán tử || sẽ ngược so với toán tử && 

|| sẽ lấy phần tử sai thứ 2 nếu cả hai cùng sai, và lấy phần tử đúng đầu tiên nếu cả hai cùng đúng .

### 3. Gán giá trị cho nhiều biến

Ta có đoạn hash sau 

```js
const data = {name: "linh", age: 22}
```

Nếu muốn lấy nhanh name, age ta có thể dùng :

```js
const {name, age} = data
```

Nếu muốn assign nhanh các biến ta có thể dùng mảng 

```js
//Longhand 
let test1, test2, test3;
test1 = 1;
test2 = 2;
test3 = 3;

//Shorthand 
let [test1, test2, test3] = [1, 2, 3];
```

### 4. Every and some.

**Every** function trả về giá trị boolean. Nếu tất cả phần tử trong mảng thỏa mãn điều kiện thì sẽ trả về true. Bên cạnh đó, some function chỉ kiểm trả nếu tồn tại ít nhất một phần tử trong mảng thỏa điều kiện thì trả về true.

```js
const numbers = [6, 7, 8, 9]
console.log(numbers.every(number => number > 5)) // true
```
Array trên trả về true vì tất cả những phần tử trong Array đều thoả mãn điều kiện (> 5). Nhưng chỉ cần 1 phần tử trong mảng không thoả mãn điều kiện thôi thì lập tức Array này sẽ trả về false mà không cần quan tâm đến các phần tử khác.
Ví dụ:

```js
const numbers = [1, 6, 7, 8, 9]
console.log(numbers.every(number => number > 5)) // false
```

**Some** Hàm này hiểu theo cách đơn giản và dễ hiểu nhất như sau. Lặp tất cả các phần tử trong một Array, chỉ phần 1 phần tử thoả mãn điều kiện thì Array này sẽ trả về true. Nhớ nhé, chỉ cần 1 phần tử thoả mãn điều kiện thôi sẽ lập tức trả về true luôn mà không cần quan tâm tới các phần tử khác. :)

```js
const numbers = [15, 2, 3, 4, 5]
console.log(numbers.some(number => number > 10)) // true
```

Array trên trả về true vì có “ít nhất” một phần tử (12) thoả mãn điều kiện (> 10). Do đó lập tức trả về true luôn mà không cần quan tâm đến các phần tử khác trong mảng.

Còn nếu như tất cả các phần tử trong mảng đều không thoả mãn điều kiện thì tất nhiên Array đó trả về false rồi.

```js
const numbers = [1, 2, 3, 4, 5]
console.log(numbers.some(number => number > 10)) // false
```

### 5.Short Function Calling

Để giảm thiểu if else chúng ta có thể dùng toán tử ba ngôi

```js
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
### 6. Switch Shorthands

Chúng ta có thể lưu các điều kiện trong các đối tượng key-value và có thể được sử dụng dựa trên các điều kiện.

```js
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

### 7. Array.find

Khi chúng ta có một mảng các object và chúng ta muốn tìm đối tượng cụ thể dựa trên các thuộc tính của đối tượng thì  **find** method thực sự hữu ích.

```js
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

Trên đây là một số cách giúp bạn code ngắn gọn, thanh lịch hơn, hy vọng bài viết này các bạn có thể áp dụng một số các trên để trở nên chuyên nghiệp hơn nha. Cuối tuần vui vẻ nha !!!!