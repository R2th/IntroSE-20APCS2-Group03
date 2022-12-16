Xin chào các bạn, tips về CSS nhiều rồi hôm nay ta đổi gió một chút với JavaScript. Chủ đề hôm nay mình muốn chia sẻ đó là "Các phương thức xử lý mảng (Array) phổ biến trong JavaScript". Những method này chắc chắn bạn sẽ sử dụng rất nhiều khi làm việc với JavaScript và các framework của nó.

Bài chia sẻ này một phần giúp các bạn mới học nắm chắc kiến thức hơn, một phần cũng là để mình ôn lại kiến thức (chủ yếu để mình có nguồn tìm kiếm mỗi khi code ngáo :joy:) ta bắt đầu thôi

![](https://images.viblo.asia/6611729b-963a-4846-9fd5-0f74804be878.png)

### 1. concat()

`concat()` dùng để **nối 2 hay nhiều mảng với nhau**
* `concat()` **KHÔNG làm thay đổi mảng ban đầu** 
* `concat()` **trả về 1 mảng mới** sau khi nối

```javascript
var array1 = ['a', 'b', 'c'];
var array2 = ['d', 'e', 'f'];
var array3 = array1.concat(array2);

console.log(array3); // > Array ["a", "b", "c", "d", "e", "f"]
console.log(array1); // > Array ["a", "b", "c"]
console.log(array2); // > Array ["d", "e", "f"]
```

**Cú pháp**
```javascript
var newArray = oldArray.concat(value1[, value2[, ...[, valueN]]])

// valueN: Các giá trị hay mảng dùng để nối lại với nhau trong mảng mới
```

### 2. filter()

`filter()` dùng để **lọc ra các phần tử** trong mảng **thoả mãn một điều kiện nào đó**
* `filter()` **KHÔNG làm thay đổi mảng ban đầu**
* `filter()` **trả về 1 mảng mới** sau khi lọc
* `filter()` **trả về một mảng RỖNG** nếu không có phần tử nào thỏa mãn điều kiện

```javascript
var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
var result = words.filter(function(word) {
  return word.length > 6;
});

console.log(result); // > Array ["exuberant", "destruction", "present"]
console.log(words);  // > Array ["spray", "limit", "elite", "exuberant", "destruction", "present"]
```

**Cú pháp**
```javascript
var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])

/* callback: Là hàm test, dùng để kiểm tra từng phần tử của mảng.
  Trả về true để giữ lại phần tử, hoặc false để loại phần tử ra.
  Nó được gọi với 3 tham số: */
  
  // element: Phần tử đang được xử lý trong mảng
  // index (không bắt buộc): Chỉ mục (index) của phần tử đang được xử lý
  // array (không bắt buộc): Mảng nguồn mà hàm filter() đang xử lý

/* thisArg (không bắt buộc): Giá trị của this bên trong hàm callback */
```

### 3. find()

`find()` cũng dùng để lọc phần tử trong mảng, tuy nhiên nó sẽ **trả về giá trị ĐẦU TIÊN tìm thấy ở trong mảng** hoặc có thể trả về `undefined` nếu không tìm thấy
* `find()` **KHÔNG làm thay đổi mảng ban đầu**

```javascript
var array = [5, 12, 8, 130, 44];
var found = array.find(function(element) {
  return element > 10;
});

console.log(found); // > 12
console.log(array); // > Array [5, 12, 8, 130, 44]
```

**Cú pháp**
```javascript
arr.find(callback(element[, index[, array]])[, thisArg])

/* callback: Hàm thực thi với mỗi giá trị trong mảng,
  có 3 tham số truyền vào: */
  
  // element: Phần tử hiện tại đang được xử lý trong mảng
  // index (không bắt buộc): Thứ tự của phần tử hiện tại đang được xử lý trong mảng
  // array (không bắt buộc): Mảng nguồn mà hàm find() đang xử lý

/* thisArg (không bắt buộc): Đối tượng tùy chọn để
  sử dụng như thế nào khi thực hiện callback */
```

### 4. forEach()

`forEach()` dùng để duyệt qua từng phần tử của mảng
* `forEach()` trả về `undefined`

```javascript
var array = ['a', 'b', 'c'];

array.forEach(function(element) {
  console.log(element);
});

// > "a"
// > "b"
// > "c"

console.log(array); // > Array ["a", "b", "c"]
```

**Cú pháp**
```javascript
arr.forEach(function callback(currentValue[, index[, array]]) {
    // your iterator
}[, thisArg]);

/* callback: Hàm sẽ thực thi lên từng phần tử của mảng được gọi
  hàm này nhận 3 tham số: */
  
  // currentValue (không bắt buộc): Giá trị của phần tử đang được duyệt
  // index (không bắt buộc): Chỉ mục của phần tử đang được duyệt
  // array (không bắt buộc): Mảng mà hàm forEach() đang duyệt
  
/* thisArg (không bắt buộc): Giá trị được gán cho từ khóa this
  bên trong hàm callback khi được thực thi. */
```

### 5. includes()

Đây là method mới trong ES6

`includes()` kiểm tra xem **phần tử đã cho có tồn tại trong mảng hay không**
* `includes()` **KHÔNG làm thay đổi mảng ban đầu**
* `includes()` trả về kiểu **Boolean**: `true` nếu tìm thấy hoặc `false` nếu không tìm thấy

```javascript
var array = [1, 2, 3];

console.log(array.includes(2)); // > true
console.log(array);             // > Array [1, 2, 3]
```

**Cú pháp**
```javascript
arr.includes(valueToFind[, fromIndex])

// valueToFind: Giá trị muốn kiểm tra.
// fromIndex (không bắt buộc): Vị trí trong mảng để bắt đầu tìm kiếm valueToFind
```

### 6. indexOf()

`indexOf()` dùng để tìm kiếm vị trí của phần tử trong mảng
* `indexOf()` **KHÔNG làm thay đổi mảng ban đầu**
* `indexOf()` **trả về giá trị index ĐẦU TIÊN của mảng** nếu phần tử tồn tại trong mảng
* `indexOf()` trả về `-1` nếu phần tử không tồn tại trong mảng

```javascript
var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(beasts.indexOf('bison'));    // > 1
console.log(beasts.indexOf('bison', 2)); // > 4
console.log(beasts.indexOf('giraffe'));  // > -1
console.log(beasts);                     // > Array ["ant", "bison", "camel", "duck", "bison"]
```

**Cú pháp**
```javascript
arr.indexOf(searchElement[, fromIndex])

// searchElement: Phần tử cần tìm trong mảng.
// fromIndex (không bắt buộc): Vị trí index nơi bắt đầu tìm kiếm
```

### 7. join()

`join()` dùng để tạo ra một chuỗi mới bằng cách nối tất cả các phần tử của mảng, **mặc định ngăn cách chúng bởi dấu phẩy** hoặc **một chuỗi ký tự xác định**.
* `join()` **KHÔNG làm thay đổi mảng ban đầu**
* `join()` **trả về chính phần tử** nếu mảng chỉ có một phần tử
* `join()` trả về một chuỗi rỗng `""` nếu `arr.length === 0`

```javascript
var elements = ['Fire', 'Air', 'Water'];

console.log(elements.join());    // > "Fire,Air,Water"
console.log(elements.join(''));  // > "FireAirWater"
console.log(elements.join('-')); // > "Fire-Air-Water"
console.log(elements);           // > Array ["Fire", "Air", "Water"]
```

**Cú pháp**
```javascript
arr.join([separator])

/* separator (không bắt buộc): Là một chuỗi xác định
  dùng để ngăn cách các phần tử liền kề của mảng */
```

### 8. map()

`map()` giúp **tạo ra một mảng mới** với các phần tử là **kết quả từ việc thực thi một hàm lên TỪNG PHẦN TỬ** của mảng ban đầu
* `map()` **KHÔNG làm thay đổi mảng ban đầu** 

```javascript
var array = [1, 4, 9, 16];

var map = array.map(function(item) {
  return item * item;
});

console.log(map);   // > Array [1, 16, 81, 256]
console.log(array); // > Array [1, 4, 9, 16]
```

**Cú pháp**
```javascript
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
    // return element for new_array
}[, thisArg])


/* callback: Hàm để tạo ra phần tử cho mảng mới,
  nhận vào 3 tham số: */

  // currentValue: Giá trị của phần tử trong mảng đang được xử lý
  // index (không bắt buộc): Index của phần tử trong mảng đang được xử lý
  // array (không bắt buộc): Mảng đang được gọi với map
  
/* thisArg (không bắt buộc): Giá trị gán cho từ khóa this bên trong callback */
```

### 9.  pop()

 `pop()` dùng để **xoá phần tử cuối cùng** ra khỏi mảng

*  `pop()` **CÓ làm thay đổi mảng ban đầu** 
*  `pop()` **trả về phần tử đã bị xoá** ra khỏi mảng
*  `pop()` trả về `undefined` nếu mảng rỗng
 

 ```javascript
 const plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

console.log(plants.pop()); // > "tomato"
console.log(plants);       // > Array ["broccoli", "cauliflower", "cabbage", "kale"]
```

**Cú pháp**
```javascript
arr.pop()
```

### 10. shift()

Trái ngược với `pop()` là `shift()`

`shift()` dùng để **xoá phần tử đầu tiên** ra khỏi mảng
* `shift()` **CÓ làm thay đổi mảng ban đầu** 
* `shift()` **trả về phần tử đã bị xoá** ra khỏi mảng
*  `shift()` trả về `undefined` nếu mảng rỗng

```javascript
const plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

console.log(plants.shift()); // > "broccoli"
console.log(plants);         // > Array ["cauliflower", "cabbage", "kale", "tomato"]
```

**Cú pháp**
```javascript
arr.shift()
```

## Tạm kết

Bài viết có vẻ đã đủ dài, mình xin tạm dừng ở đây để tránh cảm giác chán nản khi xung quanh toàn là chữ :sweat_smile:

À có một note nhỏ đó là lại sao mỗi method mình đều chỉ ra phương thức là trả về cái gì ? nó có làm thay đổi array gốc không ? Các bạn hãy thật chú ý nhé, vì sau này khi làm việc với dữ liệu sẽ rất quan trọng các vấn đề này, khi bạn kiểm soát tốt dữ liệu, output của method bạn sẽ biết chính xác khi nào cần dùng method nào để thỉnh thoảng không bị ngáo như mình

Nếu thấy bài viết hay, hãy cho mình +1 upvote nhé. Nếu thích mình hãy nhấn nút follow để biết thêm nhiều thứ hay ho hơn. Chúc bạn thành công !
 
 Hẹn gặp lại ở part 2 nhé !