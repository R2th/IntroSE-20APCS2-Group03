Nội dung
1. Let - Const
2. Arrow Functions 
3. Modules (export, import)
4. Default Parameter Value
5. Destructuring

-----

### 1. Let - Const
Một trong số những thứ cơ bản khi bạn làm quen với một ngôn ngữ lập trình là cách khái báo một biến.<br>
Chúng ta có từ khóa var để tạo 1 biến trong Javascript. Nhưng ở trong ES6, 2 từ khóa khác cũng đã được giới thiệu let và const: 

`var` ( function scope ) vẫn làm việc nhưng không còn được khuyến khích cao thay vào đó là let và const.<br>

`let` ( block scope ) khai báo một biến ( Có thể thay đổi giá trị ), được sử dụng rộng rãi ngày nay thay cho `var` vì có một số nhược điểm.<br>

`const` (block scope) được sử dụng trong trường hợp tạo một hằng (constants viết tắt const) với giá trị chỉ được gán một lần và không bao giờ thay đổi.
> Nói tóm tắt lại, javascript hiện đại chỉ nên dùng let và const (Được khuyến cáo). Mình sẽ có một bài nói cụ thể về block scope và function scope, sự khác biệt giữa let và var
```javascript
const COLOR_RED = "#F00"; // Nên viết tên biến in hoa khi sử dụng với const

var name = "Viblo";

let address = "Da Nang";
```
### 2. Arrow functions
Arrow functions là một cách khai báo khác để tạo những function trong Javascript<br>
Một Function bình thường trong Javascript sẽ như này: 

```javascript
function foo() {
    // Phần thân function
}
```
Nhưng Arrow Function:
```javascript
const foo = () => {
    // Phần thân function
}
```
**Một số ưu thế khi sử dụng Arrow Function**
1. Nếu chỉ 1 đối số truyền vào thì có thể bỏ dấu ```()```<br>
```javascript
const foo = name => { // Bỏ dấu () khi chỉ một đối số truyền vào
    console.log("name: ", name);
}
foo("viblo");
```
2. Nếu trả về một dòng code, bạn có thể bỏ dấu ```{}``` và từ khóa ```return ```<br>
```javascript
const foo = name => {
    return name;
}
```
Có thể viết lại thành:
```javascript
const foo = name => name
```
### 3. Modules (export, import)
* Để chia code của chúng ta thành nhiều file nhỏ, Phải làm như thế nào?
```javascript
// information.js
const person = {
    name: "viblo"
}
export default person;
```
Ta có một file khác export nhiều thứ khác:
```javascript
// calculation.js
export const ID = "23423425435";

export const sum = (numberA, numberB) => numberA + numberB;
```
* Sau khi đã export thì ta có thể import những thứ trên ở một nơi khác.
```javascript
// app.js
import person from './information.js';
// hoặc có thể đổi tên person thành bất kỳ tên gì bạn muốn. Vì nó là: export default
import per from './information.js';

// Sử dụng {} để chọn những thứ cụ thể từ file khác
import { ID, sum } from './calculation.js';

// Chỉ định một tên khác với tên đã chọn làm từ khóa từ trước
import { ID as anotherNameID, sum as anotherNameSum} from './calculation.js';

// Nếu chúng ta export nhiều thứ trong 1 file, mà lại muốn import tất cả chúng,
// Chúng ta sử dụng dấu *  và sau đó chỉ định một tên khác
import * as bundled from './calculation.js'
```
### 4. Default Parameter Value
Để tránh việc giá trị một đối số truyền vào một hàm ```undefined``` . Việc khởi tạo những tham số mặc định trong funtion là rất quan trọng
```javascript
const showName = name => console.log(name);

showName() // Output: undefined
```
Default Parameter Value sinh ra để giải quyết vấn đề này: 
```javascript
const showName = (name = "nameDefault") => console.log(name);

showName() // Output: nameDefault
```
hoặc Default Parameter Value là giá trị trả về của một hàm:
```javascript
const getFullName = (firstName = "", lastName = "") => firstName + lastName;

const showName = (name = getFullName("vi", "blo")) => console.log(name);

showName() // Output: viblo
```


### 5. Destructuring
`Destructuring` giúp bạn lấy những thành phần trong một `array` hoặc những thuộc tính của một `object` đơn giản:
* Ví dụ Array:
```javascript
const [age, name] = [18, "viblo"];

console.log(age); // Output: 18
console.log(name); // Output: viblo
```
* Ví dụ Object:
```javascript
const { age, name } = { age: 18, name: "viblo" };

console.log(age); // Output: 18
console.log(name); // Output: viblo
```
> Dưới đây là một số những thứ khi đi sâu vào `Destructuring` mà theo kinh nghiệm code của mình thấy nó rất mạnh mẽ nhé :sweat_smile::sweat_smile::sweat_smile: :<br>
1. Destructuring + Default Value: Khởi tạo giá trị mặc định nếu thành phần của array hoặc thuộc tính của object là undefined:
* Ví dụ Array
```javascript
const [age = 0, name] = [undefined, "viblo"];

console.log(age); // Output: 0
console.log(name); // Output: viblo
```
* Ví dụ Object
```javascript
const { age = 0, name } = { age: undefined, name: "viblo" };

console.log(age); // Output: 0
console.log(name); // Output: viblo
```

2. Destructuring + Deep Matching: Deep Matching này chỉ được áp dụng với thằng Object thôi nhé. Nếu muốn lấy một thuộc tính ở sâu trong Object:
* Destructuring thông thường
```javascript
// Nếu muốn lấy firstName
const { person } = { person: { fullName: { firstName: "vi", lastName: "blo" }, {age: 18} } };
const { fullName } = person;
const { firstName } = fullName;

console.log(firstName) //Output: vi
```

* Destructuring + Deep Matching
```javascript
// Nếu muốn lấy firstName
const { person: { fullName: { firstName } } } = { person: { fullName: { firstName: "vi", lastName: "blo" }, age: 18 } };

console.log(firstName) //Output: vi
```
3.  Destructuring + Parameter Context Matching: Giúp ích trong trường hợp trùng tên biết trong 1 `Context` (Phạm vi)
```javascript
const name = "viblo";
const { name } = { person: { name: "viblo" } }; // SyntaxError: Identifier 'name' has already been declared

console.log(name)
```
Nếu sử dụng Parameter Context Matching: 
```javascript
const name = "viblo";
const { person: { name: anotherName } } = { person: { name: "viblo" } };

console.log(anotherName) // Output: viblo
```
### Tổng kết:
Hy vọng những thứ mình chia sẻ trên sẽ giúp ích nhiều cho các bạn mới bắt đầu học Javascript và ES6<br>

Tài liệu tham khảo:
- http://es6-features.org/#ParameterContextMatching
- https://dev.to/mkhy19/do-you-know-es6---part-1-387m