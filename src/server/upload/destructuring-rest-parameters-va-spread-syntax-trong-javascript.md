Là một lập trình viên javascript thì chắc hẳn bạn đã từng nghe về Destructuring, Rest Parameters, và Spread Syntax, đây là những tính năng rất hay của ES6, giúp ta làm việc với data structure dể dàng hơn, nhưng có thể có nhiều bạn còn mơ hồ hoặc chưa rõ về nó thì trong bài viết này sẽ giúp các bạn hiểu rõ hơn về các khái niệm đó nhé.

Bài viết sẽ giúp bạn hiểu được khái niệm của chúng? và khi nào thì sử dụng? Tìm hiểu thôi nào.

## Destructuring javascript
Destructuring là một cú pháp cho phép bạn gán các thuộc tính của một Object hoặc một Array. Điều này có thể làm giảm đáng kể các dòng mã cần thiết để thao tác dữ liệu trong các cấu trúc này. Có hai loại Destructuring: Destructuring Objects và Destructuring Arrays 

**Destructuring Objects**

Destructuring Objects cho phép bạn tạo ra một hay nhiều  new variables  sử dụng những property của một Objects. Ví dụ:
Ta có một object
```javascript
const note = {
  	id: 1,
  	website: 'abc.com',
  	date: '17/07/2014',
}
```
Theo cách truyền thống thì chúng ta sẽ lấy ra những giá trị như cú pháp sau:
```javascript
const id = note.id
const website = note.website
const date = note.date
```
Nhưng khi có Destructuring thì mọi chuyện trở nên đơn giản hơn, cú pháp đơn giản chỉ một dòng:
```javascript
const { id, website, date } = note
```

**Destructuring Arrays**

Array destructuring cho phép bạn tạo ra một new variables bằng cách sử dụng giá trị mỗi index của Array. Hãy xem ví dụ để hiểu hơn nào:
Ta có một Array date:
```javascript
const date = ['2014', '17', '07']
```
Bây giờ để lấy ra ngày tháng năm theo cách cũ bạn sẽ làm như sau:
```javascript
const year = date[0]
const month = date[1]
const day = date[2]
```
Có vẻ không được đẹp phải không nhỉ, sau đây là Destructuring:
```javascript
const [year, month, day] = date
```
Đơn giản hơn phải không các bạn. Để tìm hiểu sâu hơn bạn có thể tham khảo ở [Đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

## Spread operator
Spread syntax hay còn gọi là three dot (...) là một bổ sung hữu ích khác cho JavaScript để làm việc với các Arrays, Objects và các function calls. 
Hơn nữa Spread có thể tao ra một cấu trúc dữ liệu shallow copy để tăng tính thao tác dữ liệu. Cũng giống như destructuring thì Spread cũng làm việc nhiều với Arrays và Objects. 

**Spread với Array**

Ví dụ về merge các Array thì có rất nhiều cách ở đây mình dùng concat method:
```javascript
const array1 = ['Em', 'yêu']
const array2 = ['Anh', 'nhưng lại hôn thằng đó']

const result = array1.concat(array2)

console.log(result)
```
Nhưng thay thế bằng Spread mọi thứ lại đơn giản hơn
```javascript
const result = [...array1, ...array2]

console.log(result)
```

**Spread with Objects**

Với Object để shallow copy một bạn có thể dùng Object.assign():
```javascript
const profile = {
    name: 'Nguyen Xuan A',
    age: 23,
    birthday: '01/01/1997'
}

const cloneProfile = Object.assign({}, profile)
```
Với Spread:
```javascript
const cloneProfile = {...profile}
```
Bạn có thể tìm hiểu trên trang MDN tại [Đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

**Spread with Function Calls**

Giả sử bạn có một function:
```javascript
// Tạo function
function fn(a, b, c) {
  return a * b * c
}

// Gọi như bth
fn(1, 2, 3) // 6

// Sử dụng Spread
const numbers = [1, 2, 3]

fn(...numbers) // 6
```

## Rest Parameters
Cũng như Spread Syntax (...) nhưng có tác dụng ngược lại. Ví dụ, trong hàm fn(), nếu chúng ta muốn args là một mảng bao gồm một số lượng đối số không xác định, chúng ta có thể làm như sau:
```
function fn(...args) {
  console.log(args)
}

restTest(1, 2, 3, 4, 5, 6);// [1, 2, 3, 4, 5, 6]
```

## Tóm tắt
Qua đây sẽ là những khái niệm cũng như những ví dụ thực tế hy vọng sẽ giúp các bạn hiểu rõ hơn về Destructuring, Spread, Rest và có thể áp dụng chúng vào công viêc thực tế của mình. Xin cảm ơn!