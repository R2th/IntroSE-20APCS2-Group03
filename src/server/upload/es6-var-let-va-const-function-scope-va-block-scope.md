Trong thời kỳ trước khi ES6 ra mắt, chỉ có duy nhất 1 cách định nghĩa 1 biến trong JavaScript - sử dụng ```var```

```var``` luôn được biết đến với một quan niệm sai lầm, có thể một phần vì hành vi của một biến được khai báo bởi từ khóa ```var``` khác so với phần lớn ngôn ngữ lập trình khác. Toàn bộ *misconception* này có một sự giải thích khá là ngắn gọn: **scope**.

Vấn đề ở đây là: ```var``` thuộc phạm vi chức năng (**function scope**). Loại phạm vi này hoạt động hơi khác với phạm vi khối (**block scope**)

Hãy cùng tìm hiểu vấn đề này nhé.

# var - function scope
Như đã đề cập ở trên, một biến được định nghĩa bới từ khóa ```var``` sẽ thuộc phạm vi của function, nghĩa là nó sẽ chỉ tồn tại trong phạm vi hàm mà nó được định nghĩa. Ví dụ như bên dưới:

```javascript:js
function myFunc() {  
  var name = 'Luke'
  console.log(name); // 'Luke'
}

myFunc();

console.log(name); // name is not defined  
```

Ở ví dụ trên, biến được định nghĩa với từ khóa ```var``` bên trong function sẽ không thể được gọi tới từ bên ngoài function.

Với định nghĩa trên, có thể hiểu các loại block như khối lệnh ```if```, hay vòng lặp sẽ không được coi là scope của từ khóa var
```javascript:js
if(true) {  
  var name = 'Luke'
}

console.log(name); // 'Luke' 
```

Sử dụng ```var```, biến ```name``` sẽ tồn tại kể cả bên ngoài khối lệnh ```if``` mà nó được định nghĩa. 

Tuy nhiên, với sự ra đời của ES6, 2 cách định nghĩa biến mới ra đời.

# let và const 
Trong ES6, ```let``` và ```const``` được giới thiệu như 2 cách thay thế để định nghĩa 1 biến - và cả 2 cách này đều thuộc về **block scope**

Với việc ra đời của 2 cách thức mới này, việc tiếp cận với JavaScript sẽ "gần gũi" hơn khi mà bạn sử dụng các ngôn ngữ khác ngoài JavaScript.

Đối với **block scope**, mọi block đều được coi là 1 scope. 

Tương tự như ```var```, một function vẫn là 1 scope hợp lệ:
```javascript:js
function myFunc() {  
  let name = 'Luke'
  console.log(name); // 'Luke'
}

myFunc();

console.log(name); // name is not defined  
```

Nhưng trong ví dụ dưới đây, từng block cũng sẽ được coi là các scope khác nhau:
```javascript:js
if(true) {  
  let name = 'Luke'
}

console.log(name); // name is not defined  
```

# Khi function scope gây nhầm lẫn
Done, chúng ta đã nắm được **function scope** và  **block scope** khác nhau ra sao. Giờ thì gây lú 1 chút nhé.

Đầu tiên, chúng ta có 1 biến local trong 1 scope có cùng tên với 1 biến ngoài scope. Ổn!
```javascript:js
var name = 'Luke';

const func = () => {  
  var name = 'Phil';
  console.log(name); // 'Phil'
}

func();

console.log(name); // 'Luke'
```

Chúng ta thấy, biến ```name``` ở outer scope giữ nguyên giá trị ban đầu của nó là *Luke* kể cả khi hàm ```func()``` được gọi.

Vấn đề ở đây là: **function scope** chỉ bao gồm các function chứ không bao gồm các block khác, từ đó chúng ta có một ví dụ như sau:
```javascript:js
var name = 'Luke';

if (true) {  
  var name = 'Phil';
  console.log(name); // 'Phil'
}

console.log(name); // 'Phil'  
```

Trong trường hợp này, ```Phil``` sẽ được in ra ở cả 2 chỗ. Đó là bởi vì cả 2 biến đều trong cùng 1 scope, do đó giá trị ```Phil``` sẽ được ghi đè lên giá trị ```Luke``` đầu tiên.

Khá là lằng nhằng nhỉ :-<.

# Sự nhất quán của block scope
Hãy thử xét 1 ví dụ sử dụng ```let```
```javascript:js
let name = 'Luke';

const func = () => {  
  let name = 'Phil';
  console.log(name); // 'Phil'
}

func();

console.log(name); // 'Luke'  
```
```javascript:js
let name = 'Luke';

if (true) {  
  let name = 'Phil';
  console.log(name); // 'Phil'
}

console.log(name); // 'Luke'  
```

# Đối với vòng lặp 
Giả sử chúng ta có 1 vòng lặp để push các lazy fucntion vào 1 mảng. Mỗi function này sẽ in ra index hiện tại.

Bây giờ chúng ta thực hiện ví dụ với từ khóa ```var```
```javascript:js
var printsToBeExecuted = [];

for (var i = 0; i < 3; i++) {  
  printsToBeExecuted.push(() => console.log(i));
}

printsToBeExecuted.forEach(f => f());  
// Output: 3, 3, 3
```

Sẽ khá là kì cục nếu mà mình đang làm quen với **block scope**. Đáng ra kết quả phải là ```0, 1, 2``` chứ nhỉ ?? :D ??.

Giải thích đơn giản là 1 vòng lặp không được coi là 1 scope nếu sử dụng từ khóa ```var```. Do đó thay vì tạo ra từng biến ```i``` cho 1 lần tịnh tiến, thì đoạn code trên sẽ in ra giá trị cuối cùng của biến ```i``` cho từng function.

Một giải pháp cho bài toán trên là gói function trong 1 function khác rồi thực hiện nó trực tiếp. Với cách này sẽ tạo ra 1 scope rõ ràng cho từng phần tử:
```javascript:js
var printsToBeExecuted = [];

for (var i = 0; i < 3; i++) {  
  printsToBeExecuted.push(
    ((ii) => () => console.log(ii))(i));
}

printsToBeExecuted.forEach(f => f());  
// Output: 0, 1, 2
```

Ngon, output thì đúng nhưng mà code nhìn không được đẹp mắt lắm nhỉ :-/.

Bây giờ chúng ta hãy thử 1 solution khác sử dụng **block scope** với từ khóa ```let``` nhé:
```javascript:js
var printsToBeExecuted = [];

for (let i = 0; i < 3; i++) {  
  printsToBeExecuted.push(() => console.log(i));
}

printsToBeExecuted.forEach(f => f());  
// Output: 0, 1, 2
```
Voila! Kết quả trả về như mong đợi. 

Và đó là tất cả những gì mình muốn chia sẻ trong bài viết này về **block scope** và **function scope**. Cảm ơn mọi người đã theo dõi!

-----
*Bài viết tham khảo tại [ES6: var, let and const — The battle between function scope and block scope](https://www.deadcoderising.com/2017-04-11-es6-var-let-and-const-the-battle-between-function-scope-and-block-scope/)*