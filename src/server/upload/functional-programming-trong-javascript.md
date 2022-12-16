Vào một ngày đẹp trời trong khi bạn đang hùng hục ngồi fix bug cho dự án maintain từ 2 năm trước. Tìm loạn hết lên thì bạn cũng tìm ra chỗ cần sửa (ngonroi). Mặc dù nó cũng chỉ là đoạn code sử dụng hàm `find` của `lodash`, tuy nhiên nó lại chả bình thường tí nào. 
```js
find(item => item.id === favoriteId)(user.favorites)
```
Đoạn code trên tất nhiên đã được custom để không bị lộ =)). Mò [doc](https://lodash.com/docs/#find) của lodash thì nó như này cơ mà:
```js
_.find(collection, [predicate=_.identity], [fromIndex=0])
```
Có vẻ hơi khác. Đi hỏi một người anh thì ra được câu trả lời:
> Là cái find của lodash fp (think) viết bình thường thì nó như này:
```js
find(user.favorites, item => item.id === favoriteId)
```
> Lodash mà viết kiểu functional programming, thứ tự parameter nó ngược lại thôi. Tại chưa quen thôi mà, anh nhìn mấy cái generator của saga cũng có hiểu m* gì đâu.
Ok men, có vẻ sống rồi. :smile: .

À trên đấy chỉ là dẫn chuyện cho lý do hôm nay mình viết bài này. Chính là về functional programming.

# Functional programming?
> Functional programming (FP) là một mô hình lập trình - một phong cách xây dựng cấu trúc và các yếu tố của chương trình máy tính - coi việc tính toán là đánh giá các hàm toàn học và tránh thay đổi trạng thái cũng và dữ liệu có thể thay đổi. - Dịch từ [Wikipedia](https://en.wikipedia.org/wiki/Functional_programming).

FP là quá trình xây dựng phần mềm bằng việc sử dụng các pure function, tránh trạng thái chia sẻ, dữ liệu thay đổi và side-effects. FP là khai báo chứ không bắt buộc và trạng thái ứng dụng đi qua các pure function. Đối lập với lập trình hướng đối tượng, trong đó trạng thái ứng dụng thường được chia sẻ và kết hợp với các phương thức trong các đối tượng.

FP là một mô hình lập trình, nghĩa là nó là một cách suy nghĩ về xây dựng ứng dụng phần mềm dựa trên các nguyên tắc căn bản nói đến ở trên. Để nói về các ví dụ về mô hình lập trình thì ta có thể nói đến lập trình hướng đối tượng (Object Oriented Programming) hay lập trình thủ tục (Procedural Programming). 

# Các khái niệm
## Pure functions
Một khái niệm cơ bản mà đầu tiên để bạn có thể hiểu về FP chính là pure functions. 
* Nó là hàm trả về kết quả giống nhau nếu truyền vào các tham số giống nhau.
* Nó không gây ra bất kỳ side effects nào.

Giả sử rằng chúng ta cần có một hàm với chức năng là tính diện tích hình tròn. Với một impure function thì sẽ nhận bán kính làm tham số, và sau đó thực hiện tính toán với công thức `radius * radius * PI`. 
```js
const PI = 3.14;

const calculateArea = (radius) => radius * radius * PI;

calculateArea(10); // returns 314.0
```
Ở hàm trên nó sử dụng biến toàn cục là PI chứ không sử dụng nó như là một tham số truyền vào hàm. Với việc nếu có sự thay đổi giá trị số PI thì sẽ làm kết quả bị thay đổi. Sửa lại một tí như sau:
```js
const PI = 3.14;

const calculateArea = (radius, pi) => radius * radius * pi;

calculateArea(10, PI); // returns 314.0
```
Hay một ví dụ khác về impure function là hàm tạo số ngẫu nhiên.
```js
const randomText = () => {
     if (Math.random() > 0.5) {
         return 'Yes';
     } else {
         return 'No';
     }
}
```
Thêm một ví dụ về hàm truyền 1 giá trị số nguyên làm tham số và trả về kết quả tăng thêm 1 đơn vị.
```js
let counter = 1;

const increaseCounter = (value) => {
  counter = value + 1;
}

increaseCounter(counter);
console.log(counter); // 2
```
Hàm trên đúng là đã trả về giá trị tăng thêm 1 đơn vị tuy nhiên nó lại làm thay đổi biến `counter`. Ta thử sửa hàm về thành pure function như sau:
```js
let counter = 1;

const increaseCounter = (value) => value + 1;

increaseCounter(counter); // 2
console.log(counter); // 1
```
Kết quả trả về vẫn là tăng thêm 1 đơn vị tuy nhiên giá trị `counter` vẫn được giữ nguyên, không bị thay đổi. 

Việc sử dụng pure function giúp chúng ta có thể dễ dàng test hơn rất nhiều. Ta không cần mock bất cứ thứ gì mà vẫn có thể thực hiện hàm test một cách đơn giản. 
## Immutability - Bất biến
Là tính chất không thay đổi theo thời gian hoặc không bao giờ bị thay đổi.

Một đối tượng immutable là đối tượng có thể được sửa dổi sau khi nó được tạo ra. Ngược lại một đối tượng mutable là bất kỳ đối tượng mutable là bấ kỳ đối tượng nào cũng có thể được sửa đổi sau khi nó được tạo ra. Immutability là một khái niệm trung tâm của FP bởi vì không có nó thì luồng dữ liệu trong chương trình của bạn sẽ bị mất. 

Trước khi tìm hiểu về FP thì mình vẫn cho rằng `const` trong JS là thuộc tính `immutability` được nhắc đến ở đây. Điều này có vẻ đúng vì giá trị của `const` không bị thay đổi sau khi tạo. Tuy nhiên `const` lại không tạo ra các đối tượng bất biến. Bạn vẫn có thể thay đổi các thuộc tính của đối tượng. Đối tượng bất biến là không thể thay đổi. Bạn có thể sử dụng `freeze` để làm cho giá trị của một đối tượng thực sự là bất biến. 
```js
const a = Object.freeze({
  foo: 'Hello',
  bar: 'world',
  baz: '!'
});
console.log(a); // { foo: 'Hello', bar: 'world', baz: '!' }

a.foo = 'Goodbye';
console.log(a); // { foo: 'Hello', bar: 'world', baz: '!' }
```
Bạn có thể dễ dàng nhận ra là giá trị thuộc tính `foo` của đối tượng `a` không bị thay đổi. Tuy vậy thì các đối tượng được tạo bởi `freeze` cũng chỉ bất biển ở bề ngoài. Với ví dụ dưới đây thì nó lại bị thay đổi.
```js
const a = Object.freeze({
  foo: { greeting: 'Hello' },
  bar: 'world',
  baz: '!'
});

a.foo.greeting = 'Goodbye';

console.log(`${ a.foo.greeting }, ${ a.bar }${a.baz}`); // Goodbye, world!
```
Bạn có thể thấy rằng thuộc tính cha không bị thay đổi còn đối với các thuộc tính con thì ta vẫn dễ dàng thay đổi cho dù nó đã sử dụng `freeze`. 

Để giải quyết vấn đề này thì ở trong nhiều ngôn ngữ lập trình FP sử dụng các cấu trúc dữ liệu bất biến đặc biệt. Có một số thư viện có thể nhắc đến như là [Immutable.js](https://immutable-js.github.io/immutable-js/) hay [Mori](http://swannodette.github.io/mori/).

# Tạm kết
Bài có vẻ cũng hơi không dài lắm nhưng mà để mà viết hết nữa thì lại quá dài nên là ở những vấn đề tiếp theo như là:
* Referential transparency
* Functions as first-class entities
* Higher-order functions

Mình sẽ nói đến ở bài tiếp theo. Mong là bài viết không quá khó hiểu. Cảm ơn mọi người đã theo dõi :bowing_woman: .