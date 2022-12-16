Có nhiều phần mở rộng mới cho đối tượng mảng trong ES6. Trong bài viết này mình một số hàm xử lý mảng mới trong ES6 như `Array.of()`, `Array.from()`, `Array.fill()`, `Array.find()`, `Array.findIndex()`, `Array.copyWithin()`, `Array.entries()`, `Array.keys()`, và `Array.values()`. Các functions này giúp cho việc xử lý mảng dễ dàng hơn và chúng thay thế một số function của các thư việc bên ngoài.
## Array.of()
Để hiểu về function mới này, trước tiên chúng ta hãy xem một cách giải quyết nhỏ lạ trong ES5 liên quan đến việc sử dụng hàm tạo Array. Chúng ta hãy tạo một mảng `prices` sau đó xem độ dài của mảng
```
let prices = Array(5000);
console.log(prices.length);
 
// 5000
```
Khi mã chạy, nó cho chúng ta biết rằng chúng ta có một mảng với độ dài 5000, đúng vậy trong ES5 nếu bạn chuyển chỉ một giá trị cho hàm tạo mảng là số, một mảng có kích thước đó sẽ được tạo. Và ES6 đã sinh ra `Array.of()` để tạo 1 mảng nếu bạn chuyển một giá trị vào mảng là số thì sẽ tạo ra 1 mảng 1 giá trị là số đó
```
let prices = Array.of(5000);
console.log(prices.length);
 
// 1
```
## Array.from()
Hãy xem cách mà function này hoạt động. Dưới đây chúng tôi đã thiết lập một mảng với ba giá trị 500, 700 và 1000. Trên dòng thứ hai, chúng ta gọi Array.from () và truyền vào đối số đầu tiên và một arrow function là đối số thứ hai. Bằng cách chạy mã, chúng ta thấy rằng giá hiện bị đánh thuế ở mức 5 phần trăm. `Array.from ()` tạo ra một mảng hoàn toàn mới dựa trên mảng `prices`, và đối với mỗi phần tử trong mảng đó, arrow function được gọi. Vì vậy, về cơ bản, chúng tôi lấy mỗi giá và nhân nó với 1,05 biểu thị mức thuế suất là 5 phần trăm.
```
let prices = [500, 700, 1000];
let taxed = Array.from(prices, price => price * 1.05);
console.log(taxed);
 
// [525, 735, 1050]
```
**Dùng Array.from() với 3 đối số**

Trong ví dụ trước, chúng ta đã truyền hai đối số cho hàm `Array.from()`. Đầu tiên là mảng chúng tôi đang làm việc và thứ hai là một hàm. Trong ví dụ này, chúng ta sẽ truyền một mảng, một hàm và cả một object. Giả sử bạn có một trang web liệt kê các mặt hàng để bán, nhưng với mỗi mặt hàng được bán, bạn phải trả một khoản phí niêm yết là 5 đô la. Hãy cùng xem cách tính toán này

```
let prices = [500, 700, 1000];
let totalprice = Array.from(prices, function (price) {
    return price + this.listingfee;
}, {listingfee: 5});
 
console.log(totalprice);
 
// [505, 705, 1005]
```
Điều đang xảy ra ở đây là đối số thứ ba cho `Array.from()` là một đối tượng trở thành `this` trong hàm. Đó là lý do tại sao chúng tôi có thể lấy `price` và thêm `this.listingfee` để cung cấp cho chúng tôi tổng giá. Lưu ý rằng khi sử dụng kỹ thuật này, chúng ta cần sử dụng một hàm tiêu chuẩn trái ngược với arrow function cho đối số thứ hai của `Array.from()`. Điều này là do các arrow functions không cho phép kết hợp với giá trị `this`

## Array.fill()
ES6 hiện cung cấp cho bạn một cách dễ dàng để điền vào một mảng bằng `Array.fill()`. Hãy để xem một ví dụ nhanh chóng.
```
let prices = [500, 700, 1000];
prices.fill(2000);
console.log(prices);
 
// Array [ 2000, 2000, 2000 ]
```
Có vẻ như hàm này sẽ ghi đè lên bất kỳ giá trị hiện có nào trong tất cả các keys của mảng với giá trị được cung cấp. Ngoài ra còn có một tùy chọn chuyển một đối số thứ hai cho `Array.fill()` để bắt đầu tại một index cụ thể. Hãy để xem cách làm điều đó.
```
let prices = [500, 700, 1000];
prices.fill(2000, 2);
console.log(prices);
 
// Array [ 500, 700, 2000 ]
```
Bằng cách chuyển giá trị của 2 làm đối số thứ hai, chúng ta đang nói hàm `fill` bắt đầu điền vào mảng ở chỉ mục thứ 2. Vì chỉ số bắt đầu của mảng là 0 dựa trên những gì chúng ta biết, nó là giá trị thứ ba trong mảng của chúng ta được ghi đè bằng giá trị 2000.
Bây giờ, tại sao chỉ vượt qua hai đối số khi ta có thể vượt qua ba đối số?! Ở đây chúng ta sẽ chuyển một đối số khác cho `Array.fill()`. Điều này sẽ chứng minh rằng đối số thứ hai chỉ định chỉ mục nào sẽ bắt đầu và đối số thứ ba chỉ định nơi dừng lại. Kiểm tra nó ngay.
```
let prices = [500, 600, 700, 800, 900, 1000, 1500];
prices.fill(2000, 2, 4);
console.log(prices);
 
// Array [ 500, 600, 2000, 2000, 900, 1000, 1500 ]
```
Chúng ta đã thêm một vài giá trị vào mảng ban đầu để dễ dàng hơn khi xem cách thức hoạt động của nó. Lưu ý rằng chúng ta bắt đầu điền vào giá trị 2000 ở chỉ số 2 và dừng ở chỉ số 4 thì thưc sự dừng lại là index số 3 trước 1 giá trị. Đó là lý do tại sao bạn chỉ thấy index 2 và 3 thay đổi.
## Array.find()
Là một function mới khác được thêm vào mảng trong ES6. Bạn có thể sử dụng nó để dễ dàng tìm thấy một giá trị trong một mảng đáp ứng một tiêu chí nhất định. Hãy xem cách nó hoạt động
```
let prices = [500, 600, 700, 800, 900, 1000, 1500];
let result = prices.find(price => price > 777);
console.log(result);
 
// 800
```
Lưu ý truyền một arrow function vào function `find()`. Hàm đó được áp dụng đối với mọi phần tử trong mảng và ngay khi tìm thấy một giá trị đáp ứng các tiêu chí, giá trị đó được trả về, nó không tiếp tục trả về tất cả các giá trị đáp ứng các tiêu chí. Đây là lý do tại sao chúng tôi chỉ nhận được một kết quả trong ví dụ này. Hãy lướt qua ví dụ này một lần nữa để thấy nó hoạt động.
```
let prices = [500, 600, 700, 800, 900, 1000, 1500];
let result = prices.find(price => price < 777 && price > 600);
console.log(result);
 
// 700
```
## Array.findIndex()
Ngoài `Array.find()`, giờ đây chúng ta cũng có hàm `Array.findIndex()` hoạt động theo cách tương tự nhưng thay vì trả về giá trị, nó trả về chỉ mục. Hãy để xem cách nó hoạt động.
```
let prices = [500, 600, 700, 800, 900, 1000, 1500];
let result = prices.findIndex(function (price) {
    return price == this;
}, 1000);
console.log(result);
 
// 5
```
Ở đây chúng tôi sử dụng một hàm JavaScript thông thường được truyền vào hàm `.findIndex()`. Chúng chỉ đơn giản trả lại kết quả của giá bằng với `this`. giá trị này được đặt thành 1000, là đối số thứ hai của `.findIndex()`. Chúng ta có thể thấy rằng giá trị của 1000 nằm ở chỉ số 5 của mảng bắt đầu từ 0.
## Array.copyWithin()
`Array.copyWithin()` là một bổ sung thú vị trong ES6. Với nó, bạn có thể sao chép các giá trị bên trong mảng. Nó lấy một giá trị từ một chỉ mục và đặt nó vào một chỉ mục khác. Đây là một ví dụ.
```
let prices = [500, 600, 700, 800, 900, 1000, 1500];
prices.copyWithin(3, 1);
console.log(prices);
 
// Array [ 500, 600, 700, 600, 700, 800, 900 ]
```
Chìa khóa để hiểu `copyWithin()` là ý nghĩa của các đối số. Đối số thứ nhất là chỉ mục sẽ được ghi đè, đó là nơi dữ liệu sẽ được sao chép vào, đối số thứ hai là dữ liệu để sao chép từ. Vì vậy, trong ví dụ của chúng ta, chúng ta đang nói rằng chúng ta sẽ sao chép dữ liệu tại chỉ mục 1 (600) và dán nó vào chỉ mục 3 (800). Sau khi chương trình chạy, chúng ta thấy chỉ số 3 không còn là 800, mà là 600. Nó đang làm việc như mong đợi. Ngoài ra còn có tùy chọn truyền đối số thứ ba cho `copyWithin()`. Đối số thứ ba này cho chúng ta biết có bao nhiêu mục để sao chép. Hãy để xem cách nó hoạt động.
```
let prices = [500, 600, 700, 800, 900, 1000, 1500];
prices.copyWithin(2, 0, 3);
console.log(prices);
 
// Array [ 500, 600, 500, 600, 700, 1000, 1500 ]
```
Chỉ mục đích là 2 hoặc giá trị thứ ba trong mảng. Chúng ta bắt đầu sao chép từ chỉ mục 0 hoặc giá trị đầu tiên trong mảng. Chúng ta sẽ sao chép ba giá trị liên tiếp bắt đầu từ chỉ số 0. Vì vậy, kết quả hiển thị chính xác 500 ở vị trí chỉ mục thứ 2, theo sau là hai giá trị được sao chép bổ sung là 600 và 700. Chỉ số 5 và 6 không bị ảnh hưởng và do đó chúng chứa các giá trị ban đầu là 1000 và 1500.
## Array.entries()
Hàm `Array.entries()` là một bổ sung tuyệt vời cho ngôn ngữ. Nó lấy 1 array và tạo một danh sách để nói về từng mục. Hãy xem nó hoạt động
```
let words = ['Lenovo', 'Tablet', 'Coffee'];
console.log(words.entries());
 
// Array Iterator {  }
```
Đầu tiên bạn tạo một array đơn giản là `words`. Sau đó chúng ta gọi `.entries()` và kết quả của nó là một array iterator. Hmm, chúng ta có thể gọi hàm .next () trên các trình vòng lặp hãy gọi để xem thử
```
let words = ['Lenovo', 'Tablet', 'Coffee'];
console.log(words.entries().next());
 
// Object { value: Array[2], done: false }
// The Array held in value contains 0: 0 and 1: Lenovo
```
Tuyệt vời! Chúng ta có thể thấy rằng chúng ta có được danh sách đầu tiên để nói về mảng.Đối tượng iterator không được thực hiện, vì vậy nó được đặt thành `false`. Tuy nhiên, `value` là một mảng chứa hai giá trị. Tại chỉ số 0 của mảng đó là chỉ số nơi Lenovo nằm, đó là chỉ số 0, tại chỉ số 1 là giá trị của chính nó, đó là `Lenovo`. Thêm 1 ví dụ nữa để hiểu rõ hơn
```
let words = ['Lenovo', 'Tablet', 'Coffee'];
console.log(...words.entries());
 
// Array [ 0, "Lenovo" ] 
// Array [ 1, "Tablet" ] 
// Array [ 2, "Coffee" ]
```
Hàm `.entries()` cung cấp cho chúng ta cặp index / value của mảng.
## Array.keys()
`Array.keys()` hoạt động theo cách tương tự với `Array.entries()` ngoại trừ việc nó chỉ cung cấp các khóa của mảng. Xem nó trong hành động.
```
let words = ['Lenovo', 'Tablet', 'Coffee'];
console.log(...words.keys());
 
// 0 1 2
```
## Array.values()
Cuối cùng, chúng ta có hàm `Array.values()` tương tự như hai ví dụ trước nhưng chỉ cung cấp các value. Quan sát nó hoạt động.
```
let words = ['Lenovo', 'Tablet', 'Coffee'];
console.log(...words.values());
 
// Lenovo Tablet Coffee
```

## Lời kết
Trên đây là những hàm xử lý mảng mới trong ES6 nó góp phần giảm bởi gánh nặng làm việc với các mảng như đã được thực hiện trong ES5. Mình hy vọng nó sẽ giúp ích cho các bạn.