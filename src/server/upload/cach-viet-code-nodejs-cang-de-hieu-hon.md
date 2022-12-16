# Cách Viết Code Nodejs Càng Dễ Hiểu Hơn
Sau khi một thời gian tìm hiểu về node của mình, Mình đã tìm nhưng cách viết code trong node càng dễ hiểu hơn, bởi vì đó là những cái thật quan trọng cần phải làm trước mặt. Trong bài viết này mình sẽ giới thiệu các bạn những cách viết code trong node result tốt hơn. :kissing_heart:

## 80 chữ trong một line
một việc tốt nhất trong viết code đó line code dài, theo chúng ta 80 chữ trong một line là một độ dài hợp lý và cùng được áp dụng cho nhiều ngồn ngữ rồi (Javascript, Reactjs, Python, Ruby...)
## Sử dùng dấu nháy đơn
bạn cần phải dùng dấu nháy đơn, chứ khi bạn viết một string trong JSON
```
// cách viết không tốt:
const you = "you";

// cách viết tốt:
const you = 'you';
```
## Cách dùng ```{```
lúc khi bạn viết một điều kiện hoặc một lớp (class) cách viết ```{``` sẽ áp dùng như sau:
```
// Cách viết không tốt
if (true)
{
   .....
}

class Test
{
...
}


// Cách viết tốt
if (true) {
.....
}

class Test {
....
}
```
## Cách khởi tạo biến
Trong ta phải viết kiểu dữ liệu khởi tạo cho biến từng cái một từng cái một.
```
// Cách viết không tốt
const name = 'Samnang',
            age = 30;.
            
// Cách viết tốt
const name = 'Samnang';
const age = 30;
```
## Cách đặt tên
- Nodejs cùng giống như Javascript, Reactjs, Angularjs hoặc Java. Đối với cách đặt tên biến, hàm là **lowerCamelCase**.
```
// Cách viết không tốt
const user_name = 'Dam Samnang';
const YearOld = 30;

// Cách viết tốt
const userName = 'Dam Samnang';
const yearOld = 30;
```
-  Nhưng đối với tên của lớp bạn cần phải đặt tên kiểu **UpperCamelCase**:
```
// Cách viết không tốt
class userAgent {
...
}

// Cách viết không tốt
class user_agent {
...
}

// Cách viết tốt
class UserAgent {
....
}
```
- Đối với việc đặt tên let và constants:
```
// Cách viết không tốt
const SECOND = 1 * 100;
class File {
}
File.fullPermission = 01234;

// Cách viết tốt
let second = 1 * 100;
class File {
...
}
File.FULL _PERMISSION = 01234;
```
## Cách viết biến array và hash
Trong ta phải dùng ```,``` cho cách khởi tạo viết array và xuống dòng mới trong trường hợp có nhiều element trong array hoặc hash.
```
// cách viết không tốt
const keyArr = [
    '1', '2', '3', '4'
];
const keyHash = {'a': 1
    , 'b': 2
    , 'c': 3
};

// cách viết tốt
const keyArr = ['1', '2', '3', '4'];
const keyHash = {
   'a': 1,
   'b': 2,
   'c': 3,
 };
```
## Cách so sánh
- Trong ta phải dùng ```===``` cho viết so sánh 2 giá trị .
```
// Cách viết không tốt
const number = '1';
if (number == 1) {
 .....
}

// Cách viết tốt
const number = '1';
if (number === 1) {
 .....
}
```
- Trong cách so sánh ngắn, chung ta chỉ viết một dòng mà thôi
```
// Cách viết không tốt
 const c = (a === b)
 ? 1
 : 2;
 
 // Cách viết tốt
 const c = (a === b) ? 1 : 2;
```
- Trong việc điều kiện của mình rất là phức tạp, trong chúng ta nên khởi tạo một biến cho việc viết condition xong, mới gọi vào ```if``` condition sau:
```
// Cách viết không tốt
if (password.length >= 4 && /^(?=.*\d).{4,}$/.test(password)) {
  console.log('losing');
}

// Cách viết tốt
const isValidPassword = password.length >= 4 && /^(?=.*\d).{4,}$/.test(password);

if (isValidPassword) {
  console.log('winning');
}
```
## không nên viết nesting ```if```
Trong cách viết code trong một hàm cùng có nhiều lúc gặp trường hợp cần phải viết diều kiện lặp nhau, nhưng mình cố gắng không nên viết nesting ```if```
```
// Cách viết không tốt
function isPercentage(val) {
  if (val >= 0) {
    if (val < 100) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

// Cách viết tốt
function isPercentage(val) {
  if (val < 0) {
    return false;
  }

  if (val > 100) {
    return false;
  }

  return true;
}

// Cách viết tốt hơn
function isPercentage(val) {
  var isInRange = (val >= 0 && val <= 100);
  return isInRange;
}
```
## Cố gắng không dùng ```if else``` trong hàm
Có trường hợp bạn có thể chỉ cần viết một ``if`` thôi là đủ rồi, không phải viết thêm ```eles``` cho kết quả của một hàm.
```
// Cách viết không tốt
function sayLove(person) {
    const msg = null;
   if (person === 'her') {
      msg ='i love you';
   } else {
       console.log('say goodbye!!');
   }
   return msg;
}

// Cách viết tốt
function sayLove(person) {
    const msg = 'say goodbye!!'
    if (person === 'her') {
       msg = 'i love you'
    }
    return msg;
}

// Cách viết tốt hơn
function sayLove(person) {
    const msg = person === 'her' ? 'i love you' : 'Say goodbye!!';
    return msg;
}

// Cách viết không tốt
function yourMethod(input) {
    if (input) {
        return something;
    }
    return;
}

// Cách viết tốt hơn
function yourMethod(input) {
    if (!input) { return; }
  
    return something;
}
```
## Kết luận 
Trong bài viết chỉ là những cái của mình đã trải nghiệm qua, tuy nhiên nó cùng những cái cần phải bù thêm, nếu bạn cảm thấy thiệu hoặc không đúng thì bạn có thể comment cho mình ở dưới này, mình thật là vui lòng ,edit và bù thêm nhũng cái đó trong bài viết sau này và có thể giúp nhau code càng ngày càng viết dễ hiểu hơn.

## Tài liệu:
- [Node style Guide](https://github.com/RisingStack/node-style-guide)