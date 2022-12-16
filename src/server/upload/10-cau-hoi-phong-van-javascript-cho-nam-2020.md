- JavaScript đang trên đường trở thành ngôn ngữ lập trình phổ biến nhất thế giới. Khi nhu cầu công việc tăng lên cho  các deverloper JS ,bạn đã trang bị đủ kiến thức cho mình để gặp nhà tuyển dụng chưa? Dưới đây là 10 câu hỏi JavaScript hàng đầu để thực hiện cuộc phỏng vấn cho công việc mơ ước của bạn.

![](https://images.viblo.asia/8cc84c45-ca66-4f0d-8e56-d8071387053e.png)

## Sự khác biệt giữa var và let là gì?

- Mặc dù điều này có vẻ dễ dàng, nhưng bạn sẽ không tin có bao nhiêu ứng cử viên tôi phải từ chối chỉ vì họ không thể trả lời câu hỏi này. Sự khác biệt là ở mức độ phạm vi. **var** là phạm vi function(function-scoped) , nhưng **let** (và const) là phạm vi blocked (block-scoped). Để hiểu sự khác biệt, hãy xem ví dụ này:

```
function doStuff() {
  // cả a và b sẽ có sẵn cho hàm này doStuff(), nhưng không có bên ngoài
  let a = 5;
  var b = 5;
  
  console.log(a + b); // 10
}

doStuff(); // 10;
console.log(a); // ReferenceError
console.log(b); // ReferenceError

function doMoreStuff() {
  if (2 + 2 === 4) {
    //  Ở đây, a sẽ có sẵn cho toàn bộ hàm
    var a = 5;
    // Nhưng b sẽ chỉ khả dụng trong khối này
    let b = 5;
  }
  console.log(a); // 5
  console.log(b); // ReferenceError
}

doMoreStuff();
// 5
// ReferenceError

for (let i = 0; i < 5; i++) {
  // i sẽ tăng lên sau mỗi lẫn lặp
  // và setTimeout sẽ nhận dc i mới mỗi lần lặp
  setTimeout(() => console.log(i), 100);
}
/*
0
1
2
3
4
*/

for (var j = 0; j < 5; j++) {
  // j nằm ở phạm vi function 
  // do đó nó ko thay đổi sau mỗi lần lặp  và  setTimeout trả ra kết quả giống nhau sau mỗi lần lặp
  setTimeout(() => console.log(j), 100);
}
/*
5
5
5
5
5
*/
```

- Chú ý nếu dùng var các bạn nên chú ý đến hosting javascript. Và hãy tìm hiểu thêm về cách thức hoạt động của javascript.

## Sự khác biệt giữa == và === là gì?
- Nếu câu trả lời của bạn là  == so sánh theo giá trị và === cũng so sánh theo loại ", thì không đúng. Cách công cụ JS hiểu nó, ==  loại ép buộc và === không ép buộc. Loại ép buộc sẽ cố gắng giải quyết các kiểu dữ liệu thông qua việc chuyển đổi kiểu dữ liệu trước khi só sánh. Đây là nguồn gốc của sự nhầm lẫn nhất trong JS (như [] ==! [] là đúng). Bạn có thể quan sát sự khác biệt trong ví dụ này:

```
/* ở đây, '5' sẽ chuyển đổi thành 5 với kiểu ép buộc */
5 == '5'; // true
5 === '5'; // false

/* ở đây, true sẽ chuyển thành 1 */
1 == true; // true
1 > false; // true
0 === false; // false

// Ở đây, JS sẽ cố gắng chuyển nó sang dạng số
// Number('true') = NaN (Not a Number), nhưng Number(true) = 1
'true' == true; // false
'true' === true; // false
```

## Từ khóa 'this' có nghĩa là gì?

- Bạn có thể sẽ trả lời rằng 'this' chỉ đến lớp{class} bên trong nó, nhưng điều này cũng không đúng. Trước hết, các lớp{class} trong JS là Syntactic sugar và nó không đề cấp đến bất kỳ tính năng mới nào. Từ khóa 'this' có sẵn trong bất kỳ chức năng nào và trỏ đến đối tượng có chứa chức năng đó. Có thể dễ hiểu hơn với một ví dụ:

```
const myObject = {
  a: 'b',
  b: 'c',
  doStuff: function() {
    // Ở đây this sẽ trỏ tới myObject
    console.log(this.a + this.b);
  }
}

myObject.doStuff(); // bc

// BUT:
const anotherObject = {
  a: 'abacaba',
  b: '!'
};
anotherObject.doStuff = myObject.doStuff;
anotherObject.doStuff(); // abacaba!

// Ở Arrow functions ko có 'this' nên nó tham chiếu ra bên ngoài
const arrowObject = {
  a: 'b',
  // Ở đây, 'this' trỏ ra bên ngoài function nên nó ko lấy dc gía trị của a
  doMoreStuff: () => console.log(this.a)
};

arrowObject.doMoreStuff(); // undefined
```

## Hàm constructor là gì?

-  Trong JavaScript, hàm constructor được dùng để định nghĩa các thuộc tính và phương thức ban đầu cho đối tượng được tạo ra sử dụng hàm này nhờ sử dụng từ khoá new. Lưu ý rằng trong các hàm constructor, '**this**' không trỏ đến đối tượng bên ngoài, mà thay vào đó được sử dụng làm đối tượng giữ chỗ, xem ví dụ dưới đây:

```
function Car(name, make) {
  // ở đây, 'this' ko trỏ ra bên ngoài object. Nhưng object bạn có thể sử dụng thông qua constructor
  this.name = name;
  this.make = make;
}
// Bạn ko làm bất cứ điều gì vì 'this' sẽ tự động trả lại bạn kết qủa
const myCar = new Car('Outback', 'Subaru');
console.log(myCar.name); // Outback
```

## Chuyển đổi callback dựa trên Promise

- Đây là một câu hỏi, nhưng đó là điều bạn phải biết. Callbacks đơn giản là các chức năng mà bạn dự định sẽ gọi vào một thời gian sau. Chúng thường được sử dụng khi bạn phải chờ một cái gì đó (ví dụ: phản hồi từ API). Nhưng, code dựa trên callback quá phức tạp và đó là lý do tại sao Promise được giới thiệu. Tôi sẽ không đi sâu vào đây, nhưng nếu bây giờ bạn biết Promise là gì, hãy xem bài viết này. Trong ví dụ tiếp theo, bạn được yêu cầu chuyển đổi hàm gọi lại getData thành một Promise:

```
// the function itself
function getData(callback, errorCallback) {
  try {
    // Do some network/api stuff...
    callback(result)
  } catch (e) {
    errorCallback(e);
  }
}

// Here is how you would use it:
getData(result => console.log(result), error => console.error(error));

// Here is how to create a Promise-based function from it:

function getDataAsync() {
  return new Promise((resolve, reject) => {
    getData(resolve, reject);
  });
}

getDataAsync()
  .then(result => console.log(result))
  .catch(error => console.error(error));

// OR

async functoin main() {
  const result = await getDataAsync();
  console.log(result);
```

Hàm xây dựng Promise chấp nhận callback, nhận hai hàm: **resolve** và **reject**. Trong callback, bạn thực hiện các nhiệm vụ tốn thời gian của mình và gọi 'resolve' hoặc 'reject', dựa trên kết quả.

## NaN === NaN?

- Sai. Đây là một nguồn tranh luận vô tận và là một trong những phần khó hiểu nhất về JS. Tóm lại, NaN là viết tắt của **Not a Number** và chỉ vì một giá trị không phải là số và một giá trị khác không phải là số không có nghĩa là chúng bằng nhau. Nhược điểm là bạn không thể thực sự kiểm tra nếu một biến là NaN bằng cách sử dụng myVariable === NaN. Bạn có thể sử dụng hàm Number.isNaN hoặc myVariable !== myVariable để kiểm tra nó.

## 0,1 + 0,2 === 0,3?

- Sai. Thủ thuật này không chỉ áp dụng cho JS: nó phổ biến trong các hoạt động của dấu phẩy động trong bất kỳ ngôn ngữ nào. Nó liên quan đến cách CPU xử lý các số dấu phẩy động. Giá trị thực của 0,1 + 0,2 sẽ giống như 0,300000001 và để kiểm tra sự bằng nhau, bạn sẽ viết Math.abs (0,3 - (0,2 + 0,1)) <= EPS, trong đó EPS là một giá trị nhỏ tùy ý (ví dụ 0,00001).


## Các kiểu dữ liệu nguyên thuỷ trong JS là gì?

- Kiểu dữ liệu nguyên thuỷ trong JS là dữ liệu không phải là một đối tượng và không có phương thức. Dưới đây là danh sách các kiểu dữ liệu nguyên thuỷ trong JS:

**Kiểu nguyên thủy:**

    - Có 7 kiểu nguyên thủy
      - Boolean
      - Null
      - Undefined
      - Number
      - BigInt
      - String
      - Symbol



** Đối tượng:**

- Có khả năng lưu trữ nhiều giá trị dưới dạng thuộc tính.
- Có thể được tạo với {}, ví dụ: {name: “Nam”, age: 20}.



## Chế độ “strict” là gì?

- Trong JS, bạn kích hoạt chế độ nghiêm ngặt bằng cách đặt "use strict"; ở đầu tập tin. Chế độ strict cho phép kiểm tra lỗi nghiêm ngặt hơn trong code của bạn và giúp gỡ lỗi dễ dàng hơn. Ví dụ: đoạn mã này sẽ hoạt động trong JS thông thường, nhưng không nghiêm ngặt:

```
x = 'abacaba'; // using an undeclared variable is not allowed in strict mode

delete x; // deleting variables is also not allowed

function(x1, x1) {} // duplicating argument names is not allowed
```

## Kết quả của code này là gì?
```
function abacaba() {
    return
    {
      a: 'b'
    }
}

console.log(abacaba());
```
**undefined**. Điều này đang xảy ra bởi vì JS sẽ đưa ra một dấu chấm phẩy sau khi `return` trên dòng 2 và coi các dòng 3-5 như một phạm vi thay vì một định nghĩa đối tượng.

## Kết Luận
- Cảm ơn bạn đã đọc, tôi chúc bạn may mắn nhất trong cuộc phỏng vấn của mình! Để biết thêm các  nội dung thú vị, hãy xem các bài viết khác của tôi
- Link tham khảo : https://medium.com/javascript-in-plain-english/10-javascript-interview-questions-for-2020-697b40de9480