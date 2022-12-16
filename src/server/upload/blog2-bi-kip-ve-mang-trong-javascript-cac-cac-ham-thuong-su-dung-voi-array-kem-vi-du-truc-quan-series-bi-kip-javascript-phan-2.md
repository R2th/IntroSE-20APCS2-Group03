![image.png](https://images.viblo.asia/d5d06d9d-f78f-44f9-a84b-2e64abd36e35.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Trong lập trình, **array** là một tập hợp các **elements** hoặc **items**. **Array** lưu trữ dữ liệu dưới dạng các phần tử và lấy lại chúng khi bạn cần.

Cấu trúc dữ liệu **array** được sử dụng rộng rãi trong hầu như tất cả các ngôn ngữ lập trình.

Trong cuốn bí kíp này, mình sẽ sâu (show) cho bạn tất cả về array trong JavaScript. Ae sẽ tìm hiểu về xử lý dữ liệu phức tạp, cấu trúc hủy, các method của array được sử dụng phổ biến nhất và hơn thế nữa.

Tại sao mình viết cuồn bí kíp này?
Đâu đó ngoài kia đã có rất nhiều bài viết tuyệt vời về array JavaScript có sẵn trên Internet. Vậy tại sao mình lại viết một bài viết khác về cùng chủ đề này? Động lực là gì?

Chà, qua nhiều năm làm việc mình thường được hoặc bị hỏi những câu hỏi lặp đi lặp lại của các zú nì ơ và các bạn mới học JS trong khi tài liệu thì có hết trên trang developer.mozilla.org. Mình nhận ra rằng hầu hết bạn mới bắt đầu cần một hướng dẫn bao gồm các array kỹ lưỡng từ đầu đến cuối với các ví dụ giễ hiểu và đặc biệt để mỗi lần có bạn nào hỏi mình sẽ copy link này quá tiện.

Vì vậy, mình quyết định tạo ra một cuốn bí kíp với đầy đủ các ví dụ. Nếu bạn là người mới bắt đầu sử dụng JavaScript, mình hy vọng bạn sẽ thấy nó hữu ích.

Nhưng ngay cả khi là một Dev có kinh nghiệm, cuốn bí kíp này có thể hữu ích để giúp bạn hoàn thiện mọi thứ khi cần. Mình cũng đang học lại toàn bộ trong khi viết về nó.

Okay GÉT GÔÔÔ.

# Array trong JavaScript là gì?
Một cặp square brackets [] đại diện cho một array trong JavaScript. Tất cả các phần tử trong array được tách biệt bằng dấu phẩy (,).

Trong Javascrip có array thể là một tập hợp các phần tử thuộc bất kỳ loại nào. Điều này có nghĩa là bạn có thể tạo một array với các phần tử kiểu String, Boolean, Number, Objects và thậm chí cả các Arrays khác.

Đây là một ví dụ về một array có bốn phần tử: kiểu Number, Boolean, String và Object.

```js
const mixedTypedArray = [
  100,
  true,
  'bí kíp cua gái',
  {},
]
```

Vị trí của một phần tử trong array được gọi là vị trí của nó (index). Trong JavaScript, index array bắt đầu từ 0 và nó tăng lên một với mỗi phần tử.

Vì vậy, ví dụ, trong array trên, phần tử value là 100 có index 0, true có index 1, 'bí kíp cua gái' có index 2, v.v.

Số phần tử trong array xác định độ dài của nó. Ví dụ, độ dài của array trên là 4.

Điều thú vị là các array JavaScript không có độ dài cố định. Ae có thể thay đổi độ dài bất cứ lúc nào bằng cách gán một value số dương. Chúng mình sẽ tìm hiểu thêm về điều đó sau.

# Cách tạo một array trong JavaScript
Bạn có thể tạo một array theo nhiều cách trong JavaScript. Cách đơn giản nhất là gán value array cho một biến.

```js
const salad = [
  '🍅',
  '🍄',
  '🥦',
  '🥒',
  '🌽',
  '🥕',
  '🥑',
]
```

bạn cũng có thể sử dụng hàm Arraytạo để tạo một array.

```js
const salad = new Array(
  '🍅',
  '🍄',
  '🥦',
  '🥒',
  '🌽',
  '🥕',
  '🥑'
)
```

Xin lưu ý: new Array(2) sẽ tạo một array có độ dài là hai và không có phần tử nào được xác định trong đó. Tuy nhiên, new Array(1,2) sẽ tạo một array có độ dài hai với các phần tử 1 và 2 trong đó.
Có những method khác như Array.of() và Array.from(), và toán tử spread ( ...) cũng giúp bạn tạo ra một array. Chúng ta sẽ tìm hiểu về chúng ở phần sau của bài viết này.

# Cách lấy các phần tử từ một array trong JS
Bạn có thể truy cập và lấy các phần tử từ một array bằng cách sử dụng chỉ mục của nó. Ae cần sử dụng dấu ngoặc vuông để truy cập các phần tử của array.

`const element = array[index];`

Dựa trên các trường hợp sử dụng, bạn có thể chọn truy cập từng phần tử array hoặc dùng một vòng lặp.

Khi bạn truy cập các phần tử bằng cách sử dụng index:

```js
const salad = [
  '🍅',
  '🍄',
  '🥦',
  '🥒',
  '🌽',
  '🥕',
  '🥑',
]
salad[0] // '🍅'
salad[2] // '🥦'
salad[5] // '🥕'
```

Bạn có thể sử dụng độ dài của một array để duyệt và truy cập các phần tử.

```js
const salad = [
  '🍅',
  '🍄',
  '🥦',
  '🥒',
  '🌽',
  '🥕',
  '🥑',
]
const len = salad.length
salad[len - 1] // '🥑'
salad[len - 3] // '🌽'
```

Và cũng có thể lặp qua array bằng vòng lặp thông thường for hoặc forEach hoặc bất kỳ vòng lặp nào khác.

```js
const salad = [
  '🍅',
  '🍄',
  '🥦',
  '🥒',
  '🌽',
  '🥕',
  '🥑',
]

for (let i = 0; i < salad.length; i++) {
  console.log(
    `Element at index ${i} is ${salad[i]}`
  )
}
```
Và đây là kết quả:

Element at index 0 is 🍅
Element at index 1 is 🍄
Element at index 2 is 🥦
Element at index 3 is 🥒
Element at index 4 is 🌽
Element at index 5 is 🥕
Element at index 6 is 🥑

# Cách thêm các phần tử vào một array trong JS
Sử dụng push() method để chèn một phần tử vào cuối một array. Phương push() thức thêm một phần tử vào cuối array. Làm thế nào để bạn thêm một số đậu phộng vào món salad:

```js
const salad = [
  '🍅',
  '🍄',
  '🥦',
  '🥒',
  '🌽',
  '🥕',
  '🥑',
]
salad.push('🥜')
```

Bây giờ array salad là:

```js
['🍅', '🍄', '🥦', '🥒',
 '🌽', '🥕', '🥑', '🥜']
```
 
Lưu ý rằng method push() thêm một phần tử vào cuối array. Nếu bạn muốn thêm một phần tử vào đầu array, bạn sẽ cần sử dụng method unshift() nhé (có nhiều bạn còn ko biết sự tồn tại của cái hàm này).

const salad = [
  '🍅',
  '🍄',
  '🥦',
  '🥒',
  '🌽',
  '🥕',
  '🥑',
]
salad.unshift('🥜')
Bây giờ array salad sẽ là:

```
['🥜', '🍅', '🍄', '🥦', 
'🥒', '🌽', '🥕', '🥑']    
```

# Cách xóa phần tử khỏi một array trong JS
Cách dễ nhất để xóa một phần tử khỏi một array là sử dụng method pop(). Mỗi khi bạn gọi method pop(), nó sẽ xóa một phần tử ở cuối array. Sau đó, nó trả về phần tử đã bị loại bỏ và thay đổi array ban đầu.

```js
const salad = [
  '🍅',
  '🍄',
  '🥦',
  '🥒',
  '🌽',
  '🥕',
  '🥑',
]
salad.pop() // 🥑

console.log(salad)
// ['🍅', '🍄', '🥦', '🥒', '🌽', '🥕']
```

Sử dụng method shift() để xóa một phần tử khỏi đầu array. Giống như method pop(), shift() trả về phần tử bị loại bỏ và thay đổi array ban đầu.

```js
const salad = [
  '🍅',
  '🍄',
  '🥦',
  '🥒',
  '🌽',
  '🥕',
  '🥑',
]
salad.shift() // 🍅

console.log(salad)
// ['🍄', '🥦', '🥒', '🌽', '🥕', '🥑'];
```

# Cách sao chép và nhân bản (Copy and Clone) một array trong JS
Bạn có thể copy và clone một array sang một array mới bằng method slice(). Lưu ý rằng method slice() này không thay đổi array ban đầu. Thay vào đó, nó tạo ra một bản sao mới (shalow clone) của array ban đầu. Mình sẽ nói về deep clone và shalow clone sau nhưng bạn để ý 2 keyword này nhé.

```js
const salad = [
  '🍅',
  '🍄',
  '🥦',
  '🥒',
  '🌽',
  '🥕',
  '🥑',
]
const saladCopy = salad.slice()

console.log(saladCopy)
// ['🍅', '🍄', '🥦', '🥒', '🌽', '🥕', '🥑']

salad === saladCopy // returns false
```

Ngoài ra, bạn có thể sử dụng toán tử spread ... để tạo bản sao của array. Mình sẽ tìm hiểu về điều đó sau.

Cách xác định xem value bất kỳ có phải là array trong JS không
Bạn có thể xác định xem một value có phải là một array hay không bằng cách sử dụng method Array.isArray(value). Method này trả về true nếu value được truyền vào là một array.
```js
Array.isArray([
  '🍅',
  '🍄',
  '🥦',
  '🥒',
  '🌽',
  '🥕',
  '🥑',
]) // returns true
Array.isArray('🍅') // returns false
Array.isArray({tomato: '🍅'}) // returns false
Array.isArray([]) // returns true
```

# Array destructuring trong JavaScript
Với ECMAScript 6 (ES6), bạn sẽ có một số cú pháp mới để trích xuất nhiều thuộc tính từ một array và gán chúng cho các biến trong một nốt nhạc. Nó rất hữu ích để giúp bạn giữ cho code của mình rõ ràng và ngắn gọn. Cú pháp mới này được gọi là cú destructuring.

Dưới đây là một ví dụ về việc trích xuất các value từ một array bằng cách sử dụng cú pháp hủy cấu trúc (destructuring):

```js
let [tomato, mushroom, carrot] = [
  '🍅',
  '🍄',
  '🥕',
]
```

Bây giờ bạn có thể sử dụng các biến vừa destructuringtrong code của mình:

```js
console.log(tomato, mushroom, carrot)
// Output, 🍅 🍄 🥕
```
Để làm điều tương tự mà không cần destructuring, nó sẽ giống như sau:

```js
let vegetables = ['🍅', '🍄', '🥕']
let tomato = vegetables[0]
let mushroom = vegetables[1]
let carrot = vegetables[2]
```

Vì vậy, cú pháp destructuring giúp bạn không phải viết nhiều code. Điều này giúp bạn tăng năng suất đáng kể.

# Cách chỉ định value mặc định cho một biến
Bạn có thể chỉ định một value mặc định bằng cách sử dụng destructuring khi không có value hoặc undefined cho các phần tử thu được sau khi destructuring. (Cái này khá tiện nên dùng khi thấy nghi ngờ sau khi destructuring value bị undefined văng lỗi đỏ chét màn mình)

Trong ví dụ dưới đây, chúng mình chỉ định một value mặc định cho biến nấm.

```js
let [tomato, mushroom = '🍄'] = ['🍅']
console.log(tomato) // '🍅'
console.log(mushroom) // '🍄'
```

# Làm thế nào để bỏ qua một value trong một array
Với cấu trúc hủy, bạn có thể bỏ qua một phần tử array (destructuring là trích xuất theo thứ tự mình đã từng gặp trường hợp bạn trích xuất theo tên là sai nhé - ko quan trọng tên đâu mấy chế ơi). Ví dụ, bạn có thể không quan tâm đến tất cả các phần tử trong một array. Trong trường hợp đó, bỏ qua một value rất hữu ích.

Trong ví dụ dưới đây, bạn sẽ bỏ qua phần tử nấm. Lưu ý khoảng trống trong khai báo biến ở phía bên trái của biểu thức.

```js
let [tomato, , carrot] = ['🍅', '🍄', '🥕']

console.log(tomato) // '🍅'
console.log(carrot) // '🥕'
```

# Destructuring array lồng nhau trong JS
Trong JavaScript, các array có thể được lồng vào nhau. Điều này có nghĩa là một array có thể có một array khác như một phần tử. Việc lồng vào array có thể đi đến bất kỳ độ sâu nào.

Ví dụ, hãy tạo một array lồng nhau cho các loại trái cây. Nó có một vài trái cây và một loạt các loại rau trong đó.

```js
let fruits = [
  '🍈',
  '🍍',
  '🍌',
  '🍉',
  ['🍅', '🍄', '🥕'],
]
```

Bạn sẽ truy cập vào '🥕' từ array trên bằng cách nào? Một lần nữa, bạn có thể làm điều này mà không cần destructuring, như thế này:

```js
const veg = fruits[4]
// returns the array ['🍅', '🍄', '🥕']

const carrot = veg[2]
// returns '🥕'
```

Ngoài ra, bạn có thể sử dụng cú pháp ngắn gọn này:

`fruits[4][2] // returns '🥕'`

bạn cũng có thể truy cập nó bằng cú pháp destructuring, như sau:

```js
let [, , , , [, , carrot]] = [
  '🍈',
  '🍍',
  '🍌',
  '🍉',
  ['🍅', '🍄', '🥕'],
]
```

# Cách sử dụng Cú pháp Spread và Rest parameter trong JavaScript
Kể từ ES6, bạn có thể sử dụng ...(có, ba dấu chấm liên tiếp) làm cú pháp spread và tham số còn lại (rest paramater) trong cấu trúc array. 

Đối với rest paramater, ...xuất hiện ở bên trái của cú pháp destructuring.
Đối với cú pháp spread, dấu ...xuất hiện ở phía bên phải của cú pháp destructuring.
Nói hơi khó hiểu nhỉ yên tâm nhìn ví dụ hiểu ngay.
Cách sử dụng Rest Parameter trong JS
Với Rest paramater, chúng ta có thể vạch ra các phần tử bên trái của một array trong một array mới. Rest paramater phải là biến cuối cùng trong cú pháp hủy cấu trúc.

Trong ví dụ dưới đây, bạn đã ánh xạ hai phần tử đầu tiên của array với các biến cà chua và nấm. Các phần tử còn lại được ánh xạ tới biến rest bằng cách sử dụng .... Biến rest là một array mới chứa các phần tử còn lại.

```js
const [tomato, mushroom, ...rest] = [
  '🍅',
  '🍄',
  '🥦',
  '🥒',
  '🌽',
  '🥕',
  '🥑',
]

console.log(tomato) // '🍅'
console.log(mushroom) // '🍄'
console.log(rest)
// ["🥦", "🥒", "🌽", "🥕", "🥑"]
```

# Cách sử dụng toán tử Spread trong JS
Với toán tử spread, bạn có thể tạo một copy/clone của một array hiện có như sau:

```js
const salad = [
  '🍅',
  '🍄',
  '🥦',
  '🥒',
  '🌽',
  '🥕',
  '🥑',
]

const saladCloned = [...salad]
console.log(saladCloned) // ["🍅", "🍄", "🥦", "🥒", "🌽", "🥕", "🥑"]

salad === saladCloned // false
```

Mình sẽ nói về deep clone và shalow clone sau nhưng một lần nữa bạn để ý 2 keyword này nhé.
Destructuring và các trường hợp sử dụng trong JavaScript
Chúng ta hãy xem xét một vài trường hợp sử dụng thú vị của destructuring, toán tử spread và rest parameter.

# Làm thế nào để hoán đổi value với Destructuring 
Bạn có thể hoán đổi value của hai biến một cách dễ dàng bằng cách sử dụng cú pháp destructuring.

```js
let first = '😔'
let second = '🙂'
[first, second] = [second, first]

console.log(first) // '🙂'
console.log(second) // '😔'
```

# Cách hợp nhất các array
Bạn cũng có thể hợp nhất hai array và tạo một array mới với tất cả các phần tử từ cả hai array. Hãy lấy hai array - một array có một vài mặt cười và array khác với một vài loại rau.

```js
const emotion = ['🙂', '😔']
const veggies = ['🥦', '🥒', '🌽', '🥕']
```

Bây giờ, mình cùng hợp nhất chúng để tạo một array mới.

```js
const emotionalVeggies = [...emotion, ...veggies]
console.log(emotionalVeggies)
// ["🙂", "😔", "🥦", "🥒", "🌽", "🥕"]
```

# Method của array trong JavaScript
Cho đến nay, bạn đã thấy một vài thuộc tính và method của array. Hãy làm một bản tóm tắt nhanh về những cái mà bạn đã xem nhóe:

push() - Chèn một phần tử vào cuối array.
unshift() - Chèn một phần tử vào đầu array.
pop() - Xóa một phần tử ở cuối array.
shift() - Bỏ một phần tử khỏi đầu array.
slice() - Tạo một bản sao nông (shalow clone) của một array.
Array.isArray() - Xác định xem một value có phải là một array hay không.
length - Xác định kích thước của một array.

# Bây giờ bạn sẽ tìm hiểu về các phương thức array quan trọng khác kèm các ví dụ.

Cách: tạo, xóa, cập nhật và truy cập array trong JavaScript
Trong phần này, chúng ta sẽ tìm hiểu về các method bạn có thể sử dụng để tạo một array mới, xóa các phần tử để làm cho array trống, truy cập các phần tử và nhiều method khác.

# Phương thức concat()
Phương thức concat() hợp nhất một hoặc nhiều array và trả về một array đã hợp nhất. Nó là một method bất biến. Điều này có nghĩa là nó không thay đổi (thay đổi) các array hiện có.

Hãy nối hai array.

```js
const first = [1, 2, 3]
const second = [4, 5, 6]

const merged = first.concat(second)

console.log(merged) // [1, 2, 3, 4, 5, 6]
console.log(first) // [1, 2, 3]
console.log(second) // [4, 5, 6]
```

Sử dụng method concat(), bạn có thể hợp nhất nhiều hơn hai array. Có thể hợp nhất bất kỳ số array nào bằng cú pháp này:

```js
array.concat(arr1, arr2,..,..,..,arrN);
Đây là một ví dụ:

const first = [1, 2, 3]
const second = [4, 5, 6]
const third = [7, 8, 9]

const merged = first.concat(second, third)

console.log(merged)
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

# Phương thức join()
Phương thức join() kết hợp tất cả các phần tử của array bằng dấu phân tách và trả về một string string. Dấu phân tách mặc định được sử dụng để nối là comma(,) dấu phẩy.

```js
const emotions = ['🙂', '😍', '🙄', '😟']

const joined = emotions.join()
console.log(joined) // "🙂,😍,🙄,😟"
```

  
Bạn có thể dùng bất kỳ ký tự hoặc string nào khác dấu phân mà bạn chọn để nối các phần tử. Dưới đây là một ví dụ tùy chỉnh:

```js
const joined = emotions.join('<=>')
console.log(joined) 
// "🙂<=>😍<=>🙄<=>😟"
```

Gọi method join() trên một array trống trả về một string trống:

`[].join() // returns ""`

# Phương thức fill()
Phương thức fill() điền vào một array với một giá trị tĩnh. Ae có thể thay đổi tất cả các phần tử thành value tĩnh hoặc thay đổi một vài mục đã chọn. Lưu ý rằng method fill() thay đổi array ban đầu.

```js
const colors = ['red', 'blue', 'green']

colors.fill('pink')
console.log(colors) // ["pink", "pink", "pink"]
```
Đây là một ví dụ trong đó bạn chỉ thay đổi hai phần tử cuối cùng của array bằng method fill():

```js
const colors = ['red', 'blue', 'green']

colors.fill('pink', 1, 3)
// ["red", "pink", "pink"]
```

Trong trường hợp này, đối số đầu tiên của method fill() là value mà chúng ta thay đổi bằng. Đối số thứ hai là chỉ số bắt đầu thay đổi. Nó bắt đầu với 0. Đối số cuối cùng là xác định vị trí kết thúc fill. Value tối đa của nó có thể là array.length.

# Phương thức includes()
Bạn có thể xác định sự hiện diện của một phần tử trong một array bằng method includes(). Nếu phần tử được tìm thấy, phương thức sẽ trả về true, và ngược lại false.

```js
const names = ['tom', 'alex', 'bob', 'john']

names.includes('tom') // returns true
names.includes('july') // returns false
```

# Phương thức indexOf()
Bạn có thể muốn biết vị trí index của một phần tử trong array. Ae có thể sử dụng method indexOf() để có được điều đó. Nó trả về chỉ số của lần xuất hiện đầu tiên của một phần tử trong array. Nếu một phần tử không được tìm thấy, method indexOf() sẽ trả về -1.

```js
const names = ['tom', 'alex', 'bob', 'john']

names.indexOf('alex') // returns 1
names.indexOf('rob') // returns -1
```

Có một method khác lastIndexOf() giúp bạn tìm chỉ mục của lần xuất hiện cuối cùng của một phần tử trong array. Giống như indexOf(), lastIndexOf() cũng trả về -1 nếu phần tử không được tìm thấy.

```js
const names = ['tom', 'alex', 'bob', 'tom'];

names.indexOf('tom'); // returns 0
names.lastIndexOf('tom'); // returns 3
Phương thức reverse()
```

Như tên cho thấy, method reverse() đảo ngược vị trí của các phần tử trong array để phần tử cuối cùng thành vị trí đầu tiên và đảo hết từ đầu đến cuối.

```js
const names = ['tom', 'alex', 'bob']

names.reverse() // returns ["bob", "alex", "tom"]
```
  
Phương thức reverse() sửa đổi array ban đầu.

# Phương thức sort()
Phương thức sort() này có lẽ là một trong những method array thường được sử dụng nhất. Method mặc định sort() chuyển đổi các loại phần tử thành string và sau đó sắp xếp chúng. Thứ tự sắp xếp mặc định tăng dần. Phương thức sort() thay đổi array ban đầu.

```js
const names = ['tom', 'alex', 'bob']

names.sort() // returns ["alex", "bob", "tom"]
```
Phương thức sort() chấp nhận một hàm so sánh tùy chọn làm đối số. Ae có thể viết một hàm so sánh và chuyển tới method sort() để ghi đè hành vi sắp xếp mặc định.

Bây giờ chúng ta hãy lấy một array số và sắp xếp chúng theo thứ tự tăng dần và giảm dần bằng cách sử dụng một hàm so sánh:

`const numbers = [23, 5, 100, 56, 9, 13, 37, 10, 1]`

Đầu tiên, bạn sẽ gọi method mặc định sort() và xem kết quả:

`numbers.sort();`

Bây giờ array đã sắp xếp là, [1, 10, 100, 13, 23, 37, 5, 56, 9]. Chà, đó không phải là kết quả mà chúng mình mong đợi. Nhưng nó xảy ra bởi vì method sort() mặc định chuyển đổi các phần tử thành một string và sau đó so sánh chúng dựa trên các value đơn vị code UTF-16.

Để giải quyết vấn đề này, chúng ta hãy viết một hàm so sánh thứ tự tăng dần:

```js
function ascendingComp(a, b) {
  return a - b
}
```
Bây giờ chuyển nó đến method sort():

```js
const numbers = [23, 5, 100, 56, 9, 13, 37, 10, 1]

function ascendingComp(a, b) {
  return a - b
}

numbers.sort(ascendingComp)
// retruns [1, 5, 9, 10, 13, 23, 37, 56, 100]


// Hoặc có thể viết như sau,
numbers.sort(function(a, b) {
  return (a-b);
});

// Hoặc ngắn gọn hơn nữa,
numbers.sort((a, b) => (a-b));
```
Đối với thứ tự giảm dần, hãy làm như sau:

`numbers.sort((a, b) => (b-a));`

# Phương thức splice()
Phương thức splice() này giúp bạn thêm, cập nhật và loại bỏ các phần tử trong một array. Hàm này có thể hơi rắc rối khi mới bắt đầu, nhưng một khi bạn biết cách sử dụng nó đúng cách, bạn sẽ thực hiện đúng.

Mục đích chính của method splice() là xóa các phần tử khỏi array. Nó trả về một array các phần tử đã bị xóa và sửa đổi array ban đầu. Nhưng bạn cũng có thể thêm và thay thế các phần tử bằng cách sử dụng nó.

Để thêm một phần tử bằng method splice() này, bạn cần chuyển vị trí mà mình muốn thêm, bao nhiêu phần tử cần xóa bắt đầu bằng vị trí và phần tử cần thêm.

Trong ví dụ dưới đây, bạn đang thêm một phần tử zack tại chỉ mục 1 mà không xóa bất kỳ phần tử nào.

```js
const names = ['tom', 'alex', 'bob']

names.splice(1, 0, 'zack')

console.log(names)
// ["tom", "zack", "alex", "bob"]
```

Hãy xem ví dụ sau. Ở đây bạn đang xóa một phần tử khỏi index 2 (phần tử thứ 3) và thêm một phần tử mới zack,. Phương thức splice() này trả về một array có phần tử bị xóa bob,.

```js
const names = ['tom', 'alex', 'bob']

const deleted = names.splice(2, 1, 'zack')

console.log(deleted) // ["bob"]
console.log(names) // ["tom", "alex", "zack"]
```

Dùng vài lần là quen tay bạn mở vscode lên và code thử vài lần bá đạo ngay.

# Method array tĩnh (Static Array) trong JavaScript
Trong JavaScript, array có ba phương thức tĩnh. Mình đã thảo luận về Array.isArray() rồi. Bây giờ hãy thảo luận về hai nhỏ còn lại.

# Phương Array.from()thức array
Hãy lấy một đoạn code HTML đơn giản có chứa một div và một vài phần tử danh sách:

```html
<div id='main'>
  <ul>
    <ol type='1'>
      <li>...</li>
      <li>...</li>
      <li>...</li>
      <li>...</li>
      <li>...</li>
      <li>...</li>
      <li>...</li>
      <li>...</li>
      <li>...</li>
      <li>...</li>
    </ol>
  </ul>
</div>
```
Bây giờ chúng ta sẽ truy vấn DOM bằng getElementsByTagName()method này.

`document.getElementsByTagName('li');`

Nó trả về một HTMLCollection dạng như sau:

![image.png](https://images.viblo.asia/4bf676e8-c65d-4a18-84cd-6421a5f537bb.png)

HTMLCollection là một đối tượng giống array

Vì vậy, nó giống như một array. Bây giờ chúng ta hãy thử lặp lại nó bằng cách sử dụng forEach:

```js
document
  .getElementsByTagName('li')
  .forEach(() => {
    // Do something here..
  })
```
Đoán xem đầu ra là gì? Đó là một lỗi như thế này:

Lỗi khi sử dụng forEach trên đối tượng Array-Like
Nhưng tại sao WHY? Bởi vì HTMLCollection không phải là một array. Nó là một Array-Like đối tượng. Vì vậy, bạn không thể lặp lại nó bằng cách sử dụng forEach.

Proto là Đối tượng

Đây là nơi bạn nên sử dụng phương thưc Array.from(). Nó chuyển đổi một đối tượng giống array thành một array để bạn có thể thực hiện tất cả các hoạt động của array trên nó.

const collection = Array.from(
  document.getElementsByTagName('li')
)
Đây collection là một array:

Proto là Array

# Phương thức Array.of()
Phương thức Array.of() tạo một array mới bằng cách sử dụng bất kỳ số lượng phần tử nào thuộc bất kỳ kiểu nào.

`Array.of(2, false, 'test', {name: 'Alex'})`
Đầu ra trông như thế này:

Đầu ra của method Array.of ()

Method lặp lại array (Array Iterator Methods) trong JavaScript
Bây giờ bạn sẽ tìm hiểu về các phương thức của trình lặp array. Đây là những method rất hữu ích để lặp qua array và thực hiện tính toán, đưa ra quyết định, lọc ra nội dung và hơn thế nữa.

Cho đến nay, bạn chưa thấy một ví dụ nào về một array các đối tượng giờ thì thấy nè nãy giờ chỉ khởi động thôi. Trong phần này, bạn sẽ sử dụng array đối tượng sau để giải thích và chứng minh các method bên dưới.

Array này chứa thông tin về một số sinh viên đã đăng ký các key học trả phí khác nhau:

```js
const students = [
  {
    id: 001,
    f_name: 'Alex',
    l_name: 'B',
    gender: 'M',
    married: false,
    age: 22,
    paid: 250,
    courses: ['JavaScript', 'React'],
  },
  {
    id: 002,
    f_name: 'Ibrahim',
    l_name: 'M',
    gender: 'M',
    married: true,
    age: 32,
    paid: 150,
    courses: ['JavaScript', 'PWA'],
  },
  {
    id: 003,
    f_name: 'Rubi',
    l_name: 'S',
    gender: 'F',
    married: false,
    age: 27,
    paid: 350,
    courses: ['Blogging', 'React', 'UX'],
  },
  {
    id: 004,
    f_name: 'Zack',
    l_name: 'F',
    gender: 'M',
    married: true,
    age: 36,
    paid: 250,
    courses: ['Git', 'React', 'Branding'],
  },
]
```
Được rồi, mình hãy bắt đầu nào. Tất cả các method của trình lặp array đều nhận một hàm làm đối số. Ae cần chỉ định logic để lặp lại và áp dụng trong hàm đó.

Phương thức filter()
Phương thức filter() tạo một array mới với tất cả các phần tử thỏa coden điều kiện được đề cập trong hàm. Bạn hãy tìm học sinh là nữ mlem mlem. Vì vậy, điều kiện bộ lọc phải là giới tính bằng 'F'.

```js
const femaleStudents = students.filter(
  (element, index) => {
    return element.gender === 'F'
  }
)

console.log(femaleStudents)
```
Đầu ra là:
![image.png](https://images.viblo.asia/f3ce8a8f-9305-49f3-b719-327158780498.png)

Đúng rồi. Học sinh có tên Rubi là nữ sinh duy nhất mà chúng mình có được cho đến nay (ái chà cài tên Rubi này sao nghe giống người yêu cũ của thằng bạn mình).

# Phương thức map()
Phương thức map() tạo một array mới bằng cách lặp qua các phần tử và áp dụng logic mà mình đã cung cấp trong hàm dưới dạng đối số. Bạn sẽ tạo một array mới gồm tên đầy đủ của tất cả các học sinh trong array students.

```js
const fullNames = students.map(
  (element, index) => {
    return {
      fullName:
        element['f_name'] +
        ' ' +
        element['l_name'],
    }
  }
)

console.log(fullNames)
```

Đầu ra trông như thế này:

![image.png](https://images.viblo.asia/ceaa16cf-cee4-4e3b-ab79-c5c2ff9fb40f.png)

Ở đây bạn thấy một array mới với các thuộc tính fullName được tính toán bằng cách sử dụng các thuộc tính f_name và l_name của từng đối tượng sinh viên.

# Phương thức reduce()
Phương thức reduce() áp dụng một hàm giảm thiểu trên mỗi phần tử của array và trả về một value đầu ra. Chúng mình sẽ áp dụng một hàm rút gọn trên array students để tính tổng số tiền mà tất cả học sinh phải trả.

```js
const total = students.reduce(
  (accumulator, student, currentIndex, array) => {
    accumulator = accumulator + student.paid
    return accumulator
  },
  0
)

console.log(total) // 1000
```

Trong đoạn code trên,
    * Bạn khởi tạo accumulator (tích lũy) bằng 0.
    * Áp dụng hàm reduce trên từng đối tượng học sinh. Bạn truy cập thuộc tính paid và thêm nó vào biến tích lũy.
    * Cuối cùng, trả lại biến tích lũy.

# Phương thức some()
Phương thức some() trả về value boolean (true/false) dựa trên ít nhất một phần tử trong array chuyển điều kiện trong hàm. Cùng xem có những bạn sinh viên nào dưới 30 tuổi nhé.

```js
let hasStudentBelow30 = students.some(
  (element, index) => {
    return element.age < 30
  }
)

console.log(hasStudentBelow30) // true
```

Có, chúng mình thấy có ít nhất một sinh viên dưới 30 tuổi. (Kiểu some nó chỉ trả lời cho mình là có hay không thôi còn cụ thể là người bạn nào thì không biết)

# Phương thức find()
Sử dụng hàm some(), bạn thấy rằng có thanh niên nào đó dưới 30 tuổi. Hãy tìm hiểu xem học sinh đó là ai.

Để làm điều đó, bạn sẽ sử dụng hàm find(). Nó trả về phần tử được so khớp đầu tiên từ array thỏa coden điều kiện trong hàm.

Array có một method liên quan khác findIndex(), trả về chỉ mục của phần tử mà chúng ta tìm thấy bằng method find() này. Nếu không có phần tử nào phù hợp với điều kiện, findIndex() method sẽ trả về -1.

Trong ví dụ dưới đây, bạn truyền một hàm cho method find() test tuổi của từng học sinh. Nó trả về sinh viên phù hợp khi điều kiện thỏa coden.

```js
const student = students.find(
  (element, index) => {
    return element.age < 30
  }
)

console.log(student)
```
Đầu ra là:

![image.png](https://images.viblo.asia/96e6867e-6830-4c55-a0cf-e36d698186f2.png)

Như bạn thấy, đó là Alex, năm nay 22 tuổi (có thể cũng đang nợ môn Tư Tưởng MacLenin giống bạn).

# Phương thức every()
Phương thức every() phát hiện xem mọi phần tử của array có thỏa coden điều kiện được truyền vào trong hàm hay không. Hãy tìm xem tất cả sinh viên đã đăng ký ít nhất hai key học hay chưa.

```js
const atLeastTwoCourses = students.every(
  (elements, index) => {
    return elements.courses.length >= 2
  }
)

console.log(atLeastTwoCourses) // true
```
Như mong đợi, nhà trường thu hoạch lớn đầu ra là true. LƯỢM LÚA

# Phương thức at()
Method at() sẽ giúp bạn truy cập các phần tử của một array bằng cách sử dụng số chỉ số âm. Như bây giờ, điều này là không thể. Ae chỉ có thể truy cập các phần tử từ đầu array bằng cách sử dụng số chỉ số dương.

Có thể truy cập các phần tử từ phía sau của array bằng cách sử dụng giá trị độ dài. Với việc sử dụng method at(), bạn sẽ có thể truy cập các phần tử bằng cách sử dụng cả chỉ mục DƯƠNG và ÂM bằng một method duy nhất.

```js
const junkFoodILove = [
  '🥖',
  '🍔',
  '🍟',
  '🍕',
  '🌭',
  '🥪',
  '🌮',
  '🍿',
]

junkFoodILove.at(0) // 🥖
junkFoodILove.at(3) // 🍕
junkFoodILove.at(-1) // 🍿
junkFoodILove.at(-5) // 🍕
junkFoodILove.at(-8) // 🥖
junkFoodILove.at(10) // undefined
```

  
Đây là một bản demo nhanh về nó:

![Javascript Array at () method demo](https://www.freecodecamp.org/news/content/images/2021/06/demo-3.gif)

# Trước khi kết thúc ...
Mình hy vọng bạn đã tìm thấy bài viết này sâu sắc và nó giúp bạn hiểu các array JavaScript rõ ràng hơn. Vui lòng thực hiện các ví dụ nhiều lần để nắm vững chúng. 

Như mọi khi, mình hy vọng bạn thích bài viết và học được điều gì đó mới. 

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy thích blog của mình thì nhấn theo dõi để ủng hộ mình nhé. Thank you.😉
# Ref
* https://tuan200tokyo.blogspot.com/2022/09/2-so-tay-kien-thuc-quan-trong-nhat-ve.html