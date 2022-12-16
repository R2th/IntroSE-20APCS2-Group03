# Giới thiệu
Làm việc với Regular Expressions là một kỹ năng không thể thiếu trong các dự án. Chính vì vậy hôm nay chúng mình cùng tìm hiểu về một `function` xử lý và cùng xem sự lợi hại của `Regular Expressions` trong `javascript` nhé.
# 1. Sử dụng test()
Chúng ta có thể nói với `Javascript` rằng đây là một chuỗi `RegEx` bằng cách truyền giá trị vào trong cặp `/`, nó giống như thế này:  `/pattern-we-want-to-match/`. Hãy xem ví dụ bên dưới:
```
// Đây là câu tôi muốn kiếm tra
let sentence = "The dog chased the cat."
// đây là đoạn regex tôi sẽ dùng để test
let regex = /the/
```
## 1.1 Sử dụng test() đơn thuần
Trong `javascript`  có cung cấp `function` để kiểm tra sự tồn tại của `regex` trong chuỗi. Và kể quả sẽ trả về dùng `boolean`. Và đây cũng là function đơn giản nhất và dễ hiểu nhất.
```
let myString = "Hello, World!";
let myRegex = /Hello/;
let result = myRegex.test(myString); // result = true nếu không trùng trong chuỗi thì sẽ trả về false
```
## 1.2 Sử dụng test() với nhiều mẫu
Bạn có thể kiểm tra cùng lúc nhiều mẫu một lúc bằng cách dùng toán tử `|` (hoặc). Ví Dụ:
```
let petString = "James has a pet cat.";
let petRegex = /dog|cat|bird|fish/;
let result = petRegex.test(petString);
```
## 1.3 Sử dụng test() không phân biệt hoa thường
Trong 2 trường hợp trên test() sẽ kiểm tra và có phân biệt hoa thường. Vậy trong nhiều trường hợp bạn không muốn nó phân biệt hoa thường thì sao. Rất đơn giản là ta chỉ cần  thêm `i` vào sau biểu thức `regex` như thế này  `/some-pattern/i`.
```
let myString = "freeCodeCamp";
// We ignore case by using 'i' flag
let fccRegex = /freecodecamp/i;
let result = fccRegex.test(myString); // // result = true
```
# 2. Sử dụng match()
## 2.1 Sử dụng match() khi muốn trả về kết quả đầu tiên trong chuỗi
Khi muốn trích xuất một chuỗi ra thì ta sẽ sử dụng match(), hàm sẽ trả về thông tin vị trí của vị trí đầu tiên mà nó trùng lặp trong chuỗi. Ví dụ:
```
let extractStr = "Extract the word 'coding' coding from this string.";
let codingRegex = /coding/;
let result = extractStr.match(codingRegex);
// result => ["coding", index: 18, input: "Extract the word 'coding' coding from this string.", groups: undefined]
```
## 2.2 Sử dụng match() khi muốn trả về tất cả trong chuỗi
Đơn giản chúng ta chỉ cần thêm `g` vào sau chuỗi regex là javascript sẽ tự hiểu là ta cần lấy ra tất cả khi trùng lặp `regex` trong chuỗi.  
```
let testStr = "Repeat, Repeat, Repeat";
let ourRegex = /Repeat/g;
testStr.match(ourRegex); // returns ["Repeat", "Repeat", "Repeat"]
```
và chúng ta cũng có thể kết hợp vả `i` và  `g` khi vừa muốn không phân biệt hoa thường vừa muốn lấy tất cả khi trùng lặp `regex` trong chuỗi. Trong ví dụ dưới hãy chú ý tới `ig` của biến `starRegex`
```
let twinkleStar = "Twinkle, twinkle, little star";
let starRegex = /twinkle/ig;
let result = twinkleStar.match(starRegex);
console.log(result);
// > ["Twinkle", "twinkle"]
```
## 2.3 Dùng match() với nhiều trường hợp
Trường hợp muốn có nhiều trường hợp trong chuỗi regex ta cần cho chuỗi vào trong một mảng. Ví dụ ta cần lấy ra `bag` `big` `bug` trong 1 chuỗi mà dùng `match()` ta hoàn toàn có thể thấy điểm chung của chung là bắt đầu chữ `b` và cuối chữ `g` vì thể ta có ví dụ sau:
```
let quoteSample = "bag big bug bog beg";
let vowelRegex = `/b[aiu]g/`;
let result = quoteSample.match(vowelRegex);  // => result = ["bag", index: 0, input: "bag big bug bog beg", groups: undefined]
```
## 2.4 Dùng match() với trong khoảng Alphabet, trong khoảng số
```
let quoteSample = "The quick brown fox jumps over the lazy dog.";
// We can match all the letters from 'a' to 'z', ignoring casing. 
let alphabetRegex = /[a-z]/ig;
let result = quoteSample.match(alphabetRegex);
```
Ngay cả trong khoảng số ta cũng có thể lấy ra được, chú ý có dấu `-` để nói với javascript rằng ta cần lấy trong khoảng. VÍ dụ:
```
let quoteSample = "Blueberry 3.141592653s are delicious.";
// match numbers between 2 and 6 (both inclusive), 
// and letters between 'h' and 's'. 
let myRegex = /[2-6h-s]/ig;
let result = quoteSample.match(myRegex);
```
## 2.5 Dùng match() lấy ra không thuộc đoạn regex
Để làm được điều đó ta chỉ cần thêm `^` vào trước đoạn `regex`. Ví dụ:
```
let quoteSample = "3 blind mice.";
// Match everything that is not a number or a vowel. 
let myRegex = /[^0-9aeiou]/ig;
let result = quoteSample.match(myRegex);
// Returns [" ", "b", "l", "n", "d", " ", "m", "c", "."]
```
## 2.6 Dùng match() dựa theo regex xuất hiện một hoặc nhiều lần
Ta cần thêm dấu `+` vào trước đoạn `regex`:
```
let difficultSpelling = "Mississippi";
let myRegex = /s+/g;
let result = difficultSpelling.match(myRegex);
// Returns ["ss", "ss"]
```
# Kết luận
Trên đây là một số những cách dùng đơn giản của regex trong javascript mình xin được tạm kết thúc bài viết ở đây. Cảm ơn các bạn đã đọc bài viết của mình.