![](https://images.viblo.asia/cd1bc278-3e29-4f88-9764-ccf5195f4dae.png)

# Lời mở đầu
Dạo gần đây mình làm dự án có sử dụng React Hook và ngoài đam mê món nghề React thì mình cũng cực kỳ thích sử dụng cú pháp Spread (...), mình dùng cho rất nhiều logic khi code và thực sự toán tử Spread đã giúp mình rất nhiều!
  
Cú pháp Spread (…) là bắt đầu được giới thiệu trong ES6 cho phép trích xuất các phần tử từ một đối tượng có thể lặp lại một cách nhanh chóng. Với cú pháp này, mình có thể tránh sử dụng nhiều API phức tạp và viết code ngắn gọn hơn và cảm thấy thú vị hơn. Hôm nay mình xin được đề cập một số công dụng thú vị của Spread  (...) và bắt đầu thôi, let's go!!!

# 1. Clone Array
Cách thông thường để clone một mảng là sử dụng method **slice** của một mảng.

```javascript
let arr = [1, 2, 3, [4, 5]];

let copy = arr.slice()
console.log(copy)
// [1, 2, 3, [4, 5]];;
```

Tuy nhiên, method **slice** nhằm mục đích lấy các phần tử của mảng chứ không phải để copy chúng. API này rất dễ bị quên, nhưng sử dụng cú pháp **spread (...)** rất đơn giản và rõ ràng :joy::rofl::

```javascript
let arr = [1, 2, 3, [4, 5]];

let copy = [...arr]
console.log(copy)
// [1, 2, 3, [4, 5]];;
```

Đối với React Hook, thay đổi state của một Array bằng setState có thể sử dụng **spread** như sau: 

```javascript
    setState([...oldState, newState])
```

# 2. Clone Object
Để copy một object, bạn có thể sử dụng **Object.assign()** như sau:
```javascript
let user = { name: 'Thanh Cong'}

let copy = Object.assign({}, user)
console.log(copy);
```

Tuy nhiên, API này khá dài dòng và với cú pháp **spread** mọi thứ ngắn gọn hơn nhiều :joy::rofl::

```javascript
let user = { name: 'Thanh Cong'}

let copy = {...user}
console.log(copy);
```

Kết quả thu được
```
{name: "Thanh Cong"}
```

Sử dụng **spread syntax** có thể extract tất cả các thuộc tính có thể liệt kê của một đối tượng và thêm chúng vào đối tượng mới.

Đối với React Hook, thay đổi state của một Object bằng setState có thể sử dụng **spread** như sau: 

```javascript
  addNote(newNote) {
    setState({ toDoNotes: [...toDoNotes, newNote]})
  }
```

# 3. Thêm các phần tử vào đầu hoặc cuối một mảng
Việc thêm các phần tử vào đầu và cuối của mảng là một logic phổ biến mà mình rất hay gặp khi setState trong React Hook và bởi vì useState sử dụng cơ chế Relapcing sẽ khiến cho state mới không giữ được state cũ. Đối với các trường hợp muốn thêm các phần tử mới và giữ nguyên mảng cũ thì các thông thường là dùng method **push** và **unshift** :sweat_smile::sweat_smile::

```javascript
let arr = [3]

arr.unshift(1, 2)
arr.push(4, 5)

console.log(arr);
```

Tuy nhiên, đoạn code trên không được tốt lắm và nếu sử dụng cú pháp **spread (...)**, đoạn code sẽ ngắn gọn và dễ hiểu hơn nhiều :heart_eyes::

```javascript
let arr = [3]

let copy = [1, 2, ...arr, 4, 5]

console.log(copy);
[1, 2, 3, 4, 5]
```

# 4. Merged Array
Cách thông thường: :upside_down_face:

```javascript
let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]

let arr3 = arr1.concat( arr2 )
console.log(arr3);
```

Với cú pháp **spread**: :satisfied:

```javascript
let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]

let arr3 = [...arr1, ...arr2]

console.log(arr3);
[1, 2, 3, 4, 5, 6]
```

# 5. Merge objects
Các cách thông thường: :+1:
```
let p1 = { name: 'React' }
let p2 = { tag: 'Hook' }

let p3 = Object.assign({}, p1, p2)
console.log(p3) ;
```

Với cú pháp spread: :100:
```
let p1 = { name: 'React' }
let p2 = { tag: 'Hook' }

let p3 = {...p1, ...p2}
console.log(p3) ;
{name: "React", tag: "Hook"}
```

# 6. Convert một String thành một Array
Thêm một logic xử lý mà mình cũng thường xuyên gặp, convert string thành một array. Các cách thông thường:
```javascript
let str = 'reacthook'

let arr = str.split('')

console.log(arr) ;
```

Với cú pháp spread:
```
let str = 'reacthook'

let arr = [...str]

console.log(arr) ;
["r", "e", "a", "c", "t", "h", "o", "o", "k"]
```

# 7. Covert một object giống mảng thành một mảng
Một số cấu trúc dữ liệu trong JavaScript trông giống như mảng nhưng không phải là mảng, chẳng hạn như NodeList, arguments object của một hàm, v.v. Giống như mảng, chúng là một **sequential structure** trong đó phần tử của nó có thể được truy cập bằng **index**. Nhưng chúng không có một số thuộc tính và phương thức của mảng bình thường. :laughing::satisfied:

```javarscript
function sum(){
  console.log(arguments)
  console.log(arguments instanceof Array)
}

sum(1, 2, 3);
```

Để làm việc với các object dạng mảng này, đôi khi mình cần chuyển đổi chúng thành mảng.

Các cách thông thường:

```javarscript
function foo(){
  let argArray = Array.from(arguments)
  console.log(argArray instanceof Array)
}

foo();
```

Sủ dụng Spread (...) để chuyển đổi thành một mảng:
```javarscript
function sum(){
  console.log(arguments)
  
  let argArray = [...arguments]
  
  console.log(argArray instanceof Array)
}

sum(1, 2, 3);
```

Trong JavaScript, ký hiệu cho  **Rest Syntax**  và **Spread Syntax** là giống nhau, cả hai đều là (…). 

Nhưng có một sự khác biệt nhỏ:

**Rest Syntax** sẽ collect tất cả các phần tử còn lại vào một mảng hoặc object.

**Spread Syntax** là giải nén các phần tử đã collect như mảng thành các phần tử đơn lẻ.

# 8. Trích xuất Object
Giả sử có một đối tượng:

```
let httpOptions = { 
  method: 'POST', 
  url: ' https://api.github.com' , 
  returnType: 'json', 
  timeout: 2000, 
  data: { 
    name: 'bytefish' 
  } 
}
```

Ở đoạn code này sẽ lấy method và url của object này và ghép các trường khác lại với nhau
Với cú pháp spread, mình có thể viết như thế này:
```javascript
let {method, url, ...config} = httpOptions
console.log('method: ' + method)
console.log('url: ' + url)
console.log('config: ', config)
```

Kết quả sẽ thu được như sau:
![](https://images.viblo.asia/51aa6e4a-bc9b-473e-b4cd-8d6f5c4283a3.png)

Chỉ cần một dòng code để trích xuất các thuộc tính của object này, và thật khó có thể tìm được cách viết ngắn gọn hơn :joy::rofl::rofl::rofl:

# 9. Functions có tham số vô hạn (infinite parameters)

Giả sử cần viết một **summation function** có thể nhận params với số lượng đối số bất kỳ và thêm chúng vào.

Câu hỏi là làm cách nào để viết một hàm có thể nhận vô số argument? 

Có thể sử dụng một mảng làm đối số và viết ví dụ như thế này:

```javascript
function sum(arr){
  return arr.reduce((acc, cur) => acc + cur)
}

console.log(sum([1, 2, 3, 4]));
```

Tuy nhiên, cách viết này yêu cầu phải kết hợp các tham số thành một mảng để truyền, điều này không được tốt cho lắm. Một idead tốt hơn là sử dụng đối số là object của hàm để đọc động các đối số, và nó sẽ kiểu như sau:

```javascrit
function sum() {
    let argsArray = Array.from(arguments) 
    return argsArray.reduce((acc, cur) => acc + cur)
}

console.log( sum(1, 2, 3, 4) ) // 10
console.log( sum(1, 3, 5, 7) ) // 16;
```

Nếu sử dụng cú pháp spread, mình có thể nhóm trực tiếp tất cả các tham số lại với nhau:

```
function sum(...arr) {
    return arr.reduce((acc, cur) => acc + cur)
}

console.log( sum(1, 2, 3, 4) ) // 10
console.log( sum(1, 3, 5, 7) ) // 16;
```

Bằng cách này, bất kể cần pass bao nhiêu đối số thì chúng cũng sẽ được đặt trong arr. Điều này rõ ràng là tốt hơn so với cách thứ nhất và thuận tiện hơn cách thứ hai.

Nhiều hàm tích hợp trong JavaScript sử dụng kỹ thuật này, chẳng hạn như **Math.max**

**Math.max** có thể lấy bất kỳ số lượng đối số nào. Nếu muốn nhận số lớn nhất hoặc nhỏ nhất trong một mảng, có thể viết như sau:

```javascript
let arr = [23, 34, 53, 3]

console.log(Math.max(...arr))
console.log(Math.min(...arr));
```

Ngoài cách sử dụng trên, chúng ta cũng có thể sử dụng các **rest parameters**. Giả sử có một hàm có hai đối số,  đối số thứ nhất là cố định và các đối số thứ hai là không xác định, có thể code như sau:

```javascript
function team(leader, viceLeader, ...members){
  console.log('leader: ' + leader)
  console.log('vice leader: ' + viceLeader)
  members.forEach(member => console.log('member: ' + member))
}

team('Jon', 'Jack', 'Bob', 'Alice');
```

Đối với React có sử dụng Antdesign bạn có thể sử dụng Spread để lấy tất cả các Props có sẵn của các API trong đó như sau: :joy::rofl::blush:

```javascript
const CheckBox = ({...antdProps})
```

**Cảm ơn các bạn đã theo dõi bài viết đến đây. Xin chào và hẹn gặp lại !!!**

**Link tham khảo https://javascript.plainenglish.io/10-powerful-uses-of-spread-syntax-that-youll-love-a3fe70ae503c**