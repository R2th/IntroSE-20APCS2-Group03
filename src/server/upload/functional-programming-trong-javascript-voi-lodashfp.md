Trải qua những ngày tháng cặm cụi đọc về Functional Programming thì mình cũng may mắn hiểu được một phần nó về ý tưởng của nó. Mục đích mình đi tìm hiểu về lý thuyết functional là để giải thích cách viết của `lodash/fp`. Và đây có vẻ sẽ là bài viết cuối cùng trong chuỗi những bài viết về functional programming trong JS của mình. Mong rằng, mọi người đã có những thời gian tuyệt vời khi đọc các bài viết của mình.

# Tại sao bạn nên viết theo cách của functional?
Chúng ta lại bắt đầu với một số ví dụ để chỉ rõ tại sao chúng ta nên đi theo hướng functional. Lợi ích đầu tiên chính là chuyển từ explicit sang implicit.
## Explicit
Ở đây mình muốn tính diện tích hình vuông với một mảng các phần tử được xem là độ dài của 1 cạnh hình vuông.
```js
const squareAll = (numbers) => {
  var squared = [];
  for (var i = 0; i < numbers.length; i++) {
    squared.push(numbers[i] * numbers[i]);
  }
  return squared;
}

squareAll([1, 2, 3, 4]); // [1, 4, 9, 16]
```
Với đoạn code trên,ta đã phải định nghĩa một cách rõ ràng các bước mà cần để thực hiện. Từ việc duyệt qua các phần tử của mảng, cho đến thực hiện phép tính nhân cho từng phần tử,...Bằng một tư duy bình thường thì khi đọc đoạn code trên chúng ta hoàn toàn có thể hiểu mục đích của bài toán.
## Implicit
Ta hoàn toàn có thể sử dụng `Array.map` như sau:
```js
const squareAll = (numbers) => (numbers.map(num => num * num));

squareAll([1, 2, 3, 4]); // [1, 4, 9, 16]
```
Về mức độ ngắn gọn thì các bạn rõ ràng nhận thấy khi so sánh 2 đoạn code trên. Điều này là tốt rồi tuy nhiên ta vẫn cần gọi mảng `numbers` theo cách thủ công. Xem đoạn sau thì sao?
```js
const map = require('lodash/fp/map');

const squareAll = map(num => num * num);

squareAll([1, 2, 3, 4]); // [1, 4, 9, 16]
```
Ta nhận thấy rằng đối số chỉ thay đổi vị trí từ `map(array, function)` sang `map(function, array)`. Một lợi ích của việc dùng `fp` chính là đoạn mã ngắn hơn, có khả năng kiểm thử và bảo trì tốt hơn. Ở phần tiếp theo chúng ta lại tiếiểm qua một số thuật ngữ hay được nhắc đến như là 'curried' và 'point-free'.
# A delicious curry
`Currying` là một hàm mong muốn số lượng tham số truyền vào là nhất định. Còn trong trường hợp có ít tham số được truyền vào thì nó sẽ trả về một hàm với mục đích chờ các đối số còn lại cho đến khi đủ số lượng mong muốn và thực hiện hàm. Chỉ khi nó nhận đủ các tham số như mong muốn thì kết qủa sẽ được trả về. Còn trong trường hợp bình thường bạn cung cấp đủ các tham số cần thiết cho nó cùng một lúc thì hàm đấy vẫn hoạt động bình thường và trả về kết quả.

```js
const curry = require('lodash/fp/curry');

const greet = curry((greeting, name) => `${greeting}, ${name}!`);

// Passing both arguments allows the function to work as normal
console.log(greet('Hello', 'Hieu')); // Hello, Hieu!

// Passing fewer however, returns another function
const sayBye = greet('See ya');

// And once it receives all its arguments, it returns a value
console.log(sayBye('Hiu')); // See ya, Hiu!;
```
> The lodash/fp module promotes a more functional programming (FP) friendly style by exporting an instance of lodash with its methods wrapped to produce immutable auto-curried iteratee-first data-last methods.
> 
Đoạn trên mình xin phép lấy nguyên doc ở [FP Guide](https://github.com/lodash/lodash/wiki/FP-Guide).

Với ý tưởng như trên, ta có thấy lý do tại sao mà ở ví dụ `squareAll` cuối cùng cho phép ta truyền logic để ánh xạ trước và sau đó gọi nó bằng một mảng ở sau. Ta có thể viết như sau:
```js
map(num => num * num)([1, 2, 3, 4]); // [1, 4, 9, 16]
```
## Compose yourself
Ý tưởng của `composing` (hàm `flow` trong `lodash`) chính là xây dựng một hàm từ nhiều hàm nhỏ hơn. Dữ liệu được đưa vào một đầu và đi qua các function cho đến cuối cùng nó đưa ra kết quả. Mỗi kết quả của function trước thì chính là đầu vào cùa function tiếp theo.
```js
const flow = require('lodash/fp/flow');
const escape = require('lodash/fp/escape');
const trim = require('lodash/fp/trim');

const convertEscape = flow(escape, trim);

convertEscape('    <html>    '); // &lt;html&gt;
```
Ở đoạn mã trênúng ta đã tạo một hàm `convertEscape` từ `escape` và `trim`. Với hàm này, ta truyền tham số đầu vào là chuỗi HTML nó sẽ thực hiện 2 hàm này trước khi cho ta kết qủa cuối cùng. 
## Lợi ích của hàm currying
Các hàm trong `lodash/fp` đều là `auto-curried`. Do vậy khi tuyền vào ít tham số hơn mong đợi thì nó sẽ trả về một hàm. Hãy xem tiếp một ví dụ của `flow`:
```js
const flow = require('lodash/fp/flow');
const get = require('lodash/fp/get');
const isEqual = require('lodash/fp/isEqual');

const data = {
  items: 45
};

const hasAllItems = flow(get('items'), isEqual(45));

hasAllItems(data) // true
```
Ở ví dụ trên, chúng ta sử dụng 2 hàm `get` và `isEqual` với các tham số truyền vào. Nếu 2 hàm này tách biệt ra thì không có gì để quan tâm nhiều. Nhưng hãy xem cách mà `flow` kết hợp chúng lại. Và kết quả của `hasAllItems` chính là một `dòng chảy` cho ta kết quả được thực hiện bởi cả 2 hàm.
# Point-free programming
> Tacit programming, also called point-free style, is a programming paradigm in which function definitions do not identify the arguments (or "points") on which they operate. Instead the definitions merely compose other functions, among which are combinators that manipulate the arguments.
> 
> Nguồn: [Wikipedia](https://en.wikipedia.org/wiki/Tacit_programming)
 
Ta hiểu như trên rằng định nghĩa hàm không xác định đối số mà chỉ là các tổ hợp thao tác với các đối số.

Xem ví dụ sau:
```js
const isSuccess = (response) => {
  if (response.status === 200) {return true;}
}

isSuccess(response);
```
Nhưng ta hoàn toàn có thể sửa lại như sau:
```js
const isSuccess = flow(get('status'), isEqual(200));

isSuccess(response);
```
Point-free mang lại cho chúng ta một vài ưu điểm. Nó khuyến khích chúng ta viết các function nhỏ hơn, dễ kiểm tra và có khả năng tái sử dụng trong ứng dụng của bạn.

# Kết luận
Bài viết cuối cùng trong loạt bài về Functional Programming chính là để giới thiệu một số những ví dụ khi sử dụng `lodash/fp`. Tuy có thể kiến thức mình vẫn hơi mỏng nhưng mong rằng không xảy ra sai sót quá lớn khi viết về FP trong Javascript trong những bài vừa rồi. Cảm ơn mọi người đã theo dõi. Mong rằng tiếp theo mình có thể viết về những cái kiến thức bổ ích hơn nữa.

**Tham khảo**

https://github.com/lodash/lodash/wiki/FP-Guide
https://en.wikipedia.org/wiki/Tacit_programming

**Xào lòng một tí ở đây**

Đến đây thì thấy mình biết rằng nên kết thúc bài viết được rồi :laughing: . Chuỗi ngày tháng mà bản thân tìm hiểu về Functional Programming làm bản thân nhận ra nhiều điều tuyệt vời mà nó có thể thực hiện được. Nếu vẫn với cái lối tư duy cũ thì chắc vẫn ổn nhưng biết về FP làm mình thật sự thấy vui. Tìm hiểu về nó chỉ vì một sự khó chịu khi phải đọc code để fix bug. Nhưng giá trị khi biết về nó thì cũng thật bớt phần nào cái khó chịu kia (thực ra là thầm cảm ơn người đã viết ra code trong dự án :smiley: :heart: : ).