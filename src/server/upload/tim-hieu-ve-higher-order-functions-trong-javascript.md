Nếu bạn đang học về Javascript, bạn phải tìm hiểu về thuật ngữ *Higher-Order Functions*. Mặc dù nó nghe có vẻ phức tạp, phải không.

Điều làm cho Javascript phù hợp với funtional programming là nó chấp nhận Higher-Order Functions.

Higher-Order Functions là mở rộng được sử dụng trong JavaScript. Nếu bạn đã lập trình JavaScript một thời gian, bạn đã có thể sử dụng chúng mà không cần hiểu.

Để hiểu đầy đủ về khái niệm này, trước tiên bạn phải hiểu Funtional Programming là gì và khái niệm về First-Class Functions.

# Functional Programming là gì?
Trong thuật ngữ đơn giản nhất, Functional Programming là một dạng lập trình mà trong đó bạn có thể truyền các hàm dưới dạng tham số cho các hàm khác và cũng trả về chúng dưới dạng các giá trị. Trong Functional Programming chúng ta suy nghĩ và code về các functions.

JavaScript, Haskell, Clojure, Scala, và Erlang là một trong số các ngôn ngữ cài đặt functional programming.

# First-Class Functions
Nếu bạn đã học JavaScript, bạn có thể đã nghe nói rằng JavaScript coi các hàm là first-class citizens. Điều đó vì trong JavaScript hoặc bất kỳ ngôn ngữ functional programming nào khác, hàm là các đối tượng.

Trong Javascripts hàm là một kiểu đặc biệt của đối tượng. Chúng là các `function object` (Đối tượng hàm). Ví dụ: 
```
function greeting() {
  console.log('Hello World');
}
// Invoking the function
greeting();  // prints 'Hello World'
```
Để chứng minh hàm là đối tượng trong Javascript, chúng ta có thể làm như sau:
```
// Chúng ta có thể thêm các thuộc tính đến hàm giống như làm với object
greeting.lang = 'English';
// Prints 'English'
console.log(greeting.lang);
```
Ghi chú: Mặc dù điều này là hoàn toàn hợp lệ trong JavaScript, đây được coi là một thực tiễn có hại. Bạn không nên thêm các thuộc tính ngẫu nhiên cho các đối tượng hàm, sử dụng một đối tượng nếu bạn phải làm điều đó.

Trong JavaScript, mọi thứ bạn có thể làm với các loại khác như đối tượng, chuỗi hoặc số, bạn có thể làm với các hàm. Bạn có thể truyền chúng dưới dạng tham số cho các hàm khác (callbacks), gán chúng cho các biến và truyền chúng xung quanh, v.v ... Đây là lý do tại sao các hàm trong JavaScript được gọi là First-Class Functions.

## Gán hàm đến các biến
Chúng ta có thể gán hàm đến các biến trong javascript. Ví dụ
```
const square = function(x) {
  return x * x;
}
// prints 25
square(5); 
```
Chúng ta cũng có thể truyền chúng đến biến khác. Ví dụ:
```
const foo = square;
// prints 36
foo(6);
```

## Truyền các hàm như tham số:
Chúng ta có thể truyền các hàm như tham số đến các hàm khác. Ví dụ:
```
function formalGreeting() {
  console.log("How are you?");
}
function casualGreeting() {
  console.log("What's up?");
}
function greet(type, greetFormal, greetCasual) {
  if(type === 'formal') {
    greetFormal();
  } else if(type === 'casual') {
    greetCasual();
  }
}
// prints 'What's up?'
greet('casual', formalGreeting, casualGreeting);
```
Bây giờ chúng ta đã biết first-class functions là gì, giờ chúng ta sẽ đi sâu vào Higher-Order functions trong JavaScript.

## Higher-Order Functions
Higher order functions là hàm hoạt động trên các hàm khác , bằng cách lấy chúng làm tham số hoặc trả về chúng. Nói một cách đơn giản, một Higher-Order function là hàm nhận một hàm  dưới dạng đối số hoặc trả về hàm dưới dạng đầu ra.

Ví dụ, `Array.prototype.map, Array.prototype.filter và Array.prototype.reduce` là một số the Higher-Order functions được tích hợp trong ngôn ngữ.

### Higher-Order Functions hoạt động
Hãy xem một số ví dụ về cách hoạt động của Higher-Order Functions và so sánh với việc khi chúng ta không sử dụng Higher-Order Functions.

### Array.prototype.map
Phương thức `map()` tạo ra một mảng mới bằng cách gọi hàm callback được cung cấp như một đối số trên mỗi phần tử của mảng đầu vào. Phương thức `map()` sẽ lấy mỗi giá trị trả về từ hàm callback và tạo ra một mảng mới sử dụng các giá trị này.
Hàm callback uyền đến phương thức `map()` chấp nhận 3 đối số: `element, index, và array`.
Hãy xem một số ví dụ:

### Ví dụ 1:
Chúng ta có một mảng các số và chúng ta muốn tạo một mảng mới gấp đôi mỗi giá trị của mảng đầu tiên. Hãy để xem làm thế nào chúng ta có thể giải quyết vấn đề có và không có Higher-Order Functions.

### Không Higher-order function
```
const arr1 = [1, 2, 3];
const arr2 = [];
for(let i = 0; i < arr1.length; i++) {
  arr2.push(arr1[i] * 2);
}
// prints [ 2, 4, 6 ]
console.log(arr2);
```

### Có Higher-order function
```
const arr1 = [1, 2, 3];
const arr2 = arr1.map(function(item) {
  return item * 2;
});
console.log(arr2);
```

Chúng ta cũng có thể làm code ngắn hắn bằng cách sử dụng cú pháp arrow function:
```
const arr1 = [1, 2, 3];
const arr2 = arr1.map(item => item * 2);
console.log(arr2);
```

### Ví dụ 2: 
Chúng ta có một mảng các năm sinh nhật của các người khác nhau và chúng ta muốn tạo ra một mảng chứa tuổi của họ. Ví dụ:

### Không Higher-order function
```
const birthYear = [1975, 1997, 2002, 1995, 1985];
const ages = [];
for(let i = 0; i < birthYear.length; i++) {
  let age = 2018 - birthYear[i];
  ages.push(age);
}
// prints [ 43, 21, 16, 23, 33 ]
console.log(ages);
```

### Có Higher-order function map
```
const birthYear = [1975, 1997, 2002, 1995, 1985];
const ages = birthYear.map(year => 2018 - year);
// prints [ 43, 21, 16, 23, 33 ]
console.log(ages);
```

### Array.prototype.filter
Phương thức `filter()` tạo ra một mảng mới cùng với tất cả các phần tử vượt qua sự kiểm tra được cung cấp bởi hàm callback. Hàm callback được truyền đến phương thức filter() chấp nhận 3 đối số: element, index, và array.

Hãy xem một số ví dụ:
### Ví dụ 1:
Chúng ta có một mảng chứa các đối tượng cùng với thuộc tính tên và tuổi. Chúng ta muốn tạo ra một mảng chứa chỉ người trưởng thành (tuổi lớn hơn hoặc bằng 18)

### Không Higher-order function
```
const persons = [
  { name: 'Peter', age: 16 },
  { name: 'Mark', age: 18 },
  { name: 'John', age: 27 },
  { name: 'Jane', age: 14 },
  { name: 'Tony', age: 24},
];
const fullAge = [];
for(let i = 0; i < persons.length; i++) {
  if(persons[i].age >= 18) {
    fullAge.push(persons[i]);
  }
}
console.log(fullAge);
```

### Cùng với Higher-order function `filter`
```
const persons = [
  { name: 'Peter', age: 16 },
  { name: 'Mark', age: 18 },
  { name: 'John', age: 27 },
  { name: 'Jane', age: 14 },
  { name: 'Tony', age: 24},
];
const fullAge = persons.filter(person => person.age >= 18);
console.log(fullAge);
```

### Array.prototype.reduce
Phương thức `reduce()` thực thi hàm callback trên mỗi phần tử của mảng gọi dẫn đến một đầu ra duy nhất. Phương thức reduce chấp nhận 2 tham số: 1) Hàm reducer (callback) 2) Một optional `initialValue`.

Hàm reducer (callback) chấp nhận 4 tham số: `accumulator, currentValue, currentIndex, sourceArray.`

Nếu một `initialValue` là được cung cấp, thì `accumulator` sẽ bằng với `initialValue` và `currentValue` sẽ bằng với phần tử đầu tiên trong mảng.

Nếu `initialValue` không được cung cấp, thì `accumulator` sẽ bằng với phần tử đầu tiên của mảng và `currentValue` sẽ bằng với phần tử thứ hai của mảng.

### Ví dụ 1:
Chúng ta tính tổng một mảng các số:

### Cùng với Higher-order function `reduce`
```
const arr = [5, 7, 1, 8, 4];
const sum = arr.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue;
});
// prints 25
console.log(sum);
```

Mỗi lần hàm reducer gọi trên mỗi giá trị trong mảng, `accumulator` sẽ giữ kết quả của hoạt động trước đó được trả về từ hàm reducer, và `currentValue` được đặt thành giá trị hiện tại của mảng. Cuối cùng kết quả được lưu trong biến tổng.

Chúng ta có thể cung cấp một initial value đến hàm này:
```
const arr = [5, 7, 1, 8, 4];
const sum = arr.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue;
}, 10);
// prints 35
console.log(sum)
```

### Không Higher-order function:
```
const arr = [5, 7, 1, 8, 4];
let sum = 0;
for(let i = 0; i < arr.length; i++) {
  sum = sum + arr[i];
}
// prints 25
console.log(sum);
```

Bạn có thể thấy rằng việc sử dụng High-order functions đã làm cho mã của chúng tôi sạch hơn, ngắn gọn hơn và ít dài dòng hơn.

## Tạo ra Higher-Order Function của bạn
Cho đến thời điểm này, chúng ta đã thấy các High-order function khác nhau được tích hợp vào ngôn ngữ. Bây giờ, hãy để cùng nhau tạo ra Higher-Order Function của chúng ta.

Hãy tưởng tượng JavaScript không có phương thức map tự nhiên. Chúng ta có thể tự xây dựng nó để tạo ra High-order function của riêng mình.

Chúng ta có một mảng các string và chúng ta muốn chuyển đổi mảng này thành một mảng các số nguyên, trong đó mỗi phần tử đại diện cho độ dài của string trong mảng ban đầu.

```
const strArray = ['JavaScript', 'Python', 'PHP', 'Java', 'C'];

function mapForEach(arr, fn) {
  const newArray = [];
  for(let i = 0; i < arr.length; i++) {
    newArray.push(
      fn(arr[i])
    );
  }
  return newArray;
}
const lenArray = mapForEach(strArray, function(item) {
  return item.length;
});
// prints [ 10, 6, 3, 4, 1 ]
console.log(lenArray);
```

Trong ví dụ trên, chúng ta đã tạo ra một Higher-order function `mapForEach` chập nhận một mảng và một hàm callback `fn`. Hàm này lặp trên mảng được cung cấp và gọi hàm callback `fn` bên trong lệnh gọi hàm `newArray.push` trên mỗi lần lặp.

Hàm callback `fn` nhận phần tử hiện tại của mảng và trả về length của phần tử đó, nó được lưu vào bên trong newArray. Sau khi vòng lặp kết thúc, `newArray` is được trả về và gán đến `lenArray`.

## Kết luận
Chúng ta vừa học Higher-order functions là gì và một số hàm được xây dựng trong Higher-order function. Chúng ta cũng được học cách tạo ra Higher-order functions cho riêng mình.

Tóm lại, Higher-order function là hàm có thể nhận hàm dưới dạng đối số và thậm chí có thể trả về hàm. Các Higher-order function giống như các hàm thông thường có thêm khả năng nhận và trả về các hàm khác là đối số và đầu ra.