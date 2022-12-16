Hello anh em , vậy là một năm mới đã đến, chúc anh em một năm mới thật mạnh khỏe, hạnh phúc, an khang thịnh vượng.

Đầu năm mới, khá là rảnh rỗi khi được nghỉ ở nhà, mình lại mò lên để viết bài, mong là được anh em ủng hộ. 

Hôm nay chúng ta sẽ cùng bàn luận về một số thứ mà rất hay dùng khi code Js, có thể là mọi người rất hay sử dụng đó, nhưng lại không biết tên của nó:  **Destructuring**, **Rest Parameters**, và **Spread Syntax** . 

Cùng tìm hiểu nào :kissing_heart::kissing_heart::kissing_heart:

# Destructuring là gì nhỉ ????

Destructuring là một cú pháp cho phép bạn gán các thuộc tính của một Object hoặc một Array. Điều này giúp chúng ta giảm thiểu kha khá dòng code trong dự án đấy, cùng xem qua ví dụ này nhé :

```javascript
const data = {
        id : 1,
        name : 'Post one',
        author : 'Bui Hoang Ky',
        description : 'Happy new year',
}

const array = ['Bui', 'Hoang', 'Ky'];
```

Bình thường thì khi lấy data ra, chúng ta sẽ làm như sau : 

```javascript

//object
const id = data.id
const name = data.name
const author = data.author
const des = data.description

//array
const a = array[0]
const b = array[1]
const c = array[2]
```

Nhưng khi sử dụng với Destructuring, chúng ta có thể lấy ngắn gọn hơn :

```javascript
const {id, name, author, des} = data

const [a, b, c] = array
```

Khá là thú vị đúng không

Ồ còn trong mảng nữa này , bài toán khá quen thuộc swap :
```javascript
const a = 1;
const b = 2;
const temp;
temp = a;
a = b;
b = temp;

console.log(a, b) ;//2, 1
```

Giờ dùng thử với Destructuring nhé :

```javascript
var a = 1;
var b = 2;
[a, b] = [b, a]
console.log(a, b) ;//2, 1
```

# Tiếp tục với Spread operator nào :

Trước kia thì khi nối hai mảng với nhau, bắt buộc anh em phải sử dụng những hàm cũ của js :

```javascript
const arrOne = [ 'Happy', 'new' ];
const arrTwo = [ 'year']; 
```

Rồi , giờ muốn ghép hai array này lại với nhau thì phải làm thế nào ???

```javascript
arrOne.concat(arrTwo)
// ["Happy", "new", "year"]
```

Nhưng giờ đây đã khác xưa rất nhiều rồi, hãy xem đây khi sử dụng Spread systax.

```javascript
const arr = [...arrOne, ...arrTwo]

//thử console ra mà xem nhé =))
```

Ngoài ra chúng ta còn có thể update và copy một object nữa đấy :

```javascript
const data = { name: 'Ky;, status: true }
const copyData = { ...data }

//lại tự conso ra nhé =))
```

TIếp nào :

```javascript
function handleTotalNumber ( a, b) {
        return a + b;
}

// Trước kia

handleTotalNumber(2,4);

//Thế chả lẽ giờ nhiều số hơn thì cũng viết như thế à =))

//Đơn giản thôi

const arr = [2, 4]
handleTotalNumber(...arr)

```

# Rest Parameters :

Rest parameter trong ES6 giúp chúng ta có thể định nghĩa một hàm với số lượng tham số có thể thay đổi tuỳ ý. Hay nói theo cách khác khi chúng ta không biết chắc chắn số lượng tham số cần có của một hàm chúng ta có thể sử dụng rest parameter :

```
function test(...array) {
  console.log(array)
}

test('Happy', 'New', 'Year', 'Every', 'Body')
// Happy New Year Every Body
```

#  Kết bài !


Đó , sơ sơ vậy thôi, thì cuối bài cũng chúc anh em một năm mới thực sự vui vẻ, hạnh phúc. **Live** và **Upvote** cho mình nhé :100::100::100::100: