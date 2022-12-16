Trong bài viết này, mình sẽ giới thiệu 3 cách để lọc phần tử `trùng lặp` từ một mảng và trả về chỉ các phần tử duy nhất. Sở thích của mình là sử dụng `Set` vì cú pháp ngắn gọn và cực kì đơn giản
```
const array = ['🐣', 1, 2, '🐣', '🐣', 3];

// 1: "Set"
[...new Set(array)];

// 2: "Filter"
array.filter(item, index) => array.indexOf(item) === index);

// 3: "Reduce"
array.reduce(unique, item) =>
    unique.includes(item) ? unique : [...unique, item], []);
    
// RESULT: 
// ['🐣', 1, 2, 3];
```

## 1. Sử dụng Set:
Hãy để mình bắt đầu trước bằng cách giải thích `Set` là gì: 

> `Set` là một đối tượng dữ liệu mới được giới thiệu trong ES6. Vì `Set` chỉ cho bạn lưu trữ các giá trị duy nhất. Khi bạn đưa nó vào trong một mảng, nó sẽ xoá tất cả các giá trị trùng lặp.
> 

Okays, quay lại đoạn code ở trên và kiểm tra xem chuyện gì xảy ra. Có 2 thứ sẽ xảy ra ở đây:

1. Đầu tiên, chúng ta tạo mới một phần tử `Set` và đưa nó vào một mảng. Vì `Set` chỉ cho phép giá trị duy nhất, tất cả trùng lặp sẽ bị xoá

2. Bây giờ các giá trị trùng lặp đã bị mất, chúng ta sẽ hoán đổi lại sang một mảng bằng cách sử dụng phép toán `...`

```
const array = ['🐣', 1, 2, '🐣', '🐣', 3];

// Step 1
const uniqueSet = new Set(array);
// Set { '🐣', 1, 2, 3 }

// Step 2
const backToArray = [...uniqueSet];
// ['🐣', 1, 2, 3]
```

### Biến đổi Set đến một mảng sử dụng Array.from
Hoặc bạn có thể sử dụng Array.from để biến đổi một `Set` vào trong một mảng: 

```
const array = ['🐣', 1, 2, '🐣', '🐣', 3];

Array.from(new Set(array));

// ['🐣', 1, 2, 3]
```

--------------------

## 2. Sử dụng filter: 
Để hiểu được tuỳ chọn này, chúng ta sẽ đi qua 2 phương thức đang làm: `indexOf` và `filter`

### indexOf
Phương thức `indexOf` trả về vị trí (index) đầu tiên nó tìm thấy của phần tử được cung cấp từ mảng.

```
const array = ['🐣', 1, 2, '🐣', '🐣', 3];

array.indexOf('🐣'); // 0
array.indexOf('1'); // 1
array.indexOf('2'); // 2
array.indexOf('3'); // 5
```

### filter
Phương thức `filter()` tạo ra một mảng mới các phần tử thoả mãn điều kiện mà chúng ta cung cấp. Nói cách khác, nếu phần tử thoả mãn và trả về `true`, nó sẽ được chứa trong mảng đã được lọc. Và bất cứ phần tử nào không thoả mãn, trả về `false`, nó sẽ không nằm trong mảng đã được lọc

Hãy đi từng bước và xem chuyện gì xảy ra.

```
const array = ['🐣', 1, 2, '🐣', '🐣', 3];

array.filter((item, index) => {

    console.log(
        // a. Item
        item,
        // b. Index
        index, 
        // c. indexOf
        array.indexOf(item),
        // d. Condition
        array.indexOf(item) === index,
   );
   
   return array.indexOf(item) === index
});
```

Bên dưới là đầu ra từ console.log chỉ ra ở trên. Giá trị trùng lặp là nơi index không khớp với `indexOf`. Vì thế trong các trường hợp đó, điều kiện sẽ false và sẽ không nằm trong mảng được filter

| Item | Index | indexOf | Condition |
|  -------- | -------- | -------- | -------- |
| 🐣    | 0     | 0     | **true**     |
| 1    | 1    | 1     | **true**     |
| 2    | 2    | 2     | **true**     |
| 🐣    | 3    | 0     | false     |
| 🐣    | 4    | 0     | false     |
| 3    | 5    | 5     | **true**     |

### Lấy ra giá trị trùng lặp
Chúng ta cũng có thể sử dụng phương thức filter để lấy ra các giá trị trùng lặp từ mảng. Chúng ta cũng có thể làm điều này bằng cách đơn giản điều chỉnh điều kiện của chúng ta như sau:

```
const array = ['🐣', 1, 2, '🐣', '🐣', 3];

array.filter((item, index) => array.indexOf(item) !== index);

// ['🐣', '🐣'];

```

Lặp lại, nếu chúng ta lặp lại các bước bên trên và nhìn đầu ra: 

| Item | Index | indexOf | Condition |
|  -------- | -------- | -------- | -------- |
| 🐣    | 0     | 0     | false     |
| 1    | 1    | 1     | false     |
| 2    | 2    | 2     | false    |
| 🐣    | 3    | 0     | **true**     |
| 🐣    | 4    | 0     | **true**     |
| 3    | 5    | 5     | false    |

## 3. Sử dụng Reduce
Sử dụng phương thức reduce là để giảm số phần tử của mảng và hợp (combine) chúng vào mảng cuối cùng dựa trên một số hàm reducer mà bạn đưa vào

Trong trường hợp này, hàm reduce của chúng ta là sẽ kiểm tra xem mảng cuối cùng chứa item hay không. Nếu nó không, đẩy item đó vào trong mảng cuối cùng. Mặt khác, bỏ qua phần tử đó và chỉ trả lại mảng cuối cùng của chúng ta (về cơ bản bỏ qua phần tử đó).

Reducer luôn luôn khó hiểu hơn một chút. Vì thế đi vào từng trường hợp và nhìn đầu ra của nó: 

```
const array = ['🐣', 1, 2, '🐣', '🐣', 3];

array.reduce((unique, index) => {

    console.log(
        // a. Item
        item,
        // b. Final Array
        unique, 
        // c. Condition (Remember it only get pushed if this returns `false`)
        unique.includes(item),
        // d. Reducer function result
        unique.includes(item) ? unique : [...unique, item],
   );
   
   return unique.includes(item) ? unique : [...unique, item]}, []);
});

//RESULT: 
//['🐣', 1, 2, 3];
```

Và đây là đầu ra của console.log:

| Item | Accumulator (BEFORE Reducer Function) | Push to Accumulator?  | Accumulator (AFTER  Reducer Function) |
|  -------- | -------- | -------- | -------- |
| 🐣    | [ ]     | Yes     | [  '🐣' ]     |
| 1    |  [  '🐣' ]    | Yes     | [  '🐣' , 1 ]     |
| 2    | [  '🐣' , 1 ]    | Yes     | [  '🐣' , 1, 2 ]    |
| 🐣    | [  '🐣' , 1, 2 ]    | No     | [  '🐣', 1, 2 ]     |
| 🐣    | [  '🐣' , 1, 2 ]   | No     | [  '🐣', 1, 2 ]     |
| 3    | [  '🐣' , 1, 2 ]    | Yes     | [  '🐣', 1, 2, 3 ]    |