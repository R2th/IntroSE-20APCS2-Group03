### Giới thiệu
Nếu mọi người từng lập trình nhiều bằng Javascript, trên nền tảng Node.js, chắc đã nhiều người biết đến thư viện [Lodash](https://lodash.com/). Đây là 1 thư viện rất mạnh mẽ viết bằng Javascript, chứa rất nhiều những hàm utility, cực kỳ hữu ích và tiện lợi nếu bạn muốn xử lý các thao tác với data, object, strings, number hay các array..... Bên cạnh đó Lodash đảm bảo về performance ở nhiều trường hợp cũng như các đoạn code của bạn viết 1 cách an toàn hơn trong những tính huống null, undefined data...
Tuy nhiên ngày hôm nay tôi sẽ không nói về Lodash bình thường mọi người hay dùng, mà là Lodash FP, viết lodash theo kiểu lập trình hướng Function, 1 cách viết code và tư duy khá là hay nếu bạn quen dần với nó trong 1 thế giới toàn OOP
### Tại sao lại dùng Lodash FP
Nghe đến đây nhiều người sẽ thắc mắc tại sao chúng tại lại quay lại thời cổ lỗ lập trình Functional mà không phải là OOP. Đầu tiên bạn có thể đã từng nghe đến 3 nhà toán học, và các lý thuyết toán của họ: Haskell Curry với combinatory logic, Alonzo Church phát triển lambda calculus, and Alan Turing nghĩ ra Turing machine. Đây chính là những nền móng đầu tiên tạo nên sức mạnh của FP. Hai đặc tính pure và immutable rất đặc trưng của FP giúp code trở nên an toàn và đơn giản hơn. Lan man đủ rồi, một trong những điểm lợi của Lodash FP đó là giúp chúng ta chuyển 1 code rõ ràng sang code ẩn. Nghe có vẻ hơi mơ hồ nhỉ, code rõ ràng phải tốt hơn chứ nhỉ. Chúng ta hãy cùng xem 3 ví dụ để tăng các phẩn tử của 1 mảng lên 1
Đoạn code 1, sử dụng cách viết đơn giản rõ ràng nhất:
```Javascript
function increaseOne(numbers) {
  var array = [];
  for (var i = 0; i < numbers.length; i++) {
    array.push(numbers[i] + 1);
  }
  return array;
}

increaseOne([1, 2, 3, 4]); // [2, 3, 4, 5]
```
Đoạn code trên khá là tường minh, tuy nhiên viết khá dài dòng, rối rắm, rất có thể sẽ gây ra lỗi tuỳ theo mức độ phức tạp của function
Đoạn code thứ 2 sử dụng Array.map():
```Javascript
function increaseOne(numbers) {
  return numbers.map(num => num + 1);
}

squareAll([1, 2, 3, 4]); // [2, 3, 4, 5]
```
Đoạn code đã ngắn gọn hơn bằng cách sử dụng Array.map()
Tuy nhiên, dùng Lodash FP thì sao
```Javascript
const map = require('lodash/fp/map');

const increaseOne = map(num => num * num);

increaseOne([1, 2, 3, 4]); // [2, 3, 4, 5]
```
Hãy xem xét 1 chút nào, qua 3 trên chúng ta có thể thấy mức độ phức tạp của đoạn code đã giảm đi đáng kể, ngẵn gọn và rất dễ đọc hiểu, hạn chế lỗi có thể xảy ra. Đó chính là cách code ẩn giấu lại tốt hơn code phơi bày. Thay vì 1 đoạn code chỉ ra nó thực hiện như thế nào, nó chỉ cho người đọc thấy nó thực hiện cái gì, đó chính cách mà FP làm code sẽ dễ hiểu, cũng dễ maintain mà ko cần đến comment, bản thân chính function đã cho chúng ta biết được nó làm gì.
Đây chỉ là 1 ví dụ đơn giản, với những trường hợp phức tạp bạn sẽ thấy khác biệt nhiều hơn.
### Đặc tính
Nhìn ví dụ trên, chúng ta thấy LodashFP thay vì sử dụng việc gọi 1 hàm và truyền vào tất cả các tham số cần thiết, nó gọi hàm đấy với mỗi lần chỉ 1 tham số. Kết quả trả về sẽ là 1 function với tham số là tham số thứ 2. Ví dụ thay vì gọi 1 hàm `map(array, function)`, chúng ta sẽ gọi `map(function)(array)`. Từ đây có thể thấy các hàm của Lodash FP có những đặc tính sau:<br>
**Immutable**<br>
Các hàm không làm thay đổi bất kỳ đối số nào của chúng.<br>
**Auto-Curried**<br>
Truyền vào các đối số ít hơn, hàm chấp nhận sẽ chỉ trả về một hàm khác. Hàm đó mong đợi phần còn lại của các đối số. Ví dụ: <br>
```Javascript
const object = { foo: 1, bar: 2 };

_.pick(['foo'], object);
//{ foo: 1 }

_.pick(['foo'])(object);
//{ foo: 1 }
```
2 đoạn code trên trả về cùng 1 kết quả, dù lời gọi hàm có khác nhau. Điều này rất hữu ích khi tạo các hàm với đối số được xác định trước bỏ qua việc thực hiện chúng như thế nào.<br>
**Iteratee-first Data-last**<br>
 Thông thường bạn truyền những gì bạn sẽ làm vào dữ liệu của mình làm đối số cuối cùng. Đối với các hàm mảng, trong FP bạn đi qua nó đầu tiên!<br>
Điều cuối cùng mà hàm mong đợi là dữ liệu. Cho phép bạn xác định hàm sẽ làm gì trước, gán nó cho một biến, sau đó mới cung cấp cho nó dữ liệu trong một hàm tổng hợp (hoặc chính nó). Như vậy các tham số trong 1 hàm Lodash FP sẽ có có thứ tự giống như Lodash bình thường, ví dụ:<br>
```Javascript
//Lodash
_.map(collection, fn);

//Lodash/FP
_.map(fn, collection);
```
**Arguments**<br>
Những tham số được giới hạn, để tránh những trường hợp 1 số hàm có tham số optional. Ví dụ trong Lodash hàm `merge` có thể gọi bao nhiêu tham số tuỳ thích, tuy nhiên với Lodash FP giới hạn của `merge` chỉ là 2<br>
Đây là 1 trường hợp cần giới hạn với hàm có tham số optional như `parseInt`:
```Javascript
// The `lodash/map` iteratee receives three arguments:
// (value, index|key, collection)
_.map(['6', '8', '10'], parseInt);
// ➜ [6, NaN, 2]

// The `lodash/fp/map` iteratee is capped at one argument:
// (value)
fp.map(parseInt)(['6', '8', '10']);
// ➜ [6, 8, 10]
```
### Thực hiện
Như các bạn biết thì Lodash hỗ trợ 1 số hàm như `flow` hay `compose` ở trong Lodash FP, giúp cho chúng ta sử lý nhiều thao tác liên tiếp 1 các rất đơn giản. Kết hợp với kiểu viết của Lodash FP, chúng ta sẽ có cách code hết sức đơn giản và dễ hiểu. Ví dụ như sau:
Chúng ta có 1 list các dữ liệu contact dưới dạng:
```
{
  firstName: 'justin',
  lastName: 'fuller',
  phone: '1234568490'
}
```
Cần lọc ra những contact có phone tồn tại và là duy nhất (ko trùng nhau), và search theo `firstName`, số phone cần được viết theo định dạng: `(xxx)xxx-xxxx`. Ta có đoạn code sau:
```Javascript
import fp from ‘lodash/fp’;
const data = [ /* data here **/ ];
const formatPhone = c => ({
  ...c,
  phone: `(${c.phone.slice(0, 2)})${c.phone.slice(3, 5)-${c.phone.slice(6)}}`
});
const formatData = fp.compose(
  fp.map(formatPhone),
  fp.uniqBy('phone'),
  fp.filter('phone'),
  fp.sortBy('firstName'),
);
```
Rất ngắn gọn phải không nào.<br>
Một ví dụ khác là trong 1 user có thể làm cho freelance cho nhiều công ty khác nhau, trong 1 loạt những hợp đồng được ký bởi các công ty, chúng ta cần lấy tất cả những công ty của 1 user nào đó có trong danh sách các hợp đồng. Có đoạn code như sau:
```Javascript
　const contracts = [ //contract list ];
    const user = { //user data };
    const companies = flow([
      map(contract => [contract.company1, contract.company2]),
      flatten,
      intersectionBy('Id')(user.companies),
      sortBy(['name']),
    ])(contracts);
```
Sử dụng `flow` với Lodash FP khá là ngon nghẻ đúng không nào.
### Kết luận
Qua bài viết tôi giới thiệu về Lodash FP như là 1 ví dụ của việc viết code theo phong cách Functional Programming. Mỗi cách lập trình có ưu và nhược điểm riêng, tuy nhiên FP vẫn luôn có chỗ đứng bởi những lợi ích mà nó mang lại.<br>
References:<br>
https://simonsmith.io/dipping-a-toe-into-functional-js-with-lodash-fp <br>
http://blog.diovani.com/technology/2017/01/25/functional-programming-with-lodash-fp.html <br>
https://github.com/lodash/lodash/wiki/FP-Guide <br>
https://hackernoon.com/function-composition-with-lodash-d30eb50153d1 <br>