**Để nói về ES6 thì có rất nhiều điều để nói, có thể nói từ ngày này qua ngày khác, tháng này qua tháng khác...chắc cũng chưa hết :D. ES6 đã ra đời cách đây 5 năm (vì ra mắt vào năm 2015 nên còn có tên là ES2015), nó thực sự là 1 cuộc cách mạng đúng nghĩa của Javascript, 1 sự đột phá mà sau này hầu hết các JS Framework đều lấy ES6 làm nền tảng, đặt nền móng cho những phiên bản ES7, ES8... tiếp theo. ES6 được bổ sung hàng loạt những tính năng mới, nhiều cú pháp mới quan trọng cho việc viết các ứng dụng phức tạp, bao gồm classes và modules, vân vân và mây mây...**

![](https://images.viblo.asia/b50e28f1-b8c7-40d5-a0bc-e2e8c64f0eed.png)


Ngoài những tính năng khá phổ biến mà lâu nay khi tìm hiểu về ES6 mà chúng ta đã biết như *`Arrow functions, Classes, Let & Const, Template strings`*... Thì bên cạnh đó còn khá nhiều tips hoặc những tính năng khá "hay ho" khác mà có thể các bạn chưa biết, hoặc đã biết rồi nhưng lại chưa sử dụng tới (sự thật mà nói thì bản thân mình cũng chưa thể nắm hết những tính năng của nó, nói cho oai thế thôi chứ chắc là "không" chứ không phải là "chưa" :v). 

Thôi không lan man dài dòng nữa, sau đây mình xin mạn phép chia sẻ 1 số tips của ES6 dựa vào kinh nghiệm của bản thân mình trong quá trình làm việc, tìm hiểu, cũng như là tham khảo ở nhiều nguồn học tập khác nhau. Bắt đầu nào!

### 1. Định dạng "tiền tệ"

Để định dạng tiền tệ của các quốc gia trên thế giới, ES6 cung cấp cho chúng ta phương thức `Intl.NumberFormat`. Cùng xem qua ví dụ dưới đây:

```javascript
const money = 100000;

new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format(money); // '$ 100,000'

new Intl.NumberFormat('jp-JP', {
  style: 'currency',
  currency: 'JPY',
}).format(money); // 'JP¥ 100,000'
```

Như ví dụ trên, phương thức `Intl.NumberFormat` sẽ có cú pháp `new Intl.NumberFormat([locales[, options]])`, bao gồm:

- locales: gồm `language code + country code`, 2 thứ này các bạn có thể xem ở [đây](https://www.w3schools.com/tags/ref_language_codes.asp) và ở [đây](https://www.w3schools.com/tags/ref_country_codes.asp).
- options: có rất nhiều options, nhưng ở đây chỉ để cập đến 2 options đang sử dụng: `styles` và `currency`. Tham số `style` chúng ta có 3 loại là `decimal, currency, percent `,  về tham số `currency` các bạn có thể tham khảo ở [đây](https://www.currency-iso.org/en/home/tables/table-a1.html). 

### 2. Remove Duplicates Array

Giả sử chúng ta có 1 array chứa danh sách các phần tử, trong đó có nhiều phần tử bị trùng lặp value với nhau, vậy làm thể nào để chỉ giữ lại 1 phần tử và xóa đi các phần từ bị trùng lặp với nó. 

Đương nhiên là bạn sẽ có rất nhiều cách, ES5 cũng có thể làm được...nhưng nó khá lằng nhằng, khó hiểu. Hoặc, bạn có thể dùng `lodash` chẳng hạn (cách này thì dễ nhất rồi, khỏi lo bug :D). Tuy nhiên, có 1 cách cực kỳ đơn giản với ES6 mà lâu nay các bạn có thể đã bỏ qua, hãy cùng xem ví dụ dưới đây:

```javascript
const arrray = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];

const removeDuplicate = [...new Set(arrray)];

console.log(removeDuplicate);
// [1,2,3,4]
```

Thật đơn giản vô cùng phải không nào!

### 3. Xử lý chuỗi với Spread

Toán tử `spread` (...) chắc hẳn đã khá quen thuộc với các bạn đã tìm hiểu về ES6. Để tách 1 chuỗi thành 1 array thì cũng khá đơn giản, các bạn xem ví dụ sau:

```javascript
const sun = 'asterisk';

// ES6 Spread
const sun2 = [...sun];
// [ 'a', 's', 't', 'e', 'r', 'i', 's', 'k' ]

// hoặc ES6 Array.from
const sun3 = Array.from(sun);
// [ 'a', 's', 't', 'e', 'r', 'i', 's', 'k' ]
```

Vậy nó có gì đặc biệt! Chúng ta cùng xem qua 1 ví dụ khác để thấy được sự linh hoạt và hiệu quả khi sử dụng toán tử `spread` nhé.

```javascript
const sun = 'asterisk';

const formatName = [
  ...sun[0].toUpperCase(),

  ...sun.slice(1),
].join('');

console.log(formatName); // Asterisk
```

Function trên sẽ format chuỗi với việc chuyển các ký tự đầu tiên thành chữ hoa thay cho chữ thường. Điều này có vẻ khá hữu ích khi xử lý các đoạn string chứa tên riêng đấy nhỉ. :)
### 4. Skip value với Destructuring

Thường để tránh các phép gán biến vô dụng cho các giá trị bạn không mong muốn, thông thường chúng ta có 2 cách sau đây:

- Sử dụng 1 space
- Thêm prefix "_"

```javascript
const [, value2] = ['value1', 'value2'];

const [_value1, value2] = ['value1', 'value2'];
```

Hãy xét 1 ví dụ cụ thể để thấy cái sự "hay ho" của Destructuring nhé:

```javascript
const url = 'sun-asterisk/framgia/com/jp';

const array = url.split('/'); // ["sun-asterisk", "framgia", "com", "jp"]

const [domain, , ,type] = array;

const name = `${domain}.${type}`;
// 'sun-asterisk.jp'
```

### 5. Khai báo Object với Dynamic Keys

Cách dễ dàng hơn để tạo các đối tượng với `Dynamic Keys`

Với phiên bản Javascript trước ES6, chúng ta phải viết kèm `key` tương ứng với `object`. Với ES6, cuối cùng chúng ta có thể tạo `Dynamic Keys` khi khai báo 1 Object!

```javascript
let item = '';

// ES5
let object = {};
lock[item] = 'value';

// ES6
let object = {
  [item]: 'value';
}
```

Trên đây là 1 bài chia sẻ ngắn về 1 số kiến thức hay ho, mẹo vặt của Javscript/ES6 mà mình lượm lặt được trong quá trình làm việc cũng như tham khảo ở nhiều nguồn học tập khác nhau.

Hy vọng nó sẽ giúp ích được các bạn ít nhiều cho công việc nhé. Xin cảm ơn và hẹn gặp lại! 

Chào thân ái và quyết thắng! :cowboy_hat_face: