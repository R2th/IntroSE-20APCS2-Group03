### Intro
Trong JavaScript, chúng ta có thể gán lại giá trị cho 1 biến đã khai báo bằng `let` hoặc `var`. Tuy nhiên khi đó ta cũng cần phải lưu ý tránh một số trường hợp:
* Giá trị cũ bên ngoài có thể bị thay đổi (changing external state)
* Logic có thể trở nên rắc rối hơn (more complex code)

### Changing External State
Giả sử chúng ta declare và reassign 1 biến như sau:
```javascript
var name = "a"
name = "b"
console.log(name) // b
```
Nếu như thế này thì chưa có gì để nói, thử xét trong trường hợp trong 1 scope-function:
```javascript
let name = "a"

function sayName (arg) {
  name = arg
}
sayName("f");
console.log(name) // f
```

Và giá trị của name đã thay đổi (forever). Tất nhiên ví dụ trên chỉ là minh họa, thường thì chẳng ai lại sơ hở như vậy cả, nhưng cũng không thể chắc chắn rằng trong tất cả các trường hợp phức tạp khác, sẽ không mắc phải lỗi tương tự.

Cùng xét thêm 1 ví dụ khi sử dụng `var in loop`:
```javascript
for (var i = 1; i < 5; i++) {
  console.log(i)
  setTimeout(function () {
    console.log(i)
  }, 1000)
};
// output:
1
2
3
4
...
(4) 5
```
Theo tính toán thì output `i` sẽ lần lượt là 1,2,3,4,1,2,3,4 nhưng ở đây lại xuất hiện thêm 4 lần `i` với giá trị là 5 (yaoming). Vậy thì tại sao giá trị của `i` trong function `setTimeout` lại là 5? Quay trở lại một chút, `var` bản chất là một `function scope`, nên trong trường hợp này thì `i` đạt giá trị là 4 trước cả khi function `setTimeout` được thực thi.

Để lấy được đúng output như mong muốn ban đầu, chúng ta có thể đưa `setTimeout` vào trong 1 function khác bên ngoài, và gọi ở trong `loop` hay nói cách khác là sử dụng `closure`:
```javascript
function logLater (i) {
  setTimeout(function () {
    console.log(i)
  },1000)
}

for (var i = 1; i < 5; i++) {
  console.log(i)
  logLater(i)
};
// output:
1
2
3
4
1
2
3
4
```
Vậy là output đúng như mong muốn ban đầu. Việc đưa `setTimeout` vào function `logLater()` để đảm bảo giá trị của `i` trong `loop` sẽ không thay đổi trước khi `setTimeout` được thực thi.

Hoặc chúng ta có thể sử dụng `let` thay cho `var` cho nhanh đỡ nhức đầu (yaoming), vấn đề trên cũng được giải quyết:
```javascript
for (let i = 1; i < 5; i++) {
  console.log(i)
  setTimeout(function () {
    console.log(i)
  }, 1000)
};
```
Ngoài việc chú trọng hơn giữa `var` và `let` khi reassign lại 1 biến, chúng ta cũng nên cân nhắc việc sử dụng `const`:
```javascript
const name = 'a'

function sayName (arg) {
  name = arg
}

sayName('b') // TypeError: invalid assignment to const `name'
```
Chúng ta nên dùng `const` để khai báo cho biến luôn luôn có giá trị cố định, vì những biến khai báo bằng `const` đều không thể reassign lại được.
### Creating complex code
Giả sử như chúng ta có danh sách các món ăn cho từng ngày trong tuần, và chúng ta muốn xem hôm nay sẽ ăn gì:
```
Rice on Monday
Vegetable on Tuesday
Beacon on Wednesday
Beef on Thursday
Eggs on Friday
```
Nếu chúng ta định nghĩa món ăn bằng biến `food` như thế này:
```javascript
let food

if (today === 'Monday') {
  food = 'Rice'
} else if (today === 'something else') {
  food = 'something else'
} else if (....) {
}
...
```
Với đoạn logic trên,  luồng của chúng ta sẽ là:
- Khai báo một biến là `food` chưa có giá trị
- Giá trị của `food` là không cố định, nó được reassign liên tục, chúng ta chẳng thể biết ngay lúc này giá trị của nó đang là gì
- Hôm nay là `Monday`
- Vậy giá trị của `food` "tạm thời" sẽ là `Rice`


Nếu ở đây chúng ta sử dụng `ternary operator`:
```javascript
const food = today === 'Monday'
  ? 'Rice'
  : 'something else'
```
Hoặc sử dụng `early returns`:
```javascript
function getFoodToday (today) {
  if (today === 'Monday') return 'Rice'
  if (today === 'Tuesday') return 'Vegetable'
  if (today === 'Wednesday') return 'Beacon'
  if (today === 'Thursday') return 'Beef'
  if (today === 'Friday') return 'Eggs'
}
const food = getFoodToday('Wednesday') // "Beacon"
```
Lúc này, luồng của chúng ta sẽ là:
- Khai báo 1 biến là `food`
- Hôm nay là `Monday`
- Vậy `food` sẽ có giá trị là `Rice`

Lúc này, ta sẽ không cần phải mất thời gian chờ đợi xem `today` là gì và `food` là gì như vd lúc đầu nữa, điều này cũng tương tự như việc chúng ta quyết định trước xem từng hôm chúng ta sẽ ăn những gì thay vì đợi đến hôm nay mới nghĩ xem chúng ta sẽ ăn gì.
### Summary
Việc Reassign lại giá trị của biến khá là nhiều rủi ro nếu như chúng ta không cẩn thận, một vài trong số đó là 
- Changing external state
- Creating complex Logic

Ngoài việc cân nhắc giữa `let`, `var` và `const`, chúng ta có thể sử dụng `ternary operators` hoặc `early returns` để giảm thiểu việc reassign lại biến nhiều lần.

Bài viết được tham khảo từ [nguồn](https://dev.to/zellwk/why-you-shouldnt-reassign-values-in-javascript-525c).

Cảm ơn các bạn đã quan tâm.