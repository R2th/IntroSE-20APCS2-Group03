### Giới thiệu
Bạn đã nghe về Destructuring chưa? Nó khá phổ biến với javascript đó. Cho phép bạn lấy ra các phần tử từ array, object và đặt tên cho nó. Rất tiện khi sử lý dữ liệu JSON, các đối tượng lồng nhau, giúp chúng ta rút gọn được kha khá code đấy. Nào chúng ta hãy cùng đến với destructuring.

### Thực hành
Đầu tiên chúng ta hãy xem qua ví dụ sau đây:

```javascript
const person = { name: 'Nam', age: 24 };
const name = person.name;
const age = person.age;
console.log(name); // Output: Nam
console.log(age); // Output: 24
```

Với ví dụ trên muốn lấy giá trị của name, age chúng ta phải khai báo từng biến mới rồi gán giá trị của person vào. Đây là cách thông thường. Tiếp theo hãy đến với destructuring.

```javascript
const person = { name: 'Nam', age: 24 };
const { name, age } = person;
console.log(name); // Output: Nam
console.log(age); // Output: 24
```
Với cách này chúng ta có thể rút gọn khá nhiều dòng khai báo nếu cần lấy nhiều dữ liệu từ person.
Bây giờ nãy đến với những thứ mà destructuring làm được nhé.

#### 1. Hoán đổi phần tử
Giả sử bạn muốn hoán đổi giá trị của 2 số cho nhau thì:
```javascript
let a = 1;
let b = 2;
let temp = a;

a = b;
b = temp;

console.log(a, b); // Output: 1 2
```
Nhưng với destructuring chúng ta có cách ngắn gọn hơn:
```javascript
let a = 1;
let b = 2;
[a ,b] = [b, a];
console.log(a, b); // Output: 1 2
```
Không phải tạo ra biến temp nữa. Chúng ta còn có thể hoán đổi nhiều số cho nhau nữa `[a, b, c] = [b, c, a]`

#### 2. Lấy thuộc tính lồng nhau và gán giá trị mặc định
```
const person = {
    name: 'Nam',
    age: 26,
    address: {
        street: 'Truong Chinh',
        city: 'Da Nang',
        country: 'Viet Nam',
    },
};

const { address: { country } } = person;
console.log(country); // Output: Viet Nam
```

Sẽ có trường hợp lấy thuộc tính nhưng nó không có dữ liệu(null, undefined) thì chúng ta có thể gán giá trị mặc định bằng cách.
```javascript
const { address: { strict = 'N/a' } } = person;
console.log(strict); // Output: N/a
```
Hoặc trường hợp address không có sẽ gây ra lỗi thì chúng ta có thể gán như sau:
```javascript
const { address: { strict = 'N/a' } = {} } = person;
console.log(strict); // Output: N/a
```

#### 3. Đặt lại tên khác
Ở các ví dụ trên khi destructuring đều lấy lại đúng tên của thuộc tính thì mới lấy được giá trị. Nhưng giả sử bạn muốn đặt lại tên khác thì sao. Đừng lo destructuring cho phép đặt alias.
```javascript
const { address: { country : nation } } = person;
console.log(nation); // Output: Viet Nam
```

#### 4. Với array
```javascript
const arr = ['a', [1, 2, 3]];

const { 1: second } = arr;
console.log(second); // Output: [1, 2, 3]

const [first, [one, two, three]] = arr;
console.log(first, one, two, three); // Output: a 1 2 3
```

#### 5. Sử dụng với rest syntax
Ví dụ chúng ta muốn lấy hết số phần tử của 1 array sang 1 array khác nhưng không phải bằng cách gán thông thường thì sao.
```javascript
const arr = ['Hello', 'World', '!!!'];
const [...newArr] = arr;

console.log(newArr); // Output: ['Hello', 'World', '!!!']
```

#### 6. Sử dụng computed với destructuring

Các ví dụ ở trên đều sử dụng các tên tĩnh để lấy giá trị của person. Tuy nhiên với khác tên động thì sao. 

```javascript
let key = 'name';

const { [key]: value } = person;
console.log(value); // Output: Nam
```
Chúng ta có thể tùy ý tên key bằng bất kỳ giá trị nào chúng ta muốn.

### Kết luận

Trên đây là một số mẹo khi dùng destructuring, ban đầu có thể thể sẽ khó sử dụng nhưng khi bạn đã thành thục thì nó sẽ giúp ích cho bạn rất nhiều. 
Cám ơn các bạn đã dành thời gian đọc bài viết của mình. Chúc các bạn có một ngày học tập và làm việc hiệu quả.