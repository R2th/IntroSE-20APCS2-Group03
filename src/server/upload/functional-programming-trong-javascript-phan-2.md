Tiếp nối câu chuyện tìm hiểu Functional Programming trong Javascript ở [phần 1](https://viblo.asia/p/functional-programming-trong-javascript-YWOZrB9vZQ0) thì tất nhiên hôm nay sẽ là phần 2 của chủ đề trên. Cũng không cần mở đầu dài dòng như lần trước. Chúng ta bắt đầu tiếp với những khái niệm còn lại.

# Các khái niệm
## Referential transparency
Giả sử chúng ta có một hàm tính diện tích của hình vuông như sau:
```js
const square = (n) => n * n;
```
Nếu ta truyền giá trị `n = 2` vào hàm trên thì kết quả nhận được luôn là giá trị `4`. Điều đó có nghĩa là chúng ta có thể thay thế `square(2)` bằng giá trị `4`. Hàm như trên được gọi là referentially transparent. Chúng ta có thể đơn giản hiểu nó là như sau:
> pure functions + immutable data = referential transparency

Với một ví dụ khác:
```js
const sum = (a, b) => a + b;
```
Sử dụng hàm với các tham số truyền vào như sau:
```js
sum(3, sum(5, 8));
```
Với giá trị của `sum(5, 8)` luôn là `13` chúng ta có thể viết lại như sau: 
```js
sum(3, 13);
```
Và biểu thức trên vẫn luôn luôn cho ta kết quả `16`.
## Functions as first-class entities
Ý tưởng cho khái niệm này chính là việc coi các hàm là giá trị và được sử dụng làm dữ liệu truyền vào hàm khác. 

* Đề cập đến nó từ hằng và biến.
* Truyền nó vào như là một tham số cho các hàm khác.
* Trả về kết quả từ hàm khác.

Bằng cách này chúng ta có thể kết hợp các hàm khác nhau để tạo nên hàm mới với hành vi mới. Với một hàm thực hiện chức năng tính tổng 2 số và sau đó thực hiện nhân đôi giá trị như sau:
```js
const doubleSum = (a, b) => (a + b) * 2;
```
Với một hàm gần giống như trên, nhưng thay vì cộng 2 số chúng ta thực hiện trừ như sau:
```js
const doubleSubtraction = (a, b) => (a - b) * 2;
```
Các hàm ở trên đều có logic tương tự nhau, chúng chỉ khác nhau ở toán tử sử dụng. Nếu chúng ta coi các hàm là các giá trị và sử dụng nó làm tham số. Từ đây chúng ta có thể tự định nghĩa một hàm mà nhận hàm toán tử như sau:
```js
const sum = (a, b) => a + b;
const subtraction = (a, b) => a - b;

const doubleOperator = (f, a, b) => f(a, b) * 2;

doubleOperator(sum, 3, 1); // 8
doubleOperator(subtraction, 3, 1); // 4
```
Chúng ta có 1 đối số là `f` và sử dụng nó để xử lý `a` và `b`. Để sử dụng, ta truyền vào hàm `sum` và `subtraction` để có kết quả mong muốn.
## Higher-order functions
Để nói về higher-order functions chúng ta sẽ nghĩ đến:

* Nhận 1 hoặc nhiều hàm làm tham số truyền vào
* Kết quả trả về là một hàm

Ở ví dụ của phần trên là hàm `doubleOperator` chính là điển hình cho higher-order functions vì nó lấy hàm toán tử làm đối số và sử dụng nó. Chúng ta thử xem một vài ví dụ trong JS như dưới đây.
### Filter
Đây chính là tính năng dùng với một collection cho trước và ta muốn lọc kết quả theo một thuộc tính có ở trong collection. Một ví dụ là ta có 1 danh sách các số nguyên và muốn lấy ra những số chẵn.

Với một suy nghĩ không có hàm nào sẵn để có thể thực hiện yêu cầu trên thì chúng ra sẽ thử cách như sau:

* Tạo một mảng rỗng tên là `evenNumbers`.
* Chạy vòng lặp qua từng phần tử của mãng cho trước.
* Thêm các số chẵn vào mảng `evenNumbers`.

```js
var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var evenNumbers = [];

for (var i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 == 0) {
    evenNumbers.push(numbers[i]);
  }
}

console.log(evenNumbers); // (6) [0, 2, 4, 6, 8, 10]
```
Nhưng mà có `filter` là higher order function rồi thì cần gì khổ như trên nhỉ. Nhẹ nhàng như sau là thoản mãn cái mình cần rồi.
```js
const even = n => n % 2 == 0;
const listOfNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
listOfNumbers.filter(even); // [0, 2, 4, 6, 8, 10]
```
Chúng ta cũng có thể sử dụng để lọc với mảng các đối tượng. 
```js
let people = [
  { name: "A", age: 26 },
  { name: "B", age: 10 },
  { name: "C", age: 30 }
];
```
Chúng ta muốn tìm những người trên 21 tuổi như sau:
```js
const olderThan21 = person => person.age > 21;
const overAge = people => people.filter(olderThan21);
overAge(people); // [{ name: 'A', age: 26 }, { name: 'C', age: 30 }]
```
### Map
Ý tưởng của `map` chính là làm thay đổi một collection. Phương thức `map` làm thay đổi một collection bằng cách áp dụng một hàm cho tất cả các phần tử của nó và tạo một collection mới từ các giá trị được trả về.

Vẫn với collection là `people` ở trên. Nhưng bây giờ chúng ta muốn một collection với nội dung như là `A is 26 years old`
```js
let people = [
  { name: "A", age: 26 },
  { name: "B", age: 10 },
  { name: "C", age: 30 }
];

let peopleSentences = [];

for (let i = 0; i < people.length; i++) {
  let sentence = people[i].name + " is " + people[i].age + " years old";
  peopleSentences.push(sentence);
}

console.log(peopleSentences); // ['A is 26 years old', 'B is 10 years old', 'C is 30 years old']
```
Để có một kết quả tương tự thì chúng ta có thể dùng `map` như sau:
```js
const makeSentence = (person) => `${person.name} is ${person.age} years old`;

const peopleSentences = (people) => people.map(makeSentence);
  
peopleSentences(people);
```
# Kết luận lần 2
Đến đây thì mình đã giới thiệu được một số khái niêm của Functional programming trong Javascript. Tuy nhiên, mình vẫn chưa nhắc đến cái gọi là `lodash/fp` mà từ đầu mình thắc mắc. Vì vậy, mong rằng bài tiếp theo mình sẽ giới thiệu về nó trong chuỗi bài về Functional programming. Cảm ơn mọi người đã theo dõi bài viết. Có gì thiếu sót mong bạn bỏ qua :bowing_woman: .