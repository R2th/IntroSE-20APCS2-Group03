Mọi người ủng hộ bài viết gốc ở [blog](http://duthaho.com/blogs/) của mình nhé!!!

Chào mừng các bạn trở lại với 1001 câu chuyện cổ tích về **Array** trong Javascript. Ở [phần 1](http://duthaho.com/blogs/js-creating-array) chúng ta đã được tìm hiểu các cách tạo Array, bài viết hôm nay là các câu chuyện về sao chép (clone) Array trong Javascript nhé!

### Sai lầm thường gặp
Trong Javascript, type của array là object, vì thế nó là 1 kiểu dữ liệu tham chiếu (reference type). Điều đó có nghĩa là khi 1 biến được gán cho 1 object hoặc array, thì giá trị của biến đó không phải là giá trị của object hay array, mà chính là giá trị của địa chỉ ô nhớ trong memory mà object hay array đó được lưu trữ.

Để hiểu hơn về reference và value type trong Javascript, các bạn có thể đọc thêm [ở đây](https://codeburst.io/explaining-value-vs-reference-in-javascript-647a975e12a0).

> Khi copy 1 biến là 1 array, chúng ta đang copy bởi tham chiếu chứ không phải là đang copy giá trị của nó.

Chúng ta sẽ đi vào ví dụ cụ thể để hiểu hơn.

#### **1. Những array giống nhau nhưng không bằng nhau.**

![](https://cdn-media-1.freecodecamp.org/images/brYlg3Dp3gVRqGqHGkMBR2XR7eLvWQK8xymc)

Ở đây, mặc dù chúng ta thấy `array1` và `array1` chứa cùng số phần tử, cùng thứ tự và cùng cả các giá trị nữa, nhưng khi so sánh thì chúng lại không bằng nhau. Khá dễ hiểu, bởi vì chúng tham chiếu đến 2 ô nhớ khác nhau trong memory nên giá trị của chúng khác nhau.

#### **2. Array được copy bởi tham chiếu, không phải giá trị.**

![](https://cdn-media-1.freecodecamp.org/images/PZF-lU5f4C-OWkNLeF-q4g9T2anP6k88PPr1)

Ví dụ ở đây bạn đang gán `array1` sang `array2`, phép gán này không tạo thêm bộ nhớ cho `array2`, mà nó chỉ đơn giản gán giá trị của ô nhớ mà `array1` đang tham chiếu tới cho `array2`, vì thế sau phép gán, cả 2 array đều cùng tham chiếu đến cùng 1 ô nhớ.

Điều đó có nghĩa khi bạn so sánh 2 array nó sẽ bằng nhau, và khi thay đổi giá trị của 1 trong 2 array thì array còn lại cũng sẽ thay đổi theo.

Các bạn lưu ý sai lầm này khi làm việc với array nói riêng, hay các kiểu dữ liệu tham chiếu nói chung nhé. Chúng ta cùng đi vào phần chi tiết thôi nào!!!

### Cloning Arrays:

#### **1. Dùng Array.prototype.slice()**

Hàm  `slice()`  tạo ra 1 shallow copy từ 1 array mà không làm thay đổi array ban đầu. Bạn có thể xem chi tiết về  `slice()`  [ở đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice).

Hàm `slice([begin[, end]])` nhận 2 tham số đầu vào cho phép chúng ta copy 1 phần của array. Để copy toàn bộ 1 array thì chúng ta có thể dùng như sau:

```js
// with O as only argument
array.slice(0);

// without argument
array.slice();
```

Dưới đây là ví dụ khi dùng `slice()`:

![](https://cdn-media-1.freecodecamp.org/images/-XUoysUS92IrVW9lYY6EkJHXv8vKw0yahdaW)

Bạn có thể dễ dàng nhận ra là sau khi dùng copy, `array2` có cùng phần tử như `array1` nhưng nó tham chiếu đến địa chỉ ô nhớ khác nhau. Vì thế khi so sánh, chúng không bằng nhau và khi thay đổi `array2` thì `array1` vẫn giữ nguyên.

#### **2. Dùng Array.prototype.concat()**

Hàm  `concat()`  được dùng để merge 2 hay nhiều array lại với nhau, nó trả về 1 array mới mà không làm thay đổi tất cả các array ban đầu. Bạn có thể xem chi tiết về `concat()`  [ở đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat).

Tuy hàm  `concat([array1[, arrayN]])`  được dùng cho merge array nhưng chúng ta có thể dùng nó để copy 1 array như sau:

```js
// with an empty array
array.concat([]);

// without argument
array.concat();
```

Dưới đây là ví dụ dùng với  `concat()`:

![](https://cdn-media-1.freecodecamp.org/images/OXjY30kwODk5622BQraHtZfHxN5d5gewTeZj)

#### 3. Dùng Array.from()

Như được biết ở [phần 1](http://duthaho.com/blogs/js-creating-array),  `**Array.from()**`  được dùng để tạo mới 1 shallow copy array từ array ban đầu:

![](https://cdn-media-1.freecodecamp.org/images/kS-1uaQbt9K6zFk4PZWfmnLXHADDnHaVqELf)

#### 4. Dùng Array Destructuring

Với ES6, chúng ta có rất nhiều tính năng khá là thú vị và hữu ích, và **destructuring** là 1 trong số đó. Destructuring giúp chúng ta extract từ 1 data phức tạp như array và object.

Chúng ta sẽ dùng tính năng  **rest parameters,**  là sự kết hợp giữa array destructuring và the spread operator để copy 1 array trong ES6:

```js
let arrayClone = [...originalArray];
// or
let [...arrayClone] = originalArray;
```

Dưới đây là ví dụ dùng `array destructuring`:

![](https://cdn-media-1.freecodecamp.org/images/aohdaDoLpdH1XJ8Thk5U4JE7u0g89qsaTUcI)

Tất cả các ví dụ ở trên đều là  ****__shallow copy__****  từ 1 array ban đầu. Nếu array ban đầu của bạn chỉ chứa những giá trị là kiểu dữ liệu nguyên thủy (primitive values), thì các giải pháp trên hoàn toàn không có vấn đề. Tuy nhiên chuyện cổ tích nào thì cũng đi kèm với mụ phù thủy, không phải array nào cũng dùng được với các cách trên, cụ thể là các array chứa các phần tử là các kiểu dữ liệu tham chiếu (referece types).

Bạn hãy xem ví dụ sau để hiểu rõ hơn về vấn đề:

![](https://www.freecodecamp.org/news/content/images/2019/06/image.png)

Chắc bạn cũng nhận ra rằng khi chúng ta thay đổi nested array trong `array` thì đồng thời nested array trong `array2` cũng bị thay đổi theo, tất nhiên là ngược lại. Điều đó chứng tỏ các hàm dùng để **shalow copy** này không phù hợp với array trên.

Để khắc phục vấn đề này, giải pháp được đưa ra là ****__deep copy__****, và sau đây là những cách dùng để **deep copy** từ 1 array.

## 1. Dùng JSON

Cách đơn giản nhất để **deep copy** 1 array là dùng những hàm của JSON là  [****JSON.stringify()****](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)  và  [****JSON.parse()****](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse).

`JSON.stringify()` chuyển 1 Javascript value sang 1 JSON string, còn  `JSON.parse()`  thì ngược lại, chuyển 1 JSON string sang 1 Javascript value.

Dưới đây là ví dụ về cách sử dụng JSON:

![](https://www.freecodecamp.org/news/content/images/2019/06/image-1.png)

Tuy nhiên, nhiều trường hợp các hàm của JSON không như chúng ta mong muốn, `JSON.stringify()`  khong thể convert `function`, `undefined` và `new Date()`.

Ví dụ dưới đây mô tả hạn chế của các dùng JSON:

![](https://www.freecodecamp.org/news/content/images/2019/06/image-2.png)

## 2. Tự implement Deep Copy Helper

Có làm thì mới có ăn phải không nào. Chúng ta sẽ tự implement 1 function để clone 1 array từ array ban đầu để dùng mà ko phải đi xài chùa của thèn nào hết. Vì array cũng là 1 object nên hàm này có thể dùng để clone object luôn nhé.

Bắt tay vào code thôi:
```js
function deepClone(o) {
	const output = Array.isArray(o) ? [] : {};
	for (let i in o) {
		const value = o[i];
		output[i] = value !== null && typeof value === 'object' ? deepClone(value) : value;
	}
	return output;
}
```

Thử kiểm tra kết quả, đúng là 1 function tuyệt cmn vời phải không nào :D.

![](https://www.freecodecamp.org/news/content/images/2019/06/image-3.png)

## 3. Dùng JavaScript Libraries

Thời đại 4.0 rồi nên không làm thì cũng có thèn khác làm cho mà ăn rồi, vì đây là chức năng cơ bản nhưng lại rất hay dùng nên có rất nhiều thư viện đã implement sẵn, mình cứ thế mà lấy về dùng thôi.

Chúng ta có thể dùng  [****Lodash****](https://lodash.com/)  hoặc  [****jQuery****](https://jquery.com/).

Hàm `_.cloneDeep()`  của Lodash:

![](https://www.freecodecamp.org/news/content/images/2019/06/image-4.png)

Hàm  `$.extend()`  của jQuery:

![](https://www.freecodecamp.org/news/content/images/2019/06/image-5.png)

### Tóm tắt câu chuyện

Thật là những câu chuyện cổ tích dài đằng đẳng về Array trong Javascript đúng không nào. Chúng ta đã được biết rất nhiều cách để tạo cũng như clone 1 array.

Bên cạnh đó chúng ta cũng tránh được những sai lầm mắc phải trong việc dùng Javascript array, và một số function rất hay của ES6.

Hẹn gặp lại các bạn trong các bài viết tiếp theo nhé!