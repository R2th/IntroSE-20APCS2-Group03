Xin chào các bạn,

Vẫn như thường lệ, đã tới giờ lên sóng để chia sẻ với các bạn các thủ thuật JS "xịn xò" mà mình lượm nhặt được. Với phương châm <b>"nghỉ dịch corona chứ không nghỉ trau dồi kiến thức"</b>, mình mong các bạn đã, đang và có thể sẽ theo dõi series của mình để lại comment góp ý và upvote để mình có động lực tiếp tục viết nhé! Và nếu như các bạn chưa đọc 4 phần trước thì thử ngó qua xem các tips của mình có gì hay ho nào:

[[JS tips series] Các "chiêu trò" JS tưởng không hay mà hay không tưởng](https://viblo.asia/s/cac-chieu-tro-js-tuong-khong-hay-ma-hay-khong-tuong-DVK2jDyjKLj)

Và trong kì này, để dần dần có thể "kiểm soát" JS một cách tốt hơn, mình sẽ chia sẻ với các bạn một số thủ thuật dễ có khó có liên quan tới mảng trong JS nhé. Let's go!

![](https://images.viblo.asia/287b8bb0-9328-4351-ad21-275fd67874fd.png)

<h2>1. Kiểm tra hai mảng có cùng nội dung hay không</h2>

Một bài toán vô cùng quen thuộc mà mình cá là  hầu hết các bạn cũng đã từng gặp nó ít nhất một lần trong đời. Mình sẽ phát biểu lại đề bài như sau: <em>"Cho hai mảng ```a``` có n phần tử và ```b``` với m phần tử, hãy kiểm tra xem hai mảng trên có nội dung giống nhau hay không".</em>

Ví dụ một chút cho hiểu đề hơn nhé:
```javascript
// Case 1
a = [1, 2, 3]
b = [1, 2, 3]
// => a và b giống nhau

// Case 2
a = [1, 2, 5, 0]
b = [0, 5, 1, 2]
// => a và b giống nhau

// Case 3
a = [1, 2, 3]
b = [1, 2, 5]
// => a và b KHÔNG giống nhau

// Case 4
a = [1, 2, 3]
b = [1, 2]
// => a và b KHÔNG giống nhau
```

Như lẽ thường thì chúng ta sẽ duyệt lần lượt mảng ```a```, với mỗi phần tử của ```a``` ta lại xem xem nó có trong mảng ```b``` hay không. Nếu không có thì dừng việc duyệt lại và kết luận và 2 mảng này không giống nhau. Còn không, nếu như duyệt xong mảng ```a```, ta cần làm tương tự với các phần tử của mảng ```b``` rồi đưa ra kết luận rằng hai mảng là giống nhau hay không.

Thật là phức tạp và hơi đau đầu chút. Nhưng may thay, JS có một số thứ hỗ trợ để chúng ta implement việc này chỉ trong khoảng 30s thôi! Đó chính là dùng ```Set``` và ```filter```. Cùng xem nhé:
```javascript
const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter(e => e === v).length !== b.filter(e => e === v).length) return false;
  return true;
};

haveSameContents([1, 2, 4], [2, 4, 1]); // true
haveSameContents([1, 2, 3], [1, 2, 5]); // false
haveSameContents([1, 2, 3], [1, 2]); // false
```

Đơn giản hơn nhiều rồi phải không nào! Chú ý là mảng áp dụng trong trường hợp này là mảng số, hoặc chuỗi nhé, chứ mảng object là thua ngay đấy :D. Còn một chú ý nữa là hàm ```haveSameContents(a, b)``` này không check được các mảng đa chiều phức tạp đâu nhé, chỉ áp dụng cho mảng một chiều mà thôi, mảng đa chiều thì mình xin hóng comment của cao nhân phía dưới bài này, rất mong các bạn chia sẻ.

<h2>2. Kiểm tra mảng này có nằm trong mảng kia hay không</h2>

Kiểm tra một số hay một chuỗi có thuộc mảng các số hoặc chuỗi nào đó không thì quá đơn giản. Nhưng bây giờ bài toán của chúng ta là: <em>"Cho hai mảng ```a``` có n phần tử và ```b``` có m phần tử, kiểm tra xem mảng ```b``` có 'chứa' mảng ```a``` hay không?".</em>

Cách <em>không phải nghĩ</em> mà ai cũng biết đó là dùng 2 vòng ```for``` lồng nhau để duyệt và kiểm tra từng phần tử một đúng không? Nhưng với JS ta không nhất thiết phải làm mọi thứ phức tạp đến thế:
```javascript
const isContainedIn = (a, b) => {
  for (const v of new Set(a)) {
    if (!b.some(e => e === v) || a.filter(e => e === v).length > b.filter(e => e === v).length)
      return false;
  }
  return true;
};

isContainedIn([1, 4], [2, 4, 1]); // true
isContainedIn([1, 3], [2, 4, 1]); // false
isContainedIn([1, 2, 4], [2, 4, 1]); // true
```

Code đẹp hơn rồi phải không các bạn? Với ```filter``` và ```some``` thì mọi thứ dễ viết hơn là 2 vòng ``for`` phải không nào. Nhưng dù gì thì bản chất vẫn là duyệt mảng đó thôi.

<h2>3. Một chút về vòng lặp for</h2>

Chắc hẳn các bạn cũng không xa lạ gì về ```for``` trong JS, và chúng ta có thể nhắm mắt mà liệt kê ra được các kiểu ```for``` đó:

- ```for ... in```
- ```for ... of```
- ```forEach```

Vậy thì điểm khác biệt giữa các kiểu for này là gì?

<h3>3.1 Vòng lặp for ... in</h3>

```for ... in``` được sử dụng để duyệt các <b>thuộc tính enumerable</b> (```enumerable properties```), kể cả các thuộc tính được kế thừa từ object cha. (nếu các bạn thắc mắc ```enumerable properties``` là gì thì ngó lại [phần 4](https://viblo.asia/p/js-tips-cac-chieu-tro-js-tuong-khong-hay-ma-hay-khong-tuong-phan-4-L4x5xOxqlBM) một chút nhé, mình có đề cập ở tip đầu tiên của phần 4 rồi đó :D). ```for ... in``` còn được sử dụng với mảng ```string``` hoặc là một ```object``` thông thường, nhưng không thể sử dụng với ```Map``` hoặc ```Set```.
```javascript
for (let prop in ['a', 'b', 'c']) 
  console.log(prop);            // 0, 1, 2 (array indexes)

for (let prop in 'str') 
  console.log(prop);            // 0, 1, 2 (string indexes)

for (let prop in {a: 1, b: 2, c: 3}) 
  console.log(prop);            // a, b, c (object property names)

for (let prop in new Set(['a', 'b', 'a', 'd'])) 
  console.log(prop);            // undefined (no enumerable properties)
```

<h3>3.2 Vòng lặp for ... of</h3>

```for ... of``` được sử dụng để duyệt các ```iterable objects```, nhưng cách duyệt này là duyệt qua <b>giá trị</b> chứ không phải là các <b>thuộc tính</b> như ```for ... in``` bên trên.
```javascript
for (let val of ['a', 'b', 'c']) 
  console.log(val);            // a, b, c (array values)

for (let val of 'str') 
  console.log(val);            // s, t, r (string characters)

for (let val of {a: 1, b: 2, c: 3}) 
  console.log(prop);           // TypeError (not iterable)

for (let val of new Set(['a', 'b', 'a', 'd'])) 
  console.log(val);            // a, b, d (Set values)
```

<h3>3.3 Vòng lặp forEach</h3>

Cuối cùng là vòng lặp ```forEach```, nó là một phương thức của ```Array``` prototype cho phép ta duyệt qua các thành phần của một mảng. Và nó có thể truy cập vào cả <b>giá trị</b> và <b>chỉ số</b> của mảng đó nếu ta muốn trong khi duyệt.

```javascript
['a', 'b', 'c'].forEach(
  val => console.log(val)     // a, b, c (array values)
);

['a', 'b', 'c'].forEach(
  (val, i) => console.log(i)  // 0, 1, 2 (array indexes)
);
```

Nhân tiện, khi bàn về ```forEach```, có một câu hỏi được đặt ra là: <em>Khi duyệt ngược một mảng với cách thông thường thì ta cho chỉ số chạy ngược từ vị trí ```length - 1``` về vị trí ```0```, nhưng nếu sử dụng forEach ta có thể duyệt ngược mảng từ bên phải qua được không?</em>
<br>

<em>" Được mà, đảo ngược mảng rồi duyệt là xong!"</em>

Đúng vậy đó :D, phải thêm thao tác đảo ngược mảng rồi mới xài ```forEach``` được, hỏi dọa các bạn chút thôi mà:
```javascript
const forEachRight = (arr, callback) =>
  arr
    .slice(0)
    .reverse()
    .forEach(callback);

forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'
```


<h2>4. Capitalize & Decapitalize</h2>

Giải trí cuối bài với chữ hoa và chữ thường nhé! Chúng ta đều biết ```toUpperCase()```  và ```toLowerCase()```. Nhưng có đôi khi ta không cần đưa toàn bộ thành chữ hoa hoặc chữ thường. Điển hình như khi viết báo chẳng hạn, chữ đầu tiên của từ đầu tiên luôn được viết hoa, khi ấy chúng ta chỉ cần capitalize chữ đầu tiên lên mà thôi:

```javascript
const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

capitalize('fooBar'); // 'FooBar'
capitalize('fooBar', true); // 'Foobar'
```
Hàm ```capitalize()``` này cho phép ta giữ nguyên trạng các kí tự còn lại hoặc là chuyển hết chúng về chữ thường tùy vào mục đích sử dụng của người dùng.

Ngược với ```capitalize()```, chúng ta lại có ```decapitalize()``` như sau:
```javascript
const decapitalize = ([first, ...rest], upperRest = false) =>
  first.toLowerCase() + (upperRest ? rest.join('').toUpperCase() : rest.join(''));

decapitalize('FooBar'); // 'fooBar'
decapitalize('FooBar', true); // 'fOOBAR'
```


<h2>Kết luận</h2>

Vậy là chúng ta đã đi qua 4 "chiêu trò" vừa dễ vừa khó của bài viết này. Mình hy vọng nó mang lại phần nào sự hữu ích tới các bạn. Nếu có đóng góp về thủ thuật hoặc thắc mắc, vui lòng để lại comment mình sẽ nhiệt tình giải đáp. Và đừng quên thả upvote nhé các bạn ;).

Xin cảm ơn!

<b>Reference: [30 seconds of code](https://www.30secondsofcode.org/)</b>