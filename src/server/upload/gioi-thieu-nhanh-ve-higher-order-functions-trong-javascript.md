# Higher-Order Functions
Một function nhận vào và/hoặc trả về một function khác thì được gọi là **highter-order function**

Với function trong JavaScript bạn có thể làm:

* Lưu trữ chúng dưới dạng biến
* Sử dụng chúng trong array
* chỉ định chúng như object properties (methods)
* Chuyên chúng như các arguments
* Return chúng từ các function khác 

Như mọi loại kiểu dữ liệu khác thôi :v

# Functions Operate trên các loại Data

### String
```Javascript
sayHi = (name) => `Hi, ${name}!`;
result = sayHi('User');
console.log(result); // 'Hi, User!'
```

### Numbers

```Javascript
double = (x) => x * 2;
result = double(4);
console.log(result); // 8
```

### Booleans 
```Javascript
getClearance = (allowed) => allowed ?
  'Access granted' :
  'Access denied';
result1 = getClearance(true);
result2 = getClearance(false);
console.log(result1); // 'Access granted'
console.log(result2); // 'Access denied'

### Objects
```
```Javascript
getFirstName = (obj) => obj.firstName;
result = getFirstName({
  firstName: 'Yazeed'
});
console.log(result); // 'Yazeed'
```

### Arrays
```Javascript
len = (array) => array.length;
result = len([1, 2, 3]);
console.log(result); // 3
```

Đây là 5 loại kiểu dữ liệu chính [First-class citizen
](https://en.wikipedia.org/wiki/First-class_citizen) trong mỗi ngôn ngữ.


Cái gì đã giúp chúng vào top đầu? Bạn có thể di chuyển, lưu trữ chúng trong biến, mảng sử dụng chúng làm đâu vào để tính toán.

# Và Functions cũng có thể là dữ liệu
![one](https://images.viblo.asia/53973145-e6df-4c6b-9ab7-6d2b17aeafe1.png)
## Dùng function như Arguments

```javascript
isEven = (num) => num % 2 === 0;
result = [1, 2, 3, 4].filter(isEven);
console.log(result); // [2, 4]
```

Xem cách **filter** sử dụng **isEven** để quyết định xem sẽ giữ số nào. **isEven** là một function và cũng là một parameter cho *một function khác*.

Nó được gọi bởi **filter** cho mỗi số và trả về true hoặc false đế quyết đinh xem số đó có được giữ hay vào mảng mới hay không.

## Returning Functions

```Javascript
add = (x) => (y) => x + y;
```

**add** yêu cầu 2 parameters nhưng không phải cùng 1 lúc. nó chỉ yêu cầu **x**, và return về một function, function này sẽ yêu cầu **y**.

Điều này chỉ khả thi vì JavaScript cho phép function return value (như strings, numbersm booleans,..).

Tất nhiên bạn vẫn có thể cung cấp cả x và y cùng lúc khi sử dụng cách gọi kép cả 2 function

``` JavaScript
result = add(10)(20);
console.log(result); // 30
```

Hoặc **x** trước và **y** sau:

```JavaScript
add10 = add(10);
result = add10(20);
console.log(result); // 30
```

Giờ chúng ta cùng xem lại ví dụ cuối cùng nhé. **add10** là kết quả của việc gọi **add** với một parameter. Thử logging nó trong console nào:

![two](https://images.viblo.asia/236344d6-2944-40c2-aae9-26459883aef5.png)

**add10** lấy **y** và trả về **x +y**. Sau khi bạn cung cấp **y** nó sẽ  tính toán và trả về kết quả cuối cho bạn.

![three](https://images.viblo.asia/ac764ee0-202e-4ab8-9fe9-093d371f5a41.png)

# Khả năng tái sử dụng cao



Có lẽ lợi ích tuyện vời nhât của  HOFs là tái sử dụng. Nếu không có HOF các methods của Array *map, filter và reduce* sẽ không tồn tại!
Đây là một list users. Chúng ta sẽ làm một vài tính toán với chúng.

```Javascript
users = [{
  name: 'Yazeed',
  age: 25
}, {
  name: 'Sam',
  age: 30
}, {
  name: 'Bill',
  age: 20
}];
```

## Map

Nếu không có HOF chúng ta sẽ phải lặp kiểu như này:

```Javascript
getName = (user) => user.name;
usernames = [];
for (let i = 0; i < users.length; i++) {
  const name = getName(users[i]);
  usernames.push(name);
}
console.log(usernames);
// ["Yazeed", "Sam", "Bill"]
```

Làm bài trên với Map nào:

```Javascript
usernames = users.map(getName);
console.log(usernames);
// ["Yazeed", "Sam", "Bill"]
```

## Filter

Khi không HOF chúng ta có thể làm kiểu này:

```Javascript
startsWithB = (string) => string
  .toLowerCase()
  .startsWith('b');
namesStartingWithB = [];
for (let i = 0; i < users.length; i++) {
  if (startsWithB(users[i].name)) {
    namesStartingWithB.push(users[i]);
  }
}
console.log(namesStartingWithB);
// [{ "name": "Bill", "age": 20 }]
```

và khi có HOF và filter

```Javascript
namesStartingWithB = users
  .filter((user) => startsWithB(user.name));
console.log(namesStartingWithB);
// [{ "name": "Bill", "age": 20 }]
```

## Reduce

Chúng ta sẽ không thể có Reduce nếu không có HOF

```Javascript
total = 0;
for (let i = 0; i < users.length; i++) {
  total += users[i].age;
}
console.log(total);
// 75
```

Làm lại với reduce nào

```Javascript
totalAge = users
  .reduce((total, user) => user.age + total, 0);
console.log(totalAge);
// 75
```

# Tổng kết

* Strings, numbers, bools, arrays và object có thể chứa dưới dạng biến, array, và properties của methods.
* với function JavaSCript cũng đối xử như vậy.
* Điều này cho phép function hoạt đông trên các chức năng khác: **higher-order-functions.
*Map, filter, và reduce là một số ví dụ để giúp việc xử lí data dễ dàng hơn nhiều cách thông thường.

[Bài tham khảo](https://medium.freecodecamp.org/a-quick-intro-to-higher-order-functions-in-javascript-1a014f89c6b)