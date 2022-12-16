# 1. Giới thiệu 
**Template Literals** (hay còn gọi là *Template Strings*) là một tính năng mới của **ES2015 (ES6)** cho phép bạn làm việc với chuỗi theo một cách mới lạ hơn so với phiên bản **ES5** trở xuống. Nó bổ sung nhiều tính năng mới mạnh mẽ để giúp cho việc tạo các chuỗi nhiều dòng (*multi-line strings*) hoặc nhúng biểu thức vào trong chuỗi một cách dễ dàng. Ngoài ra, **Tagged Templates Literals** là một tính năng nâng cao của Template Literals cho phép bạn thực hiện các thao tác trên các biểu thức trong chuỗi.

Tất cả những tính năng thú vị đó giúp cho bạn có thêm các tùy chọn khi thao tác với chuỗi, cho phép bạn dễ dàng tạo các chuỗi động có thể sử dụng cho URL hoặc các chức năng tùy chỉnh ở các thành phần HTML.

# 2. Cú pháp (Syntax)
```javascript
const string = `Mercedes`;
let multiLineString = `Tôi muốn tắt nắng đi
Cho màu đừng nhạt mất`;
let car = `Xe hơi`;
let brand = `Audi`;
const quantity = 1;
let embeddedString = `Tôi có ${quantity *2} chiếc ${car} thương hiệu ${brand}`;
```

Như các bạn đã thấy ở trên, các Template Literals được bao bởi ký tự dấu gạch ngược **backtick** (\`\`) thay vì dấu nháy đơn hoặc nháy kép

Template Literals có thể chứa "trình giữ chỗ" (*placeholders*). Chúng được biểu thị bằng dấu đô la và dấu ngoặc nhọn `${expression}`

Dấu \` có thể được escape bằng dấu \:
>  \`\`\` === '\`' // --> true

Bạn có thể đặt bất cứ biểu thức JavaScript nào bên trong `${}`

```javascript
// ${function}
var student = "Sinh viên";
function learnJS() {
  return "học lập trình JavaScript";
}
console.log(`${student} ${learnJS()}`);

// Ví dụ khác
var dev = {
  fullName: "nguyễn văn a",
  learn: function () {
    return "viết bài trên Viblo";
  },
};
console.log(`${dev.fullName.toUpperCase()} đang ${dev.learn()}`);
```
Kết quả thu được:
![image.png](https://images.viblo.asia/1b5a7f8c-5210-4481-961f-e04d601c9780.png)

```javascript
var car = {
  name: "Mercedes",
  color: "black",
  price: 25000,
  categories: ["C250", "E450", "S600"],
  run: function () {
    return "Tốc độ tối đa 320km/h";
  },
};

var HTML = `
  <div class="car">
      <h2>${car.name}</h2>
      <p class="job">${car.color}</p>
      <p class="bio">${car.price}</p>
      <p class="voice">${car.run()}</p>
      <select class="tags">
          ${car.categories.map((cate) => ` <option>${cate}</option>`)}
      </select>
  </div>
`;

console.log(HTML);
document.write(HTML);
```
Kết quả thu được:
![image.png](https://images.viblo.asia/7f38ea39-5280-46d0-bef1-c885b199ceb6.png)

# 3. Multi-line Strings
Bất kỳ ký tự dòng mới (*newline characters*) nào được chèn vào source đều là một phần của Template Literals.

Nếu bạn sử dụng các chuỗi thông thường, bạn sẽ phải sử dụng cú pháp sau để nhận các chuỗi nhiều dòng:
```javascript
console.log('string text line 1\n' +
'string text line 2');
// "string text line 1
// string text line 2"
```
Khi sử dụng Template Literals, bạn có thể làm điều tương tự như sau:
```javascript
console.log(`string text line 1
'string text line 2`);
// "string text line 1
// string text line 2"
```

# 4. Biểu thức nội suy (Expression Interpolation)
Để nhúng các biểu thức trong các chuỗi thông thường, bạn sẽ sử dụng cú pháp sau:
```javascript
let a = 5;
let b = 10;
console.log('Tổng của hai số là ' + (a + b) + ' và\ntích là ' + (a * b) + '.');
// "Tổng của hai số là 15 and
// tích là 50."
```

Bây giờ, với Template Literals, bạn có thể làm cho nó dễ đọc hơn như sau:
```javascript
let a = 5;
let b = 10;
console.log(`Tổng của hai số là ${a + b} và
tích là ${a * b}.`);
// "Tổng của hai số là 15 and
// tích là 50."
```

# 5. Các mẫu lồng nhau (Nesting Templates)
Trong một số trường hợp, việc lồng một mẫu là cách dễ nhất (và có lẽ là dễ đọc hơn) để có được các chuỗi có thể định cấu hình. Với `Backticked Template`, thật đơn giản để cho phép các backticks bên trong bằng cách sử dụng chúng bên trong placeholders `${}`\.

{@embed: https://jsfiddle.net/Lcfvt9ad/}

# 6. Tagged Templates
Một dạng "cao cấp" hơn của Template Literals chính là `Tagged Templates`. 

Tags cho phép bạn phân tích cú pháp Template Literals với một function. Đối số đầu tiên của một `tag function` chứa một mảng các giá trị chuỗi. Các đối số còn lại liên quan đến các biểu thức (expressions)

`Tag function` có thể thực hiện bất kỳ thao tác nào trên các đối số này mà bạn muốn và trả về chuỗi đã thao tác. 

Tên của hàm được sử dụng cho tag có thể là bất cứ tên nào bạn muốn.

```javascript
let person = "Tùng";
let age = 22;

function myTagFunc(strings, personExp, ageExp) {
  let str0 = strings[0]; // "Đây là "
  let str1 = strings[1]; // " là một người "
  let str2 = strings[2]; // "."

  let ageStr;
  if (ageExp > 99) {
    ageStr = "100 tuổi(centenarian)";
  } else {
    ageStr = "thanh niên(youngster)";
  }

  // Chúng ta thậm chí có thể trả về string sử dụng Template Literals
  return `${str0}${personExp}${str1}${ageStr}${str2}`;
}

let output = myTagFunc`Đây là ${person}, là một người ${age}.`;

console.log(output);
// Đây là Tùng, là một người thanh niên (youngster).
```

Ngoài ra, `tag function` không nhất thiết là trả về một chuỗi, nó có thể hoạt động trên các giá trị đó và trả về bất cứ loại giá trị nào. Ví dụ sau đây tag function có thể bỏ qua mọi thứ và trả về `null`:
```javascript
function returnsNull(strings, ...expressions) {
  return null;
}

const string = returnsNull`Trả về null`;
console.log(string); //null
```

Một ví dụ khác về hành động có thể được thực hiện trong `Tagged Templates` đang áp dụng cho một số thay đổi cho cả hai mặt của biểu thức. Chẳng hạn như bạn muốn bọc từng biểu thức trong các thẻ `HTML`, cụ thể ở đây là tạo hàm `higlight` để bọc biểu thức vào trong cặp thẻ `<span></span>` để thuận tiện cho việc thêm các thuộc tính CSS cho nó.

```javascript
function highlight([first, ...strings], ...values) {
  return values.reduce(
    function (accumulator, currentValue) {
      return [...accumulator, `<span>${currentValue}</span>`, strings.shift()];
    },
    [first]
  );
}
var web = "Viblo";
var tag = "JavaScript";
const html = highlight`Viết bài viết về ${tag} tại trang web ${web} !`;

console.log(html);
document.write(html.join(""));
```

Kết quả thu được: 
![image.png](https://images.viblo.asia/902479eb-0e1d-47a8-ac03-02b2be903274.png)


# 7. Raw Strings
Thuộc tính `raw` đặc biệt, có sẵn trên đối số đầu tiên của `tag function`, cho phép bạn truy cập các chuỗi thô (raw strings) khi chúng được nhập mà không cần xử lý các chuỗi thoát `escape sequences`

```javascript
function tag(strings) {
  console.log(strings.raw[0]);
}

tag`tôi muốn buộc gió lại \n cho hương đừng bay đi`;
// Kết quả sẽ là "tôi muốn buộc gió lại \n cho hương đừng bay đi" ,
// chứa cả 2 ký tự '\' và 'n'
```

Không những thế,  còn tồn tại phương thức `String.raw()` để tạo các `raw strings` 

```javascript
let str = String.raw`Hi\n${2 + 3}!`;
// "Hi\\n5!"

console.log(str.length);
// 6

console.log(Array.from(str).join(","));
// "H,i,\\,n,5,!"
```


# 8. Browser Compatibility
* Desktop

| Chrome | Edge | Firefox | Internet Explorer | Opera | Safari |
| -------- | -------- | -------- | -------- | -------- | -------- |
| 41     | 12     | 34     | No support     | 28     | 9     |


* Mobile

| WebView Android | Chrome Android | Firefox for Android | Opera Android |  Safari on IOS | Samsung Internet |
| -------- | -------- | -------- | -------- | -------- | -------- |
| 41     | 41     | 34     | 28     | 9     | 4.0     |

* NodeJS: `4.0.0`

# 9. Kết luận
Qua bài viết này, hy vọng sẽ giúp bạn hiểu và áp dụng được `Template Literals` phục vụ cho việc thao tác với chuỗi trở nên dễ dàng và thuận tiện hơn. Đây là bài viết đầu tiên của mình trên Viblo, nếu có gì sai sót, mình rất mong nhận được ý kiến đóng góp cũng như nhận xét của mọi người trong phần comments để mình có thể hoàn thiện hơn trong những bài viết sau này. 

Cảm ơn mọi người đã đọc bài viết của mình. Happy Coding  :smile:

# 10. Tham khảo
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals?retiredLocale=vi#tagged_templates_and_escape_sequences
* https://www.tutorialspoint.com/nesting-template-strings-in-javascript