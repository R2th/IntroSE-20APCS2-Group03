### I. Lời nói đầu

Khi làm việc với JavaScript, chắc hẳn đã có lúc bạn thắc mắc là: "Nên dùng **single quotes** hay **double quotes**" chưa? Mình đoán chắc là có bạn đã gặp vấn đề này rồi.

Để trả lời cho câu hỏi trên thì ta phải hiểu được 'single quotes' và "double quotes" nó làm việc gì, sự khác nhau giữa chúng. Và trong bài viết này chúng ta cùng tìm hiểu về nó nhé. Ok Let's go :horse_racing:

### II. Nội dung

Trong JavaScript, cả single quotes **('')** và double quotes **("")** được sử dụng thường xuyên để tạo một [String Literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).

> *“Single quotes and double quotes behave in exactly the same way in JavaScript.” — Matthew Holman in [CloudBoost](https://blog.cloudboost.io/js-bytes-double-quote-vs-single-quote-vs-backtick-44e36c390dbd)*

Single quotes và double quotes hoạt động giống nhau trong JavaScript. Ngoại trừ, có một điểm khác biệt duy nhất là sử dụng backslash (\\) trong nó.

**‘Single quotes “escape” single quotes’**

Khi sử dụng single quotes ('') để tạo một String Literal, ký tự single quotes cần phải escape bằng cách sử dụng dấu backslash (\'). Ví dụ:

```
const wittyAI = 'I am \'not\' sentient.'
const wittyReply = 'No, you\'re definitely not "sentient."'
console.log(wittyAI,wittyReply)
------------------------------------------------------------------
Output: I am 'not' sentient. No, you're definitely not "sentient."
```

**“Double quotes ‘escape’ double quotes“**

Khi sử dụng double quotes để tạo một String Literal, ký tự double quotes cần phải escape bằng dấu backslack (\"). Ví dụ:

```

const _wittyAI = "I think therefore I 'am' -- sentient."
const _wittyReply = "No, you only \"think\", so you aren't."
console.log(_wittyAI,_wittyReply)
------------------------------------------------------------------
Output: I think therefore I 'am' -- sentient. No, you only "think", so you aren't.
```

**"Empty" === 'Empty'**

Cả single quotes và double quotes có thể đại diện cho một [empty string](https://www.wikitechy.com/tutorials/javascript/check-for-an-empty-string-in-javascript) không chứa ký tự nào cả.

```
const empty = ""
const alsoEmpty = ''
console.log(empty === alsoEmpty) // true (both are empty string)
console.log(empty.length) // 0

console.log(empty === false) // false
console.log(empty === 0) // false
console.log(empty == false) // true (falsy comparison)
console.log(empty == 0) // true (falsy comparison)
```

**Are `backticks` a better solution?**

Có một tính năng mới trong ES6 được gọi là **template literals** hoặc **backtick literals** hoặc **backticks**  (``), sử dụng nó thay thế cho single quotes và double quotes.

> “Template literals are string literals allowing embedded expressions. You can use multi-line strings and string interpolation features with them.”  - [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

Backticks là một String Literal cho phép nhúng các biểu thức, có thể viết string thành nhiều dòng và các tính năng nội suy chuỗi.

Sử dụng backtick (``) có 3 lợi ích lớn:
1. Nối chuỗi dễ dàng hơn (nội suy biến):
```
"string " + variable => `string ${variable}`
```

2. Không cần escape (`\`) single quotes hoặc double quotes.
```
"\"Hello World!\"" => `"Hello World"`
```

3. Có thể viết string thành nhiều dòng mà không cần sử dụng `\n`:
```
"Hello\nWorld!" => `Hello
World`
```

Backticks cũng làm việc tốt với HTML:
```

const webAwareAI = `<div class="cloud">
<h1>Loading consciousness... It's loading...</h1>
</div>`
console.log(webAwareAI)

/**
 *  Output:
 *  <div class="cloud">
 *  <h1>Loading consciousness... It's loading...</h1>
 *  </div>
 */
```

Về tốc độ của Backticks Literal cũng tương đương các String Literal khác ([here](https://medium.com/javascript-in-plain-english/are-backticks-slower-than-other-strings-in-javascript-ce4abf9b9fa)), cho dù có biên dịch nó bằng Babel hay không. Với những điểm mạnh nêu trên, vậy tại sao không sử dụng **backticks** trong tất cả các trường hợp?

**Đừng quên về JSON**

JSON - định dạng lưu trữ dữ liệu nhẹ - chỉ cho phép sử dụng double quotes. Vì thế nếu sao chép qua lại từ JavaScript sang các file JSON, chỉ cần sử dụng double quotes sẽ giúp ta nhất quán.


```
const greetings = JSON.stringify({Hello: 'World!'})
console.log(greetings) // {"Hello":"World!"}
console.log(JSON.parse(greetings)) // Object { Hello: "World!" }

// JSON requires double quotes:
JSON.parse("{\"Hello\":\"World!\"}") // Object { Hello: "World!" }
JSON.parse(`{"Hello":"World"}`) // Object { Hello: "World!" }
try {
  JSON.parse("{'Hello':\"World!\"}") 
} catch(e) { console.log(e) } // SyntaxError: JSON.parse: expected property name or '}' at line 1 column 2 of the JSON data
try {
  JSON.parse("{\"Hello\":'World!'}") 
} catch(e) { console.log(e) } // SyntaxError: JSON.parse: unexpected character at line 1 column 10 of the JSON data
```

Như trong đoạn code ví dụ trên, single quotes gây ra lỗi cú pháp cho hàm JSON.parse(). Lý do kỹ thuật liên quan đến đặc tả JSON [RFC 7159](https://tools.ietf.org/html/rfc7159#page-8), yêu cầu double quotes cho ký tự chuỗi JSON.

**Có điều gì sai khi sử dụng cả 3 không?**

Sẽ không có gì sai khi sử dụng double quotes ("") theo mặc định, sử dụng single quotes ('') để bao double quotes, và backticks (` `) để bao gồm biến và multi-line. Nó tùy thuộc về sở thích của cá nhân.

Ví dụ, [Airbnb’s style guide](https://github.com/airbnb/javascript#strings--quotes) thích sử dụng single quotes, tránh double quotes, và sử dụng một cách tiết kiêm backticks literal:
```
// bad
const name = "Capt. Janeway";
// bad - template literals should contain interpolation or newlines
const name = `Capt. Janeway`;
// good
const name = 'Capt. Janeway';
```

**Tips: Sử dụng ESLint hoặc Prettire để đảm bảo tính nhất quán**

Nếu bạn muốn đảm bảo tính nhất quán trong code, bạn có thể dễ dàng config với [ESLint](https://eslint.org/) hoặc là sử dụng [Prettier](https://prettier.io/).

### III. Tổng kết

Như vậy, cả **single quotes**, **double quotes** đều hoạt động giống nhau. Ngoài ra, ta cũng có thể sử dụng **backticks** để thay thế, trong những trường hợp nhất định. Việc  sử dụng loại nào là do style của từng devs sao cho code nhất quán.

Cảm ơn các bạn đã đọc!

Nguồn: [The real difference between ‘single quotes’ and “double quotes” in JavaScript](https://medium.com/javascript-in-plain-english/the-real-difference-between-single-quotes-and-double-quotes-in-javascript-3d00bf720bcd)