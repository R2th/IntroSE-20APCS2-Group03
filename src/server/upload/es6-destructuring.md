![](https://images.viblo.asia/d538c006-e679-4011-8643-8af58bdf3cf8.jpeg)
# 1. Lời mở đầu
* JavaScript đang là một ngôn ngữ lập trình được sử dụng nhiều nhất trên thế giới, được sử dụng trên các nền tảng khác nhau từ trình duyệt web, thiết bị di động, VR, máy chủ web...
* **ES6** là phiên bản 6 của ngôn ngữ lập trình **ECMAScript** (được tạo ra để chuẩn hóa cho JavasScript), ra đời năm 2015, còn có tên gọi khác là ECMAScript 2015.
* ES6 mang đến một cú pháp mới và những tính năng mới làm cho code hiện đại hơn và dễ đọc hơn, giúp chúng ta "**write less code and do more**". Những tính năng rất hay ho mà ES6 mang lại như **template literals, destructuring, spread operator, arrow functions, classes**... 
* Trong bài viết này chúng ta tập trung vào khai thác sức mạng của **destructuring** trong việc đơn giản hóa lập trình cho các ứng dụng JavaScript.
# 2. Tại sao sử dụng Destructuring?
* Để trả lời cho câu hỏi này, chúng ta hãy cùng đi vào một ví dụ đơn giản mà hầu hết chúng ta đã quen thuộc hoặc đã gặp phải khi lập trình với JavaScript.
* Chúng ta có một object dữ liệu của một học sinh bao gồm điểm của ba môn (Toán, Âm Nhạc, Tiếng Anh), và bây giờ chúng ta cần phải hiển hiện thị thông tin từng điểm của học sinh đó.
* Chúng ta có thể viết code như thế này:
```js
const student = {
    name: 'Vuong Huong',
    age: 23,
    scores: {
        maths: 85,
        english: 80,
        music: 90
    }
};

function displaySummary(student) {
    console.log('Hello, ' + student.name);
    console.log('Your Maths score is ' + (student.scores.maths || 0));
    console.log('Your English score is ' + (student.scores.english || 0));
    console.log('Your Music score is ' + (student.scores.music || 0));
}

displaySummary(student);

// Hello, Vuong Huong
// Your Maths score is 85
// Your English score is 80
// Your Music score is 90
```
* Đoạn code trên có thể đã đạt được những gì ta mong muốn, tuy nhiên phải cận thận với cách viết code như thế này. Các viết code như vậy tương đối dài dòng khi mà bạn cứ phải `student.scores.abc` hoài như vậy nhất là trong trường hợp chúng ta có rất nhiều môn học thì thật là mệt mỏi. Hơn nữa bạn có thể dễ dàng gặp phải những cái lỗi đánh máy kiểu như thay vì scores.english, bạn lại viết score.english ... Việc object score được nồng vào object khác (student), giả sử truy cập nối nhau rất là dà, chúng sẽ rất dễ gõ nhầm.
* Đây có thể không phải là vấn đề, tuy nhiên với **destructuring**, chúng ta có thể viết một cách nhỏ gọn và biểu cảm hơn :)
# 3. Destructuring là gì?
* **Destructuring** hiểu đơn giản là phá vỡ những cấu trúc phức tạp thành những thành phần đơn giản hơn. Trong JavaScript, những cấu trúc phức tạp thường là một object hay một array.
* Destructuring có thể được sử dụng  để **variable declaration** và **variable assignment** (khai báo và gán biến). Cũng có thể xử lý cấu trúc lồng nhau bằng việc sử dụng destructuring lồng nhau.
* Ví dụ bên trên khi sử dụng destructuring sẽ như sau:
```js
function displaySummary({ name, scores: { maths = 0, english = 0, science = 0 } }) {
    console.log('Hello, ' + name);
    console.log('Your Maths score is ' + maths);
    console.log('Your English score is ' + english);
    console.log('Your Music score is ' + science);
}
```
# 4. Object Destructuring
Ví dụ bên trên cũng là một kiểu object destructuring với việc sử dụng phép gán ở tham số của hàm. Cùng khám phá xem chúng ta còn có thể làm gì với object destructuring nhé (go)
## 4.1 Gán biến
* Chúng ta có thể sử dụng một object literal ở bên tay trái của một biểu thức gán:
```
const student = {
    firstname: 'Huong',
    lastname: 'Vuong',
    country: 'Viet Nam'
};

// Object Destructuring
const { firstname, lastname, country } = student;

console.log(firstname, lastname, country); // Huong Vuong Viet Nam
```
* Cú pháp tương đương với ví dụ trên
```js
// Initialize local variables
let country = 'Italia';
let firstname = 'Vito';
let lastname = 'Corleone';

const student = {
    firstname: 'Sam',
    lastname: 'Vuong',
    country: 'Viet Nam'
};

// Reassign firstname and lastname using destructuring
// Enclose in a pair of parentheses, since this is an assignment expression
({ firstname, lastname } = student);

// country remains unchanged (Canada)
console.log(firstname, lastname, country); // Sam Vuong Italia
```
Ví dụ trên cho chúng ta thấy cách sử dụng object destructuring đế gán giá trị mới tới các biến.

*Lưu ý*: Nếu viết theo cú pháp bên trên, Chúng ta phải sử dụng cặp dấu` ()` trong biểu thức gán. Nếu bỏ đi, object destructuring ở đây sẽ hiểu là một  [block statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block), mà một block thì không thể xuất hiện phía bên trái của một phép gán.
### Default Values
* Khi thực hiện gán một biến tương ứng với một key mà không tồn tại trong destructured object sẽ dẫn đến giá trị **underfined**.
* Bạn có thể truyền vào một giá trị mặc định cho biến đó:
```
const person = {
    name: 'John Doe',
    country: 'Canada'
};

// Assign default value of 25 to age if undefined
const { name, country, age = 25 } = person;

// Here I am using ES6 template literals
console.log(`I am ${name} from ${country} and I am ${age} years old.`);

// I am John Doe from Canada and I am 25 years old.'
```
* Ở đây chúng ta gán một giá trị mặc định là 25 cho biến age. Vì age không phải là một key trong object person, nên 25 sẽ được gán cho biến age thay vì `undefined`
### Sử dụng những tên biến khác
* Ở những ví dụ trước chúng ta đã gán cho những biến có cùng tên tương ứng với là key của object. Tuy nhiên chúng ta có thể gán cho một biến có tên khác, sử dụng cú pháp
    
     `[object_key]:[variable_name]`

    Bạn có thể truyền giá trị mặc định với cú pháp:

    ` [object_key]:[variable_name] = [default_value]`

```
const person = {
    name: 'John Doe',
    country: 'Canada'
};

// Assign default value of 25 to years if age key is undefined
const { name: fullname, country: place, age: years = 25 } = person;

// Here I am using ES6 template literals
console.log(`I am ${fullname} from ${place} and I am ${years} years old.`);

// I am John Doe from Canada and I am 25 years old.'
```
Ở ví dụ trên chúng ta tạo ra 3 biến` fullname, place, years` tương ứng với các key `name, country, age` của object person. Lưu ý rằng chúng ta chỉ định một giá trị mặc định 25 cho biến years vì object person không có key `age`.
## 4.2 Nested Object Destructuring
* Quay trở lại ví dụ đầu tiên của bài viết này, với object score được nồng trong object student.
* Chúng ta muốn gán điểm toán và điểm âm nhạc cho các local variable, chúng ta sẽ sử dụng nested object destructuring như ví dụ dưới đây:
```js
const student = {
    name: 'Vuong Huong',
    age: 23,
    scores: {
        maths: 85,
        englist: 90,
    }
};

// We define 3 local variables: name, maths, science
const { name, scores: {maths, music = 50} } = student;

console.log(`${name} scored ${maths} in Maths and ${music} in Music.`);

// Vuong Huong scored 85 in Maths and 50 in Music.
```
Với ví dụ này chúng ta định nghĩa 2 biến local name, maths và music. Chúng ta chỉ định giá trị mặc định 50 cho biến music trong biến không tồn tại trong đối mà scores.

**Lưu ý**: 
* Ở đây scores không được định nghĩa như là một biến.
* Khi sử dụng nested object destructuring, tránh sử dụng một empty object để gán, mặc dù cú pháp hợp lệ tuy nhiên sẽ chẳng có một phép gán nào cả
```js
// This does no assignment
// Because of the empty nested object literal ({})
const { scores: {} } = student;
```
# 5. Array Destructuring
Array Destructuring cũng tương tự như Object Destructuring
### 5.1 Gán biến
* Đối với Array Destructuring, chúng ta có thể sử dụng một array literal ở phía bên tay trái một biểu thức gán. Mỗi tên biến ở trong array literal sẽ map tương ứng với cái item cùng index ở destructured array
```js
const rgb = [255, 200, 0];

// Array Destructuring
const [red, green, blue] = rgb;

console.log(`R: ${red}, G: ${green}, B: ${blue}`); // R: 255, G: 200, B: 0
```
### Default value
* Nếu số lượng item trong array nhiều hơn số lượng local variables truyền vào destructuring array literal thì những items thừa sẽ không được map tương ứng
* Nếu số lượng local variables truyền vào destructuring array literal vượt quá số lượng item trong mảng, thì mỗi biến local vượt quá sẽ được gán một giá trị `undifined` trừ khi bạn chỉ định **default value** cho nó.
* Cũng giống như object destructuring, bạn có thể chỉ định giá trị default như sau
```js
const rgb = [200];

// Assign default values of 255 to red and blue
const [red = 255, green, blue = 255] = rgb;

console.log(`R: ${red}, G: ${green}, B: ${blue}`); // R: 200, G: undefined, B: 255
```
* Tuy nhiên không giống object destructuring, bạn không cần phải có cặp dấu `()` nếu sử dụng như sau
```js
let red = 100;
let green = 200;
let blue = 50;

const rgb = [200, 255, 100];

// Destructuring assignment to red and green
[red, green] = rgb;

console.log(`R: ${red}, G: ${green}, B: ${blue}`); // R: 200, G: 255, B: 50
```
### Skipping Items
* Bạn có thể bỏ đi những item nào mà bạn không muốn gán nó cho các biến local, và chỉ gán những cái nào mà bạn quan tâm. Ví dụ sau đây chỉ gán gía trị blue cho biến local
```js
const rgb = [200, 255, 100];

// Skip the first two items
// Assign the only third item to the blue variable
const [,, blue] = rgb;

console.log(`Blue: ${blue}`); // Blue: 100
```

Chúng ta sử dụng dấu `,` đế bỏ đi một iteam và ở đây là hai dấu `,` để bỏ đi 2 phần tử đầu tiên của mảng rgb
### Hoán đổi biến
* Chúng ta hãy thực hiện một ví dụ nho nhỏ thú vị như thế này: Tưởng tượng bạn muốn xây dựng một ứng dụng chuyển đổi ảnh, bạn muốn hóa đổi chiều cao và chiều rộng của bức ảnh khi hướng của anh thay đổi từ chế độ `landscape` sang `portrait`. 
* Bình thường chúng ta có thể làm như thế này
```js
let width = 300;
let height = 400;
const landscape = true;

console.log(`${width} x ${height}`); // 300 x 400

if (landscape) {
    // An extra variable needed to copy initial width
    let initialWidth = width;

    // Swap the variables
    width = height;
  
    // height is assigned the copied width value
    height = initialWidth;

    console.log(`${width} x ${height}`); // 400 x 300
}
```
Ở ví dụ trên chúng ta phải sử dụng một biến trung gian để copy giá trị của một trong 2 biến hoán đổi

* Với array destructuring, chúng ta có thể thực hiện hoán đổi chỉ với một câu lệnh:
```js
let width = 300;
let height = 400;
const landscape = true;

console.log(`${width} x ${height}`); // 300 x 400

if (landscape) {
    // Swap the variables
    [width, height] = [height, width];
  
    console.log(`${width} x ${height}`); // 400 x 300
}
```
### Nested Array Destructuring
* Cũng giống như là objects, bạn có thể thực hiện nested array destructuring như sau
```js
const color = ['#FF00FF', [255, 0, 255], 'rgb(255, 0, 255)'];

// Use nested destructuring to assign red, green and blue
const [hex, [red, green, blue]] = color;

console.log(hex, red, green, blue); // #FF00FF 255 0 255
```
### Rest Items
* Đôi khi bạn muốn gán một vài item cho các biến, trong khi muốn tất cả những item còn lại sẽ được gán cho một biến khác. Ta sẽ sử dụng kết hợp với cú pháp **rest parameter** của **ES6**
```js
const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

// Assign the first and third items to red and yellow
// Assign the remaining items to otherColors variable using the spread operator(...)
const [red,, yellow, ...otherColors] = rainbow;

console.log(otherColors); // ['green', 'blue', 'indigo', 'violet']
```
*Lưu ý:* Nếu bạn sử dụng rest parameter, nó luôn luôn xuất hiện như phần tử cuối cùng của destructuring array litteral, nếu không sẽ bị lỗi.
### Clone array
* Bạn có thể sử dụng rest parameter kết hợp với destructuring để thực hiện sao chép một array
* Nếu làm như này
```js
const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
const rainbowClone = rainbow;

// Both rainbow and rainbowClone point to the same
// array reference in memory, hence it logs (true)
console.log(rainbow === rainbowClone); // true

// Keep only the first 3 items and discard the rest
rainbowClone.splice(3);

// The change on rainbowClone also affected rainbow
console.log(rainbow); // ['red', 'orange', 'yellow']
console.log(rainbowClone); // ['red', 'orange', 'yellow']
```
thì với mọi thay đổi của rainbowClone sẽ dẫn đến mọi thay đổi của rainbow.
* Có thể sử dụng` slice() `hoặc` concat()` theo **ES5**
* Với ES6, bạn có thể đơn giản hóa như sau
```js
const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

// Cloning with array destructuring and spread operator
const [...rainbowClone] = rainbow;

console.log(rainbow === rainbowClone); // false
console.log(rainbowClone); // ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']

```
# 6. Mixed Destructuring
* Khi bạn gặp trường hợp một object với các object và array nồng nhiều tầng bên trong nó, bạn có thể kết hợp sử dụng **object destructuring** và **array destructuring** như sau:
```js
const person = {
    name: 'John Doe',
    age: 25,
    location: {
        country: 'Canada',
        city: 'Vancouver',
        coordinates: [49.2827, -123.1207]
    }
}

// Observe how mix of object and array destructuring is being used here
// We are assigning 5 variables: name, country, city, lat, lng
const {name, location: {country, city, coordinates: [lat, lng]}} = person;

console.log(`I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lng})`);

// I am John Doe from Vancouver, Canada. Latitude(49.2827), Longitude(-123.1207)

```
# 7. Destructured Function Parameters
* Như ví dụ đầu tiên của bài viết này,  chúng ta đã thực hiện triết xuất các giá trị và gán chúng cho các biến cục bộ ở tham số của hàm.
```js
const student = {
    name: 'John Doe',
    age: 16,
    scores: {
        maths: 74,
        english: 63,
        science: 85
    }
};

// Without Destructuring
function displaySummary(student) {
    console.log('Hello, ' + student.name);
    console.log('Your Maths score is ' + (student.scores.maths || 0));
    console.log('Your English score is ' + (student.scores.english || 0));
    console.log('Your Science score is ' + (student.scores.science || 0));
}

// With Destructuring
function displaySummary({name, scores: { maths = 0, english = 0, science = 0 }}) {
    console.log('Hello, ' + name);
    console.log('Your Maths score is ' + maths);
    console.log('Your English score is ' + english);
    console.log('Your Science score is ' + science);
}

displaySummary(student);
```
* Tuy nhiên destructured parameter luôn luôn phải có nếu không sẽ báo lỗi, mặc dù bạn đã gán giá trị mặc định cho các biến. Bạn có thể gán một fallback object literal như một default value cho object student và scores
```js
function displaySummary({ name, scores: { maths = 0, english = 0, science = 0 } = {} } = {}) {
    console.log('Hello, ' + name);
    console.log('Your Maths score is ' + maths);
    console.log('Your English score is ' + english);
    console.log('Your Science score is ' + science);
}

// Calling without a student argument
displaySummary();

// Hello, undefined
// Your Maths score is 0
// Your English score is 0
// Your Science score is 0
```
# 7. Kết luận
* Ở bài viết này chúng ta đã khám phá được tính năng destructuring của ES6 và nhiều cách để áp dụng để viết code đơn giản dễ đọc hơn. Mong bài viết sẽ có ích với các bạn
* Link tham khảo https://codeburst.io/es6-destructuring-the-complete-guide-7f842d08b98f